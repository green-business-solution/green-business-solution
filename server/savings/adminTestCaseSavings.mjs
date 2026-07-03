import { calculateRetrofitSavingsEstimate } from "./engine.mjs";
import { selectV2PackagesForRetrofitGroup } from "./v2RuntimeIncentives.mjs";

export const ADMIN_TEST_CASE_SAVINGS_SCHEMA_VERSION = "admin-test-case-savings-v2";

const commonBillLines = {
  electric: {
    annual_kwh: 200000,
    average_cost_per_kwh: 0.18,
    demand_charge_rate: 15,
    export_rate_per_kwh: 0.05
  },
  gas: {
    annual_therms: 12000,
    average_cost_per_therm: 1.6
  },
  water_sewer: {
    water_unit: "gal",
    water_rate_per_unit: 0.01,
    sewer_rate_per_unit: 0.008
  },
  waste: {
    total_waste_cost_cents: 1200000
  },
  fuel: {
    fuel_type: "gasoline",
    price_per_gallon: 4
  }
};

const retrofitTemplates = {
  led_lighting_retrofit: {
    engineSlug: "led_lighting",
    retrofitTypeId: "rt_led_lighting",
    laborUnitAnswerKey: "fixture_count",
    laborRule: {
      fixedCostCents: 15000,
      perUnitCostCents: 2500,
      minimumContractorCostCents: 30000,
      countyLaborMultiplier: 1.1,
      retrofitComplexityMultiplier: 1
    },
    taxRate: 0.0875,
    billLines: { electric: { annual_kwh: 20000, average_cost_per_kwh: 0.18 } },
    userAnswers: {
      unit_count: 12,
      fixture_count: 12,
      existing_fixture_watts: 100,
      new_fixture_watts: 60,
      hours_per_day: 10,
      operating_days_per_year: 260,
      equipment_unit_cost_cents: 8500
    },
    assumptions: ["LED preview assumes 12 fixture replacements with fixed operating hours and fixture costs."]
  },
  high_efficiency_hvac_replacement: electricTemplate({
    modeledKwhReduction: 4000,
    equipmentCostCents: 600000,
    laborCostCents: 150000,
    assumptions: ["HVAC preview uses an admin-modeled annual kWh reduction until equipment-specific efficiency inputs are collected."]
  }),
  high_efficiency_refrigeration_equipment: electricTemplate({
    modeledKwhReduction: 6000,
    equipmentCostCents: 250000,
    laborCostCents: 75000
  }),
  refrigeration_ec_motor_retrofit: electricTemplate({
    modeledKwhReduction: 3504,
    equipmentCostCents: 80000,
    laborCostCents: 30000
  }),
  anti_sweat_heater_controls: electricTemplate({
    modeledKwhReduction: 8760,
    equipmentCostCents: 60000,
    laborCostCents: 30000
  }),
  refrigeration_controls_retrofit: electricTemplate({
    modeledKwhReduction: 3600,
    equipmentCostCents: 120000,
    laborCostCents: 40000
  }),
  walk_in_cooler_freezer_upgrade: electricTemplate({
    modeledKwhReduction: 6000,
    equipmentCostCents: 250000,
    laborCostCents: 75000
  }),
  variable_frequency_drive_retrofit: electricTemplate({
    modeledKwhReduction: 6000,
    equipmentCostCents: 150000,
    laborCostCents: 50000
  }),
  high_efficiency_motor_replacement: electricTemplate({
    modeledKwhReduction: 1600,
    equipmentCostCents: 100000,
    laborCostCents: 35000
  }),
  efficient_air_compressor: electricTemplate({
    modeledKwhReduction: 9000,
    equipmentCostCents: 220000,
    laborCostCents: 70000
  }),
  lighting_controls_retrofit: electricTemplate({
    modeledKwhReduction: 3200,
    equipmentCostCents: 90000,
    laborCostCents: 35000
  }),
  smart_thermostat_zoning_retrofit: electricTemplate({
    modeledKwhReduction: 2500,
    equipmentCostCents: 70000,
    laborCostCents: 25000
  }),
  energy_management_system: electricTemplate({
    modeledKwhReduction: 12000,
    equipmentCostCents: 180000,
    laborCostCents: 60000
  }),
  hvac_controls_retrofit: electricTemplate({
    modeledKwhReduction: 8000,
    equipmentCostCents: 160000,
    laborCostCents: 50000
  }),
  retro_commissioning_study: electricTemplate({
    modeledKwhReduction: 10000,
    equipmentCostCents: 85000,
    laborCostCents: 0,
    laborRequired: false,
    assumptions: ["Retro-commissioning preview treats the study and implementation package as an admin-modeled kWh reduction."]
  }),
  submetering_energy_monitoring: electricTemplate({
    modeledKwhReduction: 3000,
    equipmentCostCents: 60000,
    laborCostCents: 20000
  }),
  exterior_site_lighting_retrofit: electricTemplate({
    modeledKwhReduction: 5000,
    equipmentCostCents: 140000,
    laborCostCents: 50000
  }),
  air_sealing_weatherization: electricTemplate({
    modeledKwhReduction: 3000,
    equipmentCostCents: 120000,
    laborCostCents: 65000
  }),
  insulation_upgrade: electricTemplate({
    modeledKwhReduction: 4500,
    equipmentCostCents: 200000,
    laborCostCents: 100000
  }),
  window_replacement: electricTemplate({
    modeledKwhReduction: 3500,
    equipmentCostCents: 300000,
    laborCostCents: 120000
  }),
  window_film_shading_retrofit: electricTemplate({
    modeledKwhReduction: 2500,
    equipmentCostCents: 90000,
    laborCostCents: 30000
  }),
  duct_sealing_and_insulation: electricTemplate({
    modeledKwhReduction: 2800,
    equipmentCostCents: 90000,
    laborCostCents: 50000
  }),
  energy_recovery_ventilation_retrofit: electricTemplate({
    modeledKwhReduction: 7000,
    equipmentCostCents: 260000,
    laborCostCents: 90000
  }),
  high_efficiency_laundry_equipment: electricTemplate({
    modeledKwhReduction: 6000,
    equipmentCostCents: 220000,
    laborCostCents: 70000
  }),
  high_efficiency_commercial_dishwasher: electricTemplate({
    modeledKwhReduction: 3500,
    equipmentCostCents: 180000,
    laborCostCents: 60000
  }),
  induction_cooking_equipment: electricTemplate({
    modeledKwhReduction: 2500,
    equipmentCostCents: 160000,
    laborCostCents: 60000
  }),
  high_efficiency_oven: electricTemplate({
    modeledKwhReduction: 3000,
    equipmentCostCents: 190000,
    laborCostCents: 55000
  }),
  high_efficiency_fryer: electricTemplate({
    modeledKwhReduction: 2200,
    equipmentCostCents: 140000,
    laborCostCents: 45000
  }),
  high_efficiency_steamer: electricTemplate({
    modeledKwhReduction: 1800,
    equipmentCostCents: 120000,
    laborCostCents: 40000
  }),
  high_efficiency_boiler_retrofit: gasTemplate({
    modeledThermReduction: 500,
    equipmentCostCents: 400000,
    laborCostCents: 100000
  }),
  high_efficiency_furnace_retrofit: gasTemplate({
    modeledThermReduction: 350,
    equipmentCostCents: 250000,
    laborCostCents: 80000
  }),
  high_efficiency_gas_water_heater: gasTemplate({
    modeledThermReduction: 260,
    equipmentCostCents: 180000,
    laborCostCents: 70000
  }),
  solar_water_heating_system: gasTemplate({
    modeledThermReduction: 650,
    equipmentCostCents: 500000,
    laborCostCents: 140000
  }),
  heat_pump_water_heater: gasToElectricTemplate({
    thermsAvoided: 300,
    addedKwh: 1400,
    equipmentCostCents: 250000,
    laborCostCents: 80000
  }),
  heat_pump_hvac_retrofit: gasToElectricTemplate({
    thermsAvoided: 500,
    addedKwh: 3000,
    equipmentCostCents: 900000,
    laborCostCents: 200000
  }),
  ground_source_geothermal_heat_pump: gasToElectricTemplate({
    thermsAvoided: 700,
    addedKwh: 3600,
    equipmentCostCents: 1200000,
    laborCostCents: 280000
  }),
  process_electrification_equipment: gasToElectricTemplate({
    thermsAvoided: 800,
    addedKwh: 4500,
    equipmentCostCents: 800000,
    laborCostCents: 180000
  }),
  rooftop_solar_pv: solarTemplate({
    productionKwh: 75000,
    selfConsumptionPercent: 0.6,
    exportPercent: 0.4,
    installedCostCents: 10000000
  }),
  small_wind_turbine: solarTemplate({
    productionKwh: 60000,
    selfConsumptionPercent: 0.7,
    exportPercent: 0.3,
    installedCostCents: 8000000
  }),
  community_solar_subscription: solarTemplate({
    productionKwh: 30000,
    selfConsumptionPercent: 1,
    exportPercent: 0,
    installedCostCents: 50000,
    assumptions: ["Community solar preview models the subscribed annual bill credit value, not an owned onsite asset."]
  }),
  biomass_biogas_energy_system: solarTemplate({
    productionKwh: 90000,
    selfConsumptionPercent: 0.7,
    exportPercent: 0.3,
    installedCostCents: 9000000
  }),
  combined_heat_and_power_system: solarTemplate({
    productionKwh: 100000,
    selfConsumptionPercent: 0.85,
    exportPercent: 0.15,
    installedCostCents: 12000000
  }),
  fuel_cell_system: solarTemplate({
    productionKwh: 80000,
    selfConsumptionPercent: 0.8,
    exportPercent: 0.2,
    installedCostCents: 11000000
  }),
  battery_storage_system: demandTemplate({
    peakKwReduction: 20,
    batteryStorageKwh: 80,
    equipmentCostCents: 6000000,
    laborCostCents: 800000
  }),
  thermal_energy_storage: demandTemplate({
    peakKwReduction: 18,
    equipmentCostCents: 4500000,
    laborCostCents: 650000
  }),
  microgrid_system: demandTemplate({
    peakKwReduction: 25,
    batteryStorageKwh: 100,
    equipmentCostCents: 9000000,
    laborCostCents: 1200000
  }),
  automated_demand_response_controls: demandTemplate({
    peakKwReduction: 15,
    equipmentCostCents: 150000,
    laborCostCents: 50000
  }),
  solar_plus_storage_system: demandTemplate({
    peakKwReduction: 20,
    batteryStorageKwh: 80,
    equipmentCostCents: 11000000,
    laborCostCents: 1200000
  }),
  ev_charger_installation: evTemplate({
    monthlyKwh: 2000,
    equipmentCostCents: 600000,
    laborCostCents: 200000
  }),
  level_2_ev_charger_installation: evTemplate({
    monthlyKwh: 2000,
    equipmentCostCents: 600000,
    laborCostCents: 200000
  }),
  dc_fast_charger_installation: evTemplate({
    monthlyKwh: 8000,
    equipmentCostCents: 3000000,
    laborCostCents: 900000
  }),
  ev_make_ready_electrical_upgrade: evTemplate({
    monthlyKwh: 2000,
    equipmentCostCents: 400000,
    laborCostCents: 300000
  }),
  fleet_charging_infrastructure: evTemplate({
    monthlyKwh: 6000,
    equipmentCostCents: 2000000,
    laborCostCents: 600000
  }),
  electric_vehicle_purchase: fleetTemplate({
    vehicleCount: 3,
    annualMilesPerVehicle: 14000,
    existingMpg: 22,
    evKwhPerMile: 0.32,
    equipmentCostCents: 9000000
  }),
  electric_forklift_material_handling: fleetTemplate({
    vehicleCount: 2,
    annualMilesPerVehicle: 8000,
    existingMpg: 8,
    evKwhPerMile: 0.45,
    equipmentCostCents: 3200000
  }),
  low_flow_fixture_retrofit: waterTemplate({
    annualWaterReduction: 50000,
    equipmentCostCents: 80000,
    laborCostCents: 30000
  }),
  water_audit: waterTemplate({
    annualWaterReduction: 25000,
    equipmentCostCents: 25000,
    laborCostCents: 0,
    laborRequired: false,
    assumptions: ["Water audit preview models a conservative admin-entered annual water reduction."]
  }),
  cooling_tower_controls_optimization: waterTemplate({
    annualWaterReduction: 75000,
    equipmentCostCents: 120000,
    laborCostCents: 50000
  }),
  waste_heat_recovery: electricTemplate({
    modeledKwhReduction: 12000,
    equipmentCostCents: 450000,
    laborCostCents: 150000
  }),
  steam_trap_replacement: gasTemplate({
    modeledThermReduction: 350,
    equipmentCostCents: 70000,
    laborCostCents: 40000
  })
};

