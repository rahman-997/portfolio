export const SITE_URL = "https://abdulrahman-hajar-portfolio.onrender.com";
export const PORTFOLIO_UPDATED_AT = "2026-09-03T14:12:35.000Z";
export const THEME_COLOR = "#07100f";

export const PROFILE_LINKS = {
  github: "https://github.com/rahman-997",
  linkedin: "https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/",
} as const;

export const PROJECTS = {
  eventify: {
    slug: "eventify",
    index: "01",
    name: "Eventify",
    label: "Distributed event platform",
    eyebrow: "Distributed product system · Full-stack",
    thesis: "Reliable booking flows beyond the happy path.",
    summary:
      "A production-oriented event platform with secure authentication, organizer workflows, bookings, waitlists, PostgreSQL durability, Redis coordination, BullMQ background jobs, observability, and operational health checks.",
    stack: ["React", "TypeScript", "Express 5", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Zod"],
    languages: ["TypeScript", "JavaScript"],
    proof: [
      "Transactional booking state",
      "PostgreSQL outbox",
      "Worker + queue coordination",
      "Health, readiness & metrics",
      "Render free tier · wake-up may be required",
    ],
    live: "https://eventify-web.onrender.com",
    runtime: "https://backend2-api.onrender.com/health",
    source: "https://github.com/rahman-997/eventify",
    cover: "/projects/eventify-cover.jpg",
    visual: "product",
    problem:
      "Event booking stops being simple once capacity, cancellation, waitlists, retries, authentication, shared cache state, and background side effects all have to remain coherent. The project needed to demonstrate those failure modes rather than hiding them behind a CRUD interface.",
    solution:
      "Eventify separates authoritative relational state from disposable infrastructure: PostgreSQL owns durable product state, Redis supports caching/rate limits/queue coordination, and a PostgreSQL outbox preserves the intent to dispatch important asynchronous work before BullMQ workers process it.",
    architecture: [
      "React/Vite PWA → HTTPS JSON → Express API",
      "route → controller → service → repository/data source",
      "PostgreSQL as authoritative state; Redis for cache, rate limits, and queue coordination",
      "PostgreSQL outbox → BullMQ worker for durable background side effects",
    ],
    decisions: [
      [
        "Authority before acceleration",
        "PostgreSQL remains the source of truth while Redis is treated as shared ephemeral infrastructure that can fail without redefining product state.",
      ],
      [
        "Durable async intent",
        "Important confirmation and waitlist work is written to a PostgreSQL outbox before queue dispatch so a Redis or worker restart does not silently erase intent.",
      ],
      [
        "Diagnosable runtime",
        "Health, readiness, metrics, request IDs, structured logs, dependency probes, and graceful shutdown make production behavior observable.",
      ],
    ],
    reliability: [
      "Cache-aside reads with PostgreSQL fallback",
      "BullMQ retries and backoff",
      "Waitlist promotion through durable work",
      "Health vs readiness separation",
      "Dependency latency probes",
      "Security analysis in CI",
    ],
    evidence: [
      "Integration tests",
      "Dependency-cruiser architecture rules",
      "Semgrep + CodeQL",
      "API + worker runtime probes",
      "PWA verification",
      "Production build verification",
    ],
  },
  bookhaven: {
    slug: "bookhaven",
    index: "02",
    name: "BookHaven",
    label: "Full-stack commerce system",
    eyebrow: "Commerce system · Full-stack",
    thesis: "A bookstore designed as both a product and an operating system.",
    summary:
      "A complete commerce system covering product discovery, authentication, role-based operations, wishlist, cart, reviews, checkout, orders, inventory, and administration across Next.js and Express.",
    stack: ["Next.js", "React", "TypeScript", "Express 5", "MongoDB", "Mongoose", "Zod"],
    languages: ["TypeScript", "JavaScript"],
    proof: [
      "Customer + admin flows",
      "JWT + RBAC",
      "Validated API boundary",
      "Order & inventory behavior",
      "Render free tier · wake-up may be required",
    ],
    live: "https://bookbookhaven-free.onrender.com",
    runtime: null,
    source: "https://github.com/rahman-997/bookbookhaven",
    cover: "/projects/bookhaven-cover.jpg",
    visual: "product",
    problem:
      "A bookstore portfolio project becomes credible only when customer and operational workflows agree on the same business rules. Cart state, checkout, order transitions, inventory, reviews, and admin actions need to behave as one system rather than isolated screens.",
    solution:
      "BookHaven uses Next.js for the product interface and browser-facing session boundary, while Express owns validated APIs, authorization, business rules, and MongoDB persistence. Commerce transitions include locking, compensation, guarded status changes, and inventory restoration paths.",
    architecture: [
      "Browser → Next.js App Router",
      "Next.js BFF route handlers → Express 5 API",
      "Zod validation + JWT authentication + customer/admin RBAC",
      "Services and Mongoose models → MongoDB persistence",
    ],
    decisions: [
      [
        "Clear frontend/backend boundary",
        "Next.js owns product UI and browser-facing session handling while Express owns business rules, authorization, validation, and persistence.",
      ],
      [
        "Safer commerce transitions",
        "Checkout locking, guarded order-state transitions, compensation paths, and inventory restoration reduce duplicate or inconsistent commerce behavior.",
      ],
      [
        "Reviewable free deployment",
        "The deployment supports MongoDB Atlas and an embedded demo database fallback so the complete flow remains inspectable on a zero-cost portfolio stack.",
      ],
    ],
    reliability: [
      "Checkout concurrency lock",
      "Compensation on failed checkout",
      "Atomic order-status transitions",
      "Historical title/price snapshots",
      "Inventory restoration on valid cancellation",
      "Health/readiness route",
    ],
    evidence: [
      "Jest + Supertest API tests",
      "Typecheck + frontend/backend builds",
      "Helmet + CORS + rate limiting",
      "OpenAPI 3.1 contract",
      "Admin operational flows",
      "GitHub Actions CI",
    ],
  },
  fitflow: {
    slug: "fitflow",
    index: "03",
    name: "FitFlow",
    label: "Installable fitness PWA",
    eyebrow: "Product engineering · PWA",
    thesis: "A local-first training experience built for everyday use.",
    summary:
      "An installable fitness product with personalized recommendations, guided intervals, weekly progress, device-local persistence, accessibility, and an offline-ready core.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Web APIs", "Modern CSS"],
    languages: ["TypeScript", "JavaScript", "CSS"],
    proof: [
      "Local-first progress",
      "Installable experience",
      "Reduced-motion support",
      "Responsive workout flows",
      "Static Render delivery",
    ],
    live: "https://fitflow-gym.onrender.com",
    runtime: null,
    source: "https://github.com/rahman-997/fitflow-gym",
    cover: "/projects/fitflow-cover.svg",
    visual: "pwa",
    problem:
      "A static fitness landing page does not demonstrate product behavior. The challenge was to create an end-to-end training flow with real application state, timing behavior, persistence, responsive edge cases, accessibility requirements, and offline considerations without adding unnecessary account infrastructure.",
    solution:
      "FitFlow keeps weekly progress on the device, uses an installable PWA shell for resilient access, and focuses the interaction model on discovery → recommendation → guided session → weekly progress → return with state preserved.",
    architecture: [
      "Next.js/React product interface",
      "Browser localStorage for device-local training progress",
      "Web App Manifest + service worker for installable/offline-ready behavior",
      "Responsive CSS system with keyboard, semantic, and reduced-motion support",
    ],
    decisions: [
      [
        "Local-first progress",
        "Device-local persistence keeps the core experience fast and private while avoiding authentication complexity that does not improve this product scope.",
      ],
      [
        "PWA as product behavior",
        "Manifest and service-worker behavior make installability and limited-connectivity use part of the experience instead of a checklist-only feature.",
      ],
      [
        "Accessibility in interaction design",
        "Keyboard-visible focus, semantic landmarks, accessible state, skip navigation, live progress feedback, and reduced-motion support are treated as system requirements.",
      ],
    ],
    reliability: [
      "Device-local state persistence",
      "Offline-ready core shell",
      "Reduced-motion preference support",
      "Responsive navigation",
      "Visible keyboard focus",
      "Production build validation",
    ],
    evidence: [
      "Personalized plan builder",
      "Guided interval timer",
      "Weekly workout tracker",
      "PWA manifest + service worker",
      "ESLint + project checks",
      "GitHub Actions CI",
    ],
  },
  "venues-api": {
    slug: "venues-api",
    index: "04",
    name: "Venues API",
    label: "Backend engineering · REST",
    eyebrow: "Backend service · REST API",
    thesis: "Small surface area. Strict engineering boundaries.",
    summary:
      "A focused Express 5 REST service demonstrating strict validation, layered responsibilities, predictable errors, UUID-based resources, persistence boundaries, and HTTP contract tests.",
    stack: ["Node.js", "Express 5", "TypeScript", "Zod 4", "REST"],
    languages: ["TypeScript", "JavaScript"],
    proof: [
      "Layered architecture",
      "Centralized error handling",
      "Validated inputs",
      "HTTP contract tests",
      "Render free tier · wake-up may be required",
    ],
    live: "https://venues-api-rahman.onrender.com/health",
    runtime: null,
    source: "https://github.com/rahman-997/venues-api",
    cover: null,
    visual: "api",
    problem:
      "Small APIs often become difficult to extend because routing, validation, business rules, persistence, and error handling collapse into the same layer. The goal was to keep a compact CRUD service deliberately understandable while still applying production-minded boundaries.",
    solution:
      "The service uses versioned routes, Zod middleware for all external input, controllers for HTTP translation, services for business rules and persistence behavior, centralized errors, server-generated UUIDs, and an isolated JSON persistence path for tests.",
    architecture: [
      "HTTP request → route + validation",
      "Controller → HTTP translation only",
      "Service → business rules + persistence boundary",
      "Configurable JSON store with isolated test persistence",
    ],
    decisions: [
      [
        "Layered responsibilities",
        "Routes wire endpoints and schemas, controllers translate HTTP, and services own business rules and persistence behavior.",
      ],
      [
        "Validate before business logic",
        "Zod validates bodies, parameters, and query strings before invalid input can enter the service layer.",
      ],
      [
        "One error boundary",
        "Central error middleware owns expected and unexpected HTTP error formatting so controllers do not duplicate failure handling.",
      ],
    ],
    reliability: [
      "Case-insensitive uniqueness rule",
      "Server-generated UUIDs and timestamps",
      "Configurable persistence file",
      "Isolated test data",
      "Predictable HTTP error shape",
      "Health endpoint",
    ],
    evidence: [
      "Service-level tests",
      "Real HTTP contract tests",
      "Strict TypeScript",
      "Typecheck/test/build workflow",
      "Versioned API surface",
      "CI-backed verification",
    ],
  },
} as const;

export type ProjectSlug = keyof typeof PROJECTS;
export const PROJECT_SLUGS = Object.keys(PROJECTS) as ProjectSlug[];
export const PROJECT_LIST = PROJECT_SLUGS.map((slug) => PROJECTS[slug]);
