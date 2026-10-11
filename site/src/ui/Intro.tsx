import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { profile } from '../content/profile'
import { useSettings } from '../fx/settings'

interface Props {
  brandRef: RefObject<HTMLElement | null>
  /** Called as the name starts flying up. */
  onStart(withMusic: boolean): void
  /** Called when the name has landed in the header. */
  onDone(): void
}

const FLIGHT_MS = 1150

/** Title screen. The key press that dismisses it is also what lets the browser play audio. */
export function Intro({ brandRef, onStart, onDone }: Props) {
  const { music: wantsMusic, reducedMotion } = useSettings()
  const root = useRef<HTMLDivElement>(null)
  const name = useRef<HTMLHeadingElement>(null)
  const started = useRef(false)

  const start = useCallback(
    (withMusic: boolean) => {
      if (started.current) return
      started.current = true
      onStart(withMusic)
      const nameEl = name.current
      const brandEl = brandRef.current
      if (reducedMotion || !nameEl || !brandEl) {
        onDone()
        return
      }
      // Measure the name here and the header brand there, then fly between them.
      const a = nameEl.getBoundingClientRect()
      const b = brandEl.getBoundingClientRect()
      const scale = b.height / a.height
      const dx = b.left + b.width / 2 - (a.left + a.width / 2)
      const dy = b.top + b.height / 2 - (a.top + a.height / 2)
      root.current?.classList.add('leaving')
      nameEl.animate(
        [
          { transform: 'translate(0, 0) scale(1)' },
          { transform: 'translate(0, -14px) scale(1)', offset: 0.28 },
          { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        ],
        { duration: FLIGHT_MS, easing: 'cubic-bezier(.65, 0, .25, 1)', fill: 'forwards' },
      )
      window.setTimeout(onDone, FLIGHT_MS + 20)
    },
    [brandRef, onStart, onDone, reducedMotion],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Tab' || e.key === 'Shift') return
      if ((e.target as HTMLElement | null)?.closest('.intro-actions')) return
      e.preventDefault()
      start(wantsMusic)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [start, wantsMusic])

  useEffect(() => root.current?.focus(), [])

  return (
    <div
      className="intro"
      ref={root}
      tabIndex={-1}
      role="dialog"
      aria-label="Title screen"
      onClick={e => {
        if (!(e.target as HTMLElement).closest('.intro-actions')) start(wantsMusic)
      }}
    >
      <div className="intro-inner">
        <span className="intro-eyebrow">{profile.unit.toUpperCase()} · SYSTEM READY</span>
        <h1 className="intro-name" ref={name} aria-label={profile.name}>
          {profile.name.split('').map((c, i) => (
            <span key={i} aria-hidden="true" style={{ animationDelay: `${(0.3 + i * 0.05).toFixed(2)}s` }}>
              {c === ' ' ? ' ' : c}
            </span>
          ))}
        </h1>
        <span className="intro-line" aria-hidden="true" />
        <span className="intro-sub">
          {profile.classLabel} · {profile.school}
        </span>
        <span className="intro-press">
          <span>PRESS ANY KEY</span>
        </span>
        <div className="intro-actions">
          <button className="btn" onClick={() => start(true)}>
            Start with music
          </button>
          <button className="btn ghost" onClick={() => start(false)}>
            Start muted
          </button>
        </div>
      </div>
    </div>
  )
}
