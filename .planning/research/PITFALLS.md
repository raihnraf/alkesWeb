# Pitfalls Research

**Domain:** Medical equipment corporate website (B2B distributor, frontend demo, Vercel deployment)
**Researched:** 2026-05-18
**Confidence:** MEDIUM-HIGH (Vercel limits verified from official docs; medical compliance pitfalls from domain knowledge with LOW confidence on Indonesia-specific regulations)

## Critical Pitfalls

### Pitfall 1: Regulatory/Compliance Messaging on Product Pages

**What goes wrong:**
Product pages make unsubstantiated medical claims, use language that implies clinical efficacy without disclaimers, or display certification marks (CE, FDA, ISO) without proper context. In Indonesia, medical device distributors must comply with Ministry of Health (Kemenkes) regulations, and improperly framed product descriptions can create legal liability.

**Why it happens:**
Developers and content writers treat medical equipment product pages like consumer product pages. They use marketing language like "best-in-class," "clinically proven," or "most effective" which are regulated terms. The team may not consult regulatory affairs before publishing copy. This is a B2B site where the audience (hospital procurement, urologists) expects technical specifications over marketing fluff -- but content writers default to consumer-style copy.

**How to avoid:**
- Use descriptive, specification-focused language instead of superlative claims: "150W diode laser system with 980nm wavelength" not "most powerful laser available"
- Add a standard disclaimer footer on all product pages (this is a catalog/informational site, not a point-of-sale)
- Never display certification logos without the actual certificate number or registration status
- Ensure product descriptions match what the manufacturer has already cleared for marketing in Indonesia
- Get legal/regulatory review of all product copy before launch

**Warning signs:**
- Product copy uses superlatives ("best," "leading," "most advanced") without cited sources
- Certification badges appear without registration numbers
- No disclaimer text anywhere on the site
- Copy talks about patient outcomes rather than device capabilities

**Phase to address:**
Phase 1 (content creation / page structure) -- write compliant copy from the start; retrofitting compliance language after pages are built is error-prone

---

### Pitfall 2: Unoptimized Local Images Crushing Performance

**What goes wrong:**
The project uses 4 local PNG product images directly in `<img>` tags without any optimization. PNGs from design tools or product photography are often 2-10 MB each. On a page with a hero image, bento grid, and product thumbnails, this means 5-15 MB of images loading on first visit. LCP (Largest Contentful Paint) will be several seconds, making the site feel broken on mobile connections common in Indonesia.

**Why it happens:**
Developers drop in the images provided by the client/designer without running them through an optimization pipeline. Without a framework like Next.js (which provides `<Image>` with automatic optimization), there is no build-time image processing. Plain HTML + Tailwind sites have no automatic image pipeline. Developers assume "local images = fast" but local just means no network dependency -- file size is unchanged.

**How to avoid:**
- Pre-optimize all source PNGs before adding them to the project: convert to WebP, resize to actual display dimensions, compress with tools like `sharp`, `squoosh`, or `cwebp`
- Use the HTML `<picture>` element with multiple sources: WebP for modern browsers, JPEG fallback, with `srcset` and `sizes` for responsive delivery
- Generate multiple resolutions (1x, 2x at minimum) for product images
- For hero images, use a maximum of 1920px wide, quality 75-80 WebP
- Set explicit `width` and `height` attributes on all `<img>` tags to prevent Cumulative Layout Shift (CLS)
- Use `loading="lazy"` on below-fold images, `fetchpriority="high"` on hero images
- If using Vercel Image Optimization API, configure `vercel.json` with `images` block for local patterns

**Warning signs:**
- Any single image file exceeds 500 KB
- Total page weight exceeds 2 MB for images alone
- Hero image loads visibly from top to bottom
- No `width`/`height` attributes on `<img>` elements (causes CLS)
- Images not in WebP format
- No `loading="lazy"` on below-fold images

**Phase to address:**
Phase 1 (core pages) -- image optimization must be built into the asset pipeline from day one; it is far harder to retroactively optimize images and fix layout shifts after pages are built

---

### Pitfall 3: Vercel Deployment Misconfiguration for Multi-Page Static Site

**What goes wrong:**
Multi-page architecture (Home, Products, About, Contact) breaks on Vercel when:
1. Direct navigation to `/products` or `/about` returns 404 because Vercel does not know these paths map to HTML files
2. Framework detection fails -- Vercel may not detect the correct build configuration for a plain HTML/CSS/JS project
3. Output directory is wrong -- the build output folder does not match what Vercel expects
4. The 100 MB static file upload limit on Hobby plan is exceeded by large unoptimized images

