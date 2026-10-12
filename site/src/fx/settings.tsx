import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { blip } from './sound'
import { music } from './music'
import { cursorVars } from './cursor'

interface Prefs {
  music: boolean
  sfx: boolean
  effects: boolean
  hack: boolean
  /** NieR-style cursor and targeting reticle. */
  cursor: boolean
}

interface SettingsValue extends Prefs {
  /** True while the music is actually audible. `music` is only the saved preference. */
  playing: boolean
  reducedMotion: boolean
  setMusic(on: boolean): void
  setSfx(on: boolean): void
  setEffects(on: boolean): void
  setHack(on: boolean): void
  setCursor(on: boolean): void
  /** Play a UI blip when sound effects are enabled. */
  ping(freq?: number, dur?: number): void
}

const KEY = 'unit-ha:prefs'
const defaults: Prefs = { music: true, sfx: false, effects: true, hack: false, cursor: true }

function load(): Prefs {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults
  } catch {
    return defaults
  }
}

const Ctx = createContext<SettingsValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(load)
  const [playing, setPlaying] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs))
    } catch {
      /* storage unavailable */
    }
  }, [prefs])

  useEffect(() => {
    document.documentElement.dataset.theme = prefs.hack ? 'hack' : 'sand'
  }, [prefs.hack])

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion || !prefs.effects ? 'reduced' : 'full'
  }, [reducedMotion, prefs.effects])

  // Custom cursor images are set as CSS variables; removing them falls back to the system cursor.
  useEffect(() => {
    const root = document.documentElement
    if (!prefs.cursor) {
      root.style.removeProperty('--cursor-default')
      root.style.removeProperty('--cursor-pointer')
      return
    }
    const c = cursorVars(prefs.hack ? 'hack' : 'sand')
    root.style.setProperty('--cursor-default', c.default)
    root.style.setProperty('--cursor-pointer', c.pointer)
  }, [prefs.cursor, prefs.hack])

  const patch = useCallback((p: Partial<Prefs>) => setPrefs(prev => ({ ...prev, ...p })), [])

  const value = useMemo<SettingsValue>(
    () => ({
      ...prefs,
      playing,
      reducedMotion,
      setMusic(on) {
        if (on) music.play()
        else music.pause()
        setPlaying(on)
        patch({ music: on })
      },
      setSfx: on => patch({ sfx: on }),
      setEffects: on => patch({ effects: on }),
      setHack: on => patch({ hack: on }),
      setCursor: on => patch({ cursor: on }),
      ping(freq, dur) {
        if (prefs.sfx) blip(freq, dur)
      },
    }),
    [prefs, playing, reducedMotion, patch],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useSettings must be used inside SettingsProvider')
  return v
}
