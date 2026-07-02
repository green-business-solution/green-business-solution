You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 201-220 from the combined repair queue after GPT Pro repair batches 1-78. It includes 20 deterministic match-confidence repair targets and 0 low source-confidence follow-up targets. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3617"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 20.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:3617".

Targets:
[
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
    "opportunityName": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
    "sourceName": "California Energy Commission",
    "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
    "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4067",
    "opportunityName": "Green Communities Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4067/green-communities-grant-program",
    "websiteUrl": "http://www.mass.gov/eea/energy-utilities-clean-tech/green-communities/gc-grant-program/",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Grant Program",
    "administrator": "Massachusetts Department of Energy Resources",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "energy management"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22564",
    "opportunityName": "Green Mountain Power Bring Your Own Device Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22564/green-mountain-power-bring-your-own-device-program",
    "websiteUrl": "https://greenmountainpower.com/rebates-programs/home-energy-storage/bring-your-own-device/",
    "applicationUrl": null,
    "state": "VT",
    "programType": "Rebate Program",
    "administrator": "Green Mountain Power",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging",
    "opportunityName": "GRID-Lodging",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
    "websiteUrl": "https://mendotagroup.com/sdge-grid-lodging",
    "applicationUrl": "https://mendotagroup.com/sdge-grid-lodging",
    "state": "CA",
    "programType": "rebate",
    "administrator": "SDG&E",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22589",
    "opportunityName": "Guam - Photovoltaic Property Tax Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22589/guam-photovoltaic-property-tax-exemption",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "GU",
    "programType": "Property Tax Incentive",
    "administrator": null,
    "availabilityStatus": "rolling",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4911",
    "opportunityName": "Harris County - Property Tax Abatement for Green Commercial Buildings",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4911/harris-county-property-tax-abatement-for-green-commercial-buildings",
    "websiteUrl": "https://hcoed.harriscountytx.gov/gbta.aspx",
    "applicationUrl": null,
    "state": "TX",
    "programType": "Property Tax Incentive",
    "administrator": "Harris County",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
    "opportunityName": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22630/hawaii-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Grant Program",
    "administrator": "Hawaii Department of Transportation",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "charging station",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22763",
    "opportunityName": "High Country Conservation - Solarize Summit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22763/high-country-conservation-solarize-summit",
    "websiteUrl": "https://highcountryconservation.org/solarize-summit/",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": null,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1337",
    "opportunityName": "Holyoke Gas & Electric - Residential Energy Assistance Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1337/holyoke-gas-and-electric-residential-energy-assistance-program",
    "websiteUrl": "https://www.hged.com/residential/ee-home/reap/default.aspx",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Loan Program",
    "administrator": "Customer Service",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5410",
    "opportunityName": "IADG Energy Bank Revolving Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5410/iadg-energy-bank-revolving-loan-program",
    "websiteUrl": "http://www.iadg.com/services/financial-assistance/iadg-energy-bank.aspx",
    "applicationUrl": null,
    "state": "IA",
    "programType": "Loan Program",
    "administrator": "Iowa Economic Development Authority and Iowa Area Development Group",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "energy management"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2030",
    "opportunityName": "Idaho Falls Power - Commercial Energy Conservation Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2030/idaho-falls-power-commercial-energy-conservation-loan-program",
    "websiteUrl": "https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business",
    "applicationUrl": null,
    "state": "ID",
    "programType": "Loan Program",
    "administrator": "Idaho Falls Power",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3086",
    "opportunityName": "IID Energy - Commercial Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3086/iid-energy-commercial-rebate-program",
    "websiteUrl": "https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate Program",
    "administrator": "Imperial Irrigation District",
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "refrigeration"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22643",
    "opportunityName": "Illinois - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22643/illinois-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://idot.illinois.gov/transportation-system/environment/drive-electric.html",
    "applicationUrl": null,
    "state": "IL",
    "programType": "Grant Program",
    "administrator": "Illinois Department of Transportation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22644",
    "opportunityName": "Indiana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22644/indiana-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://chargingthecrossroads.com/",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Grant Program",
    "administrator": "Indiana Department of Transportation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22311",
    "opportunityName": "Indiana Michigan Power - Residential Electric Vehicle Charging Rebate",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22311/indiana-michigan-power-residential-electric-vehicle-charging-rebate",
    "websiteUrl": "https://www.indianamichiganpower.com/clean-energy/electric-cars/charge-at-home-indiana",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Rebate Program",
    "administrator": "Indiana Michigan Power",
    "availabilityStatus": "active",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:industrial-assessments",
    "opportunityName": "Industrial Assessments",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/save-money",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/save-money",
    "applicationUrl": "https://sjsu.qualtrics.com/jfe/form/SV_5pOrfSrHh36gP8W",
    "state": "CA",
    "programType": "technical_assistance",
    "administrator": "Silicon Valley Power",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22751",
    "opportunityName": "JEA - Commercial Fleet Electrification Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22751/jea-commercial-fleet-electrification-program",
    "websiteUrl": "https://www.jea.com/Business_Resources/Rebates_for_Businesses/Electrification_Rebates_Program/",
    "applicationUrl": null,
    "state": "FL",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.86,
    "matchBases": [
      "text_or_source_technology"
    ],
    "matchedTerms": [
      "make ready",
      "make-ready"
    ],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ev_make_ready_electrical_upgrade",
        "displayName": "EV make-ready electrical upgrade",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  },
  {
    "repairPurpose": "match_confidence_repair",
    "instructions": "Repair deterministic matching data. The goal is to make opportunity-to-retrofit matching either source-backed or no-match.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:597",
    "opportunityName": "KIUC - Solar Water Heating Loan Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/597/kiuc-solar-water-heating-loan-program",
    "websiteUrl": "https://www.kiuc.coop/solar-water-heating-programs",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Loan Program",
    "administrator": "County of Kauai Housing Agency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:598",
    "opportunityName": "KIUC - Solar Water Heating Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/598/kiuc-solar-water-heating-rebate-program",
    "websiteUrl": "https://www.kiuc.coop/solar-water-heating-programs",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Rebate Program",
    "administrator": "Kauai Island Utility Coop",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5685",
    "opportunityName": "LADWP - Feed-in Tariff (FiT) Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5685/ladwp-feed-in-tariff-fit-program",
    "websiteUrl": "https://www.ladwp.com/fit",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Feed-in Tariff",
    "administrator": null,
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
  }
]
