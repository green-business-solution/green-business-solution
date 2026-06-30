import {
  aggregateAnnualRecurringExpenses,
  aggregateAnnualRecurringSavings,
  aggregateAnnualNetRecurringSavings,
  aggregatePossibleGrantMoney,
  aggregateUpfrontSavings
} from "./aggregation.mjs";
import { calculateIncentiveAward } from "./incentives.mjs";

function idsMatch(a, b, x, y) {
  return (a === x && b === y) || (a === y && b === x);
}

export function areCompatible(ruleA, ruleB, stackingRules = []) {
  if (!ruleA || !ruleB) return true;

  if (
    ruleA.stacking?.mutualExclusionGroupId &&
    ruleA.stacking.mutualExclusionGroupId === ruleB.stacking?.mutualExclusionGroupId
  ) {
    return false;
  }

  if (ruleA.stacking?.incompatibleWithOpportunityIds?.includes(ruleB.opportunityId)) return false;
  if (ruleB.stacking?.incompatibleWithOpportunityIds?.includes(ruleA.opportunityId)) return false;

  return !stackingRules.some(
    (rule) =>
      rule.active !== false &&
      rule.ruleType === "mutually_exclusive" &&
      idsMatch(rule.opportunityAId, rule.opportunityBId, ruleA.opportunityId, ruleB.opportunityId)
  );
}

function requirementsSatisfied(rule, selectedRules) {
  const requiredOpportunityIds = rule.stacking?.requiresOpportunityIds || [];
  if (requiredOpportunityIds.length === 0) return true;

  const selectedOpportunityIds = new Set(selectedRules.map((selectedRule) => selectedRule.opportunityId));
  return requiredOpportunityIds.every((opportunityId) => selectedOpportunityIds.has(opportunityId));
}

export function enumerateCompatibleRuleSets(rules = [], stackingRules = []) {
  const scenarios = [];

  function backtrack(index, current) {
    if (index === rules.length) {
      if (current.every((rule) => requirementsSatisfied(rule, current))) {
        scenarios.push(current);
      }
      return;
    }

    const rule = rules[index];
    backtrack(index + 1, current);

    if (current.every((existing) => areCompatible(existing, rule, stackingRules))) {
      backtrack(index + 1, [...current, rule]);
    }
  }

  backtrack(0, []);
  return scenarios;
}

function groupRulesByOpportunity(rules = []) {
  const groupsByOpportunityId = new Map();
  for (const rule of rules) {
    const key = rule.opportunityId || rule.id;
    const group = groupsByOpportunityId.get(key) || [];
    group.push(rule);
    groupsByOpportunityId.set(key, group);
  }
  return [...groupsByOpportunityId.values()];
}

function groupCompatibleWithCurrent(group, currentRules, stackingRules) {
  return group.every((rule) => currentRules.every((existing) => areCompatible(existing, rule, stackingRules)));
}

function groupRequirementsSatisfied(selectedRules) {
  return selectedRules.every((rule) => requirementsSatisfied(rule, selectedRules));
}

export function enumerateCompatibleOpportunityRuleSets(rules = [], stackingRules = []) {
  const groups = groupRulesByOpportunity(rules);
  const scenarios = [];

  function backtrack(index, currentGroups) {
    if (index === groups.length) {
      const currentRules = currentGroups.flat();
      if (groupRequirementsSatisfied(currentRules)) scenarios.push(currentRules);
      return;
    }

    const group = groups[index];
    backtrack(index + 1, currentGroups);

    if (groupCompatibleWithCurrent(group, currentGroups.flat(), stackingRules)) {
      backtrack(index + 1, [...currentGroups, group]);
    }
  }

  backtrack(0, []);
  return scenarios;
}

function scenarioIdForRules(rules) {
  if (rules.length === 0) return "scenario_no_incentives";
  return `scenario_${rules.map(scenarioKeyForRule).sort().join("_plus_")}`;
}

