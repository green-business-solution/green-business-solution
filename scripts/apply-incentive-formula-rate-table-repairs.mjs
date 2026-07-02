import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { validateIncentiveCalculationPackageV2 } from "../server/savings/incentiveCalculationsV2.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultRepairsPath = path.join(
  repoRoot,
  "data",
  "incentive_formula_rate_table_research_repairs_gpt_pro_2026-07-02_batches_1_50.json"
);
const batchId = "incentive_formula_rate_table_gpt_pro_2026-07-02_batches_1_50";

const options = parseArgs(process.argv.slice(2));
const repairsArtifact = readJson(options.repairsPath);
const rulesSource = readJson(options.rulesPath);
const repairs = repairsArtifact.repairs || [];
const repairedOpportunityIds = new Set(repairs.map((repair) => repair.opportunityId).filter(Boolean));
const previousRules = rulesSource.rules || [];
const previousReviewedRows = rulesSource.researchReviewedNoRule || [];
const previousContextByOpportunityId = buildPreviousContext(previousRules, previousReviewedRows);

const packages = repairs.map(buildCalculationPackage);
const packageValidation = validatePackages(packages);
if (packageValidation.invalidCount > 0) {
  throw new Error(`Generated invalid v2 calculation packages: ${JSON.stringify(packageValidation.invalidSamples, null, 2)}`);
}

const legacyBuildResults = repairs.flatMap((repair) =>
  (repair.effects || []).map((effect, effectIndex) => buildLegacyRule(repair, effect, effectIndex))
);
const generatedLegacyRules = legacyBuildResults.filter((row) => row.rule).map((row) => row.rule);
const skippedLegacyRows = legacyBuildResults.filter((row) => !row.rule);
const generatedRuleOpportunityIds = new Set(generatedLegacyRules.map((rule) => rule.opportunityId));
const existingRules = previousRules.filter((rule) => !repairedOpportunityIds.has(rule.opportunityId));
const existingReviewedRows = previousReviewedRows.filter((row) => !repairedOpportunityIds.has(row.opportunityId));
const reviewedRows = repairs
  .filter((repair) => !generatedRuleOpportunityIds.has(repair.opportunityId))
  .map((repair) => buildReviewedRow(repair, skippedLegacyRows));
const rules = [...existingRules, ...generatedLegacyRules];
const researchReviewedNoRule = [...existingReviewedRows, ...reviewedRows];
const appliedResearchBatches = [
  ...(rulesSource.appliedResearchBatches || []).filter((batch) => batch.batchId !== batchId),
  {
    batchId,
    appliedAt: new Date().toISOString(),
    repairsPath: path.relative(repoRoot, options.repairsPath),
    ruleCount: generatedLegacyRules.length,
    reviewedNoRuleCount: reviewedRows.length,
    reviewedOpportunityCount: repairedOpportunityIds.size,
    calculationPackageCount: packages.length
  }
];

const outputRules = {
  ...rulesSource,
  generatedAt: new Date().toISOString(),
  formulaRateTableRepairAppliedAt: new Date().toISOString(),
  formulaRateTableRepairArtifact: path.relative(repoRoot, options.repairsPath),
  formulaRateTableCalculationPackagePath: path.relative(repoRoot, options.packagesPath),
  formulaRateTableReviewedOpportunityCount: repairedOpportunityIds.size,
  formulaRateTableLegacyRuleCount: generatedLegacyRules.length,
  formulaRateTableV2PackageCount: packages.length,
  formulaRateTableSkippedLegacyRuleCount: skippedLegacyRows.length,
  repairedThisRunCount: generatedLegacyRules.length,
  manualThisRunCount: 0,
  repairedRuleCount: rules.length,
  manualRepairTargetCount: rulesSource.manualRepairTargetCount || 0,
  researchReviewedNoRuleCount: researchReviewedNoRule.length,
  appliedResearchBatches,
  lastResearchRepairBatch: appliedResearchBatches.at(-1),
  ruleExtractionCounts: countBy(rules, (rule) => rule.extractionMethod || "unknown"),
  ruleConfidenceCounts: countBy(rules, (rule) => rule.confidence || "unknown"),
  researchNoRuleStatusCounts: countBy(researchReviewedNoRule, (row) => row.repairStatus || "unknown"),
  rules,
  researchReviewedNoRule
};

const packagesArtifact = {
  schemaVersion: "opportunity-incentive-calculation-packages-v2",
  generatedAt: new Date().toISOString(),
  sourceArtifact: path.relative(repoRoot, options.repairsPath),
  sourceBatchId: batchId,
  packageCount: packages.length,
  statusCounts: countBy(packages, (pkg) => pkg.calculation_status || "unknown"),
  confidenceCounts: countBy(packages, (pkg) => confidenceLabel(pkg.confidence?.overall)),
  packages
};

const publicPatch = patchPublicFixtures({
  repairs,
  indexPath: options.retrofitIndexPath,
  testCasesPath: options.sampleTestCasesPath,
  ruleCount: generatedLegacyRules.length,
  packageCount: packages.length
});

