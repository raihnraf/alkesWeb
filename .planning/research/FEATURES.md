# Feature Landscape

**Domain:** Medical Equipment Distributor Corporate Website (B2B, Urology Specialization)
**Researched:** 2026-05-18

## Research Basis

Analysis of competitor/peer websites in the medical device space (Olympus, Stryker, Boston Scientific, Karl Storz, Richard Wolf, Quanta System, IPG Photonics/medical), the existing DESIGN.MD prototype, and PROJECT.md requirements. Confidence is MEDIUM-HIGH: strong pattern agreement across competitor sites and the existing design, but WebSearch returned sparse results for specific best-practice articles; most insights are derived from direct website analysis.

## Table Stakes

Features users expect. Missing = product feels incomplete. A hospital procurement officer or urologist visiting the site will silently leave if these are absent.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Hero section with clear value proposition** | Visitors decide in 3-5 seconds whether to stay. Medical B2B audiences need to instantly see specialty (urology), credibility (270+ hospitals), and next action. | Low | Already in DESIGN.MD. Must include company name, tagline, primary CTA, and visual authority cue (equipment image or clinical setting). |
| **Product listing/catalog overview** | This is a distributor. Products are the core offering. Every medical device site (Olympus, Karl Storz, Boston Scientific, Quanta System) leads with product categories or a product showcase section. | Low | Already in DESIGN.MD as bento grid. Must list all product categories (lasers, ultrasonic, consumables) with brief descriptions. |
| **Product detail pages** | B2B buyers need specifications before contacting sales. Every competitor site (Quanta System, Richard Wolf, Karl Storz) has dedicated product pages with specs, applications, and imagery. A card that just says "Blue Diode Laser" with no clickthrough is insufficient. | Medium | Currently missing from DESIGN.MD (cards link to `#`). Each product page needs: hero image, key specs table, clinical applications, related products, and inquiry CTA. |
| **Contact information (phone, email, address)** | B2B medical buyers often contact by phone or email directly. This is universal -- every competitor site has visible contact details. | Low | Already in DESIGN.MD footer. Should also appear on a dedicated Contact page. |
| **WhatsApp inquiry channel** | In Indonesia, WhatsApp is the primary business communication channel. B2B and B2C alike. A medical distributor without WhatsApp contact is effectively unreachable for most Indonesian hospital administrators. | Low | Already in DESIGN.MD footer (WA: 0811 1212 9779). Should also be a floating WhatsApp button and prominent on the Contact page. |
| **About Us / Company info** | Trust is paramount in medical B2B. Buyers need to verify the company is legitimate, established, and certified. Every competitor site (Olympus, Karl Storz, Quanta System) has an About/Company section with history, mission, and scale. | Low | Partially in DESIGN.MD. Needs expansion into a full page with: company history timeline, team/leadership, subsidiaries overview, certifications. |
| **Certifications and compliance signals** | Medical equipment buyers require regulatory assurance. ISO 13485, Indonesian MoH distribution license (IPAK/Distribution Permit), and manufacturer certifications are baseline trust signals. Boston Scientific, Stryker, Olympus all prominently display compliance. | Low | DESIGN.MD mentions "ISO 13485 Certified" in footer. Should be more prominent: dedicated certifications section on About page, certification badges in hero or trust bar. |
| **Responsive mobile design** | Hospital administrators and doctors browse on phones. In Indonesia, mobile traffic exceeds 70% for most sites. | Medium | Already specified in PROJECT.md. Must be mobile-first, not desktop-afterthought. |
| **Clear navigation** | Users must find products, about, and contact within 2 clicks. Multi-page sites need a consistent, sticky nav. | Low | Already in DESIGN.MD. Must extend to new pages (product detail, about, contact). |
| **Professional visual design** | Medical equipment B2B demands authority and precision in design. Cheap or cluttered design signals unreliable products. | Medium | DESIGN.MD establishes a solid Material Design 3 system with deep blue and medical teal. This is strong and should carry forward. |

## Differentiators