**Why it happens:**
Vercel is optimized for framework-based deployments (Next.js, React, etc.). For a plain HTML site or a site built with a simple bundler, Vercel's auto-detection may misconfigure the build command, output directory, or routing. Developers expect clean URLs (`/products`) to "just work" but without rewrites or proper file structure (`/products/index.html`), Vercel serves 404s for direct-access routes.

**How to avoid:**
- Structure the output directory correctly: each route needs its own `index.html` (e.g., `dist/products/index.html`, `dist/about/index.html`)
- If using a build tool, ensure the output directory matches Vercel's "Output Directory" setting
- Add `vercel.json` with clean URL rewrites if needed:
  ```json
  {
    "cleanUrls": true
  }
  ```
- Or use explicit rewrites for each page:
  ```json
  {
    "rewrites": [
      { "source": "/products", "destination": "/products/index.html" },
      { "source": "/about", "destination": "/about/index.html" },
      { "source": "/contact", "destination": "/contact/index.html" }
    ]
  }
  ```
- Test deployment by directly navigating to each page URL (not just clicking links from the homepage)
- Keep total static assets under 100 MB for Hobby plan (optimize images!)
- Verify framework detection in Vercel dashboard after first deployment -- override if incorrect

**Warning signs:**
- Homepage loads but direct URL access to other pages returns 404
- Vercel build logs show "No Framework Detected"
- Build succeeds but the deployed site only serves `index.html` regardless of URL
- "Output Directory" in Vercel settings does not match actual build output folder

**Phase to address:**
Phase 1 (setup/deployment) -- verify Vercel deployment with all routes working before building out content; catching routing issues late means rethinking the entire file structure

---

### Pitfall 4: Dark Mode Flash of Unstyled Content (FOUC)

**What goes wrong:**
When using Tailwind's class-based dark mode (required for a toggle), the page briefly renders in light mode before the JavaScript that reads `localStorage` and applies the `dark` class executes. Users who previously selected dark mode see a jarring white flash on every page load or navigation.

**Why it happens:**
Class-based dark mode in Tailwind requires JavaScript to toggle the `.dark` class on the `<html>` element. If this script runs after the page begins rendering (e.g., at the bottom of `<body>` or in a deferred script), the browser paints light-mode styles first, then repaints dark-mode styles. This is especially bad on a corporate website where visual polish matters for credibility.

**How to avoid:**
- Place the dark mode detection script inline in the `<head>` section, BEFORE any CSS loads:
  ```html
  <script>
    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  </script>
  ```
- In Tailwind v4, use the `@custom-variant dark (&:where(.dark, .dark *));` directive for selector-based dark mode
- In Tailwind v3, set `darkMode: 'class'` in `tailwind.config.js`
- Test by: set dark mode, hard-refresh the page, watch for any white flash
- For multi-page sites, this script must be in the `<head>` of EVERY page, not just the homepage

**Warning signs:**
- Brief white flash when loading a page in dark mode
- Dark mode works after interaction but not on initial load
- Dark mode preference is lost when navigating between pages
- The `<script>` for dark mode detection is placed at the end of `<body>`

**Phase to address:**
Phase 1 (core layout/shell) -- the dark mode script must be in the shared layout template from the start; it is a cross-cutting concern that affects every page

---

### Pitfall 5: Consumer-Style UX in a B2B Medical Context

**What goes wrong:**
The site is designed like a consumer product page -- large emotional hero images, vague value propositions, flashy animations, and calls-to-action like "Buy Now" or "Shop Today." The actual B2B audience (hospital procurement officers, urologists, clinic directors) expects: detailed specifications, regulatory status, warranty/service information, and a clear path to request a quote or talk to a representative.

**Why it happens:**
Web designers default to consumer web patterns (hero image + tagline + CTA). B2B medical equipment purchasing is a consultative, multi-stakeholder process. The website's job is not to "convert" a visitor in one click -- it is to provide enough credible, detailed information that the visitor wants to initiate contact. Consumer-style UX makes the company look like a reseller, not a trusted medical equipment partner.