fs.writeFileSync(options.rulesPath, `${JSON.stringify(outputRules, null, 2)}\n`);
fs.writeFileSync(options.packagesPath, `${JSON.stringify(packagesArtifact, null, 2)}\n`);
fs.writeFileSync(options.reportPath, buildReport({
  generatedLegacyRules,
  packageValidation,
  packagesArtifact,
  publicPatch,
  repairs,
  reviewedRows,
  skippedLegacyRows
}), "utf8");

console.log("Applied incentive formula/rate-table repairs.");
console.log(`Reviewed opportunities: ${repairedOpportunityIds.size}`);
console.log(`Legacy runtime rules generated: ${generatedLegacyRules.length}`);
console.log(`V2 calculation packages generated: ${packages.length}`);
console.log(`Public edge deletions tracked: ${publicPatch.publicIndex.totalEdgeDeletionCount}`);
console.log(`Sample fixture edge deletions tracked: ${publicPatch.sampleTestCases.totalEdgeDeletionCount}`);
console.log(`Rules: ${path.relative(repoRoot, options.rulesPath)}`);
console.log(`Packages: ${path.relative(repoRoot, options.packagesPath)}`);
console.log(`Report: ${path.relative(repoRoot, options.reportPath)}`);

function buildCalculationPackage(repair) {
  const evidenceId = `evidence_${shortHash(repair.opportunityId)}`;
  const rateTables = [];
  const measureCatalogs = [];
  const effects = (repair.effects || []).map((effect, effectIndex) => {
    const effectId = `effect_${safeId(effect.effectType || "effect")}_${effectIndex + 1}_${shortHash(`${repair.opportunityId}|${effectIndex}`)}`;
    const calculation = buildV2Calculation({ repair, effect, effectId, effectIndex, rateTables, measureCatalogs });
    return {
      effect_id: effectId,
      label: effect.formulaText || repair.opportunityName || repair.opportunityId,
      effect_type: normalizeEffectType(effect.effectType),
      cash_flow_direction: effect.effectType === "recurring_expense" ? "cost" : "benefit",
      timing: buildV2Timing(effect, repair),
      calculation,
      limits: buildV2Limits(effect),
      caps: buildV2Caps(effect),
      required_inputs: buildV2InputRequirements(effect, effectId),
      evidence_refs: [evidenceId],
      confidence: {
        overall: confidenceNumber(combinedConfidence(repair)),
        calculation: confidenceNumber(repair.estimateConfidence),
        extraction: confidenceNumber(repair.sourceConfidence),
        reason_codes: reasonCodesForEffect(repair, effect)
      },
      repair_metadata: {
        repair_status: repair.repairStatus,
        calculation_status: repair.calculationStatus,
        value_model_kind: effect.valueModelKind,
        cash_value_classification: effect.cashValueClassification,
        included_in_user_facing_total_default: Boolean(effect.includedInUserFacingTotalDefault),
        human_review_required: Boolean(repair.humanReviewRequired),
        human_review_reasons: repair.humanReviewReasons || []
      }
    };
  });

  return {
    schema_version: "2.0.0",
    opportunity_id: repair.opportunityId,
    program_name: repair.opportunityName || repair.opportunityId,
    calculation_status: normalizeCalculationStatus(repair.calculationStatus, repair.repairStatus),
    availability: {
      status: repair.repairStatus === "unavailable_archive" ? "closed" : "active",
      source_access_status: repair.repairStatus === "source_inaccessible" ? "inaccessible" : "accessible_or_researched"
    },
    customer_segments: [],
    retrofit_types: uniqueStrings((repair.edgeActions || []).filter((edge) => edge.action === "keep").map((edge) => edge.retrofitTypeId)),
    geography: { country: "US", states: [], counties: [], cities: [], utility_territory_required: false },
    measure_catalogs: measureCatalogs,
    rate_tables: rateTables,
    effects,
    global_limits: [],
    global_caps: [],
    stacking: {
      behavior: "unknown_requires_review",
      stackable_with_rebates: repair.stackingRules?.stackableWithRebates ?? null,
      stackable_with_tax_credits: repair.stackingRules?.stackableWithTaxCredits ?? null,
      must_deduct_other_incentives_from_eligible_cost: repair.stackingRules?.mustDeductOtherIncentivesFromEligibleCost ?? null,
      notes: repair.stackingRules?.notes || ""
    },
    input_requirements: dedupeInputRequirements(effects.flatMap((effect) => effect.required_inputs || [])),
    assumptions: [],
    source_evidence: [
      {
        evidence_id: evidenceId,
        source_type: "gpt_pro_research_summary",
        quote: repair.evidenceText || repair.reasoningNotes || repair.opportunityName || repair.opportunityId,
        source_urls: repair.sourceUrlsChecked || [],
        evidence_confidence: confidenceNumber(repair.sourceConfidence)
      }
    ],
    confidence: {
      overall: confidenceNumber(combinedConfidence(repair)),
      source_access: confidenceNumber(repair.sourceConfidence),
      availability: repair.repairStatus === "source_inaccessible" ? 0.35 : confidenceNumber(repair.sourceConfidence),
      calculation: confidenceNumber(repair.estimateConfidence),
      extraction: confidenceNumber(repair.sourceConfidence),
      reason_codes: reasonCodesForRepair(repair)
    },
    migration_metadata: {
      source: "gpt_pro_incentive_formula_rate_table_repair",
      source_batch_id: batchId,
      source_research_batch_number: repair.researchBatchNumber || null,
      source_output_path: repair.workPacketOutputPath || null,
      edge_actions: repair.edgeActions || [],
      repair_payload: repair
    }
  };
}

