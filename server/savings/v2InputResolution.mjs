import { answerValue, hasAnswer } from "./labor.mjs";

const COST_ALIASES = [
  "project_cost",
  "project_cost_cents",
  "gross_project_cost_cents",
  "upfront_cost_cents",
  "installed_cost",
  "installed_cost_cents",
  "eligible_project_cost",
  "eligible_project_cost_cents",
  "eligible_cost",
  "eligible_cost_cents",
  "eligible_equipment_cost",
  "eligible_equipment_cost_cents",
  "equipment_cost",
  "equipment_cost_cents",
  "equipment_and_installation_cost",
  "installation_cost",
  "installation_cost_cents",
  "invoice",
  "purchase_price",
  "home_preparation_cost",
  "attic_insulation_invoice_cost",
  "submeter_cost",
  "plan_check_fees"
];

const UNIT_COUNT_ALIASES = [
  "unit_count",
  "unitcount",
  "quantity",
  "equipment_quantity",
  "measure_quantity",
  "eligible_quantity",
  "eligible_unit_count",
  "number_of_units",
  "device_count",
  "installation_count"
];

const PORT_COUNT_ALIASES = ["charger_count", "port_count", "portcount", "level_2_port_count", "eligible_port_count", "number_of_ports"];
const FIXTURE_COUNT_ALIASES = ["fixture_count", "lamp_count", "bulb_count", "lighting_quantity", "lighting_fixture_count"];
const THERMOSTAT_COUNT_ALIASES = ["thermostat_count", "smart_thermostat_count"];
const TON_ALIASES = ["tons", "tonnage", "cooling_tons", "equipment_tons"];
const KW_ALIASES = ["system_kw", "charger_kw", "charger_power_kw", "charger_output_kw", "dcfc_power_kw", "connected_control_kw"];
const KWH_ALIASES = [
  "annual_kwh_savings",
  "annual_kwh_saved",
  "verified_annual_kwh_savings",
  "verified_annual_kwh_saved",
  "annual_kwh_delta_abs",
  "modeled_energy_savings"
];
const THERM_ALIASES = ["annual_therm_savings", "annual_therms_savings", "verified_annual_therm_savings", "annual_therms_saved"];
const PREAPPROVAL_ALIASES = ["preapproval", "preapproval_status", "application_approval_status", "program_enrollment"];

const SYNTHETIC_DEFAULTS = {
  afue: 0.95,
  afue_or_uef: "qualifying",
  afue_or_efficiency_tier: "qualifying",
  seer2: 16,
  seer2_or_efficiency_tier: "qualifying",
  hspf2: 8.5,
  uef: 3.3,
  efficiency_tier: "qualifying",
  equipment_tier: "qualifying",
  equipmenttier: "qualifying",
  equipment_efficiency_tier: "qualifying",
  equipment_efficiency: "qualifying",
  equipment_specifications: "synthetic qualifying equipment",
  equipment_model: "synthetic qualifying model",
  charger_model: "synthetic level 2 charger model",
  charger_type: "level_2",
  charger_level: "level_2",
  fuel_type: "electric",
  project_type: "retrofit",
  project_scope: "synthetic retrofit scope",
  customer_class: "commercial",
  applicant_type: "business",
  participating_utility: true,
  member_account: true,
  proof_of_purchase: true,
  invoice: 0,
  preapproval: true,
  preapproval_status: "not_started_preapproval_required",
  program_enrollment: true,
  installation_date: "2026-07-02",
  purchase_date: "2026-07-02",
  application_date: "2026-07-02",
  funding_availability: "open_while_funds_last",
  award_probability: 0.1,
  square_feet: 1000,
  linear_feet: 100,
  horsepower: 10,
  input_capacity_kbtu_per_hour: 300,
  equipment_capacity: 300,
  tank_gallons: 50,
  cfm_reduction: 500,
  premise_annual_rebate_total: 0,
  old_water_heater_fuel: "gas",
  replacement_fuel: "electric",
  replacement_equipment_type: "qualifying",
  income_status_where_applicable: "standard",
  income_qualification: "standard",
  byoc_enrollment: true,
  fuel_switch_scope: "qualifying",
  site_category: "general_public_access",
  other_rebates_or_tax_credits: 0,
  annual_tax_performance_report_filing_status: "filed",
  business_activity_classification: "qualifying_solar_manufacturing",
  otherwise_applicable_b_o_tax_rate: 0.00484,
  tax_period: "annual",
  deductions_for_interstate_or_foreign_sales: 0,
  multiple_activities_tax_credit_adjustments: 0,
  deductions_or_credits: 0,
  qualifying_taxable_gross_receipts: 10000000,
  approvedzonedesignation: true,
  qualifiedcompanyoperations: true,
  zonetermyears: 15,
  programyear: 1,
  eligiblestateeducationtaxcents: 0,
  eligiblerealpropertytaxcents: 0,
  eligiblepersonalpropertytaxcents: 0,
  eligiblelocalincometaxcents: 0,
  phaseoutschedule: "none",
  eligibletaxliabilitybytype: "synthetic tax profile"
};

