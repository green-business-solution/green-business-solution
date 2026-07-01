You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 46-60 from the current unrepaired low-confidence opportunity-data queue after GPT Pro repair batches 1-38. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

Critical output rules:
- Return one valid JSON object only.
- The response must parse with JSON.parse.
- Do not wrap the response in triple backticks.
- Use raw URL strings only, such as "https://example.com/page".
- Do not use markdown link syntax anywhere.
- URL fields must not contain brackets, parentheses, escaped quote fragments, or copied markdown.
- If a search/browser UI gives a markdown link, convert it to a plain raw URL string before putting it in JSON.
- Keep each opportunityId exactly as supplied.
- Include exactly 15 repair objects, one for each supplied target, in the same order.
- Use empty arrays for unknown list fields. Use null only for applicationUrl or websiteUrl when no current URL is verified.
- Keep evidenceText concise, plain text, and under 75 words. Do not include URLs in evidenceText.
- Prefer unavailable for expired, closed, cancelled, fully subscribed, or no-longer-accepting programs.
- Use source_inaccessible only when current official sources cannot be read well enough to verify eligibility.

Goal:
For each target opportunity below, determine whether RetroFi's current opportunity-to-retrofit matches are correct. Repair the opportunity data so matching can distinguish:
- correct eligible retrofit categories;
- false-positive retrofit categories;
- geography and utility territory limits;
- eligible applicants and sectors;
- hard requirements;
- blockers that should prevent matching;
- source accessibility and availability.

Research requirements:
1. Prioritize current official administrator, utility, program, application, tariff, rebate-form, program-manual, or government sources.
2. Use DSIRE only as a starting clue, not as final authority when current official sources disagree.
3. Preserve categories only when current official sources support them.
4. Remove or block false-positive categories explicitly in blockers.
5. If a source supports a product-specific match, do not generalize it into a broader building category. Examples: window AC is not window replacement; pre-rinse spray valve is not broad plumbing retrofit; residential appliance rebate is not commercial kitchen equipment.
6. If EV charging, demand response, solar, financing, audit, loan, or water conservation is a separate program, say so. Keep it only if it truly belongs to this opportunity or clearly mark the separate-program boundary.
7. For source-inaccessible records, clear unsupported eligible categories and explain exactly what official source failed.
8. For loans or financing programs, do not force them into rebate-style categories. Describe them as financing or loan support and limit retrofit categories to what the financing program actually covers.
9. For commercial and industrial programs, do not infer residential appliances or home weatherization. For residential programs, do not infer commercial kitchen, refrigeration, motors, VFDs, or industrial measures.
10. Use snake_case strings for eligibleRetrofitCategories. It is fine to use a supplied retrofitTypeId when accurate, but narrow it when a product-specific category is more accurate.

