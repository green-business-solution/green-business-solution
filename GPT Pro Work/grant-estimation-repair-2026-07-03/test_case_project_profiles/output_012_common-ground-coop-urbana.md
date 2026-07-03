{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "common-ground-coop-urbana",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied Common Ground Food Co-op Urbana test case. The record is modeled as an 8,000 sq ft leased grocery tenant with Ameren Illinois delivery service, significant refrigeration/electric load, and limited control over roof/central plant assets. Public-context facts are limited to the supplied website and address context in the test case. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Modeled as a retail grocery cooperative operating as a commercial business, not as a 501(c)(3) nonprofit applicant."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the applicant as a commercial business, not a municipality, school, state agency, or other public entity."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site activity is retail grocery sales and prepared-food operations."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer sells local food but is modeled as a grocery retailer, not a farm or agricultural production facility."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal government facts are present in the supplied profile."
},
{
"inputKey": "is_small_business",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists 11-50 employees, which is appropriate for a small commercial grocery tenant profile."
},
{
"inputKey": "naics_primary",
"value": "445110",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form lists NAICS 445110 for grocery retail."
},
{
"inputKey": "utility_customer_of_record_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grocery tenant with substantial annual kWh is likely to have its own electric account, but this should remain user-confirmable."
},
{
"inputKey": "electric_distribution_utility_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized utility profile marks Ameren Illinois as self-reported and unverified."
},
{
"inputKey": "electric_supply_choice_ambiguous",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case description explicitly calls out Ameren delivery utility with supplier-choice ambiguity."
},
{
"inputKey": "owns_building",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists ownership status as Lease."
},
{
"inputKey": "tenant_has_roof_rights",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Onsite solar, solar thermal, wind, and roof-mounted equipment require landlord approval or roof rights that are not present in the test case."
},
{
"inputKey": "tenant_has_hvac_replacement_authority",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A leased grocery suite may control some packaged units but not all central HVAC or building envelope systems."
},
{
"inputKey": "landlord_written_consent_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Project stage is exploring, so landlord consent is assumed not yet obtained for capital projects affecting roof, structure, interconnection, or central systems."
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
"value": "no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quotes, vendors, or applications are present in the supplied test case."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploratory and there is no evidence of a submitted incentive or grant application."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval facts are available; many utility incentives should remain suppressed or conditional until preapproval status is known."
},
{
"inputKey": "annual_kwh",
"value": 285000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile supplies annual electricity use."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 3306000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile supplies annual electric cost of $33,060."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 858000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile supplies annual gas cost of $8,580."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 11.6,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile lists average cost per kWh as $0.116."
},
{
"inputKey": "annual_therms",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile includes gas cost but not annual therms, which may be needed for HVAC, water-heating, or CHP estimates."
},
{
"inputKey": "customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a nonresidential grocery tenant with commercial electric and gas use."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace remaining fluorescent, halogen, and older back-of-house lamps with LED fixtures and controls in sales floor, prep, office, storage, and exterior/service areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost as a realistic small tenant lighting project budget."
},
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit preview already assumes 12 fixture replacements; this is plausible for a partial upgrade rather than whole-store relighting."
},
{
"inputKey": "annual_operating_hours",
"value": 5000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grocery tenant commonly has long daily operating and stocking hours."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 9200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial LED retrofit is modeled as roughly 3.2% of annual electric usage."
},
{
"inputKey": "existing_lighting_type",
"value": "mixed_fluorescent_and_led",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A mature grocery tenant is unlikely to have no LEDs, so this is modeled as a remaining-fixtures project."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote is supplied in the test case."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility incentives may require preapproval before purchase or installation.",
"Actual eligible cost and fixture quantities require a contractor quote.",
"If the fixtures were already replaced, the incentive should be suppressed."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace one tenant-serving rooftop or split HVAC unit with high-efficiency equipment; exclude shared-building central systems unless landlord confirms tenant authority.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost as a plausible single-unit small commercial HVAC replacement budget."
},
{
"inputKey": "hvac_unit_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An 8,000 sq ft grocery tenant may control one or more tenant-serving units; one unit is conservative."
},
{
"inputKey": "cooling_capacity_tons",
"value": 7.5,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity is a planning placeholder only and should be replaced by nameplate or quote data."
},
{
"inputKey": "equipment_type",
"value": "high_efficiency_rooftop_unit_or_split_system",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The tenant may have either rooftop packaged equipment or split systems; the exact equipment type is unknown."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 14500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The admin preview says HVAC savings are modeled until equipment-specific efficiency data are collected."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings cannot be calculated without existing and proposed heating equipment details."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "HVAC replacement in a leased shared building normally requires landlord consent."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment quote or AHRI certificate is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on exact equipment efficiency, utility program rules, and preapproval.",
"Tenant authority and landlord approval are unresolved.",
"Existing equipment baseline is unknown."
]
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"projectScopeSummary": "Install tenant-level energy monitoring for refrigeration, HVAC, lighting, and general plug/process loads to identify operating savings and support future incentive applications.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 84800,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for a small commercial monitoring installation."
},
{
"inputKey": "meter_or_circuit_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small grocery tenant can reasonably monitor refrigeration, HVAC, lighting, and main panels with a limited number of circuits."
},
{
"inputKey": "includes_refrigeration_monitoring",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Refrigerated food merchandising is a major part of the stated activity."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 5700,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Monitoring alone is modeled as enabling modest operational savings of about 2% of annual kWh."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote, meter schedule, or panel inventory is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Monitoring may qualify only when bundled with eligible controls or verified energy conservation measures.",
"Many grant formulas will require measured savings, an audit, or a larger implementation project."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install a behind-the-meter battery sized for short-duration refrigeration resilience and limited demand management, subject to tenant electrical-room space and landlord consent.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost for a small commercial storage project."
},
{
"inputKey": "battery_power_kw",
"value": 60,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Power is sized conservatively for critical grocery loads rather than full-store backup."
},
{
"inputKey": "battery_energy_kwh",
"value": 160,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Energy capacity supports several hours of selected refrigeration and controls rather than whole-building resilience."
},
{
"inputKey": "critical_load_kw",
"value": 35,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical load is estimated for refrigeration, point-of-sale, networking, and limited lighting only."
},
{
"inputKey": "is_paired_with_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This standalone storage scenario does not assume roof rights or PV interconnection."
},
{
"inputKey": "demand_charge_rate_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Demand charge rate is listed as an available field but not populated in the supplied profile."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Battery installation affects electrical infrastructure, space, fire safety, and leasehold improvements."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection or utility review fact is supplied."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No battery proposal, one-line diagram, or installed-cost quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Standalone storage incentives are often program-specific and may require resilience, demand-response, or low-income/community criteria not present here.",
"Tenant control, interconnection, fire-code review, and demand-charge data are unresolved.",
"Should not be forced into a positive estimate without a specific program formula and quote."
]
},
{
"retrofitTypeId": "community_solar_subscription",
"projectScopeSummary": "Subscribe a portion of the tenant electric account to offsite community solar bill credits instead of installing onsite PV.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 50000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost as nominal enrollment/admin cost rather than owned equipment cost."
},
{
"inputKey": "subscribed_annual_kwh",
"value": 120000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Subscription is sized at about 42% of annual electric usage to avoid over-crediting a tenant account."
},
{
"inputKey": "subscription_percent_of_annual_usage",
"value": 42,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Calculated from 120,000 subscribed kWh divided by 285,000 annual kWh."
},
{
"inputKey": "customer_has_eligible_utility_account",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile indicates a commercial Ameren Illinois electric delivery account, but account-level eligibility should be verified."
},
{
"inputKey": "subscription_contract_signed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No subscription contract is supplied."
},
{
"inputKey": "low_income_or_environmental_justice_adder_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No qualifying designation is supplied; do not assume enhanced community-solar incentives."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"This is not a capital grant estimate; savings depend on contract terms, bill-credit value, and subscription availability.",
"Supplier-choice ambiguity may affect bill presentation but should not replace delivery-utility verification.",
"Enhanced incentives should be suppressed unless account eligibility and program category are confirmed."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Possible small roof or canopy PV project for tenant load offset, but roof rights and landlord participation are not established.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses existing preview cost for an indicative commercial PV project."
},
{
"inputKey": "dc_kw_capacity",
"value": 50,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 50 kWdc system is a conservative placeholder for partial load offset at an 8,000 sq ft grocery tenant."
},
{
"inputKey": "ac_kw_capacity",
"value": 40,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "AC size is estimated from typical DC-to-AC ratio and should be replaced by design documents."
},
{
"inputKey": "estimated_annual_kwh_generation",
"value": 65000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning value for partial load offset; no solar assessment or shade study is supplied."
},
{
"inputKey": "roof_rights_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a tenant in a shared building, so roof rights should not be assumed."
},
{
"inputKey": "landlord_participation_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No landlord authorization or property-owner participation fact is present."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application fact is present."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No PV quote, layout, or interconnection estimate is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"PV should remain suppressed or needs-project-scope until roof rights and landlord consent are confirmed.",
"A leased suite may pursue community solar more realistically than owned onsite PV.",
"Do not assume tax-credit monetization or grant eligibility from ownership alone."
]
},
{
"retrofitTypeId": "solar_plus_storage_system",
"projectScopeSummary": "Combined rooftop PV and battery resilience concept, but this is unlikely for the tenant without landlord participation and a formal engineering design.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 13080000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses existing preview cost as a combined PV and storage concept budget."
},
{
"inputKey": "dc_kw_capacity",
"value": 50,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "PV capacity inherits the rooftop PV placeholder and should not be treated as quote-backed."
},
{
"inputKey": "battery_energy_kwh",
"value": 120,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Storage is sized below the standalone storage concept for paired resilience."
},
{
"inputKey": "critical_loads_served",
"value": [
"refrigeration_controls",
"selected_refrigerated_cases",
"point_of_sale",
"networking",
"limited_lighting"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical loads are consistent with grocery operations but need electrical design validation."
},
{
"inputKey": "roof_rights_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tenant lease status makes roof access uncertain."
},
{
"inputKey": "engineering_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No one-line, load study, or resilience design is present."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No combined system quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Project should require scope and quote before calculation.",
"Landlord approval, roof rights, interconnection, and engineering design are all unresolved.",
"Only calculate if a specific program allows tenant applicants or includes property-owner participation."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump concept is not realistic for a leased grocery suite in a shared urban building without property-owner redevelopment scope.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses existing preview cost, but the cost is likely not meaningful without a geothermal feasibility study."
},
{
"inputKey": "ground_loop_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No land, well field, or building-level geothermal design is present."
},
{
"inputKey": "landlord_participation_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ground-source geothermal would require property-owner involvement in a shared building."
},
{
"inputKey": "feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study is available."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geothermal quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unrealistic as a tenant-only project.",
"Should remain suppressed unless converted into a landlord-led whole-building project.",
"Requires feasibility, drilling/site control, and a quote."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal water-heating concept for prepared-food and washdown loads, but roof access is unresolved and electric/gas baseline is unknown.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses existing preview cost as a small solar thermal project budget."
},
{
"inputKey": "collector_area_sqft",
"value": 96,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Represents a small commercial solar thermal array, not a whole-building system."
},
{
"inputKey": "storage_tank_gallons",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Placeholder for prepared-food and sanitation hot-water use."
},
{
"inputKey": "current_water_heater_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied profile does not identify existing water-heating fuel or capacity."
},
{
"inputKey": "roof_rights_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar thermal roof installation requires landlord consent."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No solar thermal quote or plumbing scope is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be less realistic than high-efficiency water heating or controls for this tenant.",
"Requires roof rights, plumbing feasibility, and existing water-heater baseline.",
"Do not calculate without a program formula and quote."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas generation is not a realistic tenant project for an 8,000 sq ft urban grocery co-op.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost only as a suppressible fixture value; no realistic project scope is assumed."
},
{
"inputKey": "available_biomass_feedstock_tons_per_year",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Grocery food waste is not sufficient evidence of controlled biomass feedstock for an energy system."
},
{
"inputKey": "onsite_generation_feasible",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased grocery suite in a shared urban building is unlikely to host biomass or biogas equipment."
},
{
"inputKey": "air_permit_or_environmental_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No permitting evidence is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as likely ineligible or unrealistic for this profile.",
"Do not infer eligibility from grocery organic waste alone.",
"A composting or waste-diversion project would be a more plausible non-energy scope."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not modeled as realistic because the tenant lacks confirmed year-round thermal load, space, ownership control, and engineering study.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost as a suppressible concept budget."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": 50,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small CHP placeholder is sized below average load, but no load profile or thermal use is confirmed."
},
{
"inputKey": "useful_thermal_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost alone does not establish sufficient coincident thermal load for CHP."
},
{
"inputKey": "engineering_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No CHP feasibility or interconnection study is supplied."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "CHP would require space, exhaust, gas service, electrical interconnection, and landlord consent."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No CHP quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not appropriate for this customer without a larger whole-building or district energy scope.",
"Requires detailed load, thermal utilization, interconnection, emissions, and quote data.",
"Should not produce a grant estimate from generic preview cost alone."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Microgrid concept for grocery resilience is beyond the likely tenant-controlled scope and should require engineering, landlord, utility, and emergency-load planning.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses existing preview cost as a concept budget only."
},
{
"inputKey": "microgrid_capacity_kw",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity is a placeholder for critical tenant loads and should not be used without design data."
},
{
"inputKey": "serves_critical_community_facility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A grocery store may provide community value, but the profile does not establish a designated critical facility role."
},
{
"inputKey": "resilience_plan_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No resilience plan, critical-load schedule, or islanding design is supplied."
},
{
"inputKey": "utility_interconnection_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility study evidence is supplied."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No microgrid design-build quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not assume critical-facility grant eligibility.",
"Needs scope, engineering, interconnection, and landlord/property-owner participation.",
"Likely not a near-term tenant project."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage concept for refrigeration or HVAC load shifting is possible in theory but not established for this small grocery tenant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses existing preview cost as a placeholder, likely high for a tenant-controlled grocery project."
},
{
"inputKey": "storage_capacity_ton_hours",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning placeholder only; no refrigeration rack or HVAC load profile is supplied."
},
{
"inputKey": "target_load_type",
"value": "refrigeration_or_hvac_load_shift",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site has refrigeration-heavy use, but the actual load-shift strategy is not defined."
},
{
"inputKey": "time_of_use_rate_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Time-of-use periods are listed as available fields but not populated."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No thermal storage quote or load model is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Requires load profile, rate schedule, controls design, and vendor quote.",
"Should not calculate from generic preview cost alone.",
"May be less realistic than refrigeration controls or monitoring."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine is not realistic for this urban leased grocery tenant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses existing preview cost only as a suppressible fixture value."
},
{
"inputKey": "wind_turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No site control, wind resource, tower location, or zoning information is available."
},
{
"inputKey": "zoning_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No zoning or permit approval is supplied."
},
{
"inputKey": "site_control_for_turbine",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased suite in a shared building is not expected to control land or tower area for wind generation."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as unrealistic for this customer.",
"Do not calculate incentives without land control, wind resource, zoning, and quote data."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not a practical standalone retrofit grant case for a tenant grocery suite unless part of a larger remodel or landlord-led building certification.",
"inputFacts": [
{
"inputKey": "certification_level_target",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No remodel scope or certification target is supplied."
},
{
"inputKey": "certification_fees_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Certification and consultant costs require a proposal."
},
{
"inputKey": "major_renovation_scope_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploratory and no renovation scope is described."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unsupported in the preview and not a strong fit for this tenant profile.",
"Could become relevant only with a major tenant improvement or landlord-led certification project."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": null,
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Existing test-case facts already suppress this because the Illinois grocery tenant is not a Washington solar manufacturing taxpayer."
}
],
"reasoning": "Leave suppressed; the geography, business activity, and taxpayer classification do not match."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "renewable_property_tax_valuation_state",
"value": "IL",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The site is in Illinois, while the existing note says this Rhode Island workflow does not apply."
},
{
"inputKey": "ac_kw_capacity",
"value": null,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Do not add a capacity value for an out-of-state property-tax workflow."
}
],
"reasoning": "Keep suppressed as not relevant to an Illinois leased grocery tenant."
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
"reasoning": "Existing opportunity-specific inputs already mark the Michigan RERZ designation as false for this Illinois site."
}
],
"reasoning": "Leave suppressed; this is an Illinois project and should not be forced into a Michigan zone workflow."
},
{
"opportunityId": "RETROFI_MATCHED:ameren_illinois_commercial_lighting_or_standard_incentive",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "electric_distribution_utility_id",
"value": "UTIL_AMEREN_IL",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile identifies Ameren Illinois as the distribution utility candidate."
},
{
"inputKey": "customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a commercial grocery tenant."
},
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Partial LED project quantity from retrofit preview."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval evidence is supplied."
},
{
"inputKey": "contractor_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A real quote is needed for final incentive calculation."
}
],
"reasoning": "Lighting is a plausible fit for a commercial Ameren Illinois grocery account, but the estimate should remain quote/preapproval dependent."
},
{
"opportunityId": "RETROFI_MATCHED:ameren_illinois_commercial_hvac_or_standard_incentive",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "electric_distribution_utility_id",
"value": "UTIL_AMEREN_IL",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile identifies Ameren Illinois as the distribution utility candidate."
},
{
"inputKey": "hvac_unit_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Modeled as one tenant-serving unit replacement."
},
{
"inputKey": "proposed_efficiency_rating",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Equipment-specific efficiency is required to calculate many HVAC incentives."
},
{
"inputKey": "ahri_certificate_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No AHRI or equivalent equipment documentation is supplied."
},
{
"inputKey": "landlord_written_consent_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Tenant authority is not established."
}
],
"reasoning": "HVAC may be plausible but needs quote, efficiency, and leasehold-control confirmation."
},
{
"opportunityId": "RETROFI_MATCHED:illinois_community_solar_or_bill_credit_program",
"expectedHandling": "calculate_if_formula_ready",
"inputFacts": [
{
"inputKey": "annual_kwh",
"value": 285000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric usage is supplied."
},
{
"inputKey": "subscribed_annual_kwh",
"value": 120000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Subscription is sized below total annual use to reduce over-subscription risk."
},
{
"inputKey": "subscription_contract_signed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No contract evidence is supplied."
},
{
"inputKey": "low_income_or_ej_enhanced_category_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No basis is present to claim enhanced category treatment."
}
],
"reasoning": "Community solar is more realistic than tenant-owned PV, but the model should distinguish bill-credit economics from grant awards."
},
{
"opportunityId": "RETROFI_MATCHED:federal_or_state_solar_pv_grant_or_tax_credit_proxy",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "owns_solar_asset",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The tenant may not own or control an onsite PV asset."
},
{
"inputKey": "roof_rights_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Lease status makes roof rights uncertain."
},
{
"inputKey": "dc_kw_capacity",
"value": 50,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning placeholder only; no design exists."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Preview cost is available but not quote-backed."
},
{
"inputKey": "tax_appetite_or_direct_pay_status_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Commercial tax-credit monetization or transfer/direct-pay assumptions are not established."
}
],
"reasoning": "Do not calculate onsite PV incentives until ownership, roof rights, tax treatment, and project quote are known."
},
{
"opportunityId": "RETROFI_MATCHED:resilience_storage_or_microgrid_grant_proxy",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "serves_designated_critical_facility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No emergency-response, shelter, public safety, or designated critical-facility status is supplied."
},
{
"inputKey": "battery_energy_kwh",
"value": 160,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Standalone storage concept capacity is a planning input only."
},
{
"inputKey": "resilience_plan_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No documented resilience plan is present."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application status evidence is supplied."
}
],
"reasoning": "A grocery resilience narrative is plausible, but the record lacks evidence for competitive resilience-grant scoring or eligibility."
},
{
"opportunityId": "RETROFI_MATCHED:agricultural_or_rural_energy_grant_proxy",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is modeled as a grocery retailer, not a producer."
},
{
"inputKey": "rural_small_business_status_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is in Urbana, and no rural eligibility designation is supplied."
},
{
"inputKey": "project_is_farm_or_ag_production_related",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Retail grocery operations are not agricultural production."
}
],
"reasoning": "Do not force agricultural or rural-energy qualification based only on local-food retail activity."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "vendor_selected",
"reason": "needs user decision"
},
{
"inputKey": "preapproval_received",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_submitted",
"reason": "application not submitted"
},
{
"inputKey": "utility_account_number",
"reason": "needs user decision"
},
{
"inputKey": "electric_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "demand_charge_rate",
"reason": "needs user decision"
},
{
"inputKey": "monthly_peak_kw",
"reason": "needs user decision"
},
{
"inputKey": "annual_therms",
"reason": "needs user decision"
},
{
"inputKey": "existing_hvac_efficiency",
"reason": "quote not available"
},
{
"inputKey": "proposed_hvac_efficiency",
"reason": "quote not available"
},
{
"inputKey": "ahri_certificate_number",
"reason": "quote not available"
},
{
"inputKey": "roof_rights_confirmed",
"reason": "needs user decision"
},
{
"inputKey": "landlord_written_consent_document",
"reason": "needs user decision"
},
{
"inputKey": "interconnection_application_number",
"reason": "application not submitted"
},
{
"inputKey": "solar_shading_or_structural_assessment",
"reason": "quote not available"
},
{
"inputKey": "battery_fire_code_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "microgrid_resilience_plan",
"reason": "needs user decision"
},
{
"inputKey": "biomass_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "leed_certification_proposal",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The customer is a leased grocery tenant, so roof, structure, central HVAC, interconnection, and exterior equipment projects require landlord/property-owner consent.",
"Ameren Illinois is modeled as the delivery utility, but supplier-choice ambiguity should not be used to invent eligibility for non-Ameren territories or programs.",
"The business is commercial grocery retail, not a school, public entity, agricultural producer, tribal entity, residential customer, or Washington solar manufacturer.",
"Community solar is plausible because it does not require roof control, but it should be modeled as bill-credit economics rather than an owned-asset grant unless a specific grant formula supports it.",
"Onsite solar PV, solar thermal, storage, solar-plus-storage, and microgrid projects should remain needs-scope or needs-quote until roof rights, interconnection, landlord consent, and project design are confirmed.",
"Geothermal, biomass/biogas, CHP, thermal storage, small wind, and LEED certification are not realistic near-term tenant-led projects for this profile without a major landlord-led redevelopment or engineering study.",
"Do not make agricultural, rural, environmental-justice, low-income, critical-facility, nonprofit, or public-entity adders positive without explicit supporting evidence.",
"Do not calculate utility incentives that require preapproval when the project stage is exploring and no application has been submitted.",
"Existing out-of-state DSIRE opportunity-specific suppressions should remain suppressed and should not receive synthetic capacity or classification values to make them calculate."
]
}

