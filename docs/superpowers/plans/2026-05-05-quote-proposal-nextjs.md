# Quote Proposal → Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `quote-proposal.html` into a runnable Next.js (App Router) project with identical visuals and behavior, using minimal restructuring.

**Architecture:** Single-page Next.js app. One `app/page.js` client component holds the entire markup; one `app/globals.css` holds all styles verbatim from the source `<style>` block; one `app/layout.js` provides `<html>`/`<body>` plus the same Google Fonts links the original used. Browser-side cursor and scroll-reveal logic lives in a single `useEffect` inside `page.js`.

**Tech Stack:** Next.js (latest, App Router), React, plain JavaScript, no extra dependencies.

**Reference:** Spec at `docs/superpowers/specs/2026-05-05-quote-proposal-nextjs-design.md`. Source page at `quote-proposal.html` (line ranges referenced below).

---

### Task 1: Project skeleton (package.json, configs, gitignore)

**Files:**
- Create: `package.json`
- Create: `next.config.mjs`
- Create: `jsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "quote-proposal",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

- [ ] **Step 2: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 3: Create `jsconfig.json`**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
.next/
out/
.env*.local
.DS_Store
*.log
```

- [ ] **Step 5: Verify files written**

Run: `ls -1 package.json next.config.mjs jsconfig.json .gitignore`
Expected: all four filenames listed, no errors.

---

### Task 2: Global stylesheet (verbatim copy from source `<style>` block)

**Files:**
- Create: `app/globals.css`
- Reference: `quote-proposal.html` lines 10–542 (the entire `<style>` block contents — everything between `<style>` on line 9 and `</style>` on line 543).

- [ ] **Step 1: Create `app/` directory**

Run: `mkdir -p app`

- [ ] **Step 2: Copy the CSS verbatim**

Copy the contents of `quote-proposal.html` between `<style>` (line 9) and `</style>` (line 543), exclusive of those tags themselves, into `app/globals.css`. Do not modify any rule, selector, value, or whitespace. The inline SVG noise data URL on line 51 stays exactly as-is.

- [ ] **Step 3: Verify the CSS file**

Run: `wc -l app/globals.css`
Expected: ~533 lines (lines 10–542 inclusive of source = 533 lines).

Run: `grep -c -- '--accent: #c8f542' app/globals.css`
Expected: `1` (sanity check that root variables made it in).

Run: `grep -c '@keyframes' app/globals.css`
Expected: `2` (`fadeUp` and `ticker`).

---

### Task 3: Root layout

**Files:**
- Create: `app/layout.js`

- [ ] **Step 1: Write `app/layout.js`**

```js
import './globals.css';

export const metadata = {
  title: 'Website Proposal — Jason',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Notes:
- The `<head>` contents mirror lines 7–8 of the source (the original lacks a `preconnect` to `fonts.gstatic.com`, but adding it is harmless and is what Google's snippet recommends; if you want byte-for-byte identical loading, remove the `gstatic.com` line).
- `metadata.title` matches the original `<title>` on line 6.
- The viewport meta tag from line 5 is replaced by the App Router `viewport` export (Next.js renders the equivalent meta tag).

- [ ] **Step 2: Verify file**

Run: `node --check app/layout.js`
Expected: no output (valid JS).

---

### Task 4: Page component — markup

**Files:**
- Create: `app/page.js`
- Reference: `quote-proposal.html` lines 545–909 (the `<body>` contents through the `</footer>`, excluding the `<script>` block which is handled in Task 5).

- [ ] **Step 1: Create `app/page.js` with the converted markup**

Convert the body content of `quote-proposal.html` (from `<div class="cursor" id="cursor">` on line 547 through `</footer>` on line 909) into JSX. Apply ONLY these mechanical transformations — do NOT change content, classes, structure, ordering, or whitespace beyond what's required by JSX:

1. `class="..."` → `className="..."`
2. `for="..."` → `htmlFor="..."`
3. Self-close void elements: `<br>` → `<br />`, `<img ...>` → `<img ... />`, `<input ...>` → `<input ... />`, `<hr>` → `<hr />`. (In this file the only one is `<br>` on lines 573, 576.)
4. Inline `style="key:value;..."` attributes → JSX style objects `style={{ key: 'value', ... }}`. CSS property names become camelCase. Values stay as strings. Example: `style="width:14px;height:14px;margin-right:7px;color:var(--gray);vertical-align:middle"` → `style={{ width: '14px', height: '14px', marginRight: '7px', color: 'var(--gray)', verticalAlign: 'middle' }}`. (Many of the inline `<svg>` elements have these.)
5. Escape stray entities in text content: `&` → `&amp;` is already entity-form in source so leave as-is; the apostrophe in `What's` and `Let's` and `we'll` is fine in JSX inside element text.
6. SVG attributes that contain hyphens stay hyphenated in JSX (`stroke-width`, `stroke-linecap`, `stroke-linejoin`, `stroke-dasharray`, `clip-path`) when used as attributes; React DOM accepts both forms but prefer keeping hyphenated as in the source for a literal copy. (Note: React technically warns when SVG attributes use camelCase mismatch — using the hyphenated form matches the original and avoids warnings.)
7. The `xmlns` attribute on `<svg>` is fine as-is (none in this source).
8. The page component is a default export named `Page` (or `default function Page()`).

