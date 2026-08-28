import Link from "next/link";
import styles from "./home.module.css";

const Arrow = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Github = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.57.1.78-.25.78-.55v-2.24c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.3-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.5 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

const LinkedIn = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.4 7.3H1.8V22h3.6V7.3ZM3.6 2C2.4 2 1.4 3 1.4 4.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2S4.8 2 3.6 2ZM22.6 13.6c0-4.4-2.3-6.5-5.4-6.5-2.5 0-3.6 1.4-4.2 2.3V7.3H9.4V22H13v-7.3c0-1.9.4-3.8 2.8-3.8 2.3 0 2.4 2.2 2.4 4V22h3.6v-8.4h.8Z" />
  </svg>
);

const projects = [
  {
    index: "01",
    name: "Eventify",
    label: "Distributed event platform",
    thesis: "Reliable booking flows beyond the happy path.",
    summary:
      "A full-stack event system combining secure authentication, organizer workflows, bookings, waitlists, PostgreSQL durability, Redis coordination, BullMQ workers, observability, and operational health checks.",
    stack: ["TypeScript", "Express 5", "PostgreSQL", "Prisma", "Redis", "BullMQ"],
    proof: ["Transactional booking state", "PostgreSQL outbox", "Worker + queue coordination", "Health, readiness & metrics"],
    caseStudy: "/work/eventify/",
    live: "https://eventify-web.onrender.com",
    source: "https://github.com/rahman-997/eventify",
    image: "/projects/eventify-cover.jpg",
    visual: "product",
  },
  {
    index: "02",
    name: "BookHaven",
    label: "Full-stack commerce system",
    thesis: "A bookstore designed as both a product and an operating system.",
    summary:
      "A complete commerce flow covering discovery, authentication, role-based access, cart, wishlist, reviews, checkout, orders, inventory, and administration across Next.js and Express.",
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Zod"],
    proof: ["Customer + admin flows", "JWT + RBAC", "Validated API boundary", "Order & inventory behavior"],
    caseStudy: "/work/bookhaven/",
    live: "https://bookbookhaven-free.onrender.com",
    source: "https://github.com/rahman-997/bookbookhaven",
    image: "/projects/bookhaven-cover.jpg",
    visual: "product",
  },
  {
    index: "03",
    name: "FitFlow",
    label: "Installable fitness PWA",
    thesis: "A local-first training experience built for everyday use.",
    summary:
      "A responsive fitness product with personalized plans, guided intervals, weekly progress, local persistence, accessibility, installability, and offline-ready behavior.",
    stack: ["React", "TypeScript", "PWA", "Web APIs", "Modern CSS"],
    proof: ["Local-first progress", "Installable experience", "Reduced-motion support", "Responsive workout flows"],
    caseStudy: "/work/fitflow/",
    live: "https://fitflow-gym-online.netlify.app",
    source: "https://github.com/rahman-997/fitflow-gym",
    image: null,
    visual: "pwa",
  },
  {
    index: "04",
    name: "Venues API",
    label: "Backend engineering · REST",
    thesis: "Small surface area. Strict engineering boundaries.",
    summary:
      "An Express 5 REST service with TypeScript, Zod 4 validation, layered route/controller/service boundaries, centralized errors, UUID resources, persistence, and contract-level tests.",
    stack: ["Node.js", "Express 5", "TypeScript", "Zod 4", "REST"],
    proof: ["Layered architecture", "Centralized error handling", "Validated inputs", "HTTP contract tests"],
    caseStudy: "/work/venues-api/",
    live: "https://venues-api-rahman.onrender.com/health",
    source: "https://github.com/rahman-997/venues-api",
    image: null,
    visual: "api",
  },
] as const;

const layers = [
  ["01", "Interface", "React · Next.js · responsive UI · accessibility"],
  ["02", "Application", "Node.js · Express · validation · auth · domain logic"],
  ["03", "Data", "PostgreSQL · Prisma · MongoDB · Redis · persistence boundaries"],
  ["04", "Async", "Queues · workers · outbox patterns · background processing"],
  ["05", "Delivery", "Testing · security checks · CI/CD · deployment · runtime health"],
] as const;

