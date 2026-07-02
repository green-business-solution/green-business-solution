You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 20
Targets in this prompt: 381-400 of 984
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
  "batchNumber": 20,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22812"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22275",
    "opportunityName": "Anaheim Public Utilities - Personal Use EV Charger Rebates",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22275/anaheim-public-utilities-personal-use-ev-charger-rebates",
    "websiteUrl": "https://www.anaheim.net/593/Private-EV-Charger-Rebate",
    "applicationUrl": "https://www.anaheim.net/593/Private-EV-Charger-Rebate",
    "administrator": "Anaheim Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger"
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
        "counties": [
          "Orange"
        ],
        "cities": [
          "Anaheim"
        ],
        "utilityTerritories": [
          "Anaheim Public Utilities"
        ],
        "notes": "Limited to Anaheim Public Utilities electric service area."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_installation",
        "electrical_panel_upgrade_for_ev_charging"
      ],
      "hardRequirements": [
        "Applicant must receive electric service from Anaheim Public Utilities.",
        "Project must install a qualifying Level 2 EV charger at a home or business in the service area.",
        "Final City permit, proof of purchase and installation cost, photos, and current utility bill are required.",
        "Rebate is limited to one per customer.",
        "Eligible costs may include charger, installation, electric upgrades, and permit fees."
      ],
      "blockers": [
        "Fleet charger and infrastructure rebates are a separate Anaheim program.",
        "Public DC fast charging projects are not supported by this personal-use rebate.",
        "Level 1 charging should not match.",
        "Projects outside Anaheim Public Utilities electric service area should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Anaheim Public Utilities",
      "applicationUrl": "https://www.anaheim.net/593/Private-EV-Charger-Rebate",
      "websiteUrl": "https://www.anaheim.net/593/Private-EV-Charger-Rebate",
      "sourceUrlsChecked": [
        "https://www.anaheim.net/593/Private-EV-Charger-Rebate",
        "https://programs.dsireusa.org/system/program/detail/22275/anaheim-public-utilities-personal-use-ev-charger-rebates"
      ],
      "evidenceText": "Anaheim's private EV charger rebate supports Level 2 charger installation at homes or businesses and may include panel upgrades, permit fees, and installation costs.",
      "reasoningNotes": "Original EV charger and Level 2 categories are correct; add electric panel upgrade for EV charging as a supported related measure."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f95b574fabe7f491_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 60000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$600 per eligible unit",
        "evidenceText": "EV Charger Rebate Receive up to $300 or $600 Rebates are subject to fund availability",
        "sourceUrlsChecked": [
          "http://www.anaheim.net/593/Personal-EV-Charger-Rebate"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1625",
    "opportunityName": "Anaheim Public Utilities - Small Business Energy & Water Direct Install Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1625/anaheim-public-utilities-small-business-energy-and-water-direct-install-program",
    "websiteUrl": "https://www.anaheim.net/965/Small-Business-Energy-Water-Direct-Insta",
    "applicationUrl": null,
    "administrator": "Anaheim Public Utilities",
    "programType": "Direct Install Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "led lighting"
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
          "Anaheim"
        ],
        "utilityTerritories": [
          "Anaheim Public Utilities"
        ],
        "notes": "Available to qualifying small business customers in Anaheim Public Utilities territory; funding is first-come, first-served."
      },
      "eligibleApplicantTypes": [
        "small_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "commercial_refrigeration_efficiency",
        "hvac_tune_up",
        "smart_thermostat_zoning_retrofit",
        "water_efficient_toilet_urinal_retrofit",
        "faucet_aerator_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an Anaheim Public Utilities small business customer.",
        "Customer must contact the program to confirm eligibility before relying on funding.",
        "Energy and water measure allowances are capped and subject to available funding."
      ],
      "blockers": [
        "Official direct-install page supports HVAC tune-ups and thermostat measures, not full high-efficiency HVAC replacement.",
        "EV charging, heat pump, and broader customer incentive offerings are separate Anaheim programs and should not be matched to this opportunity."
      ],
      "programType": "Direct Install Program",
      "administrator": "Anaheim Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.anaheim.net/965/Small-Business-Energy-Water-Direct-Insta",
      "sourceUrlsChecked": [
        "https://www.anaheim.net/965/Small-Business-Energy-Water-Direct-Insta"
      ],
      "evidenceText": "Official page lists small business direct-install measures including LED lighting, lighting controls, refrigeration enhancements, HVAC tune-ups, smart thermostats, toilets, urinals, and aerators with capped energy and water allowances.",
      "reasoningNotes": "Input target file cited: . Preserve LED and product-specific energy/water measures. Remove generic HVAC replacement because the current source only supports HVAC tune-up and thermostat work."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3e931c0ec0d2538e_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 300000
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $3,000 allowance for eligible small-business energy upgrades",
        "evidenceText": "Anaheim small business direct install page describes LED lighting upgrade options with an allowance up to $3,000.",
        "sourceUrlsChecked": [
          "https://www.anaheim.net/965/Small-Business-Energy-Water-Direct-Insta"
        ],
        "reasoningNotes": "Matched LED lighting direct-install target. Medium because the program delivers direct-install upgrades rather than a conventional rebate.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22278",
    "opportunityName": "Azusa Light & Water - EV Charger Rebate",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22278/azusa-light-and-water-ev-charger-rebate",
    "websiteUrl": "https://www.azusaca.gov/1625/Plug-In-Electric-Vehicles",
    "applicationUrl": "https://www.azusaca.gov/DocumentCenter/View/47059/Final-ES-and-Weatherization-Application-Form-08022023",
    "administrator": "Azusa Light & Water",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger"
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
        "counties": [
          "Los Angeles"
        ],
        "cities": [
          "Azusa"
        ],
        "utilityTerritories": [
          "Azusa Light & Water"
        ],
        "notes": "Limited to Azusa Light & Water accounts with a service address in Azusa."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "residential_ev_charger"
      ],
      "hardRequirements": [
        "Applicant must have an Azusa Light & Water account and qualifying service address.",
        "Application must include paid receipts or invoices dated within the program deadline.",
        "Required product and efficiency documentation must be submitted.",
        "Limit is one EV charger rebate per residence per year.",
        "Rebate cannot exceed product cost and is subject to available funding."
      ],
      "blockers": [
        "Current official rebate form verifies an electric vehicle charger rebate but does not state DC fast charging eligibility.",
        "Current official application does not clearly state Level 2 specificity; do not preserve Level 2 matching unless independently verified in current terms.",
        "Azusa public charging station listings are separate city charging services, not customer charger rebates.",
        "Projects outside Azusa Light & Water service addresses should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Azusa Light & Water",
      "applicationUrl": "https://www.azusaca.gov/DocumentCenter/View/47059/Final-ES-and-Weatherization-Application-Form-08022023",
      "websiteUrl": "https://www.azusaca.gov/1625/Plug-In-Electric-Vehicles",
      "sourceUrlsChecked": [
        "https://www.azusaca.gov/1625/Plug-In-Electric-Vehicles",
        "https://www.azusaca.gov/DocumentCenter/View/47059/Final-ES-and-Weatherization-Application-Form-08022023",
        "https://programs.dsireusa.org/system/program/detail/22278/azusa-light-and-water-ev-charger-rebate"
      ],
      "evidenceText": "Azusa's current rebate application lists an Electric Vehicle Charger rebate with a one-per-residence-per-year limit, account and service-address requirements, receipt requirements, and funding limits.",
      "reasoningNotes": "Repair to generic residential EV charger because current official application verifies the charger rebate but not Level 2 specificity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8b2c38899b3b12e9_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 15000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$150 per ENERGY STAR certified Level 2 EV charger",
        "evidenceText": "DSIRE/Azusa EV rebate summary identifies a $150 rebate for Level 2 residential chargers.",
        "sourceUrlsChecked": [
          "https://www.azusaca.gov/1625/Plug-In-Electric-Vehicles",
          "https://programs.dsireusa.org/system/program/detail/22278/azusa-light-water-ev-charger-rebate"
        ],
        "reasoningNotes": "Matched Level 2 charger terms. Confidence is medium because the official city page did not expose amount in fetched text.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22150",
    "opportunityName": "California Electric Vehicle Infrastructure Project (CALeVIP)",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22150/california-electric-vehicle-infrastructure-project-calevip",
    "websiteUrl": "https://calevip.org/",
    "applicationUrl": null,
    "administrator": "California Energy Commission",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide California program with funding windows and eligible-site requirements; equity and disadvantaged-community criteria may apply."
      },
      "eligibleApplicantTypes": [
        "property_owners",
        "contractors",
        "businesses",
        "public_entities",
        "private_entities",
        "california_native_american_tribes"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "public",
        "tribal",
        "workplace",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "public_dc_fast_ev_charger_installation",
        "public_ev_charger_installation"
      ],
      "hardRequirements": [
        "Project must be located in California.",
        "Current CALeVIP 2.0 funding focuses on publicly available DC fast chargers.",
        "Current fast charger incentives require eligible site types and high-powered chargers.",
        "Applications must be submitted during applicable funding windows through the program platform.",
        "Low-income and disadvantaged community funding allocations may apply."
      ],
      "blockers": [
        "Window replacement is a false positive and is not part of CALeVIP.",
        "Private residential home chargers should not be matched to CALeVIP 2.0 public fast charger funding.",
        "General building energy efficiency measures are not eligible.",
        "Historical Level 2 project data should not be treated as current eligibility unless a current funding window supports it."
      ],
      "programType": "Rebate",
      "administrator": "California Energy Commission",
      "applicationUrl": null,
      "websiteUrl": "https://calevip.org/",
      "sourceUrlsChecked": [
        "https://calevip.org/",
        "https://www.energy.ca.gov/programs-and-topics/programs/california-electric-vehicle-infrastructure-project-calevip-20",
        "https://www.caclimateinvestments.ca.gov/california-electric-vehicle-infrastructure-project-calevip",
        "https://energycenter.org/program/california-electric-vehicle-infrastructure-project"
      ],
      "evidenceText": "Current CALeVIP sources describe incentives for publicly available EV charging infrastructure, especially high-powered DC fast chargers at eligible California sites.",
      "reasoningNotes": "The EV charging match is valid but should be narrowed to public EV charging infrastructure. Window replacement was caused by an unrelated word and must be blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4554d26740d866e8_v1",
        "incentiveType": "dc_fast_charging_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 1
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 10000000,
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to 100% of eligible DC fast charger costs, capped at $100,000 per charging port",
        "evidenceText": "CALeVIP Fast Charge California Project says incentives can cover up to 100% of approved costs, capped at $100,000 per port.",
        "sourceUrlsChecked": [
          "https://calevip.org/fast-charge-california-project",
          "https://www.energy.ca.gov/programs-and-topics/programs/california-electric-vehicle-infrastructure-project-calevip-20"
        ],
        "reasoningNotes": "Matched electric vehicle charging. Confidence is medium because funding windows/project readiness govern availability.",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program",
    "opportunityName": "Commercial Solar Rebate Program",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/82360/638850641502800000",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
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
          "solar photovoltaic",
          "solar pv",
          "photovoltaic",
          "pv system"
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
        "counties": [
          "Santa Clara"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power electric service territory"
        ],
        "notes": "Limited to Silicon Valley Power commercial customers in Santa Clara, California."
      },
      "eligibleApplicantTypes": [
        "silicon_valley_power_commercial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "business",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "commercial_solar_pv"
      ],
      "hardRequirements": [
        "Applicant must be a Silicon Valley Power customer installing a qualifying commercial PV system.",
        "Project must be between 50 kW and 1 MW.",
        "System may not exceed 80% of the customer's annual usage.",
        "Project must be pre-approved before beginning work.",
        "Projects are first-come, first-served until funds are exhausted."
      ],
      "blockers": [
        "No low-flow fixture, plumbing, or water-efficiency retrofit is supported.",
        "The fixture match is a false positive from unrelated wording.",
        "The program is for solar photovoltaic systems only, not broad building retrofits.",
        "Residential solar should not be inferred from this commercial opportunity."
      ],
      "programType": "Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/82360/638850641502800000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/82360/638850641502800000"
      ],
      "evidenceText": "Silicon Valley Power describes a commercial solar PV rebate for qualifying PV systems with size, usage, pre-approval, and funding limits.",
      "reasoningNotes": "Keep a commercial solar PV category, but remove the false low-flow fixture category."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8c6c9416aa9b702a_v1",
        "incentiveType": "solar_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 75000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$0.75 per watt AC for the lump-sum commercial solar rebate",
        "evidenceText": "Application lists Lump Sum $0.75/W and says use CEC-AC Design Corrected Watt rating.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/82360/638850641502800000"
        ],
        "reasoningNotes": "Use the upfront lump-sum option. The alternative performance-based option is paid over two years and should not be modeled as upfront.",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22280",
    "opportunityName": "Glendale Water and Power - Electric Vehicle Charging Station Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22280/glendale-water-and-power-electric-vehicle-charging-station-rebate-program",
    "websiteUrl": "https://www.glendaleca.gov/government/departments/glendale-water-and-power/electric-vehicles",
    "applicationUrl": null,
    "administrator": "Glendale Water and Power",
    "programType": "EV Charger Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging",
          "charging station",
          "electric vehicle charging"
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
          "Glendale"
        ],
        "utilityTerritories": [
          "Glendale Water and Power"
        ],
        "notes": "Eligible Glendale Water and Power residential, commercial, and multifamily electric customers within program rules."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "income_qualified_customers",
        "commercial_electric_customers",
        "multifamily_property_owners",
        "nonprofit_site_hosts",
        "public_charging_site_hosts"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_panel_upgrade",
        "commercial_ev_charging_station_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Glendale Water and Power customer or qualifying project host.",
        "Residential rebate amount depends on whether the charger is networked and whether customer qualifies for Glendale Care.",
        "Panel upgrade adder is tied to qualifying residential EV charging installation.",
        "Commercial and multifamily incentives are capped by project cost and program category."
      ],
      "blockers": [
        "The off-peak charging incentive is a separate monthly rate or charging program and should not be merged into the charger rebate.",
        "E-bike, solar, and water rebates are separate GWP programs.",
        "General electrical upgrades unrelated to EV charging should not match."
      ],
      "programType": "EV Charger Rebate",
      "administrator": "Glendale Water and Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.glendaleca.gov/government/departments/glendale-water-and-power/electric-vehicles",
      "sourceUrlsChecked": [
        "https://www.glendaleca.gov/government/departments/glendale-water-and-power/electric-vehicles",
        "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs",
        "https://www.glendaleca.gov/government/departments/glendale-water-and-power/business-customers",
        "https://www.bringyourowncharger.com/gwp-home"
      ],
      "evidenceText": "GWP current EV page lists residential charger rebates, panel upgrade adders, and commercial or multifamily EV charging station rebates.",
      "reasoningNotes": "EV charger matches are valid; add panel upgrade and commercial project boundaries while separating the off-peak charging program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_caa4810bfe669c3c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.8
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 7500000
        },
        "confidence": "high",
        "formula": "80% of eligible project cost, capped at $75,000",
        "evidenceText": "Customers who meet one of the following criteria are eligible to receive the lesser of $75,000 or 75% of the total project cost: Projects in an income-qualified housing structure that serves at least 80% of low-income residents as identified by the State of California Projects in a disadvantaged community as designated by the California EPA here",
        "sourceUrlsChecked": [
          "https://www.glendaleca.gov/government/departments/glendale-water-and-power/electric-vehicles"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22525",
    "opportunityName": "Modesto Irrigation District - Electric Vehicle  Charger Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22525/modesto-irrigation-district-electric-vehicle-charger-rebate-program",
    "websiteUrl": "https://www.mid.org/saving-energy-money/electric-vehicles/",
    "applicationUrl": null,
    "administrator": "Modesto Irrigation District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Modesto Irrigation District"
        ],
        "notes": "MID electric service territory; this record is treated as the business/commercial EV charger rebate distinct from the residential record."
      },
      "eligibleApplicantTypes": [
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
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an MID business electric customer in good standing.",
        "Rebate is for purchase and installation of qualifying Level 2 EV charging equipment.",
        "Equipment and quantity restrictions are controlled by the current MID application or catalog.",
        "Project must be submitted through MID rebate procedures with required purchase and installation documentation."
      ],
      "blockers": [
        "Do not match EV purchases, residential-only charger applications, Level 1 chargers, DC fast chargers, solar, or battery storage.",
        "Do not infer general electrical upgrades beyond qualifying Level 2 EVSE installation.",
        "Current MID webpages returned limited text or 403 in browser, so equipment-list details should be verified at application."
      ],
      "programType": "Rebate Program",
      "administrator": "Modesto Irrigation District",
      "applicationUrl": null,
      "websiteUrl": "https://www.mid.org/saving-energy-money/electric-vehicles/",
      "sourceUrlsChecked": [
        "https://www.mid.org/saving-energy-money/electric-vehicles/",
        "https://www.mid.org/saving-energy-money/rebates/business-rebates/",
        "https://mid.chooseev.com/recommendations/print/864/?c=mid",
        "https://www.mid.org/rebates/commercial/documents/MID_business_catalog_and_app.pdf"
      ],
      "evidenceText": "MID]( materials describe up to a $350 rebate for Level 2 EV chargers, and MID business rebates serve commercial, industrial and agricultural customers.",
      "reasoningNotes": "The EVSE match is valid only for Level 2 charger installation. It should not generalize into EV purchase or broader electrical work."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3129e9048fa7c98f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 35000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $350 per eligible Level 2 EV charger",
        "evidenceText": "MID EV charger rebate materials state customers may receive up to $350 for a Level 2 charger.",
        "sourceUrlsChecked": [
          "https://ev.chooseev.com/modesto/rebates/",
          "https://www.mid.org/electric-vehicles"
        ],
        "reasoningNotes": "Matched Level 2 charger term. Confidence is medium because the source describes the rebate as up to.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22428",
    "opportunityName": "Modesto Irrigation District - Residential Electric Vehicle Charger Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22428/modesto-irrigation-district-residential-electric-vehicle-charger-rebate-program",
    "websiteUrl": "https://www.mid.org/saving-energy-money/rebates/residential-rebates/",
    "applicationUrl": null,
    "administrator": "Modesto Irrigation District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Modesto Irrigation District"
        ],
        "notes": "Residential dwellings receiving electricity from MID."
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
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an MID residential electric customer in good standing.",
        "Qualifying Level 2 EV charger must be installed at a residential dwelling receiving MID electricity.",
        "Equipment must satisfy MID rebate terms and any current application restrictions.",
        "Customer must submit required application and purchase or installation documentation."
      ],
      "blockers": [
        "Do not match business, fleet, or agricultural EV charger installations to this residential record.",
        "Do not match EV purchases, portable/non-Level-2 equipment, solar, storage, or general electrical upgrades.",
        "Current MID webpages returned limited text or 403 in browser, so model-specific eligibility should be verified at application."
      ],
      "programType": "Rebate Program",
      "administrator": "Modesto Irrigation District",
      "applicationUrl": null,
      "websiteUrl": "https://www.mid.org/saving-energy-money/rebates/residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.mid.org/saving-energy-money/electric-vehicles/",
        "https://www.mid.org/saving-energy-money/rebates/residential-rebates/",
        "https://www.mid.org/saving-energy-money/rebates/rebate-terms-conditions/",
        "https://mid.chooseev.com/recommendations/print/864/?c=mid",
        "https://www.mid.org/rebates/home/documents/MID_residential_app_and_catalog.pdf"
      ],
      "evidenceText": "MID]( materials show up to a $350 Level 2 EV charger rebate; residential rebate terms limit rebates to qualifying products in MID-served dwellings.",
      "reasoningNotes": "Residential Level 2 EVSE installation is supported. Broader EV, solar, storage, commercial, or electrical-upgrade categories are separate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0410e84a00f957a0_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 35000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $350 per eligible Level 2 EV charger",
        "evidenceText": "MID EV charger rebate materials state customers may receive up to $350 for a Level 2 charger.",
        "sourceUrlsChecked": [
          "https://ev.chooseev.com/modesto/rebates/",
          "https://www.mid.org/electric-vehicles"
        ],
        "reasoningNotes": "Matched Level 2 charger term. Confidence is medium because the source says up to.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant",
    "opportunityName": "Nonprofit Solar Grant",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000",
    "administrator": "Silicon Valley Power",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
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
          "solar photovoltaic",
          "solar pv",
          "photovoltaic",
          "pv system"
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
          "Silicon Valley Power electric service territory"
        ],
        "notes": "Limited to qualifying nonprofit SVP customers in the City of Santa Clara."
      },
      "eligibleApplicantTypes": [
        "nonprofit_organizations",
        "nonprofit_commercial_customers"
      ],
      "eligibleSectors": [
        "nonprofit",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system",
        "rooftop_solar_pv"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying nonprofit SVP customer",
        "Grant is for installation of solar photovoltaic generation at an eligible facility",
        "Project must receive SVP approval and meet program documentation requirements",
        "Grant cannot exceed program caps or the share of facility electricity allowed by the program"
      ],
      "blockers": [
        "low_flow_fixture_retrofit is a false positive; water fixtures are not eligible",
        "Building repairs are only ancillary PV-ready costs and not standalone retrofits",
        "Battery storage and other non-PV measures are not supported by this grant",
        "Nonprofit and SVP territory requirements block general commercial matching"
      ],
      "programType": "Grant",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000"
      ],
      "evidenceText": "SVP’s nonprofit grant application supports solar photovoltaic installation for qualifying nonprofit electric customers, with PV-ready infrastructure allowed only as a limited ancillary cost.",
      "reasoningNotes": "Preserve solar PV. Remove water-fixture matching caused by the word fixture in the application context."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ea7f4e7429c88a8b_v1",
        "incentiveType": "grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 1
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 25000000
        },
        "confidence": "medium",
        "formula": "up to $250,000 of eligible project cost",
        "evidenceText": "Grant award limits will be paid based on energy saved, subject to a maximum of 85 percent of project cost up to a $250,000 limit per customer",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22289",
    "opportunityName": "Pasadena Water and Power - Commercial Charger Incentive Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22289/pasadena-water-and-power-commercial-charger-incentive-program",
    "websiteUrl": "https://pwp.cityofpasadena.net/commercialchargerrebate/",
    "applicationUrl": "https://pwp.cityofpasadena.net/wp-content/uploads/2022/01/CEVSE-Incentive-Application-form-fillable-10-1-2021.pdf",
    "administrator": "Pasadena Water and Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging",
          "evse"
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
          "Pasadena"
        ],
        "utilityTerritories": [
          "Pasadena Water and Power electric service territory"
        ],
        "notes": "Limited to eligible nonresidential PWP electric customers within Pasadena."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customers",
        "multifamily_property_owners",
        "workplace_charging_hosts",
        "fleet_operators",
        "schools",
        "public_entities",
        "nonprofit_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily_residential",
        "public_sector",
        "nonprofit",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must have an active eligible PWP commercial electric account in good standing",
        "Charging equipment must be installed in PWP territory",
        "Permits, licensed contractor installation, and final documentation are required",
        "Level 2 networked equipment must meet connector, voltage, capacity, and listing requirements",
        "DC fast chargers must meet the program’s higher-power and connector requirements"
      ],
      "blockers": [
        "Residential charger projects are covered by a separate PWP residential program",
        "Non-PWP customers are not eligible",
        "Leased, rebuilt, replacement, prize, or otherwise ineligible charging equipment is blocked",
        "No permits, inspections, or required documentation blocks payment",
        "Funding availability and public-access or use requirements can block matching"
      ],
      "programType": "Rebate",
      "administrator": "Pasadena Water and Power",
      "applicationUrl": "https://pwp.cityofpasadena.net/wp-content/uploads/2022/01/CEVSE-Incentive-Application-form-fillable-10-1-2021.pdf",
      "websiteUrl": "https://pwp.cityofpasadena.net/commercialchargerrebate/",
      "sourceUrlsChecked": [
        "https://pwp.cityofpasadena.net/commercialchargerrebate/",
        "https://pwp.cityofpasadena.net/wp-content/uploads/2022/01/CEVSE-Incentive-Application-form-fillable-10-1-2021.pdf",
        "https://pwp.cityofpasadena.net/wp-content/uploads/2022/07/Commercial-EV-Charging-Incentive-Program-TC-11-2-2023.pdf"
      ],
      "evidenceText": "PWP’s commercial charger program supports smart Level 2 charging and DC fast charging incentives for eligible nonresidential PWP customers, including workplace, multifamily, fleet, school, and public-use sites.",
      "reasoningNotes": "Level 2 EV charging is source-backed. Add DC fast charging because official commercial terms include DC fast charger incentives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5a2926e03a00f82d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 800000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$8,000 per eligible unit",
        "evidenceText": "A double-incentive bonus ( up to $8,000 per charger ) is available for the following sites: Any DC Fast Charger equipped with SAE Combo (CCS), Tesla, or an equivalent that is approved by PWP",
        "sourceUrlsChecked": [
          "https://ww5.cityofpasadena.net/water-and-power/commercialchargerrebate/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22288",
    "opportunityName": "Pasadena Water and Power - Residential Electric Vehicle and Charger Incentive Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22288/pasadena-water-and-power-residential-electric-vehicle-and-charger-incentive-program",
    "websiteUrl": "https://pwp.cityofpasadena.net/residentialevrebate/",
    "applicationUrl": "https://myaccount.pwpweb.com/",
    "administrator": "Pasadena Water and Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger"
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
          "Pasadena"
        ],
        "utilityTerritories": [
          "Pasadena Water and Power residential electric service territory"
        ],
        "notes": "Limited to PWP residential electric customers at the service address."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible PWP residential electric customer",
        "Charger must be new Level 2 equipment installed at the service address",
        "Wi-Fi or internet-connected chargers qualify for the higher charger rebate",
        "Permit and inspection requirements apply for hardwired or new/modified 240-volt installations",
        "Application must be submitted within the stated post-purchase deadline"
      ],
      "blockers": [
        "Commercial charging is a separate PWP program",
        "EV purchase incentives are separate from charger installation matching",
        "Level 1, socket-only, portable, leased, resold, rebuilt, and switchable Level 1/Level 2 equipment are not eligible",
        "Non-PWP customers are not eligible",
        "Unpermitted work or missing inspection documentation blocks eligibility"
      ],
      "programType": "Rebate",
      "administrator": "Pasadena Water and Power",
      "applicationUrl": "https://myaccount.pwpweb.com/",
      "websiteUrl": "https://pwp.cityofpasadena.net/residentialevrebate/",
      "sourceUrlsChecked": [
        "https://pwp.cityofpasadena.net/residentialevrebate/",
        "https://pwp.cityofpasadena.net/evchargers/",
        "https://myaccount.pwpweb.com/"
      ],
      "evidenceText": "PWP residential materials support rebates for new Level 2 home chargers, including higher rebates for Wi-Fi or internet-connected chargers, with permit, equipment, and submission requirements.",
      "reasoningNotes": "Keep Level 2 charger installation. Block vehicle rebate and commercial charger matching because those are separate PWP opportunities."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3b771388ed2708fe_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 400000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$4,000 per eligible unit",
        "evidenceText": "\" -- Residential EV Rebate Program Participant, District 3 Used Vehicle Rebate Home Charger Rebate How to Qualify & Apply USED ELECTRIC VEHICLE INCENTIVES Federal used EV tax credit ends September 30, 2025 The federal used clean vehicle credit provides up to $4,000 for eligible purchases",
        "sourceUrlsChecked": [
          "https://ww5.cityofpasadena.net/water-and-power/residentialevrebate/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131",
    "opportunityName": "Power Your Drive for Fleets",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
    "websiteUrl": "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets",
    "applicationUrl": "https://www.sdge.com/mdhd-interest-form",
    "administrator": "San Diego Gas & Electric",
    "programType": "Utility Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging"
        ]
      },
      {
        "retrofitTypeId": "fleet_charging_infrastructure",
        "displayName": "Fleet charging infrastructure",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "power your drive for fleets"
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
        "cities": [],
        "utilityTerritories": [
          "San Diego Gas & Electric"
        ],
        "notes": "Limited to eligible medium- and heavy-duty fleet charging sites in SDG&E service territory."
      },
      "eligibleApplicantTypes": [
        "fleet_owners",
        "fleet_operators",
        "businesses",
        "public_agencies",
        "school_districts",
        "transit_agencies"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public",
        "transportation",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "fleet_charging_infrastructure",
        "make_ready_ev_charging_infrastructure",
        "ev_charger_installation",
        "dc_fast_ev_charger_installation"
      ],
      "hardRequirements": [
        "Project must be in SDG&E service territory.",
        "Applicant must commit to procure at least two Class 2 through Class 8 electric fleet vehicles.",
        "Customer must provide a long-term electrification plan and load increase schedule.",
        "Customer must provide charger usage data for at least five years.",
        "Customer must own or lease the property and operate and maintain the vehicles and chargers for the required program term.",
        "Customers buy, own, and maintain the chargers while SDG&E supports eligible make-ready infrastructure."
      ],
      "blockers": [
        "Do not match residential or personal light-duty EV charging.",
        "Do not treat this as an electric vehicle purchase rebate.",
        "Additional charger rebates are limited to eligible school bus, transit, disadvantaged community, or similar qualifying fleets under program terms."
      ],
      "programType": "Utility Program",
      "administrator": "San Diego Gas & Electric",
      "applicationUrl": "https://www.sdge.com/mdhd-interest-form",
      "websiteUrl": "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets",
      "sourceUrlsChecked": [
        "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets",
        "https://www.sdge.com/mdhd-interest-form",
        "https://www.sdge.com/sites/default/files/documents/FINAL_S2370051_PYD%20Fleet_FS_ONLINE%20%282%29.pdf?nid=24741"
      ],
      "evidenceText": "SDG&E describes make-ready infrastructure and eligible charger rebates for medium and heavy-duty fleet charging, with Class 2-8 vehicle, data-sharing, and long-term site-operation requirements.",
      "reasoningNotes": "The fleet EV charging infrastructure match is supported. The opportunity should not be generalized to residential EVSE, EV purchases, or non-fleet charging."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7f768da54b256d22_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 4500000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$45,000 per eligible unit",
        "evidenceText": "1 kW up to 150 kW $45,000 per charger 150",
        "sourceUrlsChecked": [
          "https://www.sdge.com/node/15131",
          "https://www.sdge.com/business/electric-vehicles/lovelectric"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22298",
    "opportunityName": "Black Hills Energy - Ready EV Electric Vehicle Charging Rebate",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22298/black-hills-energy-ready-ev-electric-vehicle-charging-rebate",
    "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/welcome-ready-ev/welcome-colorado-ready-ev/residential-rebates",
    "applicationUrl": null,
    "administrator": "Black Hills Energy",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "cities": [],
        "utilityTerritories": [
          "Black Hills Energy Colorado electric service territory"
        ],
        "notes": "The reviewed residential Ready EV rebate applies to Black Hills Energy electric customers in Colorado."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "income_qualified_residential_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a current Black Hills Energy electric customer.",
        "Customer must drive an all-electric or plug-in hybrid electric vehicle.",
        "Customer must purchase an approved Level 2 EV charger.",
        "Charger must be installed by a licensed electrician at a location receiving Black Hills Energy electric service.",
        "Customer must agree to applicable time-of-day rate and program terms.",
        "Rebate cannot exceed actual equipment and installation cost."
      ],
      "blockers": [
        "Level 1 charging equipment is not supported by the residential rebate.",
        "Locations outside Black Hills Energy electric territory are not eligible.",
        "Nonresidential EV charging rebates are handled as separate Ready EV offerings.",
        "General panel upgrades or unrelated electrical work should not be matched unless required and included under the approved charger installation cost."
      ],
      "programType": "Rebate",
      "administrator": "Black Hills Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/welcome-ready-ev/welcome-colorado-ready-ev/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.blackhillsenergy.com/efficiency-and-savings/ready-ev",
        "https://www.blackhillsenergy.com/efficiency-and-savings/welcome-ready-ev/welcome-colorado-ready-ev",
        "https://www.blackhillsenergy.com/efficiency-and-savings/welcome-ready-ev/welcome-colorado-ready-ev/residential-rebates",
        "https://www.blackhillsenergy.com/efficiency-and-savings/welcome-ready-ev/ev-rebates-home-and-business",
        "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-Income-Qualified-Residential-EV-Charger-Rebate-Form.pdf"
      ],
      "evidenceText": "The residential Colorado Ready EV page lists rebates for purchase and installation of Level 2 EV chargers, with higher income-qualified incentives.",
      "reasoningNotes": "The retrofit match is valid for Level 2 residential EV charging, with territory, vehicle, approved-equipment, and licensed-electrician conditions."
    },
    "existingSimpleRules": [
      {
        "id": "oir_34bb7d37fc5b271f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$500 per residential Level 2 EV charging port",
        "evidenceText": "Black Hills Ready EV residential rebate lists $500 per Level 2 charging port.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/ready-ev"
        ],
        "reasoningNotes": "Matched Level 2 EV charging term. Standard residential amount is selected.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22299",
    "opportunityName": "Gunnison County Electric - Electric Vehicle Rebates",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22299/gunnison-county-electric-electric-vehicle-rebates",
    "websiteUrl": "https://www.gcea.coop/energy-efficiency/electric-vehicles/ev-rebates/",
    "applicationUrl": null,
    "administrator": "Gunnison County Electric Association",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Gunnison County Electric Association"
        ],
        "notes": "Limited to Gunnison County Electric Association member accounts."
      },
      "eligibleApplicantTypes": [
        "utility_member",
        "residential_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Gunnison County Electric Association member.",
        "Rebate applies to eligible installed EV charging equipment.",
        "Member-account lifetime and per-installed-charger limits may apply.",
        "Current incentive amounts and eligibility must be confirmed with GCEA before matching."
      ],
      "blockers": [
        "Do not match vehicle purchase incentives to this charger-focused opportunity unless the current GCEA program confirms vehicle eligibility.",
        "Do not match non-installed portable EV accessories.",
        "Official pages returned access errors during review, so categories should not be broadened beyond charger rebate evidence."
      ],
      "programType": "Rebate",
      "administrator": "Gunnison County Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.gcea.coop/energy-efficiency/electric-vehicles/ev-rebates/",
      "sourceUrlsChecked": [
        "https://www.gcea.coop/energy-efficiency/electric-vehicles/ev-rebates/",
        "https://www.gcea.coop/faqs_category/ev-rebates/",
        "https://www.gcea.coop/faqs/gcea-level-2-ev-charging-station-rebates/"
      ],
      "evidenceText": "Official GCEA search results and FAQ titles identify rebates for installed Level 2 EV charging stations and EV charging equipment, but page access was limited.",
      "reasoningNotes": "The Level 2 EV charger match is supported. Broader EV charging should remain narrowed because current official pages were not fully readable."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7af6dd98a5aa5884_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 50000
        },
        "confidence": "medium",
        "formula": "50% of Level 2 EV charger purchase price, capped at $500",
        "evidenceText": "GCEA EV rebate FAQ says charger-only rebates are 50% of purchase price up to $500.",
        "sourceUrlsChecked": [
          "https://www.gcea.coop/energy-efficiency/electric-vehicles/ev-rebates/"
        ],
        "reasoningNotes": "Matched Level 2 charger terms. Basis is equipment cost because evidence says purchase price.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22166",
    "opportunityName": "Electric Vehicle Charging Equipment Rebates",
    "state": "DE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22166/electric-vehicle-charging-equipment-rebates",
    "websiteUrl": "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/ev-charging-equipment-rebates/",
    "applicationUrl": "https://documents.dnrec.delaware.gov/energy/transportation-program/EV-Charging-Station-Rebate-Pre-Application.pdf",
    "administrator": "Delaware Department of Natural Resources and Environmental Control",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Delaware program for eligible non-single-family charging sites."
      },
      "eligibleApplicantTypes": [
        "business",
        "nonprofit",
        "government_entity",
        "public_school_college_university",
        "homeowners_association",
        "multifamily_property_owner",
        "property_management_company",
        "fleet_operator",
        "employer"
      ],
      "eligibleSectors": [
        "commercial",
        "nonprofit",
        "government",
        "education",
        "multifamily",
        "fleet",
        "workplace",
        "public_access"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Charging station must be installed in Delaware.",
        "Eligible site uses include multi-family, public access, fleet, and workplace charging.",
        "Program supports Level 2 AC charging stations.",
        "Pre-approval is required before purchase or installation.",
        "Single-family home charging station rebates are not offered.",
        "Rebates are first-come, first-served and subject to funding caps and site limits."
      ],
      "blockers": [
        "Single-family residential home charger projects are not eligible.",
        "Do not match DC fast chargers unless separately authorized; official guidelines identify Level 2 AC chargers.",
        "Projects started or equipment purchased before required pre-approval may be ineligible.",
        "This is not an EV vehicle purchase rebate."
      ],
      "programType": "Rebate",
      "administrator": "Delaware Department of Natural Resources and Environmental Control",
      "applicationUrl": "https://documents.dnrec.delaware.gov/energy/transportation-program/EV-Charging-Station-Rebate-Pre-Application.pdf",
      "websiteUrl": "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/ev-charging-equipment-rebates/",
      "sourceUrlsChecked": [
        "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/ev-charging-equipment-rebates/",
        "https://documents.dnrec.delaware.gov/energy/transportation-program/EV-Charging-Station-Rebate-Pre-Application.pdf",
        "https://documents.dnrec.delaware.gov/energy/transportation-program/Multi-Family-Charging-Station-Rebate-Program-Guidelines.pdf",
        "https://documents.dnrec.delaware.gov/energy/transportation-program/Public-Access-Fleet-Workplace-Charging-Station-Rebate-Program-Guidelines.pdf"
      ],
      "evidenceText": "DNREC offers Level 2 EV charging station rebates for multi-family, public access, fleet, and workplace sites, while excluding single-family home chargers.",
      "reasoningNotes": "Keep Level 2 EV charging but add strong sector and single-family blockers."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e8688abf82834b39_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.9
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "90% of eligible project cost",
        "evidenceText": "Enhanced incentive levels of up to 90% of eligible purchase and installation costs are available for multi-family dwelling projects in areas identified as Priority Areas — disadvantaged and/or underserved areas where eliminating barriers to electric vehicle adoption is especially important",
        "sourceUrlsChecked": [
          "https://dnrec.alpha.delaware.gov/climate-coastal-energy/clean-transportation/ev-charging-equipment-rebates/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2847",
    "opportunityName": "City of Tallahassee Utilities - Solar Water Heating Rebate",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2847/city-of-tallahassee-utilities-solar-water-heating-rebate",
    "websiteUrl": "https://www.talgov.com/you/you-products-home-solar-water-rebates",
    "applicationUrl": null,
    "administrator": "City of Tallahassee Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar water heating"
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
        "counties": [
          "Leon"
        ],
        "cities": [
          "Tallahassee"
        ],
        "utilityTerritories": [
          "City of Tallahassee Utilities"
        ],
        "notes": "Applies to City of Tallahassee electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Applicant must be a City of Tallahassee electric customer.",
        "Eligible system must be for domestic solar water heating.",
        "A home energy audit is required as a first step for applicable solar rebate or loan processing.",
        "Rebate is issued as a utility bill credit.",
        "Applicant must submit the required solar water heater rebate form."
      ],
      "blockers": [
        "Pool heating is not eligible for the solar water heating rebate.",
        "Energy audit is a requirement or separate service, not the incentivized retrofit category for this opportunity.",
        "Solar photovoltaic systems are separate from this solar water heating rebate.",
        "Non-City electric customers are not eligible."
      ],
      "programType": "Rebate",
      "administrator": "City of Tallahassee Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.talgov.com/you/you-products-home-solar-water-rebates",
      "sourceUrlsChecked": [
        "http://www.talgov.com/you/you-products-home-solar-water-rebates.aspx",
        "https://www.talgov.com/you/you-products-home-solar-water-rebates",
        "https://www.talgov.com/you/you-products-home-loans",
        "https://www.talgov.com/you/you-products-home-energy-audit",
        "https://www.talgov.com/Uploads/Public/Documents/you/brochure-solar-water-heating.pdf"
      ],
      "evidenceText": "Tallahassee lists a solar water heater rebate for City electric customers and states pool heating is excluded.",
      "reasoningNotes": "Solar water heating is supported. Energy audit should be modeled as a requirement or separate service, not an eligible retrofit category for this rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7310911a63935ef8_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 45000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$450 per solar domestic water heating system",
        "evidenceText": "Tallahassee solar water heater page lists \"Rebate Amount: $450 rebate.\"",
        "sourceUrlsChecked": [
          "http://www.talgov.com/you/you-products-home-solar-water-rebates.aspx"
        ],
        "reasoningNotes": "Matched solar water heating. Rebate is issued as a utility bill credit; pool heating is excluded.",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5817",
    "opportunityName": "Florida Public Utilities (Gas) - Commercial Energy Efficiency Rebates",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5817/florida-public-utilities-gas-commercial-energy-efficiency-rebates",
    "websiteUrl": "https://fpuc.com/commercial/commercial-rebates/",
    "applicationUrl": "https://rebate.fpuc.com/",
    "administrator": "Florida Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
          "FL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Florida Public Utilities natural gas service territory"
        ],
        "notes": "Limited to qualifying Florida Public Utilities commercial natural gas customers and approved FPU Energy Partner rebate submissions."
      },
      "eligibleApplicantTypes": [
        "commercial_natural_gas_customer",
        "business_customer",
        "fpu_energy_partner"
      ],
      "eligibleSectors": [
        "commercial",
        "commercial_food_service",
        "hospitality_lodging",
        "cleaning_laundromat",
        "large_commercial_non_food"
      ],
      "eligibleRetrofitCategories": [
        "commercial_natural_gas_fryer",
        "commercial_natural_gas_range",
        "commercial_natural_gas_tank_water_heater",
        "commercial_natural_gas_tankless_water_heater",
        "commercial_natural_gas_dryer",
        "natural_gas_space_conditioning_system",
        "gas_fired_heat_pump",
        "natural_gas_desiccant_dehumidifier"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Florida Public Utilities commercial natural gas customer or approved FPU Energy Partner.",
        "Equipment must be qualifying commercial-grade natural gas equipment in the listed business categories.",
        "Rebate submissions must be filed within the required period after installation or inspection.",
        "Leased and used appliances are not eligible.",
        "Account-level caps and one-rebate-per-appliance rules apply where stated."
      ],
      "blockers": [
        "Do not match electric HVAC, generic high-efficiency HVAC, or residential HVAC to this commercial gas program.",
        "Do not match non-gas foodservice equipment.",
        "Fryer rebates are product-specific and should not be generalized to all commercial kitchen equipment.",
        "Non-FPU natural gas customers are not eligible.",
        "Leased or used appliances should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Florida Public Utilities",
      "applicationUrl": "https://rebate.fpuc.com/",
      "websiteUrl": "https://fpuc.com/commercial/commercial-rebates/",
      "sourceUrlsChecked": [
        "https://fpuc.com/commercial/commercial-rebates/",
        "https://rebate.fpuc.com/"
      ],
      "evidenceText": "FPU]( commercial gas rebates list qualifying natural gas foodservice, water heating, laundry, gas-fired heat pump, space conditioning, and desiccant dehumidifier equipment with customer and appliance restrictions.",
      "reasoningNotes": "The fryer match is supported. The HVAC match was narrowed to natural-gas commercial space-conditioning, gas-fired heat pump, and desiccant dehumidifier equipment only."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9d28e18b4d2b52c6_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$50 per eligible unit",
        "evidenceText": "Replacing an old natural gas appliance with a new natural gas appliance Close HVAC Rebates Also, earn rebates up to $50 per ton when you install eligible natural gas space conditioning units",
        "sourceUrlsChecked": [
          "https://fpuc.com/commercial/commercial-rebates/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22752",
    "opportunityName": "Kissimmee Utility Authority - Residential Electric Vehicle Charger Rebate",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22752/kissimmee-utility-authority-residential-electric-vehicle-charger-rebate",
    "websiteUrl": "https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/",
    "applicationUrl": "https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/",
    "administrator": "Kissimmee Utility Authority",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "Kissimmee"
        ],
        "utilityTerritories": [
          "Kissimmee Utility Authority"
        ],
        "notes": "Limited to KUA residential customers installing qualifying home Level 2 EV chargers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "utility_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Customer must purchase and install a Level 2 home EV charger.",
        "Customer must submit proof of purchase.",
        "Customer must submit a picture of the installed home charger.",
        "KUA may require onsite post-verification.",
        "Rebate amount and availability are subject to current KUA program terms."
      ],
      "blockers": [
        "Do not match commercial EV charging.",
        "Do not match Level 1 chargers or portable charging accessories.",
        "Do not add KUA heat pump, insulation, lighting, or other rebate-page categories to this EV charger opportunity.",
        "Do not match EV vehicle purchase."
      ],
      "programType": "Rebate",
      "administrator": "Kissimmee Utility Authority",
      "applicationUrl": "https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/",
      "websiteUrl": "https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/",
      "sourceUrlsChecked": [
        "https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/",
        "https://kua.com/energy-conservation/rebates/"
      ],
      "evidenceText": "KUA states that customers must purchase and install a Level 2 home EV charger and submit proof of purchase and an installed-charger photo.",
      "reasoningNotes": "Only Level 2 home EV charger installation belongs to this opportunity; other KUA rebate categories are separate opportunities."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8b43b8d2c2297786_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$100 per Level 2 home EV charger",
        "evidenceText": "KUA rebate page lists Level 2 Home EV Charger rebate at $100.",
        "sourceUrlsChecked": [
          "https://kua.com/energy-conservation/rebates/",
          "https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Use one unit as one eligible home charger.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4290",
    "opportunityName": "Ocala Utility Services - Solar Hot Water Heating Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4290/ocala-utility-services-solar-hot-water-heating-rebate-program",
    "websiteUrl": "https://www.ocalafl.gov/government/electric-utility/rebates",
    "applicationUrl": "https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000",
    "administrator": "Ocala Electric Utility",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar hot water",
          "solar thermal"
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
          "Ocala"
        ],
        "utilityTerritories": [
          "Ocala Electric Utility residential electric service territory"
        ],
        "notes": "Rebates are applied to the municipal utility account for eligible residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Applicant must receive residential electric service from Ocala Electric Utility",
        "Solar water heater must meet the qualifying energy-efficiency requirements on the application",
        "Rebate application and required receipt or model documentation must be submitted within the specified deadline",
        "Equipment must be new and installed at the permanent residence"
      ],
      "blockers": [
        "high_efficiency_hvac_replacement is a false positive for this solar hot water opportunity",
        "Air conditioner and heat pump rebates are separate Ocala appliance rebate lines",
        "Non-Ocala Electric Utility customers are not eligible",
        "Used equipment and incomplete documentation are not eligible"
      ],
      "programType": "Rebate",
      "administrator": "Ocala Electric Utility",
      "applicationUrl": "https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000",
      "websiteUrl": "https://www.ocalafl.gov/government/electric-utility/rebates",
      "sourceUrlsChecked": [
        "https://www.ocalafl.gov/government/electric-utility/rebates",
        "https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000"
      ],
      "evidenceText": "Ocala’s residential rebate application includes a distinct solar water heater rebate for OEU residential electric customers, while air conditioner and heat pump incentives are separate rebate lines.",
      "reasoningNotes": "Keep solar water heating only for this DSIRE opportunity and block HVAC matching caused by the shared rebate page."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8b6e688b3d861c21_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 45000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$450 per eligible solar hot water heating system",
        "evidenceText": "Ocala rebate source lists rebate amounts up to $450; DSIRE identifies solar hot water at $450 per system.",
        "sourceUrlsChecked": [
          "https://www.ocalafl.gov/government/electric-utility/rebates",
          "https://programs.dsireusa.org/system/program/detail/4290"
        ],
        "reasoningNotes": "Matched solar hot water term. Confidence is medium because current official page gives the range but not the full measure table in text.",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22810",
    "opportunityName": "Carroll EMC - Home Charger Rebate",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22810/carroll-emc-home-charger-rebate",
    "websiteUrl": "https://carrollemc.com/ev/",
    "applicationUrl": "https://carrollemc.com/home-charger-rebate-application/",
    "administrator": "Carroll EMC",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "charging station"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Carroll EMC"
        ],
        "notes": "Applies to Carroll EMC members installing eligible equipment at a residence in the cooperative service territory."
      },
      "eligibleApplicantTypes": [
        "residential_members"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Carroll EMC member.",
        "Eligible charger must be installed at a residence.",
        "Charger must be a new Level 2 NRTL or UL approved EV charging station.",
        "Application must be completed within 45 days of purchase.",
        "Installation inspection by a Carroll EMC representative is required."
      ],
      "blockers": [
        "Portable EV chargers are not eligible.",
        "Level 1 equipment is not eligible.",
        "Nonmembers and locations outside Carroll EMC service territory are not eligible.",
        "General electrical upgrades unrelated to the eligible charging station should not be matched."
      ],
      "programType": "Rebate",
      "administrator": "Carroll EMC",
      "applicationUrl": "https://carrollemc.com/home-charger-rebate-application/",
      "websiteUrl": "https://carrollemc.com/ev/",
      "sourceUrlsChecked": [
        "https://carrollemc.com/ev/",
        "https://carrollemc.com/home-charger-rebate-application/"
      ],
      "evidenceText": "Carroll EMC offers a one-time home charger rebate for members installing a new Level 2 NRTL or UL approved charging station at a residence.",
      "reasoningNotes": "The EV charger match is correct, narrowed to nonportable Level 2 residential charging equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_175575265cc58b3a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 25000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$250 per eligible unit",
        "evidenceText": "Home Charger Rebate Carroll EMC Members who install a new, Level 2 NRTL/UL approved electric vehicle charging station at their place of residence could qualify for a one-time rebate of $250",
        "sourceUrlsChecked": [
          "https://carrollemc.com/ev/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  }
]
