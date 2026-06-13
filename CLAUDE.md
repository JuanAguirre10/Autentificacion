# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run start     # Run production build
npm run lint      # ESLint (eslint v9 flat config)
```

No test runner is configured.

## Stack

- **Next.js 16.2.9** — App Router. This version has breaking changes; always read `node_modules/next/dist/docs/` before touching routing, middleware, or server components.
- **next-auth v4** — authentication via `[...nextauth]` catch-all route
- **React 19.2.4**
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss`; no `tailwind.config.*` file (v4 uses CSS-first config)
- **TypeScript 5** — strict mode, path alias `@/*` → `./src/*`

## Architecture

All source lives under `src/`:

- `src/app/` — App Router pages and layouts
- `src/app/layout.tsx` — Root layout; reads session server-side with `getServerSession(authOptions)` and renders the global nav
- `src/middleware.ts` — Protects `/dashboard` and `/profile` routes using `next-auth/middleware`

### Auth flow

`next-auth` is wired up at `src/app/api/auth/[...nextauth]/route.ts` (not yet created). The `authOptions` export from that file is imported by both the root layout (for server-side session reads) and next-auth itself.

The layout wraps children in a `<Provider>` (`src/components/SessionProvider.tsx`) to expose the session to Client Components via `useSession`. `LogoutButton` (`src/components/LogoutButton.tsx`) is a Client Component that calls `signOut()`.

### Missing files to implement

The layout already imports these — create them to make the app compile:
- `src/app/api/auth/[...nextauth]/route.ts` — export `authOptions` and the `GET`/`POST` handlers
- `src/components/SessionProvider.tsx` — thin wrapper around `next-auth/react`'s `SessionProvider`
- `src/components/LogoutButton.tsx` — `"use client"` component calling `signOut()`
- `src/app/dashboard/page.tsx` and `src/app/profile/page.tsx` — protected pages
