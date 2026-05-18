---
phase: 06-polish-launch
reviewed: 2026-05-19T00:00:00Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - src/about.html
  - src/contact.html
  - src/css/main.css
  - src/home.html
  - src/products/blue-diode-laser.html
  - src/products/consumables.html
  - src/products/holmium-laser.html
  - src/products/ultrasonic-surgery.html
findings:
  critical: 3
  warning: 3
  info: 4
  total: 10
status: issues_found
---

# Phase 06: Code Review Report

**Reviewed:** 2026-05-19T00:00:00Z
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

Phase 6 added page fade-in animations, smooth scroll behavior, `prefers-reduced-motion` overrides, SEO meta tags, `.page-enter` wiring, `aria-hidden="true"` on Material Symbols icons, and alt text verification across all 7 pages. The CSS additions (`main.css`) are well-structured with proper reduced-motion support. However, three critical issues were found: (1) broken image paths on all 4 product pages, (2) Tailwind utility classes placed as bare HTML attributes instead of inside `class=""`, and (3) malformed `aria-hidden` attributes on the floating WhatsApp button across all pages.

## Critical Issues

### CR-01: Product page image paths use `/public/images/` instead of `/images/`

**File:** `src/products/blue-diode-laser.html:76-78`, `src/products/holmium-laser.html:76-78`, `src/products/ultrasonic-surgery.html:76-78`, `src/products/consumables.html:76-78`

**Issue:** All 4 product pages reference images with the path prefix `/public/images/...`. In Vite, the `public/` directory is served at the root `/`, so the correct path is `/images/...`. The path `/public/images/...` will resolve to a non-existent `public/public/images/...` URL, causing all product page hero images, spec table images, and related product images to 404.

Meanwhile, `home.html` and `about.html` correctly use `/images/...`. This inconsistency means the home and about pages display images correctly while all product pages show broken images.

**Fix:** Replace all `/public/images/` with `/images/` in product pages. For example in `blue-diode-laser.html`:
```html
<!-- Before (broken) -->
<source srcset="/public/images/blue_diode_laser_...webp" type="image/webp">
<img src="/public/images/blue_diode_laser_....png" ...>

<!-- After (correct) -->
<source srcset="/images/blue_diode_laser_...webp" type="image/webp">
<img src="/images/blue_diode_laser_....png" ...>
```

This affects approximately 20 `<img>` and `<source>` tags across the 4 product pages (hero images + related product sections).

### CR-02: Tailwind utility classes used as bare HTML attributes, not in `class` attribute

**File:** `src/about.html:114`, `src/about.html:120`, `src/about.html:126`, `src/about.html:132`, `src/about.html:138`, `src/about.html:154`, `src/about.html:163`, `src/about.html:169`, `src/about.html:187`, `src/about.html:196`, `src/about.html:205`, `src/about.html:230`, `src/about.html:240`, `src/about.html:244`, `src/about.html:248`, `src/about.html:252`, `src/about.html:256`, `src/about.html:288` (and same pattern in all other HTML files)

**Issue:** Throughout all HTML files, Tailwind utility classes like `text-medical-teal`, `text-[36px]`, `text-white`, `mb-3`, `text-[20px]`, `text-secondary-fixed`, `text-[48px]`, `text-[32px]`, `text-[16px]`, `text-surface-variant/60`, `flex-shrink-0`, etc. are placed as bare HTML attributes on `<span>` elements instead of inside the `class=""` attribute.

Example from `about.html:114`:
```html
<!-- Broken: utilities are bare attributes, not in class -->
<span class="material-symbols-outlined" aria-hidden="true" text-medical-teal text-[36px] mb-3">local_hospital</span>
```

These bare attributes are invalid HTML and will be ignored by the browser. The icons will render at their default size (24px) and default color (inherited from parent), not the intended teal color and 36px size. This affects icon coloring, sizing, and spacing across every page.

**Fix:** Move all utility classes into the `class` attribute:
```html
<!-- After: all utilities properly in class attribute -->
<span class="material-symbols-outlined text-medical-teal text-[36px] mb-3" aria-hidden="true">local_hospital</span>
```

This pattern appears ~100+ times across all 8 reviewed files. A systematic search-and-replace is needed: find all `<span class="material-symbols-outlined" aria-hidden="true" ...">` patterns and merge the bare attributes into the `class` value.

### CR-03: Malformed `aria-hidden` attribute on floating WhatsApp button

**File:** `src/about.html:298`, `src/contact.html:305`, `src/home.html:432`, `src/products/blue-diode-laser.html:422`, `src/products/consumables.html:388`, `src/products/holmium-laser.html:426`, `src/products/ultrasonic-surgery.html:422`

