You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 361-380 from the current unrepaired low-confidence opportunity-data queue after GPT Pro repair batches 1-58. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1773"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:1773".

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22558",
    "opportunityName": "Emerald PUC Electric Vehicle Charger Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22558/emerald-puc-electric-vehicle-charger-rebate-program",
    "websiteUrl": "https://epud.chooseev.com/promos/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": null,
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_19551",
    "opportunityName": "Emergency Load Reduction Program (ELRP)",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
    "websiteUrl": "https://www.sdge.com/node/19551",
    "applicationUrl": "https://www.sdge.com/node/19551",
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
      "energy management",
      "load reduction"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5448",
    "opportunityName": "Energize Delaware - Low Interest Commercial Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5448/energize-delaware-low-interest-commercial-loan-program",
    "websiteUrl": "https://www.energizedelaware.org/nonresidential/business/low-interest-commercial-loan/",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Loan Program",
    "administrator": "Energize Delaware",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "audit",
      "feasibility study"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "engineering_feasibility_study",
        "displayName": "Engineering feasibility study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22580",
    "opportunityName": "Energy Storage Solutions Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22580/energy-storage-solutions-program",
    "websiteUrl": "https://energystoragect.com/",
    "applicationUrl": null,
    "state": "CT",
    "programType": "Rebate Program",
    "administrator": "Connecticut Green Bank",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "battery storage",
      "energy storage",
      "resilience",
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
        "retrofitTypeId": "resilience_backup_power_system",
        "displayName": "Resilience / backup power system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22605",
    "opportunityName": "Entergy Mississippi - Residential Demand Response Battery Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22605/entergy-mississippi-residential-demand-response-battery-incentive-program",
    "websiteUrl": "https://www.entergy-mississippi.com/your_home/tariffs/",
    "applicationUrl": null,
    "state": "MS",
    "programType": "Rebate Program",
    "administrator": "Entergy Mississippi",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "battery storage",
      "demand response",
      "storage system"
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5793",
    "opportunityName": "Entergy Mississippi- Residential Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5793/entergy-mississippi-residential-energy-efficiency-program",
    "websiteUrl": "http://www.entergy-mississippi.com/your_home/save_money/EE/residential-solutions.aspx",
    "applicationUrl": null,
    "state": "MS",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "audit",
      "ductless",
      "energy audit",
      "heat pump",
      "mini split"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22373",
    "opportunityName": "Eugene Water & Electric Board - Electric Vehicle Charging Station Smart Charge Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22373/eugene-water-and-electric-board-electric-vehicle-charging-station-smart-charge-program",
    "websiteUrl": "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22325",
    "opportunityName": "Eversource - Commercial Electric Vehicle Charging Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22325/eversource-commercial-electric-vehicle-charging-program",
    "websiteUrl": "https://www.eversource.com/content/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Eversource",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "electric vehicle charging",
      "evse",
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
      }
    ],
    "relatedRetrofitCount": 2
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "battery storage",
      "demand response",
      "storage system"
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
      }
    ],
    "relatedRetrofitCount": 2
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2526",
    "opportunityName": "EWEB - Solar Electric Program (Rebate)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2526/eweb-solar-electric-program-rebate",
    "websiteUrl": "https://www.eweb.org/environment-and-climate/solar-electric",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Eugene Water & Electric Board",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "metering",
      "photovoltaic",
      "solar photovoltaic",
      "solar pv"
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
      }
    ],
    "relatedRetrofitCount": 2
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
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
      "electric vehicle charging",
      "zoning"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
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
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22118",
    "opportunityName": "Florida Keys Electric Cooperative - Solar Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22118/florida-keys-electric-cooperative-solar-loan-program",
    "websiteUrl": "https://fkec.com/green-power/solar-loan-program/",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Loan Program",
    "administrator": "Florida Keys Electric Cooperative",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "battery storage",
      "photovoltaic",
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
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2905",
    "opportunityName": "Florida Power and Light - Residential Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2905/florida-power-and-light-residential-energy-efficiency-program",
    "websiteUrl": "https://www.fpl.com/save/programs.html",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "Florida Power and Light",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "air conditioning",
      "insulation"
    ],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22703",
    "opportunityName": "Forest Grove Light & Power -  Residential Solar Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22703/forest-grove-light-and-power-residential-solar-rebate-program",
    "websiteUrl": "https://www.forestgrove-or.gov/213/Net-Metering-Residential-Solar",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Forest Grove Light & Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "metering",
      "photovoltaic",
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5858",
    "opportunityName": "Garland Power & Light - EnergySaver Solar Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5858/garland-power-and-light-energysaver-solar-rebate-program",
    "websiteUrl": "https://www.gpltexas.org/residential/solar-installation-requirements",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Garland Power & Light",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "metering",
      "photovoltaic",
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
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607",
    "opportunityName": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
    "sourceName": "California Energy Commission",
    "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
    "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
    "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
    "state": "CA",
    "programType": "grant",
    "administrator": "California Energy Commission",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ev charging",
      "fuel cell"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 2
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22280",
    "opportunityName": "Glendale Water and Power - Electric Vehicle Charging Station Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22280/glendale-water-and-power-electric-vehicle-charging-station-rebate-program",
    "websiteUrl": "https://www.glendaleca.gov/government/departments/glendale-water-and-power/electric-vehicles",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Glendale Water and Power",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1106",
    "opportunityName": "GMP Cow Power",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1106/gmp-cow-power",
    "websiteUrl": "https://greenmountainpower.com/help/cow-power/",
    "applicationUrl": null,
    "state": "VT",
    "programType": "Performance-Based Incentive",
    "administrator": "Green Mountain Power Corporation",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass",
      "metering"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22404",
    "opportunityName": "Green Mountain Power EV Charging Station Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22404/green-mountain-power-ev-charging-station-program",
    "websiteUrl": "https://greenmountainpower.com/rebates-programs/electric-vehicles/in-home-ev-charger/",
    "applicationUrl": null,
    "state": "VT",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
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
  }
]
