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
  "testCaseOrdinal": 33,
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

Packet 33 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 33,
  "sampleUserId": "bmw-spartanburg-plant",
  "description": "Large South Carolina automotive manufacturing campus in Duke Energy Carolinas territory.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "industrial"
      ],
      "primaryActivityText": "Automotive manufacturing, assembly, painting, logistics, testing, and campus operations",
      "naicsCodes": [
        "336111"
      ],
      "organizationSize": "1,000+ employees"
    },
    "site": {
      "address": {
        "raw": "1400 Highway 101 S, Greer, SC 29651, USA",
        "stateCode": "SC",
        "zip5": "29651"
      },
      "geo": {
        "stateCode": "SC",
        "zip5": "29651",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Duke Energy Carolinas",
          "distributionUtilityId": "UTIL_DUKE",
          "territoryCandidates": [
            "UTIL_DUKE"
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
        "value": 8000000,
        "raw": "8,000,000",
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
    "eligible": 14,
    "ineligible": 1505
  },
  "retrofitCount": 17,
  "retrofits": [
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1803",
          "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1803/solar-energy-small-hydropower-and-geothermal-tax-credit-personal",
          "applicationUrl": "https://dor.sc.gov/forms-site/Forms/TC38.pdf",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, building_controls, building_envelope, demand_response, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone automated demand response controls; demand response is supported only when part of qualifying geothermal machinery and equipment language.",
            "Do not match generic high-efficiency HVAC replacement.",
            "Do not match commercial or corporate tax-credit cases to this personal tax credit record."
          ],
          "hardRequirements": [
            "Taxpayer must own and install a qualifying solar energy system, small hydropower system, or geothermal machinery and equipment.",
            "Credit is claimed using the South Carolina Department of Revenue TC-38 process.",
            "Credit is limited by the statutory percentage, annual dollar cap, tax liability limitation, and carryforward rules.",
            "Leased solar systems are not eligible for the owner tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayer",
            "personal_income_taxpayer",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "personal"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_water_heating_system",
            "small_hydropower_system",
            "ground_source_geothermal_heat_pump",
            "geothermal_water_heating",
            "geothermal_space_heating_cooling",
            "geothermal_heat_reclamation",
            "energy_efficient_daylighting",
            "energy_efficient_demand_response_within_eligible_system"
          ],
          "evidenceText": "South Carolina tax credit materials cover qualifying solar, small hydropower, and geothermal machinery used for water heating, space conditioning, daylighting, heat reclamation, demand response, or energy generation.",
          "reasoningNotes": "Geothermal and solar thermal matches are supported. Demand response must be constrained to eligible geothermal machinery language, not treated as a separate ADR incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1804",
          "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1804/solar-energy-small-hydropower-and-geothermal-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_controls, building_envelope, demand_response, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone automated demand response controls; demand response appears only as a qualifying use of covered energy equipment, not as a separate controls retrofit.",
            "Do not match the repealed large nonresidential solar credit under the separate statute.",
            "Tax credit cannot exceed applicable statutory limits."
          ],
          "hardRequirements": [
            "Taxpayer must own and install a qualifying solar energy system, small hydropower system, or geothermal machinery or equipment.",
            "Credit is subject to statutory percentage, per-facility, tax-liability, and carryforward limits.",
            "Geothermal equipment must be placed in service before the statutory sunset where applicable.",
            "The repealed large solar energy equipment credit for qualifying sites must not be confused with this active credit."
          ],
          "eligibleApplicantTypes": [
            "corporate taxpayers",
            "business property owners",
            "renewable energy system owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_water_heating_system",
            "small_hydropower_system",
            "geothermal_heating_cooling_equipment",
            "solar_daylighting_system",
            "heat_reclamation_system"
          ],
          "evidenceText": "South]( Carolina tax materials identify an active credit for solar energy systems, small hydropower, and geothermal machinery or equipment. Demand response is not supported as a standalone retrofit category.",
          "reasoningNotes": "Removed automated demand response controls and retained qualifying solar, hydropower, geothermal, daylighting, and heat-reclamation uses."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 3,
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
          "id": "scenario_09e0e215eb311de9_v1",
          "name": "South Carolina - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "status": "calculated",
          "opportunityIds": [
            "SOURCE_DSIRE:dsire_program_id:22665"
          ],
          "incentiveRuleIds": [
            "oir_09e0e215eb311de9_v1"
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
              "label": "South Carolina - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
              "amountCents": 0,
              "source": "opportunity_incentive_rule",
              "opportunityId": "SOURCE_DSIRE:dsire_program_id:22665",
              "incentiveRuleId": "oir_09e0e215eb311de9_v1",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22665",
          "opportunityName": "South Carolina - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "upcoming",
          "programType": "Grant Program",
          "administrator": "South Carolina Department of Transportation",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22665/south-carolina-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Application/RFP was not live in the official October 2025 update.",
            "Equipment bought before contract award is not automatically reimbursable.",
            "Residential or private home chargers are not covered.",
            "On-site renewable generation or storage is eligible only when directly tied to the charging station."
          ],
          "hardRequirements": [
            "Awards will be governed by future SCDOT procurement documents and federal NEVI requirements.",
            "Eligible costs include acquisition and installation of EV charging infrastructure and directly related construction.",
            "Stations must satisfy federal requirements including reliability, accessibility, and applicable Buy America and environmental rules.",
            "SCDOT expects private entities to own and operate chargers."
          ],
          "eligibleApplicantTypes": [
            "private_evse_operator",
            "site_host",
            "charging_station_developer",
            "operations_maintenance_provider",
            "contractor"
          ],
          "eligibleSectors": [
            "commercial",
            "transportation",
            "public_infrastructure"
          ],
          "eligibleRetrofitCategories": [
            "dc_fast_charging_station",
            "ev_charging_make_ready",
            "ev_charging_station_operations_maintenance",
            "ev_charging_station_onsite_renewable_storage"
          ],
          "evidenceText": "SCDOT's]( SC+EV materials describe NEVI funding for EV charging infrastructure; the industry page says SCDOT is reevaluating its approach and future program information will follow.",
          "reasoningNotes": "EV charging is source-backed, but current availability should be upcoming because the solicitation was not open in official materials."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 3,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "opportunityName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Duke Energy",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3606/duke-energy-carolinas-non-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Self-reported utility matches Duke Energy.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not infer residential appliances, home weatherization or residential HVAC measures from this non-residential program.",
            "Building envelope matches should be limited to current non-residential measure sheets and not generalized to all insulation projects.",
            "Solar, renewable generation, EV charging and demand response are separate programs unless explicitly included in current Smart Saver documentation.",
            "Official Smart Saver pages were partially access-restricted, so measure-level matches should remain conservative."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Duke Energy Carolinas non-residential customer in the applicable service territory.",
            "Incentives are subject to current Smart Saver measure requirements and funding availability.",
            "Custom and some prescriptive projects may require Duke Energy review or preapproval before purchase or installation.",
            "Measures must be installed at a qualifying business, school or other non-residential facility."
          ],
          "eligibleApplicantTypes": [
            "non_residential_electric_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "school",
            "institutional_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "education",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "commercial_chiller_retrofit",
            "insulation_upgrade",
            "high_efficiency_commercial_dishwasher",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "variable_frequency_drive_retrofit",
            "efficient_air_compressor",
            "efficient_pumps",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Duke]( Energy Smart Saver business pages identify cash incentives for business facilities, including HVAC, commercial equipment, chillers, lighting, pumps, food service and process equipment.",
          "reasoningNotes": "The non-residential program supports commercial HVAC, lighting, controls, refrigeration, food service, drives, pumps, compressed air and custom efficiency categories. The original insulation match is plausible only as a business envelope measure and should not be treated as residential weatherization."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1803",
          "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1803/solar-energy-small-hydropower-and-geothermal-tax-credit-personal",
          "applicationUrl": "https://dor.sc.gov/forms-site/Forms/TC38.pdf",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, building_controls, building_envelope, demand_response, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone automated demand response controls; demand response is supported only when part of qualifying geothermal machinery and equipment language.",
            "Do not match generic high-efficiency HVAC replacement.",
            "Do not match commercial or corporate tax-credit cases to this personal tax credit record."
          ],
          "hardRequirements": [
            "Taxpayer must own and install a qualifying solar energy system, small hydropower system, or geothermal machinery and equipment.",
            "Credit is claimed using the South Carolina Department of Revenue TC-38 process.",
            "Credit is limited by the statutory percentage, annual dollar cap, tax liability limitation, and carryforward rules.",
            "Leased solar systems are not eligible for the owner tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayer",
            "personal_income_taxpayer",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "personal"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_water_heating_system",
            "small_hydropower_system",
            "ground_source_geothermal_heat_pump",
            "geothermal_water_heating",
            "geothermal_space_heating_cooling",
            "geothermal_heat_reclamation",
            "energy_efficient_daylighting",
            "energy_efficient_demand_response_within_eligible_system"
          ],
          "evidenceText": "South Carolina tax credit materials cover qualifying solar, small hydropower, and geothermal machinery used for water heating, space conditioning, daylighting, heat reclamation, demand response, or energy generation.",
          "reasoningNotes": "Geothermal and solar thermal matches are supported. Demand response must be constrained to eligible geothermal machinery language, not treated as a separate ADR incentive."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "programName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_smart_saver_application",
            "measure_type",
            "equipment_specifications",
            "project_cost",
            "prequalification_or_preapproval_status",
            "customer_jurisdiction_sc"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_smart_saver_application",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "prequalification_or_preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_jurisdiction_sc",
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
              "effectId": "effect_one_time_savings_1_5f14c881ba87e319",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1803",
          "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1803/solar-energy-small-hydropower-and-geothermal-tax-credit-personal",
          "applicationUrl": "https://dor.sc.gov/forms-site/Forms/TC38.pdf",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, building_controls, building_envelope, demand_response, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone automated demand response controls; demand response is supported only when part of qualifying geothermal machinery and equipment language.",
            "Do not match generic high-efficiency HVAC replacement.",
            "Do not match commercial or corporate tax-credit cases to this personal tax credit record."
          ],
          "hardRequirements": [
            "Taxpayer must own and install a qualifying solar energy system, small hydropower system, or geothermal machinery and equipment.",
            "Credit is claimed using the South Carolina Department of Revenue TC-38 process.",
            "Credit is limited by the statutory percentage, annual dollar cap, tax liability limitation, and carryforward rules.",
            "Leased solar systems are not eligible for the owner tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayer",
            "personal_income_taxpayer",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "personal"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_water_heating_system",
            "small_hydropower_system",
            "ground_source_geothermal_heat_pump",
            "geothermal_water_heating",
            "geothermal_space_heating_cooling",
            "geothermal_heat_reclamation",
            "energy_efficient_daylighting",
            "energy_efficient_demand_response_within_eligible_system"
          ],
          "evidenceText": "South Carolina tax credit materials cover qualifying solar, small hydropower, and geothermal machinery used for water heating, space conditioning, daylighting, heat reclamation, demand response, or energy generation.",
          "reasoningNotes": "Geothermal and solar thermal matches are supported. Demand response must be constrained to eligible geothermal machinery language, not treated as a separate ADR incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1804",
          "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1804/solar-energy-small-hydropower-and-geothermal-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_controls, building_envelope, demand_response, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone automated demand response controls; demand response appears only as a qualifying use of covered energy equipment, not as a separate controls retrofit.",
            "Do not match the repealed large nonresidential solar credit under the separate statute.",
            "Tax credit cannot exceed applicable statutory limits."
          ],
          "hardRequirements": [
            "Taxpayer must own and install a qualifying solar energy system, small hydropower system, or geothermal machinery or equipment.",
            "Credit is subject to statutory percentage, per-facility, tax-liability, and carryforward limits.",
            "Geothermal equipment must be placed in service before the statutory sunset where applicable.",
            "The repealed large solar energy equipment credit for qualifying sites must not be confused with this active credit."
          ],
          "eligibleApplicantTypes": [
            "corporate taxpayers",
            "business property owners",
            "renewable energy system owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_water_heating_system",
            "small_hydropower_system",
            "geothermal_heating_cooling_equipment",
            "solar_daylighting_system",
            "heat_reclamation_system"
          ],
          "evidenceText": "South]( Carolina tax materials identify an active credit for solar energy systems, small hydropower, and geothermal machinery or equipment. Demand response is not supported as a standalone retrofit category.",
          "reasoningNotes": "Removed automated demand response controls and retained qualifying solar, hydropower, geothermal, daylighting, and heat-reclamation uses."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "automated_demand_response_controls",
      "displayName": "Automated demand response controls",
      "parentCategory": "building_controls_energy_management",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1803",
          "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Personal)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Personal Tax Credit",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1803/solar-energy-small-hydropower-and-geothermal-tax-credit-personal",
          "applicationUrl": "https://dor.sc.gov/forms-site/Forms/TC38.pdf",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, building_controls, building_envelope, demand_response, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone automated demand response controls; demand response is supported only when part of qualifying geothermal machinery and equipment language.",
            "Do not match generic high-efficiency HVAC replacement.",
            "Do not match commercial or corporate tax-credit cases to this personal tax credit record."
          ],
          "hardRequirements": [
            "Taxpayer must own and install a qualifying solar energy system, small hydropower system, or geothermal machinery and equipment.",
            "Credit is claimed using the South Carolina Department of Revenue TC-38 process.",
            "Credit is limited by the statutory percentage, annual dollar cap, tax liability limitation, and carryforward rules.",
            "Leased solar systems are not eligible for the owner tax credit."
          ],
          "eligibleApplicantTypes": [
            "individual_taxpayer",
            "personal_income_taxpayer",
            "residential_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "personal"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_water_heating_system",
            "small_hydropower_system",
            "ground_source_geothermal_heat_pump",
            "geothermal_water_heating",
            "geothermal_space_heating_cooling",
            "geothermal_heat_reclamation",
            "energy_efficient_daylighting",
            "energy_efficient_demand_response_within_eligible_system"
          ],
          "evidenceText": "South Carolina tax credit materials cover qualifying solar, small hydropower, and geothermal machinery used for water heating, space conditioning, daylighting, heat reclamation, demand response, or energy generation.",
          "reasoningNotes": "Geothermal and solar thermal matches are supported. Demand response must be constrained to eligible geothermal machinery language, not treated as a separate ADR incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1804",
          "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Corporate)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Credit",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1804/solar-energy-small-hydropower-and-geothermal-tax-credit-corporate",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_controls, building_envelope, demand_response, renewable_energy, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match standalone automated demand response controls; demand response appears only as a qualifying use of covered energy equipment, not as a separate controls retrofit.",
            "Do not match the repealed large nonresidential solar credit under the separate statute.",
            "Tax credit cannot exceed applicable statutory limits."
          ],
          "hardRequirements": [
            "Taxpayer must own and install a qualifying solar energy system, small hydropower system, or geothermal machinery or equipment.",
            "Credit is subject to statutory percentage, per-facility, tax-liability, and carryforward limits.",
            "Geothermal equipment must be placed in service before the statutory sunset where applicable.",
            "The repealed large solar energy equipment credit for qualifying sites must not be confused with this active credit."
          ],
          "eligibleApplicantTypes": [
            "corporate taxpayers",
            "business property owners",
            "renewable energy system owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_water_heating_system",
            "small_hydropower_system",
            "geothermal_heating_cooling_equipment",
            "solar_daylighting_system",
            "heat_reclamation_system"
          ],
          "evidenceText": "South]( Carolina tax materials identify an active credit for solar energy systems, small hydropower, and geothermal machinery or equipment. Demand response is not supported as a standalone retrofit category.",
          "reasoningNotes": "Removed automated demand response controls and retained qualifying solar, hydropower, geothermal, daylighting, and heat-reclamation uses."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22419",
          "opportunityName": "Renewable Energy and Energy Storage Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Property Tax Incentive",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22419/renewable-energy-and-energy-storage-property-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: battery_storage, renewable_energy, solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match utility-scale systems over 20 kW AC.",
            "Do not match standalone nonrenewable backup batteries or general resilience projects.",
            "This is a property tax exemption, not a rebate or grant."
          ],
          "hardRequirements": [
            "Renewable energy resource property must have nameplate capacity and operation no greater than 20 kW AC.",
            "Battery storage must be a component that enhances operational characteristics of qualifying renewable generating equipment.",
            "Exemption applies to qualifying renewable energy resource property for property tax purposes."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "customer_generators",
            "third_party_system_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "solar_water_heating_system",
            "small_wind_turbine",
            "small_hydroelectric_system",
            "geothermal_heat_pump",
            "battery_storage_system",
            "biomass_energy_system",
            "renewable_hydrogen_system",
            "renewable_chp_system"
          ],
          "evidenceText": "South]( Carolina property tax guidance exempts renewable energy resource property up to 20 kW AC and defines renewable resources to include components such as advanced inverters and battery storage devices.",
          "reasoningNotes": "The battery storage match is valid only when tied to qualifying renewable energy resource property within the statutory size limit."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "opportunityName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Duke Energy",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3606/duke-energy-carolinas-non-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Self-reported utility matches Duke Energy.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not infer residential appliances, home weatherization or residential HVAC measures from this non-residential program.",
            "Building envelope matches should be limited to current non-residential measure sheets and not generalized to all insulation projects.",
            "Solar, renewable generation, EV charging and demand response are separate programs unless explicitly included in current Smart Saver documentation.",
            "Official Smart Saver pages were partially access-restricted, so measure-level matches should remain conservative."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Duke Energy Carolinas non-residential customer in the applicable service territory.",
            "Incentives are subject to current Smart Saver measure requirements and funding availability.",
            "Custom and some prescriptive projects may require Duke Energy review or preapproval before purchase or installation.",
            "Measures must be installed at a qualifying business, school or other non-residential facility."
          ],
          "eligibleApplicantTypes": [
            "non_residential_electric_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "school",
            "institutional_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "education",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "commercial_chiller_retrofit",
            "insulation_upgrade",
            "high_efficiency_commercial_dishwasher",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "variable_frequency_drive_retrofit",
            "efficient_air_compressor",
            "efficient_pumps",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Duke]( Energy Smart Saver business pages identify cash incentives for business facilities, including HVAC, commercial equipment, chillers, lighting, pumps, food service and process equipment.",
          "reasoningNotes": "The non-residential program supports commercial HVAC, lighting, controls, refrigeration, food service, drives, pumps, compressed air and custom efficiency categories. The original insulation match is plausible only as a business envelope measure and should not be treated as residential weatherization."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "programName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_smart_saver_application",
            "measure_type",
            "equipment_specifications",
            "project_cost",
            "prequalification_or_preapproval_status",
            "customer_jurisdiction_sc"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_smart_saver_application",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "prequalification_or_preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_jurisdiction_sc",
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
              "effectId": "effect_one_time_savings_1_5f14c881ba87e319",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
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
      "retrofitTypeId": "fuel_cell_system",
      "displayName": "Fuel cell system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 11000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 1232000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 1232000,
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
          "upfrontCostAfterSavingsCents": 11000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2755",
          "opportunityName": "Sales Tax Exemption for Hydrogen Fuel Cells",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Sales Tax Incentive",
          "administrator": "South Carolina Department of Revenue",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2755/sales-tax-exemption-for-hydrogen-fuel-cells",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match batteries, solar PV, or general renewable electricity systems unless qualifying hydrogen or fuel cell equipment is present.",
            "Do not match general manufacturing machinery unrelated to hydrogen or fuel cells.",
            "This is a sales tax exemption, not a direct rebate."
          ],
          "hardRequirements": [
            "Equipment must be operated by hydrogen or fuel cells, used to generate, produce, or distribute hydrogen, or used predominantly for hydrogen or fuel cell manufacturing or research and development.",
            "Equipment must meet South Carolina sales tax exemption requirements under the alternative energy exemption.",
            "Exemption applies to qualifying device, equipment, or machinery purchases, not unrelated installation costs."
          ],
          "eligibleApplicantTypes": [
            "businesses",
            "manufacturers",
            "research_and_development_facilities",
            "hydrogen_project_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "research_and_development"
          ],
          "eligibleRetrofitCategories": [
            "fuel_cell_system",
            "hydrogen_generation_equipment",
            "hydrogen_distribution_equipment",
            "hydrogen_fuel_cell_manufacturing_equipment"
          ],
          "evidenceText": "South]( Carolina sales tax guidance exempts qualifying hydrogen or fuel cell devices, equipment, and machinery, including hydrogen generation, production, distribution, manufacturing, and research equipment.",
          "reasoningNotes": "The fuel cell match is valid, but categories must remain specific to hydrogen and fuel cell equipment."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "opportunityName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Duke Energy",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3606/duke-energy-carolinas-non-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Self-reported utility matches Duke Energy.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not infer residential appliances, home weatherization or residential HVAC measures from this non-residential program.",
            "Building envelope matches should be limited to current non-residential measure sheets and not generalized to all insulation projects.",
            "Solar, renewable generation, EV charging and demand response are separate programs unless explicitly included in current Smart Saver documentation.",
            "Official Smart Saver pages were partially access-restricted, so measure-level matches should remain conservative."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Duke Energy Carolinas non-residential customer in the applicable service territory.",
            "Incentives are subject to current Smart Saver measure requirements and funding availability.",
            "Custom and some prescriptive projects may require Duke Energy review or preapproval before purchase or installation.",
            "Measures must be installed at a qualifying business, school or other non-residential facility."
          ],
          "eligibleApplicantTypes": [
            "non_residential_electric_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "school",
            "institutional_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "education",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "commercial_chiller_retrofit",
            "insulation_upgrade",
            "high_efficiency_commercial_dishwasher",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "variable_frequency_drive_retrofit",
            "efficient_air_compressor",
            "efficient_pumps",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Duke]( Energy Smart Saver business pages identify cash incentives for business facilities, including HVAC, commercial equipment, chillers, lighting, pumps, food service and process equipment.",
          "reasoningNotes": "The non-residential program supports commercial HVAC, lighting, controls, refrigeration, food service, drives, pumps, compressed air and custom efficiency categories. The original insulation match is plausible only as a business envelope measure and should not be treated as residential weatherization."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "programName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_smart_saver_application",
            "measure_type",
            "equipment_specifications",
            "project_cost",
            "prequalification_or_preapproval_status",
            "customer_jurisdiction_sc"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_smart_saver_application",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "prequalification_or_preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_jurisdiction_sc",
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
              "effectId": "effect_one_time_savings_1_5f14c881ba87e319",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "opportunityName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Duke Energy",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3606/duke-energy-carolinas-non-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Self-reported utility matches Duke Energy.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not infer residential appliances, home weatherization or residential HVAC measures from this non-residential program.",
            "Building envelope matches should be limited to current non-residential measure sheets and not generalized to all insulation projects.",
            "Solar, renewable generation, EV charging and demand response are separate programs unless explicitly included in current Smart Saver documentation.",
            "Official Smart Saver pages were partially access-restricted, so measure-level matches should remain conservative."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Duke Energy Carolinas non-residential customer in the applicable service territory.",
            "Incentives are subject to current Smart Saver measure requirements and funding availability.",
            "Custom and some prescriptive projects may require Duke Energy review or preapproval before purchase or installation.",
            "Measures must be installed at a qualifying business, school or other non-residential facility."
          ],
          "eligibleApplicantTypes": [
            "non_residential_electric_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "school",
            "institutional_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "education",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "commercial_chiller_retrofit",
            "insulation_upgrade",
            "high_efficiency_commercial_dishwasher",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "variable_frequency_drive_retrofit",
            "efficient_air_compressor",
            "efficient_pumps",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Duke]( Energy Smart Saver business pages identify cash incentives for business facilities, including HVAC, commercial equipment, chillers, lighting, pumps, food service and process equipment.",
          "reasoningNotes": "The non-residential program supports commercial HVAC, lighting, controls, refrigeration, food service, drives, pumps, compressed air and custom efficiency categories. The original insulation match is plausible only as a business envelope measure and should not be treated as residential weatherization."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "programName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_smart_saver_application",
            "measure_type",
            "equipment_specifications",
            "project_cost",
            "prequalification_or_preapproval_status",
            "customer_jurisdiction_sc"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_smart_saver_application",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "prequalification_or_preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_jurisdiction_sc",
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
              "effectId": "effect_one_time_savings_1_5f14c881ba87e319",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "hvac_controls_retrofit",
      "displayName": "HVAC controls retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 222800,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 144000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 144000,
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
          "upfrontCostAfterSavingsCents": 222800,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "opportunityName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Duke Energy",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3606/duke-energy-carolinas-non-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Self-reported utility matches Duke Energy.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not infer residential appliances, home weatherization or residential HVAC measures from this non-residential program.",
            "Building envelope matches should be limited to current non-residential measure sheets and not generalized to all insulation projects.",
            "Solar, renewable generation, EV charging and demand response are separate programs unless explicitly included in current Smart Saver documentation.",
            "Official Smart Saver pages were partially access-restricted, so measure-level matches should remain conservative."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Duke Energy Carolinas non-residential customer in the applicable service territory.",
            "Incentives are subject to current Smart Saver measure requirements and funding availability.",
            "Custom and some prescriptive projects may require Duke Energy review or preapproval before purchase or installation.",
            "Measures must be installed at a qualifying business, school or other non-residential facility."
          ],
          "eligibleApplicantTypes": [
            "non_residential_electric_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "school",
            "institutional_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "education",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "commercial_chiller_retrofit",
            "insulation_upgrade",
            "high_efficiency_commercial_dishwasher",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "variable_frequency_drive_retrofit",
            "efficient_air_compressor",
            "efficient_pumps",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Duke]( Energy Smart Saver business pages identify cash incentives for business facilities, including HVAC, commercial equipment, chillers, lighting, pumps, food service and process equipment.",
          "reasoningNotes": "The non-residential program supports commercial HVAC, lighting, controls, refrigeration, food service, drives, pumps, compressed air and custom efficiency categories. The original insulation match is plausible only as a business envelope measure and should not be treated as residential weatherization."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "programName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_smart_saver_application",
            "measure_type",
            "equipment_specifications",
            "project_cost",
            "prequalification_or_preapproval_status",
            "customer_jurisdiction_sc"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_smart_saver_application",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "prequalification_or_preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_jurisdiction_sc",
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
              "effectId": "effect_one_time_savings_1_5f14c881ba87e319",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "opportunityName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Duke Energy",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3606/duke-energy-carolinas-non-residential-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Self-reported utility matches Duke Energy.",
            "Applicant type overlaps eligible sector: industrial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not infer residential appliances, home weatherization or residential HVAC measures from this non-residential program.",
            "Building envelope matches should be limited to current non-residential measure sheets and not generalized to all insulation projects.",
            "Solar, renewable generation, EV charging and demand response are separate programs unless explicitly included in current Smart Saver documentation.",
            "Official Smart Saver pages were partially access-restricted, so measure-level matches should remain conservative."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Duke Energy Carolinas non-residential customer in the applicable service territory.",
            "Incentives are subject to current Smart Saver measure requirements and funding availability.",
            "Custom and some prescriptive projects may require Duke Energy review or preapproval before purchase or installation.",
            "Measures must be installed at a qualifying business, school or other non-residential facility."
          ],
          "eligibleApplicantTypes": [
            "non_residential_electric_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "school",
            "institutional_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "agricultural",
            "education",
            "government"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "hvac_controls_retrofit",
            "commercial_chiller_retrofit",
            "insulation_upgrade",
            "high_efficiency_commercial_dishwasher",
            "commercial_kitchen_foodservice_equipment",
            "high_efficiency_refrigeration_equipment",
            "variable_frequency_drive_retrofit",
            "efficient_air_compressor",
            "efficient_pumps",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Duke]( Energy Smart Saver business pages identify cash incentives for business facilities, including HVAC, commercial equipment, chillers, lighting, pumps, food service and process equipment.",
          "reasoningNotes": "The non-residential program supports commercial HVAC, lighting, controls, refrigeration, food service, drives, pumps, compressed air and custom efficiency categories. The original insulation match is plausible only as a business envelope measure and should not be treated as residential weatherization."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
          "programName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_smart_saver_application",
            "measure_type",
            "equipment_specifications",
            "project_cost",
            "prequalification_or_preapproval_status",
            "customer_jurisdiction_sc"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_smart_saver_application",
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
              "inputKey": "equipment_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "prequalification_or_preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_jurisdiction_sc",
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
              "effectId": "effect_one_time_savings_1_5f14c881ba87e319",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:21862",
          "opportunityName": "Santee Cooper - Rooftop Solar Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Santee Cooper",
          "state": "SC",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/21862/santee-cooper-rooftop-solar-rebate-program",
          "applicationUrl": "https://www.santeecooper.com/Programs-Incentives/EmpowerSolar/Solar-Home/_pdfs/2026-Solar-Residential-Program-Manual-v1-12012025.pdf",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state SC matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Battery costs are not eligible; only the solar electric portion may qualify.",
            "Third-party leased systems do not qualify under the residential program manual.",
            "Solar Share and business solar options are separate programs and should not be merged into this residential rebate."
          ],
          "hardRequirements": [
            "Customer must be a Santee Cooper residential customer on an eligible residential rate.",
            "Solar PV project must receive required distributed generation rider and interconnection approval.",
            "Installer must meet Santee Cooper trade ally or NABCEP requirements.",
            "System size, application timing, insurance, ownership, and program-period requirements apply."
          ],
          "eligibleApplicantTypes": [
            "residential_customers",
            "homeowners",
            "authorized_owner_representatives",
            "multifamily_residential_account_holders"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv"
          ],
          "evidenceText": "Santee]( Cooper's Solar Home program manual supports rebates for eligible residential customers installing solar PV, with interconnection, installer, ownership, timing, and size requirements.",
          "reasoningNotes": "The rooftop solar PV match is valid. Keep Santee Cooper utility territory, residential-sector limits, and battery exclusions."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:21862",
          "programName": "Santee Cooper - Rooftop Solar Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "no_supported_effect_amount",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "system_dc_watts",
            "inverter_efficiency",
            "eligible_meter_count",
            "interconnection_approval",
            "installer_qualification"
          ],
          "defaultedInputs": [
            {
              "inputKey": "system_dc_watts",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "inverter_efficiency",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_meter_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "interconnection_approval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installer_qualification",
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
              "effectId": "effect_one_time_savings_1_3a22ab1931ccc83a",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": true,
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
    }
  ]
}