**How to avoid:**
- Lead with credibility signals: years of experience (est. 2017), hospital/client count (270+), certifications, manufacturer partnerships
- Product pages must include: technical specifications, intended use, compatible consumables, service/rental options, and regulatory status
- Primary CTA should be "Request a Quote" or "Contact Our Team" via WhatsApp/email, not "Buy Now"
- Use specification tables, comparison grids, and downloadable resources rather than lifestyle imagery
- The hero section should communicate trust and capability, not just look visually impressive
- Include subsidiary company structure (PT APBA, PT APBATECH, PT APBS) prominently -- it signals organizational depth

**Warning signs:**
- Hero section has a tagline but no evidence of credibility
- Product pages have no specification tables
- CTAs use consumer language ("Shop," "Buy," "Add to Cart")
- No mention of certifications, hospital count, or company history above the fold
- Contact options are buried or limited to a single form

**Phase to address:**
Phase 1 (page structure and content) -- B2B-appropriate content hierarchy must be established in wireframes/templates before visual design is applied

## Moderate Pitfalls

### Pitfall 6: WhatsApp Integration That Breaks on Desktop

**What goes wrong:**
WhatsApp contact links use `https://wa.me/...` which opens WhatsApp Web in a browser tab on desktop, requiring the user to scan a QR code or log in. Most desktop users do not have WhatsApp Web set up. On mobile, `wa.me` links work well because they open the WhatsApp app directly.

**How to avoid:**
- Use `https://api.whatsapp.com/send?phone=...` as a more reliable fallback
- Detect device type and provide both WhatsApp and email options prominently
- On desktop, show email as the primary contact method with WhatsApp as secondary
- Consider adding a pre-filled message parameter: `?phone=62xxx&text=Halo%20APBA%20Group%2C%20saya%20ingin%20bertanya%20tentang...`
- Test on both mobile and desktop before launch

**Warning signs:**
- Only WhatsApp is provided as a contact option
- WhatsApp link is the only CTA on the page
- No fallback contact method for desktop users

**Phase to address:**
Phase 1 (contact section) -- contact strategy should be dual-channel from the start

---

### Pitfall 7: Tailwind CSS Build Not Tree-Shaken in Production

**What goes wrong:**
If Tailwind is used via CDN (`<script src="https://cdn.tailwindcss.com">`) instead of a build tool, the entire Tailwind CSS library (~3.5 MB uncompressed) is shipped to the browser. This destroys page load performance. Even with a build tool, if the `content` paths in `tailwind.config.js` are misconfigured, Tailwind may not scan all HTML files for used classes, resulting in missing styles or a bloated CSS output.

**How to avoid:**
- NEVER use the Tailwind CDN in production -- it is for development only
- Use a proper build tool (Vite, PostCSS CLI, or even a simple Tailwind CLI build) to generate tree-shaken CSS
- Configure `content` paths to include ALL HTML files: `content: ['./*.html', './pages/**/*.html', './components/**/*.html']`
- Verify the production CSS output size -- it should be under 50 KB, not megabytes
- Test production build by checking the CSS file size in the output directory

**Warning signs:**
- CSS file in production is over 100 KB
- Some Tailwind classes work in development but are missing in production
- Build logs do not show Tailwind scanning HTML files
- The project uses `<script src="https://cdn.tailwindcss.com">` in HTML

**Phase to address:**
Phase 1 (build setup) -- the build pipeline must be correctly configured before writing any styles

---

### Pitfall 8: No Shared Layout Template Across Pages

**What goes wrong:**
Each page (Home, Products, About, Contact) has its own independent HTML file with duplicated header, footer, navigation, dark mode script, and meta tags. When a change is needed (e.g., adding a new nav item, updating the footer, fixing the dark mode script), it must be manually applied to every page. Inconsistencies emerge -- the footer on the About page has a different copyright year than the Contact page, dark mode works on the Home page but not Products, etc.

**How to avoid:**
- Use a simple templating solution: Vite with plugin (vite-plugin-handlebars, vite-plugin-html), or even a simple build script that injects shared partials
- Alternatively, use a lightweight SSG like 11ty (Eleventy) that supports layouts and partials natively
- At minimum, create a build script that assembles pages from shared header/footer/nav partials
- The shared layout must include: navigation, footer, dark mode script, meta tag structure, and CSS imports

**Warning signs:**
- Copy-pasting the full HTML structure between pages
- Changes to navigation require editing multiple files
- Footer content differs between pages
- Dark mode script exists in some pages but not others

**Phase to address:**
Phase 1 (project setup) -- establish the templating/build system before creating any page content

---

### Pitfall 9: Vercel Image Optimization Usage Limits on Hobby Plan

