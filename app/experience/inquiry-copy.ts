import type { Locale } from "./locale";

type InquiryCopy = { title: string; lead: string; items: readonly string[]; note: string };

export const INQUIRY_COPY: Record<Locale, InquiryCopy> = {
  en: {
    title: "Start with a clear project brief.",
    lead: "A few details help us assess the right scope before discussing an estimate.",
    items: ["Your product or business goal", "Target users and required platforms", "Must-have features and existing materials", "Preferred timeline and approximate budget (if known)"],
    note: "The link opens LinkedIn. This portfolio does not collect or submit your information. Please do not share passwords or confidential data."
  },
  ar: {
    title: "ابدأ بوصف واضح لمشروعك.",
    lead: "تساعد هذه التفاصيل في تحديد نطاق مناسب قبل مناقشة التكلفة.",
    items: ["هدف المنتج أو النشاط التجاري", "المستخدمون المستهدفون والمنصات المطلوبة", "الميزات الأساسية والمواد المتوفرة", "المدة والميزانية التقريبية إن كانت معروفة"],
    note: "يفتح الرابط LinkedIn. لا يجمع هذا الموقع معلوماتك أو يرسلها. يُرجى عدم مشاركة كلمات المرور أو البيانات السرية."
  },
  tr: {
    title: "Net bir proje özetiyle başlayın.",
    lead: "Bu bilgiler, fiyat tahmini görüşülmeden önce doğru kapsamın belirlenmesine yardımcı olur.",
    items: ["Ürün veya işletme hedefiniz", "Hedef kullanıcılar ve gerekli platformlar", "Temel özellikler ve mevcut materyaller", "Tercih edilen süre ve biliniyorsa yaklaşık bütçe"],
    note: "Bağlantı LinkedIn'i açar. Bu portföy bilgilerinizi toplamaz veya göndermez. Lütfen şifre ya da gizli veri paylaşmayın."
  }
};
