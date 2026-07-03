{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "santa-clara-university-campus",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied test-case facts for Santa Clara University: nonprofit education campus, owner-controlled site, Silicon Valley Power electric service, PG&E gas service, 3,210,000 sq ft campus scale, and modeled annual utility use. Public-source research was not used for grant formula validation. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "applicant_is_nonprofit_501c3_or_equivalent",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the organization as a nonprofit organization."
},
{
"inputKey": "applicant_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Santa Clara University is modeled as a private nonprofit university, not a city, county, state, school district, or other public agency."
},
{
"inputKey": "applicant_is_k12_school_or_school_district",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "NAICS 611310 and the activity description indicate higher education rather than K-12 education."
},
{
"inputKey": "applicant_is_higher_education_institution",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a university campus with higher education, research, housing, athletics, and administration uses."
},
{
"inputKey": "site_is_in_silicon_valley_power_electric_territory",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case self-reports Silicon Valley Power as the electric utility, but verification remains self-reported and unverified."
},
{
"inputKey": "site_is_pg_and_e_gas_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form identifies PG&E as the gas utility provider. Use PG&E only for gas-side eligibility."
},
{
"inputKey": "site_ownership_or_long_term_control",
"value": "owner_controlled_campus",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site ownership status is Own, so landlord consent should not normally block permanent building measures."
},
{
"inputKey": "campus_square_feet",
"value": 3210000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The normalized profile parsed the 3,210,000 sq ft source-form value."
},
{
"inputKey": "customer_class",
"value": "commercial_nonprofit_education_campus",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large private university campus would normally be treated as a nonresidential commercial/institutional utility customer rather than residential."
},
{
"inputKey": "annual_site_kwh",
"value": 38520000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case already provides annual kWh in the site energy profile."
},
{
"inputKey": "annual_site_therms",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas cost is provided, but annual therms are not populated; gas-side savings and electrification estimates should use confirmed therm data or bills."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The current project stage is explicitly set to exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_rfp_scope_development",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a large campus at the exploring stage, it is realistic that project scopes exist but vendor quotes, board approvals, and final budgets are not yet complete."
},
{
"inputKey": "preapproval_submitted_for_any_grant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application, reservation, award, or preapproval fact is present in the test case."
},
{
"inputKey": "has_recent_ashrae_level_2_audit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A campus may have studies and energy plans, but this test case does not provide a dated ASHRAE audit; formulas requiring audit findings should remain suppressed or ask for documentation."
},
{
"inputKey": "campus_has_student_housing",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity text includes student housing."
},
{
"inputKey": "site_serves_low_income_households_for_liheap",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A university campus is not normally a household-energy-assistance recipient; campus weatherization should not be forced into LIHEAP eligibility."
},
{
"inputKey": "applicant_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a higher education campus, not an agricultural producer."
},
{
"inputKey": "applicant_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, governance, or tribal entity facts appear in the test case."
},
{
"inputKey": "fleet_owner_or_site_host_for_ev_charging",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large university campus plausibly operates fleet vehicles and hosts parking facilities where public, workplace, student, or fleet charging could be installed."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Targeted replacement of aging packaged rooftop units, air handlers, and related controls in administrative, classroom, and student-service buildings, focused on electric efficiency rather than full campus central-plant replacement.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 79800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost as a realistic placeholder for a modest first-phase HVAC efficiency package."
},
{
"inputKey": "hvac_units_replaced_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The opportunity count is 6; for a multi-building campus this is a plausible first-phase unit count rather than full-campus replacement."
},
{
"inputKey": "equipment_type",
"value": "high_efficiency_packaged_rooftop_units_and_air_handlers",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A mixed university campus would commonly include packaged rooftop equipment and air handlers serving nonresidential spaces."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 710000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A roughly 1.8% whole-campus electric reduction is plausible for a targeted HVAC phase, but should be replaced by modeled or measured savings."
},
{
"inputKey": "preapproval_required_before_purchase",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Utility efficiency grants commonly require preapproval before equipment purchase or installation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Requires confirmed SVP account eligibility and customer class.",
"Requires itemized quote, baseline equipment, efficiency ratings, and preapproval status.",
"Custom savings may need engineering review."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small pilot LED replacement package for interior common areas and selected exterior/circulation fixtures, not a comprehensive campus relamp.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 16042500,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for the first lighting phase."
},
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary explicitly notes that the LED preview assumes 12 fixture replacements."
},
{
"inputKey": "fixture_type",
"value": "interior_exterior_led_luminaires",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A campus lighting pilot would likely include a mix of interior and exterior luminaires."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 16500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small 12-fixture pilot should have modest campus-level savings; exact savings need fixture wattages and operating hours."
},
{
"inputKey": "existing_fixture_wattage_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing fixture wattages are not provided, so lighting incentive formulas requiring delta watts should ask for quote or audit detail."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely eligible under nonprofit energy-efficiency programs if SVP customer and preapproval requirements are met.",
"Savings and incentive amount should be suppressed if fixture wattage, quantity, and operating hours are required but missing."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Selective envelope sealing and door/window infiltration repairs in older classroom, residence, and administrative buildings rather than residential household weatherization.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 19460000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for a limited envelope improvement package."
},
{
"inputKey": "treated_floor_area_sqft",
"value": 85000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Treating about 2.6% of campus floor area is realistic for a first-phase weatherization scope across selected buildings."
},
{
"inputKey": "building_envelope_measure_type",
"value": "air_sealing_weatherstripping_door_sweeps_and_minor_envelope_repairs",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are common low-disruption measures for an occupied campus."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 42000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electric savings are modest because the scope is selective and some heating savings may be gas-side."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual therms and modeled gas savings are not provided, so gas-side benefits should remain unknown."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for utility nonprofit energy-efficiency support if custom savings documentation is accepted.",
"Should not be treated as LIHEAP household weatherization for a university campus.",
"Gas savings require PG&E gas-side program and bill data."
]
},
{
"retrofitTypeId": "energy_management_system",
"projectScopeSummary": "Campus building automation and energy-management expansion for scheduling, trend logging, demand management, and optimization across selected high-use buildings.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 25440000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost as a targeted controls package."
},
{
"inputKey": "controlled_floor_area_sqft",
"value": 425000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controlling roughly 13% of campus area is plausible for a first phase covering selected buildings."
},
{
"inputKey": "ems_measure_type",
"value": "building_automation_optimization_scheduling_and_metering",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controls, scheduling, and metering are common campus energy-management measures."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 520000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "About 1.35% annual electric savings is conservative for a targeted controls optimization phase but needs measurement and verification."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No M&V plan is provided; custom controls incentives often need this before calculation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely needs engineering calculation package or M&V plan.",
"May be custom rather than prescriptive."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Electrification of heating and cooling for one selected building or wing using commercial heat-pump HVAC, avoiding full-campus conversion at this stage.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 117200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost as a single-building electrification pilot."
},
{
"inputKey": "heat_pump_system_capacity_tons",
"value": 180,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 180-ton pilot is plausible for a significant campus building but requires design documents."
},
{
"inputKey": "existing_heating_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The campus has substantial gas cost and PG&E gas service."
},
{
"inputKey": "estimated_annual_therm_reduction",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual therms and building-level baseline heating loads are not provided."
},
{
"inputKey": "estimated_incremental_annual_kwh",
"value": 390000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heat-pump electrification may increase electricity while reducing gas; exact load impact needs design modeling."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Electrification incentives should require gas baseline and design sizing.",
"May not fit electric-only efficiency formulas if net kWh increases.",
"Requires project quote and preapproval."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Heat-pump water heater pilot serving one dining, recreation, or residence-life hot-water load rather than campus-wide domestic hot water conversion.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 35000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for a commercial heat-pump water-heating pilot."
},
{
"inputKey": "heat_pump_water_heater_units_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The opportunity count is 1, consistent with a single pilot plant or skid."
},
{
"inputKey": "storage_volume_gallons",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large commercial pilot could use approximately 1,000 gallons of storage, but quote data is needed."
},
{
"inputKey": "serves_multifamily_or_student_housing_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The campus includes student housing, which may have domestic hot-water loads."
},
{
"inputKey": "estimated_annual_therm_reduction",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas baseline and water-heating load are unknown."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely needs gas baseline and equipment specifications.",
"May be treated differently if serving student housing versus commercial dining or athletic facilities."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Campus EV charging expansion for fleet, employee, student, visitor, and event parking, with a mix of Level 2 ports and a small DC fast-charging component.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 84800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for a multi-port campus charging package."
},
{
"inputKey": "level_2_ports_count",
"value": 24,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large campus parking program could reasonably install two dozen Level 2 ports in an initial phase."
},
{
"inputKey": "dc_fast_charger_ports_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small DC fast-charging component is plausible for fleet, visitor, or corridor-facing charging, but may not meet corridor grant requirements without site details."
},
{
"inputKey": "evse_site_host_type",
"value": "university_campus_parking",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Campus parking is a realistic host location for EVSE."
},
{
"inputKey": "public_access_hours_per_day",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Some campus chargers may be publicly accessible, but access may be limited by parking permits, gates, event rules, or campus policy."
},
{
"inputKey": "chargers_are_near_nevi_corridor",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "NEVI-style eligibility typically depends on corridor and site-location criteria not included in the test case."
},
{
"inputKey": "fleet_electrification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not provide a campus fleet transition plan."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"General EV charging grants may be plausible.",
"NEVI or corridor-focused awards should remain uncertain unless site access, corridor proximity, charger power, and uptime requirements are confirmed.",
"CEC solicitation fit may require outreach, messaging, equity, or hub-specific scope beyond campus workplace charging."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery energy storage for resilience, peak-demand management, and integration with existing or future campus solar resources.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 728000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for a significant but not campus-wide storage deployment."
},
{
"inputKey": "battery_power_kw",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 1 MW battery is plausible for a campus with 38.52 million annual kWh."
},
{
"inputKey": "battery_energy_kwh",
"value": 4000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 4-hour 1 MW system is a common storage sizing concept for demand management and resilience."
},
{
"inputKey": "paired_with_new_solar_pv",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The storage project is modeled separately from the solar PV opportunity unless the user confirms a paired system."
},
{
"inputKey": "critical_facility_resilience_use_case",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A campus may reasonably prioritize resilience for emergency operations, IT, labs, housing, or dining."
},
{
"inputKey": "confirmed_interconnection_application_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No interconnection status is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need separate resilience, SGIP, interconnection, or utility program evidence.",
"Should suppress estimates requiring confirmed critical-facility, equity, fire-safety, or interconnection status."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Rooftop and canopy solar PV planning allowance for selected campus buildings and parking areas, not a full offset of campus electric load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1000000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for a sizable campus PV package."
},
{
"inputKey": "solar_pv_system_kw_dc",
"value": 2500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2.5 MWdc solar project is large but plausible for a 3.21 million sq ft campus with high annual consumption."
},
{
"inputKey": "estimated_annual_kwh_generation",
"value": 3900000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 1,560 kWh/kW-year for Santa Clara-area planning only; final production requires a PV design model."
},
{
"inputKey": "project_includes_battery_storage",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar and battery are modeled as separate opportunities unless a combined project is confirmed."
},
{
"inputKey": "tax_credit_direct_pay_applicant",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A nonprofit campus may be relevant for elective-pay tax-credit modeling, but this is not a grant estimate and should not be forced into grant outputs."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Rooftop solar may qualify for tax credits or financing incentives rather than grant programs.",
"Grant estimates should not be created unless a source-backed solar grant rule exists.",
"Interconnection and net-billing assumptions are missing."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Conceptual geothermal feasibility study for a new or major-renovation building, not a committed campus-wide borefield or heat-pump conversion.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 157600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost, but actual geothermal implementation would likely be much larger if campus-wide."
},
{
"inputKey": "geothermal_scope_type",
"value": "feasibility_and_single_building_pilot",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "At exploring stage, a feasibility or pilot scope is more realistic than a full campus geothermal conversion."
},
{
"inputKey": "planned_boreholes_count",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Borefield sizing cannot be estimated from the provided profile."
},
{
"inputKey": "geotechnical_or_thermal_conductivity_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No site geology, test bore, or design study is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should remain a planning or needs-scope item unless a geothermal-specific grant rule exists.",
"Needs engineering study and major capital approval."
]
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"projectScopeSummary": "Campus restroom and residence-life fixture replacements for water conservation, focused on aerators, flush valves, showerheads, and selected toilets.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 11640000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for a limited water-efficiency package."
},
{
"inputKey": "low_flow_fixture_count",
"value": 320,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A campus with housing, dining, athletics, and classrooms could reasonably have hundreds of target fixtures, but inventory data is absent."
},
{
"inputKey": "annual_water_use",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The available field list includes annual water use, but no value is populated."
},
{
"inputKey": "water_provider",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The latest utility provider field reflects waste, not water service."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"No matched source-backed water grant is present in the test case.",
"Water rebate calculations should require water provider, fixture inventory, and baseline flow rates."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Conceptual solar thermal water-heating system for a high-domestic-hot-water building such as athletics, dining, or student housing.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 68000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for a solar thermal concept."
},
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": 2500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A mid-sized commercial solar thermal array is plausible, but detailed load and roof suitability are unknown."
},
{
"inputKey": "serves_high_hot_water_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Student housing, dining, and athletics create plausible hot-water loads."
},
{
"inputKey": "baseline_water_heating_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The campus has gas service, but the specific water-heating baseline is not provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"No matched source-backed grant is present in the test case.",
"Requires hot-water load, roof suitability, and baseline fuel details."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not a realistic near-term project for this campus; possible only as a research demonstration using dining waste, wastewater, or partner feedstock.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 900000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost but does not imply the campus has adequate feedstock or grant eligibility."
},
{
"inputKey": "reliable_biogas_or_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A university campus typically would not have enough controlled organic feedstock for a standalone biomass or biogas power system."
},
{
"inputKey": "system_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "needs_project_scope",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity cannot be inferred without feedstock and technology selection."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should be suppressed unless the user confirms a real feedstock source, technology partner, and project scope.",
"Potentially a research demonstration, not a standard campus retrofit."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Potential central-plant resilience concept, but not modeled as a preferred decarbonization retrofit for this grant-profile test case.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1200000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost but should not create unsupported grant savings."
},
{
"inputKey": "chp_system_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "needs_project_scope",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP sizing depends on thermal and electric load profiles not provided in the test case."
},
{
"inputKey": "fossil_fuel_chp",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Most conventional CHP would use natural gas, which may conflict with decarbonization-oriented grant programs."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No hourly thermal-load data is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"No source-backed grant match is present.",
"Could be disfavored by electrification or decarbonization programs unless renewable fuel or resilience criteria are met."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Selective insulation improvements in older roofs, walls, or mechanical rooms, likely bundled with envelope work rather than a standalone campus-wide project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 31600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost for a limited insulation upgrade."
},
{
"inputKey": "treated_area_sqft",
"value": 60000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited scope across selected buildings is more realistic than full-campus insulation work."
},
{
"inputKey": "existing_r_value_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing and proposed R-values are not provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"No matched source-backed grant is present in the test case.",
"Could be bundled under SVP-style energy efficiency only if custom savings and eligible scope are confirmed."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not a realistic campus retrofit at this urban Silicon Valley university site; included as a negative-control renewable project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 800000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case preview cost but should not drive a grant estimate."
},
{
"inputKey": "wind_resource_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind resource study, tower location, permitting path, or interconnection details are provided."
},
{
"inputKey": "urban_campus_siting_constraint",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An urban campus would face siting, setback, noise, aesthetics, and wind-resource constraints."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as likely unrealistic for this customer unless user supplies a specific permitted site and resource study.",
"Suppress grant estimates where formulas require confirmed installed capacity or production."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "Sustainability certification support for a major renovation or new building, not an energy-saving retrofit by itself.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Certification costs depend on project size, rating system, consultant scope, and registration/certification fees."
},
{
"inputKey": "certification_target",
"value": "LEED Silver or Gold",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A university may pursue LEED certification, but no specific building or rating target is provided."
},
{
"inputKey": "new_construction_or_major_renovation_project_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case does not identify a specific construction project."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Certification alone should not trigger utility energy-efficiency grant savings.",
"Requires a specific building project and certification budget."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "svp_customer_account_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case identifies Silicon Valley Power as the self-reported electric provider, but account verification is still unverified."
},
{
"inputKey": "applicant_type_for_svp_nonprofit_grant",
"value": "nonprofit_higher_education",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is modeled as a nonprofit university."
},
{
"inputKey": "svp_eligible_measures",
"value": [
"high_efficiency_hvac_replacement",
"led_lighting_retrofit",
"air_sealing_weatherization",
"energy_management_system"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are the most plausible electric energy-efficiency measures in the profile."
},
{
"inputKey": "itemized_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is at exploring/pre-RFP stage; no vendor quotes are provided."
},
{
"inputKey": "svp_preapproval_or_reservation_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application, reservation, or approval record is supplied."
},
{
"inputKey": "estimated_total_svp_eligible_cost_cents",
"value": 140742500,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Sum of the modeled first-phase HVAC, LED, air sealing, and EMS preview costs; use only as a placeholder until quote data is available."
}
],
"reasoning": "The nonprofit campus and SVP territory facts make the match plausible, but a real estimate should require SVP account validation, preapproval status, itemized quotes, eligible measure confirmation, and savings documentation."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "ev_home_scope_is_more_than_campus_workplace_charging",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile includes campus EV charging, but the solicitation name suggests outreach, messaging, hub, or equipment requirements that may not be satisfied by ordinary campus charging."
},
{
"inputKey": "evse_total_ports",
"value": 26,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Modeled as 24 Level 2 ports plus 2 DC fast-charging ports."
},
{
"inputKey": "evse_public_or_shared_access_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Campus access rules, parking restrictions, and public availability are unknown."
},
{
"inputKey": "evse_itemized_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No EVSE quote, utility make-ready estimate, or site-design budget is provided."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application status is provided."
}
],
"reasoning": "The EV charging project is plausible, but this specific CEC opportunity should not calculate a grant estimate until the scope is confirmed to match solicitation requirements."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "nevi_corridor_site_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not show that the campus site is on, near, or eligible for a NEVI alternative-fuel corridor location."
},
{
"inputKey": "minimum_dc_fast_charging_power_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No charger power rating, site electrical capacity, or make-ready design is provided."
},
{
"inputKey": "twenty_four_seven_public_access_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Campus parking is often subject to permit, security, event, and operating restrictions; the placeholder assumes 12 hours/day public access, not 24/7."
},
{
"inputKey": "evse_project_cost_cents",
"value": 84800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the modeled EVSE preview cost as a planning placeholder only."
}
],
"reasoning": "NEVI-style grant estimates should be suppressed because the project lacks corridor proximity, public access, charging power, uptime, and site-design evidence."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_household_or_household_assistance_provider_for_liheap",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A private university campus is not itself a low-income household seeking energy assistance."
},
{
"inputKey": "weatherization_scope_serves_liheap_eligible_households",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled air sealing scope serves campus buildings, not household weatherization recipients."
},
{
"inputKey": "student_housing_low_income_household_documentation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Student housing exists, but no household-income eligibility or LIHEAP delivery role is documented."
}
],
"reasoning": "Do not force LIHEAP qualification for an education campus. This match should be marked likely ineligible or not relevant unless the customer provides a specific eligible household-assistance program role."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "itemized_vendor_quotes_by_measure",
"reason": "quote not available"
},
{
"inputKey": "grant_preapproval_or_reservation_numbers",
"reason": "application not submitted"
},
{
"inputKey": "svp_account_number_or_bill_image",
"reason": "needs user decision"
},
{
"inputKey": "annual_therms",
"reason": "needs user decision"
},
{
"inputKey": "building_level_energy_audit_or_calculation_package",
"reason": "quote not available"
},
{
"inputKey": "existing_and_proposed_equipment_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "lighting_fixture_schedule_existing_and_proposed_wattages",
"reason": "quote not available"
},
{
"inputKey": "ems_measurement_and_verification_plan",
"reason": "source requires agency approval"
},
{
"inputKey": "ev_charger_make_ready_utility_design",
"reason": "quote not available"
},
{
"inputKey": "ev_charging_public_access_and_pricing_policy",
"reason": "needs user decision"
},
{
"inputKey": "nevi_corridor_distance_and_site_compliance_package",
"reason": "source requires agency approval"
},
{
"inputKey": "geothermal_test_bore_or_thermal_conductivity_report",
"reason": "quote not available"
},
{
"inputKey": "solar_pv_interconnection_application_status",
"reason": "application not submitted"
},
{
"inputKey": "battery_storage_interconnection_and_fire_review_status",
"reason": "source requires agency approval"
},
{
"inputKey": "biomass_or_biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_study_and_permit_path",
"reason": "unrealistic for this customer"
},
{
"inputKey": "leed_certification_building_project_budget",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"Do not treat the university as a public entity or K-12 school district solely because it is an education campus.",
"Do not treat student housing as broad residential household eligibility for LIHEAP or residential-only rebates unless a program explicitly covers dormitories or higher-education housing.",
"Do not calculate NEVI funding without corridor, public-access, charger-power, uptime, and site-compliance evidence.",
"Do not calculate SVP nonprofit energy-efficiency funding without account verification, preapproval status, itemized quote data, and eligible measure details.",
"Do not create grant estimates for solar PV solely from campus size; solar may be better modeled as tax credit, elective-pay, financing, or utility interconnection rather than a grant unless a source-backed grant rule exists.",
"Do not force geothermal, biomass/biogas, CHP, or small wind qualification without project-specific feasibility, design, and eligibility evidence.",
"Do not use the synthetic preview costs as confirmed eligible costs where the grant formula requires a vendor quote, paid invoice, or administrator-approved eligible-cost determination.",
"Do not infer disadvantaged-community, low-income, tribal, agricultural, or public-agency status from the nonprofit university profile."
]
}

