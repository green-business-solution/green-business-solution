You are helping RetroFi verify scenario construction for one test case.

Task: Scenario combination verification only.

Do not deeply recalculate formula math in this pass. A later pass will verify dollar math. This pass should decide whether RetroFi picked the right combination of opportunities for each retrofit, given the opportunities and scenario candidates in the packet.

Definitions:
- The selected scenario is RetroFi's current best scenario for a retrofit.
- Alternative scenarios are other combinations RetroFi considered.
- Matched opportunities are opportunities that matched the retrofit/user profile, including opportunities that may not have entered a scenario because no calculable rule/package existed.
- V2 package summaries explain whether repaired calculation packages were included, blocked by missing inputs, low confidence, human review, not user-facing by default, or unsupported.

Review goals:
1. Check whether each selected scenario is internally valid.
2. Check whether it includes two opportunities that should not stack together.
3. Check whether it excludes a compatible additive opportunity that should be included.
4. Check whether an alternative scenario should have been selected instead.
5. Check whether duplicate/overlapping opportunities are being double-counted.
6. Check whether missing stacking/conflict metadata or bad opportunity data prevents a reliable scenario decision.

Rules:
- Use only the packet below. Do not browse the web.
- Do not invent new source facts.
- If source facts are insufficient, mark the issue as a data gap instead of guessing.
- Keep math comments limited to obvious scenario-level inconsistencies, such as a selected scenario with lower first-year benefit than a listed compatible alternative. Do not verify individual formulas or rate tables.
- Return one JSON object only. No markdown outside JSON.

Return schema:
{
  "schemaVersion": "retrofi_scenario_combination_verification.v1",
  "reviewedBy": "gpt_pro",
  "testCaseId": "",
  "testCaseOrdinal": 30,
  "overallAssessment": "no_issues_found | issues_found | inconclusive_due_to_data_gaps",
  "findings": [
    {
      "retrofitTypeId": "",
      "retrofitDisplayName": "",
      "severity": "high | medium | low",
      "findingType": "invalid_stack | missing_compatible_opportunity | selected_not_optimal | duplicate_or_overlapping_opportunity | missing_required_dependency | excluded_opportunity_should_stay_excluded | no_calculable_scenario_but_should_have_one | data_gap_blocks_verification | no_issue",
      "selectedScenarioId": null,
      "affectedOpportunityIds": [],
      "affectedScenarioIds": [],
      "explanation": "",
      "recommendedRepair": "",
      "needsMathVerificationLater": false
    }
  ],
  "summary": {
    "retrofitsReviewed": 0,
    "highSeverityCount": 0,
    "mediumSeverityCount": 0,
    "lowSeverityCount": 0,
    "noIssueRetrofitCount": 0,
    "dataGapRetrofitCount": 0
  }
}

