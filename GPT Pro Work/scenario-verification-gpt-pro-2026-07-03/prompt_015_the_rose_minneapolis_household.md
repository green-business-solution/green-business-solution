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
  "testCaseOrdinal": 15,
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

Packet 15 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 15,
  "sampleUserId": "the-rose-minneapolis-household",
  "description": "Anonymized mixed-income multifamily household in Minneapolis with Xcel electric and CenterPoint gas.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "residential"
      ],
      "primaryActivityText": "Residential occupancy in sustainable mixed-income multifamily housing",
      "naicsCodes": [
        "531110"
      ],
      "organizationSize": "Household"
    },
    "site": {
      "address": {
        "raw": "1928 Portland Avenue S, Minneapolis, MN 55404, USA",
        "stateCode": "MN",
        "zip5": "55404"
      },
      "geo": {
        "stateCode": "MN",
        "zip5": "55404",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Xcel Energy",
          "distributionUtilityId": "UTIL_XCEL",
          "territoryCandidates": [
            "UTIL_XCEL"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "multifamily_residential"
      ],
      "squareFootage": {
        "value": 86195,
        "raw": "86,195",
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
    "eligible": 16,
    "ineligible": 1503
  },
  "retrofitCount": 21,
  "retrofits": [
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 6,
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
          "matchedPackageCount": 5,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 5
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Rebate Program",
          "administrator": "East Central Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, ev_charging, hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match broad insulation or window replacement.",
            "Residential refrigerator/freezer is not commercial refrigeration.",
            "EV rebate is not DC fast charging or fleet charging.",
            "Low-flow fixtures are unsupported."
          ],
          "hardRequirements": [
            "Applicant must be an ECE member in ECE service area.",
            "Applications must follow current-year program rules and funding availability.",
            "ASHP, GSHP, and HPWH rebates require program documentation.",
            "EV rebate applies to a qualifying Level 2 charger."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "member_owner",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "residential_refrigerator_freezer_rebate",
            "appliance_recycling",
            "dehumidifier",
            "high_efficiency_clothes_dryer",
            "smart_thermostat"
          ],
          "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
          "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "opportunityName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Princeton PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2555/princeton-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial dishwasher and commercial refrigeration are false positives; the residential page only exposes ENERGY STAR product forms for household products.",
            "Furnace references should be limited to furnace fan motor or ECM rebates, not high-efficiency furnace replacement.",
            "Residential LED lighting is not shown as a 2026 residential rebate form; lighting forms are listed under business rebates.",
            "Ground-source or geothermal heat pump is not verified on the visible 2026 residential form titles and should not be matched unless the current cooling form confirms it.",
            "SMMPA Drive PDFs were linked but not text-readable in the browser; category repair is limited to visible official form titles."
          ],
          "hardRequirements": [
            "Applicant must be a Princeton Public Utilities residential electric customer.",
            "Customer must use the applicable current SMMPA or utility rebate form.",
            "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_appliances",
            "energy_star_residential_dishwasher",
            "energy_star_residential_refrigerator_freezer",
            "heat_pump_water_heater",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "central_air_conditioner_replacement",
            "heat_pump_hvac_retrofit",
            "hvac_tuneup",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm_retrofit",
            "pool_pump",
            "duct_sealing",
            "air_sealing_weatherization",
            "battery_powered_outdoor_equipment",
            "electric_bicycle"
          ],
          "evidenceText": "SMMPA's Princeton page lists 2026 residential forms for ENERGY STAR products and EV chargers plus cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and battery outdoor equipment.",
          "reasoningNotes": "Kept residential categories visible from the current SMMPA page. Business lighting, refrigeration, food service, and motor forms were not treated as residential eligibility."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "opportunityName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Grand Marais PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2539/grand-marais-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
            "Do not match broad LED lighting unless the current residential product form specifically supports it.",
            "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
            "Do not merge the separate SMMPA business rebate list into this residential opportunity."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Grand Marais PUC residential electric customer.",
            "Measures must use the current SMMPA/Grand Marais residential rebate form for the specific product category.",
            "Business rebate categories are separate and must use separate business forms.",
            "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "homeowner",
            "renter_with_utility_account"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_products",
            "energy_star_level_2_ev_charger",
            "residential_cooling_equipment",
            "residential_cooling_tune_up",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm",
            "efficient_pool_pump",
            "aerosol_duct_sealing",
            "battery_powered_outdoor_equipment",
            "e_bike"
          ],
          "evidenceText": "The SMMPA Grand Marais page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
          "reasoningNotes": "Current official page supports category-level forms; separate business rebate links should not be mixed into the residential opportunity."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "opportunityName": "MMPA - Residential Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Minnesota Municipal Power Agency member municipal utilities",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4740/mmpa-residential-energy-efficiency-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential appliance rebates are not commercial dishwasher, commercial refrigeration, or commercial kitchen equipment rebates.",
            "No current official support was found for low-flow fixture retrofits under this residential electric program.",
            "Generic high-efficiency HVAC is too broad; current support is for central air conditioners and air-source heat pumps."
          ],
          "hardRequirements": [
            "Applicant must be a residential electric customer of a participating MMPA member utility.",
            "ENERGY STAR qualification applies to listed appliance categories where required by local forms.",
            "Rebate amount, deadlines, proof of purchase, and eligibility are controlled by the local municipal utility form."
          ],
          "eligibleApplicantTypes": [
            "residential_customers"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_star_appliance_rebate",
            "residential_dishwasher",
            "residential_clothes_washer",
            "residential_refrigerator_freezer",
            "electric_clothes_dryer",
            "dehumidifier",
            "air_purifier",
            "led_lighting_retrofit",
            "ceiling_fan_light_kit",
            "central_air_conditioner",
            "air_source_heat_pump"
          ],
          "evidenceText": "MMPA]( residential conservation materials list rebates for LED lighting, ceiling fans with light kits, ENERGY STAR household appliances, central air conditioners, air-source heat pumps, and appliance recycling.",
          "reasoningNotes": "The current match should be narrowed to residential appliances and residential electric HVAC measures; commercial foodservice and low-flow plumbing categories are false positives."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "opportunityName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Natural-Gas Rebate Program",
          "administrator": "Minnesota Energy Resources",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3310/minnesota-energy-resources-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Waste heat recovery was a false positive; the checked program supports residential HRV and ERV, not industrial waste heat recovery.",
            "Do not match electric heat pumps or electric utility measures.",
            "Do not match new homes under the existing-home rebate rules where the program excludes homes built in the past two years.",
            "Do not match customers outside the Minnesota Energy Resources gas territory."
          ],
          "hardRequirements": [
            "Home must be served by Minnesota Energy Resources and meet natural-gas heating requirements for the relevant measure.",
            "Air sealing and insulation require approved insulation contractor participation and diagnostic testing where specified.",
            "Aerosol duct sealing must meet reduction requirements and contractor certification rules; mastic or tape duct sealing does not qualify.",
            "Windows must be ENERGY STAR Version 7 and installed by a qualifying contractor for conditioned space.",
            "Heating, thermostat, HRV, ERV and water-heating rebates have equipment, application-timing and per-service limits."
          ],
          "eligibleApplicantTypes": [
            "residential_natural_gas_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "duct_sealing_and_insulation",
            "window_replacement",
            "high_efficiency_furnace_retrofit",
            "high_efficiency_boiler_retrofit",
            "integrated_space_water_heating_system",
            "energy_recovery_ventilation_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heating_system_tune_up",
            "water_heater_upgrade",
            "low_flow_showerheads_and_aerators"
          ],
          "evidenceText": "Minnesota]( Energy Resources lists existing-home rebates for insulation, air sealing, aerosol duct sealing, ENERGY STAR windows, gas furnaces and boilers, HRV or ERV, thermostats and water-heating measures.",
          "reasoningNotes": "Retained gas-residential envelope, duct, heating, ventilation and thermostat measures. Removed industrial waste-heat recovery and any implied electric-utility or heat-pump rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1188",
          "opportunityName": "Home Energy Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan",
          "administrator": "Center for Energy and Environment",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1188/home-energy-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial, industrial, or non-owner-occupied projects.",
            "Do not treat as a grant or rebate.",
            "Do not match measures outside the lender-approved energy improvement scope."
          ],
          "hardRequirements": [
            "Property must be a one-to-four-unit owner-occupied primary residence.",
            "Loan approval is subject to credit and program guidelines.",
            "Improvements must be energy-related and program-eligible.",
            "Properties held in trust are not eligible.",
            "This is loan financing, not a rebate."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "owner_occupant",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "high_efficiency_hvac_replacement",
            "insulation_upgrade",
            "window_replacement",
            "efficient_water_heater"
          ],
          "evidenceText": "CEE states that eligible home energy loan improvements include heating and cooling systems, windows, water heaters, and insulation for owner-occupied one-to-four-unit homes.",
          "reasoningNotes": "Both original matches are supportable, but the opportunity should remain typed as financing rather than rebate support."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "programName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_62e8123e06b32401",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "programName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c7bf7c257460020e",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "programName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "tons",
            "equipmenttier",
            "energystarstatus",
            "touoroffpeakenrollment",
            "existingappliancerecycling",
            "eceaccount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipmenttier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energystarstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "touoroffpeakenrollment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existingappliancerecycling",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eceaccount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d9ac98dee224a54",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 2500,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "programName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "eligiblecost",
            "cfmreduction",
            "afue",
            "windowcount",
            "affordablehousingstatus",
            "naturalgasheatingstatus",
            "homeageyears",
            "eligiblecostorcfmreduction"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "afue",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "windowcount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "affordablehousingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "naturalgasheatingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "homeageyears",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecostorcfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 250,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_295902f08bab4fb1",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "programName": "MMPA - Residential Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "participating_member_utility",
            "local_residential_form",
            "selected_measure",
            "energy_star_qualification_where_applicable",
            "purchase_price",
            "unit_count",
            "member_utility",
            "local_form_amount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "participating_member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_residential_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energy_star_qualification_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_cdf9e736a6dca475",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2500,
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
      "opportunityCount": 3,
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
          "matchedPackageCount": 3,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 3
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Rebate Program",
          "administrator": "East Central Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, ev_charging, hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match broad insulation or window replacement.",
            "Residential refrigerator/freezer is not commercial refrigeration.",
            "EV rebate is not DC fast charging or fleet charging.",
            "Low-flow fixtures are unsupported."
          ],
          "hardRequirements": [
            "Applicant must be an ECE member in ECE service area.",
            "Applications must follow current-year program rules and funding availability.",
            "ASHP, GSHP, and HPWH rebates require program documentation.",
            "EV rebate applies to a qualifying Level 2 charger."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "member_owner",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "residential_refrigerator_freezer_rebate",
            "appliance_recycling",
            "dehumidifier",
            "high_efficiency_clothes_dryer",
            "smart_thermostat"
          ],
          "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
          "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "opportunityName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Princeton PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2555/princeton-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial dishwasher and commercial refrigeration are false positives; the residential page only exposes ENERGY STAR product forms for household products.",
            "Furnace references should be limited to furnace fan motor or ECM rebates, not high-efficiency furnace replacement.",
            "Residential LED lighting is not shown as a 2026 residential rebate form; lighting forms are listed under business rebates.",
            "Ground-source or geothermal heat pump is not verified on the visible 2026 residential form titles and should not be matched unless the current cooling form confirms it.",
            "SMMPA Drive PDFs were linked but not text-readable in the browser; category repair is limited to visible official form titles."
          ],
          "hardRequirements": [
            "Applicant must be a Princeton Public Utilities residential electric customer.",
            "Customer must use the applicable current SMMPA or utility rebate form.",
            "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_appliances",
            "energy_star_residential_dishwasher",
            "energy_star_residential_refrigerator_freezer",
            "heat_pump_water_heater",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "central_air_conditioner_replacement",
            "heat_pump_hvac_retrofit",
            "hvac_tuneup",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm_retrofit",
            "pool_pump",
            "duct_sealing",
            "air_sealing_weatherization",
            "battery_powered_outdoor_equipment",
            "electric_bicycle"
          ],
          "evidenceText": "SMMPA's Princeton page lists 2026 residential forms for ENERGY STAR products and EV chargers plus cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and battery outdoor equipment.",
          "reasoningNotes": "Kept residential categories visible from the current SMMPA page. Business lighting, refrigeration, food service, and motor forms were not treated as residential eligibility."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "opportunityName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Grand Marais PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2539/grand-marais-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
            "Do not match broad LED lighting unless the current residential product form specifically supports it.",
            "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
            "Do not merge the separate SMMPA business rebate list into this residential opportunity."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Grand Marais PUC residential electric customer.",
            "Measures must use the current SMMPA/Grand Marais residential rebate form for the specific product category.",
            "Business rebate categories are separate and must use separate business forms.",
            "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "homeowner",
            "renter_with_utility_account"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_products",
            "energy_star_level_2_ev_charger",
            "residential_cooling_equipment",
            "residential_cooling_tune_up",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm",
            "efficient_pool_pump",
            "aerosol_duct_sealing",
            "battery_powered_outdoor_equipment",
            "e_bike"
          ],
          "evidenceText": "The SMMPA Grand Marais page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
          "reasoningNotes": "Current official page supports category-level forms; separate business rebate links should not be mixed into the residential opportunity."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "programName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_62e8123e06b32401",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "programName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c7bf7c257460020e",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "programName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "tons",
            "equipmenttier",
            "energystarstatus",
            "touoroffpeakenrollment",
            "existingappliancerecycling",
            "eceaccount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipmenttier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energystarstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "touoroffpeakenrollment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existingappliancerecycling",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eceaccount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 40000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d9ac98dee224a54",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 40000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 5,
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
          "matchedPackageCount": 5,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 5
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Rebate Program",
          "administrator": "East Central Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, ev_charging, hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match broad insulation or window replacement.",
            "Residential refrigerator/freezer is not commercial refrigeration.",
            "EV rebate is not DC fast charging or fleet charging.",
            "Low-flow fixtures are unsupported."
          ],
          "hardRequirements": [
            "Applicant must be an ECE member in ECE service area.",
            "Applications must follow current-year program rules and funding availability.",
            "ASHP, GSHP, and HPWH rebates require program documentation.",
            "EV rebate applies to a qualifying Level 2 charger."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "member_owner",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "residential_refrigerator_freezer_rebate",
            "appliance_recycling",
            "dehumidifier",
            "high_efficiency_clothes_dryer",
            "smart_thermostat"
          ],
          "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
          "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "opportunityName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Princeton PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2555/princeton-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial dishwasher and commercial refrigeration are false positives; the residential page only exposes ENERGY STAR product forms for household products.",
            "Furnace references should be limited to furnace fan motor or ECM rebates, not high-efficiency furnace replacement.",
            "Residential LED lighting is not shown as a 2026 residential rebate form; lighting forms are listed under business rebates.",
            "Ground-source or geothermal heat pump is not verified on the visible 2026 residential form titles and should not be matched unless the current cooling form confirms it.",
            "SMMPA Drive PDFs were linked but not text-readable in the browser; category repair is limited to visible official form titles."
          ],
          "hardRequirements": [
            "Applicant must be a Princeton Public Utilities residential electric customer.",
            "Customer must use the applicable current SMMPA or utility rebate form.",
            "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_appliances",
            "energy_star_residential_dishwasher",
            "energy_star_residential_refrigerator_freezer",
            "heat_pump_water_heater",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "central_air_conditioner_replacement",
            "heat_pump_hvac_retrofit",
            "hvac_tuneup",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm_retrofit",
            "pool_pump",
            "duct_sealing",
            "air_sealing_weatherization",
            "battery_powered_outdoor_equipment",
            "electric_bicycle"
          ],
          "evidenceText": "SMMPA's Princeton page lists 2026 residential forms for ENERGY STAR products and EV chargers plus cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and battery outdoor equipment.",
          "reasoningNotes": "Kept residential categories visible from the current SMMPA page. Business lighting, refrigeration, food service, and motor forms were not treated as residential eligibility."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "opportunityName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Grand Marais PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2539/grand-marais-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
            "Do not match broad LED lighting unless the current residential product form specifically supports it.",
            "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
            "Do not merge the separate SMMPA business rebate list into this residential opportunity."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Grand Marais PUC residential electric customer.",
            "Measures must use the current SMMPA/Grand Marais residential rebate form for the specific product category.",
            "Business rebate categories are separate and must use separate business forms.",
            "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "homeowner",
            "renter_with_utility_account"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_products",
            "energy_star_level_2_ev_charger",
            "residential_cooling_equipment",
            "residential_cooling_tune_up",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm",
            "efficient_pool_pump",
            "aerosol_duct_sealing",
            "battery_powered_outdoor_equipment",
            "e_bike"
          ],
          "evidenceText": "The SMMPA Grand Marais page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
          "reasoningNotes": "Current official page supports category-level forms; separate business rebate links should not be mixed into the residential opportunity."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "opportunityName": "MMPA - Residential Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Minnesota Municipal Power Agency member municipal utilities",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4740/mmpa-residential-energy-efficiency-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential appliance rebates are not commercial dishwasher, commercial refrigeration, or commercial kitchen equipment rebates.",
            "No current official support was found for low-flow fixture retrofits under this residential electric program.",
            "Generic high-efficiency HVAC is too broad; current support is for central air conditioners and air-source heat pumps."
          ],
          "hardRequirements": [
            "Applicant must be a residential electric customer of a participating MMPA member utility.",
            "ENERGY STAR qualification applies to listed appliance categories where required by local forms.",
            "Rebate amount, deadlines, proof of purchase, and eligibility are controlled by the local municipal utility form."
          ],
          "eligibleApplicantTypes": [
            "residential_customers"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_star_appliance_rebate",
            "residential_dishwasher",
            "residential_clothes_washer",
            "residential_refrigerator_freezer",
            "electric_clothes_dryer",
            "dehumidifier",
            "air_purifier",
            "led_lighting_retrofit",
            "ceiling_fan_light_kit",
            "central_air_conditioner",
            "air_source_heat_pump"
          ],
          "evidenceText": "MMPA]( residential conservation materials list rebates for LED lighting, ceiling fans with light kits, ENERGY STAR household appliances, central air conditioners, air-source heat pumps, and appliance recycling.",
          "reasoningNotes": "The current match should be narrowed to residential appliances and residential electric HVAC measures; commercial foodservice and low-flow plumbing categories are false positives."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
          "opportunityName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate",
          "administrator": "Xcel Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4813/xcel-energy-electric-and-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match outside Xcel Energy's Minnesota service territory.",
            "Do not infer commercial, industrial, refrigeration, motors or foodservice measures from this residential program.",
            "Air sealing and insulation should be matched only where the specific envelope rebate requirements are met."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Minnesota residential customer for the relevant fuel and measure.",
            "Insulation and air sealing must meet program requirements and often require participating or registered contractors.",
            "Some insulation rebates require air sealing rather than insulation-only work.",
            "Heat pump HVAC and heat pump water heater rebates require qualifying equipment and contractor or application documentation.",
            "Installation date, invoice and submission deadline rules apply."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater"
          ],
          "evidenceText": "Xcel Energy Minnesota residential rebate materials list insulation and air sealing, heating equipment rebates including heat pumps, and heat pump water heater rebates for qualifying residential customers.",
          "reasoningNotes": "The four supplied retrofit categories are current and properly residential. Matching should enforce Xcel Minnesota service territory and measure-specific contractor and documentation rules."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "programName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_62e8123e06b32401",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "programName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c7bf7c257460020e",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
          "programName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "hpwh_tier",
            "unit_count",
            "xcel_mn_residential_customer",
            "heat_pump_type",
            "fuel_service_or_replacement_situation",
            "unit_count_or_heating_tons",
            "qualifying_efficiency",
            "measure_type",
            "eligible_cost",
            "fuel_or_service_tier",
            "contractor_compliance"
          ],
          "defaultedInputs": [
            {
              "inputKey": "hpwh_tier",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_mn_residential_customer",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heat_pump_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fuel_service_or_replacement_situation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_heating_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualifying_efficiency",
              "source": "synthetic_test_case_default",
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
              "inputKey": "fuel_or_service_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_compliance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 90000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_08bb339151d14cfd",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 40000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_51a1b006a44b3bb4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 50000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_3_907437fa912bd7e1",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "programName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "tons",
            "equipmenttier",
            "energystarstatus",
            "touoroffpeakenrollment",
            "existingappliancerecycling",
            "eceaccount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipmenttier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energystarstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "touoroffpeakenrollment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existingappliancerecycling",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eceaccount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d9ac98dee224a54",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 2500,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "programName": "MMPA - Residential Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "participating_member_utility",
            "local_residential_form",
            "selected_measure",
            "energy_star_qualification_where_applicable",
            "purchase_price",
            "unit_count",
            "member_utility",
            "local_form_amount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "participating_member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_residential_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energy_star_qualification_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_cdf9e736a6dca475",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2500,
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
      "opportunityCount": 4,
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
          "matchedPackageCount": 4,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 4
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Rebate Program",
          "administrator": "East Central Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, ev_charging, hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match broad insulation or window replacement.",
            "Residential refrigerator/freezer is not commercial refrigeration.",
            "EV rebate is not DC fast charging or fleet charging.",
            "Low-flow fixtures are unsupported."
          ],
          "hardRequirements": [
            "Applicant must be an ECE member in ECE service area.",
            "Applications must follow current-year program rules and funding availability.",
            "ASHP, GSHP, and HPWH rebates require program documentation.",
            "EV rebate applies to a qualifying Level 2 charger."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "member_owner",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "residential_refrigerator_freezer_rebate",
            "appliance_recycling",
            "dehumidifier",
            "high_efficiency_clothes_dryer",
            "smart_thermostat"
          ],
          "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
          "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "opportunityName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Princeton PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2555/princeton-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial dishwasher and commercial refrigeration are false positives; the residential page only exposes ENERGY STAR product forms for household products.",
            "Furnace references should be limited to furnace fan motor or ECM rebates, not high-efficiency furnace replacement.",
            "Residential LED lighting is not shown as a 2026 residential rebate form; lighting forms are listed under business rebates.",
            "Ground-source or geothermal heat pump is not verified on the visible 2026 residential form titles and should not be matched unless the current cooling form confirms it.",
            "SMMPA Drive PDFs were linked but not text-readable in the browser; category repair is limited to visible official form titles."
          ],
          "hardRequirements": [
            "Applicant must be a Princeton Public Utilities residential electric customer.",
            "Customer must use the applicable current SMMPA or utility rebate form.",
            "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_appliances",
            "energy_star_residential_dishwasher",
            "energy_star_residential_refrigerator_freezer",
            "heat_pump_water_heater",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "central_air_conditioner_replacement",
            "heat_pump_hvac_retrofit",
            "hvac_tuneup",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm_retrofit",
            "pool_pump",
            "duct_sealing",
            "air_sealing_weatherization",
            "battery_powered_outdoor_equipment",
            "electric_bicycle"
          ],
          "evidenceText": "SMMPA's Princeton page lists 2026 residential forms for ENERGY STAR products and EV chargers plus cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and battery outdoor equipment.",
          "reasoningNotes": "Kept residential categories visible from the current SMMPA page. Business lighting, refrigeration, food service, and motor forms were not treated as residential eligibility."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "opportunityName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Grand Marais PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2539/grand-marais-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
            "Do not match broad LED lighting unless the current residential product form specifically supports it.",
            "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
            "Do not merge the separate SMMPA business rebate list into this residential opportunity."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Grand Marais PUC residential electric customer.",
            "Measures must use the current SMMPA/Grand Marais residential rebate form for the specific product category.",
            "Business rebate categories are separate and must use separate business forms.",
            "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "homeowner",
            "renter_with_utility_account"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_products",
            "energy_star_level_2_ev_charger",
            "residential_cooling_equipment",
            "residential_cooling_tune_up",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm",
            "efficient_pool_pump",
            "aerosol_duct_sealing",
            "battery_powered_outdoor_equipment",
            "e_bike"
          ],
          "evidenceText": "The SMMPA Grand Marais page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
          "reasoningNotes": "Current official page supports category-level forms; separate business rebate links should not be mixed into the residential opportunity."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
          "opportunityName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate",
          "administrator": "Xcel Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4813/xcel-energy-electric-and-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match outside Xcel Energy's Minnesota service territory.",
            "Do not infer commercial, industrial, refrigeration, motors or foodservice measures from this residential program.",
            "Air sealing and insulation should be matched only where the specific envelope rebate requirements are met."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Minnesota residential customer for the relevant fuel and measure.",
            "Insulation and air sealing must meet program requirements and often require participating or registered contractors.",
            "Some insulation rebates require air sealing rather than insulation-only work.",
            "Heat pump HVAC and heat pump water heater rebates require qualifying equipment and contractor or application documentation.",
            "Installation date, invoice and submission deadline rules apply."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater"
          ],
          "evidenceText": "Xcel Energy Minnesota residential rebate materials list insulation and air sealing, heating equipment rebates including heat pumps, and heat pump water heater rebates for qualifying residential customers.",
          "reasoningNotes": "The four supplied retrofit categories are current and properly residential. Matching should enforce Xcel Minnesota service territory and measure-specific contractor and documentation rules."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "programName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_62e8123e06b32401",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "programName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c7bf7c257460020e",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
          "programName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "hpwh_tier",
            "unit_count",
            "xcel_mn_residential_customer",
            "heat_pump_type",
            "fuel_service_or_replacement_situation",
            "unit_count_or_heating_tons",
            "qualifying_efficiency",
            "measure_type",
            "eligible_cost",
            "fuel_or_service_tier",
            "contractor_compliance"
          ],
          "defaultedInputs": [
            {
              "inputKey": "hpwh_tier",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_mn_residential_customer",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heat_pump_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fuel_service_or_replacement_situation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_heating_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualifying_efficiency",
              "source": "synthetic_test_case_default",
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
              "inputKey": "fuel_or_service_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_compliance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 90000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_08bb339151d14cfd",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 40000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_51a1b006a44b3bb4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 50000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_3_907437fa912bd7e1",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "programName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "tons",
            "equipmenttier",
            "energystarstatus",
            "touoroffpeakenrollment",
            "existingappliancerecycling",
            "eceaccount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipmenttier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energystarstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "touoroffpeakenrollment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existingappliancerecycling",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eceaccount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d9ac98dee224a54",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 2500,
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
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Rebate Program",
          "administrator": "East Central Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, ev_charging, hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match broad insulation or window replacement.",
            "Residential refrigerator/freezer is not commercial refrigeration.",
            "EV rebate is not DC fast charging or fleet charging.",
            "Low-flow fixtures are unsupported."
          ],
          "hardRequirements": [
            "Applicant must be an ECE member in ECE service area.",
            "Applications must follow current-year program rules and funding availability.",
            "ASHP, GSHP, and HPWH rebates require program documentation.",
            "EV rebate applies to a qualifying Level 2 charger."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "member_owner",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "residential_refrigerator_freezer_rebate",
            "appliance_recycling",
            "dehumidifier",
            "high_efficiency_clothes_dryer",
            "smart_thermostat"
          ],
          "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
          "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "opportunityName": "MMPA - Residential Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Minnesota Municipal Power Agency member municipal utilities",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4740/mmpa-residential-energy-efficiency-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential appliance rebates are not commercial dishwasher, commercial refrigeration, or commercial kitchen equipment rebates.",
            "No current official support was found for low-flow fixture retrofits under this residential electric program.",
            "Generic high-efficiency HVAC is too broad; current support is for central air conditioners and air-source heat pumps."
          ],
          "hardRequirements": [
            "Applicant must be a residential electric customer of a participating MMPA member utility.",
            "ENERGY STAR qualification applies to listed appliance categories where required by local forms.",
            "Rebate amount, deadlines, proof of purchase, and eligibility are controlled by the local municipal utility form."
          ],
          "eligibleApplicantTypes": [
            "residential_customers"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_star_appliance_rebate",
            "residential_dishwasher",
            "residential_clothes_washer",
            "residential_refrigerator_freezer",
            "electric_clothes_dryer",
            "dehumidifier",
            "air_purifier",
            "led_lighting_retrofit",
            "ceiling_fan_light_kit",
            "central_air_conditioner",
            "air_source_heat_pump"
          ],
          "evidenceText": "MMPA]( residential conservation materials list rebates for LED lighting, ceiling fans with light kits, ENERGY STAR household appliances, central air conditioners, air-source heat pumps, and appliance recycling.",
          "reasoningNotes": "The current match should be narrowed to residential appliances and residential electric HVAC measures; commercial foodservice and low-flow plumbing categories are false positives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "programName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "tons",
            "equipmenttier",
            "energystarstatus",
            "touoroffpeakenrollment",
            "existingappliancerecycling",
            "eceaccount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipmenttier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energystarstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "touoroffpeakenrollment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existingappliancerecycling",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eceaccount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d9ac98dee224a54",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 2500,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "programName": "MMPA - Residential Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "participating_member_utility",
            "local_residential_form",
            "selected_measure",
            "energy_star_qualification_where_applicable",
            "purchase_price",
            "unit_count",
            "member_utility",
            "local_form_amount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "participating_member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_residential_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energy_star_qualification_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_cdf9e736a6dca475",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2500,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 10000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 960000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 960000,
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
          "upfrontCostAfterSavingsCents": 10000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5417",
          "opportunityName": "Xcel Energy - Solar*Rewards Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Performance-Based Incentive",
          "administrator": "Xcel Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5417/xcel-energy-solar-rewards-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Production or net metering required for the solar program is not a standalone submetering or energy-monitoring retrofit.",
            "Non-PV solar thermal measures are not supported.",
            "Projects outside Xcel's Minnesota electric territory should not match."
          ],
          "hardRequirements": [
            "Customer must be in Xcel Energy's Minnesota electric service territory.",
            "Project must be a grid-connected solar PV system meeting Xcel Solar*Rewards requirements.",
            "Program participation, metering, interconnection, system-size, and production-payment rules apply, including current Xcel Solar*Rewards terms.",
            "Available funds and enrollment terms should be checked before matching."
          ],
          "eligibleApplicantTypes": [
            "xcel_energy_electric_customer",
            "residential_customer",
            "commercial_customer",
            "solar_customer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "rooftop_solar_pv"
          ],
          "evidenceText": "Xcel's]( Minnesota renewable-energy page describes Solar*Rewards payments and bill credits for customers who install solar panels.",
          "reasoningNotes": "The solar PV match is supported. The submetering match is a false positive from program metering language and should be blocked."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:727",
          "opportunityName": "Residential Energy Conservation Subsidy Exclusion (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Exemption",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/727/residential-energy-conservation-subsidy-exclusion-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match this record as a standalone rooftop solar PV rebate or solar water heating incentive.",
            "A separate public utility subsidy must exist and qualify before the federal exclusion is relevant.",
            "Do not match non-dwelling or purely nonresidential measures except any allocable dwelling-unit portion allowed by tax rules."
          ],
          "hardRequirements": [
            "Subsidy must be provided directly or indirectly by a public utility.",
            "Subsidy must be for purchase or installation of an energy conservation measure for a dwelling unit.",
            "Measure must primarily reduce electricity or natural gas consumption or improve energy demand management.",
            "Taxpayer must apply federal tax exclusion, basis reduction, and no-double-benefit rules where applicable."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayers",
            "business_entities_receiving_utility_subsidies_for_dwelling_units",
            "public_utility_customers"
          ],
          "eligibleSectors": [
            "residential",
            "corporate_taxpayer",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_conservation_measure_subsidy",
            "residential_demand_management_measure_subsidy",
            "utility_subsidy_tax_exclusion"
          ],
          "evidenceText": "IRS Publication 525 and IRC Section 136 exclude qualifying public utility subsidies for residential energy conservation measures from gross income; this record is tax treatment, not a standalone retrofit rebate.",
          "reasoningNotes": "Do not retain rooftop solar PV or solar water heating as direct retrofit categories. The exclusion may apply to qualifying utility subsidies, but it is not itself a solar incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:666",
          "opportunityName": "Residential Energy Conservation Subsidy Exclusion (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Exemption",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/666/residential-energy-conservation-subsidy-exclusion-personal",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match this record as a standalone rooftop solar PV rebate or solar water heating incentive.",
            "A separate public utility subsidy must exist and qualify before the federal exclusion is relevant.",
            "Do not match non-dwelling or purely nonresidential measures except any allocable dwelling-unit portion allowed by tax rules."
          ],
          "hardRequirements": [
            "Subsidy must be provided directly or indirectly by a public utility.",
            "Subsidy must be for purchase or installation of an energy conservation measure for a dwelling unit.",
            "Measure must primarily reduce electricity or natural gas consumption or improve energy demand management.",
            "Taxpayer must apply federal tax exclusion, basis reduction, and no-double-benefit rules where applicable."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayers",
            "residential_public_utility_customers",
            "homeowners",
            "renters"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_conservation_measure_subsidy",
            "residential_demand_management_measure_subsidy",
            "utility_subsidy_tax_exclusion"
          ],
          "evidenceText": "IRS guidance permits taxpayers to exclude qualifying public utility subsidies for dwelling-unit energy conservation or demand-management measures; the exclusion does not itself fund solar or other installations.",
          "reasoningNotes": "Do not retain rooftop solar PV or solar water heating as direct retrofit categories. The personal exclusion is tax treatment for qualifying public-utility residential subsidies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1218",
          "opportunityName": "Solar Energy Sales Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Sales Tax Incentive",
          "administrator": "Minnesota Department of Revenue",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.83,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1218/solar-energy-sales-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MN matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match non-solar water heating, generic thermal storage, or standalone batteries.",
            "Solar storage is only supported when it is part of the solar energy system definition.",
            "Wind, geothermal, and ordinary building-efficiency measures are not supported by this solar-energy sales-tax exemption."
          ],
          "hardRequirements": [
            "Purchase must qualify as a solar energy system under Minnesota law.",
            "System must collect, transfer, store, or use solar energy for qualifying thermal or power purposes.",
            "Seller and purchaser must document the nontaxable sale or exemption as required by Minnesota Revenue rules."
          ],
          "eligibleApplicantTypes": [
            "purchaser",
            "property_owner",
            "business",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "solar_space_heating_system"
          ],
          "evidenceText": "Minnesota]( Revenue lists solar energy systems as nontaxable sales under the solar-energy-system statutes, supporting solar electric and solar thermal uses.",
          "reasoningNotes": "The rooftop solar PV and solar water heating matches are supported. Add solar space heating because the statutory definition includes solar heating of buildings."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Rebate Program",
          "administrator": "East Central Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, ev_charging, hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match broad insulation or window replacement.",
            "Residential refrigerator/freezer is not commercial refrigeration.",
            "EV rebate is not DC fast charging or fleet charging.",
            "Low-flow fixtures are unsupported."
          ],
          "hardRequirements": [
            "Applicant must be an ECE member in ECE service area.",
            "Applications must follow current-year program rules and funding availability.",
            "ASHP, GSHP, and HPWH rebates require program documentation.",
            "EV rebate applies to a qualifying Level 2 charger."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "member_owner",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "residential_refrigerator_freezer_rebate",
            "appliance_recycling",
            "dehumidifier",
            "high_efficiency_clothes_dryer",
            "smart_thermostat"
          ],
          "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
          "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "programName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "tons",
            "equipmenttier",
            "energystarstatus",
            "touoroffpeakenrollment",
            "existingappliancerecycling",
            "eceaccount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipmenttier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energystarstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "touoroffpeakenrollment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existingappliancerecycling",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eceaccount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d9ac98dee224a54",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 2500,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_furnace_retrofit",
      "displayName": "High-efficiency furnace retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 350000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 56000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 56000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "opportunityName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Natural-Gas Rebate Program",
          "administrator": "Minnesota Energy Resources",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3310/minnesota-energy-resources-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Waste heat recovery was a false positive; the checked program supports residential HRV and ERV, not industrial waste heat recovery.",
            "Do not match electric heat pumps or electric utility measures.",
            "Do not match new homes under the existing-home rebate rules where the program excludes homes built in the past two years.",
            "Do not match customers outside the Minnesota Energy Resources gas territory."
          ],
          "hardRequirements": [
            "Home must be served by Minnesota Energy Resources and meet natural-gas heating requirements for the relevant measure.",
            "Air sealing and insulation require approved insulation contractor participation and diagnostic testing where specified.",
            "Aerosol duct sealing must meet reduction requirements and contractor certification rules; mastic or tape duct sealing does not qualify.",
            "Windows must be ENERGY STAR Version 7 and installed by a qualifying contractor for conditioned space.",
            "Heating, thermostat, HRV, ERV and water-heating rebates have equipment, application-timing and per-service limits."
          ],
          "eligibleApplicantTypes": [
            "residential_natural_gas_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "duct_sealing_and_insulation",
            "window_replacement",
            "high_efficiency_furnace_retrofit",
            "high_efficiency_boiler_retrofit",
            "integrated_space_water_heating_system",
            "energy_recovery_ventilation_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heating_system_tune_up",
            "water_heater_upgrade",
            "low_flow_showerheads_and_aerators"
          ],
          "evidenceText": "Minnesota]( Energy Resources lists existing-home rebates for insulation, air sealing, aerosol duct sealing, ENERGY STAR windows, gas furnaces and boilers, HRV or ERV, thermostats and water-heating measures.",
          "reasoningNotes": "Retained gas-residential envelope, duct, heating, ventilation and thermostat measures. Removed industrial waste-heat recovery and any implied electric-utility or heat-pump rebates."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "programName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "eligiblecost",
            "cfmreduction",
            "afue",
            "windowcount",
            "affordablehousingstatus",
            "naturalgasheatingstatus",
            "homeageyears",
            "eligiblecostorcfmreduction"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "afue",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "windowcount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "affordablehousingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "naturalgasheatingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "homeageyears",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecostorcfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 250,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_295902f08bab4fb1",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250,
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
      "opportunityCount": 3,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
          "opportunityName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate",
          "administrator": "Xcel Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4813/xcel-energy-electric-and-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match outside Xcel Energy's Minnesota service territory.",
            "Do not infer commercial, industrial, refrigeration, motors or foodservice measures from this residential program.",
            "Air sealing and insulation should be matched only where the specific envelope rebate requirements are met."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Minnesota residential customer for the relevant fuel and measure.",
            "Insulation and air sealing must meet program requirements and often require participating or registered contractors.",
            "Some insulation rebates require air sealing rather than insulation-only work.",
            "Heat pump HVAC and heat pump water heater rebates require qualifying equipment and contractor or application documentation.",
            "Installation date, invoice and submission deadline rules apply."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater"
          ],
          "evidenceText": "Xcel Energy Minnesota residential rebate materials list insulation and air sealing, heating equipment rebates including heat pumps, and heat pump water heater rebates for qualifying residential customers.",
          "reasoningNotes": "The four supplied retrofit categories are current and properly residential. Matching should enforce Xcel Minnesota service territory and measure-specific contractor and documentation rules."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "opportunityName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Natural-Gas Rebate Program",
          "administrator": "Minnesota Energy Resources",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3310/minnesota-energy-resources-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Waste heat recovery was a false positive; the checked program supports residential HRV and ERV, not industrial waste heat recovery.",
            "Do not match electric heat pumps or electric utility measures.",
            "Do not match new homes under the existing-home rebate rules where the program excludes homes built in the past two years.",
            "Do not match customers outside the Minnesota Energy Resources gas territory."
          ],
          "hardRequirements": [
            "Home must be served by Minnesota Energy Resources and meet natural-gas heating requirements for the relevant measure.",
            "Air sealing and insulation require approved insulation contractor participation and diagnostic testing where specified.",
            "Aerosol duct sealing must meet reduction requirements and contractor certification rules; mastic or tape duct sealing does not qualify.",
            "Windows must be ENERGY STAR Version 7 and installed by a qualifying contractor for conditioned space.",
            "Heating, thermostat, HRV, ERV and water-heating rebates have equipment, application-timing and per-service limits."
          ],
          "eligibleApplicantTypes": [
            "residential_natural_gas_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "duct_sealing_and_insulation",
            "window_replacement",
            "high_efficiency_furnace_retrofit",
            "high_efficiency_boiler_retrofit",
            "integrated_space_water_heating_system",
            "energy_recovery_ventilation_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heating_system_tune_up",
            "water_heater_upgrade",
            "low_flow_showerheads_and_aerators"
          ],
          "evidenceText": "Minnesota]( Energy Resources lists existing-home rebates for insulation, air sealing, aerosol duct sealing, ENERGY STAR windows, gas furnaces and boilers, HRV or ERV, thermostats and water-heating measures.",
          "reasoningNotes": "Retained gas-residential envelope, duct, heating, ventilation and thermostat measures. Removed industrial waste-heat recovery and any implied electric-utility or heat-pump rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1188",
          "opportunityName": "Home Energy Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan",
          "administrator": "Center for Energy and Environment",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1188/home-energy-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial, industrial, or non-owner-occupied projects.",
            "Do not treat as a grant or rebate.",
            "Do not match measures outside the lender-approved energy improvement scope."
          ],
          "hardRequirements": [
            "Property must be a one-to-four-unit owner-occupied primary residence.",
            "Loan approval is subject to credit and program guidelines.",
            "Improvements must be energy-related and program-eligible.",
            "Properties held in trust are not eligible.",
            "This is loan financing, not a rebate."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "owner_occupant",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "high_efficiency_hvac_replacement",
            "insulation_upgrade",
            "window_replacement",
            "efficient_water_heater"
          ],
          "evidenceText": "CEE states that eligible home energy loan improvements include heating and cooling systems, windows, water heaters, and insulation for owner-occupied one-to-four-unit homes.",
          "reasoningNotes": "Both original matches are supportable, but the opportunity should remain typed as financing rather than rebate support."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
          "programName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "hpwh_tier",
            "unit_count",
            "xcel_mn_residential_customer",
            "heat_pump_type",
            "fuel_service_or_replacement_situation",
            "unit_count_or_heating_tons",
            "qualifying_efficiency",
            "measure_type",
            "eligible_cost",
            "fuel_or_service_tier",
            "contractor_compliance"
          ],
          "defaultedInputs": [
            {
              "inputKey": "hpwh_tier",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_mn_residential_customer",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heat_pump_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fuel_service_or_replacement_situation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_heating_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualifying_efficiency",
              "source": "synthetic_test_case_default",
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
              "inputKey": "fuel_or_service_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_compliance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 90000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_08bb339151d14cfd",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 40000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_51a1b006a44b3bb4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 50000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_3_907437fa912bd7e1",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "programName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "eligiblecost",
            "cfmreduction",
            "afue",
            "windowcount",
            "affordablehousingstatus",
            "naturalgasheatingstatus",
            "homeageyears",
            "eligiblecostorcfmreduction"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "afue",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "windowcount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "affordablehousingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "naturalgasheatingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "homeageyears",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecostorcfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 250,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_295902f08bab4fb1",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250,
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
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "opportunityName": "MMPA - Residential Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Minnesota Municipal Power Agency member municipal utilities",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4740/mmpa-residential-energy-efficiency-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential appliance rebates are not commercial dishwasher, commercial refrigeration, or commercial kitchen equipment rebates.",
            "No current official support was found for low-flow fixture retrofits under this residential electric program.",
            "Generic high-efficiency HVAC is too broad; current support is for central air conditioners and air-source heat pumps."
          ],
          "hardRequirements": [
            "Applicant must be a residential electric customer of a participating MMPA member utility.",
            "ENERGY STAR qualification applies to listed appliance categories where required by local forms.",
            "Rebate amount, deadlines, proof of purchase, and eligibility are controlled by the local municipal utility form."
          ],
          "eligibleApplicantTypes": [
            "residential_customers"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_star_appliance_rebate",
            "residential_dishwasher",
            "residential_clothes_washer",
            "residential_refrigerator_freezer",
            "electric_clothes_dryer",
            "dehumidifier",
            "air_purifier",
            "led_lighting_retrofit",
            "ceiling_fan_light_kit",
            "central_air_conditioner",
            "air_source_heat_pump"
          ],
          "evidenceText": "MMPA]( residential conservation materials list rebates for LED lighting, ceiling fans with light kits, ENERGY STAR household appliances, central air conditioners, air-source heat pumps, and appliance recycling.",
          "reasoningNotes": "The current match should be narrowed to residential appliances and residential electric HVAC measures; commercial foodservice and low-flow plumbing categories are false positives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "programName": "MMPA - Residential Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "participating_member_utility",
            "local_residential_form",
            "selected_measure",
            "energy_star_qualification_where_applicable",
            "purchase_price",
            "unit_count",
            "member_utility",
            "local_form_amount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "participating_member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_residential_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energy_star_qualification_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 30000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_cdf9e736a6dca475",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 30000,
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
      "opportunityCount": 3,
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
          "matchedPackageCount": 3,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 3
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Rebate Program",
          "administrator": "East Central Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, ev_charging, hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match broad insulation or window replacement.",
            "Residential refrigerator/freezer is not commercial refrigeration.",
            "EV rebate is not DC fast charging or fleet charging.",
            "Low-flow fixtures are unsupported."
          ],
          "hardRequirements": [
            "Applicant must be an ECE member in ECE service area.",
            "Applications must follow current-year program rules and funding availability.",
            "ASHP, GSHP, and HPWH rebates require program documentation.",
            "EV rebate applies to a qualifying Level 2 charger."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "member_owner",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "residential_refrigerator_freezer_rebate",
            "appliance_recycling",
            "dehumidifier",
            "high_efficiency_clothes_dryer",
            "smart_thermostat"
          ],
          "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
          "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "opportunityName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Princeton PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2555/princeton-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial dishwasher and commercial refrigeration are false positives; the residential page only exposes ENERGY STAR product forms for household products.",
            "Furnace references should be limited to furnace fan motor or ECM rebates, not high-efficiency furnace replacement.",
            "Residential LED lighting is not shown as a 2026 residential rebate form; lighting forms are listed under business rebates.",
            "Ground-source or geothermal heat pump is not verified on the visible 2026 residential form titles and should not be matched unless the current cooling form confirms it.",
            "SMMPA Drive PDFs were linked but not text-readable in the browser; category repair is limited to visible official form titles."
          ],
          "hardRequirements": [
            "Applicant must be a Princeton Public Utilities residential electric customer.",
            "Customer must use the applicable current SMMPA or utility rebate form.",
            "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_appliances",
            "energy_star_residential_dishwasher",
            "energy_star_residential_refrigerator_freezer",
            "heat_pump_water_heater",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "central_air_conditioner_replacement",
            "heat_pump_hvac_retrofit",
            "hvac_tuneup",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm_retrofit",
            "pool_pump",
            "duct_sealing",
            "air_sealing_weatherization",
            "battery_powered_outdoor_equipment",
            "electric_bicycle"
          ],
          "evidenceText": "SMMPA's Princeton page lists 2026 residential forms for ENERGY STAR products and EV chargers plus cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and battery outdoor equipment.",
          "reasoningNotes": "Kept residential categories visible from the current SMMPA page. Business lighting, refrigeration, food service, and motor forms were not treated as residential eligibility."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "opportunityName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Grand Marais PUC",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2539/grand-marais-puc-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, ev_charging, hvac, refrigeration, building_controls, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
            "Do not match broad LED lighting unless the current residential product form specifically supports it.",
            "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
            "Do not merge the separate SMMPA business rebate list into this residential opportunity."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Grand Marais PUC residential electric customer.",
            "Measures must use the current SMMPA/Grand Marais residential rebate form for the specific product category.",
            "Business rebate categories are separate and must use separate business forms.",
            "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "homeowner",
            "renter_with_utility_account"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_star_residential_products",
            "energy_star_level_2_ev_charger",
            "residential_cooling_equipment",
            "residential_cooling_tune_up",
            "ecm_circulator_pump",
            "furnace_fan_motor_ecm",
            "efficient_pool_pump",
            "aerosol_duct_sealing",
            "battery_powered_outdoor_equipment",
            "e_bike"
          ],
          "evidenceText": "The SMMPA Grand Marais page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
          "reasoningNotes": "Current official page supports category-level forms; separate business rebate links should not be mixed into the residential opportunity."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
          "programName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_62e8123e06b32401",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
          "programName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_type",
            "participating_utility_confirmation",
            "unit_count",
            "proof_of_purchase",
            "connection_status_for_chargepoint"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_utility_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "proof_of_purchase",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "connection_status_for_chargepoint",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c7bf7c257460020e",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "programName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "tons",
            "equipmenttier",
            "energystarstatus",
            "touoroffpeakenrollment",
            "existingappliancerecycling",
            "eceaccount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipmenttier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energystarstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "touoroffpeakenrollment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existingappliancerecycling",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eceaccount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 40000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d9ac98dee224a54",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 40000,
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
      "opportunityCount": 3,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:727",
          "opportunityName": "Residential Energy Conservation Subsidy Exclusion (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Exemption",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/727/residential-energy-conservation-subsidy-exclusion-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match this record as a standalone rooftop solar PV rebate or solar water heating incentive.",
            "A separate public utility subsidy must exist and qualify before the federal exclusion is relevant.",
            "Do not match non-dwelling or purely nonresidential measures except any allocable dwelling-unit portion allowed by tax rules."
          ],
          "hardRequirements": [
            "Subsidy must be provided directly or indirectly by a public utility.",
            "Subsidy must be for purchase or installation of an energy conservation measure for a dwelling unit.",
            "Measure must primarily reduce electricity or natural gas consumption or improve energy demand management.",
            "Taxpayer must apply federal tax exclusion, basis reduction, and no-double-benefit rules where applicable."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayers",
            "business_entities_receiving_utility_subsidies_for_dwelling_units",
            "public_utility_customers"
          ],
          "eligibleSectors": [
            "residential",
            "corporate_taxpayer",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_conservation_measure_subsidy",
            "residential_demand_management_measure_subsidy",
            "utility_subsidy_tax_exclusion"
          ],
          "evidenceText": "IRS Publication 525 and IRC Section 136 exclude qualifying public utility subsidies for residential energy conservation measures from gross income; this record is tax treatment, not a standalone retrofit rebate.",
          "reasoningNotes": "Do not retain rooftop solar PV or solar water heating as direct retrofit categories. The exclusion may apply to qualifying utility subsidies, but it is not itself a solar incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:666",
          "opportunityName": "Residential Energy Conservation Subsidy Exclusion (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Exemption",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/666/residential-energy-conservation-subsidy-exclusion-personal",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match this record as a standalone rooftop solar PV rebate or solar water heating incentive.",
            "A separate public utility subsidy must exist and qualify before the federal exclusion is relevant.",
            "Do not match non-dwelling or purely nonresidential measures except any allocable dwelling-unit portion allowed by tax rules."
          ],
          "hardRequirements": [
            "Subsidy must be provided directly or indirectly by a public utility.",
            "Subsidy must be for purchase or installation of an energy conservation measure for a dwelling unit.",
            "Measure must primarily reduce electricity or natural gas consumption or improve energy demand management.",
            "Taxpayer must apply federal tax exclusion, basis reduction, and no-double-benefit rules where applicable."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayers",
            "residential_public_utility_customers",
            "homeowners",
            "renters"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_conservation_measure_subsidy",
            "residential_demand_management_measure_subsidy",
            "utility_subsidy_tax_exclusion"
          ],
          "evidenceText": "IRS guidance permits taxpayers to exclude qualifying public utility subsidies for dwelling-unit energy conservation or demand-management measures; the exclusion does not itself fund solar or other installations.",
          "reasoningNotes": "Do not retain rooftop solar PV or solar water heating as direct retrofit categories. The personal exclusion is tax treatment for qualifying public-utility residential subsidies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1218",
          "opportunityName": "Solar Energy Sales Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Sales Tax Incentive",
          "administrator": "Minnesota Department of Revenue",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.83,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1218/solar-energy-sales-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MN matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match non-solar water heating, generic thermal storage, or standalone batteries.",
            "Solar storage is only supported when it is part of the solar energy system definition.",
            "Wind, geothermal, and ordinary building-efficiency measures are not supported by this solar-energy sales-tax exemption."
          ],
          "hardRequirements": [
            "Purchase must qualify as a solar energy system under Minnesota law.",
            "System must collect, transfer, store, or use solar energy for qualifying thermal or power purposes.",
            "Seller and purchaser must document the nontaxable sale or exemption as required by Minnesota Revenue rules."
          ],
          "eligibleApplicantTypes": [
            "purchaser",
            "property_owner",
            "business",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "solar_space_heating_system"
          ],
          "evidenceText": "Minnesota]( Revenue lists solar energy systems as nontaxable sales under the solar-energy-system statutes, supporting solar electric and solar thermal uses.",
          "reasoningNotes": "The rooftop solar PV and solar water heating matches are supported. Add solar space heating because the statutory definition includes solar heating of buildings."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
          "opportunityName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate",
          "administrator": "Xcel Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4813/xcel-energy-electric-and-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match outside Xcel Energy's Minnesota service territory.",
            "Do not infer commercial, industrial, refrigeration, motors or foodservice measures from this residential program.",
            "Air sealing and insulation should be matched only where the specific envelope rebate requirements are met."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Minnesota residential customer for the relevant fuel and measure.",
            "Insulation and air sealing must meet program requirements and often require participating or registered contractors.",
            "Some insulation rebates require air sealing rather than insulation-only work.",
            "Heat pump HVAC and heat pump water heater rebates require qualifying equipment and contractor or application documentation.",
            "Installation date, invoice and submission deadline rules apply."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater"
          ],
          "evidenceText": "Xcel Energy Minnesota residential rebate materials list insulation and air sealing, heating equipment rebates including heat pumps, and heat pump water heater rebates for qualifying residential customers.",
          "reasoningNotes": "The four supplied retrofit categories are current and properly residential. Matching should enforce Xcel Minnesota service territory and measure-specific contractor and documentation rules."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "opportunityName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Natural-Gas Rebate Program",
          "administrator": "Minnesota Energy Resources",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3310/minnesota-energy-resources-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Waste heat recovery was a false positive; the checked program supports residential HRV and ERV, not industrial waste heat recovery.",
            "Do not match electric heat pumps or electric utility measures.",
            "Do not match new homes under the existing-home rebate rules where the program excludes homes built in the past two years.",
            "Do not match customers outside the Minnesota Energy Resources gas territory."
          ],
          "hardRequirements": [
            "Home must be served by Minnesota Energy Resources and meet natural-gas heating requirements for the relevant measure.",
            "Air sealing and insulation require approved insulation contractor participation and diagnostic testing where specified.",
            "Aerosol duct sealing must meet reduction requirements and contractor certification rules; mastic or tape duct sealing does not qualify.",
            "Windows must be ENERGY STAR Version 7 and installed by a qualifying contractor for conditioned space.",
            "Heating, thermostat, HRV, ERV and water-heating rebates have equipment, application-timing and per-service limits."
          ],
          "eligibleApplicantTypes": [
            "residential_natural_gas_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "duct_sealing_and_insulation",
            "window_replacement",
            "high_efficiency_furnace_retrofit",
            "high_efficiency_boiler_retrofit",
            "integrated_space_water_heating_system",
            "energy_recovery_ventilation_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heating_system_tune_up",
            "water_heater_upgrade",
            "low_flow_showerheads_and_aerators"
          ],
          "evidenceText": "Minnesota]( Energy Resources lists existing-home rebates for insulation, air sealing, aerosol duct sealing, ENERGY STAR windows, gas furnaces and boilers, HRV or ERV, thermostats and water-heating measures.",
          "reasoningNotes": "Retained gas-residential envelope, duct, heating, ventilation and thermostat measures. Removed industrial waste-heat recovery and any implied electric-utility or heat-pump rebates."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
          "programName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "hpwh_tier",
            "unit_count",
            "xcel_mn_residential_customer",
            "heat_pump_type",
            "fuel_service_or_replacement_situation",
            "unit_count_or_heating_tons",
            "qualifying_efficiency",
            "measure_type",
            "eligible_cost",
            "fuel_or_service_tier",
            "contractor_compliance"
          ],
          "defaultedInputs": [
            {
              "inputKey": "hpwh_tier",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_mn_residential_customer",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heat_pump_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fuel_service_or_replacement_situation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_heating_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualifying_efficiency",
              "source": "synthetic_test_case_default",
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
              "inputKey": "fuel_or_service_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_compliance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 90000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_08bb339151d14cfd",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 40000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_51a1b006a44b3bb4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 50000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_3_907437fa912bd7e1",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "programName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "eligiblecost",
            "cfmreduction",
            "afue",
            "windowcount",
            "affordablehousingstatus",
            "naturalgasheatingstatus",
            "homeageyears",
            "eligiblecostorcfmreduction"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "afue",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "windowcount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "affordablehousingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "naturalgasheatingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "homeageyears",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecostorcfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 250,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_295902f08bab4fb1",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "low_flow_fixture_retrofit",
      "displayName": "Low-flow fixture retrofit",
      "parentCategory": "water_efficiency",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 116400,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 90000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 90000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5780",
          "opportunityName": "Fannie Mae Green Financing – Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Multifamily Green Mortgage Loan",
          "administrator": "Fannie Mae Multifamily",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5780/fannie-mae-green-financing-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: water_efficiency, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is mortgage financing, not a rebate paid directly to tenants or homeowners.",
            "Do not match single-family properties.",
            "Low-flow fixtures are supported only as eligible multifamily water-efficiency improvements."
          ],
          "hardRequirements": [
            "Property must be a qualifying multifamily property financed through an eligible Fannie Mae green mortgage product.",
            "Green Rewards requires a High Performance Building report or equivalent energy and water assessment.",
            "Borrower must implement eligible energy or water efficiency measures under loan terms.",
            "Solar PV and larger proceeds requests may require additional Fannie Mae review."
          ],
          "eligibleApplicantTypes": [
            "multifamily_borrower",
            "multifamily_property_owner",
            "fannie_mae_lender"
          ],
          "eligibleSectors": [
            "multifamily_housing"
          ],
          "eligibleRetrofitCategories": [
            "low_flow_fixture_retrofit",
            "multifamily_energy_water_audit",
            "energy_efficient_hvac",
            "led_lighting",
            "energy_star_appliances",
            "solar_pv_system"
          ],
          "evidenceText": "Fannie Mae Green Rewards materials list energy and water efficiency improvements, including WaterSense low-flow fixtures, for qualifying multifamily green mortgage loans.",
          "reasoningNotes": "The low-flow fixture match is valid, but only as a multifamily loan-supported water-efficiency measure."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "smart_thermostat_zoning_retrofit",
      "displayName": "Smart thermostat / zoning retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
          "matchedPackageCount": 2,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3312",
          "opportunityName": "Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "New Construction Rebate Program",
          "administrator": "Minnesota Energy Resources",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3312/minnesota-energy-resources-gas-home-energy-excellence-program-for-builders-or-homeowners",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not an existing-home retrofit rebate.",
            "Do not match industrial waste heat recovery.",
            "Do not match generic smart thermostat retrofits unless tied to the eligible new-home program measure.",
            "Do not match electric-utility programs outside Minnesota Energy Resources gas territory."
          ],
          "hardRequirements": [
            "Home must be new construction served by Minnesota Energy Resources natural gas.",
            "Project must complete required plan review, inspections, and HERS rating steps.",
            "Home must meet program performance requirements, including exceeding energy code by the specified threshold."
          ],
          "eligibleApplicantTypes": [
            "home_builder",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential",
            "new_construction"
          ],
          "eligibleRetrofitCategories": [
            "new_home_whole_building_energy_efficiency",
            "advanced_or_wifi_thermostat",
            "drain_water_heat_recovery"
          ],
          "evidenceText": "Minnesota Energy Resources describes Home Energy Excellence for builders of new natural-gas homes, using plan review, inspections, HERS ratings, and rebates for qualifying efficient new-home measures.",
          "reasoningNotes": "Repair the false positive: heat recovery is drain water heat recovery in residential new construction, not industrial waste heat recovery."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Rebate Program",
          "administrator": "East Central Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, ev_charging, hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match broad insulation or window replacement.",
            "Residential refrigerator/freezer is not commercial refrigeration.",
            "EV rebate is not DC fast charging or fleet charging.",
            "Low-flow fixtures are unsupported."
          ],
          "hardRequirements": [
            "Applicant must be an ECE member in ECE service area.",
            "Applications must follow current-year program rules and funding availability.",
            "ASHP, GSHP, and HPWH rebates require program documentation.",
            "EV rebate applies to a qualifying Level 2 charger."
          ],
          "eligibleApplicantTypes": [
            "residential_electric_customer",
            "member_owner",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "level_2_ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_hvac_replacement",
            "residential_refrigerator_freezer_rebate",
            "appliance_recycling",
            "dehumidifier",
            "high_efficiency_clothes_dryer",
            "smart_thermostat"
          ],
          "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
          "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3312",
          "programName": "Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "missing_inputs",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [
            {
              "inputKey": "measure_type",
              "effectId": "effect_one_time_savings_1_ac3ec4ddc8401b13",
              "label": "measure_type"
            }
          ],
          "requiredInputs": [
            "percent_savings_above_code",
            "low_income_housing_status",
            "thermostat_cost",
            "drain_water_heat_recovery_cost",
            "new_home_gas_service_confirmation",
            "measure_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "percent_savings_above_code",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "low_income_housing_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "thermostat_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "drain_water_heat_recovery_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_home_gas_service_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_cost",
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
              "effectId": "effect_one_time_savings_1_ac3ec4ddc8401b13",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": [
                "measure_type"
              ]
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
          "programName": "East Central Energy - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "tons",
            "equipmenttier",
            "energystarstatus",
            "touoroffpeakenrollment",
            "existingappliancerecycling",
            "eceaccount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipmenttier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energystarstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "touoroffpeakenrollment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existingappliancerecycling",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eceaccount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d9ac98dee224a54",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 2500,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "opportunityName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Natural-Gas Rebate Program",
          "administrator": "Minnesota Energy Resources",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3310/minnesota-energy-resources-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Waste heat recovery was a false positive; the checked program supports residential HRV and ERV, not industrial waste heat recovery.",
            "Do not match electric heat pumps or electric utility measures.",
            "Do not match new homes under the existing-home rebate rules where the program excludes homes built in the past two years.",
            "Do not match customers outside the Minnesota Energy Resources gas territory."
          ],
          "hardRequirements": [
            "Home must be served by Minnesota Energy Resources and meet natural-gas heating requirements for the relevant measure.",
            "Air sealing and insulation require approved insulation contractor participation and diagnostic testing where specified.",
            "Aerosol duct sealing must meet reduction requirements and contractor certification rules; mastic or tape duct sealing does not qualify.",
            "Windows must be ENERGY STAR Version 7 and installed by a qualifying contractor for conditioned space.",
            "Heating, thermostat, HRV, ERV and water-heating rebates have equipment, application-timing and per-service limits."
          ],
          "eligibleApplicantTypes": [
            "residential_natural_gas_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "duct_sealing_and_insulation",
            "window_replacement",
            "high_efficiency_furnace_retrofit",
            "high_efficiency_boiler_retrofit",
            "integrated_space_water_heating_system",
            "energy_recovery_ventilation_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heating_system_tune_up",
            "water_heater_upgrade",
            "low_flow_showerheads_and_aerators"
          ],
          "evidenceText": "Minnesota]( Energy Resources lists existing-home rebates for insulation, air sealing, aerosol duct sealing, ENERGY STAR windows, gas furnaces and boilers, HRV or ERV, thermostats and water-heating measures.",
          "reasoningNotes": "Retained gas-residential envelope, duct, heating, ventilation and thermostat measures. Removed industrial waste-heat recovery and any implied electric-utility or heat-pump rebates."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "programName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "eligiblecost",
            "cfmreduction",
            "afue",
            "windowcount",
            "affordablehousingstatus",
            "naturalgasheatingstatus",
            "homeageyears",
            "eligiblecostorcfmreduction"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "afue",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "windowcount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "affordablehousingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "naturalgasheatingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "homeageyears",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecostorcfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 250,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_295902f08bab4fb1",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "energy_recovery_ventilation_retrofit",
      "displayName": "Energy recovery ventilation retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 370800,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 126000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 126000,
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
          "upfrontCostAfterSavingsCents": 370800,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "opportunityName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Natural-Gas Rebate Program",
          "administrator": "Minnesota Energy Resources",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3310/minnesota-energy-resources-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Waste heat recovery was a false positive; the checked program supports residential HRV and ERV, not industrial waste heat recovery.",
            "Do not match electric heat pumps or electric utility measures.",
            "Do not match new homes under the existing-home rebate rules where the program excludes homes built in the past two years.",
            "Do not match customers outside the Minnesota Energy Resources gas territory."
          ],
          "hardRequirements": [
            "Home must be served by Minnesota Energy Resources and meet natural-gas heating requirements for the relevant measure.",
            "Air sealing and insulation require approved insulation contractor participation and diagnostic testing where specified.",
            "Aerosol duct sealing must meet reduction requirements and contractor certification rules; mastic or tape duct sealing does not qualify.",
            "Windows must be ENERGY STAR Version 7 and installed by a qualifying contractor for conditioned space.",
            "Heating, thermostat, HRV, ERV and water-heating rebates have equipment, application-timing and per-service limits."
          ],
          "eligibleApplicantTypes": [
            "residential_natural_gas_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "duct_sealing_and_insulation",
            "window_replacement",
            "high_efficiency_furnace_retrofit",
            "high_efficiency_boiler_retrofit",
            "integrated_space_water_heating_system",
            "energy_recovery_ventilation_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heating_system_tune_up",
            "water_heater_upgrade",
            "low_flow_showerheads_and_aerators"
          ],
          "evidenceText": "Minnesota]( Energy Resources lists existing-home rebates for insulation, air sealing, aerosol duct sealing, ENERGY STAR windows, gas furnaces and boilers, HRV or ERV, thermostats and water-heating measures.",
          "reasoningNotes": "Retained gas-residential envelope, duct, heating, ventilation and thermostat measures. Removed industrial waste-heat recovery and any implied electric-utility or heat-pump rebates."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "programName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "eligiblecost",
            "cfmreduction",
            "afue",
            "windowcount",
            "affordablehousingstatus",
            "naturalgasheatingstatus",
            "homeageyears",
            "eligiblecostorcfmreduction"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "afue",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "windowcount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "affordablehousingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "naturalgasheatingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "homeageyears",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecostorcfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 250,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_295902f08bab4fb1",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_boiler_retrofit",
      "displayName": "High-efficiency boiler retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 532000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 80000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 80000,
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
          "upfrontCostAfterSavingsCents": 532000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "opportunityName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Natural-Gas Rebate Program",
          "administrator": "Minnesota Energy Resources",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3310/minnesota-energy-resources-gas-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Waste heat recovery was a false positive; the checked program supports residential HRV and ERV, not industrial waste heat recovery.",
            "Do not match electric heat pumps or electric utility measures.",
            "Do not match new homes under the existing-home rebate rules where the program excludes homes built in the past two years.",
            "Do not match customers outside the Minnesota Energy Resources gas territory."
          ],
          "hardRequirements": [
            "Home must be served by Minnesota Energy Resources and meet natural-gas heating requirements for the relevant measure.",
            "Air sealing and insulation require approved insulation contractor participation and diagnostic testing where specified.",
            "Aerosol duct sealing must meet reduction requirements and contractor certification rules; mastic or tape duct sealing does not qualify.",
            "Windows must be ENERGY STAR Version 7 and installed by a qualifying contractor for conditioned space.",
            "Heating, thermostat, HRV, ERV and water-heating rebates have equipment, application-timing and per-service limits."
          ],
          "eligibleApplicantTypes": [
            "residential_natural_gas_customer",
            "homeowner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "duct_sealing_and_insulation",
            "window_replacement",
            "high_efficiency_furnace_retrofit",
            "high_efficiency_boiler_retrofit",
            "integrated_space_water_heating_system",
            "energy_recovery_ventilation_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heating_system_tune_up",
            "water_heater_upgrade",
            "low_flow_showerheads_and_aerators"
          ],
          "evidenceText": "Minnesota]( Energy Resources lists existing-home rebates for insulation, air sealing, aerosol duct sealing, ENERGY STAR windows, gas furnaces and boilers, HRV or ERV, thermostats and water-heating measures.",
          "reasoningNotes": "Retained gas-residential envelope, duct, heating, ventilation and thermostat measures. Removed industrial waste-heat recovery and any implied electric-utility or heat-pump rebates."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
          "programName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selectedmeasure",
            "unitcount",
            "eligiblecost",
            "cfmreduction",
            "afue",
            "windowcount",
            "affordablehousingstatus",
            "naturalgasheatingstatus",
            "homeageyears",
            "eligiblecostorcfmreduction"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selectedmeasure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "afue",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "windowcount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "affordablehousingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "naturalgasheatingstatus",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "homeageyears",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligiblecostorcfmreduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 250,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_295902f08bab4fb1",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 250,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_laundry_equipment",
      "displayName": "High-efficiency laundry equipment",
      "parentCategory": "water_efficiency",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 307600,
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
          "upfrontCostAfterSavingsCents": 307600,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "opportunityName": "MMPA - Residential Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Minnesota Municipal Power Agency member municipal utilities",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4740/mmpa-residential-energy-efficiency-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, commercial_kitchen, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential appliance rebates are not commercial dishwasher, commercial refrigeration, or commercial kitchen equipment rebates.",
            "No current official support was found for low-flow fixture retrofits under this residential electric program.",
            "Generic high-efficiency HVAC is too broad; current support is for central air conditioners and air-source heat pumps."
          ],
          "hardRequirements": [
            "Applicant must be a residential electric customer of a participating MMPA member utility.",
            "ENERGY STAR qualification applies to listed appliance categories where required by local forms.",
            "Rebate amount, deadlines, proof of purchase, and eligibility are controlled by the local municipal utility form."
          ],
          "eligibleApplicantTypes": [
            "residential_customers"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_star_appliance_rebate",
            "residential_dishwasher",
            "residential_clothes_washer",
            "residential_refrigerator_freezer",
            "electric_clothes_dryer",
            "dehumidifier",
            "air_purifier",
            "led_lighting_retrofit",
            "ceiling_fan_light_kit",
            "central_air_conditioner",
            "air_source_heat_pump"
          ],
          "evidenceText": "MMPA]( residential conservation materials list rebates for LED lighting, ceiling fans with light kits, ENERGY STAR household appliances, central air conditioners, air-source heat pumps, and appliance recycling.",
          "reasoningNotes": "The current match should be narrowed to residential appliances and residential electric HVAC measures; commercial foodservice and low-flow plumbing categories are false positives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
          "programName": "MMPA - Residential Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "participating_member_utility",
            "local_residential_form",
            "selected_measure",
            "energy_star_qualification_where_applicable",
            "purchase_price",
            "unit_count",
            "member_utility",
            "local_form_amount"
          ],
          "defaultedInputs": [
            {
              "inputKey": "participating_member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_residential_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energy_star_qualification_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "member_utility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 2500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_cdf9e736a6dca475",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 2500,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:601",
          "opportunityName": "Wind Energy Sales Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Sales Tax Incentive",
          "administrator": "Minnesota Department of Revenue",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.83,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/601/wind-energy-sales-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MN matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: renewable_energy, solar, wind."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match solar, biomass, or other renewable technologies.",
            "Do not match non-electric wind equipment.",
            "Small wind is eligible only as a subset of qualifying wind energy conversion systems."
          ],
          "hardRequirements": [
            "System must qualify as a wind energy conversion system under Minnesota law.",
            "System must be used as an electric power source.",
            "Exemption covers systems and materials used to manufacture, install, construct, repair, or replace them."
          ],
          "eligibleApplicantTypes": [
            "taxpayer",
            "business_owner",
            "homeowner",
            "public_entity"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "public"
          ],
          "eligibleRetrofitCategories": [
            "wind_energy_conversion_system",
            "small_wind_turbine"
          ],
          "evidenceText": "Minnesota law exempts wind energy conversion systems used as an electric power source and related installation or replacement materials from sales tax.",
          "reasoningNotes": "The wind turbine match is source-backed, but it should be described as a statutory sales tax exemption for qualifying wind energy conversion systems."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5417",
          "opportunityName": "Xcel Energy - Solar*Rewards Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Performance-Based Incentive",
          "administrator": "Xcel Energy",
          "state": "MN",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5417/xcel-energy-solar-rewards-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MN matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Production or net metering required for the solar program is not a standalone submetering or energy-monitoring retrofit.",
            "Non-PV solar thermal measures are not supported.",
            "Projects outside Xcel's Minnesota electric territory should not match."
          ],
          "hardRequirements": [
            "Customer must be in Xcel Energy's Minnesota electric service territory.",
            "Project must be a grid-connected solar PV system meeting Xcel Solar*Rewards requirements.",
            "Program participation, metering, interconnection, system-size, and production-payment rules apply, including current Xcel Solar*Rewards terms.",
            "Available funds and enrollment terms should be checked before matching."
          ],
          "eligibleApplicantTypes": [
            "xcel_energy_electric_customer",
            "residential_customer",
            "commercial_customer",
            "solar_customer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "rooftop_solar_pv"
          ],
          "evidenceText": "Xcel's]( Minnesota renewable-energy page describes Solar*Rewards payments and bill credits for customers who install solar panels.",
          "reasoningNotes": "The solar PV match is supported. The submetering match is a false positive from program metering language and should be blocked."
        }
      ],
      "v2PackageSummaries": []
    }
  ]
}
