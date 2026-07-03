{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "melissas-vernon-distribution",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-estimation profile for a large private refrigerated produce distribution, cold-storage, office, warehouse, and organic-packing facility in Vernon, CA, based on the supplied test-case context. The record intentionally distinguishes realistic operational projects from grants that should be suppressed because the site is not a school-bus location, not a public charging corridor host, not a public entity, and has no quote or application approval evidence. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_legal_status",
"value": "private_for_profit_company",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied company and organization type indicate a private industrial facility, not a public entity, nonprofit, school, tribal entity, or utility."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A private produce distributor would not normally qualify as a public agency applicant."
},
{
"inputKey": "is_school_or_school_district",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an industrial produce distribution and packing facility, not an education campus."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, control, or affiliation is indicated in the test case."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility receives, cools, packs, stores, and distributes produce. It is plausibly food-sector and agriculture-adjacent, but not itself a farming operation or primary producer."
},
{
"inputKey": "is_food_processing_or_cold_storage_facility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity includes receiving, cooling, packing, storing, and distributing refrigerated produce and food."
},
{
"inputKey": "owns_or_controls_project_site",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership status is marked 'Not sure.' Large capital projects should require evidence of owner consent or site control."
},
{
"inputKey": "tenant_landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Because ownership/control is unknown, grant estimates for rooftop, electrical-service, battery, HVAC, and geothermal projects should assume landlord or owner approval may be required."
},
{
"inputKey": "electric_utility_customer_class",
"value": "large_commercial_or_industrial",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual electric use of 12.04 million kWh and refrigerated warehouse operations are consistent with a large commercial or industrial customer."
},
{
"inputKey": "gas_utility_customer_class",
"value": "large_commercial_or_industrial",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is significant but secondary to electric refrigeration loads."
},
{
"inputKey": "has_refrigerated_warehouse_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description and primary activity identify refrigerated produce storage and cooling."
},
{
"inputKey": "estimated_peak_kw",
"value": 2250,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large 280,000-square-foot refrigerated facility with 12.04 million annual kWh could plausibly have a peak demand around 2 MW to 2.5 MW."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The current test case marks the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_rfp_budgeting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote, RFP, engineering study, or selected contractor is present. The profile should behave like an early budgeting record."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application evidence is provided. Competitive grants that depend on award status should not assume submission or award."
},
{
"inputKey": "grant_award_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No agency award, reservation, notice of proposed award, or voucher approval is provided."
},
{
"inputKey": "disadvantaged_community_or_priority_population_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is in Vernon, CA, but no verified census-tract or program-specific priority-population designation is present."
},
{
"inputKey": "fleet_owner_or_operator",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A produce distribution facility likely operates or hosts delivery trucks, yard equipment, vendor trailers, and employee vehicles, but fleet ownership should remain overrideable."
},
{
"inputKey": "public_ev_charging_intent",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A refrigerated distribution yard would normally install fleet, employee, or vendor charging rather than public community charging."
},
{
"inputKey": "school_bus_charging_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is not a school-bus depot or school transportation facility."
},
{
"inputKey": "onsite_backup_power_need",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cold storage and refrigerated food operations have a credible resilience need to protect inventory during outages."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install a modest private-use charging depot for employee vehicles, sales fleet vehicles, and a small number of electric delivery or yard-support vehicles. The scope is not configured as public community charging or school-bus charging.",
"inputFacts": [
{
"inputKey": "charger_use_case",
"value": "private_fleet_and_employee_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Fleet and employee charging is realistic for a distribution facility; public corridor charging is not assumed."
},
{
"inputKey": "level_2_port_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Six Level 2 ports is a plausible early-stage site deployment for employee and light-duty fleet vehicles."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No evidence supports a public or heavy-duty DC fast-charging project at this stage."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost as a placeholder only. A real estimate should require a contractor quote and utility service review."
},
{
"inputKey": "utility_make_ready_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Even a small multi-port charging project at an industrial site may require panel, trenching, transformer, or make-ready work."
},
{
"inputKey": "public_accessible_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A secure produce warehouse and distribution yard would normally restrict access."
},
{
"inputKey": "school_bus_port_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No school-bus use case exists for this customer."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Private-use charging may qualify for some commercial EV infrastructure incentives, but the matched RECESS school-bus opportunity should be treated as ineligible.",
"NEVI and community-charging solicitations should be suppressed unless the project scope changes to public charging at an eligible location with corridor/community requirements satisfied.",
"A quote and load-service study are needed before calculating any site-specific grant amount."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install behind-the-meter battery storage sized for demand management and short-duration resilience for refrigeration controls, critical dock operations, IT, and selected cold-room loads rather than whole-site backup.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 750,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 750 kW battery is a conservative partial-site size compared with an estimated 2,250 kW peak demand."
},
{
"inputKey": "battery_energy_kwh",
"value": 3000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 4-hour 750 kW system is plausible for demand-charge management and short-duration refrigeration resilience."
},
{
"inputKey": "critical_load_kw_supported",
"value": 650,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical loads would likely include refrigeration controls, selected compressors, docks, lighting, controls, and IT, not the entire facility."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost placeholder. Final eligibility should require vendor quote, single-line diagram, interconnection cost, and eligible-cost breakout."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No interconnection application or utility preapproval is present."
},
{
"inputKey": "resilience_use_case",
"value": "cold_storage_inventory_protection",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cold storage operations create a realistic business case for resilience."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some battery grants may require disadvantaged-community, critical-facility, public-sector, or resilience-program criteria not proven here.",
"Calculation should be suppressed where a program requires an executed interconnection application, energy storage quote, or agency reservation."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Evaluate a cold-storage resilience microgrid combining battery storage, controls, transfer equipment, and possible future solar. The project is conceptual and should require engineering before grant calculation.",
"inputFacts": [
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A genuine microgrid scope requires controls, islanding, and protection equipment rather than just a battery."
},
{
"inputKey": "islanding_capability_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Cold-storage resilience implies islanding or transfer capability during outages."
},
{
"inputKey": "critical_load_kw",
"value": 900,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical load sizing is uncertain without refrigeration equipment schedules and load studies."
},
{
"inputKey": "estimated_engineering_study_cost_cents",
"value": 18500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A feasibility and interconnection study budget is realistic before a multimillion-dollar microgrid procurement."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing preview cost is a placeholder and should not be treated as a grant-ready eligible-cost basis."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A private cold-storage microgrid can be plausible, but many microgrid grants favor public, community, disadvantaged-community, or critical public-service facilities.",
"Suppress grant amount unless a specific program accepts private industrial cold-storage resilience projects and the project has engineering documentation."
]
},
{
"retrofitTypeId": "solar_plus_storage_system",
"projectScopeSummary": "Conceptual solar-plus-storage project to offset warehouse loads and improve resilience. Rooftop feasibility is uncertain due to refrigeration equipment, roof condition, tenant control, and truck-yard constraints.",
"inputFacts": [
{
"inputKey": "solar_dc_kw",
"value": 850,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large flat-roof warehouse could theoretically host a mid-size system, but roof equipment, structural limits, setbacks, and ownership are unknown."
},
{
"inputKey": "battery_power_kw",
"value": 500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Battery sizing is a conceptual placeholder paired with solar, not a quote-based design."
},
{
"inputKey": "battery_energy_kwh",
"value": 2000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 4-hour 500 kW battery is a plausible planning case but needs engineering validation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 13080000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost as a rough placeholder only. Grant calculations should require quote, system size, storage duration, interconnection, and owner approval."
},
{
"inputKey": "roof_structural_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No roof condition, age, structural capacity, or lease-control information is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Solar-plus-storage is operationally plausible but should need quote and site-control facts.",
"Do not assume grant eligibility where programs require public-sector, community resilience, low-income, or disadvantaged-community criteria."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Evaluate rooftop solar PV for high daytime warehouse and refrigeration load offset. The project should remain preliminary until roof control, structural review, interconnection, and quote data are available.",
"inputFacts": [
{
"inputKey": "solar_dc_kw",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 280,000-square-foot warehouse could potentially support about 1 MW DC, but rooftop obstructions and structural capacity are unknown."
},
{
"inputKey": "estimated_first_year_kwh_production",
"value": 1550000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A Southern California 1 MW DC rooftop system could plausibly generate around 1.5 million kWh annually, but this should be site-modeled."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost placeholder and should be replaced by installed-cost quote and eligible-cost breakout."
},
{
"inputKey": "roof_lease_or_owner_approval_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership status is unknown, so roof rights cannot be assumed."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No interconnection application evidence is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"PV tax credits or financing may be relevant, but grant estimates should not be forced without a matched active grant formula.",
"Suppress where an incentive requires interconnection approval, prevailing wage compliance evidence, domestic-content detail, or tax-credit monetization inputs."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Install refrigeration-oriented thermal storage or phase-change storage to shift compressor load and protect temperature-sensitive inventory during utility peak periods or short outages.",
"inputFacts": [
{
"inputKey": "thermal_storage_type",
"value": "refrigeration_load_shift_or_phase_change_storage",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Thermal storage is realistic for a refrigerated produce facility."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 1800,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning placeholder for cold-storage load shifting; actual ton-hours require refrigeration system engineering."
},
{
"inputKey": "estimated_peak_demand_reduction_kw",
"value": 320,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Load shifting could plausibly reduce several hundred kW of compressor demand, but savings require interval data."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing preview cost should remain quote-dependent."
},
{
"inputKey": "interval_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Peak-shaving value and many incentive calculations require 15-minute or hourly load data."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Thermal storage is realistic for cold storage, but few generic grants have simple formulas without engineering and utility tariff data.",
"Suppress grant value unless a program supports industrial thermal storage and accepts modeled peak-demand reduction."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop units serving offices, packing areas, breakrooms, and non-refrigerated warehouse support spaces. This is separate from process refrigeration.",
"inputFacts": [
{
"inputKey": "rtu_replacement_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A facility of this size likely has multiple packaged units for office and support spaces, while refrigerated spaces use separate equipment."
},
{
"inputKey": "total_nominal_tons",
"value": 160,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight 20-ton-equivalent units is a plausible planning assumption for office and support zones."
},
{
"inputKey": "existing_equipment_age_years",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes older equipment for test-case enrichment; user should confirm from equipment schedules."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost placeholder and should be replaced by a mechanical quote."
},
{
"inputKey": "annual_kwh_reduction",
"value": 185000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "HVAC savings are plausible but uncertain because refrigeration load dominates the electric profile."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for utility or commercial HVAC incentives if efficiency tiers and baseline equipment are documented.",
"Grant calculation should require equipment model numbers, AHRI ratings, installed cost, and confirmation that the measure is not process refrigeration."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Convert selected gas/electric HVAC serving office and support spaces to high-efficiency heat pumps while leaving process refrigeration systems unchanged.",
"inputFacts": [
{
"inputKey": "heat_pump_unit_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial conversion is more realistic than electrifying every process or warehouse conditioning load."
},
{
"inputKey": "total_nominal_tons",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Six 20-ton units is a plausible support-space HVAC retrofit size."
},
{
"inputKey": "gas_heating_displaced_annual_therms",
"value": 18000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual therm displacement is uncertain because the gas profile is not split by space heat, water heat, and process use."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost placeholder only."
},
{
"inputKey": "electrical_panel_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heat pump electrification may require service or panel capacity review."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for electrification incentives where commercial HVAC heat pumps are eligible.",
"Suppress exact grant estimates until gas baseline, equipment ratings, and eligible-cost details are provided."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Replace or supplement gas domestic hot-water service for restrooms, sanitation, and breakroom areas with commercial heat-pump water heating. This does not assume process hot-water loads are electrified.",
"inputFacts": [
{
"inputKey": "heat_pump_water_heater_capacity_gallons",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A moderate commercial domestic hot-water system is realistic for a large facility with staff areas and packing sanitation needs."
},
{
"inputKey": "heat_pump_water_heater_units",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Multiple commercial heat-pump water heater units provide redundancy and capacity."
},
{
"inputKey": "estimated_gas_therms_displaced",
"value": 5200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are plausible but should be confirmed from water-heater bills and equipment schedules."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses preview cost placeholder only."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Commercial heat-pump water-heater incentives may apply, but grant amount should require equipment capacity, efficiency, and installed cost."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace or retrofit warehouse high-bay, packing-area, dock, exterior, and office lighting with LED fixtures and controls. Existing preview count appears too small for the facility, so this profile uses a more realistic industrial-lighting planning quantity.",
"inputFacts": [
{
"inputKey": "interior_high_bay_fixture_count",
"value": 620,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 280,000-square-foot warehouse and packing facility would plausibly have hundreds of high-bay or linear fixtures, not 12."
},
{
"inputKey": "exterior_or_dock_fixture_count",
"value": 90,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Docks, yard, parking, and building perimeter lighting are typical for a distribution facility."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy controls and scheduling are realistic for warehouse aisles, coolers, docks, and support spaces."
},
{
"inputKey": "annual_kwh_reduction",
"value": 420000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Lighting could account for a meaningful but non-dominant share of electric use in a refrigeration-heavy site."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 72500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A realistic whole-facility LED retrofit for hundreds of fixtures would be much larger than the preview placeholder."
},
{
"inputKey": "fixture_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Final calculations should require fixture counts, wattages, hours, and control types."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility rebates may require preapproval and fixture-by-fixture documentation.",
"Do not use the small preview fixture count for a full-facility grant estimate unless the project is truly a pilot."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Upgrade selected refrigerated-envelope panels, dock seals, strip curtains, and air barriers rather than general residential-style insulation.",
"inputFacts": [
{
"inputKey": "measure_type",
"value": "refrigerated_envelope_and_dock_air_sealing",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Cold-storage envelope measures are realistic for this facility; generic attic or wall insulation assumptions are not."
},
{
"inputKey": "affected_area_square_feet",
"value": 45000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes a targeted portion of cold-room walls, doors, docks, and air barriers rather than the entire building."
},
{
"inputKey": "dock_door_count_addressed",
"value": 28,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A distribution facility of this size plausibly has multiple loading docks where infiltration control matters."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing preview cost is low for a broad envelope project and should be quote-validated."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Cold-storage envelope upgrades are operationally realistic but may not match generic building-envelope grant rules.",
"Suppress incentives that are residential-only or require whole-building weatherization eligibility."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump is not a likely near-term project for this dense industrial warehouse site because available land, drilling logistics, and process-refrigeration integration are uncertain.",
"inputFacts": [
{
"inputKey": "available_land_for_borefield",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No site plan or available land area is provided."
},
{
"inputKey": "geothermal_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is only in exploring stage and no study is referenced."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing preview cost should not be used for grant calculation without a geothermal feasibility design."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force geothermal eligibility for a refrigerated industrial warehouse without borefield feasibility and site control.",
"Most likely suppress as unrealistic or needs project scope."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biogas generation is unlikely at this facility because it distributes and packs produce but is not shown to operate an anaerobic digester, wastewater treatment plant, or sufficient organic-waste processing operation.",
"inputFacts": [
{
"inputKey": "onsite_anaerobic_digester_existing",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No onsite digester or waste-to-energy facility is indicated."
},
{
"inputKey": "organic_waste_available_tons_per_year",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Produce waste volume could exist but is unknown; it may be hauled, donated, composted, or managed by a contractor."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing preview cost should not produce a positive grant without feedstock and permitting evidence."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the user confirms a dedicated organics-to-energy project, feedstock volume, site permits, and interconnection or gas-use design.",
"Distribution of produce alone should not be treated as agricultural-producer bioenergy eligibility."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is a possible but not preferred conceptual resilience measure for a refrigeration-heavy facility. It should remain suppressed unless an engineering study shows year-round thermal recovery value and emissions compliance.",
"inputFacts": [
{
"inputKey": "chp_capacity_kw",
"value": 750,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 750 kW CHP unit is plausible relative to site electric load, but not justified without thermal load matching."
},
{
"inputKey": "recoverable_thermal_load_mmbtu_per_year",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No process hot-water, sanitation, or absorption-chilling thermal profile is provided."
},
{
"inputKey": "air_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP in Southern California would need emissions and permitting review."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing preview cost should not be used as a grant-ready basis without design documents."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force CHP grant eligibility for a facility without proven thermal recovery and emissions compliance.",
"Many clean-energy grants may disfavor combustion-based CHP."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal water heating is not a strong fit unless the site has large, consistent process hot-water loads. The current facts only support domestic and sanitation hot-water assumptions.",
"inputFacts": [
{
"inputKey": "daily_hot_water_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not split gas use into domestic water heating, space heating, sanitation, or process uses."
},
{
"inputKey": "collector_area_square_feet",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Collector sizing requires confirmed hot-water load and roof suitability."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing preview cost should not drive a positive grant estimate without a solar thermal design."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress if no large process hot-water load is documented.",
"Heat-pump water heating is a more realistic electrification measure for this profile."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not a realistic project for an urban industrial Vernon warehouse site with likely zoning, turbulence, space, and permitting constraints.",
"inputFacts": [
{
"inputKey": "onsite_wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind study is present and urban warehouse sites generally have poor small-wind suitability."
},
{
"inputKey": "wind_turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No credible turbine size can be inferred."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Preview cost should be ignored unless the customer actually pursues wind."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Mark as unrealistic for this customer unless user provides a wind study and permitting path.",
"Do not calculate grants from generic renewable-energy rules."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not a natural grant-driven retrofit for an existing refrigerated industrial distribution facility unless tied to a major renovation or corporate ESG project.",
"inputFacts": [
{
"inputKey": "major_renovation_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No major renovation is described."
},
{
"inputKey": "certification_scope",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "LEED for Existing Buildings, warehouse, or interior certification scope is not specified."
},
{
"inputKey": "estimated_certification_and_consulting_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Certification cost depends on scope and consultant engagement."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force a grant estimate for certification without a specific certification program, quote, and renovation scope."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "school_bus_charging_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a private refrigerated produce distribution and packing facility, not a school-bus site."
},
{
"inputKey": "eligible_school_bus_fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No school-bus fleet ownership or operation is present."
},
{
"inputKey": "recess_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application record exists."
}
],
"reasoning": "Although the broad matching engine surfaced this EV charging opportunity, the project profile should suppress it because the use case is private fleet and employee charging, not eligible school-bus charging."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "nevi_public_access_required_met",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The synthetic EV scope is private-use charging behind a warehouse or distribution-yard access pattern."
},
{
"inputKey": "nevi_corridor_or_community_site_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No corridor, public-access, community-charging, uptime, networking, or site-selection facts are provided."
},
{
"inputKey": "dc_fast_charging_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project inputs include Level 2 private-use charging only."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No quote is available for a NEVI-compliant public charging project."
}
],
"reasoning": "Do not calculate a NEVI grant for the current private charging scope. Keep the opportunity available only if the customer changes the project to a compliant public DC fast-charging or community-charging site and provides required application details."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "community_charging_public_access",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic project is fleet and employee charging for a controlled industrial site."
},
{
"inputKey": "community_charging_site_host_commitment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No site-host commitment, public-access plan, application package, or CEC submission evidence is provided."
},
{
"inputKey": "cec_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is at exploring stage with no application record."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No CEC-compliant charging scope or contractor quote is present."
}
],
"reasoning": "Suppress grant calculation unless the project is intentionally scoped as public community charging and required application facts are collected."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "verified_property_owner_or_long_term_site_control",
"reason": "needs user decision"
},
{
"inputKey": "landlord_or_owner_capital_project_approval",
"reason": "needs user decision"
},
{
"inputKey": "contractor_quote_by_measure",
"reason": "quote not available"
},
{
"inputKey": "eligible_cost_breakout_labor_equipment_design_permitting",
"reason": "quote not available"
},
{
"inputKey": "utility_preapproval_or_rebate_reservation",
"reason": "source requires agency approval"
},
{
"inputKey": "grant_application_number_or_submission_receipt",
"reason": "application not submitted"
},
{
"inputKey": "agency_award_or_notice_of_proposed_award",
"reason": "source requires agency approval"
},
{
"inputKey": "interval_electric_load_data_15_minute",
"reason": "needs user decision"
},
{
"inputKey": "equipment_schedule_for_refrigeration_hvac_lighting",
"reason": "needs user decision"
},
{
"inputKey": "roof_structural_capacity_report",
"reason": "needs user decision"
},
{
"inputKey": "interconnection_study_or_application_status",
"reason": "source requires agency approval"
},
{
"inputKey": "disadvantaged_community_or_priority_population_verification",
"reason": "needs user decision"
},
{
"inputKey": "school_bus_fleet_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "public_dc_fast_charging_corridor_compliance_package",
"reason": "unrealistic for this customer"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "geothermal_borefield_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "anaerobic_digester_feedstock_contract",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The organization is a private for-profit industrial produce distribution and packing facility, not a public agency, school, nonprofit, tribal entity, or verified agricultural producer.",
"The site's realistic EV charging use case is private fleet and employee charging; matched school-bus, NEVI, and community-charging grants should not be treated as automatically eligible.",
"Ownership and long-term site control are unknown, so rooftop solar, storage, microgrid, geothermal, major HVAC, and charging projects may require owner or landlord consent.",
"Preview costs are administrative placeholders and should not be used as quote-backed eligible costs unless separately confirmed.",
"Cold-storage and process-refrigeration measures should not be forced into residential or generic commercial HVAC formulas.",
"Small wind, geothermal, solar thermal, biogas, CHP, and LEED certification are not natural near-term grant projects for this profile without substantial new scope evidence.",
"Battery storage, thermal storage, HVAC, heat-pump water heating, and lighting are realistic operational projects, but grant values should still require program-specific formulas, equipment schedules, quote data, and any required utility or agency preapproval."
]
}

