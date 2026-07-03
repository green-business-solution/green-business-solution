{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "trees-atlanta-kendeda-treehouse",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the uploaded test-case facts for a Georgia nonprofit urban-forestry campus with office, education, event, operations, and landscape water loads. Public/common-sense assumptions were used only to make the customer profile realistic; grant qualification is not forced. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type",
"value": "nonprofit_organization",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied test case identifies Trees Atlanta as a nonprofit organization."
},
{
"inputKey": "is_501c3_nonprofit",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A nonprofit urban-forestry organization would commonly be a 501(c)(3), but the test case does not include IRS documentation."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is described as a nonprofit, not a city, county, state agency, or public authority."
},
{
"inputKey": "is_school_district_or_public_school",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site has education programming but is not described as a K-12 school, school district, or public higher-education institution."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Urban forestry and landscape stewardship do not make the applicant an agricultural producer for typical rural/agriculture grant programs."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal government relationship is indicated in the test case."
},
{
"inputKey": "is_federal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a local nonprofit, not a federal agency."
},
{
"inputKey": "state_entity_or_state_authority",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No state-government ownership or agency role is present in the supplied profile."
},
{
"inputKey": "site_state_code",
"value": "GA",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The site address is in Atlanta, Georgia."
},
{
"inputKey": "site_zip5",
"value": "30310",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied normalized profile parses the site ZIP as 30310."
},
{
"inputKey": "electric_distribution_utility",
"value": "Georgia Power",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case identifies Georgia Power as the electric utility provider."
},
{
"inputKey": "electric_customer_class",
"value": "commercial_nonresidential",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 22,000 square foot nonprofit office, event, and operations facility would normally be billed as nonresidential commercial service, but the exact tariff is not supplied."
},
{
"inputKey": "gas_utility_distribution_provider",
"value": "Atlanta Gas Light",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case lists Atlanta Gas Light, but Georgia gas bills may involve separate marketers, so bill confirmation should remain relevant."
},
{
"inputKey": "gas_marketer_name",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile intentionally tests Atlanta gas marketer confusion, and the current facts do not identify a marketer."
},
{
"inputKey": "ownership_or_site_control_status",
"value": "unknown_needs_confirmation",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied ownership status is not sure. Grants that require owner authorization, deed evidence, or landlord consent should not calculate confidently until this is resolved."
},
{
"inputKey": "landlord_authorization_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Because site control is unknown, landlord authorization should remain missing for capital measures."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_quote_budgeting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The record is a grant-estimation test case with no vendor quotes or selected equipment."
},
{
"inputKey": "grant_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No program-specific application, preapproval, reservation, or award is included."
},
{
"inputKey": "utility_preapproval_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Georgia Power commercial incentives often require project details or preapproval before installation; this test case is only at exploration stage."
},
{
"inputKey": "annual_kwh",
"value": 240000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electricity use is supplied in the site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 3000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric cost of $30,000 is supplied and converted to cents."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 940000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost of $9,400 is supplied and converted to cents."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 1900000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual water and sewer cost of $19,000 is supplied and converted to cents."
},
{
"inputKey": "irrigation_meter_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site has landscape water loads, but the profile does not confirm whether irrigation is separately metered."
},
{
"inputKey": "primary_facility_uses",
"value": [
"nonprofit_administration",
"education_programming",
"volunteer_operations",
"events",
"landscape_stewardship"
],
"valueType": "array",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "These uses are listed in the supplied primary activity text."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small interior and exterior LED replacement package for office, education, event, and operations spaces.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches a modest test-case lighting package rather than a full-building lighting replacement."
},
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview assumptions mention 12 fixture replacements, which is plausible for a small phase."
},
{
"inputKey": "selected_measure_types",
"value": [
"interior_led_troffer_or_panel",
"exterior_led_area_or_wall_pack"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Office, event, and operations spaces commonly include both interior linear/troffer fixtures and exterior/security fixtures."
},
{
"inputKey": "utility_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploratory and no preapproval is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need Georgia Power account number, rate class, existing fixture wattage, proposed fixture wattage, and preapproval.",
"Small project cost means some grant programs may fall below minimum project-size thresholds."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Occupancy/vacancy sensors and scheduling controls for classrooms, conference rooms, event support areas, and offices.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 132200,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small controls package is realistic for a 22,000 square foot nonprofit facility."
},
{
"inputKey": "controlled_area_square_feet",
"value": 14000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes controls are added to regularly occupied office, classroom, and event areas, not all operations or storage areas."
},
{
"inputKey": "control_points_count",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eighteen sensors or control points is plausible for a small campus building with mixed rooms."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility incentive calculations may require fixture schedules and control type.",
"Controls installed only as code-minimum controls should not be counted."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop or split-system HVAC units serving office, classroom, and event areas with higher-efficiency equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A limited replacement phase for several small commercial HVAC units is realistic for the facility size."
},
{
"inputKey": "hvac_units_replaced",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Three units is a conservative partial-scope assumption for a 22,000 square foot mixed-use nonprofit building."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 18,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes a partial HVAC scope, not full-building replacement. Actual equipment schedules should override this."
},
{
"inputKey": "proposed_efficiency_basis",
"value": "above_code_commercial_unitary_equipment",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Typical nonresidential HVAC incentives require equipment above baseline or code minimum."
},
{
"inputKey": "equipment_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No equipment quote, AHRI certificate, or unit schedule is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs equipment-specific efficiency, capacity, and baseline information.",
"May be suppressed if replacement is standard like-for-like or required by code."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Partial electrification of gas or mixed-fuel HVAC zones using commercial heat pump equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial heat-pump retrofit is plausible for a nonprofit campus but requires design confirmation."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 20,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity is a conservative planning placeholder for a partial scope."
},
{
"inputKey": "fossil_fuel_displacement_expected",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes natural gas costs, so HVAC electrification could displace some gas load."
},
{
"inputKey": "existing_heating_fuel",
"value": "natural_gas_or_mixed",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Gas service is present, but the profile does not assign gas use by end use."
},
{
"inputKey": "design_engineering_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No design documents or load calculations are supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs load calculation, equipment schedule, and confirmation of whether gas heat is actually being displaced.",
"Electrical service upgrade requirements could materially change cost."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "Smart thermostats or zone scheduling controls for offices, classrooms, and event spaces with variable occupancy.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 100600,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A modest controls package is realistic for mixed occupancy spaces."
},
{
"inputKey": "thermostat_or_zone_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight zones is plausible for offices, classrooms, event rooms, and support spaces."
},
{
"inputKey": "networked_controls",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked scheduling controls are realistic for a nonprofit campus with events and variable operating hours."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some programs treat thermostats as low-cost measures and may not provide grant funding.",
"Utility incentives may require eligible thermostat models and documentation."
]
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"projectScopeSummary": "Duct sealing and insulation repairs in accessible mechanical areas serving offices and event spaces.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 147200,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A targeted duct repair scope is plausible for a 22,000 square foot facility."
},
{
"inputKey": "ductwork_linear_feet_treated",
"value": 450,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Placeholder quantity should be replaced with contractor measurement."
},
{
"inputKey": "pre_test_leakage_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No duct leakage test or commissioning report is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need pre/post testing or documented deficiency.",
"Incentive may be unavailable if ductwork is inaccessible or not part of eligible HVAC system."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Selective roofline or wall insulation improvements in accessible office, education, and support areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A targeted envelope improvement package is plausible but not enough for a full envelope retrofit."
},
{
"inputKey": "insulated_area_square_feet",
"value": 5000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes a limited accessible area rather than the entire 22,000 square foot building."
},
{
"inputKey": "existing_r_value_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No envelope assessment or existing insulation value is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs existing and proposed R-values.",
"May not qualify if the building is already high-performing or if work is maintenance rather than efficiency improvement."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Air sealing around penetrations, doors, event-space interfaces, and operations areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 194600,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Targeted commercial air sealing is plausible for comfort and energy reduction."
},
{
"inputKey": "blower_door_or_air_leakage_test_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No diagnostic test results are supplied."
},
{
"inputKey": "treated_area_square_feet",
"value": 9000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes targeted treatment in higher-occupancy areas."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many commercial grant programs require measured savings or bundling with a larger project.",
"Standalone air sealing may lack sufficient documentation for calculation."
]
},
{
"retrofitTypeId": "energy_management_system",
"projectScopeSummary": "Small building energy management system or enhanced scheduling platform for HVAC and lighting controls.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 254400,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A lightweight EMS/BAS upgrade is realistic for a 22,000 square foot building."
},
{
"inputKey": "points_or_devices_integrated",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Twenty-four integration points is plausible for thermostats, schedules, lighting controls, and meters."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No M&V plan is included, so performance-based grant estimates should remain cautious."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs quote, controls scope, and evidence that the project exceeds normal controls replacement.",
"Some programs may require measured or modeled savings."
]
},
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "Retro-commissioning study for schedules, HVAC operations, controls calibration, event-space setbacks, and water/irrigation operating practices.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 91800,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small study and implementation package is plausible for the facility size."
},
{
"inputKey": "study_cost_cents",
"value": 45000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Separates likely engineering/study cost from minor implementation actions."
},
{
"inputKey": "implementation_allowance_cents",
"value": 46800,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Allows for minor controls, scheduling, balancing, and operational improvements."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No auditor or commissioning provider is identified."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need utility-approved study provider.",
"Implementation incentives may require verified corrective actions."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Replace or supplement gas/electric domestic water heating for restrooms, event support, and volunteer operations with a commercial heat pump water heater.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small commercial heat pump water heater package is realistic for a nonprofit campus with events and operations."
},
{
"inputKey": "water_heater_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One unit is a conservative planning assumption."
},
{
"inputKey": "storage_capacity_gallons",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Event and volunteer operations can create intermittent hot water use, but actual sizing requires fixture and occupancy data."
},
{
"inputKey": "existing_water_heating_fuel",
"value": "unknown",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas service exists but the profile does not confirm water-heating fuel."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs existing equipment fuel and capacity.",
"May require ENERGY STAR or program-qualified commercial HPWH model."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal water-heating concept for event and operations hot-water loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal is technically possible, but the site’s hot-water load is not proven large enough to justify the system."
},
{
"inputKey": "collector_area_square_feet",
"value": 160,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Placeholder sizing for a small commercial solar thermal concept."
},
{
"inputKey": "domestic_hot_water_load_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No water-heating load data is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely needs load study and roof/structural review.",
"May be less realistic than heat pump water heating for this facility."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install workplace/visitor EV charging for staff, volunteers, and event visitors.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small Level 2 charging project is plausible for a nonprofit campus."
},
{
"inputKey": "charger_type",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Level 2 charging is more realistic than DC fast charging for staff, volunteers, and visitors at this site."
},
{
"inputKey": "charging_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four ports is a reasonable small campus installation."
},
{
"inputKey": "public_access",
"value": "limited_business_hours_or_event_access",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A nonprofit campus may support visitor and event access but is unlikely to operate as a 24/7 public charging hub without a specific plan."
},
{
"inputKey": "utility_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrical capacity is unknown and should be determined by contractor or utility review."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs site host agreement, charger model, port count, network status, and quote.",
"Public-access requirements may affect eligibility."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Four-port Level 2 charging installation serving staff, volunteers, and visitors.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Same realistic project scope as the generic EV charger installation record."
},
{
"inputKey": "level_2_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four ports is a reasonable scale for a 22,000 square foot nonprofit campus."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked chargers are common when visitor access, tracking, or grant reporting may be required."
},
{
"inputKey": "fleet_only_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The most plausible use is mixed staff, volunteer, and visitor charging, not a dedicated fleet-only depot."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need proof of parking control and site-host authorization.",
"Some EV programs require disadvantaged-community, public-access, or fleet-use documentation."
]
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"projectScopeSummary": "DC fast charging concept screened for relevance; not a realistic default project for this campus.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 4140000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small DC fast charger project would be expensive and is unlikely without a public charging business case."
},
{
"inputKey": "dcfc_ports",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One port is the smallest plausible DC fast charging concept."
},
{
"inputKey": "public_fast_charging_business_case_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No evidence indicates the site intends to operate public DC fast charging."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely ineligible or poor fit unless a public-access corridor, fleet, or community charging need is documented.",
"Would require utility interconnection and demand-charge analysis."
]
},
{
"retrofitTypeId": "electric_forklift_material_handling",
"projectScopeSummary": "Electric material-handling equipment for landscape, nursery, and operations support if the organization currently uses small fuel-powered equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 3200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The campus has operations functions, but a forklift or eligible material-handling fleet is not confirmed."
},
{
"inputKey": "equipment_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One electric forklift or compact material handler is the smallest realistic fleet project."
},
{
"inputKey": "existing_diesel_or_propane_equipment_to_replace",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Replacement eligibility usually requires proof of existing equipment, and none is supplied."
},
{
"inputKey": "fleet_owner",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The organization may operate vehicles or equipment, but ownership is not confirmed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate unless existing equipment ownership, replacement plan, and equipment class are confirmed.",
"Many transportation grants require scrappage, fleet documentation, or emission baseline evidence."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Battery storage concept for resilience during events, education programming, and operations.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost implies a substantial resilience project, but no critical-load study is supplied."
},
{
"inputKey": "battery_capacity_kwh",
"value": 120,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 120 kWh system is a plausible small commercial resilience battery for selected loads."
},
{
"inputKey": "battery_power_kw",
"value": 60,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Power sizing is a placeholder pending peak-load and critical-load data."
},
{
"inputKey": "paired_with_solar_pv",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not include a solar PV project or existing PV system."
},
{
"inputKey": "critical_loads_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No critical-load panel schedule or resilience plan is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Grant estimates should be suppressed unless a resilience need, paired renewable generation, or program-specific eligibility is documented.",
"Needs interconnection review and installed-cost quote."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Microgrid concept for campus resilience; not a realistic default grant project without a defined critical facility role.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A microgrid is technically possible but likely too complex and expensive for this exploratory profile."
},
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a community nonprofit facility but is not identified as an emergency shelter, public safety site, or critical infrastructure."
},
{
"inputKey": "microgrid_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No feasibility study or interconnection plan is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force qualification without critical-load, resilience, interconnection, and funding-program evidence.",
"Likely should remain a suppressed or exploratory opportunity."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage concept for demand management; unlikely default project for a 22,000 square foot nonprofit campus.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal storage is capital intensive and usually needs larger cooling loads or tariff-driven demand savings."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Placeholder value only; actual sizing would require interval demand data and cooling plant details."
},
{
"inputKey": "interval_demand_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case includes annual kWh and costs but not interval data."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Needs demand charges, cooling load profile, and engineering study.",
"Not a typical first-choice grant project for this customer."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump concept for deep HVAC decarbonization; possible but uncertain due to site constraints and cost.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost is low for a full ground-source retrofit, so this should be treated as a limited feasibility or partial-system placeholder."
},
{
"inputKey": "ground_loop_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No drilling, land availability, or geotechnical feasibility evidence is included."
},
{
"inputKey": "geothermal_capacity_tons",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity cannot be estimated reliably without a design study."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Needs feasibility study, site-control confirmation, and installed-cost quote.",
"Do not calculate as a normal HVAC replacement grant unless scope is confirmed."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP concept screened for relevance; not realistic for this office/education nonprofit campus because there is no large continuous thermal load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP would be unusually large and expensive for this facility type."
},
{
"inputKey": "continuous_thermal_load_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost exists, but no continuous process, hospital, pool, or industrial thermal load is identified."
},
{
"inputKey": "proposed_chp_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No CHP engineering scope should be inferred."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely unsuitable because the facility lacks a documented year-round thermal host load.",
"Should remain suppressed unless a detailed CHP feasibility study is provided."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy system screened for relevance; not realistic for this urban nonprofit campus.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The cost is a generic preview value, but there is no fuel supply, digester feedstock, or thermal host load in the profile."
},
{
"inputKey": "biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Urban forestry operations may generate woody debris, but that does not imply reliable permitted biomass fuel for energy generation."
},
{
"inputKey": "anaerobic_digester_feedstock_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is not a wastewater plant, landfill, farm, or food-waste digestion facility."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should be treated as not relevant unless the user provides a real biomass/biogas project plan.",
"Do not infer eligibility from general urban forestry activities."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind concept screened for relevance; not realistic for an urban Atlanta campus.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small wind is generally a poor fit for dense urban sites unless a site-specific wind study supports it."
},
{
"inputKey": "wind_resource_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind resource assessment is supplied."
},
{
"inputKey": "zoning_or_tower_approval_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No zoning approval or tower permit evidence is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Urban site conditions and permitting make this a poor default fit.",
"Should remain suppressed absent a wind study and permit pathway."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Small refrigeration efficiency upgrade for event support or volunteer operations, if refrigerated storage exists.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site may have event support or breakroom refrigeration, but no commercial refrigeration load is confirmed."
},
{
"inputKey": "refrigerated_cases_or_coolers_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Two small coolers is a conservative placeholder if the event/operations spaces include refrigeration."
},
{
"inputKey": "commercial_refrigeration_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building is not a grocery, restaurant, or cold-storage facility."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate unless actual eligible refrigeration equipment exists.",
"Office breakroom refrigerators normally should not drive commercial refrigeration incentives."
]
},
{
"retrofitTypeId": "refrigeration_ec_motor_retrofit",
"projectScopeSummary": "EC motor retrofit for small refrigeration equipment only if eligible evaporator/condenser fan motors are present.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 116400,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Possible only if the site has walk-in or reach-in commercial refrigeration, which is not confirmed."
},
{
"inputKey": "ec_motor_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Four motors is a small placeholder scope for one or two refrigeration units."
},
{
"inputKey": "eligible_refrigeration_motors_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not confirm commercial refrigeration."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress until actual eligible refrigeration equipment and motor counts are documented."
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
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied test case already suppresses this because the site is not a Washington solar manufacturing taxpayer."
}
],
"reasoning": "The Georgia nonprofit office/education site should not be matched to a Washington solar manufacturing tax workflow."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "ac_kw_capacity",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied test case already suppresses this because the Rhode Island renewable property-tax valuation workflow does not apply to a Georgia site."
}
],
"reasoning": "Out-of-state property-tax valuation workflows should remain suppressed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "approved_rerz_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied test case already marks the Michigan RERZ designation false for this Georgia site."
}
],
"reasoning": "Michigan Renewable Energy Renaissance Zone inputs are not relevant to this Georgia nonprofit facility."
},
{
"opportunityId": "GEORGIA_POWER_COMMERCIAL_ENERGY_EFFICIENCY_LIGHTING_OR_CUSTOM",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "electric_utility_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Georgia Power is identified as the electric utility."
},
{
"inputKey": "customer_class",
"value": "commercial_nonresidential",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Likely customer class for a nonprofit office/education campus, but rate schedule is missing."
},
{
"inputKey": "preapproval_required_before_installation",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Conservative handling for utility efficiency incentives at exploratory stage."
},
{
"inputKey": "preapproval_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval evidence is supplied."
}
],
"reasoning": "Likely relevant for lighting, HVAC, controls, and retro-commissioning, but calculation should require actual measure quantities, baseline/proposed efficiencies, and utility program status."
},
{
"opportunityId": "GEORGIA_POWER_COMMERCIAL_EV_CHARGING_OR_MAKE_READY",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "level_2_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four Level 2 ports is a realistic small workplace/visitor charging scope."
},
{
"inputKey": "public_access",
"value": "limited_business_hours_or_event_access",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site likely serves staff, volunteers, and visitors rather than 24/7 corridor charging."
},
{
"inputKey": "installed_cost_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Make-ready and electrical service costs are site-specific and not available."
},
{
"inputKey": "site_host_agreement_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership/site control is unknown."
}
],
"reasoning": "EV charging is plausible, but grant or rebate estimates should not be finalized without quote, port details, electrical scope, and site-host authority."
},
{
"opportunityId": "FEDERAL_ELECTIVE_PAY_CLEAN_ENERGY_TAX_CREDITS",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "applicant_is_tax_exempt_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile identifies a nonprofit organization and mostly exempt property-tax status."
},
{
"inputKey": "eligible_clean_energy_property_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile includes battery, geothermal, EV charging, and other concepts, but no selected tax-credit-eligible project scope is confirmed."
},
{
"inputKey": "placed_in_service_date",
"value": null,
"valueType": "date",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Project is exploratory and not installed."
},
{
"inputKey": "domestic_content_or_bonus_eligibility_documented",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No tax-credit bonus documentation is available."
}
],
"reasoning": "Relevant as a tax-credit/elective-pay workflow for a tax-exempt nonprofit, but not a grant estimate and not enough information exists to calculate."
},
{
"opportunityId": "EPA_OR_STATE_NONROAD_EQUIPMENT_REPLACEMENT_GRANT",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "existing_fleet_or_nonroad_equipment_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Operations activities are listed, but no eligible old diesel, propane, or gasoline equipment is documented."
},
{
"inputKey": "scrappage_or_replacement_requirement_met",
"value": null,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No replacement documentation is present."
}
],
"reasoning": "Electric material-handling or fleet projects should not calculate without evidence of owned equipment and program-specific replacement requirements."
},
{
"opportunityId": "WATER_EFFICIENCY_OR_STORMWATER_GREEN_INFRASTRUCTURE_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "landscape_or_irrigation_load_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description explicitly includes landscape water loads."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 1900000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual water/sewer cost is supplied."
},
{
"inputKey": "irrigation_meter_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Separate metering is unknown."
},
{
"inputKey": "proposed_water_measure_scope",
"value": null,
"valueType": "array",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No actual rainwater reuse, irrigation controls, fixture replacement, or stormwater project scope is supplied."
}
],
"reasoning": "Water-efficiency and landscape measures are plausible, but calculations should require a defined scope and meter/billing evidence."
},
{
"opportunityId": "USDA_REAP_OR_RURAL_ENERGY_PROGRAM",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is an urban-forestry nonprofit, not an agricultural producer."
},
{
"inputKey": "applicant_is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is in Atlanta, and the applicant is a nonprofit rather than a typical rural small business applicant."
}
],
"reasoning": "Do not infer rural/agricultural eligibility from forestry-related mission language."
},
{
"opportunityId": "PUBLIC_SECTOR_ONLY_ENERGY_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile identifies a nonprofit organization rather than a public entity."
}
],
"reasoning": "Programs limited to municipalities, counties, state agencies, or public schools should be suppressed for this profile."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "signed_vendor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "installed_cost_by_measure_cents",
"reason": "quote not available"
},
{
"inputKey": "utility_account_number",
"reason": "needs user decision"
},
{
"inputKey": "electric_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "gas_marketer_name",
"reason": "needs user decision"
},
{
"inputKey": "proof_of_ownership_or_site_control",
"reason": "needs user decision"
},
{
"inputKey": "landlord_or_owner_authorization",
"reason": "needs user decision"
},
{
"inputKey": "utility_preapproval_letter",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_id",
"reason": "application not submitted"
},
{
"inputKey": "agency_award_or_reservation_number",
"reason": "source requires agency approval"
},
{
"inputKey": "hvac_equipment_schedule",
"reason": "quote not available"
},
{
"inputKey": "lighting_existing_and_proposed_wattages",
"reason": "quote not available"
},
{
"inputKey": "ev_charger_make_model_network_provider",
"reason": "quote not available"
},
{
"inputKey": "electrical_service_capacity_and_make_ready_scope",
"reason": "quote not available"
},
{
"inputKey": "critical_load_study_for_battery_or_microgrid",
"reason": "needs user decision"
},
{
"inputKey": "solar_pv_system_size_kw",
"reason": "needs user decision"
},
{
"inputKey": "irrigation_meter_and_water_use_breakout",
"reason": "needs user decision"
},
{
"inputKey": "commercial_refrigeration_equipment_inventory",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_or_biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "public_fast_charging_business_case",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The customer is a Georgia nonprofit, not a public entity, public school, tribal government, rural small business, or agricultural producer unless the user later provides contrary documentation.",
"Ownership and site-control status are unknown, so capital-intensive measures should require owner or landlord authorization before firm grant estimates.",
"The project is exploratory and has no submitted applications, preapproval letters, vendor quotes, or selected equipment.",
"Water-efficiency work is plausible because landscape water loads are present, but no specific water project scope, irrigation meter, or measured water baseline is available.",
"Battery storage, microgrid, geothermal, CHP, biomass/biogas, small wind, DC fast charging, and refrigeration projects should not be forced into positive estimates without project-specific evidence.",
"Atlanta Gas Light being listed as gas provider should not be treated as a complete gas account record because Georgia gas service may involve a separate marketer.",
"Out-of-state DSIRE workflows and public-sector-only programs should remain suppressed for this Georgia nonprofit profile.",
"Education programming at the site should not be treated as school-district or public-school eligibility."
]
}