export function buildV2ResolvedRuntimeContext(ctx = {}, packages = []) {
  const answers = { ...(ctx.answers || {}) };
  const resolvedInputs = [];

  const add = (key, value, source, options = {}) => {
    if (!key || hasAnswer(answers, key) || value === undefined || value === null || value === "") return false;
    answers[key] = {
      value,
      source,
      canonicalInputKey: options.canonicalInputKey || key,
      defaultIsPlaceholder: Boolean(options.defaultIsPlaceholder),
      defaultConfidence: options.defaultConfidence || null,
      userOverrideAllowed: options.userOverrideAllowed !== false
    };
    resolvedInputs.push({
      inputKey: key,
      canonicalInputKey: answers[key].canonicalInputKey,
      source,
      defaultIsPlaceholder: answers[key].defaultIsPlaceholder,
      defaultConfidence: answers[key].defaultConfidence,
      userOverrideAllowed: answers[key].userOverrideAllowed
    });
    return true;
  };

  addCostAliases({ ctx, answers, add });
  addQuantityAliases({ ctx, answers, add });
  addEnergyAliases({ ctx, answers, add });
  addOperationalAliases({ ctx, answers, add });
  addMeasureSelections({ ctx, packages, answers, add });
  addSyntheticTestCaseDefaults({ ctx, packages, answers, add });

  return {
    ...ctx,
    answers,
    v2ResolvedInputs: resolvedInputs,
    v2SyntheticDefaultsEnabled: Boolean(ctx.allowSyntheticV2Defaults)
  };
}

function addCostAliases({ ctx, answers, add }) {
  const upfrontCostCents = finiteNumber(ctx.upfrontCostCents);
  const equipmentCostCents = sumCostCategory(ctx.baseCostLedgerEntries, "equipment_cost");
  const installationCostCents = sumCostCategory(ctx.baseCostLedgerEntries, "installation_labor");
  const projectCost = firstFiniteAnswer(answers, COST_ALIASES) ?? upfrontCostCents;
  const eligibleCost = firstFiniteAnswer(answers, ["eligible_project_cost_cents", "eligible_project_cost", "eligible_cost_cents", "eligible_cost"]) ?? projectCost;
  const equipmentCost = firstFiniteAnswer(answers, ["equipment_cost_cents", "equipment_cost", "eligible_equipment_cost_cents", "eligible_equipment_cost"]) ?? equipmentCostCents;
  const installationCost = firstFiniteAnswer(answers, ["installation_cost_cents", "installation_cost"]) ?? installationCostCents;

  for (const key of ["project_cost", "project_cost_cents", "gross_project_cost_cents", "upfront_cost_cents", "installed_cost", "installed_cost_cents"]) {
    add(key, projectCost, "derived_project_cost", { canonicalInputKey: "project_cost_cents" });
  }
  for (const key of ["eligible_project_cost", "eligible_project_cost_cents", "eligible_cost", "eligible_cost_cents"]) {
    add(key, eligibleCost, "derived_project_cost", { canonicalInputKey: "eligible_project_cost_cents" });
  }
  for (const key of ["equipment_cost", "equipment_cost_cents", "eligible_equipment_cost", "eligible_equipment_cost_cents"]) {
    add(key, equipmentCost, "derived_equipment_cost", { canonicalInputKey: "equipment_cost_cents" });
  }
  for (const key of ["installation_cost", "installation_cost_cents", "equipment_and_installation_cost"]) {
    add(key, installationCost || projectCost, installationCost ? "derived_installation_cost" : "derived_project_cost", {
      canonicalInputKey: key === "equipment_and_installation_cost" ? "project_cost_cents" : "installation_cost_cents"
    });
  }
  for (const key of ["purchase_price", "invoice", "home_preparation_cost", "attic_insulation_invoice_cost"]) {
    add(key, eligibleCost, "derived_project_cost", { canonicalInputKey: "eligible_project_cost_cents" });
  }
}

