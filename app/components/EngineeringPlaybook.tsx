import Link from "next/link";
import { localePath, type Locale } from "../i18n";
import { PROFILE_LINKS } from "../portfolio-data";
import styles from "../portfolio-next.module.css";

const copy = {
 en:{label:"10 / ENGINEERING PLAYBOOK",title:"The checks behind a dependable release.",intro:"A practical checklist for evaluating product readiness, not a claim that every project has passed every check.",checks:[["Access","Keyboard navigation, semantic controls, reduced motion and mobile layouts."],["Contracts","Typed interfaces, input validation and predictable error responses."],["Reliability","Retry boundaries, idempotency where needed and failure recovery."],["Security","Authorization, dependency review and careful handling of secrets."],["Delivery","Automated checks, production builds and observable operations."]],links:"Review the projects",resume:"View résumé",contact:"Discuss an opportunity"},
 ar:{label:"10 / دليل التحقق",title:"كيف أقيّم جاهزية المنتج؟",intro:"قائمة عملية لمراجعة جاهزية البرمجيات، وليست ادعاءً بأن كل مشروع اجتاز جميع هذه الفحوص.",checks:[["إمكانية الوصول","التنقل بلوحة المفاتيح، والعناصر الدلالية، وتقليل الحركة، وتجاوب الهاتف."],["العقود البرمجية","تعريف الأنواع، والتحقق من المدخلات، واستجابات أخطاء واضحة."],["الموثوقية","حدود إعادة المحاولة، ومنع التكرار عند الحاجة، والتعافي من الأعطال."],["الأمان","الصلاحيات، ومراجعة الاعتماديات، وحماية الأسرار."],["التسليم","الفحوص الآلية، وبناء الإنتاج، ومراقبة التشغيل."]],links:"راجع المشاريع",resume:"عرض السيرة الذاتية",contact:"ناقش فرصة تعاون"},
 tr:{label:"10 / MÜHENDİSLİK KONTROL LİSTESİ",title:"Güvenilir bir sürüm için neleri kontrol ederim?",intro:"Bu, ürün hazırlığını değerlendirmek için bir kontrol listesidir; her projenin tüm kontrolleri geçtiği iddiası değildir.",checks:[["Erişilebilirlik","Klavye ile gezinme, anlamsal kontroller, azaltılmış hareket ve mobil düzenler."],["Sözleşmeler","Tür güvenli arayüzler, girdi doğrulaması ve tutarlı hata yanıtları."],["Güvenilirlik","Tekrar deneme sınırları, gerektiğinde tekilleştirme ve hata kurtarma."],["Güvenlik","Yetkilendirme, bağımlılık incelemesi ve gizli bilgilerin korunması."],["Teslimat","Otomatik kontroller, üretim derlemeleri ve izlenebilir operasyonlar."]],links:"Projeleri incele",resume:"Özgeçmişi görüntüle",contact:"İş birliğini görüşelim"}
} as const;

export default function EngineeringPlaybook({locale}:{locale:Locale}){
 const t=copy[locale];
 return <section className={styles.section} id="playbook" data-portfolio-section="playbook" aria-labelledby="playbook-heading">
  <div className={styles.intro}><p className={styles.eyebrow}>{t.label}</p><div>
   <h2 id="playbook-heading">{t.title}</h2><p className={styles.lead}>{t.intro}</p>
  </div></div>
  <ol style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:12,listStyle:"none",padding:0,margin:0}}>
   {t.checks.map(([title,detail],i)=><li key={title} data-playbook-check={i+1} style={{minWidth:0,border:"1px solid rgba(227,245,237,.18)",borderRadius:14,padding:24,background:"linear-gradient(140deg,#142e24,#091714)"}}>
    <span style={{color:"#b5ffcf",fontSize:12,fontWeight:800}}>{String(i+1).padStart(2,"0")} / 05</span>
    <h3 style={{fontSize:"1.3rem",margin:"22px 0 10px",overflowWrap:"anywhere"}}>{title}</h3>
    <p style={{fontSize:13,lineHeight:1.8,color:"#a9bcaf",margin:0}}>{detail}</p>
   </li>)}
  </ol>
  <div className={styles.connectBar} style={{marginTop:14}}>
   <p>{t.intro}</p><div className={styles.connectLinks}>
    <a href="#work">{t.links}<span aria-hidden="true">↗</span></a>
    <Link href={localePath(locale,"resume")}>{t.resume}<span aria-hidden="true">↗</span></Link>
    <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer">{t.contact}<span aria-hidden="true">↗</span></a>
   </div>
  </div>
 </section>;
}
