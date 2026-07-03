{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "boise-coop-north-end",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied Boise Co-op North End test-case facts. Public/context facts already present in the source profile identify a Boise grocery co-op at 888 W Fort Street with Idaho Power electric service, Intermountain Gas service, 26,000 square feet, refrigeration, prepared foods, and NAICS 445110.  Project values below are realistic defaults for grant-estimation tests, not source-backed grant eligibility determinations.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is described as a commercial grocery co-op with Idaho Power electric service."
},
{
"inputKey": "idaho_power_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility profile self-reports Idaho Power as the electric provider."
},
{
"inputKey": "intermountain_gas_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form lists Intermountain Gas Company as gas provider."
},
{
"inputKey": "nonprofit_501c3_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A consumer grocery co-op operating taxable retail sales should not be treated as a tax-exempt nonprofit without documentation."
},
{
"inputKey": "public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is a commercial grocery business, not a municipality, school district, state agency, or other public entity."
},
{
"inputKey": "school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a grocery retail facility, not an education campus."
},
{
"inputKey": "tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Nothing in the supplied profile indicates tribal ownership or tribal government control."
},
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility sells groceries and prepared foods; it is not modeled as a farm, ranch, or primary agricultural production site."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No delivery fleet or owned vehicle fleet is described in the test case."
},
{
"inputKey": "disadvantaged_community_designation",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The normalized profile has no census tract or designation data, so location-based equity adders should not be assumed."
},
{
"inputKey": "ownership_relationship",
"value": "unknown_possible_related_ownership_entity",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form says ownership is not sure and the tax facts indicate possible related ownership entity."
},
{
"inputKey": "landlord_consent_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Because ownership/control is not confirmed, capital measures affecting the building shell, roof, HVAC, or electrical service should require owner authorization."
},
{
"inputKey": "annual_kwh",
"value": 1000000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile gives annual electricity use of 1,000,000 kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 9500000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile gives annual electric cost of $95,000."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 1785000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries give annual gas cost of $17,850."
},
{
"inputKey": "facility_operating_schedule",
"value": "extended_retail_hours_7_days",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grocery store with refrigeration and prepared foods usually operates long daily hours and has continuous refrigeration loads."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object lists the stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile has modeled retrofit previews but no contractor bids, purchase orders, or equipment cut sheets."
},
{
"inputKey": "preapproval_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No incentive application or preapproval record is provided, so programs requiring preapproval should remain pending or suppressed."
},
{
"inputKey": "audit_or_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No ASHRAE audit, refrigeration assessment, solar feasibility study, or engineering study is present in the test case."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace remaining fluorescent and older display lighting with interior LED fixtures and controls in sales floor, prep areas, back-of-house, and refrigerated display areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost as a small initial lighting bundle rather than a full-store relight."
},
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the preview assumption for a limited fixture replacement package."
},
{
"inputKey": "annual_operating_hours",
"value": 5200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Extended grocery hours support high lighting runtime but not necessarily 24/7 operation for all fixtures."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy controls in stockrooms, offices, and prep areas are realistic add-ons."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The current record has no vendor quote or fixture schedule."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Most utility lighting incentives require preapproval, eligible DLC/qualified equipment, and itemized fixture counts.",
"Admin preview quantity is small for a 26,000-square-foot grocery store, so estimates should avoid overstating a full-store project."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop units serving sales floor and back-of-house spaces with high-efficiency heat pump or gas/electric packaged units where compatible with existing ductwork.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a modest partial HVAC replacement package."
},
{
"inputKey": "hvac_unit_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two packaged units is realistic for a partial upgrade at a 26,000-square-foot grocery."
},
{
"inputKey": "existing_equipment_type",
"value": "packaged_rooftop_units_mixed_gas_electric",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Common for commercial grocery buildings, but not confirmed by bills or equipment inventory."
},
{
"inputKey": "replacement_equipment_type",
"value": "high_efficiency_packaged_heat_pump_or_rtus",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The exact equipment path should be chosen after load review, refrigerant constraints, and gas/electric economics."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 20,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 20-ton partial replacement is plausible but requires equipment schedule confirmation."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No HVAC quote, AHRI certificate, efficiency rating, or model numbers are present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on equipment efficiency ratings, baseline condition, and whether Idaho Power or gas incentives apply.",
"If replacing failed equipment, some programs may limit incentives or require preapproval before purchase."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "Install networked thermostats and limited zoning/scheduling controls for retail, office, prep, and back-of-house HVAC zones.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 100600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a controls-only package."
},
{
"inputKey": "thermostat_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Six controlled zones is plausible for a small grocery with sales, prep, office, and storage areas."
},
{
"inputKey": "existing_controls",
"value": "manual_or_basic_programmable",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumed only for test-case realism; actual BAS/controls status is unknown."
},
{
"inputKey": "demand_response_capable",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Networked thermostats could be demand-response capable, but program enrollment is not confirmed."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No controls proposal or device schedule is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Often eligible only as a prescriptive thermostat/control measure or as part of a custom project.",
"Demand-response or load-management incentives require utility enrollment and metering confirmation."
]
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"projectScopeSummary": "Seal and insulate accessible rooftop and back-of-house ductwork serving packaged HVAC units.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 147200,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a limited duct sealing package."
},
{
"inputKey": "duct_linear_feet_treated",
"value": 420,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial treatment quantity is plausible but needs contractor measurement."
},
{
"inputKey": "duct_location",
"value": "accessible_rooftop_and_back_of_house",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Common for packaged rooftop systems, but site configuration is not confirmed."
},
{
"inputKey": "diagnostic_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No duct leakage test, inspection, or photos are included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility may require measured leakage, utility-approved contractor, or inclusion in a custom energy-savings calculation.",
"Tenant or ownership consent may be needed for roof work."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Add insulation or air sealing in selected roof/ceiling or back-of-house envelope areas where accessible during maintenance.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a limited envelope package."
},
{
"inputKey": "treated_area_square_feet",
"value": 5000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Partial roof or back-of-house treatment is more realistic than assuming the entire grocery envelope is accessible."
},
{
"inputKey": "existing_r_value",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No roof assembly or insulation inspection is available."
},
{
"inputKey": "post_r_value",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The proposed insulation level must come from a quote or audit."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Commercial envelope incentives often require existing and proposed R-values and may be custom-only.",
"Savings may be modest relative to refrigeration and plug loads."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Explore whether a ground-source heat pump system could serve space conditioning loads, but do not assume practical feasibility for the grocery site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview amount, but this appears too low for a full commercial ground-source system at this site."
},
{
"inputKey": "geothermal_loop_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No borefield, well, land area, or hydronic distribution plan exists."
},
{
"inputKey": "feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ground-source feasibility requires engineering review and site constraints that are not present."
},
{
"inputKey": "owner_site_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership is unclear and subsurface work would require strong site-control evidence."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force geothermal qualification without feasibility, site control, and a real quote.",
"A grocery store in an urban commercial location may not have practical borefield space."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Consider a rooftop PV system sized conservatively to offset a portion of the grocery’s electric load, subject to roof condition, ownership consent, interconnection, and economics.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a moderate commercial rooftop solar project."
},
{
"inputKey": "dc_kw_capacity",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An 80 kW system is a conservative partial offset for a site using about 1,000,000 kWh per year."
},
{
"inputKey": "ac_kw_capacity",
"value": 65,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes typical inverter loading ratio for preliminary estimating."
},
{
"inputKey": "estimated_first_year_kwh",
"value": 105000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Rough planning estimate only; no solar production model or shading study is provided."
},
{
"inputKey": "roof_condition_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No roof age, condition, structural capacity, or remaining useful life is provided."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No Idaho Power interconnection application status is included."
},
{
"inputKey": "tax_credit_monetization_plan",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The entity’s tax appetite and financing structure are unknown."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Federal tax benefits may depend on tax ownership, prevailing wage/apprenticeship rules, domestic content, energy community status, and transferability decisions.",
"Do not assume state or local solar grants beyond formula-ready opportunities.",
"Ownership uncertainty should suppress estimates that require site control."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install a battery system for demand management and limited backup support for critical refrigeration and point-of-sale loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a small commercial battery project."
},
{
"inputKey": "battery_kwh_capacity",
"value": 160,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 160 kWh battery is plausible for demand management and short-duration support at a grocery using about 1,000,000 kWh annually."
},
{
"inputKey": "battery_kw_capacity",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Power capacity aligns with a small commercial demand-management system."
},
{
"inputKey": "paired_with_solar",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Battery economics and some incentives are stronger if paired with PV, but the actual project has not been selected."
},
{
"inputKey": "critical_loads_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No critical-load panel schedule or refrigeration backup requirement is present."
},
{
"inputKey": "utility_demand_response_enrollment",
"value": null,
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Demand-response or storage program participation cannot be assumed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Storage incentives often need interconnection, operational controls, and proof of eligible use.",
"Backup/resilience claims should remain unpriced until critical loads and runtime targets are defined."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "A full microgrid with solar, battery, controls, and critical-load islanding is treated as a future resilience concept rather than an active project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost, but a real grocery microgrid could vary substantially."
},
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A microgrid would require controls, but no design has been produced."
},
{
"inputKey": "islanding_capability_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Without islanding capability, this would be better treated as solar plus storage rather than a microgrid."
},
{
"inputKey": "engineering_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No protection study, one-line diagram, or utility coordination record exists."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Microgrid grant programs are often competitive and prioritize public, tribal, critical infrastructure, or disadvantaged-community sites.",
"A private grocery should not receive a probability-based grant estimate without a specific program fit and application status."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Explore refrigeration or HVAC load-shifting thermal storage only if a later engineering study shows demand-charge savings.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a conceptual thermal storage project."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 250,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small commercial thermal storage capacity is plausible but completely design-dependent."
},
{
"inputKey": "served_load_type",
"value": "refrigeration_or_hvac_load_shift",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The use case must be selected before estimating incentives."
},
{
"inputKey": "interval_load_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The current profile has annual kWh and costs, but no interval data or demand-charge detail."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Thermal storage should require custom engineering and interval data before any estimate.",
"The project is not a normal first-pass grocery retrofit unless demand charges are high and controls are feasible."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Evaluate solar thermal preheating for prepared foods, deli, dishwashing, and sanitation hot-water loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a small commercial solar water-heating system."
},
{
"inputKey": "collector_area_square_feet",
"value": 240,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Plausible small system size for prepared-food hot water, but load profile is unknown."
},
{
"inputKey": "storage_tank_gallons",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning assumption only; final sizing depends on hot-water usage."
},
{
"inputKey": "existing_water_heater_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Intermountain Gas service and prepared foods make gas water heating plausible, but equipment fuel is not confirmed."
},
{
"inputKey": "daily_hot_water_load_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Dishwashing and kitchen sanitation loads must be measured or estimated from operations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Solar thermal incentives require verified eligible equipment and hot-water load.",
"Roof condition and ownership consent remain unresolved."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "A CHP system is not treated as a normal recommendation for this grocery absent a large year-round thermal load and emissions/economic justification.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost for a conceptual CHP project."
},
{
"inputKey": "chp_kw_capacity",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small CHP unit might align with grocery baseload, but no thermal-load study supports it."
},
{
"inputKey": "useful_thermal_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "CHP viability requires consistent recovered-heat use, which is not documented."
},
{
"inputKey": "emissions_permitting_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion generation commonly requires permitting review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force CHP grants for a grocery without thermal-load evidence.",
"Many clean-energy programs may disfavor fossil-fueled CHP."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Do not model as an active project; a grocery co-op may generate organic waste but is not normally a host for biomass or biogas generation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only as a conceptual placeholder."
},
{
"inputKey": "onsite_biogas_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Retail food waste volume is unlikely to support an onsite biogas energy system."
},
{
"inputKey": "third_party_feedstock_contract",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feedstock agreement or digester host arrangement is included."
},
{
"inputKey": "renewable_fuel_interconnection_or_permit_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No permits, interconnection, or fuel supply details exist."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Organic waste collection or composting would be more realistic than onsite biomass generation.",
"Suppress biomass/biogas incentive estimates unless a real host project and feedstock plan are provided."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is treated as unrealistic for the North End urban grocery site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only to test suppression logic."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind assessment is present."
},
{
"inputKey": "zoning_clearance_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Urban small-wind installations require zoning, height, setback, and neighbor-impact review."
},
{
"inputKey": "turbine_kw_capacity",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No selected turbine or wind resource exists."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Urban grocery location makes small wind unlikely.",
"Suppress estimates unless the user provides a real turbine design and site approval."
]
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"projectScopeSummary": "Limited relevance only if the prepared-food operation has in-house towel, apron, or mop laundry; otherwise this should not be a primary project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 307600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost for a small commercial washer/dryer replacement."
},
{
"inputKey": "commercial_clothes_washer_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A single on-premise laundry unit is possible but not confirmed for a grocery."
},
{
"inputKey": "laundry_is_core_site_load",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Laundry is not a core grocery-retail load and should not drive major estimates."
},
{
"inputKey": "water_heating_fuel_for_laundry",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No laundry or water-heating equipment details are supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could qualify for a prescriptive appliance rebate only if equipment exists and is being replaced.",
"Do not include in a major grant total without confirming onsite laundry."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": null,
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied existing opportunity-specific input already suppresses this because the Idaho grocery co-op is not a Washington solar manufacturing taxpayer."
}
],
"reasoning": "Keep suppressed; do not fabricate Washington solar manufacturing tax facts."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "ac_kw_capacity",
"value": null,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied existing input already suppresses this Rhode Island renewable property-tax workflow for an Idaho site."
}
],
"reasoning": "Keep suppressed because the site is in Idaho, not Rhode Island."
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
"reasoning": "The supplied existing input already states that the Michigan Renewable Energy Renaissance Zone workflow does not apply."
}
],
"reasoning": "Keep suppressed because the site is in Idaho, not Michigan."
},
{
"opportunityId": "IDAHO_POWER_COMMERCIAL_LIGHTING_PRESCRIPTIVE_OR_CUSTOM",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Commercial customer class is consistent with the source profile."
},
{
"inputKey": "eligible_fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Use the LED preview count until a fixture schedule is supplied."
},
{
"inputKey": "itemized_lighting_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor lighting quote is in the test case."
},
{
"inputKey": "preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval documentation is present."
}
],
"reasoning": "Lighting is a realistic utility-incentive project for a grocery, but should not calculate beyond formula-ready rules without qualified equipment, quantities, and preapproval status."
},
{
"opportunityId": "IDAHO_POWER_COMMERCIAL_HVAC_OR_CUSTOM_EFFICIENCY",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "hvac_unit_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Partial packaged-unit replacement is plausible."
},
{
"inputKey": "equipment_efficiency_rating",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Efficiency ratings and model numbers are needed for prescriptive or custom incentive calculations."
},
{
"inputKey": "baseline_equipment_operational",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Early replacement versus replace-on-burnout status affects eligibility and savings."
}
],
"reasoning": "HVAC replacement is realistic, but estimate should require actual equipment efficiency and project status."
},
{
"opportunityId": "IDAHO_POWER_COMMERCIAL_CUSTOM_REFRIGERATION_OR_CONTROLS",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "refrigeration_load_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source description explicitly mentions refrigeration."
},
{
"inputKey": "measure_scope",
"value": null,
"valueType": "array",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No refrigeration measure, such as case doors, ECM motors, controls, heat reclaim, or condenser upgrades, is selected."
},
{
"inputKey": "engineering_savings_calculation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Custom refrigeration incentives usually require site-specific savings calculations."
}
],
"reasoning": "Refrigeration is highly relevant to the building, but it is not one of the active retrofit previews and needs scope before calculation."
},
{
"opportunityId": "FEDERAL_COMMERCIAL_CLEAN_ENERGY_ITC_SOLAR_STORAGE",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "solar_dc_kw_capacity",
"value": 80,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning-size rooftop PV system for a partial offset."
},
{
"inputKey": "battery_kwh_capacity",
"value": 160,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning-size storage system paired with solar."
},
{
"inputKey": "eligible_basis_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Tax-credit basis must come from a real quote, contract, or placed-in-service cost."
},
{
"inputKey": "tax_owner",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership and financing structure are unknown."
},
{
"inputKey": "prevailing_wage_apprenticeship_compliance_plan",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Compliance plan must be confirmed before applying enhanced federal tax-credit assumptions."
}
],
"reasoning": "Solar/storage may be relevant, but tax-credit estimates should not be forced without ownership, basis, compliance, and financing facts."
},
{
"opportunityId": "USDA_REAP_RENEWABLE_ENERGY_OR_EFFICIENCY",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "rural_small_business",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The Boise urban address should not be assumed rural for REAP-style eligibility without a formal rural-area check."
},
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The grocery is modeled as a commercial retailer, not a farm or producer."
},
{
"inputKey": "project_type",
"value": "commercial_grocery_energy_efficiency_or_solar",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The relevant potential projects would be efficiency or solar, but rural eligibility is doubtful."
}
],
"reasoning": "Do not make a REAP-like grant positive for an urban Boise grocery unless a rural eligibility lookup and small-business facts support it."
},
{
"opportunityId": "DOE_OR_STATE_COMPETITIVE_RESILIENCE_MICROGRID",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grocery can be community-serving, but it is not automatically a designated critical facility."
},
{
"inputKey": "public_or_tribal_sponsor",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No public or tribal sponsor is identified."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No competitive grant application exists."
}
],
"reasoning": "Competitive resilience grants should remain suppressed without application status, public-interest scoring facts, and a defined microgrid design."
},
{
"opportunityId": "COMMERCIAL_WATER_OR_WASTEWATER_EFFICIENCY_REBATE",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries include annual water/sewer cost of $6,800."
},
{
"inputKey": "laundry_equipment_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Laundry equipment is not confirmed for the grocery."
},
{
"inputKey": "commercial_dishwashing_or_prep_water_measure_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A dishwashing, pre-rinse, or process-water measure would be more plausible but is not currently selected."
}
],
"reasoning": "Water efficiency may be relevant to prepared foods, but the current high-efficiency laundry retrofit should not be assumed eligible without confirming equipment."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "itemized_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers_and_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "utility_preapproval_confirmation",
"reason": "application not submitted"
},
{
"inputKey": "roof_condition_and_structural_capacity",
"reason": "needs user decision"
},
{
"inputKey": "owner_or_landlord_consent",
"reason": "needs user decision"
},
{
"inputKey": "solar_interconnection_approval",
"reason": "application not submitted"
},
{
"inputKey": "battery_critical_load_panel_schedule",
"reason": "needs user decision"
},
{
"inputKey": "interval_meter_data_or_demand_profile",
"reason": "needs user decision"
},
{
"inputKey": "geothermal_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "microgrid_engineering_study",
"reason": "source requires agency approval"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "rural_area_or_usda_reap_eligibility_confirmation",
"reason": "source requires agency approval"
},
{
"inputKey": "tax_credit_transfer_or_direct_pay_strategy",
"reason": "needs user decision"
},
{
"inputKey": "disadvantaged_community_or_energy_community_designation",
"reason": "source requires agency approval"
}
],
"doNotForceQualificationReasons": [
"The site is in Idaho, so Washington, Rhode Island, Michigan, California, Oregon, and other out-of-state opportunities should remain blocked unless geography is corrected.",
"The customer is a commercial grocery co-op, not a public entity, school, tribal entity, or agricultural producer based on the supplied facts.",
"Ownership and site-control status are unresolved, so roof, geothermal, microgrid, and major HVAC measures should require owner or landlord consent.",
"The profile has annual utility totals but no interval data, demand-charge detail, equipment inventory, or contractor quote.",
"Refrigeration is a major load and likely a good custom-efficiency target, but no refrigeration retrofit scope has been selected.",
"Ground-source geothermal, microgrid, thermal storage, CHP, biomass/biogas, and small wind are conceptual or unlikely for this urban grocery and should not be made positive merely because generic opportunity matches exist.",
"Laundry equipment is not a core grocery load and should not be assumed present or eligible without user confirmation.",
"Competitive grants should not receive probability-based estimates without a submitted application, scoring facts, agency approval, or source-backed probability evidence."
]
}

