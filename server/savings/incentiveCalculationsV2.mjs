import { applyCaps, percentOfCents, roundCents } from "./formulas.mjs";
import { buildGrantEstimateFromLegacyRule, isGrantLikeRule } from "./grantEstimates.mjs";
import { answerValue, hasAnswer } from "./labor.mjs";
import { resolveIncentiveBasis } from "./incentives.mjs";

export const INCENTIVE_CALCULATION_SCHEMA_VERSION = "2.0.0";

const CALCULATION_STATUSES = new Set([
  "calculable",
  "calculable_with_missing_inputs",
  "estimate_from_range",
  "custom_quote_estimate",
  "source_inaccessible_repair_failure",
  "unavailable_archived",
  "non_monetary_workflow",
  "no_calculable_value",
  "needs_repair_review"
]);

const EFFECT_TYPES = new Set([
  "one_time_savings",
  "recurring_savings",
  "recurring_expense",
  "grant_expected_value",
  "tax_credit",
  "tax_exemption",
  "tax_abatement",
  "tax_rate_preference",
  "property_tax_valuation",
  "financing_subsidy",
  "process_value",
  "no_cash_value"
]);

const CALCULATION_METHODS = new Set([
  "fixed_amount",
  "per_unit",
  "per_kw",
  "per_kwh",
  "per_therm",
  "per_square_foot",
  "per_ton",
  "per_port",
  "percent_of_cost",
  "measure_catalog",
  "rate_table",
  "tiered_rate_table",
  "range",
  "expected_value",
  "custom_quote",
  "expression",
  "zero_when_not_applicable"
]);

