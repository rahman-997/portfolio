"use client";

import { useRef, useState } from "react";
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
  alt: Record<Locale, string>;
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
    alt: {
      en: "Real FitFlow guided interval timer, paused at 20 seconds",
      ar: "لقطة حقيقية لمؤقت التمارين في FitFlow قبل بدء الجولة",
      tr: "Gerçek FitFlow antrenman zamanlayıcısının başlangıç ekranı",
    },
    description: {
      en: "Fitness flows that turn training plans and progress into a focused, installable experience.",
      ar: "تجربة لياقة تجمع الخطط والتقدّم بمسارات واضحة وتطبيق قابل للتثبيت.",
      tr: "Antrenman planlarını ve ilerlemeyi odaklı, kurulabilir bir deneyimde birleştiren fitness arayüzü.",
    },
    imageNote: {
      en: "Real interface · public timer preview",
      ar: "واجهة حقيقية · معاينة المؤقت العام",
      tr: "Gerçek arayüz · herkese açık zamanlayıcı",
    },
  },
  {
    id: "mizan",
    name: "Mizan Finance",
    href: "/work/mizan/",
    image: "/projects/mizan-live-dashboard.webp",
    stack: "React / Data Visualization / RTL",
    alt: {
      en: "Mizan Finance interface screenshot using sample data",
      ar: "لقطة شاشة من واجهة Mizan Finance ببيانات تجريبية",
      tr: "Mizan Finance örnek verilerle ekran görüntüsü",
    },
    description: {
      en: "A private, bilingual finance dashboard designed for clear spending decisions and RTL reading.",
      ar: "لوحة مالية خاصة وثنائية اللغة لفهم المصروفات والميزانيات، مع دعم RTL.",
      tr: "Harcama ve bütçe kararlarını kolaylaştıran, RTL destekli, gizlilik odaklı finans paneli.",
    },
    imageNote: {
      en: "Real chart · bundled demo data",
      ar: "رسم بياني حقيقي · بيانات تجريبية",
      tr: "Gerçek grafik · örnek veriler",
    },
  },
] as const;

const COPY = {
  en: {
    label: "SELECTED PRODUCT / INTERACTIVE PREVIEW",
    capture: "Enlarge screenshot",
    original: "Open original file",
    close: "Close preview",
    work: "FEATURED WORK",
    choose: "Choose a featured project",
    view: "Read the case study",
    note: "Real product interfaces, not generated mockups",
  },
  ar: {
    label: "أعمال مختارة / معاينة تفاعلية",
    capture: "تكبير الصورة",
    original: "فتح الملف الأصلي",
    close: "إغلاق المعاينة",
    work: "عمل مختار",
    choose: "اختر مشروعاً مميزاً",
    view: "استعرض دراسة المشروع",
    note: "واجهات حقيقية من المشاريع، وليست تصاميم تخيلية",
  },
  tr: {
    label: "SEÇİLİ ÜRÜNLER / ETKİLEŞİMLİ ÖNİZLEME",
    capture: "Görseli büyüt",
    original: "Orijinal dosyayı aç",
    close: "Önizlemeyi kapat",
    work: "SEÇİLİ ÇALIŞMA",
    choose: "Öne çıkan projeyi seçin",
    view: "Proje incelemesini aç",
    note: "Yapay görseller değil, gerçek ürün arayüzleri",
  },
} as const;

export default function FeaturedShowcase({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<FeaturedProject["id"]>("fitflow");
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewRef = useRef<HTMLDialogElement>(null);
  const openPreview = () => {
    setPreviewOpen(true);
    if (previewRef.current && !previewRef.current.open) previewRef.current.showModal();
  };
  const closePreview = () => previewRef.current?.close();
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
          alt={project.alt[locale]}
          width={1440}
          height={960}
          sizes="(max-width: 820px) 100vw, 620px"
          className={styles.screenImage}
          fetchPriority={selected === "fitflow" ? "high" : "auto"}
          decoding={selected === "fitflow" ? "sync" : "async"}
          priority={selected === "fitflow"}
        />
      </div>

      <div className={styles.projectDetails}>
        <div className={styles.detailsBody}>
          <span className={styles.indexLabel}>0{selected === "fitflow" ? "1" : "2"} — {copy.work}</span>
          <h2>{project.name}</h2>
          <p>{project.description[locale]}</p>
        </div>
        <div className={styles.detailsActions}>
          <Link className={styles.studyLink} href={project.href} prefetch={false}>
            {copy.view}<span aria-hidden="true">↗</span>
          </Link>
          <button className={styles.captureLink} type="button" onClick={openPreview}>
            {copy.capture}<span aria-hidden="true">⤢</span>
          </button>
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
      <dialog ref={previewRef} className={styles.previewDialog}
        aria-label={project.name + " — " + copy.capture}
        onClose={() => setPreviewOpen(false)}
        onClick={event => {
          if (event.target === event.currentTarget) closePreview();
        }}>
        <div className={styles.previewDialogHeader}>
          <strong>{project.name}</strong>
          <div className={styles.previewDialogControls}>
            <a href={project.image} target="_blank" rel="noopener noreferrer">
              {copy.original}<span aria-hidden="true">↗</span>
            </a>
            <button type="button" onClick={closePreview}
              aria-label={copy.close}>{copy.close} <span aria-hidden="true">×</span></button>
          </div>
        </div>
        {previewOpen ? <Image unoptimized src={project.image} alt={project.alt[locale]}
          width={1440} height={960} sizes="(max-width: 900px) 90vw, 1040px"
          className={styles.previewDialogImage} /> : null}
        <p className={styles.previewDialogNote}>{project.imageNote[locale]}</p>
      </dialog>
    </section>
  );
}
