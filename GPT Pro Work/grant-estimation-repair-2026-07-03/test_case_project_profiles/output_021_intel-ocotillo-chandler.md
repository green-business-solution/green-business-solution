{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "intel-ocotillo-chandler",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied Prompt 21 test-case context for Intel Ocotillo Campus: semiconductor fabrication campus in SRP territory, owned industrial/manufacturing site, very large electric load, high water intensity, and project stage currently exploring.  Assumptions intentionally favor realistic grant-estimation behavior: custom industrial efficiency and controls may be plausible, while residential, small-business, school, nonprofit, agricultural, tribal, and public-sector programs should not be forced to qualify.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "customer_class",
"value": "large_industrial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a semiconductor fabrication campus with approximately 1.707 billion annual kWh in the supplied profile, so large industrial customer class is the realistic default."
},
{
"inputKey": "is_for_profit_business",
"value": true,
"valueType": "boolean",
"sourceStrategy": "public_context",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Intel is a private-sector commercial manufacturer, not a nonprofit or public entity."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A semiconductor fabrication campus operated by Intel should not be treated as nonprofit."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a private industrial company, so public-sector-only grants should be suppressed."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Although the site is a large campus, its primary activity is semiconductor fabrication rather than education."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site NAICS and activity are semiconductor manufacturing, not agriculture."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate tribal ownership or operation; defaulting to false prevents tribal-only incentives from being incorrectly calculated."
},
{
"inputKey": "is_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied organization size is 1,000+ employees, making small-business qualification unrealistic."
},
{
"inputKey": "owns_facility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied ownership status is Own."
},
{
"inputKey": "tenant_landlord_split_incentive_risk",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is owner-controlled, so tenant-landlord approval is not the primary barrier."
},
{
"inputKey": "electric_utility_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "SRP is self-reported in the supplied profile, but the normalized utility verification status remains self_reported_unverified."
},
{
"inputKey": "electric_utility_provider",
"value": "Salt River Project",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form identifies Salt River Project, but customer class and account-level eligibility should still be validated."
},
{
"inputKey": "gas_utility_provider",
"value": "Southwest Gas",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form identifies Southwest Gas."
},
{
"inputKey": "annual_kwh",
"value": 1707000000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied synthetic utility profile already includes annual kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 11054100000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Converted from supplied annual electric cost of $110,541,000."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 408480000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Converted from supplied annual gas cost of $4,084,800."
},
{
"inputKey": "annual_water_sewer_cost_cents",
"value": 1518250000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Converted from supplied annual water/sewer cost of $15,182,500."
},
{
"inputKey": "annual_waste_cost_cents",
"value": 523000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Converted from supplied annual waste cost of $5,230,000."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 6.48,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Converted from supplied average cost per kWh of $0.0648."
},
{
"inputKey": "campus_acres",
"value": 700,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied notes describe a roughly 700-acre semiconductor campus."
},
{
"inputKey": "square_footage",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Square footage is explicitly unknown in the supplied profile and should not be guessed for formula-driven grants."
},
{
"inputKey": "has_cleanroom_process_loads",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied description identifies cleanroom manufacturing and process utilities."
},
{
"inputKey": "critical_load_or_high_reliability_site",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Semiconductor fabs normally require high reliability, tight environmental control, and uninterrupted process support."
},
{
"inputKey": "large_load_interconnection_review_likely",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large onsite generation, storage, or EV fast charging at this campus would plausibly require utility engineering review."
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
"value": "budgetary_screening",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At exploring stage for a large industrial campus, the realistic procurement status is budgetary screening rather than awarded construction."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate that a grant or rebate application has been submitted."
},
{
"inputKey": "utility_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Many utility incentives require preapproval before purchase or installation; no preapproval is present in the test case."
},
{
"inputKey": "will_start_work_before_incentive_approval",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "This should remain unknown because starting work before approval can suppress many incentive estimates."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "energy_management_system",
"projectScopeSummary": "Campus-wide industrial energy management and process utility optimization platform integrating chilled water, compressed dry air, make-up air, exhaust, pumps, substations, and cleanroom environmental monitoring. Scope is plausible but must be treated as a custom engineered measure.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 245000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A multi-building fab campus EMS integration would be materially larger than the preview cost; this budgetary value is realistic for software, controls integration, metering, commissioning, and cybersecurity review."
},
{
"inputKey": "controlled_annual_kwh",
"value": 1020000000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes the controls platform touches roughly 60% of the supplied annual electricity use, excluding process tools or areas not suitable for automated control."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 20400000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A conservative 2% savings on controlled electric load is plausible for industrial utility optimization, but actual eligibility requires measurement and verification."
},
{
"inputKey": "measurement_and_verification_plan_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Large custom industrial incentives normally require engineering review, baselines, and post-install verification."
},
{
"inputKey": "final_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is exploring; no quote is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely requires custom utility review rather than deemed rebate calculation.",
"Savings must be normalized against production throughput and cleanroom operating requirements.",
"Cybersecurity, uptime, and process validation may limit controllable load."
]
},
{
"retrofitTypeId": "automated_demand_response_controls",
"projectScopeSummary": "Automated demand-response enablement for noncritical HVAC, chilled-water staging, thermal storage dispatch, battery-ready controls, and administrative building load shedding, excluding production tools and cleanroom conditions that cannot be interrupted.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 180000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large industrial demand-response controls across a semiconductor campus would require controls integration, engineering, testing, and operational safeguards."
},
{
"inputKey": "enrolled_dispatchable_kw",
"value": 8000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site has very large electric use, but only a small fraction should be assumed dispatchable because fab process reliability is highly constrained."
},
{
"inputKey": "dispatch_duration_hours",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A two-hour curtailment window is a conservative planning assumption for noncritical campus loads."
},
{
"inputKey": "critical_process_load_excluded",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cleanroom and process equipment should not be assumed available for curtailment without site engineering approval."
},
{
"inputKey": "utility_dr_enrollment_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No enrollment or preapproval is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Eligibility depends on SRP program availability for very large industrial customers.",
"Actual incentive may be performance-based rather than upfront.",
"Participation may be limited by production schedules and reliability commitments."
]
},
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "Industrial retro-commissioning study for chilled water plants, make-up air handlers, exhaust systems, heat recovery, pumps, compressed dry air, process cooling water, and utility metering.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 22500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A campus-scale industrial retro-commissioning study would likely be far larger than a small commercial study and include specialist engineering."
},
{
"inputKey": "study_cost_cents",
"value": 22500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Study cost is treated as the eligible planning cost until implementation scope is defined."
},
{
"inputKey": "implementation_budget_cents",
"value": 140000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A placeholder implementation budget is realistic for low- and medium-cost controls, sequencing, and balancing measures, but should require a findings report."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 13656000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 0.8% annual electric savings from optimization on the supplied annual kWh."
},
{
"inputKey": "rcx_report_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No study report is supplied, so implementation incentives should require scope confirmation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Planning or study incentives may require approval before contracting.",
"Implementation incentives should not calculate until measures, costs, and savings are itemized.",
"Production-normalized baselines are required for defensible savings."
]
},
{
"retrofitTypeId": "engineering_feasibility_study",
"projectScopeSummary": "Feasibility study for waste heat recovery, high-temperature heat pumps, advanced process cooling, water reuse energy impacts, and onsite energy resilience options.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 35000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A specialized industrial engineering feasibility study for a semiconductor fab campus can reasonably cost several hundred thousand dollars."
},
{
"inputKey": "study_cost_cents",
"value": 35000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The study cost is the primary eligible cost for planning-stage grant evaluation."
},
{
"inputKey": "study_vendor_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor or executed scope is supplied."
},
{
"inputKey": "final_scope_of_work_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A feasibility study grant should require a defined scope before calculation."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Should usually be handled as needs_quote or needs_project_scope until a study scope is provided.",
"Some programs may exclude studies for large private industrial customers.",
"Do not infer implementation eligibility from study eligibility."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replacement or retrofit of selected non-cleanroom comfort HVAC and make-up air system components, including high-efficiency motors, VFDs, controls, and selected rooftop or air-handler upgrades. Does not assume wholesale cleanroom HVAC replacement.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 360000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Campus-scale HVAC component upgrades are plausible, but scope should be limited to eligible efficiency measures and not total fab mechanical infrastructure."
},
{
"inputKey": "hvac_units_or_air_handlers_affected",
"value": 32,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large campus could have many air handlers; 32 affected units is a conservative partial-scope planning assumption."
},
{
"inputKey": "estimated_total_tons_affected",
"value": 4800,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The value represents selected comfort and support HVAC capacity, not total process cooling or cleanroom capacity."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 11949000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly 0.7% of supplied annual kWh, reflecting only selected nonprocess HVAC and fan/pump improvements."
},
{
"inputKey": "equipment_efficiency_cut_sheets_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Deemed HVAC rebates often require equipment specifications, which are not supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Cleanroom HVAC is process-critical and may not fit standard commercial HVAC rebate categories.",
"Custom calculation is more realistic than deemed-tonnage rebates.",
"Equipment efficiency data and baseline assumptions are required."
]
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"projectScopeSummary": "Additional submeters for major electrical distribution, chilled water plants, process cooling loops, compressed air, UPW/water systems, and representative cleanroom support loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 95000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Industrial-grade submetering with integration to existing campus systems can reasonably approach seven figures."
},
{
"inputKey": "meter_count",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 120-meter scope is realistic for a large campus but remains a planning assumption."
},
{
"inputKey": "includes_revenue_grade_meters",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Revenue-grade or high-accuracy meters are commonly needed for M&V on custom industrial projects."
},
{
"inputKey": "standalone_energy_savings_claimed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Submetering alone should not be assumed to save energy without operational measures."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Monitoring-only projects often do not receive direct energy-efficiency grants unless bundled with verified implementation measures.",
"Should be used as enabling scope for custom projects, not forced into a positive grant estimate by itself."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Targeted LED retrofit for warehouses, support buildings, utility corridors, parking structures, and exterior areas. Excludes cleanroom lighting unless fixture compatibility and contamination protocols are confirmed.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 185000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A realistic campus LED scope would be much larger than the preview fixture count but should still be a targeted partial project."
},
{
"inputKey": "fixture_count",
"value": 8500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large manufacturing campus could have thousands of fixtures; 8,500 is plausible for non-cleanroom and exterior scope."
},
{
"inputKey": "average_watt_reduction_per_fixture",
"value": 65,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A mixed retrofit of high-bay, troffer, exterior, and corridor fixtures could average around 65 watts saved per fixture."
},
{
"inputKey": "annual_operating_hours",
"value": 6500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Industrial support spaces and exterior/security lighting often operate long hours, though exact schedules should be verified."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 3591250,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Fixture count multiplied by average watt reduction and operating hours yields a planning estimate of approximately 3.59 million kWh."
},
{
"inputKey": "lighting_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fixture schedule or audit is supplied, so rebate calculations should remain provisional."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Standard lighting rebates may cap incentives or require preapproval.",
"Cleanroom lighting should not be included without specialized fixture and contamination compatibility review.",
"Fixture schedule and invoices are needed for final calculation."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Employee and visitor workplace charging project using networked Level 2 chargers at campus parking areas; not designed as a public charging depot.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 76000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 40-port workplace charging project with electrical distribution, trenching, networking, and make-ready costs can reasonably cost several hundred thousand dollars."
},
{
"inputKey": "charger_level",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Workplace charging is more likely to use Level 2 ports than DC fast charging."
},
{
"inputKey": "charging_ports",
"value": 40,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 1,000+ employee campus can realistically support a moderate employee charging installation."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked charging is common for workplace access control, utilization tracking, and grant reporting."
},
{
"inputKey": "public_access",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The most realistic scope is employee and visitor charging on a controlled industrial campus, not public charging."
},
{
"inputKey": "fleet_charging_primary_use",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate an electrified vehicle fleet project."
},
{
"inputKey": "utility_make_ready_review_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Even Level 2 charging additions at a large campus may require electrical capacity and utility coordination."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Some EV programs prioritize public, multifamily, corridor, disadvantaged-community, or fleet charging and may not fit an employee-only campus project.",
"Final incentive may depend on port count, network status, public access, and make-ready costs.",
"Utility preapproval should be required before calculation if program rules require it."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Networked Level 2 workplace charging for employees and controlled visitors, using shared parking locations near administrative and support buildings.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 76000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Same underlying Level 2 scope as the generic EV charger project."
},
{
"inputKey": "level_2_ports",
"value": 40,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 40-port deployment is realistic for workplace charging at a large employer campus."
},
{
"inputKey": "estimated_kw_per_port",
"value": 7.2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "7.2 kW is a common Level 2 planning assumption."
},
{
"inputKey": "total_connected_kw",
"value": 288,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "40 ports multiplied by 7.2 kW per port."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Employee-only access may reduce eligibility for public-access EV infrastructure grants.",
"Make-ready and networking costs require quote documentation.",
"Duplicate calculations should be avoided if generic EV charger and Level 2 charger retrofit IDs map to the same project."
]
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"projectScopeSummary": "Small DC fast charging pilot for campus fleet transition, executive pool vehicles, or controlled visitor charging. This is not assumed to be public corridor infrastructure.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 210000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Two 150 kW DC fast chargers with make-ready and transformer upgrades could cost around $2.1 million at an industrial campus, but this is speculative without a fleet plan."
},
{
"inputKey": "dcfc_ports",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small pilot is plausible, but there is no supplied evidence that DCFC is needed."
},
{
"inputKey": "charger_power_kw_each",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "150 kW is a common DC fast charger planning size."
},
{
"inputKey": "public_access",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A secure semiconductor campus is unlikely to host unrestricted public charging by default."
},
{
"inputKey": "fleet_electrification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fleet plan is supplied, so DCFC should not be assumed to qualify."
},
{
"inputKey": "utility_interconnection_or_service_upgrade_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A 300 kW DCFC pilot can require utility and service-capacity review even on a large campus."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force DCFC grant eligibility without public-access, corridor, disadvantaged-community, or fleet-transition evidence.",
"Should be needs_project_scope or likely_ineligible for many EV infrastructure grants.",
"Avoid duplicating with Level 2 workplace charging incentives."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Potential gas-fired CHP or fuel-cell CHP concept to support campus resilience and thermal loads. The project is not yet scoped and may conflict with decarbonization goals or utility interconnection limits.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP at a semiconductor fab would require a formal engineering study, interconnection review, air permitting, and thermal host analysis before eligible cost is credible."
},
{
"inputKey": "system_kw",
"value": 10000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "10 MW is a plausible concept size for a very large industrial campus, but not enough to calculate incentives without scope and permitting data."
},
{
"inputKey": "uses_natural_gas",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Conventional CHP would likely rely on natural gas, and the supplied profile includes Southwest Gas service."
},
{
"inputKey": "thermal_host_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No thermal-load matching study is supplied."
},
{
"inputKey": "air_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large combustion generation would require air permitting review before project viability is clear."
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
"Many clean-energy grants exclude fossil-fueled CHP or require very high efficiency and emissions criteria.",
"Should be suppressed or set to needs_project_scope until technology, fuel, emissions, and interconnection status are known.",
"Large-load interconnection and air permitting are major gating issues."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biogas energy concept using externally sourced renewable gas or waste-derived fuel is not a natural fit for a semiconductor fab campus and is not assumed to be part of the current project pipeline.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No onsite biogas feedstock, wastewater digester, agricultural waste stream, or landfill gas source is identified."
},
{
"inputKey": "onsite_biogenic_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Semiconductor fabrication does not normally generate the organic feedstock needed for onsite biogas energy systems."
},
{
"inputKey": "wastewater_digestor_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate anaerobic digestion infrastructure."
},
{
"inputKey": "renewable_fuel_supply_contract_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fuel supply contract is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not make this project qualify without feedstock, technology, fuel contract, and permitting evidence.",
"Most biomass or biogas programs are not a realistic default for a semiconductor manufacturing campus.",
"Should be likely_ineligible or needs_project_scope."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Geothermal heat pump concept for administrative or support buildings only; not assumed suitable for cleanroom/process loads or full-campus heating and cooling.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ground-source heat pump cost depends on building loads, loop-field design, geology, drilling constraints, and site conflicts."
},
{
"inputKey": "served_area_square_feet",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Square footage is unknown and should not be guessed for geothermal sizing."
},
{
"inputKey": "borefield_area_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The campus is large, but actual borefield availability depends on utilities, cleanroom vibration constraints, security, and expansion plans."
},
{
"inputKey": "geotechnical_or_thermal_conductivity_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geothermal feasibility or test-bore data is supplied."
},
{
"inputKey": "process_cooling_replacement_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Ground-source heat pumps should not be assumed to replace specialized fab process cooling."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Possible for small support buildings, but not realistic as a major fab-campus grant without design data.",
"Should remain needs_project_scope and quote_required.",
"Do not infer eligibility from campus acreage alone."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar thermal domestic hot water concept for cafeterias, locker rooms, and administrative buildings; not assumed to serve process hot water.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 92000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large campus domestic hot water solar thermal system could cost under $1 million, but the actual load profile is unknown."
},
{
"inputKey": "collector_area_square_feet",
"value": 6000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 6,000 square-foot collector area is plausible for a campus support-load project but should not be treated as confirmed."
},
{
"inputKey": "serves_process_hot_water",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Process hot water requirements in semiconductor fabrication are specialized and should not be assumed compatible."
},
{
"inputKey": "domestic_hot_water_load_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No domestic hot water load study or gas submetering is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"May qualify for tax incentives or renewable thermal incentives where available, but grant calculation should require load data.",
"Not a natural high-priority measure compared with process cooling, controls, and water systems.",
"Should be needs_project_scope unless domestic hot water load is documented."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "High-efficiency refrigeration replacement for cafeterias, labs, sample storage, and support facilities only; not semiconductor process chillers or process cooling loops.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 48000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Support-building refrigeration could be a modest project at a large campus, but it is not likely a major energy measure."
},
{
"inputKey": "refrigeration_units_replaced",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited support-facility replacement scope is plausible."
},
{
"inputKey": "process_chillers_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Process chillers should be handled separately as industrial process cooling, not commercial refrigeration."
},
{
"inputKey": "equipment_specifications_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No refrigeration equipment schedule or efficiency specifications are supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Only support refrigeration should be eligible under typical commercial refrigeration incentives.",
"Industrial process cooling should be evaluated as a custom measure instead.",
"May be too small relative to site load and may require equipment-specific rebate data."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "Smart thermostat and zoning controls for administrative offices, conference areas, training rooms, and support buildings. Excludes cleanroom and process-controlled environments.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 24000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large campus may have many office/support zones, but the project remains a relatively small subset of total site energy use."
},
{
"inputKey": "thermostat_or_zone_count",
"value": 160,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "160 zones is plausible for administrative and support buildings at a large campus."
},
{
"inputKey": "cleanroom_zones_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cleanroom environmental controls should not be treated as smart thermostat retrofit scope."
},
{
"inputKey": "annual_kwh_savings",
"value": 850000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest savings estimate is appropriate because the scope applies only to support spaces."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May not qualify if program rules target small commercial thermostats or exclude complex BAS-integrated sites.",
"Should not be scaled to the full campus load.",
"Avoid duplicate savings with broader EMS scope."
]
},
{
"retrofitTypeId": "window_replacement",
"projectScopeSummary": "Selective high-performance window replacement for office and administrative buildings only. Not a primary fab energy measure.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 135000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited administrative-building window project could be costly, but it is unlikely to be pursued primarily for grant economics at a semiconductor fab."
},
{
"inputKey": "window_area_square_feet",
"value": 30000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Represents a selective office/support-building assumption, not full campus envelope."
},
{
"inputKey": "primary_energy_measure",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Envelope measures are unlikely to be a central energy opportunity for cleanroom/process manufacturing loads."
},
{
"inputKey": "fenestration_specifications_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No window specifications or quote are supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many commercial envelope incentives require detailed U-factor, SHGC, baseline, and conditioned-area data.",
"The project is unlikely to be material for campus grant planning.",
"Should not be forced to qualify without an actual office-building envelope project."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine is not a realistic default for this controlled industrial campus because of low relative contribution, permitting complexity, aviation/safety constraints, and limited fit with fab operations.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind resource study, site plan, turbine size, or permitting path is supplied."
},
{
"inputKey": "system_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Wind turbine size should remain unknown because there is no project evidence."
},
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind study is supplied."
},
{
"inputKey": "zoning_or_permitting_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No permitting review is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Small wind should be treated as not relevant unless the user provides a specific project.",
"Do not calculate based on generic renewable-energy eligibility.",
"Large industrial campuses usually pursue solar, storage, procurement, or efficiency before small wind."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SRP_BUSINESS_SOLUTIONS_CUSTOM_ENERGY_EFFICIENCY",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "srp_account_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "SRP is self-reported but not account-verified in the supplied normalized profile."
},
{
"inputKey": "custom_measure_m_and_v_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Custom industrial incentives should require project-specific savings documentation."
},
{
"inputKey": "preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval is supplied."
}
],
"reasoning": "Custom efficiency is plausible for EMS, demand response controls, RCx implementation, HVAC/process utility optimization, and metering-enabled measures, but should not calculate without quote, savings model, account verification, and preapproval status."
},
{
"opportunityId": "SRP_BUSINESS_SOLUTIONS_LIGHTING_REBATE",
"expectedHandling": "calculate_if_formula_ready",
"inputFacts": [
{
"inputKey": "eligible_fixture_count",
"value": 8500,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning count for non-cleanroom lighting retrofit."
},
{
"inputKey": "cleanroom_fixtures_excluded",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Cleanroom fixture eligibility requires specialized review and should not be included by default."
},
{
"inputKey": "itemized_fixture_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A final estimate should need fixture schedule, wattages, and cut sheets."
}
],
"reasoning": "A lighting rebate can be provisionally calculated if the formula accepts fixture counts and wattage assumptions, but the confidence should remain low until the fixture schedule and preapproval are available."
},
{
"opportunityId": "SRP_BUSINESS_SOLUTIONS_HVAC_OR_MOTORS_CUSTOM",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "process_loads_excluded_from_deemed_hvac",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Process cooling and cleanroom systems should not be treated as ordinary commercial HVAC replacements."
},
{
"inputKey": "equipment_cut_sheets_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Equipment details are needed for deemed or custom HVAC incentives."
}
],
"reasoning": "HVAC-related grants may be realistic for selected support systems, VFDs, motors, and air handlers, but this campus requires custom scoping and cannot be estimated from generic tonnage."
},
{
"opportunityId": "SRP_DEMAND_RESPONSE_OR_LOAD_MANAGEMENT",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "dispatchable_kw",
"value": 8000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Only noncritical loads are assumed dispatchable."
},
{
"inputKey": "critical_process_loads_excluded",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Fab process reliability should constrain participation."
},
{
"inputKey": "program_enrollment_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No demand-response enrollment evidence is present."
}
],
"reasoning": "Demand response is plausible given the large load, but estimates should depend on enrollment, nominated kW, dispatch rules, and customer-specific operational approval."
},
{
"opportunityId": "ARIZONA_OR_LOCAL_WORKPLACE_EV_CHARGING",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "level_2_ports",
"value": 40,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Realistic employee workplace charging scope."
},
{
"inputKey": "public_access",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A secure industrial campus is assumed employee/visitor access only."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application is supplied."
}
],
"reasoning": "Workplace Level 2 charging is plausible, but many EV grants require active application windows, public access, equity location criteria, or fleet commitments."
},
{
"opportunityId": "EV_DC_FAST_CHARGING_PUBLIC_CORRIDOR_PROGRAM",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "public_access",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No evidence supports unrestricted public access."
},
{
"inputKey": "corridor_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is an industrial campus charging concept, not a highway corridor charging site."
}
],
"reasoning": "DC fast charger grants should not be forced positive for a private, employee-focused industrial campus without public corridor or fleet evidence."
},
{
"opportunityId": "FEDERAL_OR_STATE_NONPROFIT_PUBLIC_SECTOR_ENERGY_GRANTS",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Intel Ocotillo is not a nonprofit customer."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Private industrial facility."
}
],
"reasoning": "Public, municipal, school, and nonprofit-only grants should be suppressed."
},
{
"opportunityId": "USDA_REAP_OR_AGRICULTURAL_ENERGY_PROGRAM",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Semiconductor manufacturing is not agricultural production."
},
{
"inputKey": "rural_small_business_assumption_allowed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a large industrial campus in Chandler, Arizona, and the organization has 1,000+ employees."
}
],
"reasoning": "Agricultural and rural small-business energy programs should not be applied."
},
{
"opportunityId": "TRIBAL_ENERGY_OR_TRIBAL_ENTITY_PROGRAM",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied fact indicates tribal ownership or operation."
}
],
"reasoning": "Tribal-only grants should not be calculated for this profile."
},
{
"opportunityId": "RESIDENTIAL_ENERGY_REBATES_OR_TAX_CREDITS",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "site_type",
"value": "industrial_manufacturing",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied normalized profile identifies industrial_manufacturing."
}
],
"reasoning": "Residential-only opportunities are not relevant to a semiconductor fabrication campus."
},
{
"opportunityId": "BIOMASS_BIOGAS_RENEWABLE_ENERGY_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "onsite_biogenic_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No onsite organic feedstock or digester source is present in the supplied facts."
}
],
"reasoning": "Biomass/biogas energy is not a realistic default project for this site."
},
{
"opportunityId": "SMALL_WIND_RENEWABLE_ENERGY_GRANT",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "wind_resource_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind project evidence is supplied."
}
],
"reasoning": "Small wind should not be calculated merely because the site is large; there is no project scope, wind study, or permitting evidence."
},
{
"opportunityId": "GEOTHERMAL_HEAT_PUMP_TAX_OR_GRANT_PROGRAM",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "served_area_square_feet",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Square footage and served loads are unknown."
},
{
"inputKey": "geotechnical_test_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No geothermal feasibility information is supplied."
}
],
"reasoning": "Geothermal may be possible for support buildings but should not calculate without building load and borefield data."
},
{
"opportunityId": "CHP_OR_DISTRIBUTED_GENERATION_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "fuel_type",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Conventional CHP would likely use natural gas, but this can make it ineligible for clean-energy grants."
},
{
"inputKey": "thermal_host_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No thermal-load study is supplied."
},
{
"inputKey": "air_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Air permitting review is a major gate for combustion-based generation."
}
],
"reasoning": "CHP should not be treated as automatically grant-eligible; technology, fuel, emissions, thermal utilization, and interconnection are unresolved."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "square_footage",
"reason": "needs user decision"
},
{
"inputKey": "srp_account_number_or_verified_rate_schedule",
"reason": "source requires agency approval"
},
{
"inputKey": "utility_preapproval_id",
"reason": "application not submitted"
},
{
"inputKey": "final_vendor_quotes_by_measure",
"reason": "quote not available"
},
{
"inputKey": "itemized_lighting_fixture_schedule",
"reason": "quote not available"
},
{
"inputKey": "hvac_equipment_cut_sheets_and_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "custom_measure_baseline_energy_model",
"reason": "quote not available"
},
{
"inputKey": "measurement_and_verification_plan",
"reason": "quote not available"
},
{
"inputKey": "demand_response_program_enrollment_confirmation",
"reason": "application not submitted"
},
{
"inputKey": "dc_fast_charging_public_access_commitment",
"reason": "needs user decision"
},
{
"inputKey": "fleet_electrification_plan",
"reason": "needs user decision"
},
{
"inputKey": "geothermal_borefield_design",
"reason": "quote not available"
},
{
"inputKey": "wind_resource_assessment",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biogas_feedstock_supply_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "chp_air_permit_or_interconnection_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "domestic_hot_water_load_study",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The profile is a private, for-profit semiconductor manufacturing campus, so residential, nonprofit, municipal, school, tribal, agricultural, and small-business opportunities should be suppressed unless a specific rule covers large industrial customers.",
"The site is in Arizona and self-reports SRP service; opportunities outside Arizona or outside SRP territory should remain blocked.",
"The project stage is exploring, so preapproval, application status, final quotes, and engineering baselines should generally remain missing unless already supplied.",
"Large cleanroom and process loads make generic commercial HVAC, thermostat, and envelope assumptions unreliable; use custom industrial treatment or suppress until scoped.",
"Demand-response potential is plausible but should exclude critical process and cleanroom loads unless the customer confirms operational flexibility.",
"DC fast charging should not qualify for public corridor or equity-focused EV grants without evidence of public access, eligible location, or fleet-transition commitment.",
"Biomass, biogas, and small wind are not realistic default projects for this campus and should not be made positive merely because renewable-energy opportunities exist.",
"Ground-source geothermal and solar water heating may be possible for small support-building scopes, but should remain needs_project_scope because building loads and square footage are unknown.",
"Submetering should not be counted as a standalone energy-saving measure unless paired with verified operational or capital improvements.",
"Preview costs in the supplied retrofit summaries appear admin-modeled and too small for a campus-scale semiconductor project; grant calculations should prefer quote-required handling for custom measures."
]
}