function buildV2Calculation({ repair, effect, effectId, effectIndex, rateTables, measureCatalogs }) {
  const kind = effect.valueModelKind || "no_calculable_value";
  if (kind === "fixed_amount" || kind === "fixed_tier_amount") {
    if (Number.isFinite(effect.amountCents)) return { method: "fixed_amount", amount: centsToMoney(effect.amountCents) };
  }
  if (kind === "per_unit_award" && finiteAmountCentsForPerUnit(effect) !== null) {
    return {
      method: "per_unit",
      rate: { amount: centsToMoney(finiteAmountCentsForPerUnit(effect)), unit: effect.rateUnit || "unit" },
      quantity_input: deriveQuantityInput(effect) || "unit_count"
    };
  }
  if (kind === "percent_of_eligible_cost" || kind === "capped_percent_of_eligible_cost") {
    const percent = finitePercent(effect);
    if (percent !== null) return { method: "percent_of_cost", percent, cost_input: "eligible_project_cost_cents" };
  }
  if (kind === "measure_catalog" && effect.measureCatalog?.catalogId) {
    const catalog = buildV2MeasureCatalog(effect);
    measureCatalogs.push(catalog);
    return {
      method: "measure_catalog",
      measure_catalog_id: catalog.catalog_id,
      measure_selection_input: catalog.selection_input
    };
  }
  if ((kind === "rate_table" || kind === "hybrid_rate_plus_cap" || kind === "tariff_or_rate" || kind === "formula_grant") && effect.rateTable?.tableId) {
    const table = buildV2RateTable(effect);
    rateTables.push(table);
    return { method: "rate_table", rate_table_id: table.table_id, lookup_inputs: table.dimensions };
  }
  if (kind === "competitive_cost_share" || kind === "competitive_award_range" || kind === "competitive_max_only") {
    return {
      method: "expected_value",
      probability_discount: effect.probabilityModel?.probabilityDiscount ?? null,
      conditional_award_cents: effect.amountCents ?? effect.minAmountCents ?? null,
      max_award_cents: effect.maxAmountCents ?? effect.caps?.maxAwardCents ?? null
    };
  }
  if (kind === "custom_quote") return { method: "custom_quote", reason: "Project-specific quote or program review required." };
  return {
    method: "zero_when_not_applicable",
    reason: `${kind} is not included in automated totals without additional estimator support.`,
    source_effect_id: `${repair.opportunityId}:${effectIndex}:${effectId}`
  };
}

function buildV2MeasureCatalog(effect) {
  const catalogId = safeId(effect.measureCatalog.catalogId);
  return {
    catalog_id: catalogId,
    name: effect.measureCatalog.catalogId,
    selection_input: effect.measureCatalog.selectionInput || "selected_measures",
    measures: (effect.measureCatalog.rows || []).map((row, index) => {
      const measureId = safeId(row.measure || row.name || `measure_${index + 1}`);
      return {
        measure_id: measureId,
        name: row.measure || row.name || measureId,
        category: row.category || null,
        customer_filters: [],
        equipment_filters: [],
        calculation: measureCalculation(row),
        limits: row.maxUnits || row.limit ? [{ scope: "measure", period: "transaction", max_count: row.maxUnits || null, notes: row.limit || "" }] : [],
        required_inputs: [],
        evidence_refs: [],
        confidence: { overall: 0.72, calculation: 0.72, extraction: 0.72, reason_codes: ["gpt_pro_measure_catalog_row"] },
        source_row: row
      };
    })
  };
}

function measureCalculation(row) {
  if (Number.isFinite(row.amountCents)) return { method: "fixed_amount", amount: centsToMoney(row.amountCents) };
  if (Number.isFinite(row.rateCents)) return { method: "per_unit", rate: { amount: centsToMoney(row.rateCents), unit: row.unit || "unit" } };
  if (Number.isFinite(row.percent)) return { method: "percent_of_cost", percent: row.percent, cost_input: "eligible_project_cost_cents" };
  return { method: "zero_when_not_applicable", reason: "Measure row requires custom interpretation.", source_row: row };
}

function buildV2RateTable(effect) {
  return {
    table_id: safeId(effect.rateTable.tableId),
    name: effect.rateTable.tableId,
    dimensions: effect.rateTable.dimensions || [],
    rows: effect.rateTable.rows || []
  };
}

function buildV2Timing(effect, repair) {
  return {
    cadence: cadenceForTiming(effect.timing),
    source_timing: effect.timing || "unknown",
    approval_required_before_purchase: repair.timingRequirements?.approvalRequiredBeforePurchase ?? null,
    approval_required_before_installation: repair.timingRequirements?.approvalRequiredBeforeInstallation ?? null,
    application_deadline: repair.timingRequirements?.applicationDeadline ?? null,
    funding_status: repair.timingRequirements?.fundingStatus ?? "unknown"
  };
}

function buildV2Limits(effect) {
  const limits = [];
  if (Number.isFinite(effect.caps?.maxUnits)) {
    limits.push({ scope: "measure", period: "transaction", max_units: effect.caps.maxUnits });
  }
  return limits;
}

