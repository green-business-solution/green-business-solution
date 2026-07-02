You are researching and repairing RetroFi opportunity-data matches.

Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.

This prompt covers targets 341-354 from the combined repair queue after GPT Pro repair batches 1-78. It includes 0 deterministic match-confidence repair targets and 14 low source-confidence follow-up targets. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.

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
- Include exactly 14 repair objects, one for each supplied target, in the same order.
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
  "continueFromOpportunityId": null
}

Final validation before responding:
- JSON.parse would succeed.
- repairs.length is 14.
- The repair opportunityIds exactly match the target opportunityIds and order.
- No markdown links exist anywhere in the JSON.
- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.
- evidenceText is short and does not include URL fragments.
- continueFromOpportunityId is null.

Targets:
[
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1885",
    "opportunityName": "Modesto Irrigation District - Commercial Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1885/modesto-irrigation-district-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mid.org/saving-energy-money/rebates/business-rebates/",
    "applicationUrl": null,
    "state": "CA",
    "programType": "utility commercial, industrial, and agricultural energy efficiency rebate program",
    "administrator": "Modesto Irrigation District",
    "availabilityStatus": "unknown",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-06-29_batch1",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-06-29_batch1.json",
    "recommendedNextStep": "human_or_gpt_pro_availability_verification",
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
      "notes": "Official MID business rebate page exists but direct access returned HTTP 403 in this research environment."
    },
    "currentEligibleApplicantTypes": [
      "commercial",
      "industrial",
      "agricultural"
    ],
    "currentEligibleSectors": [
      "commercial",
      "industrial",
      "agricultural",
      "business"
    ],
    "currentEligibleRetrofitCategories": [
      "qualifying energy-efficient business equipment; specific measure list requires manual review"
    ],
    "currentHardRequirements": [
      "Official indexed MID terms indicate qualifying products must be installed at a business location receiving electricity from MID.",
      "Customer must be in good financial standing.",
      "Specific eligibility, forms, measure categories, and current availability require manual review because the official page was inaccessible."
    ],
    "currentBlockers": [
      "Source inaccessible from this environment; do not rely on DSIRE categories without checking MID's current rebate forms or contacting MID.",
      "Utility electric service and account standing must be verified."
    ],
    "currentEvidenceText": "Official MID business rebate page was indexed as offering incentives for commercial, industrial, and agricultural customers, but the live page returned HTTP 403 during review.",
    "currentReasoningNotes": "Manual review required before repairing retrofit category matches; current official source could not be fully accessed.",
    "sourceUrlsChecked": [
      "https://www.mid.org/saving-energy-money/rebates/business-rebates/"
    ],
    "relatedRetrofitCount": 15,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "air_filtration_system",
        "displayName": "Air filtration system",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "efficient_ice_machine",
        "displayName": "Efficient ice machine",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3372",
    "opportunityName": "Gunnison County Electric - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3372/gunnison-county-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.gcea.coop/energy-efficiency/rebates/",
    "applicationUrl": null,
    "state": "CO",
    "programType": "Rebate Program",
    "administrator": "Gunnison County Electric Association, Inc.",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-06-30_batch4",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-06-30_batch4.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "CO"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Gunnison County Electric Association, Inc."
      ],
      "notes": "Official rebate pages were blocked with HTTP 403, so current detailed service territory and eligibility could not be verified from official content."
    },
    "currentEligibleApplicantTypes": [],
    "currentEligibleSectors": [],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [
      "Do not infer eligibility or measures until the official GCEA rebate page or 2026 rebate form is accessible."
    ],
    "currentBlockers": [
      "Current official page https://www.gcea.coop/energy-efficiency/rebates/ returned 403 Forbidden.",
      "Legacy official page http://www.gcea.coop/content/rebates was not usable as a current readable source.",
      "Search result snippets indicated a 2026 Energy Efficiency BE EE Rebate Form and online forms, but the form itself was not accessible in the checked sources.",
      "Matched terms such as electric forklift, ENERGY STAR certification, fixtures, freezer, geothermal, induction, LED lighting, refrigerator, variable speed drive and weatherization were not retained because official current details could not be read."
    ],
    "currentEvidenceText": "The current GCEA rebates page could not be fetched because the site returned 403 Forbidden. Search snippets suggested a 2026 rebate form exists, but no official readable measure schedule was available from the checked URLs.",
    "currentReasoningNotes": "Because the primary source is inaccessible, the safe repair is to mark the record source_inaccessible and remove all category matches rather than carrying forward DSIRE or snippet-derived measure mappings.",
    "sourceUrlsChecked": [
      "https://www.gcea.coop/energy-efficiency/rebates/",
      "http://www.gcea.coop/content/rebates",
      "https://programs.dsireusa.org/system/program/detail/3372/gunnison-county-electric-residential-energy-efficiency-rebate-program"
    ],
    "relatedRetrofitCount": 12,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "electric_forklift_material_handling",
        "displayName": "Electric forklift / material handling equipment",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "energy_star_certification",
        "displayName": "ENERGY STAR certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
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
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2185",
    "opportunityName": "Tillamook County PUD - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2185/tillamook-county-pud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.tpud.org/ways-to-save/appliance-water-heater-rebates/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate Program",
    "administrator": "Tillamook County PUD",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch14",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch14.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "OR"
      ],
      "counties": [
        "Tillamook County"
      ],
      "cities": [],
      "utilityTerritories": [
        "Tillamook County PUD"
      ],
      "notes": "Service territory is Tillamook County PUD; current official rebate pages could not be read because the site returned 403 Forbidden."
    },
    "currentEligibleApplicantTypes": [],
    "currentEligibleSectors": [
      "residential"
    ],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [],
    "currentBlockers": [
      "Official Tillamook County PUD rebate pages returned 403 Forbidden, so current eligibility, measures, forms and amounts could not be verified.",
      "Do not match EV charging, submetering, furnaces, smart thermostats, weatherization, heat pumps, or heat-pump water heaters until official pages are readable.",
      "No current application URL was verified.",
      "Residential status is inferred from program title and official page snippets only."
    ],
    "currentEvidenceText": "TPUD appliance, weatherization and residential heat-pump pages appear in search results, but official pages returned 403 Forbidden when opened, preventing current verification.",
    "currentReasoningNotes": "Because current official sources were inaccessible, unsupported categories were cleared instead of relying on older DSIRE text or snippets.",
    "sourceUrlsChecked": [
      "https://www.tpud.org/ways-to-save/appliance-water-heater-rebates/",
      "https://www.tpud.org/ways-to-save/residential-weatherization-program/",
      "https://www.tpud.org/ways-to-save/heat-pump-programs/residential-heat-pump-program/",
      "https://www.tpud.org/ways-to-save/green-programs/electric-vehicle/"
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
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2132",
    "opportunityName": "Emerald PUD - Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2132/emerald-pud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.epud.org/conservation-energy-savings/residential-programs/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Residential Rebate Or Loan Support",
    "administrator": "Emerald People's Utility District",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch22",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch22.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "OR"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Emerald People's Utility District"
      ],
      "notes": "Official EPUD pages could not be read reliably; snippets indicate current EPUD heat-pump water-heater rebate or loan content but not full program eligibility."
    },
    "currentEligibleApplicantTypes": [
      "residential_customer"
    ],
    "currentEligibleSectors": [
      "residential"
    ],
    "currentEligibleRetrofitCategories": [
      "heat_pump_water_heater"
    ],
    "currentHardRequirements": [
      "Customer must be in Emerald People's Utility District service territory.",
      "Full eligibility, application, rebate amount, installation rules and funding status must be verified directly with EPUD because official pages were not accessible.",
      "Any financing element must be treated as loan support, not a rebate, unless EPUD confirms a cash rebate applies."
    ],
    "currentBlockers": [
      "Do not match clothes washers, duct sealing, ductless or ducted heat pumps, insulation, weatherization or lighting from the stale DSIRE record until current EPUD official pages are accessible.",
      "Do not infer all residential energy-efficiency categories from DSIRE where official pages are blocked.",
      "Heat-pump water-heater eligibility is only partially verified from official search snippets and needs EPUD confirmation before payment."
    ],
    "currentEvidenceText": "Official]( EPUD pages returned access errors; official snippets only verified current heat-pump water-heater rebate or loan content, not the wider residential measure list.",
    "currentReasoningNotes": "Marked source_inaccessible because current official sources could not be read well enough to verify the full DSIRE-derived residential program. Unsupported categories were cleared except the specifically observed HPWH measure.",
    "sourceUrlsChecked": [
      "https://www.epud.org/conservation-energy-savings/residential-programs/",
      "https://www.epud.org/energy-efficiency/energy-incentive-programs/residential-incentive-programs/",
      "https://www.epud.org/res-hpwh-inc/",
      "https://www.epud.org/news-releases/get-a-heat-pump-water-heater-for-144/"
    ],
    "relatedRetrofitCount": 8,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2199",
    "opportunityName": "Mason County PUD 3 - Commercial and Industrial Energy Rebates",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2199/mason-county-pud-3-commercial-and-industrial-energy-rebates",
    "websiteUrl": "https://www.pud3.org/ways-to-save/rebates-incentives/",
    "applicationUrl": null,
    "state": "WA",
    "programType": "Rebate Program",
    "administrator": "Mason County PUD 3",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch30",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch30.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "WA"
      ],
      "counties": [
        "Mason"
      ],
      "cities": [],
      "utilityTerritories": [
        "Mason County PUD 3"
      ],
      "notes": "Official rebate and FAQ pages were identified for Mason County PUD 3 but could not be read well enough to verify current commercial and industrial measure eligibility."
    },
    "currentEligibleApplicantTypes": [],
    "currentEligibleSectors": [],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [],
    "currentBlockers": [
      "Official PUD 3 rebate and FAQ pages returned access errors in the browser.",
      "Do not match residential appliance, insulation, thermostat, or heat-pump snippets to this commercial and industrial target without readable current official sources.",
      "Outdoor lighting, heat pump water heater, insulation, thermostat, and commercial HVAC categories were not verified from an accessible current official source."
    ],
    "currentEvidenceText": "PUD 3 official rebate and FAQ pages returned 403 access errors. Search snippets mention commercial heat-pump inquiries but do not expose current C&I eligibility or requirements.",
    "currentReasoningNotes": "Because official sources were inaccessible, unsupported categories were cleared rather than inferred from snippets or DSIRE.",
    "sourceUrlsChecked": [
      "https://www.pud3.org/ways-to-save/rebates-incentives/",
      "https://www.pud3.org/faqs/heat-pump-incentives/",
      "https://www.pud3.org/faqs/ductless-heat-pump-incentives/",
      "https://www.pud3.org/faqs/appliance-incentives/",
      "https://www.pud3.org/faqs/insulation-incentives/",
      "https://programs.dsireusa.org/system/program/detail/2199/mason-county-pud-3-commercial-and-industrial-energy-rebates"
    ],
    "relatedRetrofitCount": 6,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "exterior_site_lighting_retrofit",
        "displayName": "Exterior/site lighting retrofit",
        "parentCategory": "lighting",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4198",
    "opportunityName": "Northern Lights Inc. - Energy Conservation Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4198/northern-lights-inc-energy-conservation-rebate-program",
    "websiteUrl": "https://www.nli.coop/save/rebates/",
    "applicationUrl": null,
    "state": "ID",
    "programType": "Rebate Program",
    "administrator": "Northern Lights Inc.",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-06-30_batch9",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-06-30_batch9.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "ID"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Northern Lights Inc. electric service territory"
      ],
      "notes": "Target record is Idaho, but current official rebate content was blocked, so detailed service-territory and measure eligibility could not be verified from a readable primary source."
    },
    "currentEligibleApplicantTypes": [],
    "currentEligibleSectors": [],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [
      "Do not infer eligible applicants, sectors or measures until the current Northern Lights Inc. rebate page or current rebate forms are accessible."
    ],
    "currentBlockers": [
      "The current official rebate page https://www.nli.coop/save/rebates/ returned 403 Forbidden.",
      "Official NLI measure pages checked for clothes washer and smart thermostat also returned 403 Forbidden.",
      "Matched categories heat pump, mini split, ductless, geothermal, smart thermostat, thermostat, showerhead and clothes washer were not retained because current official measure details could not be read.",
      "DSIRE was checked only as a starting clue and is not sufficient to preserve current retrofit-category mappings."
    ],
    "currentEvidenceText": "The official Northern Lights Inc. rebate URLs checked were inaccessible with 403 Forbidden responses, so no current official measure table, application form or eligibility language could be verified.",
    "currentReasoningNotes": "Marked source_inaccessible and cleared categories to avoid carrying forward DSIRE-only or search-snippet-derived matches.",
    "sourceUrlsChecked": [
      "https://www.nli.coop/save/rebates/",
      "https://www.nli.coop/rebate-clothes-washer/",
      "https://www.nli.coop/smart-thermostat-rebate/",
      "https://programs.dsireusa.org/system/program/detail/4198/northern-lights-inc-energy-conservation-rebate-program"
    ],
    "relatedRetrofitCount": 6,
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2466",
    "opportunityName": "City of Chicago - Green Building Permit Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2466/city-of-chicago-green-building-permit-programs",
    "websiteUrl": "https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits/svcs/green-permits.html",
    "applicationUrl": "https://www.chicago.gov/city/en/depts/bldgs/provdrs/e_plan.html",
    "state": "IL",
    "programType": "Green Building Permit Incentive",
    "administrator": "City of Chicago Department of Buildings",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.86,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch67",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch67.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "IL"
      ],
      "counties": [],
      "cities": [
        "Chicago"
      ],
      "utilityTerritories": [],
      "notes": "Official City green-permit content could not be read well enough to verify current eligibility."
    },
    "currentEligibleApplicantTypes": [],
    "currentEligibleSectors": [],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [
      "Use the City of Chicago building permit process; current green-permit-specific requirements were not readable from official sources."
    ],
    "currentBlockers": [
      "Do not match LEED certification, rooftop solar PV, small wind, solar thermal or geothermal from this record until a readable current official City source verifies active Green Permit eligibility.",
      "Do not treat a permit-processing incentive as an equipment rebate.",
      "The official green-permit page and CHI311 article were inaccessible or rendered an error during review."
    ],
    "currentEvidenceText": "The City green-permit page could not be read, and the CHI311 article rendered only a CSS error, preventing current eligibility verification.",
    "currentReasoningNotes": "Current official source failed: the green-permits page was not readable and the CHI311 article rendered a CSS error. Categories were cleared pending readable official confirmation.",
    "sourceUrlsChecked": [
      "https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits/svcs/green-permits.html",
      "https://311.chicago.gov/s/article/Green-permit-program-LEED-submittal-requirements?language=en_US",
      "https://www.chicago.gov/city/en/depts/bldgs/provdrs/e_plan.html"
    ],
    "relatedRetrofitCount": 5,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "small_wind_turbine",
        "displayName": "Small wind turbine",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5377",
    "opportunityName": "Central Lincoln People's Utility District - Renewable Energy Incentive Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5377/central-lincoln-people-s-utility-district-renewable-energy-incentive-program",
    "websiteUrl": "https://clpud.org/energy-efficiency/renewable-energy-programs/renewable-energy-storage-rebates/",
    "applicationUrl": null,
    "state": "OR",
    "programType": "Rebate",
    "administrator": "Central Lincoln People's Utility District",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.86,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch69",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch69.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "OR"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Central Lincoln People's Utility District electric service territory"
      ],
      "notes": "Official renewable rebate pages could not be read directly due access denial; territory is limited to Central Lincoln PUD customers."
    },
    "currentEligibleApplicantTypes": [
      "electric_utility_customer",
      "residential_customer",
      "commercial_customer"
    ],
    "currentEligibleSectors": [
      "residential",
      "commercial"
    ],
    "currentEligibleRetrofitCategories": [
      "rooftop_solar_pv",
      "battery_storage_system",
      "solar_water_heating_system",
      "wind_electric_system",
      "small_hydropower_system"
    ],
    "currentHardRequirements": [
      "Applicant must be a Central Lincoln PUD customer.",
      "Current rebate amounts, eligible equipment specifications, and application steps need verification from the official program page when accessible."
    ],
    "currentBlockers": [
      "Do not match to submetering or general energy monitoring; current official snippets describe renewable generation and storage rebates, not metering retrofits.",
      "Do not generalize to non-renewable building retrofits.",
      "Official source access failure prevents verification of current funding, incentive levels, and detailed eligibility."
    ],
    "currentEvidenceText": "Official]( Central Lincoln renewable pages were inaccessible, but available official snippets identify rebates for renewable energy and storage systems, including solar and battery storage.",
    "currentReasoningNotes": "Marked source_inaccessible because current official pages could not be read well enough to verify detailed eligibility; unsupported submetering match removed.",
    "sourceUrlsChecked": [
      "https://clpud.org/energy-efficiency/renewable-energy-programs/",
      "https://clpud.org/energy-efficiency/renewable-energy-programs/renewable-energy-storage-rebates/"
    ],
    "relatedRetrofitCount": 4,
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
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true
      },
      {
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3219",
    "opportunityName": "Modesto Irrigation District - Commercial New Construction Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3219/modesto-irrigation-district-commercial-new-construction-rebate-program",
    "websiteUrl": "https://www.mid.org/power/new-construction/",
    "applicationUrl": null,
    "state": "CA",
    "programType": "Rebate",
    "administrator": "Modesto Irrigation District",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.86,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch69",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch69.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
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
      "notes": "Official MID business and new-construction pages were not directly readable; snippets indicate a business new-construction rebate for above-code equipment."
    },
    "currentEligibleApplicantTypes": [
      "commercial_customer",
      "industrial_customer",
      "agricultural_customer",
      "new_construction_project_owner",
      "developer"
    ],
    "currentEligibleSectors": [
      "commercial",
      "industrial",
      "agricultural",
      "new_construction"
    ],
    "currentEligibleRetrofitCategories": [
      "commercial_new_construction_energy_efficiency"
    ],
    "currentHardRequirements": [
      "Project must be in MID territory and involve new construction or qualifying high-efficiency equipment above codes and standards.",
      "Current application, measure, and rebate details require verification from accessible official MID materials."
    ],
    "currentBlockers": [
      "Do not match ordinary existing-building HVAC replacement, refrigeration retrofits, automated demand response controls, or EMS from this record unless the current MID measure sheet is accessible and verifies them.",
      "This is a new-construction program, so existing-building retrofit matching should be blocked.",
      "Official pages returned access errors, preventing full current eligibility verification."
    ],
    "currentEvidenceText": "MID]( official pages were inaccessible, but snippets indicate new-construction rebates for high-efficiency equipment above codes and standards in business projects.",
    "currentReasoningNotes": "Marked source_inaccessible and narrowed to a new-construction efficiency category; supplied existing-retrofit equipment categories should not drive active matches.",
    "sourceUrlsChecked": [
      "http://www.mid.org/rebates/commercial/default.html",
      "https://www.mid.org/saving-energy-money/rebates/",
      "https://www.mid.org/saving-energy-money/rebates/business-rebates/",
      "https://www.mid.org/power/new-construction/",
      "https://programs.dsireusa.org/system/program/detail/3219/modesto-irrigation-district-commercial-new-construction-rebate-program"
    ],
    "relatedRetrofitCount": 4,
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
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1553",
    "opportunityName": "Duke Energy - Non-Residential Energy Efficiency Rebate Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1553/duke-energy-non-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
    "applicationUrl": null,
    "state": "KY",
    "programType": "Rebate Program",
    "administrator": "Duke Energy",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-06-30_batch8",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-06-30_batch8.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "KY"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Duke Energy Kentucky non-residential electric service territory"
      ],
      "notes": "The DSIRE record is for Kentucky non-residential customers, but current official measure details could not be verified from accessible Duke Energy pages."
    },
    "currentEligibleApplicantTypes": [],
    "currentEligibleSectors": [],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [
      "Do not infer eligible measure categories or rebate eligibility until the current Duke Energy Smart $aver business rebate pages or applications are accessible.",
      "Projects should not be matched to refrigeration or compressed-air measures based only on DSIRE or search-result snippets."
    ],
    "currentBlockers": [
      "The official Duke Energy Smart $aver business page https://www.duke-energy.com/business/products/smartsaver returned access errors or required dynamic content in the checked environment.",
      "The official Smart $aver rebate-list and industrial-equipment pages were not readable enough to verify current Kentucky refrigeration or compressed-air incentives.",
      "DSIRE was checked only as a starting clue and is not sufficient to retain current retrofit categories.",
      "Imported matched terms refrigeration and air compressor were cleared because current official measure tables were source-inaccessible."
    ],
    "currentEvidenceText": "Duke Energy search snippets indicate Smart $aver business rebates for qualifying high-efficiency equipment, but the official Duke pages checked were blocked, errored, or required JavaScript/dynamic rendering and did not expose current measure tables for refrigeration or compressed air.",
    "currentReasoningNotes": "The safe repair is source_inaccessible with no eligible retrofit categories. This avoids preserving stale or DSIRE-only category matches for a current non-residential program whose official measure details could not be read.",
    "sourceUrlsChecked": [
      "https://www.duke-energy.com/business/products/smartsaver",
      "https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates",
      "https://www.duke-energy.com/business/products/smartsaver/industrial-equipment",
      "https://programs.dsireusa.org/system/program/detail/1553/duke-energy-non-residential-energy-efficiency-rebate-program"
    ],
    "relatedRetrofitCount": 3,
    "relatedRetrofits": [
      {
        "retrofitTypeId": "efficient_air_compressor",
        "displayName": "Efficient air compressor",
        "parentCategory": "compressed_air_industrial",
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
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4535",
    "opportunityName": "Farmers Electric Cooperative (Kalona) - Residential Energy Efficiency Grant Program",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4535/farmers-electric-cooperative-kalona-residential-energy-efficiency-grant-program",
    "websiteUrl": "https://www.feckalona.net/energy-conservation-grants.html",
    "applicationUrl": null,
    "state": "IA",
    "programType": "Rebate Or Grant Program",
    "administrator": "Farmers Electric Cooperative",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch45",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch45.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "IA"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Farmers Electric Cooperative (Kalona)"
      ],
      "notes": "Likely limited to Farmers Electric Cooperative members, but current official eligibility could not be verified because the official pages were inaccessible."
    },
    "currentEligibleApplicantTypes": [
      "residential_customers",
      "member_customers"
    ],
    "currentEligibleSectors": [
      "residential"
    ],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [
      "Current official program terms must be obtained from Farmers Electric Cooperative before matching retrofit categories."
    ],
    "currentBlockers": [
      "Official Farmers Electric Cooperative conservation grants, rebates, and ways-to-save pages returned 502 Bad Gateway during research.",
      "DSIRE categories and search snippets were not sufficient final authority for current eligibility.",
      "Do not match HVAC, insulation, LED lighting, lighting controls, thermostats, ceiling fans, or agricultural equipment until current official program terms are accessible."
    ],
    "currentEvidenceText": "The current Farmers Electric Cooperative conservation-grants, rebates, and ways-to-save pages returned 502 Bad Gateway. Search snippets showed only page titles and a partial insulation reference, insufficient to verify current eligible measures.",
    "currentReasoningNotes": "Source inaccessible; cleared retrofit categories until official terms can be read. Retained only minimal geography and applicant context from the program name and official URL.",
    "sourceUrlsChecked": [
      "https://www.feckalona.net/energy-conservation-grants.html",
      "http://www.feckalona.net/energy-conservation-grants.html",
      "https://www.feckalona.net/energy-efficiency-rebates.html",
      "https://www.feckalona.net/ways-to-save.html"
    ],
    "relatedRetrofitCount": 3,
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4816",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4816/xcel-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates",
    "applicationUrl": "https://www.xcelenergy.com/digital_application",
    "state": "ND",
    "programType": "Rebate",
    "administrator": "Xcel Energy",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch49",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch49.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "ND"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Xcel Energy"
      ],
      "notes": "Likely limited to Xcel Energy North Dakota residential service territory, but current official measure-level eligibility could not be verified from readable sources."
    },
    "currentEligibleApplicantTypes": [],
    "currentEligibleSectors": [],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [],
    "currentBlockers": [
      "Current Xcel North Dakota heating-upgrade rebate page is JavaScript/dynamic and did not expose current eligibility details.",
      "Do not match boiler, furnace, or generic HVAC replacement until current Xcel North Dakota measure terms are verified from an official readable source.",
      "Older Xcel documents and search snippets are insufficient to confirm 2026 North Dakota eligibility."
    ],
    "currentEvidenceText": "The current Xcel North Dakota rebate page could not be read beyond dynamic loading; the digital application is active but does not show measure-level eligibility.",
    "currentReasoningNotes": "Marked source_inaccessible to prevent matching on outdated furnace/boiler assumptions. Current official details must be verified before restoring categories.",
    "sourceUrlsChecked": [
      "https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates",
      "https://www.xcelenergy.com/digital_application",
      "https://xcelenergy.com/staticfiles/xe/Marketing/Files/MN-Res-Heating-Rebate-Application.pdf"
    ],
    "relatedRetrofitCount": 3,
    "relatedRetrofits": [
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
      }
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22551",
    "opportunityName": "Duke Energy Indiana Off-Peak Charging Credit",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22551/duke-energy-indiana-off-peak-charging-credit",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "IN",
    "programType": "Performance-Based Incentive / Bill Credit",
    "administrator": "Duke Energy Indiana",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "IN"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Duke Energy Indiana"
      ],
      "notes": "Historic pilot applied to Duke Energy Indiana residential customers; current continuation could not be verified from an accessible official current product page."
    },
    "currentEligibleApplicantTypes": [
      "duke_energy_indiana_residential_customer"
    ],
    "currentEligibleSectors": [
      "residential"
    ],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [
      "Current official eligibility could not be verified from a readable Duke Energy product page.",
      "The accessible official release described a two-year pilot launched October 1, 2022.",
      "Historic pilot participation was capped and required a residential Level 2 EV charger."
    ],
    "currentBlockers": [
      "Do not match this as active until a current Duke Energy Indiana program page or tariff confirms availability.",
      "The historic pilot was time-limited and capped at 500 residential participants.",
      "This was an off-peak charging credit, not an EV charger installation rebate.",
      "Commercial charger rebates, fleet advisory services, and school bus programs were separate pilot offerings."
    ],
    "currentEvidenceText": "Accessible]( Duke release describes a two-year Indiana pilot launched October 1, 2022, capped at 500 residential Level 2 participants; current continuation was not readable.",
    "currentReasoningNotes": "Cleared retrofit categories because current official sources were not readable enough to verify ongoing availability after the original pilot period.",
    "sourceUrlsChecked": [
      "https://news.duke-energy.com/releases/duke-energy-indiana-plans-two-year-electric-transportation-pilot-programs",
      "https://www.duke-energy.com/home/products/ev-complete/off-peak-credit"
    ],
    "relatedRetrofitCount": 2,
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
    ]
  },
  {
    "repairPurpose": "source_confidence_followup",
    "instructions": "This opportunity already has a GPT Pro repair, but source_confidence stayed low. Re-research official/current sources and either raise confidence with better evidence or keep low/source_inaccessible with clear reasons.",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2180",
    "opportunityName": "Flathead Electric Cooperative - Commercial Incentive Programs",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2180/flathead-electric-cooperative-commercial-incentive-programs",
    "websiteUrl": null,
    "applicationUrl": null,
    "state": "MT",
    "programType": "Rebate Program",
    "administrator": "Flathead Electric Cooperative",
    "availabilityStatus": "source_inaccessible",
    "source_confidence": "low",
    "match_confidence": 0.68,
    "latestRepairBatchId": "opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51",
    "latestRepairPath": "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51.json",
    "recommendedNextStep": "human_or_gpt_pro_source_access_followup",
    "currentGeography": {
      "country": "US",
      "states": [
        "MT"
      ],
      "counties": [],
      "cities": [],
      "utilityTerritories": [
        "Flathead Electric Cooperative"
      ],
      "notes": "Likely limited to Flathead Electric Cooperative commercial and industrial members, but current official program details were not readable enough to verify."
    },
    "currentEligibleApplicantTypes": [
      "commercial_member",
      "industrial_member"
    ],
    "currentEligibleSectors": [
      "commercial",
      "industrial"
    ],
    "currentEligibleRetrofitCategories": [],
    "currentHardRequirements": [
      "Current official commercial rebate requirements must be obtained from Flathead Electric Cooperative before matching.",
      "Current measure lists, rebate amounts, forms, and eligibility requirements were not readable from the official page."
    ],
    "currentBlockers": [
      "Do not match HVAC, lighting, kitchen, insulation, window, or refrigeration measures until current official program materials are accessible.",
      "Do not infer residential rebates from a commercial incentive record.",
      "Older official snippets are insufficient to verify current eligible measures or availability.",
      "The current official commercial rebate page could not be read well enough for reliable matching."
    ],
    "currentEvidenceText": "Current]( official commercial rebate page could not be fetched; snippets identify commercial and industrial lighting, while older official snippets mention broader measures.",
    "currentReasoningNotes": "Cleared categories under source_inaccessible because current official program materials were not readable enough to verify measure eligibility.",
    "sourceUrlsChecked": [
      "https://www.flatheadelectric.com/commercial/business-energy-savings/",
      "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/commercial-rebate-programs/",
      "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/",
      "https://www.flatheadelectric.com/co-op-announces-2022-energy-efficiency-savings-862574-paid-out-to-members-and-partners/"
    ],
    "relatedRetrofitCount": 2,
    "relatedRetrofits": [
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
      }
    ]
  }
]
