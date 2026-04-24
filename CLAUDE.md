# Dratenkko Portfolio — CLAUDE.md

## Project Overview

This is the personal portfolio website of **Sebastian Vargas B.** (GitHub: Dratenkko, sebavb.dev). Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Features a MiniMax-powered AI assistant in an interactive terminal UI.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **AI:** MiniMax API (via /api/chat endpoint)
- **Icons:** Lucide React
- **Fonts:** Google Fonts (custom)

## Key Files

- `src/pages/api/chat.ts` — MiniMax API proxy endpoint
- `src/components/ui/InteractiveTerminal.tsx` — AI chat terminal UI
- `src/data/constants.ts` — All portfolio content (skills, projects, experience)
- `src/components/sections/` — Page sections (Hero, Experience, Skills, Projects, etc.)
- `.env` — Contains `VITE_MINIMAX_API_KEY` (NEVER commit this)

## Commands

```bash
pnpm install    # Install deps
pnpm dev        # Start dev server (http://localhost:5173)
pnpm build      # Production build
pnpm preview    # Preview production build
```

## Design Principles (UI/UX Pro Max)

- **Minimalism + Dark Mode first** — clean, professional aesthetic
- **Responsive** — works on mobile, tablet, desktop
- **Performance** — lazy loading, optimized images, minimal JS
- **Accessibility** — semantic HTML, keyboard navigation, proper contrast
- **Typography** — clear hierarchy with Google Fonts

## API

### POST /api/chat

Body:
```json
{ "message": "string", "history": [{ "role": "user|assistant", "content": "string" }] }
```

Response:
```json
{ "response": "string" }
```

MiniMax API key must be set in `VITE_MINIMAX_API_KEY`.

## Workflow

1. Make surgical changes — touch only what you must
2. Test after each change
3. Keep it simple — no over-engineering
4. Define success criteria before starting
