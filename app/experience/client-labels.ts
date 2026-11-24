import type { Locale, TEXT } from "./locale";

type HomeCopy = (typeof TEXT)[Locale];
export type ThemeLabels = Pick<HomeCopy, "language" | "themeLight" | "themeDark">;
export type MenuLabels = Pick<HomeCopy, "language" | "navWork" | "navAtlas" | "navAbout" | "navResume"> & {navHighlights:string};
export type CatalogLabels = Pick<HomeCopy, "filterAll" | "filterProduct" | "filterBackend" | "filterTools" | "projectEyebrow" | "projectCount" | "original" | "fork" | "caseStudy" | "source" | "repoNotice" | "otherLocaleNote">;
