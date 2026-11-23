import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE_LINKS, PROJECT_LIST } from "../portfolio-data";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Résumé — Abdulrahman Hajar | Frontend Engineer & UI/UX Designer",
  description:
    "Recruiter-ready résumé for Abdulrahman Hajar: frontend-focused software engineer building accessible React and Next.js products, multilingual interfaces, and full-stack systems.",
  alternates: { canonical: "/resume/" },
};

const skills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Responsive Design", "Accessibility", "RTL / i18n", "PWA", "Node.js", "Express 5", "REST APIs", "GraphQL", "WebSockets", "gRPC", "OpenAPI", "Zod",
  "PostgreSQL", "Prisma", "MongoDB", "Mongoose", "Redis", "BullMQ",
  "Jest", "Supertest", "Docker", "GitHub Actions", "CI/CD", "Security", "Observability",
  "AI / LLM / MCP", "FastAPI", "Flutter",
] as const;

const featuredOrder = ["fitflow", "mizan", "bookhaven", "eventify", "venues-api"];
const featuredProjects = [...PROJECT_LIST].sort((a,b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug));

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio">
          <span>AH</span><strong>Abdulrahman Hajar</strong>
        </Link>
        <div className={styles.headerActions}>
          <Link href="/#work">Selected work</Link>
          <a href="/Abdulrahman-Hajar-Frontend-Resume.html" target="_blank" rel="noreferrer">Frontend print view ↗</a>
          <a href="/Abdulrahman-Hajar-Frontend-Resume.pdf" download>Download Frontend CV ↓</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>FRONTEND ENGINEER · UI/UX DESIGNER · FULL-STACK DEVELOPER</p>
          <h1>Abdulrahman Hajar</h1>
          <p className={styles.lede}>
            Frontend-focused software engineer and Computer Engineering student creating responsive React and Next.js products, accessible UI/UX, multilingual RTL interfaces, and reliable full-stack experiences.
          </p>
        </div>
        <aside className={styles.snapshot} aria-label="Professional snapshot">
          <div><span>Role</span><strong>Frontend Engineer · UI/UX Designer · Full-Stack Developer</strong></div>
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
            Frontend-focused engineer creating responsive, accessible products with React, Next.js, TypeScript and thoughtful interaction design. Selected work demonstrates multilingual RTL interfaces, dashboards, PWAs, and the full-stack architecture, testing and operational discipline behind them.
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
          <div className={styles.sectionLabel}><span>04</span><h2>Featured product & engineering work</h2></div>
          <div className={styles.projects}>
            {featuredProjects.map((project) => (
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
        <p>Abdulrahman Hajar · Frontend Engineer · UI/UX Designer · Full-Stack Developer · Istanbul, Türkiye</p>
        <Link href="/">Back to portfolio ↑</Link>
      </footer>
    </main>
  );
}