const serviceOnlyRetrofitIds = new Set([
  "energy_audit",
  "engineering_feasibility_study",
  "leed_certification",
  "building_benchmarking_compliance"
]);

export function buildAdminTestCaseSavingsPreview({
  retrofitGroup,
  sampleUserId,
  normalizedProfile,
  taxContext = normalizedProfile?.tax || null,
  grantContext = normalizedProfile?.grant || null,
  calculationDate,
  opportunityIncentiveRules = [],
  opportunityIncentiveCalculationPackages = [],
  taxGeographyRules = []
}) {
  const template = retrofitTemplates[retrofitGroup?.retrofitTypeId];
  if (!template) {
    const reason = serviceOnlyRetrofitIds.has(retrofitGroup?.retrofitTypeId)
      ? "This matched item is an audit, study, certification, or compliance task. It needs a resulting modeled savings input before RetroFi can calculate monthly savings."
      : `Savings model not implemented for ${retrofitGroup?.displayName || "this retrofit"} in admin test case ${sampleUserId}.`;
    return unsupportedPreview({ retrofitGroup, sampleUserId, reason });
  }

  const geography = savingsGeographyFromProfile(normalizedProfile);
  const selectedIncentiveRules = selectIncentiveRulesForRetrofitGroup(retrofitGroup, opportunityIncentiveRules);
  const selectedIncentivePackages = selectV2PackagesForRetrofitGroup(retrofitGroup, opportunityIncentiveCalculationPackages);
  const fixture = buildFixture({
    template,
    retrofitGroup,
    sampleUserId,
    geography,
    taxContext,
    grantContext,
    calculationDate,
    opportunityIncentiveRules: selectedIncentiveRules,
    opportunityIncentiveCalculationPackages: selectedIncentivePackages,
    taxGeographyRules
  });
  const estimate = calculateRetrofitSavingsEstimate(fixture);
  const incentiveAssumption =
    selectedIncentiveRules.length > 0 || selectedIncentivePackages.length > 0
      ? "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include."
      : "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.";

  return {
    schemaVersion: ADMIN_TEST_CASE_SAVINGS_SCHEMA_VERSION,
    status: estimate.status,
    estimateKind: "test_fixture",
    modelCoverage: "retrofit_only",
    retrofitTypeId: retrofitGroup.retrofitTypeId,
    retrofitDisplayName: retrofitGroup.displayName,
    opportunityCount: retrofitGroup.opportunityCount,
    calculationDate,
    upfrontCostCents: estimate.upfrontCostCents,
    upfrontSavingsCents:
      estimate.upfrontCostCents != null && estimate.upfrontCostAfterSavingsCents != null
        ? estimate.upfrontCostCents - estimate.upfrontCostAfterSavingsCents
        : null,
    oneTimeSavingsCents: estimate.oneTimeSavingsCents ?? null,
    possibleGrantMoneyCents: estimate.possibleGrantMoneyCents ?? 0,
    upfrontCostAfterSavingsCents: estimate.upfrontCostAfterSavingsCents,
    monthlyRecurringSavingsCents: estimate.monthlyRecurringSavingsCents ?? estimate.monthlySavingsCents,
    annualRecurringSavingsCents: estimate.annualRecurringSavingsCents ?? estimate.annualSavingsCents,
    monthlyRecurringExpensesCents: estimate.monthlyRecurringExpensesCents ?? 0,
    annualRecurringExpensesCents: estimate.annualRecurringExpensesCents ?? 0,
    netMonthlyRecurringSavingsCents: estimate.netMonthlyRecurringSavingsCents ?? estimate.monthlySavingsCents,
    netAnnualRecurringSavingsCents: estimate.netAnnualRecurringSavingsCents ?? estimate.annualSavingsCents,
    monthlySavingsCents: estimate.monthlySavingsCents,
    annualSavingsCents: estimate.annualSavingsCents,
    costBreakdown: estimate.costBreakdown,
    savingsBreakdown: estimate.savingsBreakdown,
    billLineDeltas: estimate.billLineDeltas,
    incentiveCalculationPackageSummaries: estimate.incentiveCalculationPackageSummaries || [],
    incentiveCalculationPackageCounts: estimate.incentiveCalculationPackageCounts || {
      matchedPackageCount: 0,
      runtimeRuleCount: 0,
      includedPackageCount: 0,
      missingInputPackageCount: 0,
      legacyPreferredPackageCount: 0,
      suppressedPackageCount: 0
    },
    selectedIncentiveScenario: estimate.selectedIncentiveScenario,
    alternativeScenarios: estimate.alternativeScenarios,
    calculationTrace: estimate.calculationTrace,
    assumptions: [
      ...template.assumptions,
      "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
      incentiveAssumption,
      "This is not a customer quote or final savings estimate."
    ],
    unsupportedReason: estimate.status === "blocked" ? "Savings preview is blocked by missing fixture inputs." : null
  };
}

