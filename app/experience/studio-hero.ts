import type { Locale } from "./locale";

type HeroCopy = {
  actionLabel: string;
  client: string;
  cv: string;
  cvContext: string;
  proofLabel: string;
  proof: readonly string[];
};

export const STUDIO_HERO: Record<Locale, HeroCopy> = {
  en: {
    actionLabel: "Explore or collaborate",
    client: "Discuss your project",
    cv: "Download CV",
    cvContext: "Hiring teams · English PDF",
    proofLabel: "Design and engineering approach",
    proof: ["Product design", "Frontend engineering", "Accessible · RTL"],
  },
  ar: {
    actionLabel: "استكشف الأعمال أو تعاون معي",
    client: "ناقش مشروعك",
    cv: "تحميل السيرة الذاتية",
    cvContext: "لفرق التوظيف · PDF بالإنجليزية",
    proofLabel: "منهج التصميم والهندسة",
    proof: ["تصميم المنتجات", "هندسة الواجهات", "إمكانية الوصول · RTL"],
  },
  tr: {
    actionLabel: "Projeleri keşfet veya iş birliği yap",
    client: "Projenizi konuşalım",
    cv: "CV İndir",
    cvContext: "İşe alım ekipleri · İngilizce PDF",
    proofLabel: "Tasarım ve mühendislik yaklaşımı",
    proof: ["Ürün tasarımı", "Frontend mühendisliği", "Erişilebilirlik · RTL"],
  },
};
