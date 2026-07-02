You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 221-240 from the combined repair queue after GPT Pro repair batches 1-78. It includes 20 deterministic match-confidence repair targets and 0 low source-confidence follow-up targets. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22563"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:22563".

Targets:
[
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3617",
    "opportunityName": "Lakeland Electric - Commercial Conservation Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3617/lakeland-electric-commercial-conservation-rebate-program",
    "websiteUrl": "https://lakelandelectric.com/news/___commercial-customers-conservation-rebate",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": "Lakeland Electric",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
    "opportunityName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22770/leading-by-example-restoration-grant-for-solar-pv-and-decarbonized-systems",
    "websiteUrl": "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Grant Program",
    "administrator": "Massachusetts Department of Energy Resources",
    "availabilityStatus": "rolling",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5543",
    "opportunityName": "Lean and Green Michigan PACE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5543/lean-and-green-michigan-pace",
    "websiteUrl": "https://leanandgreenmi.com/about-pace/how-pace-works/",
    "applicationUrl": null,
    "state": "MI",
    "programType": "PACE Financing",
    "administrator": "Levin Energy Partners",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22241",
    "opportunityName": "Light-Duty Motor Vehicle Purchase or Lease Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22241/light-duty-motor-vehicle-purchase-or-lease-incentive-program",
    "websiteUrl": "https://www.tceq.texas.gov/airquality/terp/ld.html/",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Rebate Program",
    "administrator": "Texas Commission on Environmental Quality",
    "availabilityStatus": "active",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5567",
    "opportunityName": "Local Energy Audit Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5567/local-energy-audit-program",
    "websiteUrl": "https://www.njcleanenergy.com/lgea",
    "applicationUrl": null,
    "state": "NJ",
    "programType": "Rebate Program",
    "administrator": "New Jersey Clean Energy Program (NJCEP)",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5892",
    "opportunityName": "Local Government Energy Audit/Retrofits",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5892/local-government-energy-audit-retrofits",
    "websiteUrl": "https://www.wyoenergy.org/financing/",
    "applicationUrl": null,
    "state": "WY",
    "programType": "Grant Program",
    "administrator": "Wyoming Energy Authority",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3534",
    "opportunityName": "Local Option - County Energy District Authority",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3534/local-option-county-energy-district-authority",
    "websiteUrl": "https://oklahomacpace.org/",
    "applicationUrl": null,
    "state": "OK",
    "programType": "PACE Financing",
    "administrator": "Programs administered locally",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4252",
    "opportunityName": "Local Option - Energy Efficiency & Clean Energy Districts",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4252/local-option-energy-efficiency-and-clean-energy-districts",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "NH",
    "programType": "PACE Financing",
    "administrator": "Local community",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5747",
    "opportunityName": "Local Option - Energy Efficiency Project Bonds",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5747/local-option-energy-efficiency-project-bonds",
    "websiteUrl": "https://www.adeq.state.ar.us/energy/initiatives/performance.aspx",
    "applicationUrl": null,
    "state": "AR",
    "programType": "Bond Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "audit"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4283",
    "opportunityName": "Local Option - Energy Revolving Loan Fund",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4283/local-option-energy-revolving-loan-fund",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "MA",
    "programType": "PACE Financing",
    "administrator": "Programs administered locally",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2983",
    "opportunityName": "Local Option - Property Tax Assessment for Energy Efficient Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2983/local-option-property-tax-assessment-for-energy-efficient-buildings",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "VA",
    "programType": "Property Tax Incentive",
    "administrator": "Virginia Department of Taxation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2363",
    "opportunityName": "Local Option - Property Tax Credit for High Performance Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2363/local-option-property-tax-credit-for-high-performance-buildings",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "MD",
    "programType": "Property Tax Incentive",
    "administrator": "Programs locally administered",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:232",
    "opportunityName": "Local Option - Property Tax Credit for Renewables and Energy Conservation Devices",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/232/local-option-property-tax-credit-for-renewables-and-energy-conservation-devices",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "MD",
    "programType": "Property Tax Incentive",
    "administrator": "Programs locally administered",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5249",
    "opportunityName": "Local Option - Real Property Tax Exemption for Green Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5249/local-option-real-property-tax-exemption-for-green-buildings",
    "websiteUrl": "https://www.tax.ny.gov/research/property/assess/manuals/vol4/pt2/sec4_06/sec470.htm",
    "applicationUrl": null,
    "state": "NY",
    "programType": "Property Tax Incentive",
    "administrator": "Administered locally",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5854",
    "opportunityName": "Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5854/lodi-electric-utility-commercial-and-industrial-energy-efficiency-loan-program",
    "websiteUrl": "http://lodielectric.com/908/Commercial-Programs",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Loan Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "audit"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22707",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Bring Your Own Thermostat",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22707/louisville-gas-and-electric-and-kentucky-utilities-bring-your-own-thermostat",
    "websiteUrl": "https://www.thermostatrewards.com/lge-ku/",
    "applicationUrl": null,
    "state": "KY",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22699",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Small Business Audit and Direct Install",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22699/louisville-gas-and-electric-and-kentucky-utilities-small-business-audit-and-direct-install",
    "websiteUrl": "https://lge-ku.com/small-business-audit-self-install",
    "applicationUrl": null,
    "state": "KY",
    "programType": "Rebate Program",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
    "opportunityName": "Low Income Home Energy Assistance Program (LIHEAP)",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5712/low-income-home-energy-assistance-program-liheap",
    "websiteUrl": "https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22787",
    "opportunityName": "Low- to Moderate-Income Solar Pilot Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22787/low-to-moderate-income-solar-pilot-program",
    "websiteUrl": "https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/",
    "applicationUrl": null,
    "state": "DE",
    "programType": "Grant Program",
    "administrator": "Delaware Department of Natural Resources and Environmental Control",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22545",
    "opportunityName": "Madison Gas & Electric - Charge Ahead Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22545/madison-gas-and-electric-charge-ahead-program",
    "websiteUrl": "https://www.mge.com/our-environment/electric-vehicles/charging/charge-ahead",
    "applicationUrl": null,
    "state": "WI",
    "programType": "Performance-Based Incentive",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station"
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