function buildFixture({
  template,
  retrofitGroup,
  sampleUserId,
  geography,
  taxContext = null,
  grantContext = null,
  calculationDate,
  opportunityIncentiveRules = [],
  opportunityIncentiveCalculationPackages = [],
  taxGeographyRules = []
}) {
  const retrofitTypeId = template.retrofitTypeId || `rt_${template.engineSlug}`;
  const selectedOpportunityIds = [
    ...new Set([
      ...opportunityIncentiveRules.map((rule) => rule.opportunityId),
      ...opportunityIncentiveCalculationPackages.map((pkg) => pkg.opportunity_id)
    ])
  ];
  return {
    projectId: `admin_test_${sampleUserId}`,
    businessId: `admin_test_${sampleUserId}`,
    calculationDate,
    geography,
    retrofitInstance: {
      id: `ri_${sampleUserId}_${retrofitGroup.retrofitTypeId}`,
      retrofitTypeId,
      retrofitTypeSlug: template.engineSlug,
      selectedOpportunityIds,
      allowSyntheticV2Defaults: true
    },
    billLines: deepMerge(commonBillLines, template.billLines || {}),
    userAnswers: toAnswerMap(template.userAnswers),
    equipmentAnswerKeys: template.equipmentAnswerKeys,
    laborRequired: template.laborRequired !== false,
    laborUnitAnswerKey: template.laborUnitAnswerKey,
    laborCostRules: template.laborRequired === false ? [] : [buildLaborRule({ template, retrofitTypeId, geography })],
    geographicTaxRules: [buildTaxRule({ template, geography })],
    taxGeographyRules,
    taxContext,
    taxProfileFacts: taxContext?.taxProfileFacts || [],
    taxExtractedValues: taxContext?.taxExtractedValues || [],
    taxOpportunitySpecificInputs: taxContext?.taxOpportunitySpecificInputs || [],
    siteTaxProfile: taxContext?.siteTaxProfile || null,
    grantContext,
    grantProfileFacts: grantContext?.grantProfileFacts || [],
    grantRetrofitProjectInputs: grantContext?.grantRetrofitProjectInputs || [],
    grantOpportunitySpecificInputs: grantContext?.grantOpportunitySpecificInputs || [],
    opportunityIncentiveRules,
    opportunityIncentiveCalculationPackages,
    stackingRules: []
  };
}

