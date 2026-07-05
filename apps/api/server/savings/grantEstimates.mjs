import { answerValue, hasAnswer } from "./labor.mjs";
import { percentOfCents, roundCents } from "./formulas.mjs";

export const GRANT_ESTIMATE_SCHEMA_VERSION = "1.0.0";

const CONFIDENCES = new Set(["high", "medium", "low"]);
const INCLUDED_STATUSES = new Set(["deterministic_estimate", "expected_value_estimate", "range_estimate"]);
const NON_GRANT_CLASSIFICATIONS = new Set(["loan", "financing", "tax_credit", "technical_assistance"]);
const NARROW_COMPETITION_SCOPES = new Set(["narrow_local", "utility_territory", "sector_specific"]);

export function isGrantLikeRule(rule = {}) {
  return rule.incentiveType === "grant" || rule.incentiveType === "possible_grant" || rule.estimateTreatment === "possible_grant";
}

export function includeInUserFacingTotal(estimate = {}) {
  if (estimate.humanReviewRequired) return false;
  if (estimate.sourceConfidence === "low") return false;
  if (estimate.estimateConfidence === "low") return false;
  return INCLUDED_STATUSES.has(estimate.computedEstimate?.estimateStatus);
}

export function buildGrantEstimateFromLegacyRule(rule = {}, ctx = {}) {
  return buildGrantEstimate(legacyGrantRuleToEstimateRule(rule), legacyProjectInputs(rule, ctx));
}

export function buildGrantEstimate(rule = {}, projectInputs = {}) {
  const normalized = normalizeGrantRule(rule);
  const base = baseEstimate(normalized);

  if (normalized.sourceConfidence === "low") {
    return suppress(base, "suppressed", ["LOW_SOURCE_CONFIDENCE", "HUMAN_REVIEW_REQUIRED"], [
      "Low source confidence values are not included in savings totals."
    ]);
  }

  if (normalized.humanReviewRequired) {
    return suppress(base, "human_review_required", normalized.humanReviewReasons, [
      "Source interpretation requires human review before estimating value."
    ]);
  }

  if (NON_GRANT_CLASSIFICATIONS.has(normalized.cashValueClassification)) {
    return zero(base, reasonForNonGrantClassification(normalized.cashValueClassification));
  }

  if (normalized.valueModel.kind === "source_inaccessible") {
    return suppress(base, "suppressed", ["SOURCE_INACCESSIBLE", "HUMAN_REVIEW_REQUIRED"], [
      "Source could not be verified; estimate suppressed."
    ]);
  }

  if (normalized.sourceOnlySaysUpTo && !isCompetitiveValueModel(normalized.valueModel.kind)) {
    return suppress(base, "suppressed", ["SOURCE_AMBIGUOUS_UP_TO_LANGUAGE", "HUMAN_REVIEW_REQUIRED"], [
      "Source uses up-to language without a deterministic award formula."
    ]);
  }

  const missingInputs = missingRequiredInputs(normalized, projectInputs);
  if (missingInputs.length > 0) {
    const status = missingInputs.some((input) => input.includes("cost")) ? "needs_quote" : "needs_project_scope";
    return {
      ...base,
      missingInputs,
      estimateConfidence: "low",
      userFacingLabel: status === "needs_quote" ? "Needs project quote" : "Needs project scope",
      userFacingCaveat: `Needed to estimate: ${missingInputs.join(", ")}.`,
      computedEstimate: {
        estimateStatus: status,
        estimatedAmountCents: null,
        estimateLowCents: null,
        estimateHighCents: null,
        conditionalAwardAmountCents: null,
        includedInUserFacingTotal: false,
        includedInInternalPipelineValue: true,
        calculationTrace: [`Missing required inputs: ${missingInputs.join(", ")}.`]
      },
      reasonCodes: reasonCodesForMissingInputs(missingInputs)
    };
  }

  switch (normalized.valueModel.kind) {
    case "fixed_amount":
      return deterministic(base, normalized, centsValue(normalized.valueModel.amountCents, normalized.valueModel.amount), [
        `Fixed grant amount = ${centsValue(normalized.valueModel.amountCents, normalized.valueModel.amount)} cents.`
      ]);
    case "percent_of_eligible_cost":
      return deterministicPercent(base, normalized, projectInputs, false);
    case "capped_percent_of_eligible_cost":
      return deterministicPercent(base, normalized, projectInputs, true);
    case "per_unit_award":
      return deterministicPerUnit(base, normalized, projectInputs);
    case "study_or_audit_grant":
      return deterministicStudyGrant(base, normalized, projectInputs);
    case "competitive_cost_share":
    case "competitive_award_range":
      return competitiveExpectedValue(base, normalized, projectInputs);
    case "competitive_max_only":
      return competitiveMaxOnly(base, normalized, projectInputs);
    case "loan_or_financing_labeled_as_grant":
      return zero(base, "LOAN_NOT_GRANT");
    case "tax_credit_mixed_with_grant":
      return zero(base, "TAX_CREDIT_NOT_GRANT");
    case "non_cash_technical_assistance":
      return zero(base, "NON_CASH_ASSISTANCE");
    case "no_calculable_value":
    default:
      return suppress(base, "not_calculable", ["HUMAN_REVIEW_REQUIRED"], [
        "No source-backed grant value formula is available."
      ]);
  }
}

