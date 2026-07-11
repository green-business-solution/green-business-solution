import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  buildUserRetrofitPreviewResult,
  mergePortalRetrofitRecommendationsPayload,
  RetrofitRecommendationsPreview,
  getDefaultBillUploadState,
  hydrateBillUploadStateFromIntake
} from "./App";
import {
  commitCoordinatedSnapshotPayload,
  createCoordinatedSnapshotState,
  rejectStaleCoordinatedSnapshotPayload,
  stageCoordinatedSnapshotPayload,
  portfolioSnapshotKey
} from "./portfolioPreviewState";

function buildRetrofitPayload(overrides: Record<string, unknown> = {}) {
  return {
    generatedAt: "2026-07-01T12:00:00.000Z",
    user: {
      userId: "sample_user",
      role: "client",
      status: "active",
      fullName: "Sample User",
      email: "sample@example.com",
      companyName: "Sample Co",
      authProvider: "password",
      googleLinked: false,
      isFakeUser: true,
      createdAt: "2026-07-01T00:00:00.000Z",
      lastLoginAt: null
    },
    intake: {
      userId: "sample_user",
      submissionId: "intake_sample_user",
      contact: {
        fullName: "Sample User",
        email: "sample@example.com",
        phone: null
      },
      business: {
        companyName: "Sample Co",
        website: null,
        industry: "Office",
        organizationType: "business",
        organizationSize: "small",
        headquarters: "Los Angeles, CA"
      },
      site: {
        address: "1 Main St",
        electricUtilityProvider: "Sample Electric",
        gasUtilityProvider: null,
        ownershipStatus: "leased",
        buildingType: "Office",
        squareFootage: "1000",
        numberOfUnits: null
      },
      sustainability: {
        goals: "Lower bills",
        currentChallenges: "High bills",
        interestedImprovements: ["lighting"],
        monthlyUtilitySpend: "1000",
        timeline: "this_year",
        notes: null
      },
      uploadedUtilityFiles: [],
      utilityExtractedValues: [],
      siteEnergyProfile: {
        siteId: "site-1",
        uploadedFileCount: 0,
        processedFileCount: 0,
        availableFieldIds: [],
        monthlySummaries: [],
        utilitySummaries: [],
        lastUpdatedAt: "2026-07-01T00:00:00.000Z"
      },
      createdAt: "2026-07-01T00:00:00.000Z",
      updatedAt: "2026-07-01T00:00:00.000Z"
    },
    retrofits: [
      {
        retrofitTypeId: "led_lighting",
        displayName: "LED Lighting Upgrade",
        parentCategory: "energy_efficiency",
        isPhysicalRetrofit: true,
        opportunityCount: 1,
        detailQuestions: [],
        typicalComponents: ["LED fixtures"],
        savingsPreview: {
          status: "calculated",
          estimateKind: "api_result",
          modelCoverage: "retrofit_only",
          retrofitTypeId: "led_lighting",
          retrofitDisplayName: "LED Lighting Upgrade",
          opportunityCount: 1,
          annualSavingsCents: 1200,
          monthlySavingsCents: 100,
          netAnnualRecurringSavingsCents: 1200,
          netMonthlyRecurringSavingsCents: 100,
          upfrontCostCents: 5000,
          upfrontSavingsCents: 1000
        },
        opportunities: []
      }
    ],
    summary: {
      matchedRetrofitCount: 1,
      matchedOpportunityCount: 0,
      canShowOpportunities: true,
      taxIntakeRequiredBeforeOpportunityDisplay: false,
      requiredTaxInputCount: 0,
      calculatedTaxBenefitCents: 0,
      calculatedTaxLiabilityCents: 0,
      netTaxImpactCents: 0
    },
    taxRuntimePreview: null,
    ...overrides
  } as any;
}

