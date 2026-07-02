You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 141-160 from the combined repair queue after GPT Pro repair batches 1-78. It includes 20 deterministic match-confidence repair targets and 0 low source-confidence follow-up targets. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3728"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:3728".

Targets:
[
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22670",
    "opportunityName": "CIty of Jacksonville - Green Building Expedited Plan Review",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22670/city-of-jacksonville-green-building-expedited-plan-review",
    "websiteUrl": "https://www.jacksonville.gov/departments/planning-and-development",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Green Building Incentive",
    "administrator": "CIty of San Diego Development Services Division",
    "availabilityStatus": "active",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22676",
    "opportunityName": "City of Memphis - PILOT Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22676/city-of-memphis-pilot-program",
    "websiteUrl": "https://ctycms.com/tn-memphis/docs/pilot-application-10252023.pdf",
    "applicationUrl": null,
    "state": "TN",
    "programType": "Property Tax Incentive",
    "administrator": "Center City Revenue Finance Corporation",
    "availabilityStatus": "active",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4916",
    "opportunityName": "City of Milwaukee - Milwaukee Shines Solar Financing",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4916/city-of-milwaukee-milwaukee-shines-solar-financing",
    "websiteUrl": "http://city.milwaukee.gov/MilwaukeeShines#.VRw1e-G86W4",
    "applicationUrl": null,
    "state": "WI",
    "programType": "Loan Program",
    "administrator": "Summit Credit Union",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "solar hot water"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4744",
    "opportunityName": "City of Philadelphia - Streamlined Solar Permitting and Fee Reduction",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4744/city-of-philadelphia-streamlined-solar-permitting-and-fee-reduction",
    "websiteUrl": "http://www.phila.gov/green/solarGuidebook.html",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Green Building Incentive",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4790",
    "opportunityName": "City of San Diego - Sustainable Building Expedited Permit Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4790/city-of-san-diego-sustainable-building-expedited-permit-program",
    "websiteUrl": "https://www.sandiego.gov/development-services/news-programs/sbep",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Green Building Incentive",
    "administrator": "City of San Diego Development Services",
    "availabilityStatus": "active",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5117",
    "opportunityName": "City of San Marcos - Distributed Generation Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5117/city-of-san-marcos-distributed-generation-rebate-program",
    "websiteUrl": "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "City of San Marcos Electric Utility (SMTXU)",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "solar pv"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3727",
    "opportunityName": "City of Sunset Valley - PV Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3727/city-of-sunset-valley-pv-rebate-program",
    "websiteUrl": "https://www.sunsetvalley.gov/residents/community-programs/rebate-programs/solar-rebate-program",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "City of Sunset Valley",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1774",
    "opportunityName": "City of Tallahassee Utilities - Grant Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1774/city-of-tallahassee-utilities-grant-programs",
    "websiteUrl": "http://www.talgov.com/you/you-products-home-index.aspx",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Grant Program",
    "administrator": "City of Tallahassee Utilities",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "insulation"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1777",
    "opportunityName": "City of Tallahassee Utilities - Solar Loans",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1777/city-of-tallahassee-utilities-solar-loans",
    "websiteUrl": "http://www.talgov.com/you/you-products-home-loans.aspx",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Loan Program",
    "administrator": "City of Tallahassee Utilities",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "audit",
      "energy audit"
    ],
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
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2735",
    "opportunityName": "Clay Electric Cooperative, Inc - Energy Smart Solar Water Heater Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2735/clay-electric-cooperative-inc-energy-smart-solar-water-heater-rebate-program",
    "websiteUrl": "https://www.clayelectric.com/energy-rebates-loans",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "Clay Electric Cooperative",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "solar water heating"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:364",
    "opportunityName": "Clean Energy Revenue Bond Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/364/clean-energy-revenue-bond-program",
    "websiteUrl": "http://www.emnrd.state.nm.us/ECMD/CleanEnergyTaxIncentives/CREB.html",
    "applicationUrl": null,
    "state": "NM",
    "programType": "Bond Program",
    "administrator": "New Mexico Finance Authority",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "chp",
      "combined heat and power"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22222",
    "opportunityName": "Clean-Burning Motor Vehicle Fuel Property Tax Credit - Personal",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22222/clean-burning-motor-vehicle-fuel-property-tax-credit-personal",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "OK",
    "programType": "Personal Tax Credit",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "fuel cell"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4220",
    "opportunityName": "Colorado Springs Utilities - Builder Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4220/colorado-springs-utilities-builder-incentive-program",
    "websiteUrl": "https://www.csu.org/Pages/BuilderIncentiveProgram.aspx",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": "Colorado Springs Utilities",
    "availabilityStatus": "active",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3232",
    "opportunityName": "Columbia Rural Electric Association - Agriculture Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3232/columbia-rural-electric-association-agriculture-energy-efficiency-rebate-program",
    "websiteUrl": "https://columbiarea.coop/rebate-offers",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": "Columbia REA",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "vfd"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com",
    "opportunityName": "Comfortably CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
    "websiteUrl": "https://www.comfortablyca.com/",
    "applicationUrl": "https://www.comfortablyca.com/",
    "state": "CA",
    "programType": "rebate",
    "administrator": "SDG&E",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "high efficiency hvac"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5650",
    "opportunityName": "Commercial and Industrial Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5650/commercial-and-industrial-grant-program",
    "websiteUrl": "http://energy.maryland.gov/business/Pages/incentives/empowermdcigp.aspx",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Grant Program",
    "administrator": "Maryland Energy Administration",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "commissioning",
      "retro commissioning",
      "retro-commissioning"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5218",
    "opportunityName": "Commercial Retro-Commissioning and New Construction Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5218/commercial-retro-commissioning-and-new-construction-program",
    "websiteUrl": "https://focusonenergy.com/business/new-construction",
    "applicationUrl": null,
    "state": "WI",
    "programType": "Rebate Program",
    "administrator": "Focus on Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "commissioning",
      "retro commissioning",
      "retro-commissioning"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22764",
    "opportunityName": "Commercial Solar Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22764/commercial-solar-grant-program",
    "websiteUrl": "https://energy.maryland.gov/business/Pages/Commercial-Solar.aspx",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Grant Program",
    "administrator": "Maryland Energy Administration",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "solar pv"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5503",
    "opportunityName": "Commercial Solar Property Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5503/commercial-solar-property-tax-exemption",
    "websiteUrl": "https://energy.virginia.gov/renewable-energy/SolarPower.shtml",
    "applicationUrl": null,
    "state": "VA",
    "programType": "Property Tax Incentive",
    "administrator": "Virginia Department Energy",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "solar pv"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22597",
    "opportunityName": "Community Solar Energy Sovereignty Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22597/community-solar-energy-sovereignty-grant-program",
    "websiteUrl": "https://www.illinoisworknet.com/CEJA/Pages/CEJACSES.aspx",
    "applicationUrl": null,
    "state": "IL",
    "programType": "Grant Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "community solar"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "community_solar_subscription",
        "displayName": "Community solar subscription",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  }
]
