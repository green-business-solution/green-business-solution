{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "organic-valley-lafarge-hq",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for a rural Wisconsin agricultural cooperative headquarters in Vernon Electric Cooperative territory. Inputs intentionally keep gas service, ownership control, application status, and quote-specific costs uncertain so grant estimates can be calculated only where formulas and evidence support them. Based on the uploaded test-case prompt. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type",
"value": "agricultural_cooperative",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies the customer as a farmer-owned agricultural cooperative."
},
{
"inputKey": "primary_site_use",
"value": "headquarters_office_administration",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is described as a headquarters used for administration, producer support, brand management, meetings, and rural office operations."
},
{
"inputKey": "agricultural_producer_or_cooperative_applicant",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Agricultural cooperative status is already present in the tax facts and is realistic for this customer."
},
{
"inputKey": "public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A private agricultural cooperative headquarters should not be treated as a public agency, municipality, or state-owned facility."
},
{
"inputKey": "nonprofit_501c3",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is modeled as a taxable private cooperative, not a charitable nonprofit. This should suppress nonprofit-only grant assumptions unless user documentation later shows otherwise."
},
{
"inputKey": "school_or_higher_education_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The headquarters office is not a school, college, or education campus."
},
{
"inputKey": "tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, control, or tribal government status is indicated in the supplied profile."
},
{
"inputKey": "electric_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The energy profile includes annual electric usage and Vernon Electric Cooperative is self-reported as the electric provider."
},
{
"inputKey": "electric_utility_provider_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The normalized profile marks Vernon Electric Cooperative as self-reported and unverified."
},
{
"inputKey": "electric_customer_class",
"value": "commercial_or_general_service",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A headquarters office with roughly 1.285 GWh annual usage would typically be served under a nonresidential commercial or general-service class, but the exact tariff should be collected from bills."
},
{
"inputKey": "gas_utility_customer",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly says gas is unknown, so gas service should not be assumed for gas HVAC, CHP, or thermal-equipment incentives."
},
{
"inputKey": "building_square_footage",
"value": 67500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 60,000-75,000 square foot headquarters is plausible for a rural cooperative administrative site with 1.285 GWh annual electric use, but assessor or facility records should confirm it."
},
{
"inputKey": "ownership_or_site_control",
"value": "unknown_site_control_needs_confirmation",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ownership status is listed as not sure. Owner authorization should remain a gating input for capital projects and property-related incentives."
},
{
"inputKey": "has_long_term_facility_control",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Long-term control is important for grant and tax-credit eligibility but is not established by the current test case."
},
{
"inputKey": "annual_kwh",
"value": 1285000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric usage is already included in the supplied site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 15480000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric cost is already included as $154,800 and converted to cents."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 12.05,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Average electric cost is supplied as $0.1205 per kWh and represented as cents per kWh."
},
{
"inputKey": "federal_direct_pay_likely_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is modeled as a taxable private cooperative, not a tax-exempt public or nonprofit entity. Grant logic should not assume elective-pay treatment unless ownership or tax facts change."
},
{
"inputKey": "taxable_entity_can_use_tax_credits",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tax facts indicate a Wisconsin state income or franchise tax filer and taxable private cooperative property status."
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
"value": "no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An exploring-stage project would commonly not yet have a selected vendor or final quote."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application, preapproval, award letter, or reservation is included. Application-status-dependent grants should remain suppressed."
},
{
"inputKey": "utility_rebate_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval document is supplied, so prescriptive or custom utility incentive estimates should not assume preapproval."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace remaining interior fluorescent and high-bay office/support-area fixtures with LED fixtures and controls in a headquarters office. Scope is plausible for a partial upgrade rather than a whole-campus relight.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 86,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial retrofit of 86 fixtures is realistic for a headquarters office where some LEDs may already exist."
},
{
"inputKey": "controlled_fixture_count",
"value": 42,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy or daylight controls are plausible in conference rooms, open office areas, restrooms, and support spaces."
},
{
"inputKey": "annual_lighting_kwh_savings",
"value": 64200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Represents about 5 percent of annual site electric use, a conservative value for a partial LED and controls project."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9446000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $1,100 per fixture on average including controls, lifts, labor, disposal, and project management for a rural commercial office."
},
{
"inputKey": "final_vendor_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A real prescriptive or custom incentive should use a dated vendor quote and fixture schedule."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility-specific rebate availability must be verified for Vernon Electric Cooperative or any wholesale program administrator.",
"Custom incentives may require preapproval and existing-fixture documentation before installation.",
"Final incentive amount should depend on fixture schedule, wattage reduction, and approved eligible cost."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop or split-system cooling equipment serving office areas with high-efficiency electric heat-pump-capable units where practical. Do not assume gas displacement because gas service is unknown.",
"inputFacts": [
{
"inputKey": "hvac_unit_count",
"value": 7,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Seven packaged units is plausible for a mid-sized administrative building with multiple zones."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 105,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "About 15 tons per unit is a conservative synthetic assumption for office HVAC zones."
},
{
"inputKey": "equipment_type",
"value": "high_efficiency_electric_rooftop_or_split_heat_pump_units",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Electric high-efficiency equipment is compatible with the known electric profile without inventing natural gas facts."
},
{
"inputKey": "annual_hvac_kwh_savings",
"value": 78200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Represents about 6 percent of annual electric use, reasonable for targeted HVAC efficiency upgrades."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 39150000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes about $3,700 per ton installed for commercial replacement equipment; final costs are highly quote-dependent."
},
{
"inputKey": "final_vendor_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "HVAC grant and rebate estimates should use final equipment schedules, AHRI ratings, labor costs, and controls scope."
},
{
"inputKey": "existing_heating_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case says gas is unknown. Existing heating fuel should remain unknown until bills or mechanical schedules are collected."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Electric cooperative rebate rules may require equipment efficiency ratings and preapproval.",
"Fuel-switching or gas-displacement incentives should be suppressed until existing heating fuel is confirmed.",
"Some grants may require load calculations or engineering review."
]
},
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "Engineering-led retro-commissioning study for a large rural headquarters covering HVAC scheduling, economizer operation, ventilation controls, lighting controls, and building automation tuning.",
"inputFacts": [
{
"inputKey": "audit_or_study_cost_cents",
"value": 6800000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $1.00 per square foot for engineering investigation, trend review, site visits, and report development."
},
{
"inputKey": "implementation_budget_cents",
"value": 15200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small controls, balancing, sensor, and scheduling measures commonly exceed the study cost but remain below major capital replacement levels."
},
{
"inputKey": "annual_kwh_savings",
"value": 96375,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes 7.5 percent electric savings from operational improvements, conservative for a building with controls opportunities."
},
{
"inputKey": "requires_preapproval",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Custom study and implementation incentives usually require utility or program approval before work begins."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No approval or reservation document is present in the test case."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Study incentives should remain application-status dependent.",
"Implementation incentives should depend on measured or approved kWh savings.",
"Owner authorization is needed before building-automation changes are committed."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery for peak demand management and limited resilience for administrative operations, paired with future or existing solar only if separately confirmed.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 250 kW system is plausible for a site with over 1.2 GWh annual electric use and potential demand charges."
},
{
"inputKey": "battery_energy_kwh",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A four-hour 250 kW battery is a common commercial storage configuration."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 76000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $760 per kWh installed including controls, interconnection, engineering, and contingency. Final pricing is highly quote-dependent."
},
{
"inputKey": "resilience_critical_load_kw",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical load for servers, communications, meeting spaces, refrigeration controls, and essential office functions is plausible but needs engineering validation."
},
{
"inputKey": "paired_with_new_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The provided retrofit list does not include a main solar PV retrofit summary for this profile, so storage should not automatically be modeled as paired with new solar."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection request is present; storage incentives and project feasibility should remain conditional."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many storage grants are resilience-, solar-pairing-, disadvantaged-community-, or public-sector-focused and may not fit a private headquarters office.",
"Demand-charge economics require interval data and tariff confirmation.",
"Interconnection and fire-code review are gating items."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Conceptual microgrid using battery storage, controls, and optional generation to support headquarters continuity during rural outage events.",
"inputFacts": [
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A real microgrid would require controls beyond standalone battery storage."
},
{
"inputKey": "critical_load_kw",
"value": 180,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A moderate critical load is plausible for administrative continuity but should be confirmed by a resilience study."
},
{
"inputKey": "target_backup_duration_hours",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Eight hours is a planning assumption for business-continuity support, not a confirmed operational requirement."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 145000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Microgrid costs depend heavily on switchgear, controls, generation assets, interconnection, and engineering scope."
},
{
"inputKey": "resilience_grant_need_statement_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No outage-history, critical-service, emergency-management, or community-resilience documentation is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Private headquarters resilience projects are often less competitive than public safety, healthcare, water, or community shelter projects.",
"Should not force a positive grant estimate without documented critical-service role and application evidence.",
"Project requires detailed engineering and utility interconnection review."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Early feasibility concept for ground-source heat pumps serving part of the office building, subject to land availability, borefield design, and confirmation of existing heating system.",
"inputFacts": [
{
"inputKey": "served_floor_area_sqft",
"value": 28000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Partial-building geothermal is more plausible than a full conversion at the exploring stage."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 85,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The assumed capacity is sized for a partial administrative load, but a real design would require load calculations."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 170000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ground-source systems are capital-intensive and depend on drilling conditions, distribution modifications, and controls."
},
{
"inputKey": "land_or_borefield_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Rural site context suggests possible land availability, but borefield area, easements, geology, and site control are unconfirmed."
},
{
"inputKey": "existing_heating_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas service and existing heating fuel are unknown, so fossil-fuel displacement benefits should not be assumed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility may exist for geothermal or efficient electrification programs, but estimate quality is low without a feasibility study.",
"Tax-credit treatment depends on ownership, tax appetite, placed-in-service date, and qualified-cost rules.",
"Utility incentives may require preapproval and site-specific engineering."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal domestic hot water system for office kitchen, restrooms, and meeting-event loads only.",
"inputFacts": [
{
"inputKey": "collector_area_sqft",
"value": 320,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest collector field could serve office domestic hot water, but this is not a dairy-processing hot-water load."
},
{
"inputKey": "storage_tank_gallons",
"value": 500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 500-gallon tank is plausible for a small commercial solar thermal application."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 8400000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Installed costs for commercial solar thermal vary widely and require a quote."
},
{
"inputKey": "existing_water_heating_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas service is unknown and water-heating equipment is not described."
},
{
"inputKey": "domestic_hot_water_load_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An office headquarters may have limited hot-water load; the project should not be treated as a strong grant candidate without load data."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A headquarters office may not have enough thermal load for a cost-effective or grant-prioritized solar water-heating project.",
"Fuel type and water-heating baseline are unknown.",
"Quote and load study should be required before estimating."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Do not model a headquarters biogas project unless tied to a separate farm, manure, wastewater, or food-processing waste stream. The office headquarters itself lacks a realistic feedstock basis.",
"inputFacts": [
{
"inputKey": "onsite_biomass_or_biogas_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is modeled as an administrative headquarters, not a farm, digester site, wastewater plant, or manufacturing facility with process waste."
},
{
"inputKey": "annual_feedstock_tons",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No headquarters feedstock should be inferred from the cooperative's broader agricultural network."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No realistic headquarters biogas project scope is defined."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Agricultural cooperative status alone is not enough; feedstock, host site, permits, and energy offtake must be documented.",
"Suppress headquarters-site biomass or biogas grant estimates unless a separate qualifying agricultural project site is added."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not a strong fit for an administrative headquarters because continuous thermal load and gas supply are unconfirmed.",
"inputFacts": [
{
"inputKey": "continuous_thermal_load_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Office buildings typically have less stable year-round thermal loads than manufacturing, healthcare, or campus central plants."
},
{
"inputKey": "natural_gas_service_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas utility provider is unknown and should not be assumed."
},
{
"inputKey": "chp_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No CHP size should be set without thermal-load and fuel-service confirmation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "CHP should remain unscoped for this headquarters profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress CHP estimates until natural gas or renewable-fuel supply and year-round useful thermal load are documented.",
"Administrative office use is not a typical best-fit CHP host."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Exploratory small wind concept for rural headquarters, not yet supported by wind resource, zoning, interconnection, or site-control evidence.",
"inputFacts": [
{
"inputKey": "wind_turbine_capacity_kw",
"value": 100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 100 kW turbine is a plausible small commercial wind concept for a rural site, but not justified without wind and zoning review."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 65000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small wind installed cost is highly site-specific and should be quote-driven."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study, tower height, setback, or resource assessment is included."
},
{
"inputKey": "local_zoning_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small wind generally requires local zoning, setback, and permitting review."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility interconnection filing is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Rural location alone is insufficient to estimate small-wind incentives.",
"Wind resource, zoning, tower feasibility, and interconnection evidence should be required.",
"Do not force qualification unless project evidence is added."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage is not a natural fit for a headquarters office unless a central chilled-water system or thermal load-shifting opportunity is documented.",
"inputFacts": [
{
"inputKey": "central_chilled_water_system_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not identify a central plant or chilled-water loop."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Sizing should not be invented without central-plant and tariff data."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No credible thermal energy storage project scope exists for the current office-admin profile."
},
{
"inputKey": "time_of_use_or_demand_savings_case_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The available energy profile includes cost and kWh but does not confirm time-of-use periods or demand-response opportunity."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress thermal-storage estimates unless a central plant, tariff savings case, and engineering scope are provided.",
"Office-admin buildings without large cooling loads are not typical thermal-storage grant candidates."
]
}
],
"grantOpportunitySpecificInputs": [
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
"reasoning": "The project site is in Wisconsin, not Michigan, and no Michigan Renewable Energy Renaissance Zone designation is present."
}
],
"reasoning": "Keep this suppressed as an out-of-state, nonmatching program."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "municipality",
"value": "La Farge, WI",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The site municipality is in Wisconsin, not Rhode Island."
}
],
"reasoning": "Keep this suppressed because Rhode Island renewable property-tax treatment does not apply."
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
"reasoning": "The site is not in Washington and is not modeled as a solar manufacturer."
}
],
"reasoning": "Keep this suppressed as out-of-state and activity-ineligible."
},
{
"opportunityId": "WI_OR_UTILITY_CUSTOM_EFFICIENCY_REBATE_UNSPECIFIED",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "utility_provider",
"value": "Vernon Electric Cooperative",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The utility is self-reported but not independently verified."
},
{
"inputKey": "eligible_measure_types",
"value": [
"led_lighting_retrofit",
"high_efficiency_hvac_replacement",
"retro_commissioning_study"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic commercial efficiency measures for an office-admin site."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility incentive preapproval is included."
}
],
"reasoning": "The profile can support possible efficiency-incentive calculations only after tariff/program match, preapproval rules, and quote data are known."
},
{
"opportunityId": "USDA_RURAL_ENERGY_FOR_AMERICA_PROGRAM_REAP_GENERIC",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "rural_business_or_agricultural_producer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a rural agricultural cooperative headquarters, but exact applicant eligibility and project-owner structure should be confirmed."
},
{
"inputKey": "project_is_energy_efficiency_improvement",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Lighting, HVAC, and retro-commissioning measures are plausible energy-efficiency improvements."
},
{
"inputKey": "energy_audit_or_assessment_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit report is supplied; many rural energy grant applications require technical documentation."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Grant estimates should not use final eligible costs without vendor quotes."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is at exploring stage and no application is present."
}
],
"reasoning": "This is one of the more plausible grant families for a rural agricultural cooperative, but it should remain quote- and application-dependent."
},
{
"opportunityId": "FEDERAL_CLEAN_ELECTRICITY_OR_STORAGE_TAX_CREDIT_GENERIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "taxable_entity_can_use_tax_credits",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic tax facts indicate state tax filing and private taxable property status, but federal tax appetite is not established."
},
{
"inputKey": "new_qualified_energy_property_scope_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Battery, geothermal, and wind concepts lack final eligible-property scope, start-of-construction date, and placed-in-service assumptions."
},
{
"inputKey": "direct_pay_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is not modeled as a tax-exempt public or nonprofit entity."
}
],
"reasoning": "Potential tax-credit analysis may be relevant for storage, geothermal, or wind, but it is not a grant estimate and should not be forced into grant totals."
},
{
"opportunityId": "PUBLIC_SECTOR_RESILIENCE_OR_MICROGRID_GRANT_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is modeled as a private agricultural cooperative headquarters."
},
{
"inputKey": "critical_public_facility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site supports cooperative administration but is not documented as emergency services, public safety, healthcare, water, or shelter infrastructure."
}
],
"reasoning": "Do not create a positive microgrid or resilience grant estimate without public-purpose or critical-facility evidence."
},
{
"opportunityId": "AGRICULTURAL_DIGESTER_OR_BIOGAS_GRANT_GENERIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "host_site_has_manure_or_organic_waste_feedstock",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled site is an office headquarters, not a farm, dairy processing plant, or waste-processing facility."
},
{
"inputKey": "digester_project_site_same_as_customer_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No separate qualifying project site is included."
}
],
"reasoning": "Agricultural cooperative identity should not be used to infer an onsite digester feedstock or biogas grant eligibility at the headquarters."
},
{
"opportunityId": "SMALL_WIND_RURAL_BUSINESS_GRANT_GENERIC",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind-resource, zoning, or tower feasibility evidence is present."
},
{
"inputKey": "zoning_or_permit_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No local approval document is present."
}
],
"reasoning": "The rural setting makes wind conceivable, but there is not enough project evidence to estimate a grant."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "gas_utility_provider",
"reason": "needs user decision"
},
{
"inputKey": "existing_heating_fuel",
"reason": "needs user decision"
},
{
"inputKey": "final_vendor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "utility_rebate_preapproval_letter",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_submitted_date",
"reason": "application not submitted"
},
{
"inputKey": "grant_award_or_reservation_amount_cents",
"reason": "application not submitted"
},
{
"inputKey": "owner_authorization_document",
"reason": "needs user decision"
},
{
"inputKey": "long_term_site_control_document",
"reason": "needs user decision"
},
{
"inputKey": "engineering_energy_audit_report",
"reason": "quote not available"
},
{
"inputKey": "geothermal_borefield_feasibility_study",
"reason": "quote not available"
},
{
"inputKey": "battery_interconnection_approval",
"reason": "application not submitted"
},
{
"inputKey": "microgrid_critical_facility_designation",
"reason": "source requires agency approval"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "quote not available"
},
{
"inputKey": "small_wind_zoning_approval",
"reason": "application not submitted"
},
{
"inputKey": "biogas_feedstock_supply_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "chp_thermal_load_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "thermal_energy_storage_central_plant_design",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The building is an office/admin headquarters, so agricultural-facility programs should not automatically qualify unless the project occurs at a farm, processing, feedstock, or production site.",
"Gas service is unknown and should not be inferred for CHP, gas equipment replacement, or fossil-fuel displacement calculations.",
"Ownership status is not sure, so capital-project incentives requiring owner authorization or long-term site control should remain conditional.",
"The customer is modeled as a private taxable cooperative, not a public entity, school, municipality, tribal government, or 501(c)(3) nonprofit.",
"The project is at exploring stage with no vendor selected, no final quote, no preapproval, and no submitted grant application.",
"Rural electric cooperative service may enable some efficiency opportunities, but utility-specific rebate rules and customer class are not verified.",
"Biomass, biogas, CHP, small wind, microgrid, and thermal storage should not be given positive grant estimates without project-specific feasibility evidence.",
"Out-of-state DSIRE opportunities already present in the test case should remain suppressed rather than being made to fit the Wisconsin site."
]
}

