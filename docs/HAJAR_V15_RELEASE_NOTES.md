# HAJAR Personal Portfolio V15 | Release notes

## Changes
- Replaced legacy **AH** in the interactive Systems Atlas with the approved, no-initials HAJAR two-fold brand mark.
- Updated the atlas label and corrected the matching static-export identity check.
- Replaced visibly outdated violet/blue callout and project UI accents with charcoal, sage, ivory and champagne treatments across homepage and case studies.
- Updated the CSS selection accent and editorial case-study header colors.
- Updated published-content modified date to 2026-10-30 to reflect this revision.
- Added three targeted regression tests for the brand, color, and metadata, and updated the previous date-specific test.

## Verification from this workspace
- 85/85 source-level Node tests passed (`npm run test:ui` equivalent: `node --test tests/*.test.mjs`).
- 22 TS/TSX files parsed with TypeScript transpiler, 7 CSS files parsed with PostCSS. These are syntax checks, not semantic typechecking.
- Attempted to access npm registry; DNS lookup failed with EAI_AGAIN. No full Next.js build or integrated app browser QA completed.
- HTML preview is a **standalone styling preview**, not the compiled application. Chromium did not produce a screenshot for this preview in this environment, so visual/browser QA has not been re-certified for V15.

## Run on a machine with Node 22 and network access
```bash
cd portfolio-main
npm ci
npm run check:release
npm run dev
```
Test main, résumé, four case studies, AI Atlas (network, portrait and system flow), command search, and 320/390/768/1440px layouts. After a clean build, inspect `out/` and test it on a static host.

## Boundaries
- This is the **personal HAJAR portfolio**, separate from the commercial FolioGrid template.
- The social schedule and unpublished Instagram designs are **not included in the public Next.js project**.
- The original PDF résumé has been carried over unchanged; its visual content has not been revalidated in this revision.
- No GitHub, hosting, Instagram, or live site changes were made.
