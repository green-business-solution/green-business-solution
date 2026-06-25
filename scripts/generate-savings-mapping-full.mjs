import fs from "node:fs";
import path from "node:path";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const scanPath = process.env.OPPORTUNITY_SCAN_PATH || "/tmp/retrofi-opportunity-scan-all.json";

const savingsModels = readJson(path.join(dataDir, "savings_models.json"));
const modelById = new Map(savingsModels.map((model) => [model.id, model]));

const source = readJson(scanPath);
const opportunities = (source.Items || []).map((item) => unmarshall(item)).filter((item) => item?.opportunityId);

const mapping = opportunities.map(classifyOpportunity);
const unmapped = mapping.filter((record) => record.primary_savings_model_id === "no_direct_savings");
const uncertain = mapping.filter((record) => record.manual_review_required);

writeJson("opportunity_savings_mapping.json", mapping);
writeCsv("opportunity_savings_mapping_import.csv", mapping);
writeReport("savings_model_coverage_report.md", mapping, {
  totalSourceRecords: opportunities.length,
  mappedCount: mapping.length,
  skippedCount: (source.Items || []).length - opportunities.length,
  uncertainCount: uncertain.length,
  manualReviewCount: mapping.filter((record) => record.manual_review_required).length,
  unmapped
});

console.log(`Full savings mapping dry run complete.`);
console.log(`Processed: ${opportunities.length}`);
console.log(`Mapped: ${mapping.length}`);
console.log(`Skipped: ${(source.Items || []).length - opportunities.length}`);
console.log(`Uncertain: ${uncertain.length}`);
console.log(`Manual review required: ${mapping.filter((record) => record.manual_review_required).length}`);

function classifyOpportunity(opportunity) {
  const text = searchableText(opportunity);
  const businessRelevance = classifyBusinessRelevance(opportunity);
  const classification = classifyModels(opportunity, text);
  const primaryModel = modelById.get(classification.primary);
  const models = [classification.primary, ...classification.secondary].map((id) => modelById.get(id)).filter(Boolean);
  const valueRoles = valueRolesForMapping({
    modelIds: [classification.primary, ...classification.secondary],
    incentiveMethod: classification.incentiveValueMethod,
    readiness: classification.calculationReadiness
  });
  const confidence = confidenceFor({ opportunity, text, businessRelevance, classification });
  const v1Readiness = v1ReadinessFor({
    businessRelevance,
    classification,
    modelIds: [classification.primary, ...classification.secondary],
    valueRoles
  });
  const exclusionOrDelayReason = exclusionOrDelayReasonFor({
    businessRelevance,
    classification,
    v1Readiness,
    text,
    opportunity
  });
  const manualReviewRequired = shouldRequireManualReview({
    opportunity,
    text,
    modelIds: [classification.primary, ...classification.secondary],
    confidence,
    businessRelevance,
    readiness: classification.calculationReadiness,
    incentiveMethod: classification.incentiveValueMethod,
    valueRoles
  });

  return {
    opportunity_id: opportunity.opportunityId,
    opportunity_name: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
    primary_savings_model_id: classification.primary,
    secondary_savings_model_ids: classification.secondary,
    value_roles: valueRoles,
    business_relevance: businessRelevance,
    affected_bill_types: unique(models.flatMap((model) => model.affected_bill_types)),
    required_bill_fields: unique(primaryModel?.required_bill_fields || []),
    optional_bill_fields: unique(models.flatMap((model) => model.optional_bill_fields || [])),
    required_non_bill_inputs: unique(primaryModel?.required_non_bill_inputs || []),
    optional_non_bill_inputs: unique(models.flatMap((model) => model.optional_non_bill_inputs || [])),
    incentive_value_method: classification.incentiveValueMethod,
    project_cost_estimation_method: classification.projectCostMethod,
    calculation_readiness: classification.calculationReadiness,
    v1_readiness: v1Readiness,
    exclusion_or_delay_reason: exclusionOrDelayReason,
    confidence,
    classification_reason: classification.reason,
    missing_data_prompts: primaryModel?.missing_data_prompts || [],
    manual_review_required: manualReviewRequired
  };
}

