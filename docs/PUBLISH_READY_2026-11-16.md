# Portfolio publication candidate

The candidate contains 22 project entries in Arabic, English and Turkish, with search, categories, stages, public-source boundaries and the existing HAJAR identity. It corrects stale FAQ claims, biography wording, social-sharing metadata, mobile navigation, keyboard dismissal, storage-denied theme handling and the update date.

## Existing production target

The connected Render account confirms the existing static site `abdulrahman-hajar-portfolio`, repository `rahman-997/portfolio`, branch `main`, publish directory `out`, and canonical URL https://abdulrahman-hajar-portfolio.onrender.com/.

The live service currently deploys on commits to `main`. **Merging the review branch can therefore publish the site immediately. Wait for explicit publication approval before merging or triggering a deployment.** This preparation does not change the live service, its plan, environment variables or automatic deployment settings.

## Reproduce and publish after approval

1. Check out the exact reviewed commit. Use Node 22.13.0 and npm 11.19.1.
2. Run `npm ci`, `npm run lint`, `npm run typecheck`, `node --test scripts/tests/atlas-production-contract.test.mjs`, `npm run build`, `npm run verify:export` and `npm run audit`.
3. Require successful Portfolio CI, Security scanners and Atlas Browser QA runs on that exact commit. Browser evidence includes the original language/theme tests and additional 320/768/1440px, full-page WCAG, mobile navigation, denied-storage and 200% reflow-emulation checks.
4. The `portfolio-static-<commit>` Actions artifact contains the deployable `out` directory and hosting configuration. Serve `out`; do not serve the repository or `node_modules`. It is a static build with no application secrets or database migrations.
5. After explicit publication approval, merge the reviewed branch to `main` for the existing Render service. Do not create another service or a paid plan. Confirm the deployed commit marker matches the resulting main commit.
6. Run `npm run verify:production` with `PORTFOLIO_URL` and `EXPECTED_GIT_SHA` set to that production deployment, then perform the existing live-browser check. Verify home, Arabic/Turkish routes, four case studies, résumé/PDF, social images, 404 and navigation. This post-publication check cannot be completed in advance.

## Optional Netlify path

The old hardcoded Netlify site could not be resolved through the current connection. Its deployment workflow is now opt-in: `NETLIFY_DEPLOY_ENABLED=true`, an approved existing `NETLIFY_SITE_ID` repository variable and the existing token secret are required. No Netlify project is created or account settings changed. Render remains the canonical target; changing canonical host requires a separate deliberate change and verification.

## Scope of evidence

The portfolio's tests validate the gallery and site, not the production readiness of every product it lists. Private projects remain descriptions only. The browser reflow checks use emulated viewports and device scale rather than physical-device certification. Public demo availability is recorded separately because it depends on other deployments and may include cold starts. Historical product screenshots retain their provenance and are not represented as newly captured production states.

No publication, merge, deletion, paid resource, credential change or data migration is part of this preparation.
