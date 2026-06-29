import { describe, expect, it } from "vitest";
import { opportunitySavingsMapping } from "./data.mjs";
import { buildClientRetrofitResults, validateRequirementFieldIds } from "./index.mjs";

const now = "2026-06-29T12:00:00.000Z";

function mappingFor(modelId) {
  const mapping = opportunitySavingsMapping.find((item) => item.primary_savings_model_id === modelId);
  if (!mapping) {
    throw new Error(`Could not find mapping for ${modelId}`);
  }
  return mapping;
}

function makeOpportunity(modelId, overrides = {}) {
  const mapping = mappingFor(modelId);
  return {
    opportunityId: mapping.opportunity_id,
    canonicalTitle: overrides.canonicalTitle || `Test ${modelId}`,
    normalizedTitle: overrides.normalizedTitle || `Test ${modelId}`,
    sourceKey: "SOURCE_DSIRE",
    sourceName: "DSIRE",
    sourceUrl: "https://example.com/program",
    websiteUrl: "https://example.com/program",
    applicationUrl: "https://example.com/apply",
    state: "CA",
    status: "active",
    category: "Financial Incentive",
    programType: "Rebate Program",
    summary: overrides.summary || "Commercial customers can receive incentives for efficiency upgrades.",
    technologies: overrides.technologies || ["LED Lighting"],
    sectors: overrides.sectors || ["Commercial"],
    dataQuality: { status: "clean" },
    contentHash: "abc",
    ...overrides
  };
}

function baseIntake(overrides = {}) {
  return {
    userId: "client_1",
    submissionId: "intake_client_1",
    contact: {
      fullName: "Test Client",
      email: "client@example.com",
      phone: null,
      roleTitle: null,
      contactPreference: "Email"
    },
    business: {
      companyName: "Retrofit Test Co",
      website: null,
      industry: "Commercial office",
      organizationType: "business_commercial",
      organizationSize: "11-50 employees",
      headquarters: "Oakland, CA"
    },
    site: {
      address: "123 Main St, Oakland, CA 94612",
      electricUtilityProvider: "PG&E",
      gasUtilityProvider: "PG&E",
      ownershipStatus: "Own",
      buildingType: "Office",
      squareFootage: "10000",
      numberOfUnits: null
    },
    sustainability: {
      goals: "Reduce energy costs",
      currentChallenges: "High bills",
      interestedImprovements: ["LED lighting"],
      monthlyUtilitySpend: "4000",
      timeline: "This year",
      notes: null
    },
    uploadedUtilityFiles: [],
    utilityExtractedValues: [],
    siteEnergyProfile: null,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function extractedValue(fieldId, value, overrides = {}) {
  return {
    extractedValueId: `file_1:${fieldId}`,
    clientIntakeId: "intake_client_1",
    fileId: "file_1",
    fieldId,
    fieldDisplayName: fieldId,
    value,
    unit: overrides.unit || null,
    periodStart: overrides.periodStart || "2025-01-01",
    periodEnd: overrides.periodEnd || "2025-12-31",
    confidence: overrides.confidence || "high",
    sourceType: "green_button_xml",
    sourceText: null,
    sourcePath: null
  };
}

describe("retrofit calculator", () => {
  it("validates requirement bill field IDs against the dictionary", () => {
    const validation = validateRequirementFieldIds();
    expect(validation.ok).toBe(true);
    expect(validation.errors).toEqual([]);
  });

  it("builds an electric savings estimate and recognizes ready-for-estimate status", () => {
    const intake = baseIntake({
      utilityExtractedValues: [
        extractedValue("annual_kwh", 120000, { unit: "kWh" }),
        extractedValue("annual_electric_cost", 21600, { unit: "USD" }),
        extractedValue("average_cost_per_kwh", 0.18, { unit: "USD/kWh" })
      ]
    });
    const results = buildClientRetrofitResults({
      intake,
      opportunities: [makeOpportunity("electric_usage_reduction")],
      now
    });

    expect(results.summary.readyToEstimate).toBe(1);
    expect(results.groups.readyToEstimate[0].estimate.annualSavingsTypical).toBeGreaterThan(0);
    expect(results.groups.readyToEstimate[0].estimate.paybackYearsTypical).toBeGreaterThan(0);
  });

  it("builds a water savings estimate from water usage and cost", () => {
    const intake = baseIntake({
      utilityExtractedValues: [
        extractedValue("annual_water_use", 500000, { unit: "gallons" }),
        extractedValue("annual_water_cost", 8000, { unit: "USD" })
      ]
    });
    const results = buildClientRetrofitResults({
      intake,
      opportunities: [makeOpportunity("water_sewer_reduction", { technologies: ["Water Efficiency"], summary: "Commercial water efficiency upgrades." })],
      now
    });

    const result = results.groups.readyToEstimate[0];
    expect(result.estimate.annualSavingsTypical).toBeGreaterThan(0);
    expect(result.estimate.estimatedProjectCostTypical).toBeGreaterThan(0);
  });

  it("marks incentive-only models as needing incentive details when no normalized rule is available", () => {
    const intake = baseIntake();
    const results = buildClientRetrofitResults({
      intake,
      opportunities: [makeOpportunity("project_cost_reduction_only")],
      now
    });

    const result = results.groups.needsMoreInformation[0];
    expect(result.readinessStatus).toBe("needs_incentive_details");
    expect(result.missingInfoPrompts.join(" ")).toMatch(/Missing incentive detail/i);
  });

  it("marks financing-only models as needing a quote when cost inputs are missing", () => {
    const intake = baseIntake();
    const results = buildClientRetrofitResults({
      intake,
      opportunities: [makeOpportunity("financing_cash_flow", { summary: "Commercial financing for retrofit projects." })],
      now
    });

    const result = results.groups.needsMoreInformation[0];
    expect(result.readinessStatus).toBe("needs_quote");
  });

  it("avoids division by zero when annual usage is zero", () => {
    const intake = baseIntake({
      utilityExtractedValues: [
        extractedValue("annual_kwh", 0, { unit: "kWh" }),
        extractedValue("annual_electric_cost", 0, { unit: "USD" }),
        extractedValue("average_cost_per_kwh", 0, { unit: "USD/kWh" })
      ]
    });
    const results = buildClientRetrofitResults({
      intake,
      opportunities: [makeOpportunity("electric_usage_reduction")],
      now
    });

    const result = results.groups.readyToEstimate[0];
    expect(result.estimate.paybackYearsTypical).toBeNull();
    expect(result.estimate.roi15YearTypical).toBeNull();
  });

  it("handles missing utility cost data without crashing and flags missing bill fields", () => {
    const intake = baseIntake({
      utilityExtractedValues: [extractedValue("annual_kwh", 90000, { unit: "kWh" })]
    });
    const results = buildClientRetrofitResults({
      intake,
      opportunities: [makeOpportunity("electric_usage_reduction")],
      now
    });

    const result = results.groups.needsMoreInformation[0];
    expect(result.readinessStatus).toBe("needs_bill_data");
    expect(result.estimate.annualSavingsTypical).toBeNull();
  });
});
