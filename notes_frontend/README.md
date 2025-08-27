# Personal Notes Manager - Frontend (Next.js)

A modern, minimalistic light-theme web UI for creating, editing, searching, and managing personal notes.

## Features
- User authentication (demo, localStorage-based)
- Create, edit, and delete notes
- Search and filter notes by text and tag
- Responsive design with a header, sidebar, main editor, and modal dialogs
- Color palette:
  - Primary: #1E90FF
  - Secondary: #333333
  - Accent: #FFD700

## Quick Start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables

Copy `.env.example` to `.env.local` and set as needed:

- `NEXT_PUBLIC_API_BASE_URL` (optional): Base URL for API calls. If empty, the app uses demo localStorage persistence.

## Structure

- `src/app` — App Router pages and global layout/styles
  - `/` — Landing page
  - `/auth` — Sign-in page (demo)
  - `/notes` — Notes UI (sidebar + editor)
- `src/lib` — Helpers (auth, storage, theme, api)
- `src/types` — Shared types

## Notes Persistence

For this exercise, data is stored in the browser’s localStorage. To integrate a real backend, replace calls in `src/lib/storage.ts` with API client functions in `src/lib/api.ts` and set `NEXT_PUBLIC_API_BASE_URL`.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Lint

## License

MIT