function legacyGrantRuleToEstimateRule(rule = {}) {
  const amountRule = rule.amountRule || {};
  const sourceOnlySaysUpTo = ambiguousUpToLanguage(rule);
  const capCents = Number.isFinite(rule.cap?.maxAmountCents) ? Number(rule.cap.maxAmountCents) : null;
  const isPossibleGrant = rule.incentiveType === "possible_grant" || rule.estimateTreatment === "possible_grant";
  let valueModel = { kind: "no_calculable_value" };

  if (sourceOnlySaysUpTo && amountRule.kind === "percent_of_basis" && Number(amountRule.percent) >= 1 && capCents) {
    valueModel = {
      kind: "competitive_max_only",
      awardRange: { lowCents: null, highCents: capCents, rangeBasis: "published_min_max" },
      competitionType: isPossibleGrant ? "competitive" : "unknown"
    };
  } else if (isPossibleGrant && amountRule.kind === "percent_of_basis") {
    valueModel = { kind: "competitive_cost_share", competitionType: "competitive" };
  } else if (amountRule.kind === "percent_of_basis") {
    valueModel = {
      kind: capCents ? "capped_percent_of_eligible_cost" : "percent_of_eligible_cost",
      competitionType: "none"
    };
  } else if (amountRule.kind === "fixed_amount") {
    valueModel = { kind: "fixed_amount", amountCents: Number(amountRule.amountCents || 0), competitionType: "none" };
  } else if (amountRule.kind === "fixed_per_unit") {
    valueModel = { kind: "per_unit_award", competitionType: "none" };
  }

  return {
    opportunityId: rule.opportunityId,
    incentiveType: "grant",
    cashValueClassification: "cash_grant",
    sourceConfidence: rule.sourceConfidence || rule.confidence || "medium",
    estimateConfidence: rule.estimateConfidence || (rule.confidence === "high" ? "high" : "medium"),
    valueModel,
    sourceOnlySaysUpTo,
    costShare:
      amountRule.kind === "percent_of_basis"
        ? {
            percent: Number(amountRule.percent || 0),
            requiresApplicantMatch: Number(amountRule.percent || 0) < 1,
            minimumApplicantSharePercent: Math.max(0, 1 - Number(amountRule.percent || 0))
          }
        : null,
    caps: {
      maxAwardCents: capCents,
      maxUnits: Number.isFinite(rule.cap?.maxUnits) ? Number(rule.cap.maxUnits) : null,
      maxPercentOfEligibleCost: Number.isFinite(rule.cap?.maxPercentOfBasis) ? Number(rule.cap.maxPercentOfBasis) : null
    },
    perUnitRates:
      amountRule.kind === "fixed_per_unit"
        ? [
            {
              metric: amountRule.unitAnswerKey || "unit_count",
              rateCents: Number(amountRule.amountCentsPerUnit || 0),
              unit: "unit"
            }
          ]
        : [],
    probabilityModel: rule.probabilityModel || { probabilityRequired: isPossibleGrant, probabilityEvidenceType: "none" },
    requiredInputs: legacyRequiredInputs(rule),
    evidenceText: rule.evidenceText || rule.formula || "",
    sourceUrls: rule.sourceUrlsChecked || rule.sourceUrls || [],
    humanReviewRequired: Boolean(rule.humanReviewRequired),
    humanReviewReasons: rule.humanReviewReasons || []
  };
}

