You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 321-340 from the combined repair queue after GPT Pro repair batches 1-78. It includes 14 deterministic match-confidence repair targets and 6 low source-confidence follow-up targets. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

Critical distinction:
- match_confidence_repair targets: repair deterministic opportunity-to-retrofit matching data so each match is source-backed or clearly blocked/no-match.
- source_confidence_followup targets: the opportunity was already repaired, but source_confidence remained low. Do deeper official-source research and either raise confidence with stronger evidence or keep confidence low/source_inaccessible with clear reasons.
- For all targets, output the same repair schema. The output confidence field means source_confidence, not deterministic match_confidence.

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
1. Prioritize current official administrator, utility, program, application, tariff, rebate-form, program-manual, statute, regulation, or government sources.
2. Use DSIRE only as a starting clue, not as final authority when current official sources disagree.
3. Preserve categories only when current official sources support them.
4. Remove or block false-positive categories explicitly in blockers.
5. If a source supports a product-specific match, do not generalize it into a broader building category. Examples: window AC is not window replacement; pre-rinse spray valve is not broad plumbing retrofit; residential appliance rebate is not commercial kitchen equipment.
6. If EV charging, demand response, solar, financing, audit, loan, tax credit, or water conservation is a separate program, say so. Keep it only if it truly belongs to this opportunity or clearly mark the separate-program boundary.
7. For source-inaccessible records, clear unsupported eligible categories unless the current target already has source-backed categories from a recent repair and your deeper research confirms they should remain.
8. For loans or financing programs, do not force them into rebate-style categories. Describe them as financing or loan support and limit retrofit categories to what the financing program actually covers.
9. For commercial and industrial programs, do not infer residential appliances or home weatherization. For residential programs, do not infer commercial kitchen, refrigeration, motors, VFDs, or industrial measures.
10. Use snake_case strings for eligibleRetrofitCategories. It is fine to use a supplied retrofitTypeId when accurate, but narrow it when a product-specific category is more accurate.

