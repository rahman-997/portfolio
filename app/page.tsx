import Link from "next/link";
import Image from "next/image";
import BrandMark from "./brand-mark";
import { PROFILE_LINKS, PROJECT_LIST } from "./portfolio-data";
import styles from "./home.module.css";
import AIAtlas from "./ai-atlas";
import MobileNav from "./mobile-nav";
import NavMoreControl from "./nav-more-control";
import ProjectExplorer from "./project-explorer";
import BriefStudio from "./brief-studio";
import ProjectCompare from "./project-compare";
import StackLens from "./stack-lens";
import InterfaceLab from "./interface-lab";

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

const layers = [
  ["01", "Interface", "React · Next.js · responsive UI · accessibility"],
  ["02", "Application", "Node.js · Express · validation · auth · domain logic"],
  ["03", "Data", "PostgreSQL · Prisma · MongoDB · Redis · persistence boundaries"],
  ["04", "Async", "Queues · workers · outbox patterns · background processing"],
  ["05", "Delivery", "Testing · security checks · CI/CD · deployment · runtime health"],
] as const;

const technologies = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Redis",
  "Zod",
  "REST",
  "GraphQL",
  "WebSockets",
  "gRPC",
  "OpenAPI",
  "Docker",
  "GitHub Actions",
  "CI/CD",
  "AI / LLM / MCP",
  "FastAPI",
  "Flutter",
] as const;

const capabilities = [
  {
    number: "01",
    tag: "DESIGN + BUILD",
    title: "Product interfaces",
    description: "Purposeful, responsive experiences with clear user journeys, accessible components, and a consistent design language.",
    keywords: ["Design systems", "React / Next.js", "Accessibility"],
    href: "#work",
    link: "Explore product work",
  },
  {
    number: "02",
    tag: "FOUNDATIONS",
    title: "Backend & platforms",
    description: "Maintainable APIs and data workflows with explicit boundaries, validation, authentication, and failure-aware behavior.",
    keywords: ["API design", "Data modeling", "Reliability"],
    href: "#systems",
    link: "View system approach",
  },
  {
    number: "03",
    tag: "INTELLIGENT WORKFLOWS",
    title: "Automation & AI",
    description: "Automated workflows and practical AI integrations where the value is measurable in clarity, speed, or better user experiences.",
    keywords: ["Async workflows", "LLM integrations", "Tooling"],
    href: "#ai-lab",
    link: "Enter the AI Lab",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "Clarify the user, problem, constraints, and success criteria before choosing a stack.",
    output: "OUTCOME / CLEAR SCOPE",
  },
  {
    number: "02",
    title: "Architect",
    description: "Sketch interaction flows, data boundaries, responsibilities, and trade-offs.",
    output: "OUTCOME / SYSTEM MAP",
  },
  {
    number: "03",
    title: "Build",
    description: "Create the experience and core functionality in reviewable, testable increments.",
    output: "OUTCOME / WORKING PRODUCT",
  },
  {
    number: "04",
    title: "Verify & ship",
    description: "Check accessibility, security basics, build quality, and runtime behavior before handoff.",
    output: "OUTCOME / DELIVERY CHECKS",
  },
] as const;

const faqs = [
  {
    question: "Can I see the source code behind these projects?",
    answer: "Yes. The featured project cards link to their repositories and individual case studies, so you can inspect the implementation and technical decisions.",
  },
  {
    question: "Are the project previews actual app screenshots?",
    answer: "Some cover images are conceptual illustrations, clearly labeled as such. Use the live system and source links for actual functionality and implementation details.",
  },
  {
    question: "What kind of engineering work is highlighted here?",
    answer: "The portfolio focuses on full-stack product interfaces, APIs, data modeling, backend reliability, automation, and AI-assisted workflows.",
  },
  {
    question: "Why might a live demo take time to load?",
    answer: "Some showcased applications use free-tier hosting that can pause when idle. Their case studies and source repositories remain available independently.",
  },
] as const;

