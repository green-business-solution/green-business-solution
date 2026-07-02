import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  RetrofitRecommendationsPreview,
  buildUserRetrofitPreviewResult,
  confirmAllEstimateState,
  confirmSingleEstimateState,
  countScenarioSelectedOpportunities,
  getScenarioSelectedOpportunityCount,
  getOpportunityIncludedLabel
} from "./App";

const liveShapedPayload = {
  generatedAt: "2026-06-30T12:00:00.000Z",
  summary: {
    matchedRetrofitCount: 1,
    matchedOpportunityCount: 1
  },
  user: {
    userId: "user-1",
    role: "client",
    status: "active",
    fullName: "Test Client",
    email: "client@example.com",
    companyName: "Test Business",
    authProvider: "password",
    googleLinked: false,
    isFakeUser: false,
    createdAt: "2026-06-01T00:00:00.000Z",
    lastLoginAt: null
  },
  intake: {
    userId: "user-1",
    submissionId: "intake-1",
    contact: {
      fullName: "Test Client",
      email: "client@example.com",
      phone: null,
      roleTitle: null,
      contactPreference: null
    },
    business: {
      companyName: "Test Business",
      website: null,
      industry: "Restaurant",
      organizationType: "business",
      organizationSize: "small",
      headquarters: "San Francisco, CA"
    },
    site: {
      address: "1 Market St",
      electricUtilityProvider: "PG&E",
      gasUtilityProvider: null,
      ownershipStatus: "leased",
      buildingType: "restaurant",
      squareFootage: "5000"
    },
    sustainability: {
      goals: "Reduce energy use",
      currentChallenges: "High bills",
      interestedImprovements: ["lighting"],
      monthlyUtilitySpend: "2000",
      timeline: "this_year",
      notes: null
    },
    uploadedUtilityFiles: [],
    utilityExtractedValues: [],
    siteEnergyProfile: null,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z"
  },
  retrofits: [
    {
      retrofitTypeId: "led_lighting",
      displayName: "LED Lighting Upgrade",
      parentCategory: "energy_efficiency",
      isPhysicalRetrofit: true,
      typicalComponents: ["LED fixtures", "occupancy sensors"],
      opportunityCount: 1,
      savingsPreview: {
        status: "calculated",
        estimateKind: "api_result",
        modelCoverage: "retrofit_only",
        retrofitTypeId: "led_lighting",
        retrofitDisplayName: "LED Lighting Upgrade",
        opportunityCount: 1,
        upfrontCostCents: 1200000,
        upfrontSavingsCents: 300000,
        possibleGrantMoneyCents: 300000,
        upfrontCostAfterSavingsCents: 900000,
        monthlySavingsCents: 50000,
        annualSavingsCents: 600000,
        netMonthlyRecurringSavingsCents: 50000,
        netAnnualRecurringSavingsCents: 600000,
        costBreakdown: [],
        savingsBreakdown: [
          {
            id: "electricity",
            kind: "recurring_savings",
            category: "electricity_bill_savings",
            label: "Electricity Bill Savings",
            amountCents: 50000,
            period: "monthly",
            formula: "fixture count x usage reduction"
          }
        ],
        selectedIncentiveScenario: {
          opportunityIds: ["opp-1"]
        },
        calculationTrace: {
          assumptions: [
            {
              label: "fixture count",
              value: 100
            }
          ],
          steps: []
        },
        assumptions: []
      },
      opportunities: [
        {
          opportunityId: "opp-1",
          opportunityName: "Utility LED Rebate",
          offerId: "offer-1",
          sourceUrl: "https://example.com/source",
          websiteUrl: null,
          applicationUrl: "https://example.com/apply",
          eligibilityStatus: "eligible",
          rankScore: 92,
          opportunityDataConfidence: 0.8,
          userProfileCompleteness: 0.7,
          matchedReasons: ["Business type and utility territory match."],
          unresolvedRequirements: ["project quote"],
          blockers: [],
          sourceSummary: {
            state: "CA",
            sourceName: "Utility",
            programType: "rebate",
            administrator: "Example Utility"
          }
        }
      ]
    }
  ]
} as any;

