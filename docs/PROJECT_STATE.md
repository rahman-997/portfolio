# Project state: Portfolio

Updated: 2026-11-26 (Europe/Istanbul). Written by the autonomous engineering worker.

- Work branch: `main` (Render static site auto-deploys from main).
- Last merged this cycle: PR #66 (a47b36f), post-merge Portfolio CI #1157 and Security scanners #384 success.

## Open PRs
- #65 (Netlify fallback and release gates): CI 15/15, held for the Netlify target decision.
- #61: superseded. Main already uses the .webp Mizan asset.
- #37, #38, #45, #47, #50-#54: older design lineage that conflicts with main. Net comparison with main: #53's Next 16.4.6 lockfile intent is already on main; main's ProjectExplorer has no URL-query hydration code, so #50's fix has no target; main's free-claude-code entry is listed as a fork without an upstream link, so #51's upstream-link check has no target; #54 (100 files) adds resume PDF generation and professional-identity checks that are absent on main. Inferred from file comparison, not test runs.

## Next action
- Owner decides whether to keep any of the older lineage (resume PDF, identity checks). Otherwise close #37-#54 as superseded.

## Render deploy freshness (2026-11-26)
- Render static service for this site tracks main with Auto-Deploy "After CI Checks Pass". Main a47b36f (PR #66, merged Nov 25 18:41 UTC) had green Portfolio CI run 1157 but Render recorded no deploy for it; live stayed on 8c1cca8, so the scheduled Production smoke run 133 failed on the deploy marker.
- Why Render did not auto-trigger is not established. The Netlify Production Deploy failures (runs 12, 13) are a separate workflow and are not shown to gate Render.
- Action (existing service, CI green, no settings or cost change): manual "Deploy latest commit" at 12:49 +03, source a47b36f. Live data-deploy-commit now equals a47b36f2836c87c55dfc6b763e69d2280defa1ee. Production smoke run 133 re-run: success.
- PR #66 changed only CI and export-verification scripts and tests, so visible site content did not change.
- Follow-up (one time, not a watcher): after the next portfolio merge to main, check the Render deploys list and the live deploy marker.
- Netlify target (PR #65) stays an open owner question; Netlify Production Deploy run 13 is unchanged.

## Update 2026-11-26 18:30: PR #69 and #70 (merged, live)
- PR #69: PWA icons regenerated from public/favicon.svg (apple-touch-icon 180, icon-192, icon-512, icon-maskable-512). The old files were truncated PNGs. New `scripts/raster-assets.test.mjs` (CRC, IEND, inflate size) runs inside verify:export; it fails on the old icons and passes on the new. Render auto-deploy did not pick up the merge; manual "Deploy latest commit" gave "Deploy live for 49d7a31". Live icons decode (apple-touch-icon byte-identical to the repo; icon-512 recompressed at the edge).
- PR #70: Mizan cover replaced with a lossless WebP of a local build of mizan-finance main ed4e621 (label "MONTHLY OVERVIEW"; the old image said "SEPTEMBER PLAN"). Labeled as a local build capture, not the live Netlify demo. `scripts/verify-v5.mjs` digest pin and docs/MIZAN_VISUAL_CORRECTION.md updated. Main CI (45809503383, 45809502901) Success; manual deploy "Deploy live for 39d2ba5"; live /projects/mizan-live-dashboard.webp sha256 e204c18c1fe2a93db6b907d1a2bd7819466c08b5b4095cce2fcfbd6d9b225052 equals the repo pin.
- Live checks run: /ar/ is rtl and lang ar, /tr/ is lang tr, no broken images, no horizontal overflow; /work/fitflow and /work/mizan load; contact is a LinkedIn link plus brief TXT files (en/ar/tr, all 200), there is no contact form; 47/47 home links respond (3 cold Render demos slow but 200; LinkedIn returns 999 to bots). AR and TR pages link to the English case studies by design.
- Limits: not tested on a real phone; Lighthouse only as CI. The hosted Mizan demo (Netlify) is a stale older build and its owner account was not found, so the portfolio does not link it.
