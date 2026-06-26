import { asArray, normalizeText } from "./ontologies.mjs";

export const RETROFIT_TAXONOMY_VERSION = "retrofit-taxonomy-2026-06-25-v1";

export const RETROFIT_TYPES = [
  retrofit("led_lighting_retrofit", "LED lighting retrofit", "lighting", true, ["LED lamps", "LED fixtures", "drivers"], ["electric_usage_reduction"], ["electric"], ["lighting"], ["led lighting", "led fixture", "led lamp", "light emitting diode", "lighting retrofit"], true),
  retrofit("lighting_controls_retrofit", "Lighting controls retrofit", "lighting", true, ["occupancy sensors", "daylight sensors", "dimmers", "timers", "networked controls"], ["electric_usage_reduction", "controls_building_automation"], ["electric"], ["lighting", "building_controls"], ["lighting controls", "occupancy sensor", "daylight sensor", "dimmer", "networked lighting", "lighting control"]),
  retrofit("exterior_site_lighting_retrofit", "Exterior/site lighting retrofit", "lighting", true, ["exterior LED fixtures", "parking lot lighting", "pole lights"], ["electric_usage_reduction"], ["electric"], ["lighting"], ["exterior lighting", "site lighting", "parking lot lighting", "street lighting", "outdoor lighting"]),

  retrofit("high_efficiency_hvac_replacement", "High-efficiency HVAC replacement", "hvac_space_conditioning", true, ["high-efficiency air conditioners", "chillers", "packaged units"], ["hvac_electric_efficiency", "gas_usage_reduction"], ["electric", "gas"], ["hvac"], ["high efficiency hvac", "hvac replacement", "air conditioner", "air conditioning", "chiller", "packaged unit"], true),
  retrofit("heat_pump_hvac_retrofit", "Heat pump HVAC retrofit", "hvac_space_conditioning", true, ["air-source heat pumps", "mini-splits", "ductless heat pumps"], ["hvac_electric_efficiency", "gas_to_electric_replacement"], ["electric", "gas"], ["hvac"], ["heat pump", "mini split", "ductless"]),
  retrofit("smart_thermostat_zoning_retrofit", "Smart thermostat / zoning retrofit", "hvac_space_conditioning", true, ["smart thermostats", "programmable thermostats", "zoning controls"], ["hvac_electric_efficiency", "controls_building_automation"], ["electric", "gas"], ["hvac", "building_controls"], ["smart thermostat", "programmable thermostat", "thermostat", "zoning"]),
  retrofit("hvac_controls_retrofit", "HVAC controls retrofit", "hvac_space_conditioning", true, ["economizers", "sensors", "control sequences", "building management integration"], ["controls_building_automation", "hvac_electric_efficiency"], ["electric", "gas"], ["hvac", "building_controls"], ["hvac controls", "economizer", "control sequence", "building management system"]),
  retrofit("energy_recovery_ventilation_retrofit", "Energy recovery ventilation retrofit", "hvac_space_conditioning", true, ["energy recovery ventilators", "heat recovery ventilators"], ["hvac_electric_efficiency"], ["electric", "gas"], ["hvac"], ["energy recovery ventilation", "heat recovery ventilation", "erv", "hrv"]),
  retrofit("high_efficiency_furnace_retrofit", "High-efficiency furnace retrofit", "hvac_space_conditioning", true, ["high-efficiency furnaces"], ["gas_usage_reduction"], ["gas"], ["hvac"], ["furnace", "high efficiency furnace"]),
  retrofit("high_efficiency_boiler_retrofit", "High-efficiency boiler retrofit", "hvac_space_conditioning", true, ["condensing boilers", "high-efficiency boilers"], ["gas_usage_reduction"], ["gas"], ["hvac"], ["boiler", "condensing boiler", "high efficiency boiler"]),
  retrofit("boiler_controls_burner_retrofit", "Boiler controls / burner retrofit", "hvac_space_conditioning", true, ["burner controls", "oxygen trim", "boiler reset controls"], ["gas_usage_reduction", "controls_building_automation"], ["gas"], ["hvac", "building_controls"], ["boiler controls", "burner", "oxygen trim", "boiler reset"]),
  retrofit("duct_sealing_and_insulation", "Duct sealing and duct insulation", "hvac_space_conditioning", true, ["duct sealing", "duct insulation"], ["hvac_electric_efficiency", "gas_usage_reduction"], ["electric", "gas"], ["hvac", "building_envelope"], ["duct sealing", "duct insulation", "duct leakage"]),
  retrofit("ground_source_geothermal_heat_pump", "Ground-source / geothermal heat pump", "hvac_space_conditioning", true, ["ground-source heat pumps", "geothermal heat pumps"], ["hvac_electric_efficiency"], ["electric"], ["hvac"], ["ground source heat pump", "geothermal heat pump", "geothermal"]),

  retrofit("heat_pump_water_heater", "Heat pump water heater", "water_heating", true, ["heat pump water heaters"], ["gas_to_electric_replacement", "electric_usage_reduction"], ["electric", "gas"], ["hvac", "water_efficiency"], ["heat pump water heater"]),
  retrofit("high_efficiency_gas_water_heater", "High-efficiency gas water heater", "water_heating", true, ["high-efficiency gas water heaters"], ["gas_usage_reduction"], ["gas"], [], ["gas water heater", "high efficiency gas water heater", "condensing water heater"]),
  retrofit("solar_water_heating_system", "Solar water heating system", "water_heating", true, ["solar thermal collectors", "solar hot water systems"], ["solar_electric_offset", "gas_usage_reduction"], ["electric", "gas"], ["solar"], ["solar water heating", "solar hot water", "solar thermal"]),
  retrofit("water_heating_controls_recirculation", "Water-heating controls / recirculation controls", "water_heating", true, ["recirculation controls", "temperature controls"], ["gas_usage_reduction", "electric_usage_reduction"], ["electric", "gas"], ["building_controls"], ["water heating controls", "recirculation controls", "recirculation pump"]),

  retrofit("high_efficiency_refrigeration_equipment", "High-efficiency refrigeration equipment", "refrigeration", true, ["efficient refrigerators", "efficient freezers", "display cases"], ["refrigeration_electric_efficiency"], ["electric"], ["refrigeration"], ["refrigeration", "refrigerator", "freezer", "display case"], true),
  retrofit("walk_in_cooler_freezer_upgrade", "Walk-in cooler/freezer upgrade", "refrigeration", true, ["walk-in coolers", "walk-in freezers", "doors"], ["refrigeration_electric_efficiency"], ["electric"], ["refrigeration"], ["walk in cooler", "walk in freezer", "cooler freezer"]),
  retrofit("refrigeration_controls_retrofit", "Refrigeration controls retrofit", "refrigeration", true, ["case controls", "floating head pressure controls", "vending controls"], ["refrigeration_electric_efficiency", "controls_building_automation"], ["electric"], ["refrigeration", "building_controls"], ["refrigeration controls", "vending machine controls", "floating head pressure"]),
  retrofit("refrigeration_ec_motor_retrofit", "Refrigeration EC motor retrofit", "refrigeration", true, ["EC motors", "evaporator fan motors"], ["refrigeration_electric_efficiency", "motor_vfd_efficiency"], ["electric"], ["refrigeration"], ["ec motor", "electronically commutated motor", "evaporator fan"]),
  retrofit("anti_sweat_heater_controls", "Anti-sweat heater controls", "refrigeration", true, ["anti-sweat heater controls"], ["refrigeration_electric_efficiency"], ["electric"], ["refrigeration"], ["anti sweat heater", "anti-sweat heater"]),
  retrofit("door_gasket_strip_curtain_night_cover", "Door gasket / strip curtain / night cover retrofit", "refrigeration", true, ["door gaskets", "strip curtains", "night covers"], ["refrigeration_electric_efficiency"], ["electric"], ["refrigeration"], ["door gasket", "strip curtain", "night cover"]),
  retrofit("efficient_ice_machine", "Efficient ice machine", "refrigeration", true, ["ENERGY STAR ice machines"], ["refrigeration_electric_efficiency", "water_sewer_reduction"], ["electric", "water"], ["refrigeration", "commercial_kitchen"], ["ice machine"]),

  retrofit("insulation_upgrade", "Insulation upgrade", "building_envelope", true, ["wall insulation", "attic insulation", "roof insulation"], ["envelope_insulation_savings"], ["electric", "gas"], ["building_envelope"], ["insulation"]),
  retrofit("air_sealing_weatherization", "Air sealing / weatherization", "building_envelope", true, ["air sealing", "weatherization"], ["envelope_insulation_savings"], ["electric", "gas"], ["building_envelope"], ["air sealing", "weatherization"]),
  retrofit("window_replacement", "Window replacement", "building_envelope", true, ["high-performance windows"], ["envelope_insulation_savings"], ["electric", "gas"], ["building_envelope"], ["window", "glazing"]),
  retrofit("exterior_door_replacement", "Exterior door replacement", "building_envelope", true, ["high-performance exterior doors"], ["envelope_insulation_savings"], ["electric", "gas"], ["building_envelope"], ["exterior door", "door replacement"]),
  retrofit("cool_roof_reflective_roof", "Cool roof / reflective roof coating", "building_envelope", true, ["cool roofs", "reflective roof coatings"], ["envelope_insulation_savings"], ["electric"], ["building_envelope"], ["cool roof", "reflective roof", "roof coating"]),
  retrofit("window_film_shading_retrofit", "Window film / shading retrofit", "building_envelope", true, ["window film", "solar shades"], ["envelope_insulation_savings"], ["electric"], ["building_envelope"], ["window film", "shading"]),

  retrofit("building_automation_system", "Building automation system", "building_controls_energy_management", true, ["BAS controllers", "sensors", "control sequences"], ["controls_building_automation"], ["electric", "gas"], ["building_controls"], ["building automation", "building automation system", "building management system"]),
  retrofit("energy_management_system", "Energy management system", "building_controls_energy_management", true, ["energy management software", "monitoring controls"], ["controls_building_automation"], ["electric"], ["building_controls"], ["energy management system", "energy management"]),
  retrofit("submetering_energy_monitoring", "Submetering / energy monitoring system", "building_controls_energy_management", true, ["submeters", "meters", "monitoring platforms"], ["controls_building_automation"], ["electric", "gas", "water"], ["building_controls"], ["submetering", "submeter", "energy monitoring", "metering"]),
  retrofit("automated_demand_response_controls", "Automated demand response controls", "building_controls_energy_management", true, ["demand response controls", "load shed controls"], ["controls_building_automation", "demand_response_value"], ["electric"], ["building_controls", "demand_response"], ["automated demand response", "demand response", "load reduction"]),

  retrofit("rooftop_solar_pv", "Rooftop solar PV", "solar_renewable_electricity", true, ["solar PV modules", "inverters", "racking"], ["solar_electric_offset"], ["electric"], ["solar"], ["rooftop solar", "solar photovoltaic", "solar pv", "photovoltaic", "pv system"]),
  retrofit("ground_mounted_solar_pv", "Ground-mounted solar PV", "solar_renewable_electricity", true, ["ground-mounted PV arrays"], ["solar_electric_offset"], ["electric"], ["solar"], ["ground mounted solar", "ground mount solar"]),
  retrofit("solar_carport", "Solar carport", "solar_renewable_electricity", true, ["solar carports", "canopies"], ["solar_electric_offset"], ["electric"], ["solar"], ["solar carport", "solar canopy"]),
  retrofit("community_solar_subscription", "Community solar subscription", "solar_renewable_electricity", false, ["community solar subscriptions"], ["renewable_generation_credit_market_value"], ["electric"], ["solar"], ["community solar"]),
  retrofit("small_wind_turbine", "Small wind turbine", "solar_renewable_electricity", true, ["small wind turbines"], ["renewable_generation_credit_market_value"], ["electric"], [], ["small wind", "wind turbine"]),
  retrofit("fuel_cell_system", "Fuel cell system", "solar_renewable_electricity", true, ["fuel cells"], ["project_cost_reduction_only"], ["electric", "gas"], [], ["fuel cell"]),
  retrofit("combined_heat_and_power_system", "Combined heat and power system", "solar_renewable_electricity", true, ["CHP systems"], ["gas_usage_reduction", "electric_usage_reduction"], ["electric", "gas"], [], ["combined heat and power", "chp", "cogeneration"]),
  retrofit("biomass_biogas_energy_system", "Biomass / biogas energy system", "solar_renewable_electricity", true, ["biomass systems", "biogas systems"], ["renewable_generation_credit_market_value"], ["electric", "gas"], [], ["biomass", "biogas"]),

  retrofit("battery_storage_system", "Battery storage system", "energy_storage_resilience", true, ["battery storage systems", "inverters"], ["battery_tou_demand_savings"], ["electric"], ["battery_storage"], ["battery storage", "energy storage", "storage system"], true),
  retrofit("solar_plus_storage_system", "Solar-plus-storage system", "energy_storage_resilience", true, ["solar PV", "battery storage"], ["solar_electric_offset", "battery_tou_demand_savings"], ["electric"], ["solar", "battery_storage"], ["solar plus storage", "solar and storage"]),
  retrofit("thermal_energy_storage", "Thermal energy storage", "energy_storage_resilience", true, ["thermal storage tanks", "ice storage"], ["hvac_electric_efficiency", "battery_tou_demand_savings"], ["electric"], ["battery_storage", "hvac"], ["thermal energy storage", "ice storage"]),
  retrofit("microgrid_system", "Microgrid system", "energy_storage_resilience", true, ["microgrid controls", "distributed generation", "storage"], ["battery_tou_demand_savings", "controls_building_automation"], ["electric"], ["battery_storage", "solar", "building_controls"], ["microgrid"]),
  retrofit("resilience_backup_power_system", "Resilience / backup power system", "energy_storage_resilience", true, ["backup batteries", "resilience systems"], ["battery_tou_demand_savings"], ["electric"], ["battery_storage"], ["backup power", "resilience"]),

  retrofit("ev_charger_installation", "EV charger installation", "ev_charging_transportation", true, ["EVSE", "charging stations", "site electrical work"], ["ev_charging_site_load"], ["electric"], ["ev_charging"], ["ev charger", "ev charging", "charging station", "electric vehicle charging", "evse"], true),
  retrofit("level_2_ev_charger_installation", "Level 2 EV charger installation", "ev_charging_transportation", true, ["Level 2 EVSE", "charging stations"], ["ev_charging_site_load"], ["electric"], ["ev_charging"], ["level 2", "level-2", "level ii"]),
  retrofit("dc_fast_charger_installation", "DC fast charger installation", "ev_charging_transportation", true, ["DC fast chargers"], ["ev_charging_site_load"], ["electric"], ["ev_charging"], ["dc fast", "fast charger", "dcfc"]),
  retrofit("fleet_charging_infrastructure", "Fleet charging infrastructure", "ev_charging_transportation", true, ["fleet chargers", "depot charging"], ["ev_charging_site_load"], ["electric"], ["ev_charging", "fleet_electrification"], ["fleet charging", "depot charging", "power your drive for fleets"]),
  retrofit("ev_make_ready_electrical_upgrade", "EV make-ready electrical upgrade", "ev_charging_transportation", true, ["panels", "conduit", "transformer upgrades", "make-ready infrastructure"], ["ev_charging_site_load"], ["electric"], ["ev_charging"], ["make ready", "make-ready", "electrical upgrade"]),
  retrofit("electric_vehicle_purchase", "Electric vehicle purchase", "ev_charging_transportation", false, ["electric vehicles"], ["project_cost_reduction_only"], ["electric", "fuel"], ["fleet_electrification"], ["electric vehicle purchase", "clean vehicle", "zero emission vehicle"]),
  retrofit("electric_forklift_material_handling", "Electric forklift / material handling equipment", "ev_charging_transportation", true, ["electric forklifts", "material handling equipment"], ["fleet_electrification"], ["electric"], ["fleet_electrification"], ["electric forklift", "material handling"]),
  retrofit("fleet_telematics_charging_management", "Fleet telematics / charging management system", "ev_charging_transportation", true, ["fleet telematics", "charging management software"], ["ev_charging_site_load", "controls_building_automation"], ["electric"], ["ev_charging", "fleet_electrification"], ["fleet telematics", "charging management"]),

  retrofit("low_flow_fixture_retrofit", "Low-flow fixture retrofit", "water_efficiency", true, ["low-flow faucets", "aerators", "showerheads"], ["water_sewer_reduction"], ["water"], ["water_efficiency"], ["low flow", "fixture", "aerator", "showerhead"]),
  retrofit("high_efficiency_toilet_urinal", "High-efficiency toilet / urinal replacement", "water_efficiency", true, ["toilets", "urinals"], ["water_sewer_reduction"], ["water"], ["water_efficiency"], ["toilet", "urinal"]),
  retrofit("smart_irrigation_controller", "Smart irrigation controller", "water_efficiency", true, ["smart irrigation controllers", "weather-based controllers"], ["water_sewer_reduction"], ["water"], ["water_efficiency"], ["smart irrigation", "irrigation controller", "weather based controller"]),
  retrofit("efficient_irrigation_retrofit", "Drip irrigation / efficient irrigation retrofit", "water_efficiency", true, ["drip irrigation", "efficient irrigation hardware"], ["water_sewer_reduction"], ["water"], ["water_efficiency"], ["drip irrigation", "efficient irrigation"]),
  retrofit("leak_detection_system", "Leak detection system", "water_efficiency", true, ["leak detection sensors", "monitoring systems"], ["water_sewer_reduction"], ["water"], ["water_efficiency"], ["leak detection"]),
  retrofit("high_efficiency_laundry_equipment", "High-efficiency laundry equipment", "water_efficiency", true, ["clothes washers", "laundry equipment"], ["water_sewer_reduction", "electric_usage_reduction"], ["water", "electric", "gas"], ["water_efficiency"], ["clothes washer", "laundry"]),
  retrofit("cooling_tower_controls_optimization", "Cooling tower controls / optimization", "water_efficiency", true, ["cooling tower controls", "conductivity controls"], ["water_sewer_reduction", "hvac_electric_efficiency"], ["water", "electric"], ["water_efficiency", "hvac", "building_controls"], ["cooling tower"]),

  retrofit("high_efficiency_commercial_dishwasher", "High-efficiency commercial dishwasher", "commercial_kitchen_foodservice", true, ["commercial dishwashers"], ["commercial_kitchen_equipment_efficiency", "water_sewer_reduction"], ["electric", "gas", "water"], ["commercial_kitchen", "water_efficiency"], ["commercial dishwasher", "dishwasher"]),
  retrofit("high_efficiency_fryer", "High-efficiency fryer", "commercial_kitchen_foodservice", true, ["high-efficiency fryers"], ["commercial_kitchen_equipment_efficiency", "gas_usage_reduction"], ["gas", "electric"], ["commercial_kitchen"], ["fryer"]),
  retrofit("high_efficiency_oven", "High-efficiency oven", "commercial_kitchen_foodservice", true, ["ovens", "convection ovens"], ["commercial_kitchen_equipment_efficiency"], ["gas", "electric"], ["commercial_kitchen"], ["oven"]),
  retrofit("high_efficiency_steamer", "High-efficiency steamer", "commercial_kitchen_foodservice", true, ["steamers"], ["commercial_kitchen_equipment_efficiency", "water_sewer_reduction"], ["gas", "electric", "water"], ["commercial_kitchen"], ["steamer"]),
  retrofit("induction_cooking_equipment", "Induction cooking equipment", "commercial_kitchen_foodservice", true, ["induction ranges", "induction cooktops"], ["gas_to_electric_replacement", "commercial_kitchen_equipment_efficiency"], ["electric", "gas"], ["commercial_kitchen"], ["induction"]),
  retrofit("demand_controlled_kitchen_ventilation", "Demand-controlled kitchen ventilation", "commercial_kitchen_foodservice", true, ["kitchen hood controls", "DCV systems"], ["commercial_kitchen_equipment_efficiency", "controls_building_automation"], ["electric", "gas"], ["commercial_kitchen", "building_controls"], ["demand controlled kitchen ventilation", "kitchen ventilation", "hood controls"]),

  retrofit("high_efficiency_motor_replacement", "High-efficiency motor replacement", "motors_pumps_fans_drives", true, ["premium-efficiency motors"], ["motor_vfd_efficiency"], ["electric"], [], ["high efficiency motor", "motor replacement"]),
  retrofit("variable_frequency_drive_retrofit", "Variable frequency drive retrofit", "motors_pumps_fans_drives", true, ["VFDs", "variable speed drives"], ["motor_vfd_efficiency"], ["electric"], [], ["variable frequency drive", "vfd", "variable speed drive"]),
  retrofit("efficient_pump_replacement", "Efficient pump replacement", "motors_pumps_fans_drives", true, ["efficient pumps"], ["motor_vfd_efficiency"], ["electric"], [], ["pump replacement", "efficient pump"]),
  retrofit("efficient_fan_blower_replacement", "Efficient fan/blower replacement", "motors_pumps_fans_drives", true, ["efficient fans", "efficient blowers"], ["motor_vfd_efficiency"], ["electric"], ["hvac"], ["fan replacement", "efficient fan", "blower"]),
  retrofit("pump_fan_controls_retrofit", "Pump/fan controls retrofit", "motors_pumps_fans_drives", true, ["pump controls", "fan controls"], ["motor_vfd_efficiency", "controls_building_automation"], ["electric"], ["building_controls"], ["pump controls", "fan controls"]),

  retrofit("efficient_air_compressor", "Efficient air compressor", "compressed_air_industrial", true, ["efficient air compressors"], ["electric_usage_reduction"], ["electric"], [], ["air compressor", "compressed air compressor"]),
  retrofit("compressed_air_leak_repair", "Compressed air leak repair", "compressed_air_industrial", true, ["compressed air leak repairs"], ["electric_usage_reduction"], ["electric"], [], ["compressed air leak", "air leak repair"]),
  retrofit("compressed_air_controls", "Compressed air controls", "compressed_air_industrial", true, ["compressed air controls"], ["controls_building_automation", "electric_usage_reduction"], ["electric"], ["building_controls"], ["compressed air controls"]),
  retrofit("waste_heat_recovery", "Waste heat recovery", "compressed_air_industrial", true, ["heat recovery systems"], ["gas_usage_reduction", "electric_usage_reduction"], ["electric", "gas"], [], ["waste heat recovery", "heat recovery"]),
  retrofit("industrial_heat_pump", "Industrial heat pump", "compressed_air_industrial", true, ["industrial heat pumps"], ["gas_to_electric_replacement"], ["electric", "gas"], ["hvac"], ["industrial heat pump"]),
  retrofit("process_electrification_equipment", "Process electrification equipment", "compressed_air_industrial", true, ["electric process equipment"], ["gas_to_electric_replacement"], ["electric", "gas"], [], ["process electrification", "electrification equipment"]),
  retrofit("steam_trap_replacement", "Steam trap replacement", "compressed_air_industrial", true, ["steam traps"], ["gas_usage_reduction"], ["gas"], [], ["steam trap"]),

  retrofit("efficient_ventilation_system", "Efficient ventilation system", "indoor_air_quality_ventilation", true, ["efficient fans", "ventilation systems"], ["hvac_electric_efficiency"], ["electric"], ["hvac"], ["efficient ventilation", "ventilation system"]),
  retrofit("air_filtration_system", "Air filtration system", "indoor_air_quality_ventilation", true, ["filtration systems", "filters"], ["project_cost_reduction_only"], ["electric"], ["hvac"], ["air filtration", "filtration"]),
  retrofit("demand_controlled_ventilation", "Demand-controlled ventilation", "indoor_air_quality_ventilation", true, ["CO2 sensors", "ventilation controls"], ["hvac_electric_efficiency", "controls_building_automation"], ["electric"], ["hvac", "building_controls"], ["demand controlled ventilation", "dcv"]),

  retrofit("energy_audit", "Energy audit", "audits_studies_planning", false, ["energy audits"], ["program_rule_value_only"], [], [], ["energy audit", "audit"], true),
  retrofit("water_audit", "Water audit", "audits_studies_planning", false, ["water audits"], ["program_rule_value_only"], [], ["water_efficiency"], ["water audit"]),
  retrofit("retro_commissioning_study", "Retro-commissioning study", "audits_studies_planning", false, ["retro-commissioning studies"], ["controls_building_automation"], ["electric", "gas"], ["building_controls"], ["retro commissioning", "retro-commissioning", "commissioning"]),
  retrofit("engineering_feasibility_study", "Engineering feasibility study", "audits_studies_planning", false, ["engineering studies", "feasibility studies"], ["program_rule_value_only"], [], [], ["feasibility study", "engineering study"]),
  retrofit("solar_feasibility_study", "Solar feasibility study", "audits_studies_planning", false, ["solar feasibility studies"], ["program_rule_value_only"], [], ["solar"], ["solar feasibility"]),
  retrofit("ev_charging_site_assessment", "EV charging site assessment", "audits_studies_planning", false, ["EV site assessments"], ["program_rule_value_only"], [], ["ev_charging"], ["ev charging site assessment", "site assessment"]),

  retrofit("energy_star_certification", "ENERGY STAR certification", "certifications_compliance", false, ["ENERGY STAR certification"], ["program_rule_value_only"], [], [], ["energy star certification"]),
  retrofit("leed_certification", "LEED certification", "certifications_compliance", false, ["LEED certification"], ["program_rule_value_only"], [], [], ["leed"]),
  retrofit("building_benchmarking_compliance", "Building benchmarking compliance", "certifications_compliance", false, ["benchmarking compliance"], ["program_rule_value_only"], [], [], ["benchmarking"])
];