function selectIncentiveRulesForRetrofitGroup(retrofitGroup, opportunityIncentiveRules = []) {
  if (!retrofitGroup?.opportunities?.length || !opportunityIncentiveRules.length) return [];

  const rulesByOpportunityId = new Map();
  for (const rule of opportunityIncentiveRules) {
    if (!rule?.opportunityId || rule.active === false || rule.confidence === "low") continue;
    const current = rulesByOpportunityId.get(rule.opportunityId) || [];
    current.push(rule);
    rulesByOpportunityId.set(rule.opportunityId, current);
  }

  return retrofitGroup.opportunities.flatMap((opportunity) => rulesByOpportunityId.get(opportunity.opportunityId) || []);
}

function buildLaborRule({ template, retrofitTypeId, geography }) {
  return {
    id: `admin_test_labor_${retrofitTypeId}_v1`,
    version: 1,
    retrofitTypeId,
    geography,
    unitAnswerKey: template.laborUnitAnswerKey || "unit_count",
    fixedCostCents: template.laborRule?.fixedCostCents || 0,
    perUnitCostCents: template.laborRule?.perUnitCostCents || 0,
    minimumContractorCostCents: template.laborRule?.minimumContractorCostCents || 0,
    countyLaborMultiplier: template.laborRule?.countyLaborMultiplier || 1,
    retrofitComplexityMultiplier: template.laborRule?.retrofitComplexityMultiplier || 1,
    effectiveStartDate: "2026-01-01",
    active: true
  };
}

