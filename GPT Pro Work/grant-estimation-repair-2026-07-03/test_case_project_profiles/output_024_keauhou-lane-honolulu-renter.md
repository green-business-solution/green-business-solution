{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "keauhou-lane-honolulu-renter",
"profileConfidence": "medium",
"profileNotes": "Synthetic enrichment based on supplied test-case facts for an anonymized tenant household in a mixed-use Honolulu workforce-housing building. The applicant is modeled as an individual residential renter with a small in-unit utility profile, not as the building owner or property manager; landlord-controlled roof, central plant, common-area, and whole-building measures should generally require owner authorization or remain suppressed. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "applicant_type",
"value": "residential_household",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The source form identifies the organization type as Residential and the organization size as Household."
},
{
"inputKey": "customer_class",
"value": "residential",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant household with 5,200 annual kWh is most realistically served on a residential electric account, though the actual Hawaiian Electric rate schedule should be confirmed from the bill."
},
{
"inputKey": "utility_customer_of_record",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The household has reported annual electric, gas, and water/sewer costs, suggesting at least some direct utility billing or pass-through utility responsibility."
},
{
"inputKey": "property_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The normalized profile identifies the ownership relationship as tenant and the source form lists ownership status as Lease."
},
{
"inputKey": "landlord_permission_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No lease rider, owner consent letter, or property-management approval is present in the fixture."
},
{
"inputKey": "controls_roof_area",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A renter household in a mixed-use multifamily building would not normally control the roof area needed for rooftop PV, battery, solar hot water, or microgrid equipment."
},
{
"inputKey": "controls_central_domestic_hot_water_system",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Whole-building solar water heating would normally be a landlord or condominium association project, not a single renter household project."
},
{
"inputKey": "controls_common_area_electrical_loads",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The household is modeled as an individual residential occupant, so common-area lighting, elevators, garage ventilation, and commercial space loads should not be treated as applicant-controlled."
},
{
"inputKey": "direct_property_tax_bill_to_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A renter household would not normally receive or pay the direct property tax bill for the building."
},
{
"inputKey": "mixed_use_residential_commercial_load_split_needs_review",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing tax facts already flag mixed-use residential/commercial load split review as required."
},
{
"inputKey": "is_nonprofit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a household, not a nonprofit corporation."
},
{
"inputKey": "is_public_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is not modeled as a city, county, state, federal, or public-housing authority entity."
},
{
"inputKey": "is_school_or_education_campus",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The building is mixed-use residential/commercial, not an education campus."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The fixture describes residential occupancy in Honolulu, not agricultural production."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership or tribal applicant status is indicated, and the applicant is a private tenant household."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No fleet vehicles, commercial fleet operations, or charging depot use are present in the fixture."
},
{
"inputKey": "household_income_ami_percent",
"value": null,
"valueType": "number",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The building is described as workforce housing, but the fixture does not provide the applicant household's verified income or area median income percentage."
},
{
"inputKey": "income_qualified_affordable_or_workforce_housing_resident",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Building-level workforce-housing context does not prove the specific applicant's current income-qualified status."
},
{
"inputKey": "disadvantaged_community_or_energy_community_status",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No census tract, community designation, or grant-specific geography confirmation is present in the normalized profile."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Tenant-controlled in-unit LED replacement for approximately 12 lamps or fixtures within the apartment only; no common-area or commercial-space lighting included.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Matches the existing preview cost and is plausible for a small in-unit lighting retrofit including materials and limited labor."
},
{
"inputKey": "fixture_count",
"value": 12,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The existing LED preview explicitly assumes 12 fixture replacements."
},
{
"inputKey": "project_area",
"value": "tenant_unit_only",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A renter can realistically control lighting inside the leased dwelling unit, but not building common areas."
},
{
"inputKey": "existing_lighting_type",
"value": "mixed_cfl_halogen_or_older_led",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The exact existing lamp mix is unknown; older or mixed lamp stock is plausible but should be user-confirmed."
},
{
"inputKey": "new_lighting_type",
"value": "energy_star_led_lamps_or_integrated_led_fixtures",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "ENERGY STAR LED lamps are a realistic tenant-scale measure for a small residential retrofit."
},
{
"inputKey": "quote_or_receipt_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No quote or receipt is included in the test case; incentive calculation should require actual purchase or quote documentation where required."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Small tenant-installed lighting projects are often below minimum grant thresholds.",
"Many lighting incentives require utility-specific rebate forms, eligible product documentation, or preapproval.",
"Common-area lighting savings should be excluded unless the property owner applies."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Possible replacement of one tenant-controlled room air conditioner, packaged terminal unit, or small split-system heat pump serving the apartment; central building HVAC is not included.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing admin preview cost for a small HVAC replacement."
},
{
"inputKey": "hvac_unit_count",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A tenant household would most plausibly control one in-unit cooling or heat-pump appliance, not whole-building HVAC equipment."
},
{
"inputKey": "existing_equipment_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not specify whether the unit uses window AC, PTAC, mini-split, central cooling, or no dedicated HVAC equipment."
},
{
"inputKey": "replacement_equipment_type",
"value": "ductless_mini_split_heat_pump_or_high_efficiency_room_ac",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "This is a plausible residential apartment measure in Honolulu, but exact equipment selection requires a quote."
},
{
"inputKey": "cooling_capacity_tons",
"value": 1,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "One ton is a conservative placeholder for a small apartment zone; actual capacity should come from equipment sizing."
},
{
"inputKey": "seer2_or_ceer_rating",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Grant and rebate calculations commonly need rated efficiency from the selected model."
},
{
"inputKey": "landlord_permission_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Permanent HVAC replacement in a leased multifamily unit typically requires landlord approval."
},
{
"inputKey": "quote_or_contractor_scope_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No HVAC quote, model number, or contractor scope is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Potentially eligible only for residential appliance or heat-pump rebates if the applicant controls the equipment and buys a qualifying model.",
"Suppress grant estimate until existing equipment, replacement model, rated efficiency, quote, and landlord authorization are known.",
"Do not treat this as a whole-building multifamily HVAC project."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Landlord-controlled solar domestic hot-water project for shared multifamily water heating; not realistically executable by the tenant household without owner participation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview project cost, though this appears more like a small residential system than a full-building multifamily system."
},
{
"inputKey": "applicant_controls_equipment",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a renter household and does not normally control roof-mounted collectors, plumbing, or central domestic hot water equipment."
},
{
"inputKey": "system_serves",
"value": "unknown_or_landlord_controlled_domestic_hot_water",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not specify whether water heating is in-unit electric, in-unit gas, or central building hot water."
},
{
"inputKey": "collector_area_sqft",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Collector area is needed for many solar thermal calculations and is not present."
},
{
"inputKey": "storage_tank_gallons",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Storage volume is unknown and should come from a system quote or engineering study."
},
{
"inputKey": "backup_fuel",
"value": "unknown",
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The household has annual gas cost, but the fixture does not prove that gas is used for domestic water heating."
},
{
"inputKey": "owner_authorization_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owner authorization or building-level application status is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"The measure may be relevant to the building owner, but not to an individual renter household.",
"Suppress tenant estimate unless the applicant is changed to the property owner or an authorized agent.",
"Quote, system sizing, water-heating baseline, and owner authorization are required."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Rooftop PV is modeled as a landlord-controlled building improvement; a tenant household may instead consider a utility community-solar or green-tariff option outside this retrofit scope.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost as the synthetic placeholder."
},
{
"inputKey": "pv_system_kw_dc",
"value": 20,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 20 kW placeholder roughly corresponds to the preview cost at a high island installed cost, but is not supported by a roof layout or quote."
},
{
"inputKey": "applicant_controls_roof",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a tenant household and would not normally have rights to install PV on the multifamily roof."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility interconnection application is present."
},
{
"inputKey": "net_metering_or_export_program",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The applicable Hawaiian Electric tariff or export program is not included and should not be assumed."
},
{
"inputKey": "solar_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No PV quote, roof assessment, interconnection study, or equipment list is included."
},
{
"inputKey": "uses_household_meter_only",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The 5,200 kWh annual usage profile is consistent with a single household account rather than whole-building load."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Rooftop PV should be suppressed for a tenant unless roof rights and owner authorization are documented.",
"Do not use the full 179,800 square feet building area as applicant-controlled PV potential.",
"Many solar incentives require ownership of the system or a qualifying third-party ownership arrangement."
]
},
{
"retrofitTypeId": "battery_storage_system",
"projectScopeSummary": "Small residential backup battery would require landlord approval and compatible electrical panel access; whole-building battery storage is not tenant-controlled.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 7280000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost, but that cost is high for a tenant-scale battery and should require quote validation."
},
{
"inputKey": "battery_capacity_kwh",
"value": 13.5,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 13.5 kWh residential battery is a common scale for a single household, but the preview cost likely reflects a larger or more complex installation."
},
{
"inputKey": "paired_with_solar",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owned rooftop solar or interconnection information is available for the tenant."
},
{
"inputKey": "backup_load_panel_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Residential battery backup typically requires dedicated backup loads and electrical work, which is difficult in a leased multifamily unit."
},
{
"inputKey": "landlord_permission_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Permanent battery installation affects building electrical systems and would require owner approval."
},
{
"inputKey": "battery_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No battery quote, one-line diagram, or equipment specification is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Tenant-scale battery installation is unlikely without owner approval and electrical access.",
"Whole-building resilience grants should not be calculated for a household applicant.",
"Suppress until scope, ownership, interconnection, paired generation, and quote data are known."
]
},
{
"retrofitTypeId": "microgrid_system",
"projectScopeSummary": "Whole-building or campus-style microgrid is not a realistic tenant household project; only a property owner, utility, or authorized building operator could pursue it.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10920000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost, but true microgrid costs and scope would need engineering study data."
},
{
"inputKey": "critical_facility",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The applicant is a household in a mixed-use building, not a hospital, emergency shelter, water facility, or public safety facility."
},
{
"inputKey": "serves_whole_building_or_campus",
"value": true,
"valueType": "boolean",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A microgrid would normally serve building-level loads, which are not controlled by the tenant."
},
{
"inputKey": "applicant_controls_distribution_assets",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A residential tenant does not control building distribution equipment."
},
{
"inputKey": "engineering_study_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No feasibility study, electrical one-line, critical load schedule, or islanding plan is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Microgrid grants often target critical facilities, public entities, communities, utilities, or resilience hubs.",
"A single tenant household should not be treated as the applicant for building-level microgrid incentives.",
"Suppress unless applicant identity changes and an engineering feasibility scope is provided."
]
},
{
"retrofitTypeId": "thermal_energy_storage",
"projectScopeSummary": "Thermal storage would be a building-level HVAC or domestic hot-water system measure and is not tenant-controlled.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 5510000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost, but thermal storage sizing is not supported by equipment data."
},
{
"inputKey": "thermal_storage_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not identify chilled water, ice storage, hot water storage, or phase-change thermal storage."
},
{
"inputKey": "building_central_plant_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No central plant or large shared cooling/heating equipment is documented."
},
{
"inputKey": "tenant_controls_system",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A renter household would not normally own or control thermal storage serving a mixed-use building."
},
{
"inputKey": "engineering_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No storage design, capacity, controls plan, or contractor quote is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not a realistic single-household retrofit.",
"Suppress unless the property owner is the applicant and system type, load profile, and design data are supplied."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Ground-source heat pump is not realistic for an individual renter in a dense mixed-use Honolulu building and would require owner-controlled site work.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the preview cost, but it is not backed by drilling, loop-field, or equipment scope."
},
{
"inputKey": "loop_field_type",
"value": null,
"valueType": "enum",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No ground loop, water loop, or geotechnical information is available."
},
{
"inputKey": "site_excavation_or_drilling_control",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The tenant does not control land, drilling permissions, or building mechanical systems."
},
{
"inputKey": "hvac_capacity_tons",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "System capacity is unknown and cannot be inferred from a small household electric bill."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not practical for an individual tenant household.",
"Requires owner-controlled site and mechanical scope.",
"Suppress unless a building-owner project with engineering design is provided."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "CHP is not a realistic tenant household project and should be treated as ineligible or not relevant unless a property owner supplies building-level thermal and electric load data.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost, but no CHP system size or building load profile supports it."
},
{
"inputKey": "chp_electric_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "CHP capacity should be based on continuous thermal and electric load, which is not supplied."
},
{
"inputKey": "continuous_thermal_load_present",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The household gas bill is too small to establish a viable CHP thermal host."
},
{
"inputKey": "applicant_controls_fuel_and_interconnection",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A tenant household would not control building gas service, generation interconnection, or shared thermal distribution."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Residential household load is far too small for typical CHP economics.",
"CHP should not be calculated from the tenant's 5,200 kWh annual consumption.",
"Suppress unless a building owner provides continuous thermal load data and interconnection scope."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas generation is not relevant to a single Honolulu renter household in a mixed-use building.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Uses the existing preview cost, but no feedstock or generation scope exists."
},
{
"inputKey": "eligible_feedstock_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A household tenant does not have agricultural, wastewater, landfill, or industrial organic feedstock control."
},
{
"inputKey": "system_capacity_kw",
"value": null,
"valueType": "number",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No system design or feedstock analysis is available."
},
{
"inputKey": "applicant_is_agricultural_or_waste_facility_operator",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a residential household, not a farm, wastewater treatment plant, landfill, or food-waste processor."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Not relevant for this applicant type or site control profile.",
"Do not force renewable-electricity grant qualification from generic renewable categories.",
"Suppress as likely ineligible or not relevant."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "hawaiian_electric_residential_or_hawaii_energy_lighting_rebate_generic",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "eligible_led_product_documentation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The test case does not include receipts, model numbers, or qualifying product documentation for the LED project."
},
{
"inputKey": "installation_location",
"value": "tenant_unit_only",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "Only in-unit lighting is applicant-controlled."
}
],
"reasoning": "A small residential lighting rebate may be plausible, but should not calculate without program-matched eligible product data, receipts, or a quote."
},
{
"opportunityId": "hawaii_residential_heat_pump_or_air_conditioning_rebate_generic",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "qualifying_equipment_model_number",
"value": null,
"valueType": "text",
"sourceStrategy": "quote_required",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "No proposed HVAC equipment model is present."
},
{
"inputKey": "equipment_efficiency_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Efficiency rating is needed to verify eligibility for equipment-based rebates."
},
{
"inputKey": "landlord_permission_obtained",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No permission documentation exists for permanent HVAC changes."
}
],
"reasoning": "HVAC could be a realistic in-unit measure, but grant or rebate calculations should remain suppressed until quote, equipment, and landlord authorization facts are present."
},
{
"opportunityId": "federal_residential_clean_energy_credit_solar_pv_or_battery_generic",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "taxpayer_owns_system",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The modeled applicant does not own roof space or a PV/battery system."
},
{
"inputKey": "installed_at_taxpayer_residence",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The site is the residence, but no actual taxpayer-owned eligible system is proposed."
},
{
"inputKey": "tax_liability_or_credit_monetization_available",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The fixture does not include tax liability facts."
}
],
"reasoning": "Do not calculate a federal residential clean-energy tax credit for landlord-controlled rooftop PV or battery equipment when the applicant is only a renter household."
},
{
"opportunityId": "federal_energy_efficient_home_improvement_credit_hvac_generic",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "taxpayer_purchases_equipment",
"value": null,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The test case does not state whether the tenant or landlord would purchase HVAC equipment."
},
{
"inputKey": "qualifying_efficiency_tier_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No AHRI certificate, ENERGY STAR listing, or model efficiency rating is supplied."
}
],
"reasoning": "A tenant-paid qualifying in-unit HVAC upgrade might be relevant, but calculation should remain suppressed until taxpayer, equipment, and quote facts are available."
},
{
"opportunityId": "multifamily_affordable_housing_solar_or_resilience_grant_generic",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_property_owner_or_authorized_agent",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is modeled as a tenant household."
},
{
"inputKey": "affordable_or_workforce_housing_building",
"value": true,
"valueType": "boolean",
"sourceStrategy": "public_context",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The fixture describes Keauhou Lane as a mixed-use workforce-housing development with reserved housing units."
},
{
"inputKey": "owner_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No owner or property-manager application is included."
}
],
"reasoning": "The building context may be relevant for owner-led multifamily programs, but the household renter is not the proper applicant for building-level grants."
},
{
"opportunityId": "critical_facility_microgrid_resilience_grant_generic",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "critical_facility_status",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile is a residential household, not an emergency operations, medical, water, shelter, public safety, or resilience-hub facility."
},
{
"inputKey": "public_or_nonprofit_applicant",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is not a public entity or nonprofit."
}
],
"reasoning": "Microgrid resilience grant calculations should be suppressed for this tenant household."
},
{
"opportunityId": "agricultural_or_rural_renewable_energy_grant_generic",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "agricultural_producer_or_rural_small_business",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is an urban residential household in Honolulu."
},
{
"inputKey": "renewable_project_business_use_percent",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The household project is not a business energy project."
}
],
"reasoning": "Do not qualify the profile for agricultural, rural business, or farm energy programs."
},
{
"opportunityId": "biomass_biogas_feedstock_energy_grant_generic",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "controlled_organic_feedstock_stream",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No farm, landfill, wastewater, or commercial organic-waste operation exists in the household profile."
}
],
"reasoning": "Biomass and biogas opportunities should be suppressed as not relevant."
},
{
"opportunityId": "ev_charging_or_clean_transportation_grant_generic",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "charger_ports",
"value": 0,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No EV charging project is included in the retrofit summaries or household scope."
},
{
"inputKey": "fleet_owner",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is not a fleet owner."
}
],
"reasoning": "Do not infer an EV charger or fleet project from the mixed-use building context."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "contractor_quote_total_cents",
"reason": "quote not available"
},
{
"inputKey": "equipment_model_numbers",
"reason": "quote not available"
},
{
"inputKey": "actual_rebate_application_submitted",
"reason": "application not submitted"
},
{
"inputKey": "utility_preapproval_status",
"reason": "source requires agency approval"
},
{
"inputKey": "landlord_owner_authorization_document",
"reason": "needs user decision"
},
{
"inputKey": "roof_area_available_sqft",
"reason": "unrealistic for this customer"
},
{
"inputKey": "building_common_area_annual_kwh",
"reason": "unrealistic for this customer"
},
{
"inputKey": "whole_building_interval_load_profile",
"reason": "unrealistic for this customer"
},
{
"inputKey": "central_domestic_hot_water_load",
"reason": "unrealistic for this customer"
},
{
"inputKey": "pv_interconnection_approval",
"reason": "application not submitted"
},
{
"inputKey": "microgrid_feasibility_study_cost_cents",
"reason": "unrealistic for this customer"
},
{
"inputKey": "biomass_feedstock_tons_per_year",
"reason": "unrealistic for this customer"
},
{
"inputKey": "household_income_documentation",
"reason": "needs user decision"
},
{
"inputKey": "tax_credit_appetite_or_tax_liability",
"reason": "needs user decision"
}
],
"doNotForceQualificationReasons": [
"The applicant is a tenant household, not the owner or authorized agent for the 179,800 square foot mixed-use building.",
"Whole-building measures such as rooftop solar, solar hot water, batteries, microgrids, thermal storage, CHP, and geothermal should not use full-building square footage or assumed common-area loads unless the property owner applies.",
"Workforce-housing building context may support owner-led affordable housing programs, but it does not automatically make an individual tenant eligible for building-level grants.",
"The household's annual electric use of 5,200 kWh supports only small in-unit measures and should not be scaled into a commercial or multifamily building project.",
"Public entity, nonprofit, school, agricultural, rural business, tribal, fleet, and critical-facility eligibility facts are absent or affirmatively false for this applicant profile.",
"Quote-dependent measures should remain suppressed until actual equipment model numbers, rated efficiencies, contractor quotes, and application or preapproval status are available.",
"Hawaii geography should continue to block state-specific opportunities outside Hawaii rather than being overridden by generic renewable-energy project labels."
]
}