export const RETROFIT_TYPES_BY_ID = Object.fromEntries(RETROFIT_TYPES.map((type) => [type.retrofitTypeId, type]));

export function classifyRetrofitsForOpportunity(opportunity, matchProfile) {
  const normalizedText = buildOpportunityRetrofitText(opportunity);
  const technologyIds = new Set([
    ...asArray(matchProfile?.project?.technologyIds),
    ...asArray(matchProfile?.offers).flatMap((offer) => asArray(offer?.technologies))
  ]);
  const matches = [];

  for (const type of RETROFIT_TYPES) {
    const matchedTerms = type.aliases.filter((alias) => phraseMatches(normalizedText, alias));
    const technologyFallback = type.defaultForTechnology && type.canonicalTechnologyIds.some((technologyId) => technologyIds.has(technologyId));
    if (matchedTerms.length === 0 && !technologyFallback) continue;

    matches.push({
      retrofitTypeId: type.retrofitTypeId,
      displayName: type.displayName,
      parentCategory: type.parentCategory,
      isPhysicalRetrofit: type.isPhysicalRetrofit,
      confidence: matchedTerms.length > 0 ? 0.86 : 0.68,
      matchBasis: matchedTerms.length > 0 ? "text_or_source_technology" : "canonical_technology_fallback",
      matchedTerms: matchedTerms.slice(0, 5)
    });
  }

  return uniqueBy(matches, (match) => match.retrofitTypeId).sort((a, b) => taxonomyOrder(a.retrofitTypeId) - taxonomyOrder(b.retrofitTypeId));
}

