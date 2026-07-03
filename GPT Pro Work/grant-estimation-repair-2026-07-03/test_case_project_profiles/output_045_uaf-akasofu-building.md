{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "uaf-akasofu-building",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment for the uploaded Akasofu Building test case. Inputs are intended to help grant-estimation logic calculate, suppress, or defer estimates based on realistic public-university project conditions, cold-climate constraints, and missing quote/application data. Source prompt: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object already identifies the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_design_scoping",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public university research building considering multiple retrofit options would typically begin with feasibility scoping before formal design, bid, or grant application."
},
{
"inputKey": "applicant_entity_type",
"value": "state_public_university",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the organization as the University of Alaska Fairbanks and as a Government / Public Agency."
},
{
"inputKey": "is_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization type is listed as Government / Public Agency."
},
{
"inputKey": "is_state_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A University of Alaska Fairbanks facility is treated synthetically as a state public university property for grant-screening purposes."
},
{
"inputKey": "is_k12_school",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a higher-education campus building, not a K-12 school."
},
{
"inputKey": "is_higher_education_institution",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "NAICS 611310 and the UAF context indicate a college/university facility."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, tribal applicant, or tribal governance fact is present in the supplied test case."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity is arctic research, institutional offices, weather service functions, library, and university operations, not agricultural production."
},
{
"inputKey": "is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a public university facility, not a private small business."
},
{
"inputKey": "utility_customer_class",
"value": "nonresidential_public_institution",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 100,000-square-foot university research and office building would generally be served as a nonresidential institutional electric account."
},
{
"inputKey": "electric_utility_provider_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile marks Golden Valley Electric Association as self-reported and unverified."
},
{
"inputKey": "owns_building",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists ownership status as Own."
},
{
"inputKey": "site_control_years_remaining",
"value": 20,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public university ownership supports long-term site control, but the exact capital planning horizon is not documented."
},
{
"inputKey": "property_tax_exempt_status",
"value": "state_university_property_exempt",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic tax facts identify the property tax status as state university property exempt."
},
{
"inputKey": "district_heat_or_campus_utility_allocation_status",
"value": "requires_facilities_allocation_review",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic tax facts indicate district heat or campus utility allocation requires facilities review, which should limit confidence in thermal project estimates."
},
{
"inputKey": "critical_facility_or_resilience_function",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building includes arctic research, institutional operations, and weather service functions in Fairbanks, making resilience a plausible planning driver."
},
{
"inputKey": "annual_kwh",
"value": 1965000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied siteEnergyProfile provides annual electric consumption."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 50107500,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied siteEnergyProfile provides annual electric cost of $501,075."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 51112500,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries include annual gas cost, but district heat/campus allocation uncertainty may affect direct attribution."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 25.5,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied siteEnergyProfile provides an average electricity price of $0.255/kWh."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Early feasibility concept for a small biomass boiler or biomass-assisted campus thermal system serving part of the Akasofu Building heating load, dependent on campus heat integration, fuel supply, emissions review, and agency funding-cycle approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $90,000."
},
{
"inputKey": "system_capacity_kw_thermal",
"value": 150,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 150 kW thermal pilot-scale system is plausible for partial-load institutional heating, but building-specific heating load and campus plant integration are unknown."
},
{
"inputKey": "serves_primary_heating_load",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At the modeled cost and capacity, this would likely be a pilot or supplemental system rather than the main heating plant for a 100,000-square-foot Fairbanks building."
},
{
"inputKey": "renewable_fuel_supply_contract_executed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fuel supply agreement is present; biomass grants commonly need credible feedstock and operations evidence."
},
{
"inputKey": "campus_heat_interconnection_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing facts flag campus utility allocation review as required."
},
{
"inputKey": "emissions_permitting_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion-based systems typically require emissions and siting review, and no such review is included in the test case."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely needs a formal feasibility study before any grant estimate should be shown.",
"Modeled project cost appears too small for a full institutional biomass system and too uncertain for formula-based grant calculation.",
"Fuel supply, permitting, and campus heat interconnection are missing."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Conceptual ground-source heat pump feasibility study for partial electrification of office/library zones or shoulder-season heating, with borefield sizing and district-heat displacement not yet confirmed.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $15,760."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The modeled cost supports only a small pilot-scale system, not a building-wide geothermal conversion for a 100,000-square-foot cold-climate facility."
},
{
"inputKey": "ground_loop_type",
"value": "vertical_closed_loop_unknown_feasibility",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Vertical closed-loop wells are a common urban/campus option, but no geotechnical, borefield, or available-land data is present."
},
{
"inputKey": "geothermal_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study is included, and cold-climate design uncertainty is material."
},
{
"inputKey": "district_heat_displacement_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing facts indicate district heat or campus utility allocation requires facilities review."
},
{
"inputKey": "eligible_engineering_study_cost_cents",
"value": 4500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $45,000 feasibility/design study is more realistic at this stage than relying on the small modeled implementation cost."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Should be handled as a study or feasibility-stage renewable thermal project unless a real quote and borefield design are provided.",
"Building-wide grant calculation should remain suppressed until scope, load served, and district heat displacement are confirmed."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install public or campus fleet Level 2 EV charging at the Akasofu Building parking area for university fleet, staff, visitors, and research operations; not assumed to meet corridor fast-charging requirements.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $8,480."
},
{
"inputKey": "charger_level",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled cost aligns with a small Level 2 deployment rather than DC fast charging."
},
{
"inputKey": "charging_ports",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two ports is a plausible small campus deployment at the preview cost."
},
{
"inputKey": "charging_station_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A dual-port Level 2 pedestal or wall-mounted station is plausible for an exploratory project."
},
{
"inputKey": "total_evse_kw",
"value": 15.4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two 7.7 kW Level 2 ports are a common conservative planning assumption."
},
{
"inputKey": "dc_fast_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The modeled cost is not consistent with NEVI-style DC fast charging infrastructure."
},
{
"inputKey": "located_on_alternative_fuel_corridor",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No corridor siting fact is provided, and this should not be inferred."
},
{
"inputKey": "public_access_hours_per_day",
"value": 10,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Daytime public or visitor access is plausible for a campus building, but exact access policy is unknown."
},
{
"inputKey": "fleet_owner",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public university campus is plausibly a fleet owner, but the specific Akasofu Building fleet allocation is not documented."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May qualify for campus or fleet EV infrastructure programs, but should not be treated as NEVI-corridor eligible without corridor, public-access, uptime, and DC fast-charging evidence.",
"The modeled cost suggests Level 2 chargers, not NEVI-compliant fast chargers."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small interior LED fixture replacement pilot in offices, library stacks, corridors, or research-support spaces; not a comprehensive whole-building lighting modernization.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $1,604.25."
},
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview assumptions identify 12 fixture replacements."
},
{
"inputKey": "measure_type",
"value": "interior_led_fixture_replacement",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small fixture count is most consistent with interior fixture replacements in selected spaces."
},
{
"inputKey": "controls_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled cost is low and does not suggest networked controls or full lighting redesign."
},
{
"inputKey": "annual_kwh_savings",
"value": 4200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small 12-fixture pilot could save several thousand kWh annually depending on wattage and operating hours; exact fixture specs are missing."
},
{
"inputKey": "utility_prescriptive_rebate_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No rebate or grant application status is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The project is too small and ordinary to expect a grant; it may be a utility rebate or internal maintenance project instead.",
"No matched grant opportunity is listed for this retrofit."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Targeted cold-climate envelope improvements such as air sealing, vestibule/weatherstripping repairs, attic or roof-penetration sealing, and selected thermal imaging follow-up for a university research/office building.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 194600,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $1,946."
},
{
"inputKey": "weatherization_project_type",
"value": "commercial_institutional_air_sealing",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building is nonresidential and institutional, so residential weatherization categories should not be applied."
},
{
"inputKey": "conditioned_floor_area_sqft",
"value": 100000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building square footage is supplied as 100,000 square feet."
},
{
"inputKey": "residential_household_income_eligible",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an education campus building, not a residential household."
},
{
"inputKey": "low_income_residential_units_served",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No residential units are present in the project description."
},
{
"inputKey": "energy_audit_required_before_weatherization",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a large cold-climate building, envelope scope should be informed by an audit or building assessment before grant calculation."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The matched LIHEAP opportunity should be suppressed because this is a nonresidential public university building, not a low-income household weatherization project.",
"Commercial/institutional envelope funding may exist, but no applicable matched grant formula is provided."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Resilience-oriented battery storage concept to support selected critical research, communications, controls, or weather-service loads during short outages, not full-building backup.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $72,800."
},
{
"inputKey": "battery_capacity_kwh",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 120 kWh battery is plausible at the modeled cost for partial critical-load backup, but real sizing requires load inventory and quote data."
},
{
"inputKey": "battery_power_kw",
"value": 60,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 60 kW inverter paired with 120 kWh storage is a conservative small commercial resilience assumption."
},
{
"inputKey": "critical_load_panel_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No critical load schedule or panel design is included."
},
{
"inputKey": "paired_with_new_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit list does not include a solar PV project for this site."
},
{
"inputKey": "resilience_objective",
"value": "short_duration_critical_load_backup",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Cold-climate resilience is mentioned in the test case, but full-building backup is unrealistic at the modeled cost."
},
{
"inputKey": "vendor_quote_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No battery quote or engineering estimate is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Resilience grants may require critical-load documentation, outage-risk analysis, and firm cost estimate.",
"Formula grant estimate should remain suppressed if the program requires paired renewable generation or formal agency approval."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Large combined heat and power concept for campus thermal and electric resilience, but project is only a conceptual placeholder and likely requires central plant coordination rather than building-only treatment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $120,000."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 80,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "At the modeled cost, only a small CHP unit is plausible; it would not serve the whole building."
},
{
"inputKey": "waste_heat_recovery_use_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No thermal integration design is supplied."
},
{
"inputKey": "natural_gas_service_confirmed_for_chp",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form lists Interior Gas Utility as gas provider, but exact service and pressure for CHP are not verified."
},
{
"inputKey": "campus_central_plant_coordination_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A CHP system in a campus building with possible district heat allocation would require facilities and central plant coordination."
},
{
"inputKey": "emissions_permitting_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion-based CHP normally requires air/emissions and interconnection review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A CHP project should not be forced into renewable-energy grants unless the program explicitly includes CHP and the fuel/emissions criteria are met.",
"The modeled cost is too low for a robust building-scale CHP project."
]
},
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "ASHRAE-style energy audit and resilience assessment for a 100,000-square-foot cold-climate research and office building, including utility allocation review and prioritization of envelope, HVAC, controls, EV charging, and storage measures.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 6500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $65,000 audit is plausible for a complex 100,000-square-foot research/institutional building in a remote cold-climate market."
},
{
"inputKey": "audit_level",
"value": "ashrae_level_2_with_resilience_screening",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An ASHRAE Level 2 audit with resilience screening fits the exploratory stage and building complexity."
},
{
"inputKey": "includes_campus_utility_allocation_review",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing facts identify district heat or campus utility allocation as requiring review."
},
{
"inputKey": "audit_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor selection or quote is present."
},
{
"inputKey": "measurement_and_verification_plan_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public-sector audit for grant planning would commonly include baseline and M&V recommendations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Audit grants or technical-assistance programs may be applicable, but calculation requires a specific matched program and eligible cost formula.",
"Audit should be used to unlock higher-confidence estimates for HVAC, envelope, storage, biomass, and geothermal options."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace selected aging air handlers, terminal units, controls, or ventilation components serving research/office zones with high-efficiency cold-climate-compatible equipment; not a full-building HVAC replacement.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $7,980."
},
{
"inputKey": "hvac_units_replaced",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The modeled cost supports only small components or a small number of units, not major air-handling equipment."
},
{
"inputKey": "includes_building_automation_controls",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview cost is too low to imply a major controls upgrade."
},
{
"inputKey": "annual_kwh_savings",
"value": 18500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview references modeled annual kWh reduction, but equipment-specific efficiency inputs are missing."
},
{
"inputKey": "annual_therm_savings",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas or district heat savings cannot be assigned confidently because thermal allocation is uncertain."
},
{
"inputKey": "equipment_specific_efficiency_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment specifications, efficiency ratings, or engineering schedule are included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This appears more like a maintenance or utility-rebate measure than a grant-ready capital project.",
"Energy savings and eligible costs should remain low-confidence until equipment type and thermal baseline are known."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind demonstration concept for campus research or education, not a proven cost-effective building energy project; would require wind resource, siting, structural, aviation, and interconnection review.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $80,000."
},
{
"inputKey": "wind_turbine_capacity_kw",
"value": 10,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 10 kW turbine is plausible at the preview cost as a demonstration-scale project."
},
{
"inputKey": "annual_generation_kwh",
"value": 18000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Generation is highly site-dependent; this value is a conservative placeholder and should not drive a final grant estimate."
},
{
"inputKey": "wind_resource_assessment_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study or production estimate is supplied."
},
{
"inputKey": "aviation_or_campus_siting_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Campus wind projects can raise siting, safety, and aviation review issues."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection status is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should not be estimated as a likely grant project without wind resource and siting evidence.",
"More plausible as a research/demonstration concept than an energy-savings retrofit."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal domestic hot water or lab-support preheat concept, likely limited by Fairbanks winter solar resource and uncertain year-round hot water load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $6,800."
},
{
"inputKey": "collector_area_sqft",
"value": 96,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small collector array is plausible at the modeled cost, but actual design is unknown."
},
{
"inputKey": "storage_tank_gallons",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small institutional preheat system might use a 120-gallon storage tank, but hot-water load is not documented."
},
{
"inputKey": "domestic_hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building includes offices, research, library, and weather-service functions; no significant domestic hot water load is confirmed."
},
{
"inputKey": "freeze_protection_design_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Fairbanks climate makes freeze protection a material design requirement."
},
{
"inputKey": "solar_access_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No roof, shading, or solar-access review is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should not be forced to qualify without hot-water load and cold-climate design evidence.",
"The modeled cost is small and likely not representative of a robust institutional solar thermal installation."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3080",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "applicant_is_government_or_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the applicant as a Government / Public Agency."
},
{
"inputKey": "project_site_state",
"value": "AK",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The structured address and normalized geo state code identify Alaska."
},
{
"inputKey": "renewable_energy_project_type",
"value": "undecided_multiple_concepts",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The matched retrofits include biomass, geothermal, and other renewable concepts, but no final technology selection is present."
},
{
"inputKey": "final_project_scope_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring and multiple retrofit concepts are listed."
},
{
"inputKey": "agency_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No application submission is included in the supplied facts."
},
{
"inputKey": "agency_award_or_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No grant award or preapproval is included in the supplied facts."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The renewable options are materially different and require a selected scope and quote before calculating a meaningful eligible cost."
}
],
"reasoning": "The Alaska Renewable Energy Grant Program match should remain possible for public-sector renewable concepts, but not calculated from generic preview costs until the university selects a project type, confirms eligible costs, and reaches the relevant application stage."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22666",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "project_site_state",
"value": "AK",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The structured address and normalized geo state code identify Alaska."
},
{
"inputKey": "evse_project_type",
"value": "campus_level_2_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project cost and likely campus use case align with Level 2 chargers."
},
{
"inputKey": "dc_fast_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The modeled $8,480 cost is not consistent with DC fast charging."
},
{
"inputKey": "nevi_corridor_compliant_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No alternative fuel corridor, DC fast charging, uptime, public-access, or NEVI-compliant site facts are present."
},
{
"inputKey": "public_access_24_7",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A university building parking installation is more likely limited by campus policies and operating conditions than guaranteed 24/7 corridor access."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview provides an upfront cost, but this cost should not be used for NEVI calculation if the project does not meet program scope."
}
],
"reasoning": "The NEVI opportunity should not be calculated for this synthetic campus Level 2 project unless the user later confirms DC fast charging, corridor siting, eligible public access, and formal application details."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "site_type",
"value": "education_campus",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile identifies the building type as education_campus."
},
{
"inputKey": "residential_household_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a public university research and office building."
},
{
"inputKey": "low_income_household_beneficiaries_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No low-income residential households or dwelling units are present in the test case."
},
{
"inputKey": "weatherization_scope_residential",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The scope is commercial/institutional air sealing for a university building."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "For LIHEAP-style residential assistance, the eligible cost for this nonresidential university project should be treated as zero."
}
],
"reasoning": "The matched LIHEAP opportunity should be suppressed as not relevant because the building is a nonresidential public university facility, not a low-income household or residential weatherization applicant."
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
"userOverrideAllowed": false,
"reasoning": "Existing opportunity-specific facts already suppress Michigan RERZ treatment because the site is in Alaska."
}
],
"reasoning": "Do not calculate or surface Michigan Renewable Energy Renaissance Zone benefits for an Alaska public university site."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "municipality",
"value": "Fairbanks, AK",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Existing opportunity-specific facts already suppress Rhode Island renewable property-tax valuation because the site is in Alaska."
}
],
"reasoning": "Do not calculate or surface Rhode Island property-tax valuation treatment for an Alaska public university site."
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
"userOverrideAllowed": false,
"reasoning": "Existing opportunity-specific facts already suppress Washington solar-manufacturing B&O treatment because the site is in Alaska and no solar manufacturing activity is present."
}
],
"reasoning": "Do not calculate or surface Washington solar-manufacturing tax treatment for this Alaska university research building."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "renewable_energy_grant_application_submitted",
"reason": "application not submitted"
},
{
"inputKey": "renewable_energy_grant_award_amount_cents",
"reason": "source requires agency approval"
},
{
"inputKey": "final_selected_retrofit_scope",
"reason": "needs user decision"
},
{
"inputKey": "vendor_quote_total_cost_cents",
"reason": "quote not available"
},
{
"inputKey": "eligible_project_cost_after_ineligible_items_cents",
"reason": "quote not available"
},
{
"inputKey": "district_heat_displacement_quantity",
"reason": "needs user decision"
},
{
"inputKey": "campus_utility_allocation_method",
"reason": "needs user decision"
},
{
"inputKey": "geothermal_borefield_design",
"reason": "quote not available"
},
{
"inputKey": "biomass_fuel_supply_contract",
"reason": "needs user decision"
},
{
"inputKey": "battery_critical_load_schedule",
"reason": "needs user decision"
},
{
"inputKey": "battery_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "nevi_corridor_designation_confirmation",
"reason": "source requires agency approval"
},
{
"inputKey": "nevi_dc_fast_charger_specification",
"reason": "unrealistic for this customer"
},
{
"inputKey": "liheap_household_income_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "residential_units_served",
"reason": "unrealistic for this customer"
},
{
"inputKey": "wind_resource_assessment",
"reason": "quote not available"
},
{
"inputKey": "solar_water_heating_load_profile",
"reason": "needs user decision"
},
{
"inputKey": "hvac_equipment_efficiency_schedule",
"reason": "quote not available"
}
],
"doNotForceQualificationReasons": [
"The site is in Alaska, so out-of-state tax programs for Michigan, Rhode Island, and Washington must remain suppressed.",
"The applicant is a public university research and office building, not a residential household; LIHEAP-style weatherization treatment should not be calculated.",
"The EV charger project is synthetically modeled as a small Level 2 campus installation and should not be treated as NEVI-eligible without DC fast-charging and corridor-compliance evidence.",
"The project is still exploring and has no submitted grant application, agency preapproval, or award documentation.",
"Preview costs are administrative placeholders and should not be treated as final eligible costs where a program requires quotes, engineering design, or agency cost review.",
"Thermal retrofits are materially uncertain because district heat or campus utility allocation requires facilities review.",
"Small wind and solar water heating are plausible research or demonstration concepts but should not be forced into positive estimates without resource, siting, load, and design evidence.",
"CHP should not be treated as renewable-energy grant-eligible unless a specific program rule includes CHP and the project satisfies emissions, fuel, and thermal-use requirements."
]
}

