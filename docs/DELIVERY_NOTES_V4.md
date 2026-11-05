# Portfolio V4 — Delivery Notes

Date: 2026-10-29

## Scope

This is an incremental update to the supplied **Portfolio V3** source archive, not a replacement portfolio. The V2 and V3 implementation, copy, routes, theme, and original project links have been preserved.

## Functional improvements

1. **AI Atlas keyboard safety:** modified arrow keys (Alt, Ctrl, Meta, Shift) are no longer intercepted, so browser and assistive-technology shortcuts remain available. The focused map node still accepts unmodified Arrow keys, Home and End.
2. **AI Atlas flow consistency:** entering `System flow` now automatically selects its first visible stage if the previously selected discipline is absent. The inspector Previous/Next buttons traverse only the five visible flow stages in flow mode; other modes traverse all eight disciplines.
3. **Case study discovery:** every project case study now exposes semantic Previous / Next links, looping through Eventify, BookHaven, FitFlow and Venues API. The linked cards have responsive layouts and keyboard focus support.
4. **Automated QA:** added deterministic regression tests for the above logic and expanded the browser QA workflow triggers to include the new navigation helper and case-study code. Browser acceptance checks cover the flow mode's selection and case-study navigation when CI runs with dependencies.
5. **TypeScript integration:** `.d.mts` type declarations were added for the dependency-free JS navigation helpers so TypeScript source can import them with explicit contracts.

## Local verification performed

- `npm run test:ui`: **15/15 passed** (12 inherited tests + 3 new tests).
- Node syntax checks: navigation modules passed.
- TypeScript TS/TSX source parsing: **13 files, 0 parse errors** using the globally installed TypeScript parser. (This does NOT replace `tsc --noEmit`.)
- CSS parsing: **6 stylesheets, 0 top-level parse errors**.
- Python browser QA script: `py_compile` passed.
- `node scripts/verify-toolchain.mjs`: passed.
- npm registry connectivity: `npm ping` failed with `EAI_AGAIN`. Node packages required by Next.js are not installed in this archive/container; the remnants of an older `node_modules` directory contained no actual Next.js implementation.
- Actual `next build`, ESLint, TypeScript semantic checking, `verify:export`, and React/Next.js browser E2E were **not verified** in this environment.
- Chromium launch succeeded, but navigation to both `data:` and `127.0.0.1` pages was blocked by the environment (`ERR_BLOCKED_BY_ADMINISTRATOR`), so visual browser QA cannot be claimed as passed here.

## Remaining quality gate on a connected development machine / CI

```bash
npm ci
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
```

The existing GitHub Actions workflow runs the production checks. The Atlas browser QA workflow additionally uses a running static export. Nothing has been deployed or pushed to GitHub by this delivery.

## File summary

- Updated: `app/ai-atlas.tsx`, `app/atlas-navigation.mjs`, `app/work/[slug]/page.tsx`, `app/work/[slug]/case-study.module.css`, `.github/workflows/atlas-browser-qa.yml`, `scripts/atlas-browser-qa.py`, `tests/v3-interactions.test.mjs`, `README.md`.
- Added: `app/atlas-navigation.d.mts`, `app/project-navigation.mjs`, `app/project-navigation.d.mts`, `tests/v4-navigation.test.mjs`.
- Previous delivery notes: `docs/DELIVERY_NOTES_V3.md` and `docs/DELIVERY_NOTES_V2.md`.
