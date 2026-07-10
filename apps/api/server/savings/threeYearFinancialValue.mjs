import { monthlyToAnnualCents } from "./formulas.mjs";

export const THREE_YEAR_FINANCIAL_VALUE_SCHEMA_VERSION = "three-year-financial-value-v1";
export const THREE_YEAR_FINANCIAL_VALUE_METRIC = "three_year_net_financial_value_equivalent";
export const THREE_YEAR_FINANCIAL_VALUE_HORIZON_YEARS = 3;
export const THREE_YEAR_FINANCIAL_VALUE_MODEL_VERSION = "three-year-financial-value-model-v1";

const HORIZON_YEARS = THREE_YEAR_FINANCIAL_VALUE_HORIZON_YEARS;
const LIKELIHOOD_UNKNOWN = "unknown";
const LIKELIHOOD_NEAR_GUARANTEED = "near-guaranteed";

export const THREE_YEAR_SCALING_ASSUMPTION_REGISTRY = {
  schemaVersion: "three-year-financial-value-scaling-assumptions-v1",
  entries: [
    {
      retrofitTypeId: "led_lighting_retrofit",
      assumptionId: "led-lights-square-footage-density-v1",
      assumptionSource: "product_policy",
      amountScalingMode: "per_replacement",
      candidates: [
        {
          mode: "square_footage_density",
          sourceField: "site.squareFootage.value",
          unit: "fixture",
          driverDescription: "1 fixture per 1000 square feet",
          min: 0,
          typical: 1,
          max: 1,
          presentation: {
            rounding: "nearest_integer",
            outwardQuantityProxy: true
          }
        },
        {
          mode: "provided_intro_value",
          sourceField: "site.unit_count",
          unit: "unit",
          driverDescription: "fixture_count provided by intro form"
        }
      ],
      replacementFieldPointers: [
        {
          formFieldKey: "fixture_count",
          replacementField: true,
          replacementReason: "Quantity inferred from square footage for LED retrofit form display only."
        }
      ]
    },
    {
      retrofitTypeId: "rooftop_solar_pv",
      assumptionId: "solar-roof-area-ratio-v1",
      assumptionSource: "product_policy",
      amountScalingMode: "per_installed_capacity",
      candidates: [
        {
          mode: "roof_area_ratio",
          sourceField: "site.roofAreaSquareFeet.value",
          unit: "kW",
          driverDescription: "1 kW per 120 square feet",
          min: 0,
          typical: 4,
          max: 20,
          numeratorField: "installation_unit_count",
          denominatorField: "site.roofAreaSquareFeet.value"
        },
        {
          mode: "project_cost_proxy",
          sourceField: "estimatedProjectCostCents",
          unit: "unit",
          driverDescription: "1 capacity bucket per $10k installed cost"
        },
        {
          mode: "provided_intro_value",
          sourceField: "site.system_kw",
          unit: "kW",
          driverDescription: "system_kw entered in intro form"
        }
      ],
      replacementFieldPointers: [
        {
          formFieldKey: "installed_cost_cents",
          replacementField: false,
          replacementReason: "Roof-area and capacity assumptions are not persisted into the intro form directly."
        }
      ]
    },
    {
      retrofitTypeId: "high_efficiency_hvac_retrofit",
      assumptionId: "hvac-fixed-value-v1",
      assumptionSource: "product_policy",
      amountScalingMode: "fixed_project_total",
      candidates: [
        {
          mode: "not_required",
          unit: "project",
          driverDescription: "Modeled HVAC replacement assumes fixed project-level economics in current fixtures."
        }
      ]
    },
    {
      retrofitTypeId: "high_efficiency_furnace_retrofit",
      assumptionId: "furnace-fixed-value-v1",
      assumptionSource: "product_policy",
      amountScalingMode: "fixed_project_total",
      candidates: [
        {
          mode: "not_required",
          unit: "project",
          driverDescription: "Modeled furnace replacement assumes fixed project-level economics in current fixtures."
        }
      ]
    }
  ]
};

