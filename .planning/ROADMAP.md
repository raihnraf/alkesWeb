# Roadmap: APBA Group Corporate Website

## Overview

Build a multi-page corporate website for PT Abadi Perkasa Bersama Alkesindo (APBA Group) that showcases their urology product lineup, services, and company credibility. The journey starts with build infrastructure and design tokens (Phase 1), establishes shared navigation and layout (Phase 2), delivers the home page as the primary visitor entry point (Phase 3), builds out product detail pages for the core business offering (Phase 4), adds the supporting About and Contact pages (Phase 5), and finishes with cross-cutting polish and launch readiness (Phase 6).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Build Foundation** - Vite + Tailwind v4 scaffold, design tokens, routing, deployment, image optimization
- [ ] **Phase 2: Shared Layout & Navigation** - Header, footer, mobile menu, consistent cross-page navigation
- [ ] **Phase 3: Home Page** - Hero, about summary, product grid, why-us, subsidiaries, stats, smooth scroll
- [ ] **Phase 4: Product Detail Pages** - 4 product pages with specs, images, inquiry CTAs, related products
- [ ] **Phase 5: About & Contact Pages** - Company history, certifications, contact form, WhatsApp, floating button
- [ ] **Phase 6: Polish & Launch** - Responsive testing, page transitions, SEO, accessibility, production deployment

## Phase Details

### Phase 1: Build Foundation
**Goal**: The project builds, deploys, and renders a blank page with correct design tokens on Vercel
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: BLD-01, BLD-02, BLD-03, BLD-04, BLD-08
**Success Criteria** (what must be TRUE):
  1. `npm run build` produces 7 HTML entry points and a tree-shaken CSS bundle
  2. All 7 page routes return 200 on Vercel (including direct URL access like /products/blue-diode-laser)
  3. Design tokens (deep blue #003366, medical teal #00A3AD, typography, spacing) render correctly via Tailwind v4 `@theme` on a test page
  4. Product images exist in `public/images/` as WebP with PNG fallbacks and explicit width/height attributes
**Plans**: 3 plans

**Plan List:**
- [x] [01-01-PLAN.md](.planning/phases/01-build-foundation/01-01-PLAN.md) — Initialize Vite + Tailwind v4 build pipeline with 7-page multi-page configuration, Vercel deployment, and complete Wave 0 test infrastructure (all 5 test files)
- [x] [01-02-PLAN.md](.planning/phases/01-build-foundation/01-02-PLAN.md) — Migrate design tokens to Tailwind v4 @theme directive and create verification tests
- [x] [01-03-PLAN.md](.planning/phases/01-build-foundation/01-03-PLAN.md) — Implement image optimization with WebP conversion and PNG fallbacks

### Phase 2: Shared Layout & Navigation
**Goal**: Visitors see consistent, functional navigation and footer on every page with working mobile menu
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: BLD-05, BLD-06, BLD-07, XCT-02
**Success Criteria** (what must be TRUE):
  1. Navigation bar appears identically on all 7 pages with links to Home, Products, About, and Contact
  2. Current page is visually indicated (active state) in the navigation
  3. Mobile hamburger menu opens and closes with smooth animation and does not break page scroll
  4. Footer displays contact info, product links, and legal links on all pages
**Plans**: 3 plans

**Plan List:**
- [ ] [02-01-PLAN.md](.planning/phases/02-shared-layout-navigation/02-01-PLAN.md) — Build shared header/navigation with skip link, desktop nav, mobile hamburger menu, and nav.js
- [ ] [02-02-PLAN.md](.planning/phases/02-shared-layout-navigation/02-02-PLAN.md) — Build shared footer with 4-column grid and inject into all 7 pages
- [ ] [02-03-PLAN.md](.planning/phases/02-shared-layout-navigation/02-03-PLAN.md) — Create automated tests for navigation behavior and accessibility compliance

### Phase 3: Home Page
**Goal**: Visitors arriving at the home page immediately understand APBA Group's value proposition and can navigate to any product or section
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08
**Success Criteria** (what must be TRUE):
  1. Hero section displays company name, tagline, primary CTA, and background image above the fold
  2. Product bento grid shows 3 products and 3 services as cards, with product cards linking to their detail pages
  3. Why Choose Us section displays 5 feature cards and subsidiaries section shows 3 glassmorphism cards
  4. Stats animate (count up) when scrolled into view and display founding year and hospital count
  5. Navigation links smoothly scroll to their corresponding home page sections
**UI hint**: yes
**Plans**: TBD

### Phase 4: Product Detail Pages
**Goal**: Visitors can view complete product information with specs, clinical applications, and reach out to inquire via WhatsApp or email
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06, PROD-07, PROD-08
**Success Criteria** (what must be TRUE):
  1. Each of the 4 products (Blue Diode Laser, Ultrasonic Surgery, Laser Holmium, Consumable Urologi) has its own page accessible from the home page product cards
  2. Product pages display a hero image, specifications table, and clinical applications section
  3. A purchase/rental banner appears on applicable product pages
  4. WhatsApp inquiry button opens wa.me with a pre-filled message including the product name, and an email inquiry CTA appears alongside it
  5. Related products links at the bottom of each page navigate to the other product detail pages
**UI hint**: yes
**Plans**: TBD

### Phase 5: About & Contact Pages
**Goal**: Visitors can learn about APBA Group's history and credibility, and reach the company through multiple contact channels
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: ABOT-01, ABOT-02, ABOT-03, ABOT-04, ABOT-05, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06
**Success Criteria** (what must be TRUE):
  1. About page displays company history (est. 2017), mission/values, certifications (ISO 13485), and subsidiary details (PT APBA, PT APBATECH, PT APBS)
  2. About page shows stats (270+ hospitals, years of operation)
  3. Contact page displays a form (name, institution, email, phone, product interest, message), WhatsApp deep link, clickable email, clickable phone number, and office address
  4. Floating WhatsApp action button is visible at bottom-right on all pages and opens wa.me when clicked
**UI hint**: yes
**Plans**: TBD

### Phase 6: Polish & Launch
**Goal**: The entire site is responsive, accessible, SEO-optimized, and ready for public launch
**Mode:** mvp
**Depends on**: Phase 3, Phase 4, Phase 5
**Requirements**: XCT-01, XCT-03, XCT-04, XCT-05
**Success Criteria** (what must be TRUE):
  1. All pages render correctly on mobile (320px), tablet (768px), and desktop (1280px) viewports
  2. Page transitions between routes feel smooth and professional
  3. Every page has unique SEO meta tags (title, description, Open Graph) and all images have alt text
  4. Production deployment on Vercel passes a final review of all pages and routes
**UI hint**: yes
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Build Foundation | 3/3 | ✓ Complete | 2026-05-18 |
| 2. Shared Layout & Navigation | 0/? | Not started | - |
| 3. Home Page | 0/? | Not started | - |
| 4. Product Detail Pages | 0/? | Not started | - |
| 5. About & Contact Pages | 0/? | Not started | - |
| 6. Polish & Launch | 0/? | Not started | - |
