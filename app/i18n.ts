import { PROJECTS, type ProjectSlug } from "./portfolio-data";

export type Locale = "en" | "ar" | "tr";
export type TranslationLocale = "ar" | "tr";
export const LOCALIZED = ["ar", "tr"] as const;
export function isTranslationLocale(value: string): value is TranslationLocale {
  return value === "ar" || value === "tr";
}
export function localePath(locale: Locale, page: "home" | "resume" | "work" = "home", slug?: string) {
  const prefix = locale === "en" ? "" : "/" + locale;
  return page === "home" ? prefix + "/" : page === "resume" ? prefix + "/resume/" : prefix + "/work/" + slug + "/";
}
export const alternateLinks = (page: "home" | "resume" | "work", slug?: string) => ({
  en: localePath("en", page, slug), ar: localePath("ar", page, slug), tr: localePath("tr", page, slug),
});

const ar = {
  nav: {work:"المشاريع", systems:"هندسة الأنظمة", process:"طريقة عملي", about:"عني", resume:"السيرة الذاتية", contact:"تواصل", home:"الرئيسية", back:"العودة للمشاريع", skip:"الانتقال للمحتوى", lang:"اختيار اللغة"},
  job:"مهندس برمجيات · مطوّر Full-Stack · أنظمة الذكاء الاصطناعي والتفاعل",
  name:"عبدالرحمن حجار", role:"مهندس برمجيات", location:"إسطنبول، تركيا",
  headline1:"أبني البرمجيات", headline2:"كأنظمة متكاملة، لا كواجهات فقط.",
  lead:"أطوّر منتجات برمجية من الواجهة إلى واجهات API وقواعد البيانات والمعالجة غير المتزامنة والاختبارات والأمان والنشر، مع الاهتمام بما يحدث عند تعطل أي جزء.",
  explore:"استكشف مشاريعي", viewResume:"عرض السيرة الذاتية", download:"تحميل PDF", print:"نسخة للطباعة", proofTitle:"ملفي الهندسي ومهاراتي", focus:"مجال التركيز", focusText:"منتجات Full-Stack مع اهتمام عميق بموثوقية الأنظمة الخلفية.", edu:"هندسة الكمبيوتر", institution:"جامعة نيشانتاشي",
  product:"المنتج", backend:"الخلفية", data:"البيانات", systemsShort:"الأنظمة",
  featured:"أنظمة مميزة", deployed:"نسخ قابلة للتجربة", source:"كود المصدر متاح", studies:"دراسات هندسية", ready:"سيرة ذاتية للاطلاع",
  sectionWork:"01 / أعمال مختارة", workTitle:"أدلة تقنية، لا مجرد زخرفة.", workText:"أعرض القرارات الهندسية وراء كل مشروع: الحدود بين المكونات، وإدارة الأعطال والبيانات، والاختبارات، والنشر.",
  caseStudy:"دراسة المشروع", live:"التجربة المباشرة", sourceLink:"الشيفرة المصدرية",
  systemHeading:"02 / تفكير هندسي", systemsTitle:"أتابع الطلب حتى آخر طبقة في النظام.", systemsText:"التصميم الجيد يبدأ من الواجهة لكنه لا ينتهي عندها، بل يشمل التحقق والتخزين والخدمات الخلفية وإدارة الأخطاء.",
  flowTitle:"مسار طلب نموذجي", flowDesc:"كيف أربط أجزاء المنتج معاً.", flowLabels:["الواجهة","منطق التطبيق","البيانات","المهام الخلفية","الاختبار والنشر"],
  flowText:["React وNext.js والتجاوب وإمكانية الوصول","Node.js وExpress والتحقق من المدخلات والصلاحيات","PostgreSQL وMongoDB وRedis","الطوابير والعمال والعمليات غير المتزامنة","الاختبارات والأمان وCI/CD وصحة التشغيل"],
  pillars:[["حدود واضحة","أفصل الشبكة والتحقق والمنطق والتخزين لكي تظل مسؤوليات النظام مفهومة."],["التعامل مع الأعطال","أصمّم للحالات غير المثالية: إعادة المحاولة وتكرار الطلبات وتعطل الخدمات."],["قابلية التحقق","أحوّل الجودة إلى فحوص TypeScript واختبارات وبناء وتدقيق أمان."]],
  techTitle:"03 / التقنيات", techHeadline:"أختار الأدوات بحسب متطلبات النظام.",
  aboutTitle:"04 / نبذة", aboutHeadline:"خبرة واسعة في الواجهة والخلفية، مع عمق في الأنظمة.", aboutLead:"أنا عبدالرحمن حجار، مهندس برمجيات أدرس هندسة الكمبيوتر في جامعة نيشانتاشي بإسطنبول.", aboutText:"أعمل على واجهات المنتجات والخدمات الخلفية وواجهات API وقواعد البيانات والمزامنة والاختبارات والنشر والذكاء الاصطناعي. الهدف هو بناء تطبيقات واضحة في بنيتها وقابلة للصيانة والعمل تحت الظروف الواقعية.",
  resumePromo:"نظرة مختصرة على خبرتي ومشاريعي للمهتمين بالتوظيف.",
  contactTitle:"14 / تواصل", contactHeadline:"تريد التأكد من جودة عملي؟ ابدأ بالمشاريع.", contactText:"جرّب الأنظمة، وتفحّص المصدر، أو تواصل معي بشأن فرص هندسة البرمجيات والمشاريع الجادة.", top:"العودة للأعلى",
  profileSection:"الملف المهني", profileText:"أصمّم وأبني تطبيقات TypeScript متكاملة تشمل واجهات React وواجهات API وقواعد البيانات وإدارة الصلاحيات والتخزين المؤقت والمهام الخلفية والاختبارات وCI/CD. أركّز على الحدود الواضحة بين المكونات والتعامل السليم مع الأعطال.",
  educationSection:"التعليم", skillsSection:"المهارات التقنية", selectedSection:"أبرز المشاريع الهندسية",
  caseHeadings:["المشكلة","الحل","البنية المعمارية","قرارات هندسية","الموثوقية","أدلة التنفيذ"],
  verifyTitle:"راجع المشروع بنفسك", verifyText:"يمكنك مراجعة التطبيق والكود والاختبارات والقرارات المعمارية مباشرة.", runtime:"حالة تشغيل الخادم", more:"المزيد من المشاريع", snapshot:"نبذة مهنية", pdfNote:"ملف PDF الأصلي باللغة الإنجليزية",
  pwa:"تطبيق قابل للتثبيت", updated:"محفوظ محلياً", accessible:"سهولة الوصول",
  projects: {
    eventify: {
      label:"منصة فعاليات موزعة", thesis:"حجوزات موثوقة حتى عندما تتعطل الخدمات.", summary:"منصة فعاليات تدعم الحسابات والمنظمين والحجوزات وقوائم الانتظار، مع PostgreSQL وRedis وBullMQ ومراقبة حالة التشغيل.",
      problem:"عند تزامن الحجوزات وإلغائها وإعادة المحاولة، تصبح سلامة السعة وقوائم الانتظار وإشعارات الخلفية تحدياً حقيقياً.", solution:"أبقي البيانات الدائمة في PostgreSQL، وأستخدم Redis للتنسيق والتخزين المؤقت، وOutbox لحفظ نية إرسال الأعمال الخلفية.",
      architecture:["واجهة React ← API عبر Express","PostgreSQL مصدر الحقيقة للحجوزات","Outbox ← BullMQ لمعالجة المهام الخلفية"], decisions:[["مصدر الحقيقة","الحالة الدائمة في PostgreSQL وليست في Redis."],["عمل غير متزامن آمن","حفظ أحداث Outbox قبل إرسالها للعمال."]],
      reliability:["إعادة المحاولة عند الفشل","فحوص الجاهزية والصحة","ترقية قوائم الانتظار"],evidence:["اختبارات تكامل","تدقيق الأمان CI","مراقبة API والعمال"],
    },
    bookhaven: {
      label:"متجر إلكتروني متكامل",thesis:"التجارة الإلكترونية كنظام واحد مترابط.",summary:"متجر كتب يشمل الاستكشاف والحسابات والسلة والشراء والمخزون والطلبات ولوحة الإدارة باستخدام Next.js وExpress وMongoDB.",
      problem:"يجب أن تتوافق حالات السلة والطلب والمخزون وصلاحيات الإدارة دون حدوث طلبات مكررة أو خصم غير صحيح.", solution:"تعالج Next.js واجهة المنتج والجلسة، بينما تتولى Express القواعد والتحقق والصلاحيات، مع حماية انتقالات الطلب والمخزون.",
      architecture:["المتصفح ← Next.js","Next.js ← Express API وصلاحيات RBAC","MongoDB للمخزون والطلبات"],decisions:[["حدود الواجهة والخلفية","فصل التعامل مع الجلسة عن قواعد التجارة."],["سلامة المعاملات","استخدام قفل الطلب وخطوات تعويض عند فشل الشراء."]],
      reliability:["انتقالات حالات مضبوطة","استرجاع المخزون عند الإلغاء","حماية الصلاحيات"],evidence:["اختبارات API","عقود OpenAPI","سير عمل CI"],
    },
    fitflow: {
      label:"تطبيق لياقة يعمل دون اتصال",thesis:"تجربة تدريب تحتفظ بالتقدم على الجهاز.",summary:"تطبيق لياقة قابل للتثبيت، مع خطط مخصصة ومؤقتات وتمارين وتقدم أسبوعي وتخزين محلي ومراعاة إمكانية الوصول.",
      problem:"الصفحة التعريفية وحدها لا تثبت عمل منتج يتذكر التقدم ويواصل أداء وظائفه عند ضعف الاتصال.",solution:"اعتمدت تدفقاً من اختيار الخطة إلى الجلسة والتقدم، مع حفظ الحالة محلياً وتصميم متجاوب.",
      architecture:["واجهة Next.js وReact","تخزين محلي لتقدم التمرين","PWA للعمل في ظروف اتصال محدودة"], decisions:[["التقدم محلياً","حفظ بيانات المستخدم على جهازه بدلاً من إضافة حسابات غير ضرورية."],["إمكانية الوصول","تنقل بلوحة المفاتيح وتخفيف الحركة عند الحاجة."]],
      reliability:["حفظ الحالة محلياً","تطبيق قابل للتثبيت","وضع الحركة المخففة"],evidence:["مؤقت جلسة تمرين","تتبع أسبوعي","فحص بناء الإنتاج"],
    },
    "venues-api": {
      label:"واجهة خدمات REST",thesis:"خدمة صغيرة وحدود هندسية واضحة.",summary:"خدمة REST باستخدام Express وTypeScript وZod، مع التحقق الصارم وأخطاء مركزية وموارد UUID واختبارات HTTP.",
      problem:"الخلط بين التوجيه والتحقق وقواعد العمل والتخزين يجعل خدمات API البسيطة صعبة التطوير.",solution:"قسمت الخدمة إلى توجيه ومتحكمات وخدمات وتخزين، مع تحقق Zod وأخطاء موحّدة.",
      architecture:["HTTP ← مسارات مع التحقق","Controller ← Service","مصدر تخزين قابل للعزل في الاختبارات"],decisions:[["فصل المسؤوليات","كل طبقة تتولى مسؤولية واضحة."],["التحقق المبكر","رفض المدخلات غير الصحيحة قبل وصولها لمنطق العمل."]],
      reliability:["أخطاء موحّدة","UUID مولّد بالخادم","بيانات اختبار معزولة"],evidence:["اختبارات HTTP","TypeScript صارم","CI وبناء"],
    },
  },
} as const;

