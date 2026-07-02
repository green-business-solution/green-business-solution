You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 16
Targets in this prompt: 301-320 of 984
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
  "batchNumber": 16,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22273"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22622",
    "opportunityName": "Cleco Power - Commercial EV Rebate",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22622/cleco-power-commercial-ev-rebate",
    "websiteUrl": "https://www.cleco.com/electrification/commercial-evs",
    "applicationUrl": "https://sightlinedsm.my.site.com/cleco/s/commercial",
    "administrator": "Cleco Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dcfc"
        ]
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
          "LA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cleco Power electric service territory"
        ],
        "notes": "EVSE installation site must be in Cleco service territory and tied to a commercial Cleco account in good standing."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "multifamily_customer",
        "workplace_customer",
        "fleet_customer",
        "public_charging_site_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "workplace",
        "fleet",
        "public_charging",
        "material_handling"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "electric_forklift_material_handling",
        "fleet_electrification_assessment"
      ],
      "hardRequirements": [
        "Applicant must be a Cleco commercial customer or account in good standing.",
        "EVSE installation property must be in Cleco service territory.",
        "Application must be submitted no later than 180 days after equipment purchase or installation.",
        "Only new EVSE equipment is eligible.",
        "Applicant must provide required invoices, sales receipt, model and serial information, and installation photographs.",
        "Fleet assessments are for qualifying non-residential customers with ten or more vehicles."
      ],
      "blockers": [
        "Do not match residential EV charger rebates to this commercial EV rebate.",
        "Do not match Level 1 chargers or used charging equipment.",
        "Do not match general vehicle purchases; only EV chargers and eligible electric forklift equipment are supported."
      ],
      "programType": "Rebate",
      "administrator": "Cleco Power",
      "applicationUrl": "https://sightlinedsm.my.site.com/cleco/s/commercial",
      "websiteUrl": "https://www.cleco.com/electrification/commercial-evs",
      "sourceUrlsChecked": [
        "https://www.cleco.com/electrification/commercial-evs",
        "https://sightlinedsm.my.site.com/cleco/s/commercial"
      ],
      "evidenceText": "Cleco's commercial EV page offers incentives for multifamily, workplace, fleet, and publicly accessible Level 2 chargers, DC fast chargers, and electric forklift equipment, plus free fleet assessments for qualifying non-residential fleets.",
      "reasoningNotes": "All original EV charging and electric forklift matches are supported, with strict commercial Cleco customer, new-equipment, and territory requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_bff6178d63dcf9ec_v1",
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
        "formula": "$500 per eligible electric forklift",
        "evidenceText": "Cleco commercial EV incentives list electric forklifts at $500.",
        "sourceUrlsChecked": [
          "https://www.cleco.com/electrification/commercial-evs"
        ],
        "reasoningNotes": "Matched electric forklift term. Distinct equipment amount.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c69ecb1bf514557f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 100000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,000 per eligible commercial Level 2 EV charger",
        "evidenceText": "Cleco lists Level 2 charger incentives of $1,000 for multifamily, workplace, fleet, and public uses.",
        "sourceUrlsChecked": [
          "https://www.cleco.com/electrification/commercial-evs"
        ],
        "reasoningNotes": "Matched Level 2 terms. The same amount applies across listed commercial Level 2 use cases.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_fef4cb2d0203fad2_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 350000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$3,500 per eligible DC fast charger",
        "evidenceText": "Cleco commercial EV incentives list DC fast chargers at $3,500.",
        "sourceUrlsChecked": [
          "https://www.cleco.com/electrification/commercial-evs"
        ],
        "reasoningNotes": "Matched DCFC term. Use one unit as one eligible DC fast charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22809",
    "opportunityName": "Shrewsbury Electric - Commercial Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22809/shrewsbury-electric-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://selco.shrewsburyma.gov/commercial-rebates-incentives/",
    "applicationUrl": null,
    "administrator": "Shrewsbury Electric and Cable Operations",
    "programType": "Commercial Rebate And Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dcfc"
        ]
      },
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
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
          "MA"
        ],
        "counties": [],
        "cities": [
          "Shrewsbury"
        ],
        "utilityTerritories": [
          "Shrewsbury Electric and Cable Operations"
        ],
        "notes": "Limited to eligible SELCO commercial, municipal, and industrial general service customers in Shrewsbury, Massachusetts."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "municipal_customer",
        "industrial_customer",
        "developer",
        "selco_general_service_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "commercial_heat_pump_hvac"
      ],
      "hardRequirements": [
        "Applicant must be a SELCO commercial, municipal, or industrial general service customer, or an eligible developer.",
        "Customer account must be active and in good standing with no late payments within the relevant eligibility period.",
        "Level 2 and DC fast chargers must meet demand response, networking, connector, and public listing requirements where applicable.",
        "Commercial heat pump projects require preapproval, qualifying equipment, and documentation such as AHRI records."
      ],
      "blockers": [
        "Do not match residential EV charger or residential heat pump incentives to this commercial program.",
        "Do not match broad high-efficiency HVAC except for SELCO’s qualifying commercial heat pump incentive.",
        "Mass Save gas-customer restrictions may block certain heat pump claims where Eversource gas service applies."
      ],
      "programType": "Commercial Rebate And Incentive Program",
      "administrator": "Shrewsbury Electric and Cable Operations",
      "applicationUrl": null,
      "websiteUrl": "https://selco.shrewsburyma.gov/commercial-rebates-incentives/",
      "sourceUrlsChecked": [
        "https://selco.shrewsburyma.gov/commercial-rebates-incentives/",
        "https://selco.shrewsburyma.gov/commercial-ev-charger-rebates/",
        "https://selco.shrewsburyma.gov/commercial-heat-pump-rebates/"
      ],
      "evidenceText": "SELCO commercial pages list Level 1, Level 2, and DC fast charger rebates, plus commercial heat pump rebates for eligible commercial, municipal, industrial, and developer applicants.",
      "reasoningNotes": "The EV charger matches are supported. High-efficiency HVAC should be narrowed to commercial heat pump installations that satisfy SELCO heat pump requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_be3e2b85e8f3bfdc_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 500000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $5,000 per property for commercial EV charger installation",
        "evidenceText": "SELCO commercial EV charger announcement states rebates up to $5,000 per location/property.",
        "sourceUrlsChecked": [
          "https://shrewsburyma.gov/CivicAlerts.aspx?AID=721"
        ],
        "reasoningNotes": "Matched commercial EV charger terms. Medium because source says up to and is an older official notice.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4266",
    "opportunityName": "SMECO - Non-Residential Energy Efficiency Rebate Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4266/smeco-non-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/",
    "applicationUrl": null,
    "administrator": "Southern Maryland Electric Cooperative",
    "programType": "Nonresidential Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "vending machine controls"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southern Maryland Electric Cooperative"
        ],
        "notes": "Limited to eligible SMECO nonresidential customers in Southern Maryland."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "small_business_customer",
        "institutional_customer",
        "nonresidential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "exterior_site_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "commercial_hvac_controls",
        "commercial_kitchen_foodservice_equipment",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible SMECO nonresidential customer.",
        "Project must follow the applicable SMECO Business Solutions or Small Business Solutions pathway.",
        "Prequalified contractors, preapproval, equipment eligibility, and customer rate or demand limits may apply depending on the pathway."
      ],
      "blockers": [
        "Do not match residential appliances or home weatherization.",
        "Vending machine controls should not be matched unless the current SMECO business manual or application specifically lists them.",
        "Official SMECO pages were partially inaccessible, so measure-level payment matching should verify the current application or program manual."
      ],
      "programType": "Nonresidential Energy Efficiency Rebate Program",
      "administrator": "Southern Maryland Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/",
      "sourceUrlsChecked": [
        "https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/",
        "https://www.smeco.coop/energy-efficiency/commercial-programs/small-business-solutions/",
        "https://www.smeco.coop/energy-efficiency/commercial-programs/"
      ],
      "evidenceText": "SMECO business program snippets identify incentives for lighting, HVAC, kitchen equipment, refrigeration, and refrigeration retrofits for eligible business customers.",
      "reasoningNotes": "Lighting, HVAC, refrigeration, and refrigeration controls are supported at a program level. Vending machine controls were not verified in current official materials and should be blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e627fd3dce2f066e_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.8
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to 80% of eligible small-business refrigeration retrofit costs",
        "evidenceText": "SMECO small business page says rebates cover up to 80% of refrigeration retrofit costs.",
        "sourceUrlsChecked": [
          "https://www.smeco.coop/energy-efficiency/commercial-programs/small-business/"
        ],
        "reasoningNotes": "Matched refrigeration and vending-control terms. Use only for qualifying small-business refrigeration retrofit measures.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4813",
    "opportunityName": "Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4813/xcel-energy-electric-and-gas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://mn.my.xcelenergy.com/s/residential/home-rebates",
    "applicationUrl": null,
    "administrator": "Xcel Energy",
    "programType": "Residential Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy"
        ],
        "notes": "Available to eligible Xcel Energy Minnesota residential electric or natural gas customers, depending on measure."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Xcel Energy Minnesota residential customer for the relevant fuel and measure.",
        "Insulation and air sealing must meet program requirements and often require participating or registered contractors.",
        "Some insulation rebates require air sealing rather than insulation-only work.",
        "Heat pump HVAC and heat pump water heater rebates require qualifying equipment and contractor or application documentation.",
        "Installation date, invoice and submission deadline rules apply."
      ],
      "blockers": [
        "Do not match outside Xcel Energy's Minnesota service territory.",
        "Do not infer commercial, industrial, refrigeration, motors or foodservice measures from this residential program.",
        "Air sealing and insulation should be matched only where the specific envelope rebate requirements are met."
      ],
      "programType": "Residential Energy Efficiency Rebate",
      "administrator": "Xcel Energy",
      "applicationUrl": null,
      "websiteUrl": "https://mn.my.xcelenergy.com/s/residential/home-rebates",
      "sourceUrlsChecked": [
        "https://mn.my.xcelenergy.com/s/residential/home-rebates",
        "https://mn.my.xcelenergy.com/s/residential/heating-cooling/heating-equipment-rebates",
        "https://mn.my.xcelenergy.com/s/residential/home-rebates/insulation-air-sealing",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Working%20With%20Us/24-1-201%20MN%20Res%20Rebate%20Summary%20Information%20Sheet.pdf"
      ],
      "evidenceText": "Xcel Energy Minnesota residential rebate materials list insulation and air sealing, heating equipment rebates including heat pumps, and heat pump water heater rebates for qualifying residential customers.",
      "reasoningNotes": "The four supplied retrofit categories are current and properly residential. Matching should enforce Xcel Minnesota service territory and measure-specific contractor and documentation rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0fee7e90b326610e_v1",
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
        "confidence": "medium",
        "formula": "$500 per smart electric heat pump water heater",
        "evidenceText": "Xcel Minnesota heat pump water heater rebate materials list smart electric HPWH at $500 and standard electric HPWH at $400.",
        "sourceUrlsChecked": [
          "https://mn.my.xcelenergy.com/s/residential/home-rebates",
          "https://www.poweredbyefi.org/xcelenergymn/rebate-opportunities/water-heater-rebates-xmn.html"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned the higher smart-electric HPWH tier as a candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5862",
    "opportunityName": "Ameren Missouri (Electric) - Residential Heating and Cooling Energy Efficiency  Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5862/ameren-missouri-electric-residential-heating-and-cooling-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.amerenmissourisavings.com/",
    "applicationUrl": null,
    "administrator": "Ameren Missouri",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ground source heat pump",
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Ameren Missouri"
        ],
        "notes": "Applies to eligible Ameren Missouri residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_consent"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Customer must be an eligible Ameren Missouri residential electric customer.",
        "HVAC and weatherization rebates require participation in tier 4 of Pay As You Save where the program rules require it.",
        "Customer must have lived in the home for the required usage-analysis period for PAYS HVAC or weatherization rebates.",
        "Equipment must meet the specified SEER2, EER, ENERGY STAR, or approved-list requirements."
      ],
      "blockers": [
        "This target covers residential heating and cooling; do not infer commercial HVAC, water heating, or appliance rebates.",
        "Smart thermostat eligibility is limited to ENERGY STAR or approved-list thermostats under the program.",
        "Mobile homes, renters, and emergency replacements must meet PAYS and ownership-consent rules where applicable."
      ],
      "programType": "Rebate Program",
      "administrator": "Ameren Missouri",
      "applicationUrl": null,
      "websiteUrl": "https://www.amerenmissourisavings.com/",
      "sourceUrlsChecked": [
        "https://www.amerenmissourisavings.com/",
        "https://www.ameren.com/-/media/files/save-money-energy/energy-efficiency/hvac-pays-incentives.ashx",
        "https://www.amerenmissourisavings.com/PAYS"
      ],
      "evidenceText": "Ameren]( Missouri's 2026 PAYS HVAC incentives list mini-split AC or heat pumps, air-source heat pumps, central AC, ground-source heat pumps, and smart thermostats.",
      "reasoningNotes": "The supplied HVAC, geothermal, and smart thermostat categories are supported. Keep them limited to Ameren Missouri residential electric customers and PAYS/Fast Track requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_953ef81c03a3e571_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 200000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$2,000 per eligible dual-fuel air-source heat pump system",
        "evidenceText": "Ameren Missouri 2026 HVAC rebate sheet lists dual-fuel air-source heat pump at $2,000 per system.",
        "sourceUrlsChecked": [
          "https://www.amerenmissourisavings.com/hvac",
          "https://www.amerenmissourisavings.com/media/Default/Residential/PDFs/2026%20HVAC%20Rebate%20Sheet.pdf"
        ],
        "reasoningNotes": "Matched heat pump term. Confidence is medium because detailed value is in an application/PDF table.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2188",
    "opportunityName": "Co-Mo Electric Cooperative - Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2188/co-mo-electric-cooperative-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.co-mo.coop/rebates",
    "applicationUrl": "https://claims.incentit.com/Site/PageOpen?accountId=V010188&pageId=1806&siteIdentifier=339cfe55-d847-4f4f-b7e9-5108cdc043fe&uniqueIdentifier=AECI",
    "administrator": "Co-Mo Electric Cooperative",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "heat pump"
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Co-Mo Electric Cooperative service territory"
        ],
        "notes": "Program applies to eligible Co-Mo Electric Cooperative members."
      },
      "eligibleApplicantTypes": [
        "residential_electric_member",
        "non_residential_electric_member"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "non_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "dual_fuel_air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "indoor_ground_source_heat_pump_replacement",
        "heat_pump_hvac_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Co-Mo Electric Cooperative member.",
        "All appliances and systems must be pre-qualified before rebate approval.",
        "Applications must be submitted through the current Co-Mo rebate portal or process."
      ],
      "blockers": [
        "Do not match window_replacement; the current rebate portal categories do not list window replacement.",
        "Do not infer broad high_efficiency_hvac_replacement beyond eligible heat pump and geothermal categories.",
        "Do not infer lighting, refrigeration, or commercial kitchen measures from the current Co-Mo rebate list."
      ],
      "programType": "Rebate",
      "administrator": "Co-Mo Electric Cooperative",
      "applicationUrl": "https://claims.incentit.com/Site/PageOpen?accountId=V010188&pageId=1806&siteIdentifier=339cfe55-d847-4f4f-b7e9-5108cdc043fe&uniqueIdentifier=AECI",
      "websiteUrl": "https://www.co-mo.coop/rebates",
      "sourceUrlsChecked": [
        "https://www.co-mo.coop/rebates/",
        "https://www.co-mo.coop/rebates",
        "https://claims.incentit.com/Site/PageOpen?accountId=V010188&pageId=1806&siteIdentifier=339cfe55-d847-4f4f-b7e9-5108cdc043fe&uniqueIdentifier=AECI"
      ],
      "evidenceText": "Co-Mo's rebate page links to a current portal listing residential and non-residential rebates for heat pump water heaters, smart thermostats, dual-fuel air source heat pumps, ductless mini-splits, ground source heat pumps, and indoor ground source replacements.",
      "reasoningNotes": "The heat pump and geothermal matches are supported. The window replacement match is a false positive and should be removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d6951bb53b3fd1a5_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 75000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$750 per ton for new ground-source heat pump installation",
        "evidenceText": "Co-Mo/associated cooperative rebate materials list ground-source heat pump incentives at $750 per ton for new installations.",
        "sourceUrlsChecked": [
          "https://www.co-mo.coop/rebates",
          "https://www.co-mo.coop/energy-efficiency"
        ],
        "reasoningNotes": "Matched geothermal/heat pump term. Confidence is medium because detailed current measure form should be verified; use unit_count as tons.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2181",
    "opportunityName": "Ozark Border Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2181/ozark-border-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ozarkborder.org/rebate-info.php",
    "applicationUrl": "https://www.ozarkborder.org/rebate-info.php",
    "administrator": "Ozark Border Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ground source heat pump",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Ozark Border Electric Cooperative service territory"
        ],
        "notes": "Program is limited to cooperative members in good standing at qualifying metered services."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_member",
        "member_in_good_standing"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "ground_source_geothermal_heat_pump"
      ],
      "hardRequirements": [
        "Member must be in good standing of the cooperative.",
        "Rebates are limited to cooperative services purchasing at least 6,000 kWh annually.",
        "Structure must be permanent, on a permanent foundation, and on land owned by the member.",
        "Signed application and original dated sales receipt must be submitted within 90 days of purchase.",
        "Used equipment and dealer or distributor applicants do not qualify."
      ],
      "blockers": [
        "Do not match general HVAC replacement unless it is one of the supported heat pump categories.",
        "Do not match tankless water heaters; heat-pump water heater rules explicitly exclude tankless water heaters.",
        "Do not match commercial C&I retrofits broadly; commercial tonnage references in heat-pump rules do not create a general C&I program.",
        "DX ground-source heat pump installations are not eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Ozark Border Electric Cooperative",
      "applicationUrl": "https://www.ozarkborder.org/rebate-info.php",
      "websiteUrl": "https://www.ozarkborder.org/rebate-info.php",
      "sourceUrlsChecked": [
        "https://www.ozarkborder.org/rebate-info.php"
      ],
      "evidenceText": "The current cooperative rebate page lists ductless mini-splits, heat-pump water heaters, smart thermostats, air-source and dual-fuel heat pumps, and ground-source heat pumps, with member, kWh, receipt, and equipment limits.",
      "reasoningNotes": "Current categories support heat pumps, HPWH, and smart thermostats. Keep thermostat but block broad HVAC and unsupported commercial matching."
    },
    "existingSimpleRules": [
      {
        "id": "oir_93bfe0792e5245a7_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 75000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$750 per eligible unit",
        "evidenceText": "Air Source Heat Pump and Mini-Split (Ducted Systems) Rebate Application Ground Source Heat Pump - $750 per ton for a new installation (including loop) / $300 per ton for replacements of heat pump only Limited to 10 tons residential and 50 tons commercial Available for new construction or replacement of an existing unit Equipment must be installed by a certified dealer and meet Energy Star +2 SEER rating DX (direct expansi",
        "sourceUrlsChecked": [
          "https://www.ozarkborder.org/rebate-info.php"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3909",
    "opportunityName": "Montana-Dakota Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3909/montana-dakota-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/",
    "applicationUrl": null,
    "administrator": "Montana-Dakota Utilities Co.",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
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
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "programmable thermostat",
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
          "MT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Montana-Dakota Utilities electric and natural gas service territory in Montana"
        ],
        "notes": "The current page also discusses South Dakota, but this DSIRE target is Montana; North Dakota and Wyoming residential incentives are not offered on the current page."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "programmable_or_wifi_thermostat",
        "residential_led_bulbs"
      ],
      "hardRequirements": [
        "Montana natural gas furnace rebate is for existing-home furnace replacement at 95 percent AFUE or greater.",
        "Fuel conversion and new construction do not qualify for the Montana furnace rebate.",
        "Tier 1 thermostat must be contractor-installed with a qualifying new high-efficiency furnace; Tier 2 Wi-Fi thermostat can qualify separately.",
        "LED bulb rebates are for Montana residential electric customers and are capped by bulb type and account limits."
      ],
      "blockers": [
        "Do not match heat pumps, boilers, central air conditioning, or broad HVAC replacement.",
        "Do not match whole-building lighting retrofits; the current electric measure is residential LED bulbs.",
        "North Dakota and Wyoming residential incentive matches are blocked by the official page."
      ],
      "programType": "Rebate Program",
      "administrator": "Montana-Dakota Utilities Co.",
      "applicationUrl": null,
      "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/",
      "sourceUrlsChecked": [
        "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/"
      ],
      "evidenceText": "The current MDU home page lists Montana residential natural-gas furnace replacement, programmable/Wi-Fi thermostat incentives, and residential electric LED bulb rebates, while stating no residential incentives are available in North Dakota or Wyoming.",
      "reasoningNotes": "Narrow the HVAC match to natural gas furnace replacement and qualifying thermostats. LED should be treated as bulbs, not a commercial lighting retrofit."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c519b1d993627897_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 6000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$60 per Tier 2 Wi-Fi connected thermostat",
        "evidenceText": "Montana-Dakota residential rebate table lists Tier 2 Wi-Fi connected thermostats at $60.",
        "sourceUrlsChecked": [
          "https://www.montana-dakota.com/conservation/residential-rebates/"
        ],
        "reasoningNotes": "Matched thermostat term. Tier 2 Wi-Fi thermostat is the more relevant connected control measure.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2121",
    "opportunityName": "Piedmont EMC - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2121/piedmont-emc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://pemc.coop/smart_energy/rebate-to-help-you-save/",
    "applicationUrl": "https://pemc.coop/smart_energy/rebate-to-help-you-save/",
    "administrator": "Piedmont Electric Membership Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Piedmont Electric Cooperative service territory"
        ],
        "notes": "Rebates are for eligible Piedmont Electric Cooperative members and existing primary residences in the cooperative service territory."
      },
      "eligibleApplicantTypes": [
        "residential_electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "attic_insulation",
        "duct_sealing",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_air_conditioner_replacement",
        "variable_speed_pool_pump",
        "ev_rebate_or_time_of_day_enrollment",
        "load_management"
      ],
      "hardRequirements": [
        "Rebate receipts must be dated within one calendar year of the rebate application date.",
        "Heat pump rebate is for replacement electric heat pump systems only; no new home builds qualify.",
        "Heat pump system must be installed on a primary residence with at least 800 kWh average monthly usage and condition at least 1,000 square feet.",
        "HVAC and insulation or duct sealing work requires licensed and insured contractors with proof of purchase.",
        "Pool pump rebate requires participation in the time-of-day rate."
      ],
      "blockers": [
        "Do not match standalone EV charger installation to the rebate page; the current rebate is a bill credit for notifying the co-op about an EV or enrolling in the EV time-of-day rate.",
        "Do not match new construction heat pumps.",
        "Low-interest home upgrade loans are a separate financing program and should not be conflated with these rebates.",
        "Federal tax credits listed on the page are informational and separate from Piedmont Electric rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "Piedmont Electric Membership Corporation",
      "applicationUrl": "https://pemc.coop/smart_energy/rebate-to-help-you-save/",
      "websiteUrl": "https://pemc.coop/smart_energy/rebate-to-help-you-save/",
      "sourceUrlsChecked": [
        "https://pemc.coop/smart_energy/rebate-to-help-you-save/",
        "https://pemc.coop/smart_energy/loan-program/"
      ],
      "evidenceText": "The current Piedmont rebate page lists smart thermostat, attic insulation and duct sealing, replacement electric heat pumps including mini-splits, heat-pump water heaters, A/C systems, pool pumps, EV bill credits, and load management.",
      "reasoningNotes": "The prior EV charger match should be narrowed: rebates support EV notification or EV time-of-day enrollment, while Level 2 charger financing appears in the separate loan program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_12dd57adbc096d0b_v1",
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
        "formula": "$100 per eligible smart thermostat",
        "evidenceText": "Piedmont EMC smart thermostat page lists a $100 credit for qualifying thermostats.",
        "sourceUrlsChecked": [
          "https://pemc.coop/energy-efficiency/rebate-programs/smart-thermostat-program/",
          "https://pemc.coop/energy-efficiency/rebate-programs/"
        ],
        "reasoningNotes": "Matched thermostat term. Returned separately from heat pump.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_255b04b594d52384_v1",
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
        "formula": "Up to $600 per high-efficiency residential heat pump",
        "evidenceText": "Piedmont EMC heat pump rebate page lists a maximum $600 rebate per system.",
        "sourceUrlsChecked": [
          "https://pemc.coop/energy-efficiency/rebate-programs/heat-pump-rebate/",
          "https://pemc.coop/energy-efficiency/rebate-programs/"
        ],
        "reasoningNotes": "Matched heat pump term. Confidence is medium because amount depends on equipment tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22523",
    "opportunityName": "PSE&G Electric Vehicle Charging Program",
    "state": "NJ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22523/pse-and-g-electric-vehicle-charging-program",
    "websiteUrl": "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles",
    "applicationUrl": "https://evportal.pseg.com/",
    "administrator": "PSE&G",
    "programType": "Rebate Make Ready Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dc fast",
          "dcfc"
        ]
      },
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger",
          "electric vehicle charging",
          "evse"
        ]
      },
      {
        "retrofitTypeId": "ev_make_ready_electrical_upgrade",
        "displayName": "EV make-ready electrical upgrade",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "make ready",
          "make-ready"
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
          "NJ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "PSE&G New Jersey electric service territory"
        ],
        "notes": "Applies to PSE&G New Jersey electric customers under residential, commercial Level 2, and public DCFC subprograms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "commercial_electric_customer",
        "multifamily_property_owner",
        "government_entity",
        "public_charging_site_host",
        "fleet_or_workplace_site_host"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "government",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "ev_make_ready_electrical_upgrade",
        "residential_level_2_ev_charger_make_ready",
        "commercial_level_2_ev_charger_make_ready",
        "dc_fast_charger_make_ready",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a PSE&G New Jersey electric customer in good standing and meet the applicable subprogram requirements.",
        "Residential projects require an eligible ENERGY STAR Level 2 smart charger, communications capability, documentation, and installation by a New Jersey licensed electrician.",
        "Commercial Level 2 and public DCFC projects must meet rate, accessibility, networking, data-sharing, and make-ready requirements.",
        "Incentives are primarily customer-side and utility-side make-ready credits; combined funding limits apply."
      ],
      "blockers": [
        "Do not describe this as a charger purchase rebate; PSE&G generally supports make-ready costs while the customer pays for the charger hardware.",
        "Off-peak charging credit is discontinued to new enrollments as of January 13, 2026 and should not drive new matches.",
        "Public DCFC must be publicly accessible and meet program connector, network, and siting rules.",
        "Do not match customers outside PSE&G New Jersey electric territory."
      ],
      "programType": "Rebate Make Ready Incentive",
      "administrator": "PSE&G",
      "applicationUrl": "https://evportal.pseg.com/",
      "websiteUrl": "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles",
      "sourceUrlsChecked": [
        "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles",
        "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles-residential-program",
        "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles-commercial-program",
        "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles-public-dcfc-program",
        "https://evportal.pseg.com/",
        "https://nj.myaccount.pseg.com/-/media/pseg/njmyaccount/electricvehicles/EVprogram-semi-annual-report.ashx"
      ],
      "evidenceText": "PSE&G]( lists residential Level 2, commercial Level 2, and public DCFC EV programs focused on customer-side and utility-side make-ready incentives.",
      "reasoningNotes": "EV make-ready categories are correct. Matching should distinguish make-ready support from charger purchase rebates and block the discontinued off-peak credit for new participants."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9c913b24785cb8a3_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 150000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "Up to $1,500 per residential smart Level 2 charger for customer-side make-ready cost",
        "evidenceText": "PSE&G residential program lists an on-bill credit up to $1,500 per charger toward Customer-Side Make-Ready costs.",
        "sourceUrlsChecked": [
          "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles-residential-program",
          "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles"
        ],
        "reasoningNotes": "Matched residential Level 2 make-ready terms. Program does not include a charger purchase rebate.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d9e01e2b8330a9e4_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 750000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 3000000,
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "Up to $7,500 per commercial Level 2 charger installation for customer-side make-ready, capped at four chargers per site",
        "evidenceText": "PSE&G commercial program offers up to $7,500 per charger installation, up to four chargers per site.",
        "sourceUrlsChecked": [
          "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles-commercial-program",
          "https://nj.myaccount.pseg.com/myservicepublic/electricvehicles"
        ],
        "reasoningNotes": "Matched commercial Level 2 make-ready terms. Charger unit cost itself is excluded.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5424",
    "opportunityName": "ConEd (Gas and Electric) - Small Business Direct Install Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5424/coned-gas-and-electric-small-business-direct-install-program",
    "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/small-business/savings-for-your-small-medium-business",
    "applicationUrl": null,
    "administrator": "Consolidated Edison Company of New York",
    "programType": "Rebate And Direct Install",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "NY"
        ],
        "counties": [
          "Bronx County",
          "Kings County",
          "New York County",
          "Queens County",
          "Richmond County",
          "Westchester County"
        ],
        "cities": [
          "New York",
          "Yonkers",
          "Mount Vernon",
          "New Rochelle",
          "White Plains"
        ],
        "utilityTerritories": [
          "Con Edison electric service territory",
          "Con Edison gas service territory"
        ],
        "notes": "Small business and nonprofit incentives apply to eligible Con Edison nonresidential accounts; some bonus incentives are limited to specified Queens neighborhoods."
      },
      "eligibleApplicantTypes": [
        "small_business_customer",
        "medium_business_customer",
        "nonprofit_customer",
        "commercial_customer",
        "trade_ally_or_contractor_as_applicant_designee"
      ],
      "eligibleSectors": [
        "commercial",
        "nonprofit",
        "institutional",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "building_envelope_improvement",
        "domestic_hot_water_efficiency"
      ],
      "hardRequirements": [
        "Applicant must have an eligible Con Edison nonresidential electric or gas account.",
        "Small and medium business and nonprofit participation is generally limited to customers below or around the Small Biz demand threshold; 100-300 kW customers may choose between Small Biz and C&I pathways.",
        "Projects must use approved program processes, qualified contractors, preapproval or offer documents where required, and post-installation verification.",
        "Existing-facility retrofit rules apply; new construction is handled outside the C&I retrofit pathway."
      ],
      "blockers": [
        "Do not match residential dwelling rebates or multifamily tenant-unit measures to this small business program.",
        "Lighting after the 2025 Small Biz deadline should be treated as Neighborhood Program or current lighting-offer specific, not automatically available to all small business accounts.",
        "Rinse sprayers or domestic hot water measures are product-specific and must not be generalized into broad plumbing or water-conservation retrofits.",
        "Demand response, solar, and EV charging are separate Con Edison offerings."
      ],
      "programType": "Rebate And Direct Install",
      "administrator": "Consolidated Edison Company of New York",
      "applicationUrl": null,
      "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/small-business/savings-for-your-small-medium-business",
      "sourceUrlsChecked": [
        "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/small-business/savings-for-your-small-medium-business",
        "https://www.coned.com/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/small-business/neighborhood-program/smb-neighborhood-program-factsheet.pdf",
        "https://www.coned.com/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/commercial-and-industrial-program/program-manual.pdf",
        "https://nyc-business.nyc.gov/nycbusiness/description/small-business-energy-efficiency-program"
      ],
      "evidenceText": "Con]( Edison’s current business pages and manuals support Small Biz incentives for heat pumps, HVAC, refrigeration, lighting, envelope and water-heating measures, with invoice discounts and verification requirements.",
      "reasoningNotes": "The target’s refrigeration, HVAC and lighting categories are supported, but lighting availability must be checked against the current Small Biz or Neighborhood Program deadlines and geography."
    },
    "existingSimpleRules": [
      {
        "id": "oir_27c0d72be7de18a4_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.7
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "Up to 70% of eligible small-business energy-saving upgrade costs",
        "evidenceText": "Con Edison small business page says it will cover up to 70% of costs for energy-saving upgrades.",
        "sourceUrlsChecked": [
          "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/small-business"
        ],
        "reasoningNotes": "Matched small business controls/refrigeration efficiency target. Use only for qualifying small-business direct-install upgrades.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5015",
    "opportunityName": "Oklahoma Natural Gas - Residential Efficiency Rebates",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5015/oklahoma-natural-gas-residential-efficiency-rebates",
    "websiteUrl": "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates",
    "applicationUrl": "https://www.oklahomanaturalgas.com/rebate-application",
    "administrator": "Oklahoma Natural Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler"
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Oklahoma Natural Gas service territory"
        ],
        "notes": "Residential rebates require an active Oklahoma Natural Gas account for the qualifying address."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "prospective_residential_natural_gas_customer",
        "builder"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "natural_gas_water_heater",
        "natural_gas_clothes_dryer",
        "natural_gas_range_or_oven"
      ],
      "hardRequirements": [
        "Heating rebate is for a new natural gas furnace or boiler, or conversion from electric resistance or electric heat pump to natural gas furnace and air conditioner.",
        "Heating-system application requires an Oklahoma-licensed contractor, AHRI certificate, receipt, and contractor invoice within 180 days after installation.",
        "Applicant must have an active Oklahoma Natural Gas account for rebate eligibility.",
        "Rebates are first-come, first-served until funds are depleted."
      ],
      "blockers": [
        "Do not match heat pump installation; the heat-pump references are for replacement of an electric heat pump with a natural gas furnace and A/C.",
        "Only qualified natural gas equipment is supported.",
        "Do not match commercial or industrial equipment to this residential rebate program."
      ],
      "programType": "Rebate Program",
      "administrator": "Oklahoma Natural Gas",
      "applicationUrl": "https://www.oklahomanaturalgas.com/rebate-application",
      "websiteUrl": "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates",
        "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates/residential-rebates-heating-system",
        "https://www.oklahomanaturalgas.com/rebate-application"
      ],
      "evidenceText": "The current ONG residential page lists natural gas appliance rebates. The heating page offers rebates for new efficient natural gas furnaces or boilers and for replacing electric heating or heat pumps with natural gas systems.",
      "reasoningNotes": "Repair the administrator to Oklahoma Natural Gas and block heat pump retrofit matching; heat-pump language describes a conversion away from electric heat pumps."
    },
    "existingSimpleRules": [
      {
        "id": "oir_faaa29f7c8bf6e35_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 55000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$550 per 95%+ efficient natural gas furnace or boiler",
        "evidenceText": "ONG heating rebate page lists $550 for a new 95%+ efficient natural gas furnace or boiler.",
        "sourceUrlsChecked": [
          "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates/residential-rebates-heating-system"
        ],
        "reasoningNotes": "Matched furnace and boiler terms. Selected the standard 95%+ gas equipment rebate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
    "opportunityName": "PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3853/ppl-electric-utilities-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/",
    "applicationUrl": "https://cr101.my.salesforce-sites.com/",
    "administrator": "PPL Electric Utilities",
    "programType": "Business Energy Efficiency Rebate And Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "chp"
        ]
      },
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "PPL Electric Utilities"
        ],
        "notes": "Limited to eligible PPL Electric Utilities business customer facilities in Pennsylvania."
      },
      "eligibleApplicantTypes": [
        "small_business_customer",
        "large_business_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "combined_heat_and_power_system",
        "solar_pv_system",
        "battery_storage_system",
        "fuel_cell_system",
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls",
        "high_efficiency_hvac_replacement",
        "hvac_tune_up",
        "smart_thermostat_zoning_retrofit",
        "commercial_kitchen_foodservice_equipment",
        "high_efficiency_refrigeration_equipment",
        "motor_pump_vfd_retrofit",
        "compressed_air_system_efficiency",
        "domestic_hot_water_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a PPL Electric business customer with an eligible business facility.",
        "Projects must use the applicable instant, direct discount, prescriptive, custom, or DER incentive pathway.",
        "Applications, savings calculations, and preapproval may be required before purchase or installation depending on the measure."
      ],
      "blockers": [
        "This is a business program; residential appliances and home weatherization belong to separate PPL residential offerings.",
        "CHP is a distributed energy resource or efficiency measure and should not be parented under solar-only categories.",
        "Solar and battery measures are supported only within PPL business DER incentive rules, not as a generic residential renewable rebate."
      ],
      "programType": "Business Energy Efficiency Rebate And Incentive Program",
      "administrator": "PPL Electric Utilities",
      "applicationUrl": "https://cr101.my.salesforce-sites.com/",
      "websiteUrl": "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/",
      "sourceUrlsChecked": [
        "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/",
        "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/heating-cooling-smart-controls/",
        "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/lighting/",
        "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/distributed-energy-resources/",
        "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/prescriptive-incentives/"
      ],
      "evidenceText": "PPL’s business incentives page lists solar and CHP, smart thermostats, HVAC tune-ups, prescriptive and custom projects, lighting, agriculture, DER, HVAC, kitchen and refrigeration, motors and pumps, and compressed air.",
      "reasoningNotes": "The original matches are supported, but CHP should be classified as CHP or DER, not solar. PPL offers a broad nonresidential efficiency portfolio."
    },
    "existingSimpleRules": [
      {
        "id": "oir_64e322202cc24e0d_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 15,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$0.15 per first-year annual kWh saved for custom projects",
        "evidenceText": "PPL business incentive structure lists Custom Projects at $0.15/kWh.",
        "sourceUrlsChecked": [
          "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview"
        ],
        "reasoningNotes": "Returned as a separate candidate for controls/building-automation projects with verified annual kWh savings.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_bd0f0124ef2d8f38_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$15 per ENERGY STAR certified smart thermostat",
        "evidenceText": "PPL business incentive structure lists ENERGY STAR certified smart thermostats at $15 per unit.",
        "sourceUrlsChecked": [
          "https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview"
        ],
        "reasoningNotes": "Matched smart thermostat/control terms. Use one unit as one qualifying thermostat.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3024",
    "opportunityName": "Rhode Island Energy (Gas) - Residential Gas Heating Rebate Programs",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3024/rhode-island-energy-gas-residential-gas-heating-rebate-programs",
    "websiteUrl": "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
    "applicationUrl": null,
    "administrator": "Rhode Island Energy",
    "programType": "Residential Natural Gas Heating Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler",
          "condensing boiler"
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
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "programmable thermostat",
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
          "RI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rhode Island Energy natural gas service territory"
        ],
        "notes": "Limited to eligible Rhode Island Energy residential natural gas customers in Rhode Island."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customer",
        "homeowner",
        "landlord",
        "tenant_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "natural_gas_water_heater",
        "combination_boiler_water_heater",
        "smart_thermostat",
        "programmable_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Rhode Island Energy residential natural gas customer.",
        "Equipment must meet current efficiency, installation, and documentation requirements.",
        "Rebate applications generally require account information, proof of purchase, and contractor or installation documentation."
      ],
      "blockers": [
        "Do not match commercial gas equipment to this residential opportunity.",
        "Do not match generic high-efficiency HVAC beyond eligible natural gas boilers and furnaces.",
        "Do not match electric heat pumps or electric appliance rebates to this gas heating program."
      ],
      "programType": "Residential Natural Gas Heating Rebate Program",
      "administrator": "Rhode Island Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
      "sourceUrlsChecked": [
        "https://energy.ri.gov/energy-incentives/residential-incentives",
        "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
        "https://www.rienergy.com/media/pdfs/billing-payments/rebate-forms/gas-heat-ri.pdf"
      ],
      "evidenceText": "State and Rhode Island Energy materials identify residential natural gas rebates for boilers, furnaces, water heaters, combination boiler-water heaters, and smart or programmable thermostats.",
      "reasoningNotes": "The matched boiler, furnace, and thermostat categories are supported when narrowed to residential natural gas equipment. Generic HVAC should not be broader than eligible gas heating."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b3803f4eb1285719_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 7500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $75 per eligible smart thermostat",
        "evidenceText": "Rhode Island Office of Energy Resources says homeowners may be eligible for up to $75 for smart thermostats.",
        "sourceUrlsChecked": [
          "https://energy.ri.gov/incentives",
          "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating"
        ],
        "reasoningNotes": "Matched smart thermostat term. Confidence is medium because final eligibility is routed through Rhode Island Energy marketplace/contractor.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5361",
    "opportunityName": "Small Scale Solar Grants (Commerce RI)",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5361/small-scale-solar-grants-commerce-ri",
    "websiteUrl": "https://commerceri.com/renewable-energy-fund/",
    "applicationUrl": null,
    "administrator": "Rhode Island Commerce Corporation",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy storage"
        ]
      },
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
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar photovoltaic",
          "solar pv",
          "photovoltaic"
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
          "RI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Rhode Island Renewable Energy Fund small-scale rounds for eligible Rhode Island properties."
      },
      "eligibleApplicantTypes": [
        "homeowner",
        "micro_business",
        "business_owner",
        "affordable_housing_owner",
        "nonprofit",
        "state_facility",
        "municipality",
        "approved_installer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "affordable_housing",
        "nonprofit",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "rooftop_solar_pv",
        "solar_pv_electric_generation",
        "solar_water_heating_system",
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Project must be located in Rhode Island and meet Renewable Energy Fund small-scale program requirements.",
        "Applications must be submitted during an open round before installation.",
        "The project cannot also participate in Rhode Island's Renewable Energy Growth program.",
        "Solar PV projects must be net-metered and directly owned where required.",
        "Battery storage is only eligible as an adder to a qualifying REF-funded renewable project and must meet program integration requirements."
      ],
      "blockers": [
        "Energy audit is not a funded retrofit category in the small-scale solar grant; it is only referenced as a recommended planning step.",
        "Standalone battery storage without an eligible REF-funded solar or renewable project should not match.",
        "Already installed systems before REF approval are ineligible."
      ],
      "programType": "Grant",
      "administrator": "Rhode Island Commerce Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://commerceri.com/renewable-energy-fund/",
      "sourceUrlsChecked": [
        "https://commerceri.com/renewable-energy-fund/",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_RFP_c9b2126b-7a3b-47db-941a-9f576e78237c.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf"
      ],
      "evidenceText": "Commerce RI's REF small-scale materials list solar PV, solar domestic hot water, and a storage adder tied to qualifying REF-funded renewable projects, with scheduled 2026 rounds and approval required before installation.",
      "reasoningNotes": "Solar PV and solar hot water are supported. Storage is supported only as a co-located adder. Energy audits should be removed as a match."
    },
    "existingSimpleRules": [
      {
        "id": "oir_833372e2d022e949_v1",
        "incentiveType": "fixed_amount_grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 500000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$5,000 energy storage adder for eligible solar-plus-storage projects",
        "evidenceText": "Commerce RI 2026 small-scale flyer lists a $5,000 energy storage adder for qualifying solar-plus-storage projects.",
        "sourceUrlsChecked": [
          "https://commerceri.com/renewable-energy-fund/",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf"
        ],
        "reasoningNotes": "Matched energy storage term. Returned as a project-level fixed adder only when paired with REF-funded small-scale renewable generation.",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ad440bf1549a716d_v1",
        "incentiveType": "solar_grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 165000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 1450000
        },
        "confidence": "high",
        "formula": "$1.65 per watt for small-scale solar PV or solar hot water, capped at $14,500 per project",
        "evidenceText": "Commerce RI 2026 small-scale flyer lists $1.65/W and $14,500 per project.",
        "sourceUrlsChecked": [
          "https://commerceri.com/renewable-energy-fund/",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf"
        ],
        "reasoningNotes": "Matched solar PV and solar water heating. Use system_kw for the approved small-scale renewable system capacity.",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1492",
    "opportunityName": "Black Hills Energy - Residential Customer Rebate Program",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1492/black-hills-energy-residential-customer-rebate-program",
    "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/electric-residential-rebates-south-dakota-and-weston",
    "applicationUrl": "https://bhpresilightingappliance.customerapplication.com/",
    "administrator": "Black Hills Energy",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "SD",
          "WY"
        ],
        "counties": [
          "Weston County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Black Hills Energy electric service territory in South Dakota and Weston County, Wyoming"
        ],
        "notes": "The reviewed current page covers electric residential rebates for South Dakota and Weston County, Wyoming."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_air_conditioner",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "efficient_plug_load_device",
        "energy_star_air_purifier",
        "energy_star_dehumidifier"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Black Hills Energy residential electric customer in the covered territory.",
        "Smart thermostats must be ENERGY STAR certified and meet program limits.",
        "Heat pump water heaters must be ENERGY STAR certified.",
        "Cooling and heat pump equipment must meet the listed SEER2 efficiency requirements."
      ],
      "blockers": [
        "Do not infer commercial HVAC or commercial refrigeration measures from this residential program.",
        "EV charger rebates are a separate Black Hills Energy program and should not be matched to this residential efficiency rebate.",
        "Do not match gas residential rebate measures unless using the separate gas rebate program."
      ],
      "programType": "Rebate",
      "administrator": "Black Hills Energy",
      "applicationUrl": "https://bhpresilightingappliance.customerapplication.com/",
      "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/electric-residential-rebates-south-dakota-and-weston",
      "sourceUrlsChecked": [
        "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/south-dakota-electric-residential-rebates",
        "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/electric-residential-rebates-south-dakota-and-weston",
        "https://bhpresilightingappliance.customerapplication.com/"
      ],
      "evidenceText": "Black Hills Energy's current electric residential rebate page lists smart thermostats, heat pump water heaters, central air conditioners, air source heat pumps, ductless mini-split heat pumps, and selected efficient home devices.",
      "reasoningNotes": "The original heat pump, heat pump water heater, high-efficiency HVAC, and smart thermostat matches are supported, but only in the residential electric rebate scope and not for commercial projects."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5c964fd5fa0505e3_v1",
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
        "formula": "$500 per ENERGY STAR heat pump water heater",
        "evidenceText": "Black Hills 2026 residential rebate application lists ENERGY STAR heat pump water heater at $500.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/electric-residential-rebates-south-dakota-and-weston"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned separately from thermostat candidate.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_78084945f3126b54_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 6500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$65 per ENERGY STAR smart thermostat",
        "evidenceText": "Black Hills 2026 residential rebate application lists ENERGY STAR smart thermostat at $65.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/electric-residential-rebates-south-dakota-and-weston"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying thermostat.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22103",
    "opportunityName": "Burlington Electric Department - Commercial Energy Efficiency Rebate Program",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22103/burlington-electric-department-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.burlingtonelectric.com/commercial/",
    "applicationUrl": "https://www.burlingtonelectric.com/rebate-form/",
    "administrator": "Burlington Electric Department",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "VT"
        ],
        "counties": [
          "Chittenden County"
        ],
        "cities": [
          "Burlington"
        ],
        "utilityTerritories": [
          "Burlington Electric Department electric service territory"
        ],
        "notes": "Commercial programs are for Burlington Electric Department commercial customers."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "small_business_customer",
        "building_owner",
        "commercial_tenant"
      ],
      "eligibleSectors": [
        "commercial",
        "small_business",
        "food_service",
        "grocery",
        "multifamily_common_area"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "weatherization_air_sealing_insulation",
        "commercial_kitchen_equipment",
        "heat_pump_water_heater",
        "led_lighting_retrofit",
        "custom_commercial_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant or project site must be served by Burlington Electric Department.",
        "Commercial customers should work with BED Energy Services or use the current rebate form process.",
        "Measure eligibility and incentive amounts depend on the specific BED program category."
      ],
      "blockers": [
        "Do not match waste_heat_recovery from this opportunity; HRV and ERV rebates found in the rebate center are residential building owner measures and not commercial waste heat recovery.",
        "Commercial EV chargers, electric lawn equipment, forklifts, and on-bill financing are separate offerings and should not be merged into this commercial energy efficiency rebate.",
        "Do not infer broad industrial process heat recovery from commercial HVAC, refrigeration, or ventilation references."
      ],
      "programType": "Rebate",
      "administrator": "Burlington Electric Department",
      "applicationUrl": "https://www.burlingtonelectric.com/rebate-form/",
      "websiteUrl": "https://www.burlingtonelectric.com/commercial/",
      "sourceUrlsChecked": [
        "https://www.burlingtonelectric.com/commercial/",
        "https://www.burlingtonelectric.com/commercial-refrigeration/",
        "https://www.burlingtonelectric.com/rebate-form/",
        "https://www.burlingtonelectric.com/rebates"
      ],
      "evidenceText": "Burlington Electric's commercial pages describe assistance for heat pumps, weatherization, commercial kitchens, refrigeration, ventilation, water heating, lighting projects, and custom commercial efficiency. The commercial refrigeration page lists equipment and controls discounts.",
      "reasoningNotes": "Lighting, refrigeration, and HVAC/weatherization style measures are supported. The original waste heat recovery match is not supported by current commercial sources and should be removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9682edc72df49c65_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 80000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $800 per heat pump water heater",
        "evidenceText": "BED rebates page lists heat pump water heaters purchased at HVAC distributor at up to $800 cash back.",
        "sourceUrlsChecked": [
          "https://www.burlingtonelectric.com/rebates",
          "https://www.burlingtonelectric.com/rebate-form/"
        ],
        "reasoningNotes": "Matched heat recovery/water heating context more closely than refrigeration; use one unit per qualifying HPWH.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22587",
    "opportunityName": "Green Mountain Power Energy Efficiency Rebates",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22587/green-mountain-power-energy-efficiency-rebates",
    "websiteUrl": "https://greenmountainpower.com/rebates-programs/home-and-yard/",
    "applicationUrl": null,
    "administrator": "Green Mountain Power",
    "programType": "Residential Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "VT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Green Mountain Power"
        ],
        "notes": "Available to eligible GMP residential electric customers in Vermont; some incentives are income-qualified."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "income_qualified_residential_customers",
        "homeowners",
        "renters_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "whole_building_heat_pump_system",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "residential_induction_cooktop_range"
      ],
      "hardRequirements": [
        "Customer must be an eligible GMP residential account holder.",
        "Ductless heat pump enhanced incentive is income-qualified and must use the applicable Efficiency Vermont process.",
        "Induction cooktop or range must be installed, not portable, and application timing limits apply.",
        "Whole-building heat pump or geothermal systems must meet GMP and Efficiency Vermont requirements.",
        "Heat pump water heater rebate is limited to qualifying equipment and program terms."
      ],
      "blockers": [
        "Induction is a residential cooktop or range rebate, not commercial kitchen foodservice equipment.",
        "Do not match broad high-efficiency HVAC unless the measure is an eligible heat pump or geothermal system.",
        "Non-heat-pump fossil fuel HVAC replacement is not supported by this opportunity."
      ],
      "programType": "Residential Energy Efficiency Rebate",
      "administrator": "Green Mountain Power",
      "applicationUrl": null,
      "websiteUrl": "https://greenmountainpower.com/rebates-programs/home-and-yard/",
      "sourceUrlsChecked": [
        "https://greenmountainpower.com/rebates-programs/home-and-yard/",
        "https://greenmountainpower.com/rebates-programs/home-and-yard/heat-pump-water-heater/",
        "https://greenmountainpower.com/rebates-programs/home-and-yard/heat-pump/",
        "https://greenmountainpower.com/rebates-programs/home-and-yard/induction-cooktop-rebate/",
        "https://greenmountainpower.com/rebates-programs/home-and-yard/whole-building-heat-pump/"
      ],
      "evidenceText": "GMP residential rebate pages list heat pump water heaters, income-qualified ductless heat pumps, induction cooktops and whole-building heat pump or geothermal incentives for eligible residential customers.",
      "reasoningNotes": "Narrowed induction to residential equipment and retained geothermal only where GMP specifically supports whole-building geothermal incentives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_18a90bf9a60ad3f0_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 20000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$200 per qualifying induction cooktop or range",
        "evidenceText": "GMP states customers can save $200 when installing an induction cooktop or range.",
        "sourceUrlsChecked": [
          "https://greenmountainpower.com/rebates-programs/home-and-yard/induction-cooktop-rebate/"
        ],
        "reasoningNotes": "Matched induction term. Use one unit as one qualifying cooktop or range.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5946",
    "opportunityName": "Avista Utilities (Electric) - Commercial Energy Efficiency Incentives Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5946/avista-utilities-electric-commercial-energy-efficiency-incentives-program",
    "websiteUrl": "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-washington",
    "applicationUrl": null,
    "administrator": "Avista Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "variable frequency drive"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Avista Utilities Washington electric and natural gas service territory"
        ],
        "notes": "Program applies to qualifying Avista business customers in Washington, with electric or gas fuel requirements depending on the measure."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "small_business_customer",
        "industrial_customer",
        "non_residential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "small_business",
        "grocery",
        "food_service"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "high_efficiency_refrigeration_equipment",
        "commercial_food_service_equipment",
        "green_motor_rewind",
        "compressed_air_leak_reduction",
        "whole_building_pay_for_performance",
        "site_specific_custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer and site must be served by Avista in Washington.",
        "Equipment must use the applicable Avista electric or natural gas fuel service.",
        "Some HVAC and water-heating incentives must be processed through participating distributors.",
        "Lighting and other site-specific incentives may require program application, eligibility review, and preapproval."
      ],
      "blockers": [
        "Do not infer residential appliance or residential weatherization measures from this business program.",
        "Do not match variable_frequency_drive_retrofit as a current named prescriptive category unless handled as a site-specific custom energy-saving project.",
        "DIY installation is not eligible for distributor-based HVAC and water-heating discounts."
      ],
      "programType": "Rebate",
      "administrator": "Avista Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-washington",
      "sourceUrlsChecked": [
        "https://www.myavista.com/energy-savings/tools-for-your-business/rebates-washington",
        "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-washington",
        "https://www.myavista.com/energy-savings/rebates-washington/hvac-and-water-heating-discounts"
      ],
      "evidenceText": "Avista's Washington business rebate page lists lighting, small business lighting, HVAC and water heating, insulation, grocer refrigeration, Green Motors, compressed air leak reduction, pay-for-performance, commercial foodservice, and site-specific projects.",
      "reasoningNotes": "The original insulation, lighting, HVAC, and refrigeration matches are supported. The VFD match is not supported as a current named prescriptive category on the reviewed Avista pages, though custom site-specific savings may still cover drive projects case by case."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8f6dbdb9104bbbd0_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 100,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$1 per eligible unit",
        "evidenceText": "The service center will perform the rewind and then apply an instant discount worth $1 per horsepower on your invoice",
        "sourceUrlsChecked": [
          "https://www.myavista.com/energy-savings/tools-for-your-business/rebates-washington"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22666",
    "opportunityName": "Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "AK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22666/alaska-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles",
    "applicationUrl": null,
    "administrator": "Alaska Energy Authority",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
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
          "electric vehicle charging"
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
          "AK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Alaska NEVI implementation, with initial corridor deployment focused on Alaska's Alternative Fuel Corridor between Anchorage and Fairbanks and later expansion to communities and other corridors."
      },
      "eligibleApplicantTypes": [
        "public_agency",
        "private_entity",
        "site_host",
        "ev_charging_developer",
        "utility",
        "tribal_entity"
      ],
      "eligibleSectors": [
        "transportation",
        "public_sector",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "dc_fast_charger_installation",
        "public_ev_charging_infrastructure",
        "ev_charging_site_design_construction",
        "evse_software_hardware_installation",
        "ev_charging_operations_maintenance"
      ],
      "hardRequirements": [
        "Projects must follow Alaska Energy Authority NEVI solicitation requirements when an application round is open.",
        "NEVI funding is for public EV charging infrastructure under federal NEVI rules, including corridor-oriented fast charging deployment.",
        "Selected sites must comply with applicable federal EV charging standards, operations, data, uptime, and reporting requirements.",
        "Application availability depends on AEA procurement or grant rounds; site selection and award status must be verified for the current round."
      ],
      "blockers": [
        "Do not match LED lighting; it is not an eligible retrofit category for Alaska NEVI.",
        "Do not match generic Level 2 EV charging from separate Alaska programs unless a specific NEVI solicitation includes it.",
        "Do not match private residential EV chargers or non-public charging installations.",
        "This record is infrastructure grant support, not a general building energy-efficiency rebate."
      ],
      "programType": "Grant Program",
      "administrator": "Alaska Energy Authority",
      "applicationUrl": null,
      "websiteUrl": "https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles",
      "sourceUrlsChecked": [
        "https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles",
        "https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D"
      ],
      "evidenceText": "AEA's]( EV pages and FY26 NEVI plan describe Alaska's NEVI deployment as public EV charging infrastructure, initially along the Anchorage-Fairbanks corridor, with program implementation through AEA and federal NEVI requirements.",
      "reasoningNotes": "EV charging is correct, but the category should emphasize public DC fast charging and NEVI infrastructure. LED lighting is a false-positive match. Level 2 charging belongs to other programs unless an AEA NEVI round explicitly includes it."
    },
    "existingSimpleRules": [
      {
        "id": "oir_25ece7929e784e1d_v1",
        "incentiveType": "possible_grant",
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
          "maxPercentOfBasis": 0.8
        },
        "confidence": "medium",
        "formula": "Possible grant up to 80% of eligible NEVI EV charging project cost",
        "evidenceText": "USDOT NEVI funding guidance lists the federal share of eligible project costs at 80%; state NEVI awards remain solicitation- and site-specific.",
        "sourceUrlsChecked": [
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs",
          "https://www.akenergyauthority.org/What-We-Do/Alternative-Energy-and-Energy-Efficiency-Programs/Electric-Vehicles/EV-Infrastructure-Implementation-Plan"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  }
]