**Issue:** The floating WhatsApp button's Material Icons span has a malformed `aria-hidden` attribute with an extra closing quote:
```html
<span class="material-symbols-outlined" aria-hidden="true"">chat</span>
```
The `true""` (with extra `"`) is invalid HTML. While browsers may recover, this is malformed markup and could cause parsing inconsistencies.

**Fix:** Remove the extra quote:
```html
<span class="material-symbols-outlined" aria-hidden="true">chat</span>
```

## Warnings

### WR-01: Contact form validation only checks empty fields, not format

**File:** `src/contact.html:172-198`

**Issue:** The inline form validation script only checks `!field.value.trim()` for required fields. It does not validate:
- Email format (e.g., `user@domain.com`)
- Phone number format
- Minimum length for message field

A user could submit `email: "abc"` and it would pass validation and show the success toast.

**Fix:** Add format validation for email and phone fields:
```javascript
if (field.type === 'email' && field.value.trim()) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(field.value.trim())) {
    valid = false;
    field.classList.add('error');
    // show error message
  }
}
```

### WR-02: Contact form has no loading state or submission feedback beyond toast

**File:** `src/contact.html:190-197`

**Issue:** The form's submit handler immediately shows a success toast and resets the form. There is no loading indicator, no actual submission attempt (expected for a frontend demo), and no way for the user to know if the "submission" is simulated or real. For a production site, this would need actual form submission logic.

**Fix:** For a demo, add a brief delay and loading state to simulate realistic behavior:
```javascript
const btn = this.querySelector('button[type="submit"]');
btn.disabled = true;
btn.textContent = 'Mengirim...';
setTimeout(() => {
  // show toast, reset form, re-enable button
  btn.disabled = false;
}, 1000);
```

### WR-03: Product page hero images use `loading="eager"` for below-fold content

**File:** `src/products/blue-diode-laser.html:81`, `src/products/holmium-laser.html:81`, `src/products/ultrasonic-surgery.html:81`, `src/products/consumables.html:81`

**Issue:** The hero product images use `loading="eager"`, which forces immediate download. Since these are in the hero section (above the fold on most viewports), this is acceptable. However, the related product images in the "Produk Lainnya" section also use `loading="lazy"` which is correct. No action needed for hero images, but verify the `loading="eager"` is intentional for all hero images.

**Fix:** No fix needed — this is a verification note. The hero images are above-the-fold and `loading="eager"` is appropriate.

## Info

### IN-01: Footer HTML duplicated across all 7 pages

**File:** All reviewed HTML files (footer section ~lines 218-294 in about.html, similar in others)

**Issue:** The footer markup (~75 lines) is copy-pasted identically into every HTML file. A `src/partials/footer.html` file was listed in the phase scope but does not exist. This means any footer change (e.g., updating phone number, adding a link) must be made in 7 places.

**Fix:** Use a build-time partial inclusion mechanism. With Vite, consider using `vite-plugin-html` or a simple pre-build script to inject the footer partial into each page. Alternatively, keep the duplication but document it as a known limitation for the demo scope.

### IN-02: No `<meta name="robots">` tag on any page

**File:** All reviewed HTML files

**Issue:** None of the pages include a `<meta name="robots" content="index, follow">` tag. While search engines will index by default, explicitly declaring robots directives is a SEO best practice, especially for a site claiming to have comprehensive SEO meta tags.

**Fix:** Add `<meta name="robots" content="index, follow">` to the `<head>` of each page.

### IN-03: No favicon declared

**File:** All reviewed HTML files

**Issue:** No `<link rel="icon">` or `<link rel="shortcut icon">` is declared in any page's `<head>`. Browsers will request `/favicon.ico` by default, which will 404.

**Fix:** Add a favicon link:
```html
<link rel="icon" type="image/png" href="/images/favicon.png">
```

### IN-04: Breadcrumb chevron icon has bare `text-surface-variant/60` attribute

**File:** `src/products/blue-diode-laser.html:66`, `src/products/holmium-laser.html:66`, `src/products/ultrasonic-surgery.html:66`, `src/products/consumables.html:66`

**Issue:** The breadcrumb separator chevron has `text-surface-variant/60` as a bare attribute:
```html
<span class="material-symbols-outlined" aria-hidden="true" text-surface-variant/60 text-[16px]">chevron_right</span>
```
Same issue as CR-02 — the color and size classes are not applied.

**Fix:** Merge into `class` attribute:
```html
<span class="material-symbols-outlined text-surface-variant/60 text-[16px]" aria-hidden="true">chevron_right</span>
```

---

_Reviewed: 2026-05-19T00:00:00Z_
_Reviewer: the agent (gsd-code-reviewer)_
_Depth: standard_
