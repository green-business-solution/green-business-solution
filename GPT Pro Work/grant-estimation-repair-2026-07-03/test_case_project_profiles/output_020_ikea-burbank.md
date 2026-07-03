{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "ikea-burbank",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment based on the supplied Prompt 20 test-case facts for a large-format IKEA Burbank retail store, warehouse, restaurant, and parking facility. Use these inputs to test grant estimate calculation, suppression, and ineligibility handling. Source context: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies IKEA Burbank as a commercial business, not a nonprofit."
},
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies the applicant as a private commercial retail business."
},
{
"inputKey": "organization_is_school_or_school_bus_operator",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A large-format furniture retailer would not normally operate as an eligible school or school-bus site."
},
{
"inputKey": "organization_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No facts suggest tribal ownership, control, or designation."
},
{
"inputKey": "organization_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site activity is retail, warehousing, showroom, and restaurant operations, not agricultural production."
},
{
"inputKey": "organization_is_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied organization size is 251-1,000 employees for the local/customer profile, and IKEA is a large commercial brand; small-business-only grant logic should not be forced."
},
{
"inputKey": "electric_utility_customer_class",
"value": "commercial_large",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual electric use near 7.98 million kWh and a 456,000-square-foot store support a large commercial customer classification, but the exact Burbank Water and Power tariff is not confirmed."
},
{
"inputKey": "gas_utility_customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Restaurant and water-heating loads are consistent with commercial SoCalGas service, but rate schedule remains unknown."
},
{
"inputKey": "site_control_status",
"value": "unknown_likely_long_term_operating_control",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership is unknown in the supplied profile, but a large-format IKEA store would generally need long-term operational control for energy projects. Grant logic should still require owner authorization for capital measures."
},
{
"inputKey": "landlord_consent_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership status is explicitly uncertain, so tenant/landlord consent cannot be assumed."
},
{
"inputKey": "has_customer_parking_lot",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A 456,000-square-foot suburban IKEA store would normally include a large customer parking field or structured parking area."
},
{
"inputKey": "has_fleet_operations",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The warehouse and delivery/staging functions make some site fleet or logistics activity plausible, but vehicle counts and ownership are not confirmed."
},
{
"inputKey": "fleet_vehicle_count_on_site",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fleet size materially affects fleet-charging grants and cannot be inferred reliably from store size alone."
},
{
"inputKey": "is_disadvantaged_or_priority_community_site",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No tract-level designation is supplied. Do not infer priority-community status from city or ZIP alone."
},
{
"inputKey": "annual_kwh",
"value": 7980000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Carried forward from the supplied site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 123690000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Converted from the supplied annual electric cost of $1,236,900."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 21888000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Converted from the supplied annual gas cost of $218,880."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object lists stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_rfp_budgeting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case is at exploration stage, so detailed vendor selection and final quotes should not be assumed."
},
{
"inputKey": "has_submitted_grant_application",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted application is provided. Estimate logic should not assume pending or approved grant status."
},
{
"inputKey": "has_binding_vendor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied savings previews are admin-modeled and explicitly not customer quotes."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install a customer-facing and employee/fleet-ready EV charging hub in the IKEA Burbank parking area, with a modest mix of DC fast charging and Level 2 ports suitable for retail dwell time.",
"inputFacts": [
{
"inputKey": "ev_charger_project_use_case",
"value": "public_customer_employee_and_light_fleet_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large destination retail site can plausibly serve public customer charging, employees, and limited delivery or service fleet charging."
},
{
"inputKey": "level2_ports",
"value": 20,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Twenty Level 2 ports is a realistic early-phase deployment for a large-format retail store without assuming a full parking-lot electrification project."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four DC fast-charging ports create a meaningful public charging scope while avoiding an unrealistically large NEVI-style corridor station assumption."
},
{
"inputKey": "dc_fast_charger_power_kw_each",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "150 kW is a common planning assumption for retail-site DC fast chargers."
},
{
"inputKey": "level2_power_kw_each",
"value": 7.2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "7.2 kW is a typical commercial Level 2 charging-port assumption."
},
{
"inputKey": "estimated_total_evse_project_cost_cents",
"value": 185000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A mixed Level 2 and DC fast-charging retail installation with trenching, switchgear, make-ready work, networking, and signage could plausibly cost around $1.85 million before utility-side upgrades."
},
{
"inputKey": "eligible_evse_equipment_cost_cents",
"value": 98000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Separates charger hardware and directly eligible EVSE costs from civil work and utility infrastructure."
},
{
"inputKey": "utility_make_ready_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Transformer, service, and distribution upgrade costs require a Burbank Water and Power service study or make-ready quote."
},
{
"inputKey": "charging_station_publicly_accessible",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Customer-facing charging is plausible at a destination retail site, but operating hours and payment access should be confirmed."
},
{
"inputKey": "charging_station_near_alternative_fuel_corridor",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "NEVI corridor or community charging eligibility depends on specific siting criteria and cannot be inferred from address alone here."
},
{
"inputKey": "charger_networking_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public charging projects normally include networked stations for access control, payment, and uptime reporting."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"School-bus-specific charging grants should be marked ineligible unless IKEA is partnering with an eligible school-bus fleet.",
"NEVI-style awards may require specific corridor, uptime, public access, connector, minimum-power, and site-host requirements.",
"Utility-side upgrade costs and final eligible cost should remain suppressed until a utility study or vendor quote is available."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install behind-the-meter lithium-ion battery storage to reduce demand charges, support resilience for critical retail, refrigeration, IT, lighting, and food-service loads, and potentially pair with a future solar canopy or rooftop PV project.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 1 MW battery is plausible for a 7.98 million kWh/year large retail facility while remaining conservative for a first-phase project."
},
{
"inputKey": "battery_capacity_kwh",
"value": 4000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A four-hour 1 MW / 4 MWh battery is a common commercial storage planning configuration."
},
{
"inputKey": "battery_duration_hours",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four-hour duration is consistent with many commercial demand management and resilience use cases."
},
{
"inputKey": "estimated_battery_project_cost_cents",
"value": 360000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A turnkey 4 MWh commercial battery project with controls, fire protection, interconnection, and construction could plausibly cost around $3.6 million."
},
{
"inputKey": "battery_itc_eligible_basis_cents",
"value": 340000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Most direct battery system costs are plausibly eligible basis, but some site/civil costs may not qualify."
},
{
"inputKey": "battery_resilience_critical_load_kw",
"value": 450,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical load estimate is synthetic and should be replaced by an electrical load study."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At exploring stage, no interconnection application should be assumed."
},
{
"inputKey": "battery_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A bankable estimate requires a vendor proposal and interconnection assumptions."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Tax-credit estimates may be more appropriate than grant estimates for a for-profit retail customer.",
"Some storage grants prioritize public agencies, critical facilities, low-income communities, or resilience hubs; IKEA should not be forced into those categories.",
"Final calculation should require interconnection status, utility tariff, and vendor quote."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop HVAC units serving showroom, warehouse support, and office areas with high-efficiency equipment and advanced controls, while retaining some gas-fired or mixed-fuel equipment where electrification is not yet scoped.",
"inputFacts": [
{
"inputKey": "existing_rooftop_unit_count",
"value": 42,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large-format retail stores often have many rooftop units, but the actual count requires equipment inventory."
},
{
"inputKey": "planned_replacement_rooftop_unit_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial replacement phase is more realistic than replacing all rooftop units at exploration stage."
},
{
"inputKey": "average_unit_capacity_tons",
"value": 25,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 25-ton average is a reasonable planning placeholder for large packaged commercial rooftop units but should be replaced by equipment schedule data."
},
{
"inputKey": "total_replaced_capacity_tons",
"value": 300,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Derived from 12 units at 25 tons each."
},
{
"inputKey": "estimated_hvac_replacement_cost_cents",
"value": 240000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial large-commercial rooftop HVAC replacement with crane, curb, controls, economizer, and commissioning costs could plausibly cost around $2.4 million."
},
{
"inputKey": "eligible_hvac_equipment_cost_cents",
"value": 180000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Equipment and direct installation costs are separated from possible roof, structural, or controls integration costs."
},
{
"inputKey": "existing_equipment_efficiency_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Grant and rebate formulas often require existing and proposed efficiency ratings."
},
{
"inputKey": "proposed_equipment_meets_code_minimum_only",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Without equipment submittals, the model cannot determine whether the project exceeds minimum code or program thresholds."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Efficiency-based incentives should remain suppressed until existing and proposed equipment ratings are known.",
"For-profit retail status may limit grant availability compared with utility rebates or tax deductions.",
"Owner approval may be required if rooftop assets are landlord-controlled."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Evaluate selective electrification of HVAC zones using high-efficiency heat-pump rooftop units or split systems, focused on offices, showroom zones, and non-kitchen areas before converting full-store heating.",
"inputFacts": [
{
"inputKey": "heat_pump_hvac_replacement_units",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A selective electrification phase is realistic for a mixed-use retail store with restaurant and warehouse loads."
},
{
"inputKey": "heat_pump_hvac_capacity_tons",
"value": 160,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes eight heat-pump rooftop units averaging 20 tons each; actual sizing requires an HVAC schedule."
},
{
"inputKey": "estimated_heat_pump_hvac_cost_cents",
"value": 176000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial commercial heat-pump HVAC conversion could plausibly cost around $1.76 million."
},
{
"inputKey": "gas_heating_displaced_therms",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile includes gas cost but not annual therms or end-use split. Gas displacement cannot be calculated reliably."
},
{
"inputKey": "electrical_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrified HVAC may require panel, transformer, or service upgrades that need engineering review."
},
{
"inputKey": "electrification_feasibility_study_cost_cents",
"value": 8500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A commercial electrification feasibility study for a large retail site could plausibly cost around $85,000."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Actual incentive calculation should require gas baseline, heat-pump performance, and incremental cost.",
"Restaurant kitchen and service water-heating gas loads should not be assumed displaced by space-conditioning retrofits.",
"Electrical capacity constraints may materially change project cost."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace remaining non-LED interior warehouse, showroom, back-of-house, exterior, and parking-area fixtures with high-efficiency LED luminaires and controls.",
"inputFacts": [
{
"inputKey": "fixture_replacement_count",
"value": 1850,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 456,000-square-foot retail and warehouse building could plausibly have roughly 1,850 remaining fixtures across sales floor, warehouse, exterior, and support spaces."
},
{
"inputKey": "average_existing_fixture_watts",
"value": 210,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing fixture wattage is a planning placeholder and should be replaced by an audit."
},
{
"inputKey": "average_proposed_fixture_watts",
"value": 95,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Proposed wattage is a conservative blended placeholder across high-bay, linear, exterior, and retail lighting."
},
{
"inputKey": "annual_lighting_operating_hours",
"value": 5200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large retail and warehouse operations have long operating and stocking hours; 5,200 annual hours is plausible for planning."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy/daylight controls are realistic in a major lighting retrofit and may be needed for deeper savings."
},
{
"inputKey": "estimated_led_project_cost_cents",
"value": 74000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A broad commercial LED retrofit at approximately $400 per fixture blended installed cost is plausible for this size of store."
},
{
"inputKey": "eligible_lighting_cost_cents",
"value": 69000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Most fixture, controls, and installation costs are likely eligible for lighting incentive logic, while audit or project-management costs may be excluded."
},
{
"inputKey": "lighting_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied profile does not include a lighting audit, fixture schedule, or quote."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Lighting grants are less likely than utility rebates or deemed incentives for a for-profit retail site.",
"Calculation should require fixture schedule, baseline wattage, proposed wattage, and operating hours before showing a precise amount.",
"Do not rely on the existing preview assumption of only 12 fixtures for this building-scale test case."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Install commercial heat-pump water-heating equipment for restroom, handwashing, and selected restaurant support loads, likely with backup or staged integration due to high food-service demand.",
"inputFacts": [
{
"inputKey": "commercial_heat_pump_water_heater_capacity_gallons",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large restaurant and public restroom load may justify about 1,000 gallons of storage, but actual sizing requires plumbing and food-service data."
},
{
"inputKey": "heat_pump_water_heater_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Four commercial units or modular systems is a plausible planning assumption."
},
{
"inputKey": "estimated_hpwh_project_cost_cents",
"value": 95000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial heat-pump water-heating with storage, controls, piping, electrical work, and commissioning could plausibly cost around $950,000."
},
{
"inputKey": "eligible_hpwh_equipment_cost_cents",
"value": 72000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Separates likely equipment and direct installation from broader plumbing/electrical enabling work."
},
{
"inputKey": "existing_water_heater_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "SoCalGas costs and restaurant activity make gas-fired service water heating plausible, but equipment inventory is not confirmed."
},
{
"inputKey": "annual_water_heating_therms_displaced",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "End-use gas split is not supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Many commercial water-heating incentives require equipment specifications and displaced gas load.",
"Kitchen process hot-water constraints may require partial rather than full electrification.",
"Electrical upgrade cost should remain unknown until engineering review."
]
},
{
"retrofitTypeId": "high_efficiency_motor_replacement",
"projectScopeSummary": "Replace selected inefficient motors and add variable-frequency drives for HVAC fans, pumps, make-up air systems, and warehouse ventilation equipment.",
"inputFacts": [
{
"inputKey": "motor_replacement_count",
"value": 18,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large mixed-use store would plausibly have numerous HVAC, pump, and ventilation motors."
},
{
"inputKey": "average_motor_hp",
"value": 15,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 15 hp average is a placeholder across mixed motor applications."
},
{
"inputKey": "vfd_count",
"value": 14,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Not every replacement motor will need a new VFD, but most large fan and pump motors could benefit."
},
{
"inputKey": "estimated_motor_vfd_project_cost_cents",
"value": 42000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A blended motor and VFD scope for 18 commercial motors could plausibly cost about $420,000 installed."
},
{
"inputKey": "motor_efficiency_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Motor nameplate, runtime, and load profile data are not included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility incentive formulas usually require motor horsepower, efficiency class, runtime, and controlled load.",
"Grant logic should not calculate from building size alone."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Evaluate a limited solar thermal preheat system for restaurant and restroom hot-water loads, but do not assume full deployment because rooftop area may be prioritized for PV, HVAC, or fire access.",
"inputFacts": [
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": 1800,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A medium commercial solar thermal array could be plausible, but roof layout and hot-water load need study."
},
{
"inputKey": "solar_water_heating_storage_gallons",
"value": 1500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Storage is a placeholder sized for partial hot-water preheating."
},
{
"inputKey": "estimated_solar_thermal_project_cost_cents",
"value": 125000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal commercial projects can be site-specific and should require a quote before calculation."
},
{
"inputKey": "solar_thermal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote, thermal load study, or roof assessment is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"For a large commercial IKEA store, PV plus heat-pump water heating may be more typical than solar thermal.",
"Existing opportunity previews show no matched source-backed savings package, so estimates should remain suppressed unless a specific formula exists.",
"Do not force a positive grant estimate without eligible equipment and program rules."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Screen ground-source geothermal only as a speculative deep retrofit; do not treat as a likely near-term project because the site is an operating large-format retail store with major parking and construction disruption constraints.",
"inputFacts": [
{
"inputKey": "geothermal_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geotechnical, borefield, or hydronic distribution feasibility data is supplied."
},
{
"inputKey": "estimated_geothermal_borefield_capacity_tons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Borefield capacity cannot be derived from building area without load modeling and site constraints."
},
{
"inputKey": "estimated_geothermal_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ground-source retrofit costs are highly site-specific and should be suppressed until feasibility and quote data are available."
},
{
"inputKey": "parking_lot_disruption_acceptance",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A geothermal borefield may require substantial parking-lot disruption, which is a major operational decision for a destination retailer."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Technically possible but not a normal first-line grant project for this customer profile.",
"No positive grant estimate should be shown without a feasibility study, design capacity, and eligible cost.",
"Construction disruption and ownership/control constraints may make the project impractical."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Do not model an on-site biomass or biogas generation system as a likely project; food waste and restaurant organics may support waste diversion, but not a dedicated energy system at this retail site.",
"inputFacts": [
{
"inputKey": "onsite_biogas_feedstock_available_tons_per_year",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site has restaurant waste but no evidence of sufficient controlled feedstock for an on-site biogas energy system."
},
{
"inputKey": "biomass_system_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No realistic scope or quote is available."
},
{
"inputKey": "biomass_project_is_core_customer_priority",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A biomass or biogas energy system is not a typical capital project for a suburban retail furniture store."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force qualification based only on restaurant organics.",
"Biomass/biogas grants often require feedstock control, permitting, and energy offtake evidence.",
"This should usually be suppressed as unrealistic for the customer."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Treat CHP as a low-priority screening concept only; the site has thermal load from restaurant and water heating, but decarbonization and electrification goals make new fossil-fueled CHP unlikely.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No electric and thermal load profile has been provided to size CHP."
},
{
"inputKey": "chp_thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Restaurant loads alone do not establish sufficient year-round thermal load for CHP."
},
{
"inputKey": "estimated_chp_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A CHP estimate should require engineering study and interconnection review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"New fossil-fueled CHP may conflict with electrification-oriented grant programs.",
"Do not calculate without heat-recovery use, emissions compliance, and interconnection data.",
"Existing preview showed no matched source-backed savings package."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Consider thermal storage only if a future HVAC central plant or ice-storage-compatible cooling project is defined; current rooftop-unit configuration makes it speculative.",
"inputFacts": [
{
"inputKey": "thermal_storage_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not indicate chilled-water or ice-storage-compatible infrastructure."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity requires cooling load profile and system design."
},
{
"inputKey": "estimated_thermal_storage_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No defined thermal storage scope or quote exists."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A rooftop-unit retail building is not automatically a good fit for thermal storage.",
"Suppress estimates until a central plant or thermal-storage design exists."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Evaluate limited roof insulation and air-sealing improvements only during roof replacement or major tenant improvement work; do not assume a whole-building envelope retrofit.",
"inputFacts": [
{
"inputKey": "roof_area_sqft_considered",
"value": 300000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large single-story retail format could have substantial roof area, but actual footprint and roof condition are not supplied."
},
{
"inputKey": "insulation_project_trigger",
"value": "only_if_roof_replacement_or_major_renovation",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Insulation upgrades are most realistic when paired with roof work or major renovation."
},
{
"inputKey": "estimated_insulation_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No roof assembly, existing R-value, or construction scope is supplied."
},
{
"inputKey": "existing_roof_r_value_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing envelope performance is required for reliable calculation."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Envelope incentives should not be calculated without existing and proposed R-values.",
"A standalone insulation project may be operationally unlikely unless paired with roof replacement."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Evaluate a future solar-plus-storage microgrid for resilience and demand management, but treat it as a conceptual planning scope until PV, battery, controls, islanding, and interconnection details are defined.",
"inputFacts": [
{
"inputKey": "microgrid_includes_solar_pv",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A retail microgrid would commonly combine PV, battery storage, and controls."
},
{
"inputKey": "microgrid_pv_capacity_kw_dc",
"value": 1800,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 1.8 MWdc PV system is plausible for a large roof or parking-canopy concept but requires structural and shading review."
},
{
"inputKey": "microgrid_battery_capacity_kwh",
"value": 4000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Aligns with the battery storage planning scope."
},
{
"inputKey": "microgrid_islanding_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A project is not normally a microgrid without islanding or advanced controls, but actual resilience requirements are unknown."
},
{
"inputKey": "estimated_microgrid_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Microgrid costs require PV design, battery design, switchgear, protection, controls, and utility interconnection review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Some microgrid grants prioritize critical public facilities, disadvantaged communities, or public agencies; this private retail site should not be forced to qualify.",
"Suppress estimates until design and resilience purpose are defined.",
"Solar and storage tax-credit calculations may be more realistic than grant estimates."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Do not treat small wind as a realistic project for this urban/suburban retail location.",
"inputFacts": [
{
"inputKey": "small_wind_project_site_suitable",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An urban/suburban retail site with parking, building-height, zoning, noise, and turbulence constraints is unlikely to be suitable for small wind."
},
{
"inputKey": "small_wind_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No wind resource or zoning study exists."
},
{
"inputKey": "estimated_small_wind_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No realistic small-wind scope should be priced from the supplied profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress small-wind estimates unless the user provides a wind study, zoning clearance, and project quote.",
"Do not infer suitability from renewable-energy interest alone."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "Consider LEED Existing Buildings or similar certification only if IKEA is pursuing a corporate sustainability certification campaign; do not model it as an energy grant project.",
"inputFacts": [
{
"inputKey": "leed_certification_target",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No target rating system or certification level is supplied."
},
{
"inputKey": "leed_consulting_and_fees_cost_cents",
"value": 18000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large-building certification effort could plausibly require consulting, documentation, and registration/certification fees, but this should not drive grant eligibility without a program."
},
{
"inputKey": "leed_is_primary_retrofit_measure",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Certification is a recognition/compliance activity, not a direct equipment retrofit."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The supplied preview marks LEED certification savings as unsupported.",
"Do not calculate grant estimates unless a specific certification-support program is matched."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_eligible_school_bus_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The matched opportunity name is school-bus-site specific, while the customer is a private retail store."
},
{
"inputKey": "school_bus_fleet_served_by_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No school-bus fleet, school district, or school transportation partner is present in the supplied profile."
},
{
"inputKey": "school_bus_site_agency_partner",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Only a confirmed eligible partner could change this handling."
}
],
"reasoning": "Although the generic matcher found EV charging technology and California geography, a retail IKEA site should not be treated as eligible for a school-bus charging-site grant without an eligible school-bus operator or partnership."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "nevi_project_public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The EV scope assumes customer/public charging access, but final terms must match program rules."
},
{
"inputKey": "nevi_dcfc_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The planned scope includes four DC fast-charging ports."
},
{
"inputKey": "nevi_dcfc_power_kw_each",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The planned DCFC power is consistent with many highway/community fast-charging concepts, but exact solicitation requirements must be checked."
},
{
"inputKey": "nevi_corridor_or_community_site_requirement_met",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Corridor, community, spacing, disadvantaged-community, and site-specific eligibility facts are not present."
},
{
"inputKey": "nevi_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application status is provided in the test case."
},
{
"inputKey": "nevi_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring and lacks a quote."
}
],
"reasoning": "This may be relevant for a public DC fast-charging hub at a retail destination, but the estimate should be suppressed or kept provisional until site eligibility, cost share, application status, and project scope are confirmed."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "community_charging_project_publicly_accessible",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A customer-facing retail charging hub is plausible."
},
{
"inputKey": "community_charging_level2_ports",
"value": 20,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The synthetic project scope includes twenty Level 2 ports."
},
{
"inputKey": "community_charging_dcfc_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The synthetic project scope includes four DC fast-charging ports."
},
{
"inputKey": "community_charging_priority_population_served",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Priority-population eligibility or scoring cannot be inferred from the supplied ZIP-level facts."
},
{
"inputKey": "community_charging_site_host_commitment_executed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No signed site-host agreement or application package is supplied."
},
{
"inputKey": "community_charging_total_project_cost_cents",
"value": 185000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the synthetic EV charging project cost for preliminary grant testing only."
}
],
"reasoning": "A community charging solicitation could be relevant to a large retail destination, but project scoring and eligibility depend on public access, site eligibility, priority-community data, and a complete application. Calculate only if formula rules are ready and required facts are confirmed; otherwise suppress or mark needs scope."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "landlord_or_owner_authorization_document",
"reason": "needs user decision"
},
{
"inputKey": "burbank_water_and_power_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "burbank_water_and_power_service_upgrade_quote",
"reason": "quote not available"
},
{
"inputKey": "ev_charging_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "ev_charging_final_site_plan",
"reason": "needs user decision"
},
{
"inputKey": "nevi_or_cec_application_confirmation_number",
"reason": "application not submitted"
},
{
"inputKey": "priority_population_or_disadvantaged_community_verification",
"reason": "source requires agency approval"
},
{
"inputKey": "hvac_equipment_schedule_existing",
"reason": "needs user decision"
},
{
"inputKey": "hvac_equipment_submittals_proposed",
"reason": "quote not available"
},
{
"inputKey": "heat_pump_hvac_electrical_capacity_study",
"reason": "quote not available"
},
{
"inputKey": "lighting_fixture_audit",
"reason": "needs user decision"
},
{
"inputKey": "battery_storage_interconnection_study",
"reason": "source requires agency approval"
},
{
"inputKey": "battery_storage_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "solar_pv_structural_roof_assessment",
"reason": "quote not available"
},
{
"inputKey": "geothermal_borefield_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_feedstock_supply_agreement",
"reason": "unrealistic for this customer"
},
{
"inputKey": "school_bus_operator_partnership_agreement",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The customer is a private commercial retail business, not a school, public agency, nonprofit, tribal entity, agricultural producer, or small-business-only applicant.",
"The school-bus EV charging opportunity should be treated as likely ineligible unless an eligible school-bus fleet partner is explicitly added.",
"Ownership and site-control status are unknown, so rooftop, parking-lot, electrical-service, HVAC, and microgrid projects may require landlord or owner authorization.",
"The project is at an exploring stage with no binding vendor quotes, utility service studies, interconnection approvals, or submitted grant applications.",
"Large-format retail energy projects are plausible, but many incentives should require equipment schedules, baseline data, proposed specifications, and eligible-cost breakdowns before calculation.",
"Do not infer disadvantaged-community, priority-population, corridor, or community-charging eligibility from the supplied address alone.",
"Small wind, biomass/biogas, geothermal, CHP, and thermal energy storage should generally be suppressed or treated as speculative unless the user supplies project-specific feasibility evidence.",
"For solar, battery, HVAC, lighting, and water-heating measures, tax credits, utility rebates, or performance incentives may be more realistic than competitive grants for this customer."
]
}