Allowed output schema:
{
  "schemaVersion": "opportunity_data_research_repairs.v1",
  "researchedAt": "2026-07-01",
  "source": "gpt_pro",
  "repairs": [
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:...",
      "confidence": "high | medium | low",
      "availabilityStatus": "active | unavailable | source_inaccessible | unknown",
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3573"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 15.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:3573".

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4554",
    "opportunityName": "Piedmont EMC - Residential Home Upgrade Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4554/piedmont-emc-residential-home-upgrade-loan-program",
    "websiteUrl": "https://pemc.coop/smart_energy/loan-program/",
    "applicationUrl": null,
    "state": "NC",
    "programType": "Loan Program",
    "administrator": "Piedmont EMC",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "heat pump",
      "insulation",
      "pump replacement"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "efficient_pump_replacement",
        "displayName": "Efficient pump replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
    "opportunityName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22067/plumas-sierra-rec-commercial-and-irrigation-rebate-program",
    "websiteUrl": "https://www.psrec.coop/energy/rebates/",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Plumas-Sierra REC",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "heat pump",
      "heat pump water heater"
    ],
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
    "opportunityName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3853/ppl-electric-utilities-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.pplelectricbusinesssavings.com/ppl-business/incentives/overview/",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Rebate Program",
    "administrator": "PPL Electric Utilities",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "chp",
      "exterior lighting",
      "smart thermostat",
      "thermostat"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
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
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:154",
    "opportunityName": "Renewable Energy Systems Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/154/renewable-energy-systems-exemption",
    "websiteUrl": "https://mtrevenue.gov/publications/application-for-tax-incentive-assessment-of-energy-generating-property-form-ab-14/",
    "applicationUrl": null,
    "state": "MT",
    "programType": "Property Tax Incentive",
    "administrator": "Montana Department of Revenue",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass",
      "geothermal",
      "solar thermal"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5152",
    "opportunityName": "Residential On-Bill Financing Programs - Nicor Gas, North Shore Gas, Peoples Gas, Ameren and ComEd",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5152/residential-on-bill-financing-programs-nicor-gas-north-shore-gas-peoples-gas-ameren-and-comed",
    "websiteUrl": "http://www.ilenergyloan.com/",
    "applicationUrl": null,
    "state": "IL",
    "programType": "Loan Program",
    "administrator": "Renew Financial",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "air conditioning",
      "furnace",
      "insulation"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3021",
    "opportunityName": "Rhode Island Energy (Gas) - Commercial Energy Efficiency Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3021/rhode-island-energy-gas-commercial-energy-efficiency-programs",
    "websiteUrl": "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
    "applicationUrl": null,
    "state": "RI",
    "programType": "Rebate Program",
    "administrator": "Rhode Island Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "boiler",
      "furnace",
      "smart thermostat",
      "thermostat"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3024",
    "opportunityName": "Rhode Island Energy (Gas) - Residential Gas Heating Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3024/rhode-island-energy-gas-residential-gas-heating-rebate-programs",
    "websiteUrl": "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
    "applicationUrl": null,
    "state": "RI",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "boiler",
      "condensing boiler",
      "furnace",
      "programmable thermostat",
      "smart thermostat",
      "thermostat"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2664",
    "opportunityName": "RushShelby Energy - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2664/rushshelby-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.rse.coop/energy-savings/rebates/residential/",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Rebate Program",
    "administrator": "Rush Shelby Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ductless",
      "geothermal",
      "geothermal heat pump",
      "heat pump",
      "heat pump water heater",
      "mini split"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4919",
    "opportunityName": "Sales Tax Credit for Clean Energy Technology",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4919/sales-tax-credit-for-clean-energy-technology",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "TN",
    "programType": "Sales Tax Incentive",
    "administrator": "Tennessee Department of Revenue",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass",
      "chp",
      "combined heat and power",
      "geothermal"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
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
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2306",
    "opportunityName": "Salt River Electric - Residential Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2306/salt-river-electric-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.srelectric.com/rebates/",
    "applicationUrl": null,
    "state": "KY",
    "programType": "Rebate Program",
    "administrator": "Salt River Electric Cooperative",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "geothermal",
      "heat pump"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22809",
    "opportunityName": "Shrewsbury Electric - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22809/shrewsbury-electric-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://selco.shrewsburyma.gov/commercial-rebates-incentives/",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Shrewsbury Electric & Cable Operations",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "dcfc",
      "ev charging",
      "level 2",
      "level-2"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4266",
    "opportunityName": "SMECO - Non-Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4266/smeco-non-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "refrigeration",
      "vending machine controls"
    ],
    "relatedRetrofits": [
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "furnace",
      "oven",
      "solar thermal"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_oven",
        "displayName": "High-efficiency oven",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "demand response",
      "geothermal",
      "solar thermal"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
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
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2445",
    "opportunityName": "Southeastern Electric Cooperative - Electric Equipment Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2445/southeastern-electric-cooperative-electric-equipment-loan-program",
    "websiteUrl": "https://southeasternelectric.com/member-rebates-incentives/#loans",
    "applicationUrl": null,
    "state": "SD",
    "programType": "Loan Program",
    "administrator": "Southeastern Electric Cooperative",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "geothermal",
      "insulation",
      "weatherization"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
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
      }
    ],
    "relatedRetrofitCount": 4
  }
]
