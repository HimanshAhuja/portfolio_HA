export interface ScreenDef {
  path: string
  label: string
  info: string
  pod: string[]
}

export const screens: ScreenDef[] = [
  {
    path: 'status',
    label: 'Status',
    info: 'Unit summary and service record.',
    pod: [
      'Proposal: inspect Weapons. The bitkv record contains crash-test data.',
      'Note: press M to toggle music, or use the BGM switch in the header.',
    ],
  },
  {
    path: 'quests',
    label: 'Quests',
    info: 'Completed and active requests.',
    pod: ['Report: main quest Reelence cleared. Side quest from IISc also cleared.'],
  },
  {
    path: 'weapons',
    label: 'Weapons',
    info: 'Projects. Upgrade a weapon to read its full story.',
    pod: [
      'Proposal: upgrade bitkv to its maximum level.',
      'Note: Max level shows every weapon story at once.',
    ],
  },
  {
    path: 'chips',
    label: 'Chips',
    info: 'Plug-in chips. Select a chip to see where it was used.',
    pod: ['Note: only chips with a project on record link to a weapon.'],
  },
  {
    path: 'map',
    label: 'Map',
    info: 'Network of projects and the skills they use.',
    pod: ['Hint: hover a node to trace its links. Red nodes are projects.'],
  },
  {
    path: 'intel',
    label: 'Intel',
    info: 'Archived education records.',
    pod: ['Archive contains 3 files.'],
  },
  {
    path: 'system',
    label: 'System',
    info: 'Settings and transmission channels.',
    pod: ['Proposal: enable Hacking mode to switch to the dark theme.'],
  },
]