function buildV2Caps(effect) {
  const caps = [];
  const maxAward = effect.caps?.maxAwardCents ?? effect.maxAmountCents;
  if (Number.isFinite(maxAward)) caps.push({ cap_type: "maximum_amount", amount: centsToMoney(maxAward), applies_to: "effect" });
  if (Number.isFinite(effect.caps?.maxPercentOfEligibleCost)) {
    caps.push({ cap_type: "maximum_percent_of_cost", percent: effect.caps.maxPercentOfEligibleCost, applies_to: "effect" });
  }
  return caps;
}

function buildV2InputRequirements(effect, effectId) {
  return uniqueStrings([...(effect.requiredInputs || []), ...(effect.missingInputsForTypicalRetroFiEstimate || [])]).map((input) => ({
    input_key: safeInputKey(input),
    label: String(input || "").replace(/_/g, " "),
    value_type: inferInputValueType(input),
    required_for: [effectId],
    source_precedence: ["user_profile", "retrofit_assumptions", "quote", "utility_data"],
    missing_severity: "blocks_calculation"
  }));
}

function buildLegacyRule(repair, effect, effectIndex) {
  const skip = legacySkipReason(repair, effect);
  if (skip) return { repair, effect, effectIndex, skipReason: skip };

  const amountResult = legacyAmountRule(effect);
  if (!amountResult.amountRule) return { repair, effect, effectIndex, skipReason: amountResult.skipReason };

  const context = previousContextByOpportunityId.get(repair.opportunityId);
  const id = `oir_formula_${shortHash(`${repair.opportunityId}|${effectIndex}|${effect.valueModelKind}|${effect.formulaText}`)}_v1`;
  const cap = legacyCap(effect);
  const rule = {
    id,
    version: 1,
    opportunityId: repair.opportunityId,
    name: repair.opportunityName || repair.opportunityId,
    incentiveType: legacyIncentiveType(effect),
    timing: legacyTiming(effect.timing),
    amountRule: amountResult.amountRule,
    basisPolicy: legacyBasisPolicy(effect),
    active: true,
    source: "gpt_pro_incentive_formula_rate_table_repair",
    extractionMethod: "gpt_pro_formula_rate_table_repair",
    researchBatchId: batchId,
    confidence: combinedConfidence(repair),
    sourceConfidence: repair.sourceConfidence || null,
    estimateConfidence: repair.estimateConfidence || null,
    formula: effect.formulaText || repair.evidenceText || null,
    evidenceText: effect.evidenceText || repair.evidenceText || "",
    sourceUrlsChecked: uniqueStrings([...(effect.sourceUrls || []), ...(repair.sourceUrlsChecked || [])]),
    requiredInputs: effect.requiredInputs || [],
    missingInputsForTypicalRetroFiEstimate: effect.missingInputsForTypicalRetroFiEstimate || [],
    valueModelKind: effect.valueModelKind,
    cashValueClassification: effect.cashValueClassification,
    includedInUserFacingTotalDefault: Boolean(effect.includedInUserFacingTotalDefault),
    calculationStatus: repair.calculationStatus,
    repairStatus: repair.repairStatus,
    repairMetadata: {
      sourceArtifact: path.relative(repoRoot, options.repairsPath),
      researchBatchNumber: repair.researchBatchNumber || null,
      workPacketOutputPath: repair.workPacketOutputPath || null,
      edgeActions: repair.edgeActions || []
    },
    mapping: context?.mapping || null
  };
  if (Object.keys(cap).length) rule.cap = cap;
  if (effect.eligibleCostCategories?.length) rule.eligibleCostCategories = effect.eligibleCostCategories;
  if (effect.stackingRules) rule.stacking = effect.stackingRules;
  return { repair, effect, effectIndex, rule };
}

function legacySkipReason(repair, effect) {
  if (!effect?.includedInUserFacingTotalDefault) return "not_included_in_user_facing_total_default";
  if (repair.humanReviewRequired) return "human_review_required";
  if (repair.sourceConfidence === "low") return "low_source_confidence";
  if (repair.estimateConfidence === "low") return "low_estimate_confidence";
  if (effect.missingInputsForTypicalRetroFiEstimate?.length > 0) return "missing_project_inputs_not_legacy_safe";
  if (["source_inaccessible", "unavailable_archive", "bad_edge_delete_only", "no_monetary_effect"].includes(repair.repairStatus)) return repair.repairStatus;
  if (["source_inaccessible", "custom_quote", "no_calculable_value", "loan_or_financing", "non_cash_process_value"].includes(effect.valueModelKind)) return `unsupported_${effect.valueModelKind}`;
  if (["financing", "loan", "technical_assistance", "process_value", "non_cash", "unknown"].includes(effect.cashValueClassification)) return `non_total_cash_classification_${effect.cashValueClassification}`;
  return null;
}

