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
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "54px 58px 46px", background: "#0E1416", color: "#F5F1E9", position: "relative", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
        <div style={{ position: "absolute", width: 560, height: 560, right: -180, top: -260, borderRadius: 999, background: "rgba(201,167,125,.12)" }} />
        <div style={{ position: "absolute", width: 520, height: 520, left: -280, bottom: -300, borderRadius: 999, background: "rgba(132,151,141,.15)" }} />
        <div style={{ position: "absolute", left: 58, right: 58, top: 118, height: 1, background: "rgba(201,167,125,.24)" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, border: "1px solid #0E1416", background: "#1D2424" }}>
              <svg viewBox="0 0 512 512" width="47" height="47">
                <path d="M151 443 C119 359 137 309 190 245 C248 176 306 140 328 59 C346 159 327 217 287 266 C241 320 198 372 151 443 Z" fill="#F5F1E9" />
                <path d="M345 133 C389 191 437 244 430 306 C424 358 364 404 268 458 C296 395 326 365 355 335 C391 297 400 249 345 133 Z" fill="#C9A77D" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 900 }}>Abdulrahman Hajar</span>
              <span style={{ fontSize: 13, color: "#C8C3B7", letterSpacing: 1.2 }}>SOFTWARE ENGINEER · ISTANBUL</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 14px", border: "1px solid #E7D6C3", borderRadius: 999, background: "#252B2A", color: "#E1C39C", fontSize: 12, fontWeight: 800, letterSpacing: 1.1 }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C9A77D" }} />
            ENGINEERING PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1050, marginTop: 20 }}>
          <span style={{ color: "#E1C39C", fontSize: 14, fontWeight: 900, letterSpacing: 3, marginBottom: 20 }}>FULL-STACK · BACKEND · PRODUCT · AI</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 0.9, letterSpacing: -5.5, fontWeight: 900 }}>
            <span>DESIGN MEETS</span>
            <span style={{ color: "#E1C39C" }}>ENGINEERING.</span>
          </div>
          <span style={{ marginTop: 24, color: "#C8C3B7", fontSize: 19, lineHeight: 1.45, maxWidth: 930 }}>Complete digital products — polished interfaces, robust APIs, data systems, automation, reliability and production delivery.</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {capabilities.map((item, index) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", border: "1px solid rgba(22,27,53,.12)", borderRadius: 10, background: "#212929", color: "#F5F1E9", fontSize: 11, fontWeight: 800, letterSpacing: 1.2 }}>
                <span style={{ color: "#E1C39C" }}>0{index + 1}</span>{item}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <span style={{ color: "#C8C3B7", fontSize: 10, fontWeight: 800, letterSpacing: 1.7 }}>SELECTED STACK</span>
            <div style={{ display: "flex", gap: 12 }}>
              {stack.map((item) => <span key={item} style={{ color: "#DED0BD", fontSize: 11, fontWeight: 700 }}>{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
