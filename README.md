# Abdulrahman Hajar — Software Engineering Portfolio

[![Portfolio CI](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml)

![Portfolio social preview](public/og.png)

A production-focused engineering portfolio for **Abdulrahman Hajar**, a **Software Engineer and Full-Stack Developer** studying Computer Engineering at Nişantaşı University in Istanbul. The portfolio highlights full-stack TypeScript systems, polished React/Next.js products, backend APIs, data infrastructure, testing, deployment, and selected AI / interactive-system work.

**Live site:** [abdulrahman-hajjar-dev.netlify.app](https://abdulrahman-hajjar-dev.netlify.app)  
**GitHub:** [rahman-997](https://github.com/rahman-997)  
**LinkedIn:** [Abdulrahman Hajar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/)

## What this portfolio demonstrates

- Full-stack product engineering with React, Next.js, TypeScript, Node.js, and Express
- Responsive and accessible UI systems for mobile, tablet, and desktop
- Backend architecture across REST APIs, validation, authentication, PostgreSQL, MongoDB, Redis, and async jobs
- System-design thinking across real-time, AI-assisted, and interactive application concepts
- Production-minded quality practices: testing, CI/CD, security, observability, health checks, and deployment
- Dedicated project case studies with product goals, engineering decisions, quality signals, live demos, and source links
- Automated GitHub Actions quality gates for linting and production builds
- Optimized Open Graph and social sharing metadata
- Clean, maintainable Next.js App Router structure

## Featured work

| Project | Focus | Case study | Live / source |
| --- | --- | --- | --- |
| **Eventify** | Event discovery, bookings, waitlists, Redis/BullMQ workflows, observability, security | [Read case study](https://abdulrahman-hajjar-dev.netlify.app/work/eventify/) | [Live](https://eventify-web.onrender.com) · [GitHub](https://github.com/rahman-997/eventify) |
| **BookHaven** | Full-stack bookstore, checkout, inventory, auth/RBAC, admin workflows | [Read case study](https://abdulrahman-hajjar-dev.netlify.app/work/bookhaven/) | [Live](https://bookbookhaven-free.onrender.com) · [GitHub](https://github.com/rahman-997/bookbookhaven) |
| **FitFlow** | Fitness planning, intervals, progress, accessible PWA | [Read case study](https://abdulrahman-hajjar-dev.netlify.app/work/fitflow/) | [Live](https://fitflow-gym-online.netlify.app) · [GitHub](https://github.com/rahman-997/fitflow-gym) |
| **Venues API** | Versioned REST API, validation, layered architecture, tests | [Read case study](https://abdulrahman-hajjar-dev.netlify.app/work/venues-api/) | [Health](https://venues-api-rahman.onrender.com/health) · [GitHub](https://github.com/rahman-997/venues-api) |

## Engineering focus

```text
Full-stack systems        · TypeScript · React · Next.js · Node.js · Express
Backend & data            · REST · GraphQL · PostgreSQL · MongoDB · Redis
Interactive engineering   · PWA · WebSockets · Flutter · WebGL / Three.js
AI systems                · LLM integrations · MCP workflows · Agentic architecture
Product quality           · Accessibility · Performance · Testing · Security
Production delivery       · Docker · CI/CD · Observability · Health checks · Deployment
```

## Education

**Computer Engineering — Nişantaşı University, Istanbul**  
Currently studying while building and shipping web, backend, mobile, and AI-oriented engineering projects.

## Portfolio tech stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Modern CSS with responsive grids, fluid typography, and custom properties
- CSS Modules for project case-study surfaces
- ESLint and production build validation
- GitHub Actions CI

## Local development

```bash
git clone https://github.com/rahman-997/portfolio.git
cd portfolio
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

Every push and pull request to `main` also runs these checks in GitHub Actions.

## Netlify deployment

The repository includes a production `netlify.toml` and uses Next.js static export. Netlify builds the app with `npm run build` and publishes the generated `out/` directory. Node.js 22.13 is pinned for repeatable builds.

## Project structure

```text
app/
  layout.tsx                 metadata and document shell
  page.tsx                   portfolio home and project links
  globals.css                main design system and responsive layouts
  resume/                    web résumé
  work/[slug]/               project case studies
public/
  favicon.svg                custom portfolio icon
  og.png                     social sharing card
  resume.html                printable résumé
.github/workflows/
  ci.yml                     lint + production build quality gate
```

## Accessibility

- Semantic landmarks and heading structure
- Keyboard-visible focus treatment
- Skip-to-content navigation
- High-contrast action states
- Reduced-motion preference support
- Descriptive link and image labels
- Responsive case-study layouts across desktop and mobile

## Author

Designed and developed by [Abdulrahman Hajar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/), Software Engineer and Full-Stack Developer based in Istanbul, Türkiye.

## License

Released under the [MIT License](LICENSE).

<!-- deploy-sync: 2026-08-26 -->
