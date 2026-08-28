# Abdulrahman Hajar — Software Engineering Portfolio

[![Portfolio CI](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml)

A recruiter-facing engineering portfolio for **Abdulrahman Hajar** — **Software Engineer focused on Full-Stack & Backend Systems**, and Computer Engineering student at Nişantaşı University in Istanbul, Türkiye.

The portfolio is built around **engineering evidence, not a generic skills wall**: complete products, backend architecture, API design, data systems, background work, validation, testing, security, reliability, deployment, AI integrations, and selected interactive engineering.

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
| **Eventify** | Distributed event platform | PostgreSQL/Prisma, Redis, BullMQ, authentication, bookings/waitlists, durable background work, health/readiness, metrics, CI/security |
| **BookHaven** | Full-stack commerce | Next.js + Express + MongoDB, HttpOnly BFF sessions, optimistic concurrency, conditional inventory, adaptive transactions with compensation fallback, paginated catalog/reviews/orders, admin operations, ISBN validation, dynamic SEO, Node 24.20.0 pinning, digest-pinned Node/Mongo containers, Compose validation, Dependabot supply-chain coverage |
| **FitFlow** | Installable fitness PWA | Personalized plans, guided intervals, local-first progress, accessibility, responsive UX, offline readiness |
| **Venues API** | Focused backend service | Express 5, TypeScript, Zod 4, layered architecture, centralized errors, UUID resources, persistence, tests |

Every featured project links to **live proof, source code, and an engineering case study**. Render-hosted demos explicitly disclose free-tier wake-up behavior so cold starts are not mistaken for broken software.

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

- clear **Software Engineer · Full-Stack & Backend Systems** positioning
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

## Local development

```bash
git clone https://github.com/rahman-997/portfolio.git
cd portfolio
npm install
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

`verify:export` checks the exported homepage, branded 404, résumé, case studies, crawler files, manifest, social-preview output, links, identity markers, and downloadable résumé PDF.

GitHub Actions runs the complete quality gate on pushes and pull requests and provides the final CI proof for `main`.

## Deployment

The project uses a portable static Next.js export. `netlify.toml` remains available for Netlify, while the active public mirror is deployed from `main` as a Render Static Site publishing `out/`.

The deployment configuration includes long-lived caching for immutable static assets and security-oriented response headers. Because the output is static, the portfolio is not tied to one hosting vendor and can be moved between static hosts without changing the application architecture.

## SEO & accessibility

The portfolio includes canonical metadata, Open Graph/Twitter previews, sitemap and robots output, JSON-LD for the person/site/profile and project case studies, semantic landmarks, skip navigation, visible keyboard focus, strong contrast, reduced-motion support, 44px minimum interactive targets, and responsive layouts.

## Author

Designed and developed by **[Abdulrahman Hajar](https://github.com/rahman-997)** — Software Engineer focused on **Full-Stack & Backend Systems** in Istanbul, Türkiye.

## License

Released under the [MIT License](LICENSE).