function legacyProjectInputs(rule = {}, ctx = {}) {
  const amountRule = rule.amountRule || {};
  const answers = ctx.answers || {};
  const inputs = {
    eligibleProjectCostCents: Number(ctx.legacyIncentiveBasisCents ?? ctx.upfrontCostCents ?? 0)
  };

  if (amountRule.unitAnswerKey && hasAnswer(answers, amountRule.unitAnswerKey)) {
    inputs.unitCount = Number(answerValue(answers, amountRule.unitAnswerKey));
  }

  return inputs;
}

function legacyRequiredInputs(rule = {}) {
  const amountRule = rule.amountRule || {};
  if (amountRule.kind === "percent_of_basis") return ["eligibleProjectCostCents"];
  if (amountRule.kind === "fixed_per_unit") return [amountRule.unitAnswerKey || "unitCount"];
  return [];
}

function normalizeGrantRule(rule = {}) {
  return {
    opportunityId: rule.opportunityId || rule.opportunity_id || null,
    incentiveType: rule.incentiveType || "grant",
    cashValueClassification: rule.cashValueClassification || "cash_grant",
    sourceConfidence: normalizeConfidence(rule.sourceConfidence || rule.source_confidence, "medium"),
    estimateConfidence: normalizeConfidence(rule.estimateConfidence || rule.estimate_confidence, "medium"),
    valueModel: rule.valueModel || { kind: rule.valueModelKind || rule.kind || "no_calculable_value" },
    costShare: rule.costShare || null,
    caps: rule.caps || {},
    perUnitRates: Array.isArray(rule.perUnitRates) ? rule.perUnitRates : [],
    probabilityModel: rule.probabilityModel || null,
    requiredInputs: Array.isArray(rule.requiredInputs) ? rule.requiredInputs : [],
    missingInputs: Array.isArray(rule.missingInputs) ? rule.missingInputs : [],
    sourceOnlySaysUpTo: Boolean(rule.sourceOnlySaysUpTo || rule.source_only_says_up_to),
    evidenceText: rule.evidenceText || "",
    sourceUrls: Array.isArray(rule.sourceUrls) ? rule.sourceUrls : [],
    humanReviewRequired: Boolean(rule.humanReviewRequired),
    humanReviewReasons: Array.isArray(rule.humanReviewReasons) ? rule.humanReviewReasons : []
  };
}

function baseEstimate(rule) {
  return {
    schemaVersion: GRANT_ESTIMATE_SCHEMA_VERSION,
    opportunityId: rule.opportunityId,
    incentiveType: rule.incentiveType,
    cashValueClassification: rule.cashValueClassification,
    sourceConfidence: rule.sourceConfidence,
    estimateConfidence: rule.estimateConfidence,
    requiredInputs: rule.requiredInputs,
    missingInputs: [],
    evidenceText: rule.evidenceText,
    sourceUrls: rule.sourceUrls,
    humanReviewRequired: false,
    humanReviewReasons: [],
    reasonCodes: [],
    userFacingLabel: "Estimated grant",
    userFacingCaveat: "Subject to approval and program requirements.",
    computedEstimate: {
      estimateStatus: "not_calculable",
      estimatedAmountCents: null,
      estimateLowCents: null,
      estimateHighCents: null,
      conditionalAwardAmountCents: null,
      includedInUserFacingTotal: false,
      includedInInternalPipelineValue: true,
      calculationTrace: []
    }
  };
}

