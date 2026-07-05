import fs from "node:fs";
import path from "node:path";
import { validateIncentiveCalculationPackageV2 } from "../apps/api/server/savings/incentiveCalculationsV2.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const packagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const retrofitIndexPath = path.join(repoRoot, "public", "retrofit_opportunity_index.json");
const sampleTestCasesPath = path.join(repoRoot, "public", "sample_matching_test_cases.json");
const reportPath = path.join(repoRoot, "data", "blocked_suppressed_formula_input_repair_report_2026-07-04.md");

const TARGET_REPAIRS = {
  "SOURCE_DSIRE:dsire_program_id:4971": {
    action: "rate_table_from_payload",
    includeInTotals: true,
    reason: "Original GPT Pro repair included a prescriptive Alliant Iowa instant-discount rate table, but the imported v2 package retained a zero placeholder."
  },
  "SOURCE_DSIRE:dsire_program_id:22277": {
    action: "rate_table_from_payload",
    includeInTotals: true,
    reason: "Original GPT Pro repair included Anaheim fleet charging reimbursement rows, but the imported v2 package retained a zero placeholder."
  },
  "SOURCE_DSIRE:dsire_program_id:22275": {
    action: "measure_catalog_from_payload",
    includeInTotals: false,
    reason: "The private/personal EV charger formula is executable, but current test-case matching hits a business sample; keep it suppressed until customer-segment matching is corrected."
  },
  "SOURCE_DSIRE:dsire_program_id:5218": {
    action: "existing_rate_table",
    includeInTotals: true,
    reason: "The Focus on Energy retro-commissioning rate table is already imported; mark the deterministic rebate effect as runtime-eligible."
  },
  "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:controls-program": {
    action: "per_kwh_rate",
    includeInTotals: true,
    rateDollarsPerKwh: 0.12,
    reason: "SVP controls potential incentive is annual kWh savings times $0.02/kWh times six, capped by cost."
  },
  "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate": {
    action: "per_kwh_rate",
    includeInTotals: true,
    rateDollarsPerKwh: 0.15,
    reason: "SVP customer-directed electrification uses annual electric energy savings times $0.15/kWh, capped by measure cost."
  },
  "SOURCE_DSIRE:dsire_program_id:22786": {
    action: "custom_quote_gate",
    includeInTotals: false,
    reason: "Walking Mountains matches a separate Holy Cross Energy solar rebate and is locality-specific; keep quote/geography-gated instead of estimating from the $1,000 cap."
  },
  "SOURCE_DSIRE:dsire_program_id:4656": {
    action: "rate_table_from_payload",
    includeInTotals: true,
    reason: "Original GPT Pro repair included Georgia Power selected rates, but the imported measure catalog was empty."
  },
  "SOURCE_DSIRE:dsire_program_id:1866": {
    action: "existing_rate_table",
    includeInTotals: true,
    reason: "The LADWP lighting kWh-saved rate table is already imported; mark the deterministic rebate effect as runtime-eligible."
  },
  "SOURCE_DSIRE:dsire_program_id:2412": {
    action: "rate_table_from_payload",
    includeInTotals: true,
    reason: "Original GPT Pro repair included Rocky Mountain Power wattsmart rows, but the imported v2 package retained a zero placeholder."
  },
  "SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com": {
    action: "existing_rate_table",
    includeInTotals: true,
    reason: "The SD Energy Edge conservative range table is already imported; mark the deterministic range estimate as runtime-eligible."
  },
  "SOURCE_DSIRE:dsire_program_id:506": {
    action: "rate_table_from_payload",
    includeInTotals: true,
    reason: "Original GPT Pro repair included Hawaii Energy solar water-heater tier rows, but the imported v2 package retained a zero placeholder."
  }
};

const artifact = readJson(packagesPath);
const results = [];
const deleteEdgesByRetrofitId = new Map();

for (const pkg of artifact.packages || []) {
  const config = TARGET_REPAIRS[pkg.opportunity_id];
  if (!config) continue;
  const before = summarizePackage(pkg);
  const result = applyTargetRepair(pkg, config);
  collectDeleteEdges(pkg, deleteEdgesByRetrofitId);
  const validation = validateIncentiveCalculationPackageV2(pkg);
  if (!validation.valid) {
    throw new Error(`Invalid package after repair for ${pkg.opportunity_id}: ${validation.errors.join("; ")}`);
  }
  results.push({
    opportunityId: pkg.opportunity_id,
    programName: pkg.program_name,
    action: config.action,
    includeInTotals: config.includeInTotals,
    reason: config.reason,
    before,
    after: summarizePackage(pkg),
    notes: result.notes
  });
}

