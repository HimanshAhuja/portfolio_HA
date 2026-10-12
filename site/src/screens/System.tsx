import { links } from '../content/profile'
import { useSettings } from '../fx/settings'

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange(v: boolean): void }) {
  return (
    <div className="toggle-row">
      <span>{label}</span>
      <button className={`btn${on ? '' : ' ghost'}`} aria-pressed={on} onClick={() => onChange(!on)}>
        {on ? 'On' : 'Off'}
      </button>
    </div>
  )
}

export function System() {
  const s = useSettings()
  return (
    <div className="cols wide">
      <div className="rows">
        <span className="sub">SETTINGS</span>
        <Toggle label="Music" on={s.playing} onChange={s.setMusic} />
        <Toggle label="Menu sounds" on={s.sfx} onChange={s.setSfx} />
        <Toggle label="Effects" on={s.effects} onChange={s.setEffects} />
        <Toggle label="NieR cursor" on={s.cursor} onChange={s.setCursor} />
        <Toggle label="Hacking mode" on={s.hack} onChange={s.setHack} />
      </div>
      <div className="rows">
        <span className="sub">TRANSMISSION CHANNELS</span>
        <div className="kv">
          <span>Mail</span>
          <span className="selectable">{links.email}</span>
        </div>
        <div className="kv">
          <span>LinkedIn</span>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            {links.linkedinLabel}
          </a>
        </div>
        <div className="kv">
          <span>GitHub</span>
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            {links.githubLabel}
          </a>
        </div>
        <div className="kv">
          <span>Resume</span>
          {links.resume ? (
            <a href={links.resume} download>
              PDF · download
            </a>
          ) : (
            <span>PDF · coming soon</span>
          )}
        </div>
      </div>
    </div>
  )
}
