You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 46-60 from the current unrepaired low-confidence opportunity-data queue after GPT Pro repair batches 1-48. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5791"
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 15.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is "SOURCE_DSIRE:dsire_program_id:5791".

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3684",
    "opportunityName": "City and County of Honolulu - Real Property Tax Exemption for Renewable Energy Property",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3684/city-and-county-of-honolulu-real-property-tax-exemption-for-renewable-energy-property",
    "websiteUrl": "https://energy.hawaii.gov/what-we-do/financial-assistance-and-grants/financial-assistance-resources/income-guidelines-and-tax-resources/",
    "applicationUrl": null,
    "state": "HI",
    "programType": "Property Tax Incentive",
    "administrator": "City and County of Honolulu, Real Property Tax Assessment Division",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
    "opportunityName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5558/city-of-aspen-and-pitkin-county-renewable-energy-mitigation-program-grants",
    "websiteUrl": "http://aspencore.org/grants/",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Grant Program",
    "administrator": "Community Office for Resource Efficiency",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22602",
    "opportunityName": "Duke Energy Indiana - Electric School Bus Charging",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22602/duke-energy-indiana-electric-school-bus-charging",
    "websiteUrl": "https://www.duke-energy.com/business/products/park-and-plug/electric-school-buses?_gl=1*yb3xfn*_ga*NDkyMTYxOTIuMTY3NjkyMDEyNg..*_ga_HB58MJRNTY*MTY3Njk4MDUxMy42LjEuMTY3Njk4MDY3NC4wLjAuMA..&_ga=2.11200564.1441956738.1676920127-49216192.1676920126",
    "applicationUrl": null,
    "state": "IN",
    "programType": "Grant Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22376",
    "opportunityName": "Duquesne Light Company - PEV Bill Credit Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22376/duquesne-light-company-pev-bill-credit-program",
    "websiteUrl": "https://www.duquesnelight.com/energy-money-savings/electric-vehicles",
    "applicationUrl": null,
    "state": "PA",
    "programType": "Rebate Program",
    "administrator": null,
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22194",
    "opportunityName": "E-ZPass Minnesota Electric Vehicle Incentive",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22194/e-zpass-minnesota-electric-vehicle-incentive",
    "websiteUrl": "https://www.dot.state.mn.us/ezpassmn/news.html",
    "applicationUrl": null,
    "state": "MN",
    "programType": "Other Incentive",
    "administrator": "Minnesota Department of Transportation",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22174",
    "opportunityName": "Electric Vehicle Fleet Fee Exemption",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22174/electric-vehicle-fleet-fee-exemption",
    "websiteUrl": "https://www.ilga.gov/legislation/ilcs/fulltext.asp?DocName=041501200K35",
    "applicationUrl": null,
    "state": "IL",
    "programType": "Other Incentive",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22156",
    "opportunityName": "Electric Vehicle Income Tax Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22156/electric-vehicle-income-tax-credit",
    "websiteUrl": "https://evco.colorado.gov/whats-new/ev-tax-credit-eligibility",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Personal Tax Credit",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22181",
    "opportunityName": "Electric Vehicle Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22181/electric-vehicle-rebate-program",
    "websiteUrl": "https://www.efficiencymaine.com/electric-vehicle-rebates/",
    "applicationUrl": null,
    "state": "ME",
    "programType": "Rebate Program",
    "administrator": "Efficiency Maine",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1271",
    "opportunityName": "Energy-Efficient Commercial Buildings Tax Deduction",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1271/energy-efficient-commercial-buildings-tax-deduction",
    "websiteUrl": "https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction",
    "applicationUrl": null,
    "state": "US",
    "programType": "Corporate Tax Deduction",
    "administrator": "U.S. Internal Revenue Service",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3869",
    "opportunityName": "Florida PACE programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3869/florida-pace-programs",
    "websiteUrl": "https://floridapace.gov/about-pace/",
    "applicationUrl": null,
    "state": "FL",
    "programType": "PACE Financing",
    "administrator": "Programs administered locally",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3870",
    "opportunityName": "Hawaii C-PACE program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3870/hawaii-c-pace-program",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "HI",
    "programType": "PACE Financing",
    "administrator": "Programs administered locally",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22734",
    "opportunityName": "Hingham Municipal Lighting Plant Solar Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22734/hingham-municipal-lighting-plant-solar-rebate-program",
    "websiteUrl": "https://www.hmlp.com/rebates/solar/",
    "applicationUrl": null,
    "state": "MA",
    "programType": "Rebate Program",
    "administrator": "Hingham Municipal Lighting Plant",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22652",
    "opportunityName": "Idaho Commercial PACE Financing Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22652/idaho-commercial-pace-financing-program",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "ID",
    "programType": "PACE Financing",
    "administrator": null,
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3626",
    "opportunityName": "Illinois PACE Financing Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3626/illinois-pace-financing-program",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "IL",
    "programType": "PACE Financing",
    "administrator": "Programs administered locally",
    "availabilityStatus": "rolling",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3294",
    "opportunityName": "Kansas City Board of Public Utilities - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3294/kansas-city-board-of-public-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.bpu.com/ForBusiness.aspx",
    "applicationUrl": null,
    "state": "KS",
    "programType": "Rebate Program",
    "administrator": "Kansas City Board of Public Utilities",
    "availabilityStatus": "active",
    "lowestConfidence": 0.68,
    "matchBases": [
      "canonical_technology_fallback"
    ],
    "matchedTerms": [],
    "relatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      }
    ],
    "relatedRetrofitCount": 1
  }
]
