{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "fedex-world-hub-memphis",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied FedEx Express World Hub Memphis test case, including the warehouse/logistics facility type, MLGW service, lease status, very large electric load, and listed retrofit opportunities. Citation: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object identifies the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "early_budgeting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A very large leased logistics hub would normally start with budgeting, engineering screening, and landlord/airport coordination before issuing final construction purchase orders."
},
{
"inputKey": "application_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted grant, utility preapproval, or reservation record is present in the test case."
},
{
"inputKey": "customer_class",
"value": "large_commercial_industrial",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has a 1.3-million-square-foot logistics operation and 204.8 GWh annual electric consumption, which is consistent with a large commercial or industrial customer class."
},
{
"inputKey": "electric_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "MLGW is self-reported as the electric provider, but the specific account holder and rate schedule are not confirmed."
},
{
"inputKey": "gas_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "MLGW is listed as gas provider and annual gas cost is present, but account and tariff details remain unverified."
},
{
"inputKey": "water_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes annual water and sewer cost, consistent with a water/sewer service relationship."
},
{
"inputKey": "ownership_status",
"value": "lease",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied source form and existing tax facts identify the facility relationship as a lease."
},
{
"inputKey": "landlord_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Permanent building, roof, electrical-service, geothermal, battery, microgrid, and HVAC work at a leased airport logistics facility would normally require landlord and airport approvals."
},
{
"inputKey": "airport_site_coordination_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an airport cargo hub, so equipment placement, electrical infrastructure, flight operations, and construction access would likely need airport coordination."
},
{
"inputKey": "applicant_is_for_profit_business",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization type is Commercial Business."
},
{
"inputKey": "applicant_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case identifies the customer as a commercial business, not a nonprofit."
},
{
"inputKey": "applicant_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is not described as a city, county, state agency, airport authority, or other public entity."
},
{
"inputKey": "applicant_is_school_or_university",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building type and primary activity are logistics and cargo handling, not education."
},
{
"inputKey": "applicant_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is an air cargo and logistics hub, not an agricultural production facility."
},
{
"inputKey": "applicant_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Nothing in the supplied profile indicates tribal ownership or tribal-government applicant status."
},
{
"inputKey": "small_business_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization size is 1,000+ employees, so small-business-only grant opportunities should not be forced to qualify."
},
{
"inputKey": "fleet_owner_or_operator",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile describes fleet operations and charging loads as part of the primary site context."
},
{
"inputKey": "regulated_airside_operations_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A Memphis airport cargo hub would likely include airside-adjacent operating constraints even if individual work areas are not confirmed."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 1848800000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile lists annual electric cost of $18,488,000."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 261960000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile lists annual gas cost of $2,619,600."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 45210000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summary lists annual water and sewer cost of $452,100."
},
{
"inputKey": "annual_waste_cost_cents",
"value": 148500000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied utility summary lists annual waste cost of $1,485,000."
},
{
"inputKey": "utility_account_number_masked",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The available field list includes account-number support, but no masked account identifier is present."
},
{
"inputKey": "electric_rate_schedule",
"value": null,
"valueType": "text",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case has average cost per kWh but no tariff or rate schedule. Several utility incentive calculations may need the actual rate class."
},
{
"inputKey": "project_requires_demand_management_review",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Very high annual kWh and likely large peak demand make demand impacts important for HVAC, charging, battery, and controls projects."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace a targeted first phase of high-bay warehouse, loading-dock, maintenance-bay, and exterior wall-pack lighting with networked LED fixtures and controls rather than modeling only the 12-fixture preview.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 4200,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 1.3-million-square-foot automated cargo hub would plausibly have thousands of fixtures; this assumes a targeted phase rather than a full-campus replacement."
},
{
"inputKey": "controlled_fixture_count",
"value": 3000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked controls are realistic in warehouse aisles, sort areas, and low-occupancy support zones."
},
{
"inputKey": "annual_operating_hours",
"value": 6000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Airport cargo sorting and logistics operations often run long daily schedules, but not every fixture operates continuously."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 525000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $1,250 per fixture installed on average, including controls, lifts, logistics staging, commissioning, and airport-site labor complexity."
},
{
"inputKey": "requires_utility_preapproval",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large prescriptive or custom utility lighting incentives typically require preapproval before ordering or installing equipment."
},
{
"inputKey": "quote_status",
"value": "budgetary_estimate_only",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case does not include a contractor quote, fixture schedule, or final bill of materials."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Utility custom lighting incentives should remain conditional until fixture wattages, operating hours, MLGW or TVA program eligibility, and preapproval status are confirmed.",
"Tenant must document permission for permanent lighting and controls work.",
"If fixtures were already purchased or installed, many incentive programs would be suppressed."
]
},
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "Conduct a facility-wide retro-commissioning and controls optimization study focused on sortation equipment schedules, warehouse ventilation, compressed air, dock doors, conveyor controls, HVAC sequences, and demand reduction.",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 9500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A complex 1.3-million-square-foot logistics hub would likely require a six-figure study when metering, controls trend analysis, and implementation support are included."
},
{
"inputKey": "implementation_allowance_cents",
"value": 42000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Allows for low- and medium-cost implementation measures after the study, without assuming major capital equipment replacement."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 51500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combines the study and near-term implementation allowance."
},
{
"inputKey": "utility_bill_history_months_available",
"value": 12,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Annual utility summaries exist, but interval data and bill images are not confirmed."
},
{
"inputKey": "interval_meter_data_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Retro-commissioning savings and demand measures would be more defensible with interval data, which is not provided."
},
{
"inputKey": "final_rcx_report_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is still exploring and no completed study report is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Study-only incentives may need utility approval before the study begins.",
"Implementation incentives should not calculate from the study cost alone unless the program explicitly covers study costs.",
"Custom savings estimates should remain provisional until the retro-commissioning report identifies measures."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace selected aging packaged rooftop and make-up air HVAC units serving offices, sort control rooms, dock support areas, and conditioned warehouse zones with high-efficiency equipment.",
"inputFacts": [
{
"inputKey": "hvac_unit_count",
"value": 36,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A targeted replacement phase at a large logistics hub could reasonably include several dozen packaged units rather than the entire facility."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 900,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes an average of roughly 25 tons per unit across a targeted package of rooftop and make-up air equipment."
},
{
"inputKey": "equipment_type",
"value": "high_efficiency_packaged_rooftop_units_and_makeup_air_units",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Packaged rooftop and make-up air equipment is realistic for warehouse, office, and logistics support areas."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 360000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $4,000 per ton installed for a complex replacement phase with cranes, controls integration, and operational staging."
},
{
"inputKey": "equipment_efficiency_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not include AHRI certificates, proposed efficiencies, baseline equipment details, or a bid schedule."
},
{
"inputKey": "requires_continuity_of_operations_plan",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "HVAC replacement at an active airport sorting hub would need phased work to avoid interrupting package handling."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Most equipment-specific incentives should remain suppressed until model numbers, efficiency ratings, baseline unit details, and quote amounts are available.",
"Tenant and airport approvals are needed for rooftop, electrical, gas, controls, and crane work.",
"If the replacement is normal end-of-life without qualifying efficiency improvement, grant estimates should be reduced or suppressed."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Electrify a limited set of office and support-space HVAC zones with high-efficiency heat pumps where electrical capacity and operational constraints allow.",
"inputFacts": [
{
"inputKey": "heat_pump_unit_count",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A limited electrification scope is more realistic than replacing all gas-serving systems at a very large logistics hub."
},
{
"inputKey": "total_heat_pump_capacity_tons",
"value": 360,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes an average 20-ton unit size for support-space and office-zone equipment."
},
{
"inputKey": "replaces_gas_heating",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has material annual gas cost, but the exact gas end uses are not confirmed."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 252000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $7,000 per ton installed for heat-pump replacement in complex operating areas."
},
{
"inputKey": "electrical_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large heat-pump conversion could affect peak demand, but switchgear and transformer capacity are not provided."
},
{
"inputKey": "cold_climate_or_low_ambient_performance_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Memphis winter conditions are moderate but still require low-ambient heating performance review for electrification."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Heat-pump grants or rebates should not calculate without capacity, efficiency, baseline heating fuel, and installed-cost detail.",
"Peak demand impacts may reduce attractiveness for a very large electric customer.",
"Tenant approval and roof or mechanical-room access rights are required."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Evaluate chilled-water or packaged thermal storage for dispatchable cooling load management in conditioned sorting and office zones.",
"inputFacts": [
{
"inputKey": "storage_type",
"value": "ice_or_chilled_water_thermal_storage",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Thermal storage is plausible for a large customer with high demand charges or time-dependent rates, but not confirmed as designed."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 5000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A multi-thousand-ton-hour system is plausible for a very large facility but should be treated as an early placeholder."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 325000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes a budgetary placeholder of roughly $650 per ton-hour, but the actual design could vary widely."
},
{
"inputKey": "peak_kw_reduction_estimate",
"value": 1200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Peak reduction depends on the cooling plant, rate schedule, dispatch strategy, and operating profile, none of which are fully specified."
},
{
"inputKey": "engineering_feasibility_study_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Thermal storage sizing cannot be reliably estimated without load profiles, plant configuration, and site layout."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This is realistic as a feasibility study, but many grant formulas should suppress until a specific design and eligible measure category are confirmed.",
"Rate schedule and interval demand data are required before estimating benefits.",
"Airport site constraints may limit tank placement."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install a behind-the-meter battery energy storage system for demand management, resilience for critical sort operations, and possible integration with future EV charging.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 3000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A multi-megawatt battery is plausible for a site with more than 200 GWh annual electric consumption."
},
{
"inputKey": "battery_capacity_kwh",
"value": 12000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four-hour duration is a common planning assumption for commercial battery storage."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 720000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $600 per kWh installed for a large commercial battery including PCS, controls, interconnection, fire protection, and site work."
},
{
"inputKey": "resilience_critical_loads_identified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical loads are likely, but the test case does not provide a critical-load schedule."
},
{
"inputKey": "utility_interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection or utility engineering application is included."
},
{
"inputKey": "battery_itc_tax_credit_election_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case is grant-focused and does not include tax-credit monetization, ownership, or transferability decisions."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Battery-storage grants should generally remain suppressed unless a specific resilience, demand-response, or utility program is matched.",
"For-profit ownership may make some public-sector resilience grants ineligible.",
"Interconnection approval, fire-code review, tenant rights, and airport approvals are gating items."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Conceptual microgrid combining battery storage, switchgear controls, backup generation interface, and critical-load islanding for sortation and operations continuity.",
"inputFacts": [
{
"inputKey": "microgrid_controller_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A microgrid project would require a controls layer beyond standalone storage."
},
{
"inputKey": "critical_load_capacity_kw",
"value": 5000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 5 MW critical-load planning placeholder is plausible for partial sortation, IT, security, and support systems, but must be confirmed."
},
{
"inputKey": "battery_capacity_kwh",
"value": 20000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Microgrid storage sizing is a placeholder and depends on outage-duration goals and critical-load definition."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 1850000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large commercial microgrid cost is highly design-specific; this placeholder includes storage, switchgear, controls, engineering, and commissioning."
},
{
"inputKey": "is_public_safety_or_public_facility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a private commercial logistics business, not a public safety facility."
},
{
"inputKey": "microgrid_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring, and no completed study is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many microgrid grants prioritize public, tribal, community, healthcare, or critical public infrastructure applicants; this private logistics site should not be forced into those categories.",
"A feasibility study and critical-load schedule are needed before any credible estimate.",
"Airport, utility, landlord, fire-code, and interconnection approvals are likely major blockers."
]
},
{
"retrofitTypeId": "electric_forklift_material_handling",
"projectScopeSummary": "Replace a portion of propane or diesel yard and warehouse material-handling equipment with battery-electric forklifts, tugs, and charging infrastructure.",
"inputFacts": [
{
"inputKey": "equipment_units_replaced",
"value": 65,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A very large cargo hub could operate a large material-handling fleet; this assumes a partial fleet conversion."
},
{
"inputKey": "charger_port_count",
"value": 48,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Charging ports are fewer than equipment units because units can be shift-scheduled and charged opportunistically."
},
{
"inputKey": "charger_power_kw_each",
"value": 19.2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 19.2 kW AC charging assumption is plausible for many industrial material-handling applications."
},
{
"inputKey": "estimated_vehicle_or_equipment_cost_cents",
"value": 455000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $70,000 per electric material-handling unit on average across mixed forklifts and tugs."
},
{
"inputKey": "estimated_charging_infrastructure_cost_cents",
"value": 192000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $40,000 per installed port including panels, make-ready work, trenching or conduit, protective bollards, and commissioning."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 647000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combines the partial electric material-handling fleet and charging infrastructure budget."
},
{
"inputKey": "existing_fuel_type",
"value": "propane_and_diesel_mixed",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fleet operations are present, but current equipment fuel mix is not specified."
},
{
"inputKey": "scrappage_required_units_confirmed",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Many transportation grants require replacement and scrappage documentation; the test case does not include it."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Vehicle and equipment grants should not calculate unless current unit age, horsepower, fuel type, duty cycle, replacement status, and scrappage requirements are confirmed.",
"Charging infrastructure incentives may need utility make-ready approval before construction.",
"Some public fleet or school-bus programs are not relevant to this private cargo operation."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Upgrade limited break-room, package-hold, and temperature-controlled support refrigeration equipment, not a full cold-storage warehouse conversion.",
"inputFacts": [
{
"inputKey": "refrigeration_system_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is logistics-focused, not primarily cold storage, so refrigeration scope should be limited."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 72000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Budget assumes a modest set of commercial refrigeration replacements rather than large industrial refrigeration."
},
{
"inputKey": "refrigerated_warehouse_primary_use",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The primary activity is air cargo sorting, airport logistics, package handling, fleet operations, and warehouse distribution, not refrigerated warehousing."
},
{
"inputKey": "equipment_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No refrigeration equipment model numbers or quote are present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not treat this as a full grocery, food-service, or cold-storage refrigeration project unless the user provides evidence.",
"Many refrigeration incentives require exact equipment type, efficiency, capacity, and baseline."
]
},
{
"retrofitTypeId": "refrigeration_ec_motor_retrofit",
"projectScopeSummary": "Potential EC motor upgrade for a small number of evaporator or reach-in refrigeration fans if qualifying refrigeration equipment is found on site.",
"inputFacts": [
{
"inputKey": "ec_motor_count",
"value": 40,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small EC motor count could exist in support refrigeration, but the site is not modeled as a cold-storage facility."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $3,000 per motor installed for a small support-refrigeration project."
},
{
"inputKey": "existing_motor_type_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing fan motor inventory is not included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress if the estimator cannot confirm eligible existing shaded-pole or PSC motors.",
"Do not infer a large refrigeration grant from a general logistics warehouse profile."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Evaluate CHP only as an exploratory resilience and thermal-load concept; no confirmed continuous thermal host has been identified.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": 2500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A multi-megawatt CHP plant could match a large electric site, but the thermal load and emissions constraints are not confirmed."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 875000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $3,500 per kW installed as an early CHP planning placeholder."
},
{
"inputKey": "continuous_thermal_host_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes gas cost, but no steam, hot-water, process heat, or absorption-cooling load profile is specified."
},
{
"inputKey": "emissions_permit_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "On-site combustion equipment of this scale would likely require environmental and airport-site review."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP should not receive a positive grant estimate without a confirmed thermal load, emissions path, interconnection plan, and cost quote.",
"Some clean-energy grant programs may exclude fossil-fueled CHP or require low-carbon fuel."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Consider geothermal only as a low-priority screening item for selected office/support zones because airport land, pavement, and lease constraints make ground loops difficult.",
"inputFacts": [
{
"inputKey": "geothermal_loop_type",
"value": "vertical_borefield",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A vertical borefield would be more plausible than horizontal loops in a dense airport logistics environment, but it is not confirmed."
},
{
"inputKey": "connected_capacity_tons",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small pilot serving support spaces is more realistic than geothermal for the full hub."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 240000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $16,000 per ton installed for a small vertical-loop project with difficult site logistics."
},
{
"inputKey": "land_or_borefield_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility is leased and airport land use is constrained, so borefield control cannot be assumed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force geothermal qualification until land control, lease rights, geotechnical feasibility, and airport approvals are confirmed.",
"A limited heat-pump project is more realistic than a full geothermal installation."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Low-priority solar thermal concept for domestic hot water in employee support areas; not a major thermal end use for the cargo hub.",
"inputFacts": [
{
"inputKey": "collector_area_sqft",
"value": 1800,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest solar thermal array might serve showers, maintenance, or cafeteria support loads, but the hot-water load is not documented."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": 180000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $1,000 per square foot installed including storage and controls for a complex commercial site."
},
{
"inputKey": "domestic_hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile has annual gas cost but does not identify domestic hot water as a major end use."
},
{
"inputKey": "roof_rights_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is leased, so roof access and roof improvement rights cannot be assumed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Solar water heating is unlikely to be a priority without a confirmed large year-round hot-water load.",
"Roof rights, structural capacity, and airport glare or safety review may be required."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Not realistic for this air cargo hub unless a separate fuel supply, waste-to-energy partner, or municipal biogas procurement path is identified.",
"inputFacts": [
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility handles packages and logistics, not agricultural, food-processing, or wastewater feedstock."
},
{
"inputKey": "biogas_fuel_contract_executed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No renewable gas, landfill gas, or digester gas contract is provided."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A credible project cost cannot be supplied without a defined technology, fuel source, and interconnection design."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress biomass or biogas grant estimates unless the user provides a real feedstock or fuel-supply agreement.",
"Do not infer agricultural, municipal wastewater, or landfill eligibility from a logistics warehouse profile."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Not recommended for the airport cargo hub due to aviation safety, height, turbulence, siting, and airport-review constraints.",
"inputFacts": [
{
"inputKey": "wind_turbine_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Small wind turbines are not realistic on or near active airport cargo operations without specialized aviation approvals."
},
{
"inputKey": "faa_or_airport_approval_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No aviation approval is present, and the site is an airport cargo hub."
},
{
"inputKey": "estimated_eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No realistic wind project scope should be priced for this profile without siting approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress wind grant estimates for this test case unless the user provides specific airport approval and a viable turbine siting plan.",
"The project conflicts with common airport obstruction and safety constraints."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "Consider LEED O+M or equivalent certification only as a corporate sustainability reporting initiative, not a direct energy equipment retrofit.",
"inputFacts": [
{
"inputKey": "certification_path",
"value": "leed_om_existing_building_possible",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For a large existing logistics facility, operations-and-maintenance certification is more plausible than new construction certification."
},
{
"inputKey": "certification_consulting_cost_cents",
"value": 35000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large, complex facility could incur substantial consulting, commissioning, documentation, and application costs."
},
{
"inputKey": "owner_commitment_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Certification for a leased facility usually requires owner and tenant coordination."
},
{
"inputKey": "direct_grant_eligible_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Certification costs alone should generally not be treated as equipment grant eligible unless a specific program says otherwise."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate equipment grants from LEED certification costs alone.",
"Certification may support ESG goals but is not by itself a utility efficiency measure."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "mlgw_or_tva_custom_business_energy_efficiency_incentive",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_confirmed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "MLGW is listed as the utility, but account and tariff details are not verified."
},
{
"inputKey": "preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or reservation is present."
},
{
"inputKey": "measure_categories",
"value": [
"lighting",
"retro_commissioning",
"hvac",
"controls"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are the realistic efficiency categories for this warehouse/logistics profile."
}
],
"reasoning": "A large MLGW-served commercial site is a plausible utility incentive candidate, but the estimate should require quote, measure-level savings, account, tariff, and preapproval facts."
},
{
"opportunityId": "commercial_led_lighting_prescriptive_or_custom_rebate",
"expectedHandling": "calculate_if_formula_ready",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 4200,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A targeted high-bay and dock lighting phase is realistic for a 1.3-million-square-foot logistics facility."
},
{
"inputKey": "installed_cost_cents",
"value": 525000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Budgetary installed cost is available for synthetic testing, but final rebates should still be contingent on equipment details."
},
{
"inputKey": "fixture_schedule_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wattage-by-fixture or baseline schedule is supplied."
}
],
"reasoning": "Lighting is the most likely near-term qualifying project, but final calculations should be conservative without baseline wattage, proposed wattage, and preapproval status."
},
{
"opportunityId": "commercial_retro_commissioning_or_energy_study_incentive",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 9500000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The large facility size supports a substantial study budget."
},
{
"inputKey": "final_report_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No retro-commissioning report or measure list is present."
}
],
"reasoning": "Study incentives may be relevant, but implementation savings or custom rebates should wait for a completed scope and utility approval."
},
{
"opportunityId": "commercial_hvac_high_efficiency_equipment_incentive",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "total_cooling_capacity_tons",
"value": 900,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Synthetic capacity is supplied for test coverage but should be replaced with the equipment schedule."
},
{
"inputKey": "installed_cost_cents",
"value": 360000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Budgetary cost is realistic for a targeted rooftop and make-up air unit replacement phase."
},
{
"inputKey": "ahri_or_efficiency_documentation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No efficiency certificates, model numbers, or baseline units are included."
}
],
"reasoning": "HVAC may qualify where efficiency tiers are met, but the estimator should not calculate equipment-specific incentives from generic HVAC labels alone."
},
{
"opportunityId": "commercial_ev_charging_make_ready_or_transportation_electrification_incentive",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "charger_port_count",
"value": 48,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partial material-handling fleet conversion would plausibly require several dozen charging ports."
},
{
"inputKey": "charging_infrastructure_cost_cents",
"value": 192000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Budget includes make-ready and installed charging infrastructure."
},
{
"inputKey": "utility_make_ready_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application status is provided."
}
],
"reasoning": "Charging support is realistic, but utility make-ready and transportation electrification programs often require preapproval, site plans, service-capacity review, and eligible equipment lists."
},
{
"opportunityId": "diesel_or_propane_forklift_replacement_grant",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "replacement_units",
"value": 65,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Partial fleet replacement is plausible but not verified."
},
{
"inputKey": "existing_unit_vin_or_serial_numbers_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not include individual equipment records."
},
{
"inputKey": "scrappage_plan_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Replacement grants often require destruction or permanent retirement documentation."
}
],
"reasoning": "Fleet replacement grants should remain uncertain until current equipment age, fuel type, usage, replacement status, and scrappage eligibility are known."
},
{
"opportunityId": "federal_or_state_public_sector_resilience_microgrid_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile identifies a private commercial business."
},
{
"inputKey": "critical_public_facility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility may be economically important but is not a public safety, healthcare, municipal, or emergency-response facility in the supplied profile."
}
],
"reasoning": "Do not force microgrid or resilience grants that are intended for public or community facilities."
},
{
"opportunityId": "agricultural_or_rural_energy_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a logistics and cargo hub."
},
{
"inputKey": "facility_activity_matches_agriculture",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The NAICS and activity description point to courier, freight, warehousing, and logistics operations."
}
],
"reasoning": "Agricultural and rural producer programs should not be applied to this profile unless separate facts establish eligibility."
},
{
"opportunityId": "nonprofit_public_school_energy_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a commercial business."
},
{
"inputKey": "applicant_is_school_or_university",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is not an education campus."
}
],
"reasoning": "School, nonprofit, and public-building grant opportunities should be blocked for this test case."
},
{
"opportunityId": "airport_or_aviation_decarbonization_grant",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "airport_owner_or_sponsor_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer is a tenant commercial cargo hub operator, not identified as the airport sponsor."
},
{
"inputKey": "airport_authority_partnership_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No airport sponsor partnership, lease amendment, or co-application is provided."
}
],
"reasoning": "Airport-specific decarbonization funding might be relevant only with airport sponsor participation; suppress until a real applicant pathway is shown."
},
{
"opportunityId": "small_business_energy_efficiency_grant",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "organization_size",
"value": "1000_plus_employees",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source profile lists organization size as 1,000+ employees."
},
{
"inputKey": "small_business_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large enterprise status should block small-business-only opportunities."
}
],
"reasoning": "Small-business grants should not qualify for this enterprise-scale cargo hub."
},
{
"opportunityId": "renewable_energy_generation_grant_for_wind_biomass_or_biogas",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "onsite_wind_project_viable",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Small wind is not realistic for an airport cargo hub without specialized approvals."
},
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The logistics operation does not generate agricultural, wastewater, or landfill biogas feedstock."
}
],
"reasoning": "Wind, biomass, and biogas should not be included as qualifying renewable projects for this test profile."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "final_contractor_quote",
"reason": "quote not available"
},
{
"inputKey": "utility_preapproval_letter",
"reason": "application not submitted"
},
{
"inputKey": "mlgw_account_number",
"reason": "needs user decision"
},
{
"inputKey": "electric_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "monthly_peak_kw_by_interval",
"reason": "needs user decision"
},
{
"inputKey": "lighting_fixture_baseline_wattage_schedule",
"reason": "quote not available"
},
{
"inputKey": "hvac_model_numbers_and_efficiency_certificates",
"reason": "quote not available"
},
{
"inputKey": "battery_interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "airport_landlord_approval_letter",
"reason": "source requires agency approval"
},
{
"inputKey": "geothermal_borefield_land_control",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_airport_or_faa_approval",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_or_biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "public_entity_or_nonprofit_status_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "agricultural_producer_status",
"reason": "unrealistic for this customer"
},
{
"inputKey": "fleet_scrappage_documentation",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The applicant is a large for-profit commercial business, not a nonprofit, public entity, school, tribal government, or agricultural producer.",
"The facility is a leased airport logistics hub, so permanent building, roof, ground-loop, battery, microgrid, and charging projects require landlord and airport coordination before eligibility can be assumed.",
"The profile is still in the exploring stage, and no grant application, preapproval, reservation, quote, equipment schedule, or interconnection approval is present.",
"Small wind is not realistic at an airport cargo hub without aviation approvals and should normally be suppressed.",
"Biomass and biogas are not realistic because the site does not have an identified organic feedstock or renewable fuel contract.",
"Geothermal should not qualify by default because land control and borefield feasibility are not established for the leased airport site.",
"Refrigeration incentives should be limited or suppressed unless the user confirms actual cold-storage or eligible refrigeration equipment; the primary site type is logistics and cargo handling.",
"Microgrid and battery-storage grants should not be forced positive unless a specific private-sector or utility resilience program, interconnection path, and critical-load scope are identified.",
"Transportation electrification may be realistic, but vehicle replacement grants require current equipment records, fuel type, age, duty cycle, and scrappage eligibility before calculations are reliable.",
"Utility incentive estimates should require account, rate, preapproval, and measure-level savings inputs where program rules depend on those facts."
]
}

