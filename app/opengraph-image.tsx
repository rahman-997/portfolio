import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Abdulrahman Hajar — Software Engineer · Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"54px 60px",background:"#07090c",color:"#f4f7fb",fontFamily:"Arial, sans-serif",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,display:"flex",background:"radial-gradient(circle at 82% 10%, rgba(85,165,220,.2), transparent 32%)"}} />
        <div style={{position:"absolute",inset:0,display:"flex",opacity:.16,backgroundImage:"linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",backgroundSize:"58px 58px"}} />

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:1,borderBottom:"1px solid rgba(255,255,255,.14)",paddingBottom:22}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:48,height:48,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(142,208,255,.55)",background:"rgba(142,208,255,.08)",fontWeight:800,fontSize:14,letterSpacing:2}}>AH</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <span style={{fontSize:23,fontWeight:800}}>Abdulrahman Hajar</span>
              <span style={{fontSize:14,color:"#9aa7b6"}}>Software Engineer · Istanbul, Türkiye</span>
            </div>
          </div>
          <div style={{display:"flex",fontSize:12,fontWeight:800,letterSpacing:2.4,color:"#8ed0ff"}}>ENGINEERING PORTFOLIO</div>
        </div>

        <div style={{display:"flex",flexDirection:"column",zIndex:1,maxWidth:1040}}>
          <div style={{display:"flex",color:"#8ed0ff",fontSize:14,fontWeight:800,letterSpacing:2.6,marginBottom:18}}>FULL-STACK · BACKEND · AI & INTERACTIVE SYSTEMS</div>
          <div style={{display:"flex",flexDirection:"column",fontSize:78,lineHeight:.92,letterSpacing:-4.6,fontWeight:750}}>
            <span>INTERFACE TO</span>
            <span style={{color:"#a9b9c9"}}>RUNTIME.</span>
          </div>
          <div style={{display:"flex",marginTop:24,color:"#a2afbd",fontSize:19,lineHeight:1.4,maxWidth:900}}>Products, APIs, data, asynchronous work, testing, security and deployment — designed as one system.</div>
        </div>

        <div style={{display:"flex",gap:12,zIndex:1,paddingTop:20,borderTop:"1px solid rgba(255,255,255,.14)"}}>
          {["TypeScript","React / Next.js","Node / Express","PostgreSQL / MongoDB","Redis / BullMQ"].map((item)=><div key={item} style={{display:"flex",padding:"8px 11px",border:"1px solid rgba(255,255,255,.16)",color:"#aab6c4",fontSize:12,fontWeight:700}}>{item}</div>)}
        </div>
      </div>
    ),
    size,
  );
}
