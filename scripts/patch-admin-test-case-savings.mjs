import fs from "node:fs";
import path from "node:path";
import { buildAdminTestCaseSavingsPreview } from "../server/savings/adminTestCaseSavings.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(repoRoot, "public", "sample_matching_test_cases.json");
const incentiveRulesPath =
  process.env.OPPORTUNITY_INCENTIVE_RULES_PATH || path.join(repoRoot, "data", "opportunity_incentive_rules.json");
const incentiveCalculationPackagesPath =
  process.env.OPPORTUNITY_INCENTIVE_CALCULATION_PACKAGES_PATH ||
  path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const taxGeographyRulesPath = process.env.TAX_GEOGRAPHY_RULES_PATH || path.join(repoRoot, "data", "tax_geography_rules.json");
const source = JSON.parse(fs.readFileSync(testCasesPath, "utf8"));
const opportunityIncentiveRules = readOpportunityIncentiveRules(incentiveRulesPath);
const opportunityIncentiveCalculationPackages = readOpportunityIncentiveCalculationPackages(incentiveCalculationPackagesPath);
const taxGeographyRules = readTaxGeographyRules(taxGeographyRulesPath);
const calculationDate = (source.generatedAt || new Date().toISOString()).slice(0, 10);

let calculatedCount = 0;
let unsupportedCount = 0;

const testCases = (source.testCases || []).map((testCase) => {
  const retrofits = (testCase.retrofits || []).map((retrofitGroup) => {
    const savingsPreview = buildAdminTestCaseSavingsPreview({
      retrofitGroup,
      sampleUserId: testCase.sampleUserId,
      normalizedProfile: testCase.normalizedProfile,
      taxContext: {
        siteTaxProfile: testCase.siteTaxProfile || null,
        taxProfileFacts: Array.isArray(testCase.taxProfileFacts) ? testCase.taxProfileFacts : [],
        taxExtractedValues: Array.isArray(testCase.taxExtractedValues) ? testCase.taxExtractedValues : [],
        taxOpportunitySpecificInputs: Array.isArray(testCase.taxOpportunitySpecificInputs)
          ? testCase.taxOpportunitySpecificInputs
          : [],
        taxMissingOrReviewInputs: Array.isArray(testCase.taxMissingOrReviewInputs)
          ? testCase.taxMissingOrReviewInputs
          : [],
        uploadedTaxFiles: Array.isArray(testCase.uploadedTaxFiles) ? testCase.uploadedTaxFiles : [],
        syntheticTaxDataNotice: testCase.syntheticTaxDataNotice || null,
        taxDataSchemaVersion: testCase.taxDataSchemaVersion || null,
        taxDataSourceArtifact: testCase.taxDataSourceArtifact || null
      },
      grantContext: buildGrantContext(testCase),
      calculationDate,
      opportunityIncentiveRules,
      opportunityIncentiveCalculationPackages,
      taxGeographyRules
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
  incentiveFormulaRateTableCalculationPackageCount: opportunityIncentiveCalculationPackages.length,
  testCases
};

fs.writeFileSync(testCasesPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Patched admin test-case savings previews.`);
console.log(`File: ${testCasesPath}`);
console.log(`Calculated previews: ${calculatedCount}`);
console.log(`Unsupported previews: ${unsupportedCount}`);
console.log(`Opportunity incentive rules loaded: ${opportunityIncentiveRules.length}`);
console.log(`V2 calculation packages loaded: ${opportunityIncentiveCalculationPackages.length}`);
console.log(`Tax geography rules loaded: ${taxGeographyRules.length}`);

function readOpportunityIncentiveRules(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (source.rules || [])
    .filter((rule) => rule?.opportunityId)
    .filter((rule) => rule.active !== false)
    .filter((rule) => rule.confidence !== "low");
}

function readOpportunityIncentiveCalculationPackages(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (source.packages || []).filter((pkg) => pkg?.opportunity_id);
}

function readTaxGeographyRules(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (source.rules || []).filter((rule) => rule?.id && rule.active !== false);
}

function buildGrantContext(testCase) {
  return {
    grantProfileFacts: Array.isArray(testCase.grantProfileFacts) ? testCase.grantProfileFacts : [],
    grantRetrofitProjectInputs: Array.isArray(testCase.grantRetrofitProjectInputs)
      ? testCase.grantRetrofitProjectInputs
      : [],
    grantOpportunitySpecificInputs: Array.isArray(testCase.grantOpportunitySpecificInputs)
      ? testCase.grantOpportunitySpecificInputs
      : [],
    grantMissingOrReviewInputs: Array.isArray(testCase.grantMissingOrReviewInputs)
      ? testCase.grantMissingOrReviewInputs
      : [],
    grantDoNotForceQualificationReasons: Array.isArray(testCase.grantDoNotForceQualificationReasons)
      ? testCase.grantDoNotForceQualificationReasons
      : [],
    syntheticGrantProfileDataNotice: testCase.syntheticGrantProfileDataNotice || null,
    grantProfileConfidence: testCase.grantProfileConfidence || null,
    grantProfileNotes: testCase.grantProfileNotes || null,
    grantProfileDataSchemaVersion: testCase.grantProfileDataSchemaVersion || null,
    grantProfileDataSourceArtifact: testCase.grantProfileDataSourceArtifact || null
  };
}