Features that set APBA Group apart. Not expected by default, but valued by the target audience (urologists, hospital procurement, clinic administrators).

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Dark mode support** | Differentiates from most Indonesian medical distributor sites that are light-only. Shows technical sophistication. Practical benefit: surgeons and clinicians often browse in low-light environments. | Medium | Already specified in PROJECT.md. DESIGN.MD has dark mode classes. Implement with system preference detection + toggle. |
| **Rental/lease option showcase** | Most distributor websites only show purchase. APBA Group offers equipment rental, which is a significant differentiator for hospitals with capital constraints. This should be prominently featured, not buried. | Low | Already in DESIGN.MD as a service card. Elevate this: dedicated section or banner on product pages ("Available for Purchase or Rental"). |
| **Subsidiary ecosystem display** | APBA Group's three-company structure (PT APBA, PT APBATECH, PT APBS) signals scale and comprehensive service. Most Indonesian distributors are single-entity. The glassmorphism subsidiary section in DESIGN.MD is a good approach. | Low | Already in DESIGN.MD. Keep and enhance with brief descriptions of each subsidiary's role. |
| **Smooth scroll navigation and page transitions** | Polished feel that sets APBA apart from typical static Indonesian corporate websites. Creates a premium impression matching the high-value equipment. | Medium | Already specified in PROJECT.md. Implement with CSS scroll-behavior and view-transition API or simple fade transitions between pages. |
| **WhatsApp floating action button** | Persistent, always-visible WhatsApp button is standard in Indonesian e-commerce but less common in B2B medical. Having it signals accessibility and modernity. | Low | Not in current DESIGN.MD. Add a fixed-position WhatsApp icon (bottom-right) that opens wa.me link with pre-filled message. |
| **Product inquiry with pre-filled WhatsApp message** | Instead of a generic contact form, each product page can have a "Request Quote via WhatsApp" button that pre-fills the product name. This reduces friction for Indonesian buyers who prefer chat over forms. | Low | High-impact, low-effort differentiator. Each product detail page should have product-specific WhatsApp deep links. |
| **Hospital/client count as social proof** | "270+ hospitals & clinics" is a powerful trust signal. Most Indonesian distributors do not publish this metric. Make it prominent, not just in the About section text. | Low | Already in DESIGN.MD as a stat. Consider adding an animated counter or trust bar near the hero section. |
| **Services showcase (rental, laundry, technical support)** | Beyond equipment sales, APBA offers rental, hospital laundry, and biomedical engineering support. Most distributor sites only list products. Services should be co-equal in navigation. | Low | Partially in DESIGN.MD. Give services their own section or page, not just cards in the product grid. |

## Anti-Features

Features to explicitly NOT build. These would waste time, add complexity, or damage credibility for this specific audience.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **E-commerce / shopping cart / online purchasing** | Medical equipment is high-value, regulated, and requires consultation. No hospital buys a holmium laser through a shopping cart. This would look naive and damage credibility. Every major medical device site (Olympus, Stryker, Boston Scientific) routes to "Contact Sales" or "Find a Rep," never to a cart. | CTA buttons lead to inquiry (WhatsApp, email, contact form). Quote requests, not purchases. |
| **User accounts / login / authentication** | No reason for buyers to create accounts on a distributor site. This is not a SaaS product or portal. Adding login would confuse visitors and require backend infrastructure that contradicts the frontend-only scope. | Keep the site public and open. All content accessible without login. |
| **Dynamic CMS / admin panel** | PROJECT.md explicitly scopes this out. Products are few and stable (4-6 items). A CMS would add backend complexity with zero benefit for the current product count. | Hardcoded product data in frontmatter or data files. Simple to update by editing code. Can add CMS later if product count grows significantly. |
| **Multi-language (i18n) for v1** | Target audience is Indonesian hospitals. Content is in Bahasa Indonesia. English would add translation cost and maintenance burden. PROJECT.md scopes this out. | Indonesian-only for v1. Structure content files so i18n can be added later without rework (use data files, not hardcoded strings in templates). |
| **Blog / news / articles section** | A blog requires ongoing content production that the company likely cannot sustain. An abandoned blog is worse than no blog -- it signals inactivity. Medical device sites that have news sections (Olympus, Boston Scientific) are large enterprises with dedicated comms teams. | Skip for v1. If content marketing becomes a strategy later, add it. A "Latest Updates" section showing 1-2 items is acceptable if there is genuine content. |
| **Live chat widget** | Adds third-party dependency, requires staffing to respond, and WhatsApp already serves this role in Indonesia. A live chat with no response damages trust more than no chat at all. | WhatsApp button serves as the "live chat" equivalent. If staffing allows later, integrate a WhatsApp Business API chat widget. |
| **Patient-facing content / patient stories** | APBA Group is a B2B distributor selling to hospitals and clinics, not to patients. Patient stories work for manufacturers like Boston Scientific that sell directly to informed patients. For a distributor, this would be off-brand. | Keep content focused on the buyer: hospital administrators, procurement officers, urologists. |
| **Investor relations / stock information** | APBA is a private company, not publicly listed. Investor pages are for listed medical device manufacturers (Olympus, Stryker). | Company info focused on credibility (years in business, hospital count, certifications), not financials. |
| **Product comparison tool** | With only 3-4 laser products, a comparison tool is over-engineering. Useful when catalog has 20+ products. | Simple "Related Products" links on each product detail page. |
| **Video content / 3D product visualization** | High production cost, requires product access for filming. Karl Storz and IPG Photonics do this, but they are manufacturers with marketing budgets. A distributor should link to manufacturer videos, not produce their own. | Link to manufacturer-provided videos/resources if available. Do not produce original video for v1. |

