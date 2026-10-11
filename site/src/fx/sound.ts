/** Short synthesized UI blips. No audio files. */
let ctx: AudioContext | null = null

export function blip(freq = 1320, dur = 0.035) {
  try {
    ctx = ctx ?? new AudioContext()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'square'
    o.frequency.value = freq
    g.gain.setValueAtTime(0.04, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + dur)
  } catch {
    /* audio unavailable */
  }
}
