import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PORTFOLIO_UPDATED_AT,
  PROJECTS,
  PROJECT_SLUGS,
  SITE_URL,
  type ProjectSlug,
} from "../../portfolio-data";
import styles from "./case-study.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = PROJECTS[slug as ProjectSlug];
  if (!study) return {};

  const title = `${study.name} Case Study — Abdulrahman Hajar`;
  const canonical = `/work/${slug}/`;
  const image = study.cover?.endsWith(".svg") ? "/opengraph-image" : study.cover ?? "/opengraph-image";

  return {
    title,
    description: study.summary,
    authors: [{ name: "Abdulrahman Hajar", url: SITE_URL }],
    keywords: [...study.stack, "software engineering case study"],
    alternates: { canonical },
    openGraph: {
      title,
      description: study.summary,
      type: "article",
      url: canonical,
      modifiedTime: PORTFOLIO_UPDATED_AT,
      siteName: "Abdulrahman Hajar — Software Engineering Portfolio",
      images: [{ url: image, width: 1200, height: 630, alt: `${study.name} software engineering case study` }],
    },
    twitter: { card: "summary_large_image", title, description: study.summary, images: [image] },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = PROJECTS[slug as ProjectSlug];
  if (!study) notFound();

  const canonicalUrl = `${SITE_URL}/work/${slug}/`;
  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl}#case-study`,
    headline: `${study.name} software engineering case study`,
    description: study.summary,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    author: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: {
      "@type": "SoftwareSourceCode",
      name: study.name,
      description: study.summary,
      codeRepository: study.source,
      runtimePlatform: "Web",
      programmingLanguage: study.languages,
      targetProduct: { "@type": "SoftwareApplication", name: study.name, applicationCategory: "WebApplication", operatingSystem: "Web", url: study.live },
    },
    dateModified: PORTFOLIO_UPDATED_AT,
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Portfolio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Selected Work", item: `${SITE_URL}/#work` },
      { "@type": "ListItem", position: 3, name: study.name, item: canonicalUrl },
    ],
  };

  return (
    <main className={styles.page}>
      {[caseStudyJsonLd, breadcrumbJsonLd].map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio"><span>AH</span><strong>Abdulrahman Hajar</strong></Link>
        <Link className={styles.back} href="/#work">← Selected work</Link>
      </header>

      <article className={styles.article}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{study.eyebrow}</p>
          <h1>{study.name}</h1>
          <p className={styles.summary}>{study.summary}</p>
          <div className={styles.actions}>
            <a href={study.live} target="_blank" rel="noreferrer">Open live system ↗</a>
            {study.runtime ? <a href={study.runtime} target="_blank" rel="noreferrer">Runtime health ↗</a> : null}
            <a href={study.source} target="_blank" rel="noreferrer">Inspect source ↗</a>
          </div>
          <div className={styles.stack}>{study.stack.map((item) => <span key={item}>{item}</span>)}</div>
          {study.cover ? <figure className={styles.cover}><Image src={study.cover} alt={`${study.name} product interface preview`} width={1200} height={630} priority /></figure> : null}
        </section>

        <section className={styles.splitSection}>
          <div><span>01</span><h2>Problem</h2></div>
          <p>{study.problem}</p>
        </section>

        <section className={styles.splitSection}>
          <div><span>02</span><h2>Solution</h2></div>
          <p>{study.solution}</p>
        </section>

        <section className={styles.architectureSection}>
          <div className={styles.sectionTitle}><span>03</span><h2>Architecture</h2></div>
          <div className={styles.architectureFlow}>{study.architecture.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><span>04</span><h2>Engineering decisions</h2></div>
          <div className={styles.decisionGrid}>{study.decisions.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className={styles.dualSection}>
          <div>
            <div className={styles.sectionTitle}><span>05</span><h2>Reliability</h2></div>
            <div className={styles.signalList}>{study.reliability.map((item) => <div key={item}><i>✓</i><span>{item}</span></div>)}</div>
          </div>
          <div>
            <div className={styles.sectionTitle}><span>06</span><h2>Evidence</h2></div>
            <div className={styles.signalList}>{study.evidence.map((item) => <div key={item}><i>↗</i><span>{item}</span></div>)}</div>
          </div>
        </section>

        <section className={styles.next}>
          <div><span>VERIFY IT</span><h2>The implementation is public.</h2><p>Review the live behavior, source code, tests, architecture, and deployment details directly.</p></div>
          <div className={styles.nextLinks}><a href={study.live} target="_blank" rel="noreferrer">Live system ↗</a><a href={study.source} target="_blank" rel="noreferrer">GitHub source ↗</a><Link href="/#work">More case studies →</Link></div>
        </section>
      </article>
    </main>
  );
}
