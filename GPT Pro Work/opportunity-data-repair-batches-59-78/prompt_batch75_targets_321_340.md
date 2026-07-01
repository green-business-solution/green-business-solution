You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 321-340 from the current unrepaired low-confidence opportunity-data queue after GPT Pro repair batches 1-58. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4213"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:4213".

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22357",
    "opportunityName": "Barron Electric Cooperative - Electric Vehicle Charging Station Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22357/barron-electric-cooperative-electric-vehicle-charging-station-rebate",
    "websiteUrl": "https://www.barronelectric.com/2024-energy-rebates",
    "applicationUrl": null,
    "state": "WI",
    "programType": "Rebate Program",
    "administrator": "Barron Electric Cooperative",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
      "electric vehicle charging",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22298",
    "opportunityName": "Black Hills Energy - Ready EV Electric Vehicle Charging Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22298/black-hills-energy-ready-ev-electric-vehicle-charging-rebate",
    "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/ready-ev/electric-vehicle-charging-rebate-your-home",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": "Black Hills Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "electric vehicle charging",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22324",
    "opportunityName": "Braintree Electric Light Department - Bring Your Own Charger Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22324/braintree-electric-light-department-bring-your-own-charger-program",
    "websiteUrl": "https://braintree-ev.ene.org/ev-charging-guide/#rebates-incentives",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Braintree Electric Light Department",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
      "evse",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:ef0850c0e097a7f9:building-operator-certification-training-scholarships",
    "opportunityName": "Building Operator Certification Training Scholarships",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/building-operator-certification-training-scholarships",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/building-operator-certification-training-scholarships",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/81658/638882619359170000",
    "state": "CA",
    "programType": "grant",
    "administrator": "Silicon Valley Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "fixture",
      "level ii"
    ],
    "relatedRetrofits": [
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22150",
    "opportunityName": "California Electric Vehicle Infrastructure Project (CALeVIP)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22150/california-electric-vehicle-infrastructure-project-calevip",
    "websiteUrl": "https://calevip.org/",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "electric vehicle charging",
      "window"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_555",
    "opportunityName": "Capacity Bidding Program (CBP)",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
    "websiteUrl": "https://www.sdge.com/node/555",
    "applicationUrl": "https://www.sdge.com/node/555",
    "state": "CA",
    "programType": "demand_response",
    "administrator": "SDG&E",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "demand response",
      "energy management"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22414",
    "opportunityName": "Cape Hatteras Electric Cooperative - ChargePoint Electric Vehicle Charger Residential Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22414/cape-hatteras-electric-cooperative-chargepoint-electric-vehicle-charger-residential-rebate",
    "websiteUrl": "https://www.chec.coop/ev",
    "applicationUrl": null,
    "state": "NC",
    "programType": "Rebate Program",
    "administrator": "Cape Hatteras Electric Cooperative",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "evse",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22810",
    "opportunityName": "Carroll EMC - Home Charger Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22810/carroll-emc-home-charger-rebate",
    "websiteUrl": "https://carrollemc.com/ev/",
    "applicationUrl": null,
    "state": "GA",
    "programType": "Rebate Program",
    "administrator": "Carroll EMC",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3479",
    "opportunityName": "Cedar Falls Utilities - Residential New Construction Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3479/cedar-falls-utilities-residential-new-construction-program",
    "websiteUrl": "https://www.cfu.net/save-energy/residential-rebates/#construction",
    "applicationUrl": null,
    "state": "IA",
    "programType": "Rebate Program",
    "administrator": "Cedar Falls Utilities",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "air sealing",
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
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5745",
    "opportunityName": "CenterPoint Energy A/C Distributor Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5745/centerpoint-energy-a-c-distributor-program",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/ac-distributor-program.aspx?sa=ho&au=res",
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
      "air conditioning",
      "heat pump"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22370",
    "opportunityName": "Central Lincoln PUD Electric Vehicle Charging Station Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22370/central-lincoln-pud-electric-vehicle-charging-station-rebate-program",
    "websiteUrl": "https://clpud.org/energy-efficiency/ev-charging-station-rebate/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Central Lincoln PUD",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
      "electric vehicle charging",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22264",
    "opportunityName": "Chugach Electric - Residential EV Charging Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22264/chugach-electric-residential-ev-charging-program",
    "websiteUrl": "https://www.chugachelectric.com/energy-solutions/electric-vehicles",
    "applicationUrl": null,
    "state": "AK",
    "programType": "Rebate Program",
    "administrator": "Chugach Electric",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ev charging",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3148",
    "opportunityName": "Citizens Gas - Commercial Efficiency Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3148/citizens-gas-commercial-efficiency-rebates",
    "websiteUrl": "https://www.citizensenergygroup.com/My-Home/Conserve-Save/Rebates",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
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
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:943",
    "opportunityName": "City and County of Honolulu - Solar Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/943/city-and-county-of-honolulu-solar-loan-program",
    "websiteUrl": "https://www8.honolulu.gov/dcs/dcs-cad-loan-programs-for-homeowners/",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Loan Program",
    "administrator": "City and County of Honolulu",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "photovoltaic",
      "solar water heating"
    ],
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4082",
    "opportunityName": "City of Boulder - Solar Sales and Use Tax Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4082/city-of-boulder-solar-sales-and-use-tax-rebate",
    "websiteUrl": "https://bouldercolorado.gov/services/solar-tax-rebates",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Sales Tax Incentive",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "photovoltaic",
      "solar water heating"
    ],
    "relatedRetrofits": [
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3248",
    "opportunityName": "City of Chandler - Expedited Plan Review for Green Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3248/city-of-chandler-expedited-plan-review-for-green-buildings",
    "websiteUrl": "https://www.chandleraz.gov/government/departments/development-services/planning-and-zoning/green-building-program",
    "applicationUrl": null,
    "state": "AZ",
    "programType": "Green Building Incentive",
    "administrator": "City of Chandler",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "leed",
      "window"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22058",
    "opportunityName": "City of San Marcos - Commercial Lighting Retrofit Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22058/city-of-san-marcos-commercial-lighting-retrofit-program",
    "websiteUrl": "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "San Marcos Electric Utility",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "led lighting",
      "lighting control",
      "lighting controls",
      "lighting retrofit"
    ],
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2847",
    "opportunityName": "City of Tallahassee Utilities - Solar Water Heating Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2847/city-of-tallahassee-utilities-solar-water-heating-rebate",
    "websiteUrl": "http://www.talgov.com/you/you-products-home-solar-water-rebates.aspx",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "City of Tallahassee Utilities",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "audit",
      "energy audit",
      "solar water heating"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22623",
    "opportunityName": "Cleco Power - Residential EV Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22623/cleco-power-residential-ev-rebate",
    "websiteUrl": "https://www.cleco.com/residential-commercial/energy-efficiency-renewables",
    "applicationUrl": null,
    "state": "LA",
    "programType": "Rebate Program",
    "administrator": "Cleco Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ev charger",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22812",
    "opportunityName": "Cobb Electric Membership Corporation - Residential EV Charger Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22812/cobb-electric-membership-corporation-residential-ev-charger-program",
    "websiteUrl": "https://www.cobbemc.com/ev-charger-incentive",
    "applicationUrl": null,
    "state": "GA",
    "programType": "Rebate Program",
    "administrator": "Cobb EMC",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ev charger",
      "level 2",
      "level-2"
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
      }
    ],
    "relatedRetrofitCount": 2
  }
]
