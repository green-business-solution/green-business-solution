{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "burlington-beer-company",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-profile enrichment based on the uploaded Burlington Beer Company test-case facts: leased 15,000 sq. ft. industrial/manufacturing brewery, restaurant, taproom, cold storage, and barrel-aging site in Burlington Electric Department territory, with Vermont Gas Systems service and substantial electric, gas, water/sewer, and waste costs.  Project inputs are realistic defaults for grant-estimation testing, not source-backed grant eligibility findings.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "commercial_industrial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A brewery, taproom, restaurant, cold-storage, and barrel-aging facility would normally be billed as a commercial or small industrial customer rather than residential."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is described as a commercial business, so nonprofit-only opportunities should not be forced to qualify."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a private craft brewery and restaurant, not a municipality, school district, state agency, or other public entity."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site use is brewery, restaurant, taproom, cold storage, and barrel aging; school-specific programs should not qualify."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Although the business uses agricultural inputs, this site is a manufacturing and hospitality facility, not a farm or primary agricultural production site."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal government status is indicated in the test case."
},
{
"inputKey": "is_low_income_or_disadvantaged_community_project",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not include verified census-tract, disadvantaged-community, or program-specific environmental justice designation data."
},
{
"inputKey": "applicant_controls_roof",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tenant lease status means roof-mounted work should require landlord approval and should not be assumed under tenant control."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The ownership relationship is tenant/lease, so roof, envelope, exterior, geothermal, major electrical service, and HVAC work would typically require landlord approval."
},
{
"inputKey": "landlord_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The current project stage is exploring, and no landlord consent is documented."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object states that the project is in the exploring stage."
},
{
"inputKey": "procurement_stage",
"value": "no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote, scope, or vendor details are present, so grant calculations requiring firm project cost should remain quote-dependent."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or award record is present; application-status-based grants should be suppressed until confirmed."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Most utility or agency incentives requiring preapproval should not be estimated as secured because the project is only exploring."
},
{
"inputKey": "applicant_has_federal_tax_appetite",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A for-profit commercial brewery with reported gross receipts would normally be able to use tax credits or deductions if otherwise eligible, but actual tax appetite should remain user-confirmable."
},
{
"inputKey": "direct_pay_tax_exempt_elective_pay_eligible",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a for-profit business, not a tax-exempt or governmental direct-pay entity."
},
{
"inputKey": "annual_kwh",
"value": 430000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The provided site energy profile includes annual electric use of 430,000 kWh."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 3100000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries include annual gas cost of $31,000."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 2200000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summaries include annual water/sewer cost of $22,000."
},
{
"inputKey": "has_process_refrigeration_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cold storage is listed as a primary activity, and breweries commonly use walk-in coolers or glycol/refrigeration equipment."
},
{
"inputKey": "has_high_domestic_hot_water_or_process_hot_water_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Brewing, keg washing, cleaning, restaurant service, and sanitation make hot-water measures plausible."
},
{
"inputKey": "has_food_service_equipment",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is described as including restaurant food service."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not show a depot fleet, delivery fleet replacement, or registered commercial fleet project; fleet-specific programs should not be assumed."
},
{
"inputKey": "public_ev_charging_host",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A taproom/restaurant could host customer-facing Level 2 charging, but parking count, public access, pricing, and network requirements are unknown."
},
{
"inputKey": "existing_bms_or_controls_platform",
"value": "basic_thermostats_and_equipment_level_controls",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For a 15,000 sq. ft. brewery/taproom, basic controls are plausible, but no source-backed controls inventory is available."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace a limited set of older interior production-area, storage, and back-of-house fixtures with LED fixtures or retrofit kits; not a whole-building lighting replacement.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the admin preview cost and fits a small fixture replacement scope."
},
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview explicitly assumes 12 fixture replacements, which is plausible for a partial retrofit."
},
{
"inputKey": "existing_fixture_type",
"value": "mixed_fluorescent_and_high_bay",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A brewery/warehouse-style space commonly has mixed production and storage lighting, but the actual inventory is unknown."
},
{
"inputKey": "annual_operating_hours",
"value": 4200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Production, restaurant, and taproom activity likely create extended but not 24/7 lighting hours."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor fixture schedule or lighting quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May require existing fixture inventory, DLC/qualified product details, and utility preapproval.",
"Savings and incentive amounts should remain conservative until fixture wattages and operating hours are verified."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Upgrade walk-in cooler/process refrigeration components such as evaporator fan motors, door gaskets, controls, and possibly a small condensing unit serving cold storage.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 345000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost and aligns with targeted component-level refrigeration improvements rather than a full plant replacement."
},
{
"inputKey": "walk_in_cooler_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two walk-in or cold-room zones are plausible for a brewery/taproom with production cold storage."
},
{
"inputKey": "refrigeration_measure_types",
"value": [
"ec_evaporator_fan_motors",
"adaptive_defrost_or_controls",
"door_gaskets_and_auto_closers",
"high_efficiency_condensing_unit"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are common commercial refrigeration measures that fit the stated cold-storage activity."
},
{
"inputKey": "estimated_refrigeration_load_kw",
"value": 18,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "430,000 annual kWh and brewery cold-storage use support a meaningful refrigeration load, but no equipment schedule is present."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A refrigeration contractor quote and model numbers are needed before formula-based grants should calculate."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on measure type, equipment efficiency, qualified product lists, and utility preapproval.",
"Process refrigeration may be eligible under commercial or industrial efficiency programs, but grant formulas should not assume all costs are eligible."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop or split-system HVAC serving taproom, restaurant, office, and conditioned support areas; production process heating is not included.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost and represents a limited HVAC replacement scope for occupied areas."
},
{
"inputKey": "hvac_unit_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two packaged or split-system units are plausible for a 15,000 sq. ft. mixed production and hospitality site."
},
{
"inputKey": "conditioned_area_sqft",
"value": 8500,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The taproom, restaurant, offices, and some support areas are likely conditioned; brewery production and storage may be only partially conditioned."
},
{
"inputKey": "existing_equipment_age_years",
"value": 14,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Aging HVAC is plausible but not confirmed."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No mechanical contractor quote, tonnage, or efficiency rating is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Landlord approval may be required for rooftop equipment.",
"Eligibility should depend on AHRI ratings, equipment capacity, baseline equipment type, and preapproval."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Add or replace heat-pump HVAC for taproom/restaurant and office zones to reduce fossil fuel space-heating use, excluding brewing process heat.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost and fits a moderate commercial heat-pump retrofit."
},
{
"inputKey": "heat_pump_system_type",
"value": "commercial_vrf_or_ducted_air_source_heat_pump",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For a brewery/taproom, either commercial VRF or ducted air-source heat pumps are plausible, but equipment has not been selected."
},
{
"inputKey": "nominal_capacity_tons",
"value": 20,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 20-ton HVAC scope is plausible for partially conditioned restaurant, taproom, office, and support zones, but no load calculation is available."
},
{
"inputKey": "serves_process_heat",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Standard space-conditioning heat pumps should not be assumed to displace brewing process heat."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "New exterior condensers, roof work, or penetrations typically require landlord approval for a tenant."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No HVAC quote, load calculation, or equipment submittal is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Good candidate for commercial electrification incentives if equipment and preapproval requirements are met.",
"Grant estimates should exclude brewing process heat unless a process-specific heat-recovery or industrial heat-pump scope is provided."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Possible geothermal heat-pump concept for occupied areas, but unlikely as a near-term tenant-led project because drilling, parking lot disruption, and landlord control are significant constraints.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost appears low for a full commercial ground-source installation and should not be used as a final grant basis without a feasibility study."
},
{
"inputKey": "geothermal_loop_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No well-field, horizontal loop, pond loop, or site-constraint information is available."
},
{
"inputKey": "drilling_or_excavation_allowed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Tenant status and urban/industrial site conditions make subsurface access uncertain."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ground loops, drilling, trenching, and major mechanical work would require landlord/property-owner approval."
},
{
"inputKey": "feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring and no engineering study is documented."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force qualification until site control, subsurface feasibility, landlord approval, and realistic installed cost are confirmed.",
"A geothermal grant estimate should likely be suppressed or treated as needs-project-scope."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Targeted air sealing, loading-door weatherstripping, and minor envelope work in production, storage, and taproom areas.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 194600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost and fits targeted envelope work."
},
{
"inputKey": "weatherization_measure_types",
"value": [
"loading_dock_door_seals",
"exterior_door_weatherstripping",
"penetration_air_sealing",
"minor_insulation_repairs"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These measures are plausible for an industrial/manufacturing tenant space."
},
{
"inputKey": "affected_area_sqft",
"value": 5000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited envelope scope is more plausible than whole-building weatherization for a leased industrial facility."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exterior doors, penetrations, and envelope assemblies may be landlord-controlled."
},
{
"inputKey": "energy_audit_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit or blower-door/industrial envelope assessment is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need audit findings, preapproval, and landlord approval.",
"Savings estimates should not assume residential-style weatherization eligibility."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Commission a commercial/industrial energy assessment focused on refrigeration, process hot water, HVAC electrification, waste heat recovery, and water use.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $18,000 study is plausible for a small industrial brewery with refrigeration, hot-water, and HVAC scopes."
},
{
"inputKey": "study_type",
"value": "commercial_industrial_energy_and_water_feasibility_study",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The mixed brewery/restaurant profile makes a combined energy and water study realistic."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No engineering firm or study proposal is documented."
},
{
"inputKey": "study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is at exploring stage, so the study is assumed not yet completed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some programs cover studies only after preapproval or only for defined customer classes.",
"Implementation incentives should not rely on study savings until the study exists."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Evaluate solar thermal preheating for domestic/process hot water used in brewing sanitation and restaurant operations; roof/site control is the main constraint.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost, but system size and roof feasibility are unknown."
},
{
"inputKey": "estimated_collector_area_sqft",
"value": 300,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small-to-moderate collector area is plausible for preheating, but no hot-water load profile or roof assessment is available."
},
{
"inputKey": "serves_process_or_domestic_hot_water",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Brewing sanitation and restaurant use create plausible hot-water demand."
},
{
"inputKey": "roof_structural_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No structural, roof-age, shading, or landlord approval information is provided."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Solar thermal collectors on a leased roof would normally require property-owner approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate roof-based grants until roof control, structural suitability, and hot-water load are confirmed.",
"May be less likely than heat-pump water heating or heat-recovery measures for this customer."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Potential tenant-hosted rooftop PV sized below annual consumption, but the leased roof and unknown structural/interconnection status make this speculative.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost; actual PV installed cost depends heavily on size, roof layout, interconnection, and ownership structure."
},
{
"inputKey": "system_size_kw_dc",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 75 kW DC system would be materially smaller than annual site consumption and may fit some commercial roofs, but roof area and shading are unknown."
},
{
"inputKey": "estimated_first_year_kwh",
"value": 82000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A rough production estimate is included for testing only and should be replaced by a solar model."
},
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant leases the site and does not have confirmed roof control."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application information is present."
},
{
"inputKey": "tax_credit_safe_harbor_or_project_commenced",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring and should not be treated as commenced."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress grant estimates requiring site control, interconnection progress, or firm installed cost.",
"Federal tax-credit modeling may be relevant later, but this prompt is for grant estimation and should not force a positive grant result."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Install two dual-port Level 2 chargers for taproom/restaurant customers and possibly employees, subject to parking control, utility service capacity, and network requirements.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost and is plausible for a small commercial Level 2 charger project."
},
{
"inputKey": "charger_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two charger units are plausible for a restaurant/taproom customer-facing parking area."
},
{
"inputKey": "charging_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two dual-port Level 2 stations are a realistic small commercial scope."
},
{
"inputKey": "charger_power_kw_each",
"value": 11.5,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "11.5 kW per port is a common commercial Level 2 charger assumption."
},
{
"inputKey": "public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Public/customer access is plausible for a taproom, but parking control and operating policy are not confirmed."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Many grant programs require networked chargers, but no equipment selection is available."
},
{
"inputKey": "parking_spaces_controlled_by_applicant",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not state parking count, lease rights, easements, or landlord restrictions."
},
{
"inputKey": "electrical_capacity_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No electrical service assessment or load study is available."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May need public-access, network, make-ready, parking-control, and utility preapproval facts.",
"Fleet-only EV infrastructure grants should not qualify unless a business fleet scope is later provided."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Same practical scope as the Level 2 charger project: a small customer-facing charging installation, not a fleet depot or DC fast-charging site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The generic EV charger preview has the same cost as the Level 2 charger preview and should be deduplicated where appropriate."
},
{
"inputKey": "charger_level",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 is more realistic than DC fast charging for a brewery/taproom parking lot."
},
{
"inputKey": "dc_fast_charging",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No highway-corridor, fleet, or utility-service facts support DC fast charging."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Deduplicate against level_2_ev_charger_installation to avoid double-counting the same scope.",
"Do not match DCFC-only or fleet-depot-only opportunities."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Conceptual natural-gas CHP for brewery electric and process heat load, but not realistic without a detailed thermal-load study, emissions review, and utility interconnection analysis.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost but actual CHP cost depends on size, heat recovery, interconnection, emissions controls, and operating hours."
},
{
"inputKey": "chp_capacity_kw",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual electric use of 430,000 kWh implies an average load near 49 kW; 75 kW is plausible but may be too large without load interval data."
},
{
"inputKey": "recoverable_thermal_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The brewery likely has hot-water/process load, but no hourly thermal load profile is provided."
},
{
"inputKey": "natural_gas_service_available",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile lists Vermont Gas Systems as gas utility provider and annual gas costs."
},
{
"inputKey": "air_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No emissions or permitting review is included."
},
{
"inputKey": "interconnection_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection status is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP may not align with decarbonization-focused grant programs.",
"Suppress unless a feasibility study confirms high coincident electric and thermal load, acceptable emissions, and a realistic installed cost."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "On-site biogas or biomass generation is unlikely for this urban leased brewery site; spent grain is typically reused or hauled rather than digested on-site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost but does not reflect a confirmed biomass or anaerobic-digestion project."
},
{
"inputKey": "onsite_biomass_fuel_source_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No source of qualifying on-site biomass fuel, feedstock volume, or fuel contract is identified."
},
{
"inputKey": "anaerobic_digestion_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A brewery may produce organic byproducts, but a 15,000 sq. ft. leased urban brewery is unlikely to have enough controlled feedstock for an on-site digester."
},
{
"inputKey": "wastewater_or_organics_volume_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Water and waste costs exist, but volumes and treatment requirements are not provided."
},
{
"inputKey": "air_or_waste_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No permitting review is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force qualification for biomass, biogas, farm-energy, or waste-to-energy grants without feedstock and permit evidence.",
"A waste-reduction or wastewater-efficiency project would be more realistic than on-site biogas generation."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not realistic for a leased urban/industrial brewery site in Burlington without land control, zoning clearance, wind-resource study, and structural analysis.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost, but no realistic project scope supports an on-site wind turbine."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind resource, site, or tower-feasibility information is provided."
},
{
"inputKey": "zoning_clearance_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No local zoning, tower height, or lease approval is documented."
},
{
"inputKey": "land_or_roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a tenant and site control for a turbine is not established."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Mark small-wind opportunities as likely ineligible or needs-project-scope.",
"Do not calculate incentives unless a real wind project is selected and site-control facts change."
]
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"projectScopeSummary": "Not a realistic core project for a brewery/restaurant unless the business operates substantial on-site laundering for uniforms, towels, or linens.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 307600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost exists, but laundry is not listed among site activities."
},
{
"inputKey": "onsite_commercial_laundry_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Brewery/restaurant operations may use towels or linens, but substantial on-site laundry is not typical or documented."
},
{
"inputKey": "washer_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No on-site commercial washer inventory is provided."
},
{
"inputKey": "commercial_laundry_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No laundry equipment scope or quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress laundry-equipment grants unless the user confirms on-site commercial laundry equipment.",
"Water-efficiency attention should instead focus on process water, rinse water, pre-rinse spray valves, and kitchen fixtures."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "generic_burlington_electric_commercial_efficiency_rebate",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile self-reports Burlington Electric Department as the electric provider, but verification status is still self-reported and unverified."
},
{
"inputKey": "measures_potentially_applicable",
"value": [
"led_lighting_retrofit",
"high_efficiency_refrigeration_equipment",
"high_efficiency_hvac_replacement",
"heat_pump_hvac_retrofit",
"air_sealing_weatherization",
"engineering_feasibility_study"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are the most plausible electric-efficiency and electrification measures for this profile."
},
{
"inputKey": "preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial utility incentives commonly require preapproval or measure review; no preapproval is documented."
},
{
"inputKey": "firm_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote, equipment model, or utility incentive reservation is present."
}
],
"reasoning": "Calculate only if a source-backed formula exists and quote/equipment facts are supplied. Otherwise classify as needs_quote rather than suppressing the project entirely."
},
{
"opportunityId": "generic_vermont_gas_commercial_efficiency_rebate",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "gas_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case lists Vermont Gas Systems and annual gas costs."
},
{
"inputKey": "gas_saving_measure_selected",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not yet specify whether the customer is pursuing process hot-water efficiency, condensing equipment, controls, or envelope improvements."
},
{
"inputKey": "process_heat_baseline_known",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is present, but therms, boiler type, process load, and operating schedule are not provided."
}
],
"reasoning": "Potentially relevant for gas-saving measures, but the current scopes are not specific enough to calculate."
},
{
"opportunityId": "generic_vermont_or_utility_commercial_ev_charging_grant",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "charger_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two dual-port Level 2 chargers are a plausible small hospitality project."
},
{
"inputKey": "public_access_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Public access is plausible but not confirmed in the lease or parking facts."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring and no application record is present."
},
{
"inputKey": "network_requirement_met",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Networked charger status depends on selected equipment."
}
],
"reasoning": "Potentially relevant, but should not calculate without application/preapproval status, public-access facts, parking control, and eligible cost."
},
{
"opportunityId": "generic_federal_rural_energy_or_agricultural_producer_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a commercial brewery/restaurant and manufacturing facility rather than a farm."
},
{
"inputKey": "rural_small_business_location_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The address is in Burlington, Vermont; rural eligibility should not be assumed."
}
],
"reasoning": "Do not force rural/agricultural grant qualification merely because the company uses agricultural inputs."
},
{
"opportunityId": "generic_nonprofit_public_sector_clean_energy_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile identifies a commercial business."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is not described as a government, school, or public authority."
}
],
"reasoning": "Public-sector and nonprofit-only grants should be blocked for this profile."
},
{
"opportunityId": "generic_school_energy_improvement_grant",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a brewery/taproom/restaurant and industrial manufacturing space."
}
],
"reasoning": "School-only opportunities are not relevant and should remain blocked."
},
{
"opportunityId": "generic_rooftop_solar_or_storage_grant",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is leased and no roof-control facts are present."
},
{
"inputKey": "system_size_kw_dc",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A conservative test size is provided, but it is not based on a solar layout."
},
{
"inputKey": "battery_kwh",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No battery storage scope is included."
},
{
"inputKey": "interconnection_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application is documented."
}
],
"reasoning": "Should not calculate a positive grant estimate until roof control, system design, interconnection, ownership, and quote inputs are available."
},
{
"opportunityId": "generic_process_water_efficiency_grant_or_rebate",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 2200000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual water/sewer cost is provided and material enough to support water-efficiency screening."
},
{
"inputKey": "water_unit",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile lists water-related fields but not actual annual volume or units."
},
{
"inputKey": "selected_water_measure",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No selected measure such as rinse optimization, pre-rinse spray valves, CIP controls, leak repair, or wastewater pretreatment is defined."
}
],
"reasoning": "Water/sewer costs make this a plausible future project, but grant estimates should remain suppressed until a defined water measure and volume baseline exist."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "vendor_quote_document",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "utility_preapproval_letter",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_id",
"reason": "application not submitted"
},
{
"inputKey": "landlord_written_approval",
"reason": "needs user decision"
},
{
"inputKey": "roof_structural_assessment",
"reason": "needs user decision"
},
{
"inputKey": "solar_interconnection_application",
"reason": "application not submitted"
},
{
"inputKey": "geothermal_site_feasibility_report",
"reason": "unrealistic for this customer"
},
{
"inputKey": "wind_resource_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "commercial_laundry_equipment_inventory",
"reason": "unrealistic for this customer"
},
{
"inputKey": "verified_disadvantaged_community_designation",
"reason": "source requires agency approval"
},
{
"inputKey": "monthly_interval_load_data",
"reason": "needs user decision"
},
{
"inputKey": "annual_water_use_volume",
"reason": "needs user decision"
},
{
"inputKey": "process_heat_load_profile",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The applicant is a private commercial brewery/restaurant, not a nonprofit, school, public entity, tribal entity, or agricultural producer.",
"The site is leased, so roof, exterior envelope, geothermal, solar, wind, major HVAC, and charger parking work require landlord or property-owner approval.",
"No vendor quotes, final equipment selections, application IDs, utility preapproval letters, or interconnection records are present.",
"Rooftop solar, solar thermal, small wind, geothermal, CHP, and biogas scopes are speculative and should not be forced into positive grant estimates.",
"Small wind is unrealistic for this leased urban/industrial site without zoning, site control, and wind-resource evidence.",
"On-site biogas or biomass generation is not supported by feedstock, waste-volume, permitting, or site-control facts.",
"Commercial laundry equipment is not a realistic core measure for a brewery/restaurant unless the user confirms on-site laundry operations.",
"EV charging may be plausible but should not match fleet-only, DC-fast-charging-only, or corridor-specific grants without additional evidence.",
"Water-efficiency opportunities are plausible due to brewery and restaurant use, but no water volume, selected measure, or quote is available."
]
}

