# Portfolio release security and real browser QA — 2026-11-19

The dependency remediation workflow successfully resolved and committed real npm metadata:
- Next.js / eslint-config-next / @next/eslint-plugin-next `16.4.6`; lockfile has 446 entries.
- Branch update commit `ea757d5d12bfdd8f96ba3217cb6a5186c4319edc`.
- [Free public Actions workflow 44519950601](https://github.com/rahman-997/portfolio/actions/runs/44519950601) verified `npm ci`, lint, typecheck, 18/18 Node tests, production Next build, 66 localized overview pages, static site export, and **0 npm audit findings (moderate and up)**.
- Initial [CI 44519950482](https://github.com/rahman-997/portfolio/actions/runs/44519950482) ran on the pre-update branch SHA and failed; it is not evidence against the repaired lockfile.

## New branch-only verification
- To close remaining P0 gates, security.yml and atlas-browser-qa.yml now temporarily accept *push events on the isolated review branch* `fix/portfolio-next-16-4-6-20261119`.
- Both use existing pinned actions/standard `ubuntu-latest`; user has $0 cost requirement, and GitHub documents that standard hosted runners are free for public repositories.
- Security runs CodeQL and Semgrep. Browser QA serves a local static candidate under localhost, checks 3 languages, keyboard, 320px Turkish theme/search, 200% reflow, clipboard, privacy and WCAG.
- Neither workflow triggers production deploy on the feature branch. Existing Netlify production deploy and Render auto-deploy are restricted to main; this workflow changes no settings, secrets or main code.
- The dependency preview's automatic push trigger was retired; it remains as an explicit dispatch option restricted by an exact branch+repository guard.
- No release until scanner/browser results and exact final sha evidence are reviewed.

## Release constraints
This remains Draft / NO-GO until full independent CodeQL/Semgrep and Playwright results are reviewed and the user separately approves deployment.