function deterministic(base, rule, amountCents, trace) {
  const estimate = {
    ...base,
    estimateConfidence: rule.estimateConfidence === "low" ? "low" : "high",
    computedEstimate: {
      estimateStatus: "deterministic_estimate",
      estimatedAmountCents: roundCents(amountCents),
      estimateLowCents: null,
      estimateHighCents: null,
      conditionalAwardAmountCents: roundCents(amountCents),
      includedInUserFacingTotal: false,
      includedInInternalPipelineValue: true,
      calculationTrace: trace
    },
    reasonCodes: ["SOURCE_OFFICIAL_AND_EXPLICIT"]
  };
  return finalizeInclusion(estimate);
}

function deterministicPercent(base, rule, inputs, capped) {
  const percent = Number(rule.costShare?.percent || 0);
  const eligibleProjectCostCents = Number(inputs.eligibleProjectCostCents || 0);
  const uncapped = percentOfCents(eligibleProjectCostCents, percent);
  const maxAwardCents = centsValue(rule.caps.maxAwardCents, rule.caps.maxAward);
  const amountCents = capped && Number.isFinite(maxAwardCents) ? Math.min(uncapped, maxAwardCents) : uncapped;
  const trace = [`eligibleProjectCostCents * ${percent} = ${uncapped}`];
  if (capped && Number.isFinite(maxAwardCents)) trace.push(`Applied maxAward cap of ${maxAwardCents}`);
  trace.push(`Estimated amount = ${amountCents}`);
  return deterministic(base, rule, amountCents, trace);
}

function deterministicPerUnit(base, rule, inputs) {
  const rate = rule.perUnitRates[0] || {};
  const unitCount = Number(inputs.unitCount || 0);
  const maxUnits = Number.isFinite(rule.caps.maxUnits) ? Number(rule.caps.maxUnits) : unitCount;
  const eligibleUnits = Math.min(unitCount, maxUnits);
  const uncapped = roundCents(eligibleUnits * centsValue(rate.rateCents, rate.rate));
  const maxAwardCents = centsValue(rule.caps.maxAwardCents, rule.caps.maxAward);
  const amountCents = Number.isFinite(maxAwardCents) ? Math.min(uncapped, maxAwardCents) : uncapped;
  return deterministic(base, rule, amountCents, [
    `Eligible units = min(${unitCount}, ${maxUnits}) = ${eligibleUnits}`,
    `Unit award = ${eligibleUnits} * ${centsValue(rate.rateCents, rate.rate)} = ${uncapped}`,
    `Estimated amount = ${amountCents}`
  ]);
}

function deterministicStudyGrant(base, rule, inputs) {
  const auditCostCents = Number(inputs.auditCostCents || 0);
  const percent = Number(rule.costShare?.percent || 0);
  const uncapped = percentOfCents(auditCostCents, percent);
  const maxAwardCents = centsValue(rule.caps.maxAwardCents, rule.caps.maxAward);
  const amountCents = Number.isFinite(maxAwardCents) ? Math.min(uncapped, maxAwardCents) : uncapped;
  return deterministic(base, rule, amountCents, [
    `auditCostCents * ${percent} = ${uncapped}`,
    `Estimated study grant amount = ${amountCents}`
  ]);
}

