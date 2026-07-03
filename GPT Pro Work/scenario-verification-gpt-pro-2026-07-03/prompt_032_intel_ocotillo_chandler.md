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
  "testCaseOrdinal": 32,
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

Packet 32 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 32,
  "sampleUserId": "intel-ocotillo-chandler",
  "description": "Semiconductor fabrication campus in SRP territory with cleanroom, process cooling, water, and large-load constraints.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "industrial"
      ],
      "primaryActivityText": "Semiconductor wafer fabrication, cleanroom manufacturing, process utilities, R&D, and campus operations",
      "naicsCodes": [
        "334413"
      ],
      "organizationSize": "1,000+ employees"
    },
    "site": {
      "address": {
        "raw": "4500 S Dobson Road, Chandler, AZ 85248, USA",
        "stateCode": "AZ",
        "zip5": "85248"
      },
      "geo": {
        "stateCode": "AZ",
        "zip5": "85248",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Salt River Project",
          "distributionUtilityId": "UTIL_SRP",
          "territoryCandidates": [
            "UTIL_SRP"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "industrial_manufacturing"
      ],
      "squareFootage": {
        "value": null,
        "raw": "Unknown",
        "parsingStatus": "needs_validation"
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
      "hasSquareFootage": false
    }
  },
  "statusCounts": {
    "eligible": 9,
    "ineligible": 1510
  },
  "retrofitCount": 18,
  "retrofits": [
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5313",
          "opportunityName": "USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Loan Guarantee",
          "administrator": "USDA Rural Development",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program",
          "applicationUrl": "https://www.rd.usda.gov/programs-services/energy-programs/biorefinery-renewable-chemical-and-biobased-product-manufacturing-program",
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone engineering feasibility studies are not a source-backed retrofit category for this opportunity.",
            "Small building biomass boilers or generic biomass energy systems should not match unless part of an eligible commercial-scale biorefinery or manufacturing facility.",
            "This is not a rebate program for building energy equipment."
          ],
          "hardRequirements": [
            "Assistance is provided through USDA loan guarantees, with an eligible lender as applicant.",
            "Project must develop, construct, or retrofit a commercial-scale biorefinery or qualifying renewable chemical or biobased product manufacturing facility.",
            "Applications follow USDA phase and deadline requirements.",
            "Eligible technology, equity, lender, borrower, and federal-loan-guarantee requirements apply."
          ],
          "eligibleApplicantTypes": [
            "eligible_lender",
            "business",
            "cooperative",
            "tribal_government",
            "state_government",
            "local_government",
            "public_power_entity",
            "higher_education_institution",
            "national_laboratory",
            "agricultural_producer_association"
          ],
          "eligibleSectors": [
            "agricultural",
            "industrial",
            "manufacturing",
            "public",
            "tribal",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "commercial_scale_biorefinery",
            "advanced_biofuel_production_facility",
            "renewable_chemical_production_facility",
            "biobased_product_manufacturing_equipment"
          ],
          "evidenceText": "USDA]( describes loan guarantees for developing, constructing, and retrofitting commercial-scale biorefineries and biobased product manufacturing facilities.",
          "reasoningNotes": "The biomass match is valid only for qualifying commercial-scale production or manufacturing facilities. The feasibility-study match should be blocked as a standalone category."
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1683",
          "opportunityName": "Energy Equipment Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Arizona Department of Revenue and county assessors",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.83,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1683/energy-equipment-property-tax-exemption",
          "applicationUrl": "https://azdor.gov/forms/property-tax-forms/renewable-energy-equipment-ty2027-property-tax-form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state AZ matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope, renewable_energy, biomass_biogas, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic window replacement unless the component independently meets the statutory energy-efficient building component standard.",
            "Do not match standalone battery storage; storage was not verified as a separate eligible category in the reviewed official sources.",
            "This is property tax treatment, not an upfront rebate."
          ],
          "hardRequirements": [
            "Property owner must provide required documentation and cost information to the county assessor.",
            "Renewable energy equipment must use qualifying resources and generally produce energy primarily for on-site consumption.",
            "Energy efficient building components must meet statutory efficiency thresholds, such as Energy Star, LEED, equivalent, or specified code savings.",
            "Combined heat and power must produce power plus useful thermal output under the statutory definition."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "taxpayer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "biomass_biogas_energy_system",
            "combined_heat_and_power_system",
            "geothermal_energy_system",
            "solar_energy_system",
            "wind_energy_system",
            "low_impact_hydropower_system",
            "energy_efficient_building_components"
          ],
          "evidenceText": "Arizona]( statute treats renewable energy equipment, CHP, and qualifying energy-efficient building components as adding no property value when documentation is provided.",
          "reasoningNotes": "Biomass, geothermal, CHP, and broader renewable systems are valid. Window matching must be narrowed to qualifying energy-efficient building components, not ordinary window replacement."
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
            "Applicant type overlaps eligible sector: industrial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1683",
          "opportunityName": "Energy Equipment Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Arizona Department of Revenue and county assessors",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.83,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1683/energy-equipment-property-tax-exemption",
          "applicationUrl": "https://azdor.gov/forms/property-tax-forms/renewable-energy-equipment-ty2027-property-tax-form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state AZ matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope, renewable_energy, biomass_biogas, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic window replacement unless the component independently meets the statutory energy-efficient building component standard.",
            "Do not match standalone battery storage; storage was not verified as a separate eligible category in the reviewed official sources.",
            "This is property tax treatment, not an upfront rebate."
          ],
          "hardRequirements": [
            "Property owner must provide required documentation and cost information to the county assessor.",
            "Renewable energy equipment must use qualifying resources and generally produce energy primarily for on-site consumption.",
            "Energy efficient building components must meet statutory efficiency thresholds, such as Energy Star, LEED, equivalent, or specified code savings.",
            "Combined heat and power must produce power plus useful thermal output under the statutory definition."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "taxpayer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "biomass_biogas_energy_system",
            "combined_heat_and_power_system",
            "geothermal_energy_system",
            "solar_energy_system",
            "wind_energy_system",
            "low_impact_hydropower_system",
            "energy_efficient_building_components"
          ],
          "evidenceText": "Arizona]( statute treats renewable energy equipment, CHP, and qualifying energy-efficient building components as adding no property value when documentation is provided.",
          "reasoningNotes": "Biomass, geothermal, CHP, and broader renewable systems are valid. Window matching must be narrowed to qualifying energy-efficient building components, not ordinary window replacement."
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
            "Applicant type overlaps eligible sector: industrial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1683",
          "opportunityName": "Energy Equipment Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Arizona Department of Revenue and county assessors",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.83,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1683/energy-equipment-property-tax-exemption",
          "applicationUrl": "https://azdor.gov/forms/property-tax-forms/renewable-energy-equipment-ty2027-property-tax-form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state AZ matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope, renewable_energy, biomass_biogas, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic window replacement unless the component independently meets the statutory energy-efficient building component standard.",
            "Do not match standalone battery storage; storage was not verified as a separate eligible category in the reviewed official sources.",
            "This is property tax treatment, not an upfront rebate."
          ],
          "hardRequirements": [
            "Property owner must provide required documentation and cost information to the county assessor.",
            "Renewable energy equipment must use qualifying resources and generally produce energy primarily for on-site consumption.",
            "Energy efficient building components must meet statutory efficiency thresholds, such as Energy Star, LEED, equivalent, or specified code savings.",
            "Combined heat and power must produce power plus useful thermal output under the statutory definition."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "taxpayer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "biomass_biogas_energy_system",
            "combined_heat_and_power_system",
            "geothermal_energy_system",
            "solar_energy_system",
            "wind_energy_system",
            "low_impact_hydropower_system",
            "energy_efficient_building_components"
          ],
          "evidenceText": "Arizona]( statute treats renewable energy equipment, CHP, and qualifying energy-efficient building components as adding no property value when documentation is provided.",
          "reasoningNotes": "Biomass, geothermal, CHP, and broader renewable systems are valid. Window matching must be narrowed to qualifying energy-efficient building components, not ordinary window replacement."
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
            "Applicant type overlaps eligible sector: industrial.",
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
      "opportunityCount": 2,
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
            "Applicant type overlaps eligible sector: industrial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
            "Applicant type overlaps eligible sector: industrial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 5000000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 3000000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:119",
          "opportunityName": "Solar and Wind Equipment Sales Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Sales Tax Incentive",
          "administrator": "Arizona Department of Revenue",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/119/solar-and-wind-equipment-sales-tax-exemption",
          "applicationUrl": "https://azdor.gov/sites/default/files/2023-03/FORM_TPT_10447_f_0.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state AZ matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_controls, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Submetering or energy monitoring is not a supported retrofit category unless it is integral to a qualifying solar energy device.",
            "Standalone metering, monitoring, storage, and non-solar controls do not qualify under this program match.",
            "Current official solar-device sources do not support a standalone wind-equipment match for this Arizona sales-tax deduction."
          ],
          "hardRequirements": [
            "Retailer or lessor must register with the Arizona Department of Revenue as a solar energy retailer or lessor.",
            "Sale or lease must be of a qualifying solar energy device under Arizona law.",
            "Retailer must maintain records supporting the deduction from the tax base."
          ],
          "eligibleApplicantTypes": [
            "registered_solar_energy_retailer",
            "registered_solar_energy_lessor",
            "purchaser"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "solar_space_heating_system",
            "solar_daylighting_system"
          ],
          "evidenceText": "Arizona]( law deducts amounts received from sales of solar energy devices from the retail tax base and requires the retailer to register as a solar energy retailer.",
          "reasoningNotes": "Keep solar thermal and solar electric categories. Remove the submetering match because the source supports solar devices, not general energy monitoring systems."
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
            "Applicant type overlaps eligible sector: industrial.",
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
      "retrofitTypeId": "automated_demand_response_controls",
      "displayName": "Automated demand response controls",
      "parentCategory": "building_controls_energy_management",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 212000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 270000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 270000,
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
          "upfrontCostAfterSavingsCents": 212000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "engineering_feasibility_study",
      "displayName": "Engineering feasibility study",
      "parentCategory": "audits_studies_planning",
      "isPhysicalRetrofit": false,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported",
        "unsupportedReason": "This matched item is an audit, study, certification, or compliance task. It needs a resulting modeled savings input before RetroFi can calculate monthly savings.",
        "upfrontCostCents": null,
        "oneTimeSavingsCents": null,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": null,
        "annualRecurringExpensesCents": null,
        "netAnnualRecurringSavingsCents": null,
        "incentiveCalculationPackageCounts": null
      },
      "scenarios": [],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5313",
          "opportunityName": "USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Loan Guarantee",
          "administrator": "USDA Rural Development",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program",
          "applicationUrl": "https://www.rd.usda.gov/programs-services/energy-programs/biorefinery-renewable-chemical-and-biobased-product-manufacturing-program",
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone engineering feasibility studies are not a source-backed retrofit category for this opportunity.",
            "Small building biomass boilers or generic biomass energy systems should not match unless part of an eligible commercial-scale biorefinery or manufacturing facility.",
            "This is not a rebate program for building energy equipment."
          ],
          "hardRequirements": [
            "Assistance is provided through USDA loan guarantees, with an eligible lender as applicant.",
            "Project must develop, construct, or retrofit a commercial-scale biorefinery or qualifying renewable chemical or biobased product manufacturing facility.",
            "Applications follow USDA phase and deadline requirements.",
            "Eligible technology, equity, lender, borrower, and federal-loan-guarantee requirements apply."
          ],
          "eligibleApplicantTypes": [
            "eligible_lender",
            "business",
            "cooperative",
            "tribal_government",
            "state_government",
            "local_government",
            "public_power_entity",
            "higher_education_institution",
            "national_laboratory",
            "agricultural_producer_association"
          ],
          "eligibleSectors": [
            "agricultural",
            "industrial",
            "manufacturing",
            "public",
            "tribal",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "commercial_scale_biorefinery",
            "advanced_biofuel_production_facility",
            "renewable_chemical_production_facility",
            "biobased_product_manufacturing_equipment"
          ],
          "evidenceText": "USDA]( describes loan guarantees for developing, constructing, and retrofitting commercial-scale biorefineries and biobased product manufacturing facilities.",
          "reasoningNotes": "The biomass match is valid only for qualifying commercial-scale production or manufacturing facilities. The feasibility-study match should be blocked as a standalone category."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
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
            "Applicant type overlaps eligible sector: industrial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Incentive Program",
          "administrator": "Salt River Project",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state AZ matches opportunity geography.",
            "Self-reported utility matches Salt River Project.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential measures should not match this business opportunity.",
            "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
            "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
          ],
          "hardRequirements": [
            "Customer must be on an eligible SRP business account or subprogram tariff.",
            "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
            "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
            "Retrocommissioning requires qualifying facility systems and implementation commitment."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "government_customers",
            "municipal_customers",
            "schools",
            "nonprofits",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "smart_thermostat_zoning_retrofit",
            "hvac_controls_retrofit",
            "energy_management_system",
            "variable_frequency_drive_retrofit",
            "high_efficiency_refrigeration_equipment",
            "retro_commissioning_study",
            "automated_demand_response_controls",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation"
          ],
          "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
          "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
          "programName": "Salt River Project - Business Energy Efficiency Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "site_customer_class",
            "networked_charger_confirmation",
            "srp_business_account",
            "preapproval_status",
            "dc_fast_charger_station_count",
            "business_location_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_customer_class",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "networked_charger_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "srp_business_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_station_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "business_location_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2250000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_098fd17db10cef51",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_7a7df25e69c2e788",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2000000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "submetering_energy_monitoring",
      "displayName": "Submetering / energy monitoring system",
      "parentCategory": "building_controls_energy_management",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 84800,
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
          "upfrontCostAfterSavingsCents": 84800,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:119",
          "opportunityName": "Solar and Wind Equipment Sales Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Sales Tax Incentive",
          "administrator": "Arizona Department of Revenue",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/119/solar-and-wind-equipment-sales-tax-exemption",
          "applicationUrl": "https://azdor.gov/sites/default/files/2023-03/FORM_TPT_10447_f_0.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state AZ matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_controls, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Submetering or energy monitoring is not a supported retrofit category unless it is integral to a qualifying solar energy device.",
            "Standalone metering, monitoring, storage, and non-solar controls do not qualify under this program match.",
            "Current official solar-device sources do not support a standalone wind-equipment match for this Arizona sales-tax deduction."
          ],
          "hardRequirements": [
            "Retailer or lessor must register with the Arizona Department of Revenue as a solar energy retailer or lessor.",
            "Sale or lease must be of a qualifying solar energy device under Arizona law.",
            "Retailer must maintain records supporting the deduction from the tax base."
          ],
          "eligibleApplicantTypes": [
            "registered_solar_energy_retailer",
            "registered_solar_energy_lessor",
            "purchaser"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "solar_space_heating_system",
            "solar_daylighting_system"
          ],
          "evidenceText": "Arizona]( law deducts amounts received from sales of solar energy devices from the retail tax base and requires the retailer to register as a solar energy retailer.",
          "reasoningNotes": "Keep solar thermal and solar electric categories. Remove the submetering match because the source supports solar devices, not general energy monitoring systems."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "window_replacement",
      "displayName": "Window replacement",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 444000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 63000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 63000,
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
          "upfrontCostAfterSavingsCents": 444000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1683",
          "opportunityName": "Energy Equipment Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Arizona Department of Revenue and county assessors",
          "state": "AZ",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.83,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1683/energy-equipment-property-tax-exemption",
          "applicationUrl": "https://azdor.gov/forms/property-tax-forms/renewable-energy-equipment-ty2027-property-tax-form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state AZ matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope, renewable_energy, biomass_biogas, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic window replacement unless the component independently meets the statutory energy-efficient building component standard.",
            "Do not match standalone battery storage; storage was not verified as a separate eligible category in the reviewed official sources.",
            "This is property tax treatment, not an upfront rebate."
          ],
          "hardRequirements": [
            "Property owner must provide required documentation and cost information to the county assessor.",
            "Renewable energy equipment must use qualifying resources and generally produce energy primarily for on-site consumption.",
            "Energy efficient building components must meet statutory efficiency thresholds, such as Energy Star, LEED, equivalent, or specified code savings.",
            "Combined heat and power must produce power plus useful thermal output under the statutory definition."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "taxpayer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "biomass_biogas_energy_system",
            "combined_heat_and_power_system",
            "geothermal_energy_system",
            "solar_energy_system",
            "wind_energy_system",
            "low_impact_hydropower_system",
            "energy_efficient_building_components"
          ],
          "evidenceText": "Arizona]( statute treats renewable energy equipment, CHP, and qualifying energy-efficient building components as adding no property value when documentation is provided.",
          "reasoningNotes": "Biomass, geothermal, CHP, and broader renewable systems are valid. Window matching must be narrowed to qualifying energy-efficient building components, not ordinary window replacement."
        }
      ],
      "v2PackageSummaries": []
    }
  ]
}
