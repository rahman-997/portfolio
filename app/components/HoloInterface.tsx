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
export default function HoloInterface() {
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
    <div className={styles.shell} aria-label="Interactive 3D engineering visualization">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.top}>
        <span className={styles.identity}><i aria-hidden="true" /> AH / INTERACTIVE LAB</span>
        <span>VISUAL MODE <b>{fallback ? "STATIC · 2D" : "WEBGL2 · 3D"}</b></span>
      </div>
      <div className={styles.stage}>
        <canvas ref={canvas} className={styles.canvas} tabIndex={fallback ? -1 : 0} role="img"
          aria-label={fallback ? "Static point-cloud portrait. Interactive 3D is unavailable on this device." : "3D point-cloud sculpture. Drag to rotate, scroll to zoom, arrow keys rotate and Home resets."} />
        <div className={styles.reticle} aria-hidden="true" />
        <div className={styles.readout} aria-hidden="true">
          <span>SYS.02 / DEPTH FIELD</span>
          <strong>Human × Machine</strong>
          <small>22K XYZ POINTS · LIVE SHADER</small>
        </div>
        <div className={styles.side} aria-hidden="true">
          <span>INTERACTIVE VIEWPORT</span>
          <small>REAL 3D GEOMETRY</small>
          <small>PERSPECTIVE + DEPTH</small>
        </div>
        <div className={styles.hint} aria-hidden="true">DRAG · ZOOM · ARROWS <span>◈</span></div>
      </div>
      {fallback ? (
        <div className={styles.controls} role="status"><p className={styles.fallbackNote}>Static portrait · 3D graphics unavailable on this device</p></div>
      ) : (
      <div className={styles.controls}>
        <div className={styles.modes} role="group" aria-label="3D scene modes">
          {modes.map(item => (
            <button type="button" key={item.id}
              className={mode === item.id ? styles.active : styles.mode}
              aria-pressed={mode === item.id}
              onClick={() => { setMode(item.id); scene.current?.setMode(item.id); }}>
              {item.name}
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <button type="button" title="Reset 3D view" aria-label="Reset 3D view" onClick={() => scene.current?.resetView()}>↺<span>RESET</span></button>
          <button type="button" title="Pulse visual effect" aria-label="Pulse visual effect" onClick={() => scene.current?.pulse()}>◎<span>PULSE</span></button>
          <button type="button" title={playing ? "Pause 3D motion" : "Play 3D motion"} aria-pressed={!playing}
            aria-label={playing ? "Pause 3D motion" : "Play 3D motion"}
            onClick={() => setMotionOverride(!playing)}>
            {playing ? "Ⅱ" : "▷"}<span>{playing ? "PAUSE" : "PLAY"}</span>
          </button>
        </div>
      </div>
      )}
      <p className={styles.sr}>This artwork uses real three-dimensional GPU geometry. The mode buttons change its colors and motion. The pause button respects reduced motion preferences.</p>
    </div>
  );
}