function legacyAmountRule(effect) {
  const kind = effect.valueModelKind || "";
  if ((kind === "fixed_amount" || kind === "fixed_tier_amount") && Number.isFinite(effect.amountCents)) {
    if (looksPerUnit(effect)) {
      return { amountRule: { kind: "fixed_per_unit", amountCentsPerUnit: Math.round(effect.amountCents), unitAnswerKey: "unit_count" } };
    }
    return { amountRule: { kind: "fixed_amount", amountCents: Math.round(effect.amountCents) } };
  }
  if (kind === "per_unit_award") {
    const cents = finiteAmountCentsForPerUnit(effect);
    if (cents !== null) {
      return { amountRule: { kind: "fixed_per_unit", amountCentsPerUnit: Math.round(cents), unitAnswerKey: "unit_count" } };
    }
  }
  if (kind === "percent_of_eligible_cost" || kind === "capped_percent_of_eligible_cost") {
    const percent = finitePercent(effect);
    if (percent !== null) return { amountRule: { kind: "percent_of_basis", percent } };
  }
  const singleRate = singleLegacyRate(effect);
  if (singleRate) return { amountRule: singleRate };
  return { skipReason: `legacy_unsupported_${kind || "unknown"}` };
}

function singleLegacyRate(effect) {
  const rows = [...(effect.rateTable?.rows || []), ...(effect.measureCatalog?.rows || [])];
  const pricedRows = rows.filter((row) =>
    [row.amountCents, row.rateCents, row.rateCentsPerKwh, row.rateCentsPerPeakKw, row.rateCentsPerKw, row.rateCentsPerBatteryKwh].some(Number.isFinite)
  );
  if (pricedRows.length !== 1) return null;
  const row = pricedRows[0];
  if (Number.isFinite(row.rateCentsPerKwh)) return { kind: "rate_per_kwh", amountCentsPerKwh: Math.round(row.rateCentsPerKwh), kwhSource: "annual_kwh_delta_abs" };
  if (Number.isFinite(row.rateCentsPerPeakKw) || Number.isFinite(row.rateCentsPerKw)) {
    return { kind: "rate_per_kw", amountCentsPerKw: Math.round(row.rateCentsPerPeakKw ?? row.rateCentsPerKw), kwSource: "system_kw" };
  }
  const amountCents = row.amountCents ?? row.rateCents;
  if (Number.isFinite(amountCents)) return { kind: "fixed_per_unit", amountCentsPerUnit: Math.round(amountCents), unitAnswerKey: "unit_count" };
  return null;
}

function legacyCap(effect) {
  const cap = {};
  const maxAmount = effect.caps?.maxAwardCents ?? effect.maxAmountCents ?? effect.caps?.perCustomerCapCents ?? effect.caps?.perSiteCapCents;
  if (Number.isFinite(maxAmount)) cap.maxAmountCents = Math.round(maxAmount);
  if (Number.isFinite(effect.caps?.maxPercentOfEligibleCost)) cap.maxPercentOfBasis = Number(effect.caps.maxPercentOfEligibleCost);
  if (Number.isFinite(effect.caps?.maxUnits)) cap.maxUnits = Number(effect.caps.maxUnits);
  return cap;
}

function legacyBasisPolicy(effect) {
  if (effect.valueModelKind === "percent_of_eligible_cost" || effect.valueModelKind === "capped_percent_of_eligible_cost") {
    return { basis: "gross_project_cost", applicationOrder: 10 };
  }
  if (effect.eligibleCostCategories?.length) {
    return { basis: "eligible_cost_categories", applicationOrder: 10 };
  }
  return { basis: "gross_project_cost", applicationOrder: 10 };
}

function legacyIncentiveType(effect) {
  if (effect.cashValueClassification === "tax_credit" || effect.effectType === "tax_credit") return "tax_credit";
  if (effect.cashValueClassification === "cash_grant" || effect.effectType === "grant_expected_value") return "grant";
  if (effect.valueModelKind === "percent_of_eligible_cost" || effect.valueModelKind === "capped_percent_of_eligible_cost") return "percent_project_cost_rebate";
  if (effect.valueModelKind === "fixed_amount" || effect.valueModelKind === "fixed_tier_amount") return "capped_rebate";
  return "fixed_per_unit_rebate";
}

function buildReviewedRow(repair, skippedRows) {
  const context = previousContextByOpportunityId.get(repair.opportunityId);
  const skips = skippedRows.filter((row) => row.repair?.opportunityId === repair.opportunityId).map((row) => row.skipReason);
  return {
    opportunityId: repair.opportunityId,
    opportunityName: repair.opportunityName || repair.opportunityId,
    repairStatus: repair.repairStatus,
    calculationStatus: repair.calculationStatus,
    confidence: combinedConfidence(repair),
    sourceConfidence: repair.sourceConfidence || null,
    estimateConfidence: repair.estimateConfidence || null,
    evidenceText: repair.evidenceText || "",
    sourceUrlsChecked: repair.sourceUrlsChecked || [],
    reasoningNotes: repair.reasoningNotes || "",
    researchBatchId: batchId,
    reviewedAt: repairsArtifact.researchedAt || repairsArtifact.generatedAt || null,
    valueModelKinds: uniqueStrings((repair.effects || []).map((effect) => effect.valueModelKind)),
    cashValueClassifications: repair.cashValueClassifications || uniqueStrings((repair.effects || []).map((effect) => effect.cashValueClassification)),
    legacyRuntimeSkipReasons: uniqueStrings(skips),
    v2CalculationPackageAvailable: true,
    originalGapReason: context?.originalGapReason || null,
    mapping: context?.mapping || null
  };
}

