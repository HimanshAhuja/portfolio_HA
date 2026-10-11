import { useState } from 'react'
import { intel } from '../content/intel'
import { useSettings } from '../fx/settings'
import { KV, Panel } from '../ui/parts'

export function Intel() {
  const { ping } = useSettings()
  const [open, setOpen] = useState<string | null>(intel[0].id)
  const [read, setRead] = useState<Set<string>>(() => new Set([intel[0].id]))
  const file = intel.find(f => f.id === open)

  return (
    <div className="split">
      <div className="wlist" role="list">
        {intel.map(f => (
          <button
            key={f.id}
            role="listitem"
            className="navbtn small"
            aria-current={f.id === open ? 'page' : undefined}
            onClick={() => {
              setOpen(f.id)
              setRead(prev => new Set(prev).add(f.id))
              ping(990)
            }}
          >
            {!read.has(f.id) && <span className="unread" aria-label="unread" />}
            {f.title}
          </button>
        ))}
      </div>
      <div className="detail">
        {file && (
          <Panel>
            <h2>{file.title}</h2>
            <span className="sub">{file.detail.toUpperCase()}</span>
            <div className="rows">
              {file.years && <KV k="Years" v={file.years} />}
              {file.score && <KV k={file.score[0]} v={file.score[1]} />}
            </div>
          </Panel>
        )}
      </div>
    </div>
  )
}
