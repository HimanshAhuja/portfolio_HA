export interface Chip {
  name: string
  /** Weapon ids where the resume shows this skill in use. */
  usedIn: string[]
}

export interface ChipGroup {
  category: string
  chips: Chip[]
}

export const chipGroups: ChipGroup[] = [
  {
    category: 'Languages',
    chips: [
      { name: 'C++', usedIn: ['bitkv'] },
      { name: 'C', usedIn: [] },
      { name: 'Python', usedIn: [] },
      { name: 'Java', usedIn: [] },
      { name: 'Go', usedIn: [] },
      { name: 'SQL', usedIn: [] },
    ],
  },
  {
    category: 'Systems',
    chips: [
      { name: 'Linux', usedIn: ['bitkv'] },
      { name: 'TCP sockets (epoll)', usedIn: ['bitkv'] },
      { name: 'Docker', usedIn: ['bitkv'] },
      { name: 'GitHub Actions', usedIn: ['bitkv'] },
    ],
  },
  {
    category: 'Web',
    chips: [
      { name: 'JavaScript', usedIn: ['resume-analyzer'] },
      { name: 'React.js', usedIn: [] },
      { name: 'Node.js', usedIn: ['resume-analyzer'] },
      { name: 'Express.js', usedIn: [] },
      { name: 'REST APIs', usedIn: [] },
      { name: 'MongoDB', usedIn: [] },
    ],
  },
  {
    category: 'AI / ML and data',
    chips: [
      { name: 'LLM APIs', usedIn: ['resume-analyzer', 'news-tracker'] },
      { name: 'RAG', usedIn: [] },
      { name: 'PyTorch', usedIn: [] },
      { name: 'TensorFlow', usedIn: [] },
      { name: 'Hugging Face', usedIn: [] },
      { name: 'Pandas', usedIn: [] },
      { name: 'NumPy', usedIn: [] },
    ],
  },
  {
    category: 'Developer tools',
    chips: [
      { name: 'Git', usedIn: ['bitkv'] },
      { name: 'GitHub', usedIn: ['bitkv'] },
      { name: 'CMake', usedIn: [] },
      { name: 'Vercel', usedIn: ['resume-analyzer'] },
      { name: 'Figma', usedIn: [] },
    ],
  },
]

export const totalChips = chipGroups.reduce((n, g) => n + g.chips.length, 0)
