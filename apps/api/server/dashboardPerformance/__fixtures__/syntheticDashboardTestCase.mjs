export function syntheticDashboardTestCase() {
  return {
    sampleUserId: "juniper-and-ivy-san-diego",
    description: "Compact restaurant fixture for dashboard performance tests.",
    sourceForm: {
      companyName: "Juniper and Ivy",
      organizationType: "Business",
      buildingType: "Restaurant",
      siteAddress: "2228 Kettner Blvd, San Diego, CA 92101",
      electricUtilityProvider: "San Diego Gas & Electric",
      gasUtilityProvider: "San Diego Gas & Electric",
      ownershipStatus: "Lease",
      squareFootage: "8200",
      primaryActivityText: "Full-service restaurant and commercial kitchen",
      siteEnergyProfile: {
        annualKwh: 285000,
        annualElectricCost: 7980000,
        averageCostPerKwh: 0.28,
        annualTherms: 9100,
        annualGasCost: 1638000,
        averageCostPerTherm: 1.8,
        annualWaterUse: 740000,
        annualWaterCost: 1184000,
        monthlySummaries: [{ periodStart: "2026-05-01", periodEnd: "2026-05-31", kwh: 24000, cost: 672000 }]
      }
    },
    retrofits: [
      retrofit("high_efficiency_hvac_replacement", "High-efficiency HVAC replacement", "HVAC", 4200000, 850000, 740000),
      retrofit("led_lighting_retrofit", "LED lighting retrofit", "Lighting", 1800000, 360000, 420000),
      retrofit("commercial_kitchen_refrigeration_upgrade", "Commercial kitchen refrigeration upgrade", "Refrigeration", 2600000, 520000, 610000)
    ]
  };
}

function retrofit(retrofitTypeId, displayName, parentCategory, upfrontCostCents, upfrontSavingsCents, annualSavingsCents) {
  return {
    retrofitTypeId,
    displayName,
    parentCategory,
    opportunities: [
      {
        opportunityId: `${retrofitTypeId}:rebate`,
        opportunityName: `${displayName} rebate`,
        sourceUrl: "https://example.com/rebate",
        sourceSummary: {
          sourceName: "Synthetic Utility",
          administrator: "Synthetic Utility",
          programType: "Rebate Program"
        }
      }
    ],
    savingsPreview: {
      status: "calculated",
      upfrontCostCents,
      upfrontSavingsCents,
      upfrontCostAfterSavingsCents: upfrontCostCents - upfrontSavingsCents,
      annualSavingsCents,
      netAnnualRecurringSavingsCents: annualSavingsCents,
      selectedIncentiveScenario: {
        id: `${retrofitTypeId}:scenario`,
        opportunityIds: [`${retrofitTypeId}:rebate`]
      }
    }
  };
}
