{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "seghesio-healdsburg-winery",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for a Healdsburg winery and tasting-room operation using the supplied test-case facts, utility profile, public/common-sense winery operations assumptions, and conservative project planning defaults. The site is treated as a nonresidential agricultural/industrial customer in City of Healdsburg electric territory, with PG&E relevant only for gas-side measures. Source context: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A family winery and tasting-room operation would normally be treated as a private for-profit business unless the user confirms otherwise."
},
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is described as a private winery operation, not a city, county, district, state agency, or other public entity."
},
{
"inputKey": "organization_is_school_or_education_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity is wine production and hospitality, not education."
},
{
"inputKey": "organization_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal government status is indicated in the supplied profile."
},
{
"inputKey": "organization_is_agricultural_producer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile lists Agricultural Operation, winery activity, and NAICS 111332 for grape vineyards."
},
{
"inputKey": "organization_is_food_or_beverage_manufacturer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "NAICS 312130 and the primary activity indicate wine manufacturing, fermentation, cellar operations, and storage."
},
{
"inputKey": "organization_size_band",
"value": "11-50 employees",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Retain the supplied source form value."
},
{
"inputKey": "site_control_status",
"value": "site_control_likely_but_ownership_unconfirmed",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The operation is tied to a fixed winery address, but ownershipStatus is Not sure; grants that require proof of ownership, lease term, or landlord approval should not calculate until confirmed."
},
{
"inputKey": "electric_utility_customer_class",
"value": "commercial_industrial",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual kWh and building type are consistent with a nonresidential commercial/industrial electric account."
},
{
"inputKey": "gas_utility_customer_class",
"value": "commercial_industrial",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The gas spend is substantial and supports process, water-heating, or space-conditioning loads typical of winery operations."
},
{
"inputKey": "site_has_process_loads",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile explicitly includes wine production, fermentation, cellar operations, and storage."
},
{
"inputKey": "site_has_public_tasting_room",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies tasting-room hospitality and direct-to-consumer sales."
},
{
"inputKey": "fleet_owner",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A winery of this size commonly operates light-duty sales, hospitality, delivery, or vineyard support vehicles, but exact fleet records should be confirmed."
},
{
"inputKey": "fleet_has_medium_or_heavy_duty_vehicles",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture can assume a small light-duty fleet for test purposes, but there is no evidence of owned medium- or heavy-duty vehicles."
},
{
"inputKey": "disadvantaged_community_or_priority_population_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No census tract or program-specific priority-population designation is supplied; estimates relying on DAC, low-income, tribal, or environmental-justice adders should remain suppressed."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project stage is already supplied as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_quote_budgetary_planning",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture is exploratory and includes admin-modeled costs rather than vendor quotes."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application submission or award record is supplied; competitive grant estimates should not assume funding probability or award approval."
},
{
"inputKey": "has_vendor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The current preview uses fixed test-case inputs; no vendor quote is present."
},
{
"inputKey": "prevailing_wage_required_if_public_funded",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "California public funding, public works classification, and contract structure can affect labor requirements; leave unknown until grant and procurement details are known."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install modest public/workplace Level 2 charging at the tasting-room parking area, sized for visitors and employees rather than corridor fast charging.",
"inputFacts": [
{
"inputKey": "charger_type",
"value": "networked_level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 charging is more realistic for a winery/tasting-room destination than DC fast charging."
},
{
"inputKey": "level_2_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four ports is a plausible initial installation for visitors, employees, and limited fleet charging."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "DC fast charging would generally be more expensive, require higher service capacity, and be less likely for an exploratory winery project."
},
{
"inputKey": "public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Visitor charging at a tasting room could be publicly accessible during business hours."
},
{
"inputKey": "workplace_or_employee_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Employee charging is realistic for a 11-50 employee site."
},
{
"inputKey": "fleet_charging_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small winery fleet may use the chargers, but actual fleet charging needs should be confirmed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current admin-modeled upfront cost for the EV charger preview."
},
{
"inputKey": "utility_make_ready_cost_cents",
"value": 220000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Budgetary allocation for panel work, trenching, conduit, and make-ready costs; must be replaced by a quote."
},
{
"inputKey": "charging_equipment_cost_cents",
"value": 360000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Budgetary cost for four networked Level 2 ports before confirmed hardware selection."
},
{
"inputKey": "installation_labor_cost_cents",
"value": 268000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic split of the preview cost for test calculations only."
},
{
"inputKey": "site_electrical_capacity_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No panel capacity, transformer capacity, or service study is supplied."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview is explicitly not a customer quote."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May not qualify for NEVI unless the site is on or near an eligible Alternative Fuel Corridor and meets DC fast charging requirements.",
"Many EV charging grants require a live solicitation, preapproval, utility interconnection review, equipment eligibility, and proof of site control.",
"Cost estimate should be suppressed or marked preliminary until charger quote and electrical capacity are confirmed."
]
},
{
"retrofitTypeId": "electric_vehicle_purchase",
"projectScopeSummary": "Replace or add two light-duty winery fleet vehicles with battery-electric vehicles used for local sales, hospitality, and site-support trips.",
"inputFacts": [
{
"inputKey": "vehicle_class",
"value": "light_duty",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small winery fleet is more likely to include light-duty vehicles than buses or heavy trucks."
},
{
"inputKey": "ev_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two vehicles is a conservative replacement/addition scope for a 11-50 employee operation."
},
{
"inputKey": "vehicle_purchase_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin-modeled upfront cost for the electric vehicle purchase preview."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a vehicle grant test case, assume the full modeled purchase cost is potentially eligible before program-specific caps."
},
{
"inputKey": "annual_miles_per_vehicle",
"value": 12000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A plausible local/regional use assumption for winery sales, errands, hospitality, or vineyard support vehicles."
},
{
"inputKey": "existing_vehicle_fuel",
"value": "gasoline",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Used for a test fixture when no fleet inventory is available."
},
{
"inputKey": "scrappage_required_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Some clean vehicle programs require scrappage or replacement of existing vehicles; no qualifying existing VINs are supplied."
},
{
"inputKey": "vehicle_order_or_purchase_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No order, purchase agreement, or delivery date is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Fleet grants may prioritize medium/heavy-duty vehicles, public fleets, disadvantaged communities, or specific vehicle classes.",
"A small private light-duty fleet may be eligible under some programs but should not be assumed to receive a competitive award.",
"VINs, existing vehicle records, purchase order timing, and program preapproval should remain missing."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install behind-the-meter battery storage for demand management, limited backup resilience, and support for refrigeration/cellar operations during outages.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 150,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 150 kW battery is plausible for a 1.92 GWh/year winery with seasonal process loads and demand charges."
},
{
"inputKey": "battery_capacity_kwh",
"value": 300,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A two-hour battery provides a conservative commercial demand-management and resilience scope."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current admin-modeled upfront cost for the battery storage preview."
},
{
"inputKey": "paired_with_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No solar PV retrofit is included in the current summaries, so the battery is treated as standalone unless the user adds PV."
},
{
"inputKey": "critical_load_backup_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Refrigeration, cellar controls, and product protection make limited backup resilience plausible."
},
{
"inputKey": "resilience_critical_load_kw",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic estimate for essential controls, refrigeration, IT, and limited hospitality loads."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection or utility application status is supplied."
},
{
"inputKey": "battery_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Preview uses test fixture costs only."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Battery incentives often require utility territory eligibility, resilience-priority documentation, interconnection review, or solar pairing.",
"City of Healdsburg electric territory may not match programs limited to investor-owned utilities.",
"Final estimate should require vendor quote, single-line diagram, interconnection status, and critical-load schedule."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Evaluate a small organic-waste-to-energy or biomass/biogas system using pomace, wastewater solids, or other winery organic residuals, but treat as speculative.",
"inputFacts": [
{
"inputKey": "system_type",
"value": "small_biogas_or_biomass_process_energy_system",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Winery pomace and wastewater residuals create a plausible concept, but onsite feedstock volume is likely uncertain."
},
{
"inputKey": "generator_capacity_kw",
"value": 60,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small system is more plausible than a large standalone plant for a 60,000 sq ft winery."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current admin-modeled upfront cost for the biomass/biogas preview."
},
{
"inputKey": "annual_feedstock_tons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Feedstock volume determines project viability and grant eligibility; no grape tonnage, pomace volume, or wastewater solids data is supplied."
},
{
"inputKey": "feedstock_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feedstock contract, ownership, or disposal records are supplied."
},
{
"inputKey": "air_permit_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Combustion or biogas utilization may trigger air permitting, but system design is unknown."
},
{
"inputKey": "engineering_feasibility_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study is supplied; this should remain a prerequisite for cost and incentive calculations."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Concept may be relevant to agricultural or waste-to-energy programs, but the project is too speculative without feedstock and engineering data.",
"Do not force a positive estimate from generic renewable-energy matches.",
"Require feasibility study, feedstock inventory, interconnection/permitting plan, and vendor scope before calculating."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Consider geothermal heat pump only for tasting-room or office space conditioning, not primary winery process loads.",
"inputFacts": [
{
"inputKey": "served_area_square_feet",
"value": 8000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Only a portion of the 60,000 sq ft facility is likely conditioned hospitality, office, or support space appropriate for geothermal HVAC."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 30,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative size for partial-building comfort conditioning rather than process heating or cooling."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current preview upfront cost, though this appears low for full geothermal scope and should be treated as preliminary."
},
{
"inputKey": "loop_field_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No site plan, drilling feasibility, or loop-field design is supplied."
},
{
"inputKey": "geotechnical_or_drilling_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ground-source projects require site-specific feasibility review."
},
{
"inputKey": "existing_hvac_equipment_condition",
"value": "unknown",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No equipment schedule or replacement trigger is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Ground-source heat pumps are unlikely as a near-term winery priority without a major HVAC replacement or new construction trigger.",
"No source-backed grant calculation was matched in the preview.",
"Require equipment schedule, loop-field design, and quote before calculating."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged HVAC units serving tasting-room, office, and support spaces with high-efficiency heat pump or high-efficiency rooftop equipment.",
"inputFacts": [
{
"inputKey": "hvac_units_replaced",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small number of packaged units is plausible for hospitality and office areas within a larger winery facility."
},
{
"inputKey": "total_capacity_tons",
"value": 40,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity estimate assumes conditioned support areas rather than full process/storage floor area."
},
{
"inputKey": "replacement_equipment_type",
"value": "high_efficiency_packaged_heat_pump_or_rooftop_unit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Equipment type is plausible but unconfirmed without an HVAC schedule."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin-modeled upfront cost for the high-efficiency HVAC preview."
},
{
"inputKey": "annual_kwh_reduction",
"value": 22000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Budgetary reduction for partial-building HVAC efficiency only; process loads dominate site energy use."
},
{
"inputKey": "existing_equipment_efficiency_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No model numbers, nameplate data, age, or efficiency ratings are supplied."
},
{
"inputKey": "hvac_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Preview is admin-modeled and not vendor-quoted."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Municipal electric territory may limit access to common investor-owned-utility rebate programs.",
"Grant or rebate calculation should require existing and proposed equipment efficiency data.",
"Process refrigeration or cellar cooling upgrades should be modeled separately from comfort HVAC."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Install small solar thermal preheat for domestic hot water or washdown support loads, not a full process heat conversion.",
"inputFacts": [
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": 320,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest collector array is plausible for preheat, but hot-water load profile is unknown."
},
{
"inputKey": "storage_tank_gallons",
"value": 500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic preheat storage size for a commercial winery support-load application."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current admin-modeled upfront cost for the solar water heating preview."
},
{
"inputKey": "served_load_type",
"value": "domestic_hot_water_and_light_washdown_preheat",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal is more plausible for preheat than for all winery sanitation or process hot water."
},
{
"inputKey": "annual_therm_offset",
"value": 1800,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Conservative small fraction of the site's gas use based on annual gas cost, pending actual therm data."
},
{
"inputKey": "hot_water_load_profile_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar water heating economics require daily and seasonal hot-water load information."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"No source-backed grant calculation was matched in the preview.",
"Solar thermal may be a lower-priority measure unless there is a clear year-round hot-water load.",
"Require hot-water load profile and quote before calculating."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Explore CHP only as a conceptual process-resilience measure for electricity and thermal recovery, but do not treat as a likely grant-eligible near-term project.",
"inputFacts": [
{
"inputKey": "chp_capacity_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 250 kW system is plausible relative to 1.92 GWh annual consumption, but no interval load or thermal load profile is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current admin-modeled upfront cost for the CHP preview."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "CHP viability requires coincident thermal loads; none are documented."
},
{
"inputKey": "emissions_permitting_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion-based CHP may require air-permit review."
},
{
"inputKey": "fuel_type",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "PG&E gas service is listed, but actual CHP fuel strategy is unconfirmed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Combustion CHP may conflict with decarbonization-focused programs.",
"No source-backed grant calculation was matched in the preview.",
"Do not estimate without interval electric load, thermal load, emissions review, and project design."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Commission an engineering feasibility study covering process energy efficiency, refrigeration/cellar loads, battery storage, EV charging, and potential organic-waste energy options.",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 450000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $4,500 engineering study is plausible for an initial commercial/industrial site assessment."
},
{
"inputKey": "study_scope",
"value": [
"utility bill review",
"site walk-through",
"process refrigeration screening",
"battery sizing screening",
"EV charging make-ready screening",
"organic residuals energy screening"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Scope reflects the most uncertain measures in the profile."
},
{
"inputKey": "licensed_engineer_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Battery, CHP, biogas, and process-energy scopes would benefit from professional engineering review."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No study provider or proposal is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some programs fund audits or feasibility studies, but the current preview marks this retrofit unsupported.",
"Calculation should remain suppressed unless a matching study grant formula is available."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Upgrade insulation and air sealing in tasting-room, office, and limited conditioned support areas rather than the full winery production/storage space.",
"inputFacts": [
{
"inputKey": "treated_area_square_feet",
"value": 6000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Only a portion of the 60,000 sq ft site is likely conditioned envelope appropriate for insulation retrofit."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current admin-modeled upfront cost for the insulation preview."
},
{
"inputKey": "measure_type",
"value": [
"attic_or_roof_deck_insulation",
"weatherstripping",
"minor_air_sealing"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Plausible comfort-area measures, but building construction is unknown."
},
{
"inputKey": "existing_r_value_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit or envelope assessment is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Commercial envelope grants or rebates are usually formula- and utility-specific.",
"Municipal electric service may suppress common IOU electric rebates.",
"Require audit findings, existing/proposed R-values, and quote before calculating."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace a small set of remaining non-LED fixtures in tasting-room, cellar work areas, or exterior/security lighting.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The savings preview already states an assumption of 12 fixture replacements."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current admin-modeled upfront cost for the LED preview."
},
{
"inputKey": "existing_fixture_type",
"value": "mixed_fluorescent_or_hid_remaining_fixtures",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For a small remaining retrofit, assume a mixed set of older fixtures rather than a full-facility conversion."
},
{
"inputKey": "annual_operating_hours",
"value": 3600,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Plausible for production/support areas with extended operating schedules."
},
{
"inputKey": "lighting_inventory_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fixture schedule, wattage, or controls scope is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Small lighting projects commonly qualify for rebates only if the serving utility has an applicable program.",
"City of Healdsburg electric territory may not match statewide or IOU-specific lighting rebate rules.",
"The project is small and should not be forced into a grant estimate."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not a realistic standalone retrofit for the existing winery unless tied to a major renovation or new construction project.",
"inputFacts": [
{
"inputKey": "major_renovation_project_planned",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case is exploratory retrofit planning, not a major renovation or new construction project."
},
{
"inputKey": "certification_target",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No LEED rating system, target level, or certification plan is supplied."
},
{
"inputKey": "certification_budget_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "LEED soft costs depend on rating system, consultant scope, registration, documentation, and construction scope."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Certification alone usually does not create a grant calculation without a specific green-building program.",
"Current preview marks certification unsupported.",
"Suppress unless user confirms a major renovation, certification target, and matching program."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is treated as unlikely for the winery site due to siting, permitting, visual, and wind-resource uncertainty.",
"inputFacts": [
{
"inputKey": "wind_turbine_capacity_kw",
"value": 50,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 50 kW turbine is a plausible small commercial size but is speculative without wind-resource data."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the current admin-modeled upfront cost for the small wind preview."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study or onsite resource screening is supplied."
},
{
"inputKey": "zoning_or_visual_approval_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small wind at a winery/tasting-room site could face zoning, noise, setback, and aesthetic constraints."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Small wind is unlikely without site-specific wind resource and permitting support.",
"No source-backed grant calculation was matched in the preview.",
"Do not force a renewable-energy estimate based only on state geography."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "nevi_project_type",
"value": "level_2_destination_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic winery scope is Level 2 destination charging, not corridor DC fast charging."
},
{
"inputKey": "dc_fast_charging_required_scope_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "NEVI-style corridor grants typically require fast-charging corridor scope; no such project is indicated."
},
{
"inputKey": "alternative_fuel_corridor_site_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No corridor eligibility or site designation is supplied."
},
{
"inputKey": "minimum_public_fast_charger_ports_met",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled scope has zero DC fast-charging ports."
}
],
"reasoning": "Although the match engine found a CA EV infrastructure opportunity, the realistic winery project is a small Level 2 visitor/workplace installation. Treat NEVI as likely ineligible unless the user changes the project to an eligible corridor DC fast-charging scope."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "clean_transportation_project_category",
"value": "light_duty_fleet_and_level_2_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The plausible scope combines two light-duty EVs with a small Level 2 charging installation."
},
{
"inputKey": "competitive_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application record is supplied."
},
{
"inputKey": "solicitation_number",
"value": null,
"valueType": "text",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No active solicitation or funding round is identified in the test case."
},
{
"inputKey": "requested_grant_amount_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A requested grant amount should be based on solicitation rules and applicant budget, not inferred from broad program eligibility."
},
{
"inputKey": "project_budget_cents",
"value": 9848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combines the modeled EV charger installation cost of 848,000 cents and modeled EV purchase cost of 9,000,000 cents."
},
{
"inputKey": "priority_population_or_dac_claimed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No qualifying priority-population evidence is supplied."
}
],
"reasoning": "The broad clean transportation match is plausible for discovery, but this should not produce a confident grant estimate without a specific solicitation, formula, application status, vehicle class rules, and requested budget."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "vendor_quote_ev_chargers",
"reason": "quote not available"
},
{
"inputKey": "electrical_single_line_diagram",
"reason": "needs user decision"
},
{
"inputKey": "service_capacity_or_transformer_capacity_confirmation",
"reason": "source requires agency approval"
},
{
"inputKey": "ev_charger_interconnection_or_utility_make_ready_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "nevi_corridor_eligibility_confirmation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "dc_fast_charging_site_design",
"reason": "unrealistic for this customer"
},
{
"inputKey": "clean_transportation_program_solicitation_number",
"reason": "application not submitted"
},
{
"inputKey": "clean_transportation_program_award_status",
"reason": "application not submitted"
},
{
"inputKey": "vehicle_vins_or_purchase_orders",
"reason": "needs user decision"
},
{
"inputKey": "fleet_replacement_scrappage_records",
"reason": "needs user decision"
},
{
"inputKey": "battery_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "battery_interconnection_application_status",
"reason": "source requires agency approval"
},
{
"inputKey": "battery_critical_load_panel_design",
"reason": "needs user decision"
},
{
"inputKey": "solar_pv_pairing_design",
"reason": "needs user decision"
},
{
"inputKey": "biomass_biogas_feedstock_inventory",
"reason": "needs user decision"
},
{
"inputKey": "biomass_biogas_feasibility_study",
"reason": "quote not available"
},
{
"inputKey": "biomass_biogas_air_permit_status",
"reason": "source requires agency approval"
},
{
"inputKey": "chp_interval_load_data",
"reason": "needs user decision"
},
{
"inputKey": "chp_thermal_load_profile",
"reason": "needs user decision"
},
{
"inputKey": "chp_air_permit_status",
"reason": "source requires agency approval"
},
{
"inputKey": "ground_source_geothermal_loop_field_design",
"reason": "quote not available"
},
{
"inputKey": "geotechnical_or_drilling_report",
"reason": "quote not available"
},
{
"inputKey": "hvac_equipment_schedule",
"reason": "needs user decision"
},
{
"inputKey": "existing_and_proposed_hvac_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "solar_water_heating_load_profile",
"reason": "needs user decision"
},
{
"inputKey": "solar_thermal_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "lighting_fixture_inventory",
"reason": "needs user decision"
},
{
"inputKey": "leed_rating_system_and_certification_target",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_zoning_or_setback_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "proof_of_property_ownership_or_long_term_site_control",
"reason": "needs user decision"
},
{
"inputKey": "disadvantaged_community_or_priority_population_documentation",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The organization is a private nonresidential winery, not a public entity, nonprofit, school, tribal entity, or residential applicant.",
"The electric utility is City of Healdsburg Electric Utility; do not assume eligibility for PG&E electric-side rebates or other investor-owned utility programs.",
"PG&E should be used only for gas-side measures unless the user supplies contrary utility billing evidence.",
"Ownership or long-term site control is unconfirmed, so programs requiring deed, lease term, landlord consent, or site-control documentation should remain conditional.",
"NEVI-style EV infrastructure should not calculate for the modeled Level 2 winery visitor/workplace charging scope unless the project is changed to eligible DC fast corridor charging.",
"Competitive California clean transportation opportunities may be discoverable but should not imply award probability without a specific solicitation, application, and scoring basis.",
"Battery storage incentives should not assume solar pairing, SGIP-style eligibility, resilience adders, or priority-population status without explicit documentation.",
"Biomass, biogas, CHP, geothermal, and small wind are speculative concepts for this site and should require engineering feasibility data before producing grant estimates.",
"Lighting, insulation, HVAC, and solar water-heating measures are plausible operational improvements but should not be forced into grant estimates when no source-backed program formula matched the preview.",
"LEED certification is not a realistic standalone retrofit for this profile unless the user confirms a major renovation or new construction certification project."
]
}

