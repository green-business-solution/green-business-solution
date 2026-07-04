import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const CURRENT_DATE = "2026-07-04";
const packagesPath =
  process.env.OPPORTUNITY_INCENTIVE_CALCULATION_PACKAGES_PATH ||
  path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const coveragePath =
  process.env.GRANT_TAX_COVERAGE_JSON_PATH ||
  path.join(repoRoot, "data", "test_case_grant_tax_estimate_coverage_report_2026-07-03.json");
const jsonReportPath =
  process.env.INCENTIVE_CLASSIFICATION_AUDIT_JSON_PATH ||
  path.join(repoRoot, "data", `incentive_classification_audit_${CURRENT_DATE}.json`);
const markdownReportPath =
  process.env.INCENTIVE_CLASSIFICATION_AUDIT_MD_PATH ||
  path.join(repoRoot, "data", `incentive_classification_audit_${CURRENT_DATE}.md`);

const TAX_EFFECT_TYPES = new Set(["tax_credit", "tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"]);
const GRANT_REBATE_CASH_CLASSES = new Set(["cash_grant", "reimbursement", "rebate"]);
const NON_CASH_CLASSES = new Set(["loan", "financing", "technical_assistance", "tax_credit", "tariff_or_rate"]);
const MONETARY_EFFECT_TYPES = new Set([
  "one_time_savings",
  "recurring_savings",
  "recurring_expense",
  "grant_expected_value",
  "financing_subsidy",
  ...TAX_EFFECT_TYPES
]);

const packagePayload = readJson(packagesPath);
const coveragePayload = fs.existsSync(coveragePath) ? readJson(coveragePath) : null;
const packages = packagePayload.packages || [];

const packageRows = packages.map(auditPackage);
const issueRows = packageRows.flatMap((row) =>
  row.issues.map((issue) => ({
    ...issue,
    opportunityId: row.opportunityId,
    programName: row.programName,
    packageKind: row.packageKind,
    calculationStatus: row.calculationStatus,
    cashClasses: row.cashClasses,
    effectTypes: row.effectTypes,
    valueModelKinds: row.valueModelKinds
  }))
);
const criticalIssues = issueRows.filter((issue) => issue.severity === "critical");
const warningIssues = issueRows.filter((issue) => issue.severity === "warning");
const infoIssues = issueRows.filter((issue) => issue.severity === "info");
const coverageActions = coveragePayload?.summary?.grantProductionActionCounts || {};

const report = {
  schemaVersion: "retrofi_incentive_classification_audit.v1",
  generatedAt: new Date().toISOString(),
  sourceFiles: {
    packages: path.relative(repoRoot, packagesPath),
    coverage: fs.existsSync(coveragePath) ? path.relative(repoRoot, coveragePath) : null
  },
  packageCount: packages.length,
  packageKindCounts: countBy(packageRows, (row) => row.packageKind),
  calculationStatusCounts: countBy(packageRows, (row) => row.calculationStatus || "unknown"),
  cashClassCounts: countMany(packageRows, (row) => row.cashClasses.length ? row.cashClasses : ["missing"]),
  valueModelKindCounts: countMany(packageRows, (row) => row.valueModelKinds.length ? row.valueModelKinds : ["missing"]),
  issueCounts: countBy(issueRows, (row) => row.issueCode),
  issueSeverityCounts: countBy(issueRows, (row) => row.severity),
  coverageGrantProductionActionCounts: coverageActions,
  criticalIssueCount: criticalIssues.length,
  warningIssueCount: warningIssues.length,
  infoIssueCount: infoIssues.length,
  criticalIssues: criticalIssues.slice(0, 200),
  warningIssueSamples: warningIssues.slice(0, 200),
  packageRows: packageRows.map(({ issues, ...row }) => ({
    ...row,
    issueCodes: issues.map((issue) => issue.issueCode)
  }))
};

writeJson(jsonReportPath, report);
fs.writeFileSync(markdownReportPath, buildMarkdown(report), "utf8");