function readNormalizedProfileNumber(normalizedProfile, sourceField) {
  const segments = String(sourceField).split(".");
  let cursor = normalizedProfile;
  for (const segment of segments) {
    cursor = cursor?.[segment];
    if (cursor == null) return null;
    if (segment === "value" && typeof cursor?.value !== "undefined") {
      cursor = cursor.value;
    }
  }

  return parseFiniteNumber(cursor);
}

function formatCandidateReason(candidate) {
  return candidate?.driverDescription ? candidate.driverDescription : candidate?.mode || "unknown";
}

function chooseScalingCandidate(candidates = [], normalizedProfile = {}) {
  for (const candidate of candidates) {
    if (candidate?.mode === "not_required") {
      return {
        status: "active",
        quantityEstimationMode: "not_required",
        candidate: {
          ...candidate,
          available: true
        }
      };
    }

    if (candidate?.mode === "provided_intro_value" && candidate.sourceField) {
      const value = readNormalizedProfileNumber(normalizedProfile, candidate.sourceField);
      if (value !== null) {
        return {
          status: "active",
          quantityEstimationMode: "provided_intro_value",
          candidate,
          quantityEstimate: toIntegerCents(value)
        };
      }
      continue;
    }

    if (candidate?.sourceField && candidate.mode !== "not_required") {
      const value = readNormalizedProfileNumber(normalizedProfile, candidate.sourceField);
      if (value !== null) {
        return {
          status: "active",
          quantityEstimationMode: candidate.mode,
          candidate,
          quantityEstimate: toIntegerCents(value)
        };
      }
    }
  }

  return {
    status: "partial",
    quantityEstimationMode: "unknown",
    reason: "No supported quantity proxy was available from profile or intro values.",
    candidates
  };
}

function calculateQuantizedQuantity(candidate, value) {
  if (!candidate || value == null || !Number.isFinite(value)) return null;
  const unit = candidate.unit || "unit";
  if (candidate.mode === "square_footage_density") {
    const denominator = 1000;
    return {
      mode: candidate.mode,
      quantity: toIntegerCents(value / denominator),
      unit,
      min: candidate.min || 1,
      typical: candidate.typical || 1,
      max: candidate.max || 1
    };
  }
  if (candidate.mode === "roof_area_ratio") {
    return {
      mode: candidate.mode,
      quantity: toIntegerCents(value / 120),
      unit,
      min: candidate.min || 0,
      typical: candidate.typical || 4,
      max: candidate.max || 20
    };
  }
  if (candidate.mode === "project_cost_proxy") {
    return {
      mode: candidate.mode,
      quantity: toIntegerCents(value / 100000),
      unit,
      min: candidate.min || 0,
      typical: candidate.typical || 1,
      max: candidate.max || 100
    };
  }

  return {
    mode: candidate.mode,
    quantity: toIntegerCents(value),
    unit,
    min: candidate.min,
    typical: candidate.typical,
    max: candidate.max
  };
}

function buildScalingAssumptionFromEntry(entry, normalizedProfile = {}) {
  const best = chooseScalingCandidate(entry.candidates || [], normalizedProfile);
  const base = {
    retrofitTypeId: entry.retrofitTypeId,
    assumptionId: entry.assumptionId,
    assumptionSource: entry.assumptionSource,
    amountScalingMode: entry.amountScalingMode,
    quantityEstimationMode: best.quantityEstimationMode,
    replacementFieldPointers: entry.replacementFieldPointers
  };

  if (best.status === "active") {
    return {
      ...base,
      status: "active",
      driverReason: formatCandidateReason(best.candidate),
      chosenSourceField: best.candidate?.sourceField || null,
      chosenQuantity: calculateQuantizedQuantity(best.candidate, best.quantityEstimate)
    };
  }

  return {
    ...base,
    status: "partial",
    reason: best.reason,
    requiredDriver: (entry.candidates || []).map((candidate) => candidate.mode)
  };
}

