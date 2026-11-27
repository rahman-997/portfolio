import {mkdirSync, writeFileSync} from "node:fs";
import {assessSecurityHeaders} from "./production-header-contract.mjs";

// Read-only fixed-origin observation; no credentials, redirects, or body persistence.
const origin="https://abdulrahman-hajar-portfolio.onrender.com";
const routes=["/","/ar/","/tr/","/resume/","/work/fitflow/","/work/mizan/","/work/bookhaven/","/work/eventify/","/work/venues-api/"];
const results=await Promise.all(routes.map(async route=>{
  try {
    const response=await fetch(origin+route,{redirect:"manual",signal:AbortSignal.timeout(15000),
      headers:{"user-agent":"portfolio-header-observer/1.0"}});
    const status=response.status;
    const contentType=response.headers.get("content-type");
    await response.body?.cancel();
    if(status!==200 || !contentType?.toLowerCase().includes("text/html")) {
      return {route,status:"inconclusive",httpStatus:status,contentType};
    }
    return {route,httpStatus:status,...assessSecurityHeaders(response.headers)};
  } catch(error) {
    return {route,status:"inconclusive",reason:error instanceof Error?error.name:"unknown"};
  }
}));
const report={checkedAt:new Date().toISOString(),origin,scope:"Existing public site; no release or production change.",
  status:results.every(row=>row.status==="pass")?"pass":results.some(row=>row.status==="incomplete")?"incomplete":"inconclusive",routes:results};
for(const item of results) {
  const gaps=item.checks?.filter(check=>check.status!=="pass").map(check=>check.name+":"+check.status)??[];
  console.log("Published headers:",item.route,item.status,gaps.join(", "));
}
mkdirSync("delivery-evidence",{recursive:true});
writeFileSync("delivery-evidence/headers.json",JSON.stringify(report,null,2)+"\n");
if(report.status!=="pass") console.warn("::warning::Published header policy is "+report.status+"; this is a read-only observation, not a candidate build failure.");
