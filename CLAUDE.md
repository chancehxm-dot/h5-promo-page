# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Run Commands

```bash
npm run dev       # Vite dev server (default http://localhost:5173)
npm run build     # TypeScript check + Vite production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint on all files
```

Bun is also available as an alternative package manager (`bun.lock` exists alongside `package-lock.json`).

## Architecture Overview

This is a React 19 + TypeScript + Vite 8 H5 promo page for mobile app install campaigns. It serves two faces (A/B) that flip based on user behavior.

### Page Switching Logic (core flow)

`App.tsx` renders either PageA or PageB based on `hasReturned` from `usePageVisibility`:

1. **First visit** → PageA (app landing page, "Download Now" CTA)
2. **User clicks install** → `markInstallClicked()` writes `install_clicked=true` + timestamp to localStorage, then starts a 500ms polling interval that checks `document.hidden` / `document.hasFocus()` for up to 30s
3. **User returns from App Store** → `handleUserReturn()` detects the return via `visibilitychange`, `focus`, or `pageshow` events, validates the timestamp is within the 30s window, then sets `hasReturned = true`
4. **PageB renders** → story carousel + encrypted article content + "Continue Reading" CTA

PageC (Block Blast promo) is implemented but commented out in `App.tsx`. FacebookFeed is a standalone Facebook-feed-mock ad component also not currently wired into App.

### Component Map

| Component | Purpose | Key Behavior |
|-----------|---------|--------------|
| `PageA` | App Store-style landing | Uses `aPage*` config fields, GIF tracking on load/click |
| `PageB` | Story + article "second chance" page | Fetches AES-CBC encrypted `/article.json`, carousel, dual-platform store URL |
| `PageC` | Alternative app promo (Block Blast) | Same layout as PageA, uses `cPage*` config fields |
| `FacebookFeed` | Mock Facebook feed with sponsored posts | Standalone, not in App.tsx; hardcoded PlotFork store URL |

### Encrypted Article System (PageB)

`/article.json` is expected to return:
```typescript
{ version: number, algorithm: "AES-CBC", keyHint: string, iv: string, data: string }
```

Decryption uses WebCrypto API (`SHA-256` digest of a hardcoded passphrase → `AES-CBC` key), with a CryptoJS (`crypto-js` package) fallback if WebCrypto is unavailable. The decrypted payload produces `{ title, chapter, summary, paragraphs[] }`.

### GIF Tracking (`src/utils/tracking.ts`)

Uses a 1×1 pixel `<img>` injection as a tracking beacon. URL pattern depends on device detection:
- **Mobile**: `/<first-char-of-domain>.gif?s=<domain>m&a=<platform>m&t=<event>&_=<timestamp>`
- **Desktop**: `/<first-char-of-domain>.gif?s=<domain>&a=<platform>&t=<event>&_=<timestamp>`

Events: `a_page_show`, `a_install_click`, `b_page_show`, `b_install_click`, plus various FacebookFeed interaction events.

### Config System (`src/config/app.config.ts`)

All content (app names, icons, descriptions, URLs, screenshots) is centralized in `defaultConfig`. Each "page" (A/B/C) draws from its own set of prefixed fields (`aPage*`, `bPage*`, `cPage*`). Images are imported as ES module imports so Vite can hash them.

### Build Optimizations (vite.config.ts)

- **Minification**: Terser with `drop_console`, `drop_debugger`, dead code elimination, top-level name mangling
- **No sourcemaps** in production
- **Asset hashing** in filenames, organized by type into `assets/img/`, `assets/css/`, `assets/fonts/`

### Standalone HTML Versions

- `index.js.md` — ES5 standalone tracking script reference (the GIF beacon logic in vanilla JS)
- `index-a.html.md` — ES5 standalone PageA HTML (no React, no build step)
- `facebook-home/` — Separate static HTML site (not part of the Vite build)

These are reference/source files for deployment scenarios that don't use the React build pipeline.

### Tech Stack

React 19, TypeScript 6, Vite 8, CSS (plain, not modules), crypto-js (AES fallback), Terser (minification)
