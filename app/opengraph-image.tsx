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
          padding: "52px 58px",
          background: "#f3f0e8",
          color: "#111214",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", width: 280, height: 280, right: -70, top: -80, borderRadius: 999, background: "#ff5b36" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 22, background: "#3154ff" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: "#111214", color: "white", fontWeight: 900, fontSize: 16 }}>
              AH
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 23, fontWeight: 900 }}>Abdulrahman Hajar</span>
              <span style={{ fontSize: 14, color: "#6c6b66" }}>Software Engineer · Istanbul, Türkiye</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 13, fontWeight: 900, letterSpacing: 2 }}>
            ENGINEERING PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1, maxWidth: 1030 }}>
          <div style={{ display: "flex", color: "#ff5b36", fontSize: 15, fontWeight: 900, letterSpacing: 3, marginBottom: 16 }}>
            FULL-STACK · BACKEND · SYSTEMS · AI
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 86, lineHeight: 0.86, letterSpacing: -6, fontWeight: 900 }}>
            <span>COMPLETE</span>
            <span style={{ color: "#3154ff" }}>SOFTWARE SYSTEMS.</span>
          </div>
          <div style={{ display: "flex", marginTop: 26, color: "#555650", fontSize: 20, lineHeight: 1.4, maxWidth: 900 }}>
            Product engineering · APIs · Data · Reliability · AI · Production delivery
          </div>
        </div>

        <div style={{ display: "flex", gap: 18, zIndex: 1, paddingTop: 18, borderTop: "1px solid rgba(17,18,20,.22)" }}>
          {["TypeScript", "React / Next.js", "Node / Express", "PostgreSQL / MongoDB", "Redis / Queues"].map((item) => (
            <div key={item} style={{ display: "flex", padding: "8px 12px", border: "1px solid #111214", borderRadius: 999, fontSize: 13, fontWeight: 800 }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
