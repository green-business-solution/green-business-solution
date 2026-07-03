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
  "testCaseOrdinal": 31,
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

Packet 31 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 31,
  "sampleUserId": "boeing-everett-factory",
  "description": "Enormous aerospace manufacturing complex in Snohomish PUD electric and Puget Sound Energy gas territory.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "industrial"
      ],
      "primaryActivityText": "Commercial aircraft assembly, manufacturing, testing, offices, warehousing, and logistics",
      "naicsCodes": [
        "336411"
      ],
      "organizationSize": "1,000+ employees"
    },
    "site": {
      "address": {
        "raw": "3003 W Casino Road, Everett, WA 98204, USA",
        "stateCode": "WA",
        "zip5": "98204"
      },
      "geo": {
        "stateCode": "WA",
        "zip5": "98204",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Snohomish County Public Utility District",
          "distributionUtilityId": "UTIL_SNOHOMISH_PUD",
          "territoryCandidates": [
            "UTIL_SNOHOMISH_PUD"
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
        "value": 4281948,
        "raw": "4,281,948",
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
    "eligible": 12,
    "ineligible": 1507
  },
  "retrofitCount": 16,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:576",
          "opportunityName": "Renewable Energy Sales and Use Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Use Tax Exemption",
          "administrator": "Washington State Department of Revenue",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/576/renewable-energy-sales-and-use-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Ground-source geothermal heat pumps are not supported by the current Department of Revenue electric generation equipment guidance.",
            "Solar water heating is not supported by the current official renewable electricity equipment exemption page.",
            "Biomass heating or thermal systems should not match unless the equipment generates electricity under the listed renewable categories."
          ],
          "hardRequirements": [
            "Eligible machinery, equipment and installation labor must meet Washington Department of Revenue renewable energy equipment requirements.",
            "Large solar and non-solar renewable systems are subject to size and technology thresholds.",
            "Some categories are structured as a refund requiring the buyer to pay sales or use tax first and then apply for the refund.",
            "The incentive is scheduled to expire January 1, 2030 unless extended or amended."
          ],
          "eligibleApplicantTypes": [
            "system_purchaser",
            "property_owner",
            "business_owner",
            "homeowner",
            "taxpayer",
            "public_entity",
            "nonprofit"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_electric_generation",
            "rooftop_solar_pv",
            "biomass_biogas_electric_generation",
            "geothermal_electric_generation",
            "wind_electric_generation",
            "tidal_wave_electric_generation",
            "fuel_cell_electric_generation",
            "waste_heat_to_power_electric_generation"
          ],
          "evidenceText": "Washington DOR describes a sales and use tax exemption or refund for renewable systems that generate electricity, including qualifying solar and listed non-solar renewable resources such as biomass, geothermal, wind, tidal or wave, fuel cells and lost-exhaust energy.",
          "reasoningNotes": "Current official guidance supports renewable electric generation equipment, not solar thermal water heating or ground-source heat pump HVAC."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:576",
          "opportunityName": "Renewable Energy Sales and Use Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Use Tax Exemption",
          "administrator": "Washington State Department of Revenue",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/576/renewable-energy-sales-and-use-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Ground-source geothermal heat pumps are not supported by the current Department of Revenue electric generation equipment guidance.",
            "Solar water heating is not supported by the current official renewable electricity equipment exemption page.",
            "Biomass heating or thermal systems should not match unless the equipment generates electricity under the listed renewable categories."
          ],
          "hardRequirements": [
            "Eligible machinery, equipment and installation labor must meet Washington Department of Revenue renewable energy equipment requirements.",
            "Large solar and non-solar renewable systems are subject to size and technology thresholds.",
            "Some categories are structured as a refund requiring the buyer to pay sales or use tax first and then apply for the refund.",
            "The incentive is scheduled to expire January 1, 2030 unless extended or amended."
          ],
          "eligibleApplicantTypes": [
            "system_purchaser",
            "property_owner",
            "business_owner",
            "homeowner",
            "taxpayer",
            "public_entity",
            "nonprofit"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_electric_generation",
            "rooftop_solar_pv",
            "biomass_biogas_electric_generation",
            "geothermal_electric_generation",
            "wind_electric_generation",
            "tidal_wave_electric_generation",
            "fuel_cell_electric_generation",
            "waste_heat_to_power_electric_generation"
          ],
          "evidenceText": "Washington DOR describes a sales and use tax exemption or refund for renewable systems that generate electricity, including qualifying solar and listed non-solar renewable resources such as biomass, geothermal, wind, tidal or wave, fuel cells and lost-exhaust energy.",
          "reasoningNotes": "Current official guidance supports renewable electric generation equipment, not solar thermal water heating or ground-source heat pump HVAC."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "opportunityName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Snohomish County PUD",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program",
          "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Self-reported utility matches Snohomish County PUD.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential measures to this commercial and industrial program.",
            "Commercial and industrial EV charger rebates are a separate portal line and should not be inferred from this efficiency match.",
            "Windows and insulation are limited to electrically heated facilities.",
            "Custom and equipment projects need PUD review and pre-approval."
          ],
          "hardRequirements": [
            "Applicant must be a Snohomish PUD business electric customer.",
            "All projects require pre-approval before installation.",
            "Rebates may not exceed 100 percent of project cost.",
            "Windows and insulation apply to electrically heated facilities.",
            "Measures must meet PUD business rebate or custom project specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "contractor_or_trade_ally"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "multifamily_common_area_or_business_facility"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "packaged_terminal_heat_pump",
            "variable_refrigerant_flow_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heat_recovery_ventilation",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "insulation_upgrade",
            "window_replacement",
            "anti_sweat_heater_controls",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_controls_retrofit",
            "display_case_door_retrofit",
            "walk_in_cooler_freezer_upgrade",
            "commercial_kitchen_ventilation_controls",
            "heat_pump_water_heater",
            "compressed_air_system_upgrade",
            "building_controls_energy_management"
          ],
          "evidenceText": "Snohomish PUD’s current business rebate page lists heat pumps, ductless heat pumps, connected thermostats, VFDs, VRF, heat-recovery ventilators, insulation/windows for electrically heated facilities, refrigeration controls and cases, kitchen ventilation and heat pump water heaters. All projects require pre-approval.",
          "reasoningNotes": "Most target C&I categories are supported. Interpret heat recovery as heat-recovery ventilation or approved custom savings, not as generic industrial waste-heat recovery without review."
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
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "programName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "tonnage",
            "horsepower",
            "cfm",
            "square_feet",
            "linear_feet",
            "kwh_savings",
            "unit_count",
            "preapproval_status",
            "size_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tonnage",
              "source": "synthetic_or_placeholder_capacity",
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
              "inputKey": "cfm",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "size_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 25,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9c0a2c091b6abb00",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 25,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "opportunityName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Snohomish County PUD",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program",
          "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Self-reported utility matches Snohomish County PUD.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential measures to this commercial and industrial program.",
            "Commercial and industrial EV charger rebates are a separate portal line and should not be inferred from this efficiency match.",
            "Windows and insulation are limited to electrically heated facilities.",
            "Custom and equipment projects need PUD review and pre-approval."
          ],
          "hardRequirements": [
            "Applicant must be a Snohomish PUD business electric customer.",
            "All projects require pre-approval before installation.",
            "Rebates may not exceed 100 percent of project cost.",
            "Windows and insulation apply to electrically heated facilities.",
            "Measures must meet PUD business rebate or custom project specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "contractor_or_trade_ally"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "multifamily_common_area_or_business_facility"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "packaged_terminal_heat_pump",
            "variable_refrigerant_flow_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heat_recovery_ventilation",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "insulation_upgrade",
            "window_replacement",
            "anti_sweat_heater_controls",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_controls_retrofit",
            "display_case_door_retrofit",
            "walk_in_cooler_freezer_upgrade",
            "commercial_kitchen_ventilation_controls",
            "heat_pump_water_heater",
            "compressed_air_system_upgrade",
            "building_controls_energy_management"
          ],
          "evidenceText": "Snohomish PUD’s current business rebate page lists heat pumps, ductless heat pumps, connected thermostats, VFDs, VRF, heat-recovery ventilators, insulation/windows for electrically heated facilities, refrigeration controls and cases, kitchen ventilation and heat pump water heaters. All projects require pre-approval.",
          "reasoningNotes": "Most target C&I categories are supported. Interpret heat recovery as heat-recovery ventilation or approved custom savings, not as generic industrial waste-heat recovery without review."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2208",
          "opportunityName": "Seattle City Light - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Seattle City Light",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2208/seattle-city-light-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, refrigeration, building_controls, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential home rebates are separate from this commercial and industrial program.",
            "Simple rebates and Lighting to Go measures may have separate application paths and requirements.",
            "EV charging and renewable generation are separate offerings.",
            "Do not infer broad gas-to-electric or non-electric measures unless current City Light materials support them."
          ],
          "hardRequirements": [
            "Customer must have qualifying Seattle City Light electric service.",
            "Commercial retrofit incentives generally require City Light review, approval and a signed participation agreement before purchase or installation.",
            "Measures must meet City Light specifications and applicable code, safety and product requirements.",
            "Projects are subject to savings review, verification and final City Light discretion.",
            "Incentives are capped by project-cost and program rules."
          ],
          "eligibleApplicantTypes": [
            "seattle_city_light_business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "nonprofit_customers",
            "multifamily_building_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "networked_lighting_controls",
            "building_automation_system_upgrade",
            "energy_management_system",
            "hvac_controls_retrofit",
            "variable_speed_drive_retrofit",
            "fan_and_pump_system_efficiency",
            "commercial_refrigeration_efficiency_retrofit",
            "refrigeration_controls_retrofit",
            "high_efficiency_refrigeration_equipment",
            "heat_pump_water_heater_system",
            "compressed_air_efficiency_retrofit",
            "data_center_efficiency_retrofit"
          ],
          "evidenceText": "Seattle City Light's commercial retrofit materials cover lighting, controls, building automation, variable-speed drives, HVAC controls, refrigeration, water-heating, compressed-air and data-center efficiency measures for qualifying business customers.",
          "reasoningNotes": "Preserved energy management, refrigeration and lighting matches, and expanded to other listed commercial retrofit measures while keeping the record within City Light electric customer and preapproval boundaries."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "programName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "tonnage",
            "horsepower",
            "cfm",
            "square_feet",
            "linear_feet",
            "kwh_savings",
            "unit_count",
            "preapproval_status",
            "size_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tonnage",
              "source": "synthetic_or_placeholder_capacity",
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
              "inputKey": "cfm",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "size_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 25,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9c0a2c091b6abb00",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 25,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2208",
          "programName": "Seattle City Light - Commercial Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_savings",
            "eligible_project_cost_cents",
            "equipment_quantity_if_per_unit",
            "control_type_if_lighting",
            "refrigeration_measure_type",
            "city_light_preapproval_and_participation_agreement"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_quantity_if_per_unit",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "control_type_if_lighting",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "refrigeration_measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "city_light_preapproval_and_participation_agreement",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 900,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_015a11f14140678d",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 900,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2208",
          "opportunityName": "Seattle City Light - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Seattle City Light",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2208/seattle-city-light-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, refrigeration, building_controls, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential home rebates are separate from this commercial and industrial program.",
            "Simple rebates and Lighting to Go measures may have separate application paths and requirements.",
            "EV charging and renewable generation are separate offerings.",
            "Do not infer broad gas-to-electric or non-electric measures unless current City Light materials support them."
          ],
          "hardRequirements": [
            "Customer must have qualifying Seattle City Light electric service.",
            "Commercial retrofit incentives generally require City Light review, approval and a signed participation agreement before purchase or installation.",
            "Measures must meet City Light specifications and applicable code, safety and product requirements.",
            "Projects are subject to savings review, verification and final City Light discretion.",
            "Incentives are capped by project-cost and program rules."
          ],
          "eligibleApplicantTypes": [
            "seattle_city_light_business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "nonprofit_customers",
            "multifamily_building_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "networked_lighting_controls",
            "building_automation_system_upgrade",
            "energy_management_system",
            "hvac_controls_retrofit",
            "variable_speed_drive_retrofit",
            "fan_and_pump_system_efficiency",
            "commercial_refrigeration_efficiency_retrofit",
            "refrigeration_controls_retrofit",
            "high_efficiency_refrigeration_equipment",
            "heat_pump_water_heater_system",
            "compressed_air_efficiency_retrofit",
            "data_center_efficiency_retrofit"
          ],
          "evidenceText": "Seattle City Light's commercial retrofit materials cover lighting, controls, building automation, variable-speed drives, HVAC controls, refrigeration, water-heating, compressed-air and data-center efficiency measures for qualifying business customers.",
          "reasoningNotes": "Preserved energy management, refrigeration and lighting matches, and expanded to other listed commercial retrofit measures while keeping the record within City Light electric customer and preapproval boundaries."
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
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2208",
          "programName": "Seattle City Light - Commercial Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_savings",
            "eligible_project_cost_cents",
            "equipment_quantity_if_per_unit",
            "control_type_if_lighting",
            "refrigeration_measure_type",
            "city_light_preapproval_and_participation_agreement"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_quantity_if_per_unit",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "control_type_if_lighting",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "refrigeration_measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "city_light_preapproval_and_participation_agreement",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 10800,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_015a11f14140678d",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 10800,
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
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:576",
          "opportunityName": "Renewable Energy Sales and Use Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Use Tax Exemption",
          "administrator": "Washington State Department of Revenue",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/576/renewable-energy-sales-and-use-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Ground-source geothermal heat pumps are not supported by the current Department of Revenue electric generation equipment guidance.",
            "Solar water heating is not supported by the current official renewable electricity equipment exemption page.",
            "Biomass heating or thermal systems should not match unless the equipment generates electricity under the listed renewable categories."
          ],
          "hardRequirements": [
            "Eligible machinery, equipment and installation labor must meet Washington Department of Revenue renewable energy equipment requirements.",
            "Large solar and non-solar renewable systems are subject to size and technology thresholds.",
            "Some categories are structured as a refund requiring the buyer to pay sales or use tax first and then apply for the refund.",
            "The incentive is scheduled to expire January 1, 2030 unless extended or amended."
          ],
          "eligibleApplicantTypes": [
            "system_purchaser",
            "property_owner",
            "business_owner",
            "homeowner",
            "taxpayer",
            "public_entity",
            "nonprofit"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_electric_generation",
            "rooftop_solar_pv",
            "biomass_biogas_electric_generation",
            "geothermal_electric_generation",
            "wind_electric_generation",
            "tidal_wave_electric_generation",
            "fuel_cell_electric_generation",
            "waste_heat_to_power_electric_generation"
          ],
          "evidenceText": "Washington DOR describes a sales and use tax exemption or refund for renewable systems that generate electricity, including qualifying solar and listed non-solar renewable resources such as biomass, geothermal, wind, tidal or wave, fuel cells and lost-exhaust energy.",
          "reasoningNotes": "Current official guidance supports renewable electric generation equipment, not solar thermal water heating or ground-source heat pump HVAC."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:576",
          "opportunityName": "Renewable Energy Sales and Use Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Use Tax Exemption",
          "administrator": "Washington State Department of Revenue",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/576/renewable-energy-sales-and-use-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Ground-source geothermal heat pumps are not supported by the current Department of Revenue electric generation equipment guidance.",
            "Solar water heating is not supported by the current official renewable electricity equipment exemption page.",
            "Biomass heating or thermal systems should not match unless the equipment generates electricity under the listed renewable categories."
          ],
          "hardRequirements": [
            "Eligible machinery, equipment and installation labor must meet Washington Department of Revenue renewable energy equipment requirements.",
            "Large solar and non-solar renewable systems are subject to size and technology thresholds.",
            "Some categories are structured as a refund requiring the buyer to pay sales or use tax first and then apply for the refund.",
            "The incentive is scheduled to expire January 1, 2030 unless extended or amended."
          ],
          "eligibleApplicantTypes": [
            "system_purchaser",
            "property_owner",
            "business_owner",
            "homeowner",
            "taxpayer",
            "public_entity",
            "nonprofit"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_electric_generation",
            "rooftop_solar_pv",
            "biomass_biogas_electric_generation",
            "geothermal_electric_generation",
            "wind_electric_generation",
            "tidal_wave_electric_generation",
            "fuel_cell_electric_generation",
            "waste_heat_to_power_electric_generation"
          ],
          "evidenceText": "Washington DOR describes a sales and use tax exemption or refund for renewable systems that generate electricity, including qualifying solar and listed non-solar renewable resources such as biomass, geothermal, wind, tidal or wave, fuel cells and lost-exhaust energy.",
          "reasoningNotes": "Current official guidance supports renewable electric generation equipment, not solar thermal water heating or ground-source heat pump HVAC."
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
      "retrofitTypeId": "anti_sweat_heater_controls",
      "displayName": "Anti-sweat heater controls",
      "parentCategory": "refrigeration",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 94800,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 157680,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 157680,
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
          "upfrontCostAfterSavingsCents": 94800,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "opportunityName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Snohomish County PUD",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program",
          "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Self-reported utility matches Snohomish County PUD.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential measures to this commercial and industrial program.",
            "Commercial and industrial EV charger rebates are a separate portal line and should not be inferred from this efficiency match.",
            "Windows and insulation are limited to electrically heated facilities.",
            "Custom and equipment projects need PUD review and pre-approval."
          ],
          "hardRequirements": [
            "Applicant must be a Snohomish PUD business electric customer.",
            "All projects require pre-approval before installation.",
            "Rebates may not exceed 100 percent of project cost.",
            "Windows and insulation apply to electrically heated facilities.",
            "Measures must meet PUD business rebate or custom project specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "contractor_or_trade_ally"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "multifamily_common_area_or_business_facility"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "packaged_terminal_heat_pump",
            "variable_refrigerant_flow_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heat_recovery_ventilation",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "insulation_upgrade",
            "window_replacement",
            "anti_sweat_heater_controls",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_controls_retrofit",
            "display_case_door_retrofit",
            "walk_in_cooler_freezer_upgrade",
            "commercial_kitchen_ventilation_controls",
            "heat_pump_water_heater",
            "compressed_air_system_upgrade",
            "building_controls_energy_management"
          ],
          "evidenceText": "Snohomish PUD’s current business rebate page lists heat pumps, ductless heat pumps, connected thermostats, VFDs, VRF, heat-recovery ventilators, insulation/windows for electrically heated facilities, refrigeration controls and cases, kitchen ventilation and heat pump water heaters. All projects require pre-approval.",
          "reasoningNotes": "Most target C&I categories are supported. Interpret heat recovery as heat-recovery ventilation or approved custom savings, not as generic industrial waste-heat recovery without review."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "programName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "tonnage",
            "horsepower",
            "cfm",
            "square_feet",
            "linear_feet",
            "kwh_savings",
            "unit_count",
            "preapproval_status",
            "size_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tonnage",
              "source": "synthetic_or_placeholder_capacity",
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
              "inputKey": "cfm",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "size_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 25,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9c0a2c091b6abb00",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 25,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2208",
          "opportunityName": "Seattle City Light - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Seattle City Light",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2208/seattle-city-light-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, refrigeration, building_controls, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential home rebates are separate from this commercial and industrial program.",
            "Simple rebates and Lighting to Go measures may have separate application paths and requirements.",
            "EV charging and renewable generation are separate offerings.",
            "Do not infer broad gas-to-electric or non-electric measures unless current City Light materials support them."
          ],
          "hardRequirements": [
            "Customer must have qualifying Seattle City Light electric service.",
            "Commercial retrofit incentives generally require City Light review, approval and a signed participation agreement before purchase or installation.",
            "Measures must meet City Light specifications and applicable code, safety and product requirements.",
            "Projects are subject to savings review, verification and final City Light discretion.",
            "Incentives are capped by project-cost and program rules."
          ],
          "eligibleApplicantTypes": [
            "seattle_city_light_business_customers",
            "commercial_customers",
            "industrial_customers",
            "institutional_customers",
            "nonprofit_customers",
            "multifamily_building_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "networked_lighting_controls",
            "building_automation_system_upgrade",
            "energy_management_system",
            "hvac_controls_retrofit",
            "variable_speed_drive_retrofit",
            "fan_and_pump_system_efficiency",
            "commercial_refrigeration_efficiency_retrofit",
            "refrigeration_controls_retrofit",
            "high_efficiency_refrigeration_equipment",
            "heat_pump_water_heater_system",
            "compressed_air_efficiency_retrofit",
            "data_center_efficiency_retrofit"
          ],
          "evidenceText": "Seattle City Light's commercial retrofit materials cover lighting, controls, building automation, variable-speed drives, HVAC controls, refrigeration, water-heating, compressed-air and data-center efficiency measures for qualifying business customers.",
          "reasoningNotes": "Preserved energy management, refrigeration and lighting matches, and expanded to other listed commercial retrofit measures while keeping the record within City Light electric customer and preapproval boundaries."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2208",
          "programName": "Seattle City Light - Commercial Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "annual_kwh_savings",
            "eligible_project_cost_cents",
            "equipment_quantity_if_per_unit",
            "control_type_if_lighting",
            "refrigeration_measure_type",
            "city_light_preapproval_and_participation_agreement"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_quantity_if_per_unit",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "control_type_if_lighting",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "refrigeration_measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "city_light_preapproval_and_participation_agreement",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 900,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_015a11f14140678d",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 900,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "opportunityName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Snohomish County PUD",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program",
          "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Self-reported utility matches Snohomish County PUD.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential measures to this commercial and industrial program.",
            "Commercial and industrial EV charger rebates are a separate portal line and should not be inferred from this efficiency match.",
            "Windows and insulation are limited to electrically heated facilities.",
            "Custom and equipment projects need PUD review and pre-approval."
          ],
          "hardRequirements": [
            "Applicant must be a Snohomish PUD business electric customer.",
            "All projects require pre-approval before installation.",
            "Rebates may not exceed 100 percent of project cost.",
            "Windows and insulation apply to electrically heated facilities.",
            "Measures must meet PUD business rebate or custom project specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "contractor_or_trade_ally"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "multifamily_common_area_or_business_facility"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "packaged_terminal_heat_pump",
            "variable_refrigerant_flow_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heat_recovery_ventilation",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "insulation_upgrade",
            "window_replacement",
            "anti_sweat_heater_controls",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_controls_retrofit",
            "display_case_door_retrofit",
            "walk_in_cooler_freezer_upgrade",
            "commercial_kitchen_ventilation_controls",
            "heat_pump_water_heater",
            "compressed_air_system_upgrade",
            "building_controls_energy_management"
          ],
          "evidenceText": "Snohomish PUD’s current business rebate page lists heat pumps, ductless heat pumps, connected thermostats, VFDs, VRF, heat-recovery ventilators, insulation/windows for electrically heated facilities, refrigeration controls and cases, kitchen ventilation and heat pump water heaters. All projects require pre-approval.",
          "reasoningNotes": "Most target C&I categories are supported. Interpret heat recovery as heat-recovery ventilation or approved custom savings, not as generic industrial waste-heat recovery without review."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "programName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "tonnage",
            "horsepower",
            "cfm",
            "square_feet",
            "linear_feet",
            "kwh_savings",
            "unit_count",
            "preapproval_status",
            "size_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tonnage",
              "source": "synthetic_or_placeholder_capacity",
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
              "inputKey": "cfm",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "size_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 25,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9c0a2c091b6abb00",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 25,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "opportunityName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Snohomish County PUD",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program",
          "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Self-reported utility matches Snohomish County PUD.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential measures to this commercial and industrial program.",
            "Commercial and industrial EV charger rebates are a separate portal line and should not be inferred from this efficiency match.",
            "Windows and insulation are limited to electrically heated facilities.",
            "Custom and equipment projects need PUD review and pre-approval."
          ],
          "hardRequirements": [
            "Applicant must be a Snohomish PUD business electric customer.",
            "All projects require pre-approval before installation.",
            "Rebates may not exceed 100 percent of project cost.",
            "Windows and insulation apply to electrically heated facilities.",
            "Measures must meet PUD business rebate or custom project specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "contractor_or_trade_ally"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "multifamily_common_area_or_business_facility"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "packaged_terminal_heat_pump",
            "variable_refrigerant_flow_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heat_recovery_ventilation",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "insulation_upgrade",
            "window_replacement",
            "anti_sweat_heater_controls",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_controls_retrofit",
            "display_case_door_retrofit",
            "walk_in_cooler_freezer_upgrade",
            "commercial_kitchen_ventilation_controls",
            "heat_pump_water_heater",
            "compressed_air_system_upgrade",
            "building_controls_energy_management"
          ],
          "evidenceText": "Snohomish PUD’s current business rebate page lists heat pumps, ductless heat pumps, connected thermostats, VFDs, VRF, heat-recovery ventilators, insulation/windows for electrically heated facilities, refrigeration controls and cases, kitchen ventilation and heat pump water heaters. All projects require pre-approval.",
          "reasoningNotes": "Most target C&I categories are supported. Interpret heat recovery as heat-recovery ventilation or approved custom savings, not as generic industrial waste-heat recovery without review."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "programName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "tonnage",
            "horsepower",
            "cfm",
            "square_feet",
            "linear_feet",
            "kwh_savings",
            "unit_count",
            "preapproval_status",
            "size_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tonnage",
              "source": "synthetic_or_placeholder_capacity",
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
              "inputKey": "cfm",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "size_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 25,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9c0a2c091b6abb00",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 25,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "opportunityName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Snohomish County PUD",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program",
          "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Self-reported utility matches Snohomish County PUD.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential measures to this commercial and industrial program.",
            "Commercial and industrial EV charger rebates are a separate portal line and should not be inferred from this efficiency match.",
            "Windows and insulation are limited to electrically heated facilities.",
            "Custom and equipment projects need PUD review and pre-approval."
          ],
          "hardRequirements": [
            "Applicant must be a Snohomish PUD business electric customer.",
            "All projects require pre-approval before installation.",
            "Rebates may not exceed 100 percent of project cost.",
            "Windows and insulation apply to electrically heated facilities.",
            "Measures must meet PUD business rebate or custom project specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "contractor_or_trade_ally"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "multifamily_common_area_or_business_facility"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "packaged_terminal_heat_pump",
            "variable_refrigerant_flow_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heat_recovery_ventilation",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "insulation_upgrade",
            "window_replacement",
            "anti_sweat_heater_controls",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_controls_retrofit",
            "display_case_door_retrofit",
            "walk_in_cooler_freezer_upgrade",
            "commercial_kitchen_ventilation_controls",
            "heat_pump_water_heater",
            "compressed_air_system_upgrade",
            "building_controls_energy_management"
          ],
          "evidenceText": "Snohomish PUD’s current business rebate page lists heat pumps, ductless heat pumps, connected thermostats, VFDs, VRF, heat-recovery ventilators, insulation/windows for electrically heated facilities, refrigeration controls and cases, kitchen ventilation and heat pump water heaters. All projects require pre-approval.",
          "reasoningNotes": "Most target C&I categories are supported. Interpret heat recovery as heat-recovery ventilation or approved custom savings, not as generic industrial waste-heat recovery without review."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "programName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "tonnage",
            "horsepower",
            "cfm",
            "square_feet",
            "linear_feet",
            "kwh_savings",
            "unit_count",
            "preapproval_status",
            "size_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tonnage",
              "source": "synthetic_or_placeholder_capacity",
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
              "inputKey": "cfm",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "size_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 25,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9c0a2c091b6abb00",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 25,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "opportunityName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Snohomish County PUD",
          "state": "WA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program",
          "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Self-reported utility matches Snohomish County PUD.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_controls, hvac, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential measures to this commercial and industrial program.",
            "Commercial and industrial EV charger rebates are a separate portal line and should not be inferred from this efficiency match.",
            "Windows and insulation are limited to electrically heated facilities.",
            "Custom and equipment projects need PUD review and pre-approval."
          ],
          "hardRequirements": [
            "Applicant must be a Snohomish PUD business electric customer.",
            "All projects require pre-approval before installation.",
            "Rebates may not exceed 100 percent of project cost.",
            "Windows and insulation apply to electrically heated facilities.",
            "Measures must meet PUD business rebate or custom project specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "contractor_or_trade_ally"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "multifamily_common_area_or_business_facility"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ductless_mini_split_heat_pump",
            "packaged_terminal_heat_pump",
            "variable_refrigerant_flow_retrofit",
            "smart_thermostat_zoning_retrofit",
            "heat_recovery_ventilation",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "insulation_upgrade",
            "window_replacement",
            "anti_sweat_heater_controls",
            "high_efficiency_refrigeration_equipment",
            "refrigeration_controls_retrofit",
            "display_case_door_retrofit",
            "walk_in_cooler_freezer_upgrade",
            "commercial_kitchen_ventilation_controls",
            "heat_pump_water_heater",
            "compressed_air_system_upgrade",
            "building_controls_energy_management"
          ],
          "evidenceText": "Snohomish PUD’s current business rebate page lists heat pumps, ductless heat pumps, connected thermostats, VFDs, VRF, heat-recovery ventilators, insulation/windows for electrically heated facilities, refrigeration controls and cases, kitchen ventilation and heat pump water heaters. All projects require pre-approval.",
          "reasoningNotes": "Most target C&I categories are supported. Interpret heat recovery as heat-recovery ventilation or approved custom savings, not as generic industrial waste-heat recovery without review."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
          "programName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "tonnage",
            "horsepower",
            "cfm",
            "square_feet",
            "linear_feet",
            "kwh_savings",
            "unit_count",
            "preapproval_status",
            "size_or_unit_count"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tonnage",
              "source": "synthetic_or_placeholder_capacity",
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
              "inputKey": "cfm",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "size_or_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 25,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9c0a2c091b6abb00",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 25,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    }
  ]
}
