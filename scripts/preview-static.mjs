/**
 * Portfolio V3.1: local static-export preview using only Node built-ins.
 *
 * npm run preview:local        -> only this computer (127.0.0.1)
 * npm run preview:lan          -> phone on same trusted private Wi-Fi
 *
 * Serve ONLY generated /out content. This is NOT a production deployment.
 * No external dependencies, credentials, proxying or server-side rendering.
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, join, sep, extname } from "node:path";
import { networkInterfaces } from "node:os";

const root=resolve(process.cwd(),"out");
if(!existsSync(join(root,"index.html"))){
 console.error("Missing out/index.html. Run npm run build first.");
 process.exit(1);
}
const lan=process.argv.includes("--lan");
const host=lan?"0.0.0.0":"127.0.0.1";
const port=Number(process.env.PORTFOLIO_PREVIEW_PORT??4173);
if(!Number.isInteger(port)||port<1||port>65535)throw Error("Invalid PORTFOLIO_PREVIEW_PORT");
const mime={
 ".html":"text/html; charset=utf-8",
 ".css":"text/css; charset=utf-8",
 ".js":"text/javascript; charset=utf-8",
 ".mjs":"text/javascript; charset=utf-8",
 ".json":"application/json; charset=utf-8",
 ".webmanifest":"application/manifest+json; charset=utf-8",
 ".txt":"text/plain; charset=utf-8",
 ".xml":"application/xml; charset=utf-8",
 ".svg":"image/svg+xml",
 ".png":"image/png",
 ".jpg":"image/jpeg",
 ".jpeg":"image/jpeg",
 ".webp":"image/webp",
 ".avif":"image/avif",
 ".gif":"image/gif",
 ".ico":"image/x-icon",
 ".pdf":"application/pdf",
 ".woff":"font/woff",
 ".woff2":"font/woff2",
 ".ttf":"font/ttf",
 ".wasm":"application/wasm",
 ".mp4":"video/mp4",
 ".map":"application/json; charset=utf-8",
};
const server=createServer((req,res)=>{
 const send=(status,message,headers={})=>{
   res.writeHead(status,{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...headers});
   res.end(req.method==="HEAD"?"":message);
 };
 if(req.method!=="GET"&&req.method!=="HEAD"){
  return send(405,"Method Not Allowed",{Allow:"GET, HEAD"});
 }
 let pathname;
 try{
  pathname=decodeURIComponent(new URL(req.url??"/","http://localhost").pathname);
 }catch{return send(400,"Malformed URL");}
 if(pathname.includes("\0")||pathname.includes("\\")||pathname.split("/").some(segment=>segment===".."||segment==="."||segment.startsWith("."))){
   return send(404,"Not Found");
 }
 let file=resolve(root,"."+pathname);
 if(file!==root&&!file.startsWith(root+sep))return send(404,"Not Found");
 try{
   if(statSync(file).isDirectory()){
     if(!pathname.endsWith("/")){
       res.writeHead(308,{Location:pathname+"/"+new URL(req.url??"/","http://localhost").search,"Cache-Control":"no-store"});
       return res.end();
     }
     file=join(file,"index.html");
   }
 }catch{}
 if(!existsSync(file)||!statSync(file).isFile()){
   return send(404,"Not Found");
 }
 const meta=statSync(file);
 res.writeHead(200,{"Content-Type":mime[extname(file).toLowerCase()]??"application/octet-stream",
     "Content-Length":meta.size,"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
 if(req.method==="HEAD")return res.end();
 const stream=createReadStream(file);
 stream.on("error",()=>res.destroy());
 stream.pipe(res);
});
server.on("error",e=>{console.error("Local preview cannot start:",e.message);process.exitCode=1;});
server.listen(port,host,()=>{
 console.log("\nPortfolio V3.1 static preview (out/ only)");
 console.log("Computer: http://127.0.0.1:"+port+"/");
 if(lan){
  const addresses=[...new Set(Object.values(networkInterfaces()).flatMap(items=>(items??[])
      .filter(x=>x.family==="IPv4"&&!x.internal).map(x=>x.address)))];
  for(const addr of addresses)console.log("LAN candidate: http://"+addr+":"+port+"/");
  console.log("Use the Wi-Fi IPv4 address only. Keep Windows Firewall on, allow Private network only.");
  console.log("Anyone on your trusted Wi-Fi who knows the address can view this preview.");
 }else{
  console.log("Loopback only. Use npm run preview:lan to test from Android.");
 }
 console.log("English / | Arabic /ar/ | Turkish /tr/");
 console.log("Stop sharing by pressing Ctrl+C in this terminal.\n");
});
