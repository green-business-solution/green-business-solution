import fs from "node:fs";
import path from "node:path";
import { calculateLocalTaxWorkflow, selectLocalTaxWorkflows } from "../server/savings/localTaxWorkflows.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(repoRoot, "public", "sample_matching_test_cases.json");
const packagePath =
  process.env.OPPORTUNITY_INCENTIVE_CALCULATION_PACKAGES_PATH ||
  path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const localTaxWorkflowPath = process.env.TAX_LOCAL_WORKFLOW_RULES_PATH || path.join(repoRoot, "data", "tax_local_workflow_rules.json");
const jsonReportPath =
  process.env.GRANT_TAX_COVERAGE_JSON_PATH ||
  path.join(repoRoot, "data", "test_case_grant_tax_estimate_coverage_report_2026-07-03.json");
const markdownReportPath =
  process.env.GRANT_TAX_COVERAGE_MD_PATH ||
  path.join(repoRoot, "data", "test_case_grant_tax_estimate_coverage_report_2026-07-03.md");

const testCasePayload = JSON.parse(fs.readFileSync(testCasesPath, "utf8"));
const packagePayload = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const localTaxPayload = JSON.parse(fs.readFileSync(localTaxWorkflowPath, "utf8"));

const TAX_EFFECT_TYPES = new Set(["tax_credit", "tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"]);
const BLOCKED_RUNTIME_STATUSES = new Set([
  "source_inaccessible_repair_failure",
  "unavailable_archived",
  "no_calculable_value",
  "needs_repair_review",
  "custom_quote_estimate"
]);

const testCases = testCasePayload.testCases || [];
const allPackages = packagePayload.packages || [];
const localTaxWorkflows = localTaxPayload.workflows || [];
const packageTaxOpportunityIds = new Set(
  allPackages
    .filter((pkg) => (pkg.effects || []).some((effect) => TAX_EFFECT_TYPES.has(effect.effect_type)))
    .map((pkg) => pkg.opportunity_id)
);

const previewRows = [];
const packageRows = [];

for (const testCase of testCases) {
  for (const retrofit of testCase.retrofits || []) {
    const preview = retrofit.savingsPreview || null;
    if (!preview) continue;
    previewRows.push({
      sampleUserId: testCase.sampleUserId,
      retrofitTypeId: retrofit.retrofitTypeId,
      status: preview.status,
      opportunityCount: retrofit.opportunityCount || 0,
      packageCount: (preview.incentiveCalculationPackageSummaries || []).length,
      upfrontSavingsCents: preview.upfrontSavingsCents || 0,
      possibleGrantMoneyCents: preview.possibleGrantMoneyCents || 0
    });

    for (const summary of preview.incentiveCalculationPackageSummaries || []) {
      const row = {
        sampleUserId: testCase.sampleUserId,
        sampleName: testCase.name || testCase.sampleUserId,
        retrofitTypeId: retrofit.retrofitTypeId,
        opportunityId: summary.opportunityId,
        programName: summary.programName,
        runtimeInclusionStatus: summary.runtimeInclusionStatus,
        outcomeClass: classifyPackageSummary(summary),
        calculationStatus: summary.calculationStatus,
        sourceStatus: summary.sourceStatus,
        confidence: summary.confidence,
        missingInputs: summary.missingInputs || [],
        defaultedInputs: summary.defaultedInputs || [],
        effectTypes: [...new Set((summary.effectSummaries || []).map((effect) => effect.effectType).filter(Boolean))],
        taxRelated: (summary.effectSummaries || []).some((effect) => TAX_EFFECT_TYPES.has(effect.effectType)),
        grantOrIncentiveRelated: (summary.effectSummaries || []).some(isGrantOrIncentiveEffect),
        hasPositiveComputedAmount: (summary.effectSummaries || []).some((effect) => Number(effect.amountCents || 0) > 0),
        computedAmountCents: sum(summary.effectSummaries || [], (effect) => Number(effect.amountCents || 0)),
        includedInRuntimeTotals: summary.includedInRuntimeTotals === true
      };
      packageRows.push(row);
    }
  }
}

const localTaxRows = testCases.flatMap((testCase) => buildLocalTaxRows(testCase, localTaxWorkflows));
const matchedTaxPackageOpportunityIds = new Set(packageRows.filter((row) => row.taxRelated).map((row) => row.opportunityId));

