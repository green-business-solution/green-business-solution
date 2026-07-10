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

Input file: batch-022_input.json
Output file to write: batch-022_output.json
Schema file: GPT Pro Outputs/opportunity-award-audit/opportunity-award-audit-schema.json
Batch 22 of 61
This batch has 25 opportunities, positions 526-550.

Use current official sources for evidence and include evidence URLs only as plain raw URLs.
`evidenceText` should be concise and non-URL text.

Targets JSON:
```json
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22596",
    "opportunityName": "Entergy New Orleans - eTech Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22596/entergy-new-orleans-etech-program",
    "websiteUrl": "https://entergyetech.com/electric-vehicles/",
    "applicationUrl": null,
    "state": "LA",
    "programType": "Rebate Program",
    "administrator": "Entergy New Orleans",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3752",
    "opportunityName": "Entergy New Orleans - Residential Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3752/entergy-new-orleans-residential-energy-efficiency-program",
    "websiteUrl": "https://www.energysmartnola.info/residents/",
    "applicationUrl": null,
    "state": "LA",
    "programType": "Rebate Program",
    "administrator": "Entergy New Orleans and ClearResult",
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
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3754",
    "opportunityName": "Entergy New Orleans - Small and Large Commercial and Industrial Incentives Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3754/entergy-new-orleans-small-and-large-commercial-and-industrial-incentives-program",
    "websiteUrl": "https://www.energysmartnola.info/custom-and-prescriptive-incentives/",
    "applicationUrl": null,
    "state": "LA",
    "programType": "Rebate Program",
    "administrator": "Energy Smart",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "exterior_site_lighting_retrofit",
        "displayName": "Exterior/site lighting retrofit",
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
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
        "retrofitTypeId": "anti_sweat_heater_controls",
        "displayName": "Anti-sweat heater controls",
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
      }
    ],
    "relatedRetrofitCount": 13
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2653",
    "opportunityName": "Entergy Texas - Commercial Solutions Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2653/entergy-texas-commercial-solutions-programs",
    "websiteUrl": "https://www.entergytxsolutions.com/customers/",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Entergy Texas, Inc.",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22396",
    "opportunityName": "Entergy Texas - EV Charging Station Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22396/entergy-texas-ev-charging-station-rebate-program",
    "websiteUrl": "https://entergyetech.com/",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": null,
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22373",
    "opportunityName": "Eugene Water & Electric Board - Electric Vehicle Charging Station Smart Charge Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22373/eugene-water-and-electric-board-electric-vehicle-charging-station-smart-charge-program",
    "websiteUrl": "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22766",
    "opportunityName": "EV Charging Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22766/ev-charging-program",
    "websiteUrl": "https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program",
    "applicationUrl": null,
    "state": "CT",
    "programType": "Rebate Program",
    "administrator": "Eversource and United Illuminating",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_22121",
    "opportunityName": "EV Infrastructure Rule",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
    "websiteUrl": "https://www.sdge.com/node/22121",
    "applicationUrl": "https://www.sdge.com/node/22121",
    "state": "CA",
    "programType": "utility_program",
    "administrator": "SDG&E",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2933",
    "opportunityName": "Evergy - Energy Savings Kit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2933/evergy-energy-savings-kit",
    "websiteUrl": "https://www.evergy.com/ways-to-save/programs/energy-savings-kit",
    "applicationUrl": null,
    "state": "MO",
    "programType": "Rebate Program",
    "administrator": "Kansas City Power & Light",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
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
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1467",
    "opportunityName": "Evergy - Residential Programmable Thermostat Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1467/evergy-residential-programmable-thermostat-program",
    "websiteUrl": "https://www.evergy.com/ways-to-save/discounts/thermostats",
    "applicationUrl": null,
    "state": "MO",
    "programType": "Rebate Program",
    "administrator": "Evergy",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2932",
    "opportunityName": "Evergy - Residential Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2932/evergy-residential-rebate-programs",
    "websiteUrl": "https://www.evergy.com/ways-to-save/discounts",
    "applicationUrl": null,
    "state": "MO",
    "programType": "Rebate Program",
    "administrator": "Evergy",
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
      },
      {
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22325",
    "opportunityName": "Eversource - Commercial Electric Vehicle Charging Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22325/eversource-commercial-electric-vehicle-charging-program",
    "websiteUrl": "https://www.eversource.com/content/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Eversource",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4645",
    "opportunityName": "Eversource - Commercial New Construction Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4645/eversource-commercial-new-construction-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.eversource.com/content/business/save-money-energy/equipment-rebates-discounts",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Rebate Program",
    "administrator": "Public Service of New Hampshire",
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22576",
    "opportunityName": "Eversource - Home Battery Storage Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22576/eversource-home-battery-storage-rebate",
    "websiteUrl": "https://www.eversource.com/content/residential/save-money-energy/energy-efficiency-programs/demand-response/battery-storage-demand-response/nh",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Rebate Program",
    "administrator": "Eversource",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22577",
    "opportunityName": "Eversource - New Hampshire Residential Clean Energy Loan",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22577/eversource-new-hampshire-residential-clean-energy-loan",
    "websiteUrl": "https://www.neifund.org/nh-residential-clean-energy/",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Loan Program",
    "administrator": "Eversource, National Energy Improvement Fund",
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
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2373",
    "opportunityName": "Eversource - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2373/eversource-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.eversource.com/content/nh/residential/save-money-energy/manage-energy-costs-usage/efficient-products",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Rebate Program",
    "administrator": "Public Service of New Hampshire",
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 7
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22548",
    "opportunityName": "Eversource Residential EV Charging Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22548/eversource-residential-ev-charging-program",
    "websiteUrl": "https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Eversource",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2593",
    "opportunityName": "EWEB - Commercial Energy Efficiency Rebates Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2593/eweb-commercial-energy-efficiency-rebates-program",
    "websiteUrl": "http://www.eweb.org/business-customers/rebates-loans-and-conservation",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Eugene Water & Electric Board",
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
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
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
        "retrofitTypeId": "anti_sweat_heater_controls",
        "displayName": "Anti-sweat heater controls",
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
        "retrofitTypeId": "high_efficiency_toilet_urinal",
        "displayName": "High-efficiency toilet / urinal replacement",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "demand_controlled_kitchen_ventilation",
        "displayName": "Demand-controlled kitchen ventilation",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 12
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2158",
    "opportunityName": "EWEB - Residential Energy Efficiency Loan Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2158/eweb-residential-energy-efficiency-loan-programs",
    "websiteUrl": "http://www.eweb.org/residential-customers/rebates-loans-and-conservation",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Loan Program",
    "administrator": "Eugene Water & Electric Board",
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
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2157",
    "opportunityName": "EWEB - Residential Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2157/eweb-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "http://www.eweb.org/residential-customers/rebates-loans-and-conservation",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Eugene Water & Electric Board",
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
    "relatedRetrofitCount": 8
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2526",
    "opportunityName": "EWEB - Solar Electric Program (Rebate)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2526/eweb-solar-electric-program-rebate",
    "websiteUrl": "https://www.eweb.org/environment-and-climate/solar-electric",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Eugene Water & Electric Board",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:148",
    "opportunityName": "Excise Tax Deduction for Solar or Wind Powered Systems",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/148/excise-tax-deduction-for-solar-or-wind-powered-systems",
    "websiteUrl": "https://www.mass.gov/business-taxes?_gl=1*1malngx*_ga*NjEyNDI5MjYwLjE2NjMwMTYwNjM.*_ga_MCLPEGW7WM*MTczNTg0NTgyMC41LjAuMTczNTg0NTgyMC4wLjAuMA..",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Corporate Tax Deduction",
    "administrator": "Massachusetts Department of Revenue",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:147",
    "opportunityName": "Excise Tax Exemption for Solar or Wind Powered Systems",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/147/excise-tax-exemption-for-solar-or-wind-powered-systems",
    "websiteUrl": "https://www.mass.gov/info-details/massachusetts-dor-corporate-excise-tax-guide#deductions-&-credits-",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Corporate Tax Exemption",
    "administrator": "Massachusetts Department of Revenue",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22616",
    "opportunityName": "EZ Permit: Electric Vehicle Charger",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22616/ez-permit-electric-vehicle-charger",
    "websiteUrl": "https://www.phila.gov/documents/ez-permit-applications-permits-without-plans/#ez-permit-standard-solar-photovoltaic-pv-system",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Green Building Incentive",
    "administrator": "City of Philadelphia Department of Licenses and Inspection",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5886",
    "opportunityName": "Fairfax County- Conservation Assistance Programs (CAP)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5886/fairfax-county-conservation-assistance-programs-cap",
    "websiteUrl": "https://www.fairfaxcounty.gov/soil-water-conservation/conservation-assistance-programs",
    "applicationUrl": null,
    "state": "VA",
    "programType": "Rebate Program",
    "administrator": "Northern Virginia Soil and Water Conservation District",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
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
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  }
]
```

