import { calculateSalesTaxCents } from "./formulas.mjs";
import { answerValue, hasAnswer } from "./labor.mjs";

export const TAX_GEOGRAPHY_SCHEMA_VERSION = "tax-geography-rules-v1";

function isEffective(rule, calculationDate) {
  if (!rule?.active) return false;
  const date = calculationDate || new Date().toISOString().slice(0, 10);
  if (rule.effectiveStartDate && date < rule.effectiveStartDate) return false;
  if (rule.effectiveEndDate && date > rule.effectiveEndDate) return false;
  return true;
}

function geographyScore(ruleGeography = {}, geography = {}) {
  const normalizedRuleGeography = normalizeTaxGeography(ruleGeography);
  const normalizedGeography = normalizeTaxGeography(geography);
  if (normalizedRuleGeography.country && normalizedGeography.country && normalizedRuleGeography.country !== normalizedGeography.country) return -1;
  if (normalizedRuleGeography.state && normalizedGeography.state && normalizedRuleGeography.state !== normalizedGeography.state) return -1;
  if (normalizedRuleGeography.countyFips && normalizedGeography.countyFips && normalizedRuleGeography.countyFips !== normalizedGeography.countyFips) return -1;
  if (normalizedRuleGeography.placeGeoid && normalizedGeography.placeGeoid && normalizedRuleGeography.placeGeoid !== normalizedGeography.placeGeoid) return -1;
  if (normalizedRuleGeography.city && normalizedGeography.city && normalizeText(normalizedRuleGeography.city) !== normalizeText(normalizedGeography.city)) return -1;
  if (normalizedRuleGeography.postalCode && normalizedGeography.postalCode && normalizedRuleGeography.postalCode !== normalizedGeography.postalCode) return -1;
  if (
    normalizedRuleGeography.specialDistrictId &&
    Array.isArray(normalizedGeography.specialDistrictIds) &&
    !normalizedGeography.specialDistrictIds.includes(normalizedRuleGeography.specialDistrictId)
  ) {
    return -1;
  }

  let score = 0;
  if (normalizedRuleGeography.country) score += 1;
  if (normalizedRuleGeography.state) score += 2;
  if (normalizedRuleGeography.countyFips) score += 4;
  if (normalizedRuleGeography.placeGeoid) score += 8;
  if (normalizedRuleGeography.city) score += 8;
  if (normalizedRuleGeography.postalCode) score += 16;
  if (normalizedRuleGeography.specialDistrictId) score += 32;
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

export function normalizeTaxGeography(geography = {}) {
  const state = cleanUpper(geography.state || geography.stateCode || geography.state_code);
  const city = cleanOptional(
    geography.city ||
      geography.placeName ||
      geography.place_name ||
      geography.municipality ||
      geography.locality
  );
  return {
    country: cleanUpper(geography.country || "US"),
    state,
    stateFips: cleanOptional(geography.stateFips || geography.state_fips),
    countyFips: cleanOptional(geography.countyFips || geography.county_fips),
    countyName: cleanOptional(geography.countyName || geography.county_name),
    city,
    municipality: cleanOptional(geography.municipality || city),
    placeGeoid: cleanOptional(geography.placeGeoid || geography.place_geoid),
    placeName: cleanOptional(geography.placeName || geography.place_name || city),
    censusTractGeoid: cleanOptional(geography.censusTractGeoid || geography.census_tract_geoid),
    censusBlockGeoid: cleanOptional(geography.censusBlockGeoid || geography.census_block_geoid),
    postalCode: cleanOptional(geography.postalCode || geography.zip5 || geography.zip || geography.postal_code),
    coordinates: normalizeCoordinates(geography.coordinates),
    specialDistrictIds: Array.isArray(geography.specialDistrictIds) ? geography.specialDistrictIds.map(cleanOptional).filter(Boolean) : []
  };
}

export function selectTaxGeographyRules({ rules = [], geography = {}, calculationDate, opportunityId, taxType } = {}) {
  const normalizedGeography = normalizeTaxGeography(geography);
  return (rules || [])
    .filter((rule) => !taxType || rule.taxType === taxType)
    .filter((rule) => !opportunityId || !Array.isArray(rule.opportunityIds) || rule.opportunityIds.length === 0 || rule.opportunityIds.includes(opportunityId))
    .filter((rule) => isEffective(rule, calculationDate))
    .map((rule) => ({ rule, score: geographyScore(rule.geography, normalizedGeography) }))
    .filter((candidate) => candidate.score >= 0)
    .sort((a, b) => b.score - a.score || Number(b.rule.version || 0) - Number(a.rule.version || 0))
    .map((candidate) => candidate.rule);
}

export function buildTaxGeographyInputAnswers({ geography = {}, rules = [], calculationDate, packages = [] } = {}) {
  const normalizedGeography = normalizeTaxGeography(geography);
  const answers = {};
  const resolvedInputs = [];
  const add = (inputKey, value, source, options = {}) => {
    if (!inputKey || value === undefined || value === null || value === "") return false;
    if (answers[inputKey]) return false;
    answers[inputKey] = {
      value,
      source,
      canonicalInputKey: options.canonicalInputKey || inputKey,
      defaultIsPlaceholder: false,
      defaultConfidence: options.defaultConfidence || null,
      userOverrideAllowed: options.userOverrideAllowed !== false,
      taxGeographyRuleId: options.taxGeographyRuleId || null
    };
    resolvedInputs.push({
      inputKey,
      canonicalInputKey: answers[inputKey].canonicalInputKey,
      source,
      defaultIsPlaceholder: false,
      defaultConfidence: answers[inputKey].defaultConfidence,
      userOverrideAllowed: answers[inputKey].userOverrideAllowed,
      taxGeographyRuleId: answers[inputKey].taxGeographyRuleId
    });
    return true;
  };

  add("site_country", normalizedGeography.country, "address_geography", { userOverrideAllowed: false });
  add("site_state_code", normalizedGeography.state, "address_geography", { userOverrideAllowed: false });
  add("state_code", normalizedGeography.state, "address_geography", { canonicalInputKey: "site_state_code", userOverrideAllowed: false });
  add("site_state_fips", normalizedGeography.stateFips, "address_geography", { userOverrideAllowed: false });
  add("site_county_fips", normalizedGeography.countyFips, "address_geography", { userOverrideAllowed: false });
  add("county_fips", normalizedGeography.countyFips, "address_geography", { canonicalInputKey: "site_county_fips", userOverrideAllowed: false });
  add("site_county_name", normalizedGeography.countyName, "address_geography", { userOverrideAllowed: false });
  add("site_place_geoid", normalizedGeography.placeGeoid, "address_geography", { userOverrideAllowed: false });
  add("place_geoid", normalizedGeography.placeGeoid, "address_geography", { canonicalInputKey: "site_place_geoid", userOverrideAllowed: false });
  add("site_place_name", normalizedGeography.placeName, "address_geography");
  add("municipality", normalizedGeography.municipality || normalizedGeography.placeName, "address_geography");
  add("site_postal_code", normalizedGeography.postalCode, "address_geography", { userOverrideAllowed: false });
  add("census_tract_geoid", normalizedGeography.censusTractGeoid, "address_geography", { userOverrideAllowed: false });
  add("census_block_geoid", normalizedGeography.censusBlockGeoid, "address_geography", { userOverrideAllowed: false });

  const packageOpportunityIds = new Set((packages || []).map((pkg) => pkg?.opportunity_id).filter(Boolean));
  const matchedRules = selectTaxGeographyRules({ rules, geography: normalizedGeography, calculationDate })
    .filter((rule) => {
      if (!packageOpportunityIds.size || !Array.isArray(rule.opportunityIds) || rule.opportunityIds.length === 0) return true;
      return rule.opportunityIds.some((opportunityId) => packageOpportunityIds.has(opportunityId));
    });

  for (const rule of matchedRules) {
    for (const input of rule.derivedInputs || []) {
      add(input.inputKey, input.value, input.source || "tax_geography_rule", {
        taxGeographyRuleId: rule.id,
        userOverrideAllowed: input.userOverrideAllowed !== false,
        defaultConfidence: rule.sourceConfidence || null
      });
    }
  }

  return {
    geography: normalizedGeography,
    matchedRules,
    answers,
    resolvedInputs
  };
}

function normalizeCoordinates(coordinates) {
  const lat = Number(coordinates?.lat);
  const lng = Number(coordinates?.lng);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

function cleanOptional(value) {
  const text = String(value || "").trim();
  return text ? text : null;
}

function cleanUpper(value) {
  const text = cleanOptional(value);
  return text ? text.toUpperCase() : null;
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}
