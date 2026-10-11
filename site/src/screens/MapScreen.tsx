import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mapEdges, mapNodes, nodeToWeapon } from '../content/map'

export function MapScreen() {
  const navigate = useNavigate()
  const [hot, setHot] = useState<string | null>(null)
  const nodeById = useMemo(() => Object.fromEntries(mapNodes.map(n => [n.id, n])), [])
  const linked = useMemo(() => {
    const s = new Set<string>()
    if (hot) {
      s.add(hot)
      mapEdges.forEach(([a, b]) => {
        if (a === hot) s.add(b)
        if (b === hot) s.add(a)
      })
    }
    return s
  }, [hot])

  return (
    <>
      <div className="map-wrap">
        <svg className="map" viewBox="0 0 690 340" role="group" aria-label="Graph linking projects to the skills they use">
          {mapEdges.map(([a, b]) => (
            <line
              key={a + b}
              className={hot && (a === hot || b === hot) ? 'hot' : ''}
              x1={nodeById[a].x}
              y1={nodeById[a].y}
              x2={nodeById[b].x}
              y2={nodeById[b].y}
            />
          ))}
          {mapNodes.map(n => {
            const weaponId = nodeToWeapon[n.id]
            const open = () => weaponId && navigate(`/weapons/${weaponId}`)
            return (
              <g
                key={n.id}
                className={`node${hot && !linked.has(n.id) ? ' dim' : ''}`}
                tabIndex={0}
                role={weaponId ? 'link' : 'img'}
                aria-label={weaponId ? `${n.label}, open project` : n.label}
                onMouseEnter={() => setHot(n.id)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(n.id)}
                onBlur={() => setHot(null)}
                onClick={open}
                onKeyDown={e => e.key === 'Enter' && open()}
                style={{ cursor: weaponId ? 'pointer' : 'default' }}
              >
                <circle className={n.kind} cx={n.x} cy={n.y} r={n.kind === 'project' ? 8 : 4.5} />
                <text x={n.x} y={n.y + (n.kind === 'project' ? 23 : 17)} textAnchor="middle">
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <span className="sub">RED · PROJECT &nbsp; INK · SKILL OR ORGANISATION &nbsp; CLICK A PROJECT TO OPEN IT</span>
    </>
  )
}