function classifyModels(opportunity, text) {
  const programType = String(opportunity.programType || "").toLowerCase();
  const title = String(opportunity.canonicalTitle || "").toLowerCase();
  const marketCreditText = `${title} ${programType}`;
  const techs = toTextArray(opportunity.technologies);
  const technologyCount = techs.length;
  const secondary = [];

  if (matches(marketCreditText, ["srec", "renewable energy credit", "renewable energy credits", "solar renewable energy credit", "rec market"])) {
    addSecondary(secondary, "solar_electric_offset");
    return result("renewable_generation_credit_market_value", secondary, "unknown", "unknown", "policy_only", "Market-credit program creates REC/SREC value separate from direct utility bill savings.");
  }

  if (matches(text, ["net metering", "net billing", "export credit", "export compensation"])) {
    addSecondary(secondary, "solar_electric_offset");
    return result("net_metering_or_export_value", secondary, "unknown", "unknown", "policy_only", "Export compensation or net-metering rule affects distributed generation value.");
  }

  if (matches(text, ["interconnection", "grid access", "queue", "make-ready tariff"])) {
    return result("interconnection_or_grid_access_value", secondary, "unknown", "unknown", "policy_only", "Interconnection or grid-access rule affects project feasibility or delivery.");
  }

  if (matches(text, ["expedited permit", "permitting", "permit program", "green building incentive", "certification"])) {
    return result("program_rule_value_only", secondary, "unknown", "unknown", "policy_only", "Program rule affects permitting, timing, or certification rather than direct financial savings.");
  }

  if (matches(programType, ["pace"]) || matches(title, ["pace"])) {
    return result("pace_or_on_bill_financing", secondary, "financing", "contractor_quote_required", "needs_quote", "PACE financing changes project cash flow and requires project cost and financing terms.");
  }

  if (matches(text, ["on-bill financing", "on bill financing", "loan program", "zero-interest loan", "low interest loan", "financing"]) || programType.includes("loan")) {
    attachMeasureSecondaries(secondary, text);
    return result("financing_cash_flow", secondary, "financing", "contractor_quote_required", "needs_quote", "Loan or financing program affects cash flow; measure-specific savings depend on final project scope.");
  }

  if (matches(programType, ["sales tax"]) || matches(text, ["sales tax exemption", "sales and use tax", "property tax exemption", "property tax incentive", "tax exemption"])) {
    attachMeasureSecondaries(secondary, text);
    return result("sales_or_property_tax_exemption", secondary, "tax_exemption", "benchmark_range", "needs_tax_review", "Tax exemption reduces sales or property tax cost for eligible project equipment.");
  }

  if (matches(programType, ["tax credit", "tax deduction"]) || matches(text, ["tax credit", "tax deduction", "income tax credit", "business activity tax credit"])) {
    attachMeasureSecondaries(secondary, text);
    return result("tax_benefit_project_cost_reduction", secondary, "tax_credit", "benchmark_range", "needs_tax_review", "Tax incentive value depends on eligible cost and taxpayer status.");
  }

  if (matches(programType, ["grant", "solicitation"]) || matches(text, ["grant program", "solicitation", "funding opportunity", "grant funding"])) {
    attachMeasureSecondaries(secondary, text);
    return result("grant_funding", secondary, "grant_amount", "contractor_quote_required", "needs_quote", "Grant or solicitation reduces upfront project cost; award amount and scope need project details.");
  }

  if (matches(text, ["fleet", "medium-duty electric", "heavy-duty electric", "clean vehicle", "electric vehicles", "passenger electric vehicles", "truck voucher"])) {
    addSecondary(secondary, "ev_charging_site_load");
    return result("fleet_fuel_replacement", secondary, "per_unit", "cost_per_unit", "needs_equipment_details", "Fleet or vehicle incentive affects fuel replacement economics.");
  }

  if (matches(text, ["ev charger", "ev charging", "electric vehicle service equipment", "level-2", "dc fast charging", "make-ready equipment"])) {
    return result("ev_charging_site_load", ["project_cost_reduction_only"], "per_unit", "cost_per_unit", "needs_quote", "EV charging incentive affects charger project cost and site electric load.");
  }

  if (matches(text, ["lithium-ion", "battery storage", "energy storage", "storage system"])) {
    return result("battery_tou_demand_savings", ["project_cost_reduction_only"], "per_unit", "cost_per_kwh_storage", "needs_equipment_details", "Battery or storage opportunity requires rate, demand, and storage-size inputs.");
  }

  if (matches(text, ["solar photovoltaic", "solar pv", "solar electric", "solar panel", "solar energy", "photovoltaic"])) {
    return result("solar_electric_offset", ["project_cost_reduction_only"], "per_kw", "cost_per_kw", "needs_bill", "Solar PV opportunity primarily affects electric bill offset and project cost.");
  }

  if (matches(text, ["custom", "whole building", "comprehensive measures", "market transformation", "energy study"]) && technologyCount >= 6) {
    attachMeasureSecondaries(secondary, text);
    return result("whole_building_custom_efficiency", secondary, "per_kwh_saved", "benchmark_range", "needs_bill", "Broad or custom efficiency program needs site bill baseline and project-scope definition.");
  }

  if (matches(text, ["commercial refrigeration", "refrigeration equipment", "refrigerators/freezers", "freezer", "vending machine controls"])) {
    addSecondary(secondary, "electric_usage_reduction");
    return result("refrigeration_electric_efficiency", secondary, "per_unit", "cost_per_unit", "needs_equipment_details", "Refrigeration equipment incentive maps to electric refrigeration savings.");
  }

  if (matches(text, ["food service", "commercial cooking", "commercial kitchen", "dishwasher", "cooking equipment"])) {
    addSecondary(secondary, "water_sewer_reduction");
    return result("commercial_kitchen_equipment_efficiency", secondary, "per_unit", "cost_per_unit", "needs_equipment_details", "Food-service or dishwasher equipment affects kitchen energy and possibly water/sewer use.");
  }

  if (matches(text, ["motor vfd", "variable frequency", "motors", "compressed air", "variable speed", "pumps"])) {
    return result("motor_vfd_efficiency", secondary, "per_unit", "cost_per_unit", "needs_equipment_details", "Motor, VFD, pump, or compressed-air opportunity maps to electric motor efficiency.");
  }

  if (matches(text, ["building controls", "energy mgmt", "energy management", "programmable thermostat", "lighting controls", "load management", "automatic temperature controls"])) {
    return result("controls_building_automation", secondary, "per_unit", "benchmark_range", "needs_equipment_details", "Controls or automation opportunity affects electric and demand savings.");
  }

  if (matches(text, ["heat pump", "air conditioner", "chiller", "hvac", "ductless mini-split", "cold climate heat pump"])) {
    return result("hvac_electric_efficiency", ["project_cost_reduction_only"], "per_unit", "cost_per_unit", "needs_bill", "HVAC or heat-pump opportunity primarily affects electric HVAC efficiency.");
  }

  if (matches(text, ["furnace", "boiler", "water heater", "tankless water heater", "steam-system", "gas appliance"])) {
    return result("gas_usage_reduction", ["project_cost_reduction_only"], "per_unit", "cost_per_unit", "needs_bill", "Gas equipment opportunity primarily affects therm usage and gas cost.");
  }

  if (matches(text, ["clothes washer", "watersense", "water efficiency", "irrigation", "cooling tower", "toilet", "fixture"])) {
    return result("water_sewer_reduction", ["project_cost_reduction_only"], "per_unit", "cost_per_unit", "needs_equipment_details", "Water-using equipment or fixture opportunity maps to water and sewer savings.");
  }

  if (matches(text, ["insulation", "air sealing", "windows", "doors", "roofs", "reflective roofs", "weather-stripping", "building envelope"])) {
    return result("envelope_insulation_savings", ["project_cost_reduction_only"], "per_unit", "cost_per_sqft", "needs_bill", "Envelope opportunity affects heating and cooling load.");
  }

  if (matches(text, ["lighting", "led"])) {
    return result("electric_usage_reduction", ["project_cost_reduction_only"], "per_unit", "cost_per_unit", "needs_bill", "Lighting or LED opportunity maps to electric usage reduction and upfront rebate value.");
  }

  if (matches(programType, ["rebate", "performance-based incentive"])) {
    attachMeasureSecondaries(secondary, text);
    return result("project_cost_reduction_only", secondary, "per_unit", "benchmark_range", "needs_equipment_details", "Rebate or performance incentive reduces project cost, but source text does not identify a specific reusable savings model.");
  }

  if (matches(text, ["policy", "standard", "requirement", "rule"])) {
    return result("program_rule_value_only", secondary, "unknown", "unknown", "policy_only", "Program appears to be a policy or rule without direct savings model details.");
  }

  return result("no_direct_savings", secondary, "unknown", "unknown", "unknown", "No deterministic financial value path was identified from available source fields.");
}

