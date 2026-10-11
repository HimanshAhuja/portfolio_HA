import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { weapons } from '../content/weapons'
import { useSettings } from '../fx/settings'
import { KV, LevelBar, Panel } from '../ui/parts'

export function Weapons() {
  const { id } = useParams()
  const { ping } = useSettings()
  const weapon = weapons.find(w => w.id === id) ?? weapons[0]
  const [levels, setLevels] = useState<Record<string, number>>({})
  const max = weapon.story.length
  const level = Math.min(levels[weapon.id] ?? 1, max)
  const setLevel = (n: number) => setLevels(prev => ({ ...prev, [weapon.id]: n }))

  return (
    <div className="split">
      <div className="wlist" role="list">
        {weapons.map(w => (
          <Link
            key={w.id}
            to={`/weapons/${w.id}`}
            role="listitem"
            className="navbtn small"
            aria-current={w.id === weapon.id ? 'page' : undefined}
            onClick={() => ping(990)}
          >
            {w.name}
          </Link>
        ))}
      </div>

      <div className="detail">
        <div>
          <h2>{weapon.name}</h2>
          <span className="sub">{weapon.type.toUpperCase()}</span>
        </div>

        <div className="row-gap">
          <span className="mono">
            LV {level}/{max}
          </span>
          <LevelBar level={level} max={max} />
          <button
            className="btn"
            disabled={level >= max}
            onClick={() => {
              setLevel(level + 1)
              ping(1760, 0.06)
            }}
          >
            {level >= max ? 'Max level' : 'Upgrade'}
          </button>
          {level < max && (
            <button className="btn ghost" onClick={() => setLevel(max)}>
              Max level
            </button>
          )}
          {level > 1 && (
            <button className="btn ghost" onClick={() => setLevel(1)}>
              Reset
            </button>
          )}
        </div>

        <div className="rows">
          {weapon.stats.map(([k, v]) => (
            <KV key={k} k={k} v={v} />
          ))}
        </div>

        <Panel>
          <span className="sub">WEAPON STORY</span>
          {weapon.story.map((para, i) =>
            i < level ? (
              <p key={i} className="story">
                {para}
              </p>
            ) : (
              <p key={i} className="story locked">
                ▒▒▒ LOCKED · REACH LV {i + 1} ▒▒▒
              </p>
            ),
          )}
        </Panel>

        <div className="stack-list">
          {weapon.stack.map(s => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>

        {weapon.links.length > 0 && (
          <div className="row-gap">
            {weapon.links.map(l => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
