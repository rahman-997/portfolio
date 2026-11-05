# Portfolio redesign V3 — delivery and verification report

**Date:** 29 October 2026  
**Source:** Continuation of portfolio-redesigned-v2.zip. Previous changes are retained; see `docs/DELIVERY_NOTES_V2.md` for the V2 record.  
**Publication:** No remote repository or public website was modified.

## Implemented in V3

1. **Project-cover performance and semantics** (`app/page.tsx`, `app/home.module.css`): Replaced eager CSS `background-image` project covers with semantic `next/image` elements, lazy loading, responsive `sizes`, meaningful alt text, and a visible caption stating that the artwork is conceptual rather than a live screenshot. The browser chrome styling and original cover assets are retained.
2. **AI Atlas keyboard accessibility** (`app/ai-atlas.tsx`, `app/atlas-navigation.mjs`): Used a single roving `tabIndex` so the atlas map occupies one Tab stop. Arrow keys and Home/End deterministically move both focus and selection, including wrapping at the ends. Non-navigation keys remain under normal browser control. The keyboard index calculation is tested as real executable logic, independent of React.
3. **Reduced-motion behavior** (`app/ai-atlas.tsx`): Dynamically respects changes to the user's operating-system reduced-motion preference by not rendering the SVG moving particle when that preference is active. The existing CSS fallback stays in place.
4. **Mobile menu accessible name** (`app/mobile-nav.tsx`): Changed the disclosure label from the permanently inaccurate “Open navigation” to the neutral “Navigation menu” while preserving native expanded/collapsed state, Escape handling and outside-click dismissal.
5. **Browser QA continuity** (`.github/workflows/atlas-browser-qa.yml`): Added the new keyboard helper to the browser-test workflow's changed-file trigger.
6. **Test coverage** (`tests/v3-interactions.test.mjs`, `tests/design.test.mjs`): Added four new regression tests covering actual keyboard calculations, atlas accessibility/reduced motion, cover image semantics/performance and CI coverage. Refreshed the mobile-menu name assertion.

## Verified in the current environment

| Verification | Result |
| --- | --- |
| `npm run test:ui` | **12 passed, 0 failed** |
| `node scripts/verify-toolchain.mjs` | **Passed** (configuration consistency, not actual installed npm version) |
| TypeScript syntax parsing | **14 `.ts`/`.tsx` files, 0 parse errors** |
| CSS parsing | **6 stylesheets, 0 top-level parse errors** |
| Project JPEGs | **Both load and verify with Pillow, 1200 × 630 px** |
| Public SVG assets | **2 XML-parsed files, valid** |
| `node --check app/atlas-navigation.mjs` | **Passed** |

### Unverified gates and environment restrictions

The source package did **not** complete the real Next.js production build or browser acceptance suite in this environment. `node_modules/next` is an empty placeholder directory and `npm run build` stops at `sh: next: not found`. `npm ping` failed with DNS error `EAI_AGAIN registry.npmjs.org`, so `npm ci` could not remedy the missing dependencies. A headless Chromium attempt timed out. Therefore these remain **pending**: TypeScript semantic typechecking, ESLint, `next build`, exported-site verification, visual runtime layout tests, axe accessibility testing, and npm dependency audit. Source parsing and source-level tests are **not substitutes** for those checks.

The environment reports Node 22.16.0 and npm 10.9.2, while this project explicitly pins Node 22.13.0 and npm 11.19.1 for CI. Use those pinned versions with network access before making a deployment decision.

## Complete the production gate

```bash
# On a machine with npm registry access, and Node 22.13.0 + npm 11.19.1:
npm ci
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit

# Run the exported site locally, then browser QA (in a separate terminal):
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
python3 scripts/atlas-browser-qa.py
```

The optional browser QA script needs Python Playwright, an installed Chrome browser and a locally installed `axe-core` auditing script (see `.github/workflows/atlas-browser-qa.yml` for the exact CI setup). Do not claim production readiness or deploy solely on the 12 dependency-free local tests.
