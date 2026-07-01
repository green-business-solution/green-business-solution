You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, commentary, or explanations outside the JSON.

Important formatting rules:
- Use raw URLs only. Do not use markdown links like `[text](url)`.
- Keep `opportunityId` values exactly as supplied.
- Use `null` only where appropriate; prefer empty arrays for unknown list values.
- If you cannot access an official current source, do not infer details from stale snippets. Mark the record `source_inaccessible` and explain the blocker.
- If an old DSIRE record points to a stale page but you find a current official replacement, use the current official source and note the stale-source issue in `blockers` or `reasoningNotes`.

Goal:
For each target opportunity below, determine whether RetroFi's current opportunity-to-retrofit matches are correct. Repair the opportunity data so matching can distinguish:
- correct eligible retrofit categories;
- false-positive retrofit categories;
- geography and utility territory limits;
- eligible applicants and sectors;
- hard requirements;
- blockers that should prevent matching;
- source accessibility and availability.

The last completed repair batch ended at `SOURCE_DSIRE:dsire_program_id:3026`.
Start this batch with `SOURCE_DSIRE:dsire_program_id:2176`.

If you complete all 10 targets in this prompt, set:

```json
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2639"
```

Output schema:

```json
{
  "schemaVersion": "opportunity_data_research_repairs.v1",
  "researchedAt": "2026-07-01",
  "source": "gpt_pro",
  "repairs": [
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:...",
      "confidence": "high | medium | low",
      "availabilityStatus": "active | unavailable | source_inaccessible | expired | unknown",
      "geography": {
        "country": "US",
        "states": [],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": ""
      },
      "eligibleApplicantTypes": [],
      "eligibleSectors": [],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [],
      "blockers": [],
      "programType": "",
      "administrator": "",
      "applicationUrl": null,
      "websiteUrl": null,
      "sourceUrlsChecked": [],
      "evidenceText": "",
      "reasoningNotes": ""
    }
  ],
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2639"
}
```

Research requirements:
1. Prioritize current official administrator, utility, program, application, tariff, rebate-form, or program-manual sources.
2. Use DSIRE only as a starting clue, not as final authority if current official sources disagree.
3. Preserve categories only when current sources support them.
4. Remove or block false-positive categories explicitly in `blockers`.
5. If a source supports a product-specific match, do not generalize it into a broader building category. Example: window AC is not window replacement; pre-rinse spray valve is not broad plumbing retrofit.
6. If EV charging, demand response, solar, financing, audit, or water conservation is a separate program, say so. Keep it only if it truly belongs to this opportunity or clearly mark the separate-program boundary.
7. For source-inaccessible records, clear unsupported eligible categories and explain what source failed.
8. Include concise evidence in `evidenceText`; do not paste long source text.

Targets:

```json
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2176",
    "opportunityName": "New Hampshire Electric Co-op - Commercial and Municipal Retrofit Energy Efficiency Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2176/new-hampshire-electric-co-op-commercial-and-municipal-retrofit-energy-efficiency-programs",
    "websiteUrl": "https://www.nhec.com/commercial-savings-programs/",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Rebate Program",
    "administrator": "New Hampshire Electric Co-op",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["air conditioner", "dishwasher", "economizer", "ev charging", "freezer", "fryer", "geothermal", "ground source heat pump", "heat pump", "ice machine", "oven", "refrigeration", "refrigerator", "steamer"],
    "relatedRetrofits": [
      {"retrofitTypeId": "led_lighting_retrofit", "displayName": "LED lighting retrofit", "parentCategory": "lighting"},
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_hvac_retrofit", "displayName": "Heat pump HVAC retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "hvac_controls_retrofit", "displayName": "HVAC controls retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "ground_source_geothermal_heat_pump", "displayName": "Ground-source / geothermal heat pump", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "high_efficiency_refrigeration_equipment", "displayName": "High-efficiency refrigeration equipment", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "efficient_ice_machine", "displayName": "Efficient ice machine", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "ev_charger_installation", "displayName": "EV charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "high_efficiency_commercial_dishwasher", "displayName": "High-efficiency commercial dishwasher", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "high_efficiency_fryer", "displayName": "High-efficiency fryer", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "high_efficiency_oven", "displayName": "High-efficiency oven", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "high_efficiency_steamer", "displayName": "High-efficiency steamer", "parentCategory": "commercial_kitchen_foodservice"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2549",
    "opportunityName": "New Prague Utilities Commission - Commercial & Industrial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2549/new-prague-utilities-commission-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/new-prague",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Rebate Program",
    "administrator": "New Prague Utilities Commission",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["air compressor", "air conditioner", "anti sweat heater", "anti-sweat heater", "chiller", "compressed air leak", "cooler freezer", "energy management", "energy management system", "floating head pressure", "freezer", "geothermal", "hvac replacement", "low flow", "motor replacement", "refrigeration", "vending machine controls", "walk in freezer"],
    "relatedRetrofits": [
      {"retrofitTypeId": "led_lighting_retrofit", "displayName": "LED lighting retrofit", "parentCategory": "lighting"},
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "ground_source_geothermal_heat_pump", "displayName": "Ground-source / geothermal heat pump", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "high_efficiency_refrigeration_equipment", "displayName": "High-efficiency refrigeration equipment", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "walk_in_cooler_freezer_upgrade", "displayName": "Walk-in cooler/freezer upgrade", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "refrigeration_controls_retrofit", "displayName": "Refrigeration controls retrofit", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "anti_sweat_heater_controls", "displayName": "Anti-sweat heater controls", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "energy_management_system", "displayName": "Energy management system", "parentCategory": "building_controls_energy_management"},
      {"retrofitTypeId": "low_flow_fixture_retrofit", "displayName": "Low-flow fixture retrofit", "parentCategory": "water_efficiency"},
      {"retrofitTypeId": "high_efficiency_motor_replacement", "displayName": "High-efficiency motor replacement", "parentCategory": "motors_pumps_fans_drives"},
      {"retrofitTypeId": "efficient_air_compressor", "displayName": "Efficient air compressor", "parentCategory": "compressed_air_industrial"},
      {"retrofitTypeId": "compressed_air_leak_repair", "displayName": "Compressed air leak repair", "parentCategory": "compressed_air_industrial"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4130",
    "opportunityName": "Nicor Gas - Commercial Energy Efficiency Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4130/nicor-gas-commercial-energy-efficiency-rebates",
    "websiteUrl": "https://www.nicorgas.com/business/ways-to-save/rebates.html",
    "applicationUrl": null,
    "state": "IL",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["air sealing", "boiler", "boiler controls", "boiler reset", "demand controlled ventilation", "duct sealing", "exterior door", "heat recovery", "insulation", "laundry", "smart thermostat", "steam trap", "thermostat"],
    "relatedRetrofits": [
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "smart_thermostat_zoning_retrofit", "displayName": "Smart thermostat / zoning retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "high_efficiency_boiler_retrofit", "displayName": "High-efficiency boiler retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "boiler_controls_burner_retrofit", "displayName": "Boiler controls / burner retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "duct_sealing_and_insulation", "displayName": "Duct sealing and duct insulation", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "insulation_upgrade", "displayName": "Insulation upgrade", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "air_sealing_weatherization", "displayName": "Air sealing / weatherization", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "exterior_door_replacement", "displayName": "Exterior door replacement", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "high_efficiency_laundry_equipment", "displayName": "High-efficiency laundry equipment", "parentCategory": "water_efficiency"},
      {"retrofitTypeId": "waste_heat_recovery", "displayName": "Waste heat recovery", "parentCategory": "compressed_air_industrial"},
      {"retrofitTypeId": "steam_trap_replacement", "displayName": "Steam trap replacement", "parentCategory": "compressed_air_industrial"},
      {"retrofitTypeId": "demand_controlled_ventilation", "displayName": "Demand-controlled ventilation", "parentCategory": "indoor_air_quality_ventilation"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2415",
    "opportunityName": "Pacific Power - wattsmart Business Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2415/pacific-power-wattsmart-business-program",
    "websiteUrl": "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-washington.html",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": "Pacific Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["clothes washer", "cool roof", "energy management", "geothermal", "heat pump", "heat pump water heater", "insulation", "lighting controls", "programmable thermostat", "thermostat", "window", "window film"],
    "relatedRetrofits": [
      {"retrofitTypeId": "lighting_controls_retrofit", "displayName": "Lighting controls retrofit", "parentCategory": "lighting"},
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_hvac_retrofit", "displayName": "Heat pump HVAC retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "smart_thermostat_zoning_retrofit", "displayName": "Smart thermostat / zoning retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "ground_source_geothermal_heat_pump", "displayName": "Ground-source / geothermal heat pump", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_water_heater", "displayName": "Heat pump water heater", "parentCategory": "water_heating"},
      {"retrofitTypeId": "insulation_upgrade", "displayName": "Insulation upgrade", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "window_replacement", "displayName": "Window replacement", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "cool_roof_reflective_roof", "displayName": "Cool roof / reflective roof coating", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "window_film_shading_retrofit", "displayName": "Window film / shading retrofit", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "energy_management_system", "displayName": "Energy management system", "parentCategory": "building_controls_energy_management"},
      {"retrofitTypeId": "high_efficiency_laundry_equipment", "displayName": "High-efficiency laundry equipment", "parentCategory": "water_efficiency"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4312",
    "opportunityName": "San Miguel Power Association - Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4312/san-miguel-power-association-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ecoactionpartners.org/smparebates",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["audit", "blower", "dc fast", "electric vehicle charging", "energy audit", "ev charging", "fast charger", "freezer", "geothermal", "ground source heat pump", "heat pump", "heat pump water heater", "induction", "level 2", "level-2", "refrigerator", "smart thermostat", "thermostat"],
    "relatedRetrofits": [
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_hvac_retrofit", "displayName": "Heat pump HVAC retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "smart_thermostat_zoning_retrofit", "displayName": "Smart thermostat / zoning retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "ground_source_geothermal_heat_pump", "displayName": "Ground-source / geothermal heat pump", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_water_heater", "displayName": "Heat pump water heater", "parentCategory": "water_heating"},
      {"retrofitTypeId": "high_efficiency_refrigeration_equipment", "displayName": "High-efficiency refrigeration equipment", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "ev_charger_installation", "displayName": "EV charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "level_2_ev_charger_installation", "displayName": "Level 2 EV charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "dc_fast_charger_installation", "displayName": "DC fast charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "induction_cooking_equipment", "displayName": "Induction cooking equipment", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "efficient_fan_blower_replacement", "displayName": "Efficient fan/blower replacement", "parentCategory": "motors_pumps_fans_drives"},
      {"retrofitTypeId": "energy_audit", "displayName": "Energy audit", "parentCategory": "audits_studies_planning"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1924",
    "opportunityName": "Silicon Valley Power - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1924/silicon-valley-power-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Silicon Valley Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["anti sweat heater", "anti-sweat heater", "building automation", "freezer", "fryer", "heat pump", "heat pump water heater", "induction", "kitchen ventilation", "oven", "refrigeration", "walk in cooler"],
    "relatedRetrofits": [
      {"retrofitTypeId": "led_lighting_retrofit", "displayName": "LED lighting retrofit", "parentCategory": "lighting"},
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_hvac_retrofit", "displayName": "Heat pump HVAC retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_water_heater", "displayName": "Heat pump water heater", "parentCategory": "water_heating"},
      {"retrofitTypeId": "high_efficiency_refrigeration_equipment", "displayName": "High-efficiency refrigeration equipment", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "walk_in_cooler_freezer_upgrade", "displayName": "Walk-in cooler/freezer upgrade", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "anti_sweat_heater_controls", "displayName": "Anti-sweat heater controls", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "building_automation_system", "displayName": "Building automation system", "parentCategory": "building_controls_energy_management"},
      {"retrofitTypeId": "high_efficiency_fryer", "displayName": "High-efficiency fryer", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "high_efficiency_oven", "displayName": "High-efficiency oven", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "induction_cooking_equipment", "displayName": "Induction cooking equipment", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "demand_controlled_kitchen_ventilation", "displayName": "Demand-controlled kitchen ventilation", "parentCategory": "commercial_kitchen_foodservice"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1463",
    "opportunityName": "SoCalGas - Non-Residential Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1463/socalgas-non-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.socalgas.com/for-your-business/energy-savings/rebates-and-incentives",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Southern California Gas Company",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["boiler", "burner", "commercial dishwasher", "dishwasher", "economizer", "fryer", "heat recovery", "insulation", "oven", "solar thermal", "steam trap", "steamer"],
    "relatedRetrofits": [
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "hvac_controls_retrofit", "displayName": "HVAC controls retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "high_efficiency_boiler_retrofit", "displayName": "High-efficiency boiler retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "boiler_controls_burner_retrofit", "displayName": "Boiler controls / burner retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "solar_water_heating_system", "displayName": "Solar water heating system", "parentCategory": "water_heating"},
      {"retrofitTypeId": "insulation_upgrade", "displayName": "Insulation upgrade", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "high_efficiency_commercial_dishwasher", "displayName": "High-efficiency commercial dishwasher", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "high_efficiency_fryer", "displayName": "High-efficiency fryer", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "high_efficiency_oven", "displayName": "High-efficiency oven", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "high_efficiency_steamer", "displayName": "High-efficiency steamer", "parentCategory": "commercial_kitchen_foodservice"},
      {"retrofitTypeId": "waste_heat_recovery", "displayName": "Waste heat recovery", "parentCategory": "compressed_air_industrial"},
      {"retrofitTypeId": "steam_trap_replacement", "displayName": "Steam trap replacement", "parentCategory": "compressed_air_industrial"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1543",
    "opportunityName": "Texas-New Mexico Power Company - Residential and Hard-to-Reach Standard Offer Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1543/texas-new-mexico-power-company-residential-and-hard-to-reach-standard-offer-programs",
    "websiteUrl": "https://tnmpefficiency.com/residential.php#existing-homes",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Frontier Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["aerator", "duct sealing", "energy storage", "evse", "heat pump", "heat pump water heater", "insulation", "level 2", "level-2", "low flow", "mini split", "showerhead", "smart thermostat", "solar pv", "thermostat"],
    "relatedRetrofits": [
      {"retrofitTypeId": "led_lighting_retrofit", "displayName": "LED lighting retrofit", "parentCategory": "lighting"},
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_hvac_retrofit", "displayName": "Heat pump HVAC retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "smart_thermostat_zoning_retrofit", "displayName": "Smart thermostat / zoning retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "duct_sealing_and_insulation", "displayName": "Duct sealing and duct insulation", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_water_heater", "displayName": "Heat pump water heater", "parentCategory": "water_heating"},
      {"retrofitTypeId": "insulation_upgrade", "displayName": "Insulation upgrade", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "rooftop_solar_pv", "displayName": "Rooftop solar PV", "parentCategory": "solar_renewable_electricity"},
      {"retrofitTypeId": "battery_storage_system", "displayName": "Battery storage system", "parentCategory": "energy_storage_resilience"},
      {"retrofitTypeId": "ev_charger_installation", "displayName": "EV charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "level_2_ev_charger_installation", "displayName": "Level 2 EV charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "low_flow_fixture_retrofit", "displayName": "Low-flow fixture retrofit", "parentCategory": "water_efficiency"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5738",
    "opportunityName": "(Electric and Gas) Residential Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5738/electric-and-gas-residential-rebate-program",
    "websiteUrl": "https://energizect.com/your-home/rebates-and-incentives",
    "applicationUrl": null,
    "state": "CT",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["boiler", "condensing water heater", "furnace", "geothermal", "heat pump", "heat pump water heater", "insulation", "programmable thermostat", "thermostat", "window"],
    "relatedRetrofits": [
      {"retrofitTypeId": "led_lighting_retrofit", "displayName": "LED lighting retrofit", "parentCategory": "lighting"},
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_hvac_retrofit", "displayName": "Heat pump HVAC retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "smart_thermostat_zoning_retrofit", "displayName": "Smart thermostat / zoning retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "high_efficiency_furnace_retrofit", "displayName": "High-efficiency furnace retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "high_efficiency_boiler_retrofit", "displayName": "High-efficiency boiler retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "ground_source_geothermal_heat_pump", "displayName": "Ground-source / geothermal heat pump", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_water_heater", "displayName": "Heat pump water heater", "parentCategory": "water_heating"},
      {"retrofitTypeId": "high_efficiency_gas_water_heater", "displayName": "High-efficiency gas water heater", "parentCategory": "water_heating"},
      {"retrofitTypeId": "insulation_upgrade", "displayName": "Insulation upgrade", "parentCategory": "building_envelope"},
      {"retrofitTypeId": "window_replacement", "displayName": "Window replacement", "parentCategory": "building_envelope"}
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1615",
    "opportunityName": "Anaheim Public Utilities - Commercial Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1615/anaheim-public-utilities-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "http://www.anaheim.net/5353/Business-Energy-Rebates",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Anaheim Public Utilities",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchedTerms": ["air conditioner", "air conditioning", "audit", "cooling tower", "dc fast", "ev charger", "heat pump", "level 2", "level-2", "lighting controls", "refrigeration", "vfd"],
    "relatedRetrofits": [
      {"retrofitTypeId": "led_lighting_retrofit", "displayName": "LED lighting retrofit", "parentCategory": "lighting"},
      {"retrofitTypeId": "lighting_controls_retrofit", "displayName": "Lighting controls retrofit", "parentCategory": "lighting"},
      {"retrofitTypeId": "high_efficiency_hvac_replacement", "displayName": "High-efficiency HVAC replacement", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "heat_pump_hvac_retrofit", "displayName": "Heat pump HVAC retrofit", "parentCategory": "hvac_space_conditioning"},
      {"retrofitTypeId": "high_efficiency_refrigeration_equipment", "displayName": "High-efficiency refrigeration equipment", "parentCategory": "refrigeration"},
      {"retrofitTypeId": "ev_charger_installation", "displayName": "EV charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "level_2_ev_charger_installation", "displayName": "Level 2 EV charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "dc_fast_charger_installation", "displayName": "DC fast charger installation", "parentCategory": "ev_charging_transportation"},
      {"retrofitTypeId": "cooling_tower_controls_optimization", "displayName": "Cooling tower controls / optimization", "parentCategory": "water_efficiency"},
      {"retrofitTypeId": "variable_frequency_drive_retrofit", "displayName": "Variable frequency drive retrofit", "parentCategory": "motors_pumps_fans_drives"},
      {"retrofitTypeId": "energy_audit", "displayName": "Energy audit", "parentCategory": "audits_studies_planning"}
    ]
  }
]
```
