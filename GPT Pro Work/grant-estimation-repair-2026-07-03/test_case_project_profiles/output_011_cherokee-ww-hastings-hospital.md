{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "cherokee-ww-hastings-hospital",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied Prompt 11 test-case facts for a tribal healthcare campus in Tahlequah, OK. Public-source verification was not performed; values marked synthetic_realistic_default or derived_* are planning assumptions for grant-estimation tests, not customer-provided facts. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_is_tribal_government_or_tribal_instrumentality",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile describes the site as a Cherokee Nation tribal healthcare campus and existing tax facts already mark tribal_government_tax_status as true."
},
{
"inputKey": "organization_is_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the organization type as Government / Public Agency."
},
{
"inputKey": "organization_is_nonprofit_501c3",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A tribal health facility may not be a conventional 501(c)(3); grant logic should not assume nonprofit status without documentation."
},
{
"inputKey": "site_control_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied ownershipStatus is Own, so site-control-dependent grants can proceed unless a grant requires a specific deed, lease, or tribal resolution."
},
{
"inputKey": "building_owner_occupied",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tribal hospital campus is realistically owner-operated rather than a leased tenant space."
},
{
"inputKey": "healthcare_critical_load_site",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing tax facts include healthcare_critical_load=true and the source form describes hospital, emergency care, pharmacy, laboratory, and clinical operations."
},
{
"inputKey": "electric_customer_class",
"value": "large_commercial_or_public_institutional",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 469,000-square-foot hospital campus with 12.62 million annual kWh would normally be served on a large commercial, public authority, or institutional rate class."
},
{
"inputKey": "electric_utility_is_municipal_or_public_power",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile identifies Tahlequah Public Works Authority as the electric provider, but the current utility match is still self_reported_unverified."
},
{
"inputKey": "electric_utility_verification_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The normalized profile marks the distribution utility verificationStatus as self_reported_unverified."
},
{
"inputKey": "gas_utility_provider",
"value": "Oklahoma Natural Gas",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form lists Oklahoma Natural Gas, but the notes flag gas-utility uncertainty."
},
{
"inputKey": "gas_utility_verification_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The test-case notes explicitly mention gas-utility uncertainty."
},
{
"inputKey": "annual_kwh",
"value": 12620000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied siteEnergyProfile includes annualKwh of 12,620,000."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 121248000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied siteEnergyProfile includes annualElectricCost of $1,212,480."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 103096000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied utilitySummaries include annual gas cost of $1,030,960."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 9.61,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied siteEnergyProfile averageCostPerKwh is 0.0961 dollars per kWh."
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
"value": "pre_rfp_budgeting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a large public/tribal healthcare campus at exploring stage, the realistic next step is feasibility scoping and pre-RFP budgeting rather than vendor selection."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or award facts are supplied, and the project is still exploring."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval is included in the test case; many grant and rebate estimates should remain conditional until preapproval status is confirmed."
},
{
"inputKey": "has_formal_vendor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring and retrofit summaries use admin-modeled preview costs, not quote-backed costs."
},
{
"inputKey": "sam_registration_active",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Federal and tribal grant programs may require SAM.gov registration, but the test case does not supply UEI or SAM status."
},
{
"inputKey": "unique_entity_id_uei_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not include a UEI, which should remain unknown for federal application readiness tests."
},
{
"inputKey": "governing_body_resolution_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tribal public healthcare campus would typically need formal authorization for major capital grant applications or financing."
},
{
"inputKey": "governing_body_resolution_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No governing-body approval is supplied and the project remains at exploring stage."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Campus-wide interior and exterior LED conversion for high-use clinical, outpatient, parking, corridor, and administrative areas. Scope is realistic for a hospital campus but larger than the admin preview's 12-fixture placeholder.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 74500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 469,000-square-foot healthcare campus could plausibly have a six-figure to low-seven-figure lighting project; this cost reflects a moderate partial-to-campus-wide retrofit rather than the placeholder preview."
},
{
"inputKey": "fixture_count",
"value": 3850,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hospitals and outpatient buildings have dense lighting in exam rooms, corridors, offices, back-of-house, and exterior areas."
},
{
"inputKey": "average_operating_hours_per_year",
"value": 5100,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hospital clinical and common areas operate long hours, but not every space is 24/7."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A realistic healthcare lighting scope would include occupancy/daylight controls where allowed by code and clinical operations."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 960000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This assumes roughly 7.6% of annual site electricity use is saved through LED and controls."
},
{
"inputKey": "requires_vendor_quote_for_final_incentive",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Fixture counts, fixture types, labor conditions, infection-control requirements, and utility forms should be quote-backed."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility or grant formulas may require preapproval before installation.",
"Healthcare infection-control and after-hours labor costs could materially change eligible cost.",
"If the municipal electric provider has no commercial lighting rebate, the project may have no local utility incentive."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Phased replacement of aging packaged rooftop units, air handlers, pumps, and controls serving outpatient, administrative, and support spaces; excludes specialized hospital systems that require separate engineering.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 385000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large healthcare HVAC upgrades are commonly multi-million-dollar projects; this represents a phased project rather than full central-plant replacement."
},
{
"inputKey": "hvac_units_replaced",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large hospital/outpatient campus can plausibly have numerous rooftop units and air-handling systems."
},
{
"inputKey": "total_cooling_capacity_tons_affected",
"value": 720,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cooling tonnage is a rough planning estimate; final values require mechanical schedules."
},
{
"inputKey": "building_automation_controls_upgrade_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controls upgrades are realistic for achieving measurable savings in a large healthcare facility."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 1180000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This assumes roughly 9.4% electric savings from targeted HVAC and controls improvements."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 82000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Gas savings are directionally plausible but annual therms were not supplied, so the value should be overridden by bills or an audit."
},
{
"inputKey": "requires_engineering_study",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Healthcare HVAC incentive and grant estimates should require equipment schedules, baseline efficiency, ventilation constraints, and stamped engineering scope."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Savings and eligible costs should remain provisional until equipment-specific efficiency and baseline data are collected.",
"Some incentives may exclude replacement-in-kind or require early replacement documentation.",
"Critical-care HVAC constraints may limit practical equipment choices."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Feasibility-stage geothermal heat-pump concept for a new or substantially renovated outpatient wing; not assumed to replace the entire hospital central plant.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 640000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Campus-scale geothermal can be very expensive; this planning cost is intentionally uncertain pending geotechnical and loop-field design."
},
{
"inputKey": "geothermal_capacity_tons",
"value": 500,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial-campus system is more realistic than a full campus conversion, but final capacity requires an engineering study."
},
{
"inputKey": "loop_field_type",
"value": "vertical_closed_loop",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Vertical closed-loop is a plausible planning assumption for a dense healthcare campus where horizontal land area may be limited."
},
{
"inputKey": "geotechnical_or_test_well_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring and no test-well information is supplied."
},
{
"inputKey": "requires_feasibility_study_before_estimate",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Grant estimates should not use a firm geothermal cost or capacity without geotechnical and mechanical feasibility work."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially eligible for some clean-energy or tribal infrastructure programs, but the current project is too undefined for a reliable estimate.",
"Space constraints, drilling conditions, hospital downtime, and central-plant integration could make this impractical."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Battery energy storage for critical-load resilience supporting emergency, pharmacy, laboratory, IT, and selected outpatient operations; designed to coordinate with existing generators rather than replace full backup generation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 248000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A multi-MWh battery system for a hospital critical-load subset is plausibly a multi-million-dollar resilience project."
},
{
"inputKey": "battery_power_kw",
"value": 1200,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This is sized for critical-load support, not whole-campus backup."
},
{
"inputKey": "battery_energy_kwh",
"value": 3600,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Three hours at 1.2 MW is a reasonable planning assumption for resilience and generator-bridging use cases."
},
{
"inputKey": "critical_load_kw_served",
"value": 950,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical load is lower than total campus peak and focuses on emergency, pharmacy, lab, IT, and essential clinical loads."
},
{
"inputKey": "backup_generator_integration_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hospitals commonly rely on generators; a battery project would realistically integrate with existing emergency power systems."
},
{
"inputKey": "is_standalone_storage",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No solar PV scope is supplied; the storage case should be tested as standalone unless the user adds generation."
},
{
"inputKey": "requires_interconnection_study",
"value": true,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Municipal utility interconnection and protection requirements should remain a gating item."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Resilience and tribal/public-health programs may be relevant, but incentive value depends on program rules, application timing, and whether standalone storage is eligible.",
"Medical critical-load documentation, one-line diagrams, and interconnection approval are needed before a firm estimate."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Critical-load microgrid concept combining battery storage, existing generator controls, transfer equipment, switchgear, and supervisory controls for hospital resilience.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 515000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Hospital microgrids require engineering, switchgear, controls, protection, and commissioning; the cost is highly scope-dependent."
},
{
"inputKey": "microgrid_serves_critical_facility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile describes healthcare critical-load resilience."
},
{
"inputKey": "microgrid_generation_kw",
"value": 1200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "This planning input assumes the microgrid uses the same 1.2 MW battery/inverter backbone plus generator integration; final generation assets are not defined."
},
{
"inputKey": "battery_energy_kwh",
"value": 3600,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The microgrid concept reuses the battery storage planning size."
},
{
"inputKey": "includes_new_solar_pv",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar PV is not listed in the current retrofit summaries, so the microgrid should not assume solar generation."
},
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A true microgrid requires controls capable of islanding and reconnection."
},
{
"inputKey": "utility_islanding_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No municipal utility approval is supplied; microgrid estimates should remain conditional."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"High strategic fit for tribal healthcare resilience, but many grants require a defined scope, utility coordination, benefit-cost narrative, and application approval.",
"Do not calculate a firm grant unless a program formula accepts planning-level microgrid costs."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Natural-gas CHP feasibility case for baseload electricity and heat recovery serving hospital domestic hot water, sterilization, reheat, or central plant loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 410000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A hospital-scale CHP plant is plausible given high electric and gas usage, but cost depends heavily on capacity, emissions controls, and heat-recovery design."
},
{
"inputKey": "chp_capacity_kw",
"value": 1000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 1 MW CHP unit is a conservative partial-load planning size for a campus using 12.62 million kWh annually."
},
{
"inputKey": "fuel_type",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile lists Oklahoma Natural Gas and significant annual gas cost."
},
{
"inputKey": "annual_runtime_hours",
"value": 6500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hospital baseload operations can support high annual CHP runtime, subject to thermal-load verification."
},
{
"inputKey": "useful_thermal_load_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile provides gas cost but not steam/hot-water load profiles, so useful heat recovery cannot be confirmed."
},
{
"inputKey": "emissions_permitting_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": false,
"reasoning": "A hospital-scale natural-gas generator or CHP system would normally require air-permitting review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP may support resilience but is fossil-fuel-based and may be ineligible for many clean-energy grant programs.",
"Should not be forced into renewable-electricity incentives unless the actual program allows natural-gas CHP."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Public and fleet-facing EV charging for patients, staff, tribal health fleet vehicles, and visitor parking, with a mix of Level 2 ports and make-ready electrical work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 112000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A hospital-campus EV charging project with civil/electrical make-ready work can exceed the admin preview cost."
},
{
"inputKey": "level_2_ports",
"value": 24,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Twenty-four Level 2 ports is a realistic planning quantity for a large hospital campus serving staff, patients, and fleet vehicles."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fast-charging scope is supplied; Level 2 is the safer planning assumption."
},
{
"inputKey": "fleet_owner_or_operator",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tribal health system likely operates community health, administrative, or facilities vehicles, but fleet size should be confirmed."
},
{
"inputKey": "public_access_charging",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Hospital parking is typically accessible to patients and visitors, but user should confirm whether chargers will be restricted."
},
{
"inputKey": "utility_make_ready_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility approval or interconnection record is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"EV charger grants often depend on public access, disadvantaged/community benefit criteria, fleet commitments, charger network requirements, and preapproval.",
"Final estimate should require utility make-ready review and vendor quote."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Level 2-only version of the EV charger scope for patient, staff, visitor, and fleet parking.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 112000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the same planning scope as ev_charger_installation when the measure taxonomy separates generic EV charging from Level 2-only charging."
},
{
"inputKey": "charger_ports",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the Level 2 port count in the broader EV charging scope."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Grant-funded public or fleet chargers commonly require networked charging and usage reporting."
},
{
"inputKey": "ada_accessible_spaces_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hospital visitor-facing EV charging should include accessible design considerations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Avoid double-counting this with ev_charger_installation; it is the same assumed scope expressed under a narrower retrofit type.",
"Application status and utility make-ready data remain missing."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal domestic-hot-water preheat serving laundry, kitchen, patient-care, and clinical support loads where practical.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 96000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A hospital may have significant hot-water demand, but solar thermal scope and roof suitability are not supplied."
},
{
"inputKey": "collector_area_square_feet",
"value": 2600,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Collector area is a placeholder for a moderate system and should not be treated as quote-backed."
},
{
"inputKey": "storage_tank_gallons",
"value": 3000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large healthcare domestic-hot-water preheat systems commonly require thermal storage."
},
{
"inputKey": "roof_or_ground_mount_area_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No roof structural, shading, or available-area data is provided."
},
{
"inputKey": "domestic_hot_water_load_profile_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes gas costs but not water-heating interval data."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be eligible for some renewable thermal programs, but practical adoption is uncertain for this campus without hot-water load and roof/structural data.",
"Should not produce a confident estimate without engineering and site-layout inputs."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Replacement of pharmacy, laboratory, nutrition-service, and cold-storage refrigeration equipment with ENERGY STAR or high-efficiency models and controls.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 34500000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview lists an upfront cost of 345,000 dollars for refrigeration equipment."
},
{
"inputKey": "refrigeration_units_replaced",
"value": 34,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large hospital campus can plausibly have dozens of pharmacy, lab, dietary, and support refrigeration units."
},
{
"inputKey": "includes_medical_or_lab_cold_storage",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form describes pharmacy and laboratory operations."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 112000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A moderate savings estimate is plausible for replacing inefficient refrigerators, freezers, and controls across a large healthcare site."
},
{
"inputKey": "medical_grade_equipment_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Pharmacy and laboratory refrigeration may require medical-grade equipment, which can affect eligibility and costs."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some utility programs may only cover commercial food-service refrigeration, not medical-grade cold storage.",
"Final estimate should require equipment model numbers and baseline equipment age."
]
},
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "ASHRAE Level 2 energy audit with targeted Level 3 feasibility addenda for microgrid, battery storage, HVAC controls, and geothermal alternatives.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 14500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A detailed audit and resilience feasibility scope for a 469,000-square-foot healthcare campus can reasonably cost around $145,000."
},
{
"inputKey": "audit_level",
"value": "ashrae_level_2_with_targeted_level_3",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring, so a detailed audit is a realistic precursor to capital work."
},
{
"inputKey": "includes_resilience_assessment",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case emphasizes healthcare critical-load resilience."
},
{
"inputKey": "audit_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is pre-RFP/exploring and no vendor is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Planning grants may be relevant, but reimbursement could require application approval before contracting.",
"Audit costs should not be treated as awarded without a selected program and application status."
]
},
{
"retrofitTypeId": "building_benchmarking_compliance",
"projectScopeSummary": "Energy benchmarking and data-management setup for internal governance and potential grant reporting; not assumed to be driven by a local benchmarking ordinance.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 2400000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Benchmarking setup for a complex campus could include meter mapping, ENERGY STAR Portfolio Manager setup, and reporting support."
},
{
"inputKey": "benchmarking_required_by_local_law",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No Oklahoma or Tahlequah benchmarking mandate is included in the profile, so compliance should not be assumed."
},
{
"inputKey": "portfolio_manager_account_exists",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not include existing benchmarking records."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Benchmarking alone is usually a low-cost administrative action and may not qualify for capital grants.",
"Do not force grant eligibility unless a specific planning or technical-assistance program covers it."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Chilled-water or thermal storage feasibility option to reduce peak demand and improve cooling resilience for clinical and outpatient loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 551000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview lists $5,510,000, but no central-plant details or storage technology are supplied."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 4200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ton-hours are a rough planning placeholder for a partial-campus chilled-water storage project."
},
{
"inputKey": "demand_response_participation_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Municipal utility demand-response availability is not supplied."
},
{
"inputKey": "central_chilled_water_plant_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The building type suggests chilled-water systems may exist, but the test case does not confirm central plant configuration."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May be viable as a resilience or peak-load project, but not enough scope detail exists for a reliable grant estimate.",
"Requires central-plant confirmation, rate structure, demand charges, and engineering design."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine concept only; not a realistic near-term hospital-campus project without land, zoning, FAA, interconnection, and wind-resource analysis.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview lists a placeholder cost, but the site has no supplied wind-resource, tower-height, land, or siting data."
},
{
"inputKey": "wind_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No turbine size should be assumed for a hospital campus without siting analysis."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No assessment is supplied and the project is exploring."
},
{
"inputKey": "campus_siting_constraints_likely",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Hospital campuses often face height, setback, aviation, noise, vibration, and land-use constraints."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force qualification; wind is unlikely to be a priority or practical project for this healthcare campus without strong evidence.",
"Suppress until user provides a real wind scope and feasibility documentation."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy system considered not realistic for this hospital campus because no feedstock, digester, landfill gas, wastewater treatment, or agricultural operation is supplied.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Although the preview includes a placeholder cost, there is no realistic project basis for a biomass/biogas system at this hospital campus."
},
{
"inputKey": "qualifying_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile describes healthcare operations, not agriculture, wastewater treatment, landfill gas, or food-processing feedstock."
},
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The NAICS and activity text are healthcare and public administration, not agricultural production."
},
{
"inputKey": "wastewater_or_landfill_gas_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wastewater treatment plant or landfill gas asset is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate biomass/biogas grants without evidence of feedstock control and a real energy-conversion project.",
"Healthcare food waste alone should not be assumed sufficient for an energy-grade biogas project."
]
},
{
"retrofitTypeId": "fuel_cell_system",
"projectScopeSummary": "Fuel-cell system treated as a speculative resilience option only; no hydrogen, renewable fuel, vendor quote, or interconnection basis is supplied.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview lists a placeholder cost, but there is no realistic selected fuel-cell scope."
},
{
"inputKey": "fuel_cell_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity should not be assumed without vendor or engineering input."
},
{
"inputKey": "renewable_hydrogen_or_biogas_fuel_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No renewable fuel supply is included in the profile."
},
{
"inputKey": "natural_gas_fuel_cell_under_consideration",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not state that a fuel-cell vendor or gas-fueled system is under consideration."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force a positive estimate for fuel cells without a real scope and fuel pathway.",
"Many clean-energy grants may restrict fossil-fueled fuel cells."
]
}
],
"grantOpportunitySpecificInputs": [
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
"reasoning": "The supplied existing opportunity-specific input suppresses Michigan Renewable Energy Renaissance Zone treatment because the site is in Oklahoma and has no Michigan zone designation."
},
{
"inputKey": "site_state_code",
"value": "OK",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The normalized profile gives stateCode as OK."
}
],
"reasoning": "Keep suppressed. This profile should not be made eligible for a Michigan-specific property-tax program."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "municipality",
"value": "Tahlequah, OK",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied opportunity-specific input already identifies the municipality as Tahlequah, OK."
},
{
"inputKey": "site_state_code",
"value": "OK",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The profile is not in Rhode Island."
}
],
"reasoning": "Keep suppressed. Rhode Island renewable property-tax valuation is not relevant to an Oklahoma tribal healthcare campus."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "not_applicable_out_of_state_and_no_synthetic_solar_manufacturing_activity",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The existing input suppresses Washington solar-manufacturing B&O treatment because the site is in Oklahoma and the profile has no solar manufacturing activity."
},
{
"inputKey": "site_state_code",
"value": "OK",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The normalized profile gives stateCode as OK."
}
],
"reasoning": "Keep suppressed. The organization is a healthcare campus, not a Washington solar manufacturer."
},
{
"opportunityId": "RETROFI_GENERIC_TRIBAL_ENERGY_RESILIENCE_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "tribal_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case identifies a tribal healthcare campus."
},
{
"inputKey": "critical_healthcare_facility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing facts and activity text support critical healthcare use."
},
{
"inputKey": "resilience_project_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Battery and microgrid scopes are planning concepts and do not include final design documents."
},
{
"inputKey": "preliminary_project_cost_cents",
"value": 515000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the microgrid planning cost for screening only; quote required for grant calculations."
}
],
"reasoning": "The profile is a strong conceptual match for tribal healthcare resilience, but the scope is not application-ready."
},
{
"opportunityId": "RETROFI_GENERIC_UTILITY_CUSTOM_LIGHTING_OR_HVAC_REBATE",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "electric_utility_provider",
"value": "Tahlequah Public Works Authority",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form lists the municipal electric provider."
},
{
"inputKey": "customer_class",
"value": "large_commercial_or_public_institutional",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "High annual kWh and facility type support a large nonresidential customer classification."
},
{
"inputKey": "preapproval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": false,
"reasoning": "Utility rebate estimates should remain conditional until the program's preapproval rules are known."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval is supplied."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The current costs are modeled, not quote-backed."
}
],
"reasoning": "Lighting, HVAC, and refrigeration projects are plausible, but municipal utility program details and preapproval status are not confirmed."
},
{
"opportunityId": "RETROFI_GENERIC_EV_CHARGING_GRANT_OR_MAKE_READY",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "level_2_ports",
"value": 24,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Twenty-four Level 2 ports is a realistic campus charging scope."
},
{
"inputKey": "public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Hospital visitor parking may support public access, but restrictions need confirmation."
},
{
"inputKey": "fleet_use",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tribal healthcare organization likely has fleet or staff-use charging needs."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application status is supplied."
},
{
"inputKey": "utility_make_ready_approval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility make-ready approval is supplied."
}
],
"reasoning": "EV charging is plausible for a hospital campus, but grant handling should require public-access rules, application status, and make-ready approval."
},
{
"opportunityId": "RETROFI_GENERIC_ENERGY_AUDIT_TECHNICAL_ASSISTANCE",
"expectedHandling": "calculate_if_formula_ready",
"inputFacts": [
{
"inputKey": "audit_cost_cents",
"value": 14500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large healthcare-campus ASHRAE Level 2 audit with resilience addenda is plausibly around $145,000."
},
{
"inputKey": "audit_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor is supplied, but planning-grant formulas may still estimate based on modeled audit cost."
},
{
"inputKey": "audit_includes_resilience",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case is explicitly about healthcare critical-load resilience."
}
],
"reasoning": "Audit or technical-assistance support is a realistic first grant-estimation case because the customer is still exploring and needs scope definition."
},
{
"opportunityId": "RETROFI_GENERIC_AGRICULTURAL_RENEWABLE_ENERGY_GRANT",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied NAICS and activity text are healthcare and public administration."
},
{
"inputKey": "rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The organization is a tribal/public healthcare entity, not a small business."
}
],
"reasoning": "Do not force agricultural or small-business grant eligibility for this profile."
},
{
"opportunityId": "RETROFI_GENERIC_RENEWABLE_BIOMASS_OR_BIOGAS_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "qualifying_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No agricultural, landfill, wastewater, or industrial organic feedstock source is supplied."
},
{
"inputKey": "feedstock_control_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feedstock contract, digester ownership, or gas rights are supplied."
}
],
"reasoning": "Suppress biomass/biogas estimates unless the user provides a real feedstock and project scope."
},
{
"opportunityId": "RETROFI_GENERIC_CLEAN_ENERGY_TAX_CREDIT_DIRECT_PAY",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "tax_exempt_or_governmental_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing facts suggest tribal government tax-exempt or non-taxable status, but legal review is required."
},
{
"inputKey": "direct_pay_elective_payment_intent",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not state whether the organization intends to pursue elective pay or tax credits."
},
{
"inputKey": "eligible_clean_energy_property_selected",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Battery, geothermal, fuel cell, and solar thermal concepts are not sufficiently defined for tax-credit classification."
},
{
"inputKey": "prevailing_wage_apprenticeship_plan_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No labor-compliance plan is supplied."
}
],
"reasoning": "Do not calculate tax-credit-like grants or elective-pay estimates until a qualifying technology, ownership, placed-in-service path, and labor-compliance facts are known."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "formal_vendor_quote",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "baseline_equipment_efficiency",
"reason": "needs user decision"
},
{
"inputKey": "preapproval_or_reservation_number",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_submittal_date",
"reason": "application not submitted"
},
{
"inputKey": "grant_award_notice",
"reason": "application not submitted"
},
{
"inputKey": "utility_interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "utility_make_ready_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "microgrid_islanding_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "sam_registration_status",
"reason": "needs user decision"
},
{
"inputKey": "unique_entity_id_uei",
"reason": "needs user decision"
},
{
"inputKey": "governing_body_resolution",
"reason": "source requires agency approval"
},
{
"inputKey": "geothermal_test_well_results",
"reason": "quote not available"
},
{
"inputKey": "central_plant_mechanical_schedules",
"reason": "needs user decision"
},
{
"inputKey": "hospital_critical_load_study",
"reason": "quote not available"
},
{
"inputKey": "roof_structural_capacity_for_solar_thermal",
"reason": "quote not available"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "fuel_cell_fuel_supply_contract",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"Do not make out-of-state DSIRE opportunities qualify; the site is in Oklahoma, not Michigan, Rhode Island, Washington, or any other mismatched state.",
"Do not treat the tribal healthcare campus as a residential, multifamily, school, agricultural producer, rural small business, or solar manufacturer profile.",
"Do not assume nonprofit 501(c)(3) status; tribal government or tribal instrumentality status is the supported applicant type from the supplied facts.",
"Do not calculate biomass or biogas incentives without feedstock control, digester/landfill/wastewater assets, and a real project scope.",
"Do not calculate small-wind incentives without wind-resource assessment, tower siting, aviation/zoning review, and interconnection feasibility.",
"Do not calculate geothermal incentives as firm estimates without test-well, loop-field design, and mechanical integration study.",
"Do not treat natural-gas CHP as renewable electricity unless a specific program explicitly allows it.",
"Do not include battery storage, microgrid, EV charging, or utility rebate values in user-facing totals before application/preapproval and utility approval facts are known.",
"Do not use the admin preview fixture count or placeholder costs as final quote-backed values for a hospital campus.",
"Do not assume property-tax abatements are monetizable where the site may be tribal-government exempt or non-taxable and jurisdiction review is required."
]
}

