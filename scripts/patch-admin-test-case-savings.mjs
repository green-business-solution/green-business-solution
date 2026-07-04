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
      taxContext: buildTaxContext(testCase),
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
  const sourceForm = testCase.sourceForm || {};
  const normalizedGrant = testCase.normalizedProfile?.grant || {};
  return {
    grantProfileFacts: mergeRows(testCase.grantProfileFacts, sourceForm.grantProfileFacts, normalizedGrant.grantProfileFacts),
    grantRetrofitProjectInputs: mergeRows(
      testCase.grantRetrofitProjectInputs,
      sourceForm.grantRetrofitProjectInputs,
      normalizedGrant.grantRetrofitProjectInputs
    ),
    grantOpportunitySpecificInputs: mergeRows(
      testCase.grantOpportunitySpecificInputs,
      sourceForm.grantOpportunitySpecificInputs,
      normalizedGrant.grantOpportunitySpecificInputs
    ),
    grantMissingOrReviewInputs: mergeRows(
      testCase.grantMissingOrReviewInputs,
      sourceForm.grantMissingOrReviewInputs,
      normalizedGrant.grantMissingOrReviewInputs
    ),
    grantDoNotForceQualificationReasons: uniqueStrings(
      testCase.grantDoNotForceQualificationReasons,
      sourceForm.grantDoNotForceQualificationReasons,
      normalizedGrant.grantDoNotForceQualificationReasons
    ),
    syntheticGrantProfileDataNotice: firstPresent(
      testCase.syntheticGrantProfileDataNotice,
      sourceForm.syntheticGrantProfileDataNotice,
      normalizedGrant.syntheticGrantProfileDataNotice
    ),
    grantProfileConfidence: firstPresent(testCase.grantProfileConfidence, sourceForm.grantProfileConfidence, normalizedGrant.grantProfileConfidence),
    grantProfileNotes: firstPresent(testCase.grantProfileNotes, sourceForm.grantProfileNotes, normalizedGrant.grantProfileNotes),
    grantProfileDataSchemaVersion: firstPresent(
      testCase.grantProfileDataSchemaVersion,
      sourceForm.grantProfileDataSchemaVersion,
      normalizedGrant.grantProfileDataSchemaVersion
    ),
    grantProfileDataSourceArtifact: firstPresent(
      testCase.grantProfileDataSourceArtifact,
      sourceForm.grantProfileDataSourceArtifact,
      normalizedGrant.grantProfileDataSourceArtifact
    )
  };
}

function buildTaxContext(testCase) {
  const sourceForm = testCase.sourceForm || {};
  const normalizedTax = testCase.normalizedProfile?.tax || {};
  return {
    siteTaxProfile: firstPresent(testCase.siteTaxProfile, sourceForm.siteTaxProfile, normalizedTax.siteTaxProfile) || null,
    taxProfileFacts: mergeRows(testCase.taxProfileFacts, sourceForm.taxProfileFacts, normalizedTax.taxProfileFacts),
    taxExtractedValues: mergeRows(testCase.taxExtractedValues, sourceForm.taxExtractedValues, normalizedTax.taxExtractedValues),
    taxOpportunitySpecificInputs: mergeRows(
      testCase.taxOpportunitySpecificInputs,
      sourceForm.taxOpportunitySpecificInputs,
      normalizedTax.taxOpportunitySpecificInputs
    ),
    taxMissingOrReviewInputs: mergeRows(
      testCase.taxMissingOrReviewInputs,
      sourceForm.taxMissingOrReviewInputs,
      normalizedTax.taxMissingOrReviewInputs
    ),
    uploadedTaxFiles: mergeRows(testCase.uploadedTaxFiles, sourceForm.uploadedTaxFiles, normalizedTax.uploadedTaxFiles),
    syntheticTaxDataNotice: firstPresent(testCase.syntheticTaxDataNotice, sourceForm.syntheticTaxDataNotice, normalizedTax.syntheticTaxDataNotice),
    taxDataSchemaVersion: firstPresent(testCase.taxDataSchemaVersion, sourceForm.taxDataSchemaVersion, normalizedTax.taxDataSchemaVersion),
    taxDataSourceArtifact: firstPresent(testCase.taxDataSourceArtifact, sourceForm.taxDataSourceArtifact, normalizedTax.taxDataSourceArtifact)
  };
}

function mergeRows(...values) {
  const rows = values.flatMap((value) => (Array.isArray(value) ? value : []));
  const seen = new Set();
  return rows.filter((row) => {
    const key = JSON.stringify(row);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function uniqueStrings(...values) {
  return [...new Set(values.flatMap((value) => (Array.isArray(value) ? value : [])).filter(Boolean))];
}

function firstPresent(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "") ?? null;
}
