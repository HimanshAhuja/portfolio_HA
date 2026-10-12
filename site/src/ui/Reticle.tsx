import { useEffect, useRef } from 'react'
import { useSettings } from '../fx/settings'

const INTERACTIVE = 'a[href], button:not(:disabled), [role="link"], [role="button"]'
const IDLE = 26 // px, free-floating diamond
const PAD = 6 // px, gap between a locked element and the brackets
const SETTLE_MS = 70 // easing time constant

/**
 * HUD reticle that trails the mouse as a small diamond and snaps its brackets
 * around whatever clickable thing is under the pointer. The real cursor stays visible.
 */
export function Reticle() {
  const { cursor, effects, reducedMotion } = useSettings()
  const enabled = cursor && effects && !reducedMotion
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = box.current
    if (!enabled || !el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let mx = 0
    let my = 0
    let target: Element | null = null
    let pressed = false
    let shown = false
    let x = 0
    let y = 0
    let w = IDLE
    let h = IDLE
    let raf = 0
    let last = performance.now()

    const show = (on: boolean) => {
      shown = on
      el.classList.toggle('show', on)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mx = e.clientX
      my = e.clientY
      target = (e.target as Element | null)?.closest?.(INTERACTIVE) ?? null
      if (!shown) {
        x = mx - IDLE / 2
        y = my - IDLE / 2
        show(true)
      }
    }
    const onDown = () => (pressed = true)
    const onUp = () => (pressed = false)
    const onLeave = () => show(false)

    const tick = (now: number) => {
      const k = 1 - Math.exp(-Math.min(now - last, 50) / SETTLE_MS)
      last = now
      let tx: number, ty: number, tw: number, th: number
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect()
        const pad = pressed ? PAD - 3 : PAD
        tx = r.left - pad
        ty = r.top - pad
        tw = r.width + pad * 2
        th = r.height + pad * 2
      } else {
        const s = pressed ? IDLE - 8 : IDLE
        tx = mx - s / 2
        ty = my - s / 2
        tw = th = s
      }
      x += (tx - x) * k
      y += (ty - y) * k
      w += (tw - w) * k
      h += (th - h) * k
      el.style.transform = `translate(${x}px, ${y}px)`
      el.style.width = `${w}px`
      el.style.height = `${h}px`
      el.classList.toggle('locked', !!target && target.isConnected)
      raf = requestAnimationFrame(tick)
    }

    const root = document.documentElement
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointerleave', onLeave)
      el.classList.remove('show', 'locked')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div className="reticle" ref={box} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  )
}
