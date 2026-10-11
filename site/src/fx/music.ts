/**
 * Background music.
 * If VITE_BGM_URL is set (e.g. /audio/bgm.mp3), that file loops with fades.
 * Otherwise a generated ambient placeholder plays (Am–F–C–G pads with an echoing bell line).
 */
const TRACK_URL = import.meta.env.VITE_BGM_URL as string | undefined

const FADE_IN_MS = 1500
const FADE_OUT_MS = 500
const TARGET_VOLUME = 0.55

interface Player {
  play(): void
  pause(): void
}

function createFilePlayer(url: string): Player {
  let audio: HTMLAudioElement | null = null
  let fade = 0
  const ramp = (to: number, ms: number, done?: () => void) => {
    cancelAnimationFrame(fade)
    if (!audio) return
    const el = audio
    const from = el.volume
    const t0 = performance.now()
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms)
      el.volume = from + (to - from) * k
      if (k < 1) fade = requestAnimationFrame(step)
      else done?.()
    }
    fade = requestAnimationFrame(step)
  }
  return {
    play() {
      if (!audio) {
        audio = new Audio(url)
        audio.loop = true
        audio.volume = 0
      }
      void audio.play().then(() => ramp(TARGET_VOLUME, FADE_IN_MS)).catch(() => {})
    },
    pause() {
      ramp(0, FADE_OUT_MS, () => audio?.pause())
    },
  }
}

function createGeneratedPlayer(): Player {
  let ac: AudioContext | null = null
  let master: GainNode
  let echo: GainNode
  let timer: number | undefined
  let stopTimer: number | undefined
  let step = 0
  let on = false

  const hz = (m: number) => 440 * Math.pow(2, (m - 69) / 12)
  const chords = [
    [45, 57, 60, 64],
    [41, 57, 60, 65],
    [36, 55, 60, 64],
    [43, 55, 59, 62],
  ]
  const melody = [
    [76, 72, 69],
    [77, 72, 69],
    [76, 72, 67],
    [74, 71, 67],
  ]

  function init() {
    ac = new AudioContext()
    master = ac.createGain()
    master.gain.value = 0
    const lp = ac.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 2200
    master.connect(lp)
    lp.connect(ac.destination)
    echo = ac.createGain()
    const delay = ac.createDelay()
    delay.delayTime.value = 0.42
    const feedback = ac.createGain()
    feedback.gain.value = 0.38
    echo.connect(master)
    echo.connect(delay)
    delay.connect(feedback)
    feedback.connect(delay)
    delay.connect(master)
  }

  function voice(type: OscillatorType, f: number, t: number, attack: number, peak: number, release: number, dest: AudioNode, detune = 0) {
    if (!ac) return
    const o = ac.createOscillator()
    const g = ac.createGain()
    o.type = type
    o.frequency.value = f
    o.detune.value = detune
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(peak, t + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release)
    o.connect(g)
    g.connect(dest)
    o.start(t)
    o.stop(t + attack + release + 0.05)
  }

  function bar() {
    if (!ac) return
    const t = ac.currentTime + 0.05
    const i = step % 4
    chords[i].forEach((n, k) => {
      voice('triangle', hz(n), t, 1.4, k ? 0.018 : 0.03, 3.4, master, -6)
      voice('sine', hz(n), t, 1.4, k ? 0.014 : 0.02, 3.4, master, 6)
    })
    melody[i].forEach((n, k) => voice('sine', hz(n), t + k * 1.33, 0.01, 0.05, 1.6, echo))
    step++
  }

  return {
    play() {
      try {
        if (!ac) init()
        if (!ac) return
        window.clearTimeout(stopTimer)
        void ac.resume()
        on = true
        master.gain.cancelScheduledValues(ac.currentTime)
        master.gain.setTargetAtTime(1, ac.currentTime, 0.8)
        if (timer === undefined) {
          bar()
          timer = window.setInterval(bar, 4000)
        }
      } catch {
        /* audio unavailable */
      }
    },
    pause() {
      if (!ac) return
      on = false
      master.gain.cancelScheduledValues(ac.currentTime)
      master.gain.setTargetAtTime(0, ac.currentTime, 0.2)
      stopTimer = window.setTimeout(() => {
        if (!on && ac) {
          window.clearInterval(timer)
          timer = undefined
          void ac.suspend()
        }
      }, 900)
    },
  }
}

export const music: Player = TRACK_URL ? createFilePlayer(TRACK_URL) : createGeneratedPlayer()