function attachMeasureSecondaries(secondary, text) {
  if (matches(text, ["lighting", "led"])) addSecondary(secondary, "electric_usage_reduction");
  if (matches(text, ["solar photovoltaic", "solar pv", "solar electric"])) addSecondary(secondary, "solar_electric_offset");
  if (matches(text, ["heat pump", "air conditioner", "chiller", "hvac"])) addSecondary(secondary, "hvac_electric_efficiency");
  if (matches(text, ["furnace", "boiler", "water heater", "gas appliance"])) addSecondary(secondary, "gas_usage_reduction");
  if (matches(text, ["refrigeration", "freezer"])) addSecondary(secondary, "refrigeration_electric_efficiency");
  if (matches(text, ["motor", "vfd", "compressed air", "pump"])) addSecondary(secondary, "motor_vfd_efficiency");
  if (matches(text, ["controls", "thermostat", "energy management", "load management"])) addSecondary(secondary, "controls_building_automation");
  if (matches(text, ["food service", "commercial cooking", "dishwasher"])) addSecondary(secondary, "commercial_kitchen_equipment_efficiency");
  if (matches(text, ["ev charging", "electric vehicle service equipment", "level-2", "dc fast charging"])) addSecondary(secondary, "ev_charging_site_load");
  if (matches(text, ["battery", "storage", "lithium-ion"])) addSecondary(secondary, "battery_tou_demand_savings");
  if (matches(text, ["water efficiency", "clothes washer", "watersense", "irrigation"])) addSecondary(secondary, "water_sewer_reduction");
}