describe("coordinated portfolio preview state", () => {
  it("keeps the last consistent payload visible while a newer snapshot is pending", () => {
    const current = buildRetrofitPayload({
      portfolio: {
        portfolioId: "portfolio-a",
        portfolioVersion: 1,
        scenarioId: "default",
        calculationRunId: "run-1"
      }
    });
    const next = buildRetrofitPayload({
      portfolio: {
        portfolioId: "portfolio-a",
        portfolioVersion: 2,
        scenarioId: "default",
        calculationRunId: "run-2"
      },
      retrofits: [
        {
          ...current.retrofits[0],
          savingsPreview: {
            ...current.retrofits[0].savingsPreview,
            annualSavingsCents: 2200
          }
        }
      ]
    });

    const initialState = createCoordinatedSnapshotState(current, current.portfolio);
    const stagedState = stageCoordinatedSnapshotPayload(initialState, next, next.portfolio);

    expect(stagedState.status).toBe("recalculating");
    expect(stagedState.activePayload).toEqual(current);
    expect(stagedState.pendingPayload).toEqual(next);

    const committedState = commitCoordinatedSnapshotPayload(stagedState);
    expect(committedState.status).toBe("ready");
    expect(committedState.activePayload).toEqual(next);
    expect(committedState.pendingPayload).toBeNull();
  });

  it("rejects stale detail payloads from a different calculation run", () => {
    const current = buildRetrofitPayload({
      portfolio: {
        portfolioId: "portfolio-a",
        portfolioVersion: 1,
        scenarioId: "default",
        calculationRunId: "run-1"
      }
    });
    const staleDetail = buildRetrofitPayload({
      isPartialRecommendations: true,
      portfolio: {
        portfolioId: "portfolio-a",
        portfolioVersion: 0,
        scenarioId: "default",
        calculationRunId: "run-0"
      },
      retrofits: [
        {
          ...current.retrofits[0],
          savingsPreview: {
            ...current.retrofits[0].savingsPreview,
            upfrontCostCents: 1
          }
        }
      ]
    });

    const merged = mergePortalRetrofitRecommendationsPayload(current, staleDetail);
    expect(merged).toBe(current);

    const rejected = rejectStaleCoordinatedSnapshotPayload(
      createCoordinatedSnapshotState(current, current.portfolio),
      staleDetail,
      staleDetail.portfolio
    );

    expect(rejected.status).toBe("recalculating");
    expect(rejected.activePayload).toEqual(current);
  });

  it("retains zero portfolio versions in the snapshot key", () => {
    expect(
      portfolioSnapshotKey({
        calculationRunId: null,
        portfolioId: "portfolio-a",
        portfolioVersion: 0,
        scenarioId: "default"
      })
    ).toBe("portfolio-a|0|default");
  });

  it("shows exhausted opportunities with zero remaining value and a reason", () => {
    const payload = buildRetrofitPayload({
      portfolio: {
        portfolioId: "portfolio-a",
        portfolioVersion: 3,
        scenarioId: "default",
        calculationRunId: "run-3",
        remainingMarginalValueMinorUnits: 0,
        exhaustedOpportunities: [
          {
            portfolioItemId: "led_lighting",
            reasonCodes: ["cap_exhausted"],
            remainingMarginalValueMinorUnits: 0
          }
        ]
      },
      retrofits: [
        {
          ...buildRetrofitPayload().retrofits[0],
          opportunityCount: 1,
          opportunities: []
        }
      ]
    });

    const preview = buildUserRetrofitPreviewResult(payload);
    const retrofit = preview.retrofits[0];

    expect(retrofit.coordinatedFinancials).toMatchObject({
      exhausted: true,
      remainingMarginalValueMinorUnits: 0,
      exhaustionReason: "cap_exhausted"
    });
    expect(retrofit.metrics.remainingMarginalValueMinorUnits).toBe(0);
  });

  it("does not crash when utility summary field lists are omitted", () => {
    const payload = buildRetrofitPayload({
      intake: {
        ...buildRetrofitPayload().intake,
        siteEnergyProfile: {
          ...buildRetrofitPayload().intake.siteEnergyProfile,
          utilitySummaries: [
            {
              utilityCategory: "electric",
              uploadedFileCount: 1,
              processedFileCount: 1,
              latestUtilityProvider: "Sample Electric",
              latestBillingPeriodStart: "2026-01-01",
              latestBillingPeriodEnd: "2026-01-31",
              annualUsage: 1000,
              annualCost: 200,
              averageUnitCost: 0.2,
              usageUnit: "kWh",
              monthlySummaries: [],
              lastUpdatedAt: "2026-07-01T00:00:00.000Z"
            }
          ]
        }
      }
    });

    const hydrated = hydrateBillUploadStateFromIntake(payload.intake, getDefaultBillUploadState());
    const html = renderToStaticMarkup(
      <RetrofitRecommendationsPreview
        emptyMessage="No retrofit recommendations yet."
        error={null}
        eyebrow="Admin-only portal preview"
        intro="Review recommended retrofits."
        isLoading={false}
        loadingMessage="Loading live retrofit recommendations for this client..."
        hideBillData={false}
        payload={payload}
        title="Retrofit Recommendations"
      />
    );

    expect(hydrated.statuses.electric).toBe("uploaded");
    expect(html).toContain("Utility bills loaded");
    expect(html).not.toContain("TypeError");
  });
});