console.log(`Wrote incentive classification audit JSON: ${jsonReportPath}`);
console.log(`Wrote incentive classification audit report: ${markdownReportPath}`);
console.log(`Packages audited: ${report.packageCount}`);
console.log(`Critical issues: ${report.criticalIssueCount}`);
console.log(`Warnings: ${report.warningIssueCount}`);
console.log(`Info notes: ${report.infoIssueCount}`);

function auditPackage(pkg) {
  const effects = pkg.effects || [];
  const cashClasses = unique(
    effects.flatMap((effect) => [
      effect.repair_metadata?.cash_value_classification,
      effect.calculation?.cash_value_classification
    ])
  );
  const valueModelKinds = unique(
    effects.flatMap((effect) => [
      effect.repair_metadata?.value_model_kind,
      effect.calculation?.grant_value_model_kind
    ])
  );
  const effectTypes = unique(effects.map((effect) => effect.effect_type));
  const lowerName = String(pkg.program_name || "").toLowerCase();
  const lowerEffectText = effects
    .map((effect) => `${effect.label || ""} ${effect.repair_metadata?.value_model_kind || ""} ${effect.calculation?.grant_value_model_kind || ""}`)
    .join(" ")
    .toLowerCase();
  const hasTaxEffect = effectTypes.some((type) => TAX_EFFECT_TYPES.has(type));
  const hasGrantExpectedEffect = effectTypes.includes("grant_expected_value");
  const hasGrantRebateCashClass = cashClasses.some((cashClass) => GRANT_REBATE_CASH_CLASSES.has(cashClass));
  const hasNonCashClass = cashClasses.some((cashClass) => NON_CASH_CLASSES.has(cashClass));
  const hasMonetaryEffect = effectTypes.some((type) => MONETARY_EFFECT_TYPES.has(type));
  const packageKind = classifyPackageKind({ lowerName, effectTypes, cashClasses, valueModelKinds, hasTaxEffect, hasGrantExpectedEffect });
  const issues = [];

  if (hasMonetaryEffect && cashClasses.length === 0 && !hasTaxEffect) {
    issues.push(issue("missing_cash_value_classification", "warning", "Monetary package has no cash value classification."));
  }
  if (
    /\b(rebate|discount)\b/.test(lowerName) &&
    !cashClasses.includes("rebate") &&
    !cashClasses.includes("reimbursement") &&
    !(cashClasses.includes("cash_grant") && /\bgrant\b/.test(lowerEffectText)) &&
    hasGrantRebateCashClass
  ) {
    issues.push(issue("rebate_named_program_not_classified_as_rebate", "warning", "Program name reads as a rebate/discount but cash class is not rebate."));
  }
  if (/\b(loan|financ|lease)\b/.test(lowerName) && hasGrantRebateCashClass) {
    issues.push(issue("financing_named_program_classified_as_cash_incentive", "critical", "Program name reads as financing but is classified as grant/rebate/reimbursement."));
  }
  if (looksLikeTaxProgramName(lowerName) && !hasTaxEffect && hasGrantRebateCashClass) {
    issues.push(issue("tax_named_program_classified_as_cash_incentive", "critical", "Program name reads as tax but is classified as grant/rebate/reimbursement."));
  }
  if (/\b(feed[-\s]?in|tariff|rate)\b/.test(lowerName) && hasGrantExpectedEffect) {
    issues.push(issue("rate_or_tariff_program_in_grant_expected_value_effect", "warning", "Tariff/rate program has a grant expected-value effect."));
  }
  if (hasTaxEffect && cashClasses.some((cashClass) => GRANT_REBATE_CASH_CLASSES.has(cashClass))) {
    issues.push(issue("tax_effect_with_grant_rebate_cash_classification", "critical", "Tax effect carries grant/rebate cash classification."));
  }
  if (hasNonCashClass && hasGrantRebateCashClass) {
    issues.push(issue("mixed_cash_and_non_cash_classifications", "info", "Package mixes cash incentive and non-cash/financing classifications."));
  }

  for (const effect of effects) {
    const actionRepair = effect.repair_metadata?.grant_production_action_repair;
    if (
      actionRepair?.recommended_action === "include_deterministic_estimate" &&
      actionRepair?.formula_repair?.status === "needs_user_input" &&
      actionRepair?.estimate_status === "deterministic_estimate"
    ) {
      issues.push(
        issue(
          "deterministic_repair_should_be_form_gated",
          "warning",
          "Deterministic repair still advertises deterministic_estimate even though formula inputs are user/project-gated."
        )
      );
    }
  }

  return {
    opportunityId: pkg.opportunity_id,
    programName: pkg.program_name || pkg.opportunity_id,
    calculationStatus: pkg.calculation_status,
    packageKind,
    cashClasses,
    valueModelKinds,
    effectTypes,
    issueCount: issues.length,
    issues
  };
}