function scenarioKeyForRule(rule) {
  return String(rule.id || rule.opportunityId)
    .replace(/^oir_/, "")
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

function conflictExplanationsForScenario({ scenarioRules, allRules, stackingRules }) {
  const explanations = [];
  const scenarioRuleIds = new Set(scenarioRules.map((rule) => rule.id));

  for (const excludedRule of allRules) {
    if (scenarioRuleIds.has(excludedRule.id)) continue;

    for (const includedRule of scenarioRules) {
      if (areCompatible(excludedRule, includedRule, stackingRules)) continue;

      const explicitRule = stackingRules.find(
        (rule) =>
          rule.active !== false &&
          rule.ruleType === "mutually_exclusive" &&
          idsMatch(rule.opportunityAId, rule.opportunityBId, excludedRule.opportunityId, includedRule.opportunityId)
      );

      explanations.push({
        excludedOpportunityId: excludedRule.opportunityId,
        excludedIncentiveRuleId: excludedRule.id,
        reason:
          explicitRule?.explanation ||
          `${excludedRule.name || excludedRule.opportunityId} cannot be combined with ${includedRule.name || includedRule.opportunityId}.`
      });
      break;
    }
  }

  return explanations;
}

export function calculateScenario({ scenarioRules, allRules, baseCostLedgerEntries, baseRecurringSavingsEntries, stackingRules = [], ctx }) {
  const sortedRules = [...scenarioRules].sort(
    (a, b) => (a.basisPolicy?.applicationOrder ?? 10) - (b.basisPolicy?.applicationOrder ?? 10)
  );
  const priorAwards = [];
  const upfrontSavingsEntries = [];
  const recurringSavingsEntries = [];
  const capExplanations = [];

  for (const rule of sortedRules) {
    const award = calculateIncentiveAward(rule, ctx, priorAwards);
    priorAwards.push(award);

    if (award.upfrontSavingsEntry) upfrontSavingsEntries.push(award.upfrontSavingsEntry);
    if (award.recurringSavingsEntry) recurringSavingsEntries.push(award.recurringSavingsEntry);

    if (award.rawAmountCents !== award.amountCents) {
      capExplanations.push({
        incentiveRuleId: rule.id,
        uncappedAmountCents: award.rawAmountCents,
        cappedAmountCents: award.amountCents,
        reason: "Incentive cap applied."
      });
    }
  }

  const totalUpfrontSavingsCents = aggregateUpfrontSavings(upfrontSavingsEntries);
  const possibleGrantMoneyCents = aggregatePossibleGrantMoney(upfrontSavingsEntries);
  const firstYearRecurringSavingsCents = aggregateAnnualRecurringSavings(recurringSavingsEntries);
  const firstYearRecurringExpensesCents = aggregateAnnualRecurringExpenses(recurringSavingsEntries);
  const firstYearNetRecurringSavingsCents = aggregateAnnualNetRecurringSavings(recurringSavingsEntries);
  const firstYearTotalBenefitCents = totalUpfrontSavingsCents + firstYearNetRecurringSavingsCents;
  const upfrontCostAfterSavingsCents = ctx.upfrontCostCents - totalUpfrontSavingsCents;
  const opportunityIds = [...new Set(sortedRules.map((rule) => rule.opportunityId))];

  return {
    id: scenarioIdForRules(sortedRules),
    name: sortedRules.length ? sortedRules.map((rule) => rule.name || rule.opportunityId).join(" + ") : "No incentives",
    opportunityIds,
    incentiveRuleIds: sortedRules.map((rule) => rule.id),
    status: "calculated",
    upfrontSavingsEntries,
    recurringSavingsEntries,
    totalUpfrontSavingsCents,
    possibleGrantMoneyCents,
    firstYearRecurringSavingsCents,
    firstYearRecurringExpensesCents,
    firstYearNetRecurringSavingsCents,
    firstYearTotalBenefitCents,
    upfrontCostAfterSavingsCents,
    conflictExplanations: conflictExplanationsForScenario({ scenarioRules: sortedRules, allRules, stackingRules }),
    capExplanations,
    trace: {
      id: `trace_${scenarioIdForRules(sortedRules)}`,
      summary: "Incentive scenario calculated.",
      steps: sortedRules.map((rule) => ({
        id: `trace_${rule.id}`,
        label: rule.name || rule.id,
        category: "incentive",
        formula: rule.formula || rule.amountRule?.kind || "incentive rule",
        inputs: {},
        result: {
          value:
            upfrontSavingsEntries.find((entry) => entry.incentiveRuleId === rule.id)?.amountCents ||
            recurringSavingsEntries.find((entry) => entry.incentiveRuleId === rule.id)?.amountCents ||
            0,
          unit: "cents"
        }
      })),
      assumptions: [],
      warnings: [],
      inputSnapshot: [],
      outputChecks: []
    }
  };
}

export function buildIncentiveScenarios({
  incentiveRules = [],
  selectedOpportunityIds = [],
  baseCostLedgerEntries = [],
  baseRecurringSavingsEntries = [],
  billLineDeltas = [],
  answers = {},
  billLines = {},
  stackingRules = [],
  upfrontCostCents
}) {
  const selectedOpportunityIdSet = new Set(selectedOpportunityIds);
  const candidateRules = incentiveRules.filter(
    (rule) => rule.active !== false && selectedOpportunityIdSet.has(rule.opportunityId)
  );

  const ctx = {
    answers,
    billLines,
    billLineDeltas,
    baseCostLedgerEntries,
    baseRecurringSavingsEntries,
    upfrontCostCents
  };

  return enumerateCompatibleOpportunityRuleSets(candidateRules, stackingRules).map((scenarioRules) =>
    calculateScenario({
      scenarioRules,
      allRules: candidateRules,
      baseCostLedgerEntries,
      baseRecurringSavingsEntries,
      stackingRules,
      ctx
    })
  );
}

export function selectBestScenario(scenarios = []) {
  return [...scenarios]
    .filter((scenario) => scenario.status === "calculated")
    .sort(
      (a, b) =>
        b.firstYearTotalBenefitCents - a.firstYearTotalBenefitCents ||
        b.totalUpfrontSavingsCents - a.totalUpfrontSavingsCents ||
        b.possibleGrantMoneyCents - a.possibleGrantMoneyCents ||
        a.upfrontCostAfterSavingsCents - b.upfrontCostAfterSavingsCents
    )[0] || null;
}
