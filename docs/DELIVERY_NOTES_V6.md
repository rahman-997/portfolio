# Portfolio V6 — Delivery Notes

Date: 2026-10-29 (Europe/Istanbul)

## Scope

Incremental, local-only continuation of the supplied V5 source archive. No change to the portfolio's visible design, projects, identity, URLs or runtime behavior. The objective of V6 is to strengthen pre-deployment verification, rather than produce another visual redesign without a verified build.

## Confirmed issue in V5

The static export verifier inspected HTML `href` attributes but treated all relative URLs as valid without checking their targets. It also did not check whether in-page hash links (`#work`, `/#main`, `/resume/#content`) pointed to real elements. Local image/script/style paths referenced by rendered HTML were not inspected. Consequently a deployment could pass the old link check with broken section navigation or missing page assets.

## Implemented in V6

1. Added `scripts/check-static-links.mjs`: a dependency-free static-export audit. It checks local link and asset references (`href` on links, `src` on images/scripts and other media), relative and root-relative paths, query strings, same- and cross-page hash fragments, and rejects unsafe navigation URL protocols.
2. Integrated the audit into `scripts/verify-export.mjs`. A broken local target or fragment now blocks the existing export quality gate, and CI automatically gets this check because the quality job already calls `npm run verify:export` after `npm run build`.
3. Added the standalone `npm run verify:links` command, useful for checking an existing `out/` folder separately.
4. Added 7 regression tests in `tests/v6-static-links.test.mjs`. The initial targeted test run failed before the implementation, then passed once the link auditor was implemented.
5. Updated README quality and structure documentation. Preserved V5 delivery notes under `docs/DELIVERY_NOTES_V5.md`.

## Local checks actually completed

- `npm run test:ui`: **25/25 passing** after the changes.
- Node syntax parser (`node --check`) for project `.mjs` and `.js` scripts/tests: passed.
- TypeScript/TSX syntax parser: **15 files, 0 syntax errors**. This is not a semantic typecheck.
- CSS top-level parser: **6 files, 0 parse errors**.
- Raster images checked with Pillow: **6 files, valid decoders**.
- GitHub Actions workflow YAML: **5 files parsed** (not executed on GitHub).
- `node scripts/verify-toolchain.mjs`: passed.
- The new auditor was tested both as an imported function and a standalone command on temporary static HTML exports with deliberately good/broken references.
- DNS resolution for `registry.npmjs.org` is still unavailable in this environment, so dependencies could not be installed. Consequently **Next.js build, ESLint run, full TypeScript semantic check, generated `out/` verification, and actual browser E2E validation were not completed**. There is no production build bundled here.

## Full verification before deployment

On a machine with npm registry access, from `portfolio-main/`:

```bash
npm ci
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
```

`npm run verify:links` may also be used independently after `npm run build`.

The audit examines HTML `href`/`src` targets and HTML element IDs; it does not crawl arbitrary client-side JavaScript navigation, CSS `url(...)` references, or external URLs. Passing it is not a substitute for browser testing.

**No deployment, repository write, external paid service, or user data modification took place.**

## Files changed from V5

- Added `scripts/check-static-links.mjs`, `tests/v6-static-links.test.mjs`, `docs/DELIVERY_NOTES_V5.md`.
- Updated `scripts/verify-export.mjs`, `package.json`, `README.md`, `DELIVERY_NOTES.md`.
