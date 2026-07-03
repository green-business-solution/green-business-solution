{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "one-community-health-midtown",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for a Sacramento nonprofit outpatient healthcare campus using the supplied test-case facts. Electric utility should be treated as SMUD; PG&E should be used only for gas-side measures. Organization is a nonprofit healthcare provider but is not a school-bus site, public agency, tribal entity, agricultural producer, or freight/fleet depot based on the supplied context. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_is_nonprofit",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the applicant as a nonprofit organization."
},
{
"inputKey": "organization_primary_sector",
"value": "community_health_center",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is described as an outpatient primary care, dental, behavioral health, pharmacy, laboratory, and community-health services location."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A nonprofit community health center is not typically a state, municipal, or school district entity."
},
{
"inputKey": "is_k12_school_or_school_district",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is a healthcare campus, not a K-12 school or school district."
},
{
"inputKey": "operates_school_bus_fleet",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A Midtown outpatient healthcare campus would not normally operate an eligible school-bus fleet."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal government status is indicated in the test case."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity is outpatient healthcare, not agricultural production."
},
{
"inputKey": "is_disadvantaged_or_low_income_serving_organization",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Community health centers commonly serve low-income and medically underserved patients, but program-specific documentation should still be requested."
},
{
"inputKey": "site_control_status",
"value": "unknown_tenant_or_owner",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists ownership status as not sure, so grant estimates requiring site control or owner authorization should not assume approval."
},
{
"inputKey": "landlord_consent_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ownership is unknown, and many equipment, roof, parking, and electrical projects require owner or landlord authorization."
},
{
"inputKey": "electric_utility_customer",
"value": "Sacramento Municipal Utility District",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case self-reports SMUD electric service and normalized utility territory as SMUD."
},
{
"inputKey": "gas_utility_customer",
"value": "Pacific Gas and Electric Company",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case describes PG&E gas service."
},
{
"inputKey": "annual_kwh",
"value": 1357000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual electricity use."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 23069000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual electric cost of $230,690."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 5516500,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual gas cost of $55,165."
},
{
"inputKey": "building_square_feet",
"value": 59000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form and normalized profile identify 59,000 square feet."
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
"value": "no_contractor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At an exploring stage, a nonprofit facility would typically not yet have selected contractors for multiple capital projects."
},
{
"inputKey": "application_status_for_grants",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application submission, award, reservation, or preapproval evidence is included."
},
{
"inputKey": "internal_capital_budget_approved",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not indicate board approval or capital budget authorization."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install a modest publicly accessible or patient/staff-serving Level 2 charging project in the Midtown parking area, sized for a healthcare campus rather than a fleet depot.",
"inputFacts": [
{
"inputKey": "charger_project_type",
"value": "level_2_workplace_and_visitor_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A community health center could reasonably add visitor and employee charging, but the profile does not support a highway-corridor DC fast charging or school-bus charging use case."
},
{
"inputKey": "level_2_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight ports is a plausible first-phase installation for a 59,000 square foot outpatient healthcare campus."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A Midtown clinic parking area is more likely to pursue Level 2 charging than DC fast charging unless it has a specific public charging business plan."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview uses an upfront cost of $8,480 for EV charger installation."
},
{
"inputKey": "parking_spaces_affected",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes one charging port per dedicated parking space; actual parking layout is not provided."
},
{
"inputKey": "utility_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Electrical capacity and panel availability require a contractor or utility assessment."
},
{
"inputKey": "public_access_commitment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Some EV infrastructure programs require public access, minimum uptime, or networked charger commitments."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely plausible for workplace, visitor, or community charging incentives if site control and public-access requirements are met.",
"Should not be treated as eligible for school-bus charging programs.",
"Should not be treated as eligible for highway NEVI DC fast charging without corridor, site-host, and DCFC scope evidence."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Install eight Level 2 charging ports for staff, patients, and community visitors.",
"inputFacts": [
{
"inputKey": "level_2_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches a reasonable first-phase non-fleet installation for a healthcare campus."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Grant-funded public or workplace charging projects commonly require networked equipment."
},
{
"inputKey": "ada_accessible_ev_space_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Healthcare sites would normally plan at least one accessible EV charging space when modifying parking areas."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the previewed upfront project cost."
},
{
"inputKey": "charger_quote_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage project has no quote evidence in the test case."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs quote, site plan, parking control, and utility service capacity confirmation before calculating most grant amounts."
]
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"projectScopeSummary": "No realistic DC fast charging scope is assumed for this clinic profile absent a public charging business plan or corridor-site designation.",
"inputFacts": [
{
"inputKey": "dc_fast_charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project profile supports modest Level 2 charging, not a DCFC station."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The DC fast charging preview cost should not be treated as an active customer scope without confirmation."
},
{
"inputKey": "nevi_corridor_site",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "NEVI-style eligibility depends on corridor/community charging siting requirements not established by the profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress DCFC-specific grants unless the user confirms a DCFC scope, public access, site host agreement, and program siting eligibility."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install battery storage for outage resilience supporting refrigeration, IT, security, limited lighting, and critical clinical/pharmacy loads.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 125,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 125 kW battery is plausible for partial critical-load backup at a 59,000 square foot outpatient healthcare site."
},
{
"inputKey": "battery_energy_kwh",
"value": 500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four hours of storage at 125 kW is a common resilience planning assumption."
},
{
"inputKey": "critical_load_panel_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A resilience-oriented healthcare battery would normally include critical-load separation or transfer equipment."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the previewed battery storage upfront cost."
},
{
"inputKey": "existing_backup_generator",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Clinics may have existing emergency backup, but this is not provided in the test case."
},
{
"inputKey": "battery_quote_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote or interconnection package is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for resilience or storage incentives only if program rules include nonprofit healthcare or critical facilities.",
"Most formulas should require quote, interconnection, operating mode, and ownership model."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Potential future resilience microgrid combining solar, battery storage, controls, and critical-load islanding; not mature enough for grant calculation.",
"inputFacts": [
{
"inputKey": "microgrid_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A true microgrid would require controls and islanding, but the project is not scoped."
},
{
"inputKey": "microgrid_serves_critical_facility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A community health center can plausibly be treated as a critical community-serving facility for planning purposes."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The previewed microgrid cost should not drive grants without a defined solar, storage, controls, and interconnection scope."
},
{
"inputKey": "utility_interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection evidence is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Conceptually plausible for resilience funding but should be suppressed until engineering scope, ownership, and interconnection details exist."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop or split HVAC units with higher-efficiency equipment while maintaining healthcare ventilation requirements.",
"inputFacts": [
{
"inputKey": "hvac_units_replaced",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Six units is a plausible partial replacement scope for a 59,000 square foot outpatient healthcare campus."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Estimated conservative partial HVAC capacity; actual schedules and equipment sizes are unknown."
},
{
"inputKey": "selected_measure_type",
"value": "high_efficiency_packaged_rooftop_units",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Packaged units are a common retrofit path for commercial healthcare buildings."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the previewed HVAC replacement cost."
},
{
"inputKey": "equipment_efficiency_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No AHRI certificates, model numbers, or efficiency ratings are present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility rebates or grants should require equipment efficiency documentation and possibly preapproval before purchase."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Electrify a portion of space-conditioning loads with high-efficiency heat pumps, likely as phased replacement rather than full-campus conversion.",
"inputFacts": [
{
"inputKey": "heat_pump_units",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A four-unit phased heat-pump retrofit is realistic for an exploring-stage healthcare facility."
},
{
"inputKey": "existing_heat_source",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has PG&E gas service and significant annual gas cost."
},
{
"inputKey": "estimated_gas_savings_therms",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Therm savings require existing equipment and load calculations."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the previewed heat pump HVAC retrofit cost."
},
{
"inputKey": "healthcare_ventilation_design_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Healthcare HVAC changes should be reviewed for ventilation and code impacts, and no review is documented."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for electrification incentives, but estimates should require equipment type, capacity, efficiency, and gas displacement documentation."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump conversion is not treated as a realistic near-term scope for this urban Midtown healthcare campus.",
"inputFacts": [
{
"inputKey": "ground_loop_feasibility_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No geotechnical, drilling, or site-control evidence is provided."
},
{
"inputKey": "available_land_for_borefield",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Urban campus constraints make borefield feasibility uncertain."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Preview cost should not be used for grants without a feasibility study and contractor estimate."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the user confirms ownership or long-term site control and a geothermal feasibility study."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace a small batch of interior fluorescent or older LED fixtures in clinical and administrative areas with high-efficiency LED fixtures or retrofit kits.",
"inputFacts": [
{
"inputKey": "fixture_replacements",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview explicitly assumes 12 fixture replacements."
},
{
"inputKey": "annual_operating_hours",
"value": 3120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 60 operating hours per week for outpatient clinic and administrative spaces."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the previewed LED lighting upfront cost."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy or vacancy controls are common in clinic offices, restrooms, and storage areas."
},
{
"inputKey": "preapproval_required_before_purchase",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Program-specific preapproval rules are not encoded in the customer profile."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"More likely a utility rebate than a competitive grant.",
"Should require fixture schedule and baseline wattage for precise savings."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Replace or supplement gas domestic hot-water equipment serving clinic restrooms, janitorial sinks, dental support areas, and staff areas with commercial heat pump water heating.",
"inputFacts": [
{
"inputKey": "heat_pump_water_heater_units",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two commercial units is a plausible small-to-moderate domestic hot-water retrofit for an outpatient healthcare facility."
},
{
"inputKey": "existing_water_heating_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has PG&E gas service and water heating is a common gas end use."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the previewed heat pump water heater upfront cost."
},
{
"inputKey": "commercial_hpwh_quote_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote is included."
},
{
"inputKey": "hot_water_load_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Domestic hot-water sizing for healthcare and dental uses should be verified before grant calculation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely relevant for gas-to-electric or water-heating incentives, but formula should require equipment capacity, efficiency, and eligible cost."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal water heating is not assumed as a likely project because the building is an outpatient clinic rather than a high domestic-hot-water facility such as a hotel, dormitory, or hospital inpatient facility.",
"inputFacts": [
{
"inputKey": "solar_thermal_collectors_count",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No roof plan, collector count, or solar thermal scope is provided."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The previewed cost should not be used for grants without a real solar thermal quote."
},
{
"inputKey": "high_domestic_hot_water_load_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Outpatient clinics generally have lower hot-water intensity than lodging, laundry, or inpatient hospital uses."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the user confirms high hot-water loads, roof suitability, and a solar thermal quote."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Upgrade pharmacy or laboratory refrigeration controls/equipment, such as high-efficiency medical refrigerators or monitored pharmacy refrigeration.",
"inputFacts": [
{
"inputKey": "refrigeration_units_replaced",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A clinic with pharmacy and laboratory services could plausibly have several medical or pharmacy refrigeration units."
},
{
"inputKey": "refrigeration_equipment_type",
"value": "medical_pharmacy_refrigerators",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This is more realistic than grocery-style refrigeration for the described facility."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the previewed refrigeration equipment cost."
},
{
"inputKey": "energy_star_or_equivalent_documented",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Eligibility would depend on selected equipment specifications."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could be eligible for equipment rebates if qualifying models are selected, but should require model numbers and invoices."
]
},
{
"retrofitTypeId": "induction_cooking_equipment",
"projectScopeSummary": "Small staff breakroom or demonstration kitchen electrification only; no commercial foodservice operation is assumed.",
"inputFacts": [
{
"inputKey": "commercial_kitchen_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The stated activities do not include foodservice or a commercial kitchen."
},
{
"inputKey": "induction_units",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A single small induction appliance could be plausible for staff or educational use, but not a major grant-relevant scope."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Do not use the preview cost unless the user confirms an actual cooking-equipment project."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress commercial-kitchen incentives unless a real commercial kitchen and qualifying equipment are confirmed."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Limited envelope improvements such as roof insulation or targeted air sealing could be considered during tenant improvements, but the project is not currently scoped.",
"inputFacts": [
{
"inputKey": "insulation_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No roof, wall, or attic area is provided."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The previewed cost should not drive grant estimates without an envelope audit and bid."
},
{
"inputKey": "building_envelope_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit information is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Potentially eligible for efficiency incentives but should remain suppressed until area, R-values, baseline, and cost are known."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not assumed for a small retrofit package at an exploring-stage outpatient clinic.",
"inputFacts": [
{
"inputKey": "certification_target",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No LEED, WELL, or other certification target is identified."
},
{
"inputKey": "certification_consultant_engaged",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No consultant or certification scope is indicated."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Certification costs should not be estimated without a selected certification path."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force a certification grant estimate unless the user selects a certification target and eligible soft costs are supported."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas generation is not realistic for this urban outpatient healthcare campus.",
"inputFacts": [
{
"inputKey": "onsite_biogenic_fuel_source",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A Midtown clinic does not have an indicated biomass, wastewater, landfill gas, or digester fuel stream."
},
{
"inputKey": "system_kw",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No realistic biomass or biogas system is assumed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Do not use the previewed cost for this profile without a real biogas or biomass project."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress biomass and biogas grants as not relevant to this healthcare profile."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Combined heat and power is not assumed because the facility is an outpatient clinic with uncertain thermal baseload and decarbonization goals favoring electrification.",
"inputFacts": [
{
"inputKey": "thermal_baseload_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No continuous thermal load study is provided."
},
{
"inputKey": "chp_system_kw",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No CHP project is assumed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Preview cost should not produce a grant estimate for an unscoped CHP project."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress CHP grants unless a continuous thermal load, emissions compliance path, and customer intent are documented."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not realistic for this dense urban Sacramento healthcare site.",
"inputFacts": [
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind resource study is present."
},
{
"inputKey": "small_wind_system_kw",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Urban healthcare campus conditions do not support a realistic small wind scope."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No actual wind project cost should be assumed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress small-wind incentives as unrealistic for the profile."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal energy storage is not assumed as a near-term project because no central plant, chilled-water system, or major demand-management scope is documented.",
"inputFacts": [
{
"inputKey": "central_chilled_water_or_hot_water_plant_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 59,000 square foot outpatient campus could have packaged systems rather than a central plant; the test case does not specify."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No thermal storage project is assumed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No engineering scope exists for thermal storage."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless central plant details, demand-charge economics, and engineering design are provided."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_operates_eligible_school_bus_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is a nonprofit healthcare campus, not a school-bus site."
},
{
"inputKey": "school_bus_charging_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The realistic EV scope is visitor and staff Level 2 charging."
},
{
"inputKey": "eligible_school_bus_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No school buses are part of this healthcare profile."
}
],
"reasoning": "Although the generic match marked this opportunity eligible because of geography and nonprofit status, the program name and scope indicate school-bus charging. This profile should not receive a positive estimate for that opportunity."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "nevi_project_type",
"value": "not_confirmed",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile does not establish that the project is an eligible NEVI corridor or community charging site."
},
{
"inputKey": "dc_fast_charging_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic project assumption is Level 2 charging, not DC fast charging."
},
{
"inputKey": "minimum_public_access_hours_committed",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Public access requirements cannot be assumed."
},
{
"inputKey": "site_host_agreement_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No site-host or application documentation is provided."
}
],
"reasoning": "Do not calculate a NEVI estimate from a generic EV charger preview. Suppress or request scope unless the user confirms a DCFC/public community charging project that meets the solicitation requirements."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "community_charging_project_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project could be community-serving, but the profile does not confirm public access, eligible equipment, or program siting criteria."
},
{
"inputKey": "publicly_accessible_ports",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Publicly accessible port count should not be assumed for a healthcare campus parking project."
},
{
"inputKey": "level_2_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight Level 2 ports are a plausible customer scope, but may not satisfy program-specific equipment or public-access rules."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Use only as a placeholder until quote-level cost is available."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application evidence is present."
}
],
"reasoning": "This may be a plausible target only if the site elects a public/community charging scope and satisfies solicitation requirements. Estimate should remain suppressed or marked preliminary until scope and application facts are known."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "landlord_or_owner_authorization",
"reason": "needs user decision"
},
{
"inputKey": "contractor_quote_by_retrofit",
"reason": "quote not available"
},
{
"inputKey": "ev_charger_site_plan",
"reason": "needs user decision"
},
{
"inputKey": "ev_charger_public_access_commitment",
"reason": "needs user decision"
},
{
"inputKey": "utility_service_capacity_study",
"reason": "quote not available"
},
{
"inputKey": "grant_application_submitted_date",
"reason": "application not submitted"
},
{
"inputKey": "grant_award_or_reservation_amount_cents",
"reason": "source requires agency approval"
},
{
"inputKey": "hvac_equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "existing_hvac_efficiency_and_capacity",
"reason": "quote not available"
},
{
"inputKey": "battery_interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "critical_load_study",
"reason": "quote not available"
},
{
"inputKey": "geothermal_borefield_feasibility",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_or_biogas_feedstock_agreement",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "commercial_kitchen_equipment_schedule",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"Do not treat the healthcare nonprofit as a school, school district, or school-bus fleet operator.",
"Do not use PG&E electric incentives for this site because the test case identifies SMUD as the electric utility and PG&E only for gas.",
"Do not calculate NEVI or DC fast charging grants from a Level 2 workplace or visitor charging assumption.",
"Do not assume landlord or owner consent because ownership status is unknown.",
"Do not force biomass, biogas, small wind, CHP, ground-source geothermal, or thermal storage qualification for an urban outpatient healthcare campus without specific engineering evidence.",
"Do not estimate grants that require application submission, reservation, award, or agency approval when the project stage is only exploring.",
"Do not use preview upfront costs as quote-level eligible costs for programs that require invoices, bids, equipment specifications, or preapproval."
]
}

