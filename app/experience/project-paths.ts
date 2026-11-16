import { localeHome, type Locale } from "./locale";

export const projectPath = (locale: Locale, id: string) =>
  `${locale === "en" ? "" : `/${locale}`}/projects/${encodeURIComponent(id)}/`;

export const projectInquiryPath = (locale: Locale, id: string) =>
  `${localeHome(locale)}?project=${encodeURIComponent(id)}#contact-brief`;
