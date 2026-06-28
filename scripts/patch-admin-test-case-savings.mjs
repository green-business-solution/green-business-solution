import fs from "node:fs";
import path from "node:path";
import { buildAdminTestCaseSavingsPreview } from "../server/savings/adminTestCaseSavings.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(repoRoot, "public", "sample_matching_test_cases.json");
const incentiveRulesPath =
  process.env.OPPORTUNITY_INCENTIVE_RULES_PATH || path.join(repoRoot, "data", "opportunity_incentive_rules.json");
const source = JSON.parse(fs.readFileSync(testCasesPath, "utf8"));
const opportunityIncentiveRules = readOpportunityIncentiveRules(incentiveRulesPath);
const calculationDate = (source.generatedAt || new Date().toISOString()).slice(0, 10);

let calculatedCount = 0;
let unsupportedCount = 0;

const testCases = (source.testCases || []).map((testCase) => {
  const retrofits = (testCase.retrofits || []).map((retrofitGroup) => {
    const savingsPreview = buildAdminTestCaseSavingsPreview({
      retrofitGroup,
      sampleUserId: testCase.sampleUserId,
      normalizedProfile: testCase.normalizedProfile,
      calculationDate,
      opportunityIncentiveRules
    });

    if (savingsPreview.status === "calculated") calculatedCount += 1;
    if (savingsPreview.status === "unsupported") unsupportedCount += 1;

    return {
      ...retrofitGroup,
      savingsPreview
    };
  });

  return {
    ...testCase,
    retrofits
  };
});

const output = {
  ...source,
  opportunityIncentiveRuleCount: opportunityIncentiveRules.length,
  testCases
};

fs.writeFileSync(testCasesPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Patched admin test-case savings previews.`);
console.log(`File: ${testCasesPath}`);
console.log(`Calculated previews: ${calculatedCount}`);
console.log(`Unsupported previews: ${unsupportedCount}`);
console.log(`Opportunity incentive rules loaded: ${opportunityIncentiveRules.length}`);

function readOpportunityIncentiveRules(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (source.rules || [])
    .filter((rule) => rule?.opportunityId)
    .filter((rule) => rule.active !== false)
    .filter((rule) => rule.confidence !== "low");
}
