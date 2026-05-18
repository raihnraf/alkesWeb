# Architecture Research

**Domain:** Multi-page static corporate website (medical equipment distributor)
**Researched:** 2026-05-18
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Presentation Layer                         │
│  (Static HTML pages, Tailwind CSS, vanilla JS)                  │
├──────────┬──────────┬──────────────┬─────────────┬──────────────┤
│ Home     │ Products │ About Us     │ Contact     │ Shared       │
│ Page     │ Pages    │ Page         │ Page        │ Components   │
│ (index)  │ (4 pgs)  │ (about)      │ (contact)   │ (nav,footer) │
├──────────┴──────────┴──────────────┴─────────────┴──────────────┤
│                      Build Layer (Vite)                         │
│  - Multi-page HTML entry points via rolldownOptions.input       │
│  - Tailwind CSS v4 via @tailwindcss/vite plugin                │
│  - PostCSS processing, tree-shaken CSS output                   │
│  - Asset hashing, code splitting across pages                   │
├─────────────────────────────────────────────────────────────────┤
│                      Asset Layer                                │
│  public/                        src/assets/                     │
│  - Product images (PNG)         - Logo SVGs                     │
│  - Favicon                      - Icon files                    │
│  - Fonts (if self-hosted)       - CSS entry point               │
├─────────────────────────────────────────────────────────────────┤
│                      Deployment Layer (Vercel)                  │
│  - Static site hosting (no server functions)                    │
│  - Global CDN distribution                                      │
│  - Automatic HTTPS, preview deployments                         │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| HTML Pages | Each page is a standalone HTML entry point | Separate HTML files in project root/subdirectories |
| Shared Navigation | Header/nav bar with links to all pages, mobile hamburger | Inline HTML duplicated across pages (no framework partials) |
| Shared Footer | Company info, subsidiaries, social links | Inline HTML duplicated across pages |
| Page JS Modules | Per-page interactivity (dark mode toggle, form handling, smooth scroll) | ES6 modules imported per page via `<script type="module">` |
| Shared JS | Dark mode toggle, mobile nav, WhatsApp link builder | Shared module imported by all pages |
| Tailwind CSS | Full styling system with custom theme tokens | Single `@import "tailwindcss"` with `@theme` block |
| Product Data | Structured product info (name, specs, images) | JavaScript data module, imported by product pages |
| Vite Config | Multi-page build entry points, Tailwind plugin | `vite.config.js` with rolldownOptions.input |
| Vercel Config | Build settings, clean URLs | `vercel.json` with cleanUrls setting |

## Recommended Project Structure

```
alkesWeb/
├── public/                      # Static assets copied as-is to dist root
│   └── images/                  # Product images (large PNGs)
│       ├── blue-diode-laser.png
│       ├── ultrasonic-surgery.png
│       ├── holmium-laser.png
│       └── office-interior.png
├── src/
│   ├── css/
│   │   └── main.css             # Tailwind entry: @import "tailwindcss" + @theme
│   ├── js/
│   │   ├── main.js              # Shared: dark mode, mobile nav, scroll
│   │   ├── contact.js           # Contact page: form handling, validation
│   │   └── products.js          # Product pages: image gallery, specs tabs
│   ├── data/
│   │   └── products.js          # Product catalog data (name, specs, images)
│   └── components/              # HTML partials (development reference only)
│       ├── nav.html             # Navigation markup template
│       └── footer.html          # Footer markup template
├── index.html                   # Home page entry
├── products/
│   ├── blue-diode-laser/
│   │   └── index.html           # Blue Diode Laser product page
│   ├── ultrasonic-surgery/
│   │   └── index.html           # Ultrasonic Surgery product page
│   ├── holmium-laser/
│   │   └── index.html           # Holmium Laser product page
│   └── consumables/
│       └── index.html           # Consumables product page
├── about/
│   └── index.html               # About Us page
├── contact/
│   └── index.html               # Contact page
├── vite.config.js               # Vite + Tailwind plugin + multi-page config
├── vercel.json                  # Vercel deployment config
├── package.json                 # Dependencies & scripts
└── DESIGN.MD                    # Existing design reference (single-page prototype)
```

### Structure Rationale

