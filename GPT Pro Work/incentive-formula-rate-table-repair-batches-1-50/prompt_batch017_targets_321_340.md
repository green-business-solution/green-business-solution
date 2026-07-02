You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 17
Targets in this prompt: 321-340 of 984
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
  "batchNumber": 17,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22596"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22273",
    "opportunityName": "Entergy Arkansas - eTech Program",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22273/entergy-arkansas-etech-program",
    "websiteUrl": "https://entergyetech.com/electric-vehicles/",
    "applicationUrl": null,
    "administrator": "Entergy Arkansas",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "dc fast"
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
          "AR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Entergy Arkansas"
        ],
        "notes": "Applies to eligible Entergy Arkansas customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "commercial_electric_customers",
        "industrial_electric_customers",
        "fleet_operators"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "fleet",
        "workplace"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Entergy Arkansas customer.",
        "Level 2 charger must be ENERGY STAR certified.",
        "DC fast charger rebate amount depends on charger power rating below or above 50 kW.",
        "Customer must apply through the Entergy eTech rebate process and submit required documentation."
      ],
      "blockers": [
        "This record should not match customers outside Entergy Arkansas territory.",
        "Level 1 chargers and non-installed portable charging equipment are not supported.",
        "Non-EV electrification rebates on eTech are separate from this EV charging scope."
      ],
      "programType": "Rebate",
      "administrator": "Entergy Arkansas",
      "applicationUrl": null,
      "websiteUrl": "https://entergyetech.com/electric-vehicles/",
      "sourceUrlsChecked": [
        "https://entergyetech.com/electric-vehicles/",
        "https://entergyetech.com/"
      ],
      "evidenceText": "Entergy eTech lists rebates for ENERGY STAR Level 2 EV charging ports and DC fast chargers, including separate amounts for lower- and higher-power DC fast charging.",
      "reasoningNotes": "Original EV charging matches are valid when limited to Entergy Arkansas and eligible Level 2 or DC fast charger equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ce68a0855f781def_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1250000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$12,500 per eligible unit",
        "evidenceText": "Entergy New Orleans commercial customers Equipment type Location requirement Incentive ENERGY STAR® certified Level 2 charger *† Public, fleet and multi-unit dwellings $1,000/port Public, fleet and multi-unit dwellings located in disadvantaged community $2,500/port DC fast charger † Public and fleet $2,500/port, 20-50 kW $5,000/port, 51-149 kW $12,500/port, 150+ kW Private network $2,500/port *2-port minimum",
        "sourceUrlsChecked": [
          "https://entergyetech.com/electric-vehicles/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22270",
    "opportunityName": "Salt River Project - Business EV Charger Rebate",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22270/salt-river-project-business-ev-charger-rebate",
    "websiteUrl": "https://www.srpnet.com/energy-savings-rebates/business/rebates/ev-charger",
    "applicationUrl": "https://srp-ev.customerapplication.com/",
    "administrator": "Salt River Project",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "fast charger"
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
          "ev charging"
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
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Salt River Project electric service territory"
        ],
        "notes": "Applies to SRP business electric customers on eligible nonresidential electric price plans."
      },
      "eligibleApplicantTypes": [
        "SRP business electric customers",
        "business account holders",
        "government entities",
        "multifamily property owners",
        "nonprofits",
        "schools"
      ],
      "eligibleSectors": [
        "commercial",
        "government",
        "multifamily",
        "nonprofit",
        "education"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_prewiring",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be the SRP customer of record, be in good standing, and have legal right to install the charger.",
        "Installation must occur during the applicable program year and the rebate application must be submitted by the stated deadline.",
        "Level 2 rebates apply to qualifying networked ports; DC fast chargers must meet the minimum power requirement.",
        "Invoices, installation documentation, and all SRP EV charger rebate terms are required."
      ],
      "blockers": [
        "Residential-only home EV charger rebates are separate from this business rebate.",
        "Generic EV equipment outside SRP territory or without an eligible SRP business account is ineligible.",
        "DC fast charger incentives require qualifying DCFC equipment, not ordinary Level 2 chargers."
      ],
      "programType": "Rebate Program",
      "administrator": "Salt River Project",
      "applicationUrl": "https://srp-ev.customerapplication.com/",
      "websiteUrl": "https://www.srpnet.com/energy-savings-rebates/business/rebates/ev-charger",
      "sourceUrlsChecked": [
        "https://www.srpnet.com/energy-savings-rebates/business/rebates/ev-charger",
        "https://srp-ev.customerapplication.com/"
      ],
      "evidenceText": "SRP]( lists business EV charger rebates for Level 1 prewire, Level 2 networked ports, and DC fast chargers, with customer-of-record, service territory, installation-period, and documentation requirements.",
      "reasoningNotes": "Confirmed all three EV charger categories, adding prewiring and limiting eligibility to SRP business electric customers."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7b04a342cdd1d377_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 2000000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$20,000 per business location installing one to four DC fast charger stations",
        "evidenceText": "SRP lists DC fast charger rebates of $20,000 for business locations installing one to four stations.",
        "sourceUrlsChecked": [
          "https://www.srpnet.com/energy-savings-rebates/business/rebates/ev-charger",
          "https://savewithsrpbiz.com/rebates/evcharger.aspx"
        ],
        "reasoningNotes": "Matched DC fast charger terms. The official source states the amount by location for one to four stations, so this is modeled as a flat site-level amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_817def8179eba142_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 250000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$2,500 per networked Level 2 EV charging station port for businesses",
        "evidenceText": "SRP lists $2,500 per networked Level 2 EV charging station port for businesses.",
        "sourceUrlsChecked": [
          "https://www.srpnet.com/energy-savings-rebates/business/rebates/ev-charger",
          "https://savewithsrpbiz.com/rebates/evcharger.aspx"
        ],
        "reasoningNotes": "Matched business EV charger and Level 2 terms. Government, multifamily, nonprofit and school sites have a higher separate amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3117",
    "opportunityName": "TEP - Residential Energy Efficiency Rebate Program",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3117/tep-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.tep.com/efficient-home-program/",
    "applicationUrl": null,
    "administrator": "Tucson Electric Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "mini split"
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
          "Tucson Electric Power"
        ],
        "notes": "Limited to Tucson Electric Power residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "duct_sealing_and_insulation",
        "ductless_mini_split_heat_pump",
        "hvac_tune_up"
      ],
      "hardRequirements": [
        "Applicant must be a TEP residential electric customer.",
        "Work must be completed by a licensed participating contractor where required.",
        "HVAC and duct measures must meet program efficiency and installation requirements.",
        "Customers should verify contractor participation and program eligibility before work begins."
      ],
      "blockers": [
        "Commercial and industrial efficiency measures are not part of this residential opportunity.",
        "The HVAC program should not be generalized to unrelated water heating, appliance, or building-envelope rebates unless separately verified.",
        "Mini-split eligibility is product-specific and should not be broadened beyond qualifying ductless systems."
      ],
      "programType": "Rebate Program",
      "administrator": "Tucson Electric Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.tep.com/efficient-home-program/",
      "sourceUrlsChecked": [
        "https://www.tep.com/efficient-home-program/",
        "https://programs.dsireusa.org/system/program/detail/3117/tep-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "TEP's current Efficient Home Program lists residential rebates for high-efficiency heat pumps, high-efficiency air conditioners, duct sealing, mini-split systems, and advanced AC tune-ups.",
      "reasoningNotes": "The supplied HVAC-related matches are generally correct, with the addition of tune-ups and ductless mini-splits as distinct supported measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_06a637ae339a4cb1_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 72000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$720 per eligible unit",
        "evidenceText": ", Monday to Friday Get a Free Home Assessment Rebates Smart Thermostat ( see details ) $35 --> High efficiency heat pump quality installation up to $720 High efficiency air conditioner quality installation up to $600 Duct sealing (varies based on actual leakage reduced): up to $300 Mini split heat pump or air conditioner up to $100/ton AC tuneup: Refrigerant charge repair: $80 Indoor coil cleaning: $40 Outdoor coil cleaning: $40 up to $160 Our partner — Franklin Energy",
        "sourceUrlsChecked": [
          "https://www.tep.com/efficient-home-program/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3119",
    "opportunityName": "UES (Electric) - Residential Efficiency Program",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3119/ues-electric-residential-efficiency-program",
    "websiteUrl": "https://www.uesaz.com/efficient-home-program/",
    "applicationUrl": null,
    "administrator": "UniSource Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "air conditioning"
        ]
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
          "UniSource Energy Services"
        ],
        "notes": "Limited to UniSource Energy Services residential electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "duct_sealing_and_insulation",
        "hvac_tune_up"
      ],
      "hardRequirements": [
        "Applicant must be a UniSource residential electric customer.",
        "Qualifying work must be completed by a licensed participating contractor where required.",
        "Heat pump, air conditioner, duct sealing, and tune-up measures must meet program specifications."
      ],
      "blockers": [
        "Commercial or industrial efficiency measures are not part of this residential opportunity.",
        "Do not infer broad building-envelope weatherization beyond duct sealing.",
        "Gas-only customers and non-UniSource electric customers should not match this electric residential program."
      ],
      "programType": "Rebate Program",
      "administrator": "UniSource Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.uesaz.com/efficient-home-program/",
      "sourceUrlsChecked": [
        "https://www.uesaz.com/efficient-home-program/",
        "https://programs.dsireusa.org/system/program/detail/3119/ues-electric-residential-efficiency-program"
      ],
      "evidenceText": "UniSource's current Efficient Home Program lists rebates for high-efficiency heat pumps, high-efficiency air conditioners, duct sealing, and advanced AC tune-ups for residential customers.",
      "reasoningNotes": "The supplied HVAC matches are correct. Add HVAC tune-up as a supported non-replacement measure and keep program limited to residential electric customers."
    },
    "existingSimpleRules": [
      {
        "id": "oir_03dac9c9717c98cb_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 15000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $150 for duct sealing based on leakage reduction",
        "evidenceText": "UniSource efficient-home materials list duct sealing incentives up to $150.",
        "sourceUrlsChecked": [
          "https://www.uesaz.com/efficient-home-program/"
        ],
        "reasoningNotes": "Matched duct sealing term. Modeled as project-level maximum.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_412b15e774755ced_v1",
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
        "formula": "Up to $450 per high-efficiency heat pump quality installation",
        "evidenceText": "UniSource residential efficient-home materials list high-efficiency heat pump quality installation rebates up to $450.",
        "sourceUrlsChecked": [
          "https://www.uesaz.com/efficient-home-program/"
        ],
        "reasoningNotes": "Matched heat pump term. Source uses up to; final value depends on equipment and installation.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22276",
    "opportunityName": "Anaheim Public Utilities - Public Access EV Charger Rebate",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22276/anaheim-public-utilities-public-access-ev-charger-rebate",
    "websiteUrl": "https://www.anaheim.net/3312/Public-EV-Charger-Rebate",
    "applicationUrl": null,
    "administrator": "Anaheim Public Utilities",
    "programType": "EV Charging Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "dc fast"
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
          "ev charging",
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
          "Anaheim"
        ],
        "utilityTerritories": [
          "Anaheim Public Utilities"
        ],
        "notes": "Limited to eligible Anaheim Public Utilities electric customers installing public-access EV chargers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "municipal_customer",
        "multifamily_property_owner",
        "school",
        "affordable_housing_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "multifamily",
        "education",
        "affordable_housing"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_charger_submetering"
      ],
      "hardRequirements": [
        "Applicant must be an Anaheim Public Utilities electric customer.",
        "Chargers must be Level 2 or higher and publicly accessible to patrons, tenants, commuters or visitors as required.",
        "Reservation approval is required before engineering and permitting work.",
        "Project must meet permit, inspection, invoice, utility bill and tax documentation requirements.",
        "Associated submetering rebate applies only to qualifying EV charging meters."
      ],
      "blockers": [
        "Private single-family residential chargers are not eligible under this public-access rebate.",
        "Submetering support is EV-charger-associated metering only, not a generic building energy monitoring system.",
        "Projects started without required reservation approval may be ineligible.",
        "Chargers outside Anaheim Public Utilities electric service are ineligible."
      ],
      "programType": "EV Charging Rebate",
      "administrator": "Anaheim Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.anaheim.net/3312/Public-EV-Charger-Rebate",
      "sourceUrlsChecked": [
        "https://www.anaheim.net/3312/Public-EV-Charger-Rebate"
      ],
      "evidenceText": "Anaheim Public Utilities describes rebates for public-access Level 2 or higher EV chargers, including higher support for selected public-serving locations and an associated EV charging sub-meter rebate.",
      "reasoningNotes": "All EV charger categories are supported, but metering must be narrowed to EV charger submetering rather than broad submetering or energy monitoring."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f2dd10827faeab96_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 750000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$7,500 per eligible unit",
        "evidenceText": "s EV Charger Rebates Receive Up to $3,500 Per Charger for Public Access Locations Receive Up to $7,500 Per Charger for Schools, Affordable Housing, and Publicly Accessible DC Fast Plug-in locations Rebates are subject to fund availability",
        "sourceUrlsChecked": [
          "http://www.anaheim.net/3312/Public-EV-Charger-Rebate"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22279",
    "opportunityName": "Burbank Water and Power - Electric Vehicle Charger Rebate",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22279/burbank-water-and-power-electric-vehicle-charger-rebate",
    "websiteUrl": "https://www.burbankwaterandpower.com/commercial-ev-charging-station-rebate",
    "applicationUrl": "https://www.burbankwaterandpower.com/documents/d/guest/Commercial_EV_Charging_Station_Rebate_Application_07-09-25",
    "administrator": "Burbank Water and Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "fast charger"
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
          "CA"
        ],
        "counties": [
          "Los Angeles County"
        ],
        "cities": [
          "Burbank"
        ],
        "utilityTerritories": [
          "Burbank Water and Power"
        ],
        "notes": "Limited to eligible Burbank Water and Power commercial, industrial, municipal, and multifamily common-area electric-service premises."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "multifamily_property_owner",
        "municipality",
        "nonprofit",
        "fleet_operator",
        "site_host"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "public_sector",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_1_ev_smart_outlet",
        "level_2_ev_charger_installation",
        "level_2_ev_smart_outlet",
        "dc_fast_charger_installation",
        "ev_charging_make_ready_infrastructure",
        "utility_infrastructure_upgrade_for_ev_charging",
        "ev_charger_load_management_networking"
      ],
      "hardRequirements": [
        "Applicant must be a BWP commercial or industrial electric customer, or an eligible multifamily common-area customer, at the rebated premises.",
        "Equipment must be new, permanently installed, and meet BWP's listed charger, smart-outlet, networking, load-management, and safety requirements.",
        "Installation must use a licensed contractor, obtain permits, pass final inspection, and submit within the required post-installation period.",
        "Chargers must satisfy program network, Wi-Fi, uptime, load-management, and LCFS credit assignment requirements where applicable.",
        "Rebates are subject to per-customer and per-port caps, customer class limits, and BWP funding availability."
      ],
      "blockers": [
        "Do not match single-family residential EV chargers to this commercial EV charging station rebate.",
        "Do not match used chargers, replacement chargers, off-road charging, or chargers required solely by code or CALGreen.",
        "Do not match general electrical upgrades unless they are BWP-approved EV charging make-ready or utility-side infrastructure tied to eligible chargers.",
        "Do not match non-BWP customer sites or premises outside Burbank."
      ],
      "programType": "Rebate Program",
      "administrator": "Burbank Water and Power",
      "applicationUrl": "https://www.burbankwaterandpower.com/documents/d/guest/Commercial_EV_Charging_Station_Rebate_Application_07-09-25",
      "websiteUrl": "https://www.burbankwaterandpower.com/commercial-ev-charging-station-rebate",
      "sourceUrlsChecked": [
        "https://www.burbankwaterandpower.com/commercial-ev-charging-station-rebate",
        "https://www.burbankwaterandpower.com/documents/d/guest/Commercial_EV_Charging_Station_Rebate_Application_07-09-25",
        "https://www.burbankwaterandpower.com/ev-technical-assistance-program",
        "https://www.burbankwaterandpower.com/commercial-ev-charging-faq"
      ],
      "evidenceText": "BWP's]( current commercial EV charging rebate materials cover Level 1, smart outlets, Level 2, DC fast chargers, make-ready and utility infrastructure for eligible commercial and multifamily sites.",
      "reasoningNotes": "The Level 2 and DC fast charger matches are valid. The generic EV charger category is also valid only when constrained to BWP's commercial, industrial, public, fleet, or eligible multifamily common-area program rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6496d61bea8c8c1a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2000000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 20000000
        },
        "confidence": "high",
        "formula": "$20,000 per DC fast charging port with infrastructure upgrade",
        "evidenceText": "BWP commercial EV table lists DC fast charger rebate with infrastructure upgrade at $20,000 per port.",
        "sourceUrlsChecked": [
          "https://www.burbankwaterandpower.com/commercial-ev-charging-station-rebate",
          "https://www.burbankwaterandpower.com/documents/d/guest/Commercial_EV_Charging_Station_Rebate_Application_07-09-25"
        ],
        "reasoningNotes": "Matched DC fast charger term. Use one unit as one qualifying charge port.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_651b58aa7296dc08_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 750000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 20000000
        },
        "confidence": "high",
        "formula": "$7,500 per commercial or multifamily Level 2 charging port with infrastructure upgrade",
        "evidenceText": "BWP commercial EV table lists Level 2 rebate with infrastructure upgrade at $7,500 per port.",
        "sourceUrlsChecked": [
          "https://www.burbankwaterandpower.com/commercial-ev-charging-station-rebate",
          "https://www.burbankwaterandpower.com/documents/d/guest/Commercial_EV_Charging_Station_Rebate_Application_07-09-25"
        ],
        "reasoningNotes": "Returned separately because infrastructure-upgrade projects have a higher per-port rebate.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7b4de0b172546b49_v1",
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
        "cap": {
          "maxAmountCents": 20000000
        },
        "confidence": "high",
        "formula": "$4,000 per commercial or multifamily Level 2 charging port without infrastructure upgrade",
        "evidenceText": "BWP commercial EV table lists Level 2 rebate without infrastructure upgrade at $4,000 per port.",
        "sourceUrlsChecked": [
          "https://www.burbankwaterandpower.com/commercial-ev-charging-station-rebate",
          "https://www.burbankwaterandpower.com/documents/d/guest/Commercial_EV_Charging_Station_Rebate_Application_07-09-25"
        ],
        "reasoningNotes": "Matched Level 2 charging terms. Use one unit as one qualifying charge port.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:heat-pump-air-conditioner-rebates-conversion-to-all-electric-heating-and-cooling",
    "opportunityName": "Heat Pump Air Conditioner Rebates - Conversion to All Electric Heating and Cooling",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/71431/637902892215200000",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
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
        "notes": "Nonresidential SVP electric service territory in the City of Santa Clara."
      },
      "eligibleApplicantTypes": [
        "nonresidential_customers",
        "businesses",
        "commercial_customers",
        "industrial_customers",
        "institutional_customers",
        "multifamily_property_owners",
        "local_governments",
        "nonprofits"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "nonprofit",
        "multifamily_nonresidential_common_area"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a nonresidential Silicon Valley Power customer.",
        "Project must replace natural gas-fired space-heating equipment with electric heat pump equipment.",
        "Written preapproval is required before installation.",
        "Customer must submit required equipment specifications, invoices and documentation.",
        "Final inspection or verification may be required before rebate payment."
      ],
      "blockers": [
        "Low-flow fixture retrofit is unsupported and appears to be a false-positive match.",
        "Residential projects are not eligible under this business electrification rebate.",
        "Equipment installed before written preapproval is not eligible.",
        "Do not match broad high-efficiency HVAC unless the project is a gas-to-electric heat pump conversion.",
        "Self-generation and cogeneration are not part of this rebate."
      ],
      "programType": "Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/71431/637902892215200000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/71431/637902892215200000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/74272/637595252919970000"
      ],
      "evidenceText": "Official SVP page says all nonresidential SVP customers may apply for rebates to replace natural gas-fired space-heating equipment with electric heat pump equipment; written preapproval is required before installation.",
      "reasoningNotes": "The match should keep heat pump HVAC only. The word fixture is not a water-efficiency measure here and should not map to low-flow fixtures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_37d2f99268b4e437_v1",
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
        "evidenceText": "2 COP $650 per ton Heat Pumps # of Unit Size SEER or IEER HSPF or COP Rebate Rebate Make & Model # units (tons) (specify) (specify) $/ton Amount 1 2 3 Engineering and permit allowance $750 per site Electrical upgrade (only if heat pump includes supplemental electric resistance heat) $500 per site kWh Savings: for official use only Total Rebate Amount: Rebate Number: for official use only Greenhouse Gas (GHG) Emission Reduction Energy Source",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/71431/637902892215200000"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_bill_data"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:multifamily-boiler-electrification-pilot-program",
    "opportunityName": "Multifamily Boiler Electrification Pilot Program",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/77783/638877473842570000",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "boiler"
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
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
        "notes": "Limited to qualifying multifamily properties served by Silicon Valley Power."
      },
      "eligibleApplicantTypes": [
        "multifamily_rental_property_owner",
        "condominium_complex",
        "homeowners_association"
      ],
      "eligibleSectors": [
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "multifamily_domestic_hot_water_boiler_electrification",
        "all_electric_domestic_hot_water_system"
      ],
      "hardRequirements": [
        "Existing natural gas-fired domestic hot water boiler must serve at least 25 dwelling units.",
        "Dwelling units must be individually metered for electricity.",
        "Customer must work with Silicon Valley Power's energy engineer before applying.",
        "Written preapproval is required before installation.",
        "Pre-installation and post-installation inspections are required.",
        "Pilot participation is limited and incentive is capped at 100000 dollars."
      ],
      "blockers": [
        "Do not match high-efficiency gas boiler retrofits; the program is for electrification away from natural gas boilers.",
        "Do not match space-heating HVAC replacement unless it is part of the qualifying domestic hot water boiler electrification project.",
        "Do not match low-flow fixtures or plumbing fixture retrofits; the fixture language does not support water-efficiency measures.",
        "Single-family homes and multifamily systems serving fewer than 25 dwelling units are not eligible."
      ],
      "programType": "Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/77783/638877473842570000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/77783/638877473842570000"
      ],
      "evidenceText": "The official SVP program describes a pilot to convert natural gas-fired domestic hot water boilers in multifamily rental or condominium complexes to all-electric boiler systems.",
      "reasoningNotes": "The correct match is boiler electrification for multifamily domestic hot water, not high-efficiency boiler replacement, broad HVAC, or low-flow fixtures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_339e258fe28a1699_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 65000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$650 per eligible unit",
        "evidenceText": "Rebates of up to $650 per ton are available",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22290",
    "opportunityName": "SMUD - Commercial Electric Vehicle Incentive Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22290/smud-commercial-electric-vehicle-incentive-program",
    "websiteUrl": "https://www.smud.org/Going-Green/Electric-Vehicles/Business",
    "applicationUrl": "https://smudcev.powerclerk.com/",
    "administrator": "SMUD",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
        "cities": [],
        "utilityTerritories": [
          "SMUD electric service territory"
        ],
        "notes": "Applies to eligible SMUD business and multifamily charging projects; equity multipliers use qualifying disadvantaged-community criteria."
      },
      "eligibleApplicantTypes": [
        "SMUD business customers",
        "commercial property owners",
        "fleet operators",
        "multifamily property owners",
        "government entities",
        "nonprofits",
        "schools"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "government",
        "nonprofit",
        "education"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_charger_make_ready",
        "smart_ev_outlet",
        "dcfc_integrated_battery_storage"
      ],
      "hardRequirements": [
        "Applicant must apply through the SMUD commercial EV process and generally receive approval before construction.",
        "Project must be in SMUD electric service territory and meet charger category, power, and documentation requirements.",
        "Eligible categories include low-power Level 2 or smart outlets, high-power Level 2, and non-public DC fast chargers by power tier.",
        "Onboard battery incentive applies only to integrated DCFC storage under the program rules."
      ],
      "blockers": [
        "Residential single-family EV charger rebates are separate from this commercial program.",
        "Do not match general building battery storage; battery support is only for eligible DCFC onboard or integrated storage.",
        "Projects built before required program approval may be ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "SMUD",
      "applicationUrl": "https://smudcev.powerclerk.com/",
      "websiteUrl": "https://www.smud.org/Going-Green/Electric-Vehicles/Business",
      "sourceUrlsChecked": [
        "https://www.smud.org/Going-Green/Electric-Vehicles/Business",
        "https://smudcev.powerclerk.com/"
      ],
      "evidenceText": "SMUD's]( business EV page lists incentives for low-power Level 2 or smart outlets, high-power Level 2, non-public DCFC, make-ready items, and onboard DCFC storage, with application before construction.",
      "reasoningNotes": "Confirmed EV charging scope and added make-ready and DCFC-integrated battery boundaries."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5a499fe79a2690fb_v1",
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
        "formula": "$3,500 per high-power Level 2 EV charger handle",
        "evidenceText": "SMUD business EV page lists high power Level 2 at $3,500 per handle for non-equity projects.",
        "sourceUrlsChecked": [
          "https://www.smud.org/Going-Green/Electric-Vehicles/Business"
        ],
        "reasoningNotes": "Matched commercial Level 2 EV charging. Use one unit as one charger handle.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_6a619eb7584de54a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 3000000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$30,000 per non-public high-power DCFC handle rated 150+ kW",
        "evidenceText": "SMUD business EV page lists non-public high power DCFC 150+ kW at $30,000 per handle.",
        "sourceUrlsChecked": [
          "https://www.smud.org/Going-Green/Electric-Vehicles/Business"
        ],
        "reasoningNotes": "Matched DCFC term. Returned separately for known 150+ kW DC fast chargers.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2045",
    "opportunityName": "Holy Cross Energy - Residential Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2045/holy-cross-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026",
    "applicationUrl": "https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebate-application",
    "administrator": "Holy Cross Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
        "cities": [],
        "utilityTerritories": [
          "Holy Cross Energy"
        ],
        "notes": "Equipment must be installed in Holy Cross Energy service territory for a member in good standing."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "income_qualified_residential_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "heat_pump_clothes_dryer",
        "induction_cooktop_range",
        "residential_energy_management_system",
        "smart_panel_or_load_controller",
        "smart_thermostat_zoning_retrofit",
        "new_all_electric_construction",
        "battery_storage_system",
        "plug_sharing_device"
      ],
      "hardRequirements": [
        "Applicant must be a Holy Cross Energy member in good standing.",
        "Equipment must be installed and working in the Holy Cross Energy service territory.",
        "Residential rebate applications must be submitted within the stated post-installation deadline.",
        "Members must enroll in the applicable Holy Cross flexible-load program where required.",
        "Air sealing and insulation rebates have additional building-heating, blower-door, and insulation-performance requirements."
      ],
      "blockers": [
        "Colorado HEAR rebates are a separate program and should not be merged into this opportunity.",
        "Commercial rebates are separate from this residential rebate page.",
        "EV, e-bike, and electric lawn equipment incentives are separate program areas.",
        "Battery incentives are tied to Holy Cross battery or time-of-use program requirements.",
        "Do not match generic fossil-fuel HVAC replacement where the listed measure is electrification-focused."
      ],
      "programType": "Rebate Program",
      "administrator": "Holy Cross Energy",
      "applicationUrl": "https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebate-application",
      "websiteUrl": "https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026",
      "sourceUrlsChecked": [
        "https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026",
        "https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebate-application",
        "https://www.holycross.com/rebate-rules"
      ],
      "evidenceText": "Holy Cross Energy’s 2026 residential rebate page lists air sealing, insulation, heat pumps, heat pump water heaters and dryers, induction cooking, thermostats, smart panels, load controllers, all-electric construction, and batteries.",
      "reasoningNotes": "The original envelope matches are supported. Generic HVAC should be narrowed to the supported heat pump and electrification categories, with separate-program boundaries preserved."
    },
    "existingSimpleRules": [
      {
        "id": "oir_56ac025ebb13816c_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 150000
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$1,500 for qualifying residential air sealing",
        "evidenceText": "HCE 2026 residential rebates list $1,500 for Air Sealing.",
        "sourceUrlsChecked": [
          "https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026"
        ],
        "reasoningNotes": "Matched air sealing term. Use as a project-level residential air sealing rebate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f1ac00530ff5c605_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 150000
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$1,500 for qualifying residential insulation",
        "evidenceText": "HCE 2026 residential rebates list $1,500 for Insulation.",
        "sourceUrlsChecked": [
          "https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026"
        ],
        "reasoningNotes": "Matched insulation term. Use as a project-level residential insulation rebate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3692",
    "opportunityName": "Florida Public Utilities - Residential HVAC Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3692/florida-public-utilities-residential-hvac-rebate-program",
    "websiteUrl": "https://fpuc.com/residential-electric/residential-electric-rebates/",
    "applicationUrl": "https://rebate.fpuc.com/",
    "administrator": "Florida Public Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_pump_replacement",
        "displayName": "Efficient pump replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "pump replacement"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "FL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Florida Public Utilities electric service territory"
        ],
        "notes": "Residential electric customers in the FPUC electric service area."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "central_air_conditioner_replacement",
        "high_efficiency_hvac_replacement"
      ],
      "hardRequirements": [
        "Applicant must be a Florida Public Utilities electric customer and owner of a residence in the electric service area.",
        "Eligible equipment is a qualifying ducted heat pump or central air conditioning system.",
        "Central air conditioning minimum efficiency and heat pump AHRI and thermostat requirements must be met.",
        "Application and required documentation must be submitted within the stated post-installation deadline.",
        "Equipment must satisfy applicable codes and program standards."
      ],
      "blockers": [
        "Efficient pump replacement is a false positive; heat pump language refers to HVAC, not water, process, or motor pumps.",
        "Commercial HVAC and natural gas appliance rebates are separate from this residential electric HVAC program.",
        "Non-ducted or nonqualifying HVAC systems should not match."
      ],
      "programType": "Rebate",
      "administrator": "Florida Public Utilities",
      "applicationUrl": "https://rebate.fpuc.com/",
      "websiteUrl": "https://fpuc.com/residential-electric/residential-electric-rebates/",
      "sourceUrlsChecked": [
        "https://fpuc.com/residential-electric/residential-electric-rebates/",
        "https://rebate.fpuc.com/",
        "https://fpuc.com/wp-content/uploads/FPU23-130-14-15-16-17_E_Website-FM_Electric-residential-rebates_ADA_i_F.pdf"
      ],
      "evidenceText": "FPUC's residential electric rebate materials list HVAC rebates for high-efficiency heat pump and central air conditioning replacements or installations, with customer, ownership, efficiency, and documentation requirements.",
      "reasoningNotes": "Heat pump HVAC and high-efficiency HVAC matches are supported. The pump replacement match must be removed because it is not a motor or pump rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_65bab152adfd24af_v1",
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
        "formula": "Up to $500 per eligible high-efficiency heat pump or air-conditioning system",
        "evidenceText": "Florida Public Utilities residential HVAC materials list $250-$500 rebates for qualifying heat pump or AC systems.",
        "sourceUrlsChecked": [
          "https://fpuc.com/residential-electric/rebates-conservation/residential-hvac-rebates/"
        ],
        "reasoningNotes": "Matched heat pump and air conditioner terms. Modeled as top published tier; final amount depends on equipment.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22811",
    "opportunityName": "Cobb Electric Membership Corporation - Business EV Charger Grant Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22811/cobb-electric-membership-corporation-business-ev-charger-grant-program",
    "websiteUrl": "https://www.cobbemc.com/ev-charging-business",
    "applicationUrl": "https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf",
    "administrator": "Cobb EMC",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cobb EMC"
        ],
        "notes": "Limited to non-residential sites with an active Cobb EMC electric meter."
      },
      "eligibleApplicantTypes": [
        "non_residential_cobb_emc_members",
        "businesses",
        "commercial_property_owners",
        "multifamily_property_owners_operators",
        "government_entities"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "government",
        "institutional",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Cobb EMC member at the service address.",
        "Eligible charger must be Level 2 or Level 3 and installed on or after January 1, 2019.",
        "Installation must use a licensed contractor and meet code and permitting requirements.",
        "Charger must remain operational for at least three years and meet signage, protection, verification, and branding requirements.",
        "Grants are subject to available funds and are based on charger classification, ports, and installation price."
      ],
      "blockers": [
        "Residential home EV charging incentives are not part of this business grant.",
        "EV charger vendors and EV charging businesses are ineligible.",
        "Sites without an active Cobb EMC electric meter do not qualify.",
        "Level 1 chargers or non-installed portable charging equipment are not supported."
      ],
      "programType": "Grant",
      "administrator": "Cobb EMC",
      "applicationUrl": "https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf",
      "websiteUrl": "https://www.cobbemc.com/ev-charging-business",
      "sourceUrlsChecked": [
        "https://www.cobbemc.com/ev-charging-business",
        "https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf",
        "https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf"
      ],
      "evidenceText": "Cobb EMC describes business EV charging grants for Level 2 and Level 3 chargers at non-residential member sites, with requirements for licensed installation, signage, protection, verification, and continued operation.",
      "reasoningNotes": "Original EV charger matches were directionally correct, but the generic EV category was narrowed to Level 2 and DC fast charging. Residential and vendor use cases should be blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_239318962af3f757_v1",
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
          "maxAmountCents": 500000
        },
        "confidence": "medium",
        "formula": "up to $5,000 of eligible project cost",
        "evidenceText": "The maximum grant award is $5,000",
        "sourceUrlsChecked": [
          "https://cobbemc.com/ev-charging-business"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22309",
    "opportunityName": "Georgia Power - Business EV Charger Plus Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22309/georgia-power-business-ev-charger-plus-rebate-program",
    "websiteUrl": "https://www.georgiapower.com/business/products-programs/business-solutions/electric-transportation-business-programs/electric-vehicle-charger-rebate.html",
    "applicationUrl": "https://gpcevchargerplus.customerapplication.com/",
    "administrator": "Georgia Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "fast charger",
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Georgia Power"
        ],
        "notes": "Limited to Georgia Power business accounts and qualifying multifamily house accounts under a business name."
      },
      "eligibleApplicantTypes": [
        "business_electric_customers",
        "commercial_customers",
        "industrial_customers",
        "multifamily_property_owners_operators",
        "workplace_site_hosts",
        "fleet_site_hosts"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "workplace",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Georgia Power business customer with an active permanent-service account.",
        "Equipment must be new, Nationally Recognized Testing Laboratory certified, and at least Level 2 208 or 240 volt EVSE.",
        "Installation must use dedicated circuits or breakers and be performed by a licensed electrician or certified electrical worker.",
        "Application must meet timing, documentation, and cap requirements.",
        "Incentive is limited by project, premises, service account, applicant annual cap, and percentage of eligible cost."
      ],
      "blockers": [
        "Residential home charging rebates are separate and should not match this business program.",
        "Mobile or portable connectors, used chargers, and Level 1 chargers are not eligible.",
        "Georgia Power Make Ready support is a separate program boundary and should not be conflated with this rebate."
      ],
      "programType": "Rebate",
      "administrator": "Georgia Power",
      "applicationUrl": "https://gpcevchargerplus.customerapplication.com/",
      "websiteUrl": "https://www.georgiapower.com/business/products-programs/business-solutions/electric-transportation-business-programs/electric-vehicle-charger-rebate.html",
      "sourceUrlsChecked": [
        "https://www.georgiapower.com/business/products-programs/business-solutions/electric-transportation-business-programs/electric-vehicle-charger-rebate.html",
        "https://www.georgiapower.com/content/dam/georgia-power/pdfs/business-pdfs/business-ev-charger-plus-terms-conditions.pdf",
        "https://gpcevchargerplus.customerapplication.com/"
      ],
      "evidenceText": "Georgia Power's business EV Charger Plus materials support Level 2 and DC fast charging rebates for business customers, with new certified equipment, licensed installation, documentation, and rebate caps.",
      "reasoningNotes": "Original EV categories are correct if narrowed to Level 2 and DC fast charging and kept within Georgia Power business account eligibility."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c489fad69aae9506_v1",
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
        "evidenceText": "* Level 2 Charger Rebate $250/kW Avg",
        "sourceUrlsChecked": [
          "https://www.georgiapower.com/business/products-programs/business-solutions/electric-transportation-business-programs/electric-vehicle-charger-rebate.html#"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22371",
    "opportunityName": "Electric Vehicle Charging Station Rebate Program",
    "state": "HI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22371/electric-vehicle-charging-station-rebate-program",
    "websiteUrl": "https://hawaiienergy.com/for-business/rebates-for-business/electric-vehicle-charging-stations/",
    "applicationUrl": "https://hawaiienergy.com/wp-content/uploads/evcs-program-requirements-application.pdf",
    "administrator": "Hawaii Energy",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "HI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Hawaii Energy service territory"
        ],
        "notes": "Program materials apply to Hawaii sites; payment is contingent on additional state funding."
      },
      "eligibleApplicantTypes": [
        "businesses",
        "commercial_property_owners",
        "nonprofits",
        "government_entities",
        "multifamily_property_owners_operators",
        "homeowner_associations",
        "fleet_operators"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "government",
        "nonprofit",
        "fleet",
        "workplace",
        "public_facility",
        "affordable_housing"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Eligible equipment must be networked Level 2 or networked DC fast charging equipment.",
        "Site must be in Hawaii and must be public, serve multiple tenants, guests, employees, or customers, or serve EV fleets.",
        "Program application and documentation requirements must be met.",
        "Affordable housing bonuses apply only to qualifying Level 2 installations.",
        "Rebate payment depends on availability of additional state funding."
      ],
      "blockers": [
        "Single-family residences and individually owned parking stalls are not the intended eligible sites.",
        "Non-networked chargers and Level 1 chargers are not supported by the checked materials.",
        "Accepted applications may not be paid until additional state funding is received."
      ],
      "programType": "Rebate",
      "administrator": "Hawaii Energy",
      "applicationUrl": "https://hawaiienergy.com/wp-content/uploads/evcs-program-requirements-application.pdf",
      "websiteUrl": "https://hawaiienergy.com/for-business/rebates-for-business/electric-vehicle-charging-stations/",
      "sourceUrlsChecked": [
        "https://hawaiienergy.com/for-business/rebates-for-business/electric-vehicle-charging-stations/",
        "https://hawaiienergy.com/wp-content/uploads/evcs-faq.pdf",
        "https://hawaiienergy.com/wp-content/uploads/evcs-program-requirements-application.pdf",
        "https://hawaiienergy.com/wp-content/uploads/commercial-incentive-application.pdf"
      ],
      "evidenceText": "Hawaii Energy's EV charging station materials list networked Level 2 and DC fast charger rebates for eligible public, multi-user, fleet, commercial, municipal, and multifamily sites.",
      "reasoningNotes": "EV charging matches are correct, but eligibility is non-residential or multi-user and funding is pending. Avoid treating this as a single-family residential EV charger rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_512c40886dc4e427_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 3500000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $35,000 per eligible DC fast charging station",
        "evidenceText": "Hawai'i EV charging incentive materials list DC fast charger incentives up to $35,000.",
        "sourceUrlsChecked": [
          "https://hawaiienergy.com/for-businesses/rebates/electric-vehicle-charging-stations/",
          "https://hawaiienergy.com/for-businesses/rebates/"
        ],
        "reasoningNotes": "Matched DC fast charger term. Returned as a separate candidate.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a4e006519e14c47c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 450000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $4,500 per multifamily or commercial Level 2 multi-port charging station",
        "evidenceText": "Hawai'i Energy EV charging materials list Level 2 multi-port incentives up to $4,500.",
        "sourceUrlsChecked": [
          "https://hawaiienergy.com/for-businesses/rebates/electric-vehicle-charging-stations/",
          "https://hawaiienergy.com/for-businesses/rebates/"
        ],
        "reasoningNotes": "Matched Level 2 EV charging. Confidence is medium because final amount depends on station type and site.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2692",
    "opportunityName": "Heartland REMC - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2692/heartland-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.heartlandremc.com/rebates/",
    "applicationUrl": "https://www.heartlandremc.com/s/2026-Residential-Energy-Efficiency-Program.pdf",
    "administrator": "Heartland REMC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Heartland REMC"
        ],
        "notes": "Installation address must be served by Heartland REMC and have an active account."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "electric_water_heater"
      ],
      "hardRequirements": [
        "Installation address must be served by Heartland REMC.",
        "Applicant must have an active Heartland REMC account.",
        "Application and documentation must be submitted within the required program period and post-purchase window.",
        "Heat pump rebates require qualifying AHRI documentation.",
        "Equipment must satisfy the efficiency and sizing requirements listed on the current rebate form."
      ],
      "blockers": [
        "Do not match generic high-efficiency HVAC unless the measure is an eligible air-source or geothermal heat pump.",
        "Do not match furnaces, boilers, central air conditioners alone, or residential weatherization.",
        "Do not match commercial or industrial measures.",
        "Duplicate Heartland or wholesale power-provider rebates for the same equipment are not eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Heartland REMC",
      "applicationUrl": "https://www.heartlandremc.com/s/2026-Residential-Energy-Efficiency-Program.pdf",
      "websiteUrl": "https://www.heartlandremc.com/rebates/",
      "sourceUrlsChecked": [
        "https://www.heartlandremc.com/rebates/",
        "https://www.heartlandremc.com/s/2026-Residential-Energy-Efficiency-Program.pdf"
      ],
      "evidenceText": "Heartland’s 2026 residential form lists rebates for electric water heaters, geothermal heat pumps, and air-source heat pumps, with active account, Heartland service-address, and AHRI requirements for heat pumps.",
      "reasoningNotes": "The heat pump and geothermal matches are correct, but generic HVAC replacement should be narrowed to the listed heat pump equipment. No envelope, furnace, or commercial categories were verified."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1b1c757a79df4b60_v1",
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
        "cap": {
          "maxAmountCents": 75000
        },
        "confidence": "high",
        "formula": "$150 per ton for geothermal heat pump, capped at $750",
        "evidenceText": "Heartland REMC rebate page lists geothermal at $150/ton, up to $750 maximum.",
        "sourceUrlsChecked": [
          "https://www.heartlandremc.com/rebates"
        ],
        "reasoningNotes": "Matched geothermal term. Use unit_count as eligible geothermal system tons.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9fe23569a76c04da_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 12500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 62500
        },
        "confidence": "high",
        "formula": "$125 per ton for qualifying air-source heat pump, capped at $625",
        "evidenceText": "Heartland REMC rebate page lists air-source heat pump at $125/ton, up to $625 maximum.",
        "sourceUrlsChecked": [
          "https://www.heartlandremc.com/rebates"
        ],
        "reasoningNotes": "Matched heat pump term. Use unit_count as eligible air-source heat-pump tons.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4618",
    "opportunityName": "Indiana Michigan Power - Commercial and Industrial Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4618/indiana-michigan-power-commercial-and-industrial-rebate-program",
    "websiteUrl": "https://electricideas.com/at-work/prescriptive/",
    "applicationUrl": "https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Business-Application_V11.pdf",
    "administrator": "Indiana Michigan Power Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Indiana Michigan Power Indiana electric service territory"
        ],
        "notes": "Available to eligible Indiana commercial and industrial electric customers of Indiana Michigan Power."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "nonresidential_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "high_efficiency_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "variable_frequency_drive",
        "compressed_air_efficiency",
        "heat_pump_water_heater",
        "window_film",
        "low_flow_showerhead",
        "industrial_process_insulation"
      ],
      "hardRequirements": [
        "Applicant must be a current Indiana Michigan Power electric business customer in Indiana.",
        "Opt-out customers are not eligible.",
        "Projects over listed incentive or savings thresholds require preapproval.",
        "Final applications must be submitted within the required post-installation window and by the annual program deadline.",
        "Incentive caps by project, site, and company apply."
      ],
      "blockers": [
        "Residential customers are not eligible under this commercial and industrial opportunity.",
        "Do not infer home appliances, home weatherization, or residential rebates.",
        "Demand-reduction-only, peak shaving, fuel switching, power generation, and renewable energy projects are not eligible prescriptive measures.",
        "Equipment must meet the current measure-selection form requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Indiana Michigan Power Company",
      "applicationUrl": "https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Business-Application_V11.pdf",
      "websiteUrl": "https://electricideas.com/at-work/prescriptive/",
      "sourceUrlsChecked": [
        "https://electricideas.com/at-work/prescriptive/",
        "https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Business-Application_V11.pdf",
        "https://electricideas.com/wp-content/uploads/2026/05/AEPIN26-09_Prescriptive-Lighting-Measure-Selection-Form_V3_DIGITAL.pdf",
        "https://electricideas.com/wp-content/uploads/2026/05/AEPIN26-14_HVAC_Measure-Selection-Form_V6_DIGITAL.pdf",
        "https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Miscellaneous-Measure-Selection-Form_V5.pdf"
      ],
      "evidenceText": "Indiana Michigan Power’s business prescriptive program lists lighting, HVAC, VFDs, refrigeration, cooking, compressed air, and miscellaneous efficiency measures for eligible Indiana business electric customers.",
      "reasoningNotes": "The refrigeration, lighting, and HVAC matches are supported for C&I customers. The repaired category list preserves only current business prescriptive measure families and excludes residential-only measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_380ce84bc4244e06_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$55 per cooler case ECM replacing PSC or shaded-pole motor",
        "evidenceText": "2026 I&M application lists Cooler Case ECM replacing PSC or SP at $55 per unit.",
        "sourceUrlsChecked": [
          "https://efficiencyunited.com/_/documents/2026/1125_EUMCAAA_CM_6134231_Electric_Application_ComReb_APP_JAN26_FILL_RE_2-18-26.pdf"
        ],
        "reasoningNotes": "Returned separately because cooler-case ECM has a different refrigeration value.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_94ab16b86c31d5e6_v1",
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
        "confidence": "high",
        "formula": "$150 per horsepower for cold storage evaporator ECM fan motor",
        "evidenceText": "2026 I&M application lists Cold Storage Evaporator ECM Fan Motor Commercial at $150 per HP.",
        "sourceUrlsChecked": [
          "https://efficiencyunited.com/_/documents/2026/1125_EUMCAAA_CM_6134231_Electric_Application_ComReb_APP_JAN26_FILL_RE_2-18-26.pdf"
        ],
        "reasoningNotes": "Use unit_count as eligible motor horsepower for this refrigeration candidate.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a125c4e4a76b25cc_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 12000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$120 per walk-in ECM replacing shaded-pole motor",
        "evidenceText": "2026 I&M application lists Walk-In ECM replacing shaded pole at $120 per unit.",
        "sourceUrlsChecked": [
          "https://efficiencyunited.com/_/documents/2026/1125_EUMCAAA_CM_6134231_Electric_Application_ComReb_APP_JAN26_FILL_RE_2-18-26.pdf"
        ],
        "reasoningNotes": "Matched refrigeration measures. Use one unit as one qualifying walk-in ECM motor retrofit.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4615",
    "opportunityName": "Indiana Michigan Power - Energy Savings Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4615/indiana-michigan-power-energy-savings-rebate-program",
    "websiteUrl": "https://electricideas.com/at-home/",
    "applicationUrl": null,
    "administrator": "Indiana Michigan Power Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Indiana Michigan Power Indiana residential electric service territory"
        ],
        "notes": "Applies to eligible Indiana residential electric customers; some offers are limited to electric-only or income-qualified customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "income_qualified_residential_customer",
        "electric_only_residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "air_source_heat_pump",
        "cold_climate_heat_pump",
        "ductless_heat_pump",
        "high_efficiency_air_conditioning",
        "heat_pump_water_heater",
        "dehumidifier",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "led_lighting_retrofit",
        "low_flow_aerator",
        "advanced_power_strip",
        "door_sweep_weatherstripping",
        "spray_foam_caulk"
      ],
      "hardRequirements": [
        "Customer must be in Indiana Michigan Power's Indiana residential service area.",
        "Some post-purchase rebates apply only to electric-only residential customers.",
        "Instant discounts require qualifying equipment and participating channels or contractors.",
        "Income-qualified home weatherproofing requires income eligibility and residential-account requirements.",
        "Home weatherproofing measures may require a home energy checkup or program-installed measures."
      ],
      "blockers": [
        "Do not match window replacement; window air conditioner and window-related text are energy tips, not a verified window replacement rebate.",
        "Power Rewards demand response is a separate bill-credit program.",
        "EV and solar offers are separate from the home energy products and weatherproofing offers.",
        "Do not match commercial kitchen, refrigeration, motors, VFDs, or industrial measures.",
        "Do not infer generic HVAC beyond the listed heat pump, air conditioning, thermostat, and water-heating offers."
      ],
      "programType": "Rebate Program",
      "administrator": "Indiana Michigan Power Company",
      "applicationUrl": null,
      "websiteUrl": "https://electricideas.com/at-home/",
      "sourceUrlsChecked": [
        "https://electricideas.com/at-home/",
        "https://electricideas.com/at-home/in-store-products/",
        "https://electricideas.com/at-home/instant-discounts/",
        "https://electricideas.com/at-home/home-energy-checkup/",
        "https://improducts.customerapplication.com/"
      ],
      "evidenceText": "I&M’s residential pages list smart thermostats, dehumidifiers, HVAC and heat pump water-heating instant discounts, and income-qualified weatherproofing with insulation, LEDs, aerators, and air-sealing products.",
      "reasoningNotes": "The thermostat match is supported. The window replacement match is a false positive caused by window air-conditioner or window-tip language, so it is blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_afad367affc55b15_v1",
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
        "formula": "$50 per qualifying smart thermostat",
        "evidenceText": "I&M/DSIRE rebate summary lists residential smart thermostat rebates from $50 to $75.",
        "sourceUrlsChecked": [
          "https://electricideas.com/at-home/smart-thermostat/",
          "https://programs.dsireusa.org/system/program/detail/4615"
        ],
        "reasoningNotes": "Matched smart thermostat terms. Use the lower clear tier because final amount depends on product and program path.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2115",
    "opportunityName": "South Central Indiana REMC - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2115/south-central-indiana-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.sciremc.com/save-energy-money/rebates-credits/",
    "applicationUrl": "https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Rebate_Application.pdf",
    "administrator": "South Central Indiana Rural Electric Membership Corporation",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "geothermal heat pump",
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "South Central Indiana REMC"
        ],
        "notes": "Limited to single-family homes served by South Central Indiana REMC."
      },
      "eligibleApplicantTypes": [
        "residential_member_consumers",
        "single_family_home_occupants"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a current residential SCI REMC member-consumer in a single-family home.",
        "Home must be served by SCI REMC and occupied year-round.",
        "HVAC equipment must be new, qualifying, and documented with AHRI certification where required.",
        "Application and invoice must be submitted within 90 days of installation and in the same calendar year.",
        "Rebates are limited by program caps, annual limits, and available funds."
      ],
      "blockers": [
        "Do not match generic high_efficiency_hvac_replacement; only listed heat pump technologies are supported.",
        "Furnaces, boilers, central air conditioning alone, LED lighting, and commercial measures are not part of this residential HVAC rebate.",
        "Nonmembers, seasonal homes, and projects missing required documentation are not eligible."
      ],
      "programType": "Rebate",
      "administrator": "South Central Indiana Rural Electric Membership Corporation",
      "applicationUrl": "https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Rebate_Application.pdf",
      "websiteUrl": "https://www.sciremc.com/save-energy-money/rebates-credits/",
      "sourceUrlsChecked": [
        "https://www.sciremc.com/save-energy-money/rebates-credits/",
        "https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Rebate_Application.pdf",
        "https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Terms_Conditions.pdf"
      ],
      "evidenceText": "SCI REMC's 2026 residential rebate materials list air-source, dual-fuel, ductless mini-split, and geothermal heat pumps with member, home, AHRI, and timing requirements.",
      "reasoningNotes": "The supplied heat pump and geothermal matches are valid when narrowed to specific heat-pump measures. The broader HVAC replacement category is too broad."
    },
    "existingSimpleRules": [
      {
        "id": "oir_69d53c725114e7fb_v1",
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
        "confidence": "high",
        "formula": "$2,000 per new geothermal heat pump system",
        "evidenceText": "SCI REMC geothermal rebate page says new geothermal heat pump systems receive a $2,000 rebate.",
        "sourceUrlsChecked": [
          "https://www.sciremc.com/save-energy-money/rebates-credits/geothermal/",
          "https://www.sciremc.com/save-energy-money/rebates-credits/"
        ],
        "reasoningNotes": "Matched geothermal term. Use one unit as one qualifying geothermal system.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_8c74325473b78b6a_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 5000
        },
        "confidence": "high",
        "formula": "50% of HVAC tune-up cost, capped at $50",
        "evidenceText": "SCI REMC HVAC tune-up page lists 50% off tune-up cost, up to $50.",
        "sourceUrlsChecked": [
          "https://www.sciremc.com/save-energy-money/rebates-credits/hvac-tune-up/"
        ],
        "reasoningNotes": "Matched heat pump/air-conditioning maintenance; use only for qualifying tune-up service.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3264",
    "opportunityName": "Farmers RECC - Heat Pump Retrofit Rebate Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3264/farmers-recc-heat-pump-retrofit-rebate-program",
    "websiteUrl": "https://www.farmersrecc.com/heat-pump-retrofit-program",
    "applicationUrl": null,
    "administrator": "Farmers RECC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "KY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Farmers RECC"
        ],
        "notes": "Eligible property must be served by Farmers RECC in Kentucky."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "member_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential",
        "manufactured_home"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "air_source_heat_pump_hvac_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Farmers RECC member.",
        "Home must be an electrically heated residential home.",
        "Existing home must generally be at least two years old unless qualifying as a new manufactured home.",
        "Existing heat source must be electric furnace, electric baseboard, electric thermal storage, or ceiling cable heat.",
        "Replacement system must be a qualifying high-efficiency heat pump meeting current SEER2 and HSPF2 or equivalent program thresholds.",
        "Applicant should contact Farmers RECC or submit required rebate documentation."
      ],
      "blockers": [
        "High-efficiency furnace retrofits are not eligible; the program replaces electric resistance heat with a heat pump.",
        "Generic HVAC replacement should not match unless it is the qualifying heat pump retrofit.",
        "Gas, oil, or propane heat-source replacements are unsupported under the checked heat pump retrofit criteria.",
        "Insulation, water heaters, geothermal, and other Farmers RECC programs are separate and should not be included in this record.",
        "Commercial properties are not eligible for this residential heat pump retrofit program."
      ],
      "programType": "Rebate Program",
      "administrator": "Farmers RECC",
      "applicationUrl": null,
      "websiteUrl": "https://www.farmersrecc.com/heat-pump-retrofit-program",
      "sourceUrlsChecked": [
        "https://www.farmersrecc.com/heat-pump-retrofit-program",
        "https://www.farmersrecc.com/energy-efficiency",
        "https://togetherwesaveky.com/cooperatives/farmers-recc/"
      ],
      "evidenceText": "Farmers RECC’s heat pump retrofit page limits the rebate to residential electrically heated homes replacing electric furnace, baseboard, electric thermal storage, or ceiling cable heat with a qualifying high-efficiency heat pump.",
      "reasoningNotes": "Removed furnace retrofit and generic HVAC matches. Kept only qualifying heat pump retrofit categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0da6a9cfe0ecf5b6_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 75000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $750 for replacing electric resistance heat with a high-efficiency heat pump",
        "evidenceText": "Farmers RECC heat pump retrofit page says eligible members can receive an incentive up to $750.",
        "sourceUrlsChecked": [
          "https://www.farmersrecc.com/heat-pump-retrofit-program"
        ],
        "reasoningNotes": "Matched heat pump and furnace replacement terms. Medium because source says up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22317",
    "opportunityName": "Entergy (Louisiana and Gulf States) - eTech Program",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22317/entergy-louisiana-and-gulf-states-etech-program",
    "websiteUrl": "https://entergyetech.com/electric-vehicles/",
    "applicationUrl": null,
    "administrator": "Entergy Louisiana",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "dc fast"
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
          "LA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Entergy Louisiana",
          "Entergy Gulf States Louisiana"
        ],
        "notes": "Applies to eligible Entergy customers in Louisiana outside separate Entergy New Orleans incentive treatment."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "commercial_electric_customers",
        "industrial_electric_customers",
        "fleet_operators"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "fleet",
        "workplace"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Entergy customer.",
        "Level 2 charger must be ENERGY STAR certified.",
        "DC fast charger rebates depend on charger power rating below or above 50 kW.",
        "Customer must apply through the Entergy eTech rebate process and provide required documentation."
      ],
      "blockers": [
        "Entergy New Orleans incentives are separate and should not be mixed into this Louisiana and Gulf States record.",
        "Level 1 chargers and non-installed portable charging equipment are not supported.",
        "Sites outside the applicable Entergy Louisiana territory do not qualify."
      ],
      "programType": "Rebate",
      "administrator": "Entergy Louisiana",
      "applicationUrl": null,
      "websiteUrl": "https://entergyetech.com/electric-vehicles/",
      "sourceUrlsChecked": [
        "https://entergyetech.com/electric-vehicles/",
        "https://entergyetech.com/"
      ],
      "evidenceText": "Entergy eTech lists rebates for ENERGY STAR Level 2 charging ports and DC fast chargers, with DC incentives varying by charger power rating.",
      "reasoningNotes": "Original EV charging matches are supported but should be narrowed to Level 2 and DC fast charging. Keep geography limited to Entergy Louisiana and Gulf States service."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e613a317fc9869d7_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1250000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$12,500 per eligible unit",
        "evidenceText": "Entergy New Orleans commercial customers Equipment type Location requirement Incentive ENERGY STAR® certified Level 2 charger *† Public, fleet and multi-unit dwellings $1,000/port Public, fleet and multi-unit dwellings located in disadvantaged community $2,500/port DC fast charger † Public and fleet $2,500/port, 20-50 kW $5,000/port, 51-149 kW $12,500/port, 150+ kW Private network $2,500/port *2-port minimum",
        "sourceUrlsChecked": [
          "https://entergyetech.com/electric-vehicles/"
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
  }
]
