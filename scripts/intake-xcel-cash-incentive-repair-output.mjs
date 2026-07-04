import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const CURRENT_DATE = "2026-07-04";
const OPPORTUNITY_ID = "SOURCE_DSIRE:dsire_program_id:1581";
const EFFECT_ID = "effect_one_time_savings_1_f67a6e3d70014316";
const OUTPUT_PATH = path.join(
  REPO_ROOT,
  "GPT Pro Work",
  "xcel-cash-incentive-repair-2026-07-04",
  "output_001_xcel-cash-incentive-repair.md"
);
const PACKAGE_PATH = path.join(REPO_ROOT, "data", "opportunity_incentive_calculation_packages_v2.json");
const ARTIFACT_PATH = path.join(REPO_ROOT, "data", "xcel_cash_incentive_repair_gpt_pro_2026-07-04.json");
const REPORT_PATH = path.join(REPO_ROOT, "data", "xcel_cash_incentive_repair_intake_report_2026-07-04.md");

function main() {
  const rawOutput = fs.readFileSync(OUTPUT_PATH, "utf8");
  const { object: repair, trailingText } = parseFirstJsonObject(rawOutput);
  validateRepair(repair);

  const packagePayload = readJson(PACKAGE_PATH);
  const pkg = (packagePayload.packages || []).find((item) => item.opportunity_id === OPPORTUNITY_ID);
  if (!pkg) throw new Error(`Package not found: ${OPPORTUNITY_ID}`);

  patchXcelPackage(pkg, repair);
  packagePayload.statusCounts = countBy(packagePayload.packages || [], (item) => item.calculation_status || "unknown");
  packagePayload.updatedAt = new Date().toISOString();

  writeJson(PACKAGE_PATH, packagePayload);
  writeJson(ARTIFACT_PATH, {
    schemaVersion: "retrofi_xcel_cash_incentive_repair_gpt_pro_intake.v1",
    parsedAt: new Date().toISOString(),
    sourceFile: path.relative(REPO_ROOT, OUTPUT_PATH),
    trailingCharactersIgnored: trailingText.length,
    repair
  });
  fs.writeFileSync(REPORT_PATH, buildReport({ repair, trailingText, pkg }), "utf8");

  console.log(`Wrote Xcel repair artifact: ${ARTIFACT_PATH}`);
  console.log(`Wrote Xcel repair report: ${REPORT_PATH}`);
  console.log(`Patched package: ${OPPORTUNITY_ID}`);
  console.log(`Recommended action: ${repair.recommendedAction}`);
  console.log(`Expected runtime status: ${repair.patchInstructions?.runtimeStatusExpectedAfterPatch || "unknown"}`);
  if (trailingText.trim()) console.log(`Ignored trailing characters after JSON object: ${trailingText.length}`);
}