- **public/images/:** Product images are large PNGs (up to 1.4MB each) that do not need hashing or import processing. Placing them in `public/` means they are copied as-is and referenced with absolute paths like `/images/blue-diode-laser.png`. This is simpler than importing them and avoids build bloat. Vercel's CDN handles caching.

- **src/css/:** Single CSS entry point with Tailwind v4's `@import "tailwindcss"` and `@theme` block. All custom design tokens from the existing DESIGN.MD (colors, fonts, spacing) are migrated into the `@theme` directive. This replaces the old CDN `tailwind.config` approach.

- **src/js/:** Vanilla ES6 modules, one per page plus a shared module. No framework overhead. Each page imports only what it needs. Vite tree-shakes unused code.

- **src/data/:** Product data lives in a JS module as an exported array/object. Product pages import and render from this data. This keeps product info DRY across listing and detail pages.

- **src/components/:** HTML reference files only. Since there is no templating engine (no framework partials, no build-time HTML includes in vanilla Vite), shared markup like nav and footer must be duplicated across HTML files. These files serve as the single source of truth that developers copy from. This is the accepted trade-off for a zero-framework static site.

- **products/[slug]/index.html:** Each product gets its own directory with an `index.html`. This produces clean URLs like `/products/blue-diode-laser/` in production. Vite's multi-page build preserves this directory structure.

- **about/index.html, contact/index.html:** Same clean-URL pattern for other top-level pages.

## Architectural Patterns

### Pattern 1: Multi-Page App (MPA) with Vite

**What:** Each page is a standalone HTML document with its own `<script type="module">` entry. Vite builds each HTML file separately, producing per-page JS bundles with shared code extracted into common chunks.

**When to use:** This project. MPA is the correct choice because: (1) the site is content-heavy with distinct pages, not a dynamic app; (2) each page should be independently loadable for SEO and performance; (3) there is no shared client-side state between pages; (4) Vercel explicitly recommends MPA mode over SPA for Vite deployments.

**Trade-offs:**
- Pro: Full-page loads mean no client-side routing overhead, better initial load per page, SEO-friendly out of the box, works without JavaScript enabled for content.
- Pro: Vite automatically code-splits shared JS/CSS into common chunks so nav/footer JS is downloaded once and cached.
- Con: Shared HTML (nav, footer) must be duplicated across pages. No hot module replacement for cross-page changes.
- Con: Page transitions are full reloads, not SPA-smooth. Acceptable for a corporate site.

**Vite configuration:**
```js
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'products-blue-diode': resolve(__dirname, 'products/blue-diode-laser/index.html'),
        'products-ultrasonic': resolve(__dirname, 'products/ultrasonic-surgery/index.html'),
        'products-holmium': resolve(__dirname, 'products/holmium-laser/index.html'),
        'products-consumables': resolve(__dirname, 'products/consumables/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
})
```

### Pattern 2: Tailwind CSS v4 with @theme Directive

**What:** Tailwind v4 replaces the old `tailwind.config.js` approach with CSS-native configuration. Custom design tokens are declared directly in CSS using `@theme`.

**When to use:** Always for new Tailwind projects. v4 is the current stable version with the `@tailwindcss/vite` plugin providing first-class Vite integration.

**Trade-offs:**
- Pro: No separate config file, CSS-native, faster builds with the Vite plugin (no PostCSS overhead for Tailwind itself).
- Pro: Design tokens from the existing DESIGN.MD translate directly into `@theme` variables.
- Con: Migration from v3 CDN config requires rewriting the config as CSS custom properties.

