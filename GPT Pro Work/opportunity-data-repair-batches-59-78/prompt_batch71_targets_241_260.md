You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 241-260 from the current unrepaired low-confidence opportunity-data queue after GPT Pro repair batches 1-58. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

Critical output rules:
- Return one valid JSON object only.
- The response must parse with JSON.parse.
- Do not wrap the response in triple backticks.
- Use raw URL strings only, such as "https://example.com/page".
- Do not use markdown link syntax anywhere.
- URL fields must not contain brackets, parentheses, escaped quote fragments, or copied markdown.
- If a search/browser UI gives a markdown link, convert it to a plain raw URL string before putting it in JSON.
- Keep each opportunityId exactly as supplied.
- Include exactly 20 repair objects, one for each supplied target, in the same order.
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
  "continueFromOpportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:heat-pump-air-conditioner-rebates-conversion-to-all-electric-heating-and-cooling"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:heat-pump-air-conditioner-rebates-conversion-to-all-electric-heating-and-cooling".

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22811",
    "opportunityName": "Cobb Electric Membership Corporation - Business EV Charger Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22811/cobb-electric-membership-corporation-business-ev-charger-grant-program",
    "websiteUrl": "https://cobbemc.com/ev-charging-business",
    "applicationUrl": null,
    "state": "GA",
    "programType": "Grant Program",
    "administrator": "Cobb EMC",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "dcfc",
      "ev charger",
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2628",
    "opportunityName": "Columbia Water & Light - Solar Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2628/columbia-water-and-light-solar-rebates",
    "websiteUrl": "https://www.como.gov/utilities/columbia-power-partners/solar/solar-rebates/",
    "applicationUrl": null,
    "state": "MO",
    "programType": "Rebate Program",
    "administrator": "Columbia Water & Light",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "metering",
      "photovoltaic",
      "shading",
      "solar photovoltaic"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22233",
    "opportunityName": "ComEd - Distributed Generation and Storage Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22233/comed-distributed-generation-and-storage-rebates",
    "websiteUrl": "https://www.comed.com/smart-energy/my-green-power-connection/solar-energy/solar-rebates",
    "applicationUrl": null,
    "state": "IL",
    "programType": "Rebate Program",
    "administrator": "Commonwealth Edison",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "community solar",
      "energy storage",
      "metering"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "community_solar_subscription",
        "displayName": "Community solar subscription",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5362",
    "opportunityName": "Commercial Scale Renewable Energy Grants (Commerce RI)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5362/commercial-scale-renewable-energy-grants-commerce-ri",
    "websiteUrl": "https://commerceri.com/renewable-energy-fund/",
    "applicationUrl": null,
    "state": "RI",
    "programType": "Grant Program",
    "administrator": "Commerce RI",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass",
      "energy storage",
      "solar carport"
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
        "retrofitTypeId": "solar_carport",
        "displayName": "Solar carport",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22329",
    "opportunityName": "Consumers Energy - PowerMIDrive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22329/consumers-energy-powermidrive-program",
    "websiteUrl": "https://www.consumersenergy.com/residential/programs-and-services/electric-vehicles/powermidrive",
    "applicationUrl": null,
    "state": "MI",
    "programType": "Rebate Program",
    "administrator": "Consumers Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "dc fast",
      "ev charger",
      "evse",
      "fast charger",
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4504",
    "opportunityName": "Delmarva Power - Home Performance with ENERGY STAR Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4504/delmarva-power-home-performance-with-energy-star-incentive-program",
    "websiteUrl": "http://homeenergysavings.delmarva.com/home-performance-with-energy-star-program",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Rebate Program",
    "administrator": "Delmarva",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "air sealing",
      "audit",
      "energy audit",
      "insulation"
    ],
    "relatedRetrofits": [
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
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22371",
    "opportunityName": "Electric Vehicle Charging Station Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22371/electric-vehicle-charging-station-rebate-program",
    "websiteUrl": "https://www.hawaiienergy.com/for-business/rebates/electric-vehicle-charging-stations",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Rebate Program",
    "administrator": "Hawaii Energy",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
      "dcfc",
      "electric vehicle charging",
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22210",
    "opportunityName": "Electric Vehicle Supply Equipment Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22210/electric-vehicle-supply-equipment-rebate-program",
    "websiteUrl": "https://jointutilitiesofny.org/ev/make-ready",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Rebate Program",
    "administrator": "New York Public Service Commission",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
      "electric vehicle charging",
      "ev charging",
      "level 2",
      "level-2",
      "make ready",
      "make-ready"
    ],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1596",
    "opportunityName": "Energy Conservation Improvements Property Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1596/energy-conservation-improvements-property-tax-exemption",
    "websiteUrl": "http://www.tax.ny.gov/research/property/assess/manuals/vol4/pt1/sec4_01/sec487_a.htm",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Property Tax Incentive",
    "administrator": "New York State Office of Real Property Tax Services",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "combined heat and power",
      "energy storage",
      "fuel cell",
      "storage system"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22072",
    "opportunityName": "Energy Conservation Improvements Property Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22072/energy-conservation-improvements-property-tax-exemption",
    "websiteUrl": "https://www.tax.ny.gov/research/property/assess/manuals/vol4/pt1/sec4_01/sec487.htm",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Property Tax Incentive",
    "administrator": "New York State Department of Taxation and Finance",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "combined heat and power",
      "energy storage",
      "fuel cell"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22317",
    "opportunityName": "Entergy (Louisiana and Gulf States) - eTech Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22317/entergy-louisiana-and-gulf-states-etech-program",
    "websiteUrl": "https://entergyetech.com/electric-vehicles/",
    "applicationUrl": null,
    "state": "LA",
    "programType": "Rebate Program",
    "administrator": "Entergy (Louisiana and Gulf States)",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "dc fast",
      "electric vehicle charging",
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22273",
    "opportunityName": "Entergy Arkansas - eTech Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22273/entergy-arkansas-etech-program",
    "websiteUrl": "https://entergyetech.com/electric-vehicles/",
    "applicationUrl": null,
    "state": "AR",
    "programType": "Rebate Program",
    "administrator": "Entergy Arkansas",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "dc fast",
      "electric vehicle charging",
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
      "dc fast",
      "ev charging",
      "evse",
      "fast charger",
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ev charging",
      "level 2",
      "level-2",
      "smart thermostat",
      "thermostat"
    ],
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
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3692",
    "opportunityName": "Florida Public Utilities - Residential HVAC Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3692/florida-public-utilities-residential-hvac-rebate-program",
    "websiteUrl": "http://www.fpuc.com/electric/residential/rebates/",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "Florida Public Utilities",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "air conditioner",
      "heat pump",
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
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2080",
    "opportunityName": "Franklin County PUD - Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2080/franklin-county-pud-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.franklinpud.com/index.php/energy-efficiency/residential-rebate-programs/",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": "Franklin County PUD",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "clothes washer",
      "insulation",
      "smart thermostat",
      "thermostat"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:978",
    "opportunityName": "Generation Facility Corporate Tax Exemptions",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/978/generation-facility-corporate-tax-exemptions",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "MT",
    "programType": "Property Tax Incentive",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22309",
    "opportunityName": "Georgia Power - Business EV Charger Plus Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22309/georgia-power-business-ev-charger-plus-rebate-program",
    "websiteUrl": "https://www.georgiapower.com/business/products-programs/business-solutions/electric-transportation-business-programs/electric-vehicle-charger-rebate.html#",
    "applicationUrl": null,
    "state": "GA",
    "programType": "Rebate Program",
    "administrator": "Georgia Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "dcfc",
      "ev charger",
      "evse",
      "fast charger",
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  },
  {
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program",
    "opportunityName": "Groceries, Restaurants and Food Storage Program",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
    "websiteUrl": "https://aesc-inc.com/groceries-restaurants-and-food-storage-program",
    "applicationUrl": "https://aesc-inc.com/groceries-restaurants-and-food-storage-program",
    "state": "CA",
    "programType": "rebate",
    "administrator": "SDG&E",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "battery storage",
      "demand response",
      "refrigeration"
    ],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3980",
    "opportunityName": "Gross Receipts Tax Exemption for Sales of Wind and Solar Systems to Government Entities",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3980/gross-receipts-tax-exemption-for-sales-of-wind-and-solar-systems-to-government-entities",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "NM",
    "programType": "Sales Tax Incentive",
    "administrator": "New Mexico Taxation & Revenue Department",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "photovoltaic",
      "solar thermal",
      "wind turbine"
    ],
    "relatedRetrofits": [
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 3
  }
]
