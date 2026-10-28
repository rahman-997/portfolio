import type { Locale } from "./i18n";

/** Editorial sections based solely on the four existing case studies. */
export const portfolioNext = {
 en:{
  decisions:{
   eyebrow:"08 / THE DECISION LOG",
   title:"Engineering decisions and trade-offs",
   intro:"Every architecture choice solves one problem and creates a constraint. These examples show both sides, with links to the actual implementation.",
   choice:"The choice",tradeoff:"The trade-off",caseStudy:"Read the case study",
   items:[
    {slug:"eventify",topic:"Bookings under concurrency",choice:"Keep durable booking state in PostgreSQL, while Redis and queues coordinate transient work.",tradeoff:"The outbox and worker pipeline add moving parts that must be monitored and retried."},
    {slug:"bookhaven",topic:"Safe commerce flows",choice:"Separate checkout rules and authorization from the interface, with explicit order and inventory transitions.",tradeoff:"Consistency requires more careful state handling than a simple CRUD form."},
    {slug:"fitflow",topic:"Progress without an account",choice:"Store workout progress on the user's device and keep the core journey installable and offline-ready.",tradeoff:"Device-local storage does not automatically synchronize progress across devices."},
    {slug:"venues-api",topic:"An API that is easy to audit",choice:"Validate external input before it reaches services, with centralized HTTP error handling.",tradeoff:"Layer boundaries introduce extra modules, even for a compact API."},
   ]
  },
  collaborate:{
   eyebrow:"09 / LET'S CONNECT THE DOTS",
   title:"Ways to collaborate",
   intro:"These are the areas represented in my portfolio. Start with the relevant project, then reach out with a clear challenge or role.",
   project:"Relevant project",
   areas:[
    {id:"product",title:"Product and interface engineering",desc:"Responsive React and Next.js experiences with accessible interaction and thoughtful state.",slug:"fitflow"},
    {id:"backend",title:"APIs and backend systems",desc:"Typed Node.js services, validation, data boundaries, queues and failure-aware workflows.",slug:"venues-api"},
    {id:"fullstack",title:"Full-stack product delivery",desc:"Features that connect interfaces, authentication, data, verification and operations.",slug:"bookhaven"},
   ],
   resume:"View résumé",contact:"Connect on LinkedIn",
   note:"Prefer evidence over claims? Each area links to a real project you can inspect."
  }
 },
 ar:{
  decisions:{
   eyebrow:"08 / سجل القرارات",
   title:"قرارات هندسية ومفاضلات",
   intro:"كل اختيار معماري يعالج مشكلة ويضع حدوداً جديدة. هنا أمثلة توضّح القرار وتكلفته، مع رابط التنفيذ الفعلي.",
   choice:"القرار",tradeoff:"المفاضلة",caseStudy:"اقرأ دراسة المشروع",
   items:[
    {slug:"eventify",topic:"الحجوزات المتزامنة",choice:"الاحتفاظ بحالة الحجز الدائمة في PostgreSQL، واستخدام Redis والطوابير لتنسيق المهام المؤقتة.",tradeoff:"تضيف آلية Outbox والعمّال أجزاءً تحتاج إلى مراقبة وإعادة محاولة عند الفشل."},
    {slug:"bookhaven",topic:"اتساق الشراء والمخزون",choice:"فصل قواعد الدفع والصلاحيات عن الواجهة، مع انتقالات واضحة لحالات الطلب والمخزون.",tradeoff:"تتطلب سلامة البيانات إدارة أدق للحالة مقارنةً بعمليات CRUD البسيطة."},
    {slug:"fitflow",topic:"حفظ التقدّم بدون حساب",choice:"حفظ تقدّم التدريب على الجهاز وتوفير تجربة أساسية قابلة للتثبيت والعمل باتصال محدود.",tradeoff:"التخزين المحلي لا يزامن التقدم تلقائياً بين الأجهزة المختلفة."},
    {slug:"venues-api",topic:"واجهة API قابلة للمراجعة",choice:"التحقق من المدخلات قبل وصولها إلى الخدمات، مع معالجة مركزية لأخطاء HTTP.",tradeoff:"يضيف فصل الطبقات ملفات ومسؤوليات إضافية حتى في الخدمات الصغيرة."},
   ]
  },
  collaborate:{
   eyebrow:"09 / مجالات العمل",
   title:"مجالات التعاون",
   intro:"هذه المجالات موثّقة في مشاريعي. اختر المجال الأقرب لفكرتك أو الفرصة المهنية، واطّلع على مثال عملي قبل التواصل.",
   project:"مشروع مرتبط",
   areas:[
    {id:"product",title:"واجهات وتجارب المنتجات",desc:"تجارب React وNext.js متجاوبة، مع تفاعلات قابلة للوصول وإدارة واضحة للحالة.",slug:"fitflow"},
    {id:"backend",title:"واجهات API والأنظمة الخلفية",desc:"خدمات Node.js مع أنواع واضحة وتحقق من المدخلات وحدود البيانات والتعامل مع الأعطال.",slug:"venues-api"},
    {id:"fullstack",title:"تطوير المنتجات المتكامل",desc:"ربط الواجهات والمصادقة والبيانات والتحقق والعمليات في تجربة واحدة.",slug:"bookhaven"},
   ],
   resume:"عرض السيرة الذاتية",contact:"تواصل عبر LinkedIn",
   note:"تفضّل التحقق من العمل؟ يرتبط كل مجال بمشروع حقيقي يمكنك مراجعته."
  }
 },
 tr:{
  decisions:{
   eyebrow:"08 / KARAR KAYITLARI",
   title:"Mühendislik kararları ve ödünleşimler",
   intro:"Her mimari tercih bir sorunu çözerken yeni bir sınır oluşturur. Bu örneklerde hem kararı hem de bedelini, gerçek uygulama bağlantılarıyla paylaşıyorum.",
   choice:"Tercih",tradeoff:"Ödünleşim",caseStudy:"Teknik incelemeyi oku",
   items:[
    {slug:"eventify",topic:"Eşzamanlı rezervasyonlar",choice:"Kalıcı rezervasyon durumunu PostgreSQL'de tutup Redis ve kuyruklarla geçici işleri koordine etmek.",tradeoff:"Outbox ve çalışan süreçleri ek izleme, bakım ve tekrar deneme mantığı gerektirir."},
    {slug:"bookhaven",topic:"Güvenli sipariş akışları",choice:"Ödeme kurallarını ve yetkilendirmeyi arayüzden ayırıp sipariş ve stok geçişlerini açıkça yönetmek.",tradeoff:"Veri tutarlılığı, basit CRUD işlemlerine göre daha dikkatli durum yönetimi ister."},
    {slug:"fitflow",topic:"Hesapsız ilerleme kaydı",choice:"Antrenman ilerlemesini cihazda saklayıp temel akışı yüklenebilir ve çevrim dışına hazır tutmak.",tradeoff:"Yerel depolama, farklı cihazlar arasında otomatik eşitleme sağlamaz."},
    {slug:"venues-api",topic:"İncelenebilir API sınırları",choice:"Girdileri hizmet katmanına ulaşmadan doğrulayıp HTTP hatalarını tek merkezde yönetmek.",tradeoff:"Bu katmanlar küçük bir API için bile ek dosyalar ve sorumluluklar oluşturur."},
   ]
  },
  collaborate:{
   eyebrow:"09 / ÇALIŞMA ALANLARI",
   title:"Birlikte çalışma alanları",
   intro:"Bu alanlar portföyümde gerçek projelerle temsil ediliyor. İlgili örneği inceleyip proje veya pozisyon hakkında iletişime geçebilirsiniz.",
   project:"İlgili proje",
   areas:[
    {id:"product",title:"Ürün ve arayüz geliştirme",desc:"Erişilebilir etkileşimler ve anlaşılır durum yönetimiyle duyarlı React ve Next.js deneyimleri.",slug:"fitflow"},
    {id:"backend",title:"API ve backend sistemleri",desc:"Tür güvenli Node.js servisleri, doğrulama, veri sınırları, kuyruklar ve hata senaryoları.",slug:"venues-api"},
    {id:"fullstack",title:"Uçtan uca ürün geliştirme",desc:"Arayüz, kimlik doğrulama, veri, doğrulama ve operasyonları bir araya getiren özellikler.",slug:"bookhaven"},
   ],
   resume:"Özgeçmişi görüntüle",contact:"LinkedIn üzerinden iletişim",
   note:"İddialar yerine kanıt mı arıyorsunuz? Her çalışma alanı inceleyebileceğiniz gerçek bir projeye bağlanır."
  }
 }
} as const satisfies Record<Locale,{
 decisions:{
  eyebrow:string;title:string;intro:string;choice:string;tradeoff:string;caseStudy:string;
  items:readonly {slug:string;topic:string;choice:string;tradeoff:string}[];
 };
 collaborate:{
  eyebrow:string;title:string;intro:string;project:string;
  areas:readonly {id:string;title:string;desc:string;slug:string}[];
  resume:string;contact:string;note:string;
 };
}>;