function patchXcelPackage(pkg, repair) {
  const effect = (pkg.effects || []).find((item) => item.effect_id === EFFECT_ID) || (pkg.effects || [])[0];
  if (!effect) throw new Error(`Effect not found for ${OPPORTUNITY_ID}`);

  const catalogId = "xcel_colorado_residential_rebates_2026_form_gated";
  const requiredInputs = uniqueInputs((repair.measureRepairs || []).flatMap((measure) => measure.formulaRepair?.requiredInputs || []));
  const normalizedInputs = requiredInputs.map((input) => normalizeInputRequirement(input, effect.effect_id));
  const sourceUrls = normalizeUrls(repair.sourceUrlsChecked || []);
  const reasonCodes = dedupeStrings([
    "xcel_cash_incentive_repair_applied",
    `recommended_action_${toSnake(repair.recommendedAction || "unknown")}`,
    "estimate_status_needs_project_scope",
    "remove_blanket_600_default",
    "split_measure_specific_rows",
    "probability_evidence_not_required",
    ...(repair.runtimeRecommendation?.reasonCodes || []).map(toSnake)
  ]);

  pkg.calculation_status = "calculable_with_missing_inputs";
  pkg.availability = {
    ...(pkg.availability || {}),
    status: repair.availabilityStatus || "active",
    source_access_status: "partially_verified",
    funding_status: "open_while_funds_last",
    application_deadline: null,
    xcel_cash_incentive_repair_researched_at: repair.researchedAt || CURRENT_DATE
  };
  pkg.geography = {
    country: "US",
    states: repair.programGeography?.states?.length ? repair.programGeography.states : ["CO"],
    counties: [],
    cities: [],
    utility_territories: repair.programGeography?.utilityTerritories || ["Xcel Energy Colorado"],
    utility_territory_required: true,
    notes: repair.programGeography?.notes || "Colorado Xcel Energy residential service territory."
  };
  pkg.customer_segments = ["residential_utility_customer"];
  pkg.measure_catalogs = [
    {
      catalog_id: catalogId,
      name: "Xcel Colorado residential rebates 2026 form-gated",
      selection_input: "xcel_selected_measure_ids",
      measures: (repair.measureRepairs || []).map((measure) => buildMeasureCatalogRow(measure))
    }
  ];
  pkg.input_requirements = normalizedInputs;
  pkg.confidence = {
    overall: confidenceNumber(repair.sourceConfidence),
    source_access: confidenceNumber(repair.sourceConfidence),
    availability: confidenceNumber(repair.sourceConfidence),
    calculation: confidenceNumber(repair.estimateConfidence),
    extraction: confidenceNumber(repair.estimateConfidence),
    reason_codes: reasonCodes
  };
  pkg.source_evidence = [
    ...(pkg.source_evidence || []),
    {
      evidence_id: "xcel_cash_incentive_repair_2026_07_04",
      source_type: "gpt_pro_single_cash_incentive_repair",
      quote: repair.evidenceText || repair.overallDecision?.decisionRationale || "GPT Pro repaired Xcel into production form-gated rebate rows.",
      source_urls: sourceUrls,
      evidence_confidence: confidenceNumber(repair.sourceConfidence)
    }
  ];
  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    xcel_cash_incentive_repair_applied_at: new Date().toISOString(),
    xcel_cash_incentive_repair_artifact: path.relative(REPO_ROOT, ARTIFACT_PATH),
    xcel_cash_incentive_repair_source_file: path.relative(REPO_ROOT, OUTPUT_PATH),
    xcel_cash_incentive_repair_recommended_action: repair.recommendedAction,
    xcel_cash_incentive_repair_measure_count: repair.measureRepairs?.length || 0
  };

  effect.label = repair.runtimeRecommendation?.userFacingLabel || "Xcel Energy Colorado residential efficiency rebates";
  effect.calculation = {
    method: "measure_catalog",
    measure_catalog_id: catalogId,
    measure_selection_input: "xcel_selected_measure_ids",
    grant_value_model_kind: "hybrid_rate_plus_cap",
    cash_value_classification: "rebate",
    formula_repair: normalizeFormulaRepair(repair),
    conditional_award_model: normalizeFormulaRepair(repair),
    probability_model: {
      probability_required: false,
      probability_discount: null,
      probability_evidence_type: "not_required",
      probability_notes: repair.probabilityModel?.probabilityNotes || "This is a utility rebate, not a competitive grant."
    },
    runtime_recommendation: normalizeRuntimeRecommendation(repair.runtimeRecommendation),
    estimate_recommendation: normalizeRuntimeRecommendation(repair.runtimeRecommendation),
    timing_and_application_rules: {
      approval_required_before_purchase: null,
      approval_required_before_installation: null,
      application_deadline: null,
      funding_status: "open_while_funds_last",
      payment_timing: "post_installation_reimbursement"
    },
    production_action_recommendation: repair.recommendedAction || "form_input_required",
    formula_text: repair.overallDecision?.decisionRationale || repair.evidenceText || null,
    formula_expression: null,
    source_repair_status: "form_gated"
  };
  effect.required_inputs = normalizedInputs;
  effect.timing = {
    ...(effect.timing || {}),
    source_timing: "post_installation_reimbursement",
    funding_status: "open_while_funds_last",
    payment_timing: "post_installation_reimbursement"
  };
  effect.confidence = {
    overall: confidenceNumber(repair.sourceConfidence),
    calculation: confidenceNumber(repair.estimateConfidence),
    extraction: confidenceNumber(repair.estimateConfidence),
    reason_codes: reasonCodes
  };
  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    included_in_user_facing_total_default: false,
    cash_value_classification: "rebate",
    value_model_kind: "hybrid_rate_plus_cap",
    human_review_required: false,
    human_review_reasons: [],
    repair_status: "form_input_required",
    calculation_status: "calculable_with_missing_inputs",
    xcel_cash_incentive_repair: {
      source_file: path.relative(REPO_ROOT, OUTPUT_PATH),
      artifact: path.relative(REPO_ROOT, ARTIFACT_PATH),
      researched_at: repair.researchedAt || CURRENT_DATE,
      recommended_action: repair.recommendedAction,
      measure_count: repair.measureRepairs?.length || 0,
      can_be_production_form_gated: repair.overallDecision?.canBeProductionFormGated === true,
      should_remain_suppressed: repair.overallDecision?.shouldRemainSuppressed === true,
      should_archive_or_exclude: repair.overallDecision?.shouldArchiveOrExclude === true,
      decision_rationale: repair.overallDecision?.decisionRationale || null,
      unresolved_questions: repair.unresolvedQuestions || []
    },
    grant_production_action_repair: {
      source_file: path.relative(REPO_ROOT, OUTPUT_PATH),
      researched_at: repair.researchedAt || CURRENT_DATE,
      opportunity_id: repair.opportunityId,
      recommended_action: repair.recommendedAction || "form_input_required",
      availability_status: repair.availabilityStatus || "active",
      source_confidence: repair.sourceConfidence || "medium",
      estimate_confidence: repair.estimateConfidence || "medium",
      estimate_status: "needs_project_scope",
      value_model_kind: "hybrid_rate_plus_cap",
      cash_value_classification: "rebate",
      reason_codes: reasonCodes,
      formula_repair: normalizeFormulaRepair(repair),
      probability_model: {
        probability_required: false,
        probability_discount: null,
        probability_evidence_type: "not_required",
        probability_notes: repair.probabilityModel?.probabilityNotes || "This is a utility rebate, not a competitive grant."
      },
      runtime_recommendation: normalizeRuntimeRecommendation(repair.runtimeRecommendation),
      estimate_recommendation: normalizeRuntimeRecommendation(repair.runtimeRecommendation),
      timing_and_application_rules: {
        approval_required_before_purchase: null,
        approval_required_before_installation: null,
        application_deadline: null,
        funding_status: "open_while_funds_last",
        payment_timing: "post_installation_reimbursement"
      },
      patch_instructions: snakeKeys(repair.patchInstructions || {}),
      evidence_text: repair.evidenceText || null,
      reasoning_notes: repair.reasoningNotes || null,
      source_urls_checked: sourceUrls,
      human_review_required: false,
      human_review_reasons: []
    },
    grant_production_quality_repair: {
      source_file: path.relative(REPO_ROOT, OUTPUT_PATH),
      researched_at: repair.researchedAt || CURRENT_DATE,
      opportunity_id: repair.opportunityId,
      recommended_action: repair.recommendedAction || "form_input_required",
      source_confidence: repair.sourceConfidence || "medium",
      estimate_confidence: repair.estimateConfidence || "medium",
      estimate_status: "needs_project_scope",
      value_model_kind: "hybrid_rate_plus_cap",
      cash_value_classification: "rebate",
      reason_codes: reasonCodes,
      estimate_recommendation: normalizeRuntimeRecommendation(repair.runtimeRecommendation),
      evidence_text: repair.evidenceText || null,
      reasoning_notes: repair.reasoningNotes || null,
      source_urls_checked: sourceUrls,
      human_review_required: false,
      human_review_reasons: []
    }
  };
}

