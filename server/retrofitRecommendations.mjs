import fs from "node:fs";
import path from "node:path";
import { summarizeMatchResult } from "./matching/explainMatch.mjs";
import { buildOpportunityMatchProfile } from "./matching/buildOpportunityMatchProfile.mjs";
import { evaluateOpportunityForUser } from "./matching/evaluateRules.mjs";
import { normalizeUserProfile } from "./matching/normalizeUserProfile.mjs";
import { isVisibleAvailability, isVisibleOpportunity } from "./matching/opportunityLifecycle.mjs";
import { classifyRetrofitsForOpportunity, RETROFIT_TYPES, RETROFIT_TYPES_BY_ID } from "./matching/retrofitTaxonomy.mjs";
import { buildAdminTestCaseSavingsPreview } from "./savings/adminTestCaseSavings.mjs";

const incentiveRulesPath = path.resolve(import.meta.dirname, "..", "data", "opportunity_incentive_rules.json");
const incentiveCalculationPackagesPath = path.resolve(
  import.meta.dirname,
  "..",
  "data",
  "opportunity_incentive_calculation_packages_v2.json"
);
const taxGeographyRulesPath = path.resolve(import.meta.dirname, "..", "data", "tax_geography_rules.json");
const opportunityIncentiveRules = readOpportunityIncentiveRules(incentiveRulesPath);
const opportunityIncentiveCalculationPackages = readOpportunityIncentiveCalculationPackages(incentiveCalculationPackagesPath);
const taxGeographyRules = readTaxGeographyRules(taxGeographyRulesPath);

export function buildRetrofitGroupsFromEligibleResults({
  calculationDate,
  normalizedProfile,
  opportunityPackages = opportunityIncentiveCalculationPackages,
  opportunityRules = opportunityIncentiveRules,
  results,
  subjectId
}) {
  const groups = new Map();

  for (const result of results || []) {
    const summarized = summarizeMatchResult(result);
    for (const retrofit of result.retrofitTypes || []) {
      const current = groups.get(retrofit.retrofitTypeId) || {
        retrofitTypeId: retrofit.retrofitTypeId,
        displayName: retrofit.displayName,
        parentCategory: retrofit.parentCategory,
        isPhysicalRetrofit: retrofit.isPhysicalRetrofit,
        opportunityCount: 0,
        opportunities: []
      };
      current.opportunityCount += 1;
      current.opportunities.push(summarized);
      groups.set(retrofit.retrofitTypeId, current);
    }
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      opportunities: group.opportunities.sort(compareResults),
      savingsPreview: buildAdminTestCaseSavingsPreview({
        retrofitGroup: group,
        sampleUserId: subjectId,
        normalizedProfile,
        taxContext: normalizedProfile?.tax || null,
        calculationDate,
        opportunityIncentiveRules: opportunityRules,
        opportunityIncentiveCalculationPackages: opportunityPackages,
        taxGeographyRules
      }),
      typicalComponents: RETROFIT_TYPES_BY_ID[group.retrofitTypeId]?.typicalComponents || []
    }))
    .sort((a, b) => b.opportunityCount - a.opportunityCount || a.displayName.localeCompare(b.displayName));
}

export function buildPortalRetrofitRecommendations({ intake, now = new Date(), opportunities, retrofitTypeIds = null, user }) {
  const normalizedProfile = normalizeUserProfile(intake);
  const calculationDate = now.toISOString().slice(0, 10);
  const requestedRetrofitTypeIds = normalizeRetrofitTypeIdFilter(retrofitTypeIds);
  const eligibleResults = (opportunities || [])
    .filter(isVisibleOpportunity)
    .map((opportunity) => buildEvaluatedOpportunity({ normalizedProfile, now, opportunity, requestedRetrofitTypeIds }))
    .filter(Boolean)
    .filter((result) => result.eligibilityStatus === "eligible");
  const retrofits = buildRetrofitGroupsFromEligibleResults({
    results: eligibleResults,
    normalizedProfile,
    calculationDate,
    subjectId: user?.userId || intake?.userId || "client"
  });

  return {
    user,
    intake,
    generatedAt: now.toISOString(),
    isPartialRecommendations: requestedRetrofitTypeIds.size > 0,
    summary: {
      matchedRetrofitCount: retrofits.length,
      matchedOpportunityCount: eligibleResults.length
    },
    retrofits
  };
}

export function buildPortalRetrofitPreviewShell({ intake, now = new Date(), user }) {
  const normalizedProfile = normalizeUserProfile(intake);
  const calculationDate = now.toISOString().slice(0, 10);
  const retrofits = buildLightweightRetrofitGroups(intake, {
    calculationDate,
    normalizedProfile,
    subjectId: user?.userId || intake?.userId || "client"
  });
  return {
    user,
    intake,
    generatedAt: now.toISOString(),
    isProgressiveShell: true,
    summary: {
      matchedRetrofitCount: retrofits.length,
      matchedOpportunityCount: intake?.sampleMatchingSummary?.promisingOpportunityCount ?? intake?.sampleMatchingSummary?.topOpportunityCount ?? 0
    },
    retrofits
  };
}

