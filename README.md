# Abdulrahman Hajar — Frontend Engineering & Product Design Portfolio

[![Portfolio CI](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml)

A recruiter-facing frontend engineering and product design portfolio for **Abdulrahman Hajar** — **Frontend Engineer · UI/UX Designer · Full-Stack Developer**, and Computer Engineering student at Nişantaşı University in Istanbul, Türkiye.

The portfolio leads with **real frontend product experiences**: responsive React/Next.js interfaces, accessible and multilingual RTL workflows, installable PWAs, and honest case studies. Full-stack architecture, testing and reliability remain supporting evidence, not inflated marketing claims.

**Live:** [abdulrahman-hajar-portfolio.onrender.com](https://abdulrahman-hajar-portfolio.onrender.com) · **GitHub:** [rahman-997](https://github.com/rahman-997) · **LinkedIn:** [Abdulrahman Hajar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/)

---

## Positioning

```text
Build the interface.
Engineer the backend.
Own the data and failure modes.
Ship the complete system.
```

The portfolio presents the engineering layers demonstrated by the selected work:

1. **Product engineering** — React, Next.js, TypeScript, responsive UX, accessibility, and PWA behavior.
2. **Backend systems & APIs** — Node.js, Express, REST, validation, authentication, authorization, contracts, and layered service boundaries.
3. **Data & reliability** — PostgreSQL, Prisma, MongoDB, Redis, queues, background workers, health/readiness, metrics, concurrency, transactions, compensation, and failure handling.
4. **Delivery** — testing, security checks, CI/CD, static export verification, runtime/container pinning, production deployment, and operational evidence.
5. **Extended engineering toolkit** — GraphQL, WebSockets, gRPC, OpenAPI, Docker, AI/LLM/MCP, FastAPI, and Flutter.

## Selected systems

| Project | Engineering focus | Evidence |
| --- | --- | --- |
| **Mizan Finance** | Privacy-first finance UI | Responsive React dashboard, spending charts, validated forms, Arabic/English RTL, local storage, PWA; demo availability unverified — source and case study linked |
| **Eventify** | Distributed event platform | PostgreSQL/Prisma, Redis, BullMQ, authentication, bookings/waitlists, durable background work, health/readiness, metrics, CI/security |
| **BookHaven** | Full-stack commerce | Next.js + Express + MongoDB, HttpOnly BFF sessions, optimistic concurrency, conditional inventory, adaptive transactions with compensation fallback, paginated catalog/reviews/orders, admin operations, ISBN validation, dynamic SEO, Node 24.20.0 pinning, digest-pinned Node/Mongo containers, Compose validation, Dependabot supply-chain coverage |
| **FitFlow** | Installable fitness PWA | Personalized plans, guided intervals, local-first progress, accessibility, responsive UX, offline readiness, Render static delivery |
| **Venues API** | Focused backend service | Express 5, TypeScript, Zod 4, layered architecture, centralized errors, UUID resources, persistence, contract tests, live health proof |

Featured projects link to source code and engineering case studies where available; public demo links and limited previews are explicitly distinguished. Render-hosted demos explicitly disclose free-tier wake-up behavior where applicable so cold starts are not mistaken for broken software.

## Frontend-first update · 2026-11-23

- FitFlow and Mizan now lead the public project library; the upstream fork remains explicitly identified.
- Mizan has a standalone engineering case study and appears in the three-language evidence section.
- Mizan preview is an authentic screenshot captured from a freshly cloned app in an isolated browser profile, showing bundled demo transactions; no personal account data.
- FitFlow preview uses an optimized WebP screenshot from its locally built static production output, with no development browser overlay.
- Mizan's historical demo URL is **not treated as verified**; no public demo button appears in its case study.
- English, Arabic RTL, and Turkish copy leads with frontend experience, accessibility, UI/UX and React.
- A one-page Frontend résumé PDF and accessible printable HTML are now included and linked from the résumé page; the older engineering PDF remains available at its original URL.
- Every change is intended for review on a feature branch; no production deployment is part of this change.

## Security and measured performance — 2026-11-24

- Upgraded `next` and `eslint-config-next` together from 16.4.3 to **16.4.6**, with a regenerated integrity-checked `package-lock.json`.
- Refreshed the compatible `typescript-eslint`/minimatch dependency tree with a one-time audited lockfile repair. The CI dependency audit now treats **moderate** (and higher) advisories as blocking, rather than gating only high/critical.
- Maintained the pinned Node/npm versions and required lint, typecheck, static build/export, browser checks and security scanners before accepting either dependency change. The one-time upgrade helpers were removed from the branch after completion.
- Added an opt-in-by-PR **local Lighthouse lab workflow** that audits the English and Arabic static exports on GitHub's runner; reports are stored as temporary GitHub Actions artifacts, never publicly uploaded to a third-party Lighthouse service.
- First Lighthouse 12.8.2 mobile lab results (2026-11-24) were **78 performance / 100 accessibility / 100 best practices / 100 SEO** on both languages. LCP was **5.3–5.6s** (synthetic, not field data). After prioritizing the real FitFlow hero capture and removing initial image animation, a second run was **73 EN / 77 AR performance**, with LCP **5.5–5.7s**. These run-to-run variations do **not** establish an improvement; reducing the LCP render delay remains an explicit release follow-up.
- Production visitors' Web Vitals, handset QA, BookHaven/Eventify preview recovery, and user sign-off are still unverified. Passing a synthetic audit is not a production guarantee.

## Performance and asset QA experiments — 24 November 2026

- Lighthouse baseline, single simulated-mobile runs: EN **68**, AR **78** performance; both 100 for accessibility, best practices and SEO. The measured LCP element was the real 39 KB FitFlow hero screenshot; **65–69% of LCP time was render delay**, not file download.
- Prevented speculative hero case-study RSC prefetch and explicitly lowered priority for secondary project images. This removed around **39 KB of unnecessary initial requests** (confirmed in Lighthouse JSON), but **did not reliably improve LCP**, which remained around 5.5–5.6 s.
- Tested a synchronous-decode hint for the 39 KB LCP image. Single-run LCP remained unchanged; this is not evidence of a speedup.
- Tested CSS `content-visibility: auto` on offscreen AI Atlas. A single EN Lighthouse run reported lower blocking time, **but the full-page screenshot showed a blank Atlas area**. The optimization was **reverted**, and browser QA now prevents this visual regression.
- The later revert run measured EN **85** (LCP **4.15 s**) and AR **78** (LCP **5.6 s**). Large run-to-run variance proves these synthetic results should not be used as a guaranteed improvement claim. Repeatable real-device testing remains a release gate.
- Free read-only public demo checks and screenshots are stored in short-retention GitHub Actions artifacts; images require manual inspection and must not be auto-published.

## Reproducible Lighthouse lab and non-gaming budgets — 24 November 2026

- The GitHub Actions Lighthouse lab now uses `scripts/serve_lighthouse.py` rather than plain Python `http.server`. It mirrors the **Cache-Control rules already defined in `render.yaml`** for static JS/CSS, project images, icons and the manifest. Before this correction, Lighthouse falsely reported no cache lifetime because the test server omitted headers. This is **measurement fidelity, not an optimization deployed to production**.
- `scripts/tests/test_serve_lighthouse.py` proves those headers and confirms HTML is not incorrectly given an immutable cache policy.
- `scripts/lighthouse-budget.mjs` gates synthetic accessibility (at least 95), best practices (at least 90), SEO (at least 95) and layout stability (CLS up to 0.10). Its thresholds are covered by a Node unit test, also included in standard CI.
- Performance below 80/100, LCP beyond 4 seconds or TBT beyond 300ms produce **warnings rather than false definitive regressions** until repeated controlled data can establish a reliable baseline. The prior measured LCP of roughly 5.5–5.7s is still a real open issue; this update does not claim it was fixed.
- All lab measurements run locally on an isolated, free GitHub Actions runner and do not send visitor data or reports to a third party. Production cache headers and real-device Web Vitals require independent verification.

## Interactive product theatre — 2026-11-23

- Replaced the decorative overlapping hero preview with a source-backed interactive stage for FitFlow and Mizan Finance.
- Each project has an accessible, keyboard-operable toggle, a genuine app screenshot, a project-specific description and a real case-study link; the screenshot provenance is stated explicitly.
- The theatre works in English, Arabic RTL and Turkish, respects reduced-motion preferences and does not autoplay anything.
- Browser tests exercise project switching in all 12 locale/theme/viewport combinations; static export checks ensure the HTML contains the initial interface and screenshot assets.
- This work exists only in the current Draft PR until reviewed. No public deployment or paid API is required.

## Image verification — 2026-11-23

- GitHub Actions browser testing verified that FitFlow and Mizan screenshots load from local static assets in the five-case-study gallery.
- Historical `bookhaven-cover.jpg` and `eventify-cover.jpg` JPEG files remain retained but are not referenced because browsers could not decode them. **BookHaven** now uses `bookhaven-real-interface.webp` (840 × 529, ~23 KB), generated from a **manually inspected, unauthenticated live storefront capture on 24 November 2026**. **Eventify** artwork stays suppressed.
- Do not replace missing artwork with invented screenshots. Public demo GET checks returned HTTP 200 for BookHaven and Eventify on 24 November, but **Eventify's actual browser page showed an unavailable catalog and degraded backend connection**; HTTP 200 alone cannot establish a working demo. Preserve source/case-study evidence and fix the backend before claiming complete functionality.
- Case-study titles are tested across 320px, 390px and 820px viewports, including text bounds and horizontal overflow.

## Visual direction

The active design uses a restrained dark engineering identity rather than a generic developer template:

- deep charcoal application canvas with high-contrast typography
- restrained signal accents and strong editorial hierarchy
- first-party project evidence where useful
- architecture/system visualization instead of decorative skill cards
- generous whitespace and deliberate scan paths
- responsive layouts for desktop, tablet, and mobile
- generated Open Graph / Twitter artwork aligned with the site identity

## Recruiter-facing content

- clear **Frontend Engineer · UI/UX Designer · Full-Stack Developer** positioning
- selected projects with architecture and reliability evidence
- engineering capability map
- Computer Engineering education
- recruiter-facing web résumé
- downloadable PDF résumé (`/Abdulrahman-Hajar-Resume.pdf`)
- printable HTML résumé
- dedicated case studies
- GitHub and LinkedIn pathways
- canonical metadata and structured data
- indexable résumé and project routes

## Stack

```text
Next.js 16 · React 19 · TypeScript 5 · JavaScript
Node.js · Express · REST · GraphQL · WebSockets · gRPC · OpenAPI · Zod
PostgreSQL · Prisma · MongoDB · Redis · BullMQ
Docker · GitHub Actions · CI/CD · Netlify · Render
AI / LLM / MCP · FastAPI · Flutter
CSS Modules · Responsive CSS · Accessibility
```

## Structure

```text
app/
  portfolio-data.ts                 canonical profile + project data source
  layout.tsx                         metadata, JSON-LD, application shell
  manifest.ts                       web app metadata
  page.tsx                           engineering portfolio homepage
  home.module.css                    homepage visual system
  globals.css                        minimal global reset + accessibility defaults
  not-found.tsx                      branded 404 experience
  not-found.module.css               404 presentation
  opengraph-image.tsx                generated social preview
  twitter-image.tsx                  generated X/Twitter preview
  robots.ts                          crawler policy
  sitemap.ts                         indexable route map
  resume/
    page.tsx                         recruiter-facing résumé + PDF download
    resume.module.css                résumé design system
  work/[slug]/
    page.tsx                         case studies + project metadata/JSON-LD
    case-study.module.css            case-study presentation
public/
  projects/                          project evidence imagery
  favicon.svg
  Abdulrahman-Hajar-Resume.pdf       downloadable résumé
  resume.html                        printable résumé
scripts/
  verify-export.mjs                  export + identity regression checks
.github/workflows/
  ci.yml                             lint + typecheck + build + export + audit gate
```

## Commercial studio release review

See [the Arabic release review guide](docs/RELEASE_REVIEW_AR.md) for pinned Windows setup, reproducible static artifact integrity, known limitations and explicit deployment approval gates. The review-only CI artifact is not a production deployment.

## Local development

```bash
git clone https://github.com/rahman-997/portfolio.git
cd portfolio
npm ci
npm run dev
```

## Quality gate

```bash
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
```

`verify:export` checks the exported homepage, branded 404, résumé, case studies, crawler files, canonical-host contract, project assets, social-preview fallbacks, manifest theme consistency, internal links, identity markers, downloadable résumé PDF, hosting header/cache rules, and guards against stale legacy production hostnames.

GitHub Actions runs the complete quality gate on pushes and pull requests and provides the final CI proof for `main`. Project/profile metadata is centralized in `app/portfolio-data.ts` so homepage cards, case studies, résumé links, sitemap routes, and structured data cannot silently drift apart.

## Production integrity

The portfolio treats deployment as a verifiable artifact, not just a successful build:

- `render.yaml` documents the primary Render static-site contract, including security and cache headers.
- `netlify.toml` remains the equivalent fallback-host contract.
- generated HTML exposes the non-secret Git commit SHA as `data-deploy-commit`, allowing CI to prove which revision is actually live.
- `.github/workflows/production-smoke.yml` verifies the production site after successful `main` CI and once daily.
- the PWA identity includes SVG, 192 px, 512 px, maskable, and Apple touch icons.

## Deployment

The project uses a portable static Next.js export. `netlify.toml` remains available for Netlify, while the active public mirror is deployed from `main` as a Render Static Site publishing `out/`.

The deployment configuration includes long-lived caching for immutable static assets and security-oriented response headers. Because the output is static, the portfolio is not tied to one hosting vendor and can be moved between static hosts without changing the application architecture.

## SEO & accessibility

The portfolio includes canonical metadata, Open Graph/Twitter previews, sitemap and robots output, JSON-LD for the person/site/profile and project case studies, semantic landmarks, skip navigation, visible keyboard focus, strong contrast, reduced-motion support, 44px minimum interactive targets, and responsive layouts.

## Author

Designed and developed by **[Abdulrahman Hajar](https://github.com/rahman-997)** — **Software Engineer · Full-Stack Developer · AI & Interactive Systems** in Istanbul, Türkiye.

## License

Released under the [MIT License](LICENSE).
