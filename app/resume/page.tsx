import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE_LINKS, PROJECT_LIST } from "../portfolio-data";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Résumé — Abdulrahman Hajar | Software Engineer",
  description:
    "Recruiter-ready résumé for Abdulrahman Hajar: Software Engineer, Full-Stack Developer, and builder of AI & interactive systems; Computer Engineering student in Istanbul.",
  alternates: { canonical: "/resume/" },
};

const skills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express 5", "REST APIs", "GraphQL", "WebSockets", "gRPC", "OpenAPI", "Zod",
  "PostgreSQL", "Prisma", "MongoDB", "Mongoose", "Redis", "BullMQ",
  "Jest", "Supertest", "Docker", "GitHub Actions", "CI/CD", "Security", "Observability", "Accessibility", "PWA",
  "AI / LLM / MCP", "FastAPI", "Flutter",
] as const;

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio">
          <span>AH</span><strong>Abdulrahman Hajar</strong>
        </Link>
        <div className={styles.headerActions}>
          <Link href="/#work">Selected work</Link>
          <a href="/resume.html" target="_blank" rel="noreferrer">Print view ↗</a>
          <a href="/Abdulrahman-Hajar-Resume.pdf" download>Download PDF ↓</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>SOFTWARE ENGINEER · FULL-STACK DEVELOPER · AI & INTERACTIVE SYSTEMS</p>
          <h1>Abdulrahman Hajar</h1>
          <p className={styles.lede}>
            Software engineer and Computer Engineering student building complete production software systems across frontend, backend, APIs, data, asynchronous workflows, testing, security, reliability, AI integrations, interactive systems, and deployment.
          </p>
        </div>
        <aside className={styles.snapshot} aria-label="Professional snapshot">
          <div><span>Role</span><strong>Software Engineer · Full-Stack Developer · AI & Interactive Systems</strong></div>
          <div><span>Education</span><strong>Computer Engineering · Nişantaşı University</strong></div>
          <div><span>Location</span><strong>Istanbul, Türkiye</strong></div>
          <div><span>GitHub</span><a href={PROFILE_LINKS.github} target="_blank" rel="noreferrer">github.com/rahman-997 ↗</a></div>
          <div><span>LinkedIn</span><a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn profile ↗</a></div>
        </aside>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>01</span><h2>Profile</h2></div>
          <p className={styles.profile}>
            Product-minded engineer with hands-on work across TypeScript interfaces, backend APIs, relational and document data, caching, queues, authentication, validation, automated tests, runtime health, security checks, CI/CD, AI/LLM integrations, interactive systems, and production deployment. I focus on clear boundaries, reliable failure handling, maintainable systems, and evidence-backed delivery.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>02</span><h2>Education</h2></div>
          <div className={styles.education}>
            <div><h3>Computer Engineering</h3><p>Nişantaşı University · Istanbul, Türkiye</p></div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>03</span><h2>Technical capabilities</h2></div>
          <div className={styles.skills}>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>04</span><h2>Selected engineering work</h2></div>
          <div className={styles.projects}>
            {PROJECT_LIST.map((project) => (
              <article className={styles.project} key={project.name}>
                <div><h3>{project.name}</h3><small>{project.label}</small></div>
                <p>{project.summary}</p>
                <Link href={`/work/${project.slug}/`}>Case study →</Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>Abdulrahman Hajar · Software Engineer · Full-Stack Developer · AI & Interactive Systems · Istanbul, Türkiye</p>
        <Link href="/">Back to portfolio ↑</Link>
      </footer>
    </main>
  );
}
