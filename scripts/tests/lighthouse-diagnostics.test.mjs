import { test } from "node:test";
import assert from "node:assert/strict";
import { lighthouseDiagnostics } from "../lighthouse-diagnostics.mjs";

test("missing diagnostics remain absent rather than invented zeros",()=>{
  assert.deepEqual(lighthouseDiagnostics({}),{lcpBreakdown:[],longTasks:[],opportunities:[],totalByteWeight:null});
});

test("nested LCP breakdown, savings and tasks retain finite measured values",()=>{
  const actual=lighthouseDiagnostics({audits:{
    "lcp-breakdown-insight":{details:{items:[{items:[{phase:"Render delay",duration:1800}]}]}},
    "long-tasks":{details:{items:[{duration:120,startTime:30}]}},
    "unused-javascript":{score:0.5,details:{overallSavingsMs:400,overallSavingsBytes:50000}},
    "total-byte-weight":{numericValue:90000}
  }});
  assert.deepEqual(actual.lcpBreakdown,[{phase:"Render delay",duration:1800}]);
  assert.deepEqual(actual.longTasks,[{durationMs:120,startMs:30}]);
  assert.equal(actual.opportunities[0].estimatedSavingsMs,400);
  assert.equal(actual.totalByteWeight,90000);
});
