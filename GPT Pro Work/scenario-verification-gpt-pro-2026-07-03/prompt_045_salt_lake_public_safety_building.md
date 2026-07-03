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
  "testCaseOrdinal": 45,
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

Packet 45 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 45,
  "sampleUserId": "salt-lake-public-safety-building",
  "description": "Salt Lake City public safety facility with net-zero, emergency operations, and updated gas utility naming.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "government"
      ],
      "primaryActivityText": "Police, fire administration, emergency operations, municipal public safety, and civic services",
      "naicsCodes": [
        "922120",
        "922160",
        "921190"
      ],
      "organizationSize": "251-1,000 employees"
    },
    "site": {
      "address": {
        "raw": "475 S 300 E, Salt Lake City, UT 84111, USA",
        "stateCode": "UT",
        "zip5": "84111"
      },
      "geo": {
        "stateCode": "UT",
        "zip5": "84111",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Rocky Mountain Power",
          "distributionUtilityId": "UTIL_ROCKY_MOUNTAIN_POWER",
          "territoryCandidates": [
            "UTIL_ROCKY_MOUNTAIN_POWER"
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
        "value": 172000,
        "raw": "172,000",
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
    "eligible": 7,
    "ineligible": 1512
  },
  "retrofitCount": 15,
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
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:83",
          "opportunityName": "Renewable Energy Systems Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/83/renewable-energy-systems-tax-credit-personal",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential solar PV systems installed in 2024 and beyond are not eligible for the Utah state credit.",
            "Home battery installations are not eligible for the Utah RESTC.",
            "Do not match generic high_efficiency_hvac_replacement except for a qualifying geothermal or renewable thermal system.",
            "Commercial claims belong under the corporate RESTC record."
          ],
          "hardRequirements": [
            "Residential non-solar renewable systems must use eligible wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "For non-solar residential eligible technologies, the credit is nonrefundable and equals 25 percent of eligible cost or 2000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayers",
            "homeowners",
            "residential_system_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "solar_thermal_system",
            "solar_water_heating_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED states residential solar PV installed in 2024 and later is not eligible, home batteries are not eligible, and other residential eligible technologies may receive a 25 percent credit up to 2000 dollars.",
          "reasoningNotes": "Removed rooftop solar PV and battery storage as current residential matches while preserving qualifying non-solar renewable technologies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:248",
          "opportunityName": "Renewable Energy Systems Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/248/renewable-energy-systems-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Home battery or other energy storage installations are not eligible for the Utah RESTC.",
            "Do not match high_efficiency_hvac_replacement unless the project is specifically an eligible geothermal or renewable thermal system.",
            "Do not treat this corporate tax credit as a rebate or grant.",
            "Personal residential claims belong under the separate personal tax credit record."
          ],
          "hardRequirements": [
            "Commercial system must use an eligible Utah renewable energy technology: solar PV, wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "Commercial credit is refundable and calculated as 10 percent of eligible system cost or 50000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayers",
            "businesses",
            "commercial_property_owners",
            "renewable_energy_system_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_thermal_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED lists the RESTC for commercial solar PV, wind, geothermal, hydro, biomass, and renewable thermal systems, with a 10 percent or 50000 dollar commercial credit and a January 1, 2028 service cutoff.",
          "reasoningNotes": "Removed unsupported battery storage and generic HVAC; retained only renewable energy technologies currently listed by OED."
        }
      ],
      "v2PackageSummaries": []
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
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:83",
          "opportunityName": "Renewable Energy Systems Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/83/renewable-energy-systems-tax-credit-personal",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential solar PV systems installed in 2024 and beyond are not eligible for the Utah state credit.",
            "Home battery installations are not eligible for the Utah RESTC.",
            "Do not match generic high_efficiency_hvac_replacement except for a qualifying geothermal or renewable thermal system.",
            "Commercial claims belong under the corporate RESTC record."
          ],
          "hardRequirements": [
            "Residential non-solar renewable systems must use eligible wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "For non-solar residential eligible technologies, the credit is nonrefundable and equals 25 percent of eligible cost or 2000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayers",
            "homeowners",
            "residential_system_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "solar_thermal_system",
            "solar_water_heating_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED states residential solar PV installed in 2024 and later is not eligible, home batteries are not eligible, and other residential eligible technologies may receive a 25 percent credit up to 2000 dollars.",
          "reasoningNotes": "Removed rooftop solar PV and battery storage as current residential matches while preserving qualifying non-solar renewable technologies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:248",
          "opportunityName": "Renewable Energy Systems Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/248/renewable-energy-systems-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Home battery or other energy storage installations are not eligible for the Utah RESTC.",
            "Do not match high_efficiency_hvac_replacement unless the project is specifically an eligible geothermal or renewable thermal system.",
            "Do not treat this corporate tax credit as a rebate or grant.",
            "Personal residential claims belong under the separate personal tax credit record."
          ],
          "hardRequirements": [
            "Commercial system must use an eligible Utah renewable energy technology: solar PV, wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "Commercial credit is refundable and calculated as 10 percent of eligible system cost or 50000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayers",
            "businesses",
            "commercial_property_owners",
            "renewable_energy_system_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_thermal_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED lists the RESTC for commercial solar PV, wind, geothermal, hydro, biomass, and renewable thermal systems, with a 10 percent or 50000 dollar commercial credit and a January 1, 2028 service cutoff.",
          "reasoningNotes": "Removed unsupported battery storage and generic HVAC; retained only renewable energy technologies currently listed by OED."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Rocky Mountain Power",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program",
          "applicationUrl": "https://wattsmartbusiness.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Self-reported utility matches Rocky Mountain Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not the Rocky Mountain Power residential Wattsmart Homes program.",
            "Commercial clothes washer incentives are product-specific and should not imply residential laundry rebates.",
            "Heat pump water heater incentives are for qualifying units used in a business context.",
            "Measures outside the Utah eligible schedules or without required approval should not match."
          ],
          "hardRequirements": [
            "Facility must be served on an eligible Rocky Mountain Power Utah non-residential electric schedule.",
            "Qualifying equipment must be installed at an eligible customer location.",
            "Required application, tax, invoice and technical documentation must be submitted.",
            "Prescriptive and custom incentives are subject to measure specifications, caps and utility approval."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "non_residential_customer",
            "property_owner",
            "trade_ally_assisted_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_laundry_equipment",
            "high_efficiency_refrigeration_equipment",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "compressed_air_system_upgrade",
            "commercial_foodservice_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Utah wattsmart Business is for Rocky Mountain Power non-residential customers on specified Utah schedules. Current pages list lighting and controls, HVAC, motors and drives, food service, compressed air, building envelope and appliances such as business-use heat pump water heaters and commercial clothes washers.",
          "reasoningNotes": "Retain the C&I equipment categories only in a non-residential context. Appliance terms are supported as business/appliance measures, not residential home upgrades."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:83",
          "opportunityName": "Renewable Energy Systems Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/83/renewable-energy-systems-tax-credit-personal",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential solar PV systems installed in 2024 and beyond are not eligible for the Utah state credit.",
            "Home battery installations are not eligible for the Utah RESTC.",
            "Do not match generic high_efficiency_hvac_replacement except for a qualifying geothermal or renewable thermal system.",
            "Commercial claims belong under the corporate RESTC record."
          ],
          "hardRequirements": [
            "Residential non-solar renewable systems must use eligible wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "For non-solar residential eligible technologies, the credit is nonrefundable and equals 25 percent of eligible cost or 2000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayers",
            "homeowners",
            "residential_system_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "solar_thermal_system",
            "solar_water_heating_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED states residential solar PV installed in 2024 and later is not eligible, home batteries are not eligible, and other residential eligible technologies may receive a 25 percent credit up to 2000 dollars.",
          "reasoningNotes": "Removed rooftop solar PV and battery storage as current residential matches while preserving qualifying non-solar renewable technologies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:248",
          "opportunityName": "Renewable Energy Systems Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/248/renewable-energy-systems-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Home battery or other energy storage installations are not eligible for the Utah RESTC.",
            "Do not match high_efficiency_hvac_replacement unless the project is specifically an eligible geothermal or renewable thermal system.",
            "Do not treat this corporate tax credit as a rebate or grant.",
            "Personal residential claims belong under the separate personal tax credit record."
          ],
          "hardRequirements": [
            "Commercial system must use an eligible Utah renewable energy technology: solar PV, wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "Commercial credit is refundable and calculated as 10 percent of eligible system cost or 50000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayers",
            "businesses",
            "commercial_property_owners",
            "renewable_energy_system_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_thermal_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED lists the RESTC for commercial solar PV, wind, geothermal, hydro, biomass, and renewable thermal systems, with a 10 percent or 50000 dollar commercial credit and a January 1, 2028 service cutoff.",
          "reasoningNotes": "Removed unsupported battery storage and generic HVAC; retained only renewable energy technologies currently listed by OED."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "programName": "Rocky Mountain Power - wattsmart Business Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_utah_rate_schedule",
            "measuretype",
            "quantity",
            "watts_reduced_or_controlled",
            "tons",
            "indoor_units",
            "annual_kwh_savings",
            "equipment_tier",
            "selected_measure",
            "unit_count_or_engineering_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_utah_rate_schedule",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measuretype",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_reduced_or_controlled",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "indoor_units",
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
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_engineering_savings",
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
              "effectId": "effect_one_time_savings_1_f2275004779e171f",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:83",
          "opportunityName": "Renewable Energy Systems Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/83/renewable-energy-systems-tax-credit-personal",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential solar PV systems installed in 2024 and beyond are not eligible for the Utah state credit.",
            "Home battery installations are not eligible for the Utah RESTC.",
            "Do not match generic high_efficiency_hvac_replacement except for a qualifying geothermal or renewable thermal system.",
            "Commercial claims belong under the corporate RESTC record."
          ],
          "hardRequirements": [
            "Residential non-solar renewable systems must use eligible wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "For non-solar residential eligible technologies, the credit is nonrefundable and equals 25 percent of eligible cost or 2000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayers",
            "homeowners",
            "residential_system_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "solar_thermal_system",
            "solar_water_heating_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED states residential solar PV installed in 2024 and later is not eligible, home batteries are not eligible, and other residential eligible technologies may receive a 25 percent credit up to 2000 dollars.",
          "reasoningNotes": "Removed rooftop solar PV and battery storage as current residential matches while preserving qualifying non-solar renewable technologies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:248",
          "opportunityName": "Renewable Energy Systems Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/248/renewable-energy-systems-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Home battery or other energy storage installations are not eligible for the Utah RESTC.",
            "Do not match high_efficiency_hvac_replacement unless the project is specifically an eligible geothermal or renewable thermal system.",
            "Do not treat this corporate tax credit as a rebate or grant.",
            "Personal residential claims belong under the separate personal tax credit record."
          ],
          "hardRequirements": [
            "Commercial system must use an eligible Utah renewable energy technology: solar PV, wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "Commercial credit is refundable and calculated as 10 percent of eligible system cost or 50000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayers",
            "businesses",
            "commercial_property_owners",
            "renewable_energy_system_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_thermal_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED lists the RESTC for commercial solar PV, wind, geothermal, hydro, biomass, and renewable thermal systems, with a 10 percent or 50000 dollar commercial credit and a January 1, 2028 service cutoff.",
          "reasoningNotes": "Removed unsupported battery storage and generic HVAC; retained only renewable energy technologies currently listed by OED."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:83",
          "opportunityName": "Renewable Energy Systems Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/83/renewable-energy-systems-tax-credit-personal",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential solar PV systems installed in 2024 and beyond are not eligible for the Utah state credit.",
            "Home battery installations are not eligible for the Utah RESTC.",
            "Do not match generic high_efficiency_hvac_replacement except for a qualifying geothermal or renewable thermal system.",
            "Commercial claims belong under the corporate RESTC record."
          ],
          "hardRequirements": [
            "Residential non-solar renewable systems must use eligible wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "For non-solar residential eligible technologies, the credit is nonrefundable and equals 25 percent of eligible cost or 2000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayers",
            "homeowners",
            "residential_system_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "solar_thermal_system",
            "solar_water_heating_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED states residential solar PV installed in 2024 and later is not eligible, home batteries are not eligible, and other residential eligible technologies may receive a 25 percent credit up to 2000 dollars.",
          "reasoningNotes": "Removed rooftop solar PV and battery storage as current residential matches while preserving qualifying non-solar renewable technologies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:248",
          "opportunityName": "Renewable Energy Systems Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/248/renewable-energy-systems-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Home battery or other energy storage installations are not eligible for the Utah RESTC.",
            "Do not match high_efficiency_hvac_replacement unless the project is specifically an eligible geothermal or renewable thermal system.",
            "Do not treat this corporate tax credit as a rebate or grant.",
            "Personal residential claims belong under the separate personal tax credit record."
          ],
          "hardRequirements": [
            "Commercial system must use an eligible Utah renewable energy technology: solar PV, wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "Commercial credit is refundable and calculated as 10 percent of eligible system cost or 50000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayers",
            "businesses",
            "commercial_property_owners",
            "renewable_energy_system_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_thermal_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED lists the RESTC for commercial solar PV, wind, geothermal, hydro, biomass, and renewable thermal systems, with a 10 percent or 50000 dollar commercial credit and a January 1, 2028 service cutoff.",
          "reasoningNotes": "Removed unsupported battery storage and generic HVAC; retained only renewable energy technologies currently listed by OED."
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
        },
        {
          "scenarioRole": "alternative_1",
          "id": "scenario_4e0c9ad6e33432e7_v1",
          "name": "Utah - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "status": "calculated",
          "opportunityIds": [
            "SOURCE_DSIRE:dsire_program_id:22661"
          ],
          "incentiveRuleIds": [
            "oir_4e0c9ad6e33432e7_v1"
          ],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 848000,
          "upfrontSavingsEntries": [
            {
              "kind": "possible_grant",
              "category": "possible_grant",
              "label": "Utah - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
              "amountCents": 0,
              "source": "opportunity_incentive_rule",
              "opportunityId": "SOURCE_DSIRE:dsire_program_id:22661",
              "incentiveRuleId": "oir_4e0c9ad6e33432e7_v1",
              "formula": "Possible grant up to 80% of eligible NEVI EV charging project cost"
            }
          ],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22661",
          "opportunityName": "Utah - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "uncertain",
          "programType": "Grant Program",
          "administrator": "Utah Department of Transportation",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22661/utah-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "The Phase 1.A request for applications is closed and should not be matched as an open rebate.",
            "Do not match residential Level 2 home charging.",
            "Do not match EV purchase incentives; this is charging infrastructure funding."
          ],
          "hardRequirements": [
            "Charging infrastructure must satisfy federal NEVI Formula Program requirements.",
            "Sites must generally be within one driving mile of an Alternative Fuel Corridor and spaced to meet NEVI corridor buildout goals.",
            "Projects must meet applicable federal charging, uptime, accessibility, data, and procurement requirements.",
            "New funding rounds require UDOT solicitation terms and award approval."
          ],
          "eligibleApplicantTypes": [
            "charging_site_host",
            "business_customer",
            "public_entity",
            "private_entity",
            "tribal_entity"
          ],
          "eligibleSectors": [
            "transportation",
            "commercial",
            "public",
            "tribal"
          ],
          "eligibleRetrofitCategories": [
            "public_dc_fast_ev_charging_station",
            "ev_charging_infrastructure"
          ],
          "evidenceText": "UDOT describes Utah NEVI as deploying public EV charging infrastructure along Alternative Fuel Corridors; the Phase 1.A solicitation is closed, while later phase planning continues.",
          "reasoningNotes": "The EV charging match is correct, but current application availability is not open for the closed Phase 1.A round. Treat as corridor public fast-charging infrastructure, not residential charging."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Rocky Mountain Power",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program",
          "applicationUrl": "https://wattsmartbusiness.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Self-reported utility matches Rocky Mountain Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not the Rocky Mountain Power residential Wattsmart Homes program.",
            "Commercial clothes washer incentives are product-specific and should not imply residential laundry rebates.",
            "Heat pump water heater incentives are for qualifying units used in a business context.",
            "Measures outside the Utah eligible schedules or without required approval should not match."
          ],
          "hardRequirements": [
            "Facility must be served on an eligible Rocky Mountain Power Utah non-residential electric schedule.",
            "Qualifying equipment must be installed at an eligible customer location.",
            "Required application, tax, invoice and technical documentation must be submitted.",
            "Prescriptive and custom incentives are subject to measure specifications, caps and utility approval."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "non_residential_customer",
            "property_owner",
            "trade_ally_assisted_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_laundry_equipment",
            "high_efficiency_refrigeration_equipment",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "compressed_air_system_upgrade",
            "commercial_foodservice_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Utah wattsmart Business is for Rocky Mountain Power non-residential customers on specified Utah schedules. Current pages list lighting and controls, HVAC, motors and drives, food service, compressed air, building envelope and appliances such as business-use heat pump water heaters and commercial clothes washers.",
          "reasoningNotes": "Retain the C&I equipment categories only in a non-residential context. Appliance terms are supported as business/appliance measures, not residential home upgrades."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "programName": "Rocky Mountain Power - wattsmart Business Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_utah_rate_schedule",
            "measuretype",
            "quantity",
            "watts_reduced_or_controlled",
            "tons",
            "indoor_units",
            "annual_kwh_savings",
            "equipment_tier",
            "selected_measure",
            "unit_count_or_engineering_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_utah_rate_schedule",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measuretype",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_reduced_or_controlled",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "indoor_units",
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
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_engineering_savings",
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
              "effectId": "effect_one_time_savings_1_f2275004779e171f",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:83",
          "opportunityName": "Renewable Energy Systems Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/83/renewable-energy-systems-tax-credit-personal",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential solar PV systems installed in 2024 and beyond are not eligible for the Utah state credit.",
            "Home battery installations are not eligible for the Utah RESTC.",
            "Do not match generic high_efficiency_hvac_replacement except for a qualifying geothermal or renewable thermal system.",
            "Commercial claims belong under the corporate RESTC record."
          ],
          "hardRequirements": [
            "Residential non-solar renewable systems must use eligible wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "For non-solar residential eligible technologies, the credit is nonrefundable and equals 25 percent of eligible cost or 2000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayers",
            "homeowners",
            "residential_system_owners"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "solar_thermal_system",
            "solar_water_heating_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED states residential solar PV installed in 2024 and later is not eligible, home batteries are not eligible, and other residential eligible technologies may receive a 25 percent credit up to 2000 dollars.",
          "reasoningNotes": "Removed rooftop solar PV and battery storage as current residential matches while preserving qualifying non-solar renewable technologies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:248",
          "opportunityName": "Renewable Energy Systems Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "Utah Office of Energy Development and Utah State Tax Commission",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/248/renewable-energy-systems-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, battery_storage, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Home battery or other energy storage installations are not eligible for the Utah RESTC.",
            "Do not match high_efficiency_hvac_replacement unless the project is specifically an eligible geothermal or renewable thermal system.",
            "Do not treat this corporate tax credit as a rebate or grant.",
            "Personal residential claims belong under the separate personal tax credit record."
          ],
          "hardRequirements": [
            "Commercial system must use an eligible Utah renewable energy technology: solar PV, wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
            "The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
            "Commercial credit is refundable and calculated as 10 percent of eligible system cost or 50000 dollars, whichever is less.",
            "OED application and the nonrefundable application fee are required before claiming the tax credit."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayers",
            "businesses",
            "commercial_property_owners",
            "renewable_energy_system_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_thermal_system",
            "wind_energy_system",
            "geothermal_renewable_energy_system",
            "hydroelectric_system",
            "biomass_biogas_energy_system",
            "renewable_thermal_system"
          ],
          "evidenceText": "Utah OED lists the RESTC for commercial solar PV, wind, geothermal, hydro, biomass, and renewable thermal systems, with a 10 percent or 50000 dollar commercial credit and a January 1, 2028 service cutoff.",
          "reasoningNotes": "Removed unsupported battery storage and generic HVAC; retained only renewable energy technologies currently listed by OED."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Rocky Mountain Power",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program",
          "applicationUrl": "https://wattsmartbusiness.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Self-reported utility matches Rocky Mountain Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not the Rocky Mountain Power residential Wattsmart Homes program.",
            "Commercial clothes washer incentives are product-specific and should not imply residential laundry rebates.",
            "Heat pump water heater incentives are for qualifying units used in a business context.",
            "Measures outside the Utah eligible schedules or without required approval should not match."
          ],
          "hardRequirements": [
            "Facility must be served on an eligible Rocky Mountain Power Utah non-residential electric schedule.",
            "Qualifying equipment must be installed at an eligible customer location.",
            "Required application, tax, invoice and technical documentation must be submitted.",
            "Prescriptive and custom incentives are subject to measure specifications, caps and utility approval."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "non_residential_customer",
            "property_owner",
            "trade_ally_assisted_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_laundry_equipment",
            "high_efficiency_refrigeration_equipment",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "compressed_air_system_upgrade",
            "commercial_foodservice_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Utah wattsmart Business is for Rocky Mountain Power non-residential customers on specified Utah schedules. Current pages list lighting and controls, HVAC, motors and drives, food service, compressed air, building envelope and appliances such as business-use heat pump water heaters and commercial clothes washers.",
          "reasoningNotes": "Retain the C&I equipment categories only in a non-residential context. Appliance terms are supported as business/appliance measures, not residential home upgrades."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "programName": "Rocky Mountain Power - wattsmart Business Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_utah_rate_schedule",
            "measuretype",
            "quantity",
            "watts_reduced_or_controlled",
            "tons",
            "indoor_units",
            "annual_kwh_savings",
            "equipment_tier",
            "selected_measure",
            "unit_count_or_engineering_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_utah_rate_schedule",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measuretype",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_reduced_or_controlled",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "indoor_units",
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
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_engineering_savings",
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
              "effectId": "effect_one_time_savings_1_f2275004779e171f",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Rocky Mountain Power",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program",
          "applicationUrl": "https://wattsmartbusiness.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Self-reported utility matches Rocky Mountain Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not the Rocky Mountain Power residential Wattsmart Homes program.",
            "Commercial clothes washer incentives are product-specific and should not imply residential laundry rebates.",
            "Heat pump water heater incentives are for qualifying units used in a business context.",
            "Measures outside the Utah eligible schedules or without required approval should not match."
          ],
          "hardRequirements": [
            "Facility must be served on an eligible Rocky Mountain Power Utah non-residential electric schedule.",
            "Qualifying equipment must be installed at an eligible customer location.",
            "Required application, tax, invoice and technical documentation must be submitted.",
            "Prescriptive and custom incentives are subject to measure specifications, caps and utility approval."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "non_residential_customer",
            "property_owner",
            "trade_ally_assisted_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_laundry_equipment",
            "high_efficiency_refrigeration_equipment",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "compressed_air_system_upgrade",
            "commercial_foodservice_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Utah wattsmart Business is for Rocky Mountain Power non-residential customers on specified Utah schedules. Current pages list lighting and controls, HVAC, motors and drives, food service, compressed air, building envelope and appliances such as business-use heat pump water heaters and commercial clothes washers.",
          "reasoningNotes": "Retain the C&I equipment categories only in a non-residential context. Appliance terms are supported as business/appliance measures, not residential home upgrades."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "programName": "Rocky Mountain Power - wattsmart Business Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_utah_rate_schedule",
            "measuretype",
            "quantity",
            "watts_reduced_or_controlled",
            "tons",
            "indoor_units",
            "annual_kwh_savings",
            "equipment_tier",
            "selected_measure",
            "unit_count_or_engineering_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_utah_rate_schedule",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measuretype",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_reduced_or_controlled",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "indoor_units",
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
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_engineering_savings",
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
              "effectId": "effect_one_time_savings_1_f2275004779e171f",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Rocky Mountain Power",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program",
          "applicationUrl": "https://wattsmartbusiness.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Self-reported utility matches Rocky Mountain Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not the Rocky Mountain Power residential Wattsmart Homes program.",
            "Commercial clothes washer incentives are product-specific and should not imply residential laundry rebates.",
            "Heat pump water heater incentives are for qualifying units used in a business context.",
            "Measures outside the Utah eligible schedules or without required approval should not match."
          ],
          "hardRequirements": [
            "Facility must be served on an eligible Rocky Mountain Power Utah non-residential electric schedule.",
            "Qualifying equipment must be installed at an eligible customer location.",
            "Required application, tax, invoice and technical documentation must be submitted.",
            "Prescriptive and custom incentives are subject to measure specifications, caps and utility approval."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "non_residential_customer",
            "property_owner",
            "trade_ally_assisted_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_laundry_equipment",
            "high_efficiency_refrigeration_equipment",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "compressed_air_system_upgrade",
            "commercial_foodservice_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Utah wattsmart Business is for Rocky Mountain Power non-residential customers on specified Utah schedules. Current pages list lighting and controls, HVAC, motors and drives, food service, compressed air, building envelope and appliances such as business-use heat pump water heaters and commercial clothes washers.",
          "reasoningNotes": "Retain the C&I equipment categories only in a non-residential context. Appliance terms are supported as business/appliance measures, not residential home upgrades."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "programName": "Rocky Mountain Power - wattsmart Business Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_utah_rate_schedule",
            "measuretype",
            "quantity",
            "watts_reduced_or_controlled",
            "tons",
            "indoor_units",
            "annual_kwh_savings",
            "equipment_tier",
            "selected_measure",
            "unit_count_or_engineering_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_utah_rate_schedule",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measuretype",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_reduced_or_controlled",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "indoor_units",
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
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_engineering_savings",
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
              "effectId": "effect_one_time_savings_1_f2275004779e171f",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Rocky Mountain Power",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program",
          "applicationUrl": "https://wattsmartbusiness.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Self-reported utility matches Rocky Mountain Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not the Rocky Mountain Power residential Wattsmart Homes program.",
            "Commercial clothes washer incentives are product-specific and should not imply residential laundry rebates.",
            "Heat pump water heater incentives are for qualifying units used in a business context.",
            "Measures outside the Utah eligible schedules or without required approval should not match."
          ],
          "hardRequirements": [
            "Facility must be served on an eligible Rocky Mountain Power Utah non-residential electric schedule.",
            "Qualifying equipment must be installed at an eligible customer location.",
            "Required application, tax, invoice and technical documentation must be submitted.",
            "Prescriptive and custom incentives are subject to measure specifications, caps and utility approval."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "non_residential_customer",
            "property_owner",
            "trade_ally_assisted_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_laundry_equipment",
            "high_efficiency_refrigeration_equipment",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "compressed_air_system_upgrade",
            "commercial_foodservice_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Utah wattsmart Business is for Rocky Mountain Power non-residential customers on specified Utah schedules. Current pages list lighting and controls, HVAC, motors and drives, food service, compressed air, building envelope and appliances such as business-use heat pump water heaters and commercial clothes washers.",
          "reasoningNotes": "Retain the C&I equipment categories only in a non-residential context. Appliance terms are supported as business/appliance measures, not residential home upgrades."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "programName": "Rocky Mountain Power - wattsmart Business Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_utah_rate_schedule",
            "measuretype",
            "quantity",
            "watts_reduced_or_controlled",
            "tons",
            "indoor_units",
            "annual_kwh_savings",
            "equipment_tier",
            "selected_measure",
            "unit_count_or_engineering_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_utah_rate_schedule",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measuretype",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_reduced_or_controlled",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "indoor_units",
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
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_engineering_savings",
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
              "effectId": "effect_one_time_savings_1_f2275004779e171f",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Rocky Mountain Power",
          "state": "UT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program",
          "applicationUrl": "https://wattsmartbusiness.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state UT matches opportunity geography.",
            "Self-reported utility matches Rocky Mountain Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not the Rocky Mountain Power residential Wattsmart Homes program.",
            "Commercial clothes washer incentives are product-specific and should not imply residential laundry rebates.",
            "Heat pump water heater incentives are for qualifying units used in a business context.",
            "Measures outside the Utah eligible schedules or without required approval should not match."
          ],
          "hardRequirements": [
            "Facility must be served on an eligible Rocky Mountain Power Utah non-residential electric schedule.",
            "Qualifying equipment must be installed at an eligible customer location.",
            "Required application, tax, invoice and technical documentation must be submitted.",
            "Prescriptive and custom incentives are subject to measure specifications, caps and utility approval."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "non_residential_customer",
            "property_owner",
            "trade_ally_assisted_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "heat_pump_water_heater",
            "high_efficiency_laundry_equipment",
            "high_efficiency_refrigeration_equipment",
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "variable_frequency_drive_retrofit",
            "motors_pumps_fans_drives",
            "compressed_air_system_upgrade",
            "commercial_foodservice_equipment",
            "building_envelope_upgrade"
          ],
          "evidenceText": "Utah wattsmart Business is for Rocky Mountain Power non-residential customers on specified Utah schedules. Current pages list lighting and controls, HVAC, motors and drives, food service, compressed air, building envelope and appliances such as business-use heat pump water heaters and commercial clothes washers.",
          "reasoningNotes": "Retain the C&I equipment categories only in a non-residential context. Appliance terms are supported as business/appliance measures, not residential home upgrades."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
          "programName": "Rocky Mountain Power - wattsmart Business Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_utah_rate_schedule",
            "measuretype",
            "quantity",
            "watts_reduced_or_controlled",
            "tons",
            "indoor_units",
            "annual_kwh_savings",
            "equipment_tier",
            "selected_measure",
            "unit_count_or_engineering_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "tons",
              "source": "synthetic_or_placeholder_capacity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_utah_rate_schedule",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measuretype",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_reduced_or_controlled",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "indoor_units",
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
              "inputKey": "selected_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_count_or_engineering_savings",
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
              "effectId": "effect_one_time_savings_1_f2275004779e171f",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
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
    }
  ]
}
