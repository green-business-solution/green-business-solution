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

Input file: batch-026_input.json
Output file to write: batch-026_output.json
Schema file: GPT Pro Outputs/opportunity-award-audit/opportunity-award-audit-schema.json
Batch 26 of 61
This batch has 25 opportunities, positions 626-650.

Use current official sources for evidence and include evidence URLs only as plain raw URLs.
`evidenceText` should be concise and non-URL text.

Targets JSON:
```json
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2674",
    "opportunityName": "Harrison County REMC - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2674/harrison-county-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.harrisonremc.com/?s=rebates",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Rebate Program",
    "administrator": "Harrison REMC",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
    "opportunityName": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22630/hawaii-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Grant Program",
    "administrator": "Hawaii Department of Transportation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3870",
    "opportunityName": "Hawaii C-PACE program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3870/hawaii-c-pace-program",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "HI",
    "programType": "PACE Financing",
    "administrator": "Programs administered locally",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3589",
    "opportunityName": "Haywood EMC - Residential Heat Pump and Weatherization Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3589/haywood-emc-residential-heat-pump-and-weatherization-loan-program",
    "websiteUrl": "https://www.haywoodemc.com/heat-pumpweatherization-loan",
    "applicationUrl": null,
    "state": "NC",
    "programType": "Loan Program",
    "administrator": "Haywood EMC",
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
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2692",
    "opportunityName": "Heartland REMC - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2692/heartland-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.heartlandremc.com/rebates/?rq=rebate",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Rebate Program",
    "administrator": "Heartland REMC",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:heat-pump-air-conditioner-rebates-conversion-to-all-electric-heating-and-cooling",
    "opportunityName": "Heat Pump Air Conditioner Rebates - Conversion to All Electric Heating and Cooling",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/71431/637902892215200000",
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
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:heat-pump-water-heater-rebate",
    "opportunityName": "Heat Pump Water Heater Rebate",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/75953/638881818060600000",
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
        "retrofitTypeId": "high_efficiency_gas_water_heater",
        "displayName": "High-efficiency gas water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22763",
    "opportunityName": "High Country Conservation - Solarize Summit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22763/high-country-conservation-solarize-summit",
    "websiteUrl": "https://highcountryconservation.org/solarize-summit/",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
    "opportunityName": "High Performance Building Incentives Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
    "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Grant Program",
    "administrator": "Department of Community and Economic Development",
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
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3602",
    "opportunityName": "High Performance Buildings Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3602/high-performance-buildings-incentive-program",
    "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Loan Program",
    "administrator": "Department of Community and Economic Development; Department of Environmental Protection",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22734",
    "opportunityName": "Hingham Municipal Lighting Plant Solar Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22734/hingham-municipal-lighting-plant-solar-rebate-program",
    "websiteUrl": "https://www.hmlp.com/rebates/solar/",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Hingham Municipal Lighting Plant",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22300",
    "opportunityName": "Holy Cross Energy - EV Charger Incentives",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22300/holy-cross-energy-ev-charger-incentives",
    "websiteUrl": "https://www.holycross.com/charge-at-home-charge-at-work/",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": "Holy Cross Energy",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:389",
    "opportunityName": "Holy Cross Energy - Renewable Energy Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/389/holy-cross-energy-renewable-energy-rebate-program",
    "websiteUrl": "https://www.holycross.com/renewable-energy-incentives/",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": "Holy Cross Energy",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
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
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2045",
    "opportunityName": "Holy Cross Energy - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2045/holy-cross-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.holycross.com/member-programs/energy-efficiency-and-rebates",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": "Holy Cross Energy",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1338",
    "opportunityName": "Holyoke Gas & Electric - Commercial Energy Assistance Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1338/holyoke-gas-and-electric-commercial-energy-assistance-program",
    "websiteUrl": "https://www.hged.com/commercial/ee-business/ceap/default.aspx",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Loan Program",
    "administrator": "Holyoke Gas and Electric Department",
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1337",
    "opportunityName": "Holyoke Gas & Electric - Residential Energy Assistance Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1337/holyoke-gas-and-electric-residential-energy-assistance-program",
    "websiteUrl": "https://www.hged.com/residential/ee-home/reap/default.aspx",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Loan Program",
    "administrator": "Customer Service",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1188",
    "opportunityName": "Home Energy Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1188/home-energy-loan-program",
    "websiteUrl": "https://www.mncee.org/mhfa-home-energy-loan",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Loan Program",
    "administrator": "Center for Energy and Environment",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2426",
    "opportunityName": "Home Energy Solutions for Existing Homes",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2426/home-energy-solutions-for-existing-homes",
    "websiteUrl": "http://www.energytrust.org/residential/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Energy Trust of Oregon",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5739",
    "opportunityName": "Home Energy Solutions Micro-Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5739/home-energy-solutions-micro-loan-program",
    "websiteUrl": "https://www.capitalforchange.org/hes-micro-loan",
    "applicationUrl": null,
    "state": "CT",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3581",
    "opportunityName": "Home Performance with Energy Star (Existing Residential)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3581/home-performance-with-energy-star-existing-residential",
    "websiteUrl": "https://www.efficiencyvermont.com/rebates/list/home-performance-with-energy-star",
    "applicationUrl": null,
    "state": "VT",
    "programType": "Rebate Program",
    "administrator": "Efficiency Vermont",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3559",
    "opportunityName": "Howard County - High Performance and Green Building Property Tax Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3559/howard-county-high-performance-and-green-building-property-tax-credit",
    "websiteUrl": "https://www.howardcountymd.gov/finance/tax-credits",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Property Tax Incentive",
    "administrator": "Howard County Government",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5189",
    "opportunityName": "Hudson Light & Power - Photovoltaic Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5189/hudson-light-and-power-photovoltaic-incentive-program",
    "websiteUrl": "https://www.hudsonlight.com/rebates",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Hudson Light & Power",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3348",
    "opportunityName": "Hutchinson Utilities Commission - Residential Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3348/hutchinson-utilities-commission-residential-energy-efficiency-program",
    "websiteUrl": "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission?rebates=residential",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Rebate Program",
    "administrator": "Hutchinson Utilities Commission",
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
      }
    ],
    "relatedRetrofitCount": 11
  },
  {
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:hvac-optimization-program",
    "opportunityName": "HVAC Optimization Program",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement",
    "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement",
    "applicationUrl": null,
    "state": "CA",
    "programType": "technical_assistance",
    "administrator": "Southern California Edison",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:hvac-system-and-heat-pump-rebates",
    "opportunityName": "HVAC System and Heat Pump Rebates",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/53818/638874783876570000",
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
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
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
  }
]
```

