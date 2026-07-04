import fs from "node:fs";
import path from "node:path";
import { buildV2FormInputFields } from "../server/savings/v2InputFieldCatalog.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(repoRoot, "public", "sample_matching_test_cases.json");
const jsonReportPath =
  process.env.GRANT_FORM_INPUT_AUDIT_JSON_PATH || path.join(repoRoot, "data", "grant_form_input_field_audit_2026-07-04.json");
const markdownReportPath =
  process.env.GRANT_FORM_INPUT_AUDIT_MD_PATH || path.join(repoRoot, "data", "grant_form_input_field_audit_2026-07-04.md");

const FORM_INPUT_STATUSES = new Set(["missing_inputs", "needs_quote", "needs_project_scope", "custom_quote_estimate"]);
const TAX_EFFECT_TYPES = new Set(["tax_credit", "tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"]);
const GRANT_CASH_CLASSIFICATIONS = new Set(["cash_grant", "reimbursement", "rebate"]);

const testCasePayload = JSON.parse(fs.readFileSync(testCasesPath, "utf8"));
const rows = [];

for (const testCase of testCasePayload.testCases || []) {
  for (const retrofit of testCase.retrofits || []) {
    for (const summary of retrofit.savingsPreview?.incentiveCalculationPackageSummaries || []) {
      if (!FORM_INPUT_STATUSES.has(summary.runtimeInclusionStatus)) continue;
      const effects = summary.effectSummaries || [];
      if (effects.some((effect) => TAX_EFFECT_TYPES.has(effect.effectType))) continue;
      if (!effects.some(isGrantEstimateEffect)) continue;

      const formInputFields =
        summary.formInputFields?.length
          ? summary.formInputFields
          : buildV2FormInputFields({
              requiredInputs: summary.requiredInputs || [],
              missingInputs: summary.missingInputs || [],
              inputRequirements: []
            });

      rows.push({
        sampleUserId: testCase.sampleUserId,
        sampleName: testCase.name || testCase.sampleUserId,
        retrofitTypeId: retrofit.retrofitTypeId,
        opportunityId: summary.opportunityId,
        programName: summary.programName,
        runtimeInclusionStatus: summary.runtimeInclusionStatus,
        missingInputs: summary.missingInputs || [],
        requiredInputs: summary.requiredInputs || [],
        formInputFields
      });
    }
  }
}

const uniqueOpportunityRows = dedupeBy(rows, (row) => row.opportunityId).map((row) => ({
  opportunityId: row.opportunityId,
  programName: row.programName,
  runtimeInclusionStatus: row.runtimeInclusionStatus,
  evaluationCount: rows.filter((candidate) => candidate.opportunityId === row.opportunityId).length,
  fieldSurfaces: unique(
    rows
      .filter((candidate) => candidate.opportunityId === row.opportunityId)
      .flatMap((candidate) => candidate.formInputFields.map((field) => field.collectionSurfaceLabel || field.collectionSurface))
  ),
  plannedSurfaces: unique(
    rows
      .filter((candidate) => candidate.opportunityId === row.opportunityId)
      .flatMap((candidate) =>
        candidate.formInputFields
          .filter((field) => field.implementationStatus !== "implemented")
          .map((field) => field.collectionSurfaceLabel || field.collectionSurface)
      )
  )
}));

const allFields = rows.flatMap((row) => row.formInputFields.map((field) => ({ ...field, opportunityId: row.opportunityId })));
const report = {
  schemaVersion: "retrofi_grant_form_input_field_audit.v1",
  generatedAt: new Date().toISOString(),
  sourceFiles: {
    testCases: path.relative(repoRoot, testCasesPath)
  },
  summary: {
    formInputRequiredEvaluationCount: rows.length,
    uniqueOpportunityCount: uniqueOpportunityRows.length,
    rowsWithoutMappedFields: rows.filter((row) => row.formInputFields.length === 0).length,
    collectionSurfaceCounts: countBy(allFields, (field) => field.collectionSurfaceLabel || field.collectionSurface),
    implementationStatusCounts: countBy(allFields, (field) => field.implementationStatus || "unknown"),
    plannedSurfaceCounts: countBy(
      allFields.filter((field) => field.implementationStatus !== "implemented"),
      (field) => field.collectionSurfaceLabel || field.collectionSurface
    )
  },
  uniqueOpportunityRows,
  sampleRows: rows.slice(0, 40).map((row) => ({
    sampleUserId: row.sampleUserId,
    retrofitTypeId: row.retrofitTypeId,
    opportunityId: row.opportunityId,
    programName: row.programName,
    runtimeInclusionStatus: row.runtimeInclusionStatus,
    fields: row.formInputFields.map(compactField)
  }))
};

