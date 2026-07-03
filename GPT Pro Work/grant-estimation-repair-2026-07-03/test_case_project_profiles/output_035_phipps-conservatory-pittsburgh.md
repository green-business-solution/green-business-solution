{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "phipps-conservatory-pittsburgh",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied test-case context for a Pittsburgh nonprofit botanical conservatory with greenhouse, humidity, water, exhibit, event, education, cafe, and visitor-service loads. The profile is designed to support realistic grant-estimation behavior without forcing qualification where ownership, quote, application, or agency-preapproval facts are missing. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_is_501c3_nonprofit",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form identifies the applicant as a nonprofit organization."
},
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a public-facing institution, but the applicant is modeled as a nonprofit rather than a municipal, county, state, or school-district entity."
},
{
"inputKey": "organization_is_k12_school",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Education programming is listed, but the building is not a K-12 school facility."
},
{
"inputKey": "organization_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The conservatory grows and maintains plants for exhibits and education, but it is not modeled as a commercial agricultural producer."
},
{
"inputKey": "organization_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, governance, or tribal-serving designation is present in the test case."
},
{
"inputKey": "organization_is_fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture does not identify a vehicle fleet project or fleet operations as a primary activity."
},
{
"inputKey": "utility_customer_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile lists Duquesne Light Company as the electric utility and includes annual electric consumption and cost."
},
{
"inputKey": "electric_customer_class",
"value": "commercial_nonprofit_institutional",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A nonprofit conservatory with visitor, exhibit, greenhouse, event, and cafe loads is most realistically treated as a nonresidential commercial/institutional customer unless utility bills show another class."
},
{
"inputKey": "gas_customer_class",
"value": "commercial_nonprofit_institutional",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied gas utility profile and greenhouse heating loads support a commercial/institutional gas classification, pending bill confirmation."
},
{
"inputKey": "facility_owner_or_long_term_operator",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership status is explicitly unknown in the supplied profile, and many grants require site control, owner consent, or a long-term lease."
},
{
"inputKey": "owner_consent_for_capital_projects",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capital upgrades such as geothermal, CHP, solar thermal, HVAC replacement, and lighting controls may require owner approval if the nonprofit is not the property owner."
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
"value": "pre_quote_budgetary_screening",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project fixture has modeled preview costs but no vendor quote, RFP, selected contractor, or final scope."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is in exploration, so application-submitted and award-pending workflows should not be assumed."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility, agency, or grant-program preapproval is included in the fixture."
},
{
"inputKey": "site_has_greenhouse_or_conservatory_loads",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly states greenhouse, humidity, water, exhibit, and visitor loads."
},
{
"inputKey": "critical_humidity_temperature_requirements",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture notes that humidity and plant health drive operations, which affects HVAC and commissioning scope."
},
{
"inputKey": "annual_kwh",
"value": 1800000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile supplies annual electricity consumption of 1,800,000 kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 21600000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile lists annual electric cost of $216,000."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 12600000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries list annual gas cost of $126,000."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 5300000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries list annual water and sewer cost of $53,000."
},
{
"inputKey": "has_prior_energy_audit_within_3_years",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not state whether a recent ASHRAE audit, utility audit, or greenhouse-specific engineering study exists."
},
{
"inputKey": "disadvantaged_community_or_environmental_justice_designation",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Location-based designations are not populated in the normalized geo profile and should not be invented."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "ASHRAE Level II energy audit with greenhouse HVAC, dehumidification, controls, ventilation, lighting, water, and utility-bill review; used to prioritize capital measures before seeking larger incentives.",
"inputFacts": [
{
"inputKey": "audit_level",
"value": "ASHRAE_Level_II",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A medium-sized institutional conservatory with complex greenhouse loads would realistically start with a Level II audit rather than a simple walk-through."
},
{
"inputKey": "audit_cost_cents",
"value": 4200000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A synthetic planning budget of about $0.75 per square foot is plausible for 55,500 square feet with greenhouse and controls complexity."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 4200000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For grant testing, the full audit budget is modeled as the potentially eligible cost unless a program excludes specialized process or greenhouse investigation."
},
{
"inputKey": "utility_bills_available_12_months",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual electric, gas, water/sewer, and waste costs are present, but actual bill PDFs are not confirmed."
},
{
"inputKey": "audit_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes no engineering proposal or vendor quote."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Many audit incentives require utility customer verification and preapproval before work starts.",
"Some programs cap study incentives or require implementation of recommended measures.",
"Specialized greenhouse/process analysis may be excluded by programs limited to standard building systems."
]
},
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "Retro-commissioning and controls optimization for greenhouse HVAC sequencing, ventilation schedules, humidity control, night setback constraints, exhibit lighting schedules, and BAS trend review.",
"inputFacts": [
{
"inputKey": "rcx_study_and_implementation_cost_cents",
"value": 9180000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already models an upfront cost of $91,800."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9180000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled RCx package is treated as potentially eligible, subject to program rules and utility preapproval."
},
{
"inputKey": "baseline_annual_kwh",
"value": 1800000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric consumption is supplied in the test case."
},
{
"inputKey": "modeled_annual_kwh_savings",
"value": 126000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 7% electric reduction is a realistic synthetic planning estimate for controls and commissioning at a complex greenhouse facility."
},
{
"inputKey": "modeled_annual_therm_savings",
"value": 10500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas use is not directly supplied, so therm savings are a conservative synthetic placeholder based on greenhouse heating optimization."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "RCx programs commonly require M&V, trend logs, or approved calculators; none are present in the test case."
},
{
"inputKey": "utility_preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Typical custom or RCx incentives require preapproval before implementation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Savings estimates should remain provisional until engineering calculations and trend data are available.",
"Grant or utility incentives should be suppressed if the program requires preapproval and no application status is provided.",
"Greenhouse comfort and plant-health constraints may reduce achievable schedule-based savings."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Limited LED replacement for public exhibit, back-of-house, cafe, education, and service areas; does not assume full horticultural grow-light replacement.",
"inputFacts": [
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied preview assumes 12 fixture replacements."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $1,604.25."
},
{
"inputKey": "lighting_type",
"value": "interior_public_and_back_of_house_LED_retrofit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small 12-fixture scope is most realistic as a targeted interior replacement rather than a campus-wide lighting overhaul."
},
{
"inputKey": "horticultural_grow_lighting_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Replacing horticultural grow lights would require plant-health and spectrum design details; the tiny modeled cost does not support that scope."
},
{
"inputKey": "existing_fixture_wattage_avg",
"value": 96,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A representative existing fixture wattage is needed for deemed lighting calculations."
},
{
"inputKey": "new_fixture_wattage_avg",
"value": 38,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A representative LED replacement wattage is needed for deemed lighting calculations."
},
{
"inputKey": "annual_operating_hours",
"value": 4200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public, exhibit, and operations areas have extended hours, but this value should be overwritten if a lighting schedule exists."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Small project size may fall below minimum incentive thresholds.",
"Horticultural grow-light incentives should not be calculated unless the scope explicitly includes qualifying grow-light equipment.",
"Deemed incentives require existing and proposed wattage documentation."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Networked or advanced lighting controls for exhibit, classroom, event, office, cafe, and service spaces, excluding plant-critical lighting zones unless separately engineered.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 13220000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $132,200."
},
{
"inputKey": "controlled_lighting_watts",
"value": 82000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A synthetic connected lighting load of about 1.5 W/sf for portions of the 55,500 square foot site is plausible for an older institutional facility."
},
{
"inputKey": "controlled_area_square_feet",
"value": 43000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controls are modeled for most public and support areas, while excluding some specialized greenhouse zones."
},
{
"inputKey": "control_strategy",
"value": [
"occupancy_sensors",
"daylight_dimming",
"scheduling",
"scene_controls_for_events"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These strategies are realistic for mixed public exhibit, education, event, office, and cafe spaces."
},
{
"inputKey": "plant_critical_zones_excluded",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Plant health and exhibit requirements can restrict automatic dimming or scheduling in greenhouse areas."
},
{
"inputKey": "controls_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No contractor quote, fixture schedule, or controls submittal is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Controls incentives often require preapproval, fixture counts, controlled wattage, and final invoice data.",
"Plant-critical lighting zones should not be assumed eligible for automatic reduction strategies without a horticultural lighting design.",
"Savings depend on occupancy schedules, daylight availability, and override behavior."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Targeted replacement of aging rooftop or split HVAC units serving visitor, education, cafe, office, event, and support areas; does not assume full greenhouse climate-system replacement.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 79800000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $798,000."
},
{
"inputKey": "hvac_unit_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Six replacement units is a realistic planning scope for a partial institutional HVAC replacement at a 55,500 square foot facility."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 150,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial 150-ton replacement is plausible for public and support spaces while excluding the most specialized greenhouse systems."
},
{
"inputKey": "equipment_type",
"value": "high_efficiency_rooftop_or_split_system_replacement",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Generic high-efficiency unit replacement is appropriate because no equipment schedule is supplied."
},
{
"inputKey": "greenhouse_primary_climate_system_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled cost and lack of design details do not support assuming full greenhouse climate-system replacement."
},
{
"inputKey": "modeled_annual_kwh_savings",
"value": 162000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 9% electric reduction is a conservative synthetic value for a partial HVAC replacement."
},
{
"inputKey": "modeled_annual_therm_savings",
"value": 4200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are uncertain because annual therms and proposed heating efficiency are not provided."
},
{
"inputKey": "equipment_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture has an admin-modeled cost but no vendor quote or equipment submittal."
},
{
"inputKey": "ahu_or_rtu_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Unit capacities, efficiencies, model numbers, and baseline conditions are needed for accurate deemed or custom incentive calculations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Typical HVAC incentives need AHRI data, equipment efficiency, baseline equipment type, and proof of purchase.",
"Custom greenhouse HVAC measures may require engineering review rather than deemed calculations.",
"Owner consent may be required because ownership status is unknown."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Feasibility-stage ground-source heat pump concept for partial heating and cooling loads in visitor, education, office, event, and support areas; greenhouse primary heating is not assumed to be fully converted.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 157600000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $1,576,000."
},
{
"inputKey": "geothermal_heat_pump_capacity_tons",
"value": 120,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial 120-ton geothermal system is plausible for a conservatory campus if limited to non-greenhouse or mixed-use areas."
},
{
"inputKey": "ground_loop_type",
"value": "vertical_borefield_assumed",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Urban park constraints make vertical bores more plausible than large horizontal loops, but no geotechnical or site-control data is supplied."
},
{
"inputKey": "borefield_area_available_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A geothermal project would need land access, subsurface review, and permission for drilling."
},
{
"inputKey": "historic_landscape_or_park_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is located in a public park setting, so disturbance, drilling, and utility routing approvals are realistic constraints."
},
{
"inputKey": "engineering_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No load calculation, borefield design, or feasibility report is included."
},
{
"inputKey": "project_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is in exploration and lacks design-build pricing."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Do not calculate grant value where a program requires final design, certified capacity, borefield data, or tax-basis data.",
"Site-control and drilling approvals are major uncertainties.",
"Nonprofit direct-pay or elective-pay tax treatment, if relevant, should be handled separately from grant estimation."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "High-efficiency replacement or retrofit of cafe, event-service, floral/plant-care, and back-of-house refrigeration equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 34500000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $345,000."
},
{
"inputKey": "refrigeration_equipment_count",
"value": 10,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A conservatory with cafe, events, and back-of-house operations could plausibly have a small portfolio of reach-ins, walk-ins, and specialty cold storage."
},
{
"inputKey": "equipment_scope",
"value": [
"walk_in_evaporator_fan_motors",
"reach_in_refrigerators",
"freezers",
"anti_sweat_heater_controls",
"night_covers_or_door_upgrades"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are common refrigeration efficiency measures, but exact eligibility depends on the actual equipment list."
},
{
"inputKey": "annual_refrigeration_kwh_baseline",
"value": 185000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A synthetic baseline is included for testing, but the fixture does not provide end-use metering."
},
{
"inputKey": "modeled_annual_kwh_savings",
"value": 37000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 20% savings assumption for refrigeration end use is plausible but should be replaced with measure-level data."
},
{
"inputKey": "equipment_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote or equipment list is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Refrigeration incentives usually require measure-specific quantities, wattages, efficiencies, and invoices.",
"Plant-care cold storage may not qualify under food-service refrigeration rules unless program language is broad.",
"A custom calculation may be required for specialty equipment."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Concept-stage natural-gas CHP system to serve year-round thermal loads and offset electric purchases; modeled as a feasibility scenario rather than a committed project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1200000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $12,000,000."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 350,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 350 kW CHP concept is plausible for a facility using 1.8 million kWh annually with substantial greenhouse thermal demand, but final sizing needs interval data."
},
{
"inputKey": "chp_thermal_recovery_mmbtu_per_year",
"value": 4100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal recovery is a synthetic planning value because annual therms and hourly load profiles are not supplied."
},
{
"inputKey": "requires_air_permit_review",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A natural-gas-fired CHP system would typically require emissions and interconnection review."
},
{
"inputKey": "electric_interval_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "CHP sizing and grant eligibility usually require interval load and thermal-load analysis."
},
{
"inputKey": "chp_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No CHP feasibility study, thermal host analysis, or interconnection application is included."
},
{
"inputKey": "project_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The $12 million value is an admin-modeled preview, not a contractor quote."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP may be excluded from clean-energy grant programs that require zero-emission or renewable technologies.",
"Natural-gas CHP qualification depends heavily on program-specific emissions, efficiency, resilience, and fuel criteria.",
"Large cost and permitting complexity make this a suppress-or-study case unless an actual application or feasibility report exists."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not a likely near-term conservatory project; modeled only as a hypothetical organic-waste or biogas energy concept with no confirmed feedstock, interconnection, or vendor design.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 900000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $9,000,000."
},
{
"inputKey": "confirmed_on_site_biogas_feedstock",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A conservatory may produce organics waste, but the fixture does not support a reliable on-site biogas feedstock at energy-project scale."
},
{
"inputKey": "third_party_feedstock_contract_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No municipal, food-waste, or wastewater biogas supply contract is present."
},
{
"inputKey": "biomass_system_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity should remain unknown without a feedstock study and technology selection."
},
{
"inputKey": "project_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor design or quote is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force qualification for biomass or biogas grants without confirmed eligible feedstock and technology.",
"Project may conflict with air-quality, odor, space, and public-visitor constraints.",
"Many renewable programs distinguish biogas from raw biomass combustion and require strict documentation."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not a realistic project for this urban conservatory and public park setting; included as a suppression test case.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 800000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $8,000,000."
},
{
"inputKey": "wind_turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No turbine model, tower height, wind study, or interconnection data exists."
},
{
"inputKey": "site_wind_resource_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A wind project should not be estimated without wind-resource evidence."
},
{
"inputKey": "urban_or_park_siting_constraint",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public urban conservatory location is a poor default fit for small wind due to visual, noise, safety, zoning, and space constraints."
},
{
"inputKey": "zoning_approval_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No zoning, historic, park, or community approvals are included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress estimates unless the user provides a wind-resource study, zoning approval path, turbine quote, and interconnection plan.",
"Do not infer small-wind feasibility from renewable-energy interest alone.",
"Urban public-site constraints make qualification unlikely."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal preheat concept for cafe, restrooms, event support, and plant-care hot water; not sized for full greenhouse heating.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 68000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview models an upfront cost of $680,000."
},
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": 1100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Collector area is a planning placeholder; roof access, shading, and structural capacity are unknown."
},
{
"inputKey": "solar_thermal_storage_gallons",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Storage volume is a synthetic design placeholder and should be replaced with engineering data."
},
{
"inputKey": "domestic_hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes water/sewer cost but not hot-water usage or gas use by end use."
},
{
"inputKey": "roof_or_mounting_area_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservatory roofs and glass structures may have shading, historic, structural, or exhibit constraints."
},
{
"inputKey": "project_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No solar thermal design or quote is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Many programs require certified collectors, solar-fraction calculations, installed cost, and proof of site control.",
"Do not assume eligibility for greenhouse space-heating unless the program allows process or agricultural thermal loads.",
"Roof, structural, and historic/public-site constraints must be resolved before treating this as a likely grant project."
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
"reasoning": "The supplied fixture already suppresses this Washington solar manufacturing taxpayer workflow because the site is in Pennsylvania."
}
],
"reasoning": "Keep suppressed; this Pennsylvania nonprofit conservatory should not be forced into a Washington tax classification."
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
"reasoning": "The supplied fixture already suppresses this Rhode Island renewable property-tax valuation workflow because the site is in Pennsylvania."
}
],
"reasoning": "Keep suppressed; Rhode Island renewable property-tax treatment is not relevant to a Pennsylvania site."
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
"reasoning": "The supplied fixture already suppresses the Michigan Renewable Energy Renaissance Zone workflow."
}
],
"reasoning": "Keep suppressed; the Pennsylvania site should not qualify for a Michigan zone-based tax incentive."
},
{
"opportunityId": "UTILITY_DUQUESNE_LIGHT_CUSTOM_CI_EFFICIENCY",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "duquesne_light_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied test case identifies Duquesne Light Company as the electric utility."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval or incentive reservation is present."
},
{
"inputKey": "eligible_measures",
"value": [
"led_lighting_retrofit",
"lighting_controls_retrofit",
"high_efficiency_hvac_replacement",
"retro_commissioning_study",
"high_efficiency_refrigeration_equipment"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic nonresidential efficiency measures for the facility, but actual program eligibility depends on current tariff and program rules."
}
],
"reasoning": "The site plausibly fits a commercial/institutional electric efficiency program, but estimates that require custom review, preapproval, or final measure data should remain suppressed until application status and quote data are provided."
},
{
"opportunityId": "PA_NONPROFIT_ENERGY_AUDIT_OR_PLANNING_GRANT_GENERIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "organization_is_501c3_nonprofit",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the organization as a nonprofit."
},
{
"inputKey": "audit_cost_cents",
"value": 4200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A Level II audit budget is realistic but not quote-backed."
},
{
"inputKey": "audit_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Grant calculations that reimburse planning studies should wait for a quote or final scope."
}
],
"reasoning": "Planning grants may be plausible for a nonprofit institutional facility, but the profile should not calculate a confirmed award without a program match, eligible scope, and quote."
},
{
"opportunityId": "FEDERAL_OR_STATE_CLEAN_ENERGY_GRANT_GENERIC_GEOTHERMAL",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "geothermal_heat_pump_capacity_tons",
"value": 120,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Capacity is a synthetic planning estimate for a partial system."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 157600000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Modeled project cost exists, but no grant-ready quote exists."
},
{
"inputKey": "site_control_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership and borefield rights are unresolved."
}
],
"reasoning": "A geothermal concept is plausible but should require quote, feasibility, site-control, and application facts before an estimate is included."
},
{
"opportunityId": "FEDERAL_OR_STATE_RENEWABLE_THERMAL_GRANT_GENERIC_SOLAR_WATER_HEATING",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 68000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Modeled project cost exists for the solar water heating preview."
},
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": 1100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Collector area is not quote-backed and should not support a precise incentive calculation."
},
{
"inputKey": "domestic_hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hot-water load is not supplied."
}
],
"reasoning": "Solar thermal may be plausible, but calculations should remain suppressed or provisional until a vendor design, load calculation, and site-control facts are available."
},
{
"opportunityId": "CHP_RESILIENCE_OR_EFFICIENCY_GRANT_GENERIC",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 350,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Capacity is a concept-stage planning value only."
},
{
"inputKey": "chp_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No engineering or interconnection evidence supports grant probability."
},
{
"inputKey": "zero_emission_or_renewable_fuel",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The default concept is natural-gas CHP, which many clean-energy grants may exclude."
}
],
"reasoning": "Suppress as a grant estimate unless a specific CHP-eligible program and feasibility package are provided."
},
{
"opportunityId": "BIOMASS_BIOGAS_GRANT_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "confirmed_on_site_biogas_feedstock",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No energy-scale feedstock source is confirmed."
},
{
"inputKey": "third_party_feedstock_contract_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feedstock contract is available."
}
],
"reasoning": "Do not estimate biomass or biogas grants for this profile without feedstock, technology, permitting, and site-compatibility evidence."
},
{
"opportunityId": "SMALL_WIND_GRANT_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "site_wind_resource_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind resource study is present."
},
{
"inputKey": "urban_or_park_siting_constraint",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility is modeled as an urban public park conservatory, making small wind unlikely."
}
],
"reasoning": "Suppress small-wind grants unless the user provides unusually strong evidence of site feasibility, permitting, and a qualifying turbine project."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "facility_owner_or_long_term_operator",
"reason": "needs user decision"
},
{
"inputKey": "owner_consent_for_capital_projects",
"reason": "needs user decision"
},
{
"inputKey": "grant_application_submitted",
"reason": "application not submitted"
},
{
"inputKey": "preapproval_received",
"reason": "source requires agency approval"
},
{
"inputKey": "contractor_quote_or_vendor_proposal",
"reason": "quote not available"
},
{
"inputKey": "final_project_scope",
"reason": "needs user decision"
},
{
"inputKey": "equipment_model_numbers_and_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "utility_account_number",
"reason": "needs user decision"
},
{
"inputKey": "electric_interval_data",
"reason": "needs user decision"
},
{
"inputKey": "annual_therms",
"reason": "needs user decision"
},
{
"inputKey": "greenhouse_hvac_sequence_of_operations",
"reason": "needs user decision"
},
{
"inputKey": "borefield_design_or_geotechnical_report",
"reason": "quote not available"
},
{
"inputKey": "roof_structural_capacity_for_solar_thermal",
"reason": "source requires agency approval"
},
{
"inputKey": "historic_or_park_approval_for_exterior_work",
"reason": "source requires agency approval"
},
{
"inputKey": "wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "disadvantaged_community_or_environmental_justice_designation",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The applicant is a nonprofit public-facing institution, not a public agency, K-12 school, tribal entity, agricultural producer, or Washington solar manufacturer unless the user provides contrary documentation.",
"Ownership status is unknown, so capital-intensive measures should require owner consent or site-control confirmation.",
"The facility has specialized greenhouse and plant-health constraints; standard commercial HVAC, lighting, and controls assumptions should not be blindly applied to all loads.",
"Small wind is unrealistic for an urban public-park conservatory without wind-resource, zoning, and interconnection evidence.",
"Biomass or biogas energy should not qualify by default because no energy-scale feedstock, technology selection, or permitting path is confirmed.",
"Natural-gas CHP should not be treated as a clean renewable project unless a specific program allows CHP and the project meets efficiency, emissions, resilience, and fuel requirements.",
"Solar water heating and geothermal concepts need quote, design, structural or subsurface review, and site-control facts before grant values should be included in user-facing totals.",
"Utility incentives that require preapproval should remain suppressed until application status is known.",
"Modeled admin preview costs are useful for test calculations but are not customer quotes or confirmed eligible costs."
]
}