The file must begin with `'use client';` on the first line because the component will use React hooks in Task 5.

Skeleton:

```js
'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Filled in Task 5
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>

      {/* Header */}
      <header>
        <div className="logo">WEB<span>+</span>PROPOSAL</div>
        <div className="header-tag">Confidential — Prepared for Jason</div>
      </header>

      {/* ... rest of converted body content from quote-proposal.html lines 555–909 ... */}
    </>
  );
}
```

When converting, include EVERY element from the source body in order: hero section, ticker section, pricing section with all three tier cards (Tier 1/2/3) including all line-items and their inline SVGs, the includes section with all 5 include-items, the process section with all 4 process-steps, the cta section, and the footer.

- [ ] **Step 2: Verify file syntax**

Run: `node --check app/page.js`
Expected: This will FAIL because Node can't parse JSX. Skip this — syntax verification happens via Next.js build in Task 6.

Instead run: `wc -l app/page.js`
Expected: roughly 350–400 lines (close to the source body length).

Run: `grep -c 'className=' app/page.js`
Expected: matches the count from `grep -c 'class=' quote-proposal.html` minus any classes inside the `<style>` block (there are none — the source uses `class=` only on body elements). Sanity check that `class=` was renamed throughout.

Run: `! grep -n ' class=' app/page.js`
Expected: no output (no leftover `class=` attributes).

---

### Task 5: Page component — `useEffect` for cursor + scroll-reveal

**Files:**
- Modify: `app/page.js` (replace the `useEffect` body placeholder)

- [ ] **Step 1: Implement the `useEffect`**

Replace the empty `useEffect(() => { ... }, [])` body in `app/page.js` with this exact implementation. It mirrors the original `<script>` block on lines 911–934 but with proper cleanup for the React lifecycle:

```js
useEffect(() => {
  const cursor = document.getElementById('cursor');

  const onMouseMove = (e) => {
    if (!cursor) return;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  };
  document.addEventListener('mousemove', onMouseMove);

  const hoverTargets = document.querySelectorAll(
    'a, .tier, .include-item, .process-step'
  );
  const onEnter = () => cursor && cursor.classList.add('hover');
  const onLeave = () => cursor && cursor.classList.remove('hover');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });

  const reveals = document.querySelectorAll('.reveal');
  const timeouts = [];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const t = setTimeout(
            () => entry.target.classList.add('visible'),
            i * 100
          );
          timeouts.push(t);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => observer.observe(el));

  return () => {
    document.removeEventListener('mousemove', onMouseMove);
    hoverTargets.forEach((el) => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    });
    observer.disconnect();
    timeouts.forEach(clearTimeout);
  };
}, []);
```

- [ ] **Step 2: Sanity-check the effect is wired**

Run: `grep -c "IntersectionObserver" app/page.js`
Expected: `1`

Run: `grep -c "addEventListener\\|removeEventListener" app/page.js`
Expected: at least `4` (mousemove add+remove, mouseenter/mouseleave add+remove inside forEach).

---

### Task 6: Install, run, and visually verify

**Files:** none

- [ ] **Step 1: Install dependencies**

Run: `npm install`
Expected: completes without errors, creates `node_modules/` and `package-lock.json`.

If `npm` is not present or you prefer another package manager, `pnpm install` or `yarn` work equivalently — just match it consistently for the lockfile.

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`
Expected: Next.js prints `Local: http://localhost:3000` (or another port if 3000 is busy) and "Ready in ...".

- [ ] **Step 3: Verify build also succeeds (separate terminal or after stopping dev)**

Run: `npm run build`
Expected: build completes without errors. No type errors, no missing-module errors, no React hydration warnings in the build output.

- [ ] **Step 4: Manual visual verification in a browser**

Open `http://localhost:3000` and confirm against opening `quote-proposal.html` directly in the same browser:

- Header: logo "WEB+PROPOSAL" with green `+`, "Confidential — Prepared for Jason" right-aligned, blurred backdrop.
- Hero: huge "PROPOSAL" background text faintly visible behind, hero title "Website / Design & / Development" with the middle line in green and last line as outlined text. Animated fade-in on load.
- Ticker: green bar of scrolling text with `✦` separators, animation runs continuously.
- Pricing: 3-column grid of tiers, middle tier has olive background and "POPULAR" badge in top-right.
- Includes: 5-column grid of icon cards on dark background.
- Process: 4-column grid with large faint step numbers.
- CTA: large "Let's / Build / Together." with "Build" green and "Together." outlined.
- Footer: copyright on left, note on right.
- Custom cursor: small green dot follows the mouse, grows large when hovering links / tier cards / include items / process steps.
- Scroll reveal: scrolling down causes the note-box, tiers grid, includes grid, and process steps to fade in with a slight upward translate.
- No `cursor: none` weirdness on touch (this is a known caveat from the spec — keeping behavior identical to source).

Open the browser devtools console and confirm:
- No red errors.
- No yellow warnings about hydration mismatches.
- No "Failed to load resource" errors (fonts should load).

- [ ] **Step 5: Stop the dev server**

Press `Ctrl+C` in the terminal running `npm run dev`.

---

## Done

The Next.js project is now runnable with `npm run dev` and renders identically to the original `quote-proposal.html`. The original HTML file remains in the repo for reference per the spec.