export function validateIncentiveCalculationPackageV2(pkg) {
  const errors = [];

  if (!pkg || typeof pkg !== "object") {
    return { valid: false, errors: ["Package must be an object."] };
  }

  requireString(errors, pkg.schema_version, "schema_version");
  requireString(errors, pkg.opportunity_id, "opportunity_id");
  requireEnum(errors, pkg.calculation_status, CALCULATION_STATUSES, "calculation_status");
  requireObject(errors, pkg.availability, "availability");
  requireArray(errors, pkg.effects, "effects");
  requireArray(errors, pkg.input_requirements, "input_requirements");
  requireArray(errors, pkg.source_evidence, "source_evidence");
  requireObject(errors, pkg.confidence, "confidence");

  for (const [index, effect] of (pkg.effects || []).entries()) {
    requireString(errors, effect.effect_id, `effects[${index}].effect_id`);
    requireEnum(errors, effect.effect_type, EFFECT_TYPES, `effects[${index}].effect_type`);
    requireObject(errors, effect.timing, `effects[${index}].timing`);
    requireObject(errors, effect.calculation, `effects[${index}].calculation`);
    requireEnum(errors, effect.calculation?.method, CALCULATION_METHODS, `effects[${index}].calculation.method`);
  }

  for (const effect of pkg.effects || []) {
    if (effect.calculation?.method === "measure_catalog") {
      const catalogId = effect.calculation.measure_catalog_id;
      const catalogExists = (pkg.measure_catalogs || []).some((catalog) => catalog.catalog_id === catalogId);
      if (!catalogExists) errors.push(`Missing referenced measure catalog: ${catalogId}`);
    }
    if (effect.calculation?.method === "rate_table") {
      const tableId = effect.calculation.rate_table_id;
      const tableExists = (pkg.rate_tables || []).some((table) => table.table_id === tableId);
      if (!tableExists) errors.push(`Missing referenced rate table: ${tableId}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function convertLegacyIncentiveRuleToV2(rule) {
  const effectType = legacyEffectType(rule);
  const calculation = legacyCalculationSpec(rule);
  const timing = legacyTiming(rule);
  const effect = {
    effect_id: `effect_${rule.id}`,
    label: rule.name || rule.id,
    effect_type: effectType,
    cash_flow_direction: effectType === "recurring_expense" ? "cost" : "benefit",
    timing,
    calculation,
    limits: legacyLimits(rule),
    caps: legacyCaps(rule),
    required_inputs: legacyInputRequirements(rule),
    evidence_refs: [`legacy_rule_${rule.id}`],
    migration_legacy_rule: rule,
    confidence: {
      overall: confidenceNumber(rule.confidence),
      calculation: confidenceNumber(rule.confidence),
      extraction: confidenceNumber(rule.confidence),
      reason_codes: ["legacy_simple_rule"]
    }
  };

  return {
    schema_version: INCENTIVE_CALCULATION_SCHEMA_VERSION,
    opportunity_id: rule.opportunityId,
    program_name: rule.name || rule.opportunityName || rule.opportunityId,
    calculation_status: effect.required_inputs.length > 0 ? "calculable_with_missing_inputs" : "calculable",
    availability: {
      status: rule.active === false ? "closed" : "active",
      source_access_status: "unknown"
    },
    customer_segments: [],
    retrofit_types: rule.retrofitTypeIds || [],
    geography: {
      country: rule.geography?.country || "US",
      states: unique([rule.geography?.state, ...(rule.geography?.states || [])]),
      counties: [],
      cities: [],
      utility_territory_required: Boolean(rule.utilityTerritoryRequired)
    },
    measure_catalogs: [],
    rate_tables: [],
    effects: [effect],
    global_limits: [],
    global_caps: [],
    stacking: legacyStacking(rule),
    input_requirements: effect.required_inputs,
    assumptions: [],
    source_evidence: [
      {
        evidence_id: `legacy_rule_${rule.id}`,
        source_type: "manual_note",
        quote: rule.formula || rule.amountRule?.kind || "Legacy incentive rule migrated to v2.",
        evidence_confidence: confidenceNumber(rule.confidence)
      }
    ],
    confidence: {
      overall: confidenceNumber(rule.confidence),
      source_access: 0.5,
      availability: rule.active === false ? 0.9 : 0.7,
      calculation: confidenceNumber(rule.confidence),
      extraction: confidenceNumber(rule.confidence),
      reason_codes: ["legacy_simple_rule"]
    },
    migration_metadata: {
      migrated_from_rule_id: rule.id,
      old_rule_type: rule.amountRule?.kind || rule.incentiveType || "unknown",
      old_rule_payload: rule,
      migration_status: "auto_migrated",
      migration_notes: ["Converted from the legacy opportunity_incentive_rules shape."]
    }
  };
}

export function calculateV2IncentivePackage(pkg, ctx = {}, priorAwards = []) {
  const validation = validateIncentiveCalculationPackageV2(pkg);
  if (!validation.valid) {
    return {
      opportunityId: pkg?.opportunity_id || null,
      status: "invalid",
      validationErrors: validation.errors,
      missingInputs: [],
      effectResults: [],
      totals: emptyTotals(),
      trace: []
    };
  }

  const effectResults = [];
  const missingInputs = [];
  const trace = [];

  for (const effect of pkg.effects) {
    const result = calculateEffect({ pkg, effect, ctx, priorAwards });
    effectResults.push(result);
    missingInputs.push(...result.missingInputs);
    trace.push(...result.trace);
  }

  return {
    opportunityId: pkg.opportunity_id,
    status: missingInputs.length > 0 ? "calculable_with_missing_inputs" : "calculated",
    validationErrors: [],
    missingInputs: dedupeMissingInputs(missingInputs),
    effectResults,
    totals: aggregateEffectResults(effectResults),
    trace
  };
}

function calculateEffect({ pkg, effect, ctx, priorAwards }) {
  const calculation = effect.calculation;
  const disqualified = zeroWhenTaxGateDisqualified(effect, ctx);
  const missingInputs = disqualified ? [] : missingRequiredInputsForEffect(effect, ctx);
  const trace = [];
  let rawAmountCents = 0;

  if (disqualified) {
    trace.push(disqualified.trace);
  } else if (missingInputs.length > 0) {
    trace.push(`Missing required inputs for ${effect.effect_id}: ${missingInputs.map((input) => input.inputKey).join(", ")}.`);
  } else if (calculation.method === "measure_catalog") {
    const result = calculateMeasureCatalogEffect({ pkg, effect, ctx });
    rawAmountCents = result.amountCents;
    missingInputs.push(...result.missingInputs);
    trace.push(...result.trace);
  } else {
    const result = calculateCalculationSpec({ pkg, effect, calculation, ctx, priorAwards });
    rawAmountCents = result.amountCents;
    missingInputs.push(...result.missingInputs);
    trace.push(...result.trace);
  }

  const basisCents = resolveV2Basis(effect, ctx, priorAwards);
  let amountCents = applyV2Caps(rawAmountCents, [...(effect.caps || []), ...(pkg.global_caps || [])], basisCents);
  const legacyRule = effect.migration_legacy_rule;
  const grantEstimate = isGrantLikeRule(legacyRule)
    ? buildGrantEstimateFromLegacyRule(legacyRule, { ...ctx, legacyIncentiveBasisCents: basisCents })
    : null;

  if (grantEstimate) {
    const includedGrantAmount = grantEstimate.computedEstimate.includedInUserFacingTotal;
    amountCents = includedGrantAmount ? Number(grantEstimate.computedEstimate.estimatedAmountCents || 0) : 0;
    if (!includedGrantAmount) rawAmountCents = 0;
  }
  const annualizedAmountCents = annualizeAmount(amountCents, effect.timing);

  return {
    effectId: effect.effect_id,
    effectType: effect.effect_type,
    amountCents,
    rawAmountCents,
    annualizedAmountCents,
    basisCents,
    missingInputs,
    grantEstimate,
    trace
  };
}

function zeroWhenTaxGateDisqualified(effect, ctx) {
  const expressionId = String(effect.calculation?.expression_id || "").trim();

  if (expressionId === "tax_exempt_liability") {
    const gates = [
      ["approved_rerz_designation", "Approved RERZ designation"],
      ["qualified_company_operations", "Qualified company operations"],
      ["parcel_or_facility_within_approved_zone_boundary", "Facility inside approved zone boundary"],
      ["company_current_on_state_and_local_taxes", "Company current on state and local taxes"]
    ];
    const failedGate = gates.find(([key]) => hasAnswer(ctx.answers, key) && booleanAnswer(ctx, key) === false);
    if (failedGate) {
      return { trace: `${failedGate[1]} is not confirmed, so tax-exempt liability value is zero.` };
    }
  }

  if (expressionId === "tax_rate_difference") {
    const gates = [
      ["annual_tax_performance_report_filed", "Annual Tax Performance Report"],
      ["has_washington_business_excise_tax_return", "Washington business excise tax return"]
    ];
    const failedGate = gates.find(([key]) => hasAnswer(ctx.answers, key) && booleanAnswer(ctx, key) === false);
    if (failedGate) {
      return { trace: `${failedGate[1]} is not confirmed, so tax-rate preference value is zero.` };
    }

    const taxBase = firstNumberAnswer(ctx, [
      "qualifying_tax_base_after_deductions_and_matc_cents",
      "qualifying_taxable_gross_receipts",
      "qualifying_taxable_gross_receipts_cents"
    ]);
    if (taxBase === 0) {
      return { trace: "Qualifying tax base is zero, so tax-rate preference value is zero." };
    }
  }

  return null;
}

function calculateCalculationSpec({ pkg, effect, calculation, ctx, priorAwards }) {
  const missingInputs = [];
  const trace = [];

  switch (calculation.method) {
    case "fixed_amount":
      return { amountCents: moneyToCents(calculation.amount), missingInputs, trace };
    case "per_unit":
    case "per_port":
    case "per_ton":
    case "per_square_foot":
    case "per_therm": {
      const inputKey = calculation.quantity_input;
      if (!hasAnswer(ctx.answers, inputKey)) return missingResult(inputKey, effect);
      const quantity = applyEffectQuantityLimits(Number(answerValue(ctx.answers, inputKey)), effect);
      return {
        amountCents: roundCents(quantity * rateToCents(calculation.rate)),
        missingInputs,
        trace
      };
    }
    case "per_kw": {
      const inputKey = calculation.quantity_input || "system_kw";
      if (!hasAnswer(ctx.answers, inputKey)) return missingResult(inputKey, effect);
      return {
        amountCents: roundCents(Number(answerValue(ctx.answers, inputKey)) * rateToCents(calculation.rate)),
        missingInputs,
        trace
      };
    }
    case "per_kwh": {
      const inputKey = calculation.quantity_input || "annual_kwh_delta_abs";
      if (inputKey !== "annual_kwh_delta_abs" && !hasAnswer(ctx.answers, inputKey)) return missingResult(inputKey, effect);
      const quantity = inputKey === "annual_kwh_delta_abs" ? annualKwhDeltaAbs(ctx) : Number(answerValue(ctx.answers, inputKey));
      if (!Number.isFinite(quantity)) return missingResult(inputKey, effect);
      return {
        amountCents: roundCents(quantity * rateToCents(calculation.rate)),
        missingInputs,
        trace
      };
    }
    case "percent_of_cost": {
      const basisCents = resolveV2Basis(effect, ctx, priorAwards);
      return { amountCents: percentOfCents(basisCents, calculation.percent || 0), missingInputs, trace };
    }
    case "expected_value": {
      if (!Number.isFinite(calculation.probability_discount)) return missingResult("award_probability", effect);
      if (!Number.isFinite(calculation.conditional_award_cents)) return missingResult("conditional_award_amount", effect);
      return {
        amountCents: roundCents(Number(calculation.conditional_award_cents) * Number(calculation.probability_discount)),
        missingInputs,
        trace
      };
    }
    case "rate_table":
    case "tiered_rate_table":
      return calculateRateTableEffect({ pkg, effect, calculation, ctx });
    case "expression":
      return calculateExpressionEffect({ effect, calculation, ctx });
    default:
      return { amountCents: 0, missingInputs, trace: [`Unsupported v2 calculation method: ${calculation.method}`] };
  }
}

function calculateExpressionEffect({ effect, calculation, ctx }) {
  const expressionId = String(calculation.expression_id || "").trim();

  if (expressionId === "tax_exempt_liability") {
    const gates = [
      ["approved_rerz_designation", "Approved RERZ designation"],
      ["qualified_company_operations", "Qualified company operations"],
      ["company_current_on_state_and_local_taxes", "Company current on state and local taxes"]
    ];
    const failedGate = gates.find(([key]) => booleanAnswer(ctx, key) === false);
    if (failedGate) {
      return {
        amountCents: 0,
        missingInputs: [],
        trace: [`${failedGate[1]} is not confirmed, so tax-exempt liability value is zero.`]
      };
    }

    const eligibleTaxCents = [
      "eligible_state_education_tax_cents",
      "eligible_real_property_tax_cents",
      "eligible_personal_property_tax_cents",
      "eligible_local_income_tax_cents"
    ].reduce((sum, key) => sum + (numberAnswer(ctx, key) || 0), 0);
    const phaseoutMultiplier = normalizeFraction(numberAnswer(ctx, "phaseout_multiplier") ?? 1);
    return {
      amountCents: roundCents(eligibleTaxCents * phaseoutMultiplier),
      missingInputs: [],
      trace: [
        `Eligible tax liability ${eligibleTaxCents} cents * phaseout multiplier ${phaseoutMultiplier}.`
      ]
    };
  }

  if (expressionId === "tax_rate_difference") {
    if (booleanAnswer(ctx, "annual_tax_performance_report_filed") === false) {
      return {
        amountCents: 0,
        missingInputs: [],
        trace: ["Annual Tax Performance Report is not confirmed, so tax-rate preference value is zero."]
      };
    }

    const taxBaseCents = firstNumberAnswer(ctx, [
      "qualifying_tax_base_after_deductions_and_matc_cents",
      "qualifying_taxable_gross_receipts",
      "qualifying_taxable_gross_receipts_cents"
    ]) || 0;
    const ordinaryRate = normalizeTaxRate(
      firstNumberAnswer(ctx, ["otherwise_applicable_b_and_o_rate_decimal", "otherwise_applicable_b_o_tax_rate"])
    );
    const preferentialRate = normalizeTaxRate(
      firstNumberAnswer(ctx, ["preferential_solar_b_and_o_rate_decimal"]) ??
        Number(calculation.preferential_solar_b_and_o_rate_decimal ?? 0.00275)
    );
    const rateDelta = Math.max(0, ordinaryRate - preferentialRate);
    return {
      amountCents: roundCents(taxBaseCents * rateDelta),
      missingInputs: [],
      trace: [
        `Tax base ${taxBaseCents} cents * rate difference ${ordinaryRate} - ${preferentialRate} = ${rateDelta}.`
      ]
    };
  }

  if (expressionId === "property_tax_valuation_formula") {
    const acKwCapacity = firstNumberAnswer(ctx, ["ac_nameplate_capacity_kw", "ac_kw_capacity", "system_kw", "system_capacity_kw_dc"]);
    if (!Number.isFinite(acKwCapacity)) return missingResult("ac_nameplate_capacity_kw", effect);

    const tangiblePropertyApplicableAnswer = booleanAnswer(ctx, "tangible_property_applicable");
    const realPropertyApplicableAnswer = booleanAnswer(ctx, "real_property_applicable");
    if (tangiblePropertyApplicableAnswer === null) return missingResult("tangible_property_applicable", effect);
    if (realPropertyApplicableAnswer === null) return missingResult("real_property_applicable", effect);

    const tangiblePropertyApplicable = tangiblePropertyApplicableAnswer === true;
    const realPropertyApplicable = realPropertyApplicableAnswer === true;
    const statutoryTaxCents =
      (tangiblePropertyApplicable ? acKwCapacity * 500 : 0) +
      (realPropertyApplicable ? acKwCapacity * 350 : 0);
    const counterfactualTaxCents = firstNumberAnswer(ctx, [
      "counterfactual_ordinary_annual_property_tax_cents",
      "counterfactual_assessment_cents"
    ]);
    if (statutoryTaxCents > 0 && !Number.isFinite(counterfactualTaxCents)) {
      return missingResult("counterfactual_ordinary_annual_property_tax_cents", effect);
    }

    const amountCents = Math.max(0, Number(counterfactualTaxCents || 0) - statutoryTaxCents);

    return {
      amountCents: roundCents(amountCents),
      missingInputs: [],
      trace: [
        `Statutory renewable property tax value ${statutoryTaxCents} cents for ${acKwCapacity} AC kW.`,
        `Counterfactual ordinary annual property tax ${counterfactualTaxCents || 0} cents; gross annual difference ${amountCents} cents.`
      ]
    };
  }

  return {
    amountCents: 0,
    missingInputs: [],
    trace: [`Unsupported v2 expression id: ${expressionId || "unknown"}`]
  };
}

function missingRequiredInputsForEffect(effect, ctx) {
  return normalizeRequiredInputs(effect.required_inputs)
    .filter((input) => input.missing_severity !== "optional")
    .filter((input) => !hasRuntimeInput(ctx, input.input_key))
    .map((input) => ({ inputKey: input.input_key, effectId: effect.effect_id, label: input.label || input.input_key }));
}

function normalizeRequiredInputs(inputs = []) {
  return inputs
    .map((input) => (typeof input === "string" ? { input_key: input, label: input } : input))
    .filter((input) => input?.input_key);
}

function hasRuntimeInput(ctx, inputKey) {
  if (!inputKey) return true;
  if (hasAnswer(ctx.answers, inputKey)) return true;
  if (inputKey === "annual_kwh_delta_abs") return Number.isFinite(annualKwhDeltaAbs(ctx));
  if (inputKey === "project_cost_cents" || inputKey === "gross_project_cost_cents" || inputKey === "upfront_cost_cents") {
    return Number.isFinite(ctx.upfrontCostCents);
  }
  return false;
}

function applyEffectQuantityLimits(quantity, effect) {
  return (effect.limits || []).reduce((current, limit) => {
    if (Number.isFinite(limit.max_count)) return Math.min(current, Number(limit.max_count));
    if (Number.isFinite(limit.max_units)) return Math.min(current, Number(limit.max_units));
    return current;
  }, quantity);
}

function calculateMeasureCatalogEffect({ pkg, effect, ctx }) {
  const catalog = (pkg.measure_catalogs || []).find((item) => item.catalog_id === effect.calculation.measure_catalog_id);
  const selectionInput = effect.calculation.measure_selection_input || catalog?.selection_input || "selected_measures";

  if (!catalog) return { amountCents: 0, missingInputs: [], trace: ["Referenced measure catalog was not found."] };
  if (!hasAnswer(ctx.answers, selectionInput)) return missingResult(selectionInput, effect);

  const selectedMeasures = normalizeSelectedMeasures(answerValue(ctx.answers, selectionInput));
  const missingInputs = [];
  const trace = [];
  let totalCents = 0;

  for (const selected of selectedMeasures) {
    const measure = catalog.measures.find((item) => item.measure_id === selected.measure_id);
    if (!measure) {
      trace.push(`Selected measure not found in catalog: ${selected.measure_id}`);
      continue;
    }

    const filterResult = measureFiltersSatisfied(measure, ctx);
    if (!filterResult.satisfied) {
      missingInputs.push(...filterResult.missingInputs);
      trace.push(`Measure ${measure.measure_id} could not be applied because eligibility inputs are missing or false.`);
      continue;
    }

    const quantity = applyMeasureLimits(Number(selected.quantity || 1), measure);
    const amountCents = roundCents(calculateMeasureBaseAmount(measure, ctx) * quantity);
    totalCents += amountCents;
    trace.push(`Measure ${measure.measure_id}: ${quantity} x ${calculateMeasureBaseAmount(measure, ctx)} cents.`);
  }

  return { amountCents: totalCents, missingInputs, trace };
}

function calculateRateTableEffect({ pkg, effect, calculation, ctx }) {
  const table = (pkg.rate_tables || []).find((item) => item.table_id === calculation.rate_table_id);
  if (!table) {
    return { amountCents: 0, missingInputs: [], trace: [`Referenced rate table was not found: ${calculation.rate_table_id}`] };
  }

  const candidateRows = rowsMatchingRuntimeInputs(table.rows || [], calculation.lookup_inputs || table.dimensions || [], ctx);
  const rowAmounts = candidateRows
    .map((row) => ({ row, result: calculateRateTableRow(row, effect, ctx) }))
    .filter((item) => item.result.amountCents > 0);

  if (!rowAmounts.length) {
    return {
      amountCents: 0,
      missingInputs: [],
      trace: [`No calculable positive rate-table row matched ${table.table_id}.`]
    };
  }

  rowAmounts.sort((a, b) => a.result.amountCents - b.result.amountCents);
  const selected = rowAmounts[0];
  return {
    amountCents: selected.result.amountCents,
    missingInputs: selected.result.missingInputs,
    trace: [
      `Rate table ${table.table_id}: selected conservative matched row ${JSON.stringify(selected.row)}.`,
      ...selected.result.trace
    ]
  };
}

function calculateMeasureBaseAmount(measure, ctx) {
  const calculation = measure.calculation || {};
  if (calculation.method === "fixed_amount") return moneyToCents(calculation.amount);
  if (calculation.method === "per_unit") return rateToCents(calculation.rate);
  if (calculation.method === "zero_when_not_applicable") return sourceRowAmountCents(calculation.source_row);
  if (calculation.method === "percent_of_cost") {
    return percentOfCents(Number(answerValue(ctx.answers, calculation.cost_input || "project_cost_cents") || 0), calculation.percent || 0);
  }
  return 0;
}

function rowsMatchingRuntimeInputs(rows, dimensions, ctx) {
  const normalizedDimensions = (dimensions || []).map((dimension) => String(dimension || "").trim()).filter(Boolean);
  const matched = rows.filter((row) =>
    normalizedDimensions.every((dimension) => {
      if (row[dimension] == null) return true;
      const answer = answerForDimension(ctx, dimension);
      if (answer == null || answer === "") return true;
      return normalizeDimensionValue(answer) === normalizeDimensionValue(row[dimension]);
    })
  );
  return matched.length ? matched : rows;
}

function calculateRateTableRow(row, effect, ctx) {
  const missingInputs = [];
  const trace = [];

  if (Number.isFinite(row.amountCents)) {
    const quantity = quantityForRateTableRow(row, ctx);
    if (!Number.isFinite(quantity)) return { amountCents: 0, missingInputs: [{ inputKey: "unit_count", effectId: effect.effect_id }], trace };
    return {
      amountCents: roundCents(Number(row.amountCents) * quantity),
      missingInputs,
      trace: [`amountCents ${row.amountCents} * quantity ${quantity}`]
    };
  }

  if (Number.isFinite(row.rateCents) || Number.isFinite(row.rateDollars)) {
    const rateCents = Number.isFinite(row.rateCents) ? Number(row.rateCents) : Number(row.rateDollars) * 100;
    const quantity = quantityForRateTableRow(row, ctx);
    if (!Number.isFinite(quantity)) return { amountCents: 0, missingInputs: [{ inputKey: quantityInputForUnit(row.unit), effectId: effect.effect_id }], trace };
    return {
      amountCents: roundCents(rateCents * quantity),
      missingInputs,
      trace: [`rate ${rateCents} cents/${row.unit || "unit"} * quantity ${quantity}`]
    };
  }

  if (Number.isFinite(row.rateCentsPerKwh)) {
    const quantity = Number(answerValue(ctx.answers, "annual_kwh_savings") || annualKwhDeltaAbs(ctx));
    return { amountCents: roundCents(quantity * Number(row.rateCentsPerKwh)), missingInputs, trace: [`${quantity} kWh * ${row.rateCentsPerKwh} cents/kWh`] };
  }

  if (Number.isFinite(row.rateCentsPerPeakKw) || Number.isFinite(row.rateCentsPerKw)) {
    const key = hasAnswer(ctx.answers, "demand_reduction_kw") ? "demand_reduction_kw" : "system_kw";
    const quantity = Number(answerValue(ctx.answers, key) || 0);
    const rate = Number(row.rateCentsPerPeakKw ?? row.rateCentsPerKw);
    return { amountCents: roundCents(quantity * rate), missingInputs, trace: [`${quantity} kW * ${rate} cents/kW`] };
  }

  if (Number.isFinite(row.rateCentsPerBatteryKwh)) {
    const quantity = Number(answerValue(ctx.answers, "battery_storage_kwh") || answerValue(ctx.answers, "storage_capacity_kwh") || 0);
    return { amountCents: roundCents(quantity * Number(row.rateCentsPerBatteryKwh)), missingInputs, trace: [`${quantity} battery kWh * ${row.rateCentsPerBatteryKwh} cents/kWh`] };
  }

  if (Number.isFinite(row.percent)) {
    const basis = Number(answerValue(ctx.answers, "eligible_project_cost_cents") || ctx.upfrontCostCents || 0);
    return { amountCents: percentOfCents(basis, Number(row.percent)), missingInputs, trace: [`eligible cost ${basis} * ${row.percent}`] };
  }

  if (Number.isFinite(row.maxPercentOfEligibleCost)) {
    const basis = Number(answerValue(ctx.answers, "eligible_project_cost_cents") || ctx.upfrontCostCents || 0);
    return { amountCents: percentOfCents(basis, Number(row.maxPercentOfEligibleCost)), missingInputs, trace: [`eligible cost ${basis} * ${row.maxPercentOfEligibleCost}`] };
  }

  return { amountCents: 0, missingInputs, trace: ["Rate-table row has no supported amount field."] };
}

function quantityForRateTableRow(row, ctx) {
  const unit = String(row.unit || "").toLowerCase();
  if (unit.includes("kwh")) return Number(answerValue(ctx.answers, "annual_kwh_savings") || annualKwhDeltaAbs(ctx));
  if (unit.includes("mcf")) return Number(answerValue(ctx.answers, "annual_mcf_savings") || 0);
  if (unit.includes("therm")) return Number(answerValue(ctx.answers, "annual_therm_savings") || 0);
  if (unit.includes("ton-hour") || unit.includes("ton_hour")) return Number(answerValue(ctx.answers, "ton_hours") || answerValue(ctx.answers, "tons") || 0);
  if (unit.includes("ton")) return Number(answerValue(ctx.answers, "tons") || answerValue(ctx.answers, "tonnage") || 0);
  if (unit.includes("kw")) return Number(answerValue(ctx.answers, "system_kw") || answerValue(ctx.answers, "demand_reduction_kw") || 0);
  if (unit.includes("port")) return Number(answerValue(ctx.answers, "port_count") || answerValue(ctx.answers, "unit_count") || 0);
  if (unit.includes("charger") || unit.includes("station")) return Number(answerValue(ctx.answers, "charger_count") || answerValue(ctx.answers, "unit_count") || 0);
  if (unit.includes("fixture") || unit.includes("lamp") || unit.includes("bulb")) return Number(answerValue(ctx.answers, "fixture_count") || answerValue(ctx.answers, "unit_count") || 0);
  if (unit.includes("thermostat")) return Number(answerValue(ctx.answers, "thermostat_count") || answerValue(ctx.answers, "unit_count") || 0);
  return Number(answerValue(ctx.answers, "unit_count") || 0);
}

function quantityInputForUnit(unit) {
  const value = String(unit || "").toLowerCase();
  if (value.includes("kwh")) return "annual_kwh_savings";
  if (value.includes("mcf")) return "annual_mcf_savings";
  if (value.includes("therm")) return "annual_therm_savings";
  if (value.includes("ton")) return "tons";
  if (value.includes("port")) return "port_count";
  if (value.includes("charger") || value.includes("station")) return "charger_count";
  if (value.includes("fixture") || value.includes("lamp") || value.includes("bulb")) return "fixture_count";
  return "unit_count";
}

function answerForDimension(ctx, dimension) {
  const candidates = [dimension, `${dimension}_type`, `${dimension}_class`, dimension.replace(/^fuel$/, "fuel_type")];
  for (const key of candidates) {
    if (hasAnswer(ctx.answers, key)) return answerValue(ctx.answers, key);
  }
  return null;
}

function firstNumberAnswer(ctx, keys) {
  for (const key of keys || []) {
    const value = numberAnswer(ctx, key);
    if (Number.isFinite(value)) return value;
  }
  return null;
}

function numberAnswer(ctx, key) {
  if (!hasAnswer(ctx.answers, key)) return null;
  const value = Number(answerValue(ctx.answers, key));
  return Number.isFinite(value) ? value : null;
}

function booleanAnswer(ctx, key) {
  if (!hasAnswer(ctx.answers, key)) return null;
  const value = answerValue(ctx.answers, key);
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  const normalized = String(value || "").trim().toLowerCase();
  if (["true", "yes", "y", "approved", "confirmed", "filed"].includes(normalized)) return true;
  if (["false", "no", "n", "not_approved", "not_confirmed", "not_filed"].includes(normalized)) return false;
  return null;
}

function normalizeFraction(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 1;
  if (number > 1) return number / 100;
  return number;
}

function normalizeTaxRate(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  if (number > 1) return number / 100;
  return number;
}

function normalizeDimensionValue(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function measureFiltersSatisfied(measure, ctx) {
  const missingInputs = [];
  for (const filter of [...(measure.customer_filters || []), ...(measure.equipment_filters || [])]) {
    if (!hasAnswer(ctx.answers, filter.input_key)) {
      missingInputs.push({ inputKey: filter.input_key, effectId: measure.measure_id });
      continue;
    }
    const value = answerValue(ctx.answers, filter.input_key);
    if (filter.operator === "equals" && value !== filter.value) return { satisfied: false, missingInputs };
    if (filter.operator === "in" && !filter.values?.includes(value)) return { satisfied: false, missingInputs };
  }
  return { satisfied: missingInputs.length === 0, missingInputs };
}

function applyMeasureLimits(quantity, measure) {
  const sourceRowMaxUnits = Number(measure.calculation?.source_row?.maxUnits);
  const withSourceRowLimit = Number.isFinite(sourceRowMaxUnits) ? Math.min(quantity, sourceRowMaxUnits) : quantity;
  return (measure.limits || []).reduce((current, limit) => {
    if (Number.isFinite(limit.max_count)) return Math.min(current, Number(limit.max_count));
    if (Number.isFinite(limit.max_units)) return Math.min(current, Number(limit.max_units));
    return current;
  }, withSourceRowLimit);
}

function resolveV2Basis(effect, ctx, priorAwards = []) {
  const legacyRule = effect.migration_legacy_rule;
  if (legacyRule) return resolveIncentiveBasis(legacyRule, ctx, priorAwards);
  const costInput = effect.calculation.cost_input || "project_cost_cents";
  return Number(answerValue(ctx.answers, costInput) || ctx.upfrontCostCents || 0);
}

function applyV2Caps(amountCents, caps = [], basisCents = 0) {
  return caps.reduce((current, cap) => {
    const legacyCap = {
      maxAmountCents: cap.cap_type === "maximum_amount" ? moneyToCents(cap.amount) : undefined,
      maxPercentOfBasis: cap.cap_type === "maximum_percent_of_cost" ? cap.percent : undefined
    };
    return applyCaps(current, legacyCap, basisCents);
  }, amountCents);
}

function aggregateEffectResults(effectResults) {
  const totals = emptyTotals();
  for (const result of effectResults) {
    if (
      result.effectType === "one_time_savings" ||
      result.effectType === "tax_credit" ||
      result.effectType === "tax_exemption" ||
      result.effectType === "tax_abatement" ||
      result.effectType === "tax_rate_preference" ||
      result.effectType === "financing_subsidy"
    ) {
      totals.expectedOneTimeSavingsCents += result.amountCents;
    } else if (result.effectType === "property_tax_valuation") {
      totals.expectedRecurringSavingsAnnualCents += result.annualizedAmountCents;
    } else if (result.effectType === "grant_expected_value") {
      totals.expectedGrantAmountCents += result.amountCents;
    } else if (result.effectType === "recurring_savings") {
      totals.expectedRecurringSavingsAnnualCents += result.annualizedAmountCents;
    } else if (result.effectType === "recurring_expense") {
      totals.expectedRecurringExpensesAnnualCents += result.annualizedAmountCents;
    }
  }
  totals.annualNetRecurringBenefitCents =
    totals.expectedRecurringSavingsAnnualCents - totals.expectedRecurringExpensesAnnualCents;
  return totals;
}

function emptyTotals() {
  return {
    expectedOneTimeSavingsCents: 0,
    expectedGrantAmountCents: 0,
    expectedRecurringSavingsAnnualCents: 0,
    expectedRecurringExpensesAnnualCents: 0,
    annualNetRecurringBenefitCents: 0
  };
}

function legacyEffectType(rule) {
  if (rule.incentiveType === "possible_grant") return "grant_expected_value";
  if (rule.incentiveType === "grant") return "one_time_savings";
  if (rule.incentiveType === "tax_credit") return "tax_credit";
  if (
    rule.incentiveType === "recurring_bill_charge" ||
    rule.incentiveType === "tariff_charge" ||
    rule.recurringEffect === "expense" ||
    rule.recurringTreatment === "expense"
  ) {
    return "recurring_expense";
  }
  if ((rule.timing || "upfront") !== "upfront") return "recurring_savings";
  return "one_time_savings";
}

function legacyCalculationSpec(rule) {
  const amountRule = rule.amountRule || { kind: "fixed_amount", amountCents: 0 };

  if (amountRule.kind === "fixed_amount") {
    return { method: "fixed_amount", amount: centsToMoney(amountRule.amountCents || 0) };
  }
  if (amountRule.kind === "fixed_per_unit") {
    return {
      method: "per_unit",
      rate: { amount: centsToMoney(amountRule.amountCentsPerUnit || 0), unit: "unit" },
      quantity_input: amountRule.unitAnswerKey || "unit_count"
    };
  }
  if (amountRule.kind === "percent_of_basis") {
    return { method: "percent_of_cost", percent: Number(amountRule.percent || 0), cost_input: "legacy_incentive_basis" };
  }
  if (amountRule.kind === "rate_per_kw") {
    return {
      method: "per_kw",
      rate: { amount: centsToMoney(amountRule.amountCentsPerKw || 0), unit: "kw" },
      quantity_input: amountRule.kwSource || "system_kw"
    };
  }
  if (amountRule.kind === "rate_per_kwh") {
    return {
      method: "per_kwh",
      rate: { amount: centsToMoney(amountRule.amountCentsPerKwh || 0), unit: "kwh" },
      quantity_input: amountRule.kwhSource || "annual_kwh_delta_abs"
    };
  }
  if (amountRule.kind === "rate_per_battery_kwh") {
    return {
      method: "per_kwh",
      rate: { amount: centsToMoney(amountRule.amountCentsPerBatteryKwh || 0), unit: "kwh" },
      quantity_input: amountRule.batteryKwhSource || "battery_storage_kwh"
    };
  }
  return { method: "zero_when_not_applicable" };
}

function legacyTiming(rule) {
  const timing = rule.timing || "upfront";
  if (timing === "upfront") return { cadence: "one_time" };
  if (timing === "monthly") return { cadence: "monthly" };
  if (timing === "annual") return { cadence: "annual" };
  return { cadence: "custom", notes: timing };
}

function legacyCaps(rule) {
  const caps = [];
  if (Number.isFinite(rule.cap?.maxAmountCents)) {
    caps.push({ cap_type: "maximum_amount", amount: centsToMoney(rule.cap.maxAmountCents), applies_to: "effect" });
  }
  if (Number.isFinite(rule.cap?.maxPercentOfBasis)) {
    caps.push({ cap_type: "maximum_percent_of_cost", percent: rule.cap.maxPercentOfBasis, applies_to: "effect" });
  }
  return caps;
}

function legacyLimits(rule) {
  if (!Number.isFinite(rule.cap?.maxUnits)) return [];
  return [{ scope: "measure", period: "transaction", max_units: rule.cap.maxUnits }];
}

function legacyInputRequirements(rule) {
  const amountRule = rule.amountRule || {};
  const inputKey =
    amountRule.unitAnswerKey ||
    amountRule.kwSource ||
    amountRule.kwhSource ||
    amountRule.batteryKwhSource ||
    rule.userSuppliedBasisAnswerKey ||
    null;
  return inputKey
    ? [
        {
          input_key: inputKey,
          label: inputKey.replace(/_/g, " "),
          value_type: "number",
          required_for: [`effect_${rule.id}`],
          source_precedence: ["user_profile", "retrofit_assumptions", "utility_data"],
          missing_severity: "blocks_calculation"
        }
      ]
    : [];
}

function legacyStacking(rule) {
  if (rule.stacking?.mutualExclusionGroupId) {
    return { stacking_group_id: rule.stacking.mutualExclusionGroupId, behavior: "exclusive" };
  }
  if (rule.stacking?.incompatibleWithOpportunityIds?.length) {
    return { behavior: "exclusive", exclusive_with_opportunity_ids: rule.stacking.incompatibleWithOpportunityIds };
  }
  return { behavior: "unknown_requires_review" };
}

function annualizeAmount(amountCents, timing = {}) {
  if (timing.cadence === "monthly") return amountCents * Math.min(12, timing.max_occurrences || 12);
  if (timing.cadence === "quarterly") return amountCents * Math.min(4, timing.max_occurrences || 4);
  if (timing.cadence === "annual") return amountCents;
  return 0;
}

function annualKwhDeltaAbs(ctx) {
  return Math.abs(
    (ctx.billLineDeltas || [])
      .filter((delta) => delta.canonicalField === "annual_kwh_delta")
      .reduce((total, delta) => total + Number(delta.deltaValue || 0), 0)
  );
}

function missingResult(inputKey, effect) {
  return {
    amountCents: 0,
    missingInputs: [{ inputKey, effectId: effect.effect_id }],
    trace: [`Missing input ${inputKey} for ${effect.effect_id}.`]
  };
}

function dedupeMissingInputs(values) {
  const seen = new Set();
  return values.filter((item) => {
    const key = `${item.inputKey}:${item.effectId || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeSelectedMeasures(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? { measure_id: item, quantity: 1 } : item))
    .filter((item) => item?.measure_id);
}

function centsToMoney(cents) {
  return { value: Number(cents || 0) / 100, currency: "USD" };
}

function moneyToCents(money = {}) {
  return roundCents(Number(money.value || 0) * 100);
}

function rateToCents(rate = {}) {
  return moneyToCents(rate.amount);
}

function sourceRowAmountCents(sourceRow = {}) {
  if (!sourceRow || typeof sourceRow !== "object") return Number.NaN;
  const amountKeys = [
    "amountCents",
    "amountCentsPerUnit",
    "amountCentsPerEligibleChargerOrPort",
    "amountCentsPerStation",
    "maxAmountCentsPerCharger",
    "maxAwardCents",
    "rebateCents",
    "rateCents"
  ];

  for (const key of amountKeys) {
    const amount = Number(sourceRow[key]);
    if (Number.isFinite(amount) && amount > 0) return amount;
  }

  return Number.NaN;
}

function confidenceNumber(value) {
  if (value === "high") return 0.9;
  if (value === "medium") return 0.72;
  if (value === "low") return 0.38;
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.min(1, number)) : 0.62;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function requireString(errors, value, path) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${path} must be a non-empty string.`);
}

function requireObject(errors, value, path) {
  if (!value || typeof value !== "object" || Array.isArray(value)) errors.push(`${path} must be an object.`);
}

function requireArray(errors, value, path) {
  if (!Array.isArray(value)) errors.push(`${path} must be an array.`);
}

function requireEnum(errors, value, allowed, path) {
  if (!allowed.has(value)) errors.push(`${path} has unsupported value: ${value}`);
}
