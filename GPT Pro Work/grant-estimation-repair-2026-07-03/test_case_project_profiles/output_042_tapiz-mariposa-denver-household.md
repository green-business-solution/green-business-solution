{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "tapiz-mariposa-denver-household",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for an anonymized senior or disabled household leasing an apartment in Denver public multifamily housing at Tapiz at Mariposa. Inputs are intended to test tenant-vs-owner control, income or medical priority uncertainty, Denver/Xcel utility matching, and suppression of geographically mismatched grants. Based on supplied test-case context. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "applicant_entity_type",
"value": "individual_household",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile is an anonymized senior or disabled household, not the housing authority or building owner."
},
{
"inputKey": "applicant_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The resident household is not itself a public agency, even though the building is public multifamily housing."
},
{
"inputKey": "applicant_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant record represents a household tenant rather than a nonprofit owner or sponsor."
},
{
"inputKey": "applicant_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal applicant facts are present in the supplied case."
},
{
"inputKey": "applicant_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Residential public-housing tenancy is not an agricultural producer profile."
},
{
"inputKey": "applicant_is_school_or_education_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a residential household, not an education campus."
},
{
"inputKey": "applicant_is_fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No vehicle fleet ownership is plausible for this household test case."
},
{
"inputKey": "utility_customer_class",
"value": "residential",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual household-scale electric usage and residential occupancy support a residential utility class, but the actual bill/rate class has not been verified."
},
{
"inputKey": "xcel_residential_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The case self-reports Xcel Energy electric and gas service at a Denver residential address."
},
{
"inputKey": "denver_resident",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site address is in Denver, Colorado."
},
{
"inputKey": "boulder_city_resident_or_property",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site address is Denver, not the City of Boulder."
},
{
"inputKey": "aspen_or_pitkin_county_resident_or_property",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site address is Denver, not Aspen or Pitkin County."
},
{
"inputKey": "tenant_has_written_landlord_permission_for_fixed_equipment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household is in the exploring stage and no landlord authorization has been supplied."
},
{
"inputKey": "tenant_controls_in_unit_plug_loads_and_small_fixtures",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant can usually choose portable devices, lamps, and some minor in-unit measures, subject to lease rules."
},
{
"inputKey": "tenant_controls_hvac_system",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing tax facts indicate the tenant does not control common-area or roof systems; a senior/disabled public multifamily unit would generally not give the tenant authority to replace central or fixed HVAC equipment."
},
{
"inputKey": "tenant_controls_water_heater",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Water heating in public multifamily housing is typically landlord/building controlled unless proven otherwise."
},
{
"inputKey": "tenant_controls_roof_or_solar_rights",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The provided existing tax facts say the tenant does not control common-area or roof systems."
},
{
"inputKey": "direct_property_tax_bill_to_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The provided existing tax facts state that the taxpayer does not have a direct property tax bill."
},
{
"inputKey": "household_income_qualified_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The case suggests senior or disabled public housing, but income qualification for any specific program still needs documentation."
},
{
"inputKey": "household_medical_priority_or_disability_status_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The case notes senior or disabled occupancy, but the individual status should not be assumed for program calculations without confirmation."
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
"value": "no_quote",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No contractor quote, application, landlord scope, or approved work order is present."
},
{
"inputKey": "preapproval_or_reservation_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The record is exploratory and provides no evidence of a submitted incentive application."
},
{
"inputKey": "household_annual_kwh",
"value": 3800,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Copied from the supplied site energy profile."
},
{
"inputKey": "household_annual_electric_cost_cents",
"value": 62000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Copied from the supplied annual electric cost of $620."
},
{
"inputKey": "household_annual_gas_cost_cents",
"value": 42000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Copied from the supplied annual gas cost of $420."
},
{
"inputKey": "household_annual_water_sewer_cost_cents",
"value": 30000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Copied from the supplied water/sewer annual cost summary; responsibility for the bill may still need validation."
},
{
"inputKey": "estimated_dwelling_unit_count_for_applicant",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "This is an individual household profile, not the full multifamily building owner profile."
},
{
"inputKey": "estimated_conditioned_floor_area_sqft",
"value": 650,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A conservative placeholder for a senior/disabled multifamily apartment; actual square footage remains unknown."
},
{
"inputKey": "existing_ev_owned_by_household",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No EV ownership or dedicated parking facts are present; defaulting to no EV for this low-income senior/disabled household test case avoids forcing EV eligibility."
},
{
"inputKey": "dedicated_parking_or_electrical_panel_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant in public multifamily housing usually does not control parking electrical infrastructure without owner participation."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "community_solar_subscription",
"projectScopeSummary": "Household-level community solar subscription sized below annual electricity usage, with no owned onsite equipment.",
"inputFacts": [
{
"inputKey": "subscription_annual_kwh_allocated",
"value": 3000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Sizing below the supplied 3,800 kWh annual usage is realistic for a tenant subscription."
},
{
"inputKey": "subscription_upfront_cost_cents",
"value": 50000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the small administrative preview cost for a subscription or enrollment deposit."
},
{
"inputKey": "onsite_equipment_owned_by_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Community solar is modeled as a subscription rather than household-owned onsite equipment."
},
{
"inputKey": "income_qualified_community_solar_verification_received",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Low-income or priority status is plausible but not verified."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need proof of income qualification or utility account eligibility.",
"Should not be treated as an owned solar PV system."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Minor in-unit weatherization package such as door sweeps, outlet gaskets, pipe penetrations, and limited air sealing; no building envelope capital work controlled by the tenant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 120000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Conservative in-unit scope is lower than a whole-building weatherization retrofit."
},
{
"inputKey": "dwelling_units_treated",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a single household."
},
{
"inputKey": "landlord_permission_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Even minor air sealing in leased housing may need management approval."
},
{
"inputKey": "landlord_permission_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No approval has been provided."
},
{
"inputKey": "income_qualification_documented",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Program-specific income documentation is missing."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely only for household-scale weatherization programs, not owner capital grants.",
"Should require income verification and landlord approval before final calculation."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Whole-building or cavity insulation upgrade is not tenant-controlled; only small removable in-unit draft measures are plausible.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No owner-approved insulation scope or contractor quote exists."
},
{
"inputKey": "tenant_controls_building_envelope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The tenant does not control common-area or building systems."
},
{
"inputKey": "owner_scope_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "There is no evidence that the building owner is pursuing an insulation project."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress household grant calculation unless the housing authority or landlord becomes the applicant.",
"A single tenant should not be credited with whole-building insulation eligibility."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small in-unit LED lamp and fixture replacement package controlled by the tenant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 36000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A household-scale LED package is much smaller than the admin preview that assumed 12 fixture replacements."
},
{
"inputKey": "lamp_or_fixture_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight lamps/fixtures is reasonable for a small apartment."
},
{
"inputKey": "fixture_type",
"value": "in_unit_led_lamps_and_simple_fixture_replacements",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Tenant-controlled lighting should be limited to in-unit, non-common-area measures."
},
{
"inputKey": "common_area_lighting_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant does not control common-area systems."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely low dollar value.",
"May be better handled as utility instant discount or direct-install rather than a grant."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "One in-unit smart thermostat only if the apartment has a tenant-controlled thermostat and compatible HVAC controls.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 25000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single residential thermostat is a modest household-level measure."
},
{
"inputKey": "thermostat_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small apartment would normally have at most one tenant-facing thermostat."
},
{
"inputKey": "hvac_controls_compatibility_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Compatibility depends on the building's HVAC configuration."
},
{
"inputKey": "landlord_permission_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No landlord or property manager approval is documented."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Calculate only if the program allows tenants and the HVAC controls are compatible.",
"Suppress if the building has central controls or landlord-only HVAC access."
]
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"projectScopeSummary": "Tenant-scale low-flow showerhead and faucet aerator package, subject to property manager approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8500,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small package of aerators and one showerhead is low cost."
},
{
"inputKey": "showerhead_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One bathroom is plausible for a senior/disabled apartment."
},
{
"inputKey": "faucet_aerator_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Kitchen and bathroom aerators are plausible in a one-unit household scope."
},
{
"inputKey": "water_bill_paid_directly_by_applicant",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site energy profile includes water/sewer cost, but tenant billing responsibility is unclear."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely a direct-install or conservation kit measure rather than a large grant.",
"Water-bill responsibility and landlord rules should be confirmed."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Water heater replacement is treated as building-owner controlled and not scoped for the tenant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No tenant-controlled water heater or owner quote is present."
},
{
"inputKey": "water_heater_count",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The unit may use central or shared water heating; equipment count is unknown."
},
{
"inputKey": "tenant_controls_water_heater",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public multifamily tenant usually cannot replace fixed water-heating equipment."
},
{
"inputKey": "owner_replacement_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No landlord-approved replacement project is documented."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the housing authority or landlord is the applicant.",
"Quote and equipment data are required."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "No tenant-approved heat pump conversion; fixed HVAC replacement is assumed landlord/building controlled.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No equipment quote or owner-approved HVAC scope exists."
},
{
"inputKey": "heat_pump_unit_count",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The unit-level HVAC configuration is unknown."
},
{
"inputKey": "existing_heating_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas service exists, but the household heating system serving the apartment is not confirmed."
},
{
"inputKey": "tenant_controls_hvac_replacement",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Fixed HVAC equipment in multifamily public housing is normally landlord controlled."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress grant estimate unless owner participation, equipment specs, and quote are supplied."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "HVAC replacement is not a tenant-controlled project; record should not rely on broad residential state match alone.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost should not become eligible cost without actual equipment quote and applicant authority."
},
{
"inputKey": "hvac_equipment_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing and proposed equipment are unknown."
},
{
"inputKey": "owner_or_property_manager_is_project_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied applicant is the household tenant."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate owner-level HVAC grants for an individual tenant.",
"Matched Aspen/Pitkin grant should be treated as geographically ineligible."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Geothermal heat pump is unrealistic for an individual apartment tenant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No building-owner geothermal scope, engineering study, or quote exists."
},
{
"inputKey": "ground_loop_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A single apartment tenant does not control land or site infrastructure for a ground loop."
},
{
"inputKey": "engineering_study_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A geothermal feasibility study has not been commissioned."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress as unrealistic for this customer unless the full property owner becomes the applicant."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "No onsite rooftop solar project for the household; tenant does not control the roof.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The admin preview cost should not be treated as eligible project cost without owner approval and a solar quote."
},
{
"inputKey": "system_size_kw_dc",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No rooftop PV system has been designed."
},
{
"inputKey": "tenant_controls_roof",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The tenant does not control roof or common-area systems."
},
{
"inputKey": "owner_permission_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owner participation is documented."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Use community solar instead for a tenant-suitable solar pathway.",
"Do not calculate owner-level rooftop solar incentives for this household."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar water heating is not scoped for the household because roof and water-heating systems are landlord controlled.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No owner-approved solar thermal quote exists."
},
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No system design has been prepared."
},
{
"inputKey": "city_of_boulder_project_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project site is Denver, not Boulder."
},
{
"inputKey": "tenant_controls_water_heating_or_roof",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The tenant lacks control over roof/common building systems."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Matched Boulder solar grant should be marked likely ineligible due Denver geography.",
"Suppress any solar thermal calculation absent owner project scope."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "No tenant-owned battery installation; fixed electrical/storage systems are not controlled by the household.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Battery installation requires electrical design, quote, and property approval."
},
{
"inputKey": "battery_capacity_kwh",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No battery system has been specified."
},
{
"inputKey": "medical_baseline_or_resilience_need_documented",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Medical vulnerability is possible but not verified, and does not by itself create tenant authority to install fixed storage."
},
{
"inputKey": "panel_or_interconnection_controlled_by_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant in multifamily housing generally does not control electrical interconnection."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress fixed battery grants unless owner-approved scope and medical/resilience documentation are supplied."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "No EV charger project because household EV ownership and parking/electrical control are not established.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No parking electrical quote or owner approval exists."
},
{
"inputKey": "charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No active EV charging project is indicated."
},
{
"inputKey": "household_ev_owned",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No EV ownership fact exists."
},
{
"inputKey": "dedicated_parking_space_with_electrical_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tenant likely does not control multifamily parking electrical infrastructure."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress EV charger grants for this household unless an EV, assigned parking, owner approval, and quote are provided."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "No Level 2 charger project for the household.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A Level 2 charger requires owner approval, parking assignment, and electrical quote."
},
{
"inputKey": "level_2_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No Level 2 charging project is present."
},
{
"inputKey": "owner_permission_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No property manager approval exists."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Same suppression logic as generic EV charger installation."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Potential replacement of one tenant-used residential refrigerator only; not commercial refrigeration equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 95000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A single residential ENERGY STAR refrigerator replacement is plausible but unconfirmed."
},
{
"inputKey": "refrigerator_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One refrigerator is plausible for a single apartment."
},
{
"inputKey": "equipment_class",
"value": "residential_refrigerator",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household profile does not support commercial refrigeration."
},
{
"inputKey": "existing_refrigerator_age_years",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Replacement eligibility often depends on existing appliance condition or age."
},
{
"inputKey": "tenant_owns_refrigerator",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "In public housing, the refrigerator may be landlord-provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only household appliance programs should be considered.",
"Suppress commercial refrigeration incentives."
]
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"projectScopeSummary": "Commercial dishwasher project is not relevant to an individual household apartment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A household tenant does not operate a commercial kitchen."
},
{
"inputKey": "commercial_kitchen_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile is residential occupancy, not foodservice."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress commercial kitchen incentives."
]
},
{
"retrofitTypeId": "induction_cooking_equipment",
"projectScopeSummary": "Potential portable residential induction cooktop only; commercial induction equipment is not relevant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A portable single-burner induction cooktop is plausible for a tenant, but not a grant-scale commercial project."
},
{
"inputKey": "equipment_class",
"value": "portable_residential_induction_cooktop",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fixed range replacement would likely need landlord approval; portable equipment is tenant-controllable."
},
{
"inputKey": "commercial_kitchen_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The household does not operate commercial foodservice."
},
{
"inputKey": "existing_cooking_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The unit's cooking fuel is not specified."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not use commercial kitchen incentive rules.",
"Any benefit would likely be small, retail, or direct-install rather than a formal grant."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy project is not realistic for an individual apartment tenant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "This technology is incompatible with a household apartment tenant profile."
},
{
"inputKey": "biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No agricultural, industrial, or waste-to-energy feedstock exists for this customer."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress as unrealistic for this applicant and site."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "project_site_within_aspen_or_pitkin_county",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project site is in Denver."
},
{
"inputKey": "applicant_is_property_owner_or_owner_authorized",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a tenant household and no owner authorization is present."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No HVAC quote or owner project scope is available."
},
{
"inputKey": "application_submitted_or_preapproved",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No application status exists in the exploratory profile."
}
],
"reasoning": "Although this grant matched broadly to Colorado residential HVAC, the Denver site and tenant applicant facts should suppress calculation for an Aspen/Pitkin-specific program."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2948",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "project_site_within_city_of_boulder",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project site is Denver, Colorado."
},
{
"inputKey": "solar_project_is_onsite_owner_authorized",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The household does not control the roof or water-heating system."
},
{
"inputKey": "eligible_solar_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No solar water heating quote or approved project scope exists."
},
{
"inputKey": "application_submitted_or_preapproved",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No application or preapproval has been submitted."
}
],
"reasoning": "The City of Boulder solar grant should not calculate for a Denver household tenant without roof or system control."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quote_total_cost_cents",
"reason": "quote not available"
},
{
"inputKey": "owner_authorization_letter",
"reason": "needs user decision"
},
{
"inputKey": "program_income_verification_document",
"reason": "source requires agency approval"
},
{
"inputKey": "medical_priority_documentation",
"reason": "source requires agency approval"
},
{
"inputKey": "hvac_equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "water_heater_equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "solar_pv_system_size_kw_dc",
"reason": "unrealistic for this customer"
},
{
"inputKey": "battery_storage_capacity_kwh",
"reason": "unrealistic for this customer"
},
{
"inputKey": "ev_charger_ports",
"reason": "needs user decision"
},
{
"inputKey": "application_preapproval_id",
"reason": "application not submitted"
},
{
"inputKey": "direct_property_tax_bill_amount_cents",
"reason": "unrealistic for this customer"
},
{
"inputKey": "whole_building_square_footage",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The applicant is a household tenant, not the Denver Housing Authority or the building owner.",
"The tenant does not control the roof, common areas, fixed HVAC systems, water-heating systems, parking electrical infrastructure, or whole-building envelope.",
"Public or affordable housing context makes income qualification plausible, but program-specific income and medical-priority documentation is not confirmed.",
"Aspen/Pitkin and Boulder grant matches should be treated as geography mismatches for a Denver site.",
"Admin preview costs are not contractor quotes and should not be converted into eligible costs for owner-controlled capital projects.",
"Commercial kitchen, agricultural, biomass, fleet, school, and nonresidential incentives should be suppressed for this household profile.",
"Tenant-suitable measures should be limited to community solar subscription, minor weatherization, LEDs, low-flow fixtures, possible smart thermostat if compatible, and possible residential appliance replacement."
]
}

