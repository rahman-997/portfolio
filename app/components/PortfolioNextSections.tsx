import Link from "next/link";
import { PROFILE_LINKS, PROJECTS } from "../portfolio-data";
import { localePath, type Locale } from "../i18n";
import { portfolioNext } from "../portfolio-next";
import styles from "../portfolio-next.module.css";

/**
 * Portfolio V3.9: real architectural trade-offs and verified collaboration
 * lanes. Fully server-rendered and navigable without any JavaScript.
 */
export default function PortfolioNextSections({locale}:{locale:Locale}){
 const copy=portfolioNext[locale];
 return (
  <div className={styles.wrapper}>
   <nav className={styles.sectionNav} aria-label={locale==="ar"?"التنقل بين الأقسام":locale==="tr"?"Bölümler arasında gezinin":"Explore sections"}>
    <a href="#decisions">{copy.decisions.title}<span aria-hidden="true">↗</span></a>
    <a href="#collaborate">{copy.collaborate.title}<span aria-hidden="true">↗</span></a>
   </nav>

   <section className={styles.section} id="decisions" data-portfolio-section="decisions" aria-labelledby="decisions-heading">
    <div className={styles.intro}>
     <p className={styles.eyebrow}>{copy.decisions.eyebrow}</p>
     <div>
      <h2 id="decisions-heading">{copy.decisions.title}</h2>
      <p className={styles.lead}>{copy.decisions.intro}</p>
     </div>
    </div>
    <div className={styles.decisionList}>
     {copy.decisions.items.map((entry,index)=>{
      const project=PROJECTS[entry.slug];
      return <article className={styles.decision} data-decision-project={entry.slug} key={entry.slug}>
       <div className={styles.decisionId}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <span dir="ltr">{project.name}</span>
       </div>
       <div className={styles.decisionBody}>
        <h3>{entry.topic}</h3>
        <dl className={styles.choiceGrid}>
         <div>
          <dt className={styles.choiceTitle}>{copy.decisions.choice}</dt>
          <dd>{entry.choice}</dd>
         </div>
         <div>
          <dt className={styles.tradeTitle}>{copy.decisions.tradeoff}</dt>
          <dd>{entry.tradeoff}</dd>
         </div>
        </dl>
       </div>
       <Link className={styles.caseLink} href={localePath(locale,"work",entry.slug)}>
        {copy.decisions.caseStudy}<span aria-hidden="true">↗</span>
       </Link>
      </article>;
     })}
    </div>
   </section>

   <section className={styles.section+" "+styles.collaboration} id="collaborate" data-portfolio-section="collaborate" aria-labelledby="collaborate-heading">
    <div className={styles.intro}>
     <p className={styles.eyebrow}>{copy.collaborate.eyebrow}</p>
     <div>
      <h2 id="collaborate-heading">{copy.collaborate.title}</h2>
      <p className={styles.lead}>{copy.collaborate.intro}</p>
     </div>
    </div>
    <div className={styles.collabGrid}>
     {copy.collaborate.areas.map((area,index)=>{
      const project=PROJECTS[area.slug];
      return <article className={styles.collabCard} data-collab-area={area.id} key={area.id}>
       <span className={styles.collabIndex}>{String(index+1).padStart(2,"0")} / 03</span>
       <h3>{area.title}</h3>
       <p>{area.desc}</p>
       <div className={styles.collabProof}>
        <span>{copy.collaborate.project}</span>
        <Link href={localePath(locale,"work",area.slug)}><span dir="ltr">{project.name}</span><span aria-hidden="true">↗</span></Link>
       </div>
      </article>;
     })}
    </div>
    <div className={styles.connectBar}>
     <p>{copy.collaborate.note}</p>
     <div className={styles.connectLinks}>
      <Link href={localePath(locale,"resume")}>{copy.collaborate.resume}<span aria-hidden="true">↗</span></Link>
      <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer">{copy.collaborate.contact}<span aria-hidden="true">↗</span></a>
     </div>
    </div>
   </section>
  </div>
 );
}
