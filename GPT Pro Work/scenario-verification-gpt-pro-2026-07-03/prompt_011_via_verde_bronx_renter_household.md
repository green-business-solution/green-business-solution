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
  "testCaseOrdinal": 11,
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

Packet 11 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 11,
  "sampleUserId": "via-verde-bronx-renter-household",
  "description": "Anonymized renter household in Bronx mixed-income multifamily housing with ConEd electric and gas service.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "residential"
      ],
      "primaryActivityText": "Residential occupancy in affordable or mixed-income multifamily housing with tenant and common-area utility ambiguity",
      "naicsCodes": [
        "531110",
        "814110"
      ],
      "organizationSize": "Household"
    },
    "site": {
      "address": {
        "raw": "700 Brook Avenue, Bronx, NY 10455, USA",
        "stateCode": "NY",
        "zip5": "10455"
      },
      "geo": {
        "stateCode": "NY",
        "zip5": "10455",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Consolidated Edison Company of New York",
          "distributionUtilityId": "UTIL_CONED",
          "territoryCandidates": [
            "UTIL_CONED"
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
    "eligible": 8,
    "ineligible": 1511
  },
  "retrofitCount": 8,
  "retrofits": [
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3652",
          "opportunityName": "Town of Babylon - Long Island Green Homes Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "PACE-Style Residential Energy-Efficiency Financing",
          "administrator": "Town of Babylon",
          "state": "NY",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3652/town-of-babylon-long-island-green-homes-program",
          "applicationUrl": "https://docs.google.com/forms/u/1/d/1WnHI2YuoRbRuT0nRtRD5AOOeu6KUZpk0o8LzMBMRZOc/viewform?edit_requested=true",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state NY matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_envelope, energy_efficiency, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Battery storage is not supported by the current Town Green Homes pages and should not match this opportunity.",
            "LED lighting is not supported by the current Town Green Homes pages and should not match this opportunity.",
            "Commercial, multifamily beyond the stated one- or two-family scope, and properties outside the Town of Babylon should not match.",
            "The old ligreenhomes.com website was not reliably accessible; use the Town of Babylon official pages as the current authority."
          ],
          "hardRequirements": [
            "Applicant must own a one- or two-family home in the Town of Babylon.",
            "Property taxes must be current before improvements are installed.",
            "Program process starts with a home assessment and Town review of the proposed scope.",
            "Financing is repaid through a monthly solid waste charge on the homeowner's tax bill.",
            "Only measures approved through the Green Homes process are eligible."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_audit",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_ventilation",
            "air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "central_ducted_heat_pump",
            "high_efficiency_water_heater",
            "high_efficiency_furnace_boiler",
            "electrical_panel_upgrade",
            "smart_thermostat"
          ],
          "evidenceText": "Town]( pages describe Green Homes as a residential program for one- and two-family homeowners, beginning with a home assessment and supporting approved energy upgrades repaid through the tax bill.",
          "reasoningNotes": "The insulation and duct-sealing matches are valid. Battery storage and LED lighting were likely false positives and should be removed because current official Town sources do not list them as Green Homes measures."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3652",
          "opportunityName": "Town of Babylon - Long Island Green Homes Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "PACE-Style Residential Energy-Efficiency Financing",
          "administrator": "Town of Babylon",
          "state": "NY",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3652/town-of-babylon-long-island-green-homes-program",
          "applicationUrl": "https://docs.google.com/forms/u/1/d/1WnHI2YuoRbRuT0nRtRD5AOOeu6KUZpk0o8LzMBMRZOc/viewform?edit_requested=true",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state NY matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_envelope, energy_efficiency, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Battery storage is not supported by the current Town Green Homes pages and should not match this opportunity.",
            "LED lighting is not supported by the current Town Green Homes pages and should not match this opportunity.",
            "Commercial, multifamily beyond the stated one- or two-family scope, and properties outside the Town of Babylon should not match.",
            "The old ligreenhomes.com website was not reliably accessible; use the Town of Babylon official pages as the current authority."
          ],
          "hardRequirements": [
            "Applicant must own a one- or two-family home in the Town of Babylon.",
            "Property taxes must be current before improvements are installed.",
            "Program process starts with a home assessment and Town review of the proposed scope.",
            "Financing is repaid through a monthly solid waste charge on the homeowner's tax bill.",
            "Only measures approved through the Green Homes process are eligible."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_audit",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_ventilation",
            "air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "central_ducted_heat_pump",
            "high_efficiency_water_heater",
            "high_efficiency_furnace_boiler",
            "electrical_panel_upgrade",
            "smart_thermostat"
          ],
          "evidenceText": "Town]( pages describe Green Homes as a residential program for one- and two-family homeowners, beginning with a home assessment and supporting approved energy upgrades repaid through the tax bill.",
          "reasoningNotes": "The insulation and duct-sealing matches are valid. Battery storage and LED lighting were likely false positives and should be removed because current official Town sources do not list them as Green Homes measures."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3652",
          "opportunityName": "Town of Babylon - Long Island Green Homes Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "PACE-Style Residential Energy-Efficiency Financing",
          "administrator": "Town of Babylon",
          "state": "NY",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3652/town-of-babylon-long-island-green-homes-program",
          "applicationUrl": "https://docs.google.com/forms/u/1/d/1WnHI2YuoRbRuT0nRtRD5AOOeu6KUZpk0o8LzMBMRZOc/viewform?edit_requested=true",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state NY matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_envelope, energy_efficiency, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Battery storage is not supported by the current Town Green Homes pages and should not match this opportunity.",
            "LED lighting is not supported by the current Town Green Homes pages and should not match this opportunity.",
            "Commercial, multifamily beyond the stated one- or two-family scope, and properties outside the Town of Babylon should not match.",
            "The old ligreenhomes.com website was not reliably accessible; use the Town of Babylon official pages as the current authority."
          ],
          "hardRequirements": [
            "Applicant must own a one- or two-family home in the Town of Babylon.",
            "Property taxes must be current before improvements are installed.",
            "Program process starts with a home assessment and Town review of the proposed scope.",
            "Financing is repaid through a monthly solid waste charge on the homeowner's tax bill.",
            "Only measures approved through the Green Homes process are eligible."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_audit",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_ventilation",
            "air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "central_ducted_heat_pump",
            "high_efficiency_water_heater",
            "high_efficiency_furnace_boiler",
            "electrical_panel_upgrade",
            "smart_thermostat"
          ],
          "evidenceText": "Town]( pages describe Green Homes as a residential program for one- and two-family homeowners, beginning with a home assessment and supporting approved energy upgrades repaid through the tax bill.",
          "reasoningNotes": "The insulation and duct-sealing matches are valid. Battery storage and LED lighting were likely false positives and should be removed because current official Town sources do not list them as Green Homes measures."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3652",
          "opportunityName": "Town of Babylon - Long Island Green Homes Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "PACE-Style Residential Energy-Efficiency Financing",
          "administrator": "Town of Babylon",
          "state": "NY",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3652/town-of-babylon-long-island-green-homes-program",
          "applicationUrl": "https://docs.google.com/forms/u/1/d/1WnHI2YuoRbRuT0nRtRD5AOOeu6KUZpk0o8LzMBMRZOc/viewform?edit_requested=true",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state NY matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_envelope, energy_efficiency, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Battery storage is not supported by the current Town Green Homes pages and should not match this opportunity.",
            "LED lighting is not supported by the current Town Green Homes pages and should not match this opportunity.",
            "Commercial, multifamily beyond the stated one- or two-family scope, and properties outside the Town of Babylon should not match.",
            "The old ligreenhomes.com website was not reliably accessible; use the Town of Babylon official pages as the current authority."
          ],
          "hardRequirements": [
            "Applicant must own a one- or two-family home in the Town of Babylon.",
            "Property taxes must be current before improvements are installed.",
            "Program process starts with a home assessment and Town review of the proposed scope.",
            "Financing is repaid through a monthly solid waste charge on the homeowner's tax bill.",
            "Only measures approved through the Green Homes process are eligible."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "energy_audit",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_ventilation",
            "air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "central_ducted_heat_pump",
            "high_efficiency_water_heater",
            "high_efficiency_furnace_boiler",
            "electrical_panel_upgrade",
            "smart_thermostat"
          ],
          "evidenceText": "Town]( pages describe Green Homes as a residential program for one- and two-family homeowners, beginning with a home assessment and supporting approved energy upgrades repaid through the tax bill.",
          "reasoningNotes": "The insulation and duct-sealing matches are valid. Battery storage and LED lighting were likely false positives and should be removed because current official Town sources do not list them as Green Homes measures."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3464",
          "opportunityName": "RG&E - Smart Energy Residential Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "RG&E",
          "state": "NY",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3464/rg-and-e-smart-energy-residential-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state NY matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, refrigeration, energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "high_efficiency_furnace_retrofit and high_efficiency_boiler_retrofit are not supported by the current accessible RG&E residential program hub reviewed for this record.",
            "high_efficiency_refrigeration_equipment and induction_cooking_equipment were not verified from current official RG&E residential sources and should not be matched from generic marketplace or old snippets alone.",
            "Smart thermostat matches should be flagged as demand-response or rewards participation unless a current equipment rebate source is separately verified.",
            "Battery storage is a separate Energy Storage Solutions pathway and should not be matched as a general efficiency rebate.",
            "Do not infer current gas equipment rebates from DSIRE or old snippets when the current official hub emphasizes NYS Clean Heat, insulation and air sealing, rewards, EmPower+, and storage programs."
          ],
          "hardRequirements": [
            "Customer must be served by RG&E and meet the relevant program pathway rules.",
            "Heat pump incentives are under the NYS Clean Heat pathway and require qualifying equipment and participating contractor or program documentation where applicable.",
            "Insulation and air sealing incentives require applicable home energy or weatherization program requirements.",
            "Smart thermostat rewards are a demand-response or enrollment pathway, not necessarily an upfront equipment rebate.",
            "Energy storage support is a separate Energy Storage Solutions pathway and requires separate eligibility and interconnection/program compliance."
          ],
          "eligibleApplicantTypes": [
            "RG&E residential customers",
            "homeowners",
            "renters with owner approval where applicable",
            "income-eligible residential customers",
            "participating contractors where required",
            "smart thermostat demand-response participants",
            "residential energy storage customers where eligible"
          ],
          "eligibleSectors": [
            "residential",
            "income-qualified residential",
            "demand response",
            "residential energy storage"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "smart_thermostat_zoning_retrofit",
            "battery_storage_system"
          ],
          "evidenceText": "The current RG&E residential rebates and programs hub lists NYS Clean Heat, insulation and air sealing rebates, Smart Savings Rewards thermostat participation, EmPower+, Smart Solutions marketplace, and Energy Storage Solutions. Current accessible support was not sufficient to verify furnace, boiler, refrigerator, or induction equipment rebates.",
          "reasoningNotes": "Confidence is medium because the official hub is current but route-specific program pages must be used for final technical details. The repair blocks unsupported furnace, boiler, refrigerator, and induction matches."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3464",
          "programName": "RG&E - Smart Energy Residential Efficiency Rebate Programs",
          "calculationStatus": "no_calculable_value",
          "runtimeInclusionStatus": "no_calculable_value",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [],
          "defaultedInputs": [],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_no_cash_value_1_ab5980762b4214bf",
              "effectType": "no_cash_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "no_calculable_value",
              "cashValueClassification": "unknown",
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
