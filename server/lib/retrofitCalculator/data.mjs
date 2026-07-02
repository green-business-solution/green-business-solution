import fs from "node:fs";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
}

export const billFieldDictionary = readJson("../../../data/bill_field_dictionary.json");
export const billFieldById = new Map(billFieldDictionary.map((field) => [field.id, field]));

export const savingsModels = readJson("../../../data/savings_models.json");
export const savingsModelById = new Map(savingsModels.map((model) => [model.id, model]));

export const calculationRequirementsData = readJson("../../../data/calculation_requirements.json");
export const calculationRequirementByModelId = new Map(
  (calculationRequirementsData.models || []).map((model) => [model.model_id, model])
);

export const savingsCalculationMethodsData = readJson("../../../data/savings_calculation_methods.json");
export const savingsCalculationMethodByModelId = new Map(
  (savingsCalculationMethodsData.methods || []).map((method) => [method.model_id, method])
);

export const projectCostBenchmarksData = readJson("../../../data/project_cost_benchmarks.json");
export const projectCostBenchmarkByModelId = new Map(
  (projectCostBenchmarksData.benchmarks || []).flatMap((benchmark) =>
    (benchmark.model_ids || []).map((modelId) => [modelId, benchmark])
  )
);

export const opportunitySavingsMapping = readJson("../../../data/opportunity_savings_mapping.json");
export const opportunitySavingsMappingByOpportunityId = new Map(
  opportunitySavingsMapping.map((mapping) => [mapping.opportunity_id, mapping])
);

export const opportunityIncentiveRulesData = readJson("../../../data/opportunity_incentive_rules.json");
export const opportunityIncentiveRulesByOpportunityId = new Map();

for (const rule of opportunityIncentiveRulesData.rules || []) {
  const existing = opportunityIncentiveRulesByOpportunityId.get(rule.opportunityId) || [];
  existing.push(rule);
  opportunityIncentiveRulesByOpportunityId.set(rule.opportunityId, existing);
}
