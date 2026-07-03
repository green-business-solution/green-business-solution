{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "westin-pasadena",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-estimation enrichment for a full-service hotel and conference venue in Pasadena Water and Power territory. Existing test-case context indicates a 266,000-square-foot hospitality building with electric, gas, water, waste, lodging, food service, conference, laundry, and pool operations; uploaded prompt context cited here: . Assumptions intentionally avoid forcing positive grant outcomes where the site is not a school-bus site, public agency, nonprofit, disadvantaged-community community-charging applicant, agricultural producer, tribal entity, or residential customer.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied test case lists project.stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "budgeting_pre_rfp",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A hotel exploring multiple retrofit categories would commonly be collecting budgetary estimates rather than holding contractor bids for every measure."
},
{
"inputKey": "ownership_relationship",
"value": "unknown_or_operator_not_confirmed_owner",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile states ownershipStatus is Not sure and normalized ownershipRelationship is unknown."
},
{
"inputKey": "landlord_owner_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Major hotel capital projects such as HVAC plant replacement, rooftop solar, EV charging, and battery storage would normally require owner approval when ownership/control is not confirmed."
},
{
"inputKey": "customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The entity is a commercial hotel with large annual electric use in Pasadena Water and Power territory."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is modeled as a commercial business hotel, not a city, county, school district, or state agency."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer profile is a commercial hotel and does not indicate nonprofit status."
},
{
"inputKey": "is_school_or_school_district",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A hotel and conference venue is not a K-12 school, school district, or school-bus fleet site."
},
{
"inputKey": "owns_or_operates_school_buses",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No school-bus fleet activity is consistent with the stated hotel operations."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The business is hospitality and food service, not agricultural production."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test-case facts do not indicate tribal ownership or tribal-government status."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A full-service hotel may use vendor shuttles or valet operations, but the supplied facts do not indicate owned fleet vehicles."
},
{
"inputKey": "hosts_public_ev_charging",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "EV grant eligibility can change materially depending on whether charging is public, guest-only, valet-only, employee-only, or fleet-only."
},
{
"inputKey": "located_in_disadvantaged_or_low_income_community",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Several California EV and resilience programs may require mapped disadvantaged-community, low-income, priority-population, or corridor eligibility that is not included in the test case."
},
{
"inputKey": "utility_account_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized utility profile marks Pasadena Water and Power as self-reported and unverified."
},
{
"inputKey": "annual_kwh",
"value": 3990000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied siteEnergyProfile includes annualKwh of 3,990,000."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 83790000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied annual electric cost is $837,900, converted to cents."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 54862500,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied annual gas utility summary is $548,625, converted to cents."
},
{
"inputKey": "building_square_feet",
"value": 266000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied building square footage is 266,000."
},
{
"inputKey": "hotel_room_count",
"value": 350,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied publicSourceNotes describe a 350-room hotel."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Install guest and employee Level 2 charging in the hotel parking area; modeled as a modest hospitality amenity rather than a public corridor fast-charging site.",
"inputFacts": [
{
"inputKey": "charger_type",
"value": "level_2_ac",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 charging is a realistic amenity for hotel guests and employees."
},
{
"inputKey": "evse_port_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight ports is plausible for a 350-room hotel without assuming a major public charging depot."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hotels commonly use networked chargers for access control, guest billing, and uptime monitoring."
},
{
"inputKey": "public_access_level",
"value": "hotel_guest_and_employee_priority_public_access_not_confirmed",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Public-access status is a key grant condition and is not established by the test case."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview upfront cost for this modeled test fixture."
},
{
"inputKey": "utility_make_ready_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial parking-area EVSE usually requires panel capacity review, conduit, trenching, or make-ready work."
},
{
"inputKey": "utility_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A contractor or utility load study is needed before assuming whether a service upgrade is required."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for commercial EV infrastructure incentives if public-access, site-priority, uptime, and application-window conditions are met.",
"Should not be assumed eligible for school-bus, fleet-depot, or NEVI corridor fast-charging grants without a materially different project scope.",
"Quote and utility service data should be required before calculating any cost-based award."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Generic EV charging opportunity mapped to the same practical project as the Level 2 charger installation; not modeled as DC fast charging unless the user changes scope.",
"inputFacts": [
{
"inputKey": "ev_charging_scope",
"value": "level_2_guest_employee_amenity",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic hotel use case is guest and employee Level 2 charging rather than a high-power charging hub."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test-case project cost is far below a typical multi-stall DC fast-charging project, so DCFC should not be inferred."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the fixture's EV charger upfront cost."
},
{
"inputKey": "site_host_has_long_term_control",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Long-term site control is commonly required for infrastructure grants and is uncertain because ownership is unknown."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Commercial charger rebates may be plausible.",
"Competitive public-charging grants should remain suppressed unless public access, power level, uptime, site control, and corridor/community requirements are confirmed."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace selected aging packaged units, fan coils, or air-handling components serving guestrooms and meeting areas with higher-efficiency equipment during phased capital renewal.",
"inputFacts": [
{
"inputKey": "hvac_unit_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large hotel would have many HVAC assets; 12 is a conservative modeled phase rather than full-property replacement."
},
{
"inputKey": "project_phase",
"value": "phase_1_common_areas_and_selected_guestroom_floors",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hotels often phase disruptive HVAC work around occupancy and event schedules."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing modeled upfront cost from the retrofit preview."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 190000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A roughly 5% electric reduction is plausible for a partial HVAC efficiency phase but should be replaced by audit or M&V data."
},
{
"inputKey": "requires_engineering_study",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large hospitality HVAC retrofits require load review, controls integration, and phasing plans."
},
{
"inputKey": "quote_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case is exploratory and does not provide a contractor quote."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for commercial efficiency rebates if equipment efficiency and utility-account requirements are met.",
"Grant estimates should require equipment schedule, baseline equipment, efficiency ratings, and final quote."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Electrify a limited portion of space heating with heat-pump equipment, likely focused on common areas or selected zones rather than full hotel conversion.",
"inputFacts": [
{
"inputKey": "heat_pump_scope",
"value": "partial_electrification_selected_zones",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A full hotel conversion is complex; a partial project is more realistic at the supplied modeled cost."
},
{
"inputKey": "estimated_heat_pump_capacity_tons",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Eighty tons is a plausible partial scope for common areas, meeting spaces, or a guestroom wing, but not a full-property load estimate."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview upfront cost for this retrofit."
},
{
"inputKey": "existing_heating_fuel",
"value": "natural_gas_mixed_central_and_zone_equipment",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The large annual gas cost and hotel use profile imply substantial gas heating or hot-water loads."
},
{
"inputKey": "electrical_capacity_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Heat-pump electrification may require electrical distribution upgrades that are not known."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Potentially eligible for commercial electrification incentives, but not enough information exists for a final estimate.",
"Should require equipment ratings, displaced gas load, utility meter data, and electrical capacity review."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Pilot commercial heat-pump water heating for laundry, back-of-house, or a portion of domestic hot water rather than replacing the entire hotel hot-water plant.",
"inputFacts": [
{
"inputKey": "hpwh_scope",
"value": "partial_domestic_hot_water_or_laundry_pilot",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 350-room full-service hotel has large hot-water demand; the modeled cost is more consistent with a partial pilot."
},
{
"inputKey": "hpwh_system_capacity_kw",
"value": 60,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The value is a conservative synthetic sizing input for grant testing and should not be treated as an engineering design."
},
{
"inputKey": "storage_tank_gallons",
"value": 1500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Commercial HPWH retrofits commonly need storage; the exact tank configuration requires design."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the test fixture."
},
{
"inputKey": "engineering_design_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial HPWH sizing depends on hourly load profile, available space, ventilation, electrical capacity, and storage design."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for commercial heat-pump water-heating incentives if equipment and baseline conditions are eligible.",
"Calculation should be suppressed or labeled preliminary until design and quote data are available."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small lighting replacement package for remaining non-LED fixtures in back-of-house, meeting, or parking support areas.",
"inputFacts": [
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview explicitly assumes 12 fixture replacements."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing modeled upfront cost from the preview."
},
{
"inputKey": "annual_operating_hours",
"value": 4500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hotels have long operating hours, but the project is small and may be limited to common or service spaces."
},
{
"inputKey": "existing_fixture_wattage",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fixture-specific wattage is needed for a source-backed lighting calculation."
},
{
"inputKey": "replacement_fixture_wattage",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Replacement wattage and DLC/ENERGY STAR status are needed for most lighting incentives."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Small commercial lighting rebates may be plausible.",
"Some lighting programs may require preapproval before purchase and fixture eligibility documentation."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Add occupancy scheduling, dimming, or daylight controls in meeting rooms, corridors, and back-of-house areas.",
"inputFacts": [
{
"inputKey": "controlled_area_square_feet",
"value": 40000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A subset of conference, corridor, and back-of-house areas is more realistic than full-building controls replacement."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 132200,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the retrofit preview."
},
{
"inputKey": "control_strategy",
"value": [
"occupancy_sensors",
"scheduling",
"daylight_dimming_selected_areas"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are common hotel and conference-space lighting control measures."
},
{
"inputKey": "baseline_controls_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing controls are unknown and materially affect incremental savings."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May be rebate-eligible if controls are new, incremental, and preapproved.",
"Savings should remain preliminary without a lighting audit."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install behind-the-meter battery storage for demand management and short-duration resilience for selected critical hotel loads.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The annual electric load suggests meaningful demand, but peak kW is not provided; 250 kW is a conservative modeled storage power size."
},
{
"inputKey": "battery_energy_kwh",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 4-hour system is common for commercial demand management and resilience modeling."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the test fixture."
},
{
"inputKey": "critical_facility_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A hotel may provide shelter informally, but the test case does not indicate formal critical-facility designation."
},
{
"inputKey": "paired_with_solar",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Many storage grants and tax calculations depend on whether the battery is paired with renewable generation."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploratory and no interconnection filing is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Commercial storage may have incentive potential, but competitive resilience grants often prioritize public, critical, low-income, or community-serving facilities.",
"Do not calculate grant awards without resilience-program eligibility, quote, interconnection, and site-control facts."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Conceptual microgrid combining controls, storage, optional backup generation, and critical-load panels for resilience during outages.",
"inputFacts": [
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A microgrid scope would require a controller to coordinate islanding and assets."
},
{
"inputKey": "critical_load_kw",
"value": 300,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Modeled as selected life-safety, refrigeration, IT, elevators, and limited guest services, not full hotel load."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test fixture's modeled upfront cost."
},
{
"inputKey": "public_safety_resilience_role_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No documentation indicates the hotel is a designated emergency shelter, cooling center, or public safety facility."
},
{
"inputKey": "feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Microgrid grants typically require detailed feasibility, one-line diagrams, controls design, and resilience use case."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely suppressed for public-purpose resilience grants unless the hotel has a formal community resilience role.",
"Needs engineering and interconnection data before any formula-based estimate."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Evaluate chilled-water or ice-storage system to shift cooling load for conference and guestroom operations.",
"inputFacts": [
{
"inputKey": "storage_type",
"value": "chilled_water_or_ice_storage_not_selected",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The specific thermal storage design is not known."
},
{
"inputKey": "thermal_storage_ton_hours",
"value": 1200,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A medium commercial thermal-storage size is plausible for a hotel, but the value requires engineering confirmation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "cooling_plant_type_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal storage is only relevant if the hotel has a compatible central cooling plant or planned replacement."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This is plausible as an energy project but not clearly grant-eligible without demand-response, utility, or resilience program details.",
"Should remain a needs-project-scope item."
]
},
{
"retrofitTypeId": "cooling_tower_controls_optimization",
"projectScopeSummary": "Optimize cooling-tower controls, conductivity management, and water treatment setpoints for the hotel's cooling plant.",
"inputFacts": [
{
"inputKey": "cooling_tower_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large full-service hotel commonly has central cooling equipment, though this should be confirmed."
},
{
"inputKey": "cooling_tower_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Two towers is a plausible synthetic assumption for a property of this size."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 179600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "annual_water_savings_gallons",
"value": 900000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large hotels can have material cooling-tower water use, but savings require water-bill and cycles-of-concentration data."
},
{
"inputKey": "pre_project_water_treatment_report_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Water savings incentives usually need baseline and proposed operating parameters."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for local water-efficiency incentives if Pasadena water-provider program rules support it.",
"Should require water bills, tower specifications, and water treatment baseline before calculating savings."
]
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"projectScopeSummary": "Replace selected on-premise laundry washers or dryers with high-efficiency commercial equipment.",
"inputFacts": [
{
"inputKey": "laundry_on_premise",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case lists laundry operations as a primary activity."
},
{
"inputKey": "commercial_washer_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 350-room hotel can support several commercial washers; exact equipment count is unknown."
},
{
"inputKey": "commercial_dryer_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A paired washer/dryer replacement package is plausible for hotel laundry operations."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 307600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing modeled upfront cost."
},
{
"inputKey": "existing_equipment_spec_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Rebate calculations generally require baseline machine capacity, water factor, and replacement specifications."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for water or energy efficiency rebates if equipment meets commercial washer/dryer criteria.",
"Needs model numbers and invoice or quote before calculation."
]
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"projectScopeSummary": "Replace one high-temperature conveyor or door-type dishwasher serving hotel restaurant, banquet, and event operations.",
"inputFacts": [
{
"inputKey": "commercial_kitchen_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case lists food service, conferences, and events."
},
{
"inputKey": "dishwasher_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One major dishwasher replacement is plausible for a hotel kitchen retrofit package."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 254400,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "energy_star_or_cee_qualified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Equipment eligibility depends on the selected model."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Commercial food-service equipment rebates are plausible, but only with eligible equipment model data.",
"Suppress final estimate until model, fuel type, and quote are known."
]
},
{
"retrofitTypeId": "high_efficiency_fryer",
"projectScopeSummary": "Replace two gas fryers in the hotel kitchen with high-efficiency fryers.",
"inputFacts": [
{
"inputKey": "fryer_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two fryers is plausible for a full-service hotel kitchen but should be confirmed."
},
{
"inputKey": "existing_fuel_type",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The hotel has substantial gas cost and commercial kitchen operations."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 196200,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "selected_model_certification",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Food-service rebates often require ENERGY STAR or efficiency-list documentation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely rebate-eligible only if selected models meet program specifications.",
"Estimate should stay preliminary until equipment quote is entered."
]
},
{
"retrofitTypeId": "high_efficiency_oven",
"projectScopeSummary": "Replace one combination or convection oven used for restaurant and banquet operations.",
"inputFacts": [
{
"inputKey": "oven_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One oven replacement is a realistic discrete kitchen measure."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 260200,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "equipment_type",
"value": "combination_or_convection_oven_not_final",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The exact oven category affects rebate eligibility."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for commercial kitchen rebates if equipment class and efficiency rating match.",
"Requires model number and fuel type before calculation."
]
},
{
"retrofitTypeId": "high_efficiency_steamer",
"projectScopeSummary": "Replace one boilerless or high-efficiency steamer in the hotel kitchen.",
"inputFacts": [
{
"inputKey": "steamer_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One steamer is a plausible kitchen measure for banquet food preparation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 169600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "boilerless_steamer",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Water and energy incentive amounts can differ materially depending on steamer type."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Potential rebate eligibility depends on selected model and baseline equipment.",
"Do not finalize estimate without equipment specifications."
]
},
{
"retrofitTypeId": "induction_cooking_equipment",
"projectScopeSummary": "Add limited induction equipment for demonstration, banquet finishing, or selected cookline replacement.",
"inputFacts": [
{
"inputKey": "induction_unit_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A limited induction package is plausible without assuming full kitchen electrification."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 232800,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "replaces_existing_gas_equipment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrification incentive eligibility may depend on whether gas equipment is permanently replaced."
},
{
"inputKey": "electrical_panel_capacity_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Kitchen electrification requires electrical capacity review."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for electrification or food-service rebates, but only after replacement scope and electrical work are confirmed.",
"Do not assume fuel-switching grant eligibility if equipment is only supplemental."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Upgrade walk-in cooler/freezer evaporator fan controls, reach-in refrigerators, or selected refrigeration equipment serving kitchen and event operations.",
"inputFacts": [
{
"inputKey": "walk_in_cooler_or_freezer_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A full-service hotel kitchen and banquet operation commonly has walk-in refrigeration."
},
{
"inputKey": "refrigeration_equipment_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Six pieces of refrigeration equipment is a plausible partial retrofit package."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "equipment_model_numbers_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Refrigeration incentives require eligible model or measure details."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for commercial refrigeration rebates, not necessarily grants.",
"Requires model data, baseline condition, and quote."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Assess solar thermal preheat for domestic hot water, pool, or laundry loads.",
"inputFacts": [
{
"inputKey": "solar_thermal_collector_area_square_feet",
"value": 1200,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large hotel hot-water demand could support a sizable collector field, subject to roof area and structural constraints."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview upfront cost."
},
{
"inputKey": "roof_structural_capacity_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar thermal feasibility depends on roof area, shading, structural capacity, and mechanical-room integration."
},
{
"inputKey": "thermal_load_profile_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Accurate sizing needs hot-water, pool, and laundry load profiles."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Technically plausible, but the provided opportunity preview has no matched source-backed incentive calculation.",
"Should not force a positive grant estimate without a specific active program and engineering scope."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Potential CHP system serving domestic hot water, laundry, and hotel electrical base load.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The annual electric and gas use could support CHP screening, but hourly load profiles are missing."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP economics and eligibility depend on coincident thermal load and operating schedule."
},
{
"inputKey": "emissions_permitting_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Gas-fired CHP may require emissions and interconnection review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP is plausible for a hotel but may conflict with decarbonization-focused grant programs.",
"Do not show grant savings unless a specific CHP-eligible program and emissions compliance path are present."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Conceptual geothermal heat-pump screening only; dense downtown hotel site likely has major drilling, parking, and site-control constraints.",
"inputFacts": [
{
"inputKey": "geothermal_borefield_available_area_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Urban hotels often have limited open area for borefields, and no site plan is provided."
},
{
"inputKey": "estimated_borehole_count",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Borehole count requires load calculations and geotechnical design."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the fixture preview cost, but this is likely only a partial or placeholder amount for a property of this size."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not assume feasibility or qualification without site control, drilling feasibility, and engineered design.",
"Large hotel geothermal work is unlikely to be pursued at the preview cost without major additional scope."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not a realistic primary project for this hotel; food waste volume is unlikely to justify on-site biomass or biogas generation.",
"inputFacts": [
{
"inputKey": "onsite_biogas_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Hotel kitchen and organics waste would normally be hauled off-site, not used for an on-site biogas plant."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only as a test fixture; the project is not realistic for this customer."
},
{
"inputKey": "waste_interconnection_or_gas_cleanup_scope_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A biogas project would require feedstock, handling, gas cleanup, and utility interconnection scope that is absent."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely ineligible or not relevant for hotel-scale operations.",
"Suppress grant estimates unless user provides a real off-site feedstock or district energy project."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not a realistic project for a downtown Pasadena hotel due to urban wind, permitting, aesthetics, and structural constraints.",
"inputFacts": [
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind study is present, and urban hotel sites are rarely strong candidates for small wind."
},
{
"inputKey": "estimated_wind_capacity_kw",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "For grant-estimation testing, this should be treated as not pursued unless the user supplies a specific wind project."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Do not use the preview cost to generate an incentive for an unrealistic project."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not relevant for this profile under normal planning assumptions.",
"Suppress grant estimates."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Limited envelope improvements during guestroom or roof renovation, not a whole-building envelope reconstruction.",
"inputFacts": [
{
"inputKey": "insulated_area_square_feet",
"value": 20000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A targeted scope is more realistic than insulating the entire 266,000-square-foot property."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "existing_r_value_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Envelope incentive calculations require baseline and proposed assembly details."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Energy savings are plausible, but no source-backed matched incentive was included in the preview.",
"Should remain suppressed without audit or eligible program rules."
]
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"projectScopeSummary": "Apply solar-control window film or shading to sun-exposed guestroom, lobby, and meeting-space glazing.",
"inputFacts": [
{
"inputKey": "treated_window_area_square_feet",
"value": 15000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 266,000-square-foot hotel can plausibly have a targeted 15,000-square-foot window-film scope."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 127200,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled upfront cost from the preview."
},
{
"inputKey": "solar_heat_gain_coefficient_existing",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Baseline glazing performance is needed for a defensible incentive or savings estimate."
},
{
"inputKey": "solar_heat_gain_coefficient_proposed",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Proposed film specifications are not available."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for custom commercial efficiency rebates if savings are modeled and preapproved.",
"Formula estimates should require product specifications and baseline glazing data."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "Potential sustainability certification effort for market positioning, not an equipment retrofit with calculable utility savings.",
"inputFacts": [
{
"inputKey": "certification_type",
"value": "leed_existing_building_operations_and_maintenance_possible",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "LEED O+M would be the most plausible path for an operating hotel, but the test case does not state that certification is being pursued."
},
{
"inputKey": "certification_consultant_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Certification cost depends on consultant scope, registration fees, documentation effort, and target level."
},
{
"inputKey": "grant_calculation_supported",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview status is unsupported."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should not be treated as a grant-eligible energy retrofit unless a specific certification incentive exists.",
"Suppress standard savings preview."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "owns_or_operates_school_buses",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A hotel does not normally own or operate eligible school buses."
},
{
"inputKey": "school_bus_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a hospitality lodging property, not a school-bus depot or eligible school-bus charging site."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Do not calculate a positive grant amount for a program whose purpose does not match the customer profile."
}
],
"reasoning": "Although the generic EV charger retrofit matched the opportunity, this specific solicitation is for eligible school-bus sites. The Westin Pasadena profile is a commercial hotel without school-bus fleet facts, so the grant should be treated as likely ineligible or not relevant rather than calculated."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "project_is_nevi_corridor_dc_fast_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled project is guest/employee Level 2 charging, not a NEVI-style DC fast-charging corridor site."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No DC fast charging scope is present in the test case."
},
{
"inputKey": "public_access_24_7_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "NEVI-style funding generally requires public access and operational commitments; this is not established."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A qualifying NEVI project would need a separate DCFC scope and quote, not the Level 2 amenity budget."
}
],
"reasoning": "The hotel may be a commercial site host, but the modeled project does not look like a NEVI corridor/community DCFC project. Suppress any NEVI estimate unless the user confirms a public DC fast-charging scope, eligible location, site control, and application details."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "community_charging_public_access_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The hotel could theoretically host public community charging, but the current modeled scope prioritizes guests and employees."
},
{
"inputKey": "chargers_meet_program_power_and_uptime_requirements",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Program-specific technical requirements require equipment selection and site design."
},
{
"inputKey": "site_control_term_years",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership relationship is unknown and long-term site control should be confirmed before eligibility is calculated."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The eligible cost should not be assumed until project scope, public access, equipment, and installation quote are known."
}
],
"reasoning": "Community-charging eligibility cannot be determined from a generic hotel Level 2 charging scope. Keep this as needs_project_scope or needs_quote unless the user confirms a public community-charging project, site control, and qualifying equipment."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "final_contractor_quote_by_retrofit",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers_and_efficiency_ratings",
"reason": "needs user decision"
},
{
"inputKey": "utility_account_number_unmasked",
"reason": "needs user decision"
},
{
"inputKey": "pasadena_water_and_power_account_verification",
"reason": "source requires agency approval"
},
{
"inputKey": "ev_charging_public_access_commitment",
"reason": "needs user decision"
},
{
"inputKey": "ev_charging_site_control_agreement",
"reason": "needs user decision"
},
{
"inputKey": "ev_grant_application_submission_status",
"reason": "application not submitted"
},
{
"inputKey": "battery_storage_interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "microgrid_feasibility_study",
"reason": "quote not available"
},
{
"inputKey": "hvac_engineering_load_calculation",
"reason": "quote not available"
},
{
"inputKey": "heat_pump_water_heater_design",
"reason": "quote not available"
},
{
"inputKey": "solar_thermal_roof_structural_review",
"reason": "quote not available"
},
{
"inputKey": "geothermal_test_bore_report",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "school_bus_fleet_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "nonprofit_or_public_entity_documentation",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The site is a commercial hotel, not a public agency, nonprofit, school, tribal entity, agricultural producer, or residential property.",
"The matched RECESS school-bus charging opportunity should be suppressed because the customer is not a school-bus site.",
"NEVI or community-charging grants should not be calculated from a small guest/employee Level 2 amenity project without public DCFC/community-charging scope confirmation.",
"Ownership and long-term site control are unknown, which should block or lower confidence for capital-intensive grants.",
"Battery storage and microgrid projects may be technically plausible but should not be assumed eligible for public-purpose resilience grants without critical-facility or community-resilience documentation.",
"Small wind, biomass/biogas, and geothermal are not realistic default projects for this downtown hotel without major additional user-provided scope.",
"Food-service, laundry, lighting, HVAC, and water-efficiency measures are plausible commercial rebate candidates, but grant estimates should require equipment specifications, baseline conditions, and quotes before final calculation.",
"Do not convert every matched retrofit preview into a positive grant amount; some previews exist for discovery coverage rather than real-world eligibility."
]
}

