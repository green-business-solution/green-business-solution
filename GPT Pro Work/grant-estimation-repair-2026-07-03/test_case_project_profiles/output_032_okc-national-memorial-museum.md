{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "okc-national-memorial-museum",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied Oklahoma City National Memorial & Museum test-case fixture, including nonprofit museum use, public visitor/event/office loads, estimated 30,000 square feet, OG&E electric service, ONG gas service, and mostly exempt nonprofit property-tax posture.  The profile intentionally leaves quote-, design-, approval-, and application-dependent values missing where a real customer record would not yet support a grant estimate.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_type_confirmed",
"value": "nonprofit_501c3_or_similar",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture describes the applicant as a nonprofit organization and museum/memorial. Exact IRS subsection is not document-confirmed, so this should remain overrideable."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Although the facility is public-facing, the customer is modeled as a nonprofit organization rather than a city, county, state, school district, or tribal government."
},
{
"inputKey": "is_k12_school",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary use is museum operations, memorial site management, public education, events, and visitor services, not K-12 instruction."
},
{
"inputKey": "is_higher_education_institution",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a nonprofit museum and memorial, not a college or university campus."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No agricultural production, farm income, or rural small business use is indicated."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture does not indicate tribal ownership, tribal governance, or tribal utility status."
},
{
"inputKey": "is_utility_customer_oge",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture self-reports Oklahoma Gas & Electric as the electric utility, with verification status still self-reported and unverified."
},
{
"inputKey": "is_utility_customer_oklahoma_natural_gas",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture lists Oklahoma Natural Gas as the gas utility provider."
},
{
"inputKey": "customer_class",
"value": "commercial_nonprofit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 30,000-square-foot nonprofit museum with visitor, exhibit, event, and office loads would typically be handled as a commercial/nonresidential account rather than residential."
},
{
"inputKey": "ownership_or_site_control_status",
"value": "unknown_site_control_likely_long_term",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture says ownership status is not sure. A museum/memorial likely has long-term control, but owner approval should not be assumed for capital projects."
},
{
"inputKey": "nonprofit_property_tax_exemption_status",
"value": "mostly_exempt",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes a synthetic tax fact indicating mostly exempt nonprofit property-tax status."
},
{
"inputKey": "annual_kwh",
"value": 420000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes annual electric use of 420,000 kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 4620000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes annual electric cost of $46,200."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 870000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes annual gas cost of $8,700."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 410000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes combined water/sewer cost of $4,100."
},
{
"inputKey": "annual_waste_cost_cents",
"value": 840000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes annual waste cost of $8,400."
},
{
"inputKey": "has_public_visitor_areas",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture describes public visitor and exhibit loads."
},
{
"inputKey": "has_event_space",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes event loads and visitor services."
},
{
"inputKey": "historic_or_memorial_site_constraints_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture explicitly notes preservation and visitor constraints, so exterior-visible, roof-mounted, trenching, and public-area work may need special review."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form marks the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At an exploring stage, a realistic nonprofit museum profile would not yet have final vendor selection or binding quotes."
},
{
"inputKey": "grant_application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fixture fact indicates any submitted or approved grant application."
},
{
"inputKey": "preapproval_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility, agency, or grant preapproval is present in the fixture."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "ASHRAE Level II-style audit covering the museum building, exhibit lighting, public areas, offices, event spaces, HVAC schedules, domestic hot water, irrigation/water use, and utility-bill normalization.",
"inputFacts": [
{
"inputKey": "audit_level",
"value": "ashrae_level_ii",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 30,000-square-foot nonprofit museum with multiple end uses would reasonably start with a Level II audit before capital upgrades."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1800000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A synthetic $18,000 planning budget is plausible for a targeted nonresidential audit with utility analysis and implementation recommendations."
},
{
"inputKey": "study_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploratory, so final study quotes should be requested before calculating quote-based incentives."
},
{
"inputKey": "benchmarking_or_energy_star_portfolio_manager_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not indicate whether the museum has benchmarking records or ENERGY STAR Portfolio Manager data."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Audit incentives, if any, may require utility customer verification, preapproval, or a participating trade ally.",
"Some public-sector audit grants may not apply because the applicant is modeled as a nonprofit rather than a government entity."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Interior LED replacement and lighting-control refresh for galleries, offices, back-of-house spaces, lobby/public circulation, and event-support areas, with exhibit-lighting color-quality constraints.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 210,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 30,000-square-foot museum would likely have substantially more than the admin preview's 12 fixtures; 210 fixtures is a conservative whole-building test-case quantity."
},
{
"inputKey": "fixture_type_mix",
"value": [
"gallery_track_heads",
"recessed_downlights",
"office_troffers",
"back_of_house_linear_led",
"exit_and_egress_lighting"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The mix reflects typical museum, visitor, event, office, and back-of-house lighting."
},
{
"inputKey": "controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy scheduling and public-area controls are realistic adders for a museum retrofit."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12600000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A synthetic $126,000 cost assumes an average installed cost of about $600 per fixture/control point, reflecting specialty gallery lighting and off-hours work."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 62000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 62,000 kWh reduction is about 15% of annual electric use, plausible for a lighting-heavy museum with public hours and gallery loads."
},
{
"inputKey": "dlc_or_energy_star_equipment_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Typical nonresidential lighting programs require qualified LED equipment documentation."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture does not provide a project quote or fixture schedule."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility rebates may require preapproval before purchase or installation.",
"Museum exhibit lighting may require color-rendering, dimming, and preservation review before final scope is fixed.",
"A final fixture inventory is needed before calculating measure-by-measure incentives."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Phased replacement of aging packaged rooftop units and split-system components serving galleries, offices, visitor areas, and event spaces, with improved controls and humidity-aware scheduling.",
"inputFacts": [
{
"inputKey": "hvac_system_type_existing",
"value": "mixed_packaged_rooftop_units_and_split_systems",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small-to-mid-size institutional museum commonly uses packaged units and split systems, but the fixture does not confirm existing equipment."
},
{
"inputKey": "replacement_unit_count",
"value": 5,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Five units is a realistic phased scope for a 30,000-square-foot building with separate public, exhibit, office, and support zones."
},
{
"inputKey": "cooling_capacity_tons",
"value": 85,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "About 85 tons is a plausible conservative planning value for a public assembly/museum building in Oklahoma, subject to engineering verification."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 42500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A synthetic $425,000 cost is plausible for multiple commercial HVAC replacements with controls, crane work, and public-access constraints."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 48000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 48,000 kWh reduction is roughly 11% of annual electric use and is plausible for high-efficiency cooling and controls."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 2200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are plausible if replacing gas heat or improving scheduling, but annual therm use is not supplied in the fixture."
},
{
"inputKey": "equipment_efficiency_documentation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No AHRI certificates, model numbers, or rated efficiencies are included."
},
{
"inputKey": "preapproval_required_before_installation",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Many commercial HVAC incentives require preapproval and equipment documentation before installation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Final eligibility depends on rated efficiency, equipment type, and whether replacement is early retirement or end-of-life.",
"Controls and humidity requirements for museum collections may increase cost without increasing rebateable capacity.",
"Preapproval should be treated as not obtained."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Conceptual geothermal heat-pump conversion study for museum HVAC loads, likely requiring borefield feasibility, site-disruption review, and memorial-preservation approval before any grant estimate is reliable.",
"inputFacts": [
{
"inputKey": "conceptual_system_capacity_tons",
"value": 90,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity is aligned with the synthetic HVAC planning load but should not be treated as an engineered design."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 210000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A full commercial geothermal conversion could exceed $2 million once borefield, mechanical, controls, and site-restoration costs are included."
},
{
"inputKey": "borefield_feasibility_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geotechnical, structural, subsurface, or site-control information is supplied."
},
{
"inputKey": "site_disturbance_constraints",
"value": [
"memorial_public_access",
"historic_or_sensitive_site_review",
"downtown_utility_conflicts",
"limited_staging_area"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A downtown memorial/museum site would reasonably have trenching, staging, visitor-access, and preservation constraints."
},
{
"inputKey": "quote_or_engineered_design_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture has no geothermal vendor quote, design, or feasibility study."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate a grant estimate from generic geothermal preview costs.",
"A real project would need feasibility, ownership approval, site-control confirmation, and engineered design.",
"This is likely a long-term decarbonization option rather than an active grant-ready scope."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Small visitor/staff Level 2 EV charging installation in an existing parking or curb-adjacent area, sized for destination charging rather than fleet electrification.",
"inputFacts": [
{
"inputKey": "charger_level",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A museum is a destination site where Level 2 charging is more realistic than DC fast charging."
},
{
"inputKey": "charging_station_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two dual-port stations are a realistic initial deployment for visitor and staff charging."
},
{
"inputKey": "charging_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four ports allows modest public access without implying a large fleet project."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked chargers are realistic for visitor billing, access control, and usage reporting."
},
{
"inputKey": "public_access_charging",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The museum has public visitor use, so public or semi-public charging is plausible."
},
{
"inputKey": "fleet_charging_primary_use",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fleet vehicles or fleet electrification plan is present in the fixture."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 5600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A synthetic $56,000 budget is plausible for four networked Level 2 ports with electrical make-ready, signage, bollards, and parking-lot work."
},
{
"inputKey": "utility_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not include panel capacity, transformer capacity, parking-lot electrical distance, or load-study results."
},
{
"inputKey": "site_host_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership/control is unknown, so landlord/board/site approvals should not be assumed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"EV charging incentives may require public-access commitments, network reporting, utility approval, and preapproval.",
"Parking ownership and ADA/path-of-travel impacts should be confirmed.",
"Make-ready cost and service-upgrade needs remain unknown."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Same practical scope as EV charger installation: two dual-port Level 2 charging stations for visitors and staff, pending site-control and electrical-capacity review.",
"inputFacts": [
{
"inputKey": "charging_station_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This mirrors the EV charger installation scope to avoid double-counting separate charger projects."
},
{
"inputKey": "charging_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two dual-port units produce four total Level 2 ports."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 5600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the same cost basis as the general EV charger installation input so the estimator can deduplicate."
},
{
"inputKey": "dedupe_with_retrofit_type_id",
"value": "ev_charger_installation",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The fixture contains both a general EV charger retrofit and a Level 2-specific retrofit; they should not be treated as two separate installations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Deduplicate against ev_charger_installation when calculating totals.",
"Do not count four ports twice."
]
},
{
"retrofitTypeId": "building_benchmarking_compliance",
"projectScopeSummary": "Utility data setup, ENERGY STAR Portfolio Manager account configuration, and annual benchmarking support if required by a local, state, lender, or board policy.",
"inputFacts": [
{
"inputKey": "covered_building_square_feet",
"value": 30000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture's estimated building area is 30,000 square feet."
},
{
"inputKey": "benchmarking_required_by_law",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not identify a specific benchmarking ordinance or compliance trigger."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $3,500 synthetic cost is plausible for setup and first-year benchmarking support."
},
{
"inputKey": "utility_data_release_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility authorization or benchmarking data release is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Benchmarking support is usually a compliance/planning cost rather than a capital grant project.",
"Do not force a grant estimate unless a specific local or utility program pays for benchmarking services."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Limited replacement of café, catering, staff breakroom, or event-support refrigeration equipment rather than a large commercial refrigeration plant.",
"inputFacts": [
{
"inputKey": "refrigeration_equipment_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A museum may have small food-service or event-support refrigeration, but the fixture does not confirm a café or commercial kitchen."
},
{
"inputKey": "equipment_type_mix",
"value": [
"reach_in_refrigerator",
"undercounter_refrigerator",
"ice_machine_or_event_support_cooler"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile should not assume supermarket-scale refrigeration. These small units are more realistic for a museum."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 2850000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A synthetic $28,500 budget is plausible for several high-efficiency small commercial units and installation."
},
{
"inputKey": "energy_star_or_qualified_equipment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Equipment model numbers are not available."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture does not include a refrigeration quote or equipment schedule."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility is uncertain because the fixture does not confirm food-service refrigeration.",
"Only qualified small commercial equipment should be counted; do not assume large refrigeration incentives."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar water-heating concept for restrooms, staff areas, and limited event-support hot water, not a high-load hospitality or multifamily system.",
"inputFacts": [
{
"inputKey": "domestic_hot_water_load_category",
"value": "low_to_moderate",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A museum has restrooms and possible event support but not the high hot-water load of hotels, laundries, or multifamily housing."
},
{
"inputKey": "collector_area_square_feet",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small conceptual collector area is plausible but would require a roof and load study."
},
{
"inputKey": "storage_capacity_gallons",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Storage size is paired with a modest domestic hot-water system and should be treated as conceptual."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A synthetic $72,000 cost is plausible for a small commercial solar thermal installation with storage and controls."
},
{
"inputKey": "roof_structural_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No structural review, roof age, shading, or preservation review is supplied."
},
{
"inputKey": "hot_water_metering_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes gas cost but not hot-water-specific load data."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Solar thermal is not a natural first-choice project for a museum with low-to-moderate hot-water load.",
"Suppress formula estimates unless a program specifically supports small commercial solar thermal and the hot-water load is documented."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "No realistic onsite biomass or biogas generation project for this downtown nonprofit museum; included only as a negative-control retrofit.",
"inputFacts": [
{
"inputKey": "onsite_organic_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A museum/memorial does not normally produce consistent biomass or biogas feedstock."
},
{
"inputKey": "wastewater_or_landfill_gas_source_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wastewater treatment, landfill, agricultural, or industrial digester source is indicated."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "There is no realistic defined biomass/biogas project scope to cost."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as ineligible or not relevant unless the customer identifies a separate feedstock-based project.",
"Do not use the admin preview cost to calculate grants."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not a realistic near-term scope for this 30,000-square-foot museum without documented high coincident thermal/electric loads or resilience requirements.",
"inputFacts": [
{
"inputKey": "annual_kwh",
"value": 420000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied annual electric use is modest for commercial CHP economics."
},
{
"inputKey": "high_year_round_thermal_load_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture does not indicate hospital, industrial, hotel, pool, laundry, or other high year-round thermal load."
},
{
"inputKey": "conceptual_chp_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No CHP sizing should be inferred without interval load and thermal-load data."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No realistic CHP project has been defined."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress CHP grant estimates unless a feasibility study documents year-round thermal recovery and resilience value.",
"The site's annual kWh is likely too small for a typical CHP project."
]
},
{
"retrofitTypeId": "fuel_cell_system",
"projectScopeSummary": "No realistic fuel-cell project scope for this nonprofit museum at the exploratory stage; could be revisited only if resilience or clean-backup requirements become a funded capital priority.",
"inputFacts": [
{
"inputKey": "critical_facility_resilience_requirement",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is public-facing and important, but the fixture does not indicate emergency-shelter, hospital, public-safety, or mission-critical resilience requirements."
},
{
"inputKey": "fuel_cell_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No load study, resilience target, or vendor design is available."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No realistic fuel-cell scope exists in the fixture."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress fuel-cell estimates unless the customer supplies a quote, resilience objective, and interconnection/fuel plan.",
"This is not a normal first-line retrofit for a 30,000-square-foot nonprofit museum."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "No realistic small-wind project for a downtown memorial/museum site with visitor, aesthetic, preservation, and urban siting constraints.",
"inputFacts": [
{
"inputKey": "urban_site_constraint_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is in downtown Oklahoma City and is a public memorial/museum, making small wind siting highly constrained."
},
{
"inputKey": "adequate_open_land_for_tower",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A downtown memorial/museum property is unlikely to have appropriate tower setbacks, open land, and visitor-safe turbine siting."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind-resource or permitting study is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No realistic small-wind project should be costed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as not relevant to this profile.",
"Do not force qualification based on generic renewable-energy categories."
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
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing fixture already suppresses this Washington solar manufacturing taxpayer workflow for an Oklahoma nonprofit museum."
}
],
"reasoning": "Do not calculate. The site is in Oklahoma and the applicant is not a Washington solar manufacturing taxpayer."
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
"reasoning": "The existing fixture already suppresses this Rhode Island renewable property-tax valuation workflow for an Oklahoma site."
}
],
"reasoning": "Do not calculate. The opportunity geography and property-tax mechanism do not match the Oklahoma museum profile."
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
"reasoning": "The existing fixture suppresses the Michigan Renewable Energy Renaissance Zone workflow for this Oklahoma site."
}
],
"reasoning": "Do not calculate. The project site is not in Michigan and has no approved RERZ designation."
},
{
"opportunityId": "UTIL_OGE_COMMERCIAL_LIGHTING_REBATE_SYNTHETIC",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The utility is self-reported but not verified with an account number or bill."
},
{
"inputKey": "fixture_count",
"value": 210,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Used for preliminary lighting scope only."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12600000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning-level cost is available, but program calculation should wait for fixture schedule and quote."
},
{
"inputKey": "preapproval_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval record is present."
}
],
"reasoning": "Lighting is a realistic nonresidential utility-incentive candidate, but the estimate should require a fixture schedule, qualified equipment, current utility bill, and preapproval status."
},
{
"opportunityId": "UTIL_OGE_COMMERCIAL_HVAC_REBATE_SYNTHETIC",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "replacement_unit_count",
"value": 5,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic phased HVAC scope."
},
{
"inputKey": "cooling_capacity_tons",
"value": 85,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning capacity only; not a substitute for AHRI-rated equipment documentation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 42500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic planning cost for project prioritization."
},
{
"inputKey": "equipment_efficiency_documentation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No AHRI certificates or model numbers supplied."
},
{
"inputKey": "preapproval_status",
"value": "not_requested",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval record is present."
}
],
"reasoning": "HVAC replacement may qualify for commercial utility rebates if equipment meets efficiency criteria, but this should remain quote- and preapproval-gated."
},
{
"opportunityId": "UTIL_OGE_EV_CHARGING_MAKE_READY_SYNTHETIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "charging_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four Level 2 ports is a realistic initial deployment."
},
{
"inputKey": "public_access_charging",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public or semi-public visitor charging is plausible for the museum."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 5600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning-level cost only; make-ready split is not known."
},
{
"inputKey": "utility_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrical capacity and make-ready costs are unknown."
},
{
"inputKey": "site_control_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership/control is unknown."
}
],
"reasoning": "EV charging is plausible but should not calculate until the project confirms site control, electrical design, public-access terms, and utility program applicability."
},
{
"opportunityId": "FEDERAL_DIRECT_PAY_CLEAN_ENERGY_ITC_SYNTHETIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "applicant_is_tax_exempt_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture identifies the applicant as a nonprofit organization with mostly exempt property-tax status."
},
{
"inputKey": "eligible_clean_energy_technology",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No solar PV, storage, geothermal, fuel-cell, CHP, or other clean-energy capital project has been selected."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Federal credit-style calculations should require a defined eligible technology, placed-in-service assumptions, and qualified cost basis."
}
],
"reasoning": "The nonprofit profile may be relevant to elective-pay style clean-energy incentives, but no grant/credit estimate should be calculated without a selected eligible technology and project cost basis."
},
{
"opportunityId": "OK_NONPROFIT_ENERGY_AUDIT_OR_FOUNDATION_GRANT_SYNTHETIC",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "audit_cost_cents",
"value": 1800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning-level audit cost is plausible."
},
{
"inputKey": "invited_application_or_award_probability_evidence",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No evidence of an invited application, award history, or active foundation opportunity is present."
}
],
"reasoning": "A nonprofit may pursue grants for planning or sustainability, but probability-weighted grant estimates should be suppressed without a specific open opportunity or application status."
},
{
"opportunityId": "USDA_REAP_RENEWABLE_ENERGY_SYNTHETIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile is a nonprofit museum, not an agricultural producer."
},
{
"inputKey": "is_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A downtown Oklahoma City museum should not be assumed to meet rural small business eligibility."
}
],
"reasoning": "Do not force rural/agricultural renewable-energy grant eligibility for this urban nonprofit museum."
},
{
"opportunityId": "PUBLIC_SECTOR_OR_SCHOOL_ENERGY_GRANT_SYNTHETIC",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture models the organization as a nonprofit rather than a governmental unit."
},
{
"inputKey": "is_k12_school",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a museum and memorial, not a school."
}
],
"reasoning": "Public-sector and school-only energy grants should be suppressed unless the user later confirms a government owner or eligible public applicant structure."
},
{
"opportunityId": "WATER_CONSERVATION_OR_IRRIGATION_REBATE_SYNTHETIC",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "outdoor_memorial_water_use_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture notes outdoor memorial water use."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 410000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture includes annual water/sewer cost."
},
{
"inputKey": "irrigation_meter_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The available field list includes irrigation meter presence, but no value is supplied."
},
{
"inputKey": "defined_water_measure",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No specific irrigation, fixture, cooling-tower, or landscape water-conservation measure is defined."
}
],
"reasoning": "Water conservation could be relevant because of memorial grounds, but no measure or meter data supports a calculation yet."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "final_vendor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "utility_account_number_or_recent_bill",
"reason": "needs user decision"
},
{
"inputKey": "utility_preapproval_id",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_confirmation_number",
"reason": "application not submitted"
},
{
"inputKey": "owner_or_landlord_authorization",
"reason": "needs user decision"
},
{
"inputKey": "board_approval_for_capital_project",
"reason": "needs user decision"
},
{
"inputKey": "engineered_hvac_load_calculation",
"reason": "quote not available"
},
{
"inputKey": "ahri_or_equipment_efficiency_certificates",
"reason": "quote not available"
},
{
"inputKey": "lighting_fixture_schedule",
"reason": "quote not available"
},
{
"inputKey": "ev_charger_site_electrical_capacity_study",
"reason": "quote not available"
},
{
"inputKey": "geothermal_borefield_feasibility_report",
"reason": "unrealistic for this customer"
},
{
"inputKey": "chp_thermal_load_profile",
"reason": "unrealistic for this customer"
},
{
"inputKey": "fuel_cell_resilience_design",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_or_tower_setback_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_or_biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "solar_water_heating_load_study",
"reason": "needs user decision"
},
{
"inputKey": "roof_structural_review_for_solar_thermal_or_other_rooftop_work",
"reason": "source requires agency approval"
},
{
"inputKey": "historic_preservation_or_memorial_design_review_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "water_measure_scope_and_irrigation_meter_data",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The customer is an Oklahoma nonprofit museum, not a residential customer, school district, agricultural producer, rural small business, tribal entity, or government agency unless later confirmed.",
"The fixture's ownership status is unknown, so capital projects requiring site control, roof rights, parking control, trenching, or exterior-visible work should require approval before calculating user-facing grant totals.",
"The project stage is exploring and there is no evidence of submitted grant applications, agency preapproval, utility preapproval, or award probability.",
"Generic admin preview costs for biomass, CHP, fuel cell, small wind, geothermal, and solar water heating should not be used to manufacture positive grant estimates.",
"Downtown memorial and museum constraints make small wind, biomass/biogas, major geothermal borefields, and visible exterior equipment poor-fit projects unless a user later supplies a specific engineered scope.",
"Mostly exempt nonprofit property-tax status means property-tax abatements or valuation incentives may have little or no incremental value and should not be forced positive.",
"Water conservation may be relevant because of outdoor memorial use, but the annual water/sewer spend is modest and there is no defined irrigation or fixture project.",
"EV charging, lighting, HVAC, and audit scopes are plausible, but typical incentive calculations should remain quote-, preapproval-, equipment-, and utility-account-gated."
]
}

