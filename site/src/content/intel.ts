export interface IntelFile {
  id: string
  title: string
  detail: string
  score: [label: string, value: string] | null
  years: string
}

export const intel: IntelFile[] = [
  {
    id: 'pes',
    title: 'PES University',
    detail: 'Bachelor of Technology, Computer Science Engineering',
    score: ['CGPA', '7.43'],
    years: '2024–2028',
  },
  {
    id: 'xii',
    title: 'Jayshree Periwal High School',
    detail: 'Class XII',
    score: ['Marks', '81.6%'],
    years: '',
  },
  {
    id: 'x',
    title: 'Neerja Modi School',
    detail: 'Class X',
    score: ['Marks', '84.5%'],
    years: '',
  },
]