function buildTaxRule({ template, geography }) {
  return {
    id: "admin_test_sales_tax_fixture_v1",
    version: 1,
    geography,
    taxType: "sales_tax",
    appliesToCategories: ["equipment_cost", "installation_labor"],
    ratePercent: template.taxRate ?? 0.08,
    equipmentTaxable: true,
    laborTaxable: false,
    effectiveStartDate: "2026-01-01",
    active: true
  };
}

function savingsGeographyFromProfile(normalizedProfile) {
  const geo = normalizedProfile?.site?.geo || {};
  return {
    country: "US",
    state: geo.stateCode || normalizedProfile?.site?.addressStructured?.stateCode || "CA",
    stateFips: geo.stateFips || null,
    countyFips: geo.countyFips || "00000",
    countyName: geo.countyName || null,
    placeGeoid: geo.placeGeoid || null,
    placeName: geo.placeName || null,
    city: geo.placeName || null,
    censusTractGeoid: geo.censusTractGeoid || null,
    censusBlockGeoid: geo.censusBlockGeoid || null,
    postalCode: geo.zip5 || normalizedProfile?.site?.addressStructured?.zip5 || null,
    coordinates: geo.coordinates || null
  };
}

function electricTemplate({
  modeledKwhReduction,
  equipmentCostCents,
  laborCostCents,
  laborRequired = true,
  assumptions = []
}) {
  return {
    engineSlug: "electric_kwh_reduction",
    retrofitTypeId: "rt_modeled_electric_kwh_reduction",
    equipmentAnswerKeys: ["equipment_cost_cents"],
    laborRequired,
    laborRule: laborRequired ? laborFromTotal(laborCostCents) : null,
    taxRate: 0.08,
    userAnswers: {
      unit_count: 1,
      modeled_kwh_reduction: modeledKwhReduction,
      equipment_cost_cents: equipmentCostCents
    },
    assumptions
  };
}