**What goes wrong:**
Vercel's Hobby (free) plan includes 5,000 image transformations per month and 1,000 source images (legacy). If the site uses Vercel's Image Optimization API, traffic spikes or repeated deployments can exhaust the quota. When the limit is exceeded, new images fail to optimize and return a 402 error with broken image display (alt text shown instead). Previously cached images continue working, creating an inconsistent experience.

**Why it happens:**
Each unique image size/format combination counts as a separate transformation. A single product image rendered at 3 responsive sizes in 2 formats (WebP, AVIF) = 6 transformations per image. With 4 product images plus hero images, a few dozen page loads can consume the monthly quota quickly.

**How to avoid:**
- For a small corporate demo site, pre-optimize images at build time rather than relying on Vercel's runtime optimization
- Use `sharp` or `squoosh` during the build to generate WebP/AVIF versions at required sizes
- If using Vercel Image Optimization, configure `minimumCacheTTL` to a high value (e.g., 86400 seconds) to reduce repeat transformations
- Monitor usage in the Vercel dashboard
- Consider disabling Vercel Image Optimization entirely and serving pre-built static images for a demo site with low traffic

**Warning signs:**
- Vercel dashboard shows image transformation count approaching 5,000
- Some images fail to load with 402 status codes
- Images appear as alt text rather than rendered pictures

**Phase to address:**
Phase 2 (polish/optimization) -- decide on image strategy before launch; a demo site should likely use pre-optimized static images rather than runtime optimization

---

### Pitfall 10: Mobile Navigation Broken on Multi-Page Site

**What goes wrong:**
The hamburger menu works on the homepage but breaks on other pages because:
1. JavaScript for the mobile menu references DOM elements that only exist on the homepage
2. Relative paths in navigation links break when the user is on a subdirectory page (e.g., `/products/`)
3. The active page indicator does not update correctly across pages
4. The mobile menu overlay does not scroll or traps scroll on the body

**How to avoid:**
- Use absolute paths for all navigation links: `/` for home, `/products/` for products, etc. (not `./products.html`)
- Test navigation on EVERY page, not just the homepage
- Ensure the mobile menu JavaScript is self-contained and does not depend on page-specific elements
- Handle body scroll locking correctly when the menu is open (and restore it when closed)
- Add `aria-expanded` and `aria-label` attributes for accessibility
- Test on actual mobile devices, not just browser DevTools responsive mode

**Warning signs:**
- Navigation links work from the homepage but return 404 from other pages
- Mobile menu opens but links are broken
- Page cannot scroll after closing the mobile menu
- Active page highlighting is wrong on subpages

**Phase to address:**
Phase 1 (navigation/layout) -- shared navigation component must be tested across all pages from the start

## Minor Pitfalls

### Pitfall 11: Missing Indonesian-Language SEO Meta Tags

**What goes wrong:**
Pages lack `<title>`, `<meta name="description">`, Open Graph tags, and `lang="id"` attribute. For a corporate site that needs to be findable, this means poor search engine indexing and bad link previews when shared on WhatsApp or social media (common in Indonesia).

**How to avoid:**
- Set `<html lang="id">` on every page
- Write unique `<title>` and `<meta name="description">` for each page
- Add Open Graph (`og:title`, `og:description`, `og:image`) for WhatsApp/social sharing previews
- Use structured data (JSON-LD) for Organization schema

**Phase to address:**
Phase 2 (polish) -- add meta tags after page content is finalized

---

### Pitfall 12: Smooth Scroll and Page Transition Conflicts

**What goes wrong:**
The project requires "smooth scroll navigation and page transitions." Smooth scroll on same-page anchors (e.g., `#products` on the homepage) works, but page transitions between separate HTML files require JavaScript-based transitions that can conflict with browser navigation, break the back button, or create blank-flash moments.

**How to avoid:**
- For same-page anchors: use `scroll-behavior: smooth` in CSS (simplest, most reliable)
- For cross-page transitions: use View Transitions API if supported, with a fallback to simple navigation
- Do NOT implement a custom SPA router for a 4-page static site -- it adds complexity for no real benefit
- Test the back button after any transition implementation
- Keep page transition animations fast (under 300ms)

**Phase to address:**
Phase 2 (polish) -- transitions are enhancement, not core functionality

---

### Pitfall 13: Vercel Hobby Plan Cannot Connect to Git Organization Repos

