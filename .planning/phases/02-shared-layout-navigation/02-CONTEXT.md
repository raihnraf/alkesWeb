# Phase 2: Shared Layout & Navigation - Context

**Gathered:** 2026-05-18
**Status:** Ready for planning
**Source:** UI-SPEC.md approved + Requirements

<domain>
## Phase Boundary

This phase delivers shared header/navigation and footer components that appear identically across all 7 pages of the APBA Group website. It includes a mobile hamburger menu with smooth animation, active state detection, skip link for accessibility, and cross-page consistency.

</domain>

<decisions>
## Implementation Decisions

### Architecture (D-01)
- Vite MPA (Multi-Page Application) — no React components, no framework
- Shared HTML duplicated across all 7 pages (header/footer markup copied into each HTML file)
- Single `src/js/nav.js` loaded on every page for hamburger toggle, active state detection, scroll lock
- Single `src/css/main.css` — no page-specific overrides for nav/footer

### Header (D-02)
- Fixed position, `z-50`, full-width, `h-20` (80px) desktop
- Background: `bg-surface/90` with `backdrop-blur-md`
- Bottom border: `border-b border-border-light`
- Layout: Logo (left) → Nav links (center, desktop) → CTA button (right, desktop) → Hamburger (right, mobile)
- Skip link: "Langsung ke konten utama" — `sr-only` until `:focus-visible`, positioned above header at `z-[60]`

### Nav Links (D-03)
- 4 links: Beranda (/), Produk (/products/blue-diode-laser), Tentang Kami (/about), Kontak (/contact)
- Font: `font-label-md` (14px, 600), `text-on-surface`
- Hover: `text-medical-teal` with `transition-colors duration-200`
- Active state: `text-medical-teal`, `font-bold` (700), `border-b-2 border-medical-teal`
- For product pages (`/products/*`), the "Produk" nav link is active

### CTA Button (D-04)
- Text: "Minta Penawaran" → links to `/contact`
- Style: `bg-deep-blue`, `text-white`, `rounded-full`, `px-6 py-2.5`
- Hover: `bg-medical-teal`
- Desktop only (`hidden md:inline-flex`)

### Mobile Menu (D-05)
- CSS `grid-template-rows` transition (0fr → 1fr) + opacity fade — NOT `max-height`
- `fixed`, `top-[80px]`, `w-full`, `z-40`, `bg-surface`
- Scroll lock: `document.body.style.overflow = 'hidden'` when open
- Close triggers: hamburger click, nav link click, CTA click, Escape key, click outside
- Reduced motion: respect `prefers-reduced-motion: reduce` — instant show/hide

### Footer (D-06)
- Background: `bg-deep-blue`, full-width
- 4-column grid desktop (`md:grid-cols-4`), 1-column mobile
- Columns: Brand, Hubungi Kami, Produk, Informasi Hukum
- Copyright bar with border-top, flex row, certified badge
- Newsletter input deferred to v2 (ENHC-02)

### Copywriting (D-07)
- All content in Indonesian (Bahasa Indonesia)
- Brand: "APBA Group" (short form in header)
- Nav: Beranda, Produk, Tentang Kami, Kontak
- CTA: "Minta Penawaran"
- Footer copyright: "© 2026 PT Abadi Perkasa Bersama Alkesindo (APBA Group). All Rights Reserved. ISO 13485 Certified."

### Accessibility (D-08)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`
- ARIA: hamburger `aria-label="Buka menu navigasi"`, `aria-expanded`, `aria-controls="mobile-menu"`
- Skip link to `#main-content`
- Focus visible: `ring-2 ring-medical-teal ring-offset-2 ring-offset-surface`
- Touch targets: minimum 44×44px
- `lang="id"` on `<html>`

### Icons & Fonts (D-09)
- Material Symbols Outlined via Google Fonts CDN
- Plus Jakarta Sans (headlines) + Inter (body) via Google Fonts `<link>`
- Font loading in `<head>` of every page

### Active State Detection (D-10)
- JavaScript: compare `window.location.pathname` with link `href`
- Add `.active` class to matching link
- Product pages: `currentPath.startsWith('/products/')` activates "Produk"

### the agent's Discretion
- Exact Tailwind class names for each element (UI-SPEC provides the contract, executor chooses exact utility classes)
- Test file structure and naming conventions
- Whether to use `vite-plugin-html` for partial includes or duplicate HTML (UI-SPEC says duplication is acceptable for Phase 2)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design Contract
- `.planning/phases/02-shared-layout-navigation/02-UI-SPEC.md` — Complete visual/interaction spec for header, nav, mobile menu, footer

### Phase Requirements
- `.planning/REQUIREMENTS.md` — BLD-05, BLD-06, BLD-07, XCT-02

### Existing Codebase
- `src/css/main.css` — Design tokens (@theme block), font families, spacing, colors
- `vite.config.js` — 7-page MPA configuration
- `src/home.html` — Existing page structure (reference for how to inject header/footer)

</canonical_refs>

<specifics>
## Specific Details

- 7 HTML pages: home.html, about.html, contact.html, products/blue-diode-laser.html, products/ultrasonic-surgery.html, products/holmium-laser.html, products/consumables.html
- Header height: 80px desktop, 64px mobile
- `<main>` needs `pt-20` (80px) padding-top on all pages to account for fixed header
- Footer contact: Jakarta Indonesia, 0811 1212 9779, info@apbagroup.com, @alkes_house, apbagroup.com
- Footer product links: Blue Diode Laser, Ultrasonic Surgery, Laser Holmium, Consumable Urologi
- Footer legal: Privacy Policy, Terms of Service (placeholder links)
</specifics>

<deferred>
## Deferred Ideas

- Newsletter signup in footer (ENHC-02, v2)
- Google Maps embed on Contact page (ENHC-01, v2)
- Dark mode toggle (DMOD-01, v2)

</deferred>

---

*Phase: 02-shared-layout-navigation*
*Context gathered: 2026-05-18 via UI-SPEC + Requirements*
