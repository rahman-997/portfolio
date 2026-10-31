import Image from "next/image";
import {PROFILE_LINKS} from "../portfolio-data";
import type {Locale} from "./locale";
import styles from "./cinematic.module.css";

const copy={
 en:{
  kicker:"DESIGN-LED SOFTWARE ENGINEERING",first:"Engineering",second:"that leaves a mark.",
  sub:"Design-led software engineering",
  lead:"I build thoughtful digital products, reliable systems and considered interfaces. Every project is an opportunity to solve a real problem.",
  explore:"Explore my work",contact:"Contact me",lab:"Explore AI Lab",hint:"Open to discussing new projects",
  halo:"IDEAS / SYSTEMS / PRODUCTS / PEOPLE",art:"THE MARK / THE MAKER",
  note:"Decorative mountain landscape and the HAJAR brand emblem.",
 },
 ar:{
  kicker:"هندسة البرمجيات بتصميم مدروس",first:"هندسة",second:"تترك بصمة.",
  sub:"Design-led software engineering",
  lead:"أبني منتجات رقمية متكاملة، بواجهات مدروسة وأنظمة موثوقة. كل مشروع فرصة لحل مشكلة حقيقية وترك أثر ملموس.",
  explore:"استكشف أعمالي",contact:"تواصل معي",lab:"مختبر الذكاء الاصطناعي",hint:"متاح لمناقشة مشاريع جديدة",
  halo:"أفكار / أنظمة / منتجات / أشخاص",art:"الشعار وصاحبه",
  note:"مشهد جبلي زخرفي ورمز HAJAR المستخرج من شعار المستخدم.",
 },
 tr:{
  kicker:"TASARIM ODAKLI YAZILIM MÜHENDİSLİĞİ",first:"İz bırakan",second:"mühendislik.",
  sub:"Design-led software engineering",
  lead:"Özenli arayüzler ve güvenilir sistemlerle gerçek dijital ürünler geliştiriyorum. Her proje gerçek bir sorunu çözme fırsatıdır.",
  explore:"Projelerimi keşfet",contact:"İletişime geç",lab:"Yapay Zekâ Laboratuvarı",hint:"Yeni proje görüşmelerine açık",
  halo:"FİKİRLER / SİSTEMLER / ÜRÜNLER / İNSANLAR",art:"MARKA / MÜHENDİS",
  note:"Dekoratif dağ manzarası ve kullanıcının orijinal çalışmasından uyarlanan HAJAR simgesi.",
 }
} as const;

export default function CinematicHero({locale}:{locale:Locale}){
 const t=copy[locale];
 return <section id="top" className={styles.hero} data-cinematic-scene="true" aria-labelledby="cinematic-heading">
   <div className={styles.scenery} aria-hidden="true"/>
   <div className={styles.copy}>
     <p className={styles.kicker}><span aria-hidden="true"/> {t.kicker}</p>
     <h1 id="cinematic-heading" className={styles.headline}><span>{t.first}</span> <strong>{t.second}</strong></h1>
     <p className={styles.subtitle} lang="en">{t.sub}</p>
     <p className={styles.lead}>{t.lead}</p>
     <div className={styles.actions}>
       <a href="#featured" className={styles.actionPrimary}>{t.explore}<span aria-hidden="true">↗</span></a>
       <a href={PROFILE_LINKS.linkedin} className={styles.actionSecondary} target="_blank" rel="noopener noreferrer">{t.contact}<span aria-hidden="true">↗</span></a>
     </div>
     <p className={styles.availability}><span aria-hidden="true"/> {t.hint}</p>
     <a href="#ai-lab" className={styles.labShortcut}>{t.lab} ↗</a>
   </div>
   <div className={styles.visual} role="img" aria-label={t.note}>
     <div className={styles.orbitalLines} aria-hidden="true"/>
     <Image src="/brand/hajar-emblem.svg" alt="" width={360} height={440} priority unoptimized className={styles.emblem}/>
     <p className={styles.manifesto}>{t.halo}</p>
     <span className={styles.artLabel}>{t.art}</span>
   </div>
 </section>;
}
