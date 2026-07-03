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
  "testCaseOrdinal": 22,
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

Packet 22 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 22,
  "sampleUserId": "food-bank-rockies-aurora-dc",
  "description": "Aurora nonprofit food distribution center with cold storage, fleet, warehouse, and solar/storage potential.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "nonprofit"
      ],
      "primaryActivityText": "Food storage, cold storage, regional distribution, volunteer operations, and fleet logistics",
      "naicsCodes": [
        "624210",
        "493120",
        "493110"
      ],
      "organizationSize": "51-250 employees"
    },
    "site": {
      "address": {
        "raw": "20600 E 38th Avenue, Aurora, CO 80019, USA",
        "stateCode": "CO",
        "zip5": "20600"
      },
      "geo": {
        "stateCode": "CO",
        "zip5": "20600",
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
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "warehouse_logistics"
      ],
      "squareFootage": {
        "value": 270000,
        "raw": "270,000",
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
    "eligible": 15,
    "ineligible": 1504
  },
  "retrofitCount": 31,
  "retrofits": [
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 7,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Poudre Valley REA",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, ev_charging, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
            "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
            "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
            "DC fast charging is limited to public-use eligible projects with review."
          ],
          "hardRequirements": [
            "Applicant must be a PVREA member receiving electric service.",
            "Rebate applications must generally be submitted within 90 days of purchase or installation.",
            "EV chargers must be new, permanently installed, and meet program documentation requirements.",
            "DC fast charger incentives require public access and case-by-case program review."
          ],
          "eligibleApplicantTypes": [
            "cooperative_members",
            "residential_customers",
            "commercial_customers",
            "industrial_customers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "electric_water_heater",
            "smart_thermostat_zoning_retrofit",
            "line_voltage_thermostat",
            "induction_cooking_equipment",
            "heat_pump_clothes_dryer",
            "refrigerator_freezer_recycling",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation",
            "variable_frequency_drive_retrofit",
            "high_efficiency_motor_replacement",
            "electric_forklift_pallet_jack"
          ],
          "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
          "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2388",
          "opportunityName": "Renewable Energy Property Tax Assessment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Colorado Division of Property Taxation",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2388/renewable-energy-property-tax-assessment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, wind, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match ground-source geothermal heat pumps; the current official source addresses geothermal energy facilities for assessment, not building HVAC heat pumps.",
            "Do not treat this as a rebate or grant.",
            "Do not generalize local renewable property tax incentives statewide."
          ],
          "hardRequirements": [
            "Renewable and clean energy facilities are assessed under Colorado property tax rules, with separate treatment for locally assessed and state assessed facilities.",
            "Residential renewable energy personal property exemption applies only to qualifying residential-owner systems and independently owned residential PV within the statutory capacity limit.",
            "Local incentives must be verified separately because the state source states there is no statewide property tax incentive beyond assessment and exemption treatment."
          ],
          "eligibleApplicantTypes": [
            "property owners",
            "renewable energy facility owners",
            "residential renewable system owners",
            "taxpayers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "utility",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_generation_facility",
            "wind_energy_facility",
            "small_hydroelectric_facility",
            "biomass_energy_facility",
            "geothermal_electric_generation_facility",
            "residential_renewable_energy_personal_property_exemption"
          ],
          "evidenceText": "Colorado's]( property tax source describes renewable and clean energy assessment rules and a residential renewable energy personal property exemption, while stating Colorado does not have statewide property tax incentives for renewable energy.",
          "reasoningNotes": "Kept generation-facility categories supported by assessment guidance and removed geothermal heat pump matching."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2502",
          "opportunityName": "Local Option - Sales and Use Tax Exemption for Renewable Energy Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Tax Incentive",
          "administrator": "Colorado counties and municipalities",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2502/local-option-sales-and-use-tax-exemption-for-renewable-energy-systems",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "low_flow_fixture_retrofit is a false positive; fixture means renewable energy fixture, not a plumbing fixture.",
            "Do not match water-conservation, low-flow plumbing, or ordinary building fixtures.",
            "Do not assume a statewide point-of-sale exemption; availability and process depend on the local government."
          ],
          "hardRequirements": [
            "A local government must adopt the property or sales tax credit or rebate.",
            "The renewable energy fixture must be installed behind the meter of a residential or commercial building.",
            "The fixture must produce energy from renewable resources under the Colorado statutory definition."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_thermal_energy_system",
            "small_wind_turbine",
            "biomass_biogas_energy_system",
            "geothermal_energy_system"
          ],
          "evidenceText": "Colorado statutes authorize local property or sales tax credits or rebates for residential or commercial owners installing behind-the-meter renewable energy fixtures such as PV, solar thermal, wind, biomass and geothermal.",
          "reasoningNotes": "The original low-flow fixture match was a terminology collision and should be blocked."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "programName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "quantity",
            "eligible_cost",
            "heat_pump_tons",
            "new_or_replacement_ground_source",
            "ev_charger_type",
            "dcfc_power_kw",
            "managed_charging_or_tou_status",
            "public_access_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "dcfc_power_kw",
              "source": "safe_placeholder_default",
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
              "inputKey": "heat_pump_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_or_replacement_ground_source",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "managed_charging_or_tou_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 35000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_4238678a453e7a91",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 35000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 5,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2388",
          "opportunityName": "Renewable Energy Property Tax Assessment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Colorado Division of Property Taxation",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2388/renewable-energy-property-tax-assessment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, wind, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match ground-source geothermal heat pumps; the current official source addresses geothermal energy facilities for assessment, not building HVAC heat pumps.",
            "Do not treat this as a rebate or grant.",
            "Do not generalize local renewable property tax incentives statewide."
          ],
          "hardRequirements": [
            "Renewable and clean energy facilities are assessed under Colorado property tax rules, with separate treatment for locally assessed and state assessed facilities.",
            "Residential renewable energy personal property exemption applies only to qualifying residential-owner systems and independently owned residential PV within the statutory capacity limit.",
            "Local incentives must be verified separately because the state source states there is no statewide property tax incentive beyond assessment and exemption treatment."
          ],
          "eligibleApplicantTypes": [
            "property owners",
            "renewable energy facility owners",
            "residential renewable system owners",
            "taxpayers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "utility",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_generation_facility",
            "wind_energy_facility",
            "small_hydroelectric_facility",
            "biomass_energy_facility",
            "geothermal_electric_generation_facility",
            "residential_renewable_energy_personal_property_exemption"
          ],
          "evidenceText": "Colorado's]( property tax source describes renewable and clean energy assessment rules and a residential renewable energy personal property exemption, while stating Colorado does not have statewide property tax incentives for renewable energy.",
          "reasoningNotes": "Kept generation-facility categories supported by assessment guidance and removed geothermal heat pump matching."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2502",
          "opportunityName": "Local Option - Sales and Use Tax Exemption for Renewable Energy Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Tax Incentive",
          "administrator": "Colorado counties and municipalities",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2502/local-option-sales-and-use-tax-exemption-for-renewable-energy-systems",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "low_flow_fixture_retrofit is a false positive; fixture means renewable energy fixture, not a plumbing fixture.",
            "Do not match water-conservation, low-flow plumbing, or ordinary building fixtures.",
            "Do not assume a statewide point-of-sale exemption; availability and process depend on the local government."
          ],
          "hardRequirements": [
            "A local government must adopt the property or sales tax credit or rebate.",
            "The renewable energy fixture must be installed behind the meter of a residential or commercial building.",
            "The fixture must produce energy from renewable resources under the Colorado statutory definition."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_thermal_energy_system",
            "small_wind_turbine",
            "biomass_biogas_energy_system",
            "geothermal_energy_system"
          ],
          "evidenceText": "Colorado statutes authorize local property or sales tax credits or rebates for residential or commercial owners installing behind-the-meter renewable energy fixtures such as PV, solar thermal, wind, biomass and geothermal.",
          "reasoningNotes": "The original low-flow fixture match was a terminology collision and should be blocked."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Poudre Valley REA",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, ev_charging, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
            "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
            "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
            "DC fast charging is limited to public-use eligible projects with review."
          ],
          "hardRequirements": [
            "Applicant must be a PVREA member receiving electric service.",
            "Rebate applications must generally be submitted within 90 days of purchase or installation.",
            "EV chargers must be new, permanently installed, and meet program documentation requirements.",
            "DC fast charger incentives require public access and case-by-case program review."
          ],
          "eligibleApplicantTypes": [
            "cooperative_members",
            "residential_customers",
            "commercial_customers",
            "industrial_customers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "electric_water_heater",
            "smart_thermostat_zoning_retrofit",
            "line_voltage_thermostat",
            "induction_cooking_equipment",
            "heat_pump_clothes_dryer",
            "refrigerator_freezer_recycling",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation",
            "variable_frequency_drive_retrofit",
            "high_efficiency_motor_replacement",
            "electric_forklift_pallet_jack"
          ],
          "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
          "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22160",
          "opportunityName": "Electric Vehicle Fast-Charging Plazas Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Colorado Energy Office",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program",
          "applicationUrl": "https://socgov27.my.site.com/CEOEVGrants/s/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: fleet_electrification, ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Private residential EV chargers are not eligible.",
            "Level 2-only charging projects are not supported by the fast-charging plaza program.",
            "Battery storage unrelated to EV charging is not supported.",
            "The official Colorado Energy Office program page was difficult to access directly, so current round details should be confirmed through the state portal."
          ],
          "hardRequirements": [
            "Project must be a public DC fast-charging plaza in Colorado.",
            "Grant funding is for eligible project costs and may require applicant cost share.",
            "Awardees must maintain continuous public use for the required term.",
            "Current rounds may require multiple charging ports and high-power DC fast charging capability.",
            "Battery storage is eligible only when tied to the EV fast-charging plaza project."
          ],
          "eligibleApplicantTypes": [
            "business",
            "government_entity",
            "public_institution",
            "tribal_government",
            "nonprofit_organization"
          ],
          "eligibleSectors": [
            "commercial",
            "government",
            "tribal",
            "nonprofit",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "dc_fast_charger_installation",
            "public_ev_charging_plaza",
            "battery_storage_for_ev_charging"
          ],
          "evidenceText": "Colorado sources describe grants for public DC fast-charging plazas, with priority locations and cost-share funding; related state portals handle applications.",
          "reasoningNotes": "The EV charger installation match is correct only when narrowed to public DC fast-charging plazas, not general EV charger installation."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "programName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "quantity",
            "eligible_cost",
            "heat_pump_tons",
            "new_or_replacement_ground_source",
            "ev_charger_type",
            "dcfc_power_kw",
            "managed_charging_or_tou_status",
            "public_access_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heat_pump_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_or_replacement_ground_source",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "managed_charging_or_tou_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_status",
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
              "effectId": "effect_one_time_savings_1_4238678a453e7a91",
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
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22160",
          "programName": "Electric Vehicle Fast-Charging Plazas Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "low_confidence",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_project_cost",
            "site_location",
            "number_of_dc_fast_charging_ports",
            "charger_power_rating",
            "public_access_commitment",
            "application_score_or_award_decision",
            "award_decision",
            "current_round_per_site_cap"
          ],
          "defaultedInputs": [
            {
              "inputKey": "site_location",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "number_of_dc_fast_charging_ports",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_power_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_commitment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "application_score_or_award_decision",
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
              "inputKey": "current_round_per_site_cap",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 48000000,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_grant_expected_value_1_f3f277efefdea00d",
              "effectType": "grant_expected_value",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "competitive_cost_share",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 48000000,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Poudre Valley REA",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, ev_charging, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
            "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
            "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
            "DC fast charging is limited to public-use eligible projects with review."
          ],
          "hardRequirements": [
            "Applicant must be a PVREA member receiving electric service.",
            "Rebate applications must generally be submitted within 90 days of purchase or installation.",
            "EV chargers must be new, permanently installed, and meet program documentation requirements.",
            "DC fast charger incentives require public access and case-by-case program review."
          ],
          "eligibleApplicantTypes": [
            "cooperative_members",
            "residential_customers",
            "commercial_customers",
            "industrial_customers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "electric_water_heater",
            "smart_thermostat_zoning_retrofit",
            "line_voltage_thermostat",
            "induction_cooking_equipment",
            "heat_pump_clothes_dryer",
            "refrigerator_freezer_recycling",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation",
            "variable_frequency_drive_retrofit",
            "high_efficiency_motor_replacement",
            "electric_forklift_pallet_jack"
          ],
          "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
          "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "programName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "quantity",
            "eligible_cost",
            "heat_pump_tons",
            "new_or_replacement_ground_source",
            "ev_charger_type",
            "dcfc_power_kw",
            "managed_charging_or_tou_status",
            "public_access_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "dcfc_power_kw",
              "source": "safe_placeholder_default",
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
              "inputKey": "heat_pump_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_or_replacement_ground_source",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "managed_charging_or_tou_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_status",
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
              "effectId": "effect_one_time_savings_1_4238678a453e7a91",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1255",
          "opportunityName": "Xcel Energy - Solar*Rewards Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Performance-Based Incentive",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1255/xcel-energy-solar-rewards-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Production or net metering is not a standalone submetering or energy-monitoring retrofit.",
            "Non-PV solar thermal systems should not match.",
            "Projects outside Xcel's Colorado electric territory should not match."
          ],
          "hardRequirements": [
            "Customer must be in Xcel Energy's Colorado electric service territory.",
            "Project must be a qualifying residential on-site solar PV system.",
            "The 2026 Solar*Rewards Residential On-Site Solar program reopened with renewed incentive budget on May 21, 2026.",
            "Program preapproval, interconnection, metering, and budget limits apply."
          ],
          "eligibleApplicantTypes": [
            "xcel_energy_electric_customer",
            "residential_customer",
            "solar_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "rooftop_solar_pv"
          ],
          "evidenceText": "Xcel's]( Colorado page states the 2026 Solar*Rewards Residential On-Site Solar program opened with renewed incentive budget on May 21, 2026.",
          "reasoningNotes": "The PV match is current and source-backed. The submetering match is false because program meters are for billing and REC/payment accounting."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2388",
          "opportunityName": "Renewable Energy Property Tax Assessment",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Colorado Division of Property Taxation",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2388/renewable-energy-property-tax-assessment",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy, wind, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match ground-source geothermal heat pumps; the current official source addresses geothermal energy facilities for assessment, not building HVAC heat pumps.",
            "Do not treat this as a rebate or grant.",
            "Do not generalize local renewable property tax incentives statewide."
          ],
          "hardRequirements": [
            "Renewable and clean energy facilities are assessed under Colorado property tax rules, with separate treatment for locally assessed and state assessed facilities.",
            "Residential renewable energy personal property exemption applies only to qualifying residential-owner systems and independently owned residential PV within the statutory capacity limit.",
            "Local incentives must be verified separately because the state source states there is no statewide property tax incentive beyond assessment and exemption treatment."
          ],
          "eligibleApplicantTypes": [
            "property owners",
            "renewable energy facility owners",
            "residential renewable system owners",
            "taxpayers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "utility",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_generation_facility",
            "wind_energy_facility",
            "small_hydroelectric_facility",
            "biomass_energy_facility",
            "geothermal_electric_generation_facility",
            "residential_renewable_energy_personal_property_exemption"
          ],
          "evidenceText": "Colorado's]( property tax source describes renewable and clean energy assessment rules and a residential renewable energy personal property exemption, while stating Colorado does not have statewide property tax incentives for renewable energy.",
          "reasoningNotes": "Kept generation-facility categories supported by assessment guidance and removed geothermal heat pump matching."
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2502",
          "opportunityName": "Local Option - Sales and Use Tax Exemption for Renewable Energy Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Tax Incentive",
          "administrator": "Colorado counties and municipalities",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2502/local-option-sales-and-use-tax-exemption-for-renewable-energy-systems",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "low_flow_fixture_retrofit is a false positive; fixture means renewable energy fixture, not a plumbing fixture.",
            "Do not match water-conservation, low-flow plumbing, or ordinary building fixtures.",
            "Do not assume a statewide point-of-sale exemption; availability and process depend on the local government."
          ],
          "hardRequirements": [
            "A local government must adopt the property or sales tax credit or rebate.",
            "The renewable energy fixture must be installed behind the meter of a residential or commercial building.",
            "The fixture must produce energy from renewable resources under the Colorado statutory definition."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_thermal_energy_system",
            "small_wind_turbine",
            "biomass_biogas_energy_system",
            "geothermal_energy_system"
          ],
          "evidenceText": "Colorado statutes authorize local property or sales tax credits or rebates for residential or commercial owners installing behind-the-meter renewable energy fixtures such as PV, solar thermal, wind, biomass and geothermal.",
          "reasoningNotes": "The original low-flow fixture match was a terminology collision and should be blocked."
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2502",
          "opportunityName": "Local Option - Sales and Use Tax Exemption for Renewable Energy Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Tax Incentive",
          "administrator": "Colorado counties and municipalities",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2502/local-option-sales-and-use-tax-exemption-for-renewable-energy-systems",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "low_flow_fixture_retrofit is a false positive; fixture means renewable energy fixture, not a plumbing fixture.",
            "Do not match water-conservation, low-flow plumbing, or ordinary building fixtures.",
            "Do not assume a statewide point-of-sale exemption; availability and process depend on the local government."
          ],
          "hardRequirements": [
            "A local government must adopt the property or sales tax credit or rebate.",
            "The renewable energy fixture must be installed behind the meter of a residential or commercial building.",
            "The fixture must produce energy from renewable resources under the Colorado statutory definition."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_thermal_energy_system",
            "small_wind_turbine",
            "biomass_biogas_energy_system",
            "geothermal_energy_system"
          ],
          "evidenceText": "Colorado statutes authorize local property or sales tax credits or rebates for residential or commercial owners installing behind-the-meter renewable energy fixtures such as PV, solar thermal, wind, biomass and geothermal.",
          "reasoningNotes": "The original low-flow fixture match was a terminology collision and should be blocked."
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5878",
          "opportunityName": "C-PACE: Colorado Commercial Property Assessed Clean Energy",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "PACE Financing",
          "administrator": "Colorado New Energy Improvement District",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5878/c-pace-colorado-commercial-property-assessed-clean-energy",
          "applicationUrl": "https://coloradocpace.com/project-pre-qualification-submission-form/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "One-to-four-unit residential properties are not eligible.",
            "Retro-commissioning is not a stand-alone rebate; commissioning, audits, and studies are eligible costs only within the C-PACE financed project context.",
            "Improvements that are not permanently attached, not commercially available, or do not meet program savings or resilience rules should not match."
          ],
          "hardRequirements": [
            "Property must be in a Colorado county that has joined C-PACE.",
            "Property must be a qualifying nonresidential, agricultural, industrial, nonprofit, or multifamily property with five or more units.",
            "Improvements must meet program eligibility and project review requirements and be financed through the C-PACE assessment structure."
          ],
          "eligibleApplicantTypes": [
            "commercial_property_owner",
            "industrial_property_owner",
            "agricultural_property_owner",
            "nonprofit_property_owner",
            "multifamily_property_owner",
            "property_developer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "multifamily_5_plus_units",
            "nonresidential_new_construction"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "insulation_upgrade",
            "window_replacement",
            "door_replacement",
            "building_automation_controls",
            "high_efficiency_hvac_replacement",
            "air_sealing_weatherstripping",
            "led_lighting_retrofit",
            "lighting_controls",
            "energy_recovery_ventilation",
            "combined_heat_power",
            "ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "elevator_modernization",
            "green_roof",
            "water_conservation_fixtures",
            "solar_pv_system",
            "solar_thermal_system",
            "small_wind_energy_system",
            "hydroelectric_system",
            "battery_storage_system",
            "backup_power_system",
            "seismic_retrofit",
            "stormwater_management",
            "wildfire_resilience",
            "commissioning_costs",
            "energy_audit_or_feasibility_study"
          ],
          "evidenceText": "Colorado C-PACE sources describe financing for energy efficiency, renewable energy, water conservation, resilience, storage, EV charging, audits, design, installation, and commissioning costs for qualifying properties.",
          "reasoningNotes": "Battery storage is supported. Replace a generic retro-commissioning study match with C-PACE financing for commissioning or audit costs within eligible projects."
        }
      ],
      "v2PackageSummaries": []
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Poudre Valley REA",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, ev_charging, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
            "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
            "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
            "DC fast charging is limited to public-use eligible projects with review."
          ],
          "hardRequirements": [
            "Applicant must be a PVREA member receiving electric service.",
            "Rebate applications must generally be submitted within 90 days of purchase or installation.",
            "EV chargers must be new, permanently installed, and meet program documentation requirements.",
            "DC fast charger incentives require public access and case-by-case program review."
          ],
          "eligibleApplicantTypes": [
            "cooperative_members",
            "residential_customers",
            "commercial_customers",
            "industrial_customers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "electric_water_heater",
            "smart_thermostat_zoning_retrofit",
            "line_voltage_thermostat",
            "induction_cooking_equipment",
            "heat_pump_clothes_dryer",
            "refrigerator_freezer_recycling",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation",
            "variable_frequency_drive_retrofit",
            "high_efficiency_motor_replacement",
            "electric_forklift_pallet_jack"
          ],
          "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
          "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "programName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "quantity",
            "eligible_cost",
            "heat_pump_tons",
            "new_or_replacement_ground_source",
            "ev_charger_type",
            "dcfc_power_kw",
            "managed_charging_or_tou_status",
            "public_access_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "dcfc_power_kw",
              "source": "safe_placeholder_default",
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
              "inputKey": "heat_pump_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_or_replacement_ground_source",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "managed_charging_or_tou_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 35000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_4238678a453e7a91",
              "effectType": "one_time_savings",
              "calculationMethod": "measure_catalog",
              "valueModelKind": "measure_catalog",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 35000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "low_flow_fixture_retrofit",
      "displayName": "Low-flow fixture retrofit",
      "parentCategory": "water_efficiency",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2502",
          "opportunityName": "Local Option - Sales and Use Tax Exemption for Renewable Energy Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Tax Incentive",
          "administrator": "Colorado counties and municipalities",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2502/local-option-sales-and-use-tax-exemption-for-renewable-energy-systems",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "low_flow_fixture_retrofit is a false positive; fixture means renewable energy fixture, not a plumbing fixture.",
            "Do not match water-conservation, low-flow plumbing, or ordinary building fixtures.",
            "Do not assume a statewide point-of-sale exemption; availability and process depend on the local government."
          ],
          "hardRequirements": [
            "A local government must adopt the property or sales tax credit or rebate.",
            "The renewable energy fixture must be installed behind the meter of a residential or commercial building.",
            "The fixture must produce energy from renewable resources under the Colorado statutory definition."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_thermal_energy_system",
            "small_wind_turbine",
            "biomass_biogas_energy_system",
            "geothermal_energy_system"
          ],
          "evidenceText": "Colorado statutes authorize local property or sales tax credits or rebates for residential or commercial owners installing behind-the-meter renewable energy fixtures such as PV, solar thermal, wind, biomass and geothermal.",
          "reasoningNotes": "The original low-flow fixture match was a terminology collision and should be blocked."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "small_wind_turbine",
      "displayName": "Small wind turbine",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2502",
          "opportunityName": "Local Option - Sales and Use Tax Exemption for Renewable Energy Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Sales Tax Incentive",
          "administrator": "Colorado counties and municipalities",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2502/local-option-sales-and-use-tax-exemption-for-renewable-energy-systems",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, water_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "low_flow_fixture_retrofit is a false positive; fixture means renewable energy fixture, not a plumbing fixture.",
            "Do not match water-conservation, low-flow plumbing, or ordinary building fixtures.",
            "Do not assume a statewide point-of-sale exemption; availability and process depend on the local government."
          ],
          "hardRequirements": [
            "A local government must adopt the property or sales tax credit or rebate.",
            "The renewable energy fixture must be installed behind the meter of a residential or commercial building.",
            "The fixture must produce energy from renewable resources under the Colorado statutory definition."
          ],
          "eligibleApplicantTypes": [
            "residential_property_owner",
            "commercial_property_owner"
          ],
          "eligibleSectors": [
            "residential",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "rooftop_solar_pv",
            "solar_thermal_energy_system",
            "small_wind_turbine",
            "biomass_biogas_energy_system",
            "geothermal_energy_system"
          ],
          "evidenceText": "Colorado statutes authorize local property or sales tax credits or rebates for residential or commercial owners installing behind-the-meter renewable energy fixtures such as PV, solar thermal, wind, biomass and geothermal.",
          "reasoningNotes": "The original low-flow fixture match was a terminology collision and should be blocked."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "dc_fast_charger_installation",
      "displayName": "DC fast charger installation",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 4140000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 0,
        "annualRecurringExpensesCents": 1728000,
        "netAnnualRecurringSavingsCents": -1728000,
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
          "upfrontCostAfterSavingsCents": 4140000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Poudre Valley REA",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, ev_charging, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
            "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
            "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
            "DC fast charging is limited to public-use eligible projects with review."
          ],
          "hardRequirements": [
            "Applicant must be a PVREA member receiving electric service.",
            "Rebate applications must generally be submitted within 90 days of purchase or installation.",
            "EV chargers must be new, permanently installed, and meet program documentation requirements.",
            "DC fast charger incentives require public access and case-by-case program review."
          ],
          "eligibleApplicantTypes": [
            "cooperative_members",
            "residential_customers",
            "commercial_customers",
            "industrial_customers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "electric_water_heater",
            "smart_thermostat_zoning_retrofit",
            "line_voltage_thermostat",
            "induction_cooking_equipment",
            "heat_pump_clothes_dryer",
            "refrigerator_freezer_recycling",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation",
            "variable_frequency_drive_retrofit",
            "high_efficiency_motor_replacement",
            "electric_forklift_pallet_jack"
          ],
          "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
          "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "programName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "quantity",
            "eligible_cost",
            "heat_pump_tons",
            "new_or_replacement_ground_source",
            "ev_charger_type",
            "dcfc_power_kw",
            "managed_charging_or_tou_status",
            "public_access_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heat_pump_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_or_replacement_ground_source",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "managed_charging_or_tou_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_status",
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
              "effectId": "effect_one_time_savings_1_4238678a453e7a91",
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
      "retrofitTypeId": "exterior_site_lighting_retrofit",
      "displayName": "Exterior/site lighting retrofit",
      "parentCategory": "lighting",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 201200,
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
          "upfrontCostAfterSavingsCents": 201200,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Poudre Valley REA",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, ev_charging, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
            "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
            "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
            "DC fast charging is limited to public-use eligible projects with review."
          ],
          "hardRequirements": [
            "Applicant must be a PVREA member receiving electric service.",
            "Rebate applications must generally be submitted within 90 days of purchase or installation.",
            "EV chargers must be new, permanently installed, and meet program documentation requirements.",
            "DC fast charger incentives require public access and case-by-case program review."
          ],
          "eligibleApplicantTypes": [
            "cooperative_members",
            "residential_customers",
            "commercial_customers",
            "industrial_customers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "electric_water_heater",
            "smart_thermostat_zoning_retrofit",
            "line_voltage_thermostat",
            "induction_cooking_equipment",
            "heat_pump_clothes_dryer",
            "refrigerator_freezer_recycling",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation",
            "variable_frequency_drive_retrofit",
            "high_efficiency_motor_replacement",
            "electric_forklift_pallet_jack"
          ],
          "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
          "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "programName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "quantity",
            "eligible_cost",
            "heat_pump_tons",
            "new_or_replacement_ground_source",
            "ev_charger_type",
            "dcfc_power_kw",
            "managed_charging_or_tou_status",
            "public_access_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "dcfc_power_kw",
              "source": "safe_placeholder_default",
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
              "inputKey": "heat_pump_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_or_replacement_ground_source",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "managed_charging_or_tou_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_status",
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
              "effectId": "effect_one_time_savings_1_4238678a453e7a91",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Poudre Valley REA",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, ev_charging, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
            "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
            "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
            "DC fast charging is limited to public-use eligible projects with review."
          ],
          "hardRequirements": [
            "Applicant must be a PVREA member receiving electric service.",
            "Rebate applications must generally be submitted within 90 days of purchase or installation.",
            "EV chargers must be new, permanently installed, and meet program documentation requirements.",
            "DC fast charger incentives require public access and case-by-case program review."
          ],
          "eligibleApplicantTypes": [
            "cooperative_members",
            "residential_customers",
            "commercial_customers",
            "industrial_customers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "electric_water_heater",
            "smart_thermostat_zoning_retrofit",
            "line_voltage_thermostat",
            "induction_cooking_equipment",
            "heat_pump_clothes_dryer",
            "refrigerator_freezer_recycling",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation",
            "variable_frequency_drive_retrofit",
            "high_efficiency_motor_replacement",
            "electric_forklift_pallet_jack"
          ],
          "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
          "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "programName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "quantity",
            "eligible_cost",
            "heat_pump_tons",
            "new_or_replacement_ground_source",
            "ev_charger_type",
            "dcfc_power_kw",
            "managed_charging_or_tou_status",
            "public_access_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_measure_selection",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "heat_pump_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_or_replacement_ground_source",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "managed_charging_or_tou_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_status",
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
              "effectId": "effect_one_time_savings_1_4238678a453e7a91",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
      "retrofitTypeId": "refrigeration_controls_retrofit",
      "displayName": "Refrigeration controls retrofit",
      "parentCategory": "refrigeration",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 169600,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 64800,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 64800,
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
          "upfrontCostAfterSavingsCents": 169600,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "retro_commissioning_study",
      "displayName": "Retro-commissioning study",
      "parentCategory": "audits_studies_planning",
      "isPhysicalRetrofit": false,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 91800,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 180000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 180000,
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
          "upfrontCostAfterSavingsCents": 91800,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5878",
          "opportunityName": "C-PACE: Colorado Commercial Property Assessed Clean Energy",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "PACE Financing",
          "administrator": "Colorado New Energy Improvement District",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5878/c-pace-colorado-commercial-property-assessed-clean-energy",
          "applicationUrl": "https://coloradocpace.com/project-pre-qualification-submission-form/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "One-to-four-unit residential properties are not eligible.",
            "Retro-commissioning is not a stand-alone rebate; commissioning, audits, and studies are eligible costs only within the C-PACE financed project context.",
            "Improvements that are not permanently attached, not commercially available, or do not meet program savings or resilience rules should not match."
          ],
          "hardRequirements": [
            "Property must be in a Colorado county that has joined C-PACE.",
            "Property must be a qualifying nonresidential, agricultural, industrial, nonprofit, or multifamily property with five or more units.",
            "Improvements must meet program eligibility and project review requirements and be financed through the C-PACE assessment structure."
          ],
          "eligibleApplicantTypes": [
            "commercial_property_owner",
            "industrial_property_owner",
            "agricultural_property_owner",
            "nonprofit_property_owner",
            "multifamily_property_owner",
            "property_developer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "multifamily_5_plus_units",
            "nonresidential_new_construction"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "insulation_upgrade",
            "window_replacement",
            "door_replacement",
            "building_automation_controls",
            "high_efficiency_hvac_replacement",
            "air_sealing_weatherstripping",
            "led_lighting_retrofit",
            "lighting_controls",
            "energy_recovery_ventilation",
            "combined_heat_power",
            "ev_charger_installation",
            "ground_source_geothermal_heat_pump",
            "elevator_modernization",
            "green_roof",
            "water_conservation_fixtures",
            "solar_pv_system",
            "solar_thermal_system",
            "small_wind_energy_system",
            "hydroelectric_system",
            "battery_storage_system",
            "backup_power_system",
            "seismic_retrofit",
            "stormwater_management",
            "wildfire_resilience",
            "commissioning_costs",
            "energy_audit_or_feasibility_study"
          ],
          "evidenceText": "Colorado C-PACE sources describe financing for energy efficiency, renewable energy, water conservation, resilience, storage, EV charging, audits, design, installation, and commissioning costs for qualifying properties.",
          "reasoningNotes": "Battery storage is supported. Replace a generic retro-commissioning study match with C-PACE financing for commissioning or audit costs within eligible projects."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Poudre Valley REA",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_controls, ev_charging, refrigeration, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
            "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
            "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
            "DC fast charging is limited to public-use eligible projects with review."
          ],
          "hardRequirements": [
            "Applicant must be a PVREA member receiving electric service.",
            "Rebate applications must generally be submitted within 90 days of purchase or installation.",
            "EV chargers must be new, permanently installed, and meet program documentation requirements.",
            "DC fast charger incentives require public access and case-by-case program review."
          ],
          "eligibleApplicantTypes": [
            "cooperative_members",
            "residential_customers",
            "commercial_customers",
            "industrial_customers"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "ground_source_geothermal_heat_pump",
            "heat_pump_water_heater",
            "electric_water_heater",
            "smart_thermostat_zoning_retrofit",
            "line_voltage_thermostat",
            "induction_cooking_equipment",
            "heat_pump_clothes_dryer",
            "refrigerator_freezer_recycling",
            "ev_charger_installation",
            "level_2_ev_charger_installation",
            "dc_fast_charger_installation",
            "variable_frequency_drive_retrofit",
            "high_efficiency_motor_replacement",
            "electric_forklift_pallet_jack"
          ],
          "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
          "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
          "programName": "Poudre Valley REA - Energy Efficiency Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "quantity",
            "eligible_cost",
            "heat_pump_tons",
            "new_or_replacement_ground_source",
            "ev_charger_type",
            "dcfc_power_kw",
            "managed_charging_or_tou_status",
            "public_access_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "dcfc_power_kw",
              "source": "safe_placeholder_default",
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
              "inputKey": "heat_pump_tons",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_or_replacement_ground_source",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charger_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "managed_charging_or_tou_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_status",
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
              "effectId": "effect_one_time_savings_1_4238678a453e7a91",
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
      "retrofitTypeId": "steam_trap_replacement",
      "displayName": "Steam trap replacement",
      "parentCategory": "compressed_air_industrial",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 115600,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 56000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 56000,
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
          "upfrontCostAfterSavingsCents": 115600,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1255",
          "opportunityName": "Xcel Energy - Solar*Rewards Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Performance-Based Incentive",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1255/xcel-energy-solar-rewards-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, building_envelope, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Production or net metering is not a standalone submetering or energy-monitoring retrofit.",
            "Non-PV solar thermal systems should not match.",
            "Projects outside Xcel's Colorado electric territory should not match."
          ],
          "hardRequirements": [
            "Customer must be in Xcel Energy's Colorado electric service territory.",
            "Project must be a qualifying residential on-site solar PV system.",
            "The 2026 Solar*Rewards Residential On-Site Solar program reopened with renewed incentive budget on May 21, 2026.",
            "Program preapproval, interconnection, metering, and budget limits apply."
          ],
          "eligibleApplicantTypes": [
            "xcel_energy_electric_customer",
            "residential_customer",
            "solar_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "rooftop_solar_pv"
          ],
          "evidenceText": "Xcel's]( Colorado page states the 2026 Solar*Rewards Residential On-Site Solar program opened with renewed incentive budget on May 21, 2026.",
          "reasoningNotes": "The PV match is current and source-backed. The submetering match is false because program meters are for billing and REC/payment accounting."
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
      "displayName": "Walk-in cooler/freezer upgrade",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1580",
          "opportunityName": "Xcel Energy - Commercial Energy Efficiency Rebate Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "utility commercial energy efficiency rebate, custom efficiency, and EV infrastructure incentive program",
          "administrator": "Xcel Energy",
          "state": "CO",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1580/xcel-energy-commercial-energy-efficiency-rebate-programs",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Self-reported utility matches Xcel Energy.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, hvac, refrigeration, building_controls, commercial_kitchen, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Official program pages are segmented and some pages are dynamic; verify the exact rebate catalog/application before final incentive matching."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Xcel Energy Colorado business customer.",
            "Eligibility depends on electric or natural gas service and the applicable measure-specific program.",
            "Custom Efficiency and large or non-standard projects may require project review and application before installation.",
            "EV infrastructure incentives should be classified under EV charger infrastructure, not general energy efficiency rebates."
          ],
          "eligibleApplicantTypes": [
            "commercial",
            "industrial",
            "nonprofit",
            "government",
            "school",
            "multifamily"
          ],
          "eligibleSectors": [
            "business",
            "commercial",
            "industrial",
            "multifamily",
            "public sector"
          ],
          "eligibleRetrofitCategories": [
            "lighting",
            "HVAC / heat pump",
            "refrigeration",
            "motors / VFD",
            "EV charger",
            "design assistance / study",
            "compressed air",
            "custom efficiency",
            "boilers and heating equipment"
          ],
          "evidenceText": "Official Xcel Colorado business pages identify lighting/equipment rebates plus separate pages for HVAC-R, custom efficiency, compressed air, refrigeration, heating, motors/drives/pumps, business heat pumps, and commercial EV infrastructure.",
          "reasoningNotes": "Current official Xcel sources confirm major categories, but dynamic page access left some application-level details ambiguous."
        }
      ],
      "v2PackageSummaries": []
    }
  ]
}
