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
  "testCaseOrdinal": 12,
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

Packet 12 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 12,
  "sampleUserId": "hoa-mai-gardens-seattle-household",
  "description": "Anonymized household in Seattle public housing with municipal electric service.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "residential"
      ],
      "primaryActivityText": "Residential occupancy in income-qualified public housing with tenant and housing-authority control split",
      "naicsCodes": [
        "531110",
        "925110"
      ],
      "organizationSize": "Household"
    },
    "site": {
      "address": {
        "raw": "221 10th Avenue S, Seattle, WA 98104, USA",
        "stateCode": "WA",
        "zip5": "98104"
      },
      "geo": {
        "stateCode": "WA",
        "zip5": "98104",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Seattle City Light",
          "distributionUtilityId": "UTIL_SEATTLE_CITY_LIGHT",
          "territoryCandidates": [
            "UTIL_SEATTLE_CITY_LIGHT"
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
        "value": 150730,
        "raw": "150,730",
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
    "eligible": 8,
    "ineligible": 1511
  },
  "retrofitCount": 14,
  "retrofits": [
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
        "oneTimeSavingsCents": 8,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 81000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 81000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 1,
          "includedPackageCount": 1,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_v2_df1d5132708500ce_v1",
          "name": "Richland Energy Services pays current residential rebates for qualifying electric-heated homes by measure. The separate EV charger program is not part of this residential HVAC/weatherization opportunity. Loans are financing, not cash savings.",
          "status": "calculated",
          "opportunityIds": [
            "SOURCE_DSIRE:dsire_program_id:2837"
          ],
          "incentiveRuleIds": [
            "oir_v2_df1d5132708500ce_v1"
          ],
          "totalUpfrontSavingsCents": 8,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 8,
          "upfrontCostAfterSavingsCents": 315992,
          "upfrontSavingsEntries": [
            {
              "kind": "upfront_savings",
              "category": "rebate",
              "label": "Richland Energy Services pays current residential rebates for qualifying electric-heated homes by measure. The separate EV charger program is not part of this residential HVAC/weatherization opportunity. Loans are financing, not cash savings.",
              "amountCents": 8,
              "source": "opportunity_incentive_rule",
              "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
              "incentiveRuleId": "oir_v2_df1d5132708500ce_v1",
              "formula": "measure_catalog"
            }
          ],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        },
        {
          "scenarioRole": "alternative_1",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4479",
          "opportunityName": "Seattle City Light - Multifamily New Construction Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "New Construction Energy Design Assistance And Performance Incentive",
          "administrator": "Seattle City Light",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4479/seattle-city-light-multifamily-new-construction-rebate-program",
          "applicationUrl": "https://energyassistance.willdan.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an existing-building retrofit rebate; do not match heat pump replacement, HVAC replacement, insulation upgrade, lighting retrofit, or waste heat recovery retrofit categories.",
            "Any energy-saving measure must be part of approved new-construction whole-building energy analysis.",
            "Existing multifamily weatherization is a separate Seattle City Light program and should not be merged into this record."
          ],
          "hardRequirements": [
            "Project must be located in Seattle City Light electric service area.",
            "Project must be commercial, industrial, or multifamily new construction.",
            "Project must be built to exceed energy code.",
            "Enrollment must occur before 100% design construction documents are complete.",
            "A signed agreement is required at least three months before temporary certificate of occupancy."
          ],
          "eligibleApplicantTypes": [
            "property_developers",
            "building_owners",
            "multifamily_building_owners",
            "commercial_property_owners",
            "industrial_property_owners",
            "affordable_housing_developers"
          ],
          "eligibleSectors": [
            "multifamily",
            "affordable_housing",
            "commercial",
            "industrial",
            "new_construction"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Seattle City Light Building for Energy Efficiency is for new construction energy design assistance; applicants must enroll before 100% design documents and exceed code.",
          "reasoningNotes": "The DSIRE retrofit matches are false positives for this record. The program is active but should be treated as new-construction design assistance rather than retrofit funding."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
          "opportunityName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "City of Richland",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2837/richland-energy-services-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://www.richlandwa.gov/home/showpublisheddocument/18065/639100479801730000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, ev_charging, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Level 2 EV charger rebates are on a separate Richland electric-vehicle program page, not the residential HVAC/weatherization rebate page.",
            "Do not match gas-primary-heating homes to weatherization rebates unless current program rules allow the specific measure.",
            "Do not generalize door or window specifications beyond listed program-qualified replacements."
          ],
          "hardRequirements": [
            "Applicant must be a Richland Energy Services electric customer.",
            "Program forms and installed equipment must meet current residential rebate specifications.",
            "Weatherization rebates require the primary space-heating system to be electric.",
            "Pre-approval, contractor participation, or inspection may be required by measure.",
            "Rebates are subject to funding availability."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner",
            "income_qualified_household",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "energy_star_exterior_door_replacement"
          ],
          "evidenceText": "Current Richland pages list residential rebates and loans for HVAC heat pumps, insulation, windows, doors and hybrid water heaters. The 2026 application includes heat pump conversion or upgrade, ductless heat pumps, insulation, air sealing and window or door replacement; EV charging is separate.",
          "reasoningNotes": "Retain heat pump, heat pump water heater, insulation, air sealing and window/door categories. Treat EV charging as a separate program boundary even though the same utility offers it."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5622",
          "opportunityName": "Seattle HomeWise: Weatherization",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "Seattle Office of Housing",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5622/seattle-homewise-weatherization",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not available statewide in Washington.",
            "Commercial buildings are not supported by the HomeWise residential weatherization page.",
            "Some non-envelope measures, such as heat pumps or water heaters, are inspection- or equipment-condition-dependent and should not be generalized from the envelope match."
          ],
          "hardRequirements": [
            "Household must meet income eligibility requirements.",
            "Home must be within Seattle limits or meet Seattle City Light electric-heat eligibility outside the city.",
            "Weatherization measures depend on audit or inspection findings.",
            "Rental and multifamily participation may require property owner cooperation and tenant income qualification."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "renter",
            "multifamily_owner",
            "property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade"
          ],
          "evidenceText": "Seattle]( HomeWise provides free energy-efficiency improvements to income-qualified homes, including insulation and duct or air sealing, with eligibility limited by location, income, and program inspection.",
          "reasoningNotes": "The air sealing and insulation matches are source-backed. Geography and income limits are essential blockers for deterministic matching."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
          "programName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "included",
          "includedInRuntimeTotals": true,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "existing_heating_type",
            "equipment_path",
            "square_feet",
            "window_u_factor",
            "door_count",
            "hpwh_purchase_path",
            "funding_availability",
            "area_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existing_heating_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_path",
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
              "inputKey": "window_u_factor",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "door_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "hpwh_purchase_path",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "funding_availability",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "area_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 8,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_5610301ae261d76d",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": true,
              "humanReviewRequired": false,
              "amountCents": 8,
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
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 1172000,
        "oneTimeSavingsCents": 8,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 80000,
        "annualRecurringExpensesCents": 54000,
        "netAnnualRecurringSavingsCents": 26000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 1,
          "includedPackageCount": 1,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_v2_df1d5132708500ce_v1",
          "name": "Richland Energy Services pays current residential rebates for qualifying electric-heated homes by measure. The separate EV charger program is not part of this residential HVAC/weatherization opportunity. Loans are financing, not cash savings.",
          "status": "calculated",
          "opportunityIds": [
            "SOURCE_DSIRE:dsire_program_id:2837"
          ],
          "incentiveRuleIds": [
            "oir_v2_df1d5132708500ce_v1"
          ],
          "totalUpfrontSavingsCents": 8,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 8,
          "upfrontCostAfterSavingsCents": 1171992,
          "upfrontSavingsEntries": [
            {
              "kind": "upfront_savings",
              "category": "rebate",
              "label": "Richland Energy Services pays current residential rebates for qualifying electric-heated homes by measure. The separate EV charger program is not part of this residential HVAC/weatherization opportunity. Loans are financing, not cash savings.",
              "amountCents": 8,
              "source": "opportunity_incentive_rule",
              "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
              "incentiveRuleId": "oir_v2_df1d5132708500ce_v1",
              "formula": "measure_catalog"
            }
          ],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        },
        {
          "scenarioRole": "alternative_1",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4479",
          "opportunityName": "Seattle City Light - Multifamily New Construction Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "New Construction Energy Design Assistance And Performance Incentive",
          "administrator": "Seattle City Light",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4479/seattle-city-light-multifamily-new-construction-rebate-program",
          "applicationUrl": "https://energyassistance.willdan.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an existing-building retrofit rebate; do not match heat pump replacement, HVAC replacement, insulation upgrade, lighting retrofit, or waste heat recovery retrofit categories.",
            "Any energy-saving measure must be part of approved new-construction whole-building energy analysis.",
            "Existing multifamily weatherization is a separate Seattle City Light program and should not be merged into this record."
          ],
          "hardRequirements": [
            "Project must be located in Seattle City Light electric service area.",
            "Project must be commercial, industrial, or multifamily new construction.",
            "Project must be built to exceed energy code.",
            "Enrollment must occur before 100% design construction documents are complete.",
            "A signed agreement is required at least three months before temporary certificate of occupancy."
          ],
          "eligibleApplicantTypes": [
            "property_developers",
            "building_owners",
            "multifamily_building_owners",
            "commercial_property_owners",
            "industrial_property_owners",
            "affordable_housing_developers"
          ],
          "eligibleSectors": [
            "multifamily",
            "affordable_housing",
            "commercial",
            "industrial",
            "new_construction"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Seattle City Light Building for Energy Efficiency is for new construction energy design assistance; applicants must enroll before 100% design documents and exceed code.",
          "reasoningNotes": "The DSIRE retrofit matches are false positives for this record. The program is active but should be treated as new-construction design assistance rather than retrofit funding."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
          "opportunityName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "City of Richland",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2837/richland-energy-services-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://www.richlandwa.gov/home/showpublisheddocument/18065/639100479801730000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, ev_charging, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Level 2 EV charger rebates are on a separate Richland electric-vehicle program page, not the residential HVAC/weatherization rebate page.",
            "Do not match gas-primary-heating homes to weatherization rebates unless current program rules allow the specific measure.",
            "Do not generalize door or window specifications beyond listed program-qualified replacements."
          ],
          "hardRequirements": [
            "Applicant must be a Richland Energy Services electric customer.",
            "Program forms and installed equipment must meet current residential rebate specifications.",
            "Weatherization rebates require the primary space-heating system to be electric.",
            "Pre-approval, contractor participation, or inspection may be required by measure.",
            "Rebates are subject to funding availability."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner",
            "income_qualified_household",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "energy_star_exterior_door_replacement"
          ],
          "evidenceText": "Current Richland pages list residential rebates and loans for HVAC heat pumps, insulation, windows, doors and hybrid water heaters. The 2026 application includes heat pump conversion or upgrade, ductless heat pumps, insulation, air sealing and window or door replacement; EV charging is separate.",
          "reasoningNotes": "Retain heat pump, heat pump water heater, insulation, air sealing and window/door categories. Treat EV charging as a separate program boundary even though the same utility offers it."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
          "programName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "included",
          "includedInRuntimeTotals": true,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "existing_heating_type",
            "equipment_path",
            "square_feet",
            "window_u_factor",
            "door_count",
            "hpwh_purchase_path",
            "funding_availability",
            "area_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existing_heating_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_path",
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
              "inputKey": "window_u_factor",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "door_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "hpwh_purchase_path",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "funding_availability",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "area_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 8,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_5610301ae261d76d",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": true,
              "humanReviewRequired": false,
              "amountCents": 8,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4479",
          "opportunityName": "Seattle City Light - Multifamily New Construction Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "New Construction Energy Design Assistance And Performance Incentive",
          "administrator": "Seattle City Light",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4479/seattle-city-light-multifamily-new-construction-rebate-program",
          "applicationUrl": "https://energyassistance.willdan.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an existing-building retrofit rebate; do not match heat pump replacement, HVAC replacement, insulation upgrade, lighting retrofit, or waste heat recovery retrofit categories.",
            "Any energy-saving measure must be part of approved new-construction whole-building energy analysis.",
            "Existing multifamily weatherization is a separate Seattle City Light program and should not be merged into this record."
          ],
          "hardRequirements": [
            "Project must be located in Seattle City Light electric service area.",
            "Project must be commercial, industrial, or multifamily new construction.",
            "Project must be built to exceed energy code.",
            "Enrollment must occur before 100% design construction documents are complete.",
            "A signed agreement is required at least three months before temporary certificate of occupancy."
          ],
          "eligibleApplicantTypes": [
            "property_developers",
            "building_owners",
            "multifamily_building_owners",
            "commercial_property_owners",
            "industrial_property_owners",
            "affordable_housing_developers"
          ],
          "eligibleSectors": [
            "multifamily",
            "affordable_housing",
            "commercial",
            "industrial",
            "new_construction"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Seattle City Light Building for Energy Efficiency is for new construction energy design assistance; applicants must enroll before 100% design documents and exceed code.",
          "reasoningNotes": "The DSIRE retrofit matches are false positives for this record. The program is active but should be treated as new-construction design assistance rather than retrofit funding."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
        }
      ],
      "v2PackageSummaries": []
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
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5622",
          "opportunityName": "Seattle HomeWise: Weatherization",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "Seattle Office of Housing",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5622/seattle-homewise-weatherization",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not available statewide in Washington.",
            "Commercial buildings are not supported by the HomeWise residential weatherization page.",
            "Some non-envelope measures, such as heat pumps or water heaters, are inspection- or equipment-condition-dependent and should not be generalized from the envelope match."
          ],
          "hardRequirements": [
            "Household must meet income eligibility requirements.",
            "Home must be within Seattle limits or meet Seattle City Light electric-heat eligibility outside the city.",
            "Weatherization measures depend on audit or inspection findings.",
            "Rental and multifamily participation may require property owner cooperation and tenant income qualification."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "renter",
            "multifamily_owner",
            "property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade"
          ],
          "evidenceText": "Seattle]( HomeWise provides free energy-efficiency improvements to income-qualified homes, including insulation and duct or air sealing, with eligibility limited by location, income, and program inspection.",
          "reasoningNotes": "The air sealing and insulation matches are source-backed. Geography and income limits are essential blockers for deterministic matching."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5840",
          "opportunityName": "WSHFC Sustainable Energy Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Washington State Housing Finance Commission",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5840/wshfc-sustainable-energy-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, energy_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Community solar subscription is a false-positive category; the program may finance community solar projects for project owners or developers, not retail subscriptions.",
            "Single-family homeowner retrofit loans belong to separate WSHFC offerings and should not be matched here.",
            "Do not force broad renewable financing into rebate-style eligibility."
          ],
          "hardRequirements": [
            "Financing is for eligible clean energy or energy-efficiency projects in Washington.",
            "Borrowers must be eligible property owners, facility owners, businesses, nonprofits, multifamily owners, or developers.",
            "Single-family homeowners are not eligible for the Sustainable Energy Trust loan program.",
            "Energy-efficiency and water projects must meet applicable utility-consumption reduction requirements.",
            "Loan underwriting, project review, and program financing terms apply."
          ],
          "eligibleApplicantTypes": [
            "business_property_owner",
            "multifamily_property_owner",
            "nonprofit_facility_owner",
            "housing_developer",
            "project_developer"
          ],
          "eligibleSectors": [
            "commercial",
            "multifamily",
            "nonprofit",
            "affordable_housing",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "community_solar_project_financing",
            "biomass_biogas_energy_system",
            "combined_heat_and_power_system",
            "wind_energy_system",
            "energy_efficiency_upgrade_financing",
            "lighting_retrofit",
            "hvac_efficiency_upgrade",
            "building_envelope_upgrade",
            "water_efficiency_upgrade",
            "plumbing_efficiency_upgrade"
          ],
          "evidenceText": "WSHFC describes low-interest loans for clean energy and efficiency projects, including solar, community solar models, biodigesters, CHP, biomass, wind, and efficiency improvements for eligible non-single-family borrowers.",
          "reasoningNotes": "Repair as financing. Keep biomass and CHP, replace community_solar_subscription with project financing, and include efficiency categories only as financed upgrades."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5840",
          "opportunityName": "WSHFC Sustainable Energy Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Washington State Housing Finance Commission",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5840/wshfc-sustainable-energy-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, energy_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Community solar subscription is a false-positive category; the program may finance community solar projects for project owners or developers, not retail subscriptions.",
            "Single-family homeowner retrofit loans belong to separate WSHFC offerings and should not be matched here.",
            "Do not force broad renewable financing into rebate-style eligibility."
          ],
          "hardRequirements": [
            "Financing is for eligible clean energy or energy-efficiency projects in Washington.",
            "Borrowers must be eligible property owners, facility owners, businesses, nonprofits, multifamily owners, or developers.",
            "Single-family homeowners are not eligible for the Sustainable Energy Trust loan program.",
            "Energy-efficiency and water projects must meet applicable utility-consumption reduction requirements.",
            "Loan underwriting, project review, and program financing terms apply."
          ],
          "eligibleApplicantTypes": [
            "business_property_owner",
            "multifamily_property_owner",
            "nonprofit_facility_owner",
            "housing_developer",
            "project_developer"
          ],
          "eligibleSectors": [
            "commercial",
            "multifamily",
            "nonprofit",
            "affordable_housing",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "community_solar_project_financing",
            "biomass_biogas_energy_system",
            "combined_heat_and_power_system",
            "wind_energy_system",
            "energy_efficiency_upgrade_financing",
            "lighting_retrofit",
            "hvac_efficiency_upgrade",
            "building_envelope_upgrade",
            "water_efficiency_upgrade",
            "plumbing_efficiency_upgrade"
          ],
          "evidenceText": "WSHFC describes low-interest loans for clean energy and efficiency projects, including solar, community solar models, biodigesters, CHP, biomass, wind, and efficiency improvements for eligible non-single-family borrowers.",
          "reasoningNotes": "Repair as financing. Keep biomass and CHP, replace community_solar_subscription with project financing, and include efficiency categories only as financed upgrades."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "community_solar_subscription",
      "displayName": "Community solar subscription",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": false,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 50000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 540000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 540000,
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
          "upfrontCostAfterSavingsCents": 50000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5840",
          "opportunityName": "WSHFC Sustainable Energy Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Washington State Housing Finance Commission",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5840/wshfc-sustainable-energy-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, energy_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Community solar subscription is a false-positive category; the program may finance community solar projects for project owners or developers, not retail subscriptions.",
            "Single-family homeowner retrofit loans belong to separate WSHFC offerings and should not be matched here.",
            "Do not force broad renewable financing into rebate-style eligibility."
          ],
          "hardRequirements": [
            "Financing is for eligible clean energy or energy-efficiency projects in Washington.",
            "Borrowers must be eligible property owners, facility owners, businesses, nonprofits, multifamily owners, or developers.",
            "Single-family homeowners are not eligible for the Sustainable Energy Trust loan program.",
            "Energy-efficiency and water projects must meet applicable utility-consumption reduction requirements.",
            "Loan underwriting, project review, and program financing terms apply."
          ],
          "eligibleApplicantTypes": [
            "business_property_owner",
            "multifamily_property_owner",
            "nonprofit_facility_owner",
            "housing_developer",
            "project_developer"
          ],
          "eligibleSectors": [
            "commercial",
            "multifamily",
            "nonprofit",
            "affordable_housing",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "community_solar_project_financing",
            "biomass_biogas_energy_system",
            "combined_heat_and_power_system",
            "wind_energy_system",
            "energy_efficiency_upgrade_financing",
            "lighting_retrofit",
            "hvac_efficiency_upgrade",
            "building_envelope_upgrade",
            "water_efficiency_upgrade",
            "plumbing_efficiency_upgrade"
          ],
          "evidenceText": "WSHFC describes low-interest loans for clean energy and efficiency projects, including solar, community solar models, biodigesters, CHP, biomass, wind, and efficiency improvements for eligible non-single-family borrowers.",
          "reasoningNotes": "Repair as financing. Keep biomass and CHP, replace community_solar_subscription with project financing, and include efficiency categories only as financed upgrades."
        }
      ],
      "v2PackageSummaries": []
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
        "oneTimeSavingsCents": 8,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 48000,
        "annualRecurringExpensesCents": 25200,
        "netAnnualRecurringSavingsCents": 22800,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 1,
          "includedPackageCount": 1,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_v2_df1d5132708500ce_v1",
          "name": "Richland Energy Services pays current residential rebates for qualifying electric-heated homes by measure. The separate EV charger program is not part of this residential HVAC/weatherization opportunity. Loans are financing, not cash savings.",
          "status": "calculated",
          "opportunityIds": [
            "SOURCE_DSIRE:dsire_program_id:2837"
          ],
          "incentiveRuleIds": [
            "oir_v2_df1d5132708500ce_v1"
          ],
          "totalUpfrontSavingsCents": 8,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 8,
          "upfrontCostAfterSavingsCents": 349992,
          "upfrontSavingsEntries": [
            {
              "kind": "upfront_savings",
              "category": "rebate",
              "label": "Richland Energy Services pays current residential rebates for qualifying electric-heated homes by measure. The separate EV charger program is not part of this residential HVAC/weatherization opportunity. Loans are financing, not cash savings.",
              "amountCents": 8,
              "source": "opportunity_incentive_rule",
              "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
              "incentiveRuleId": "oir_v2_df1d5132708500ce_v1",
              "formula": "measure_catalog"
            }
          ],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        },
        {
          "scenarioRole": "alternative_1",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
          "opportunityName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "City of Richland",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2837/richland-energy-services-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://www.richlandwa.gov/home/showpublisheddocument/18065/639100479801730000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, ev_charging, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Level 2 EV charger rebates are on a separate Richland electric-vehicle program page, not the residential HVAC/weatherization rebate page.",
            "Do not match gas-primary-heating homes to weatherization rebates unless current program rules allow the specific measure.",
            "Do not generalize door or window specifications beyond listed program-qualified replacements."
          ],
          "hardRequirements": [
            "Applicant must be a Richland Energy Services electric customer.",
            "Program forms and installed equipment must meet current residential rebate specifications.",
            "Weatherization rebates require the primary space-heating system to be electric.",
            "Pre-approval, contractor participation, or inspection may be required by measure.",
            "Rebates are subject to funding availability."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner",
            "income_qualified_household",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "energy_star_exterior_door_replacement"
          ],
          "evidenceText": "Current Richland pages list residential rebates and loans for HVAC heat pumps, insulation, windows, doors and hybrid water heaters. The 2026 application includes heat pump conversion or upgrade, ductless heat pumps, insulation, air sealing and window or door replacement; EV charging is separate.",
          "reasoningNotes": "Retain heat pump, heat pump water heater, insulation, air sealing and window/door categories. Treat EV charging as a separate program boundary even though the same utility offers it."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
          "programName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "included",
          "includedInRuntimeTotals": true,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "existing_heating_type",
            "equipment_path",
            "square_feet",
            "window_u_factor",
            "door_count",
            "hpwh_purchase_path",
            "funding_availability",
            "area_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existing_heating_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_path",
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
              "inputKey": "window_u_factor",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "door_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "hpwh_purchase_path",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "funding_availability",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "area_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 8,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_5610301ae261d76d",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": true,
              "humanReviewRequired": false,
              "amountCents": 8,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4479",
          "opportunityName": "Seattle City Light - Multifamily New Construction Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "New Construction Energy Design Assistance And Performance Incentive",
          "administrator": "Seattle City Light",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4479/seattle-city-light-multifamily-new-construction-rebate-program",
          "applicationUrl": "https://energyassistance.willdan.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an existing-building retrofit rebate; do not match heat pump replacement, HVAC replacement, insulation upgrade, lighting retrofit, or waste heat recovery retrofit categories.",
            "Any energy-saving measure must be part of approved new-construction whole-building energy analysis.",
            "Existing multifamily weatherization is a separate Seattle City Light program and should not be merged into this record."
          ],
          "hardRequirements": [
            "Project must be located in Seattle City Light electric service area.",
            "Project must be commercial, industrial, or multifamily new construction.",
            "Project must be built to exceed energy code.",
            "Enrollment must occur before 100% design construction documents are complete.",
            "A signed agreement is required at least three months before temporary certificate of occupancy."
          ],
          "eligibleApplicantTypes": [
            "property_developers",
            "building_owners",
            "multifamily_building_owners",
            "commercial_property_owners",
            "industrial_property_owners",
            "affordable_housing_developers"
          ],
          "eligibleSectors": [
            "multifamily",
            "affordable_housing",
            "commercial",
            "industrial",
            "new_construction"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Seattle City Light Building for Energy Efficiency is for new construction energy design assistance; applicants must enroll before 100% design documents and exceed code.",
          "reasoningNotes": "The DSIRE retrofit matches are false positives for this record. The program is active but should be treated as new-construction design assistance rather than retrofit funding."
        }
      ],
      "v2PackageSummaries": []
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
      "retrofitTypeId": "waste_heat_recovery",
      "displayName": "Waste heat recovery",
      "parentCategory": "compressed_air_industrial",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 636000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 216000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 216000,
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
          "upfrontCostAfterSavingsCents": 636000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4479",
          "opportunityName": "Seattle City Light - Multifamily New Construction Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "New Construction Energy Design Assistance And Performance Incentive",
          "administrator": "Seattle City Light",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4479/seattle-city-light-multifamily-new-construction-rebate-program",
          "applicationUrl": "https://energyassistance.willdan.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an existing-building retrofit rebate; do not match heat pump replacement, HVAC replacement, insulation upgrade, lighting retrofit, or waste heat recovery retrofit categories.",
            "Any energy-saving measure must be part of approved new-construction whole-building energy analysis.",
            "Existing multifamily weatherization is a separate Seattle City Light program and should not be merged into this record."
          ],
          "hardRequirements": [
            "Project must be located in Seattle City Light electric service area.",
            "Project must be commercial, industrial, or multifamily new construction.",
            "Project must be built to exceed energy code.",
            "Enrollment must occur before 100% design construction documents are complete.",
            "A signed agreement is required at least three months before temporary certificate of occupancy."
          ],
          "eligibleApplicantTypes": [
            "property_developers",
            "building_owners",
            "multifamily_building_owners",
            "commercial_property_owners",
            "industrial_property_owners",
            "affordable_housing_developers"
          ],
          "eligibleSectors": [
            "multifamily",
            "affordable_housing",
            "commercial",
            "industrial",
            "new_construction"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Seattle City Light Building for Energy Efficiency is for new construction energy design assistance; applicants must enroll before 100% design documents and exceed code.",
          "reasoningNotes": "The DSIRE retrofit matches are false positives for this record. The program is active but should be treated as new-construction design assistance rather than retrofit funding."
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
        "oneTimeSavingsCents": 8,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 63000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 63000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 1,
          "includedPackageCount": 1,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_v2_df1d5132708500ce_v1",
          "name": "Richland Energy Services pays current residential rebates for qualifying electric-heated homes by measure. The separate EV charger program is not part of this residential HVAC/weatherization opportunity. Loans are financing, not cash savings.",
          "status": "calculated",
          "opportunityIds": [
            "SOURCE_DSIRE:dsire_program_id:2837"
          ],
          "incentiveRuleIds": [
            "oir_v2_df1d5132708500ce_v1"
          ],
          "totalUpfrontSavingsCents": 8,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 8,
          "upfrontCostAfterSavingsCents": 443992,
          "upfrontSavingsEntries": [
            {
              "kind": "upfront_savings",
              "category": "rebate",
              "label": "Richland Energy Services pays current residential rebates for qualifying electric-heated homes by measure. The separate EV charger program is not part of this residential HVAC/weatherization opportunity. Loans are financing, not cash savings.",
              "amountCents": 8,
              "source": "opportunity_incentive_rule",
              "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
              "incentiveRuleId": "oir_v2_df1d5132708500ce_v1",
              "formula": "measure_catalog"
            }
          ],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        },
        {
          "scenarioRole": "alternative_1",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
          "opportunityName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "City of Richland",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2837/richland-energy-services-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://www.richlandwa.gov/home/showpublisheddocument/18065/639100479801730000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, ev_charging, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Level 2 EV charger rebates are on a separate Richland electric-vehicle program page, not the residential HVAC/weatherization rebate page.",
            "Do not match gas-primary-heating homes to weatherization rebates unless current program rules allow the specific measure.",
            "Do not generalize door or window specifications beyond listed program-qualified replacements."
          ],
          "hardRequirements": [
            "Applicant must be a Richland Energy Services electric customer.",
            "Program forms and installed equipment must meet current residential rebate specifications.",
            "Weatherization rebates require the primary space-heating system to be electric.",
            "Pre-approval, contractor participation, or inspection may be required by measure.",
            "Rebates are subject to funding availability."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner",
            "income_qualified_household",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "heat_pump_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "energy_star_exterior_door_replacement"
          ],
          "evidenceText": "Current Richland pages list residential rebates and loans for HVAC heat pumps, insulation, windows, doors and hybrid water heaters. The 2026 application includes heat pump conversion or upgrade, ductless heat pumps, insulation, air sealing and window or door replacement; EV charging is separate.",
          "reasoningNotes": "Retain heat pump, heat pump water heater, insulation, air sealing and window/door categories. Treat EV charging as a separate program boundary even though the same utility offers it."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
          "programName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "included",
          "includedInRuntimeTotals": true,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "existing_heating_type",
            "equipment_path",
            "square_feet",
            "window_u_factor",
            "door_count",
            "hpwh_purchase_path",
            "funding_availability",
            "area_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existing_heating_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_path",
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
              "inputKey": "window_u_factor",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "door_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "hpwh_purchase_path",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "funding_availability",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "area_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 8,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_5610301ae261d76d",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": true,
              "humanReviewRequired": false,
              "amountCents": 8,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    }
  ]
}
