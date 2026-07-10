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

Input file: batch-061_input.json
Output file to write: batch-061_output.json
Schema file: GPT Pro Outputs/opportunity-award-audit/opportunity-award-audit-schema.json
Batch 61 of 61
This batch has 14 opportunities, positions 1501-1514.

Use current official sources for evidence and include evidence URLs only as plain raw URLs.
`evidenceText` should be concise and non-URL text.

Targets JSON:
```json
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5627",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Financing",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5627/xcel-energy-residential-energy-efficiency-financing",
    "websiteUrl": "https://co.my.xcelenergy.com/s/residential/home-rebates/energy-efficiency-financing",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Loan Program",
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
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4079",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4079/xcel-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.xcelenergy.com/Programs_and_Rebates/Residential_Programs_and_Rebates",
    "applicationUrl": null,
    "state": "NM",
    "programType": "Rebate Program",
    "administrator": "Xcel Energy",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://co.my.xcelenergy.com/s/residential/home-rebates",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": "Xcel Energy",
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
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4816",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4816/xcel-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://my.xcelenergy.com/s/residential",
    "applicationUrl": null,
    "state": "ND",
    "programType": "Rebate Program",
    "administrator": "Xcel Energy",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5295",
    "opportunityName": "Xcel Energy - Solar Rewards Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5295/xcel-energy-solar-rewards-program",
    "websiteUrl": "https://co.my.xcelenergy.com/s/renewable/solar-rewards",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Performance-Based Incentive",
    "administrator": "Xcel Energy",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1255",
    "opportunityName": "Xcel Energy - Solar*Rewards Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1255/xcel-energy-solar-rewards-program",
    "websiteUrl": "https://co.my.xcelenergy.com/s/renewable/solar-rewards",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Performance-Based Incentive",
    "administrator": "Xcel Energy",
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5417",
    "opportunityName": "Xcel Energy - Solar*Rewards Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5417/xcel-energy-solar-rewards-program",
    "websiteUrl": "https://mn.my.xcelenergy.com/s/renewable/solar-rewards",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Performance-Based Incentive",
    "administrator": "Xcel Energy",
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
    "opportunityName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4813/xcel-energy-electric-and-gas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.xcelenergy.com/programs_and_rebates/residential_programs_and_rebates",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Rebate Program",
    "administrator": "Xcel Energy",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1589",
    "opportunityName": "Xcel Energy (Electric) - Business Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1589/xcel-energy-electric-business-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Rebate Program",
    "administrator": "Xcel Energy",
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
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
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
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 9
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5215",
    "opportunityName": "Xcel Energy (Electric) - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5215/xcel-energy-electric-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.xcelenergy.com/staticfiles/xe-responsive/Marketing/nm-business-programs-summary.pdf",
    "applicationUrl": null,
    "state": "NM",
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
        "retrofitTypeId": "efficient_air_compressor",
        "displayName": "Efficient air compressor",
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
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2474",
    "opportunityName": "Yellowstone Valley Electric Cooperative - Residential/Commercial Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2474/yellowstone-valley-electric-cooperative-residential-commercial-efficiency-rebate-program",
    "websiteUrl": "https://www.yvec.com/member-services/rebates/",
    "applicationUrl": null,
    "state": "MT",
    "programType": "Rebate Program",
    "administrator": "Yellowstone Valley Electric Cooperative",
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
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3607",
    "opportunityName": "York Electric Cooperative - Dual Fuel Heat Pump Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3607/york-electric-cooperative-dual-fuel-heat-pump-rebate-program",
    "websiteUrl": "http://www.yorkelectric.net/myhome/heat-pump-rebate/",
    "applicationUrl": null,
    "state": "SC",
    "programType": "Rebate Program",
    "administrator": "York Electric Cooperative, Inc",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22255",
    "opportunityName": "Zero-Emission Vehicle Infrastructure Partnerships Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22255/zero-emission-vehicle-infrastructure-partnerships-program",
    "websiteUrl": "https://wsdot.wa.gov/business-wsdot/grants/zero-emission-vehicle-grants/zero-emission-vehicle-infrastructure-partnerships-grant",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Grant Program",
    "administrator": "Washington State Department of Transportation",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "electric_vehicle_purchase",
        "displayName": "Electric vehicle purchase",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22182",
    "opportunityName": "Zero-Emission Vehicle School Bus Transition Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22182/zero-emission-vehicle-school-bus-transition-grant-program",
    "websiteUrl": "http://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb1255/?ys=2019rs",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Grant Program",
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
  }
]
```