const report = {
  schemaVersion: "retrofi_test_case_grant_tax_coverage_report.v1",
  generatedAt: new Date().toISOString(),
  sourceFiles: {
    testCases: path.relative(repoRoot, testCasesPath),
    packages: path.relative(repoRoot, packagePath),
    localTaxWorkflows: path.relative(repoRoot, localTaxWorkflowPath)
  },
  summary: {
    testCaseCount: testCases.length,
    retrofitPreviewCount: previewRows.length,
    previewStatusCounts: countBy(previewRows, (row) => row.status),
    matchedV2PackageEvaluationCount: packageRows.length,
    runtimeInclusionStatusCounts: countBy(packageRows, (row) => row.runtimeInclusionStatus),
    outcomeClassCounts: countBy(packageRows, (row) => row.outcomeClass),
    packageEffectTypeCounts: countEffectTypes(packageRows),
    runtimeIncludedPackageCount: packageRows.filter((row) => row.includedInRuntimeTotals).length,
    computedButSuppressedPackageCount: packageRows.filter((row) => row.outcomeClass === "computed_but_suppressed").length,
    missingEvidenceOrInputPackageCount: packageRows.filter((row) => row.outcomeClass === "missing_evidence_or_inputs").length,
    taxOpportunityPackageCountInDatabase: packageTaxOpportunityIds.size,
    taxOpportunityPackageCountMatchedByTestCases: matchedTaxPackageOpportunityIds.size,
    localTaxWorkflowEvaluationCount: localTaxRows.length,
    localTaxWorkflowStatusCounts: countBy(localTaxRows, (row) => row.status)
  },
  topMissingInputs: topCounts(
    packageRows
      .filter((row) => row.outcomeClass === "missing_evidence_or_inputs")
      .flatMap((row) => row.missingInputs.map((input) => input.inputKey))
  ),
  grantAndIncentivePackageOutcomes: summarizeRows(packageRows.filter((row) => row.grantOrIncentiveRelated)),
  taxOpportunityPackageOutcomes: summarizeRows(packageRows.filter((row) => row.taxRelated)),
  unmatchedTaxOpportunityPackages: [...packageTaxOpportunityIds]
    .filter((opportunityId) => !matchedTaxPackageOpportunityIds.has(opportunityId))
    .map((opportunityId) => {
      const pkg = allPackages.find((item) => item.opportunity_id === opportunityId);
      return {
        opportunityId,
        programName: pkg?.program_name || opportunityId,
        calculationStatus: pkg?.calculation_status || null,
        effectTypes: [...new Set((pkg?.effects || []).map((effect) => effect.effect_type))]
      };
    }),
  localTaxWorkflowOutcomes: summarizeLocalTaxRows(localTaxRows),
  sampleRows: {
    missingEvidenceOrInputs: packageRows.filter((row) => row.outcomeClass === "missing_evidence_or_inputs").slice(0, 25),
    computedButSuppressed: packageRows.filter((row) => row.outcomeClass === "computed_but_suppressed").slice(0, 25),
    sourceOrPackageBlocked: packageRows.filter((row) => row.outcomeClass === "source_or_package_blocked").slice(0, 25),
    localTaxNeedsInputOrReview: localTaxRows.filter((row) => row.status !== "calculated").slice(0, 25)
  }
};