function buildLightweightRetrofitGroups(intake, { calculationDate, normalizedProfile, subjectId } = {}) {
  const selected = [];
  for (const value of intake?.sustainability?.interestedImprovements || []) {
    const type = resolveRetrofitType(value);
    if (type) selected.push(type);
  }

  if (selected.length === 0) {
    selected.push(...fallbackRetrofitTypesForIntake(intake));
  }

  return uniqueRetrofitTypes(selected)
    .slice(0, 8)
    .map((type) => {
      const group = {
        retrofitTypeId: type.retrofitTypeId,
        displayName: type.displayName,
        parentCategory: type.parentCategory,
        isPhysicalRetrofit: type.isPhysicalRetrofit,
        opportunityCount: 0,
        opportunities: [],
        typicalComponents: type.typicalComponents || []
      };
      return {
        ...group,
        savingsPreview: buildAdminTestCaseSavingsPreview({
          retrofitGroup: group,
          sampleUserId: subjectId,
          normalizedProfile,
          taxContext: normalizedProfile?.tax || null,
          calculationDate
        })
      };
    });
}

function resolveRetrofitType(value) {
  const key = normalizeRetrofitLookupText(value);
  if (!key) return null;
  if (RETROFIT_TYPES_BY_ID[key]) return RETROFIT_TYPES_BY_ID[key];
  return RETROFIT_TYPES.find((type) =>
    normalizeRetrofitLookupText(type.displayName) === key ||
    normalizeRetrofitLookupText(type.retrofitTypeId) === key ||
    type.aliases.some((alias) => normalizeRetrofitLookupText(alias) === key)
  ) || null;
}

function fallbackRetrofitTypesForIntake(intake) {
  const text = normalizeRetrofitLookupText([
    intake?.business?.industry,
    intake?.business?.primaryActivityText,
    intake?.site?.buildingType,
    intake?.sustainability?.goals,
    intake?.sustainability?.currentChallenges,
    intake?.sustainability?.notes
  ].filter(Boolean).join(" "));
  const selected = [];
  const add = (id) => {
    const type = RETROFIT_TYPES_BY_ID[id];
    if (type) selected.push(type);
  };

  add("led_lighting_retrofit");
  if (text.includes("restaurant") || text.includes("food") || text.includes("kitchen") || text.includes("cafe")) {
    add("high_efficiency_refrigeration_equipment");
    add("high_efficiency_commercial_dishwasher");
    add("demand_controlled_kitchen_ventilation");
  }
  if (text.includes("school") || text.includes("office") || text.includes("library") || text.includes("hospital") || text.includes("museum")) {
    add("high_efficiency_hvac_replacement");
    add("building_automation_system");
  }
  if (text.includes("data center") || text.includes("factory") || text.includes("plant") || text.includes("industrial")) {
    add("variable_frequency_drive_retrofit");
    add("efficient_air_compressor");
  }
  if (intake?.siteEnergyProfile?.annualWaterCost || intake?.siteEnergyProfile?.annualWaterUse) {
    add("low_flow_fixture_retrofit");
  }
  if (intake?.siteEnergyProfile?.annualGasCost || intake?.siteEnergyProfile?.annualTherms) {
    add("heat_pump_hvac_retrofit");
  }
  add("rooftop_solar_pv");
  add("energy_audit");
  return selected;
}

function uniqueRetrofitTypes(types) {
  const seen = new Set();
  return types.filter((type) => {
    if (!type || seen.has(type.retrofitTypeId)) return false;
    seen.add(type.retrofitTypeId);
    return true;
  });
}

function normalizeRetrofitLookupText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeRetrofitTypeIdFilter(retrofitTypeIds) {
  return new Set(
    (Array.isArray(retrofitTypeIds) ? retrofitTypeIds : [])
      .map((value) => normalizeRetrofitLookupText(value))
      .filter(Boolean)
  );
}

function buildEvaluatedOpportunity({ normalizedProfile, now, opportunity, requestedRetrofitTypeIds = new Set() }) {
  const matchProfile = buildOpportunityMatchProfile(opportunity, { now });
  if (!isVisibleAvailability(matchProfile.availability)) {
    return null;
  }
  const retrofitTypes = classifyRetrofitsForOpportunity(opportunity, matchProfile);
  if (
    requestedRetrofitTypeIds.size > 0 &&
    !retrofitTypes.some((retrofit) => requestedRetrofitTypeIds.has(normalizeRetrofitLookupText(retrofit.retrofitTypeId)))
  ) {
    return null;
  }

  return evaluateOpportunityForUser(
    normalizedProfile,
    opportunity,
    {
      ...matchProfile,
      retrofitTypes
    },
    { now }
  );
}

function compareResults(a, b) {
  return statusRank(a.eligibilityStatus) - statusRank(b.eligibilityStatus) || b.rankScore - a.rankScore;
}

function statusRank(status) {
  return {
    eligible: 0,
    likely_eligible: 1,
    needs_information: 2,
    manual_review: 3,
    ineligible: 4,
    unavailable: 5
  }[status] ?? 9;
}

function readOpportunityIncentiveRules(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (source.rules || [])
    .filter((rule) => rule?.opportunityId)
    .filter((rule) => rule.active !== false)
    .filter((rule) => rule.confidence !== "low");
}

function readOpportunityIncentiveCalculationPackages(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (source.packages || []).filter((pkg) => pkg?.opportunity_id);
}

function readTaxGeographyRules(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (source.rules || []).filter((rule) => rule?.id && rule.active !== false);
}
