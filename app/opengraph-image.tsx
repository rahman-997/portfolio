import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Abdulrahman Hajar — Software Engineer | Full-Stack Developer | AI & Interactive Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const capabilities = ["INTERFACE", "API", "DATA", "DELIVERY"];
const stack = ["TypeScript", "React / Next.js", "Node / Express", "PostgreSQL / Redis"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "54px 58px 46px", background: "#08090b", color: "#f5f7fb", position: "relative", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
        <div style={{ position: "absolute", width: 560, height: 560, right: -180, top: -260, borderRadius: 999, background: "rgba(118,255,173,.15)" }} />
        <div style={{ position: "absolute", width: 520, height: 520, left: -280, bottom: -300, borderRadius: 999, background: "rgba(90,126,255,.13)" }} />
        <div style={{ position: "absolute", left: 58, right: 58, top: 118, height: 1, background: "rgba(255,255,255,.1)" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.06)", color: "#f5f7fb", fontWeight: 900, fontSize: 15, letterSpacing: 1.5 }}>AH</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 900 }}>Abdulrahman Hajar</span>
              <span style={{ fontSize: 13, color: "#8f99a7", letterSpacing: 1.2 }}>SOFTWARE ENGINEER · ISTANBUL</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 14px", border: "1px solid rgba(118,255,173,.22)", borderRadius: 999, background: "rgba(118,255,173,.06)", color: "#bcefd0", fontSize: 12, fontWeight: 800, letterSpacing: 1.1 }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#76ffad" }} />
            OPEN TO OPPORTUNITIES
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1050, marginTop: 20 }}>
          <span style={{ color: "#75ffb4", fontSize: 14, fontWeight: 900, letterSpacing: 3, marginBottom: 20 }}>FULL-STACK · BACKEND · PRODUCT · AI</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 0.9, letterSpacing: -5.5, fontWeight: 900 }}>
            <span>I ENGINEER SOFTWARE</span>
            <span style={{ color: "#8cffbd" }}>THAT FEELS FINISHED.</span>
          </div>
          <span style={{ marginTop: 24, color: "#9aa4b1", fontSize: 19, lineHeight: 1.45, maxWidth: 930 }}>Complete digital products — polished interfaces, robust APIs, data systems, automation, reliability and production delivery.</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {capabilities.map((item, index) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, background: "rgba(255,255,255,.035)", color: "#c3cad3", fontSize: 11, fontWeight: 800, letterSpacing: 1.2 }}>
                <span style={{ color: "#65707d" }}>0{index + 1}</span>{item}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <span style={{ color: "#606a76", fontSize: 10, fontWeight: 800, letterSpacing: 1.7 }}>SELECTED STACK</span>
            <div style={{ display: "flex", gap: 12 }}>
              {stack.map((item) => <span key={item} style={{ color: "#aeb7c2", fontSize: 11, fontWeight: 700 }}>{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
