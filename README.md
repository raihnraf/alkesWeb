# APBA Group — Corporate Website

A multi-page corporate website for **PT Abadi Perkasa Bersama Alkesindo (APBA Group)**, a medical equipment distributor specializing in urology. The site showcases products (lasers, ultrasonic systems, consumables), services (rental, laundry), and company subsidiaries.

**Live Demo:** [Deployed on Vercel](https://your-vercel-url.vercel.app)

## Features

- **Multi-page architecture** — Home, 4 product detail pages, About Us, and Contact
- **Responsive design** — Mobile-first, works across all screen sizes
- **Dark mode** — Toggle between light and dark themes
- **Smooth animations** — Page fade-in transitions and smooth scroll navigation
- **SEO optimized** — Per-page meta tags, Open Graph, and structured data
- **Accessibility** — ARIA attributes, keyboard navigation, `prefers-reduced-motion` support
- **Contact form** — Client-side validation with WhatsApp integration
- **Image optimization** — Automatic WebP conversion via Vite plugin

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Vitest](https://vitest.dev/) | Testing framework |
| [sharp](https://sharp.pixelplumbing.com/) | Image optimization |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the home page.

### Build

```bash
npm run build
```

Output is written to `dist/` and ready for static hosting.

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test        # Watch mode
npm run test:run # Single run
```

## Project Structure

```
alkesweb/
├── index.html                             # Landing page (Home)
├── about.html                             # Company info, history, certifications
├── contact.html                           # Inquiry form + company details
├── products/
│   ├── blue-diode-laser.html              # Product detail page
│   ├── ultrasonic-surgery.html            # Product detail page
│   ├── holmium-laser.html                 # Product detail page
│   └── consumables.html                   # Product detail page
├── src/
│   ├── css/
│   │   └── main.css                       # Global styles, Tailwind v4 theme
│   ├── js/
│   │   ├── nav.js                         # Navigation, mobile menu, scroll effects
│   │   └── home.js                        # Home page animations, counters
│   └── partials/                          # Reusable HTML snippets
├── public/
│   └── images/                            # Local product images (PNG + auto-generated WebP)
├── tests/                                 # Vitest test files
├── vite.config.js                         # Vite configuration
├── vercel.json                            # Vercel deployment config
└── package.json
```

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, product bento grid, why-us, subsidiaries |
| Blue Diode Laser | `/blue-diode-laser` | Product specs, features, related products |
| Ultrasonic Surgery | `/ultrasonic-surgery` | Product specs, features, related products |
| Laser Holmium | `/holmium-laser` | Product specs, features, related products |
| Consumables | `/consumables` | Product catalog, related products |
| About Us | `/about` | Company history, team, certifications, stats |
| Contact | `/contact` | Inquiry form, company info, WhatsApp CTA |

## Deployment

### Vercel (Recommended)

1. Push this repository to GitHub
2. Connect the repo in [Vercel](https://vercel.com)
3. Deploy — zero config needed

Or via CLI:

```bash
npx vercel
```

### Static Hosting

The `dist/` folder from `npm run build` can be served by any static host (Netlify, GitHub Pages, nginx, etc.).

## Design System

Based on a Material Design 3-inspired color system:

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#003366` | Deep blue — headers, primary actions |
| Accent | `#00A3AD` | Medical teal — highlights, CTAs |
| Secondary Fixed | `#88C1D1` | Light teal — secondary elements |

Typography: **Plus Jakarta Sans** (headlines) + **Inter** (body).

See `DESIGN.MD` for the full design reference and component patterns.

## License

ISC
