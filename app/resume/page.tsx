import type { Metadata } from "next";
import Link from "next/link";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume — Abdulrahman Hajar",
  description:
    "Abdulrahman Hajar — Software Engineer and Full-Stack Developer building production-ready web, backend, AI-assisted, mobile, and interactive systems.",
  alternates: { canonical: "/resume/" },
};

const skills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "HTML5",
  "CSS3",
  "Accessibility",
  "PWA",
  "Node.js",
  "Express 5",
  "Zod",
  "REST APIs",
  "GraphQL",
  "WebSockets",
  "gRPC",
  "OpenAPI",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Mongoose",
  "Redis",
  "BullMQ",
  "FastAPI",
  "Strawberry GraphQL",
  "Flutter",
  "Flame Engine",
  "WebGL",
  "Three.js",
  "Framer Motion",
  "LLM Integrations",
  "MCP Workflows",
  "Jest",
  "Supertest",
  "Docker",
  "Docker Compose",
  "CI/CD",
  "Security",
  "Observability",
];

const projects = [
  {
    name: "Eventify",
    description:
      "Production-oriented event platform with PostgreSQL/Prisma, Redis caching and rate limits, BullMQ jobs, durable outbox workflows, metrics, health/readiness checks, secure auth, and PWA support.",
    href: "/work/eventify/",
  },
  {
    name: "BookHaven",
    description:
      "Full-stack bookstore with Next.js, Express, MongoDB, JWT auth/RBAC, cart and wishlist, reviews, concurrency-safe checkout, inventory handling, orders, admin workflows, and API tests.",
    href: "/work/bookhaven/",
  },
  {
    name: "FitFlow",
    description:
      "Next.js fitness PWA with personalized plans, guided workout intervals, weekly progress, responsive accessibility, and offline-ready behavior.",
    href: "/work/fitflow/",
  },
  {
    name: "Venues API",
    description:
      "Express 5 + Zod 4 REST API with strict validation, layered architecture, centralized predictable errors, persistence, UUIDs, and service plus HTTP contract tests.",
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
          <Link href="/#work">View work</Link>
          <a href="/resume.html" target="_blank" rel="noreferrer">Printable résumé ↗</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Resume · Software Engineering</p>
          <h1>Abdulrahman Hajar</h1>
          <p className={styles.lede}>
            Software engineer and full-stack developer building production-ready product experiences and systems across frontend, backend, APIs, data, testing, deployment, AI-assisted workflows, and interactive engineering.
          </p>
        </div>
        <aside className={styles.snapshot} aria-label="Professional snapshot">
          <div><span>Role</span><strong>Software Engineer · Full-Stack Developer</strong></div>
          <div><span>Education</span><strong>Computer Engineering · Nişantaşı University</strong></div>
          <div><span>Based in</span><strong>Istanbul, Türkiye</strong></div>
          <div><span>GitHub</span><a href="https://github.com/rahman-997" target="_blank" rel="noreferrer">rahman-997 ↗</a></div>
          <div><span>LinkedIn</span><a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">Connect ↗</a></div>
        </aside>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>01</span><h2>Profile</h2></div>
          <p className={styles.profile}>
            I design and build complete software systems with a production mindset. My work combines full-stack TypeScript development, accessible product UI, backend and API architecture, secure data flows, real-time systems, automated testing, observability, CI/CD, and modern deployment. I also explore mobile, AI-assisted, and interactive-system architecture through Flutter, FastAPI, WebSockets, WebGL, and agentic workflows.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>02</span><h2>Education</h2></div>
          <div className={styles.projects}>
            <article className={styles.project}>
              <h3>Computer Engineering — Nişantaşı University</h3>
              <p>Undergraduate student in Istanbul, Türkiye, building practical engineering experience through full-stack, backend, mobile, AI, and interactive software projects.</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>03</span><h2>Core skills</h2></div>
          <div className={styles.skills}>
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>04</span><h2>Selected work</h2></div>
          <div className={styles.projects}>
            {projects.map((project) => (
              <article className={styles.project} key={project.name}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <Link href={project.href}>Case study →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>05</span><h2>Advanced systems work</h2></div>
          <div className={styles.projects}>
            <article className={styles.project}>
              <h3>AI Doodles</h3>
              <p>Multimodal generative-AI system architecture for children using Flutter + Flame, real-time WebSockets, FastAPI, Strawberry GraphQL, Redis-backed similarity workflows, 3D rendering pipelines, and pose-detection concepts.</p>
            </article>
            <article className={styles.project}>
              <h3>Abdulrahman-OS-v29</h3>
              <p>Interactive portfolio concept inspired by terminal and operating-system interfaces, featuring simulated boot flows, custom commands, glassmorphism, and animated 3D experiences.</p>
            </article>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>Portfolio résumé · Abdulrahman Hajar · 2026</p>
        <Link href="/">Back to portfolio ↑</Link>
      </footer>
    </main>
  );
}
