<!-- GSD:project-start source:PROJECT.md -->
## Project

**APBA Group — Corporate Website**

A multi-page corporate website for PT Abadi Perkasa Bersama Alkesindo (APBA Group), a medical equipment distributor specializing in urology. The site showcases products (lasers, ultrasonic systems, consumables), services (rental, laundry), and company subsidiaries. Frontend-only demo build.

**Core Value:** Visitors can quickly understand APBA Group's urology product lineup and reach out via WhatsApp or email to inquire or request a quote.

### Constraints

- **Tech Stack**: HTML5, CSS3, JavaScript ES6+; Angular & TypeScript optional; Tailwind CSS for styling
- **Deployment**: Must deploy to Vercel
- **Assets**: Use local PNG images from project directory, not external URLs
- **Scope**: Frontend demo only — no backend, no database, no CMS
- **Language**: Indonesian (Bahasa Indonesia) content
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.2 | Multi-page framework, static export, Vercel deployment | First-class Vercel integration, file-system routing for Home/Products/About/Contact pages, `output: 'export'` for fully static build, App Router for modern React patterns. Astro is leaner for pure content sites but Next.js wins here because: (1) the project constraint explicitly lists "Angular & TypeScript optional" implying React ecosystem comfort, (2) Vercel deployment is zero-config with Next.js, (3) `next/image` handles the 4 local product PNGs with auto-optimization even in static mode via imports, (4) future extensibility if the demo becomes a real app. |
| React | 19.2 | UI component library | Ships with Next.js 16. Required, not optional. |
| TypeScript | 5.x | Type safety | Next.js 16 `create-next-app` defaults to TypeScript. The project constraints list TypeScript as optional, but enabling it from the start prevents a painful migration later. Low overhead for a multi-page site with ~4 routes. |
### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.3 | Utility-first CSS framework | Project constraint mandates Tailwind CSS. v4 is current stable -- uses CSS-native `@theme` directive instead of `tailwind.config.js`, which is a direct upgrade for the existing DESIGN.MD color system. The existing 50+ custom color tokens from DESIGN.MD migrate cleanly into `@theme { --color-*: ... }` blocks. No `tailwind.config.js` needed. |
| @tailwindcss/postcss | 4.3 | PostCSS plugin for Tailwind v4 | Required integration layer. Replaces the old `postcss` + `autoprefixer` + `tailwindcss` combo from v3. Single plugin now. |
| next-themes | 0.4 | Dark mode toggle with class strategy | The existing design uses `darkMode: "class"` and `dark:` variants throughout. Tailwind v4 defaults to `prefers-color-scheme` media query; `@custom-variant dark (&:where(.dark, .dark *))` in CSS handles the variant override, but `next-themes` handles the actual toggle logic (reading localStorage, applying `.dark` class to `<html>`, avoiding flash-of-wrong-theme on load). Battle-tested with Next.js App Router. |
### Fonts
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font | (built-in) | Font optimization | Next.js built-in. Zero layout shift, self-hosted Google Fonts (Inter, Plus Jakarta Sans) without external network requests. The existing DESIGN.MD loads these via Google Fonts CDN -- `next/font/google` replaces that with optimized self-hosting. |
| Plus Jakarta Sans | -- | Headline font family | From existing design. Used for all headline-xl/lg/md sizes. |
| Inter | -- | Body font family | From existing design. Used for body-lg/md, label-md, caption sizes. |
### Icons
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Lucide React | 1.16 | Icon library | Tree-shakeable SVG icons. The existing design uses Material Symbols Outlined (loaded via Google Fonts CDN). Switch to Lucide for: (1) first-class React components instead of font-based icons, (2) smaller bundle (only import what you use), (3) consistent stroke-based style that pairs well with the clean medical aesthetic. If exact Material Symbol fidelity is required, keep the Google Fonts link as a fallback. |
### Animation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| CSS transitions + Tailwind | (built-in) | Page transitions, scroll animations, hover effects | For a corporate website, Tailwind's built-in `transition-*`, `duration-*`, and `animate-*` utilities cover 90% of animation needs (hover effects, fade-ins, smooth scroll). No library needed for this scope. If complex scroll-triggered animations are added later, consider `motion` (formerly framer-motion) 12.x. |
### Development Tools
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| ESLint | 10.4 | Linting | Standard. `eslint-config-next` 16.2 provides Next.js-specific rules. |
| eslint-config-next | 16.2 | Next.js ESLint rules | Matches Next.js version. Catches common App Router mistakes. |
| @types/react | 19.2 | React type definitions | Matches React version. |
| @types/node | 25.8 | Node.js type definitions | For Next.js config files and build scripts. |
### Deployment
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | -- | Hosting and deployment | Project constraint. Zero-config for Next.js. Automatic previews on PRs. Free tier sufficient for a demo. Static export (`output: 'export'`) means no serverless functions needed. |
## Alternatives Considered
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro 6 | Astro produces smaller bundles for content sites and ships zero JS by default. However: (1) project constraints imply React ecosystem, (2) Next.js `next/image` handles the 4 local product PNGs with auto width/height and blur placeholders, (3) Vercel deployment is native for Next.js vs requiring `@astrojs/vercel` adapter for Astro, (4) if the demo evolves into a real app with server features, Next.js scales there while Astro would need a framework switch. Astro is the better choice for a pure brochure site that will never grow, but Next.js is the safer bet given uncertainty. |
| Framework | Next.js 16 | Plain HTML/Vite | The existing DESIGN.MD is a single-page HTML file. A Vite multi-page setup is lighter. However: (1) no file-system routing, (2) no built-in image optimization, (3) manual Vercel config, (4) no `next/font` equivalent. More effort for fewer features. |
| Styling | Tailwind CSS v4 | Tailwind CSS v3 | v3 requires `tailwind.config.js`, `postcss`, and `autoprefixer` as separate packages. v4 consolidates everything into CSS-native `@theme` directive with a single `@tailwindcss/postcss` plugin. The existing design's 50+ custom colors are cleaner in v4's `@theme` block than in a JS config object. No reason to start a new project on v3. |
| Dark Mode | next-themes | Manual JS toggle | Writing a custom `useEffect` + `localStorage` toggle works, but next-themes handles edge cases (SSR hydration mismatch, flash of wrong theme, system preference detection) that are easy to get wrong. 2KB gzipped. Worth it. |
| Icons | Lucide React | Material Symbols (Google Fonts) | The existing design uses Material Symbols Outlined via Google Fonts CDN. This works but: (1) loads an entire font file even if you use 5 icons, (2) no React component API, (3) CDN dependency. Lucide gives per-icon imports with tree-shaking. If pixel-perfect icon fidelity with the existing design is critical, keep Material Symbols. |
| Animation | CSS/Tailwind built-in | Framer Motion / motion | motion 12.x is excellent but overkill for a corporate brochure. Tailwind's `transition`, `duration`, and `animate` utilities cover hover states, fade-ins, and smooth scrolls. Add motion only if scroll-triggered or layout animations are needed in a later phase. |
## Installation
# Create Next.js project with TypeScript and Tailwind
# Install Tailwind v4 PostCSS plugin (create-next-app may install this already)
# Dark mode toggle
# Icons (replace Material Symbols font)
### Post-Installation Configuration
- `blue_diode_laser_medical_device_for_urology_clean_white_background_professional.png`
- `ultrasonic_surgery_system_medical_equipment_professional_studio_photography.png`
- `professional_high_end_medical_holmium_laser_machine_in_a_modern_clean_operating.png`
- `modern_medical_corporate_office_interior_with_professional_healthcare_team.png`
## Version Verification
| Package | Researched Version | Source | Confidence |
|---------|-------------------|--------|------------|
| Next.js | 16.2.6 | npm registry (live) | HIGH |
| React | 19.2.6 | npm registry (live) | HIGH |
| Tailwind CSS | 4.3.0 | npm registry (live) | HIGH |
| @tailwindcss/postcss | 4.3.0 | npm registry (live) | HIGH |
| TypeScript | 6.0.3 | npm registry (live) | HIGH |
| next-themes | 0.4.6 | npm registry (live) | HIGH |
| Lucide React | 1.16.0 | npm registry (live) | HIGH |
| ESLint | 10.4.0 | npm registry (live) | HIGH |
| Astro (alt) | 6.3.3 | npm registry (live) | HIGH |
## Sources
- Next.js static export docs: https://nextjs.org/docs/app/guides/static-exports (via Context7)
- Next.js Tailwind CSS integration docs: https://nextjs.org/docs/app/getting-started/css (via Context7)
- Tailwind CSS v4 installation and @theme directive: https://tailwindcss.com/docs (via Context7)
- Tailwind CSS v4 dark mode configuration: https://tailwindcss.com/docs/dark-mode (via Context7)
- Astro Vercel deployment: https://docs.astro.build/en/guides/deploy/vercel/ (via Context7)
- npm registry live version checks (2026-05-18)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