const tr = {
  nav:{work:"Projeler",systems:"Sistemler",process:"Çalışma sürecim",about:"Hakkımda",resume:"Özgeçmiş",contact:"İletişim",home:"Ana sayfa",back:"Projelere dön",skip:"İçeriğe geç",lang:"Dil seçimi"},
  job:"Yazılım Mühendisi · Full-Stack Geliştirici · Yapay Zekâ ve Etkileşimli Sistemler",
  name:"Abdulrahman Hajar",role:"Yazılım Mühendisi",location:"İstanbul, Türkiye",
  headline1:"Yalnızca ekran değil,",headline2:"uçtan uca sistemler geliştiriyorum.",
  lead:"Ürün arayüzlerinden API ve veritabanlarına, arka plan işlerinden testlere, güvenliğe ve dağıtıma kadar eksiksiz yazılım sistemleri geliştiriyorum. Hata senaryolarını da tasarımın parçası görüyorum.",
  explore:"Projeleri incele",viewResume:"Özgeçmişi görüntüle",download:"PDF indir",print:"Yazdırılabilir sürüm",proofTitle:"Mühendislik profili ve yetkinliklerim",focus:"Odak alanım",focusText:"Güvenilir arka uç sistemlerine önem veren uçtan uca ürün geliştirme.",edu:"Bilgisayar Mühendisliği",institution:"Nişantaşı Üniversitesi",
  product:"Ürün",backend:"Backend",data:"Veri",systemsShort:"Sistemler",
  featured:"Öne çıkan sistem",deployed:"Canlı uygulamalar",source:"Kaynak kodu açık",studies:"Teknik incelemeler",ready:"İşe alıma uygun CV",
  sectionWork:"01 / SEÇİLİ PROJELER",workTitle:"Süs değil, teknik kanıt.",workText:"Her projede mimari kararları, veri tutarlılığını, hata senaryolarını, testleri ve gerçek uygulamayı gösteriyorum.",
  caseStudy:"Teknik inceleme",live:"Canlı uygulama",sourceLink:"Kaynak kodu",
  systemHeading:"02 / SİSTEM DÜŞÜNCESİ",systemsTitle:"İsteği sistemin son katmanına kadar takip ederim.",systemsText:"İyi tasarım yalnızca arayüz değildir; doğrulama, veri kalıcılığı, arka plan işleri, hata yönetimi ve teslimat da gerekir.",
  flowTitle:"Örnek sistem akışı",flowDesc:"Bir ürünün katmanlarını nasıl birleştirdiğim.",flowLabels:["Arayüz","Uygulama","Veri","Arka plan","Teslimat"],
  flowText:["React, Next.js, uyumlu arayüz, erişilebilirlik","Node.js, Express, doğrulama ve yetkilendirme","PostgreSQL, MongoDB ve Redis","Kuyruklar ve arka plan çalışanları","Testler, güvenlik, CI/CD ve sistem sağlığı"],
  pillars:[["Net sınırlar","İletişim, doğrulama, iş kuralları ve depolama görevlerini ayırırım."],["Hata senaryoları","Tekrar denemeleri, yinelenen işleri ve servis kesintilerini tasarımda ele alırım."],["Doğrulanabilirlik","TypeScript, test, derleme ve güvenlik taramalarını işin parçası yaparım."]],
  techTitle:"03 / TEKNOLOJİ",techHeadline:"Araçları sistemin ihtiyacına göre seçerim.",
  aboutTitle:"04 / HAKKIMDA",aboutHeadline:"Arka uç derinliğiyle birleşen geniş mühendislik deneyimi.",aboutLead:"Ben Abdulrahman Hajar. İstanbul'da Nişantaşı Üniversitesinde Bilgisayar Mühendisliği eğitimi alıyor, yazılım sistemleri geliştiriyorum.",aboutText:"Arayüzler, API'ler, veritabanları, asenkron iş akışları, test, güvenlik, dağıtım ve yapay zekâ entegrasyonları üzerinde çalışıyorum. Amacım yalnızca teknoloji kullanmak değil, sürdürülebilir ve güvenilir ürünler sunmak.",
  resumePromo:"Mühendislik çalışmalarımın işe alım odaklı kısa özeti.",
  contactTitle:"14 / İLETİŞİM",contactHeadline:"İşimin kanıtını mı arıyorsunuz? Projelerle başlayın.",contactText:"Canlı sistemleri deneyin, kaynak kodlarını inceleyin veya yazılım mühendisliği fırsatları için iletişime geçin.",top:"Başa dön",
  profileSection:"Profesyonel profil",profileText:"TypeScript ve React arayüzleri, API'ler, ilişkisel ve doküman veritabanları, kimlik doğrulama, önbellek, kuyruklar, otomatik test, CI/CD, güvenlik kontrolleri ve dağıtım alanlarında çalışıyorum. Anlaşılır mimariye ve güvenilir hata yönetimine odaklanıyorum.",
  educationSection:"Eğitim",skillsSection:"Teknik yetkinlikler",selectedSection:"Öne çıkan mühendislik projeleri",
  caseHeadings:["Problem","Çözüm","Mimari","Mühendislik kararları","Güvenilirlik","Doğrulama kanıtları"],
  verifyTitle:"Uygulamayı kendiniz doğrulayın",verifyText:"Canlı ürünü, kaynak kodunu, testleri ve mimari kararları doğrudan inceleyebilirsiniz.",runtime:"Çalışma durumu",more:"Diğer projeler",snapshot:"Profesyonel özet",pdfNote:"PDF özgeçmişin orijinali İngilizcedir",
  pwa:"Yüklenebilir",updated:"Yerel kayıt",accessible:"Erişilebilir",
  projects: {
    eventify: {
      label:"Dağıtık etkinlik platformu",thesis:"Hata durumlarında da güvenilir rezervasyonlar.",summary:"Kimlik doğrulama, organizatör akışları, rezervasyon, bekleme listesi, PostgreSQL kalıcılığı, Redis koordinasyonu ve BullMQ işçileri içeren etkinlik platformu.",
      problem:"Kapasite, iptal, tekrar deneme ve bekleme listesi süreçlerinde veri tutarlılığı ile arka plan işlerinin güvenilirliği korunmalıdır.",solution:"Kalıcı verileri PostgreSQL'de, geçici koordinasyonu Redis'te tutuyor; işlerin niyetini Outbox ile güvenceye alıyorum.",
      architecture:["React arayüzü → Express API","PostgreSQL: kalıcı verinin doğruluk kaynağı","Outbox → BullMQ arka plan işçisi"],decisions:[["Yetkili veri kaynağı","Ürün durumu PostgreSQL'de, Redis geçici koordinasyonda kalır."],["Güvenilir asenkron çalışma","İş kuyruğuna iletmeden önce Outbox kaydı tutulur."]],
      reliability:["Tekrar deneme mekanizması","Sağlık ve hazır olma kontrolleri","Bekleme listesi ilerletme"],evidence:["Entegrasyon testleri","CI güvenlik kontrolleri","API ve işçi izleme"],
    },
    bookhaven:{
      label:"Uçtan uca e-ticaret",thesis:"Tek sistem olarak tasarlanan çevrim içi mağaza.",summary:"Next.js, Express ve MongoDB üzerinde katalog, hesap, sepet, ödeme, sipariş, stok yönetimi ve yönetici araçları bulunan kitap mağazası.",
      problem:"Sepet, ödeme, stok ve sipariş işlemleri eşzamanlı kullanımlarda da tutarlı olmalıdır.",solution:"Next.js kullanıcı arayüzü ve oturum sınırını, Express ise doğrulama, yetkilendirme ve iş kurallarını yönetir.",
      architecture:["Tarayıcı → Next.js arayüzü","Next.js → Express API ve rol tabanlı erişim","MongoDB: sipariş ve stok"],decisions:[["Net API sınırları","Tarayıcı oturumu ile sunucu iş kurallarını ayırmak."],["Tutarlı alışveriş akışı","Checkout kilidi ve gerektiğinde telafi işlemleri."]],
      reliability:["Kontrollü sipariş geçişleri","İptalde stok iadesi","Rol tabanlı koruma"],evidence:["API testleri","OpenAPI sözleşmesi","CI iş akışı"],
    },
    fitflow:{
      label:"Çevrim dışına hazır spor PWA",thesis:"İlerlemeyi cihazda tutan antrenman deneyimi.",summary:"Kişiye özel programlar, yönlendirmeli süreler, haftalık ilerleme, yerel kayıt ve erişilebilirlik sunan yüklenebilir spor uygulaması.",
      problem:"Statik bir tanıtım sayfası, bağlantı zayıfken bile durumunu koruyan gerçek ürün davranışını göstermez.",solution:"Plan seçimi, antrenman oturumu ve ilerleme akışını cihaz içi kayıtla birleştirdim.",
      architecture:["Next.js ve React arayüzü","Cihazda yerel ilerleme verisi","PWA ile sınırlı bağlantıda kullanım"],decisions:[["Yerel öncelik","Gereksiz oturum altyapısı eklemeden ilerlemeyi korumak."],["Erişilebilir kullanım","Klavye desteği ve azaltılmış hareket seçenekleri."]],
      reliability:["Yerel durum saklama","Yüklenebilir uygulama","Azaltılmış hareket"],evidence:["Antrenman zamanlayıcısı","Haftalık ilerleme takibi","Üretim derleme kontrolü"],
    },
    "venues-api":{
      label:"REST backend hizmeti",thesis:"Küçük API, net mühendislik sınırları.",summary:"Express, TypeScript ve Zod ile katmanlı yapı, sıkı doğrulama, merkezi hata yönetimi, UUID kayıtları ve HTTP sözleşme testleri sunan REST API.",
      problem:"Yönlendirme, veri doğrulama, iş mantığı ve depolama aynı katmanda tutulunca API zor genişletilir.",solution:"Rotaları, kontrolörleri, hizmetleri ve depolamayı ayrıştırıp Zod doğrulaması ile standart hata yanıtları uyguladım.",
      architecture:["HTTP → Rota ve doğrulama","Controller → Service","Testte izole edilebilir veri deposu"],decisions:[["Sorumluluk ayrımı","Her katmanda tek ve açık görev."],["Erken doğrulama","Hatalı girdileri iş mantığına ulaşmadan reddetmek."]],
      reliability:["Standart hata yanıtları","Sunucuda üretilen UUID","İzole test verileri"],evidence:["HTTP sözleşme testleri","Strict TypeScript","CI ve derleme"],
    },
  },
} as const;

export const translations = { ar, tr } as const;
export function translation(locale: TranslationLocale){ return translations[locale]; }
export function localizedProject(locale: TranslationLocale, slug: ProjectSlug) {
  return { ...PROJECTS[slug], ...translations[locale].projects[slug] };
}