**CSS entry point:**
```css
@import "tailwindcss";

@theme {
  /* Color system from DESIGN.MD */
  --color-deep-blue: #003366;
  --color-medical-teal: #00A3AD;
  --color-primary: #001e40;
  --color-primary-container: #003366;
  --color-secondary: #006970;
  --color-surface: #f9f9ff;
  --color-background: #f9f9ff;
  --color-background-subtle: #F1F5F9;
  --color-on-surface: #111c2d;
  --color-on-primary: #ffffff;
  --color-outline-variant: #c3c6d1;
  --color-border-light: #E2E8F0;

  /* Typography */
  --font-headline: "Plus Jakarta Sans", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

### Pattern 3: Data Module for Product Catalog

**What:** Product information is stored in a JavaScript module as structured data. Pages import and render from this data rather than hardcoding product info in each HTML file.

**When to use:** When the same data appears in multiple places (product listing on home page + individual product detail pages). This keeps information DRY.

**Trade-offs:**
- Pro: Single source of truth for product data, easy to update.
- Pro: Can generate product cards dynamically on the home page from the same data.
- Con: Product detail pages still need their own HTML structure for SEO (search engines need static content, not client-rendered). The data module supplements but does not replace the HTML content.
- Con: For a 4-product catalog this is borderline overkill. However, it pays off when the home page also shows product cards.

**Data module example:**
```js
// src/data/products.js
export const products = [
  {
    slug: 'blue-diode-laser',
    name: 'Blue Diode Laser',
    category: 'Laser Systems',
    image: '/images/blue-diode-laser.png',
    tagline: 'Precision laser technology for urological procedures',
    specs: { wavelength: '450nm', power: '200W', /* ... */ },
  },
  // ... other products
]
```

## Data Flow

### Request Flow (User visits a page)

```
User clicks nav link (e.g., /products/blue-diode-laser/)
    |
    v
Browser requests full HTML document from Vercel CDN
    |
    v
Vercel serves pre-built index.html (static, globally cached)
    |
    v
HTML references: Tailwind CSS bundle (shared, cached across pages)
                 Page-specific JS module
                 Product image from /images/ (CDN cached)
    |
    v
JS module initializes: dark mode, mobile nav, page interactions
    |
    v
Page fully rendered and interactive
```

### Asset Flow (Build time)

```
vite build
    |
    +-- Reads all HTML entry points (7 pages)
    +-- Resolves CSS: @import "tailwindcss" -> scans all HTML/JS for classes
    +-- Resolves JS: follows <script type="module"> imports per page
    +-- Copies public/ contents to dist/ as-is
    |
    v
dist/
├── index.html                    (home page)
├── products/
│   ├── blue-diode-laser/
│   │   └── index.html
│   └── ...                       (other product pages)
├── about/index.html
├── contact/index.html
├── assets/
│   ├── main-[hash].css           (tree-shaken Tailwind CSS)
│   ├── main-[hash].js            (shared JS: dark mode, nav)
│   ├── contact-[hash].js         (contact page JS)
│   └── products-[hash].js        (product page JS)
└── images/
    ├── blue-diode-laser.png      (copied from public/)
    └── ...                       (other product images)
```

### State Management

```
No global state store needed.

Per-page state:
- Dark mode: localStorage + <html class="dark"> toggle (shared JS)
- Mobile nav: CSS-only or minimal JS toggle (shared JS)
- Contact form: local form validation (contact.js only)
- Product gallery: local image viewer (products.js only)

Persistence:
- Dark mode preference -> localStorage (survives page navigation)
- Everything else -> stateless, no persistence needed
```

### Key Data Flows

1. **Product data flow:** `src/data/products.js` is imported by `products.js` (for any dynamic rendering like home page product cards) and can be referenced by product detail pages for consistent naming/specs. The HTML content on detail pages is static for SEO, but the JS module provides interactive features (image zoom, spec tabs) using the same data.

2. **Navigation flow:** All pages share identical nav/footer HTML markup. Navigation links use relative paths: `/products/blue-diode-laser/`, `/about/`, `/contact/`. Active page is indicated via a CSS class on the nav link matching the current URL.

3. **WhatsApp inquiry flow:** Contact buttons on product pages construct a WhatsApp URL with pre-filled message containing the product name. The URL format is `https://wa.me/62XXXXXXXXXX?text=...` built from the product data module.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users/month | Current MPA architecture is ideal. Static files on Vercel CDN handle this trivially. No changes needed. |
| 1k-10k users/month | Still fine as-is. Vercel's free tier handles this. Consider image optimization (WebP conversion, responsive srcset) for faster loads. |
| 10k+ users/month | Add Vercel Image Optimization for product images. Consider adding a CMS (e.g., Sanity, Contentful) if product catalog grows beyond 10 items. |

### Scaling Priorities

1. **First bottleneck: Large product images.** The 4 PNG files total ~3.6MB. On slow connections, these dominate page load. Mitigation: use `<img loading="lazy">`, consider converting to WebP, add `width`/`height` attributes to prevent layout shift.

2. **Second bottleneck: Product catalog growth.** If APBA adds more products, duplicating HTML files for each becomes a maintenance burden. At 10+ products, introduce a static site generator (Astro, 11ty) that builds pages from templates + data files. This is a future consideration, not a v1 requirement.

