import type { Locale } from "./locale";

/** All evidence links point to existing, reviewed first-party case studies.
 * No invented impact totals, customer counts, awards or performance benchmarks. */
export const extraSections: Record<Locale, {
  navHighlights:string; navProcess:string;
  evidence:{eyebrow:string;title:string;lead:string;link:string;cards:ReadonlyArray<{project:string;code:string;result:string;detail:string;proof:string;href:string}>};
  process:{eyebrow:string;title:string;lead:string;steps:ReadonlyArray<{phase:string;title:string;detail:string}>};
  collaborate:{eyebrow:string;title:string;lead:string;button:string;cards:ReadonlyArray<{icon:string;title:string;detail:string;tags:string[]}>};
  faq:{eyebrow:string;title:string;lead:string;items:ReadonlyArray<{q:string;a:string}>};
}> = {
  en: {
    navHighlights:"Evidence",navProcess:"Process",
    evidence: {
      eyebrow:"ENGINEERING RECEIPTS / FOUR DEEP DIVES",
      title:"Engineering evidence, not vanity numbers.",
      lead:"Instead of claiming imaginary KPIs, these are concrete architecture choices and behaviors you can inspect in the source.",
      link:"Read the English case study",
      cards:[
        {project:"Eventify",code:"01 / DISTRIBUTED STATE",result:"Booking integrity & durable background work",detail:"PostgreSQL owns durable booking state; an outbox records async intent before BullMQ workers process it.",proof:"Transactions · Outbox · Queue",href:"/work/eventify/"},
        {project:"BookHaven",code:"02 / COMMERCE",result:"Order and inventory behavior",detail:"A full-stack bookstore where checkout locking, authorization and guarded order transitions are designed together.",proof:"RBAC · Checkout · Inventory",href:"/work/bookhaven/"},
        {project:"FitFlow",code:"03 / PRODUCT STATE",result:"Local-first, installable experience",detail:"Guided sessions, weekly progress and device-local persistence in an accessible fitness PWA.",proof:"PWA · Local storage · A11y",href:"/work/fitflow/"},
        {project:"Venues API",code:"04 / API CONTRACTS",result:"Backend boundaries you can test",detail:"Input validation, separated controllers/services and predictable errors backed by HTTP contract tests.",proof:"Express · Zod · HTTP tests",href:"/work/venues-api/"}
      ]
    },
    process:{
      eyebrow:"WORKFLOW / FROM IDEA TO PROOF",title:"How a project moves forward.",
      lead:"An engineering approach, not a claim that every project follows the same checklist. The goal is clarity from the first requirement to the shipped result.",
      steps:[
        {phase:"01 / DISCOVER",title:"Find the real problem",detail:"Clarify who the product is for, the essential user journey and what success should look like before choosing a stack."},
        {phase:"02 / DESIGN",title:"Choose clear boundaries",detail:"Sketch interface flows, API contracts, data ownership and the failure cases worth handling from day one."},
        {phase:"03 / BUILD",title:"Ship end-to-end slices",detail:"Connect real interface state to services and persistence in small, reviewable increments."},
        {phase:"04 / VERIFY",title:"Test beyond the happy path",detail:"Check mobile interactions, keyboard access, input validation, CI, dependency security and deployed behavior."}
      ]
    },
    collaborate:{
      eyebrow:"CAPABILITIES / LET'S MAKE IT USEFUL",title:"Ways to work together.",
      lead:"Areas I actively build and explore. Every project starts with a discussion of requirements, scope and constraints.",
      button:"Discuss an idea",
      cards:[
        {icon:"◇",title:"Product websites & PWAs",detail:"Responsive interfaces, practical design systems, installable experiences and accessible user journeys.",tags:["React","Next.js","TypeScript"]},
        {icon:"⌘",title:"APIs & full-stack systems",detail:"Backend architecture, authentication, persistence, integrations and reliable workflows.",tags:["Node.js","Express","Data"]},
        {icon:"✳",title:"Quality & engineering reviews",detail:"Improve test coverage, accessibility, deployment checks and maintainability of existing React or API projects.",tags:["CI/CD","A11y","Testing"]}
      ]
    },
    faq:{
      eyebrow:"FAQ / THE IMPORTANT DETAILS",title:"Questions, answered.",
      lead:"Practical details about the projects and how to explore them.",
      items:[
        {q:"Is every repository your original work?",a:"Six listed repositories are original projects. The free-claude-code repository is an upstream fork and is explicitly marked as such. Private repositories are not displayed."},
        {q:"Can I try every project online?",a:"Live demos are linked where a public deployment exists. Some free-tier deployments may need time to wake up. For projects without a public demo, the source repository is the primary reference."},
        {q:"Where can I see deeper technical decisions?",a:"Eventify, BookHaven, FitFlow and Venues API have dedicated architecture and implementation case studies. These detailed pages are currently written in English; source links accompany every project."},
        {q:"Does the AI Atlas run actual agents or analyze visitors?",a:"No. The AI Systems Atlas is an interactive visualization of engineering disciplines, not a live agent service, camera tool or visitor-tracking system."}
      ]
    }
  },
  ar:{
    navHighlights:"الأدلة",navProcess:"آلية العمل",
    evidence:{
      eyebrow:"أدلة هندسية / أربع دراسات تقنية",title:"أدلة هندسية بلا أرقام دعائية.",
      lead:"بدلاً من ادعاء أرقام نجاح غير موثّقة، هنا قرارات معمارية ووظائف يمكنك مراجعتها في الكود المصدري.",
      link:"اقرأ الدراسة التقنية (بالإنجليزية)",
      cards:[
        {project:"Eventify",code:"01 / حالة موزعة",result:"حجوزات متماسكة ومهام خلفية موثوقة",detail:"يحفظ PostgreSQL حالة الحجوزات الدائمة، ويسجّل Outbox نية تنفيذ المهام قبل معالجتها عبر BullMQ.",proof:"معاملات · Outbox · طوابير",href:"/work/eventify/"},
        {project:"BookHaven",code:"02 / تجارة إلكترونية",result:"سلوك الطلبات والمخزون",detail:"متجر كتب متكامل يجمع حماية الدفع والصلاحيات وانتقالات حالة الطلب ضمن نظام واحد.",proof:"صلاحيات · دفع · مخزون",href:"/work/bookhaven/"},
        {project:"FitFlow",code:"03 / حالة المنتج",result:"تجربة قابلة للتثبيت وتحفظ التقدم محلياً",detail:"جلسات موجهة وتقدم أسبوعي وحفظ محلي على الجهاز ضمن تطبيق لياقة يراعي إمكانية الوصول.",proof:"PWA · تخزين محلي · وصول",href:"/work/fitflow/"},
        {project:"Venues API",code:"04 / عقود API",result:"حدود خلفية قابلة للاختبار",detail:"التحقق من المدخلات وفصل المتحكمات عن الخدمات وأخطاء متوقعة تدعمها اختبارات HTTP.",proof:"Express · Zod · اختبارات",href:"/work/venues-api/"}
      ]
    },
    process:{
      eyebrow:"الآلية / من الفكرة إلى الدليل",title:"كيف أنقل الفكرة إلى التنفيذ.",
      lead:"منهجية هندسية مرنة، وليست وعداً بأن جميع المشاريع تسير على خطوات ثابتة. الهدف وضوح المتطلبات حتى الإطلاق.",
      steps:[
        {phase:"01 / اكتشاف",title:"فهم المشكلة الحقيقية",detail:"تحديد المستخدم ورحلته الأساسية ومعنى نجاح المنتج قبل اختيار التقنيات."},
        {phase:"02 / تصميم",title:"تحديد المسؤوليات",detail:"رسم تدفق الواجهات وعقود API وملكية البيانات وحالات الفشل المهمة منذ البداية."},
        {phase:"03 / تطوير",title:"تنفيذ أجزاء متكاملة",detail:"ربط الحالة الفعلية للواجهة بالخدمات والتخزين على مراحل صغيرة قابلة للمراجعة."},
        {phase:"04 / تحقق",title:"اختبار ما بعد الحالة المثالية",detail:"فحص الموبايل ولوحة المفاتيح والتحقق من المدخلات والبناء والأمان والسلوك بعد النشر."}
      ]
    },
    collaborate:{
      eyebrow:"مجالات العمل / خلينا نصنع شيئاً مفيداً",title:"مجالات يمكننا التعاون فيها.",
      lead:"مجالات أعمل عليها وأطوّر مهاراتي فيها. يبدأ أي مشروع بمناقشة احتياجاته ونطاقه وحدوده.",
      button:"ناقش فكرة معي",
      cards:[
        {icon:"◇",title:"مواقع وتطبيقات PWA",detail:"واجهات متجاوبة وأنظمة تصميم عملية وتجارب قابلة للتثبيت وسهلة الوصول.",tags:["React","Next.js","TypeScript"]},
        {icon:"⌘",title:"واجهات API وأنظمة متكاملة",detail:"هندسة الخدمات الخلفية والحسابات والتخزين والتكاملات وسير العمل الموثوق.",tags:["Node.js","Express","البيانات"]},
        {icon:"✳",title:"الجودة ومراجعة المشاريع",detail:"تحسين الاختبارات وإمكانية الوصول وفحوص النشر وقابلية صيانة مشاريع React وAPI.",tags:["CI/CD","إمكانية الوصول","اختبارات"]}
      ]
    },
    faq:{
      eyebrow:"أسئلة متكررة / تفاصيل مهمة",title:"أسئلة وأجوبة.",
      lead:"إجابات عملية عن المشاريع وأفضل طريقة لاستكشافها.",
      items:[
        {q:"هل جميع المستودعات من تطويرك الأصلي؟",a:"ستة مستودعات معروضة هي مشاريع أصلية. مستودع free-claude-code نسخة متفرعة من مشروع خارجي ومميّزة بذلك بوضوح. لا أعرض المستودعات الخاصة."},
        {q:"هل يمكن تجربة كل مشروع على الإنترنت؟",a:"أضع رابط العرض الحي عندما يكون متاحاً. بعض خدمات الاستضافة المجانية قد تحتاج إلى وقت لتستيقظ. إن لم يتوفر عرض عام، يبقى مستودع الكود المرجع الأساسي."},
        {q:"أين أقرأ التفاصيل الهندسية للمشاريع؟",a:"تتضمن مشاريع Eventify وBookHaven وFitFlow وVenues API دراسات منفصلة للمعمارية والتنفيذ. صفحات التفاصيل حالياً بالإنجليزية، وروابط الكود موجودة لكل مشروع."},
        {q:"هل يشغّل AI Atlas وكلاء حقيقيين أو يتتبع الزوار؟",a:"لا. AI Systems Atlas عرض تفاعلي لتخصصات الهندسة، وليس خدمة وكلاء حية أو أداة كاميرا أو نظام تتبع زوار."}
      ]
    }
  },
  tr:{
    navHighlights:"Kanıtlar",navProcess:"Süreç",
    evidence:{
      eyebrow:"MÜHENDİSLİK KANITLARI / DÖRT İNCELEME",title:"Gösteriş değil, mühendislik kanıtı.",
      lead:"Doğrulanmamış başarı rakamları yerine kaynak kodda inceleyebileceğiniz mimari kararları ve gerçek ürün davranışları.",
      link:"İngilizce incelemeyi oku",
      cards:[
        {project:"Eventify",code:"01 / DAĞITIK DURUM",result:"Tutarlı rezervasyonlar ve dayanıklı arka plan işleri",detail:"PostgreSQL kalıcı rezervasyon durumunu tutar; Outbox, BullMQ işçileri çalışmadan önce iş niyetini kaydeder.",proof:"İşlem · Outbox · Kuyruk",href:"/work/eventify/"},
        {project:"BookHaven",code:"02 / E-TİCARET",result:"Sipariş ve stok davranışı",detail:"Ödeme kilidi, yetkilendirme ve güvenli sipariş geçişlerini bir arada ele alan tam kapsamlı kitapçı.",proof:"RBAC · Ödeme · Stok",href:"/work/bookhaven/"},
        {project:"FitFlow",code:"03 / ÜRÜN DURUMU",result:"Cihazda saklanan, kurulabilir deneyim",detail:"Erişilebilir fitness PWA'sında yönlendirmeli seanslar, haftalık ilerleme ve yerel veri saklama.",proof:"PWA · Yerel veri · Erişim",href:"/work/fitflow/"},
        {project:"Venues API",code:"04 / API SÖZLEŞMELERİ",result:"Test edilebilir backend sınırları",detail:"HTTP testleriyle desteklenen şema doğrulama, ayrılmış controller/service katmanları ve tutarlı hatalar.",proof:"Express · Zod · HTTP testleri",href:"/work/venues-api/"}
      ]
    },
    process:{
      eyebrow:"İŞ AKIŞI / FİKİRDEN KANITA",title:"Bir proje nasıl ilerler?",
      lead:"Katı bir süreç iddiası değil, ilk gereksinimden çalışan ürüne kadar açıklığı hedefleyen esnek bir mühendislik yaklaşımı.",
      steps:[
        {phase:"01 / KEŞFET",title:"Asıl sorunu anla",detail:"Teknoloji seçmeden önce kullanıcıyı, temel yolculuğunu ve başarı ölçütlerini netleştir."},
        {phase:"02 / TASARLA",title:"Sınırları belirle",detail:"Arayüz akışlarını, API sözleşmelerini, veri sahipliğini ve önemli hata senaryolarını planla."},
        {phase:"03 / GELİŞTİR",title:"Uçtan uca parçalar üret",detail:"Gerçek arayüz durumunu servislerle ve veri kalıcılığıyla küçük, incelenebilir adımlarda birleştir."},
        {phase:"04 / DOĞRULA",title:"Başarılı senaryonun ötesini test et",detail:"Mobil etkileşimleri, klavye erişimini, giriş doğrulamasını, CI güvenliğini ve canlı davranışı kontrol et."}
      ]
    },
    collaborate:{
      eyebrow:"YETKİNLİKLER / BİRLİKTE ÜRETELİM",title:"Birlikte çalışabileceğimiz alanlar.",
      lead:"Üzerinde çalıştığım ve kendimi geliştirdiğim alanlar. Her iş, gereksinimlerin ve kapsamın birlikte değerlendirilmesiyle başlar.",
      button:"Bir fikri konuşalım",
      cards:[
        {icon:"◇",title:"Ürün siteleri ve PWA'lar",detail:"Duyarlı arayüzler, kullanışlı tasarım sistemleri, kurulabilir deneyimler ve erişilebilir akışlar.",tags:["React","Next.js","TypeScript"]},
        {icon:"⌘",title:"API ve uçtan uca sistemler",detail:"Backend mimarisi, kimlik doğrulama, veri saklama, entegrasyon ve güvenilir iş akışları.",tags:["Node.js","Express","Veri"]},
        {icon:"✳",title:"Kalite ve kod incelemesi",detail:"Mevcut React ve API projelerinde test kapsamı, erişilebilirlik, dağıtım kontrolü ve bakımı iyileştirme.",tags:["CI/CD","Erişilebilirlik","Test"]}
      ]
    },
    faq:{
      eyebrow:"SSS / TEMEL DETAYLAR",title:"Sorular ve yanıtlar.",
      lead:"Projeler ve onları nasıl inceleyebileceğiniz hakkında kısa, net cevaplar.",
      items:[
        {q:"Tüm depolar özgün çalışmanız mı?",a:"Listelenen altı depo özgün projedir. free-claude-code üçüncü taraf bir projeden fork'lanmıştır ve açıkça bu şekilde etiketlenir. Özel depolar gösterilmez."},
        {q:"Tüm projeleri çevrim içi deneyebilir miyim?",a:"Herkese açık dağıtımı olan projelerde canlı demo bağlantısı bulunur. Bazı ücretsiz sunucuların uyanması zaman alabilir. Canlı demo yoksa temel kaynak kod deposudur."},
        {q:"Teknik kararları nereden görebilirim?",a:"Eventify, BookHaven, FitFlow ve Venues API için özel mimari ve uygulama incelemeleri vardır. Bu ayrıntılı sayfalar şu anda İngilizcedir; her projenin kaynak bağlantısı da bulunur."},
        {q:"AI Atlas gerçekten ajan çalıştırıyor veya ziyaretçileri izliyor mu?",a:"Hayır. AI Systems Atlas mühendislik alanlarını anlatan etkileşimli bir görseldir; canlı ajan servisi, kamera aracı veya ziyaretçi takip sistemi değildir."}
      ]
    }
  }
};
