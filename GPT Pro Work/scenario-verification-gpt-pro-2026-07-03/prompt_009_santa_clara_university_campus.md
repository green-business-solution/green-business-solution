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
  "testCaseOrdinal": 9,
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

Packet 9 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 9,
  "sampleUserId": "santa-clara-university-campus",
  "description": "Large nonprofit university campus in Silicon Valley Power electric territory.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "nonprofit"
      ],
      "primaryActivityText": "Higher education, research, student housing, dining, athletics, events, and campus administration",
      "naicsCodes": [
        "611310"
      ],
      "organizationSize": "1,000+ employees"
    },
    "site": {
      "address": {
        "raw": "500 El Camino Real, Santa Clara, CA 95053, USA",
        "stateCode": "CA",
        "zip5": "95053"
      },
      "geo": {
        "stateCode": "CA",
        "zip5": "95053",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Silicon Valley Power",
          "distributionUtilityId": "UTIL_SVP",
          "territoryCandidates": [
            "UTIL_SVP"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "education_campus"
      ],
      "squareFootage": {
        "value": 3210000,
        "raw": "3,210,000",
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
    "eligible": 19,
    "ineligible": 1500
  },
  "retrofitCount": 17,
  "retrofits": [
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 6,
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance",
          "opportunityName": "Energy Design Assistance",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Technical Assistance / Rebate Support Program",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/save-money",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Matched term fixture should not be treated as an arbitrary lighting-fixture retrofit under this record; Energy Design Assistance is a design and technical-assistance pathway, with separate incentive rules for eligible...",
            "Residential measures are not supported by this business program.",
            "EV charging, data center incentives and customer-directed electrification rebates are separate SVP program sections and should not be merged into this Energy Design Assistance repair.",
            "Do not calculate incentive value from this record without the project pathway, SVP preapproval and applicable calculator or application."
          ],
          "hardRequirements": [
            "Project must be served by Silicon Valley Power in Santa Clara.",
            "Energy Design Assistance is intended for commercial and industrial customers during major facility retrofits and new construction, preferably at or near the building-program development stage.",
            "SVP reviews drawings and specifications and recommends energy-saving options for envelope, HVAC, lighting, mechanical and electrical systems.",
            "Any associated equipment incentive or new-construction rebate requires the applicable SVP application, calculator, preapproval and equipment approval before purchase or installation.",
            "New construction incentives apply to eligible nonresidential new buildings, additions and qualifying major renovations under current SVP rules."
          ],
          "eligibleApplicantTypes": [
            "Silicon Valley Power commercial customers",
            "industrial customers",
            "building owners",
            "developers",
            "design teams",
            "customers planning major facility retrofits",
            "customers planning new construction or facility expansion"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional_limited",
            "new_construction",
            "major_renovation"
          ],
          "eligibleRetrofitCategories": [
            "energy_design_assistance",
            "technical_assistance",
            "new_construction_major_renovation",
            "building_envelope_design",
            "hvac_design_assistance",
            "lighting_design_assistance",
            "mechanical_electrical_systems_design",
            "interior_lighting_new_construction",
            "exterior_lighting_new_construction",
            "chillers_new_construction",
            "unitary_air_conditioner_new_construction",
            "heat_pump_hvac_new_construction",
            "design_team_incentive"
          ],
          "evidenceText": "Silicon Valley Power's business Save Money page describes Energy Design Assistance for commercial and industrial customers during major facility retrofits and new construction, including review of construction drawings and recommendations for building envelope, HVAC, lighting, mechanical and electrical systems. SVP's current new-construction rebate materials support eligible nonresidential new construction, additions and major renovations with preapproval for lighting, chillers, unitary AC an...",
          "reasoningNotes": "The opportunity is active, but it is primarily a technical-assistance and design-support pathway, not a standalone fixture rebate. Eligible categories were limited to design assistance and associated SVP new-construction/major-renovation measure areas."
        },
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives",
          "opportunityName": "New Construction Incentives",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41520/638868867879470000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match low-flow fixtures; fixture references are lighting fixtures, not water-efficiency fixtures.",
            "Do not treat this as a normal existing-building retrofit unless the project is a qualifying addition or major renovation.",
            "Residential projects are not eligible.",
            "Installed equipment without required preapproval should not match."
          ],
          "hardRequirements": [
            "Project must be nonresidential new construction, an addition, or a major renovation with new HVAC or lighting systems.",
            "Preapproval is required before equipment installation.",
            "Equipment must be new and installed at the SVP-served facility.",
            "Project permit and installation timing must meet current application rules.",
            "Lighting and HVAC measures must meet the specified technical criteria and documentation requirements."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_customer",
            "commercial_customer",
            "industrial_customer",
            "institutional_customer",
            "government_customer",
            "design_team"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "government",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "new_construction_led_lighting",
            "new_construction_high_efficiency_hvac",
            "air_cooled_chiller",
            "packaged_ac_or_heat_pump_efficiency",
            "high_performance_nonresidential_new_construction"
          ],
          "evidenceText": "SVP's new construction application covers nonresidential projects and lists lighting, air-cooled chillers, packaged air conditioners or heat pumps, and high-performance building options.",
          "reasoningNotes": "The lighting and new-construction HVAC matches are supported; the low-flow fixture match is a false positive from lighting fixture terminology."
        },
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
          "opportunityName": "Energy Efficiency Grant Program for Nonprofit Organizations",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match for-profit businesses, residential customers, or nonprofits outside SVP service territory.",
            "Low-flow fixture or water-conservation-only work is not supported; projects must save electricity.",
            "Solar, EV charging, and electrification rebates are separate SVP programs.",
            "Funding is limited and may be forfeited if final documentation and inspection deadlines are missed."
          ],
          "hardRequirements": [
            "Applicant must be the SVP electric utility billing customer of record.",
            "Applicant must be a 501(c)(3) or 501(c)(19) nonprofit and listed as active with the California Franchise Tax Board.",
            "Applicant must meet operating history or utility-bill history requirements and have at least one full-time employee.",
            "Applicant must own the facility or have at least five years remaining on the lease.",
            "Projects must save electricity and are subject to SVP energy-engineer review, audit if required, and pre- and post-installation inspections.",
            "Applications are accepted twice per calendar year with June 30 and December 31 deadlines; maximum funding is capped per project and per period."
          ],
          "eligibleApplicantTypes": [
            "nonprofit_501c3",
            "nonprofit_501c19",
            "svppower_customer_of_record"
          ],
          "eligibleSectors": [
            "nonprofit",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "air_sealing_weatherization"
          ],
          "evidenceText": "SVP’s]( 2025-2026 nonprofit grant application says eligible projects must save electricity and typical funded projects include lighting, HVAC and weatherization improvements.",
          "reasoningNotes": "The weatherization, HVAC and lighting matches are supported; low-flow fixtures were removed because the official grant is limited to electricity-saving projects."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3527",
          "opportunityName": "Local Option - Municipal Energy Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Pace Financing",
          "administrator": "Local PACE program administrators regulated by the California Department of Financial Protection and Innovation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, building_envelope, energy_efficiency, renewable_energy, fuel_cell_system, clean_transportation, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is PACE financing, not a rebate.",
            "Do not treat DSIRE technology terms as direct product rebates; measure eligibility is administrator and jurisdiction specific.",
            "Cosmetic or nonqualifying add-ons such as cabinets, tile, countertops and conversions should not match.",
            "Geothermal, HVAC or insulation product matches should be represented as financing only unless a specific PACE administrator list verifies the measure."
          ],
          "hardRequirements": [
            "Property must be in a participating California jurisdiction or special assessment district.",
            "Financing is repaid through a property tax assessment and creates a property lien.",
            "PACE administrator and solicitor requirements, licensing, disclosures and ability-to-pay rules apply.",
            "Eligible measure scope depends on the local PACE program and administrator.",
            "Property owner should confirm sale, refinance, tax and foreclosure implications before proceeding."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "homeowners",
            "commercial_property_owners",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "energy_efficiency_financing",
            "renewable_energy_financing",
            "water_efficiency_financing",
            "commercial_pace_financing",
            "solar_pv_financing",
            "battery_storage_financing",
            "building_envelope_financing",
            "hvac_financing",
            "lighting_financing",
            "water_heating_efficiency_financing"
          ],
          "evidenceText": "California PACE sources describe property-tax-assessment financing for energy, water and other qualifying improvements; C-PACE materials cite renewable energy, storage, envelope, HVAC, lighting and water measures.",
          "reasoningNotes": "Converted product-specific matches into financing categories and retained battery only as C-PACE financing, not as a direct incentive."
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate",
          "opportunityName": "Customer Directed Electrification Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/77781/638886947877900000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Self-generation and cogeneration are explicitly ineligible.",
            "Do not match combined heat and power to this rebate.",
            "Low-flow fixtures and water-conservation-only projects are not supported by this electrification rebate.",
            "Food service equipment is a separate SVP rebate boundary.",
            "EV charging is a separate SVP program and should not be matched to this record."
          ],
          "hardRequirements": [
            "Customer must be a nonresidential Silicon Valley Power customer.",
            "Electric equipment must replace natural-gas-fired equipment and perform the same function.",
            "Preapproval is required before purchase, installation, or construction.",
            "Project is subject to SVP technical review and pre- and post-installation inspections.",
            "Equipment must reduce natural gas use and meet measure-specific requirements."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "institutional_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "process_equipment_electrification",
            "heat_recovery_chiller",
            "heat_pump_pool_heater",
            "custom_gas_to_electric_equipment_replacement"
          ],
          "evidenceText": "SVP]( describes the rebate as offsetting replacement of natural-gas-fired nonresidential equipment with efficient all-electric equipment, including heat pumps, heat pump water heaters and custom gas-reducing process measures.",
          "reasoningNotes": "The original cogeneration and low-flow fixture matches are false positives; the supported boundary is gas-to-electric nonresidential electrification."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate",
          "programName": "Customer Directed Electrification Rebate",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "annual_kwh_savings",
            "eligible_measure_cost",
            "preapproval_status",
            "natural_gas_equipment_replaced",
            "electric_equipment_installed",
            "project_payback_with_rebate",
            "customer_annual_rebate_total",
            "facility_similar_measure_five_year_total",
            "payback_calculation",
            "svp_savings_approval"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_measure_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "natural_gas_equipment_replaced",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electric_equipment_installed",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_payback_with_rebate",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "facility_similar_measure_five_year_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "payback_calculation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_savings_approval",
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
              "effectId": "effect_one_time_savings_1_d1a4d0694ed39f1e",
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
          "programName": "Energy Efficiency Grant Program for Nonprofit Organizations",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_project_cost",
            "project_scope",
            "estimated_electricity_savings",
            "nonprofit_status",
            "svp_customer_of_record_status",
            "application_period",
            "svp_preapproval",
            "svp_award_decision",
            "eligible_project_cost_cents"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "estimated_electricity_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "nonprofit_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_customer_of_record_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "application_period",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_preapproval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_award_decision",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 480000,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_grant_expected_value_1_6f580262ed2e24cd",
              "effectType": "grant_expected_value",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 480000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance",
          "programName": "Energy Design Assistance",
          "calculationStatus": "non_monetary_workflow",
          "runtimeInclusionStatus": "non_monetary_workflow",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "svp_served_commercial_or_industrial_project",
            "major_retrofit_or_new_construction_planning_stage",
            "drawings_or_specifications",
            "design_assistance_request"
          ],
          "defaultedInputs": [
            {
              "inputKey": "svp_served_commercial_or_industrial_project",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "major_retrofit_or_new_construction_planning_stage",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "drawings_or_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "design_assistance_request",
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
              "effectId": "effect_process_value_1_470ce162bc2ba2bc",
              "effectType": "process_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "non_cash_process_value",
              "cashValueClassification": "technical_assistance",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives",
          "programName": "New Construction Incentives",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "svp_served_nonresidential_project",
            "new_construction_addition_or_qualifying_major_renovation_status",
            "project_pathway",
            "permit_timing",
            "preapproval",
            "lighting_calculator_outputs_if_applicable",
            "chiller_tons_and_eer",
            "packaged_hvac_tons_and_efficiencies",
            "title_24_proposed_and_standard_energy_budgets",
            "energy_savings_percentage",
            "peak_kw_reduction",
            "incremental_or_proposed_equipment_cost",
            "equipment_quantity_and_efficiency",
            "title_24_savings_or_calculator_output",
            "eligible_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_served_nonresidential_project",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_construction_addition_or_qualifying_major_renovation_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "permit_timing",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "lighting_calculator_outputs_if_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "chiller_tons_and_eer",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "packaged_hvac_tons_and_efficiencies",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "title_24_proposed_and_standard_energy_budgets",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energy_savings_percentage",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "peak_kw_reduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "incremental_or_proposed_equipment_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_quantity_and_efficiency",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "title_24_savings_or_calculator_output",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 26400,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_64c78b3769cadde3",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 26400,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:industrial-assessments",
          "opportunityName": "Industrial Assessments",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Technical Assistance",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/save-money",
          "applicationUrl": "https://sjsu.qualtrics.com/jfe/form/SV_5pOrfSrHh36gP8W",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: water_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Remove low_flow_fixture_retrofit match; the word fixture does not support a plumbing or water-efficiency retrofit category.",
            "This is no-cost technical assistance, not a direct equipment rebate."
          ],
          "hardRequirements": [
            "Facility must meet SJSU Industrial Assessment Center eligibility, such as manufacturing or wastewater facility type and energy-bill thresholds, unless otherwise approved.",
            "Assessment produces recommendations; implementation incentives or rebates are separate programs."
          ],
          "eligibleApplicantTypes": [
            "manufacturer",
            "small_or_medium_industrial_facility",
            "wastewater_facility"
          ],
          "eligibleSectors": [
            "industrial",
            "manufacturing",
            "wastewater"
          ],
          "eligibleRetrofitCategories": [
            "industrial_energy_assessment",
            "energy_audit"
          ],
          "evidenceText": "SVP lists no-cost industrial assessments by SJSU IAC; the assessment report recommends energy-saving measures, costs, incentives, and payback.",
          "reasoningNotes": "The original fixture-based low-flow match was unsupported. Repaired to technical assessment/audit categories only."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3527",
          "opportunityName": "Local Option - Municipal Energy Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Pace Financing",
          "administrator": "Local PACE program administrators regulated by the California Department of Financial Protection and Innovation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, building_envelope, energy_efficiency, renewable_energy, fuel_cell_system, clean_transportation, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is PACE financing, not a rebate.",
            "Do not treat DSIRE technology terms as direct product rebates; measure eligibility is administrator and jurisdiction specific.",
            "Cosmetic or nonqualifying add-ons such as cabinets, tile, countertops and conversions should not match.",
            "Geothermal, HVAC or insulation product matches should be represented as financing only unless a specific PACE administrator list verifies the measure."
          ],
          "hardRequirements": [
            "Property must be in a participating California jurisdiction or special assessment district.",
            "Financing is repaid through a property tax assessment and creates a property lien.",
            "PACE administrator and solicitor requirements, licensing, disclosures and ability-to-pay rules apply.",
            "Eligible measure scope depends on the local PACE program and administrator.",
            "Property owner should confirm sale, refinance, tax and foreclosure implications before proceeding."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "homeowners",
            "commercial_property_owners",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "energy_efficiency_financing",
            "renewable_energy_financing",
            "water_efficiency_financing",
            "commercial_pace_financing",
            "solar_pv_financing",
            "battery_storage_financing",
            "building_envelope_financing",
            "hvac_financing",
            "lighting_financing",
            "water_heating_efficiency_financing"
          ],
          "evidenceText": "California PACE sources describe property-tax-assessment financing for energy, water and other qualifying improvements; C-PACE materials cite renewable energy, storage, envelope, HVAC, lighting and water measures.",
          "reasoningNotes": "Converted product-specific matches into financing categories and retained battery only as C-PACE financing, not as a direct incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
          "opportunityName": "Marin Clean Energy - Feed-In Tariff Plus",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Feed In Tariff",
          "administrator": "MCE Clean Energy",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22615/marin-clean-energy-feed-in-tariff-plus",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match behind-the-meter customer rooftop solar rebates or net-metering projects.",
            "Do not match standalone battery storage; storage is a required pairing for solar projects, not a separate storage rebate.",
            "Do not match ground-source geothermal heat pumps or solar water heating; this is a wholesale electricity feed-in tariff, not building HVAC or water heating.",
            "Do not match ordinary building retrofits."
          ],
          "hardRequirements": [
            "Projects must be 1 MW to 5 MW local renewable generation projects under MCE's feed-in tariff rules.",
            "Solar projects require paired storage sized to program requirements, including four-hour duration.",
            "Projects use standardized long-term power purchase agreements and must satisfy interconnection, site control, and deliverability requirements."
          ],
          "eligibleApplicantTypes": [
            "renewable_project_developer",
            "power_producer",
            "project_owner",
            "landowner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "utility_scale",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "wholesale_solar_pv_generation_project",
            "solar_pv_plus_storage_generation_project",
            "wholesale_wind_generation_project",
            "wholesale_biomass_generation_project"
          ],
          "evidenceText": "MCE's]( feed-in tariff is a wholesale local renewable energy procurement program for 1 to 5 MW projects, with solar paired with storage requirements.",
          "reasoningNotes": "Storage is only valid as part of required solar-plus-storage project design. Geothermal heat pump and solar water heating matches are false positives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
          "programName": "Marin Clean Energy - Feed-In Tariff Plus",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "project_technology",
            "project_mw_ac",
            "accepted_fit_capacity_block",
            "delivered_mwh",
            "ppa_price",
            "interconnection_status",
            "storage_sizing_for_solar_projects",
            "accepted_ppa_price",
            "annual_delivered_mwh",
            "technology_type"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_technology",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_mw_ac",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "accepted_fit_capacity_block",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "delivered_mwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ppa_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "interconnection_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "storage_sizing_for_solar_projects",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "accepted_ppa_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "annual_delivered_mwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "technology_type",
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
              "effectId": "effect_recurring_savings_1_bd374e5d89a7ca17",
              "effectType": "recurring_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
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
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
          "opportunityName": "GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home",
          "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Opportunity explicitly has no electric utility restriction.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a competitive grant solicitation, not a deterministic customer rebate for arbitrary EV charger installations.",
            "The ECAMS application portal is login-based; the full application workflow is not publicly readable without an account.",
            "The solicitation manual file was identified on the official CEC page, but not all detailed eligibility tables were parsed from accessible text.",
            "Do not map this opportunity to building energy retrofits, HVAC, lighting, storage or general commercial efficiency measures.",
            "Direct residential charger rebates, vehicle rebates and utility make-ready programs should not be merged into this CEC solicitation."
          ],
          "hardRequirements": [
            "Applications must be submitted through the CEC ECAMS portal.",
            "Solicitation GFO-25-608 was released May 11, 2026 and is listed as Active with an application deadline of August 18, 2026 at 11:59 p.m.",
            "Applicant must follow the official solicitation manual, attachments, deadlines, workshop materials and any addenda.",
            "Award amounts and eligible costs are project-specific and must be determined through the competitive application and CEC award process.",
            "Full applicant eligibility and equipment eligibility should be verified in the solicitation manual before matching a project."
          ],
          "eligibleApplicantTypes": [
            "California organizations eligible under the solicitation manual",
            "public agencies where eligible",
            "tribal governments where eligible",
            "nonprofit organizations where eligible",
            "community-based organizations where eligible",
            "business entities where eligible",
            "project teams able to submit through ECAMS"
          ],
          "eligibleSectors": [
            "transportation",
            "public_sector",
            "nonprofit",
            "commercial",
            "community_based_organization",
            "residential_ev_market_support"
          ],
          "eligibleRetrofitCategories": [
            "competitive_ev_grant",
            "ev_home_charging_facilitation",
            "ev_incentive_navigation_platform_or_hub",
            "ev_outreach_messaging",
            "ev_education",
            "ev_charging_equipment_limited",
            "ev_home_equipment_support_limited"
          ],
          "evidenceText": "The official CEC solicitation page identifies GFO-25-608 as Electric Vehicle Hub, Outreach, Messaging, and Equipment, a Clean Transportation Program Grant Funding Opportunity with Active status, release date May 11, 2026, and submission deadline August 18, 2026. The page directs applicants to submit through ECAMS and provides solicitation files and workshop materials.",
          "reasoningNotes": "The opportunity is active but should be treated as a competitive EV program support grant, not a simple per-charger rebate. Confidence is medium because detailed eligible-cost and applicant tables were not fully accessible from parsed public text."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
          "opportunityName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Competitive EV Infrastructure Grant",
          "administrator": "California Energy Commission and California Department of Transportation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Does not support residential, private-only, or ordinary workplace charging unless it satisfies NEVI public access and site requirements.",
            "Does not fund vehicle purchase.",
            "Applicants must follow the active CEC grant solicitation rather than treating the program as an open rebate."
          ],
          "hardRequirements": [
            "Projects must meet California NEVI solicitation and federal NEVI requirements.",
            "Funding is for publicly accessible high-powered DC fast charging infrastructure.",
            "Applications for the current solicitation must be submitted through the required CEC system by the stated deadline.",
            "Charging sites must satisfy corridor, equipment, uptime, access, and other solicitation requirements."
          ],
          "eligibleApplicantTypes": [
            "public_entities",
            "private_entities",
            "site_hosts",
            "charging_station_developers"
          ],
          "eligibleSectors": [
            "transportation",
            "commercial",
            "public_sector"
          ],
          "eligibleRetrofitCategories": [
            "ev_charger_installation",
            "public_dc_fast_charging_station"
          ],
          "evidenceText": "California's NEVI solicitation supports publicly accessible high-powered DC fast charging infrastructure under a competitive grant program.",
          "reasoningNotes": "The EV charger installation match is valid, but matching should be limited to public DC fast-charging infrastructure that meets NEVI solicitation requirements."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22278",
          "opportunityName": "Azusa Light & Water - EV Charger Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Azusa Light & Water",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22278/azusa-light-and-water-ev-charger-rebate",
          "applicationUrl": "https://www.azusaca.gov/DocumentCenter/View/47059/Final-ES-and-Weatherization-Application-Form-08022023",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Current official rebate form verifies an electric vehicle charger rebate but does not state DC fast charging eligibility.",
            "Current official application does not clearly state Level 2 specificity; do not preserve Level 2 matching unless independently verified in current terms.",
            "Azusa public charging station listings are separate city charging services, not customer charger rebates.",
            "Projects outside Azusa Light & Water service addresses should not match."
          ],
          "hardRequirements": [
            "Applicant must have an Azusa Light & Water account and qualifying service address.",
            "Application must include paid receipts or invoices dated within the program deadline.",
            "Required product and efficiency documentation must be submitted.",
            "Limit is one EV charger rebate per residence per year.",
            "Rebate cannot exceed product cost and is subject to available funding."
          ],
          "eligibleApplicantTypes": [
            "residential_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "ev_charger_installation",
            "residential_ev_charger"
          ],
          "evidenceText": "Azusa's current rebate application lists an Electric Vehicle Charger rebate with a one-per-residence-per-year limit, account and service-address requirements, receipt requirements, and funding limits.",
          "reasoningNotes": "Repair to generic residential EV charger because current official application verifies the charger rebate but not Level 2 specificity."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22278",
          "programName": "Azusa Light & Water - EV Charger Rebate",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "unit_count",
            "eligible_product_cost",
            "residence_identifier",
            "purchase_receipt",
            "utility_account_number"
          ],
          "defaultedInputs": [
            {
              "inputKey": "eligible_product_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "residence_identifier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "purchase_receipt",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "utility_account_number",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_43dd5492e4176a08",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
          "programName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "low_confidence",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [
            {
              "inputKey": "award_probability",
              "effectId": "effect_grant_expected_value_1_c93b27f2d9d796eb",
              "label": "award_probability"
            }
          ],
          "requiredInputs": [
            "solicitation_number",
            "eligible_project_cost",
            "requested_grant_amount",
            "match_funding",
            "dcfc_site_and_corridor_compliance",
            "award_selection_status",
            "solicitation_specific_caps"
          ],
          "defaultedInputs": [
            {
              "inputKey": "solicitation_number",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "requested_grant_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "match_funding",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dcfc_site_and_corridor_compliance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_selection_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "solicitation_specific_caps",
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
              "effectId": "effect_grant_expected_value_1_c93b27f2d9d796eb",
              "effectType": "grant_expected_value",
              "calculationMethod": "expected_value",
              "valueModelKind": "competitive_cost_share",
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
        },
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
          "programName": "GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME)",
          "calculationStatus": "no_calculable_value",
          "runtimeInclusionStatus": "no_calculable_value",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [
            {
              "inputKey": "award_probability",
              "effectId": "effect_grant_expected_value_1_aa2ca5c972c94202",
              "label": "award_probability"
            }
          ],
          "requiredInputs": [
            "project_scope",
            "eligible_project_budget",
            "cec_funding_request",
            "applicant_type",
            "application_score_or_award_decision",
            "award_probability",
            "phase_1_or_phase_2_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_project_budget",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cec_funding_request",
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
              "inputKey": "application_score_or_award_decision",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_probability",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "phase_1_or_phase_2_scope",
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
              "effectId": "effect_grant_expected_value_1_aa2ca5c972c94202",
              "effectType": "grant_expected_value",
              "calculationMethod": "expected_value",
              "valueModelKind": "competitive_award_range",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3527",
          "opportunityName": "Local Option - Municipal Energy Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Pace Financing",
          "administrator": "Local PACE program administrators regulated by the California Department of Financial Protection and Innovation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, building_envelope, energy_efficiency, renewable_energy, fuel_cell_system, clean_transportation, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is PACE financing, not a rebate.",
            "Do not treat DSIRE technology terms as direct product rebates; measure eligibility is administrator and jurisdiction specific.",
            "Cosmetic or nonqualifying add-ons such as cabinets, tile, countertops and conversions should not match.",
            "Geothermal, HVAC or insulation product matches should be represented as financing only unless a specific PACE administrator list verifies the measure."
          ],
          "hardRequirements": [
            "Property must be in a participating California jurisdiction or special assessment district.",
            "Financing is repaid through a property tax assessment and creates a property lien.",
            "PACE administrator and solicitor requirements, licensing, disclosures and ability-to-pay rules apply.",
            "Eligible measure scope depends on the local PACE program and administrator.",
            "Property owner should confirm sale, refinance, tax and foreclosure implications before proceeding."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "homeowners",
            "commercial_property_owners",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "energy_efficiency_financing",
            "renewable_energy_financing",
            "water_efficiency_financing",
            "commercial_pace_financing",
            "solar_pv_financing",
            "battery_storage_financing",
            "building_envelope_financing",
            "hvac_financing",
            "lighting_financing",
            "water_heating_efficiency_financing"
          ],
          "evidenceText": "California PACE sources describe property-tax-assessment financing for energy, water and other qualifying improvements; C-PACE materials cite renewable energy, storage, envelope, HVAC, lighting and water measures.",
          "reasoningNotes": "Converted product-specific matches into financing categories and retained battery only as C-PACE financing, not as a direct incentive."
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance",
          "opportunityName": "Energy Design Assistance",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Technical Assistance / Rebate Support Program",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/save-money",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Matched term fixture should not be treated as an arbitrary lighting-fixture retrofit under this record; Energy Design Assistance is a design and technical-assistance pathway, with separate incentive rules for eligible...",
            "Residential measures are not supported by this business program.",
            "EV charging, data center incentives and customer-directed electrification rebates are separate SVP program sections and should not be merged into this Energy Design Assistance repair.",
            "Do not calculate incentive value from this record without the project pathway, SVP preapproval and applicable calculator or application."
          ],
          "hardRequirements": [
            "Project must be served by Silicon Valley Power in Santa Clara.",
            "Energy Design Assistance is intended for commercial and industrial customers during major facility retrofits and new construction, preferably at or near the building-program development stage.",
            "SVP reviews drawings and specifications and recommends energy-saving options for envelope, HVAC, lighting, mechanical and electrical systems.",
            "Any associated equipment incentive or new-construction rebate requires the applicable SVP application, calculator, preapproval and equipment approval before purchase or installation.",
            "New construction incentives apply to eligible nonresidential new buildings, additions and qualifying major renovations under current SVP rules."
          ],
          "eligibleApplicantTypes": [
            "Silicon Valley Power commercial customers",
            "industrial customers",
            "building owners",
            "developers",
            "design teams",
            "customers planning major facility retrofits",
            "customers planning new construction or facility expansion"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional_limited",
            "new_construction",
            "major_renovation"
          ],
          "eligibleRetrofitCategories": [
            "energy_design_assistance",
            "technical_assistance",
            "new_construction_major_renovation",
            "building_envelope_design",
            "hvac_design_assistance",
            "lighting_design_assistance",
            "mechanical_electrical_systems_design",
            "interior_lighting_new_construction",
            "exterior_lighting_new_construction",
            "chillers_new_construction",
            "unitary_air_conditioner_new_construction",
            "heat_pump_hvac_new_construction",
            "design_team_incentive"
          ],
          "evidenceText": "Silicon Valley Power's business Save Money page describes Energy Design Assistance for commercial and industrial customers during major facility retrofits and new construction, including review of construction drawings and recommendations for building envelope, HVAC, lighting, mechanical and electrical systems. SVP's current new-construction rebate materials support eligible nonresidential new construction, additions and major renovations with preapproval for lighting, chillers, unitary AC an...",
          "reasoningNotes": "The opportunity is active, but it is primarily a technical-assistance and design-support pathway, not a standalone fixture rebate. Eligible categories were limited to design assistance and associated SVP new-construction/major-renovation measure areas."
        },
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives",
          "opportunityName": "New Construction Incentives",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41520/638868867879470000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match low-flow fixtures; fixture references are lighting fixtures, not water-efficiency fixtures.",
            "Do not treat this as a normal existing-building retrofit unless the project is a qualifying addition or major renovation.",
            "Residential projects are not eligible.",
            "Installed equipment without required preapproval should not match."
          ],
          "hardRequirements": [
            "Project must be nonresidential new construction, an addition, or a major renovation with new HVAC or lighting systems.",
            "Preapproval is required before equipment installation.",
            "Equipment must be new and installed at the SVP-served facility.",
            "Project permit and installation timing must meet current application rules.",
            "Lighting and HVAC measures must meet the specified technical criteria and documentation requirements."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_customer",
            "commercial_customer",
            "industrial_customer",
            "institutional_customer",
            "government_customer",
            "design_team"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "government",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "new_construction_led_lighting",
            "new_construction_high_efficiency_hvac",
            "air_cooled_chiller",
            "packaged_ac_or_heat_pump_efficiency",
            "high_performance_nonresidential_new_construction"
          ],
          "evidenceText": "SVP's new construction application covers nonresidential projects and lists lighting, air-cooled chillers, packaged air conditioners or heat pumps, and high-performance building options.",
          "reasoningNotes": "The lighting and new-construction HVAC matches are supported; the low-flow fixture match is a false positive from lighting fixture terminology."
        },
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
          "opportunityName": "Energy Efficiency Grant Program for Nonprofit Organizations",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match for-profit businesses, residential customers, or nonprofits outside SVP service territory.",
            "Low-flow fixture or water-conservation-only work is not supported; projects must save electricity.",
            "Solar, EV charging, and electrification rebates are separate SVP programs.",
            "Funding is limited and may be forfeited if final documentation and inspection deadlines are missed."
          ],
          "hardRequirements": [
            "Applicant must be the SVP electric utility billing customer of record.",
            "Applicant must be a 501(c)(3) or 501(c)(19) nonprofit and listed as active with the California Franchise Tax Board.",
            "Applicant must meet operating history or utility-bill history requirements and have at least one full-time employee.",
            "Applicant must own the facility or have at least five years remaining on the lease.",
            "Projects must save electricity and are subject to SVP energy-engineer review, audit if required, and pre- and post-installation inspections.",
            "Applications are accepted twice per calendar year with June 30 and December 31 deadlines; maximum funding is capped per project and per period."
          ],
          "eligibleApplicantTypes": [
            "nonprofit_501c3",
            "nonprofit_501c19",
            "svppower_customer_of_record"
          ],
          "eligibleSectors": [
            "nonprofit",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "air_sealing_weatherization"
          ],
          "evidenceText": "SVP’s]( 2025-2026 nonprofit grant application says eligible projects must save electricity and typical funded projects include lighting, HVAC and weatherization improvements.",
          "reasoningNotes": "The weatherization, HVAC and lighting matches are supported; low-flow fixtures were removed because the official grant is limited to electricity-saving projects."
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
          "programName": "Energy Efficiency Grant Program for Nonprofit Organizations",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_project_cost",
            "project_scope",
            "estimated_electricity_savings",
            "nonprofit_status",
            "svp_customer_of_record_status",
            "application_period",
            "svp_preapproval",
            "svp_award_decision",
            "eligible_project_cost_cents"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "estimated_electricity_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "nonprofit_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_customer_of_record_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "application_period",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_preapproval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_award_decision",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 128340,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_grant_expected_value_1_6f580262ed2e24cd",
              "effectType": "grant_expected_value",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 128340,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance",
          "programName": "Energy Design Assistance",
          "calculationStatus": "non_monetary_workflow",
          "runtimeInclusionStatus": "non_monetary_workflow",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "svp_served_commercial_or_industrial_project",
            "major_retrofit_or_new_construction_planning_stage",
            "drawings_or_specifications",
            "design_assistance_request"
          ],
          "defaultedInputs": [
            {
              "inputKey": "svp_served_commercial_or_industrial_project",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "major_retrofit_or_new_construction_planning_stage",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "drawings_or_specifications",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "design_assistance_request",
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
              "effectId": "effect_process_value_1_470ce162bc2ba2bc",
              "effectType": "process_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "non_cash_process_value",
              "cashValueClassification": "technical_assistance",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives",
          "programName": "New Construction Incentives",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "svp_served_nonresidential_project",
            "new_construction_addition_or_qualifying_major_renovation_status",
            "project_pathway",
            "permit_timing",
            "preapproval",
            "lighting_calculator_outputs_if_applicable",
            "chiller_tons_and_eer",
            "packaged_hvac_tons_and_efficiencies",
            "title_24_proposed_and_standard_energy_budgets",
            "energy_savings_percentage",
            "peak_kw_reduction",
            "incremental_or_proposed_equipment_cost",
            "equipment_quantity_and_efficiency",
            "title_24_savings_or_calculator_output",
            "eligible_cost"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_served_nonresidential_project",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "new_construction_addition_or_qualifying_major_renovation_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "permit_timing",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "lighting_calculator_outputs_if_applicable",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "chiller_tons_and_eer",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "packaged_hvac_tons_and_efficiencies",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "title_24_proposed_and_standard_energy_budgets",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "energy_savings_percentage",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "peak_kw_reduction",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "incremental_or_proposed_equipment_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_quantity_and_efficiency",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "title_24_savings_or_calculator_output",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 8237,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_64c78b3769cadde3",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 8237,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
          "opportunityName": "Marin Clean Energy - Feed-In Tariff Plus",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Feed In Tariff",
          "administrator": "MCE Clean Energy",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22615/marin-clean-energy-feed-in-tariff-plus",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match behind-the-meter customer rooftop solar rebates or net-metering projects.",
            "Do not match standalone battery storage; storage is a required pairing for solar projects, not a separate storage rebate.",
            "Do not match ground-source geothermal heat pumps or solar water heating; this is a wholesale electricity feed-in tariff, not building HVAC or water heating.",
            "Do not match ordinary building retrofits."
          ],
          "hardRequirements": [
            "Projects must be 1 MW to 5 MW local renewable generation projects under MCE's feed-in tariff rules.",
            "Solar projects require paired storage sized to program requirements, including four-hour duration.",
            "Projects use standardized long-term power purchase agreements and must satisfy interconnection, site control, and deliverability requirements."
          ],
          "eligibleApplicantTypes": [
            "renewable_project_developer",
            "power_producer",
            "project_owner",
            "landowner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "utility_scale",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "wholesale_solar_pv_generation_project",
            "solar_pv_plus_storage_generation_project",
            "wholesale_wind_generation_project",
            "wholesale_biomass_generation_project"
          ],
          "evidenceText": "MCE's]( feed-in tariff is a wholesale local renewable energy procurement program for 1 to 5 MW projects, with solar paired with storage requirements.",
          "reasoningNotes": "Storage is only valid as part of required solar-plus-storage project design. Geothermal heat pump and solar water heating matches are false positives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
          "programName": "Marin Clean Energy - Feed-In Tariff Plus",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "project_technology",
            "project_mw_ac",
            "accepted_fit_capacity_block",
            "delivered_mwh",
            "ppa_price",
            "interconnection_status",
            "storage_sizing_for_solar_projects",
            "accepted_ppa_price",
            "annual_delivered_mwh",
            "technology_type"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_technology",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_mw_ac",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "accepted_fit_capacity_block",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "delivered_mwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ppa_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "interconnection_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "storage_sizing_for_solar_projects",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "accepted_ppa_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "annual_delivered_mwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "technology_type",
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
              "effectId": "effect_recurring_savings_1_bd374e5d89a7ca17",
              "effectType": "recurring_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
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
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
          "opportunityName": "Energy Efficiency Grant Program for Nonprofit Organizations",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match for-profit businesses, residential customers, or nonprofits outside SVP service territory.",
            "Low-flow fixture or water-conservation-only work is not supported; projects must save electricity.",
            "Solar, EV charging, and electrification rebates are separate SVP programs.",
            "Funding is limited and may be forfeited if final documentation and inspection deadlines are missed."
          ],
          "hardRequirements": [
            "Applicant must be the SVP electric utility billing customer of record.",
            "Applicant must be a 501(c)(3) or 501(c)(19) nonprofit and listed as active with the California Franchise Tax Board.",
            "Applicant must meet operating history or utility-bill history requirements and have at least one full-time employee.",
            "Applicant must own the facility or have at least five years remaining on the lease.",
            "Projects must save electricity and are subject to SVP energy-engineer review, audit if required, and pre- and post-installation inspections.",
            "Applications are accepted twice per calendar year with June 30 and December 31 deadlines; maximum funding is capped per project and per period."
          ],
          "eligibleApplicantTypes": [
            "nonprofit_501c3",
            "nonprofit_501c19",
            "svppower_customer_of_record"
          ],
          "eligibleSectors": [
            "nonprofit",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls_retrofit",
            "high_efficiency_hvac_replacement",
            "air_sealing_weatherization"
          ],
          "evidenceText": "SVP’s]( 2025-2026 nonprofit grant application says eligible projects must save electricity and typical funded projects include lighting, HVAC and weatherization improvements.",
          "reasoningNotes": "The weatherization, HVAC and lighting matches are supported; low-flow fixtures were removed because the official grant is limited to electricity-saving projects."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
          "opportunityName": "Low Income Home Energy Assistance Program (LIHEAP)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Assistance / Grant Program",
          "administrator": "U.S. Department of Health and Human Services, Administration for Children and Families, Office of Community Services",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5712/low-income-home-energy-assistance-program-liheap",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a commercial or institutional retrofit program.",
            "Weatherization is optional and locally administered; do not assume every LIHEAP application funds physical retrofit work.",
            "LIHEAP should not be matched as a building retrofit rebate where the local grantee only provides bill or crisis assistance."
          ],
          "hardRequirements": [
            "Household must meet the applicable state, territory, tribal, or local LIHEAP eligibility rules.",
            "Assistance is administered by local LIHEAP grantees, not directly as a universal federal retrofit rebate.",
            "Weatherization and minor energy-related repairs depend on local grantee program options and funding.",
            "Funding is limited and may be seasonal."
          ],
          "eligibleApplicantTypes": [
            "low_income_household"
          ],
          "eligibleSectors": [
            "residential",
            "low_income"
          ],
          "eligibleRetrofitCategories": [
            "utility_bill_assistance",
            "energy_crisis_assistance",
            "home_weatherization",
            "minor_energy_related_home_repairs"
          ],
          "evidenceText": "ACF describes LIHEAP as federally funded assistance for home energy bills, energy crises, weatherization, and minor energy-related home repairs for low-income households.",
          "reasoningNotes": "The weatherization match is conditionally valid but must be flagged as locally administered and not universal across all LIHEAP grantees."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
          "programName": "Energy Efficiency Grant Program for Nonprofit Organizations",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "human_review_required",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_project_cost",
            "project_scope",
            "estimated_electricity_savings",
            "nonprofit_status",
            "svp_customer_of_record_status",
            "application_period",
            "svp_preapproval",
            "svp_award_decision",
            "eligible_project_cost_cents"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "estimated_electricity_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "nonprofit_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_customer_of_record_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "application_period",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_preapproval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_award_decision",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 96000,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_grant_expected_value_1_6f580262ed2e24cd",
              "effectType": "grant_expected_value",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 96000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
          "programName": "Low Income Home Energy Assistance Program (LIHEAP)",
          "calculationStatus": "no_calculable_value",
          "runtimeInclusionStatus": "no_calculable_value",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "administering_liheap_grantee",
            "local_benefit_type",
            "approved_household_benefit_or_service_scope",
            "approved_benefit_amount_or_service_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "administering_liheap_grantee",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_benefit_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_household_benefit_or_service_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_benefit_amount_or_service_scope",
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
              "effectId": "effect_no_cash_value_1_2c3a4534ab53f492",
              "effectType": "no_cash_value",
              "calculationMethod": "custom_quote",
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate",
          "opportunityName": "Customer Directed Electrification Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/77781/638886947877900000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Self-generation and cogeneration are explicitly ineligible.",
            "Do not match combined heat and power to this rebate.",
            "Low-flow fixtures and water-conservation-only projects are not supported by this electrification rebate.",
            "Food service equipment is a separate SVP rebate boundary.",
            "EV charging is a separate SVP program and should not be matched to this record."
          ],
          "hardRequirements": [
            "Customer must be a nonresidential Silicon Valley Power customer.",
            "Electric equipment must replace natural-gas-fired equipment and perform the same function.",
            "Preapproval is required before purchase, installation, or construction.",
            "Project is subject to SVP technical review and pre- and post-installation inspections.",
            "Equipment must reduce natural gas use and meet measure-specific requirements."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "institutional_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "nonresidential"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_hvac_retrofit",
            "heat_pump_water_heater",
            "process_equipment_electrification",
            "heat_recovery_chiller",
            "heat_pump_pool_heater",
            "custom_gas_to_electric_equipment_replacement"
          ],
          "evidenceText": "SVP]( describes the rebate as offsetting replacement of natural-gas-fired nonresidential equipment with efficient all-electric equipment, including heat pumps, heat pump water heaters and custom gas-reducing process measures.",
          "reasoningNotes": "The original cogeneration and low-flow fixture matches are false positives; the supported boundary is gas-to-electric nonresidential electrification."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate",
          "programName": "Customer Directed Electrification Rebate",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "annual_kwh_savings",
            "eligible_measure_cost",
            "preapproval_status",
            "natural_gas_equipment_replaced",
            "electric_equipment_installed",
            "project_payback_with_rebate",
            "customer_annual_rebate_total",
            "facility_similar_measure_five_year_total",
            "payback_calculation",
            "svp_savings_approval"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_measure_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "natural_gas_equipment_replaced",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electric_equipment_installed",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_payback_with_rebate",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_annual_rebate_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "facility_similar_measure_five_year_total",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "payback_calculation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_savings_approval",
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
              "effectId": "effect_one_time_savings_1_d1a4d0694ed39f1e",
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:controls-program",
          "opportunityName": "Controls Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Performance Based Controls Rebate",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41502/638868861154100000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, building_controls, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "High-efficiency HVAC equipment replacement is not the core eligible measure unless the controls program requirements are met.",
            "Low-flow water fixture retrofit is a false positive; fixture language refers to equipment fixtures or forms, not plumbing water conservation.",
            "Reprogramming existing controls belongs to SVP Building Optimization, not this Controls Program.",
            "The supplied application URL pointed to Building Optimization; the repaired application URL is the Controls Rebate Application."
          ],
          "hardRequirements": [
            "Customer must obtain SVP preapproval before purchasing or installing equipment.",
            "Controls Program projects must produce more than eighty percent of savings from automated control strategies.",
            "Eligible measures are new control systems or significant expansions or upgrades of existing systems for HVAC or industrial process controls.",
            "Application must include project description, control energy-management capabilities, sequence of operations, engineering savings estimates, and commissioning or verification information."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_customer",
            "business_customer",
            "commercial_customer",
            "industrial_customer",
            "government_customer",
            "nonprofit_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "government",
            "nonprofit",
            "institutional",
            "manufacturing"
          ],
          "eligibleRetrofitCategories": [
            "building_management_system_controls",
            "energy_management_system",
            "hvac_controls_retrofit",
            "industrial_process_controls",
            "automated_control_system",
            "fault_detection_diagnostics"
          ],
          "evidenceText": "SVP’s]( Controls Program covers automated control systems with advanced energy management capabilities for building air conditioning or industrial process controls, with performance-based rebates and preapproval requirements.",
          "reasoningNotes": "Energy management and HVAC/process controls are supported. Generic HVAC replacement and water fixtures are false positives, and the target application URL needed correction."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:controls-program",
          "programName": "Controls Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "svp_nonresidential_account",
            "controls_project_description",
            "annual_kwh_savings_estimate",
            "verified_kwh_savings_by_payment_period",
            "automated_controls_share_of_savings",
            "total_measure_cost",
            "sequence_of_operations",
            "commissioning_or_m_v_plan",
            "preapproval",
            "annual_kwh_savings",
            "verified_kwh_savings",
            "controls_share_of_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_nonresidential_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "controls_project_description",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "annual_kwh_savings_estimate",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "verified_kwh_savings_by_payment_period",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "automated_controls_share_of_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "total_measure_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "sequence_of_operations",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "commissioning_or_m_v_plan",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "verified_kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "controls_share_of_savings",
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
              "effectId": "effect_one_time_savings_1_c890a030a33b6bcd",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
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
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:heat-pump-water-heater-rebate",
          "opportunityName": "Heat Pump Water Heater Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Silicon Valley Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
          "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/75953/638881818060600000",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches Silicon Valley Power.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, energy_efficiency, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match battery storage, heat pump HVAC, high-efficiency gas water heaters or low-flow fixtures to this heat pump water heater rebate.",
            "The gas water heater term refers to replacing existing gas equipment with a heat pump water heater, not rebating new gas water heaters.",
            "Silicon Valley Power heat pump HVAC and refrigeration rebates are separate programs and should not be merged into this opportunity.",
            "Residential rebates should not be inferred from this business program record."
          ],
          "hardRequirements": [
            "Applicant must be a nonresidential Silicon Valley Power customer.",
            "Project must replace an existing electric resistance water heater or natural gas water heater with a qualifying heat pump water heater.",
            "Preapproval by Silicon Valley Power is required before installation.",
            "A pre-installation inspection, qualifying equipment efficiency, new equipment, operating installation and timely invoice submission are required.",
            "Projects are subject to funding availability and program deadlines."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_svp_customer",
            "business_customer",
            "commercial_customer",
            "institutional_customer",
            "government_customer",
            "authorized_account_holder"
          ],
          "eligibleSectors": [
            "commercial",
            "institutional",
            "government",
            "industrial",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "heat_pump_water_heater"
          ],
          "evidenceText": "Silicon]( Valley Power's business rebate application covers nonresidential heat pump water heaters replacing existing electric resistance or natural gas water heaters, with preapproval required before installation.",
          "reasoningNotes": "Only the heat pump water heater category is supported for this opportunity. Other matched terms came from nearby SVP electrification programs or from describing the replaced equipment, so they should be blocked for this specific listing."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:heat-pump-water-heater-rebate",
          "programName": "Heat Pump Water Heater Rebate",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "no_supported_effect_amount",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "existing_water_heater_fuel",
            "hpwh_unit_count",
            "eligible_equipment_cost",
            "uef_rating",
            "svp_preapproval_status",
            "installation_completion_date",
            "unit_count",
            "preapproval_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existing_water_heater_fuel",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "hpwh_unit_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "uef_rating",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "svp_preapproval_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installation_completion_date",
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
              "effectId": "effect_one_time_savings_1_b1b880e23dddd485",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "fixed_tier_amount",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3527",
          "opportunityName": "Local Option - Municipal Energy Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Pace Financing",
          "administrator": "Local PACE program administrators regulated by the California Department of Financial Protection and Innovation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, building_envelope, energy_efficiency, renewable_energy, fuel_cell_system, clean_transportation, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is PACE financing, not a rebate.",
            "Do not treat DSIRE technology terms as direct product rebates; measure eligibility is administrator and jurisdiction specific.",
            "Cosmetic or nonqualifying add-ons such as cabinets, tile, countertops and conversions should not match.",
            "Geothermal, HVAC or insulation product matches should be represented as financing only unless a specific PACE administrator list verifies the measure."
          ],
          "hardRequirements": [
            "Property must be in a participating California jurisdiction or special assessment district.",
            "Financing is repaid through a property tax assessment and creates a property lien.",
            "PACE administrator and solicitor requirements, licensing, disclosures and ability-to-pay rules apply.",
            "Eligible measure scope depends on the local PACE program and administrator.",
            "Property owner should confirm sale, refinance, tax and foreclosure implications before proceeding."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "homeowners",
            "commercial_property_owners",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "energy_efficiency_financing",
            "renewable_energy_financing",
            "water_efficiency_financing",
            "commercial_pace_financing",
            "solar_pv_financing",
            "battery_storage_financing",
            "building_envelope_financing",
            "hvac_financing",
            "lighting_financing",
            "water_heating_efficiency_financing"
          ],
          "evidenceText": "California PACE sources describe property-tax-assessment financing for energy, water and other qualifying improvements; C-PACE materials cite renewable energy, storage, envelope, HVAC, lighting and water measures.",
          "reasoningNotes": "Converted product-specific matches into financing categories and retained battery only as C-PACE financing, not as a direct incentive."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "parentCategory": "certifications_compliance",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4790",
          "opportunityName": "City of San Diego - Sustainable Building Expedited Permit Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Green Building Incentive",
          "administrator": "City of San Diego Development Services Department",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4790/city-of-san-diego-sustainable-building-expedited-permit-program",
          "applicationUrl": "https://www.sandiego.gov/sites/default/files/dsdds531.pdf",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "The current private SBEP source supports CALGreen-based sustainable building compliance, not a general LEED certification match.",
            "LEED requirements found in city policy apply to certain city-owned, occupied, or leased facilities and should not be generalized to private SBEP projects.",
            "This is an expedited permitting program, not a direct equipment rebate."
          ],
          "hardRequirements": [
            "Eligible sustainable building projects must meet City SBEP rules and submit required SBEP documentation.",
            "Residential projects of 10 or more units and nonresidential projects must meet applicable CALGreen mandatory and voluntary measures for SBEP sustainable building eligibility.",
            "Sustainability measures must remain in the project or expedited review may be withdrawn."
          ],
          "eligibleApplicantTypes": [
            "developer",
            "builder",
            "property_owner",
            "affordable_housing_developer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily_residential",
            "affordable_housing",
            "public"
          ],
          "eligibleRetrofitCategories": [
            "calgreen_tier_compliance",
            "sustainable_building_compliance"
          ],
          "evidenceText": "San]( Diego’s current SBEP materials identify expedited review for eligible sustainable building projects and require SBEP documentation tied to city code and CALGreen compliance.",
          "reasoningNotes": "Remove deterministic LEED matching for private SBEP. Keep only sustainable building compliance categories unless a separate city-owned-facility policy record is created."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2794",
          "opportunityName": "CPS Energy - Solar PV Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "CPS Energy",
          "state": "TX",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2794/cps-energy-solar-pv-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This commercial tier is not evidence for a residential solar PV match.",
            "Battery storage alone is not supported by this opportunity.",
            "Solar thermal or non-PV renewable equipment is not eligible.",
            "Projects outside CPS Energy service territory are not eligible."
          ],
          "hardRequirements": [
            "Applicant must be an eligible CPS Energy customer.",
            "Commercial small business systems are limited to less than 100 kW AC under the cited tier.",
            "Project must meet CPS Energy solar PV rebate terms and documentation requirements.",
            "Rebate amount is calculated by installed AC wattage and is subject to a project cap.",
            "Funds and program guidelines are subject to change."
          ],
          "eligibleApplicantTypes": [
            "small_business_customer",
            "school",
            "nonprofit_organization",
            "commercial_electric_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "education",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system"
          ],
          "evidenceText": "CPS Energy lists solar photovoltaic rebate tiers for small businesses, schools, and nonprofits, with incentives based on installed AC wattage.",
          "reasoningNotes": "The deterministic solar PV match is correct, but should be limited to eligible CPS Energy commercial, school, and nonprofit applicants for the cited page."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2794",
          "programName": "CPS Energy - Solar PV Rebate Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "no_supported_effect_amount",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "system_ac_watts",
            "invoice_cost",
            "customer_sector",
            "local_module_eligibility",
            "installer_local_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "system_ac_watts",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "invoice_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "customer_sector",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_module_eligibility",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installer_local_status",
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
              "effectId": "effect_one_time_savings_1_fcd9d276010cc0c4",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
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
