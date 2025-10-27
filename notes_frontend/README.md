# Ocean Notes (Next.js)

A modern notes UI implementing the Ocean Professional style guide. Features a responsive two-pane layout with notes list (left) and editor/details (right), using in-memory state for CRUD interactions. Prepared for future REST API integration via `src/lib/notesClient.ts`.

## Getting Started

Development server:
```bash
npm run dev
# http://localhost:3000
```

## Features

- Responsive split layout: notes list + editor
- Create, select, edit, and delete notes (in-memory)
- Ocean Professional theme (blue & amber accents, subtle gradients, clean UI)
- Modular components
  - `Navbar` (top)
  - `NotesList` (left pane)
  - `NoteEditor` (right pane)
- Ready for REST API integration via `src/lib/notesClient.ts` (TODO stubs included)

## Code Map

- `src/app/page.tsx` — main page with in-memory state and layout
- `src/components/Navbar.tsx` — top navigation
- `src/components/NotesList.tsx` — notes list
- `src/components/NoteEditor.tsx` — note editor
- `src/lib/notesClient.ts` — client stub with TODOs for REST calls
- `src/app/globals.css` — Ocean theme and base styles (Tailwind v4 imported)

## Styling

- Theme variables in CSS:
  - `--ocean-primary` `--ocean-secondary` `--ocean-bg` `--ocean-surface` `--ocean-text`
- Uses Tailwind utilities (already configured in the project) with lightweight custom CSS.

## Future Integration

- Replace in-memory state with REST calls:
  - `notesClient.list() / create() / update() / remove()`
  - Connect to backend endpoints (when available)
- Add persistence, filtering/search, tags, and rich text editing as needed.

## Notes

- No environment variables required for current functionality.
- Favicon is a placeholder; replace `public/favicon.ico` with a real icon.