function buildMeasureCatalogRow(measure) {
  const formula = measure.formulaRepair || {};
  const sourceRow = {
    measure_id: measure.measureId,
    measure: measure.measureName,
    retrofitTypeIds: measure.retrofitTypeIds || [],
    recommendedRowAction: measure.recommendedRowAction,
    valueModelKind: measure.valueModelKind,
    formulaStatus: formula.status,
    formulaText: formula.formulaText,
    formulaExpression: formula.formulaExpression,
    amountCents: formula.amountCents,
    costSharePercent: normalizePercent(formula.costSharePercent),
    maxAwardCents: formula.maxAwardCents,
    perUnitRates: formula.perUnitRates || [],
    caps: formula.caps || {},
    includeInUserFacingTotalAfterInputs: measure.includeInUserFacingTotalAfterInputs === true,
    timingAndApplicationRules: measure.timingAndApplicationRules || {},
    sourceUrls: normalizeUrls(measure.sourceUrls || []),
    evidenceText: measure.evidenceText || null,
    reasoningNotes: measure.reasoningNotes || null
  };
  return {
    measure_id: measure.measureId,
    name: measure.measureName,
    category: measure.retrofitTypeIds?.[0] || null,
    customer_filters: [],
    equipment_filters: [],
    calculation: {
      method: "custom_quote",
      reason: "Production form-gated row; runtime calculator should wait for explicit user/project inputs before including value.",
      source_row: sourceRow
    },
    limits: [],
    required_inputs: (formula.requiredInputs || []).map((input) => normalizeInputRequirement(input, EFFECT_ID)),
    evidence_refs: ["xcel_cash_incentive_repair_2026_07_04"],
    confidence: {
      overall: confidenceNumber(measure.sourceConfidence),
      calculation: confidenceNumber(measure.estimateConfidence),
      extraction: confidenceNumber(measure.estimateConfidence),
      reason_codes: [
        "xcel_cash_incentive_repair_applied",
        `row_action_${toSnake(measure.recommendedRowAction || "unknown")}`,
        `formula_status_${toSnake(formula.status || "unknown")}`
      ]
    },
    source_row: sourceRow
  };
}

