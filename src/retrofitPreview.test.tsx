import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  CUSTOMER_RETROFIT_UI_NAMES,
  RetrofitRecommendationsPreview,
  buildUserRetrofitPreviewResult,
  confirmAllEstimateState,
  confirmSingleEstimateState,
  countScenarioSelectedOpportunities,
  customerRetrofitUiName,
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
    expect(preview.topRecommendation?.retrofitName).toBe("LED Lighting");
    expect(preview.retrofits[0].scenarios.map((scenario) => scenario.name)).toEqual([
      "Scenario A: Low upfront cost",
      "Scenario B: Best payback",
      "Scenario C: Highest total savings",
      "Scenario D: Certification-focused"
    ]);
    expect(preview.retrofits[0].name).toBe("LED Lighting");
    expect(preview.retrofits[0].metrics.estimatedUpfrontProjectCost).toBe(1200000);
    expect(preview.retrofits[0].metrics.upfrontFinancialIncentive).toBe(300000);
    expect(preview.retrofits[0].opportunities[0].name).toBe("Utility LED Rebate");
    expect(preview.retrofits[0].operatingSavings[0].name).toBe("Electricity Bill Savings");
    expect(preview.retrofits[0].editableAssumptions[0].label).toBe("fixture count");
    expect(preview.estimateCompletenessPercent).toBeLessThanOrEqual(65);
    expect(preview.retrofits[0].confidenceLabel).toBe("Medium");
  });

  it("defines short customer UI names for every taxonomy retrofit type", async () => {
    const taxonomyModulePath = "../server/matching/retrofitTaxonomy.mjs";
    const { RETROFIT_TYPES } = await import(taxonomyModulePath);
    const taxonomyIds = (RETROFIT_TYPES as Array<{ retrofitTypeId: string }>)
      .map((retrofit) => retrofit.retrofitTypeId)
      .sort();
    const mappedIds = Object.keys(CUSTOMER_RETROFIT_UI_NAMES).sort();

    expect(mappedIds).toEqual(taxonomyIds);
    expect(customerRetrofitUiName({ retrofitTypeId: "insulation_upgrade", displayName: "Insulation upgrade" })).toBe("Insulation");
    expect(customerRetrofitUiName({ retrofitTypeId: "high_efficiency_hvac_replacement", displayName: "High-efficiency HVAC replacement" })).toBe("High-efficiency HVAC");
    expect(customerRetrofitUiName({ retrofitTypeId: "engineering_feasibility_study", displayName: "Engineering feasibility study" })).toBe("Feasibility study");
    expect(customerRetrofitUiName({ retrofitTypeId: "custom_led", displayName: "LED Lighting Upgrade" })).toBe("LED Lighting");
    expect(Object.values(CUSTOMER_RETROFIT_UI_NAMES).filter((name) => /\b(retrofit|upgrade|replacement|installation|system)\b$/i.test(name))).toEqual([]);
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

  it("renders a clean before-click retrofit picker and hides the full workspace", () => {
    const multiRetrofitPayload = {
      ...liveShapedPayload,
      summary: {
        matchedRetrofitCount: 7,
        matchedOpportunityCount: 1
      },
      retrofits: Array.from({ length: 7 }, (_, index) => ({
        ...liveShapedPayload.retrofits[0],
        retrofitTypeId: `led_lighting_${index + 1}`,
        displayName: index === 0 ? "LED Lighting Upgrade" : `Retrofit Option ${index + 1}`,
        savingsPreview: {
          ...liveShapedPayload.retrofits[0].savingsPreview,
          retrofitTypeId: `led_lighting_${index + 1}`,
          retrofitDisplayName: index === 0 ? "LED Lighting Upgrade" : `Retrofit Option ${index + 1}`
        },
        opportunities: index === 0 ? liveShapedPayload.retrofits[0].opportunities : []
      }))
    } as any;

    const html = renderToStaticMarkup(
      <RetrofitRecommendationsPreview
        emptyMessage="No retrofit recommendations yet."
        error={null}
        eyebrow="Admin-only portal preview"
        intro="Review recommended retrofits, eligible opportunities, operating savings, and next steps based on the information provided."
        isLoading={false}
        loadingMessage="Loading live retrofit recommendations for this client..."
        payload={multiRetrofitPayload}
        title="Retrofit Recommendations"
      />
    );

    expect(html).toContain("Improve your estimate accuracy");
    expect(html).toContain("Upload your bills and answer a few questions within the retrofit.");
    expect(html).toContain("Upload bills");
    expect(html).toContain("upload-cloud-icon");
    expect(html).not.toContain(">UP<");
    expect(html).toContain("Select a retrofit to explore");
    expect(html).toContain("Choose one retrofit to see opportunities, detailed metrics, and next steps.");
    expect(html).toContain("Sort by");
    expect(html).toContain("<option value=\"recommended\" selected=\"\">Recommended</option>");
    expect(html).toContain("<option value=\"total_savings\">Savings</option>");
    expect(html).toContain("<option value=\"payback\">Payback</option>");
    expect(html).toContain("<option value=\"upfront_cost\">Cost</option>");
    expect(html).toContain("Search retrofits");
    expect(html).toContain("Grid");
    expect(html).toContain("Panel");
    expect(html).toContain("LED Lighting");
    expect(html).not.toContain("LED Lighting Upgrade");
    expect(html).toContain("Replace existing lights with high-efficiency LEDs.");
    expect(html).not.toContain("Programs related to");
    expect(html).toContain("Savings");
    expect(html).toContain("Cost");
    expect(html).toContain("Payback");
    expect(html).toContain("metric-savings-icon");
    expect(html).toContain("metric-cost-icon");
    expect(html).toContain("metric-payback-icon");
    expect(html).toContain("retrofit-picker-metric-label");
    expect((html.match(/class=\"retrofit-picker-card\"/g) || []).length).toBe(6);
    expect(html).toContain("Show more retrofits");
    expect(html).toContain("retrofit-picker-grid");
    expect(html).toContain("retrofit-picker-card");
    expect(html).toContain("retrofit-picker-icon");
    expect(html).not.toContain("retrofit-picker-arrow");
    expect(html).not.toContain("Total savings");
    expect(html).not.toContain("Monthly savings");
    expect(html).not.toContain("Percentage profit");
    expect(html).not.toContain("Retrofit Recommendations");
    expect(html).not.toContain("Estimate basis:");
    expect(html).not.toContain("Live/API backend recommendation data");
    expect(html).not.toContain("Last updated:");
    expect(html).not.toContain("Recommendation readiness");
    expect(html).not.toContain("Top recommendation");
    expect(html).not.toContain("Current retrofit plan");
    expect(html).not.toContain("1 opp");
    expect(html).not.toContain("Confidence:");
    expect(html).not.toContain("Missing:");
    expect(html).not.toContain("Scenario A");
    expect(html).not.toContain("filter-toolbar");
    expect(html).not.toContain("Retrofit rail");
    expect(html).not.toContain("active-command-center");
    expect(html).not.toContain("retrofit-workspace-tabs");
    expect(html).not.toContain("Financial snapshot");
    expect(html).not.toContain("Opportunity bundle");
    expect(html).not.toContain("Missing blockers");
    expect(html).not.toContain("View all opportunities");
    expect(html).not.toContain("Incentives included");
    expect(html).not.toContain("Operating savings included");
    expect(html).not.toContain("Active retrofit workspace tabs");
    expect(html).not.toContain("data-workspace-panel=\"overview\"");
    expect(html).not.toContain("Summary across selected retrofits");
    expect(html).not.toContain("No major missing inputs flagged");
    expect(html).not.toContain("Scenario B: Best payback");
    expect(html).not.toContain("Scenario C: Highest total savings");
    expect(html).not.toContain("Scenario D: Certification-focused");
    expect(html).not.toContain("Scenario comparison for this retrofit");
    expect(html).not.toContain("Retrofit section navigation");
    expect(html).not.toContain("<h3>What is included in this estimate</h3>");
    expect(html).not.toContain("<h3>Opportunities</h3>");
    expect(html).not.toContain("Selected retrofits");
    expect(html).not.toContain("Estimated blended payback");
    expect(html).not.toContain("<span>Estimated upfront project cost</span>");
    expect(html).not.toContain("<span>Upfront financial incentive</span>");
    expect(html).not.toContain("<span>Recurring Operational Savings</span>");
    expect(html).not.toContain("<span>Payback Period</span>");
    expect(html).not.toContain("<span>Tax benefits</span>");
    expect(html).not.toContain("<span>ROI</span>");
    expect(html).not.toContain("<h3>Why this is recommended</h3>");
    expect(html).not.toContain("<h3>Estimate assumptions</h3>");
    expect(html).not.toContain("<h3>Opportunities</h3>");
    expect(html).not.toContain("<h3>Operating Savings</h3>");
    expect(html).not.toContain("<h3>Enter details</h3>");
    expect(html).not.toContain("<h3>Missing information</h3>");
    expect(html).not.toContain("Explore financing");
    expect(html).not.toContain("Next-best-action checklist");
    expect(html).not.toContain("Enter details");
    expect(html).not.toContain("Add quote");
    expect(html).not.toContain("Add tax/entity info");
    expect(html).not.toContain("Add this retrofit to plan");
    expect(html).not.toContain("Prepare application");
    expect(html).not.toContain("Open program source");
    expect(html).not.toContain("Included in current estimate");
    expect(html).not.toContain("View details");
    expect(html).not.toContain("aria-label=\"Confirm retrofit plan\"");
    expect(html).not.toContain("selected-scenario-grid");
    expect(html).not.toContain(">Goal:");
    expect(html).not.toContain("Premium insight");
    expect(html).not.toContain("Preview-only until a safe persistence API is available");
    expect(html).not.toContain("Backend savings preview is available");
    expect(html).not.toContain("Selected opportunities update counts now; financial recalculation requires the calculation engine");
    expect(html).not.toContain("Financing ignored in V1");
    expect(html).not.toContain("SOURCE_DSIRE");
  });

  it("updates local confirmation state helpers", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);
    const firstAssumption = preview.retrofits[0].editableAssumptions[0];
    const single = confirmSingleEstimateState({}, firstAssumption.id);
    expect(single[firstAssumption.id]).toBe(true);

    const all = confirmAllEstimateState({}, preview.retrofits[0].editableAssumptions);
    expect(Object.values(all).every(Boolean)).toBe(true);
  });

  it("keeps detailed preview features behind workspace tabs instead of removing them", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");

    expect(source).toContain("Scenario B: Best payback");
    expect(source).toContain("Scenario comparison for this retrofit");
    expect(source).toContain("What is included in this estimate");
    expect(source).toContain("View calculation breakdown");
    expect(source).toContain("Selected and included");
    expect(source).toContain("Selected but pending");
    expect(source).toContain("Likely not eligible");
    expect(source).toContain("Questions to answer");
    expect(source).toContain("Prepare application");
    expect(source).toContain("Open program source");
    expect(source).toContain("Operating Savings");
    expect(source).toContain("Confirm all estimates");
    expect(source).toContain("Financing preview");
    expect(source).toContain("Add quote");
    expect(source).toContain("Add tax/entity info");
    expect(source).toContain("Preview as customer");
    expect(source).toContain("Exit customer preview");
    expect(source).toContain("Back to all retrofits");
    expect(source).toContain("data-workspace-tab");
    expect(source).toContain("{ key: \"requirements\", label: \"Requirements\" }");
    expect(source).toContain("{ key: \"more\", label: \"More\" }");
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
    expect(css).toContain(".retrofit-preview-page .retrofit-picker-card:hover");
    expect(css).toContain(".retrofit-preview-page .picker-view-button:hover");
    expect(css).toContain(".user-preview-admin-controls-button:hover");
    expect(css).toContain(".user-preview-customer-mode-button:hover");
    expect(css).toContain(".user-preview-toolbar.is-customer-preview");
    expect(css).toContain(".customer-preview-strip");
    expect(css).toContain(".retrofit-preview-page .secondary-button:hover");
    expect(css).toContain(".retrofit-preview-page .workspace-tab:hover");
    expect(css).toContain(".retrofit-preview-page .command-summary-card:hover");
    expect(css).toContain(".retrofit-preview-page .preview-accordion-trigger:hover");
    expect(css).toContain(".retrofit-preview-page .preview-accordion-trigger:hover *");
    expect(css).toContain(".workspace-tab.is-active");
    expect(css).toContain(".retrofit-tab.is-active");
    expect(css).toContain("background: var(--rf-green-soft)");
    expect(css).toContain("background: var(--rf-bg)");
    expect(css).toContain("height: 104px");
    expect(css).toContain("scroll-margin-top: 92px");
    expect(css).toContain(".estimate-accuracy-banner");
    expect(css).toContain(".estimate-accuracy-icon svg");
    expect(css).toContain(".retrofit-picker-grid");
    expect(css).toContain(".retrofit-picker-card");
    expect(css).toContain(".retrofit-picker-card.is-selected");
    expect(css).toContain(".retrofit-picker-grid.is-panel .retrofit-picker-card");
    expect(css).toContain("grid-template-columns: repeat(3, minmax(0, 1fr))");
    expect(css).toContain("@media (max-width: 1099px)");
    expect(css).toContain("@media (max-width: 719px)");
    expect(css).toContain(".retrofit-picker-metric-label");
    expect(css).toContain(".metric-savings-icon");
    expect(css).toContain(".metric-cost-icon");
    expect(css).toContain(".metric-payback-icon");
    expect(css).not.toContain(".retrofit-picker-metric span::before");
    expect(css).toContain(".recommendation-readiness-strip");
    expect(css).toContain(".filter-toolbar-main");
    expect(css).toContain(".current-plan-strip");
    expect(css).toContain(".active-command-center");
    expect(css).toContain(".active-command-center-top");
    expect(css).toContain(".retrofit-workspace-tabs");
    expect(css).toContain(".workspace-panel");
    expect(css).toContain(".overview-command-grid");
    expect(css).toContain(".overview-opportunity-preview");
    expect(css).toContain(".requirements-worklist");
    expect(css).toContain(".sticky-add-plan-footer");
    expect(css).toContain(".selected-scenario-rows");
    expect(css).toContain(".compact-detail-row");
    const pickerCardRule = css.match(/(?:^|\n)\.retrofit-picker-card\s*{([^}]*)}/)?.[1] || "";
    expect(pickerCardRule).toContain("min-height: 186px;");
    expect(pickerCardRule).not.toContain("\n  height: 118px;");

    const tabHoverRule = css.match(/\.retrofit-preview-page \.retrofit-tab:hover,[\s\S]*?{([\s\S]*?)}/)?.[1] || "";
    expect(tabHoverRule).not.toContain("#0f573c");
    expect(tabHoverRule).not.toContain("#176b4c");
  });
});
