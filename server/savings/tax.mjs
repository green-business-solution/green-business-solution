import { calculateSalesTaxCents } from "./formulas.mjs";
import { answerValue, hasAnswer } from "./labor.mjs";

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
  if (ruleGeography.postalCode && geography.postalCode && ruleGeography.postalCode !== geography.postalCode) return -1;
  if (
    ruleGeography.specialDistrictId &&
    Array.isArray(geography.specialDistrictIds) &&
    !geography.specialDistrictIds.includes(ruleGeography.specialDistrictId)
  ) {
    return -1;
  }

  let score = 0;
  if (ruleGeography.country) score += 1;
  if (ruleGeography.state) score += 2;
  if (ruleGeography.countyFips) score += 4;
  if (ruleGeography.city) score += 8;
  if (ruleGeography.postalCode) score += 16;
  if (ruleGeography.specialDistrictId) score += 32;
  return score;
}

export function selectGeographicTaxRule({ rules = [], geography = {}, taxType = "sales_tax", calculationDate }) {
  return rules
    .filter((rule) => rule.taxType === taxType)
    .filter((rule) => isEffective(rule, calculationDate))
    .map((rule) => ({ rule, score: geographyScore(rule.geography, geography) }))
    .filter((candidate) => candidate.score >= 0)
    .sort((a, b) => b.score - a.score || b.rule.version - a.rule.version)[0]?.rule || null;
}

export function resolveSalesTaxRule({ answers = {}, rules = [], geography = {}, calculationDate }) {
  const rule = selectGeographicTaxRule({ rules, geography, taxType: "sales_tax", calculationDate });
  if (rule) return rule;

  if (hasAnswer(answers, "user_sales_tax_rate")) {
    return {
      id: "user_sales_tax_rate",
      version: 1,
      taxType: "sales_tax",
      ratePercent: Number(answerValue(answers, "user_sales_tax_rate")),
      equipmentTaxable: hasAnswer(answers, "equipment_taxable") ? Boolean(answerValue(answers, "equipment_taxable")) : true,
      laborTaxable: hasAnswer(answers, "labor_taxable") ? Boolean(answerValue(answers, "labor_taxable")) : false,
      active: true
    };
  }

  return null;
}

export function calculateSalesTaxFromRule({ rule, equipmentCostCents = 0, laborCostCents = 0 }) {
  return calculateSalesTaxCents({
    equipmentCostCents,
    laborCostCents,
    ratePercent: rule.ratePercent,
    equipmentTaxable: rule.equipmentTaxable,
    laborTaxable: rule.laborTaxable
  });
}
