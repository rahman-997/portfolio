# Portfolio redesign v2 — delivery notes

**Date:** 29 October 2026  
**Scope:** Continuation of the supplied portfolio redesign; no publication or external repository changes.

## Corrections made

1. **Next.js static export image support.** `next.config.ts` now uses `images.unoptimized: true`, compatible with the static `output: "export"` architecture and use of `next/image` in case studies.
2. **Theme drift in validation.** Both `scripts/verify-export.mjs` and `scripts/verify-production.mjs` now read the same `app/brand.json` palette consumed by the site manifest through `app/portfolio-data.ts`. This removes the obsolete `#07100f` expectation.
3. **Broken cover files.** The two original JPEGs contained structurally invalid JPEG data (`SOS before SOF`) and were not decodable. They have been replaced with valid 1200 × 630 pixel, explicitly conceptual interface illustrations. Illustrative layouts and numbers are **not live screenshots, production metrics, or product activity records**.
4. **Keyboard accessibility.** Added skip-navigation links and focus targets to the résumé and case-study routes.
5. **404 consistency.** Aligned the 404 palette and card styling with the new editorial site identity.
6. **Regression coverage.** Added dependency-free automated checks for image compatibility, shared palette, accessibility and JPEG structure.

## Verified locally

- `npm run test:ui`: **8 passed, 0 failed**.
- `node scripts/verify-toolchain.mjs`: **passed** (configuration contract).
- Node JavaScript syntax checks on modified verification scripts: **passed**.
- TypeScript/TSX syntax parsing: **13 files parsed, 0 syntax errors**.
- CSS stylesheet syntax parsing: **6 stylesheets, 0 top-level parse errors**.
- PNG/JPEG opening and SVG XML parsing: **passed** for inspected project covers and SVG assets.

## Verification limits

A real Next.js production build, runtime test, full ESLint and TypeScript semantic typecheck, exported-site verification, and npm vulnerability audit **could not be completed** in this environment. Dependencies were not downloaded successfully: the npm registry DNS was unreachable; the local `node_modules` directories are empty placeholders. Chromium browser navigation was also blocked by managed browser policy, so browser-based screenshots were not used to claim end-to-end verification. The layout preview from the previous iteration is a **static CSS mockup**, not a Next.js runtime screenshot.

## How to complete the gate with network access

Use Node 22.13.0 and npm 11.19.1 as pinned by the project, then run:

```sh
npm ci
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
```

After a successful build, run the existing `scripts/atlas-browser-qa.py` against a locally served `out/` folder and review its screenshots. Do not deploy before these checks pass.
