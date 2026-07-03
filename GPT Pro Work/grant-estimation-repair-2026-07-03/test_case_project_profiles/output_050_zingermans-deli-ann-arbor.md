{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "zingermans-deli-ann-arbor",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-profile enrichment for an Ann Arbor deli, restaurant, specialty grocery, and refrigeration-heavy food retail site. Existing fixture facts were used for location, utility, organization type, building size, annual electric use, annual electric cost, tax facts, and RERZ nonqualification. File citation: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project fixture states that the project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_quote_scoping",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A multi-measure restaurant and grocery efficiency project at exploration stage would normally not yet have contractor quotes or final equipment selections."
},
{
"inputKey": "site_control_status",
"value": "unknown_tenant_or_owner",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ownership status is explicitly listed as not sure, so incentives requiring owner authorization should remain conditional."
},
{
"inputKey": "landlord_authorization_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ownership or lease-control status is unknown, and building-shell, rooftop, electrical-service, and mechanical projects may require landlord approval."
},
{
"inputKey": "organization_type",
"value": "commercial_business",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form identifies the organization as a commercial business."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This profile is modeled as a private deli, restaurant, specialty grocery, and food-service business rather than a nonprofit applicant."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The organization is a commercial business, not a municipality, school district, state agency, or other public entity."
},
{
"inputKey": "is_school",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building is a restaurant and commercial kitchen, so school-only incentives should not qualify."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The NAICS and activity description indicate prepared foods, cafe, and grocery retail, not agricultural production."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied profile facts indicate tribal ownership or tribal government status."
},
{
"inputKey": "is_low_income_housing_provider",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is commercial food service and retail, not residential housing."
},
{
"inputKey": "utility_customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 13,000 square foot restaurant and grocery site with 540,000 annual kWh on DTE Electric is realistically a commercial electric customer, but the exact tariff should be confirmed from bills."
},
{
"inputKey": "electric_utility_provider",
"value": "DTE Electric",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "DTE Electric is already supplied in the test case as the self-reported electric utility."
},
{
"inputKey": "gas_utility_provider",
"value": "DTE Gas",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "DTE Gas is already supplied in the source form."
},
{
"inputKey": "annual_kwh",
"value": 540000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric use is already present in the site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 8100000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied annual electric cost is $81,000."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 2850000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied annual gas cost is $28,500."
},
{
"inputKey": "refrigeration_intensity",
"value": "high",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The business is described as a deli, prepared-foods retailer, and specialty grocery with refrigerated food merchandising; refrigeration should be prioritized over generic office measures."
},
{
"inputKey": "food_service_hot_water_intensity",
"value": "high",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Restaurant and commercial kitchen operations typically have substantial dishwashing and sanitation hot-water loads."
},
{
"inputKey": "baseline_energy_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is still exploring, so a formal ASHRAE-style or utility trade-ally audit should not be assumed."
},
{
"inputKey": "energy_audit_quote_cost_cents",
"value": 750000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A detailed audit for a 13,000 square foot food-service and refrigeration-heavy site could plausibly be in the mid-four-figure range, but this should not be used where a quoted audit cost is required."
},
{
"inputKey": "has_formal_capital_budget_approval",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile indicates exploration rather than approved capital project procurement."
},
{
"inputKey": "incentive_preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application, reservation, or preapproval record is supplied; prescriptive utility rebates should generally be treated as not submitted."
},
{
"inputKey": "work_started_before_preapproval",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No current work order is present. This should be verified because some utility programs require preapproval before purchase or installation."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Replace aging open and reach-in refrigerated display cases and improve controls for a deli, prepared foods, and specialty grocery operation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 3450000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview cost is unrealistically low for refrigeration equipment in a 13,000 square foot deli/grocery hybrid; a $34,500 placeholder is more plausible for targeted case doors, controls, ECM motors, and one small case replacement, but a quote is still required."
},
{
"inputKey": "measure_package",
"value": [
"night_covers_or_case_doors",
"ecm_evaporator_fan_motors",
"anti_sweat_heater_controls",
"floating_head_pressure_or_compressor_controls",
"high_efficiency_reach_in_refrigerated_case"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic measures for refrigerated merchandising and back-of-house food storage."
},
{
"inputKey": "refrigerated_display_cases_count",
"value": 10,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A specialty deli and retail food site of this size plausibly has multiple reach-in and display cases, but the count must be verified during a walk-through."
},
{
"inputKey": "walk_in_cooler_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Two walk-in coolers is plausible for prepared foods and specialty grocery operations, but no equipment schedule is available."
},
{
"inputKey": "walk_in_freezer_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One walk-in freezer is a realistic planning assumption for a restaurant and deli, but should not drive a final estimate without site verification."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 42000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A roughly 8% electric reduction is plausible for targeted refrigeration controls at a refrigeration-heavy site, but equipment-specific calculators are required for grant or rebate calculation."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No refrigeration quote, measure workbook, or trade-ally submission is supplied."
},
{
"inputKey": "equipment_cut_sheets_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Specific model numbers and efficiency ratings are not available in the supplied fixture."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely relevant for commercial utility prescriptive or custom incentives, but exact eligibility depends on DTE program rules, preapproval timing, measure category, and trade-ally documentation.",
"Do not calculate final incentives from placeholder case counts or savings; require quote, cut sheets, and baseline equipment details."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace remaining fluorescent, halogen, and specialty food-retail lighting with LED fixtures and lamps in sales, kitchen, storage, and back-of-house areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview cost is $1,604.25 for 12 fixtures, which is plausible only for a very small remaining retrofit or lamp/fixture subset, not a full-building relight."
},
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview explicitly assumes 12 fixture replacements."
},
{
"inputKey": "project_scope_type",
"value": "small_remaining_led_retrofit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A well-known commercial food retail site may already have many LEDs; a 12-fixture scope is best treated as a small remaining retrofit."
},
{
"inputKey": "annual_operating_hours",
"value": 5000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Food-service and grocery lighting has long weekly operating hours, including prep and cleanup periods."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 4800,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 12-fixture replacement with long operating hours could save several thousand kWh annually, but wattages and hours are not verified."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No lighting quote or fixture schedule is present."
},
{
"inputKey": "preapproval_required_before_purchase",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Many utility lighting incentives require preapproval or at least documentation before installation; this should be treated conservatively until program rules are checked."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Commercial lighting incentives may be available, but this small scope may have a low incentive value.",
"Suppress final incentive estimates until fixture wattages, quantities, installation date, and preapproval status are known."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Install occupancy/vacancy sensors and scheduling controls for storage, office, back-of-house, restroom, and prep areas while avoiding guest-facing areas where controls may be disruptive.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 132200,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview cost is $1,322, which fits a limited controls retrofit rather than a whole-building networked controls project."
},
{
"inputKey": "controlled_area_sqft",
"value": 4500,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Back-of-house, storage, office, restroom, and prep areas could represent roughly one-third of the 13,000 square foot site."
},
{
"inputKey": "sensor_count",
"value": 14,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small controls package with about a dozen sensors is realistic for back-of-house areas, but final design is unknown."
},
{
"inputKey": "networked_lighting_controls",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At the preview cost level, standalone sensors and scheduling are more realistic than full networked controls."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No lighting controls quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Controls incentives may apply if equipment and controlled wattage meet program rules.",
"Guest-facing spaces may be excluded if controls affect customer experience."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop or split HVAC equipment serving kitchen, dining, retail, and office areas with high-efficiency units and improved controls.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7980000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview shows $7,980, which is too low for commercial HVAC replacement. A $79,800 planning value is more realistic for a limited replacement of several small rooftop or split systems."
},
{
"inputKey": "hvac_units_replaced_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 13,000 square foot restaurant and retail site could plausibly have multiple packaged units or zones, but the mechanical schedule is unknown."
},
{
"inputKey": "total_nominal_cooling_tons",
"value": 24,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "About 24 tons is a conservative planning placeholder for mixed restaurant, retail, and back-of-house loads, not a design calculation."
},
{
"inputKey": "selected_equipment_type",
"value": "high_efficiency_packaged_rooftop_units_or_split_heat_pumps",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Either packaged rooftop units or split heat pumps could be appropriate depending on the existing building; exact equipment must be confirmed."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 26000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modeled HVAC reduction is plausible but uncertain because kitchen ventilation, refrigeration heat rejection, and existing unit condition are unknown."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 2500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "If gas heating is replaced or upgraded, therm savings may occur; however, kitchen gas loads may dominate and should not be inferred from HVAC alone."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No mechanical quote, existing equipment schedule, AHRI rating, or load calculation is present."
},
{
"inputKey": "replacement_due_to_failure",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No emergency replacement is stated. This matters because some incentives require planned preapproval."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely relevant for commercial HVAC rebates, but eligibility depends on exact equipment efficiency, capacity, baseline, fuel type, and preapproval.",
"Do not use the preview cost as a final grant basis."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Targeted air sealing around loading/service doors, kitchen penetrations, attic or roofline leakage points, and customer entry vestibule gaps.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 194600,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $1,946 is plausible for targeted weatherstripping and sealing, not a full envelope retrofit."
},
{
"inputKey": "scope_type",
"value": "targeted_air_sealing_and_door_weatherstripping",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A restaurant and retail building with service doors and frequent deliveries can reasonably pursue targeted air sealing."
},
{
"inputKey": "door_count_treated",
"value": 6,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A site with customer entrances, kitchen/service doors, and delivery access could plausibly treat about six doors, but the count requires a site walk-through."
},
{
"inputKey": "blower_door_or_commissioning_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No envelope testing is present, so quantified savings should remain uncertain."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No weatherization quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This is a realistic operations project but may be too small for many grant programs.",
"Could be bundled with HVAC or audit-driven custom incentives if savings documentation is available."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Limited roofline, attic, or back-of-house insulation improvement where accessible during maintenance or renovation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $3,160 fits only a limited insulation scope, not a comprehensive commercial envelope upgrade."
},
{
"inputKey": "insulated_area_sqft",
"value": 1200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A targeted accessible area is more realistic than assuming the full 13,000 square foot building can be insulated."
},
{
"inputKey": "building_owner_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership status is unknown, and insulation work may affect the building envelope."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No insulation contractor proposal or existing R-value information is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely low priority compared with refrigeration, HVAC, and hot water.",
"May be ineligible or uneconomic unless bundled with a larger renovation or utility custom project."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Evaluate solar thermal preheat for dishwashing and food-service hot-water loads, subject to roof access, structural capacity, and ownership approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 6800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $6,800 is likely too low for commercial solar thermal. A $68,000 planning value is more realistic for a small commercial solar water-heating project, though feasibility is uncertain."
},
{
"inputKey": "collector_area_sqft",
"value": 360,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest collector area is plausible for commercial kitchen preheat but must be verified against roof constraints."
},
{
"inputKey": "solar_storage_gallons",
"value": 300,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal systems serving food-service hot water often require storage; the placeholder should not be used without design."
},
{
"inputKey": "roof_area_available",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Roof availability, shading, and mechanical equipment conflicts are unknown."
},
{
"inputKey": "building_owner_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Rooftop solar thermal work would require site control and possibly landlord approval."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No solar thermal feasibility study, quote, or roof assessment is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially relevant because the facility has kitchen hot-water loads, but uncertain roof access and project economics make this a feasibility item rather than a likely near-term grant calculation.",
"Suppress until roof/site-control facts and contractor design are available."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Optional behind-the-meter battery for resilience of refrigeration and point-of-sale loads during outages, not primarily an energy-efficiency measure.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $72,800 is plausible for a small commercial battery, though it would not cover a large grocery refrigeration load for long."
},
{
"inputKey": "battery_capacity_kwh",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 120 kWh battery is a plausible small commercial resilience placeholder."
},
{
"inputKey": "battery_power_kw",
"value": 60,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 60 kW inverter is plausible for critical-load support but not a full-building backup solution."
},
{
"inputKey": "critical_loads_supported",
"value": [
"walk_in_coolers",
"selected_refrigerated_cases",
"point_of_sale",
"networking",
"emergency_lighting"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A food retail site would prioritize refrigeration and transaction systems during an outage."
},
{
"inputKey": "paired_with_new_solar_pv",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No solar PV project is listed in the retrofit summaries, so storage should not be assumed to be paired with new solar."
},
{
"inputKey": "resilience_grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No resilience grant application or reservation is supplied."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No storage quote, one-line diagram, or interconnection information is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Battery storage is operationally useful for food preservation but may not qualify for efficiency grants.",
"Many storage incentives require solar pairing, critical-facility designation, income-qualified/community criteria, or interconnection documentation that is not present."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install limited Level 2 charging for customers, staff, or delivery vehicles if parking control and electrical capacity are available.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $8,480 is plausible for a small Level 2 charger installation with limited trenching and electrical work."
},
{
"inputKey": "charger_level",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 is more realistic than DC fast charging for a deli/restaurant site with limited parking and uncertain fleet use."
},
{
"inputKey": "charging_ports_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two ports is a realistic small commercial installation for staff/customer use."
},
{
"inputKey": "fleet_vehicle_count",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not establish whether the business owns delivery or catering vehicles."
},
{
"inputKey": "parking_spaces_controlled_count",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Parking control is not supplied and is essential for EV charging eligibility and feasibility."
},
{
"inputKey": "public_access_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "At a constrained restaurant/retail site, staff or limited customer charging is more likely than a public charging station."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No EVSE quote, site plan, panel capacity review, or utility make-ready approval is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not assume EV charging incentives without parking control, utility preapproval, and use case.",
"May be low priority compared with refrigeration and kitchen energy measures."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump conversion is not a realistic near-term project for a dense restaurant/retail site with unknown site control and likely limited drilling area.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $15,760 is not realistic for commercial geothermal and should not be used for a grant calculation."
},
{
"inputKey": "site_area_for_wells_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ground-loop feasibility cannot be assumed for a downtown commercial food-service location."
},
{
"inputKey": "landlord_or_owner_approval_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ownership status is unknown and geothermal would require significant property control."
},
{
"inputKey": "engineering_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No geothermal feasibility or engineering study is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the user provides a real feasibility study, site-control evidence, and quote.",
"Not a typical first-priority project for this profile."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not modeled as a likely project for this single deli/retail site without a year-round thermal-load study and significant capital approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $120,000 may be plausible for a very small CHP package but is still speculative without load analysis."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 35,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small CHP unit could theoretically serve a portion of a restaurant load, but thermal utilization and economics are unknown."
},
{
"inputKey": "thermal_load_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "CHP grant estimates should require a thermal-load study or engineering analysis."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application is supplied."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No CHP quote or engineering package is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not a typical grant-fit project unless the site has documented year-round hot-water or process heat loads and strong run hours.",
"Suppress until engineering and interconnection status are known."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas generation is not a realistic on-site retrofit for this deli/restaurant and specialty grocery profile.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost should remain a placeholder and should not imply a real biomass or biogas project."
},
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A restaurant may generate food waste, but not the volume or consistency normally needed for an on-site biomass or biogas energy system."
},
{
"inputKey": "anaerobic_digester_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is not an agricultural, wastewater, landfill, or large food-processing facility."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No biomass or biogas project documentation is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as not relevant to this customer unless a separate off-site waste-to-energy partnership is documented.",
"Do not force a renewable-energy grant calculation from normal restaurant food waste."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "A microgrid is not a realistic near-term project for this single commercial food-service location without solar, storage, controls, and critical-facility designation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $109,200 is far below a typical complete commercial microgrid and should not be used as a realistic grant basis."
},
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A deli and specialty grocery is operationally important but is not normally a formally designated public critical facility."
},
{
"inputKey": "solar_pv_in_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar PV is not listed among the current retrofit summaries."
},
{
"inputKey": "microgrid_controller_in_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No project scope indicates islanding controls or a microgrid controller."
},
{
"inputKey": "utility_interconnection_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection or study documentation is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress as not relevant unless the user provides a real microgrid design and resilience program application.",
"Battery-only resilience should be evaluated separately."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not realistic for this downtown Ann Arbor commercial food-service and retail site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost should remain a placeholder and should not be treated as an intended project."
},
{
"inputKey": "suitable_wind_resource_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind resource, tower location, zoning path, or site-control fact is supplied."
},
{
"inputKey": "zoning_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A dense commercial site is unlikely to be a straightforward small-wind installation location."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind project quote or feasibility study is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as unrealistic for this customer profile.",
"Do not calculate renewable-generation grants for wind without a documented site-specific project."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage is not modeled as a likely project unless paired with a detailed refrigeration, HVAC, or load-shifting design.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost of $55,100 is a placeholder; thermal storage requires engineering around refrigeration or HVAC load profiles."
},
{
"inputKey": "thermal_storage_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No chilled-water, ice-storage, phase-change, or refrigeration thermal-storage design is specified."
},
{
"inputKey": "demand_response_or_time_of_use_use_case",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes electricity cost but no rate schedule, demand charges, or interval data to justify storage."
},
{
"inputKey": "engineering_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No engineering study or control sequence is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be relevant only as part of a custom refrigeration or HVAC project.",
"Suppress generic grant estimates until load-shape and engineering data are available."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "approved_rerz_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing synthetic tax facts indicate no approved Renewable Energy Renaissance Zone designation."
},
{
"inputKey": "qualified_company_operations",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The business is modeled as deli, cafe, prepared-foods, and specialty grocery operations, not renewable-energy company operations in an approved zone."
},
{
"inputKey": "approved_zone_term_years",
"value": null,
"valueType": "number",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "No approved RERZ term is present."
},
{
"inputKey": "program_year",
"value": null,
"valueType": "number",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Program year cannot be derived without an approved zone start date."
},
{
"inputKey": "phaseout_multiplier",
"value": null,
"valueType": "number",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Phaseout multiplier cannot be derived without approved RERZ documents."
}
],
"reasoning": "Keep this opportunity suppressed. The profile has otherwise-due tax amounts, but the core eligibility facts are negative."
},
{
"opportunityId": "DTE_COMMERCIAL_REFRIGERATION_PRESCRIPTIVE_OR_CUSTOM",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "electric_utility_provider",
"value": "DTE Electric",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case lists DTE Electric as the electric utility."
},
{
"inputKey": "customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a commercial restaurant and grocery facility."
},
{
"inputKey": "refrigeration_measure_category",
"value": [
"ecm_evaporator_fan_motors",
"anti_sweat_heater_controls",
"case_doors_or_night_covers",
"floating_head_pressure_controls"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These measures align with the site's refrigeration-heavy use profile."
},
{
"inputKey": "quote_or_trade_ally_application_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture does not include a refrigeration quote or utility application."
},
{
"inputKey": "installation_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The project is in exploration and should be treated as not installed."
}
],
"reasoning": "Refrigeration is the best-fit energy measure for this customer, but any incentive should remain quote- and application-dependent."
},
{
"opportunityId": "DTE_COMMERCIAL_LIGHTING_PRESCRIPTIVE_OR_CUSTOM",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview assumes 12 fixture replacements."
},
{
"inputKey": "existing_fixture_wattage",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing fixture wattage is required to calculate lighting savings."
},
{
"inputKey": "proposed_fixture_wattage",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Proposed wattage and fixture type are required for prescriptive or custom lighting calculations."
},
{
"inputKey": "preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility application record is supplied."
}
],
"reasoning": "A small remaining LED project may be eligible, but the current profile lacks wattage, model, and application facts."
},
{
"opportunityId": "DTE_COMMERCIAL_HVAC_PRESCRIPTIVE_OR_CUSTOM",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "hvac_units_replaced_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Three units is a reasonable placeholder but must be verified."
},
{
"inputKey": "total_nominal_cooling_tons",
"value": 24,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A rough planning value only; exact capacity is required."
},
{
"inputKey": "proposed_efficiency_rating",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "HVAC rebate calculations require equipment-specific efficiency ratings such as IEER, SEER2, EER, COP, or AFUE depending on equipment type."
},
{
"inputKey": "ahri_certificate_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No AHRI certificate or equivalent equipment documentation is supplied."
},
{
"inputKey": "preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application status is supplied."
}
],
"reasoning": "HVAC is a realistic project category, but formula-ready incentive calculation requires equipment type, efficiency, baseline, cost, and application timing."
},
{
"opportunityId": "COMMERCIAL_ENERGY_AUDIT_OR_CUSTOM_STUDY",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit report is supplied."
},
{
"inputKey": "audit_quote_cost_cents",
"value": 750000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A planning placeholder for a detailed audit; should not be treated as a submitted quote."
},
{
"inputKey": "audit_scope_includes_refrigeration",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Refrigeration should be included because it is central to the facility's energy profile."
},
{
"inputKey": "audit_scope_includes_kitchen_hot_water",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Kitchen hot-water loads are likely important for this building type."
}
],
"reasoning": "An audit or custom study is realistic and could unlock better calculations, but the current project is not formula-ready."
},
{
"opportunityId": "EV_CHARGING_MAKE_READY_OR_WORKPLACE_CHARGING",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "charging_ports_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two Level 2 ports are plausible for limited staff or customer charging."
},
{
"inputKey": "parking_control_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Parking control is unknown and essential for charging eligibility."
},
{
"inputKey": "utility_make_ready_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No make-ready or EVSE application is present."
},
{
"inputKey": "fleet_electrification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The record does not show an owned vehicle fleet or delivery electrification plan."
}
],
"reasoning": "EV charging should not be forced into a positive estimate without parking and use-case evidence."
},
{
"opportunityId": "RENEWABLE_OR_STORAGE_RESILIENCE_GRANT_GENERIC",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No public critical-facility role is supplied."
},
{
"inputKey": "solar_pv_in_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar PV is not among the listed retrofit summaries."
},
{
"inputKey": "battery_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No battery design or quote is supplied."
},
{
"inputKey": "resilience_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No resilience grant application is supplied."
}
],
"reasoning": "Refrigeration resilience has operational value, but the profile lacks the public-benefit, critical-facility, solar-pairing, and application facts needed for many storage or microgrid grants."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quotes_by_measure",
"reason": "quote not available"
},
{
"inputKey": "equipment_cut_sheets_and_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "existing_equipment_schedule",
"reason": "needs user decision"
},
{
"inputKey": "utility_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "monthly_peak_kw_or_interval_data",
"reason": "needs user decision"
},
{
"inputKey": "trade_ally_or_utility_preapproval_confirmation",
"reason": "application not submitted"
},
{
"inputKey": "landlord_or_owner_authorization",
"reason": "needs user decision"
},
{
"inputKey": "roof_rights_and_structural_capacity",
"reason": "needs user decision"
},
{
"inputKey": "parking_control_for_ev_charging",
"reason": "needs user decision"
},
{
"inputKey": "approved_rerz_designation_documents",
"reason": "source requires agency approval"
},
{
"inputKey": "renewable_energy_company_operations_evidence",
"reason": "unrealistic for this customer"
},
{
"inputKey": "geothermal_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "chp_thermal_load_study",
"reason": "needs user decision"
},
{
"inputKey": "microgrid_interconnection_study",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The profile is a commercial deli, restaurant, specialty grocery, and prepared-foods retail site, so residential, school, public-entity, nonprofit, agricultural, tribal, and low-income housing incentives should generally be blocked unless separate evidence is uploaded.",
"Refrigeration, HVAC, lighting, lighting controls, and possibly audit/custom-study measures are realistic; biomass, small wind, geothermal, CHP, and microgrid projects are not realistic without a specific engineering package.",
"The site-control relationship is unknown, so rooftop, envelope, geothermal, EV charging, electrical-service, and major mechanical projects may require landlord or owner authorization.",
"No contractor quotes, equipment cut sheets, preapproval records, or application confirmations are supplied, so formula-ready grants should usually be marked needs_quote or needs_application_status.",
"Do not use Michigan RERZ tax amounts to create a positive estimate because the existing test facts explicitly show no approved RERZ designation and no qualifying renewable-energy company operations.",
"Do not assume solar PV, public charging access, fleet ownership, critical-facility status, or public-benefit resilience eligibility from the business description alone.",
"Do not make every listed retrofit qualify; the customer profile should prioritize food-service refrigeration and kitchen-related efficiency over generic renewable-generation opportunities."
]
}