function buildPreviousContext(rules, rows) {
  const map = new Map();
  for (const rule of rules) {
    if (!rule.opportunityId || map.has(rule.opportunityId)) continue;
    map.set(rule.opportunityId, {
      mapping: rule.mapping || null,
      originalGapReason: null
    });
  }
  for (const row of rows) {
    if (!row.opportunityId || map.has(row.opportunityId)) continue;
    map.set(row.opportunityId, {
      mapping: row.mapping || null,
      originalGapReason: row.originalGapReason || row.repairStatus || null
    });
  }
  return map;
}

function patchPublicFixtures({ repairs, indexPath, testCasesPath, ruleCount, packageCount }) {
  const deleteEdgesByRetrofitId = new Map();
  for (const repair of repairs) {
    for (const edge of repair.edgeActions || []) {
      if (edge.action !== "delete_bad_edge" || !edge.retrofitTypeId) continue;
      const set = deleteEdgesByRetrofitId.get(edge.retrofitTypeId) || new Set();
      set.add(repair.opportunityId);
      deleteEdgesByRetrofitId.set(edge.retrofitTypeId, set);
    }
  }
  const requestedEdgeDeletions = [...deleteEdgesByRetrofitId.values()].reduce((total, set) => total + set.size, 0);

  const publicIndex = fs.existsSync(indexPath) ? readJson(indexPath) : null;
  const publicIndexStats = publicIndex ? patchRetrofitIndex(publicIndex, deleteEdgesByRetrofitId, ruleCount, packageCount, requestedEdgeDeletions) : emptyPatchStats();
  if (publicIndex) fs.writeFileSync(indexPath, `${JSON.stringify(publicIndex, null, 2)}\n`);

  const sampleTestCases = fs.existsSync(testCasesPath) ? readJson(testCasesPath) : null;
  const sampleStats = sampleTestCases ? patchSampleTestCases(sampleTestCases, deleteEdgesByRetrofitId, ruleCount, packageCount) : emptyPatchStats();
  if (sampleTestCases) fs.writeFileSync(testCasesPath, `${JSON.stringify(sampleTestCases, null, 2)}\n`);

  return { publicIndex: publicIndexStats, sampleTestCases: sampleStats };
}

function patchRetrofitIndex(index, deleteEdgesByRetrofitId, ruleCount, packageCount, requestedEdgeDeletions) {
  const stats = emptyPatchStats();
  stats.requestedEdgeDeletions = requestedEdgeDeletions;
  for (const retrofit of index.retrofits || []) {
    const deleteIds = deleteEdgesByRetrofitId.get(retrofit.retrofitTypeId);
    if (!deleteIds?.size) continue;
    const before = retrofit.opportunities?.length || 0;
    retrofit.opportunities = (retrofit.opportunities || []).filter((opportunity) => !deleteIds.has(opportunity.opportunityId));
    const removed = before - retrofit.opportunities.length;
    stats.edgeDeletions += removed;
    retrofit.opportunityCount = retrofit.opportunities.length;
  }
  index.opportunityCount = uniqueOpportunityCount(index.retrofits || []);
  index.retrofitCount = (index.retrofits || []).length;
  index.incentiveFormulaRateTableRepairedAt = new Date().toISOString();
  index.incentiveFormulaRateTableRepairBatch = batchId;
  index.incentiveFormulaRateTableRepairPath = path.relative(repoRoot, options.repairsPath);
  index.incentiveFormulaRateTableLegacyRuleCount = ruleCount;
  index.incentiveFormulaRateTableCalculationPackageCount = packageCount;
  stats.totalEdgeDeletionCount = Math.max(Number(index.incentiveFormulaRateTableEdgeDeletionCount || 0), stats.edgeDeletions, requestedEdgeDeletions);
  index.incentiveFormulaRateTableEdgeDeletionCount = stats.totalEdgeDeletionCount;
  index.incentiveFormulaRateTableEdgeDeletionsAppliedThisRun = stats.edgeDeletions;
  return stats;
}

function patchSampleTestCases(source, deleteEdgesByRetrofitId, ruleCount, packageCount) {
  const stats = emptyPatchStats();
  for (const testCase of source.testCases || []) {
    for (const retrofit of testCase.retrofits || []) {
      const deleteIds = deleteEdgesByRetrofitId.get(retrofit.retrofitTypeId);
      if (!deleteIds?.size) continue;
      const before = retrofit.opportunities?.length || 0;
      retrofit.opportunities = (retrofit.opportunities || [])
        .filter((opportunity) => !deleteIds.has(opportunity.opportunityId))
        .map((opportunity) => stripDeletedRetrofitFromOpportunity(opportunity, retrofit.retrofitTypeId, deleteIds));
      const removed = before - retrofit.opportunities.length;
      stats.edgeDeletions += removed;
      retrofit.opportunityCount = retrofit.opportunities.length;
      if (retrofit.savingsPreview) retrofit.savingsPreview.opportunityCount = retrofit.opportunities.length;
    }
    testCase.retrofits = (testCase.retrofits || []).filter((retrofit) => retrofit.opportunities?.length > 0);
    testCase.topResults = (testCase.topResults || [])
      .map((opportunity) => stripDeletedRetrofitsFromTopResult(opportunity, deleteEdgesByRetrofitId))
      .filter((opportunity) => (opportunity.retrofitTypeIds || []).length > 0);
  }
  source.opportunityIncentiveRuleCount = ruleCount;
  source.incentiveFormulaRateTableRepairedAt = new Date().toISOString();
  source.incentiveFormulaRateTableRepairBatch = batchId;
  source.incentiveFormulaRateTableRepairPath = path.relative(repoRoot, options.repairsPath);
  source.incentiveFormulaRateTableCalculationPackageCount = packageCount;
  stats.totalEdgeDeletionCount = Math.max(Number(source.incentiveFormulaRateTableEdgeDeletionCount || 0), stats.edgeDeletions);
  source.incentiveFormulaRateTableEdgeDeletionCount = stats.totalEdgeDeletionCount;
  source.incentiveFormulaRateTableEdgeDeletionsAppliedThisRun = stats.edgeDeletions;
  source.opportunityCount = uniqueOpportunityCount((source.testCases || []).flatMap((testCase) => testCase.retrofits || []));
  return stats;
}

