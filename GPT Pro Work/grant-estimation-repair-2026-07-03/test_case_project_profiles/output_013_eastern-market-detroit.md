{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "eastern-market-detroit",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the provided Eastern Market Detroit test-case fixture. Site is modeled as a Michigan nonprofit public market district with common-area and vendor-facing loads, DTE service, unclear ownership/control, and no assumed grant award or preapproval. Source fixture cited here: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type",
"value": "nonprofit_organization",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied test case identifies Eastern Market Partnership as a nonprofit organization."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is modeled as a nonprofit district operator rather than a city, county, state agency, or school district."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Primary activities are public market operations, vendor leasing, food business support, events, and district management."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Although food vendors and farmers may use the market, the applicant is modeled as a nonprofit market operator, not a farming operation."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal government role is indicated in the test case."
},
{
"inputKey": "utility_customer_of_record_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes district-level electric usage and cost, so the nonprofit is modeled as having access to at least one common-area DTE Electric account."
},
{
"inputKey": "electric_customer_class",
"value": "commercial_nonresidential",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A mixed-use public market with vendor, event, and common-area loads would normally be served under a nonresidential commercial account class."
},
{
"inputKey": "gas_customer_class",
"value": "commercial_nonresidential",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "District-scale public market gas loads are modeled as commercial/nonresidential."
},
{
"inputKey": "controls_common_area_equipment",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The operator is modeled as controlling common infrastructure such as market hall lighting, shared HVAC, site lighting, waste areas, and some event infrastructure."
},
{
"inputKey": "controls_vendor_owned_equipment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture notes that vendors may own equipment, so tenant/vendor equipment should not be assumed eligible without lease or ownership confirmation."
},
{
"inputKey": "ownership_relationship",
"value": "unknown_landlord_or_public_asset_control_needs_confirmation",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership status is explicitly unknown in the normalized profile, which should suppress incentives requiring owner authorization until documented."
},
{
"inputKey": "landlord_owner_authorization_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No signed owner authorization, board authorization, or lease-control document is present in the fixture."
},
{
"inputKey": "procurement_stage",
"value": "early_scoping_no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring, so no contractor or final design is assumed."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or preapproval record is included in the test case."
},
{
"inputKey": "grant_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant reservation, award letter, utility preapproval, or program approval is included."
},
{
"inputKey": "annual_kwh",
"value": 1050000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 15750000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual electric cost of $157,500."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 5225000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The utility summaries provide annual gas cost of $52,250."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 2450000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The utility summaries provide annual water and sewer cost of $24,500."
},
{
"inputKey": "annual_waste_cost_cents",
"value": 9790000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The utility summaries provide annual waste cost of $97,900."
},
{
"inputKey": "building_square_footage",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture states square footage is unknown, so whole-building formulas requiring floor area should remain suppressed."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "ASHRAE Level II-style audit across common-area market buildings, event spaces, site lighting, shared refrigeration interfaces, HVAC, controls, and waste/water operational opportunities.",
"inputFacts": [
{
"inputKey": "audit_scope",
"value": "multi_building_nonresidential_level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A district-scale nonprofit with mixed loads would reasonably begin with an energy audit before capital procurement."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 4500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $45,000 audit budget is realistic for a multi-building public market district with complex loads."
},
{
"inputKey": "investment_grade_audit_required",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is still exploring and does not yet need investment-grade design for all measures."
},
{
"inputKey": "audit_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No audit quote is included in the fixture."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Often requires preapproval before audit work starts.",
"May require utility account verification and a defined scope of facilities.",
"Cost share should remain estimate-only until a quote is provided."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Feasibility study for rooftop/community-serving solar, battery resilience for critical vendor/event operations, and limited microgrid controls for shared market infrastructure.",
"inputFacts": [
{
"inputKey": "study_type",
"value": "solar_storage_resilience_feasibility",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large annual electric use and nonprofit community-serving operations make a solar-storage feasibility study plausible."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 6500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $65,000 feasibility budget is realistic for structural, interconnection, resilience, and conceptual design work across multiple buildings."
},
{
"inputKey": "final_engineering_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project is in exploring stage."
},
{
"inputKey": "study_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No feasibility-study quote is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May require documented public benefit or resilience role.",
"May require owner authorization and facility-control documentation.",
"No award should be assumed without application status."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace common-area market hall, shed, parking, loading, and event lighting with LED fixtures where Eastern Market controls the equipment.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 420,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "District-scale public market operations with over 1,000,000 annual kWh support a larger lighting scope than the small preview fixture count."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18900000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $450 per fixture installed, including lift work, exterior-rated fixtures, wiring allowances, and controls integration for common areas."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 185000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial common-area LED conversion could plausibly save about 18% of annual electric use if existing lighting is older and long-hour."
},
{
"inputKey": "material_and_labor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No contractor quote is present."
},
{
"inputKey": "preexisting_equipment_operational",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Retrofit incentives normally require replacing functioning baseline equipment; this is assumed for common-area lighting."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Vendor-owned fixtures should be excluded unless Eastern Market has written control or reimbursement authority.",
"Utility incentives may require preapproval before purchase or installation.",
"Existing wattage and operating hours should be validated."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Add occupancy, daylighting, scheduling, photocell, and event-mode controls for market hall, shed, corridor, loading, and exterior fixtures.",
"inputFacts": [
{
"inputKey": "controlled_fixture_count",
"value": 300,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controls are modeled for a subset of common-area fixtures where scheduling and occupancy vary by market and event use."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes an average installed control cost of about $320 per controlled fixture or zone point."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 62000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controls savings are modeled as incremental to an LED retrofit for irregular market and event occupancy."
},
{
"inputKey": "networked_lighting_controls",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A district operator would plausibly value scheduled and event-mode lighting controls."
},
{
"inputKey": "controls_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Controls incentives often require eligible fixture types and inspection.",
"Savings should not be double-counted against LED-only savings.",
"May require program preapproval."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop units and air-handling equipment serving common areas, offices, event spaces, and select shared market areas.",
"inputFacts": [
{
"inputKey": "hvac_unit_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A multi-building public market district plausibly has several packaged units rather than a single small HVAC system."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity is a planning placeholder because square footage and equipment schedules are unknown."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 41000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes a moderate packaged-unit replacement scope including equipment, curb adapters, controls, cranes, and commissioning."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 82000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are plausible but uncertain because existing HVAC efficiency and hours are not known."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 4500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are modeled only for high-efficiency gas heat or heat-recovery improvements and need equipment confirmation."
},
{
"inputKey": "equipment_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No HVAC equipment schedule is provided."
},
{
"inputKey": "hvac_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No contractor quote is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on equipment efficiency ratings, baseline condition, and program measure lists.",
"Owner authorization may be required.",
"Quote and AHRI or manufacturer data should be required before calculation."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Conceptual geothermal heat-pump option for a limited set of common-area or office/event spaces, not assumed district-wide because of urban site constraints.",
"inputFacts": [
{
"inputKey": "system_capacity_tons",
"value": 40,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited 40-ton system is more realistic than assuming full district conversion at an urban public market."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 24000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Geothermal costs are highly site-specific and should be treated as a placeholder until drilling feasibility is complete."
},
{
"inputKey": "drilling_feasibility_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No borefield, geotechnical, or site-constraint study is provided."
},
{
"inputKey": "ground_loop_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Urban site constraints mean vertical, horizontal, or hybrid loop assumptions should not be invented."
},
{
"inputKey": "geothermal_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No geothermal quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could become eligible under some clean-heating programs, but current scope is too uncertain.",
"Urban drilling feasibility and ownership control are unresolved.",
"Should remain needs_project_scope or needs_quote."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Targeted air sealing for market offices, event support spaces, doors, penetrations, loading-area interfaces, and conditioned common areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $125,000 targeted envelope scope is plausible for several older common-area spaces without assuming full district enclosure upgrades."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 7200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings depend on existing leakage, heated area, and operating schedules, none of which are documented."
},
{
"inputKey": "blower_door_or_envelope_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No envelope audit data is present."
},
{
"inputKey": "weatherization_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Nonresidential weatherization incentives may be limited compared with residential programs.",
"Savings need audit verification.",
"Must exclude unconditioned open-air market areas where envelope measures are not meaningful."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Selective roof, wall, and pipe insulation upgrades in conditioned common areas, offices, event support rooms, and back-of-house spaces.",
"inputFacts": [
{
"inputKey": "insulated_area_square_feet",
"value": 28000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "This is a limited conditioned-area placeholder because total building square footage is unknown."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes targeted insulation work rather than full-building envelope replacement."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 8500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are plausible but require audit confirmation."
},
{
"inputKey": "existing_r_value_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No existing insulation documentation is provided."
},
{
"inputKey": "insulation_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No contractor quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on conditioned area, existing R-value, proposed R-value, and program requirements.",
"Should not use residential-only weatherization programs.",
"May require owner authorization."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Upgrade shared cold storage, walk-in refrigeration controls, evaporator fan motors, door gaskets, night curtains, and anti-sweat controls where equipment is owned or managed by the market operator.",
"inputFacts": [
{
"inputKey": "walk_in_cooler_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public food market district plausibly includes several shared or tenant-facing refrigeration assets, but the operator's control must be confirmed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 14500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes controls and component upgrades rather than wholesale replacement of all vendor refrigeration."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 78000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Refrigeration is a meaningful food-market load, but savings should be validated by equipment-level inventory."
},
{
"inputKey": "vendor_owned_equipment_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "To avoid overclaiming eligibility, the synthetic scope excludes vendor-owned assets unless documented later."
},
{
"inputKey": "refrigeration_equipment_inventory_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No equipment inventory is included."
},
{
"inputKey": "refrigeration_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No contractor quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Vendor-owned equipment should be excluded unless ownership/control is documented.",
"Eligibility often depends on measure type, horsepower, door count, and existing equipment condition.",
"Quote and equipment inventory should be required."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal preheat system for shared food-prep, handwashing, restroom, and event support hot-water loads.",
"inputFacts": [
{
"inputKey": "collector_area_square_feet",
"value": 420,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal sizing is a placeholder because actual hot-water use and roof area are not documented."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes a modest commercial solar water-heating system, not a district-wide system."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 2200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are uncertain because domestic hot-water load is unknown."
},
{
"inputKey": "domestic_hot_water_load_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No water-heating load profile is provided."
},
{
"inputKey": "solar_thermal_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No vendor quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be technically eligible in some programs but is unlikely to be a first-priority measure without hot-water load data.",
"Should remain suppressed or needs_project_scope until a water-heating audit confirms the load."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Battery storage for resilience and demand management serving critical common-area circuits, food storage support, vendor operations during outages, and event operations.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 250 kW battery is plausible relative to 1,050,000 annual kWh without assuming a full-facility backup system."
},
{
"inputKey": "battery_capacity_kwh",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four-hour storage is a common planning assumption for resilience and demand management."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 65000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes about $650 per kWh installed including inverter, controls, switchgear, fire protection, and integration."
},
{
"inputKey": "critical_loads_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture implies public and food-related loads but does not provide a critical-load schedule."
},
{
"inputKey": "paired_with_solar_pv",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Battery economics and resilience grants are more plausible if paired with future solar PV."
},
{
"inputKey": "battery_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No battery quote is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Many programs require resilience justification, critical-load documentation, and interconnection review.",
"Ownership/control of electric service and switchgear must be confirmed.",
"Should require a quote and application status before including in user-facing totals."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Conceptual microgrid for critical public market operations, potentially combining solar PV, battery storage, controls, and limited backup generation for food resilience and emergency community support.",
"inputFacts": [
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A microgrid scope would need controls beyond standalone battery storage."
},
{
"inputKey": "critical_load_kw",
"value": 180,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical load is a placeholder because no circuit-level load study is available."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 125000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Microgrid costs are highly site-specific and include engineering, controls, switchgear, protection, and commissioning."
},
{
"inputKey": "interconnection_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No DTE interconnection study is included."
},
{
"inputKey": "resilience_benefit_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Food access and market operations may support a resilience narrative, but no formal resilience plan is present."
},
{
"inputKey": "microgrid_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No microgrid quote or design package is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially relevant for resilience grants, but too conceptual for calculation.",
"Should remain needs_project_scope until critical loads, interconnection, and design are documented.",
"Large scope may exceed typical small-business or utility prescriptive incentives."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install public and fleet-support Level 2 chargers for visitors, vendors, staff, and event use in market parking areas.",
"inputFacts": [
{
"inputKey": "charger_level",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 charging is a realistic early EV infrastructure scope for a market district."
},
{
"inputKey": "charging_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight ports is a conservative public-destination and vendor-support deployment."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 16800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes about $21,000 per port installed, including trenching, panels, networking, make-ready, signage, and commissioning."
},
{
"inputKey": "public_access_charging",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public market site would plausibly provide public or visitor access."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture does not describe owned delivery vehicles or a fleet electrification plan."
},
{
"inputKey": "utility_make_ready_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility EV infrastructure application is provided."
},
{
"inputKey": "ev_charger_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No EVSE quote is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on utility territory, public access, networking, site host agreement, and make-ready rules.",
"No fleet-only incentive should be assumed because the customer is not modeled as a fleet owner.",
"May require preapproval before construction."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Conceptual natural-gas CHP system to serve thermal and electric loads for food-market operations, subject to feasibility review.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 150,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 150 kW CHP placeholder is plausible for a high-load facility but actual thermal matching is unknown."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 52500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes about $3,500 per kW installed for CHP equipment, controls, interconnection, gas work, and heat recovery."
},
{
"inputKey": "useful_thermal_load_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "CHP requires steady thermal load documentation, which the fixture does not provide."
},
{
"inputKey": "chp_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No CHP feasibility study is present."
},
{
"inputKey": "chp_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No CHP quote is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not a clean renewable project unless program rules specifically include CHP.",
"Should not be forced into solar or renewable grant categories.",
"Thermal load match and emissions requirements are unresolved."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Conceptual food-waste-to-energy or biogas partnership concept related to market organics, not an on-site owned generator project at this stage.",
"inputFacts": [
{
"inputKey": "onsite_biogas_generation_owned_by_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public market may generate organic waste, but the fixture does not support assuming an owned biogas generation asset."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No defined biomass or biogas scope should be priced."
},
{
"inputKey": "annual_feedstock_tons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Waste cost is known, but tonnage and organics diversion volume are not provided."
},
{
"inputKey": "interconnection_or_gas_injection_plan",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection, gas injection, or energy offtake plan is present."
},
{
"inputKey": "biogas_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No biomass or biogas vendor quote is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Food waste diversion may be relevant to sustainability grants, but not enough to model an energy-system grant.",
"Should remain suppressed until feedstock, ownership, site control, and technology scope are defined."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "No realistic small-wind project assumed for this urban Detroit public market site.",
"inputFacts": [
{
"inputKey": "small_wind_project_pursued",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Urban market district context makes small wind unlikely relative to solar, lighting, HVAC, or storage."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind project should be costed without a wind resource study and site design."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind study is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Urban wind should not be forced to qualify.",
"No estimate should be calculated without wind resource, zoning, structural, and interconnection evidence."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Conceptual thermal storage for refrigeration or chilled-water load shifting, not a defined project.",
"inputFacts": [
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No chilled-water plant, refrigeration thermal-storage design, or load profile is available."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal storage is too undefined to price."
},
{
"inputKey": "thermal_storage_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No quote is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially relevant only if a defined refrigeration or chilled-water project is developed.",
"Should remain needs_project_scope."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "approved_rerz_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing opportunity-specific inputs already suppress the Michigan Renewable Energy Renaissance Zone workflow for this fixture."
},
{
"inputKey": "qualified_company_operations",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is modeled as a nonprofit public market operator, not a qualified renewable-energy company."
},
{
"inputKey": "company_current_on_state_and_local_taxes",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes this as a synthetic compliance field, but it does not overcome the missing zone and operations requirements."
}
],
"reasoning": "Do not calculate a positive RERZ tax estimate unless program records later confirm an approved designation and qualified operations."
},
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
"userOverrideAllowed": true,
"reasoning": "The fixture already marks this Washington solar manufacturing taxpayer workflow as suppressed for a Michigan nonprofit market operator."
}
],
"reasoning": "Not relevant because the customer is in Michigan and is not modeled as a Washington solar manufacturing taxpayer."
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
"userOverrideAllowed": true,
"reasoning": "The fixture already marks the Rhode Island renewable property-tax valuation workflow as suppressed for this Michigan site."
}
],
"reasoning": "Not relevant because the site is in Michigan, not Rhode Island."
},
{
"opportunityId": "UTILITY_DTE_NONRES_CUSTOM_EFFICIENCY_LIGHTING",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_of_record_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture provides DTE Electric and district-level electric usage."
},
{
"inputKey": "eligible_lighting_project_cost_cents",
"value": 18900000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning cost for common-area LED lighting retrofit."
},
{
"inputKey": "preapproval_required_before_install",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Utility custom or prescriptive nonresidential incentives commonly require application before installation."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No preapproval is present in the fixture."
}
],
"reasoning": "Lighting is a realistic target for this profile, but the estimate should require a quote, fixture schedule, and utility preapproval status."
},
{
"opportunityId": "UTILITY_DTE_NONRES_CUSTOM_EFFICIENCY_HVAC",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "eligible_hvac_project_cost_cents",
"value": 41000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning cost for a moderate packaged-HVAC replacement scope."
},
{
"inputKey": "manufacturer_efficiency_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No AHRI, model number, or efficiency schedule is available."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No application or reservation is present."
}
],
"reasoning": "HVAC efficiency may be eligible in a nonresidential utility program, but no calculation should be final without equipment schedule, quote, and preapproval status."
},
{
"opportunityId": "UTILITY_DTE_NONRES_CUSTOM_EFFICIENCY_REFRIGERATION",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "vendor_owned_equipment_excluded",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The scope should exclude vendor-owned equipment until control and reimbursement rights are documented."
},
{
"inputKey": "eligible_refrigeration_project_cost_cents",
"value": 14500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning cost for shared refrigeration controls and component upgrades."
},
{
"inputKey": "refrigeration_inventory_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Measure-level eligibility usually needs door counts, horsepower, motor types, controls, and baseline equipment."
}
],
"reasoning": "The project is plausible for a public food market, but the operator/vendor ownership boundary should keep calculations cautious."
},
{
"opportunityId": "UTILITY_DTE_EV_MAKE_READY_OR_CHARGING_INFRASTRUCTURE",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "charging_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic EV scope uses eight Level 2 ports."
},
{
"inputKey": "public_access_charging",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public access is plausible for a market district site."
},
{
"inputKey": "eligible_ev_project_cost_cents",
"value": 16800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning cost for eight installed Level 2 ports."
},
{
"inputKey": "make_ready_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility make-ready or EVSE application is present."
}
],
"reasoning": "EV charging is plausible, but utility make-ready or charging infrastructure programs usually require application and site design before an estimate is reliable."
},
{
"opportunityId": "FEDERAL_DIRECT_PAY_CLEAN_ENERGY_TAX_CREDIT_PLACEHOLDER",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "tax_exempt_applicable_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The organization is modeled as a nonprofit, but tax-credit monetization details are outside the grant-estimation fixture."
},
{
"inputKey": "eligible_clean_energy_property_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No solar PV, battery, geothermal, or microgrid final design and cost basis is documented."
},
{
"inputKey": "placed_in_service_date",
"value": null,
"valueType": "date",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No installed project exists."
}
],
"reasoning": "Do not include direct-pay tax credits in a grant total without a defined eligible property, ownership, cost basis, placed-in-service date, and tax counsel review."
},
{
"opportunityId": "MICHIGAN_OR_LOCAL_RESILIENCE_GRANT_PLACEHOLDER",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "community_resilience_role_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The public market role is plausible, but no formal resilience designation, emergency plan, or public-agency partnership is documented."
},
{
"inputKey": "critical_load_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No critical-load schedule is included."
},
{
"inputKey": "eligible_resilience_project_cost_cents",
"value": 125000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the conceptual microgrid planning cost, which is too uncertain for calculation."
}
],
"reasoning": "Resilience grants may be thematically relevant but should not calculate without an actual program, documented public benefit, project scope, and application status."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "building_square_footage",
"reason": "needs user decision"
},
{
"inputKey": "owner_authorization_document",
"reason": "source requires agency approval"
},
{
"inputKey": "signed_contractor_quotes",
"reason": "quote not available"
},
{
"inputKey": "grant_preapproval_letter",
"reason": "application not submitted"
},
{
"inputKey": "utility_account_number_unmasked",
"reason": "needs user decision"
},
{
"inputKey": "equipment_model_numbers_and_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "vendor_equipment_ownership_list",
"reason": "needs user decision"
},
{
"inputKey": "critical_load_schedule",
"reason": "needs user decision"
},
{
"inputKey": "interconnection_study",
"reason": "application not submitted"
},
{
"inputKey": "approved_rerz_designation",
"reason": "source requires agency approval"
},
{
"inputKey": "small_wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biogas_feedstock_tonnage_and_offtake_agreement",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"Michigan Renewable Energy Renaissance Zone tax benefits should remain suppressed because the fixture says there is no approved zone designation and the applicant is not modeled as a qualified renewable-energy company.",
"Residential-only incentives should remain blocked because the site is a nonresidential mixed-use public market district.",
"Agricultural producer incentives should not be assumed merely because farmers or food vendors use the market; the applicant is the nonprofit market operator.",
"School, public-entity, tribal, and state-agency grant categories should not be assumed from the nonprofit public-serving mission alone.",
"Vendor-owned refrigeration, cooking, and tenant equipment should not be included without proof of applicant ownership, control, or reimbursement authority.",
"Small wind should remain nonqualified unless the user provides a wind study, zoning path, structural review, and interconnection concept.",
"Biomass or biogas energy-system grants should remain suppressed unless an owned energy project, feedstock tonnage, offtake plan, and cost basis are defined.",
"Geothermal, microgrid, solar thermal, and thermal storage scopes are too uncertain for positive grant estimates without feasibility work and quotes.",
"Any incentive requiring preapproval should remain out of user-facing totals until application status is documented.",
"Direct-pay tax-credit style values should not be mixed into grant estimates without tax counsel review, cost basis, ownership, and placed-in-service facts."
]
}

