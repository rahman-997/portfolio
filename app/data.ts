export type Project = {
  slug: "eventify" | "bookhaven" | "fitflow" | "venues-api";
  order: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  role: string;
  stack: string[];
  live: string;
  source: string;
  runtime?: string;
  cover?: string;
  problem: string;
  solution: string;
  architecture: string[];
  decisions: Array<{ title: string; body: string }>;
  reliability: string[];
  evidence: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "eventify",
    order: "01",
    name: "Eventify",
    category: "Distributed event platform",
    headline: "A booking system designed around state, failure, and asynchronous work.",
    summary:
      "Event discovery and organizer workflows backed by authentication, bookings, waitlists, background work, caching, health checks, metrics, CI and security gates.",
    role: "Full-stack system engineering",
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma", "Redis", "BullMQ"],
    live: "https://eventify-web.onrender.com",
    runtime: "https://backend2-api.onrender.com/health",
    source: "https://github.com/rahman-997/eventify",
    cover: "/projects/eventify-cover.jpg",
    problem:
      "Booking becomes a systems problem once capacity, retries, waitlists, background delivery and infrastructure failure can all change state independently.",
    solution:
      "Keep PostgreSQL authoritative for durable booking state, isolate ephemeral coordination in Redis, and move side effects through explicit asynchronous workflows that remain observable and recoverable.",
    architecture: ["React client", "Express API", "PostgreSQL + Prisma", "Redis cache / coordination", "BullMQ workers", "Health + metrics"],
    decisions: [
      { title: "Durable source of truth", body: "Bookings and event state remain in PostgreSQL; Redis is reserved for ephemeral coordination instead of durable business state." },
      { title: "Asynchronous boundaries", body: "Confirmation and waitlist work is separated from request latency through queue-backed workers." },
      { title: "Operational visibility", body: "Health, readiness, metrics and explicit failure paths make runtime behavior diagnosable." },
    ],
    reliability: ["Health/readiness probes", "Metrics", "Queue-backed background work", "CI and security checks", "Deployment verification"],
    evidence: ["Live web application", "Runtime health endpoint", "Public source repository", "Architecture and operational code"],
  },
  {
    slug: "bookhaven",
    order: "02",
    name: "BookHaven",
    category: "Full-stack commerce",
    headline: "A bookstore treated as an operational product, not a CRUD demo.",
    summary:
      "A Next.js and Express commerce system covering authentication, RBAC, catalog, cart, wishlist, reviews, checkout, orders, inventory and administration.",
    role: "Product + application engineering",
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Zod"],
    live: "https://bookbookhaven-free.onrender.com",
    source: "https://github.com/rahman-997/bookbookhaven",
    cover: "/projects/bookhaven-cover.jpg",
    problem:
      "A useful bookstore needs customer flows and operational flows to agree on identity, inventory, order state and authorization across the full lifecycle.",
    solution:
      "Separate presentation from API business rules, validate data at system boundaries, protect privileged operations with RBAC, and model checkout/order transitions deliberately.",
    architecture: ["Next.js storefront", "Express API", "MongoDB persistence", "Authentication", "RBAC", "Admin operations"],
    decisions: [
      { title: "Frontend/backend boundary", body: "Next.js owns product experience while Express owns validated API behavior, authentication, authorization and persistence rules." },
      { title: "Guarded commerce state", body: "Order and inventory paths are explicit so checkout and administrative transitions do not rely on implicit UI state." },
      { title: "Validated boundaries", body: "External input is validated before it reaches business rules, reducing ambiguity across customer and admin workflows." },
    ],
    reliability: ["Authentication + RBAC", "Zod validation", "API tests", "Security headers", "Typecheck/build CI", "Inventory/admin boundaries"],
    evidence: ["Live storefront", "Public source repository", "Customer and admin flows", "Validation and test coverage"],
  },
  {
    slug: "fitflow",
    order: "03",
    name: "FitFlow",
    category: "Installable fitness PWA",
    headline: "A local-first fitness product designed to remain useful when connectivity does not.",
    summary:
      "Personalized planning, guided workout intervals, progress tracking, responsive interaction, accessibility and offline-ready behavior in an installable experience.",
    role: "Frontend + product engineering",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Web APIs"],
    live: "https://fitflow-gym-online.netlify.app",
    source: "https://github.com/rahman-997/fitflow-gym",
    problem:
      "A workout tool loses value when setup, connectivity or account friction gets in the way of starting a session and preserving progress.",
    solution:
      "Keep the core journey lightweight and device-local: choose a plan, run guided intervals, preserve progress and return with context intact.",
    architecture: ["Next.js application", "Workout state", "Local persistence", "PWA manifest", "Offline readiness", "Responsive UI"],
    decisions: [
      { title: "Local-first progress", body: "Core progress persists on-device so the experience does not require account friction to remain useful." },
      { title: "Offline-ready core", body: "Installability and offline readiness support the primary workout flow when network access is limited." },
      { title: "Accessible interaction", body: "Keyboard focus, semantic structure and reduced-motion support are treated as product requirements." },
    ],
    reliability: ["Offline readiness", "Responsive layouts", "Reduced-motion support", "Accessible controls", "Production build checks", "CI"],
    evidence: ["Live Netlify deployment", "Installable PWA behavior", "Public source repository", "Responsive workout flows"],
  },
  {
    slug: "venues-api",
    order: "04",
    name: "Venues API",
    category: "Backend service",
    headline: "A deliberately small REST API with production-minded boundaries.",
    summary:
      "Express 5, TypeScript and Zod with layered routes/controllers/services, centralized errors, UUID resources, persistence and contract-level tests.",
    role: "Backend engineering",
    stack: ["Node.js", "Express 5", "TypeScript", "Zod 4", "REST", "UUID"],
    live: "https://venues-api-rahman.onrender.com",
    runtime: "https://venues-api-rahman.onrender.com/health",
    source: "https://github.com/rahman-997/venues-api",
    problem:
      "Small APIs become difficult to evolve when validation, HTTP concerns and business logic collapse into route handlers.",
    solution:
      "Enforce clear layers, validate every external input before business logic, centralize error translation and keep persistence behind service boundaries.",
    architecture: ["Versioned routes", "Validation middleware", "Controllers", "Service layer", "Persistence", "Central error handler"],
    decisions: [
      { title: "Layered responsibilities", body: "Routes connect validation and controllers; controllers translate HTTP; services own business rules and persistence behavior." },
      { title: "Boundary validation", body: "Body, params and query input are validated before they enter business logic, keeping contracts explicit." },
      { title: "Predictable failures", body: "Centralized error handling keeps status codes and response shapes consistent across endpoints." },
    ],
    reliability: ["Strict TypeScript", "Service tests", "HTTP contract tests", "Health endpoint", "Centralized errors", "UUID resources"],
    evidence: ["Live API", "Health endpoint", "Public source repository", "Tested HTTP contracts"],
  },
];

export const CAPABILITIES = [
  { index: "01", title: "Product interfaces", body: "Responsive React/Next.js interfaces with semantic structure, keyboard usability, deliberate state and performance-aware rendering.", tags: ["React", "Next.js", "TypeScript", "Accessibility", "PWA"] },
  { index: "02", title: "Backend systems", body: "Versioned APIs, validation, auth, business rules, queues, caching and explicit failure handling.", tags: ["Node.js", "Express", "REST", "BullMQ"] },
  { index: "03", title: "Data & consistency", body: "Relational and document data modeling with durable state, schema boundaries, caching and persistence trade-offs.", tags: ["PostgreSQL", "Prisma", "MongoDB", "Redis"] },
  { index: "04", title: "Delivery & reliability", body: "CI/CD, security checks, health/readiness, deployment discipline and production-oriented verification.", tags: ["GitHub Actions", "Testing", "Security", "Health checks"] },
  { index: "05", title: "AI & interactive systems", body: "AI integrations and interactive product work treated as system components rather than isolated demos.", tags: ["AI integrations", "Interactive systems"] },
] as const;

export const TOOLKIT = ["TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB", "Redis", "BullMQ", "Zod", "GitHub Actions", "PWA"];