function normalizeFormulaRepair(repair) {
  const rows = repair.measureRepairs || [];
  return {
    status: "needs_project_scope",
    formula_text: "Xcel Colorado residential rebates are measure-specific. Do not apply a blanket $600 amount; select the applicable measure row and collect the required project, quote, utility, equipment, and timing inputs before calculating.",
    formula_expression: null,
    amount_cents: null,
    min_award_cents: null,
    max_award_cents: null,
    cost_share_percent: null,
    per_unit_rates: rows.flatMap((row) =>
      (row.formulaRepair?.perUnitRates || []).map((rate) => ({
        measure: row.measureId,
        metric: rate.metric || null,
        rate_cents: numberOrNull(rate.rateCents),
        unit: rate.unit || null,
        equipment_criteria: rate.equipmentCriteria || null
      }))
    ),
    eligible_cost_categories: rows.filter((row) => row.recommendedRowAction !== "exclude_row").map((row) => row.measureName),
    ineligible_cost_categories: rows.filter((row) => row.recommendedRowAction === "exclude_row").map((row) => row.measureName),
    caps: {
      max_award_cents: null,
      max_percent_of_eligible_cost: null,
      max_units: null,
      per_customer_cap_cents: null,
      program_budget_cents: null
    },
    required_inputs: uniqueInputs(rows.flatMap((row) => row.formulaRepair?.requiredInputs || [])).map((input) =>
      normalizeInputRequirement(input, EFFECT_ID)
    ),
    calculation_trace_template: repair.measureRepairs?.flatMap((row) => row.formulaRepair?.calculationTraceTemplate || []).slice(0, 20) || []
  };
}

function normalizeRuntimeRecommendation(recommendation = {}) {
  return {
    estimate_status: "needs_project_scope",
    include_in_user_facing_total_default: false,
    included_amount_policy: "estimated_amount_after_inputs",
    user_facing_label: recommendation.userFacingLabel || "Xcel Energy Colorado residential efficiency rebates",
    user_facing_caveat:
      recommendation.userFacingCaveat ||
      "Estimate only after the applicable Xcel measure, service/fuel facts, quote or invoice, equipment tier, timing, and contractor/application facts are supplied.",
    reason_codes: dedupeStrings([
      "needs_project_scope",
      "form_input_required",
      ...(recommendation.reasonCodes || []).map(toSnake)
    ])
  };
}

function normalizeInputRequirement(input, effectId) {
  const inputKey = input.inputKey || input.input_key;
  const inputSource = input.inputSource || input.input_source || "retrofit_scope";
  return {
    input_key: inputKey,
    label: input.label || humanize(inputKey),
    value_type: normalizeValueType(input.valueType || input.value_type),
    required_for: [effectId],
    source_precedence: sourcePrecedenceFor(inputSource),
    missing_severity: "blocks_calculation",
    allowed_values: input.allowedValues || input.allowed_values || [],
    user_override_allowed: input.userOverrideAllowed !== false,
    why_needed: input.whyNeeded || input.why_needed || "Required to calculate the Xcel rebate.",
    source: "xcel_cash_incentive_repair"
  };
}

function sourcePrecedenceFor(source) {
  switch (source) {
    case "utility_bill":
      return ["utility_data", "bill_upload", "user_profile"];
    case "quote_or_invoice":
      return ["quote", "paid_invoice", "retrofit_assumptions", "user_profile"];
    case "application_or_award_document":
      return ["program_application", "award_document", "admin_review", "user_profile"];
    case "user_profile":
      return ["user_profile", "retrofit_assumptions"];
    case "source_constant":
    case "server_derivable":
      return ["source_constant", "derived_runtime", "user_profile"];
    case "retrofit_scope":
    default:
      return ["retrofit_assumptions", "user_profile", "quote"];
  }
}

