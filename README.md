# Abdulrahman Hajjar — Engineering Portfolio

[![Portfolio CI](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml)

![Portfolio social preview](public/og.png)

A polished personal portfolio for a **Frontend Engineer with full-stack TypeScript depth**, focused on React, Next.js, accessible product experiences, typed APIs, and production-ready delivery.

**Live site:** [abdulrahman-hajjar-dev.netlify.app](https://abdulrahman-hajjar-dev.netlify.app)  
**GitHub:** [rahman-997](https://github.com/rahman-997)  
**LinkedIn:** [Abdulrahman Hajjar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/)

## What this portfolio demonstrates

- Product-focused frontend engineering with React, Next.js, and TypeScript
- Responsive design systems for mobile, tablet, and desktop
- Accessible interaction states, keyboard navigation, skip links, and reduced-motion support
- Full-stack depth across Express, PostgreSQL, MongoDB, Redis, authentication, and background jobs
- Dedicated project case studies with product goals, engineering decisions, quality signals, live demos, and source links
- Production-minded quality practices: validation, testing, CI/CD, security, observability, and health checks
- Automated GitHub Actions quality gate for linting and production builds
- Optimized Open Graph and social sharing metadata
- Clean, maintainable Next.js App Router structure

## Featured work

| Project | Focus | Case study | Live / source |
| --- | --- | --- | --- |
| **FitFlow** | Fitness planning, intervals, progress, accessible PWA | [Read case study](https://abdulrahman-hajjar-dev.netlify.app/work/fitflow/) | [Live](https://fitflow-gym-online.netlify.app) · [GitHub](https://github.com/rahman-997/fitflow-gym) |
| **Eventify** | Event discovery, bookings, waitlists, async jobs, observability | [Read case study](https://abdulrahman-hajjar-dev.netlify.app/work/eventify/) | [Live](https://eventify-web.onrender.com) · [GitHub](https://github.com/rahman-997/eventify) |
| **BookHaven** | Full-stack bookstore, checkout, inventory, admin workflows | [Read case study](https://abdulrahman-hajjar-dev.netlify.app/work/bookhaven/) | [Live](https://bookbookhaven-free.onrender.com) · [GitHub](https://github.com/rahman-997/bookbookhaven) |
| **Venues API** | Versioned REST API, validation, layered architecture, tests | [Read case study](https://abdulrahman-hajjar-dev.netlify.app/work/venues-api/) | [Health](https://venues-api-rahman.onrender.com/health) · [GitHub](https://github.com/rahman-997/venues-api) |

## Engineering focus

```text
Frontend systems        · React · Next.js · TypeScript · PWA
Backend depth           · Node.js · Express · PostgreSQL · MongoDB · Redis
Product quality         · Accessibility · Performance · Testing · Security
Production delivery     · CI/CD · Observability · Health checks · Deployment
```

## Tech stack

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

Open the local address shown in the terminal.

## Quality checks

```bash
npm run lint
npm run build
```

Every push and pull request to `main` also runs these checks in GitHub Actions.

## Netlify deployment

The repository includes a production `netlify.toml` and uses Next.js static export.
Netlify builds the app with `npm run build` and publishes the generated `out/`
directory. Node.js 22.13 is pinned for repeatable builds.

## Project structure

```text
app/
  layout.tsx                 metadata and document shell
  page.tsx                   portfolio home and project links
  globals.css                main design system and responsive layouts
  work/[slug]/
    page.tsx                 statically generated project case studies
    case-study.module.css    isolated case-study visual system
public/
  favicon.svg                custom portfolio icon
  og.png                     social sharing card
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

Designed and developed by [Abdulrahman Hajjar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/), Frontend Engineer in Istanbul, Türkiye.

## License

Released under the [MIT License](LICENSE).
