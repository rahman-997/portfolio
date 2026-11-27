const transientPatterns = [
  /\b429\b/i,
  /\b5\d\d\b.*(?:service|server|gateway|unavailable|timeout)/i,
  /service unavailable/i,
  /audit endpoint returned an error/i,
  /econnreset/i,
  /econnrefused/i,
  /eai_again/i,
  /enotfound/i,
  /etimedout/i,
  /socket hang up/i,
  /network.*(?:error|timeout)/i,
];


// Explicit outcomes ensure an unavailable advisory service can never become a pass.
export async function runDependencyAudit({run, wait, log=()=>{}, warn=()=>{}, maxAttempts=3, retryDelayMs=3000}) {
  for (let attempt=1; attempt<=maxAttempts; attempt++) {
    const result=run();
    const output=`${result.stdout ?? ""}${result.stderr ?? ""}`;
    if(output) log(output);
    if(result.status===0 && !result.error && !result.signal) return {status:"pass",attempts:attempt,exitCode:0};
    const transient=result.error?.code==="ETIMEDOUT" || transientPatterns.some(pattern=>pattern.test(output));
    if(!transient) return {status:"failed",attempts:attempt,exitCode:result.status>0?result.status:1};
    if(attempt===maxAttempts) return {status:"unavailable",attempts:attempt,exitCode:1};
    warn(`Transient npm audit failure on attempt ${attempt}/${maxAttempts}; retrying after ${retryDelayMs}ms.`);
    await wait(retryDelayMs);
  }
  return {status:"failed",attempts:0,exitCode:1};
}
