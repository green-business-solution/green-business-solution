import fs from "node:fs";
import path from "node:path";
import { normalizeUserProfile } from "../apps/api/server/matching/normalizeUserProfile.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultOutputPath = path.join(
  repoRoot,
  "GPT Pro Work",
  "ri-renewable-tax-valuation-test-case-2026-07-04",
  "output_001_ri_renewable_tax_valuation_test_case.md"
);
const outputPath = process.env.RI_RENEWABLE_TAX_TEST_CASE_OUTPUT_PATH || defaultOutputPath;
const sampleProfilesPath = process.env.SAMPLE_USER_PROFILES_PATH || path.join(repoRoot, "data", "sample_user_profiles.json");
const artifactPath =
  process.env.RI_RENEWABLE_TAX_TEST_CASE_ARTIFACT_PATH ||
  path.join(repoRoot, "data", "ri_renewable_tax_valuation_test_case_gpt_pro_2026-07-04.json");
const reportPath =
  process.env.RI_RENEWABLE_TAX_TEST_CASE_REPORT_PATH ||
  path.join(repoRoot, "data", "ri_renewable_tax_valuation_test_case_intake_report_2026-07-04.md");

const payload = parseFirstJsonObject(fs.readFileSync(outputPath, "utf8"));
if (payload.schemaVersion !== "retrofi_ri_renewable_tax_valuation_test_case.v1") {
  throw new Error(`Unexpected RI renewable tax test-case schema: ${payload.schemaVersion || "missing"}`);
}

const sourceForm = buildSampleProfile(payload);
const sampleProfiles = JSON.parse(fs.readFileSync(sampleProfilesPath, "utf8"));
const existingIndex = sampleProfiles.findIndex((sample) => sample.sampleUserId === sourceForm.sampleUserId);
if (existingIndex >= 0) {
  sampleProfiles[existingIndex] = sourceForm;
} else {
  sampleProfiles.push(sourceForm);
}

fs.writeFileSync(sampleProfilesPath, `${JSON.stringify(sampleProfiles, null, 2)}\n`);
fs.writeFileSync(artifactPath, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport({ payload, sourceForm, existingIndex }), "utf8");

console.log("Applied RI renewable tax valuation test case.");
console.log(`Sample user: ${sourceForm.sampleUserId}`);
console.log(`Action: ${existingIndex >= 0 ? "updated" : "added"}`);
console.log(`Sample profiles: ${path.relative(repoRoot, sampleProfilesPath)}`);
console.log(`Artifact: ${path.relative(repoRoot, artifactPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function buildSampleProfile(payload) {
  const testCase = payload.testCase;
  const sampleUserId = testCase.sampleUserId;
  const uploadedTaxFiles = (payload.syntheticTaxFiles || []).map((file) => ({
    ...file,
    clientIntakeId: `intake_sample_${sampleUserId}`,
    siteId: `intake_sample_${sampleUserId}:primary_site`,
    uploadedAt: `${payload.researchedAt}T00:00:00.000Z`,
    processedAt: `${payload.researchedAt}T00:00:00.000Z`
  }));

  const sourceForm = {
    sampleUserId,
    description: testCase.description,
    companyName: testCase.companyName,
    website: testCase.website,
    organizationType: testCase.organizationType,
    organizationSize: testCase.organizationSize,
    siteAddress: testCase.siteAddress,
    siteGeography: {
      stateCode: testCase.state,
      countyName: testCase.county,
      placeName: testCase.municipality,
      zip5: String(testCase.siteAddress || "").match(/\b\d{5}\b/)?.[0] || null,
      status: "gpt_pro_synthetic_fixture",
      provider: "gpt_pro"
    },
    electricUtilityProvider: "Rhode Island Energy",
    gasUtilityProvider: "Rhode Island Energy",
    ownershipStatus: testCase.ownershipStatus,
    buildingType: testCase.buildingType,
    squareFootage: testCase.squareFootage,
    primaryActivityText: testCase.primaryActivityText,
    naicsCodes: testCase.naicsCodes || [],
    publicSourceNotes: testCase.publicSourceNotes,
    notes: testCase.notes,
    project: {
      stage: payload.recommendedRetrofits?.[0]?.projectStage || "quoted"
    },
    fullName: "Sample User",
    email: `${sampleUserId}@example.com`,
    phone: "555-0261",
    siteTaxProfile: {
      schemaVersion: "retrofi_site_tax_profile_synthetic_v1",
      generatedAt: `${payload.researchedAt}T00:00:00.000Z`,
      sourceArtifact: path.relative(repoRoot, artifactPath),
      sampleUserId,
      syntheticNotice: "Synthetic estimated tax profile for test fixtures; not actual tax documents.",
      uploadedFileCount: uploadedTaxFiles.length,
      processedFileCount: uploadedTaxFiles.filter((file) => file.processingStatus === "processed").length,
      taxDocumentTypes: [...new Set(uploadedTaxFiles.map((file) => file.taxDocumentType).filter(Boolean))],
      taxYears: [...new Set(uploadedTaxFiles.map((file) => String(file.taxYear)).filter(Boolean))],
      jurisdictions: [...new Set(uploadedTaxFiles.map((file) => file.jurisdiction).filter(Boolean))],
      taxProfileFactCount: payload.taxProfileFacts?.length || 0,
      opportunitySpecificTaxInputCount: payload.opportunitySpecificTaxInputs?.length || 0,
      missingOrReviewInputCount: payload.missingOrReviewInputs?.length || 0,
      sourceUrlsChecked: payload.sourceUrlsChecked || [],
      reasoningNotes: payload.reasoningNotes || ""
    },
    uploadedTaxFiles,
    taxProfileFacts: payload.taxProfileFacts || [],
    taxExtractedValues: buildExtractedValues(payload, uploadedTaxFiles),
    taxOpportunitySpecificInputs: payload.opportunitySpecificTaxInputs || [],
    taxMissingOrReviewInputs: payload.missingOrReviewInputs || [],
    syntheticTaxDataNotice: "Synthetic RI renewable tax valuation profile for test fixtures; not an actual tax document.",
    taxDataGeneratedAt: `${payload.researchedAt}T00:00:00.000Z`,
    taxDataImportedAt: new Date().toISOString(),
    taxDataSchemaVersion: payload.schemaVersion,
    taxDataSourceArtifact: path.relative(repoRoot, artifactPath),
    taxExpectedInternalCalculation: payload.expectedInternalCalculation || null,
    syntheticUtilityDataNotice: "Synthetic estimated utility profile for test fixtures; not an actual bill.",
    utilityDataStatus: "synthetic_estimated_not_actual_bills",
    utilityDataConfidence: "medium",
    siteEnergyProfile: buildEnergyProfile(sampleUserId),
    uploadedUtilityFiles: [],
    utilityExtractedValues: []
  };

  const normalized = normalizeUserProfile(sourceForm);
  if (!normalized.completeness.hasState || !normalized.completeness.hasBuildingType) {
    throw new Error(`Generated sample profile is missing required matching context for ${sampleUserId}.`);
  }
  return sourceForm;
}

function buildExtractedValues(payload, uploadedTaxFiles) {
  return (payload.taxProfileFacts || []).map((fact, index) => ({
    extractedValueId: `ev_${payload.testCase.sampleUserId}_${String(index + 1).padStart(3, "0")}`,
    clientIntakeId: `intake_sample_${payload.testCase.sampleUserId}`,
    fileId: fact.sourceFileId || uploadedTaxFiles[0]?.fileId || null,
    fieldId: fact.inputKey,
    fieldDisplayName: fact.inputKey,
    value: fact.value,
    unit: typeof fact.value === "number" && /cents/i.test(fact.inputKey) ? "cents" : typeof fact.value,
    taxYear: 2026,
    confidence: fact.confidenceImpactUntilConfirmed || "medium",
    sourceType: fact.sourceStrategy || "synthetic_tax_document",
    sourceText: fact.notes || "Synthetic GPT Pro RI renewable tax valuation fixture.",
    sourcePath: fact.sourceFileId ? `synthetic://${fact.sourceFileId}#/fields/${fact.inputKey}` : null
  }));
}

