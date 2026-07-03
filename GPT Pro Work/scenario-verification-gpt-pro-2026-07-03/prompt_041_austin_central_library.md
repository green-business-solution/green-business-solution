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
  "testCaseOrdinal": 41,
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

Packet 41 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 41,
  "sampleUserId": "austin-central-library",
  "description": "Municipal public library in Austin Energy territory with civic, cafe, parking, IT, and event loads.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "government"
      ],
      "primaryActivityText": "Public library service, civic events, community technology access, cafe, and public assembly",
      "naicsCodes": [
        "519210",
        "921190"
      ],
      "organizationSize": "51-250 employees"
    },
    "site": {
      "address": {
        "raw": "710 W Cesar Chavez Street, Austin, TX 78701, USA",
        "stateCode": "TX",
        "zip5": "78701"
      },
      "geo": {
        "stateCode": "TX",
        "zip5": "78701",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Austin Energy",
          "distributionUtilityId": "UTIL_AUSTIN_ENERGY",
          "territoryCandidates": [
            "UTIL_AUSTIN_ENERGY"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "public_institutional"
      ],
      "squareFootage": {
        "value": 198210,
        "raw": "198,210",
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
    "eligible": 5,
    "ineligible": 1514
  },
  "retrofitCount": 16,
  "retrofits": [
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
            "Applicant type overlaps eligible sector: government.",
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
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
            "Applicant type overlaps eligible sector: government.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
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
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 48000,
        "annualRecurringExpensesCents": 25200,
        "netAnnualRecurringSavingsCents": 22800,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2011",
          "opportunityName": "Austin Energy - Home Energy Savings Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Austin Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2011/austin-energy-home-energy-savings-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state TX matches opportunity geography.",
            "Self-reported utility matches Austin Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: hvac, refrigeration, solar, building_controls, building_envelope, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Austin Energy explicitly states there are no new window rebates in this Home Energy Savings program.",
            "Heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity.",
            "Demand response and Power Partner Thermostats are separate program boundaries.",
            "Commercial refrigeration and other commercial categories are not supported.",
            "Mobile and manufactured homes are excluded by the Home Energy Savings eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must receive Austin Energy electric service at residential rates.",
            "Work must be performed through a participating Home Energy Savings contractor.",
            "Contractor must complete the assessment, recommend improvements, and assist with the rebate process.",
            "Project generally requires at least three eligible upgrades and at least the minimum rebate amount.",
            "Home must meet age, property type, inspection, documentation, and prior-participation requirements.",
            "Renters or occupants must have owner authorization."
          ],
          "eligibleApplicantTypes": [
            "homeowner",
            "property_owner",
            "authorized_lessee_or_occupant",
            "renter_with_owner_permission"
          ],
          "eligibleSectors": [
            "residential",
            "small_multifamily"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "duct_sealing_and_insulation",
            "attic_insulation_upgrade",
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "ductless_mini_split_heat_pump",
            "hvac_tune_up",
            "hvac_airflow_balancing",
            "smart_thermostat_zoning_retrofit",
            "solar_screen_window_film",
            "attic_access_insulation",
            "pleated_media_filter_upgrade",
            "residential_energy_efficiency_financing"
          ],
          "evidenceText": "Austin Energy’s Home Energy Savings page lists contractor-installed air and duct sealing, attic insulation, HVAC and heat-pump upgrades, tune-ups, solar screens or film and eligible smart thermostats, with no new window rebates.",
          "reasoningNotes": "Window replacement, HPWH, demand response and refrigeration were false positives or separate programs. Financing is included only as the related residential efficiency loan path."
        }
      ],
      "v2PackageSummaries": []
    }
  ]
}
