{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "food-bank-rockies-aurora-dc",
"profileConfidence": "medium",
"profileNotes": "Synthetic grant-estimation project profile built from the supplied test-case context for a nonprofit Aurora warehouse/logistics food distribution center with cold storage, fleet operations, Xcel Energy service, and owner control. Citation to supplied prompt: . No grant qualification is forced where project scope, quote, application approval, or geography is missing.",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "site_zip5_corrected",
"value": "80019",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The structured address states Aurora, CO 80019. The normalized profile appears to have parsed the street number 20600 as zip5, so this should be corrected before geographic eligibility matching."
},
{
"inputKey": "site_state_code",
"value": "CO",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied site address is in Colorado, so Colorado programs may be relevant while non-Colorado programs should generally be suppressed."
},
{
"inputKey": "organization_type",
"value": "nonprofit_organization",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the customer as a nonprofit organization."
},
{
"inputKey": "federal_tax_exempt_status",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A food bank nonprofit would commonly have tax-exempt status, but the fixture does not include an IRS determination letter or EIN confirmation."
},
{
"inputKey": "property_control_status",
"value": "owner_controlled",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form says the organization owns the site, making capital projects more realistic than for a short-term tenant."
},
{
"inputKey": "building_type_primary",
"value": "warehouse_logistics_with_cold_storage",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is described as a warehouse/logistics distribution center with food storage and cold storage."
},
{
"inputKey": "building_square_feet",
"value": 270000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form and public-source notes both state roughly 270,000 square feet."
},
{
"inputKey": "electric_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form identifies Xcel Energy as the electric utility, but the account class and tariff remain unverified."
},
{
"inputKey": "electric_utility_provider_normalized",
"value": "xcel_energy",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer self-reported Xcel Energy electric service. Grant and rebate estimates should still ask for a bill or account schedule before finalizing utility-specific incentives."
},
{
"inputKey": "gas_utility_provider_normalized",
"value": "xcel_energy",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The customer self-reported Xcel Energy gas service."
},
{
"inputKey": "annual_kwh",
"value": 3600000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides annual electricity use. This is plausible for a large cold-storage distribution facility but should be confirmed from interval or billing data."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 39600000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides $396,000 annual electric cost, converted to cents."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 6175000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site energy profile provides $61,750 annual gas cost, converted to cents."
},
{
"inputKey": "estimated_customer_class",
"value": "commercial_nonresidential_large",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 270,000-square-foot warehouse distribution center with 3.6 million annual kWh would normally be treated as a large nonresidential customer rather than residential or small business."
},
{
"inputKey": "cold_storage_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form states cold storage is part of the primary activity."
},
{
"inputKey": "fleet_operations_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form describes fleet logistics."
},
{
"inputKey": "public_entity_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is described as a nonprofit, not a municipal, county, school district, or state entity."
},
{
"inputKey": "school_or_education_campus_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A food distribution warehouse is not an education campus, so school-only incentives should be suppressed."
},
{
"inputKey": "agricultural_producer_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Food distribution is not normally agricultural production, even if the organization handles food products."
},
{
"inputKey": "tribal_entity_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No supplied facts indicate tribal ownership or tribal entity status."
},
{
"inputKey": "disadvantaged_community_or_low_income_census_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The prompt does not include census tract, disadvantaged-community designation, or program-specific environmental justice status."
},
{
"inputKey": "nonprofit_property_tax_exemption_status",
"value": "partially_exempt",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing synthetic tax facts state the property is partially exempt."
},
{
"inputKey": "annual_property_tax_cents",
"value": 4720000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing synthetic tax facts provide annual property tax of $47,200."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form says the project stage is exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_rfp_no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Because the project is exploring and no vendor or quote is supplied, the most realistic procurement stage is pre-RFP or early scoping."
},
{
"inputKey": "grant_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application record is provided, and an exploring-stage customer would generally not have submitted a grant application."
},
{
"inputKey": "has_executed_vendor_contract",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture does not include a vendor contract; many grant programs require preapproval before construction or purchase."
},
{
"inputKey": "site_has_large_flat_roof_potential",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 270,000-square-foot warehouse commonly has enough roof area for a meaningful solar PV project, subject to structural, interconnection, and shading review."
},
{
"inputKey": "roof_structural_capacity_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar and roof-mounted equipment estimates should remain uncertain until roof age, structural capacity, and usable roof area are verified."
},
{
"inputKey": "backup_power_critical_loads_present",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Cold storage and food distribution operations create realistic critical-load resilience needs."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Exploratory rooftop solar PV concept sized conservatively for a large warehouse roof and annual electricity load, pending structural review, interconnection screening, and vendor quote.",
"inputFacts": [
{
"inputKey": "dc_kw_capacity",
"value": 750,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 270,000-square-foot warehouse can plausibly support a 500-1000 kW rooftop array, but 750 kW is conservative pending roof constraints."
},
{
"inputKey": "ac_kw_capacity",
"value": 600,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes an approximate 0.80 DC-to-AC ratio for a preliminary commercial PV design."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 142500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $1.90/Wdc installed cost for a 750 kW commercial rooftop PV concept."
},
{
"inputKey": "annual_kwh_generation_estimate",
"value": 1050000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 750 kW Colorado rooftop PV system could plausibly generate about 1.0-1.1 million kWh annually, offsetting less than one-third of the supplied 3.6 million kWh annual load."
},
{
"inputKey": "net_metering_or_bill_credit_structure_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The tariff, demand charges, and export compensation are not supplied."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No PV quote or engineering proposal is included in the test case."
},
{
"inputKey": "roof_structural_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The exploring-stage fixture does not include a structural assessment."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Federal elective-pay tax credit treatment may be relevant for a nonprofit but is not a grant and should not be counted as a grant unless modeled separately.",
"Utility or state solar incentives should require tariff, interconnection, and quote data.",
"Roof age and structural capacity could reduce or eliminate the project scope."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Battery storage concept paired with solar and cold-storage critical loads for resilience and demand management, not yet supported by a quote or load study.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 500,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 500 kW battery is plausible for a large cold-storage warehouse seeking demand-charge management and partial backup capability."
},
{
"inputKey": "battery_capacity_kwh",
"value": 2000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A four-hour 500 kW system is a realistic planning placeholder for commercial storage."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 90000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $450/kWh installed for a 2,000 kWh commercial battery system."
},
{
"inputKey": "paired_with_solar",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture mentions solar/storage potential, and pairing improves resilience and clean-energy use cases."
},
{
"inputKey": "critical_load_panel_or_microgrid_controls_included",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Whether the storage project includes islanding or critical-load backup depends on engineering design."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No battery proposal or cost breakdown is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Battery storage may be eligible for tax incentives or resilience programs, but this fixture has no matched active grant with a complete storage formula.",
"Demand-charge savings require interval data and tariff confirmation.",
"Resilience grants often require community-benefit or critical-facility evidence beyond the supplied record."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Solar-plus-storage microgrid concept for refrigerated food storage resilience, held as a planning option rather than a grant-ready project.",
"inputFacts": [
{
"inputKey": "microgrid_includes_islanding",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A microgrid would normally include islanding capability; otherwise it should be modeled as separate PV and storage."
},
{
"inputKey": "critical_load_kw",
"value": 350,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cold storage, refrigeration controls, IT, dock operations, and emergency lighting could create several hundred kW of critical load, but no load study is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 125000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Microgrid controls, switchgear, studies, and integration could materially increase storage project cost; this is a rough planning placeholder."
},
{
"inputKey": "utility_interconnection_study_started",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection status is included."
},
{
"inputKey": "engineering_feasibility_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Microgrid grants usually require feasibility documentation that is not present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Keep estimates suppressed unless a specific resilience or microgrid program is matched and requires the supplied nonprofit/cold-storage use case.",
"A microgrid is plausible operationally but not grant-ready without engineering and interconnection documentation."
]
},
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Fleet-focused charging depot concept with Level 2 charging for vans and box trucks plus conduit/panel capacity for future expansion.",
"inputFacts": [
{
"inputKey": "charging_use_case",
"value": "fleet_depot_private_nonpublic",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a logistics distribution center with fleet operations, making depot charging more realistic than public retail charging."
},
{
"inputKey": "level_2_ports",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Twelve Level 2 ports is plausible for a nonprofit fleet electrification pilot without assuming full fleet conversion."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Private fleet depot charging at a food bank would typically start with Level 2 charging unless medium-duty duty cycles require DC fast charging."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes about $8,000 per installed Level 2 port, including make-ready and networking, for a fleet depot installation."
},
{
"inputKey": "make_ready_cost_cents",
"value": 4200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Large warehouse sites may need panel, trenching, conduit, bollards, and networking work."
},
{
"inputKey": "charging_equipment_cost_cents",
"value": 5400000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Represents installed Level 2 charging hardware and related electrical work after separating make-ready."
},
{
"inputKey": "public_access_required",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A distribution center fleet depot would normally restrict chargers to fleet vehicles and staff rather than provide public fast charging."
},
{
"inputKey": "fleet_vehicles_to_electrify_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small pilot conversion of delivery vans or light-duty fleet vehicles is plausible, but the actual fleet inventory is not supplied."
},
{
"inputKey": "utility_service_upgrade_required",
"value": null,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Service capacity cannot be known without electrical drawings, load calculations, or a utility review."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No charger quote is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Programs designed for public DC fast-charging plazas may not fit a private Level 2 fleet depot.",
"Actual incentive calculation should require charger type, port count, make-ready scope, site host agreement, and application status.",
"Fleet electrification benefits are plausible but vehicle replacement costs are not included in this charger-only scope."
]
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"projectScopeSummary": "Optional medium-duty fleet DC fast-charging concept, treated as uncertain because the supplied record does not show public access, medium-duty vehicle commitments, or a utility capacity study.",
"inputFacts": [
{
"inputKey": "dc_fast_charger_ports",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Two DC fast-charge ports could serve medium-duty delivery vehicles, but this is more speculative than Level 2 charging."
},
{
"inputKey": "dc_fast_charger_power_kw_each",
"value": 150,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "150 kW is a common planning size for fast charging, but depot fleet needs may differ."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 26000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes about $130,000 per DC fast-charge port including equipment, electrical, civil, and commissioning costs."
},
{
"inputKey": "publicly_accessible_plaza",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The facility is a warehouse/logistics site, not a public charging plaza in the supplied description."
},
{
"inputKey": "utility_capacity_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No capacity study or service upgrade quote is supplied."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No DC fast-charging quote is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A public fast-charging plaza program should not be assumed to apply to a private depot.",
"Keep grant estimate suppressed or flagged as likely ineligible unless the customer confirms public access and program-required plaza design."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Twelve-port Level 2 charging installation for fleet vans, staff vehicles, and future phased electrification.",
"inputFacts": [
{
"inputKey": "level_2_ports",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 12-port Level 2 pilot is realistic for a logistics nonprofit beginning fleet electrification."
},
{
"inputKey": "networked_chargers",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial fleet charging projects commonly use networked equipment for scheduling, reporting, and demand management."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the broader EV charger installation planning cost for 12 installed Level 2 ports."
},
{
"inputKey": "charger_location",
"value": "private_fleet_parking_area",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A distribution center would likely place chargers near fleet parking or loading operations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Private Level 2 projects may qualify for some utility or fleet programs but not for public fast-charging plaza grants.",
"Application preapproval and final equipment list should be required before calculating a user-facing grant amount."
]
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"projectScopeSummary": "Cold-storage efficiency upgrade covering evaporator fan motors, door gaskets, strip curtains, electronically commutated motors, and selected case or cooler components.",
"inputFacts": [
{
"inputKey": "cold_storage_area_sqft",
"value": 45000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A substantial but not majority portion of a 270,000-square-foot food distribution center could be refrigerated or frozen storage; actual plans are needed."
},
{
"inputKey": "refrigeration_compressor_count",
"value": 6,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large cold-storage facility may have multiple compressor racks or units, but the equipment schedule is not supplied."
},
{
"inputKey": "evaporator_fan_motor_count",
"value": 80,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large refrigerated warehouse could plausibly have dozens of evaporator fans."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The provided preview cost is very small for a large cold-storage facility; a realistic partial refrigeration efficiency package could be closer to $185,000."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 220000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A refrigeration controls and equipment package could save a meaningful share of electric consumption, but savings require an audit or measurement plan."
},
{
"inputKey": "equipment_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No refrigeration equipment inventory is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Many refrigeration rebates are prescriptive or custom utility incentives rather than grants.",
"Grant estimate should require equipment counts, baseline efficiency, proposed equipment, and utility approval."
]
},
{
"retrofitTypeId": "refrigeration_controls_retrofit",
"projectScopeSummary": "Controls optimization for refrigeration scheduling, floating head pressure, evaporator fan cycling, anti-condensate controls, and monitoring.",
"inputFacts": [
{
"inputKey": "controls_scope",
"value": [
"floating_head_pressure",
"evaporator_fan_controls",
"defrost_optimization",
"temperature_monitoring",
"alarm_integration"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These measures are realistic for cold-storage energy management."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A controls package for a large cold-storage warehouse could plausibly cost around $120,000."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 180000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings are plausible but should be custom-calculated based on equipment run hours and load."
},
{
"inputKey": "measurement_and_verification_plan_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Custom incentives commonly require M&V or engineering calculations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely best handled as a utility custom incentive until a specific grant rule exists.",
"Should remain estimate-limited without refrigeration baseline data."
]
},
{
"retrofitTypeId": "anti_sweat_heater_controls",
"projectScopeSummary": "Install anti-sweat heater controls on refrigerated doors or display/storage access points where applicable.",
"inputFacts": [
{
"inputKey": "controlled_doors_count",
"value": 40,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Door count is plausible for cold rooms and access points but unknown without an equipment inventory."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small targeted controls measure could cost about $150 per controlled door, but actual applicability is uncertain."
},
{
"inputKey": "humidity_sensor_controls",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Humidity-based controls are a typical anti-sweat heater control measure."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"This is more likely a prescriptive utility rebate measure than a standalone grant.",
"Do not show a grant estimate unless a program explicitly covers this measure and a door count is confirmed."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Interior warehouse and office LED retrofit replacing older high-bay, strip, and office fixtures across a large distribution center.",
"inputFacts": [
{
"inputKey": "interior_fixture_replacement_count",
"value": 620,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The existing 12-fixture preview is unrealistically small for a 270,000-square-foot warehouse; several hundred fixtures is more plausible."
},
{
"inputKey": "high_bay_fixture_count",
"value": 430,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Most warehouse lighting would be high-bay or linear aisle lighting."
},
{
"inputKey": "office_or_support_area_fixture_count",
"value": 190,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Administrative and volunteer support areas likely use troffers, strips, or downlights, but the actual mix is unknown."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 24800000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes about $400 per installed fixture on average across high-bay and support-area lighting."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 310000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Lighting savings around 8-10% of annual electric use is plausible for a warehouse retrofit, pending baseline fixture wattage and hours."
},
{
"inputKey": "lighting_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No fixture schedule, audit, or quote is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Lighting is commonly eligible for utility rebates or custom incentives rather than grants.",
"Final estimate should require fixture schedule, baseline wattage, proposed wattage, hours, and preapproval status."
]
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"projectScopeSummary": "Occupancy, daylighting, and scheduling controls for warehouse aisles, docks, volunteer areas, and office zones.",
"inputFacts": [
{
"inputKey": "controlled_lighting_zones",
"value": 55,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large warehouse could reasonably have dozens of controlled zones."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 11000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes about $2,000 per zone including sensors, controls, programming, and commissioning."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 90000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Controls savings depend heavily on occupancy schedules and existing lighting controls."
},
{
"inputKey": "networked_lighting_controls",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Networked controls are plausible for a large warehouse seeking monitoring and scheduling."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Usually rebate- or custom-incentive-driven rather than grant-driven.",
"Should be tied to a lighting audit before calculating."
]
},
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"projectScopeSummary": "Parking, loading dock, yard, and security lighting retrofit to LED with photocell and scheduling controls.",
"inputFacts": [
{
"inputKey": "exterior_fixture_count",
"value": 85,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large distribution center with loading docks and parking areas likely has dozens of exterior fixtures."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 8500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $1,000 per exterior fixture for LED replacement and controls."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 70000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings depend on existing wattage and dusk-to-dawn operating hours."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Exterior lighting is typically a utility rebate or operating-cost project rather than a grant project.",
"Do not force grant eligibility unless a matched program explicitly covers exterior/site lighting."
]
},
{
"retrofitTypeId": "retro_commissioning_study",
"projectScopeSummary": "Whole-facility retro-commissioning and energy audit covering refrigeration, HVAC, lighting controls, dock operations, building automation, and demand management.",
"inputFacts": [
{
"inputKey": "study_cost_cents",
"value": 6000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A $60,000 study is plausible for a 270,000-square-foot facility with refrigeration and controls complexity."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 6000000,
"valueType": "money_cents",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For an audit-only grant, the eligible cost would generally be the study fee."
},
{
"inputKey": "audit_scope_includes_refrigeration",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Cold storage is a major energy driver for this site."
},
{
"inputKey": "implementation_budget_identified",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not say whether the customer has budget for measures identified by the study."
},
{
"inputKey": "study_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No audit proposal is provided."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Study incentives often require a preapproved provider, scope, or utility account validation.",
"Implementation incentives should remain separate from study incentives."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged rooftop units serving offices, volunteer areas, docks, and conditioned support spaces with high-efficiency units.",
"inputFacts": [
{
"inputKey": "rtu_replacement_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large warehouse with offices and support spaces could plausibly have multiple rooftop units."
},
{
"inputKey": "total_cooling_tons",
"value": 240,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes an average 20 tons per RTU for planning; actual tonnage depends on conditioned area and cold-storage separation."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 42000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes about $35,000 per packaged RTU replacement including crane, curbs, controls, and commissioning."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 160000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Savings depend on current unit efficiency, controls, and operating schedules."
},
{
"inputKey": "annual_therm_savings_estimate",
"value": 12000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "If existing units are gas heat RTUs, high-efficiency replacement may reduce gas use; actual data is missing."
},
{
"inputKey": "equipment_schedule_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No mechanical schedule is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"HVAC incentives likely require equipment efficiency ratings and preapproval.",
"Warehouse cold-storage loads should not be double-counted as space-conditioning savings."
]
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"projectScopeSummary": "Electrify selected office and volunteer-support HVAC zones using commercial heat pumps while leaving specialized cold-storage systems separate.",
"inputFacts": [
{
"inputKey": "heat_pump_units_count",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial conversion of administrative and volunteer areas is plausible without assuming full warehouse electrification."
},
{
"inputKey": "served_area_sqft",
"value": 45000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes a fraction of the 270,000-square-foot facility consists of offices, volunteer, and conditioned support spaces."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 36000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes about $45,000 per commercial heat pump unit including installation and controls."
},
{
"inputKey": "existing_heat_fuel",
"value": "natural_gas",
"valueType": "enum",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site has Xcel gas service and annual gas cost, so natural-gas space heating is plausible."
},
{
"inputKey": "full_building_electrification",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A full facility conversion is unlikely at exploring stage and could be complicated by warehouse and refrigeration operations."
},
{
"inputKey": "quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No heat pump quote or mechanical design is supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Heat pump grants and rebates may require equipment specifications, existing fuel proof, and utility preapproval.",
"Electric service capacity and winter performance should be checked."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump considered only as a long-term concept for offices and support spaces; not a likely near-term warehouse retrofit.",
"inputFacts": [
{
"inputKey": "served_area_sqft",
"value": 30000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A limited office/support-area geothermal project is more plausible than serving the whole warehouse."
},
{
"inputKey": "borefield_available_area_confirmed",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No site plan or geotechnical information is included."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 65000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Commercial geothermal costs would be material even for partial building service, and the existing preview appears much too low for a large facility."
},
{
"inputKey": "geothermal_feasibility_study_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No feasibility study is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Technically possible but not a likely near-term grant-ready measure for this warehouse.",
"Suppress grant estimates until feasibility, site constraints, and project economics are confirmed."
]
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"projectScopeSummary": "Boiler replacement is held as uncertain because the site may use packaged rooftop units rather than a central boiler plant.",
"inputFacts": [
{
"inputKey": "central_boiler_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Warehouses often use RTUs or unit heaters; the fixture does not confirm a boiler."
},
{
"inputKey": "boiler_capacity_mbh",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No boiler schedule exists."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cost should remain unknown until a boiler is confirmed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate a boiler grant or rebate without confirming that a boiler exists.",
"Packaged RTU or heat pump measures are more realistic for this site."
]
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"projectScopeSummary": "Controls upgrade for office, volunteer, conference, dock, and support zones, with scheduling aligned to volunteer and distribution operations.",
"inputFacts": [
{
"inputKey": "thermostat_or_zone_count",
"value": 24,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large facility with office and operations zones could plausibly have 20-30 controlled HVAC zones."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 720000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $300 per thermostat or zone including installation, integration, and setup."
},
{
"inputKey": "building_automation_system_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Existing controls architecture is not supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Usually a rebate or low-cost operational measure, not a large grant.",
"Eligibility should depend on equipment type and utility program requirements."
]
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"projectScopeSummary": "Install VFDs on selected HVAC fans, pumps, and refrigeration-related motors where variable flow is appropriate.",
"inputFacts": [
{
"inputKey": "vfd_count",
"value": 18,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A facility with refrigeration, HVAC, and warehouse ventilation could plausibly have multiple motor opportunities."
},
{
"inputKey": "controlled_motor_hp_total",
"value": 300,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Total motor horsepower is a rough placeholder until a motor inventory is collected."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 13500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes approximately $450 per controlled horsepower installed."
},
{
"inputKey": "annual_kwh_savings_estimate",
"value": 140000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "VFD savings can be significant but require motor load profiles and operating hours."
},
{
"inputKey": "motor_inventory_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No motor schedule is included."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Likely custom or prescriptive utility incentive rather than a grant.",
"Estimate should require motor horsepower, baseline controls, and annual hours."
]
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"projectScopeSummary": "Submetering and monitoring for refrigeration, HVAC, solar/storage readiness, and major distribution center loads.",
"inputFacts": [
{
"inputKey": "submeter_count",
"value": 16,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Sixteen submeters could cover refrigeration racks, HVAC panels, EV charging, lighting, and main distribution panels."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 7500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A metering and analytics package for a large facility could plausibly cost $75,000."
},
{
"inputKey": "includes_cloud_monitoring_subscription",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Commercial submetering projects typically include software or analytics services."
},
{
"inputKey": "used_for_m_and_v",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Submetering is useful for measuring refrigeration, HVAC, and storage impacts."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Useful enabling scope but not usually a standalone grant unless bundled with an energy-management or audit program.",
"Savings should not be counted unless paired with operational measures."
]
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"projectScopeSummary": "Restroom, volunteer-area, and breakroom low-flow fixture retrofit; operationally modest for a warehouse but plausible.",
"inputFacts": [
{
"inputKey": "toilet_count",
"value": 28,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A facility with staff and volunteer operations may have multiple restrooms, but fixture count is unknown."
},
{
"inputKey": "faucet_aerator_count",
"value": 44,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Administrative and volunteer areas could have dozens of lavatory and breakroom fixtures."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 4200000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes a modest water-efficiency fixture package across a large facility."
},
{
"inputKey": "annual_water_cost_cents",
"value": 1120000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The utility summaries include $11,200 annual water/sewer cost."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Water fixture savings are modest relative to project size.",
"Do not force a grant estimate unless a local water conservation rebate is explicitly matched."
]
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"projectScopeSummary": "Commercial dishwasher replacement is not a strong fit for a warehouse distribution center unless the facility has a production kitchen or large dishwashing operation.",
"inputFacts": [
{
"inputKey": "commercial_dishwasher_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The primary activity is food storage and distribution, not commercial foodservice."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No kitchen equipment inventory is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress by default unless the user confirms a commercial kitchen or dishwashing operation."
]
},
{
"retrofitTypeId": "induction_cooking_equipment",
"projectScopeSummary": "Induction cooking is not a core warehouse/logistics measure; only relevant if the site has a demonstration, training, or production kitchen.",
"inputFacts": [
{
"inputKey": "commercial_cooking_operation_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied primary activity does not identify a commercial kitchen."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No equipment list or kitchen scope is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not calculate unless a cooking equipment replacement project is confirmed.",
"The existing preview may be a generic retrofit and should not be assumed applicable to this facility."
]
},
{
"retrofitTypeId": "insulation_upgrade",
"projectScopeSummary": "Targeted roof, dock-door, and cold-storage envelope improvements rather than a whole-building insulation project.",
"inputFacts": [
{
"inputKey": "insulation_area_sqft",
"value": 30000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Targeted insulation or air-sealing at docks, roof sections, and cold-storage walls is more plausible than insulating the entire warehouse envelope."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 18000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Assumes roughly $6 per square foot for targeted envelope work."
},
{
"inputKey": "roof_replacement_or_major_envelope_project_planned",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Major insulation work is often tied to reroofing or envelope repairs, which are not described."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"May qualify for utility custom incentives if energy savings can be modeled.",
"Should require audit findings, area, R-values, and baseline condition."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage for refrigeration load shifting is technically plausible but speculative without a refrigeration engineering study.",
"inputFacts": [
{
"inputKey": "thermal_storage_capacity_ton_hours",
"value": 1200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A cold-storage facility could potentially use thermal storage for load shifting, but no refrigeration design data is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 55000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Large refrigeration thermal storage is capital-intensive and highly site-specific."
},
{
"inputKey": "refrigeration_engineering_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No engineering study is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not estimate grants without a matched thermal storage program and engineered scope.",
"Could be more appropriate as a demand-management or custom utility project."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not modeled as a recommended project because the fixture emphasizes solar/storage and efficiency, and CHP would add fossil fuel use unless renewable fuel is available.",
"inputFacts": [
{
"inputKey": "chp_electric_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No continuous thermal load, boiler plant, or CHP feasibility information is supplied."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP cost should not be assumed without a feasibility study."
},
{
"inputKey": "renewable_fuel_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No biogas or biomass fuel source is identified for this site."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"CHP may conflict with decarbonization-oriented grants if fossil-fueled.",
"Suppress unless a specific CHP program and qualified thermal load are confirmed."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy is not a realistic primary project for this urban distribution warehouse absent a dedicated fuel supply and permitting plan.",
"inputFacts": [
{
"inputKey": "qualified_biomass_or_biogas_fuel_supply_secured",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A food bank distribution center may handle organic material but is not normally a biomass energy producer."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No biomass or biogas project scope is supplied."
},
{
"inputKey": "onsite_combustion_or_digestion_permitting_started",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No permitting or facility scope is described."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not treat food handling as evidence of eligible biomass production.",
"Suppress unless the user provides a real biogas or biomass project plan."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Solar water heating is not a major fit because the site is primarily warehousing and cold storage rather than high-domestic-hot-water foodservice or lodging.",
"inputFacts": [
{
"inputKey": "high_domestic_hot_water_load_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A distribution center with volunteer operations likely has restrooms and breakrooms but not a large hot-water load."
},
{
"inputKey": "solar_thermal_collector_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No hot-water load study or solar thermal design is provided."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cost should remain unknown because the measure is not clearly applicable."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress unless the customer confirms a high hot-water load or process water use."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Small wind is not a realistic default project for this warehouse site near urban/suburban infrastructure and aviation-sensitive areas.",
"inputFacts": [
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No wind study is supplied."
},
{
"inputKey": "zoning_or_height_clearance_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Urban/suburban warehouse sites commonly face zoning, setback, and height constraints for wind turbines."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No wind project scope is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force renewable-energy grant qualification for small wind.",
"Rooftop solar is the more realistic onsite renewable option."
]
},
{
"retrofitTypeId": "steam_trap_replacement",
"projectScopeSummary": "Steam trap replacement is not assumed applicable because the facility is a warehouse/cold-storage distribution center with no confirmed steam system.",
"inputFacts": [
{
"inputKey": "steam_system_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No steam system is identified in the prompt."
},
{
"inputKey": "steam_trap_count",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No steam trap inventory exists."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Cost should remain unknown unless steam equipment is confirmed."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress until a steam system and trap inventory are confirmed."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22160",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "program_relevant_scope",
"value": "public_dc_fast_charging_plaza",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": false,
"reasoning": "The matched opportunity name is Electric Vehicle Fast-Charging Plazas Program, which suggests public or plaza-style DC fast charging rather than private Level 2 fleet depot charging."
},
{
"inputKey": "site_proposed_public_fast_charging_plaza",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The realistic project scope for this warehouse is private fleet depot charging, not a public fast-charging plaza."
},
{
"inputKey": "dc_fast_charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The main recommended EV scope uses twelve Level 2 ports and no DC fast-charging ports."
},
{
"inputKey": "level_2_ports",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 fleet charging is realistic for the site but may not satisfy a fast-charging plaza grant."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 9600000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "This amount is appropriate for the Level 2 fleet charging concept, but should not be used for a DC fast-charging plaza program unless program rules allow Level 2 or depot-only charging."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The overall project is exploring-stage, and no application record is supplied."
},
{
"inputKey": "award_or_preapproval_received",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No grant award or preapproval is supplied."
},
{
"inputKey": "vendor_quote_uploaded",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture does not include a charger quote."
},
{
"inputKey": "site_host_agreement_or_property_authorization_available",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The organization owns the site, so site authorization is likely easier than for a tenant, but program-specific documentation is still not supplied."
},
{
"inputKey": "utility_make_ready_approval_received",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No Xcel make-ready review or service capacity confirmation is supplied."
}
],
"reasoning": "Although the opportunity is matched geographically to Colorado and EV charging, the realistic project for this customer is a private fleet Level 2 depot project. A fast-charging plaza program should not calculate a positive estimate unless the user changes scope to public DC fast charging and supplies required application and quote evidence."
},
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
"reasoning": "The existing test-case inputs already suppress this Washington solar manufacturing taxpayer workflow."
},
{
"inputKey": "site_state_code",
"value": "CO",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The project site is in Colorado, not Washington."
}
],
"reasoning": "This should stay suppressed because the Colorado nonprofit food distribution center is not a Washington solar manufacturing taxpayer."
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
"reasoning": "The existing test-case inputs already suppress the Rhode Island renewable property-tax valuation workflow."
},
{
"inputKey": "site_state_code",
"value": "CO",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The project site is in Colorado, not Rhode Island."
}
],
"reasoning": "This should stay suppressed because the Rhode Island property-tax workflow does not apply to a Colorado site."
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
"reasoning": "The existing opportunity-specific input says the site does not have approved Michigan Renewable Energy Renaissance Zone designation."
},
{
"inputKey": "site_state_code",
"value": "CO",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The project site is in Colorado, not Michigan."
}
],
"reasoning": "This should stay suppressed because the Michigan Renewable Energy Renaissance Zone workflow does not apply to a Colorado site."
},
{
"opportunityId": "UTILITY_XCEL_CO_CUSTOM_EFFICIENCY_REBATE_PLACEHOLDER",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "utility_customer_verified",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Xcel Energy is self-reported, but the account class and rate schedule are not verified by bill upload."
},
{
"inputKey": "custom_project_preapproval_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture does not include a utility custom-incentive application."
},
{
"inputKey": "engineering_calculation_package_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Refrigeration, VFD, controls, and retro-commissioning savings require engineering calculations."
}
],
"reasoning": "This is a placeholder for likely utility custom efficiency handling, not a source-backed grant. It should need quote and engineering data before any estimate is shown."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "vendor_quote_uploaded",
"reason": "quote not available"
},
{
"inputKey": "final_equipment_make_model",
"reason": "quote not available"
},
{
"inputKey": "signed_vendor_contract",
"reason": "needs user decision"
},
{
"inputKey": "grant_application_id",
"reason": "application not submitted"
},
{
"inputKey": "grant_award_letter",
"reason": "application not submitted"
},
{
"inputKey": "agency_preapproval_status",
"reason": "source requires agency approval"
},
{
"inputKey": "utility_account_number",
"reason": "needs user decision"
},
{
"inputKey": "electric_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "monthly_peak_kw",
"reason": "needs user decision"
},
{
"inputKey": "interval_load_data_15_min",
"reason": "needs user decision"
},
{
"inputKey": "roof_structural_assessment",
"reason": "quote not available"
},
{
"inputKey": "solar_interconnection_application_status",
"reason": "application not submitted"
},
{
"inputKey": "battery_interconnection_study",
"reason": "application not submitted"
},
{
"inputKey": "ev_utility_make_ready_approval",
"reason": "source requires agency approval"
},
{
"inputKey": "fleet_vehicle_inventory",
"reason": "needs user decision"
},
{
"inputKey": "dc_fast_charging_public_access_commitment",
"reason": "needs user decision"
},
{
"inputKey": "refrigeration_equipment_schedule",
"reason": "quote not available"
},
{
"inputKey": "lighting_fixture_schedule",
"reason": "quote not available"
},
{
"inputKey": "motor_inventory",
"reason": "quote not available"
},
{
"inputKey": "commercial_kitchen_equipment_inventory",
"reason": "unrealistic for this customer"
},
{
"inputKey": "steam_trap_inventory",
"reason": "unrealistic for this customer"
},
{
"inputKey": "qualified_biomass_fuel_supply_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_zoning_clearance",
"reason": "unrealistic for this customer"
},
{
"inputKey": "disadvantaged_community_program_designation",
"reason": "source requires agency approval"
}
],
"doNotForceQualificationReasons": [
"The site is in Colorado; non-Colorado opportunities should stay suppressed even if the technology type matches.",
"The normalized zip5 value appears misparsed as 20600 and should be corrected to 80019 before geography matching.",
"The organization is a nonprofit warehouse/logistics food distribution center, not a public entity, school, agricultural producer, tribal entity, or residential customer based on supplied facts.",
"A private fleet Level 2 charger project should not automatically qualify for a public DC fast-charging plaza program.",
"Exploring-stage projects with no quote, no preapproval, and no application should generally use needs_quote or needs_application_status rather than calculated positive estimates.",
"Cold-storage efficiency, VFDs, controls, lighting, and retro-commissioning are realistic measures, but many would be rebates or custom utility incentives rather than grants.",
"Commercial kitchen, dishwasher, induction cooking, steam trap, biomass/biogas, small wind, solar thermal, CHP, and geothermal scopes should not be forced unless the user confirms real project facts.",
"Solar and battery projects are plausible because of the building size and load profile, but estimates should be limited by roof structural status, interconnection status, rate schedule, and vendor quote availability.",
"Nonprofit status may support elective-pay tax-credit modeling for eligible clean-energy property, but tax credits should not be counted as grants unless the estimator intentionally includes tax-credit workflows.",
"Partial property-tax exemption does not create eligibility for out-of-state property-tax incentive workflows."
]
}

