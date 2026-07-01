You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 1-15 from the current unrepaired low-confidence opportunity-data queue after GPT Pro repair batches 1-38. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22542"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 15.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:22542".

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2437",
    "opportunityName": "Commercial Energy Efficiency Rebate for Existing Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2437/commercial-energy-efficiency-rebate-for-existing-buildings",
    "websiteUrl": "http://energytrust.org/commercial",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Energy Trust of Oregon",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "energy management",
      "insulation"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5424",
    "opportunityName": "ConEd (Gas and Electric) - Small Business Direct Install Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5424/coned-gas-and-electric-small-business-direct-install-program",
    "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/small-business",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "lighting controls",
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
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:496",
    "opportunityName": "Corporate Property Tax Reduction for New/Expanded Generating Facilities",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/496/corporate-property-tax-reduction-for-new-expanded-generating-facilities",
    "websiteUrl": "https://mtrevenue.gov/publications/new-or-expanding-industry-classification-application-form-cab-1/",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate",
    "opportunityName": "Customer Directed Electrification Rebate",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/77781/638886947877900000",
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
      "cogeneration",
      "fixture",
      "heat pump"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "heat recovery",
      "insulation",
      "lighting controls"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
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
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "geothermal",
      "photovoltaic",
      "solar photovoltaic",
      "solar thermal"
    ],
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 4
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
      "heat recovery"
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
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2297",
    "opportunityName": "Duke Energy - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2297/duke-energy-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver/commercial-equipment",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Rebate Program",
    "administrator": "Duke Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "insulation",
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
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22624",
    "opportunityName": "Duke Energy Florida - Commercial Charger Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22624/duke-energy-florida-commercial-charger-rebate",
    "websiteUrl": "https://www.duke-energy.com/business/products/ev-complete/charger-prep-credit",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "Duke Energy Florida",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "dc fast",
      "fast charger",
      "level 2",
      "level-2",
      "refrigeration"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3873",
    "opportunityName": "Duquesne Light Company - Commercial and Industrial Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3873/duquesne-light-company-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.duqenergyefficiency.com/business-solutions?hsCtaTracking=c4804d28-e40a-4d93-ba28-a722391fbbc3%7Cdb4edea8-f2cd-4d44-8711-d175e436bbe5",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Rebate Program",
    "administrator": "Duquesne Light Company",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "led lighting",
      "lighting controls",
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
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5324",
    "opportunityName": "Efficiency Maine Appliance Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5324/efficiency-maine-appliance-rebate-program",
    "websiteUrl": "http://www.efficiencymaine.com/at-home/appliancerebate-program/",
    "applicationUrl": null,
    "state": "ME",
    "programType": "Rebate Program",
    "administrator": "Efficiency Maine",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "clothes washer",
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3840",
    "opportunityName": "El Paso Electric Company - Small Business and Large Commercial Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3840/el-paso-electric-company-small-business-and-large-commercial-programs",
    "websiteUrl": "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "outdoor lighting",
      "refrigeration"
    ],
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
    "opportunityName": "Energy Efficiency Grant Program for Nonprofit Organizations",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000",
    "state": "CA",
    "programType": "grant",
    "administrator": "Silicon Valley Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "fixture",
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
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5789",
    "opportunityName": "Entergy (Louisiana and Gulf States) - Residential Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5789/entergy-louisiana-and-gulf-states-residential-energy-efficiency-program",
    "websiteUrl": "https://www.entergylouisiana.com/energyefficiency/residential",
    "applicationUrl": null,
    "state": "LA",
    "programType": "Rebate Program",
    "administrator": "Entergy Solutions",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ductless",
      "heat pump",
      "mini split",
      "smart thermostat",
      "thermostat",
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
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 4
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3681",
    "opportunityName": "Entergy Arkansas - CitySmart Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3681/entergy-arkansas-citysmart-energy-efficiency-program",
    "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business/citysmart",
    "applicationUrl": null,
    "state": "AR",
    "programType": "Rebate Program",
    "administrator": "Entergy Arkansas, Inc.",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "benchmarking",
      "energy management",
      "low flow"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "building_benchmarking_compliance",
        "displayName": "Building benchmarking compliance",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
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
    "relatedRetrofitCount": 4
  }
]