## Anti-Patterns

### Anti-Pattern 1: Single-Page Application for a Corporate Site

**What people do:** Use React/Vue/Angular to build a client-side SPA for what is essentially a brochure website.
**Why it's wrong:** Adds 50-200KB+ of framework JS for zero benefit. Hurts SEO (client-rendered content), increases Time to Interactive, breaks without JavaScript, and complicates deployment. Vercel's own docs recommend MPA mode for static content sites.
**Do this instead:** Use vanilla HTML + Tailwind CSS + minimal JS. Each page is a full document. This gives instant loads, perfect SEO, and zero framework lock-in.

### Anti-Pattern 2: External CDN for Tailwind CSS in Production

**What people do:** Use `<script src="https://cdn.tailwindcss.com">` in production (as the current DESIGN.MD does).
**Why it's wrong:** The CDN script is for development only. It includes the full Tailwind compiler in the browser (~300KB), scans classes at runtime, and produces unoptimized CSS. No tree-shaking, no caching, no production optimization.
**Do this instead:** Use `@tailwindcss/vite` plugin with `@import "tailwindcss"` in a CSS file. Vite builds a tree-shaken CSS bundle (typically 5-15KB gzipped) with only the classes actually used.

### Anti-Pattern 3: Copy-Paste HTML Without a Reference Source

**What people do:** Copy nav/footer HTML from page to page, then update each file separately when something changes.
**Why it's wrong:** Guarantees drift between pages. A nav link added to 5 of 7 pages but not the other 2. Footer text updated on some pages but not others.
**Do this instead:** Maintain `src/components/nav.html` and `src/components/footer.html` as canonical reference files. When updating shared markup, update the reference file first, then propagate to all pages. Add a comment in each page's HTML: `<!-- NAV: update src/components/nav.html and propagate -->`.

### Anti-Pattern 4: Product Images in src/ Instead of public/

**What people do:** Import product images via `import imgUrl from './image.png'` so Vite processes them with content hashing.
**Why it's wrong:** Large product PNGs (1MB+) would be processed by Vite's asset pipeline, adding build time for no benefit. These images do not need hashing because they are not referenced by JavaScript modules. They are static content referenced directly in `<img>` tags.
**Do this instead:** Place product images in `public/images/`. They are copied as-is to the dist root during build. Reference with absolute paths: `src="/images/blue-diode-laser.png"`. Vercel CDN handles caching and distribution.

### Anti-Pattern 5: SPA Rewrites on Vercel for MPA

**What people do:** Add a catch-all rewrite `{ "source": "/(.*)", "destination": "/index.html" }` in vercel.json.
**Why it's wrong:** This is only needed for SPAs where client-side routing handles all URLs. For an MPA, it breaks direct links to sub-pages because all requests would serve index.html instead of the correct page's HTML.
**Do this instead:** Use `cleanUrls: true` in vercel.json only if you want `/about` instead of `/about/`. Do not add SPA rewrites for an MPA.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| WhatsApp | URL link construction | `https://wa.me/62XXXXXXXXXX?text=...` -- no API key needed, just a hyperlink |
| Google Fonts | `<link>` in HTML head | Inter + Plus Jakarta Sans. Consider self-hosting for GDPR/performance if targeting international audience (not needed for Indonesian-only v1) |
| Google Maps (optional) | Embed iframe | If contact page needs a map. Simple iframe embed, no API key for basic usage |
| Vercel Analytics | Vercel dashboard toggle | Enable in project settings, no code changes needed |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| HTML Pages <-> Shared JS | `<script type="module">` import | Each page imports `main.js` for dark mode/nav. Some pages import additional modules. |
| JS Modules <-> Product Data | ES6 import | `products.js` imports from `data/products.js`. Data is read-only. |
| CSS <-> HTML | Tailwind class names in HTML | No CSS-in-JS. Utility classes applied directly in markup. Custom CSS only for animations or complex selectors. |
| Pages <-> Each Other | Standard `<a href>` links | No client-side routing. Full page navigation. This is correct for the domain. |
| Build (Vite) <-> Deployment (Vercel) | `dist/` directory output | Vercel auto-detects Vite framework preset, runs `npm run build`, serves `dist/` |