describe("retrofit recommendations preview", () => {
  it("maps live-shaped API payload into preview sections without local mock production data", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);

    expect(preview.dataSourceLabel).toBe("Live/API backend recommendation data");
    expect(preview.topRecommendation?.retrofitName).toBe("LED Lighting Upgrade");
    expect(preview.retrofits[0].scenarios.map((scenario) => scenario.name)).toEqual([
      "Scenario A: Low upfront cost",
      "Scenario B: Best payback",
      "Scenario C: Highest total savings",
      "Scenario D: Certification-focused"
    ]);
    expect(preview.retrofits[0].name).toBe("LED Lighting Upgrade");
    expect(preview.retrofits[0].metrics.estimatedUpfrontProjectCost).toBe(1200000);
    expect(preview.retrofits[0].metrics.upfrontFinancialIncentive).toBe(300000);
    expect(preview.retrofits[0].opportunities[0].name).toBe("Utility LED Rebate");
    expect(preview.retrofits[0].operatingSavings[0].name).toBe("Electricity Bill Savings");
    expect(preview.retrofits[0].editableAssumptions[0].label).toBe("fixture count");
    expect(preview.estimateCompletenessPercent).toBeLessThanOrEqual(65);
    expect(preview.retrofits[0].confidenceLabel).toBe("Medium");
  });

  it("does not label negative recurring impact as annual savings in retrofit tabs", () => {
    const negativeImpactPayload = {
      ...liveShapedPayload,
      retrofits: [
        {
          ...liveShapedPayload.retrofits[0],
          retrofitTypeId: "ev_charger_installation",
          displayName: "EV charger installation",
          parentCategory: "transportation_electrification",
          savingsPreview: {
            ...liveShapedPayload.retrofits[0].savingsPreview,
            retrofitTypeId: "ev_charger_installation",
            retrofitDisplayName: "EV charger installation",
            annualSavingsCents: -432000,
            monthlySavingsCents: -36000,
            netAnnualRecurringSavingsCents: -432000,
            netMonthlyRecurringSavingsCents: -36000
          }
        }
      ]
    } as any;
    const preview = buildUserRetrofitPreviewResult(negativeImpactPayload);

    expect(preview.retrofits[0].tabSummary.primaryMetricLabel).toBe("Net impact");
    expect(preview.retrofits[0].tabSummary.fallback).toBe("Needs fuel baseline");
    expect(String(preview.retrofits[0].tabSummary.primaryMetricValue || "")).not.toContain("-$");
  });

  it("renders the admin-nav user preview structure", () => {
    const html = renderToStaticMarkup(
      <RetrofitRecommendationsPreview
        emptyMessage="No retrofit recommendations yet."
        error={null}
        eyebrow="Admin-only portal preview"
        intro="Review recommended retrofits, eligible opportunities, operating savings, and next steps based on the information provided."
        isLoading={false}
        loadingMessage="Loading live retrofit recommendations for this client..."
        payload={liveShapedPayload}
        title="Retrofit Recommendations"
      />
    );

    expect(html).toContain("Retrofit Recommendations");
    expect(html).toContain("Top recommendation");
    expect(html).toContain("Improve your estimates");
    expect(html).toContain("Upload bills");
    expect(html).toContain("Current retrofit plan");
    expect(html).toContain("Choose one retrofit at a time");
    expect(html).toContain("Continue editing active retrofit");
    expect(html).not.toContain("Prepare applications</button>");
    expect(html).toContain("retrofit-refinement-status");
    expect(html).toContain("current-plan-next-step");
    expect(html).not.toContain("retrofit-preview-header-meta");
    expect(html).toContain("Top 1 shown first · 1 total");
    expect(html).toContain("Add this retrofit to plan");
    expect(html).toContain("Retrofit tabs");
    expect(html).toContain("Default: Low upfront");
    expect(html).toContain("Decision summary");
    expect(html).toContain("aria-current=\"true\"");
    expect(html).not.toContain("Summary across selected retrofits");
    expect(html).not.toContain("Opportunities: 1 selected / 1 found");
    expect(html).not.toContain("No major missing inputs flagged");
    expect(html).toContain("Scenario A: Low upfront cost");
    expect(html).toContain("Scenario B: Best payback");
    expect(html).toContain("Scenario C: Highest total savings");
    expect(html).toContain("Scenario D: Certification-focused");
    expect(html).toContain("Scenario comparison for this retrofit");
    expect(html).toContain("Retrofit section navigation");
    expect(html).toContain("What is included in this estimate");
    expect(html).not.toContain("Selected retrofits");
    expect(html).not.toContain("Estimated blended payback");
    expect(html).toContain("Sort by");
    expect(html).toContain("Estimated upfront project cost");
    expect(html).toContain("Upfront financial incentive");
    expect(html).toContain("Recurring Operational Savings");
    expect(html).toContain("Payback Period");
    expect(html).toContain("Tax benefits");
    expect(html).toContain("ROI");
    expect(html).toContain("Financials");
    expect(html).toContain("Why this is recommended");
    expect(html).toContain("Estimate assumptions");
    expect(html).toContain("Opportunities");
    expect(html).toContain("Operating Savings");
    expect(html).toContain("Enter details");
    expect(html).toContain("Missing information");
    expect(html).toContain("Explore financing");
    expect(html).toContain("Prepare application");
    expect(html).toContain("Next-best-action checklist");
    expect(html).toContain("Open program source");
    expect(html).toContain("Included incentives");
    expect(html).toContain("Included in current estimate");
    expect(html).toContain("Selected but not included yet");
    expect(html).toContain("View details");
    expect(html.indexOf("<h3>Financials</h3>")).toBeLessThan(html.indexOf("<h3>Why this is recommended</h3>"));
    expect(html.indexOf("<h3>Financials</h3>")).toBeLessThan(html.indexOf("aria-label=\"Confirm retrofit plan\""));
    expect(html.indexOf("aria-label=\"Confirm retrofit plan\"")).toBeLessThan(html.indexOf("<h3>What is included in this estimate</h3>"));
    expect(html.indexOf("<h3>Opportunities</h3>")).toBeLessThan(html.indexOf("<h3>Missing information</h3>"));
    expect(html.indexOf("<h3>Missing information</h3>")).toBeLessThan(html.indexOf("<h3>Operating Savings</h3>"));
    expect(html.indexOf("<h3>Missing information</h3>")).toBeLessThan(html.indexOf("<h3>Estimate assumptions</h3>"));
    expect(html).toContain("selected-scenario-rows");
    expect(html).not.toContain("selected-scenario-grid");
    expect(html).not.toContain(">Goal:");
    expect(html).not.toContain("Premium insight");
    expect(html).not.toContain("Preview-only until a safe persistence API is available");
    expect(html).not.toContain("Backend savings preview is available");
    expect(html).not.toContain("Selected opportunities update counts now; financial recalculation requires the calculation engine");
    expect(html).not.toContain("Financing ignored in V1");
    expect(html).not.toContain("SOURCE_DSIRE");
    expect(html.indexOf("LED Lighting Upgrade")).toBeLessThan(html.indexOf("Scenario comparison for this retrofit"));
  });

  it("updates local confirmation state helpers", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);
    const firstAssumption = preview.retrofits[0].editableAssumptions[0];
    const single = confirmSingleEstimateState({}, firstAssumption.id);
    expect(single[firstAssumption.id]).toBe(true);

    const all = confirmAllEstimateState({}, preview.retrofits[0].editableAssumptions);
    expect(Object.values(all).every(Boolean)).toBe(true);
  });

  it("scopes scenario selection counts and included labels to the retrofit state", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);
    const scenario = preview.retrofits[0].scenarios[0];
    const opportunity = preview.retrofits[0].opportunities[0];

    expect(countScenarioSelectedOpportunities(scenario, { [opportunity.id]: true })).toBe(1);
    expect(getScenarioSelectedOpportunityCount(scenario, { [opportunity.id]: true })).toBe(1);
    expect(countScenarioSelectedOpportunities(scenario, { [opportunity.id]: false })).toBe(0);
    expect(getOpportunityIncludedLabel(opportunity, true)).toBe("Not included yet — needs more information");
    expect(getOpportunityIncludedLabel({ ...opportunity, includedState: "Included in current estimate" }, true)).toBe("Included in current estimate");
    expect(getOpportunityIncludedLabel({ ...opportunity, includedState: "Not included in current estimate" }, false)).toBe("Not included in current estimate");
    expect(getOpportunityIncludedLabel({ ...opportunity, includedState: "Not included yet — needs more information" }, false)).toBe("Not included yet — needs more information");
  });

  it("does not include uncertain utility-territory opportunities in financial estimates", () => {
    const utilityMismatchPayload = {
      ...liveShapedPayload,
      intake: {
        ...liveShapedPayload.intake,
        business: {
          ...liveShapedPayload.intake.business,
          headquarters: "Seattle, WA"
        },
        site: {
          ...liveShapedPayload.intake.site,
          electricUtilityProvider: "Seattle City Light",
          address: "Seattle, WA"
        }
      },
      retrofits: [
        {
          ...liveShapedPayload.retrofits[0],
          opportunities: [
            {
              ...liveShapedPayload.retrofits[0].opportunities[0],
              unresolvedRequirements: [],
              sourceSummary: {
                ...liveShapedPayload.retrofits[0].opportunities[0].sourceSummary,
                administrator: "Richland Energy Services",
                sourceName: "Richland Energy Services"
              }
            }
          ]
        }
      ]
    } as any;

    const preview = buildUserRetrofitPreviewResult(utilityMismatchPayload);
    const retrofit = preview.retrofits[0];
    const opportunity = retrofit.opportunities[0];

    expect(opportunity.eligibilityStatus).toBe("needs review");
    expect(opportunity.requiredInfo).toContain("utility territory confirmation");
    expect(opportunity.includedState).toBe("Not included yet — needs more information");
    expect(opportunity.estimatedValue).toBeNull();
    expect(opportunity.whySelected).toContain("utility territory confirmation");
    expect(retrofit.missingInfo).toContain("utility territory confirmation");
    expect(retrofit.confidenceLabel).toBe("Needs review");
  });

  it("uses retrofit-specific detail questions for solar and biomass categories", () => {
    const categoryPayload = {
      ...liveShapedPayload,
      retrofits: [
        {
          ...liveShapedPayload.retrofits[0],
          retrofitTypeId: "biomass_biogas_energy_system",
          displayName: "Biomass/biogas energy system",
          opportunities: []
        },
        {
          ...liveShapedPayload.retrofits[0],
          retrofitTypeId: "solar_renewable_electricity",
          displayName: "Rooftop solar PV",
          opportunities: []
        }
      ]
    } as any;
    const preview = buildUserRetrofitPreviewResult(categoryPayload);
    const biomassQuestions = preview.retrofits[0].detailQuestions.map((question) => question.question);
    const solarQuestions = preview.retrofits[1].detailQuestions.map((question) => question.question);

    expect(biomassQuestions).toContain("What fuel or waste stream would the system use?");
    expect(biomassQuestions).toContain("What quantity of feedstock is available per month?");
    expect(solarQuestions).toContain("What roof or site area is available?");
    expect(solarQuestions).toContain("Do you control the roof or site?");
    expect(solarQuestions).not.toContain("What quantity or scope is being upgraded?");
  });

  it("keeps preview hover and active states readable and visually distinct", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(css).toContain(".retrofit-preview-page .retrofit-tab:hover");
    expect(css).toContain(".retrofit-preview-page .secondary-button:hover");
    expect(css).toContain(".retrofit-preview-page .retrofit-section-chip:hover");
    expect(css).toContain(".retrofit-preview-page .preview-accordion-trigger:hover");
    expect(css).toContain(".retrofit-preview-page .preview-accordion-trigger:hover *");
    expect(css).toContain(".retrofit-section-chip.is-active");
    expect(css).toContain(".retrofit-tab.is-active");
    expect(css).toContain("background: var(--rf-green-soft)");
    expect(css).toContain("background: var(--rf-bg)");
    expect(css).toContain("height: 118px");
    expect(css).toContain("scroll-margin-top: 92px");
    expect(css).toContain(".selected-scenario-rows");
    expect(css).toContain(".compact-detail-row");
    expect(css).toContain("grid-template-columns: repeat(3, minmax(90px, 1fr))");
    expect(css).toContain(".retrofit-refinement-status");
    expect(css).toContain(".current-plan-next-step");

    const tabHoverRule = css.match(/\.retrofit-preview-page \.retrofit-tab:hover,[\s\S]*?{([\s\S]*?)}/)?.[1] || "";
    expect(tabHoverRule).not.toContain("#0f573c");
    expect(tabHoverRule).not.toContain("#176b4c");
  });
});