function gasTemplate({
  modeledThermReduction,
  equipmentCostCents,
  laborCostCents,
  laborRequired = true,
  assumptions = []
}) {
  return {
    engineSlug: "gas_therm_reduction",
    retrofitTypeId: "rt_modeled_gas_therm_reduction",
    equipmentAnswerKeys: ["equipment_cost_cents"],
    laborRequired,
    laborRule: laborRequired ? laborFromTotal(laborCostCents) : null,
    taxRate: 0.08,
    userAnswers: {
      unit_count: 1,
      modeled_therm_reduction: modeledThermReduction,
      equipment_cost_cents: equipmentCostCents
    },
    assumptions
  };
}

function gasToElectricTemplate({ thermsAvoided, addedKwh, equipmentCostCents, laborCostCents, assumptions = [] }) {
  return {
    engineSlug: "gas_to_electric",
    retrofitTypeId: "rt_gas_to_electric",
    equipmentAnswerKeys: ["equipment_cost_cents"],
    laborRule: laborFromTotal(laborCostCents),
    taxRate: 0.08,
    userAnswers: {
      unit_count: 1,
      annual_therms_avoided: thermsAvoided,
      modeled_new_electric_kwh: addedKwh,
      equipment_cost_cents: equipmentCostCents
    },
    assumptions
  };
}

