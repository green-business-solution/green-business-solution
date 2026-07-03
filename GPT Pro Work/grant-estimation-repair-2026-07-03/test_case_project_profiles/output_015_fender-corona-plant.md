{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "fender-corona-plant",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for an industrial musical-instrument manufacturing plant in SCE electric and SoCalGas gas territory, using the supplied test-case facts and realistic planning assumptions. Source context: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_is_private_for_profit",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a private industrial manufacturing facility, not a public agency, nonprofit, school, tribal entity, or agricultural producer."
},
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A privately operated manufacturing plant would not normally claim public-entity eligibility."
},
{
"inputKey": "organization_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile describes a commercial industrial manufacturer."
},
{
"inputKey": "organization_is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is used for manufacturing, finishing, assembly, testing, warehousing, and distribution."
},
{
"inputKey": "organization_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "NAICS 339992 and the stated activity indicate musical-instrument manufacturing, not agriculture."
},
{
"inputKey": "organization_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate tribal ownership or tribal entity status."
},
{
"inputKey": "facility_customer_class",
"value": "industrial",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the facility as an industrial manufacturing plant."
},
{
"inputKey": "sce_customer_account_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The electric utility is self-reported and unverified; many utility incentives require a verified service account or bill."
},
{
"inputKey": "socalgas_customer_account_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile states SoCalGas service, but normalized utility data only confirms the electric utility candidate."
},
{
"inputKey": "site_control_status",
"value": "unknown_ownership_or_long_term_lease",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership status is explicitly listed as not sure, so project control should not be assumed."
},
{
"inputKey": "landlord_consent_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Unknown ownership creates uncertainty for roof, electrical service, drilling, and permanent equipment projects."
},
{
"inputKey": "annual_electric_kwh",
"value": 4540000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile already includes annual kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 77180000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile reports annual electric cost of $771,800."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 18880000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries report annual gas cost of $188,800."
},
{
"inputKey": "building_square_feet",
"value": 181593,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile parsed the supplied square footage."
},
{
"inputKey": "fleet_owner_or_operator",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A manufacturing and distribution facility of this size would plausibly operate light-duty service vehicles, sales pool cars, forklifts, yard equipment, or delivery support vehicles."
},
{
"inputKey": "fleet_currently_has_medium_or_heavy_duty_vehicle_replacement_plan",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case does not identify a dedicated freight fleet; assuming a large truck conversion would overstate clean-transportation grant readiness."
},
{
"inputKey": "disadvantaged_community_status_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Some California transportation incentives depend on community designations, but the normalized profile has no designations."
},
{
"inputKey": "project_procurement_stage",
"value": "early_scoping_no_vendor_quote",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring; no quote or application facts are supplied."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No grant application or award has been supplied, so competitive or application-based programs should not be treated as secured funding."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery storage for peak-demand management, ride-through resilience for critical production controls, and potential demand-response participation.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 500 kW system is a conservative industrial demand-management size relative to 4.54 GWh annual electric usage."
},
{
"inputKey": "battery_energy_kwh",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two-hour storage is a common preliminary sizing assumption for bill management and resilience screening."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost already present in the test case as a fixed admin-modeled input."
},
{
"inputKey": "resilience_critical_load_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Grant programs that require resilience benefits need evidence of critical loads, backup duration, or public-benefit use."
},
{
"inputKey": "interconnection_application_started",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection or utility application milestone is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Private industrial behind-the-meter storage is more likely to need utility tariff, SGIP-style, tax-credit, or demand-response analysis than a generic grant estimate.",
"Project cost appears unrealistically low for a 500 kW / 1,000 kWh turnkey installation, so quote data should be required before calculating incentive dollars."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy system screened but not a likely fit for musical-instrument manufacturing without a steady qualified organic waste or biogas fuel stream.",
"inputFacts": [
{
"inputKey": "onsite_biogenic_waste_stream_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Wood dust and manufacturing scrap may exist, but no supplied facts indicate a permitted biomass fuel supply or biogas resource."
},
{
"inputKey": "biogas_supply_contract_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A biogas project would require fuel supply documentation; none is present."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost, but this likely understates a real permitted industrial biomass energy project."
},
{
"inputKey": "air_permit_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion-based biomass or biogas energy systems commonly require air-permitting review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate a positive grant estimate unless a qualified fuel stream, equipment scope, and permitting path are provided.",
"This profile does not resemble a wastewater, landfill, agricultural, or organic-waste host site."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Workplace and light fleet charging at the manufacturing site, focused on employee charging and limited company-vehicle charging rather than public corridor fast charging.",
"inputFacts": [
{
"inputKey": "charger_project_use_case",
"value": "private_workplace_and_light_fleet_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A manufacturing plant would realistically install chargers for employees and company vehicles, not as a highway-corridor charging operator."
},
{
"inputKey": "level2_port_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight Level 2 ports is a conservative first-phase workplace charging deployment for a 251-1,000 employee facility."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No facts indicate a public fast-charging project, freight charging depot, or corridor charging host use case."
},
{
"inputKey": "charger_power_kw_per_level2_port",
"value": 7.2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "7.2 kW is a common planning assumption for commercial Level 2 charging ports."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview project cost already in the test case."
},
{
"inputKey": "public_access_required_or_planned",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a manufacturing plant, chargers would typically be behind employee or visitor parking controls unless the customer explicitly plans public access."
},
{
"inputKey": "charger_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No contractor quote, make-ready scope, panel capacity, or site plan is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could be relevant to broad California clean-transportation funding or utility make-ready programs.",
"Should not be treated as NEVI-ready because this scope is not public corridor DC fast charging.",
"Final estimate should require quote, site plan, charger type, public-access status, and application status."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump concept for office and conditioned production areas only; full-facility conversion is unlikely without a feasibility study.",
"inputFacts": [
{
"inputKey": "conditioned_area_square_feet",
"value": 45000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes only a portion of the industrial facility is office or actively space-conditioned."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 120,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Preliminary sizing for partial conditioned floor area; equipment survey is required."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost, but likely understates a real ground-loop installation for this scale."
},
{
"inputKey": "geotechnical_or_loop_field_feasibility_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No drilling, land availability, subsurface, or loop-field information is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Industrial tenant or ownership uncertainty makes drilling and permanent ground-loop improvements difficult to assume.",
"Require feasibility study and quote before estimating."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Natural-gas CHP screened for process reliability and thermal recovery, but not grant-ready because operating profile, emissions compliance, and thermal-load matching are unknown.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 750,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A preliminary 750 kW size is plausible for a multi-GWh industrial user but requires interval load data."
},
{
"inputKey": "useful_thermal_recovery_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP eligibility and economics depend heavily on coincident thermal demand."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost but likely needs a vendor budget and engineering scope."
},
{
"inputKey": "air_quality_permit_path_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "New combustion equipment in Southern California would require air-quality review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP may conflict with decarbonization-focused grant rules.",
"Suppress grant estimates unless a specific CHP program formula is present and emissions eligibility is confirmed."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal water-heating concept for limited domestic or process hot-water loads.",
"inputFacts": [
{
"inputKey": "solar_thermal_collector_area_square_feet",
"value": 600,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small preliminary collector area for a commercial domestic-hot-water or process preheat application."
},
{
"inputKey": "process_hot_water_load_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile indicates finishing and manufacturing but does not quantify hot-water or process-heat load."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview value, not a vendor quote."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should require hot-water load evidence and quote before calculating.",
"May be less realistic than electrification or process-efficiency measures for this customer."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Targeted replacement of aging packaged rooftop HVAC units serving offices, break rooms, and conditioned production support spaces.",
"inputFacts": [
{
"inputKey": "hvac_units_replaced_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial replacement of six units is plausible for an industrial building with offices and conditioned support areas."
},
{
"inputKey": "existing_equipment_type",
"value": "packaged_rooftop_units_mixed_gas_electric",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Common for Southern California commercial-industrial support spaces, but no equipment schedule is supplied."
},
{
"inputKey": "replacement_equipment_type",
"value": "high_efficiency_packaged_heat_pump_or_high_efficiency_rtu",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Efficiency-focused replacement could be either high-efficiency RTUs or heat-pump RTUs depending on site electrification goals."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost supplied by the test fixture."
},
{
"inputKey": "equipment_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Unit age, size, baseline efficiency, and proposed efficiency are required for most prescriptive or custom HVAC estimates."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"More likely to qualify for utility rebates or custom energy-efficiency incentives than competitive grants.",
"Do not calculate without equipment schedule, AHRI ratings, and quote."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Rooftop solar PV concept sized for partial onsite load offset on a large industrial roof, subject to roof control, structural capacity, and interconnection.",
"inputFacts": [
{
"inputKey": "solar_pv_system_kw_dc",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 1 MWdc system is plausible for a large industrial facility with 4.54 GWh annual consumption, assuming sufficient roof or canopy area."
},
{
"inputKey": "annual_pv_generation_kwh",
"value": 1550000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses a conservative Southern California planning yield of roughly 1,550 kWh per kWdc per year."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost but this appears far below typical turnkey cost for 1 MWdc; quote should be required."
},
{
"inputKey": "roof_condition_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No roof age, structural review, or landlord consent facts are supplied."
},
{
"inputKey": "interconnection_application_started",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large commercial PV normally requires interconnection review; no application status is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Private commercial solar is more likely to depend on tax-credit, tariff, and interconnection analysis than a grant estimate.",
"Suppress or flag incentive calculations if project cost is materially below realistic installed-cost ranges."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine screened but not a realistic fit for an urban industrial park manufacturing site.",
"inputFacts": [
{
"inputKey": "wind_turbine_capacity_kw",
"value": 100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A placeholder size for screening only; no wind resource or siting evidence supports it."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No hub-height wind analysis, zoning review, or open-land siting facts are supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost but should not be relied on without a wind feasibility study."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Urban industrial-park wind projects are usually constrained by wind resource, setbacks, zoning, noise, and turbulence.",
"Do not force a renewable-energy grant calculation for this measure."
]
},
{
"retrofitTypeId": "automated_demand_response_controls",
"projectScopeSummary": "Automated demand response controls integrating building management, compressed-air or process auxiliary loads, HVAC, and lighting controls to shed load during SCE events.",
"inputFacts": [
{
"inputKey": "demand_response_shed_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 250 kW controllable-load target is plausible for an industrial customer with 4.54 GWh annual use."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 212000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost already supplied."
},
{
"inputKey": "interval_meter_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Demand response calculations typically require interval load data and baseline methods."
},
{
"inputKey": "controls_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No controls scope, equipment list, or integration quote is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for utility demand-response or automated-load-shed incentives if SCE account, eligible shed, and controls scope are verified.",
"Estimate should be suppressed if the formula requires verified kW shed or program enrollment."
]
},
{
"retrofitTypeId": "electric_vehicle_purchase",
"projectScopeSummary": "Replacement of a small number of light-duty company vehicles with battery-electric vehicles; no heavy-duty fleet conversion assumed.",
"inputFacts": [
{
"inputKey": "ev_purchase_vehicle_class",
"value": "light_duty_company_vehicle",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A private manufacturer is more likely to begin with light-duty pool, sales, or site vehicles than heavy-duty truck replacement."
},
{
"inputKey": "ev_purchase_vehicle_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Three vehicles is a plausible pilot-scale fleet electrification purchase for a large facility."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost already supplied."
},
{
"inputKey": "existing_vehicle_replacement_or_scrappage_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Many fleet incentives depend on replacing or scrapping existing vehicles; no fleet inventory is supplied."
},
{
"inputKey": "purchase_order_or_signed_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No vehicle quote, purchase order, or delivery schedule is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Broad clean-transportation opportunities may be relevant, but many California vehicle programs are class-specific, income/community-specific, or application-based.",
"Do not assume heavy-duty, drayage, school-bus, transit, or public-fleet eligibility."
]
},
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "ASHRAE Level 2-style energy audit focused on industrial facility systems, lighting, HVAC, compressed air, process auxiliaries, and controls.",
"inputFacts": [
{
"inputKey": "audit_level",
"value": "ashrae_level_2_or_industrial_energy_assessment",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large process-heavy facility would realistically need a more detailed audit than a walkthrough."
},
{
"inputKey": "audit_cost_cents",
"value": 3500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $35,000 planning value is plausible for a 181,593 square foot industrial audit with process-system review."
},
{
"inputKey": "audit_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No audit proposal or scope is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some utility or state programs may support audits or technical assistance, but eligibility often depends on customer class, bill verification, and program availability.",
"Should remain unsupported if no calculation package exists."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Engineering study for process energy optimization, solar-plus-storage interconnection, demand response, and heat-recovery options.",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 6000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $60,000 feasibility study is plausible for a process-heavy industrial facility considering multiple capital projects."
},
{
"inputKey": "study_scope_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile lists possible retrofits but no detailed engineering study scope."
},
{
"inputKey": "study_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No vendor proposal or statement of work is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May be relevant where programs fund industrial assessments or feasibility studies.",
"Suppress formula estimates without eligible-cost and scope confirmation."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Targeted insulation and air-sealing improvements for office and conditioned production-support areas, not a full industrial-shell retrofit.",
"inputFacts": [
{
"inputKey": "insulation_area_square_feet",
"value": 20000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes a limited scope in conditioned areas rather than the full manufacturing footprint."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost, but this is likely too small for a meaningful industrial insulation project."
},
{
"inputKey": "existing_insulation_r_value_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Envelope incentive estimates require baseline and proposed R-values or assembly details."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Industrial envelope work is unlikely to be a standalone grant target.",
"More likely to be a minor utility rebate or custom energy-efficiency measure if documented."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small LED retrofit for remaining non-LED fixtures in selected production, warehouse, or support areas.",
"inputFacts": [
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview assumptions explicitly state 12 fixture replacements."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview project cost from the test case."
},
{
"inputKey": "lighting_hours_per_year",
"value": 3500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single-shift to extended-shift industrial support schedule is plausible."
},
{
"inputKey": "lighting_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fixture schedule or contractor quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A 12-fixture project is too small to be a realistic grant target for a large industrial customer.",
"Do not force qualification; route to rebate/custom-calculation logic only if a source-backed rule exists."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not a realistic primary project for this existing industrial manufacturing plant without a broader renovation or corporate certification initiative.",
"inputFacts": [
{
"inputKey": "leed_project_type",
"value": "none_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No major renovation, new construction, or certification scope is supplied."
},
{
"inputKey": "leed_certification_pursued",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "LEED is not naturally implied by the project list or stage."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress grant estimates unless the user provides a certification scope, registration status, and eligible soft costs."
]
},
{
"retrofitTypeId": "solar_plus_storage_system",
"projectScopeSummary": "Combined rooftop solar and battery storage concept for bill savings, resilience, and load management; early-stage only.",
"inputFacts": [
{
"inputKey": "solar_pv_system_kw_dc",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the standalone PV screening size."
},
{
"inputKey": "battery_power_kw",
"value": 500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the standalone battery screening size."
},
{
"inputKey": "battery_energy_kwh",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two-hour battery duration is a reasonable early screening assumption."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 13080000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview value but likely understates a combined 1 MWdc PV plus 500 kW / 1,000 kWh storage project."
},
{
"inputKey": "single_integrated_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No integrated system quote, interconnection study, roof review, or operating strategy is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potential incentives may exist, but grant calculation should be suppressed until realistic installed cost, ownership model, interconnection, and site-control facts are known.",
"Do not double-count standalone solar and standalone storage incentives unless program rules allow stacking."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "nevi_project_is_public_dc_fast_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The realistic charger scope is workplace and light fleet Level 2 charging, not public corridor DC fast charging."
},
{
"inputKey": "nevi_dcfc_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No DC fast charging scope is present."
},
{
"inputKey": "nevi_public_access_24_7",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A private industrial plant would normally not provide unrestricted 24/7 public charging."
},
{
"inputKey": "nevi_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No application status is provided."
}
],
"reasoning": "Although the geography matches California, the realistic project scope does not match a NEVI-style public fast-charging corridor project. Suppress rather than calculate."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "clean_transportation_project_category",
"value": "workplace_charging_and_light_duty_fleet_pilot",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The likely scope combines eight Level 2 charging ports and three light-duty company EVs."
},
{
"inputKey": "clean_transportation_eligible_cost_cents",
"value": 9848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combines the EV charger preview cost of $8,480 and EV purchase preview cost of $90,000 where the program can consider both categories."
},
{
"inputKey": "clean_transportation_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No application, solicitation, award, or reservation fact is supplied."
},
{
"inputKey": "clean_transportation_vendor_quotes_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No charger or vehicle quotes are present."
},
{
"inputKey": "clean_transportation_disadvantaged_community_or_priority_population_status",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No location designation is included in the normalized profile."
}
],
"reasoning": "Broadly relevant to clean transportation, but the grant estimate should require solicitation-specific scope, application status, quotes, vehicle class, and any priority-population facts."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "signed_contractor_quote_by_retrofit",
"reason": "quote not available"
},
{
"inputKey": "grant_application_or_reservation_number",
"reason": "application not submitted"
},
{
"inputKey": "agency_preapproval_or_award_status",
"reason": "source requires agency approval"
},
{
"inputKey": "landlord_or_property_owner_consent",
"reason": "needs user decision"
},
{
"inputKey": "roof_structural_capacity_for_solar",
"reason": "needs user decision"
},
{
"inputKey": "utility_account_number_or_recent_sce_bill",
"reason": "needs user decision"
},
{
"inputKey": "socalgas_account_number_or_recent_gas_bill",
"reason": "needs user decision"
},
{
"inputKey": "interval_load_data_15_minute_or_hourly",
"reason": "needs user decision"
},
{
"inputKey": "fleet_inventory_with_vin_model_year_and_fuel_type",
"reason": "needs user decision"
},
{
"inputKey": "ev_vehicle_purchase_order",
"reason": "quote not available"
},
{
"inputKey": "dc_fast_charging_public_access_site_plan",
"reason": "unrealistic for this customer"
},
{
"inputKey": "qualified_biogas_or_biomass_fuel_supply_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "leed_registration_or_certification_scope",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The organization is a private for-profit industrial manufacturer, so public-sector, nonprofit, school, tribal, agricultural, and residential programs should be blocked unless the source rule explicitly allows this applicant type.",
"The project is in the exploring stage with no vendor quotes, purchase orders, interconnection applications, or grant applications.",
"NEVI should not be calculated for the realistic charger scope because the project is workplace/light-fleet Level 2 charging rather than public corridor DC fast charging.",
"Rooftop solar, storage, and solar-plus-storage may be economically relevant, but ownership, roof condition, interconnection, and realistic installed cost are not established.",
"Biomass, biogas, small wind, geothermal, CHP, and LEED are not naturally supported by the supplied manufacturing profile and should not be made to qualify merely to produce a positive estimate.",
"Small lighting and insulation scopes are more plausible as minor rebate or operational-efficiency projects than grant-funded projects.",
"Any program requiring disadvantaged-community, priority-population, verified utility account, or agency preapproval facts should remain uncertain or suppressed until those facts are confirmed."
]
}

