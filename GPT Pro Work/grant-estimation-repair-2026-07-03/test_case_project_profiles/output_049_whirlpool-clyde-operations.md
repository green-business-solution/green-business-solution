{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "whirlpool-clyde-operations",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for an owner-occupied Ohio industrial manufacturing site served by municipal Clyde Light & Power for electric service and Columbia Gas of Ohio for gas service, using supplied test-case facts and realistic planning assumptions. Utility, tax, retrofit, and blocker context are from the uploaded prompt. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "industrial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large appliance manufacturing plant with very high annual kWh usage should be modeled as an industrial customer rather than commercial or residential."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Whirlpool Corporation is modeled as a private industrial corporation, not a city, county, school, state agency, or other public entity."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a private manufacturing corporation; nonprofit-only grants should not qualify."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an appliance manufacturing plant, not a school, college, or education campus."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility manufactures appliances and should not be modeled as an agricultural producer or rural small business farm operation."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No facts indicate tribal ownership or tribal government status."
},
{
"inputKey": "is_federal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is not a federal agency or federally owned site."
},
{
"inputKey": "is_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Organization size is 1,000+ employees, so small-business-only incentives should generally be suppressed."
},
{
"inputKey": "is_disadvantaged_community_site",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not include census tract or place GEOID data; do not assume Justice40, low-income, energy community, or disadvantaged-community status."
},
{
"inputKey": "is_energy_community",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Energy-community status is location-specific and is not supplied by the test case."
},
{
"inputKey": "electric_utility_is_municipal",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly identifies Clyde Light & Power as the municipal electric provider."
},
{
"inputKey": "electric_utility_customer_of_investor_owned_utility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "This profile is intended to test a large industrial customer served by a municipal electric utility rather than surrounding IOUs."
},
{
"inputKey": "gas_utility_provider",
"value": "Columbia Gas of Ohio",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Gas provider is included in the supplied source form."
},
{
"inputKey": "ownership_status",
"value": "own",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Owner-occupied control supports capital project eligibility where incentives require site control."
},
{
"inputKey": "has_long_term_site_control",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile says the organization owns the industrial facility, so long-term control is a reasonable default."
},
{
"inputKey": "facility_square_footage",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied profile marks square footage as unknown and needing validation; do not invent a full-plant size."
},
{
"inputKey": "annual_kwh",
"value": 167400000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric usage is already provided in the site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 1277280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric cost is $12,772,800 in the supplied profile and is converted to cents."
},
{
"inputKey": "average_cost_per_kwh_dollars",
"value": 0.0763,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Average electricity cost is included in the site energy profile."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 758620000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is $7,586,200 in the supplied utility summaries and is converted to cents."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source project object lists the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_rfp_screening",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At exploring stage, a large industrial owner would commonly screen technical and incentive feasibility before issuing an RFP."
},
{
"inputKey": "has_vendor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile is exploratory and no quote documents are supplied, so quote-dependent grant estimates should remain suppressed."
},
{
"inputKey": "has_submitted_grant_application",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted application or award status is supplied; application-stage grants should not calculate as awarded or probable."
},
{
"inputKey": "has_received_agency_preapproval",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval notice is included; incentive programs that require preapproval should be held pending confirmation."
},
{
"inputKey": "can_accept_tax_credit_or_direct_pay",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Corporate tax appetite, transferability strategy, and direct-pay eligibility are not provided; do not assume monetization path."
},
{
"inputKey": "oh_sitused_gross_receipts_cents",
"value": 426000000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic tax fact is included and can support Ohio commercial activity tax context if a calculator uses it."
},
{
"inputKey": "annual_property_tax_cents",
"value": 259000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic property tax fact is included and may help screen property-tax-abatement opportunities."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Industrial decarbonization and energy-resilience feasibility study covering compressed air, process heat, battery storage, CHP, solar interconnection, controls, and utility tariff impacts.",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 18500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A multi-system industrial feasibility study for a large manufacturing plant can realistically cost about $185,000 before detailed engineering."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For planning-only opportunities, the full professional-services study cost is treated as potentially eligible until program rules say otherwise."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage record does not include a selected engineering firm."
},
{
"inputKey": "investment_grade_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The study is being scoped; no completed audit is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely eligible only for programs open to private industrial energy studies.",
"Should remain quote-dependent if a program requires a consultant proposal, scope of work, or agency preapproval.",
"Should not be treated as qualifying for school, public-sector, or nonprofit technical-assistance programs."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Targeted LED retrofit for high-bay production, warehouse, maintenance, and loading areas; modeled as a real industrial project rather than the small 12-fixture admin preview.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 4200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A very large appliance plant would plausibly have thousands of high-bay and task fixtures; 4,200 fixtures is conservative for a partial facility-wide retrofit."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 315000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes blended installed cost of roughly $750 per fixture including high-bay fixtures, controls, lift work, commissioning, and contingency."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Industrial LED projects commonly include occupancy/daylight controls in warehouses, aisles, and support spaces."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 5900000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Modeled as about 3.5% of annual facility kWh, reasonable for a large manufacturing plant where process loads dominate."
},
{
"inputKey": "utility_preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Many prescriptive or custom efficiency programs require preapproval before purchase or installation."
},
{
"inputKey": "utility_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval documentation is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Municipal electric service may exclude this site from surrounding IOU electric efficiency rebates.",
"A grant calculator should not force a positive estimate unless a Clyde Light & Power or Ohio industrial program is actually matched.",
"A quote, fixture schedule, baseline wattage, and preapproval status should be required for custom incentive estimates."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery energy storage for peak shaving, ride-through resilience, and production-line power quality support.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 3000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 3 MW system is plausible for a large industrial customer but still modest relative to annual kWh consumption."
},
{
"inputKey": "battery_capacity_kwh",
"value": 12000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four-hour 3 MW battery is a common planning configuration for peak-shaving and resilience screening."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 780000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes about $650 per kWh installed including PCS, controls, fire protection, interconnection, engineering, and contingency."
},
{
"inputKey": "critical_loads_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not identify which production, safety, or IT loads would be served during an outage."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No municipal utility interconnection study or application is supplied."
},
{
"inputKey": "paired_with_new_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The battery is modeled as a standalone resilience and demand-management measure unless the user later pairs it with PV."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for some resilience, storage, or tax-credit style programs, but many grants require public benefit, community resilience, or disadvantaged-community criteria not established here.",
"Should need quote and interconnection data before calculating project-specific amounts.",
"Demand-charge economics are uncertain because municipal utility tariff details are not supplied."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Conservative rooftop or on-site solar PV screening project sized to offset a small share of plant electric load.",
"inputFacts": [
{
"inputKey": "solar_dc_kw",
"value": 2500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2.5 MW DC system would offset only a small portion of the 167.4 million kWh annual load, making it realistic for a large industrial site without needing full roof-area certainty."
},
{
"inputKey": "solar_ac_kw",
"value": 2000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes an 80% AC-to-DC ratio for preliminary planning."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 425000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $1.70 per DC watt installed for commercial/industrial PV with engineering, electrical work, roof coordination, and contingency."
},
{
"inputKey": "annual_kwh_generation_estimate",
"value": 3150000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses a conservative Ohio production estimate of about 1,260 kWh per DC kW-year."
},
{
"inputKey": "roof_structural_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No roof age, membrane, structural capacity, or shading data is provided."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection filing with Clyde Light & Power is provided."
},
{
"inputKey": "domestic_content_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Domestic-content status depends on procurement and should not be assumed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Tax-credit-style estimates may be plausible, but grant estimates should need ownership, tax strategy, interconnection, and equipment procurement facts.",
"Do not assume energy-community, low-income, or domestic-content adders.",
"Municipal utility service may affect net metering, export compensation, or local incentive eligibility."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Natural-gas-fired CHP concept serving process, hot-water, and facility thermal loads with on-site electric generation.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 5000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 5 MW CHP concept is plausible for a large appliance plant with high electric and gas spend, but should be refined through a feasibility study."
},
{
"inputKey": "chp_thermal_recovery_mmbtu_per_hr",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Thermal recovery sized to a subset of likely plant process and building heat loads, not the entire facility."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1125000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $2,250 per kW installed including generator package, heat recovery, gas service, controls, emissions equipment, engineering, and contingency."
},
{
"inputKey": "annual_operating_hours",
"value": 6500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large manufacturing facility may have extended operating hours, but not necessarily 24/7 full-load CHP operation."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Thermal load shape and useful heat recovery need engineering verification."
},
{
"inputKey": "air_permit_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No air permitting facts are supplied; CHP should not be treated as shovel-ready."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Natural-gas CHP may be excluded from many clean-energy grants or may need emissions and efficiency thresholds.",
"Could be relevant to resilience or industrial-efficiency programs, but only after feasibility, emissions, interconnection, and thermal-load validation.",
"Do not force qualification under renewable-energy programs."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Packaged rooftop and make-up-air HVAC replacement for offices, break rooms, support spaces, and limited production support areas rather than process equipment.",
"inputFacts": [
{
"inputKey": "hvac_unit_count",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large manufacturing plants often have many packaged or split HVAC units serving support spaces; 18 units is a targeted replacement scope."
},
{
"inputKey": "total_cooling_tons",
"value": 360,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes an average of 20 tons per unit across large rooftop and make-up-air equipment."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 288000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $8,000 per ton installed for industrial support-space HVAC replacement including controls, curb work, cranes, and contingency."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 720000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Savings are small relative to total plant usage because process and production loads dominate."
},
{
"inputKey": "baseline_equipment_efficiency_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No existing unit schedules, ages, efficiencies, or capacities are supplied."
},
{
"inputKey": "replacement_is_like_for_like",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes targeted replacements of existing HVAC units, not a major building redesign."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Industrial HVAC support-space replacements may qualify for custom efficiency incentives only if the utility or state program covers municipal electric customers.",
"Should need equipment schedules, AHRI data, baseline efficiency, and quotes.",
"Do not qualify under residential HVAC programs."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Geothermal heat pump concept limited to office and support areas, not whole-plant process heating or large production spaces.",
"inputFacts": [
{
"inputKey": "geothermal_capacity_tons",
"value": 160,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 160-ton support-space geothermal project is possible but uncertain without site layout, drilling feasibility, and building load data."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 384000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $24,000 per ton installed for a complex industrial campus retrofit with loop field, mechanical conversion, controls, and contingency."
},
{
"inputKey": "loop_field_type",
"value": "vertical_closed_loop",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Vertical closed loop is a common screening assumption when land availability is uncertain."
},
{
"inputKey": "geotechnical_test_bores_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No subsurface or test-bore information is supplied."
},
{
"inputKey": "building_load_model_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No building load model exists in the profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Large industrial site may not prioritize geothermal for production areas because process loads dominate.",
"Could become eligible for certain clean-heating or tax-credit opportunities, but estimate should remain suppressed without drilling feasibility and quote data.",
"Do not force qualification just because geothermal appears in the opportunity list."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal domestic and process preheat concept for locker rooms, sanitation, and limited manufacturing support loads.",
"inputFacts": [
{
"inputKey": "collector_area_sqft",
"value": 3200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest collector area could support hot-water preheat, but the facility's hot-water profile is unknown."
},
{
"inputKey": "storage_tank_gallons",
"value": 6000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large storage is plausible for industrial shift-based hot water but needs engineering validation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 192000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $600 per square foot installed for an industrial solar thermal retrofit with storage and integration."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 52000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Therm savings are uncertain because the profile supplies gas cost but not therm usage or hot-water end-use load."
},
{
"inputKey": "hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar thermal should require measured hot-water load or process preheat data."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Industrial solar thermal may be technically possible but is not obviously a normal priority without confirmed hot-water load.",
"Grant estimate should need scope, quote, roof/space suitability, and thermal load confirmation.",
"Do not treat as broadly eligible under solar PV programs."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Limited high-efficiency refrigeration upgrade for employee cafeteria, test-lab environmental equipment, and parts storage cooling, not a core cold-storage warehouse.",
"inputFacts": [
{
"inputKey": "refrigeration_unit_count",
"value": 14,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An appliance manufacturing plant may have limited refrigeration equipment, but refrigeration is not a primary facility load."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 6400000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small targeted scope for walk-in/cafeteria/test-lab equipment rather than a large industrial refrigeration plant."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 62000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are intentionally modest because refrigeration is not central to appliance manufacturing."
},
{
"inputKey": "existing_refrigeration_inventory_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No refrigeration equipment schedule is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not a strong fit for this customer unless a specific equipment inventory is provided.",
"Should not qualify for grocery, cold-storage, or food-service-specific incentives unless the program allows miscellaneous commercial refrigeration."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biogas energy screening option using renewable natural gas or third-party biogas supply rather than on-site agricultural or wastewater feedstock.",
"inputFacts": [
{
"inputKey": "onsite_biogas_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Appliance manufacturing does not normally generate significant organic feedstock for on-site biogas production."
},
{
"inputKey": "biogas_generator_kw",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 1 MW concept is possible only if renewable gas supply or third-party fuel contract exists, which is not established."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Without feedstock, fuel contract, generator configuration, and emissions controls, project cost should not be estimated."
},
{
"inputKey": "feedstock_supply_agreement_executed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No biogas or biomass feedstock agreement is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unrealistic as an on-site feedstock project for appliance manufacturing.",
"Do not force qualification for agricultural, wastewater, landfill-gas, or biomass programs.",
"Should remain suppressed unless the customer documents a real renewable fuel supply and eligible equipment scope."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine concept screened but not recommended due to uncertain land, zoning, wind resource, interconnection, and industrial-site constraints.",
"inputFacts": [
{
"inputKey": "wind_turbine_capacity_kw",
"value": 100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The existing admin preview implies a small wind concept; 100 kW is plausible but not necessarily useful for a 167.4 million kWh industrial load."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 65000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $6,500 per kW installed for a small commercial-scale wind turbine with foundation, electrical, and permitting."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind resource study is supplied."
},
{
"inputKey": "zoning_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No local permitting or zoning approval is supplied."
},
{
"inputKey": "setback_area_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No land-control or setback facts are included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Small wind is not a strong fit for a dense industrial manufacturing site unless wind resource and siting are proven.",
"Should not calculate without wind study, zoning, interconnection, and quote data.",
"Should not be forced into generic renewable grants if project scope is speculative."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not modeled as an active project because the site is an existing industrial manufacturing plant with no supplied new-construction or major-renovation scope.",
"inputFacts": [
{
"inputKey": "leed_project_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No LEED rating system, certification target, or renovation scope is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "LEED costs depend on consultant scope, registration, certification fees, commissioning, and design measures."
},
{
"inputKey": "new_construction_or_major_renovation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile describes ongoing plant operations, not a new building or major renovation."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"LEED certification is not a typical grant-eligible retrofit for this profile without a defined construction project.",
"Should remain unsupported or suppressed unless the user provides a real certification scope."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "OH_OR_MUNICIPAL_INDUSTRIAL_CUSTOM_EFFICIENCY",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "municipal_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Electric service is modeled through Clyde Light & Power."
},
{
"inputKey": "ioU_customer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "This test should suppress surrounding IOU-only incentives."
},
{
"inputKey": "custom_savings_calculation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Measure-level baseline and proposed energy model are not provided."
}
],
"reasoning": "Industrial efficiency projects may be relevant, but municipal electric service and missing preapproval/savings files should prevent automatic calculation."
},
{
"opportunityId": "FEDERAL_OR_STATE_INDUSTRIAL_DECARBONIZATION_GRANT",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "decarbonization_plan_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No formal decarbonization plan is included."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant application record is supplied."
},
{
"inputKey": "emissions_reduction_estimate_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No Scope 1 or Scope 2 emissions baseline or project emissions reduction model is supplied."
}
],
"reasoning": "A large industrial plant could be relevant for industrial decarbonization funding, but not enough facts exist to calculate a grant amount or probability."
},
{
"opportunityId": "FEDERAL_SOLAR_STORAGE_TAX_CREDIT_STYLE_INCENTIVE",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "solar_dc_kw",
"value": 2500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "PV scope is a realistic screening size for a large industrial site."
},
{
"inputKey": "battery_capacity_kwh",
"value": 12000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Battery size is paired as a plausible standalone or future solar-paired storage option."
},
{
"inputKey": "tax_credit_monetization_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Corporate tax strategy and transferability are not supplied."
},
{
"inputKey": "prevailing_wage_apprenticeship_plan_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Labor compliance status is project-specific and should not be assumed."
}
],
"reasoning": "Solar and storage inputs are plausible, but dollar estimates should depend on final eligible basis, ownership, labor compliance, domestic content, and tax strategy."
},
{
"opportunityId": "RESIDENTIAL_OR_MULTIFAMILY_ENERGY_REBATE_PROGRAMS",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "site_type",
"value": "industrial_manufacturing",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an industrial appliance manufacturing facility."
},
{
"inputKey": "residential_customer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is nonresidential."
}
],
"reasoning": "The uploaded blocker list already shows many residential and multifamily mismatches; these should remain suppressed."
},
{
"opportunityId": "PUBLIC_SECTOR_NONPROFIT_SCHOOL_GRANTS",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a private industrial corporation."
},
{
"inputKey": "nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No nonprofit status applies."
},
{
"inputKey": "school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is not an education campus."
}
],
"reasoning": "Do not make this private manufacturing site qualify for public, nonprofit, or school-only grants."
},
{
"opportunityId": "AGRICULTURAL_RURAL_ENERGY_PROGRAMS",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Appliance manufacturing is not agricultural production."
},
{
"inputKey": "small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Organization size is 1,000+ employees."
}
],
"reasoning": "Rural or agricultural incentives should not be forced unless a program explicitly allows large private industrial manufacturers and the location qualifies."
},
{
"opportunityId": "ENERGY_COMMUNITY_OR_DISADVANTAGED_COMMUNITY_BONUS",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "census_tract_geoid",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No census tract is provided."
},
{
"inputKey": "energy_community_status",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Location-specific status is not included in the test case."
},
{
"inputKey": "disadvantaged_community_status",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Do not infer disadvantaged-community status from city or ZIP alone."
}
],
"reasoning": "Bonus adders or set-asides should remain suppressed until geocoding and program-specific status checks are available."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "facility_square_footage",
"reason": "needs user decision"
},
{
"inputKey": "census_tract_geoid",
"reason": "source requires agency approval"
},
{
"inputKey": "place_geoid",
"reason": "source requires agency approval"
},
{
"inputKey": "county_fips",
"reason": "source requires agency approval"
},
{
"inputKey": "energy_community_status",
"reason": "source requires agency approval"
},
{
"inputKey": "disadvantaged_community_status",
"reason": "source requires agency approval"
},
{
"inputKey": "vendor_quote_total_cents",
"reason": "quote not available"
},
{
"inputKey": "equipment_cut_sheets",
"reason": "quote not available"
},
{
"inputKey": "baseline_equipment_inventory",
"reason": "needs user decision"
},
{
"inputKey": "measure_level_m_and_v_plan",
"reason": "needs user decision"
},
{
"inputKey": "utility_preapproval_letter",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_number",
"reason": "application not submitted"
},
{
"inputKey": "agency_award_notice",
"reason": "application not submitted"
},
{
"inputKey": "solar_roof_structural_report",
"reason": "quote not available"
},
{
"inputKey": "battery_interconnection_study",
"reason": "application not submitted"
},
{
"inputKey": "chp_air_permit",
"reason": "application not submitted"
},
{
"inputKey": "biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "leed_registration_id",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The customer is a private, large industrial manufacturing facility, so residential, multifamily, nonprofit, school, public-sector, tribal, agricultural-producer, and small-business-only programs should generally be suppressed.",
"The electric utility is municipal Clyde Light & Power, not a surrounding investor-owned utility; do not assume eligibility for IOU-only electric efficiency rebates.",
"The project stage is exploring and no vendor quotes, preapproval letters, submitted applications, or award notices are supplied.",
"Square footage, census tract, energy-community status, disadvantaged-community status, and local program eligibility are unknown and should not be invented.",
"Biogas, small wind, LEED certification, whole-plant geothermal, and solar thermal are speculative for this profile unless the user provides specific site, quote, and engineering data.",
"CHP may be a plausible industrial concept, but natural-gas CHP should not be forced into renewable or clean-energy grant qualification without program-specific eligibility, emissions, and thermal-load evidence.",
"Solar PV and battery storage are realistic screening projects, but grant or credit estimates should require final eligible basis, interconnection status, ownership/tax strategy, and any labor or domestic-content compliance facts."
]
}