## Build Order (Dependencies Between Components)

The following build order reflects what must be implemented before other components can function. This directly informs the roadmap phase structure.

```
Phase 1: Foundation (must come first)
├── vite.config.js + package.json (build system)
├── src/css/main.css with @theme (design system from DESIGN.MD)
├── vercel.json (deployment config)
└── public/images/ (move product images from root)
    |
Phase 2: Shared Components (required by all pages)
├── src/js/main.js (dark mode, mobile nav)
├── Navigation HTML structure (reference: src/components/nav.html)
└── Footer HTML structure (reference: src/components/footer.html)
    |
Phase 3: Home Page (primary entry point, depends on shared components)
├── index.html (hero, about summary, product bento grid, why-us, subsidiaries)
├── src/data/products.js (product data for home page product cards)
└── src/js/main.js integration (dark mode toggle, smooth scroll)
    |
Phase 4: Product Detail Pages (depends on product data + shared components)
├── products/blue-diode-laser/index.html
├── products/ultrasonic-surgery/index.html
├── products/holmium-laser/index.html
├── products/consumables/index.html
└── src/js/products.js (image viewer, spec tabs)
    |
Phase 5: About + Contact Pages (depends on shared components only)
├── about/index.html (history, team, certifications, stats)
├── contact/index.html (form, company info, WhatsApp integration)
└── src/js/contact.js (form handling, validation)
    |
Phase 6: Polish + Deploy (depends on all pages complete)
├── Responsive testing across breakpoints
├── Dark mode testing across all pages
├── Image optimization (lazy loading, dimensions, alt text)
├── Meta tags + Open Graph per page
└── Vercel deployment + DNS configuration
```

### Build Order Rationale

1. **Foundation first:** Without the build system and design tokens, nothing else compiles. This is a 30-minute task but blocks everything.

2. **Shared components second:** Nav and footer appear on every page. Building them once as reference files and propagating to pages is more efficient than building pages and retrofitting nav later.

3. **Home page third:** The home page is the most complex (hero, bento grid, why-us, subsidiaries, product cards) and serves as the primary validation of the design system. Getting this right validates all tokens and patterns.

4. **Product pages fourth:** These depend on product data and shared components being ready. They follow a template pattern, so building one and replicating is efficient.

5. **About + Contact fifth:** These are simpler pages with no complex data dependencies. They can be built in parallel once shared components exist.

6. **Polish last:** Cross-cutting concerns (responsive, dark mode, meta tags, performance) are best addressed after all pages exist. Fixing these per-page as you go leads to inconsistency.

## Deployment Architecture

### Vercel Configuration

Vercel auto-detects Vite projects and configures:
- **Framework Preset:** Vite
- **Build Command:** `npm run build` (runs `vite build`)
- **Output Directory:** `dist` (Vite's default)
- **Node.js Version:** 22.x (current LTS)

### vercel.json

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true
}
```

`cleanUrls: true` makes URLs work without trailing slashes or `.html` extensions: `/about` serves `about/index.html`, `/products/blue-diode-laser` serves `products/blue-diode-laser/index.html`.

**Do NOT add SPA rewrites.** The MPA structure serves the correct HTML file for each URL. SPA rewrites would break this.

### Environment Variables

None needed for v1. If WhatsApp number or email changes, they are in the HTML source. For a future v2 with a contact form backend, environment variables would store API keys.

## Sources

- Vite official documentation: Multi-Page App build configuration (https://vite.dev/guide/build#multi-page-app) -- HIGH confidence
- Vite official documentation: Static asset handling, public directory (https://vite.dev/guide/assets) -- HIGH confidence
- Vercel official documentation: Vite on Vercel, MPA deployment recommendation (https://vercel.com/docs/frameworks/frontend/vite) -- HIGH confidence
- Tailwind CSS official documentation: Vite plugin installation, @theme directive (https://tailwindcss.com/docs) -- HIGH confidence
- Vercel official documentation: vercel.json configuration, cleanUrls (https://vercel.com/docs/project-configuration/vercel-json) -- HIGH confidence
- Existing project DESIGN.MD: Color system, typography, spacing tokens -- HIGH confidence (project artifact)

---
*Architecture research for: APBA Group corporate website (multi-page static, Tailwind CSS + Vite + Vercel)*
*Researched: 2026-05-18*