function normalizeValueType(value) {
  if (value === "money_cents") return "money_cents";
  if (value === "number") return "number";
  if (value === "boolean") return "boolean";
  if (value === "date") return "date";
  if (value === "enum") return "text";
  if (value === "string") return "text";
  return value || "text";
}

function validateRepair(repair) {
  if (repair.schemaVersion !== "retrofi_single_cash_incentive_repair.v1") {
    throw new Error(`Unexpected schemaVersion: ${repair.schemaVersion}`);
  }
  if (repair.opportunityId !== OPPORTUNITY_ID) throw new Error(`Unexpected opportunityId: ${repair.opportunityId}`);
  if (repair.recommendedAction !== "form_input_required") {
    throw new Error(`Expected form_input_required repair, got ${repair.recommendedAction}`);
  }
  if (!repair.measureRepairs?.length) throw new Error("Repair has no measureRepairs.");
  if (repair.overallDecision?.canBeProductionFormGated !== true) {
    throw new Error("Repair did not mark the package as production form-gated.");
  }
}

function parseFirstJsonObject(text) {
  const start = text.indexOf("{");
  if (start < 0) throw new Error("No JSON object found in GPT output.");
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === "\"") inString = false;
      continue;
    }
    if (char === "\"") inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return {
          object: JSON.parse(text.slice(start, index + 1)),
          trailingText: text.slice(index + 1)
        };
      }
    }
  }
  throw new Error("No complete JSON object found in GPT output.");
}

function snakeKeys(value) {
  if (Array.isArray(value)) return value.map(snakeKeys);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [toSnake(key), snakeKeys(entry)]));
}

function normalizeUrls(urls = []) {
  return dedupeStrings(
    urls
      .map((url) => String(url || "").trim())
      .map((url) => {
        const markdown = url.match(/\((https?:\/\/[^)]+)\)/);
        return markdown ? markdown[1] : url;
      })
      .map((url) => url.replace(/[?#]utm_source=chatgpt\.com\b.*$/i, ""))
      .filter((url) => /^https?:\/\//i.test(url))
  );
}

function uniqueInputs(inputs = []) {
  const seen = new Set();
  const unique = [];
  for (const input of inputs) {
    const key = input?.inputKey || input?.input_key;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(input);
  }
  return unique;
}

function dedupeStrings(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function confidenceNumber(confidence) {
  if (typeof confidence === "number") return confidence;
  if (confidence === "high") return 0.9;
  if (confidence === "medium") return 0.72;
  if (confidence === "low") return 0.4;
  return 0.72;
}

function normalizePercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return number > 1 ? number / 100 : number;
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function toSnake(value) {
  return String(value || "")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

function humanize(value = "") {
  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildReport({ repair, trailingText, pkg }) {
  const lines = [];
  lines.push("# Xcel Cash Incentive Repair Intake Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Opportunity: ${repair.opportunityId}`);
  lines.push(`- Program: ${repair.programName}`);
  lines.push(`- Recommended action: ${repair.recommendedAction}`);
  lines.push(`- Runtime status expected after patch: ${repair.patchInstructions?.runtimeStatusExpectedAfterPatch || "unknown"}`);
  lines.push(`- Measures imported: ${repair.measureRepairs?.length || 0}`);
  lines.push(`- Required inputs imported: ${pkg.input_requirements?.length || 0}`);
  lines.push(`- Trailing characters ignored after JSON: ${trailingText.length}`);
  lines.push("");
  lines.push("## Measure Rows");
  lines.push("");
  lines.push("| Measure | Action | Value model | Formula status |");
  lines.push("| --- | --- | --- | --- |");
  for (const measure of repair.measureRepairs || []) {
    lines.push(`| ${escapeMd(measure.measureName)} | ${measure.recommendedRowAction} | ${measure.valueModelKind} | ${measure.formulaRepair?.status || ""} |`);
  }
  lines.push("");
  lines.push("## Interpretation");
  lines.push("");
  lines.push("- The old package-level `$600` default should not be used.");
  lines.push("- Xcel now remains out of totals by default but is categorized as a production form/input gate.");
  lines.push("- The package should leave `cash_incentive_runtime_repair_required` once the grant/tax coverage report is regenerated.");
  return `${lines.join("\n")}\n`;
}

function escapeMd(value) {
  return String(value || "").replace(/\|/g, "\\|");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, payload) {
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

main();