function stripDeletedRetrofitFromOpportunity(opportunity, retrofitTypeId, deleteIds) {
  if (!deleteIds.has(opportunity.opportunityId)) return opportunity;
  return stripRetrofitIds(opportunity, new Set([retrofitTypeId]));
}

function stripDeletedRetrofitsFromTopResult(opportunity, deleteEdgesByRetrofitId) {
  const deletedRetrofitIds = new Set();
  for (const [retrofitTypeId, opportunityIds] of deleteEdgesByRetrofitId.entries()) {
    if (opportunityIds.has(opportunity.opportunityId)) deletedRetrofitIds.add(retrofitTypeId);
  }
  return stripRetrofitIds(opportunity, deletedRetrofitIds);
}

function stripRetrofitIds(opportunity, deletedRetrofitIds) {
  if (!deletedRetrofitIds.size) return opportunity;
  return {
    ...opportunity,
    retrofitTypeIds: (opportunity.retrofitTypeIds || []).filter((id) => !deletedRetrofitIds.has(id)),
    retrofitTypes: (opportunity.retrofitTypes || []).filter((retrofit) => !deletedRetrofitIds.has(retrofit.retrofitTypeId))
  };
}

function buildReport({
  generatedLegacyRules,
  packageValidation,
  packagesArtifact,
  publicPatch,
  repairs,
  reviewedRows,
  skippedLegacyRows
}) {
  return [
    "# Incentive Formula / Rate-Table Repair Apply Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Source artifact: \`${path.relative(repoRoot, options.repairsPath)}\``,
    `Reviewed opportunities: ${new Set(repairs.map((repair) => repair.opportunityId)).size}`,
    `V2 calculation packages: ${packagesArtifact.packageCount}`,
    `Legacy runtime rules generated: ${generatedLegacyRules.length}`,
    `Reviewed rows without legacy runtime rule: ${reviewedRows.length}`,
    "",
    "## Validation",
    "",
    `- Invalid v2 packages: ${packageValidation.invalidCount}`,
    `- Public retrofit edge deletions tracked: ${publicPatch.publicIndex.totalEdgeDeletionCount}`,
    `- Public retrofit edge deletions applied this run: ${publicPatch.publicIndex.edgeDeletions}`,
    `- Sample fixture edge deletions tracked: ${publicPatch.sampleTestCases.totalEdgeDeletionCount}`,
    `- Sample fixture edge deletions applied this run: ${publicPatch.sampleTestCases.edgeDeletions}`,
    "",
    "## Legacy Rule Counts",
    "",
    codeBlock({
      byIncentiveType: countBy(generatedLegacyRules, (rule) => rule.incentiveType || "unknown"),
      byAmountRule: countBy(generatedLegacyRules, (rule) => rule.amountRule?.kind || "unknown"),
      byConfidence: countBy(generatedLegacyRules, (rule) => rule.confidence || "unknown")
    }),
    "",
    "## Skipped Legacy Rule Reasons",
    "",
    codeBlock(countBy(skippedLegacyRows, (row) => row.skipReason || "unknown")),
    "",
    "## V2 Package Status Counts",
    "",
    codeBlock(packagesArtifact.statusCounts),
    ""
  ].join("\n");
}

function validatePackages(packages) {
  const invalidSamples = [];
  for (const pkg of packages) {
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid && invalidSamples.length < 20) {
      invalidSamples.push({ opportunityId: pkg.opportunity_id, errors: validation.errors });
    }
  }
  return { invalidCount: invalidSamples.length, invalidSamples };
}

function normalizeEffectType(value) {
  if (["one_time_savings", "recurring_savings", "recurring_expense", "grant_expected_value", "tax_credit", "financing_subsidy", "process_value", "no_cash_value"].includes(value)) return value;
  return "no_cash_value";
}

function normalizeCalculationStatus(calculationStatus, repairStatus) {
  if (calculationStatus === "non_monetary_workflow" || repairStatus === "non_monetary_workflow") return "non_monetary_workflow";
  if (calculationStatus === "no_calculable_value") return "no_calculable_value";
  return calculationStatus || "needs_repair_review";
}