const solutionRoutes = [
  { number: "01", slug: "eventify", type: "BOOKINGS & OPERATIONS", title: "Booking that handles the hard cases.", summary: "Explore durable reservation state, waitlist promotion, and asynchronous workflows.", glyph: "→→" },
  { number: "02", slug: "bookhaven", type: "COMMERCE & PRODUCT", title: "A storefront with a real operating core.", summary: "Follow checkout, inventory, customer accounts, and protected admin actions.", glyph: "◈" },
  { number: "03", slug: "fitflow", type: "OFFLINE & MOBILE WEB", title: "An app that stays useful offline.", summary: "See local-first state, installability, and accessible training interactions.", glyph: "◎" },
  { number: "04", slug: "venues-api", type: "APIS & PLATFORM", title: "Small APIs. Clear engineering boundaries.", summary: "Inspect request validation, domain layers, predictable failures, and HTTP tests.", glyph: "{ }" },
] as const;

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">Skip to content</a>

      <header className={styles.header}>
        <a className={styles.identity} href="#top" aria-label="HAJAR — Abdulrahman Hajar home">
          <span className={styles.monogram}><BrandMark size={37} /></span>
          <span>
            <strong>Abdulrahman Hajar</strong>
            <small>Software Engineer</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#explorer">Explorer</a>
          <a href="#solutions">Solutions</a>
          <a href="#quality-lab">Quality</a>
          <a href="#brief-studio">Project brief</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <details className={styles.navMore} data-desktop-more>
            <NavMoreControl />
            <summary>More <span aria-hidden="true">⌄</span></summary>
            <div className={styles.navMorePanel}>
              <a href="#compare">Compare projects</a>
              <a href="#stack-lens">Stack lens</a>
              <a href="#interface-lab">UI lab</a>
              <a href="#expertise">Expertise</a>
              <a href="#systems">Systems</a>
              <a href="#decisions">Decisions</a>
              <a href="#process">Process</a>
              <a href="#stack">Stack</a>
              <a href="#faq">FAQ</a>
              <a href="#start-here">Start here</a>
              <Link href="/resume/">Résumé</Link>
            </div>
          </details>
        </nav>

        <MobileNav />

        <a className={styles.headerAction} href={PROFILE_LINKS.github} target="_blank" rel="noreferrer">
          GitHub <Arrow size={14} />
        </a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <div className={styles.heroTopline}><span>HAJAR / SELECTED ENGINEERING</span><span>ISTANBUL, TR · DIGITAL</span></div>
            <p className={styles.kicker}><span className={styles.kickerDot} /> SOFTWARE ENGINEER <span className={styles.kickerDivider}>/</span> FULL-STACK &amp; INTERACTIVE SYSTEMS</p>
            <h1>
              Design meets
              <span>engineering.</span>
            </h1>
            <p className={styles.heroLead}>
              Thoughtful digital products, backed by serious engineering. I connect elegant interfaces with reliable APIs, resilient data, automation, and the details that make software last.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#work">Explore selected work <Arrow /></a>
              <Link className={styles.secondaryAction} href="/resume/">View résumé</Link>
              <a className={styles.secondaryAction} href="#ai-lab">Explore AI Lab <Arrow size={16} /></a>
            </div>
          </div>

          <aside className={styles.heroProof} aria-label="Profile proof points">
            <div className={styles.proofSignature} aria-label="HAJAR abstract signature identity">
              <BrandMark size={112} />
              <div><strong>HAJAR</strong><span>ABSTRACT SIGNATURE</span><small>Engineering · Design · Systems</small></div>
            </div>
            <div className={styles.proofHeader}>
              <span>HAJAR / FIELD NOTES</span>
              <span className={styles.status}><i /> Istanbul, Türkiye</span>
            </div>
            <div className={styles.proofBody}>
              <p>Current focus</p>
              <strong>Full-stack products with production-minded backend systems depth.</strong>
              <div className={styles.proofRows}>
                <div><span>Product</span><b>React · Next.js · TypeScript</b></div>
                <div><span>Backend</span><b>Node.js · Express · APIs</b></div>
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
          <span><strong>{PROJECT_LIST.length.toString().padStart(2, "0")}</strong> Featured systems</span>
          <span><strong>↗</strong> Live deployments</span>
          <span><strong>{"</>"}</strong> Open source code</span>
          <span><strong>↳</strong> Architecture case studies</span>
          <span><strong>✳</strong> Recruiter-ready résumé</span>
        </section>

        <AIAtlas />

        <section className={styles.work} id="work">
          <div className={styles.sectionIntro}>
            <p>01 / SELECTED WORK</p>
            <div>
              <h2>Proof, not portfolio decoration.</h2>
              <p>Each project is presented through the engineering decisions behind it: system boundaries, failure modes, data, delivery, and the live implementation.</p>
            </div>
          </div>

          <div className={styles.projectStack}>
            {PROJECT_LIST.map((project) => (
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
                    <Link href={`/work/${project.slug}/`}>Read case study <Arrow size={15} /></Link>
                    <a href={project.live} target="_blank" rel="noreferrer">Live system <Arrow size={15} /></a>
                    <a href={project.source} target="_blank" rel="noreferrer"><Github size={16} /> Source</a>
                  </div>
                </div>

                <div className={styles.projectEvidence}>
                  {project.cover ? (
                    <figure className={styles.productFrame}>
                      <div className={styles.browserBar} aria-hidden="true"><i /><i /><i /><span>{project.name.toLowerCase()}.system</span></div>
                      <div className={styles.productViewport}>
                        <Image
                          src={project.cover}
                          alt={`${project.name} conceptual interface illustration`}
                          fill
                          sizes="(max-width: 800px) 100vw, (max-width: 1180px) 50vw, 600px"
                          loading="lazy"
                          className={styles.productImage}
                        />
                      </div>
                      <figcaption className={styles.productCaption}>Concept visual · not a live screenshot</figcaption>
                    </figure>
                  ) : project.visual === "api" ? (
                    <div className={styles.apiFrame} role="img" aria-label="Venues API request flow illustration">
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
                    <div className={styles.pwaFrame} role="img" aria-label="FitFlow local-first product flow illustration">
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

        <section className={styles.explorer} id="explorer" aria-labelledby="explorer-title">
          <div className={styles.explorerHeading}>
            <div>
              <p className={styles.sectionMarker}>02 / PROJECT EXPLORER</p>
              <h2 id="explorer-title">Find the work behind<br /><em>your next question.</em></h2>
            </div>
            <p>Less scrolling, more signal. Filter real case studies by focus area or search for the technology and problems you care about.</p>
          </div>
          <ProjectExplorer />
        </section>

        <section className={styles.compareSection} id="compare" aria-labelledby="compare-title">
          <div className={styles.lensSectionHeading}>
            <div>
              <p className={styles.sectionMarker}>NEW / COMPARISON DESK</p>
              <h2 id="compare-title">Two builds. <em>One closer look.</em></h2>
            </div>
            <p>Place any two of the featured systems side by side. Compare documented challenges, approaches, technology choices, and the evidence worth reviewing.</p>
          </div>
          <ProjectCompare />
        </section>

        <section className={styles.solutions} id="solutions" aria-labelledby="solutions-title">
          <div className={styles.solutionsHeader}>
            <div>
              <p className={styles.sectionMarker}>03 / SOLUTION ROUTES</p>
              <h2 id="solutions-title">Start with a problem.<br /><em>Follow a real system.</em></h2>
            </div>
            <p>Four ways to explore the same engineering mindset, each backed by an existing project. No invented client results or abstract promises.</p>
          </div>
          <div className={styles.solutionGrid}>
            {solutionRoutes.map((solution) => {
              const project = PROJECT_LIST.find(item => item.slug === solution.slug);
              if (!project) return null;
              return (
                <article className={styles.solutionCard} key={solution.slug}>
                  <div className={styles.solutionCardTop}><span>{solution.number} / {solution.type}</span><span>CASE STUDY</span></div>
                  <div className={styles.solutionGlyph} aria-hidden="true">{solution.glyph}</div>
                  <h3>{solution.title}</h3>
                  <p>{solution.summary}</p>
                  <div className={styles.solutionTech}>{project.stack.slice(0, 3).map(item => <span key={item}>{item}</span>)}</div>
                  <Link href={`/work/${solution.slug}/`}>Explore {project.name} <Arrow size={16}/></Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.expertise} id="expertise" aria-labelledby="expertise-title">
          <div className={styles.sectionIntro}>
            <p>04 / WHAT I BUILD</p>
            <div>
              <h2 id="expertise-title">Different disciplines.<br />One connected product.</h2>
              <p>From the first interaction to the last background job, I think about how each piece contributes to the whole.</p>
            </div>
          </div>
          <div className={styles.capabilityGrid}>
            {capabilities.map((capability) => (
              <article className={styles.capabilityCard} key={capability.number}>
                <div className={styles.capabilityTop}>
                  <span>{capability.tag}</span>
                  <span className={styles.capabilityNumber}>{capability.number} / 03</span>
                </div>
                <div className={styles.capabilityGraphic} aria-hidden="true">
                  <span className={styles.graphicOrb} />
                  <span className={styles.graphicLine} />
                  <span className={styles.graphicChip}>{capability.number === "01" ? "UI" : capability.number === "02" ? "API" : "AI"}</span>
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <div className={styles.capabilityKeywords}>
                  {capability.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
                </div>
                <a className={styles.capabilityLink} href={capability.href}>{capability.link} <Arrow size={16} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.systems} id="systems">
          <div className={styles.sectionIntro}>
            <p>05 / SYSTEM THINKING</p>
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

        <section className={styles.decisionShelf} id="decisions" aria-labelledby="decisions-title">
          <div className={styles.sectionIntro}>
            <p>06 / DECISION FILES</p>
            <div>
              <h2 id="decisions-title">The trade-offs tell<br />the real story.</h2>
              <p>Architecture is a series of choices. Open a decision below to see the reasoning documented in each project, then follow the full case study.</p>
            </div>
          </div>
          <div className={styles.decisionGrid}>
            {PROJECT_LIST.map((project) => {
              const [decisionTitle, decisionReason] = project.decisions[0];
              return (
                <article className={styles.decisionCard} key={project.slug}>
                  <div className={styles.decisionCardTop}>
                    <span>{project.index} / DECISION NOTE</span>
                    <span>{project.name}</span>
                  </div>
                  <h3>{decisionTitle}</h3>
                  <details>
                    <summary>Read the reasoning <span aria-hidden="true">+</span></summary>
                    <p>{decisionReason}</p>
                  </details>
                  <Link href={`/work/${project.slug}/`}>Full case study <Arrow size={15} /></Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.qualityLab} id="quality-lab" aria-labelledby="quality-title">
          <div className={styles.qualityHeader}>
            <div>
              <p className={styles.sectionMarker}>07 / QUALITY LAB</p>
              <h2 id="quality-title">The proof is in<br /><em>the checks.</em></h2>
            </div>
            <p>Quality claims need evidence. Open a project dossier to see the testing and delivery practices documented in its case study.</p>
          </div>
          <div className={styles.qualityGrid}>
            {PROJECT_LIST.map((project) => {
              return (
                <details className={styles.qualityCard} key={project.slug}>
                  <summary><span className={styles.qualityIndex}>{project.index}</span><span className={styles.qualityName}>{project.name}<small>{project.label}</small></span><span className={styles.qualityPlus} aria-hidden="true">+</span></summary>
                  <div className={styles.qualityCardBody}>
                    <p>Documented verification / implementation evidence</p>
                    <ul>{project.evidence.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul>
                    <Link href={`/work/${project.slug}/`}>See the full case study <Arrow size={14}/></Link>
                  </div>
                </details>
              );
            })}
          </div>
          <div className={styles.qualityFoot}><span>DESIGNED TO BE INSPECTED</span><a href="#decisions">Architecture decisions <Arrow size={14}/></a></div>
        </section>

        <section className={styles.process} id="process" aria-labelledby="process-title">
          <div className={styles.processHeader}>
            <div>
              <p className={styles.processEyebrow}>08 / HOW I WORK</p>
              <h2 id="process-title">From idea to<br /><em>something real.</em></h2>
            </div>
            <div className={styles.processAside}>
              <span>BUILD WITH INTENTION</span>
              <p>A practical workflow that keeps design, engineering decisions, and delivery aligned.</p>
              <a href="#contact">Discuss a project <Arrow size={16} /></a>
            </div>
          </div>
          <ol className={styles.processGrid}>
            {processSteps.map((step) => (
              <li className={styles.processStep} key={step.number}>
                <span className={styles.processNumber}>{step.number}</span>
                <div className={styles.processMarker} aria-hidden="true"><span /></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <small>{step.output}</small>
              </li>
            ))}
          </ol>
          <div className={styles.processFoot}>
            <span>CLARITY BEFORE COMPLEXITY</span>
            <span>ITERATE · TEST · IMPROVE</span>
          </div>
        </section>

        <section className={styles.stackSection} id="stack">
          <div className={styles.stackHeading}>
            <p>09 / TECHNOLOGY</p>
            <h2>Tools chosen around the system.</h2>
          </div>
          <div className={styles.techCloud}>
            {technologies.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}
          </div>
        </section>

        <section className={styles.stackLensSection} id="stack-lens" aria-labelledby="stack-lens-title">
          <div className={styles.lensSectionHeading}>
            <div>
              <p className={styles.sectionMarker}>NEW / STACK CONNECTIONS</p>
              <h2 id="stack-lens-title">Every tool has <em>a context.</em></h2>
            </div>
            <p>A living index generated from the technologies listed in the real case studies. Pick a tool and see precisely where it fits.</p>
          </div>
          <StackLens />
        </section>

        <section className={styles.about} id="about">
          <div className={styles.aboutHeading}>
            <p>10 / ABOUT</p>
            <h2>Engineering breadth with backend systems depth.</h2>
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.aboutLead}>I&apos;m Abdulrahman Hajar, a Software Engineer and Computer Engineering student at Nişantaşı University in Istanbul.</p>
            <p>I work across product interfaces, backend architecture, APIs, databases, asynchronous workflows, testing, security, deployment, reliability, AI/LLM integrations, and interactive systems. The goal is not to collect technologies — it is to understand enough of the complete system to make better engineering decisions and ship dependable software.</p>
            <div className={styles.education}>
              <span>EDUCATION</span>
              <div>
                <strong>Computer Engineering</strong>
                <p>Nişantaşı University · Istanbul, Türkiye</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.interfaceLabSection} id="interface-lab" aria-labelledby="interface-lab-title">
          <div className={styles.lensSectionHeading}>
            <div>
              <p className={styles.sectionMarker}>NEW / INTERFACE LAB</p>
              <h2 id="interface-lab-title">Interaction, <em>on purpose.</em></h2>
            </div>
            <p>Try a tiny interface study: appearance, information density, and progressive disclosure. It is a conceptual playground, not a screenshot of a shipped product.</p>
          </div>
          <InterfaceLab />
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

        <section className={styles.faq} id="faq" aria-labelledby="faq-title">
          <div className={styles.faqAside}>
            <p>11 / GOOD TO KNOW</p>
            <h2 id="faq-title">A few things<br />worth knowing.</h2>
            <span>STRAIGHT ANSWERS / NO HYPE</span>
            <p>Prefer a conversation? Find me on <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow size={14} /></a>.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details className={styles.faqItem} key={faq.question}>
                <summary>
                  <span className={styles.faqIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.faqQuestion}>{faq.question}</span>
                  <span className={styles.faqToggle} aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.startHere} id="start-here" aria-labelledby="start-here-title">
          <div className={styles.startHeading}>
            <p className={styles.sectionMarker}>12 / YOUR SHORTCUT</p>
            <h2 id="start-here-title">Different questions.<br /><em>Better starting points.</em></h2>
            <p>No guessing where to click. Choose the path that matches what you came to see.</p>
          </div>
          <div className={styles.pathGrid}>
            <article className={styles.pathCard}>
              <span>01 / HIRING TEAMS</span>
              <h3>Review experience</h3>
              <p>A concise overview of skills, education, and project evidence.</p>
              <Link href="/resume/">Open résumé <Arrow size={16} /></Link>
            </article>
            <article className={styles.pathCard}>
              <span>02 / PRODUCT TEAMS</span>
              <h3>See products in context</h3>
              <p>Walk through interaction design, backend trade-offs, and delivery constraints.</p>
              <a href="#explorer">Browse project explorer <Arrow size={16} /></a>
            </article>
            <article className={styles.pathCard}>
              <span>03 / ENGINEERS</span>
              <h3>Inspect the decisions</h3>
              <p>Start with architectural reasoning and trace the implementation in source.</p>
              <a href="#decisions">Read decision files <Arrow size={16} /></a>
            </article>
          </div>
        </section>

        <section className={styles.briefStudioSection} id="brief-studio" aria-labelledby="brief-title">
          <div className={styles.briefHeading}>
            <div>
              <p className={styles.sectionMarker}>13 / BRIEF STUDIO</p>
              <h2 id="brief-title">Make the first message<br /><em>worth reading.</em></h2>
            </div>
            <p>Have something to build? Pick a direction, clarify one priority, and copy a short brief you can share wherever you choose.</p>
          </div>
          <BriefStudio />
        </section>

        <section className={styles.contact} id="contact">
          <p>14 / CONTACT</p>
          <h2>Looking for evidence? Start with the work.</h2>
          <p>Review the live systems, inspect the source, or connect with me for software engineering opportunities and serious product work.</p>
          <div className={styles.contactLinks}>
            <a href={PROFILE_LINKS.github} target="_blank" rel="noreferrer"><Github /> GitHub <Arrow size={14} /></a>
            <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn <Arrow size={14} /></a>
            <a href={PROFILE_LINKS.instagram} target="_blank" rel="noreferrer">Instagram · @eng.rahman97 <Arrow size={14} /></a>
            <Link href="/resume/">Résumé <Arrow size={14} /></Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <span className={styles.monogram}><BrandMark size={37} /></span>
          <span><strong>Abdulrahman Hajar</strong><small>Software Engineer · Full-Stack Developer · AI & Interactive Systems</small></span>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
