{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "microsoft-columbia-data-center-quincy",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied test-case facts for a very large owned commercial data center in Quincy, WA served by Grant County PUD, with gas utility unknown and project stage still exploring. The profile intentionally suppresses or caveats many grant estimates because a hyperscale data center is likely to exceed small-customer assumptions, may require utility preapproval, and lacks project quotes or applications. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type",
"value": "commercial_business",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing test case identifies the applicant as a commercial business, not a public entity, nonprofit, school, agricultural producer, or tribal entity."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A Microsoft-owned data center should not be treated as a public-sector applicant for grant eligibility tests."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is operated by a commercial business; nonprofit-only grants should be suppressed."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a data center/server facility, not an education campus."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cloud computing and server operations are not agricultural production activities."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal applicant role is identified in the test case."
},
{
"inputKey": "facility_owned_by_applicant",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing test case lists ownership status as Own."
},
{
"inputKey": "utility_customer_of_record_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An owned large data center would typically be the customer of record or have a direct service arrangement, but utility account documentation is not included."
},
{
"inputKey": "electric_customer_class",
"value": "large_power_or_special_contract",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual electric consumption above 1.1 billion kWh is consistent with a very large power customer; exact tariff must be confirmed from bills or utility account records."
},
{
"inputKey": "gas_utility_provider",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly leaves gas provider unknown. Do not assume gas service exists."
},
{
"inputKey": "has_natural_gas_service",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Data centers may have limited gas use or diesel backup instead; fuel bills or site energy records are needed."
},
{
"inputKey": "backup_power_fuel_type",
"value": "diesel_generators_assumed",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large data centers commonly use diesel backup generators, but this should remain overrideable because the test case does not provide generator details."
},
{
"inputKey": "annual_kwh",
"value": 1129000000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing site energy profile provides annual kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 5101800000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing site energy profile provides annual electric cost of $51,018,000."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 4.52,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing site energy profile gives average cost per kWh as $0.0452."
},
{
"inputKey": "site_square_footage",
"value": 800000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing normalized profile parsed 800,000 square feet."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing source form lists project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage projects should not be treated as quoted or contracted."
},
{
"inputKey": "incentive_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application evidence is present, so application-dependent grants should be suppressed until confirmed."
},
{
"inputKey": "utility_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No Grant County PUD preapproval or custom incentive approval is provided."
},
{
"inputKey": "has_formal_project_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case contains admin-modeled preview costs, not vendor quotes."
},
{
"inputKey": "disadvantaged_community_designation",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The normalized geo designations array is empty; do not assume community-adder eligibility."
},
{
"inputKey": "prevailing_wage_commitment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large commercial projects may need labor-compliance inputs for certain incentives, but no commitment is documented."
},
{
"inputKey": "domestic_content_commitment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No procurement specification or domestic-content documentation is available."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Limited interior and exterior LED replacement for non-white-space areas such as offices, loading areas, mechanical corridors, parking, and security lighting; not a full data hall lighting redesign.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 18500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A limited data-center lighting package is plausible, but the existing preview cost is too small for an 800,000 square foot facility."
},
{
"inputKey": "fixture_count",
"value": 850,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial retrofit could affect hundreds of fixtures across support spaces while excluding server halls."
},
{
"inputKey": "controlled_fixture_count",
"value": 550,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy/daylight controls are realistic in offices, warehouse, and corridor zones."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 640000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Savings are intentionally tiny relative to hyperscale data-center annual load, reflecting limited lighting share."
},
{
"inputKey": "measure_life_years",
"value": 10,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ten years is a conservative planning value for commercial LED/control measures."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage profile has no quote evidence."
},
{
"inputKey": "utility_preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial lighting incentives often require preapproval, especially for large custom sites."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely requires utility-specific preapproval before purchase or installation.",
"Large-power or special-contract customers may be excluded from standard prescriptive programs.",
"Final incentive should require fixture schedule, baseline wattage, installed wattage, operating hours, and quote."
]
},
{
"retrofitTypeId": "energy_management_system",
"projectScopeSummary": "Data center energy management and controls optimization focused on monitoring, cooling setpoint optimization, fan controls, and mechanical-system analytics, not whole-facility IT load reduction.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 125000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A controls and analytics deployment for a large data center is plausibly a seven-figure project."
},
{
"inputKey": "building_area_covered_sqft",
"value": 800000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The whole facility can be in scope for monitoring even if only mechanical systems generate eligible savings."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 16900000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Modeled as roughly 1.5% of annual electric use; plausible for cooling/control optimization but must be validated by engineering study."
},
{
"inputKey": "estimated_peak_kw_reduction",
"value": 2200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Peak reduction is plausible but cannot be validated without interval data and control sequences."
},
{
"inputKey": "requires_measurement_and_verification_plan",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large custom controls projects should not receive final custom incentives without an M&V plan."
},
{
"inputKey": "engineering_study_cost_cents",
"value": 18000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A feasibility/M&V study for a hyperscale facility is likely a substantial professional-services engagement."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor proposal is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Should usually be handled as custom utility incentive or study-driven project.",
"Savings should be suppressed until engineering calculations, interval data, and utility approval are provided.",
"May be excluded if the customer is served under a special large-load agreement with separate efficiency terms."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Targeted replacement of support-building rooftop units and ancillary HVAC serving offices, security, electrical rooms, and maintenance spaces; excludes mission-critical data hall cooling plant unless explicitly scoped.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 98000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A targeted HVAC replacement in support areas could be near $1 million; this avoids assuming a full central cooling plant replacement."
},
{
"inputKey": "hvac_unit_count",
"value": 14,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large campus-like facility could have multiple support-space units."
},
{
"inputKey": "total_nominal_tons",
"value": 420,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Thirty-ton average equipment size across 14 units is plausible for support spaces."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 875000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are plausible for support HVAC but require equipment schedules, baseline efficiency, and operating hours."
},
{
"inputKey": "existing_equipment_age_years",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing equipment age is necessary to distinguish early replacement from replace-on-burnout."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No equipment quote or cut sheets are included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on equipment efficiency ratings, baseline type, and utility preapproval.",
"Do not treat server-cooling systems as ordinary commercial HVAC without a specific engineering scope.",
"Quote and AHRI/equipment documentation should be required before calculation."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Not a core fit for this facility; only minor refrigeration loads such as breakroom or small warehouse equipment would be in scope.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Data centers generally do not have commercial grocery-style refrigeration loads."
},
{
"inputKey": "refrigeration_case_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No refrigerated display cases, walk-in coolers, or process refrigeration are identified."
},
{
"inputKey": "has_process_refrigeration",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Server cooling is not the same as food/process refrigeration for typical refrigeration incentives."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress ordinary refrigeration grants unless the user identifies eligible refrigeration equipment.",
"Do not map data-center cooling equipment to food-service refrigeration incentives."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Large behind-the-meter battery storage pilot for ride-through, demand management, and resilience integration with existing backup systems.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1280000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A meaningful data-center battery system would be much larger than the existing admin preview; cost is highly quote-dependent."
},
{
"inputKey": "battery_power_kw",
"value": 5000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 5 MW pilot is small relative to facility load but plausible for a resilience or demand-management test."
},
{
"inputKey": "battery_capacity_kwh",
"value": 20000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Four-hour duration is a common planning assumption, but actual sizing depends on load and interconnection."
},
{
"inputKey": "paired_with_new_renewable_generation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No on-site solar or wind project is identified as paired with the storage project."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application is provided."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No battery vendor quote or one-line design is available."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many battery grants prioritize public, nonprofit, low-income, critical-facility, or renewable-paired projects.",
"A private hyperscale data center may need a specific utility program or competitive award to qualify.",
"Suppress grant totals unless a storage-specific incentive and application status are known."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Campus microgrid concept integrating switchgear, controls, existing backup generation, and possible battery storage; exploratory only.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 2500000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A data-center microgrid would be a major custom engineering project; cost should not be calculated without design scope."
},
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A microgrid scope would require controls and islanding functionality."
},
{
"inputKey": "is_critical_public_facility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site may be operationally critical to Microsoft, but it is not identified as a public emergency facility."
},
{
"inputKey": "public_resilience_benefit_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant application narrative or public-benefit documentation is present."
},
{
"inputKey": "engineering_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No microgrid feasibility study is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Private data-center resilience projects should not be assumed eligible for public microgrid grants.",
"Needs utility interconnection, engineering study, and program-specific public-benefit criteria.",
"Likely suppress unless a competitive award or utility pilot is documented."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Chilled-water or other thermal storage concept for cooling-load management; feasibility uncertain because actual data-center cooling architecture is not provided.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 950000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal storage at data-center scale would be a large custom project and needs engineering design."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 18000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A conservative pilot-scale chilled-water storage capacity is plausible but not validated."
},
{
"inputKey": "estimated_peak_kw_reduction",
"value": 3500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Demand reduction depends heavily on chiller plant design and utility tariff."
},
{
"inputKey": "cooling_plant_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cooling system configuration is required before evaluating thermal storage."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No thermal storage quote is available."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Potentially relevant for custom utility demand-management incentives, but not a standard prescriptive grant.",
"Needs cooling plant drawings, interval demand data, tariff review, and utility approval.",
"Suppress final estimate until quote and M&V plan are available."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Employee and visitor workplace charging at a private data center campus, with a small number of fleet-capable ports.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 42000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A workplace charging project with make-ready electrical work can plausibly cost several hundred thousand dollars."
},
{
"inputKey": "level_2_ports",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Twenty-four ports is realistic for a large staffed facility without assuming public charging."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small DC fast charging component could support fleet or visitor needs but is not documented."
},
{
"inputKey": "chargers_publicly_accessible",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A secure data center would normally restrict public access."
},
{
"inputKey": "fleet_owner",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site likely uses service/security vehicles, but fleet size and ownership are not documented."
},
{
"inputKey": "fleet_vehicles_to_electrify",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small site-support fleet conversion is plausible but should be confirmed."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No charger or make-ready quote is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Private-access chargers may be ineligible for programs requiring public access.",
"Fleet incentives require vehicle count, vehicle class, ownership, and deployment schedule.",
"Make-ready and charger incentives should require quote, site plan, and utility approval."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Subset of EV charging scope limited to Level 2 employee/workplace ports.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 24000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Estimated at approximately $10,000 per Level 2 port including make-ready and networked equipment."
},
{
"inputKey": "level_2_ports",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Aligned to the broader EV charger installation scope."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked workplace chargers are a realistic default for a corporate campus."
},
{
"inputKey": "chargers_publicly_accessible",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Secure campus access makes public use unlikely."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote exists in the test case."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Workplace charging may qualify under some programs but fail public-access requirements.",
"Utility make-ready approval and final quote should be required."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Not a realistic primary project for a hyperscale data center; possible only for small office/support spaces or a pilot heat-recovery loop.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ground-source heat pumps are unlikely to be selected for the main data-center cooling load at this scale without a dedicated study."
},
{
"inputKey": "conditioned_support_area_sqft",
"value": 45000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Support-space area is estimated and not enough to justify assuming a geothermal project."
},
{
"inputKey": "geothermal_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No borefield study, geotechnical review, or design is provided."
},
{
"inputKey": "borefield_available_land_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Land availability and subsurface feasibility are unknown."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless user confirms a real geothermal scope.",
"Do not estimate grant value from generic heat-pump incentives for a data-center cooling plant."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Not a strong fit because domestic hot water load at a data center is likely small relative to electric load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No substantial hot-water end use is identified."
},
{
"inputKey": "daily_hot_water_load_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Domestic hot-water usage would need to be provided before any solar water heating incentive calculation."
},
{
"inputKey": "existing_water_heater_fuel",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas service is unknown and water heating fuel is not provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the customer identifies a significant service-water-heating load.",
"Do not assume solar thermal is economically or programmatically relevant for server operations."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Likely not applicable because gas availability is unknown and the facility is primarily electric-load driven; CHP would require major interconnection, emissions, and thermal-host analysis.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Do not size or price CHP without gas service, thermal load, emissions constraints, and business-case confirmation."
},
{
"inputKey": "has_continuous_thermal_load",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Data centers have large cooling loads but not necessarily useful heat demand for CHP recovery."
},
{
"inputKey": "gas_service_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas provider is unknown."
},
{
"inputKey": "estimated_chp_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP size should remain unknown until fuel and thermal-host feasibility are established."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress CHP incentives unless gas service, emissions pathway, useful thermal load, and interconnection are confirmed.",
"CHP may conflict with decarbonization objectives and is not a default data-center retrofit."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not realistic for this private data center unless tied to an external biogas procurement or off-site renewable gas project, which is not present in the test case.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No organic waste feedstock, wastewater digester, landfill gas source, or thermal host is identified."
},
{
"inputKey": "onsite_biogenic_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A data center does not normally generate meaningful biomass or biogas feedstock."
},
{
"inputKey": "biogas_purchase_contract_executed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No procurement contract or project evidence is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress biomass/biogas grants unless a real external fuel project or feedstock partnership is documented.",
"Do not treat general electricity use as a biogas project."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not realistic as a typical small-wind grant project for an 800,000 square foot hyperscale data center; any wind procurement would more likely be utility-scale or off-site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small wind would not meaningfully serve the facility load and no site wind study or interconnection scope is identified."
},
{
"inputKey": "turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity should remain unknown because no actual wind project is present."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind resource or zoning study is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress small-wind incentives unless the user confirms an on-site wind project.",
"Off-site renewable energy procurement should not be mapped to on-site small-wind grants."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "none_identified_data_center_operations",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts already identify no qualifying solar manufacturing classification."
},
{
"inputKey": "qualifying_tax_base_after_deductions_and_matc_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts set the qualifying tax base to zero."
}
],
"reasoning": "Do not force a Washington solar manufacturing tax preference onto a cloud/data-center operations profile."
},
{
"opportunityId": "GRANT_COUNTY_PUD_CUSTOM_EFFICIENCY_LIGHTING_CONTROLS",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case lists Grant County PUD as electric utility, but account documents are not attached."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility preapproval evidence exists."
},
{
"inputKey": "final_project_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Custom or prescriptive calculation should wait for fixture schedule and quote."
}
],
"reasoning": "Lighting and controls are plausible, but the large-customer status and lack of preapproval should prevent automatic grant totals."
},
{
"opportunityId": "GRANT_COUNTY_PUD_CUSTOM_ENERGY_MANAGEMENT_OR_PROCESS_EFFICIENCY",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "engineering_savings_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No engineering study or M&V plan is included."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 16900000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic placeholder only; should not drive a user-facing total before engineering validation."
},
{
"inputKey": "utility_custom_project_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No approval or reservation letter is present."
}
],
"reasoning": "A data-center controls optimization project is plausible but should require custom review, M&V, and utility approval."
},
{
"opportunityId": "WA_COMMERCE_CLEAN_ENERGY_OR_GRID_RESILIENCE_COMPETITIVE_GRANT",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "competitive_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application exists in the profile."
},
{
"inputKey": "public_resilience_benefit_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A private data-center resilience project does not automatically establish a public resilience benefit."
},
{
"inputKey": "award_probability_evidence",
"value": null,
"valueType": "text",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Competitive grant value should not be estimated without scoring, invitation, or award evidence."
}
],
"reasoning": "Storage, thermal storage, and microgrid concepts may be technically relevant but should not produce a probability-weighted grant estimate without application evidence."
},
{
"opportunityId": "WA_OR_UTILITY_EV_CHARGING_MAKE_READY_PROGRAM",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "level_2_ports",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic workplace-charging scope."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Synthetic fleet-support scope; must be confirmed."
},
{
"inputKey": "chargers_publicly_accessible",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Secure data-center sites are typically not open to the public."
},
{
"inputKey": "site_plan_uploaded",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No charger site plan is included."
},
{
"inputKey": "charger_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "EV charging incentives should require charger and make-ready quote."
}
],
"reasoning": "Workplace/fleet charging may be relevant, but public-access requirements and lack of quote should suppress final estimates."
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
"reasoning": "The applicant is a commercial data center operator, not an agricultural producer."
},
{
"inputKey": "is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Although Quincy may be rural, the applicant is Microsoft-scale and should not be assumed to meet small-business criteria."
}
],
"reasoning": "Do not force rural/agricultural grant eligibility onto a hyperscale corporate data center."
},
{
"opportunityId": "RESIDENTIAL_OR_MULTIFAMILY_ENERGY_REBATES",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "building_type",
"value": "data_center",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing normalized profile identifies data_center."
},
{
"inputKey": "residential_units",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A data center should not be treated as residential or multifamily."
}
],
"reasoning": "Residential and multifamily blockers should remain active for this test case."
},
{
"opportunityId": "PUBLIC_SECTOR_NONPROFIT_SCHOOL_ENERGY_GRANTS",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile is commercial business."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile is not nonprofit."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility type is data center."
}
],
"reasoning": "Public-sector, school, and nonprofit grants should remain suppressed."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "gas_utility_provider",
"reason": "needs user decision"
},
{
"inputKey": "has_natural_gas_service",
"reason": "needs user decision"
},
{
"inputKey": "monthly_peak_kw",
"reason": "quote not available"
},
{
"inputKey": "interval_load_data_15_min_or_hourly",
"reason": "needs user decision"
},
{
"inputKey": "final_vendor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "equipment_cut_sheets",
"reason": "quote not available"
},
{
"inputKey": "utility_account_number",
"reason": "needs user decision"
},
{
"inputKey": "utility_preapproval_letter",
"reason": "source requires agency approval"
},
{
"inputKey": "grant_application_submitted_date",
"reason": "application not submitted"
},
{
"inputKey": "grant_award_notice",
"reason": "application not submitted"
},
{
"inputKey": "engineering_measurement_and_verification_plan",
"reason": "source requires agency approval"
},
{
"inputKey": "battery_interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "microgrid_feasibility_study",
"reason": "quote not available"
},
{
"inputKey": "thermal_storage_cooling_plant_drawings",
"reason": "needs user decision"
},
{
"inputKey": "domestic_content_documentation",
"reason": "needs user decision"
},
{
"inputKey": "prevailing_wage_documentation",
"reason": "needs user decision"
},
{
"inputKey": "disadvantaged_community_or_energy_community_designation",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The applicant is a large commercial data-center operator, not a nonprofit, school, public agency, tribal entity, agricultural producer, or residential customer.",
"The annual load and likely large-power customer class may make standard small-commercial prescriptive rebates inappropriate without utility confirmation.",
"The project is still exploring; no quotes, preapproval letters, grant applications, interconnection approvals, or award notices are present.",
"Gas service is unknown, so CHP, gas-fired, and fuel-switching opportunities should not be assumed.",
"Data-center cooling should not be mapped automatically to ordinary HVAC, refrigeration, geothermal, or solar-water-heating incentives.",
"Solar manufacturing tax preferences should remain suppressed because the profile identifies data-center operations rather than qualifying solar manufacturing.",
"Competitive resilience, battery, and microgrid grants should not receive probability-weighted values without application or award evidence.",
"Private-access workplace EV charging may fail public-access requirements and needs site plans, charger counts, and make-ready quotes before calculation."
]
}

