import type { Locale } from "./locale";
import type { PortfolioProject } from "./projects";

export type Availability = "demo" | "limited" | "source" | "api";
export type AvailabilityFilter = "all" | Availability;

// A linked demo is not a claim of current uptime or production readiness.
export function availabilityOf(project: PortfolioProject): Availability {
  if (project.demoNotice) return "limited";
  if (!project.demo) return "source";
  return project.group === "backend" ? "api" : "demo";
}

export const AVAILABILITY_COPY: Record<Locale, {
  label: string; all: string; note: string; status: Record<Availability, string>;
}> = {
  en: {label:"Explore by availability",all:"Any availability",note:"Public links may be temporarily unavailable; these labels describe the type of evidence, not a live uptime check.",status:{demo:"Public demo link",limited:"Limited interface preview",source:"Source code only",api:"API health endpoint"}},
  ar: {label:"استكشف حسب نوع المعاينة",all:"كل أنواع المعاينة",note:"قد تتوقف الروابط العامة مؤقتاً؛ تصف هذه التسميات نوع الدليل المتاح ولا تمثل فحصاً مباشراً للتشغيل.",status:{demo:"رابط ديمو عام",limited:"معاينة واجهة محدودة",source:"الكود المصدري فقط",api:"نقطة فحص حالة API"}},
  tr: {label:"Erişim türüne göre keşfet",all:"Tüm erişim türleri",note:"Herkese açık bağlantılar geçici olarak erişilemeyebilir; etiketler canlı çalışma durumunu değil, kanıt türünü belirtir.",status:{demo:"Herkese açık demo bağlantısı",limited:"Sınırlı arayüz önizlemesi",source:"Yalnızca kaynak kod",api:"API sağlık uç noktası"}}
};