function result(primary, secondary, incentiveValueMethod, projectCostMethod, calculationReadiness, reason) {
  return {
    primary,
    secondary: unique(secondary.filter((modelId) => modelId !== primary && modelById.has(modelId))),
    incentiveValueMethod,
    projectCostMethod,
    calculationReadiness,
    reason
  };
}

function confidenceFor({ opportunity, text, businessRelevance, classification }) {
  if (classification.primary === "no_direct_savings" || businessRelevance === "unknown") return "low";
  if (classification.primary === "program_rule_value_only" || classification.primary === "renewable_generation_credit_market_value") return "high";
  if (classification.calculationReadiness === "policy_only") return "high";
  if (toArray(opportunity.technologies).length >= 8 || matches(text, ["custom", "whole building", "variety of", "wide range"])) return "medium";
  if (classification.calculationReadiness === "needs_tax_review") return "medium";
  return "high";
}

function valueRolesForMapping({ modelIds, incentiveMethod, readiness }) {
  const roles = new Set();

  if (modelIds.some((id) => [
    "electric_usage_reduction",
    "electric_demand_reduction",
    "hvac_electric_efficiency",
    "gas_usage_reduction",
    "gas_to_electric_replacement",
    "solar_electric_offset",
    "battery_tou_demand_savings",
    "ev_charging_site_load",
    "fleet_fuel_replacement",
    "water_sewer_reduction",
    "waste_hauling_cost_reduction",
    "commercial_kitchen_equipment_efficiency",
    "refrigeration_electric_efficiency",
    "motor_vfd_efficiency",
    "controls_building_automation",
    "envelope_insulation_savings",
    "custom_incentive_per_kwh_saved",
    "whole_building_custom_efficiency",
    "net_metering_or_export_value"
  ].includes(id))) roles.add("bill_savings");

  if (modelIds.some((id) => ["project_cost_reduction_only", "rebate_per_unit_or_equipment_count", "grant_funding"].includes(id)) || ["fixed_amount", "percent_of_project_cost", "capped_percent_of_project_cost", "per_unit", "per_kw", "per_kwh_saved", "per_ton", "grant_amount"].includes(incentiveMethod)) roles.add("upfront_cost_reduction");
  if (modelIds.some((id) => ["tax_benefit_project_cost_reduction", "sales_or_property_tax_exemption"].includes(id)) || ["tax_credit", "tax_deduction", "tax_exemption"].includes(incentiveMethod)) roles.add("tax_benefit");
  if (modelIds.some((id) => ["financing_cash_flow", "pace_or_on_bill_financing"].includes(id)) || incentiveMethod === "financing") roles.add("financing");
  if (modelIds.some((id) => ["policy_or_permitting_value", "program_rule_value_only", "interconnection_or_grid_access_value"].includes(id)) || readiness === "policy_only") roles.add("policy_or_permitting");
  if (modelIds.includes("renewable_generation_credit_market_value")) roles.add("market_credit");
  if (modelIds.includes("no_direct_savings") || roles.size === 0) roles.add("no_direct_savings");
  return [...roles];
}