**What goes wrong:**
Vercel Hobby plan does not support connecting projects to Git repositories owned by organizations. If the repository is under a GitHub organization (e.g., the company's GitHub org), the deployment will fail or the option will be grayed out.

**How to avoid:**
- Use a personal GitHub account for the repository, or
- Upgrade to Vercel Pro, or
- Use CLI-based deployment (`vercel deploy`) instead of Git integration

**Phase to address:**
Phase 1 (deployment setup) -- determine Git/organization strategy before first deployment

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Copy-paste HTML layout across pages | Fast initial development | Divergent layouts, maintenance nightmare, missed changes | Never -- use templating from day one |
| Tailwind CDN in production | Zero build setup, instant start | 3.5 MB CSS payload, poor Lighthouse scores, no tree-shaking | Only for local prototyping, never deployed |
| Unoptimized PNG images directly in HTML | No build step needed for images | Slow LCP, high bandwidth, poor mobile experience | Only for initial design review, never production |
| Hardcoded WhatsApp number in multiple places | Quick to implement | Phone number change requires finding and updating every instance | MVP only -- centralize in a config/data file |
| No build tool (raw HTML files) | Simplest possible setup | No shared layouts, no image optimization, no CSS tree-shaking, harder Vercel integration | Only for the very first prototype; add build tool before multi-page work |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| WhatsApp (`wa.me`) | Using only `wa.me` links with no desktop fallback | Provide both WhatsApp (primary on mobile) and email (primary on desktop); use `api.whatsapp.com/send` for better compatibility |
| Vercel deployment | Not testing direct URL access to subpages | Test every page URL by typing it directly in the browser address bar |
| Vercel Image Optimization | Relying on it for a small static demo site | Pre-optimize images at build time; use Vercel optimization only if needed for dynamic images |
| Dark mode (Tailwind) | Placing dark mode script after CSS loads | Inline script in `<head>` before CSS to prevent FOUC |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Large unoptimized PNGs | LCP > 3s, high page weight | Pre-optimize to WebP, use `<picture>` with srcset | Any mobile connection; Indonesian 4G averages 10-20 Mbps |
| No lazy loading on below-fold images | All images download on initial page load even if never scrolled to | Add `loading="lazy"` on images below the fold | Pages with many product images or long scrolling content |
| Missing width/height on images | Layout shifts as images load (high CLS) | Set explicit `width` and `height` (or `aspect-ratio` in CSS) on every `<img>` | Any page with images that load after text content |
| CSS file > 100 KB | Slow FCP, wasted bandwidth | Use Tailwind build with proper content config; audit unused classes | Any page load, especially on slower connections |
| No font-display strategy | Text invisible while custom fonts load (FOIT) | Use `font-display: swap` or `font-display: optional` in font-face declarations | Pages using custom/web fonts |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing internal contact info | Company internal numbers/emails indexed by search engines | Use only public-facing contact details; add `robots.txt` for any admin paths |
| No `rel="noopener noreferrer"` on external links | Tab-napping vulnerability from WhatsApp/social links | Add `rel="noopener noreferrer"` to all `target="_blank"` links |
| Hardcoded sensitive values in HTML | API keys or internal URLs discoverable in page source | This is a frontend-only demo with no API keys -- but verify no secrets leak in committed code |
| Missing Content Security Policy | XSS vector if any third-party scripts are added | Add CSP headers via `vercel.json` `headers` configuration |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Consumer-style "Buy Now" CTA | B2B audience perceives the company as unprofessional or retail-level | Use "Request a Quote," "Hubungi Kami," or "Konsultasi Gratis" |
| No product specifications visible | Decision-makers cannot evaluate products without calling | Show specs in a structured table on every product page |
| WhatsApp as the only contact channel | Desktop users cannot easily reach the company | Provide email, phone, and WhatsApp; make email prominent on desktop |
| Slow image loading on product pages | Visitors assume the site is broken and leave | Optimize images, use skeleton/placeholder loading states |
| No clear company differentiator above fold | Visitors do not understand why APBA vs competitors | Show "270+ rumah sakit," "Sejak 2017," and subsidiary structure prominently |
| Dark mode without user toggle | Users stuck in one mode regardless of preference | Provide a visible light/dark toggle that persists across pages |

## "Looks Done But Isn't" Checklist

- [ ] **Multi-page routing:** Direct URL access to `/products`, `/about`, `/contact` returns 200 (not 404) -- test by typing URLs directly
- [ ] **Dark mode:** Persists across page navigation and does not flash white on reload -- test by setting dark mode, navigating to another page, then refreshing
- [ ] **Mobile navigation:** Hamburger menu opens, links navigate correctly, and scroll is not trapped -- test on actual mobile device
- [ ] **Image optimization:** All images are WebP with JPEG fallback, total page weight under 2 MB -- test with Lighthouse and browser DevTools Network tab
- [ ] **WhatsApp links:** Open correctly on both mobile (app) and desktop (web/fallback) -- test on both platforms
- [ ] **Active navigation state:** Current page is highlighted in both desktop and mobile nav -- test on every page
- [ ] **Responsive design:** All pages work at 320px, 768px, and 1440px widths -- test at all breakpoints
- [ ] **Vercel deployment:** All pages accessible on the deployed URL, not just the homepage -- test after first deployment
- [ ] **Content compliance:** No unsubstantiated medical claims, certification logos have registration context -- legal review before launch

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Regulatory non-compliance in copy | MEDIUM | Audit all product copy, remove claims, add disclaimers, get legal sign-off |
| Unoptimized images | LOW | Run sharp/squoosh batch processing, replace files, add `<picture>` elements |
| Vercel 404 on subpages | LOW | Add `vercel.json` with `cleanUrls: true` or rewrites, redeploy |
| Dark mode FOUC | LOW | Move inline script to `<head>` on all pages |
| Divergent page layouts | MEDIUM | Refactor to shared template system, rebuild pages from partials |
| Tailwind CDN in production | MEDIUM | Set up Vite or PostCSS build, configure content paths, replace CDN script |
| Broken mobile navigation | LOW | Fix relative paths to absolute, test on all pages, fix scroll lock |
| WhatsApp desktop failure | LOW | Add email as primary desktop CTA, update WhatsApp link format |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Regulatory compliance messaging | Phase 1 (Content) | Legal review of all product copy before any page goes live |
| Unoptimized images | Phase 1 (Build setup) | Lighthouse audit showing LCP < 2.5s on all pages |
| Vercel deployment misconfiguration | Phase 1 (Setup) | Direct URL access to every page returns 200 on deployed site |
| Dark mode FOUC | Phase 1 (Layout) | No white flash on any page load in dark mode; test with hard refresh |
| Consumer-style UX in B2B context | Phase 1 (Content) | Review: specs visible, CTAs use B2B language, credibility signals above fold |
| WhatsApp desktop failure | Phase 1 (Contact section) | Test WhatsApp link on desktop; verify email is also available |
| Tailwind not tree-shaken | Phase 1 (Build setup) | Production CSS file < 50 KB; no CDN script in HTML |
| No shared layout template | Phase 1 (Setup) | Shared header/footer/nav exist as partials; single source of truth |
| Vercel image optimization limits | Phase 2 (Optimization) | Decision made: pre-optimized static images or Vercel optimization with monitoring |
| Mobile navigation broken | Phase 1 (Layout) | Hamburger menu tested on every page with actual mobile device |
| Missing SEO meta tags | Phase 2 (Polish) | Every page has unique title, description, lang="id", Open Graph tags |
| Smooth scroll/transitions | Phase 2 (Polish) | Back button works; transitions < 300ms; no blank flashes |
| Vercel Hobby + Git org | Phase 1 (Setup) | Verify repository ownership allows Hobby plan connection |

## Sources

- Vercel Limits documentation: https://vercel.com/docs/limits (verified 2026-03-02, HIGH confidence)
- Vercel Image Optimization limits and pricing: https://vercel.com/docs/image-optimization/limits-and-pricing (verified 2026-02-23, HIGH confidence)
- Vercel vercel.json configuration: https://vercel.com/docs/project-configuration/vercel-json (HIGH confidence)
- Vercel routing and rewrites: https://vercel.com/docs/routing/rewrites (HIGH confidence)
- Tailwind CSS dark mode documentation: Context7 /tailwindlabs/tailwindcss.com (HIGH confidence)
- Tailwind CSS responsive design and image handling: Context7 /tailwindlabs/tailwindcss.com (HIGH confidence)
- Medical device regulatory messaging: Domain knowledge based on general medical device marketing regulations (MEDIUM confidence -- Indonesia-specific Kemenkes regulations not verified from primary sources)
- B2B vs B2C web design patterns: Industry best practices (MEDIUM confidence)
- WhatsApp API documentation: wa.me and api.whatsapp.com behavior (MEDIUM confidence based on known behavior)

---
*Pitfalls research for: APBA Group medical equipment corporate website*
*Researched: 2026-05-18*
