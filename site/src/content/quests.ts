export interface Quest {
  id: string
  kind: 'Main' | 'Side'
  title: string
  giver: string
  meta: string
  status: 'CLEARED' | 'ACTIVE'
  objectives: string[]
}

export const quests: Quest[] = [
  {
    id: 'reelence',
    kind: 'Main',
    title: 'Reelence',
    giver: 'Creative AI and Digital Production Intern',
    meta: 'May–Jul 2026 · Remote',
    status: 'CLEARED',
    objectives: [
      'Co-developed full-stack web applications for the digital production pipeline in a two-person intern team, including eutair.com (deployed) and a News Tracker platform (in development).',
      'Built the News Tracker with integrated LLM APIs (Groq Llama, Google Gemini 2.5 Flash, OpenAI, NVIDIA) to fetch news automatically and turn raw feeds into condensed article summaries.',
      'Curated and structured a dataset of AI-generated videos and micro-drama platform content to feed the company’s AI video-generation model.',
    ],
  },
  {
    id: 'iisc',
    kind: 'Side',
    title: 'IISc Bengaluru',
    giver: 'Design Thinking and Methodology',
    meta: 'Jul 2026 · One-week in-person module · Team of 5',
    status: 'CLEARED',
    objectives: [
      'Took a campus problem to a working Figma prototype: a Hybrid Token System for canteen queue management with live order status and wait estimates.',
      'Used Brainstorming and Synectics for ideation, then filtered candidate solutions on a Morphological Matrix by impact and feasibility.',
    ],
  },
]