Allowed output schema:
{
  "schemaVersion": "opportunity_data_research_repairs.v1",
  "researchedAt": "2026-07-02",
  "source": "gpt_pro",
  "repairs": [
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:...",
      "confidence": "high | medium | low",
      "availabilityStatus": "active | rolling | unavailable | upcoming | temporarily_closed | expired | source_inaccessible | unknown",
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1885"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:1885".

Targets:
[
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22621",
    "opportunityName": "U.S. Virgin Islands - VI Battery Energy Storage (VIBES) Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22621/u-s-virgin-islands-vi-battery-energy-storage-vibes-rebate-program",
    "websiteUrl": "https://energy.vi.gov/vibes/",
    "applicationUrl": null,
    "state": "VI",
    "programType": "Rebate Program",
    "administrator": "Virgin Islands Energy Office",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "energy storage"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22661",
    "opportunityName": "Utah - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22661/utah-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://udotinput.utah.gov/evplan?HTTPSRedirected=true",
    "applicationUrl": null,
    "state": "UT",
    "programType": "Grant Program",
    "administrator": "Utah Department of Transportation",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "electric vehicle charging",
      "ev charging"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22346",
    "opportunityName": "Vermont Electric Coop - Electric Forklift Bill Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22346/vermont-electric-coop-electric-forklift-bill-credit",
    "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
    "applicationUrl": null,
    "state": "VT",
    "programType": "Rebate Program",
    "administrator": "Vermont Electric Coop",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "electric forklift"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "electric_forklift_material_handling",
        "displayName": "Electric forklift / material handling equipment",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22584",
    "opportunityName": "Vermont Electric Coop - Induction Cooktop Bill Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22584/vermont-electric-coop-induction-cooktop-bill-credit",
    "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
    "applicationUrl": null,
    "state": "VT",
    "programType": "Rebate Program",
    "administrator": "Vermont Electric Coop",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "induction"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22494",
    "opportunityName": "Wakefield Municipal Gas & Light Department - Solar Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22494/wakefield-municipal-gas-and-light-department-solar-rebate-program",
    "websiteUrl": "https://wmgld.com/residential/solar-rebate-form/",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Wakefield Municipal Gas & Light Department",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "shading"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5725",
    "opportunityName": "Weatherization Assistance Program (WAP)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5725/weatherization-assistance-program-wap",
    "websiteUrl": "https://www.energy.gov/eere/wap/how-apply-weatherization-assistance",
    "applicationUrl": null,
    "state": "US",
    "programType": "Grant Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "weatherization"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5618",
    "opportunityName": "Weatherization Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5618/weatherization-program",
    "websiteUrl": "http://www.ahfc.us/efficiency/energy-programs/weatherization/",
    "applicationUrl": null,
    "state": "AK",
    "programType": "Grant Program",
    "administrator": "Alaska Housing Finance Corporation",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "weatherization"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:601",
    "opportunityName": "Wind Energy Sales Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/601/wind-energy-sales-tax-exemption",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "MN",
    "programType": "Sales Tax Incentive",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "wind turbine"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "small_wind_turbine",
        "displayName": "Small wind turbine",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22650",
    "opportunityName": "Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22650/wisconsin-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx",
    "applicationUrl": null,
    "state": "WI",
    "programType": "Grant Program",
    "administrator": "Wisconsin Department of Transportation",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "electric vehicle charging",
      "ev charging"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:234",
    "opportunityName": "Wood Energy Production Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/234/wood-energy-production-credit",
    "websiteUrl": "https://dnr.mo.gov/energy/business-industry/wood-energy-tax-credit",
    "applicationUrl": null,
    "state": "MO",
    "programType": "Corporate Tax Credit",
    "administrator": "Division of Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:46",
    "opportunityName": "Wood-Burning Heating System Deduction",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/46/wood-burning-heating-system-deduction",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "AL",
    "programType": "Personal Tax Deduction",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4079",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4079/xcel-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.xcelenergy.com/Programs_and_Rebates/Residential_Programs_and_Rebates",
    "applicationUrl": null,
    "state": "NM",
    "programType": "Rebate Program",
    "administrator": "Xcel Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "smart thermostat",
      "thermostat"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5295",
    "opportunityName": "Xcel Energy - Solar Rewards Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5295/xcel-energy-solar-rewards-program",
    "websiteUrl": "https://co.my.xcelenergy.com/s/renewable/solar-rewards",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Performance-Based Incentive",
    "administrator": "Xcel Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "window"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22182",
    "opportunityName": "Zero-Emission Vehicle School Bus Transition Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22182/zero-emission-vehicle-school-bus-transition-grant-program",
    "websiteUrl": "http://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb1255/?ys=2019rs",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Grant Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "zero emission vehicle"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "electric_vehicle_purchase",
        "displayName": "Electric vehicle purchase",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
    "opportunityName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1882/modesto-irrigation-district-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mid.org/saving-energy-money/rebates/residential-rebates/",
    "applicationUrl": "https://www.mid.org/mid-home-rebate-application/",
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Modesto Irrigation District",
    "availabilityStatus": "active",
    "source_confidence": "low",
    "match_confidence": 0.86,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch61",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch61.json",
    "recommendedNextStep": "deeper_gpt_pro_research_before_trusting_active_program",
    "currentGeography": {
      "country": "US",
      "states": [
        "CA"
      ],
      "counties": [
        "Stanislaus County"
      ],
      "cities": [
        "Modesto"
      ],
      "utilityTerritories": [
        "Modesto Irrigation District electric service territory"
      ],
      "notes": "Official MID pages indicate active residential rebates, but direct page access was limited during review."
    },
    "currentEligibleApplicantTypes": [
      "residential_electric_customer"
    ],
    "currentEligibleSectors": [
      "residential"
    ],
    "currentEligibleRetrofitCategories": [
      "high_efficiency_hvac_replacement",
      "heat_pump_hvac_retrofit",
      "heat_pump_water_heater",
      "insulation_upgrade",
      "smart_thermostat_zoning_retrofit",
      "residential_appliance_rebate",
      "energy_audit"
    ],
    "currentHardRequirements": [
      "Applicant must be an MID residential electric customer.",
      "Measures must satisfy current MID residential rebate and application rules.",
      "Smart thermostat participation may be tied to the Power Smart program.",
      "Insulation and HVAC measures must meet current equipment and pre-retrofit requirements where specified."
    ],
    "currentBlockers": [
      "Commercial kitchen, induction cooking equipment, and commercial refrigeration are unsupported for this residential record.",
      "Air filtration was not verified in accessible MID residential rebate sources.",
      "EV charger incentives appear to be a separate MID electric vehicle program and should not be matched to this home rebate unless separately verified.",
      "Window replacement was not verified from accessible current official sources."
    ],
    "currentEvidenceText": "MID sources indicate residential rebates for central air conditioning, heat pumps, heat pump water heaters, insulation, smart thermostats, appliance rebates, and energy audits.",
    "currentReasoningNotes": "Direct official page access was limited, so categories were narrowed to measures supported by accessible official MID snippets and URLs.",
    "sourceUrlsChecked": [
      "https://www.mid.org/saving-energy-money/rebates/residential-rebates/",
      "https://www.mid.org/mid-home-rebate-application/",
      "https://www.mid.org/saving-energy-money/rebates/power-smart/",
      "https://www.mid.org/saving-energy-money/rebates/power-smart/approved-thermostat-models/"
    ],
    "relatedRetrofitCount": 12,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "air_filtration_system",
        "displayName": "Air filtration system",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
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
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
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
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2399",
    "opportunityName": "Sangre De Cristo Electric Association - Energy Efficiency Credit Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2399/sangre-de-cristo-electric-association-energy-efficiency-credit-program",
    "websiteUrl": "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Energy Efficiency Credit Program",
    "administrator": "Sangre de Cristo Electric Association",
    "availabilityStatus": "active",
    "source_confidence": "low",
    "match_confidence": 0.86,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch62",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch62.json",
    "recommendedNextStep": "deeper_gpt_pro_research_before_trusting_active_program",
    "currentGeography": {
      "country": "US",
      "states": [
        "CO"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Sangre de Cristo Electric Association"
      ],
      "notes": "Direct official pages returned access errors in the browser; categories are limited to official search-result text from SDCEA pages."
    },
    "currentEligibleApplicantTypes": [
      "residential_member",
      "member_customer"
    ],
    "currentEligibleSectors": [
      "residential"
    ],
    "currentEligibleRetrofitCategories": [
      "heat_pump_hvac_retrofit",
      "heat_pump_water_heater",
      "electric_water_heater",
      "residential_heat_pump_clothes_dryer",
      "residential_induction_cooking",
      "smart_thermostat_demand_response",
      "automated_demand_response_controls",
      "level_2_ev_charger_installation",
      "managed_ev_charging",
      "water_heater_controller_demand_response"
    ],
    "currentHardRequirements": [
      "Member installation must be in SDCEA service area.",
      "Official snippets state several rebates must be requested within 90 days and are credited on the bill."
    ],
    "currentBlockers": [
      "Official pages were not fully readable, so unsupported matched items were not retained.",
      "No official evidence was found for LED lighting, refrigerator, freezer, broad HVAC replacement, or fan/blower replacement in accessible snippets.",
      "Residential induction cooktops are not commercial kitchen equipment."
    ],
    "currentEvidenceText": "SDCEA]( official snippets identify heat pump, electric water heater, heat pump clothes dryer, induction cooktop, smart thermostat, managed EV, and pilot demand-response rebates.",
    "currentReasoningNotes": "Direct official pages returned 403 or browser access errors, so this repair is conservative and excludes unsupported matched categories.",
    "sourceUrlsChecked": [
      "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/",
      "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/smart-thermostat-rebates/",
      "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/electric-vehicle-charging-equipment-rebates/"
    ],
    "relatedRetrofitCount": 11,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "efficient_fan_blower_replacement",
        "displayName": "Efficient fan/blower replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
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
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2138",
    "opportunityName": "Emerald PUD - Commercial and Industrial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2138/emerald-pud-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.epud.org/energy-efficiency/energy-incentive-programs/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Emerald People's Utility District",
    "availabilityStatus": "active",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch29",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch29.json",
    "recommendedNextStep": "deeper_gpt_pro_research_before_trusting_active_program",
    "currentGeography": {
      "country": "US",
      "states": [
        "OR"
      ],
      "counties": [
        "Lane County"
      ],
      "cities": [],
      "utilityTerritories": [
        "Emerald People's Utility District"
      ],
      "notes": "Applies to qualifying Emerald People's Utility District commercial and industrial customers in the utility district's Oregon service area."
    },
    "currentEligibleApplicantTypes": [
      "commercial_customer",
      "industrial_customer",
      "agricultural_customer",
      "non_residential_electric_customer",
      "business_customer"
    ],
    "currentEligibleSectors": [
      "commercial",
      "industrial",
      "agricultural"
    ],
    "currentEligibleRetrofitCategories": [
      "window_replacement",
      "insulation_upgrade",
      "led_lighting_retrofit",
      "lighting_controls_retrofit",
      "custom_energy_efficiency_project"
    ],
    "currentHardRequirements": [
      "Applicant must be a qualifying Emerald People's Utility District non-residential customer.",
      "Commercial and industrial incentive eligibility depends on current EPUD and Bonneville Power Administration measure requirements.",
      "Some projects may require utility coordination, contractor involvement or preapproval before installation."
    ],
    "currentBlockers": [
      "Official commercial and industrial detail pages were partially inaccessible, so unsupported legacy DSIRE categories should not be preserved without current EPUD confirmation.",
      "Do not match heat pumps, refrigeration or air compressors unless a current EPUD source verifies those measures for this program.",
      "Do not infer residential insulation, home weatherization, residential appliances or residential HVAC from this commercial and industrial program.",
      "Lighting incentives should follow BPA or EPUD calculator and measure rules."
    ],
    "currentEvidenceText": "EPUD's]( current energy incentive pages identify commercial and industrial incentive programs; official snippets support commercial shell measures and BPA-based industrial lighting incentives, but detailed pages were access-restricted.",
    "currentReasoningNotes": "Because current official details were not fully readable, this repair keeps only conservative EPUD-supported commercial shell, lighting and custom categories. Legacy DSIRE matches for heat pumps, refrigeration and air compressors should be blocked until current measure sheets are verified.",
    "sourceUrlsChecked": [
      "https://www.epud.org/energy-efficiency/energy-incentive-programs/",
      "https://www.epud.org/energy-efficiency/energy-incentive-programs/commercial-incentive-programs/",
      "https://www.epud.org/energy-efficiency/energy-incentive-programs/industrial-incentive-programs/"
    ],
    "relatedRetrofitCount": 6,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "efficient_air_compressor",
        "displayName": "Efficient air compressor",
        "parentCategory": "compressed_air_industrial",
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
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2469",
    "opportunityName": "Lane Electric Cooperative - Commercial/Residential Weatherization & Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2469/lane-electric-cooperative-commercial-residential-weatherization-and-energy-efficiency-program",
    "websiteUrl": "https://www.laneelectric.com/energy-efficiency/energy-saving-programs/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Grant Program",
    "administrator": "Lane Electric Cooperative",
    "availabilityStatus": "active",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch34",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch34.json",
    "recommendedNextStep": "deeper_gpt_pro_research_before_trusting_active_program",
    "currentGeography": {
      "country": "US",
      "states": [
        "OR"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Lane Electric Cooperative"
      ],
      "notes": "Limited to Lane Electric Cooperative members; weatherization eligibility is tied to qualifying electric heat and building type."
    },
    "currentEligibleApplicantTypes": [
      "residential_member",
      "commercial_member"
    ],
    "currentEligibleSectors": [
      "residential",
      "commercial",
      "multifamily"
    ],
    "currentEligibleRetrofitCategories": [
      "air_sealing_weatherization",
      "insulation_upgrade",
      "ductless_heat_pump",
      "heat_pump_hvac_retrofit",
      "heat_pump_water_heater"
    ],
    "currentHardRequirements": [
      "Applicant must be a Lane Electric Cooperative member.",
      "Weatherization measures require qualifying electric heat and program approval.",
      "Heat pump and related incentives require preapproval before installation.",
      "Project must meet Lane Electric and Bonneville Power Administration requirements."
    ],
    "currentBlockers": [
      "Do not match renewable energy incentives; Lane Electric indicates member renewable incentives ended January 1, 2023.",
      "Do not broaden ductless heat pump support into all HVAC replacements.",
      "Official Lane Electric pages returned access restrictions during review, so source confidence is low."
    ],
    "currentEvidenceText": "Official Lane Electric result text identifies current energy-saving, weatherization, heat pump, and heat pump water heater programs for members. The renewable-energy page states member renewable incentives ended in 2023.",
    "currentReasoningNotes": "Use low confidence because current official pages were not fully readable. Keep only categories repeatedly verified by official Lane Electric page snippets and do not preserve solar.",
    "sourceUrlsChecked": [
      "https://www.laneelectric.com/energy-efficiency/energy-saving-programs/",
      "https://www.laneelectric.com/energy-efficiency/weatherization-programs/",
      "https://www.laneelectric.com/energy-efficiency/heat-pump-program/",
      "https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/",
      "https://www.laneelectric.com/energy-efficiency/renewable-energy/member-renewable-programs/"
    ],
    "relatedRetrofitCount": 5,
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
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2297",
    "opportunityName": "Duke Energy - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2297/duke-energy-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Rebate",
    "administrator": "Duke Energy Indiana",
    "availabilityStatus": "active",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch39",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch39.json",
    "recommendedNextStep": "deeper_gpt_pro_research_before_trusting_active_program",
    "currentGeography": {
      "country": "US",
      "states": [
        "IN"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Duke Energy Indiana electric service territory"
      ],
      "notes": "Limited to qualifying Duke Energy Indiana business, school, institution, or facility accounts."
    },
    "currentEligibleApplicantTypes": [
      "business_customer",
      "commercial_customer",
      "industrial_customer",
      "institutional_customer",
      "school_customer",
      "agricultural_customer"
    ],
    "currentEligibleSectors": [
      "commercial",
      "industrial",
      "institutional",
      "education",
      "agriculture"
    ],
    "currentEligibleRetrofitCategories": [
      "led_lighting_retrofit",
      "lighting_controls_retrofit",
      "high_efficiency_hvac_replacement",
      "agricultural_equipment_efficiency",
      "custom_energy_efficiency_measure"
    ],
    "currentHardRequirements": [
      "Applicant must be a Duke Energy Indiana business or institutional electric customer.",
      "Equipment must be qualifying high-efficiency equipment under the current Smart $aver Business rules for Indiana.",
      "Project must comply with Duke Energy application, verification and incentive caps in effect for the installation date.",
      "Custom incentives require Duke Energy review and approval before relying on savings."
    ],
    "currentBlockers": [
      "Duke Energy Smart $aver detail pages returned 403 to the browser, so only categories supported by readable Duke snippets and official Duke program descriptions were retained.",
      "Do not match residential Smart $aver home rebates to this business record.",
      "Refrigeration and insulation were not retained without a readable current Duke Indiana measure list.",
      "EV charging, solar, and financing offers are separate Duke programs."
    ],
    "currentEvidenceText": "Duke’s]( official business Smart $aver pages are current but blocked to the browser; readable Duke material identifies Indiana business rebates for lighting, HVAC, agriculture and custom measures.",
    "currentReasoningNotes": "Because current Duke detail pages were inaccessible, this repair is conservative: unsupported refrigeration and insulation matches were removed rather than inferred from DSIRE.",
    "sourceUrlsChecked": [
      "https://www.duke-energy.com/business/products/smartsaver",
      "https://www.duke-energy.com/business/products/smartsaver/hvac-incentives",
      "https://www.duke-energy.com/business/products/smartsaver/chiller",
      "https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates?jur=IN01",
      "https://illumination.duke-energy.com/articles/with-lower-energy-bills-this-clinic-can-help-more-people"
    ],
    "relatedRetrofitCount": 4,
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
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1968",
    "opportunityName": "Dixie Electric Cooperative - Residential Energy Efficiency Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1968/dixie-electric-cooperative-residential-energy-efficiency-loan-program",
    "websiteUrl": "https://www.dixie.coop/energy-efficiency-program",
    "applicationUrl": null,
    "state": "AL",
    "programType": "Loan Program",
    "administrator": "Dixie Electric Cooperative",
    "availabilityStatus": "active",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51.json",
    "recommendedNextStep": "deeper_gpt_pro_research_before_trusting_active_program",
    "currentGeography": {
      "country": "US",
      "states": [
        "AL"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Dixie Electric Cooperative"
      ],
      "notes": "Applies to eligible Dixie Electric Cooperative residential members in Alabama; current detailed terms could not be fully read from the official page."
    },
    "currentEligibleApplicantTypes": [
      "residential_member",
      "homeowner"
    ],
    "currentEligibleSectors": [
      "residential"
    ],
    "currentEligibleRetrofitCategories": [
      "residential_energy_efficiency_loan",
      "heat_pump_hvac_financing",
      "high_efficiency_hvac_financing"
    ],
    "currentHardRequirements": [
      "Applicant must be an eligible Dixie Electric Cooperative residential member.",
      "Loan terms and approval requirements must be verified with the cooperative because the current official detail page was not fully accessible.",
      "Heat-pump financing is supported by official snippets, but exact specifications and credit requirements were not readable."
    ],
    "currentBlockers": [
      "This is financing, not a rebate.",
      "Do not match commercial, industrial, or agricultural measures.",
      "Do not infer biomass, refrigeration, lighting, or unrelated weatherization measures from this record.",
      "The official detail page returned access errors, so rates, caps, and current underwriting rules require administrator verification."
    ],
    "currentEvidenceText": "Official]( search snippets identify an active Co-op Energy Efficiency Loan Program and low-interest financing related to heat-pump upgrades, but the detail page returned access errors.",
    "currentReasoningNotes": "Retain heat-pump and high-efficiency HVAC only as financing categories. Confidence is low because official current terms were not readable beyond official snippets.",
    "sourceUrlsChecked": [
      "https://www.dixie.coop/energy-efficiency-program",
      "https://www.dixie.coop/manufacturedhomeprogram",
      "http://www.dixie.coop/content.cfm?id=2049&download_id=59#attached_content"
    ],
    "relatedRetrofitCount": 2,
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
    ]
  }
]
