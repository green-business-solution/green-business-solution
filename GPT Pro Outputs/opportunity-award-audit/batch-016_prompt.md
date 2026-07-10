# GPT Pro Opportunity Award Audit Prompt

You are auditing one batch of unique Retrofit opportunities for official program approval process and award likelihood.
Return strict JSON only. No markdown, prose, or explanations outside JSON.
Do not infer eligibility from title text alone.
Use current official program sources as the evidence base and ignore outdated pages when they conflict.
Use `unknown` where evidence is insufficient and do not guess.
Do not lower award likelihood because a source says "optional" user action or "follow instructions" steps exist.
Treat those instructions as operational conditions that may still keep the opportunity likely to be awarded.
Do not include any confidence score field.

Output object requirements:

- Return one JSON object only.
- Top-level object:
  - `schemaVersion`: `opportunity-award-audit-output.v1`
  - `batchId`: current batch id
  - `inputFile`: current input file name
  - `inputRecordCount`: integer
  - `generatedAt`: ISO timestamp
  - `reviews`: array of exactly one object per audited opportunity
- Each `review` object must include:
  - opportunityId
  - requiresProgramApproval
  - approvalRequirements
  - approvalStage
  - awardLikelihood
  - awardLikelihoodReason
  - evidenceUrls
  - evidenceText
  - reviewedAt
  - reviewStatus
- `approvalRequirements` and `evidenceUrls` must be arrays.
- `awardLikelihood` must be one of:
  - `near_guaranteed`, `likely`, `possible`, `unlikely`, `rare`, `unknown`
- `reviewStatus` must be one of:
  - `audited`, `source_inaccessible`, `not_audited`, `needs_followup`, `needs_evidence`
- `reviewedAt` must be ISO 8601 date-time.

Input file: batch-016_input.json
Output file to write: batch-016_output.json
Schema file: GPT Pro Outputs/opportunity-award-audit/opportunity-award-audit-schema.json
Batch 16 of 61
This batch has 25 opportunities, positions 376-400.

Use current official sources for evidence and include evidence URLs only as plain raw URLs.
`evidenceText` should be concise and non-URL text.