function buildScalingAssumptions(retrofitTypeId, normalizedProfile = {}) {
  const entry = THREE_YEAR_SCALING_ASSUMPTION_REGISTRY.entries.find(
    (row) => row.retrofitTypeId === retrofitTypeId
  );
  if (!entry) {
    return [
      {
        retrofitTypeId,
        assumptionSource: "module_default",
        amountScalingMode: "fixed_project_total",
        quantityEstimationMode: "unknown",
        status: "partial",
        reason: "No product-policy scaling assumption is currently modeled for this retrofit type."
      }
    ];
  }

  return [buildScalingAssumptionFromEntry(entry, normalizedProfile)];
}

function parseFiniteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toIntegerCents(value) {
  const parsed = parseFiniteNumber(value);
  if (parsed === null) return null;
  const rounded = Math.trunc(Math.round(parsed));
  return Number.isSafeInteger(rounded) ? rounded : null;
}

function firstFinite(...values) {
  for (const value of values) {
    if (Number.isFinite(value)) return value;
  }
  return null;
}

function addSignedInt(a, b) {
  if (a === null || b === null) return null;
  return toIntegerCents(a + b);
}

function normalizeAwardLikelihood(raw) {
  if (raw == null) return LIKELIHOOD_UNKNOWN;
  const normalized = String(raw).trim().toLowerCase().replace(/_/g, "-");
  if (normalized === LIKELIHOOD_NEAR_GUARANTEED) return LIKELIHOOD_NEAR_GUARANTEED;
  if (["uncertain", "possible", "likely", "unknown"].includes(normalized)) return normalized;
  if (["near guaranteed", "nearguaranteed", "high"].includes(normalized)) return LIKELIHOOD_NEAR_GUARANTEED;
  if (["low", "unlikely"].includes(normalized)) return "uncertain";
  return LIKELIHOOD_UNKNOWN;
}

function isNearGuaranteedLikelihood(likelihood) {
  return likelihood === LIKELIHOOD_NEAR_GUARANTEED;
}

function isUnsupportedEntry(entry = {}) {
  const formula = String(entry.formula || "").toLowerCase();
  return formula === "unsupported_formula" || formula.includes("unsupported formula") || formula.includes("not_supported");
}

function annualizeRecurringEntry(entry = {}) {
  const period = entry.period;
  const amount = parseFiniteNumber(entry.annualizedAmountCents);
  const rawAmount = amount ?? parseFiniteNumber(entry.amountCents);
  if (rawAmount === null) return null;

  if (period === "monthly") {
    if (!Number.isFinite(rawAmount)) return null;
    return toIntegerCents(monthlyToAnnualCents(rawAmount));
  }

  return toIntegerCents(rawAmount);
}

function addThreeYears(value) {
  return value === null ? null : toIntegerCents(value * HORIZON_YEARS);
}

function groupScenarioEntries(entries = []) {
  const grouped = new Map();
  for (const rawEntry of entries) {
    const opportunityId = String(rawEntry?.opportunityId || "");
    if (!opportunityId) continue;

    const entry = { ...rawEntry };
    const current = grouped.get(opportunityId) || {
      oneTimeCents: 0,
      recurringAnnualCents: 0,
      hasRecurring: false,
      sourceIds: [],
      hasUnsupportedFormula: false
    };

    const sourceId = entry.incentiveRuleId || entry.id || entry.ruleId || "unsupported_entry";
    const amount = toIntegerCents(entry.amountCents);

    if (isUnsupportedEntry(entry)) {
      current.hasUnsupportedFormula = true;
      current.sourceIds.push(sourceId);
      grouped.set(opportunityId, current);
      continue;
    }

    if (entry.kind === "upfront_savings") {
      if (amount !== null) current.oneTimeCents += amount;
    } else if (amount !== null) {
      const recurringAnnualCents = annualizeRecurringEntry(entry);
      if (recurringAnnualCents !== null) {
        current.recurringAnnualCents += recurringAnnualCents;
        current.hasRecurring = true;
      }
    }

    current.sourceIds.push(sourceId);
    grouped.set(opportunityId, current);
  }

  return grouped;
}