function cadenceForTiming(value) {
  if (value === "monthly") return "monthly";
  if (value === "annual" || value === "tax_filing") return "annual";
  if (value === "post_purchase_rebate" || value === "post_installation_reimbursement" || value === "upfront") return "one_time";
  return "custom";
}

function legacyTiming(value) {
  if (value === "monthly") return "monthly";
  if (value === "annual" || value === "tax_filing") return "annual";
  return "upfront";
}

function finiteAmountCentsForPerUnit(effect) {
  if (Number.isFinite(effect.rate)) return Number(effect.rate);
  if (Number.isFinite(effect.amountCents)) return Number(effect.amountCents);
  const row = (effect.rateTable?.rows || []).find((item) => Number.isFinite(item.rateCents) || Number.isFinite(item.amountCents));
  if (row) return Number(row.rateCents ?? row.amountCents);
  return null;
}

function finitePercent(effect) {
  if (Number.isFinite(effect.percent)) return Number(effect.percent);
  if (Number.isFinite(effect.caps?.maxPercentOfEligibleCost)) return Number(effect.caps.maxPercentOfEligibleCost);
  return null;
}

function looksPerUnit(effect) {
  const text = `${effect.formulaText || ""} ${(effect.requiredInputs || []).join(" ")} ${effect.rateUnit || ""}`.toLowerCase();
  return /\b(per|each|count|quantity|unit|charger|station|port|door|ton)\b/.test(text);
}

function deriveQuantityInput(effect) {
  const input = (effect.requiredInputs || []).find((value) => /\b(count|quantity|units|ports|stations|chargers|doors|tons)\b/i.test(value));
  return input ? safeInputKey(input) : null;
}

function combinedConfidence(repair) {
  if (repair.sourceConfidence === "low" || repair.estimateConfidence === "low") return "low";
  if (repair.sourceConfidence === "medium" || repair.estimateConfidence === "medium") return "medium";
  return "high";
}

function confidenceNumber(value) {
  if (value === "high") return 0.9;
  if (value === "medium") return 0.72;
  if (value === "low") return 0.38;
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.min(1, number)) : 0.62;
}

function confidenceLabel(value) {
  const number = Number(value);
  if (number >= 0.82) return "high";
  if (number >= 0.55) return "medium";
  return "low";
}

function reasonCodesForRepair(repair) {
  return uniqueStrings([
    `repair_status_${repair.repairStatus || "unknown"}`,
    `calculation_status_${repair.calculationStatus || "unknown"}`,
    `source_confidence_${repair.sourceConfidence || "unknown"}`,
    `estimate_confidence_${repair.estimateConfidence || "unknown"}`
  ]);
}

function reasonCodesForEffect(repair, effect) {
  return uniqueStrings([...reasonCodesForRepair(repair), `value_model_${effect.valueModelKind || "unknown"}`]);
}

function safeInputKey(value) {
  return safeId(value).replace(/^_+|_+$/g, "") || "input";
}

function safeId(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 90) || "item";
}

function inferInputValueType(input) {
  return /(count|quantity|cost|amount|kw|kwh|therm|square|feet|tons|percent|rate)/i.test(String(input || "")) ? "number" : "text";
}

function centsToMoney(cents) {
  return { value: Number(cents || 0) / 100, currency: "USD" };
}

function dedupeInputRequirements(requirements) {
  const seen = new Set();
  return requirements.filter((item) => {
    const key = item.input_key;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function emptyPatchStats() {
  return { edgeDeletions: 0, requestedEdgeDeletions: 0, totalEdgeDeletionCount: 0 };
}

function uniqueOpportunityCount(retrofits) {
  return new Set((retrofits || []).flatMap((retrofit) => (retrofit.opportunities || []).map((opportunity) => opportunity.opportunityId))).size;
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows || []) {
    const key = keyFn(row);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function uniqueStrings(values) {
  return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
}

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 16);
}

function codeBlock(value) {
  return ["```json", JSON.stringify(value, null, 2), "```"].join("\n");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function parseArgs(args) {
  const parsed = {
    repairsPath: defaultRepairsPath,
    rulesPath: path.join(repoRoot, "data", "opportunity_incentive_rules.json"),
    packagesPath: path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json"),
    reportPath: path.join(repoRoot, "data", "incentive_formula_rate_table_repair_apply_report.md"),
    retrofitIndexPath: path.join(repoRoot, "public", "retrofit_opportunity_index.json"),
    sampleTestCasesPath: path.join(repoRoot, "public", "sample_matching_test_cases.json")
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--repairs") parsed.repairsPath = path.resolve(requiredValue(args, ++index, arg));
    else if (arg === "--rules") parsed.rulesPath = path.resolve(requiredValue(args, ++index, arg));
    else if (arg === "--packages") parsed.packagesPath = path.resolve(requiredValue(args, ++index, arg));
    else if (arg === "--report") parsed.reportPath = path.resolve(requiredValue(args, ++index, arg));
    else if (arg === "--retrofit-index") parsed.retrofitIndexPath = path.resolve(requiredValue(args, ++index, arg));
    else if (arg === "--sample-test-cases") parsed.sampleTestCasesPath = path.resolve(requiredValue(args, ++index, arg));
    else throw new Error(`Unknown option: ${arg}`);
  }

  return parsed;
}

function requiredValue(args, index, flag) {
  const value = args[index];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}
