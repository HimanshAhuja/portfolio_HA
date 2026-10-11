/** Hand-placed layout for the Map screen. Edges come from the weapons and chips content. */
export interface MapNode {
  id: string
  label: string
  x: number
  y: number
  kind: 'project' | 'skill' | 'org'
}

export const mapNodes: MapNode[] = [
  { id: 'bitkv', label: 'bitkv', x: 170, y: 170, kind: 'project' },
  { id: 'c++', label: 'C++', x: 70, y: 70, kind: 'skill' },
  { id: 'googletest', label: 'GoogleTest', x: 260, y: 62, kind: 'skill' },
  { id: 'linux', label: 'Linux · epoll', x: 55, y: 215, kind: 'skill' },
  { id: 'docker', label: 'Docker', x: 120, y: 300, kind: 'skill' },
  { id: 'actions', label: 'GitHub Actions', x: 265, y: 285, kind: 'skill' },

  { id: 'resume-analyzer', label: 'Resume Analyzer', x: 420, y: 140, kind: 'project' },
  { id: 'js', label: 'JavaScript', x: 350, y: 52, kind: 'skill' },
  { id: 'node', label: 'Node.js', x: 500, y: 52, kind: 'skill' },
  { id: 'vercel', label: 'Vercel', x: 575, y: 145, kind: 'skill' },
  { id: 'gemini', label: 'Gemini API', x: 455, y: 232, kind: 'skill' },

  { id: 'news-tracker', label: 'News Tracker', x: 550, y: 300, kind: 'project' },
  { id: 'llm', label: 'LLM APIs', x: 375, y: 308, kind: 'skill' },
  { id: 'reelence', label: 'Reelence', x: 625, y: 222, kind: 'org' },
  { id: 'eutair', label: 'eutair.com', x: 630, y: 80, kind: 'project' },
]

export const mapEdges: [string, string][] = [
  ['bitkv', 'c++'],
  ['bitkv', 'googletest'],
  ['bitkv', 'linux'],
  ['bitkv', 'docker'],
  ['bitkv', 'actions'],
  ['resume-analyzer', 'js'],
  ['resume-analyzer', 'node'],
  ['resume-analyzer', 'vercel'],
  ['resume-analyzer', 'gemini'],
  ['news-tracker', 'gemini'],
  ['news-tracker', 'llm'],
  ['news-tracker', 'reelence'],
  ['eutair', 'reelence'],
]

/** Project nodes that open a weapon page when activated. */
export const nodeToWeapon: Record<string, string> = {
  bitkv: 'bitkv',
  'resume-analyzer': 'resume-analyzer',
  'news-tracker': 'news-tracker',
  eutair: 'eutair',
}