if (results.length !== Object.keys(TARGET_REPAIRS).length) {
  const repairedIds = new Set(results.map((result) => result.opportunityId));
  const missingIds = Object.keys(TARGET_REPAIRS).filter((id) => !repairedIds.has(id));
  throw new Error(`Did not find all target packages. Missing: ${missingIds.join(", ")}`);
}

artifact.generatedAt = new Date().toISOString();
artifact.formulaInputAuditRepairAppliedAt = new Date().toISOString();
artifact.formulaInputAuditRepairReport = path.relative(repoRoot, reportPath);
artifact.packages = artifact.packages;
const edgePatch = patchDeletedEdges(deleteEdgesByRetrofitId);

fs.writeFileSync(packagesPath, `${JSON.stringify(artifact, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport(results, edgePatch), "utf8");

console.log(`Applied formula/input audit repairs: ${results.length}`);
console.log(`Public index edge deletions: ${edgePatch.publicIndex.edgeDeletions}`);
console.log(`Sample fixture edge deletions: ${edgePatch.sampleTestCases.edgeDeletions}`);
console.log(`Packages: ${path.relative(repoRoot, packagesPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function applyTargetRepair(pkg, config) {
  const effect = firstMonetaryEffect(pkg);
  if (!effect) return { notes: ["No monetary effect found."] };

  const notes = [];
  normalizeCapPercents(effect);
  effect.repair_metadata ||= {};
  effect.repair_metadata.included_in_user_facing_total_default = Boolean(config.includeInTotals);

  if (config.action === "rate_table_from_payload") {
    const payloadEffect = payloadEffectFor(pkg);
    const rateTable = payloadEffect?.rateTable;
    if (!rateTable?.tableId || !Array.isArray(rateTable.rows) || rateTable.rows.length === 0) {
      throw new Error(`Missing payload rate table for ${pkg.opportunity_id}`);
    }
    const table = buildRateTable(rateTable);
    upsertById(pkg.rate_tables, table, "table_id");
    pkg.measure_catalogs = pkg.measure_catalogs || [];
    effect.calculation = {
      method: "rate_table",
      rate_table_id: table.table_id,
      lookup_inputs: table.dimensions
    };
    notes.push(`Installed rate table ${table.table_id} with ${table.rows.length} rows.`);
  }

  if (config.action === "measure_catalog_from_payload") {
    const payloadEffect = payloadEffectFor(pkg);
    const catalog = payloadEffect?.measureCatalog;
    if (!catalog?.catalogId || !Array.isArray(catalog.rows) || catalog.rows.length === 0) {
      throw new Error(`Missing payload measure catalog for ${pkg.opportunity_id}`);
    }
    const v2Catalog = buildMeasureCatalog(catalog);
    upsertById(pkg.measure_catalogs, v2Catalog, "catalog_id");
    effect.calculation = {
      method: "measure_catalog",
      measure_catalog_id: v2Catalog.catalog_id,
      measure_selection_input: v2Catalog.selection_input
    };
    notes.push(`Installed measure catalog ${v2Catalog.catalog_id} with ${v2Catalog.measures.length} measures.`);
  }

  if (config.action === "existing_rate_table") {
    if (!effect.calculation?.rate_table_id) throw new Error(`Expected existing rate table on ${pkg.opportunity_id}`);
    notes.push(`Kept existing rate table ${effect.calculation.rate_table_id}.`);
  }

  if (config.action === "per_kwh_rate") {
    effect.calculation = {
      method: "per_kwh",
      rate: { amount: { value: config.rateDollarsPerKwh, currency: "USD" }, unit: "kWh" },
      quantity_input: "annual_kwh_savings"
    };
    notes.push(`Converted formula to ${config.rateDollarsPerKwh} dollars per annual kWh saved.`);
  }

  if (config.action === "custom_quote_gate") {
    pkg.calculation_status = "custom_quote_estimate";
    effect.calculation = {
      method: "custom_quote",
      reason: config.reason
    };
    notes.push("Moved package to custom quote/geography gate.");
  }

  pkg.migration_metadata ||= {};
  pkg.migration_metadata.formula_input_audit_repair = {
    appliedAt: new Date().toISOString(),
    action: config.action,
    includeInUserFacingTotalDefault: config.includeInTotals,
    reason: config.reason
  };
  return { notes };
}

function firstMonetaryEffect(pkg) {
  return (pkg.effects || []).find((effect) => effect.effect_type === "one_time_savings" || effect.effect_type === "recurring_savings");
}

function payloadEffectFor(pkg) {
  return pkg.migration_metadata?.repair_payload?.effects?.find((effect) =>
    ["one_time_savings", "recurring_savings"].includes(effect.effectType)
  );
}

function buildRateTable(rateTable) {
  return {
    table_id: safeId(rateTable.tableId),
    name: rateTable.tableId,
    dimensions: (rateTable.dimensions || []).map(safeInputKey),
    rows: rateTable.rows || []
  };
}

function buildMeasureCatalog(catalog) {
  return {
    catalog_id: safeId(catalog.catalogId),
    name: catalog.catalogId,
    selection_input: safeInputKey(catalog.selectionInput || "selected_measures"),
    measures: (catalog.rows || []).map((row, index) => {
      const measureId = safeId(row.category || row.measure || row.name || `measure_${index + 1}`);
      return {
        measure_id: measureId,
        name: row.category || row.measure || row.name || measureId,
        category: row.category || null,
        customer_filters: [],
        equipment_filters: [],
        calculation: measureCalculation(row),
        limits: [],
        required_inputs: [],
        evidence_refs: [],
        confidence: { overall: 0.72, calculation: 0.72, extraction: 0.72, reason_codes: ["formula_input_audit_measure_row"] },
        source_row: row
      };
    })
  };
}

function measureCalculation(row) {
  if (Number.isFinite(row.amountCents)) return { method: "fixed_amount", amount: centsToMoney(row.amountCents) };
  if (Number.isFinite(row.minAmountCents)) return { method: "fixed_amount", amount: centsToMoney(row.minAmountCents) };
  if (Number.isFinite(row.rateCents)) return { method: "per_unit", rate: { amount: centsToMoney(row.rateCents), unit: row.unit || row.rateUnit || "unit" } };
  if (Number.isFinite(row.percent)) return { method: "percent_of_cost", percent: normalizePercent(row.percent), cost_input: "eligible_project_cost_cents" };
  return { method: "zero_when_not_applicable", reason: "Measure row requires custom interpretation.", source_row: row };
}

function normalizeCapPercents(effect) {
  for (const cap of effect.caps || []) {
    if (cap.cap_type === "maximum_percent_of_cost" && Number.isFinite(cap.percent)) {
      cap.percent = normalizePercent(cap.percent);
    }
  }
}

function summarizePackage(pkg) {
  const effect = firstMonetaryEffect(pkg);
  return {
    calculationStatus: pkg.calculation_status,
    calculationMethod: effect?.calculation?.method || null,
    rateTableId: effect?.calculation?.rate_table_id || null,
    measureCatalogId: effect?.calculation?.measure_catalog_id || null,
    includedInUserFacingTotalDefault: effect?.repair_metadata?.included_in_user_facing_total_default === true,
    rateTableCount: (pkg.rate_tables || []).length,
    measureCatalogCount: (pkg.measure_catalogs || []).length
  };
}

function collectDeleteEdges(pkg, deleteEdgesByRetrofitId) {
  for (const edge of pkg.migration_metadata?.repair_payload?.edgeActions || []) {
    if (edge.action !== "delete_bad_edge" || !edge.retrofitTypeId) continue;
    const deleteIds = deleteEdgesByRetrofitId.get(edge.retrofitTypeId) || new Set();
    deleteIds.add(pkg.opportunity_id);
    deleteEdgesByRetrofitId.set(edge.retrofitTypeId, deleteIds);
  }
}

function patchDeletedEdges(deleteEdgesByRetrofitId) {
  const publicIndex = readJson(retrofitIndexPath);
  const sampleTestCases = readJson(sampleTestCasesPath);
  const publicIndexStats = patchRetrofitIndex(publicIndex, deleteEdgesByRetrofitId);
  const sampleStats = patchSampleTestCases(sampleTestCases, deleteEdgesByRetrofitId);
  fs.writeFileSync(retrofitIndexPath, `${JSON.stringify(publicIndex, null, 2)}\n`);
  fs.writeFileSync(sampleTestCasesPath, `${JSON.stringify(sampleTestCases, null, 2)}\n`);
  return { publicIndex: publicIndexStats, sampleTestCases: sampleStats };
}

function patchRetrofitIndex(index, deleteEdgesByRetrofitId) {
  const stats = { edgeDeletions: 0 };
  for (const retrofit of index.retrofits || []) {
    const deleteIds = deleteEdgesByRetrofitId.get(retrofit.retrofitTypeId);
    if (!deleteIds?.size) continue;
    const before = retrofit.opportunities?.length || 0;
    retrofit.opportunities = (retrofit.opportunities || []).filter((opportunity) => !deleteIds.has(opportunity.opportunityId));
    stats.edgeDeletions += before - retrofit.opportunities.length;
    retrofit.opportunityCount = retrofit.opportunities.length;
  }
  index.opportunityCount = uniqueOpportunityCount(index.retrofits || []);
  index.formulaInputAuditRepairAppliedAt = new Date().toISOString();
  index.formulaInputAuditEdgeDeletionsAppliedThisRun = stats.edgeDeletions;
  return stats;
}

function patchSampleTestCases(source, deleteEdgesByRetrofitId) {
  const stats = { edgeDeletions: 0 };
  for (const testCase of source.testCases || []) {
    for (const retrofit of testCase.retrofits || []) {
      const deleteIds = deleteEdgesByRetrofitId.get(retrofit.retrofitTypeId);
      if (!deleteIds?.size) continue;
      const before = retrofit.opportunities?.length || 0;
      retrofit.opportunities = (retrofit.opportunities || []).filter((opportunity) => !deleteIds.has(opportunity.opportunityId));
      stats.edgeDeletions += before - retrofit.opportunities.length;
      retrofit.opportunityCount = retrofit.opportunities.length;
      if (retrofit.savingsPreview) retrofit.savingsPreview.opportunityCount = retrofit.opportunities.length;
    }
    testCase.topResults = (testCase.topResults || [])
      .map((opportunity) => stripDeletedRetrofitsFromTopResult(opportunity, deleteEdgesByRetrofitId))
      .filter((opportunity) => (opportunity.retrofitTypeIds || []).length > 0);
  }
  source.formulaInputAuditRepairAppliedAt = new Date().toISOString();
  source.formulaInputAuditEdgeDeletionsAppliedThisRun = stats.edgeDeletions;
  source.opportunityCount = uniqueOpportunityCount((source.testCases || []).flatMap((testCase) => testCase.retrofits || []));
  return stats;
}

function stripDeletedRetrofitsFromTopResult(opportunity, deleteEdgesByRetrofitId) {
  const deletedRetrofitIds = new Set();
  for (const [retrofitTypeId, opportunityIds] of deleteEdgesByRetrofitId.entries()) {
    if (opportunityIds.has(opportunity.opportunityId)) deletedRetrofitIds.add(retrofitTypeId);
  }
  if (!deletedRetrofitIds.size) return opportunity;
  return {
    ...opportunity,
    retrofitTypeIds: (opportunity.retrofitTypeIds || []).filter((id) => !deletedRetrofitIds.has(id)),
    retrofitTypes: (opportunity.retrofitTypes || []).filter((retrofit) => !deletedRetrofitIds.has(retrofit.retrofitTypeId))
  };
}

function uniqueOpportunityCount(retrofits) {
  return new Set((retrofits || []).flatMap((retrofit) => (retrofit.opportunities || []).map((opportunity) => opportunity.opportunityId))).size;
}

function buildReport(results, edgePatch) {
  const lines = [];
  lines.push("# Blocked/Suppressed Formula Input Repair Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Target packages repaired: ${results.length}`);
  lines.push(`- Runtime-included after repair: ${results.filter((result) => result.includeInTotals).length}`);
  lines.push(`- Intentionally gated after repair: ${results.filter((result) => !result.includeInTotals).length}`);
  lines.push(`- Public index bad edges deleted: ${edgePatch.publicIndex.edgeDeletions}`);
  lines.push(`- Sample fixture bad edges deleted: ${edgePatch.sampleTestCases.edgeDeletions}`);
  lines.push("");
  lines.push("## Repairs");
  lines.push("");
  lines.push(table(
    ["Program", "Action", "Included", "Before", "After", "Reason"],
    results.map((result) => [
      `${result.programName} (${result.opportunityId})`,
      result.action,
      result.includeInTotals ? "yes" : "no",
      `${result.before.calculationStatus}/${result.before.calculationMethod}/${result.before.includedInUserFacingTotalDefault ? "included" : "not-included"}`,
      `${result.after.calculationStatus}/${result.after.calculationMethod}/${result.after.includedInUserFacingTotalDefault ? "included" : "not-included"}`,
      result.reason
    ])
  ));
  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push("- Anaheim Personal EV Charger remains suppressed because the current matching path hits a business sample; this needs customer-segment/edge correction rather than a forced customer-facing estimate.");
  lines.push("- Eagle County Walking Mountains solar remains custom/geography gated because the source-backed amount depends on the separate Holy Cross Energy rebate and local eligibility.");
  lines.push("- Runtime support was added separately for conservative rate-table row shapes used by these repaired packages.");
  return `${lines.join("\n")}\n`;
}

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => String(value ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)
  ].join("\n");
}

function upsertById(values, nextValue, key) {
  values ||= [];
  const index = values.findIndex((value) => value?.[key] === nextValue[key]);
  if (index >= 0) values[index] = nextValue;
  else values.push(nextValue);
}

function safeId(value) {
  return String(value || "unknown")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function safeInputKey(value) {
  return safeId(value);
}

function centsToMoney(cents) {
  return { value: Number(cents || 0) / 100, currency: "USD" };
}

function normalizePercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return number > 1 ? number / 100 : number;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
