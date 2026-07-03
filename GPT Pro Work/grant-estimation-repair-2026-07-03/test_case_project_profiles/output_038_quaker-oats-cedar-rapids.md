{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "quaker-oats-cedar-rapids",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment for a large owner-occupied Cedar Rapids industrial food manufacturing and grain milling facility served by Alliant Energy / Interstate Power and Light. Inputs are intended to let grant-estimation tests calculate, suppress, or flag uncertainty appropriately; they are not source research for incentive formulas. The current test-case facts identify a 1,900,000 sq ft industrial plant with heavy process, dust collection, steam, compressed-air, motor, water, sewer, and waste loads. Source prompt: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "large_industrial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A 1.9 million sq ft food manufacturing and grain milling site with 241.3 million annual kWh would normally be treated as a large industrial account rather than small commercial."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case identifies a privately operated industrial manufacturing facility, not a nonprofit applicant."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an industrial food manufacturing plant rather than a municipal, county, state, or federal facility."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building use is industrial manufacturing, not K-12, higher education, or campus housing."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, tribal utility, or tribal land facts are present in the test case; defaulting to false prevents tribal-only grants from being forced."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Although the facility processes agricultural commodities, the customer profile is a food manufacturing and grain milling plant, not a farm or primary agricultural producer."
},
{
"inputKey": "is_food_manufacturer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Primary activities include oat milling, cereal production, packaging, and process operations."
},
{
"inputKey": "is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization size is 251-1,000 employees and the facility is in Cedar Rapids, so small-business-only rural programs should not be assumed."
},
{
"inputKey": "facility_ownership_control",
"value": "owner_occupied_industrial_facility",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case lists ownership status as Own and ownershipRelationship as owner."
},
{
"inputKey": "landlord_tenant_split_incentive_risk",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Owner occupancy means landlord consent and tenant split-incentive constraints should generally not block capital projects."
},
{
"inputKey": "electric_utility_customer_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Alliant is self-reported and unverified in the test case; utility-specific incentives should require account or tariff confirmation before final calculation."
},
{
"inputKey": "gas_utility_customer_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Gas provider is listed as Alliant / Interstate Power and Light, but no account-level gas tariff proof is included."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The current test case explicitly marks the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_rfp_no_quotes",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploratory and no vendor quote data is present, so quote-dependent grants and utility custom incentives should remain suppressed."
},
{
"inputKey": "preapproval_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted or approved incentive application is present in the test case."
},
{
"inputKey": "has_completed_recent_energy_audit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No ASHRAE audit, industrial assessment, or engineering study is included; many industrial grant pathways would need this."
},
{
"inputKey": "has_measure_level_m_and_v_plan",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No measurement and verification plan is provided, which should prevent performance-based grant estimates from being overconfident."
},
{
"inputKey": "annual_kwh",
"value": 241300000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric consumption is already present in the site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 2104790000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric cost is already present as $21,047,900."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 2259300000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is already present as $22,593,000."
},
{
"inputKey": "estimated_annual_therms",
"value": 18827500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic estimate using annual gas cost and an assumed blended industrial gas cost of about $1.20/therm; actual bills should override."
},
{
"inputKey": "has_process_steam_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description explicitly mentions steam loads."
},
{
"inputKey": "has_dust_collection_loads",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The current test case identifies dust collection as a major process load."
},
{
"inputKey": "has_compressed_air_system",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large cereal and packaging plants typically have compressed air; the test notes also mention compressed air."
},
{
"inputKey": "has_large_motor_loads",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case notes motors and process loads, which are realistic major electric loads for milling and material handling."
},
{
"inputKey": "estimated_peak_kw",
"value": 36500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic demand estimate based on 241.3 GWh annual usage and a high industrial load factor; monthly demand bills should override."
},
{
"inputKey": "site_has_space_for_large_ground_mount_solar_or_wind",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The downtown Cedar Rapids industrial site is more likely constrained by existing buildings, rail/logistics, and operations than by available open land."
},
{
"inputKey": "site_has_large_roof_area",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building is reported as 1.9 million sq ft under roof, but structural capacity, roof age, and usable roof area remain unknown."
},
{
"inputKey": "roof_structural_capacity_confirmed_for_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large roof area alone is not enough to calculate solar grants; structural review and electrical interconnection constraints are missing."
},
{
"inputKey": "has_on_site_biomass_or_organic_residue_stream",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grain milling and cereal plant plausibly has oat hulls, fines, screenings, wastewater organics, or other process byproduct streams."
},
{
"inputKey": "biomass_fuel_contract_or_waste_characterization_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fuel availability study, waste characterization, or byproduct contract has been supplied."
},
{
"inputKey": "fleet_owner",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large manufacturing site plausibly operates yard trucks, forklifts, or light-duty maintenance vehicles, but no fleet inventory is provided."
},
{
"inputKey": "ev_charger_project_in_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No EV charging retrofit appears in the test-case retrofit summaries, so charger-specific grants should not be forced into this profile."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Conceptual anaerobic digestion or biomass boiler pre-feasibility project using plant organic byproducts and/or wastewater organics to offset a portion of process steam or gas use. Scope is plausible but not yet defined enough for most grants.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large industrial biomass or biogas systems are highly site-specific; no vendor budget or engineering estimate is present."
},
{
"inputKey": "conceptual_budget_cents",
"value": 1850000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning placeholder for a medium industrial renewable thermal/process-energy system; should not be treated as grant-eligible cost without a quote."
},
{
"inputKey": "system_type",
"value": "industrial_biomass_or_biogas_process_heat",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Process steam and organic byproduct streams make process heat a more plausible use case than small renewable electricity."
},
{
"inputKey": "thermal_capacity_mmbtu_per_hour",
"value": 60,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 60 MMBtu/hr conceptual system would offset only part of a large industrial gas load; final capacity requires steam profile and fuel analysis."
},
{
"inputKey": "estimated_annual_gas_therm_offset",
"value": 3800000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic offset equal to roughly 20 percent of the estimated annual gas load; needs feasibility study."
},
{
"inputKey": "feedstock_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fuel quantity, moisture, handling, competing use, or wastewater organic loading data is present."
},
{
"inputKey": "air_permit_review_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Combustion or renewable gas equipment at this scale would normally need environmental and air-permitting review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely needs engineering feasibility, emissions review, feedstock characterization, and a vendor quote before any grant estimate should calculate.",
"Agricultural-producer-only grants should not apply unless the program explicitly allows food processors or manufacturers.",
"Do not use the $90,000 existing preview cost as eligible cost because it is not realistic for this scale of industrial biomass or biogas work."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Limited geothermal heat pump concept for offices, labs, and welfare spaces rather than primary manufacturing process heat. Full-site geothermal is unrealistic for a heavy steam-load industrial plant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Geothermal cost depends on loop field, drilling, building areas served, hydronic distribution, and controls; the current preview cost is not adequate."
},
{
"inputKey": "conditioned_area_served_sqft",
"value": 85000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic estimate for administrative, QA lab, locker, and support areas only, not the full 1.9 million sq ft manufacturing footprint."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 320,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Approximate capacity for a limited conditioned-space retrofit; full design load calculation is missing."
},
{
"inputKey": "loop_type",
"value": "unknown",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No borefield, well, pond, or hybrid heat rejection design is provided."
},
{
"inputKey": "serves_process_heat",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Geothermal heat pumps are unlikely to cover high-temperature process steam loads at this facility."
},
{
"inputKey": "requires_geotechnical_review",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Any ground-source system at an industrial urban site would need subsurface, utilities, and constructability review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May qualify for some commercial HVAC or tax-credit style programs only if the scope is real and properly costed.",
"Should not be modeled as a full-site decarbonization grant without detailed thermal load data.",
"Quote and design data should be required before calculating grant dollars."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replacement of aging rooftop units, make-up air components, and packaged HVAC serving administrative, QA, breakroom, locker, and packaging support areas, excluding process ventilation and dust collection.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 165000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning budget for a partial industrial support-space HVAC replacement; actual utility incentives should use quotes and equipment schedules."
},
{
"inputKey": "hvac_units_replaced",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large industrial plant would plausibly have multiple packaged units and air handlers serving non-process spaces."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 540,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic aggregate for selected office/support HVAC units only; load calculations and equipment schedules are missing."
},
{
"inputKey": "selected_measure_type",
"value": "high_efficiency_packaged_rooftop_units_and_controls",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Packaged HVAC and controls are realistic for office/support areas within a manufacturing site."
},
{
"inputKey": "baseline_equipment_age_years",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic age assumption for planning; should be replaced by asset registry or nameplate data."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 1450000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Modest savings relative to total plant electricity because HVAC is not the dominant load."
},
{
"inputKey": "preapproval_required_before_purchase",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Many utility custom or prescriptive HVAC incentives require preapproval before purchase or installation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely utility rebate candidate if equipment efficiency, baseline, customer class, and preapproval requirements are met.",
"Grant estimates should be suppressed or marked preliminary until equipment schedule and quote are supplied."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Large interior LED high-bay and production-area lighting conversion for warehouse, milling, packaging, and circulation spaces. The existing 12-fixture preview is intentionally too small for this facility and should be overridden for realistic test coverage.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 185000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic cost for a major industrial high-bay and production lighting retrofit across a subset of the 1.9 million sq ft site."
},
{
"inputKey": "interior_fixtures_replaced",
"value": 6200,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large manufacturing and warehouse facility plausibly has thousands of high-bay, strip, and task fixtures."
},
{
"inputKey": "average_existing_fixture_watts",
"value": 410,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic baseline for legacy HID, fluorescent high-bay, and industrial fixtures."
},
{
"inputKey": "average_new_fixture_watts",
"value": 185,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic efficient LED average for mixed industrial fixture types."
},
{
"inputKey": "annual_operating_hours",
"value": 6500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large food manufacturing and packaging operations often have extended shifts; exact schedules should be verified."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "High-bay LEDs with occupancy/daylight controls are a common industrial lighting scope."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 10800000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Order-of-magnitude estimate from fixture count, wattage reduction, operating hours, and controls factor."
},
{
"inputKey": "preapproval_required_before_purchase",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Utility lighting incentives commonly require preapproval, DLC/qualified product verification, or documentation before installation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely one of the strongest utility-incentive candidates for this profile if Alliant eligibility and preapproval are confirmed.",
"Do not use the existing 12-fixture preview as a realistic project size for this plant.",
"Final calculation needs fixture schedule, baseline wattages, new fixture specs, and installation status."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Industrial natural-gas CHP feasibility concept sized to serve continuous electric load and recover heat for process steam or hot water. This is plausible for a large food plant but requires detailed utility, emissions, interconnection, and thermal-load analysis.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "CHP capital cost depends on engine/turbine selection, heat recovery, electrical interconnection, emissions controls, and boiler integration."
},
{
"inputKey": "conceptual_budget_cents",
"value": 2450000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic concept budget for multi-MW industrial CHP; not appropriate as a grant-eligible cost without quote and scope."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 9000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 9 MW system is materially smaller than estimated peak demand and could operate as baseload, but actual sizing requires interval data."
},
{
"inputKey": "heat_recovery_use",
"value": "process_steam_or_boiler_feedwater_preheat",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The plant has steam and process heat loads that could potentially use recovered heat."
},
{
"inputKey": "estimated_annual_generation_kwh",
"value": 67500000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes high annual operating hours for a baseload industrial CHP concept."
},
{
"inputKey": "grid_export_expected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Facility demand is large enough that CHP would likely be sized for on-site use rather than export."
},
{
"inputKey": "interconnection_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No interconnection study is included; CHP incentives should not calculate as firm without it."
},
{
"inputKey": "emissions_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large combustion equipment would require permitting review before project viability is known."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP may not qualify for renewable-energy grants unless program rules explicitly include high-efficiency CHP.",
"Utility incentives, if any, would likely be custom and require preapproval, engineering analysis, and avoided energy documentation.",
"Grant calculation should remain suppressed until quote, interconnection, emissions, and thermal recovery assumptions are available."
]
},
{
"retrofitTypeId": "energy_management_system",
"projectScopeSummary": "Plant-wide energy management system upgrade integrating submetering, compressed-air monitoring, boiler/steam metering, lighting controls, HVAC scheduling, demand analytics, and production-normalized dashboards.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 145000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning budget for industrial metering, controls integration, software, and commissioning."
},
{
"inputKey": "meters_or_points_added",
"value": 210,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large industrial site could support hundreds of monitored points across major systems."
},
{
"inputKey": "compressed_air_monitoring_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Compressed air is identified in the test notes and is a typical industrial monitoring target."
},
{
"inputKey": "steam_metering_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Steam loads are listed in the current test case."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 4800000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes modest operational savings relative to total electric use from improved controls and fault detection."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 350000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic operational gas savings from steam/boiler monitoring and scheduling; requires M&V."
},
{
"inputKey": "m_and_v_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No measurement and verification plan is present, so performance-based estimates should remain uncertain."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for custom utility incentives if savings are documented and preapproved.",
"Grant formulas based on verified kWh or therm savings should require engineering calculations and M&V plan."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Industrial energy assessment and feasibility study covering steam systems, boilers, heat recovery, compressed air, dust collection fans, process motors, lighting, CHP, biomass/biogas, and controls.",
"inputFacts": [
{
"inputKey": "audit_study_cost_cents",
"value": 22500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A comprehensive industrial feasibility study for a very large food manufacturing plant could reasonably cost several hundred thousand dollars."
},
{
"inputKey": "study_type",
"value": "industrial_energy_feasibility_study",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility has multiple complex process and utility systems that justify an industrial study rather than a basic building audit."
},
{
"inputKey": "includes_process_heat_analysis",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Steam and gas loads are large enough that process heat analysis is central to project scoping."
},
{
"inputKey": "includes_compressed_air_leak_study",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Compressed-air savings are a common industrial assessment measure and match the test-case notes."
},
{
"inputKey": "includes_utility_interval_data_review",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Interval data is necessary to evaluate CHP, demand controls, and process-load measures."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No study vendor, proposal, or purchase order is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some audit/study incentives may cover a portion of study cost if the utility approves scope before work begins.",
"Estimate should require study proposal or utility program confirmation if formula depends on approved study cost."
]
},
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"projectScopeSummary": "Exterior LED retrofit for loading docks, truck courts, employee parking, rail/service yards, building-mounted security lighting, and perimeter areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 26000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic budget for exterior luminaires, poles or mounts, controls, lifts, and installation at a large industrial site."
},
{
"inputKey": "exterior_fixtures_replaced",
"value": 420,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large production, warehouse, loading, and parking site could plausibly have several hundred exterior lights."
},
{
"inputKey": "average_existing_fixture_watts",
"value": 360,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic baseline for metal halide, high-pressure sodium, or older wall-pack fixtures."
},
{
"inputKey": "average_new_fixture_watts",
"value": 125,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic efficient LED average for wall packs, area lights, and dock lights."
},
{
"inputKey": "annual_operating_hours",
"value": 4380,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Dusk-to-dawn exterior lighting commonly operates around half the year in hourly terms."
},
{
"inputKey": "networked_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Scheduling, photocells, and motion dimming are common for exterior LED upgrades."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 390000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Order-of-magnitude savings based on fixture count, wattage reduction, and operating hours."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely utility lighting rebate candidate if product eligibility, preapproval, and baseline wattage documentation are available.",
"Final grant estimate should require fixture schedule and installation status."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Air-source heat pump retrofit for selected offices, QA labs, locker rooms, and employee areas where electrification is practical, not for process steam or full production-space heating.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 240000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic budget for a partial support-space heat pump conversion at a large industrial facility."
},
{
"inputKey": "heat_pump_units",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Multiple packaged or split heat pump units are realistic for segmented office and support areas."
},
{
"inputKey": "total_heat_pump_capacity_tons",
"value": 720,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic capacity for a limited subset of conditioned space."
},
{
"inputKey": "replaces_natural_gas_space_heat",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Support-space heating at a gas-served industrial facility plausibly uses gas-fired rooftop units or make-up air equipment."
},
{
"inputKey": "serves_process_steam_loads",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Air-source HVAC heat pumps should not be assumed to replace industrial process steam loads."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 180000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic gas savings from support-space electrification; actual baseline and weather-normalized consumption are missing."
},
{
"inputKey": "annual_kwh_increase_estimate",
"value": 1150000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrification would increase site electricity use while reducing gas; net energy and carbon effects require modeling."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Potentially eligible for commercial heat pump incentives if the program covers large industrial customers and replacement conditions are met.",
"Should not be modeled as a full industrial decarbonization project without process-heat scope."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine is not a realistic project for this urban industrial food manufacturing site because siting, zoning, structural, aviation, and interconnection issues would likely dominate.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No actual wind project scope exists; cost should remain unknown."
},
{
"inputKey": "wind_turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No turbine size has been selected."
},
{
"inputKey": "site_suitable_for_wind",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Urban industrial siting is generally not favorable for small wind compared with rural or open sites."
},
{
"inputKey": "zoning_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No zoning or permitting review is included."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study or hub-height wind data is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force small wind qualification for this profile.",
"Suppress grant estimates unless the user provides a real wind project scope, site review, and interconnection path."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Limited solar thermal preheat concept for domestic/process hot water washdown or sanitation support, not a primary replacement for plant process steam.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Solar thermal sizing and cost depend on load profile, storage, roof area, freeze protection, and integration design."
},
{
"inputKey": "conceptual_budget_cents",
"value": 145000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning placeholder for a commercial/industrial solar thermal preheat system; not enough for final grant calculation."
},
{
"inputKey": "collector_area_sqft",
"value": 14500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conceptual collector area for a limited preheat application; usable roof area and structural review are unknown."
},
{
"inputKey": "storage_gallons",
"value": 60000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic storage size for process/domestic hot water preheat; load profile must be verified."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 120000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small fraction of estimated gas use; solar thermal would not address most process steam needs."
},
{
"inputKey": "roof_structural_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large roof area is present, but no structural or roof condition review has been provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Technically plausible but unlikely to be the priority grant project for this industrial process-load profile.",
"Suppress final estimate until load profile, roof review, and vendor quote are available."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "ALLIANT_CUSTOM_ELECTRIC_EFFICIENCY_REBATE",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_class_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Utility name is self-reported but not account-verified."
},
{
"inputKey": "preapproval_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval record is present."
},
{
"inputKey": "eligible_retrofit_type_ids",
"value": [
"led_lighting_retrofit",
"exterior_site_lighting_retrofit",
"high_efficiency_hvac_replacement",
"energy_management_system"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are the most plausible electric efficiency scopes for a large industrial utility program."
}
],
"reasoning": "Likely relevant to the profile, but most custom utility programs need equipment schedules, baseline, savings calculations, customer class, and preapproval before final dollars are calculated."
},
{
"opportunityId": "ALLIANT_CUSTOM_GAS_EFFICIENCY_REBATE",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "gas_account_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Gas utility is listed but unverified by bill or account."
},
{
"inputKey": "eligible_retrofit_type_ids",
"value": [
"energy_management_system",
"heat_pump_hvac_retrofit",
"solar_water_heating_system",
"biomass_biogas_energy_system"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings may be relevant, but program coverage for process, renewable thermal, or electrification should not be assumed."
}
],
"reasoning": "Gas savings opportunities are large, but incentive handling should remain conservative because process-gas measures, renewable thermal, and fuel switching often have specialized eligibility rules."
},
{
"opportunityId": "INDUSTRIAL_ENERGY_ASSESSMENT_OR_STUDY_INCENTIVE",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 22500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic study budget is included for test-case planning."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No engineering proposal is available."
},
{
"inputKey": "agency_or_utility_approval_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Study incentives often require approval before study work begins."
}
],
"reasoning": "The project profile is well-suited to an industrial feasibility study, but the estimate should require approval/application status if the opportunity reimburses only approved studies."
},
{
"opportunityId": "USDA_REAP_RENEWABLE_ENERGY_OR_EFFICIENCY_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a food manufacturer and grain mill, not a primary farm producer."
},
{
"inputKey": "is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is not small and the location is an urban industrial facility."
}
],
"reasoning": "Do not force USDA-style rural small business or agricultural producer qualification for this large urban industrial manufacturer unless explicit program rules and ownership facts support it."
},
{
"opportunityId": "FEDERAL_OR_STATE_PUBLIC_SECTOR_BUILDING_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a private industrial facility."
},
{
"inputKey": "building_use",
"value": "industrial_manufacturing",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is not a public building, school, or municipal facility."
}
],
"reasoning": "Public-sector building, school, and municipal grant programs should be suppressed."
},
{
"opportunityId": "TRIBAL_ENERGY_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal land facts are present."
}
],
"reasoning": "Tribal-only opportunities are not relevant to this profile unless the user supplies contrary ownership or land-control facts."
},
{
"opportunityId": "RESIDENTIAL_OR_MULTIFAMILY_ENERGY_GRANT",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "building_type",
"value": "industrial_manufacturing",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The current test case already identifies an industrial manufacturing building type."
}
],
"reasoning": "Residential, multifamily, and homeowner programs should remain blocked."
},
{
"opportunityId": "SMALL_WIND_RENEWABLE_ENERGY_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "site_suitable_for_wind",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Urban industrial siting is not a strong fit for small wind."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study is present."
}
],
"reasoning": "Do not calculate small-wind grant estimates for this profile without a real project scope and site analysis."
},
{
"opportunityId": "RENEWABLE_THERMAL_OR_BIOMASS_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "has_on_site_biomass_or_organic_residue_stream",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Food manufacturing and milling can produce organic byproducts."
},
{
"inputKey": "feedstock_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feedstock characterization or fuel contract exists."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A quote and feasibility study are required before eligible cost can be trusted."
}
],
"reasoning": "Biomass or biogas is plausible but highly uncertain. Handle as a project-scope-needed opportunity rather than automatically calculating a grant."
},
{
"opportunityId": "CHP_OR_RESILIENCY_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 9000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conceptual sizing only."
},
{
"inputKey": "interconnection_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Interconnection requirements are not available."
},
{
"inputKey": "emissions_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Permitting feasibility is not established."
}
],
"reasoning": "CHP is a credible industrial concept but should not be treated as formula-ready without engineering and regulatory review."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "account_number_masked",
"reason": "needs user decision"
},
{
"inputKey": "rate_schedule",
"reason": "quote not available"
},
{
"inputKey": "gas_rate_schedule",
"reason": "quote not available"
},
{
"inputKey": "monthly_peak_kw",
"reason": "quote not available"
},
{
"inputKey": "monthly_kwh",
"reason": "quote not available"
},
{
"inputKey": "monthly_therms",
"reason": "quote not available"
},
{
"inputKey": "equipment_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "vendor_quote_file",
"reason": "quote not available"
},
{
"inputKey": "preapproval_application_id",
"reason": "application not submitted"
},
{
"inputKey": "preapproval_approval_date",
"reason": "application not submitted"
},
{
"inputKey": "agency_award_probability",
"reason": "source requires agency approval"
},
{
"inputKey": "roof_structural_engineer_letter",
"reason": "quote not available"
},
{
"inputKey": "interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "air_permit_determination",
"reason": "source requires agency approval"
},
{
"inputKey": "biomass_feedstock_characterization_report",
"reason": "quote not available"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "fleet_ev_charger_ports",
"reason": "unrealistic for this customer"
},
{
"inputKey": "school_district_identifier",
"reason": "unrealistic for this customer"
},
{
"inputKey": "tribal_entity_identifier",
"reason": "unrealistic for this customer"
},
{
"inputKey": "nonprofit_tax_exemption_status",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The profile is a large private industrial manufacturing facility, so residential, multifamily, school, nonprofit, municipal, tribal, and public-sector grants should not be matched unless separate facts prove eligibility.",
"The facility processes agricultural commodities but should not automatically be treated as an agricultural producer or rural small business.",
"The project is exploratory with no RFP, quotes, preapproval applications, interconnection studies, air-permit review, or engineering feasibility results.",
"Existing preview costs for some retrofits are admin placeholders and are too small for realistic industrial grant calculations.",
"Biomass, biogas, CHP, geothermal, solar thermal, and small wind should not be forced positive solely because the plant is energy-intensive.",
"Lighting, exterior lighting, selected HVAC, heat pumps for support areas, controls, and engineering studies are plausible, but final grant estimates should still require measure-specific documentation and utility preapproval where applicable.",
"Do not assume roof-mounted renewable projects qualify based only on total square footage; roof age, structural capacity, interconnection limits, usable roof area, and operational constraints are missing.",
"Do not calculate probability-weighted competitive grant awards because no application, scoring evidence, agency review, or award history is available."
]
}

