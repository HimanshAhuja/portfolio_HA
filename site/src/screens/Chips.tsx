import { useState } from 'react'
import { Link } from 'react-router-dom'
import { chipGroups, totalChips } from '../content/chips'
import { weapons } from '../content/weapons'
import { useSettings } from '../fx/settings'
import { Panel } from '../ui/parts'

export function Chips() {
  const { ping } = useSettings()
  const [selected, setSelected] = useState<string | null>(null)
  const chip = chipGroups.flatMap(g => g.chips).find(c => c.name === selected)
  const projects = chip ? weapons.filter(w => chip.usedIn.includes(w.id)) : []

  return (
    <>
      <Panel>
        <div className="row-between">
          <span className="sub">INSTALLED</span>
          <span className="mono">
            {totalChips} / {totalChips}
          </span>
        </div>
        <div className="bar" aria-hidden="true">
          <i style={{ width: '100%' }} />
        </div>
      </Panel>

      <Panel inverted>
        {chip ? (
          <>
            <span className="mono tiny">CHIP · {chip.name.toUpperCase()}</span>
            {projects.length > 0 ? (
              <div className="row-gap">
                <span>Used in</span>
                {projects.map(p => (
                  <Link key={p.id} className="btn inv-btn" to={`/weapons/${p.id}`}>
                    {p.name}
                  </Link>
                ))}
              </div>
            ) : (
              <span>No linked project on record yet.</span>
            )}
          </>
        ) : (
          <span>Select a chip to see where it was used.</span>
        )}
      </Panel>

      {chipGroups.map(g => (
        <section key={g.category} aria-label={g.category}>
          <div className="chip-cat">{g.category}</div>
          <div className="chips">
            {g.chips.map(c => (
              <button
                key={c.name}
                className={`chip${selected === c.name ? ' on' : ''}`}
                aria-pressed={selected === c.name}
                onClick={() => {
                  setSelected(selected === c.name ? null : c.name)
                  ping(selected === c.name ? 660 : 1320)
                }}
              >
                <span>{c.name}</span>
                {c.usedIn.length > 0 && <b aria-label={`${c.usedIn.length} linked`}>{'●'.repeat(c.usedIn.length)}</b>}
              </button>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
