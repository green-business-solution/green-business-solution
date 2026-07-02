You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 36
Targets in this prompt: 701-720 of 984
Repair objects required: 20

Core distinction:
- Eligibility matching is already handled elsewhere. Do not decide whether a specific user is eligible.
- Your job is to extract the source-backed value/calculation/workflow logic for an already-matched opportunity.
- If current target retrofit edges are unsupported by the source, mark those edges as delete_bad_edge. Do not preserve false physical retrofit edges.
- If the opportunity is real but belongs to a special workflow, classify it as non_monetary_workflow, process_value, permit_fee_waiver, interconnection, technical_assistance, financing, tax_credit, tariff, or another accurate category.

Use current official sources first:
- program administrator pages
- utility rebate pages
- current application forms
- PDFs, program manuals, tariffs, statutes, tax authority pages, solicitation guides, rate sheets
- DSIRE may be used as a lead, but not as final authority when official sources are available.

Do not overstate value:
- Treat 'up to' as a cap, not an expected amount.
- Competitive max-only grants should not get a dollar estimate unless source-backed probability evidence exists.
- Loans/financing are not cash savings unless explicit forgiveness, buy-down, or subsidy value is stated.
- Tax credits are monetary, but classify them as tax_credit effects, not grants.
- Custom incentives should be custom_quote_required unless a formula/rate table is published.
- If project cost, unit count, kW, kWh savings, battery kWh, square feet, tonnage, equipment tier, or eligible cost basis is required, list it in requiredInputs.

Important target interpretation:
- `existingSimpleRules` are current legacy rules. Fact-check them; do not assume they are right.
- `reviewedNoRule` means previous research did not find a simple one-time formula. Re-check for recurring credits, tariffs, tax credits, grants, rate tables, measure catalogs, non-cash workflow value, or bad edges.
- `repairedOpportunityData` contains the latest source-confidence and match repair notes. Use it to avoid false physical edges and source-inaccessible traps.

Output schema:
{
  "schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
  "researchedAt": "2026-07-02",
  "source": "gpt_pro",
  "batchNumber": 36,
  "repairs": [
    {
      "opportunityId": "exact target opportunityId",
      "opportunityName": "",
      "repairStatus": "calculation_package_found | custom_quote_required | non_monetary_workflow | no_monetary_effect | source_inaccessible | unavailable_archive | bad_edge_delete_only | needs_human_review",
      "calculationStatus": "calculable | calculable_with_missing_inputs | estimate_from_range | custom_quote_estimate | source_inaccessible_repair_failure | unavailable_archived | non_monetary_workflow | no_calculable_value | needs_repair_review",
      "sourceConfidence": "high | medium | low",
      "estimateConfidence": "high | medium | low",
      "cashValueClassifications": ["cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | process_value | tariff_or_rate | non_cash | unknown"],
      "primaryValueModelKinds": ["fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | rate_table | measure_catalog | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | tax_credit | loan_or_financing | tariff_or_rate | custom_quote | non_cash_process_value | no_calculable_value | source_inaccessible"],
      "effects": [
        {
          "effectType": "one_time_savings | recurring_savings | recurring_expense | grant_expected_value | tax_credit | financing_subsidy | process_value | no_cash_value",
          "cashValueClassification": "cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | process_value | tariff_or_rate | non_cash | unknown",
          "valueModelKind": "fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | rate_table | measure_catalog | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | tax_credit | loan_or_financing | tariff_or_rate | custom_quote | non_cash_process_value | no_calculable_value | source_inaccessible",
          "timing": "upfront | point_of_sale | post_purchase_rebate | post_installation_reimbursement | annual | monthly | tax_filing | loan_closing | application_process | unknown",
          "formulaText": "plain English formula from source",
          "amountCents": null,
          "percent": null,
          "rate": null,
          "rateUnit": null,
          "minAmountCents": null,
          "maxAmountCents": null,
          "caps": {
            "maxAwardCents": null,
            "minAwardCents": null,
            "maxPercentOfEligibleCost": null,
            "maxUnits": null,
            "perCustomerCapCents": null,
            "perSiteCapCents": null,
            "annualCapCents": null,
            "programBudgetCents": null
          },
          "eligibleCostCategories": [],
          "ineligibleCostCategories": [],
          "requiredInputs": [],
          "missingInputsForTypicalRetroFiEstimate": [],
          "rateTable": {
            "tableId": null,
            "dimensions": [],
            "rows": []
          },
          "measureCatalog": {
            "catalogId": null,
            "selectionInput": null,
            "rows": []
          },
          "probabilityModel": {
            "probabilityRequired": false,
            "probabilityDiscount": null,
            "probabilityEvidenceType": "not_required | historical_success_rate | budget_and_expected_awards | historical_awards_only | first_come_funds_confirmed | first_come_funding_unknown | scoring_criteria_only | eligibility_only | human_reviewed | none"
          },
          "includedInUserFacingTotalDefault": false,
          "evidenceText": "under 75 words, no URLs",
          "sourceUrls": []
        }
      ],
      "edgeActions": [
        {
          "retrofitTypeId": "target retrofitTypeId",
          "action": "keep | delete_bad_edge | move_to_special_workflow | needs_review",
          "reason": "source-backed reason"
        }
      ],
      "stackingRules": {
        "stackableWithRebates": null,
        "stackableWithTaxCredits": null,
        "mustDeductOtherIncentivesFromEligibleCost": null,
        "notes": ""
      },
      "timingRequirements": {
        "approvalRequiredBeforePurchase": null,
        "approvalRequiredBeforeInstallation": null,
        "applicationDeadline": null,
        "fundingStatus": "open_funds_available | open_while_funds_last | waitlist | closed | exhausted | unknown"
      },
      "sourceUrlsChecked": [],
      "evidenceText": "under 75 words, no URLs",
      "reasoningNotes": "",
      "humanReviewRequired": false,
      "humanReviewReasons": []
    }
  ],
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2673"
}

