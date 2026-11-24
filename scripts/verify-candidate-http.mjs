import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const [manifestPath, origin] = process.argv.slice(2);
const url = new URL(origin ?? "http://127.0.0.1:4173");
if (url.protocol !== "http:" || url.hostname !== "127.0.0.1" || url.pathname !== "/" || url.username || url.password || url.search || url.hash) {
  throw new Error("Candidate HTTP verification is loopback-only");
}
const manifest = JSON.parse(readFileSync(manifestPath,"utf8"));
if (!Array.isArray(manifest.files) || !manifest.files.length) throw new Error("Missing file inventory");
let verified = 0;
for (const file of manifest.files) {
  const route = "/" + file.path.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(new URL(route,url), {redirect:"error",signal:AbortSignal.timeout(10000)});
  if (!response.ok) throw new Error(route + " HTTP " + response.status);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length !== file.bytes || createHash("sha256").update(bytes).digest("hex") !== file.sha256) {
    throw new Error("HTTP payload mismatch: "+route);
  }
  verified++;
}
for (const route of ["/","/ar/","/tr/","/resume/","/work/fitflow/","/work/mizan/","/work/bookhaven/","/work/eventify/","/work/venues-api/"]) {
  const response=await fetch(new URL(route,url),{redirect:"error",signal:AbortSignal.timeout(10000)});
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html") || !(await response.text()).includes('data-deploy-commit="'+manifest.commit+'"')) {
    throw new Error("Route contract failed: "+route);
  }
}
console.log("Local HTTP verified: "+verified+" exact file payloads and 9 page routes at "+manifest.commit);
