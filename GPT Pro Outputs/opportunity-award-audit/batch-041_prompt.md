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

Input file: batch-041_input.json
Output file to write: batch-041_output.json
Schema file: GPT Pro Outputs/opportunity-award-audit/opportunity-award-audit-schema.json
Batch 41 of 61
This batch has 25 opportunities, positions 1001-1025.

Use current official sources for evidence and include evidence URLs only as plain raw URLs.
`evidenceText` should be concise and non-URL text.

Targets JSON:
```json
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22101",
    "opportunityName": "Oklahoma Natural Gas - Residential efficiency rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22101/oklahoma-natural-gas-residential-efficiency-rebates",
    "websiteUrl": "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates",
    "applicationUrl": null,
    "state": "OK",
    "programType": "Rebate Program",
    "administrator": "Oklahoma Natural Gas",
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5015",
    "opportunityName": "Oklahoma Natural Gas - Residential Efficiency Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5015/oklahoma-natural-gas-residential-efficiency-rebates",
    "websiteUrl": "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates",
    "applicationUrl": null,
    "state": "OK",
    "programType": "Rebate Program",
    "administrator": "CenterPoint Energy",
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
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:f4ae5887bd3fcdc9:on-bill-financing",
    "opportunityName": "On-Bill Financing",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/smart-energy-solar/energy-efficiency-programs",
    "websiteUrl": "https://www.sce.com/business/smart-energy-solar/energy-efficiency-programs",
    "applicationUrl": "https://www.sce.com/business/tools/on-bill-financing",
    "state": "CA",
    "programType": "financing",
    "administrator": "Southern California Edison",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3999",
    "opportunityName": "On-Farm Energy Efficiency Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3999/on-farm-energy-efficiency-grant-program",
    "websiteUrl": "https://mtassociation.org/energy/funding-for-farm-energy-projects-in-kentucky-in-2025/",
    "applicationUrl": null,
    "state": "KY",
    "programType": "Grant Program",
    "administrator": "County Agricultural Development Councils, Governor's Office of Agricultural Policy",
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
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "cool_roof_reflective_roof",
        "displayName": "Cool roof / reflective roof coating",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22479",
    "opportunityName": "Oncor Electric Delivery - Commercial Solar Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22479/oncor-electric-delivery-commercial-solar-program",
    "websiteUrl": "https://www.oncor.com/takealoadofftexas/pages/commercial-solar",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Oncor Electric Delivery",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3168",
    "opportunityName": "Oncor Electric Delivery - Residential Solar Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3168/oncor-electric-delivery-residential-solar-program",
    "websiteUrl": "https://www.oncor.com/takealoadofftexas/pages/residentialsolar",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Oncor Electric Delivery",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4644",
    "opportunityName": "Orange and Rockland Utilities (Electric) - Commercial Efficiency Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4644/orange-and-rockland-utilities-electric-commercial-efficiency-programs",
    "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny/energy-efficiency-upgrades-installations",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
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
      },
      {
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_oven",
        "displayName": "High-efficiency oven",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_steamer",
        "displayName": "High-efficiency steamer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 12
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5011",
    "opportunityName": "Orange and Rockland Utilities (Electric) - Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5011/orange-and-rockland-utilities-electric-energy-efficiency-program",
    "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Rebate Program",
    "administrator": "Orange and Rockland Utilities, Inc.",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3905",
    "opportunityName": "Orange and Rockland Utilities (Gas) - Residential Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3905/orange-and-rockland-utilities-gas-residential-efficiency-program",
    "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Rebate Program",
    "administrator": "Orange and Rockland Utilities, Inc.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2678",
    "opportunityName": "Orange County REMC - Energy Efficient Equipment Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2678/orange-county-remc-energy-efficient-equipment-rebate-program",
    "websiteUrl": "https://www.myremc.coop/rebates",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Rebate Program",
    "administrator": "Orange County REMC",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2130",
    "opportunityName": "Orcas Power & Light - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2130/orcas-power-and-light-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.opalco.com/save/residential-rebates/?_ga=2.148319991.1364173942.1699641439-508539227.1699641439",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": "Orcas Power and Light Cooperative",
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
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22659",
    "opportunityName": "Oregon - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22659/oregon-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.oregon.gov/odot/climate/pages/nevi.aspx",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Grant Program",
    "administrator": "Oregon Department of Transportation",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22224",
    "opportunityName": "Oregon Clean Vehicle Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22224/oregon-clean-vehicle-rebate-program",
    "websiteUrl": "https://www.oregon.gov/deq/aq/programs/Pages/ZEV-Rebate.aspx",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Oregon Department of Environmental Quality",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5412",
    "opportunityName": "Orlando Utilities Commission - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5412/orlando-utilities-commission-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.ouc.com/business/business-rebates-programs/business-rebates-information",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "OU Customer Connection",
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
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "cool_roof_reflective_roof",
        "displayName": "Cool roof / reflective roof coating",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22482",
    "opportunityName": "Orlando Utilities Commission - Efficiency Delivered®",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22482/orlando-utilities-commission-efficiency-delivered",
    "websiteUrl": "https://www.ouc.com/residential/save-energy-water-money/efficiency-delivered-from-ouc",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "Orlando Utilities Commission",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
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
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_toilet_urinal",
        "displayName": "High-efficiency toilet / urinal replacement",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "smart_irrigation_controller",
        "displayName": "Smart irrigation controller",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "efficient_fan_blower_replacement",
        "displayName": "Efficient fan/blower replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22307",
    "opportunityName": "Orlando Utilities Commission - Electric Vehicle Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22307/orlando-utilities-commission-electric-vehicle-rebate-program",
    "websiteUrl": "https://www.ouc.com/residential/save-energy-water-money/electric-vehicles",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "Orlando Utilities Commission",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1780",
    "opportunityName": "Orlando Utilities Commission - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1780/orlando-utilities-commission-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ouc.com/residential/save-energy-water-money/residential-rebates-information",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "OU Customer Connection",
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
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
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
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
        "retrofitTypeId": "electric_vehicle_purchase",
        "displayName": "Electric vehicle purchase",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 10
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2867",
    "opportunityName": "Orlando Utilities Commission - Solar Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2867/orlando-utilities-commission-solar-programs",
    "websiteUrl": "https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Performance-Based Incentive",
    "administrator": "Orlando Utilities Commission (OUC)",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3136",
    "opportunityName": "OTEC - Agricultural Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3136/otec-agricultural-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.directefficiency.com/otec-rebates/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Oregon Trail Electric Cooperative",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "efficient_pump_replacement",
        "displayName": "Efficient pump replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22431",
    "opportunityName": "OTEC - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22431/otec-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.directefficiency.com/otec-rebates/#otec-commercial",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Oregon Trail Electric Cooperative",
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
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2316",
    "opportunityName": "OTEC - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2316/otec-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://otec.coop/residential",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Oregon Trail Electric Cooperative",
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
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
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
      },
      {
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_oven",
        "displayName": "High-efficiency oven",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 10
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22336",
    "opportunityName": "Otter Tail Power - EVSE Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22336/otter-tail-power-evse-rebate-program",
    "websiteUrl": "https://www.otpco.com/ways-to-save/programs/electric-vehicle-rate/",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Rebate Program",
    "administrator": "Otter Tail Power",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1528",
    "opportunityName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1528/otter-tail-power-company-commercial-and-industrial-energy-efficiency-grant-program",
    "websiteUrl": "https://www.otpco.com/ways-to-save/programs/custom-grants/",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Grant Program",
    "administrator": "Customer Service",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1531",
    "opportunityName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1531/otter-tail-power-company-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.otpco.com/ways-to-save/business/programs/",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Rebate Program",
    "administrator": "Customer Service",
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
    "relatedRetrofitCount": 10
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3139",
    "opportunityName": "Otter Tail Power Company - Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3139/otter-tail-power-company-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.otpco.com/ways-to-save/programs/",
    "applicationUrl": null,
    "state": "ND",
    "programType": "Rebate Program",
    "administrator": "Otter Tail Power Company",
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
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
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
    "relatedRetrofitCount": 11
  }
]
```

