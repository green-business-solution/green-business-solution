{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "big-dipper-missoula",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied test-case profile for a small leased Missoula ice-cream shop with heavy refrigeration load, NorthWestern Energy service, and tenant control limitations.  Values are intended to make grant-estimation tests realistic rather than universally positive.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The provided profile already states the project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_contractor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small leased retail shop at the exploring stage would commonly still be screening measures before soliciting formal bids."
},
{
"inputKey": "has_active_grant_application",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application status was supplied, and an exploring-stage customer should not be treated as already having applied."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is identified as a commercial business, not a nonprofit."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a private commercial food-service business."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building use is restaurant/food-service, not education."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Although one NAICS code relates to ice-cream manufacturing, the described site is a retail shop with frozen storage, not a farm or agricultural producer."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal government relationship is indicated."
},
{
"inputKey": "is_utility_customer_of_record",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small commercial tenants commonly hold their own electric account, and the profile includes utility consumption and cost data for the site."
},
{
"inputKey": "electric_customer_class",
"value": "small_commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The 2,000 square-foot food-service site with 78,000 annual kWh is consistent with a small commercial electric customer."
},
{
"inputKey": "tenant_has_landlord_approval_for_equipment_replacement",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile states the business leases the space; permanent envelope, HVAC, or exterior changes should require landlord approval before estimating grants that require site control."
},
{
"inputKey": "tenant_can_replace_plug_in_or_self_contained_refrigeration",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant food-service operator typically controls portable display cases, reach-in freezers, and prep-area refrigeration equipment."
},
{
"inputKey": "annual_kwh",
"value": 78000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electricity use is provided in the test-case utility profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 1005000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric cost is provided as $10,050 and converted to cents."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 170000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is provided as $1,700 and converted to cents."
},
{
"inputKey": "building_square_feet",
"value": 2000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied profile includes an estimated 2,000 square feet."
},
{
"inputKey": "site_has_rooftop_or_parking_control_for_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased storefront restaurant typically does not control roof or parking areas without landlord participation."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile describes retail ice-cream sales and small-scale food preparation, not a delivery fleet."
},
{
"inputKey": "has_ev_charging_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No EV charging scope is present, and the leased small storefront does not indicate parking control."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Replace aging self-contained freezer/refrigeration equipment used for ice-cream storage and display, prioritizing efficient reach-in freezer and display-case equipment that the tenant can control.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for a modest refrigeration replacement package."
},
{
"inputKey": "refrigerated_case_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small ice-cream shop would plausibly have one customer-facing display case and one back-of-house refrigerated or frozen case."
},
{
"inputKey": "reach_in_or_storage_freezer_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Frozen-product storage is specifically noted, making multiple small freezer assets plausible."
},
{
"inputKey": "equipment_type",
"value": [
"self_contained_reach_in_freezer",
"ice_cream_display_freezer",
"efficient_evaporator_fan_motor_or_controls_if_applicable"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic refrigeration measures for a small ice-cream retail operation."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 3600,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative planning estimate equal to roughly 5% of annual electricity use; should be replaced by quote or deemed-savings values."
},
{
"inputKey": "requires_equipment_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Model number, efficiency rating, baseline condition, and installed cost are needed for most refrigeration incentives."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely strongest fit among listed measures because the site has material refrigeration load.",
"Final estimate should require equipment model numbers, invoice or quote, and utility customer confirmation.",
"Some utility rebates may require preapproval before purchase."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace remaining fluorescent or halogen fixtures in sales, prep, storage, and back-of-house areas with LED fixtures or lamps.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for a small 12-fixture retrofit."
},
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview assumptions state 12 fixture replacements."
},
{
"inputKey": "existing_lamp_type",
"value": "mixed_fluorescent_and_older_led",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small retail food-service tenant may have a mixed lighting inventory; older LED replacements would reduce eligibility."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 2200,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative small-store lighting savings estimate; exact savings depend on baseline wattage and operating hours."
},
{
"inputKey": "requires_pre_install_lighting_inventory",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "A fixture count and baseline wattage inventory are required to avoid overestimating lighting incentives."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for small-business lighting incentives if baseline fixtures are inefficient.",
"Estimate should be reduced or suppressed if fixtures are already LED.",
"Tenant approval is usually easier than for permanent HVAC or envelope work."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Add occupancy sensors or timer controls in storage, restroom, office, and back-of-house areas only; not a whole-building controls project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 132200,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost but should be treated cautiously for a very small shop."
},
{
"inputKey": "control_zone_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Storage, restroom, office, and back-of-house zones are plausible control locations in a 2,000 square-foot shop."
},
{
"inputKey": "controls_type",
"value": [
"occupancy_sensor",
"timer_or_schedule_control"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Simple lighting controls are more realistic than advanced networked controls for this customer."
},
{
"inputKey": "requires_lighting_controls_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The incentive calculation should need the control type, controlled wattage, and installed cost."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be eligible only as an add-on to a lighting project.",
"Small controlled wattage may make grant or rebate value negligible.",
"Suppress if no baseline fixture inventory is available."
]
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"projectScopeSummary": "Install a VFD only if an existing exhaust fan, make-up air fan, or refrigeration-related motor is large enough and currently runs at constant speed.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 212000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost, but motor eligibility is uncertain for a small leased food-service shop."
},
{
"inputKey": "motor_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Only one candidate motor is assumed because the site is small."
},
{
"inputKey": "candidate_motor_horsepower",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Motor horsepower is not known and is essential for VFD eligibility."
},
{
"inputKey": "existing_motor_control",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The estimate should not assume the existing motor runs constant speed."
},
{
"inputKey": "requires_motor_schedule_or_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "VFD incentives typically depend on motor horsepower, operating hours, and installed cost."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially relevant but uncertain.",
"Suppress unless a qualifying motor is documented.",
"Not enough evidence to calculate a reliable estimate from the current profile."
]
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"projectScopeSummary": "Replace restroom faucet aerators, hand-sink aerators, and pre-rinse spray valve with low-flow commercial kitchen fixtures.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 116400,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for a small water-efficiency project."
},
{
"inputKey": "faucet_aerator_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small food-service shop likely has restroom and prep/hand-wash sinks."
},
{
"inputKey": "pre_rinse_spray_valve_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A commercial kitchen or prep area commonly has one dishwashing/pre-rinse fixture."
},
{
"inputKey": "estimated_annual_water_savings_gallons",
"value": 18000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A conservative placeholder for a small food-service tenant; utility bills should replace this value."
},
{
"inputKey": "requires_water_fixture_inventory",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing flow rates and fixture counts are needed for credible water-efficiency estimates."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Scope is plausible and tenant-controllable.",
"Grant value is likely small.",
"Water provider program availability is unknown and should not be assumed."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Potential replacement of one small rooftop unit, furnace, or split-system serving the leased shop, only if the existing unit is near end of life and landlord approval is obtained.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for a small HVAC replacement."
},
{
"inputKey": "hvac_unit_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2,000 square-foot tenant space would plausibly have one primary small commercial unit."
},
{
"inputKey": "existing_hvac_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not specify whether HVAC is gas, electric, rooftop, split-system, or landlord-owned."
},
{
"inputKey": "replacement_hvac_type",
"value": "high_efficiency_small_commercial_heat_pump_or_rooftop_unit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "This is a plausible option but not confirmed by the customer."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The customer leases the site, and HVAC equipment is likely part of the building system."
},
{
"inputKey": "requires_hvac_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Equipment capacity, efficiency, fuel type, baseline, and installed cost are required."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could qualify if the tenant or landlord proceeds with a documented replacement.",
"Suppress until ownership/control and equipment type are known.",
"Tenant may not be the eligible applicant if the landlord owns the HVAC asset."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Minor back-of-house air sealing or roof/wall insulation should be considered only if the landlord is participating; not a tenant-led priority.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost, but envelope work is uncertain in a leased storefront."
},
{
"inputKey": "insulation_area_square_feet",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile has no roof, wall, or attic area data."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Envelope improvements affect the leased building shell."
},
{
"inputKey": "requires_envelope_audit_or_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Envelope incentives need existing R-values, proposed R-values, areas, and costs."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not a typical tenant-controlled project.",
"Suppress unless landlord participation and envelope scope are documented.",
"Savings likely modest relative to refrigeration load."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Not recommended for this profile unless landlord controls roof access and the shop has unusually high service hot-water use.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost exists, but a real eligible cost should not be created without roof/site control and hot-water load data."
},
{
"inputKey": "solar_thermal_collector_area_square_feet",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No collector area or roof control information is available."
},
{
"inputKey": "site_has_roof_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased storefront tenant generally does not control the roof."
},
{
"inputKey": "annual_hot_water_load_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile has gas cost but no hot-water-specific load."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not a customer-led project.",
"Suppress unless landlord participates and a solar-thermal design is quoted.",
"Small food-service hot-water load may not justify the measure."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "A battery may be desired for freezer resilience during outages, but this is not a realistic grant-estimation project without solar, critical-load design, or landlord/electrical-room approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview cost is high for this customer; a real battery estimate needs a quoted design."
},
{
"inputKey": "battery_capacity_kwh",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical loads, outage-duration target, and service constraints are unknown."
},
{
"inputKey": "paired_with_onsite_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not include a solar PV project, and roof control is unlikely."
},
{
"inputKey": "critical_load_panel_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Freezer resilience would require defined critical loads and electrical work."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be strategically relevant for food inventory protection but unlikely to receive a straightforward small-business efficiency grant.",
"Suppress until a resilience program, project design, and quote exist.",
"Tenant electrical-room control is uncertain."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Not realistic for a leased 2,000 square-foot storefront because ground-loop installation requires site control and major construction.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview cost should not be used for a grant estimate because site control and geothermal design are absent."
},
{
"inputKey": "ground_loop_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A small tenant storefront is very unlikely to control land for a ground loop."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Geothermal would be a building/landlord capital improvement."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not a realistic tenant-led measure.",
"Suppress unless a landlord-sponsored whole-building project is documented."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not relevant for this small urban ice-cream shop.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The provided preview cost should not be treated as a realistic customer project."
},
{
"inputKey": "has_biomass_fuel_supply",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A small retail ice-cream shop has no indicated biomass fuel source."
},
{
"inputKey": "has_space_for_energy_system",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The leased 2,000 square-foot retail site is not an appropriate location for a biomass or biogas system."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not relevant to this profile.",
"Do not calculate from the preview cost."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Not realistic for the site because electric and thermal loads are too small for conventional CHP.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview cost is not a realistic project cost for this customer."
},
{
"inputKey": "annual_kwh",
"value": 78000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electricity use is far below what would usually support a CHP project."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile has no year-round thermal host load for CHP."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Scale mismatch.",
"Suppress as not relevant unless a separate manufacturing facility is introduced."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Not realistic as a grant project for a single leased storefront without generation, battery design, or critical-facility status.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview cost should not be used because the site lacks a defined microgrid scope."
},
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small ice-cream shop is not normally a community critical facility."
},
{
"inputKey": "onsite_generation_existing",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No onsite generation is supplied in the profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not relevant to this profile.",
"Suppress unless the customer joins a larger landlord- or district-led resilience project."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not realistic for an urban leased storefront in Missoula.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No viable wind project scope is indicated."
},
{
"inputKey": "site_has_wind_resource_assessment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind study exists, and the storefront context is inappropriate."
},
{
"inputKey": "site_has_tower_or_land_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A leased urban retail tenant would not normally control land for a wind turbine."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not relevant to this profile.",
"Do not force renewable-energy qualification from generic opportunity matches."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Potentially conceptually related to ice-cream/freezer load management, but no realistic customer-led thermal storage project is defined.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Thermal storage needs engineered sizing and a quote; the preview cost should not drive a grant estimate."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No cooling or freezer load profile has been provided."
},
{
"inputKey": "demand_response_or_time_of_use_rate_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case includes average cost per kWh but no time-varying rate or demand-response program enrollment."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless a refrigeration contractor proposes a specific storage or load-shifting system.",
"Likely too complex for this small shop."
]
},
{
"retrofitTypeId": "waste_heat_recovery",
"projectScopeSummary": "Explore only if refrigeration compressor heat can preheat service hot water; otherwise not enough scale or evidence.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Waste-heat recovery should require a refrigeration/HVAC contractor design and quoted installed cost."
},
{
"inputKey": "recoverable_heat_source",
"value": "refrigeration_compressor_heat_possible_not_confirmed",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heavy refrigeration load makes this concept plausible, but equipment layout and hot-water load are unknown."
},
{
"inputKey": "annual_hot_water_load_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile does not separate gas use for space heating versus water heating."
},
{
"inputKey": "requires_engineering_study",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The measure depends on site-specific heat availability and coincident hot-water demand."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Possible but speculative.",
"Do not calculate unless a contractor identifies a specific recoverable heat stream and use."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "northwestern_energy_small_business_refrigeration_or_custom_electric_incentive",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "electric_utility_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "NorthWestern Energy is self-reported as the electric utility, but verification is still marked unverified."
},
{
"inputKey": "equipment_model_numbers_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile has no model numbers or efficiency ratings."
},
{
"inputKey": "preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is at the exploring stage."
}
],
"reasoning": "Refrigeration is the best-fit measure, but calculation should be quote- or deemed-savings-driven rather than assumed from generic grant data."
},
{
"opportunityId": "northwestern_energy_small_business_lighting_incentive",
"expectedHandling": "calculate_if_formula_ready",
"inputFacts": [
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview assumptions include 12 fixture replacements."
},
{
"inputKey": "baseline_fixture_inventory_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Baseline wattage and fixture type are not supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview provides a plausible small lighting package cost."
}
],
"reasoning": "Lighting may be calculated if a formula can use fixture count and cost, but should be suppressed or marked low confidence if baseline fixtures are already LED."
},
{
"opportunityId": "northwestern_energy_custom_motor_or_vfd_incentive",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "candidate_motor_horsepower",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Motor size is not known."
},
{
"inputKey": "motor_operating_hours_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Operating schedule is required for VFD savings."
}
],
"reasoning": "A VFD may be possible but is not supported by current project facts."
},
{
"opportunityId": "montana_property_tax_or_business_equipment_tax_related_energy_benefit",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "taxpayer_has_direct_property_tax_bill",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing tax facts state the tenant does not have a direct property tax bill."
},
{
"inputKey": "lease_property_tax_pass_through_cents",
"value": 980000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing tax facts include a lease CAM tax pass-through amount."
}
],
"reasoning": "Property-tax-based benefits should not be estimated for the tenant unless the rule explicitly allows pass-through taxpayers or tenant-owned business equipment."
},
{
"opportunityId": "usda_reap_renewable_energy_or_energy_efficiency",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a retail ice-cream shop, not a farm producer."
},
{
"inputKey": "rural_small_business_status",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is in Missoula, and rural eligibility should not be assumed."
},
{
"inputKey": "renewable_energy_project_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No realistic renewable project is defined for the leased storefront."
}
],
"reasoning": "Do not force USDA-style qualification based on food manufacturing or small-business status alone."
},
{
"opportunityId": "public_nonprofit_school_or_municipal_energy_grants",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The entity is commercial."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The entity is not a government or public institution."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a restaurant/food-service use."
}
],
"reasoning": "These opportunity families should be blocked rather than calculated."
},
{
"opportunityId": "renewable_generation_storage_microgrid_or_resilience_grants",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "site_has_roof_or_land_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Leased storefront control limitations make onsite generation unlikely."
},
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not indicate critical-facility status."
},
{
"inputKey": "onsite_generation_project_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No realistic solar, wind, microgrid, or battery design is present."
}
],
"reasoning": "The listed renewable and resilience measures have preview costs but no realistic project scope for this customer."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "formal_contractor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "utility_account_number_unmasked",
"reason": "needs user decision"
},
{
"inputKey": "preapproval_application_id",
"reason": "application not submitted"
},
{
"inputKey": "agency_award_probability",
"reason": "source requires agency approval"
},
{
"inputKey": "landlord_authorization_letter",
"reason": "needs user decision"
},
{
"inputKey": "roof_rights_or_site_control_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "hvac_existing_equipment_efficiency",
"reason": "needs user decision"
},
{
"inputKey": "motor_horsepower_schedule",
"reason": "needs user decision"
},
{
"inputKey": "water_fixture_existing_flow_rates",
"reason": "needs user decision"
},
{
"inputKey": "critical_load_battery_design",
"reason": "quote not available"
},
{
"inputKey": "renewable_energy_interconnection_application",
"reason": "application not submitted"
}
],
"doNotForceQualificationReasons": [
"The customer is a private commercial tenant, not a nonprofit, public entity, school, agricultural producer, or tribal entity.",
"The leased storefront likely limits eligibility for roof, envelope, HVAC, solar, geothermal, wind, microgrid, and other landlord-controlled capital projects.",
"The most realistic positive opportunities are refrigeration, limited lighting, and possibly small water-efficiency measures; other previewed measures should not be made positive merely because generic retrofit opportunities exist.",
"Refrigeration and lighting estimates should require model numbers, baseline equipment data, utility customer verification, and preapproval status where required.",
"Large renewable, CHP, biomass, geothermal, and microgrid projects are scale-mismatched for a 2,000 square-foot ice-cream shop with 78,000 annual kWh.",
"Property-tax-related benefits should not be assumed because the tenant has only a lease CAM tax pass-through and no direct property tax bill."
]
}