function competitiveExpectedValue(base, rule, inputs) {
  const conditionalAwardAmountCents = computeConditionalAward(rule, inputs);
  if (!Number.isFinite(conditionalAwardAmountCents)) {
    return suppress(base, "suppressed", ["NO_PROBABILITY_EVIDENCE"], [
      "Conditional award amount cannot be calculated."
    ]);
  }

  const probabilityDiscount = deriveProbabilityDiscount(rule.probabilityModel);
  if (!Number.isFinite(probabilityDiscount)) {
    return suppress(
      {
        ...base,
        computedEstimate: { ...base.computedEstimate, conditionalAwardAmountCents }
      },
      "suppressed",
      ["NO_PROBABILITY_EVIDENCE", "HUMAN_REVIEW_REQUIRED"],
      ["No source-backed probability evidence exists for the competitive grant."]
    );
  }

  const estimatedAmountCents = roundCents(conditionalAwardAmountCents * probabilityDiscount);
  const estimate = {
    ...base,
    estimateConfidence: "medium",
    userFacingLabel: "Conservative expected grant value",
    userFacingCaveat: "Competitive application required. Actual award may be lower or $0.",
    computedEstimate: {
      estimateStatus: "expected_value_estimate",
      estimatedAmountCents,
      estimateLowCents: null,
      estimateHighCents: null,
      conditionalAwardAmountCents,
      includedInUserFacingTotal: false,
      includedInInternalPipelineValue: true,
      calculationTrace: [
        `Conditional award = ${conditionalAwardAmountCents}`,
        `Probability discount = ${probabilityDiscount}`,
        `Expected value = ${estimatedAmountCents}`
      ]
    },
    reasonCodes: [probabilityReasonCode(rule.probabilityModel)]
  };
  return finalizeInclusion(estimate);
}

function competitiveMaxOnly(base, rule) {
  const highCents = centsValue(rule.valueModel.awardRange?.highCents, rule.valueModel.awardRange?.high);
  return suppress(
    {
      ...base,
      estimateConfidence: "low",
      userFacingLabel: "Competitive grant opportunity",
      userFacingCaveat:
        "Potential award is not included in estimated savings because actual award amount is not source-backed.",
      computedEstimate: { ...base.computedEstimate, conditionalAwardAmountCents: Number.isFinite(highCents) ? highCents : null }
    },
    "suppressed",
    ["COMPETITIVE_MAX_ONLY", "NO_PROBABILITY_EVIDENCE", "HUMAN_REVIEW_REQUIRED"],
    ["Source provides a maximum award only.", "User-facing expected value suppressed."]
  );
}

function computeConditionalAward(rule, inputs) {
  if (rule.valueModel.kind === "competitive_award_range") {
    return centsValue(rule.valueModel.awardRange?.lowCents, rule.valueModel.awardRange?.low);
  }

  const percent = Number(rule.costShare?.percent || 0);
  if (!percent || !Number.isFinite(inputs.eligibleProjectCostCents)) return null;
  const costShareAward = percentOfCents(inputs.eligibleProjectCostCents, percent);
  const maxAwardCents = centsValue(rule.caps.maxAwardCents, rule.caps.maxAward);
  return Number.isFinite(maxAwardCents) ? Math.min(costShareAward, maxAwardCents) : costShareAward;
}

export function deriveProbabilityDiscount(probabilityModel = {}) {
  if (!probabilityModel) return null;

  if (
    Number.isFinite(probabilityModel.historicalAwardsCount) &&
    Number.isFinite(probabilityModel.historicalApplicationsCount) &&
    Number(probabilityModel.historicalApplicationsCount) > 0
  ) {
    return clamp(
      Number(probabilityModel.historicalAwardsCount) / Number(probabilityModel.historicalApplicationsCount),
      0.02,
      0.35
    );
  }

  if (probabilityModel.probabilityEvidenceType === "first_come_funds_confirmed") return 0.5;
  if (probabilityModel.probabilityEvidenceType === "budget_and_expected_awards") return 0.1;
  if (
    probabilityModel.probabilityEvidenceType === "historical_awards_only" &&
    NARROW_COMPETITION_SCOPES.has(probabilityModel.competitionScope)
  ) {
    return 0.1;
  }
  if (Number.isFinite(probabilityModel.probabilityDiscount)) return Number(probabilityModel.probabilityDiscount);
  return null;
}

