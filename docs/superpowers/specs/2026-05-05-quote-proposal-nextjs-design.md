# Design: Convert `quote-proposal.html` to Next.js (Minimal)

**Date:** 2026-05-05
**Source:** `quote-proposal.html` (single 35K static page)
**Goal:** Run the existing page inside a Next.js project with the same look and behavior, with as little restructuring as possible.

## Stack

- Next.js (latest stable, App Router)
- Plain JavaScript (no TypeScript)
- No Tailwind, no UI libs, no extra dependencies beyond `next`, `react`, `react-dom`
- Node 18.18+ (Next.js requirement)

## File Structure

```
bro/
├── app/
│   ├── layout.js          # Root layout: <html>, <body>, Google Fonts <link> tags, metadata
│   ├── page.js            # 'use client' — entire page as one component
│   └── globals.css        # Verbatim copy of the original <style> block
├── public/                # (empty for now — no static assets needed)
├── package.json
├── next.config.mjs
├── jsconfig.json
├── .gitignore
└── quote-proposal.html    # Kept in repo for reference
```

## Conversion Rules

### 1. CSS → `app/globals.css`
- Copy the contents of the `<style>` block from `quote-proposal.html` verbatim into `app/globals.css`.
- The inline SVG noise data URL stays in CSS (it's already a CSS `url(...)` value — no change needed).
- Imported once at the top of `app/layout.js` via `import './globals.css'`.

### 2. Markup → `app/page.js`
- Body content becomes the JSX returned by the page component.
- Mechanical attribute renames: `class` → `className`, `for` → `htmlFor`, `tabindex` → `tabIndex`, etc.
- Self-close void elements: `<br>` → `<br />`, `<img>` → `<img />`, `<hr>` → `<hr />`.
- Escape any stray `&` (use `&amp;`) and angle-bracket text where needed.
- Inline `style="..."` attributes (if any) convert to JSX style objects.

### 3. JavaScript → `useEffect` in `app/page.js`
The original `<script>` block has two pieces of behavior — both move into a single `useEffect(() => { ... }, [])` with a cleanup function:

**Custom cursor:**
- Attach `mousemove` listener on `document` updating the `#cursor` element's position.
- Attach `mouseenter`/`mouseleave` on `a, .tier, .include-item, .process-step` to toggle `.hover` class.
- Cleanup: `removeEventListener` for all listeners.

**Scroll reveal:**
- Create an `IntersectionObserver` with threshold 0.1 that adds `.visible` to each `.reveal` element with a staggered `setTimeout` of `i * 100ms` and unobserves.
- Cleanup: `observer.disconnect()` and clear any pending timeouts.

The component is marked `'use client'` at the top of the file because of these browser-only side effects.

### 4. Fonts and `<head>` → `app/layout.js`
- Google Fonts: keep the same `<link rel="preconnect">` and `<link href="https://fonts.googleapis.com/css2?...">` tags. Place them via the App Router `metadata` export's `other` field is awkward; instead, render them directly in JSX inside `<head>` of the root layout. This matches the original loading behavior exactly.
- `<title>` and viewport metadata move to the `metadata` and `viewport` exports in `app/layout.js`:
  - `metadata.title = 'Website Proposal — Jason'`
  - viewport via `export const viewport = { width: 'device-width', initialScale: 1 }`

### 5. `package.json`
Standard Next.js scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  }
}
```

### 6. `next.config.mjs`
Empty config — `export default {}`.

### 7. `jsconfig.json`
Standard JS path-alias config so `@/` resolves to project root (Next.js convention).

### 8. `.gitignore`
Standard Next.js gitignore (`.next/`, `node_modules/`, `.env*.local`, etc.).

## Out of Scope

- Splitting the page into per-section components (Hero, Tiers, Process, Footer, etc.)
- Migrating fonts to `next/font/google`
- Migrating images (none present) to `next/image`
- Tailwind / CSS modules / styled-components
- TypeScript
- ESLint config beyond Next.js defaults
- Tests
- Deployment config

## Known Caveats Preserved As-Is

- `cursor: none` is set globally with a custom cursor element. Bad UX on touch devices, but the design says "minimal restructuring" — keeping behavior identical.
- The `<script>` runs after DOM parse in the original. In React the `useEffect` runs after mount, so timing is equivalent. The `IntersectionObserver` will pick up `.reveal` elements that exist in the initial render.
- `mix-blend-mode: exclusion` on the cursor relies on stacking context — should be unchanged since the cursor div is the last child of `<body>`.

## Verification Checklist

After implementation, the dev server should show a page that is visually and behaviorally identical to opening `quote-proposal.html` directly in a browser:

- All sections render with the same fonts, colors, spacing, layout.
- Custom cursor follows the mouse and grows when hovering links/tiers/include-items/process-steps.
- Scroll-reveal: `.reveal` elements fade in with the staggered delay as they enter the viewport.
- No console errors or hydration warnings.
- Header `backdrop-filter: blur(12px)` works.
- SVG noise overlay visible at low opacity.