function classifyBusinessRelevance(opportunity) {
  const sectors = toTextArray([...toArray(opportunity.sectors), ...toArray(opportunity.eligibleSectors)]);
  const text = [opportunity.canonicalTitle, opportunity.summary, opportunity.programType, ...sectors].join(" ").toLowerCase();
  const hasResidential = /\bresidential\b|homeowner|homes?\b|multifamily residential|low income residential/.test(text);
  const hasBusiness = /\bcommercial\b|\bindustrial\b|\bbusiness\b|non-residential|nonresidential|institutional/.test(text);
  const hasPublicNonprofit = /school|local government|state government|federal government|public sector|nonprofit|municipal/.test(text);
  const hasAgriculture = /agricultural|agriculture|farm|rural/.test(text);
  if (hasBusiness && hasResidential) return "mixed";
  if (hasBusiness) return "business_relevant";
  if (hasResidential) return "residential_only";
  if (hasAgriculture && !hasBusiness) return "agriculture_only";
  if (hasPublicNonprofit && !hasBusiness) return "public_nonprofit_only";
  return "unknown";
}

function v1ReadinessFor({ businessRelevance, classification, modelIds, valueRoles }) {
  if (businessRelevance === "residential_only" || businessRelevance === "public_nonprofit_only" || businessRelevance === "agriculture_only") {
    return "not_v1_relevant";
  }

  if (businessRelevance === "unknown") return "unknown";
  if (modelIds.includes("no_direct_savings")) return "unknown";
  if (modelIds.includes("renewable_generation_credit_market_value") && valueRoles.length === 1) return "market_credit_only";
  if (classification.calculationReadiness === "policy_only") return "policy_only";
  if (classification.calculationReadiness === "needs_tax_review") return "needs_tax_context";
  if (modelIds.some((id) => ["financing_cash_flow", "pace_or_on_bill_financing"].includes(id))) return "needs_financing_terms";
  if (classification.calculationReadiness === "needs_quote") return "needs_quote";
  if (classification.calculationReadiness === "needs_bill") return "needs_bill_data";
  if (classification.primary === "whole_building_custom_efficiency" || classification.calculationReadiness === "needs_equipment_details") return "needs_project_scope";
  if (businessRelevance === "mixed") return "needs_project_scope";
  return "v1_ready";
}