Packet 30 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 30,
  "sampleUserId": "trees-atlanta-kendeda-treehouse",
  "description": "Atlanta nonprofit urban-forestry campus with office, education, event, operations, and landscape water loads.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "nonprofit"
      ],
      "primaryActivityText": "Urban forestry, education, volunteer operations, nonprofit administration, events, and landscape stewardship",
      "naicsCodes": [
        "813312",
        "611710"
      ],
      "organizationSize": "11-50 employees"
    },
    "site": {
      "address": {
        "raw": "825 Warner Street SW, Suite A, Atlanta, GA 30310, USA",
        "stateCode": "GA",
        "zip5": "30310"
      },
      "geo": {
        "stateCode": "GA",
        "zip5": "30310",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Georgia Power",
          "distributionUtilityId": "UTIL_GEORGIA_POWER",
          "territoryCandidates": [
            "UTIL_GEORGIA_POWER"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "unknown",
      "buildingTypes": [
        "office_admin"
      ],
      "squareFootage": {
        "value": 22000,
        "raw": "22,000",
        "parsingStatus": "parsed"
      }
    },
    "project": {
      "stage": "exploring",
      "alreadyPurchasedEquipment": null,
      "targetStartDate": null
    },
    "completeness": {
      "hasState": true,
      "hasZip": true,
      "hasUtility": true,
      "hasOrganizationType": true,
      "hasBuildingType": true,
      "hasSquareFootage": true
    }
  },
  "statusCounts": {
    "eligible": 13,
    "ineligible": 1506
  },
  "retrofitCount": 25,
  "retrofits": [
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "isPhysicalRetrofit": true,
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 160425,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 22464,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 22464,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 2,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 2
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 160425,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Energy-Efficiency Rebate Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://georgiapowercommercialrebates.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, lighting, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential projects.",
            "Electronically commutated motor matching should not be treated as refrigeration EC motor replacement; the checked HVAC sheet supports ECMs on VAV fan-powered boxes.",
            "EV charger rebates on Georgia Power business pages are separate from the CEEP efficiency opportunity.",
            "Heat-pump water heater is commercial water heating only and does not imply residential HPWH eligibility."
          ],
          "hardRequirements": [
            "Applicant must be an active Georgia Power customer with a commercial-class facility on a Georgia Power commercial tariff.",
            "Qualifying equipment must be measurable and verifiable and meet the applicable 2026 CEEP specifications.",
            "Applications are submitted through the commercial rebate portal with required project documentation.",
            "Prescriptive categories have cost caps, annual building caps and technology-specific requirements.",
            "VFDs and ECM measures are limited to specified HVAC or building-equipment applications."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "business_customer",
            "institutional_customer",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "energy_management_system",
            "building_tune_up",
            "guest_room_energy_management_controls",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "high_efficiency_chiller_retrofit",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "demand_control_ventilation_retrofit",
            "refrigeration_controls_retrofit",
            "commercial_dishwasher",
            "commercial_kitchen_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Georgia]( Power’s CEEP page lists commercial lighting, heating and cooling, food service and grocery, water heaters, building tune-up, envelope and custom categories for commercial-tariff customers.",
          "reasoningNotes": "Retained commercial HVAC, lighting, controls, HPWH and food-service/grocery measures. Recast ECM as HVAC/building equipment rather than refrigeration EC motor because the current HVAC sheet supports VAV-box ECMs."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "TVA EnergyRight",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
            "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
            "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
            "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
          ],
          "hardRequirements": [
            "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
            "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
            "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
            "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
            "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
            "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "tva_direct_served_customers",
            "local_power_company_business_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal",
            "federal",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_ec_motor_retrofit",
            "refrigeration_controls_retrofit",
            "electric_forklift_material_handling",
            "thermal_energy_storage",
            "variable_frequency_drive_retrofit",
            "retro_commissioning_study",
            "efficient_compressed_air_system",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
          "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1271",
          "opportunityName": "Energy-Efficient Commercial Buildings Tax Deduction",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Deduction",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1271/energy-efficient-commercial-buildings-tax-deduction",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone LED lighting is not eligible unless it is part of a certified 179D qualifying interior lighting, whole-building, or retrofit-property savings calculation.",
            "The old partial or interim lighting rule no longer applies after 2022.",
            "Residential single-family projects do not qualify.",
            "Projects beginning construction after June 30, 2026 are not eligible.",
            "This is a federal tax deduction, not a rebate, grant, or financing program."
          ],
          "hardRequirements": [
            "Energy efficient commercial building property or retrofit property must be placed in service by an eligible taxpayer or allocated designer.",
            "Qualifying systems must produce at least 25% energy savings under the applicable modeled or measured pathway.",
            "Retrofit pathway applies to buildings at least five years old and uses measured energy use intensity reduction rules.",
            "Certification, allocation, and tax filing documentation requirements apply.",
            "Higher deduction amounts require prevailing wage and apprenticeship compliance.",
            "Projects whose construction begins after June 30, 2026 are blocked under the current statutory phaseout."
          ],
          "eligibleApplicantTypes": [
            "commercial_building_owner",
            "taxpaying_entity",
            "designer_allocated_by_tax_exempt_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "multifamily",
            "government",
            "nonprofit",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "interior_lighting_systems",
            "hvac_and_hot_water_systems",
            "building_envelope",
            "whole_building_energy_retrofit"
          ],
          "evidenceText": "IRS]( describes 179D for energy efficient commercial building or retrofit property; DOE explains qualifying upgrades must achieve at least 25% savings through modeling or measurement.",
          "reasoningNotes": "The supplied LED match is valid only as interior lighting within a certified 179D project. It should not be treated as a simple LED lighting rebate."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "programName": "TVA - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_saved",
            "unit_count",
            "fixture_type",
            "tons"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fixture_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 60000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_717ca07f7de67dec",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 60000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "programName": "Georgia Power - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "unit_count",
            "tons",
            "horsepower",
            "square_feet",
            "equipment_capacity_btuh",
            "efficiency_rating",
            "eligible_equipment_cost",
            "building_annual_rebate_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "horsepower",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "square_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_btuh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "efficiency_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "building_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_47dc42697711b913",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 9000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 1269000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 1269000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 9000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2511",
          "opportunityName": "USDA - Rural Energy for America Program (REAP) Loan Guarantees",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Guarantee",
          "administrator": "USDA Rural Development",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees",
          "applicationUrl": "https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans",
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, energy_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential-only home retrofits for non-business applicants are not supported.",
            "Non-rural small businesses generally do not qualify unless an agricultural-production exception applies.",
            "Audit costs alone should not be matched as the funded retrofit unless tied to an eligible REAP project.",
            "Loan guarantees should not be treated as rebate incentives."
          ],
          "hardRequirements": [
            "Borrower must be an agricultural producer or rural small business eligible under USDA REAP rules.",
            "Guaranteed loan must finance a renewable energy system, energy-efficiency improvement, or eligible energy-efficient agricultural equipment.",
            "Rural-area requirements apply to small businesses, with specified exceptions for agricultural production.",
            "Energy-efficiency applications must include a qualifying audit or assessment.",
            "Federal debt, tax, judgment, and debarment restrictions apply."
          ],
          "eligibleApplicantTypes": [
            "agricultural_producer",
            "rural_small_business",
            "eligible_lender"
          ],
          "eligibleSectors": [
            "agricultural",
            "commercial",
            "rural_small_business"
          ],
          "eligibleRetrofitCategories": [
            "biomass_renewable_energy_system",
            "anaerobic_digester",
            "geothermal_energy_system",
            "ground_source_geothermal_heat_pump",
            "energy_efficiency_improvements"
          ],
          "evidenceText": "USDA]( REAP guaranteed loans finance renewable energy systems, including biomass and geothermal, and energy-efficiency improvements for agricultural producers and rural small businesses.",
          "reasoningNotes": "The biomass and geothermal matches are source-backed, but matching must enforce agricultural-producer or rural-small-business eligibility and loan-guarantee structure."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1952",
          "opportunityName": "Biomass Sales and Use Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Sales And Use Tax Exemption",
          "administrator": "Georgia Department of Revenue",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1952/biomass-sales-and-use-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state GA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: renewable_energy, solar, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Does not support biomass equipment installation.",
            "Does not support residential biomass appliances.",
            "Do not match general biogas, HVAC, or renewable electricity projects unless the purchase is qualifying biomass material for sold energy production."
          ],
          "hardRequirements": [
            "Biomass material must be used to produce energy in the form of electricity, steam, or both.",
            "The produced energy must be subsequently sold.",
            "Fossil fuels are excluded.",
            "A Georgia Department of Revenue Letter of Authorization is required."
          ],
          "eligibleApplicantTypes": [
            "biomass_material_purchasers",
            "energy_producers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "biomass_materials_for_energy_production"
          ],
          "evidenceText": "Georgia lists a sales and use tax exemption for biomass material used to produce electricity or steam for sale; fossil fuels are excluded.",
          "reasoningNotes": "The original biomass match was too broad. The current source supports a materials exemption, not an equipment or building retrofit incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 798000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 72000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 72000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 2,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 2
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 798000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Energy-Efficiency Rebate Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://georgiapowercommercialrebates.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, lighting, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential projects.",
            "Electronically commutated motor matching should not be treated as refrigeration EC motor replacement; the checked HVAC sheet supports ECMs on VAV fan-powered boxes.",
            "EV charger rebates on Georgia Power business pages are separate from the CEEP efficiency opportunity.",
            "Heat-pump water heater is commercial water heating only and does not imply residential HPWH eligibility."
          ],
          "hardRequirements": [
            "Applicant must be an active Georgia Power customer with a commercial-class facility on a Georgia Power commercial tariff.",
            "Qualifying equipment must be measurable and verifiable and meet the applicable 2026 CEEP specifications.",
            "Applications are submitted through the commercial rebate portal with required project documentation.",
            "Prescriptive categories have cost caps, annual building caps and technology-specific requirements.",
            "VFDs and ECM measures are limited to specified HVAC or building-equipment applications."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "business_customer",
            "institutional_customer",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "energy_management_system",
            "building_tune_up",
            "guest_room_energy_management_controls",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "high_efficiency_chiller_retrofit",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "demand_control_ventilation_retrofit",
            "refrigeration_controls_retrofit",
            "commercial_dishwasher",
            "commercial_kitchen_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Georgia]( Power’s CEEP page lists commercial lighting, heating and cooling, food service and grocery, water heaters, building tune-up, envelope and custom categories for commercial-tariff customers.",
          "reasoningNotes": "Retained commercial HVAC, lighting, controls, HPWH and food-service/grocery measures. Recast ECM as HVAC/building equipment rather than refrigeration EC motor because the current HVAC sheet supports VAV-box ECMs."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "TVA EnergyRight",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
            "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
            "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
            "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
          ],
          "hardRequirements": [
            "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
            "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
            "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
            "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
            "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
            "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "tva_direct_served_customers",
            "local_power_company_business_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal",
            "federal",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_ec_motor_retrofit",
            "refrigeration_controls_retrofit",
            "electric_forklift_material_handling",
            "thermal_energy_storage",
            "variable_frequency_drive_retrofit",
            "retro_commissioning_study",
            "efficient_compressed_air_system",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
          "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "programName": "TVA - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_saved",
            "unit_count",
            "fixture_type",
            "tons"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fixture_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 5000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_717ca07f7de67dec",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 5000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "programName": "Georgia Power - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "unit_count",
            "tons",
            "horsepower",
            "square_feet",
            "equipment_capacity_btuh",
            "efficiency_rating",
            "eligible_equipment_cost",
            "building_annual_rebate_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "horsepower",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "square_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_btuh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "efficiency_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "building_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_47dc42697711b913",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 848000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 0,
        "annualRecurringExpensesCents": 432000,
        "netAnnualRecurringSavingsCents": -432000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 848000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22309",
          "opportunityName": "Georgia Power - Business EV Charger Plus Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Georgia Power",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22309/georgia-power-business-ev-charger-plus-rebate-program",
          "applicationUrl": "https://gpcevchargerplus.customerapplication.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential home charging rebates are separate and should not match this business program.",
            "Mobile or portable connectors, used chargers, and Level 1 chargers are not eligible.",
            "Georgia Power Make Ready support is a separate program boundary and should not be conflated with this rebate."
          ],
          "hardRequirements": [
            "Applicant must be a Georgia Power business customer with an active permanent-service account.",
            "Equipment must be new, Nationally Recognized Testing Laboratory certified, and at least Level 2 208 or 240 volt EVSE.",
            "Installation must use dedicated circuits or breakers and be performed by a licensed electrician or certified electrical worker.",
            "Application must meet timing, documentation, and cap requirements.",
            "Incentive is limited by project, premises, service account, applicant annual cap, and percentage of eligible cost."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "multifamily_property_owners_operators",
            "workplace_site_hosts",
            "fleet_site_hosts"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "multifamily",
            "workplace",
            "fleet"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "Georgia Power's business EV Charger Plus materials support Level 2 and DC fast charging rebates for business customers, with new certified equipment, licensed installation, documentation, and rebate caps.",
          "reasoningNotes": "Original EV categories are correct if narrowed to Level 2 and DC fast charging and kept within Georgia Power business account eligibility."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22309",
          "programName": "Georgia Power - Business EV Charger Plus Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "charger_power_kw",
            "eligible_project_cost",
            "premises_or_service_account",
            "applicant_annual_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "premises_or_service_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicant_annual_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 288000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_44973f07f381a659",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 288000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 3,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 1576000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 112000,
        "annualRecurringExpensesCents": 64800,
        "netAnnualRecurringSavingsCents": 47200,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 1576000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2511",
          "opportunityName": "USDA - Rural Energy for America Program (REAP) Loan Guarantees",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Guarantee",
          "administrator": "USDA Rural Development",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees",
          "applicationUrl": "https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans",
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, energy_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential-only home retrofits for non-business applicants are not supported.",
            "Non-rural small businesses generally do not qualify unless an agricultural-production exception applies.",
            "Audit costs alone should not be matched as the funded retrofit unless tied to an eligible REAP project.",
            "Loan guarantees should not be treated as rebate incentives."
          ],
          "hardRequirements": [
            "Borrower must be an agricultural producer or rural small business eligible under USDA REAP rules.",
            "Guaranteed loan must finance a renewable energy system, energy-efficiency improvement, or eligible energy-efficient agricultural equipment.",
            "Rural-area requirements apply to small businesses, with specified exceptions for agricultural production.",
            "Energy-efficiency applications must include a qualifying audit or assessment.",
            "Federal debt, tax, judgment, and debarment restrictions apply."
          ],
          "eligibleApplicantTypes": [
            "agricultural_producer",
            "rural_small_business",
            "eligible_lender"
          ],
          "eligibleSectors": [
            "agricultural",
            "commercial",
            "rural_small_business"
          ],
          "eligibleRetrofitCategories": [
            "biomass_renewable_energy_system",
            "anaerobic_digester",
            "geothermal_energy_system",
            "ground_source_geothermal_heat_pump",
            "energy_efficiency_improvements"
          ],
          "evidenceText": "USDA]( REAP guaranteed loans finance renewable energy systems, including biomass and geothermal, and energy-efficiency improvements for agricultural producers and rural small businesses.",
          "reasoningNotes": "The biomass and geothermal matches are source-backed, but matching must enforce agricultural-producer or rural-small-business eligibility and loan-guarantee structure."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 7280000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 360000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 360000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 7280000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4177",
          "opportunityName": "Local Option - Special Improvement Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "C Pace Financing",
          "administrator": "Peach State C-PACE / Invest Atlanta / participating Georgia local governments",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4177/local-option-special-improvement-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state GA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: water_efficiency, energy_efficiency, renewable_energy, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not available statewide without local government participation.",
            "Single-family homes and residential dwellings of four units or less are not eligible under the reviewed C-PACE guidelines.",
            "Do not match portable or consumer battery systems; source support is for permanently affixed energy storage or resilience improvements.",
            "This is financing, not a rebate."
          ],
          "hardRequirements": [
            "Property must be in a participating Georgia jurisdiction or special-improvement district.",
            "Property generally must be commercial and not a residential dwelling of four units or less.",
            "Improvements generally must be permanently affixed to the property.",
            "Mortgage holder consent is required.",
            "Energy audit, savings, or feasibility documentation is required under program guidelines.",
            "Project must meet local C-PACE underwriting and lien-to-value limits."
          ],
          "eligibleApplicantTypes": [
            "commercial_property_owners",
            "industrial_property_owners",
            "multifamily_property_owners",
            "nonprofit_property_owners",
            "developers",
            "tenants_with_owner_consent"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "multifamily",
            "nonprofit",
            "mixed_use",
            "hospitality",
            "retail"
          ],
          "eligibleRetrofitCategories": [
            "energy_storage_system",
            "energy_efficiency",
            "renewable_energy",
            "water_conservation",
            "building_resilience",
            "ev_charging_infrastructure",
            "building_electrification",
            "led_lighting_retrofit",
            "hvac",
            "building_envelope",
            "building_controls",
            "insulation",
            "window_replacement",
            "cool_roof",
            "microgrid",
            "backup_power_generation",
            "stormwater_management",
            "flood_mitigation",
            "wind_resistance"
          ],
          "evidenceText": "Invest]( Atlanta's 2025 C-PACE guidelines make energy efficiency, renewable energy, water and resiliency improvements eligible for commercial properties. Resiliency examples include energy storage, microgrids and backup power generation, with local rules applying.",
          "reasoningNotes": "The queued battery match should be narrowed to permanently affixed energy-storage or resiliency financing, not generic battery installation."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 12000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 1605000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 1605000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 12000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 1172000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 80000,
        "annualRecurringExpensesCents": 54000,
        "netAnnualRecurringSavingsCents": 26000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 2,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 2
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 1172000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Energy-Efficiency Rebate Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://georgiapowercommercialrebates.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, lighting, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential projects.",
            "Electronically commutated motor matching should not be treated as refrigeration EC motor replacement; the checked HVAC sheet supports ECMs on VAV fan-powered boxes.",
            "EV charger rebates on Georgia Power business pages are separate from the CEEP efficiency opportunity.",
            "Heat-pump water heater is commercial water heating only and does not imply residential HPWH eligibility."
          ],
          "hardRequirements": [
            "Applicant must be an active Georgia Power customer with a commercial-class facility on a Georgia Power commercial tariff.",
            "Qualifying equipment must be measurable and verifiable and meet the applicable 2026 CEEP specifications.",
            "Applications are submitted through the commercial rebate portal with required project documentation.",
            "Prescriptive categories have cost caps, annual building caps and technology-specific requirements.",
            "VFDs and ECM measures are limited to specified HVAC or building-equipment applications."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "business_customer",
            "institutional_customer",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "energy_management_system",
            "building_tune_up",
            "guest_room_energy_management_controls",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "high_efficiency_chiller_retrofit",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "demand_control_ventilation_retrofit",
            "refrigeration_controls_retrofit",
            "commercial_dishwasher",
            "commercial_kitchen_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Georgia]( Power’s CEEP page lists commercial lighting, heating and cooling, food service and grocery, water heaters, building tune-up, envelope and custom categories for commercial-tariff customers.",
          "reasoningNotes": "Retained commercial HVAC, lighting, controls, HPWH and food-service/grocery measures. Recast ECM as HVAC/building equipment rather than refrigeration EC motor because the current HVAC sheet supports VAV-box ECMs."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "TVA EnergyRight",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
            "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
            "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
            "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
          ],
          "hardRequirements": [
            "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
            "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
            "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
            "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
            "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
            "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "tva_direct_served_customers",
            "local_power_company_business_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal",
            "federal",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_ec_motor_retrofit",
            "refrigeration_controls_retrofit",
            "electric_forklift_material_handling",
            "thermal_energy_storage",
            "variable_frequency_drive_retrofit",
            "retro_commissioning_study",
            "efficient_compressed_air_system",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
          "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "programName": "TVA - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_saved",
            "unit_count",
            "fixture_type",
            "tons"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fixture_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 5000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_717ca07f7de67dec",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 5000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "programName": "Georgia Power - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "unit_count",
            "tons",
            "horsepower",
            "square_feet",
            "equipment_capacity_btuh",
            "efficiency_rating",
            "eligible_equipment_cost",
            "building_annual_rebate_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "horsepower",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "square_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_btuh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "efficiency_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "building_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_47dc42697711b913",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 316000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 81000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 81000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 316000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22509",
          "opportunityName": "Georgia Power - Energy Assistance for Savings & Efficiency (EASE)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "No Cost Direct Install Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22509/georgia-power-energy-assistance-for-savings-and-efficiency-ease",
          "applicationUrl": "https://gpcresidentialease.customerapplication.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Windows and doors are explicitly not replaced.",
            "HVAC replacement is not supported by the residential EASE page; HVAC is limited to servicing or tune-up where approved.",
            "LED lighting, if applicable, is a direct-install measure and should not be generalized to a broad lighting retrofit.",
            "Commercial projects should not match the residential EASE record.",
            "Self-installed work is not supported.",
            "Health and safety conditions or lack of landlord consent can prevent installation."
          ],
          "hardRequirements": [
            "Applicant must be a Georgia Power residential customer.",
            "Household income must be at or below the program income threshold.",
            "Applicant must submit an application and be approved.",
            "An in-home assessment is required before measures are installed.",
            "Program contractor determines and installs eligible no-cost measures.",
            "Renters must provide written landlord consent.",
            "Health and safety issues such as roof leaks, mold, faulty wiring, or gas leaks may need correction before service.",
            "Total measure value is subject to program cap."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_residential_customers",
            "homeowners",
            "renters_with_landlord_consent"
          ],
          "eligibleSectors": [
            "residential",
            "single_family",
            "manufactured_home"
          ],
          "eligibleRetrofitCategories": [
            "attic_insulation_upgrade",
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "hvac_servicing_tune_up",
            "smart_thermostat",
            "water_saving_devices",
            "air_purifier",
            "smart_power_strip",
            "direct_install_led_lighting"
          ],
          "evidenceText": "Georgia Power EASE is a no-cost program for income-qualified Georgia Power residential customers. It requires application approval and an in-home assessment; approved measures include attic insulation, air sealing, duct sealing, and HVAC servicing, and the FAQ says windows and doors are not replaced.",
          "reasoningNotes": "Kept insulation and duct sealing. Narrowed lighting to direct-install and HVAC to servicing, not replacement. Added explicit window and door blockers."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5244",
          "opportunityName": "Satilla REMC - HomePlus Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Satilla REMC",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5244/satilla-remc-homeplus-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a loan program, not a rebate or grant.",
            "Commercial and industrial applicants are not supported by the HomePlus residential loan page.",
            "Generators, roofs, windows, and HVAC are separate financed item types and should not broaden weatherization matching."
          ],
          "hardRequirements": [
            "Applicant must be a Satilla REMC member or otherwise meet program homeowner qualifications.",
            "Project must pass Satilla REMC prescreening where required.",
            "Financing must be approved through Go Energy Financial Credit Union or the current program lender.",
            "Work must use eligible improvements and program processes."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner",
            "member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade"
          ],
          "evidenceText": "Satilla]( REMC says HomePlus loans finance energy-efficient home improvements, including insulation and weatherization, subject to EMC prescreening and loan approval.",
          "reasoningNotes": "The matched insulation and weatherization categories are supported, but should be treated as financed residential measures only."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22509",
          "programName": "Georgia Power - Energy Assistance for Savings & Efficiency (EASE)",
          "calculationStatus": "non_monetary_workflow",
          "runtimeInclusionStatus": "non_monetary_workflow",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "georgia_power_residential_account",
            "income_qualified_approval",
            "in_home_assessment",
            "approved_measure_package",
            "landlord_consent_if_renter",
            "health_and_safety_clearance",
            "approval_status",
            "assessment_selected_measures"
          ],
          "defaultedInputs": [
            {
              "inputKey": "georgia_power_residential_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "income_qualified_approval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "in_home_assessment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_measure_package",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "landlord_consent_if_renter",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "health_and_safety_clearance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "assessment_selected_measures",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_process_value_1_472e02d28947ad52",
              "effectType": "process_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "non_cash_process_value",
              "cashValueClassification": "non_cash",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "level_2_ev_charger_installation",
      "displayName": "Level 2 EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 848000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 0,
        "annualRecurringExpensesCents": 432000,
        "netAnnualRecurringSavingsCents": -432000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 848000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22309",
          "opportunityName": "Georgia Power - Business EV Charger Plus Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Georgia Power",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22309/georgia-power-business-ev-charger-plus-rebate-program",
          "applicationUrl": "https://gpcevchargerplus.customerapplication.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential home charging rebates are separate and should not match this business program.",
            "Mobile or portable connectors, used chargers, and Level 1 chargers are not eligible.",
            "Georgia Power Make Ready support is a separate program boundary and should not be conflated with this rebate."
          ],
          "hardRequirements": [
            "Applicant must be a Georgia Power business customer with an active permanent-service account.",
            "Equipment must be new, Nationally Recognized Testing Laboratory certified, and at least Level 2 208 or 240 volt EVSE.",
            "Installation must use dedicated circuits or breakers and be performed by a licensed electrician or certified electrical worker.",
            "Application must meet timing, documentation, and cap requirements.",
            "Incentive is limited by project, premises, service account, applicant annual cap, and percentage of eligible cost."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "multifamily_property_owners_operators",
            "workplace_site_hosts",
            "fleet_site_hosts"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "multifamily",
            "workplace",
            "fleet"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "Georgia Power's business EV Charger Plus materials support Level 2 and DC fast charging rebates for business customers, with new certified equipment, licensed installation, documentation, and rebate caps.",
          "reasoningNotes": "Original EV categories are correct if narrowed to Level 2 and DC fast charging and kept within Georgia Power business account eligibility."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22309",
          "programName": "Georgia Power - Business EV Charger Plus Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "charger_power_kw",
            "eligible_project_cost",
            "premises_or_service_account",
            "applicant_annual_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "premises_or_service_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicant_annual_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 288000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_44973f07f381a659",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 288000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "refrigeration_ec_motor_retrofit",
      "displayName": "Refrigeration EC motor retrofit",
      "parentCategory": "refrigeration",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 116400,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 63072,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 63072,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 116400,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "TVA EnergyRight",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
            "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
            "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
            "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
          ],
          "hardRequirements": [
            "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
            "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
            "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
            "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
            "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
            "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "tva_direct_served_customers",
            "local_power_company_business_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal",
            "federal",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_ec_motor_retrofit",
            "refrigeration_controls_retrofit",
            "electric_forklift_material_handling",
            "thermal_energy_storage",
            "variable_frequency_drive_retrofit",
            "retro_commissioning_study",
            "efficient_compressed_air_system",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
          "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "programName": "TVA - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_saved",
            "unit_count",
            "fixture_type",
            "tons"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fixture_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 5000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_717ca07f7de67dec",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 5000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 680000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 104000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 104000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 680000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "thermal_energy_storage",
      "displayName": "Thermal energy storage",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 5510000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 324000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 324000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 5510000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "TVA EnergyRight",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
            "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
            "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
            "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
          ],
          "hardRequirements": [
            "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
            "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
            "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
            "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
            "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
            "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "tva_direct_served_customers",
            "local_power_company_business_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal",
            "federal",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_ec_motor_retrofit",
            "refrigeration_controls_retrofit",
            "electric_forklift_material_handling",
            "thermal_energy_storage",
            "variable_frequency_drive_retrofit",
            "retro_commissioning_study",
            "efficient_compressed_air_system",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
          "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "programName": "TVA - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_saved",
            "unit_count",
            "fixture_type",
            "tons"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "annual_kwh_saved",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fixture_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 5000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_717ca07f7de67dec",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 5000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 194600,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 54000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 54000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 194600,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5244",
          "opportunityName": "Satilla REMC - HomePlus Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Satilla REMC",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5244/satilla-remc-homeplus-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a loan program, not a rebate or grant.",
            "Commercial and industrial applicants are not supported by the HomePlus residential loan page.",
            "Generators, roofs, windows, and HVAC are separate financed item types and should not broaden weatherization matching."
          ],
          "hardRequirements": [
            "Applicant must be a Satilla REMC member or otherwise meet program homeowner qualifications.",
            "Project must pass Satilla REMC prescreening where required.",
            "Financing must be approved through Go Energy Financial Credit Union or the current program lender.",
            "Work must use eligible improvements and program processes."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner",
            "member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade"
          ],
          "evidenceText": "Satilla]( REMC says HomePlus loans finance energy-efficient home improvements, including insulation and weatherization, subject to EMC prescreening and loan approval.",
          "reasoningNotes": "The matched insulation and weatherization categories are supported, but should be treated as financed residential measures only."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "dc_fast_charger_installation",
      "displayName": "DC fast charger installation",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 4140000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 0,
        "annualRecurringExpensesCents": 1728000,
        "netAnnualRecurringSavingsCents": -1728000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 4140000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22309",
          "opportunityName": "Georgia Power - Business EV Charger Plus Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Georgia Power",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22309/georgia-power-business-ev-charger-plus-rebate-program",
          "applicationUrl": "https://gpcevchargerplus.customerapplication.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential home charging rebates are separate and should not match this business program.",
            "Mobile or portable connectors, used chargers, and Level 1 chargers are not eligible.",
            "Georgia Power Make Ready support is a separate program boundary and should not be conflated with this rebate."
          ],
          "hardRequirements": [
            "Applicant must be a Georgia Power business customer with an active permanent-service account.",
            "Equipment must be new, Nationally Recognized Testing Laboratory certified, and at least Level 2 208 or 240 volt EVSE.",
            "Installation must use dedicated circuits or breakers and be performed by a licensed electrician or certified electrical worker.",
            "Application must meet timing, documentation, and cap requirements.",
            "Incentive is limited by project, premises, service account, applicant annual cap, and percentage of eligible cost."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "multifamily_property_owners_operators",
            "workplace_site_hosts",
            "fleet_site_hosts"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "multifamily",
            "workplace",
            "fleet"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "Georgia Power's business EV Charger Plus materials support Level 2 and DC fast charging rebates for business customers, with new certified equipment, licensed installation, documentation, and rebate caps.",
          "reasoningNotes": "Original EV categories are correct if narrowed to Level 2 and DC fast charging and kept within Georgia Power business account eligibility."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22309",
          "programName": "Georgia Power - Business EV Charger Plus Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "charger_power_kw",
            "eligible_project_cost",
            "premises_or_service_account",
            "applicant_annual_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "premises_or_service_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicant_annual_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1500000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_44973f07f381a659",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 1500000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "duct_sealing_and_insulation",
      "displayName": "Duct sealing and duct insulation",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 147200,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 50400,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 50400,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 147200,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22509",
          "opportunityName": "Georgia Power - Energy Assistance for Savings & Efficiency (EASE)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "No Cost Direct Install Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22509/georgia-power-energy-assistance-for-savings-and-efficiency-ease",
          "applicationUrl": "https://gpcresidentialease.customerapplication.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Windows and doors are explicitly not replaced.",
            "HVAC replacement is not supported by the residential EASE page; HVAC is limited to servicing or tune-up where approved.",
            "LED lighting, if applicable, is a direct-install measure and should not be generalized to a broad lighting retrofit.",
            "Commercial projects should not match the residential EASE record.",
            "Self-installed work is not supported.",
            "Health and safety conditions or lack of landlord consent can prevent installation."
          ],
          "hardRequirements": [
            "Applicant must be a Georgia Power residential customer.",
            "Household income must be at or below the program income threshold.",
            "Applicant must submit an application and be approved.",
            "An in-home assessment is required before measures are installed.",
            "Program contractor determines and installs eligible no-cost measures.",
            "Renters must provide written landlord consent.",
            "Health and safety issues such as roof leaks, mold, faulty wiring, or gas leaks may need correction before service.",
            "Total measure value is subject to program cap."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_residential_customers",
            "homeowners",
            "renters_with_landlord_consent"
          ],
          "eligibleSectors": [
            "residential",
            "single_family",
            "manufactured_home"
          ],
          "eligibleRetrofitCategories": [
            "attic_insulation_upgrade",
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "hvac_servicing_tune_up",
            "smart_thermostat",
            "water_saving_devices",
            "air_purifier",
            "smart_power_strip",
            "direct_install_led_lighting"
          ],
          "evidenceText": "Georgia Power EASE is a no-cost program for income-qualified Georgia Power residential customers. It requires application approval and an in-home assessment; approved measures include attic insulation, air sealing, duct sealing, and HVAC servicing, and the FAQ says windows and doors are not replaced.",
          "reasoningNotes": "Kept insulation and duct sealing. Narrowed lighting to direct-install and HVAC to servicing, not replacement. Added explicit window and door blockers."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22509",
          "programName": "Georgia Power - Energy Assistance for Savings & Efficiency (EASE)",
          "calculationStatus": "non_monetary_workflow",
          "runtimeInclusionStatus": "non_monetary_workflow",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "georgia_power_residential_account",
            "income_qualified_approval",
            "in_home_assessment",
            "approved_measure_package",
            "landlord_consent_if_renter",
            "health_and_safety_clearance",
            "approval_status",
            "assessment_selected_measures"
          ],
          "defaultedInputs": [
            {
              "inputKey": "georgia_power_residential_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "income_qualified_approval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "in_home_assessment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_measure_package",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "landlord_consent_if_renter",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "health_and_safety_clearance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "assessment_selected_measures",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_process_value_1_472e02d28947ad52",
              "effectType": "process_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "non_cash_process_value",
              "cashValueClassification": "non_cash",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "electric_forklift_material_handling",
      "displayName": "Electric forklift / material handling equipment",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 3200000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 800000,
        "annualRecurringExpensesCents": 129600,
        "netAnnualRecurringSavingsCents": 670400,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 3200000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "TVA EnergyRight",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
            "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
            "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
            "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
          ],
          "hardRequirements": [
            "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
            "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
            "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
            "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
            "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
            "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "tva_direct_served_customers",
            "local_power_company_business_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal",
            "federal",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_ec_motor_retrofit",
            "refrigeration_controls_retrofit",
            "electric_forklift_material_handling",
            "thermal_energy_storage",
            "variable_frequency_drive_retrofit",
            "retro_commissioning_study",
            "efficient_compressed_air_system",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
          "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "programName": "TVA - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_saved",
            "unit_count",
            "fixture_type",
            "tons"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fixture_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 10000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_717ca07f7de67dec",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 10000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "energy_management_system",
      "displayName": "Energy management system",
      "parentCategory": "building_controls_energy_management",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 254400,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 216000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 216000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 254400,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Energy-Efficiency Rebate Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://georgiapowercommercialrebates.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, lighting, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential projects.",
            "Electronically commutated motor matching should not be treated as refrigeration EC motor replacement; the checked HVAC sheet supports ECMs on VAV fan-powered boxes.",
            "EV charger rebates on Georgia Power business pages are separate from the CEEP efficiency opportunity.",
            "Heat-pump water heater is commercial water heating only and does not imply residential HPWH eligibility."
          ],
          "hardRequirements": [
            "Applicant must be an active Georgia Power customer with a commercial-class facility on a Georgia Power commercial tariff.",
            "Qualifying equipment must be measurable and verifiable and meet the applicable 2026 CEEP specifications.",
            "Applications are submitted through the commercial rebate portal with required project documentation.",
            "Prescriptive categories have cost caps, annual building caps and technology-specific requirements.",
            "VFDs and ECM measures are limited to specified HVAC or building-equipment applications."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "business_customer",
            "institutional_customer",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "energy_management_system",
            "building_tune_up",
            "guest_room_energy_management_controls",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "high_efficiency_chiller_retrofit",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "demand_control_ventilation_retrofit",
            "refrigeration_controls_retrofit",
            "commercial_dishwasher",
            "commercial_kitchen_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Georgia]( Power’s CEEP page lists commercial lighting, heating and cooling, food service and grocery, water heaters, building tune-up, envelope and custom categories for commercial-tariff customers.",
          "reasoningNotes": "Retained commercial HVAC, lighting, controls, HPWH and food-service/grocery measures. Recast ECM as HVAC/building equipment rather than refrigeration EC motor because the current HVAC sheet supports VAV-box ECMs."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "programName": "Georgia Power - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "unit_count",
            "tons",
            "horsepower",
            "square_feet",
            "equipment_capacity_btuh",
            "efficiency_rating",
            "eligible_equipment_cost",
            "building_annual_rebate_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "horsepower",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "square_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_btuh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "efficiency_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "building_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_47dc42697711b913",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "heat_pump_water_heater",
      "displayName": "Heat pump water heater",
      "parentCategory": "water_heating",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 350000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 48000,
        "annualRecurringExpensesCents": 25200,
        "netAnnualRecurringSavingsCents": 22800,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 350000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Energy-Efficiency Rebate Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://georgiapowercommercialrebates.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, lighting, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential projects.",
            "Electronically commutated motor matching should not be treated as refrigeration EC motor replacement; the checked HVAC sheet supports ECMs on VAV fan-powered boxes.",
            "EV charger rebates on Georgia Power business pages are separate from the CEEP efficiency opportunity.",
            "Heat-pump water heater is commercial water heating only and does not imply residential HPWH eligibility."
          ],
          "hardRequirements": [
            "Applicant must be an active Georgia Power customer with a commercial-class facility on a Georgia Power commercial tariff.",
            "Qualifying equipment must be measurable and verifiable and meet the applicable 2026 CEEP specifications.",
            "Applications are submitted through the commercial rebate portal with required project documentation.",
            "Prescriptive categories have cost caps, annual building caps and technology-specific requirements.",
            "VFDs and ECM measures are limited to specified HVAC or building-equipment applications."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "business_customer",
            "institutional_customer",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "energy_management_system",
            "building_tune_up",
            "guest_room_energy_management_controls",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "high_efficiency_chiller_retrofit",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "demand_control_ventilation_retrofit",
            "refrigeration_controls_retrofit",
            "commercial_dishwasher",
            "commercial_kitchen_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Georgia]( Power’s CEEP page lists commercial lighting, heating and cooling, food service and grocery, water heaters, building tune-up, envelope and custom categories for commercial-tariff customers.",
          "reasoningNotes": "Retained commercial HVAC, lighting, controls, HPWH and food-service/grocery measures. Recast ECM as HVAC/building equipment rather than refrigeration EC motor because the current HVAC sheet supports VAV-box ECMs."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "programName": "Georgia Power - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "unit_count",
            "tons",
            "horsepower",
            "square_feet",
            "equipment_capacity_btuh",
            "efficiency_rating",
            "eligible_equipment_cost",
            "building_annual_rebate_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "horsepower",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "square_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_btuh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "efficiency_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "building_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_47dc42697711b913",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_refrigeration_equipment",
      "displayName": "High-efficiency refrigeration equipment",
      "parentCategory": "refrigeration",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 345000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 108000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 108000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 345000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "TVA EnergyRight",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
            "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
            "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
            "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
          ],
          "hardRequirements": [
            "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
            "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
            "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
            "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
            "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
            "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "tva_direct_served_customers",
            "local_power_company_business_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal",
            "federal",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_ec_motor_retrofit",
            "refrigeration_controls_retrofit",
            "electric_forklift_material_handling",
            "thermal_energy_storage",
            "variable_frequency_drive_retrofit",
            "retro_commissioning_study",
            "efficient_compressed_air_system",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
          "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "programName": "TVA - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_saved",
            "unit_count",
            "fixture_type",
            "tons"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fixture_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 5000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_717ca07f7de67dec",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 5000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "lighting_controls_retrofit",
      "displayName": "Lighting controls retrofit",
      "parentCategory": "lighting",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 132200,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 57600,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 57600,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 132200,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Energy-Efficiency Rebate Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://georgiapowercommercialrebates.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, lighting, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential projects.",
            "Electronically commutated motor matching should not be treated as refrigeration EC motor replacement; the checked HVAC sheet supports ECMs on VAV fan-powered boxes.",
            "EV charger rebates on Georgia Power business pages are separate from the CEEP efficiency opportunity.",
            "Heat-pump water heater is commercial water heating only and does not imply residential HPWH eligibility."
          ],
          "hardRequirements": [
            "Applicant must be an active Georgia Power customer with a commercial-class facility on a Georgia Power commercial tariff.",
            "Qualifying equipment must be measurable and verifiable and meet the applicable 2026 CEEP specifications.",
            "Applications are submitted through the commercial rebate portal with required project documentation.",
            "Prescriptive categories have cost caps, annual building caps and technology-specific requirements.",
            "VFDs and ECM measures are limited to specified HVAC or building-equipment applications."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "business_customer",
            "institutional_customer",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "energy_management_system",
            "building_tune_up",
            "guest_room_energy_management_controls",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "high_efficiency_chiller_retrofit",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "demand_control_ventilation_retrofit",
            "refrigeration_controls_retrofit",
            "commercial_dishwasher",
            "commercial_kitchen_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Georgia]( Power’s CEEP page lists commercial lighting, heating and cooling, food service and grocery, water heaters, building tune-up, envelope and custom categories for commercial-tariff customers.",
          "reasoningNotes": "Retained commercial HVAC, lighting, controls, HPWH and food-service/grocery measures. Recast ECM as HVAC/building equipment rather than refrigeration EC motor because the current HVAC sheet supports VAV-box ECMs."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "programName": "Georgia Power - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "unit_count",
            "tons",
            "horsepower",
            "square_feet",
            "equipment_capacity_btuh",
            "efficiency_rating",
            "eligible_equipment_cost",
            "building_annual_rebate_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "horsepower",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "square_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_btuh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "efficiency_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "building_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_47dc42697711b913",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "microgrid_system",
      "displayName": "Microgrid system",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 10920000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 450000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 450000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 10920000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "retro_commissioning_study",
      "displayName": "Retro-commissioning study",
      "parentCategory": "audits_studies_planning",
      "isPhysicalRetrofit": false,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 91800,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 180000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 180000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 91800,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "TVA EnergyRight",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
            "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
            "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
            "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
          ],
          "hardRequirements": [
            "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
            "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
            "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
            "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
            "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
            "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "tva_direct_served_customers",
            "local_power_company_business_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal",
            "federal",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_ec_motor_retrofit",
            "refrigeration_controls_retrofit",
            "electric_forklift_material_handling",
            "thermal_energy_storage",
            "variable_frequency_drive_retrofit",
            "retro_commissioning_study",
            "efficient_compressed_air_system",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
          "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
          "programName": "TVA - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_saved",
            "unit_count",
            "fixture_type",
            "tons"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fixture_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 5000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_717ca07f7de67dec",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 5000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "small_wind_turbine",
      "displayName": "Small wind turbine",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 8000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 846000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 846000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 8000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "smart_thermostat_zoning_retrofit",
      "displayName": "Smart thermostat / zoning retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 100600,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 45000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 45000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 100600,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Energy-Efficiency Rebate Program",
          "administrator": "Georgia Power Company",
          "state": "GA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://georgiapowercommercialrebates.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state GA matches opportunity geography.",
            "Self-reported utility matches Georgia Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, lighting, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential projects.",
            "Electronically commutated motor matching should not be treated as refrigeration EC motor replacement; the checked HVAC sheet supports ECMs on VAV fan-powered boxes.",
            "EV charger rebates on Georgia Power business pages are separate from the CEEP efficiency opportunity.",
            "Heat-pump water heater is commercial water heating only and does not imply residential HPWH eligibility."
          ],
          "hardRequirements": [
            "Applicant must be an active Georgia Power customer with a commercial-class facility on a Georgia Power commercial tariff.",
            "Qualifying equipment must be measurable and verifiable and meet the applicable 2026 CEEP specifications.",
            "Applications are submitted through the commercial rebate portal with required project documentation.",
            "Prescriptive categories have cost caps, annual building caps and technology-specific requirements.",
            "VFDs and ECM measures are limited to specified HVAC or building-equipment applications."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "business_customer",
            "institutional_customer",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "energy_management_system",
            "building_tune_up",
            "guest_room_energy_management_controls",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "high_efficiency_chiller_retrofit",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "demand_control_ventilation_retrofit",
            "refrigeration_controls_retrofit",
            "commercial_dishwasher",
            "commercial_kitchen_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Georgia]( Power’s CEEP page lists commercial lighting, heating and cooling, food service and grocery, water heaters, building tune-up, envelope and custom categories for commercial-tariff customers.",
          "reasoningNotes": "Retained commercial HVAC, lighting, controls, HPWH and food-service/grocery measures. Recast ECM as HVAC/building equipment rather than refrigeration EC motor because the current HVAC sheet supports VAV-box ECMs."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
          "programName": "Georgia Power - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "unit_count",
            "tons",
            "horsepower",
            "square_feet",
            "equipment_capacity_btuh",
            "efficiency_rating",
            "eligible_equipment_cost",
            "building_annual_rebate_total"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "horsepower",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "square_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_btuh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "efficiency_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "building_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_47dc42697711b913",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    }
  ]
}
