{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "california-endowment-hq",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment for an owner-controlled nonprofit office headquarters and conference center in LADWP territory. Inputs are intended to support grant-estimation test behavior, not to assert actual grant eligibility. Supplied test-case facts identify the organization, nonprofit status, LADWP electric service, owner control, 210,459 square feet, annual electric use, and existing retrofit previews. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object lists the project stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_rfp",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At an exploring stage, a nonprofit owner would typically be gathering scope and budget information before issuing an RFP or selecting a contractor."
},
{
"inputKey": "organization_is_nonprofit",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied test case identifies the organization type as Nonprofit Organization."
},
{
"inputKey": "organization_is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The organization is a private nonprofit philanthropy, not a city, county, school district, state agency, or other public-sector entity."
},
{
"inputKey": "organization_is_school_or_school_district",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The facility is an office headquarters and conference center for a health-equity philanthropy, not a school campus or school-bus depot."
},
{
"inputKey": "organization_operates_school_buses",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A grantmaking office and conference center would not normally own or operate school buses."
},
{
"inputKey": "organization_is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied NAICS and activity description are for grantmaking and nonprofit administration, not agricultural production."
},
{
"inputKey": "organization_is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate tribal ownership, tribal government status, or tribal enterprise status."
},
{
"inputKey": "site_is_owner_controlled",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Ownership status is supplied as Own and normalized as owner."
},
{
"inputKey": "electric_distribution_utility_id",
"value": "UTIL_LADWP",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile maps the reported electric utility to UTIL_LADWP."
},
{
"inputKey": "electric_customer_class",
"value": "commercial_nonprofit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 210,459-square-foot office and conference center operated by a nonprofit would normally be treated as a commercial or institutional electric customer, but the actual tariff should be confirmed from a bill."
},
{
"inputKey": "gas_utility_provider",
"value": "Southern California Gas Company",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form lists Southern California Gas Company as the gas provider."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 47358000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile supplies annual electric cost of $473,580."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 7871000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The utility summaries supply annual gas cost of $78,710."
},
{
"inputKey": "annual_kwh",
"value": 2631000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site energy profile supplies annual electricity consumption of 2,631,000 kWh."
},
{
"inputKey": "nonprofit_property_tax_exemption_claimed",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic tax facts indicate a claimed nonprofit property tax exemption; this should remain overrideable because the source is synthetic."
},
{
"inputKey": "annual_property_tax_due_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic tax facts indicate zero annual property tax due, consistent with a welfare exemption scenario but still requiring confirmation from actual assessor documents."
},
{
"inputKey": "has_board_or_capital_committee_approval_for_retrofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "At the exploring stage, major capital measures such as PV, storage, HVAC replacement, or microgrid work should not be assumed to have final approval."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate that any grant application has been submitted."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summaries are fixture previews and not customer quotes."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install a modest workplace and visitor charging project serving staff, grantees, event visitors, and a small nonprofit-owned vehicle pool; not a school-bus charging depot and not assumed to be NEVI-compliant public fast charging.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied EV charger preview cost of $8,480 as a small test-case fixture amount; a real installation would require a contractor quote."
},
{
"inputKey": "charger_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four ports is plausible for a nonprofit headquarters parking facility and matches the opportunity-count scale without overbuilding the scenario."
},
{
"inputKey": "charger_station_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Two dual-port chargers is a common configuration for a four-port workplace charging scope."
},
{
"inputKey": "charger_power_level",
"value": "level_2_ac",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Level 2 charging is more realistic than DC fast charging for an office and conference-center workplace project."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate highway-corridor or public fast-charging intent."
},
{
"inputKey": "public_access_required",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic default is workplace and visitor charging controlled by the property owner, not fully public 24/7 charging."
},
{
"inputKey": "fleet_vehicle_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small administrative vehicle pool is plausible, but actual fleet information is not supplied."
},
{
"inputKey": "school_bus_charging_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a nonprofit office headquarters and conference center, not an eligible school-bus site."
},
{
"inputKey": "quote_status",
"value": "budgetary_estimate_only",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied preview explicitly says it is not a customer quote or final savings estimate."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Workplace Level 2 chargers may qualify for some commercial EV incentives, but the matched school-bus and NEVI-style opportunities should not be treated as automatically eligible.",
"Any grant requiring public fast charging, corridor siting, minimum uptime, disadvantaged-community scoring, or agency preapproval should be suppressed until those facts are provided.",
"A contractor quote and utility interconnection or service-capacity review would be needed before calculating a firm incentive estimate."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Replace a small batch of interior fixtures in office, meeting, and support areas as a pilot or maintenance-driven LED upgrade rather than a full-building relight.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied LED preview upfront cost of $1,604.25."
},
{
"inputKey": "fixture_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied LED assumptions state that the preview assumes 12 fixture replacements."
},
{
"inputKey": "lighting_area_type",
"value": "office_conference_common_areas",
"valueType": "enum",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building use includes office administration, conference activity, meetings, and community events."
},
{
"inputKey": "existing_fixture_type",
"value": "mixed_linear_fluorescent_and_older_led",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large office campus may have a mix of remaining fluorescent and older LED fixtures, but actual fixture inventory is not supplied."
},
{
"inputKey": "new_fixture_type",
"value": "high_efficiency_led_fixture_or_retrofit_kit",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "LED fixture or retrofit kit replacement is consistent with the retrofit type."
},
{
"inputKey": "controls_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Occupancy or daylight controls are plausible in meeting rooms and common areas and may affect lighting incentive calculations."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No actual lighting audit or contractor quote is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Lighting rebates often require existing fixture wattage, proposed fixture wattage, operating hours, and post-installation verification.",
"The current 12-fixture scope is too small to represent a whole-building grant project."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace or upgrade selected aging rooftop or packaged HVAC units serving office and conference spaces, using efficient electric cooling and controls while retaining a conventional commercial HVAC configuration.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied HVAC preview upfront cost of $7,980 as a small modeled fixture, not a full-campus HVAC budget."
},
{
"inputKey": "hvac_unit_count",
"value": 3,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited replacement of several packaged units is plausible, but actual equipment count is not supplied."
},
{
"inputKey": "served_floor_area_sqft",
"value": 25000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial-scope HVAC project serving roughly 10-15% of the building is more realistic for the supplied small preview cost than a whole-building replacement."
},
{
"inputKey": "existing_hvac_fuel",
"value": "mixed_electric_cooling_gas_heat",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building has both significant electric and gas costs, so a mixed commercial HVAC configuration is plausible."
},
{
"inputKey": "proposed_measure_type",
"value": "high_efficiency_packaged_unit_replacement_with_controls",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A selective packaged-unit replacement is a common commercial-office HVAC measure."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied summary says the preview uses an admin-modeled kWh reduction, but no equipment-specific efficiency inputs are provided."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "HVAC incentive estimates generally need equipment schedule, efficiency ratings, baseline equipment, and a contractor quote."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Should calculate only for programs with formula-ready deemed incentives or clear custom-calculation rules.",
"Suppress custom grant estimates until equipment efficiency, tonnage, served area, and quote data are available."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Pilot electrification of selected gas-heated zones with commercial heat pump HVAC equipment, likely focused on administrative or meeting areas rather than the entire campus.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1172000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied heat pump HVAC preview upfront cost of $11,720."
},
{
"inputKey": "heat_pump_unit_count",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small pilot with two units is plausible for the preview cost; a whole-building heat pump conversion would cost far more."
},
{
"inputKey": "served_floor_area_sqft",
"value": 12000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited pilot scope is more realistic than assuming the full 210,459-square-foot building is electrified."
},
{
"inputKey": "existing_heating_fuel_displaced",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes SoCalGas service and annual gas cost, so gas heat displacement is plausible."
},
{
"inputKey": "electrical_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Electrification may require panel or service-capacity work, but no electrical assessment is supplied."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Heat pump HVAC incentives usually need equipment model, capacity, efficiency, baseline fuel, and installation cost."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Potentially relevant to building-electrification incentives, but actual eligibility depends on gas equipment displacement, equipment efficiency, and LADWP or SoCalGas program rules.",
"Do not assume whole-building decarbonization based on the small preview cost."
]
},
{
"retrofitTypeId": "heat_pump_water_heater",
"projectScopeSummary": "Replace one small commercial gas water-heating plant or point-of-use water heater serving pantry, catering, restroom, or conference-center support loads with a heat pump water heater.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 350000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied heat pump water heater preview cost of $3,500."
},
{
"inputKey": "heat_pump_water_heater_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "One unit is consistent with the small preview cost and a limited support-load replacement."
},
{
"inputKey": "storage_capacity_gallons",
"value": 80,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An 80-gallon unit is plausible for small commercial support loads but should be confirmed against the actual water-heating design."
},
{
"inputKey": "existing_water_heater_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has SoCalGas service and annual gas cost, making gas water heating plausible."
},
{
"inputKey": "commercial_kitchen_or_catering_load_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied notes instruct the model to treat catering loads separately."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A real estimate should use equipment model, storage size, existing fuel, and installed cost."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for heat pump water-heating incentives if the site replaces gas water heating and meets commercial equipment requirements.",
"Sizing should not be assumed adequate for full conference-center catering loads without a plumbing assessment."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Install a rooftop or parking-canopy solar PV system sized conservatively against the large office campus load; final size depends on roof/canopy area, structural review, and LADWP interconnection.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied rooftop solar PV preview cost of $100,000."
},
{
"inputKey": "system_size_kw_dc",
"value": 100,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 100 kW DC system is conservative relative to 2,631,000 annual kWh and plausible as a test-case project rather than a maximum buildout."
},
{
"inputKey": "estimated_annual_pv_kwh",
"value": 150000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A rough planning value of 1,500 kWh per kW-year in Los Angeles is plausible for synthetic testing, but should not replace a solar production model."
},
{
"inputKey": "on_site_load_exceeds_generation",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The estimated 150,000 kWh annual PV output is far below the supplied annual usage of 2,631,000 kWh."
},
{
"inputKey": "roof_or_canopy_structural_review_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No structural or site-layout review is supplied."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No LADWP interconnection application status is supplied."
},
{
"inputKey": "quote_status",
"value": "budgetary_estimate_only",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview is not a customer quote."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Solar incentives and tax-credit monetization may require ownership, direct-pay eligibility, prevailing wage, domestic-content, energy-community, or low-income-community facts that are not supplied.",
"Do not calculate incentives that depend on interconnection approval or a signed EPC quote until those inputs exist."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Install behind-the-meter battery storage for demand management, resilience for conference operations, and potential PV pairing; not assumed to be a community resilience hub microgrid unless separately scoped.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied battery storage preview cost of $72,800."
},
{
"inputKey": "battery_power_kw",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An 80 kW planning size is plausible for a limited resilience and demand-management pilot at a large office site."
},
{
"inputKey": "battery_capacity_kwh",
"value": 240,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 3-hour battery duration is a common planning assumption, but actual sizing requires load profiles and resilience objectives."
},
{
"inputKey": "paired_with_new_solar_pv",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Storage pairing with a proposed PV project is plausible and useful for test-case grant logic."
},
{
"inputKey": "critical_loads_defined",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No emergency, resilience, or conference-center critical-load list is supplied."
},
{
"inputKey": "quote_status",
"value": "budgetary_estimate_only",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Storage cost and eligible basis depend heavily on design, controls, interconnection, and code requirements."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Battery grants often require resilience purpose, critical-load documentation, community-serving facility designation, or application scoring evidence.",
"Suppress resilience-specific grant estimates until critical loads and public/community service commitments are documented."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Potential PV-plus-storage microgrid concept for campus resilience, but not realistic as an active grant-ready project without a feasibility study and explicit community-resilience scope.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied microgrid preview cost of $109,200, which is more consistent with an early placeholder than a full microgrid."
},
{
"inputKey": "microgrid_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study, one-line diagram, or islanding design is supplied."
},
{
"inputKey": "islanding_capability_included",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A microgrid grant calculation should not assume islanding capability without engineering scope."
},
{
"inputKey": "critical_facility_designation",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site hosts meetings and community events, but no supplied facts establish formal critical-facility or emergency-response status."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A microgrid requires engineering design and vendor quotes before any credible incentive calculation."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The organization could explore resilience funding, but this profile lacks evidence of a grant-ready microgrid project.",
"Do not force qualification based only on PV and storage interest."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump concept for long-term decarbonization, but unlikely to be pursued for this urban office campus without site geotechnical review, drilling feasibility, and major capital planning.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied geothermal preview cost of $15,760 as a placeholder; it is not a realistic full geothermal project cost."
},
{
"inputKey": "ground_loop_feasibility_study_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No subsurface feasibility, drilling plan, or available land area evidence is supplied."
},
{
"inputKey": "available_drilling_area_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An urban headquarters campus near downtown Los Angeles should not be assumed to have suitable ground-loop drilling area."
},
{
"inputKey": "system_capacity_tons",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity requires a mechanical design and load calculation."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Geothermal project cost and eligibility depend on engineering, drilling, and major HVAC scope."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress grants unless the user confirms a serious ground-source project with feasibility data.",
"A small placeholder preview cost should not produce a positive grant estimate for a large-campus geothermal project."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Possible small solar thermal preheat system for catering or domestic hot-water loads, but not a strong fit unless the conference-center hot-water load is large and consistent.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied solar water heating preview cost of $6,800."
},
{
"inputKey": "collector_area_sqft",
"value": 120,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small collector array is plausible for a limited test scope, but actual sizing requires hot-water load data."
},
{
"inputKey": "primary_hot_water_load_type",
"value": "conference_catering_and_domestic_hot_water",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied notes mention catering loads and the primary activity includes meetings and community events."
},
{
"inputKey": "annual_hot_water_therms",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Total gas cost is supplied, but the portion attributable to water heating is unknown."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar thermal eligibility and savings depend on hot-water load profile, collector design, and installed cost."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate a grant unless a program specifically supports commercial solar thermal and the project has water-heating load data.",
"For an office/conference center, heat pump water heating is a more typical electrification measure than new solar thermal."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not a realistic decarbonization grant target for this nonprofit office profile because it would add or continue on-site combustion and requires large steady thermal loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied CHP preview cost of $120,000 as a placeholder, not a grant-ready CHP budget."
},
{
"inputKey": "steady_thermal_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility has office and event uses, but no evidence of the large continuous thermal load normally needed for CHP economics."
},
{
"inputKey": "on_site_combustion_acceptability",
"value": "not_confirmed",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A health-equity nonprofit may not want new combustion-based generation, but actual sustainability policy is not supplied."
},
{
"inputKey": "chp_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity cannot be inferred without load interval data and thermal requirements."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "CHP eligibility and savings require an engineered scope and economic analysis."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force CHP grant qualification for a nonprofit office absent continuous thermal load and explicit project intent.",
"Many current clean-energy grant screens may prefer electrification, PV, and storage over combustion CHP."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas generation is not a realistic project for an urban nonprofit office headquarters with conference and catering loads.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied biomass/biogas preview cost of $90,000 as a placeholder."
},
{
"inputKey": "eligible_feedstock_source_on_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A nonprofit office and conference center does not normally generate agricultural, wastewater, landfill, or industrial organic feedstock at biogas-project scale."
},
{
"inputKey": "wastewater_or_agricultural_operation_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied building use is office administration, grantmaking, meetings, and community events."
},
{
"inputKey": "system_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No generation scope or feedstock assessment is supplied."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A biomass or biogas project would require feedstock, permitting, engineering, and vendor-cost inputs."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as likely ineligible or not relevant for this profile.",
"Do not calculate a positive grant estimate merely because the site is in California or is a nonprofit."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Targeted envelope improvements in roof, attic, or accessible wall/ceiling areas during maintenance work; not a full-building deep envelope retrofit.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 316000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied insulation preview cost of $3,160."
},
{
"inputKey": "insulated_area_sqft",
"value": 4000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 4,000-square-foot targeted scope is plausible for the small preview cost; full-campus insulation would be much larger."
},
{
"inputKey": "measure_area_type",
"value": "roof_or_accessible_ceiling_area",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Roof or ceiling insulation is more plausible than wall cavity work for a commercial office retrofit, but actual conditions are unknown."
},
{
"inputKey": "existing_r_value",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing insulation level is not supplied and is required for most deemed or custom calculations."
},
{
"inputKey": "proposed_r_value",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Proposed insulation level depends on contractor scope."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Envelope incentives generally require area, existing and proposed R-values, and installed cost."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Could qualify for some commercial efficiency programs if building-shell requirements are met.",
"Suppress custom savings-based grants until R-values, area, and quote are provided."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage concept for load shifting in a large office/conference center, but not assumed to be practical without chiller-plant details or interval demand data.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied thermal energy storage preview cost of $55,100."
},
{
"inputKey": "central_chiller_plant_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Thermal storage suitability depends on whether the site has a compatible chilled-water plant or large cooling load."
},
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Capacity cannot be inferred from annual kWh alone."
},
{
"inputKey": "interval_demand_data_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes annual electricity use and cost but no interval demand data."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Thermal storage estimates require design, controls integration, tariff analysis, and installed cost."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially relevant only if the site has a compatible central cooling plant and demand-management objective.",
"Do not calculate grant estimates from annual kWh and placeholder cost alone."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not a realistic measure for this urban Los Angeles office headquarters and should be treated as not relevant unless the user provides a specific engineered wind project.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied small-wind preview cost of $80,000 as a placeholder."
},
{
"inputKey": "wind_resource_assessment_complete",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No wind resource assessment is supplied."
},
{
"inputKey": "urban_rooftop_or_parcel_constraints_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is an urban office headquarters in Los Angeles; small wind is generally constrained by siting, zoning, turbulence, and structural issues."
},
{
"inputKey": "system_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No turbine size or design is supplied."
},
{
"inputKey": "quote_status",
"value": "not_available",
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A real small-wind incentive calculation would need turbine model, wind resource, interconnection, permitting, and cost data."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Treat as not relevant to this customer profile.",
"Do not force qualification for renewable-energy grants when the measure is implausible for the site."
]
},
{
"retrofitTypeId": "leed_certification",
"projectScopeSummary": "Potential administrative certification effort for an existing nonprofit headquarters, but not an energy grant measure with direct equipment cost savings in the supplied opportunity model.",
"inputFacts": [
{
"inputKey": "certification_scope",
"value": "existing_building_operations_and_maintenance_possible",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large owner-operated office campus could pursue building certification, but no certification intent is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No consultant, registration, commissioning, or certification cost is supplied."
},
{
"inputKey": "certification_application_started",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or certification record is supplied."
},
{
"inputKey": "energy_audit_or_commissioning_study_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Certification-related incentives often need a defined study, audit, or commissioning scope."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Certification should remain unsupported unless a specific program funds certification costs.",
"Do not treat LEED certification as an equipment retrofit with standard grant savings."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "site_is_school_bus_charging_site",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project site is a nonprofit office headquarters and conference center, not a school-bus charging site."
},
{
"inputKey": "applicant_operates_eligible_school_buses",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No facts indicate school-bus ownership, school district status, or contracted school transportation operations."
},
{
"inputKey": "proposed_charger_type_for_this_opportunity",
"value": "level_2_workplace_visitor_charging",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic EV scope is four Level 2 workplace or visitor ports, not school-bus depot infrastructure."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted application is present in the supplied profile."
}
],
"reasoning": "Despite the automated match, this opportunity should be suppressed or marked likely ineligible for this profile because the realistic project is not a school-bus charging project."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "nevi_public_fast_charging_scope",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic profile scope is Level 2 workplace and visitor charging, not NEVI-style public DC fast charging."
},
{
"inputKey": "dc_fast_charger_count",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No DC fast charger project is defined."
},
{
"inputKey": "public_access_24_7",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A headquarters parking facility would more likely be access-controlled or visitor-limited than open 24/7 to the public."
},
{
"inputKey": "corridor_or_community_charging_site_selected",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No evidence is supplied that the site was selected or designed for a NEVI corridor or community-charging solicitation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "NEVI-style projects require a detailed eligible-cost budget, which is not present."
}
],
"reasoning": "The organization type alone is insufficient. Keep the estimate suppressed unless the user provides a public DC fast-charging scope, site-selection facts, eligible cost budget, and application status."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "community_charging_project_scope_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic default is workplace and visitor charging, not a formal community-charging project."
},
{
"inputKey": "public_access_commitment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No supplied facts establish a public-access charging commitment."
},
{
"inputKey": "disadvantaged_or_priority_community_scoring_documented",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The profile does not include tract-level designation or program scoring facts."
},
{
"inputKey": "charger_port_count",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The EV project is modeled as four Level 2 ports."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No submitted application is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A solicitation estimate should use a program-eligible budget, not the small generic preview cost."
}
],
"reasoning": "Potential relevance depends on whether the project is redesigned as community-access charging. Do not calculate automatically from a workplace Level 2 charger fixture."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "actual_contractor_quote_cents",
"reason": "quote not available"
},
{
"inputKey": "grant_application_submission_date",
"reason": "application not submitted"
},
{
"inputKey": "agency_preapproval_or_award_status",
"reason": "source requires agency approval"
},
{
"inputKey": "utility_account_number_full",
"reason": "needs user decision"
},
{
"inputKey": "electric_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "interval_electric_demand_data",
"reason": "needs user decision"
},
{
"inputKey": "ev_charging_public_access_commitment",
"reason": "needs user decision"
},
{
"inputKey": "nevi_site_eligibility_documentation",
"reason": "source requires agency approval"
},
{
"inputKey": "school_bus_fleet_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "hvac_equipment_schedule",
"reason": "quote not available"
},
{
"inputKey": "heat_pump_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "solar_pv_shading_and_production_model",
"reason": "quote not available"
},
{
"inputKey": "ladwp_interconnection_application_number",
"reason": "application not submitted"
},
{
"inputKey": "battery_critical_load_panel_design",
"reason": "quote not available"
},
{
"inputKey": "microgrid_islanding_engineering_design",
"reason": "quote not available"
},
{
"inputKey": "geothermal_drilling_feasibility_report",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_or_biogas_feedstock_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_resource_assessment",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"The organization is a nonprofit owner, but nonprofit status alone should not qualify it for school-bus, NEVI, agricultural, tribal, public-entity, or critical-facility programs.",
"The EV charger match should not be treated as automatically eligible because the realistic project is workplace and visitor Level 2 charging, not school-bus charging or public fast charging.",
"The profile has no evidence of submitted applications, agency preapproval, awarded grant status, or program-specific site selection.",
"Preview costs are fixture inputs for testing and should not be treated as contractor quotes or final eligible project costs.",
"Biomass, biogas, small wind, CHP, full geothermal, and full microgrid scopes are not realistic default projects for an urban nonprofit office headquarters without explicit user-provided project intent.",
"Whole-building grant estimates should not be inferred from partial-scope preview inputs such as 12 lighting fixtures, two heat pump HVAC units, or one heat pump water heater.",
"Storage and microgrid incentives should remain suppressed when critical loads, islanding capability, and resilience service commitments are missing.",
"Solar PV and battery estimates should remain conditional until roof or canopy feasibility, structural review, interconnection status, and quote data are provided.",
"Gas-side electrification measures should rely on SoCalGas or applicable statewide rules only where the measure actually displaces gas equipment and has equipment-specific data.",
"LADWP electric territory is relevant for electric measures, but it does not prove eligibility for statewide competitive grants with separate solicitation criteria."
]
}

