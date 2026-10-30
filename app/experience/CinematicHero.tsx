import Image from "next/image";
import { PROFILE_LINKS } from "../portfolio-data";
import type { Locale } from "./locale";
import styles from "./cinematic.module.css";

const words = {
  en: {
    eyebrow:"DIGITAL CRAFT  /  ENGINEERING THE NEXT",
    lead:"I turn complex ideas into fast interfaces, resilient systems and products people can actually use.",
    top:"ENGINEERING",
    bottom:"REAL SYSTEMS.",
    build:"EXPLORE THE SYSTEMS",
    connect:"LET'S CONNECT",
    index:"INTERACTIVE PORTFOLIO / 2026",
    status:"SYSTEMS THINKING · HUMAN CONTROL",
    descriptor:"A concept illustration, not a live AI system.",
    artTop:"HUMAN × COMPUTATION",
    artBottom:"ANATOMY OF A SYSTEM",
    scroll:"SCROLL TO DISCOVER"
  },
  ar: {
    eyebrow:"حِرفة رقمية / هندسة المستقبل",
    lead:"أحوّل الأفكار المعقدة إلى واجهات سريعة وأنظمة موثوقة ومنتجات رقمية قابلة للاستخدام فعلاً.",
    top:"أبني",
    bottom:"أنظمة حقيقية.",
    build:"اكتشف الأنظمة",
    connect:"لنتواصل",
    index:"معرض هندسي تفاعلي / 2026",
    status:"هندسة الأنظمة · القرار بيد الإنسان",
    descriptor:"تصور فني توضيحي، وليس نظام ذكاء اصطناعي حيّاً.",
    artTop:"الإنسان × الحوسبة",
    artBottom:"تشريح نظام رقمي",
    scroll:"تابع لاكتشاف المشاريع"
  },
  tr: {
    eyebrow:"DİJİTAL ZANAAT / GELECEĞİN MÜHENDİSLİĞİ",
    lead:"Karmaşık fikirleri hızlı arayüzlere, dayanıklı sistemlere ve insanların gerçekten kullanabildiği ürünlere dönüştürüyorum.",
    top:"GERÇEK",
    bottom:"SİSTEMLER.",
    build:"SİSTEMLERİ KEŞFET",
    connect:"İLETİŞİME GEÇ",
    index:"ETKİLEŞİMLİ PORTFOLYO / 2026",
    status:"SİSTEM MİMARİSİ · İNSAN DENETİMİ",
    descriptor:"Canlı bir yapay zekâ sistemi değil, kavramsal illüstrasyon.",
    artTop:"İNSAN × HESAPLAMA",
    artBottom:"BİR SİSTEMİN ANATOMİSİ",
    scroll:"PROJELERİ KEŞFET"
  },
} as const;

export default function CinematicHero({locale}:{locale:Locale}){
  const t=words[locale];
  return <section id="top" className={styles.hero} data-cinematic-scene="true"
    aria-labelledby="cinematic-heading">
    <div className={styles.stars} aria-hidden="true"/>
    <div className={styles.grid} aria-hidden="true"/>
    <div className={styles.topline}><span><i className={styles.signalDot}/>{t.eyebrow}</span><span>AH / SYSTEMS_26</span></div>
    <div className={styles.heroColumns}>
      <div className={styles.copy}>
        <div className={styles.indexRow}><span className={styles.blueDash}/>{t.index}</div>
        <h1 id="cinematic-heading" className={styles.headline}><span>{t.top}</span><strong>{t.bottom}</strong></h1>
        <p className={styles.lead}>{t.lead}</p>
        <div className={styles.actions}>
          <a className={styles.actionPrimary} href="#featured">{t.build}<span aria-hidden="true">↗</span></a>
          <a className={styles.actionSecondary} href={PROFILE_LINKS.linkedin} rel="noopener noreferrer" target="_blank">{t.connect}<span aria-hidden="true">↗</span></a>
        </div>
        <a className={styles.labShortcut} href="#ai-lab">{locale==="ar"?"مختبر الذكاء الاصطناعي":locale==="tr"?"Yapay Zekâ Lab":"Explore AI Lab"}<span aria-hidden="true">↗</span></a>
        <div className={styles.signature}>
          <span className={styles.miniCross} aria-hidden="true">✳</span>
          <div><strong>ABDULRAHMAN HAJAR</strong><span>SOFTWARE ENGINEER / FULL-STACK</span></div>
        </div>
      </div>
      <div className={styles.visual} role="img" aria-label={t.descriptor}>
        <div className={styles.visualHalo} aria-hidden="true"/>
        <div className={styles.orbitFrame} aria-hidden="true"/>
        <Image src="/art/cinematic-core.svg" alt="" className={styles.coreArt} width={1200} height={1200} priority unoptimized/>
        <div className={styles.artLabel} aria-hidden="true"><span>{t.artTop}</span><span>01 — 07</span></div>
        <div className={styles.artBottom} aria-hidden="true"><i/>{t.artBottom}</div>
      </div>
    </div>
    <div className={styles.bottomline}><span>{t.scroll}<span aria-hidden="true"> ↓</span></span><span className={styles.bottomRule}/><span>{t.status}</span></div>
  </section>;
}
