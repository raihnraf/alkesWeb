# Requirements: APBA Group Corporate Website

**Defined:** 2026-05-18
**Core Value:** Visitors can quickly understand APBA Group's urology product lineup and reach out via WhatsApp or email to inquire or request a quote.

## v1 Requirements

### Build Foundation

- [ ] **BLD-01**: Vite project scaffolded with Tailwind CSS v4 and `@tailwindcss/vite` plugin
- [ ] **BLD-02**: Design tokens (colors, typography, spacing) migrated from DESIGN.MD Tailwind v3 JS config to v4 CSS `@theme` directive
- [ ] **BLD-03**: Multi-page routing configured via Vite `rolldownOptions.input` for 7 HTML entry points
- [ ] **BLD-04**: Vercel deployment verified with `cleanUrls: true` in `vercel.json`
- [x] **BLD-05**: Shared navigation component with consistent links across all pages and active state indicator
- [x] **BLD-06**: Shared footer component with contact info, product links, legal links, and newsletter input
- [x] **BLD-07**: Mobile hamburger menu with smooth open/close animation
- [ ] **BLD-08**: Local product images moved to `public/images/` and pre-optimized (WebP with fallbacks, explicit dimensions)

### Home Page

- [ ] **HOME-01**: Hero section with company name, tagline, primary CTA, and equipment background image
- [ ] **HOME-02**: About summary section with founding year (2017), hospital count (270+), and brief company description
- [ ] **HOME-03**: Product and service bento grid (3 products + 3 services) with card hover effects
- [ ] **HOME-04**: Product cards link to their respective product detail pages
- [ ] **HOME-05**: Why Choose Us section with 5 feature cards (Urology Specialist, Buy & Rent, Original Products, Experienced Support, Nationwide Service)
- [ ] **HOME-06**: Subsidiaries section with 3 glassmorphism cards (PT APBA, PT APBATECH, PT APBS)
- [ ] **HOME-07**: Animated stat counters that count up on scroll into view
- [ ] **HOME-08**: Smooth scroll navigation between home page sections

### Product Detail Pages

- [x] **PROD-01**: Product detail page template supporting 4 products (Blue Diode Laser, Ultrasonic Surgery, Laser Holmium, Consumable Urologi)
- [x] **PROD-02**: Product hero image displayed prominently at top of each page
- [x] **PROD-03**: Key specifications table with relevant technical data per product
- [x] **PROD-04**: Clinical applications / use cases section per product
- [x] **PROD-05**: "Available for Purchase or Rental" banner on applicable product pages
- [x] **PROD-06**: WhatsApp inquiry button with pre-filled message including product name
- [x] **PROD-07**: Related products links at bottom of each product page
- [x] **PROD-08**: Email inquiry CTA alongside WhatsApp button

### About Us Page

- [x] **ABOT-01**: Company history section (established 2017, growth milestones)
- [x] **ABOT-02**: Mission and values statement
- [x] **ABOT-03**: Certifications section with ISO 13485 and any other credentials prominently displayed
- [x] **ABOT-04**: Subsidiaries detail (PT APBA, PT APBATECH, PT APBS) with role descriptions
- [x] **ABOT-05**: Stats display (270+ hospitals, years of operation)

### Contact Page

- [x] **CONT-01**: Contact form with fields: name, institution, email, phone, product interest, message (display-only, no backend)
- [x] **CONT-02**: WhatsApp contact with deep link to wa.me
- [x] **CONT-03**: Email address (info@apbagroup.com) displayed as clickable link
- [x] **CONT-04**: Phone number (0811 1212 9779) displayed as clickable link
- [x] **CONT-05**: Office address (Jakarta, Indonesia)
- [ ] **CONT-06**: Floating WhatsApp action button (fixed position, bottom-right, visible on all pages)

### Cross-Cutting

- [ ] **XCT-01**: Responsive design (mobile-first) for all pages
- [x] **XCT-02**: Consistent page-to-page navigation experience
- [ ] **XCT-03**: Page transition effects between routes
- [ ] **XCT-04**: SEO meta tags (title, description, Open Graph) on all pages
- [ ] **XCT-05**: Image alt text for accessibility on all images

## v2 Requirements

### Dark Mode

- **DMOD-01**: Dark mode toggle with system preference detection and manual override
- **DMOD-02**: Dark mode preference persisted in localStorage
- **DMOD-03**: Inline script in `<head>` to prevent FOUC on page load

### Enhancements

- **ENHC-01**: Google Maps embed on Contact page
- **ENHC-02**: Newsletter signup with backend integration
- **ENHC-03**: Scroll-triggered entrance animations for sections
- **ENHC-04**: Leadership/team section on About page
- **ENHC-05**: Multi-language support (English)

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / shopping cart | Medical B2B uses inquiry, not online purchase. Would damage credibility. |
| User accounts / authentication | No use case for buyer accounts on a distributor site. Requires backend. |
| CMS / admin panel | 4-6 products, static content. Hardcoded data is simpler. Explicitly scoped out. |
| Blog / news section | Requires ongoing content production. Abandoned blog signals inactivity. |
| Live chat widget | WhatsApp already serves this role. Unstaffed chat damages trust. |
| Patient-facing content | APBA is B2B distributor, not patient-facing. |
| Product comparison tool | Only 3-4 laser products. Over-engineering for current catalog size. |
| Video content / 3D visualization | High production cost for a distributor. Link to manufacturer videos instead. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BLD-01 | Phase 1 | Pending |
| BLD-02 | Phase 1 | Pending |
| BLD-03 | Phase 1 | Pending |
| BLD-04 | Phase 1 | Pending |
| BLD-05 | Phase 2 | Complete |
| BLD-06 | Phase 2 | Complete |
| BLD-07 | Phase 2 | Complete |
| BLD-08 | Phase 1 | Pending |
| HOME-01 | Phase 3 | Pending |
| HOME-02 | Phase 3 | Pending |
| HOME-03 | Phase 3 | Pending |
| HOME-04 | Phase 3 | Pending |
| HOME-05 | Phase 3 | Pending |
| HOME-06 | Phase 3 | Pending |
| HOME-07 | Phase 3 | Pending |
| HOME-08 | Phase 3 | Pending |
| PROD-01 | Phase 4 | Complete |
| PROD-02 | Phase 4 | Complete |
| PROD-03 | Phase 4 | Complete |
| PROD-04 | Phase 4 | Complete |
| PROD-05 | Phase 4 | Complete |
| PROD-06 | Phase 4 | Complete |
| PROD-07 | Phase 4 | Complete |
| PROD-08 | Phase 4 | Complete |
| ABOT-01 | Phase 5 | Complete |
| ABOT-02 | Phase 5 | Complete |
| ABOT-03 | Phase 5 | Complete |
| ABOT-04 | Phase 5 | Complete |
| ABOT-05 | Phase 5 | Complete |
| CONT-01 | Phase 5 | Complete |
| CONT-02 | Phase 5 | Complete |
| CONT-03 | Phase 5 | Complete |
| CONT-04 | Phase 5 | Complete |
| CONT-05 | Phase 5 | Complete |
| CONT-06 | Phase 5 | Pending |
| XCT-01 | Phase 6 | Pending |
| XCT-02 | Phase 2 | Complete |
| XCT-03 | Phase 6 | Pending |
| XCT-04 | Phase 6 | Pending |
| XCT-05 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 36 total
- Mapped to phases: 36
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-18*
*Last updated: 2026-05-18 after initial definition*
