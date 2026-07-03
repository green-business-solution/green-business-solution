{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "qts-richmond-data-center",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment for the supplied QTS Richmond Data Center test case. The site is treated as a large, owner-controlled, for-profit commercial data center in Dominion Energy Virginia territory with very high electric load and unconfirmed gas service. Context source: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type",
"value": "commercial_business",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form identifies the organization type as Commercial Business."
},
{
"inputKey": "is_for_profit_business",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A commercial colocation data center operator should be treated as for-profit unless the applicant provides contrary evidence."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Nothing in the test case suggests nonprofit status; nonprofit-only grants should be suppressed."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a private commercial data center, not a municipal, state, federal, or public authority applicant."
},
{
"inputKey": "is_school_or_university",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility use is data center colocation and cloud infrastructure, not education."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The NAICS and site description are data center operations; agricultural producer programs should not be forced to qualify."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied facts do not identify tribal ownership or tribal government status."
},
{
"inputKey": "site_county",
"value": "Henrico County",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description identifies the campus as a Henrico County data center campus."
},
{
"inputKey": "county_fips",
"value": "51087",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Henrico County, Virginia is represented with county FIPS 51087; geocoding should still confirm the exact tract."
},
{
"inputKey": "electric_distribution_utility_id",
"value": "UTIL_DOMINION_VA",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile already maps the self-reported electric utility to Dominion Energy Virginia."
},
{
"inputKey": "electric_utility_customer_class",
"value": "large_commercial_or_industrial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The annual load is far above ordinary commercial scale, so large commercial or industrial treatment is more realistic than small business treatment."
},
{
"inputKey": "annual_kwh",
"value": 1855000000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile gives annual electricity use of 1,855,000,000 kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 14512500000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied annual electric cost is $145,125,000, converted to cents."
},
{
"inputKey": "average_cost_per_kwh",
"value": 0.0782,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility profile includes an average electric cost of $0.0782/kWh."
},
{
"inputKey": "estimated_peak_kw",
"value": 246000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 246 MW peak is a realistic synthetic estimate for a 1.855 billion kWh/year data center campus at roughly 86% load factor."
},
{
"inputKey": "estimated_electric_load_factor",
"value": 0.86,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large data centers commonly operate with high, steady utilization; the value should be replaced with interval data if available."
},
{
"inputKey": "estimated_pue",
"value": 1.35,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "PUE is not supplied; 1.35 is a conservative synthetic planning value for a large existing data center campus."
},
{
"inputKey": "gross_building_square_footage",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form explicitly lists square footage as unknown, so building-size formulas should not rely on a fabricated area."
},
{
"inputKey": "data_hall_white_space_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "White-space area is important for cooling and lighting normalization but is not supplied."
},
{
"inputKey": "gas_utility_provider",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The current test case intentionally leaves gas service unknown."
},
{
"inputKey": "has_confirmed_natural_gas_service",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "CHP, fuel-switching, boiler, and biogas assumptions should remain suppressed until gas service is confirmed."
},
{
"inputKey": "ownership_relationship",
"value": "owner",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile states that the ownership relationship is owner."
},
{
"inputKey": "applicant_controls_project_site",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "As site owner, the applicant should generally control base-building and central plant projects, subject to outage coordination."
},
{
"inputKey": "tenant_or_colocation_customer_coordination_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Data center work that affects cooling, electrical systems, or customer suites usually requires outage-window and service-level coordination."
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
"value": "pre_budget_screening",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote, RFP, or awarded contractor information is present, so the record should behave like early budgeting."
},
{
"inputKey": "has_measure_specific_contractor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No project quote is supplied; quote-dependent grants should be suppressed or marked needs_quote."
},
{
"inputKey": "utility_preapproval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring and no preapproval or reservation number is supplied."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No evidence of an application submission is included."
},
{
"inputKey": "state_program_match_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site tax profile lists this field as available but no approval or match status is supplied."
},
{
"inputKey": "annual_property_tax_cents",
"value": 3764000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing synthetic tax facts provide annual property tax."
},
{
"inputKey": "data_center_equipment_purchase_review_cents",
"value": 21400000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing synthetic tax facts provide data center equipment purchases under review."
},
{
"inputKey": "disadvantaged_community_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tract-level designation is supplied; environmental justice, low-income, or disadvantaged-community adders should not be assumed."
},
{
"inputKey": "prevailing_wage_apprenticeship_commitment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large clean-energy tax credit calculations often depend on labor compliance, but no commitment is supplied."
},
{
"inputKey": "domestic_content_bonus_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar, storage, and microgrid bonus calculations should not assume domestic content."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "Campus retro-commissioning study and implementation package focused on cooling plant controls, CRAH/CRAC sequencing, temperature/humidity setpoints, pump VFD optimization, economizer controls, and UPS/electrical room ventilation scheduling.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 42500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $425,000 RCx study and implementation package is plausible for a large multi-building data center campus."
},
{
"inputKey": "study_cost_cents",
"value": 17500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Separates engineering investigation from controls implementation for study-based incentives."
},
{
"inputKey": "implementation_cost_cents",
"value": 25000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controls changes, trend setup, TAB support, and commissioning labor are realistic non-capital implementation costs."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 27825000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses a conservative 1.5% savings assumption against annual electricity use."
},
{
"inputKey": "estimated_peak_kw_reduction",
"value": 4200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "RCx can reduce coincident cooling demand, but interval data is required for a reliable estimate."
},
{
"inputKey": "utility_preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Custom utility incentive programs commonly require application before implementation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Needs utility preapproval before implementation.",
"Needs M&V baseline, trend data, and final study report.",
"Savings should be suppressed if the site has already completed these measures."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Phased replacement of selected aging data hall cooling equipment, including high-efficiency chillers, CRAH fan retrofits, pump VFD upgrades, and controls integration for N+1 redundancy.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1875000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large data center cooling equipment costs are highly site-specific and should be quote-based."
},
{
"inputKey": "cooling_capacity_tons_affected",
"value": 9000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 9,000-ton affected scope is plausible for a partial campus cooling-plant project, not the entire facility."
},
{
"inputKey": "chiller_units_replaced",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Represents a phased replacement, not a full campus rebuild."
},
{
"inputKey": "crah_or_crac_units_affected",
"value": 48,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large data halls often have many air handlers; exact inventory is required."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 39500000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic savings equal roughly 2.1% of annual electricity use and should be replaced with engineering analysis."
},
{
"inputKey": "estimated_peak_kw_reduction",
"value": 7200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cooling peak reduction is plausible but depends on load shape, redundancy, and sequencing."
},
{
"inputKey": "baseline_equipment_efficiency_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment schedule, age, or baseline efficiency is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Should be treated as custom efficiency, not prescriptive HVAC.",
"Needs equipment schedule, baseline efficiency, final quote, and preapproval.",
"Data center redundancy may limit eligible savings if backup capacity is not normally operating."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Chilled-water or phase-change thermal energy storage used to shift data center cooling load away from system peak periods while maintaining uptime requirements.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1620000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal storage cost depends on tank configuration, site civil work, controls, and chiller integration."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 48000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large but partial-campus storage size is realistic for a high-load data center campus."
},
{
"inputKey": "estimated_peak_kw_shift",
"value": 12000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Peak-shift value is plausible but requires interval billing and dispatch modeling."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 3000000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal storage primarily shifts demand; modest energy savings are possible from more efficient chiller operation."
},
{
"inputKey": "dispatch_strategy",
"value": "peak_demand_management_and_resilience_support",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This is a realistic use case for a large data center with high demand charges and uptime needs."
},
{
"inputKey": "interconnection_or_utility_dispatch_approval_needed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Demand-response or grid-services treatment depends on utility approval and program enrollment."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"More likely to fit custom demand-management or resilience incentives than standard prescriptive rebates.",
"Needs quote, controls sequence, interval demand data, and utility acceptance.",
"Energy savings should not be overstated because the main value is peak shifting."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter lithium-ion battery energy storage system for peak shaving, UPS coordination, and resilience, designed separately from existing emergency diesel generators.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 6400000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large BESS requires vendor quote, EPC scope, interconnection study, and fire-protection design."
},
{
"inputKey": "battery_power_kw",
"value": 25000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "25 MW is large but still only a fraction of the estimated campus peak."
},
{
"inputKey": "battery_capacity_kwh",
"value": 100000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A four-hour 100 MWh system is realistic for grid support but not a full data center backup replacement."
},
{
"inputKey": "estimated_peak_kw_reduction",
"value": 18000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Peak shaving depends on controls, tariff, and operational constraints."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Battery storage shifts energy and can add losses; it should not be modeled as energy efficiency without dispatch data."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection status is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A for-profit private data center should not be presumed eligible for public resilience grants.",
"May be eligible for tax credits or demand-response value, but that is not the same as a grant.",
"Needs quote, interconnection, fire-code review, and application status."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Rooftop and/or parking-canopy solar PV sized to offset a small portion of the data center campus load; all generation is assumed to be consumed onsite.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 925000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar cost depends on roof structure, canopy scope, interconnection, and prevailing wage requirements."
},
{
"inputKey": "solar_pv_system_kw_dc",
"value": 5000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "5 MWdc is plausible for a large campus but still small relative to data center load."
},
{
"inputKey": "estimated_annual_generation_kwh",
"value": 6350000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning generation for a Virginia commercial PV project; final estimate requires solar design."
},
{
"inputKey": "onsite_load_exceeds_generation",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual site load is far larger than expected onsite PV generation."
},
{
"inputKey": "roof_structural_capacity_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No roof condition or structural review is supplied."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection status is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Solar may be a tax-credit project rather than a grant project.",
"Do not calculate grant value without quote, interconnection path, and incentive rule match.",
"PV offsets less than 1% of the supplied annual electricity load."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Microgrid controller integrating selected backup generation, switchgear, BESS, and critical-load controls for a subset of the campus.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 2280000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Microgrid cost is highly dependent on switchgear, controls, protection studies, and existing generator configuration."
},
{
"inputKey": "critical_load_kw_served",
"value": 40000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Represents a partial-campus microgrid scope rather than the full estimated site peak."
},
{
"inputKey": "public_critical_facility_benefit_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a private colocation facility; no public shelter, hospital, water, or emergency-services role is supplied."
},
{
"inputKey": "existing_backup_generators_integrated",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Data centers commonly have backup generation, but exact generator inventory is not supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Most public microgrid grants require public benefit, resilience need, or public-sector sponsorship.",
"Do not assume eligibility based only on the site being a critical private facility.",
"Needs engineering design, public-benefit narrative, and application status."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Partial LED and controls upgrade for remaining non-LED lighting in administrative areas, loading docks, support spaces, exterior/security lighting, and selected data hall service corridors.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 152500000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large partial-campus lighting project could exceed $1 million, but the existing fixture schedule is unknown."
},
{
"inputKey": "existing_fixture_count",
"value": 3850,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fixture quantity is a synthetic planning value and should be replaced by a lighting audit."
},
{
"inputKey": "new_led_fixture_count",
"value": 3850,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes one-for-one replacement plus controls; fixture types are not yet known."
},
{
"inputKey": "networked_lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controls are realistic for support spaces and exterior/security lighting."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 2300000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Lighting is a small share of data center load; savings should not be scaled from total kWh."
},
{
"inputKey": "existing_lighting_already_led",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Modern data centers may already have LED lighting, so baseline fixture type must be verified."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only qualifies if replacing eligible non-LED baseline equipment.",
"Needs fixture schedule, DLC/spec documentation, operating hours, and quote.",
"Should not be modeled as a campus-scale energy project."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Electrification or high-efficiency heat pump replacement for administrative offices, security buildings, break rooms, and other occupied support areas, not the data hall cooling plant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 240000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Office/support HVAC scope is plausible, but the actual equipment and gas baseline are unknown."
},
{
"inputKey": "heat_pump_units",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Represents support-area units only."
},
{
"inputKey": "served_area_sqft",
"value": 85000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic estimate for administrative and support space; gross building area is unknown."
},
{
"inputKey": "existing_heating_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Gas utility service is unknown, so fuel-switch savings and eligibility must remain uncertain."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 410000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Support-space HVAC is tiny relative to total campus load."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Only support-space HVAC is in scope.",
"Fuel-switching grants should stay suppressed until gas baseline is known.",
"Data center process cooling should not be treated as ordinary heat pump HVAC."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Screened but not selected; ground-source heat pumps are not a realistic primary solution for a high-density data center campus with large continuous heat-rejection load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No credible project scope is present and the measure is unlikely for the data hall load."
},
{
"inputKey": "geothermal_borefield_feasibility_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geotechnical or borefield feasibility evidence is supplied."
},
{
"inputKey": "applies_to_data_hall_cooling",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ground-source heat pumps are not modeled as a realistic solution for the primary data center cooling load."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force qualification for a data center campus.",
"Could be reconsidered only for small support buildings with a defined scope.",
"Needs feasibility study and site area confirmation."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Not currently pursuing CHP; natural gas service is unknown and useful recovered-heat load is limited relative to the electric and cooling load profile.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No gas service, CHP design, or heat-recovery use case is supplied."
},
{
"inputKey": "confirmed_natural_gas_service",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case intentionally leaves gas utility provider unknown."
},
{
"inputKey": "useful_thermal_load_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Data centers have large heat rejection needs, but not necessarily a useful year-round recovered-heat load."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress until gas service and useful thermal load are documented.",
"CHP may conflict with emissions, resiliency, and decarbonization objectives.",
"Do not infer eligibility from high electric load alone."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not a realistic project for this site; the data center has no onsite biomass waste stream and no documented biogas fuel supply contract.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No biomass or biogas project scope is present."
},
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A data center is not expected to generate a meaningful biomass feedstock stream."
},
{
"inputKey": "biogas_supply_contract_executed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fuel procurement or gas interconnection facts are supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not relevant without feedstock or contracted renewable gas supply.",
"Do not use generic renewable-energy grants to create a positive estimate."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not pursuing small wind; the data center campus load is very large, the measure is not a normal fit for a reliability-focused colocation facility, and no wind resource or zoning study is supplied.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind turbine project scope, quote, or interconnection plan is supplied."
},
{
"inputKey": "wind_resource_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Wind projects require site-specific resource and zoning review."
},
{
"inputKey": "zoning_or_height_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No approval status is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Small wind should be treated as not relevant unless the customer selects it.",
"No wind resource, zoning, or interconnection evidence is available."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Not a realistic priority; domestic hot water load at a data center is expected to be small compared with electric cooling and IT load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No significant hot-water load or solar thermal scope is supplied."
},
{
"inputKey": "domestic_hot_water_load_high",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Data centers usually have limited domestic hot water relative to their electric load."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress water-heating grants unless the customer documents a significant hot-water load.",
"Do not scale savings from the data center electric profile."
]
},
{
"retrofitTypeId": "electric_forklift_material_handling",
"projectScopeSummary": "Limited material-handling electrification for loading dock and parts logistics, potentially replacing a small number of propane forklifts if a fossil-fuel baseline is verified.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 42000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small forklift and charger package is plausible but must be based on fleet inventory and quote."
},
{
"inputKey": "electric_forklift_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Data centers have limited logistics needs; this should remain a small project."
},
{
"inputKey": "charger_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes one charger per forklift."
},
{
"inputKey": "existing_propane_or_diesel_units_to_replace",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Many facilities already use electric forklifts; fossil-fuel baseline is not confirmed."
},
{
"inputKey": "scrappage_or_replacement_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Fleet electrification incentives often require replacement evidence."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Only calculate if existing fossil-fuel equipment, ownership, and replacement plan are documented.",
"Fleet size is small and not central to the data center load profile.",
"Needs quote and equipment VIN/serial inventory."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Not relevant as commercial refrigeration; data center cooling equipment should be handled under custom HVAC or process cooling, not supermarket or food-service refrigeration measures.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No walk-in cooler, display case, or commercial refrigeration load is supplied."
},
{
"inputKey": "commercial_food_refrigeration_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility type is data center, not grocery, restaurant, cold storage, or food service."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not map data center chillers to food-service refrigeration grants.",
"Only breakroom appliances would be de minimis and not a grant-quality scope."
]
},
{
"retrofitTypeId": "refrigeration_ec_motor_retrofit",
"projectScopeSummary": "Not relevant as refrigeration EC motors; any EC fan work in data halls should be modeled under custom HVAC or CRAH fan retrofits.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No eligible commercial refrigeration evaporator fan inventory is supplied."
},
{
"inputKey": "walk_in_cooler_or_freezer_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A data center is not expected to have meaningful walk-in refrigeration equipment."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress refrigeration EC motor incentives for this profile.",
"Use custom HVAC for CRAH/CRAC fan efficiency instead."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "UTIL_DOMINION_VA_NONRES_LIGHTING_PRESCRIPTIVE",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "fixture_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Fixture types, quantities, wattages, and operating hours are not documented."
},
{
"inputKey": "utility_preapproval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval record is supplied."
}
],
"reasoning": "Lighting may be eligible if non-LED baseline fixtures are verified, but the estimate should require a fixture schedule and quote."
},
{
"opportunityId": "UTIL_DOMINION_VA_NONRES_CUSTOM_ENERGY_EFFICIENCY",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "custom_measure_engineering_analysis_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cooling, TES, and RCx savings require site-specific analysis."
},
{
"inputKey": "interval_meter_data_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Interval data is necessary to validate peak and energy savings."
}
],
"reasoning": "Custom incentives are plausible for RCx, cooling optimization, and thermal storage, but should remain quote- and preapproval-dependent."
},
{
"opportunityId": "VA_DATA_CENTER_EQUIPMENT_SALES_USE_TAX_EXEMPTION",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "data_center_equipment_purchase_review_cents",
"value": 21400000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing synthetic tax facts include equipment purchases under review."
},
{
"inputKey": "state_program_match_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No state approval, certification, or match status is supplied."
}
],
"reasoning": "Do not calculate a positive state tax/incentive estimate unless the required agency status and eligible equipment treatment are confirmed."
},
{
"opportunityId": "FEDERAL_CLEAN_ELECTRICITY_ITC_SOLAR_STORAGE",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "solar_pv_system_kw_dc",
"value": 5000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic PV size is only a planning placeholder."
},
{
"inputKey": "battery_capacity_kwh",
"value": 100000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic BESS size is only a planning placeholder."
},
{
"inputKey": "prevailing_wage_apprenticeship_commitment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Labor compliance status is not supplied."
},
{
"inputKey": "domestic_content_bonus_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Bonus status should not be assumed."
}
],
"reasoning": "Solar and storage may be economically relevant, but this should not be handled as a grant estimate without project scope, tax ownership, placed-in-service timing, and labor/bonus inputs."
},
{
"opportunityId": "USDA_REAP_RENEWABLE_ENERGY_OR_EFFICIENCY",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a commercial data center, not an agricultural producer."
},
{
"inputKey": "small_business_status_verified",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied organization size does not prove federal small-business eligibility, and the project is a large data center campus."
}
],
"reasoning": "Do not force rural/agricultural grant eligibility for a high-load commercial data center."
},
{
"opportunityId": "PUBLIC_RESILIENCE_OR_CRITICAL_FACILITY_MICROGRID_GRANT",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "public_critical_facility_benefit_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No public shelter, emergency response, water, wastewater, hospital, or government-service role is documented."
},
{
"inputKey": "public_entity_partner_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No public partner is identified."
}
],
"reasoning": "A private colocation data center may be resilient infrastructure, but public grant probability should be suppressed without public-benefit evidence."
},
{
"opportunityId": "FLEET_ELECTRIFICATION_MATERIAL_HANDLING_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "existing_propane_or_diesel_units_to_replace",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Replacement baseline is not known."
},
{
"inputKey": "electric_forklift_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small synthetic scope only."
}
],
"reasoning": "Do not calculate unless fossil-fuel baseline, ownership, scrappage, and charger costs are documented."
},
{
"opportunityId": "COMMERCIAL_REFRIGERATION_PRESCRIPTIVE_REBATE",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "commercial_food_refrigeration_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a data center, not grocery, restaurant, food service, or cold storage."
}
],
"reasoning": "Refrigeration opportunities should be suppressed; data center cooling belongs under custom HVAC/process cooling."
},
{
"opportunityId": "SOLAR_THERMAL_WATER_HEATING_REBATE",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "domestic_hot_water_load_high",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No meaningful hot-water process or occupancy load is supplied."
}
],
"reasoning": "Solar water heating should not produce a grant estimate for this customer unless the user documents a significant thermal load."
},
{
"opportunityId": "GEOTHERMAL_HEAT_PUMP_REBATE",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applies_to_data_hall_cooling",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No credible geothermal scope is provided for the main data center cooling load."
}
],
"reasoning": "Only a small support-building geothermal project could be considered, and no such scope is defined."
},
{
"opportunityId": "BIOMASS_BIOGAS_RENEWABLE_ENERGY_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility does not have an agricultural, wastewater, landfill, or organic waste feedstock profile."
},
{
"inputKey": "biogas_supply_contract_executed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No biogas fuel supply facts are present."
}
],
"reasoning": "Biomass and biogas grants should not be made positive for this data center profile."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "measure_specific_contractor_quote",
"reason": "quote not available"
},
{
"inputKey": "final_equipment_invoices_or_purchase_orders",
"reason": "quote not available"
},
{
"inputKey": "utility_preapproval_or_reservation_number",
"reason": "application not submitted"
},
{
"inputKey": "state_program_match_status",
"reason": "source requires agency approval"
},
{
"inputKey": "data_center_tax_exemption_certification",
"reason": "source requires agency approval"
},
{
"inputKey": "verified_rate_schedule_and_customer_class",
"reason": "needs user decision"
},
{
"inputKey": "interval_meter_data",
"reason": "needs user decision"
},
{
"inputKey": "gross_building_square_footage",
"reason": "needs user decision"
},
{
"inputKey": "data_hall_white_space_sqft",
"reason": "needs user decision"
},
{
"inputKey": "existing_cooling_equipment_schedule",
"reason": "needs user decision"
},
{
"inputKey": "lighting_fixture_schedule",
"reason": "needs user decision"
},
{
"inputKey": "confirmed_natural_gas_service",
"reason": "needs user decision"
},
{
"inputKey": "monthly_therms_or_gas_bills",
"reason": "needs user decision"
},
{
"inputKey": "solar_roof_structural_review",
"reason": "quote not available"
},
{
"inputKey": "solar_or_storage_interconnection_approval",
"reason": "application not submitted"
},
{
"inputKey": "battery_fire_code_and_siting_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "public_critical_facility_benefit_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "agricultural_producer_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "nonprofit_or_public_entity_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "prevailing_wage_apprenticeship_commitment",
"reason": "needs user decision"
},
{
"inputKey": "domestic_content_documentation",
"reason": "needs user decision"
},
{
"inputKey": "disadvantaged_community_or_low_income_adder_status",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The applicant should be treated as a private for-profit commercial data center, not a nonprofit, public entity, school, tribal entity, or agricultural producer.",
"Gas service is intentionally unknown; CHP, gas fuel-switching, and biogas estimates should remain suppressed until gas service and thermal load are documented.",
"Data center cooling equipment should not be mapped to commercial food refrigeration measures.",
"Solar water heating is not a realistic priority because no significant domestic hot-water or process hot-water load is documented.",
"Public resilience and microgrid grants should not be calculated without evidence of public critical-facility benefit or a public-sector partner.",
"Battery storage and solar PV may be viable capital projects, but grant estimates should not be made positive without quote, interconnection status, tax ownership, and applicable incentive rule evidence.",
"State data center tax or equipment incentives should not calculate unless agency approval, certification, or program match status is confirmed.",
"Large data center load should not be used to inflate small measures such as lighting, forklifts, support-area heat pumps, or water heating.",
"USDA, small-business, rural, or agricultural grant eligibility should not be assumed for a high-load data center campus.",
"Do not assume disadvantaged-community, energy-community, domestic-content, or labor-compliance adders without tract-level and project-level evidence."
]
}

