# Abdulrahman Hajar — Software Engineering Portfolio

[![Portfolio CI](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml)

Recruiter-facing portfolio for **Abdulrahman Hajar** — Software Engineer, Full-Stack Developer, and Computer Engineering student at Nişantaşı University in Istanbul, Türkiye.

**Live:** [abdulrahman-hajar-dev.netlify.app](https://abdulrahman-hajar-dev.netlify.app) · **GitHub:** [rahman-997](https://github.com/rahman-997) · **LinkedIn:** [Abdulrahman Hajar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/)

## What this portfolio proves

The site is organized around engineering evidence rather than a generic skills wall:

- product interfaces built with React, Next.js and TypeScript
- backend APIs, validation, authentication and explicit service boundaries
- PostgreSQL/Prisma, MongoDB and Redis data concerns
- asynchronous work with queues/workers where the project requires it
- testing, security checks, CI/CD, health/readiness and deployment verification
- accessibility, responsive behavior and static-export performance
- AI and interactive systems as an extended engineering focus

## Selected work

| Project | Engineering focus | Proof |
| --- | --- | --- |
| **Eventify** | Distributed event platform | PostgreSQL/Prisma, Redis, BullMQ, authentication, bookings/waitlists, health/readiness, metrics, CI/security |
| **BookHaven** | Full-stack commerce | Next.js + Express + MongoDB, authentication/RBAC, catalog, cart, wishlist, checkout, orders, inventory/admin |
| **FitFlow** | Installable fitness PWA | Personalized plans, guided intervals, local-first progress, accessibility, responsive UX, offline readiness |
| **Venues API** | Backend REST service | Express 5, TypeScript, Zod, layered architecture, centralized errors, UUID resources, persistence and tests |

Every featured project links to a **live deployment, public source repository, and engineering case study**.

## Architecture

```text
app/
  data.ts                           verified project/capability source of truth
  layout.tsx                       metadata + JSON-LD + server-rendered shell
  page.tsx                         engineering-storytelling homepage
  home.module.css                  responsive homepage design system
  resume/                          recruiter-facing web résumé
  work/[slug]/                     static engineering case studies
  opengraph-image.tsx              social preview artwork
  robots.ts / sitemap.ts           crawler and route metadata
public/
  projects/                        project imagery
  Abdulrahman-Hajar-Resume.pdf     downloadable résumé
  resume.html                      printable résumé
scripts/
  verify-export.mjs                export + identity regression checks
.github/workflows/
  ci.yml                           install + lint + typecheck + build + export + audit
```

The site intentionally keeps its primary experience server-rendered and CSS-driven. No client-side navigation widget or animation library is required for the core portfolio.

## Quality gate

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
```

`verify:export` requires the homepage, branded 404, résumé, all four case studies, robots file, sitemap, manifest, social-preview output, and downloadable PDF. It also fails on stale professional-identity markers such as the previous Netlify hostname or the incorrect visible surname spelling.

GitHub Actions runs the same quality gate on branch pushes and pull requests, with concurrency grouped by branch/PR so superseded runs are cancelled without obscuring the final HEAD result.

## Deployment

The project uses a static Next.js export. `netlify.toml` runs the production build and publishes `out/`, with security headers and cache policies for framework assets, project artwork, the manifest, and social-preview output.

## SEO & accessibility

- canonical production URL and route-specific metadata
- Open Graph and Twitter/X preview output
- `Person`, `WebSite`, `ProfilePage`, `ItemList`, `TechArticle`, `SoftwareSourceCode`, `SoftwareApplication`, and breadcrumb structured data
- `robots.txt` and `sitemap.xml`
- semantic landmarks and heading hierarchy
- skip navigation and visible keyboard focus
- strong contrast and reduced-motion support
- responsive layouts for desktop, tablet and mobile

## Author

**Abdulrahman Hajar** · Software Engineer · Full-Stack Developer · Istanbul, Türkiye

Released under the [MIT License](LICENSE).
