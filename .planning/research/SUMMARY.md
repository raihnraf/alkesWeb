# Project Research Summary

**Project:** APBA Group Corporate Website (alkesWeb)
**Domain:** Medical equipment distributor corporate website (B2B, urology specialization)
**Researched:** 2026-05-18
**Confidence:** MEDIUM-HIGH

## Executive Summary

This is a multi-page static corporate website for APBA Group, an Indonesian medical equipment distributor specializing in urology. The site serves as a credibility-establishing brochure for B2B buyers (hospital procurement officers, urologists, clinic directors), not a consumer storefront or e-commerce platform. Experts in this space build with static-first architectures -- either vanilla HTML/CSS/JS with a build tool, or a framework in static-export mode -- deployed to a CDN. The site has 7 pages (Home, 4 Product Detail, About, Contact) with no backend, no authentication, and no dynamic content.

The recommended approach is a **Vite multi-page app (MPA) with Tailwind CSS v4 and vanilla JavaScript**, deployed to Vercel as static files. This is the lighter-weight path compared to Next.js, which STACK.md also recommends. The critical tension between research files is resolved in favor of the Vite MPA approach: ARCHITECTURE.md makes a compelling case that a corporate brochure site with 7 static pages and zero client-side state needs no framework, and PITFALLS.md explicitly calls out the anti-pattern of using an SPA framework for a content site. Next.js `output: 'export'` works but adds React (19.2) and its runtime as unnecessary baggage. The existing DESIGN.MD prototype is already vanilla HTML + Tailwind CDN; migrating to Vite + Tailwind v4 is a natural upgrade, while migrating to Next.js would be a full rewrite into React components.

Key risks center on three areas: (1) **Image performance** -- 4 large product PNGs (~3.6 MB total) will crush LCP on Indonesian mobile connections if not pre-optimized to WebP; (2) **Vercel deployment misconfiguration** -- multi-page static sites on Vercel commonly break with 404s on subpages if `cleanUrls` or file structure is wrong; (3) **B2B content discipline** -- the site must avoid consumer-style copy and CTAs, instead leading with specs, certifications, and trust signals appropriate for medical equipment buyers.

## Key Findings

### Recommended Stack

The Vite MPA approach is recommended over Next.js for this project. While STACK.md provides a thorough Next.js recommendation with good rationale (Vercel integration, `next/image`, `next/font`), ARCHITECTURE.md and PITFALLS.md together make a stronger case that a framework is unnecessary overhead for 7 static pages with no interactivity beyond dark mode and a contact form. The existing DESIGN.MD is vanilla HTML; a Vite migration preserves the HTML-first approach while adding proper build tooling (Tailwind v4 CSS build, code splitting, asset hashing). If the project later needs server features, a migration to Next.js or Astro is straightforward from a well-structured Vite project.

**Core technologies:**
- **Vite** (build tool): Multi-page HTML entry points, Tailwind v4 plugin, code splitting, fast HMR -- the right tool for a multi-page static site
- **Tailwind CSS v4** (`@tailwindcss/vite`): CSS-native `@theme` directive replaces JS config; tree-shaken production CSS (~5-15 KB gzipped vs 3.5 MB CDN)
- **Vanilla JavaScript (ES6 modules)**: Dark mode toggle, mobile nav, contact form, WhatsApp link builder -- no framework runtime needed
- **next-themes alternative**: Inline `<head>` script for dark mode FOUC prevention (see PITFALLS.md) instead of a React-dependent library
- **Lucide icons or inline SVGs**: Tree-shakeable icons; consider inline SVGs to avoid any dependency for a small icon set

**Version requirements:**
- Tailwind CSS 4.3+ (current stable, uses `@import "tailwindcss"` and `@theme` instead of v3 config)
- Vite 6.x (current stable, `rolldownOptions.input` for multi-page builds)
- `@tailwindcss/vite` 4.3+ (replaces PostCSS plugin approach)

### Expected Features

