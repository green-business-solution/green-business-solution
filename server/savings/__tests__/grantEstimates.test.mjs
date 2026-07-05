import { describe, expect, it } from "vitest";
import { calculateIncentiveAward } from "../incentives.mjs";
import { buildGrantEstimate, deriveProbabilityDiscount } from "../grantEstimates.mjs";

describe("grant estimates", () => {
  it("computes deterministic capped percent grants when source and project inputs are sufficient", () => {
    const estimate = buildGrantEstimate(
      {
        opportunityId: "opp_123",
        sourceConfidence: "high",
        estimateConfidence: "high",
        cashValueClassification: "cash_grant",
        valueModel: { kind: "capped_percent_of_eligible_cost", competitionType: "none" },
        costShare: { percent: 0.5, requiresApplicantMatch: true, minimumApplicantSharePercent: 0.5 },
        caps: { maxAwardCents: 2500000 },
        requiredInputs: ["eligibleProjectCostCents"]
      },
      { eligibleProjectCostCents: 8000000 }
    );

    expect(estimate.computedEstimate.estimateStatus).toBe("deterministic_estimate");
    expect(estimate.computedEstimate.estimatedAmountCents).toBe(2500000);
    expect(estimate.computedEstimate.includedInUserFacingTotal).toBe(true);
    expect(estimate.estimateConfidence).toBe("high");
  });

  it("computes competitive expected value only when conditional amount and probability evidence exist", () => {
    const estimate = buildGrantEstimate(
      {
        opportunityId: "opp_456",
        sourceConfidence: "high",
        cashValueClassification: "cash_grant",
        valueModel: { kind: "competitive_cost_share", competitionType: "competitive" },
        costShare: { percent: 0.4, requiresApplicantMatch: true, minimumApplicantSharePercent: 0.6 },
        caps: { maxAwardCents: 50000000 },
        probabilityModel: {
          probabilityRequired: true,
          historicalAwardsCount: 30,
          historicalApplicationsCount: 300
        },
        requiredInputs: ["eligibleProjectCostCents"]
      },
      { eligibleProjectCostCents: 75000000 }
    );

    expect(estimate.computedEstimate.estimateStatus).toBe("expected_value_estimate");
    expect(estimate.computedEstimate.conditionalAwardAmountCents).toBe(30000000);
    expect(estimate.computedEstimate.estimatedAmountCents).toBe(3000000);
    expect(estimate.computedEstimate.includedInUserFacingTotal).toBe(true);
    expect(estimate.estimateConfidence).toBe("medium");
  });

  it("suppresses max-only competitive grants instead of treating the cap as an estimate", () => {
    const estimate = buildGrantEstimate({
      opportunityId: "opp_789",
      sourceConfidence: "medium",
      cashValueClassification: "cash_grant",
      valueModel: {
        kind: "competitive_max_only",
        awardRange: { lowCents: null, highCents: 25000000, rangeBasis: "published_min_max" },
        competitionType: "competitive"
      },
      probabilityModel: { probabilityRequired: true, probabilityEvidenceType: "none" }
    });

    expect(estimate.computedEstimate.estimateStatus).toBe("suppressed");
    expect(estimate.computedEstimate.conditionalAwardAmountCents).toBe(25000000);
    expect(estimate.computedEstimate.includedInUserFacingTotal).toBe(false);
    expect(estimate.humanReviewRequired).toBe(true);
    expect(estimate.humanReviewReasons).toContain("COMPETITIVE_MAX_ONLY");
  });

  it("suppresses low-source-confidence grants even if the formula is otherwise deterministic", () => {
    const estimate = buildGrantEstimate(
      {
        opportunityId: "opp_low",
        sourceConfidence: "low",
        cashValueClassification: "cash_grant",
        valueModel: { kind: "fixed_amount", amountCents: 500000 },
        requiredInputs: []
      },
      {}
    );

    expect(estimate.computedEstimate.estimateStatus).toBe("suppressed");
    expect(estimate.computedEstimate.estimatedAmountCents).toBeNull();
    expect(estimate.computedEstimate.includedInUserFacingTotal).toBe(false);
    expect(estimate.humanReviewRequired).toBe(true);
  });

  it("sets grant value to zero for loans, tax credits, and non-cash assistance", () => {
    const loan = buildGrantEstimate({
      cashValueClassification: "loan",
      sourceConfidence: "high",
      valueModel: { kind: "loan_or_financing_labeled_as_grant" }
    });
    const taxCredit = buildGrantEstimate({
      cashValueClassification: "tax_credit",
      sourceConfidence: "high",
      valueModel: { kind: "tax_credit_mixed_with_grant" }
    });

    expect(loan.computedEstimate.estimateStatus).toBe("zero_value");
    expect(loan.computedEstimate.estimatedAmountCents).toBe(0);
    expect(loan.computedEstimate.includedInUserFacingTotal).toBe(false);
    expect(taxCredit.reasonCodes).toEqual(["TAX_CREDIT_NOT_GRANT"]);
  });

  it("requires missing project scope inputs instead of estimating from absent units", () => {
    const estimate = buildGrantEstimate({
      sourceConfidence: "high",
      cashValueClassification: "cash_grant",
      valueModel: { kind: "per_unit_award" },
      perUnitRates: [{ metric: "unit_count", rateCents: 30000, unit: "port" }],
      requiredInputs: ["unitCount"]
    });

    expect(estimate.computedEstimate.estimateStatus).toBe("needs_project_scope");
    expect(estimate.missingInputs).toEqual(["unitCount"]);
    expect(estimate.computedEstimate.includedInUserFacingTotal).toBe(false);
  });

  it("conservatively gates legacy up-to grant rules in the runtime incentive award path", () => {
    const award = calculateIncentiveAward(
      {
        id: "oir_up_to_grant",
        opportunityId: "opp_up_to_grant",
        name: "Up To Grant",
        incentiveType: "grant",
        timing: "upfront",
        amountRule: { kind: "percent_of_basis", percent: 1 },
        cap: { maxAmountCents: 25000000 },
        confidence: "medium",
        formula: "up to $250,000 of eligible project cost"
      },
      {
        answers: {},
        baseCostLedgerEntries: [],
        billLineDeltas: [],
        upfrontCostCents: 10000000
      }
    );

    expect(award.amountCents).toBe(0);
    expect(award.grantEstimate.computedEstimate.estimateStatus).toBe("suppressed");
    expect(award.upfrontSavingsEntry).toBeUndefined();
  });

  it("caps historical success probability discounts at 35 percent", () => {
    expect(
      deriveProbabilityDiscount({ historicalAwardsCount: 90, historicalApplicationsCount: 100 })
    ).toBe(0.35);
  });
});