fs.writeFileSync(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(markdownReportPath, buildMarkdownReport(report));

console.log(`Wrote grant/tax coverage JSON: ${jsonReportPath}`);
console.log(`Wrote grant/tax coverage report: ${markdownReportPath}`);
console.log(`Matched v2 package evaluations: ${report.summary.matchedV2PackageEvaluationCount}`);
console.log(`Runtime inclusion statuses: ${JSON.stringify(report.summary.runtimeInclusionStatusCounts)}`);
console.log(`Local tax workflow statuses: ${JSON.stringify(report.summary.localTaxWorkflowStatusCounts)}`);

function classifyPackageSummary(summary) {
  if (summary.runtimeInclusionStatus === "included") return "calculated_and_included";
  if (summary.runtimeInclusionStatus === "legacy_rule_preferred") return "legacy_rule_preferred";
  if (summary.runtimeInclusionStatus === "non_monetary_workflow") return "non_monetary_workflow";
  if (BLOCKED_RUNTIME_STATUSES.has(summary.runtimeInclusionStatus)) return "source_or_package_blocked";

  const hasPositiveAmount = (summary.effectSummaries || []).some((effect) => Number(effect.amountCents || 0) > 0);
  if (["not_user_facing_default", "human_review_required", "low_confidence"].includes(summary.runtimeInclusionStatus)) {
    return hasPositiveAmount ? "computed_but_suppressed" : "suppressed_without_amount";
  }

  if (summary.runtimeInclusionStatus === "missing_inputs" || (summary.missingInputs || []).length > 0) return "missing_evidence_or_inputs";

  if (summary.runtimeInclusionStatus === "no_supported_effect_amount") return "calculated_zero_or_no_supported_amount";
  return "other_suppressed";
}

function isGrantOrIncentiveEffect(effect) {
  const cashClass = effect.cashValueClassification || "";
  if (effect.effectType === "grant_expected_value") return true;
  if (["cash_grant", "reimbursement", "rebate"].includes(cashClass)) return true;
  if (effect.effectType === "one_time_savings" || effect.effectType === "recurring_savings") return true;
  return false;
}

function buildLocalTaxRows(testCase, workflows) {
  const geography = inferCoverageGeography(testCase);
  const answers = inferLocalTaxAnswers(testCase);
  const selected = selectLocalTaxWorkflows({ workflows, geography });

  return selected.map((workflow) => {
    const result = calculateLocalTaxWorkflow(workflow, { answers });
    return {
      sampleUserId: testCase.sampleUserId,
      sampleName: testCase.name || testCase.sampleUserId,
      workflowId: workflow.id,
      taxDomain: workflow.taxDomain,
      taxType: workflow.taxType,
      geography,
      status: result.status,
      amountCents: result.amountCents || 0,
      includedInUserFacingTotal: result.includedInUserFacingTotal === true,
      missingInputs: result.missingInputs || [],
      inferredAnswerKeys: Object.entries(answers)
        .filter(([, answer]) => answer.source === "coverage_inferred")
        .map(([key]) => key)
        .sort()
    };
  });
}

function inferCoverageGeography(testCase) {
  const site = testCase.normalizedProfile?.site || {};
  const rawAddress = site.addressStructured?.raw || "";
  const addressParts = rawAddress.split(",").map((part) => part.trim()).filter(Boolean);
  const cityFromRaw = addressParts.length >= 3 ? addressParts[1] : null;
  const jurisdictionCities = (testCase.siteTaxProfile?.jurisdictions || [])
    .flatMap((jurisdiction) => {
      const cityMatch = String(jurisdiction).match(/(?:City of|Town of|Village of)\s+([^,]+)/i);
      return cityMatch ? [cityMatch[1].trim()] : [];
    });
  const cities = unique([site.geo?.placeName, cityFromRaw, ...jurisdictionCities]);

  return {
    country: "US",
    stateCode: site.geo?.stateCode || site.addressStructured?.stateCode || null,
    state: site.geo?.stateCode || site.addressStructured?.stateCode || null,
    countyFips: site.geo?.countyFips || null,
    placeGeoid: site.geo?.placeGeoid || null,
    placeName: site.geo?.placeName || cities[0] || null,
    city: cities[0] || null,
    cities,
    postalCode: site.geo?.zip5 || site.addressStructured?.zip5 || null
  };
}

function inferLocalTaxAnswers(testCase) {
  const answers = {};
  for (const row of [
    ...(testCase.taxProfileFacts || []),
    ...(testCase.taxExtractedValues || []),
    ...(testCase.taxOpportunitySpecificInputs || [])
  ]) {
    const key = row.inputKey || row.input_key || row.fieldId || row.field_id;
    if (!key || row.value === undefined || row.value === null || row.value === "") continue;
    answers[key] = {
      value: row.value,
      source: row.sourceStrategy || row.sourceType || "synthetic_tax_profile"
    };
  }

  addAlias(answers, "annual_taxable_sales_cents", "gross_receipts_cents");
  addAlias(answers, "taxable_gross_receipts_cents", "gross_receipts_cents");
  addAlias(answers, "taxable_room_revenue_cents", "taxable_lodging_receipts_cents");
  addAlias(answers, "taxable_room_revenue_cents", "taxable_rent_cents");
  addAlias(answers, "taxable_room_revenue_cents", "rent_cents");
  addAlias(answers, "annual_property_tax_cents", "annual_property_tax_due_cents");
  addAlias(answers, "annual_real_property_tax_due_cents", "annual_property_tax_due_cents");
  addAlias(answers, "building_square_feet", "business_square_feet");
  addAlias(answers, "leased_square_feet", "business_square_feet");
  addAlias(answers, "building_square_feet", "warehouse_square_feet");
  addAlias(answers, "leased_square_feet", "warehouse_square_feet");

  const buildingTypes = testCase.normalizedProfile?.site?.buildingTypes || [];
  addIfMissing(answers, "local_business_tax_class", inferLocalBusinessTaxClass(buildingTypes), "coverage_inferred");
  addIfMissing(answers, "employee_count", inferEmployeeCount(testCase), "coverage_inferred");
  addIfMissing(answers, "filing_frequency", "annual", "coverage_inferred");
  addIfMissing(answers, "transient_occupancy_indicator", buildingTypes.includes("hospitality_lodging"), "coverage_inferred");
  addIfMissing(answers, "lodging_business_or_short_term_rental_indicator", buildingTypes.includes("hospitality_lodging"), "coverage_inferred");
  addIfMissing(answers, "sb1186_fee_applies", true, "coverage_inferred");
  addIfMissing(answers, "minimum_wage_fee_applies", true, "coverage_inferred");
  addIfMissing(answers, "parcel_count", 1, "coverage_inferred");
  addIfMissing(answers, "accommodation_unit_count", inferAccommodationUnitCount(testCase), "coverage_inferred");

  return answers;
}

function inferLocalBusinessTaxClass(buildingTypes = []) {
  if (buildingTypes.includes("hospitality_lodging")) return "hotel";
  if (buildingTypes.includes("restaurant_foodservice")) return "restaurant";
  if (buildingTypes.includes("retail_storefront") || buildingTypes.includes("grocery_food_retail")) return "retail";
  if (buildingTypes.includes("industrial_manufacturing")) return "manufacturing";
  if (buildingTypes.includes("warehouse_distribution") || buildingTypes.includes("warehouse_logistics")) return "warehouse";
  if (buildingTypes.includes("office_commercial")) return "general_business";
  if (buildingTypes.includes("multifamily_residential")) return "rental_unit_business_tax";
  return "general_business";
}

function inferAccommodationUnitCount(testCase) {
  const buildingTypes = testCase.normalizedProfile?.site?.buildingTypes || [];
  if (!buildingTypes.includes("hospitality_lodging")) return null;
  const squareFeet = Number(testCase.normalizedProfile?.site?.squareFootage?.value || 0);
  if (squareFeet <= 0) return 100;
  return Math.max(20, Math.round(squareFeet / 650));
}

function inferEmployeeCount(testCase) {
  const squareFeet = Number(testCase.normalizedProfile?.site?.squareFootage?.value || 0);
  const buildingTypes = testCase.normalizedProfile?.site?.buildingTypes || [];
  if (buildingTypes.includes("hospitality_lodging")) return Math.max(20, Math.round(squareFeet / 2000));
  if (buildingTypes.includes("restaurant_foodservice")) return Math.max(12, Math.round(squareFeet / 250));
  if (buildingTypes.includes("retail_storefront") || buildingTypes.includes("grocery_food_retail")) {
    return Math.max(10, Math.round(squareFeet / 5000));
  }
  if (buildingTypes.includes("industrial_manufacturing")) return Math.max(50, Math.round(squareFeet / 2500));
  if (squareFeet > 0) return Math.max(5, Math.round(squareFeet / 1500));
  return 10;
}

function addAlias(answers, sourceKey, targetKey) {
  if (answers[targetKey] || !answers[sourceKey]) return;
  answers[targetKey] = {
    value: answers[sourceKey].value,
    source: answers[sourceKey].source || "tax_profile_alias"
  };
}

function addIfMissing(answers, key, value, source) {
  if (answers[key] || value === undefined || value === null || value === "") return;
  answers[key] = { value, source };
}

function summarizeRows(rows) {
  return {
    count: rows.length,
    outcomeClassCounts: countBy(rows, (row) => row.outcomeClass),
    runtimeInclusionStatusCounts: countBy(rows, (row) => row.runtimeInclusionStatus),
    totalComputedAmountCents: sum(rows, (row) => row.computedAmountCents),
    sampleRows: rows.slice(0, 50)
  };
}

function summarizeLocalTaxRows(rows) {
  return {
    count: rows.length,
    statusCounts: countBy(rows, (row) => row.status),
    totalComputedAmountCents: sum(rows, (row) => row.amountCents),
    sampleRows: rows.slice(0, 50)
  };
}

function buildMarkdownReport(data) {
  const missingCount = data.summary.missingEvidenceOrInputPackageCount;
  const matchedTaxCount = data.summary.taxOpportunityPackageCountMatchedByTestCases;
  const totalTaxCount = data.summary.taxOpportunityPackageCountInDatabase;
  const lines = [
    "# Test Case Grant/Tax Estimate Coverage",
    "",
    `Generated: ${data.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Test cases: ${data.summary.testCaseCount}`,
    `- Retrofit previews: ${data.summary.retrofitPreviewCount}`,
    `- Matched v2 package evaluations: ${data.summary.matchedV2PackageEvaluationCount}`,
    `- Runtime-included packages: ${data.summary.runtimeIncludedPackageCount}`,
    `- Computed but suppressed packages: ${data.summary.computedButSuppressedPackageCount}`,
    `- Missing evidence/input packages: ${data.summary.missingEvidenceOrInputPackageCount}`,
    `- Tax opportunity packages in database: ${data.summary.taxOpportunityPackageCountInDatabase}`,
    `- Tax opportunity packages matched by current test cases: ${data.summary.taxOpportunityPackageCountMatchedByTestCases}`,
    `- Local tax workflow evaluations: ${data.summary.localTaxWorkflowEvaluationCount}`,
    "",
    "## Runtime Inclusion Status",
    "",
    tableFromCounts(data.summary.runtimeInclusionStatusCounts),
    "",
    "## Outcome Classes",
    "",
    tableFromCounts(data.summary.outcomeClassCounts),
    "",
    "## Local Tax Workflow Status",
    "",
    tableFromCounts(data.summary.localTaxWorkflowStatusCounts),
    "",
    "## Top Missing Inputs",
    "",
    tableFromPairs(data.topMissingInputs, ["Input", "Count"]),
    "",
    "## Unmatched Tax Opportunity Packages",
    "",
    data.unmatchedTaxOpportunityPackages.length
      ? table(
          ["Opportunity", "Program", "Status", "Effects"],
          data.unmatchedTaxOpportunityPackages.map((row) => [
            row.opportunityId,
            row.programName,
            row.calculationStatus || "",
            row.effectTypes.join(", ")
          ])
        )
      : "All tax opportunity packages were matched by at least one test-case retrofit.",
    "",
    "## Interpretation",
    "",
    matchedTaxCount === 0
      ? `- The current 50 retrofit previews exercise grant/incentive packages, but they do not currently match the ${totalTaxCount} tax opportunity packages.`
      : `- The current 50 retrofit previews now match ${matchedTaxCount} of ${totalTaxCount} tax opportunity packages.`,
    "- Local tax workflows can be selected for some test-case addresses after city inference, but they remain internal-only and are not part of customer-facing savings totals.",
    "- Packages classified as `computed_but_suppressed` have enough runtime inputs to produce an internal amount, but are held out because of low confidence, review flags, or default user-facing inclusion policy.",
    "- Packages classified as `source_or_package_blocked` need source/data repair or intentional archive/suppression decisions, not UI fields.",
    missingCount === 0
      ? "- No packages are currently classified as missing evidence/input repair gaps."
      : "- Remaining missing inputs are mostly competitive expected-value evidence, especially award probability, and are the highest-priority candidates for follow-up data repair."
  ];

  return `${lines.join("\n")}\n`;
}

function countBy(rows, keyFn) {
  return rows.reduce((counts, row) => {
    const key = keyFn(row) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function countEffectTypes(rows) {
  const counts = {};
  for (const row of rows) {
    for (const effectType of row.effectTypes || []) counts[effectType] = (counts[effectType] || 0) + 1;
  }
  return counts;
}

function topCounts(values, limit = 25) {
  return Object.entries(
    values.filter(Boolean).reduce((counts, value) => {
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {})
  )
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

function tableFromCounts(counts) {
  return tableFromPairs(
    Object.entries(counts || {})
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, count })),
    ["Status", "Count"]
  );
}

function tableFromPairs(rows, headers) {
  if (!rows.length) return "_None._";
  return table(headers, rows.map((row) => [row.value, row.count]));
}

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => String(value ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)
  ].join("\n");
}

function sum(rows, valueFn) {
  return rows.reduce((total, row) => total + Number(valueFn(row) || 0), 0);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
