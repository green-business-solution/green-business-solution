{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "la-montanita-nob-hill-albuquerque",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on the supplied test-case facts for an Albuquerque leased grocery co-op with refrigeration and prepared-food loads. The profile intentionally includes a mix of plausible projects, quote-gated inputs, and likely ineligible measures rather than forcing positive grant estimates. Supplied prompt reference: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form already identifies the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_quote",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An exploring-stage tenant grocery site would typically not yet have contractor quotes for multiple capital measures."
},
{
"inputKey": "utility_customer_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile lists Public Service Company of New Mexico as the self-reported electric utility and includes annual electric usage and cost."
},
{
"inputKey": "electric_customer_class",
"value": "commercial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 15,000 square foot grocery retailer with 720,000 annual kWh would normally be served on a commercial electric account."
},
{
"inputKey": "gas_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form names New Mexico Gas Company and the utility summaries include annual gas cost."
},
{
"inputKey": "ownership_status",
"value": "tenant_lease",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the site ownership status as Lease and the normalized profile identifies the ownership relationship as tenant."
},
{
"inputKey": "landlord_consent_required_for_rooftop_or_structural_work",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant would normally need landlord approval for rooftop solar, roof penetrations, exterior equipment, structural work, or utility interconnection changes."
},
{
"inputKey": "organization_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile identifies the organization as a commercial business; cooperative ownership does not by itself establish nonprofit status for grant eligibility."
},
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A grocery co-op is not a municipal, county, state, federal, or other public entity."
},
{
"inputKey": "organization_is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building activity is grocery retail, refrigerated food merchandising, produce handling, and prepared foods."
},
{
"inputKey": "organization_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile is for a grocery retailer, not a farm, ranch, or primary agricultural production facility."
},
{
"inputKey": "organization_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied fact indicates tribal ownership, tribal government status, or location on tribal land."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A single grocery retail site may receive deliveries, but the supplied facts do not indicate ownership of a vehicle fleet."
},
{
"inputKey": "customer_parking_available",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A neighborhood grocery store would commonly have some customer parking, making a limited Level 2 EV charging project plausible."
},
{
"inputKey": "disadvantaged_community_or_priority_area_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No census tract, place GEOID, or agency designation is provided; incentives depending on disadvantaged-community status should remain uncertain."
},
{
"inputKey": "annual_kwh",
"value": 720000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric usage is already present in the site energy profile."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 8640000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual electric cost is already present in the site energy profile as $86,400."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 990000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Annual gas cost is already present in the utility summaries as $9,900."
},
{
"inputKey": "site_has_refrigeration_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description and primary activity identify refrigeration and refrigerated food merchandising."
},
{
"inputKey": "site_has_prepared_foods_or_commercial_kitchen_load",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies prepared foods as part of the primary activity."
},
{
"inputKey": "has_submitted_grant_application",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is still exploring, so application-dependent awards should not be counted as approved or probable."
},
{
"inputKey": "has_contractor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote, bid, or installed-cost document is included in the supplied test case."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "energy_audit",
"projectScopeSummary": "ASHRAE Level 1 or light Level 2 audit focused on refrigeration controls, lighting, HVAC rooftop units, domestic hot water, demand charges, and waste/organics operating costs.",
"inputFacts": [
{
"inputKey": "audit_level",
"value": "ASHRAE_Level_1_with_targeted_refrigeration_review",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grocery site at exploring stage would reasonably begin with a walk-through or targeted audit before committing to capital measures."
},
{
"inputKey": "audit_cost_cents",
"value": 650000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $6,500 audit is plausible for a 15,000 square foot grocery with refrigeration, lighting, HVAC, and food-service loads."
},
{
"inputKey": "audit_includes_refrigeration_measures",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Refrigeration is a major end use for the profile and should be included in any useful audit."
},
{
"inputKey": "audit_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No engineering proposal or audit quote is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Grant or rebate programs may require a pre-approved auditor or utility authorization before work begins.",
"Any estimate should remain quote-gated until the audit scope and invoice are available."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace remaining fluorescent linear lamps and older exterior fixtures with LED fixtures and controls in sales floor, back-of-house, walk-in cooler support areas, receiving, office, and exterior/security lighting.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1850000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing preview cost is very low for only 12 fixture replacements; a broader grocery lighting scope around $18,500 is more realistic for 15,000 square feet if some fixtures are already LED."
},
{
"inputKey": "interior_led_fixture_count",
"value": 94,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A partially upgraded small grocery could plausibly have roughly 90 to 100 remaining interior fixtures or fixture equivalents."
},
{
"inputKey": "exterior_led_fixture_count",
"value": 10,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A small customer parking and storefront area would commonly have several wall-pack, canopy, or security fixtures."
},
{
"inputKey": "lighting_operating_hours_per_year",
"value": 5200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Grocery retail lighting tends to operate long hours, including stocking and cleaning time."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 48500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This is a conservative reduction of about 6.7% of annual site kWh, plausible for a partial lighting retrofit in a refrigeration-heavy grocery."
},
{
"inputKey": "requires_preapproval",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Many utility lighting incentives require preapproval or a reservation before installation."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No contractor lighting quote or fixture schedule is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Rebate calculation should require eligible fixture schedule, baseline wattage, proposed wattage, and utility preapproval status.",
"Already-upgraded areas should be excluded."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop units serving the sales floor and back-of-house areas with high-efficiency electric heat-pump RTUs or equivalent high-efficiency commercial units; preserve kitchen ventilation and refrigeration systems separately.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10800000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Three commercial rooftop unit replacements with curb adapters, crane, electrical, controls, and commissioning can plausibly cost around $108,000."
},
{
"inputKey": "rtu_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 15,000 square foot grocery would commonly use multiple packaged units rather than one central system."
},
{
"inputKey": "total_cooling_capacity_tons",
"value": 30,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Approximately 30 tons is a conservative planning assumption for a small grocery, recognizing internal refrigeration and food-service loads."
},
{
"inputKey": "existing_equipment_age_years",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Equipment age is needed to distinguish early replacement, replace-on-burnout, or maintenance-driven replacement."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 36000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A modest HVAC efficiency improvement is plausible, but refrigeration dominates the electric profile."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": 1800,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Therm savings depend on whether existing RTUs use gas heat and whether the replacement electrifies heating."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No HVAC proposal, model numbers, or mechanical schedule is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Many HVAC incentives require exact AHRI-rated equipment, efficiency values, and baseline comparison.",
"Tenant needs landlord approval for rooftop equipment replacement.",
"If existing equipment is not near end of life, cost-effectiveness and eligibility may be weaker."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Tenant-interest rooftop solar PV project sized below annual load, subject to landlord approval, roof condition review, structural review, and utility interconnection feasibility.",
"inputFacts": [
{
"inputKey": "dc_kw_capacity",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 75 kWdc system is plausible for a 15,000 square foot grocery roof after setbacks, rooftop equipment, and usable-area constraints."
},
{
"inputKey": "ac_kw_capacity",
"value": 60,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "An AC rating around 80% of DC nameplate is a typical planning assumption."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18750000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "$2.50/Wdc is a reasonable synthetic planning cost for a small commercial rooftop PV project before detailed design."
},
{
"inputKey": "estimated_annual_kwh_production",
"value": 120000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "New Mexico solar resource makes roughly 120,000 kWh/year plausible for 75 kWdc, before detailed shading and design analysis."
},
{
"inputKey": "percent_of_annual_load_offset",
"value": 16.7,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "120,000 kWh divided by 720,000 annual kWh is about 16.7%."
},
{
"inputKey": "roof_or_landlord_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is leased and rooftop project control is not confirmed."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Exploring-stage projects should not be treated as having submitted interconnection applications."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No PV quote, site plan, production model, or interconnection review is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Tax-credit-style estimates may calculate only if ownership, tax appetite, direct-pay eligibility, or transferability assumptions are supported.",
"Landlord consent, roof condition, structural capacity, and interconnection are unresolved.",
"Utility or state incentives should remain quote- and application-gated until program-specific requirements are known."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Behind-the-meter battery paired with possible solar PV to reduce demand charges and improve short-duration resilience for refrigeration, POS, and critical circuits.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 100,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 100 kW battery is a plausible planning size for a small commercial grocery with refrigeration loads."
},
{
"inputKey": "battery_energy_kwh",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 2.5-hour battery supports demand management and limited backup rather than full-store long-duration resilience."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "$500/kWh all-in is a plausible preliminary cost for small commercial battery storage with controls and integration."
},
{
"inputKey": "paired_with_solar",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Pairing with the proposed rooftop PV is the most plausible way to improve economics and eligibility for some storage incentives."
},
{
"inputKey": "critical_load_backup_scope",
"value": "refrigeration_pos_network_and_limited_lighting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A full-store backup system would be much more expensive; critical-load backup is more realistic for a tenant grocery."
},
{
"inputKey": "estimated_peak_kw_reduction",
"value": 55,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Peak reduction depends on the rate schedule, controls, and interval load shape, which are not supplied."
},
{
"inputKey": "interconnection_or_export_approval_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial storage projects commonly require utility review, especially if grid-parallel or paired with solar."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No storage design, equipment quote, or control strategy is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Demand-charge savings require interval data and rate schedule confirmation.",
"Resilience grants often require critical-facility, public-safety, or community-benefit criteria that are not established here.",
"Tenant and landlord must agree on equipment location, access, insurance, and end-of-lease treatment."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Install two dual-port Level 2 chargers for customers and staff in existing parking area, assuming limited trenching and panel capacity review.",
"inputFacts": [
{
"inputKey": "charger_level",
"value": "level_2",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Level 2 charging is a realistic customer-facing amenity for a neighborhood grocery store."
},
{
"inputKey": "charger_station_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two charging stations is a conservative scope for a single retail grocery site."
},
{
"inputKey": "charging_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Dual-port Level 2 units would provide four parking-space connectors."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 4800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "$48,000 is plausible for two dual-port commercial Level 2 stations including electrical work, bollards, signage, networking, and moderate installation complexity."
},
{
"inputKey": "public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Customer-accessible chargers are more realistic for a retail grocery than fleet-only chargers."
},
{
"inputKey": "fleet_only",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owned vehicle fleet is indicated."
},
{
"inputKey": "make_ready_work_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Parking-lot charging generally requires some electrical make-ready work and protective equipment."
},
{
"inputKey": "utility_preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project is at exploring stage and no preapproval submission is supplied."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No charger quote or electrical contractor scope is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Many EV charger incentives require application approval before purchase or installation.",
"Eligibility may depend on public-access hours, networked charger requirements, ADA space design, and utility make-ready rules.",
"Tenant must confirm parking control and landlord consent."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "General EV charging project represented by the same realistic scope as Level 2 charging unless the user chooses DC fast charging.",
"inputFacts": [
{
"inputKey": "selected_ev_charger_scope",
"value": "two_dual_port_level_2_public_customer_chargers",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "For this grocery profile, general EV charger calculations should default to the practical Level 2 scope rather than DC fast charging."
},
{
"inputKey": "charging_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four Level 2 ports are plausible for customers and staff."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 4800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the same synthetic cost as the specific Level 2 charging project to avoid double-counting."
},
{
"inputKey": "duplicate_of_level_2_scope",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The general EV charger retrofit and Level 2 retrofit overlap and should not both be counted independently."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Avoid double-counting this general EV charger scope and the Level 2 EV charger scope.",
"Program estimates should be quote- and preapproval-gated."
]
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"projectScopeSummary": "DC fast charging is not the preferred base-case scope for this tenant grocery; it may be considered only if utility capacity, parking dwell time, charging demand, and make-ready support are confirmed.",
"inputFacts": [
{
"inputKey": "dcfc_station_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One DCFC station is the smallest plausible scope, but it is not obviously aligned with a neighborhood grocery's typical dwell time and electrical infrastructure."
},
{
"inputKey": "dcfc_power_kw",
"value": 50,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 50 kW DC fast charger is a lower-power option that could reduce make-ready burden, but still requires significant electrical review."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "DCFC cost is highly site-specific and should not be calculated without utility make-ready and electrical upgrade information."
},
{
"inputKey": "utility_capacity_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No transformer, service capacity, panel capacity, or utility make-ready review is supplied."
},
{
"inputKey": "host_site_business_case_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No evidence of fast-charging demand, parking dwell-time fit, or charging revenue plan is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"DC fast charging should remain suppressed or needs-project-scope until the user confirms utility capacity and business case.",
"Level 2 charging is the more realistic base-case EV project for this customer."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar thermal domestic hot water preheat system for prepared foods, handwashing, and cleaning loads; not a core priority unless hot-water usage is verified.",
"inputFacts": [
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": 180,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small collector array could serve domestic hot water, but sizing is uncertain without hot-water load data."
},
{
"inputKey": "storage_tank_gallons",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A modest preheat tank volume is plausible for prepared foods and cleaning but not confirmed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The existing preview cost of $6,800 appears too low for commercial solar thermal; $95,000 is a plausible installed planning cost but should be quote-gated."
},
{
"inputKey": "annual_therm_savings",
"value": 1600,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual gas use is not supplied, only gas cost; savings depend on actual domestic hot-water load."
},
{
"inputKey": "hot_water_load_profile_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Prepared-food activity suggests hot-water use, but not enough to size or justify solar thermal."
},
{
"inputKey": "roof_or_landlord_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The tenant would need roof access and landlord approval."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate a positive incentive until hot-water load, roof control, and quote data are available.",
"This is less likely than lighting, refrigeration controls, HVAC, or Level 2 EV charging."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source geothermal heat pump is not a realistic base-case retrofit for a leased urban grocery because borefield access, parking disruption, lease control, and project cost are unresolved.",
"inputFacts": [
{
"inputKey": "ground_loop_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No feasible ground-loop location or design is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The existing preview cost is likely far too low for commercial geothermal with drilling and building integration; a quote is required."
},
{
"inputKey": "land_area_or_borefield_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A leased urban retail site generally cannot assume control of land or parking areas for a borefield."
},
{
"inputKey": "tenant_landlord_approval_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is leased and geothermal would involve substantial permanent infrastructure."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Likely needs suppression unless the user confirms long-term site control, borefield feasibility, landlord consent, and a real design.",
"High-efficiency RTU replacement is the more realistic HVAC measure."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not a realistic base-case project for this 15,000 square foot grocery because thermal host load and continuous operating profile are not established.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP sizing requires interval electric load and a verified year-round thermal load."
},
{
"inputKey": "annual_useful_thermal_load_mmbtu",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No thermal load profile is supplied, and annual gas cost is modest relative to electric cost."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP cost depends on capacity, thermal recovery, controls, gas service, interconnection, and emissions requirements."
},
{
"inputKey": "thermal_host_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied annual gas cost does not suggest an obvious large year-round thermal host load."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force a CHP incentive for a small grocery without verified thermal load and interconnection feasibility.",
"Battery storage or refrigeration controls are more plausible for resilience and demand management."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Microgrid concept consisting of rooftop PV, battery storage, critical-load panel, transfer controls, and limited refrigeration/POS backup; not a full-building islandable microgrid.",
"inputFacts": [
{
"inputKey": "microgrid_scope",
"value": "critical_load_pv_battery_controls",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Critical-load microgrid is more realistic than full-store backup for a leased grocery."
},
{
"inputKey": "pv_dc_kw",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the rooftop PV planning size."
},
{
"inputKey": "battery_kwh",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the battery storage planning size."
},
{
"inputKey": "critical_load_kw",
"value": 65,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Critical-load demand depends on refrigeration circuits, compressors, controls, POS, and lighting; this value is a placeholder."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Microgrid cost depends heavily on one-line design, switchgear, controls, islanding protection, and utility requirements."
},
{
"inputKey": "community_resilience_or_critical_facility_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is a grocery store, which may have community value, but no official critical-facility designation is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Many microgrid grants favor public, nonprofit, tribal, emergency, or critical facilities; this commercial tenant profile should not be assumed eligible.",
"Could become plausible if paired with a documented community resilience role and real engineering design."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage is not a base-case project; it could be considered only as refrigeration load shifting or cold-storage resilience after an engineering study.",
"inputFacts": [
{
"inputKey": "thermal_storage_type",
"value": "refrigeration_load_shift_or_phase_change_storage",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For a grocery, thermal storage would most plausibly relate to refrigeration, but this is a specialized design."
},
{
"inputKey": "storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal storage capacity requires refrigeration load and controls analysis."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No refrigeration engineer scope or thermal storage quote is supplied."
},
{
"inputKey": "time_of_use_or_demand_response_value_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile lists demand-related fields as available, but no actual interval data or tariff analysis is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Needs engineering study and rate analysis before any grant estimate should calculate.",
"Specialized thermal storage is less likely than lighting, refrigeration controls, or battery storage."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Onsite biomass or biogas energy system is not realistic for this urban grocery tenant; food waste reduction or organics diversion would be more plausible than energy generation.",
"inputFacts": [
{
"inputKey": "onsite_biomass_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grocery produces some organics waste but not enough consistent feedstock for an onsite biogas energy system."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No anaerobic digestion, gas cleanup, generator, or thermal use project scope is present."
},
{
"inputKey": "air_permit_or_waste_permit_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion or waste-to-energy equipment would generally trigger permitting and siting issues."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should be treated as unrealistic for this customer unless the user supplies a specific offsite or shared-digester project.",
"Organics service optimization may be relevant operationally, but not as an onsite energy retrofit."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind turbine is not realistic for this leased urban grocery location because of zoning, turbulence, limited land control, and poor fit with a Central Avenue retail site.",
"inputFacts": [
{
"inputKey": "wind_turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No tower location, wind resource study, zoning approval, or land control is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Small wind costs are highly site-specific and not appropriate to estimate for this urban tenant profile."
},
{
"inputKey": "zoning_or_land_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A leased neighborhood grocery site should not be assumed to have tower siting authority."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless a real wind feasibility study, zoning path, and site control are supplied."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "LEED certification is not realistic as a stand-alone retrofit for a small leased grocery unless tied to a major remodel or landlord-led building project.",
"inputFacts": [
{
"inputKey": "leed_project_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No major renovation, new construction, landlord-led certification, or tenant improvement scope is supplied."
},
{
"inputKey": "certification_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Certification costs require consultant scope, registration, documentation, and project boundaries."
},
{
"inputKey": "major_renovation_planned",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The project stage is exploring and no renovation scope is described."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not estimate LEED incentives without a defined certification path and major project scope.",
"Tenant-only operational improvements are more realistic than full-building certification."
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
"reasoning": "Existing opportunity-specific input already suppresses this Washington solar B&O classification workflow because the site is in New Mexico and is a grocery retailer."
}
],
"reasoning": "This should remain suppressed; do not create Washington solar manufacturing facts for a New Mexico grocery."
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
"reasoning": "Existing opportunity-specific input suppresses Rhode Island renewable property-tax valuation because the site is in New Mexico."
}
],
"reasoning": "Do not reuse the rooftop PV AC capacity for this Rhode Island-specific workflow."
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
"reasoning": "Existing opportunity-specific input suppresses the Michigan Renewable Energy Renaissance Zone workflow because the profile is not in Michigan."
}
],
"reasoning": "Do not force a Michigan renewable energy zone designation for a New Mexico tenant grocery."
},
{
"opportunityId": "GENERIC_PNM_COMMERCIAL_LIGHTING_OR_CUSTOM_EFFICIENCY_REBATE",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_electric",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "PNM is the listed electric utility."
},
{
"inputKey": "measure_type",
"value": "commercial_led_lighting",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "LED lighting is a realistic grocery efficiency project."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 1850000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning cost for a partial lighting retrofit."
},
{
"inputKey": "preapproval_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval documentation is included."
}
],
"reasoning": "Lighting may be a strong candidate for a utility efficiency incentive, but estimates should require fixture schedule, baseline/proposed wattage, cost, and preapproval status."
},
{
"opportunityId": "GENERIC_PNM_COMMERCIAL_HVAC_EFFICIENCY_REBATE",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "measure_type",
"value": "high_efficiency_commercial_rooftop_units",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial RTU replacement is plausible for the site."
},
{
"inputKey": "rtu_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning assumption for a 15,000 square foot grocery."
},
{
"inputKey": "equipment_efficiency_rating",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Exact equipment ratings are needed for HVAC incentive calculations."
},
{
"inputKey": "preapproval_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No preapproval documentation is included."
}
],
"reasoning": "HVAC incentives may be possible but should not calculate without model numbers, efficiency ratings, baseline equipment, and approval status."
},
{
"opportunityId": "GENERIC_COMMERCIAL_SOLAR_PV_TAX_CREDIT_OR_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "dc_kw_capacity",
"value": 75,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning size for rooftop PV."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18750000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Preliminary all-in installed cost assumption."
},
{
"inputKey": "system_owner",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Tax and grant treatment depends on whether the tenant, landlord, or third-party owner owns the system."
},
{
"inputKey": "roof_control_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is leased and roof control is not confirmed."
},
{
"inputKey": "domestic_content_or_energy_community_bonus_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Bonus-credit eligibility is not established by supplied facts."
}
],
"reasoning": "PV is technically plausible, but grant or tax-credit estimates should be gated by ownership, landlord approval, interconnection, quote, and bonus-credit evidence."
},
{
"opportunityId": "GENERIC_COMMERCIAL_BATTERY_STORAGE_OR_RESILIENCE_GRANT",
"expectedHandling": "suppress_no_probability_evidence",
"inputFacts": [
{
"inputKey": "battery_energy_kwh",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning size for a critical-load battery."
},
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No official critical-facility or public-resilience role is supplied."
},
{
"inputKey": "community_benefit_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No resilience grant application package is supplied."
}
],
"reasoning": "Battery storage is plausible for demand management, but resilience grants should not be counted without program fit, public/community benefit evidence, and application status."
},
{
"opportunityId": "GENERIC_COMMERCIAL_LEVEL_2_EV_CHARGING_REBATE",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "charging_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two dual-port chargers are realistic for the site."
},
{
"inputKey": "public_access",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Customer-facing charging is a plausible use case."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 4800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Planning cost for two dual-port Level 2 chargers."
},
{
"inputKey": "application_status",
"value": "not_submitted",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No program application or reservation is supplied."
},
{
"inputKey": "landlord_parking_approval_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is leased and parking/electrical work approval is not confirmed."
}
],
"reasoning": "Level 2 EV charging is a realistic candidate, but many programs require preapproval before installation."
},
{
"opportunityId": "GENERIC_DC_FAST_CHARGING_CORRIDOR_OR_PUBLIC_CHARGING_GRANT",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "dcfc_power_kw",
"value": 50,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Only a small DCFC placeholder is included, and even that may be unrealistic."
},
{
"inputKey": "utility_capacity_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No capacity review or make-ready study is present."
},
{
"inputKey": "charging_gap_or_corridor_need_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No public fast-charging need analysis or application package is supplied."
}
],
"reasoning": "Do not assume this urban grocery qualifies for DCFC grant funding without utility, siting, and public-need evidence."
},
{
"opportunityId": "GENERIC_NONPROFIT_PUBLIC_SECTOR_OR_SCHOOL_ENERGY_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "organization_is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied organization type is Commercial Business."
},
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is a grocery co-op, not a public entity."
},
{
"inputKey": "organization_is_school",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility type and activity are grocery retail."
}
],
"reasoning": "Programs limited to public entities, schools, or nonprofits should generally suppress for this profile."
},
{
"opportunityId": "GENERIC_AGRICULTURAL_PRODUCER_RURAL_ENERGY_GRANT",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Produce handling and grocery retail do not establish agricultural producer status."
},
{
"inputKey": "rural_small_business_status",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The address is in Albuquerque, but program-specific rural eligibility should not be guessed without a formal lookup."
}
],
"reasoning": "Do not force agricultural or rural eligibility merely because the grocery sells produce."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quote_total_cost_cents",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers_and_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "utility_preapproval_or_reservation_id",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_status",
"reason": "application not submitted"
},
{
"inputKey": "landlord_roof_and_parking_consent_document",
"reason": "needs user decision"
},
{
"inputKey": "roof_structural_capacity_report",
"reason": "quote not available"
},
{
"inputKey": "solar_interconnection_application_status",
"reason": "application not submitted"
},
{
"inputKey": "interval_meter_data_15_min_or_hourly",
"reason": "needs user decision"
},
{
"inputKey": "confirmed_rate_schedule_and_demand_charge_tariff",
"reason": "needs user decision"
},
{
"inputKey": "dc_fast_charger_utility_make_ready_study",
"reason": "source requires agency approval"
},
{
"inputKey": "critical_facility_or_resilience_designation",
"reason": "source requires agency approval"
},
{
"inputKey": "disadvantaged_community_or_priority_area_designation",
"reason": "source requires agency approval"
},
{
"inputKey": "hot_water_usage_profile_gallons_per_day",
"reason": "needs user decision"
},
{
"inputKey": "ground_source_geothermal_borefield_design",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_study_and_zoning_approval",
"reason": "unrealistic for this customer"
},
{
"inputKey": "onsite_biogas_feedstock_contract_or_permit",
"reason": "unrealistic for this customer"
},
{
"inputKey": "leed_registration_and_certification_scope",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The site is a leased commercial grocery, so landlord consent is required for rooftop, parking-lot, structural, exterior, or permanent equipment work.",
"Cooperative ownership should not be treated as nonprofit, public-sector, school, tribal, or agricultural-producer eligibility without explicit documentation.",
"The New Mexico site should not receive estimates for state-specific programs in Washington, Rhode Island, Michigan, or other non-New-Mexico geographies.",
"Rooftop solar and storage are plausible but should be gated by roof control, quote, interconnection, ownership, and tax/grant eligibility facts.",
"Level 2 EV charging is plausible; DC fast charging is not a base-case assumption without utility capacity and business-case evidence.",
"Ground-source geothermal, CHP, small wind, onsite biogas, full microgrid, thermal storage, and LEED certification are not realistic default projects for this tenant grocery.",
"Application-dependent programs should remain suppressed or pending when the project is still exploring and no preapproval or reservation has been submitted.",
"Quote-dependent rebates should not use preview fixture counts or placeholder admin costs when actual measure schedules and contractor costs are missing."
]
}

