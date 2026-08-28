import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "../../data";
import styles from "./case-study.module.css";

const siteUrl = "https://abdulrahman-hajar-dev.netlify.app";
type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.name} — Engineering Case Study`;
  const canonical = `/work/${project.slug}/`;
  const image = project.cover ?? "/opengraph-image";

  return {
    title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title: `${project.name} — Abdulrahman Hajar`,
      description: project.summary,
      type: "article",
      url: canonical,
      images: [{ url: image, alt: `${project.name} engineering case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [image],
    },
  };
}

export default async function CaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();

  const canonicalUrl = `${siteUrl}/work/${project.slug}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${project.name} software engineering case study`,
    description: project.summary,
    url: canonicalUrl,
    author: { "@id": `${siteUrl}/#person` },
    about: {
      "@type": "SoftwareSourceCode",
      name: project.name,
      description: project.summary,
      codeRepository: project.source,
      programmingLanguage: project.stack,
      targetProduct: {
        "@type": "SoftwareApplication",
        name: project.name,
        operatingSystem: "Web",
        url: project.live,
      },
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Portfolio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Selected Work", item: `${siteUrl}/#work` },
      { "@type": "ListItem", position: 3, name: project.name, item: canonicalUrl },
    ],
  };

  return (
    <main className={styles.page}>
      {[structuredData, breadcrumb].map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio">
          <span>AH</span><strong>Abdulrahman Hajar</strong>
        </Link>
        <nav aria-label="Case study navigation"><Link href="/#work">All work</Link><Link href="/resume/">Résumé</Link></nav>
      </header>

      <article>
        <section className={styles.hero}>
          <div className={styles.heroMeta}><span>{project.order}</span><p>{project.category}</p><p>{project.role}</p></div>
          <h1>{project.name}</h1>
          <h2>{project.headline}</h2>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.actions}>
            <a href={project.live} target="_blank" rel="noreferrer">Live system ↗</a>
            {project.runtime ? <a href={project.runtime} target="_blank" rel="noreferrer">Runtime health ↗</a> : null}
            <a href={project.source} target="_blank" rel="noreferrer">Source code ↗</a>
          </div>
          <div className={styles.stack}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          {project.cover ? (
            <figure className={styles.cover}>
              <Image src={project.cover} alt={`${project.name} product interface`} width={1400} height={735} priority />
            </figure>
          ) : (
            <div className={styles.endpoint} aria-label="Venues API endpoint example">
              <span>GET</span><code>/health</code><strong>200 OK</strong>
              <pre>{`{\n  "status": "healthy",\n  "service": "venues-api"\n}`}</pre>
            </div>
          )}
        </section>

        <section className={styles.split}>
          <div><p className={styles.label}>01 / PROBLEM</p><h2>{project.problem}</h2></div>
          <div><p className={styles.label}>02 / SOLUTION</p><p className={styles.largeBody}>{project.solution}</p></div>
        </section>

        <section className={styles.architecture}>
          <p className={styles.label}>03 / ARCHITECTURE</p>
          <h2>System responsibilities, kept explicit.</h2>
          <div className={styles.flow}>
            {project.architecture.map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < project.architecture.length - 1 ? <i aria-hidden="true">→</i> : null}</div>
            ))}
          </div>
        </section>

        <section className={styles.decisions}>
          <div className={styles.sectionTitle}><p className={styles.label}>04 / ENGINEERING DECISIONS</p><h2>Trade-offs that shape the implementation.</h2></div>
          <div className={styles.decisionGrid}>
            {project.decisions.map((decision, index) => (
              <article key={decision.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{decision.title}</h3><p>{decision.body}</p></article>
            ))}
          </div>
        </section>

        <section className={styles.reliability}>
          <div><p className={styles.label}>05 / RELIABILITY</p><h2>What keeps the system reviewable beyond the UI.</h2></div>
          <div className={styles.signalList}>
            {project.reliability.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}
          </div>
        </section>

        <section className={styles.evidence}>
          <p className={styles.label}>06 / EVIDENCE</p>
          <h2>Follow the implementation, not a claim.</h2>
          <div>{project.evidence.map((item) => <span key={item}>{item}</span>)}</div>
          <div className={styles.finalActions}>
            <a href={project.source} target="_blank" rel="noreferrer">Inspect repository ↗</a>
            <a href={project.live} target="_blank" rel="noreferrer">Open live system ↗</a>
            <Link href="/#work">More case studies →</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
