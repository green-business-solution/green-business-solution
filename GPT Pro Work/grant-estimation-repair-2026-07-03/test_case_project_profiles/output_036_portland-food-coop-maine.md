{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "portland-food-coop-maine",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-profile enrichment based on the uploaded Prompt 36 test-case context for a leased 10,000 sq ft Portland, Maine grocery co-op with Central Maine Power electric service, ambiguous Unitil / Northern Utilities gas service, high refrigeration load, and project stage marked exploring. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "legal_entity_type_detail",
"value": "consumer_food_cooperative_commercial_business",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A retail food co-op is normally modeled as a commercial applicant for energy programs unless tax-exempt nonprofit documentation is provided."
},
{
"inputKey": "is_501c3_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case identifies the organization as a commercial business rather than a nonprofit; do not apply nonprofit-only grant logic without confirmation."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a retail grocery co-op, not a municipal, state, federal, or other public-sector entity."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building use is grocery / convenience / cold storage, not education."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Although the store sells local food, the facility is a retail grocery and should not be treated as a farm or agricultural production site."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No test-case facts indicate tribal ownership, tribal government status, or operation on tribal land."
},
{
"inputKey": "is_fleet_owner_operator",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small urban grocery may receive deliveries but is not normally a fleet owner/operator for fleet-electrification grants."
},
{
"inputKey": "electric_utility_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Central Maine Power is self-reported and mapped to a CMP utility candidate, but the account class and tariff remain unverified."
},
{
"inputKey": "gas_utility_provider_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The prompt intentionally includes gas utility ambiguity, so gas-utility-specific measures should require bill or account confirmation."
},
{
"inputKey": "gas_utility_provider_reported",
"value": "Unitil / Northern Utilities",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form reports Unitil / Northern Utilities, but the normalized utility profile only verifies the electric utility."
},
{
"inputKey": "ownership_control_status",
"value": "tenant_leasehold_requires_landlord_approval_for_capital_projects",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is leased, so roof, parking, electrical service, envelope, and major HVAC projects should require landlord authorization."
},
{
"inputKey": "landlord_approval_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No landlord consent, lease amendment, or owner authorization is included in the test-case facts."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form states the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_vendor_quote_yet",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploratory and no quote file is listed; grant estimates that require firm eligible cost should remain provisional or suppressed."
},
{
"inputKey": "preapproval_application_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant application or preapproval record is present, so programs requiring preapproval should not be treated as awarded."
},
{
"inputKey": "annual_kwh",
"value": 430000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile includes annual electric consumption of 430,000 kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 6450000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile gives annual electric cost of $64,500."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 2475000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries include annual gas cost of $24,750, but gas provider and therm usage are not confirmed."
},
{
"inputKey": "estimated_peak_kw",
"value": 118,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 10,000 sq ft grocery with refrigeration and 430,000 annual kWh likely has a peak demand above the annual average load; this should be replaced by interval or demand bill data."
},
{
"inputKey": "has_food_refrigeration_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building type and primary activity include refrigerated foods and grocery/cold storage."
},
{
"inputKey": "critical_facility_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A retail grocery may be important locally, but no emergency shelter, medical, public safety, or formally designated critical-facility status is provided."
},
{
"inputKey": "low_income_or_environmental_justice_designation_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The prompt does not provide census tract, community designation, or program-specific disadvantaged-community evidence."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Exploratory public-facing Level 2 EV charging project for customer parking, modeled as two networked ports using existing electrical capacity where possible.",
"inputFacts": [
{
"inputKey": "charger_type",
"value": "level_2_networked",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small grocery site is more likely to install Level 2 customer charging than DC fast charging."
},
{
"inputKey": "charger_port_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two ports are plausible for a 10,000 sq ft urban grocery and align better with the modest modeled project cost."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost already present for the EV charger retrofit; this is not a vendor quote."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No EVSE installer quote, make-ready scope, or utility interconnection cost is provided."
},
{
"inputKey": "public_access_committed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A public charger grant would generally require public access; this is plausible for customer parking but must be confirmed."
},
{
"inputKey": "parking_spaces_under_applicant_control",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is leased and urban; control of parking spaces should be confirmed before treating the project as eligible."
},
{
"inputKey": "landlord_site_host_authorization",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "EV charging would likely affect parking, conduit routing, and electrical service controlled by the owner or lease."
},
{
"inputKey": "utility_make_ready_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Need an electrician or utility review to know whether panel capacity or service upgrades are required."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Do not estimate an awarded grant without preapproval or award status.",
"Public access, site control, landlord authorization, and quote documentation remain unconfirmed.",
"If parking is street-only or not controlled by the co-op, the project should be suppressed."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Same likely scope as the broader EV charger installation: two Level 2 networked ports for customer/public use, pending parking control and landlord approval.",
"inputFacts": [
{
"inputKey": "level_2_port_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two ports are realistic for a small customer-facing grocery charging installation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Carries forward the supplied retrofit preview cost for Level 2 EV charging."
},
{
"inputKey": "networked_charging_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public or shared commercial charging generally uses networked equipment for access control and reporting."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Treat as the same physical project as ev_charger_installation to avoid double counting.",
"Needs quote, site control, and application status before a user-facing grant total should be final."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Targeted grocery refrigeration tune-up and equipment upgrade package, such as EC motors, anti-sweat heater controls, door gaskets, night covers, case LEDs, and controls optimization.",
"inputFacts": [
{
"inputKey": "refrigerated_case_count_estimate",
"value": 14,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 10,000 sq ft food co-op likely has multiple medium- and low-temperature display cases, but actual case count requires a survey."
},
{
"inputKey": "walk_in_cooler_count_estimate",
"value": 3,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A grocery with prepared and refrigerated foods commonly has several walk-in cooler/freezer boxes."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost for the refrigeration retrofit as a small controls and component package, not compressor replacement."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Refrigeration incentives often require itemized equipment and baseline details."
},
{
"inputKey": "measure_types",
"value": [
"ec_evaporator_fan_motors",
"anti_sweat_heater_controls",
"case_door_gasket_replacement",
"night_covers",
"refrigerated_case_leds"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are common lower-capital refrigeration efficiency measures for a small grocery."
},
{
"inputKey": "existing_refrigeration_baseline_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No equipment inventory, age, horsepower, refrigerant type, or controls baseline is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely better suited to utility rebates/custom incentives than competitive grants.",
"Do not calculate equipment-specific incentives without inventory and quote data."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small remaining LED upgrade for back-of-house, storage, exterior, or display lighting fixtures not already converted.",
"inputFacts": [
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied preview explicitly assumes 12 fixture replacements."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost for a limited LED measure."
},
{
"inputKey": "lighting_operating_hours_per_year",
"value": 4380,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "About 12 hours per day is plausible for a retail grocery open most days."
},
{
"inputKey": "existing_lighting_mostly_led",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Only 12 fixtures are modeled, suggesting this is a remaining-measures project rather than a whole-store lighting conversion."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Fixture schedules and installed costs are not provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely rebate-eligible if program rules support it, but too small and routine for most grant programs.",
"Should not be forced into a grant estimate without a matched lighting grant or rebate formula."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Partial cold-climate heat pump retrofit for sales floor or office/back-of-house zones, likely supplementing existing gas-fired heating rather than full building conversion.",
"inputFacts": [
{
"inputKey": "heat_pump_system_type",
"value": "cold_climate_air_source_heat_pump",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Cold-climate air-source heat pumps are the realistic electrification option for a leased small commercial space."
},
{
"inputKey": "heat_pump_zone_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited retrofit might serve two zones, but actual zoning depends on existing RTUs and distribution."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost for heat pump HVAC retrofit; this is a modeled cost, not a contractor bid."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "HVAC incentives normally require equipment model numbers, capacity, efficiency, and installed cost."
},
{
"inputKey": "existing_heating_fuel",
"value": "natural_gas_unconfirmed",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Gas cost is present but the gas utility and therm usage are ambiguous."
},
{
"inputKey": "full_fuel_switch_commitment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a grocery tenant, a partial supplemental heat pump project is more realistic than a whole-building conversion at exploratory stage."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for commercial heat pump rebates or incentives, but grant treatment depends on program rules.",
"Landlord approval and gas baseline confirmation are required."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Limited replacement or controls improvement for existing rooftop/unitary HVAC equipment serving tenant space.",
"inputFacts": [
{
"inputKey": "hvac_unit_count_estimate",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Two small rooftop or split systems are plausible for a 10,000 sq ft retail grocery, but equipment inventory is needed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost; the amount suggests a minor replacement or controls package rather than full HVAC replacement."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No HVAC contractor scope, capacity, equipment ratings, or installed cost detail is available."
},
{
"inputKey": "annual_kwh_reduction_estimate",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview says admin-modeled annual kWh reduction is used, but the specific reduction is not present in the profile."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May be eligible for efficiency incentives if equipment meets efficiency requirements.",
"Should remain quote- and equipment-data-dependent."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Tenant-space air sealing at doors, loading/service areas, penetrations, and accessible envelope leakage points.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 194600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost for a modest tenant-space air sealing package."
},
{
"inputKey": "weatherization_scope_type",
"value": "air_sealing_and_door_weatherstripping",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased urban retail space is more likely to pursue low-disruption air sealing than major envelope reconstruction."
},
{
"inputKey": "blower_door_or_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No audit or diagnostic report is included."
},
{
"inputKey": "landlord_responsibility_uncertain",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Envelope measures in a leased property may be owner-controlled or shared responsibility."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely too small for grant funding unless bundled into a broader efficiency project.",
"May need utility audit or prescriptive rebate pathway rather than grant handling."
]
},
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"projectScopeSummary": "Small ERV or ventilation controls improvement for prepared-food or occupied retail areas, pending HVAC design review.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 370800,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost for an ERV retrofit."
},
{
"inputKey": "erv_unit_count_estimate",
"value": 1,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One small unit is plausible for a limited retrofit in a 10,000 sq ft store."
},
{
"inputKey": "ventilation_engineering_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "ERV feasibility depends on duct routing, makeup air, kitchen/prepared-food exhaust, and roof access."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No HVAC quote or ventilation design is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be an efficiency measure, but typical grants would need a broader project or documented energy savings.",
"Landlord and roof/duct access constraints remain unresolved."
]
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"projectScopeSummary": "Small VFD retrofit for a refrigeration condenser fan, air handler, or pump motor with long operating hours.",
"inputFacts": [
{
"inputKey": "vfd_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The low preview cost fits a single-drive retrofit."
},
{
"inputKey": "controlled_motor_hp_estimate",
"value": 7.5,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small grocery refrigeration or HVAC motor could be in this range, but equipment inventory is needed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 212000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost for a small VFD retrofit."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Motor horsepower, controls compatibility, and installer cost are not documented."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"More likely utility rebate/custom incentive than grant.",
"Should not be grant-calculated without equipment and savings data."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Commercial heat pump water heater for employee, cleaning, and prepared-food hot water loads if existing water heating is electric or gas tank-type.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost."
},
{
"inputKey": "water_heater_capacity_gallons_estimate",
"value": 80,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An 80-gallon commercial/light-commercial unit is plausible for modest grocery hot-water needs."
},
{
"inputKey": "existing_water_heater_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile does not identify the existing water heater fuel or equipment type."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Need model, capacity, existing equipment, and installation details."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be rebate-eligible, but no matched grant is provided.",
"Do not calculate without existing water-heater and quote details."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Exploratory battery backup for refrigeration resilience and demand management, without confirmed solar pairing or critical-facility designation.",
"inputFacts": [
{
"inputKey": "battery_capacity_kwh_estimate",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An 80 kWh battery could support selected refrigeration or short-duration backup, but sizing requires load analysis."
},
{
"inputKey": "battery_power_kw_estimate",
"value": 30,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 30 kW inverter is plausible for partial-load backup, not whole-store backup."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost for battery storage."
},
{
"inputKey": "paired_with_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No solar project or roof rights are included in the test case."
},
{
"inputKey": "resilience_grant_basis_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No critical-facility, emergency-service, or resilience-program designation is provided."
},
{
"inputKey": "vendor_quote_total_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Battery grants and tax incentives need engineered system size, interconnection, and cost."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Useful resilience rationale exists because of refrigeration, but no grant eligibility evidence is present.",
"Do not force a positive grant estimate absent solar pairing, resilience designation, or a matched storage program."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump is not a realistic near-term tenant project for a dense leased urban grocery site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview amount only as a test-case cost; actual geothermal cost would depend heavily on drilling and site conditions."
},
{
"inputKey": "ground_loop_site_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased downtown grocery is unlikely to control land for wells or horizontal loop installation."
},
{
"inputKey": "drilling_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No geothermal feasibility study is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless owner authorization and geothermal feasibility are documented.",
"Do not treat the tenant as having site control for ground loops."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal water heating is not a priority project because roof rights, hot-water load, and landlord approval are all unconfirmed.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost."
},
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is leased and no roof rights are provided."
},
{
"inputKey": "domestic_hot_water_load_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No water-heating load data or equipment details are included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless roof/site control and DHW load are confirmed.",
"Heat pump water heating is likely more realistic than solar thermal for this tenant."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas generation is not realistic for a 10,000 sq ft leased urban grocery tenant despite organic waste streams.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only; actual biomass/biogas project scope is not defined."
},
{
"inputKey": "on_site_biomass_or_biogas_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Retail food waste is better suited to organics hauling than on-site energy generation at this scale."
},
{
"inputKey": "air_permitting_or_interconnection_plan_exists",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No permitting, engineering, or host-site information is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not treat grocery organics as evidence of biogas-project eligibility.",
"Urban leased site and lack of feedstock control should suppress grant estimates."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not a realistic project for this small leased grocery without a large, steady thermal load and confirmed gas service.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost, but no CHP sizing has been performed."
},
{
"inputKey": "thermal_load_suitable_for_chp",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile lacks a large year-round process thermal load that would typically justify CHP."
},
{
"inputKey": "gas_service_capacity_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Gas provider is ambiguous and service capacity is unknown."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless a professional CHP feasibility study documents economics and thermal use.",
"Do not force qualification based only on electric load."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Microgrid is not a realistic stand-alone grant project for the tenant absent solar/storage scope, critical-facility designation, and owner control.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only; no microgrid design is present."
},
{
"inputKey": "critical_loads_identified",
"value": [
"refrigeration"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Refrigeration is a plausible critical load for food spoilage mitigation."
},
{
"inputKey": "microgrid_controller_scope_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No electrical one-line, DER scope, islanding plan, or controls specification is included."
},
{
"inputKey": "utility_interconnection_started",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application or utility study is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress until engineered DER scope and critical-facility or resilience-program basis are documented.",
"Tenant status creates major site-control uncertainty."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is unrealistic for a downtown Portland leased grocery location.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only; no real small-wind project scope should be inferred."
},
{
"inputKey": "wind_resource_or_tower_site_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "An urban leased grocery site is unlikely to have tower siting rights, setbacks, or suitable wind resource."
},
{
"inputKey": "zoning_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No zoning or structural evidence supports small wind."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress all small-wind grant estimates for this profile unless the user provides extraordinary site-control and feasibility evidence."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage is speculative; could theoretically relate to refrigeration load shifting, but no engineering scope is available.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only; this is not supported by a defined thermal-storage design."
},
{
"inputKey": "thermal_storage_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile does not specify chilled-water, phase-change, ice, or refrigeration-integrated storage."
},
{
"inputKey": "load_shift_use_case_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No rate analysis, demand charges, or refrigeration controls study is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless a refrigeration engineer defines the measure and a matched program supports it.",
"Demand-charge data is needed before estimating load-shift value."
]
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"projectScopeSummary": "Laundry equipment is not a realistic major project for a grocery co-op; any laundry use would be incidental.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 307600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only; no material laundry operation is present."
},
{
"inputKey": "commercial_laundry_operation_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A grocery / prepared-food retail business is not a laundromat, hotel, healthcare laundry, or similar high-use laundry facility."
},
{
"inputKey": "washer_unit_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No laundry equipment is indicated by the building type or activity description."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress water-efficiency/laundry grants unless the user documents actual commercial laundry equipment."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "project_type",
"value": "public_level_2_ev_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The matched grant is for public chargers, and a customer-facing grocery installation is plausible."
},
{
"inputKey": "charger_port_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two Level 2 ports are a conservative fit for the site and modeled cost."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the test-case EV charger preview cost; replace with an itemized quote for grant calculation."
},
{
"inputKey": "itemized_vendor_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A real public charger grant workflow should require charger hardware, installation, make-ready, and network cost details."
},
{
"inputKey": "public_access_hours",
"value": "store_business_hours_or_longer_unconfirmed",
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The project is plausible only if the chargers are actually public-facing and access hours meet program requirements."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring and no application is present."
},
{
"inputKey": "award_or_reservation_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No approval, award letter, or reservation is provided."
},
{
"inputKey": "landlord_or_site_host_approval",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The co-op is a tenant and may not control parking or electrical infrastructure."
}
],
"reasoning": "The public charger grant is the only grant match shown. It is plausible but should not produce a final user-facing estimate until quote, site control, public access, and application/preapproval status are confirmed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": null,
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing test-case inputs already suppress this because the Maine grocery tenant is not a Washington solar manufacturing taxpayer."
}
],
"reasoning": "Keep suppressed; this opportunity should not be converted into a Maine commercial grocery incentive."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "ac_kw_capacity",
"value": null,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing test-case inputs already suppress this because the Rhode Island renewable property-tax workflow does not apply to a Maine site."
}
],
"reasoning": "Keep suppressed due to geography and program mismatch."
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
"reasoning": "The existing test-case inputs already suppress this because the Michigan Renewable Energy Renaissance Zone workflow does not apply to a Maine site."
}
],
"reasoning": "Keep suppressed due to geography and program mismatch."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "itemized_vendor_quote_total_cents",
"reason": "quote not available"
},
{
"inputKey": "ev_charger_site_host_agreement",
"reason": "needs user decision"
},
{
"inputKey": "landlord_approval_documentation",
"reason": "needs user decision"
},
{
"inputKey": "ev_charger_public_access_commitment",
"reason": "needs user decision"
},
{
"inputKey": "grant_application_confirmation_or_award_letter",
"reason": "application not submitted"
},
{
"inputKey": "gas_account_number_or_gas_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "monthly_therms",
"reason": "needs user decision"
},
{
"inputKey": "monthly_peak_kw_or_demand_billing_history",
"reason": "needs user decision"
},
{
"inputKey": "refrigeration_equipment_inventory",
"reason": "quote not available"
},
{
"inputKey": "hvac_equipment_model_numbers_and_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "roof_rights_or_solar_site_control",
"reason": "needs user decision"
},
{
"inputKey": "critical_facility_or_resilience_designation",
"reason": "source requires agency approval"
},
{
"inputKey": "disadvantaged_community_program_designation",
"reason": "source requires agency approval"
},
{
"inputKey": "geothermal_drilling_feasibility_report",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_zoning_or_wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "commercial_laundry_equipment_inventory",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The organization is modeled as a commercial grocery co-op, not a public entity, school, tribal entity, agricultural producer, or confirmed 501(c)(3) nonprofit.",
"The site is leased; projects affecting roof, parking, envelope, drilling, electrical service, or major HVAC require landlord approval and site-control evidence.",
"Central Maine Power electric service is self-reported and plausible, but electric customer class and demand history are not confirmed.",
"Gas utility service is intentionally ambiguous, so gas-fuel-switching and CHP assumptions should not be finalized from the current profile.",
"The public EV charger grant may be relevant, but public access, parking control, quote, and application/preapproval status are not confirmed.",
"Food refrigeration load supports refrigeration efficiency measures, but not biomass, biogas, CHP, microgrid, or storage grant eligibility by itself.",
"The downtown urban grocery context makes small wind and ground-source geothermal implausible without extraordinary site-control and feasibility documentation.",
"Battery storage and microgrid projects should not be treated as grant-qualified unless a matched program, resilience designation, interconnection path, and engineered scope are provided.",
"Routine LED, VFD, air sealing, ERV, and water-heating measures may be rebate-eligible but should not be forced into grant calculations without a matched grant formula.",
"Existing out-of-state tax opportunities for Washington, Rhode Island, and Michigan must remain suppressed for this Maine site."
]
}

