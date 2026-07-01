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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4595"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 15.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:4595".

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3918",
    "opportunityName": "Montana-Dakota Utilities (Gas) - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3918/montana-dakota-utilities-gas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/",
    "applicationUrl": null,
    "state": "SD",
    "programType": "Rebate Program",
    "administrator": "Montana-Dakota Utilities Co.",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "furnace",
      "programmable thermostat",
      "thermostat"
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
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:multifamily-boiler-electrification-pilot-program",
    "opportunityName": "Multifamily Boiler Electrification Pilot Program",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "applicationUrl": null,
    "state": "CA",
    "programType": "rebate",
    "administrator": "Silicon Valley Power",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "boiler",
      "fixture"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1352",
    "opportunityName": "National Grid (Electric) - Large Business Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1352/national-grid-electric-large-business-program",
    "websiteUrl": "https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Large-Business-Program",
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
      "lighting retrofit"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
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
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives",
    "opportunityName": "New Construction Incentives",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41520/638868867879470000",
    "state": "CA",
    "programType": "rebate",
    "administrator": "Silicon Valley Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "fixture"
    ],
    "relatedRetrofits": [
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22472",
    "opportunityName": "New Solar Market Development Tax Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22472/new-solar-market-development-tax-credit",
    "websiteUrl": "https://www.emnrd.nm.gov/ecmd/tax-incentives/solar-market-development-tax-credit-smdtc/",
    "applicationUrl": null,
    "state": "NM",
    "programType": "Personal Tax Credit",
    "administrator": "New Mexico Energy, Minerals and Natural Resources Department, New Mexico Taxation and Revenue Department",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "photovoltaic",
      "solar thermal"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5726",
    "opportunityName": "NIPSCO (Gas & Electric) Small Business Direct Install Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5726/nipsco-gas-and-electric-small-business-direct-install-program",
    "websiteUrl": "https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Grant Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "refrigeration"
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
      }
    ],
    "relatedRetrofitCount": 3
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "geothermal",
      "geothermal heat pump",
      "heat pump",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2099",
    "opportunityName": "Palmetto Electric Cooperative - Buried Treasure Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2099/palmetto-electric-cooperative-buried-treasure-rebate-program",
    "websiteUrl": "https://www.palmetto.coop/buried-treasure",
    "applicationUrl": null,
    "state": "SC",
    "programType": "Rebate Program",
    "administrator": "Palmetto Electric Cooperative",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3240",
    "opportunityName": "PECO Energy (Gas) - Residential Heating Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3240/peco-energy-gas-residential-heating-efficiency-rebate-program",
    "websiteUrl": "https://www.peco.com/WaystoSave/ForYourHome/Pages/NaturalGasRebatesCredits.aspx",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Rebate Program",
    "administrator": "PECO Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "boiler",
      "furnace"
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5851",
    "opportunityName": "PECO Energy (Gas)- Commercial Heating Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5851/peco-energy-gas-commercial-heating-efficiency-rebate-program",
    "websiteUrl": "http://www.peco.com/WaystoSave/ForYourBusiness/Pages/GasEUOverview.aspx",
    "applicationUrl": null,
    "state": "PA",
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
      "furnace"
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4599",
    "opportunityName": "Pend Oreille PUD - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4599/pend-oreille-pud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://popud.org/your-account/save-energy-2/rebates",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": "Pend Oreille PUD",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "clothes washer",
      "ductless"
    ],
    "relatedRetrofits": [
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4532",
    "opportunityName": "Peninsula Light Company - Commercial Efficient Lighting  Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4532/peninsula-light-company-commercial-efficient-lighting-rebate-program",
    "websiteUrl": "https://www.penlight.org/energy-efficiency/incentives/commercial-incentives/",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": "Peninsula Light Company",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "refrigeration"
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5620",
    "opportunityName": "PG&E - Non-Residential Energy Efficiency Financing Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5620/pg-and-e-non-residential-energy-efficiency-financing-program",
    "websiteUrl": "http://pge.com/en/save-energy-and-money/energy-saving-programs/energy-efficiency-programs-for-businesses/energy-efficiency-financing.html",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Loan Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "refrigeration"
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:115",
    "opportunityName": "Power Project Loan Fund",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/115/power-project-loan-fund",
    "websiteUrl": "https://www.akenergyauthority.org/What-We-Do/Grants-Loans/Power-Project-Fund",
    "applicationUrl": null,
    "state": "AK",
    "programType": "Loan Program",
    "administrator": "Alaska Industrial Development and Export Authority",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass",
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
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5882",
    "opportunityName": "Property Tax Exemption for Renewable Energy Equipment",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5882/property-tax-exemption-for-renewable-energy-equipment",
    "websiteUrl": "https://tax.ri.gov/",
    "applicationUrl": null,
    "state": "RI",
    "programType": "Property Tax Incentive",
    "administrator": "Rhode Island Department of Revenue Division of Taxation",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass",
      "geothermal"
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
      }
    ],
    "relatedRetrofitCount": 3
  }
]
