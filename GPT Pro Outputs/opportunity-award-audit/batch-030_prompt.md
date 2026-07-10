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

Input file: batch-030_input.json
Output file to write: batch-030_output.json
Schema file: GPT Pro Outputs/opportunity-award-audit/opportunity-award-audit-schema.json
Batch 30 of 61
This batch has 25 opportunities, positions 726-750.

Use current official sources for evidence and include evidence URLs only as plain raw URLs.
`evidenceText` should be concise and non-URL text.

Targets JSON:
```json
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22120",
    "opportunityName": "Lakeland Electric - Residential Energy Efficiency Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22120/lakeland-electric-residential-energy-efficiency-loan-program",
    "websiteUrl": "https://lakelandelectric.com/programs-and-services/energy?tab=tabrebate",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Loan Program",
    "administrator": "Lakeland Electric",
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
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22567",
    "opportunityName": "Lane Electric - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22567/lane-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://laneelectric.com/programs-services/energy-efficiency/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Lane Electric Cooperative",
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
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2469",
    "opportunityName": "Lane Electric Cooperative - Commercial/Residential Weatherization & Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2469/lane-electric-cooperative-commercial-residential-weatherization-and-energy-efficiency-program",
    "websiteUrl": "https://laneelectric.com/programs-services/current-programs/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Grant Program",
    "administrator": "Lane Electric Cooperative",
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
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2467",
    "opportunityName": "Lane Electric Cooperative - Heat Pump Rebate/Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2467/lane-electric-cooperative-heat-pump-rebate-loan-program",
    "websiteUrl": "https://laneelectric.com/programs-services/current-programs/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Lane Electric Cooperative",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2470",
    "opportunityName": "Lane Electric Cooperative - Residential Weatherization Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2470/lane-electric-cooperative-residential-weatherization-programs",
    "websiteUrl": "http://www.laneelectric.com/conservation-renewables/weatherization-programs/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Loan Program",
    "administrator": "Lane Electric Cooperative",
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
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4754",
    "opportunityName": "Lansing Board of Water & Light - Hometown Energy Savers Commercial Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4754/lansing-board-of-water-and-light-hometown-energy-savers-commercial-rebates",
    "websiteUrl": "http://www.lbwl.com/EnergySavers",
    "applicationUrl": null,
    "state": "MI",
    "programType": "Rebate Program",
    "administrator": "Lansing Board of Water & Light",
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
        "retrofitTypeId": "leak_detection_system",
        "displayName": "Leak detection system",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "compressed_air_leak_repair",
        "displayName": "Compressed air leak repair",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4755",
    "opportunityName": "Lansing Board of Water & Light - Residential Energy Efficiency Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4755/lansing-board-of-water-and-light-residential-energy-efficiency-rebates",
    "websiteUrl": "https://www.lbwl.com/energysavers?availability=Homeowners",
    "applicationUrl": null,
    "state": "MI",
    "programType": "Rebate Program",
    "administrator": "Lansing Board of Water & Light",
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
      },
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 10
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22332",
    "opportunityName": "Lansing Board of Water and Light - Plug-in Electric Vehicle Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22332/lansing-board-of-water-and-light-plug-in-electric-vehicle-rebates",
    "websiteUrl": "https://www.lbwl.com/customers/save-money-energy/plug-electric-vehicles-pev",
    "applicationUrl": null,
    "state": "MI",
    "programType": "Rebate Program",
    "administrator": "Lansing Board of Water and Light",
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5568",
    "opportunityName": "Large Energy Users Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5568/large-energy-users-program",
    "websiteUrl": "https://www.njcleanenergy.com/LEUP",
    "applicationUrl": null,
    "state": "NJ",
    "programType": "Rebate Program",
    "administrator": "New Jersey Clean Energy Program (NJCEP)",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:180",
    "opportunityName": "Large Scale Renewable Energy Property Tax Abatement (Nevada State Office of Energy)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/180/large-scale-renewable-energy-property-tax-abatement-nevada-state-office-of-energy",
    "websiteUrl": "http://energy.nv.gov/Programs/Renewable_Energy_Tax_Abatements/",
    "applicationUrl": null,
    "state": "NV",
    "programType": "Property Tax Incentive",
    "administrator": "Nevada State Office of Energy",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1718",
    "opportunityName": "Lassen Municipal Utility District - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1718/lassen-municipal-utility-district-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lmud.org/customer-services/rebates-solar/residential-rebates/",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Public Benefits Specialist",
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
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
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
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 9
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
    "opportunityName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22770/leading-by-example-restoration-grant-for-solar-pv-and-decarbonized-systems",
    "websiteUrl": "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Grant Program",
    "administrator": "Massachusetts Department of Energy Resources",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22772",
    "opportunityName": "Leading by Example Solar-Decarbonization Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22772/leading-by-example-solar-decarbonization-grant-program",
    "websiteUrl": "https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Grant Program",
    "administrator": "Massachusetts Department of Energy Resources",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
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
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5543",
    "opportunityName": "Lean and Green Michigan PACE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5543/lean-and-green-michigan-pace",
    "websiteUrl": "https://leanandgreenmi.com/about-pace/how-pace-works/",
    "applicationUrl": null,
    "state": "MI",
    "programType": "PACE Financing",
    "administrator": "Levin Energy Partners",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22230",
    "opportunityName": "Level 2 EV Charging Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22230/level-2-ev-charging-rebate-program",
    "websiteUrl": "https://gis.dep.pa.gov/DrivingPAForward/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Rebate Program",
    "administrator": "Department of Environmental Protection",
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2207",
    "opportunityName": "Lewis County PUD - Commercial and Industrial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2207/lewis-county-pud-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lcpud.org/save-energy/commercial-industrial/",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": "PUD No.1 of Lewis County",
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
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
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
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5759",
    "opportunityName": "Lewis County PUD - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5759/lewis-county-pud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lcpud.org/energy-efficiency/rebates/residential/",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": null,
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
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
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
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3637",
    "opportunityName": "Liberty Utilities - Commercial & Industrial Energy Efficiency Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3637/liberty-utilities-commercial-and-industrial-energy-efficiency-rebates",
    "websiteUrl": "https://central.libertyutilities.com/all/residential/ways-to-save/arkansas-electric-commercial-industrial-program.html",
    "applicationUrl": null,
    "state": "AR",
    "programType": "Rebate Program",
    "administrator": "Liberty Utilities",
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
        "retrofitTypeId": "hvac_controls_retrofit",
        "displayName": "HVAC controls retrofit",
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
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "door_gasket_strip_curtain_night_cover",
        "displayName": "Door gasket / strip curtain / night cover retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 13
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5368",
    "opportunityName": "Liberty Utilities - Residential and Small Business Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5368/liberty-utilities-residential-and-small-business-energy-efficiency-rebate-program",
    "websiteUrl": "https://missouri.libertyutilities.com/malden/residential/ways-to-save/natural-gas/index.html",
    "applicationUrl": null,
    "state": "MO",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
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
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
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
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1394",
    "opportunityName": "Liberty Utilities (Electric) - Commercial Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1394/liberty-utilities-electric-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://new-hampshire.libertyutilities.com/acworth/commercial/smart-energy-use/electric/electric-programs.html",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Rebate Program",
    "administrator": null,
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1392",
    "opportunityName": "Liberty Utilities (Electric) - Residential Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1392/liberty-utilities-electric-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://new-hampshire.libertyutilities.com/acworth/residential/smart-energy-use/electric/index.html",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Rebate Program",
    "administrator": null,
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
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 9
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1406",
    "opportunityName": "Liberty Utilities (Gas) - Commercial Energy Efficiency Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1406/liberty-utilities-gas-commercial-energy-efficiency-programs",
    "websiteUrl": "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "boiler_controls_burner_retrofit",
        "displayName": "Boiler controls / burner retrofit",
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
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22080",
    "opportunityName": "Liberty Utilities (Gas) - Residential Energy Efficiency Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22080/liberty-utilities-gas-residential-energy-efficiency-programs",
    "websiteUrl": "https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
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
        "retrofitTypeId": "high_efficiency_gas_water_heater",
        "displayName": "High-efficiency gas water heater",
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4569",
    "opportunityName": "Liberty Utilities Iowa - High Efficiency Equipment Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4569/liberty-utilities-iowa-high-efficiency-equipment-rebate",
    "websiteUrl": "https://iowa.libertyutilities.com/keokuk/residential/smart-energy-use/natural-gas/high-efficiency-equipment-rebate.html",
    "applicationUrl": null,
    "state": "IA",
    "programType": "Rebate Program",
    "administrator": "Liberty Utilities",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
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
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22241",
    "opportunityName": "Light-Duty Motor Vehicle Purchase or Lease Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22241/light-duty-motor-vehicle-purchase-or-lease-incentive-program",
    "websiteUrl": "https://www.tceq.texas.gov/airquality/terp/ld.html/",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Texas Commission on Environmental Quality",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  }
]
```