function addQuantityAliases({ ctx, answers, add }) {
  const existingGenericUnitCount = firstFiniteAnswer(answers, UNIT_COUNT_ALIASES);
  const genericUnitCount = existingGenericUnitCount ?? 1;
  const fixtureCount = firstFiniteAnswer(answers, FIXTURE_COUNT_ALIASES) ?? genericUnitCount;
  const portCount = firstFiniteAnswer(answers, PORT_COUNT_ALIASES) ?? genericUnitCount;
  const thermostatCount = firstFiniteAnswer(answers, THERMOSTAT_COUNT_ALIASES) ?? genericUnitCount;
  const tons = firstFiniteAnswer(answers, TON_ALIASES) ?? syntheticTonsForRetrofit(ctx.retrofitTypeId);

  for (const key of UNIT_COUNT_ALIASES) {
    add(key, genericUnitCount, "safe_placeholder_default", {
      canonicalInputKey: "unit_count",
      defaultIsPlaceholder: existingGenericUnitCount == null,
      defaultConfidence: "low"
    });
  }
  for (const key of FIXTURE_COUNT_ALIASES) add(key, fixtureCount, "derived_or_placeholder_quantity", { canonicalInputKey: "fixture_count", defaultIsPlaceholder: fixtureCount === 1, defaultConfidence: fixtureCount === 1 ? "low" : null });
  for (const key of PORT_COUNT_ALIASES) add(key, portCount, "derived_or_placeholder_quantity", { canonicalInputKey: "port_count", defaultIsPlaceholder: portCount === 1, defaultConfidence: portCount === 1 ? "low" : null });
  for (const key of THERMOSTAT_COUNT_ALIASES) add(key, thermostatCount, "derived_or_placeholder_quantity", { canonicalInputKey: "thermostat_count", defaultIsPlaceholder: thermostatCount === 1, defaultConfidence: thermostatCount === 1 ? "low" : null });
  for (const key of TON_ALIASES) add(key, tons, "synthetic_or_placeholder_capacity", { canonicalInputKey: "tons", defaultIsPlaceholder: true, defaultConfidence: "low" });
}

function addEnergyAliases({ ctx, answers, add }) {
  const annualKwhSavings = firstFiniteAnswer(answers, KWH_ALIASES) ?? annualDeltaAbs(ctx.billLineDeltas, "annual_kwh_delta");
  const annualThermSavings = firstFiniteAnswer(answers, THERM_ALIASES) ?? annualDeltaAbs(ctx.billLineDeltas, "annual_therms_delta");
  const demandReductionKw = firstFiniteAnswer(answers, ["demand_reduction_kw", "peak_kw_reduction", "peak_kw"]) ?? annualDeltaAbs(ctx.billLineDeltas, "peak_kw_delta");
  const systemKw = firstFiniteAnswer(answers, KW_ALIASES);

  for (const key of KWH_ALIASES) add(key, annualKwhSavings, "derived_bill_delta", { canonicalInputKey: "annual_kwh_savings" });
  for (const key of THERM_ALIASES) add(key, annualThermSavings, "derived_bill_delta", { canonicalInputKey: "annual_therm_savings" });
  add("annual_mcf_savings", annualThermSavings ? annualThermSavings / 10 : undefined, "derived_bill_delta", { canonicalInputKey: "annual_mcf_savings" });
  add("annual_mcf_saved", annualThermSavings ? annualThermSavings / 10 : undefined, "derived_bill_delta", { canonicalInputKey: "annual_mcf_savings" });
  add("demand_reduction_kw", demandReductionKw, "derived_bill_delta", { canonicalInputKey: "demand_reduction_kw" });
  add("peak_kw_reduction", demandReductionKw, "derived_bill_delta", { canonicalInputKey: "demand_reduction_kw" });
  for (const key of KW_ALIASES) add(key, systemKw ?? defaultKwForRetrofit(ctx.retrofitTypeId), systemKw ? "derived_runtime" : "safe_placeholder_default", { canonicalInputKey: key === "charger_power_kw" ? "charger_power_kw" : "system_kw", defaultIsPlaceholder: !systemKw, defaultConfidence: !systemKw ? "low" : null });
}

