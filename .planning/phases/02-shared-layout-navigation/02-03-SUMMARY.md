---
phase: "02"
plan: 3
subsystem: shared-layout-navigation
tags: [testing, navigation, accessibility, vitest, jsdom]
dependency:
  requires: [02-01, 02-02]
  provides: [navigation-tests, accessibility-tests, cross-page-verification]
  affects: [test-suite]
tech-stack:
  added: [jsdom, vitest-jsdom-environment]
  patterns: [event-listener-cleanup, per-file-environment-directive, describe-each]
key-files:
  created:
    - tests/navigation.test.js
    - tests/accessibility.test.js
  modified:
    - package.json
    - package-lock.json
decisions:
  - Stripped DOMContentLoaded wrapper from nav.js via regex for direct eval in tests
  - Tracked and cleaned up document-level event listeners between tests to prevent accumulation
  - Used `// @vitest-environment jsdom` per-file directive instead of changing global vitest config
  - Excluded src/partials/ from accessibility test file scan (partials are not full HTML pages)
  - Normalized whitespace in cross-page consistency comparisons to handle indentation differences
metrics:
  duration: ~10min
  completed: "2026-05-18"
---

# Phase 02 Plan 03: Navigation & Accessibility Tests Summary

**One-liner:** 91 automated test cases (18 navigation + 73 accessibility) verifying hamburger toggle, scroll lock, active state, semantic HTML, ARIA attributes, and cross-page consistency across all 7 pages.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Navigation behavior tests (hamburger, scroll lock, active state) | `d3fdee5` | `tests/navigation.test.js` |
| 2 | Accessibility tests (semantic HTML, ARIA, cross-page consistency) | `29c0fdc` | `tests/accessibility.test.js` |

## What Was Built

### Navigation Tests (`tests/navigation.test.js`) — 18 test cases
- **Hamburger Toggle (6 tests):** `.open` class toggle, `aria-expanded` true/false, `menuIcon` text swap ("menu" ↔ "close"), double-click toggle
- **Scroll Lock (2 tests):** `body.style.overflow = 'hidden'` on open, reset to `''` on close
- **Escape Key (3 tests):** closes menu, focuses hamburger (via spy), resets aria-expanded and menuIcon
- **Click Outside (2 tests):** closes menu when clicking outside element, keeps open when clicking inside menu
- **Active State Detection (5 tests):** `/about` activates "Tentang Kami", `/products/*` activates "Produk", `/` activates "Beranda", non-active path stays inactive

**Key implementation detail:** nav.js wraps logic in `DOMContentLoaded`. Tests strip the wrapper via regex and eval the inner code directly, then dispatch a synthetic `DOMContentLoaded` event. Document-level event listeners are tracked and cleaned up between tests to prevent accumulation.

### Accessibility Tests (`tests/accessibility.test.js`) — 73 test cases
- **Per-page checks (10 tests × 7 pages = 70 tests):** `<header>`, `<nav>`, `<main id="main-content">`, `<footer>`, skip link, `<html lang="id">`, hamburger `aria-label`, `aria-expanded`, `aria-controls`, `id="mobile-menu"`
- **Cross-page consistency (3 tests):** identical header markup, identical footer markup (whitespace-normalized), skip link as first body element

**Key implementation detail:** File scanner excludes `src/partials/` directory since `header.html` and `footer.html` are partial fragments, not full HTML pages. Cross-page comparisons normalize whitespace to handle indentation differences between partial source and injected page markup.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed jsdom dependency**
- **Found during:** Task 1 setup
- **Issue:** `jsdom` not installed — required for `@vitest-environment jsdom` navigation tests
- **Fix:** `npm install --save-dev jsdom`
- **Files modified:** `package.json`, `package-lock.json`
- **Commit:** `048f964`

**2. [Rule 1 - Bug] Event listener accumulation between tests**
- **Found during:** Task 1 test execution (12 of 18 tests failing)
- **Issue:** `eval(nav.js)` adds event listeners to `document` each time; listeners persist across tests causing interference (click-outside handler closing hamburger toggle)
- **Fix:** Wrapped `document.addEventListener`/`removeEventListener` to track registered listeners; `afterEach` cleanup removes all listeners between tests
- **Files modified:** `tests/navigation.test.js`

**3. [Rule 1 - Bug] DOMContentLoaded wrapper prevents nav.js execution in tests**
- **Found during:** Task 1 test execution
- **Issue:** nav.js code wrapped in `document.addEventListener('DOMContentLoaded', ...)` — event already fired by time eval runs
- **Fix:** Strip wrapper via regex, eval inner code, dispatch synthetic `DOMContentLoaded` event
- **Files modified:** `tests/navigation.test.js`

**4. [Rule 1 - Bug] Partials directory included in accessibility test file scan**
- **Found during:** Task 2 test execution (15 of 93 tests failing)
- **Issue:** `header.html` and `footer.html` in `src/partials/` are partial fragments without `<html>`, `<body>`, `<main>`, `<footer>` elements
- **Fix:** Excluded `partials` directory from file scanner
- **Files modified:** `tests/accessibility.test.js`

## Test Results

```
Test Files  6 passed (6)
     Tests  121 passed (121)
```

| Test File | Tests | Status |
|-----------|-------|--------|
| `tests/navigation.test.js` | 18 | PASS |
| `tests/accessibility.test.js` | 73 | PASS |
| `tests/setup.test.js` | 3 | PASS |
| `tests/tokens.test.js` | 16 | PASS |
| `tests/build-output.test.js` | 3 | PASS |
| `tests/image-optimization.test.js` | 8 | PASS |

## Build Verification

- `npm run build` succeeded — 7 HTML files produced
- All pages: 8.90–17.87 kB
- nav.js bundled: 2.04 kB (0.79 kB gzipped)
- CSS bundled: 38.53 kB (7.18 kB gzipped)

## Known Stubs

None — tests verify actual implementation, no stubs created.

## Threat Flags

None new. Tests only read project source files within the repository (T-02-06, accepted).

## Key Decisions

1. **Per-file jsdom environment:** Used `// @vitest-environment jsdom` directive in navigation.test.js instead of changing global vitest config to `jsdom`. This keeps existing node-environment tests (setup, tokens) working without modification.
2. **Event listener tracking:** Overrode `document.addEventListener` at module level to track all registered listeners, with `afterEach` cleanup. This is more reliable than trying to re-create a fresh jsdom context per test.
3. **Whitespace normalization for cross-page comparison:** Header/footer markup injected into pages has different indentation than the partial source files. Normalized whitespace (`\s+` → single space) before comparison to focus on semantic equality, not formatting.

## Self-Check: PASSED

- `tests/navigation.test.js` — EXISTS (282 lines, 18 tests)
- `tests/accessibility.test.js` — EXISTS (114 lines, 73 tests)
- `jsdom` installed in `package.json` — VERIFIED
- All 121 tests pass — VERIFIED
- Build produces 7 HTML files — VERIFIED
- Commits `d3fdee5`, `048f964`, `29c0fdc` — PRESENT
