{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "salt-lake-public-safety-building",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied Salt Lake City Public Safety Building test-case facts, including public-agency ownership, 172,000 sq ft public institutional use, Rocky Mountain Power electric service, Enbridge Gas Utah gas service, net-zero/public-safety context, and existing utility/tax profile facts.  Grant qualification should remain conservative because the project is exploratory, no quote package is available, and only one matched grant opportunity is present for EV charging.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "applicant_entity_type",
"value": "municipal_government",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is identified as a Salt Lake City public safety facility owned by a government/public agency."
},
{
"inputKey": "public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a municipal public safety building with police, fire administration, emergency operations, and civic services."
},
{
"inputKey": "nonprofit_501c3_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A municipal public safety facility would not normally apply as a 501(c)(3) nonprofit."
},
{
"inputKey": "school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Primary activities are public safety and municipal services, not K-12 or higher education."
},
{
"inputKey": "tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, tribal government, or tribal facility facts are present."
},
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an urban public safety facility, so agricultural producer programs should be suppressed."
},
{
"inputKey": "federal_agency",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a municipal government facility, not a federal agency site."
},
{
"inputKey": "state_agency",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility appears to be Salt Lake City-owned rather than State of Utah-owned."
},
{
"inputKey": "fleet_owner_or_operator",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A police/fire/public safety facility would realistically operate or host municipal fleet vehicles, but the exact fleet inventory is not supplied."
},
{
"inputKey": "critical_facility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts identify the building as a public safety critical facility."
},
{
"inputKey": "emergency_operations_center_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form describes emergency operations as a primary activity."
},
{
"inputKey": "building_owner_controls_energy_systems",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ownership status is Own, so tenant-landlord restrictions should generally not block building energy projects."
},
{
"inputKey": "electric_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility profile lists Rocky Mountain Power electric service and annual kWh consumption."
},
{
"inputKey": "gas_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists Enbridge Gas Utah and the utility summaries include annual gas cost."
},
{
"inputKey": "sales_tax_exempt_public_purchaser",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts mark sales/use tax exempt status true, but a purchasing certificate may still be required for contractor documentation."
},
{
"inputKey": "property_tax_exempt_public_property",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts identify municipal public safety facility exemption, so property-tax abatements should not be assumed valuable."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object lists stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_solicitation_scoping",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploratory municipal projects commonly require scope development, budget authority, and procurement before quote-backed grant estimates can be finalized."
},
{
"inputKey": "capital_budget_approved",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No council-approved capital budget, purchase order, or CIP allocation is supplied."
},
{
"inputKey": "energy_audit_completed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The building is known as high-performance/net-zero in context, but no current ASHRAE audit or retrocommissioning report is supplied."
},
{
"inputKey": "annual_kwh",
"value": 2335000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual kWh is supplied in the site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 24517500,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric cost of $245,175 is supplied in the site energy profile."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 10276500,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost of $102,765 is supplied in the utility summaries, but annual therms are not supplied."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 1780000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual water/sewer cost of $17,800 is supplied in the utility summaries."
},
{
"inputKey": "annual_waste_cost_cents",
"value": 4800000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual waste cost of $48,000 is supplied in the utility summaries."
},
{
"inputKey": "annual_therms",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas cost is supplied, but annual therms are not supplied and should not be inferred for grant calculations requiring verified fuel displacement."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install public-safety fleet and visitor charging at the municipal public safety facility, sized conservatively for fleet transition support rather than corridor fast-charging.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing admin-modeled EV charger preview cost as a placeholder until a vendor quote is available."
},
{
"inputKey": "charger_port_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight ports is realistic for a large public safety building with a municipal fleet presence but avoids over-sizing the project as a corridor charging hub."
},
{
"inputKey": "level_2_port_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 charging is the most plausible near-term scope for fleet/employee/visitor charging at a municipal building."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No facts indicate a highway-corridor fast-charging site or NEVI-compliant public DCFC station."
},
{
"inputKey": "public_access_24_7",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public safety building may restrict portions of its parking and fleet area for security reasons."
},
{
"inputKey": "fleet_use_primary",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Police/fire administration facilities commonly support municipal fleets, but fleet count is not verified."
},
{
"inputKey": "charger_networking_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Municipal EVSE projects typically include networked chargers for access control, uptime monitoring, and reporting."
},
{
"inputKey": "utility_make_ready_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Panel capacity, trenching, transformer capacity, and make-ready scope require a site walk and utility review."
},
{
"inputKey": "nevi_corridor_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility address is an urban municipal building, and no corridor-site designation is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May qualify for some fleet or public-sector EV charging incentives if program rules allow municipal fleet sites.",
"Should not be forced into NEVI funding without corridor-site, public-access, DC fast-charging, and application-award evidence.",
"Quote, site plan, charger specifications, and utility make-ready scope are required before a reliable estimate."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Add battery storage for critical load support and resilience at the emergency operations/public safety facility, likely paired with existing or future solar where feasible.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing admin-modeled battery preview cost as a placeholder for a modest commercial resilience battery."
},
{
"inputKey": "battery_capacity_kwh",
"value": 500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 500 kWh system is plausible for limited critical-load support at a 172,000 sq ft public safety facility."
},
{
"inputKey": "battery_power_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A two-hour 250 kW / 500 kWh configuration is a common planning placeholder for commercial resilience studies."
},
{
"inputKey": "critical_load_panel_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical-load segmentation would be expected for emergency operations resilience."
},
{
"inputKey": "backup_duration_hours",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two hours is conservative for battery support and avoids implying full-building long-duration backup."
},
{
"inputKey": "paired_with_solar_pv",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar pairing affects economics and some incentive formulas, but current solar ownership and interconnection status are not supplied."
},
{
"inputKey": "demand_response_enrollment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No utility demand response participation facts are supplied."
},
{
"inputKey": "engineered_resilience_study_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A resilience or microgrid study cost should come from a proposal, not a synthetic default."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Public-safety critical-facility status is favorable for resilience grants.",
"Actual grant handling should remain suppressed unless the matched opportunity covers battery storage and a formula is available.",
"Requires engineering scope, critical-load schedule, and interconnection assumptions."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Evaluate additional rooftop or canopy solar PV for a large net-zero-oriented municipal public safety facility, but do not assume unused roof capacity is available.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing admin-modeled solar PV preview cost as a placeholder."
},
{
"inputKey": "solar_pv_capacity_kw_dc",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 250 kW planning size is plausible for a large municipal facility, but roof/canopy availability and existing PV are unknown."
},
{
"inputKey": "existing_solar_pv_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The context mentions net-zero, but does not confirm current PV ownership, size, or whether incremental capacity is possible."
},
{
"inputKey": "new_incremental_solar_capacity_kw_dc",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Incremental capacity requires roof/canopy feasibility, structural review, and interconnection analysis."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Project stage is exploratory, so interconnection is not assumed submitted."
},
{
"inputKey": "power_purchase_agreement",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Municipal solar may be directly owned, financed, or third-party owned; no procurement model is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Public entity ownership and high energy use make solar plausible.",
"Net-zero context creates uncertainty about whether the building already has PV and whether additional capacity is realistic.",
"Do not calculate grant value without incremental capacity, installed cost, ownership model, and interconnection status."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Explore a ground-source heat pump or geothermal exchange expansion for public building HVAC decarbonization, subject to site constraints and existing system compatibility.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing admin-modeled ground-source heat pump preview cost as a placeholder."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An 80-ton placeholder is plausible for partial-load retrofit planning at a large facility, but is not a full-building design size."
},
{
"inputKey": "ground_loop_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Vertical bore, horizontal loop, or other exchange design requires geotechnical and site engineering."
},
{
"inputKey": "geothermal_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geothermal feasibility study is supplied."
},
{
"inputKey": "existing_hydronic_distribution_compatible",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing HVAC distribution compatibility is critical and not supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Public-building decarbonization is plausible, but site feasibility is uncertain.",
"Do not calculate geothermal incentives without a quote, design capacity, and eligible-cost breakdown."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace selected aging HVAC equipment with high-efficiency equipment while maintaining emergency operations reliability.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing HVAC preview project cost."
},
{
"inputKey": "hvac_unit_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A six-unit partial replacement is reasonable for a 172,000 sq ft public building without implying a whole-building HVAC overhaul."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 140000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Roughly 6 percent of annual electric use is plausible for selected HVAC efficiency upgrades."
},
{
"inputKey": "estimated_annual_gas_therm_savings",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas usage is not supplied, so therm savings should remain missing."
},
{
"inputKey": "equipment_efficiency_rating",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Program formulas often require equipment-specific ratings such as EER, IEER, COP, AFUE, or efficiency tier."
},
{
"inputKey": "like_for_like_replacement",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Whether the scope is like-for-like, electrification, or controls-driven is not specified."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for utility or public-sector efficiency programs if equipment meets efficiency thresholds.",
"Quote and equipment schedules are needed for formula-ready estimates."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Electrify selected HVAC zones with high-efficiency heat pump equipment while retaining reliability for critical operations.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing heat pump HVAC preview cost."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 45,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 45-ton partial retrofit is plausible for selected zones in a large public building."
},
{
"inputKey": "fossil_fuel_displacement",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has gas service and gas cost, so partial gas displacement is plausible if heat pumps replace gas-fired heating."
},
{
"inputKey": "backup_heat_retained",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical public safety facilities often retain backup or redundant heating systems."
},
{
"inputKey": "cold_climate_heat_pump_specified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heat pump equipment specifications are not supplied."
},
{
"inputKey": "electric_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrification load impacts require electrical engineering review."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Public-sector heat pump electrification is plausible.",
"Therm displacement, equipment ratings, and electrical service impacts are missing."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small remaining LED fixture replacement scope for specialized, back-of-house, exterior, or emergency-service areas not already upgraded.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing LED preview cost."
},
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing preview assumptions explicitly mention 12 fixture replacements."
},
{
"inputKey": "annual_operating_hours",
"value": 5840,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public safety facilities can have extended operating schedules, but not every space operates 24/7."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 26000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A modest lighting savings estimate is appropriate for a small 12-fixture residual scope."
},
{
"inputKey": "existing_lamp_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The existing fixture type is required for many lighting incentive calculations."
},
{
"inputKey": "new_fixture_wattage",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fixture-specific wattage is required for formula-ready estimates."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Small LED scopes often have utility rebate potential but limited grant relevance.",
"Net-zero/high-performance context suggests much of the lighting may already be efficient."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Add occupancy, daylighting, scheduling, or networked controls for selected public safety building zones with long operating hours.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 132200,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing lighting controls preview cost."
},
{
"inputKey": "controlled_area_sqft",
"value": 35000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial-building controls scope is plausible for conference, administrative, parking, and support areas."
},
{
"inputKey": "control_type",
"value": [
"occupancy_sensors",
"networked_scheduling",
"daylight_controls"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are common measures in public institutional buildings."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 38000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A modest savings estimate is plausible for partial-building lighting controls."
},
{
"inputKey": "existing_controls_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing control systems are not described."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely a utility rebate or operational efficiency measure rather than a major grant-driven project.",
"Requires baseline controls and equipment schedule."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Replace selected gas or electric service water-heating equipment serving locker rooms, break rooms, or support areas with high-efficiency heat pump water heaters.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing heat pump water heater preview cost."
},
{
"inputKey": "unit_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two commercial units is plausible for a targeted water-heating retrofit in a public safety building."
},
{
"inputKey": "storage_capacity_gallons",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combined 240 gallons is reasonable as a placeholder for two commercial-size units."
},
{
"inputKey": "existing_fuel_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site has gas service, but the specific water-heating fuel is not supplied."
},
{
"inputKey": "equipment_efficiency_cop",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Equipment COP is required for many program calculations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Plausible electrification measure but needs existing fuel, equipment specifications, and load profile."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Evaluate solar thermal preheat for domestic hot water serving showers, locker rooms, and public safety support spaces.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing solar water heating preview cost."
},
{
"inputKey": "collector_area_sqft",
"value": 480,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A moderate solar thermal array is plausible but highly dependent on available roof area and hot water loads."
},
{
"inputKey": "daily_hot_water_load_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Hot water load is not supplied and should not be inferred from building area alone."
},
{
"inputKey": "existing_water_heating_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fuel displacement and savings depend on the existing water-heating system."
},
{
"inputKey": "roof_area_available_for_solar_thermal",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Roof feasibility is unknown, especially because net-zero facilities may already use roof area for PV."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Technically plausible but less likely than heat pump water heating or PV/battery resilience for this customer.",
"Should remain suppressed unless hot water load and roof feasibility are confirmed."
]
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"projectScopeSummary": "Replace limited laundry equipment used for uniforms, towels, or station support, if present.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 307600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing laundry preview cost, but laundry activity is not a primary building use."
},
{
"inputKey": "washer_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small support-laundry scope is plausible for uniforms or towels, but not confirmed."
},
{
"inputKey": "commercial_laundry_primary_activity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a public safety facility, not a laundromat, hotel, or healthcare laundry operation."
},
{
"inputKey": "annual_water_savings_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No laundry usage data is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not a core project for this building type.",
"Do not force water-efficiency grant qualification without confirmed laundry equipment and usage."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Minor refrigeration efficiency replacement for breakroom, evidence, or support equipment if present; not a grocery or food-service refrigeration project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing refrigeration preview cost, but the building is not a refrigeration-intensive facility."
},
{
"inputKey": "refrigeration_unit_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small number of support refrigerators or specialty units is plausible but not verified."
},
{
"inputKey": "food_retail_or_cold_storage_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity is public safety, not food retail or cold storage."
},
{
"inputKey": "equipment_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Program eligibility may depend on exact refrigeration equipment type."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely too small and non-core for grant treatment.",
"Should only calculate equipment rebates if exact eligible equipment is confirmed."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not recommended as a synthetic grant-positive scope because the facility is net-zero-oriented and likely pursuing electrification/resilience rather than new onsite fossil generation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing CHP preview cost only as a placeholder; it should not drive positive grant estimates."
},
{
"inputKey": "chp_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No CHP engineering design, thermal load profile, or capacity is supplied."
},
{
"inputKey": "continuous_thermal_load_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building is not an industrial process, hospital, or district-energy plant with an obvious continuous thermal load."
},
{
"inputKey": "new_fossil_generation_consistent_with_project_goals",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Net-zero/high-performance public building context makes a new fossil CHP system unlikely."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force CHP grant qualification.",
"Resilience should be modeled through battery, microgrid, controls, or load management unless user supplies a CHP project."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy system is not realistic for an urban municipal public safety building without a fuel source or thermal process load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost only as a placeholder; the project should not be treated as grant-positive."
},
{
"inputKey": "onsite_biomass_fuel_source",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No waste biomass, agricultural residue, wastewater biogas, or landfill gas source is associated with the facility."
},
{
"inputKey": "eligible_biogas_supply_contract",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No biogas procurement or renewable fuel agreement is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Urban public safety facility has no realistic biomass or biogas feedstock.",
"Suppress unless user supplies a specific renewable gas or waste-to-energy project."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine is not a realistic primary grant project for a downtown municipal public safety building.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost only as a placeholder; it should not produce a positive estimate."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind resource study is supplied."
},
{
"inputKey": "urban_rooftop_wind_project",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "If pursued at this address, the project would likely be urban/rooftop or very constrained, which is usually poor fit for small wind grants."
},
{
"inputKey": "zoning_or_structural_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tower, structural, or zoning approval is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force wind qualification for a downtown public institutional building.",
"Requires wind resource, zoning, structural, and interconnection evidence."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22661",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "program_name",
"value": "Utah - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The grant match in the supplied test case identifies this NEVI opportunity."
},
{
"inputKey": "applicant_is_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a municipal public agency."
},
{
"inputKey": "site_state_matches_program",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The site is in Utah and the matched program is a Utah opportunity."
},
{
"inputKey": "proposed_dc_fast_charging_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The synthetic EV scope is Level 2 fleet/visitor charging, not a NEVI-style DC fast-charging corridor project."
},
{
"inputKey": "alternative_fuel_corridor_location_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No approved corridor-site or UDOT siting evidence is provided."
},
{
"inputKey": "public_access_requirement_met",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A secure public safety facility likely cannot assume unrestricted public charging access."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Project stage is exploring and no application status is supplied."
},
{
"inputKey": "award_or_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No agency award, preapproval, or notice-to-proceed evidence is supplied."
},
{
"inputKey": "quote_or_engineer_estimate_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The EV project has only an admin-modeled preview cost, not a vendor quote."
}
],
"reasoning": "Although the applicant type and Utah geography match, the realistic synthetic EV scope is fleet-oriented Level 2 charging at a secure municipal facility. NEVI should not be calculated unless the user supplies a DC fast-charging corridor project, public-access compliance, UDOT application details, eligible-cost quote, and award/preapproval evidence."
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
"reasoning": "Existing opportunity-specific tax inputs already suppress Michigan Renewable Energy Renaissance Zone treatment."
}
],
"reasoning": "The site is in Utah, not Michigan, and no Michigan zone designation applies."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "municipality",
"value": "Salt Lake City, UT",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Existing opportunity-specific tax inputs already suppress Rhode Island property-tax valuation treatment."
}
],
"reasoning": "The site is in Utah, not Rhode Island."
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
"reasoning": "Existing opportunity-specific tax inputs already suppress Washington solar manufacturing B&O treatment."
}
],
"reasoning": "The site is in Utah and the customer is a municipal public safety facility, not a Washington solar manufacturer."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "vendor_quote_total_cost_cents",
"reason": "quote not available"
},
{
"inputKey": "eligible_cost_breakdown_by_measure_cents",
"reason": "quote not available"
},
{
"inputKey": "engineering_design_package",
"reason": "quote not available"
},
{
"inputKey": "utility_interconnection_application_status",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_submitted_date",
"reason": "application not submitted"
},
{
"inputKey": "grant_award_notice_or_preapproval",
"reason": "source requires agency approval"
},
{
"inputKey": "nevi_corridor_site_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "dc_fast_charger_specification",
"reason": "needs user decision"
},
{
"inputKey": "solar_incremental_capacity_kw_dc",
"reason": "needs user decision"
},
{
"inputKey": "existing_solar_pv_capacity_kw_dc",
"reason": "needs user decision"
},
{
"inputKey": "battery_critical_load_schedule",
"reason": "quote not available"
},
{
"inputKey": "annual_therms",
"reason": "needs user decision"
},
{
"inputKey": "hvac_equipment_schedule",
"reason": "quote not available"
},
{
"inputKey": "heat_pump_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "water_heating_load_profile",
"reason": "needs user decision"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "chp_thermal_load_study",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"Project stage is exploring, so grant application, award, preapproval, and quote-backed eligible-cost fields should remain missing unless explicitly supplied.",
"The only matched grant opportunity is Utah NEVI for EV charging; a secure municipal public safety building with Level 2 fleet charging should not be assumed to satisfy NEVI corridor, DC fast-charging, and public-access requirements.",
"The building is municipally owned and property-tax exempt, so property-tax abatements or valuation exclusions should not create customer-facing savings unless the program explicitly benefits exempt public owners.",
"Net-zero/high-performance context makes incremental solar, lighting, and HVAC savings uncertain; do not assume large untapped efficiency or PV potential without audit or design data.",
"Biomass, biogas, CHP, and small wind are poor fits for an urban public safety facility and should remain suppressed unless a user supplies a specific scoped project.",
"Agricultural, school, residential, multifamily, tribal, solar-manufacturing, out-of-state, and private commercial-only programs should not be forced to qualify for this municipal public institutional profile.",
"Critical-facility status supports resilience project plausibility but does not by itself prove eligibility, funding availability, or formula-ready incentive value."
]
}

