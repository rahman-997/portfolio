import type { Metadata } from "next";
import Link from "next/link";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume — Abdulrahman Hajar | Software Engineer",
  description:
    "Resume of Abdulrahman Hajar, a Software Engineer and Computer Engineering student focused on full-stack products, backend APIs, data systems, production engineering, and AI-assisted workflows.",
  alternates: { canonical: "/resume/" },
};

const skills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express 5",
  "REST APIs", "GraphQL", "WebSockets", "gRPC", "OpenAPI", "Zod",
  "PostgreSQL", "Prisma", "MongoDB", "Mongoose", "Redis", "BullMQ",
  "Jest", "Supertest", "Docker", "Docker Compose", "GitHub Actions", "CI/CD",
  "Security", "Observability", "Accessibility", "PWA", "FastAPI", "Flutter",
  "WebGL", "Three.js", "LLM Integrations", "MCP Workflows",
];

const projects = [
  {
    name: "Eventify",
    role: "Distributed product system",
    description:
      "Built around PostgreSQL/Prisma, Redis caching and rate limits, BullMQ background jobs, durable outbox workflows, secure authentication, metrics, health/readiness checks, request correlation, PWA delivery, and automated security gates.",
    href: "/work/eventify/",
  },
  {
    name: "BookHaven",
    role: "Full-stack commerce",
    description:
      "Next.js + Express + MongoDB bookstore with JWT authentication, RBAC, catalog/search, cart, wishlist, reviews, checkout, orders, inventory workflows, admin operations, validation, and API tests.",
    href: "/work/bookhaven/",
  },
  {
    name: "FitFlow",
    role: "Product-focused PWA",
    description:
      "Installable Next.js fitness experience with personalized planning, guided workout intervals, weekly progress, device-local persistence, accessibility, responsive interaction design, and offline-ready behavior.",
    href: "/work/fitflow/",
  },
  {
    name: "Venues API",
    role: "Backend service",
    description:
      "Express 5 + TypeScript + Zod REST API demonstrating layered architecture, strict body/query/param validation, centralized errors, UUID resources, persistence boundaries, service tests, and HTTP contract tests.",
    href: "/work/venues-api/",
  },
] as const;

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio">
          <span>AH</span>
          <strong>Abdulrahman Hajar</strong>
        </Link>
        <div className={styles.headerActions}>
          <Link href="/#work">Selected work</Link>
          <a href="/Abdulrahman-Hajar-Resume.pdf" download>Download PDF ↓</a>
          <a href="/resume.html" target="_blank" rel="noreferrer">Print view ↗</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Software Engineering · Full-Stack · Backend Systems</p>
          <h1>Abdulrahman Hajar</h1>
          <p className={styles.lede}>
            Software engineer and Computer Engineering student building complete products across frontend, backend, APIs, data, asynchronous workflows, testing, security, observability, and production deployment.
          </p>
        </div>
        <aside className={styles.snapshot} aria-label="Professional snapshot">
          <div><span>Role</span><strong>Software Engineer · Full-Stack Developer</strong></div>
          <div><span>Education</span><strong>Computer Engineering · Nişantaşı University</strong></div>
          <div><span>Location</span><strong>Istanbul, Türkiye</strong></div>
          <div><span>Focus</span><strong>Full-Stack · Backend · Systems · AI</strong></div>
          <div><span>GitHub</span><a href="https://github.com/rahman-997" target="_blank" rel="noreferrer">rahman-997 ↗</a></div>
          <div><span>LinkedIn</span><a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">Profile ↗</a></div>
        </aside>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>01</span><h2>Profile</h2></div>
          <p className={styles.profile}>
            Product-minded engineer with a strong TypeScript foundation and hands-on work across UI, API architecture, persistence, caching, queues, authentication, validation, testing, health/readiness, CI/CD, and deployment. I value clear boundaries, secure data flows, predictable failure handling, and evidence-based delivery.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>02</span><h2>Education</h2></div>
          <div className={styles.projects}>
            <article className={styles.project}>
              <div><h3>Computer Engineering</h3><small>Nişantaşı University · Istanbul</small></div>
              <p>Undergraduate study combined with practical software engineering through production-oriented web, backend, data, mobile, AI, and interactive projects.</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>03</span><h2>Technical capabilities</h2></div>
          <div className={styles.skills}>
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>04</span><h2>Project evidence</h2></div>
          <div className={styles.projects}>
            {projects.map((project) => (
              <article className={styles.project} key={project.name}>
                <div><h3>{project.name}</h3><small>{project.role}</small></div>
                <p>{project.description}</p>
                <Link href={project.href}>Case study →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>05</span><h2>Engineering interests</h2></div>
          <div className={styles.projects}>
            <article className={styles.project}>
              <div><h3>Backend & system design</h3><small>Primary growth direction</small></div>
              <p>Service architecture, data modeling, distributed workflows, queues, caching, API contracts, security, observability, failure recovery, and production operations.</p>
            </article>
            <article className={styles.project}>
              <div><h3>AI & interactive systems</h3><small>Extended exploration</small></div>
              <p>LLM integrations, MCP workflows, FastAPI, real-time communication, Flutter, WebGL/Three.js, and multimodal product architecture.</p>
            </article>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>Abdulrahman Hajar · Software Engineer · Istanbul, Türkiye</p>
        <Link href="/">Back to portfolio ↑</Link>
      </footer>
    </main>
  );
}