function unique(values) {
  const seen = new Set();
  return values.filter((value) => {
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function buildOpportunityOrder(retrofitGroup = {}, selectedScenario = {}, groupedEntries = new Map(), alternativeScenarios = []) {
  const selectedOpportunityOrder = Array.isArray(retrofitGroup.opportunities) ? retrofitGroup.opportunities : [];
  const orderedIds = selectedOpportunityOrder
    .map((opportunity) => opportunity?.opportunityId)
    .filter((value) => typeof value === "string" && value.length > 0);

  const selectedOpportunityIds = new Set(Array.isArray(selectedScenario.opportunityIds) ? selectedScenario.opportunityIds : []);
  const alternativeOpportunityIds = new Set(
    alternativeScenarios.flatMap((scenario) => Array.isArray(scenario?.opportunityIds) ? scenario.opportunityIds : [])
  );
  const groupedIds = [...groupedEntries.keys()];

  const extra = new Set();
  for (const opportunityId of [...selectedOpportunityIds, ...alternativeOpportunityIds, ...groupedIds]) {
    if (!orderedIds.includes(opportunityId) && typeof opportunityId === "string") {
      extra.add(opportunityId);
    }
  }

  return [...orderedIds, ...extra];
}

function buildOneTimeBaseline({ selectedScenario = {}, estimate = {} }) {
  const structuredEntries = Array.isArray(selectedScenario?.upfrontSavingsEntries)
    ? selectedScenario.upfrontSavingsEntries.filter((entry) => !isUnsupportedEntry(entry))
    : [];

  const structuredOneTimeSource = structuredEntries.length > 0
    ? toIntegerCents(structuredEntries.reduce((sum, entry) => sum + toIntegerCents(entry.amountCents || 0), 0))
    : null;
  if (structuredOneTimeSource !== null) {
    return {
      cents: structuredOneTimeSource,
      source: "selected_scenario_upfront_entries",
      missing: false
    };
  }

  const oneTimeSavingsCents = parseFiniteNumber(estimate.oneTimeSavingsCents);
  if (oneTimeSavingsCents !== null) {
    return {
      cents: toIntegerCents(oneTimeSavingsCents),
      source: "estimate_oneTimeSavingsCents",
      missing: false
    };
  }

  const upfrontSavingsCents = parseFiniteNumber(estimate.upfrontSavingsCents);
  if (upfrontSavingsCents !== null) {
    return {
      cents: toIntegerCents(upfrontSavingsCents),
      source: "estimate_upfrontSavingsCents",
      missing: false
    };
  }

  return {
    cents: null,
    source: "missing",
    missing: true
  };
}

function buildRecurringBaseline({ estimate = {} }) {
  const netAnnualRecurringSavingsCents = parseFiniteNumber(estimate.netAnnualRecurringSavingsCents);
  if (netAnnualRecurringSavingsCents !== null) {
    return {
      cents: toIntegerCents(netAnnualRecurringSavingsCents),
      source: "estimate_netAnnualRecurringSavingsCents",
      missing: false
    };
  }

  const annualSavingsCents = parseFiniteNumber(estimate.annualSavingsCents);
  const annualRecurringExpensesCents = parseFiniteNumber(estimate.annualRecurringExpensesCents);
  if (annualSavingsCents !== null && annualRecurringExpensesCents !== null) {
    return {
      cents: toIntegerCents(annualSavingsCents - annualRecurringExpensesCents),
      source: "annualSavingsMinusAnnualRecurringExpenses",
      missing: false
    };
  }

  const netMonthlyRecurringSavingsCents = parseFiniteNumber(estimate.netMonthlyRecurringSavingsCents);
  if (netMonthlyRecurringSavingsCents !== null) {
    return {
      cents: toIntegerCents(monthlyToAnnualCents(netMonthlyRecurringSavingsCents)),
      source: "annualized_estimate_netMonthlyRecurringSavingsCents",
      missing: false
    };
  }

  const monthlyRecurringSavingsCents = parseFiniteNumber(estimate.monthlyRecurringSavingsCents);
  const annualRecurringSavingsCents = parseFiniteNumber(estimate.annualRecurringSavingsCents);
  const recurringSavingsCents = firstFinite(monthlyRecurringSavingsCents, annualRecurringSavingsCents);
  if (recurringSavingsCents !== null) {
    return {
      cents: monthlyRecurringSavingsCents !== null
        ? toIntegerCents(monthlyToAnnualCents(monthlyRecurringSavingsCents))
        : toIntegerCents(annualRecurringSavingsCents),
      source: "legacyRecurringSavingsFallback",
      missing: false
    };
  }

  return {
    cents: null,
    source: "missing",
    missing: true
  };
}

function buildContributionRangeForOpportunity({ oneTimeCents, recurringThreeYearCents }, isNearGuaranteed) {
  if (isNearGuaranteed) {
    return {
      oneTimeContributionCents: {
        minimum: oneTimeCents,
        maximum: oneTimeCents
      },
      recurringThreeYearContributionCents: {
        minimum: recurringThreeYearCents,
        maximum: recurringThreeYearCents
      },
      nearGuaranteedOnlyMaximumCents: toIntegerCents(firstFinite(oneTimeCents, 0) + firstFinite(recurringThreeYearCents, 0)),
      uncertainContributionMaximumCents: {
        minimum: 0,
        maximum: 0
      }
    };
  }

  return {
    oneTimeContributionCents: {
      minimum: 0,
      maximum: oneTimeCents
    },
    recurringThreeYearContributionCents: {
      minimum: 0,
      maximum: recurringThreeYearCents
    },
    nearGuaranteedOnlyMaximumCents: {
      minimum: 0,
      maximum: 0
    },
    uncertainContributionMaximumCents: {
      minimum: 0,
      maximum: toIntegerCents(firstFinite(oneTimeCents, 0) + firstFinite(recurringThreeYearCents, 0))
    }
  };
}

function asBounds(value) {
  if (value === null) return { minimum: 0, maximum: 0, quantifiable: false };
  return { minimum: value, maximum: value, quantifiable: true };
}

export function buildThreeYearFinancialValue({
  retrofitGroup = {},
  estimate = {},
  normalizedProfile = {},
  opportunityIncentiveRules = [],
  opportunityCalculationPackages = []
}) {
  const selectedScenario = estimate.selectedIncentiveScenario || {};
  const alternativeScenarios = Array.isArray(estimate.alternativeScenarios) ? estimate.alternativeScenarios : [];

  const selectedOpportunityIds = new Set(Array.isArray(selectedScenario.opportunityIds) ? selectedScenario.opportunityIds : []);
  const alternativeOpportunityIds = new Set(
    alternativeScenarios.flatMap((scenario) => Array.isArray(scenario?.opportunityIds) ? scenario?.opportunityIds : [])
  );

  const selectedEntries = [
    ...(Array.isArray(selectedScenario.upfrontSavingsEntries) ? selectedScenario.upfrontSavingsEntries : []),
    ...(Array.isArray(selectedScenario.recurringSavingsEntries) ? selectedScenario.recurringSavingsEntries : [])
  ];

  const groupedEntries = groupScenarioEntries(selectedEntries);
  const oneTimeBaseline = buildOneTimeBaseline({ selectedScenario, estimate });
  const recurringBaseline = buildRecurringBaseline({ estimate });
  const recurringThreeYearBaseline = recurringBaseline.cents === null ? null : addThreeYears(recurringBaseline.cents);

  const order = buildOpportunityOrder(retrofitGroup, selectedScenario, groupedEntries, alternativeScenarios);
  const opportunityById = new Map(
    Array.isArray(retrofitGroup.opportunities)
      ? retrofitGroup.opportunities.map((opportunity) => [opportunity?.opportunityId, opportunity]).filter(([opportunityId]) => typeof opportunityId === "string")
      : []
  );

  const opportunityBreakdown = [];
  const excludedContributions = [];
  const rangeDrivers = [];

  let nearGuaranteedOneTimeMinimum = 0;
  let nearGuaranteedOneTimeMaximum = 0;
  let nearGuaranteedRecurringMinimum = 0;
  let nearGuaranteedRecurringMaximum = 0;
  let uncertainOneTimeMaximum = 0;
  let uncertainRecurringMaximum = 0;

  let hasAnyOpportunityQuantified = false;

  for (const opportunityId of order) {
    const opportunity = opportunityById.get(opportunityId) || { opportunityId, awardLikelihood: LIKELIHOOD_UNKNOWN };
    const likelihood = normalizeAwardLikelihood(opportunity.awardLikelihood);
    const requiresProgramApproval = opportunity?.requiresProgramApproval === true;
    const contribution = groupedEntries.get(opportunityId) || {
      oneTimeCents: 0,
      recurringAnnualCents: 0,
      hasRecurring: false,
      sourceIds: [],
      hasUnsupportedFormula: false
    };

    const opportunitySelected = selectedOpportunityIds.has(opportunityId);
    const excludedByAlternative = !opportunitySelected && alternativeOpportunityIds.has(opportunityId);

    const hasRecurring = contribution.hasRecurring;
    const hasSummary = contribution.sourceIds.length > 0;
    const hasUnsupportedFormula = contribution.hasUnsupportedFormula;
    const hasQuantifiedEstimate = hasSummary && !contribution.hasUnsupportedFormula;

    if (hasUnsupportedFormula) {
      excludedContributions.push({
        opportunityId,
        reason: "unsupported_formula",
        amountCents: null,
        metadata: {
          status: "unsupported_formula"
        }
      });
    }

    const oneTimeCents = toIntegerCents(contribution.oneTimeCents);
    const recurringThreeYearCents = hasRecurring ? addThreeYears(toIntegerCents(contribution.recurringAnnualCents)) : null;
    const contributionRange = buildContributionRangeForOpportunity(
      {
        oneTimeCents,
        recurringThreeYearCents: recurringThreeYearCents ?? null
      },
      isNearGuaranteedLikelihood(likelihood)
    );

    if (isNearGuaranteedLikelihood(likelihood)) {
      nearGuaranteedOneTimeMinimum = addSignedInt(nearGuaranteedOneTimeMinimum, contributionRange.oneTimeContributionCents.minimum);
      nearGuaranteedOneTimeMaximum = addSignedInt(nearGuaranteedOneTimeMaximum, contributionRange.oneTimeContributionCents.maximum);
      nearGuaranteedRecurringMinimum = addSignedInt(nearGuaranteedRecurringMinimum, contributionRange.recurringThreeYearContributionCents.minimum);
      nearGuaranteedRecurringMaximum = addSignedInt(nearGuaranteedRecurringMaximum, contributionRange.recurringThreeYearContributionCents.maximum);
    } else {
      uncertainOneTimeMaximum = addSignedInt(uncertainOneTimeMaximum, contributionRange.uncertainContributionMaximumCents.maximum);
      uncertainRecurringMaximum = addSignedInt(uncertainRecurringMaximum, contributionRange.recurringThreeYearContributionCents.maximum);
    }

    const breakdown = {
      opportunityId,
      awardLikelihood: likelihood,
      requiresProgramApproval,
      selected: opportunitySelected,
      hasQuantifiedEstimate,
      oneTimeContributionCents: contributionRange.oneTimeContributionCents,
      recurringThreeYearContributionCents: contributionRange.recurringThreeYearContributionCents,
      excludedReasons: excludedByAlternative || contribution.hasUnsupportedFormula ? [] : [],
      contributionTrace: {
        sourceIds: unique(contribution.sourceIds),
        formulaSummary: isNearGuaranteedLikelihood(likelihood) ? "near-guaranteed" : "non-guaranteed"
      },
      rangeDrivers: [
        {
          id: "opportunity_award_likelihood",
          value: likelihood
        }
      ]
    };

    if (excludedByAlternative) {
      breakdown.excludedReasons.push("mutually_exclusive_scenario_choice");
      excludedContributions.push({
        opportunityId,
        reason: "mutually_exclusive_scenario_choice",
        metadata: {
          selectedScenarioId: selectedScenario?.id || null,
          selectedOpportunityIds: [...selectedOpportunityIds]
        }
      });
    }
    if (!hasSummary && opportunitySelected) {
      breakdown.hasQuantifiedEstimate = false;
    }

    if (hasQuantifiedEstimate) {
      hasAnyOpportunityQuantified = true;
      if (isNearGuaranteedLikelihood(likelihood)) {
        if (contributionRange.nearGuaranteedOnlyMaximumCents !== null) {
          rangeDrivers.push({
            id: "near_guaranteed_addition",
            category: "opportunity",
            amount: contributionRange.nearGuaranteedOnlyMaximumCents
          });
        }
      } else if (contributionRange.uncertainContributionMaximumCents.maximum !== 0) {
        rangeDrivers.push({
          id: "uncertain_addition",
          category: "opportunity",
          amount: contributionRange.uncertainContributionMaximumCents.maximum
        });
      }
    }

    opportunityBreakdown.push(breakdown);
  }

  const nearGuaranteedTotal = {
    minimum: addSignedInt(nearGuaranteedOneTimeMinimum, nearGuaranteedRecurringMinimum),
    maximum: addSignedInt(nearGuaranteedOneTimeMaximum, nearGuaranteedRecurringMaximum)
  };
  const uncertainTotalMaximum = addSignedInt(uncertainOneTimeMaximum, uncertainRecurringMaximum);

  if (oneTimeBaseline.missing) {
    rangeDrivers.push({
      id: "mandatory_one_time_missing",
      category: "mandatory",
      reason: oneTimeBaseline.source
    });
  }
  if (recurringBaseline.missing) {
    rangeDrivers.push({
      id: "mandatory_recurring_missing",
      category: "mandatory",
      reason: recurringBaseline.source
    });
  }

  const hasQuantifiedMandatory = oneTimeBaseline.cents !== null || recurringThreeYearBaseline !== null;
  const minimumThreeYearFinancialValueCents = hasQuantifiedMandatory
    ? addSignedInt(
      oneTimeBaseline.cents ?? 0,
      addSignedInt(
        recurringThreeYearBaseline,
        nearGuaranteedTotal.minimum
      )
    )
    : null;
  const maximumThreeYearFinancialValueCents = hasQuantifiedMandatory
    ? addSignedInt(
      oneTimeBaseline.cents ?? 0,
      addSignedInt(
        recurringThreeYearBaseline,
        addSignedInt(
          nearGuaranteedTotal.maximum,
          uncertainTotalMaximum
        )
      )
    )
    : null;

  const oneTimeContributionCents = asBounds(oneTimeBaseline.cents);
  const recurringThreeYearContributionCents = recurringThreeYearBaseline === null
    ? { minimum: null, maximum: null }
    : asBounds(recurringThreeYearBaseline);

  const minimumBoundStatus = oneTimeBaseline.cents === null || recurringThreeYearBaseline === null ? "unquantifiable" : "quantified";
  const maximumBoundStatus = minimumBoundStatus;

  const capMetadata = [];
  for (const explanation of Array.isArray(selectedScenario.capExplanations) ? selectedScenario.capExplanations : []) {
    capMetadata.push({
      source: "incentive_scenario",
      status: explanation?.status || "cap_metadata",
      ...explanation
    });
  }
  for (const summary of Array.isArray(estimate.incentiveCalculationPackageSummaries) ? estimate.incentiveCalculationPackageSummaries : []) {
    capMetadata.push({
      source: "package_summary",
      status: summary.runtimeInclusionStatus,
      packageOpportunityId: summary.opportunityId,
      programName: summary.programName
    });
  }

  const completeZero = oneTimeBaseline.cents === 0 && recurringThreeYearBaseline === 0 && nearGuaranteedTotal.minimum === 0 && uncertainTotalMaximum === 0;

  return {
    schemaVersion: THREE_YEAR_FINANCIAL_VALUE_SCHEMA_VERSION,
    modelVersion: THREE_YEAR_FINANCIAL_VALUE_MODEL_VERSION,
    metric: THREE_YEAR_FINANCIAL_VALUE_METRIC,
    horizonYears: HORIZON_YEARS,
    estimateStage: "intro",
    minimumThreeYearFinancialValueCents,
    maximumThreeYearFinancialValueCents,
    hasQuantifiedEstimate: hasQuantifiedMandatory || hasAnyOpportunityQuantified,
    oneTimeContributionCents,
    recurringThreeYearContributionCents,
    nearGuaranteedContributionCents: {
      minimum: nearGuaranteedTotal.minimum,
      maximum: nearGuaranteedTotal.maximum
    },
    nearGuaranteedOnlyMaximum: {
      minimum: 0,
      maximum: nearGuaranteedTotal.maximum
    },
    uncertainContributionMaximumCents: {
      minimum: 0,
      maximum: uncertainTotalMaximum
    },
    uncertainIncrementalUpsideCents: {
      minimum: 0,
      maximum: uncertainTotalMaximum
    },
    completeness: {
      status: hasQuantifiedMandatory && hasAnyOpportunityQuantified ? "quantified" : hasQuantifiedMandatory ? "partially_quantified" : "unquantifiable",
      minimumBoundStatus,
      maximumBoundStatus,
      reasons: rangeDrivers.filter((driver) => driver.id.includes("missing")).map((driver) => ({ id: driver.id, reason: driver.reason }))
    },
    counts: {
      opportunityCount: order.length,
      selectedOpportunityCount: [...selectedOpportunityIds].filter((opportunityId) => order.includes(opportunityId)).length,
      scenarioExcludedOpportunityCount: [...alternativeOpportunityIds].filter((oppId) => !selectedOpportunityIds.has(oppId)).length,
      excludedContributionCount: excludedContributions.length,
      capMetadataCount: capMetadata.length
    },
    rangeDrivers,
    opportunityBreakdown,
    scalingAssumptions: buildScalingAssumptions(retrofitGroup?.retrofitTypeId, normalizedProfile),
    excludedContributions,
    calculationTrace: {
      steps: [
        {
          stage: "mandatory_selection",
          oneTimeCents: oneTimeBaseline.cents,
          source: oneTimeBaseline.source,
          status: oneTimeBaseline.missing ? "missing" : "available"
        },
        {
          stage: "recurring_selection",
          recurringThreeYearCents: recurringThreeYearBaseline,
          source: recurringBaseline.source,
          status: recurringBaseline.missing ? "missing" : "available"
        },
        {
          stage: "opportunity_selection",
          selectedOpportunityIds: [...selectedOpportunityIds],
          excludedByScenarioOpportunityIds: [...alternativeOpportunityIds].filter((opportunityId) => !selectedOpportunityIds.has(opportunityId))
        },
        {
          stage: "cap_metadata",
          capMetadata
        }
      ],
      bounds: {
        oneTimeCompleteZero: oneTimeBaseline.cents === 0 && !oneTimeBaseline.missing,
        recurringCompleteZero: recurringThreeYearBaseline === 0 && !recurringBaseline.missing,
        completeZero
      }
    },
    opportunityIncentiveRuleCount: Array.isArray(opportunityIncentiveRules) ? opportunityIncentiveRules.length : 0,
    opportunityCalculationPackageCount: Array.isArray(opportunityCalculationPackages) ? opportunityCalculationPackages.length : 0
  };
}
