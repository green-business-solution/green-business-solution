{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "gm-factory-zero-detroit",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment uses the supplied Factory ZERO Detroit industrial EV-manufacturing test case, including ownership, DTE Electric service, 4,000,000 square feet, high annual electricity use, existing tax facts, and the matched Michigan NEVI opportunity. No public-source grant qualification is assumed beyond the supplied fixture. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "industrial_large_power",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 4,000,000 square foot automotive assembly plant with roughly 299,000,000 annual kWh would normally be treated as a large industrial electric customer rather than small commercial."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The organization is General Motors Factory ZERO, an industrial manufacturing facility."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The site is a privately owned industrial facility, not a public agency."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The facility is used for EV manufacturing, assembly, logistics, testing, and plant operations."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The NAICS and activity description indicate automotive manufacturing, not agricultural production."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, sponsorship, or control is indicated for this private industrial site."
},
{
"inputKey": "fleet_owner_or_operator",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large EV assembly plant would plausibly operate employee, security, maintenance, yard, visitor, and prototype vehicle charging loads."
},
{
"inputKey": "site_owner_controls_project_area",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile states the organization owns the site."
},
{
"inputKey": "landlord_consent_required",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is owner-controlled, so normal tenant-landlord consent constraints should not block retrofit screening."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form states the project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "budgetary_planning",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At the exploring stage, project records should use planning-level inputs and suppress grant estimates that require executed quotes or agency awards."
},
{
"inputKey": "has_executed_vendor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case contains preview costs but no vendor quote, bill of materials, or selected contractor."
},
{
"inputKey": "has_submitted_grant_application",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied facts do not identify a submitted grant application or award."
},
{
"inputKey": "disadvantaged_community_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The normalized geography does not include census tract or program-specific community-designation facts."
},
{
"inputKey": "census_tract_geoid",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied normalized profile leaves census tract unknown, which can affect some federal and state scoring rules."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install a mixed private fleet and employee charging depot serving plant operations, visitors, employee EVs, prototype vehicles, and local logistics; not modeled as a public 24/7 highway-corridor DC fast charging station.",
"inputFacts": [
{
"inputKey": "project_cost_cents",
"value": 245000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A mixed industrial charging project with Level 2 ports, DC fast chargers, trenching, switchgear, networking, and utility coordination would be materially larger than the admin preview fixture."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 225000000,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Eligible cost depends on program rules and the final quote; planning excludes internal project management and non-infrastructure contingency."
},
{
"inputKey": "level2_ports",
"value": 72,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large manufacturing site could plausibly install dozens of employee, visitor, and light-duty fleet Level 2 ports."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A limited number of DCFC ports is realistic for plant fleet, prototype, and logistics support."
},
{
"inputKey": "dc_fast_charger_power_kw_each",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "150 kW DCFC units are a conservative planning assumption for fleet and operational charging."
},
{
"inputKey": "new_service_capacity_kw",
"value": 1800,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Total coincident charging load depends on managed charging controls, transformer capacity, and utility interconnection review."
},
{
"inputKey": "charging_use_case",
"value": "private_fleet_employee_and_visitor_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This aligns with an industrial EV assembly site and avoids forcing corridor-public NEVI eligibility."
},
{
"inputKey": "public_access_24_7",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A private automotive manufacturing plant would normally have controlled site access and security."
},
{
"inputKey": "located_on_alternative_fuel_corridor",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied test case does not include corridor distance or MDOT NEVI site-selection facts."
},
{
"inputKey": "utility_make_ready_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Multiple DCFC units and dozens of Level 2 ports would typically require make-ready planning, metering, protection, and possible transformer work."
},
{
"inputKey": "charging_networked",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked chargers are realistic for access control, cost allocation, uptime monitoring, and grant reporting."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Private industrial fleet and employee charging may qualify for some make-ready or fleet programs, but it should not automatically qualify for public-corridor NEVI funding.",
"A final estimate should require charger quote, site plan, utility make-ready scope, and program-specific eligibility review."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace selected aging rooftop and makeup-air HVAC equipment serving offices, break rooms, quality labs, and support spaces; not a full-plant process ventilation conversion.",
"inputFacts": [
{
"inputKey": "project_cost_cents",
"value": 385000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial HVAC modernization at a 4,000,000 square foot plant could be multimillion-dollar, but exact cost requires equipment schedules."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Eligibility depends on specific equipment efficiency ratings, baseline replacement assumptions, and any utility or grant caps."
},
{
"inputKey": "hvac_units_replaced",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Partial replacement of packaged and makeup-air units is plausible for support areas but should be confirmed by an equipment inventory."
},
{
"inputKey": "affected_floor_area_sqft",
"value": 420000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 10% of the facility is conditioned support, administrative, and lab space rather than full manufacturing floor HVAC."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 1850000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning-level savings are small relative to the plant's total electric consumption and should not drive a grant estimate without an engineering model."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 145000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are plausible for high-efficiency makeup-air and heating equipment but require interval gas data and equipment specifications."
},
{
"inputKey": "equipment_efficiency_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No AHRI sheets, equipment cut sheets, or engineered baseline are included in the supplied facts."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for utility custom incentives or energy-efficiency programs if the equipment efficiency, baseline, and savings are documented.",
"Grant calculations should remain suppressed or marked needs_quote until an engineering study and vendor quote exist."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Targeted LED/high-bay and controls retrofit in selected assembly, warehouse, loading, and maintenance zones; not a full campus-wide relighting project.",
"inputFacts": [
{
"inputKey": "project_cost_cents",
"value": 612000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial industrial high-bay retrofit across selected zones at a very large plant could plausibly exceed several million dollars."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Eligible cost depends on fixture counts, baseline wattage, DLC status, controls, labor, and incentive program rules."
},
{
"inputKey": "fixtures_replaced",
"value": 7200,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A selected-zone industrial retrofit at a 4,000,000 square foot plant could involve thousands of high-bay and area fixtures."
},
{
"inputKey": "average_existing_fixture_watts",
"value": 410,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Older industrial high-bay fixtures may have high wattage; actual baseline should come from an audit."
},
{
"inputKey": "average_replacement_fixture_watts",
"value": 185,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "High-output LED replacements commonly reduce wattage materially, but fixture specs are required for calculation."
},
{
"inputKey": "annual_operating_hours",
"value": 5200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large manufacturing facility may operate multiple shifts but not necessarily every zone continuously."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy/daylight controls are realistic in warehouse, maintenance, and support areas."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 8420000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are derived from planning assumptions and should be replaced by an audit-based fixture schedule."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Lighting incentives are plausible, but many programs require pre-approval before installation.",
"The current admin preview count of 12 fixtures is not realistic for this site and should not be used for a serious estimate."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Plant-wide energy and decarbonization feasibility study covering process loads, compressed air, HVAC, lighting, charging, heat recovery, water, and phased capital planning.",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 42500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A comprehensive engineering study for a complex 4,000,000 square foot automotive plant would plausibly cost several hundred thousand dollars."
},
{
"inputKey": "eligible_study_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Program eligibility depends on consultant scope, deliverables, and any state or utility pre-approval."
},
{
"inputKey": "study_includes_measurement_and_verification_plan",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large industrial grant and utility applications often need M&V planning for custom measures."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No engineering firm, proposal, or statement of work is present in the supplied facts."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Study grants or cost-share programs may be plausible, but the record should require a scope of work and program pre-approval."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Evaluate CHP only as a feasibility-study scenario for process resiliency and heat recovery; do not assume installation is selected.",
"inputFacts": [
{
"inputKey": "project_cost_cents",
"value": 1850000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A CHP system large enough to matter for this facility would be a major capital project; the admin preview cost is likely too small for a real plant-scale system."
},
{
"inputKey": "system_capacity_kw",
"value": 5500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest CHP scenario relative to annual kWh load is plausible for resiliency and thermal recovery screening."
},
{
"inputKey": "useful_thermal_recovery",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Industrial plants may have recoverable thermal loads, but process integration must be verified."
},
{
"inputKey": "selected_for_installation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No project commitment, interconnection study, emissions review, or procurement status is provided."
},
{
"inputKey": "emissions_permit_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "CHP at this scale would require permitting review before grant eligibility or install readiness can be assumed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP may conflict with clean-manufacturing or decarbonization goals unless emissions performance and useful heat recovery are documented.",
"Treat as feasibility only; do not calculate installation grants without scope, emissions review, interconnection status, and equipment quote."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Screen geothermal heat pumps only for administrative/support buildings or conditioned lab areas, not the entire industrial manufacturing floor.",
"inputFacts": [
{
"inputKey": "project_cost_cents",
"value": 920000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A geothermal project for selected support areas at this site would be costly and highly site-specific."
},
{
"inputKey": "conditioned_area_served_sqft",
"value": 120000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited scope is more realistic than plant-wide geothermal for heavy manufacturing space."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 650,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning capacity is rough and requires load calculations and borefield design."
},
{
"inputKey": "geotechnical_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No subsurface, contamination, or available-land review is included."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A geothermal estimate should require borefield design, load study, and vendor pricing."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Geothermal could be eligible in some tax-credit or efficiency contexts, but it is not obviously practical or grant-ready for this industrial site.",
"Keep estimates suppressed until feasibility and site constraints are documented."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small pilot solar thermal system for locker rooms, cafeteria, and maintenance hot water; not a core manufacturing energy project.",
"inputFacts": [
{
"inputKey": "project_cost_cents",
"value": 14500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A pilot-scale solar hot-water project is plausible but not central to the facility's energy profile."
},
{
"inputKey": "collector_area_sqft",
"value": 2200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Collector area is a planning placeholder pending roof/structural and hot-water load review."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 8200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal savings would be minor relative to the plant's total gas spend."
},
{
"inputKey": "roof_structural_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No structural review or roof warranty information is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This is a low-priority measure for a large EV manufacturing plant and should not be forced into grant qualification.",
"Any estimate should require roof review, load data, and quote."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Do not model as an active project; biomass/biogas generation is not aligned with the EV assembly plant profile unless a separate waste-to-energy or renewable fuel project is documented.",
"inputFacts": [
{
"inputKey": "project_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case describes EV manufacturing and facility efficiency, not biomass fuel supply or anaerobic digestion."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No feedstock, technology, interconnection, or site scope is provided."
},
{
"inputKey": "qualified_feedstock_secured",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An automotive assembly plant is not normally a biomass or biogas feedstock producer."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress biomass/biogas grant estimates unless the user supplies a separate renewable-fuel project scope."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Do not model as an active project; small wind is unlikely at a dense urban industrial plant without a documented wind resource and siting study.",
"inputFacts": [
{
"inputKey": "project_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a large urban Detroit manufacturing plant, not a typical small-wind host."
},
{
"inputKey": "wind_resource_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study, tower siting, FAA, zoning, or interconnection facts are provided."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Without a real wind project scope, no eligible cost should be generated."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress small-wind grant estimates unless the user supplies a site-specific wind and permitting study."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "program_name",
"value": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "This is the matched grant opportunity in the supplied test case."
},
{
"inputKey": "applicant_type",
"value": "private_industrial_facility",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile is an industrial manufacturing facility owned by a private company."
},
{
"inputKey": "charging_project_type",
"value": "private_fleet_employee_and_visitor_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic plant use case is private charging, not a public highway-corridor DCFC station."
},
{
"inputKey": "public_access_24_7",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Factory access is expected to be controlled for security, logistics, and manufacturing operations."
},
{
"inputKey": "nevi_corridor_site_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No Alternative Fuel Corridor distance, MDOT site round, or corridor eligibility documentation is present."
},
{
"inputKey": "mdot_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application submission is included in the supplied facts."
},
{
"inputKey": "mdot_award_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant award or contract status is included in the supplied facts."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Even if eligibility changed, NEVI cost-share calculations should require a program-compliant quote and site scope."
},
{
"inputKey": "requested_grant_amount_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No submitted budget or requested award amount exists in the record."
}
],
"reasoning": "The EV charging project is plausible for the plant, but a private, controlled-access industrial charging depot should not be treated as NEVI-qualified without public-access, corridor, application, and award evidence."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "approved_rerz_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing synthetic tax facts state no approved Renewable Energy Renaissance Zone designation is identified."
},
{
"inputKey": "qualified_company_operations",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing synthetic tax facts state EV manufacturing is not treated as approved renewable-energy company operations without program documents."
},
{
"inputKey": "phaseout_multiplier",
"value": 0,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing opportunity-specific input sets the multiplier to zero because no approved zone term or program year was identified."
},
{
"inputKey": "eligible_state_education_tax_cents",
"value": 324000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts include this amount for assessor review only, not for an estimate without approved-zone confirmation."
},
{
"inputKey": "eligible_real_property_tax_cents",
"value": 1889000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts include this amount for assessor review only, not for an estimate without approved-zone confirmation."
},
{
"inputKey": "eligible_personal_property_tax_cents",
"value": 742000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts include this amount for assessor review only, not for an estimate without approved-zone confirmation."
},
{
"inputKey": "eligible_local_income_tax_cents",
"value": 118000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts include this amount for accountant review only, not for an estimate without approved-zone confirmation."
}
],
"reasoning": "The tax opportunity should remain suppressed because the supplied facts explicitly show no approved RERZ designation and no qualifying company-operations determination."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "executed_ev_charger_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "utility_make_ready_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "mdot_nevi_application_id",
"reason": "application not submitted"
},
{
"inputKey": "mdot_nevi_award_amount_cents",
"reason": "application not submitted"
},
{
"inputKey": "nevi_public_access_compliance_documentation",
"reason": "source requires agency approval"
},
{
"inputKey": "alternative_fuel_corridor_distance_miles",
"reason": "needs user decision"
},
{
"inputKey": "lighting_fixture_schedule",
"reason": "quote not available"
},
{
"inputKey": "hvac_equipment_schedule",
"reason": "quote not available"
},
{
"inputKey": "engineering_feasibility_study_statement_of_work",
"reason": "quote not available"
},
{
"inputKey": "ground_source_geothermal_borefield_design",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "approved_rerz_designation_document",
"reason": "source requires agency approval"
}
],
"doNotForceQualificationReasons": [
"Do not treat EV manufacturing alone as Renewable Energy Renaissance Zone qualified company operations; the supplied tax facts explicitly mark that condition false.",
"Do not calculate Michigan NEVI funding for a private plant charging depot without public-access, corridor, application, and award evidence.",
"Do not use the admin retrofit preview costs as real eligible project costs for a 4,000,000 square foot industrial plant.",
"Do not assume residential, school, nonprofit, tribal, agricultural, or public-entity grant eligibility for this private industrial profile.",
"Do not force geothermal, small wind, solar thermal, biomass, or CHP grants just because those retrofit types appear in discovery; several are feasibility-only or unrealistic for this site.",
"Do not include property-tax or local-income-tax amounts in a user-facing grant total before approved-zone and accountant or assessor confirmation."
]
}