**Must have (table stakes):**
- Hero section with value proposition and credibility signals (270+ hospitals, est. 2017)
- Product listing (bento grid) on home page linking to detail pages
- Product detail pages (4 pages) with specs tables, clinical applications, inquiry CTA
- Contact information (phone, email, address) -- with WhatsApp as primary channel for Indonesia
- About Us page with company history, subsidiaries, certifications
- Responsive mobile design (mobile-first, Indonesia has 70%+ mobile traffic)
- Clear navigation with active page state across all 7 pages
- Professional visual design (deep blue + medical teal from existing DESIGN.MD)

**Should have (differentiators):**
- Dark mode support with system preference detection + toggle
- WhatsApp floating action button with product-specific pre-filled messages
- Rental/lease option showcase on product pages
- Subsidiary ecosystem display (PT APBA, PT APBATECH, PT APBS)
- Smooth scroll navigation (CSS `scroll-behavior: smooth`)

**Defer (v2+):**
- Animated counters / scroll animations
- Newsletter signup (no email infrastructure)
- Embedded Google Maps (third-party dependency)
- Multi-language (i18n) -- structure data files for future i18n support
- Blog / news section

### Architecture Approach

A Vite multi-page app (MPA) where each page is a standalone HTML document with its own `<script type="module">` entry. Vite builds each HTML file separately, producing per-page JS bundles with shared code extracted into common chunks. Tailwind CSS v4 with the `@tailwindcss/vite` plugin provides a single tree-shaken CSS bundle. Product data lives in a JS data module (`src/data/products.js`) imported by both the home page (for card rendering) and product detail pages (for interactive features). Shared HTML (nav, footer) uses reference template files with manual propagation -- a known trade-off accepted for a 7-page site.

**Major components:**
1. **Build system** (Vite + `@tailwindcss/vite`) -- multi-page entry points, Tailwind CSS build, asset optimization
2. **Design system** (Tailwind `@theme` block) -- color tokens, typography scale, spacing migrated from DESIGN.MD
3. **Shared layout** (nav.html, footer.html references) -- header/footer with dark mode script, mobile nav
4. **Product data module** (`src/data/products.js`) -- structured product catalog data (specs, images, WhatsApp links)
5. **Page implementations** (7 HTML pages) -- Home, 4 Product Detail, About, Contact
6. **Deployment** (Vercel + `vercel.json`) -- static hosting with `cleanUrls: true`

### Critical Pitfalls

1. **Unoptimized local images crushing performance** -- Pre-optimize all PNGs to WebP at build time; set explicit `width`/`height` on all `<img>` tags; use `loading="lazy"` below fold. This must be addressed in Phase 1, not deferred to "polish."
2. **Vercel deployment 404s on subpages** -- Structure output with `page/index.html` directories; add `cleanUrls: true` in `vercel.json`; test direct URL access to every page after first deployment.
3. **Dark mode flash of unstyled content (FOUC)** -- Place inline dark-mode detection script in `<head>` BEFORE CSS on every page; do NOT rely on a deferred or body-end script.
4. **Consumer-style UX in a B2B medical context** -- Use specification-focused language, not superlatives; CTAs must be "Request a Quote" / "Hubungi Kami," never "Buy Now"; lead with credibility signals above the fold.
5. **Regulatory/compliance messaging** -- Avoid unsubstantiated medical claims on product pages; add disclaimer footers; never display certification logos without registration numbers; get legal review before launch.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and Build Setup
**Rationale:** Without a working build system, design tokens, and deployment pipeline, nothing else compiles or deploys. This is a 1-2 hour task that blocks everything. Getting Vercel deployment verified early prevents late-stage routing disasters (Pitfall 3).
**Delivers:** Vite project with Tailwind v4, `@theme` design tokens from DESIGN.MD, `vercel.json`, verified Vercel deployment with all routes returning 200, pre-optimized product images in `public/images/`
**Addresses:** Design system foundation, build pipeline
**Avoids:** Tailwind CDN in production (Pitfall 7), Vercel 404s on subpages (Pitfall 3), unoptimized images (Pitfall 2)

