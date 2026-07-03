{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "uw-madison-main-campus",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-profile enrichment based on the supplied UW-Madison main campus test case. The campus is treated as a large public higher-education owner in Madison Gas and Electric territory, with district-energy complexity and no submitted grant applications or project quotes. Source prompt: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object lists the stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "capital_planning_no_rfp",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A campus-wide project at this stage would normally be in capital planning before final RFP, quote, or incentive reservation."
},
{
"inputKey": "grant_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted grant application, reservation letter, or agency approval is present in the test case."
},
{
"inputKey": "quote_status",
"value": "no_vendor_quotes_uploaded",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied costs are admin preview values rather than contractor quotes."
},
{
"inputKey": "applicant_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization type is Government / Public Agency and the customer is a public university."
},
{
"inputKey": "applicant_state_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For grant-screening tests, UW-Madison should be modeled as a state public higher-education entity unless overridden."
},
{
"inputKey": "institution_of_higher_education",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The NAICS code 611310 and building type education campus indicate higher education."
},
{
"inputKey": "k12_school_district",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a university campus, not a K-12 school district."
},
{
"inputKey": "nonprofit_501c3_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A public university may be tax-exempt, but a grant calculator should not assume a separate 501(c)(3) applicant without documentation."
},
{
"inputKey": "property_tax_exempt_public_property",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The synthetic tax facts list the property tax status as state university public property exempt."
},
{
"inputKey": "sales_use_tax_exemption_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The available tax profile includes this field, but the test case does not provide a confirmed exemption certificate or purchasing treatment."
},
{
"inputKey": "campus_aggregate_property_flag",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing tax facts identify the site as a campus aggregate property."
},
{
"inputKey": "district_energy_served",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case notes district-energy complexity, so project savings and eligible costs should require campus-level allocation review."
},
{
"inputKey": "mge_electric_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The normalized utility profile identifies Madison Gas and Electric as the self-reported electric utility."
},
{
"inputKey": "mge_gas_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form identifies Madison Gas and Electric as the gas utility provider."
},
{
"inputKey": "utility_customer_class",
"value": "large_institutional_or_commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a 17,000,000 square-foot campus with very large annual electric use, but the exact tariff class is not confirmed."
},
{
"inputKey": "annual_kwh",
"value": 332000000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile lists annual kWh as 332,000,000."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 3386400000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile lists annual electric cost as $33,864,000."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 2246000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries list annual gas cost as $22,460,000."
},
{
"inputKey": "owns_project_site",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form and normalized profile identify the ownership relationship as owner."
},
{
"inputKey": "includes_student_housing",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The campus description includes residence halls."
},
{
"inputKey": "primarily_residential_low_income_household_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a public university campus with mixed academic, lab, athletics, housing, and operations uses, not a low-income household weatherization site."
},
{
"inputKey": "liheap_household_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "UW-Madison should not be treated as a household applying for low-income home energy assistance."
},
{
"inputKey": "liheap_administering_agency_for_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fact indicates the campus project is being performed by a LIHEAP administering agency or subgrantee."
},
{
"inputKey": "tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile identifies a public state university, not a tribal government or tribal entity."
},
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The main campus profile is higher education and research; it should not be treated as an agricultural producer for energy grants without a specific farm-site project."
},
{
"inputKey": "small_business_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization size is 1,000+ employees and the applicant is a public university."
},
{
"inputKey": "fleet_owner_or_operator",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large campus with operations, athletics, dining, and facilities functions would realistically operate campus vehicles, but fleet details still need confirmation."
},
{
"inputKey": "controls_parking_or_charging_sites",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "As an owner campus, the university likely controls some parking or fleet charging sites, but final site host documentation should be requested."
},
{
"inputKey": "disadvantaged_community_or_low_income_area_designation",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not include tract-level designation evidence, so grant adders or priority scoring should remain unconfirmed."
},
{
"inputKey": "prevailing_wage_or_labor_compliance_plan_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large public projects may have labor compliance requirements, but the test case does not include a project labor plan."
},
{
"inputKey": "board_or_capital_budget_approval_status",
"value": "not_approved_for_specific_scope",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is still exploring, so final campus capital approval should not be assumed."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No project-specific M&V plan is included with the supplied utility or retrofit preview data."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery pilot for resilience and demand management at a selected campus substation or central operations node, not a campus-wide backup system.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 380000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2 MW / 4 MWh institutional battery with controls, switchgear, design, and interconnection would plausibly cost about $3.8 million before incentives."
},
{
"inputKey": "battery_power_kw",
"value": 2000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2 MW pilot is small relative to a 332 million kWh campus but large enough for critical-load support and demand response testing."
},
{
"inputKey": "battery_energy_kwh",
"value": 4000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2-hour battery duration is a conservative commercial-scale planning assumption."
},
{
"inputKey": "new_or_replacement",
"value": "new",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No existing storage replacement project is described."
},
{
"inputKey": "critical_loads_served",
"value": "selected research freezers, emergency operations loads, and central plant controls",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "These are plausible campus resilience loads, but the actual critical-load panel list is not provided."
},
{
"inputKey": "interconnection_application_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Battery grants and utility programs may require interconnection status, which is absent."
},
{
"inputKey": "resilience_grant_designation_document_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No resilience-hub, hazard-mitigation, or critical-facility grant designation is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be eligible for tax-credit or resilience-review workflows, but a grant estimate should remain suppressed without a specific active program, interconnection status, and agency scoring basis.",
"No quote or grant application is present.",
"Do not assume disadvantaged-community or critical-facility priority scoring."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Feasibility-only concept for anaerobic digestion or renewable gas using campus food waste and organics; no committed construction scope.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Construction cost should remain unknown because the project is only a concept and would need feedstock, permitting, and engineering validation."
},
{
"inputKey": "audit_or_feasibility_study_cost_cents",
"value": 15000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $150,000 feasibility study is plausible for campus-scale organics, interconnection, permitting, and lifecycle analysis."
},
{
"inputKey": "proposed_system_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "System size depends on confirmed feedstock, gas cleanup, thermal use, and interconnection strategy."
},
{
"inputKey": "feedstock_source",
"value": "campus dining food waste and organics only; no confirmed dedicated agricultural feedstock",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes dining and waste services but does not establish agricultural production or manure feedstock."
},
{
"inputKey": "annual_feedstock_tons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Waste tonnage by stream is not provided."
},
{
"inputKey": "air_or_waste_permit_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No permitting or engineering status is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Main campus should not be treated as an agricultural producer or rural small business.",
"A feasibility study may be fundable in some programs, but construction incentives should remain suppressed without feedstock, permit, and quote data.",
"Do not calculate a positive grant solely from the presence of dining waste."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Mixed campus EV charging hub serving fleet vehicles, visitors, and public parking: Level 2 ports plus a small DC fast-charging component.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 126000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A mixed installation with 24 Level 2 ports, 4 DC fast-charging ports, make-ready work, networking, design, and contingency could plausibly cost about $1.26 million."
},
{
"inputKey": "level_2_ports",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Twenty-four ports is a realistic first-phase campus deployment rather than a campus-wide electrification buildout."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four DC fast-charging ports is a conservative fleet or public hub assumption."
},
{
"inputKey": "fleet_use_ports",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large campus likely has fleet charging needs, but the exact allocation is not supplied."
},
{
"inputKey": "public_access_ports",
"value": 16,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Some chargers may be visitor or public parking chargers, but final access policy should be confirmed."
},
{
"inputKey": "charger_networked",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked chargers are a realistic requirement for campus access control, payment, uptime reporting, and grant reporting."
},
{
"inputKey": "utility_make_ready_quote_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No MGE make-ready or service-upgrade quote is included."
},
{
"inputKey": "site_host_controls_parking",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The owner-campus profile makes site-host control plausible."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Grant amount should require a charger quote, make-ready estimate, public-access rules, and application window.",
"Fleet-only ports may qualify differently from public-access ports.",
"Do not include DC fast-charger incentives unless the selected program covers DCFC and the site meets corridor or access requirements."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Pilot closed-loop geothermal heat-pump system for one major residence hall or academic renovation, with partial decoupling from campus district steam.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 920000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 600-ton geothermal pilot with borefield, heat pumps, hydronic conversion, design, and controls could plausibly cost about $9.2 million."
},
{
"inputKey": "conditioned_area_sqft",
"value": 180000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single large residence hall or academic building pilot is realistic for a 17 million square-foot campus."
},
{
"inputKey": "system_capacity_tons",
"value": 600,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A planning factor near 300 square feet per ton produces a 600-ton pilot for 180,000 square feet."
},
{
"inputKey": "boreholes_count",
"value": 180,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Bore count is highly site-specific and should be replaced by engineering design."
},
{
"inputKey": "average_bore_depth_ft",
"value": 500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 500-foot vertical bore is a common early planning assumption but must be validated by geotechnical design."
},
{
"inputKey": "heat_pump_type",
"value": "closed_loop_vertical_borefield",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Closed-loop vertical geothermal is plausible for a dense campus pilot where horizontal loops are unlikely."
},
{
"inputKey": "district_energy_decoupling_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "District-energy complexity in the test case means geothermal savings and costs require building-level decoupling assumptions."
},
{
"inputKey": "engineering_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility or geotechnical study is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Grant calculation should require engineering study, building selection, and quote-level eligible cost.",
"District steam displacement must be allocated to the specific building rather than the whole campus.",
"Some programs may treat this as tax-credit eligible rather than grant eligible."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal domestic hot-water system at a dining and residence hall complex, sized as a demonstration rather than a campus-wide thermal project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 145000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 4,500 square-foot collector system with storage, controls, roof work, and integration could plausibly cost about $1.45 million."
},
{
"inputKey": "collector_area_sqft",
"value": 4500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This is a demonstration-scale system for a large dining or residence hall load."
},
{
"inputKey": "storage_gallons",
"value": 6000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Storage volume should be finalized with domestic hot-water load profiles."
},
{
"inputKey": "served_load_type",
"value": "dining_and_student_housing_domestic_hot_water",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Dining and residence halls create plausible domestic hot-water demand."
},
{
"inputKey": "displaced_energy_source",
"value": "district_steam_or_mge_gas_served_heat",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case includes gas costs and district-energy complexity, but the exact hot-water heating source is not confirmed."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 26000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "This is a conservative demonstration-scale savings placeholder and should not drive a final grant estimate."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A public university is not automatically eligible for residential solar-water-heating grants.",
"This may be more relevant to renewable tax-credit or direct-pay review than a grant estimate.",
"No solar thermal quote, roof screening, or utility thermal baseline is available."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Envelope air sealing and weatherization for selected older residence halls and academic buildings, focused on infiltration reduction and comfort complaints.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 97500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A limited multi-building campus envelope package could plausibly cost about $975,000."
},
{
"inputKey": "buildings_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A focused weatherization package across eight older buildings is realistic for an exploring-stage campus project."
},
{
"inputKey": "treated_area_sqft",
"value": 620000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "620,000 square feet is a small subset of the 17 million square-foot campus."
},
{
"inputKey": "measure_types",
"value": [
"air_sealing",
"door_sweeps",
"weatherstripping",
"roof_hatch_sealing",
"attic_or_mechanical_penthouse_penetration_sealing"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic envelope measures for older institutional buildings."
},
{
"inputKey": "student_housing_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Residence halls are present in the test case and are plausible weatherization targets."
},
{
"inputKey": "income_qualified_households_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Student housing should not be treated as documented low-income household eligibility for LIHEAP."
},
{
"inputKey": "energy_audit_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Weatherization savings and custom incentives would normally require an audit or engineering calculation."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The matched LIHEAP opportunity should be suppressed because the applicant and site are not low-income household weatherization.",
"A utility custom incentive may be possible, but the provided matched grant should not calculate a positive value.",
"Needs building-level audit, cost breakdown, and confirmation of eligible measures."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Conceptual natural-gas CHP addition at a central plant or district-energy node; no approved decarbonization-aligned project scope.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 2800000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 6.5 MW CHP plant with heat recovery, controls, interconnection, and permitting could cost tens of millions, but no quote is available."
},
{
"inputKey": "system_capacity_kw",
"value": 6500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "6.5 MW is a plausible central-plant scale but should not be assumed for a final estimate."
},
{
"inputKey": "prime_mover",
"value": "natural_gas_combustion_turbine_or_engine",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Most campus CHP concepts at this scale would be gas-fired unless a renewable fuel source is documented."
},
{
"inputKey": "heat_recovery_use",
"value": "district_steam_or_hot_water",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly includes district-energy complexity."
},
{
"inputKey": "annual_runtime_hours",
"value": 6000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Runtime depends on dispatch economics, emissions limits, and plant operations."
},
{
"inputKey": "emissions_permitting_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A gas-fired central plant project would require air and interconnection review."
},
{
"inputKey": "interconnection_study_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No utility interconnection study is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Fossil gas CHP should not be forced into clean-energy grant eligibility without a specific qualifying program.",
"Emissions, interconnection, and district-energy allocation are unresolved.",
"No project approval or quote is available."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Custom HVAC and lab ventilation retrofit for selected academic and research buildings, including high-efficiency chillers, AHU upgrades, heat recovery, controls, and VFDs.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 840000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A four-building custom HVAC and controls project on a research campus could plausibly cost about $8.4 million."
},
{
"inputKey": "buildings_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A focused four-building scope is realistic at the exploring stage."
},
{
"inputKey": "air_handling_units_upgraded",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large academic and lab buildings commonly have multiple AHUs."
},
{
"inputKey": "chiller_capacity_tons_affected",
"value": 1800,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Chiller capacity is a planning placeholder and should be replaced by equipment schedules."
},
{
"inputKey": "vfd_motor_hp_affected",
"value": 1200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Motor horsepower is a placeholder for custom incentive screening."
},
{
"inputKey": "lab_air_change_reduction_allowed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Lab ventilation savings depend on safety, research protocols, and environmental health approvals."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 5400000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 5.4 million kWh reduction is about 1.6% of campus annual electric use, plausible for a focused custom HVAC package but not quote-backed."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 180000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal savings are plausible for heat recovery and ventilation optimization but must be reconciled with district energy."
},
{
"inputKey": "custom_incentive_preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large custom HVAC incentives normally require preapproval and engineering calculations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Calculate only for programs that support public institutional efficiency projects and accept custom engineering estimates.",
"Needs quote, equipment schedules, baseline, M&V plan, and preapproval.",
"District-energy savings must be allocated to selected buildings."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Multi-building LED lighting and controls retrofit for selected academic, office, library, and circulation spaces.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 593750000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "12,500 fixtures at an average installed cost of $475 yields a plausible $5.94 million campus lighting phase."
},
{
"inputKey": "fixture_replacement_count",
"value": 12500,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "12,500 fixtures represents a limited phase rather than the entire 17 million square-foot campus."
},
{
"inputKey": "average_installed_cost_per_fixture_cents",
"value": 47500,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This includes fixture, labor, controls integration, lift access, disposal, and contingency."
},
{
"inputKey": "existing_fixture_types",
"value": [
"linear_fluorescent",
"compact_fluorescent",
"metal_halide_high_bay"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are plausible legacy fixture types for a large mixed-age campus."
},
{
"inputKey": "controlled_fixture_share_pct",
"value": 65,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Many campus areas would add occupancy or daylight controls, but not every fixture would be controlled."
},
{
"inputKey": "annual_operating_hours",
"value": 4200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Extended academic, library, lab support, and common-space schedules justify higher-than-office operating hours."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 4600000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "This is about 1.4% of campus annual kWh and is plausible for a large but partial lighting phase."
},
{
"inputKey": "incentive_preapproval_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility or grant preapproval is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely better suited to utility custom or prescriptive incentives than federal grant treatment.",
"Grant or incentive calculation should require fixture schedule, baseline wattage, controls scope, and preapproval.",
"Do not apply residential or small-business-only lighting programs."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Networked Level 2 charging ports in campus ramps and residence-hall or visitor lots, treated as the Level 2-only subset of the broader EV charging plan.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 45600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "24 ports at about $19,000 per port installed is plausible where trenching, panel work, networking, signage, and design are included."
},
{
"inputKey": "charger_ports",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This aligns with a first-phase deployment for a large campus."
},
{
"inputKey": "dual_port_stations",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Dual-port pedestals are a common commercial Level 2 configuration."
},
{
"inputKey": "power_per_port_kw",
"value": 7.2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "7.2 kW is a conservative Level 2 planning assumption."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked chargers are realistic for campus access control, reporting, and payments."
},
{
"inputKey": "ada_accessible_ports",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Accessibility counts require site design but should be included in planning."
},
{
"inputKey": "public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Some campus parking is likely visitor-accessible, but final grant eligibility should rely on signed access policy."
},
{
"inputKey": "fleet_only",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The Level 2 deployment is modeled as mixed-use rather than exclusively fleet-only."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs final charger quote and utility make-ready scope.",
"Public-access and uptime requirements should be verified before calculating any public-charging grant.",
"If the final site is restricted to permit holders only, some public-access grants should be suppressed."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Urban-campus wind concept only; not a realistic near-term grant project for the main Madison campus.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A grant estimate should not use a synthetic construction cost for a project that is not realistically scoped."
},
{
"inputKey": "proposed_capacity_kw",
"value": 100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "100 kW is a possible small wind concept size, but the site is not screened."
},
{
"inputKey": "tower_height_ft",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A turbine of this size would require a substantial tower and siting review."
},
{
"inputKey": "wind_resource_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind-resource assessment is provided."
},
{
"inputKey": "zoning_siting_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No zoning, airport, structural, or neighborhood siting review is included."
},
{
"inputKey": "faa_or_aviation_review_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tall turbine in an urban campus context should trigger aviation and obstruction screening."
},
{
"inputKey": "urban_campus_siting_conflict",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The dense main campus context makes a small wind turbine unlikely without a special demonstration site."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate a positive wind grant without a wind study, site-control documentation for a turbine location, zoning review, and interconnection path.",
"Urban campus siting makes this unrealistic compared with efficiency, HVAC, geothermal, or EV charging projects.",
"Do not treat the main campus as a rural agricultural wind applicant."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_low_income_household",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a public university, not an income-qualified household."
},
{
"inputKey": "project_is_home_energy_assistance",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The weatherization scope is for campus-owned institutional buildings, not household home energy assistance."
},
{
"inputKey": "income_eligibility_documentation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No household income documentation is present, and it would not normally apply to the campus as applicant."
},
{
"inputKey": "liheap_administering_agency_or_subgrantee",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case does not identify the university as a LIHEAP administering agency for this project."
},
{
"inputKey": "application_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No LIHEAP application or agency approval is included."
}
],
"reasoning": "The broad matcher identified LIHEAP because it is active, nationwide, and includes energy-efficiency/weatherization terms, but the project profile is a public university campus. The estimate should be suppressed rather than calculated."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "site_state_code",
"value": "WI",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The structured address places the project in Wisconsin."
},
{
"inputKey": "approved_rerz_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing tax opportunity input already suppresses Michigan Renewable Energy Renaissance Zone treatment."
}
],
"reasoning": "Michigan renewable energy zone treatment should remain suppressed for a Wisconsin campus."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "municipality",
"value": "Madison, WI",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site address is in Madison, Wisconsin."
},
{
"inputKey": "site_state_code",
"value": "WI",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The structured address places the project in Wisconsin, not Rhode Island."
}
],
"reasoning": "Rhode Island renewable property-tax valuation treatment is not relevant to this Wisconsin public university campus."
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
"userOverrideAllowed": true,
"reasoning": "The existing opportunity-specific input already suppresses Washington solar-manufacturing B&O treatment."
},
{
"inputKey": "solar_manufacturing_activity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The campus profile is higher education and research operations, not solar equipment manufacturing."
}
],
"reasoning": "Washington solar-manufacturing tax treatment is out of state and not tied to the modeled retrofit scopes."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quote_by_retrofit",
"reason": "quote not available"
},
{
"inputKey": "final_measure_level_cost_breakdown",
"reason": "quote not available"
},
{
"inputKey": "utility_incentive_preapproval_or_reservation_letter",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_submission_date",
"reason": "application not submitted"
},
{
"inputKey": "agency_award_or_notice_to_proceed",
"reason": "source requires agency approval"
},
{
"inputKey": "liheap_household_income_certifications",
"reason": "unrealistic for this customer"
},
{
"inputKey": "liheap_weatherization_agency_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "building_level_district_energy_allocation",
"reason": "needs user decision"
},
{
"inputKey": "selected_buildings_and_service_addresses",
"reason": "needs user decision"
},
{
"inputKey": "battery_interconnection_study",
"reason": "source requires agency approval"
},
{
"inputKey": "ev_charging_make_ready_quote",
"reason": "quote not available"
},
{
"inputKey": "geothermal_feasibility_and_geotechnical_report",
"reason": "quote not available"
},
{
"inputKey": "chp_air_permit_and_interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "small_wind_wind_resource_and_zoning_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "disadvantaged_community_or_priority_area_documentation",
"reason": "needs user decision"
},
{
"inputKey": "board_or_capital_budget_authorization",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"Do not force LIHEAP eligibility: the applicant is a public university campus, not an income-qualified household or documented LIHEAP weatherization subgrantee.",
"Do not treat student housing as low-income residential eligibility without household-level income certification and program approval.",
"Do not treat the main campus as an agricultural producer or rural small business for biomass, biogas, wind, or USDA-style programs.",
"Do not calculate state tax abatements where the synthetic property profile is already public-property tax exempt unless a program has a separate refundable or payable mechanism.",
"Do not assume public-entity status alone makes every federal or state grant calculable; many opportunities require application scoring, agency award, or competitive selection.",
"Do not use campus-wide annual kWh or gas cost as the baseline for a single-building or pilot retrofit without building-level allocation.",
"Do not calculate EV charging grants without charger type, public-access terms, make-ready costs, and application-cycle evidence.",
"Do not calculate CHP grants for a fossil-gas central-plant concept without a specific qualifying program, emissions review, and interconnection approval.",
"Do not calculate small-wind incentives for the dense Madison main campus without wind-resource, zoning, aviation, and interconnection documentation.",
"Do not include unconfirmed disadvantaged-community, low-income, prevailing-wage, domestic-content, or energy-community adders in user-facing totals."
]
}

