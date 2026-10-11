import { combatRecord, profile } from '../content/profile'
import { KV, Panel } from '../ui/parts'

export function Status() {
  return (
    <>
      <div>
        <h2>{profile.name}</h2>
        <span className="sub">CLASS · {profile.classLabel.toUpperCase()}</span>
      </div>
      <div className="cols">
        <div className="rows">
          <KV k="Affiliation" v={profile.school} />
          <KV k="Program" v="B.Tech CSE" />
          <KV k="Service" v={profile.years} />
          <KV k="Level" v={`${String(profile.year).padStart(2, '0')} / ${String(profile.totalYears).padStart(2, '0')}`} />
          <KV k="Last deployment" v={profile.lastDeployment} />
        </div>
        <Panel inverted>
          <span className="mono tiny">COMBAT RECORD · bitkv</span>
          <div className="stats">
            {combatRecord.map(s => (
              <div key={s.label}>
                <div className="stat-big">{s.value}</div>
                <span className="mono tiny">{s.label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel>
        <span className="sub">SERVICE PROGRESS</span>
        <div className="segbar" role="img" aria-label={`Year ${profile.year} of ${profile.totalYears}`}>
          {Array.from({ length: profile.totalYears }, (_, i) => (
            <i key={i} className={i + 1 < profile.year ? 'done' : i + 1 === profile.year ? 'now' : ''} />
          ))}
        </div>
        <span className="mono tiny">
          YEAR {profile.year} OF {profile.totalYears} · GRADUATION 2028
        </span>
      </Panel>
    </>
  )
}
