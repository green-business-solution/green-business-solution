import fs from "node:fs";
import path from "node:path";
import {
  RETROFIT_TYPES_BY_ID,
  SPECIAL_PREREQUISITE_NORMAL_EDGE_OPPORTUNITY_IDS
} from "../apps/api/server/matching/retrofitTaxonomy.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(repoRoot, "public");
const retrofitIndexPath = process.env.RETROFIT_INDEX_PATH || path.join(publicDir, "retrofit_opportunity_index.json");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(publicDir, "sample_matching_test_cases.json");
const suppressedIds = SPECIAL_PREREQUISITE_NORMAL_EDGE_OPPORTUNITY_IDS;

const retrofitIndex = readJson(retrofitIndexPath);
const testCases = readJson(testCasesPath);
let indexEdgesRemoved = 0;
let testCaseEdgesRemoved = 0;

for (const retrofit of retrofitIndex.retrofits || []) {
  if (!isPhysicalRetrofit(retrofit.retrofitTypeId)) continue;
  const before = retrofit.opportunities?.length || 0;
  retrofit.opportunities = (retrofit.opportunities || []).filter((opportunity) => !suppressedIds.has(opportunity.opportunityId));
  indexEdgesRemoved += before - retrofit.opportunities.length;
  retrofit.opportunityCount = retrofit.opportunities.length;
}
retrofitIndex.retrofits = (retrofitIndex.retrofits || []).filter((retrofit) => retrofit.opportunityCount > 0);
retrofitIndex.retrofitCount = retrofitIndex.retrofits.length;

for (const testCase of testCases.testCases || []) {
  for (const retrofit of testCase.retrofits || []) {
    if (!isPhysicalRetrofit(retrofit.retrofitTypeId)) {
      retrofit.opportunities = (retrofit.opportunities || []).map(stripSuppressedPhysicalRetrofitTypes);
      continue;
    }

    const before = retrofit.opportunities?.length || 0;
    retrofit.opportunities = (retrofit.opportunities || [])
      .filter((opportunity) => !suppressedIds.has(opportunity.opportunityId))
      .map(stripSuppressedPhysicalRetrofitTypes);
    testCaseEdgesRemoved += before - retrofit.opportunities.length;
    retrofit.opportunityCount = retrofit.opportunities.length;
    if (retrofit.savingsPreview) {
      retrofit.savingsPreview.opportunityCount = retrofit.opportunities.length;
    }
  }

  testCase.retrofits = (testCase.retrofits || []).filter((retrofit) => retrofit.opportunityCount > 0);
  testCase.topResults = (testCase.topResults || []).map(stripSuppressedPhysicalRetrofitTypes);
}

writeJson(retrofitIndexPath, retrofitIndex);
writeJson(testCasesPath, testCases);

console.log("Applied special prerequisite edge suppressions to public fixtures.");
console.log(`Suppressed opportunity IDs: ${suppressedIds.size}`);
console.log(`Retrofit index edges removed: ${indexEdgesRemoved}`);
console.log(`Test case edges removed: ${testCaseEdgesRemoved}`);

function stripSuppressedPhysicalRetrofitTypes(opportunity) {
  if (!suppressedIds.has(opportunity.opportunityId)) return opportunity;
  return {
    ...opportunity,
    retrofitTypeIds: (opportunity.retrofitTypeIds || []).filter((retrofitTypeId) => !isPhysicalRetrofit(retrofitTypeId)),
    retrofitTypes: (opportunity.retrofitTypes || []).filter((retrofit) => !isPhysicalRetrofit(retrofit.retrofitTypeId))
  };
}

function isPhysicalRetrofit(retrofitTypeId) {
  return Boolean(RETROFIT_TYPES_BY_ID[retrofitTypeId]?.isPhysicalRetrofit);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
