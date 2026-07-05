import { calculateLaborCents, percentOfCents } from "./formulas.mjs";

export function answerValue(answers = {}, answerKey) {
  const answer = answers[answerKey];
  if (answer && typeof answer === "object" && "value" in answer) {
    return answer.value;
  }
  return answer;
}

export function hasAnswer(answers = {}, answerKey) {
  const value = answerValue(answers, answerKey);
  return value !== undefined && value !== null && value !== "";
}

function isEffective(rule, calculationDate) {
  if (!rule?.active) return false;
  const date = calculationDate || new Date().toISOString().slice(0, 10);
  if (rule.effectiveStartDate && date < rule.effectiveStartDate) return false;
  if (rule.effectiveEndDate && date > rule.effectiveEndDate) return false;
  return true;
}

function geographyScore(ruleGeography = {}, geography = {}) {
  if (ruleGeography.country && geography.country && ruleGeography.country !== geography.country) return -1;
  if (ruleGeography.state && geography.state && ruleGeography.state !== geography.state) return -1;
  if (ruleGeography.countyFips && geography.countyFips && ruleGeography.countyFips !== geography.countyFips) return -1;
  if (ruleGeography.city && geography.city && ruleGeography.city !== geography.city) return -1;

  let score = 0;
  if (ruleGeography.country) score += 1;
  if (ruleGeography.state) score += 2;
  if (ruleGeography.countyFips) score += 4;
  if (ruleGeography.city) score += 8;
  return score;
}

export function selectLaborRule({ rules = [], retrofitTypeId, geography = {}, calculationDate }) {
  return rules
    .filter((rule) => rule.retrofitTypeId === retrofitTypeId)
    .filter((rule) => isEffective(rule, calculationDate))
    .map((rule) => ({ rule, score: geographyScore(rule.geography, geography) }))
    .filter((candidate) => candidate.score >= 0)
    .sort((a, b) => b.score - a.score || b.rule.version - a.rule.version)[0]?.rule || null;
}

export function calculateLaborFromRule({ rule, answers = {} }) {
  const units = Number(answerValue(answers, rule.unitAnswerKey));
  if (!Number.isFinite(units)) {
    return null;
  }

  const amountCents = calculateLaborCents({
    fixedCostCents: rule.fixedCostCents,
    perUnitCostCents: rule.perUnitCostCents,
    units,
    countyLaborMultiplier: rule.countyLaborMultiplier,
    retrofitComplexityMultiplier: rule.retrofitComplexityMultiplier,
    minimumContractorCostCents: rule.minimumContractorCostCents
  });

  return {
    amountCents,
    source: "labor_rule",
    sourceId: rule.id,
    version: rule.version,
    formula: `max(${rule.minimumContractorCostCents}, (${rule.fixedCostCents} + ${rule.perUnitCostCents} * ${units}) * ${rule.countyLaborMultiplier} * ${rule.retrofitComplexityMultiplier})`
  };
}

export function calculateLaborAdders({ rule, equipmentCostCents = 0, laborCostCents = 0 }) {
  if (!Array.isArray(rule?.adders)) return [];

  return rule.adders.map((adder, index) => {
    let amountCents = 0;
    if (adder.kind === "fixed") {
      amountCents = Number(adder.amountCents || 0);
    } else if (adder.kind === "percent_of_labor") {
      amountCents = percentOfCents(laborCostCents, adder.percent || 0);
    } else if (adder.kind === "percent_of_equipment_plus_labor") {
      amountCents = percentOfCents(Number(equipmentCostCents) + Number(laborCostCents), adder.percent || 0);
    }

    return {
      id: `${rule.id}_adder_${index + 1}`,
      kind: "upfront_cost",
      category: adder.category,
      label: adder.category.replace(/_/g, " "),
      amountCents,
      source: "labor_rule",
      sourceId: rule.id
    };
  });
}

export function resolveLaborCost({ answers = {}, rules = [], retrofitTypeId, unitAnswerKey, geography = {}, calculationDate }) {
  if (hasAnswer(answers, "contractor_quote_amount_cents")) {
    return {
      amountCents: Number(answerValue(answers, "contractor_quote_amount_cents")),
      source: "contractor_quote",
      sourceId: null,
      version: null,
      formula: "contractor_quote_amount_cents"
    };
  }

  if (hasAnswer(answers, "installation_labor_cost_cents")) {
    return {
      amountCents: Number(answerValue(answers, "installation_labor_cost_cents")),
      source: "user_input",
      sourceId: null,
      version: null,
      formula: "installation_labor_cost_cents"
    };
  }

  const rule = selectLaborRule({ rules, retrofitTypeId, geography, calculationDate });
  if (!rule) return null;

  return calculateLaborFromRule({
    rule: { ...rule, unitAnswerKey: rule.unitAnswerKey || unitAnswerKey },
    answers
  });
}
