import type {Locale} from "./locale";
import styles from "./reference.module.css";
const copy={
 en:{eyebrow:"SYSTEM BLUEPRINT",title:"From interface to infrastructure.",lead:"A real engineering reference: the React experience connects to an API, durable records and asynchronous work. An explanatory architecture, not live infrastructure telemetry.",link:"Explore the interactive architecture lab",layers:[["Client / Web","React / PWA"],["API Layer","Express / Next.js"],["Database","PostgreSQL / Redis"],["Workers","BullMQ / Background"]]},
 ar:{eyebrow:"مخطط النظام",title:"من الواجهة إلى البنية التحتية.",lead:"نموذج هندسي توضيحي: الواجهة تتصل بخدمات API، وحفظ البيانات، والمهام الخلفية. هذا شرح للمعمارية، وليس لوحة تشغيل حية.",link:"استكشف مختبر المخططات التفاعلي",layers:[["واجهة المستخدم","React / PWA"],["طبقة API","Express / Next.js"],["قاعدة البيانات","PostgreSQL / Redis"],["المعالجات الخلفية","BullMQ / Background"]]},
 tr:{eyebrow:"SİSTEM MİMARİSİ",title:"Arayüzden altyapıya.",lead:"Gerçek mühendisliğe dayalı örnek: kullanıcı arayüzü API, kalıcı veri kayıtları ve arka plan işlerine bağlanır. Canlı telemetri değildir.",link:"Etkileşimli mimariyi keşfet",layers:[["İstemci / Web","React / PWA"],["API katmanı","Express / Next.js"],["Veritabanı","PostgreSQL / Redis"],["İşleyiciler","BullMQ / Background"]]}
} as const;
export default function ReferenceBlueprint({locale}:{locale:Locale}){
 const t=copy[locale];
 const icons=["▣","⌘","▤","⚙"];
 return <section id="system-overview" className={styles.blueprintOverview} aria-labelledby="system-overview-heading">
   <div className={styles.blueprintHeading}>
    <p>{t.eyebrow}</p>
    <a href="#blueprint-lab">{t.link} <span aria-hidden="true">↗</span></a>
   </div>
   <div className={styles.blueprintBody}>
    <div className={styles.blueprintIntro}><h2 id="system-overview-heading">{t.title}</h2><p>{t.lead}</p></div>
    <ol className={styles.blueprintFlow}>{t.layers.map((layer,i)=><li key={layer[0]}><span className={styles.flowIcon} aria-hidden="true">{icons[i]}</span><div><strong>{layer[0]}</strong><small dir="ltr">{layer[1]}</small></div>{i<3?<span className={styles.flowArrow} aria-hidden="true">→</span>:null}</li>)}</ol>
   </div>
 </section>;
}
