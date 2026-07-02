You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 21
Targets in this prompt: 401-420 of 984
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
  "batchNumber": 21,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22333"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22812",
    "opportunityName": "Cobb Electric Membership Corporation - Residential EV Charger Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22812/cobb-electric-membership-corporation-residential-ev-charger-program",
    "websiteUrl": "https://www.cobbemc.com/ev-charger-incentive",
    "applicationUrl": "https://www.cobbemc.com/ev-charger-incentive",
    "administrator": "Cobb EMC",
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cobb EMC"
        ],
        "notes": "Applies to eligible Cobb EMC residential members in single-family homes."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "single_family_homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_level_2_ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Cobb EMC residential member.",
        "Applicant must own a single-family home.",
        "Applicant must install an ENERGY STAR certified smart Level 2 EV charger.",
        "Applicant must enroll in the Cobb EMC Energy Network.",
        "Charger must be purchased and installed during the eligible calendar year.",
        "Receipts and installation documentation are required."
      ],
      "blockers": [
        "Apartments and condos are not eligible for the residential incentive.",
        "Level 1 chargers and DC fast chargers are not eligible home charger matches.",
        "Customers who already received the Energy Network EV charging incentive may be ineligible for another incentive.",
        "General electrical upgrades unrelated to the approved smart Level 2 charger should not be matched."
      ],
      "programType": "Rebate",
      "administrator": "Cobb EMC",
      "applicationUrl": "https://www.cobbemc.com/ev-charger-incentive",
      "websiteUrl": "https://www.cobbemc.com/ev-charger-incentive",
      "sourceUrlsChecked": [
        "https://www.cobbemc.com/ev-charger-incentive",
        "https://www.cobbemc.com/charging-your-ev",
        "https://www.cobbemc.com/electric-vehicles",
        "https://qmerit.com/utility/cobb-emc-sponsored/"
      ],
      "evidenceText": "Cobb EMC offers a residential incentive for single-family homeowners installing an ENERGY STAR certified smart Level 2 charger and enrolling in Energy Network.",
      "reasoningNotes": "The EV charging match is correct, but should be narrowed to smart, ENERGY STAR certified Level 2 residential chargers with Energy Network enrollment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e6e936bbfb3ecbe2_v1",
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
        "confidence": "high",
        "formula": "$250 per ENERGY STAR certified residential Level 2 EV charger",
        "evidenceText": "Cobb EMC says customers get $250 when installing an ENERGY STAR certified Level 2 EV charger at home.",
        "sourceUrlsChecked": [
          "https://www.cobbemc.com/ev-charger-incentive",
          "https://www.cobbemc.com/charging-your-ev"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Requires enrollment in Cobb EMC's Energy Network.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22308",
    "opportunityName": "Georgia Power - Residential Electric Vehicle Charger Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22308/georgia-power-residential-electric-vehicle-charger-program",
    "websiteUrl": "https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html",
    "applicationUrl": "https://etrebate.customerapplication.com/",
    "administrator": "Georgia Power",
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Georgia Power"
        ],
        "notes": "Limited to Georgia Power residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "utility_customer",
        "homeowner",
        "tenant_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Georgia Power residential customer.",
        "Charger must be a wall-mounted or pedestal Level 2 charger, not a mobile connector.",
        "Installation must use a dedicated 208 or 240 volt circuit.",
        "Eligible property must be a single-family home or townhouse.",
        "Tenant applicants need property-owner authorization.",
        "Rebate is subject to program dates, funding availability, and application terms."
      ],
      "blockers": [
        "Do not match generic EV charging if the charger is not Level 2.",
        "Do not match mobile charging cords or connector-only equipment.",
        "Third-party vendors and EV charging businesses are not eligible applicants.",
        "Do not match commercial or multifamily common-area charging to this residential program."
      ],
      "programType": "Rebate",
      "administrator": "Georgia Power",
      "applicationUrl": "https://etrebate.customerapplication.com/",
      "websiteUrl": "https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html",
      "sourceUrlsChecked": [
        "https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html",
        "https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ev/terms-conditions-georgia-power-residential-ev-charger-rebate.pdf"
      ],
      "evidenceText": "Georgia Power states that residential customers can receive a rebate for purchasing and installing a qualifying Level 2 charger at a single-family home or townhouse.",
      "reasoningNotes": "The broad EV charger category should be narrowed to Level 2 residential charger installation only."
    },
    "existingSimpleRules": [
      {
        "id": "oir_88b03c234e43ea96_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 30000,
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
        "formula": "Up to $300 per residential Level 2 charger purchase and installation",
        "evidenceText": "Georgia Power EV rebate page states customers can earn up to $300 for installing a Level 2 charger.",
        "sourceUrlsChecked": [
          "https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html"
        ],
        "reasoningNotes": "Matched Level 2 residential EV charger terms. Medium because Georgia Power has another page showing a lower $150 charging offer.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22620",
    "opportunityName": "Jackson EMC - Residential EV Charger Rebate",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22620/jackson-emc-residential-ev-charger-rebate",
    "websiteUrl": "https://www.jacksonemc.com/member-services/ev-and-renewable-energy/electric-vehicles",
    "applicationUrl": "https://www.jacksonemc.com/assets/uploads/pdfs/Electric-Vehicle-Rebate-Application-2024-ENGLISH.pdf",
    "administrator": "Jackson EMC",
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Jackson EMC service territory"
        ],
        "notes": "Residential member rebate in Jackson EMC service territory."
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
        "Applicant must be a Jackson EMC residential member.",
        "Rebate is for a new Level 2 EV charger.",
        "Applicant must provide proof of charger purchase and vehicle registration or bill of sale.",
        "Program limits the number of chargers per home and is subject to funding and current terms."
      ],
      "blockers": [
        "Commercial customers are not eligible under this residential rebate.",
        "DC fast chargers are not supported.",
        "Adapters and installation costs are excluded by the application terms.",
        "Do not match generic EV charging work that is not a new Level 2 residential charger purchase."
      ],
      "programType": "Rebate Program",
      "administrator": "Jackson EMC",
      "applicationUrl": "https://www.jacksonemc.com/assets/uploads/pdfs/Electric-Vehicle-Rebate-Application-2024-ENGLISH.pdf",
      "websiteUrl": "https://www.jacksonemc.com/member-services/ev-and-renewable-energy/electric-vehicles",
      "sourceUrlsChecked": [
        "https://www.jacksonemc.com/member-services/ev-and-renewable-energy/electric-vehicles",
        "https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans",
        "https://www.jacksonemc.com/assets/uploads/pdfs/Electric-Vehicle-Rebate-Application-2024-ENGLISH.pdf"
      ],
      "evidenceText": "Jackson]( EMC lists a residential Level 2 EV charger rebate; the official application requires charger purchase proof plus vehicle registration or bill of sale.",
      "reasoningNotes": "The Level 2 EV charger match is supported, but the program is a residential charger-purchase rebate and should not include installation labor, DCFC, or commercial charging."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5424cf99a0b55c0a_v1",
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
        "confidence": "high",
        "formula": "$250 per residential Level 2 EV charger",
        "evidenceText": "Jackson EMC rebates page says residential members can save on Level 2 EV chargers with a $250 rebate.",
        "sourceUrlsChecked": [
          "https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans",
          "https://www.jacksonemc.com/member-services/ev-and-renewable-energy/electric-vehicles"
        ],
        "reasoningNotes": "Matched Level 2 EV charger term. Use one unit as one qualifying home charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3148",
    "opportunityName": "Citizens Gas - Commercial Efficiency Rebates",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3148/citizens-gas-commercial-efficiency-rebates",
    "websiteUrl": "https://info.citizensenergygroup.com/conservation/energy/rebates/westfield",
    "applicationUrl": null,
    "administrator": "Citizens Energy Group",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [],
        "cities": [
          "Westfield"
        ],
        "utilityTerritories": [
          "Citizens Westfield natural gas service territory"
        ],
        "notes": "Current official commercial efficiency rebates appear under Citizens Westfield and are not available to Marion County customers."
      },
      "eligibleApplicantTypes": [
        "commercial_natural_gas_customers"
      ],
      "eligibleSectors": [
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_natural_gas_furnace_retrofit",
        "programmable_thermostat_retrofit",
        "wifi_thermostat_retrofit",
        "natural_gas_tankless_water_heater",
        "natural_gas_storage_water_heater",
        "furnace_tune_up"
      ],
      "hardRequirements": [
        "Customer must be an eligible Citizens Westfield natural gas customer.",
        "Commercial furnace rebates require qualifying AFUE levels.",
        "Commercial thermostat rebates require eligible Wi-Fi or programmable thermostat equipment.",
        "Eligible water heater measures must meet program requirements.",
        "Proof of eligible product installation is required."
      ],
      "blockers": [
        "The Westfield efficiency rebate program is not available to Marion County customers.",
        "Electric HVAC, heat pumps, and dual-fuel systems are not supported by the gas furnace rebate.",
        "Indianapolis conversion rebates are a separate offering and should not be merged into this commercial efficiency record.",
        "Residential-only measures should not be matched to the commercial program."
      ],
      "programType": "Rebate",
      "administrator": "Citizens Energy Group",
      "applicationUrl": null,
      "websiteUrl": "https://info.citizensenergygroup.com/conservation/energy/rebates/westfield",
      "sourceUrlsChecked": [
        "https://www.citizensenergygroup.com/My-Home/Conserve-Save/Rebates",
        "https://info.citizensenergygroup.com/conservation/energy/rebates",
        "https://info.citizensenergygroup.com/conservation/energy/rebates/westfield",
        "https://info.citizensenergygroup.com/conservation/energy/rebates/indianapolis"
      ],
      "evidenceText": "Citizens Westfield lists commercial rebates for qualifying natural gas furnaces, thermostats, water heaters, and furnace tune-ups.",
      "reasoningNotes": "The furnace and thermostat matches are valid for the current Westfield commercial gas rebate, but geography and gas-service restrictions are important."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2545b0728b161c0e_v1",
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
        "confidence": "high",
        "formula": "$50 per commercial programmable thermostat",
        "evidenceText": "Citizens commercial rebate page lists programmable thermostat rebate at $50.",
        "sourceUrlsChecked": [
          "https://info.citizensenergygroup.com/conservation/energy/rebates",
          "https://info.citizensenergygroup.com/conservation/energy/rebates/westfield"
        ],
        "reasoningNotes": "Matched programmable thermostat term. Use one unit as one qualifying thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2674",
    "opportunityName": "Harrison County REMC - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2674/harrison-county-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.harrisonremc.com/hvac-heat-pump-rebate-form/",
    "applicationUrl": "https://www.harrisonremc.com/hvac-heat-pump-rebate-form/",
    "administrator": "Harrison REMC",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "Harrison REMC"
        ],
        "notes": "Limited to Harrison REMC residential members."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "utility_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "air_source_heat_pump_replacement",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "dual_fuel_heat_pump_system"
      ],
      "hardRequirements": [
        "Applicant must be a Harrison REMC residential customer.",
        "Installed equipment must be an eligible heat pump, dual-fuel system, or geothermal heat pump.",
        "Required rebate form documentation must be submitted.",
        "Program terms and qualifying equipment requirements must be met."
      ],
      "blockers": [
        "Do not match furnace-only, boiler-only, or central air conditioning-only replacements.",
        "Do not match broad high-efficiency HVAC unless the installed system is a qualifying heat pump or dual-fuel heat pump system.",
        "Do not match commercial or industrial HVAC projects."
      ],
      "programType": "Rebate",
      "administrator": "Harrison REMC",
      "applicationUrl": "https://www.harrisonremc.com/hvac-heat-pump-rebate-form/",
      "websiteUrl": "https://www.harrisonremc.com/hvac-heat-pump-rebate-form/",
      "sourceUrlsChecked": [
        "https://www.harrisonremc.com/hvac-heat-pump-rebate-form/",
        "https://www.harrisonremc.com/?s=rebates"
      ],
      "evidenceText": "Harrison REMC identifies residential rebates for heat pumps, dual fuel systems, and geothermal heat pump units.",
      "reasoningNotes": "The heat pump retrofit match is correct. The generic high-efficiency HVAC category should be narrowed to qualifying heat pump systems."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0f2fb4feb1ced816_v1",
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
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$500 per multi-zone mini-split heat pump",
        "evidenceText": "Harrison REMC 2026 HVAC application lists multi-zone mini-split heat pump at $500.",
        "sourceUrlsChecked": [
          "https://www.harrisonremc.com/hvac-heat-pump-rebate-form/",
          "https://www.harrisonremc.com/wp-content/uploads/2025/12/2026_Residential_HVAC_Rebate_Application.pdf"
        ],
        "reasoningNotes": "Matched mini-split heat pump term. Use one unit as one qualifying mini-split system.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9e654b052885f15e_v1",
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
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$2,000 per geothermal heat pump",
        "evidenceText": "Harrison REMC 2026 HVAC application lists geothermal heat pump incentive at $2,000.",
        "sourceUrlsChecked": [
          "https://www.harrisonremc.com/hvac-heat-pump-rebate-form/",
          "https://www.harrisonremc.com/wp-content/uploads/2025/12/2026_Residential_HVAC_Rebate_Application.pdf"
        ],
        "reasoningNotes": "Matched geothermal heat pump term. Use one unit as one qualifying geothermal system.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a43146cf956270b1_v1",
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
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$500 per Tier 3 air-source or dual-fuel heat pump",
        "evidenceText": "Harrison REMC 2026 HVAC application lists Tier 3 air-source and dual-fuel heat pump at $500.",
        "sourceUrlsChecked": [
          "https://www.harrisonremc.com/hvac-heat-pump-rebate-form/",
          "https://www.harrisonremc.com/wp-content/uploads/2025/12/2026_Residential_HVAC_Rebate_Application.pdf"
        ],
        "reasoningNotes": "Matched heat pump term. Returned the highest air-source heat pump tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22312",
    "opportunityName": "Indiana Michigan Power - Charge Point Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22312/indiana-michigan-power-charge-point-program",
    "websiteUrl": "https://www.indianamichiganpower.com/clean-energy/electric-cars/business/charge-at-work-indiana",
    "applicationUrl": "https://imev.powerclerk.com/",
    "administrator": "Indiana Michigan Power",
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Indiana Michigan Power Indiana service territory"
        ],
        "notes": "Indiana commercial EV charging program for eligible I&M business customers and qualifying charging uses."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customers",
        "industrial_electric_customers",
        "multifamily_property_owners",
        "fleet_operators"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "fleet",
        "public_charging"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "workplace_ev_charging",
        "fleet_ev_charging",
        "multifamily_ev_charging"
      ],
      "hardRequirements": [
        "Applicant must be in Indiana Michigan Power’s Indiana service territory.",
        "Commercial charging incentives are per port and vary by charging use and qualifying area.",
        "Eligible EV charging rates generally require standalone metering or service for the charging load.",
        "Certain public DC fast charging incentives are limited to qualifying areas."
      ],
      "blockers": [
        "This Indiana Charge at Work program is not a residential charger rebate.",
        "Tariff options can be incompatible with distributed generation or net metering where the tariff states so.",
        "Do not match charging sites that do not meet standalone metering, port-count, use-case, or qualifying-area requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Indiana Michigan Power",
      "applicationUrl": "https://imev.powerclerk.com/",
      "websiteUrl": "https://www.indianamichiganpower.com/clean-energy/electric-cars/business/charge-at-work-indiana",
      "sourceUrlsChecked": [
        "https://www.indianamichiganpower.com/clean-energy/electric-cars/business/charge-at-work-indiana",
        "https://imev.powerclerk.com/"
      ],
      "evidenceText": "I&M’s]( Indiana Charge at Work page lists commercial Level 2 incentives and higher public DC fast-charging incentives, with standalone-meter EV rate requirements.",
      "reasoningNotes": "The Level 2 match is supported. The broader EV charger category should be narrowed by state, customer class, charging use, and metering requirements; DCFC is supported only where the official Indiana page allows it."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1a43e00a837f5050_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 810000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$8,100 per eligible unit",
        "evidenceText": "Public DCFC in qualifying areas (Justice 40 or IRS’s 30 C tax credit) may be eligible for a one-time rebate of $8,100 per port",
        "sourceUrlsChecked": [
          "https://www.indianamichiganpower.com/clean-energy/electric-cars/business/charge-at-work-indiana"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3262",
    "opportunityName": "Taylor County RECC - Residential Energy Efficiency Rebate Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3262/taylor-county-recc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://tcrecc.com/air-air-heat-pump",
    "applicationUrl": null,
    "administrator": "Taylor County RECC",
    "programType": "Residential Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
        "counties": [
          "Adair",
          "Casey",
          "Cumberland",
          "Green",
          "Hart",
          "Marion",
          "Metcalfe",
          "Russell",
          "Taylor"
        ],
        "cities": [],
        "utilityTerritories": [
          "Taylor County RECC"
        ],
        "notes": "Limited to Taylor County RECC members in the cooperative service area."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_members",
        "residential_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "cold_climate_heat_pump_retrofit",
        "heat_pump_water_heater_retrofit",
        "insulation_air_sealing_weatherization"
      ],
      "hardRequirements": [
        "All listed residential rebates require electrically heated homes.",
        "Air-to-air heat pump replacement applies to eligible existing electric resistance heat sources and qualifying heat pump ratings.",
        "Existing homes generally must be at least two years old unless specific manufactured-home rules apply.",
        "Button-Up weatherization requires pre- and post-work home energy review where applicable."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement; eligible HVAC support is specifically heat pump replacement or heat pump upgrades.",
        "Do not match gas, propane, or oil heating replacements under this residential electric program.",
        "Commercial LED lighting is a separate business offering and should not be attached to this residential heat pump rebate."
      ],
      "programType": "Residential Energy Efficiency Rebate",
      "administrator": "Taylor County RECC",
      "applicationUrl": null,
      "websiteUrl": "https://tcrecc.com/air-air-heat-pump",
      "sourceUrlsChecked": [
        "https://tcrecc.com/air-air-heat-pump",
        "https://togetherwesaveky.com/cooperatives/taylor-county-recc/"
      ],
      "evidenceText": "Taylor]( County RECC and Together We Save Kentucky describe residential rebates for heat pumps, heat pump water heaters, and Button-Up weatherization for electrically heated homes.",
      "reasoningNotes": "The heat pump match is correct. Broader HVAC replacement should be narrowed to qualifying residential heat pump measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_096104fa4dd2615f_v1",
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
        "confidence": "high",
        "formula": "Up to $750 for replacing electric resistance heat with a high-efficiency air-to-air heat pump",
        "evidenceText": "Taylor County RECC air-to-air heat pump page says members may receive up to a $750 incentive.",
        "sourceUrlsChecked": [
          "https://tcrecc.com/air-air-heat-pump"
        ],
        "reasoningNotes": "Matched heat pump term. Applies to eligible electrically-heated residential replacements.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22623",
    "opportunityName": "Cleco Power - Residential EV Rebate",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22623/cleco-power-residential-ev-rebate",
    "websiteUrl": "https://www.cleco.com/electrification/residential-evs",
    "applicationUrl": "https://sightlinedsm.my.site.com/cleco/s/residential",
    "administrator": "Cleco Power",
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
          "LA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cleco Power"
        ],
        "notes": "Applies to residential Cleco customers at locations served by Cleco."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a residential Cleco customer.",
        "Charger must be a Level 2 EV charger installed at a residential location served by Cleco.",
        "Installation should use a qualified electrician where required by program terms.",
        "Application must be submitted within the allowed post-installation period.",
        "Invoice, manufacturer and model information, and photo of installed equipment may be required."
      ],
      "blockers": [
        "Level 1 chargers are not eligible.",
        "Commercial EV charging is handled under separate Cleco electrification offerings.",
        "Locations outside Cleco service territory are not eligible.",
        "The residential rebate should not be matched to electric forklifts or other commercial electrification equipment."
      ],
      "programType": "Rebate",
      "administrator": "Cleco Power",
      "applicationUrl": "https://sightlinedsm.my.site.com/cleco/s/residential",
      "websiteUrl": "https://www.cleco.com/electrification/residential-evs",
      "sourceUrlsChecked": [
        "https://www.cleco.com/residential-commercial/energy-efficiency-renewables",
        "https://www.cleco.com/electrification/residential-evs",
        "https://clecomarketplace.com/level-2-ev-charger-rebate/",
        "https://sightlinedsm.my.site.com/cleco/s/residential",
        "https://www.cleco.com/electrification/commercial-evs"
      ],
      "evidenceText": "Cleco residential EV sources support a rebate for Level 2 chargers installed by eligible residential customers at Cleco-served locations.",
      "reasoningNotes": "The Level 2 EV charger match is correct. Commercial EV and forklift incentives are separate and should not be merged into this residential record."
    },
    "existingSimpleRules": [
      {
        "id": "oir_db276b7d5ba7225f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 25000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$250 per residential Level 2 EV charger, approximately 50% of equipment cost",
        "evidenceText": "Cleco says residential customers can receive a $250 Level 2 EV charger incentive.",
        "sourceUrlsChecked": [
          "https://www.cleco.com/residential-commercial/energy-efficiency-renewables/residential-evs",
          "https://clecomarketplace.com/level-2-ev-charger-rebate/"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Use one unit as one eligible charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22324",
    "opportunityName": "Braintree Electric Light Department - Bring Your Own Charger Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22324/braintree-electric-light-department-bring-your-own-charger-program",
    "websiteUrl": "https://braintree-ev.ene.org/ev-charging-guide/",
    "applicationUrl": null,
    "administrator": "Braintree Electric Light Department",
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
          "charging station",
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
          "MA"
        ],
        "counties": [],
        "cities": [
          "Braintree"
        ],
        "utilityTerritories": [
          "Braintree Electric Light Department"
        ],
        "notes": "Applies to BELD residential customers participating in the BELD Charge and Save program."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_240v_circuit_or_outlet_installation"
      ],
      "hardRequirements": [
        "Applicant must be a BELD customer.",
        "Applicant must enroll in BELD Charge and Save before receiving the rebate.",
        "Eligible costs may include Level 2 charging station, 240-volt circuit, 50-amp breaker, NEMA 14-50 outlet, and licensed electrician services.",
        "Documented expenditures are required.",
        "Self-installation labor is not eligible."
      ],
      "blockers": [
        "Rebate is for home Level 2 charging equipment and related circuit or outlet work, not general electrical upgrades.",
        "Level 1 charging equipment alone is not eligible.",
        "Commercial or public EV charging should not be matched to this residential program.",
        "Additional or replacement charger rebates are limited by program timing rules."
      ],
      "programType": "Rebate",
      "administrator": "Braintree Electric Light Department",
      "applicationUrl": null,
      "websiteUrl": "https://braintree-ev.ene.org/ev-charging-guide/",
      "sourceUrlsChecked": [
        "https://www.beld.com/evcenter/",
        "https://braintree-ev.ene.org/ev-charging-guide/"
      ],
      "evidenceText": "BELD offers a bill credit and a rebate to offset Level 2 home charging equipment and installation costs after Charge and Save enrollment.",
      "reasoningNotes": "The EV charging match is correct and should include eligible supporting 240-volt circuit or outlet work, but not broader electrical retrofits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c858b51e6bd0f5ee_v1",
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
        "confidence": "high",
        "formula": "$250 per eligible Level 2 home EV charger",
        "evidenceText": "BELD EV page states customers can receive a $250 rebate for qualified Level 2 home chargers.",
        "sourceUrlsChecked": [
          "https://beld.com/bring-your-own-charger/",
          "https://beld.com/electric-vehicles/"
        ],
        "reasoningNotes": "Matched EVSE and Level 2 terms. Use one unit as one qualifying charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22188",
    "opportunityName": "MassEVIP Multi-Unit Dwelling (MUD) and Educational Campus Charging Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22188/massevip-multi-unit-dwelling-mud-and-educational-campus-charging-program",
    "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-multi-unit-dwelling-educational-campus-charging-incentives",
    "applicationUrl": "https://www.mass.gov/forms/massevip-multi-unit-dwelling-and-educational-campus-mudc-charging-program-application",
    "administrator": "Massachusetts Department of Environmental Protection",
    "programType": "Grant Program",
    "availabilityStatus": "rolling",
    "sourceConfidence": "medium",
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
          "electric vehicle charging",
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
      "confidence": "medium",
      "availabilityStatus": "rolling",
      "geography": {
        "country": "US",
        "states": [
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Massachusetts sites only; applies to eligible multi-unit dwellings and educational campuses."
      },
      "eligibleApplicantTypes": [
        "multifamily_property_owner",
        "condominium_association",
        "educational_institution",
        "property_manager"
      ],
      "eligibleSectors": [
        "multifamily",
        "education",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Site must be an eligible multi-unit dwelling or educational campus.",
        "Charging equipment must meet MassEVIP program requirements.",
        "Application and supporting documentation are required before or as required by program rules."
      ],
      "blockers": [
        "Do not match single-family residential home chargers.",
        "Do not match DC fast charging.",
        "Do not match generic EV charging outside the multi-unit dwelling or educational campus program scope."
      ],
      "programType": "Grant Program",
      "administrator": "Massachusetts Department of Environmental Protection",
      "applicationUrl": "https://www.mass.gov/forms/massevip-multi-unit-dwelling-and-educational-campus-mudc-charging-program-application",
      "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-multi-unit-dwelling-educational-campus-charging-incentives",
      "sourceUrlsChecked": [
        "https://www.mass.gov/how-to/apply-for-massevip-multi-unit-dwelling-educational-campus-charging-incentives",
        "https://www.mass.gov/forms/massevip-multi-unit-dwelling-and-educational-campus-mudc-charging-program-application",
        "https://programs.dsireusa.org/system/program/detail/22188"
      ],
      "evidenceText": "MassEVIP materials identify charging incentives for multi-unit dwellings and educational campuses, with Level 1 and Level 2 equipment within defined site eligibility rules.",
      "reasoningNotes": "Some official page content was access-limited, but official forms and program snippets support the core match; confidence remains medium."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8064ef83c57cdab1_v1",
        "incentiveType": "evse_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.6
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 5000000,
          "maxPercentOfBasis": 0.6
        },
        "confidence": "high",
        "formula": "60% of Level 1 or Level 2 EVSE hardware and installation costs, capped at $50,000 per street address",
        "evidenceText": "MassDEP states it funds up to 60% of hardware and installation costs, maximum $50,000 per street address.",
        "sourceUrlsChecked": [
          "https://www.mass.gov/how-to/apply-for-massevip-multi-unit-dwelling-educational-campus-charging-incentives"
        ],
        "reasoningNotes": "Matched Level 2 EVSE terms. Basis is eligible hardware and installation cost for MUD or educational campus charging.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22187",
    "opportunityName": "MassEVIP Public Access Charging (PAC) Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22187/massevip-public-access-charging-pac-program",
    "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-public-access-charging-incentives",
    "applicationUrl": "https://www.mass.gov/forms/massevip-public-access-charging-pac-program-application",
    "administrator": "Massachusetts Department of Environmental Protection",
    "programType": "Grant Program",
    "availabilityStatus": "rolling",
    "sourceConfidence": "medium",
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
          "electric vehicle charging",
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
      "confidence": "medium",
      "availabilityStatus": "rolling",
      "geography": {
        "country": "US",
        "states": [
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Massachusetts public-access charging sites only."
      },
      "eligibleApplicantTypes": [
        "business",
        "nonprofit",
        "public_agency",
        "municipality",
        "site_host",
        "property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "public",
        "nonprofit",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Charging must be public-access and meet MassEVIP PAC requirements.",
        "Equipment must be eligible Level 1 or Level 2 AC charging equipment.",
        "Applicant must submit required application materials and comply with program cost-share and access rules."
      ],
      "blockers": [
        "Do not match private home charging.",
        "Do not match DC fast charging.",
        "Do not match chargers without public-access availability unless a separate MassEVIP program applies."
      ],
      "programType": "Grant Program",
      "administrator": "Massachusetts Department of Environmental Protection",
      "applicationUrl": "https://www.mass.gov/forms/massevip-public-access-charging-pac-program-application",
      "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-public-access-charging-incentives",
      "sourceUrlsChecked": [
        "https://www.mass.gov/how-to/apply-for-massevip-public-access-charging-incentives",
        "https://www.mass.gov/forms/massevip-public-access-charging-pac-program-application",
        "https://www.mass.gov/doc/massevip-public-access-charging-requirements/download",
        "https://programs.dsireusa.org/system/program/detail/22187"
      ],
      "evidenceText": "MassEVIP PAC materials support incentives for public-access Level 1 and Level 2 charging equipment at eligible Massachusetts sites under program requirements.",
      "reasoningNotes": "Some official content was access-limited, but official application and requirements sources support Level 1 and Level 2 public-access charging."
    },
    "existingSimpleRules": [
      {
        "id": "oir_57f90d0b411bc902_v1",
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
        "cap": {
          "maxAmountCents": 5000000,
          "maxPercentOfBasis": 0.8
        },
        "confidence": "high",
        "formula": "80% of Level 1 or Level 2 EVSE hardware and installation costs, capped at $50,000 per address",
        "evidenceText": "MassEVIP Public Access Charging page funds up to 80% of hardware and installation costs to $50,000 per address.",
        "sourceUrlsChecked": [
          "https://www.mass.gov/how-to/apply-for-massevip-public-access-charging-incentives"
        ],
        "reasoningNotes": "Matched public Level 1/Level 2 EVSE. Use eligible cost categories, not recurring charging revenue.",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d779623995147130_v1",
        "incentiveType": "percent_of_basis_rebate",
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
          "maxAmountCents": 5000000,
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "100% of Level 1 or Level 2 EVSE hardware and installation costs for government-owned locations, capped at $50,000 per address",
        "evidenceText": "MassEVIP PAC materials say government-owned locations can receive up to 100% of costs, to $50,000 per address.",
        "sourceUrlsChecked": [
          "https://www.mass.gov/how-to/apply-for-massevip-public-access-charging-incentives"
        ],
        "reasoningNotes": "Returned separately because government-owned sites have a higher cost-share percentage.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22190",
    "opportunityName": "MOR-EV",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22190/mor-ev",
    "websiteUrl": "https://mor-ev.org/",
    "applicationUrl": null,
    "administrator": "Massachusetts Department of Energy Resources; Center for Sustainable Energy",
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
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fuel cell"
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
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Massachusetts vehicle rebate; vehicles must meet MOR-EV program and Massachusetts use requirements."
      },
      "eligibleApplicantTypes": [
        "massachusetts_resident",
        "business",
        "nonprofit_organization",
        "income_qualified_resident"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "electric_vehicle_purchase",
        "fuel_cell_vehicle_purchase"
      ],
      "hardRequirements": [
        "Vehicle must be an eligible battery-electric vehicle or fuel-cell electric vehicle on the MOR-EV eligible vehicle list.",
        "New light-duty standard rebate vehicles must meet the current MSRP cap.",
        "Used MOR-EV rebate requires an eligible used BEV or FCEV and an income-qualified Massachusetts resident.",
        "Applicant must be an eligible Massachusetts resident, business, or nonprofit organization, as applicable.",
        "Vehicle ownership, registration, lease-term, purchase-price, and application-timing rules apply.",
        "Plug-in hybrid electric vehicles purchased after June 30, 2023 are not eligible."
      ],
      "blockers": [
        "Does not fund EV charger installation, EVSE, panel upgrades, or make-ready wiring.",
        "Fuel cell means a fuel-cell electric vehicle, not a stationary or building fuel cell system.",
        "Not a solar, battery storage, or building retrofit program."
      ],
      "programType": "Rebate Program",
      "administrator": "Massachusetts Department of Energy Resources; Center for Sustainable Energy",
      "applicationUrl": null,
      "websiteUrl": "https://mor-ev.org/",
      "sourceUrlsChecked": [
        "https://mor-ev.org/",
        "https://mor-ev.org/eligible-vehicles",
        "https://mor-ev.org/faqs",
        "https://www.mass.gov/info-details/mor-ev-rebate-program"
      ],
      "evidenceText": "MOR-EV]( rebates apply to purchase or lease of eligible battery-electric and fuel-cell electric vehicles with price and applicant rules.",
      "reasoningNotes": "The original EV charger and stationary fuel-cell categories are false positives. The correct category is vehicle purchase or lease."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3698d2448288343e_v1",
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
        "formula": "$3,500 per eligible new fuel-cell electric vehicle",
        "evidenceText": "MOR-EV materials list eligible new FCEVs and BEVs with a standard $3,500 rebate.",
        "sourceUrlsChecked": [
          "https://mor-ev.org/",
          "https://mor-ev.org/eligible-vehicles"
        ],
        "reasoningNotes": "Matched fuel-cell vehicle term. Use one unit as one qualifying vehicle.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22191",
    "opportunityName": "MOR-EV Trucks Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22191/mor-ev-trucks-program",
    "websiteUrl": "https://mor-ev.org/trucks-pickups",
    "applicationUrl": null,
    "administrator": "Massachusetts Department of Energy Resources; Center for Sustainable Energy",
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
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fuel cell"
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
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Massachusetts truck and fleet vehicle rebate; vehicles must meet MOR-EV Trucks program requirements."
      },
      "eligibleApplicantTypes": [
        "massachusetts_resident",
        "business",
        "nonprofit_organization",
        "educational_institution",
        "government_entity",
        "fleet_owner"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "nonprofit",
        "public",
        "education",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "electric_truck_purchase",
        "fuel_cell_truck_purchase"
      ],
      "hardRequirements": [
        "Vehicle must be an eligible battery-electric or fuel-cell electric pickup, Class 2b, or Class 3-8 truck.",
        "Applicant must meet Massachusetts resident, business, nonprofit, education, government, or fleet eligibility rules.",
        "Vehicle must be listed or qualify under current MOR-EV Trucks vehicle eligibility criteria.",
        "MSRP, sales-price, gross vehicle weight rating, ownership or lease-retention, and application or voucher rules apply.",
        "Class 3-8 incentives are subject to funding blocks and remaining vouchers."
      ],
      "blockers": [
        "Does not fund EV charger installation, EVSE, make-ready infrastructure, or charger demand response.",
        "Fuel cell means a fuel-cell electric truck, not a stationary or building fuel cell system.",
        "Do not match light-duty passenger vehicle-only rebates to this truck record."
      ],
      "programType": "Rebate Program",
      "administrator": "Massachusetts Department of Energy Resources; Center for Sustainable Energy",
      "applicationUrl": null,
      "websiteUrl": "https://mor-ev.org/trucks-pickups",
      "sourceUrlsChecked": [
        "https://mor-ev.org/trucks-pickups",
        "https://mor-ev.org/trucks-3-8",
        "https://mor-ev.org/eligible-vehicles-trucks",
        "https://www.mass.gov/info-details/mor-ev-rebate-program"
      ],
      "evidenceText": "MOR-EV]( Trucks supports eligible battery-electric and fuel-cell electric pickup/Class 2b and Class 3-8 trucks for Massachusetts applicants.",
      "reasoningNotes": "The supplied EV charger and stationary fuel-cell categories are false positives. Keep only electric or fuel-cell truck purchase categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9809f71dc9682197_v1",
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
        "formula": "$7,500 per eligible Class 2 or 2b zero-emission vehicle",
        "evidenceText": "MOR-EV Trucks materials list Class 2 and 2b vehicle rebates at $7,500.",
        "sourceUrlsChecked": [
          "https://mor-ev.org/",
          "https://mor-ev.org/trucks"
        ],
        "reasoningNotes": "Matched vehicle fuel replacement. Larger class amounts vary, so the lowest vehicle class is returned as a candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22547",
    "opportunityName": "National Grid Residential EV Charging Infrastructure Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22547/national-grid-residential-ev-charging-infrastructure-program",
    "websiteUrl": "https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/EV-Charging-Upgrade-Program",
    "applicationUrl": "https://frontdoor.portal.poweredbyefi.org/initiative/ngridma/program/ngridmaev",
    "administrator": "National Grid",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "National Grid Massachusetts"
        ],
        "notes": "Available only to qualifying National Grid Massachusetts residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "electric_vehicle_owner_or_lessee",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "ev_make_ready_electrical_upgrade",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Customer must have a National Grid Massachusetts electric account and qualifying residential property.",
        "Applicant must own or lease an EV and install eligible 240-volt charging wiring or eligible equipment under program rules.",
        "Single-family participants generally must enroll in the off-peak charging program unless an exception applies.",
        "Enhanced incentives depend on income, environmental-justice, or qualifying rate criteria."
      ],
      "blockers": [
        "Do not match DC fast charging.",
        "Do not match non-National Grid territories.",
        "Level 2 charger equipment rebate is limited to eligible customer categories and program-qualified equipment; most base support is for wiring or infrastructure."
      ],
      "programType": "Rebate Program",
      "administrator": "National Grid",
      "applicationUrl": "https://frontdoor.portal.poweredbyefi.org/initiative/ngridma/program/ngridmaev",
      "websiteUrl": "https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/EV-Charging-Upgrade-Program",
      "sourceUrlsChecked": [
        "https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/EV-Charging-Upgrade-Program",
        "https://frontdoor.portal.poweredbyefi.org/initiative/ngridma/program/ngridmaev",
        "https://programs.dsireusa.org/system/program/detail/22547"
      ],
      "evidenceText": "National Grid Massachusetts offers residential EV charging upgrade rebates for 240-volt wiring and, for qualifying customers, Level 2 smart chargers under program eligibility and enrollment requirements.",
      "reasoningNotes": "Keep Level 2 and EV make-ready, with the stronger match on wiring or infrastructure upgrades rather than generic charger installation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d168dd607de95b1a_v1",
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
        "formula": "$2,000 per eligible unit",
        "evidenceText": "Rebates for customers enrolled in National Grid’s Low Income Discount Rate (R-2) Installation of a 240-volt circuit or outlet in the garage/parking space for charging an electric vehicle* Single-Family Up to $1,000 2-4 Unit** Up to $2,000 Purchase of a qualified EV Smart Charger for the garage/parking space** Single-Family Up to $700 2-4 Unit** Up to $700 Applicants enrolled on the R-2 rate are eligible for the enhanced wiring rebate and Smart Charger rebate only i",
        "sourceUrlsChecked": [
          "https://www.nationalgridus.com/Residential-EV-Charging-Infrastructure-Program"
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
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1829",
    "opportunityName": "Reading Municipal Light Department - Residential Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1829/reading-municipal-light-department-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.rmld.com/efficiency-electrification-programs",
    "applicationUrl": null,
    "administrator": "Reading Municipal Light Department",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "heat pump"
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
        "cities": [],
        "utilityTerritories": [
          "Reading Municipal Light Department"
        ],
        "notes": "Limited to RMLD residential customers and primary homes in the RMLD service territory."
      },
      "eligibleApplicantTypes": [
        "residential_rmld_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "air_sealing_weatherization",
        "electric_panel_upgrade",
        "residential_solar_pv",
        "residential_ev_charger",
        "load_management_device",
        "energy_star_appliance_upgrade",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be an RMLD residential customer.",
        "Heat pump projects must serve the customer's primary home in RMLD territory.",
        "Weatherization is required with the heat pump incentive path and must follow program contractor and documentation rules.",
        "Heat pump projects must meet sizing, Manual J, permit, inspection, and equipment requirements where applicable.",
        "Electric panel, solar, EV charger, appliance, load-management, and thermostat measures must follow their separate RMLD program terms.",
        "Customers receiving Mass Save gas heat pump rebates are not eligible for the RMLD heat pump rebate."
      ],
      "blockers": [
        "Do not match commercial or industrial measures to this residential program.",
        "Weatherization should be matched as part of the residential heat pump path, not as an unrelated standalone commercial weatherization program.",
        "Do not infer motors, VFDs, commercial refrigeration, or commercial kitchen equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Reading Municipal Light Department",
      "applicationUrl": null,
      "websiteUrl": "https://www.rmld.com/efficiency-electrification-programs",
      "sourceUrlsChecked": [
        "https://www.rmld.com/efficiency-electrification-programs",
        "https://www.rmld.com/188/Heat-Pump-Rebate-or-0-Interest-Loan",
        "https://www.rmld.com/187/Electric-Panel-Upgrade-Rebate"
      ],
      "evidenceText": "RMLD's residential page and heat pump page support heat pumps, required weatherization, panel upgrades, solar, EV charging, load management, appliances, and thermostats for residential RMLD customers.",
      "reasoningNotes": "Heat pump and weatherization matches are source-backed. Additional residential RMLD measures are included because current official pages list them."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0d03c0f2d25d2a20_v1",
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
          "maxAmountCents": 350000
        },
        "confidence": "high",
        "formula": "50% of weatherization cost, capped at $3,500",
        "evidenceText": "RMLD weatherization materials list 50% of qualifying cost up to $3,500.",
        "sourceUrlsChecked": [
          "https://www.rmld.com/efficiency-electrification-programs/weatherization",
          "https://www.rmld.com/efficiency-electrification-programs/residential"
        ],
        "reasoningNotes": "Matched weatherization term. Returned separately from heat pump candidate.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9329ded122deee22_v1",
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
        "cap": {
          "maxAmountCents": 800000
        },
        "confidence": "high",
        "formula": "$2,000 per ton for new heat pump installations, capped at $8,000",
        "evidenceText": "RMLD heat pump rebate materials list new heat pumps at $2,000 per ton up to $8,000.",
        "sourceUrlsChecked": [
          "https://www.rmld.com/efficiency-electrification-programs/heat-pumps",
          "https://www.rmld.com/efficiency-electrification-programs/residential"
        ],
        "reasoningNotes": "Matched heat pump term. Use unit_count as eligible tons.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22799",
    "opportunityName": "SHELD Greenhouse Gas Reduction Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22799/sheld-greenhouse-gas-reduction-rebate-program",
    "websiteUrl": "https://www.sheld.org/pages/forms/electric-vehicle-incentives/",
    "applicationUrl": "https://www.sheld.org/pages/forms/electric-vehicle-incentives/",
    "administrator": "South Hadley Electric Light Department",
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
          "MA"
        ],
        "counties": [],
        "cities": [
          "South Hadley"
        ],
        "utilityTerritories": [
          "South Hadley Electric Light Department"
        ],
        "notes": "Available to qualifying SHELD electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Customer must enroll in the SHELD NextZero Scheduled Charging Program for the required term.",
        "Eligible charger must be an approved networked charger, such as listed Emporia or ChargePoint models.",
        "Charger must be installed by a licensed contractor or electrician where required.",
        "Permit, wiring inspection, application, and participation agreement requirements may apply."
      ],
      "blockers": [
        "Do not match as a generic EV charger rebate without the Level 2 and scheduled-charging requirements.",
        "Not an EV purchase rebate.",
        "Unsupported charger brands and nonparticipating customers do not qualify.",
        "Commercial charger incentives are not supported by this residential SHELD page."
      ],
      "programType": "Rebate Program",
      "administrator": "South Hadley Electric Light Department",
      "applicationUrl": "https://www.sheld.org/pages/forms/electric-vehicle-incentives/",
      "websiteUrl": "https://www.sheld.org/pages/forms/electric-vehicle-incentives/",
      "sourceUrlsChecked": [
        "https://www.sheld.org/pages/forms/electric-vehicle-incentives/",
        "https://www.sheld.org/uploads/South-Hadley_ON-Peak-Charging-Agreement.pdf"
      ],
      "evidenceText": "SHELD]( offers a residential EV charger rebate after successful participation in its NextZero Scheduled Charging Program and requires approved chargers and proper installation.",
      "reasoningNotes": "Narrow the match to Level 2 EV charger installation with scheduled-charging participation. Generic EVSE matching is too broad without those requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2ed6a9d3e9dbd579_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 30000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$300 per qualifying EV charger",
        "evidenceText": "SHELD 2026 greenhouse-gas rebate table lists qualifying EV chargers at $300.",
        "sourceUrlsChecked": [
          "https://sheld.org/greenhouse-gas-reduction-program/",
          "https://sheld.org/wp-content/uploads/2026/01/2026-GHG-Reduction-Program-Rebates.pdf"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Use one unit as one qualifying new charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22784",
    "opportunityName": "Off-Peak Charger Discount",
    "state": "ME",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22784/off-peak-charger-discount",
    "websiteUrl": "https://www.efficiencymaine.com/off-peak-charger-incentives/",
    "applicationUrl": null,
    "administrator": "Efficiency Maine",
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
          "ME"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Charger must be shipped to and installed at a Maine residential, business, or eligible public/nonprofit address."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "business_customer",
        "commercial_customer",
        "government_entity",
        "nonprofit_organization"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "public",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "off_peak_ev_charging"
      ],
      "hardRequirements": [
        "Eligible off-peak Level 2 charger must be shipped to and installed in Maine.",
        "Customer must buy through the Efficiency Maine discount process to receive the instant discount.",
        "Customer must connect the charger to the internet and mobile app within the required setup period to receive the bonus.",
        "The charger automatically pauses charging during the 5 p.m. to 9 p.m. weekday peak period, unless overridden for the day.",
        "Program is limited to the current maximum number of chargers per residential or business address."
      ],
      "blockers": [
        "Do not match EV vehicle purchase rebates, Level 1 chargers, DC fast chargers, or nonparticipating chargers.",
        "Do not treat generic Level 2 EVSE as eligible unless it is the program’s qualifying off-peak charger.",
        "Vehicle rebates and other Efficiency Maine EV incentives are separate programs."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Maine",
      "applicationUrl": null,
      "websiteUrl": "https://www.efficiencymaine.com/off-peak-charger-incentives/",
      "sourceUrlsChecked": [
        "https://www.efficiencymaine.com/off-peak-charger-incentives/",
        "https://www.efficiencymaine.com/docs/EV-Offerings-Brochure.pdf",
        "https://www.efficiencymaine.com/em-electric-vehicle-incentives/",
        "https://www.efficiencymaine.com/electric-vehicle-incentives-for-low-and-moderate-income/",
        "https://www.efficiencymaine.com/ev-incentives-for-government/"
      ],
      "evidenceText": "Efficiency]( Maine provides a $200 instant discount plus $200 setup bonus for qualifying off-peak Level 2 chargers installed in Maine.",
      "reasoningNotes": "Level 2 EV charger installation is accurate, but it must be narrowed to the qualifying off-peak charger offering."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c9e68b37ecdaca32_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 40000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$400 per qualifying off-peak Level 2 charger: $200 instant discount plus $200 setup bonus",
        "evidenceText": "Efficiency Maine says off-peak chargers get a $200 instant discount and an additional $200 after setup.",
        "sourceUrlsChecked": [
          "https://www.efficiencymaine.com/off-peak-charger-incentives/",
          "https://www.efficiencymaine.com/docs/EV-Offerings-Brochure.pdf"
        ],
        "reasoningNotes": "Matched Level 2 charger terms. Combined the one-time instant discount and setup completion bonus.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22330",
    "opportunityName": "DTE Energy (Electric) - Charging Forward Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22330/dte-energy-electric-charging-forward-program",
    "websiteUrl": "https://www.dteenergy.com/us/en/residential/service-request/pev/home-ev-charger-rebate.html",
    "applicationUrl": "https://dteresev.powerclerk.com/",
    "administrator": "DTE Energy",
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
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "DTE Electric service territory"
        ],
        "notes": "Limited to eligible DTE Electric residential customers in Michigan."
      },
      "eligibleApplicantTypes": [
        "dte_electric_residential_customer",
        "income_qualified_household"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a current DTE Electric residential customer with account in good standing.",
        "Applicant must meet the current income eligibility criteria shown for the residential rebate.",
        "Customer must buy or lease an EV or plug-in hybrid EV.",
        "Level 2 charger must be ENERGY STAR certified or from the same manufacturer as the EV.",
        "Application must be submitted within six months of charger installation."
      ],
      "blockers": [
        "Business, eFleet, multifamily, public Level 2, and DC fast charging rebates are separate DTE programs.",
        "This residential opportunity should not be matched to nonresidential charging projects.",
        "Generic EV charging without a qualifying Level 2 charger and required customer eligibility does not qualify."
      ],
      "programType": "Rebate",
      "administrator": "DTE Energy",
      "applicationUrl": "https://dteresev.powerclerk.com/",
      "websiteUrl": "https://www.dteenergy.com/us/en/residential/service-request/pev/home-ev-charger-rebate.html",
      "sourceUrlsChecked": [
        "https://www.dteenergy.com/us/en/residential/service-request/pev/home-ev-charger-rebate.html",
        "https://www.dteenergy.com/us/en/business/service-request/pev/plug-in-electric-vehicles-pev.html",
        "https://dteresev.powerclerk.com/"
      ],
      "evidenceText": "DTE's residential page offers a home EV charger rebate for eligible DTE Electric residential customers installing a qualifying Level 2 charger.",
      "reasoningNotes": "Use only the residential Level 2 charger installation category for this DSIRE target."
    },
    "existingSimpleRules": [
      {
        "id": "oir_15cc8ae23a55d4b0_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 1
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to 100% of Level 2 charger and installation total for income-eligible residential customers",
        "evidenceText": "DTE agreement says it will \"provide a rebate to match the charger and installation total amount.\"",
        "sourceUrlsChecked": [
          "https://www.dteenergy.com/us/en/residential/service-request/pev/home-ev-charger-rebate.html",
          "https://www.dteenergy.com/content/dam/dteenergy/deg/website/residential/Service-Request/pev/home-ev-charger-rebate/Home-EV-Charger-Rebate-Agreement.pdf"
        ],
        "reasoningNotes": "Matched Level 2 EVSE. Confidence is medium because invoice total and reviewer discretion determine final approved amount.",
        "mapping": {
          "primarySavingsModelId": "electric_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22331",
    "opportunityName": "Indiana Michigan Power - EV Incentive",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22331/indiana-michigan-power-ev-incentive",
    "websiteUrl": "https://www.indianamichiganpower.com/clean-energy/electric-cars/",
    "applicationUrl": "https://imev.powerclerk.com/",
    "administrator": "Indiana Michigan Power",
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
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Indiana Michigan Power Michigan service territory"
        ],
        "notes": "Michigan I&M EV charging incentives include residential, small commercial, workplace, fleet, and multi-unit dwelling pathways."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "small_commercial_electric_customers",
        "commercial_electric_customers",
        "industrial_electric_customers",
        "multi_unit_dwelling_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "multifamily",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "residential_ev_charging_submeter",
        "workplace_ev_charging",
        "fleet_ev_charging",
        "multifamily_ev_charging"
      ],
      "hardRequirements": [
        "Applicant must be an Indiana Michigan Power Michigan customer.",
        "Eligible participants must own or lease a Michigan-registered plug-in electric vehicle acquired within the program’s stated date rules.",
        "Level 2 charger installation or planned installation is required.",
        "Submeter, inspection, licensing, and off-peak rate requirements apply to the relevant pathway."
      ],
      "blockers": [
        "Michigan workplace, fleet, and multi-unit dwelling incentives are Level 2 and do not support DC fast charging.",
        "Chargers used solely for public charging are excluded from the Michigan workplace or multi-unit dwelling incentive pathway.",
        "Do not match non-I&M customers or chargers without the required submetering and vehicle eligibility."
      ],
      "programType": "Rebate Program",
      "administrator": "Indiana Michigan Power",
      "applicationUrl": "https://imev.powerclerk.com/",
      "websiteUrl": "https://www.indianamichiganpower.com/clean-energy/electric-cars/",
      "sourceUrlsChecked": [
        "https://www.indianamichiganpower.com/clean-energy/electric-cars/",
        "https://www.indianamichiganpower.com/clean-energy/electric-cars/charge-at-home-michigan",
        "https://www.indianamichiganpower.com/clean-energy/electric-cars/business/charge-at-work-michigan",
        "https://imev.powerclerk.com/"
      ],
      "evidenceText": "I&M]( Michigan offers home or small-commercial Level 2 submeter incentives and separate workplace, fleet, and multi-unit dwelling Level 2 incentives with off-peak rate requirements.",
      "reasoningNotes": "The Level 2 EV charging match is correct. Generic EV charging should be narrowed because the Michigan source supports Level 2 and submetered charging pathways, not DCFC or public-only charging."
    },
    "existingSimpleRules": [
      {
        "id": "oir_211d4ad307f7d1bc_v1",
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
        "formula": "$500 for joining the Michigan home EV charging program with Level 2 charger",
        "evidenceText": "I&M Charge at Home Michigan says customers with a Level 2 PEV charger can get the $500 rebate and off-peak rate.",
        "sourceUrlsChecked": [
          "https://www.indianamichiganpower.com/clean-energy/electric-cars/charge-at-home-michigan",
          "https://programs.dsireusa.org/system/program/detail/22331"
        ],
        "reasoningNotes": "Matched residential or small commercial Level 2 EV charging. Use one unit as one qualifying charger/program enrollment.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22332",
    "opportunityName": "Lansing Board of Water and Light - Plug-in Electric Vehicle Rebates",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22332/lansing-board-of-water-and-light-plug-in-electric-vehicle-rebates",
    "websiteUrl": "https://www.lbwl.com/customers/save-money-energy/plug-electric-vehicles-pev",
    "applicationUrl": null,
    "administrator": "Lansing Board of Water and Light",
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
          "MI"
        ],
        "counties": [],
        "cities": [
          "Lansing"
        ],
        "utilityTerritories": [
          "Lansing Board of Water & Light electric service territory"
        ],
        "notes": "BWL serves Lansing and surrounding areas; eligibility is based on BWL electric service, not city name alone."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "commercial_electric_customers",
        "industrial_electric_customers",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "multifamily",
        "fleet",
        "public_charging"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "residential_ev_charging_submeter",
        "workplace_ev_charging",
        "fleet_ev_charging",
        "multifamily_ev_charging"
      ],
      "hardRequirements": [
        "Applicant must be a current BWL electric customer in good standing.",
        "Residential pathways require Level 2 charger installation and either a second-meter Rate 22 pathway or off-peak saver time-of-use enrollment.",
        "Commercial and multifamily incentives are limited to Level 2 charging stations and program caps per location.",
        "Chargers above specified amperage thresholds require prior approval."
      ],
      "blockers": [
        "BWL states DC fast charging is not eligible for the commercial and multifamily incentive programs.",
        "Do not match non-BWL customers.",
        "Do not match Level 1 charging, vehicle purchase incentives, or unrelated building efficiency measures.",
        "Per-location and per-home limits apply."
      ],
      "programType": "Rebate Program",
      "administrator": "Lansing Board of Water and Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.lbwl.com/customers/save-money-energy/plug-electric-vehicles-pev",
      "sourceUrlsChecked": [
        "https://www.lbwl.com/customers/save-money-energy/plug-electric-vehicles-pev",
        "https://www.lbwl.com/second-meter-installation-1000-rebate",
        "https://www.lbwl.com/pev-off-peak-savers-program-500-rebate",
        "https://www.lbwl.com/commercial-electric-vehicle-charging-incentive-program",
        "https://www.lbwl.com/multifamily-electric-vehicle-charging-incentive-program"
      ],
      "evidenceText": "BWL]( offers residential Level 2 rebates through second-meter or off-peak pathways, plus commercial and multifamily Level 2 rebates; DC fast charging is not eligible.",
      "reasoningNotes": "The Level 2 EV charging match is correct. Generic EV charging should be narrowed to Level 2 charging with BWL customer, metering, TOU, and location-specific constraints."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4f515a83d60356be_v1",
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
        "formula": "$500 per Level 2 charger enrolled in Off-Peak Savers",
        "evidenceText": "BWL Off-Peak Savers materials list a $500 rebate for qualifying Level 2 chargers.",
        "sourceUrlsChecked": [
          "https://www.lbwl.com/OffPeakSavers",
          "https://www.lbwl.com/evs"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Separate second-meter incentives are not modeled here.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
