# APBA Group — Corporate Website

## What This Is

A multi-page corporate website for PT Abadi Perkasa Bersama Alkesindo (APBA Group), a medical equipment distributor specializing in urology. The site showcases products (lasers, ultrasonic systems, consumables), services (rental, laundry), and company subsidiaries. Frontend-only demo build.

## Core Value

Visitors can quickly understand APBA Group's urology product lineup and reach out via WhatsApp or email to inquire or request a quote.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Home page with hero, about summary, products/services bento grid, why-us features, subsidiaries, and footer
- [ ] Product detail pages for each product (Blue Diode Laser, Ultrasonic Surgery, Laser Holmium, Consumables)
- [ ] About Us page with company history, team, certifications, and stats
- [ ] Contact/Inquiry page with form and company info
- [ ] Responsive design (mobile-first)
- [ ] Dark mode support
- [ ] Smooth scroll navigation and page transitions
- [ ] Local product images used instead of external URLs
- [ ] Deployed to Vercel

### Out of Scope

- Backend / CMS / admin panel — this is a frontend demo only
- User authentication — no accounts needed
- Dynamic product catalog from database — products are hardcoded
- E-commerce / shopping cart — no purchasing functionality
- Multi-language (i18n) — Indonesian only for v1

## Context

- Existing design reference: `DESIGN.MD` contains a full Tailwind CSS single-page HTML prototype with color system, typography, spacing, and component patterns
- Local product images available in project root (4 PNG files: blue diode laser, ultrasonic surgery, holmium laser, office interior)
- The design uses a Material Design 3-inspired color system with deep blue (#003366) primary and medical teal (#00A3AD) accent
- Company has 3 subsidiaries: PT APBA (medical devices), PT APBATECH (medical tech), PT APBS (support services)
- Established 2017, serving 270+ hospitals & clinics across Indonesia

## Constraints

- **Tech Stack**: HTML5, CSS3, JavaScript ES6+; Angular & TypeScript optional; Tailwind CSS for styling
- **Deployment**: Must deploy to Vercel
- **Assets**: Use local PNG images from project directory, not external URLs
- **Scope**: Frontend demo only — no backend, no database, no CMS
- **Language**: Indonesian (Bahasa Indonesia) content

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Multi-page architecture (Home + Products + About + Contact) | User requested separate pages for products, about, and contact beyond the single-page design | — Pending |
| Tailwind CSS via build tool (not CDN) | Production-ready, tree-shaken CSS for Vercel deployment | — Pending |
| Local images over external URLs | Reliability, faster load, no dependency on external hosts | — Pending |
| No Angular/TypeScript in v1 | Simpler build, faster iteration for demo; can add later if needed | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-18 after initialization*
