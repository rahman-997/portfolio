import Link from "next/link";
import { PROFILE_LINKS } from "../portfolio-data";
import { localePath, type Locale } from "../i18n";
import { portfolioExtras } from "../portfolio-extras";
import styles from "../portfolio-sections.module.css";

/**
 * Three fully static, language-aware sections. The project links reuse the
 * exact case-study routes, and FAQ disclosure works without JavaScript.
 */
export default function PortfolioSections({locale}:{locale:Locale}){
 const copy=portfolioExtras[locale];
 return (
  <>
   <section className={styles.section} id="process" data-portfolio-section="process" aria-labelledby="process-title">
    <div className={styles.intro}>
     <p className={styles.eyebrow}>{copy.process.eyebrow}</p>
     <div>
      <h2 id="process-title">{copy.process.title}</h2>
      <p className={styles.lead}>{copy.process.description}</p>
      <a className={styles.jump} href="#explore">{copy.process.cta}<span aria-hidden="true">↗</span></a>
     </div>
    </div>
    <ol className={styles.timeline}>
     {copy.process.steps.map((step,index)=>(
      <li className={styles.step} data-process-step={String(index+1)} key={step.title}>
       <span className={styles.stepNumber} aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
       <h3>{step.title}</h3><p>{step.body}</p>
      </li>
     ))}
    </ol>
   </section>
   <section className={styles.section+" "+styles.challengeSection} id="explore" data-portfolio-section="explore" aria-labelledby="explore-title">
    <div className={styles.intro}>
     <p className={styles.eyebrow}>{copy.explore.eyebrow}</p>
     <div>
      <h2 id="explore-title">{copy.explore.title}</h2>
      <p className={styles.lead}>{copy.explore.description}</p>
     </div>
    </div>
    <div className={styles.challengeGrid}>
     {copy.explore.cards.map((entry,index)=>(
      <article className={styles.challengeCard} data-focus-project={entry.slug} key={entry.slug}>
       <div className={styles.challengeMeta}>
        <span>{String(index+1).padStart(2,"0")} / 04</span>
        <span>{entry.label}</span>
       </div>
       <h3>{entry.question}</h3>
       <p>{entry.detail}</p>
       <div className={styles.cardBottom}>
        <span dir="ltr" className={styles.projectName}>{entry.slug==="venues-api"?"Venues API":entry.slug==="bookhaven"?"BookHaven":entry.slug==="fitflow"?"FitFlow":"Eventify"}</span>
        <Link href={localePath(locale,"work",entry.slug)}>{copy.explore.cta} <span aria-hidden="true">↗</span></Link>
       </div>
      </article>
     ))}
    </div>
    <a className={styles.jump} href="#questions">{copy.explore.next}<span aria-hidden="true">↗</span></a>
   </section>
   <section className={styles.section+" "+styles.faqSection} id="questions" data-portfolio-section="questions" aria-labelledby="questions-title">
    <div className={styles.intro}>
     <p className={styles.eyebrow}>{copy.questions.eyebrow}</p>
     <div><h2 id="questions-title">{copy.questions.title}</h2><p className={styles.lead}>{copy.questions.description}</p></div>
    </div>
    <div className={styles.faqList}>
     {copy.questions.items.map((item,index)=>{
      const href=item.destination==="github"?PROFILE_LINKS.github:item.destination==="pdf"?"/Abdulrahman-Hajar-Resume.pdf":"#explore";
      return <details className={styles.faqItem} key={item.question}>
       <summary><span className={styles.faqCount} aria-hidden="true">{String(index+1).padStart(2,"0")}</span><span>{item.question}</span><span className={styles.faqPlus} aria-hidden="true">+</span></summary>
       <div className={styles.faqAnswer}><p>{item.answer}</p>
        {item.destination==="pdf"
         ? <a href={href} download>{item.action}<span aria-hidden="true">↗</span></a>
         : item.destination==="github"
          ? <a href={href} target="_blank" rel="noreferrer">{item.action}<span aria-hidden="true">↗</span></a>
          : <a href={href}>{item.action}<span aria-hidden="true">↗</span></a>}
       </div>
      </details>;
     })}
    </div>
   </section>
  </>
 );
}
