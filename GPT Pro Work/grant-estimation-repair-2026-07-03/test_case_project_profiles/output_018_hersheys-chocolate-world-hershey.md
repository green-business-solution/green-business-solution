{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "hersheys-chocolate-world-hershey",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for a commercial visitor-attraction, retail, food-service, events, and refrigeration-load site at 101 Chocolate World Way in Hershey, PA. The profile intentionally treats the site as a non-manufacturing commercial attraction rather than an industrial chocolate manufacturing facility. Based on the uploaded test-case prompt .",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type_normalized",
"value": "for_profit_commercial_business",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The provided source form lists the organization type as Commercial Business and describes a retail, food-service, and visitor-attraction site."
},
{
"inputKey": "site_use_classification",
"value": [
"visitor_attraction",
"retail",
"food_service",
"events",
"commercial_refrigeration"
],
"valueType": "array",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly describes the site as a visitor attraction with retail, food service, events, and refrigeration loads."
},
{
"inputKey": "manufacturing_activity_at_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case notes that the visitor attraction is distinct from manufacturing; this should prevent industrial-manufacturing program assumptions."
},
{
"inputKey": "building_square_footage",
"value": 100000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The normalized profile has parsed 100,000 square feet, but the source notes indicate the floor area is estimated for matching tests."
},
{
"inputKey": "electric_utility_provider",
"value": "PPL Electric Utilities",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The utility is self-reported and mapped to UTIL_PPL, but verification remains self-reported and unverified."
},
{
"inputKey": "gas_utility_provider",
"value": "UGI Utilities",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form lists UGI Utilities as the gas provider."
},
{
"inputKey": "electric_customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 100,000-square-foot visitor attraction with nearly 3 million annual kWh would normally be served on a commercial electric tariff rather than residential or industrial manufacturing service."
},
{
"inputKey": "annual_kwh",
"value": 2965000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides 2,965,000 annual kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 41545000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual electric cost of $415,450."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 10189000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual gas cost of $101,890."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 5920000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual water and sewer cost of $59,200."
},
{
"inputKey": "annual_waste_cost_cents",
"value": 12470000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual waste cost of $124,700 and indicates a private commercial waste hauler."
},
{
"inputKey": "ownership_status",
"value": "unknown",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists ownership status as Not sure, and the normalized profile records ownershipRelationship as unknown."
},
{
"inputKey": "tenant_landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Because ownership/control is unknown, building-shell, HVAC, geothermal, solar, battery, EV make-ready, and exterior lighting projects should require confirmation of owner authorization before relying on grant estimates."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is represented as a commercial business rather than a nonprofit."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is a private commercial visitor attraction, not a municipal, state, or other public entity."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building is described as a visitor attraction, retail, food-service, and events site, not a school."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The visitor attraction is not an agricultural production facility."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No facts indicate tribal ownership or operation."
},
{
"inputKey": "is_low_income_residential_property",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a nonresidential commercial visitor attraction."
},
{
"inputKey": "fleet_owner",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large visitor attraction plausibly operates maintenance, security, catering, or guest-service vehicles, but this is not confirmed and should not drive grant estimates without user confirmation."
},
{
"inputKey": "public_ev_charging_intent",
"value": "visitor_and_employee_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a large destination attraction, a modest EV charging project would likely support visitors and employees rather than industrial fleet charging."
},
{
"inputKey": "grant_application_stage",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring, so grant applications should not be assumed submitted or approved."
},
{
"inputKey": "procurement_stage",
"value": "budgetary_planning",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source project stage is exploring, so synthetic inputs should represent planning-level scopes rather than bid-ready construction."
},
{
"inputKey": "has_vendor_quotes",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote data was provided; grant formulas requiring actual eligible cost should be suppressed or treated as preliminary."
},
{
"inputKey": "has_engineering_study",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit, retro-commissioning, CHP, battery, geothermal, or microgrid engineering study is provided."
},
{
"inputKey": "project_start_date",
"value": null,
"valueType": "date",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case does not provide a construction or procurement start date; this should remain unknown because many incentives depend on timing."
},
{
"inputKey": "project_has_started",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring, so work should be treated as not yet started for application-timing checks unless the user says otherwise."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging rooftop units and split systems serving retail, food-service, queueing, and event areas with high-efficiency packaged equipment and upgraded controls. Budget is synthetic and excludes major roof structural work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary gives an admin-modeled preview cost of $7,980; this appears low for five commercial HVAC opportunities at a 100,000-square-foot attraction, so it should not be treated as a vendor quote."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 42500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A realistic partial HVAC replacement scope for a large commercial attraction could be roughly $425,000 before firm quotes, especially if limited to selected rooftop units and controls rather than a whole-building plant replacement."
},
{
"inputKey": "hvac_units_replaced",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight commercial packaged units is a plausible planning quantity for partial replacement in a 100,000-square-foot retail and event facility."
},
{
"inputKey": "estimated_total_cooling_capacity_tons",
"value": 160,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 160-ton planning assumption is plausible for a partial scope but requires equipment schedules or a mechanical survey."
},
{
"inputKey": "measure_type",
"value": [
"high_efficiency_packaged_rooftop_units",
"demand_control_ventilation",
"economizer_repair_or_replacement",
"building_automation_controls_integration"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic HVAC efficiency measures for a large commercial visitor attraction with variable occupancy."
},
{
"inputKey": "requires_customer_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "HVAC grant estimates should depend on actual equipment scope, eligible costs, and efficiency ratings."
},
{
"inputKey": "owner_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership is unknown and HVAC equipment replacement affects building systems."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely eligible only for broad commercial energy-efficiency or high-performance-building programs, not industrial/manufacturing programs.",
"Final eligibility should depend on equipment efficiency ratings, eligible costs, building ownership/control, and whether application approval is required before construction."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Interior LED lighting replacement for retail, back-of-house, queue, event, and food-service support spaces, focused on fixtures not already converted.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The existing preview assumes 12 fixture replacements at $1,604.25 total, which is useful as an admin fixture but too small for the likely building-scale opportunity."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 18500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A realistic partial interior lighting retrofit in a 100,000-square-foot attraction could cost around $185,000 depending on fixture counts, controls, lifts, and off-hour work."
},
{
"inputKey": "interior_fixtures_replaced",
"value": 950,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "About 950 fixtures is a plausible synthetic count for retail, food service, event, and back-of-house areas in a large attraction."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy sensors, scheduling, and daylight controls are realistic add-ons for a commercial LED project and may affect incentive eligibility."
},
{
"inputKey": "estimated_lighting_kw_reduction",
"value": 85,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A planning-level 85 kW reduction is plausible but should be replaced by fixture schedule and wattage data."
},
{
"inputKey": "requires_customer_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Fixture type, wattage, labor, controls, and eligible measure costs require quote detail for incentive calculation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely eligible for some commercial efficiency programs if existing fixtures and replacement wattages are documented.",
"The existing 12-fixture preview should not be used as the full project cost for grant estimation."
]
},
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"projectScopeSummary": "Replace parking-lot, pedestrian-way, façade, and service-area lighting with LED fixtures and networked schedules while preserving visitor-safety illumination levels.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 201200,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $2,012 is an admin fixture and is not a realistic exterior site-lighting project quote."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 6200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $62,000 budget is plausible for a moderate exterior fixture and controls refresh at a destination retail site."
},
{
"inputKey": "exterior_fixtures_replaced",
"value": 85,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eighty-five fixtures is a plausible synthetic quantity for parking, walkway, service, and façade lighting, but site plans should confirm it."
},
{
"inputKey": "dark_sky_or_glare_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Visitor-oriented exterior lighting projects often include shielding and controls, but no actual lighting design was provided."
},
{
"inputKey": "requires_customer_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Exterior lighting cost and eligible scope depend on fixtures, poles, lifts, wiring, controls, and safety requirements."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility is plausible for commercial lighting incentives but should require fixture schedules and proof that the site controls the exterior lighting assets."
]
},
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "ASHRAE-style retro-commissioning study focused on HVAC scheduling, ventilation controls, economizers, refrigeration coordination, kitchen exhaust, event occupancy schedules, and implementation of low-cost operational measures.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 91800,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary provides an admin-modeled preview cost of $918, which is not realistic for a 100,000-square-foot RCx study."
},
{
"inputKey": "budgetary_study_cost_cents",
"value": 4200000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $42,000 RCx study and initial implementation budget is realistic for a complex 100,000-square-foot visitor attraction with food-service and refrigeration loads."
},
{
"inputKey": "implementation_allowance_cents",
"value": 8500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An $85,000 allowance for controls fixes, economizer repair, balancing, and sensor replacement is plausible but should be replaced by study findings."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 225000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Roughly 7.6% of provided annual kWh is a plausible RCx planning estimate for a complex commercial site, but actual savings require trend data and a study."
},
{
"inputKey": "requires_engineering_study",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The scope itself is a study and any grant calculation should distinguish study cost from post-study implementation cost."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely a good fit for planning, audit, or retro-commissioning support where commercial customers are eligible.",
"Implementation incentives should remain uncertain until the study identifies measures."
]
},
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "Investment-grade energy audit covering electric, gas, water, refrigeration, kitchen, HVAC, lighting, controls, and waste-cost reduction opportunities.",
"inputFacts": [
{
"inputKey": "audit_level",
"value": "ashrae_level_2_with_targeted_refrigeration_review",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A Level 2 audit plus targeted refrigeration review is realistic for a large commercial visitor attraction."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 3500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $35,000 audit budget is plausible for a 100,000-square-foot complex commercial facility."
},
{
"inputKey": "requires_utility_bills",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Monthly bills, interval data, and equipment inventories are normally needed for an audit or study incentive."
},
{
"inputKey": "requires_vendor_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Audit incentives typically depend on the audit proposal, qualified provider, and final scope."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Useful for discovery and documentation, but many grant programs do not fund stand-alone audits unless paired with eligible implementation."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "Add or upgrade networked thermostats, occupancy scheduling, and zone-level controls for retail, event, office, and back-of-house spaces.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 100600,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $1,006 is an admin-modeled fixture and likely understates a commercial controls project."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 6800000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $68,000 planning budget is plausible for commercial zoning controls, gateways, sensors, integration, and commissioning."
},
{
"inputKey": "control_zones_upgraded",
"value": 45,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Forty-five zones is plausible for a large visitor attraction with varied schedules and occupancies."
},
{
"inputKey": "building_automation_system_integration_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A facility of this size likely has multiple control systems and would need integration or at least schedule coordination."
},
{
"inputKey": "requires_customer_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Eligibility and savings depend on controls scope, existing BAS condition, and vendor proposal."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely qualifies only where controls are an eligible commercial efficiency measure and savings can be documented."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install a small public-facing and employee Level 2 charging bank near visitor or employee parking with networking and access controls.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $8,480 is an admin-modeled value and is low for a multi-port commercial EV charging installation."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 11500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $115,000 planning budget is plausible for eight networked Level 2 ports, trenching, panel work, signage, commissioning, and payment/access setup."
},
{
"inputKey": "charger_type",
"value": "networked_level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 chargers are a realistic choice for visitor dwell times at an attraction and for employee parking."
},
{
"inputKey": "charging_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight ports is a plausible first-phase deployment for a major visitor attraction without over-sizing into a large charging hub."
},
{
"inputKey": "public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Visitor charging would generally be publicly accessible during operating hours, but the access model should be confirmed."
},
{
"inputKey": "fleet_only",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The most realistic initial use is visitor and employee charging rather than dedicated fleet-only charging."
},
{
"inputKey": "utility_make_ready_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Even a Level 2 installation may require service capacity, panel, conduit, or transformer review."
},
{
"inputKey": "requires_site_plan",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "EV incentive eligibility and cost require parking location, ADA access, electric room distance, trenching, and ownership/control details."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for EV charging incentives if public-access, networking, make-ready, and site-control requirements are met.",
"Should not assume fleet-only or disadvantaged-community scoring without evidence."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Same planning scope as EV charger installation: eight networked Level 2 charging ports for visitors and employees.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing preview cost is retained for regression but should not be treated as a real project quote."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 11500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The same realistic budget is used as the broader EV charger installation record to avoid duplicate inconsistent assumptions."
},
{
"inputKey": "level_2_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight Level 2 ports is a reasonable initial deployment."
},
{
"inputKey": "charger_connector_standard",
"value": "J1772_or_NACS_capable_networked_units",
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Connector strategy should remain flexible until the customer selects equipment."
},
{
"inputKey": "requires_customer_quote",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Port count, networking, installation distance, utility work, and eligible costs require a quote."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Treat as duplicate or child scope of ev_charger_installation to avoid double-counting."
]
},
{
"retrofitTypeId": "ev_make_ready_electrical_upgrade",
"projectScopeSummary": "Panel, conduit, trenching, switchgear, and utility coordination required to support the first phase of Level 2 visitor and employee charging.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 732000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $7,320 is an admin-modeled value and likely understates make-ready work for eight commercial Level 2 ports."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 7600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $76,000 make-ready budget is plausible for a first-phase charging project with trenching, panel work, and utility coordination."
},
{
"inputKey": "supports_ev_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The make-ready scope supports the planned eight Level 2 ports."
},
{
"inputKey": "new_service_or_transformer_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No load study or utility service review is provided, so transformer or service upgrade requirements should remain unknown."
},
{
"inputKey": "requires_utility_preapproval",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Make-ready incentives and interconnection typically require utility review before construction."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Should be calculated with the EV charging project and not double-counted as a separate grant project unless the program distinguishes charger and make-ready costs."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery for demand management and ride-through support for point-of-sale, refrigeration, and selected event loads; no solar pairing assumed at this stage.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $72,800 is an admin-modeled value and far below typical commercial battery project cost."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 58500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 500 kW / 1,000 kWh commercial battery could plausibly be a $585,000 planning-level project, but actual sizing depends on interval load, demand charges, resilience needs, and interconnection."
},
{
"inputKey": "battery_power_kw",
"value": 500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 500 kW battery is plausible for a site with nearly 3 million annual kWh, but peak kW was not provided."
},
{
"inputKey": "battery_capacity_kwh",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A two-hour battery is a conservative planning size for demand management and short-duration resilience."
},
{
"inputKey": "paired_with_onsite_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No solar PV project is listed in the retrofit summaries, so the battery should not be assumed solar-paired."
},
{
"inputKey": "resilience_critical_loads_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical loads such as refrigeration, POS, safety lighting, and IT are plausible but not mapped."
},
{
"inputKey": "requires_interconnection_study",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Battery systems require electrical design and utility interconnection review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Without solar pairing, resilience designation, critical-load documentation, or a storage-specific program match, typical grant estimates should remain suppressed.",
"The project is plausible technically but not a normal first-priority grant pursuit for this retail attraction without a resilience driver."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Conceptual microgrid for selected critical loads, potentially including battery, controls, and backup integration, but no defined generation source or critical-load study is available.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $109,200 is an admin-modeled value and is not realistic for a commercial microgrid."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 175000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small commercial microgrid could easily exceed $1.75 million, but this is only a placeholder because no design basis exists."
},
{
"inputKey": "critical_load_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No critical-load list or one-line diagram is provided."
},
{
"inputKey": "onsite_generation_source",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A microgrid cannot be evaluated without knowing whether it uses solar, storage, CHP, standby generation, or another source."
},
{
"inputKey": "resilience_or_emergency_service_need_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No emergency-service, shelter, public-safety, or critical infrastructure role is documented."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not a normal grant project for this customer without a defined resilience use case, design, and eligible program.",
"Should remain suppressed until scope, generation source, critical loads, and interconnection facts are known."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Conceptual natural-gas CHP for electric load support and heat recovery to domestic hot water or food-service loads; not assumed selected because runtime and thermal-load data are missing.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $120,000 is an admin-modeled value and is low for a commercial CHP project."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 95000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 350 kW CHP project could be near $950,000 depending on heat recovery, switchgear, emissions controls, and interconnection."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 350,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 350 kW unit is plausible relative to annual electric use, but peak and interval load are missing."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Food-service and domestic hot water loads may exist, but no monthly therms, hourly thermal profile, or water-heating system data are supplied."
},
{
"inputKey": "annual_runtime_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Runtime is required to evaluate economics and grant eligibility but cannot be inferred from annual kWh alone."
},
{
"inputKey": "emissions_permit_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A natural-gas CHP installation normally triggers air-permitting and local code review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Technically possible but should not be forced into a positive grant estimate without thermal-load confirmation, runtime, emissions review, interconnection, and actual quote data.",
"May be a poor fit for a visitor attraction if thermal demand is intermittent."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Conceptual ground-source heat-pump conversion for selected zones or future renovation areas; no borefield design, site-control confirmation, or phased construction plan is available.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $15,760 is an admin-modeled value and is not realistic for geothermal at this scale."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 185000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial commercial geothermal project could be in the multimillion-dollar range, but this placeholder should not be used without engineering design."
},
{
"inputKey": "geothermal_capacity_tons",
"value": 220,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 220-ton conceptual system is plausible for a partial or phased large commercial facility but requires load calculations."
},
{
"inputKey": "borefield_or_land_area_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No site plan, borefield area, drilling feasibility, or land-control fact is provided."
},
{
"inputKey": "phased_renovation_context",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Geothermal would normally be considered during major HVAC renewal or expansion, but no renovation project is described."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could qualify under broad renewable or high-performance-building programs only if part of a major renovation with engineered cost and performance data.",
"Should remain suppressed because site control, drilling feasibility, and load design are unknown."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar-thermal preheat system for food-service and handwashing domestic hot water, subject to roof space, structural review, and actual hot-water load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $6,800 is an admin-modeled value and likely understates a commercial solar-water-heating system."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 8500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An $85,000 commercial solar hot-water project is plausible if food-service loads are meaningful, but actual gas and hot-water data are missing."
},
{
"inputKey": "collector_area_sqft",
"value": 600,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Six hundred square feet of collectors is a conservative conceptual size for a partial commercial domestic-hot-water preheat project."
},
{
"inputKey": "storage_tank_gallons",
"value": 800,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Storage must be matched to actual hot-water load; this is a planning placeholder."
},
{
"inputKey": "domestic_hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Food service suggests hot-water use, but no domestic-hot-water metering or equipment inventory is included."
},
{
"inputKey": "roof_structural_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Roof-mounted solar-thermal equipment requires structural and roof-condition review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Plausible but uncertain; should not calculate a grant without hot-water load, roof approval, and vendor quote.",
"May be less attractive than controls or HVAC measures for this customer."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Conceptual chilled-water or ice thermal storage for shifting cooling load away from peak periods; no central chilled-water plant or peak-demand profile is confirmed.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $55,100 is an admin-modeled value and not sufficient for a commercial thermal storage project."
},
{
"inputKey": "budgetary_project_cost_cents",
"value": 92500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A roughly $925,000 planning budget is plausible for a meaningful thermal storage project, but only if the facility has compatible cooling infrastructure."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 1200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 1,200 ton-hour concept is plausible for partial peak shifting but cannot be validated without cooling load and plant data."
},
{
"inputKey": "central_chilled_water_system_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building may rely on packaged rooftop equipment rather than a central plant; no chilled-water system is provided."
},
{
"inputKey": "peak_demand_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual kWh is provided, but monthly or interval peak demand data are not provided in the current facts."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should remain suppressed unless peak demand, cooling plant type, and project design are confirmed.",
"Not a normal first-pass grant project for a retail attraction without clear demand-charge or resilience economics."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas system is not realistic for the visitor-attraction site as described; the customer is not an agricultural producer, wastewater plant, landfill, or manufacturing facility with suitable organic-process waste.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $90,000 is retained as an admin-modeled test value but should not be used to imply a real biomass or biogas project."
},
{
"inputKey": "biogenic_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The visitor attraction has food-service waste but not the controlled, high-volume feedstock normally needed for an onsite biomass or anaerobic digestion energy system."
},
{
"inputKey": "agricultural_or_wastewater_host",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is not an agricultural, wastewater, landfill, or industrial process host."
},
{
"inputKey": "project_intent",
"value": "not_pursuing",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A biomass or biogas energy system would be atypical and operationally complex for this customer profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force qualification merely because the broad state program includes biomass or renewable-energy technologies.",
"Food-service waste at a visitor attraction is not enough to assume an onsite biogas energy project."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine is not a realistic project for this visitor attraction due to siting, visual, safety, zoning, and likely poor economics in a built visitor-campus environment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $80,000 is retained as an admin fixture but should not imply a real project."
},
{
"inputKey": "wind_resource_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind study or tower siting analysis is provided."
},
{
"inputKey": "siting_constraints_likely",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public visitor site likely has practical constraints around setbacks, aesthetics, safety, and guest experience."
},
{
"inputKey": "project_intent",
"value": "not_pursuing",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Small wind is not a normal retrofit choice for a retail attraction with no wind-resource evidence."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress estimates unless the user supplies a wind study, site-control details, zoning clearance, and a real quote."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not assumed for the existing attraction absent a major renovation, certification target, design team, or owner decision.",
"inputFacts": [
{
"inputKey": "certification_target",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No LEED rating system, certification level, or project boundary is provided."
},
{
"inputKey": "major_renovation_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The current facts describe exploring retrofits, not a major renovation or new construction project."
},
{
"inputKey": "soft_cost_budget_cents",
"value": 14500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A $145,000 placeholder for commissioning, modeling, consulting, and certification work is plausible for a major certification effort but should not be used without an owner decision."
},
{
"inputKey": "owner_has_selected_certification",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No evidence indicates the customer is pursuing LEED certification."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate LEED-related grants without a selected certification path, project boundary, major renovation context, and application status.",
"For this profile, operational efficiency work is more realistic than certification-only work."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "program_project_category",
"value": "commercial_high_performance_building_or_energy_efficiency",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The matched opportunity is broad and appears compatible with commercial building energy-efficiency measures, but the customer has no defined application package."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring, and no application facts are provided."
},
{
"inputKey": "agency_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval or award facts are present; estimates should not assume approval."
},
{
"inputKey": "eligible_cost_documented_by_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The current project costs are preview or synthetic values, not contractor bids."
},
{
"inputKey": "ownership_or_site_control_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership status is unknown, so site-control documentation should be requested."
},
{
"inputKey": "commercial_applicant",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the applicant as a commercial business."
},
{
"inputKey": "manufacturing_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is explicitly distinct from manufacturing and should not be routed to manufacturing-specific grant assumptions."
}
],
"reasoning": "Use this opportunity for realistic commercial efficiency measures such as HVAC, LED lighting, exterior lighting, controls, energy audit, and retro-commissioning only when the grant formula can accept budgetary values or once quotes are provided. Suppress or mark low confidence for biomass, wind, geothermal, battery, microgrid, solar-water-heating, and LEED unless additional project scope and application evidence are supplied."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3602",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring and no grant application has been provided."
},
{
"inputKey": "certification_or_high_performance_path_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The matched program appears related to high-performance buildings, but no LEED, high-performance pathway, or major renovation target is selected."
},
{
"inputKey": "audit_or_rcx_scope_defined",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A realistic RCx and energy-audit scope can be defined for this building, but it remains planning-level."
},
{
"inputKey": "eligible_cost_documented_by_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No audit, commissioning, design, or construction quote is available."
}
],
"reasoning": "For retro-commissioning and energy audit work, this should be handled as needs application status and quote data. For LEED certification, suppress until the user confirms a certification pathway and major renovation or eligible building project."
},
{
"opportunityId": "UNMATCHED_TYPICAL_EV_CHARGING_PROGRAM",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A first-phase eight-port Level 2 deployment is realistic for visitor and employee parking."
},
{
"inputKey": "public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public visitor access is plausible but should be confirmed for any EV charging incentive."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked charging is a realistic commercial requirement and often required for incentives."
},
{
"inputKey": "equipment_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No EVSE or installation quote is included."
}
],
"reasoning": "The current matched grant list does not show a specific EV opportunity, but if an EV charging program is added later, calculations should require port count, public access, networking, make-ready scope, site control, and quote data."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3354_FOR_BIOMASS_OR_BIOGAS",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "onsite_feedstock_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The attraction has food service but no suitable controlled feedstock stream for onsite biomass or biogas energy generation."
},
{
"inputKey": "industrial_or_agricultural_host",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile should remain a visitor attraction and retail/food-service facility, not industrial or agricultural."
}
],
"reasoning": "Even if the broad program technology list includes biomass or biogas, this specific customer profile should not be given a positive estimate for that retrofit without a real feedstock and project sponsor."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3354_FOR_LEED_CERTIFICATION",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "leed_path_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No certification path, project boundary, or design team is provided."
},
{
"inputKey": "major_renovation_or_new_construction",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is in exploring mode for retrofits, not a defined major renovation."
}
],
"reasoning": "Do not estimate LEED-related grant value from the generic building profile alone. Require a certification target, application status, project cost, and owner decision."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3354_FOR_GEOTHERMAL_STORAGE_MICROGRID_OR_CHP",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "engineering_feasibility_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study is provided for geothermal, battery storage, microgrid, thermal storage, or CHP."
},
{
"inputKey": "interval_load_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual kWh is provided but interval load and peak demand data are missing."
},
{
"inputKey": "critical_load_or_thermal_load_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No critical-load schedule, thermal host load, or chilled-water plant data is provided."
}
],
"reasoning": "These complex energy-system measures should not receive calculated grant estimates for this site without strong project-specific evidence, even if the opportunity match is broad."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quote_or_bid",
"reason": "quote not available"
},
{
"inputKey": "equipment_make_model_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "grant_application_submission_date",
"reason": "application not submitted"
},
{
"inputKey": "grant_preapproval_or_award_status",
"reason": "source requires agency approval"
},
{
"inputKey": "construction_start_date",
"reason": "needs user decision"
},
{
"inputKey": "site_owner_authorization",
"reason": "needs user decision"
},
{
"inputKey": "lease_or_property_control_documentation",
"reason": "needs user decision"
},
{
"inputKey": "monthly_peak_kw_or_interval_data",
"reason": "needs user decision"
},
{
"inputKey": "monthly_gas_therms",
"reason": "needs user decision"
},
{
"inputKey": "refrigeration_equipment_inventory",
"reason": "needs user decision"
},
{
"inputKey": "lighting_fixture_schedule",
"reason": "quote not available"
},
{
"inputKey": "hvac_equipment_schedule",
"reason": "quote not available"
},
{
"inputKey": "ev_charging_site_plan",
"reason": "needs user decision"
},
{
"inputKey": "utility_ev_make_ready_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "battery_interconnection_application",
"reason": "application not submitted"
},
{
"inputKey": "microgrid_critical_load_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "geothermal_borefield_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_or_biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "leed_certification_registration",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The site should be treated as a commercial visitor attraction with retail, food-service, event, and refrigeration loads, not as an industrial manufacturing facility.",
"The organization is not a nonprofit, public entity, school, tribal entity, agricultural producer, residential property, wastewater facility, landfill, or utility-owned site based on the supplied facts.",
"The project stage is exploring; do not assume grant applications have been submitted, preapproved, or awarded.",
"Ownership and site-control facts are unknown, so building-shell, HVAC, electrical, geothermal, battery, microgrid, and exterior/site work should require owner authorization before confident estimates.",
"Preview costs in the existing retrofit summaries are admin-modeled test values and should not be treated as contractor quotes.",
"Biomass, biogas, small wind, geothermal, microgrid, thermal storage, solar water heating, battery storage, CHP, and LEED certification should not be forced into positive estimates without project-specific feasibility evidence.",
"The presence of food-service waste should not be interpreted as adequate biomass or biogas feedstock.",
"Annual kWh alone is insufficient to size or justify CHP, batteries, thermal storage, microgrids, or demand-management grants.",
"EV charging is plausible, but incentives should require port count, networking, site plan, public-access rules, make-ready details, and utility or agency preapproval where applicable.",
"Broad state high-performance-building matches should be narrowed to realistic commercial energy-efficiency scopes such as HVAC, lighting, controls, audit, and retro-commissioning unless the user supplies a major renovation or certification project."
]
}