function solarTemplate({
  productionKwh,
  selfConsumptionPercent,
  exportPercent,
  installedCostCents,
  assumptions = []
}) {
  return {
    engineSlug: "solar_pv",
    retrofitTypeId: "rt_solar_pv",
    equipmentAnswerKeys: ["installed_cost_cents"],
    laborRequired: false,
    taxRate: 0,
    userAnswers: {
      estimated_annual_production_kwh: productionKwh,
      self_consumption_percent: selfConsumptionPercent,
      export_percent: exportPercent,
      installed_cost_cents: installedCostCents,
      system_kw: Math.max(1, Math.round(productionKwh / 1400)),
      unit_count: 1
    },
    assumptions
  };
}

function demandTemplate({ peakKwReduction, batteryStorageKwh = null, equipmentCostCents, laborCostCents, assumptions = [] }) {
  const storageAnswers =
    batteryStorageKwh == null
      ? {}
      : {
          battery_storage_kwh: batteryStorageKwh,
          storage_capacity_kwh: batteryStorageKwh
        };

  return {
    engineSlug: "demand_charge_reduction",
    retrofitTypeId: "rt_demand_charge_reduction",
    equipmentAnswerKeys: ["equipment_cost_cents"],
    laborRule: laborFromTotal(laborCostCents),
    taxRate: 0.08,
    userAnswers: {
      unit_count: 1,
      peak_kw_reduction: peakKwReduction,
      ...storageAnswers,
      billing_months: 12,
      equipment_cost_cents: equipmentCostCents
    },
    assumptions
  };
}

function evTemplate({ monthlyKwh, equipmentCostCents, laborCostCents, assumptions = [] }) {
  return {
    engineSlug: "ev_charging",
    retrofitTypeId: "rt_ev_charging",
    equipmentAnswerKeys: ["equipment_cost_cents"],
    laborRule: laborFromTotal(laborCostCents),
    taxRate: 0.08,
    userAnswers: {
      unit_count: 1,
      expected_monthly_kwh: monthlyKwh,
      equipment_cost_cents: equipmentCostCents,
      charger_kw: monthlyKwh >= 8000 ? 150 : 19.2
    },
    assumptions
  };
}