function buildEnergyProfile(sampleUserId) {
  return {
    siteId: `intake_sample_${sampleUserId}:primary_site`,
    uploadedFileCount: 0,
    processedFileCount: 0,
    availableFieldIds: ["annual_kwh", "annual_therms", "average_cost_per_kwh", "average_cost_per_therm"],
    latestUtilityProvider: "Rhode Island Energy",
    annualKwh: 2100000,
    annualElectricCost: 399000,
    averageCostPerKwh: 0.19,
    utilitySummaries: [
      {
        utilityCategory: "electric",
        uploadedFileCount: 0,
        processedFileCount: 0,
        latestUtilityProvider: "Rhode Island Energy",
        annualUsage: 2100000,
        annualCost: 399000,
        averageUnitCost: 0.19,
        usageUnit: "kWh",
        monthlySummaries: []
      },
      {
        utilityCategory: "gas",
        uploadedFileCount: 0,
        processedFileCount: 0,
        latestUtilityProvider: "Rhode Island Energy",
        annualUsage: 42000,
        annualCost: 71400,
        averageUnitCost: 1.7,
        usageUnit: "therms",
        monthlySummaries: []
      }
    ],
    lastUpdatedAt: "2026-07-04T00:00:00.000Z"
  };
}

function parseFirstJsonObject(text) {
  const start = text.indexOf("{");
  if (start < 0) throw new Error("No JSON object found in GPT Pro output.");

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
    } else if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) return JSON.parse(text.slice(start, index + 1));
    }
  }

  throw new Error("Could not find the end of the first JSON object.");
}

function buildReport({ payload, sourceForm, existingIndex }) {
  const lines = [];
  lines.push("# RI Renewable Tax Valuation Test Case Intake");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push(`- Source output: \`${path.relative(repoRoot, outputPath)}\``);
  lines.push(`- Parsed artifact: \`${path.relative(repoRoot, artifactPath)}\``);
  lines.push(`- Sample user: \`${sourceForm.sampleUserId}\``);
  lines.push(`- Action: ${existingIndex >= 0 ? "updated existing sample profile" : "added new sample profile"}`);
  lines.push(`- Opportunity under test: \`${payload.opportunitySpecificTaxInputs?.[0]?.opportunityId || "unknown"}\``);
  lines.push(`- Expected internal savings before review: ${payload.expectedInternalCalculation?.estimatedAnnualSavingsCentsBeforeReview ?? "unknown"} cents`);
  lines.push(`- Included in user-facing total: ${payload.expectedInternalCalculation?.includedInUserFacingTotal === true ? "yes" : "no"}`);
  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push("- The company, parcel, tax documents, and project facts are synthetic.");
  lines.push("- The profile intentionally keeps assessor/accountant review pending, so the RI property-tax valuation estimate should remain internal-only.");
  lines.push("");
  return `${lines.join("\n")}\n`;
}
