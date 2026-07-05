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
  const ruleCountries = listWithSingle(normalizedRuleGeography, "countries", "country");
  const ruleStates = listWithSingle(normalizedRuleGeography, "states", "state");
  const ruleCountyFips = listWithSingle(normalizedRuleGeography, "countyFipsList", "countyFips");
  const rulePlaceGeoids = listWithSingle(normalizedRuleGeography, "placeGeoids", "placeGeoid");
  const ruleCities = listWithSingle(normalizedRuleGeography, "cities", "city").concat(normalizedRuleGeography.municipalities || []);
  const ruleSpecialDistrictIds = normalizedRuleGeography.specialDistrictIds || [];

  if (ruleCountries.length && normalizedGeography.country && !ruleCountries.includes(normalizedGeography.country)) return -1;
  if (ruleStates.length && !normalizedGeography.state) return -1;
  if (ruleStates.length && normalizedGeography.state && !ruleStates.includes(normalizedGeography.state)) return -1;
  if (ruleCountyFips.length && !normalizedGeography.countyFips) return -1;
  if (ruleCountyFips.length && normalizedGeography.countyFips && !ruleCountyFips.includes(normalizedGeography.countyFips)) return -1;
  if (rulePlaceGeoids.length && !normalizedGeography.placeGeoid) return -1;
  if (rulePlaceGeoids.length && normalizedGeography.placeGeoid && !rulePlaceGeoids.includes(normalizedGeography.placeGeoid)) return -1;
  if (ruleCities.length && !cityValues(normalizedGeography).length) return -1;
  if (ruleCities.length && cityValues(normalizedGeography).length && !hasTextOverlap(ruleCities, cityValues(normalizedGeography))) return -1;
  if (normalizedRuleGeography.postalCode && !normalizedGeography.postalCode) return -1;
  if (normalizedRuleGeography.postalCode && normalizedGeography.postalCode && normalizedRuleGeography.postalCode !== normalizedGeography.postalCode) return -1;
  if (
    ruleSpecialDistrictIds.length &&
    (!Array.isArray(normalizedGeography.specialDistrictIds) ||
      !ruleSpecialDistrictIds.some((districtId) => normalizedGeography.specialDistrictIds.includes(districtId)))
  ) {
    return -1;
  }

  let score = 0;
  if (ruleCountries.length) score += 1;
  if (ruleStates.length) score += 2;
  if (ruleCountyFips.length) score += 4;
  if (rulePlaceGeoids.length) score += 8;
  if (ruleCities.length) score += 8;
  if (normalizedRuleGeography.postalCode) score += 16;
  if (ruleSpecialDistrictIds.length) score += 32;
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
  const countries = normalizeList(geography.countries || geography.countryCodes || geography.country_codes, cleanUpper);
  const states = normalizeList(geography.states || geography.stateCodes || geography.state_codes, cleanUpper);
  const stateFipsList = normalizeList(geography.stateFipsList || geography.stateFipses || geography.stateFips || geography.state_fips);
  const countyFipsList = normalizeList(geography.countyFipsList || geography.countyFipses || geography.countyFips || geography.county_fips);
  const cities = normalizeList(geography.cities, cleanOptional);
  const municipalities = normalizeList(geography.municipalities, cleanOptional);
  const placeGeoids = normalizeList(geography.placeGeoids || geography.place_geoids || geography.placeGeoid || geography.place_geoid);
  const state = cleanUpper(geography.state || geography.stateCode || geography.state_code) || states[0] || null;
  const city = cleanOptional(
    geography.city ||
      geography.placeName ||
      geography.place_name ||
      geography.municipality ||
      geography.locality
  ) || cities[0] || municipalities[0] || null;
  return {
    country: cleanUpper(geography.country) || countries[0] || "US",
    countries,
    state,
    states: uniqueList(state ? [state, ...states] : states),
    stateFips: stateFipsList[0] || null,
    stateFipsList,
    countyFips: countyFipsList[0] || null,
    countyFipsList,
    countyName: cleanOptional(geography.countyName || geography.county_name),
    city,
    cities: uniqueList(city ? [city, ...cities] : cities),
    municipality: cleanOptional(geography.municipality) || municipalities[0] || city,
    municipalities: uniqueList(municipalities),
    placeGeoid: placeGeoids[0] || null,
    placeGeoids,
    placeName: cleanOptional(geography.placeName || geography.place_name || city),
    censusTractGeoid: cleanOptional(geography.censusTractGeoid || geography.census_tract_geoid),
    censusBlockGeoid: cleanOptional(geography.censusBlockGeoid || geography.census_block_geoid),
    postalCode: cleanOptional(geography.postalCode || geography.zip5 || geography.zip || geography.postal_code),
    coordinates: normalizeCoordinates(geography.coordinates),
    specialDistrictIds: uniqueList(
      normalizeList(geography.specialDistrictIds || geography.specialDistricts || geography.special_district_ids || geography.specialDistrictId)
    )
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
  add("state_fips", normalizedGeography.stateFips, "address_geography", { canonicalInputKey: "site_state_fips", userOverrideAllowed: false });
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
    for (const input of rule.serverDerivableInputs || []) {
      add(input.inputKey, geographyFieldValue(normalizedGeography, input.sourceGeographyField), "address_geography", {
        taxGeographyRuleId: rule.id,
        userOverrideAllowed: false,
        defaultConfidence: rule.sourceConfidence || null
      });
    }

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

function geographyFieldValue(geography, sourceField) {
  switch (normalizeKey(sourceField)) {
    case "country":
    case "countrycode":
      return geography.country;
    case "state":
    case "statecode":
      return geography.state;
    case "statefips":
      return geography.stateFips;
    case "countyfips":
      return geography.countyFips;
    case "countyname":
      return geography.countyName;
    case "city":
      return geography.city;
    case "municipality":
      return geography.municipality;
    case "placegeoid":
      return geography.placeGeoid;
    case "placename":
      return geography.placeName;
    case "postalcode":
    case "zip":
    case "zip5":
      return geography.postalCode;
    case "censustractgeoid":
      return geography.censusTractGeoid;
    case "censusblockgeoid":
      return geography.censusBlockGeoid;
    case "coordinates":
      return geography.coordinates;
    default:
      return null;
  }
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

function normalizeList(value, cleaner = cleanOptional) {
  const values = Array.isArray(value) ? value : [value];
  return uniqueList(values.map((item) => cleaner(item)).filter(Boolean));
}

function uniqueList(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function listWithSingle(value, pluralKey, singleKey) {
  return uniqueList([value?.[singleKey], ...(Array.isArray(value?.[pluralKey]) ? value[pluralKey] : [])].filter(Boolean));
}

function cityValues(value) {
  return uniqueList([value.city, value.municipality, value.placeName, ...(value.cities || []), ...(value.municipalities || [])].filter(Boolean));
}

function hasTextOverlap(a, b) {
  const normalized = new Set((a || []).map(normalizeText).filter(Boolean));
  return (b || []).some((value) => normalized.has(normalizeText(value)));
}

function normalizeKey(value) {
  return String(value || "").replace(/[\s_-]/g, "").toLowerCase();
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}
