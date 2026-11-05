# Portfolio V11 | Delivery notes

## What changed

V11 builds on V10 without deleting earlier sections, case studies, or the AI Atlas interaction.

1. **Comparison Desk (`/#compare`)**: interactive side-by-side comparison of any two of the four documented projects. It uses the case-study problem, approach, review points, and stack from `PROJECT_LIST`. Both selectors prevent duplicate selections. Includes case-study and source links. It does **not** claim comparative performance or client outcomes.
2. **Stack Connections (`/#stack-lens`)**: a selectable index automatically derived from the technology arrays in the actual portfolio case-study records. Each selection displays the connected projects with links. The displayed counts are the number of indexed case studies, not a measure of professional experience.
3. **Interface Lab (`/#interface-lab`)**: isolated UI component study with light/dark options, compact/comfortable density, and an expandable note. This is deliberately labeled as a *concept demo*, not a screenshot or a deployed application. All state stays in the current page and is not stored or transmitted.

All three sections have visible headings, responsive rules, direct anchors in desktop `More` and mobile navigation, accessible controls, and reduced-motion-aware styling.

## Technical changes

- Client React components: `app/project-compare.tsx`, `app/stack-lens.tsx`, `app/interface-lab.tsx`.
- Tested pure helpers: `app/portfolio-lenses.mjs` and typed declaration `app/portfolio-lenses.d.mts`.
- Shared `app/home.module.css` receives the new design system components and responsive breakpoints.
- The browser QA script includes new end-to-end assertions and screenshots for these three sections, and its GitHub Actions path filter now tracks the new files.
- `docs/preview-v11.html` is a standalone **offline design preview**, generated from the actual project's case-study content. It does not simulate or prove Next.js production readiness.

## Verification done locally

- `npm run test:ui`: **60 tests passing (60/60)**, including **7 added in V11**, validated after implementation.
- TypeScript/TSX/definitions: **24 source files parsed, zero syntax diagnostics**. This is *syntax parsing*, not full semantic type-checking.
- CSS: **6 stylesheets parsed** with PostCSS, no parser errors.
- YAML: **5 GitHub Actions workflow files** parsed.
- Python browser test script compiled successfully.
- JPEG covers decoded successfully.
- Production build: **not verified**. `npm ci --offline` failed because `zod-validation-error-4.0.2.tgz` is not cached (`ENOTCACHED`). The Next.js dependencies were not present locally.
- Browser E2E: **not executed against Next.js**. Headless Chromium could not complete a screenshot of the offline preview within the local environment. The browser QA additions have been authored, not falsely marked as run.

## Before publication

On a connected Node 22 machine or in GitHub Actions:

```bash
npm ci
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run verify:links
```

Run the existing `Atlas Browser QA` GitHub workflow against the generated static export. Verify 320px, 390px, 820px, and 1440px layouts, navigation, and all three new interactions. Review both browser-console errors and accessibility before deploying.

No repository, live website, or external service was changed during this local work.
