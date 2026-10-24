import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LanguageLinks from "../../../components/LanguageLinks";
import { PROFILE_LINKS, PROJECT_SLUGS, SITE_URL, type ProjectSlug } from "../../../portfolio-data";
import { alternateLinks, isTranslationLocale, localePath, localizedProject, translation } from "../../../i18n";
import styles from "../../../work/[slug]/case-study.module.css";

type Props = {params: Promise<{locale:string;slug:string}>};
export const dynamicParams = false;
export function generateStaticParams(){
  return ["ar","tr"].flatMap(locale=>PROJECT_SLUGS.map(slug=>({locale,slug})));
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale,slug}=await params;
  if(!isTranslationLocale(locale)||!PROJECT_SLUGS.includes(slug as ProjectSlug))return {};
  const project=localizedProject(locale,slug as ProjectSlug);
  const t=translation(locale);
  const canonical=localePath(locale,"work",slug);
  return {
    title: project.name+" | "+t.caseStudy+" | "+t.name,
    description:project.summary,
    alternates:{canonical,languages:alternateLinks("work",slug)},
    openGraph:{title:project.name+" | "+t.caseStudy,description:project.summary,url:canonical,locale:locale==="ar"?"ar_AR":"tr_TR"},
  };
}
export default async function LocalizedStudy({params}:Props){
  const {locale,slug}=await params;
  if(!isTranslationLocale(locale)||!PROJECT_SLUGS.includes(slug as ProjectSlug))notFound();
  const study=localizedProject(locale,slug as ProjectSlug);
  const t=translation(locale);
  const canonical=SITE_URL+localePath(locale,"work",slug);
  const schema={"@context":"https://schema.org","@type":"TechArticle","@id":canonical+"#case-study",headline:study.name+" · "+t.caseStudy,description:study.summary,url:canonical,
    inLanguage:locale,author:{"@id":SITE_URL+"/#person"},about:{"@type":"SoftwareSourceCode",name:study.name,codeRepository:study.source}};
  return (
    <main className={styles.page} lang={locale} dir={locale==="ar"?"rtl":"ltr"} style={{fontFamily:locale==="ar"?'Tahoma, "Noto Sans Arabic", system-ui, sans-serif':undefined}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
      <header className={styles.header}>
        <Link className={styles.brand} href={localePath(locale)} aria-label={t.nav.home}><span>AH</span><strong>{t.name}</strong></Link>
        <Link className={styles.back} href={localePath(locale)+"#work"}>{t.nav.back} ↗</Link>
        <LanguageLinks locale={locale} page="work" slug={slug}/>
      </header>
      <article className={styles.article}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{study.label}</p>
          <h1 dir="ltr">{study.name}</h1>
          <p className={styles.summary}>{study.summary}</p>
          <div className={styles.actions}>
            <a href={study.live} target="_blank" rel="noreferrer">{t.live} ↗</a>
            {study.runtime?<a href={study.runtime} target="_blank" rel="noreferrer">{t.runtime} ↗</a>:null}
            <a href={study.source} target="_blank" rel="noreferrer">{t.sourceLink} ↗</a>
          </div>
          <div className={styles.stack} dir="ltr">{study.stack.map(x=><span key={x}>{x}</span>)}</div>
          {study.cover?<figure className={styles.cover}><Image src={study.cover} alt={study.name+" "+t.caseStudy} width={1200} height={630} priority/></figure>:null}
        </section>
        <section className={styles.splitSection}><div><span>01</span><h2>{t.caseHeadings[0]}</h2></div><p>{study.problem}</p></section>
        <section className={styles.splitSection}><div><span>02</span><h2>{t.caseHeadings[1]}</h2></div><p>{study.solution}</p></section>
        <section className={styles.architectureSection}>
          <div className={styles.sectionTitle}><span>03</span><h2>{t.caseHeadings[2]}</h2></div>
          <div className={styles.architectureFlow} dir="auto">{study.architecture.map((item,i)=><div key={item}><span>{String(i+1).padStart(2,"0")}</span><p>{item}</p></div>)}</div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionTitle}><span>04</span><h2>{t.caseHeadings[3]}</h2></div>
          <div className={styles.decisionGrid}>{study.decisions.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>
        <section className={styles.dualSection}>
          <div><div className={styles.sectionTitle}><span>05</span><h2>{t.caseHeadings[4]}</h2></div>
            <div className={styles.signalList}>{study.reliability.map(x=><div key={x}><i>✓</i><span>{x}</span></div>)}</div>
          </div>
          <div><div className={styles.sectionTitle}><span>06</span><h2>{t.caseHeadings[5]}</h2></div>
            <div className={styles.signalList}>{study.evidence.map(x=><div key={x}><i>↗</i><span>{x}</span></div>)}</div>
          </div>
        </section>
        <section className={styles.next}>
          <div><span>{t.caseStudy}</span><h2>{t.verifyTitle}</h2><p>{t.verifyText}</p></div>
          <div className={styles.nextLinks}>
            <a href={study.live} target="_blank" rel="noreferrer">{t.live} ↗</a>
            <a href={study.source} target="_blank" rel="noreferrer">GitHub ↗</a>
            <Link href={localePath(locale)+"#work"}>{t.more} ↗</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
