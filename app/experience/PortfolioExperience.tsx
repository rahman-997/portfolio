import Image from "next/image";
import AIAtlas from "../ai-atlas";
import CinematicHero from "./CinematicHero";
import FeaturedSystems from "./FeaturedSystems";
import HomeEventifyStory from "./HomeEventifyStory";
import ReferenceBlueprint from "./ReferenceBlueprint";
import referenceShell from "./reference-shell.module.css";
import BlueprintLab from "./BlueprintLab";
import MissionPaths from "./MissionPaths";
import shell from "./shell.module.css";
import atelier from "./atelier.module.css";
import { PROFILE_LINKS } from "../portfolio-data";
import { PUBLIC_PROJECT_COUNT } from "./projects";
import ProjectExplorer from "./ProjectExplorer";
import ExperienceControls from "./ExperienceControls";
import { EvidenceSection, ProcessSection, CollaborateSection, FaqSection } from "./PortfolioExtraSections";
import type { Locale } from "./locale";
import { TEXT } from "./locale";
import styles from "./experience.module.css";

const stack = ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "PWA", "AI / MCP", "GitHub Actions", "WCAG"];

export default function PortfolioExperience({locale}:{locale:Locale}) {
  const t=TEXT[locale];
  return <div className={`${styles.page} ${shell.shell} ${atelier.atelier} ${referenceShell.referenceShell}`} data-design-system="hajar-atelier" data-reference-design="hajar-editorial-2026" lang={locale} dir={locale==="ar"?"rtl":"ltr"}>
    <a className={styles.skip} href="#main">{t.skip}</a>
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="Abdulrahman Hajar">
        <span className={`${styles.brandEmblem} ${referenceShell.logoWrap}`}><Image src="/brand/hajar-emblem.svg" width={37} height={47} alt="" unoptimized /></span>
        <span className={styles.brandText}><strong>HAJAR</strong><small>{locale==="ar"?"مهندس برمجيات":locale==="tr"?"YAZILIM MÜHENDİSİ":"SOFTWARE ENGINEER"}</small></span>
      </a>
      <nav className={styles.nav} aria-label={locale==="ar"?"التنقل الرئيسي":locale==="tr"?"Ana gezinme":"Primary navigation"}>
        <a href="#work">{t.navWork}</a>
        <a href="#blueprint-lab">{locale==="ar"?"مختبر الأنظمة":locale==="tr"?"Mimari Lab":"Blueprint Lab"}</a>
        <a href="#ai-lab">{t.navAtlas}</a>

        <a href="#about">{t.navAbout}</a>
        <a href="#contact">{locale==="ar"?"تواصل":locale==="tr"?"İletişim":"Contact"}</a>
        <a href="/resume/">{t.navResume}<span className={styles.langHint}> EN</span></a>
      </nav>
      <ExperienceControls locale={locale}/>
      <details className={referenceShell.mobileMenu}>
        <summary aria-label={locale==="ar"?"فتح القائمة":locale==="tr"?"Menüyü aç":"Open menu"}><span aria-hidden="true">☰</span></summary>
        <nav aria-label={locale==="ar"?"قائمة الموبايل":locale==="tr"?"Mobil menü":"Mobile menu"}>
          <a href="#featured">{t.navWork}</a><a href="#blueprint-lab">Blueprint Lab</a><a href="#ai-lab">{t.navAtlas}</a><a href="#about">{t.navAbout}</a><a href="#contact">{locale==="ar"?"تواصل":locale==="tr"?"İletişim":"Contact"}</a>
        </nav>
      </details>
    </header>

    <main id="main">
      <CinematicHero locale={locale}/>
      <FeaturedSystems locale={locale}/>
      <HomeEventifyStory locale={locale}/>
      <ReferenceBlueprint locale={locale}/>
      <MissionPaths locale={locale}/>

      <section className={styles.metrics} aria-label={t.projectEyebrow}>
        <div><strong>{String(PUBLIC_PROJECT_COUNT).padStart(2,"0")}</strong><span>{t.metricProjects}</span></div>
        <div><strong>04</strong><span>{t.metricStudies}</span></div>
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

      <BlueprintLab locale={locale}/>
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

      <section id="contact" className={styles.contact}>
        <span className={styles.contactStar} aria-hidden="true">✳</span>
        <p>{locale==="ar"?"لنصنع شيئاً / HAJAR":locale==="tr"?"BİRLİKTE ÜRETELİM / HAJAR":"LET'S BUILD / HAJAR"}</p>
        <h2>{t.endTitle}</h2>
        <p className={styles.contactLead}>{t.endText}</p>
        <div className={styles.actions}>
          <a className={styles.primaryAction} href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer">{t.github} ↗</a>
          <a className={styles.secondaryAction} href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer">{t.linkedIn} ↗</a>
        </div>
      </section>
    </main>
    <footer className={styles.footer}>
      <a className={referenceShell.footerBrand} href="#top"><Image src="/brand/hajar-emblem.svg" alt="" width={34} height={43} unoptimized/><span><strong>HAJAR</strong><small>SOFTWARE ENGINEER</small></span></a>
      <nav className={referenceShell.footerNav} aria-label="Footer"><a href="#work">{t.navWork}</a><a href="#blueprint-lab">Blueprint Lab</a><a href="#ai-lab">{t.navAtlas}</a><a href="#about">{t.navAbout}</a><a href="#contact">{locale==="ar"?"تواصل":locale==="tr"?"İletişim":"Contact"}</a></nav>
      <span>© 2026 Abdulrahman Hajar</span><a href="#top">{t.top} ↑</a>
    </footer>
  </div>;
}
