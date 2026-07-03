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
  "testCaseOrdinal": 13,
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

Packet 13 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 13,
  "sampleUserId": "tapiz-mariposa-denver-household",
  "description": "Anonymized senior or disabled household in Denver public multifamily housing.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "residential"
      ],
      "primaryActivityText": "Residential occupancy in senior or disabled public housing",
      "naicsCodes": [
        "531110",
        "623312"
      ],
      "organizationSize": "Household"
    },
    "site": {
      "address": {
        "raw": "1099 Osage Street, Denver, CO 80204, USA",
        "stateCode": "CO",
        "zip5": "80204"
      },
      "geo": {
        "stateCode": "CO",
        "zip5": "80204",
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
    "eligible": 21,
    "ineligible": 1498
  },
  "retrofitCount": 19,
  "retrofits": [
    {
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 8,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22786",
          "opportunityName": "Eagle County - Walking Mountains Science Center Solar PV Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Walking Mountains Science Center and Energy Smart Colorado",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22786/eagle-county-walking-mountains-science-center-solar-pv-rebate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not all Eagle County residents are eligible.",
            "Battery storage is not supported by this solar PV rebate unless covered by a separate program.",
            "Off-grid systems are not supported by the cited rebate language.",
            "Projects without the Holy Cross Energy rebate are not eligible for the matching rebate."
          ],
          "hardRequirements": [
            "Project must be a grid-tied and net-metered solar PV system.",
            "Applicant must be in an eligible Eagle River Valley jurisdiction or area.",
            "Applicant must receive the Holy Cross Energy solar rebate to receive the matching local rebate.",
            "Application and required documentation should be submitted before project completion.",
            "Annual rebate caps apply by residential, business, and multifamily applicant type."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "business_customer",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system"
          ],
          "evidenceText": "Walking Mountains lists Eagle County solar PV rebates that match the Holy Cross Energy rebate for grid-tied, net-metered PV, with eligible local areas and caps.",
          "reasoningNotes": "The solar PV match is correct, but geography is narrower than statewide Colorado and eligibility depends on local area and Holy Cross Energy participation."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22753",
          "opportunityName": "City and County of Denver - Solar Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Solar Group Buy Discount Or Rebate",
          "administrator": "City and County of Denver",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22753/city-and-county-of-denver-solar-rebate",
          "applicationUrl": "https://switchtogether.com/en/solar/denver/home",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial projects unless a current official source confirms commercial eligibility.",
            "Do not match solar thermal or unrelated renewable energy systems.",
            "Heat pump and EV charging opportunities are separate group-buying or partner offerings and should not be merged into this solar rebate record."
          ],
          "hardRequirements": [
            "Applicant must be a Denver homeowner or residential property owner participating through the current Denver solar group-buying pathway.",
            "Project must complete program intake, site review, and final quote steps.",
            "Any rebate or partner funding must be confirmed through the current Switch Together or city-directed process."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv"
          ],
          "evidenceText": "Denver's official group-buying page directs homeowners to Switch Together for solar and describes discounted purchasing and partner funding pathways.",
          "reasoningNotes": "The rooftop solar match is plausible and currently supported at medium confidence. The detailed rebate page is dynamic, so eligibility should remain conservative."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4082",
          "opportunityName": "City of Boulder - Solar Sales and Use Tax Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Tax Rebate",
          "administrator": "City of Boulder",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4082/city-of-boulder-solar-sales-and-use-tax-rebate",
          "applicationUrl": "https://bouldercolorado.gov/services/solar-and-battery-system-tax-rebates",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Projects outside the City of Boulder are not eligible.",
            "Do not treat this as a full equipment rebate or income-based incentive.",
            "Non-solar and non-battery building improvements are not eligible.",
            "Taxes or costs not paid to or inspected by the City of Boulder should not be matched."
          ],
          "hardRequirements": [
            "Project must be in the City of Boulder.",
            "Applicant must have paid City of Boulder sales or use tax on qualifying materials and permits.",
            "Application must be filed within 12 months of the city's final inspection.",
            "Solar photovoltaic, solar thermal, and qualifying permanently installed battery systems are eligible under current program materials.",
            "Rebate is only a portion of city sales and use tax, not total project cost."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "taxpayers",
            "permit_applicants"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "battery_storage_system"
          ],
          "evidenceText": "Boulder rebates part of city sales and use tax paid on qualifying solar installations and now includes permanently installed battery systems.",
          "reasoningNotes": "The solar PV and solar water heating matches are valid. Current official sources also support battery storage as part of the same tax rebate program."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22763",
          "opportunityName": "High Country Conservation - Solarize Summit",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Group Purchase Discount Rebate",
          "administrator": "High Country Conservation Center",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22763/high-country-conservation-solarize-summit",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a statewide Colorado solar rebate.",
            "Battery storage is eligible only as part of the Solarize Summit offering; do not generalize to unrelated storage incentives."
          ],
          "hardRequirements": [
            "Participant must use the Solarize Summit program process and installer for Solarize discounts.",
            "For the 2026 campaign, contract deadlines and local rebate funding limits apply.",
            "Local government discounts are limited by residence or business location and are first-come, first-served."
          ],
          "eligibleApplicantTypes": [
            "resident",
            "homeowner",
            "business"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "battery_storage_system"
          ],
          "evidenceText": "Solarize Summit’s 2026 page offers limited-time discounts on solar panel installation and battery storage for local residents and certain businesses.",
          "reasoningNotes": "The rooftop solar match is supported. Added battery storage because the current official page includes battery storage; geography and campaign-deadline limits are material."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22786",
          "programName": "Eagle County - Walking Mountains Science Center Solar PV Rebate",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "holy_cross_energy_solar_rebate_amount",
            "applicant_type",
            "eligible_local_area",
            "grid_tied_net_metered_status",
            "solar_pv_project_documentation"
          ],
          "defaultedInputs": [
            {
              "inputKey": "holy_cross_energy_solar_rebate_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicant_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_local_area",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "grid_tied_net_metered_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "solar_pv_project_documentation",
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
              "effectId": "effect_one_time_savings_1_e063d473038d4258",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22753",
          "programName": "City and County of Denver - Solar Rebate",
          "calculationStatus": "estimate_from_range",
          "runtimeInclusionStatus": "low_confidence",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "denver_residential_property_status",
            "solar_group_buy_intake_completion",
            "installer_site_review",
            "final_solar_quote",
            "comparison_baseline_or_average_installation_cost",
            "confirmed_partner_funding",
            "final_quote",
            "confirmed_discount",
            "baseline_average_installation_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "denver_residential_property_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "solar_group_buy_intake_completion",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installer_site_review",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "final_solar_quote",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "comparison_baseline_or_average_installation_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "confirmed_partner_funding",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "final_quote",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "confirmed_discount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "baseline_average_installation_cost",
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
              "effectId": "effect_one_time_savings_1_e7cadc1577bd3f79",
              "effectType": "one_time_savings",
              "calculationMethod": "custom_quote",
              "valueModelKind": "custom_quote",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22763",
          "programName": "High Country Conservation - Solarize Summit",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "final_installer_quote",
            "solarize_summit_participation",
            "contract_execution_by_campaign_deadline",
            "project_location",
            "final_quote",
            "program_participation_confirmation",
            "eligible_local_jurisdiction",
            "available_local_funds",
            "jurisdiction_specific_discount_amount",
            "funding_availability"
          ],
          "defaultedInputs": [
            {
              "inputKey": "final_quote",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "final_installer_quote",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "solarize_summit_participation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contract_execution_by_campaign_deadline",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_location",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "program_participation_confirmation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_local_jurisdiction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "available_local_funds",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "jurisdiction_specific_discount_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "funding_availability",
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
              "effectId": "effect_one_time_savings_1_ae5f8c649edacfb0",
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
              "effectId": "effect_one_time_savings_2_c03454570af03744",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "fixed_tier_amount",
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
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 7,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "opportunityName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Colorado Energy Office",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match high_efficiency_oven as commercial kitchen equipment; supported cooking measures are residential electric stove, cooktop, range or oven appliances.",
            "Do not match process_electrification_equipment; this is not an industrial process electrification program.",
            "Do not match Region 1 projects after its closure unless official reopening is verified.",
            "Do not match projects after August 1, 2026 or after funds are reserved unless official sources show continued availability."
          ],
          "hardRequirements": [
            "Household must meet HEAR income requirements, generally at or below 150 percent of area median income.",
            "Project must be in an eligible Colorado HEAR region with available funds.",
            "Work must use registered or participating contractors where required.",
            "Rebates are point-of-sale or reserved through program process, not post-hoc unrestricted rebates.",
            "Only existing residential home electrification and related shell measures are eligible."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_homeowner",
            "income_qualified_renter",
            "single_family_household",
            "multifamily_household"
          ],
          "eligibleSectors": [
            "residential",
            "income_qualified_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "cold_climate_heat_pump",
            "ductless_heat_pump",
            "heat_pump_water_heater",
            "electric_panel_upgrade",
            "electrical_wiring_upgrade",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "ventilation_upgrade",
            "electric_cooking_appliance",
            "heat_pump_clothes_dryer"
          ],
          "evidenceText": "Current Colorado HEAR sources show Region 1 closed and Region 2 open only until August 1, 2026 or until funds are reserved. Measures are residential electrification and shell upgrades for income-qualified households.",
          "reasoningNotes": "Official state page was not fully readable, so confidence is medium. DOE and current program implementation sources support the measure list and regional availability limits."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "opportunityName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Boulder County EnergySmart",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4630/boulder-county-energysmart-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standard open-to-all rebates are no longer the current verified offering; current rebates are income-qualified.",
            "Gas furnaces and gas water heaters are not supported by the current 2026 EnergySmart rebate list.",
            "Commercial refrigeration is not supported.",
            "Solar PV and EV chargers are not direct EnergySmart rebate measures here; they only appear as allowable reasons for panel-upgrade support or as separate incentives.",
            "New construction is not eligible."
          ],
          "hardRequirements": [
            "Household must be in Boulder County and income-qualified at or below the current AMI threshold or otherwise qualifying through listed assistance programs.",
            "Preapproval and income verification are required before purchase or project start.",
            "Project must be for an existing residential or manufactured home, not new construction.",
            "Project must be completed and invoiced in the applicable program year.",
            "EnergySmart rebate plus other incentives generally cannot exceed the listed share of project cost.",
            "Registered contractor, utility, permit, code, documentation, and owner-authorization rules apply."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_resident",
            "low_income_household",
            "moderate_income_household",
            "homeowner",
            "renter_with_owner_authorization",
            "manufactured_home_resident"
          ],
          "eligibleSectors": [
            "residential",
            "manufactured_home"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing_weatherization",
            "cellular_shades",
            "duct_sealing_and_insulation",
            "ducted_air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "ground_source_geothermal_heat_pump",
            "air_to_water_heat_pump",
            "heat_pump_water_heater",
            "electric_resistance_water_heater_replacing_gas",
            "induction_cooktop_range",
            "electric_stove_replacing_gas",
            "heat_pump_clothes_dryer",
            "electric_panel_upgrade"
          ],
          "evidenceText": "EnergySmart’s 2026 Boulder County page says rebates are income-qualified, require preapproval, and cover insulation, air sealing, heat pumps, HPWHs, induction or electric stoves, heat-pump dryers and panel upgrades.",
          "reasoningNotes": "Older matches for furnace, gas water heater, refrigeration and solar PV should be blocked; current support is income-qualified electrification and envelope work."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
          "opportunityName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant/Rebate Program",
          "administrator": "Community Office for Resource Efficiency (CORE)",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5558/city-of-aspen-and-pitkin-county-renewable-energy-mitigation-program-grants",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, hvac."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic HVAC replacement unless it is a qualifying high-efficiency electrification, heat pump, heat recovery, or fuel-switching measure.",
            "Residential projects should not match commercial kitchen equipment categories.",
            "EV charging outside Aspen Electric is outside the EV charging incentive category.",
            "Projects outside the listed CORE service geography are ineligible.",
            "Design work is generally handled through rebates rather than implementation grants."
          ],
          "hardRequirements": [
            "Funding is first-come, first-served and subject to available annual program funds.",
            "Application and preapproval requirements apply before qualifying work where specified by CORE.",
            "Commercial and multifamily grants are for larger implementation projects and require greenhouse-gas impact analysis with CORE before application.",
            "EV charging rebates are limited to Aspen Electric customers.",
            "Residential, commercial, and multifamily projects must meet the applicable CORE program criteria for the property type and location."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "commercial_property_owner",
            "multifamily_property_owner",
            "tenant_with_owner_permission",
            "business",
            "nonprofit",
            "government"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily",
            "nonprofit",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_space_heating",
            "heat_pump_water_heating",
            "heat_recovery_ventilation",
            "building_envelope_air_sealing_insulation",
            "building_controls",
            "commercial_induction_cooking",
            "heat_pump_clothes_dryer",
            "commercial_kitchen_energy_efficiency",
            "ev_charging_aspen_electric_only",
            "custom_energy_efficiency",
            "design_assistance_commissioning"
          ],
          "evidenceText": "CORE]( funds energy efficiency and building electrification projects across Pitkin, Eagle, and Garfield counties; grants can reach $200,000 and commercial or multifamily grant applications are accepted rolling as funds allow.",
          "reasoningNotes": "The supplied high-efficiency HVAC match is supported only when narrowed to CORE-qualified electrification, heat pump, heat recovery, or fuel-switching work; the opportunity covers several other efficiency and electrification measures."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial refrigeration is not eligible under this residential rebate program.",
            "Do not infer commercial, industrial, or food-service equipment from the residential home rebates page.",
            "Gas furnace and boiler rebates should not be matched unless confirmed in current Xcel rules for the specific program year.",
            "Separate renewable energy, EV, or demand response offers should not be merged into this record."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Colorado residential Xcel Energy customer.",
            "Measures must meet Xcel Energy equipment and documentation requirements.",
            "Insulation and air sealing rebates require eligible residential project conditions.",
            "Heat pump rebates require qualifying equipment and may vary by customer fuel and income status.",
            "Rebates are subject to program funding and current measure rules."
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
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_central_air_conditioning"
          ],
          "evidenceText": "Xcel Colorado residential pages identify home rebates for heat pumps, heat pump water heaters, insulation, air sealing, and cooling equipment for residential customers.",
          "reasoningNotes": "The major correction is removal of commercial refrigeration. Xcel pages are partly dynamic, so confidence is medium, but current official pages support the residential envelope and heat pump categories."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5627",
          "opportunityName": "Xcel Energy - Residential Energy Efficiency Financing",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Xcel Energy Colorado and Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5627/xcel-energy-residential-energy-efficiency-financing",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope, energy_efficiency, hvac, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat this as an Xcel rebate.",
            "Do not match commercial or industrial projects.",
            "Do not infer measures outside the current RENU eligible-improvements list.",
            "Xcel-specific eligibility should not be expanded beyond Colorado customers without checking the current Xcel page."
          ],
          "hardRequirements": [
            "Property must be an eligible existing Colorado residence.",
            "Loan must be approved by a participating lender.",
            "Work must meet Colorado RENU eligible-improvement and contractor requirements.",
            "Townhomes and condominiums must not have shared HVAC systems where the RENU rules exclude shared systems.",
            "Financing terms and maximum loan amount depend on the current RENU lender product."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner",
            "property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "existing_single_family_home",
            "townhome",
            "condominium_without_shared_hvac"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_weatherization",
            "heat_pump_hvac_retrofit",
            "space_heating_cooling_upgrade",
            "heat_pump_water_heater",
            "windows_doors_replacement",
            "solar_pv_system",
            "battery_storage_system",
            "ev_charger_installation"
          ],
          "evidenceText": "Colorado RENU financing covers residential upgrades including heat pumps, windows and doors, air sealing and insulation, solar PV, battery storage, EV charging, and water heating.",
          "reasoningNotes": "The air sealing match is supported. Generic high-efficiency HVAC was narrowed to heat pump and space-heating or cooling upgrades under RENU financing."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "programName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "income_qualification",
            "preapproval",
            "eligible_project_cost",
            "measure_type",
            "completion_and_invoice_date",
            "other_incentives",
            "preapproval_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
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
              "inputKey": "income_qualification",
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
              "inputKey": "completion_and_invoice_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "other_incentives",
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
              "effectId": "effect_one_time_savings_1_94466f2a37effaa7",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 200000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "programName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "colorado_hear_region_and_funding_status",
            "household_income_tier",
            "selected_measure",
            "eligible_cost",
            "equipment_specifications",
            "participating_contractor_or_reservation_pathway",
            "income_tier",
            "region",
            "contractor_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "colorado_hear_region_and_funding_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "household_income_tier",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_contractor_or_reservation_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "income_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "region",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_status",
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
              "effectId": "effect_one_time_savings_1_19088d4c7872f863",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "programName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "xcel_colorado_residential_service_type",
            "selected_measure",
            "heating_or_cooling_customer_category",
            "equipment_tier_and_tonnage_where_applicable",
            "eligible_project_cost",
            "invoice_and_installation_date",
            "service_type",
            "equipment_tier",
            "tons_or_eligible_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_colorado_residential_service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heating_or_cooling_customer_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier_and_tonnage_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "invoice_and_installation_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_or_eligible_cost",
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
              "effectId": "effect_one_time_savings_1_f67a6e3d70014316",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 60000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
          "programName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [
            {
              "inputKey": "award_probability",
              "effectId": "effect_grant_expected_value_2_a28bd747b9260955",
              "label": "award_probability"
            }
          ],
          "requiredInputs": [
            "property_type",
            "county_or_service_geography",
            "eligible_project_cost",
            "participant_priority_category",
            "measure_type",
            "core_preapproval_requirements",
            "measure_eligibility",
            "greenhouse_gas_impact_analysis",
            "core_grant_application",
            "rebate_insufficiency_rationale",
            "award_decision",
            "grant_request",
            "ghg_impact_analysis",
            "award_probability",
            "eligible_project_cost_cents"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "property_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "county_or_service_geography",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participant_priority_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "core_preapproval_requirements",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_eligibility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "greenhouse_gas_impact_analysis",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "core_grant_application",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "rebate_insufficiency_rationale",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_decision",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "grant_request",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ghg_impact_analysis",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_probability",
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
              "effectId": "effect_one_time_savings_1_22733c30bc9dd9f9",
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
              "effectId": "effect_grant_expected_value_2_a28bd747b9260955",
              "effectType": "grant_expected_value",
              "calculationMethod": "expected_value",
              "valueModelKind": "competitive_max_only",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": [
                "award_probability"
              ]
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
      "opportunityCount": 6,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "opportunityName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Colorado Energy Office",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match high_efficiency_oven as commercial kitchen equipment; supported cooking measures are residential electric stove, cooktop, range or oven appliances.",
            "Do not match process_electrification_equipment; this is not an industrial process electrification program.",
            "Do not match Region 1 projects after its closure unless official reopening is verified.",
            "Do not match projects after August 1, 2026 or after funds are reserved unless official sources show continued availability."
          ],
          "hardRequirements": [
            "Household must meet HEAR income requirements, generally at or below 150 percent of area median income.",
            "Project must be in an eligible Colorado HEAR region with available funds.",
            "Work must use registered or participating contractors where required.",
            "Rebates are point-of-sale or reserved through program process, not post-hoc unrestricted rebates.",
            "Only existing residential home electrification and related shell measures are eligible."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_homeowner",
            "income_qualified_renter",
            "single_family_household",
            "multifamily_household"
          ],
          "eligibleSectors": [
            "residential",
            "income_qualified_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "cold_climate_heat_pump",
            "ductless_heat_pump",
            "heat_pump_water_heater",
            "electric_panel_upgrade",
            "electrical_wiring_upgrade",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "ventilation_upgrade",
            "electric_cooking_appliance",
            "heat_pump_clothes_dryer"
          ],
          "evidenceText": "Current Colorado HEAR sources show Region 1 closed and Region 2 open only until August 1, 2026 or until funds are reserved. Measures are residential electrification and shell upgrades for income-qualified households.",
          "reasoningNotes": "Official state page was not fully readable, so confidence is medium. DOE and current program implementation sources support the measure list and regional availability limits."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "opportunityName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Boulder County EnergySmart",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4630/boulder-county-energysmart-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standard open-to-all rebates are no longer the current verified offering; current rebates are income-qualified.",
            "Gas furnaces and gas water heaters are not supported by the current 2026 EnergySmart rebate list.",
            "Commercial refrigeration is not supported.",
            "Solar PV and EV chargers are not direct EnergySmart rebate measures here; they only appear as allowable reasons for panel-upgrade support or as separate incentives.",
            "New construction is not eligible."
          ],
          "hardRequirements": [
            "Household must be in Boulder County and income-qualified at or below the current AMI threshold or otherwise qualifying through listed assistance programs.",
            "Preapproval and income verification are required before purchase or project start.",
            "Project must be for an existing residential or manufactured home, not new construction.",
            "Project must be completed and invoiced in the applicable program year.",
            "EnergySmart rebate plus other incentives generally cannot exceed the listed share of project cost.",
            "Registered contractor, utility, permit, code, documentation, and owner-authorization rules apply."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_resident",
            "low_income_household",
            "moderate_income_household",
            "homeowner",
            "renter_with_owner_authorization",
            "manufactured_home_resident"
          ],
          "eligibleSectors": [
            "residential",
            "manufactured_home"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing_weatherization",
            "cellular_shades",
            "duct_sealing_and_insulation",
            "ducted_air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "ground_source_geothermal_heat_pump",
            "air_to_water_heat_pump",
            "heat_pump_water_heater",
            "electric_resistance_water_heater_replacing_gas",
            "induction_cooktop_range",
            "electric_stove_replacing_gas",
            "heat_pump_clothes_dryer",
            "electric_panel_upgrade"
          ],
          "evidenceText": "EnergySmart’s 2026 Boulder County page says rebates are income-qualified, require preapproval, and cover insulation, air sealing, heat pumps, HPWHs, induction or electric stoves, heat-pump dryers and panel upgrades.",
          "reasoningNotes": "Older matches for furnace, gas water heater, refrigeration and solar PV should be blocked; current support is income-qualified electrification and envelope work."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial refrigeration is not eligible under this residential rebate program.",
            "Do not infer commercial, industrial, or food-service equipment from the residential home rebates page.",
            "Gas furnace and boiler rebates should not be matched unless confirmed in current Xcel rules for the specific program year.",
            "Separate renewable energy, EV, or demand response offers should not be merged into this record."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Colorado residential Xcel Energy customer.",
            "Measures must meet Xcel Energy equipment and documentation requirements.",
            "Insulation and air sealing rebates require eligible residential project conditions.",
            "Heat pump rebates require qualifying equipment and may vary by customer fuel and income status.",
            "Rebates are subject to program funding and current measure rules."
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
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_central_air_conditioning"
          ],
          "evidenceText": "Xcel Colorado residential pages identify home rebates for heat pumps, heat pump water heaters, insulation, air sealing, and cooling equipment for residential customers.",
          "reasoningNotes": "The major correction is removal of commercial refrigeration. Xcel pages are partly dynamic, so confidence is medium, but current official pages support the residential envelope and heat pump categories."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5627",
          "opportunityName": "Xcel Energy - Residential Energy Efficiency Financing",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Xcel Energy Colorado and Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5627/xcel-energy-residential-energy-efficiency-financing",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope, energy_efficiency, hvac, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat this as an Xcel rebate.",
            "Do not match commercial or industrial projects.",
            "Do not infer measures outside the current RENU eligible-improvements list.",
            "Xcel-specific eligibility should not be expanded beyond Colorado customers without checking the current Xcel page."
          ],
          "hardRequirements": [
            "Property must be an eligible existing Colorado residence.",
            "Loan must be approved by a participating lender.",
            "Work must meet Colorado RENU eligible-improvement and contractor requirements.",
            "Townhomes and condominiums must not have shared HVAC systems where the RENU rules exclude shared systems.",
            "Financing terms and maximum loan amount depend on the current RENU lender product."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "homeowner",
            "property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "existing_single_family_home",
            "townhome",
            "condominium_without_shared_hvac"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_weatherization",
            "heat_pump_hvac_retrofit",
            "space_heating_cooling_upgrade",
            "heat_pump_water_heater",
            "windows_doors_replacement",
            "solar_pv_system",
            "battery_storage_system",
            "ev_charger_installation"
          ],
          "evidenceText": "Colorado RENU financing covers residential upgrades including heat pumps, windows and doors, air sealing and insulation, solar PV, battery storage, EV charging, and water heating.",
          "reasoningNotes": "The air sealing match is supported. Generic high-efficiency HVAC was narrowed to heat pump and space-heating or cooling upgrades under RENU financing."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "programName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "income_qualification",
            "preapproval",
            "eligible_project_cost",
            "measure_type",
            "completion_and_invoice_date",
            "other_incentives",
            "preapproval_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
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
              "inputKey": "income_qualification",
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
              "inputKey": "completion_and_invoice_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "other_incentives",
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
              "effectId": "effect_one_time_savings_1_94466f2a37effaa7",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 200000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "programName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "colorado_hear_region_and_funding_status",
            "household_income_tier",
            "selected_measure",
            "eligible_cost",
            "equipment_specifications",
            "participating_contractor_or_reservation_pathway",
            "income_tier",
            "region",
            "contractor_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "colorado_hear_region_and_funding_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "household_income_tier",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_contractor_or_reservation_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "income_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "region",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_status",
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
              "effectId": "effect_one_time_savings_1_19088d4c7872f863",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "programName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "xcel_colorado_residential_service_type",
            "selected_measure",
            "heating_or_cooling_customer_category",
            "equipment_tier_and_tonnage_where_applicable",
            "eligible_project_cost",
            "invoice_and_installation_date",
            "service_type",
            "equipment_tier",
            "tons_or_eligible_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_colorado_residential_service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heating_or_cooling_customer_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier_and_tonnage_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "invoice_and_installation_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_or_eligible_cost",
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
              "effectId": "effect_one_time_savings_1_f67a6e3d70014316",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 60000,
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
      "opportunityCount": 6,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "opportunityName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Colorado Energy Office",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match high_efficiency_oven as commercial kitchen equipment; supported cooking measures are residential electric stove, cooktop, range or oven appliances.",
            "Do not match process_electrification_equipment; this is not an industrial process electrification program.",
            "Do not match Region 1 projects after its closure unless official reopening is verified.",
            "Do not match projects after August 1, 2026 or after funds are reserved unless official sources show continued availability."
          ],
          "hardRequirements": [
            "Household must meet HEAR income requirements, generally at or below 150 percent of area median income.",
            "Project must be in an eligible Colorado HEAR region with available funds.",
            "Work must use registered or participating contractors where required.",
            "Rebates are point-of-sale or reserved through program process, not post-hoc unrestricted rebates.",
            "Only existing residential home electrification and related shell measures are eligible."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_homeowner",
            "income_qualified_renter",
            "single_family_household",
            "multifamily_household"
          ],
          "eligibleSectors": [
            "residential",
            "income_qualified_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "cold_climate_heat_pump",
            "ductless_heat_pump",
            "heat_pump_water_heater",
            "electric_panel_upgrade",
            "electrical_wiring_upgrade",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "ventilation_upgrade",
            "electric_cooking_appliance",
            "heat_pump_clothes_dryer"
          ],
          "evidenceText": "Current Colorado HEAR sources show Region 1 closed and Region 2 open only until August 1, 2026 or until funds are reserved. Measures are residential electrification and shell upgrades for income-qualified households.",
          "reasoningNotes": "Official state page was not fully readable, so confidence is medium. DOE and current program implementation sources support the measure list and regional availability limits."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5562",
          "opportunityName": "Summit County - Energy Smart Colorado Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "High Country Conservation Center",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5562/summit-county-energy-smart-colorado-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, building_envelope, energy_efficiency, renewable_energy, solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "LED lighting is not supported by the current Summit County rebate requirements.",
            "Smart thermostat or zoning should not match unless the measure is a qualifying programmable thermostat.",
            "Projects outside Summit County, new construction, or projects lacking required assessment/coach steps should not match."
          ],
          "hardRequirements": [
            "Home must be an existing residential building in Summit County.",
            "Applicant must enroll with Energy Smart Colorado and schedule an Energy Coach call.",
            "Many measures require an assessment before work.",
            "Application must generally be submitted within 90 days of paid invoice.",
            "Rebates are first-come, first-served and subject to local jurisdiction requirements."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_households",
            "renters_with_landlord_approval"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing",
            "balanced_ventilation",
            "crawlspace_or_basement_improvement",
            "duct_sealing",
            "electrical_panel_or_wiring_upgrade",
            "smart_heat_tape_controls",
            "level_2_ev_charger_installation",
            "induction_cooktop_or_range",
            "cold_climate_air_source_heat_pump",
            "heat_pump_water_heater",
            "heat_pump_clothes_dryer",
            "programmable_thermostat",
            "residential_solar_pv",
            "solar_thermal_water_heating",
            "window_replacement"
          ],
          "evidenceText": "The 2026 HC3 Energy Smart Colorado requirements list insulation, programmable thermostats, heat pumps, EV charging, solar, windows, and other home energy upgrades.",
          "reasoningNotes": "The insulation and thermostat matches are supported. LED lighting was removed because the current Summit County requirements do not list it."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "opportunityName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Boulder County EnergySmart",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4630/boulder-county-energysmart-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standard open-to-all rebates are no longer the current verified offering; current rebates are income-qualified.",
            "Gas furnaces and gas water heaters are not supported by the current 2026 EnergySmart rebate list.",
            "Commercial refrigeration is not supported.",
            "Solar PV and EV chargers are not direct EnergySmart rebate measures here; they only appear as allowable reasons for panel-upgrade support or as separate incentives.",
            "New construction is not eligible."
          ],
          "hardRequirements": [
            "Household must be in Boulder County and income-qualified at or below the current AMI threshold or otherwise qualifying through listed assistance programs.",
            "Preapproval and income verification are required before purchase or project start.",
            "Project must be for an existing residential or manufactured home, not new construction.",
            "Project must be completed and invoiced in the applicable program year.",
            "EnergySmart rebate plus other incentives generally cannot exceed the listed share of project cost.",
            "Registered contractor, utility, permit, code, documentation, and owner-authorization rules apply."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_resident",
            "low_income_household",
            "moderate_income_household",
            "homeowner",
            "renter_with_owner_authorization",
            "manufactured_home_resident"
          ],
          "eligibleSectors": [
            "residential",
            "manufactured_home"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing_weatherization",
            "cellular_shades",
            "duct_sealing_and_insulation",
            "ducted_air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "ground_source_geothermal_heat_pump",
            "air_to_water_heat_pump",
            "heat_pump_water_heater",
            "electric_resistance_water_heater_replacing_gas",
            "induction_cooktop_range",
            "electric_stove_replacing_gas",
            "heat_pump_clothes_dryer",
            "electric_panel_upgrade"
          ],
          "evidenceText": "EnergySmart’s 2026 Boulder County page says rebates are income-qualified, require preapproval, and cover insulation, air sealing, heat pumps, HPWHs, induction or electric stoves, heat-pump dryers and panel upgrades.",
          "reasoningNotes": "Older matches for furnace, gas water heater, refrigeration and solar PV should be blocked; current support is income-qualified electrification and envelope work."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial refrigeration is not eligible under this residential rebate program.",
            "Do not infer commercial, industrial, or food-service equipment from the residential home rebates page.",
            "Gas furnace and boiler rebates should not be matched unless confirmed in current Xcel rules for the specific program year.",
            "Separate renewable energy, EV, or demand response offers should not be merged into this record."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Colorado residential Xcel Energy customer.",
            "Measures must meet Xcel Energy equipment and documentation requirements.",
            "Insulation and air sealing rebates require eligible residential project conditions.",
            "Heat pump rebates require qualifying equipment and may vary by customer fuel and income status.",
            "Rebates are subject to program funding and current measure rules."
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
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_central_air_conditioning"
          ],
          "evidenceText": "Xcel Colorado residential pages identify home rebates for heat pumps, heat pump water heaters, insulation, air sealing, and cooling equipment for residential customers.",
          "reasoningNotes": "The major correction is removal of commercial refrigeration. Xcel pages are partly dynamic, so confidence is medium, but current official pages support the residential envelope and heat pump categories."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "programName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "income_qualification",
            "preapproval",
            "eligible_project_cost",
            "measure_type",
            "completion_and_invoice_date",
            "other_incentives",
            "preapproval_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
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
              "inputKey": "income_qualification",
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
              "inputKey": "completion_and_invoice_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "other_incentives",
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
              "effectId": "effect_one_time_savings_1_94466f2a37effaa7",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 200000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "programName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "colorado_hear_region_and_funding_status",
            "household_income_tier",
            "selected_measure",
            "eligible_cost",
            "equipment_specifications",
            "participating_contractor_or_reservation_pathway",
            "income_tier",
            "region",
            "contractor_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "colorado_hear_region_and_funding_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "household_income_tier",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_contractor_or_reservation_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "income_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "region",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_status",
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
              "effectId": "effect_one_time_savings_1_19088d4c7872f863",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "programName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "xcel_colorado_residential_service_type",
            "selected_measure",
            "heating_or_cooling_customer_category",
            "equipment_tier_and_tonnage_where_applicable",
            "eligible_project_cost",
            "invoice_and_installation_date",
            "service_type",
            "equipment_tier",
            "tons_or_eligible_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_colorado_residential_service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heating_or_cooling_customer_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier_and_tonnage_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "invoice_and_installation_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_or_eligible_cost",
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
              "effectId": "effect_one_time_savings_1_f67a6e3d70014316",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 60000,
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
      "opportunityCount": 5,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4210",
          "opportunityName": "Property Tax Exemption for Residential Renewable Energy Equipment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Colorado Division of Property Taxation and local assessors",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4210/property-tax-exemption-for-residential-renewable-energy-equipment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, wind, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match community solar subscriptions; they are not physical residential property equipment located on the home site.",
            "Do not match commercial renewable systems to this residential exemption record.",
            "Do not match standalone battery storage unless integrated with qualifying residential renewable energy equipment.",
            "Official DOLA web page was not accessible, so detailed current administrative guidance should be verified locally."
          ],
          "hardRequirements": [
            "Renewable energy personal property must be located on residential classified property and produce energy used by the residential property.",
            "Owner must provide required declaration or assessor documentation, including equipment type and costs.",
            "Battery storage should be tied to an eligible renewable energy system located at the residential property."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "homeowner",
            "taxpayer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "wind_energy_system",
            "biomass_biogas_energy_system",
            "ground_source_geothermal_heat_pump",
            "small_hydropower_system",
            "renewable_energy_integrated_battery_storage"
          ],
          "evidenceText": "Colorado]( renewable energy declaration forms list residential renewable equipment types such as solar, wind, biomass, hydroelectric, geothermal, and battery storage details.",
          "reasoningNotes": "Residential on-site renewable equipment is supported. Community solar subscription was a false-positive nonphysical category for this property tax exemption."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "opportunityName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Boulder County EnergySmart",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4630/boulder-county-energysmart-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standard open-to-all rebates are no longer the current verified offering; current rebates are income-qualified.",
            "Gas furnaces and gas water heaters are not supported by the current 2026 EnergySmart rebate list.",
            "Commercial refrigeration is not supported.",
            "Solar PV and EV chargers are not direct EnergySmart rebate measures here; they only appear as allowable reasons for panel-upgrade support or as separate incentives.",
            "New construction is not eligible."
          ],
          "hardRequirements": [
            "Household must be in Boulder County and income-qualified at or below the current AMI threshold or otherwise qualifying through listed assistance programs.",
            "Preapproval and income verification are required before purchase or project start.",
            "Project must be for an existing residential or manufactured home, not new construction.",
            "Project must be completed and invoiced in the applicable program year.",
            "EnergySmart rebate plus other incentives generally cannot exceed the listed share of project cost.",
            "Registered contractor, utility, permit, code, documentation, and owner-authorization rules apply."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_resident",
            "low_income_household",
            "moderate_income_household",
            "homeowner",
            "renter_with_owner_authorization",
            "manufactured_home_resident"
          ],
          "eligibleSectors": [
            "residential",
            "manufactured_home"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing_weatherization",
            "cellular_shades",
            "duct_sealing_and_insulation",
            "ducted_air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "ground_source_geothermal_heat_pump",
            "air_to_water_heat_pump",
            "heat_pump_water_heater",
            "electric_resistance_water_heater_replacing_gas",
            "induction_cooktop_range",
            "electric_stove_replacing_gas",
            "heat_pump_clothes_dryer",
            "electric_panel_upgrade"
          ],
          "evidenceText": "EnergySmart’s 2026 Boulder County page says rebates are income-qualified, require preapproval, and cover insulation, air sealing, heat pumps, HPWHs, induction or electric stoves, heat-pump dryers and panel upgrades.",
          "reasoningNotes": "Older matches for furnace, gas water heater, refrigeration and solar PV should be blocked; current support is income-qualified electrification and envelope work."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial refrigeration is not eligible under this residential rebate program.",
            "Do not infer commercial, industrial, or food-service equipment from the residential home rebates page.",
            "Gas furnace and boiler rebates should not be matched unless confirmed in current Xcel rules for the specific program year.",
            "Separate renewable energy, EV, or demand response offers should not be merged into this record."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Colorado residential Xcel Energy customer.",
            "Measures must meet Xcel Energy equipment and documentation requirements.",
            "Insulation and air sealing rebates require eligible residential project conditions.",
            "Heat pump rebates require qualifying equipment and may vary by customer fuel and income status.",
            "Rebates are subject to program funding and current measure rules."
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
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_central_air_conditioning"
          ],
          "evidenceText": "Xcel Colorado residential pages identify home rebates for heat pumps, heat pump water heaters, insulation, air sealing, and cooling equipment for residential customers.",
          "reasoningNotes": "The major correction is removal of commercial refrigeration. Xcel pages are partly dynamic, so confidence is medium, but current official pages support the residential envelope and heat pump categories."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "programName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "income_qualification",
            "preapproval",
            "eligible_project_cost",
            "measure_type",
            "completion_and_invoice_date",
            "other_incentives",
            "preapproval_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
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
              "inputKey": "income_qualification",
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
              "inputKey": "completion_and_invoice_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "other_incentives",
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
              "effectId": "effect_one_time_savings_1_94466f2a37effaa7",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 200000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "programName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "xcel_colorado_residential_service_type",
            "selected_measure",
            "heating_or_cooling_customer_category",
            "equipment_tier_and_tonnage_where_applicable",
            "eligible_project_cost",
            "invoice_and_installation_date",
            "service_type",
            "equipment_tier",
            "tons_or_eligible_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "xcel_colorado_residential_service_type",
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
              "inputKey": "heating_or_cooling_customer_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier_and_tonnage_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "invoice_and_installation_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_or_eligible_cost",
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
              "effectId": "effect_one_time_savings_1_f67a6e3d70014316",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 60000,
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
      "opportunityCount": 5,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2948",
          "opportunityName": "City of Boulder - Solar Grant Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Solar Grant",
          "administrator": "City of Boulder",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2948/city-of-boulder-solar-grant-program",
          "applicationUrl": "https://energysmartyes.com/electrification/solar/cob-grant/",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: solar, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "For-profit commercial solar projects are not supported by this grant.",
            "Projects outside the City of Boulder do not qualify.",
            "Do not match non-solar water heating equipment or unrelated efficiency retrofits."
          ],
          "hardRequirements": [
            "Residential applicant must own and occupy a qualifying home in the City of Boulder and meet income requirements.",
            "Residential applicants must enroll through EnergySmart or the current city-directed process.",
            "Nonprofit and affordable housing eligibility is limited to qualifying facilities or housing described by the city.",
            "Grant amounts and awards are subject to available funding and program caps."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_homeowners",
            "nonprofits",
            "nonprofit_affordable_housing_owners"
          ],
          "eligibleSectors": [
            "residential",
            "nonprofit",
            "affordable_housing"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system"
          ],
          "evidenceText": "Boulder states that solar grants support photovoltaic and thermal solar systems for income-qualified homeowners and qualified nonprofits, subject to funding.",
          "reasoningNotes": "The solar water heating match is source-backed, and rooftop solar PV should also be included because the current source expressly covers photovoltaic systems."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4082",
          "opportunityName": "City of Boulder - Solar Sales and Use Tax Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Tax Rebate",
          "administrator": "City of Boulder",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4082/city-of-boulder-solar-sales-and-use-tax-rebate",
          "applicationUrl": "https://bouldercolorado.gov/services/solar-and-battery-system-tax-rebates",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Projects outside the City of Boulder are not eligible.",
            "Do not treat this as a full equipment rebate or income-based incentive.",
            "Non-solar and non-battery building improvements are not eligible.",
            "Taxes or costs not paid to or inspected by the City of Boulder should not be matched."
          ],
          "hardRequirements": [
            "Project must be in the City of Boulder.",
            "Applicant must have paid City of Boulder sales or use tax on qualifying materials and permits.",
            "Application must be filed within 12 months of the city's final inspection.",
            "Solar photovoltaic, solar thermal, and qualifying permanently installed battery systems are eligible under current program materials.",
            "Rebate is only a portion of city sales and use tax, not total project cost."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "taxpayers",
            "permit_applicants"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "battery_storage_system"
          ],
          "evidenceText": "Boulder rebates part of city sales and use tax paid on qualifying solar installations and now includes permanently installed battery systems.",
          "reasoningNotes": "The solar PV and solar water heating matches are valid. Current official sources also support battery storage as part of the same tax rebate program."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "opportunityName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Colorado Energy Office",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match high_efficiency_oven as commercial kitchen equipment; supported cooking measures are residential electric stove, cooktop, range or oven appliances.",
            "Do not match process_electrification_equipment; this is not an industrial process electrification program.",
            "Do not match Region 1 projects after its closure unless official reopening is verified.",
            "Do not match projects after August 1, 2026 or after funds are reserved unless official sources show continued availability."
          ],
          "hardRequirements": [
            "Household must meet HEAR income requirements, generally at or below 150 percent of area median income.",
            "Project must be in an eligible Colorado HEAR region with available funds.",
            "Work must use registered or participating contractors where required.",
            "Rebates are point-of-sale or reserved through program process, not post-hoc unrestricted rebates.",
            "Only existing residential home electrification and related shell measures are eligible."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_homeowner",
            "income_qualified_renter",
            "single_family_household",
            "multifamily_household"
          ],
          "eligibleSectors": [
            "residential",
            "income_qualified_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "cold_climate_heat_pump",
            "ductless_heat_pump",
            "heat_pump_water_heater",
            "electric_panel_upgrade",
            "electrical_wiring_upgrade",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "ventilation_upgrade",
            "electric_cooking_appliance",
            "heat_pump_clothes_dryer"
          ],
          "evidenceText": "Current Colorado HEAR sources show Region 1 closed and Region 2 open only until August 1, 2026 or until funds are reserved. Measures are residential electrification and shell upgrades for income-qualified households.",
          "reasoningNotes": "Official state page was not fully readable, so confidence is medium. DOE and current program implementation sources support the measure list and regional availability limits."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "opportunityName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Boulder County EnergySmart",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4630/boulder-county-energysmart-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standard open-to-all rebates are no longer the current verified offering; current rebates are income-qualified.",
            "Gas furnaces and gas water heaters are not supported by the current 2026 EnergySmart rebate list.",
            "Commercial refrigeration is not supported.",
            "Solar PV and EV chargers are not direct EnergySmart rebate measures here; they only appear as allowable reasons for panel-upgrade support or as separate incentives.",
            "New construction is not eligible."
          ],
          "hardRequirements": [
            "Household must be in Boulder County and income-qualified at or below the current AMI threshold or otherwise qualifying through listed assistance programs.",
            "Preapproval and income verification are required before purchase or project start.",
            "Project must be for an existing residential or manufactured home, not new construction.",
            "Project must be completed and invoiced in the applicable program year.",
            "EnergySmart rebate plus other incentives generally cannot exceed the listed share of project cost.",
            "Registered contractor, utility, permit, code, documentation, and owner-authorization rules apply."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_resident",
            "low_income_household",
            "moderate_income_household",
            "homeowner",
            "renter_with_owner_authorization",
            "manufactured_home_resident"
          ],
          "eligibleSectors": [
            "residential",
            "manufactured_home"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing_weatherization",
            "cellular_shades",
            "duct_sealing_and_insulation",
            "ducted_air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "ground_source_geothermal_heat_pump",
            "air_to_water_heat_pump",
            "heat_pump_water_heater",
            "electric_resistance_water_heater_replacing_gas",
            "induction_cooktop_range",
            "electric_stove_replacing_gas",
            "heat_pump_clothes_dryer",
            "electric_panel_upgrade"
          ],
          "evidenceText": "EnergySmart’s 2026 Boulder County page says rebates are income-qualified, require preapproval, and cover insulation, air sealing, heat pumps, HPWHs, induction or electric stoves, heat-pump dryers and panel upgrades.",
          "reasoningNotes": "Older matches for furnace, gas water heater, refrigeration and solar PV should be blocked; current support is income-qualified electrification and envelope work."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial refrigeration is not eligible under this residential rebate program.",
            "Do not infer commercial, industrial, or food-service equipment from the residential home rebates page.",
            "Gas furnace and boiler rebates should not be matched unless confirmed in current Xcel rules for the specific program year.",
            "Separate renewable energy, EV, or demand response offers should not be merged into this record."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Colorado residential Xcel Energy customer.",
            "Measures must meet Xcel Energy equipment and documentation requirements.",
            "Insulation and air sealing rebates require eligible residential project conditions.",
            "Heat pump rebates require qualifying equipment and may vary by customer fuel and income status.",
            "Rebates are subject to program funding and current measure rules."
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
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_central_air_conditioning"
          ],
          "evidenceText": "Xcel Colorado residential pages identify home rebates for heat pumps, heat pump water heaters, insulation, air sealing, and cooling equipment for residential customers.",
          "reasoningNotes": "The major correction is removal of commercial refrigeration. Xcel pages are partly dynamic, so confidence is medium, but current official pages support the residential envelope and heat pump categories."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "programName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "income_qualification",
            "preapproval",
            "eligible_project_cost",
            "measure_type",
            "completion_and_invoice_date",
            "other_incentives",
            "preapproval_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
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
              "inputKey": "income_qualification",
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
              "inputKey": "completion_and_invoice_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "other_incentives",
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
              "effectId": "effect_one_time_savings_1_94466f2a37effaa7",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 200000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "programName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "colorado_hear_region_and_funding_status",
            "household_income_tier",
            "selected_measure",
            "eligible_cost",
            "equipment_specifications",
            "participating_contractor_or_reservation_pathway",
            "income_tier",
            "region",
            "contractor_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "colorado_hear_region_and_funding_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "household_income_tier",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_contractor_or_reservation_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "income_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "region",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_status",
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
              "effectId": "effect_one_time_savings_1_19088d4c7872f863",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "programName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "xcel_colorado_residential_service_type",
            "selected_measure",
            "heating_or_cooling_customer_category",
            "equipment_tier_and_tonnage_where_applicable",
            "eligible_project_cost",
            "invoice_and_installation_date",
            "service_type",
            "equipment_tier",
            "tons_or_eligible_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_colorado_residential_service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heating_or_cooling_customer_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier_and_tonnage_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "invoice_and_installation_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_or_eligible_cost",
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
              "effectId": "effect_one_time_savings_1_f67a6e3d70014316",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 60000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "opportunityName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Colorado Energy Office",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match high_efficiency_oven as commercial kitchen equipment; supported cooking measures are residential electric stove, cooktop, range or oven appliances.",
            "Do not match process_electrification_equipment; this is not an industrial process electrification program.",
            "Do not match Region 1 projects after its closure unless official reopening is verified.",
            "Do not match projects after August 1, 2026 or after funds are reserved unless official sources show continued availability."
          ],
          "hardRequirements": [
            "Household must meet HEAR income requirements, generally at or below 150 percent of area median income.",
            "Project must be in an eligible Colorado HEAR region with available funds.",
            "Work must use registered or participating contractors where required.",
            "Rebates are point-of-sale or reserved through program process, not post-hoc unrestricted rebates.",
            "Only existing residential home electrification and related shell measures are eligible."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_homeowner",
            "income_qualified_renter",
            "single_family_household",
            "multifamily_household"
          ],
          "eligibleSectors": [
            "residential",
            "income_qualified_residential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "cold_climate_heat_pump",
            "ductless_heat_pump",
            "heat_pump_water_heater",
            "electric_panel_upgrade",
            "electrical_wiring_upgrade",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "ventilation_upgrade",
            "electric_cooking_appliance",
            "heat_pump_clothes_dryer"
          ],
          "evidenceText": "Current Colorado HEAR sources show Region 1 closed and Region 2 open only until August 1, 2026 or until funds are reserved. Measures are residential electrification and shell upgrades for income-qualified households.",
          "reasoningNotes": "Official state page was not fully readable, so confidence is medium. DOE and current program implementation sources support the measure list and regional availability limits."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "opportunityName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Boulder County EnergySmart",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4630/boulder-county-energysmart-residential-energy-efficiency-rebate-program",
          "applicationUrl": "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standard open-to-all rebates are no longer the current verified offering; current rebates are income-qualified.",
            "Gas furnaces and gas water heaters are not supported by the current 2026 EnergySmart rebate list.",
            "Commercial refrigeration is not supported.",
            "Solar PV and EV chargers are not direct EnergySmart rebate measures here; they only appear as allowable reasons for panel-upgrade support or as separate incentives.",
            "New construction is not eligible."
          ],
          "hardRequirements": [
            "Household must be in Boulder County and income-qualified at or below the current AMI threshold or otherwise qualifying through listed assistance programs.",
            "Preapproval and income verification are required before purchase or project start.",
            "Project must be for an existing residential or manufactured home, not new construction.",
            "Project must be completed and invoiced in the applicable program year.",
            "EnergySmart rebate plus other incentives generally cannot exceed the listed share of project cost.",
            "Registered contractor, utility, permit, code, documentation, and owner-authorization rules apply."
          ],
          "eligibleApplicantTypes": [
            "income_qualified_resident",
            "low_income_household",
            "moderate_income_household",
            "homeowner",
            "renter_with_owner_authorization",
            "manufactured_home_resident"
          ],
          "eligibleSectors": [
            "residential",
            "manufactured_home"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing_weatherization",
            "cellular_shades",
            "duct_sealing_and_insulation",
            "ducted_air_source_heat_pump",
            "ductless_mini_split_heat_pump",
            "ground_source_geothermal_heat_pump",
            "air_to_water_heat_pump",
            "heat_pump_water_heater",
            "electric_resistance_water_heater_replacing_gas",
            "induction_cooktop_range",
            "electric_stove_replacing_gas",
            "heat_pump_clothes_dryer",
            "electric_panel_upgrade"
          ],
          "evidenceText": "EnergySmart’s 2026 Boulder County page says rebates are income-qualified, require preapproval, and cover insulation, air sealing, heat pumps, HPWHs, induction or electric stoves, heat-pump dryers and panel upgrades.",
          "reasoningNotes": "Older matches for furnace, gas water heater, refrigeration and solar PV should be blocked; current support is income-qualified electrification and envelope work."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Efficiency Rebate Program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial refrigeration is not eligible under this residential rebate program.",
            "Do not infer commercial, industrial, or food-service equipment from the residential home rebates page.",
            "Gas furnace and boiler rebates should not be matched unless confirmed in current Xcel rules for the specific program year.",
            "Separate renewable energy, EV, or demand response offers should not be merged into this record."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Colorado residential Xcel Energy customer.",
            "Measures must meet Xcel Energy equipment and documentation requirements.",
            "Insulation and air sealing rebates require eligible residential project conditions.",
            "Heat pump rebates require qualifying equipment and may vary by customer fuel and income status.",
            "Rebates are subject to program funding and current measure rules."
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
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "high_efficiency_central_air_conditioning"
          ],
          "evidenceText": "Xcel Colorado residential pages identify home rebates for heat pumps, heat pump water heaters, insulation, air sealing, and cooling equipment for residential customers.",
          "reasoningNotes": "The major correction is removal of commercial refrigeration. Xcel pages are partly dynamic, so confidence is medium, but current official pages support the residential envelope and heat pump categories."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
          "programName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "income_qualification",
            "preapproval",
            "eligible_project_cost",
            "measure_type",
            "completion_and_invoice_date",
            "other_incentives",
            "preapproval_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
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
              "inputKey": "income_qualification",
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
              "inputKey": "completion_and_invoice_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "other_incentives",
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
              "effectId": "effect_one_time_savings_1_94466f2a37effaa7",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 200000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
          "programName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "colorado_hear_region_and_funding_status",
            "household_income_tier",
            "selected_measure",
            "eligible_cost",
            "equipment_specifications",
            "participating_contractor_or_reservation_pathway",
            "income_tier",
            "region",
            "contractor_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "colorado_hear_region_and_funding_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "household_income_tier",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participating_contractor_or_reservation_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "income_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "region",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_status",
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
              "effectId": "effect_one_time_savings_1_19088d4c7872f863",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
          "programName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "xcel_colorado_residential_service_type",
            "selected_measure",
            "heating_or_cooling_customer_category",
            "equipment_tier_and_tonnage_where_applicable",
            "eligible_project_cost",
            "invoice_and_installation_date",
            "service_type",
            "equipment_tier",
            "tons_or_eligible_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "xcel_colorado_residential_service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heating_or_cooling_customer_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier_and_tonnage_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "invoice_and_installation_date",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "service_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_or_eligible_cost",
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
              "effectId": "effect_one_time_savings_1_f67a6e3d70014316",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 60000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 3,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4210",
          "opportunityName": "Property Tax Exemption for Residential Renewable Energy Equipment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Colorado Division of Property Taxation and local assessors",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4210/property-tax-exemption-for-residential-renewable-energy-equipment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, wind, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match community solar subscriptions; they are not physical residential property equipment located on the home site.",
            "Do not match commercial renewable systems to this residential exemption record.",
            "Do not match standalone battery storage unless integrated with qualifying residential renewable energy equipment.",
            "Official DOLA web page was not accessible, so detailed current administrative guidance should be verified locally."
          ],
          "hardRequirements": [
            "Renewable energy personal property must be located on residential classified property and produce energy used by the residential property.",
            "Owner must provide required declaration or assessor documentation, including equipment type and costs.",
            "Battery storage should be tied to an eligible renewable energy system located at the residential property."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "homeowner",
            "taxpayer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "wind_energy_system",
            "biomass_biogas_energy_system",
            "ground_source_geothermal_heat_pump",
            "small_hydropower_system",
            "renewable_energy_integrated_battery_storage"
          ],
          "evidenceText": "Colorado]( renewable energy declaration forms list residential renewable equipment types such as solar, wind, biomass, hydroelectric, geothermal, and battery storage details.",
          "reasoningNotes": "Residential on-site renewable equipment is supported. Community solar subscription was a false-positive nonphysical category for this property tax exemption."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22490",
          "opportunityName": "Tax Credit for Residential Energy Storage Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Personal Tax Credit",
          "administrator": "Colorado Department of Revenue",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22490/tax-credit-for-residential-energy-storage-systems",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Commercial or utility-scale energy storage is not supported by this residential tax credit.",
            "Non-Colorado buildings are not eligible.",
            "This is an income tax credit, not a rebate issued by a utility."
          ],
          "hardRequirements": [
            "Qualifying residential energy storage system must be installed into a Colorado residential building.",
            "Building owner may include a lessee that buys the system and installs it with lessor approval.",
            "Taxpayer must complete Form DR 1307 and file as required unless the credit is assigned.",
            "Credit refundability/carryforward depends on assignment status."
          ],
          "eligibleApplicantTypes": [
            "residential_building_owner",
            "lessee_with_lessor_approval"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_energy_storage_system",
            "battery_storage_system"
          ],
          "evidenceText": "Colorado]( DOR states that qualifying building owners installing residential energy storage systems in Colorado residential buildings may claim the credit using DR 1307.",
          "reasoningNotes": "The battery_storage_system match is source-backed and should be limited to qualifying residential systems and tax-credit filing requirements."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22489",
          "opportunityName": "Sales Tax Exemption for Energy Storage Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Sales Tax Incentive",
          "administrator": "Colorado Department of Revenue",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22489/sales-tax-exemption-for-energy-storage-systems",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match commercial or industrial battery systems.",
            "Do not match non-battery energy storage unless specifically covered by current law.",
            "Do not treat this as an installation rebate or utility incentive."
          ],
          "hardRequirements": [
            "System must be a commercially available battery system capable of storing and delivering energy.",
            "System must be installed in a residential building.",
            "Exemption applies to Colorado state sales and use tax treatment for qualifying residential energy storage systems.",
            "Exemption is scheduled under Colorado statute with an expiration date unless amended."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "residential_energy_storage_purchasers"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "residential_battery_storage_system"
          ],
          "evidenceText": "Colorado]( tax expenditure materials describe a sales and use tax exemption for purchases of residential energy storage systems installed in residential buildings.",
          "reasoningNotes": "The energy storage match is correct only when narrowed to residential battery storage, not broad commercial energy storage."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22156",
          "opportunityName": "Electric Vehicle Income Tax Credit",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Income Tax Credit",
          "administrator": "Colorado Department of Revenue",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.83,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22156/electric-vehicle-income-tax-credit",
          "applicationUrl": "https://tax.colorado.gov/DR0618",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: fleet_electrification, clean_transportation, ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No EV charger installation is funded by this credit.",
            "No building or property retrofit is supported.",
            "Vehicle Exchange Colorado and federal vehicle credits are separate programs.",
            "Used conventional vehicles and non-qualifying hybrids are not supported by this opportunity."
          ],
          "hardRequirements": [
            "Vehicle must qualify under Colorado Department of Revenue electric or plug-in hybrid vehicle tax credit rules.",
            "Credit is tied to purchase or lease of a qualifying new vehicle that is titled or registered as required in Colorado.",
            "Taxpayer claims the credit on Colorado income tax unless the credit is assigned.",
            "Assignment to a dealer or financing entity requires the required Department of Revenue assignment form.",
            "Vehicle price, lease term, and other eligibility limits in current Colorado guidance apply."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayer",
            "business_taxpayer",
            "lessee",
            "purchaser"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "fleet"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Colorado]( DOR describes state tax credits for purchase or lease of new electric and plug-in hybrid vehicles; assignment to a dealer or financing entity uses DR 0618.",
          "reasoningNotes": "Remove the EV charger installation category. This is a vehicle income tax credit, not charging equipment or property work."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4210",
          "opportunityName": "Property Tax Exemption for Residential Renewable Energy Equipment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Colorado Division of Property Taxation and local assessors",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4210/property-tax-exemption-for-residential-renewable-energy-equipment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, wind, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match community solar subscriptions; they are not physical residential property equipment located on the home site.",
            "Do not match commercial renewable systems to this residential exemption record.",
            "Do not match standalone battery storage unless integrated with qualifying residential renewable energy equipment.",
            "Official DOLA web page was not accessible, so detailed current administrative guidance should be verified locally."
          ],
          "hardRequirements": [
            "Renewable energy personal property must be located on residential classified property and produce energy used by the residential property.",
            "Owner must provide required declaration or assessor documentation, including equipment type and costs.",
            "Battery storage should be tied to an eligible renewable energy system located at the residential property."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "homeowner",
            "taxpayer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "wind_energy_system",
            "biomass_biogas_energy_system",
            "ground_source_geothermal_heat_pump",
            "small_hydropower_system",
            "renewable_energy_integrated_battery_storage"
          ],
          "evidenceText": "Colorado]( renewable energy declaration forms list residential renewable equipment types such as solar, wind, biomass, hydroelectric, geothermal, and battery storage details.",
          "reasoningNotes": "Residential on-site renewable equipment is supported. Community solar subscription was a false-positive nonphysical category for this property tax exemption."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5562",
          "opportunityName": "Summit County - Energy Smart Colorado Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "High Country Conservation Center",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5562/summit-county-energy-smart-colorado-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, building_envelope, energy_efficiency, renewable_energy, solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "LED lighting is not supported by the current Summit County rebate requirements.",
            "Smart thermostat or zoning should not match unless the measure is a qualifying programmable thermostat.",
            "Projects outside Summit County, new construction, or projects lacking required assessment/coach steps should not match."
          ],
          "hardRequirements": [
            "Home must be an existing residential building in Summit County.",
            "Applicant must enroll with Energy Smart Colorado and schedule an Energy Coach call.",
            "Many measures require an assessment before work.",
            "Application must generally be submitted within 90 days of paid invoice.",
            "Rebates are first-come, first-served and subject to local jurisdiction requirements."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_households",
            "renters_with_landlord_approval"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing",
            "balanced_ventilation",
            "crawlspace_or_basement_improvement",
            "duct_sealing",
            "electrical_panel_or_wiring_upgrade",
            "smart_heat_tape_controls",
            "level_2_ev_charger_installation",
            "induction_cooktop_or_range",
            "cold_climate_air_source_heat_pump",
            "heat_pump_water_heater",
            "heat_pump_clothes_dryer",
            "programmable_thermostat",
            "residential_solar_pv",
            "solar_thermal_water_heating",
            "window_replacement"
          ],
          "evidenceText": "The 2026 HC3 Energy Smart Colorado requirements list insulation, programmable thermostats, heat pumps, EV charging, solar, windows, and other home energy upgrades.",
          "reasoningNotes": "The insulation and thermostat matches are supported. LED lighting was removed because the current Summit County requirements do not list it."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4210",
          "opportunityName": "Property Tax Exemption for Residential Renewable Energy Equipment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Colorado Division of Property Taxation and local assessors",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4210/property-tax-exemption-for-residential-renewable-energy-equipment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, wind, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match community solar subscriptions; they are not physical residential property equipment located on the home site.",
            "Do not match commercial renewable systems to this residential exemption record.",
            "Do not match standalone battery storage unless integrated with qualifying residential renewable energy equipment.",
            "Official DOLA web page was not accessible, so detailed current administrative guidance should be verified locally."
          ],
          "hardRequirements": [
            "Renewable energy personal property must be located on residential classified property and produce energy used by the residential property.",
            "Owner must provide required declaration or assessor documentation, including equipment type and costs.",
            "Battery storage should be tied to an eligible renewable energy system located at the residential property."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "homeowner",
            "taxpayer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "wind_energy_system",
            "biomass_biogas_energy_system",
            "ground_source_geothermal_heat_pump",
            "small_hydropower_system",
            "renewable_energy_integrated_battery_storage"
          ],
          "evidenceText": "Colorado]( renewable energy declaration forms list residential renewable equipment types such as solar, wind, biomass, hydroelectric, geothermal, and battery storage details.",
          "reasoningNotes": "Residential on-site renewable equipment is supported. Community solar subscription was a false-positive nonphysical category for this property tax exemption."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "high_efficiency_commercial_dishwasher",
      "displayName": "High-efficiency commercial dishwasher",
      "parentCategory": "commercial_kitchen_foodservice",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 254400,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5307",
          "opportunityName": "City and County of Denver - Elevations Energy Loans",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Residential Energy Loan",
          "administrator": "Elevations Credit Union",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5307/city-and-county-of-denver-elevations-energy-loans",
          "applicationUrl": "https://www.elevationscu.com/personal/loans/energy",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, commercial_kitchen, refrigeration, lighting, building_envelope, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat the program as a rebate or grant.",
            "Commercial dishwashers, commercial refrigeration, and other business equipment are not supported by this residential financing program.",
            "Biomass or geothermal should not be matched unless the current lender-approved project list or review explicitly accepts the specific measure.",
            "Denver-only geography is too narrow for current Colorado home energy loan sources."
          ],
          "hardRequirements": [
            "Applicant must qualify for financing under lender underwriting and membership requirements.",
            "Project must be an eligible home energy improvement approved by the lender or Colorado RENU pathway.",
            "Loan proceeds finance eligible improvements; this is not a rebate and does not guarantee project cost reimbursement.",
            "Contractor, invoice, and project documentation may be required before or after loan approval."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "residential_borrower",
            "property_owner",
            "credit_union_member"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_battery_storage",
            "ev_home_charging_station",
            "window_replacement",
            "air_sealing_weatherization",
            "insulation_upgrade",
            "high_efficiency_hvac_replacement",
            "water_heating_upgrade",
            "led_lighting_retrofit"
          ],
          "evidenceText": "Elevations describes a home energy loan for eligible improvements such as solar, batteries, EV charging, windows, air sealing, insulation, HVAC, water heating, and lighting.",
          "reasoningNotes": "Preserved only residential financing-eligible project categories. Removed commercial equipment and treated the record as loan support rather than measure-specific rebates."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "induction_cooking_equipment",
      "displayName": "Induction cooking equipment",
      "parentCategory": "commercial_kitchen_foodservice",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 232800,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 45000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 45000,
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
          "upfrontCostAfterSavingsCents": 232800,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5349",
          "opportunityName": "Colorado Residential Energy Upgrade (RENU) Loan program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Program",
          "administrator": "Colorado Clean Energy Fund",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_envelope, ev_charging, solar, energy_efficiency, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is loan financing, not a rebate.",
            "Solar thermal was not verified on the current RENU financeable category list.",
            "Induction cooking was not verified on the current RENU page.",
            "Commercial kitchen induction is a false-positive category for this residential loan."
          ],
          "hardRequirements": [
            "Project must be at an existing residential property in Colorado.",
            "Borrower must use a participating RENU lender and authorized contractor.",
            "Loan financing may be secured with a UCC-1 filing on installed measures.",
            "Eligible measures must fit the current financeable categories listed by Colorado Clean Energy Fund."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_property_owners",
            "rental_property_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ground_source_geothermal_heat_pump",
            "battery_storage_system",
            "ev_charger_installation",
            "heat_pump_water_heater",
            "high_efficiency_water_heater",
            "insulation_upgrade",
            "air_sealing_weatherization",
            "window_replacement",
            "exterior_door_replacement"
          ],
          "evidenceText": "The current RENU page describes statewide below-market residential financing for solar PV, HVAC, battery storage, EV charging, insulation and air sealing, water heating, windows, and doors.",
          "reasoningNotes": "Categories are limited to current Colorado Clean Energy Fund financeable categories and treated as financing support rather than rebates."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5562",
          "opportunityName": "Summit County - Energy Smart Colorado Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "High Country Conservation Center",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5562/summit-county-energy-smart-colorado-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, building_envelope, energy_efficiency, renewable_energy, solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "LED lighting is not supported by the current Summit County rebate requirements.",
            "Smart thermostat or zoning should not match unless the measure is a qualifying programmable thermostat.",
            "Projects outside Summit County, new construction, or projects lacking required assessment/coach steps should not match."
          ],
          "hardRequirements": [
            "Home must be an existing residential building in Summit County.",
            "Applicant must enroll with Energy Smart Colorado and schedule an Energy Coach call.",
            "Many measures require an assessment before work.",
            "Application must generally be submitted within 90 days of paid invoice.",
            "Rebates are first-come, first-served and subject to local jurisdiction requirements."
          ],
          "eligibleApplicantTypes": [
            "homeowners",
            "residential_households",
            "renters_with_landlord_approval"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "insulation_upgrade",
            "air_sealing",
            "balanced_ventilation",
            "crawlspace_or_basement_improvement",
            "duct_sealing",
            "electrical_panel_or_wiring_upgrade",
            "smart_heat_tape_controls",
            "level_2_ev_charger_installation",
            "induction_cooktop_or_range",
            "cold_climate_air_source_heat_pump",
            "heat_pump_water_heater",
            "heat_pump_clothes_dryer",
            "programmable_thermostat",
            "residential_solar_pv",
            "solar_thermal_water_heating",
            "window_replacement"
          ],
          "evidenceText": "The 2026 HC3 Energy Smart Colorado requirements list insulation, programmable thermostats, heat pumps, EV charging, solar, windows, and other home energy upgrades.",
          "reasoningNotes": "The insulation and thermostat matches are supported. LED lighting was removed because the current Summit County requirements do not list it."
        }
      ],
      "v2PackageSummaries": []
    }
  ]
}
