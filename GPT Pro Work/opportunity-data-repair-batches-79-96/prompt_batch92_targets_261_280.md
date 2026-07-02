You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 261-280 from the combined repair queue after GPT Pro repair batches 1-78. It includes 20 deterministic match-confidence repair targets and 0 low source-confidence follow-up targets. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22419"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:22419".

Targets:
[
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:832",
    "opportunityName": "NorthWestern Energy - USB Renewable Energy Fund",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/832/northwestern-energy-usb-renewable-energy-fund",
    "websiteUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/e-renewable-incentives",
    "applicationUrl": null,
    "state": "MT",
    "programType": "Rebate Program",
    "administrator": "NorthWestern Energy",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5539",
    "opportunityName": "NY Green Bank",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5539/ny-green-bank",
    "websiteUrl": "http://greenbank.ny.gov/",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Other Incentive",
    "administrator": "NY Green Bank",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "load reduction"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4306",
    "opportunityName": "NYSEG (Electric) - Small Business Lighting Retrofit Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4306/nyseg-electric-small-business-lighting-retrofit-program",
    "websiteUrl": "https://www.nyseg.com/smartenergy/businesssolutions/smallbusinessdirectinstall",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "lighting retrofit"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:918",
    "opportunityName": "Office of Indian Energy Policy and Programs - Funding Opportunities",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/918/office-of-indian-energy-policy-and-programs-funding-opportunities",
    "websiteUrl": "https://www.energy.gov/indianenergy/office-indian-energy-policy-and-programs",
    "applicationUrl": null,
    "state": "US",
    "programType": "Grant Program",
    "administrator": "U.S. Department of Energy",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3638",
    "opportunityName": "OGE - Commercial Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3638/oge-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.oge.com/wps/portal/ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency/!ut/p/z1/pZJNT4NAEIZ_Sw8cZUd2WdAblgpFEoppKe7FgCLFUJawUP6-60eiSKVpnNPO5HlnZt8MYihGrEoORZ60Ba-SUuYPjD5qrk1dz4HADO4JhDeXWLu1XRzoBG2HQEA8KgHftOebNZ",
    "applicationUrl": null,
    "state": "AR",
    "programType": "Rebate Program",
    "administrator": "OGE Energy Corp",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "fixture"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22568",
    "opportunityName": "Oklahoma Municipal Power Authority - Turn Down the Watts",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22568/oklahoma-municipal-power-authority-turn-down-the-watts",
    "websiteUrl": "https://www.ompa.com/services/rebate-programs/",
    "applicationUrl": null,
    "state": "OK",
    "programType": "Rebate Program",
    "administrator": "Oklahoma Municipal Power Authority",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "demand response"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_code_title_hash:OK30F:e57fdd96f549",
    "opportunityName": "Oklahoma Municipal Power Authority - WISE Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "OK",
    "programType": "unknown",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "air sealing"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22479",
    "opportunityName": "Oncor Electric Delivery - Commercial Solar Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22479/oncor-electric-delivery-commercial-solar-program",
    "websiteUrl": "https://www.oncor.com/takealoadofftexas/pages/commercial-solar",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Oncor Electric Delivery",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "photovoltaic"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22659",
    "opportunityName": "Oregon - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22659/oregon-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.oregon.gov/odot/climate/pages/nevi.aspx",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Grant Program",
    "administrator": "Oregon Department of Transportation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2867",
    "opportunityName": "Orlando Utilities Commission - Solar Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2867/orlando-utilities-commission-solar-programs",
    "websiteUrl": "https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Performance-Based Incentive",
    "administrator": "Orlando Utilities Commission (OUC)",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "solar thermal"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2287",
    "opportunityName": "Priority Permit Processing for Green Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2287/priority-permit-processing-for-green-buildings",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "HI",
    "programType": "Green Building Incentive",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "leed"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3036",
    "opportunityName": "Property Tax Abatement for Solar Electric Systems",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3036/property-tax-abatement-for-solar-electric-systems",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "NC",
    "programType": "Property Tax Incentive",
    "administrator": "N.C. Department of Revenue",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "photovoltaic",
      "pv system"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4946",
    "opportunityName": "Property Tax Exemption for Renewable Energy Generation Facilities",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4946/property-tax-exemption-for-renewable-energy-generation-facilities",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "NE",
    "programType": "Property Tax Incentive",
    "administrator": "Nebraska Department of Revenue",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2786",
    "opportunityName": "Property Tax Exemption for Wind, Solar, and Geothermal Energy Producers",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2786/property-tax-exemption-for-wind-solar-and-geothermal-energy-producers",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "ID",
    "programType": "Property Tax Incentive",
    "administrator": "Idaho State Tax Commission",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "geothermal"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2844",
    "opportunityName": "Puerto Rico - Excise Tax Exemption for Farmers",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2844/puerto-rico-excise-tax-exemption-for-farmers",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "PR",
    "programType": "Sales Tax Incentive",
    "administrator": "Departmento de Hacienda",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "solar thermal"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:310",
    "opportunityName": "Puerto Rico - Industry Tax Incentives",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/310/puerto-rico-industry-tax-incentives",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "PR",
    "programType": "Industry Recruitment/Support",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3182",
    "opportunityName": "Puerto Rico - Sales and Use Tax Exemption for Solar Equipment",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3182/puerto-rico-sales-and-use-tax-exemption-for-solar-equipment",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "PR",
    "programType": "Sales Tax Incentive",
    "administrator": "Energy Affairs Administration",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "solar thermal"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4217",
    "opportunityName": "Qualified Energy Property Tax Exemption for Projects 250 kW or Less",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4217/qualified-energy-property-tax-exemption-for-projects-250-kw-or-less",
    "websiteUrl": "https://development.ohio.gov/business/state-incentives/qualified-energy-project-tax-exemption",
    "applicationUrl": null,
    "state": "OH",
    "programType": "Property Tax Incentive",
    "administrator": "Ohio Development Services Agency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4605",
    "opportunityName": "Reading Municipal Light Department - Residential and Small Commercial Solar Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4605/reading-municipal-light-department-residential-and-small-commercial-solar-rebate-program",
    "websiteUrl": "https://www.rmld.com/efficiency-electrification-programs/renewable-generation",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Reading Municipal Light Department",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "photovoltaic",
      "solar photovoltaic"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:d049d8b8e95077d7:recharge-rebate",
    "opportunityName": "ReCharge Rebate",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/smart-energy-solar/evs-for-business",
    "websiteUrl": "https://www.sce.com/business/smart-energy-solar/evs-for-business",
    "applicationUrl": "https://commercialevrebates.sce.com/consumer/recharge",
    "state": "CA",
    "programType": "rebate",
    "administrator": "Southern California Edison",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
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
  }
]
