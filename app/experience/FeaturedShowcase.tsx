"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "./locale";
import styles from "./FeaturedShowcase.module.css";

type FeaturedProject = {
  id: "fitflow" | "mizan";
  name: string;
  href: string;
  image: string;
  stack: string;
  alt: string;
  description: Record<Locale, string>;
  imageNote: Record<Locale, string>;
};

const FEATURED: readonly FeaturedProject[] = [
  {
    id: "fitflow",
    name: "FitFlow",
    href: "/work/fitflow/",
    image: "/projects/fitflow-real-interface.webp",
    stack: "Next.js / PWA / Responsive UI",
    alt: "Screenshot of the FitFlow fitness application built from the project source",
    description: {
      en: "Fitness flows that turn training plans and progress into a focused, installable experience.",
      ar: "تجربة لياقة تجمع الخطط والتقدّم بمسارات واضحة وتطبيق قابل للتثبيت.",
      tr: "Antrenman planlarını ve ilerlemeyi odaklı, kurulabilir bir deneyimde birleştiren fitness arayüzü.",
    },
    imageNote: {
      en: "Real interface · local production build",
      ar: "واجهة حقيقية · بناء إنتاج محلي",
      tr: "Gerçek arayüz · yerel üretim derlemesi",
    },
  },
  {
    id: "mizan",
    name: "Mizan Finance",
    href: "/work/mizan/",
    image: "/projects/mizan-live-dashboard.png",
    stack: "React / Data Visualization / RTL",
    alt: "Screenshot of the Mizan Finance dashboard using the project's demo data",
    description: {
      en: "A private, bilingual finance dashboard designed for clear spending decisions and RTL reading.",
      ar: "لوحة مالية خاصة وثنائية اللغة لفهم المصروفات والميزانيات، مع دعم RTL.",
      tr: "Harcama ve bütçe kararlarını kolaylaştıran, RTL destekli, gizlilik odaklı finans paneli.",
    },
    imageNote: {
      en: "Real interface · bundled demo data",
      ar: "واجهة حقيقية · بيانات تجريبية",
      tr: "Gerçek arayüz · örnek veriler",
    },
  },
] as const;

const COPY = {
  en: {
    label: "SELECTED PRODUCT / INTERACTIVE PREVIEW",
    choose: "Choose a featured project",
    view: "Read the case study",
    note: "Real product interfaces, not generated mockups",
  },
  ar: {
    label: "أعمال مختارة / معاينة تفاعلية",
    choose: "اختر مشروعاً مميزاً",
    view: "استعرض دراسة المشروع",
    note: "واجهات حقيقية من المشاريع، وليست تصاميم تخيلية",
  },
  tr: {
    label: "SEÇİLİ ÜRÜNLER / ETKİLEŞİMLİ ÖNİZLEME",
    choose: "Öne çıkan projeyi seçin",
    view: "Proje incelemesini aç",
    note: "Yapay görseller değil, gerçek ürün arayüzleri",
  },
} as const;

export default function FeaturedShowcase({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<FeaturedProject["id"]>("fitflow");
  const project = FEATURED.find((item) => item.id === selected) ?? FEATURED[0];
  const copy = COPY[locale];

  return (
    <section className={styles.stage} aria-label={copy.choose} data-featured-showcase>
      <div className={styles.stageHead}>
        <span className={styles.stageEyebrow}>
          <span className={styles.signal} aria-hidden="true" />
          {copy.label}
        </span>
        <span className={styles.stageCounter} aria-live="polite">
          {selected === "fitflow" ? "01" : "02"} <span aria-hidden="true">/</span> 02
        </span>
      </div>

      <div className={styles.screen} data-active-project={selected}>
        <Image
          key={project.id}
          unoptimized
          src={project.image}
          alt={project.alt}
          width={1440}
          height={960}
          sizes="(max-width: 820px) 100vw, 620px"
          className={styles.screenImage}
          priority={selected === "fitflow"}
        />
        <div className={styles.screenChrome} aria-hidden="true">
          <span className={styles.windowDots}><i/><i/><i/></span>
          <span>AH / PRODUCT INTERFACE</span>
        </div>
        <div className={styles.screenCaption}>
          <span className={styles.indexLabel}>0{selected === "fitflow" ? "1" : "2"} — FEATURED WORK</span>
          <h2>{project.name}</h2>
          <p>{project.description[locale]}</p>
          <Link className={styles.studyLink} href={project.href}>
            {copy.view}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <div className={styles.stageFoot}>
        <div className={styles.switcher} role="group" aria-label={copy.choose}>
          {FEATURED.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={selected === item.id ? styles.switchActive : styles.switch}
              aria-pressed={selected === item.id}
              aria-label={item.name}
            >
              <span className={styles.switchNumber}>0{index + 1}</span>
              <span className={styles.switchName}>{item.name}</span>
              <span className={styles.switchArrow} aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className={styles.stageMetadata}>
          <span>{project.stack}</span>
          <span>{project.imageNote[locale]}</span>
        </div>
        <p className={styles.proofNote}>{copy.note}</p>
      </div>
    </section>
  );
}
