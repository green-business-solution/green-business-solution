{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "via-verde-bronx-renter-household",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied test-case prompt for an anonymized renter household at Via Verde. Public-context assumptions are limited to the provided record: Bronx multifamily, ConEd electric and gas, tenant relationship, 222-unit mixed-income property, and tenant/common-area utility ambiguity. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "applicant_is_individual_household",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case describes an anonymized renter household rather than the building owner, property manager, nonprofit owner, or public entity."
},
{
"inputKey": "applicant_is_building_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ownership status is Lease and normalized ownershipRelationship is tenant."
},
{
"inputKey": "applicant_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household applicant is not itself the nonprofit or property owner, even though the property may be associated with a housing organization."
},
{
"inputKey": "applicant_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A renter household would not normally be a municipality, state entity, public authority, or agency."
},
{
"inputKey": "applicant_is_school_or_education_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a residential household."
},
{
"inputKey": "applicant_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an urban apartment household in Bronx multifamily housing."
},
{
"inputKey": "applicant_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal government relationship is indicated, and an individual tenant household should not be assumed to qualify as a tribal entity."
},
{
"inputKey": "applicant_controls_roof",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing facts state that the tenant does not control common-area or roof systems."
},
{
"inputKey": "applicant_controls_common_area_systems",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing facts state tenant_controls_common_area_or_roof_systems is false."
},
{
"inputKey": "landlord_permission_for_capital_improvements",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Any hardwired, plumbing, envelope, roof, or central-system improvement would need landlord or property-manager authorization."
},
{
"inputKey": "direct_property_tax_bill_to_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing tax facts state that the taxpayer does not have a direct property tax bill."
},
{
"inputKey": "building_owner_tax_documents_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Building-owner tax documentation is required for property incentives, but the tenant is unlikely to have it without landlord participation."
},
{
"inputKey": "electric_distribution_utility",
"value": "Consolidated Edison Company of New York",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile self-reports ConEd electric service and maps it to UTIL_CONED."
},
{
"inputKey": "gas_distribution_utility",
"value": "Consolidated Edison Company of New York",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists ConEd as the gas utility provider."
},
{
"inputKey": "electric_customer_class",
"value": "residential_individual_meter_assumed",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The annual kWh and household description are consistent with an individually metered renter account, but the rate schedule has not been validated."
},
{
"inputKey": "tenant_unit_utility_responsibility",
"value": [
"electric",
"gas_possible",
"water_sewer_not_directly_billed_assumed"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes electric and gas costs for the household and a water/sewer cost summary, but multifamily tenants commonly have ambiguity over which services are directly billed."
},
{
"inputKey": "household_income_eligibility_verified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The property is mixed-income or affordable, but individual household income documentation should not be assumed."
},
{
"inputKey": "household_participates_in_utility_low_income_discount",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A utility low-income discount could affect eligibility for some residential incentives, but it is not present in the supplied facts."
},
{
"inputKey": "dwelling_unit_count_for_applicant",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a single renter household, not the owner of the full 222-unit building."
},
{
"inputKey": "building_total_units_public_context",
"value": 222,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied publicSourceNotes identify Via Verde as a 222-unit mixed-income multifamily property."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The current test case project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_contractor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quotes, contractor selections, or applications are listed, and the project is only exploratory."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant application or preapproval status is provided, so estimates requiring submitted applications should remain suppressed."
},
{
"inputKey": "preapproval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No evidence of utility, agency, landlord, or program preapproval is present."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Tenant-requested review of rooftop solar is not a realistic tenant-controlled project. Treat as building-owner scope only unless landlord participation, roof rights, interconnection responsibility, and project documents are provided.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The tenant does not control the roof and has no ownership relationship supporting direct rooftop PV incentives."
},
{
"inputKey": "system_capacity_kw_dc",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No tenant-owned PV system size should be assumed for an apartment renter without a building-owner project."
},
{
"inputKey": "roof_or_site_control_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing profile indicates the tenant does not control roof or common-area systems."
},
{
"inputKey": "landlord_or_owner_sponsor_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owner-sponsored solar project is described in the household profile."
},
{
"inputKey": "interconnection_customer_is_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A rooftop multifamily solar interconnection would normally be controlled by the owner, master meter holder, or common-area account holder, not a tenant household."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Tenant lacks roof control.",
"No building-owner participation is documented.",
"System size, quote, interconnection status, and eligible cost are unavailable.",
"A community solar subscription could be relevant to bills but is not the same as a rooftop solar PV capital project."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal water heating would be a building-level domestic hot water project. Suppress tenant-level grant estimates unless property ownership, central plant access, and owner authorization are supplied.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household is not expected to purchase or own a central solar water heating system for a multifamily property."
},
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No building-level solar thermal design should be assumed for an individual tenant."
},
{
"inputKey": "serves_domestic_hot_water_load",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tenant may not know whether hot water is centralized or individually served."
},
{
"inputKey": "tenant_controls_water_heating_system",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "In a multifamily apartment, domestic hot water infrastructure is usually under landlord or building control."
},
{
"inputKey": "landlord_permission_for_plumbing_roof_work",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar water heating would require roof and plumbing access not controlled by the tenant."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Building-level water-heating ownership is not established.",
"Tenant does not control roof systems.",
"Quote, design, and owner authorization are absent."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Stationary battery storage is not a realistic tenant-installed project in this apartment context. A small portable backup battery could be purchased by a household, but typical capital grants for stationary storage should be suppressed.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No hardwired tenant-owned stationary battery project is realistic without landlord electrical approval."
},
{
"inputKey": "battery_capacity_kwh",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview cost appears building-scale or fixture-based, but no tenant-owned system size is documented."
},
{
"inputKey": "battery_power_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Battery power rating is missing and should not be inferred for grant formulas."
},
{
"inputKey": "paired_with_solar_pv",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tenant-owned PV project is present."
},
{
"inputKey": "hardwired_installation_allowed_by_landlord",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Landlord approval is a gating fact for hardwired residential storage in a rental apartment."
},
{
"inputKey": "critical_load_panel_in_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No electrical panel upgrade or critical-load backup scope is described."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"No stationary battery quote or design.",
"No landlord permission.",
"No paired solar project.",
"Portable consumer batteries should not be treated as the same retrofit as installed energy storage."
]
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"projectScopeSummary": "Duct sealing is unlikely to be tenant-controlled and may not be applicable if the unit uses hydronic, packaged, PTAC, or centralized systems. Keep estimates suppressed until HVAC configuration and landlord permission are known.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview cost is not a customer quote, and grant calculations should require a contractor scope if ducts exist."
},
{
"inputKey": "dwelling_unit_has_accessible_ductwork",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ductwork cannot be assumed in this multifamily unit."
},
{
"inputKey": "ducts_within_tenant_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Duct sealing and insulation are usually building-system work requiring owner authorization."
},
{
"inputKey": "estimated_duct_linear_feet",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Duct quantity is unknown and cannot be inferred from whole-house utility usage."
},
{
"inputKey": "landlord_permission_for_hvac_work",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Any work on fixed HVAC systems in a leased unit generally requires landlord approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"HVAC system type is unknown.",
"Ductwork may not exist or may not be accessible.",
"Tenant control is not established.",
"A quote and landlord permission are required."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Apartment-level weatherization or air sealing may be possible in limited form, but major insulation upgrades are building-envelope work controlled by the owner. Treat as not grant-ready for the tenant household.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview cost is not a quote and the scope is not defined."
},
{
"inputKey": "conditioned_floor_area_sqft",
"value": 750,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 750-square-foot apartment is a conservative placeholder for one Bronx multifamily household, but the actual unit size is unknown."
},
{
"inputKey": "attic_or_roof_insulation_in_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Tenant does not control roof or common envelope areas."
},
{
"inputKey": "exterior_wall_insulation_in_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exterior wall insulation in multifamily housing is building-owner scope."
},
{
"inputKey": "unit_level_air_sealing_minor_scope_possible",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant may be able to install removable weatherstripping or small air-sealing measures, but this is not the same as a major insulation upgrade."
},
{
"inputKey": "landlord_permission_for_envelope_work",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Permanent insulation or envelope work requires property-owner approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Major insulation is building-owner scope.",
"Unit square footage is only a placeholder.",
"No audit, quote, or landlord approval is available.",
"Minor tenant weatherization may be eligible for direct-install or kit programs rather than capital grants."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Tenant-level LED replacement for in-unit lamps and accessible fixtures is realistic. Estimate only modest residential lighting quantities and suppress quote-based grants unless receipts or product specs are provided.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 36000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant-scale LED project is more likely to cost about $360 for lamps and a few simple fixtures than the preview's larger fixture-replacement amount."
},
{
"inputKey": "fixture_or_lamp_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview assumes 12 fixture replacements; using the same count keeps the test case internally consistent."
},
{
"inputKey": "lighting_scope_type",
"value": "tenant_in_unit_led_lamps_and_simple_fixtures",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An apartment renter can plausibly replace bulbs and plug-in lamps but not common-area lighting."
},
{
"inputKey": "common_area_lighting_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The tenant does not control common-area systems."
},
{
"inputKey": "average_existing_watts_per_lamp",
"value": 45,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A mix of older incandescent, halogen, and CFL lamps could average roughly 45 watts before replacement."
},
{
"inputKey": "average_new_watts_per_lamp",
"value": 9,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A common residential LED equivalent is around 8 to 10 watts."
},
{
"inputKey": "estimated_annual_operating_hours",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Lighting hours vary by household; 1000 hours per year is a conservative test input."
},
{
"inputKey": "product_receipts_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No receipts or invoices are in the test case."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only tenant-purchased in-unit lighting should be considered.",
"Receipts or product documentation may be needed.",
"Common-area lighting incentives should be suppressed for this applicant.",
"Some programs may provide instant discounts rather than post-project grants."
]
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"projectScopeSummary": "Tenant-level low-flow fixtures are realistic only for removable showerheads and faucet aerators. Toilets, building plumbing, and common-area water measures should be excluded without landlord participation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 14500,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant-scale fixture kit could include one showerhead, two aerators, and minor supplies rather than a large plumbing retrofit."
},
{
"inputKey": "low_flow_showerhead_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One bathroom is a realistic default for a single apartment household."
},
{
"inputKey": "faucet_aerator_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A bathroom sink and kitchen sink aerator are plausible tenant-accessible measures."
},
{
"inputKey": "toilet_replacement_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Toilet replacement is permanent plumbing work and should not be assumed for a tenant."
},
{
"inputKey": "water_bill_paid_directly_by_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The latest provider is NYC DEP, but in multifamily housing the tenant may not directly control or pay the water account."
},
{
"inputKey": "landlord_permission_for_plumbing_fixture_changes",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Even removable fixtures may be subject to lease terms or landlord rules."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only removable, tenant-accessible measures should be counted.",
"Direct water-bill savings may not accrue to the tenant.",
"Receipts or program-issued devices may be required.",
"Toilet and building plumbing projects should be excluded."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "A tenant smart thermostat is plausible only if the unit has a compatible controllable thermostat and landlord permission. Zoning or central HVAC controls should be excluded.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 30000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant-scale smart thermostat project could reasonably include one thermostat and simple installation, not a full zoning retrofit."
},
{
"inputKey": "smart_thermostat_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One thermostat is a conservative household-scale default."
},
{
"inputKey": "zoning_controls_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Zoning controls are unlikely to be within tenant control."
},
{
"inputKey": "thermostat_controls_applicant_paid_heating_or_cooling",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tenant has gas and electric costs, but it is unclear whether the thermostat controls the loads billed to the tenant."
},
{
"inputKey": "hvac_system_compatible_with_smart_thermostat",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Compatibility depends on the in-unit HVAC and control wiring."
},
{
"inputKey": "landlord_permission_for_thermostat_replacement",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A thermostat replacement in a leased apartment may require landlord approval."
},
{
"inputKey": "demand_response_enrollment_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility demand response or thermostat program enrollment is documented."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only one tenant-controlled thermostat should be counted.",
"HVAC compatibility is unknown.",
"Landlord permission may be required.",
"Program enrollment or preapproval may be required before purchase or installation."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "NY_CONED_RESIDENTIAL_SMART_THERMOSTAT_REBATE_OR_DR_PROGRAM_GENERIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "coned_residential_electric_or_gas_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household reports ConEd electric and gas costs, but the exact account class and rate schedule are not validated."
},
{
"inputKey": "eligible_smart_thermostat_model_selected",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Thermostat eligibility often depends on specific equipment and program enrollment."
},
{
"inputKey": "utility_account_number_masked",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Account proof is needed before a utility program estimate should be finalized."
},
{
"inputKey": "program_preapproval_or_enrollment_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or demand response enrollment is documented."
}
],
"reasoning": "Potentially relevant because the applicant is a ConEd residential customer, but the actual model, HVAC compatibility, and program status are missing."
},
{
"opportunityId": "NY_RESIDENTIAL_LOW_INCOME_OR_ASSISTED_HOME_ENERGY_EFFICIENCY_GENERIC",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "household_income_documentation_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Mixed-income or affordable property context is not the same as verified household income eligibility."
},
{
"inputKey": "lease_or_residency_documentation_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Residential programs may require proof of residency and utility account responsibility."
},
{
"inputKey": "landlord_consent_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Many installed efficiency measures in rental units require landlord consent."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application is documented."
}
],
"reasoning": "This may be relevant for minor tenant weatherization, LED, or thermostat measures, but income verification and application status are missing."
},
{
"opportunityId": "NY_NYC_DEP_RESIDENTIAL_WATER_CONSERVATION_GENERIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "water_provider",
"value": "New York City Department of Environmental Protection",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The siteEnergyProfile lists the latestUtilityProvider as NYC DEP."
},
{
"inputKey": "direct_water_account_holder_is_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Multifamily water accounts are commonly held by the owner, and the applicant is a tenant."
},
{
"inputKey": "eligible_fixture_scope_confirmed",
"value": [
"one_showerhead_possible",
"two_faucet_aerators_possible"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Removable tenant-level fixtures are plausible, while toilets and building plumbing are not."
}
],
"reasoning": "Relevant only for small removable water-efficiency measures. Suppress owner-account or building-plumbing incentives for the tenant applicant."
},
{
"opportunityId": "NY_MULTIFAMILY_BUILDING_OWNER_SOLAR_OR_STORAGE_INCENTIVE_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_property_owner_or_authorized_agent",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a tenant household."
},
{
"inputKey": "roof_control_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied tenant tax facts state the tenant does not control common-area or roof systems."
},
{
"inputKey": "building_owner_participation_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No building owner project or authorization is present in the household record."
}
],
"reasoning": "Building-owner solar and storage incentives should not be calculated for this tenant profile without owner authorization and project documents."
},
{
"opportunityId": "FEDERAL_RESIDENTIAL_CLEAN_ENERGY_CREDIT_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "taxpayer_owns_installed_clean_energy_property",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tenant does not control or own a rooftop solar, solar thermal, or stationary battery installation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No qualifying tenant-owned clean energy capital project is present."
},
{
"inputKey": "tax_liability_or_transferability_evidence",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Tax-credit usability is outside the supplied project facts and should not be assumed."
}
],
"reasoning": "Do not force a federal clean-energy tax incentive estimate for a renter who does not own the installed property."
},
{
"opportunityId": "COMMERCIAL_OR_NONRESIDENTIAL_ENERGY_EFFICIENCY_GRANTS_GENERIC",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "eligible_sector",
"value": "residential_household",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile is a household in multifamily residential housing."
},
{
"inputKey": "commercial_facility_or_business_activity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is not a commercial facility, industrial site, or business tenant."
}
],
"reasoning": "The blocker list already shows many commercial and nonresidential eligibility mismatches. These opportunities should remain suppressed."
},
{
"opportunityId": "NY_MULTIFAMILY_AFFORDABLE_HOUSING_OWNER_ENERGY_RETROFIT_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "building_owner_or_landlord_tax_docs_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing tax facts state building-owner or landlord tax documents are required for property incentives."
},
{
"inputKey": "owner_authorization_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owner authorization is documented."
},
{
"inputKey": "whole_building_energy_audit_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit or owner-led multifamily retrofit scope is supplied."
}
],
"reasoning": "The building may be a plausible target for owner-led multifamily programs, but the applicant is the tenant household, so estimates should not be calculated for the tenant record."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "rooftop_solar_pv_system_capacity_kw_dc",
"reason": "unrealistic for this customer"
},
{
"inputKey": "rooftop_solar_pv_quote_or_contract_cents",
"reason": "quote not available"
},
{
"inputKey": "solar_water_heating_system_design",
"reason": "unrealistic for this customer"
},
{
"inputKey": "battery_storage_system_capacity_kwh",
"reason": "needs user decision"
},
{
"inputKey": "stationary_battery_installation_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "landlord_permission_for_roof_common_area_or_central_system_work",
"reason": "needs user decision"
},
{
"inputKey": "building_owner_tax_documents",
"reason": "source requires agency approval"
},
{
"inputKey": "whole_building_energy_audit_cost_cents",
"reason": "quote not available"
},
{
"inputKey": "household_income_verification_documents",
"reason": "needs user decision"
},
{
"inputKey": "utility_account_number_masked",
"reason": "needs user decision"
},
{
"inputKey": "hvac_system_type",
"reason": "needs user decision"
},
{
"inputKey": "smart_thermostat_model",
"reason": "needs user decision"
},
{
"inputKey": "smart_thermostat_program_enrollment_or_preapproval",
"reason": "application not submitted"
},
{
"inputKey": "led_product_receipts_or_invoices",
"reason": "quote not available"
},
{
"inputKey": "water_fixture_receipts_or_program_voucher",
"reason": "quote not available"
}
],
"doNotForceQualificationReasons": [
"The applicant is a tenant household, not the building owner or authorized property agent.",
"The tenant does not control roof, common-area, central domestic hot water, or whole-building HVAC systems.",
"Property-tax-based, owner-based, and whole-building multifamily incentives require landlord or owner documentation that is not available in this tenant profile.",
"Mixed-income or affordable housing context does not automatically prove the individual household's income eligibility.",
"ConEd territory and utility costs support possible residential utility-program screening, but account class, rate schedule, model eligibility, and preapproval are missing.",
"Solar PV, solar water heating, stationary storage, envelope insulation, duct work, and zoning controls should not be made positive merely to create estimates.",
"Commercial, industrial, agricultural, public-sector, school, tribal, and fleet incentives are not relevant to this residential household profile.",
"Only small tenant-controlled measures such as in-unit LED lamps, removable water fixtures, and possibly one smart thermostat should be treated as potentially grant-relevant."
]
}

