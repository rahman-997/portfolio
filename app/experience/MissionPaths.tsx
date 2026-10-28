import type {Locale} from "./locale";
import styles from "./labs.module.css";

const content={
 en:{
  eyebrow:"CHOOSE YOUR PATH / START HERE",
  title:"Different goals.",highlight:"One point of entry.",
  intro:"No endless scrolling required. Pick what you're here to explore and jump straight to the evidence.",
  options:[
   {marker:"01 / RECRUITING",title:"Evaluate the engineer",detail:"Start with deployed work, then explore implementation choices and the résumé.",primary:"VIEW FEATURED WORK",secondary:"RÉSUMÉ (EN)",link:"#featured",other:"/resume/",icon:"◎"},
   {marker:"02 / TECHNICAL REVIEW",title:"Inspect the systems",detail:"Open the architecture diagrams, source-backed case studies and interactive engineering map.",primary:"OPEN BLUEPRINT LAB",secondary:"ENGINEERING EVIDENCE",link:"#blueprint-lab",other:"#highlights",icon:"⌘"},
   {marker:"03 / COLLABORATION",title:"Build something together",detail:"See the kinds of work I take on, and use the existing direct contact profile.",primary:"EXPLORE CAPABILITIES",secondary:"CONTACT",link:"#collaborate",other:"#contact",icon:"↗"},
  ],
 },
 ar:{
  eyebrow:"اختر مسارك / ابدأ من هنا",
  title:"أهداف مختلفة.",highlight:"نقطة انطلاق واحدة.",
  intro:"مش ضروري تتصفح الصفحة كاملة. اختر شو بدك تشوف وبتوصل مباشرة إلى الدليل.",
  options:[
   {marker:"01 / توظيف",title:"تقييم المهندس",detail:"ابدأ بالمشاريع المنشورة، ثم استكشف الخيارات التقنية والسيرة الذاتية.",primary:"المشاريع المختارة",secondary:"السيرة الذاتية (EN)",link:"#featured",other:"/resume/",icon:"◎"},
   {marker:"02 / مراجعة تقنية",title:"استكشاف الأنظمة",detail:"راجع المخططات المعمارية والدراسات التقنية وخريطة التخصصات التفاعلية.",primary:"افتح مختبر المخططات",secondary:"الأدلة الهندسية",link:"#blueprint-lab",other:"#highlights",icon:"⌘"},
   {marker:"03 / تعاون",title:"نبني شيئاً معاً",detail:"شاهد مجالات العمل ثم تواصل عبر ملف التواصل المباشر.",primary:"مجالات التعاون",secondary:"تواصل",link:"#collaborate",other:"#contact",icon:"↗"},
  ],
 },
 tr:{
  eyebrow:"YOLUNU SEÇ / BURADAN BAŞLA",
  title:"Farklı hedefler.",highlight:"Tek başlangıç noktası.",
  intro:"Uzun uzun kaydırmanıza gerek yok. İlginizi çeken yolu seçin ve doğrudan ilgili kanıta ulaşın.",
  options:[
   {marker:"01 / İŞE ALIM",title:"Mühendisi değerlendirin",detail:"Canlı projelerden başlayın, ardından teknik kararları ve özgeçmişi inceleyin.",primary:"SEÇİLİ PROJELER",secondary:"ÖZGEÇMİŞ (EN)",link:"#featured",other:"/resume/",icon:"◎"},
   {marker:"02 / TEKNİK İNCELEME",title:"Sistemleri inceleyin",detail:"Mimari diyagramları, kaynak destekli teknik incelemeleri ve etkileşimli atlası keşfedin.",primary:"MİMARİ LAB'I AÇ",secondary:"MÜHENDİSLİK KANITLARI",link:"#blueprint-lab",other:"#highlights",icon:"⌘"},
   {marker:"03 / İŞ BİRLİĞİ",title:"Birlikte geliştirelim",detail:"Çalışma alanlarını keşfedin, ardından doğrudan iletişim kurun.",primary:"YETKİNLİKLERİ KEŞFET",secondary:"İLETİŞİM",link:"#collaborate",other:"#contact",icon:"↗"},
  ],
 },
} as const;
export default function MissionPaths({locale}:{locale:Locale}) {
 const t=content[locale];
 return <section id="mission-paths" className={styles.missions} aria-labelledby="mission-title">
    <div className={styles.missionHeader}>
      <span className={styles.overline}><span className={styles.glint}/>{t.eyebrow}</span>
      <h2 id="mission-title">{t.title}<br/><em>{t.highlight}</em></h2>
      <p>{t.intro}</p>
    </div>
    <div className={styles.paths}>
      {t.options.map((entry,i)=><article key={entry.marker} data-mission-path={i+1} className={styles.path}>
        <div className={styles.pathTop}><span>{entry.marker}</span><span className={styles.pathIcon} aria-hidden="true">{entry.icon}</span></div>
        <h3>{entry.title}</h3><p>{entry.detail}</p>
        <div className={styles.pathActions}><a href={entry.link}>{entry.primary}<span aria-hidden="true">↗</span></a>
        <a href={entry.other}>{entry.secondary}</a></div>
      </article>)}
    </div>
 </section>;
}
