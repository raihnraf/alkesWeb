---
phase: "02"
plan: 1
subsystem: shared-layout-navigation
tags: [header, navigation, mobile-menu, accessibility, shared-components]
dependency:
  requires: []
  provides: [shared-header, nav-js, mobile-menu, skip-link, active-state-detection]
  affects: [all-7-pages]
tech-stack:
  added: [vanilla-js, tailwind-css-v4, material-symbols]
  patterns: [grid-template-rows-animation, scroll-lock, aria-expanded]
key-files:
  created:
    - src/partials/header.html
    - src/js/nav.js
    - .gitignore
  modified:
    - src/css/main.css
    - src/home.html
    - src/about.html
    - src/contact.html
    - src/products/blue-diode-laser.html
    - src/products/ultrasonic-surgery.html
    - src/products/holmium-laser.html
    - src/products/consumables.html
decisions:
  - Header HTML duplicated across all 7 pages (no partial include mechanism) per D-01
  - grid-template-rows 0fr->1fr animation chosen over max-height per D-05
  - Focus-visible ring added to hamburger button for accessibility
  - .gitignore created for node_modules and dist
metrics:
  duration: ~15min
  completed: "2026-05-18"
---

# Phase 02 Plan 01: Shared Header & Navigation Summary

**One-liner:** Shared header with fixed navigation, mobile hamburger menu with grid-template-rows animation, scroll lock, active state detection, and skip link — injected identically across all 7 pages.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create header HTML partial + CSS | `8ab6c14` | `src/partials/header.html`, `src/css/main.css` |
| 2 | Create nav.js with toggle/scroll lock/active state | `36b555c` | `src/js/nav.js` |
| 3 | Inject header into all 7 pages | `b5ba382` | All 7 HTML files |

## What Was Built

### Header Component (`src/partials/header.html`)
- Skip link ("Langsung ke konten utama") — `sr-only` until `:focus-visible`, `z-[60]` above header
- Fixed header (`top-0`, `z-50`, `h-20`, `bg-surface/90`, `backdrop-blur-md`)
- Logo: "APBA Group" text link to home
- Desktop nav: 4 links (Beranda, Produk, Tentang Kami, Kontak) — hidden on mobile
- CTA button: "Minta Penawaran" → `/contact` — desktop only
- Hamburger button with `aria-label`, `aria-expanded`, `aria-controls` — mobile only
- Mobile menu: `grid-template-rows` transition (0fr ↔ 1fr) + opacity fade, 4 nav items + CTA

### Navigation JavaScript (`src/js/nav.js`)
- Hamburger toggle: toggles `.open` class, swaps menu/close icon, updates `aria-expanded`
- Scroll lock: `document.body.style.overflow = 'hidden'` when menu open
- Close on: Escape key (refocuses hamburger), click outside, nav link click
- Active state detection: compares `window.location.pathname` with link hrefs
- Product pages: `startsWith('/products/')` activates "Produk" link

### CSS Additions (`src/css/main.css`)
- `.skip-link` / `.skip-link:focus-visible` — sr-only → visible transition
- `.nav-link.active` — teal text, bold, bottom border
- `#mobile-menu.open` — grid-template-rows: 1fr, opacity: 1
- `.mobile-menu-item.active` — teal text, bold, left border, teal tint bg
- `@media (prefers-reduced-motion: reduce)` — instant transitions

### All 7 Pages Updated
- Google Fonts links in `<head>` (Inter, Plus Jakarta Sans, Material Symbols)
- Skip link as first body element
- Full header markup after skip link
- `<main id="main-content" class="pt-20">` wrapping existing content
- `<script type="module" src="/src/js/nav.js">` before `</body>`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing] Created `.gitignore`**
- **Found during:** Task 3 post-commit check
- **Issue:** No `.gitignore` existed — `node_modules/` and `dist/` were untracked
- **Fix:** Created `.gitignore` with `node_modules/`, `dist/`, `*.tsbuildinfo`, `.env`, `.env.local`
- **Files modified:** `.gitignore`
- **Commit:** Will be included in final metadata commit

## Build Verification

- `npm run build` succeeded — 7 HTML files produced
- All pages: 4.08–13.05 kB (home.html largest with existing content)
- nav.js bundled: 2.04 kB (0.79 kB gzipped)
- CSS bundled: 38.53 kB (7.18 kB gzipped)

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| threat_flag: external-cdn | All 7 HTML pages | Google Fonts CDN loaded via `<link>` — reveals visitor IP to Google (T-02-02, accepted) |

## Key Decisions

1. **Header duplication over partial include:** Per D-01, header HTML is duplicated across all 7 pages. A build-time include mechanism (vite-plugin-html) can be added later if DRY becomes a maintenance concern.
2. **grid-template-rows animation:** Chosen over `max-height` anti-pattern per D-05 — animates to exact content height with proper easing.
3. **Focus-visible ring on hamburger:** Added `focus-visible:ring-2 ring-medical-teal ring-offset-2` for keyboard accessibility (not explicitly in plan but required by D-08).

## Self-Check: PASSED

- `src/partials/header.html` — EXISTS
- `src/js/nav.js` — EXISTS
- `src/css/main.css` — EXISTS (modified)
- All 7 HTML files — EXIST (modified)
- Commits `8ab6c14`, `36b555c`, `b5ba382` — PRESENT
- Build produces 7 HTML files — VERIFIED
