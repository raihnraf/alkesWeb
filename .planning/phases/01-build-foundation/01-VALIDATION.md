---
phase: 1
slug: build-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-18
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (to be installed in Wave 0) |
| **Config file** | vitest.config.ts (to be created) |
| **Quick run command** | `npm run test -- --run` |
| **Full suite command** | `npm run test -- --run --reporter=verbose` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test -- --run`
- **After every plan wave:** Run `npm run test -- --run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | BLD-01 | — | N/A (build setup) | build | `npm run build` | ✅ / ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | BLD-02 | — | Tokens render correctly | visual | `vite build && check dist` | ✅ / ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | BLD-03 | — | Routes return 200 | integration | `npm run build && test` | ✅ / ❌ W0 | ⬜ pending |
| 01-01-04 | 01 | 1 | BLD-04 | — | vercel.json exists | config | `test -f vercel.json` | ✅ / ❌ W0 | ⬜ pending |
| 01-01-05 | 01 | 1 | BLD-08 | — | Images optimized | build | `npm run build && test images` | ✅ / ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/setup.test.ts` — build smoke tests (7 HTML entry points exist)
- [ ] `tests/images.test.ts` — image optimization tests (WebP with fallbacks, dimensions)
- [ ] `tests/tokens.test.ts` — design token tests (deep-blue, medical-teal, typography)
- [ ] `tests/routes.test.ts` — Vercel deployment route tests (clean URLs)
- [ ] `vitest.config.ts` — Vitest configuration
- [ ] `package.json` — test scripts: `test`, `test:ui`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual design token rendering | BLD-02 | Design requires human verification | Open `dist/index.html` in browser, verify deep-blue (#003366) and medical-teal (#00A3AD) render correctly |
| Vercel deployment | BLD-04 | External deployment requires manual verification | Push to git, verify Vercel builds successfully, test all 7 routes |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
