{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "museum-life-science-durham",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for a Durham nonprofit science museum campus with indoor exhibits, outdoor water use, cafe, and animal-care loads. Inputs use the provided test-case facts and realistic planning assumptions, not grant-source research. Citation for supplied test-case prompt: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type",
"value": "nonprofit_501c3",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case identifies the customer as a nonprofit organization; nonprofit status is central to direct-pay and grant eligibility screening."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A nonprofit museum serving the public should not automatically be treated as a municipal, county, state, or federal public entity."
},
{
"inputKey": "is_k12_school_or_school_district",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site provides science education but is not a K-12 school or school district."
},
{
"inputKey": "is_higher_education_institution",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The museum has educational activities but is not modeled as a college or university."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal governance facts are present in the test case."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Animal care, exhibits, and outdoor learning do not make the museum an agricultural producer for typical rural/agricultural grant screening."
},
{
"inputKey": "is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The organization is a nonprofit museum in Durham, NC and should not be defaulted into rural small-business programs."
},
{
"inputKey": "owns_facility_or_has_long_term_site_control",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership status is listed as not sure, so capital-project eligibility that requires site control should remain uncertain."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage customers typically have not selected a vendor or obtained final construction pricing."
},
{
"inputKey": "has_formal_board_approval",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At the exploring stage, board approval should not be assumed for major capital work."
},
{
"inputKey": "has_recent_investment_grade_audit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit document or detailed engineering study is present; many grant workflows should ask for an audit or scope validation."
},
{
"inputKey": "electric_customer_class",
"value": "commercial_nonprofit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 100,000 square foot nonprofit museum with Duke Energy Progress service is realistically treated as a nonresidential commercial/institutional account."
},
{
"inputKey": "gas_customer_class",
"value": "commercial_nonprofit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Natural gas use is present and consistent with commercial/institutional service for space heat, domestic hot water, cafe, or animal-care loads."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 14850000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Converted the supplied annual electric cost of $148,500 to cents."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 2970000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Converted the supplied annual gas cost of $29,700 to cents."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 4200000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Converted the supplied annual water and sewer cost of $42,000 to cents."
},
{
"inputKey": "annual_waste_cost_cents",
"value": 2210000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Converted the supplied annual waste cost of $22,100 to cents."
},
{
"inputKey": "campus_acres",
"value": 84,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test-case notes identify an 84-acre museum campus."
},
{
"inputKey": "indoor_conditioned_square_feet",
"value": 100000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case uses 100,000 square feet as the estimated indoor area."
},
{
"inputKey": "has_cafe_or_commercial_kitchen",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description includes cafe and visitor-service loads."
},
{
"inputKey": "has_animal_care_loads",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description includes animal-care loads."
},
{
"inputKey": "has_large_outdoor_irrigation_or_water_features",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description includes outdoor water use on an 84-acre campus."
},
{
"inputKey": "has_fleet_vehicle_operations",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large campus may operate maintenance carts or small service vehicles, but no fleet inventory is supplied."
},
{
"inputKey": "disadvantaged_community_or_ej_designation",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No census tract, place GEOID, or program-specific disadvantaged-community designation is available."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Moderate rooftop and canopy solar concept sized below annual load for a nonprofit museum campus; final size depends on structural review, interconnection, roof constraints, and site control.",
"inputFacts": [
{
"inputKey": "dc_kw_capacity",
"value": 180,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 180 kW DC system is realistic for a 100,000 square foot institutional campus and would offset a meaningful but not excessive share of 1,350,000 annual kWh."
},
{
"inputKey": "ac_kw_capacity",
"value": 150,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "AC capacity is conservatively modeled below DC capacity for inverter sizing."
},
{
"inputKey": "estimated_annual_generation_kwh",
"value": 230000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Estimated generation is sized to roughly 17% of annual electricity consumption, avoiding an unrealistic full-offset assumption."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 45000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A planning cost of $2.50/W DC is realistic for a smaller institutional rooftop/canopy solar project before a quote."
},
{
"inputKey": "has_interconnection_application",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage projects should not be assumed to have filed interconnection."
},
{
"inputKey": "has_structural_roof_review",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Structural suitability is unknown and material for rooftop solar."
},
{
"inputKey": "ownership_model",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Nonprofit direct ownership, PPA, lease, or third-party ownership changes incentive treatment and should remain unknown."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs site-control confirmation because ownership status is unknown.",
"Needs final quote, structural review, and interconnection path before firm grant estimates.",
"Nonprofit direct-pay/tax-credit handling depends on ownership model and current tax guidance."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Limited geothermal heat-pump pilot for a small exhibit or education wing rather than full-campus conversion.",
"inputFacts": [
{
"inputKey": "served_square_feet",
"value": 12000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial-building pilot is more realistic than geothermal conversion of the full 100,000 square foot campus at the exploring stage."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 40,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "About 40 tons is plausible for a 12,000 square foot institutional zone with exhibit loads."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ground-source systems have high installed cost and require site-specific drilling or loop-field pricing."
},
{
"inputKey": "loop_field_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Vertical bore, horizontal loop, and pond-loop feasibility cannot be assumed without engineering."
},
{
"inputKey": "geotechnical_or_bore_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No study is present and the project is in an exploring stage."
},
{
"inputKey": "replaces_fossil_fuel_heating",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Gas costs are present, so partial replacement of gas-fired space heating is plausible."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs engineering study and eligible-cost breakout.",
"Site ownership or long-term control must be confirmed.",
"A pilot may qualify where full-campus conversion would be too speculative."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop units or split systems serving exhibit and visitor areas with high-efficiency electric heat-pump equipment.",
"inputFacts": [
{
"inputKey": "hvac_units_replaced",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Six units is a plausible partial replacement scope for a large museum campus rather than assuming all HVAC is replaced."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 90,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial 90-ton scope is credible for exhibit and visitor-service spaces."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning cost assumes roughly $15,000 per installed unit on average for commercial packaged replacements, with controls and electrical allowances."
},
{
"inputKey": "equipment_efficiency_rating",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Program estimates often require actual model numbers, AHRI certificates, SEER2/EER2/IEER/COP values, or qualified-product listings."
},
{
"inputKey": "baseline_equipment_age_years",
"value": 17,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Aging equipment is plausible for a museum campus, but the exact age should be verified."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 75000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 75,000 kWh reduction is plausible for partial HVAC replacement but requires a utility audit or engineering estimate."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 4500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heat-pump conversion could reduce some gas heating use, but end-use submetering is not available."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs model-specific efficiency data.",
"Some utility incentives may require preapproval before purchase.",
"Fuel-switching treatment may vary by program."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Targeted LED retrofit for exhibit lighting, back-of-house fixtures, outdoor pathway lighting, and visitor areas.",
"inputFacts": [
{
"inputKey": "fixtures_replaced_count",
"value": 650,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A museum campus with 100,000 indoor square feet plus outdoor areas plausibly has several hundred lighting fixtures."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 2600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Average installed cost of about $40 per fixture is plausible for a mixed retrofit with lamps, kits, and some fixture replacements."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 110000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Lighting savings of about 8% of annual site kWh is plausible for a large museum with long visitor and exhibit operating hours."
},
{
"inputKey": "include_controls",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy scheduling and exhibit-area controls are plausible and may improve eligibility or savings."
},
{
"inputKey": "preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage projects should not be treated as preapproved."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely requires utility preapproval and fixture schedule.",
"Savings and rebate amounts should not be final without baseline wattage and proposed wattage."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Replace or upgrade cafe and animal-care refrigeration with efficient reach-in units, walk-in evaporator fan controls, and door gaskets.",
"inputFacts": [
{
"inputKey": "reach_in_refrigerators_replaced",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Cafe and animal-care operations plausibly use several commercial reach-in refrigerators."
},
{
"inputKey": "reach_in_freezers_replaced",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small number of commercial freezers is plausible for cafe inventory and animal-care feed storage."
},
{
"inputKey": "walk_in_cooler_evaporator_fan_controls",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The scope is plausible but should be verified against actual refrigeration assets."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 5200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The cost allows for commercial refrigeration replacements and controls, not a large supermarket-scale system."
},
{
"inputKey": "equipment_is_energy_star_or_qualified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Refrigeration incentives often require model-specific qualified equipment documentation."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 28000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are plausible for small commercial refrigeration upgrades but need equipment schedules."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs qualified-product documentation.",
"Actual grant or rebate value may depend on equipment type and size.",
"Animal-care refrigeration may need operational constraints that reduce retrofit feasibility."
]
},
{
"retrofitTypeId": "efficient_air_compressor",
"projectScopeSummary": "Upgrade a small maintenance-shop or exhibit-support compressed-air system with a high-efficiency compressor and leak repair.",
"inputFacts": [
{
"inputKey": "compressor_horsepower",
"value": 15,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A museum may have a small shop compressor for maintenance or exhibit support, but this is not guaranteed."
},
{
"inputKey": "compressor_type",
"value": "variable_speed_rotary_screw",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Variable-speed equipment is a typical efficient replacement measure, but actual existing equipment is unknown."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 3200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning cost includes compressor, dryer, receiver, installation, and leak repair allowance."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 12000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are modest because this is a small nonindustrial system."
},
{
"inputKey": "existing_compressor_runtime_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Runtime is essential for compressed-air savings and should not be invented for a grant estimate."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Compressed-air grants often target industrial or high-runtime systems.",
"Need confirmation that a material compressed-air load exists.",
"May be better treated as a small utility-rebate measure than a grant project."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Selective roof and wall insulation improvements in older exhibit or support buildings during planned maintenance.",
"inputFacts": [
{
"inputKey": "insulated_area_square_feet",
"value": 18000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Selective treatment of 18,000 square feet is realistic for a campus with multiple building ages."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 5400000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $3 per treated square foot for insulation and access costs."
},
{
"inputKey": "existing_r_value",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing insulation levels are required for reliable savings estimates."
},
{
"inputKey": "proposed_r_value",
"value": 30,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "R-30 is a reasonable planning target for roof/ceiling insulation but must be verified by design."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 18000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are kept modest because museum exhibit ventilation and internal loads may limit envelope savings."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 2500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are plausible but uncertain without a building envelope audit."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs existing-condition documentation.",
"Often qualifies only when bundled with broader weatherization or energy-efficiency work.",
"Historic, exhibit, or animal-care spaces may constrain envelope work."
]
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"projectScopeSummary": "Install solar-control window film or interior shading in visitor-facing exhibit and lobby areas with high cooling loads.",
"inputFacts": [
{
"inputKey": "window_area_square_feet",
"value": 6000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "About 6% window-to-floor ratio for the treated portion is plausible for a museum with exhibit and public areas."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $2.50 per square foot of treated glazing for film or shading material and installation."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 14000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cooling savings are plausible but depend heavily on orientation, glass type, and operating schedule."
},
{
"inputKey": "glazing_orientation_breakout_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Orientation-specific data is not present in the test case."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Usually a smaller energy-efficiency measure rather than a standalone grant project.",
"Needs orientation and baseline glazing documentation.",
"May qualify only as part of a custom utility incentive."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal preheat for cafe, restroom, and limited animal-care domestic hot-water loads.",
"inputFacts": [
{
"inputKey": "collector_area_square_feet",
"value": 420,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest collector area is plausible for nonresidential hot-water preheat but depends on roof suitability and load profile."
},
{
"inputKey": "storage_tank_gallons",
"value": 500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Storage size is plausible for cafe and animal-care hot-water use but should be verified."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 8500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal commercial systems can be expensive relative to savings, especially with piping and controls."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 3200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are plausible if the museum has consistent hot-water loads, but no hot-water submetering is available."
},
{
"inputKey": "domestic_hot_water_load_profile_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A load profile is needed to avoid overestimating solar thermal savings."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely less attractive than heat-pump water heating or broader HVAC electrification.",
"Needs hot-water load data and roof/plumbing feasibility.",
"Should not be forced into a positive grant estimate without a quote."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Natural-gas CHP screening only; not recommended as an active grant project for this profile.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 75,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small CHP size is more plausible than a large industrial system, but the museum lacks clear year-round thermal load documentation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cost is a rough planning placeholder only and should not drive a grant estimate."
},
{
"inputKey": "has_year_round_thermal_host_load",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP viability requires reliable year-round hot-water or process heat load; the test case does not establish this."
},
{
"inputKey": "supports_decarbonization_goal",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "New natural-gas CHP may conflict with decarbonization-oriented grants unless resilience is the primary objective."
},
{
"inputKey": "resilience_critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A museum is important to the community but is not automatically a critical facility for resilience grant purposes."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely ineligible or low priority for many clean-energy grant programs.",
"Needs thermal-load study and emissions screening.",
"Should generally be suppressed unless a resilience-specific program is being tested."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not a realistic active project for this museum campus; animal-care and cafe organics are not expected to support a viable biogas system.",
"inputFacts": [
{
"inputKey": "onsite_organic_waste_tons_per_year",
"value": 45,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cafe waste, landscape debris, and animal-care organics may exist but are unlikely to be large enough for onsite digestion."
},
{
"inputKey": "has_manure_or_agricultural_waste_stream",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Animal-care operations at a museum should not be treated as a farm-scale manure resource."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No realistic project scope should be priced without a feasibility study."
},
{
"inputKey": "feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No biogas feasibility study is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not a realistic fit for typical renewable-energy grants for this profile.",
"Organic waste volume likely too small and inconsistent.",
"Do not estimate unless a separate feasibility study is supplied."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not recommended; urban/suburban museum campus conditions make small wind unlikely to be feasible or grant-ready.",
"inputFacts": [
{
"inputKey": "proposed_wind_capacity_kw",
"value": 20,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small demonstration turbine could be imagined for education, but this should not be treated as a realistic energy project."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study is present."
},
{
"inputKey": "zoning_or_permitting_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small wind typically requires zoning, tower-height, and setback review."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Project should remain unpriced because feasibility is not established."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely poor fit for a Durham museum campus.",
"Could be an educational exhibit but not a strong energy grant project.",
"Suppress unless a wind resource study and permitting path are provided."
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
"reasoning": "The supplied test case already suppresses this Washington solar manufacturing taxpayer workflow for a North Carolina nonprofit museum."
}
],
"reasoning": "Do not attempt to make this project qualify; the geography and taxpayer facts are incompatible."
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
"reasoning": "The supplied test case already suppresses this Rhode Island renewable property-tax workflow for a North Carolina site."
}
],
"reasoning": "Even though a solar PV project is plausible, this specific opportunity should remain suppressed because it is not geographically relevant."
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
"reasoning": "The supplied test case already marks the Michigan Renewable Energy Renaissance Zone designation as false for this North Carolina site."
}
],
"reasoning": "Do not create a positive estimate for an out-of-state designation workflow."
},
{
"opportunityId": "UTILITY_DUKE_ENERGY_PROGRESS_CUSTOM_EFFICIENCY",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "utility_account_customer_class",
"value": "commercial_nonprofit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a large nonprofit institution in Duke Energy Progress territory."
},
{
"inputKey": "preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Most custom commercial incentives require preapproval before purchase or installation."
},
{
"inputKey": "measure_categories",
"value": [
"lighting",
"hvac",
"refrigeration",
"compressed_air"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are plausible nonresidential efficiency measures for the museum campus."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 245000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Combined planning savings from LED, HVAC, refrigeration, and small compressed-air upgrades; requires audit validation."
}
],
"reasoning": "Potentially relevant because the site is a Duke Energy Progress nonresidential customer, but estimates should remain contingent on preapproval, measure-level eligibility, and calculation package readiness."
},
{
"opportunityId": "FEDERAL_DIRECT_PAY_CLEAN_ENERGY_TAX_CREDIT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "applicant_is_tax_exempt_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is a nonprofit and mostly property-tax exempt in the supplied profile."
},
{
"inputKey": "eligible_technology",
"value": [
"solar_pv",
"ground_source_heat_pump",
"solar_water_heating"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These technologies are plausible direct-pay candidates if the organization owns the equipment and satisfies program rules."
},
{
"inputKey": "direct_ownership_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership model is unknown and directly affects nonprofit direct-pay treatment."
},
{
"inputKey": "begin_construction_date",
"value": null,
"valueType": "date",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No project schedule is supplied."
},
{
"inputKey": "prevailing_wage_apprenticeship_compliance_plan",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Compliance assumptions should not be invented for major clean-energy tax-credit calculations."
}
],
"reasoning": "Potentially relevant for nonprofit-owned clean-energy projects, but should not calculate unless ownership, dates, eligible costs, and compliance assumptions are known."
},
{
"opportunityId": "NC_NONPROFIT_ENERGY_EFFICIENCY_GRANT_PLACEHOLDER",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "applicant_nonprofit_status",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies a nonprofit organization."
},
{
"inputKey": "program_open_and_accepting_applications",
"value": null,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No specific open grant program is supplied, so a generic nonprofit grant should not be estimated."
}
],
"reasoning": "Nonprofit status alone is not enough to create a grant estimate; suppress without an identified open program and application criteria."
},
{
"opportunityId": "RURAL_ENERGY_FOR_AMERICA_PROGRAM_REAP",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The museum has animal-care loads but is not modeled as an agricultural producer."
},
{
"inputKey": "is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A Durham nonprofit museum should not be assumed to meet rural small-business eligibility."
}
],
"reasoning": "Do not make the museum qualify for rural/agricultural energy grants based only on animal-care or outdoor-campus facts."
},
{
"opportunityId": "CLEAN_SCHOOL_BUS_OR_PUBLIC_FLEET_GRANT_PLACEHOLDER",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "owns_eligible_school_buses",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The museum is not a school district and no bus fleet is supplied."
},
{
"inputKey": "public_fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile should not be treated as a municipal or state fleet owner."
}
],
"reasoning": "Fleet grants should remain suppressed unless the museum supplies a real eligible vehicle inventory and program match."
},
{
"opportunityId": "WATER_EFFICIENCY_OR_STORMWATER_GRANT_PLACEHOLDER",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "has_large_outdoor_water_use",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case includes outdoor water use and water/sewer costs."
},
{
"inputKey": "water_project_scope_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No irrigation, rainwater harvesting, water-feature recirculation, or stormwater retrofit scope is defined."
},
{
"inputKey": "annual_water_use_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual water cost is available, but gallons and seasonal profile are missing."
}
],
"reasoning": "Water grants or rebates may be plausible for a large campus, but the current project lacks scope and water-use quantities."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "final_vendor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "signed_contract_date",
"reason": "needs user decision"
},
{
"inputKey": "project_installation_start_date",
"reason": "needs user decision"
},
{
"inputKey": "interconnection_application_id",
"reason": "application not submitted"
},
{
"inputKey": "utility_rebate_preapproval_id",
"reason": "application not submitted"
},
{
"inputKey": "solar_structural_engineer_letter",
"reason": "source requires agency approval"
},
{
"inputKey": "geothermal_bore_test_report",
"reason": "quote not available"
},
{
"inputKey": "hvac_model_numbers_and_ahri_certificates",
"reason": "quote not available"
},
{
"inputKey": "lighting_fixture_baseline_wattage_schedule",
"reason": "quote not available"
},
{
"inputKey": "refrigeration_qualified_product_documentation",
"reason": "quote not available"
},
{
"inputKey": "compressed_air_runtime_metering",
"reason": "needs user decision"
},
{
"inputKey": "annual_water_use_gallons",
"reason": "needs user decision"
},
{
"inputKey": "ownership_or_long_term_site_control_documentation",
"reason": "needs user decision"
},
{
"inputKey": "disadvantaged_community_designation",
"reason": "source requires agency approval"
},
{
"inputKey": "board_approved_capital_budget",
"reason": "application not submitted"
}
],
"doNotForceQualificationReasons": [
"The museum is a nonprofit public-serving institution but should not automatically be treated as a public agency, school district, university, rural small business, agricultural producer, or tribal entity.",
"Ownership status is unknown, so capital projects requiring site control should remain uncertain until confirmed.",
"Out-of-state DSIRE opportunity IDs already present in the test case should remain suppressed and should not be made positive by adding synthetic capacity values.",
"Animal-care loads do not create farm-scale biomass, biogas, or agricultural grant eligibility.",
"Small wind is not a realistic energy project for this Durham museum campus without wind-resource and permitting evidence.",
"Natural-gas CHP should not be treated as a clean-energy grant fit unless a resilience-specific program and year-round thermal load are documented.",
"Water and stormwater opportunities are plausible for the campus but should not calculate without a defined scope and measured water-use data.",
"Exploring-stage projects should not be assumed to have quotes, preapproval, board approval, interconnection approval, or final engineering studies."
]
}

