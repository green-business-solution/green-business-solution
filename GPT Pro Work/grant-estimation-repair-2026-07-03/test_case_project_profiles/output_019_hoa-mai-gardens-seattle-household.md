{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "hoa-mai-gardens-seattle-household",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-estimation enrichment based on the supplied test-case fixture for an anonymized Seattle public-housing household at Hoa Mai Gardens. Inputs intentionally separate tenant-controlled measures from housing-authority-controlled building measures and should not force positive grant estimates where quotes, owner authorization, or agency approval are missing. Fixture citation: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing project stage is exploring, so most grant estimates should remain preliminary or suppressed until scope and authorization are confirmed."
},
{
"inputKey": "procurement_stage",
"value": "no_quotes_requested",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A household tenant exploring measures in public housing would typically not have contractor quotes for building-wide envelope, HVAC, solar, or plumbing work."
},
{
"inputKey": "grant_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application, reservation, preapproval, or award facts are present in the fixture."
},
{
"inputKey": "applicant_entity_type",
"value": "individual_household_tenant",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the organization type as Residential, organization size as Household, and ownership status as Lease."
},
{
"inputKey": "building_owner_or_authority",
"value": "Seattle Housing Authority or affiliated public housing property owner",
"valueType": "text",
"sourceStrategy": "public_context",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case describes a household in Seattle public housing and points to Seattle Housing Authority context, but the household itself is not the building owner."
},
{
"inputKey": "site_control_level",
"value": "tenant_unit_limited_control",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "As a leaseholder, the household can reasonably control plug loads and some tenant-paid fixtures, but not roof, envelope, central systems, or common-area assets."
},
{
"inputKey": "landlord_written_approval_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No written approval is present. Building-altering measures should require owner or housing-authority approval before estimates are counted."
},
{
"inputKey": "income_qualified_public_housing_resident",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture describes income-qualified public housing, which is relevant for low-income residential weatherization screening."
},
{
"inputKey": "electric_utility_customer_of_record_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Seattle City Light service is self-reported, but the fixture does not confirm whether the tenant, landlord, or housing authority is the customer of record."
},
{
"inputKey": "electric_customer_class",
"value": "residential",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The annual household kWh and residential occupancy make residential customer class the most realistic default, although the utility account should be verified."
},
{
"inputKey": "gas_utility_provider",
"value": "Puget Sound Energy",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists Puget Sound Energy as gas utility provider."
},
{
"inputKey": "annual_household_kwh",
"value": 4200,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile already includes annualKwh of 4,200."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 64000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile already includes annual electric cost of $640."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 37000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile utility summary includes annual gas cost of $370."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 52000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile utility summary includes annual water/sewer cost of $520."
},
{
"inputKey": "direct_property_tax_bill_to_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts state the taxpayer does not have a direct property tax bill."
},
{
"inputKey": "has_washington_business_excise_tax_return",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts state the household does not have a Washington business excise tax return."
},
{
"inputKey": "solar_manufacturing_activity_indicated",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture already treats the Washington solar manufacturing B&O classification as not applicable to a residential renter."
},
{
"inputKey": "public_entity_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building is public housing, but this customer profile is a household tenant rather than the public housing authority applying directly."
},
{
"inputKey": "nonprofit_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is modeled as an individual household tenant, not a nonprofit organization."
},
{
"inputKey": "tribal_entity_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, enrollment, or tribal government applicant facts appear in the fixture."
},
{
"inputKey": "school_or_education_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a multifamily residential apartment building, not a school."
},
{
"inputKey": "agricultural_producer_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site use is residential public housing, not agricultural production."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Potential unit-adjacent or building-envelope insulation improvement, but actual envelope work would require housing-authority scope, audit, and owner approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview cost exists, but a grant-eligible insulation cost should not be assumed without an owner-approved scope and contractor quote."
},
{
"inputKey": "building_envelope_owner_control_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Insulation in a multifamily public-housing building affects building assemblies controlled by the owner or housing authority."
},
{
"inputKey": "tenant_can_self_authorize_measure",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A household tenant cannot normally authorize insulation work in common or structural assemblies."
},
{
"inputKey": "energy_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit completion facts are present."
},
{
"inputKey": "audit_or_assessment_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assessment pricing depends on whether the program provides intake/assessment at no cost or requires a third-party audit."
},
{
"inputKey": "modeled_project_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The full building is 150,730 square feet, but the household's unit area and any treated envelope area are not provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely relevant to low-income weatherization only if the housing authority or approved owner representative participates.",
"Tenant household may qualify for intake, but grant-estimate calculation should require agency approval, audit findings, and owner authorization.",
"Do not use full-building square footage as a tenant-authorized project area."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Tenant-level weatherization screening for air leaks, door sweeps, caulking, and minor sealing; larger building air-sealing work requires owner approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Air-sealing may be delivered through a weatherization program, but the fixture does not include an approved work order or program cost."
},
{
"inputKey": "tenant_minor_measure_scope_allowed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Minor tenant-area measures such as draft reduction may be plausible, but building-altering measures still require approval."
},
{
"inputKey": "owner_approval_required_for_permanent_air_sealing",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Permanent sealing of building envelope penetrations in multifamily housing is normally under owner or property-manager control."
},
{
"inputKey": "household_income_documentation_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture states income-qualified public housing, but does not include actual household documentation required for application."
},
{
"inputKey": "utility_bill_or_account_documentation_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The utility profile contains synthetic annual bills, but no proof of current account or bill upload is confirmed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May be eligible for weatherization intake because this is an income-qualified residential household in Seattle.",
"Estimate should be suppressed or marked needs-application-status until agency eligibility approval is known.",
"Owner approval is required for non-minor or building-integrated work."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Possible replacement of gas or electric resistance space-conditioning with a heat pump serving the dwelling unit; building system type is unknown and tenant cannot approve central-system work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The preview cost should not be treated as eligible cost without equipment selection, installation scope, and approval."
},
{
"inputKey": "existing_space_heating_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The household has annual gas cost, but the fixture does not confirm whether gas serves space heat, water heat, cooking, or a central plant."
},
{
"inputKey": "proposed_heat_pump_type",
"value": "single_zone_ductless_mini_split_possible",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For a tenant unit, a small ductless system is the most plausible unit-scale option, but public-housing installation constraints are significant."
},
{
"inputKey": "hvac_unit_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A single household unit would commonly be modeled with one dwelling-unit system for test purposes, but the actual unit size and equipment are unknown."
},
{
"inputKey": "estimated_heat_pump_capacity_tons",
"value": 1.5,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A conservative 1.5-ton assumption is plausible for an apartment unit, but should not drive grant estimates without load calculations."
},
{
"inputKey": "owner_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Heat pump installation usually requires wall penetrations, exterior equipment placement, electrical work, or central-system coordination."
},
{
"inputKey": "electrical_panel_capacity_verified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Panel capacity and circuit availability are not provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially relevant to income-qualified electrification programs, but not tenant-authorized based on the current facts.",
"Needs owner approval, quote, equipment model, electrical feasibility, and existing fuel confirmation.",
"Do not calculate from full-building HVAC assumptions for this household profile."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Generic high-efficiency HVAC replacement is not well-defined for the tenant household because current equipment and control responsibility are unknown.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A contractor quote is required because there is no identified equipment replacement scope."
},
{
"inputKey": "existing_hvac_equipment_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The current HVAC equipment type is absent."
},
{
"inputKey": "replacement_equipment_efficiency_rating",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Grant formulas often require efficiency ratings or qualified equipment lists, which are not available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The scope is too generic to estimate.",
"Tenant control is insufficient for central or building-level HVAC replacement."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Potential replacement of a unit or central water heater with heat pump water-heating equipment; actual control is likely with the building owner or housing authority.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture preview cost is not enough to calculate a grant because water-heater type, size, and owner approval are not provided."
},
{
"inputKey": "existing_water_heater_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The gas cost could reflect water heating, cooking, or space heat; the fixture does not identify the water-heating system."
},
{
"inputKey": "water_heater_control",
"value": "unknown_likely_owner_or_property_manager",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Multifamily public housing commonly has owner-controlled water-heating infrastructure or at least owner approval requirements."
},
{
"inputKey": "proposed_heat_pump_water_heater_capacity_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity depends on whether the measure serves one dwelling unit, a common system, or multiple apartments."
},
{
"inputKey": "qualified_product_model_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment model or qualified-product documentation is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially relevant to electrification incentives, but not enough facts exist to calculate.",
"Owner approval and system configuration are required."
]
},
{
"retrofitTypeId": "window_replacement",
"projectScopeSummary": "Possible apartment or building window replacement, but this is a building-envelope capital measure under owner control.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Window replacement needs a quote, window count, performance specifications, and owner authorization."
},
{
"inputKey": "window_count",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not include unit size or window count."
},
{
"inputKey": "proposed_window_u_factor",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Performance specifications are required for many window incentives and are not provided."
},
{
"inputKey": "owner_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Windows are part of the building envelope and cannot normally be replaced by a tenant without owner approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A low-income multifamily owner project could be relevant, but this tenant household record should not calculate a window grant.",
"Needs owner-led project scope and quote."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Tenant-controlled replacement of lamps or small fixtures inside the household unit; common-area lighting is outside tenant control.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 42000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant-level lighting project with roughly 12 LED lamps or small fixtures at about $35 each is plausible and materially smaller than a whole-building retrofit."
},
{
"inputKey": "fixture_or_lamp_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview assumes 12 fixture replacements, which is reasonable for a single apartment household."
},
{
"inputKey": "common_area_lighting_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The household tenant should not be assumed to control common-area lighting."
},
{
"inputKey": "qualified_led_products_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No product list or purchase receipt is present."
},
{
"inputKey": "installation_type",
"value": "tenant_self_install_lamps_only",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Self-installed lamps are a realistic tenant-level measure; hardwired fixture replacement would require property approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Small tenant lighting upgrades may save energy but often do not map to grant programs.",
"Do not treat whole-building lighting scope as tenant-controlled."
]
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"projectScopeSummary": "Tenant-level low-flow aerators and showerhead replacement, excluding plumbing modifications and common systems.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12500,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small package with one showerhead and two faucet aerators is plausible for a household and much smaller than a building-wide plumbing retrofit."
},
{
"inputKey": "low_flow_showerhead_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One shower is a conservative household-level assumption."
},
{
"inputKey": "faucet_aerator_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two aerators are plausible for a kitchen and bathroom sink."
},
{
"inputKey": "toilet_replacement_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Toilet replacement is a plumbing fixture alteration likely requiring owner approval, so it is excluded from tenant-controlled scope."
},
{
"inputKey": "water_provider",
"value": "Seattle Public Utilities",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile lists Seattle Public Utilities as the latest utility provider for water/sewer context."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be eligible for free conservation kits or direct install, but not a major grant estimate.",
"Plumbing fixture replacement beyond aerators/showerhead should require owner approval."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Owned rooftop solar is not realistic for the tenant household because roof rights, interconnection, tax ownership, and capital control sit with the property owner.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No tenant-owned solar project quote or owner-approved scope exists."
},
{
"inputKey": "system_capacity_kw_dc",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 4 kW tenant-scale system could offset annual usage, but roof rights are absent, so sizing should remain unknown."
},
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household in a multifamily building does not normally control the roof."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application facts are present."
},
{
"inputKey": "tax_credit_monetization_owner",
"value": "not_applicant",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household tenant is unlikely to own or monetize incentives for a building rooftop system."
},
{
"inputKey": "battery_storage_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No storage scope appears in the fixture."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate rooftop solar grants for this household tenant profile.",
"A separate owner-led affordable-housing solar profile could be valid, but it is not this applicant."
]
},
{
"retrofitTypeId": "community_solar_subscription",
"projectScopeSummary": "Potential tenant-level subscription or bill-credit option if available through the utility or a qualified program; no specific subscription has been selected.",
"inputFacts": [
{
"inputKey": "subscription_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview includes a community solar subscription concept, but no actual selected program is present."
},
{
"inputKey": "subscription_upfront_cost_cents",
"value": 50000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview uses a $500 upfront cost for test-case modeling."
},
{
"inputKey": "annual_subscription_bill_credit_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Bill credit depends on a specific subscription product and utility tariff."
},
{
"inputKey": "requires_roof_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A subscription product would not require the tenant to control the building roof."
},
{
"inputKey": "utility_account_holder_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Subscription eligibility may require the tenant to be the electric utility account holder."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be a realistic non-capital option, but not enough product or tariff facts exist to estimate a grant.",
"Should not be treated as an owned solar asset."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar water heating is not realistic for the tenant household because it requires roof/plumbing access and owner-led capital work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No owner-approved quote or plumbing/roof scope exists."
},
{
"inputKey": "collector_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Collector sizing requires system design and roof access."
},
{
"inputKey": "roof_or_mechanical_room_access_controlled_by_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household does not normally control roof or central mechanical areas."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not realistic for this applicant without a separate owner-led project.",
"Should be suppressed as tenant lacks roof and plumbing control."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy system is not realistic for an individual household tenant in a Seattle multifamily public-housing building.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The modeled preview cost should not be used because there is no plausible project scope for this customer."
},
{
"inputKey": "onsite_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A residential apartment household does not have agricultural, industrial, or wastewater feedstock."
},
{
"inputKey": "industrial_or_agricultural_process_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is residential public housing."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unrealistic for this customer.",
"Suppress rather than ask for quote unless the profile changes to an owner/operator facility."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Combined heat and power is not realistic for a single household tenant with low annual electric load and no central plant control.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No CHP engineering study, load profile, or central-system control exists."
},
{
"inputKey": "annual_kwh_load_for_chp_screen",
"value": 4200,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The household annual electric load is far below typical CHP screening scale."
},
{
"inputKey": "central_thermal_load_controlled_by_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household does not control a central thermal plant."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unrealistic for this customer.",
"Should be suppressed as nonresidential/central-plant technology mismatch."
]
},
{
"retrofitTypeId": "waste_heat_recovery",
"projectScopeSummary": "Waste heat recovery is not realistic for the household because there is no industrial process, commercial kitchen, data center, or central mechanical system under applicant control.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No waste-heat source or engineering study exists."
},
{
"inputKey": "waste_heat_source_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A household apartment profile has no qualifying waste-heat stream."
},
{
"inputKey": "industrial_process_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site's primary activity is residential occupancy."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not relevant to the profile.",
"Suppress as technology mismatch."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5622",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "program_name",
"value": "Seattle HomeWise: Weatherization",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The matched opportunity in the test case identifies Seattle HomeWise: Weatherization."
},
{
"inputKey": "applicant_is_seattle_residential_household",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The address is in Seattle and the applicant is a residential household."
},
{
"inputKey": "income_qualified_or_public_housing_resident",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture describes income-qualified public housing, but application documentation is not included."
},
{
"inputKey": "weatherization_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted application is present."
},
{
"inputKey": "agency_eligibility_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No approval or reservation is present."
},
{
"inputKey": "owner_permission_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Weatherization work in rental multifamily housing typically needs owner/property approval, which is not provided."
},
{
"inputKey": "grant_eligible_weatherization_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Program delivery or eligible cost should come from agency assessment, not from the generic preview."
},
{
"inputKey": "eligible_measures_requested",
"value": [
"air_sealing_weatherization",
"insulation_upgrade"
],
"valueType": "array",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The matched grant appears for insulation and air sealing/weatherization in the fixture."
}
],
"reasoning": "This is the most plausible grant match for the profile because the household is residential, Seattle-based, and described as income-qualified public housing. However, it should not generate a firm customer-facing grant amount until the application, agency assessment, income documentation, and owner authorization are confirmed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "not_applicable_residential_renter",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing opportunity-specific inputs already state the household is not a qualifying Washington solar manufacturer, processor for hire, or manufacturer wholesaler."
},
{
"inputKey": "qualifying_tax_base_after_deductions_and_matc_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No Washington B&O tax base applies to this residential renter profile."
},
{
"inputKey": "annual_tax_performance_report_filed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The reporting requirement is not relevant unless the applicant is a qualifying solar manufacturer claiming the preference."
}
],
"reasoning": "Suppress this opportunity. The profile is a residential tenant household and has no solar manufacturing activity, business excise tax return, or qualifying B&O tax base."
},
{
"opportunityId": "UNMATCHED_TYPICAL_SOLAR_OR_STORAGE_GRANTS",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant leases a unit in a multifamily building."
},
{
"inputKey": "solar_project_owner",
"value": "not_household_tenant",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A rooftop project would almost certainly be owned or approved by the building owner, not the tenant."
}
],
"reasoning": "Owned rooftop solar, solar water heating, and storage incentives should not be calculated for this applicant unless the profile changes to an owner-led project."
},
{
"opportunityId": "UNMATCHED_TYPICAL_UTILITY_RESIDENTIAL_REBATES",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_of_record_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Many utility rebates require the applicant or property to be the account holder."
},
{
"inputKey": "qualified_equipment_model_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment model, AHRI certificate, qualified-product list match, or contractor quote is present."
},
{
"inputKey": "installation_address_matches_utility_account",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Service address is known, but account documentation is not."
}
],
"reasoning": "Residential utility rebates may be possible for small measures, but estimates should remain suppressed until account-holder status, qualified equipment, and quotes are available."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quote_total_cents",
"reason": "quote not available"
},
{
"inputKey": "line_item_eligible_cost_cents_by_measure",
"reason": "quote not available"
},
{
"inputKey": "weatherization_agency_approval_or_reservation_amount_cents",
"reason": "source requires agency approval"
},
{
"inputKey": "weatherization_application_submission_date",
"reason": "application not submitted"
},
{
"inputKey": "income_documentation_file",
"reason": "needs user decision"
},
{
"inputKey": "landlord_or_housing_authority_approval_letter",
"reason": "source requires agency approval"
},
{
"inputKey": "tenant_unit_square_footage",
"reason": "needs user decision"
},
{
"inputKey": "treated_envelope_area_sqft",
"reason": "quote not available"
},
{
"inputKey": "hvac_equipment_model_number",
"reason": "quote not available"
},
{
"inputKey": "existing_hvac_system_type",
"reason": "needs user decision"
},
{
"inputKey": "existing_water_heater_type",
"reason": "needs user decision"
},
{
"inputKey": "electrical_panel_capacity_amps",
"reason": "needs user decision"
},
{
"inputKey": "utility_account_customer_of_record",
"reason": "needs user decision"
},
{
"inputKey": "rooftop_solar_interconnection_application_number",
"reason": "unrealistic for this customer"
},
{
"inputKey": "rooftop_solar_system_capacity_kw_dc",
"reason": "unrealistic for this customer"
},
{
"inputKey": "battery_storage_capacity_kwh",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_feedstock_volume",
"reason": "unrealistic for this customer"
},
{
"inputKey": "chp_engineering_study_cost_cents",
"reason": "unrealistic for this customer"
},
{
"inputKey": "waste_heat_recovery_source_temperature",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The applicant is a household tenant, not the building owner, housing authority, nonprofit sponsor, public entity applicant, or tax-credit owner.",
"The building is public housing, but public or affordable-housing status alone should not make tenant-led capital projects eligible.",
"The full 150,730 square-foot building size should not be used as the project area for a single household tenant.",
"Building-envelope, window, central HVAC, water-heating, rooftop solar, and plumbing measures require owner or housing-authority approval.",
"Seattle HomeWise-style weatherization may be plausible for intake, but a grant amount should require application status, agency assessment, income documentation, and owner permission.",
"Washington solar manufacturing tax preferences should remain suppressed because the applicant is a residential renter with no B&O tax base or solar manufacturing classification.",
"Industrial, agricultural, CHP, biomass, biogas, and waste-heat recovery opportunities are technology mismatches for this residential household.",
"Community solar should be modeled as a potential subscription or bill-credit decision, not as owned onsite generation.",
"Generic preview costs are not contractor quotes and should not be treated as grant-eligible costs unless a grant rule explicitly allows modeled defaults."
]
}

