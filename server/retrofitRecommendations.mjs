import fs from "node:fs";
import path from "node:path";
import { summarizeMatchResult } from "./matching/explainMatch.mjs";
import { buildOpportunityMatchProfile } from "./matching/buildOpportunityMatchProfile.mjs";
import { evaluateOpportunityForUser } from "./matching/evaluateRules.mjs";
import { normalizeUserProfile } from "./matching/normalizeUserProfile.mjs";
import { isVisibleAvailability, isVisibleOpportunity } from "./matching/opportunityLifecycle.mjs";
import { classifyRetrofitsForOpportunity, RETROFIT_TYPES_BY_ID } from "./matching/retrofitTaxonomy.mjs";
import { buildAdminTestCaseSavingsPreview } from "./savings/adminTestCaseSavings.mjs";

const incentiveRulesPath = path.resolve(import.meta.dirname, "..", "data", "opportunity_incentive_rules.json");
const opportunityIncentiveRules = readOpportunityIncentiveRules(incentiveRulesPath);

export function buildRetrofitGroupsFromEligibleResults({
  calculationDate,
  normalizedProfile,
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
        calculationDate,
        opportunityIncentiveRules: opportunityRules
      }),
      typicalComponents: RETROFIT_TYPES_BY_ID[group.retrofitTypeId]?.typicalComponents || []
    }))
    .sort((a, b) => b.opportunityCount - a.opportunityCount || a.displayName.localeCompare(b.displayName));
}

export function buildPortalRetrofitRecommendations({ intake, now = new Date(), opportunities, user }) {
  const normalizedProfile = normalizeUserProfile(intake);
  const calculationDate = now.toISOString().slice(0, 10);
  const eligibleResults = (opportunities || [])
    .filter(isVisibleOpportunity)
    .map((opportunity) => buildEvaluatedOpportunity({ normalizedProfile, now, opportunity }))
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
    summary: {
      matchedRetrofitCount: retrofits.length,
      matchedOpportunityCount: eligibleResults.length
    },
    retrofits
  };
}

function buildEvaluatedOpportunity({ normalizedProfile, now, opportunity }) {
  const matchProfile = buildOpportunityMatchProfile(opportunity, { now });
  if (!isVisibleAvailability(matchProfile.availability)) {
    return null;
  }

  return evaluateOpportunityForUser(
    normalizedProfile,
    opportunity,
    {
      ...matchProfile,
      retrofitTypes: classifyRetrofitsForOpportunity(opportunity, matchProfile)
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
