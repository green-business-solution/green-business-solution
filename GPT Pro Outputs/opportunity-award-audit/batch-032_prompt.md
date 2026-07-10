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

Input file: batch-032_input.json
Output file to write: batch-032_output.json
Schema file: GPT Pro Outputs/opportunity-award-audit/opportunity-award-audit-schema.json
Batch 32 of 61
This batch has 25 opportunities, positions 776-800.

Use current official sources for evidence and include evidence URLs only as plain raw URLs.
`evidenceText` should be concise and non-URL text.

Targets JSON:
```json
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5943",
    "opportunityName": "Local Option - Property Tax Exemption for Renewable Energy Facilities",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5943/local-option-property-tax-exemption-for-renewable-energy-facilities",
    "websiteUrl": "https://www.revenue.alabama.gov/division/tax-incentives/",
    "applicationUrl": null,
    "state": "AL",
    "programType": "Property Tax Incentive",
    "administrator": "Alabama Department of Revenue",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2801",
    "opportunityName": "Local Option - Property Tax Exemption for Renewable Energy Systems",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2801/local-option-property-tax-exemption-for-renewable-energy-systems",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "RI",
    "programType": "Property Tax Incentive",
    "administrator": "Rhode Island Office of Energy Resources",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5423",
    "opportunityName": "Local Option - Property Tax Exemption for Renewable Energy Systems",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5423/local-option-property-tax-exemption-for-renewable-energy-systems",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "CT",
    "programType": "Property Tax Incentive",
    "administrator": "Connecticut Department of Revenue Services",
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
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5869",
    "opportunityName": "Local Option - Property-Assessed Clean Energy Financing",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5869/local-option-property-assessed-clean-energy-financing",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "NE",
    "programType": "PACE Financing",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5249",
    "opportunityName": "Local Option - Real Property Tax Exemption for Green Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5249/local-option-real-property-tax-exemption-for-green-buildings",
    "websiteUrl": "https://www.tax.ny.gov/research/property/assess/manuals/vol4/pt2/sec4_06/sec470.htm",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Property Tax Incentive",
    "administrator": "Administered locally",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3532",
    "opportunityName": "Local Option - Renewable Energy Financing District/Solar Energy Improvement Special Assessments",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3532/local-option-renewable-energy-financing-district-solar-energy-improvement-special-assessments",
    "websiteUrl": "http://www.emnrd.state.nm.us/ECMD/CleanEnergyTaxIncentives/PACE.html",
    "applicationUrl": null,
    "state": "NM",
    "programType": "PACE Financing",
    "administrator": "Programs administered locally",
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
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:85",
    "opportunityName": "Local Option - Residential Property Tax Exemption for Solar",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/85/local-option-residential-property-tax-exemption-for-solar",
    "websiteUrl": "https://www.deq.virginia.gov/our-programs/pollution-prevention/virginia-information-source-for-energy/programs-and-financial-incentives",
    "applicationUrl": null,
    "state": "VA",
    "programType": "Property Tax Incentive",
    "administrator": "Virginia Department of Energy",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4951",
    "opportunityName": "Local Option - Residential Sustainable Energy Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4951/local-option-residential-sustainable-energy-program",
    "websiteUrl": "http://www.cpace.com/",
    "applicationUrl": null,
    "state": "CT",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5416",
    "opportunityName": "Local Option - Rural Renewable Energy Development Zones",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5416/local-option-rural-renewable-energy-development-zones",
    "websiteUrl": "https://www.oregon.gov/biz/programs/RuralRenewableEnergyDevelopment%28RRED%29Zone/Pages/default.aspx",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Property Tax Incentive",
    "administrator": "The Oregon Business Development Commission",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2502",
    "opportunityName": "Local Option - Sales and Use Tax Exemption for Renewable Energy Systems",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2502/local-option-sales-and-use-tax-exemption-for-renewable-energy-systems",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "CO",
    "programType": "Sales Tax Incentive",
    "administrator": "Department of Local Affairs, Local Governments",
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
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
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
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:192",
    "opportunityName": "Local Option - Solar, Wind & Biomass Energy Systems Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/192/local-option-solar-wind-and-biomass-energy-systems-exemption",
    "websiteUrl": "http://www.tax.ny.gov/research/property/assess/manuals/vol4/pt1/sec4_01/sec487.htm",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Property Tax Incentive",
    "administrator": "New York State Department of Taxation and Finance",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3554",
    "opportunityName": "Local Option - Special Energy Improvement Districts",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3554/local-option-special-energy-improvement-districts",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "OH",
    "programType": "PACE Financing",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3566",
    "opportunityName": "Local Option - Special Improvement Districts",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3566/local-option-special-improvement-districts",
    "websiteUrl": "https://energy.nv.gov/Resources/Property_Assessed_Clean_Energy_(PACE)/",
    "applicationUrl": null,
    "state": "NV",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4177",
    "opportunityName": "Local Option - Special Improvement Districts",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4177/local-option-special-improvement-districts",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "GA",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5723",
    "opportunityName": "Local Option- Renewable Energy Machinery and Tools Property Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5723/local-option-renewable-energy-machinery-and-tools-property-tax-exemption",
    "websiteUrl": "https://www.deq.virginia.gov/our-programs/pollution-prevention/virginia-information-source-for-energy/programs-and-financial-incentives",
    "applicationUrl": null,
    "state": "VA",
    "programType": "Property Tax Incentive",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5854",
    "opportunityName": "Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5854/lodi-electric-utility-commercial-and-industrial-energy-efficiency-loan-program",
    "websiteUrl": "http://lodielectric.com/908/Commercial-Programs",
    "applicationUrl": null,
    "state": "CA",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4583",
    "opportunityName": "Lodi Electric Utility - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4583/lodi-electric-utility-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "http://lodielectric.com/906/Commercial-Rebates",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Customer Programs",
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 8
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1810",
    "opportunityName": "Lodi Electric Utility - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1810/lodi-electric-utility-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lodi.gov/909/Residential-Rebates",
    "applicationUrl": null,
    "state": "CA",
    "programType": "municipal utility residential energy efficiency rebate program",
    "administrator": "Lodi Electric Utility",
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
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 15
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22636",
    "opportunityName": "Louisiana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22636/louisiana-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "http://wwwsp.dotd.la.gov/Inside_LaDOTD/Divisions/Operations/Electric-Vehicle/Pages/default.aspx",
    "applicationUrl": null,
    "state": "LA",
    "programType": "Grant Program",
    "administrator": "Louisiana Department of Transportation and Development",
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22707",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Bring Your Own Thermostat",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22707/louisville-gas-and-electric-and-kentucky-utilities-bring-your-own-thermostat",
    "websiteUrl": "https://www.thermostatrewards.com/lge-ku/",
    "applicationUrl": null,
    "state": "KY",
    "programType": "Rebate Program",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22708",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Optimized EV Charging",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22708/louisville-gas-and-electric-and-kentucky-utilities-optimized-ev-charging",
    "websiteUrl": "https://www.chargingrewards.com/lge-ku-ev/",
    "applicationUrl": null,
    "state": "KY",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "unknown",
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22699",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Small Business Audit and Direct Install",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22699/louisville-gas-and-electric-and-kentucky-utilities-small-business-audit-and-direct-install",
    "websiteUrl": "https://lge-ku.com/small-business-audit-self-install",
    "applicationUrl": null,
    "state": "KY",
    "programType": "Rebate Program",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22696",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – WeCare for Apartment Building Owners",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22696/louisville-gas-and-electric-and-kentucky-utilities-wecare-for-apartment-building-owners",
    "websiteUrl": "https://lge-ku.com/wecare",
    "applicationUrl": null,
    "state": "KY",
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
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
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
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22695",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – WeCare for Homeowners and Renters",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22695/louisville-gas-and-electric-and-kentucky-utilities-wecare-for-homeowners-and-renters",
    "websiteUrl": "https://lge-ku.com/wecare",
    "applicationUrl": null,
    "state": "KY",
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
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
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
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5018",
    "opportunityName": "Loveland Water & Power - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5018/loveland-water-and-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.lovelandwaterandpower.org/SAVEENERGY",
    "applicationUrl": null,
    "state": "CO",
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 9
  }
]
```

