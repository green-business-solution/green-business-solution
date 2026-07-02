You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 241-260 from the combined repair queue after GPT Pro repair batches 1-78. It includes 20 deterministic match-confidence repair targets and 0 low source-confidence follow-up targets. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:832"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:832".

Targets:
[
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22563",
    "opportunityName": "Making Solar Equitable Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22563/making-solar-equitable-program",
    "websiteUrl": "https://www.energytrust.org/incentives/making-solar-equitable/#tab-two",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Energy Trust of Oregon",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "battery storage"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4798",
    "opportunityName": "Mass Save (Electric) - Large Commercial Retrofit Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4798/mass-save-electric-large-commercial-retrofit-program",
    "websiteUrl": "https://www.masssave.com/business/programs-and-services/deep-energy-retrofit",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Cape Light Compact, Unitil, National Grid, NSTAR, Western Massachusets Electric",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "commissioning"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22185",
    "opportunityName": "MassEVIP Fleets Charging Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22185/massevip-fleets-charging-program",
    "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-fleets-incentives",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Grant Program",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "electric vehicle charging"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
    "opportunityName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22647/michigan-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi",
    "applicationUrl": null,
    "state": "MI",
    "programType": "Grant Program",
    "administrator": "Michigan Department of Transportation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4521",
    "opportunityName": "Michigan Local PACE Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4521/michigan-local-pace-program",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "MI",
    "programType": "PACE Financing",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "electric vehicle charging"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3187",
    "opportunityName": "Midwest Energy (Gas and Electric) - How$mart Energy Efficiency Finance Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3187/midwest-energy-gas-and-electric-how-mart-energy-efficiency-finance-program",
    "websiteUrl": "https://www.mwenergy.com/environmental/energy-efficiency/howsmart",
    "applicationUrl": null,
    "state": "KS",
    "programType": "Loan Program",
    "administrator": "Midwest Energy",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22639",
    "opportunityName": "Mississippi - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22639/mississippi-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://mdot.ms.gov/portal/electric_vehicle_charging_infrastructure",
    "applicationUrl": null,
    "state": "MS",
    "programType": "Grant Program",
    "administrator": "Mississippi Department of Transportation",
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
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22606",
    "opportunityName": "Mississippi Power - Battery Storage Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22606/mississippi-power-battery-storage-incentive-program",
    "websiteUrl": "https://www.mississippipower.com/residential/pricing---rates.html",
    "applicationUrl": null,
    "state": "MS",
    "programType": "Rebate Program",
    "administrator": "Mississippi Power",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "battery storage",
      "storage system"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22648",
    "opportunityName": "Missouri - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22648/missouri-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.modot.org/sites/default/files/documents/NEVI%20Plan%20update%202023_Revised_Sept2023Final.pdf",
    "applicationUrl": null,
    "state": "MO",
    "programType": "Grant Program",
    "administrator": "Missouri Department of Transportation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22656",
    "opportunityName": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22656/montana-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://deq.mt.gov/energy/Programs/fuels",
    "applicationUrl": null,
    "state": "MT",
    "programType": "Grant Program",
    "administrator": "Montana Department of Environmental Quality",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3107",
    "opportunityName": "Montgomery County - Property Tax Credit – Renewable Energy (Energy Conservation Devices)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3107/montgomery-county-property-tax-credit-renewable-energy-energy-conservation-devices",
    "websiteUrl": "https://www.montgomerycountymd.gov/finance/taxes/tax_credit_exempt.html#p19",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Property Tax Incentive",
    "administrator": "Montgomery County Department of Finance",
    "availabilityStatus": "active",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3246",
    "opportunityName": "Montgomery County - Property Tax Credits for Newly Constructed Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3246/montgomery-county-property-tax-credits-for-newly-constructed-buildings",
    "websiteUrl": "https://www.montgomerycountymd.gov/DEP/energy/commercial/property-tax-credit-mc-incentive.html",
    "applicationUrl": null,
    "state": "MD",
    "programType": "Property Tax Incentive",
    "administrator": "Department of Finance",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22044",
    "opportunityName": "Multifamily Navigator Pre-Development Energy Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22044/multifamily-navigator-pre-development-energy-loan-program",
    "websiteUrl": "https://inclusiveprosperitycapital.org/products/navigator/",
    "applicationUrl": null,
    "state": "CT",
    "programType": "Loan Program",
    "administrator": "Inclusive Prosperity Capital",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "benchmarking"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "building_benchmarking_compliance",
        "displayName": "Building benchmarking compliance",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22777",
    "opportunityName": "Municipal Opportunities for Retrofits and Energy Efficiency (MORE) Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22777/municipal-opportunities-for-retrofits-and-energy-efficiency-more-program",
    "websiteUrl": "https://www.pa.gov/agencies/dep/programs-and-services/energy-programs-office/financial-options/energy-accelerator-program/municipal-opportunities-for-retrofits-and-energy-efficiency",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Loan Program",
    "administrator": "National Energy Improvement Fund",
    "availabilityStatus": "rolling",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
    "opportunityName": "National Electric Vehicle Infrastructure (NEVI) Program",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
    "websiteUrl": "https://www.sdge.com/node/23891",
    "applicationUrl": "https://www.sdge.com/node/23891",
    "state": "CA",
    "programType": "technical_assistance",
    "administrator": "SDG&E",
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
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22631",
    "opportunityName": "Nevada - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22631/nevada-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.dot.nv.gov/mobility/alternative-fueling-infrastructure-plan",
    "applicationUrl": null,
    "state": "NV",
    "programType": "Grant Program",
    "administrator": "Nevada Department of Transportation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22640",
    "opportunityName": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22640/new-hampshire-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure",
    "applicationUrl": null,
    "state": "NH",
    "programType": "Grant Program",
    "administrator": "New Hampshire Department of Transportation",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3142",
    "opportunityName": "New Homes Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3142/new-homes-incentive-program",
    "websiteUrl": "https://insider.energytrust.org/programs/eps-new-construction/eps-for-allies/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Energy Trust of Oregon",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2042",
    "opportunityName": "North Arkansas Electric Cooperative, Inc - Energy Efficiency Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2042/north-arkansas-electric-cooperative-inc-energy-efficiency-loan-program",
    "websiteUrl": "http://www.naeci.com/eecl",
    "applicationUrl": null,
    "state": "AR",
    "programType": "Loan Program",
    "administrator": "North Arkansas Electric Cooperative",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22658",
    "opportunityName": "North Dakota - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22658/north-dakota-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.dot.nd.gov/nevi",
    "applicationUrl": null,
    "state": "ND",
    "programType": "Grant Program",
    "administrator": "North Dakota Department of Transportation",
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
  }
]