function exclusionOrDelayReasonFor({ businessRelevance, classification, v1Readiness, text, opportunity }) {
  if (businessRelevance === "residential_only") return "residential_only";
  if (businessRelevance === "public_nonprofit_only") return "public_nonprofit_only";
  if (businessRelevance === "agriculture_only") return "agriculture_only";
  if (v1Readiness === "policy_only") return "policy_only";
  if (v1Readiness === "market_credit_only") return "market_credit_only";
  if (v1Readiness === "needs_tax_context") return "tax_context_required";
  if (v1Readiness === "needs_financing_terms") return "financing_only";
  if (v1Readiness === "needs_quote") return "project_scope_required";
  if (classification.primary === "whole_building_custom_efficiency" || toArray(opportunity.technologies).length >= 8 || matches(text, ["custom", "whole building", "market transformation", "wide range", "variety of"])) return "broad_custom_program";
  if (v1Readiness === "needs_project_scope") return "project_scope_required";
  if (v1Readiness === "needs_bill_data") return "project_scope_required";
  if (v1Readiness === "unknown") return "insufficient_data";
  return "";
}

function shouldRequireManualReview({ opportunity, text, modelIds, confidence, businessRelevance, readiness, incentiveMethod, valueRoles }) {
  const broadOrCustom = toArray(opportunity.technologies).length >= 8 || matches(text, ["custom", "whole building", "market transformation", "wide range", "variety of"]);
  const unclearBroadCustom = broadOrCustom && modelIds.length <= 1;
  const valueRoleConflict =
    modelIds.includes("no_direct_savings") && valueRoles.some((role) => role !== "no_direct_savings");
  const unclearIncentive = incentiveMethod === "unknown" && !["policy_only", "unknown"].includes(readiness);

  return (
    businessRelevance === "unknown" ||
    modelIds.includes("no_direct_savings") ||
    unclearBroadCustom ||
    readiness === "unknown" ||
    unclearIncentive ||
    valueRoleConflict ||
    (confidence === "low" && businessRelevance === "unknown")
  );
}

function writeJson(filename, value) {
  fs.writeFileSync(path.join(dataDir, filename), `${JSON.stringify(value, null, 2)}\n`);
}

function writeCsv(filename, records) {
  const columns = [
    "opportunity_id",
    "primary_savings_model_id",
    "secondary_savings_model_ids",
    "value_roles",
    "business_relevance",
    "affected_bill_types",
    "required_bill_fields",
    "optional_bill_fields",
    "required_non_bill_inputs",
    "incentive_value_method",
    "project_cost_estimation_method",
    "calculation_readiness",
    "v1_readiness",
    "exclusion_or_delay_reason",
    "confidence",
    "manual_review_required"
  ];
  const lines = [
    columns.join(","),
    ...records.map((record) =>
      columns
        .map((column) => {
          const value = record[column];
          const normalized = Array.isArray(value) ? value.join("|") : String(value ?? "");
          return `"${normalized.replaceAll('"', '""')}"`;
        })
        .join(",")
    )
  ];
  fs.writeFileSync(path.join(dataDir, filename), `${lines.join("\n")}\n`);
}