function addOperationalAliases({ ctx, answers, add }) {
  for (const key of PREAPPROVAL_ALIASES) {
    add(key, ctx.allowSyntheticV2Defaults ? "not_started_preapproval_required" : undefined, "synthetic_test_case_default", {
      canonicalInputKey: "preapproval_status",
      defaultIsPlaceholder: true,
      defaultConfidence: "low"
    });
  }
}

function addMeasureSelections({ ctx, packages, answers, add }) {
  for (const pkg of packages || []) {
    for (const effect of pkg.effects || []) {
      if (effect.calculation?.method !== "measure_catalog") continue;
      const catalog = (pkg.measure_catalogs || []).find((item) => item.catalog_id === effect.calculation.measure_catalog_id);
      if (!catalog) continue;
      const selectionInput = effect.calculation.measure_selection_input || catalog.selection_input || "selected_measures";
      if (hasAnswer(answers, selectionInput)) continue;

      const selectedMeasure = selectMeasure(catalog.measures || [], ctx.retrofitTypeId, Boolean(ctx.allowSyntheticV2Defaults));
      if (!selectedMeasure) continue;
      const quantity = firstFiniteAnswer(answers, UNIT_COUNT_ALIASES) ?? 1;
      add(selectionInput, [{ measure_id: selectedMeasure.measure_id, quantity }], ctx.allowSyntheticV2Defaults ? "synthetic_test_case_measure_selection" : "derived_retrofit_measure_match", {
        canonicalInputKey: "measure_selection",
        defaultIsPlaceholder: Boolean(ctx.allowSyntheticV2Defaults),
        defaultConfidence: ctx.allowSyntheticV2Defaults ? "low" : "medium"
      });
    }
  }
}

function addSyntheticTestCaseDefaults({ ctx, packages, answers, add }) {
  if (!ctx.allowSyntheticV2Defaults) return;
  for (const pkg of packages || []) {
    for (const input of collectPackageInputs(pkg)) {
      const key = input.input_key;
      if (!key || hasAnswer(answers, key)) continue;
      add(key, syntheticDefaultForInput(key, input.value_type, ctx), "synthetic_test_case_default", {
        canonicalInputKey: canonicalInputKeyFor(key),
        defaultIsPlaceholder: true,
        defaultConfidence: "low"
      });
    }
  }
}

function collectPackageInputs(pkg) {
  const inputs = [...(pkg.input_requirements || [])];
  for (const effect of pkg.effects || []) inputs.push(...(effect.required_inputs || []));
  const seen = new Set();
  return inputs
    .map((input) => (typeof input === "string" ? { input_key: input, value_type: "text" } : input))
    .filter((input) => input?.input_key)
    .filter((input) => {
      if (seen.has(input.input_key)) return false;
      seen.add(input.input_key);
      return true;
    });
}

function syntheticDefaultForInput(key, valueType, ctx) {
  if (Object.prototype.hasOwnProperty.call(SYNTHETIC_DEFAULTS, key)) return SYNTHETIC_DEFAULTS[key];
  if (/date/.test(key)) return "2026-07-02";
  if (/cost|price|invoice|receipt|basis|taxcents|liability/.test(key)) return finiteNumber(ctx.upfrontCostCents) ?? 100000;
  if (/count|quantity|number|units|ports|chargers|doors|systems|vehicles/.test(key)) return 1;
  if (/tons|tonnage/.test(key)) return syntheticTonsForRetrofit(ctx.retrofitTypeId);
  if (/kwh/.test(key)) return annualDeltaAbs(ctx.billLineDeltas, "annual_kwh_delta") || 1000;
  if (/therm|mcf/.test(key)) return annualDeltaAbs(ctx.billLineDeltas, "annual_therms_delta") || 100;
  if (/kw/.test(key)) return defaultKwForRetrofit(ctx.retrofitTypeId);
  if (/percent|rate/.test(key)) return 0.1;
  if (/approved|qualif|eligible|confirm|enroll|status|account|proof|report/.test(key)) return true;
  if (valueType === "number" || valueType === "integer") return 1;
  if (valueType === "boolean") return true;
  return "synthetic_test_case_value";
}

