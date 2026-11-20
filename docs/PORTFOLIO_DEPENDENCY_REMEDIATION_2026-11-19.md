# Portfolio dependency security remediation — 2026-11-19

## Scope
- Review branch `fix/portfolio-next-16-4-6-20261119` is stacked on unified Draft PR #52, **not** main.
- Public GitHub repository; only the standard `ubuntu-latest` runner is used, which GitHub documents as free for public repositories.
- A tightly branch-scoped preview workflow resolves exact published `next@16.4.6` and `eslint-config-next@16.4.6` with **npm@11.19.1** using `npm install --package-lock-only`, then verifies both the direct versions and the lockfile metadata.
- It runs `npm ci` before committing and pushes *only* `package.json` and `package-lock.json` to this exact isolated feature branch, without force push. It cannot target main.
- It then runs ESLint, TypeScript, Node contract tests, Next production build, static export verifier, and fail-closed `npm audit --audit-level=moderate`.
- The previous `next@16.4.3` is below the first security-patched 16.4.5; `16.4.6` is the currently published stable 16.4.x release. Previous 2026-11-18 audit output still listed a moderate finding. The formerly high `picomatch` GHSA-fc5q-39xc-vjpf was withdrawn on Nov 18 but this alone does not certify a clean audit.

## Safety and release bar
- The workflow does **not** read production secrets, deploy, create payments, change main or run on main.
- Zero additional cost: standard public `ubuntu-latest` only; minimal 3-day retention for the lockfile artifact.
- GitHub Actions job success must be checked against the **exact commit printed in the step**, since the workflow can commit within its own checkout. Its initial triggering SHA can differ from the local reviewed SHA.
- Separate CodeQL, Semgrep, live browser checks and full responsive AR/TR/EN Playwright remain mandatory after lockfile generation and this build.
- Keep Draft; release **NO-GO** until all gates pass and a separate explicit publish approval is obtained.