function suppress(base, status, reasonCodes, trace) {
  return {
    ...base,
    estimateConfidence: "low",
    humanReviewRequired: reasonCodes.includes("HUMAN_REVIEW_REQUIRED"),
    humanReviewReasons: reasonCodes,
    reasonCodes,
    computedEstimate: {
      ...base.computedEstimate,
      estimateStatus: status,
      includedInUserFacingTotal: false,
      calculationTrace: trace
    }
  };
}

function zero(base, reasonCode) {
  return {
    ...base,
    estimateConfidence: "high",
    userFacingLabel: zeroLabel(reasonCode),
    userFacingCaveat: "Not counted as grant funding.",
    reasonCodes: [reasonCode],
    computedEstimate: {
      estimateStatus: "zero_value",
      estimatedAmountCents: 0,
      estimateLowCents: null,
      estimateHighCents: null,
      conditionalAwardAmountCents: 0,
      includedInUserFacingTotal: false,
      includedInInternalPipelineValue: true,
      calculationTrace: [`${reasonCode}: grant value set to 0.`]
    }
  };
}

function finalizeInclusion(estimate) {
  return {
    ...estimate,
    computedEstimate: {
      ...estimate.computedEstimate,
      includedInUserFacingTotal: includeInUserFacingTotal(estimate)
    }
  };
}

function missingRequiredInputs(rule, inputs) {
  const missing = new Set(rule.missingInputs || []);
  for (const input of rule.requiredInputs || []) {
    if (!inputValuePresent(inputs, input)) missing.add(input);
  }
  return [...missing];
}

function inputValuePresent(inputs, input) {
  const aliases = input === "unit_count" ? ["unitCount", "unit_count"] : [input];
  return aliases.some((key) => inputs[key] !== undefined && inputs[key] !== null && inputs[key] !== "");
}

function reasonCodesForMissingInputs(missingInputs) {
  return missingInputs.map((input) => {
    if (input.includes("unit")) return "MISSING_UNIT_COUNT";
    if (input.includes("audit")) return "MISSING_AUDIT_COST";
    if (input.includes("cost")) return "MISSING_ELIGIBLE_PROJECT_COST";
    return "MISSING_EQUIPMENT_SPEC";
  });
}

function ambiguousUpToLanguage(rule) {
  const text = `${rule.formula || ""} ${rule.evidenceText || ""}`.toLowerCase();
  return /\b(up to|may receive|possible grant|competitive|subject to)\b/.test(text);
}

function isCompetitiveValueModel(kind) {
  return kind === "competitive_cost_share" || kind === "competitive_award_range" || kind === "competitive_max_only";
}

function reasonForNonGrantClassification(classification) {
  if (classification === "loan" || classification === "financing") return "LOAN_NOT_GRANT";
  if (classification === "tax_credit") return "TAX_CREDIT_NOT_GRANT";
  if (classification === "technical_assistance") return "NON_CASH_ASSISTANCE";
  return "HUMAN_REVIEW_REQUIRED";
}

function zeroLabel(reasonCode) {
  if (reasonCode === "LOAN_NOT_GRANT") return "Financing available";
  if (reasonCode === "TAX_CREDIT_NOT_GRANT") return "Tax incentive";
  if (reasonCode === "NON_CASH_ASSISTANCE") return "Technical assistance available";
  return "No grant value";
}

function probabilityReasonCode(probabilityModel = {}) {
  if (probabilityModel?.historicalAwardsCount && probabilityModel?.historicalApplicationsCount) {
    return "HISTORICAL_SUCCESS_RATE_USED";
  }
  if (probabilityModel?.probabilityEvidenceType === "first_come_funds_confirmed") return "FIRST_COME_FUNDING_CONFIRMED";
  return "HUMAN_REVIEW_REQUIRED";
}

function centsValue(cents, dollars) {
  if (Number.isFinite(cents)) return roundCents(cents);
  if (Number.isFinite(dollars)) return roundCents(Number(dollars) * 100);
  return null;
}

function normalizeConfidence(value, fallback) {
  return CONFIDENCES.has(value) ? value : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