export function buildRetrofitOpportunityIndex(opportunityProfiles) {
  const rowsByRetrofit = new Map(RETROFIT_TYPES.map((type) => [type.retrofitTypeId, { ...type, opportunities: [] }]));

  for (const { opportunity, matchProfile } of opportunityProfiles) {
    for (const match of classifyRetrofitsForOpportunity(opportunity, matchProfile)) {
      rowsByRetrofit.get(match.retrofitTypeId)?.opportunities.push({
        opportunityId: opportunity.opportunityId,
        opportunityName: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
        sourceName: opportunity.sourceName || opportunity.sourceKey || null,
        sourceUrl: opportunity.sourceUrl || null,
        websiteUrl: opportunity.websiteUrl || null,
        applicationUrl: opportunity.applicationUrl || null,
        state: opportunity.state || null,
        programType: opportunity.programType || null,
        administrator: opportunity.administrator || null,
        confidence: match.confidence,
        matchBasis: match.matchBasis,
        matchedTerms: match.matchedTerms
      });
    }
  }

  return [...rowsByRetrofit.values()]
    .filter((row) => row.opportunities.length > 0)
    .map((row) => ({
      retrofitTypeId: row.retrofitTypeId,
      displayName: row.displayName,
      parentCategory: row.parentCategory,
      isPhysicalRetrofit: row.isPhysicalRetrofit,
      typicalComponents: row.typicalComponents,
      relatedSavingsModels: row.relatedSavingsModels,
      typicalBillTypes: row.typicalBillTypes,
      opportunityCount: row.opportunities.length,
      opportunities: row.opportunities.sort((a, b) => String(a.opportunityName).localeCompare(String(b.opportunityName)))
    }));
}

