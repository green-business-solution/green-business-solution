{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "ntua-fort-defiance-headquarters",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-profile enrichment for the NTUA Fort Defiance headquarters test case. Inputs use the supplied fixture facts, especially the tribal public utility ownership, AZ site location, office/admin building type, applicant-as-distribution-utility status, and annual utility usage. Citation to supplied file: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source test case explicitly lists the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An exploring-stage headquarters retrofit would usually not yet have issued an RFP or selected contractors."
},
{
"inputKey": "grant_application_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant application, award letter, or preapproval fact is present in the supplied test case."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Most grant programs requiring preapproval should remain suppressed unless a preapproval or reservation document is present."
},
{
"inputKey": "applicant_is_tribal_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied context describes NTUA as a tribally owned multi-utility enterprise serving the Navajo Nation."
},
{
"inputKey": "applicant_is_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form classifies the organization as Government / Public Agency."
},
{
"inputKey": "applicant_is_distribution_utility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied tax facts explicitly mark applicant_is_distribution_utility as true."
},
{
"inputKey": "applicant_is_nonprofit_501c3",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is modeled as a tribal public utility rather than a 501(c)(3) nonprofit."
},
{
"inputKey": "applicant_is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building type is office/administrative and the primary activity is utility operations."
},
{
"inputKey": "applicant_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The NAICS codes and primary activity describe utility operations, not agricultural production."
},
{
"inputKey": "site_is_owner_occupied",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ownership status is Own and the ownership relationship is owner."
},
{
"inputKey": "landlord_tenant_split_incentive_issue",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is owner-occupied, so tenant approval constraints are not expected."
},
{
"inputKey": "site_customer_class",
"value": "commercial_public_authority_or_internal_utility_facility",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility is an administrative headquarters for a tribal utility; the exact tariff class remains unverified."
},
{
"inputKey": "annual_kwh",
"value": 1660000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile includes annualKwh of 1,660,000."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 19588000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile includes annual electric cost of $195,880."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 9555000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summary includes annual gas cost of $95,550."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 11.8,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile lists averageCostPerKwh as 0.118 dollars."
},
{
"inputKey": "building_square_footage",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The source form says square footage is unknown and the existing tax facts mark it as high-impact validation needed."
},
{
"inputKey": "site_on_tribal_land_or_navajo_nation_service_area",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The headquarters is modeled in Fort Defiance and the entity is a Navajo Nation tribal utility, but parcel-level land status should remain confirmable."
},
{
"inputKey": "property_tax_exempt_or_non_taxable_review_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied tax facts indicate tribal utility property non-taxable or exempt review required."
},
{
"inputKey": "can_use_refundable_or_direct_pay_tax_credits",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Tax treatment for a tribally owned utility can be program- and financing-structure-specific; this should not be assumed."
},
{
"inputKey": "utility_rebate_conflict_review_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is also the distribution utility, so standard utility-customer rebate rules may exclude utility-owned assets or require special handling."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Interior and exterior LED retrofit for administrative offices, operations support areas, parking-lot poles, and common spaces; modeled as a small pilot phase rather than a full campus relight.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for the LED retrofit."
},
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview assumptions explicitly describe 12 fixture replacements."
},
{
"inputKey": "measure_type",
"value": "led_fixture_replacement",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A limited LED fixture replacement is realistic for an exploring-stage office retrofit."
},
{
"inputKey": "existing_lamps_are_led",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing fixture type is not supplied and could materially affect savings and rebate eligibility."
},
{
"inputKey": "hours_of_operation_per_week",
"value": 55,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Administrative headquarters usage commonly includes weekday office hours plus some extended operations support."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is still exploring and no quote has been supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility-administered rebates may be unavailable because the applicant is also the distribution utility.",
"A quote, fixture schedule, and existing fixture baseline should be required before calculating most final incentives."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace selected aging packaged rooftop or split-system HVAC units serving administrative spaces with higher-efficiency electric cooling and gas or heat-pump heating equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for the HVAC retrofit."
},
{
"inputKey": "hvac_unit_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two commercial units is a conservative scope for a headquarters pilot with 1.66 million annual kWh usage."
},
{
"inputKey": "cooling_capacity_tons",
"value": 20,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two 10-ton units are plausible for a partial administrative-building retrofit."
},
{
"inputKey": "existing_equipment_age_years",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Equipment age is not present and may determine whether replacement is early-retirement, end-of-life, or ineligible maintenance."
},
{
"inputKey": "selected_efficiency_rating",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Equipment-specific IEER, EER, SEER2, HSPF2, COP, or thermal-efficiency data should come from a submittal or quote."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No project quote is present in the test case."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Final eligibility depends on equipment efficiency, baseline, fuel type, and whether the measure is a like-for-like replacement.",
"Utility-owned or self-served facilities may not qualify for standard customer rebates."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Early feasibility concept for a ground-source heat pump serving part of the headquarters campus, likely requiring test wells, geotechnical review, and design engineering before incentive calculation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for ground-source geothermal heat pump."
},
{
"inputKey": "system_capacity_tons",
"value": 18,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity is a plausible pilot size but cannot be validated without building square footage and load calculations."
},
{
"inputKey": "geothermal_design_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility or design study is present, and geothermal systems need site-specific design."
},
{
"inputKey": "ground_loop_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Loop type should remain unknown until engineering review confirms horizontal, vertical, or other configuration."
},
{
"inputKey": "eligible_study_cost_cents",
"value": 450000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A preliminary feasibility and test-bore allowance is realistic for this kind of early-stage project."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote or engineered cost breakdown is included in the test case."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The concept may be technically possible but should not calculate most grants without a study, load calculation, and quote.",
"High project uncertainty should keep estimates suppressed unless a grant formula explicitly supports feasibility-stage studies."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery storage concept to support headquarters resilience and critical utility operations during outages.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for the battery storage system."
},
{
"inputKey": "battery_power_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 250 kW system is a realistic conservative resilience size for a utility headquarters."
},
{
"inputKey": "battery_capacity_kwh",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A four-hour 250 kW / 1,000 kWh battery is a common resilience configuration."
},
{
"inputKey": "paired_with_new_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit list includes storage but no explicit new PV project, so storage should not be assumed to be solar-paired."
},
{
"inputKey": "critical_loads_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A resilience project needs critical-load identification, but none is provided."
},
{
"inputKey": "interconnection_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Even when the applicant is the utility, storage connected to facility electrical systems should require internal interconnection and protection review."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No battery quote, one-line, or bill of materials is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Federal, tribal, or resilience grants may be relevant, but standard customer rebates may not apply to utility-owned assets.",
"Critical-load schedule, interconnection design, and quote should be required before calculation."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Conceptual headquarters microgrid integrating switchgear, controls, storage, and possible future generation to improve utility operations resilience.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for the microgrid system."
},
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A microgrid scope normally includes controls and islanding logic."
},
{
"inputKey": "islanding_capability_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The main value proposition for a utility headquarters microgrid would be resilience during grid outages."
},
{
"inputKey": "critical_load_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical-load sizing is not supplied and should drive any microgrid calculation."
},
{
"inputKey": "engineering_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No microgrid feasibility or design study is present."
},
{
"inputKey": "eligible_study_cost_cents",
"value": 650000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A conceptual engineering and controls study allowance is realistic before full procurement."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote, one-line, or scope-of-work document is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Potentially strong fit for tribal resilience or grid-modernization grants, but not formula-ready without a study.",
"Do not treat it as a normal customer-side rebate because the applicant is the distribution utility."
]
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"projectScopeSummary": "Install branch-circuit submeters and energy monitoring for headquarters buildings to support utility operations energy management and future M&V.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 84800,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for submetering / energy monitoring."
},
{
"inputKey": "meter_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight submeters is a plausible small headquarters monitoring scope."
},
{
"inputKey": "includes_cloud_dashboard",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Modern energy monitoring projects commonly include a dashboard or reporting software."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No M&V plan is included, and some grants require one."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Often eligible only as part of a larger energy-management, audit, or M&V project.",
"Standalone monitoring savings should not be overclaimed."
]
},
{
"retrofitTypeId": "window_replacement",
"projectScopeSummary": "Targeted replacement of aging office windows with higher-performance units in selected administrative areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 444000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for window replacement."
},
{
"inputKey": "window_count",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 24-window targeted scope aligns with the preview cost and a partial office retrofit."
},
{
"inputKey": "window_area_sqft",
"value": 720,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 30 square feet per commercial window opening."
},
{
"inputKey": "selected_u_factor",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Specific window performance must come from product submittals."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No window quote or product schedule is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Commercial window incentives are often limited, formula-specific, or bundled with broader envelope projects.",
"Do not calculate without U-factor, SHGC, baseline, and cost allocation."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar domestic hot-water concept for restrooms, break rooms, or maintenance wash-down use at the headquarters complex.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for solar water heating."
},
{
"inputKey": "collector_area_sqft",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A modest commercial solar thermal array is plausible for office and operations support loads."
},
{
"inputKey": "storage_tank_gallons",
"value": 300,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 300-gallon storage volume is plausible for a small commercial solar hot-water system."
},
{
"inputKey": "domestic_hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile has gas cost but no domestic hot-water end-use breakdown."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote or thermal load calculation is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A utility headquarters office may not have enough year-round hot-water load for a strong grant case.",
"Should remain suppressed unless a hot-water load study and equipment quote are supplied."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Conceptual natural-gas CHP system for resilience and thermal recovery, but likely poor fit for an administrative headquarters unless there is a verified year-round thermal load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for combined heat and power."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 150,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 150 kW concept is conservative relative to annual electric usage but unverified."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes gas costs but no continuous thermal load suitable for CHP."
},
{
"inputKey": "emissions_permit_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A combustion-based CHP system normally requires air permitting or at least environmental review."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No CHP vendor quote or thermal feasibility analysis is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not a strong office/admin fit without verified continuous thermal demand.",
"Potential emissions and fuel-use impacts may conflict with clean-energy grant requirements."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas concept is not realistic for a tribal utility administrative headquarters because no feedstock, wastewater digester, landfill gas source, or industrial thermal host is identified.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost but should not be treated as qualifying."
},
{
"inputKey": "verified_biomass_or_biogas_feedstock",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied headquarters profile does not identify a fuel source such as digester gas, landfill gas, wood waste, or agricultural residue."
},
{
"inputKey": "feedstock_contract_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feedstock contract or onsite fuel source is present."
},
{
"inputKey": "thermal_or_electric_offtake_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No validated off-take arrangement is supplied for a biomass or biogas system."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the user identifies an actual feedstock source and project site beyond the office headquarters.",
"Do not infer eligibility from NTUA wastewater operations; the test case site is a headquarters office."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine concept for a headquarters site, but insufficient site wind resource and interconnection details are available.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for small wind."
},
{
"inputKey": "wind_capacity_kw",
"value": 50,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 50 kW turbine is plausible for a small commercial concept, but no wind study is present."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small wind grants typically need site wind-resource evidence."
},
{
"inputKey": "zoning_or_siting_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No turbine siting, height, or cultural/environmental approval facts are supplied."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No turbine vendor quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate without wind-resource evidence, siting approval, and vendor quote.",
"The project may be less realistic than storage, microgrid, LED, or HVAC measures for a headquarters office."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal energy storage concept for shifting cooling load, but no central plant or large predictable cooling profile has been confirmed.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for thermal energy storage."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 600,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 600 ton-hour concept is plausible for commercial cooling storage but cannot be validated without HVAC plant data."
},
{
"inputKey": "central_chilled_water_plant_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied profile does not state whether the headquarters has a central chilled-water plant."
},
{
"inputKey": "time_of_use_or_demand_savings_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The available utility profile includes annual kWh and cost but no confirmed time-of-use or demand-charge schedule."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No thermal storage quote or mechanical design is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely needs central plant confirmation and tariff-driven demand-shift value before any estimate.",
"Should remain suppressed for most grants at the current exploration stage."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "UTILITY_CUSTOMER_REBATE_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_distribution_utility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly says the applicant is also the electric distribution utility."
},
{
"inputKey": "asset_is_utility_owned_or_internal_facility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The headquarters is owned by the applicant and served by the applicant utility."
}
],
"reasoning": "Standard utility customer rebates should not be forced positive because the participant is the utility itself, not a normal third-party customer."
},
{
"opportunityId": "TRIBAL_ENERGY_OR_RESILIENCE_GRANT_GENERIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "applicant_is_tribal_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied context supports a tribal entity designation."
},
{
"inputKey": "resilience_or_critical_utility_operations_benefit",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Battery and microgrid measures plausibly support headquarters utility operations resilience."
},
{
"inputKey": "benefits_low_income_or_disadvantaged_community",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is in a tribal service context, but program-specific community-benefit evidence should not be assumed."
},
{
"inputKey": "agency_preapplication_or_notice_of_intent_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No agency application status is present."
}
],
"reasoning": "Tribal status and resilience scope are plausible, but estimates should require a defined grant program, project scope, budget, and application status."
},
{
"opportunityId": "FEDERAL_DIRECT_PAY_OR_ELECTIVE_PAY_TAX_CREDIT_GENERIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "tax_exempt_or_public_owner",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source profile describes a Government / Public Agency and property tax review indicates tribal utility exemption/non-taxable status."
},
{
"inputKey": "eligible_credit_property_type_confirmed",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Battery storage, microgrid components, geothermal, and solar thermal may have different tax-credit treatment; the asset type must be confirmed."
},
{
"inputKey": "tax_filing_entity_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The appropriate filing entity for a tribally owned utility should be confirmed before modeling direct pay."
}
],
"reasoning": "Potentially relevant for some technologies, but not safe to calculate generically without asset classification and tax filing facts."
},
{
"opportunityId": "LED_OR_HVAC_EQUIPMENT_REBATE_GENERIC",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No itemized quote is supplied."
},
{
"inputKey": "equipment_efficiency_submittal_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case lacks fixture specifications and HVAC efficiency ratings."
}
],
"reasoning": "Could be formula-ready for ordinary customers, but this profile should need quote data and utility-owner conflict review."
},
{
"opportunityId": "RESIDENTIAL_ONLY_REBATE_GENERIC",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "site_facility_type",
"value": "office_admin",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile lists office_admin as the building type."
},
{
"inputKey": "residential_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a headquarters administrative facility, not residential."
}
],
"reasoning": "Residential opportunities should remain blocked and not be adjusted to qualify."
},
{
"opportunityId": "AGRICULTURAL_PRODUCER_GRANT_GENERIC",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "applicant_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The entity is a utility, not an agricultural producer."
}
],
"reasoning": "Do not infer agricultural eligibility from rural or tribal geography."
},
{
"opportunityId": "SCHOOL_OR_PUBLIC_EDUCATION_ENERGY_GRANT_GENERIC",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "applicant_is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is an office/admin headquarters."
}
],
"reasoning": "Education-campus programs should not be forced to qualify."
},
{
"opportunityId": "BIOMASS_OR_BIOGAS_FEEDSTOCK_GRANT_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "verified_biomass_or_biogas_feedstock",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No feedstock source is identified for the headquarters site."
}
],
"reasoning": "The fixture should suppress biomass/biogas estimates unless a real feedstock and project site are supplied."
},
{
"opportunityId": "SMALL_WIND_GRANT_GENERIC",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No measured or modeled wind resource is supplied."
},
{
"inputKey": "zoning_or_siting_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No siting approval is supplied."
}
],
"reasoning": "Small-wind estimates should remain suppressed until site-specific resource and permitting evidence exists."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "approved_rerz_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing opportunity-specific inputs already suppress this Michigan-only treatment for the AZ site."
}
],
"reasoning": "Out-of-state opportunity should stay suppressed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "municipality",
"value": "Fort Defiance, AZ",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing opportunity-specific inputs already identify the site as Fort Defiance, AZ, not Rhode Island."
}
],
"reasoning": "Out-of-state opportunity should stay suppressed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "not_applicable_out_of_state_and_no_synthetic_solar_manufacturing_activity",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing opportunity-specific inputs suppress this Washington solar manufacturing tax treatment."
}
],
"reasoning": "Out-of-state and wrong-activity opportunity should stay suppressed."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "building_square_footage",
"reason": "needs user decision"
},
{
"inputKey": "itemized_contractor_quote",
"reason": "quote not available"
},
{
"inputKey": "equipment_efficiency_submittals",
"reason": "quote not available"
},
{
"inputKey": "grant_application_confirmation_number",
"reason": "application not submitted"
},
{
"inputKey": "agency_preapproval_or_award_letter",
"reason": "source requires agency approval"
},
{
"inputKey": "critical_load_schedule_for_resilience_project",
"reason": "needs user decision"
},
{
"inputKey": "microgrid_feasibility_study",
"reason": "quote not available"
},
{
"inputKey": "battery_interconnection_study",
"reason": "source requires agency approval"
},
{
"inputKey": "geothermal_load_calculation_and_test_bore_results",
"reason": "quote not available"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_or_biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "thermal_energy_storage_central_plant_confirmation",
"reason": "needs user decision"
},
{
"inputKey": "tribal_or_federal_tax_filing_entity_for_direct_pay",
"reason": "needs user decision"
},
{
"inputKey": "state_or_local_property_tax_savings_baseline",
"reason": "source requires agency approval"
}
],
"doNotForceQualificationReasons": [
"The applicant is also the electric distribution utility, so ordinary utility-customer rebates may be ineligible or administratively conflicted.",
"The site is an office/admin headquarters, not a residential, agricultural, or education facility.",
"Square footage is unknown and should not be inferred just to make building-size formulas calculate.",
"Exploring-stage projects should not be treated as having submitted applications, received preapproval, or obtained binding quotes.",
"Biomass, biogas, small wind, CHP, and thermal energy storage are plausible technology categories in the database but are weak fits for this specific headquarters profile without additional evidence.",
"Out-of-state DSIRE opportunities already present in the fixture should remain suppressed for the AZ site.",
"Tribal/public ownership may improve relevance for some resilience grants but does not by itself prove grant eligibility or award probability."
]
}

