{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "juniper-and-ivy-san-diego",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment based on the supplied test-case facts for an independent leased San Diego restaurant/commercial kitchen in SDG&E territory. Profile intentionally suppresses school-bus, NEVI/DC fast-charging, public-agency, agricultural, and residential-only grant estimates where the restaurant profile does not support qualification. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case describes a commercial business restaurant/commercial kitchen in SDG&E territory."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Juniper & Ivy is modeled as an independent commercial restaurant, not a nonprofit applicant."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A private restaurant would not normally be a city, county, state, school district, or other public agency applicant."
},
{
"inputKey": "is_school_or_school_bus_operator",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a restaurant and commercial kitchen, not a school-bus depot or eligible school-bus site."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The NAICS and site use are full-service restaurant operations, not agricultural production."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No test-case facts indicate tribal ownership or tribal applicant status."
},
{
"inputKey": "owns_site_building",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile identifies the ownership relationship as tenant."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Tenant projects affecting electrical service, rooftop equipment, exterior walls, roof penetrations, or parking areas generally require owner approval."
},
{
"inputKey": "landlord_approval_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is still exploring and no lease amendment, owner consent, or site-control document is provided."
},
{
"inputKey": "has_dedicated_customer_parking_under_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased urban restaurant in Little Italy is more likely to rely on street, valet, or shared parking than to control a grant-ready charging site."
},
{
"inputKey": "public_ev_charging_host_intent",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic restaurant scope is small Level 2 guest/staff charging if any, not a public fast-charging station business model."
},
{
"inputKey": "owns_or_operates_vehicle_fleet",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No test-case facts indicate a delivery fleet, school-bus fleet, or depot operation."
},
{
"inputKey": "has_existing_ev_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No existing EV charging equipment is listed; assuming none until a site walk confirms otherwise."
},
{
"inputKey": "grant_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring and no application record is provided."
},
{
"inputKey": "has_signed_vendor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture contains preview costs but no vendor quote, scope of work, or equipment submittal."
},
{
"inputKey": "preferred_financing_status",
"value": "undecided",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The business has not selected between cash purchase, leasehold improvement allowance, financing, or landlord-funded work."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form identifies project.stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "There are no quotes or selected equipment records; the customer appears to be using discovery-stage grant screening."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 15918000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Converted from the supplied annual electric cost of $159,180."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 9850000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Converted from the supplied annual gas cost of $98,500."
},
{
"inputKey": "annual_kwh",
"value": 568500,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual kWh is supplied in the site energy profile."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Exploratory small-site Level 2 charging for staff or guests, contingent on parking control, landlord approval, panel capacity, and utility interconnection review. Not modeled as NEVI DC fast charging.",
"inputFacts": [
{
"inputKey": "charger_type",
"value": "level_2_ac",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small leased restaurant would more realistically consider Level 2 charging than DC fast charging."
},
{
"inputKey": "ev_charger_ports",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two ports is a plausible limited-scope pilot for staff or customer amenity use."
},
{
"inputKey": "ev_charger_power_kw_per_port",
"value": 7.2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 208/240V Level 2 charger commonly falls in this range for commercial applications."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing admin preview upfront cost, but a real estimate should require a quote and site electrical assessment."
},
{
"inputKey": "parking_spaces_controlled_by_applicant",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes no dedicated applicant-controlled parking until verified due to the leased urban restaurant context."
},
{
"inputKey": "utility_make_ready_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No make-ready or service-upgrade quote is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could qualify for a small utility rebate or technical assistance if a landlord-approved Level 2 scope is later documented.",
"Should not be treated as qualified for school-bus, depot, or NEVI DC fast-charging grants without a very different project scope.",
"Site control and dedicated parking are unresolved."
]
},
{
"retrofitTypeId": "fleet_charging_infrastructure",
"projectScopeSummary": "No fleet-charging project is realistic for the current profile because the restaurant is not modeled as owning or operating a vehicle fleet.",
"inputFacts": [
{
"inputKey": "fleet_vehicle_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No delivery or company fleet is listed in the test case."
},
{
"inputKey": "fleet_electric_vehicle_count_existing",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No existing EV fleet facts are provided."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Fleet charging should remain unset because there is no qualifying fleet scope."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress fleet-charging estimates unless the user later provides owned or contracted fleet vehicles and depot charging details."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop HVAC units serving dining and kitchen-adjacent areas with higher-efficiency commercial units, subject to landlord approval and equipment quote.",
"inputFacts": [
{
"inputKey": "hvac_unit_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 7,580 sq ft restaurant commonly has multiple packaged units or split zones."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 22.5,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 2.5 to 3 tons per 1,000 sq ft with restaurant heat gains; real sizing requires load calculations."
},
{
"inputKey": "selected_measure_type",
"value": "high_efficiency_packaged_rooftop_unit_replacement",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Packaged commercial HVAC replacement is realistic for a leased restaurant tenant improvement."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for grant calculation testing, pending a contractor quote."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No HVAC quote, AHRI certificate, or selected model information is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility should depend on equipment efficiency tiers, existing equipment baseline, and whether the program accepts tenant applicants.",
"Quote and manufacturer specifications are required before calculating equipment-specific incentives."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Possible partial electrification of HVAC zones with heat-pump rooftop or split equipment, but full conversion may be constrained by restaurant ventilation, lease terms, roof access, and electrical capacity.",
"inputFacts": [
{
"inputKey": "heat_pump_unit_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial two-unit replacement is a plausible first phase for a restaurant tenant."
},
{
"inputKey": "heat_pump_total_capacity_tons",
"value": 15,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Preliminary capacity only; actual sizing depends on kitchen loads and existing zoning."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost while leaving equipment eligibility uncertain."
},
{
"inputKey": "existing_heat_source",
"value": "mixed_gas_and_electric_hvac",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Restaurant gas use is high, but HVAC fuel and kitchen fuel should be verified separately."
},
{
"inputKey": "electrical_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Heat-pump conversion may require panel or service upgrades, but no electrical assessment is available."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Program rules may distinguish HVAC electrification from standard high-efficiency replacement.",
"Incentive calculation should be suppressed until equipment specs and fuel-switching baseline are known."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Replace or supplement gas commercial water heating with a commercial heat pump water heater system serving dishwashing and kitchen hot water loads, if space, ventilation, and electrical capacity allow.",
"inputFacts": [
{
"inputKey": "commercial_hpwh_system_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single packaged commercial HPWH system is plausible for an exploratory restaurant decarbonization project."
},
{
"inputKey": "storage_capacity_gallons",
"value": 240,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Restaurant hot water demand is high; actual design requires kitchen fixture and dishwasher data."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost as a test fixture input, not a real quote."
},
{
"inputKey": "existing_water_heater_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has substantial annual gas cost, and commercial restaurants commonly use gas water heating."
},
{
"inputKey": "plumbing_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No mechanical/plumbing design or quote is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Commercial HPWH incentives often require equipment listing, baseline fuel confirmation, and customer account validation.",
"Operational suitability is uncertain because restaurants have high peak hot-water loads."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Upgrade walk-in refrigeration components and kitchen refrigeration controls, likely including efficient evaporator fan motors, door controls, anti-sweat heater controls, and one high-efficiency reach-in or prep-table replacement.",
"inputFacts": [
{
"inputKey": "walk_in_cooler_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A full-service restaurant/commercial kitchen commonly has at least one walk-in cooler."
},
{
"inputKey": "walk_in_freezer_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A restaurant of this size commonly has freezer capacity, though this should be confirmed."
},
{
"inputKey": "refrigeration_measure_types",
"value": [
"ecm_evaporator_fan_motors",
"anti_sweat_heater_controls",
"auto_door_closers",
"high_efficiency_reach_in_refrigerator"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic commercial kitchen refrigeration measures with modest disruption."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost for test-case calculation; actual incentive treatment depends on measure-level quantities."
},
{
"inputKey": "refrigeration_inventory_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No refrigeration asset list or equipment nameplate data is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for deemed commercial kitchen or custom energy-efficiency incentives, not broad grant funding.",
"Calculation should require equipment counts, wattage, run hours, and utility program measure codes."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Limited interior and kitchen back-of-house LED fixture replacement using the existing preview assumption of 12 fixtures.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview explicitly assumes 12 fixture replacements."
},
{
"inputKey": "lighting_measure_type",
"value": "interior_led_fixture_replacement",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Interior LED replacement is realistic for a restaurant."
},
{
"inputKey": "annual_operating_hours",
"value": 4380,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 12 hours per day, 365 days per year for restaurant service and prep activities."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost."
},
{
"inputKey": "lighting_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No fixture schedule, DLC listing, or contractor quote is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely a rebate-scale measure rather than a grant-scale project.",
"Should not force a grant estimate if the applicable program requires preapproval before purchase."
]
},
{
"retrofitTypeId": "automated_demand_response_controls",
"projectScopeSummary": "Install demand-response capable controls for HVAC setbacks, refrigeration defrost scheduling, and noncritical load curtailment during utility events.",
"inputFacts": [
{
"inputKey": "controllable_peak_kw",
"value": 35,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Estimated from the annual electric use of a high-load restaurant; actual enrolled load requires interval data."
},
{
"inputKey": "adr_gateway_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single site-level gateway is plausible for a small commercial facility."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 212000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for test data."
},
{
"inputKey": "interval_meter_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interval data or peak kW value is included in the provided profile."
},
{
"inputKey": "demand_response_program_enrollment_status",
"value": "not_enrolled",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No DR enrollment or aggregator agreement is listed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A restaurant may participate in DR, but grants or incentives should be suppressed until dispatchable load and program enrollment are confirmed."
]
},
{
"retrofitTypeId": "energy_management_system",
"projectScopeSummary": "Install a small commercial energy management system integrating HVAC schedules, kitchen equipment monitoring, and alerts for after-hours loads.",
"inputFacts": [
{
"inputKey": "ems_control_points",
"value": 18,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest number of control points is plausible for HVAC zones, kitchen circuits, and refrigeration loads."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 254400,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost for testing, pending vendor scope."
},
{
"inputKey": "existing_bms_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A standalone restaurant may not have a full building management system, but this should be verified."
},
{
"inputKey": "vendor_scope_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No controls vendor scope or point list is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely useful for energy management but not grant-ready without a program-specific controls incentive or custom project study."
]
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"projectScopeSummary": "Install submeters for kitchen, HVAC, refrigeration, and whole-site monitoring to support operational savings and future custom incentive documentation.",
"inputFacts": [
{
"inputKey": "submeter_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Six submeters can cover major load categories in a restaurant without becoming a full metering overhaul."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 84800,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No M&V plan is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could support audit, custom incentive, or monitoring programs, but usually requires a defined M&V or commissioning scope."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Commercial behind-the-meter battery concept for demand management and outage resilience for critical refrigeration and point-of-sale loads, subject to interconnection, fire review, landlord approval, and economics.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A restaurant with 568,500 annual kWh could justify a modest commercial battery, but interval demand data is needed."
},
{
"inputKey": "battery_capacity_kwh",
"value": 240,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Three-hour storage at 80 kW is a conservative commercial resilience/demand management concept."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview upfront cost."
},
{
"inputKey": "paired_with_solar_pv",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The rooftop solar PV preview is not grant-ready and the tenant likely lacks roof control."
},
{
"inputKey": "critical_load_panel_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical loads such as refrigeration, POS, and minimal lighting are plausible but not documented."
},
{
"inputKey": "interconnection_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No interconnection or utility application information is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Battery project may be technically plausible but should not be grant-qualified without resilience program fit, interval demand data, site control, and quote.",
"Most storage incentives are highly rule-specific and may require critical facility, equity, resiliency, or income/disadvantaged-community criteria not present here."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Microgrid is not realistic as a near-term restaurant tenant project; it would require landlord-led site control, DER integration, interconnection, protection engineering, and a resilience justification.",
"inputFacts": [
{
"inputKey": "microgrid_controller_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A controller would be required only if a real microgrid scope existed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview cost should not drive grant estimates because there is no realistic project definition."
},
{
"inputKey": "is_critical_public_facility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A private restaurant is not normally a public safety, emergency response, or community resilience facility."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the landlord or property owner develops a site-wide microgrid project with documented critical-load and interconnection scope."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Rooftop PV is unlikely as a tenant-led restaurant project because roof control, structural review, landlord approval, and available roof area are unknown.",
"inputFacts": [
{
"inputKey": "solar_pv_system_kw_dc",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 75 kW conceptual system could offset a portion of annual usage, but the actual rooftop area and interconnection limits are unknown."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost only; should not be used as a grant-ready quote."
},
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a tenant and no roof rights are documented."
},
{
"inputKey": "structural_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No structural or roof assessment is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force solar grant qualification for a leased restaurant without roof control.",
"Could be reconsidered if landlord signs on as co-applicant or provides written roof rights."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal hot water is technically related to restaurant hot-water loads but unlikely due to roof access, plumbing complexity, and tenant control constraints.",
"inputFacts": [
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": 320,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest collector array is plausible for a restaurant but not validated against roof area or load profile."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost but should require engineering and plumbing quote."
},
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Tenant does not have documented roof control."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress grant estimates unless roof rights, system design, and hot-water load study are provided."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source geothermal is unrealistic for this leased urban restaurant due to lack of land control, drilling disruption, permitting complexity, and high cost relative to tenant scope.",
"inputFacts": [
{
"inputKey": "available_drilling_area_sqft",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A dense leased restaurant site is unlikely to control adequate drilling area."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Do not use a preview cost for an unrealistic project scope."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress as unrealistic unless a landlord-led redevelopment project provides site-control and engineering facts."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Minor envelope improvements may be possible during renovations, but a broad insulation retrofit is unlikely to be a priority for a restaurant tenant with kitchen ventilation-driven loads.",
"inputFacts": [
{
"inputKey": "insulation_area_sqft",
"value": 1500,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Represents a limited back-of-house or roof/ceiling insulation scope, not a full envelope retrofit."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost, but actual grant relevance is weak."
},
{
"inputKey": "envelope_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No envelope audit or construction drawings are provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely low priority and may not be eligible without a broader audit-backed project."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not recommended for this test profile due to decarbonization policy risk, emissions/permitting burden, tenant constraints, and lack of continuous thermal-load study.",
"inputFacts": [
{
"inputKey": "chp_system_kw",
"value": 60,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small CHP size could match commercial kitchen loads, but no thermal-load study is available."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Do not use preview cost for a grant estimate because the project is not realistically qualified."
},
{
"inputKey": "air_permit_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion generation in an urban restaurant setting would likely require emissions/permitting review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless customer provides a CHP feasibility study, air permitting path, landlord approval, and program-specific eligibility."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas generation is unrealistic for a leased restaurant; food waste diversion should be handled through organics service rather than onsite energy production.",
"inputFacts": [
{
"inputKey": "onsite_biogas_feedstock_available_tons_per_year",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A restaurant does not have sufficient controlled feedstock for onsite biogas energy generation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project is unrealistic for this profile and should not calculate from preview cost."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force biomass/biogas grant eligibility for a restaurant tenant."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is unrealistic at this urban leased restaurant site due to zoning, roof/land control, turbulence, structural constraints, and customer use case.",
"inputFacts": [
{
"inputKey": "small_wind_system_kw",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Do not model wind capacity for a dense urban restaurant tenant."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Project should be suppressed as unrealistic."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress small-wind estimates for this profile."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage is not a realistic near-term tenant project unless paired with a major HVAC or refrigeration plant redesign.",
"inputFacts": [
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No central chilled-water plant or thermal storage design is present."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Preview cost should not be used without an engineered scope."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless a major mechanical redesign is documented."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not a retrofit grant project for this customer unless tied to a major tenant improvement or landlord-led building certification.",
"inputFacts": [
{
"inputKey": "certification_target",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No certification target or construction project is documented."
},
{
"inputKey": "leed_consultant_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No LEED consultant scope is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not treat LEED certification as a grant-eligible energy retrofit without a specific program."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "eligible_school_bus_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project site is a restaurant/commercial kitchen, not a school-bus charging site."
},
{
"inputKey": "school_bus_fleet_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No school bus fleet or school transportation operations exist in the profile."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is in an exploring stage and no application data is present."
}
],
"reasoning": "Although the broad matcher marked the EV charging opportunity as eligible, the named opportunity is for eligible school-bus sites and should not produce a positive estimate for a restaurant."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "nevi_dc_fast_charging_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The realistic project is small Level 2 charging, not NEVI-style DC fast charging."
},
{
"inputKey": "public_charging_site_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tenant has not documented control of a publicly accessible charging site."
},
{
"inputKey": "charger_minimum_power_kw",
"value": 7.2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled charger scope is Level 2, well below typical DC fast charging project concepts."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No NEVI application or solicitation response is provided."
}
],
"reasoning": "Suppress NEVI formula grant estimates unless the user provides a public DC fast-charging scope, site-control evidence, corridor/community charging fit, and application status."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "community_charging_public_access_plan",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The restaurant is not modeled as developing a community charging hub."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The modeled scope is two Level 2 ports, not DC fast chargers."
},
{
"inputKey": "site_host_agreement_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No landlord or site-host agreement is included."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No CEC solicitation application status is provided."
}
],
"reasoning": "The restaurant profile should not receive a NEVI community charging grant estimate without a grant-scale public charging project and site-control documentation."
},
{
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "sdge_customer_verified",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case identifies SDG&E as the electric and gas utility, but account validation is still needed."
},
{
"inputKey": "technical_assistance_requested",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No assistance request or intake record is provided."
},
{
"inputKey": "ev_project_scope_ready",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Parking control, charger quantity, charger type, panel capacity, and landlord approval are not sufficiently documented."
}
],
"reasoning": "SDG&E technical assistance may be relevant for early EV planning, but it should not generate a dollar grant estimate without a concrete charger scope and eligibility review."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "signed_contractor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "equipment_make_model_and_efficiency",
"reason": "quote not available"
},
{
"inputKey": "landlord_consent_document",
"reason": "needs user decision"
},
{
"inputKey": "lease_term_remaining_months",
"reason": "needs user decision"
},
{
"inputKey": "utility_account_number_full",
"reason": "needs user decision"
},
{
"inputKey": "interval_meter_data_15_minute",
"reason": "needs user decision"
},
{
"inputKey": "ev_site_control_agreement",
"reason": "unrealistic for this customer"
},
{
"inputKey": "nevi_application_award_amount_cents",
"reason": "application not submitted"
},
{
"inputKey": "school_bus_site_approval",
"reason": "unrealistic for this customer"
},
{
"inputKey": "school_bus_fleet_vin_list",
"reason": "unrealistic for this customer"
},
{
"inputKey": "dc_fast_charger_vendor_quote_cents",
"reason": "unrealistic for this customer"
},
{
"inputKey": "battery_interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "roof_rights_for_solar_or_solar_thermal",
"reason": "needs user decision"
},
{
"inputKey": "structural_roof_assessment",
"reason": "quote not available"
},
{
"inputKey": "custom_incentive_preapproval",
"reason": "source requires agency approval"
}
],
"doNotForceQualificationReasons": [
"The customer is a private, for-profit restaurant tenant, not a school, public agency, nonprofit, tribal entity, agricultural producer, or school-bus operator.",
"The realistic EV scope is at most a small Level 2 charger project; it should not be treated as NEVI DC fast charging or school-bus charging infrastructure.",
"Tenant status creates material uncertainty for rooftop, exterior, parking, electrical-service, battery, solar, and mechanical projects until landlord approval and site control are documented.",
"The profile has preview costs but no signed quotes, equipment specifications, contractor scopes, utility preapproval, or grant applications.",
"Large DER projects such as microgrid, CHP, biomass/biogas, small wind, geothermal, and thermal energy storage are not realistic near-term projects for this leased urban restaurant.",
"Restaurant foodservice eligibility should not be stretched to match residential-only, agricultural, education-campus, public-sector, or critical-facility programs.",
"Grant calculations should be suppressed where the only evidence is a broad technology match and not a program-specific eligibility fact."
]
}