Targets JSON:
```json
[
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:data-center-program",
    "opportunityName": "Data Center Program",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41504/638881794790570000",
    "state": "CA",
    "programType": "rebate",
    "administrator": "Silicon Valley Power",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22229",
    "opportunityName": "DC Fast Charging and Hydrogen Fueling Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22229/dc-fast-charging-and-hydrogen-fueling-grant-program",
    "websiteUrl": "https://gis.dep.pa.gov/DrivingPAForward/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Grant Program",
    "administrator": "Department of Environmental Protection",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22793",
    "opportunityName": "Decarbonizing Public Schools Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22793/decarbonizing-public-schools-program",
    "websiteUrl": "https://energy.maryland.gov/Pages/SchoolDecarbonization.aspx",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Grant Program",
    "administrator": "Maryland Energy Administration in partnership with the Interagency Commission on School Construction",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1158",
    "opportunityName": "Deduction For Energy-Conserving Investment",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1158/deduction-for-energy-conserving-investment",
    "websiteUrl": "https://mtrevenue.gov/publications/montana-form-cit-instructions/",
    "applicationUrl": null,
    "state": "MT",
    "programType": "Corporate Tax Deduction",
    "administrator": "Montana Department of Revenue",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22165",
    "opportunityName": "Delaware Clean Vehicle Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22165/delaware-clean-vehicle-rebate-program",
    "websiteUrl": "https://dnrec.alpha.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "electric_vehicle_purchase",
        "displayName": "Electric vehicle purchase",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22304",
    "opportunityName": "Delaware Electric Cooperative - Beat the Peak With Electric Vehicles",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22304/delaware-electric-cooperative-beat-the-peak-with-electric-vehicles",
    "websiteUrl": "https://www.delaware.coop/btp",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Rebate Program",
    "administrator": "Delaware Electric Cooperative",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4386",
    "opportunityName": "Delaware Electric Cooperative - Green Energy Program Incentives",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4386/delaware-electric-cooperative-green-energy-program-incentives",
    "websiteUrl": "https://solargrantdelaware.com/",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Rebate Program",
    "administrator": "Energize Delaware",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22319",
    "opportunityName": "Delmarva - EVsmart",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22319/delmarva-evsmart",
    "websiteUrl": "https://www.delmarva.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Rebate Program",
    "administrator": "Delmarva",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ev_make_ready_electrical_upgrade",
        "displayName": "EV make-ready electrical upgrade",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3733",
    "opportunityName": "Delmarva Power - Commercial and Industrial Energy Savings Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3733/delmarva-power-commercial-and-industrial-energy-savings-program",
    "websiteUrl": "https://homeenergysavings.delmarva.com/md/business/overview",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Rebate Program",
    "administrator": "Delmarva",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:630",
    "opportunityName": "Delmarva Power - Green Energy Program Incentives",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/630/delmarva-power-green-energy-program-incentives",
    "websiteUrl": "https://dnrec.alpha.delaware.gov/energy-climate/renewable/assistance/",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Rebate Program",
    "administrator": "Delaware Department of Natural Resources and Environmental Control",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "small_wind_turbine",
        "displayName": "Small wind turbine",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4504",
    "opportunityName": "Delmarva Power - Home Performance with ENERGY STAR Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4504/delmarva-power-home-performance-with-energy-star-incentive-program",
    "websiteUrl": "http://homeenergysavings.delmarva.com/home-performance-with-energy-star-program",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Rebate Program",
    "administrator": "Delmarva",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3744",
    "opportunityName": "Delmarva Power - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3744/delmarva-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.delmarva.com/WaysToSave/ForYourHome/Pages/MD/RebatesAndDiscounts.aspx",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Rebate Program",
    "administrator": "Delmarva",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3580",
    "opportunityName": "Delta-Montrose Electric Association - Residential Weatherization Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3580/delta-montrose-electric-association-residential-weatherization-rebate-program",
    "websiteUrl": "https://dmea.com/free-home-weatherization",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": "Delta-Montrose Electric Association",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:demand-response-aggregator-options",
    "opportunityName": "Demand Response Aggregator Options",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
    "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
    "applicationUrl": "https://www.sce.com/business/savings-incentives/demand-response/demand-responces-aggregator",
    "state": "CA",
    "programType": "demand_response",
    "administrator": "Southern California Edison",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_13556",
    "opportunityName": "Demand Response Programs",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/savings-center/business-winter-savings-safety-and-solutions",
    "websiteUrl": "https://www.sdge.com/node/13556",
    "applicationUrl": "https://www.sdge.com/node/13556",
    "state": "CA",
    "programType": "demand_response",
    "administrator": "SDG&E",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22443",
    "opportunityName": "DEMEC Member Utilities - Efficiency Smart Residential Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22443/demec-member-utilities-efficiency-smart-residential-program",
    "websiteUrl": "http://www.efficiencysmart.org/",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4387",
    "opportunityName": "DEMEC Member Utilities - Green Energy Program Incentives",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4387/demec-member-utilities-green-energy-program-incentives",
    "websiteUrl": "https://www.demecinc.net/member-energy-grants/",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Rebate Program",
    "administrator": "Delaware Department of Natural Resources and Environmental Control",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "small_wind_turbine",
        "displayName": "Small wind turbine",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 8
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2039",
    "opportunityName": "Denton Municipal Electric - Residential GreenSense Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2039/denton-municipal-electric-residential-greensense-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cityofdenton.com/1192/Sustainability-Incentives",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Denton Municipal Electric",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5809",
    "opportunityName": "DHCD- Multifamily Energy Efficiency and Housing Affordability Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5809/dhcd-multifamily-energy-efficiency-and-housing-affordability-program",
    "websiteUrl": "https://dhcd.maryland.gov/Energy-Home-Repair/Pages/Multifamily-Energy-Program/MEEHA.aspx",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Loan Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4206",
    "opportunityName": "District of Columbia Property Assessed Clean Energy Financing",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4206/district-of-columbia-property-assessed-clean-energy-financing",
    "websiteUrl": "https://dcgreenbank.com/pace/",
    "applicationUrl": null,
    "state": "DC",
    "programType": "PACE Financing",
    "administrator": "Department of the Environment",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4828",
    "opportunityName": "Diverse Power - Energy Efficient Existing Homes Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4828/diverse-power-energy-efficient-existing-homes-rebate-program",
    "websiteUrl": "http://www.diversepower.com/energy-tools/rebates/",
    "applicationUrl": null,
    "state": "GA",
    "programType": "Rebate Program",
    "administrator": "Diverse Power",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "efficient_pump_replacement",
        "displayName": "Efficient pump replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2266",
    "opportunityName": "Diverse Power - Energy Efficient New Construction Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2266/diverse-power-energy-efficient-new-construction-rebate-programs",
    "websiteUrl": "http://www.diversepower.com/energy-tools/rebates/",
    "applicationUrl": null,
    "state": "GA",
    "programType": "Rebate Program",
    "administrator": "Diverse Power",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1968",
    "opportunityName": "Dixie Electric Cooperative - Residential Energy Efficiency Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1968/dixie-electric-cooperative-residential-energy-efficiency-loan-program",
    "websiteUrl": "http://www.dixie.coop/content.cfm?id=2049&download_id=59#attached_content",
    "applicationUrl": null,
    "state": "AL",
    "programType": "Loan Program",
    "administrator": "Dixie Electric Cooperative",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1970",
    "opportunityName": "Dixie Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1970/dixie-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.dixie.coop/content.cfm?id=2049&download_id=58#attached_content",
    "applicationUrl": null,
    "state": "AL",
    "programType": "Rebate Program",
    "administrator": "Dixie Electric Cooperative",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:214",
    "opportunityName": "Dollar and Energy Savings Loans",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/214/dollar-and-energy-savings-loans",
    "websiteUrl": "https://dee.nebraska.gov/state-energy-information/dollar-energy-saving-loans",
    "applicationUrl": null,
    "state": "NE",
    "programType": "Loan Program",
    "administrator": "Nebraska Energy Office",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 2
  }
]
```

