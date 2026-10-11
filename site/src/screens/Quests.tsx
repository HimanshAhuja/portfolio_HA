import { quests } from '../content/quests'
import { Panel } from '../ui/parts'

export function Quests() {
  return (
    <>
      {quests.map(q => (
        <Panel key={q.id}>
          <div className="row-between">
            <h2>
              {q.kind} · {q.title}
            </h2>
            <span className="tag">{q.status}</span>
          </div>
          <span className="sub">
            {q.giver.toUpperCase()} · {q.meta.toUpperCase()}
          </span>
          {q.objectives.map(o => (
            <div className="objective" key={o}>
              {o}
            </div>
          ))}
        </Panel>
      ))}
    </>
  )
}
