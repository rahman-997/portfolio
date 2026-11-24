import { PROFILE_LINKS } from "../portfolio-data";
import type { Locale } from "./locale";
import { extraSections } from "./extra-sections";
import { INQUIRY_COPY } from "./inquiry-copy";
import styles from "./sections.module.css";

type Props={locale:Locale};

export function EvidenceSection({locale}:Props){
  const t=extraSections[locale].evidence;
  return <section id="highlights" className={styles.evidence} aria-labelledby="highlights-heading">
    <div className={styles.intro}>
      <div className={styles.eyebrow}>{t.eyebrow}</div>
      <div><h2 id="highlights-heading">{t.title}</h2><p>{t.lead}</p></div>
    </div>
    <div className={styles.evidenceGrid}>
      {t.cards.map((card)=><article key={card.project} className={styles.evidenceCard}>
        <div className={styles.evidenceTop}>
          <span className={styles.mono}>{card.code}</span>
          <span className={styles.proofIcon} aria-hidden="true">↗</span>
        </div>
        <span className={styles.projectName}>{card.project}</span>
        <h3>{card.result}</h3>
        <p>{card.detail}</p>
        <div className={styles.evidenceFoot}>
          <span>{card.proof}</span>
          <a href={card.href} aria-label={t.link+" · "+card.project}>
            {t.link}<span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </article>)}
    </div>
  </section>;
}

export function ProcessSection({locale}:Props){
  const t=extraSections[locale].process;
  return <section id="process" className={styles.process} aria-labelledby="process-heading">
    <div className={styles.intro}>
      <div className={styles.eyebrow}>{t.eyebrow}</div>
      <div><h2 id="process-heading">{t.title}</h2><p>{t.lead}</p></div>
    </div>
    <ol className={styles.processGrid}>
      {t.steps.map((step,index)=><li key={step.phase} className={styles.processStep}
        data-workflow-step={index+1}>
        <span className={styles.processCount} aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
        <span className={styles.mono}>{step.phase}</span>
        <h3>{step.title}</h3>
        <p>{step.detail}</p>
        <span className={styles.processArrow} aria-hidden="true">{index===t.steps.length-1?"✓":"↗"}</span>
      </li>)}
    </ol>
  </section>;
}

export function CollaborateSection({locale}:Props){
  const t=extraSections[locale].collaborate;
  const brief=INQUIRY_COPY[locale];
  const serviceEvidence = ["/work/fitflow/", "/work/mizan/", "/work/bookhaven/"] as const;
  return <section id="collaborate" className={styles.collaborate} aria-labelledby="collaborate-heading">
    <div className={styles.intro}>
      <div className={styles.eyebrow}>{t.eyebrow}</div>
      <div><h2 id="collaborate-heading">{t.title}</h2><p>{t.lead}</p></div>
    </div>
    <div className={styles.collabGrid}>
      {t.cards.map((card,index)=><article className={styles.collabCard}
        data-collaboration-card={index+1} key={card.title}>
        <span className={styles.collabIcon} aria-hidden="true">{card.icon}</span>
        <div><span className={styles.mono}>{String(index+1).padStart(2,"0")} / {locale==="ar"?"مجال":locale==="tr"?"YETKİNLİK":"CAPABILITY"}</span>
          <h3>{card.title}</h3><p>{card.detail}</p></div>
        <ul className={styles.collabTags}>{card.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
        <a className={styles.serviceEvidence} href={serviceEvidence[index]} data-service-evidence="true" aria-label={`${brief.evidenceLabel} · ${card.title}`}>{brief.evidenceLabel}<span aria-hidden="true"> ↗</span></a>
      </article>)}
    </div>
    <section className={styles.inquiryPanel} aria-labelledby="inquiry-heading" data-project-brief="true">
      <div>
        <h3 id="inquiry-heading">{brief.title}</h3>
        <p>{brief.lead}</p>
        <ul className={styles.inquiryList}>
          {brief.items.map((item)=><li key={item} data-brief-item="true">{item}</li>)}
        </ul>
      </div>
      <div className={styles.inquiryContact}>
        <a className={styles.collabCta} href={PROFILE_LINKS.linkedin} rel="noopener noreferrer"
          target="_blank" aria-describedby="inquiry-note">{t.button}<span aria-hidden="true">↗</span></a>
        <a className={styles.briefDownload} href={`/briefs/project-brief-${locale}.txt`} download data-brief-download="true">{brief.downloadLabel}<span aria-hidden="true"> ↓</span></a>
        <p id="inquiry-note">{brief.note}</p>
      </div>
    </section>
  </section>;
}

export function FaqSection({locale}:Props){
  const t=extraSections[locale].faq;
  return <section id="faq" className={styles.faq} aria-labelledby="faq-heading">
    <div className={styles.intro}>
      <div className={styles.eyebrow}>{t.eyebrow}</div>
      <div><h2 id="faq-heading">{t.title}</h2><p>{t.lead}</p></div>
    </div>
    <div className={styles.faqItems}>
      {t.items.map((item,index)=><details key={item.q} className={styles.faqItem}>
        <summary><span className={styles.mono}>{String(index+1).padStart(2,"0")}</span>
          <span>{item.q}</span><span className={styles.faqPlus} aria-hidden="true">+</span></summary>
        <p>{item.a}</p>
      </details>)}
    </div>
  </section>;
}
