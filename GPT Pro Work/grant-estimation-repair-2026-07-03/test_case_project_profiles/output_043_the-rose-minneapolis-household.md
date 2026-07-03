{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "the-rose-minneapolis-household",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for an anonymized tenant household in a mixed-income multifamily apartment building in Minneapolis. The household is a residential lessee with Xcel electric service, CenterPoint gas service, modest unit-level utility usage, and no direct control over building-wide capital systems. Most property-level projects should be suppressed or require owner/landlord participation rather than being calculated for this household applicant. Source context: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "applicant_type",
"value": "residential_household",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form describes the applicant as an anonymized household, organization type Residential, organization size Household."
},
{
"inputKey": "ownership_status",
"value": "Lease",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing test case identifies the household as a lessee rather than property owner."
},
{
"inputKey": "ownership_relationship",
"value": "tenant",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Normalized profile already classifies the applicant's ownership relationship as tenant."
},
{
"inputKey": "building_type",
"value": "multifamily_residential",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is identified as a multifamily apartment building."
},
{
"inputKey": "site_square_footage",
"value": 86195,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case provides whole-building square footage, not the tenant household unit area."
},
{
"inputKey": "estimated_household_unit_square_footage",
"value": 720,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 600-850 square foot unit is plausible for a mixed-income apartment household, but the actual unit size is not provided."
},
{
"inputKey": "electric_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile reports Xcel electric service and annual household electricity use."
},
{
"inputKey": "electric_utility_provider",
"value": "Xcel Energy",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer self-reported Xcel Energy as electric utility; verification remains self-reported and unverified."
},
{
"inputKey": "gas_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile reports CenterPoint gas service and annual gas cost."
},
{
"inputKey": "gas_utility_provider",
"value": "CenterPoint Energy",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form lists CenterPoint Energy as the gas provider."
},
{
"inputKey": "annual_kwh",
"value": 4300,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing site energy profile reports 4,300 annual kWh, likely representing the tenant household rather than the entire building."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 72000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing site energy profile reports $720 annual electric cost."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 50000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing utility summaries report $500 annual gas cost."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 33000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing utility summaries report $330 annual water and sewer cost."
},
{
"inputKey": "direct_property_tax_bill_to_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts state that the taxpayer does not have a direct property tax bill."
},
{
"inputKey": "mixed_income_housing_status",
"value": "likely_mixed_income_property_but_household_status_unconfirmed",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building is described as mixed-income, but this does not prove the individual household's income qualification."
},
{
"inputKey": "income_qualification_needs_program_confirmation",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts already flag that income qualification needs program confirmation."
},
{
"inputKey": "household_income_verified_for_low_income_programs",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Mixed-income property status is not enough to confirm household income eligibility."
},
{
"inputKey": "nonprofit_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a household tenant, not the nonprofit property owner or developer."
},
{
"inputKey": "public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A private residential household is not a public entity."
},
{
"inputKey": "school_or_education_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The household is residential and not a school, district, or education campus."
},
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant and site are urban residential, not agricultural."
},
{
"inputKey": "tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No facts indicate tribal ownership, tribal government status, or tribal applicant eligibility."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A household tenant would not normally own or operate a qualifying vehicle fleet."
},
{
"inputKey": "landlord_written_approval_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Building-integrated work such as HVAC, EV charging, rooftop solar, insulation, and common-area systems requires owner approval."
},
{
"inputKey": "tenant_can_make_permanent_building_improvements",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "As a lessee in a multifamily property, the household should not be assumed to control permanent building systems."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_quotes_requested",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No contractor quote, landlord approval, or project application facts are present."
},
{
"inputKey": "preapproval_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No evidence indicates preapproval or grant application submission."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace or upgrade a tenant-controlled in-unit heating/cooling component only if the lease allows it; building-level HVAC replacement is outside household control.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost appears synthetic and no contractor quote is available."
},
{
"inputKey": "hvac_units_replaced",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For a household tenant, a single in-unit system is the only plausible tenant-scale HVAC scope."
},
{
"inputKey": "existing_hvac_system_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not state whether the unit has a furnace, fan coil, PTAC, hydronic heat, or central building system."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "HVAC replacement in an apartment normally affects building systems or lease-controlled equipment."
},
{
"inputKey": "landlord_approval_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Approval status is not provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Household tenant likely cannot claim property-owner or multifamily building HVAC incentives without owner participation.",
"Estimate should remain suppressed until equipment type, eligible cost, and landlord approval are known."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Potential single-unit cold-climate ductless mini-split or in-unit heat pump conversion; not a whole-building conversion.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Heat pump grant or rebate calculations usually require installed cost, equipment specifications, and sometimes AHRI certificate data."
},
{
"inputKey": "heat_pump_units",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One ductless or in-unit system is plausible for an individual apartment household."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 1.5,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 1.0-2.0 ton heat pump is a conservative plausible size for a small apartment unit, but actual load is unknown."
},
{
"inputKey": "equipment_meets_cold_climate_spec",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Qualification often depends on specific equipment ratings that are not available."
},
{
"inputKey": "replaces_or_displaces_fossil_heat",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The household has gas costs, but the profile does not prove the apartment's space heating system is tenant-controlled gas heat."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A heat pump installation would generally require penetrations, electrical work, exterior equipment placement, or owner approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially relevant only if the tenant has owner permission and a qualifying in-unit system.",
"Do not calculate from whole-building square footage for this household applicant."
]
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"projectScopeSummary": "Possible replacement of a tenant-serving gas furnace only if the unit has a dedicated furnace; otherwise not applicable.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No furnace quote or equipment model is available."
},
{
"inputKey": "existing_furnace_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Multifamily apartments may use central boilers or hydronic systems rather than individual furnaces."
},
{
"inputKey": "furnace_afue",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Furnace efficiency is needed for many incentive formulas."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Gas appliance replacement in a rental unit requires property owner approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not tenant-actionable unless the apartment has a dedicated tenant-controlled furnace.",
"Should not use the preview cost as eligible grant cost."
]
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"projectScopeSummary": "Whole-building or central plant boiler upgrade, which would be a property-owner project rather than a household tenant project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A boiler project would require a building owner quote and central system specifications."
},
{
"inputKey": "central_boiler_serves_unit",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not specify the building's central heating equipment."
},
{
"inputKey": "applicant_controls_boiler",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A household tenant would not normally own or control a multifamily boiler."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Relevant only for property owner or property manager applicant.",
"Suppress for household applicant."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source geothermal system is unrealistic for an individual tenant household in an existing multifamily apartment building.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No owner-led geothermal feasibility study or quote is present."
},
{
"inputKey": "site_control_for_borefield",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household does not control land or subsurface work for geothermal loops."
},
{
"inputKey": "engineering_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring and no audit or study cost is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unrealistic for this applicant.",
"Could be evaluated only as a building-owner capital project."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Potential in-unit heat pump water heater only if the apartment has a dedicated tenant-controlled water heater; otherwise likely central domestic hot water and not tenant-actionable.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Installed cost and equipment model are required to calculate most incentives."
},
{
"inputKey": "dedicated_in_unit_water_heater_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not state whether domestic hot water is in-unit or central."
},
{
"inputKey": "water_heater_capacity_gallons",
"value": 50,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 40-50 gallon unit would be plausible for a small household if there is a dedicated water heater."
},
{
"inputKey": "equipment_energy_star_certified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Certification and model details are not provided."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Water heater replacement in a rental unit requires landlord approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Possible only if there is a dedicated in-unit water heater and landlord approval.",
"Suppress if the building has central domestic hot water."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Tenant-scale insulation work is not realistic; envelope upgrades would be building-owner work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No insulation scope, area, R-value, or quote is provided."
},
{
"inputKey": "insulation_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Envelope areas are unknown and should not be inferred from whole-building square footage for a household tenant."
},
{
"inputKey": "tenant_controls_building_envelope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household does not generally control wall, roof, attic, or exterior envelope systems."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely ineligible for household applicant without property owner participation.",
"Do not calculate from synthetic preview cost alone."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Low-cost tenant comfort measures such as removable weatherstripping may be plausible, but grantable air sealing generally requires owner-approved envelope work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No weatherization contractor quote or approved scope is available."
},
{
"inputKey": "blower_door_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is only exploring and no audit data is provided."
},
{
"inputKey": "tenant_removable_measures_only",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a tenant, removable draft reduction measures are more realistic than permanent envelope work."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Permanent air sealing or envelope work in a rental unit usually needs owner approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May qualify only for weatherization assistance or direct-install services if income and tenancy rules are met.",
"Grant amount should be suppressed until household income eligibility and program intake status are confirmed."
]
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"projectScopeSummary": "Duct sealing is only relevant if the apartment has dedicated ducts; many multifamily units may not.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No duct diagnostic, leakage test, or contractor quote is available."
},
{
"inputKey": "dedicated_ductwork_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Apartment system type is unknown."
},
{
"inputKey": "duct_leakage_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No diagnostic data is present in the test case."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Duct work in a rental unit requires landlord approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not applicable unless there are dedicated tenant-serving ducts.",
"Suppress until system type and quote are provided."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "Replace a tenant-accessible thermostat with one smart thermostat if compatible and allowed by lease.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 25000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A basic smart thermostat plus installation is a plausible household-scale cost, but a quote or receipt is still preferred."
},
{
"inputKey": "thermostat_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single thermostat is plausible for one apartment unit."
},
{
"inputKey": "existing_thermostat_accessible_to_tenant",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not state whether the tenant has a controllable thermostat."
},
{
"inputKey": "hvac_system_compatible",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Compatibility depends on the unit HVAC controls and wiring."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Even small control changes in a rental unit may require permission."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only calculate if utility program allows tenant applicants and thermostat compatibility is confirmed.",
"Suppress if the apartment has central controls or no tenant thermostat."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Tenant replaces in-unit lamps or bulbs with LEDs; common-area lighting is excluded because it is owner-controlled.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 18000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Twelve in-unit LED lamps at about $15 each is realistic for a small apartment household."
},
{
"inputKey": "fixture_or_lamp_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview assumes 12 fixture replacements; for this household it should be interpreted as in-unit lamps, not whole-building fixtures."
},
{
"inputKey": "measure_location",
"value": "tenant_unit_only",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Tenant household scope should be limited to in-unit equipment."
},
{
"inputKey": "common_area_lighting_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Common-area lighting would be a landlord or property manager project."
},
{
"inputKey": "proof_of_purchase_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A household rebate may require receipt or proof of purchase."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely only small residential retail or direct-install incentives are relevant.",
"Do not use whole-building lighting formulas."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Replace one tenant-owned apartment refrigerator only if the tenant owns the appliance; commercial refrigeration is not relevant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Appliance purchase price and model qualification are required."
},
{
"inputKey": "refrigerator_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One refrigerator is plausible for a household unit."
},
{
"inputKey": "appliance_owned_by_tenant",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Apartment appliances may be owned by the landlord."
},
{
"inputKey": "energy_star_certified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Qualification depends on the specific appliance model."
},
{
"inputKey": "commercial_refrigeration_equipment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A residential household does not have commercial refrigeration equipment."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only residential appliance incentives should be considered.",
"Suppress commercial refrigeration grants."
]
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"projectScopeSummary": "Replace an in-unit clothes washer only if the household owns one; shared laundry equipment would be property-owner scope.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Purchase cost, model, and ownership are unknown."
},
{
"inputKey": "clothes_washer_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One washer is plausible only if the unit has in-unit laundry."
},
{
"inputKey": "in_unit_laundry_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not specify in-unit versus shared laundry."
},
{
"inputKey": "shared_common_laundry_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a household tenant; shared equipment is not household-controlled."
},
{
"inputKey": "energy_star_certified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Specific equipment qualification is missing."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Calculate only for tenant-owned in-unit appliance purchases.",
"Suppress for common laundry projects unless applicant changes to property owner."
]
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"projectScopeSummary": "Install tenant-level low-flow showerhead and faucet aerators using removable or landlord-approved measures.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small set of low-flow fixtures for one apartment is plausibly around $120."
},
{
"inputKey": "low_flow_showerhead_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One bathroom is plausible for a small apartment household."
},
{
"inputKey": "faucet_aerator_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Kitchen and bathroom aerators are plausible in-unit measures."
},
{
"inputKey": "toilet_replacement_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Toilet replacement is a permanent plumbing fixture project and should not be assumed for a tenant."
},
{
"inputKey": "landlord_approval_required",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Removable aerators and showerheads may not require formal approval, unlike permanent plumbing replacement."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Usually a small direct-install or conservation measure, not a large grant.",
"Some water utility programs may require account-holder status or direct installation."
]
},
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"projectScopeSummary": "ERV retrofit is a building mechanical system project and not realistic for a tenant household.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "ERV scope and cost would need owner-led mechanical design."
},
{
"inputKey": "applicant_controls_ventilation_system",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A household tenant would not control multifamily ventilation systems."
},
{
"inputKey": "mechanical_design_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owner project or mechanical study is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress for household applicant.",
"Only relevant as a property-owner multifamily retrofit."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Personal EV charging access would require landlord approval and parking/electrical rights; property-wide chargers are owner-controlled.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "EV charger installation cost depends on parking location, panel capacity, trenching, wiring, and ownership."
},
{
"inputKey": "level_2_ports",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One port is the only plausible household-scale request."
},
{
"inputKey": "ev_owned_or_leased_by_household",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No vehicle ownership information is included."
},
{
"inputKey": "assigned_parking_space_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The household's parking rights are unknown."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Charging installation in multifamily parking requires property owner approval."
},
{
"inputKey": "landlord_approval_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Approval is not documented."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Household tenant is unlikely to qualify for multifamily or commercial EV infrastructure grants directly.",
"Could become relevant if landlord applies or provides written authorization."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Same scope as EV charger installation: one possible Level 2 port for tenant use, subject to landlord and parking approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Installed cost cannot be inferred without a site quote."
},
{
"inputKey": "charger_level",
"value": "Level 2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit type is Level 2 EV charger installation."
},
{
"inputKey": "charger_ports",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A single port is plausible for a household if approved."
},
{
"inputKey": "charger_power_kw",
"value": 7.2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 32 amp, 240 volt Level 2 charger is common for residential charging, but actual equipment is not selected."
},
{
"inputKey": "site_electrical_capacity_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Panel and building electrical capacity must be checked."
},
{
"inputKey": "public_or_shared_access",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A household tenant project would be for private use, not public charging."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress public, commercial, or multifamily owner EV infrastructure grants for this tenant applicant.",
"Needs quote, landlord approval, parking rights, and EV ownership confirmation."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Rooftop solar on the multifamily property is not controlled by the household tenant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar cost, system size, interconnection, and ownership model are unknown."
},
{
"inputKey": "system_capacity_kw_dc",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A household tenant should not be assigned a rooftop PV system size for a building roof they do not control."
},
{
"inputKey": "tenant_controls_roof",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Roof rights are retained by the building owner or property manager."
},
{
"inputKey": "net_metering_account_holder",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The tenant may hold an electric account but not roof/interconnection rights for property solar."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress rooftop solar grants for household tenant unless the project is community solar subscription or owner-approved tenant solar, neither of which is provided.",
"The $100,000 preview cost should not be treated as household eligible cost."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal water heating is a roof and central plumbing project, not a household tenant retrofit.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No solar thermal design, roof rights, plumbing scope, or quote exists."
},
{
"inputKey": "tenant_controls_roof",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The tenant does not control the multifamily roof."
},
{
"inputKey": "central_domestic_hot_water_project",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar water heating for multifamily would typically serve a central domestic hot water system."
},
{
"inputKey": "applicant_controls_domestic_hot_water_system",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A household tenant does not generally control central water heating."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress for tenant applicant.",
"Potentially relevant only for building owner."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine is unrealistic for a tenant household in an urban multifamily building.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No turbine system size, permitting status, site control, or quote is available."
},
{
"inputKey": "site_has_wind_resource_assessment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind resource study is included and urban multifamily wind is not a realistic household measure."
},
{
"inputKey": "tenant_controls_installation_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The tenant does not control land, roof, tower placement, or interconnection for a wind turbine."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unrealistic for this customer.",
"Should remain suppressed."
]
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"projectScopeSummary": "Whole-building submetering or monitoring is owner-controlled; tenant may use plug-level monitoring only, which is not typically grantable.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No monitoring system quote or metering design exists."
},
{
"inputKey": "whole_building_metering_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a household tenant, not the property owner."
},
{
"inputKey": "tenant_controls_metering_infrastructure",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Utility metering and submeters are controlled by the utility, owner, or property manager."
},
{
"inputKey": "plug_load_monitoring_only",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Tenant-scale energy monitoring would likely be limited to consumer plug monitors or smart plugs."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress building metering incentives for household applicant.",
"Consumer plug monitors generally should not produce grant estimates."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "generic_mn_residential_income_qualified_weatherization_or_direct_install",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "household_income_verified_for_low_income_programs",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The property is mixed-income, but individual household income qualification is unverified."
},
{
"inputKey": "tenant_has_permission_for_owner_affected_measures",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Weatherization measures that affect the building require landlord participation or approval."
},
{
"inputKey": "program_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or preapproval evidence is present."
}
],
"reasoning": "Potentially relevant for a tenant household, but no income verification, intake, or approval status exists. Suppress dollar estimate until eligibility and application status are confirmed."
},
{
"opportunityId": "generic_xcel_residential_led_or_smart_thermostat_rebate",
"expectedHandling": "calculate_if_formula_ready",
"inputFacts": [
{
"inputKey": "electric_utility_provider",
"value": "Xcel Energy",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household reports Xcel electric service."
},
{
"inputKey": "measure_location",
"value": "tenant_unit_only",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Tenant-controlled lighting or thermostat measures should be limited to the unit."
},
{
"inputKey": "proof_of_purchase_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small residential rebates may require a receipt or eligible product documentation."
}
],
"reasoning": "Small tenant-scale electric measures may be calculable if the rule formula only needs customer utility, measure count, and product eligibility. Keep uncertain if proof of purchase or compatibility is required."
},
{
"opportunityId": "generic_centerpoint_residential_gas_equipment_rebate",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "gas_utility_provider",
"value": "CenterPoint Energy",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household reports CenterPoint gas service."
},
{
"inputKey": "gas_equipment_owned_or_controlled_by_applicant",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The household may not own or control gas heating or water heating equipment in the apartment."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas equipment rebate calculations require quoted or invoiced equipment details."
}
],
"reasoning": "Gas utility equipment incentives may be relevant only if the tenant has a dedicated qualifying appliance and landlord approval. Do not calculate from generic preview costs."
},
{
"opportunityId": "generic_multifamily_owner_energy_efficiency_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_property_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The household leases the unit."
},
{
"inputKey": "owner_or_property_manager_participating",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No owner participation is indicated."
}
],
"reasoning": "Whole-building multifamily grants should not be calculated for an individual household tenant unless the applicant is changed to the owner or owner authorization is provided."
},
{
"opportunityId": "generic_ev_charging_multifamily_infrastructure_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_controls_parking_and_electrical_infrastructure",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household does not normally control multifamily parking or electrical infrastructure."
},
{
"inputKey": "landlord_approval_obtained",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No approval is provided."
},
{
"inputKey": "number_of_charging_ports",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One port is plausible for a tenant request, but typical multifamily infrastructure grants may expect owner-led shared charging."
}
],
"reasoning": "Suppress for household applicant unless landlord is the applicant or provides authorization and site control evidence."
},
{
"opportunityId": "generic_rooftop_solar_tax_credit_or_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_controls_roof",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household does not control the apartment building roof."
},
{
"inputKey": "system_capacity_kw_dc",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No system design or interconnection information exists."
},
{
"inputKey": "qualified_solar_project_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household is not shown to own a solar system."
}
],
"reasoning": "Do not assign rooftop solar incentives to a tenant household based on the building address alone."
},
{
"opportunityId": "generic_public_sector_or_school_energy_grant",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a private residential household."
},
{
"inputKey": "school_or_education_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is not an educational institution."
}
],
"reasoning": "Public and school grant programs should be filtered out."
},
{
"opportunityId": "generic_commercial_or_industrial_efficiency_grant",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "commercial_customer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is residential."
},
{
"inputKey": "industrial_customer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is residential multifamily, not industrial."
}
],
"reasoning": "Commercial, industrial, agricultural, and broad nonresidential programs should remain blocked."
},
{
"opportunityId": "generic_nonprofit_affordable_housing_owner_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "nonprofit_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is the household tenant, not the nonprofit owner."
},
{
"inputKey": "affordable_housing_property_owner_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The property may be mixed-income, but the applicant is not the owner."
}
],
"reasoning": "Affordable housing owner grants should not be calculated for a tenant household."
},
{
"opportunityId": "generic_grant_probability_or_competitive_award_estimate",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is only exploring."
},
{
"inputKey": "award_probability_evidence_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application score, waitlist status, reservation, or award notice is available."
}
],
"reasoning": "Competitive or probabilistic grants should be suppressed absent application-specific evidence."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "household_income_verified_for_low_income_programs",
"reason": "needs user decision"
},
{
"inputKey": "landlord_written_approval_available",
"reason": "needs user decision"
},
{
"inputKey": "contractor_quote_or_invoice_cents",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "equipment_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "preapproval_confirmation_number",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_status",
"reason": "application not submitted"
},
{
"inputKey": "owner_tax_credit_transfer_or_assignment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "roof_rights_or_solar_site_control",
"reason": "unrealistic for this customer"
},
{
"inputKey": "parking_space_and_ev_charger_site_rights",
"reason": "needs user decision"
},
{
"inputKey": "whole_building_energy_audit_cost_cents",
"reason": "unrealistic for this customer"
},
{
"inputKey": "direct_property_tax_bill_to_applicant",
"reason": "unrealistic for this customer"
},
{
"inputKey": "agency_income_eligibility_approval",
"reason": "source requires agency approval"
}
],
"doNotForceQualificationReasons": [
"The applicant is a residential tenant household, not the multifamily property owner.",
"Mixed-income property status does not automatically verify this household's income eligibility.",
"Whole-building square footage should not be used to size household projects.",
"Property-level HVAC, boiler, ventilation, insulation, rooftop solar, EV infrastructure, and submetering measures require owner control or landlord authorization.",
"Preview costs in the test fixture are not quotes and should not become eligible project costs unless the program rule explicitly allows default costs.",
"Commercial, industrial, agricultural, public-sector, school, and nonprofit-owner grants should remain blocked for this household profile.",
"Competitive grant probability estimates should remain suppressed without application status, agency approval, or award evidence."
]
}

