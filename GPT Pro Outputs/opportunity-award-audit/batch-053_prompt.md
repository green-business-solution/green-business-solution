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

Input file: batch-053_input.json
Output file to write: batch-053_output.json
Schema file: GPT Pro Outputs/opportunity-award-audit/opportunity-award-audit-schema.json
Batch 53 of 61
This batch has 25 opportunities, positions 1301-1325.

Use current official sources for evidence and include evidence URLs only as plain raw URLs.
`evidenceText` should be concise and non-URL text.

Targets JSON:
```json
[
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
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
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
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "steam_trap_replacement",
        "displayName": "Steam trap replacement",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 12
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2513",
    "opportunityName": "SoCalGas - Non-Residential On-Bill Financing Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2513/socalgas-non-residential-on-bill-financing-program",
    "websiteUrl": "https://www.socalgas.com/business/savings/energy-saving-tips-and-tools/energy-efficiency-programs/zero-percent-financing",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Loan Program",
    "administrator": "Southern California Gas Company",
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
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1461",
    "opportunityName": "SoCalGas - Residential Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1461/socalgas-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Southern California Gas Company",
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_oven",
        "displayName": "High-efficiency oven",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5682",
    "opportunityName": "Solar Alternative Energy Credits",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5682/solar-alternative-energy-credits",
    "websiteUrl": "https://pennaeps.com/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Solar Renewable Energy Credit Program",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:243",
    "opportunityName": "Solar and CHP Sales Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/243/solar-and-chp-sales-tax-exemption",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "FL",
    "programType": "Sales Tax Incentive",
    "administrator": "Florida Department of Revenue",
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
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4977",
    "opportunityName": "Solar and Energy Loan Fund (SELF)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4977/solar-and-energy-loan-fund-self",
    "websiteUrl": "http://www.solarenergyloanfund.org",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Loan Program",
    "administrator": "Solar and Energy Loan Fund (SELF)",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:49",
    "opportunityName": "Solar and Wind Energy Credit (Corporate)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/49/solar-and-wind-energy-credit-corporate",
    "websiteUrl": "https://tax.hawaii.gov/geninfo/renewable/",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Corporate Tax Credit",
    "administrator": "Hawaii Department of Taxation",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:50",
    "opportunityName": "Solar and Wind Energy Credit (Personal)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/50/solar-and-wind-energy-credit-personal",
    "websiteUrl": "http://tax.hawaii.gov/geninfo/renewable/",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Personal Tax Credit",
    "administrator": "Hawaii Department of Taxation",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:119",
    "opportunityName": "Solar and Wind Equipment Sales Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/119/solar-and-wind-equipment-sales-tax-exemption",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "AZ",
    "programType": "Sales Tax Incentive",
    "administrator": "Department of Revenue",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3352",
    "opportunityName": "Solar Energy Incentives Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3352/solar-energy-incentives-program",
    "websiteUrl": "https://dced.pa.gov/programs/alternative-clean-energy-program-ace/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Industry Recruitment/Support",
    "administrator": "Department of Community and Economic Development",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5945",
    "opportunityName": "Solar Energy Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5945/solar-energy-loan-program",
    "websiteUrl": "http://dced.pa.gov/programs/solar-energy-program-sep/#.WDSKnLIrJhE",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Loan Program",
    "administrator": "Department of Community and Economic Development (DCED); Department of Environmental Protection (DEP)",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22791",
    "opportunityName": "Solar Energy Program (Grant Category)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22791/solar-energy-program-grant-category",
    "websiteUrl": "https://dced.pa.gov/programs/solar-energy-program-sep/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Grant Program",
    "administrator": "Department of Community and Economic Development (DCED); Department of Environmental Protection (DEP)",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1218",
    "opportunityName": "Solar Energy Sales Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1218/solar-energy-sales-tax-exemption",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "MN",
    "programType": "Sales Tax Incentive",
    "administrator": "Department of Revenue",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5245",
    "opportunityName": "Solar Energy System and Cogeneration System Personal Property Tax Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5245/solar-energy-system-and-cogeneration-system-personal-property-tax-credit",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "DC",
    "programType": "Property Tax Incentive",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1804",
    "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Corporate)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1804/solar-energy-small-hydropower-and-geothermal-tax-credit-corporate",
    "websiteUrl": "https://solar.sc.gov/financing-system/tax-credits-incentives-and-net-metering",
    "applicationUrl": null,
    "state": "SC",
    "programType": "Corporate Tax Credit",
    "administrator": "South Carolina Department of Revenue",
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
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1803",
    "opportunityName": "Solar Energy, Small Hydropower, and Geothermal Tax Credit (Personal)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1803/solar-energy-small-hydropower-and-geothermal-tax-credit-personal",
    "websiteUrl": "https://solar.sc.gov/financing-system/tax-credits-incentives-and-net-metering",
    "applicationUrl": null,
    "state": "SC",
    "programType": "Personal Tax Credit",
    "administrator": "South Carolina Department of Revenue",
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
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22790",
    "opportunityName": "Solar for Schools Grant Program (S4S)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22790/solar-for-schools-grant-program-s4s",
    "websiteUrl": "https://dced.pa.gov/programs/solar-for-schools-grant-program-s4s/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Grant Program",
    "administrator": "Pennsylvania Department of Community & Economic Development",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22111",
    "opportunityName": "Solar Massachusetts Renewable Target (SMART) Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22111/solar-massachusetts-renewable-target-smart-program",
    "websiteUrl": "https://www.mass.gov/info-details/smart-30-program-details",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Performance-Based Incentive",
    "administrator": "Department of Energy Resources / CLEAResult",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22566",
    "opportunityName": "Solar Planning Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22566/solar-planning-program",
    "websiteUrl": "https://www.energytrust.org/incentives/solar-planning/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Energy Trust of Oregon",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "solar_plus_storage_system",
        "displayName": "Solar-plus-storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "engineering_feasibility_study",
        "displayName": "Engineering feasibility study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5688",
    "opportunityName": "Solar Renewable Energy Certificates (SRECs)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5688/solar-renewable-energy-certificates-srecs",
    "websiteUrl": "https://www.psc.state.md.us/electricity/maryland-renewable-energy-portfolio-standard-program-frequently-asked-questions/",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Solar Renewable Energy Credit Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5686",
    "opportunityName": "Solar Renewable Energy Credits",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5686/solar-renewable-energy-credits",
    "websiteUrl": "https://dcpsc.org/Utility-Information/Electric/RPS.aspx",
    "applicationUrl": null,
    "state": "DC",
    "programType": "Solar Renewable Energy Credit Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5690",
    "opportunityName": "Solar Renewable Energy Credits (SRECs) Spot Market Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5690/solar-renewable-energy-credits-srecs-spot-market-program",
    "websiteUrl": "http://depsc.delaware.gov/delrps.shtml",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Solar Renewable Energy Credit Program",
    "administrator": null,
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
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1234",
    "opportunityName": "Solar Sales Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1234/solar-sales-tax-exemption",
    "websiteUrl": "https://www.tax.ny.gov/pubs_and_bulls/publications/sales/st_pubs_and_bulls_by_number.htm",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Sales Tax Incentive",
    "administrator": "New York State Department of Taxation and Finance",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:506",
    "opportunityName": "Solar Water Heater Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/506/solar-water-heater-rebate",
    "websiteUrl": "https://www.hawaiienergy.com/for-homes/rebates/water-heating",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Rebate Program",
    "administrator": "Hawaii Energy",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22417",
    "opportunityName": "Solar Within Reach",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22417/solar-within-reach",
    "websiteUrl": "https://www.energytrust.org/incentives/solar-within-reach/#tab-one",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Energy Trust of Oregon",
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
      },
      {
        "retrofitTypeId": "solar_plus_storage_system",
        "displayName": "Solar-plus-storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  }
]
```

