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
  "testCaseOrdinal": 18,
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

Packet 18 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 18,
  "sampleUserId": "big-dipper-missoula",
  "description": "Small Missoula ice-cream shop with freezer and refrigeration loads.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "commercial"
      ],
      "primaryActivityText": "Retail ice-cream sales, frozen-product storage, and small-scale food preparation",
      "naicsCodes": [
        "722515",
        "311520"
      ],
      "organizationSize": "1-10 employees"
    },
    "site": {
      "address": {
        "raw": "631 S Higgins Avenue, Missoula, MT 59801, USA",
        "stateCode": "MT",
        "zip5": "59801"
      },
      "geo": {
        "stateCode": "MT",
        "zip5": "59801",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "NorthWestern Energy",
          "distributionUtilityId": "UTIL_NORTHWESTERN",
          "territoryCandidates": [
            "UTIL_NORTHWESTERN"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "restaurant_foodservice"
      ],
      "squareFootage": {
        "value": 2000,
        "raw": "2,000",
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
      "opportunityCount": 6,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:154",
          "opportunityName": "Renewable Energy Systems Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Exemption",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/154/renewable-energy-systems-exemption",
          "applicationUrl": "https://mtrevenue.gov/wp-content/uploads/mdocs/form_ab-14.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic high-efficiency HVAC replacement.",
            "Ground-source heat pump matching should be limited to geothermal machinery or systems that qualify under the alternative energy property rules, not ordinary HVAC efficiency replacement.",
            "Do not match biomass unless it is a qualifying low-emission wood or biomass combustion device or energy system under Montana law."
          ],
          "hardRequirements": [
            "Applicant must file Montana Department of Revenue Form AB-14 for the tax incentive assessment.",
            "System must meet Montana Code Annotated 15-6-224 and implementing rule requirements.",
            "Eligible value is exempt for 10 years after installation, subject to statutory dollar caps.",
            "The system or component must be unique to energy generation or use recognized nonfossil energy generation or qualifying low-emission wood or biomass combustion."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "residential_property_owner",
            "commercial_property_owner",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "wind_energy_system",
            "geothermal_energy_system",
            "low_emission_wood_biomass_combustion_device",
            "biomass_energy_system",
            "solar_water_heating_system",
            "alternative_energy_generation_system"
          ],
          "evidenceText": "Montana’s AB-14 materials and statute provide a 10-year property tax exemption for qualifying recognized nonfossil energy generation and low-emission wood or biomass combustion equipment.",
          "reasoningNotes": "The source supports renewable and alternative energy property, not a broad HVAC rebate. Solar thermal and qualifying biomass are supported; generic high-efficiency HVAC is not."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:978",
          "opportunityName": "Generation Facility Corporate Tax Exemptions",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Exemption",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/978/generation-facility-corporate-tax-exemptions",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, wind, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Ground-source geothermal heat pumps are not electric generation equipment and should not match.",
            "Solar water heating is not eligible unless it is part of solar electric generation equipment covered by the statute.",
            "Facilities of one megawatt or more do not meet the small generation equipment limit."
          ],
          "hardRequirements": [
            "Equipment must be machinery or equipment used in a qualifying electric generation facility.",
            "Generation facility must produce less than one megawatt of electrical energy.",
            "Facility must be powered by an alternative renewable energy source listed in the statute.",
            "Exemption applies for five years after generation begins.",
            "Owner business improvements and ordinary personal property are excluded."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "businesses",
            "generation_facility_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "institutional",
            "government",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "solar_electric_generation_system",
            "small_wind_turbine",
            "geothermal_electric_generation",
            "biomass_biogas_energy_system",
            "fuel_cell_system",
            "small_hydroelectric_generation",
            "landfill_methane_generation"
          ],
          "evidenceText": "Montana statute exempts machinery and equipment in qualifying renewable electric generation facilities under one megawatt for five years, listing solar, wind, geothermal, biomass, fuel cells, hydro, and methane sources.",
          "reasoningNotes": "Biomass is valid when used for electric generation. Replace ground-source heat pump and solar water heating with generation-only geothermal and solar electric categories."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:496",
          "opportunityName": "Corporate Property Tax Reduction for New/Expanded Generating Facilities",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Abatement",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/496/corporate-property-tax-reduction-for-new-expanded-generating-facilities",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a property-tax valuation reduction, not a retrofit rebate or equipment grant.",
            "Do not match battery storage, ground-source heat pumps, solar thermal, solar water heating, or building efficiency measures solely because DSIRE text mentioned generating facilities.",
            "No current official source verified product-specific renewable or efficiency retrofit categories for this tax classification record.",
            "Ordinary equipment replacement without qualifying new or expanded industry property treatment is out of scope."
          ],
          "hardRequirements": [
            "Applicant must qualify as a new or expanding industry under Montana law and meet the applicable investment threshold.",
            "Local government approval is required after notice and hearing before the abatement can apply.",
            "Application and approval timing must satisfy Montana law, including approval before construction or by the first applicable tax-year deadline.",
            "Benefit applies only to the increase in taxable value from qualifying improvements or modernized processes."
          ],
          "eligibleApplicantTypes": [
            "new_or_expanding_industry",
            "business_property_owner",
            "industrial_taxpayer"
          ],
          "eligibleSectors": [
            "industrial",
            "manufacturing",
            "mining",
            "processing",
            "energy_production",
            "commercial"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Montana’s]( current abatement applies to locally approved new or expanding industries and only to taxable-value increases from qualifying improvements or modernized processes.",
          "reasoningNotes": "The low-confidence renewable and heat-pump matches were removed because the official current sources describe industrial property-tax classification, not eligible retrofit technologies."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 6,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:154",
          "opportunityName": "Renewable Energy Systems Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Exemption",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/154/renewable-energy-systems-exemption",
          "applicationUrl": "https://mtrevenue.gov/wp-content/uploads/mdocs/form_ab-14.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic high-efficiency HVAC replacement.",
            "Ground-source heat pump matching should be limited to geothermal machinery or systems that qualify under the alternative energy property rules, not ordinary HVAC efficiency replacement.",
            "Do not match biomass unless it is a qualifying low-emission wood or biomass combustion device or energy system under Montana law."
          ],
          "hardRequirements": [
            "Applicant must file Montana Department of Revenue Form AB-14 for the tax incentive assessment.",
            "System must meet Montana Code Annotated 15-6-224 and implementing rule requirements.",
            "Eligible value is exempt for 10 years after installation, subject to statutory dollar caps.",
            "The system or component must be unique to energy generation or use recognized nonfossil energy generation or qualifying low-emission wood or biomass combustion."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "residential_property_owner",
            "commercial_property_owner",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "wind_energy_system",
            "geothermal_energy_system",
            "low_emission_wood_biomass_combustion_device",
            "biomass_energy_system",
            "solar_water_heating_system",
            "alternative_energy_generation_system"
          ],
          "evidenceText": "Montana’s AB-14 materials and statute provide a 10-year property tax exemption for qualifying recognized nonfossil energy generation and low-emission wood or biomass combustion equipment.",
          "reasoningNotes": "The source supports renewable and alternative energy property, not a broad HVAC rebate. Solar thermal and qualifying biomass are supported; generic high-efficiency HVAC is not."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:978",
          "opportunityName": "Generation Facility Corporate Tax Exemptions",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Exemption",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/978/generation-facility-corporate-tax-exemptions",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, wind, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Ground-source geothermal heat pumps are not electric generation equipment and should not match.",
            "Solar water heating is not eligible unless it is part of solar electric generation equipment covered by the statute.",
            "Facilities of one megawatt or more do not meet the small generation equipment limit."
          ],
          "hardRequirements": [
            "Equipment must be machinery or equipment used in a qualifying electric generation facility.",
            "Generation facility must produce less than one megawatt of electrical energy.",
            "Facility must be powered by an alternative renewable energy source listed in the statute.",
            "Exemption applies for five years after generation begins.",
            "Owner business improvements and ordinary personal property are excluded."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "businesses",
            "generation_facility_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "institutional",
            "government",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "solar_electric_generation_system",
            "small_wind_turbine",
            "geothermal_electric_generation",
            "biomass_biogas_energy_system",
            "fuel_cell_system",
            "small_hydroelectric_generation",
            "landfill_methane_generation"
          ],
          "evidenceText": "Montana statute exempts machinery and equipment in qualifying renewable electric generation facilities under one megawatt for five years, listing solar, wind, geothermal, biomass, fuel cells, hydro, and methane sources.",
          "reasoningNotes": "Biomass is valid when used for electric generation. Replace ground-source heat pump and solar water heating with generation-only geothermal and solar electric categories."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:496",
          "opportunityName": "Corporate Property Tax Reduction for New/Expanded Generating Facilities",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Abatement",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/496/corporate-property-tax-reduction-for-new-expanded-generating-facilities",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a property-tax valuation reduction, not a retrofit rebate or equipment grant.",
            "Do not match battery storage, ground-source heat pumps, solar thermal, solar water heating, or building efficiency measures solely because DSIRE text mentioned generating facilities.",
            "No current official source verified product-specific renewable or efficiency retrofit categories for this tax classification record.",
            "Ordinary equipment replacement without qualifying new or expanded industry property treatment is out of scope."
          ],
          "hardRequirements": [
            "Applicant must qualify as a new or expanding industry under Montana law and meet the applicable investment threshold.",
            "Local government approval is required after notice and hearing before the abatement can apply.",
            "Application and approval timing must satisfy Montana law, including approval before construction or by the first applicable tax-year deadline.",
            "Benefit applies only to the increase in taxable value from qualifying improvements or modernized processes."
          ],
          "eligibleApplicantTypes": [
            "new_or_expanding_industry",
            "business_property_owner",
            "industrial_taxpayer"
          ],
          "eligibleSectors": [
            "industrial",
            "manufacturing",
            "mining",
            "processing",
            "energy_production",
            "commercial"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Montana’s]( current abatement applies to locally approved new or expanding industries and only to taxable-value increases from qualifying improvements or modernized processes.",
          "reasoningNotes": "The low-confidence renewable and heat-pump matches were removed because the official current sources describe industrial property-tax classification, not eligible retrofit technologies."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1158",
          "opportunityName": "Deduction For Energy-Conserving Investment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Deduction",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1158/deduction-for-energy-conserving-investment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, lighting, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a tax deduction, not a rebate or point-of-sale incentive.",
            "Do not force the deduction into specific LED, lighting-control, insulation, or waste-heat categories unless the applicant’s approved capital investment specifically covers that measure.",
            "Routine maintenance and non-capital expenses are out of scope.",
            "Grant-funded costs cannot be matched to the deduction."
          ],
          "hardRequirements": [
            "Investment must be a capital investment in a building for energy-conservation purposes.",
            "Deduction is subject to Montana Department of Revenue approval.",
            "Businesses must be subject to Montana corporate income tax for the DOR business deduction guidance to apply.",
            "Investment financed by state, federal, or private grant funds is excluded.",
            "Providers of conventional or fossil energy are not eligible under DOR guidance."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayer",
            "business_taxpayer",
            "building_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "nonresidential",
            "residential_buildings_owned_by_taxpayer"
          ],
          "eligibleRetrofitCategories": [
            "building_energy_conservation_capital_investment"
          ],
          "evidenceText": "Montana]( law allows a deduction for approved capital investment in a building for energy conservation; DOR guidance applies it to businesses paying Montana corporate income tax.",
          "reasoningNotes": "Specific matched measures were narrowed to a broad approved building energy-conservation capital investment because current official sources did not provide a product-specific eligible-measure list."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "opportunityName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Electric Rebate, Lighting Rebate, And Custom Incentive Program",
          "administrator": "NorthWestern Energy",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1658/northwestern-energy-electric-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Self-reported utility matches NorthWestern Energy.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match heat pump HVAC, heat pump water heater, chiller, or air compressor as prescriptive measures; these were not verified in the current commercial electric forms.",
            "Low-flow fixtures are product-specific aerator, showerhead, and pre-rinse measures and should not be treated as broad water conservation.",
            "Wall insulation and secondary glazing are narrow electric-space-heat measures, not broad building-envelope eligibility.",
            "Commercial electric rebates do not apply to South Dakota, Nebraska, Choice supply, or excluded gas-company customers.",
            "Custom incentive availability does not mean all commercial equipment types are automatically eligible."
          ],
          "hardRequirements": [
            "Applicant must be a NorthWestern Energy Montana commercial electric supply customer.",
            "Choice electric supply customers are not eligible.",
            "Existing-construction electric rebate work and materials must meet the current effective program dates and be submitted on the correct form.",
            "Lighting products must meet ENERGY STAR, DLC, or utility approval rules where required.",
            "Pre-rinse spray valves, aerators, showerheads, pipe insulation, dishwasher, and thermostat measures require NorthWestern electric water heating or electric space heating where stated.",
            "Custom projects require NorthWestern review and approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_electric_customer",
            "business_customer",
            "institutional_customer",
            "industrial_customer",
            "agricultural_customer",
            "multifamily_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls",
            "commercial_kitchen_demand_control_ventilation",
            "high_efficiency_commercial_dishwasher",
            "commercial_clothes_dryer",
            "demand_controlled_ventilation",
            "variable_frequency_drive_retrofit",
            "efficient_motor_replacement",
            "smart_thermostat_zoning_retrofit",
            "pre_rinse_spray_valve",
            "high_efficiency_refrigeration_controls",
            "refrigeration_ecm_fan_motor",
            "refrigerated_case_night_covers",
            "low_flow_fixture_retrofit",
            "commercial_secondary_glazing",
            "wall_cavity_insulation",
            "water_heater_pipe_insulation",
            "commercial_air_curtain",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "NorthWestern commercial electric forms list lighting, controls, VFDs, motors, kitchen ventilation, dishwashers, refrigeration controls, low-flow fixtures, insulation, secondary glazing, and custom projects.",
          "reasoningNotes": "The original match included unsupported HVAC, HPWH, air compressor, and chiller categories. Current forms support commercial electric lighting, controls, motors, VFDs, refrigeration controls, specific water fixtures, and custom incentives."
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
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "programName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selected_measure",
            "unit_count",
            "horsepower",
            "linear_feet",
            "watts_installed",
            "square_feet",
            "electric_water_heating",
            "electric_space_heating",
            "purchase_cost",
            "applicable_heating_or_water_heating_fuel"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_installed",
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
              "inputKey": "electric_water_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electric_space_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "purchase_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicable_heating_or_water_heating_fuel",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1200,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c2fe6ba5535a8165",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 1200,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:154",
          "opportunityName": "Renewable Energy Systems Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Exemption",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/154/renewable-energy-systems-exemption",
          "applicationUrl": "https://mtrevenue.gov/wp-content/uploads/mdocs/form_ab-14.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic high-efficiency HVAC replacement.",
            "Ground-source heat pump matching should be limited to geothermal machinery or systems that qualify under the alternative energy property rules, not ordinary HVAC efficiency replacement.",
            "Do not match biomass unless it is a qualifying low-emission wood or biomass combustion device or energy system under Montana law."
          ],
          "hardRequirements": [
            "Applicant must file Montana Department of Revenue Form AB-14 for the tax incentive assessment.",
            "System must meet Montana Code Annotated 15-6-224 and implementing rule requirements.",
            "Eligible value is exempt for 10 years after installation, subject to statutory dollar caps.",
            "The system or component must be unique to energy generation or use recognized nonfossil energy generation or qualifying low-emission wood or biomass combustion."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "residential_property_owner",
            "commercial_property_owner",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "wind_energy_system",
            "geothermal_energy_system",
            "low_emission_wood_biomass_combustion_device",
            "biomass_energy_system",
            "solar_water_heating_system",
            "alternative_energy_generation_system"
          ],
          "evidenceText": "Montana’s AB-14 materials and statute provide a 10-year property tax exemption for qualifying recognized nonfossil energy generation and low-emission wood or biomass combustion equipment.",
          "reasoningNotes": "The source supports renewable and alternative energy property, not a broad HVAC rebate. Solar thermal and qualifying biomass are supported; generic high-efficiency HVAC is not."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:978",
          "opportunityName": "Generation Facility Corporate Tax Exemptions",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Exemption",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/978/generation-facility-corporate-tax-exemptions",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, wind, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Ground-source geothermal heat pumps are not electric generation equipment and should not match.",
            "Solar water heating is not eligible unless it is part of solar electric generation equipment covered by the statute.",
            "Facilities of one megawatt or more do not meet the small generation equipment limit."
          ],
          "hardRequirements": [
            "Equipment must be machinery or equipment used in a qualifying electric generation facility.",
            "Generation facility must produce less than one megawatt of electrical energy.",
            "Facility must be powered by an alternative renewable energy source listed in the statute.",
            "Exemption applies for five years after generation begins.",
            "Owner business improvements and ordinary personal property are excluded."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "businesses",
            "generation_facility_owners"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "institutional",
            "government",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "solar_electric_generation_system",
            "small_wind_turbine",
            "geothermal_electric_generation",
            "biomass_biogas_energy_system",
            "fuel_cell_system",
            "small_hydroelectric_generation",
            "landfill_methane_generation"
          ],
          "evidenceText": "Montana statute exempts machinery and equipment in qualifying renewable electric generation facilities under one megawatt for five years, listing solar, wind, geothermal, biomass, fuel cells, hydro, and methane sources.",
          "reasoningNotes": "Biomass is valid when used for electric generation. Replace ground-source heat pump and solar water heating with generation-only geothermal and solar electric categories."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:496",
          "opportunityName": "Corporate Property Tax Reduction for New/Expanded Generating Facilities",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Abatement",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/496/corporate-property-tax-reduction-for-new-expanded-generating-facilities",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a property-tax valuation reduction, not a retrofit rebate or equipment grant.",
            "Do not match battery storage, ground-source heat pumps, solar thermal, solar water heating, or building efficiency measures solely because DSIRE text mentioned generating facilities.",
            "No current official source verified product-specific renewable or efficiency retrofit categories for this tax classification record.",
            "Ordinary equipment replacement without qualifying new or expanded industry property treatment is out of scope."
          ],
          "hardRequirements": [
            "Applicant must qualify as a new or expanding industry under Montana law and meet the applicable investment threshold.",
            "Local government approval is required after notice and hearing before the abatement can apply.",
            "Application and approval timing must satisfy Montana law, including approval before construction or by the first applicable tax-year deadline.",
            "Benefit applies only to the increase in taxable value from qualifying improvements or modernized processes."
          ],
          "eligibleApplicantTypes": [
            "new_or_expanding_industry",
            "business_property_owner",
            "industrial_taxpayer"
          ],
          "eligibleSectors": [
            "industrial",
            "manufacturing",
            "mining",
            "processing",
            "energy_production",
            "commercial"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Montana’s]( current abatement applies to locally approved new or expanding industries and only to taxable-value increases from qualifying improvements or modernized processes.",
          "reasoningNotes": "The low-confidence renewable and heat-pump matches were removed because the official current sources describe industrial property-tax classification, not eligible retrofit technologies."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:154",
          "opportunityName": "Renewable Energy Systems Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Exemption",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/154/renewable-energy-systems-exemption",
          "applicationUrl": "https://mtrevenue.gov/wp-content/uploads/mdocs/form_ab-14.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match generic high-efficiency HVAC replacement.",
            "Ground-source heat pump matching should be limited to geothermal machinery or systems that qualify under the alternative energy property rules, not ordinary HVAC efficiency replacement.",
            "Do not match biomass unless it is a qualifying low-emission wood or biomass combustion device or energy system under Montana law."
          ],
          "hardRequirements": [
            "Applicant must file Montana Department of Revenue Form AB-14 for the tax incentive assessment.",
            "System must meet Montana Code Annotated 15-6-224 and implementing rule requirements.",
            "Eligible value is exempt for 10 years after installation, subject to statutory dollar caps.",
            "The system or component must be unique to energy generation or use recognized nonfossil energy generation or qualifying low-emission wood or biomass combustion."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "residential_property_owner",
            "commercial_property_owner",
            "multifamily_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "wind_energy_system",
            "geothermal_energy_system",
            "low_emission_wood_biomass_combustion_device",
            "biomass_energy_system",
            "solar_water_heating_system",
            "alternative_energy_generation_system"
          ],
          "evidenceText": "Montana’s AB-14 materials and statute provide a 10-year property tax exemption for qualifying recognized nonfossil energy generation and low-emission wood or biomass combustion equipment.",
          "reasoningNotes": "The source supports renewable and alternative energy property, not a broad HVAC rebate. Solar thermal and qualifying biomass are supported; generic high-efficiency HVAC is not."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:496",
          "opportunityName": "Corporate Property Tax Reduction for New/Expanded Generating Facilities",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Abatement",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/496/corporate-property-tax-reduction-for-new-expanded-generating-facilities",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a property-tax valuation reduction, not a retrofit rebate or equipment grant.",
            "Do not match battery storage, ground-source heat pumps, solar thermal, solar water heating, or building efficiency measures solely because DSIRE text mentioned generating facilities.",
            "No current official source verified product-specific renewable or efficiency retrofit categories for this tax classification record.",
            "Ordinary equipment replacement without qualifying new or expanded industry property treatment is out of scope."
          ],
          "hardRequirements": [
            "Applicant must qualify as a new or expanding industry under Montana law and meet the applicable investment threshold.",
            "Local government approval is required after notice and hearing before the abatement can apply.",
            "Application and approval timing must satisfy Montana law, including approval before construction or by the first applicable tax-year deadline.",
            "Benefit applies only to the increase in taxable value from qualifying improvements or modernized processes."
          ],
          "eligibleApplicantTypes": [
            "new_or_expanding_industry",
            "business_property_owner",
            "industrial_taxpayer"
          ],
          "eligibleSectors": [
            "industrial",
            "manufacturing",
            "mining",
            "processing",
            "energy_production",
            "commercial"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "Montana’s]( current abatement applies to locally approved new or expanding industries and only to taxable-value increases from qualifying improvements or modernized processes.",
          "reasoningNotes": "The low-confidence renewable and heat-pump matches were removed because the official current sources describe industrial property-tax classification, not eligible retrofit technologies."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22653",
          "opportunityName": "Montana Commercial PACE Financing Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "C Pace Financing",
          "administrator": "Montana Facility Finance Authority",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22653/montana-commercial-pace-financing-program",
          "applicationUrl": "https://mt.accessgov.com/montanacommerce/Forms/Page/montanacommerce/mffa-cpace-application/0",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match one-to-four-unit residential property, residential condominiums, HOA or condo association property, or government-owned property.",
            "Do not present as a rebate; it is private financing repaid by assessment.",
            "Do not match projects outside jurisdictions that have established C-PACE districts.",
            "Battery storage is eligible as a resiliency measure, not as an unrestricted consumer battery rebate."
          ],
          "hardRequirements": [
            "Eligible property must be privately owned commercial, industrial, agricultural, nonprofit, or multifamily with five or more units.",
            "Property must be on tax rolls in a jurisdiction with a C-PACE district.",
            "Property taxes must be current and the owner must not be in bankruptcy.",
            "Improvements must be permanently fixed to the property and meet program guidelines.",
            "Senior lender consent is required when applicable."
          ],
          "eligibleApplicantTypes": [
            "individual_property_owner",
            "business_entity",
            "nonprofit_organization"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "multifamily_5_plus",
            "agricultural",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "energy_efficiency_upgrade",
            "water_conservation",
            "renewable_energy_system",
            "resiliency_improvement",
            "insulation",
            "storm_windows_doors",
            "building_controls",
            "high_efficiency_hvac_replacement",
            "air_sealing",
            "led_lighting_retrofit",
            "energy_recovery",
            "ev_charging_make_ready",
            "water_efficiency",
            "combined_heat_power",
            "solar_photovoltaic",
            "solar_thermal",
            "geothermal_heat_pump",
            "small_wind",
            "microgrid"
          ],
          "evidenceText": "Montana's]( C-PACE guidelines list privately owned commercial, industrial, agricultural, and 5+ multifamily properties and include battery storage under resiliency and public-safety improvements.",
          "reasoningNotes": "The battery match is supported, but only within commercial PACE eligibility and permanent property-improvement rules."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1158",
          "opportunityName": "Deduction For Energy-Conserving Investment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Deduction",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1158/deduction-for-energy-conserving-investment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, lighting, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a tax deduction, not a rebate or point-of-sale incentive.",
            "Do not force the deduction into specific LED, lighting-control, insulation, or waste-heat categories unless the applicant’s approved capital investment specifically covers that measure.",
            "Routine maintenance and non-capital expenses are out of scope.",
            "Grant-funded costs cannot be matched to the deduction."
          ],
          "hardRequirements": [
            "Investment must be a capital investment in a building for energy-conservation purposes.",
            "Deduction is subject to Montana Department of Revenue approval.",
            "Businesses must be subject to Montana corporate income tax for the DOR business deduction guidance to apply.",
            "Investment financed by state, federal, or private grant funds is excluded.",
            "Providers of conventional or fossil energy are not eligible under DOR guidance."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayer",
            "business_taxpayer",
            "building_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "nonresidential",
            "residential_buildings_owned_by_taxpayer"
          ],
          "eligibleRetrofitCategories": [
            "building_energy_conservation_capital_investment"
          ],
          "evidenceText": "Montana]( law allows a deduction for approved capital investment in a building for energy conservation; DOR guidance applies it to businesses paying Montana corporate income tax.",
          "reasoningNotes": "Specific matched measures were narrowed to a broad approved building energy-conservation capital investment because current official sources did not provide a product-specific eligible-measure list."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "opportunityName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Electric Rebate, Lighting Rebate, And Custom Incentive Program",
          "administrator": "NorthWestern Energy",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1658/northwestern-energy-electric-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Self-reported utility matches NorthWestern Energy.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match heat pump HVAC, heat pump water heater, chiller, or air compressor as prescriptive measures; these were not verified in the current commercial electric forms.",
            "Low-flow fixtures are product-specific aerator, showerhead, and pre-rinse measures and should not be treated as broad water conservation.",
            "Wall insulation and secondary glazing are narrow electric-space-heat measures, not broad building-envelope eligibility.",
            "Commercial electric rebates do not apply to South Dakota, Nebraska, Choice supply, or excluded gas-company customers.",
            "Custom incentive availability does not mean all commercial equipment types are automatically eligible."
          ],
          "hardRequirements": [
            "Applicant must be a NorthWestern Energy Montana commercial electric supply customer.",
            "Choice electric supply customers are not eligible.",
            "Existing-construction electric rebate work and materials must meet the current effective program dates and be submitted on the correct form.",
            "Lighting products must meet ENERGY STAR, DLC, or utility approval rules where required.",
            "Pre-rinse spray valves, aerators, showerheads, pipe insulation, dishwasher, and thermostat measures require NorthWestern electric water heating or electric space heating where stated.",
            "Custom projects require NorthWestern review and approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_electric_customer",
            "business_customer",
            "institutional_customer",
            "industrial_customer",
            "agricultural_customer",
            "multifamily_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls",
            "commercial_kitchen_demand_control_ventilation",
            "high_efficiency_commercial_dishwasher",
            "commercial_clothes_dryer",
            "demand_controlled_ventilation",
            "variable_frequency_drive_retrofit",
            "efficient_motor_replacement",
            "smart_thermostat_zoning_retrofit",
            "pre_rinse_spray_valve",
            "high_efficiency_refrigeration_controls",
            "refrigeration_ecm_fan_motor",
            "refrigerated_case_night_covers",
            "low_flow_fixture_retrofit",
            "commercial_secondary_glazing",
            "wall_cavity_insulation",
            "water_heater_pipe_insulation",
            "commercial_air_curtain",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "NorthWestern commercial electric forms list lighting, controls, VFDs, motors, kitchen ventilation, dishwashers, refrigeration controls, low-flow fixtures, insulation, secondary glazing, and custom projects.",
          "reasoningNotes": "The original match included unsupported HVAC, HPWH, air compressor, and chiller categories. Current forms support commercial electric lighting, controls, motors, VFDs, refrigeration controls, specific water fixtures, and custom incentives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "programName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selected_measure",
            "unit_count",
            "horsepower",
            "linear_feet",
            "watts_installed",
            "square_feet",
            "electric_water_heating",
            "electric_space_heating",
            "purchase_cost",
            "applicable_heating_or_water_heating_fuel"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_installed",
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
              "inputKey": "electric_water_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electric_space_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "purchase_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicable_heating_or_water_heating_fuel",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 100,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c2fe6ba5535a8165",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 100,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "opportunityName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Electric Rebate, Lighting Rebate, And Custom Incentive Program",
          "administrator": "NorthWestern Energy",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1658/northwestern-energy-electric-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Self-reported utility matches NorthWestern Energy.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match heat pump HVAC, heat pump water heater, chiller, or air compressor as prescriptive measures; these were not verified in the current commercial electric forms.",
            "Low-flow fixtures are product-specific aerator, showerhead, and pre-rinse measures and should not be treated as broad water conservation.",
            "Wall insulation and secondary glazing are narrow electric-space-heat measures, not broad building-envelope eligibility.",
            "Commercial electric rebates do not apply to South Dakota, Nebraska, Choice supply, or excluded gas-company customers.",
            "Custom incentive availability does not mean all commercial equipment types are automatically eligible."
          ],
          "hardRequirements": [
            "Applicant must be a NorthWestern Energy Montana commercial electric supply customer.",
            "Choice electric supply customers are not eligible.",
            "Existing-construction electric rebate work and materials must meet the current effective program dates and be submitted on the correct form.",
            "Lighting products must meet ENERGY STAR, DLC, or utility approval rules where required.",
            "Pre-rinse spray valves, aerators, showerheads, pipe insulation, dishwasher, and thermostat measures require NorthWestern electric water heating or electric space heating where stated.",
            "Custom projects require NorthWestern review and approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_electric_customer",
            "business_customer",
            "institutional_customer",
            "industrial_customer",
            "agricultural_customer",
            "multifamily_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls",
            "commercial_kitchen_demand_control_ventilation",
            "high_efficiency_commercial_dishwasher",
            "commercial_clothes_dryer",
            "demand_controlled_ventilation",
            "variable_frequency_drive_retrofit",
            "efficient_motor_replacement",
            "smart_thermostat_zoning_retrofit",
            "pre_rinse_spray_valve",
            "high_efficiency_refrigeration_controls",
            "refrigeration_ecm_fan_motor",
            "refrigerated_case_night_covers",
            "low_flow_fixture_retrofit",
            "commercial_secondary_glazing",
            "wall_cavity_insulation",
            "water_heater_pipe_insulation",
            "commercial_air_curtain",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "NorthWestern commercial electric forms list lighting, controls, VFDs, motors, kitchen ventilation, dishwashers, refrigeration controls, low-flow fixtures, insulation, secondary glazing, and custom projects.",
          "reasoningNotes": "The original match included unsupported HVAC, HPWH, air compressor, and chiller categories. Current forms support commercial electric lighting, controls, motors, VFDs, refrigeration controls, specific water fixtures, and custom incentives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "programName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selected_measure",
            "unit_count",
            "horsepower",
            "linear_feet",
            "watts_installed",
            "square_feet",
            "electric_water_heating",
            "electric_space_heating",
            "purchase_cost",
            "applicable_heating_or_water_heating_fuel"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_installed",
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
              "inputKey": "electric_water_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electric_space_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "purchase_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicable_heating_or_water_heating_fuel",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 100,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c2fe6ba5535a8165",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 100,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "opportunityName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Electric Rebate, Lighting Rebate, And Custom Incentive Program",
          "administrator": "NorthWestern Energy",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1658/northwestern-energy-electric-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Self-reported utility matches NorthWestern Energy.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match heat pump HVAC, heat pump water heater, chiller, or air compressor as prescriptive measures; these were not verified in the current commercial electric forms.",
            "Low-flow fixtures are product-specific aerator, showerhead, and pre-rinse measures and should not be treated as broad water conservation.",
            "Wall insulation and secondary glazing are narrow electric-space-heat measures, not broad building-envelope eligibility.",
            "Commercial electric rebates do not apply to South Dakota, Nebraska, Choice supply, or excluded gas-company customers.",
            "Custom incentive availability does not mean all commercial equipment types are automatically eligible."
          ],
          "hardRequirements": [
            "Applicant must be a NorthWestern Energy Montana commercial electric supply customer.",
            "Choice electric supply customers are not eligible.",
            "Existing-construction electric rebate work and materials must meet the current effective program dates and be submitted on the correct form.",
            "Lighting products must meet ENERGY STAR, DLC, or utility approval rules where required.",
            "Pre-rinse spray valves, aerators, showerheads, pipe insulation, dishwasher, and thermostat measures require NorthWestern electric water heating or electric space heating where stated.",
            "Custom projects require NorthWestern review and approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_electric_customer",
            "business_customer",
            "institutional_customer",
            "industrial_customer",
            "agricultural_customer",
            "multifamily_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls",
            "commercial_kitchen_demand_control_ventilation",
            "high_efficiency_commercial_dishwasher",
            "commercial_clothes_dryer",
            "demand_controlled_ventilation",
            "variable_frequency_drive_retrofit",
            "efficient_motor_replacement",
            "smart_thermostat_zoning_retrofit",
            "pre_rinse_spray_valve",
            "high_efficiency_refrigeration_controls",
            "refrigeration_ecm_fan_motor",
            "refrigerated_case_night_covers",
            "low_flow_fixture_retrofit",
            "commercial_secondary_glazing",
            "wall_cavity_insulation",
            "water_heater_pipe_insulation",
            "commercial_air_curtain",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "NorthWestern commercial electric forms list lighting, controls, VFDs, motors, kitchen ventilation, dishwashers, refrigeration controls, low-flow fixtures, insulation, secondary glazing, and custom projects.",
          "reasoningNotes": "The original match included unsupported HVAC, HPWH, air compressor, and chiller categories. Current forms support commercial electric lighting, controls, motors, VFDs, refrigeration controls, specific water fixtures, and custom incentives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "programName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selected_measure",
            "unit_count",
            "horsepower",
            "linear_feet",
            "watts_installed",
            "square_feet",
            "electric_water_heating",
            "electric_space_heating",
            "purchase_cost",
            "applicable_heating_or_water_heating_fuel"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_installed",
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
              "inputKey": "electric_water_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electric_space_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "purchase_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicable_heating_or_water_heating_fuel",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 100,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c2fe6ba5535a8165",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 100,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1158",
          "opportunityName": "Deduction For Energy-Conserving Investment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Deduction",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1158/deduction-for-energy-conserving-investment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, lighting, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a tax deduction, not a rebate or point-of-sale incentive.",
            "Do not force the deduction into specific LED, lighting-control, insulation, or waste-heat categories unless the applicant’s approved capital investment specifically covers that measure.",
            "Routine maintenance and non-capital expenses are out of scope.",
            "Grant-funded costs cannot be matched to the deduction."
          ],
          "hardRequirements": [
            "Investment must be a capital investment in a building for energy-conservation purposes.",
            "Deduction is subject to Montana Department of Revenue approval.",
            "Businesses must be subject to Montana corporate income tax for the DOR business deduction guidance to apply.",
            "Investment financed by state, federal, or private grant funds is excluded.",
            "Providers of conventional or fossil energy are not eligible under DOR guidance."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayer",
            "business_taxpayer",
            "building_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "nonresidential",
            "residential_buildings_owned_by_taxpayer"
          ],
          "eligibleRetrofitCategories": [
            "building_energy_conservation_capital_investment"
          ],
          "evidenceText": "Montana]( law allows a deduction for approved capital investment in a building for energy conservation; DOR guidance applies it to businesses paying Montana corporate income tax.",
          "reasoningNotes": "Specific matched measures were narrowed to a broad approved building energy-conservation capital investment because current official sources did not provide a product-specific eligible-measure list."
        }
      ],
      "v2PackageSummaries": []
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
    },
    {
      "retrofitTypeId": "variable_frequency_drive_retrofit",
      "displayName": "Variable frequency drive retrofit",
      "parentCategory": "motors_pumps_fans_drives",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 212000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "opportunityName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Electric Rebate, Lighting Rebate, And Custom Incentive Program",
          "administrator": "NorthWestern Energy",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1658/northwestern-energy-electric-commercial-energy-efficiency-rebate-program",
          "applicationUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Self-reported utility matches NorthWestern Energy.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, refrigeration, water_efficiency, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match heat pump HVAC, heat pump water heater, chiller, or air compressor as prescriptive measures; these were not verified in the current commercial electric forms.",
            "Low-flow fixtures are product-specific aerator, showerhead, and pre-rinse measures and should not be treated as broad water conservation.",
            "Wall insulation and secondary glazing are narrow electric-space-heat measures, not broad building-envelope eligibility.",
            "Commercial electric rebates do not apply to South Dakota, Nebraska, Choice supply, or excluded gas-company customers.",
            "Custom incentive availability does not mean all commercial equipment types are automatically eligible."
          ],
          "hardRequirements": [
            "Applicant must be a NorthWestern Energy Montana commercial electric supply customer.",
            "Choice electric supply customers are not eligible.",
            "Existing-construction electric rebate work and materials must meet the current effective program dates and be submitted on the correct form.",
            "Lighting products must meet ENERGY STAR, DLC, or utility approval rules where required.",
            "Pre-rinse spray valves, aerators, showerheads, pipe insulation, dishwasher, and thermostat measures require NorthWestern electric water heating or electric space heating where stated.",
            "Custom projects require NorthWestern review and approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_electric_customer",
            "business_customer",
            "institutional_customer",
            "industrial_customer",
            "agricultural_customer",
            "multifamily_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "multifamily_residential"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls",
            "commercial_kitchen_demand_control_ventilation",
            "high_efficiency_commercial_dishwasher",
            "commercial_clothes_dryer",
            "demand_controlled_ventilation",
            "variable_frequency_drive_retrofit",
            "efficient_motor_replacement",
            "smart_thermostat_zoning_retrofit",
            "pre_rinse_spray_valve",
            "high_efficiency_refrigeration_controls",
            "refrigeration_ecm_fan_motor",
            "refrigerated_case_night_covers",
            "low_flow_fixture_retrofit",
            "commercial_secondary_glazing",
            "wall_cavity_insulation",
            "water_heater_pipe_insulation",
            "commercial_air_curtain",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "NorthWestern commercial electric forms list lighting, controls, VFDs, motors, kitchen ventilation, dishwashers, refrigeration controls, low-flow fixtures, insulation, secondary glazing, and custom projects.",
          "reasoningNotes": "The original match included unsupported HVAC, HPWH, air compressor, and chiller categories. Current forms support commercial electric lighting, controls, motors, VFDs, refrigeration controls, specific water fixtures, and custom incentives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
          "programName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "selected_measure",
            "unit_count",
            "horsepower",
            "linear_feet",
            "watts_installed",
            "square_feet",
            "electric_water_heating",
            "electric_space_heating",
            "purchase_cost",
            "applicable_heating_or_water_heating_fuel"
          ],
          "defaultedInputs": [
            {
              "inputKey": "selected_measure",
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
              "inputKey": "linear_feet",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "watts_installed",
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
              "inputKey": "electric_water_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electric_space_heating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "purchase_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicable_heating_or_water_heating_fuel",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 100,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_c2fe6ba5535a8165",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 100,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1158",
          "opportunityName": "Deduction For Energy-Conserving Investment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Tax Deduction",
          "administrator": "Montana Department of Revenue",
          "state": "MT",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1158/deduction-for-energy-conserving-investment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MT matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, lighting, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a tax deduction, not a rebate or point-of-sale incentive.",
            "Do not force the deduction into specific LED, lighting-control, insulation, or waste-heat categories unless the applicant’s approved capital investment specifically covers that measure.",
            "Routine maintenance and non-capital expenses are out of scope.",
            "Grant-funded costs cannot be matched to the deduction."
          ],
          "hardRequirements": [
            "Investment must be a capital investment in a building for energy-conservation purposes.",
            "Deduction is subject to Montana Department of Revenue approval.",
            "Businesses must be subject to Montana corporate income tax for the DOR business deduction guidance to apply.",
            "Investment financed by state, federal, or private grant funds is excluded.",
            "Providers of conventional or fossil energy are not eligible under DOR guidance."
          ],
          "eligibleApplicantTypes": [
            "corporate_taxpayer",
            "business_taxpayer",
            "building_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "nonresidential",
            "residential_buildings_owned_by_taxpayer"
          ],
          "eligibleRetrofitCategories": [
            "building_energy_conservation_capital_investment"
          ],
          "evidenceText": "Montana]( law allows a deduction for approved capital investment in a building for energy conservation; DOR guidance applies it to businesses paying Montana corporate income tax.",
          "reasoningNotes": "Specific matched measures were narrowed to a broad approved building energy-conservation capital investment because current official sources did not provide a product-specific eligible-measure list."
        }
      ],
      "v2PackageSummaries": []
    }
  ]
}
