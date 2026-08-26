import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./case-study.module.css";

const studies = {
  fitflow: {
    name: "FitFlow",
    eyebrow: "Fitness product · PWA",
    summary:
      "A premium fitness experience that turns program discovery into a usable weekly routine with personalized recommendations, guided intervals, progress tracking, accessibility, and offline support.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Modern CSS"],
    live: "https://fitflow-gym-online.netlify.app",
    source: "https://github.com/rahman-997/fitflow-gym",
    goal:
      "Make a fitness product feel immediately useful without forcing account creation: help a user choose a plan, run a focused session, and maintain weekly consistency.",
    decisions: [
      ["Device-local progress", "Weekly progress uses localStorage so the core experience stays fast and private without an authentication dependency."],
      ["Offline-ready shell", "A manifest and conservative service worker keep the installable core usable while preserving a straightforward deployment model."],
      ["Accessible interaction", "Keyboard focus states, semantic landmarks, reduced-motion support, live progress feedback, and explicit control states are treated as product requirements."],
    ],
    quality: ["Responsive layouts", "ESLint + production build gate", "Installable PWA", "Reduced-motion support", "CI on every push"],
  },
  eventify: {
    name: "Eventify",
    eyebrow: "Event platform · Full-stack systems",
    summary:
      "A production-oriented event platform with authentication, organizer workflows, bookings, waitlists, background jobs, caching, observability, and an installable React PWA.",
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma", "Redis", "BullMQ"],
    live: "https://eventify-web.onrender.com",
    source: "https://github.com/rahman-997/eventify",
    goal:
      "Keep event discovery simple for attendees while making booking state, capacity rules, waitlist promotion, and asynchronous side effects reliable under real operational constraints.",
    decisions: [
      ["PostgreSQL as authority", "Bookings and event state remain durable in PostgreSQL; Redis is used for ephemeral concerns such as caching, throttling, worker heartbeat, and queues."],
      ["Durable async workflow", "A PostgreSQL outbox preserves the intent to dispatch confirmation and waitlist work even when Redis or workers restart."],
      ["Operational visibility", "Health, readiness, metrics, request IDs, structured logs, dependency probes, and graceful shutdown make the runtime easier to diagnose and operate."],
    ],
    quality: ["Strict TypeScript", "Integration tests", "Architecture rules", "Security scanning", "CodeQL / Semgrep", "CI + production health checks"],
  },
  bookhaven: {
    name: "BookHaven",
    eyebrow: "Commerce · Full-stack product",
    summary:
      "A full-stack bookstore covering catalog discovery, wishlist, cart, checkout, reviews, orders, inventory, authentication, and admin operations.",
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Mongoose", "Zod"],
    live: "https://bookbookhaven-free.onrender.com",
    source: "https://github.com/rahman-997/bookbookhaven",
    goal:
      "Build a complete commerce flow that is credible as both a customer product and an operational system, while remaining deployable on a zero-cost portfolio stack.",
    decisions: [
      ["Clear frontend/backend boundary", "Next.js handles the product UI and BFF route handlers while Express owns validated REST APIs, authentication, authorization, and service logic."],
      ["Safer order transitions", "Checkout locking, guarded order-state transitions, compensation paths, and inventory restoration reduce duplicate or inconsistent order behavior."],
      ["Demo-friendly hosting", "The project supports durable MongoDB Atlas storage and an embedded demo database fallback so the full experience can still be reviewed on free hosting."],
    ],
    quality: ["JWT + RBAC", "Zod validation", "Jest / Supertest", "Security headers", "Typecheck + build CI", "Admin operational flows"],
  },
  "venues-api": {
    name: "Venues API",
    eyebrow: "Backend · REST API",
    summary:
      "A focused Express 5 API demonstrating strict validation, layered architecture, predictable errors, UUID-based resources, persistence, and contract-level tests.",
    stack: ["Node.js", "Express 5", "TypeScript", "Zod 4"],
    live: "https://venues-api-rahman.onrender.com/health",
    source: "https://github.com/rahman-997/venues-api",
    goal:
      "Keep a small CRUD service intentionally understandable while still applying the engineering boundaries expected in a production-minded API.",
    decisions: [
      ["Layered responsibilities", "Routes connect validation and controllers; controllers translate HTTP; services own business rules and persistence behavior."],
      ["Centralized validation and errors", "Zod validates body, params, and query inputs before business logic runs, while one error layer keeps response shapes predictable."],
      ["Portable persistence", "JSON-file persistence keeps local setup lightweight while tests use an isolated temporary data file and exercise real HTTP contracts."],
    ],
    quality: ["Strict TypeScript", "Service tests", "HTTP contract tests", "Health endpoint", "Automated CI", "Case-insensitive uniqueness rules"],
  },
} as const;

type StudySlug = keyof typeof studies;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = studies[slug as StudySlug];
  if (!study) return {};

  return {
    title: `${study.name} Case Study — Abdulrahman Hajjar`,
    description: study.summary,
    alternates: { canonical: `/work/${slug}/` },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = studies[slug as StudySlug];
  if (!study) notFound();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajjar portfolio">
          <span>AH</span>
          <strong>Abdulrahman Hajjar</strong>
        </Link>
        <Link className={styles.back} href="/#work">← All work</Link>
      </header>

      <article>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{study.eyebrow}</p>
          <h1>{study.name}</h1>
          <p className={styles.summary}>{study.summary}</p>
          <div className={styles.actions}>
            <a href={study.live} target="_blank" rel="noreferrer">Open live product ↗</a>
            <a href={study.source} target="_blank" rel="noreferrer">View source ↗</a>
          </div>
          <div className={styles.stack} aria-label="Technology stack">
            {study.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section className={styles.goal}>
          <div><span>01</span><p>Product goal</p></div>
          <h2>{study.goal}</h2>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><span>02</span><h2>Engineering decisions</h2></div>
          <div className={styles.decisionGrid}>
            {study.decisions.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><span>03</span><h2>Quality signals</h2></div>
          <div className={styles.qualityGrid}>
            {study.quality.map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>
            ))}
          </div>
        </section>

        <section className={styles.next}>
          <p>Explore the implementation, architecture, and release details directly in the repository.</p>
          <div>
            <a href={study.source} target="_blank" rel="noreferrer">GitHub repository ↗</a>
            <Link href="/#work">More projects →</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
