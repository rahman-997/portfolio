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
