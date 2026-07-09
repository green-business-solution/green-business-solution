import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RetroFiLogoLoader, RetroFiPageLoader, RetroFiProgressLoader, RetroFiSkeleton, clampRetroFiProgress } from "./components/RetroFiLoader";
import {
  BILL_UPLOAD_STEPS,
  CUSTOMER_RETROFIT_UI_NAMES,
  areBillsCompleteForRetrofit,
  areRetrofitQuestionsComplete,
  buildDashboardPerformanceData,
  buildSeededRetrofitDetailAnswers,
  comparePreviewRetrofits,
  RetrofitRecommendationsPreview,
  buildRetrofitEnvironmentalImpactPreview,
  buildUserRetrofitPreviewResult,
  confirmAllEstimateState,
  confirmSingleEstimateState,
  countScenarioSelectedOpportunities,
  customerRetrofitUiName,
  getBillUploadResumeIndex,
  getBillUploadStepSummary,
  getDefaultBillUploadState,
  getBillUploadStorageKey,
  getRetrofitFormQuestions,
  getRequiredBillTypesForRetrofit,
  getRetrofitReadiness,
  getOpportunityIncludedLabel,
  getScenarioSelectedOpportunityCount,
  hydrateBillUploadStateFromIntake,
  isSupportedBillUploadFile,
  sanitizeBillUploadState
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
      detailQuestions: [
        {
          id: "led_lighting:tax-inclusive-costs",
          questionId: "tax_inclusive_costs",
          retrofitId: "led_lighting",
          question: "Do you want to enter costs with tax included, or should RetroFi estimate them for you?",
          answerType: "select",
          options: ["Enter tax-inclusive numbers", "Estimate for me (tax included)"],
          whyItMatters: "Our standardized values include tax, so this keeps your estimate consistent.",
          affects: ["Project cost", "Tax benefits", "Payback"],
          canonicalInputKey: "project_cost_tax_inclusion_preference",
          collectionStage: "pre_opportunity_estimate",
          collectionSurface: "retrofit_scope_form"
        },
        {
          id: "led_lighting:fixtures",
          questionId: "lighting_fixture_count",
          retrofitId: "led_lighting",
          question: "How many fixtures or bulbs are being replaced?",
          answerType: "number",
          canonicalInputKey: "fixture_count",
          collectionStage: "pre_opportunity_estimate",
          collectionSurface: "retrofit_scope_form"
        },
        {
          id: "led_lighting:quote",
          questionId: "project_quote_status",
          retrofitId: "led_lighting",
          question: "Do you already have a project quote?",
          answerType: "select",
          options: ["Yes", "No", "In progress"],
          canonicalInputKey: "project_quote_status",
          collectionStage: "pre_opportunity_estimate",
          collectionSurface: "project_quote_upload"
        }
      ],
      savingsPreview: {
        status: "calculated",
        estimateKind: "api_result",
        modelCoverage: "retrofit_only",
        retrofitTypeId: "led_lighting",
        retrofitDisplayName: "LED Lighting Upgrade",
        opportunityCount: 1,
        upfrontCostCents: 1200000,
        upfrontSavingsCents: 300000,
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
    expect(preview.retrofits[0].opportunities[0].sourceUrl).toBe("https://example.com/source");
    expect(preview.retrofits[0].opportunities[0].applicationUrl).toBe("https://example.com/apply");
    expect(preview.retrofits[0].opportunities[0].programWebsiteUrl).toBeNull();
    expect(preview.retrofits[0].opportunities[0].applicationMethod).toBe("utility portal");
    expect(preview.retrofits[0].opportunities[0].valueCap).toBe("No cap stored");
    expect(preview.retrofits[0].opportunities[0].eligibleCostBasis).toBe("Not stored for this opportunity");
    expect(preview.retrofits[0].operatingSavings[0].name).toBe("Electricity Bill Savings");
    expect(preview.retrofits[0].editableAssumptions[0].label).toBe("fixture count");
    expect(preview.estimateCompletenessPercent).toBeLessThanOrEqual(65);
    expect(preview.retrofits[0].confidenceLabel).toBe("Medium");
  });

  it("builds dashboard data only from post-implementation retrofit records", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);
    const dashboard = buildDashboardPerformanceData(liveShapedPayload, preview);

    expect(dashboard.implementedRetrofits).toEqual([]);
    expect(dashboard.dataQuality.hasImplementedRetrofits).toBe(false);
    expect(dashboard.dataQuality.basisLabel).toBe("unavailable");
    expect(dashboard.dataQuality.notes[0]).toContain("No post-implementation retrofit records");
    expect(dashboard.summary.kpis.map((metric) => metric.value)).toContain("Unavailable");
  });

  it("derives dashboard aggregates from implemented retrofit data when available", () => {
    const implementedPayload = {
      ...liveShapedPayload,
      retrofits: [
        {
          ...liveShapedPayload.retrofits[0],
          implementationStatus: "operational",
          installedDate: "2025-02-14",
          savingsPreview: {
            ...liveShapedPayload.retrofits[0].savingsPreview,
            actualAnnualSavingsCents: 720000,
            implementationStatus: "operational"
          }
        }
      ]
    } as any;
    const preview = buildUserRetrofitPreviewResult(implementedPayload);
    const dashboard = buildDashboardPerformanceData(implementedPayload, preview);

    expect(dashboard.implementedRetrofits).toHaveLength(1);
    expect(dashboard.implementedRetrofits[0].implementationStatus).toBe("operational");
    expect(dashboard.financial.totalProjectCostCents).toBe(1200000);
    expect(dashboard.financial.incentivesReceivedCents).toBe(300000);
    expect(dashboard.financial.totalAnnualSavingsCents).toBe(720000);
    expect(dashboard.financial.projectedTenYearSavingsCents).toBe(7200000);
    expect(dashboard.summary.kpis.map((metric) => metric.label)).toContain("Total Annual Savings");
    expect(dashboard.dataQuality.hasImplementedRetrofits).toBe(true);
    expect(dashboard.dataQuality.basisLabel).toBe("actual");
  });

  it("prefers dashboard post-implementation records for performance charts and sections", () => {
    const postInstallPayload = {
      ...liveShapedPayload,
      dashboardPostImplementationDataset: {
        schemaVersion: "dashboard-post-implementation-v1",
        testCaseId: "restaurant-case",
        isSynthetic: true,
        syntheticSource: "admin_test_case_seed",
        generatedAt: "2026-06-30T12:00:00.000Z",
        updatedAt: "2026-06-30T12:00:00.000Z",
        reportingPeriod: {
          startDate: "2025-07-01",
          endDate: "2026-06-30",
          label: "Jul 1, 2025 - Jun 30, 2026"
        },
        properties: [],
        implementedRetrofits: [
          {
            id: "perf-led",
            retrofitId: "led_lighting",
            sourceEstimateId: "led_lighting",
            name: "LED Lighting",
            category: "Lighting",
            status: "operational",
            implementedDate: "2025-06-01",
            installedDate: "2025-06-01",
            operationalDate: "2025-07-01",
            actualProjectCostCents: 1500000,
            estimatedProjectCostCents: 1200000,
            actualNetCostCents: 900000,
            estimatedNetCostCents: 900000,
            incentivesReceivedCents: 500000,
            incentivesPendingCents: 75000,
            incentivesNotClaimedCents: 25000,
            actualAnnualSavingsCents: 840000,
            estimatedAnnualSavingsCents: 600000,
            actualMonthlySavingsCents: 70000,
            energySavingsCents: 650000,
            maintenanceSavingsCents: 120000,
            taxBenefitCents: 70000,
            actualPaybackYears: 1.1,
            estimatedPaybackYears: 1.5,
            actualROI: 93,
            estimatedROI: 67,
            paybackProgressPercent: 54,
            actualKwhSavedPerYear: 42000,
            actualThermsSavedPerYear: 0,
            actualWaterSavedGallonsPerYear: 0,
            actualCO2eReducedKgPerYear: 12600,
            actualWasteReducedPerYear: 0,
            dataSource: "synthetic_admin_test_case",
            confidencePercent: 91,
            measurementMethod: "Utility bill comparison",
            baselineMethod: "Same-month prior year baseline",
            certificationContributions: [
              {
                certificationId: "cert-green-business",
                certificationName: "Green Business",
                creditsEarned: 6,
                creditsPossible: 10,
                requirementIds: ["req-energy"]
              }
            ]
          }
        ],
        monthlyPerformanceRecords: [
          {
            id: "month-2025-07",
            retrofitPerformanceId: "perf-led",
            month: "2025-07",
            actualSavingsCents: 40000,
            estimatedSavingsCents: 50000,
            cumulativeSavingsCents: 40000,
            cumulativeIncentivesReceivedCents: 500000,
            cumulativeNetBenefitCents: -960000,
            actualCO2eReducedKg: 900,
            estimatedCO2eReducedKg: 800,
            baselineElectricityKwh: 10000,
            actualElectricityKwh: 6500,
            estimatedElectricityKwh: 7000,
            baselineGasTherms: 0,
            actualGasTherms: 0,
            estimatedGasTherms: 0,
            baselineWaterGallons: 0,
            actualWaterGallons: 0,
            estimatedWaterGallons: 0,
            dataSource: "synthetic_admin_test_case"
          },
          {
            id: "month-2025-08",
            retrofitPerformanceId: "perf-led",
            month: "2025-08",
            actualSavingsCents: 70000,
            estimatedSavingsCents: 50000,
            cumulativeSavingsCents: 110000,
            cumulativeIncentivesReceivedCents: 500000,
            cumulativeNetBenefitCents: -890000,
            actualCO2eReducedKg: 1200,
            estimatedCO2eReducedKg: 800,
            baselineElectricityKwh: 10000,
            actualElectricityKwh: 5800,
            estimatedElectricityKwh: 7000,
            baselineGasTherms: 0,
            actualGasTherms: 0,
            estimatedGasTherms: 0,
            baselineWaterGallons: 0,
            actualWaterGallons: 0,
            estimatedWaterGallons: 0,
            dataSource: "synthetic_admin_test_case"
          }
        ],
        incentivePerformanceRecords: [
          {
            id: "inc-received",
            retrofitPerformanceId: "perf-led",
            programName: "Utility LED Rebate",
            status: "received",
            estimatedAmountCents: 400000,
            approvedAmountCents: 400000,
            receivedAmountCents: 400000,
            pendingAmountCents: 0,
            notClaimedAmountCents: 0,
            dataSource: "synthetic_admin_test_case"
          },
          {
            id: "inc-pending",
            retrofitPerformanceId: "perf-led",
            programName: "Tax credit",
            status: "pending",
            estimatedAmountCents: 100000,
            approvedAmountCents: 100000,
            receivedAmountCents: 0,
            pendingAmountCents: 75000,
            notClaimedAmountCents: 25000,
            dataSource: "synthetic_admin_test_case"
          }
        ],
        documentRecords: [
          {
            id: "doc-invoice",
            relatedRetrofitId: "perf-led",
            name: "Contractor invoice",
            documentType: "invoice",
            status: "verified",
            requiredFor: "incentive"
          },
          {
            id: "doc-photo",
            relatedRetrofitId: "perf-led",
            name: "Completion photo",
            documentType: "completion_photo",
            status: "missing",
            requiredFor: "certification"
          }
        ],
        certificationRecords: [
          {
            id: "cert-green-business",
            certificationName: "Green Business",
            certificationProvider: "Local Green Business Program",
            status: "in_progress",
            progressPercent: 66,
            readinessPercent: 50,
            completedItems: 2,
            missingItems: 1,
            inProgressItems: 1,
            requiredDocuments: 2,
            readyDocuments: 1,
            missingDocuments: 1,
            verifiedDocuments: 1,
            retrofitsContributing: ["perf-led"],
            nextActions: ["Upload completion photo"],
            dataSource: "synthetic_admin_test_case"
          }
        ],
        certificationRequirements: [
          {
            id: "req-energy",
            certificationId: "cert-green-business",
            name: "Energy efficiency evidence",
            category: "energy",
            status: "complete",
            pointsEarned: 6,
            pointsPossible: 10,
            required: true
          },
          {
            id: "req-docs",
            certificationId: "cert-green-business",
            name: "Photo evidence",
            category: "documentation",
            status: "missing",
            pointsEarned: 0,
            pointsPossible: 4,
            required: true
          }
        ],
        nextBestActions: [
          {
            id: "action-doc",
            title: "Upload completion photo",
            description: "Add the post-install photo needed for the rebate file.",
            category: "document",
            priority: "high",
            priorityScore: 90,
            estimatedValueCents: 75000,
            ctaLabel: "Upload proof",
            ctaTarget: "/dashboard/documents",
            relatedRetrofitId: "perf-led",
            relatedDocumentId: "doc-photo",
            reason: "Missing proof blocks incentive closeout.",
            status: "open",
            dataSource: "synthetic_admin_test_case"
          }
        ],
        dataQuality: { status: "complete", notes: [], warnings: [] }
      }
    } as any;

    const preview = buildUserRetrofitPreviewResult(postInstallPayload);
    const dashboard = buildDashboardPerformanceData(postInstallPayload, preview);

    expect(dashboard.dataQuality.basisLabel).toBe("modeled");
    expect(dashboard.periodLabel).toBe("Jul 1, 2025 - Jun 30, 2026");
    expect(dashboard.financial.totalProjectCostCents).toBe(1500000);
    expect(dashboard.financial.incentivesReceivedCents).toBe(500000);
    expect(dashboard.financial.incentivesPendingCents).toBe(75000);
    expect(dashboard.financial.incentivesNotClaimedCents).toBe(25000);
    expect(dashboard.financial.cashFlowSeries.map((point) => point.projected)).toEqual([-9600, -8900]);
    expect(dashboard.financial.topSavingsRetrofits[0].value).toBe(8400);
    expect(dashboard.environmental.impactSeries.map((point) => point.projected)).toEqual([0.9, 2.1]);
    expect(dashboard.certifications.documentReadiness.reduce((sum, row) => sum + row.ready, 0)).toBe(1);
    expect(dashboard.certifications.documentReadiness.reduce((sum, row) => sum + row.missing, 0)).toBe(1);
    expect(dashboard.certifications.programs[0].progressPercent).toBe(66);
    expect(dashboard.certifications.programs[0].documentReadinessPercent).toBe(50);
    expect(dashboard.certifications.nextActions[0].title).toBe("Upload completion photo");
  });

  it("defines the post-implementation dashboard structure and source-backed empty states", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8");
    const dashboardStart = source.indexOf("function DashboardPerformanceHub(");
    const dashboardSource = source.slice(dashboardStart, source.indexOf("function RetrofitPickerView", dashboardStart));
    const mainPagesStart = source.indexOf("const DASHBOARD_MAIN_PAGES");
    const mainPagesSource = source.slice(mainPagesStart, source.indexOf("const FINANCIAL_DASHBOARD_TABS", mainPagesStart));

    expect(source).toContain("export function buildDashboardPerformanceData");
    expect(source).toContain("DASHBOARD_IMPLEMENTED_STATUSES");
    expect(source).toContain("normalizeDashboardImplementationStatus");
    expect(source).toContain("No post-implementation retrofit records were found");
    expect(mainPagesSource).toContain("Summary");
    expect(mainPagesSource).toContain("Financial Performance");
    expect(mainPagesSource).toContain("Environmental Impact");
    expect(mainPagesSource).toContain("Certifications");
    expect(mainPagesSource).not.toContain("Next Best Actions");
    expect(mainPagesSource).not.toContain("Savings by Retrofit");
    expect(mainPagesSource).not.toContain("Gaps & Readiness");
    expect(source).toContain("Cash Flow & Incentives");
    expect(source).toContain("AdminDashboardPerformanceDataPanel");
    expect(source).toContain("Dashboard Performance Test Data");
    expect(source).toContain("/api/admin/dashboard-performance/test-cases");
    expect(source).toContain("/api/admin/dashboard-performance/seed-all");
    expect(source).toContain("Validate all generated data");
    expect(source).toContain("Open dashboard preview");
    expect(source).toContain("Savings by Retrofit");
    expect(source).toContain("Outlook & Equivalencies");
    expect(source).toContain("Gaps & Readiness");
    expect(source).toContain("Next Best Actions");
    expect(dashboardSource).toContain("Performance Dashboard");
    expect(dashboardSource).toContain("Financial Snapshot");
    expect(dashboardSource).toContain("Environmental Snapshot");
    expect(dashboardSource).toContain("Certification Progress");
    expect(dashboardSource).toContain("Next Best Action");
    expect(dashboardSource).toContain("Implemented Retrofits");
    expect(dashboardSource).toContain("Cumulative Cash Flow");
    expect(dashboardSource).toContain("Incentive Tracking");
    expect(dashboardSource).toContain("Recurring Savings Breakdown");
    expect(dashboardSource).toContain("Actual vs. Estimated Performance");
    expect(dashboardSource).toContain("Impact Data & Methodology");
    expect(dashboardSource).toContain("Application Readiness by Program");
    expect(dashboardSource).toContain("Recommended Next Best Actions");
    expect(dashboardSource).toContain("Document Readiness Summary");
    expect(source).toContain("sidebar-dashboard-subnav");
    expect(styles).toContain(".dashboard-hub");
    expect(styles).toContain(".dashboard-kpi-grid");
    expect(styles).toContain(".dashboard-three-state-grid");
    expect(styles).toContain(".dashboard-table-scroll");
    expect(styles).toContain("@media (max-width: 1180px)");
  });

  it("defines short customer UI names for every taxonomy retrofit type", async () => {
    const taxonomyModulePath = "../../api/server/matching/retrofitTaxonomy.mjs";
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
        hideBillData={true}
        payload={multiRetrofitPayload}
        title="Retrofit Recommendations"
      />
    );

    expect(html).toContain("Retrieve your estimates");
    expect(html).toContain("Upload your electric, water, gas, and waste bills to continue");
    expect(html).toContain("Upload bills");
    expect(html).toContain("upload-cloud-icon");
    expect(html).not.toContain(">UP<");
    expect(html).not.toContain("Select a retrofit to explore");
    expect(html).not.toContain("Choose one retrofit to see opportunities, detailed metrics, and next steps.");
    expect(html).toContain("Sort by");
    expect(html).toContain("<option value=\"recommended\" selected=\"\">Recommended</option>");
    expect(html).toContain("<option value=\"total_savings\">Savings</option>");
    expect(html).toContain("<option value=\"payback\">Payback</option>");
    expect(html).toContain("<option value=\"upfront_cost\">Cost</option>");
    expect(html).not.toContain("Search retrofits");
    expect(html).toContain("aria-label=\"Grid view\"");
    expect(html).toContain("aria-label=\"Panel view\"");
    expect(html).toContain("picker-view-icon");
    expect(html).not.toContain("picker-view-check-icon");
    expect(html).toContain(">Grid<");
    expect(html).toContain(">Panel<");
    expect(html).toContain("user-preview-shell");
    expect(html).toContain("user-preview-sidebar");
    expect(html).not.toContain("retrofi-brand-icon");
    expect(html).not.toContain("sidebar-wordmark");
    expect(html).toContain("Retrofits");
    expect(html).toContain("aria-expanded=\"false\"");
    expect(html).not.toContain("sidebar-retrofit-list");
    expect(html).not.toContain("sidebar-retrofit-item");
    expect(html).toContain("Profile info");
    expect(html).toContain("Dashboard");
    expect(html).toContain("Instructions");
    expect(html.indexOf("Dashboard")).toBeLessThan(html.indexOf("Instructions"));
    expect(html).toContain("data-instructions-nav-item=\"true\"");
    expect(html).toContain("Collapse retrofit navigation");
    expect(html).not.toContain("The Process");
    expect(html).not.toContain("Customer preview bar");
    expect(html).not.toContain("Retrofit preview</span>");
    expect(html).not.toContain("Collapse sidebar");
    expect(html).toContain("LED Lighting");
    expect(html).not.toContain("LED Lighting Upgrade");
    expect(html).toContain("Replace existing lights with high-efficiency LEDs.");
    expect(html).not.toContain("Programs related to");
    expect(html).toContain("Savings");
    expect(html).toContain("Cost");
    expect(html).toContain("Payback");
    expect(html).toContain("Environmental impact");
    expect(html).toContain("?");
    expect(html).toContain("metric-placeholder--bill");
    expect(html).toContain("metric-placeholder--question");
    expect(html).not.toContain("data-tooltip=");
    expect(html).toContain("Upload bills to estimate savings.");
    expect(html).toContain("Answer retrofit-specific questions to estimate cost.");
    expect(html).not.toContain("Answer retrofit-specific questions or add a quote");
    expect(html).toContain("Upload bills and answer retrofit-specific questions to estimate payback.");
    expect(html).not.toContain("Upload bills and answer retrofit-specific questions. Upload bills and answer retrofit-specific questions");
    expect(html).toContain("metric-placeholder--both");
    expect(html).toContain("metric-savings-icon");
    expect(html).toContain("metric-cost-icon");
    expect(html).toContain("metric-payback-icon");
    expect(html).toContain("metric-impact-icon");
    expect(html).toContain("retrofit-picker-metric-label");
    expect((html.match(/class=\"retrofit-picker-card\"/g) || []).length).toBe(6);
    expect((html.match(/class=\"retrofit-readiness-row\"/g) || []).length).toBe(6);
    expect(html).toContain("Bills");
    expect(html).toContain("Questions");
    expect(html).toContain("Estimate");
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
    expect(html).not.toContain("data-workspace-tab=\"environmental\"");
    expect(html).not.toContain("data-workspace-panel=\"environmental\"");
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
    expect(html).not.toContain("$810");
    expect(html).not.toContain("$3,160");
    expect(html).not.toContain("3.9 yrs");
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

  it("hydrates test-case bill readiness from intake data and lets admins hide it", () => {
    const payloadWithBills = {
      ...liveShapedPayload,
      intake: {
        ...liveShapedPayload.intake,
        uploadedUtilityFiles: [],
        utilityExtractedValues: [
          {
            extractedValueId: "sample-annual-kwh",
            clientIntakeId: "intake-1",
            fileId: "sample-electric",
            fieldId: "annual_kwh",
            fieldDisplayName: "Annual kWh",
            value: 12000,
            unit: "kWh",
            periodStart: "2025-01-01",
            periodEnd: "2025-12-31",
            confidence: "medium",
            sourceType: "unknown",
            sourceText: null,
            sourcePath: null
          }
        ],
        siteEnergyProfile: {
          uploadedFileCount: 1,
          processedFileCount: 1,
          availableFieldIds: ["annual_kwh"],
          latestUtilityProvider: "Sample Utility",
          latestBillingPeriodStart: "2025-01-01",
          latestBillingPeriodEnd: "2025-12-31",
          annualKwh: 12000,
          annualElectricCost: 240000,
          averageCostPerKwh: 20,
          monthlySummaries: [],
          utilitySummaries: [
            {
              utilityCategory: "electric",
              uploadedFileCount: 0,
              processedFileCount: 1,
              availableFieldIds: ["annual_kwh"],
              latestUtilityProvider: "Sample Utility",
              latestBillingPeriodStart: "2025-01-01",
              latestBillingPeriodEnd: "2025-12-31",
              annualUsage: 12000,
              annualCost: 240000,
              averageUnitCost: 20,
              usageUnit: "kWh",
              monthlySummaries: [],
              lastUpdatedAt: "2026-06-01T00:00:00.000Z"
            }
          ],
          lastUpdatedAt: "2026-06-01T00:00:00.000Z"
        }
      }
    } as any;

    const shownHtml = renderToStaticMarkup(
      <RetrofitRecommendationsPreview
        emptyMessage="No retrofit recommendations yet."
        error={null}
        eyebrow="Admin-only portal preview"
        intro="Review recommended retrofits."
        isLoading={false}
        loadingMessage="Loading live retrofit recommendations for this client..."
        hideBillData={false}
        payload={payloadWithBills}
        title="Retrofit Recommendations"
      />
    );
    const hiddenHtml = renderToStaticMarkup(
      <RetrofitRecommendationsPreview
        emptyMessage="No retrofit recommendations yet."
        error={null}
        eyebrow="Admin-only portal preview"
        intro="Review recommended retrofits."
        isLoading={false}
        loadingMessage="Loading live retrofit recommendations for this client..."
        hideBillData={true}
        payload={payloadWithBills}
        title="Retrofit Recommendations"
      />
    );

    expect(shownHtml).toContain("Retrofit readiness: Bills complete");
    expect(shownHtml).not.toContain("Upload bills to estimate savings.");
    expect(hiddenHtml).toContain("Retrofit readiness: Bills incomplete");
    expect(hiddenHtml).toContain("Upload bills to estimate savings.");
  });

  it("shows uploaded test-case bills in the picker banner and modal seed state", () => {
    const uploadedUtilityFiles = [
      {
        fileId: "sample-electric",
        clientIntakeId: "intake-1",
        siteId: "intake-1:primary",
        originalFilename: "hoa-mai-electric.pdf",
        fileType: "utility_pdf",
        utilityCategory: "electric",
        utilityProvider: "Sample Electric",
        s3Key: "synthetic/hoa-mai-electric.pdf",
        processingStatus: "processed",
        uploadedAt: "2026-06-01T00:00:00.000Z",
        processedAt: "2026-06-01T00:00:00.000Z",
        errorMessage: null
      },
      {
        fileId: "sample-gas",
        clientIntakeId: "intake-1",
        siteId: "intake-1:primary",
        originalFilename: "hoa-mai-gas.pdf",
        fileType: "utility_pdf",
        utilityCategory: "gas",
        utilityProvider: "Sample Gas",
        s3Key: "synthetic/hoa-mai-gas.pdf",
        processingStatus: "processed",
        uploadedAt: "2026-06-01T00:00:00.000Z",
        processedAt: "2026-06-01T00:00:00.000Z",
        errorMessage: null
      },
      {
        fileId: "sample-water",
        clientIntakeId: "intake-1",
        siteId: "intake-1:primary",
        originalFilename: "hoa-mai-water.pdf",
        fileType: "utility_pdf",
        utilityCategory: "water_sewer",
        utilityProvider: "Sample Water",
        s3Key: "synthetic/hoa-mai-water.pdf",
        processingStatus: "processed",
        uploadedAt: "2026-06-01T00:00:00.000Z",
        processedAt: "2026-06-01T00:00:00.000Z",
        errorMessage: null
      }
    ];
    const payloadWithThreeBills = {
      ...liveShapedPayload,
      intake: {
        ...liveShapedPayload.intake,
        uploadedUtilityFiles,
        siteEnergyProfile: {
          siteId: "intake-1:primary",
          uploadedFileCount: 3,
          processedFileCount: 3,
          availableFieldIds: [],
          latestUtilityProvider: "Sample Electric",
          latestBillingPeriodStart: "2025-01-01",
          latestBillingPeriodEnd: "2025-12-31",
          annualKwh: null,
          annualElectricCost: null,
          averageCostPerKwh: null,
          monthlySummaries: [],
          utilitySummaries: [
            {
              utilityCategory: "electric",
              uploadedFileCount: 1,
              processedFileCount: 1,
              availableFieldIds: [],
              latestUtilityProvider: "Sample Electric",
              latestBillingPeriodStart: "2025-01-01",
              latestBillingPeriodEnd: "2025-12-31",
              annualUsage: null,
              annualCost: null,
              averageUnitCost: null,
              usageUnit: null,
              monthlySummaries: [],
              lastUpdatedAt: "2026-06-01T00:00:00.000Z"
            },
            {
              utilityCategory: "gas",
              uploadedFileCount: 1,
              processedFileCount: 1,
              availableFieldIds: [],
              latestUtilityProvider: "Sample Gas",
              latestBillingPeriodStart: "2025-01-01",
              latestBillingPeriodEnd: "2025-12-31",
              annualUsage: null,
              annualCost: null,
              averageUnitCost: null,
              usageUnit: null,
              monthlySummaries: [],
              lastUpdatedAt: "2026-06-01T00:00:00.000Z"
            },
            {
              utilityCategory: "water_sewer",
              uploadedFileCount: 1,
              processedFileCount: 1,
              availableFieldIds: [],
              latestUtilityProvider: "Sample Water",
              latestBillingPeriodStart: "2025-01-01",
              latestBillingPeriodEnd: "2025-12-31",
              annualUsage: null,
              annualCost: null,
              averageUnitCost: null,
              usageUnit: null,
              monthlySummaries: [],
              lastUpdatedAt: "2026-06-01T00:00:00.000Z"
            }
          ],
          lastUpdatedAt: "2026-06-01T00:00:00.000Z"
        }
      }
    } as any;
    const hydratedState = hydrateBillUploadStateFromIntake(payloadWithThreeBills.intake, getDefaultBillUploadState());

    expect(hydratedState.statuses).toEqual({
      electric: "uploaded",
      water: "uploaded",
      gas: "uploaded",
      waste: "pending"
    });
    expect(getBillUploadStepSummary(hydratedState).map((step) => step.id)).toEqual(["electric", "water", "gas"]);
    expect(getBillUploadResumeIndex(hydratedState)).toBe(3);
    expect(hydratedState.files.electric?.name).toBe("hoa-mai-electric.pdf");

    const html = renderToStaticMarkup(
      <RetrofitRecommendationsPreview
        emptyMessage="No retrofit recommendations yet."
        error={null}
        eyebrow="Admin-only portal preview"
        intro="Review recommended retrofits."
        isLoading={false}
        loadingMessage="Loading live retrofit recommendations for this client..."
        hideBillData={false}
        payload={payloadWithThreeBills}
        title="Retrofit Recommendations"
      />
    );

    expect(html).toContain("Utility bills loaded");
    expect(html).toContain("3 of 4 utility bill types are available for estimates.");
    expect(html).toContain(">Review bills<");
    expect(html).not.toContain(">Upload bills</button>");
  });

  it("updates local confirmation state helpers", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);
    const firstAssumption = preview.retrofits[0].editableAssumptions[0];
    const single = confirmSingleEstimateState({}, firstAssumption.id);
    expect(single[firstAssumption.id]).toBe(true);

    const all = confirmAllEstimateState({}, preview.retrofits[0].editableAssumptions);
    expect(Object.values(all).every(Boolean)).toBe(true);
  });

  it("derives retrofit readiness and keeps complete cards ahead of incomplete ones", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);
    const retrofit = preview.retrofits[0];
    const readyRetrofit = {
      ...retrofit,
      id: "solar_rooftop_ready",
      name: "Solar Rooftop",
      detailQuestions: [],
      opportunities: [],
      metrics: {
        ...retrofit.metrics,
        estimatedUpfrontProjectCost: 100000,
        recurringOperationalSavingsAnnual: 24000,
        paybackPeriodYears: 4,
        roi: "24%"
      }
    } as any;
    const billState = {
      ...getDefaultBillUploadState(),
      statuses: {
        electric: "uploaded" as const,
        water: "pending" as const,
        gas: "pending" as const,
        waste: "pending" as const
      }
    };

    expect(getRequiredBillTypesForRetrofit(retrofit)).toEqual(["electric"]);
    expect(areBillsCompleteForRetrofit(retrofit, billState)).toBe(true);
    expect(areRetrofitQuestionsComplete(retrofit, {})).toBe(false);

    const readiness = getRetrofitReadiness(readyRetrofit, billState, {});
    expect(readiness.billsComplete).toBe(true);
    expect(readiness.questionsComplete).toBe(true);
    expect(readiness.estimateComplete).toBe(true);

    const comparison = comparePreviewRetrofits(
      readyRetrofit,
      {
        ...retrofit,
        metrics: {
          ...retrofit.metrics,
          estimatedUpfrontProjectCost: null,
          recurringOperationalSavingsAnnual: null,
          paybackPeriodYears: null,
          roi: null
        }
      } as any,
      "recommended",
      new Map([
        [readyRetrofit.id, readiness],
        [retrofit.id, getRetrofitReadiness(retrofit, getDefaultBillUploadState(), {})]
      ])
    );
    expect(comparison).toBeLessThan(0);
  });

  it("seeds admin test-case form answers from intake details", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);
    const retrofit = preview.retrofits[0];
    const formQuestions = getRetrofitFormQuestions(retrofit);
    const seededAnswers = buildSeededRetrofitDetailAnswers(preview.retrofits, liveShapedPayload.intake as any);

    expect(formQuestions.length).toBeGreaterThan(retrofit.detailQuestions.length);
    expect(formQuestions.map((question) => question.question)).toContain("Confirm project quote.");
    expect(seededAnswers[`${retrofit.id}:tax-inclusive-costs`]).toContain("Estimate");
    expect(areRetrofitQuestionsComplete(retrofit, seededAnswers)).toBe(true);
    expect(areRetrofitQuestionsComplete(retrofit, {})).toBe(false);
  });

  it("adds required tax runtime fields to retrofit project questions", () => {
    const preview = buildUserRetrofitPreviewResult({
      ...liveShapedPayload,
      taxRuntimePreview: {
        status: "requires_tax_intake",
        opportunityDisplayBlocked: true,
        requiredPreOpportunityInputs: [
          {
            inputKey: "sf_business_activity_category",
            label: "San Francisco business activity category",
            questionPrompt: "Which San Francisco business activity category applies?",
            answerType: "text",
            valueType: "string",
            helperText: "Use the annual business tax return activity schedule."
          },
          {
            inputKey: "sf_gross_receipts_tax_return_present",
            label: "San Francisco gross receipts tax return available",
            questionPrompt: "Is the San Francisco gross receipts tax return or equivalent workpaper available?",
            answerType: "boolean",
            valueType: "boolean_or_enum"
          }
        ],
        totals: {
          includedBenefitCents: 0,
          includedLiabilityCents: 0,
          includedAmountCents: 0
        }
      }
    } as any);

    const retrofit = preview.retrofits[0];
    const questions = getRetrofitFormQuestions(retrofit);

    expect(preview.missingInputs).toContain("San Francisco business activity category");
    expect(questions.map((question) => question.question)).toContain("Which San Francisco business activity category applies?");
    expect(questions.map((question) => question.question)).toContain("Is the San Francisco gross receipts tax return or equivalent workpaper available?");
    expect(areRetrofitQuestionsComplete(retrofit, {})).toBe(false);
  });

  it("supports conditional form questions without custom frontend branching", () => {
    const retrofit = {
      id: "tax_credit_retrofit",
      detailQuestions: [
        {
          id: "tax_credit_retrofit:taxable_income_cents",
          retrofitId: "tax_credit_retrofit",
          question: "What is your taxable income?",
          answerType: "number"
        },
        {
          id: "tax_credit_retrofit:credit_carryforward",
          retrofitId: "tax_credit_retrofit",
          question: "Can unused credit be carried forward?",
          answerType: "boolean",
          visibleIf: {
            field: "tax_credit_retrofit:taxable_income_cents",
            op: ">",
            value: 0
          }
        }
      ]
    } as any;

    expect(getRetrofitFormQuestions(retrofit, {}).map((question) => question.id)).toEqual([
      "tax_credit_retrofit:taxable_income_cents"
    ]);
    expect(getRetrofitFormQuestions(retrofit, { "tax_credit_retrofit:taxable_income_cents": "0" }).map((question) => question.id)).toEqual([
      "tax_credit_retrofit:taxable_income_cents"
    ]);
    expect(getRetrofitFormQuestions(retrofit, { "tax_credit_retrofit:taxable_income_cents": "2500000" }).map((question) => question.id)).toEqual([
      "tax_credit_retrofit:taxable_income_cents",
      "tax_credit_retrofit:credit_carryforward"
    ]);
  });

  it("resumes bill upload state from the first incomplete or skipped bill and validates storage keys", () => {
    expect(BILL_UPLOAD_STEPS.map((step) => step.id)).toEqual(["electric", "water", "gas", "waste"]);
    expect(BILL_UPLOAD_STEPS[0].title).toBe("Upload your electric bill");
    expect(BILL_UPLOAD_STEPS[1].title).toBe("Upload your water bill");
    expect(getBillUploadStorageKey("profile-1", "intake-1")).toBe("retrofi.billUploadModalState:profile-1:intake-1");

    const defaultState = getDefaultBillUploadState();
    expect(getBillUploadResumeIndex(defaultState)).toBe(0);
    expect(
      getBillUploadResumeIndex({
        ...defaultState,
        statuses: {
          electric: "uploaded",
          water: "skipped",
          gas: "pending",
          waste: "pending"
        }
      })
    ).toBe(1);
    expect(
      sanitizeBillUploadState({
        flowComplete: true,
        files: { electric: { name: "bill.pdf", size: 1, type: "application/pdf", uploadedAt: "2026-07-03T00:00:00.000Z" } },
        statuses: { electric: "uploaded", water: "bogus", gas: "skipped", waste: "pending" }
      }).statuses
    ).toEqual({
      electric: "uploaded",
      water: "pending",
      gas: "skipped",
      waste: "pending"
    });
  });

  it("accepts only supported bill-upload file types", () => {
    expect(isSupportedBillUploadFile(new File(["a"], "bill.pdf", { type: "application/pdf" }))).toBe(true);
    expect(isSupportedBillUploadFile(new File(["a"], "bill.png", { type: "image/png" }))).toBe(true);
    expect(isSupportedBillUploadFile(new File(["a"], "bill.jpg", { type: "image/jpeg" }))).toBe(true);
    expect(isSupportedBillUploadFile(new File(["a"], "bill.txt", { type: "text/plain" }))).toBe(false);
  });

  it("opens the bill upload modal from the retrofits page instead of routing away", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
    const handleUploadIndex = source.indexOf("function handleUploadBills()");
    const uploadHandlerEndIndex = source.indexOf("function toggleOpportunity", handleUploadIndex);
    const uploadHandlerSource = source.slice(handleUploadIndex, uploadHandlerEndIndex);
    const previewReturnIndex = source.indexOf("return (", source.indexOf("function RetrofitRecommendationsPreview"));
    const mainCloseIndex = source.indexOf("</main>", previewReturnIndex);
    const modalMountIndex = source.indexOf("<BillUploadModal", previewReturnIndex);
    const instructionsModalIndex = source.indexOf("{showInstructionsModal", previewReturnIndex);

    expect(uploadHandlerSource).toContain("setBillUploadModalOpen(true)");
    expect(uploadHandlerSource).toContain("setBillUploadFocusStepId(getFirstIncompleteBillUploadStepId(effectiveBillUploadState) || null)");
    expect(uploadHandlerSource).not.toContain("scan-energy-data");
    expect(source).toContain("function BillUploadModal(");
    expect(source).toContain("initialState={effectiveBillUploadState}");
    expect(source).toContain("useState<BillUploadState>(() => initialState)");
    expect(source).toContain("function handleStepTabClick(index: number)");
    expect(source).toContain("function handleRemoveBillUpload(stepId: BillUploadStepId)");
    expect(source).toContain("currentStepUploaded ? `${currentStep.utilityLabel} bill uploaded` : currentStep.title");
    expect(source).toContain('aria-current={index === currentStepIndex ? "step" : undefined}');
    expect(source).toContain("bill-upload-remove-button");
    expect(modalMountIndex).toBeGreaterThan(mainCloseIndex);
    expect(modalMountIndex).toBeLessThan(instructionsModalIndex);
  });

  it("renders the selected retrofit estimate workspace with the new tab set and safety gates", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
    const tabsStart = source.indexOf("const workspaceTabs = [");
    const tabsSource = source.slice(tabsStart, source.indexOf("] as const;", tabsStart));
    const workspaceStart = source.indexOf("<article className={`estimate-workspace-shell");
    const workspaceEnd = source.indexOf("\nfunction ApplicationPrepDrawer", workspaceStart);
    const componentSource = source.slice(source.indexOf("function RetrofitPreviewCardView("), workspaceEnd);
    const workspaceSource = source.slice(workspaceStart, workspaceEnd);
    const headerIndex = workspaceSource.indexOf("<header className=\"estimate-header\">");
    const headerSource = workspaceSource.slice(headerIndex, workspaceSource.indexOf("</header>", headerIndex));
    const tabBarIndex = workspaceSource.indexOf("<nav aria-label=\"Estimate workspace tabs\"");
    const firstPanelIndex = workspaceSource.indexOf("data-workspace-panel=\"overview\"");
    const applicationPanelStart = workspaceSource.indexOf("data-workspace-panel=\"application\"");
    const applicationPanelSource = workspaceSource.slice(applicationPanelStart, workspaceSource.indexOf("</section>", applicationPanelStart));
    const modalStart = source.indexOf("function UnconfirmedRetrofitModal(");
    const modalSource = source.slice(modalStart, source.indexOf("function FinancingPreviewDrawer", modalStart));

    expect(tabsSource).toContain("{ key: \"overview\", label: \"Overview\" }");
    expect(tabsSource).toContain("{ key: \"financials\", label: \"Financials\" }");
    expect(tabsSource).toContain("{ key: \"scenariosOpportunities\", label: \"Scenarios+Opportunities\" }");
    expect(tabsSource).toContain("{ key: \"environmental\", label: \"Impact\" }");
    expect(tabsSource).toContain("{ key: \"application\", label: \"Application Overview\" }");
    expect(tabsSource).not.toContain("{ key: \"opportunities\", label: \"Opportunities\" }");
    expect(tabsSource).not.toContain("{ key: \"scenarios\", label: \"Scenarios\" }");
    expect(tabsSource.match(/label:/g)).toHaveLength(5);
    const tabOrderIndexes = [
      tabsSource.indexOf("{ key: \"overview\", label: \"Overview\" }"),
      tabsSource.indexOf("{ key: \"scenariosOpportunities\", label: \"Scenarios+Opportunities\" }"),
      tabsSource.indexOf("{ key: \"financials\", label: \"Financials\" }"),
      tabsSource.indexOf("{ key: \"environmental\", label: \"Impact\" }"),
      tabsSource.indexOf("{ key: \"application\", label: \"Application Overview\" }")
    ];
    expect(tabOrderIndexes.every((index) => index >= 0)).toBe(true);
    expect(tabOrderIndexes).toEqual([...tabOrderIndexes].sort((left, right) => left - right));
    expect(tabsSource).not.toContain("{ key: \"requirements\"");
    expect(tabsSource).not.toContain("{ key: \"more\"");
    expect(headerIndex).toBeGreaterThanOrEqual(0);
    expect(tabBarIndex).toBeGreaterThan(headerIndex);
    expect(firstPanelIndex).toBeGreaterThan(tabBarIndex);
    expect(workspaceSource).toContain("EstimateProgressStepper");
    expect(source).toContain("label: \"Bills\"");
    expect(source).toContain("label: \"Questions\"");
    expect(source).toContain("label: \"Estimate\"");
    expect(source).toContain("label: \"Implementation\"");
    expect(source).toContain("label: \"Application\"");
    expect(source).toContain("label: \"Dashboard\"");
    expect(workspaceSource).toContain("Why this is recommended");
    expect(workspaceSource).toContain("One-time savings");
    expect(workspaceSource).toContain("Annual operating savings");
    expect(workspaceSource).toContain("Payback period");
    expect(workspaceSource).toContain("ROI");
    expect(workspaceSource).toContain("Selected opportunities");
    expect(workspaceSource).toContain("Current scenario");
    expect(workspaceSource).toContain("Application overview");
    expect(workspaceSource).toContain("Impact overview");
    expect(workspaceSource).toContain("Financing options available");
    expect(workspaceSource).toContain("Financials snapshot");
    expect(workspaceSource).toContain("Monthly");
    expect(workspaceSource).toContain("Annual");
    expect(workspaceSource).toContain("setFinancialPeriod(\"monthly\")");
    expect(workspaceSource).toContain("setFinancialPeriod(\"annual\")");
    expect(workspaceSource).toContain("${financialPeriodLabel} operating savings");
    expect(workspaceSource).toContain("${financialPeriodLabel} incentive savings");
    expect(workspaceSource).toContain("financialPeriod === \"monthly\" ? \"mo\" : \"yr\"");
    expect(workspaceSource).toContain("estimate-financial-equation-grid");
    expect(workspaceSource).toContain("One-time equation");
    expect(workspaceSource).toContain("Recurring monthly equation");
    expect(workspaceSource).toContain("SavingsEquationCard");
    expect(workspaceSource).not.toContain("Financial inventory");
    expect(workspaceSource).toContain("EstimateProjectFundingChart");
    expect(source).toContain("How your project is funded");
    expect(source).toContain("Utility rebates");
    expect(source).toContain("Tax credits");
    expect(source).toContain("Grants");
    expect(source).toContain("Financing benefit");
    expect(source).toContain("You cover");
    expect(workspaceSource).toContain("EstimateOneTimeCostWaterfallChart");
    expect(workspaceSource).toContain("EstimatePaybackTimelineChart");
    expect(workspaceSource).toContain("EstimateCumulativeCashFlowChart");
    expect(source).toContain("One-time cost waterfall");
    expect(source).toContain("Payback timeline");
    expect(source).toContain("Cumulative cash flow over 10 years");
    expect(workspaceSource).not.toContain("opportunity-view-toggle");
    expect(workspaceSource).not.toContain("opportunity-review-layout");
    expect(workspaceSource).not.toContain("opportunity-review-detail-panel");
    expect(workspaceSource).not.toContain("renderOpportunityDetailPanel");
    expect(componentSource).toContain("Application process");
    expect(componentSource).toContain("Difficulty");
    expect(componentSource).toContain("Deadline");
    expect(componentSource).toContain("View program details");
    expect(componentSource).toContain("scenario-opportunity-detail-panel");
    expect(componentSource).toContain("Prepare application");
    expect(workspaceSource).not.toContain("No additional requirements stored");
    expect(workspaceSource).not.toContain("label=\"Length\"");
    expect(workspaceSource).not.toContain("label=\"Impact note\"");
    expect(workspaceSource).not.toContain("label=\"Source\" value");
    expect(workspaceSource).not.toContain("<EstimateInfoRow label=\"Selected\"");
    expect(workspaceSource).not.toContain("label=\"Help available\"");
    expect(workspaceSource).toContain("Scenario and opportunity comparison");
    expect(workspaceSource).toContain("Scenario opportunities");
    expect(workspaceSource).not.toContain("scenario-view-toggle");
    expect(workspaceSource).not.toContain("scenario-view-option");
    expect(source).not.toContain("[\"tradeoffs\", \"Tradeoffs\"]");
    expect(source).not.toContain("[\"summary\", \"Summary\"]");
    expect(source).not.toContain("[\"review\", \"Review\"]");
    expect(source).not.toContain("[\"guided\", \"Guided\"]");
    expect(workspaceSource).not.toContain("showScenarioMatrix");
    expect(workspaceSource).not.toContain("showScenarioTradeoffs");
    expect(workspaceSource).not.toContain("showScenarioSummary");
    expect(workspaceSource).not.toContain("showScenarioReview");
    expect(workspaceSource).not.toContain("showScenarioGuided");
    expect(workspaceSource).not.toContain("scenario-comparison-recommended-ribbon");
    expect(workspaceSource).not.toContain("scenario-tradeoff-card");
    expect(workspaceSource).not.toContain("scenario-summary-preview");
    expect(workspaceSource).not.toContain("scenario-review-preview");
    expect(workspaceSource).not.toContain("scenario-guided-preview");
    expect(workspaceSource).toContain("data-workspace-panel=\"scenariosOpportunities\"");
    expect(workspaceSource).toContain("scenario-opportunity-workspace");
    expect(workspaceSource).toContain("Choose your scenario");
    expect(workspaceSource).toContain("Review opportunities in this scenario");
    expect(workspaceSource).toContain("scenarioOpportunityDetail ? renderScenarioOpportunityDetailPanel(scenarioOpportunityDetail) : null");
    expect(componentSource).toContain("scenarioOpportunityDetailSelection");
    expect(workspaceSource).toContain("scenario-opportunity-card-grid");
    expect(workspaceSource).toContain("scenario-opportunity-mini-table");
    expect(workspaceSource).toContain("scenario-opportunity-table");
    expect(workspaceSource).toContain("Changes to included opportunities will automatically recalculate scenario metrics and recommendations");
    expect(componentSource).toContain("One-time savings");
    expect(componentSource).toContain("Annual operating savings");
    expect(componentSource).toContain('label="ROI"');
    expect(componentSource).toContain('subtitle="Average annual return"');
    expect(componentSource).toContain('label="kWh saved per year"');
    expect(componentSource).toContain('label="Therms avoided per year"');
    expect(workspaceSource).toContain("{profile.included.length} included · {profile.excluded.length} excluded");
    expect(workspaceSource).toContain('role="columnheader">Included</span>');
    expect(source).toContain("Lowest upfront cost");
    expect(source).toContain("Fastest payback");
    expect(source).toContain("Highest one-time & recurring savings");
    expect(workspaceSource).toContain("Main impact estimate");
    expect(workspaceSource).toContain("estimate-impact-copy");
    expect(workspaceSource).toContain("estimate-impact-value-row");
    expect(workspaceSource).toContain("formatAnnualImpactUnitLabel(displayedEnvironmentalImpact.overall.unit)");
    expect(workspaceSource).toContain("impactPlainLanguageSentence(displayedEnvironmentalImpact.overall)");
    expect(workspaceSource).not.toContain("avoided / year");
    expect(workspaceSource).toContain("Additional impact metrics");
    expect(workspaceSource).toContain("Certification contribution");
    expect(workspaceSource).toContain("EstimateImpactProjectionChart");
    expect(source).toContain("Cumulative CO2e avoided");
    expect(source).toContain("estimate-impact-projection-chart");
    expect(source).toContain("metric tons of carbon dioxide equivalent");
    expect(source).toContain("CO2e reduced/year");
    expect(source).not.toContain("CO2e reduced / year");
    expect(source).toContain("LEED O+M");
    expect(source).toContain("ENERGY STAR readiness");
    expect(source).toContain("Green Business certification");
    expect(workspaceSource).toContain("Opportunity name");
    expect(workspaceSource).toContain("Related retrofit");
    expect(workspaceSource).toContain("Pre-approval required");
    expect(workspaceSource).toContain("Estimated time");
    expect(workspaceSource).toContain("Level of support");
    expect(applicationPanelSource).toContain("View full application details");
    expect(applicationPanelSource).not.toContain("Application process");
    expect(applicationPanelSource).not.toContain("Required documents");
    expect(applicationPanelSource).not.toContain("Generated packet");
    expect(headerSource).toContain("estimate-header-actions");
    expect(headerSource).toContain("Confirm & move to next step");
    expect(headerSource).toContain("Discard changes");
    expect(headerSource).not.toContain("Why this is recommended");
    expect(headerSource).not.toContain("whyRecommended[0]");
    expect(workspaceSource).not.toContain("estimate-right-rail");
    expect(workspaceSource).not.toContain("Estimate step in progress");
    expect(workspaceSource).not.toContain("Auto-saved just now");
    expect(workspaceSource).not.toContain("Download estimate");
    expect(workspaceSource).not.toContain("PDF summary");
    expect(componentSource).toContain("appStatus?.status === \"customer_ready\"");
    expect(source).toContain("applicationOverviewStatus?.status === \"reference_only\"");
    expect(workspaceSource).toContain("Funding exhausted — reference only");
    expect(workspaceSource).toContain("Application support not available yet");
    expect(source).not.toContain("opportunityImpactSupportedLabel");
    expect(source).toContain("maskEnvironmentalImpactForNoBillData");
    expect(source).toContain("Application source");
    expect(source).toContain("Open official source");
    expect(source).toContain("Application link");
    expect(source).toContain("PDF/form");
    expect(source).toContain("Contact email");
    expect(source).not.toContain("Application URL not found yet");
    expect(source).toContain("Open program source");
    expect(source).toContain("Open application link");
    expect(source).toContain("Open PDF/form");
    expect(source).toContain("Contact email:");
    expect(source).toContain("Reviewed by RetroFi");
    expect(source).toContain("Copy checklist");
    expect(source).toContain("No application is submitted automatically");
    expect(source).toContain("applicationRequiredDocuments");
    expect(source).toContain("opportunityAffectsMetric");
    expect(source).toContain("eligibleCostBasis");
    expect(source).toContain("valueCap");
    expect(source).toContain("AddedRetrofitPlanSnapshot");
    expect(source).toContain("includedOpportunityIds");
    expect(source).toContain("pendingOpportunityIds");
    expect(source).toContain("financialSnapshot");
    expect(source).toContain("recalculationStatus");
    expect(source).toContain("Financing preview");
    expect(modalSource).toContain("You have unconfirmed changes");
    expect(modalSource).toContain("Confirm and move to next step");
    expect(modalSource).toContain("Discard changes");
    expect(modalSource).not.toContain("Add to plan");
    expect(modalSource).not.toContain("Continue editing");
    expect(source).not.toContain("data-workspace-panel=\"requirements\"");
    expect(source).not.toContain("{ key: \"requirements\", label: \"Requirements\" }");
    expect(source).toContain("Preview as customer");
    expect(source).toContain("Hide bill data");
    expect(source).toContain("Hide form details");
    expect(source).toContain("Form details hidden");
    expect(source).toContain("enableSeededFormDetails={true}");
    expect(source).toContain("/api/admin/fake-client-options");
    expect(source).toContain("/api/admin/client-retrofit-preview/");
    expect(source).toContain("summaryEndpoint");
    expect(source).toContain("isProgressiveShell");
    expect(source).toContain("isPartialRecommendations");
    expect(source).toContain("mergePortalRetrofitRecommendationsPayload");
    expect(source).toContain("retrofitTypeId=");
    expect(source).toContain("Loading detailed opportunities and calculations");
    expect(source).toContain("queueAdminRecommendationPrecompute");
    expect(source).toContain("/api/admin/client-retrofit-recommendations/precompute");
    expect(source).toContain("Detailed estimates could not load");
    expect(source).toContain("Detailed retrofit data could not load");
    expect(source).toContain("payloadCache");
    expect(source).toContain("initialPayload={selectedPayload}");
    expect(source).toContain("onPayloadLoaded={cacheSelectedPayload}");
    expect(source).toContain("Show less retrofits");
    expect(source).toContain("Exit customer preview");
    expect(source).not.toContain("Back to all retrofits");
    expect(source).toContain("function UserPreviewSidebar");
    expect(source).toContain("sidebarCollapsed");
    expect(source).toContain("onToggleCollapsed");
    expect(source).toContain("user-preview-sidebar-collapse");
    expect(source).toContain("onShowAllRetrofits={() =>");
    expect(source).toContain("if (activeRetrofitId) {");
    expect(source).toContain("onShowAllRetrofits();");
    expect(source).toContain("function RetrofitDetailFormModal(");
    expect(source).toContain("setActiveFormRetrofitId(retrofit.id)");
    expect(source).toContain("if (!readiness.questionsComplete)");
    expect(source).toContain("buildSeededRetrofitDetailAnswers(preview.retrofits");
    expect(source).toContain("getRetrofitFormQuestions(retrofit)");
    expect(source).not.toContain("function UserPreviewTopBar");
    expect(source).toContain("Profile info");
    expect(source).toContain("Dashboard");
    expect(source).toContain("Instructions");
    expect(source).toContain("ProcessOnboardingModal");
    expect(source).toContain("Post Form Preview");
    expect(source).toContain("ADMIN_POST_FORM_PREVIEW_TAB");
    expect(source).toContain("postFormPreview");
    expect(source).toContain("new URLSearchParams({ postFormPreview: \"1\" })");
    expect(source).toContain("useTypewriterSequence");
    expect(source).toContain("retrofi.instructionsOnboardingSeen");
    expect(source).toContain("retrofi.intakeJustCompleted");
    expect(source).toContain("Step 1: Upload your bills");
    expect(source).toContain("Step 2: Choose a retrofit and answer a few questions");
    expect(source).toContain("Step 3: Get your opportunities, metrics, and more");
    expect(source).toContain("Step 4: Receive implementation and application support");
    expect(source).toContain("Step 5: View your dashboard");
    expect(source).toContain("Once you proceed with a retrofit and confirm, other retrofit data will adjust accordingly for future selection.");
    expect(source).toContain("process-editor-content");
    expect(source).toContain("process-editor-title");
    expect(source).toContain("process-number");
    expect(source).toContain("code-accent");
    expect(source).toContain("ProcessAccentText");
    expect(source).toContain("visibleProcessStepText");
    expect(source).toContain("if (prefix.startsWith(text)) return \"\"");
    expect(source).toContain("getProcessTypingDelay");
    expect(source).toContain("line.id.startsWith(\"step\") ? 34 : 20");
    expect(source).not.toContain("onboarding.md");
    expect(source).toContain("data-instructions-nav-item");
    expect(source).toContain("role=\"dialog\"");
    expect(source).toContain("aria-modal=\"true\"");
    expect(source).toContain("prefers-reduced-motion");
    expect(source).toContain("process-onboarding-flight");
    expect(source).toContain("sidebar-instructions-item");
    expect(source).toContain("safeStorageSet(\"session\", INTAKE_JUST_COMPLETED_KEY, \"true\")");
    expect(source).toContain("const activeNavRetrofitId = activeRetrofitId;");
    expect(source).not.toContain("activeRetrofitId || retrofits[0]?.id");
    expect(source).toContain("if (activeRetrofitId) setRetrofitsOpen(true)");
    expect(source).toContain("activeRetrofit ? (");
    expect(source).toContain("onSelectRetrofit(retrofit.id)");
    expect(source).toContain("setMobileSidebarOpen(false)");
    expect(source).toContain("sidebar-retrofit-item");
    expect(source).toContain("Grid</span>");
    expect(source).toContain("Panel</span>");
    expect(workspaceSource).toContain("data-workspace-tab");
    expect(workspaceSource).toContain("data-workspace-panel=\"environmental\"");
    expect(workspaceSource).not.toContain("Submit application");
    expect(workspaceSource).not.toContain("Send email");
    expect(workspaceSource).not.toContain("Autofill PDF");
    expect(workspaceSource).not.toContain("Generate packet");
  });

  it("opens admin ApplicationProfile details visibly from the list actions", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
    const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(source).toContain("profileDetailRef");
    expect(source).toContain("scrollIntoView({ behavior: \"smooth\", block: \"start\" })");
    expect(source).toContain("focus({ preventScroll: true })");
    expect(source).toContain("viewProfile(profile.profileId, \"view\")");
    expect(source).toContain("viewProfile(profile.profileId, \"edit\")");
    expect(source).toContain("open={profileDetailMode === \"edit\"}");
    expect(source).toContain("selectedProfile?.profileId === profile.profileId ? \"is-selected\" : undefined");
    expect(css).toContain(".application-source-table tbody tr.is-selected");
    expect(css).toContain(".application-profile-detail:focus");
  });

  it("keeps the public marketing nav out of the user preview loading state", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
    const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(source).toContain("function AppSessionRestoringPage");
    expect(source).toContain("function isAppChromeRoute(route: Route)");
    expect(source).toContain("route === \"user-preview\"");
    expect(source).toContain("return <AppSessionRestoringPage />");
    expect(source).toContain("return <SessionRestoringPage navigate={navigate} />");

    const appRestoringSource = source.slice(
      source.indexOf("function AppSessionRestoringPage"),
      source.indexOf("function isAppChromeRoute")
    );
    expect(appRestoringSource).toContain("RetroFiPageLoader");
    expect(appRestoringSource).not.toContain("PublicShell");
    expect(appRestoringSource).not.toContain("PublicNav");
    expect(appRestoringSource).not.toContain("site-nav");

    expect(css).toContain(".retrofi-loader-page");
    expect(css).toContain(".retrofi-logo-spinner");
  });

  it("keeps local Firstmate task routes out of the Google sign-in redirect path", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");

    const tasksRouteSource = source.slice(
      source.indexOf("if (effectiveRoute === \"tasks\")"),
      source.indexOf("if (effectiveRoute === \"task-report\")")
    );
    const reportRouteSource = source.slice(
      source.indexOf("if (effectiveRoute === \"task-report\")"),
      source.indexOf("if (effectiveRoute === \"user-preview\")")
    );

    expect(tasksRouteSource).toContain("return <LocalFirstmateTasksStandalonePage />");
    expect(tasksRouteSource).not.toContain("SignInPage");
    expect(reportRouteSource).toContain("return <LocalFirstmateTaskReportStandalonePage />");
    expect(reportRouteSource).not.toContain("SignInPage");
    expect(source).toContain("credential ? { headers: adminAuthHeaders(credential) } : {}");
    expect(source).toContain("Firstmate tasks require admin sign-in unless the local Firstmate tasks auth bypass is enabled.");
  });

  it("renders the shared full-page loader with the RetroFi logo and dashboard status text", () => {
    const html = renderToStaticMarkup(
      <RetroFiPageLoader
        label="Preparing your dashboard..."
        sublabel="Building savings, incentive, impact, and certification views"
        variant="dashboard"
      />
    );

    expect(html).toContain("retrofi-loader-page");
    expect(html).toContain("/retrofi-logo.png");
    expect(html).toContain("Preparing your dashboard...");
    expect(html).toContain("Building savings, incentive, impact, and certification views");
    expect(html).toContain("role=\"status\"");
  });

  it("clamps shared progress loader values between 0 and 100", () => {
    expect(clampRetroFiProgress(-10)).toBe(0);
    expect(clampRetroFiProgress(62)).toBe(62);
    expect(clampRetroFiProgress(130)).toBe(100);

    const lowHtml = renderToStaticMarkup(<RetroFiProgressLoader indeterminate={false} progress={-10} />);
    const highHtml = renderToStaticMarkup(<RetroFiProgressLoader indeterminate={false} progress={130} />);

    expect(lowHtml).toContain("0%");
    expect(highHtml).toContain("100%");
  });

  it("renders indeterminate progress without a fake percentage", () => {
    const html = renderToStaticMarkup(<RetroFiProgressLoader indeterminate label="Preparing dashboard metrics" />);

    expect(html).toContain("retrofi-progress-fill--indeterminate");
    expect(html).not.toContain("retrofi-progress-percent");
    expect(html).not.toContain("aria-valuenow");
  });

  it("renders compact circular logo loaders and skeleton placeholders", () => {
    const logoHtml = renderToStaticMarkup(<RetroFiLogoLoader label="Saving..." size="sm" tone="modal" />);
    const skeletonHtml = renderToStaticMarkup(<RetroFiSkeleton variant="chart" label="Loading chart" />);

    expect(logoHtml).toContain("retrofi-logo-loader--sm");
    expect(logoHtml).toContain("retrofi-logo-spinner-ring");
    expect(logoHtml).toContain("Saving...");
    expect(skeletonHtml).toContain("retrofi-skeleton-chart");
    expect(skeletonHtml).toContain("retrofi-skeleton-chart-body");
  });

  it("defines reduced-motion rules for RetroFi loaders", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".retrofi-logo-spinner-ring");
    expect(css).toContain(".retrofi-skeleton-line");
  });

  it("keeps the full-page RetroFi loading mark visually prominent", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(css).toContain("height: 104px");
    expect(css).toContain(".retrofi-logo-loader--page .retrofi-logo-spinner");
    expect(css).toContain("height: 118px");
    expect(css).toContain(".retrofi-logo-loader--page .retrofi-logo-spinner-mark");
    expect(css).toContain("height: 64px");
  });

  it("uses branded dashboard, modal, and skeleton loaders instead of plain loading states", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");

    expect(source).toContain("label={isPreviewCaseLoad ? \"Loading preview case...\" : \"Preparing your dashboard...\"}");
    expect(source).toContain("Building savings, incentive, impact, and certification views");
    expect(source).toContain("<RetroFiSkeleton key={index} variant=\"retrofit-card\"");
    expect(source).toContain("<RetroFiLogoLoader label=\"Loading the client portal preview...\"");
    expect(source).toContain("<RetroFiSkeleton variant=\"table\" rows={7} label=\"Loading ApplicationProfiles\"");
    expect(source).not.toContain("<RetroFiLogoLoader label=\"Checking application prep...\"");
    expect(source).toContain("No retrofit recommendations yet.");
  });

  it("gates customer Prepare Application V1 on approved sanitized ApplicationProfiles", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const source = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
    const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(source).toContain("/api/application-profiles/approved?opportunityId=");
    expect(source).toContain("status === \"customer_ready\"");
    expect(source).toContain("status === \"reference_only\"");
    expect(source).toContain("Application prep not available yet.");
    expect(source).toContain("const appReady = appStatus?.status === \"customer_ready\" && Boolean(appStatus.profile)");
    expect(source).toContain("appReady ? (");
    expect(source).toContain("setApplicationPrepOpportunity(opportunity)");
    expect(source).toContain("View full application details");
    expect(source).toContain("Funding exhausted — reference only");
    expect(source).toContain("Reviewed by RetroFi");
    expect(source).toContain("Application form questions");
    expect(source).toContain("ApplicationPrepFormQuestionList");
    expect(source).toContain("No application is submitted automatically.");
    expect(source).toContain("navigator.clipboard.writeText(applicationPrepChecklistText(profile))");
    expect(source).toContain("Copy checklist");
    expect(source).toContain("applicationOverviewIsReady");
    expect(source).toContain("applicationOverviewReferenceOnly");
    expect(source).not.toContain("Save packet");
    expect(source).not.toContain("Copy answers");
    expect(source).not.toContain("Autofill readiness");
    expect(source).not.toContain("Generated packet preview");
    expect(css).toContain(".application-prep-drawer");
    expect(css).toContain(".scenario-opportunity-source-link");
    expect(css).toContain(".application-prep-reference-notice");
  });

  it("builds honest environmental impact fallbacks without fake values", () => {
    const preview = buildUserRetrofitPreviewResult(liveShapedPayload);
    const impact = preview.retrofits[0].environmentalImpact;

    expect(impact.overall.label).toBe("Estimated annual emissions avoided");
    expect(impact.overall.displayValue).toBe("?");
    expect(impact.overall.confidence).toBe("Needs data");
    expect(impact.overall.fallback).toContain("Needs bills");
    expect(impact.resources.map((resource) => resource.label)).toContain("Electricity avoided");
    expect(impact.resources.some((resource) => resource.displayValue === "Needs bills")).toBe(true);
    expect(impact.missingInfo).toContain("Upload bills");
    expect(impact.missingInfo).toContain("Answer retrofit-specific questions");
  });

  it("uses category-aware environmental impact fallback rows", () => {
    const solarImpact = buildRetrofitEnvironmentalImpactPreview(
      { retrofitTypeId: "rooftop_solar_pv", parentCategory: "solar_renewable_electricity", isPhysicalRetrofit: true } as any,
      []
    );
    const evImpact = buildRetrofitEnvironmentalImpactPreview(
      { retrofitTypeId: "ev_charger_installation", parentCategory: "ev_charging_transportation", isPhysicalRetrofit: true } as any,
      []
    );
    const auditImpact = buildRetrofitEnvironmentalImpactPreview(
      { retrofitTypeId: "energy_audit", parentCategory: "audits_studies_planning", isPhysicalRetrofit: false } as any,
      []
    );

    expect(solarImpact.resources.map((resource) => resource.label)).toContain("Renewable electricity generated");
    expect(solarImpact.missingInfo).toContain("Add system size");
    expect(evImpact.resources.map((resource) => resource.label)).toContain("Fuel displaced");
    expect(evImpact.missingInfo).toContain("Add utilization estimate");
    expect(auditImpact.overall.label).toBe("Potential emissions reduction identified");
    expect(auditImpact.overall.displayValue).toBe("?");
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

  it("uses payload-backed detail questions for solar and biomass categories", () => {
    const categoryPayload = {
      ...liveShapedPayload,
      retrofits: [
        {
          ...liveShapedPayload.retrofits[0],
          retrofitTypeId: "biomass_biogas_energy_system",
          displayName: "Biomass/biogas energy system",
          detailQuestions: [
            {
              id: "biomass_biogas_energy_system:tax-inclusive-costs",
              retrofitId: "biomass_biogas_energy_system",
              question: "Do you want to enter costs with tax included, or should RetroFi estimate them for you?",
              answerType: "select",
              options: ["Enter tax-inclusive numbers", "Estimate for me (tax included)"]
            },
            {
              id: "biomass_biogas_energy_system:fuel-stream",
              retrofitId: "biomass_biogas_energy_system",
              question: "What fuel or waste stream would the system use?",
              answerType: "text"
            },
            {
              id: "biomass_biogas_energy_system:feedstock",
              retrofitId: "biomass_biogas_energy_system",
              question: "What quantity of feedstock is available per month?",
              answerType: "text"
            }
          ],
          opportunities: []
        },
        {
          ...liveShapedPayload.retrofits[0],
          retrofitTypeId: "solar_renewable_electricity",
          displayName: "Rooftop solar PV",
          detailQuestions: [
            {
              id: "solar_renewable_electricity:tax-inclusive-costs",
              retrofitId: "solar_renewable_electricity",
              question: "Do you want to enter costs with tax included, or should RetroFi estimate them for you?",
              answerType: "select",
              options: ["Enter tax-inclusive numbers", "Estimate for me (tax included)"]
            },
            {
              id: "solar_renewable_electricity:roof-area",
              retrofitId: "solar_renewable_electricity",
              question: "What roof or site area is available?",
              answerType: "number"
            },
            {
              id: "solar_renewable_electricity:roof-control",
              retrofitId: "solar_renewable_electricity",
              question: "Do you control the roof or site?",
              answerType: "select",
              options: ["Yes", "No", "Shared", "Unknown"]
            }
          ],
          opportunities: []
        }
      ]
    } as any;
    const preview = buildUserRetrofitPreviewResult(categoryPayload);
    const biomassQuestions = preview.retrofits[0].detailQuestions.map((question) => question.question);
    const solarQuestions = preview.retrofits[1].detailQuestions.map((question) => question.question);

    expect(biomassQuestions[0]).toContain("Do you want to enter costs with tax included");
    expect(biomassQuestions).toContain("What fuel or waste stream would the system use?");
    expect(biomassQuestions).toContain("What quantity of feedstock is available per month?");
    expect(solarQuestions[0]).toContain("Do you want to enter costs with tax included");
    expect(solarQuestions).toContain("What roof or site area is available?");
    expect(solarQuestions).toContain("Do you control the roof or site?");
    expect(solarQuestions).not.toContain("What quantity or scope is being upgraded?");
  });

  it("keeps the home planet scan hero copy deterministic with the single reveal CTA", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const appSource = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
    const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");
    const heroStart = appSource.indexOf("function PlanetScanHero");
    const heroEnd = appSource.indexOf("function HomePage", heroStart);
    const heroSource = appSource.slice(heroStart, heroEnd);

    expect(heroSource).toContain("<span>Find the money</span>");
    expect(heroSource).toContain("<span>behind your next</span>");
    expect(heroSource).toContain('<span className="planet-scan-title-accent">retrofit.</span>');
    expect(heroSource).toContain("<span>Find, compare, and claim</span>");
    expect(heroSource).toContain("<span>retrofit incentives.</span>");
    expect(heroSource).not.toContain("<span>RetroFi helps you</span>");
    expect(heroSource).not.toContain("planet-scan-cta--before");
    expect(heroSource).toContain("planet-scan-cta--after");
    expect(heroSource).not.toContain("planet-scan-eyebrow");
    expect(heroSource).not.toContain("See how it works");
    expect(heroSource).not.toContain("handleSecondaryAction");

    expect(css).toContain(".planet-scan-title span");
    expect(css).toContain("left: clamp(40px, 4.8vw, 88px);");
    expect(css).toContain("top: clamp(118px, 15.5vh, 178px);");
    expect(css).toContain("right: clamp(40px, 4.4vw, 88px);");
    expect(css).toContain("top: clamp(150px, 21vh, 230px);");
    expect(css).toContain(".planet-scan-cta--after");
    expect(css).not.toContain(".planet-scan-actions");
    expect(css).not.toContain(".planet-scan-copy h1");
    expect(css).not.toContain(".planet-scan-result-copy h2");
  });

  it("keeps preview hover and active states readable and visually distinct", async () => {
    const fsModuleName = "node:fs";
    const { readFileSync } = await import(fsModuleName);
    const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

    expect(css).toContain(".retrofit-preview-page .retrofit-tab:hover");
    expect(css).toContain(".retrofit-preview-page .retrofit-picker-card:hover");
    expect(css).toContain(".retrofit-preview-page .picker-view-button:hover");
    expect(css).toContain(".picker-view-toggle");
    expect(css).toContain(".picker-view-icon");
    expect(css).toContain(".sidebar-retrofit-item:hover");
    expect(css).toContain(".sidebar-retrofit-item.is-active");
    expect(css).toContain(".user-preview-shell.is-sidebar-collapsed");
    expect(css).toContain(".user-preview-sidebar-collapse");
    expect(css).toContain(".process-onboarding-modal");
    expect(css).toContain(".process-onboarding-flight");
    expect(css).toContain("radial-gradient(circle at 50% 56%, rgba(24, 50, 82, 0.32), transparent 62%)");
    expect(css).toContain("backdrop-filter: none");
    expect(css).toContain("width: min(95.1vw, 2000px)");
    expect(css).toContain(".process-onboarding-modal .process-editor-content");
    expect(css).toContain(".process-onboarding-backdrop .process-editor-title");
    expect(css).toContain("font-size: clamp(38px, 2.6vw, 44px)");
    expect(css).toContain("transform: translateY(clamp(-20px, -2vh, -12px))");
    expect(css).toContain("margin: 0 0 clamp(42px, 5.2vh, 52px)");
    expect(css).toContain(".process-onboarding-backdrop .process-number");
    expect(css).toContain("font-size: clamp(34px, 2.45vw, 42px)");
    expect(css).toContain("font-weight: 500");
    expect(css).toContain(".process-onboarding-backdrop .code-accent");
    expect(css).toContain("font-size: clamp(14px, 0.98vw, 18px)");
    expect(css).toContain("max-width: none");
    expect(css).toContain("transform: translateX(clamp(12px, 1.2vw, 24px))");
    expect(css).toContain("white-space: nowrap");
    expect(css).toContain("width: max-content");
    expect(css).toContain(".process-onboarding-modal .process-modal-footer");
    expect(css).toContain(".process-onboarding-backdrop .process-next-button");
    expect(css).toContain("justify-content: flex-end");
    expect(css).toContain("background: rgba(8, 18, 31, 0.74)");
    expect(css).toContain("min-width: clamp(180px, 13.4vw, 224px)");
    expect(css).toContain(".typewriter-caret");
    expect(css).toContain("border-right: 2px solid #4ea1ff");
    expect(css).toContain(".sidebar-instructions-item.is-pulsing");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("@keyframes instructions-nav-pulse");
    expect(css).not.toContain("onboarding.md");
    expect(css).not.toContain(".process-step-row > span");
    expect(css).not.toContain("border-top: 1px solid var(--rf-border);\n  margin-top: 4px;\n  padding-top: 0;");
    expect(css).toContain(".user-preview-admin-controls-button:hover");
    expect(css).toContain(".user-preview-customer-mode-button:hover");
    expect(css).toContain(".user-preview-form-toggle:hover");
    expect(css).toContain(".user-preview-form-toggle.is-active");
    expect(css).toContain(".user-preview-toolbar.is-customer-preview");
    expect(css).toContain(".customer-preview-strip");
    expect(css).toContain(".retrofit-form-backdrop");
    expect(css).toContain(".retrofit-form-modal");
    expect(css).toContain(".retrofit-form-question-list");
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
    expect(css).toContain(".retrofit-picker-card-impact");
    expect(css).toContain(".retrofit-readiness-row");
    expect(css).toContain(".retrofit-readiness-dot.is-complete");
    expect(css).not.toContain(".retrofit-picker-metric-value[data-tooltip]");
    expect(css).toContain(".metric-savings-icon");
    expect(css).toContain(".metric-cost-icon");
    expect(css).toContain(".metric-payback-icon");
    expect(css).toContain(".metric-impact-icon");
    expect(css).not.toContain(".retrofit-picker-metric span::before");
    expect(css).toContain(".recommendation-readiness-strip");
    expect(css).toContain(".filter-toolbar-main");
    expect(css).toContain(".current-plan-strip");
    expect(css).toContain(".retrofit-workspace-tabs");
    expect(css).toContain(".active-command-center");
    expect(css).toContain(".active-command-center-top");
    expect(css).toContain(".estimate-workspace-shell.is-scenarios-opportunities");
    expect(css).toContain(".scenario-opportunity-workspace");
    expect(css).toContain(".scenario-opportunity-detail-panel");
    expect(css).toContain(".scenario-opportunity-table-row");
    expect(css).toContain(".workspace-panel");
    expect(css).toContain(".overview-command-grid");
    expect(css).toContain(".overview-opportunity-preview");
    expect(css).not.toContain(".requirements-worklist");
    expect(css).toContain(".sticky-add-plan-footer");
    expect(css).toContain(".selected-scenario-rows");
    expect(css).toContain(".compact-detail-row");
    const pickerCardRule = css.match(/(?:^|\n)\.retrofit-picker-card\s*{([^}]*)}/)?.[1] || "";
    expect(pickerCardRule).toContain("min-height: 228px;");
    expect(pickerCardRule).not.toContain("\n  height: 118px;");

    const tabHoverRule = css.match(/\.retrofit-preview-page \.retrofit-tab:hover,[\s\S]*?{([\s\S]*?)}/)?.[1] || "";
    expect(tabHoverRule).not.toContain("#0f573c");
    expect(tabHoverRule).not.toContain("#176b4c");
  });
});
