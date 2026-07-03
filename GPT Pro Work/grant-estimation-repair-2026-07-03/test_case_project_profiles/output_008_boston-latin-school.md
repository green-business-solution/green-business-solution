{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "boston-latin-school",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment for a large Boston public school campus using the supplied test-case facts and conservative planning assumptions. The record should support mixed outcomes: EV charging and public-entity solar/decarbonization pathways may be plausible, while LIHEAP-style residential/weatherization treatment, wind, biomass, fuel cell, and CHP should generally be suppressed or require major scope validation. Supplied case source: ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "organization_legal_name",
"value": "Boston Latin School",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied test case identifies the organization as Boston Latin School."
},
{
"inputKey": "applicant_entity_type",
"value": "municipal_public_school",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is described as a large urban public school and the organization type is Government / Public Agency."
},
{
"inputKey": "public_entity_status",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A public secondary school owned by a public agency should be treated as a public entity unless the applicant is later changed to a separate nonprofit foundation."
},
{
"inputKey": "state_entity_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Boston Latin School is modeled as a municipal public school, not a Massachusetts state agency. This matters for programs limited to state-owned facilities."
},
{
"inputKey": "municipal_or_local_government_control",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a public school in Boston and property-tax facts indicate public school property treatment."
},
{
"inputKey": "nonprofit_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The school is modeled as a public agency rather than a 501(c)(3) nonprofit applicant. A separate parent/foundation applicant would need user confirmation."
},
{
"inputKey": "tax_exempt_public_property_status",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic tax facts show municipal public school property exemption and zero annual property tax due."
},
{
"inputKey": "sales_use_tax_exempt_status",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Existing synthetic tax facts indicate sales/use tax exempt status, but this should remain user-confirmable for quote normalization."
},
{
"inputKey": "site_control_for_energy_projects",
"value": "owner_controlled_public_school_site",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case states ownership status is Own. Actual procurement authority may sit with the district or city facilities department."
},
{
"inputKey": "electric_utility_customer_class",
"value": "nonresidential_public_institution",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A 325,000 square foot public school with annual usage over 3.7 GWh is realistically a nonresidential institutional account."
},
{
"inputKey": "gas_utility_provider",
"value": "National Grid",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form lists National Grid as the gas utility provider."
},
{
"inputKey": "electric_utility_provider",
"value": "Eversource",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The source form lists Eversource as the electric provider, but the normalized profile leaves verification as self-reported and unverified."
},
{
"inputKey": "annual_kwh",
"value": 3785000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile includes annual kWh of 3,785,000."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 81377500,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied annual electric cost is $813,775, converted to cents."
},
{
"inputKey": "annual_gas_cost_cents",
"value": 34685000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied annual gas cost is $346,850, converted to cents."
},
{
"inputKey": "building_square_footage",
"value": 325000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile includes parsed square footage of 325,000."
},
{
"inputKey": "building_use_profile",
"value": [
"secondary_education",
"cafeteria",
"athletics",
"auditorium_events",
"administration"
],
"valueType": "array",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form lists public secondary education, cafeteria, athletics, auditorium events, and school administration."
},
{
"inputKey": "iaq_sensitive_occupancy",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The description explicitly flags IAQ-sensitive HVAC for a school building."
},
{
"inputKey": "summer_occupancy",
"value": "partial",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large urban public school commonly has reduced but nonzero summer activity for administration, programs, maintenance, and athletics."
},
{
"inputKey": "public_access_parking_available",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A large school campus is likely to have parking used by staff and visitors, but the exact count and public access rules require confirmation."
},
{
"inputKey": "fleet_owner_status",
"value": "limited_or_indirect",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The school likely uses district or contractor vehicles rather than independently owning a large fleet. Fleet eligibility should not be assumed without agency confirmation."
},
{
"inputKey": "disadvantaged_or_environmental_justice_community_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied facts do not include tract-level or program-specific EJ designation, so add-on incentives tied to geography should not be calculated."
},
{
"inputKey": "project_procurement_stage",
"value": "early_planning_no_vendor_selected",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project stage is listed as exploring, so quote-level and application-stage facts should remain incomplete."
},
{
"inputKey": "grant_preapproval_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application or preapproval documents are present in the test case."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "ev_charger_installation",
"projectScopeSummary": "Install a modest public-access Level 2 charging bank for school visitors, staff, evening events, and limited community use, with make-ready electrical work and signage.",
"inputFacts": [
{
"inputKey": "charger_type",
"value": "level_2_networked",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Level 2 networked stations are realistic for public school parking and grant reporting."
},
{
"inputKey": "charger_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Eight ports is a conservative public-access scope for a large 325,000 square foot school without assuming a large dedicated EV fleet."
},
{
"inputKey": "charging_station_units",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four dual-port Level 2 stations matches the eight-port scope."
},
{
"inputKey": "public_access_required_hours",
"value": "after_school_evenings_weekends_when_campus_open",
"valueType": "text",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The school has auditorium and event loads, but exact public access hours would need a site operations decision."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $8,480 as the fixed admin-modeled upfront cost."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Use the modeled cost as a placeholder eligible cost only where a formula allows it; actual eligible cost should be quote-based."
},
{
"inputKey": "utility_make_ready_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Panel capacity, trenching, conduit, and make-ready costs are site-specific and should not be invented for final calculation."
},
{
"inputKey": "networking_service_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public-access EV grants often require networked equipment and reporting."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Public access hours, parking control, and signage requirements need confirmation.",
"Final incentive amount should use a vendor quote and any program caps.",
"If chargers are staff-only, public-access charging grants should be suppressed."
]
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"projectScopeSummary": "Install Level 2 charging in the school parking area for staff, visitors, and education-campus use, likely overlapping with the broader EV charger installation scope.",
"inputFacts": [
{
"inputKey": "level_2_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The Level 2 scope should align with the general EV charger installation scope."
},
{
"inputKey": "dual_port_stations",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Four dual-port stations is a realistic starter installation."
},
{
"inputKey": "ada_accessible_charging_space_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A public school project would normally plan at least one accessible charging space, but layout details remain unknown."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $8,480 for this scope."
},
{
"inputKey": "final_vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project is still exploring and no quote facts were supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Do not double-count the same chargers across EV charger installation and Level 2 EV charger installation records.",
"Formula-ready estimates should confirm program-specific cap treatment."
]
},
{
"retrofitTypeId": "fleet_charging_infrastructure",
"projectScopeSummary": "Prepare limited charging infrastructure for a small school or district support-vehicle use case, not a full bus depot or large fleet conversion.",
"inputFacts": [
{
"inputKey": "fleet_owner_or_operator",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not establish whether Boston Latin School, Boston Public Schools, or a contractor owns the relevant fleet."
},
{
"inputKey": "fleet_charger_ports",
"value": 4,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small support-vehicle charging scope is plausible, but fleet ownership and vehicle count are not confirmed."
},
{
"inputKey": "supported_electric_vehicles",
"value": 2,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Two support vehicles is conservative and avoids assuming school-bus electrification."
},
{
"inputKey": "school_bus_charging_scope_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No bus fleet ownership, depot, or charging need is supplied."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 2760000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $27,600."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Eligibility depends on the actual fleet use case, charger assignment, vehicle ownership, and quote."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Fleet charging should remain suppressed or low-confidence unless the applicant confirms fleet ownership or control.",
"Do not assume eligibility for school-bus or fleet programs from the school building profile alone."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Evaluate a constrained rooftop solar PV installation on suitable roof areas, avoiding overstatement because a large school may have mechanical equipment, roof setbacks, and structural limitations.",
"inputFacts": [
{
"inputKey": "solar_pv_system_kw_dc",
"value": 350,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 350 kW DC concept is plausible for a large school but must be validated by roof area, shading, structural condition, and interconnection."
},
{
"inputKey": "estimated_annual_solar_kwh",
"value": 420000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses a conservative planning yield around 1,200 kWh per kW DC annually for a Massachusetts rooftop concept."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $100,000."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar grant calculations should use a project budget, procurement model, and whether storage/decarbonization measures are bundled."
},
{
"inputKey": "roof_structural_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No structural assessment is supplied and the project is still exploring."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application facts are present."
},
{
"inputKey": "third_party_ppa_or_direct_ownership",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Public schools may pursue direct ownership, city procurement, or PPA structures, which affects incentives and tax-credit treatment."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Public-entity solar grants may require agency eligibility confirmation and budget documents.",
"Do not calculate final value without project cost, ownership model, roof feasibility, and application status.",
"Public school status supports some public-sector programs but does not make the school a state agency."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Consider a resilience-oriented battery paired with solar or critical loads for sheltering, IT, refrigeration, and limited HVAC/ventilation support rather than full-building backup.",
"inputFacts": [
{
"inputKey": "battery_power_kw",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 250 kW battery is plausible for peak management and critical-load support at a large school, but no interval demand profile is supplied."
},
{
"inputKey": "battery_capacity_kwh",
"value": 1000,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A four-hour 250 kW / 1,000 kWh configuration is a common planning assumption for resilience and demand management."
},
{
"inputKey": "critical_loads_served",
"value": [
"emergency_lighting",
"main_office_it",
"cafeteria_refrigeration",
"limited_ventilation",
"communications"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic critical loads for a school without assuming whole-building backup."
},
{
"inputKey": "solar_pairing_required_for_scope",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A battery-only project is less likely to fit many renewable or resilience grants than solar-plus-storage."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $72,800."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Battery incentives need equipment, integration, controls, resilience design, and quote data."
},
{
"inputKey": "resilience_hub_or_emergency_shelter_designation",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied facts do not establish formal emergency shelter or resilience hub status."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Battery-only savings should not be calculated from solar or public-sector grant programs unless the program explicitly includes storage.",
"Resilience adders require designation and critical-load documentation."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace selected aging rooftop or air-handling HVAC equipment serving classrooms, cafeteria, gym, and auditorium zones with high-efficiency equipment and upgraded controls, while preserving ventilation and IAQ requirements.",
"inputFacts": [
{
"inputKey": "hvac_units_replaced",
"value": 8,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large school could have many air handlers or rooftop units; eight units is a conservative modeled phase rather than whole-campus replacement."
},
{
"inputKey": "estimated_total_cooling_tons_replaced",
"value": 160,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Twenty tons average per unit across eight units is plausible for major school zones but requires equipment schedules."
},
{
"inputKey": "measure_type",
"value": "high_efficiency_rooftop_units_air_handlers_and_controls",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case calls out IAQ-sensitive HVAC, cafeteria, gym, and auditorium loads."
},
{
"inputKey": "demand_control_ventilation_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Auditorium and gym zones could benefit from CO2-based ventilation control, but school IAQ constraints require careful design."
},
{
"inputKey": "merv13_or_better_filtration_included",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Enhanced filtration is realistic for a school HVAC upgrade, but fan capacity and final design are unknown."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 265000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Represents about 7% of annual electric use, reasonable for a partial HVAC/control phase but not source-verified."
},
{
"inputKey": "estimated_annual_therm_savings",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Annual therm use is not supplied, only annual gas cost."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $7,980."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Actual eligible costs depend on equipment schedules, baseline, efficiency ratings, controls, and utility program rules."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Energy-efficiency incentives should require equipment efficiencies and a vendor or engineer estimate.",
"IAQ-related scope may increase cost without increasing energy savings.",
"Do not force grant qualification where programs are residential-only or low-income household-focused."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Early feasibility study for a phased geothermal heat pump conversion serving selected zones, not a committed full-building borefield installation.",
"inputFacts": [
{
"inputKey": "geothermal_scope_stage",
"value": "feasibility_only",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A dense urban school site would need significant feasibility work before a ground-source system is realistic."
},
{
"inputKey": "estimated_heat_pump_capacity_tons",
"value": 250,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 250-ton partial-building concept is plausible for feasibility screening but not a confirmed design."
},
{
"inputKey": "borefield_area_available_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No site plan or subsurface feasibility information is supplied."
},
{
"inputKey": "feasibility_study_cost_cents",
"value": 12500000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A six-figure feasibility and concept-design study is realistic for a large urban public school."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $15,760, but this is too low for implementation and should be treated as placeholder/test fixture cost."
},
{
"inputKey": "implementation_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No implementation quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"A geothermal implementation estimate should be suppressed until feasibility, site control, subsurface conditions, and cost are known.",
"Feasibility-study support may be plausible, but construction incentives should not be calculated from the placeholder cost."
]
},
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Targeted envelope and air-sealing work in selected classroom, auditorium, and gym areas to improve comfort and reduce infiltration, not a residential weatherization project.",
"inputFacts": [
{
"inputKey": "weatherization_scope_type",
"value": "institutional_building_envelope_repairs",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public school may do envelope work, but LIHEAP-style low-income household weatherization is not an appropriate profile match."
},
{
"inputKey": "exterior_doors_weatherstripped",
"value": 22,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A large school likely has many exterior doors; 22 is a conservative partial-scope count."
},
{
"inputKey": "window_and_wall_air_leakage_repairs_sqft",
"value": 18000,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Represents targeted envelope work, not whole-building facade rehabilitation."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 194600,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $1,946."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The preview cost is too small for a meaningful school envelope project and should not drive grant estimates."
},
{
"inputKey": "low_income_household_benefit_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The site is a school, not a household weatherization applicant."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress LIHEAP or household weatherization matches for this institutional school profile.",
"Commercial/institutional utility incentives may be plausible but require utility program fit and quote data."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small placeholder LED fixture replacement scope for testing, likely not representative of a full 325,000 square foot school lighting project.",
"inputFacts": [
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary states the LED preview assumes 12 fixture replacements."
},
{
"inputKey": "fixture_type",
"value": "interior_linear_led_replacement",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Interior linear fixtures are a common school lighting measure, but actual fixture type is not supplied."
},
{
"inputKey": "annual_operating_hours",
"value": 3200,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "School lighting hours can be high due to classes, administration, athletics, and evening events."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $1,604.25."
},
{
"inputKey": "whole_building_lighting_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No lighting audit or fixture schedule is included."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "For a school this size, a 12-fixture scope is a placeholder and should not drive grant matching beyond test calculations."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Typical utility rebates may apply only after fixture schedule and equipment specifications are provided.",
"The modeled 12-fixture scope is intentionally small and should not be treated as a campus-wide lighting retrofit."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Potential cafeteria and locker-room domestic hot water preheat system, but not enough information is available to size or calculate incentives.",
"inputFacts": [
{
"inputKey": "served_loads",
"value": [
"cafeteria_dishwashing",
"locker_room_showers",
"kitchen_handwashing"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile includes cafeteria and athletics loads, both plausible hot-water uses."
},
{
"inputKey": "collector_area_sqft",
"value": 900,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A moderate collector area is plausible for preheat but should be validated against actual hot-water load and roof area."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $6,800."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Solar thermal costs and incentives require collector count, storage, plumbing, and load analysis."
},
{
"inputKey": "domestic_hot_water_load_profile_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No monthly hot water or gas-use breakdown is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Should remain needs-project-scope or needs-quote unless a solar thermal program and load analysis are available.",
"The project is plausible physically but not well supported by the supplied grant matches."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "No realistic biomass or biogas generation project is planned for this dense urban public school campus.",
"inputFacts": [
{
"inputKey": "onsite_biomass_fuel_source_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A Boston public school campus is not realistically an agricultural or industrial biomass fuel source."
},
{
"inputKey": "anaerobic_digester_scope_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The cafeteria may generate food waste, but nothing suggests the scale needed for onsite biogas generation."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $90,000, but this should not be treated as a realistic implementation scope."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No realistic qualifying biomass or biogas project is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress biomass/biogas opportunities for this profile unless the user later supplies a specific district-scale waste-to-energy project."
]
},
{
"retrofitTypeId": "fuel_cell_system",
"projectScopeSummary": "No realistic standalone fuel cell project is planned for this school; treat as non-priority and suppress unless a resilience procurement scope is provided.",
"inputFacts": [
{
"inputKey": "fuel_cell_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No fuel cell design capacity or critical-load study is supplied."
},
{
"inputKey": "hydrogen_or_renewable_fuel_supply_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case does not include a hydrogen or renewable fuel supply plan."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 11000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $110,000."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No realistic qualifying fuel cell scope is present in the profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Fuel cell incentives should be suppressed unless the applicant provides a defined resilience or clean-fuel project."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "No realistic CHP project is planned; school decarbonization goals would more likely prioritize HVAC electrification, controls, solar, and storage.",
"inputFacts": [
{
"inputKey": "chp_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No thermal load profile, operating hours, or CHP sizing analysis is supplied."
},
{
"inputKey": "year_round_thermal_host_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A school has seasonal and schedule-driven loads; the record does not establish a strong year-round thermal host."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $120,000."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No realistic qualifying CHP project is present in the current profile."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Suppress CHP grants unless a feasibility study shows a qualifying thermal load and emissions-compliant system."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "No small wind project should be pursued for this dense urban Boston school campus.",
"inputFacts": [
{
"inputKey": "wind_resource_screening_passed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A dense urban school site is unlikely to be a practical small-wind location due to setbacks, turbulence, zoning, and safety constraints."
},
{
"inputKey": "turbine_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No turbine design, site screening, or wind resource assessment is supplied."
},
{
"inputKey": "estimated_total_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The retrofit summary preview uses $80,000."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 0,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Small wind is not realistic for this site without extraordinary evidence."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Do not force small-wind qualification from generic renewable-energy matches."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22187",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "public_access_charging_project",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A school could provide public access during events or after-hours, but access terms must be confirmed."
},
{
"inputKey": "public_access_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the modeled EV charger scope."
},
{
"inputKey": "public_access_hours_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The record does not include operating-hour commitments."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No application evidence is supplied."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project is exploratory and no quote is included."
}
],
"reasoning": "Potentially relevant for a public school only if the chargers are truly available to the public under program rules. Estimate should not be final until public access, quote, and application facts are supplied."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22185",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_controls_eligible_fleet",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The school profile does not establish fleet ownership or control."
},
{
"inputKey": "fleet_vehicle_count_to_be_electrified",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No vehicle inventory is supplied."
},
{
"inputKey": "school_bus_fleet_included",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No bus fleet or depot facts are included in the record."
}
],
"reasoning": "The organization is a school, but the supplied facts do not show a qualifying applicant-controlled fleet. Suppress unless fleet ownership, vehicle replacement, and charger assignment are confirmed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "workplace_charging_project",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Staff charging at a large school is plausible."
},
{
"inputKey": "fleet_charging_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Fleet control is not established."
},
{
"inputKey": "workplace_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the Level 2 EV charging scope."
},
{
"inputKey": "eligible_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Program calculation should use a project quote and eligible-cost definitions."
}
],
"reasoning": "Workplace charging is plausible for a public school. Fleet charging should not be assumed. Keep as needs-project-scope or needs-quote depending on formula readiness."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22188",
"expectedHandling": "calculate_if_formula_ready",
"inputFacts": [
{
"inputKey": "educational_campus",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile classifies the site as education_campus."
},
{
"inputKey": "level_2_ports",
"value": 8,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the modeled charging scope."
},
{
"inputKey": "eligible_project_cost_cents",
"value": 848000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Use only as a placeholder for formula tests; replace with a quote for customer-facing estimates."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The project is still exploratory."
}
],
"reasoning": "This is the strongest EV match because the site is an educational campus. It may calculate in test mode if the program formula is ready, but customer-facing totals should remain caveated without a quote and application details."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "household_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a public school, not a low-income household."
},
{
"inputKey": "low_income_household_energy_assistance_case",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No household assistance case or eligible residence is present."
},
{
"inputKey": "education_campus_weatherization",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The building may need envelope work, but that does not make LIHEAP applicable."
}
],
"reasoning": "Suppress LIHEAP for this public school profile. The broad technology match should not override the household-focused nature of the opportunity."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
"expectedHandling": "needs_application_status",
"inputFacts": [
{
"inputKey": "public_sector_applicant",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization is a government/public agency school."
},
{
"inputKey": "state_agency_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile supports municipal public school status, not state agency status."
},
{
"inputKey": "solar_pv_system_kw_dc",
"value": 350,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A planning-size rooftop PV concept is included but not feasibility-confirmed."
},
{
"inputKey": "solar_plus_storage_or_decarbonized_system",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A combined solar-plus-storage/decarbonization concept is plausible for a school but unconfirmed."
},
{
"inputKey": "eligible_project_cost_cents",
"value": null,
"valueType": "money_cents",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The modeled preview cost is not enough to support final grant sizing."
},
{
"inputKey": "application_or_commbuys_bid_status",
"value": "not_started",
"valueType": "enum",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application record is supplied."
},
{
"inputKey": "agency_preapproval_or_award_notice_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No preapproval or award document is included."
}
],
"reasoning": "A public school solar/decarbonization project is plausible, but eligibility and amount should depend on applicant classification, procurement status, project budget, and agency application requirements."
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
"reasoning": "Existing opportunity-specific input already suppresses this Michigan treatment for an MA site."
}
],
"reasoning": "Out-of-state Michigan tax treatment should remain suppressed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "site_state_code",
"value": "MA",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The site is in Massachusetts, not Rhode Island."
}
],
"reasoning": "Rhode Island renewable property-tax valuation should remain suppressed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "not_applicable_out_of_state_and_no_synthetic_solar_manufacturing_activity",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "Existing opportunity-specific input already suppresses Washington B&O treatment."
}
],
"reasoning": "Washington solar-manufacturing B&O treatment is irrelevant to this Massachusetts public school."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "final_vendor_quote_by_retrofit",
"reason": "quote not available"
},
{
"inputKey": "ev_charger_site_plan_and_parking_count",
"reason": "needs user decision"
},
{
"inputKey": "ev_public_access_hours_commitment",
"reason": "needs user decision"
},
{
"inputKey": "ev_utility_make_ready_cost",
"reason": "quote not available"
},
{
"inputKey": "massevip_application_confirmation_number",
"reason": "application not submitted"
},
{
"inputKey": "fleet_vehicle_inventory",
"reason": "needs user decision"
},
{
"inputKey": "fleet_ownership_or_operator_agreement",
"reason": "needs user decision"
},
{
"inputKey": "solar_roof_structural_assessment",
"reason": "quote not available"
},
{
"inputKey": "solar_interconnection_study_or_application",
"reason": "application not submitted"
},
{
"inputKey": "solar_procurement_model_direct_ownership_or_ppa",
"reason": "needs user decision"
},
{
"inputKey": "solar_decarbonization_grant_preapproval",
"reason": "source requires agency approval"
},
{
"inputKey": "battery_critical_load_study",
"reason": "quote not available"
},
{
"inputKey": "resilience_hub_or_emergency_shelter_designation",
"reason": "needs user decision"
},
{
"inputKey": "hvac_equipment_schedule",
"reason": "quote not available"
},
{
"inputKey": "hvac_baseline_efficiency_and_proposed_efficiency",
"reason": "quote not available"
},
{
"inputKey": "annual_therms",
"reason": "needs user decision"
},
{
"inputKey": "geothermal_subsurface_feasibility_study",
"reason": "quote not available"
},
{
"inputKey": "whole_building_lighting_fixture_schedule",
"reason": "quote not available"
},
{
"inputKey": "domestic_hot_water_load_profile",
"reason": "needs user decision"
},
{
"inputKey": "liheap_household_eligibility_documentation",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_fuel_supply_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "small_wind_site_screening",
"reason": "unrealistic for this customer"
},
{
"inputKey": "chp_feasibility_study",
"reason": "unrealistic for this customer"
},
{
"inputKey": "fuel_cell_fuel_supply_and_resilience_design",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"Do not treat Boston Latin School as a residential applicant for household energy assistance or weatherization programs.",
"Do not treat the school as a state agency unless the applicant is confirmed to be a Massachusetts state entity.",
"Do not assume school-bus or fleet ownership from the school building profile.",
"Do not double-count EV charging incentives across public-access, workplace, fleet, and educational-campus variants for the same ports.",
"Do not calculate solar, storage, HVAC, geothermal, or lighting grants from placeholder preview costs when quote-level costs are absent.",
"Do not force biomass, biogas, CHP, fuel cell, or small wind qualification for a dense urban public school without a specific project scope.",
"Do not use out-of-state tax programs or renewable classifications where the site state is Massachusetts.",
"Do not include customer-facing grant totals for programs requiring preapproval, application submission, or agency award notice until those statuses are confirmed."
]
}

