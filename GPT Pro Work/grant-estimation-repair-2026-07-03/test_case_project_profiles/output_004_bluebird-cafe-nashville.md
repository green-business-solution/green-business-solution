{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "bluebird-cafe-nashville",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment for a small leased Nashville restaurant, cafe, live music venue, and commercial kitchen. Inputs are designed to support realistic grant-estimation tests without forcing eligibility. The uploaded test case identifies The Bluebird Cafe, Nashville Electric Service, a self-reported gas provider of Spire, leased 2,500 sq ft restaurant/venue space, 96,000 annual kWh, and existing tax/utility facts. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form already marks the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "budgeting_no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small restaurant exploring retrofits would commonly be collecting rough budgets before vendor selection."
},
{
"inputKey": "application_preapproval_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted application, reservation, preapproval, or award documentation is present in the test case."
},
{
"inputKey": "organization_type",
"value": "commercial_business",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the applicant as a commercial business."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile is a private restaurant and live music venue; no nonprofit status is indicated."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source profile identifies a commercial business rather than a municipal, county, state, or federal entity."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building is a restaurant and public assembly venue, not a school or campus."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "NAICS and activity description indicate food service and live entertainment, not agricultural production."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, sponsorship, or tribal government affiliation is indicated."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small leased restaurant/venue would not normally own a material delivery fleet or forklift fleet."
},
{
"inputKey": "utility_customer_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site has annual electric usage and Nashville Electric Service is identified as the electric provider."
},
{
"inputKey": "electric_customer_class",
"value": "small_commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2,500 sq ft restaurant with 96,000 annual kWh is most consistent with a small commercial account, but the actual tariff was not supplied."
},
{
"inputKey": "gas_utility_provider_normalized",
"value": "Spire",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form reports Spire and explicitly notes a gas utility name-change edge case."
},
{
"inputKey": "gas_utility_legacy_name_possible",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case notes stale gas utility naming after the Nashville provider transition to Spire."
},
{
"inputKey": "ownership_relationship",
"value": "tenant",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form and normalized profile identify the site as leased."
},
{
"inputKey": "landlord_approval_required_for_permanent_equipment",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Permanent HVAC, rooftop, electrical service, solar, geothermal, battery, and kitchen infrastructure changes normally require landlord approval in leased commercial space."
},
{
"inputKey": "landlord_cost_share_committed",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case includes lease CAM property tax pass-through but no project cost-sharing agreement with the landlord."
},
{
"inputKey": "lease_remaining_months",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Lease term is important for payback and eligibility confidence but is not provided."
},
{
"inputKey": "building_square_footage",
"value": 2500,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied normalized profile parses square footage as 2,500 sq ft."
},
{
"inputKey": "primary_space_use",
"value": "restaurant_foodservice_live_music_venue",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source activity text describes live music events, food and beverage service, a small commercial kitchen, and public assembly space."
},
{
"inputKey": "commercial_kitchen_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form identifies a small commercial kitchen."
},
{
"inputKey": "public_assembly_space_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source activity text includes live music events and public assembly space."
},
{
"inputKey": "annual_kwh",
"value": 96000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual electricity use of 96,000 kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 1296000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied annual electric cost is $12,960, represented in cents."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 620000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The utility summary provides annual gas cost of $6,200, represented in cents."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 220000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The utility summary provides annual water/sewer cost of $2,200, represented in cents."
},
{
"inputKey": "annual_waste_cost_cents",
"value": 860000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The utility summary provides annual waste cost of $8,600, represented in cents."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 13.5,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case gives average cost per kWh of $0.135, represented as 13.5 cents."
},
{
"inputKey": "annual_gross_receipts_cents",
"value": 205000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic tax facts provide annual gross receipts of $2,050,000."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace approximately 12 interior stage, dining-room, kitchen, and back-of-house fixtures or lamp assemblies with dimmable commercial LED equipment compatible with venue ambience and food-service operations.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview upfront cost and is plausible for a small targeted LED replacement."
},
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary explicitly describes 12 fixture replacements."
},
{
"inputKey": "measure_type",
"value": "interior_led_fixture_and_lamp_replacement",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small restaurant projects usually involve interior lamps, downlights, track/stage lighting, kitchen task lighting, and storage/back-of-house lighting."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 6200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 6,200 kWh savings estimate is about 6.5% of annual site electricity, plausible for lighting in a small restaurant/venue with evening operating hours."
},
{
"inputKey": "dimmable_stage_or_venue_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A live music venue would likely require dimming or scene control compatibility rather than basic replacement lamps only."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile is in exploring stage and no quote is supplied."
},
{
"inputKey": "preapproval_submitted_before_purchase",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or preapproval status is supplied; many utility incentives require approval before equipment purchase."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May require utility preapproval before purchase or installation.",
"May require itemized fixture schedule, DLC/ENERGY STAR eligibility, invoice, and proof of installation.",
"Venue-specific dimming and stage-lighting equipment may not all qualify if categorized as specialty entertainment lighting."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace one aging packaged rooftop or split commercial HVAC unit serving the dining/performance area with a high-efficiency unit of similar capacity.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview and is plausible for one small commercial HVAC replacement."
},
{
"inputKey": "hvac_unit_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2,500 sq ft restaurant/venue would commonly have one primary small commercial rooftop or split system, sometimes with supplemental kitchen ventilation."
},
{
"inputKey": "cooling_capacity_tons",
"value": 7.5,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "7.5 tons is a conservative synthetic size for a small assembly/restaurant space, but kitchen load, occupancy, ventilation, and existing equipment nameplate could materially change sizing."
},
{
"inputKey": "existing_equipment_age_years",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing unit age is not provided and is needed to distinguish early replacement from end-of-life replacement."
},
{
"inputKey": "selected_efficiency_tier",
"value": "high_efficiency_code_exceeding_unit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test retrofit is high-efficiency HVAC replacement, so this assumes equipment exceeds baseline code performance."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 7800,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "About 8% of annual kWh is a plausible admin-modeled savings value for replacing an inefficient small commercial cooling unit."
},
{
"inputKey": "landlord_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "HVAC equipment is a permanent building improvement and the applicant is a tenant."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment quote or model number is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Requires actual equipment model, AHRI or equivalent performance documentation, and itemized quote.",
"Tenant may need written landlord authorization.",
"Eligibility may be suppressed until preapproval status is known."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Evaluate replacing or supplementing gas-fired space heating with a commercial heat pump HVAC system for the dining/performance area while retaining kitchen-specific ventilation equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview for a small commercial heat pump retrofit."
},
{
"inputKey": "heat_pump_unit_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One primary unit is plausible for 2,500 sq ft if serving the public area."
},
{
"inputKey": "heating_capacity_btu_per_hr",
"value": 90000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic capacity based on a 7.5-ton equivalent system; actual sizing depends on load calculation and ventilation requirements."
},
{
"inputKey": "existing_heating_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is present and the building is a restaurant, making gas space heating or kitchen gas load likely."
},
{
"inputKey": "estimated_annual_gas_savings_cents",
"value": 145000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic estimate assumes partial space-heating gas reduction, not full kitchen gas elimination."
},
{
"inputKey": "estimated_incremental_annual_kwh",
"value": 5200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heat pump conversion may increase electric use even if total energy cost or emissions decline."
},
{
"inputKey": "electrical_panel_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing electrical service capacity is not provided."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Heat pump incentives typically require model, capacity, efficiency, and cost documentation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for commercial heat pump incentives if equipment meets efficiency requirements.",
"Natural gas kitchen loads should not be assumed electrified.",
"May need landlord approval and electrical service review."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Replace or add efficient reach-in refrigerators/freezers and bar or kitchen refrigeration serving food and beverage operations.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview and is plausible for several commercial food-service refrigeration units."
},
{
"inputKey": "refrigeration_unit_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small cafe/restaurant commonly has a limited set of reach-in coolers/freezers and undercounter or bar refrigeration."
},
{
"inputKey": "equipment_types",
"value": [
"commercial_reach_in_refrigerator",
"commercial_reach_in_freezer",
"undercounter_or_bar_refrigerator"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic equipment types for a small commercial kitchen and beverage-service venue."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 4200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A modest refrigeration upgrade savings estimate is plausible relative to 96,000 annual kWh."
},
{
"inputKey": "energy_star_or_equivalent_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Food-service refrigeration incentives commonly require efficient listed equipment."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No model number or vendor quote is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Requires exact model numbers and efficiency listing.",
"Used, refurbished, or non-listed specialty beverage equipment may not qualify.",
"Rebate may be equipment-specific rather than grant-style."
]
},
{
"retrofitTypeId": "refrigeration_ec_motor_retrofit",
"projectScopeSummary": "Retrofit evaporator fan motors in existing walk-in or reach-in refrigeration equipment with electronically commutated motors where existing equipment is compatible.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 116400,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview and is plausible for a small EC motor retrofit."
},
{
"inputKey": "ec_motor_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Four motors is plausible if the site has a small walk-in cooler or multiple refrigerated cases, but equipment inventory is not provided."
},
{
"inputKey": "walk_in_cooler_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case says commercial kitchen but does not confirm a walk-in cooler."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 2100,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are plausible but depend heavily on motor count, runtime, and existing motor type."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A motor inventory and quote are needed to calculate equipment-specific incentives."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Should remain suppressed if no walk-in or eligible evaporator fan motor inventory is confirmed.",
"Requires existing equipment details and motor count.",
"May not be relevant if refrigeration equipment is replaced instead of retrofitted."
]
},
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "Small-site tune-up focused on HVAC controls, thermostat schedules, kitchen ventilation runtime, lighting controls, refrigeration maintenance settings, and after-hours loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 91800,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview and is plausible for a focused small-building assessment plus minor implementation support."
},
{
"inputKey": "study_cost_cents",
"value": 45000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small-site audit or tune-up study could be a few hundred dollars if scoped narrowly."
},
{
"inputKey": "minor_implementation_cost_cents",
"value": 46800,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Remaining preview cost is assigned to minor controls, sensor, filter, and scheduling adjustments."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 4800,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A roughly 5% savings assumption is reasonable for schedule and controls improvements in an event-driven venue."
},
{
"inputKey": "event_driven_operating_schedule",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly notes event-driven operating schedules."
},
{
"inputKey": "study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No completed retro-commissioning report is supplied."
},
{
"inputKey": "approved_trade_ally_or_provider_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No provider has been selected in the supplied profile."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need an approved provider or utility-approved study scope.",
"Savings should be treated as preliminary until a study is completed.",
"Small project size may fall below minimum incentive thresholds in some programs."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal preheat system for kitchen dishwashing and restroom hot water, subject to roof access, landlord approval, and available solar exposure.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview for a small commercial solar water heating concept."
},
{
"inputKey": "collector_area_sq_ft",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic small-system assumption; actual sizing depends on hot-water load, roof space, and structural review."
},
{
"inputKey": "storage_tank_gallons",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Plausible for a small restaurant preheat system but not confirmed."
},
{
"inputKey": "roof_or_exterior_area_controlled_by_tenant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased storefront tenant usually does not control roof rights without landlord approval."
},
{
"inputKey": "landlord_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Roof-mounted or exterior mechanical work would require landlord consent."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No design, roof survey, or quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Technically possible but unlikely for a leased small restaurant unless landlord participates.",
"Roof access, structural review, and hot-water load must be confirmed.",
"Should generally remain quote-required or scope-required rather than automatically calculated."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump concept for space conditioning is not realistic for this leased 2,500 sq ft restaurant tenant because drilling or ground-loop installation would require property control and major landlord participation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview but should not drive an automatic grant estimate because scope feasibility is low."
},
{
"inputKey": "ground_loop_feasible",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small leased commercial tenant at a restaurant storefront would not normally control land for drilling or trenching."
},
{
"inputKey": "property_owner_project_sponsor",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No landlord sponsorship is provided."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study, drilling quote, or HVAC design is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely infeasible for a tenant-only project.",
"Requires landlord/property-owner sponsorship and site feasibility.",
"Should suppress or mark needs_project_scope unless property-control facts change."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery backup concept for outage resilience during live events, but scale and cost are high relative to the small leased site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview, but this is a high-cost project relative to the site and should not be assumed likely."
},
{
"inputKey": "battery_capacity_kwh",
"value": 120,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "120 kWh is a plausible small commercial resilience size, but no load study is provided."
},
{
"inputKey": "battery_power_kw",
"value": 60,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "60 kW could support selected critical loads but may not cover kitchen and HVAC loads."
},
{
"inputKey": "critical_loads_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No critical-load panel or backup-load list is supplied."
},
{
"inputKey": "demand_charges_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Demand-charge fields are available but no actual demand charges are provided."
},
{
"inputKey": "landlord_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Battery installation is a permanent electrical improvement requiring space, code review, and landlord approval."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No battery quote, one-line diagram, or interconnection study is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be economically weak without demand charges or resilience-specific funding.",
"Requires electrical capacity review, critical-load design, and landlord approval.",
"Should not calculate incentives from generic storage opportunities without project evidence."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage concept for load shifting is not realistic at this small restaurant unless paired with a larger HVAC/chiller system, which is not indicated.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview but is too large and specialized for the stated facility unless a larger system exists."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No chiller, hydronic loop, or storage design is present."
},
{
"inputKey": "central_chiller_or_hydronic_system_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2,500 sq ft restaurant would typically use packaged or split HVAC, not a central chiller plant."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No engineering scope or quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unrealistic for this customer profile without a central chilled-water or thermal plant.",
"Should be marked not relevant or needs_project_scope."
]
},
{
"retrofitTypeId": "electric_forklift_material_handling",
"projectScopeSummary": "Electric forklift or material-handling equipment is not relevant for a small cafe and live music venue with no warehouse or fleet operations.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 3200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Admin preview cost exists, but this is not a realistic project for the stated business."
},
{
"inputKey": "existing_forklift_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small restaurants generally do not operate forklifts."
},
{
"inputKey": "warehouse_or_material_handling_operation_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile describes food service and live music, not warehousing or industrial material handling."
},
{
"inputKey": "fleet_replacement_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owned fleet or forklift replacement project is identified."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should be suppressed as not relevant unless user later identifies owned material-handling equipment."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Combined heat and power is not a realistic project for this small leased restaurant because electric and thermal loads are too small and project cost is disproportionate.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview, but the scope should not be treated as realistic for this profile."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 25,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A very small CHP size is the only plausible scale, but it still likely lacks sufficient coincident thermal load and operational complexity justification."
},
{
"inputKey": "continuous_thermal_load_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The restaurant has hot-water and kitchen loads but not a clearly continuous large thermal load suitable for CHP."
},
{
"inputKey": "landlord_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "CHP would require gas, electrical, exhaust, and building integration approvals."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No CHP engineering study or quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not relevant for a 96,000 kWh/year leased restaurant.",
"Should suppress unless an engineering study demonstrates economic and operational feasibility."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Microgrid concept is too large for the single small leased restaurant tenant and should be suppressed unless pursued by the property owner or a multi-tenant site sponsor.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview but is not realistic for the applicant alone."
},
{
"inputKey": "microgrid_serves_multiple_facilities",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile describes a single leased site."
},
{
"inputKey": "critical_facility_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A restaurant/live music venue is not normally a critical public facility."
},
{
"inputKey": "property_owner_or_utility_sponsor",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No property-owner, campus, municipal, or utility sponsor is identified."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not realistic for a tenant-only small business project.",
"Potentially relevant only if property owner or utility sponsors a broader resilience project."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy system is not appropriate for this profile; restaurant organic waste volume is too small and there is no indication of anaerobic digestion, agricultural, wastewater, or landfill gas operations.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview but should not be treated as realistic for this customer."
},
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small restaurant may have food waste but not enough reliable feedstock for energy production."
},
{
"inputKey": "agricultural_or_wastewater_operation_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile is a restaurant/live venue, not an agricultural or wastewater facility."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should be marked not relevant or likely ineligible for typical biomass/biogas grants.",
"Do not infer qualification from food-service organic waste alone."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not realistic for an urban/suburban leased restaurant storefront due to zoning, roof/land control, turbulence, and project scale.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Matches the admin preview but should not drive a positive estimate."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study is provided."
},
{
"inputKey": "site_has_suitable_land_or_tower_rights",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased restaurant site would not normally have control of land or tower rights for a wind turbine."
},
{
"inputKey": "landlord_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Any turbine installation would require property-owner approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should suppress as unrealistic for this site.",
"Do not calculate incentives without site-control and wind-resource evidence."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not a likely standalone project for a small leased existing restaurant unless part of a major tenant improvement or landlord-led building upgrade.",
"inputFacts": [
{
"inputKey": "certification_project_type",
"value": "none_selected",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No certification scope is provided and the savings preview is unsupported."
},
{
"inputKey": "major_renovation_underway",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring and no major renovation is described."
},
{
"inputKey": "certification_consultant_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No consultant proposal or certification budget is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unsupported in the preview and not a typical grant-estimation target for this small tenant.",
"May be relevant only if part of a broader renovation or landlord-led certification effort."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "UTIL_NES_commercial_lighting_or_energy_efficiency_rebate",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "electric_utility_provider",
"value": "Nashville Electric Service",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form identifies Nashville Electric Service."
},
{
"inputKey": "customer_class",
"value": "small_commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Likely customer class based on business type and 96,000 annual kWh, but tariff should be verified from bill."
},
{
"inputKey": "preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval or reservation is in the test case."
},
{
"inputKey": "itemized_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Lighting and equipment programs generally require itemized measure documentation."
}
],
"reasoning": "Lighting, HVAC, refrigeration, and tune-up measures are plausible for this profile, but the estimate should remain conditional or suppressed until bill class, measure list, quote, and preapproval status are known."
},
{
"opportunityId": "Spire_or_successor_commercial_gas_equipment_rebate",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "gas_utility_provider_self_reported",
"value": "Spire",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile reports Spire and notes a gas-provider naming edge case."
},
{
"inputKey": "gas_rate_schedule",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas rate schedule is available as a possible field but not supplied."
},
{
"inputKey": "gas_equipment_scope_selected",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The project list does not specify a gas water heater, boiler, fryer, oven, or other gas-equipment replacement."
}
],
"reasoning": "Gas-provider normalization should be tested, but no gas-efficiency measure should be forced into qualification without actual equipment scope."
},
{
"opportunityId": "federal_commercial_energy_efficiency_tax_deduction_or_credit",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "taxable_commercial_business",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source profile and tax facts identify a commercial business with gross receipts."
},
{
"inputKey": "building_owner_is_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a tenant under the supplied ownership profile."
},
{
"inputKey": "tax_credit_transfer_or_allocation_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Tenant/landlord allocation and tax treatment are not supplied."
},
{
"inputKey": "placed_in_service_date",
"value": null,
"valueType": "date",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No project has been installed or placed in service."
}
],
"reasoning": "Tax incentives may be relevant for some commercial efficiency equipment, but calculations should not proceed without ownership, tax, basis, and placed-in-service facts."
},
{
"opportunityId": "federal_investment_tax_credit_solar_storage_geothermal",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "eligible_renewable_or_storage_project_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar thermal, geothermal, and storage are listed in previews but are not realistic selected projects for the leased small tenant."
},
{
"inputKey": "tax_owner_of_energy_property",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Tenant, landlord, or third-party ownership would materially affect eligibility."
},
{
"inputKey": "roof_or_land_site_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a tenant and no roof or land rights are provided."
}
],
"reasoning": "Renewable and storage tax-credit logic should be suppressed or marked scope-required until there is a real project sponsor, site control, and quote."
},
{
"opportunityId": "state_or_local_restaurant_small_business_energy_grant",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "small_business",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form lists 11-50 employees and a small 2,500 sq ft site."
},
{
"inputKey": "grant_application_open_or_invited",
"value": null,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No current program round, invitation, or application documentation is supplied."
},
{
"inputKey": "probability_evidence",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not include any award history, agency eligibility confirmation, or application score."
}
],
"reasoning": "Do not fabricate small-business grant probability. Suppress probabilistic grants without evidence."
},
{
"opportunityId": "agriculture_rural_energy_or_farm_energy_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The business is a restaurant/live music venue, not a farm or agricultural producer."
},
{
"inputKey": "rural_small_business_status",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The Nashville address does not establish rural eligibility, and rural-program status should not be inferred."
}
],
"reasoning": "Agriculture-focused grants should generally block on applicant type and site context."
},
{
"opportunityId": "public_sector_nonprofit_school_energy_program",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a commercial business."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No nonprofit status is indicated."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is not a school or campus."
}
],
"reasoning": "Programs limited to government, nonprofit, or educational entities should be marked ineligible."
},
{
"opportunityId": "fleet_or_material_handling_electrification_grant",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fleet ownership is indicated."
},
{
"inputKey": "existing_forklift_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a small restaurant/venue rather than a warehouse."
}
],
"reasoning": "Material-handling electrification should be suppressed unless the user later provides fleet or forklift evidence."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "vendor_quotes",
"reason": "quote not available"
},
{
"inputKey": "itemized_equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "utility_bill_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "electric_customer_class_confirmed",
"reason": "needs user decision"
},
{
"inputKey": "gas_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "preapproval_or_rebate_reservation_number",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_status",
"reason": "application not submitted"
},
{
"inputKey": "agency_eligibility_determination",
"reason": "source requires agency approval"
},
{
"inputKey": "landlord_written_approval",
"reason": "needs user decision"
},
{
"inputKey": "lease_remaining_term",
"reason": "needs user decision"
},
{
"inputKey": "roof_rights_or_land_control",
"reason": "needs user decision"
},
{
"inputKey": "critical_load_panel_or_resilience_load_list",
"reason": "needs user decision"
},
{
"inputKey": "wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "geothermal_site_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_feedstock_supply_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "forklift_replacement_quote",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The applicant is a private commercial tenant, not a public entity, school, nonprofit, tribal entity, or agricultural producer.",
"The site is a small 2,500 sq ft restaurant/live music venue; large-scale renewable, CHP, microgrid, geothermal, thermal storage, biomass, wind, and forklift projects should not be treated as normal customer pursuits.",
"Permanent building improvements require landlord approval because the applicant leases the space.",
"Utility incentives should not be calculated as final without customer class, rate schedule, itemized quote, eligible equipment model numbers, and preapproval/application status.",
"Gas utility naming should be normalized carefully because the test case intentionally includes a Spire name-change edge case.",
"Event-driven operating schedules make lighting, controls, and retro-commissioning plausible, but savings should remain preliminary until actual hours and controls sequences are confirmed.",
"Do not infer grant probability for small-business or local programs without current application, eligibility confirmation, or award evidence."
]
}
