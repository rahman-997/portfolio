import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Abdulrahman Hajar — Software Engineer | Full-Stack & Backend Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 64px",
          background: "#07111f",
          color: "#f4f7fb",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.24,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            right: -170,
            top: -180,
            borderRadius: 999,
            background: "#4da3ff",
            opacity: 0.14,
            filter: "blur(30px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,.22)",
                borderRadius: 14,
                background: "rgba(77,163,255,.12)",
                color: "#86c4ff",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: 1,
              }}
            >
              AH
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 24, fontWeight: 800 }}>Abdulrahman Hajar</span>
              <span style={{ fontSize: 15, color: "#8ea2b9" }}>Software Engineer · Istanbul, Türkiye</span>
            </div>
          </div>
          <div style={{ display: "flex", color: "#86c4ff", fontSize: 15, fontWeight: 700, letterSpacing: 2 }}>
            ENGINEERING PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1, maxWidth: 1020 }}>
          <div style={{ display: "flex", color: "#86c4ff", fontSize: 17, fontWeight: 800, letterSpacing: 3, marginBottom: 20 }}>
            FULL-STACK · BACKEND · SYSTEMS · AI
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 0.92, letterSpacing: -5, fontWeight: 800 }}>
            <span>I build the</span>
            <span style={{ color: "#86c4ff", fontWeight: 500 }}>whole system.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, color: "#a8b8c9", fontSize: 22, lineHeight: 1.45, maxWidth: 900 }}>
            TypeScript · React/Next.js · Node.js · APIs · Data · Queues · Testing · Security · Production delivery
          </div>
        </div>

        <div style={{ display: "flex", gap: 34, zIndex: 1, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.14)" }}>
          {[
            ["STACK", "TypeScript · React · Node"],
            ["BACKEND", "APIs · Data · Queues"],
            ["QUALITY", "Tests · CI/CD · Security"],
            ["EDGE", "AI · Mobile · Interactive"],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 210 }}>
              <span style={{ color: "#86c4ff", fontSize: 12, fontWeight: 800, letterSpacing: 2 }}>{label}</span>
              <span style={{ color: "#dbe6f1", fontSize: 16, fontWeight: 700 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