function fleetTemplate({ vehicleCount, annualMilesPerVehicle, existingMpg, evKwhPerMile, equipmentCostCents }) {
  return {
    engineSlug: "fleet_electrification",
    retrofitTypeId: "rt_fleet_electrification",
    equipmentAnswerKeys: ["equipment_cost_cents"],
    laborRequired: false,
    taxRate: 0,
    userAnswers: {
      unit_count: vehicleCount,
      vehicle_count: vehicleCount,
      annual_miles_per_vehicle: annualMilesPerVehicle,
      existing_mpg: existingMpg,
      ev_kwh_per_mile: evKwhPerMile,
      equipment_cost_cents: equipmentCostCents
    },
    assumptions: ["Fleet preview uses annual mileage, gasoline price, and charging-rate assumptions from the admin test fixture."]
  };
}

function waterTemplate({
  annualWaterReduction,
  equipmentCostCents,
  laborCostCents,
  laborRequired = true,
  assumptions = []
}) {
  return {
    engineSlug: "water_efficiency",
    retrofitTypeId: "rt_water_efficiency",
    equipmentAnswerKeys: ["equipment_cost_cents"],
    laborRequired,
    laborRule: laborRequired ? laborFromTotal(laborCostCents) : null,
    taxRate: 0.08,
    userAnswers: {
      unit_count: 1,
      annual_water_reduction: annualWaterReduction,
      sewer_affected: true,
      equipment_cost_cents: equipmentCostCents
    },
    assumptions
  };
}

function laborFromTotal(laborCostCents) {
  return {
    fixedCostCents: laborCostCents,
    perUnitCostCents: 0,
    minimumContractorCostCents: laborCostCents,
    countyLaborMultiplier: 1,
    retrofitComplexityMultiplier: 1
  };
}

function toAnswerMap(values) {
  return Object.fromEntries(
    Object.entries(values).map(([answerKey, value]) => [
      answerKey,
      {
        value,
        source: "admin_entered"
      }
    ])
  );
}

function deepMerge(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) return override === undefined ? base : override;
  if (!base || typeof base !== "object" || !override || typeof override !== "object") {
    return override === undefined ? base : override;
  }
  const merged = { ...base };
  for (const [key, value] of Object.entries(override)) {
    merged[key] = deepMerge(base[key], value);
  }
  return merged;
}

function unsupportedPreview({ retrofitGroup, sampleUserId, reason }) {
  return {
    schemaVersion: ADMIN_TEST_CASE_SAVINGS_SCHEMA_VERSION,
    status: "unsupported",
    estimateKind: "not_modeled_v1",
    modelCoverage: "none",
    retrofitTypeId: retrofitGroup?.retrofitTypeId || "",
    retrofitDisplayName: retrofitGroup?.displayName || "Unknown retrofit",
    opportunityCount: retrofitGroup?.opportunityCount || 0,
    calculationDate: null,
    upfrontCostCents: null,
    upfrontSavingsCents: null,
    oneTimeSavingsCents: null,
    possibleGrantMoneyCents: 0,
    upfrontCostAfterSavingsCents: null,
    monthlyRecurringSavingsCents: null,
    annualRecurringSavingsCents: null,
    monthlyRecurringExpensesCents: null,
    annualRecurringExpensesCents: null,
    netMonthlyRecurringSavingsCents: null,
    netAnnualRecurringSavingsCents: null,
    monthlySavingsCents: null,
    annualSavingsCents: null,
    costBreakdown: [],
    savingsBreakdown: [],
    billLineDeltas: [],
    selectedIncentiveScenario: null,
    alternativeScenarios: [],
    calculationTrace: null,
    assumptions: [],
    unsupportedReason: reason || `Savings model not implemented for ${retrofitGroup?.displayName || "this retrofit"} in admin test case ${sampleUserId}.`
  };
}