Validation before responding:
- JSON.parse must succeed.
- repairs.length must equal 20.
- repairs must be in the same order as targets.
- Every target opportunityId must appear exactly once.
- Use raw URL strings only. No markdown links.
- Use cents for USD amounts where amount fields end in Cents.
- Use null for unknown numeric values, not 0.
- Use empty arrays for unknown lists.
- Keep evidenceText fields concise and URL-free.

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5254",
    "opportunityName": "Brownsville Public Utilities Board - Residential/Small Commercial Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5254/brownsville-public-utilities-board-residential-small-commercial-rebate-program",
    "websiteUrl": "https://www.brownsville-pub.com/gogreen/rebate-programs/",
    "applicationUrl": null,
    "administrator": "Brownsville Public Utilities Board",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "chiller"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_toilet_urinal",
        "displayName": "High-efficiency toilet / urinal replacement",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "toilet"
        ]
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [
          "Brownsville"
        ],
        "utilityTerritories": [
          "Brownsville Public Utilities Board electric and water service territory"
        ],
        "notes": "Most measures require BPUB electric service; high-efficiency toilet and urinal measures may be available to BPUB water-only customers."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "small_commercial_utility_customer",
        "commercial_utility_customer",
        "water_utility_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "window_air_conditioner",
        "high_efficiency_chiller",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "window_replacement",
        "window_film_shading_retrofit",
        "high_efficiency_toilet_urinal",
        "commercial_lighting_retrofit"
      ],
      "hardRequirements": [
        "Applicant must have applicable BPUB electric or water service.",
        "Rebates are subject to fund availability and program documentation.",
        "HVAC work requires qualifying equipment, AHRI documentation, and licensed contractor or inspection requirements.",
        "Duct rebates require pre- and post-testing and retrofit of existing duct systems.",
        "Window, insulation, film, chiller, and toilet measures must meet BPUB measure-specific specifications."
      ],
      "blockers": [
        "Air sealing is not a standalone rebate category except as related to duct sealing or insulation requirements.",
        "Chiller support is commercial air-cooled or water chiller equipment, not residential HVAC.",
        "Toilet support is specific WaterSense HET or urinal replacement, not broad plumbing fixture replacement."
      ],
      "programType": "Rebate",
      "administrator": "Brownsville Public Utilities Board",
      "applicationUrl": null,
      "websiteUrl": "https://www.brownsville-pub.com/gogreen/rebate-programs/",
      "sourceUrlsChecked": [
        "https://www.brownsville-pub.com/gogreen/rebate-programs/",
        "https://www.brownsville-pub.com/gogreen/rebate-programs/attic-ceiling-insulation/",
        "https://www.brownsville-pub.com/gogreen/rebate-programs/duct-flow-performance/",
        "https://www.brownsville-pub.com/gogreen/rebate-programs/energy-star-windows/",
        "https://www.brownsville-pub.com/gogreen/rebate-programs/solar-screens-and-films/",
        "https://www.brownsville-pub.com/gogreen/rebate-programs/hvac/",
        "https://www.brownsville-pub.com/gogreen/rebate-programs/air-cooled-water-chiller/"
      ],
      "evidenceText": "BPUB's]( GoGreen program lists HVAC, chiller, insulation, duct performance, ENERGY STAR windows, solar screens or film, WaterSense toilets, and commercial lighting rebates.",
      "reasoningNotes": "Keep both residential and small-commercial categories where official pages support them, but narrow air sealing and toilet/plumbing matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Brownsville PUB residential/small commercial source did not expose a current whole-building or heat-pump/toilet formula in accessible text.",
        "sourceUrlsChecked": [
          "https://www.brownsville-pub.com/save-energy-water/rebates/",
          "https://programs.dsireusa.org/system/program/detail/5254"
        ],
        "reasoningNotes": "No safe one-time rule was verified from official text.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3833",
    "opportunityName": "CenterPoint Energy - SCORE and CitySmart Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3833/centerpoint-energy-score-and-citysmart-program",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho",
    "applicationUrl": null,
    "administrator": "CenterPoint Energy",
    "programType": "Performance Incentive And Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning",
          "chiller"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration"
        ]
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "vfd"
        ]
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window film"
        ]
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "CenterPoint Energy Houston Electric distribution service territory"
        ],
        "notes": "Current program is targeted to schools, higher education, local government, nonprofits, places of worship, and similar eligible non-residential institutions."
      },
      "eligibleApplicantTypes": [
        "school",
        "higher_education_institution",
        "local_government",
        "nonprofit",
        "place_of_worship",
        "eligible_non_residential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "municipal",
        "nonprofit",
        "education"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "led_lighting_retrofit",
        "variable_frequency_drive_retrofit",
        "window_film_shading_retrofit",
        "cool_roof_or_roofing_retrofit",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be an eligible non-residential customer in CenterPoint Energy Houston Electric distribution territory.",
        "Eligible organizations include schools, higher education, local government, nonprofits, and places of worship.",
        "Incentives are tied to measured or deemed peak electric demand savings and paid after completion and inspection.",
        "Projects must meet program rules and may require pre-approval or measurement and verification."
      ],
      "blockers": [
        "Window replacement is not listed on the current official program page; only window film is supported.",
        "This is not a general residential or unrestricted commercial rebate.",
        "Custom and renewable projects require program-specific review and should not be matched as automatic prescriptive rebates."
      ],
      "programType": "Performance Incentive And Technical Assistance",
      "administrator": "CenterPoint Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho",
      "sourceUrlsChecked": [
        "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/score-city-smart-programs.aspx?au=bus&sa=ho",
        "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho"
      ],
      "evidenceText": "CenterPoint's]( current program pages describe incentives for eligible schools, government, nonprofits, and similar customers for lighting, HVAC, motors or VFDs, refrigeration, window film, roofing, and custom projects.",
      "reasoningNotes": "The current official source supports window film but not window replacement, and limits eligibility to targeted institutional/nonprofit customer classes."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SCORE/CitySmart are standard-offer school/city efficiency programs with project-specific calculations.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/score-city-smart-programs.aspx?sa=ho&au=bus"
        ],
        "reasoningNotes": "No reusable formula verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5118",
    "opportunityName": "City of San Marcos - Energy Efficient Home Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5118/city-of-san-marcos-energy-efficient-home-rebate-program",
    "websiteUrl": "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
    "applicationUrl": null,
    "administrator": "City of San Marcos Electric Utility",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "duct sealing"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window film"
        ]
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [
          "San Marcos"
        ],
        "utilityTerritories": [
          "City of San Marcos Electric Utility service territory"
        ],
        "notes": "Energy Efficient Home Rebate is for existing single-family residential customers served by SMTX Utility."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "window_replacement",
        "exterior_door_replacement",
        "window_film_shading_retrofit",
        "window_air_conditioner"
      ],
      "hardRequirements": [
        "Applicant must be an existing single-family residential SMTX Utility customer in good standing.",
        "Measures must meet City of San Marcos rebate program specifications.",
        "Solar, commercial lighting, and other listed city programs are separate from the Energy Efficient Home Rebate.",
        "Rebate documentation and inspection or approval requirements apply."
      ],
      "blockers": [
        "Air sealing is not listed as a standalone supported measure; duct sealing and envelope products are the supported categories.",
        "Do not match commercial lighting or solar PV to this residential home rebate record.",
        "Window film and window replacement are separate supported envelope categories and should not be conflated."
      ],
      "programType": "Rebate",
      "administrator": "City of San Marcos Electric Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
      "sourceUrlsChecked": [
        "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs"
      ],
      "evidenceText": "San]( Marcos lists Energy Efficient Home Rebates for efficient HVAC, attic and wall insulation, duct sealing or replacement, ENERGY STAR windows and doors, solar film or screens, and ENERGY STAR window AC units.",
      "reasoningNotes": "Remove the broad air-sealing match and keep only residential home-efficiency measures shown on the official page."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "San Marcos page lists eligible home measures but did not expose exact HVAC, duct sealing, insulation or window-film amounts in accessible text.",
        "sourceUrlsChecked": [
          "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs"
        ],
        "reasoningNotes": "No safe per-unit home retrofit rule was selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5311",
    "opportunityName": "Dominion Virginia Power - Residential Energy Efficiency Rebate Program",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5311/dominion-virginia-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.dominionenergy.com/virginia/save-energy",
    "applicationUrl": null,
    "administrator": "Dominion Energy Virginia",
    "programType": "Rebate And Energy Efficiency Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Dominion Energy Virginia"
        ],
        "notes": "Applies to qualifying Dominion Energy Virginia residential electric customers in the Virginia service territory."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_owner_permission",
        "authorized_account_holder"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "variable_speed_pool_pump"
      ],
      "hardRequirements": [
        "Customer must be served by Dominion Energy Virginia where the relevant residential program is offered.",
        "Home Energy Evaluation measures must be identified through the program process and installed by qualified participating providers where required.",
        "Heat pump water heater rebates apply to qualifying replacements of electric water heaters.",
        "Smart thermostat rewards are a separate demand response-style program and require enrollment and eligible equipment."
      ],
      "blockers": [
        "No current official Virginia residential furnace replacement rebate was verified for this opportunity.",
        "Do not infer commercial, industrial, commercial kitchen, refrigeration, motors, or VFD measures from this residential program.",
        "Do not combine separate Dominion programs without preserving program boundaries.",
        "Gas appliance rebates from other Dominion or Enbridge territories should not match this Virginia electric residential record."
      ],
      "programType": "Rebate And Energy Efficiency Program",
      "administrator": "Dominion Energy Virginia",
      "applicationUrl": null,
      "websiteUrl": "https://www.dominionenergy.com/virginia/save-energy",
      "sourceUrlsChecked": [
        "https://www.dominionenergy.com/virginia/save-energy",
        "https://www.domsavings.com/home-program/home-energy-evaluation",
        "https://www.domsavings.com/home-program/water-energy-rebate",
        "https://www.dominionenergy.com/virginia/save-energy/my-home/smart-thermostat-rewards"
      ],
      "evidenceText": "Dominion]( Virginia residential pages identify home energy evaluations, water-energy rebates, heat pump water heaters, insulation, duct measures, air sealing, heat pump upgrades and smart thermostat rewards.",
      "reasoningNotes": "The heat pump, heat pump water heater, insulation, air sealing, duct and thermostat matches are supportable. Furnace and broad HVAC matches must be narrowed because the current official Virginia residential pages do not verify a general furnace rebate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Dominion Virginia residential rebate pages did not verify a current motor/VFD or matched equipment value.",
        "sourceUrlsChecked": [
          "https://www.dominionenergy.com/virginia/save-energy/home",
          "https://programs.dsireusa.org/system/program/detail/5311"
        ],
        "reasoningNotes": "No source-backed rule was found for the target's motor-efficiency mapping.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2199",
    "opportunityName": "Mason County PUD 3 - Commercial and Industrial Energy Rebates",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2199/mason-county-pud-3-commercial-and-industrial-energy-rebates",
    "websiteUrl": "https://www.pud3.org/ways-to-save/rebates-incentives/",
    "applicationUrl": null,
    "administrator": "Mason County PUD 3",
    "programType": "Commercial And Industrial Utility Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "exterior_site_lighting_retrofit",
        "displayName": "Exterior/site lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "outdoor lighting"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
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
        "notes": "Limited to PUD 3 service territory. Commercial heat-pump details require direct contact with the PUD 3 Conservation Department."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Mason County PUD 3 customer.",
        "Commercial customers seeking heat pump incentives must contact the PUD 3 Conservation Department for current details.",
        "Equipment must satisfy current PUD 3 program requirements and funding availability before rebate payment."
      ],
      "blockers": [
        "Do not match residential appliance rebates, residential duct sealing, home insulation, smart thermostats, or heat-pump water-heater incentives to this commercial and industrial target.",
        "Outdoor lighting service is not evidence of an exterior energy-efficiency lighting retrofit rebate.",
        "EV charging is a separate program and not part of this C&I rebate target."
      ],
      "programType": "Commercial And Industrial Utility Energy Efficiency Rebate Program",
      "administrator": "Mason County PUD 3",
      "applicationUrl": null,
      "websiteUrl": "https://www.pud3.org/ways-to-save/rebates-incentives/",
      "sourceUrlsChecked": [
        "https://www.pud3.org/ways-to-save/rebates-incentives/",
        "https://www.pud3.org/faqs/heat-pump-incentives/",
        "https://www.pud3.org/faqs/ductless-heat-pump-incentives/",
        "https://www.pud3.org/faqs/appliance-incentives/",
        "https://www.pud3.org/electric-service/outdoor-lighting/",
        "https://www.pud3.org/ways-to-save/electric-vehicles/"
      ],
      "evidenceText": "Official]( PUD 3 snippets identify incentives for qualifying ductless heat pumps and instruct commercial customers seeking heat-pump incentives to contact the Conservation Department.",
      "reasoningNotes": "The only current C&I measure support found was heat-pump-related. Residential appliance and weatherization snippets were blocked from this commercial opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Mason PUD 3 says commercial customers seeking heat pump incentives should call conservation.",
        "sourceUrlsChecked": [
          "https://www.pud3.org/ways-to-save/rebates-incentives/"
        ],
        "reasoningNotes": "Commercial incentive amounts are not directly published.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3277",
    "opportunityName": "Barron Electric Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3277/barron-electric-cooperative-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.barronelectric.com/2026-energy-rebates",
    "applicationUrl": "https://www.barronelectric.com/sites/default/files/2026%20Ag%20-%20fillable_0.pdf",
    "administrator": "Barron Electric Cooperative",
    "programType": "Commercial, Industrial, And Agricultural Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "electric_forklift_material_handling",
        "displayName": "Electric forklift / material handling equipment",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric forklift"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "refrigerator"
        ]
      },
      {
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "vending machine controls"
        ]
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "variable frequency drive",
          "vfd"
        ]
      },
      {
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat recovery"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Barron Electric Cooperative service territory"
        ],
        "notes": "Limited to qualifying equipment purchased and installed on Barron Electric Cooperative lines."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_member",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "variable_frequency_drive_retrofit",
        "agricultural_exhaust_fan",
        "agricultural_circulation_fan",
        "scroll_refrigeration_compressor",
        "dairy_plate_cooler_or_precooler",
        "dairy_refrigeration_heat_recovery",
        "electric_forklift_battery_charger",
        "low_energy_livestock_waterer",
        "custom_energy_efficiency_equipment"
      ],
      "hardRequirements": [
        "Equipment must be purchased and installed in 2026 on cooperative lines.",
        "Rebate must not exceed equipment cost.",
        "Rebate form and documentation must be submitted within three months of purchase.",
        "Program is valid through the stated deadline or until funds are depleted.",
        "Equipment must match the listed agricultural, commercial, or industrial rebate measures."
      ],
      "blockers": [
        "Electric forklift battery charger is not a battery storage system.",
        "Refrigeration eligibility should be limited to listed scroll compressors, dairy refrigeration heat recovery, and related listed measures.",
        "Broad vending machine controls are not supported by the current form.",
        "Waste heat recovery should be limited to dairy refrigeration heat recovery where applicable.",
        "Residential appliances and home weatherization are not eligible."
      ],
      "programType": "Commercial, Industrial, And Agricultural Rebate Program",
      "administrator": "Barron Electric Cooperative",
      "applicationUrl": "https://www.barronelectric.com/sites/default/files/2026%20Ag%20-%20fillable_0.pdf",
      "websiteUrl": "https://www.barronelectric.com/2026-energy-rebates",
      "sourceUrlsChecked": [
        "https://www.barronelectric.com/2026-energy-rebates",
        "https://www.barronelectric.com/sites/default/files/2026%20Ag%20-%20fillable_0.pdf"
      ],
      "evidenceText": "Barron Electric’s 2026 form lists VFDs, agricultural fans, scroll refrigeration compressors, dairy plate coolers, dairy heat recovery, electric forklift battery chargers, livestock waterers, and custom incentives.",
      "reasoningNotes": "The original battery storage match is a false positive. The forklift-related item is a battery charger rebate, and heat recovery should be limited to the dairy refrigeration measure."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official Barron Electric commercial/ag rebate source did not expose current refrigeration values in accessible text.",
        "sourceUrlsChecked": [
          "https://www.barronelectric.com/2024-energy-rebates"
        ],
        "reasoningNotes": "No source-backed refrigeration rule could be verified.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4194",
    "opportunityName": "River Falls Municipal Utilities - Residential Energy Efficiency Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4194/river-falls-municipal-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential",
    "applicationUrl": null,
    "administrator": "River Falls Municipal Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric vehicle charging"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "level 2",
          "level-2"
        ]
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "rooftop solar"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WI"
        ],
        "counties": [],
        "cities": [
          "River Falls"
        ],
        "utilityTerritories": [
          "River Falls Municipal Utilities electric service territory"
        ],
        "notes": "Applies to RFMU customers; some EV charging language covers residential, multifamily and commercial customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "multifamily_customer",
        "commercial_customer_for_ev_charger"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "air_source_water_heater",
        "ev_charger_installation",
        "smart_thermostat",
        "energy_audit",
        "home_performance_weatherization",
        "central_air_conditioner_tune_up"
      ],
      "hardRequirements": [
        "Eligible customers must be served by River Falls Municipal Utilities.",
        "Residential efficiency equipment incentives apply to qualified equipment such as air-source heat pumps and air-source water heaters.",
        "Smart thermostat rebate is limited to purchase and installation amount allowed by RFMU.",
        "EV charging station rebates must follow the RFMU EV Charging Program application."
      ],
      "blockers": [
        "rooftop_solar_pv is not supported on the current RFMU residential efficiency programs page.",
        "Furnaces are explicitly not eligible for the residential equipment incentive.",
        "central air conditioner appears as a tune-up measure, not a full high-efficiency HVAC replacement unless the project is an eligible air-source heat pump."
      ],
      "programType": "Rebate Program",
      "administrator": "River Falls Municipal Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential",
      "sourceUrlsChecked": [
        "https://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential",
        "https://programs.dsireusa.org/system/program/detail/4194/river-falls-municipal-utilities-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "RFMU residential programs list efficiency equipment incentives for air-source heat pumps and water heaters, EV charging, smart thermostats, home assessments and central AC tune-ups.",
      "reasoningNotes": "Solar PV was removed because the current RFMU efficiency-program source checked does not offer a rooftop solar rebate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Official page says RFMU offers $1,000 for qualified residential energy-efficiency equipment.",
        "sourceUrlsChecked": [
          "http://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential"
        ],
        "reasoningNotes": "The statement is too broad to map to the HVAC target without a measure-specific table.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3426",
    "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
    "state": "WY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3426/rocky-mountain-power-wattsmart-business-program",
    "websiteUrl": "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html",
    "applicationUrl": null,
    "administrator": "Rocky Mountain Power",
    "programType": "Business Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clothes washer"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration"
        ]
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting controls"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rocky Mountain Power"
        ],
        "notes": "Applies to qualifying nonresidential facilities on Rocky Mountain Power Wyoming service and rate schedules."
      },
      "eligibleApplicantTypes": [
        "rocky_mountain_power_business_customers",
        "commercial_customers",
        "industrial_customers",
        "agricultural_customers",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "commercial_heat_pump_hvac_retrofit",
        "commercial_ground_source_heat_pump",
        "commercial_vrf_heat_pump",
        "packaged_terminal_heat_pump",
        "heat_pump_water_heater_residential_used_in_business",
        "high_efficiency_commercial_clothes_washer",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "refrigeration_controls_retrofit",
        "fast_acting_refrigerated_door"
      ],
      "hardRequirements": [
        "Facility must be a qualifying Rocky Mountain Power Wyoming business customer.",
        "Equipment must meet the current wattsmart Business Wyoming incentive list or custom incentive requirements.",
        "Commercial clothes washers must meet ENERGY STAR and electric water-heating requirements where specified.",
        "Heat pump water heater incentives are for residential heat pump water heaters used in a business and must use the wattsmart Homes qualified list.",
        "Applications may require preapproval, trade ally involvement, W-9, invoices, and inspection depending on measure type."
      ],
      "blockers": [
        "Do not infer normal residential appliance rebates into this business program; residential appliances are only eligible where the business incentive list specifically allows them.",
        "Do not treat heat pump water heaters as broad commercial water-heating equipment; the verified category is residential HPWH used in a business.",
        "Refrigeration support checked here is controls and doors, not generic refrigerator or freezer replacement unless listed separately.",
        "NEIF financing is a separate payment option and should not be modeled as a rebate category."
      ],
      "programType": "Business Rebate Program",
      "administrator": "Rocky Mountain Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html",
      "sourceUrlsChecked": [
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html",
        "https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Incentive_Lists.pdf",
        "https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Appliance_Office_Equip_Application.pdf"
      ],
      "evidenceText": "Rocky Mountain Power's Wyoming wattsmart Business materials list current incentives for business lighting, controls, HVAC heat pumps, appliances used in business, commercial clothes washers, and selected refrigeration controls.",
      "reasoningNotes": "Narrowed residential-looking appliance matches to the specific business-use categories stated by wattsmart Business."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Wyoming wattsmart business page points to incentive tables but no refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html"
        ],
        "reasoningNotes": "Target refrigeration measures require a measure table value; no safe current value was selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2035",
    "opportunityName": "Sulphur Springs Valley EC - Residential Energy Efficiency Rebate",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2035/sulphur-springs-valley-ec-residential-energy-efficiency-rebate",
    "websiteUrl": "https://www.ssvec.org/programs/rebates.php",
    "applicationUrl": "https://www.ssvec.org/downloads/programs/Heat-Pump-Rebate-Form-2020.pdf",
    "administrator": "Sulphur Springs Valley Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy audit",
          "audit"
        ]
      },
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy management"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Sulphur Springs Valley Electric Cooperative service territory"
        ],
        "notes": "Limited to SSVEC members and service addresses."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "package_heat_pump",
        "split_system_heat_pump",
        "ductless_heat_pump",
        "dual_fuel_heat_pump",
        "energy_audit"
      ],
      "hardRequirements": [
        "Heat pump rebate form and invoice must be submitted within 60 days.",
        "Package, split, ductless and dual-fuel heat pumps must meet listed SEER2 and HSPF2 requirements.",
        "Heat pumps are all-electric except qualifying dual-fuel systems.",
        "Ductless heat pumps must meet the minimum size and efficiency requirements.",
        "Energy audits are scheduled as a member service, not a rebate payment."
      ],
      "blockers": [
        "No standalone furnace rebate was found; dual-fuel heat pump support is not a high-efficiency furnace program.",
        "No residential energy management system rebate was found.",
        "Do not generalize the free audit into funding for controls or retrofit work.",
        "Do not broaden heat pump rebates to non-heat-pump central air conditioning."
      ],
      "programType": "Rebate Program",
      "administrator": "Sulphur Springs Valley Electric Cooperative",
      "applicationUrl": "https://www.ssvec.org/downloads/programs/Heat-Pump-Rebate-Form-2020.pdf",
      "websiteUrl": "https://www.ssvec.org/programs/rebates.php",
      "sourceUrlsChecked": [
        "https://www.ssvec.org/programs/rebates.php",
        "https://www.ssvec.org/programs/efficiency.php",
        "https://www.ssvec.org/downloads/programs/Heat-Pump-Rebate-Form-2020.pdf"
      ],
      "evidenceText": "SSVEC's rebate page lists package, split, ductless and dual-fuel heat pump rebates and separately offers no-cost residential energy audits.",
      "reasoningNotes": "The correct match is residential heat pumps plus a nonphysical audit service. Furnace and energy management matches were false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SSVEC residential program materials did not expose a current heat-pump or energy-management rebate formula.",
        "sourceUrlsChecked": [
          "https://www.ssvec.org/",
          "https://programs.dsireusa.org/system/program/detail/2035"
        ],
        "reasoningNotes": "Matched terms include audit and HVAC; no source-backed one-time amount was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1867",
    "opportunityName": "LADWP - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1867/ladwp-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program",
    "applicationUrl": "https://www.ladwp.com/crp",
    "administrator": "Los Angeles Department of Water and Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "cool_roof_reflective_roof",
        "displayName": "Cool roof / reflective roof coating",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cool roof"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
        ]
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [
          "Los Angeles"
        ],
        "utilityTerritories": [
          "Los Angeles Department of Water and Power"
        ],
        "notes": "Installation address must have an active LADWP residential electric meter."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "property_owner",
        "tenant"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "cool_roof_reflective_roof",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "window_replacement"
      ],
      "hardRequirements": [
        "Applicant must have an active LADWP residential electric meter at the installation address when the product is purchased and installed.",
        "Application must be submitted within 12 months of the purchase date with itemized proof of purchase and required documents.",
        "Equipment must be new, installed in the customer residence, and subject to LADWP verification.",
        "Permits are required for HVAC, heat pump HVAC, heat pump water heaters, cool roofs, windows, and other listed measures where applicable."
      ],
      "blockers": [
        "New construction and ADUs are not eligible for windows, HVAC, heat pump HVAC, heat pump water heater, or whole house fan measures.",
        "Cool roof rebates apply to conditioned space; unconditioned patios, porches, carports, and breezeways are excluded.",
        "This is a residential program, not a commercial equipment program."
      ],
      "programType": "Rebate Program",
      "administrator": "Los Angeles Department of Water and Power",
      "applicationUrl": "https://www.ladwp.com/crp",
      "websiteUrl": "https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program",
      "sourceUrlsChecked": [
        "https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program",
        "https://www.ladwp.com/sites/default/files/2026-04/2026_FORMS_CRP_Application_NoAtticRebate.pdf"
      ],
      "evidenceText": "The]( current LADWP Consumer Rebate Program application lists cool roofs, ENERGY STAR windows, HVAC, heat pump HVAC, and heat pump water heaters as qualifying products.",
      "reasoningNotes": "The supplied categories are supported for residential LADWP customers. Keep them, with the new-construction and documentation limits."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Consumer Rebate Program page provides residential program access but no whole-building per-kWh formula.",
        "sourceUrlsChecked": [
          "https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program"
        ],
        "reasoningNotes": "No reusable source-backed formula was found.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1920",
    "opportunityName": "Silicon Valley Power - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1920/silicon-valley-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.siliconvalleypower.com/residents/rebates",
    "applicationUrl": "https://siliconvalleypower2.my.site.com/",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "charging station",
          "electric vehicle charging"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "laundry"
        ]
      },
      {
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "induction"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power"
        ],
        "notes": "Applies to eligible Silicon Valley Power residential customers in Santa Clara."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "property_owner",
        "tenant_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "heat_pump_clothes_dryer",
        "electric_clothes_dryer",
        "residential_induction_cooking_equipment",
        "electrical_panel_upgrade",
        "circuit_pauser_splitter",
        "hvac_tune_up"
      ],
      "hardRequirements": [
        "Customer must be an eligible Silicon Valley Power residential account holder or otherwise meet program ownership and permission rules.",
        "Gas-to-electric measures must meet the program requirements for appliance replacement and gas capping where applicable.",
        "Rebates require application through SVP's current residential rebate process and supporting invoices, permits, or photographs where required.",
        "Electrical panel, circuit, and splitter incentives must be tied to eligible electrification measures."
      ],
      "blockers": [
        "Residential EV charging station rebate ended January 31, 2026 and should not currently match this rebate record.",
        "Heat pump HVAC rebate ended January 31, 2026 and should not currently match unless SVP reopens it.",
        "Induction cooking is residential cooking equipment, not commercial kitchen equipment.",
        "Commercial building optimization and business rebates are separate SVP programs."
      ],
      "programType": "Rebate Program",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://siliconvalleypower2.my.site.com/",
      "websiteUrl": "https://www.siliconvalleypower.com/residents/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/residents/rebates",
        "https://www.siliconvalleypower.com/residents/rebates/residential-electrification-program-rules",
        "https://www.siliconvalleypower.com/residents/electrification-programs"
      ],
      "evidenceText": "SVP's]( residential rebate page supports HPWHs, heat pump dryers, induction cooking, panel and circuit upgrades, and HVAC tune-ups, while EV charging and heat pump HVAC rebates ended January 31, 2026.",
      "reasoningNotes": "Keep current active residential electrification measures and block EV charger and heat pump HVAC matching until official SVP pages show reopened availability."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SVP residential rebates include electrification and EV-related measures, but matched target is broad fleet fuel replacement.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/residents/rebates-6214"
        ],
        "reasoningNotes": "No single direct residential EV or appliance formula was safely selected.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5798",
    "opportunityName": "Efficiency Works - Residential Energy Efficiency Rebate Program (Offered by 4 Utilities)",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5798/efficiency-works-residential-energy-efficiency-rebate-program-offered-by-4-utilities",
    "websiteUrl": "https://efficiencyworks.org/for-your-home-rebates-and-incentives/",
    "applicationUrl": "https://efficiencyworks.org/for-your-home-rebates-and-incentives/",
    "administrator": "Efficiency Works",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CO"
        ],
        "counties": [],
        "cities": [
          "Estes Park",
          "Fort Collins",
          "Longmont",
          "Loveland"
        ],
        "utilityTerritories": [
          "Estes Park Power and Communications",
          "Fort Collins Utilities",
          "Longmont Power & Communications",
          "City of Loveland Utilities"
        ],
        "notes": "Program serves residential electric customers of the four Platte River Power Authority owner-community utilities."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter",
        "landlord",
        "property_manager"
      ],
      "eligibleSectors": [
        "residential",
        "small_multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "window_replacement",
        "door_replacement",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "energy_recovery_ventilator",
        "heat_recovery_ventilator",
        "electrical_panel_upgrade",
        "load_sharing_device",
        "induction_cooking_appliance",
        "heat_pump_clothes_dryer",
        "residential_clothes_washer",
        "advanced_power_strip",
        "outdoor_led_lighting_fixture",
        "radon_fan",
        "appliance_recycling"
      ],
      "hardRequirements": [
        "Applicant must receive residential electric service from one of the four participating utilities.",
        "Retrofit work generally must be at an existing home and use eligible listed service providers for installed rebate measures.",
        "Applications must be submitted within the current deadline after project completion, commonly 45 days.",
        "Equipment must be new and meet current technical requirements.",
        "Funds are first-come and rebates cannot exceed eligible project cost.",
        "Five-or-more-unit multifamily with commercial meter may be routed to the business program."
      ],
      "blockers": [
        "Do not match generic high-efficiency HVAC unless the measure is an eligible heat pump or related ventilation product.",
        "Do not match efficient pump replacement; geothermal means ground-source heat pump, not a pump replacement category.",
        "Water-only rebates are not processed under current residential retail product rules.",
        "Commercial and larger multifamily projects may belong in the business program.",
        "EV charging and solar-linked electrical work may be separate or conditional tracks."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Works",
      "applicationUrl": "https://efficiencyworks.org/for-your-home-rebates-and-incentives/",
      "websiteUrl": "https://efficiencyworks.org/for-your-home-rebates-and-incentives/",
      "sourceUrlsChecked": [
        "https://efficiencyworks.org/for-your-home-rebates-and-incentives/",
        "https://efficiencyworks.org/wp-content/uploads/2025/02/Efficiency-Works-Residential-Programs-Guide-2026.pdf",
        "https://efficiencyworks.org/wp-content/uploads/2025/02/EW_HVAC-Incentives.pdf",
        "https://efficiencyworks.org/wp-content/uploads/2025/02/EW_Windows-Incentives.pdf",
        "https://efficiencyworks.org/wp-content/uploads/2025/02/EW_Insulation-Air-Sealing-Incentives.pdf",
        "https://efficiencyworks.org/wp-content/uploads/2025/02/Retail-Products-Electric-Rebates.pdf"
      ],
      "evidenceText": "Efficiency]( Works residential materials identify the four participating utilities and list rebates for insulation, air sealing, windows, doors, heat pumps, geothermal heat pumps, heat pump water heaters, thermostats, ventilation, panels, and retail products.",
      "reasoningNotes": "The opportunity is active but geographically narrow. HVAC should be narrowed to supported heat pump and related electrification measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page provides residential rebates and incentives but no motor/VFD-specific residential formula.",
        "sourceUrlsChecked": [
          "https://efficiencyworks.org/homes/rebates/"
        ],
        "reasoningNotes": "Target motor/VFD mapping was not safely supported.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22775",
    "opportunityName": "Affordable Home Electrification Program (AHEP)",
    "state": "DC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22775/affordable-home-electrification-program-ahep",
    "websiteUrl": "https://www.dcseu.com/affordable-home-electrification",
    "applicationUrl": "https://www.dcseu.com/ahep-sfa-apply",
    "administrator": "DC Sustainable Energy Utility",
    "programType": "No-Cost Electrification Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "induction"
        ]
      },
      {
        "retrofitTypeId": "process_electrification_equipment",
        "displayName": "Process electrification equipment",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electrification equipment"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "DC"
        ],
        "counties": [],
        "cities": [
          "Washington"
        ],
        "utilityTerritories": [
          "District of Columbia Sustainable Energy Utility"
        ],
        "notes": "District of Columbia residents and buildings subject to DOEE and DCSEU approval."
      },
      "eligibleApplicantTypes": [
        "income_qualified_homeowners",
        "income_qualified_renters",
        "multifamily_property_owners",
        "affordable_housing_owners",
        "tenants"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "affordable_housing"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "induction_cooking_equipment",
        "heat_pump_clothes_dryer",
        "programmable_thermostat",
        "electrical_panel_upgrade",
        "home_electrification"
      ],
      "hardRequirements": [
        "Applicant or building must be in the District of Columbia.",
        "Single-family applicants must meet income or categorical eligibility criteria.",
        "Measures must generally replace gas or oil heating, water heating or cooking equipment with electric equipment.",
        "Projects require DCSEU assessment, DOEE approval and use of program contractors.",
        "Multifamily FY2026 applications are limited and may be placed on a waitlist."
      ],
      "blockers": [
        "Not a commercial or industrial process-electrification program.",
        "Not a general weatherization, insulation or air-sealing rebate.",
        "Solar for All and other solar programs are separate from AHEP.",
        "Multifamily projects must follow the separate AHEP multifamily process and current waitlist status."
      ],
      "programType": "No-Cost Electrification Program",
      "administrator": "DC Sustainable Energy Utility",
      "applicationUrl": "https://www.dcseu.com/ahep-sfa-apply",
      "websiteUrl": "https://www.dcseu.com/affordable-home-electrification",
      "sourceUrlsChecked": [
        "https://www.dcseu.com/affordable-home-electrification",
        "https://www.dcseu.com/ahep-sfa-apply",
        "https://www.dcseu.com/affordable-multifamily-electrification",
        "https://www.dcseu.com/ahep-mf-apply",
        "https://doee.dc.gov/service/federal-home-energy-rebates-and-healthy-homes-act-2024"
      ],
      "evidenceText": "AHEP covers income-qualified District residents replacing gas or oil space heating, water heating and cooking equipment with heat pumps, induction, thermostats and related electrical work; multifamily applications are waitlisted.",
      "reasoningNotes": "Kept residential and multifamily electrification equipment; removed weatherization and industrial process electrification matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "DCSEU AHEP is an income-qualified electrification program; exact one-time values depend on measure and eligibility path.",
        "sourceUrlsChecked": [
          "https://www.dcseu.com/affordable-home-electrification"
        ],
        "reasoningNotes": "No single safe rule was selected for heat pump, weatherization and induction terms.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22443",
    "opportunityName": "DEMEC Member Utilities - Efficiency Smart Residential Program",
    "state": "DE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22443/demec-member-utilities-efficiency-smart-residential-program",
    "websiteUrl": "https://www.efficiencysmart.org/home-energy-rebates",
    "applicationUrl": "https://www.efficiencysmart.org/home-energy-rebates/apply",
    "administrator": "Efficiency Smart",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clothes washer"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigerator"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "DE"
        ],
        "counties": [],
        "cities": [
          "Clayton",
          "Dover",
          "Lewes",
          "Middletown",
          "Milford",
          "New Castle",
          "Newark",
          "Seaford",
          "Smyrna"
        ],
        "utilityTerritories": [
          "DEMEC member municipal electric utilities participating in Efficiency Smart"
        ],
        "notes": "Only customers of participating DEMEC municipal utilities are eligible."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "cold_climate_air_source_heat_pump",
        "central_air_conditioner_replacement",
        "window_room_air_conditioner",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_refrigerator_appliance",
        "residential_clothes_washer",
        "electric_clothes_dryer",
        "efficient_pool_pump",
        "dehumidifier",
        "air_purifier"
      ],
      "hardRequirements": [
        "Applicant must be served by a participating Efficiency Smart utility.",
        "Equipment must be new, qualifying and installed at the service address.",
        "Application must include required receipt or contractor documentation and be submitted within program deadlines.",
        "Rebates are subject to annual limits and funding availability."
      ],
      "blockers": [
        "Do not match window_replacement; the supported window-related measure is a window air conditioner.",
        "Do not match commercial refrigeration; the supported refrigerator measure is a residential appliance rebate.",
        "Do not generalize residential clothes washer and electric dryer rebates into commercial laundry or broad water-efficiency retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Smart",
      "applicationUrl": "https://www.efficiencysmart.org/home-energy-rebates/apply",
      "websiteUrl": "https://www.efficiencysmart.org/home-energy-rebates",
      "sourceUrlsChecked": [
        "https://www.efficiencysmart.org/",
        "https://www.efficiencysmart.org/home-energy-rebates",
        "https://www.efficiencysmart.org/home-energy-rebates/apply"
      ],
      "evidenceText": "Efficiency Smart lists home rebates for residential heat pumps, central AC, window air conditioners, heat pump water heaters, smart thermostats, refrigerators and laundry appliances.",
      "reasoningNotes": "Delaware geography was restricted to participating DEMEC municipal utilities rather than statewide eligibility."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Efficiency Smart lists many residential rebates, but the target is broad whole-building efficiency and utility participation varies.",
        "sourceUrlsChecked": [
          "https://www.efficiencysmart.org/home-energy-rebates",
          "http://www.efficiencysmart.org/"
        ],
        "reasoningNotes": "A specific product or utility should be selected before creating a rule.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3619",
    "opportunityName": "Fort Pierce Utilities Authority - Residential Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3619/fort-pierce-utilities-authority-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://fpua.com/ways-to-save/",
    "applicationUrl": "https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf",
    "administrator": "Fort Pierce Utilities Authority",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner",
          "air conditioning"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigerator"
        ]
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar hot water"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "FL"
        ],
        "counties": [],
        "cities": [
          "Fort Pierce"
        ],
        "utilityTerritories": [
          "Fort Pierce Utilities Authority electric and natural gas service territory"
        ],
        "notes": "Electric and natural gas residential rebates are listed on FPUA’s Ways to Save page; customer must have an FPUA account."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_customer",
        "natural_gas_customer",
        "homeowner",
        "renter",
        "landlord"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system",
        "insulation_upgrade",
        "residential_refrigerator_appliance",
        "room_air_conditioner",
        "high_efficiency_central_air_conditioner",
        "natural_gas_furnace_replacement",
        "natural_gas_furnace_conversion",
        "natural_gas_water_heater_replacement",
        "natural_gas_water_heater_conversion",
        "natural_gas_clothes_dryer",
        "natural_gas_range"
      ],
      "hardRequirements": [
        "Electric rebates are for existing buildings and are first-come, first-served until funds are depleted.",
        "Solar hot water requires a new system, FSEC certification, licensed Florida contractor and is limited to one rebate per residential electric customer.",
        "Insulation rebates apply to existing air-conditioned homes, require licensed contractor installation and exclude wall insulation.",
        "Room AC and central AC rebates have efficiency, size, documentation and per-customer limits.",
        "Natural gas rebates require proof of installation or permits."
      ],
      "blockers": [
        "Do not match commercial refrigeration; the supported refrigerator measure is a residential ENERGY STAR refrigerator rebate.",
        "Do not match high_efficiency_furnace_retrofit as a generic electric HVAC measure; furnace support is for natural gas replacement or electric-to-gas conversion.",
        "Do not match insulation installed through FPUA’s WEOP program; the rebate form excludes it.",
        "Solar hot water is supported; rooftop solar PV is not this record."
      ],
      "programType": "Rebate Program",
      "administrator": "Fort Pierce Utilities Authority",
      "applicationUrl": "https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf",
      "websiteUrl": "https://fpua.com/ways-to-save/",
      "sourceUrlsChecked": [
        "https://fpua.com/ways-to-save/",
        "https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf",
        "https://fpua.com/wp-content/uploads/2025/04/Bill_Insert_April_2025_RT_final.pdf"
      ],
      "evidenceText": "FPUA lists residential electric rebates for solar hot water, insulation, ENERGY STAR refrigerators, room AC and central AC, plus natural gas appliance replacement and conversion rebates.",
      "reasoningNotes": "The furnace match was narrowed to natural-gas replacement or conversion. Refrigerator support is residential appliance, not commercial refrigeration."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "FPUA ways-to-save source did not expose a current whole-building or solar-hot-water formula in accessible text.",
        "sourceUrlsChecked": [
          "https://fpua.com/ways-to-save/"
        ],
        "reasoningNotes": "No safe per-kWh or measure-specific rule was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5145",
    "opportunityName": "Business Energy Efficiency Rebate (Offered by 18 Utilities)",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5145/business-energy-efficiency-rebate-offered-by-18-utilities",
    "websiteUrl": "https://www.brightenergysolutions.com/resources/business",
    "applicationUrl": "https://www.brightenergysolutions.com/members",
    "administrator": "Bright Energy Solutions/Missouri River Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Alton Municipal Utilities",
          "Atlantic Municipal Utilities",
          "Denison Municipal Utilities",
          "Hartley Municipal Utilities",
          "Hawarden Municipal Utilities",
          "Kimballton Municipal Utilities",
          "Lake Park Municipal Utilities",
          "Manilla Municipal Utilities",
          "Orange City Municipal Utilities",
          "Paullina Municipal Utilities",
          "Pella Municipal Electric Utility",
          "Primghar Municipal Utilities",
          "Remsen Municipal Utilities",
          "Rock Rapids Municipal Utilities",
          "Sanborn Municipal Utilities",
          "Shelby Municipal Utilities",
          "Sioux Center Municipal Utilities",
          "Woodbine Municipal Light And Power"
        ],
        "notes": "Bright Energy Solutions is a multi-state public-power platform, but this DSIRE Iowa record is limited to the listed Iowa participating utilities."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_customers",
        "industrial_customers",
        "agricultural_customers",
        "public_power_utility_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "non_residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "variable_refrigerant_flow_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "electric_chiller_upgrade",
        "demand_controlled_ventilation",
        "energy_recovery_ventilation",
        "hvac_controls_retrofit",
        "guest_room_energy_management",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "indoor_growing_led_lighting",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "refrigeration_ec_motor_retrofit",
        "refrigerated_case_lighting",
        "commercial_ice_machine",
        "efficient_air_compressor",
        "compressed_air_leak_repair",
        "compressed_air_controls",
        "variable_frequency_drive",
        "efficient_pumps",
        "commercial_kitchen_equipment",
        "high_efficiency_commercial_dishwasher",
        "induction_cooking_equipment",
        "electric_forklift",
        "industrial_process_electrification",
        "infrared_curing_and_drying",
        "custom_energy_efficiency_project",
        "custom_electrification_project"
      ],
      "hardRequirements": [
        "Applicant must be a business customer of a participating Bright Energy Solutions public-power utility.",
        "Measure availability, rebate amount and forms vary by local utility.",
        "Custom efficiency, custom electrification and infrared process projects require preapproval.",
        "Equipment must meet listed certifications or specifications such as ENERGY STAR, DLC or measure-specific criteria.",
        "Funding and rebate rules are administered through the participating utility and Bright Energy Solutions."
      ],
      "blockers": [
        "Weatherization and air sealing are not shown for current business rebate pages.",
        "Residential rebates are separate and should not match this business opportunity.",
        "Geothermal is supported as business HVAC or custom electrification, not as a generic renewable-energy grant.",
        "Product-specific food-service and refrigeration measures should not be generalized beyond listed equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Bright Energy Solutions/Missouri River Energy Services",
      "applicationUrl": "https://www.brightenergysolutions.com/members",
      "websiteUrl": "https://www.brightenergysolutions.com/resources/business",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/members",
        "https://www.brightenergysolutions.com/members/alton-municipal-utilities",
        "https://www.brightenergysolutions.com/resources/business"
      ],
      "evidenceText": "Bright Energy Solutions lists business rebates for participating public-power utilities, including Iowa utilities, covering lighting, HVAC and heat pumps, refrigeration, compressed air, food service, VFDs, custom efficiency and electrification.",
      "reasoningNotes": "Preserved the Iowa utility scope for this DSIRE record while using current Bright Energy Solutions business-measure lists; removed unsupported weatherization categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Bright Energy Solutions business rebates vary by participating utility and measure category.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Target terms are limited to geothermal/weatherization and no single business kitchen-equipment value was safely selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3508",
    "opportunityName": "MidAmerican Energy - Commercial Energy Efficiency Rebate Program",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3508/midamerican-energy-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.midamericanenergy.com/business-discounts-and-rebates",
    "applicationUrl": null,
    "administrator": "MidAmerican Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "exterior_site_lighting_retrofit",
        "displayName": "Exterior/site lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "exterior lighting"
        ]
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting retrofit"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "MidAmerican Energy Iowa service territory"
        ],
        "notes": "Applies to eligible MidAmerican Energy business customers in Iowa, subject to fuel-delivery and program requirements."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "cold_climate_heat_pump",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "central_air_conditioner_replacement",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "heat_pump_water_heater",
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "commercial_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "agricultural_fan_controls",
        "agricultural_led_grow_lighting"
      ],
      "hardRequirements": [
        "Customer must meet MidAmerican Energy business rebate qualifications.",
        "Equipment must meet current program efficiency and installation requirements.",
        "Equipment must generally be installed during the current program year and submitted within the required time window.",
        "Custom non-listed projects require preapproval through the nonresidential energy solutions path."
      ],
      "blockers": [
        "Do not match residential rebates to this commercial program.",
        "New construction and custom projects may be separate or require different approval.",
        "Existing LED-to-new LED replacements are not eligible under listed lighting rules.",
        "Do not generalize product-specific food-service or refrigeration rebates into unrelated kitchen or process retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "MidAmerican Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.midamericanenergy.com/business-discounts-and-rebates",
      "sourceUrlsChecked": [
        "https://www.midamericanenergy.com/business-discounts-and-rebates"
      ],
      "evidenceText": "MidAmerican's business page lists 2026 discounts and rebates for heat pumps, central air, geothermal, boilers, furnaces, heat pump water heaters, interior and exterior lighting, lighting controls, commercial kitchen equipment, refrigeration, and agricultural efficiency measures.",
      "reasoningNotes": "Supplied commercial HVAC, geothermal, heat pump, exterior lighting, and LED matches are supported. Add narrow product categories where official source is product-specific."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official MidAmerican commercial rebate pages did not expose a current measure formula.",
        "sourceUrlsChecked": [
          "https://www.midamericanenergy.com/business-discounts-and-rebates"
        ],
        "reasoningNotes": "No source-backed rule was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4735",
    "opportunityName": "MidAmerican Energy - Residential Energy Efficiency Rebate Programs",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4735/midamerican-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.midamericanenergy.com/home-discounts-and-rebates",
    "applicationUrl": null,
    "administrator": "MidAmerican Energy Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "freezer"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IA",
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "MidAmerican Energy Company"
        ],
        "notes": "DSIRE target state is Iowa, but the current residential rebate pages cover eligible MidAmerican Iowa and Illinois customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_refrigerator_freezer"
      ],
      "hardRequirements": [
        "Applicant must be a MidAmerican residential customer meeting the electric or gas service requirements for the measure.",
        "Eligible equipment must meet ENERGY STAR, AHRI, or program efficiency requirements where listed.",
        "Applications and rebate claims must be submitted by the stated deadline after purchase or installation.",
        "Smart thermostats must be installed, connected, registered, and replace an existing manual or programmable thermostat."
      ],
      "blockers": [
        "Residential refrigerator and freezer rebates must not be generalized to commercial refrigeration equipment.",
        "Commercial kitchen, industrial motors, and business refrigeration measures are not part of this residential program.",
        "Ductless and geothermal matches must follow MidAmerican residential HVAC discount rules and eligible service territory limits."
      ],
      "programType": "Rebate Program",
      "administrator": "MidAmerican Energy Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.midamericanenergy.com/home-discounts-and-rebates",
      "sourceUrlsChecked": [
        "https://www.midamericanenergy.com/home-discounts-and-rebates",
        "https://www.midamericanenergy.com/home-programs-and-savings"
      ],
      "evidenceText": "MidAmerican's]( current residential pages list discounts or rebates for heat pumps, central air conditioning, geothermal, heat pump water heaters, refrigerators, freezers, and smart thermostats.",
      "reasoningNotes": "Keep HVAC, HPWH, thermostat, geothermal, and residential refrigerator/freezer categories. Replace the broad commercial refrigeration category with product-specific residential refrigerator/freezer eligibility."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "MidAmerican residential rebate pages did not expose current exact HVAC or whole-building formulas in accessible text.",
        "sourceUrlsChecked": [
          "https://www.midamericanenergy.com/home-rebates",
          "https://programs.dsireusa.org/system/program/detail/4735"
        ],
        "reasoningNotes": "Do not rely on DSIRE alone for a broad whole-building target.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2407",
    "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2407/rocky-mountain-power-wattsmart-business-program",
    "websiteUrl": "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho.html",
    "applicationUrl": "https://wattsmartbusiness.com/",
    "administrator": "Rocky Mountain Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clothes washer"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration"
        ]
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting controls"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rocky Mountain Power"
        ],
        "notes": "Applies to eligible Rocky Mountain Power business customers in Idaho."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "public_sector_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "public"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_laundry_equipment",
        "high_efficiency_refrigeration_equipment",
        "lighting_controls_retrofit",
        "led_lighting_retrofit",
        "variable_frequency_drive_retrofit",
        "commercial_foodservice_equipment"
      ],
      "hardRequirements": [
        "Customer must be an eligible Rocky Mountain Power Idaho business customer.",
        "Equipment must meet Idaho wattsmart Business measure lists, efficiency criteria, and application or preapproval requirements.",
        "Lighting retrofit incentives require eligible commercial facilities and eligible baseline and installed equipment.",
        "Some measures, including custom projects, require preauthorization before purchase or installation."
      ],
      "blockers": [
        "Residential appliance rebates should not be inferred except where the business program expressly allows specific residential appliances used in a business.",
        "Water conservation-only measures are not supported unless listed in the current business incentive measure.",
        "Heat pump water heater matches must follow the applicable business or referenced wattsmart homes boundary."
      ],
      "programType": "Rebate Program",
      "administrator": "Rocky Mountain Power",
      "applicationUrl": "https://wattsmartbusiness.com/",
      "websiteUrl": "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho.html",
      "sourceUrlsChecked": [
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho.html",
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists.html",
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-hvac.html",
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-lighting.html",
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-wastewater-other-refrigeration.html"
      ],
      "evidenceText": "Rocky]( Mountain Power's Idaho wattsmart Business pages list incentives for HVAC, lighting controls, motors and drives, appliances, food service, and refrigeration.",
      "reasoningNotes": "The target business HVAC, laundry, refrigeration, and lighting-control categories are supported. Keep the sector limited to eligible Idaho business customers."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Rocky Mountain Power Idaho business page points to measure tables but no commercial kitchen/refrigeration value was verified.",
        "sourceUrlsChecked": [
          "https://www.rockymountainpower.net/savings-energy-choices/business.html"
        ],
        "reasoningNotes": "A specific current incentive table value should be extracted before merging a rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3507",
    "opportunityName": "MidAmerican Energy - Residential Energy Efficiency Rebate Programs",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3507/midamerican-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.midamericanenergy.com/home-discounts-and-rebates",
    "applicationUrl": "https://midamerican.ri-esuite.com/about/programs/residential",
    "administrator": "MidAmerican Energy Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "mini split",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "MidAmerican Energy Illinois service territory"
        ],
        "notes": "Limited to eligible MidAmerican Energy residential customers in Illinois; MidAmerican must deliver the applicable primary electric or gas service to the equipment."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_required_account_or_owner_conditions"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "central_air_conditioner_replacement",
        "high_efficiency_furnace_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat",
        "residential_refrigerator_rebate",
        "residential_freezer_rebate",
        "clothes_washer_rebate",
        "electric_clothes_dryer_rebate",
        "air_purifier_rebate"
      ],
      "hardRequirements": [
        "Customer must be an eligible MidAmerican Energy Illinois residential customer.",
        "MidAmerican must deliver the applicable primary electric or gas service to the rebated equipment.",
        "Equipment must be new, meet program efficiency requirements, and be installed during the applicable program year.",
        "Application must be submitted within the required deadline and incentives are subject to funding."
      ],
      "blockers": [
        "Do not match commercial refrigeration equipment; official residential appliance rebates are limited to household refrigerators and freezers.",
        "Do not match commercial kitchen, motors, VFDs, or industrial measures.",
        "Do not broaden residential air conditioner or furnace rebates into all high-efficiency HVAC without equipment-specific eligibility.",
        "The older Illinois EE rebates URL now redirects or is obsolete; use the current home discounts and Illinois qualifications pages."
      ],
      "programType": "Rebate Program",
      "administrator": "MidAmerican Energy Company",
      "applicationUrl": "https://midamerican.ri-esuite.com/about/programs/residential",
      "websiteUrl": "https://www.midamericanenergy.com/home-discounts-and-rebates",
      "sourceUrlsChecked": [
        "https://www.midamericanenergy.com/il-ee-rebates",
        "https://www.midamericanenergy.com/home-discounts-and-rebates",
        "https://www.midamericanenergy.com/il_qualifications-and-conditions",
        "https://www.midamericanenergy.com/media/pdf/mec-hvac-reference-res.pdf",
        "https://midamerican.ri-esuite.com/about/programs/residential"
      ],
      "evidenceText": "MidAmerican's current home rebates include residential heat pumps, central air conditioners, geothermal heat pumps, heat pump water heaters, gas furnaces, smart thermostats, air purifiers, clothes washers and dryers, refrigerators, and freezers.",
      "reasoningNotes": "Original geothermal, ductless, heat pump, and heat pump water heater matches are supported. Replace commercial refrigeration with narrow residential refrigerator and freezer appliance rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "MidAmerican Illinois rebate URL returned unavailable content for current measure values.",
        "sourceUrlsChecked": [
          "https://www.midamericanenergy.com/il-ee-rebates"
        ],
        "reasoningNotes": "No official current HVAC or HPWH rule could be verified.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
