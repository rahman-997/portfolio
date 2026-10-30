import Image from "next/image";
import { PROFILE_LINKS } from "../portfolio-data";
import type { Locale } from "./locale";
import styles from "./cinematic.module.css";

const copy={
 en:{
  kicker:"HAJAR / INDEPENDENT ENGINEERING PRACTICE",
  overline:"Design-led software engineering",
  first:"Built with",
  second:"intention.",
  lead:"Full-stack products, thoughtful interfaces and resilient systems. Every featured project is backed by real code and a working public project.",
  explore:"Explore selected work", contact:"Start a conversation", lab:"Explore AI Lab",
  left:"DESIGN / SYSTEMS / CODE",right:"AN INDEPENDENT PORTFOLIO",
  note:"The HAJAR mark was traced from the original brand artwork.",
  meta:"SOFTWARE ENGINEER · FULL-STACK",
 },
 ar:{
  kicker:"HAJAR / ممارسة هندسية مستقلة",
  overline:"هندسة برمجيات تجمع الفكر والتصميم",
  first:"هندسة",
  second:"تترك بصمة.",
  lead:"تطبيقات متكاملة، واجهات مدروسة وأنظمة موثوقة. كل مشروع مميّز هنا مرتبط بكوده الحقيقي ونسخته العامة.",
  explore:"استكشف الأعمال",contact:"لنتحدث عن فكرتك",lab:"مختبر الذكاء الاصطناعي",
  left:"تصميم / أنظمة / برمجة",right:"معرض أعمال مستقل",
  note:"تم تحويل علامة HAJAR من الرسم الأصلي إلى نسخة متجهية.",
  meta:"مهندس برمجيات · مطور متكامل",
 },
 tr:{
  kicker:"HAJAR / BAĞIMSIZ MÜHENDİSLİK ÇALIŞMALARI",
  overline:"Tasarım odaklı yazılım mühendisliği",
  first:"Özenle",
  second:"tasarlandı.",
  lead:"Uçtan uca ürünler, özenli arayüzler ve dayanıklı sistemler. Seçilmiş her proje gerçek kaynak kod ve herkese açık bir uygulamayla desteklenir.",
  explore:"Seçilmiş işleri gör",contact:"Birlikte konuşalım",lab:"Yapay Zekâ Laboratuvarı",
  left:"TASARIM / SİSTEM / KOD",right:"BAĞIMSIZ PORTFOLYO",
  note:"HAJAR sembolü özgün marka çalışmasından vektöre aktarılmıştır.",
  meta:"YAZILIM MÜHENDİSİ · FULL-STACK",
 },
} as const;

export default function CinematicHero({locale}:{locale:Locale}){
 const t=copy[locale];
 return <section id="top" className={styles.hero} data-cinematic-scene="true" aria-labelledby="cinematic-heading">
  <div className={styles.topline}><span>{t.kicker}</span><span>01 / PORTFOLIO</span></div>
  <div className={styles.heroColumns}>
    <div className={styles.copy}>
      <div className={styles.indexRow}><span className={styles.blueDash}/>{t.overline}</div>
      <h1 id="cinematic-heading" className={styles.headline}><span>{t.first}</span><strong>{t.second}</strong></h1>
      <p className={styles.lead}>{t.lead}</p>
      <div className={styles.actions}>
        <a className={styles.actionPrimary} href="#featured">{t.explore}<span aria-hidden="true">↗</span></a>
        <a className={styles.actionSecondary} href={PROFILE_LINKS.linkedin} rel="noopener noreferrer" target="_blank">{t.contact}<span aria-hidden="true">↗</span></a>
      </div>
      <a className={styles.labShortcut} href="#ai-lab">{t.lab}<span aria-hidden="true">↗</span></a>
      <div className={styles.signature}><span className={styles.miniCross}>H.</span><div><strong>ABDULRAHMAN HAJAR</strong><span>{t.meta}</span></div></div>
    </div>
    <div className={styles.visual} role="img" aria-label={t.note}>
      <div className={styles.brandFrame}>
        <span className={styles.frameNumber} aria-hidden="true">HAJAR / 01</span>
        <Image src="/brand/hajar-emblem.svg" alt="" width={400} height={500} priority unoptimized className={styles.coreArt}/>
        <span className={styles.frameCaption} aria-hidden="true">THE MARK / THE MAKER</span>
      </div>
    </div>
  </div>
  <div className={styles.bottomline}><span>{t.left}</span><span className={styles.bottomRule}/><span>{t.right}</span></div>
 </section>;
}
