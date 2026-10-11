import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { profile } from '../content/profile'
import { screens } from '../content/screens'
import { useSettings } from '../fx/settings'
import { Intro } from './Intro'
import { Clock, Ornament, Pod } from './parts'

type Phase = 'title' | 'enter' | 'done'

const cursor = (
  <svg className="cursor" viewBox="0 0 18 14" aria-hidden="true">
    <path d="M0 4h8V0l10 7-10 7v-4H0z" />
  </svg>
)

export function Shell() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { playing, setMusic, ping, reducedMotion } = useSettings()
  const [phase, setPhase] = useState<Phase>('title')
  const [introGone, setIntroGone] = useState(false)
  const [podHidden, setPodHidden] = useState(false)
  const brandRef = useRef<HTMLSpanElement>(null)
  const navRef = useRef<HTMLElement>(null)

  const idx = Math.max(0, screens.findIndex(s => pathname.split('/')[1] === s.path))
  const screen = screens[idx]
  const interactive = phase !== 'title'

  useEffect(() => {
    document.title = `${screen.label} · ${profile.name}`
  }, [screen])

  const go = useCallback(
    (i: number, focus = false) => {
      const n = (i + screens.length) % screens.length
      navigate('/' + screens[n].path)
      ping(1320)
      if (focus) navRef.current?.querySelectorAll<HTMLElement>('a')[n]?.focus()
    },
    [navigate, ping],
  )

  // W / S switch screen, Esc returns to Status, M toggles music.
  useEffect(() => {
    if (!interactive) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return
      const k = e.key.toLowerCase()
      if (k === 'w') go(idx - 1)
      else if (k === 's') go(idx + 1)
      else if (k === 'escape') go(0)
      else if (k === 'm') setMusic(!playing)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [interactive, go, idx, playing, setMusic])

  const onNavKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      go(idx + 1, true)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      go(idx - 1, true)
    }
  }

  const onStart = useCallback(
    (withMusic: boolean) => {
      setMusic(withMusic)
      setPhase('enter')
    },
    [setMusic],
  )
  const onDone = useCallback(() => setIntroGone(true), [])

  // Drop the entrance-animation class once the sequence has played.
  useEffect(() => {
    if (phase !== 'enter') return
    const id = window.setTimeout(() => setPhase('done'), reducedMotion ? 0 : 2600)
    return () => window.clearTimeout(id)
  }, [phase, reducedMotion])

  return (
    <div className="app" data-phase={phase} data-intro={introGone ? 'gone' : 'on'}>
      <div className="frame">
        <div className="grid-bg" aria-hidden="true" />

        <header className="top">
          <div className="top-left">
            <span className="brand" ref={brandRef}>
              {profile.name}
            </span>
            <span className="screen-title">{screen.label}</span>
          </div>
          <div className="top-right">
            <button
              className={`bgm${playing ? ' playing' : ''}`}
              onClick={() => setMusic(!playing)}
              aria-pressed={playing}
              aria-label={playing ? 'Pause music' : 'Play music'}
            >
              <span className="eq" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>BGM {playing ? 'On' : 'Off'}</span>
              <span className="bgm-icon" aria-hidden="true">
                {playing ? '❚❚' : '▶'}
              </span>
            </button>
            <span className="label">
              {profile.unit.toUpperCase()} · LV {String(profile.year).padStart(2, '0')} · <Clock />
            </span>
          </div>
        </header>

        <Ornament className="top-orn" />

        {!podHidden && <Pod key={screen.path} tips={screen.pod} onDismiss={() => setPodHidden(true)} />}

        <div className="body">
          <nav className="nav" ref={navRef} aria-label="Sections" onKeyDown={onNavKey}>
            {screens.map((s, i) => (
              <NavLink
                key={s.path}
                to={'/' + s.path}
                className="navbtn"
                style={{ ['--i' as string]: i }}
                onClick={() => ping(990)}
              >
                {cursor}
                {s.label}
              </NavLink>
            ))}
          </nav>
          <main className="view" key={pathname.split('/')[1]} id="main">
            <Outlet />
          </main>
        </div>

        <div className="info">
          <span>{screen.info}</span>
          <span className="keys">
            <span>
              <kbd>W</kbd>
              <kbd>S</kbd>Select
            </span>
            <span>
              <kbd>⏎</kbd>Confirm
            </span>
            <span>
              <kbd>Esc</kbd>Status
            </span>
            <span>
              <kbd>M</kbd>Music
            </span>
          </span>
        </div>

        {!introGone && <Intro brandRef={brandRef} onStart={onStart} onDone={onDone} />}
      </div>
    </div>
  )
}
