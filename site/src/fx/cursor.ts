/**
 * NieR-style mouse cursors, generated as SVG so they follow the theme.
 *  default: a flat arrow with a hard offset shadow, like the headings.
 *  pointer: the menu selector arrow, tip as the hotspot, so it points at what you click.
 */
type Theme = 'sand' | 'hack'

const palette: Record<Theme, { fill: string; edge: string; shadow: string }> = {
  sand: { fill: '#4b4840', edge: '#d2cdb6', shadow: 'rgba(75,72,64,0.35)' },
  hack: { fill: '#d9d4bd', edge: '#1d1c19', shadow: 'rgba(0,0,0,0.55)' },
}

function url(svg: string, x: number, y: number, fallback: string) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${x} ${y}, ${fallback}`
}

export function cursorVars(theme: Theme) {
  const c = palette[theme]

  const arrow = 'M3 3V21L8 16.5L11.8 25L15.2 23.4L11.4 15H18Z'
  const defaultSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">` +
    `<path d="${arrow}" transform="translate(2 2)" fill="${c.shadow}"/>` +
    `<path d="${arrow}" fill="${c.fill}" stroke="${c.edge}" stroke-width="1.2" stroke-linejoin="miter"/>` +
    `</svg>`

  const selector = 'M0 4h8V0l10 7-10 7v-4H0z'
  const pointerSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="28" viewBox="0 0 36 28">` +
    `<g transform="translate(3 5) scale(1.45)">` +
    `<path d="${selector}" transform="translate(1.4 1.4)" fill="${c.shadow}"/>` +
    `<path d="${selector}" fill="${c.fill}" stroke="${c.edge}" stroke-width="0.8" stroke-linejoin="miter"/>` +
    `</g></svg>`

  return {
    default: url(defaultSvg, 3, 3, 'auto'),
    pointer: url(pointerSvg, 29, 15, 'pointer'),
  }
}