const technologies = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Redis",
  "BullMQ",
  "Zod",
  "REST",
  "PWA",
  "GitHub Actions",
  "Docker",
  "Netlify",
  "Render",
] as const;

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">Skip to content</a>

      <header className={styles.header}>
        <a className={styles.identity} href="#top" aria-label="Abdulrahman Hajar — home">
          <span className={styles.monogram}>AH</span>
          <span>
            <strong>Abdulrahman Hajar</strong>
            <small>Software Engineer</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="#about">About</a>
          <Link href="/resume/">Résumé</Link>
        </nav>

        <a className={styles.headerAction} href="https://github.com/rahman-997" target="_blank" rel="noreferrer">
          GitHub <Arrow size={14} />
        </a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>SOFTWARE ENGINEER · FULL-STACK DEVELOPER · AI & INTERACTIVE SYSTEMS</p>
            <h1>
              I build software as
              <span>systems, not screens.</span>
            </h1>
            <p className={styles.heroLead}>
              From product interface to API boundaries, data, background work, testing, security, and deployment — I build the whole path that makes software usable and dependable.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#work">Explore selected work <Arrow /></a>
              <Link className={styles.secondaryAction} href="/resume/">View résumé</Link>
            </div>
          </div>

          <aside className={styles.heroProof} aria-label="Profile proof points">
            <div className={styles.proofHeader}>
              <span>ENGINEERING PROFILE</span>
              <span className={styles.status}><i /> Istanbul, Türkiye</span>
            </div>
            <div className={styles.proofBody}>
              <p>Current focus</p>
              <strong>Full-stack products with production-minded backend depth.</strong>
              <div className={styles.proofRows}>
                <div><span>Frontend</span><b>React · Next.js · TypeScript</b></div>
                <div><span>Backend</span><b>Node.js · Express · REST</b></div>
                <div><span>Data</span><b>PostgreSQL · MongoDB · Redis</b></div>
                <div><span>Systems</span><b>Queues · CI/CD · reliability</b></div>
              </div>
            </div>
            <div className={styles.proofFooter}>
              <span>Computer Engineering</span>
              <strong>Nişantaşı University</strong>
            </div>
          </aside>
        </section>

        <section className={styles.signalStrip} aria-label="Portfolio evidence">
          <span>4 featured systems</span>
          <span>Live deployments</span>
          <span>Source available</span>
          <span>Architecture case studies</span>
          <span>Recruiter-ready résumé</span>
        </section>

        <section className={styles.work} id="work">
          <div className={styles.sectionIntro}>
            <p>01 / SELECTED WORK</p>
            <div>
              <h2>Proof, not portfolio decoration.</h2>
              <p>Each project is presented through the engineering decisions behind it: system boundaries, failure modes, data, delivery, and the live implementation.</p>
            </div>
          </div>

          <div className={styles.projectStack}>
            {projects.map((project) => (
              <article className={styles.project} key={project.name}>
                <div className={styles.projectRail}>
                  <span>{project.index}</span>
                  <small>{project.label}</small>
                </div>

                <div className={styles.projectNarrative}>
                  <h3>{project.name}</h3>
                  <h4>{project.thesis}</h4>
                  <p>{project.summary}</p>
                  <div className={styles.projectProof}>
                    {project.proof.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <div className={styles.projectLinks}>
                    <Link href={project.caseStudy}>Read case study <Arrow size={15} /></Link>
                    <a href={project.live} target="_blank" rel="noreferrer">Live system <Arrow size={15} /></a>
                    <a href={project.source} target="_blank" rel="noreferrer"><Github size={16} /> Source</a>
                  </div>
                </div>

                <div className={styles.projectEvidence}>
                  {project.image ? (
                    <div className={styles.productFrame}>
                      <div className={styles.browserBar}><i /><i /><i /><span>{project.name.toLowerCase()}.system</span></div>
                      <div className={styles.productImage} style={{ backgroundImage: `url(${project.image})` }} aria-hidden="true" />
                    </div>
                  ) : project.visual === "api" ? (
                    <div className={styles.apiFrame} aria-label="Venues API request flow illustration">
                      <div><span>REQUEST</span><code>GET /v1/venues</code></div>
                      <i>↓</i>
                      <div><span>VALIDATE</span><code>Zod schema</code></div>
                      <i>↓</i>
                      <div><span>CONTROLLER</span><code>HTTP boundary</code></div>
                      <i>↓</i>
                      <div><span>SERVICE</span><code>business logic</code></div>
                      <i>↓</i>
                      <div><span>RESPONSE</span><code>200 · JSON</code></div>
                    </div>
                  ) : (
                    <div className={styles.pwaFrame} aria-label="FitFlow local-first product flow illustration">
                      <div className={styles.phoneShell}>
                        <span className={styles.phoneTop} />
                        <p>WEEKLY TRAINING</p>
                        <strong>3 sessions</strong>
                        <div className={styles.progress}><span /></div>
                        <small>Progress saved locally</small>
                      </div>
                      <div className={styles.pwaNotes}>
                        <span>INSTALLABLE</span>
                        <span>OFFLINE-READY</span>
                        <span>ACCESSIBLE</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.stackLine}>
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.systems} id="systems">
          <div className={styles.sectionIntro}>
            <p>02 / SYSTEM THINKING</p>
            <div>
              <h2>I follow the request all the way through.</h2>
              <p>Interface quality matters, but so do ownership, validation, persistence, asynchronous work, failure handling, verification, and the path to production.</p>
            </div>
          </div>

          <div className={styles.architecture}>
            <div className={styles.architectureIntro}>
              <span>REFERENCE FLOW</span>
              <h3>Product → API → Data → Async → Delivery</h3>
              <p>A compact map of the layers I consider when shaping a system.</p>
            </div>
            <div className={styles.layerList}>
              {layers.map(([number, title, text]) => (
                <div className={styles.layer} key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.engineeringGrid}>
            <article>
              <span>BOUNDARIES</span>
              <h3>Make responsibilities obvious.</h3>
              <p>Separate transport, validation, business rules, persistence, and background work so behavior stays reviewable and changeable.</p>
            </article>
            <article>
              <span>FAILURE MODES</span>
              <h3>Design beyond success paths.</h3>
              <p>Consider retries, duplicate work, stale state, dependency failure, authorization, partial completion, and degraded runtime behavior.</p>
            </article>
            <article>
              <span>VERIFICATION</span>
              <h3>Turn confidence into checks.</h3>
              <p>Typechecking, linting, tests, build verification, security checks, runtime probes, and live QA are part of delivery — not afterthoughts.</p>
            </article>
          </div>
        </section>

        <section className={styles.stackSection} id="stack">
          <div className={styles.stackHeading}>
            <p>03 / TECHNOLOGY</p>
            <h2>Tools chosen around the system.</h2>
          </div>
          <div className={styles.techCloud}>
            {technologies.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}
          </div>
        </section>

        <section className={styles.about} id="about">
          <div className={styles.aboutHeading}>
            <p>04 / ABOUT</p>
            <h2>Engineering breadth with product judgment.</h2>
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.aboutLead}>I&apos;m Abdulrahman Hajar, a Software Engineer and Computer Engineering student at Nişantaşı University in Istanbul.</p>
            <p>I work across frontend, backend, APIs, databases, asynchronous workflows, testing, security, deployment, AI integrations, and interactive systems. The goal is not to collect technologies — it is to understand enough of the system to make better engineering decisions.</p>
            <div className={styles.education}>
              <span>EDUCATION</span>
              <div>
                <strong>Computer Engineering</strong>
                <p>Nişantaşı University · Istanbul, Türkiye</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.resumeCallout}>
          <div>
            <span>RÉSUMÉ</span>
            <h2>A concise recruiter view of the same engineering story.</h2>
          </div>
          <div className={styles.resumeActions}>
            <Link className={styles.primaryAction} href="/resume/">View web résumé <Arrow /></Link>
            <a className={styles.secondaryAction} href="/Abdulrahman-Hajar-Resume.pdf" download>Download PDF</a>
          </div>
        </section>

        <section className={styles.contact}>
          <p>05 / CONTACT</p>
          <h2>Looking for evidence? Start with the work.</h2>
          <p>Review the live systems, inspect the source, or connect with me for software engineering opportunities and serious product work.</p>
          <div className={styles.contactLinks}>
            <a href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github /> GitHub <Arrow size={14} /></a>
            <a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn <Arrow size={14} /></a>
            <Link href="/resume/">Résumé <Arrow size={14} /></Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <span className={styles.monogram}>AH</span>
          <span><strong>Abdulrahman Hajar</strong><small>Software Engineer · Istanbul, Türkiye</small></span>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
