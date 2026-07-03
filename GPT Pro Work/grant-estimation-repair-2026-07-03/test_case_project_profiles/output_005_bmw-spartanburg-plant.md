{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "bmw-spartanburg-plant",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-estimation enrichment built from the supplied BMW Spartanburg industrial test case, using realistic planning assumptions for a large privately owned automotive manufacturing campus. This profile should not force positive grant estimates; several measures should remain suppressed pending quote, application, route-corridor, equipment, or agency-award evidence. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "industrial",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is described as a large automotive manufacturing campus with NAICS 336111 and very high annual electric use."
},
{
"inputKey": "for_profit_business",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "BMW Manufacturing Co. is treated as a private for-profit industrial applicant, not a public, nonprofit, school, or residential customer."
},
{
"inputKey": "nonprofit_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large automotive manufacturing operations would not normally claim nonprofit applicant status."
},
{
"inputKey": "public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is not a municipal, state, federal, or public-school facility."
},
{
"inputKey": "school_or_education_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity is automotive manufacturing, assembly, painting, logistics, testing, and campus operations."
},
{
"inputKey": "tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied test-case facts indicate tribal ownership or tribal government status."
},
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Automotive manufacturing is not an agricultural production activity."
},
{
"inputKey": "facility_owner_controls_energy_systems",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile says the organization owns the site, so landlord approval should not be a normal blocker."
},
{
"inputKey": "electric_utility_customer_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Duke Energy Carolinas is self-reported and mapped as a territory candidate, but the utility verification status remains self-reported and unverified."
},
{
"inputKey": "electric_utility_provider",
"value": "Duke Energy Carolinas",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly supplies Duke Energy Carolinas, but final incentive calculations should still allow bill-based verification."
},
{
"inputKey": "gas_utility_provider",
"value": "Piedmont Natural Gas",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case explicitly supplies Piedmont Natural Gas as the gas provider."
},
{
"inputKey": "annual_kwh",
"value": 422500000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Use the supplied synthetic energy profile as a planning load basis until utility bills are uploaded."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 3463500000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Converted from the supplied annual electric cost of $34,635,000."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 1104720000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Converted from the supplied annual gas cost of $11,047,200."
},
{
"inputKey": "building_square_footage",
"value": 8000000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile states an eight-million-square-foot industrial manufacturing campus."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "conceptual_budgeting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At the exploring stage, a large industrial campus would normally be comparing feasibility screens and budgetary ranges rather than final bids."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application submission, award notice, reservation, or preapproval facts are supplied."
},
{
"inputKey": "grant_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Grant estimates requiring agency preapproval should remain suppressed unless preapproval evidence is provided."
},
{
"inputKey": "has_internal_fleet_operations",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large automotive manufacturing campus plausibly operates internal fleet, logistics, employee, visitor, and supplier vehicle activity."
},
{
"inputKey": "fleet_electrification_plan_adopted",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fleet ownership is plausible, but no project-specific fleet electrification commitment is supplied."
},
{
"inputKey": "disadvantaged_community_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No census tract, Justice40, low-income community, or disadvantaged-community designation is supplied."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Budgetary installation of fleet, employee, visitor, and logistics-area charging at a private industrial campus, including make-ready electrical work and a small number of DC fast-charging ports.",
"inputFacts": [
{
"inputKey": "charger_site_use_case",
"value": "private_campus_fleet_employee_visitor",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A manufacturing campus would more likely start with private fleet and workplace charging than public corridor charging."
},
{
"inputKey": "public_access_24_7",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Industrial campuses commonly restrict access for security and traffic control, which may limit NEVI eligibility."
},
{
"inputKey": "level2_ports",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eighty Level 2 ports is a plausible pilot-scale deployment for a site with thousands of employees without assuming full campus conversion."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small four-port DC fast-charging installation is plausible for fleet, visitor, or demonstration charging."
},
{
"inputKey": "dc_fast_charger_power_kw_each",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "150 kW per DC port is a common planning assumption for non-heavy-duty DC fast charging."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 185000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Includes budgetary charger hardware, trenching, electrical gear, networking, engineering, and commissioning for a mixed Level 2 and DCFC deployment."
},
{
"inputKey": "final_vendor_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Grant calculations based on actual eligible cost should wait for a contractor or vendor quote."
},
{
"inputKey": "located_on_designated_alternative_fuel_corridor",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "NEVI-style eligibility typically depends on corridor and public-access facts not supplied by the test case."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Private restricted-access workplace and fleet charging should not be assumed eligible for public-corridor NEVI funding.",
"A formula should suppress or flag the estimate until public-access, corridor, minimum-power, application-round, and agency-award facts are known.",
"If the project is redesigned as publicly accessible corridor charging, eligibility could change."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Phased replacement of aging rooftop and air-handling equipment serving administrative, cafeteria, locker, training, and support spaces rather than the full manufacturing process load.",
"inputFacts": [
{
"inputKey": "conditioned_area_sqft",
"value": 850000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Only a minority of an automotive campus is assumed to be conventional comfort-conditioned office/support space."
},
{
"inputKey": "hvac_units_replaced",
"value": 36,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A phased replacement of 36 packaged and built-up units is plausible for support areas on a very large campus."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 2400,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The assumed capacity is sized for support-space HVAC, not the entire 8,000,000-square-foot manufacturing campus."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1420000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large industrial HVAC replacements include equipment, structural/electrical work, controls integration, crane work, and commissioning."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 4800000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest savings assumption relative to 422.5 million annual kWh avoids overstating process-load impacts."
},
{
"inputKey": "equipment_efficiency_documentation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No AHRI certificates, model numbers, baseline efficiencies, or final equipment submittals are supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility or grant formulas should require equipment-specific efficiency data and final invoices before calculating a firm incentive.",
"Savings should not be scaled to the whole-campus process load."
]
},
{
"retrofitTypeId": "hvac_controls_retrofit",
"projectScopeSummary": "Building automation upgrades and scheduling/optimization for air handlers, makeup air systems, exhaust fans, support-space HVAC, and central monitoring.",
"inputFacts": [
{
"inputKey": "controlled_floor_area_sqft",
"value": 1200000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Controls are assumed for major support and ventilation systems, not all process equipment."
},
{
"inputKey": "control_points_added_or_recommissioned",
"value": 2600,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Thousands of points are realistic for a campus-scale controls integration project."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 620000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Includes controls hardware, programming, network integration, commissioning, trending, and project management."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Performance-based grants or custom incentives should require an M&V plan or trend data."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 6500000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Controls savings are plausible but should remain conservative until a controls audit or trend analysis is available."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Custom incentives should require baseline operating schedules, trend logs, and eligible-cost detail.",
"Controls savings should be capped to avoid claiming process-production improvements as building HVAC savings."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Targeted high-bay, exterior, warehouse, and parking-area LED replacement in remaining non-LED zones rather than assuming the entire campus still uses legacy lighting.",
"inputFacts": [
{
"inputKey": "fixtures_replaced",
"value": 6200,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial-campus retrofit of thousands of fixtures is realistic for an 8,000,000-square-foot site; the preview count of 12 should not be used for this profile."
},
{
"inputKey": "average_watts_existing",
"value": 405,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing fixtures are assumed to include high-bay HID/fluorescent and exterior lighting."
},
{
"inputKey": "average_watts_proposed",
"value": 185,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Proposed fixtures are assumed to be high-efficiency LED high-bay and exterior fixtures."
},
{
"inputKey": "annual_operating_hours",
"value": 5200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Extended production, logistics, and security schedules justify above-office operating hours without assuming every fixture runs continuously."
},
{
"inputKey": "lighting_controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A modern industrial lighting retrofit would commonly include occupancy/daylight controls in appropriate zones."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 980000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Includes fixture procurement, lift labor, controls, electrical work, disposal, and commissioning for a large partial-campus project."
},
{
"inputKey": "final_lighting_audit_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Fixture schedules and baseline wattages should be verified before an incentive estimate is finalized."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Lighting incentives should require fixture schedule, baseline wattage, proposed wattage, and controls documentation.",
"Estimates should not use the small admin preview fixture count for a campus-scale industrial customer."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Large behind-the-meter rooftop and canopy solar PV feasibility scenario sized below annual campus load.",
"inputFacts": [
{
"inputKey": "solar_pv_system_kw_dc",
"value": 12000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 12 MWdc system is large but plausible for an 8,000,000-square-foot campus and remains far below the annual electric consumption."
},
{
"inputKey": "estimated_annual_generation_kwh",
"value": 16800000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 1,400 kWh per kWdc-year, appropriate as a planning-level estimate for South Carolina."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 2760000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Budgetary commercial-scale PV cost assumption of approximately $2.30/Wdc, including engineering, procurement, construction, interconnection, and contingency."
},
{
"inputKey": "roof_structural_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large rooftop PV project should not proceed to calculated grants without structural, roof-age, and interconnection review."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application status is supplied."
},
{
"inputKey": "tax_credit_transfer_or_direct_pay_plan",
"value": "taxable_entity_transfer_or_own_use_possible",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A private for-profit entity may evaluate tax credit monetization, but this is not a grant and should not be counted as a grant award."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Solar PV may qualify for tax credits or utility programs, but this profile should not invent a discretionary grant award.",
"Suppress grant estimates requiring interconnection approval, final quote, or tax-credit eligibility evidence."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery energy storage feasibility case for peak management, resiliency, and possible solar integration.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 10000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 10 MW battery is plausible for an industrial campus with very large annual consumption and demand charges."
},
{
"inputKey": "battery_capacity_kwh",
"value": 40000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four-hour duration is a common planning assumption for commercial and industrial storage."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1800000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Budgetary assumption for utility-scale-style BESS installed behind the meter, including PCS, containers, controls, fire protection, engineering, and site work."
},
{
"inputKey": "paired_with_renewable_generation",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The battery is plausibly studied alongside the solar PV scenario, but final pairing should remain user-confirmed."
},
{
"inputKey": "resilience_critical_load_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical-load sizing cannot be inferred from annual consumption alone."
},
{
"inputKey": "final_vendor_quote_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Storage incentives should require equipment quote, capacity, controls, warranty, and interconnection details."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Battery storage may support tax-credit or utility value cases, but a grant estimate should not be forced without a matched active grant and eligible-cost evidence.",
"Demand-response or resilience programs may need utility enrollment or critical-load documentation."
]
},
{
"retrofitTypeId": "automated_demand_response_controls",
"projectScopeSummary": "Controls and dispatch integration to shed or shift noncritical load during utility events, focused on HVAC, compressed air auxiliaries, chilled water, and managed charging.",
"inputFacts": [
{
"inputKey": "estimated_dispatchable_load_kw",
"value": 9000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is a very large electric customer, but process constraints mean dispatchable load should be conservative until verified."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 450000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Includes controls integration, metering, analytics, dispatch logic, cybersecurity review, and commissioning."
},
{
"inputKey": "utility_demand_response_program_enrolled",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No enrollment or utility acceptance status is supplied."
},
{
"inputKey": "production_process_curtailment_allowed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Automotive production constraints may prevent curtailment of critical process loads."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Demand response payments or incentives should be suppressed until utility program enrollment and dispatchable kW are confirmed.",
"Do not assume production equipment can be interrupted."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Natural-gas-fired CHP feasibility case serving process heat, hot water, and selected electrical loads.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 12000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 12 MW CHP system is plausible for an industrial site with high electric and gas loads, while still being a partial-campus resource."
},
{
"inputKey": "recoverable_thermal_output_mmbtu_per_hr",
"value": 45,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal recovery potential is plausible but needs a process heat load study."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 3600000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large industrial CHP has substantial generation, heat recovery, gas interconnection, electrical, controls, and permitting costs."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "CHP economics and eligibility depend on verified coincident thermal load."
},
{
"inputKey": "emissions_permit_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No air permitting or interconnection status is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP grants are program-specific and should not be assumed for a private industrial gas-fired project.",
"A formula should require feasibility study, air permit path, thermal-load evidence, and interconnection details."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Owner-funded engineering study to evaluate solar, battery, CHP, controls, process heat recovery, and EV charging alternatives before grant application.",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 47500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A multi-measure industrial feasibility study for a large campus could reasonably cost several hundred thousand dollars."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No study proposal, scope of work, or vendor selection is supplied."
},
{
"inputKey": "study_scope_includes_grant_application_support",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large industrial customers commonly include incentive screening and application support in feasibility scopes."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Planning-study grants should not be assumed unless a specific active program covers private industrial engineering studies.",
"Suppress any estimate until study quote and eligible applicant/program facts are available."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Limited geothermal heat pump concept for a new or renovated office/training/support building on campus, not for process-heavy production space.",
"inputFacts": [
{
"inputKey": "served_area_sqft",
"value": 90000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Ground-source geothermal is assumed only for a discrete support building because it is not a normal retrofit for the full automotive plant."
},
{
"inputKey": "heat_pump_capacity_tons",
"value": 300,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 300-ton system is plausible for a support building but should remain conceptual."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 210000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Includes borefield, heat pumps, pumps, distribution piping, controls, and commissioning for a limited building scope."
},
{
"inputKey": "geotechnical_or_borefield_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Geothermal cost and feasibility depend on site-specific drilling and subsurface conditions."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A campus-wide geothermal grant estimate would be unrealistic.",
"Only calculate if the user confirms a discrete building scope, quote, and eligible program."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal domestic hot-water concept for cafeteria, locker, and wellness areas.",
"inputFacts": [
{
"inputKey": "collector_area_sqft",
"value": 3200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal could serve domestic hot-water loads but is not central to automotive production energy use."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 140000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Budgetary cost for a commercial solar thermal system serving support-space hot water."
},
{
"inputKey": "domestic_hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Water-heating load and roof suitability are unknown."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This is a marginal fit for a large manufacturing campus and should not be forced into a positive grant estimate.",
"Require hot-water load, roof, and quote data before calculating."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biogas or biomass energy system is not a normal fit for this automotive manufacturing campus absent a dedicated fuel supply or waste-to-energy project.",
"inputFacts": [
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Automotive assembly does not typically produce sufficient organic feedstock for a biomass or biogas energy system."
},
{
"inputKey": "third_party_biogas_supply_contract",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No renewable gas or waste-feedstock contract is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A meaningful estimate would require fuel source, conversion technology, interconnection, emissions, and EPC scope."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely ineligible or not relevant unless the user identifies a real biogas supply or waste-to-energy scope.",
"Do not use the generic preview cost as an eligible grant basis."
]
},
{
"retrofitTypeId": "fuel_cell_system",
"projectScopeSummary": "Stationary fuel-cell system remains a conceptual resilience or low-carbon power option, with no confirmed hydrogen, renewable gas, or utility interconnection pathway.",
"inputFacts": [
{
"inputKey": "fuel_cell_capacity_kw",
"value": 5000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 5 MW system is plausible for conceptual screening at a large industrial facility but remains speculative."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 2500000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fuel-cell installed cost is highly technology- and fuel-specific, so this should be treated as a rough screening input only."
},
{
"inputKey": "hydrogen_or_renewable_fuel_supply_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No clean fuel supply facts are provided."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress grant estimates unless a specific eligible fuel-cell program, fuel pathway, and quote are provided.",
"Potential tax treatment should not be counted as a grant."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine is not a realistic priority for this industrial campus based on the supplied facts.",
"inputFacts": [
{
"inputKey": "wind_resource_assessment_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study, interconnection plan, or turbine siting analysis is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A credible wind estimate requires site-specific turbine, foundation, interconnection, permitting, and wind-resource data."
},
{
"inputKey": "turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No selected turbine or scope is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force a small-wind grant estimate for this automotive plant absent a confirmed wind project.",
"Likely should be treated as not relevant or needs project scope."
]
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"projectScopeSummary": "Replacement of cafeteria dishwashing equipment in employee foodservice areas.",
"inputFacts": [
{
"inputKey": "dishwasher_units_replaced",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large campus cafeteria could plausibly have multiple commercial dish machines."
},
{
"inputKey": "equipment_type",
"value": "ENERGY_STAR_commercial_conveyor_dishwasher",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial conveyor dishwashers are plausible in a large employee cafeteria."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Includes equipment, removal, plumbing, electrical, and installation for two large commercial dish machines."
},
{
"inputKey": "final_equipment_model_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Rebate or grant calculations should require model number and efficiency certification."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Foodservice equipment incentives may be small relative to total project cost.",
"Require equipment model and invoice before calculating a firm estimate."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Targeted replacement of cafeteria and parts-storage refrigeration equipment, not a large cold-storage warehouse retrofit.",
"inputFacts": [
{
"inputKey": "refrigeration_units_replaced",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large campus can plausibly include cafeteria, vending, and parts/material support refrigeration."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 72000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Budgetary cost for multiple commercial refrigeration units and installation."
},
{
"inputKey": "equipment_model_numbers_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Equipment-specific program calculations need model numbers and efficiency certifications."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only calculate equipment-level incentives when exact model and quantity data are available.",
"Do not assume process refrigeration unless separately confirmed."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Envelope insulation and air-sealing upgrades in office, training, warehouse, and maintenance buildings during planned reroofing or renovation.",
"inputFacts": [
{
"inputKey": "insulated_area_sqft",
"value": 420000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes a targeted envelope project rather than insulating the full manufacturing campus."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 260000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Includes materials, labor, lifts, access, air sealing, and project management for a targeted industrial envelope scope."
},
{
"inputKey": "baseline_r_value_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Envelope incentives commonly require pre- and post-condition documentation."
},
{
"inputKey": "part_of_routine_roof_replacement",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "If bundled with maintenance reroofing, only incremental energy-efficiency cost may be eligible."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Use only incremental efficiency cost if the work is part of routine reroofing or building maintenance.",
"Require baseline and proposed R-value documentation."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22665",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "project_is_publicly_accessible_corridor_charging",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied project facts do not establish public access, corridor location, or NEVI-compliant station design."
},
{
"inputKey": "private_restricted_access_site",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A manufacturing campus is reasonably assumed to be security-controlled unless the user confirms public access."
},
{
"inputKey": "nevi_application_round_open",
"value": null,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The opportunity is listed as upcoming; calculation should not assume an active round or application acceptance."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application-submission fact is supplied."
},
{
"inputKey": "agency_award_or_reservation_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No award, reservation, or preapproval evidence is supplied."
},
{
"inputKey": "eligible_ev_charging_project_cost_cents",
"value": 185000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Budgetary project cost can support a quote-needed placeholder but should not produce an award estimate by itself."
}
],
"reasoning": "Although the matched opportunity is geographically relevant to South Carolina and EV charging, this BMW campus scenario is primarily private workplace/fleet charging. Treat as needs project scope or suppress until public corridor access, NEVI station design, active application round, and agency award/preapproval facts are available."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "final_vendor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "grant_award_amount_cents",
"reason": "application not submitted"
},
{
"inputKey": "grant_preapproval_or_reservation_id",
"reason": "source requires agency approval"
},
{
"inputKey": "nevi_public_access_confirmation",
"reason": "needs user decision"
},
{
"inputKey": "nevi_alternative_fuel_corridor_distance",
"reason": "needs user decision"
},
{
"inputKey": "electric_utility_account_number",
"reason": "needs user decision"
},
{
"inputKey": "demand_response_program_acceptance",
"reason": "source requires agency approval"
},
{
"inputKey": "interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "solar_structural_engineering_report",
"reason": "quote not available"
},
{
"inputKey": "battery_fire_code_review",
"reason": "quote not available"
},
{
"inputKey": "chp_air_permit_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "geothermal_borefield_test_report",
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
"inputKey": "tribal_entity_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "nonprofit_tax_exemption_letter",
"reason": "unrealistic for this customer"
},
{
"inputKey": "public_school_or_government_status",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The applicant is a private for-profit industrial manufacturer, so residential, nonprofit, school, public-sector, tribal, and agricultural programs should normally be blocked unless the specific program includes private industrial applicants.",
"The EV charging match should not automatically calculate a NEVI grant because the likely campus use case is restricted-access workplace or fleet charging, not confirmed public corridor charging.",
"The site is extremely large and process-load-dominated; savings and eligible costs should not be extrapolated from small generic preview assumptions.",
"Solar PV, battery storage, CHP, fuel-cell, geothermal, wind, and biomass projects require project-specific engineering, interconnection, permitting, fuel, and quote evidence before grant estimates are calculated.",
"Tax credits or accelerated depreciation for manufacturing or clean energy projects should not be represented as grant awards.",
"Self-reported utility territory and synthetic utility costs are adequate for test-case discovery but should not replace bill-based verification where an incentive rule requires utility account confirmation."
]
}