function retrofit(
  retrofitTypeId,
  displayName,
  parentCategory,
  isPhysicalRetrofit,
  typicalComponents,
  relatedSavingsModels,
  typicalBillTypes,
  canonicalTechnologyIds,
  aliases,
  defaultForTechnology = false
) {
  return {
    retrofitTypeId,
    displayName,
    parentCategory,
    isPhysicalRetrofit,
    typicalComponents,
    relatedSavingsModels,
    typicalBillTypes,
    canonicalTechnologyIds,
    aliases,
    defaultForTechnology
  };
}

function buildOpportunityRetrofitText(opportunity) {
  return normalizeText(
    [
      opportunity?.canonicalTitle,
      opportunity?.normalizedTitle,
      opportunity?.summary,
      opportunity?.summaryHtml,
      opportunity?.category,
      opportunity?.programType,
      opportunity?.administrator,
      JSON.stringify(opportunity?.technologies || null),
      JSON.stringify(opportunity?.technologyRecords || null),
      JSON.stringify(opportunity?.parameterSets || null),
      JSON.stringify(opportunity?.details || null),
      JSON.stringify(opportunity?.matchingParameters || null),
      JSON.stringify(opportunity?.evidence || null),
      JSON.stringify(opportunity?.cec || null),
      JSON.stringify(opportunity?.sce || null),
      JSON.stringify(opportunity?.sdge || null),
      JSON.stringify(opportunity?.svp || null)
    ].filter(Boolean).join(" ")
  );
}

function phraseMatches(normalizedText, phrase) {
  const normalizedPhrase = normalizeText(phrase);
  if (!normalizedText || !normalizedPhrase) return false;
  return ` ${normalizedText} `.includes(` ${normalizedPhrase} `);
}

function taxonomyOrder(retrofitTypeId) {
  const index = RETROFIT_TYPES.findIndex((type) => type.retrofitTypeId === retrofitTypeId);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function uniqueBy(values, keyFn) {
  const seen = new Set();
  const results = [];
  for (const value of values) {
    const key = keyFn(value);
    if (seen.has(key)) continue;
    seen.add(key);
    results.push(value);
  }
  return results;
}
