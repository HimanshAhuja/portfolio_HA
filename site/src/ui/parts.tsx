import { useEffect, useState, type ReactNode } from 'react'

export function Ornament({ className = '' }: { className?: string }) {
  return <div className={`orn ${className}`} aria-hidden="true" />
}

export function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return <span className="mono">{now.toTimeString().slice(0, 8)}</span>
}

export function Panel({ children, inverted = false }: { children: ReactNode; inverted?: boolean }) {
  return <div className={`panel${inverted ? ' inv' : ''}`}>{children}</div>
}

export function KV({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="kv">
      <span>{k}</span>
      <span>{v}</span>
    </div>
  )
}

export function LevelBar({ level, max }: { level: number; max: number }) {
  return (
    <span className="lvl" role="img" aria-label={`Level ${level} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <i key={i} className={i < level ? 'on' : ''} />
      ))}
    </span>
  )
}

export function Pod({ tips, onDismiss }: { tips: string[]; onDismiss(): void }) {
  const [i, setI] = useState(0)
  return (
    <div className="pod" aria-live="polite">
      <svg className="pod-shape" viewBox="0 0 26 34" aria-hidden="true">
        <rect x="5" y="2" width="16" height="22" rx="1" />
        <path d="M3 26h20l-3 6H6z" />
        <rect x="0" y="8" width="3" height="10" />
        <rect x="23" y="8" width="3" height="10" />
      </svg>
      <div className="bubble">
        <button
          className="bubble-text"
          onClick={() => setI(n => (n + 1) % tips.length)}
          title={tips.length > 1 ? 'Next tip' : undefined}
        >
          <span className="mono bubble-tag">POD · {tips.length > 1 ? `${(i % tips.length) + 1}/${tips.length}` : 'NOTE'}</span>
          {tips[i % tips.length]}
        </button>
        <button className="bubble-x" onClick={onDismiss} aria-label="Dismiss Pod">
          ×
        </button>
      </div>
    </div>
  )
}