function writeReport(filename, records, summary) {
  const byModel = countBy(records, (record) => record.primary_savings_model_id);
  const byRole = countBy(records.flatMap((record) => record.value_roles), (role) => role);
  const byRelevance = countBy(records, (record) => record.business_relevance);
  const byManualReview = countBy(records, (record) => String(record.manual_review_required));
  const byConfidence = countBy(records, (record) => record.confidence);
  const byV1Readiness = countBy(records, (record) => record.v1_readiness);
  const byDelayReason = countBy(records, (record) => record.exclusion_or_delay_reason || "none");
  const uncertain = records.filter((record) => record.manual_review_required);
  const movedOutExamples = records.filter((record) => !record.manual_review_required && record.exclusion_or_delay_reason).slice(0, 50);
  const topModels = Object.entries(byModel).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const lines = [
    "# Savings Model Coverage Report - Full Dry Run",
    "",
    "## Source Database",
    "",
    "- Source table inspected: `gbs-opportunity-candidates`",
    "- Source file: `/tmp/retrofi-opportunity-scan-all.json`",
    "- Production opportunity records were not mutated.",
    "- No records were imported into production.",
    "",
    "## Summary",
    "",
    `- Total opportunities analyzed: ${summary.totalSourceRecords}`,
    `- Total mapped: ${summary.mappedCount}`,
    `- Total skipped: ${summary.skippedCount}`,
    `- Savings models in library: ${savingsModels.length}`,
    `- Manual review required: ${summary.manualReviewCount}`,
    `- Manual review not required: ${records.length - summary.manualReviewCount}`,
    `- True classification-uncertain opportunities: ${summary.uncertainCount}`,
    `- Unmapped/no-direct-savings records: ${summary.unmapped.length}`,
    `- Residential-only count: ${byRelevance.residential_only || 0}`,
    `- Business-relevant count: ${byRelevance.business_relevant || 0}`,
    "",
    "## Savings Model Distribution",
    "",
    "| Savings model | Count | Percent |",
    "| --- | ---: | ---: |",
    ...topModels.map(([modelId, count]) => `| \`${modelId}\` | ${count} | ${percent(count, records.length)} |`),
    "",
    "## Top 20 Savings Models By Count",
    "",
    "| Savings model | Count | Percent |",
    "| --- | ---: | ---: |",
    ...topModels.slice(0, 20).map(([modelId, count]) => `| \`${modelId}\` | ${count} | ${percent(count, records.length)} |`),
    "",
    "## Value Role Distribution",
    "",
    "| Value role | Count | Percent |",
    "| --- | ---: | ---: |",
    ...Object.entries(byRole).sort((a, b) => b[1] - a[1]).map(([role, count]) => `| \`${role}\` | ${count} | ${percent(count, records.length)} |`),
    "",
    "## Business Relevance Distribution",
    "",
    "| Business relevance | Count | Percent |",
    "| --- | ---: | ---: |",
    ...Object.entries(byRelevance).sort((a, b) => b[1] - a[1]).map(([relevance, count]) => `| \`${relevance}\` | ${count} | ${percent(count, records.length)} |`),
    "",
    "## V1 Readiness Distribution",
    "",
    "| V1 readiness | Count | Percent |",
    "| --- | ---: | ---: |",
    ...Object.entries(byV1Readiness).sort((a, b) => b[1] - a[1]).map(([readiness, count]) => `| \`${readiness}\` | ${count} | ${percent(count, records.length)} |`),
    "",
    "## Exclusion Or Delay Reason Distribution",
    "",
    "| Reason | Count | Percent |",
    "| --- | ---: | ---: |",
    ...Object.entries(byDelayReason).sort((a, b) => b[1] - a[1]).map(([reason, count]) => `| \`${reason}\` | ${count} | ${percent(count, records.length)} |`),
    "",
    "## Manual Review Required Vs Not Required",
    "",
    "| Manual review required | Count | Percent |",
    "| --- | ---: | ---: |",
    ...["true", "false"].map((key) => `| ${key} | ${byManualReview[key] || 0} | ${percent(byManualReview[key] || 0, records.length)} |`),
    "",
    "## Confidence Distribution",
    "",
    "| Confidence | Count | Percent |",
    "| --- | ---: | ---: |",
    ...["high", "medium", "low"].map((key) => `| ${key} | ${byConfidence[key] || 0} | ${percent(byConfidence[key] || 0, records.length)} |`),
    "",
    "## Examples No Longer Requiring Manual Review",
    "",
    "These records are clearly classified but delayed or excluded from V1 for product-readiness reasons.",
    "",
    ...movedOutExamples.map((record) => `- \`${record.opportunity_id}\` - ${record.opportunity_name}: \`${record.primary_savings_model_id}\`, readiness \`${record.v1_readiness}\`, reason \`${record.exclusion_or_delay_reason || "none"}\`.`),
    "",
    "## Remaining True Manual-Review Records",
    "",
    `Total true manual-review records: ${uncertain.length}. Showing the first 200 with classifier-uncertainty reasons.`,
    "",
    ...uncertain.slice(0, 200).map((record) => `- \`${record.opportunity_id}\` - ${record.opportunity_name}: \`${record.primary_savings_model_id}\`, ${record.confidence}, relevance \`${record.business_relevance}\`, reason \`${manualReviewReason(record)}\`.`),
    "",
    "## Unmapped Records",
    "",
    summary.unmapped.length === 0 ? "- None." : `Total no-direct-savings/unmapped records: ${summary.unmapped.length}. Showing the first 100.`,
    "",
    ...summary.unmapped.slice(0, 100).map((record) => `- \`${record.opportunity_id}\` - ${record.opportunity_name}`),
    "",
    "## Recommended Manual-Review Priorities Before Production Import",
    "",
    "1. Review true manual-review rows first: unknown business relevance, no-direct-savings rows, and broad/custom rows with unclear model support.",
    "2. Separately plan V1 gating for `residential_only`, `public_nonprofit_only`, `agriculture_only`, policy-only, tax-context, financing-term, and project-scope queues.",
    "3. Confirm incentive amount/cap fields before production import; current dry-run classification maps value type, not final dollar formulas.",
    "",
    "## Recommendation",
    "",
    "The full dry run is ready for review/import planning, but not production import. The next step should be human review of true classifier-uncertainty rows, followed by V1 queue planning using `v1_readiness` and `exclusion_or_delay_reason`."
  ];
  fs.writeFileSync(path.join(dataDir, filename), `${lines.join("\n")}\n`);
}