## Feature Dependencies

```
Hero section ──────────────────────────────────────> (standalone, no deps)
Navigation ────────────────────────────────────────> (standalone, but must link to all pages)
Product listing (bento grid) ──────────────────────> Product detail pages (cards must link to detail)
Product detail pages ──────────────────────────────> Product listing (discoverability)
Product detail pages ──────────────────────────────> WhatsApp inquiry (CTA on each page)
About Us page ─────────────────────────────────────> Certifications section (trust signals)
Contact page ──────────────────────────────────────> WhatsApp floating button (consistent channel)
Dark mode toggle ──────────────────────────────────> (standalone, applies globally)
Responsive design ─────────────────────────────────> (standalone, applies to all pages)
WhatsApp floating button ──────────────────────────> Contact page (consistent contact info)
Subsidiary section ────────────────────────────────> About Us page (can link for more detail)
Services showcase ─────────────────────────────────> Contact page / WhatsApp (inquiry CTA)
Smooth scroll / transitions ───────────────────────> (standalone, enhances all pages)
```

## Page Structure Recommendation

Based on competitor analysis and PROJECT.md requirements:

### Home Page
- Hero (value prop, CTA)
- About summary (stats: 2017, 270+ hospitals)
- Product bento grid (3 products + 3 services)
- Why Choose Us (5 feature cards)
- Subsidiaries (3 glassmorphism cards)
- Footer with contact, links, newsletter

### Product Detail Pages (one per product: 4 pages)
- Product hero image
- Key specifications table
- Clinical applications / use cases
- Available for purchase or rental (if applicable)
- Related products
- Inquiry CTA (WhatsApp + email)

### About Us Page
- Company history (2017-present)
- Mission / values
- Team / leadership
- Subsidiaries detail (PT APBA, PT APBATECH, PT APBS)
- Certifications (ISO 13485, etc.)
- Stats (270+ hospitals, years of operation)

### Contact Page
- Contact form (name, institution, email, phone, product interest, message)
- WhatsApp deep link
- Email
- Phone
- Office address with embedded map (optional but expected)
- Office hours

## MVP Recommendation

Prioritize:
1. **Home page** (carry forward and enhance DESIGN.MD -- this is 70% done already)
2. **Product detail pages** (this is the biggest gap -- the current design has no clickthrough from product cards)
3. **Contact page** with form + WhatsApp + email (the primary conversion path)
4. **About Us page** (trust establishment for B2B buyers)

Defer:
- **Animated counters / scroll animations**: Nice-to-have polish, not MVP. Ship static numbers first.
- **Newsletter signup**: No email infrastructure in scope. The footer input in DESIGN.MD is cosmetic only. Remove or defer.
- **Embedded Google Maps**: Adds third-party dependency and cookie concerns. Defer to v2.

## Complexity Estimates

| Feature | Complexity | Effort (hours) | Risk |
|---------|------------|----------------|------|
| Home page (enhance DESIGN.MD) | Low | 4-6 | Low |
| Product detail page (template x4) | Medium | 8-12 | Low |
| Contact page with form | Low-Medium | 4-6 | Low (form is display-only, no backend) |
| About Us page | Low | 4-6 | Low |
| Responsive design (all pages) | Medium | 6-8 | Low |
| Dark mode (all pages) | Medium | 4-6 | Low |
| WhatsApp floating button | Low | 1-2 | Low |
| Smooth scroll / transitions | Low-Medium | 3-4 | Low |
| Navigation (multi-page routing) | Medium | 4-6 | Medium (depends on framework choice) |
| **Total estimated** | | **38-56** | |

## Sources

- Direct analysis: Olympus Global (olympus-global.com), Stryker (stryker.com), Boston Scientific (bostonscientific.com), Karl Storz (karlstorz.com), Richard Wolf (richard-wolf.com), Quanta System (quantasystem.com), IPG Photonics Medical (ipgphotonics.com/en/applications/medical)
- Project files: DESIGN.MD (existing single-page Tailwind prototype), PROJECT.md (requirements and constraints)
- Confidence: MEDIUM-HIGH -- feature classification is based on consistent patterns across 7 competitor sites and the existing project design, but no specific published "medical device website best practices" article was found to cross-validate.
