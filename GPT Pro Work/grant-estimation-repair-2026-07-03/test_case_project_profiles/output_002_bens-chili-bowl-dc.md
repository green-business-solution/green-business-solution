{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "bens-chili-bowl-dc",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on supplied test-case facts for a small leased or ownership-uncertain DC restaurant/commercial kitchen in Pepco electric and Washington Gas territory.  Inputs are intended to let grant logic calculate only where project scope, utility customer status, and formula inputs are realistic; several larger renewable, storage, and infrastructure measures should remain suppressed or treated as unlikely for this customer.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied test case already marks the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "no_vendor_quote_yet",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small restaurant exploring multiple retrofit types would normally not have formal quotes for all measures yet."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile is in the exploring stage, so grant applications should generally be treated as not submitted unless later confirmed."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval evidence is supplied, and many utility incentives require preapproval before equipment purchase or installation."
},
{
"inputKey": "utility_customer_class",
"value": "small_commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 3,000 square foot restaurant with 176,000 annual kWh is most realistically treated as a small commercial account for grant-estimation tests."
},
{
"inputKey": "electric_distribution_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case reports Pepco as the electric utility, with deregulated retail supply context but Pepco remaining the distribution utility."
},
{
"inputKey": "gas_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied context lists Washington Gas as the gas provider and includes annual gas cost."
},
{
"inputKey": "building_ownership_status",
"value": "unknown_likely_tenant",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied ownership status is unknown. For an urban restaurant storefront, tenant occupancy is plausible, so landlord consent should be required for capital envelope, roof, HVAC, and electrical work."
},
{
"inputKey": "landlord_consent_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership is uncertain and the project includes measures that could affect roof, building systems, electrical service, or leased premises."
},
{
"inputKey": "nonprofit_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied organization type is Commercial Business, not nonprofit."
},
{
"inputKey": "public_entity_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a private commercial restaurant, not a government entity."
},
{
"inputKey": "school_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building type and NAICS codes identify restaurant and foodservice activity, not a school."
},
{
"inputKey": "agricultural_producer_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Restaurant operations do not make the customer an agricultural producer."
},
{
"inputKey": "tribal_entity_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal entity facts are present in the test case."
},
{
"inputKey": "fleet_owner_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile is a restaurant location, with no fleet operations or vehicle-charging scope indicated."
},
{
"inputKey": "annual_gross_receipts_cents",
"value": 320000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied synthetic tax facts already include annual gross receipts of $3,200,000."
},
{
"inputKey": "direct_property_tax_bill_to_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied tax facts state the applicant does not have a direct property tax bill."
},
{
"inputKey": "lease_property_tax_cam_pass_through_cents",
"value": 3800000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied tax facts include a lease CAM property-tax pass-through amount of $38,000."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace selected dining room, kitchen, storage, and exterior sign/service-area fixtures with LEDs and compatible controls where practical.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost as the synthetic eligible cost for a small fixture replacement scope."
},
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied preview references 12 fixture replacements, which is plausible for a small 3,000 square foot restaurant."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Basic occupancy or scheduling controls are plausible in storage, office, or service areas, but should be confirmed by scope."
},
{
"inputKey": "preapproval_required_before_purchase",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Utility lighting incentives commonly require confirmation or preapproval before installation, so grant estimates should be suppressed if the workflow requires this and status is absent."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Final incentive may require DLC or ENERGY STAR qualified equipment.",
"Preapproval or post-install inspection may be required.",
"Actual fixture wattages and operating hours are not yet confirmed."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace one aging small commercial rooftop or split-system HVAC unit serving dining and prep areas with higher-efficiency equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost as a plausible budgetary cost for one small commercial HVAC replacement."
},
{
"inputKey": "hvac_unit_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 3,000 square foot restaurant might replace one principal unit rather than a multi-unit building system."
},
{
"inputKey": "cooling_capacity_tons",
"value": 5,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Five tons is a conservative synthetic placeholder for a small restaurant zone, but kitchen ventilation loads may make actual capacity different."
},
{
"inputKey": "existing_equipment_condition",
"value": "aging_operational",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes replacement is being explored due to age and energy cost, not emergency failure."
},
{
"inputKey": "quote_required_for_cost",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "HVAC incentives and eligible costs depend heavily on equipment model, capacity, efficiency rating, labor, controls, and existing condition."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Requires equipment-specific efficiency rating and AHRI or manufacturer documentation.",
"Landlord approval may be needed if equipment is roof-mounted or connected to building systems.",
"Gas/electric configuration is not confirmed."
]
},
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "Conduct a targeted small-business energy audit focused on kitchen ventilation, refrigeration, HVAC, lighting, controls, and utility-bill review.",
"inputFacts": [
{
"inputKey": "audit_study_cost_cents",
"value": 250000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $2,500 walk-through or targeted ASHRAE Level 1-style assessment is plausible for a small commercial kitchen."
},
{
"inputKey": "audit_level",
"value": "targeted_small_commercial_energy_assessment",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This scope is more realistic than a full investment-grade audit for a single 3,000 square foot restaurant."
},
{
"inputKey": "utility_bills_available",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied profile includes annual kWh, electric cost, gas cost, water/sewer cost, and waste cost."
},
{
"inputKey": "audit_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit proposal or vendor quote is included in the supplied test case."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some programs may offer no-cost direct assessments rather than reimbursing a paid audit.",
"Estimate should remain suppressed where a program requires an approved auditor or agency authorization."
]
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"projectScopeSummary": "Install a modest energy monitoring package for main electric service and selected kitchen loads such as refrigeration, ventilation, and cooking support equipment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 84800,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost as a small monitoring-system placeholder."
},
{
"inputKey": "metering_points",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Four metering points is plausible for main service plus a few high-use kitchen loads, but actual panel layout is unknown."
},
{
"inputKey": "includes_cloud_dashboard",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A dashboard is typical for small energy monitoring packages, but vendor scope is not confirmed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Monitoring alone often does not qualify unless bundled with controls, commissioning, or verified energy-saving measures.",
"Program rules may require measurement and verification plan details."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Limited weatherization or insulation improvements in accessible roofline, rear service, or storage areas if landlord allows work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost, but actual feasibility is uncertain for a small urban restaurant tenant."
},
{
"inputKey": "treated_area_square_feet",
"value": 900,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes only part of the 3,000 square foot space has accessible envelope area suitable for treatment."
},
{
"inputKey": "landlord_approval_needed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Envelope improvements would generally require owner approval for a leased or ownership-uncertain storefront."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be ineligible or low priority if the tenant does not control the envelope.",
"Existing insulation condition and accessible area are unknown.",
"Restaurant energy use may be dominated by kitchen loads rather than envelope loads."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Explore solar thermal preheating for domestic hot water serving dishwashing and kitchen use, subject to roof access and landlord approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost, but actual scope depends on roof area, structural capacity, and plumbing tie-in feasibility."
},
{
"inputKey": "collector_area_square_feet",
"value": 120,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small collector area is a conservative placeholder for an urban restaurant roof."
},
{
"inputKey": "storage_tank_gallons",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 120 gallon preheat tank is plausible for a small commercial kitchen, but water-heating system details are unknown."
},
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ownership is uncertain and roof access/control is not confirmed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should remain suppressed until roof rights, structural feasibility, and plumbing scope are confirmed.",
"May be less practical than efficient gas or electric water-heating upgrades for a small tenant restaurant.",
"Requires vendor quote and equipment specifications."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Potential small rooftop PV system only if the applicant has roof rights, interconnection permission, and landlord approval.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost, but a $100,000 PV project is large relative to the site and should not be forced to qualify without scope verification."
},
{
"inputKey": "solar_pv_system_kw_dc",
"value": 35,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 35 kW placeholder is conservative relative to 176,000 annual kWh, but roof area and shading are unknown."
},
{
"inputKey": "roof_rights_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant's ownership relationship is unknown and no roof lease or owner consent is supplied."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploratory and no interconnection facts are supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate grant estimates requiring owner control, roof rights, executed contract, or interconnection approval.",
"Tenant status and roof feasibility are unresolved.",
"System size and cost require a solar quote."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Battery storage for short-duration resilience of refrigeration and point-of-sale loads during outages, if electrical service and space allow.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost, but battery cost and eligibility should depend on vendor quote, critical-load design, and any paired solar scope."
},
{
"inputKey": "battery_capacity_kwh",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An 80 kWh system could support limited critical loads, but is a significant investment for a small restaurant."
},
{
"inputKey": "battery_power_kw",
"value": 30,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 30 kW inverter is plausible for selected critical loads but not verified by load study."
},
{
"inputKey": "paired_with_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "PV feasibility is unresolved, so the battery should not be assumed to be paired with solar."
},
{
"inputKey": "critical_loads_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No critical-load panel, load study, or resilience design is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many resilience or storage grants require critical facility status, public benefit, low-income/community resilience designation, solar pairing, or application scoring evidence.",
"This restaurant should not be assumed to qualify for resilience grants without program-specific evidence."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not a realistic near-term fit for this small restaurant absent a detailed engineering study and continuous thermal load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost only as a test placeholder; CHP should generally remain suppressed for this profile."
},
{
"inputKey": "chp_capacity_kw",
"value": 30,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A very small CHP unit is the only plausible scale, but the site lacks confirmed continuous thermal load and mechanical space."
},
{
"inputKey": "continuous_thermal_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The restaurant has gas and hot-water loads, but no engineering study confirms year-round thermal recovery potential."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not cost-effective or program-prioritized for a single 3,000 square foot restaurant.",
"Requires engineering study, utility interconnection review, emissions compliance, and landlord approval."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source geothermal is unrealistic for this dense urban small restaurant unless part of a landlord-led building project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost, but geothermal feasibility is doubtful for this location and tenant profile."
},
{
"inputKey": "ground_loop_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No land, drilling rights, owner approval, or building-wide HVAC conversion facts are supplied."
},
{
"inputKey": "landlord_led_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No evidence indicates a landlord-led geothermal project."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force geothermal eligibility for a likely tenant restaurant.",
"Requires site-control and engineering feasibility evidence."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage is not a realistic standalone measure for this small restaurant absent a specialized refrigeration or HVAC design.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost, but the scope is large and unsupported by project facts."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No chilled-water, ice-storage, or refrigeration thermal-storage design is supplied."
},
{
"inputKey": "demand_response_use_case_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility demand-response enrollment or tariff strategy is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless a vendor design identifies capacity, controlled loads, and demand-management value.",
"Likely excessive complexity for a small restaurant."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas generation is not realistic for this urban restaurant site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost only as a test-case placeholder; the measure should be treated as unlikely or ineligible."
},
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A small restaurant may generate food waste, but not at a scale or form suitable for onsite biomass or biogas energy generation."
},
{
"inputKey": "air_permit_or_waste_permit_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No permitting facts exist and the project is not realistic for this profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Urban restaurant site lacks realistic fuel/feedstock, space, permitting, and operating scale.",
"Should be marked not relevant or likely ineligible rather than estimated."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Microgrid is not a realistic standalone project for this single small restaurant unless part of a broader district or landlord-led resilience project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost, but no project-development facts support a microgrid estimate."
},
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No facts indicate the restaurant is designated as a critical facility or community resilience hub."
},
{
"inputKey": "multi_customer_microgrid",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case describes a single restaurant location, not a campus or district microgrid."
},
{
"inputKey": "microgrid_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study or engineering design is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not estimate microgrid grants without critical-facility, community-benefit, engineering, and application-status evidence.",
"Likely not relevant to a small tenant restaurant profile."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not realistic for this dense urban DC restaurant site.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost only as a test placeholder; this measure should be suppressed."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind resource assessment, tower location, or zoning facts are supplied."
},
{
"inputKey": "zoning_or_roof_mount_feasibility_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A small wind turbine is implausible for a dense urban storefront without explicit zoning and structural confirmation."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely not relevant due to urban location, limited site control, roof constraints, and uncertain wind resource.",
"Do not force renewable-energy grant qualification."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "pepco_dc_small_business_direct_install_or_custom_lighting",
"expectedHandling": "calculate_if_formula_ready",
"inputFacts": [
{
"inputKey": "electric_distribution_utility",
"value": "Pepco",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies Pepco as the electric distribution utility."
},
{
"inputKey": "measure_type",
"value": "led_lighting_retrofit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "LED lighting is a realistic small commercial measure."
},
{
"inputKey": "eligible_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Budgetary cost is available from the test-case preview."
}
],
"reasoning": "This is the most plausible incentive path for the profile, but calculation should still respect preapproval, qualified product, and final fixture count rules."
},
{
"opportunityId": "pepco_dc_small_business_hvac_or_custom_efficiency",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "electric_distribution_utility",
"value": "Pepco",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies Pepco as the electric distribution utility."
},
{
"inputKey": "eligible_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Budgetary cost exists, but equipment model and rated efficiency are not available."
},
{
"inputKey": "equipment_efficiency_documentation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No AHRI, ENERGY STAR, CEE tier, or manufacturer documentation is provided."
}
],
"reasoning": "Commercial HVAC incentives could be relevant, but estimates should remain quote-dependent until equipment specifications and preapproval status are known."
},
{
"opportunityId": "dc_or_utility_energy_audit_small_business_assessment",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "audit_requested",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring; no audit request or appointment is documented."
},
{
"inputKey": "audit_study_cost_cents",
"value": 250000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic estimate for a targeted small commercial audit."
}
],
"reasoning": "An audit is realistic, but some programs provide audits directly or require approval before a reimbursable study is eligible."
},
{
"opportunityId": "dc_commercial_solar_or_srec_related_support",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "solar_pv_system_kw_dc",
"value": 35,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Placeholder sizing only; roof rights and usable roof area are unknown."
},
{
"inputKey": "roof_rights_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owner consent, roof lease, or site-control evidence exists."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection status is provided."
}
],
"reasoning": "Solar may be possible in DC generally, but this customer profile should not receive a grant estimate without roof control, quote, and interconnection facts."
},
{
"opportunityId": "battery_storage_resilience_grant_generic",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The restaurant is not identified as a critical facility, shelter, public service site, or resilience hub."
},
{
"inputKey": "battery_capacity_kwh",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Placeholder sizing only; no critical-load study exists."
}
],
"reasoning": "Battery storage is technically possible but grant probability is unsupported for this profile. Suppress unless a specific program and application basis are added."
},
{
"opportunityId": "microgrid_or_community_resilience_grant_generic",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No critical-facility or community resilience designation is supplied."
},
{
"inputKey": "microgrid_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility or engineering study is supplied."
}
],
"reasoning": "A single small restaurant should not be treated as a realistic microgrid grant applicant without strong additional facts."
},
{
"opportunityId": "usda_reap_or_agricultural_energy_grant_generic",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "agricultural_producer_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a restaurant/commercial kitchen, not an agricultural producer or rural small business based on the supplied profile."
},
{
"inputKey": "site_type",
"value": "restaurant_foodservice",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile identifies the site as restaurant_foodservice."
}
],
"reasoning": "Agricultural or rural-energy grant pathways should not be forced for this urban DC restaurant."
},
{
"opportunityId": "public_nonprofit_school_energy_grant_generic",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "nonprofit_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a commercial business."
},
{
"inputKey": "public_entity_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is not a public entity."
},
{
"inputKey": "school_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is not a school."
}
],
"reasoning": "Programs limited to public, nonprofit, or school applicants should be marked ineligible."
},
{
"opportunityId": "dc_green_bank_or_private_financing_referral",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "seeking_grant_not_financing",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case is for grant estimation, not debt or lease financing."
}
],
"reasoning": "Financing referrals may be useful commercially but should not be represented as grant awards."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "signed_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "equipment_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "utility_rebate_preapproval_id",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_confirmation_number",
"reason": "application not submitted"
},
{
"inputKey": "agency_award_probability_score",
"reason": "source requires agency approval"
},
{
"inputKey": "roof_rights_or_owner_consent_document",
"reason": "needs user decision"
},
{
"inputKey": "solar_interconnection_approval",
"reason": "application not submitted"
},
{
"inputKey": "battery_critical_load_study",
"reason": "quote not available"
},
{
"inputKey": "microgrid_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "ground_source_geothermal_borefield_design",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_feedstock_supply_contract",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The applicant is a private commercial restaurant, not a nonprofit, public entity, school, tribal entity, agricultural producer, or critical facility based on supplied facts.",
"Ownership and roof control are unknown, so solar PV, solar water heating, roof-mounted equipment, envelope work, and major electrical projects need landlord consent before eligibility is assumed.",
"The project is in the exploring stage with no submitted applications or preapproval identifiers.",
"Most large capital measures lack vendor quotes, model numbers, efficiency ratings, interconnection status, or engineering studies.",
"Urban site constraints make small wind, biomass or biogas, ground-source geothermal, and standalone microgrid projects unrealistic for this customer.",
"Battery storage and resilience grants should be suppressed unless a specific program supports private restaurant resilience projects and the customer has critical-load documentation or community-benefit evidence.",
"Financing, tax credits, SRECs, or utility bill savings should not be converted into grant estimates unless the underlying opportunity is actually a grant or rebate with a formula-ready calculation."
]
}

