# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite, localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview production build locally
npm run lint       # ESLint
```

No test suite exists yet.

## Architecture

Single-page React 19 + Vite app. No router — the page is one long vertical scroll with anchor links.

### Data layer (`src/data/`)

All site configuration lives here, not scattered in components:

- **`config.js`** — `CFG` object with email, WhatsApp, Formspree ID, iCal URLs, and manually blocked dates. Edit this to change contact details or block availability.
- **`images.js`** — All image paths. Exports named arrays (`HERO`, `GALLERY`, `ROOM1`–`ROOM4`), a flat `ALL_IMAGES` array used by the lightbox, and an `OFFSETS` object mapping section names to their start index in `ALL_IMAGES`. Components reference images by section array, not by raw index. When adding/removing images, update these arrays and `OFFSETS` accordingly.
- **`amenities.js`**, **`reviews.js`** — Static data for those sections.

### i18n

Translations load at runtime from `public/locales/{en,pt,fr,es}/translation.json` via `i18next-http-backend`. The `useLanguage` hook wraps `useTranslation` and exposes `{ t, lang, setLang }`. All user-visible strings go through `t('key')`. To add a string, add the key to all four JSON files.

### Booking calendar (`src/hooks/useCalendar.js`)

Manages check-in/check-out selection state. Key points:
- `toDateStr()` uses local date components (`getFullYear/Month/Date`), **not** `toISOString()` — using ISO string causes an off-by-one in UTC+ timezones that creates an infinite loop in the range-check loop.
- `CFG.icalUrls` feeds dynamic blocked dates fetched via `https://api.allorigins.win/raw` CORS proxy. `CFG.blocked` is for manually hardcoded blocked dates.
- `pick(dateStr)` handles both first click (set check-in) and second click (set check-out, or reset if blocked dates fall in range).

### Lightbox

`useLightbox` in `App.jsx` holds global open/index state. `lbOpen(idx)` takes an index into `ALL_IMAGES`. Each component that can trigger the lightbox receives `onImageClick` as a prop and passes `OFFSETS.SECTION + localIndex` to it.

### Environment variables

All prefixed `VITE_` (required by Vite for browser exposure). Hardcoded fallbacks exist in `config.js` so the site works without a `.env.local`. For Netlify, set them in the dashboard — `.env.local` is not read in CI.

| Variable | Purpose |
|---|---|
| `VITE_FORMSPREE_ID` | Formspree form hash |
| `VITE_WHATSAPP` | WhatsApp number, no `+` (e.g. `351914706704`) |
| `VITE_EMAIL` | Contact email |
| `VITE_GA_ID` | GA4 measurement ID; omit to disable |

### Deployment

Push to `main` auto-deploys via Netlify (`netlify.toml`). Build: `npm run build`, publish: `dist/`.