function selectMeasure(measures, retrofitTypeId, allowSynthetic) {
  const calculableMeasures = measures.filter((measure) => measure?.measure_id && measureHasCalculableValue(measure));
  if (calculableMeasures.length === 1) return calculableMeasures[0];

  const retrofitTokens = tokensFor(retrofitTypeId);
  const scored = calculableMeasures
    .map((measure) => ({
      measure,
      score: scoreMeasure(measure, retrofitTokens),
      amountCents: measureAmountCents(measure)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.amountCents - b.amountCents);

  if (scored[0]?.score >= 2) return scored[0].measure;
  if (!allowSynthetic) return null;
  return [...calculableMeasures].sort((a, b) => measureAmountCents(a) - measureAmountCents(b))[0] || null;
}

function measureHasCalculableValue(measure) {
  const calculation = measure.calculation || {};
  return calculation.method !== "zero_when_not_applicable" && Number.isFinite(measureAmountCents(measure));
}

function measureAmountCents(measure) {
  const calculation = measure.calculation || {};
  if (calculation.method === "fixed_amount") return moneyToCents(calculation.amount);
  if (calculation.method === "per_unit") return moneyToCents(calculation.rate?.amount);
  if (calculation.method === "percent_of_cost") return Number.POSITIVE_INFINITY;
  return Number.POSITIVE_INFINITY;
}

function scoreMeasure(measure, retrofitTokens) {
  const text = tokensFor(`${measure.measure_id || ""} ${measure.name || ""} ${measure.source_row?.measure || ""}`);
  return retrofitTokens.reduce((score, token) => score + (text.includes(token) ? 1 : 0), 0);
}

function tokensFor(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/ev/g, "electric vehicle")
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 3 && !["retrofit", "replacement", "installation", "system", "high", "efficiency"].includes(token));
}

function canonicalInputKeyFor(key) {
  if (COST_ALIASES.includes(key)) return key.includes("eligible") ? "eligible_project_cost_cents" : "project_cost_cents";
  if (UNIT_COUNT_ALIASES.includes(key)) return "unit_count";
  if (PORT_COUNT_ALIASES.includes(key)) return "port_count";
  if (FIXTURE_COUNT_ALIASES.includes(key)) return "fixture_count";
  if (THERMOSTAT_COUNT_ALIASES.includes(key)) return "thermostat_count";
  if (KWH_ALIASES.includes(key)) return "annual_kwh_savings";
  if (THERM_ALIASES.includes(key)) return "annual_therm_savings";
  return key;
}

function firstFiniteAnswer(answers, keys) {
  for (const key of keys) {
    if (!hasAnswer(answers, key)) continue;
    const value = finiteNumber(answerValue(answers, key));
    if (value !== null) return value;
  }
  return null;
}

function finiteNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function sumCostCategory(entries = [], category) {
  const total = (entries || [])
    .filter((entry) => entry.category === category)
    .reduce((sum, entry) => sum + Number(entry.amountCents || 0), 0);
  return Number.isFinite(total) && total > 0 ? total : null;
}

function annualDeltaAbs(deltas = [], canonicalField) {
  const total = (deltas || [])
    .filter((delta) => delta.canonicalField === canonicalField)
    .reduce((sum, delta) => sum + Number(delta.deltaValue || 0), 0);
  const abs = Math.abs(total);
  return Number.isFinite(abs) && abs > 0 ? abs : null;
}

function syntheticTonsForRetrofit(retrofitTypeId) {
  if (/hvac|heat_pump|geothermal|thermal/i.test(retrofitTypeId || "")) return 3;
  return 1;
}

function defaultKwForRetrofit(retrofitTypeId) {
  if (/dc_fast/i.test(retrofitTypeId || "")) return 150;
  if (/ev|charger/i.test(retrofitTypeId || "")) return 19.2;
  if (/solar/i.test(retrofitTypeId || "")) return 50;
  return 1;
}

function moneyToCents(money = {}) {
  return Number(money?.value || 0) * 100;
}
