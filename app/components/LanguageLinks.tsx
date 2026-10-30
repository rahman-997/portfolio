import { alternateLinks, type Locale } from "../i18n";
import styles from "./LanguageLinks.module.css";

type Props = { locale: Locale; page?: "home" | "resume" | "work"; slug?: string };
const choices = [
  { id: "en", short: "EN", full: "English" },
  { id: "ar", short: "عربي", full: "العربية" },
  { id: "tr", short: "TR", full: "Türkçe" },
] as const;

export default function LanguageLinks({ locale, page="home", slug }: Props) {
  const links = alternateLinks(page, slug);
  return (
    <nav className={styles.switcher} aria-label={locale==="ar"?"اختيار اللغة":locale==="tr"?"Dil seçimi":"Choose language"} dir="ltr">
      {choices.map(choice=>(
        <a key={choice.id} href={links[choice.id]} lang={choice.id}
          aria-label={choice.full} aria-current={locale===choice.id?"page":undefined}
          className={locale===choice.id?styles.selected:styles.link}>{choice.short}</a>
      ))}
    </nav>
  );
}