### Phase 2: Shared Layout and Navigation
**Rationale:** Nav and footer appear on every page. Building the shared layout once as reference files and propagating to pages is more efficient than building pages and retrofitting. The dark mode script must be in the shared layout from the start to prevent FOUC across all pages.
**Delivers:** Shared navigation (desktop + mobile hamburger), footer, dark mode toggle with inline FOUC prevention script, mobile nav with scroll lock handling
**Addresses:** Responsive navigation, dark mode
**Avoids:** Dark mode FOUC (Pitfall 4), broken mobile navigation (Pitfall 10), divergent page layouts (Pitfall 8)

### Phase 3: Home Page
**Rationale:** The home page is the most complex page (hero, about summary, product bento grid, why-us, subsidiaries) and serves as primary validation of the design system and shared layout. The existing DESIGN.MD provides a detailed prototype that can be migrated. Product data module is created here to support product cards.
**Delivers:** Home page with hero, stats, product bento grid linking to detail pages, why-us section, subsidiary display, product data module (`src/data/products.js`)
**Addresses:** Hero section, product listing, subsidiary ecosystem, credibility signals
**Avoids:** Consumer-style UX (Pitfall 5) by ensuring credibility signals are prominent above the fold

### Phase 4: Product Detail Pages
**Rationale:** Product detail pages are the biggest gap in the current design (cards link to `#`). They depend on product data and shared components being ready. They follow a template pattern -- build one, replicate for the other three. Each page must include specification tables, clinical applications, rental/purchase options, and WhatsApp inquiry with pre-filled message.
**Delivers:** 4 product detail pages (Blue Diode Laser, Ultrasonic Surgery, Holmium Laser, Consumables) with specs, images, inquiry CTAs
**Addresses:** Product detail pages (the #1 missing feature), WhatsApp integration with pre-filled messages
**Avoids:** Regulatory compliance issues (Pitfall 1) by using specification-focused language from the start; WhatsApp desktop failure (Pitfall 6) by providing both WhatsApp and email CTAs

### Phase 5: About and Contact Pages
**Rationale:** These are simpler pages with no complex data dependencies. They can be built in parallel once shared components exist. The contact page must provide dual-channel contact (WhatsApp for mobile, email for desktop) and a display-only form. The About page must establish trust with company history, certifications, and subsidiary structure.
**Delivers:** About Us page (history, mission, team, subsidiaries, certifications), Contact page (form, WhatsApp deep link, email, phone, address)
**Addresses:** About Us, Contact page, certifications display, WhatsApp integration
**Avoids:** Consumer-style UX (Pitfall 5) by using B2B-appropriate content hierarchy

### Phase 6: Polish, Optimization, and Launch
**Rationale:** Cross-cutting concerns (responsive testing, dark mode testing, SEO meta tags, image optimization verification, accessibility) are best addressed after all pages exist. Fixing these per-page as you go leads to inconsistency. Final deployment verification on Vercel.
**Delivers:** Responsive testing at all breakpoints, dark mode testing across all pages, Indonesian SEO meta tags + Open Graph, image optimization audit, accessibility review, production deployment
**Addresses:** Responsive design, dark mode, SEO, accessibility
**Avoids:** Missing SEO meta tags (Pitfall 11), smooth scroll conflicts (Pitfall 12), Vercel image optimization limits (Pitfall 9)

### Phase Ordering Rationale

- **Dependencies drive order:** Build system (Phase 1) must exist before shared layout (Phase 2) can use Tailwind classes. Shared layout (Phase 2) must exist before any page (Phases 3-5) can render nav/footer. Product data module (Phase 3) must exist before product detail pages (Phase 4) can reference it.
- **Validation early:** The home page (Phase 3) validates the design system and shared layout. If tokens or layout patterns are wrong, catching it here is cheaper than after building 4 product pages.
- **Risk front-loaded:** The 3 most impactful pitfalls (image performance, Vercel routing, dark mode FOUC) are all addressed in Phases 1-2. This means the riskiest technical decisions are validated before content pages are built.
- **Polish last:** Cross-cutting quality concerns (responsive, SEO, accessibility) are consistent when applied to a complete page set, not piecemeal.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Vite + Tailwind v4 `@tailwindcss/vite` plugin configuration -- while documented, the exact multi-page build setup with Tailwind v4's Vite plugin has fewer community examples than the PostCSS approach. Verify the plugin works correctly with `rolldownOptions.input`.
- **Phase 4:** Product content -- actual product specifications, clinical applications, and regulatory language need to come from APBA Group's marketing/regulatory team. Research cannot fabricate compliant medical device copy.

Phases with standard patterns (skip research-phase):
- **Phase 2:** Shared navigation, dark mode, and mobile hamburger menus are well-documented patterns with extensive examples.
- **Phase 3:** The existing DESIGN.MD provides a detailed prototype; this is migration, not invention.
- **Phase 5:** About and Contact pages follow standard corporate website patterns.
- **Phase 6:** SEO meta tags, responsive testing, and accessibility are well-documented.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All version numbers verified against npm registry live. Vite + Tailwind v4 is the current documented approach. The Next.js vs Vite tension is resolved by domain fit, not documentation quality -- both are well-documented. |
| Features | MEDIUM-HIGH | Feature classification based on consistent patterns across 7 competitor medical device sites. No published "medical device website best practices" article was found to cross-validate, but competitor patterns are strongly consistent. |
| Architecture | HIGH | Vite MPA is the official Vite recommendation for multi-page sites. Vercel docs explicitly recommend MPA mode over SPA for static content. Tailwind v4 + Vite plugin is the documented approach. |
| Pitfalls | MEDIUM-HIGH | Vercel limits and deployment pitfalls verified from official docs. Technical pitfalls (FOUC, image optimization, Tailwind CDN) are well-documented. Medical regulatory pitfalls are based on domain knowledge with MEDIUM confidence on Indonesia-specific Kemenkes regulations -- not verified from primary legal sources. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Stack conflict resolution:** STACK.md recommends Next.js 16; ARCHITECTURE.md recommends Vite MPA. This synthesis recommends Vite MPA based on project scope (7 static pages, no backend, existing HTML prototype). If the team has strong React experience or expects the site to evolve into a web app, Next.js with `output: 'export'` is a valid alternative. This decision should be confirmed before Phase 1 implementation.
- **Indonesia-specific medical device marketing regulations:** The research identifies regulatory compliance as a critical pitfall but does not have primary-source verification of Kemenkes requirements for distributor websites. Get legal/regulatory review before launching product pages.
- **Product content availability:** Product specifications, clinical applications, and approved marketing language must come from APBA Group. Research cannot determine what claims are cleared for Indonesian market use. Flag this as a content dependency for Phase 4.
- **WhatsApp Business number:** The research references "0811 1212 9779" from DESIGN.MD. Verify this is the correct WhatsApp Business number and confirm the format for `wa.me` links (requires country code: `6281112129779`).
- **Shared layout strategy without templating:** ARCHITECTURE.md accepts copy-paste HTML with reference files as the approach for shared nav/footer. For a 7-page site this is manageable but not ideal. Consider using a lightweight Vite plugin (e.g., `vite-plugin-handlebars` or `vite-plugin-html`) for partial injection. This is a build-setup decision for Phase 1.

## Sources

### Primary (HIGH confidence)
- Vite official documentation -- Multi-Page App build, static assets, public directory
- Tailwind CSS official documentation -- v4 installation, `@theme` directive, `@tailwindcss/vite` plugin, dark mode
- Vercel official documentation -- Vite deployment, vercel.json configuration, limits, image optimization
- Next.js official documentation -- static exports, Tailwind integration, next/font (via Context7)
- npm registry -- live version verification for all recommended packages

### Secondary (MEDIUM confidence)
- Competitor website analysis -- Olympus, Stryker, Boston Scientific, Karl Storz, Richard Wolf, Quanta System, IPG Photonics (7 sites analyzed for feature patterns)
- Project artifacts -- DESIGN.MD (existing prototype), PROJECT.md (requirements and constraints)
- B2B vs B2C web design patterns -- industry best practices for medical equipment distributor sites

### Tertiary (LOW confidence)
- Indonesia-specific medical device marketing regulations (Kemenkes) -- domain knowledge, not verified from primary legal sources
- WhatsApp API behavior on desktop -- based on known platform behavior, not official documentation

---
*Research completed: 2026-05-18*
*Ready for roadmap: yes*