function manualReviewReason(record) {
  if (record.business_relevance === "unknown") return "business_relevance_unknown";
  if (record.primary_savings_model_id === "no_direct_savings") return "no_value_path_identified";
  if (record.calculation_readiness === "unknown") return "calculation_readiness_unknown";
  if (record.incentive_value_method === "unknown" && !["policy_only", "unknown"].includes(record.calculation_readiness)) return "incentive_type_unclear";
  if (record.primary_savings_model_id === "whole_building_custom_efficiency" && record.secondary_savings_model_ids.length === 0) return "broad_custom_program_unclear";
  return "classification_conflict_or_ambiguity";
}

function searchableText(opportunity) {
  return [
    opportunity.opportunityId,
    opportunity.canonicalTitle,
    opportunity.normalizedTitle,
    opportunity.programType,
    opportunity.category,
    opportunity.summary,
    opportunity.administrator,
    ...toTextArray(opportunity.sectors),
    ...toTextArray(opportunity.eligibleSectors),
    ...toTextArray(opportunity.technologies),
    ...toTextArray(opportunity.technologyRecords),
    compactDetails(opportunity.details)
  ].join(" ").toLowerCase();
}

function compactDetails(details) {
  if (!Array.isArray(details)) return "";
  return details.map((detail) => [detail?.label, detail?.value].filter(Boolean).join(" ")).join(" ");
}

function matches(text, terms) {
  return terms.some((term) => text.includes(term));
}

function addSecondary(secondary, modelId) {
  if (modelById.has(modelId) && !secondary.includes(modelId)) secondary.push(modelId);
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function toTextArray(value) {
  return toArray(value).map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") return item.name || item.title || item.label || item.slug || "";
    return "";
  }).filter(Boolean);
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function countBy(items, fn) {
  return items.reduce((counts, item) => {
    const key = fn(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function percent(count, total) {
  return `${Math.round((count / total) * 100)}%`;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
