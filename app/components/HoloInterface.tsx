"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createHolo3D, type HoloController, type HoloMode } from "./holo3d-engine";
import styles from "./HoloInterface.module.css";

const modes: { id: HoloMode; name: string }[] = [
  { id: "neural", name: "NEURAL" },
  { id: "systems", name: "SYSTEMS" },
  { id: "signal", name: "SIGNAL" },
];
function subscribe(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
function getMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
/** GPU scene with real XYZ points, perspective and depth. No camera permissions. */
const texts = {
 en:{neural:"NEURAL",systems:"SYSTEMS",signal:"SIGNAL",reset:"Reset 3D view",pulse:"Pulse visual effect",pause:"Pause 3D motion",play:"Play 3D motion",fallback:"Static portrait · 3D graphics unavailable on this device",scene:"Interactive 3D engineering visualization",readout:"Human × Machine",zoomIn:"Zoom in",zoomOut:"Zoom out",zoomGroup:"3D camera zoom",hint:"PINCH · DRAG · ALT+WHEEL",instructions:"Drag to rotate; use two fingers to pinch-zoom on touch screens. Zoom buttons, plus/minus keys or Alt plus the mouse wheel also work. One-finger vertical swipes and normal mouse-wheel scrolling move the page."},
 ar:{neural:"عصبي",systems:"أنظمة",signal:"إشارة",reset:"إعادة عرض المجسّم",pulse:"تأثير ضوئي",pause:"إيقاف حركة المجسّم",play:"تشغيل حركة المجسّم",fallback:"عرض ثابت · الرسوم ثلاثية الأبعاد غير مدعومة على هذا الجهاز",scene:"عرض هندسي ثلاثي الأبعاد تفاعلي",readout:"الإنسان × التقنية",zoomIn:"تقريب المجسّم",zoomOut:"إبعاد المجسّم",zoomGroup:"تقريب العرض ثلاثي الأبعاد",hint:"قرّب بإصبعين · اسحب للدوران",instructions:"اسحب لتدوير المجسّم، وبإصبعين قرّب أو أبعد على شاشة اللمس. يمكنك أيضاً استخدام أزرار التقريب ومفتاحي الجمع والطرح. السحب العمودي بإصبع واحد والتمرير العادي يحركان الصفحة."},
 tr:{neural:"SİNİR AĞI",systems:"SİSTEM",signal:"SİNYAL",reset:"3B görünümü sıfırla",pulse:"Işık efekti",pause:"3B hareketi durdur",play:"3B hareketi başlat",fallback:"Sabit görsel · Bu cihazda 3B desteklenmiyor",scene:"Etkileşimli 3B mühendislik görselleştirmesi",readout:"İnsan × Teknoloji",zoomIn:"Yakınlaştır",zoomOut:"Uzaklaştır",zoomGroup:"3B kamera yakınlaştırma",hint:"İKİ PARMAKLA YAKINLAŞTIR · SÜRÜKLE",instructions:"Döndürmek için sürükleyin; dokunmatik ekranda iki parmağınızla yakınlaştırın. Artı-eksi düğmeleri, klavye tuşları veya Alt+fare tekerleği de çalışır. Tek parmakla dikey kaydırma sayfayı hareket ettirir."}
} as const;
export default function HoloInterface({ locale="en" }:{locale?:"en"|"ar"|"tr"}) {
  const word=texts[locale];
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<HoloController | null>(null);
  const [mode, setMode] = useState<HoloMode>("neural");
  const [fallback, setFallback] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribe, getMotionPreference, () => false);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const playing = motionOverride ?? !reducedMotion;
  useEffect(() => {
    if (!canvas.current) return;
    try {
      const controller = createHolo3D(canvas.current);
      scene.current = controller;
      setFallback(controller.kind === "static");
      return () => { controller.destroy(); scene.current = null; };
    } catch (error) {
      // Static styling and text stay visible if WebGL cannot initialize.
      console.warn("Holo3D unavailable:", error);
      setFallback(true);
    }
  }, []);
  useEffect(() => {
    scene.current?.setPaused(!playing);
  }, [playing]);
  return (
    <div className={styles.shell} aria-label={word.scene}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.top}>
        <span className={styles.identity}><i aria-hidden="true" /> AH / INTERACTIVE LAB</span>
        <span>VISUAL MODE <b>{fallback ? "STATIC · 2D" : "WEBGL2 · 3D"}</b></span>
      </div>
      <div className={styles.stage}>
        <canvas ref={canvas} className={styles.canvas} tabIndex={fallback ? -1 : 0} role={fallback ? "img" : "group"}
          aria-label={fallback ? word.fallback : `${word.scene}. ${word.instructions}`} />
        <div className={styles.reticle} aria-hidden="true" />
        <div className={styles.readout} aria-hidden="true">
          <span>SYS.02 / DEPTH FIELD</span>
          <strong>{word.readout}</strong>
          <small>22K XYZ POINTS · LIVE SHADER</small>
        </div>
        <div className={styles.side} aria-hidden="true">
          <span>INTERACTIVE VIEWPORT</span>
          <small>REAL 3D GEOMETRY</small>
          <small>PERSPECTIVE + DEPTH</small>
        </div>
        <div className={styles.hint} aria-hidden="true">{word.hint} <span>◈</span></div>
        {!fallback && <div className={styles.zoomActions} role="group" aria-label={word.zoomGroup}>
          <button type="button" aria-label={word.zoomIn} title={word.zoomIn} onClick={() => scene.current?.zoomIn()}>+</button>
          <button type="button" aria-label={word.zoomOut} title={word.zoomOut} onClick={() => scene.current?.zoomOut()}>−</button>
        </div>}
      </div>
      {fallback ? (
        <div className={styles.controls} role="status"><p className={styles.fallbackNote}>{word.fallback}</p></div>
      ) : (
      <div className={styles.controls}>
        <div className={styles.modes} role="group" aria-label={word.zoomGroup === "3D camera zoom" ? "3D scene modes" : word.scene}>
          {modes.map(item => (
            <button type="button" key={item.id}
              className={mode === item.id ? styles.active : styles.mode}
              aria-pressed={mode === item.id}
              onClick={() => { setMode(item.id); scene.current?.setMode(item.id); }}>
              {word[item.id]}
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <button type="button" title={word.reset} aria-label={word.reset} onClick={() => scene.current?.resetView()}>↺<span>RESET</span></button>
          <button type="button" title={word.pulse} aria-label={word.pulse} onClick={() => scene.current?.pulse()}>◎<span>PULSE</span></button>
          <button type="button" title={playing ? word.pause : word.play} aria-pressed={!playing}
            aria-label={playing ? word.pause : word.play}
            onClick={() => setMotionOverride(!playing)}>
            {playing ? "Ⅱ" : "▷"}<span>{playing ? "PAUSE" : "PLAY"}</span>
          </button>
        </div>
      </div>
      )}
      <p className={styles.sr}>{word.instructions}</p>
    </div>
  );
}
