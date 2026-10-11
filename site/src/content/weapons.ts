export interface Weapon {
  id: string
  name: string
  type: string
  stack: string[]
  stats: [label: string, value: string][]
  /** One paragraph per level. Level N reveals the first N paragraphs. */
  story: string[]
  links: { label: string; href: string }[]
}

export const weapons: Weapon[] = [
  {
    id: 'bitkv',
    name: 'bitkv',
    type: 'Crash-safe storage engine',
    stack: ['C++20', 'Linux', 'epoll', 'GoogleTest', 'Docker', 'GitHub Actions'],
    stats: [
      ['Write throughput, 8 writers', '3.3×'],
      ['Crashes survived', '500'],
      ['Acknowledged ops verified', '97K'],
      ['Tests under ASan/UBSan/TSan', '57'],
    ],
    story: [
      'A persistent key-value storage engine in C++20 on the Bitcask design: an append-only log, an in-memory hash index, and CRC-checked records.',
      'Torn writes are detected and recovered from after a crash. Online compaction runs behind a crash-safe commit protocol.',
      'Group commit lets concurrent durable writers share fsyncs, raising write throughput 3.3× with 8 writers. A Redis-compatible epoll TCP server works with the unmodified redis-cli.',
      'A fault-injection harness kills the process with SIGKILL at random points. It verified 97K acknowledged operations across 500 crashes with zero data loss. CI runs the full suite under all three sanitizers and the crash harness on every push.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/HimanshAhuja/bitkv' }],
  },
  {
    id: 'resume-analyzer',
    name: 'Resume Analyzer',
    type: 'AI web application',
    stack: ['HTML5', 'CSS3', 'Vanilla JS', 'Node.js', 'Google Gemini API', 'Vercel Serverless'],
    stats: [
      ['Career fields scored', '6'],
      ['ATS score range', '0–100'],
      ['Prioritized suggestions', '5'],
    ],
    story: [
      'A full-stack AI-powered web app that scores resumes for ATS compatibility across 6 career fields using the Google Gemini API.',
      'The backend is a Vercel Serverless Function in Node.js. It returns structured JSON with an ATS score from 0 to 100 and 5 prioritized, actionable improvement suggestions.',
    ],
    links: [{ label: 'Live demo', href: 'https://ai-resume-analyzer-v2-nu.vercel.app/' }],
  },
  {
    id: 'news-tracker',
    name: 'News Tracker',
    type: 'LLM news summarizer · in development',
    stack: ['LLM APIs', 'Groq Llama', 'Gemini 2.5 Flash', 'OpenAI', 'NVIDIA'],
    stats: [['LLM providers integrated', '4']],
    story: [
      'A news platform built at Reelence that automatically fetches news content and summarizes it.',
      'It integrates four LLM providers (Groq Llama, Google Gemini 2.5 Flash, OpenAI, NVIDIA) to turn raw feeds into condensed article summaries. Still in development.',
    ],
    links: [],
  },
  {
    id: 'eutair',
    name: 'eutair.com',
    type: 'Production web app · deployed',
    stack: ['Full-stack web'],
    stats: [['Status', 'Deployed']],
    story: [
      'A full-stack web application for Reelence’s digital production pipeline, co-developed with one other intern.',
      'Deployed and live.',
    ],
    links: [{ label: 'Visit', href: 'https://eutair.com' }],
  },
]
