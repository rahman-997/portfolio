import Link from "next/link";
import { CAPABILITIES, PROJECTS, TOOLKIT } from "./data";
import styles from "./home.module.css";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <div className={styles.siteShell}>
      <a className={styles.skip} href="#main">Skip to content</a>

      <header className={styles.header}>
        <a className={styles.identity} href="#top" aria-label="Abdulrahman Hajar — home">
          <span className={styles.monogram}>AH</span>
          <span><strong>Abdulrahman Hajar</strong><small>Software Engineer</small></span>
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="#about">About</a>
        </nav>
        <Link className={styles.headerCta} href="/resume/">Résumé <Arrow /></Link>
      </header>

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>SOFTWARE ENGINEER · FULL-STACK DEVELOPER · AI & INTERACTIVE SYSTEMS</p>
            <h1>Engineering products from <em>interface</em> to <em>runtime</em>.</h1>
            <p className={styles.heroLead}>
              I build software across frontend, backend, APIs, data, asynchronous workflows, testing, security and deployment — with the product experience and the system behavior designed together.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="#work">View selected work <span>↓</span></a>
              <a className={styles.secondary} href="https://github.com/rahman-997" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              <a className={styles.secondary} href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            </div>
            <div className={styles.heroFacts}>
              <div><span>Based in</span><strong>Istanbul, Türkiye</strong></div>
              <div><span>Education</span><strong>Computer Engineering · Nişantaşı University</strong></div>
              <div><span>Focus</span><strong>Product engineering · backend systems · AI workflows</strong></div>
            </div>
          </div>

          <aside className={styles.systemCard} aria-label="Engineering scope diagram">
            <div className={styles.systemTop}>
              <span>system.map</span>
              <span className={styles.status}><i /> production-minded</span>
            </div>
            <div className={styles.systemCanvas}>
              <div className={`${styles.node} ${styles.nodeUi}`}><span>01</span><strong>INTERFACE</strong><small>React / Next.js</small></div>
              <div className={`${styles.node} ${styles.nodeApi}`}><span>02</span><strong>API</strong><small>Node / Express</small></div>
              <div className={`${styles.node} ${styles.nodeData}`}><span>03</span><strong>DATA</strong><small>Postgres / Mongo / Redis</small></div>
              <div className={`${styles.node} ${styles.nodeAsync}`}><span>04</span><strong>ASYNC</strong><small>Queues / workers</small></div>
              <div className={`${styles.node} ${styles.nodeOps}`}><span>05</span><strong>DELIVERY</strong><small>CI / health / deploy</small></div>
              <svg className={styles.lines} viewBox="0 0 600 440" role="img" aria-label="Connections between interface, API, data, asynchronous processing and delivery">
                <path d="M115 108 C230 108 220 210 300 210 S420 118 500 118" />
                <path d="M300 210 C300 300 180 285 135 340" />
                <path d="M300 210 C350 250 430 260 480 340" />
              </svg>
            </div>
            <div className={styles.systemFooter}><span>request → state → work → evidence</span><strong>whole-system thinking</strong></div>
          </aside>
        </section>

        <section className={styles.proofStrip} aria-label="Portfolio proof points">
          <div><span>04</span><strong>primary projects</strong></div>
          <div><span>04</span><strong>case studies</strong></div>
          <div><span>Live</span><strong>deployments + source</strong></div>
          <div><span>CI</span><strong>quality gates</strong></div>
        </section>

        <section className={styles.work} id="work">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionIndex}>01 / SELECTED WORK</p>
            <h2>Software that exposes the engineering, not just the screenshots.</h2>
            <p>Each project links the product surface to architecture decisions, reliability constraints, source code and a live system.</p>
          </div>

          <div className={styles.projectStack}>
            {PROJECTS.map((project, index) => (
              <article className={`${styles.project} ${index === 0 ? styles.projectFeatured : ""}`} key={project.slug}>
                <div className={styles.projectHeader}>
                  <span className={styles.projectOrder}>{project.order}</span>
                  <p>{project.category}</p>
                  <span className={styles.projectRole}>{project.role}</span>
                </div>
                <div className={styles.projectGrid}>
                  <div className={styles.projectMain}>
                    <h3>{project.name}</h3>
                    <h4>{project.headline}</h4>
                    <p>{project.summary}</p>
                    <div className={styles.projectLinks}>
                      <Link href={`/work/${project.slug}/`}>Read case study <Arrow /></Link>
                      <a href={project.live} target="_blank" rel="noreferrer">Live system <Arrow /></a>
                      <a href={project.source} target="_blank" rel="noreferrer">Source <Arrow /></a>
                    </div>
                  </div>
                  <div className={styles.projectEvidence}>
                    {project.cover ? (
                      <div className={styles.cover} style={{ backgroundImage: `url(${project.cover})` }} aria-hidden="true" />
                    ) : (
                      <div className={styles.apiMock} aria-hidden="true">
                        <div><span>GET</span><code>/health</code><b>200</b></div>
                        <pre>{`{\n  "status": "healthy",\n  "service": "venues-api",\n  "contract": "validated"\n}`}</pre>
                      </div>
                    )}
                    <div className={styles.stack}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.systems} id="systems">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionIndex}>02 / ENGINEERING CAPABILITIES</p>
            <h2>Capabilities organized by system responsibility.</h2>
            <p>No skill-cloud. The stack is grouped by the job each layer performs in a production system.</p>
          </div>
          <div className={styles.capabilityGrid}>
            {CAPABILITIES.map((capability) => (
              <article key={capability.title}>
                <span>{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
                <div>{capability.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.architecture} aria-labelledby="architecture-title">
          <div className={styles.architectureCopy}>
            <p className={styles.sectionIndex}>03 / SYSTEM THINKING</p>
            <h2 id="architecture-title">The interesting part starts where the happy path ends.</h2>
            <p>I care about what happens when requests retry, state diverges, workers restart, a dependency is slow, a role is unauthorized, or a deployment needs evidence that it is actually healthy.</p>
          </div>
          <div className={styles.architectureFlow}>
            {[
              ["INPUT", "Validate external data before it reaches business logic"],
              ["STATE", "Choose the durable source of truth deliberately"],
              ["WORK", "Separate synchronous response paths from asynchronous side effects"],
              ["FAILURE", "Make errors explicit, bounded and observable"],
              ["PROOF", "Use tests, CI, health checks and live verification as delivery evidence"],
            ].map(([title, body], index) => (
              <div key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.toolkit} aria-labelledby="toolkit-title">
          <p className={styles.sectionIndex}>04 / TOOLKIT</p>
          <h2 id="toolkit-title">Technologies used across the work.</h2>
          <div>{TOOLKIT.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className={styles.about} id="about">
          <div>
            <p className={styles.sectionIndex}>05 / ABOUT</p>
            <h2>Computer Engineering student building across the full software lifecycle.</h2>
          </div>
          <div className={styles.aboutBody}>
            <p>I&apos;m Abdulrahman Hajar, based in Istanbul and studying Computer Engineering at Nişantaşı University. My work spans interfaces, APIs, databases, background processing, testing, security, CI/CD, deployment and AI-assisted product workflows.</p>
            <p>I prefer systems with clear boundaries, explicit contracts, useful observability and interfaces that connect product quality with engineering quality.</p>
            <dl>
              <div><dt>Primary positioning</dt><dd>Software Engineer · Full-Stack Developer</dd></div>
              <div><dt>Extended focus</dt><dd>AI & Interactive Systems</dd></div>
              <div><dt>Education</dt><dd>Computer Engineering · Nişantaşı University</dd></div>
            </dl>
          </div>
        </section>

        <section className={styles.contact}>
          <p className={styles.sectionIndex}>06 / CONTACT</p>
          <h2>Looking for evidence of how I build?</h2>
          <p>Start with Eventify for backend/system depth, then compare the case studies with the live deployments and source repositories.</p>
          <div>
            <Link className={styles.primary} href="/work/eventify/">Open Eventify case study <Arrow /></Link>
            <Link className={styles.secondary} href="/resume/">View résumé <Arrow /></Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <span className={styles.monogram}>AH</span>
          <p><strong>Abdulrahman Hajar</strong><small>Software Engineer · Istanbul, Türkiye</small></p>
        </div>
        <div>
          <a href="https://github.com/rahman-997" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <Link href="/resume/">Résumé ↗</Link>
        </div>
      </footer>
    </div>
  );
}
