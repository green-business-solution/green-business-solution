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
  "testCaseOrdinal": 39,
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

Packet 39 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 39,
  "sampleUserId": "hersheys-chocolate-world-hershey",
  "description": "Hershey visitor attraction with retail, food service, events, and refrigeration loads, distinct from manufacturing.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "commercial"
      ],
      "primaryActivityText": "Chocolate-themed visitor attraction, retail, food service, events, and brand experiences",
      "naicsCodes": [
        "713110",
        "445292",
        "722511"
      ],
      "organizationSize": "251-1,000 employees"
    },
    "site": {
      "address": {
        "raw": "101 Chocolate World Way, Hershey, PA 17033, USA",
        "stateCode": "PA",
        "zip5": "17033"
      },
      "geo": {
        "stateCode": "PA",
        "zip5": "17033",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "PPL Electric Utilities",
          "distributionUtilityId": "UTIL_PPL",
          "territoryCandidates": [
            "UTIL_PPL"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "unknown",
      "buildingTypes": [
        "retail_storefront"
      ],
      "squareFootage": {
        "value": 100000,
        "raw": "100,000",
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
    "eligible": 17,
    "ineligible": 1502
  },
  "retrofitCount": 18,
  "retrofits": [
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 5,
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
            "Applicant type overlaps eligible sector: commercial.",
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone biomass, geothermal, HVAC replacement, LED lighting or retro-commissioning as independent eligible measures.",
            "Commissioning may be part of a certified high-performance building project, but this record should not be treated as a standalone retro-commissioning study rebate.",
            "This is a grant, loan and loan guarantee program for building cost premiums, not a product-specific rebate.",
            "Projects that do not meet the program's high-performance building certification or renovation requirements should not match."
          ],
          "hardRequirements": [
            "Project must be in Pennsylvania and involve eligible high-performance building design and construction or major renovation cost premiums.",
            "Applicant must be an eligible small business or individual under program rules.",
            "Program requires matching investment and applicable application or commitment fees.",
            "Project must meet current high-performance building certification or performance requirements such as LEED, Green Globes or National Green Building Standard where applicable."
          ],
          "eligibleApplicantTypes": [
            "small_business",
            "individual",
            "homeowner",
            "building_owner",
            "developer"
          ],
          "eligibleSectors": [
            "commercial",
            "residential",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "whole_building_high_performance_renovation",
            "whole_building_high_performance_construction",
            "leed_certification",
            "green_globes_certification",
            "ngbs_certification"
          ],
          "evidenceText": "Pennsylvania]( DCED describes grants, loans and guarantees for cost premiums tied to high-performance building design, construction or major renovation, with certification-oriented program requirements.",
          "reasoningNotes": "The opportunity is not a list of discrete equipment rebates. LEED and other high-performance certification matches are valid, while biomass, geothermal, lighting, HVAC and commissioning should only matter if embedded in a qualifying whole-building project."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
          "opportunityName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Energy Efficiency Rebate And Incentive Program",
          "administrator": "PPL Electric Utilities",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3853/ppl-electric-utilities-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
          "applicationUrl": "https://cr101.my.salesforce-sites.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Self-reported utility matches PPL Electric Utilities.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a business program; residential appliances and home weatherization belong to separate PPL residential offerings.",
            "CHP is a distributed energy resource or efficiency measure and should not be parented under solar-only categories.",
            "Solar and battery measures are supported only within PPL business DER incentive rules, not as a generic residential renewable rebate."
          ],
          "hardRequirements": [
            "Applicant must be a PPL Electric business customer with an eligible business facility.",
            "Projects must use the applicable instant, direct discount, prescriptive, custom, or DER incentive pathway.",
            "Applications, savings calculations, and preapproval may be required before purchase or installation depending on the measure."
          ],
          "eligibleApplicantTypes": [
            "small_business_customer",
            "large_business_customer",
            "commercial_customer",
            "industrial_customer",
            "agricultural_customer",
            "institutional_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "institutional",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "combined_heat_and_power_system",
            "solar_pv_system",
            "battery_storage_system",
            "fuel_cell_system",
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls",
            "high_efficiency_hvac_replacement",
            "hvac_tune_up",
            "smart_thermostat_zoning_retrofit",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "motor_pump_vfd_retrofit",
            "compressed_air_system_efficiency",
            "domestic_hot_water_efficiency"
          ],
          "evidenceText": "PPL’s business incentives page lists solar and CHP, smart thermostats, HVAC tune-ups, prescriptive and custom projects, lighting, agriculture, DER, HVAC, kitchen and refrigeration, motors and pumps, and compressed air.",
          "reasoningNotes": "The original matches are supported, but CHP should be classified as CHP or DER, not solar. PPL offers a broad nonresidential efficiency portfolio."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1186",
          "opportunityName": "Small Business Pollution Prevention Assistance Account Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Small Business Low Interest Loan",
          "administrator": "Pennsylvania Department of Environmental Protection and Pennsylvania Department of Community and Economic Development",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1186/small-business-pollution-prevention-assistance-account-loan-program",
          "applicationUrl": "https://www.pa.gov/services/dep/grants/apply-for-the-pollution-prevention-assistance-account-loan--ppaa",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, energy_efficiency, renewable_energy, solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat this loan as a rebate or grant.",
            "Do not match projects that do not reduce waste, pollution, or energy use.",
            "Financial application follows technical eligibility review and credit approval."
          ],
          "hardRequirements": [
            "Business and project site must be in Pennsylvania.",
            "Applicant must have 100 or fewer full-time employees.",
            "Loan may cover up to 75 percent of eligible project costs.",
            "Maximum loan is 100000 dollars over a 12-month period.",
            "Project payback must fit within the loan term and pass technical eligibility review."
          ],
          "eligibleApplicantTypes": [
            "small_businesses"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "energy_efficiency_project_financing",
            "pollution_prevention_project_financing",
            "led_lighting_retrofit_financing",
            "hvac_upgrade_financing",
            "chiller_upgrade_financing",
            "motor_upgrade_financing",
            "process_equipment_efficiency_financing",
            "closed_loop_water_system_financing"
          ],
          "evidenceText": "Pennsylvania]( describes PPAA as a low-interest loan for small businesses reducing waste, pollution, or energy use, with examples including lighting, HVAC, chillers, motors, and manufacturing equipment.",
          "reasoningNotes": "Original HVAC and LED concepts are supportable only as loan-financed eligible improvements, not as rebate-style measures."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
          "programName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "incentive_pathway",
            "verified_first_year_kwh_savings",
            "eligible_project_scope",
            "preapproval_if_required",
            "measure_type",
            "unit_count_or_tonnage_bin"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "incentive_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "verified_first_year_kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_if_required",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_tonnage_bin",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_5086a61806a251ad",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_07c31ef3ba88199a",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 1500,
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
      "opportunityCount": 5,
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
            "Applicant type overlaps eligible sector: commercial.",
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22438",
          "opportunityName": "PPL Electric Utilities - Business Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "PPL Electric Utilities",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22438/ppl-electric-utilities-business-incentive-program",
          "applicationUrl": "https://cr101.my.salesforce-sites.com/pplportal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Self-reported utility matches PPL Electric Utilities.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Current official PPL pages do not support biomass or biogas as eligible measures for this opportunity.",
            "Do not match residential appliances, home weatherization, residential HVAC, or residential renewable installations.",
            "Do not generalize distributed energy resource incentives beyond solar, combined heat and power, and fuel cells listed by current official sources."
          ],
          "hardRequirements": [
            "Applicant must be a qualifying PPL Electric Utilities business customer.",
            "Project must comply with PPL business incentive rules for distributed energy resources, custom incentives, or prescriptive incentives.",
            "Application, energy savings documentation, and equipment documentation must be submitted through the PPL business savings process.",
            "Incentives are subject to program funding, eligibility review, and program rules."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "agricultural_customers",
            "nonprofit_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "combined_heat_and_power_system",
            "commercial_solar_pv",
            "fuel_cell_system"
          ],
          "evidenceText": "PPL's current business savings site lists distributed energy resource incentives for solar, combined heat and power, and fuel cells; official pages do not support biomass or biogas measures.",
          "reasoningNotes": "Retain CHP. Remove biomass and biogas because current PPL official sources do not support those categories for this business incentive."
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone biomass, geothermal, HVAC replacement, LED lighting or retro-commissioning as independent eligible measures.",
            "Commissioning may be part of a certified high-performance building project, but this record should not be treated as a standalone retro-commissioning study rebate.",
            "This is a grant, loan and loan guarantee program for building cost premiums, not a product-specific rebate.",
            "Projects that do not meet the program's high-performance building certification or renovation requirements should not match."
          ],
          "hardRequirements": [
            "Project must be in Pennsylvania and involve eligible high-performance building design and construction or major renovation cost premiums.",
            "Applicant must be an eligible small business or individual under program rules.",
            "Program requires matching investment and applicable application or commitment fees.",
            "Project must meet current high-performance building certification or performance requirements such as LEED, Green Globes or National Green Building Standard where applicable."
          ],
          "eligibleApplicantTypes": [
            "small_business",
            "individual",
            "homeowner",
            "building_owner",
            "developer"
          ],
          "eligibleSectors": [
            "commercial",
            "residential",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "whole_building_high_performance_renovation",
            "whole_building_high_performance_construction",
            "leed_certification",
            "green_globes_certification",
            "ngbs_certification"
          ],
          "evidenceText": "Pennsylvania]( DCED describes grants, loans and guarantees for cost premiums tied to high-performance building design, construction or major renovation, with certification-oriented program requirements.",
          "reasoningNotes": "The opportunity is not a list of discrete equipment rebates. LEED and other high-performance certification matches are valid, while biomass, geothermal, lighting, HVAC and commissioning should only matter if embedded in a qualifying whole-building project."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22456",
          "opportunityName": "PECO - Commercial Charger Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate/Make-Ready Program",
          "administrator": "PECO / Center for Sustainable Energy",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22456/peco-commercial-charger-rebate-program",
          "applicationUrl": "https://peco.chooseev.com/promos/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "The legacy PECO L3 page in the DSIRE record is stale or not sufficiently descriptive as a current primary source; current program information is through PECO EVsmart/ChooseEV and the program administrator page.",
            "This is a commercial charging infrastructure program and should not be matched to residential EV purchase rebates.",
            "PECO Smart Driver EV purchase notification rebates are a separate program and were not merged into this commercial charger record.",
            "The DCFC demand charge discount is a separate rate discount and should not be treated as an upfront equipment rebate.",
            "No building HVAC, lighting, envelope, water or refrigeration retrofit categories are supported by this record."
          ],
          "hardRequirements": [
            "Applicant must be a PECO commercial or industrial electric customer on an eligible rate.",
            "Level 2 and public-benefit EV charging incentives require pre-application or approval before construction or installation begins.",
            "Participants must provide required EV charging data reporting for the term required by the program administrator.",
            "Enhanced Level 2 rebates may require installation in Environmental Justice Areas or satisfaction of public-benefit criteria.",
            "Public-benefit DCFC or Level 2 incentives are limited by eligible project-cost caps and annual customer caps.",
            "Current program information identifies funding through May 31, 2029, subject to caps and program rules."
          ],
          "eligibleApplicantTypes": [
            "PECO commercial electric customers",
            "PECO industrial electric customers",
            "commercial property owners",
            "business tenants with installation authority",
            "local governments",
            "public agencies",
            "501(c)(3) nonprofits",
            "public transit agencies",
            "site hosts installing eligible public or workplace charging"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "public_sector",
            "nonprofit",
            "transportation",
            "workplace_charging",
            "public_charging"
          ],
          "eligibleRetrofitCategories": [
            "ev_charging_level_2_commercial",
            "ev_charging_dc_fast_public_benefit",
            "commercial_ev_make_ready",
            "public_benefit_ev_charging",
            "dcfc_demand_charge_discount_limited"
          ],
          "evidenceText": "PECO EVsmart Charging Rebate materials describe a commercial and industrial EV charging rebate in PECO service territory, with Level 2 commercial charging, enhanced Environmental Justice Area terms, public-benefit charging support, eligible Level 2 and DCFC cases, pre-application requirements, data reporting and funding through May 31, 2029.",
          "reasoningNotes": "The opportunity is active, but the current official replacement sources show it is strictly commercial EV charging infrastructure and public-benefit charging, not a general EV or building-efficiency rebate."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22456",
          "programName": "PECO - Commercial Charger Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "environmental_justice_area_status",
            "peco_commercial_or_industrial_account",
            "eligible_project_cost",
            "charger_type",
            "public_benefit_qualification",
            "site_type",
            "monthly_distribution_demand_charges",
            "dcfc_service_start_date",
            "qualifying_rate_status",
            "months_remaining_in_discount_period"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "environmental_justice_area_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "peco_commercial_or_industrial_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_benefit_qualification",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "monthly_distribution_demand_charges",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dcfc_service_start_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualifying_rate_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "months_remaining_in_discount_period",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 300000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_2f70d5ebb781d054",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_da52b1041f490287",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 300000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_recurring_savings_3_6ef5eca112361a24",
              "effectType": "recurring_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
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
            "Applicant type overlaps eligible sector: commercial.",
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone biomass, geothermal, HVAC replacement, LED lighting or retro-commissioning as independent eligible measures.",
            "Commissioning may be part of a certified high-performance building project, but this record should not be treated as a standalone retro-commissioning study rebate.",
            "This is a grant, loan and loan guarantee program for building cost premiums, not a product-specific rebate.",
            "Projects that do not meet the program's high-performance building certification or renovation requirements should not match."
          ],
          "hardRequirements": [
            "Project must be in Pennsylvania and involve eligible high-performance building design and construction or major renovation cost premiums.",
            "Applicant must be an eligible small business or individual under program rules.",
            "Program requires matching investment and applicable application or commitment fees.",
            "Project must meet current high-performance building certification or performance requirements such as LEED, Green Globes or National Green Building Standard where applicable."
          ],
          "eligibleApplicantTypes": [
            "small_business",
            "individual",
            "homeowner",
            "building_owner",
            "developer"
          ],
          "eligibleSectors": [
            "commercial",
            "residential",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "whole_building_high_performance_renovation",
            "whole_building_high_performance_construction",
            "leed_certification",
            "green_globes_certification",
            "ngbs_certification"
          ],
          "evidenceText": "Pennsylvania]( DCED describes grants, loans and guarantees for cost premiums tied to high-performance building design, construction or major renovation, with certification-oriented program requirements.",
          "reasoningNotes": "The opportunity is not a list of discrete equipment rebates. LEED and other high-performance certification matches are valid, while biomass, geothermal, lighting, HVAC and commissioning should only matter if embedded in a qualifying whole-building project."
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
            "Applicant type overlaps eligible sector: commercial.",
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
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1186",
          "opportunityName": "Small Business Pollution Prevention Assistance Account Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Small Business Low Interest Loan",
          "administrator": "Pennsylvania Department of Environmental Protection and Pennsylvania Department of Community and Economic Development",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1186/small-business-pollution-prevention-assistance-account-loan-program",
          "applicationUrl": "https://www.pa.gov/services/dep/grants/apply-for-the-pollution-prevention-assistance-account-loan--ppaa",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, energy_efficiency, renewable_energy, solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat this loan as a rebate or grant.",
            "Do not match projects that do not reduce waste, pollution, or energy use.",
            "Financial application follows technical eligibility review and credit approval."
          ],
          "hardRequirements": [
            "Business and project site must be in Pennsylvania.",
            "Applicant must have 100 or fewer full-time employees.",
            "Loan may cover up to 75 percent of eligible project costs.",
            "Maximum loan is 100000 dollars over a 12-month period.",
            "Project payback must fit within the loan term and pass technical eligibility review."
          ],
          "eligibleApplicantTypes": [
            "small_businesses"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "energy_efficiency_project_financing",
            "pollution_prevention_project_financing",
            "led_lighting_retrofit_financing",
            "hvac_upgrade_financing",
            "chiller_upgrade_financing",
            "motor_upgrade_financing",
            "process_equipment_efficiency_financing",
            "closed_loop_water_system_financing"
          ],
          "evidenceText": "Pennsylvania]( describes PPAA as a low-interest loan for small businesses reducing waste, pollution, or energy use, with examples including lighting, HVAC, chillers, motors, and manufacturing equipment.",
          "reasoningNotes": "Original HVAC and LED concepts are supportable only as loan-financed eligible improvements, not as rebate-style measures."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22438",
          "opportunityName": "PPL Electric Utilities - Business Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "PPL Electric Utilities",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22438/ppl-electric-utilities-business-incentive-program",
          "applicationUrl": "https://cr101.my.salesforce-sites.com/pplportal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Self-reported utility matches PPL Electric Utilities.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Current official PPL pages do not support biomass or biogas as eligible measures for this opportunity.",
            "Do not match residential appliances, home weatherization, residential HVAC, or residential renewable installations.",
            "Do not generalize distributed energy resource incentives beyond solar, combined heat and power, and fuel cells listed by current official sources."
          ],
          "hardRequirements": [
            "Applicant must be a qualifying PPL Electric Utilities business customer.",
            "Project must comply with PPL business incentive rules for distributed energy resources, custom incentives, or prescriptive incentives.",
            "Application, energy savings documentation, and equipment documentation must be submitted through the PPL business savings process.",
            "Incentives are subject to program funding, eligibility review, and program rules."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_customers",
            "industrial_customers",
            "agricultural_customers",
            "nonprofit_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "combined_heat_and_power_system",
            "commercial_solar_pv",
            "fuel_cell_system"
          ],
          "evidenceText": "PPL's current business savings site lists distributed energy resource incentives for solar, combined heat and power, and fuel cells; official pages do not support biomass or biogas measures.",
          "reasoningNotes": "Retain CHP. Remove biomass and biogas because current PPL official sources do not support those categories for this business incentive."
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
          "opportunityName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Energy Efficiency Rebate And Incentive Program",
          "administrator": "PPL Electric Utilities",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3853/ppl-electric-utilities-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
          "applicationUrl": "https://cr101.my.salesforce-sites.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Self-reported utility matches PPL Electric Utilities.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a business program; residential appliances and home weatherization belong to separate PPL residential offerings.",
            "CHP is a distributed energy resource or efficiency measure and should not be parented under solar-only categories.",
            "Solar and battery measures are supported only within PPL business DER incentive rules, not as a generic residential renewable rebate."
          ],
          "hardRequirements": [
            "Applicant must be a PPL Electric business customer with an eligible business facility.",
            "Projects must use the applicable instant, direct discount, prescriptive, custom, or DER incentive pathway.",
            "Applications, savings calculations, and preapproval may be required before purchase or installation depending on the measure."
          ],
          "eligibleApplicantTypes": [
            "small_business_customer",
            "large_business_customer",
            "commercial_customer",
            "industrial_customer",
            "agricultural_customer",
            "institutional_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "institutional",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "combined_heat_and_power_system",
            "solar_pv_system",
            "battery_storage_system",
            "fuel_cell_system",
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls",
            "high_efficiency_hvac_replacement",
            "hvac_tune_up",
            "smart_thermostat_zoning_retrofit",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "motor_pump_vfd_retrofit",
            "compressed_air_system_efficiency",
            "domestic_hot_water_efficiency"
          ],
          "evidenceText": "PPL’s business incentives page lists solar and CHP, smart thermostats, HVAC tune-ups, prescriptive and custom projects, lighting, agriculture, DER, HVAC, kitchen and refrigeration, motors and pumps, and compressed air.",
          "reasoningNotes": "The original matches are supported, but CHP should be classified as CHP or DER, not solar. PPL offers a broad nonresidential efficiency portfolio."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
          "programName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "incentive_pathway",
            "verified_first_year_kwh_savings",
            "eligible_project_scope",
            "preapproval_if_required",
            "measure_type",
            "unit_count_or_tonnage_bin"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "incentive_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "verified_first_year_kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_if_required",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_tonnage_bin",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_5086a61806a251ad",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_07c31ef3ba88199a",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 1500,
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
      "opportunityCount": 4,
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
            "Applicant type overlaps eligible sector: commercial.",
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
            "Applicant type overlaps eligible sector: commercial.",
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone biomass, geothermal, HVAC replacement, LED lighting or retro-commissioning as independent eligible measures.",
            "Commissioning may be part of a certified high-performance building project, but this record should not be treated as a standalone retro-commissioning study rebate.",
            "This is a grant, loan and loan guarantee program for building cost premiums, not a product-specific rebate.",
            "Projects that do not meet the program's high-performance building certification or renovation requirements should not match."
          ],
          "hardRequirements": [
            "Project must be in Pennsylvania and involve eligible high-performance building design and construction or major renovation cost premiums.",
            "Applicant must be an eligible small business or individual under program rules.",
            "Program requires matching investment and applicable application or commitment fees.",
            "Project must meet current high-performance building certification or performance requirements such as LEED, Green Globes or National Green Building Standard where applicable."
          ],
          "eligibleApplicantTypes": [
            "small_business",
            "individual",
            "homeowner",
            "building_owner",
            "developer"
          ],
          "eligibleSectors": [
            "commercial",
            "residential",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "whole_building_high_performance_renovation",
            "whole_building_high_performance_construction",
            "leed_certification",
            "green_globes_certification",
            "ngbs_certification"
          ],
          "evidenceText": "Pennsylvania]( DCED describes grants, loans and guarantees for cost premiums tied to high-performance building design, construction or major renovation, with certification-oriented program requirements.",
          "reasoningNotes": "The opportunity is not a list of discrete equipment rebates. LEED and other high-performance certification matches are valid, while biomass, geothermal, lighting, HVAC and commissioning should only matter if embedded in a qualifying whole-building project."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "retro_commissioning_study",
      "displayName": "Retro-commissioning study",
      "parentCategory": "audits_studies_planning",
      "isPhysicalRetrofit": false,
      "opportunityCount": 3,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3602",
          "opportunityName": "High Performance Buildings Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant/Loan/Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development; Pennsylvania Department of Environmental Protection",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3602/high-performance-buildings-incentive-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is financing or grant support, not a rebate for individual equipment measures.",
            "Do not match standalone LEED certification services unless part of an eligible high performance building construction or major renovation project.",
            "Do not match standalone retro-commissioning studies; commissioning is only relevant when tied to the eligible high performance building project.",
            "Detailed program guideline was not readable from the official page during review."
          ],
          "hardRequirements": [
            "Funding is for cost premiums tied to design, construction, or major renovation of a high performance building.",
            "Small business projects and individual residential projects have separate loan limits.",
            "Grant funding requires matching funds and is limited to eligible construction or renovation cost premiums."
          ],
          "eligibleApplicantTypes": [
            "small_businesses",
            "individuals"
          ],
          "eligibleSectors": [
            "commercial",
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "high_performance_building_major_renovation",
            "leed_or_equivalent_green_building_certification",
            "commissioning_for_high_performance_building"
          ],
          "evidenceText": "DCED]( says HPB funds grants and loans for design, construction, or major-renovation cost premiums for high performance buildings in Pennsylvania.",
          "reasoningNotes": "The original LEED and commissioning terms are directionally related but overly broad. Matching should be limited to high performance building construction or major renovation financing."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22779",
          "opportunityName": "The Green Energy Loan Fund (GELF)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Reinvestment Fund",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22779/the-green-energy-loan-fund-gelf",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, battery_storage, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone energy audits are not a funded retrofit category.",
            "Standalone retro-commissioning studies are not clearly supported as eligible loan uses.",
            "Single-family homes are not eligible under PA DEP guidance.",
            "Standalone renewable or CHP projects without larger energy-efficiency work should not match."
          ],
          "hardRequirements": [
            "Project must be in Pennsylvania and financed as a GELF loan.",
            "Projects must achieve required energy-performance targets, including a 25 percent reduction in energy consumption under PA DEP guidance.",
            "On-site renewable energy or CHP must be part of a larger building energy-efficiency project.",
            "Loan underwriting and community-benefit requirements apply."
          ],
          "eligibleApplicantTypes": [
            "building_owner",
            "developer",
            "eligible_borrower",
            "nonprofit",
            "business",
            "public_entity"
          ],
          "eligibleSectors": [
            "commercial",
            "multifamily",
            "nonprofit",
            "institutional",
            "public"
          ],
          "eligibleRetrofitCategories": [
            "building_energy_efficiency_retrofit",
            "energy_conservation_measures",
            "high_performance_building_systems",
            "onsite_renewable_energy_with_efficiency_project",
            "combined_heat_and_power_with_efficiency_project"
          ],
          "evidenceText": "Official]( GELF sources describe loan financing for energy conservation, efficiency retrofits, and high-performance building systems in Pennsylvania buildings.",
          "reasoningNotes": "The original audit and commissioning matches overstate the source. Audits or analysis may support underwriting, but the eligible opportunity is financing for implementation projects."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone biomass, geothermal, HVAC replacement, LED lighting or retro-commissioning as independent eligible measures.",
            "Commissioning may be part of a certified high-performance building project, but this record should not be treated as a standalone retro-commissioning study rebate.",
            "This is a grant, loan and loan guarantee program for building cost premiums, not a product-specific rebate.",
            "Projects that do not meet the program's high-performance building certification or renovation requirements should not match."
          ],
          "hardRequirements": [
            "Project must be in Pennsylvania and involve eligible high-performance building design and construction or major renovation cost premiums.",
            "Applicant must be an eligible small business or individual under program rules.",
            "Program requires matching investment and applicable application or commitment fees.",
            "Project must meet current high-performance building certification or performance requirements such as LEED, Green Globes or National Green Building Standard where applicable."
          ],
          "eligibleApplicantTypes": [
            "small_business",
            "individual",
            "homeowner",
            "building_owner",
            "developer"
          ],
          "eligibleSectors": [
            "commercial",
            "residential",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "whole_building_high_performance_renovation",
            "whole_building_high_performance_construction",
            "leed_certification",
            "green_globes_certification",
            "ngbs_certification"
          ],
          "evidenceText": "Pennsylvania]( DCED describes grants, loans and guarantees for cost premiums tied to high-performance building design, construction or major renovation, with certification-oriented program requirements.",
          "reasoningNotes": "The opportunity is not a list of discrete equipment rebates. LEED and other high-performance certification matches are valid, while biomass, geothermal, lighting, HVAC and commissioning should only matter if embedded in a qualifying whole-building project."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "parentCategory": "certifications_compliance",
      "isPhysicalRetrofit": false,
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3602",
          "opportunityName": "High Performance Buildings Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant/Loan/Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development; Pennsylvania Department of Environmental Protection",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3602/high-performance-buildings-incentive-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is financing or grant support, not a rebate for individual equipment measures.",
            "Do not match standalone LEED certification services unless part of an eligible high performance building construction or major renovation project.",
            "Do not match standalone retro-commissioning studies; commissioning is only relevant when tied to the eligible high performance building project.",
            "Detailed program guideline was not readable from the official page during review."
          ],
          "hardRequirements": [
            "Funding is for cost premiums tied to design, construction, or major renovation of a high performance building.",
            "Small business projects and individual residential projects have separate loan limits.",
            "Grant funding requires matching funds and is limited to eligible construction or renovation cost premiums."
          ],
          "eligibleApplicantTypes": [
            "small_businesses",
            "individuals"
          ],
          "eligibleSectors": [
            "commercial",
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "high_performance_building_major_renovation",
            "leed_or_equivalent_green_building_certification",
            "commissioning_for_high_performance_building"
          ],
          "evidenceText": "DCED]( says HPB funds grants and loans for design, construction, or major-renovation cost premiums for high performance buildings in Pennsylvania.",
          "reasoningNotes": "The original LEED and commissioning terms are directionally related but overly broad. Matching should be limited to high performance building construction or major renovation financing."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone biomass, geothermal, HVAC replacement, LED lighting or retro-commissioning as independent eligible measures.",
            "Commissioning may be part of a certified high-performance building project, but this record should not be treated as a standalone retro-commissioning study rebate.",
            "This is a grant, loan and loan guarantee program for building cost premiums, not a product-specific rebate.",
            "Projects that do not meet the program's high-performance building certification or renovation requirements should not match."
          ],
          "hardRequirements": [
            "Project must be in Pennsylvania and involve eligible high-performance building design and construction or major renovation cost premiums.",
            "Applicant must be an eligible small business or individual under program rules.",
            "Program requires matching investment and applicable application or commitment fees.",
            "Project must meet current high-performance building certification or performance requirements such as LEED, Green Globes or National Green Building Standard where applicable."
          ],
          "eligibleApplicantTypes": [
            "small_business",
            "individual",
            "homeowner",
            "building_owner",
            "developer"
          ],
          "eligibleSectors": [
            "commercial",
            "residential",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "whole_building_high_performance_renovation",
            "whole_building_high_performance_construction",
            "leed_certification",
            "green_globes_certification",
            "ngbs_certification"
          ],
          "evidenceText": "Pennsylvania]( DCED describes grants, loans and guarantees for cost premiums tied to high-performance building design, construction or major renovation, with certification-oriented program requirements.",
          "reasoningNotes": "The opportunity is not a list of discrete equipment rebates. LEED and other high-performance certification matches are valid, while biomass, geothermal, lighting, HVAC and commissioning should only matter if embedded in a qualifying whole-building project."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22456",
          "opportunityName": "PECO - Commercial Charger Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate/Make-Ready Program",
          "administrator": "PECO / Center for Sustainable Energy",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22456/peco-commercial-charger-rebate-program",
          "applicationUrl": "https://peco.chooseev.com/promos/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "The legacy PECO L3 page in the DSIRE record is stale or not sufficiently descriptive as a current primary source; current program information is through PECO EVsmart/ChooseEV and the program administrator page.",
            "This is a commercial charging infrastructure program and should not be matched to residential EV purchase rebates.",
            "PECO Smart Driver EV purchase notification rebates are a separate program and were not merged into this commercial charger record.",
            "The DCFC demand charge discount is a separate rate discount and should not be treated as an upfront equipment rebate.",
            "No building HVAC, lighting, envelope, water or refrigeration retrofit categories are supported by this record."
          ],
          "hardRequirements": [
            "Applicant must be a PECO commercial or industrial electric customer on an eligible rate.",
            "Level 2 and public-benefit EV charging incentives require pre-application or approval before construction or installation begins.",
            "Participants must provide required EV charging data reporting for the term required by the program administrator.",
            "Enhanced Level 2 rebates may require installation in Environmental Justice Areas or satisfaction of public-benefit criteria.",
            "Public-benefit DCFC or Level 2 incentives are limited by eligible project-cost caps and annual customer caps.",
            "Current program information identifies funding through May 31, 2029, subject to caps and program rules."
          ],
          "eligibleApplicantTypes": [
            "PECO commercial electric customers",
            "PECO industrial electric customers",
            "commercial property owners",
            "business tenants with installation authority",
            "local governments",
            "public agencies",
            "501(c)(3) nonprofits",
            "public transit agencies",
            "site hosts installing eligible public or workplace charging"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "public_sector",
            "nonprofit",
            "transportation",
            "workplace_charging",
            "public_charging"
          ],
          "eligibleRetrofitCategories": [
            "ev_charging_level_2_commercial",
            "ev_charging_dc_fast_public_benefit",
            "commercial_ev_make_ready",
            "public_benefit_ev_charging",
            "dcfc_demand_charge_discount_limited"
          ],
          "evidenceText": "PECO EVsmart Charging Rebate materials describe a commercial and industrial EV charging rebate in PECO service territory, with Level 2 commercial charging, enhanced Environmental Justice Area terms, public-benefit charging support, eligible Level 2 and DCFC cases, pre-application requirements, data reporting and funding through May 31, 2029.",
          "reasoningNotes": "The opportunity is active, but the current official replacement sources show it is strictly commercial EV charging infrastructure and public-benefit charging, not a general EV or building-efficiency rebate."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22456",
          "programName": "PECO - Commercial Charger Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "environmental_justice_area_status",
            "peco_commercial_or_industrial_account",
            "eligible_project_cost",
            "charger_type",
            "public_benefit_qualification",
            "site_type",
            "monthly_distribution_demand_charges",
            "dcfc_service_start_date",
            "qualifying_rate_status",
            "months_remaining_in_discount_period"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "environmental_justice_area_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "peco_commercial_or_industrial_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_benefit_qualification",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "monthly_distribution_demand_charges",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dcfc_service_start_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualifying_rate_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "months_remaining_in_discount_period",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 300000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_2f70d5ebb781d054",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_da52b1041f490287",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 300000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_recurring_savings_3_6ef5eca112361a24",
              "effectType": "recurring_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
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
            "Applicant type overlaps eligible sector: commercial.",
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
            "Applicant type overlaps eligible sector: commercial.",
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
      "opportunityCount": 1,
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
            "Applicant type overlaps eligible sector: commercial.",
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
      "retrofitTypeId": "energy_audit",
      "displayName": "Energy audit",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22779",
          "opportunityName": "The Green Energy Loan Fund (GELF)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Reinvestment Fund",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22779/the-green-energy-loan-fund-gelf",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, battery_storage, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone energy audits are not a funded retrofit category.",
            "Standalone retro-commissioning studies are not clearly supported as eligible loan uses.",
            "Single-family homes are not eligible under PA DEP guidance.",
            "Standalone renewable or CHP projects without larger energy-efficiency work should not match."
          ],
          "hardRequirements": [
            "Project must be in Pennsylvania and financed as a GELF loan.",
            "Projects must achieve required energy-performance targets, including a 25 percent reduction in energy consumption under PA DEP guidance.",
            "On-site renewable energy or CHP must be part of a larger building energy-efficiency project.",
            "Loan underwriting and community-benefit requirements apply."
          ],
          "eligibleApplicantTypes": [
            "building_owner",
            "developer",
            "eligible_borrower",
            "nonprofit",
            "business",
            "public_entity"
          ],
          "eligibleSectors": [
            "commercial",
            "multifamily",
            "nonprofit",
            "institutional",
            "public"
          ],
          "eligibleRetrofitCategories": [
            "building_energy_efficiency_retrofit",
            "energy_conservation_measures",
            "high_performance_building_systems",
            "onsite_renewable_energy_with_efficiency_project",
            "combined_heat_and_power_with_efficiency_project"
          ],
          "evidenceText": "Official]( GELF sources describe loan financing for energy conservation, efficiency retrofits, and high-performance building systems in Pennsylvania buildings.",
          "reasoningNotes": "The original audit and commissioning matches overstate the source. Audits or analysis may support underwriting, but the eligible opportunity is financing for implementation projects."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "ev_make_ready_electrical_upgrade",
      "displayName": "EV make-ready electrical upgrade",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 732000,
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
          "upfrontCostAfterSavingsCents": 732000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22456",
          "opportunityName": "PECO - Commercial Charger Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate/Make-Ready Program",
          "administrator": "PECO / Center for Sustainable Energy",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22456/peco-commercial-charger-rebate-program",
          "applicationUrl": "https://peco.chooseev.com/promos/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "The legacy PECO L3 page in the DSIRE record is stale or not sufficiently descriptive as a current primary source; current program information is through PECO EVsmart/ChooseEV and the program administrator page.",
            "This is a commercial charging infrastructure program and should not be matched to residential EV purchase rebates.",
            "PECO Smart Driver EV purchase notification rebates are a separate program and were not merged into this commercial charger record.",
            "The DCFC demand charge discount is a separate rate discount and should not be treated as an upfront equipment rebate.",
            "No building HVAC, lighting, envelope, water or refrigeration retrofit categories are supported by this record."
          ],
          "hardRequirements": [
            "Applicant must be a PECO commercial or industrial electric customer on an eligible rate.",
            "Level 2 and public-benefit EV charging incentives require pre-application or approval before construction or installation begins.",
            "Participants must provide required EV charging data reporting for the term required by the program administrator.",
            "Enhanced Level 2 rebates may require installation in Environmental Justice Areas or satisfaction of public-benefit criteria.",
            "Public-benefit DCFC or Level 2 incentives are limited by eligible project-cost caps and annual customer caps.",
            "Current program information identifies funding through May 31, 2029, subject to caps and program rules."
          ],
          "eligibleApplicantTypes": [
            "PECO commercial electric customers",
            "PECO industrial electric customers",
            "commercial property owners",
            "business tenants with installation authority",
            "local governments",
            "public agencies",
            "501(c)(3) nonprofits",
            "public transit agencies",
            "site hosts installing eligible public or workplace charging"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "public_sector",
            "nonprofit",
            "transportation",
            "workplace_charging",
            "public_charging"
          ],
          "eligibleRetrofitCategories": [
            "ev_charging_level_2_commercial",
            "ev_charging_dc_fast_public_benefit",
            "commercial_ev_make_ready",
            "public_benefit_ev_charging",
            "dcfc_demand_charge_discount_limited"
          ],
          "evidenceText": "PECO EVsmart Charging Rebate materials describe a commercial and industrial EV charging rebate in PECO service territory, with Level 2 commercial charging, enhanced Environmental Justice Area terms, public-benefit charging support, eligible Level 2 and DCFC cases, pre-application requirements, data reporting and funding through May 31, 2029.",
          "reasoningNotes": "The opportunity is active, but the current official replacement sources show it is strictly commercial EV charging infrastructure and public-benefit charging, not a general EV or building-efficiency rebate."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22456",
          "programName": "PECO - Commercial Charger Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "level_2_port_count",
            "environmental_justice_area_status",
            "peco_commercial_or_industrial_account",
            "eligible_project_cost",
            "charger_type",
            "public_benefit_qualification",
            "site_type",
            "monthly_distribution_demand_charges",
            "dcfc_service_start_date",
            "qualifying_rate_status",
            "months_remaining_in_discount_period"
          ],
          "defaultedInputs": [
            {
              "inputKey": "level_2_port_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "environmental_justice_area_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "peco_commercial_or_industrial_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_benefit_qualification",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "monthly_distribution_demand_charges",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dcfc_service_start_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualifying_rate_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "months_remaining_in_discount_period",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 200000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_2f70d5ebb781d054",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "fixed_tier_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_da52b1041f490287",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 200000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_recurring_savings_3_6ef5eca112361a24",
              "effectType": "recurring_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
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
      "retrofitTypeId": "exterior_site_lighting_retrofit",
      "displayName": "Exterior/site lighting retrofit",
      "parentCategory": "lighting",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 201200,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 90000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 90000,
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
          "upfrontCostAfterSavingsCents": 201200,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
          "opportunityName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Energy Efficiency Rebate And Incentive Program",
          "administrator": "PPL Electric Utilities",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3853/ppl-electric-utilities-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
          "applicationUrl": "https://cr101.my.salesforce-sites.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Self-reported utility matches PPL Electric Utilities.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a business program; residential appliances and home weatherization belong to separate PPL residential offerings.",
            "CHP is a distributed energy resource or efficiency measure and should not be parented under solar-only categories.",
            "Solar and battery measures are supported only within PPL business DER incentive rules, not as a generic residential renewable rebate."
          ],
          "hardRequirements": [
            "Applicant must be a PPL Electric business customer with an eligible business facility.",
            "Projects must use the applicable instant, direct discount, prescriptive, custom, or DER incentive pathway.",
            "Applications, savings calculations, and preapproval may be required before purchase or installation depending on the measure."
          ],
          "eligibleApplicantTypes": [
            "small_business_customer",
            "large_business_customer",
            "commercial_customer",
            "industrial_customer",
            "agricultural_customer",
            "institutional_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "institutional",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "combined_heat_and_power_system",
            "solar_pv_system",
            "battery_storage_system",
            "fuel_cell_system",
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls",
            "high_efficiency_hvac_replacement",
            "hvac_tune_up",
            "smart_thermostat_zoning_retrofit",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "motor_pump_vfd_retrofit",
            "compressed_air_system_efficiency",
            "domestic_hot_water_efficiency"
          ],
          "evidenceText": "PPL’s business incentives page lists solar and CHP, smart thermostats, HVAC tune-ups, prescriptive and custom projects, lighting, agriculture, DER, HVAC, kitchen and refrigeration, motors and pumps, and compressed air.",
          "reasoningNotes": "The original matches are supported, but CHP should be classified as CHP or DER, not solar. PPL offers a broad nonresidential efficiency portfolio."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
          "programName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "incentive_pathway",
            "verified_first_year_kwh_savings",
            "eligible_project_scope",
            "preapproval_if_required",
            "measure_type",
            "unit_count_or_tonnage_bin"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "incentive_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "verified_first_year_kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_if_required",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_tonnage_bin",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_5086a61806a251ad",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_07c31ef3ba88199a",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 1500,
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
            "Applicant type overlaps eligible sector: commercial.",
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
          "opportunityName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Energy Efficiency Rebate And Incentive Program",
          "administrator": "PPL Electric Utilities",
          "state": "PA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3853/ppl-electric-utilities-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
          "applicationUrl": "https://cr101.my.salesforce-sites.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Self-reported utility matches PPL Electric Utilities.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a business program; residential appliances and home weatherization belong to separate PPL residential offerings.",
            "CHP is a distributed energy resource or efficiency measure and should not be parented under solar-only categories.",
            "Solar and battery measures are supported only within PPL business DER incentive rules, not as a generic residential renewable rebate."
          ],
          "hardRequirements": [
            "Applicant must be a PPL Electric business customer with an eligible business facility.",
            "Projects must use the applicable instant, direct discount, prescriptive, custom, or DER incentive pathway.",
            "Applications, savings calculations, and preapproval may be required before purchase or installation depending on the measure."
          ],
          "eligibleApplicantTypes": [
            "small_business_customer",
            "large_business_customer",
            "commercial_customer",
            "industrial_customer",
            "agricultural_customer",
            "institutional_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "institutional",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "combined_heat_and_power_system",
            "solar_pv_system",
            "battery_storage_system",
            "fuel_cell_system",
            "led_lighting_retrofit",
            "exterior_site_lighting_retrofit",
            "lighting_controls",
            "high_efficiency_hvac_replacement",
            "hvac_tune_up",
            "smart_thermostat_zoning_retrofit",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "motor_pump_vfd_retrofit",
            "compressed_air_system_efficiency",
            "domestic_hot_water_efficiency"
          ],
          "evidenceText": "PPL’s business incentives page lists solar and CHP, smart thermostats, HVAC tune-ups, prescriptive and custom projects, lighting, agriculture, DER, HVAC, kitchen and refrigeration, motors and pumps, and compressed air.",
          "reasoningNotes": "The original matches are supported, but CHP should be classified as CHP or DER, not solar. PPL offers a broad nonresidential efficiency portfolio."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
          "programName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "incentive_pathway",
            "verified_first_year_kwh_savings",
            "eligible_project_scope",
            "preapproval_if_required",
            "measure_type",
            "unit_count_or_tonnage_bin"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "incentive_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "verified_first_year_kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_if_required",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_tonnage_bin",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_5086a61806a251ad",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_07c31ef3ba88199a",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 1500,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "thermal_energy_storage",
      "displayName": "Thermal energy storage",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
            "Applicant type overlaps eligible sector: commercial.",
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
    }
  ]
}
