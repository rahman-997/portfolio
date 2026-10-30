import Link from "next/link";
import { PROJECTS, PROJECT_LIST } from "../portfolio-data";
import { localePath, type Locale } from "../i18n";
import { portfolioDepth } from "../portfolio-depth";
import styles from "../portfolio-depth.module.css";

/**
 * V3.10: data-derived portfolio map and no-JavaScript architecture walkthroughs.
 * All project/stack references originate in the existing case-study data.
 */
export default function PortfolioDepthSections({locale}:{locale:Locale}){
 const t=portfolioDepth[locale];
 return (
  <div className={styles.wrapper}>
   <nav className={styles.nav} aria-label={locale==="ar"?"استكشاف المزيد":locale==="tr"?"Daha fazlasını keşfet":"Explore more"}>
    {(["compare","patterns","quality","toolbox"] as const).map(id=>(
     <a href={"#"+id} key={id}>{t[id].title}<span aria-hidden="true">↗</span></a>
    ))}
   </nav>
   <section className={styles.section} id="compare" data-portfolio-section="compare" aria-labelledby="compare-heading">
    <div className={styles.intro}><p className={styles.eyebrow}>{t.compare.eyebrow}</p>
     <div><h2 id="compare-heading">{t.compare.title}</h2><p className={styles.lead}>{t.compare.lead}</p></div>
    </div>
    <div className={styles.comparisonGrid}>
     {t.compare.cards.map(entry=>{
      const project=PROJECTS[entry.slug];
      return <article className={styles.comparison} data-compare-project={entry.slug} key={entry.slug}>
       <div className={styles.comparisonTop}><span>{project.index} / 04</span><span dir="ltr">{project.name}</span></div>
       <h3>{entry.shape}</h3>
       <dl>
        <div><dt>{t.compare.area}</dt><dd>{entry.focus}</dd></div>
        <div><dt>{t.compare.technology}</dt><dd className={styles.stack} dir="ltr" lang="en">{project.stack.slice(0,4).join(" · ")}</dd></div>
       </dl>
       <Link className={styles.detailLink} href={localePath(locale,"work",entry.slug)}>
        {t.compare.view}<span aria-hidden="true">↗</span>
       </Link>
      </article>;
     })}
    </div>
   </section>

   <section className={styles.section} id="patterns" data-portfolio-section="patterns" aria-labelledby="patterns-heading">
    <div className={styles.intro}><p className={styles.eyebrow}>{t.patterns.eyebrow}</p>
     <div><h2 id="patterns-heading">{t.patterns.title}</h2><p className={styles.lead}>{t.patterns.lead}</p></div>
    </div>
    <div className={styles.patternList}>
     {PROJECT_LIST.map(project=>(
      <details data-pattern-project={project.slug} className={styles.pattern} key={project.slug}>
       <summary><span className={styles.patternIndex}>{project.index}</span><span className={styles.patternName} dir="ltr">{project.name}</span>
        <span className={styles.patternToggle}>{t.patterns.show}<span className={styles.plus} aria-hidden="true">+</span></span>
       </summary>
       <div className={styles.patternContent}>
        <ol className={styles.architecture} dir="ltr" lang="en">
         {project.architecture.map((stage,index)=>(
          <li key={stage}><span className={styles.archStep}>{String(index+1).padStart(2,"0")}</span><span>{stage}</span></li>
         ))}
        </ol>
        <div className={styles.patternFooter}>
         <div className={styles.patternDecision}>
          <strong>{t.patterns.decision}</strong>
          <span lang="en" dir="ltr">{project.decisions[0][0]}</span>
         </div>
         <Link className={styles.detailLink} href={localePath(locale,"work",project.slug)}>
          {t.patterns.inspect}<span aria-hidden="true">↗</span>
         </Link>
        </div>
       </div>
      </details>
     ))}
    </div>
   </section>

   <section className={styles.section} id="quality" data-portfolio-section="quality" aria-labelledby="quality-heading">
    <div className={styles.intro}><p className={styles.eyebrow}>{t.quality.eyebrow}</p>
     <div><h2 id="quality-heading">{t.quality.title}</h2><p className={styles.lead}>{t.quality.lead}</p></div>
    </div>
    <div className={styles.qualityGrid}>
     {t.quality.categories.map((category,index)=>(
      <article className={styles.qualityCard} key={category.id} data-quality-category={category.id}>
       <span className={styles.cardIndex}>{String(index+1).padStart(2,"0")} / 04</span>
       <h3>{category.title}</h3>
       <ul>{category.points.map(point=><li key={point}>{point}</li>)}</ul>
      </article>
     ))}
    </div>
    <div className={styles.qualityFoot}>
     <p>{t.quality.disclaimer}</p>
     <a className={styles.detailLink} href="https://github.com/rahman-997/portfolio/actions/workflows/ci.yml" target="_blank" rel="noreferrer">
      {t.quality.workflow}<span aria-hidden="true">↗</span>
     </a>
    </div>
   </section>

   <section className={styles.section+" "+styles.lastSection} id="toolbox" data-portfolio-section="toolbox" aria-labelledby="toolbox-heading">
    <div className={styles.intro}><p className={styles.eyebrow}>{t.toolbox.eyebrow}</p>
     <div><h2 id="toolbox-heading">{t.toolbox.title}</h2><p className={styles.lead}>{t.toolbox.lead}</p></div>
    </div>
    <div className={styles.toolGrid}>
     {t.toolbox.categories.map(category=>(
      <article className={styles.toolCard} data-tool-category={category.id} key={category.id}>
       <h3>{category.title}</h3>
       <ul>
        {category.tools.map(tool=>{
         const matching=PROJECT_LIST.filter(project=>project.stack.some(used=>used===tool));
         return <li key={tool} className={styles.toolRow}>
          <strong lang="en" dir="ltr">{tool}</strong>
          <span className={styles.toolMatches}>
           {matching.length===0?t.toolbox.none:matching.map(project=>(
            <Link href={localePath(locale,"work",project.slug)} key={project.slug} dir="ltr" title={t.toolbox.show+" "+project.name}>{project.name}</Link>
           ))}
          </span>
         </li>;
        })}
       </ul>
      </article>
     ))}
    </div>
   </section>
  </div>
 );
}
