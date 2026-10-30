import type { Locale } from "./i18n";

/** V3.10 copy for evidence-based static sections. No external metrics or unverified claims. */
export const portfolioDepth = {
 en:{
  compare:{
   eyebrow:"10 / PROJECT MAP",title:"Compare the projects",
   lead:"Four different problems, four different technical shapes. Use this compact map to choose a case study.",
   area:"Engineering focus",technology:"Selected stack",view:"Open case study",
   cards:[
    {slug:"eventify",focus:"Concurrent bookings and asynchronous reliability",shape:"Distributed full-stack system"},
    {slug:"bookhaven",focus:"Orders, authentication and inventory",shape:"Full-stack commerce"},
    {slug:"fitflow",focus:"Guided sessions and device-local progress",shape:"Installable, offline-ready PWA"},
    {slug:"venues-api",focus:"Validation, HTTP contracts and service boundaries",shape:"Focused REST backend"},
   ],
  },
  patterns:{
   eyebrow:"11 / INSIDE THE SYSTEM",title:"Explore the architecture",
   lead:"Open any project to follow its architecture from the browser or HTTP boundary toward persistence and delivery. This is a readable map, not a live system diagram.",
   show:"Show architecture",decision:"Representative decision",inspect:"Explore implementation",
  },
  quality:{
   eyebrow:"12 / ENGINEERING EVIDENCE",title:"Quality you can inspect",
   lead:"The portfolio has automated checks and deliberate failure paths. These are verification areas, not performance scores or a claim that every device has been tested.",
   workflow:"Open portfolio CI checks",disclaimer:"Automated browser simulation is not a replacement for hands-on testing on physical devices.",
   categories:[
    {id:"types",title:"Contracts before deployment",points:["TypeScript validation and ESLint","Deterministic 3D geometry checks","Static export route and language contracts"]},
    {id:"devices",title:"Across screen sizes",points:["Arabic RTL and Turkish layouts","Small-screen, 200%-text and touch-target checks","Keyboard controls and native no-JS navigation"]},
    {id:"resilience",title:"Graceful degradation",points:["WebGL2 fallback to painted Canvas 2D","GPU context-loss and failed-shader tests","Pinch/zoom, orientation change and reduced motion"]},
    {id:"security",title:"Delivery with safeguards",points:["Dependency audit in CI","Local-only static preview for Wi-Fi checks","No server secrets required by the static export"]},
   ],
  },
  toolbox:{
   eyebrow:"13 / TECHNOLOGY IN CONTEXT",title:"Technologies in context",
   lead:"A technology matters most in what it helps build. Select a tool below and see which of the four published case studies actually uses it.",
   show:"Used in",none:"No project",
   categories:[
    {id:"interface",title:"Product interfaces",tools:["React","Next.js","PWA","Modern CSS"]},
    {id:"api",title:"APIs and contracts",tools:["TypeScript","Express 5","Zod","Zod 4","REST"]},
    {id:"data",title:"Data and background work",tools:["PostgreSQL","MongoDB","Prisma","Redis","BullMQ"]},
    {id:"browser",title:"Browser capabilities",tools:["Web APIs"]},
   ],
  },
 },
 ar:{
  compare:{
   eyebrow:"10 / خريطة المشاريع",title:"مقارنة المشاريع",
   lead:"أربعة تحديات وأربع بنيات تقنية مختلفة. هذه مقارنة مختصرة تساعدك على اختيار المشروع الذي تريد مراجعته.",
   area:"التركيز الهندسي",technology:"أبرز التقنيات",view:"افتح دراسة المشروع",
   cards:[
    {slug:"eventify",focus:"الحجوزات المتزامنة وموثوقية المهام الخلفية",shape:"نظام متكامل موزّع"},
    {slug:"bookhaven",focus:"الطلبات والمصادقة والمخزون",shape:"تجارة إلكترونية متكاملة"},
    {slug:"fitflow",focus:"جلسات تدريب موجّهة وتقدّم محفوظ على الجهاز",shape:"تطبيق PWA قابل للتثبيت والعمل دون اتصال"},
    {slug:"venues-api",focus:"التحقق من البيانات وعقود HTTP وحدود الخدمات",shape:"خدمة REST خلفية متخصصة"},
   ],
  },
  patterns:{
   eyebrow:"11 / داخل النظام",title:"استكشف البنية التقنية",
   lead:"افتح أي مشروع لتتبّع مسار مكوّناته من الواجهة أو طلب HTTP إلى البيانات والتسليم. هذا شرح للبنية وليس رسماً حياً للنظام.",
   show:"اعرض مكوّنات البنية",decision:"قرار تقني بارز",inspect:"استكشف التنفيذ",
  },
  quality:{
   eyebrow:"12 / أدلة الجودة",title:"أدلة الجودة",
   lead:"يتضمن الموقع فحوصاً آلية وسلوكاً احتياطياً عند الأعطال. هذه مجالات تحقق، وليست درجات أداء أو ادعاءً باختبار كل الأجهزة.",
   workflow:"اطّلع على فحوص CI",disclaimer:"محاكاة المتصفح الآلية لا تغني عن اختبار الأداء واللمس على أجهزة حقيقية.",
   categories:[
    {id:"types",title:"العقود قبل التسليم",points:["فحص TypeScript وESLint","اختبارات حتمية لهندسة المجسّم","التحقق من التصدير الثابت وروابط اللغات"]},
    {id:"devices",title:"اختبارات أحجام الشاشات",points:["تخطيط العربية RTL والتركية","فحوص الشاشات الصغيرة وتكبير النص 200% وأبعاد اللمس","لوحة المفاتيح والتنقل دون JavaScript"]},
    {id:"resilience",title:"العمل عند تعطل الرسوميات",points:["بديل Canvas 2D مرسوم عند غياب WebGL2","اختبار فقدان GPU وفشل Shader","التقريب بإصبعين وتدوير الشاشة وتقليل الحركة"]},
    {id:"security",title:"ضوابط التسليم",points:["تدقيق الاعتماديات داخل CI","معاينة ثابتة محلية عبر Wi-Fi فقط","التصدير الثابت لا يحتاج أسرار خادم"]},
   ],
  },
  toolbox:{
   eyebrow:"13 / التقنية في سياقها",title:"التقنيات في سياقها",
   lead:"أهمية التقنية تظهر في استخدامها. استكشف الأدوات هنا وتعرّف على مشاريع البورتفوليو التي تستعملها فعلاً.",
   show:"مستخدمة في",none:"لا يوجد مشروع",
   categories:[
    {id:"interface",title:"واجهات المنتجات",tools:["React","Next.js","PWA","Modern CSS"]},
    {id:"api",title:"واجهات API والعقود",tools:["TypeScript","Express 5","Zod","Zod 4","REST"]},
    {id:"data",title:"البيانات والمهام الخلفية",tools:["PostgreSQL","MongoDB","Prisma","Redis","BullMQ"]},
    {id:"browser",title:"إمكانات المتصفح",tools:["Web APIs"]},
   ],
  },
 },
 tr:{
  compare:{
   eyebrow:"10 / PROJE HARİTASI",title:"Projeleri karşılaştır",
   lead:"Dört farklı problem, dört farklı teknik yaklaşım. İncelemek istediğiniz projeyi bu kısa karşılaştırmadan seçebilirsiniz.",
   area:"Mühendislik odağı",technology:"Öne çıkan teknolojiler",view:"Teknik incelemeyi aç",
   cards:[
    {slug:"eventify",focus:"Eşzamanlı rezervasyonlar ve asenkron iş güvenilirliği",shape:"Dağıtık full-stack sistem"},
    {slug:"bookhaven",focus:"Siparişler, kimlik doğrulama ve stok",shape:"Uçtan uca e-ticaret"},
    {slug:"fitflow",focus:"Rehberli oturumlar ve cihazda saklanan ilerleme",shape:"Yüklenebilir, çevrim dışına hazır PWA"},
    {slug:"venues-api",focus:"Doğrulama, HTTP sözleşmeleri ve hizmet sınırları",shape:"Odaklı REST backend"},
   ],
  },
  patterns:{
   eyebrow:"11 / SİSTEMİN İÇİNDE",title:"Mimariyi keşfet",
   lead:"Tarayıcı veya HTTP sınırından başlayarak veri ve teslimata uzanan mimariyi izlemek için projeyi açın. Bu canlı sistem diyagramı değil, okunabilir bir açıklamadır.",
   show:"Mimariyi göster",decision:"Örnek teknik karar",inspect:"Uygulamayı incele",
  },
  quality:{
   eyebrow:"12 / MÜHENDİSLİK KANITLARI",title:"Kalite kanıtları",
   lead:"Portföy otomatik kontroller ve hata senaryolarını kapsar. Bunlar performans puanı veya her fiziksel cihazda test edildiği iddiası değildir.",
   workflow:"Portföy CI kontrollerini aç",disclaimer:"Otomatik tarayıcı simülasyonu, gerçek cihazlardaki performans ve dokunma testlerinin yerini tutmaz.",
   categories:[
    {id:"types",title:"Dağıtımdan önce sözleşmeler",points:["TypeScript doğrulaması ve ESLint","Deterministik 3B geometri kontrolleri","Statik dışa aktarma rotaları ve dil sözleşmeleri"]},
    {id:"devices",title:"Ekran boyutları",points:["Arapça RTL ve Türkçe düzenler","Dar ekran, %200 metin ve dokunma hedefi kontrolleri","Klavye ve JavaScript olmadan yerel gezinme"]},
    {id:"resilience",title:"Sorunlara dayanıklılık",points:["WebGL2 için çizilmiş Canvas 2D alternatifi","GPU bağlamı kaybı ve shader hatası testleri","İki parmakla yakınlaştırma, ekran döndürme ve azaltılmış hareket"]},
    {id:"security",title:"Güvenli teslimat",points:["CI içinde bağımlılık denetimi","Wi-Fi için yalnızca yerel statik önizleme","Statik çıktı için sunucu sırları gerekmemesi"]},
   ],
  },
  toolbox:{
   eyebrow:"13 / BAĞLAMINDA TEKNOLOJİ",title:"Teknolojiler bağlamında",
   lead:"Teknoloji, neyi mümkün kıldığıyla anlam kazanır. Araçların hangi gerçek portföy projesinde kullanıldığını buradan görebilirsiniz.",
   show:"Kullanıldığı projeler",none:"Proje yok",
   categories:[
    {id:"interface",title:"Ürün arayüzleri",tools:["React","Next.js","PWA","Modern CSS"]},
    {id:"api",title:"API ve sözleşmeler",tools:["TypeScript","Express 5","Zod","Zod 4","REST"]},
    {id:"data",title:"Veri ve arka plan işleri",tools:["PostgreSQL","MongoDB","Prisma","Redis","BullMQ"]},
    {id:"browser",title:"Tarayıcı yetenekleri",tools:["Web APIs"]},
   ],
  },
 },
} as const satisfies Record<Locale,{
 compare:{eyebrow:string;title:string;lead:string;area:string;technology:string;view:string;cards:readonly {slug:string;focus:string;shape:string}[]};
 patterns:{eyebrow:string;title:string;lead:string;show:string;decision:string;inspect:string};
 quality:{eyebrow:string;title:string;lead:string;workflow:string;disclaimer:string;categories:readonly {id:string;title:string;points:readonly string[]}[]};
 toolbox:{eyebrow:string;title:string;lead:string;show:string;none:string;categories:readonly {id:string;title:string;tools:readonly string[]}[]};
}>;
