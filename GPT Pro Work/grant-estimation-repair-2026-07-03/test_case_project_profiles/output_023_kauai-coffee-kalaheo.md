{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "kauai-coffee-kalaheo",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment for a Kauai agricultural coffee estate and visitor center in KIUC electric territory, with no piped gas assumption. Inputs are designed to support realistic grant-estimation behavior without forcing qualification. Based on the supplied test-case fixture. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type_normalized",
"value": "for_profit_agricultural_producer_and_visitor_center",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies an agricultural operation with coffee cultivation, visitor tours, retail, and estate operations. Nonprofit, school, government, and tribal statuses should not be assumed."
},
{
"inputKey": "is_agricultural_producer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is described as a coffee estate with cultivation, irrigation, and processing-support activities."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A commercial coffee estate and visitor center would normally be treated as a private applicant unless ownership documents show otherwise."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate nonprofit status, and the activity profile is consistent with a commercial agricultural and retail operation."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal applicant facts are present in the supplied test case."
},
{
"inputKey": "utility_customer_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile includes KIUC as the self-reported electric utility and annual electric consumption and cost."
},
{
"inputKey": "electric_utility_provider_normalized",
"value": "Kauai Island Utility Cooperative",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies Kauai Island Utility Cooperative with a normalized distribution utility ID."
},
{
"inputKey": "customer_class",
"value": "commercial_agricultural",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The load profile and activities are consistent with a nonresidential agricultural and visitor-center account; the exact utility rate class remains unverified."
},
{
"inputKey": "has_piped_natural_gas_service",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied case explicitly assumes no piped gas and includes a gas-service-status fact of no piped gas reported."
},
{
"inputKey": "uses_delivered_propane_or_diesel_for_process_backup",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Island agricultural operations often maintain delivered-fuel equipment or backup generation, but no fuel invoices are supplied. This should not be treated as verified gas service."
},
{
"inputKey": "site_has_public_visitor_parking",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied case describes a visitor center, tours, and retail activities, which reasonably imply public visitor parking."
},
{
"inputKey": "fleet_owner_or_operator",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large estate operation would plausibly operate light-duty maintenance vehicles, carts, and visitor-support vehicles, but fleet inventory is not documented."
},
{
"inputKey": "site_control_for_energy_projects",
"value": "likely_operational_control_land_ownership_unconfirmed",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The estate appears to operate the site, but ownership status is listed as not sure. Grant estimates that require property-owner consent should remain caveated."
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
"value": "pre_quote_planning",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No contractor quote, bid package, or application packet is supplied."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is at exploring stage and no application evidence is present."
},
{
"inputKey": "disadvantaged_community_or_priority_corridor_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Several transportation and resilience grants may require location-specific corridor, equity, or priority-area determinations that are not present in the supplied profile."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery storage to reduce outage risk for irrigation controls, processing-support loads, refrigeration or retail operations, and visitor-center critical circuits.",
"inputFacts": [
{
"inputKey": "battery_storage_capacity_kwh",
"value": 600,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual usage of 3,080,000 kWh implies a large site load; a 600 kWh battery is a realistic conservative resilience project rather than whole-site backup."
},
{
"inputKey": "battery_power_capacity_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 250 kW inverter size is consistent with a commercial/agricultural partial-load battery sized for critical loads."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 72000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview fixture cost is much smaller than a plausible 600 kWh commercial storage installation. A real estimate should require a vendor quote."
},
{
"inputKey": "paired_with_solar_pv",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Storage is most realistic for this island agricultural site when paired with PV for resilience and demand-management value."
},
{
"inputKey": "critical_loads_identified",
"value": [
"irrigation controls",
"processing support loads",
"visitor center point-of-sale and refrigeration",
"communications and safety lighting"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These loads are consistent with the supplied site activities but should be confirmed in an engineering scoping process."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection or utility preapproval status is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Real grant handling should require quote data, ownership or site-control confirmation, and interconnection status.",
"Storage-only grants may be unavailable or competitive; do not assume an award without program-specific evidence."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Commercial PV on visitor-center, processing-support, warehouse, or suitable estate structures, potentially paired with battery storage.",
"inputFacts": [
{
"inputKey": "solar_pv_system_size_kw_dc",
"value": 350,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 350 kW DC project is realistic for a high-load agricultural and visitor-center campus without assuming enough roof or ground area to offset all usage."
},
{
"inputKey": "annual_pv_generation_kwh_estimate",
"value": 560000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic production estimate assumes strong Hawaii solar resource but should be replaced by site-specific design and shading analysis."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 87500000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Commercial PV installed cost is highly quote-dependent, especially for island logistics, structural work, and interconnection."
},
{
"inputKey": "mounting_type",
"value": "mixed_rooftop_and_possible_ground_mount",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The building square footage and usable roof area are unknown, so the mounting configuration should remain uncertain."
},
{
"inputKey": "site_structural_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No structural review is included in the supplied data."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No KIUC interconnection application facts are present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Grant or tax-credit estimates should require eligible cost, site control, interconnection, and whether the project is direct-owned or third-party-owned.",
"Do not assume agricultural-specific grant eligibility unless the program supports commercial agricultural producers."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Visitor and light-duty fleet EV charging at the visitor center, with a small number of publicly accessible Level 2 ports and no assumed DC fast-charging corridor project.",
"inputFacts": [
{
"inputKey": "charger_level",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 charging is realistic for visitor dwell time and employee or light-fleet charging. NEVI-style DC fast charging should not be assumed from the supplied facts."
},
{
"inputKey": "evse_ports_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four ports is a plausible initial deployment for a visitor center and fleet-support site."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public-facing visitor chargers would typically be networked for access control, payment, uptime reporting, or energy management."
},
{
"inputKey": "public_access_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has visitor-center use, so public or semi-public access is realistic for a grant-relevant EV charging project."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 8500000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The existing preview cost of 848000 cents appears fixture-like and may omit trenching, panel upgrades, networking, signage, and island logistics. A real EVSE quote is needed."
},
{
"inputKey": "dc_fast_charging_ports_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts support a NEVI corridor DC fast-charging installation, and a visitor-center Level 2 project is more realistic."
},
{
"inputKey": "located_on_nevi_designated_alternative_fuel_corridor",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Corridor eligibility and distance-to-corridor requirements are not established by the supplied profile."
},
{
"inputKey": "utility_make_ready_quote_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No make-ready or interconnection quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The profile may support a general commercial EV charging incentive, but the matched Hawaii NEVI program should not be calculated for a small Level 2 visitor-center project unless DC fast-charging corridor scope and public-agency award status are documented.",
"A quote and project design are required before estimating eligible project cost."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Feasibility study for PV, battery storage, critical-load resilience, EV charging make-ready, irrigation load management, and possible agricultural waste-energy options.",
"inputFacts": [
{
"inputKey": "study_scope",
"value": [
"solar PV feasibility",
"battery storage sizing",
"critical-load assessment",
"EV charging make-ready review",
"irrigation energy optimization",
"grant-readiness support"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A feasibility study is realistic for a large island agricultural site with multiple possible energy projects."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 6500000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Professional engineering study cost should be based on a consultant proposal."
},
{
"inputKey": "third_party_engineer_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No selected engineer or proposal is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Planning grants are often competitive and may require preapproval before costs are incurred.",
"The estimate should remain suppressed where a program requires an executed consultant proposal."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Targeted LED replacement for visitor center, retail, office, warehouse, and exterior safety lighting.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview assumes only 12 fixtures, which is too small for a large visitor and estate operation. A 120-fixture scope is more realistic but still conservative."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1800000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Lighting quantity, fixture type, controls, and lift/access costs require a contractor quote."
},
{
"inputKey": "existing_fixture_type",
"value": "mixed_fluorescent_hid_and_exterior_area_lighting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Mixed legacy lighting is plausible for an agricultural and visitor-center campus but not documented."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Occupancy, daylight, or schedule controls are realistic for visitor and back-of-house spaces but should be confirmed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility rebates may require preapproval and existing-fixture documentation.",
"Grant estimates should require fixture schedule or quote data."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged or split-system HVAC serving the visitor center, retail, offices, and tasting or tour-support spaces.",
"inputFacts": [
{
"inputKey": "hvac_units_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Six small-to-medium commercial units are plausible for a visitor-center and office/retail footprint, while not applying HVAC to the entire agricultural estate."
},
{
"inputKey": "cooling_capacity_tons",
"value": 36,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes an average of about 6 tons per unit; actual capacity requires equipment inventory."
},
{
"inputKey": "equipment_type",
"value": "high_efficiency_air_source_heat_pump_or_variable_refrigerant_flow",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "In a no-piped-gas Hawaii site, efficient electric cooling/heat-pump equipment is more realistic than gas-fired HVAC conversion."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 24000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The existing preview cost appears low for six commercial HVAC units in an island market. Estimate should rely on a contractor quote."
},
{
"inputKey": "existing_equipment_efficiency_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No existing equipment schedule or efficiency ratings are supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Incentives may require existing equipment age, efficiency, and AHRI-rated replacement data.",
"Do not assume gas-to-electric conversion incentives because no piped gas service is reported."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal or heat-pump-assisted water heating for visitor-center restrooms, café or tasting support, and cleaning loads.",
"inputFacts": [
{
"inputKey": "system_type",
"value": "commercial_solar_thermal_preheat",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar water heating is plausible in Hawaii but site hot-water load is not documented."
},
{
"inputKey": "collector_area_sqft",
"value": 320,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A moderate commercial system is plausible for visitor and cleaning loads but needs load and roof-space verification."
},
{
"inputKey": "storage_tank_capacity_gallons",
"value": 500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 500-gallon commercial preheat tank is plausible but not source-backed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12500000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Commercial solar hot-water cost depends on collector type, tank location, controls, roof work, and plumbing tie-ins."
},
{
"inputKey": "existing_water_heater_fuel",
"value": "electric_or_propane_unknown",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The case has no piped gas, but it does not identify whether existing water heating uses electric resistance, heat pump, propane, or another fuel."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Estimates should remain uncertain until hot-water load and existing water-heater fuel are confirmed.",
"Do not apply natural-gas displacement incentives."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Early-stage review of coffee pulp, husk, prunings, and other agricultural residuals for biomass thermal use or small biogas demonstration.",
"inputFacts": [
{
"inputKey": "feedstock_type",
"value": [
"coffee_pulp",
"coffee_husk",
"orchard_prunings",
"landscape_residuals"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Coffee estate operations plausibly generate agricultural residuals, but actual quantities and moisture content are not supplied."
},
{
"inputKey": "estimated_feedstock_tons_per_year",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Feedstock quantity is essential for biomass or biogas eligibility and is not present."
},
{
"inputKey": "system_capacity_kw_equivalent",
"value": 75,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small demonstration-scale system is more realistic than a large baseload project without feedstock documentation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Biomass and biogas costs vary significantly by feedstock handling, emissions controls, permitting, and interconnection."
},
{
"inputKey": "air_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion or biogas projects would likely require environmental and permitting review, but none is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate grant estimates until feedstock quantity, technology type, permit path, and quote are available.",
"This should remain a feasibility-stage project, not a ready-to-fund construction scope."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is considered unlikely because the site has no reported piped natural gas and no documented year-round thermal load suitable for conventional CHP.",
"inputFacts": [
{
"inputKey": "primary_chp_fuel",
"value": "none_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No piped gas is reported, and no verified biogas or biomass fuel supply is established."
},
{
"inputKey": "thermal_host_load_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No continuous steam, hot water, or process-heat profile is supplied."
},
{
"inputKey": "chp_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity should remain unknown because the technical basis for CHP is not established."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP cost should not be estimated without a selected technology, fuel source, thermal load, and quote."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"No-piped-gas status and missing thermal-load documentation should suppress typical CHP grant calculations.",
"A biomass or biogas CHP pathway would require separate feedstock and permitting evidence."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source geothermal heat pump is not a near-term realistic scope for this site because cooling loads are likely limited to visitor and office areas and ground-loop feasibility is unknown.",
"inputFacts": [
{
"inputKey": "ground_loop_feasibility_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geotechnical, land-area, drilling, or loop-field information is supplied."
},
{
"inputKey": "conditioned_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Square footage is unknown, and agricultural acreage should not be treated as conditioned building area."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ground-source heat pump cost cannot be estimated without building load and loop-field design."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress ground-source estimates unless a conditioned building scope, engineering design, and quote are supplied.",
"Air-source heat pump HVAC is more realistic for the visitor-center portion of the site."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not a default recommended scope due to siting, interconnection, permitting, visitor-center aesthetics, and lack of wind-resource evidence.",
"inputFacts": [
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study, turbine siting analysis, or permitting evidence is supplied."
},
{
"inputKey": "proposed_turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity should remain unknown until a wind assessment and turbine model are selected."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small wind cost and eligibility depend on turbine model, tower, interconnection, and permitting."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate small-wind grant estimates without wind-resource data and site-permitting evidence.",
"PV and battery storage are more plausible near-term renewable scopes for this profile."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "nevi_project_type",
"value": "small_visitor_center_level_2_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic EV charging scope for this customer is Level 2 visitor/fleet charging, not a NEVI corridor DC fast-charging station."
},
{
"inputKey": "dc_fast_charging_ports_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No DC fast-charging project is supported by the supplied facts."
},
{
"inputKey": "public_agency_or_awarded_nevi_subrecipient",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No award, public-agency sponsorship, or subrecipient status is present."
},
{
"inputKey": "nevi_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is only at exploring stage and no application evidence exists."
},
{
"inputKey": "located_on_nevi_corridor_or_approved_exception",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Corridor or approved-exception status is not supplied."
},
{
"inputKey": "eligible_nevi_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "NEVI-eligible costs should not be estimated without a NEVI-compliant DC fast-charging scope and approved budget."
}
],
"reasoning": "Although the opportunity matched by geography and technology tags, the realistic project scope is small Level 2 charging for visitors and light fleet use. This should not be treated as a NEVI formula-grant deployment estimate unless the project is redesigned as a compliant DC fast-charging corridor project with agency approval."
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
"reasoning": "The supplied existing opportunity-specific input already suppresses Michigan Renewable Energy Renaissance Zone treatment because the site is in Hawaii."
}
],
"reasoning": "Out-of-state Michigan program should remain suppressed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "municipality",
"value": "Kalaheo, HI",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied existing opportunity-specific input already suppresses Rhode Island treatment because the site is in Hawaii."
}
],
"reasoning": "Out-of-state Rhode Island renewable property-tax valuation program should remain suppressed."
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
"reasoning": "The supplied existing opportunity-specific input already suppresses Washington solar-manufacturing B&O treatment."
}
],
"reasoning": "Out-of-state Washington solar-manufacturing tax treatment should remain suppressed."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "building_square_footage",
"reason": "needs user decision"
},
{
"inputKey": "property_owner_legal_name",
"reason": "needs user decision"
},
{
"inputKey": "landlord_or_owner_consent_document",
"reason": "source requires agency approval"
},
{
"inputKey": "contractor_quote_total_cents",
"reason": "quote not available"
},
{
"inputKey": "equipment_make_model_and_efficiency",
"reason": "quote not available"
},
{
"inputKey": "utility_interconnection_application_status",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_award_status",
"reason": "application not submitted"
},
{
"inputKey": "nevi_corridor_or_approved_exception_status",
"reason": "source requires agency approval"
},
{
"inputKey": "biomass_feedstock_tons_per_year",
"reason": "needs user decision"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "ground_source_loop_field_design",
"reason": "unrealistic for this customer"
},
{
"inputKey": "continuous_chp_thermal_load_profile",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"Do not force the Hawaii NEVI match to calculate for a small Level 2 visitor-center charging project; NEVI-style eligibility should require DC fast-charging corridor scope, agency award status, and approved budget.",
"Do not treat no piped gas as a natural-gas conversion opportunity; delivered propane or diesel backup, if present, is not equivalent to utility gas service.",
"Do not assume the agricultural estate owns the land or buildings until ownership and site-control documents are confirmed.",
"Do not treat the full coffee estate acreage as conditioned building area for HVAC, geothermal, or lighting estimates.",
"Do not calculate biomass, biogas, or CHP grants without feedstock quantity, fuel pathway, thermal load, permitting, and quote data.",
"Do not calculate small-wind grants without a wind-resource study, turbine model, permitting path, and interconnection status.",
"Do not apply nonprofit, public-sector, school, tribal, or residential-only incentives to this profile unless new applicant facts are supplied."
]
}