function classifyPackageKind({ lowerName, effectTypes, cashClasses, valueModelKinds, hasTaxEffect, hasGrantExpectedEffect }) {
  if (valueModelKinds.includes("source_inaccessible")) return "source_inaccessible";
  if (hasTaxEffect || cashClasses.includes("tax_credit")) return "tax";
  if (cashClasses.includes("rebate")) return "rebate";
  if (cashClasses.includes("cash_grant") || cashClasses.includes("reimbursement") || hasGrantExpectedEffect) return "grant_or_reimbursement";
  if (cashClasses.includes("loan") || cashClasses.includes("financing") || effectTypes.includes("financing_subsidy")) return "financing";
  if (cashClasses.includes("tariff_or_rate") || /\b(feed[-\s]?in|tariff|rate)\b/.test(lowerName)) return "tariff_or_rate";
  if (cashClasses.includes("technical_assistance") || effectTypes.includes("process_value") || effectTypes.includes("no_cash_value")) return "non_cash_or_process";
  return "unknown_or_uncategorized";
}

function looksLikeTaxProgramName(lowerName) {
  if (/\b(tax|abatement|exemption)\b/.test(lowerName)) return true;
  if (!/\bcredit\b/.test(lowerName)) return false;
  return !/\b(bill credit|efficiency credit|rebate|energy|electric vehicle| ev |charging|purchase bill credit|pev bill credit)\b/.test(
    ` ${lowerName} `
  );
}

function issue(issueCode, severity, message) {
  return { issueCode, severity, message };
}

function buildMarkdown(data) {
  const lines = [];
  lines.push("# Incentive Classification Audit");
  lines.push("");
  lines.push(`Generated: ${data.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Packages audited: ${data.packageCount}`);
  lines.push(`- Critical classification issues: ${data.criticalIssueCount}`);
  lines.push(`- Warning classification issues: ${data.warningIssueCount}`);
  lines.push(`- Informational mixed-classification notes: ${data.infoIssueCount}`);
  lines.push("");
  lines.push("## Package Kinds");
  lines.push("");
  lines.push(tableFromCounts(data.packageKindCounts));
  lines.push("");
  lines.push("## Issue Counts");
  lines.push("");
  lines.push(tableFromCounts(data.issueCounts));
  lines.push("");
  lines.push("## Coverage Action Counts");
  lines.push("");
  lines.push(tableFromCounts(data.coverageGrantProductionActionCounts));
  lines.push("");
  lines.push("## Critical Issues");
  lines.push("");
  lines.push(issueTable(data.criticalIssues));
  lines.push("");
  lines.push("## Warning Samples");
  lines.push("");
  lines.push(issueTable(data.warningIssueSamples.slice(0, 40)));
  return `${lines.join("\n").replace(/\n+$/g, "")}\n`;
}

function issueTable(rows) {
  if (!rows.length) return "_None._";
  return table(
    ["Issue", "Opportunity", "Program", "Kind", "Cash classes"],
    rows.map((row) => [
      row.issueCode,
      row.opportunityId,
      row.programName,
      row.packageKind,
      row.cashClasses.join(", ") || "missing"
    ])
  );
}

function tableFromCounts(counts) {
  const rows = Object.entries(counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (!rows.length) return "_None._";
  return table(["Value", "Count"], rows);
}

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => String(value ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)
  ].join("\n");
}

function countBy(rows, keyFn) {
  return rows.reduce((counts, row) => {
    const key = keyFn(row) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function countMany(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    for (const key of keyFn(row)) counts[key || "unknown"] = (counts[key || "unknown"] || 0) + 1;
  }
  return counts;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
