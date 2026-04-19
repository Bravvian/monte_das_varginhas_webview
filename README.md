# Monte das Varginhas

Villa booking site for Monte das Varginhas, Porto Covo, Alentejo, Portugal.

Live: https://montevarginhas.netlify.app

---

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19 + Vite |
| i18n | react-i18next (EN / PT / FR / ES) |
| Styling | CSS custom properties |
| Contact form | Formspree |
| Hosting | Netlify |

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # preview production build locally
npm run lint     # ESLint
```

---

## Environment variables

Copy `.env.example` to `.env.local` and set each value:

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_ID` | Formspree form ID (the hash in your form endpoint) |
| `VITE_WHATSAPP` | WhatsApp number in international format, no `+` (e.g. `351914706704`) |
| `VITE_EMAIL` | Contact email shown on the site |
| `VITE_GA_ID` | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`); omit to disable |

All variables must be prefixed with `VITE_` to be exposed to the browser by Vite.

---

## Images

Images are served either from Google Drive or from `public/images/` depending on the `LOCAL_IMAGES` flag in `src/data/images.js`.

- `LOCAL_IMAGES = false` (default) — images load from Google Drive URLs defined in `images.js`.
- `LOCAL_IMAGES = true` — images load from `/images/` in `public/`. Use this for local development with downloaded assets.

To switch to local images, set `LOCAL_IMAGES = true` in `src/data/images.js` and drop the files into `public/images/` following the naming conventions documented in [`public/images/README.md`](public/images/README.md).

**Naming summary:**
- `hero/` — `hero-1.jpg` … `hero-5.jpg`
- `room1/` … `room4/` — `room1-1.jpg`, `room1-2.jpg`, etc.
- `gallery/` — `gallery-1.jpg` … `gallery-46.jpg`

---

## Translations

Translation files live in `public/locales/{en,pt,fr,es}/translation.json`.

To edit existing strings, find the key in the relevant JSON files and update the value in each language file.

To add a new language:
1. Create `public/locales/{lang}/translation.json` with all keys translated.
2. Add the language code to the i18n initialisation in `src/i18n.js` (or equivalent config file).
3. Add a language switcher entry in the UI if needed.

The site uses `i18next-browser-languagedetector` to pick the user's browser language on first visit.

---

## Netlify deployment

Push to `main` triggers an automatic deploy via `netlify.toml`.

Set the environment variables (`VITE_*`) in the Netlify dashboard under **Site configuration → Environment variables**. They are not read from `.env.local` in CI.

Build command: `npm run build`  
Publish directory: `dist`

---

## Alojamento Local

Monte das Varginhas is a licensed Alojamento Local property in Porto Covo, Alentejo.  
AL registration number: *(to be added)*
