{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "austin-central-library",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for a municipal public library owned by the City of Austin, located in Austin Energy territory with large civic, public assembly, cafe, parking, IT, and event loads. Inputs are intended to support grant-estimation tests and should not be treated as grant eligibility research. Cites uploaded prompt context: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_is_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies the applicant as Government / Public Agency and the facility as a municipal public library."
},
{
"inputKey": "organization_is_municipality_or_municipal_department",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Austin Central Library is presented as a municipal public library owned by the public agency."
},
{
"inputKey": "organization_is_nonprofit_501c3",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is modeled as a municipal public agency rather than a separate charitable nonprofit."
},
{
"inputKey": "organization_is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building provides public library and civic services, not K-12, higher education, or campus instruction."
},
{
"inputKey": "organization_is_state_agency",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is local municipal government rather than a Texas state agency."
},
{
"inputKey": "organization_is_federal_agency",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is a local Austin public library, not a federal building."
},
{
"inputKey": "organization_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, tribal jurisdiction, or tribal applicant facts are present in the supplied profile."
},
{
"inputKey": "organization_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is a public library and civic building, not an agricultural operation."
},
{
"inputKey": "organization_is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A municipal library in downtown Austin is not a rural small business."
},
{
"inputKey": "site_is_low_income_multifamily_housing",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a public institution, not a multifamily residential property."
},
{
"inputKey": "site_is_publicly_owned_building",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile states ownership status is Own and identifies the applicant as a municipal public agency."
},
{
"inputKey": "site_has_public_assembly_loads",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied description includes civic events, event loads, and public assembly."
},
{
"inputKey": "site_has_commercial_kitchen_or_cafe_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied description includes a cafe; the scale of food-service equipment remains synthetic."
},
{
"inputKey": "site_has_public_parking_garage_or_parking_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied description includes parking loads, consistent with EV charging and ventilation-control test inputs."
},
{
"inputKey": "site_has_data_it_server_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied description includes community technology access and IT loads."
},
{
"inputKey": "electric_customer_class",
"value": "commercial_public_institution_large",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 198,210-square-foot municipal library with 5.775 million annual kWh would normally be served as a large nonresidential/public institutional account."
},
{
"inputKey": "utility_account_in_good_standing",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Many utility rebate programs require active service and account standing, but the supplied test case does not include account status."
},
{
"inputKey": "energy_audit_completed_within_24_months",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is at exploring stage, so a current investment-grade audit should not be assumed."
},
{
"inputKey": "energy_audit_required_before_large_measure_application",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large HVAC, controls, and envelope projects typically need audit or engineering documentation before rebate or grant calculation."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied sourceForm project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_rfq",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage municipal projects normally precede formal quote collection, council authorization, and purchase orders."
},
{
"inputKey": "capital_budget_approved",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No approved capital budget, board/council action, or procurement record is present; leave estimates dependent on later confirmation."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At exploring stage, no application should be assumed submitted."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility or agency preapproval is present in the supplied profile."
},
{
"inputKey": "purchase_order_issued",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is modeled before procurement, so equipment should not be marked ordered."
},
{
"inputKey": "construction_started",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage retrofit work has not started; this matters for programs requiring preapproval before installation."
},
{
"inputKey": "prevailing_wage_or_public_procurement_constraints_apply",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Municipal capital work commonly requires public procurement and wage/compliance review."
},
{
"inputKey": "can_accept_tax_credit_direct_pay_or_transfer",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The applicant is tax-exempt, but direct-pay or transfer treatment depends on the specific incentive, ownership structure, timing, and filing capacity."
},
{
"inputKey": "third_party_ownership_or_ppa_under_consideration",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Renewable and battery incentives may change materially if solar, storage, or CHP is owned by a third party."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Targeted LED and lighting-controls upgrade for remaining back-of-house, meeting room, garage, and specialty fixtures rather than a full-building relight.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for a small targeted lighting fixture replacement."
},
{
"inputKey": "fixture_count_replaced",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview assumption and keeps the scope intentionally small for a modern public building."
},
{
"inputKey": "lighting_controls_added",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy/daylight controls are realistic for library meeting rooms and low-use back-of-house areas."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 9400,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic savings are conservative for 12 fixtures and controls in a high-hour civic facility."
},
{
"inputKey": "utility_preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial lighting rebates commonly require program reservation or preapproval before installation."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote has been supplied; exact fixture types and labor cost should remain quote-dependent."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Small project size may fall below minimum incentive thresholds for some grant programs.",
"Utility rebate calculation should wait for fixture wattages, operating hours, and preapproval status."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Phased replacement of selected aging rooftop/air-handling components serving high-occupancy meeting rooms, library floors, and event areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost as a small HVAC pilot or partial replacement package, not a whole-building HVAC replacement."
},
{
"inputKey": "hvac_units_replaced",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited set of three packaged or split-system units is plausible for the preview cost, but equipment inventory is unknown."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 45,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic partial-scope capacity for selected zones; the full building would have much larger HVAC capacity."
},
{
"inputKey": "selected_equipment_type",
"value": "high_efficiency_air_cooled_variable_speed_dx_or_split_system",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A conservative equipment class for nonresidential HVAC replacement where exact mechanical system details are missing."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 46500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic savings equal less than 1 percent of annual site electricity, appropriate for a partial HVAC scope."
},
{
"inputKey": "existing_equipment_operational",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This is modeled as planned replacement, not emergency replacement; emergency work would often be ineligible for preapproval-based incentives."
},
{
"inputKey": "ahu_or_rooftop_equipment_schedule_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Grant or rebate calculations often need nameplate and baseline equipment data."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment quote or engineering estimate is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on equipment efficiency ratings, baseline replacement condition, and utility program preapproval.",
"The preview cost appears too small for a whole-building HVAC retrofit at this building size, so estimates should treat this as partial scope."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Partial electrification or high-efficiency heat pump conversion for selected zones such as offices, meeting suites, or cafe-adjacent spaces.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost as a limited heat pump retrofit scope."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 30,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Partial-zone capacity is plausible for the preview budget; full-building electrification would be far larger."
},
{
"inputKey": "existing_heating_fuel",
"value": "natural_gas_and_electric_mixed",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes Texas Gas Service costs and significant electricity consumption."
},
{
"inputKey": "estimated_annual_gas_therm_reduction",
"value": 6200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative partial-scope gas reduction for selected heat pump conversion zones."
},
{
"inputKey": "estimated_annual_electric_kwh_increase",
"value": 48500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrification can reduce gas while increasing electric consumption; this should be modeled explicitly."
},
{
"inputKey": "electrical_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrical capacity must be confirmed before electrification incentives are calculated."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote, model number, or engineering scope is available."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some programs may require all-electric equipment, specific COP/HSPF/IEER ratings, or evidence of gas displacement.",
"Net utility savings are uncertain because electricity use may rise."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Early feasibility study for ground-source heat pump service to a limited portion of the library rather than immediate installation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost but treats the scope as a feasibility/pilot-scale package, not a full geothermal conversion."
},
{
"inputKey": "geothermal_scope_type",
"value": "feasibility_study_and_pilot_design",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A downtown civic building with constrained site area would normally need feasibility work before a ground-loop project."
},
{
"inputKey": "ground_loop_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Vertical bore, horizontal loop, open loop, and district loop assumptions cannot be inferred from the test case."
},
{
"inputKey": "site_area_available_for_borefield_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A downtown library site may have limited available ground area; the actual usable borefield area is unknown."
},
{
"inputKey": "geotechnical_or_borefield_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At exploring stage, no geotechnical or borefield assessment should be assumed."
},
{
"inputKey": "formal_engineering_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A geothermal estimate requires engineering and drilling assumptions not supplied here."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Installation incentives should be suppressed until feasibility, borefield, and ownership scope are known.",
"The building’s downtown setting may make ground-source installation impractical or much more expensive."
]
},
{
"retrofitTypeId": "automated_demand_response_controls",
"projectScopeSummary": "Building automation integration for demand response, event-mode scheduling, chilled-water/HVAC load shedding, and monitored curtailment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 212000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for controls integration rather than major BAS replacement."
},
{
"inputKey": "estimated_enrollable_peak_kw",
"value": 180,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large public building with 5.775 million annual kWh could plausibly shed a controlled fraction of HVAC, lighting, and plug load during events."
},
{
"inputKey": "existing_bms_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A modern 198,210-square-foot civic library likely has building automation, though details are not supplied."
},
{
"inputKey": "interval_meter_data_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Demand response qualification often requires interval data, telemetry, or metering confirmation."
},
{
"inputKey": "curtailment_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage projects should not be marked as having completed enrollment or performance tests."
},
{
"inputKey": "customer_operational_constraints",
"value": [
"public_event_schedules",
"technology_access_areas",
"thermal_comfort_for_public_occupancy",
"library_operating_hours"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These constraints are realistic for a public library and may limit demand response availability."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Demand response incentives should depend on verified enrollable kW and program enrollment.",
"Public assembly and library-service requirements may constrain event participation."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "Zone scheduling and controls refinement for meeting rooms, staff areas, cafe support areas, and event spaces.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 100600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost for a limited controls/zoning package."
},
{
"inputKey": "zones_or_thermostats_upgraded",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Eighteen zones is plausible for a targeted portion of a large civic facility."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 22000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative controls savings for a facility with public schedules and variable event occupancy."
},
{
"inputKey": "openadr_or_utility_dr_capable",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Demand-response-capable controls cannot be inferred without controls vendor details."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No controls contractor quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some thermostat programs are residential or small-business only and should be suppressed for this public institutional site.",
"Larger commercial controls incentives may require BAS integration details."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Envelope commissioning, targeted air sealing, door sweeps, loading-area infiltration reduction, and public-entry vestibule tuning.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 194600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost for targeted air sealing rather than major envelope reconstruction."
},
{
"inputKey": "treated_floor_area_sqft",
"value": 28000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic scope covers selected entrances, meeting areas, and back-of-house spaces rather than the full 198,210 square feet."
},
{
"inputKey": "blower_door_or_infiltration_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No diagnostic test has been provided, and large commercial buildings usually require field assessment."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 11500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative electricity savings for targeted infiltration reduction."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 1200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic gas savings reflect reduced heating load, but the actual HVAC fuel split is unknown."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote or measured infiltration baseline is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many weatherization grants are residential or income-qualified and should be suppressed for a municipal library.",
"Commercial custom incentives may require measured savings or engineering calculations."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Limited insulation improvements in accessible roof, mechanical, or back-of-house assemblies only if field audit identifies under-insulated areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost for a limited scope."
},
{
"inputKey": "insulation_area_sqft",
"value": 9000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Targeted accessible areas are more realistic than full envelope insulation work in a modern public library."
},
{
"inputKey": "existing_r_value_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing assembly R-values are needed for most savings or incentive calculations."
},
{
"inputKey": "proposed_r_value",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The proposed insulation specification is not supplied."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No insulation contractor quote or audit report is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Residential weatherization and low-income insulation programs are not relevant.",
"Commercial custom incentive estimates should remain suppressed until assembly details are known."
]
},
{
"retrofitTypeId": "window_replacement",
"projectScopeSummary": "Selective replacement or secondary glazing for damaged, high-solar-gain, or comfort-problem glazing areas rather than full-building window replacement.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 444000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost for selective glazing work."
},
{
"inputKey": "window_area_replaced_sqft",
"value": 1200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small selective scope is more plausible than full replacement for a large library with modern glazing."
},
{
"inputKey": "existing_window_u_factor_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing glazing performance is required to calculate savings or incentives."
},
{
"inputKey": "proposed_window_u_factor",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Proposed product performance is unknown without quote/specification data."
},
{
"inputKey": "historic_preservation_or_design_review_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Public civic buildings may have design constraints, but none are supplied."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No glazing quote or specification is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Window replacement is often poor fit for grant estimation unless tied to a broader energy project.",
"Custom incentive calculation requires baseline and proposed glazing specifications."
]
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"projectScopeSummary": "Targeted sealing and insulation of accessible ductwork in mechanical rooms, back-of-house, or parking-adjacent areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 147200,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost for a limited duct sealing scope."
},
{
"inputKey": "duct_length_treated_linear_ft",
"value": 850,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Reasonable for targeted accessible ductwork in a large building."
},
{
"inputKey": "duct_leakage_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Leakage testing or inspection is needed to support savings estimates."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 9800,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative partial-scope fan and cooling savings."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No mechanical contractor quote or leakage test is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many duct sealing rebates are residential or small commercial only.",
"Custom commercial incentive treatment should need inspection, leakage, and savings documentation."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Heat pump water heater or central domestic hot water electrification for cafe support, staff areas, and public restroom service loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost for a commercial-scale but limited domestic hot water project."
},
{
"inputKey": "hpwh_units",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Two commercial heat pump water heater units are plausible for a targeted public building scope."
},
{
"inputKey": "storage_capacity_gallons",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic storage capacity sized for cafe/support uses rather than a hotel or dormitory load."
},
{
"inputKey": "existing_water_heating_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes annual gas cost; natural gas domestic hot water is plausible but should be verified."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 2100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic gas reduction for partial domestic hot water electrification."
},
{
"inputKey": "estimated_annual_electric_kwh_increase",
"value": 16500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heat pump water heating may increase electric use while reducing gas use."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment quote, model, or plumbing scope is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on commercial HPWH program availability and equipment certification.",
"Domestic hot water load may be modest for a library, so incentive size may be small."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal domestic hot water concept for cafe and restroom loads, likely low priority because library hot-water load is not dominant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for a small solar thermal system."
},
{
"inputKey": "collector_area_sqft",
"value": 450,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest collector area is plausible for limited domestic hot-water support."
},
{
"inputKey": "roof_or_structural_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Roof space, shading, structural, and competing rooftop equipment constraints are unknown."
},
{
"inputKey": "domestic_hot_water_load_profile_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar water heating calculations require hot-water use data not supplied here."
},
{
"inputKey": "formal_vendor_quote_available",
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
"A public library is unlikely to have enough hot-water load for strong solar thermal economics.",
"Most estimates should be suppressed until hot-water load and roof feasibility are known."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Cafe and staff-area refrigeration replacement with high-efficiency reach-ins, undercounter units, and controls.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost for small cafe refrigeration scope."
},
{
"inputKey": "refrigeration_units_replaced",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Four units are plausible for a library cafe or concession service area."
},
{
"inputKey": "equipment_type",
"value": "reach_in_and_undercounter_commercial_refrigerators_freezers",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Appropriate for cafe support, not a grocery-scale refrigeration plant."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 7200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative savings for replacing small commercial refrigeration units."
},
{
"inputKey": "energy_star_or_equivalent_certified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Specific model numbers are needed to confirm qualifying equipment."
},
{
"inputKey": "formal_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No appliance quote or model list is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely relevant only for utility rebates, not large capital grants.",
"Specific model numbers and proof of efficient equipment are required."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP concept rejected for this profile because a public library has limited thermal baseload and would face emissions, interconnection, and operations complexity.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost, but this should not drive a positive estimate without feasibility evidence."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small CHP unit would be the plausible order of magnitude if considered, but no feasibility evidence exists."
},
{
"inputKey": "useful_thermal_load_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "CHP eligibility and economics require verified year-round useful thermal load."
},
{
"inputKey": "annual_runtime_hours_expected",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Runtime cannot be determined without load profiles and operational intent."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application is present."
},
{
"inputKey": "air_permit_or_emissions_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A combustion-based CHP project would require review that is not present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force CHP qualification for a library without a verified thermal baseload.",
"Potential emissions and resilience benefits are not enough to calculate a grant estimate."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not a realistic retrofit for a downtown public library; no biomass fuel supply, digester feedstock, or process heat need is present.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost only to support suppression testing."
},
{
"inputKey": "biomass_or_biogas_fuel_supply_secured",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A public library does not normally have biomass feedstock or biogas supply."
},
{
"inputKey": "onsite_digestible_waste_stream_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cafe and public waste loads are not sufficient to support a biogas energy system."
},
{
"inputKey": "thermal_host_load_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No industrial or process thermal load exists in the supplied profile."
},
{
"inputKey": "environmental_permit_path_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion or digestion permitting has not been pursued."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This should be treated as unrealistic for the profile unless the user adds a specific district-energy or biogas procurement scenario.",
"Do not calculate positive grant values from generic renewable-program eligibility alone."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not realistic for a downtown Austin public library due to urban siting, turbulence, structural, zoning, and public-space constraints.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost only as a suppression test."
},
{
"inputKey": "wind_turbine_capacity_kw",
"value": 20,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small turbine size is plausible as a concept, but not a realistic project for this site."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind resource or siting study is present."
},
{
"inputKey": "urban_siting_constraints_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A downtown public library site has likely constraints for small wind."
},
{
"inputKey": "zoning_or_structural_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No zoning, structural, or public-space approval is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress small-wind estimates unless the user provides a wind study and approved siting plan.",
"Urban public-building wind projects should not be assumed viable."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "AUSTIN_ENERGY_COMMERCIAL_REBATE_CUSTOM_EFFICIENCY",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "electric_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies Austin Energy as the electric utility."
},
{
"inputKey": "eligible_measures_under_consideration",
"value": [
"lighting_controls",
"hvac_replacement",
"building_controls",
"refrigeration",
"heat_pump_water_heating"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic utility-rebate candidates for a large public institutional customer."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile is exploring-stage and includes no program reservation or preapproval."
},
{
"inputKey": "itemized_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A utility rebate estimate should require equipment quantities, specifications, and installed cost."
}
],
"reasoning": "Austin Energy territory is relevant, but estimates should not be calculated until quote and program-preapproval facts are available."
},
{
"opportunityId": "AUSTIN_ENERGY_DEMAND_RESPONSE_OR_LOAD_COOP_PROGRAM",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "estimated_enrollable_peak_kw",
"value": 180,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large library may have controllable load, but actual enrollable kW requires interval data and testing."
},
{
"inputKey": "curtailment_strategy_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No demand-response plan or enrollment has been provided."
},
{
"inputKey": "enrollment_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project remains in exploring stage."
},
{
"inputKey": "interval_meter_data_verified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Actual demand-response value requires meter and telemetry confirmation."
}
],
"reasoning": "Demand response is plausible for this customer class, but payment or incentive estimates should be suppressed until enrollment and tested curtailment are known."
},
{
"opportunityId": "TEXAS_PACE_PUBLIC_BUILDING_ENERGY_PROJECT_FINANCING",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "property_tax_status",
"value": "public_municipal_property_exempt",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied synthetic tax profile shows public municipal property tax exemption and zero annual property tax due."
},
{
"inputKey": "property_tax_assessment_available_for_repayment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Property-assessed financing is generally not a straightforward fit when the public property is tax-exempt."
}
],
"reasoning": "Do not force PACE qualification for a municipal tax-exempt public library unless a specific public-sector financing path is documented."
},
{
"opportunityId": "FEDERAL_EECBG_LOCAL_GOVERNMENT_ENERGY_EFFICIENCY",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "applicant_is_local_government",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a municipal public agency."
},
{
"inputKey": "project_is_public_building_energy_efficiency",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "HVAC, controls, lighting, and water-heating improvements are plausible public-building efficiency measures."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application is present."
},
{
"inputKey": "award_or_allocation_amount_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No award notice or allocation amount is included."
}
],
"reasoning": "Local-government energy-efficiency grants may be conceptually relevant, but project-level estimates should remain suppressed without an actual allocation, notice of funding, or application status."
},
{
"opportunityId": "FEDERAL_IRA_DIRECT_PAY_CLEAN_ENERGY_TAX_CREDIT_SOLAR_STORAGE_OR_GEOTHERMAL",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "applicant_is_tax_exempt_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The synthetic tax profile models the property as public municipal property exempt and the applicant as a public agency."
},
{
"inputKey": "eligible_clean_energy_property_selected",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No actual solar PV, battery, qualified geothermal installation, or other credit-eligible clean energy scope is confirmed."
},
{
"inputKey": "direct_pay_registration_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No direct-pay registration or filing workflow is included."
},
{
"inputKey": "domestic_content_or_bonus_credit_documentation_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Bonus-credit documentation cannot be assumed."
}
],
"reasoning": "The public tax-exempt status may matter for direct pay, but no eligible credit-generating project scope is established in the supplied retrofit list except speculative geothermal, which lacks feasibility."
},
{
"opportunityId": "EV_CHARGING_PUBLIC_SITE_OR_FLEET_INFRASTRUCTURE_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "site_has_public_parking_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied description includes parking loads."
},
{
"inputKey": "ev_charger_ports_planned",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The current retrofit list does not include EV charging, so charger count should not be invented."
},
{
"inputKey": "fleet_owner_or_public_charging_host",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not say whether the library hosts public chargers or supports a municipal fleet."
}
],
"reasoning": "Parking makes EV infrastructure plausible, but the project is not in the provided retrofit scope; keep any EV grant estimate suppressed."
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
"reasoning": "The supplied existing tax opportunity inputs already suppress this out-of-state Michigan designation."
}
],
"reasoning": "The site is in Texas and has no Michigan Renewable Energy Renaissance Zone designation."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "municipality",
"value": "Austin, TX",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied existing tax opportunity inputs already indicate the site is in Austin, Texas, not Rhode Island."
}
],
"reasoning": "Rhode Island renewable property-tax treatment is out of state for this profile."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "not_applicable_out_of_state_and_no_synthetic_solar_manufacturing_activity",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied existing tax opportunity inputs already suppress this Washington solar-manufacturing tax treatment."
}
],
"reasoning": "The Texas public library has no Washington solar manufacturing activity."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "utility_account_number_unmasked",
"reason": "needs user decision"
},
{
"inputKey": "interval_meter_data_15_min_or_hourly",
"reason": "needs user decision"
},
{
"inputKey": "itemized_vendor_quotes_by_measure",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers_and_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "utility_rebate_preapproval_letter",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_tracking_number",
"reason": "application not submitted"
},
{
"inputKey": "award_notice_or_reservation_amount_cents",
"reason": "application not submitted"
},
{
"inputKey": "investment_grade_energy_audit_report",
"reason": "needs user decision"
},
{
"inputKey": "mechanical_equipment_schedule",
"reason": "needs user decision"
},
{
"inputKey": "roof_structural_capacity_for_solar_or_solar_thermal",
"reason": "needs user decision"
},
{
"inputKey": "geothermal_borefield_feasibility_report",
"reason": "source requires agency approval"
},
{
"inputKey": "chp_thermal_load_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "ev_charger_port_count",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"Do not treat the municipal public library as a residential, multifamily, agricultural, rural small-business, tribal, school-campus, or private nonprofit applicant unless the user explicitly adds those facts.",
"Do not calculate tax-abatement or property-tax-credit benefits that require taxable property value because the synthetic tax profile models the site as public municipal property exempt with zero property tax due.",
"Do not assume Texas retail-choice electric-provider logic; the test case is specifically in Austin Energy municipal utility territory.",
"Do not make renewable-energy measures positive merely because renewable categories exist in the preview list; biomass, small wind, CHP, and geothermal lack site feasibility evidence.",
"Do not calculate utility rebate values before preapproval where the program requires application before purchase or installation.",
"Do not use the preview cost as a final customer quote; it is a synthetic admin-modeled cost and should be replaced by itemized vendor pricing before firm grant estimates.",
"Do not assume direct-pay tax credit eligibility without a confirmed credit-eligible project, ownership structure, placed-in-service timing, and registration or filing facts.",
"Do not assume parking loads imply EV charging scope; no EV charger project is included in the current retrofit summaries."
]
}

