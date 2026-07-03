{
"schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
"researchedAt": "2026-07-03",
"sampleUserId": "ocracoke-school-island",
"profileConfidence": "medium",
"profileNotes": "Synthetic project-profile enrichment for a remote North Carolina public K-12 school in Tideland EMC territory, using the supplied test-case facts and realistic planning assumptions. No natural gas service is assumed, the site is publicly owned, and grant estimates should not be forced positive where program eligibility is residential, out-of-state, income-household-based, or dependent on agency preapproval. ",
"organizationFactsToAddOrUpdate": [
{
"inputKey": "applicant_entity_type",
"value": "public_school_district_facility",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile identifies the customer as Ocracoke School, a public K-12 education facility owned by a government or public agency."
},
{
"inputKey": "is_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The organization type is listed as Government / Public Agency and the building type is School / Education Campus."
},
{
"inputKey": "is_public_k12_school",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The primary activity is public K-12 education and NAICS code 611110 corresponds to elementary and secondary schools."
},
{
"inputKey": "is_nonprofit_501c3",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A public school facility would normally apply as a public entity or school district rather than as a private 501(c)(3) nonprofit."
},
{
"inputKey": "is_tribal_entity",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tribal ownership, tribal government, or tribal-school status is present in the supplied test case."
},
{
"inputKey": "is_agricultural_producer",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a public school, not a farm, ranch, aquaculture, or food-production facility."
},
{
"inputKey": "remote_island_facility",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied tax facts mark the site as a remote island facility."
},
{
"inputKey": "natural_gas_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied source form lists gasUtilityProvider as None and the tax facts report no piped gas service."
},
{
"inputKey": "electric_utility_customer",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied energy profile includes annual electric usage, cost, and Tideland EMC as the self-reported electric utility."
},
{
"inputKey": "electric_utility_provider_confirmed_for_application",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The normalized profile marks the utility verification status as self-reported unverified, so utility-specific incentives should require bill or account confirmation."
},
{
"inputKey": "customer_class",
"value": null,
"valueType": "enum",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied utility profile does not provide a confirmed rate schedule or customer class."
},
{
"inputKey": "property_tax_exempt_public_school",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The synthetic tax facts indicate county public school property-exempt status, but user confirmation should remain allowed."
},
{
"inputKey": "school_procurement_requires_public_bid_or_board_approval",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Public school capital projects commonly require district procurement, quote documentation, and board or county approval before grant application commitments."
},
{
"inputKey": "project_stage",
"value": "exploring",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied project object lists the stage as exploring."
},
{
"inputKey": "procurement_stage",
"value": "pre_quote_planning",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile has modeled project costs but no vendor quotes, bid packages, equipment selections, or application records."
},
{
"inputKey": "has_board_approved_capital_project",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No board approval, capital improvement plan authorization, or grant application authorization is included in the supplied test case."
},
{
"inputKey": "has_active_grant_application",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No active or submitted grant application is documented in the profile."
},
{
"inputKey": "has_vendor_quote",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Retrofit previews use admin-modeled or fixed project inputs, not customer quotes."
},
{
"inputKey": "annual_kwh",
"value": 478000,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile includes annual kWh."
},
{
"inputKey": "annual_electric_cost_cents",
"value": 7409000,
"valueType": "money_cents",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile lists annual electric cost as $74,090."
},
{
"inputKey": "average_cost_per_kwh_cents",
"value": 15.5,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied site energy profile provides an average electric cost of $0.155/kWh."
},
{
"inputKey": "building_square_footage",
"value": 19117,
"valueType": "number",
"sourceStrategy": "existing_test_case",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The supplied profile parses square footage as 19,117 square feet."
},
{
"inputKey": "critical_facility_or_resilience_role",
"value": "remote_public_school_possible_community_shelter_role_unconfirmed",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A remote island public school may have resilience value, but the test case does not document an emergency shelter designation."
}
],
"retrofitProjectInputs": [
{
"retrofitTypeId": "air_sealing_weatherization",
"projectScopeSummary": "Moderate envelope tune-up for a 19,117 sq ft coastal school: targeted air sealing, door sweeps, weatherstripping, attic or roof-penetration sealing, and minor insulation repairs where accessible.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 194600,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview cost for weatherization as the realistic modeled project cost."
},
{
"inputKey": "building_area_served_sqft",
"value": 19117,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The measure is assumed to affect the main school building."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 24000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A conservative roughly 5% electricity reduction is plausible for envelope and infiltration improvements at an all-electric or no-gas coastal school, but an audit is needed."
},
{
"inputKey": "energy_audit_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No audit report is present in the test case."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The preview is admin-modeled and should not be treated as a bid."
},
{
"inputKey": "measure_type",
"value": [
"air_sealing",
"weatherstripping",
"minor_insulation_repair"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic small-to-moderate envelope measures for a coastal school."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Residential LIHEAP-style household assistance should not be treated as a public-school capital grant without a specific school or public-facility eligibility pathway.",
"An energy audit and contractor quote should be required before calculating grant value.",
"If the program requires low-income household eligibility, suppress for this public school facility."
]
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"projectScopeSummary": "Replace aging packaged heat-pump or split-system equipment serving classrooms and administrative spaces with high-efficiency electric heat-pump equipment suitable for a coastal environment.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 798000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied preview upfront cost for high-efficiency HVAC replacement."
},
{
"inputKey": "hvac_units_replaced",
"value": 4,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small public school of about 19,000 sq ft could plausibly have several packaged or split heat-pump systems, but the exact count requires equipment schedules."
},
{
"inputKey": "selected_equipment_type",
"value": "high_efficiency_air_source_heat_pump",
"valueType": "enum",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No piped natural gas is reported, so electric heat-pump replacement is more plausible than gas-fired equipment."
},
{
"inputKey": "estimated_total_capacity_tons",
"value": 45,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A broad planning assumption for a school in a humid coastal climate; load calculations are required."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 52000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "The supplied preview says HVAC uses modeled annual kWh reduction; this is a conservative planning estimate only."
},
{
"inputKey": "ashrae_or_manual_load_calculation_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No load calculation or engineering design is included."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Equipment-specific pricing and efficiency ratings are not supplied."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Public-sector or school energy-efficiency grants may be plausible, but formulas should require quote, efficiency rating, and application status.",
"Utility rebate eligibility should require confirmed Tideland EMC account and rate class."
]
},
{
"retrofitTypeId": "led_lighting_retrofit",
"projectScopeSummary": "Small lighting retrofit replacing a limited set of older interior fixtures with LED fixtures or retrofit kits in classrooms, corridors, or support spaces.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 160425,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied LED preview cost."
},
{
"inputKey": "fixture_replacements",
"value": 12,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied retrofit preview explicitly assumes 12 fixture replacements."
},
{
"inputKey": "estimated_annual_kwh_savings",
"value": 5400,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small 12-fixture retrofit would save a modest amount relative to the school's total electric usage."
},
{
"inputKey": "lighting_hours_per_year",
"value": 2800,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "School lighting hours vary by space and after-school use; this is a planning assumption."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "The profile does not include a lighting audit, fixture schedule, or quote."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"The project is small and may fall below minimum grant thresholds.",
"Utility rebates should require fixture wattage, DLC/ENERGY STAR eligibility where applicable, and utility account confirmation."
]
},
{
"retrofitTypeId": "rooftop_solar_pv",
"projectScopeSummary": "Conservative rooftop solar PV planning case sized for partial school load offset, subject to roof condition, wind exposure, interconnection, and public-school ownership review.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 10000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied rooftop solar PV preview upfront cost."
},
{
"inputKey": "solar_pv_system_size_kw_dc",
"value": 80,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "An 80 kW DC system is a plausible partial-load system for a 478,000 kWh/year school, but roof and interconnection constraints are unknown."
},
{
"inputKey": "estimated_annual_generation_kwh",
"value": 112000,
"valueType": "number",
"sourceStrategy": "derived_from_utility_profile",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Planning estimate assumes roughly 1,400 kWh/kW-year in coastal North Carolina; site-specific shading and design are not confirmed."
},
{
"inputKey": "roof_structural_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No structural review, roof age, or wind-load assessment is supplied."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No utility interconnection request is documented."
},
{
"inputKey": "net_metering_or_bill_credit_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "Tideland EMC tariff treatment and school rate class are not confirmed."
},
{
"inputKey": "third_party_ownership_or_direct_pay_review_required",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "As a public school, monetization of tax incentives or elective/direct-pay treatment should be reviewed before estimating net cost."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No PV proposal or quote is present."
}
],
"shouldQualifyForTypicalGrants": true,
"qualificationCaveats": [
"Solar grants or tax-credit-style benefits may be plausible for a public school, but estimates should require ownership, direct-pay/tax treatment, interconnection, and quote details.",
"Remote island wind, corrosion, and roof constraints add uncertainty.",
"Do not assume a positive grant where the database has no complete formula or school-eligible rule."
]
},
{
"retrofitTypeId": "small_wind_turbine",
"projectScopeSummary": "Exploratory small wind project for island resilience or educational demonstration, not yet supported by wind study, zoning review, or interconnection application.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 8000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied small wind preview upfront cost."
},
{
"inputKey": "wind_system_size_kw",
"value": 20,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A 20 kW system is a plausible small institutional demonstration scale, but wind resource, setbacks, and permitting are unknown."
},
{
"inputKey": "wind_resource_assessment_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No tower data, wind study, or turbine feasibility review is present."
},
{
"inputKey": "zoning_or_coastal_permitting_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Small wind on an island school site would require local, safety, and coastal permitting review."
},
{
"inputKey": "interconnection_application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No interconnection application is included."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No turbine model or installed-cost quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Small wind is plausible as a concept but should remain suppressed until a wind study, permitting path, and quote exist.",
"Do not force qualification based only on remote-island status."
]
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"projectScopeSummary": "Exploratory ground-source heat-pump concept for school HVAC, but site constraints, borefield feasibility, flood/coastal conditions, and construction logistics are not confirmed.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 1576000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied ground-source geothermal heat-pump preview cost."
},
{
"inputKey": "estimated_capacity_tons",
"value": 20,
"valueType": "number",
"sourceStrategy": "derived_from_building_size",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A partial-building geothermal scope is more plausible at the modeled cost than a full-campus replacement."
},
{
"inputKey": "borefield_or_loop_design_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No loop design, site survey, or geotechnical information is present."
},
{
"inputKey": "geotechnical_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Remote coastal island soils and groundwater conditions could materially affect feasibility."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No installed quote or design document is provided."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Possible energy-efficiency measure, but the scope is too uncertain for calculation.",
"Do not calculate grant value without design capacity, loop type, quote, and eligibility rule."
]
},
{
"retrofitTypeId": "solar_water_heating_system",
"projectScopeSummary": "Small solar water-heating system for cafeteria, locker-room, or maintenance hot-water load, subject to actual domestic hot water usage confirmation.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 680000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied solar water-heating preview cost."
},
{
"inputKey": "collector_area_sqft",
"value": 160,
"valueType": "number",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "low",
"userOverrideAllowed": true,
"reasoning": "A small institutional domestic hot-water solar thermal system could plausibly use about this collector area, but actual load is unknown."
},
{
"inputKey": "serves_domestic_hot_water",
"value": true,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "For a school with no gas service, domestic hot water is likely electric or heat-pump based, making solar thermal conceptually relevant."
},
{
"inputKey": "annual_hot_water_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Water-heating energy use is not separated from total electric usage."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No solar thermal quote or equipment selection is present."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Could be eligible under some renewable or public-facility programs, but hot-water load and quote are missing.",
"May be a low-priority project for a K-12 school if domestic hot-water load is modest."
]
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"projectScopeSummary": "Biomass or biogas energy system is not a realistic near-term fit for this remote island public school without fuel supply, waste feedstock, operations staff, emissions permitting, or district energy need.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 9000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied biomass/biogas preview cost only as a test fixture amount."
},
{
"inputKey": "has_onsite_biomass_or_biogas_feedstock",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "A K-12 school is not expected to generate sufficient fuel or digestible waste feedstock for a dedicated energy system."
},
{
"inputKey": "fuel_supply_contract_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No biomass fuel or biogas supply contract is provided."
},
{
"inputKey": "emissions_or_air_permit_review_completed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Combustion or gas energy projects would need permitting review, especially for a public school site."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No system design or quote is supplied."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"Unrealistic project type for this customer absent feedstock and permitting evidence.",
"Suppress rather than calculate from generic renewable-energy eligibility."
]
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"projectScopeSummary": "Combined heat and power is not a realistic fit because no piped natural gas is reported and the school does not show a large continuous thermal load.",
"inputFacts": [
{
"inputKey": "eligible_project_cost_cents",
"value": 12000000,
"valueType": "money_cents",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Uses the supplied CHP preview cost only as a modeled test amount."
},
{
"inputKey": "natural_gas_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The supplied profile lists no gas utility provider and no piped gas service."
},
{
"inputKey": "continuous_thermal_load_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "A K-12 school generally does not have the type of round-the-clock thermal load that supports CHP without specific documentation."
},
{
"inputKey": "fuel_supply_contract_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No alternative fuel supply is present."
},
{
"inputKey": "contractor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No CHP quote, generator size, or thermal-use design is included."
}
],
"shouldQualifyForTypicalGrants": false,
"qualificationCaveats": [
"No natural gas distribution assumption should suppress conventional CHP.",
"Do not force qualification under renewable-electricity category labels."
]
}
],
"grantOpportunitySpecificInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
"expectedHandling": "likely_ineligible",
"inputFacts": [
{
"inputKey": "applicant_is_low_income_household",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The applicant is a public school facility, not a household."
},
{
"inputKey": "applicant_is_public_school",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The site is a public K-12 school."
},
{
"inputKey": "household_income_eligibility_documented",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "No household-level LIHEAP eligibility documentation exists or would normally apply to a public school building."
},
{
"inputKey": "weatherization_project_for_residential_unit",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The weatherization scope is for a school facility, not a residence."
}
],
"reasoning": "Although the match engine flagged LIHEAP because it is nationwide and includes weatherization concepts, the customer is a public school facility. Unless the rule has a specific school/public-building pathway, this should be suppressed as ineligible rather than calculated."
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
"reasoning": "The supplied existing tax opportunity input already suppresses Michigan Renewable Energy Renaissance Zone treatment because the site is in North Carolina."
},
{
"inputKey": "site_state_code",
"value": "NC",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied normalized address state is NC."
}
],
"reasoning": "Out-of-state Michigan zone program; do not calculate."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"expectedHandling": "not_relevant_to_this_profile",
"inputFacts": [
{
"inputKey": "municipality",
"value": "Ocracoke, NC",
"valueType": "text",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied existing tax opportunity input already indicates the site is in North Carolina, not Rhode Island."
},
{
"inputKey": "site_state_code",
"value": "NC",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied normalized address state is NC."
}
],
"reasoning": "Out-of-state Rhode Island property-tax program; do not calculate."
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
"reasoning": "The supplied existing tax opportunity input already suppresses the Washington solar-manufacturing B&O treatment."
},
{
"inputKey": "site_state_code",
"value": "NC",
"valueType": "enum",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": false,
"reasoning": "The supplied normalized address state is NC."
},
{
"inputKey": "solar_manufacturing_activity_present",
"value": false,
"valueType": "boolean",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The profile describes public K-12 education, not solar manufacturing."
}
],
"reasoning": "Out-of-state and wrong business activity; do not calculate."
},
{
"opportunityId": "GENERIC_PUBLIC_SCHOOL_ENERGY_EFFICIENCY_GRANT_PLACEHOLDER",
"expectedHandling": "needs_quote",
"inputFacts": [
{
"inputKey": "applicant_is_public_school",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The test case identifies a public K-12 school."
},
{
"inputKey": "eligible_measure_types",
"value": [
"high_efficiency_hvac_replacement",
"led_lighting_retrofit",
"air_sealing_weatherization"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "These are realistic public-school energy-efficiency scopes."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No vendor quote or bid tab is included."
},
{
"inputKey": "application_submitted",
"value": false,
"valueType": "boolean",
"sourceStrategy": "application_status_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No application status is present."
}
],
"reasoning": "A public-school efficiency grant could be relevant, but this is only a placeholder test handling record and should not produce value without a real opportunity rule, quote, and application status."
},
{
"opportunityId": "GENERIC_RENEWABLE_ENERGY_PUBLIC_ENTITY_PLACEHOLDER",
"expectedHandling": "needs_project_scope",
"inputFacts": [
{
"inputKey": "applicant_is_public_entity",
"value": true,
"valueType": "boolean",
"sourceStrategy": "existing_test_case",
"confidence": "high",
"userOverrideAllowed": true,
"reasoning": "The customer is a public school or government/public agency."
},
{
"inputKey": "potential_measure_types",
"value": [
"rooftop_solar_pv",
"solar_water_heating_system"
],
"valueType": "array",
"sourceStrategy": "synthetic_realistic_default",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "Solar PV and small solar water heating are more plausible renewable measures than biomass, CHP, or small wind at this site."
},
{
"inputKey": "final_system_size_confirmed",
"value": false,
"valueType": "boolean",
"sourceStrategy": "should_ask_user",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No final design, system size, interconnection, or site-control package is available."
},
{
"inputKey": "vendor_quote_available",
"value": false,
"valueType": "boolean",
"sourceStrategy": "quote_required",
"confidence": "medium",
"userOverrideAllowed": true,
"reasoning": "No renewable-energy quote is included."
}
],
"reasoning": "Renewable-energy funding may be conceptually relevant, especially for solar PV, but estimates should remain suppressed unless a real opportunity and formula-ready project scope are present."
}
],
"missingInputsThatShouldRemainMissing": [
{
"inputKey": "utility_account_number",
"reason": "needs user decision"
},
{
"inputKey": "confirmed_customer_class_or_rate_schedule",
"reason": "needs user decision"
},
{
"inputKey": "contractor_quote_total_by_measure",
"reason": "quote not available"
},
{
"inputKey": "itemized_equipment_costs",
"reason": "quote not available"
},
{
"inputKey": "equipment_make_model_efficiency_ratings",
"reason": "quote not available"
},
{
"inputKey": "energy_audit_report",
"reason": "needs user decision"
},
{
"inputKey": "school_board_project_approval_date",
"reason": "application not submitted"
},
{
"inputKey": "grant_application_submission_date",
"reason": "application not submitted"
},
{
"inputKey": "grant_award_or_preapproval_letter",
"reason": "source requires agency approval"
},
{
"inputKey": "roof_structural_engineering_report_for_pv",
"reason": "needs user decision"
},
{
"inputKey": "utility_interconnection_approval",
"reason": "source requires agency approval"
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
"inputKey": "chp_fuel_supply_contract",
"reason": "unrealistic for this customer"
},
{
"inputKey": "household_income_documentation_for_liheap",
"reason": "unrealistic for this customer"
}
],
"doNotForceQualificationReasons": [
"Do not treat LIHEAP or other low-income household programs as eligible for a public school building unless a rule explicitly supports public-school facilities.",
"Do not override state mismatch blockers for Michigan, Rhode Island, Washington, or other out-of-state opportunities.",
"Do not assume natural-gas-based CHP eligibility because the site reports no piped gas service.",
"Do not assume biomass or biogas eligibility without feedstock, fuel contract, operating plan, and permitting evidence.",
"Do not calculate utility-specific rebates until Tideland EMC account, rate class, and tariff eligibility are confirmed.",
"Do not calculate renewable-energy grant value from generic renewable category matches without a real opportunity rule, project design, quote, and application status.",
"Do not assume remote-island status alone creates grant eligibility; use it only as a resilience-context fact where a program explicitly awards or prioritizes remote communities.",
"Do not include tax-credit or elective-pay-style benefits in grant totals unless the calculation package explicitly supports public, tax-exempt school ownership."
]
}

