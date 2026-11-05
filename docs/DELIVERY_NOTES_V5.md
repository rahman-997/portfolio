# Portfolio V5 — Delivery Notes

Date: 2026-10-29 (Europe/Istanbul)

## Scope

Incremental, local-only improvement over the supplied V4 archive. The site structure, identity, content, projects, navigation, and previous V4 changes are preserved. This archive contains source code, not a prebuilt `out/` export.

## Changes

1. **CI reliability:** the primary GitHub Actions quality job now runs `npm run test:ui` after dependency installation and before lint/typecheck/build. Previously, 15 local Node regression tests were not included in this primary quality gate, so a regression could slip through CI.
2. **Project-visual clarity and accessibility:** case-study covers now have a semantic and visibly rendered `<figcaption>` that distinguishes conceptual illustrations from actual screenshots. Replaced the CSS pseudo-element-only disclosure to make it selectable and available to assistive technology. Homepage captions remain unchanged.
3. **Search metadata freshness:** updated the centralized `PORTFOLIO_UPDATED_AT` constant to reflect this content update. The sitemap and case-study/article metadata continue to share one timestamp.
4. **Regression tests:** introduced `tests/v5-quality.test.mjs` with three tests, first verified failing against V4, then verified passing against V5. The complete suite contains 18 passing tests.

## What was actually checked locally

- `npm run test:ui`: **18/18 passed**.
- TypeScript/TSX parser: **15 source and declaration files, 0 syntax errors** (globally installed TypeScript 5.8.3 parser; **not** semantic `tsc` validation).
- CSS: **6 stylesheets, 0 top-level parser errors**.
- GitHub Actions: **5 YAML workflows parsed**. Workflow was **not run on GitHub**.
- Image integrity: **8 raster/SVG assets parsed successfully**.
- Python browser QA: syntax compiled successfully.
- `node scripts/verify-toolchain.mjs`: passed its checked-in version consistency checks.
- `node --check scripts/verify-export.mjs` and `node --check scripts/verify-production.mjs`: passed.
- DNS lookup of npm registry: `Could not resolve host: registry.npmjs.org` in this environment. The older `node_modules` directory is incomplete and Next.js is not installed. No actual Next.js build, ESLint run, full TypeScript semantic check, static-export verifier, or browser end-to-end run could be completed here.
- `npm run verify:export` could not pass because there is no `out/` directory; this is expected before a successful production build and **not** counted as a passing check.

## To verify before deployment (network-enabled environment)

```bash
npm ci
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
```

For browser-based inspection, run the existing `Atlas Browser QA` workflow or serve the built `out/` directory and check all routes, keyboard focus, responsive views, console errors, and external links. The CI workflow change has not yet been exercised by GitHub Actions.

**No repository changes, publishing, live-deployment changes, or costs were initiated by this delivery.**

## Files changed from V4

- Modified `.github/workflows/ci.yml`
- Modified `app/work/[slug]/page.tsx`
- Modified `app/work/[slug]/case-study.module.css`
- Modified `app/portfolio-data.ts`
- Modified `README.md`, `DELIVERY_NOTES.md`
- Added `docs/DELIVERY_NOTES_V4.md`, `tests/v5-quality.test.mjs`

The previous V3 and V2 delivery notes remain in `docs/`.
