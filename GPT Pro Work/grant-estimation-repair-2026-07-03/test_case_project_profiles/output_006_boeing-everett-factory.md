{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "boeing-everett-factory",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for an enormous owned aerospace manufacturing campus in Snohomish PUD electric and Puget Sound Energy gas territory, based on the supplied test case context. Publicly recognizable facility facts are used only for basic context; grant qualification is not forced. Source: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile is a private industrial aerospace manufacturing facility, not a nonprofit applicant."
},
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is operated by a private corporation, so public-entity-only grants should not calculate."
},
{
"inputKey": "organization_is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity is commercial aircraft assembly and manufacturing, not education."
},
{
"inputKey": "organization_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, tribal government, or tribal enterprise facts are present in the supplied test case."
},
{
"inputKey": "organization_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The NAICS and activity profile are aircraft manufacturing, so agricultural-producer programs should be suppressed."
},
{
"inputKey": "organization_is_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source profile states 1,000+ employees and describes an enormous manufacturing complex."
},
{
"inputKey": "facility_is_owner_occupied",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists ownership status as Own and the normalized profile marks the ownership relationship as owner."
},
{
"inputKey": "electric_utility_customer_class",
"value": "large_industrial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual electric consumption of 126,000,000 kWh and the aircraft manufacturing use case strongly indicate a large industrial account, but the actual tariff should be confirmed from bills."
},
{
"inputKey": "gas_utility_customer_class",
"value": "large_commercial_or_industrial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is very large for a process-heavy manufacturing campus, but exact PSE gas schedule is not provided."
},
{
"inputKey": "has_interval_meter_data_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A facility this large likely has interval data, but the supplied test case does not confirm access to interval electric or gas data."
},
{
"inputKey": "annual_kwh",
"value": 126000000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric consumption is supplied in the site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 864600000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric cost is supplied as $8,646,000 in the site energy profile."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 699280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is supplied as $6,992,800 in the utility summaries."
},
{
"inputKey": "grant_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring; there is no evidence of submitted grant applications or utility preapproval."
},
{
"inputKey": "utility_preapproval_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Most utility custom incentives for a site like this require preapproval, and no preapproval status is supplied."
},
{
"inputKey": "procurement_stage",
"value": "pre_rfp_or_conceptual",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source project stage is exploring and the current retrofit previews use admin-modeled values rather than quotes."
},
{
"inputKey": "requires_custom_engineering_review",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_building_size",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is unusually large and process-heavy, so most meaningful energy projects require custom engineering review rather than deemed small-business calculations."
},
{
"inputKey": "prevailing_wage_or_federal_compliance_review_needed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Some federal or state grants may trigger compliance requirements, but no specific application or funding source has been selected."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Targeted high-bay and task-lighting LED replacement in selected production, warehouse, and logistics zones rather than a full 4.28 million square foot campus conversion.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 16042500,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Carries forward the current admin-modeled preview cost of $160,425 for a limited-scope lighting measure."
},
{
"inputKey": "fixture_count",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small pilot or zone-level retrofit is more realistic for the provided cost than a whole-campus lighting replacement."
},
{
"inputKey": "fixture_type",
"value": "industrial_high_bay_and_linear_led",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Industrial aircraft assembly and warehousing areas commonly use high-bay and linear lighting."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 410000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited lighting retrofit could produce meaningful savings, but fixture wattage, baseline equipment, and operating hours are not confirmed."
},
{
"inputKey": "utility_preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A large industrial custom or semi-custom utility incentive should normally be held until utility preapproval is confirmed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely utility-custom rather than grant-funded.",
"Requires existing fixture counts, baseline wattage, proposed wattage, and utility preapproval.",
"Whole-campus extrapolation should not be performed from this limited pilot scope."
]
},
{
"retrofitTypeId": "energy_management_system",
"projectScopeSummary": "Industrial energy management system expansion integrating major electric meters, compressed-air monitoring, HVAC controls, process ventilation schedules, and production-area dashboards.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 25440000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $254,400 for a partial energy-management and submetering deployment."
},
{
"inputKey": "covered_floor_area_sqft",
"value": 850000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A first phase covering roughly one-fifth of the very large campus is more realistic than assuming complete campus coverage."
},
{
"inputKey": "meter_or_submeter_points",
"value": 85,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large industrial sites often need many submeters and data points for actionable monitoring, but the exact controls architecture is unknown."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 1260000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately 1% annual electric savings from improved scheduling, monitoring, and fault detection; this should remain conservative and unconfirmed."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case does not include an M&V plan, which many custom incentives would require."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Best handled as a custom industrial efficiency project.",
"Savings should not calculate without a baseline, M&V plan, and eligible-cost breakdown.",
"Grant totals may be suppressed until agency or utility review confirms eligibility."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Selective replacement of aging packaged rooftop or air-handling equipment serving office, support, and logistics areas; not a full replacement of process ventilation systems.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 79800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $798,000 for a targeted HVAC replacement package."
},
{
"inputKey": "hvac_unit_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight large units is plausible for a limited scope at the stated project cost."
},
{
"inputKey": "total_nominal_cooling_tons",
"value": 560,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes average 70-ton units for a limited package; equipment schedules are needed for grant calculations."
},
{
"inputKey": "baseline_equipment_condition",
"value": "end_of_life_or_major_repair",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large industrial sites usually replace selected units as they age, but the fixture does not include actual equipment age."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The current project is exploring and no vendor quote or equipment schedule is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely eligible only through utility custom or prescriptive commercial HVAC channels, not residential programs.",
"Requires exact equipment type, efficiency ratings, capacity, baseline, and preapproval.",
"Process ventilation and production-critical systems may need special review."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Electrification pilot replacing gas-fired heating in selected office/support zones with high-efficiency heat pump systems while leaving core industrial process heating unchanged.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 117200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $1,172,000 for a targeted heat-pump retrofit."
},
{
"inputKey": "heated_area_served_sqft",
"value": 180000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited office/support-zone electrification scope is more plausible than converting the full industrial campus."
},
{
"inputKey": "estimated_gas_therms_reduced",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual therms are not supplied and process versus space-heating gas use is unknown."
},
{
"inputKey": "estimated_incremental_kwh",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrification increases electric load; the estimate needs modeled heating loads and equipment COP."
},
{
"inputKey": "electrical_service_capacity_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is large, but capacity for new heating loads must be verified by engineering."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for electrification or decarbonization programs if the scope replaces fossil space heating.",
"Should remain suppressed until gas baseline, incremental electric load, and eligible cost are documented.",
"Not all process or high-bay industrial heating is a good fit for standard commercial heat-pump programs."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Targeted roof or wall insulation repair in selected office, warehouse, and support spaces, likely coordinated with roof work rather than broad production-bay envelope replacement.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 31600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $316,000 for a limited envelope improvement."
},
{
"inputKey": "insulated_area_sqft",
"value": 52000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 52,000 square foot envelope scope is plausible at this cost but requires a takeoff."
},
{
"inputKey": "assembly_type",
"value": "roof_or_wall_section",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The exact envelope component is not identified in the test case."
},
{
"inputKey": "existing_r_value",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing insulation performance is required for many envelope calculations."
},
{
"inputKey": "proposed_r_value",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The proposed assembly performance should come from a contractor scope or design document."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May qualify for utility custom incentives only if savings are modeled and preapproved.",
"Many envelope grants are residential, small commercial, public-sector, or low-income targeted and should not be forced to qualify.",
"Industrial production areas may have unusual ventilation and infiltration loads that complicate deemed savings."
]
},
{
"retrofitTypeId": "waste_heat_recovery",
"projectScopeSummary": "Engineering-led recovery of compressor, process, or exhaust heat for preheating ventilation air or domestic/process hot water in selected manufacturing support systems.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 63600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $636,000 for a targeted waste-heat recovery project."
},
{
"inputKey": "waste_heat_source",
"value": "compressed_air_or_process_exhaust",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Aerospace manufacturing sites commonly have compressed air and process exhaust loads, but the exact waste-heat source is not specified."
},
{
"inputKey": "estimated_annual_energy_savings_mmbtu",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings depend on measured heat source temperature, hours, recoverable flow, and useful heat sink."
},
{
"inputKey": "engineering_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study is supplied, so savings and eligibility should remain provisional."
},
{
"inputKey": "process_safety_review_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Process-adjacent heat recovery at an aerospace manufacturing facility would require operational and safety review."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Strong candidate for custom industrial energy efficiency review.",
"Should not calculate from deemed assumptions alone.",
"Requires engineering study, M&V approach, production schedule, and useful-heat verification."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Industrial energy study covering compressed air, process ventilation, heat recovery, major HVAC systems, controls, and electrification screening.",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 28500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $285,000 study is plausible for a highly complex multi-system industrial facility."
},
{
"inputKey": "study_scope",
"value": [
"compressed_air",
"process_ventilation",
"waste_heat_recovery",
"energy_management_system",
"space_heating_electrification",
"measurement_and_verification_plan"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These systems align with the facility type and the retrofit options already surfaced in the test case."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is in exploring stage, and no study vendor or proposal is provided."
},
{
"inputKey": "utility_study_preapproval_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility study preapproval or incentive reservation is included in the test case."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Feasibility-study incentives often require utility or agency authorization before work begins.",
"Estimate should remain needs_application_status or needs_quote until study scope and preapproval are confirmed."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Conceptual geothermal screening only for a limited office/support building portion; full-campus ground-source conversion is not realistic at the preview scale.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 157600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $1,576,000, which is consistent with a small pilot rather than a whole-factory geothermal system."
},
{
"inputKey": "geothermal_system_capacity_tons",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ground-loop design, thermal conductivity, and heating/cooling loads are not available."
},
{
"inputKey": "ground_loop_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The huge built-out industrial campus makes ground-loop feasibility uncertain without site investigation."
},
{
"inputKey": "served_area_sqft",
"value": 60000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited pilot serving office or support space is more realistic than assuming the entire factory is served."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Possible in theory, but not a likely near-term grant project without a feasibility study.",
"Should remain needs_project_scope or needs_quote.",
"Do not extrapolate geothermal eligibility across the full manufacturing complex."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Conceptual rooftop or canopy solar screening only; structural, interconnection, load, and corporate procurement constraints are unresolved.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1000000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $10,000,000 for a large but still partial on-site solar concept."
},
{
"inputKey": "solar_dc_capacity_kw",
"value": 3500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "3.5 MWdc is plausible for a large industrial site but is not derived from a structural survey or interconnection application."
},
{
"inputKey": "expected_annual_solar_kwh",
"value": 3850000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately 1,100 kWh per kWdc per year in western Washington; should be replaced by a modeled production estimate."
},
{
"inputKey": "roof_structural_capacity_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar eligibility and cost depend on roof condition, structural capacity, and usable area."
},
{
"inputKey": "interconnection_application_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application is identified in the supplied test case."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Solar tax/grant treatment depends on corporate tax appetite, ownership model, interconnection, and project economics.",
"The existing tax facts explicitly identify no qualifying solar manufacturing B&O activity.",
"Do not confuse a solar installation with qualifying solar manufacturing activity."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal concept for domestic hot water or wash/process preheat in support areas, not a primary source for industrial process heat.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 68000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $680,000."
},
{
"inputKey": "collector_area_sqft",
"value": 2400,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 2,400 square foot collector area is plausible for a support-load solar thermal system but not backed by load data."
},
{
"inputKey": "annual_thermal_output_mmbtu",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal savings require hot-water load profile and system design."
},
{
"inputKey": "process_hot_water_load_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not confirm a suitable thermal load."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be technically possible but should not be assumed to qualify without load data.",
"Many solar thermal incentives are residential, small commercial, or capped in ways that may not fit this customer.",
"Should be suppressed until project scope and load are confirmed."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Conceptual CHP screening for critical process or campus thermal loads using natural gas; not assumed to be a decarbonization or grant-eligible project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1200000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $12,000,000."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 4000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 4 MW CHP plant is plausible for a large industrial site but must be justified by thermal baseload and interconnection review."
},
{
"inputKey": "useful_thermal_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost indicates possible thermal loads, but the useful thermal match for CHP is not confirmed."
},
{
"inputKey": "emissions_permitting_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A multi-MW combustion system would require air-quality and site permitting review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Natural-gas CHP may be disfavored or ineligible for many clean-energy grant programs.",
"Do not force a positive grant estimate without explicit program support.",
"Requires thermal-load study, emissions review, interconnection review, and resilience justification."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not a realistic near-term project for this aerospace manufacturing facility absent a dedicated biomass or biogas fuel source.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 900000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Carries the current preview cost of $9,000,000 but marks eligibility as unlikely."
},
{
"inputKey": "onsite_biomass_or_biogas_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Aircraft manufacturing does not normally produce a reliable organic fuel stream for biomass or biogas energy."
},
{
"inputKey": "third_party_fuel_supply_contract_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No offsite biomass or biogas supply contract is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not relevant to this profile.",
"Should be suppressed unless the customer identifies a fuel source, emissions pathway, and actual project developer."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not a realistic project for this dense industrial aerospace campus without a wind resource study, siting approval, and aviation/airspace review.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 800000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Carries the current preview cost of $8,000,000 but marks the project as unlikely."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind resource assessment is included in the test case."
},
{
"inputKey": "aviation_or_airspace_constraints_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The aerospace manufacturing context makes airspace, safety, and operational constraints especially likely."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate grant value from generic renewable-energy assumptions.",
"Requires wind study, siting approval, interconnection review, and aviation safety review.",
"Likely not relevant compared with efficiency and industrial energy-management measures."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Limited refrigeration upgrade for cafeterias, labs, or parts/materials storage rather than core manufacturing process systems.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 34500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $345,000."
},
{
"inputKey": "refrigerated_cases_or_equipment_count",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited count of commercial refrigeration assets is plausible for a large workplace campus, but the facility is not primarily a refrigeration facility."
},
{
"inputKey": "equipment_serves_core_business_process",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Refrigeration is likely ancillary at this site unless the user confirms specialized materials storage."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially eligible for small prescriptive utility incentives if exact equipment qualifies.",
"Not likely to be a major grant project for this profile.",
"Requires equipment list and invoices or quotes."
]
},
{
"retrofitTypeId": "anti_sweat_heater_controls",
"projectScopeSummary": "Ancillary refrigeration controls only, likely for cafeteria or convenience retail-style refrigerated cases on campus.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9480000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $94,800."
},
{
"inputKey": "controlled_doors",
"value": 64,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large campus may have multiple cafeteria or support refrigeration assets, but count is not supplied."
},
{
"inputKey": "existing_controls_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Eligibility depends on whether anti-sweat heaters are currently uncontrolled or inefficiently controlled."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be eligible for a small prescriptive utility incentive but should not drive major grant estimates.",
"Requires case-door count and baseline controls confirmation."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "Zoning and schedule-control improvements for office/support areas, not small-business thermostat replacement across the production floor.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10060000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the current preview cost of $100,600."
},
{
"inputKey": "thermostat_or_zone_count",
"value": 72,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large facility may have many zones, but the count is not confirmed."
},
{
"inputKey": "integrates_with_existing_bms",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large industrial facilities often have building management systems, but compatibility is not specified."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Simple smart-thermostat rebates are often designed for residential or small commercial sites.",
"For this profile, controls should be treated as custom BMS/EMS work instead.",
"Avoid counting both this measure and the energy-management-system measure unless scope boundaries are explicit."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "none_identified_non_solar_aircraft_manufacturing",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing tax opportunity facts already specify no qualifying solar manufacturing activity."
},
{
"inputKey": "qualifying_tax_base_after_deductions_and_matc_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Aircraft manufacturing should not be treated as qualifying solar manufacturing in this fixture."
}
],
"reasoning": "Do not create a positive Washington solar manufacturing B&O estimate for an aircraft manufacturing facility merely because the facility is evaluating solar PV."
},
{
"opportunityId": "SNOHOMISH_PUD_CUSTOM_INDUSTRIAL_EFFICIENCY",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "electric_utility_provider",
"value": "Snohomish County Public Utility District",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies Snohomish PUD as the electric utility."
},
{
"inputKey": "customer_class",
"value": "large_industrial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large annual kWh and manufacturing use support large industrial treatment, pending utility bill confirmation."
},
{
"inputKey": "utility_preapproval_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval is present, so custom utility incentives should not be included as confirmed."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Custom industrial incentives require engineering-supported savings."
}
],
"reasoning": "Lighting, EMS, HVAC, compressed air, and waste-heat measures may fit a custom industrial utility pathway, but estimates should remain suppressed or provisional until preapproval, baseline, and savings calculations exist."
},
{
"opportunityId": "PUGET_SOUND_ENERGY_CUSTOM_GAS_EFFICIENCY",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "gas_utility_provider",
"value": "Puget Sound Energy",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies Puget Sound Energy as the gas provider."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 699280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The utility summary supplies annual gas cost."
},
{
"inputKey": "annual_therms",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas therms are not supplied even though the available field list supports them."
},
{
"inputKey": "gas_efficiency_measure_type",
"value": [
"heat_recovery",
"space_heating_electrification",
"controls",
"process_heat_optimization"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These gas-related measure categories are plausible for a large industrial facility."
}
],
"reasoning": "Gas efficiency or electrification opportunities may exist, but the test case lacks annual therms, measure-level therm savings, and project-specific eligible cost."
},
{
"opportunityId": "FEDERAL_OR_STATE_INDUSTRIAL_DECARBONIZATION_GRANT_GENERIC",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "manufacturing_naics_code",
"value": "336411",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form includes NAICS 336411."
},
{
"inputKey": "project_reduces_process_emissions",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No specific process-emissions reduction project has been defined."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application is present in the profile."
}
],
"reasoning": "The facility is industrial and energy-intensive, but competitive industrial grants should not be estimated without a defined scope, solicitation fit, emissions baseline, and evidence of application readiness."
},
{
"opportunityId": "RESIDENTIAL_OR_LOW_INCOME_ENERGY_REBATE_GENERIC",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "building_type",
"value": "industrial_manufacturing",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile identifies the site as industrial manufacturing."
},
{
"inputKey": "is_residential_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project site is an aerospace manufacturing facility."
}
],
"reasoning": "Residential, low-income household, and multifamily incentives should be blocked for this profile."
},
{
"opportunityId": "PUBLIC_SECTOR_OR_SCHOOL_ENERGY_GRANT_GENERIC",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a private industrial facility."
},
{
"inputKey": "organization_is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity is aircraft manufacturing and assembly."
}
],
"reasoning": "School, municipal, state-agency, and public-building grants should be suppressed unless the applicant entity changes."
},
{
"opportunityId": "USDA_RURAL_OR_AGRICULTURAL_ENERGY_GENERIC",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "organization_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is aircraft manufacturing, not agricultural production."
},
{
"inputKey": "project_site_activity",
"value": "commercial_aircraft_assembly_and_manufacturing",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied test case describes commercial aircraft assembly, manufacturing, testing, offices, warehousing, and logistics."
}
],
"reasoning": "Agricultural energy grants should not qualify for this customer."
},
{
"opportunityId": "EV_CHARGING_INFRASTRUCTURE_GENERIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "fleet_owner",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large campus may operate fleets or employee charging, but no EV project is listed in the current retrofit summaries."
},
{
"inputKey": "charger_ports",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No EV charging scope or port count is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "EV charging incentives require charger count, charger type, make-ready costs, and utility review."
}
],
"reasoning": "Do not create an EV-charging grant estimate from the facility size alone; no EV project is in scope."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "vendor_quote_cents_by_measure",
"reason": "quote not available"
},
{
"inputKey": "utility_custom_incentive_preapproval_letter",
"reason": "application not submitted"
},
{
"inputKey": "measure_level_annual_kwh_savings",
"reason": "source requires agency approval"
},
{
"inputKey": "measure_level_annual_therm_savings",
"reason": "source requires agency approval"
},
{
"inputKey": "annual_therms",
"reason": "needs user decision"
},
{
"inputKey": "monthly_peak_kw",
"reason": "needs user decision"
},
{
"inputKey": "electric_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "gas_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "interconnection_study_or_queue_position",
"reason": "application not submitted"
},
{
"inputKey": "solar_roof_structural_assessment",
"reason": "quote not available"
},
{
"inputKey": "waste_heat_recovery_engineering_study",
"reason": "quote not available"
},
{
"inputKey": "grant_award_probability",
"reason": "source requires agency approval"
},
{
"inputKey": "competitive_grant_application_score",
"reason": "source requires agency approval"
},
{
"inputKey": "prevailing_wage_compliance_determination",
"reason": "needs user decision"
},
{
"inputKey": "federal_tax_credit_monetization_strategy",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The customer is a private aerospace manufacturer, not a nonprofit, school, public entity, tribal entity, agricultural producer, or residential applicant.",
"The facility is enormous and process-heavy, so many measures require custom engineering rather than deemed savings.",
"The project stage is exploring; there is no evidence of grant applications, utility preapproval, interconnection approval, or vendor quotes.",
"Public-power electric service and separate gas service make utility-specific program matching important; do not assume a single utility rebate pathway.",
"Solar installation concepts should not be confused with qualifying solar manufacturing tax classifications.",
"Biomass, biogas, small wind, geothermal, and CHP should not be forced into positive estimates without site-specific feasibility evidence.",
"Residential, multifamily, school, municipal, agricultural, and small-business blockers are expected and should remain active for this profile.",
"Competitive federal or state industrial grants require a defined scope, emissions baseline, match funding, application status, and agency review; facility size alone is not qualification evidence."
]
}

