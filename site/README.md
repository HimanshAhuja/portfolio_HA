# Himansh Ahuja — portfolio

A NieR:Automata-style pause menu built with Vite, React and TypeScript.
Design reference: `../design/portfolio-blueprint.html`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Where things live

| To change | Edit |
|---|---|
| Name, school, links, resume PDF | `src/content/profile.ts` |
| Internship and course | `src/content/quests.ts` |
| Projects (level-by-level stories) | `src/content/weapons.ts` |
| Skills and which project used them | `src/content/chips.ts` |
| Education | `src/content/intel.ts` |
| Skill-map layout | `src/content/map.ts` |
| Colours and fonts | `src/styles/tokens.css` |

## Music

With no track configured, a generated ambient placeholder plays. To use a real track, put the file in `public/audio/` and create `.env.local`:

```
VITE_BGM_URL=/audio/bgm.mp3
```

Only use music you have the rights to host. The NieR:Automata soundtrack belongs to Square Enix.

## Resume download

Copy the PDF into `public/` and set `links.resume` in `src/content/profile.ts` (for example `'/Himansh_Ahuja_Resume.pdf'`).

## Deploy

Push to GitHub and import the repo on Vercel with the root directory set to `site`. `vercel.json` already routes every path to the app so deep links like `/weapons/bitkv` work.
