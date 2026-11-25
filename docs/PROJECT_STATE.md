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
