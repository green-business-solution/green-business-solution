{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "northgate-market-anaheim",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied Northgate Market Anaheim test-case fixture. Grocery refrigeration, HVAC, lighting controls, VFDs, and an energy audit are realistic near-term scopes. EV charging may be plausible only as a customer amenity or fleet-support project and should not be assumed to qualify for school-bus, corridor, or community-charging grant programs without site-host and application facts. Leased-tenant status creates landlord-approval and site-control uncertainty. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies the organization as a commercial business and the building as a full-service grocery store."
},
{
"inputKey": "electric_utility_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Anaheim Public Utilities is self-reported for the site, but the normalized profile still marks utility verification as self-reported and unverified."
},
{
"inputKey": "gas_utility_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form reports Southern California Gas Company as the gas provider and the utility summary includes gas costs."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A full-service branded grocery market is normally a for-profit commercial retail business."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a private commercial grocery store rather than a public agency."
},
{
"inputKey": "is_school_or_school_district",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Nothing in the test case indicates a school, school district, or school-bus facility."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a retail grocery operation, not an agricultural production facility."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or governance facts are present, and this would not normally be assumed for a grocery tenant."
},
{
"inputKey": "is_fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single store may receive deliveries, but the site profile does not indicate ownership or operation of a vehicle fleet."
},
{
"inputKey": "has_customer_parking_lot",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 45,000-square-foot suburban full-service grocery store would normally have a customer parking field."
},
{
"inputKey": "tenant_has_long_term_site_control",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is leased, and grant programs may require proof of site control, remaining lease term, or landlord consent."
},
{
"inputKey": "landlord_approval_required_for_capital_work",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Major electrical, HVAC, roof, exterior parking-lot, and refrigeration work at a leased grocery site typically requires owner approval."
},
{
"inputKey": "landlord_approval_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No lease consent, landlord approval letter, or site-control document is present in the supplied fixture."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object lists the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_quote_planning",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture contains preview costs but no contractor quotes, executed scopes, or application records."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant application status, application ID, award letter, or agency approval fact is provided."
},
{
"inputKey": "preferred_project_bundle",
"value": [
"energy_audit",
"high_efficiency_refrigeration_equipment",
"lighting_controls_retrofit",
"variable_frequency_drive_retrofit",
"high_efficiency_hvac_replacement"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a grocery tenant with high annual electricity use, these measures are more realistic than biomass, small wind, geothermal, or CHP."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "ASHRAE Level II-style energy assessment focused on refrigeration racks, refrigerated display cases, HVAC economizers, lighting controls, kitchen/process loads, and demand-management opportunities.",
"inputFacts": [
{
"inputKey": "audit_level",
"value": "ASHRAE Level II equivalent",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 45,000-square-foot grocery store with large electric and refrigeration loads justifies a targeted engineering audit before committing to capital measures."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 2800000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A synthetic $28,000 study cost is realistic for a detailed grocery energy assessment with refrigeration review."
},
{
"inputKey": "audit_includes_refrigeration_scope",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Refrigeration is a priority in the test-case notes and a major grocery energy load."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture has no audit proposal or executed study agreement."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Study incentives often require preapproval before audit work begins.",
"Some programs may require utility-program eligibility through Anaheim Public Utilities or a third-party administrator."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Targeted refrigeration upgrade for display-case controls, electronically commutated evaporator fan motors, anti-sweat heater controls, night curtains on medium-temperature cases, and floating head-pressure controls.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 34500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $345,000 as a plausible grocery refrigeration controls and component upgrade budget."
},
{
"inputKey": "refrigerated_display_case_count",
"value": 42,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 45,000-square-foot full-service grocery store would commonly have dozens of medium- and low-temperature display cases."
},
{
"inputKey": "walk_in_cooler_freezer_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Back-of-house cold storage for produce, meat, dairy, frozen food, and prepared foods is realistic for this store type."
},
{
"inputKey": "ecm_evaporator_fan_motor_count",
"value": 96,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning count based on many display and walk-in evaporator sections; a quote should confirm the actual motor count."
},
{
"inputKey": "anti_sweat_heater_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Anti-sweat heater controls are a common grocery refrigeration efficiency measure."
},
{
"inputKey": "floating_head_pressure_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Floating head-pressure control is a realistic measure for central refrigeration systems."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 263000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic estimate equal to roughly 9% of annual site electricity use; final value should come from measure-level calculations."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case includes a preview cost, not a vendor quote with measure quantities."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May require measure-level savings calculations and pre-installation inspection.",
"Eligibility may depend on Anaheim Public Utilities program rules rather than statewide investor-owned utility rules."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Lighting controls upgrade for sales floor, back-of-house, offices, restrooms, storage areas, and exterior security lighting, emphasizing occupancy/vacancy sensors and scheduling rather than full fixture replacement.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 13220000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $132,200 as a plausible controls-focused lighting project."
},
{
"inputKey": "interior_control_zone_count",
"value": 28,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grocery store of this size would have multiple sales, prep, storage, office, and restroom zones."
},
{
"inputKey": "occupancy_sensor_count",
"value": 64,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Back-of-house, storage, office, restroom, and limited sales-area zones can support this synthetic sensor count."
},
{
"inputKey": "networked_lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked scheduling and occupancy controls are realistic for a controls retrofit at this scale."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 64000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning estimate; actual savings require lighting inventory, controlled wattage, and operating-hour assumptions."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No lighting controls quote or fixture schedule is included in the supplied record."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Final calculation should wait for a controls bill of materials and pre-retrofit lighting schedule.",
"Some lighting programs exclude measures installed primarily for code compliance."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Limited remaining LED retrofit for specialty, refrigerated-case, back-room, and exterior fixtures that were not previously converted.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 16042500,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $160,425, but scopes it as a partial retrofit rather than assuming an entire store relamp."
},
{
"inputKey": "fixture_replacement_count",
"value": 185,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The admin preview mentions only 12 fixtures, which is likely too small for a grocery store; this synthetic count better reflects a partial store project and should be quote-confirmed."
},
{
"inputKey": "refrigerated_case_led_doors_or_strips_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Refrigerated-case lighting is a realistic grocery lighting measure."
},
{
"inputKey": "exterior_area_lighting_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Parking and exterior security lighting are plausible loads for a full-service grocery store."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 118000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning estimate; actual savings need fixture wattage, quantities, and hours."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No lighting contractor quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"LED projects may be less grant-attractive if much of the facility has already been converted.",
"Some incentives require proof of existing baseline wattage and non-code-required replacement."
]
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"projectScopeSummary": "Install VFDs on selected HVAC supply/return fans, condenser fans, refrigeration pumps, and process exhaust where existing motors are constant-speed and run long hours.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 21200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $212,000 as a plausible multi-motor VFD retrofit budget for a grocery store."
},
{
"inputKey": "vfd_count",
"value": 14,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site likely has multiple HVAC, refrigeration, and exhaust motors; exact count should be verified in an equipment survey."
},
{
"inputKey": "total_controlled_motor_hp",
"value": 245,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic aggregate horsepower estimate for grocery fan, pump, and condenser applications."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 146000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning estimate only; savings depend on motor load profiles, control sequences, and operating hours."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No motor schedule or VFD proposal is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Measure eligibility depends on baseline motor operation and whether VFDs are required by code or equipment replacement standards.",
"A post-installation inspection or controls verification may be required."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop HVAC units serving sales floor and back-of-house areas with high-efficiency units and updated economizer controls.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 79800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $798,000 as a plausible multi-RTU replacement budget."
},
{
"inputKey": "rtu_replacement_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 45,000-square-foot grocery store commonly uses multiple packaged rooftop units."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 160,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning capacity for a supermarket with high internal loads; must be confirmed by equipment nameplates or design documents."
},
{
"inputKey": "economizer_repair_or_replacement_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Economizer repairs and controls are realistic adders during RTU replacement."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 175000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning estimate; HVAC savings are uncertain without equipment age, efficiency, capacity, and load data."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied record includes a modeled preview cost but no mechanical contractor quote."
},
{
"inputKey": "landlord_roof_work_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "RTU replacement affects roof penetrations, curb adapters, structural loading, and leased-property systems."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Many incentives require equipment efficiency ratings and AHRI or manufacturer documentation.",
"Tenant must confirm authority to replace landlord-controlled rooftop equipment."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Partial electrification of selected HVAC zones using high-efficiency heat-pump rooftop units where replacement is already planned.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 117200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $1,172,000 for a more capital-intensive heat-pump HVAC retrofit."
},
{
"inputKey": "heat_pump_rtu_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial RTU conversion is more realistic than full-site electrification during early exploration."
},
{
"inputKey": "total_heat_pump_capacity_tons",
"value": 120,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning capacity; actual size depends on existing RTU schedule and load calculations."
},
{
"inputKey": "existing_space_heating_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has annual gas cost and is served by Southern California Gas, so gas heat is plausible."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 11200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning estimate for partial HVAC electrification; must be reconciled with actual gas end uses."
},
{
"inputKey": "estimated_annual_incremental_kwh",
"value": 85000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heat-pump heating may increase electric consumption even while lowering gas use."
},
{
"inputKey": "electrical_service_capacity_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrification feasibility depends on panel and service capacity, which are not in the test case."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No HVAC electrification quote or load calculation is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Savings and incentives require equipment specifications, fuel-switching baseline, and utility-rate assumptions.",
"Electrical capacity and landlord approval should suppress final estimates until confirmed."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Replace or supplement gas-fired service water heating for deli, bakery, meat/seafood prep, restrooms, and cleaning loads with commercial heat-pump water-heater equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 35000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $350,000, plausible for a commercial grocery domestic/process hot-water system."
},
{
"inputKey": "heat_pump_water_heater_system_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single central system or packaged plant is plausible for this site."
},
{
"inputKey": "storage_volume_gallons",
"value": 900,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic commercial storage volume for food-prep and cleaning loads."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 6900,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning estimate only; actual savings require hot-water load and gas submetering assumptions."
},
{
"inputKey": "estimated_annual_incremental_kwh",
"value": 42000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fuel switching from gas to electric heat pump typically adds electric load."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No plumbing or water-heating proposal is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Food-service hot-water temperature requirements and space for storage tanks must be confirmed.",
"Incentives may require qualifying equipment lists and proof of gas baseline."
]
},
{
"retrofitTypeId": "cooling_tower_controls_optimization",
"projectScopeSummary": "Water-side controls and treatment optimization for condenser-water or evaporative cooling equipment if present, including cycles-of-concentration control and makeup-water monitoring.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 17960000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost, but actual applicability depends on whether the grocery site has a cooling tower or evaporative condenser."
},
{
"inputKey": "cooling_tower_or_evaporative_condenser_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Many grocery refrigeration systems use air-cooled condensers; cooling-tower eligibility should not be assumed."
},
{
"inputKey": "estimated_annual_water_savings_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Water savings require tower makeup/blowdown history or equipment specifications."
},
{
"inputKey": "water_meter_or_submeter_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes annual water/sewer cost but no tower submeter or process-water breakdown."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No water-treatment or controls quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress water-efficiency grant estimates unless cooling tower or evaporative condenser presence is confirmed.",
"Annual water use and baseline cycles of concentration are missing."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery storage for demand management, refrigeration resilience, and limited outage support for critical loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 728000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $7,280,000, consistent with a large commercial battery project."
},
{
"inputKey": "battery_power_kw",
"value": 750,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A grocery site using 2.925 million kWh per year may have large demand, but actual peak kW must be confirmed."
},
{
"inputKey": "battery_capacity_kwh",
"value": 3000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Four-hour storage at 750 kW is a plausible planning size but may be oversized for a leased grocery tenant."
},
{
"inputKey": "critical_loads_supported",
"value": [
"refrigeration racks",
"selected refrigerated cases",
"point of sale",
"emergency lighting",
"network and controls"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic grocery resilience priorities."
},
{
"inputKey": "peak_kw_confirmed",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The available field list includes peak_kw, but no peak kW value is present."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection status or application ID is provided."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No battery vendor quote, one-line diagram, or interconnection study is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Possible tax-credit or resilience value may exist, but many grants require disadvantaged-community, critical-facility, public-sector, or resilience-program criteria not established here.",
"Leased-site control, interconnection, and peak demand data are missing."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Small customer-facing Level 2 charging installation in the store parking lot, potentially paired with ADA-accessible parking improvements and electrical make-ready work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8480000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $84,800 for a modest Level 2 installation."
},
{
"inputKey": "level_2_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four customer-facing ports is a plausible small grocery parking-lot amenity project."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The generic EV charger preview cost is far more consistent with Level 2 charging than DC fast charging."
},
{
"inputKey": "public_access_planned",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Customer-facing grocery parking chargers would normally be publicly accessible during store hours."
},
{
"inputKey": "fleet_charging_use_case",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case does not identify a store-owned fleet or fleet charging need."
},
{
"inputKey": "school_bus_charging_use_case",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a grocery store and not a school-bus site."
},
{
"inputKey": "site_host_agreement_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No EV site-host agreement or landlord consent is included."
},
{
"inputKey": "utility_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrical capacity and transformer availability are not provided."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No EVSE quote or make-ready estimate is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not treat school-bus, corridor, or competitive community-charging grants as automatically eligible merely because EV charging is present.",
"A small grocery Level 2 project may need site-host, utilization, disadvantaged-community, and application facts before any grant estimate is calculated."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Install four dual-cord or equivalent Level 2 charging ports for grocery customers and employees in the existing parking area.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8480000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing Level 2 preview cost of $84,800."
},
{
"inputKey": "charger_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A four-port installation is plausible for a grocery customer amenity."
},
{
"inputKey": "charger_power_kw_each",
"value": 11.5,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "11.5 kW is a common commercial Level 2 planning assumption."
},
{
"inputKey": "ada_accessible_charging_stall_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public customer-facing charging projects commonly include accessibility requirements."
},
{
"inputKey": "landlord_parking_lot_approval_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Parking-lot trenching and charging-stall dedication require property-owner approval."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview cost is not a contractor quote."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be eligible for some local or utility EVSE programs, but statewide competitive grant eligibility should remain uncertain.",
"Requires site control, public-access plan, and quote details."
]
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"projectScopeSummary": "Potential DC fast charging station in grocery parking lot; not recommended as a default scope without a host agreement, utility capacity study, and commercial charging operator partner.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 414000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $4,140,000, but this is a large project for a leased grocery tenant."
},
{
"inputKey": "dcfc_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A four-port DCFC site is plausible for a charging operator but not established for this customer."
},
{
"inputKey": "charger_power_kw_each",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "150 kW is a common planning size, but actual charger power is not specified."
},
{
"inputKey": "third_party_charging_operator_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No charging operator, site-host agreement, or revenue model is included."
},
{
"inputKey": "utility_capacity_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A DCFC project would require utility service and transformer review; no such study is present."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No DCFC equipment, make-ready, or interconnection quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate competitive DCFC grant estimates without site-host, corridor/community eligibility, and application facts.",
"This scope is less realistic than a small Level 2 customer amenity project for this tenant."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal preheat for grocery hot-water loads; technically possible but unlikely to be a priority due to roof/site-control constraints and competing HVAC/refrigeration needs.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 68000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $680,000."
},
{
"inputKey": "roof_mount_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Solar thermal collectors typically require roof or other exterior mounting."
},
{
"inputKey": "roof_rights_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is leased and no roof-rights documentation is supplied."
},
{
"inputKey": "daily_hot_water_load_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar water heating economics require daily hot-water load data."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No solar thermal quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress grant estimates until roof rights, collector size, and hot-water load are known.",
"This is not a likely first-priority project for this customer."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat-pump conversion; not realistic for this leased urban grocery site absent major redevelopment and landlord control.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 157600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost, but the scope is unlikely for this site."
},
{
"inputKey": "ground_loop_area_available_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased grocery store parking lot is unlikely to have confirmed ground-loop rights or available area without major owner involvement."
},
{
"inputKey": "major_redevelopment_planned",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring and no redevelopment plan is present."
},
{
"inputKey": "engineering_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geothermal feasibility study is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This scope should generally be marked not relevant unless the landlord is undertaking a major redevelopment.",
"Grant estimates should be suppressed due to site-control and feasibility uncertainty."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Natural-gas CHP for grocery electric and thermal loads; not recommended as a default decarbonization or grant-seeking scope.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1200000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $12,000,000."
},
{
"inputKey": "chp_capacity_kw",
"value": 600,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A synthetic 600 kW system may fit a high-load grocery profile, but no thermal-load match or engineering analysis is present."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No simultaneous hot-water or process thermal load analysis is provided."
},
{
"inputKey": "air_permit_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion generation typically triggers air-permitting review."
},
{
"inputKey": "decarbonization_alignment",
"value": "poor",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A new natural-gas CHP system is generally less aligned with electrification-focused grant programs."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force positive grant estimates for gas-fired CHP.",
"Requires thermal-load study, air permit review, interconnection, and owner approval."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "On-site biomass or biogas generation using grocery organic waste; unrealistic for a single leased retail grocery store.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 900000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $9,000,000 but the scope is not realistic for this customer."
},
{
"inputKey": "onsite_biogas_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A single grocery store is unlikely to have enough controlled organic feedstock for a standalone energy system."
},
{
"inputKey": "waste_hauler_controls_feedstock",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The siteEnergyProfile identifies Republic Services as the latest utility provider for waste-related data."
},
{
"inputKey": "air_and_solid_waste_permits_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Biomass or biogas systems usually involve complex permitting and are not typical tenant improvements."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Mark not relevant unless a separate waste-to-energy developer and host-site project is introduced.",
"Do not infer grant eligibility from ordinary grocery organic waste service."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Full microgrid with storage and controls for resilience; plausible only as a major owner-led project, not as a normal tenant-led grocery retrofit.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1092000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $10,920,000."
},
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A true microgrid would require controls, but no design is provided."
},
{
"inputKey": "onsite_generation_source_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No PV, fuel cell, generator, or other generation source is identified in the fixture."
},
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grocery store may provide community value but is not automatically a formally designated critical facility."
},
{
"inputKey": "utility_interconnection_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection or islanding study is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress microgrid grant estimates unless critical-facility status, generation source, site control, and interconnection facts are added.",
"The cost and complexity are disproportionate to the current tenant-led exploring stage."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage for refrigeration or HVAC load shifting; technically possible but not enough design detail is available.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 551000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $5,510,000."
},
{
"inputKey": "storage_type",
"value": "ice_or_phase_change_storage_unknown",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not identify the thermal storage technology."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity must be designed around refrigeration or HVAC load-shifting goals."
},
{
"inputKey": "demand_response_program_participation",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Value depends on tariffs, demand charges, and demand response program participation."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No design or vendor quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Requires engineered scope and demand-management value case.",
"Do not calculate grant estimates from generic cost alone."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Limited envelope or roof insulation work; not a primary opportunity for a leased grocery tenant unless coordinated with landlord roof replacement or refrigerated-space envelope repairs.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 31600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $316,000."
},
{
"inputKey": "roof_or_wall_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Envelope measure quantity is not provided."
},
{
"inputKey": "landlord_roof_project_planned",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Envelope upgrades in leased retail space usually need owner-led roof or shell work."
},
{
"inputKey": "refrigerated_space_envelope_repair_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No cold-room envelope repair scope is described."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress until actual envelope area, baseline insulation, and landlord project scope are known."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine; not realistic for this urban/suburban retail grocery site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 800000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost of $8,000,000 but the project is not appropriate for this profile."
},
{
"inputKey": "wind_resource_assessment_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind resource study is present, and urban retail locations are generally poor small-wind candidates."
},
{
"inputKey": "zoning_allows_wind_turbine",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Zoning and height limits are unknown."
},
{
"inputKey": "site_control_for_tower_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased grocery tenant would not normally have tower siting rights."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Mark not relevant and suppress grant calculations."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification for existing grocery operations; possible but not normally pursued as a grant-funded retrofit without a corporate sustainability mandate or major renovation.",
"inputFacts": [
{
"inputKey": "certification_type",
"value": "LEED O+M",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For an operating grocery store, LEED Operations and Maintenance would be more plausible than new-construction certification."
},
{
"inputKey": "certification_consultant_cost_cents",
"value": 8500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic soft-cost planning value; no certification quote is present."
},
{
"inputKey": "corporate_certification_mandate",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied fixture does not indicate a corporate LEED mandate."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Certification fees alone are often not grant-eligible energy project costs.",
"Do not force qualification without a specific certification-support program."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "school_bus_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a retail grocery store, not a school-bus charging site."
},
{
"inputKey": "school_district_or_school_bus_operator_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No school, school district, county office of education, or school-bus fleet operator facts are present."
},
{
"inputKey": "eligible_school_bus_fleet_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The store is not identified as owning or hosting school buses."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant application facts are present."
}
],
"reasoning": "Despite a broad EV-charging technology match in discovery, this RECESS opportunity is school-bus-site focused. The grocery store profile should not receive a positive estimate."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "nevi_corridor_or_community_charging_site_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not establish whether this location fits NEVI corridor/community site requirements."
},
{
"inputKey": "dc_fast_charging_scope_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The more realistic EV scope for this grocery tenant is a small Level 2 customer amenity, not a NEVI-style DCFC project."
},
{
"inputKey": "minimum_public_uptime_commitment_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No charger operations, maintenance, networking, or uptime plan is present."
},
{
"inputKey": "site_host_or_operator_partner_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No third-party charging operator or host agreement is supplied."
},
{
"inputKey": "ev_charging_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote is available for EVSE, make-ready, utility service upgrades, or networking."
}
],
"reasoning": "The profile can support an EV charging discussion, but the current facts are insufficient for a NEVI estimate. If the project remains a four-port Level 2 amenity, it should likely be treated as not relevant to NEVI-style funding."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "community_charging_project_selected",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not indicate a formal community-charging project, only generic EV charger opportunities."
},
{
"inputKey": "public_access_hours_per_day",
"value": 14,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A grocery store may be open long hours, but actual charger access hours are not confirmed."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic near-term scope is Level 2, not DCFC."
},
{
"inputKey": "level_2_charger_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four Level 2 ports are included as a plausible grocery amenity scope."
},
{
"inputKey": "disadvantaged_or_priority_community_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The normalized geo designations array is empty and no tract-level program designation is provided."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application submission or award status is included."
}
],
"reasoning": "A grocery parking lot could be a community charging host, but the current record lacks the project scope, public-access commitments, site-control evidence, and application status needed for a grant estimate."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quote_total_cents",
"reason": "quote not available"
},
{
"inputKey": "measure_level_incentive_application_id",
"reason": "application not submitted"
},
{
"inputKey": "agency_preapproval_status",
"reason": "source requires agency approval"
},
{
"inputKey": "landlord_consent_document",
"reason": "needs user decision"
},
{
"inputKey": "remaining_lease_term_years",
"reason": "needs user decision"
},
{
"inputKey": "electric_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "peak_kw",
"reason": "needs user decision"
},
{
"inputKey": "monthly_kwh",
"reason": "needs user decision"
},
{
"inputKey": "monthly_therms",
"reason": "needs user decision"
},
{
"inputKey": "equipment_nameplate_inventory",
"reason": "quote not available"
},
{
"inputKey": "utility_pre_inspection_result",
"reason": "source requires agency approval"
},
{
"inputKey": "ev_charger_site_host_agreement",
"reason": "needs user decision"
},
{
"inputKey": "ev_charger_networking_and_uptime_plan",
"reason": "needs user decision"
},
{
"inputKey": "dc_fast_charger_utility_capacity_study",
"reason": "quote not available"
},
{
"inputKey": "school_bus_fleet_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "tribal_entity_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "agricultural_producer_tax_or_program_status",
"reason": "unrealistic for this customer"
},
{
"inputKey": "geothermal_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biogas_feedstock_control_agreement",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The customer is a private commercial grocery tenant, not a school, public entity, tribal entity, nonprofit, or agricultural producer.",
"Anaheim Public Utilities should be used for electric eligibility; do not assume Southern California Edison program eligibility.",
"The site is leased, so rooftop, parking-lot, exterior electrical, HVAC, microgrid, and ground-loop work require landlord approval and site-control evidence.",
"Generic EV charger discovery matches should not be treated as eligibility for school-bus, NEVI corridor, or competitive community-charging programs.",
"Small Level 2 EV charging is plausible as a customer amenity but lacks quote, site-host, public-access, and application facts.",
"DC fast charging is not realistic as a default tenant-led scope without a charging operator partner and utility capacity study.",
"Ground-source geothermal, small wind, biomass/biogas, CHP, and full microgrid projects are not realistic first-priority measures for this leased grocery site.",
"Cooling-tower optimization should not qualify until cooling tower or evaporative condenser presence is confirmed.",
"Preview costs are synthetic planning values and should not substitute for contractor quotes where grant formulas require eligible cost documentation.",
"No grant application has been submitted, no preapproval has been issued, and no award amount should be inferred from matched opportunity metadata alone."
]
}