fs.writeFileSync(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(markdownReportPath, buildMarkdown(report));

console.log(`Wrote grant form-input audit JSON: ${jsonReportPath}`);
console.log(`Wrote grant form-input audit report: ${markdownReportPath}`);
console.log(`Form-input evaluations: ${report.summary.formInputRequiredEvaluationCount}`);
console.log(`Rows without mapped fields: ${report.summary.rowsWithoutMappedFields}`);

function isGrantEstimateEffect(effect) {
  return effect.effectType === "grant_expected_value" || GRANT_CASH_CLASSIFICATIONS.has(effect.cashValueClassification || "");
}

function compactField(field) {
  return {
    inputKey: field.inputKey,
    label: field.label,
    collectionSurfaceLabel: field.collectionSurfaceLabel,
    implementationStatus: field.implementationStatus,
    uploadKind: field.uploadKind
  };
}

function buildMarkdown(data) {
  return [
    "# Grant Form Input Field Audit",
    "",
    `Generated: ${data.generatedAt}`,
    "",
    "## Summary",
    "",
    tableFromPairs([
      { label: "Form-input evaluations", value: data.summary.formInputRequiredEvaluationCount },
      { label: "Unique opportunities", value: data.summary.uniqueOpportunityCount },
      { label: "Rows without mapped fields", value: data.summary.rowsWithoutMappedFields }
    ]),
    "",
    "## Collection Surfaces",
    "",
    tableFromCounts(data.summary.collectionSurfaceCounts),
    "",
    "## Implementation Status",
    "",
    tableFromCounts(data.summary.implementationStatusCounts),
    "",
    "## Planned Surfaces",
    "",
    Object.keys(data.summary.plannedSurfaceCounts || {}).length
      ? tableFromCounts(data.summary.plannedSurfaceCounts)
      : "_None._",
    "",
    "## Unique Opportunity Mapping",
    "",
    table(
      ["Opportunity", "Program", "Evaluations", "Mapped surfaces", "Planned surfaces"],
      data.uniqueOpportunityRows.map((row) => [
        row.opportunityId,
        row.programName,
        row.evaluationCount,
        row.fieldSurfaces.join(", ") || "None",
        row.plannedSurfaces.join(", ") || "None"
      ])
    ),
    "",
    "## Interpretation",
    "",
    data.summary.rowsWithoutMappedFields === 0
      ? "- Every form-input-required grant/rebate evaluation maps to at least one collection field."
      : `- ${data.summary.rowsWithoutMappedFields} form-input-required evaluations still lack mapped collection fields.`,
    "- `implemented` means the collection surface already exists in the app/runtime, such as intake/profile fields, retrofit scope fields, or utility bill upload.",
    "- `planned` means the estimate can be gated correctly now, but the dedicated upload/form surface still needs product UI work, usually quote/invoice upload, tax document upload, or program application/award status."
  ].join("\n");
}

function tableFromPairs(rows) {
  return table(["Metric", "Value"], rows.map((row) => [row.label, row.value]));
}

function tableFromCounts(counts) {
  return table(
    ["Value", "Count"],
    Object.entries(counts || {})
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => [value, count])
  );
}

function table(headers, rows) {
  if (!rows.length) return "_None._";
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => String(value ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)
  ].join("\n");
}

function countBy(values, keyFn) {
  return values.reduce((counts, value) => {
    const key = keyFn(value) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function dedupeBy(values, keyFn) {
  const seen = new Set();
  return values.filter((value) => {
    const key = keyFn(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort();
}
