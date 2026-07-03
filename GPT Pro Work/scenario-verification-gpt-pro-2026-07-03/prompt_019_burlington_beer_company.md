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
  "testCaseOrdinal": 19,
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

Packet 19 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 19,
  "sampleUserId": "burlington-beer-company",
  "description": "Vermont craft brewery, restaurant, and taproom in Burlington Electric territory.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "commercial"
      ],
      "primaryActivityText": "Beer production, taproom sales, restaurant food service, cold storage, and barrel aging",
      "naicsCodes": [
        "312120",
        "722511"
      ],
      "organizationSize": "51-250 employees"
    },
    "site": {
      "address": {
        "raw": "180 Flynn Avenue, Burlington, VT 05401, USA",
        "stateCode": "VT",
        "zip5": "05401"
      },
      "geo": {
        "stateCode": "VT",
        "zip5": "05401",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Burlington Electric Department",
          "distributionUtilityId": "UTIL_BURLINGTON_ELECTRIC",
          "territoryCandidates": [
            "UTIL_BURLINGTON_ELECTRIC"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "industrial_manufacturing"
      ],
      "squareFootage": {
        "value": 15000,
        "raw": "15,000",
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
    "eligible": 9,
    "ineligible": 1510
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:45",
          "opportunityName": "Local Option - Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Adopting Vermont municipalities",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/45/local-option-property-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state VT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not assume statewide automatic exemption; it is a local option requiring municipal adoption.",
            "Do not match broad combined heat and power systems; only qualifying micro-CHP under net-metering definitions is supported.",
            "Do not match renewable projects primarily selling power to the public unless the local statute and net-metering rules support them."
          ],
          "hardRequirements": [
            "Municipality must have voted at a warned meeting to exempt renewable energy sources from property tax.",
            "System must meet Vermont statutory renewable energy source definitions.",
            "For on-premises private, domestic, or agricultural use, system output generally may not be sold or exchanged to the public except under net metering.",
            "Micro-CHP eligibility is limited to qualifying small net-metering systems."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "taxpayer",
            "municipal_resident"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "agricultural",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "wind_energy_system",
            "biomass_biogas_energy_system",
            "net_metering_renewable_energy_system",
            "micro_combined_heat_and_power_system"
          ],
          "evidenceText": "Vermont]( statute lets municipalities vote to exempt renewable energy sources, using renewable energy definitions that include solar, wind, methane from organic matter, and net-metering systems.",
          "reasoningNotes": "Solar and biomass matches are valid where a municipality adopts the local option. Broad CHP should be narrowed to qualifying micro-CHP."
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
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22250",
          "opportunityName": "Electric Vehicle Charging Station Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan",
          "administrator": "Vermont Economic Development Authority",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22250/electric-vehicle-charging-station-loan-program",
          "applicationUrl": "https://www.veda.org/financing-options/vermont-commercial-financing/electric-vehicle-charging-station-loan-program/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a loan, not a rebate or grant.",
            "Private residential chargers are not eligible.",
            "Workplace-only charging that is not publicly available should not match this public charging loan.",
            "Natural gas refueling stations may also be eligible for the loan but are not an EV charger retrofit category."
          ],
          "hardRequirements": [
            "Loan proceeds may be used to purchase and install EV charging stations.",
            "Charging stations must be made available for use by the general public.",
            "Borrower must meet VEDA underwriting and loan requirements.",
            "Loan amount, term, interest rate, and fees are limited by current VEDA program rules."
          ],
          "eligibleApplicantTypes": [
            "sole_proprietor",
            "partnership",
            "for_profit_corporation",
            "nonprofit_corporation",
            "municipality"
          ],
          "eligibleSectors": [
            "commercial",
            "nonprofit",
            "municipal",
            "public_access",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "public_ev_charger_installation_financing"
          ],
          "evidenceText": "VEDA states loan proceeds may finance purchase and installation of EV charging stations that are available for use by the general public.",
          "reasoningNotes": "Do not duplicate a Level 2 category because the official page does not limit this financing to Level 2 chargers."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "opportunityName": "Residential Rental Property Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Efficiency Vermont",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2680/residential-rental-property-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: refrigeration, hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Window replacement was a false positive; the current rental list shows window air conditioners, not replacement windows.",
            "Low-flow fixture retrofit should not be matched from the current rental list because free renter products were shown as unavailable or separate.",
            "Residential refrigerators and freezers should not be generalized into commercial refrigeration equipment.",
            "EV charging appears as a partner offer and should be treated as separate from this rental efficiency rebate list.",
            "Do not infer commercial or industrial measures from residential rental offers."
          ],
          "hardRequirements": [
            "Measure must be listed under the current Efficiency Vermont rental-property rebate filter or the applicable rental owner or renter offer.",
            "Applicant must satisfy the owner, renter, income-qualified, multifamily, or building-performance eligibility rules for the chosen offer.",
            "Products and projects must meet Efficiency Vermont specifications and application timing requirements.",
            "Partner programs and currently unavailable free-product offers should not be treated as active rebates unless reopened."
          ],
          "eligibleApplicantTypes": [
            "rental_property_owner",
            "landlord",
            "renter",
            "income_qualified_resident",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential",
            "rental_housing"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "home_performance_weatherization",
            "ducted_heat_pump",
            "ductless_mini_split_heat_pump",
            "air_to_water_heat_pump",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "smart_thermostat_zoning_retrofit",
            "high_efficiency_laundry_equipment",
            "energy_star_refrigerator",
            "energy_star_freezer",
            "bath_fan",
            "air_purifier",
            "building_performance_custom",
            "rental_energy_consultation",
            "window_air_conditioner"
          ],
          "evidenceText": "The]( current rental-property rebate list includes weatherization, home performance, ducted and ductless heat pumps, air-to-water and ground-source heat pumps, heat pump water heaters, appliances, smart thermostats, bath fans, air purifiers, consultations, and window air conditioners.",
          "reasoningNotes": "Most original matches are supported, but window replacement and low-flow fixtures should be removed or blocked because the current rental list does not support them as active retrofit categories."
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
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "programName": "Residential Rental Property Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selected_rental_measure",
            "eligible_product_model_or_project_scope",
            "unit_count",
            "tons_where_applicable",
            "eligible_project_cost_where_percentage_or_custom_caps_apply",
            "rental_owner_renter_or_income_qualified_pathway",
            "selected_measure",
            "unit_count_or_tons",
            "eligible_cost_basis",
            "product_tier_or_project_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_rental_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_product_model_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_cost_where_percentage_or_custom_caps_apply",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "rental_owner_renter_or_income_qualified_pathway",
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
              "inputKey": "unit_count_or_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_basis",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "product_tier_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 7500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_970a50d4fd60ddf4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 7500,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:45",
          "opportunityName": "Local Option - Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Adopting Vermont municipalities",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/45/local-option-property-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state VT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not assume statewide automatic exemption; it is a local option requiring municipal adoption.",
            "Do not match broad combined heat and power systems; only qualifying micro-CHP under net-metering definitions is supported.",
            "Do not match renewable projects primarily selling power to the public unless the local statute and net-metering rules support them."
          ],
          "hardRequirements": [
            "Municipality must have voted at a warned meeting to exempt renewable energy sources from property tax.",
            "System must meet Vermont statutory renewable energy source definitions.",
            "For on-premises private, domestic, or agricultural use, system output generally may not be sold or exchanged to the public except under net metering.",
            "Micro-CHP eligibility is limited to qualifying small net-metering systems."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "taxpayer",
            "municipal_resident"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "agricultural",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "wind_energy_system",
            "biomass_biogas_energy_system",
            "net_metering_renewable_energy_system",
            "micro_combined_heat_and_power_system"
          ],
          "evidenceText": "Vermont]( statute lets municipalities vote to exempt renewable energy sources, using renewable energy definitions that include solar, wind, methane from organic matter, and net-metering systems.",
          "reasoningNotes": "Solar and biomass matches are valid where a municipality adopts the local option. Broad CHP should be narrowed to qualifying micro-CHP."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "opportunityName": "Residential Rental Property Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Efficiency Vermont",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2680/residential-rental-property-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: refrigeration, hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Window replacement was a false positive; the current rental list shows window air conditioners, not replacement windows.",
            "Low-flow fixture retrofit should not be matched from the current rental list because free renter products were shown as unavailable or separate.",
            "Residential refrigerators and freezers should not be generalized into commercial refrigeration equipment.",
            "EV charging appears as a partner offer and should be treated as separate from this rental efficiency rebate list.",
            "Do not infer commercial or industrial measures from residential rental offers."
          ],
          "hardRequirements": [
            "Measure must be listed under the current Efficiency Vermont rental-property rebate filter or the applicable rental owner or renter offer.",
            "Applicant must satisfy the owner, renter, income-qualified, multifamily, or building-performance eligibility rules for the chosen offer.",
            "Products and projects must meet Efficiency Vermont specifications and application timing requirements.",
            "Partner programs and currently unavailable free-product offers should not be treated as active rebates unless reopened."
          ],
          "eligibleApplicantTypes": [
            "rental_property_owner",
            "landlord",
            "renter",
            "income_qualified_resident",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential",
            "rental_housing"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "home_performance_weatherization",
            "ducted_heat_pump",
            "ductless_mini_split_heat_pump",
            "air_to_water_heat_pump",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "smart_thermostat_zoning_retrofit",
            "high_efficiency_laundry_equipment",
            "energy_star_refrigerator",
            "energy_star_freezer",
            "bath_fan",
            "air_purifier",
            "building_performance_custom",
            "rental_energy_consultation",
            "window_air_conditioner"
          ],
          "evidenceText": "The]( current rental-property rebate list includes weatherization, home performance, ducted and ductless heat pumps, air-to-water and ground-source heat pumps, heat pump water heaters, appliances, smart thermostats, bath fans, air purifiers, consultations, and window air conditioners.",
          "reasoningNotes": "Most original matches are supported, but window replacement and low-flow fixtures should be removed or blocked because the current rental list does not support them as active retrofit categories."
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
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "programName": "Residential Rental Property Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selected_rental_measure",
            "eligible_product_model_or_project_scope",
            "unit_count",
            "tons_where_applicable",
            "eligible_project_cost_where_percentage_or_custom_caps_apply",
            "rental_owner_renter_or_income_qualified_pathway",
            "selected_measure",
            "unit_count_or_tons",
            "eligible_cost_basis",
            "product_tier_or_project_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_rental_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_product_model_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_cost_where_percentage_or_custom_caps_apply",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "rental_owner_renter_or_income_qualified_pathway",
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
              "inputKey": "unit_count_or_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_basis",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "product_tier_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 7500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_970a50d4fd60ddf4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 7500,
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
        "oneTimeSavingsCents": 3000,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 108000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 108000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 2,
          "runtimeRuleCount": 1,
          "includedPackageCount": 1,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_v2_ac5d3a679cefcb8e_v1",
          "name": "Evaporator fan motor controls are rebated at $30 per qualifying fan control.",
          "status": "calculated",
          "opportunityIds": [
            "SOURCE_DSIRE:dsire_program_id:22588"
          ],
          "incentiveRuleIds": [
            "oir_v2_ac5d3a679cefcb8e_v1"
          ],
          "totalUpfrontSavingsCents": 3000,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 3000,
          "upfrontCostAfterSavingsCents": 342000,
          "upfrontSavingsEntries": [
            {
              "kind": "upfront_savings",
              "category": "rebate",
              "label": "Evaporator fan motor controls are rebated at $30 per qualifying fan control.",
              "amountCents": 3000,
              "source": "opportunity_incentive_rule",
              "opportunityId": "SOURCE_DSIRE:dsire_program_id:22588",
              "incentiveRuleId": "oir_v2_ac5d3a679cefcb8e_v1",
              "formula": "per_unit"
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "opportunityName": "Residential Rental Property Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Efficiency Vermont",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2680/residential-rental-property-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: refrigeration, hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Window replacement was a false positive; the current rental list shows window air conditioners, not replacement windows.",
            "Low-flow fixture retrofit should not be matched from the current rental list because free renter products were shown as unavailable or separate.",
            "Residential refrigerators and freezers should not be generalized into commercial refrigeration equipment.",
            "EV charging appears as a partner offer and should be treated as separate from this rental efficiency rebate list.",
            "Do not infer commercial or industrial measures from residential rental offers."
          ],
          "hardRequirements": [
            "Measure must be listed under the current Efficiency Vermont rental-property rebate filter or the applicable rental owner or renter offer.",
            "Applicant must satisfy the owner, renter, income-qualified, multifamily, or building-performance eligibility rules for the chosen offer.",
            "Products and projects must meet Efficiency Vermont specifications and application timing requirements.",
            "Partner programs and currently unavailable free-product offers should not be treated as active rebates unless reopened."
          ],
          "eligibleApplicantTypes": [
            "rental_property_owner",
            "landlord",
            "renter",
            "income_qualified_resident",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential",
            "rental_housing"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "home_performance_weatherization",
            "ducted_heat_pump",
            "ductless_mini_split_heat_pump",
            "air_to_water_heat_pump",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "smart_thermostat_zoning_retrofit",
            "high_efficiency_laundry_equipment",
            "energy_star_refrigerator",
            "energy_star_freezer",
            "bath_fan",
            "air_purifier",
            "building_performance_custom",
            "rental_energy_consultation",
            "window_air_conditioner"
          ],
          "evidenceText": "The]( current rental-property rebate list includes weatherization, home performance, ducted and ductless heat pumps, air-to-water and ground-source heat pumps, heat pump water heaters, appliances, smart thermostats, bath fans, air purifiers, consultations, and window air conditioners.",
          "reasoningNotes": "Most original matches are supported, but window replacement and low-flow fixtures should be removed or blocked because the current rental list does not support them as active retrofit categories."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22588",
          "opportunityName": "Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Efficiency Vermont",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22588/commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: lighting, refrigeration, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not generalize product-specific kitchen or refrigeration offers into all plumbing or appliance projects.",
            "Transportation and EV partner offers are separate from ordinary building efficiency rebates.",
            "Projects in territories served by another efficiency administrator may need a different program."
          ],
          "hardRequirements": [
            "Site must be in Efficiency Vermont service territory and meet the specific business or rental-property offer terms.",
            "Equipment must satisfy current product-specific rebate requirements and required documentation.",
            "Offers are subject to current program funding, caps, and measure-specific rules."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_property_owner",
            "rental_property_owner",
            "nonprofit_customer",
            "agricultural_business_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "multifamily",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls",
            "high_efficiency_refrigeration_equipment",
            "commercial_kitchen_equipment",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "building_envelope_air_sealing_insulation",
            "business_energy_assessment",
            "custom_energy_efficiency_project",
            "variable_frequency_drive_motor_controls"
          ],
          "evidenceText": "Official]( rebate list shows business-eligible lighting, refrigeration, commercial kitchen, HVAC, heat pump, controls, building performance, assessment, and custom project offers.",
          "reasoningNotes": "Input batch citation: The original refrigeration and LED lighting matches are supported; categories were narrowed to measures shown on the current business rebate list."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22588",
          "programName": "Commercial Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "included",
          "includedInRuntimeTotals": true,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "qualifying_motor_count",
            "confirmed_point_of_sale_or_rebate_amount",
            "controlled_fan_count",
            "selected_business_rebate_measure",
            "measure_quantity",
            "equipment_tier_or_product_requirements"
          ],
          "defaultedInputs": [
            {
              "inputKey": "qualifying_motor_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "confirmed_point_of_sale_or_rebate_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "controlled_fan_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selected_business_rebate_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier_or_product_requirements",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 3000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_8d587021383c5433",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_88f94457ccc2cda7",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": true,
              "humanReviewRequired": false,
              "amountCents": 3000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_3_1fc6e71320658af9",
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
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "programName": "Residential Rental Property Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selected_rental_measure",
            "eligible_product_model_or_project_scope",
            "unit_count",
            "tons_where_applicable",
            "eligible_project_cost_where_percentage_or_custom_caps_apply",
            "rental_owner_renter_or_income_qualified_pathway",
            "selected_measure",
            "unit_count_or_tons",
            "eligible_cost_basis",
            "product_tier_or_project_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_rental_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_product_model_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_cost_where_percentage_or_custom_caps_apply",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "rental_owner_renter_or_income_qualified_pathway",
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
              "inputKey": "unit_count_or_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_basis",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "product_tier_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 7500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_970a50d4fd60ddf4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 7500,
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
        "oneTimeSavingsCents": 36000,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 22464,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 22464,
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
          "id": "scenario_v2_ac5d3a679cefcb8e_v1",
          "name": "Evaporator fan motor controls are rebated at $30 per qualifying fan control.",
          "status": "calculated",
          "opportunityIds": [
            "SOURCE_DSIRE:dsire_program_id:22588"
          ],
          "incentiveRuleIds": [
            "oir_v2_ac5d3a679cefcb8e_v1"
          ],
          "totalUpfrontSavingsCents": 36000,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 36000,
          "upfrontCostAfterSavingsCents": 124425,
          "upfrontSavingsEntries": [
            {
              "kind": "upfront_savings",
              "category": "rebate",
              "label": "Evaporator fan motor controls are rebated at $30 per qualifying fan control.",
              "amountCents": 36000,
              "source": "opportunity_incentive_rule",
              "opportunityId": "SOURCE_DSIRE:dsire_program_id:22588",
              "incentiveRuleId": "oir_v2_ac5d3a679cefcb8e_v1",
              "formula": "per_unit"
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22588",
          "opportunityName": "Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Efficiency Vermont",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22588/commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: lighting, refrigeration, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not generalize product-specific kitchen or refrigeration offers into all plumbing or appliance projects.",
            "Transportation and EV partner offers are separate from ordinary building efficiency rebates.",
            "Projects in territories served by another efficiency administrator may need a different program."
          ],
          "hardRequirements": [
            "Site must be in Efficiency Vermont service territory and meet the specific business or rental-property offer terms.",
            "Equipment must satisfy current product-specific rebate requirements and required documentation.",
            "Offers are subject to current program funding, caps, and measure-specific rules."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "commercial_property_owner",
            "rental_property_owner",
            "nonprofit_customer",
            "agricultural_business_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "multifamily",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls",
            "high_efficiency_refrigeration_equipment",
            "commercial_kitchen_equipment",
            "high_efficiency_hvac_replacement",
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "building_envelope_air_sealing_insulation",
            "business_energy_assessment",
            "custom_energy_efficiency_project",
            "variable_frequency_drive_motor_controls"
          ],
          "evidenceText": "Official]( rebate list shows business-eligible lighting, refrigeration, commercial kitchen, HVAC, heat pump, controls, building performance, assessment, and custom project offers.",
          "reasoningNotes": "Input batch citation: The original refrigeration and LED lighting matches are supported; categories were narrowed to measures shown on the current business rebate list."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22588",
          "programName": "Commercial Energy Efficiency Rebate Programs",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "included",
          "includedInRuntimeTotals": true,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "qualifying_motor_count",
            "confirmed_point_of_sale_or_rebate_amount",
            "controlled_fan_count",
            "selected_business_rebate_measure",
            "measure_quantity",
            "equipment_tier_or_product_requirements"
          ],
          "defaultedInputs": [
            {
              "inputKey": "qualifying_motor_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "confirmed_point_of_sale_or_rebate_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "controlled_fan_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "selected_business_rebate_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_tier_or_product_requirements",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 36000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_8d587021383c5433",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_88f94457ccc2cda7",
              "effectType": "one_time_savings",
              "calculationMethod": "per_unit",
              "valueModelKind": "per_unit_award",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": true,
              "humanReviewRequired": false,
              "amountCents": 36000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_3_1fc6e71320658af9",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:45",
          "opportunityName": "Local Option - Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Adopting Vermont municipalities",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/45/local-option-property-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state VT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not assume statewide automatic exemption; it is a local option requiring municipal adoption.",
            "Do not match broad combined heat and power systems; only qualifying micro-CHP under net-metering definitions is supported.",
            "Do not match renewable projects primarily selling power to the public unless the local statute and net-metering rules support them."
          ],
          "hardRequirements": [
            "Municipality must have voted at a warned meeting to exempt renewable energy sources from property tax.",
            "System must meet Vermont statutory renewable energy source definitions.",
            "For on-premises private, domestic, or agricultural use, system output generally may not be sold or exchanged to the public except under net metering.",
            "Micro-CHP eligibility is limited to qualifying small net-metering systems."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "taxpayer",
            "municipal_resident"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "agricultural",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "wind_energy_system",
            "biomass_biogas_energy_system",
            "net_metering_renewable_energy_system",
            "micro_combined_heat_and_power_system"
          ],
          "evidenceText": "Vermont]( statute lets municipalities vote to exempt renewable energy sources, using renewable energy definitions that include solar, wind, methane from organic matter, and net-metering systems.",
          "reasoningNotes": "Solar and biomass matches are valid where a municipality adopts the local option. Broad CHP should be narrowed to qualifying micro-CHP."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "opportunityName": "Residential Rental Property Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Efficiency Vermont",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2680/residential-rental-property-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: refrigeration, hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Window replacement was a false positive; the current rental list shows window air conditioners, not replacement windows.",
            "Low-flow fixture retrofit should not be matched from the current rental list because free renter products were shown as unavailable or separate.",
            "Residential refrigerators and freezers should not be generalized into commercial refrigeration equipment.",
            "EV charging appears as a partner offer and should be treated as separate from this rental efficiency rebate list.",
            "Do not infer commercial or industrial measures from residential rental offers."
          ],
          "hardRequirements": [
            "Measure must be listed under the current Efficiency Vermont rental-property rebate filter or the applicable rental owner or renter offer.",
            "Applicant must satisfy the owner, renter, income-qualified, multifamily, or building-performance eligibility rules for the chosen offer.",
            "Products and projects must meet Efficiency Vermont specifications and application timing requirements.",
            "Partner programs and currently unavailable free-product offers should not be treated as active rebates unless reopened."
          ],
          "eligibleApplicantTypes": [
            "rental_property_owner",
            "landlord",
            "renter",
            "income_qualified_resident",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential",
            "rental_housing"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "home_performance_weatherization",
            "ducted_heat_pump",
            "ductless_mini_split_heat_pump",
            "air_to_water_heat_pump",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "smart_thermostat_zoning_retrofit",
            "high_efficiency_laundry_equipment",
            "energy_star_refrigerator",
            "energy_star_freezer",
            "bath_fan",
            "air_purifier",
            "building_performance_custom",
            "rental_energy_consultation",
            "window_air_conditioner"
          ],
          "evidenceText": "The]( current rental-property rebate list includes weatherization, home performance, ducted and ductless heat pumps, air-to-water and ground-source heat pumps, heat pump water heaters, appliances, smart thermostats, bath fans, air purifiers, consultations, and window air conditioners.",
          "reasoningNotes": "Most original matches are supported, but window replacement and low-flow fixtures should be removed or blocked because the current rental list does not support them as active retrofit categories."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "programName": "Residential Rental Property Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selected_rental_measure",
            "eligible_product_model_or_project_scope",
            "unit_count",
            "tons_where_applicable",
            "eligible_project_cost_where_percentage_or_custom_caps_apply",
            "rental_owner_renter_or_income_qualified_pathway",
            "selected_measure",
            "unit_count_or_tons",
            "eligible_cost_basis",
            "product_tier_or_project_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_rental_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_product_model_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_cost_where_percentage_or_custom_caps_apply",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "rental_owner_renter_or_income_qualified_pathway",
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
              "inputKey": "unit_count_or_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_basis",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "product_tier_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 7500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_970a50d4fd60ddf4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 7500,
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
            "Applicant type overlaps eligible sector: commercial.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "opportunityName": "Residential Rental Property Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Efficiency Vermont",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2680/residential-rental-property-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: refrigeration, hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Window replacement was a false positive; the current rental list shows window air conditioners, not replacement windows.",
            "Low-flow fixture retrofit should not be matched from the current rental list because free renter products were shown as unavailable or separate.",
            "Residential refrigerators and freezers should not be generalized into commercial refrigeration equipment.",
            "EV charging appears as a partner offer and should be treated as separate from this rental efficiency rebate list.",
            "Do not infer commercial or industrial measures from residential rental offers."
          ],
          "hardRequirements": [
            "Measure must be listed under the current Efficiency Vermont rental-property rebate filter or the applicable rental owner or renter offer.",
            "Applicant must satisfy the owner, renter, income-qualified, multifamily, or building-performance eligibility rules for the chosen offer.",
            "Products and projects must meet Efficiency Vermont specifications and application timing requirements.",
            "Partner programs and currently unavailable free-product offers should not be treated as active rebates unless reopened."
          ],
          "eligibleApplicantTypes": [
            "rental_property_owner",
            "landlord",
            "renter",
            "income_qualified_resident",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential",
            "rental_housing"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "home_performance_weatherization",
            "ducted_heat_pump",
            "ductless_mini_split_heat_pump",
            "air_to_water_heat_pump",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "smart_thermostat_zoning_retrofit",
            "high_efficiency_laundry_equipment",
            "energy_star_refrigerator",
            "energy_star_freezer",
            "bath_fan",
            "air_purifier",
            "building_performance_custom",
            "rental_energy_consultation",
            "window_air_conditioner"
          ],
          "evidenceText": "The]( current rental-property rebate list includes weatherization, home performance, ducted and ductless heat pumps, air-to-water and ground-source heat pumps, heat pump water heaters, appliances, smart thermostats, bath fans, air purifiers, consultations, and window air conditioners.",
          "reasoningNotes": "Most original matches are supported, but window replacement and low-flow fixtures should be removed or blocked because the current rental list does not support them as active retrofit categories."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "programName": "Residential Rental Property Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selected_rental_measure",
            "eligible_product_model_or_project_scope",
            "unit_count",
            "tons_where_applicable",
            "eligible_project_cost_where_percentage_or_custom_caps_apply",
            "rental_owner_renter_or_income_qualified_pathway",
            "selected_measure",
            "unit_count_or_tons",
            "eligible_cost_basis",
            "product_tier_or_project_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_rental_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_product_model_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_cost_where_percentage_or_custom_caps_apply",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "rental_owner_renter_or_income_qualified_pathway",
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
              "inputKey": "unit_count_or_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_basis",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "product_tier_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 7500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_970a50d4fd60ddf4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 7500,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "opportunityName": "Residential Rental Property Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Efficiency Vermont",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2680/residential-rental-property-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "Opportunity explicitly has no site or facility type restriction.",
            "Opportunity technology is available for retrofit discovery: refrigeration, hvac, building_controls, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Window replacement was a false positive; the current rental list shows window air conditioners, not replacement windows.",
            "Low-flow fixture retrofit should not be matched from the current rental list because free renter products were shown as unavailable or separate.",
            "Residential refrigerators and freezers should not be generalized into commercial refrigeration equipment.",
            "EV charging appears as a partner offer and should be treated as separate from this rental efficiency rebate list.",
            "Do not infer commercial or industrial measures from residential rental offers."
          ],
          "hardRequirements": [
            "Measure must be listed under the current Efficiency Vermont rental-property rebate filter or the applicable rental owner or renter offer.",
            "Applicant must satisfy the owner, renter, income-qualified, multifamily, or building-performance eligibility rules for the chosen offer.",
            "Products and projects must meet Efficiency Vermont specifications and application timing requirements.",
            "Partner programs and currently unavailable free-product offers should not be treated as active rebates unless reopened."
          ],
          "eligibleApplicantTypes": [
            "rental_property_owner",
            "landlord",
            "renter",
            "income_qualified_resident",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "multifamily_residential",
            "rental_housing"
          ],
          "eligibleRetrofitCategories": [
            "air_sealing_weatherization",
            "insulation_upgrade",
            "home_performance_weatherization",
            "ducted_heat_pump",
            "ductless_mini_split_heat_pump",
            "air_to_water_heat_pump",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "smart_thermostat_zoning_retrofit",
            "high_efficiency_laundry_equipment",
            "energy_star_refrigerator",
            "energy_star_freezer",
            "bath_fan",
            "air_purifier",
            "building_performance_custom",
            "rental_energy_consultation",
            "window_air_conditioner"
          ],
          "evidenceText": "The]( current rental-property rebate list includes weatherization, home performance, ducted and ductless heat pumps, air-to-water and ground-source heat pumps, heat pump water heaters, appliances, smart thermostats, bath fans, air purifiers, consultations, and window air conditioners.",
          "reasoningNotes": "Most original matches are supported, but window replacement and low-flow fixtures should be removed or blocked because the current rental list does not support them as active retrofit categories."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
          "programName": "Residential Rental Property Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "selected_rental_measure",
            "eligible_product_model_or_project_scope",
            "unit_count",
            "tons_where_applicable",
            "eligible_project_cost_where_percentage_or_custom_caps_apply",
            "rental_owner_renter_or_income_qualified_pathway",
            "selected_measure",
            "unit_count_or_tons",
            "eligible_cost_basis",
            "product_tier_or_project_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_rental_measure",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_product_model_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "tons_where_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_cost_where_percentage_or_custom_caps_apply",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "rental_owner_renter_or_income_qualified_pathway",
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
              "inputKey": "unit_count_or_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_basis",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "product_tier_or_project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 7500,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_970a50d4fd60ddf4",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 7500,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22250",
          "opportunityName": "Electric Vehicle Charging Station Loan Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan",
          "administrator": "Vermont Economic Development Authority",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22250/electric-vehicle-charging-station-loan-program",
          "applicationUrl": "https://www.veda.org/financing-options/vermont-commercial-financing/electric-vehicle-charging-station-loan-program/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state VT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a loan, not a rebate or grant.",
            "Private residential chargers are not eligible.",
            "Workplace-only charging that is not publicly available should not match this public charging loan.",
            "Natural gas refueling stations may also be eligible for the loan but are not an EV charger retrofit category."
          ],
          "hardRequirements": [
            "Loan proceeds may be used to purchase and install EV charging stations.",
            "Charging stations must be made available for use by the general public.",
            "Borrower must meet VEDA underwriting and loan requirements.",
            "Loan amount, term, interest rate, and fees are limited by current VEDA program rules."
          ],
          "eligibleApplicantTypes": [
            "sole_proprietor",
            "partnership",
            "for_profit_corporation",
            "nonprofit_corporation",
            "municipality"
          ],
          "eligibleSectors": [
            "commercial",
            "nonprofit",
            "municipal",
            "public_access",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "public_ev_charger_installation_financing"
          ],
          "evidenceText": "VEDA states loan proceeds may finance purchase and installation of EV charging stations that are available for use by the general public.",
          "reasoningNotes": "Do not duplicate a Level 2 category because the official page does not limit this financing to Level 2 chargers."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:45",
          "opportunityName": "Local Option - Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Adopting Vermont municipalities",
          "state": "VT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/45/local-option-property-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state VT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not assume statewide automatic exemption; it is a local option requiring municipal adoption.",
            "Do not match broad combined heat and power systems; only qualifying micro-CHP under net-metering definitions is supported.",
            "Do not match renewable projects primarily selling power to the public unless the local statute and net-metering rules support them."
          ],
          "hardRequirements": [
            "Municipality must have voted at a warned meeting to exempt renewable energy sources from property tax.",
            "System must meet Vermont statutory renewable energy source definitions.",
            "For on-premises private, domestic, or agricultural use, system output generally may not be sold or exchanged to the public except under net metering.",
            "Micro-CHP eligibility is limited to qualifying small net-metering systems."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "taxpayer",
            "municipal_resident"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "agricultural",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_water_heating_system",
            "wind_energy_system",
            "biomass_biogas_energy_system",
            "net_metering_renewable_energy_system",
            "micro_combined_heat_and_power_system"
          ],
          "evidenceText": "Vermont]( statute lets municipalities vote to exempt renewable energy sources, using renewable energy definitions that include solar, wind, methane from organic matter, and net-metering systems.",
          "reasoningNotes": "Solar and biomass matches are valid where a municipality adopts the local option. Broad CHP should be narrowed to qualifying micro-CHP."
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
    }
  ]
}
