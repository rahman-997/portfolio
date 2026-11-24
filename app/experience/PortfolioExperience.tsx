import AIAtlas from "../ai-atlas";
import MobileNavigation from "./MobileNavigation";
import FeaturedShowcase from "./FeaturedShowcase";
import { PROFILE_LINKS, PROJECT_SLUGS } from "../portfolio-data";
import { PUBLIC_PROJECT_COUNT } from "./projects";
import ProjectExplorer from "./ProjectExplorer";
import ExperienceControls from "./ExperienceControls";
import { EvidenceSection, ProcessSection, CollaborateSection, FaqSection } from "./PortfolioExtraSections";
import { extraSections } from "./extra-sections";
import type { Locale } from "./locale";
import { TEXT } from "./locale";
import styles from "./experience.module.css";

const stack = ["React", "Next.js", "TypeScript", "UI/UX", "Responsive Design", "Accessibility", "RTL / i18n", "PWA", "Node.js", "Express", "PostgreSQL", "GitHub Actions"];

export default function PortfolioExperience({locale}:{locale:Locale}) {
  const t=TEXT[locale];
  const more=extraSections[locale];
  return <div className={styles.page} lang={locale} dir={locale==="ar"?"rtl":"ltr"}>
    <a className={styles.skip} href="#main">{t.skip}</a>
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="Abdulrahman Hajar">
        <span className={styles.monogram}>AH<span className={styles.markDot}>.</span></span>
        <span className={styles.brandText}><strong>Abdulrahman Hajar</strong><small>{t.role}</small></span>
      </a>
      <nav className={styles.nav} aria-label={locale==="ar"?"التنقل الرئيسي":locale==="tr"?"Ana gezinme":"Primary navigation"}>
        <a href="#work">{t.navWork}</a>
        <a href="#highlights">{more.navHighlights}</a>
        <a href="#ai-lab">{locale==="en"?"Explore AI Lab":t.navAtlas}</a>
        <a href="#collaborate">{locale==="ar"?"الخدمات":locale==="tr"?"Hizmetler":"Services"}</a>
        <a href="#about">{t.navAbout}</a>
        <a href="/resume/">{t.navResume}<span className={styles.langHint}> EN</span></a>
      </nav>
      <div className={styles.headerTools}>
        <ExperienceControls locale={locale}/>
        <MobileNavigation locale={locale}/>
      </div>
    </header>

    <main id="main">
      <section id="top" className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true"/>
        <div className={styles.heroText}>
          <p className={styles.heroEyebrow}><span className={styles.liveDot}/>{t.hello}</p>
          <h1><span>{t.heroTop}</span> <em>{t.heroBottom}</em></h1>
          <p className={styles.lead}>{t.heroLead}</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#work">{t.workButton} <span aria-hidden="true">↗</span></a>
            <a className={styles.secondaryAction} href="/Abdulrahman-Hajar-Frontend-Resume.pdf" download>
              {locale==="ar"?"تحميل السيرة الذاتية":locale==="tr"?"CV İndir":"Download CV"} <span aria-hidden="true">↓</span>
            </a>
            <a className={styles.secondaryAction} href="#collaborate" data-studio-cta="hero">
              {locale==="ar"?"ناقش مشروعك":locale==="tr"?"Projenizi konuşalım":"Discuss your project"} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.heroFoot} aria-label={t.visualDetail}>
            <span>React / Next.js</span><span>TypeScript</span><span>UI/UX · RTL</span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <FeaturedShowcase locale={locale}/>
        </div>
      </section>

      <section className={styles.metrics} aria-label={t.projectEyebrow}>
        <div><strong>{String(PUBLIC_PROJECT_COUNT).padStart(2,"0")}</strong><span>{t.metricProjects}</span></div>
        <div><strong>{String(PROJECT_SLUGS.length).padStart(2,"0")}</strong><span>{t.metricStudies}</span></div>
        <div><strong>03</strong><span>{t.metricLanguages}</span></div>
        <a href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer">github.com/rahman-997 <span aria-hidden="true">↗</span></a>
      </section>

      <section id="work" className={styles.work}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>{t.projectEyebrow}</p>
          <div><h2>{t.projectTitle}</h2><p>{t.projectLead}</p></div>
        </div>
        <ProjectExplorer locale={locale}/>
      </section>

      <EvidenceSection locale={locale}/>

      <div className={styles.atlasSection}>
        <div className={styles.atlasIntro}>
          <p className={styles.sectionLabel}>{t.atlasEyebrow}</p>
          <h2>{t.atlasTitle}</h2>
        </div>
        <AIAtlas locale={locale} />
      </div>

      <ProcessSection locale={locale}/>

      <section id="systems" className={styles.systems}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>{t.systemEyebrow}</p>
          <div><h2>{t.systemTitle}</h2><p>{t.systemLead}</p></div>
        </div>
        <div className={styles.valueGrid}>
          {t.systemCards.map((card,i)=><article key={card.title}><span>0{i+1}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}
        </div>
        <div id="stack" className={styles.techBar}>{stack.map(tech=><span key={tech}>{tech}</span>)}</div>
      </section>

      <section id="about" className={styles.about}>
        <div><p className={styles.sectionLabel}>{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2></div>
        <div><p>{t.aboutText}</p><span className={styles.education}>{t.aboutNote}</span></div>
      </section>

      <CollaborateSection locale={locale}/>
      <FaqSection locale={locale}/>

      <section className={styles.contact}>
        <span className={styles.contactStar} aria-hidden="true">✳</span>
        <p>{locale==="ar"?"لنصنع شيئاً / AH":locale==="tr"?"BİRLİKTE ÜRETELİM / AH":"LET'S BUILD / AH"}</p>
        <h2>{t.endTitle}</h2>
        <p className={styles.contactLead}>{t.endText}</p>
        <div className={styles.actions}>
          <a className={styles.primaryAction} href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer">{t.github} ↗</a>
          <a className={styles.secondaryAction} href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer">{t.linkedIn} ↗</a>
        </div>
      </section>
    </main>
    <footer className={styles.footer}><span>AH. <b>Abdulrahman Hajar</b> © 2026</span><a href="#top">{t.top} ↑</a></footer>
  </div>;
}
