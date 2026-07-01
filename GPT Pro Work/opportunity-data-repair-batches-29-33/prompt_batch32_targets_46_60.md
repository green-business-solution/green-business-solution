You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 46-60 from the current unrepaired low-confidence opportunity-data queue after GPT Pro repair batches 1-28. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22132"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 15.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:22132".

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4527",
    "opportunityName": "Upper Peninsula Power Company - Residential Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4527/upper-peninsula-power-company-residential-programs",
    "websiteUrl": "https://ee.uppco.com/Home-Page",
    "applicationUrl": null,
    "state": "MI",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "clothes washer",
      "dishwasher",
      "freezer",
      "heat pump",
      "heat pump water heater",
      "refrigerator"
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
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
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
      }
    ],
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5819",
    "opportunityName": "Washington Gas - Residential Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5819/washington-gas-residential-rebate-program",
    "websiteUrl": "https://wgsmartsavings.com/programs-rebates/home/md",
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
      "boiler",
      "demand response",
      "furnace",
      "insulation",
      "smart thermostat",
      "thermostat"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      },
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
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2249",
    "opportunityName": "Wright-Hennepin Cooperative Electric Association - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2249/wright-hennepin-cooperative-electric-association-residential-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.whe.org/for-my-home/resources/rebates.html",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Rebate Program",
    "administrator": "Wright-Hennepin Cooperative Electric Association",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ductless",
      "electronically commutated motor",
      "geothermal",
      "ground source heat pump",
      "heat pump",
      "level 2",
      "level-2",
      "mini split"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 6
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5171",
    "opportunityName": "AEP (Central) - CitySmart Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5171/aep-central-citysmart-program",
    "websiteUrl": "https://aeptexasefficiency.com/#/",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "CLEAResult Consulting",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "air compressor",
      "benchmarking",
      "led lighting",
      "refrigeration"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "building_benchmarking_compliance",
        "displayName": "Building benchmarking compliance",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "efficient_air_compressor",
        "displayName": "Efficient air compressor",
        "parentCategory": "compressed_air_industrial",
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22775",
    "opportunityName": "Affordable Home Electrification Program (AHEP)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22775/affordable-home-electrification-program-ahep",
    "websiteUrl": "https://www.dcseu.com/affordable-home-electrification",
    "applicationUrl": null,
    "state": "DC",
    "programType": "Rebate Program",
    "administrator": "DC Sustainable Energy Utility",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "ductless",
      "electrification equipment",
      "heat pump",
      "induction",
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
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "process_electrification_equipment",
        "displayName": "Process electrification equipment",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4056",
    "opportunityName": "Agricultural Lighting and Equipment Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4056/agricultural-lighting-and-equipment-rebate-program",
    "websiteUrl": "https://www.efficiencyvermont.com/products-technologies/agricultural-equipment",
    "applicationUrl": null,
    "state": "VT",
    "programType": "Rebate Program",
    "administrator": "Efficiency Vermont",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "efficient ventilation",
      "fixture",
      "heat recovery",
      "led lighting"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "efficient_ventilation_system",
        "displayName": "Efficient ventilation system",
        "parentCategory": "indoor_air_quality_ventilation",
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5799",
    "opportunityName": "Alabama Commercial PACE financing program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5799/alabama-commercial-pace-financing-program",
    "websiteUrl": "https://www.pacenation.org/pace-programs/",
    "applicationUrl": null,
    "state": "AL",
    "programType": "PACE Financing",
    "administrator": "Alabama Department of Economic and Community Affairs",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "air sealing",
      "audit",
      "electric vehicle charging",
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4577",
    "opportunityName": "Anne Arundel County - High Performance Building Property Tax Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4577/anne-arundel-county-high-performance-building-property-tax-credit",
    "websiteUrl": "https://www.aacounty.org/finance/tax-information/tax-credits-exemptions",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Property Tax Incentive",
    "administrator": "Anne Arundel County Office of Finance",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "biomass",
      "geothermal",
      "leed"
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5853",
    "opportunityName": "Appalachian Power (Electric)- Non-Residential Energy Efficiency Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5853/appalachian-power-electric-non-residential-energy-efficiency-program",
    "websiteUrl": "http://takechargeva.com/business/default.aspx",
    "applicationUrl": null,
    "state": "VA",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "hvac controls",
      "insulation",
      "lighting controls",
      "refrigeration"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "hvac_controls_retrofit",
        "displayName": "HVAC controls retrofit",
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
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5785",
    "opportunityName": "Arkansas Oklahoma Gas (AOG) Residential Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5785/arkansas-oklahoma-gas-aog-residential-rebate-program",
    "websiteUrl": "https://www.aogc.com/energyefficiency.aspx",
    "applicationUrl": null,
    "state": "AR",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "furnace",
      "gas water heater",
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
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "high_efficiency_gas_water_heater",
        "displayName": "High-efficiency gas water heater",
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
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1659",
    "opportunityName": "Burbank Water & Power - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1659/burbank-water-and-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.burbankwaterandpower.com/conservation/residential-programs-rebates/residential-rebates",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Burbank Water & Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "freezer",
      "insulation",
      "level 2",
      "level-2",
      "refrigerator",
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5145",
    "opportunityName": "Business Energy Efficiency Rebate (Offered by 18 Utilities)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5145/business-energy-efficiency-rebate-offered-by-18-utilities",
    "websiteUrl": "http://www.brightenergysolutions.com/find-a-rebate/",
    "applicationUrl": null,
    "state": "IA",
    "programType": "Rebate Program",
    "administrator": "Bright Energy Solutions/Missouri River Energy Services",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "geothermal",
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3329",
    "opportunityName": "Butler Rural Electric Cooperative - Residential Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3329/butler-rural-electric-cooperative-residential-rebate-program",
    "websiteUrl": "https://www.butlerrural.coop/geothermal-rebates",
    "applicationUrl": null,
    "state": "OH",
    "programType": "Rebate Program",
    "administrator": "Butler Rural Electric Cooperative, Inc.",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "furnace",
      "geothermal",
      "geothermal heat pump",
      "heat pump",
      "smart thermostat",
      "thermostat"
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4858",
    "opportunityName": "Cedarburg Light & Water Utility - Commercial Shared Savings Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4858/cedarburg-light-and-water-utility-commercial-shared-savings-loan-program",
    "websiteUrl": "http://www.cedarburglightandwater.org/shared-savings-program",
    "applicationUrl": null,
    "state": "WI",
    "programType": "Loan Program",
    "administrator": "Cedarburg Light and Water Utility",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback",
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "lighting controls",
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
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
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
    "relatedRetrofitCount": 5
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3749",
    "opportunityName": "CenterPoint Energy (Gas) - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3749/centerpoint-energy-gas-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.centerpointenergy.com/services/naturalgas/business/rebatesforbusiness/MN/",
    "applicationUrl": null,
    "state": "MN",
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
      "insulation",
      "laundry",
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
    "relatedRetrofitCount": 5
  }
]
