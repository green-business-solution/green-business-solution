You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 22
Targets in this prompt: 421-440 of 984
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
  "batchNumber": 22,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4199"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22333",
    "opportunityName": "Connexus Energy - Electric Vehicle Incentive Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22333/connexus-energy-electric-vehicle-incentive-program",
    "websiteUrl": "https://www.connexusenergy.com/save-money-and-energy/programs-rebates/electric-vehicles",
    "applicationUrl": "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate",
    "administrator": "Connexus Energy",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Connexus Energy service territory"
        ],
        "notes": "Limited to eligible Connexus Energy members with installations in the Connexus service territory."
      },
      "eligibleApplicantTypes": [
        "connexus_residential_member",
        "connexus_commercial_member",
        "multifamily_customer",
        "fleet_customer",
        "workplace_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "fleet",
        "workplace"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Eligible charging equipment must be Level 2 and installed in Connexus Energy service territory.",
        "Residential rebates require enrollment in an EV rate and an off-peak meter socket installation.",
        "Commercial Level 2 rebates require pre-approval.",
        "Commercial equipment must meet listed power, voltage, amperage, listing, and ownership or lease requirements.",
        "Rebates are capped by program limits and annual deadlines."
      ],
      "blockers": [
        "Do not generalize to DC fast charging; commercial DC fast chargers are not eligible for the prescriptive rebate.",
        "Hybrid vehicles without plug-in charging are not eligible.",
        "Whole-house time-of-day enrollment does not qualify for the residential charger rebate."
      ],
      "programType": "Rebate",
      "administrator": "Connexus Energy",
      "applicationUrl": "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate",
      "websiteUrl": "https://www.connexusenergy.com/save-money-and-energy/programs-rebates/electric-vehicles",
      "sourceUrlsChecked": [
        "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate",
        "https://www.connexusenergy.com/download_file/view/d08546ed-a2ac-45ff-b1c3-1ce5ffa3ca37/412"
      ],
      "evidenceText": "Connexus lists residential and commercial Level 2 EV charger rebates with EV rate, service territory, and pre-approval requirements.",
      "reasoningNotes": "Use the narrower Level 2 EV charger category rather than both a general EV charger category and a Level 2 duplicate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2d7e95e689236d12_v1",
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
          "maxAmountCents": 50000
        },
        "confidence": "high",
        "formula": "50% of Level 2 EV charger project cost, capped at $500",
        "evidenceText": "Connexus lists qualifying Level 2 EV charger rebate as up to 50% of project cost or $500.",
        "sourceUrlsChecked": [
          "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Use eligible charger, equipment, and installation costs.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7783e1aa43e519aa_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$100 per qualifying Level 2 PHEV charger installation",
        "evidenceText": "Connexus lists $100 for qualifying Level 2 PHEV charger with meter socket installation.",
        "sourceUrlsChecked": [
          "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate"
        ],
        "reasoningNotes": "Returned separately because PHEV charger installations have a lower fixed amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22334",
    "opportunityName": "Dakota Electric Association - Residential EV Charger Rebate",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22334/dakota-electric-association-residential-ev-charger-rebate",
    "websiteUrl": "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/electric-vehicle-charging/",
    "applicationUrl": "https://www.dakotaelectric.com/wp-content/uploads/2026/06/Electric-Vehicle-Packet_0626_NEW-RATES.pdf",
    "administrator": "Dakota Electric Association",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Dakota Electric Association service territory"
        ],
        "notes": "Limited to Dakota Electric residential members in Minnesota."
      },
      "eligibleApplicantTypes": [
        "dakota_electric_residential_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_240v_ev_charging_circuit_installation"
      ],
      "hardRequirements": [
        "Rebate offsets installation of a 240-volt EV charging circuit.",
        "Charging circuit must be enrolled on a Dakota Electric Storage or Time-of-Use EV charging program.",
        "A submeter must be installed and electrician invoice documentation is required.",
        "EV must be SAE J1772-compliant, registered, and operable on Minnesota public highways.",
        "Limit is one rebate per EV charging circuit under current program rules."
      ],
      "blockers": [
        "Charger or vehicle purchase invoices are not accepted for the circuit installation rebate.",
        "Low-speed vehicles and golf carts are ineligible.",
        "A 240-volt circuit without enrollment in the required metered program does not qualify.",
        "Commercial or public charging stations are not supported by this residential opportunity."
      ],
      "programType": "Rebate",
      "administrator": "Dakota Electric Association",
      "applicationUrl": "https://www.dakotaelectric.com/wp-content/uploads/2026/06/Electric-Vehicle-Packet_0626_NEW-RATES.pdf",
      "websiteUrl": "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/electric-vehicle-charging/",
      "sourceUrlsChecked": [
        "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/electric-vehicle-charging/",
        "https://www.dakotaelectric.com/wp-content/uploads/2026/06/Electric-Vehicle-Packet_0626_NEW-RATES.pdf"
      ],
      "evidenceText": "Dakota Electric offers a residential rebate for installing a 240-volt EV charging circuit tied to its metered EV charging programs.",
      "reasoningNotes": "The opportunity is more specific than generic EV charger installation; it supports a residential 240-volt charging circuit with metered rate enrollment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_97b9695be676c6b5_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$500 per EV charging circuit on qualifying charging program",
        "evidenceText": "Dakota Electric 2026 EV packet says a $500 rebate is available to offset installation cost of a 240V EV circuit.",
        "sourceUrlsChecked": [
          "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/electric-vehicle-charging/",
          "https://www.dakotaelectric.com/wp-content/uploads/2024/05/Electric-Vehicle-Packet_0426_NEW-RATES.pdf"
        ],
        "reasoningNotes": "Matched Level 2 EV charging. Source says charger and vehicle invoices are not accepted, so basis is charging circuit installation.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3312",
    "opportunityName": "Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3312/minnesota-energy-resources-gas-home-energy-excellence-program-for-builders-or-homeowners",
    "websiteUrl": "https://www.minnesotaenergyresources.com/partners/builders/home-energy",
    "applicationUrl": null,
    "administrator": "Minnesota Energy Resources",
    "programType": "New Construction Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Minnesota Energy Resources"
        ],
        "notes": "Applies to qualifying new homes in Minnesota Energy Resources natural gas service territory."
      },
      "eligibleApplicantTypes": [
        "home_builder",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential",
        "new_construction"
      ],
      "eligibleRetrofitCategories": [
        "new_home_whole_building_energy_efficiency",
        "advanced_or_wifi_thermostat",
        "drain_water_heat_recovery"
      ],
      "hardRequirements": [
        "Home must be new construction served by Minnesota Energy Resources natural gas.",
        "Project must complete required plan review, inspections, and HERS rating steps.",
        "Home must meet program performance requirements, including exceeding energy code by the specified threshold."
      ],
      "blockers": [
        "Not an existing-home retrofit rebate.",
        "Do not match industrial waste heat recovery.",
        "Do not match generic smart thermostat retrofits unless tied to the eligible new-home program measure.",
        "Do not match electric-utility programs outside Minnesota Energy Resources gas territory."
      ],
      "programType": "New Construction Rebate Program",
      "administrator": "Minnesota Energy Resources",
      "applicationUrl": null,
      "websiteUrl": "https://www.minnesotaenergyresources.com/partners/builders/home-energy",
      "sourceUrlsChecked": [
        "https://www.minnesotaenergyresources.com/partners/builders/home-energy",
        "https://www.minnesotaenergyresources.com/savings/energy-efficiency/rebates/new-home",
        "https://programs.dsireusa.org/system/program/detail/3312"
      ],
      "evidenceText": "Minnesota Energy Resources describes Home Energy Excellence for builders of new natural-gas homes, using plan review, inspections, HERS ratings, and rebates for qualifying efficient new-home measures.",
      "reasoningNotes": "Repair the false positive: heat recovery is drain water heat recovery in residential new construction, not industrial waste heat recovery."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4c6f7117a530da68_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 15000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$150 per drain water heat recovery device, capped at 50% of improvement cost",
        "evidenceText": "Builder rebate table lists Drain Water Heat Recovery Device at $150.",
        "sourceUrlsChecked": [
          "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates"
        ],
        "reasoningNotes": "Matched heat recovery term. Returned as a separate candidate because it is a distinct eligible measure.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_681b5c3f6f2b6b34_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$50 per advanced or Wi-Fi enabled thermostat, capped at 50% of improvement cost",
        "evidenceText": "Builder rebate table lists Advanced Thermostats or Wi-Fi Enabled Thermostats at $50.",
        "sourceUrlsChecked": [
          "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates"
        ],
        "reasoningNotes": "Matched thermostat terms. Source says listed equipment rebates are limited to 50% of total improvement cost.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22336",
    "opportunityName": "Otter Tail Power - EVSE Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22336/otter-tail-power-evse-rebate-program",
    "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/",
    "applicationUrl": "https://www.otpco.com/media/0i1awkwg/mn-electric-vehicle-charging-rebate-form-2026-fillable.pdf",
    "administrator": "Otter Tail Power Company",
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
          "Otter Tail Power Company Minnesota electric service territory"
        ],
        "notes": "This repair follows the Minnesota rebate form for the target state."
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
        "Electricity at the installation site must be supplied by Otter Tail Power",
        "New hardwired Level 2 charger required",
        "Charger must be served on a qualifying controlled or off-peak rate",
        "Receipt, invoice, equipment information, and account details required",
        "Rebate request due by the stated annual deadline after purchase year"
      ],
      "blockers": [
        "Level 1, portable, and non-hardwired chargers are not supported by the checked form",
        "No qualifying controlled or off-peak rate blocks eligibility",
        "Non-Otter Tail Power customers are not eligible",
        "DC fast chargers and vehicle purchase rebates are separate from this opportunity"
      ],
      "programType": "Rebate",
      "administrator": "Otter Tail Power Company",
      "applicationUrl": "https://www.otpco.com/media/0i1awkwg/mn-electric-vehicle-charging-rebate-form-2026-fillable.pdf",
      "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/",
      "sourceUrlsChecked": [
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/",
        "https://www.otpco.com/media/0i1awkwg/mn-electric-vehicle-charging-rebate-form-2026-fillable.pdf"
      ],
      "evidenceText": "Otter Tail’s Minnesota EV charging rebate form supports a rebate for new hardwired Level 2 chargers installed where Otter Tail supplies electricity and served on a qualifying controlled rate.",
      "reasoningNotes": "Preserve Level 2 EVSE only and block generic EV charging matches that do not meet hardwired and off-peak rate requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_45e2dad1ac81e9e4_v1",
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
        "formula": "$500 per Level 2 EV charging station on a qualified off-peak rate",
        "evidenceText": "Otter Tail says customers may qualify for a $500 rebate when installing a Level 2 EV charging station on a qualified off-peak rate.",
        "sourceUrlsChecked": [
          "https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/",
          "https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rebates/"
        ],
        "reasoningNotes": "Matched EVSE and Level 2 terms. Excludes ongoing off-peak rate savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22337",
    "opportunityName": "Runestone Electric Association - EVSE Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22337/runestone-electric-association-evse-rebate-program",
    "websiteUrl": "https://www.runestoneelectric.com/energy-wise-programs/residential-rebates/",
    "applicationUrl": null,
    "administrator": "Runestone Electric Association",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Runestone Electric Association"
        ],
        "notes": "Limited to qualifying EV charger installations at a primary residence served by Runestone Electric Association."
      },
      "eligibleApplicantTypes": [
        "residential_rea_members",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "controlled_ev_charger_installation",
        "ev_meter_socket_installation"
      ],
      "hardRequirements": [
        "Charger must be installed at the applicant's primary residence served by Runestone Electric Association.",
        "Uncontrolled charger rebate requires a qualifying uncontrolled EV charger under current residential rebate terms.",
        "Controlled charger rebate requires a qualifying controlled EV charger.",
        "Controlled EV charger rebate requires an EV meter socket to be installed.",
        "Customer must comply with current REA residential rebate documentation and program rules."
      ],
      "blockers": [
        "Current official residential rebate page does not support a Level 2-only category.",
        "Do not match DC fast charging, fleet charging infrastructure, or commercial EVSE.",
        "Do not match non-primary-residence or non-REA service territory installations."
      ],
      "programType": "Rebate Program",
      "administrator": "Runestone Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.runestoneelectric.com/energy-wise-programs/residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.runestoneelectric.com/energy-wise-programs/residential-rebates/",
        "https://www.runestoneelectric.com/energy-wise-programs/electric-vehicles/"
      ],
      "evidenceText": "Runestone's 2026 residential rebates list $250 for qualifying uncontrolled EV chargers and $500 for qualifying controlled EV chargers at a primary residence served by REA.",
      "reasoningNotes": "EV charger installation is supported, but the Level 2-specific match should be removed because the accessible current official page does not state Level 2."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8a49c9f945747cc7_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 25000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $250 per uncontrolled EV charger",
        "evidenceText": "Runestone EV charger application lists up to $250 for qualifying uncontrolled EV chargers.",
        "sourceUrlsChecked": [
          "https://www.runestoneelectric.com/energy-wise-programs/electric-vehicles/",
          "https://www.runestoneelectric.com/wp-content/uploads/2022/01/Rebate-Form-2022.pdf"
        ],
        "reasoningNotes": "Returned separately because uncontrolled chargers have a lower maximum.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_dc9f566dfb16b79b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $500 per qualifying EV charger on a storage rate",
        "evidenceText": "Runestone EV charger application lists up to $500 for chargers on a storage rate.",
        "sourceUrlsChecked": [
          "https://www.runestoneelectric.com/energy-wise-programs/electric-vehicles/",
          "https://www.runestoneelectric.com/wp-content/uploads/2022/01/Rebate-Form-2022.pdf"
        ],
        "reasoningNotes": "Matched EVSE and Level 2 terms. Confidence is medium because accessible detailed form is older.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22605",
    "opportunityName": "Entergy Mississippi - Residential Demand Response Battery Incentive Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22605/entergy-mississippi-residential-demand-response-battery-incentive-program",
    "websiteUrl": "https://www.entergymississippi.com/wp-content/uploads/eml_nem.pdf",
    "applicationUrl": null,
    "administrator": "Entergy Mississippi",
    "programType": "Residential Battery Rebate And Demand Response",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand response"
        ]
      },
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "battery storage",
          "storage system"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Entergy Mississippi"
        ],
        "notes": "Limited to eligible Entergy Mississippi residential retail customers under the tariffed battery demand response incentive."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "distributed_generation_interconnection_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "battery_storage_demand_response_participation"
      ],
      "hardRequirements": [
        "Customer must be an eligible residential Entergy Mississippi retail customer.",
        "Battery must be associated with an eligible distributed generation interconnection customer account.",
        "Minimum battery storage capacity is 8 kWh.",
        "Customer must enroll in the Battery Demand Response program and certify compliance with program requirements.",
        "Incentives are first-come, first-served and subject to annual program budgets through 2027."
      ],
      "blockers": [
        "This is not a general automated demand response controls or EMS rebate.",
        "Commercial and industrial battery projects are not supported by this residential incentive.",
        "Customers who applied for or received the separate low-income battery incentive cannot also receive this incentive."
      ],
      "programType": "Residential Battery Rebate And Demand Response",
      "administrator": "Entergy Mississippi",
      "applicationUrl": null,
      "websiteUrl": "https://www.entergymississippi.com/wp-content/uploads/eml_nem.pdf",
      "sourceUrlsChecked": [
        "https://www.entergy-mississippi.com/your_home/tariffs/",
        "https://www.entergymississippi.com/wp-content/uploads/eml_nem.pdf"
      ],
      "evidenceText": "Entergy Mississippi tariff provides a one-time residential battery incentive for eligible customers who enroll battery storage in the demand response program.",
      "reasoningNotes": "Keep battery storage and battery demand response; remove broad automated controls because the incentive is tied to residential battery capacity and enrollment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_72b69de101b6d40c_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 200000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$2,000 one-time battery incentive",
        "evidenceText": "Entergy Mississippi NEM schedule states a one-time $2,000 cash Battery Incentive is available.",
        "sourceUrlsChecked": [
          "https://www.entergymississippi.com/wp-content/uploads/eml_nem.pdf",
          "https://programs.dsireusa.org/system/program/detail/22605"
        ],
        "reasoningNotes": "Matched battery storage term. The associated demand response enrollment is required but the upfront incentive is one-time.",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5793",
    "opportunityName": "Entergy Mississippi- Residential Energy Efficiency Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5793/entergy-mississippi-residential-energy-efficiency-program",
    "websiteUrl": "https://www.entergymississippi.com/energyefficiency/residential/heating-cooling",
    "applicationUrl": null,
    "administrator": "Entergy Mississippi",
    "programType": "Residential Energy Efficiency Rebate And Audit",
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Entergy Mississippi"
        ],
        "notes": "Eligible Entergy Mississippi residential customers only."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "residential_direct_install",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner_replacement",
        "duct_sealing_air_sealing",
        "ceiling_insulation_upgrade"
      ],
      "hardRequirements": [
        "Customer must be an Entergy Mississippi residential customer.",
        "Heating and cooling incentives require qualifying equipment and participating trade ally installation.",
        "Home energy audit and READI measures must be completed through authorized program channels.",
        "Audit participation is limited by program rules, including once every five years for some services.",
        "All rebates and services are subject to funding availability."
      ],
      "blockers": [
        "Commercial, industrial, motors, refrigeration, and business equipment should not match this residential program.",
        "Product marketplace offers and appliance rebates are separate from the residential audit and HVAC program.",
        "Do not infer broad weatherization beyond supported duct sealing, air sealing, and ceiling insulation measures."
      ],
      "programType": "Residential Energy Efficiency Rebate And Audit",
      "administrator": "Entergy Mississippi",
      "applicationUrl": null,
      "websiteUrl": "https://www.entergymississippi.com/energyefficiency/residential/heating-cooling",
      "sourceUrlsChecked": [
        "https://www.entergymississippi.com/energyefficiency/residential/heating-cooling",
        "https://www.entergymississippi.com/energyefficiency/residential/energy-audit"
      ],
      "evidenceText": "Current Entergy Mississippi residential pages support no-cost audits, direct-install services, HVAC incentives, duct sealing, air sealing, and ceiling insulation.",
      "reasoningNotes": "The target audit and heat pump matches are valid, but should be residential-only and limited to current supported measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_880cae24d9c9dc35_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 110000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $1,100 per high-efficiency heat pump or air conditioner",
        "evidenceText": "Entergy Mississippi residential materials list rebates up to $1,100 for high-efficiency heat pump or AC systems.",
        "sourceUrlsChecked": [
          "https://www.entergy-mississippi.com/your_home/save_money/ee/residential-solutions/",
          "https://entergysolutionsms.com/residential/"
        ],
        "reasoningNotes": "Matched heat pump and mini-split/HVAC terms. Source uses \"up to,\" so final value depends on equipment.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22414",
    "opportunityName": "Cape Hatteras Electric Cooperative - ChargePoint Electric Vehicle Charger Residential Rebate",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22414/cape-hatteras-electric-cooperative-chargepoint-electric-vehicle-charger-residential-rebate",
    "websiteUrl": "https://www.chec.coop/EV",
    "applicationUrl": "https://www.chec.coop/sites/default/files/documents/chargepointrebateanddatasharingapp.pdf",
    "administrator": "Cape Hatteras Electric Cooperative",
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
          "NC"
        ],
        "counties": [
          "Dare"
        ],
        "cities": [],
        "utilityTerritories": [
          "Cape Hatteras Electric Cooperative"
        ],
        "notes": "Applies to CHEC members with a Hatteras Island home served by the cooperative."
      },
      "eligibleApplicantTypes": [
        "residential_members"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "chargepoint_level_2_home_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must have a valid CHEC account.",
        "Charger must be a ChargePoint brand Level 2 home charger.",
        "Charger must be installed where electricity is supplied by CHEC.",
        "Charger must be connected to Wi-Fi for data collection.",
        "Applicant must submit application, purchase receipt, and data sharing agreement."
      ],
      "blockers": [
        "Non-ChargePoint chargers are not supported by this rebate.",
        "Commercial, fleet, or public chargers are not eligible under this residential rebate.",
        "Locations outside a CHEC-served Hatteras Island home are not eligible.",
        "Level 1 charging equipment is not eligible."
      ],
      "programType": "Rebate",
      "administrator": "Cape Hatteras Electric Cooperative",
      "applicationUrl": "https://www.chec.coop/sites/default/files/documents/chargepointrebateanddatasharingapp.pdf",
      "websiteUrl": "https://www.chec.coop/EV",
      "sourceUrlsChecked": [
        "https://www.chec.coop/EV",
        "https://www.chec.coop/sites/default/files/documents/chargepointrebateanddatasharingapp.pdf"
      ],
      "evidenceText": "CHEC offers a rebate for members installing a ChargePoint Level 2 charger at a Hatteras Island home, with data sharing required.",
      "reasoningNotes": "The Level 2 EV charger match is correct, but the category should be product-specific because the official rebate is limited to ChargePoint home chargers."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7adc1549dc77d4c9_v1",
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
        "confidence": "medium",
        "formula": "$100 per eligible unit",
        "evidenceText": "ChargePoint L2 Home Charger Rebate Image We are now offering $100 rebates to members who install a Level 2 ChargePoint electric vehicle (EV) home charger in their Hatteras Island home",
        "sourceUrlsChecked": [
          "https://www.chec.coop/ev"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3622",
    "opportunityName": "City of High Point Electric - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3622/city-of-high-point-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.highpointnc.gov/531/Appliance-Rebates",
    "applicationUrl": "https://www.highpointnc.gov/DocumentCenter/View/25744/New-Appliance-Rebate-Request-Form",
    "administrator": "City of High Point Electric",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "NC"
        ],
        "counties": [],
        "cities": [
          "High Point"
        ],
        "utilityTerritories": [
          "City of High Point Electric",
          "City of High Point Water"
        ],
        "notes": "Heat pump rebates require City of High Point electric service; water heater rebates require City water service."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "residential_landlord",
        "residential_property_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "electric_water_heater_replacement"
      ],
      "hardRequirements": [
        "Heat pump applicant must have City of High Point electric service.",
        "Water heater applicant must have City of High Point water service.",
        "Application must be submitted within the specified window and installation must pass City inspection.",
        "Heat pumps must meet the listed SEER2 and tonnage requirements."
      ],
      "blockers": [
        "Commercial businesses are not eligible, even though landlords or businesses that own residential rental property may apply for residential units.",
        "Do not match generic HVAC equipment unrelated to qualifying heat pumps or geothermal heat pumps.",
        "One rebate per five years applies for the same equipment and location."
      ],
      "programType": "Rebate Program",
      "administrator": "City of High Point Electric",
      "applicationUrl": "https://www.highpointnc.gov/DocumentCenter/View/25744/New-Appliance-Rebate-Request-Form",
      "websiteUrl": "https://www.highpointnc.gov/531/Appliance-Rebates",
      "sourceUrlsChecked": [
        "https://www.highpointnc.gov/531/Appliance-Rebates",
        "https://www.highpointnc.gov/DocumentCenter/View/25744/New-Appliance-Rebate-Request-Form"
      ],
      "evidenceText": "High Point appliance rebate sources list residential heat pump tiers, a geothermal heat pump rebate, electric water heater rebate, service requirements, inspection, and filing deadlines.",
      "reasoningNotes": "Geothermal is explicitly supported. Keep HVAC categories limited to qualifying residential heat pump and geothermal measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7c24c9cf7d70c6af_v1",
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
        "formula": "$500 per geothermal heat pump",
        "evidenceText": "High Point heat pump table lists Geothermal Heat Pump rebate at $500.",
        "sourceUrlsChecked": [
          "https://www.highpointnc.gov/531/Appliance-Rebates"
        ],
        "reasoningNotes": "Matched geothermal term. Applies only to residential customers served by City of High Point electric service.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4125",
    "opportunityName": "Piedmont Natural Gas - Residential Equipment Efficiency Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4125/piedmont-natural-gas-residential-equipment-efficiency-program",
    "websiteUrl": "https://www.piedmontng.com/home/save-energy-and-money/residential-energy-efficiency-resources",
    "applicationUrl": "https://gasadvantage-hpp.piedmontng.com/docs/NC_application_rebate.pdf",
    "administrator": "Piedmont Natural Gas",
    "programType": "Rebate Program",
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
          "furnace",
          "high efficiency furnace"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Piedmont Natural Gas service territory"
        ],
        "notes": "North Carolina residential customers in Piedmont Natural Gas service territory."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_natural_gas_furnace",
        "natural_gas_tankless_water_heater"
      ],
      "hardRequirements": [
        "Customer must receive natural gas service from Piedmont Natural Gas in North Carolina.",
        "Equipment must be qualifying new high-efficiency natural gas equipment meeting the listed efficiency tier.",
        "Furnace rebates require qualifying AFUE levels.",
        "Application must be submitted with required invoice and installation documentation within the program deadline, generally 90 days after installation."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement; only specified natural gas equipment is supported.",
        "Electric heat pumps, central air conditioners, insulation, windows, and weatherization are not supported by this opportunity.",
        "Commercial customers are not eligible for the full residential equipment set and are limited to tankless water heater rebates where offered.",
        "Official Piedmont pages and PDFs returned HTTP 403 in direct browser checks, so final measure details should be confirmed by current rebate documents."
      ],
      "programType": "Rebate Program",
      "administrator": "Piedmont Natural Gas",
      "applicationUrl": "https://gasadvantage-hpp.piedmontng.com/docs/NC_application_rebate.pdf",
      "websiteUrl": "https://www.piedmontng.com/home/save-energy-and-money/residential-energy-efficiency-resources",
      "sourceUrlsChecked": [
        "https://www.piedmontng.com/home/save-energy-and-money/residential-energy-efficiency-resources",
        "https://gasadvantage-hpp.piedmontng.com/EnergyEfficiency/?utm_source=",
        "https://gasadvantage-hpp.piedmontng.com/docs/NC_application_rebate.pdf"
      ],
      "evidenceText": "Piedmont sources indicate residential rebates for qualifying new energy-efficient gas equipment, including furnace AFUE tiers and tankless water heaters; commercial eligibility is limited where offered.",
      "reasoningNotes": "The furnace retrofit match is supported when narrowed to qualifying natural gas furnaces. The broad HVAC replacement category is a false positive because the opportunity does not cover all high-efficiency HVAC."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b25837c70f95d6a5_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 22500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$225 per residential natural gas furnace with AFUE 95% or higher",
        "evidenceText": "Piedmont rebate portal lists AFUE 95% or higher furnaces at $225.",
        "sourceUrlsChecked": [
          "https://www.piedmontng.com/home/save-energy-and-money/residential-energy-efficiency-resources"
        ],
        "reasoningNotes": "Matched furnace term. Selected highest published furnace tier.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22454",
    "opportunityName": "Nebraska Public Power District - Go EV",
    "state": "NE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22454/nebraska-public-power-district-go-ev",
    "websiteUrl": "https://nppd.energywisenebraskagoev.com/",
    "applicationUrl": "https://nppd.energywisenebraskagoev.com/",
    "administrator": "Nebraska Public Power District",
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
          "NE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Nebraska Public Power District",
          "NPPD wholesale partner utilities participating in EnergyWise GoEV"
        ],
        "notes": "Eligibility depends on NPPD retail service or a participating wholesale utility."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "business_utility_customer",
        "nonprofit",
        "public_agency",
        "site_host"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "public",
        "nonprofit",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_make_ready_electrical_upgrade",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be served by NPPD or an eligible participating utility.",
        "Residential charger rebates require eligible home charging station documentation and program application.",
        "Residential pre-wiring must support a qualifying 240-volt circuit and meet new or existing construction rules.",
        "Commercial public-use projects must meet public-access, cost, preapproval, and charger-type requirements."
      ],
      "blockers": [
        "Do not match Level 1 charging.",
        "Do not match customers outside NPPD or participating utility service.",
        "Commercial DC fast charging requires preapproval and public-use compliance; do not match private fleet-only DCFC unless program rules allow it."
      ],
      "programType": "Rebate Program",
      "administrator": "Nebraska Public Power District",
      "applicationUrl": "https://nppd.energywisenebraskagoev.com/",
      "websiteUrl": "https://nppd.energywisenebraskagoev.com/",
      "sourceUrlsChecked": [
        "https://nppd.energywisenebraskagoev.com/",
        "https://nppd.energywisenebraskagoev.com/residential-incentives/",
        "https://nppd.energywisenebraska.com/electric-vehicle-charging/",
        "https://nppd.energywisenebraskagoev.com/wp-content/uploads/EVCommercialChargerApplication.pdf",
        "https://programs.dsireusa.org/system/program/detail/22454"
      ],
      "evidenceText": "NPPD GoEV materials support residential home charging station and pre-wiring incentives, plus commercial public-use Level 2 and preapproved DC fast charging incentives.",
      "reasoningNotes": "Keep Level 2 EV charging, add EV make-ready because pre-wiring is explicitly supported, and add DCFC only for the commercial public-use path."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6924b2833ef0ea30_v1",
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
        "formula": "Up to $500 per qualifying Level 2 EV charging station",
        "evidenceText": "NPPD goEV incentive materials identify a $500 Level 2 charging station incentive.",
        "sourceUrlsChecked": [
          "https://nppd.energywisenebraskagoev.com/",
          "https://www.nppd.com/save-money"
        ],
        "reasoningNotes": "Matched Level 2 EV charging term. Confidence is medium because local utility participation and eligibility must be confirmed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22380",
    "opportunityName": "Southern Public Power District - Electric Vehicle Incentives",
    "state": "NE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22380/southern-public-power-district-electric-vehicle-incentives",
    "websiteUrl": "https://southernpd.energywisenebraskagoev.com/",
    "applicationUrl": null,
    "administrator": "Southern Public Power District",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging",
          "charging station",
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
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southern Public Power District"
        ],
        "notes": "Available to qualifying Southern Public Power District customers through Nebraska public-power EV incentive channels."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_make_ready_wiring",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Southern Public Power District customer.",
        "Project must install qualifying EV charging infrastructure or make-ready wiring under the current EnergyWise or goEV incentive rules.",
        "Residential charging incentives are limited to qualifying Level 2 charging and make-ready measures.",
        "Nonresidential incentives may include Level 2, DC fast charging, and make-ready infrastructure."
      ],
      "blockers": [
        "Not an EV vehicle purchase incentive.",
        "Residential customers should not be matched to DC fast charging unless a current official source explicitly allows it.",
        "Customers outside Southern Public Power District territory do not qualify.",
        "Exact rebate amounts and application details should be verified against the current program portal before quoting."
      ],
      "programType": "Rebate Program",
      "administrator": "Southern Public Power District",
      "applicationUrl": null,
      "websiteUrl": "https://southernpd.energywisenebraskagoev.com/",
      "sourceUrlsChecked": [
        "https://southernpd.energywisenebraskagoev.com/",
        "https://southernpd.energywisenebraskagoev.com/public-powers-support/",
        "https://afdc.energy.gov/laws/12415"
      ],
      "evidenceText": "The]( goEV site presents residential and commercial EV incentives for Nebraska public-power customers; federal program data lists SPPD charging and make-ready rebates for residential and nonresidential customers.",
      "reasoningNotes": "Level 2 EV charger matching is supported. Added make-ready wiring and nonresidential DC fast charging with medium confidence because the official portal is current but detailed terms are limited."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e9cfbd4e1a355893_v1",
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
        "formula": "50% of residential Level 2 charging station cost, capped at $500",
        "evidenceText": "EnergyWise Nebraska GoEV materials list Level 2 charging station incentives at 50% of cost up to $500.",
        "sourceUrlsChecked": [
          "https://nppd.energywisenebraskagoev.com/",
          "https://www.nppd.com/save-money"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Local utility participation and charger eligibility must be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1394",
    "opportunityName": "Liberty Utilities (Electric) - Commercial Energy Efficiency Rebate Programs",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1394/liberty-utilities-electric-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://new-hampshire.libertyutilities.com/acworth/commercial/smart-energy-use/electric/electric-programs.html",
    "applicationUrl": null,
    "administrator": "Liberty Utilities",
    "programType": "Rebate And Financing",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Liberty Utilities electric service territory in New Hampshire"
        ],
        "notes": "Available to qualifying Liberty Utilities electric commercial, industrial, and municipal customers through Liberty and NHSaves programs."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "municipal_customer",
        "small_business_customer",
        "large_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "led_lighting_retrofit",
        "lighting_controls",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Liberty Utilities electric customer in New Hampshire.",
        "Small business and large business eligibility may depend on demand thresholds.",
        "Equipment must qualify under current Liberty Utilities or NHSaves commercial electric program rules.",
        "On-bill financing, when used, is separate financing support and subject to terms and availability."
      ],
      "blockers": [
        "Do not match residential projects.",
        "Do not match gas-only measures to the electric commercial program.",
        "Do not treat on-bill financing as a rebate.",
        "Do not match projects outside Liberty Utilities electric territory.",
        "Program offerings are subject to change or cancellation."
      ],
      "programType": "Rebate And Financing",
      "administrator": "Liberty Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://new-hampshire.libertyutilities.com/acworth/commercial/smart-energy-use/electric/electric-programs.html",
      "sourceUrlsChecked": [
        "https://new-hampshire.libertyutilities.com/acworth/commercial/smart-energy-use/electric/electric-programs.html",
        "https://new-hampshire.libertyutilities.com/bath/commercial/smart-energy-use/electric/electric-programs.html",
        "https://nhsaves.com/instant-rebates-new-or-replacement-equipment/",
        "https://www.energy.nh.gov/consumers/energy-efficiency/energy-efficiency-rebates-and-incentives"
      ],
      "evidenceText": "Liberty Utilities describes commercial electric efficiency programs for small, municipal, and large businesses, and NHSaves identifies qualifying commercial HVAC and lighting incentives.",
      "reasoningNotes": "The HVAC and LED lighting matches are supportable for the commercial electric program, with territory and sector limits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_86d652e5068c3a41_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 8500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$85 per wireless thermostat",
        "evidenceText": "2026 NHSaves commercial gas rebate PDF lists wireless thermostat at $85.",
        "sourceUrlsChecked": [
          "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasRebates_Commercial.pdf",
          "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html"
        ],
        "reasoningNotes": "Matched thermostat/control term for Liberty/NHSaves commercial customers.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e67f8dfc4c78f7df_v1",
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
        "formula": "$50 per repaired or replaced steam trap",
        "evidenceText": "2026 NHSaves commercial gas rebate PDF lists steam traps at $50 per repaired/replaced trap.",
        "sourceUrlsChecked": [
          "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasRebates_Commercial.pdf",
          "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html"
        ],
        "reasoningNotes": "Returned because steam traps are a clear commercial prescriptive measure.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22383",
    "opportunityName": "New Hampshire Electric Cooperative - Electric Vehicle Rebates",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22383/new-hampshire-electric-cooperative-electric-vehicle-rebates",
    "websiteUrl": "https://www.nhec.com/electric-vehicle-charging/",
    "applicationUrl": null,
    "administrator": "New Hampshire Electric Cooperative",
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
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "New Hampshire Electric Cooperative electric service territory"
        ],
        "notes": "Limited to NHEC residential member properties with active electric service."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "NHEC residential member with active account",
        "Preapproval required before installation",
        "UL-listed Level 2 EV charging station",
        "Charger must be on an NHEC time-of-use EV rate",
        "NHEC submeter line and meter socket required",
        "Documentation due by program deadline"
      ],
      "blockers": [
        "Generic EV charger matching is too broad; source supports Level 2 only",
        "Non-NHEC customers are not eligible",
        "Nonresidential installations are not covered by this residential rebate",
        "Installations started before preapproval are not eligible",
        "Level 1 chargers and DC fast chargers are not supported by this opportunity"
      ],
      "programType": "Rebate",
      "administrator": "New Hampshire Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.nhec.com/electric-vehicle-charging/",
      "sourceUrlsChecked": [
        "https://www.nhec.com/electric-vehicle-charging/",
        "https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-Residential-Changing-Station-Terms-Conditions-3-11-26-kdc.pdf",
        "https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-Residential-Changing-Instructions-Checklist-3-11-26-kdc.pdf"
      ],
      "evidenceText": "NHEC’s 2026 EV charging materials limit the incentive to preapproved residential members installing UL-listed Level 2 charging stations on an NHEC time-of-use EV rate with submetering.",
      "reasoningNotes": "Keep only the Level 2 EVSE category. The generic EV charger category is blocked because the official terms are Level 2-specific."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f9d86e56eb0e476f_v1",
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
        "cap": {
          "maxAmountCents": 60000
        },
        "confidence": "high",
        "formula": "$300 per Level 2 home charging station enrolled in off-peak rate",
        "evidenceText": "NHEC EV charging page states a $300 post-installation rebate for a Level II home charging station enrolled in off-peak rate.",
        "sourceUrlsChecked": [
          "https://www.nhec.com/electric-vehicle-charging/",
          "https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-Residential-Changing-Instructions-Checklist-3-11-26-kdc.pdf"
        ],
        "reasoningNotes": "Matched Level 2 EVSE terms. Source allows up to two stations; use one unit per qualifying charging station.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22101",
    "opportunityName": "Oklahoma Natural Gas - Residential efficiency rebates",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22101/oklahoma-natural-gas-residential-efficiency-rebates",
    "websiteUrl": "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates",
    "applicationUrl": "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/rebate-applications",
    "administrator": "Oklahoma Natural Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "Oklahoma Natural Gas"
        ],
        "notes": "Individually metered residential homes served by Oklahoma Natural Gas; some appliance materials also mention current or prospective customers/builders."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "prospective_customer",
        "homeowner",
        "builder",
        "property_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "natural_gas_boiler_replacement",
        "natural_gas_water_heater_replacement",
        "natural_gas_clothes_dryer",
        "natural_gas_range_oven"
      ],
      "hardRequirements": [
        "Heating rebate applicant must have an active Oklahoma Natural Gas account.",
        "Heating system rebate is for a new natural gas heating system in a new or existing individually metered residential home.",
        "High-efficiency heating tiers require a 95%+ efficient natural gas furnace or boiler.",
        "Installation must be completed by an Oklahoma-licensed contractor.",
        "Application, AHRI certificate for heating equipment, receipt, and contractor invoice must be submitted within 180 days after installation.",
        "Only qualified natural gas equipment is eligible and funds are limited on a first-come, first-served basis."
      ],
      "blockers": [
        "Do not match electric heat pumps except when the measure is replacing an electric heat pump with a new natural gas furnace and air conditioner.",
        "Do not match broad HVAC, cooling-only equipment, weatherization, EV charging, solar, or battery storage.",
        "Appliance rebates are product-specific and should not be generalized to commercial kitchen or broad appliance categories."
      ],
      "programType": "Rebate Program",
      "administrator": "Oklahoma Natural Gas",
      "applicationUrl": "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/rebate-applications",
      "websiteUrl": "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates",
        "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates/residential-rebates-heating-system",
        "https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/rebate-applications",
        "https://www.oklahomanaturalgas.com/media/ONG/Rebates/ONG-Rebate-App-2026.pdf",
        "https://www.oklahomanaturalgas.com/media/ONG/EEPLearnMore/Homeowner/ONG-Rebate_App_EE_WaterHeater_Learn_2026.pdf",
        "https://www.oklahomanaturalgas.com/media/ONG/EEPLearnMore/Homeowner/ONG-Rebate_App_EE_Range_Learn_2026.pdf"
      ],
      "evidenceText": "ONG’s]( residential pages list ranges, dryers, water heaters and heating systems; heating rebates require qualified natural gas furnace or boiler equipment.",
      "reasoningNotes": "Furnace is valid, but the HVAC category should be narrowed to natural-gas furnace/boiler and product-specific gas appliances."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2fe7020cf31fd18d_v1",
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
        "formula": "$550 per 95%+ AFUE natural gas furnace or boiler",
        "evidenceText": "Oklahoma Natural Gas heating rebates list $550 for a 95% or greater AFUE natural gas furnace or boiler.",
        "sourceUrlsChecked": [
          "https://www.oklahomanaturalgas.com/save-money/rebates/heating-rebates"
        ],
        "reasoningNotes": "Matched furnace term. Standard high-efficiency furnace/boiler rebate selected.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22369",
    "opportunityName": "Public Service Company of Oklahoma Electric Car Charger Rebate",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22369/public-service-company-of-oklahoma-electric-car-charger-rebate",
    "websiteUrl": "https://powerforwardwithpso.com/rebate/energy-star-certified-electric-vehicle-ev-level-2-charger/?category=Appliances+%26amp%3B+Equipment&link=appliances-equipment",
    "applicationUrl": "https://pso-esp.com/",
    "administrator": "Public Service Company of Oklahoma",
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Public Service Company of Oklahoma"
        ],
        "notes": "Limited to eligible PSO residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_pso_customers",
        "homeowners_or_renters_with_service_account"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_level_2_smart_ev_charger",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a PSO residential customer.",
        "Charger must be an ENERGY STAR certified Level 2 smart EV charger.",
        "Online rebate application is required.",
        "Product must have been purchased within the program's recent-purchase window.",
        "Receipt and qualifying model documentation are required."
      ],
      "blockers": [
        "Do not match commercial chargers, fleet charging, or DC fast charging.",
        "Do not match non-ENERGY STAR or non-Level 2 chargers.",
        "Do not treat Charge Choice bill credits as a charger installation rebate.",
        "Do not match electric vehicle purchase incentives."
      ],
      "programType": "Rebate Program",
      "administrator": "Public Service Company of Oklahoma",
      "applicationUrl": "https://pso-esp.com/",
      "websiteUrl": "https://powerforwardwithpso.com/rebate/energy-star-certified-electric-vehicle-ev-level-2-charger/?category=Appliances+%26amp%3B+Equipment&link=appliances-equipment",
      "sourceUrlsChecked": [
        "https://powerforwardwithpso.com/rebate/energy-star-certified-electric-vehicle-ev-level-2-charger/?category=Appliances+%26amp%3B+Equipment&link=appliances-equipment",
        "https://pso-esp.com/",
        "https://charge.weavegrid.com/"
      ],
      "evidenceText": "PSO's rebate page is for a $200 ENERGY STAR certified EV Level 2 smart charger rebate for residential customers with recent purchase and receipt documentation.",
      "reasoningNotes": "The Level 2 residential smart EV charger match is source-backed. Keep the product-specific category and avoid broader charging infrastructure matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ef5ce8047fa2aff3_v1",
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
        "formula": "$200 per ENERGY STAR certified Level 2 Smart EV charger",
        "evidenceText": "PSO rebate listing shows ENERGY STAR Certified Level 2 Smart EV Charger at $200.",
        "sourceUrlsChecked": [
          "https://powerforwardwithpso.com/rebates/",
          "https://powerforwardwithpso.com/rebate/energy-star-certified-electric-vehicle-ev-level-2-charger/"
        ],
        "reasoningNotes": "Matched EVSE and Level 2 terms. Applies to eligible residential smart Level 2 EV chargers.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22370",
    "opportunityName": "Central Lincoln PUD Electric Vehicle Charging Station Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22370/central-lincoln-pud-electric-vehicle-charging-station-rebate-program",
    "websiteUrl": "https://clpud.org/energy-efficiency/ev-charging-station-rebate/",
    "applicationUrl": null,
    "administrator": "Central Lincoln PUD",
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Central Lincoln PUD"
        ],
        "notes": "The official program page was partially inaccessible, but official indexed text confirms an EV charging rebate for qualifying Central Lincoln customers."
      },
      "eligibleApplicantTypes": [
        "electric_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_240v_outlet_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Central Lincoln PUD customer.",
        "Eligible work is limited to a wall-mounted Level 2 charging station or a 240-volt outlet.",
        "Installation must be completed by a licensed electrician.",
        "Customer must follow current Central Lincoln rebate terms."
      ],
      "blockers": [
        "Official sector limits could not be fully verified from the inaccessible page and should be confirmed before matching edge cases.",
        "Level 1-only charging is not supported.",
        "General electrical upgrades unrelated to EV charging are not eligible.",
        "Locations outside Central Lincoln PUD territory are not eligible."
      ],
      "programType": "Rebate",
      "administrator": "Central Lincoln PUD",
      "applicationUrl": null,
      "websiteUrl": "https://clpud.org/energy-efficiency/ev-charging-station-rebate/",
      "sourceUrlsChecked": [
        "https://clpud.org/energy-efficiency/ev-charging-station-rebate/",
        "https://programs.dsireusa.org/system/program/detail/22370/central-lincoln-pud-electric-vehicle-charging-station-rebate-program"
      ],
      "evidenceText": "Official indexed text says the rebate applies to a wall-mounted Level 2 charging station or a 240-volt outlet installed by a licensed electrician.",
      "reasoningNotes": "The EV charging match is supported, but confidence is medium because the current official page could not be fully read for all eligibility boundaries."
    },
    "existingSimpleRules": [
      {
        "id": "oir_eee32240d558a352_v1",
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
        "formula": "$250 per eligible Level 2 EV charger",
        "evidenceText": "Oregon EV incentive listing states Central Lincoln offers a $250 Level 2 charger rebate.",
        "sourceUrlsChecked": [
          "https://goelectric.oregon.gov/incentives-rebates/central-lincoln-ev-charger-rebate",
          "https://clpud.org/energy-efficiency/rebates/"
        ],
        "reasoningNotes": "Matched EVSE and Level 2 terms. Confidence is medium because the official utility page did not expose amount in fetched text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22558",
    "opportunityName": "Emerald PUC Electric Vehicle Charger Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22558/emerald-puc-electric-vehicle-charger-rebate-program",
    "websiteUrl": "https://epud.chooseev.com/promos/",
    "applicationUrl": null,
    "administrator": "Emerald People's Utility District",
    "programType": "Residential EV Charger Rebate",
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Emerald People's Utility District"
        ],
        "notes": "Eligible only for Emerald-served homes with permanent electric service."
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
        "Install a new qualifying Wi-Fi connected or ENERGY STAR Connected Level 2 240V charger at the service address.",
        "EV must be registered to the same Emerald service address.",
        "Customer must enroll in the time-of-day schedule when available.",
        "Application and documentation must be submitted within the required post-installation window."
      ],
      "blockers": [
        "Commercial, workplace, public, or multifamily chargers are not supported by this residential rebate.",
        "Installation infrastructure, electrical upgrades, and corded higher-powered mobile chargers are not eligible costs.",
        "Level 1 chargers and reused or non-NRTL equipment do not qualify."
      ],
      "programType": "Residential EV Charger Rebate",
      "administrator": "Emerald People's Utility District",
      "applicationUrl": null,
      "websiteUrl": "https://epud.chooseev.com/promos/",
      "sourceUrlsChecked": [
        "https://epud.chooseev.com/promos/",
        "https://www.epud.org/res-level-2-electric-car-charger-inc/"
      ],
      "evidenceText": "Official program page offers up to $200 for a qualifying connected Level 2 home charger for Emerald customers, with vehicle registration and equipment requirements.",
      "reasoningNotes": "Preserve only the Level 2 home charger match; installation infrastructure and nonresidential EVSE are false positives. Input targets supplied in uploaded file ."
    },
    "existingSimpleRules": [
      {
        "id": "oir_86ab7f66903d4f0b_v1",
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
        "confidence": "medium",
        "formula": "Up to $200 per Wi-Fi connected or ENERGY STAR Level 2 charger",
        "evidenceText": "Emerald PUD EV rebate listing says up to $200 for Wi-Fi connected or ENERGY STAR Level 2 chargers.",
        "sourceUrlsChecked": [
          "https://ev.chooseev.com/emerald-pud/rebates/",
          "https://www.epud.org/electric-vehicles/"
        ],
        "reasoningNotes": "Matched EVSE and Level 2 terms. Confidence is medium because the utility page did not expose the amount in fetched text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22373",
    "opportunityName": "Eugene Water & Electric Board - Electric Vehicle Charging Station Smart Charge Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22373/eugene-water-and-electric-board-electric-vehicle-charging-station-smart-charge-program",
    "websiteUrl": "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business",
    "applicationUrl": "https://myaccount.eweb.org/",
    "administrator": "Eugene Water & Electric Board",
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
          "OR"
        ],
        "counties": [],
        "cities": [
          "Eugene"
        ],
        "utilityTerritories": [
          "Eugene Water & Electric Board"
        ],
        "notes": "Limited to EWEB electric customers and qualifying sites in the EWEB service area."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "multifamily_property_owners",
        "multifamily_property_managers"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "public_level_2_evse_installation",
        "ev_charger_demand_response_capable_equipment"
      ],
      "hardRequirements": [
        "Eligible residential chargers must be Level 2, NRTL-listed, permitted and inspected, and installed for an EWEB residential account.",
        "Residential rebate applications must be submitted within the required post-installation window.",
        "Business-side multifamily rebates require commercial-grade, public Level 2 EVSE at a qualifying multifamily property.",
        "Multifamily EVSE must meet networking, OCPP or OpenADR, demand response, connector, and inspection requirements."
      ],
      "blockers": [
        "EWEB distribution upgrades are separate from the Smart Charge rebate and may remain the customer's responsibility.",
        "ODOT Community Charging, Oregon DEQ, and federal EV programs are separate programs, not EWEB rebate categories.",
        "Current EWEB Smart Charge pages do not support DC fast charging as an EWEB rebate category."
      ],
      "programType": "EV Charger Rebate",
      "administrator": "Eugene Water & Electric Board",
      "applicationUrl": "https://myaccount.eweb.org/",
      "websiteUrl": "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business",
      "sourceUrlsChecked": [
        "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives",
        "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business"
      ],
      "evidenceText": "EWEB lists Smart Charge rebates for residential Level 2 home chargers and qualifying commercial-grade public Level 2 multifamily EVSE.",
      "reasoningNotes": "Keep Level 2 EVSE categories and narrow business eligibility to current multifamily public charging rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f92816496d424d54_v1",
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
        "evidenceText": "Oregon Clean Vehicle Rebate Program The Oregon Department of Environmental Quality's Oregon Clean Vehicle and Charge Ahead Rebate programs can save Oregonians up to $7,500 on the purchase or lease of a qualifying electric vehicle",
        "sourceUrlsChecked": [
          "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3136",
    "opportunityName": "OTEC - Agricultural Energy Efficiency Rebate Programs",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3136/otec-agricultural-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.otec.coop/agriculture-rebates",
    "applicationUrl": "https://www.otec.coop/agriculture-rebates",
    "administrator": "Oregon Trail Electric Cooperative",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Oregon Trail Electric Cooperative service territory"
        ],
        "notes": "Agriculture rebates are limited to OTEC member accounts and agricultural uses."
      },
      "eligibleApplicantTypes": [
        "agricultural_members",
        "farmers",
        "ranchers",
        "otec_member_owners"
      ],
      "eligibleSectors": [
        "agriculture"
      ],
      "eligibleRetrofitCategories": [
        "efficient_pump_replacement",
        "variable_frequency_drive_retrofit",
        "agricultural_irrigation_sprinkler_upgrade",
        "agricultural_stock_water_tank",
        "thermostatically_controlled_outlet"
      ],
      "hardRequirements": [
        "Applicant must be an OTEC member with qualifying agricultural use",
        "Online rebate application and invoice are required",
        "VFD measures must be installed on qualifying agricultural pumps and meet horsepower and equipment rules",
        "Pump replacement measures must replace an old pump and meet pump-curve and horsepower rules",
        "Inspection or harmonics testing may be required for specified pump projects"
      ],
      "blockers": [
        "Residential and standard commercial rebates are separate OTEC programs",
        "Non-agricultural pump and VFD projects are not eligible under this opportunity",
        "Equipment outside horsepower or pump-type requirements is blocked",
        "Applications without required invoice or documentation are not eligible"
      ],
      "programType": "Rebate",
      "administrator": "Oregon Trail Electric Cooperative",
      "applicationUrl": "https://www.otec.coop/agriculture-rebates",
      "websiteUrl": "https://www.otec.coop/agriculture-rebates",
      "sourceUrlsChecked": [
        "https://www.otec.coop/agriculture-rebates",
        "https://www.otec.coop/agricultural"
      ],
      "evidenceText": "OTEC’s agriculture rebate page supports VFDs added to agricultural pumps, pump upgrades, irrigation sprinkler upgrades, stock water tanks, and thermostatically controlled outlets for agricultural members.",
      "reasoningNotes": "Pump replacement and VFD matches are source-backed, but only in agricultural OTEC service contexts."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f31b084a80d3db74_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 4000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$40 per horsepower for adding a VFD to an existing agricultural pump",
        "evidenceText": "VFD add-to-existing-pump packet states: \"Rebate is $40 per HP.\"",
        "sourceUrlsChecked": [
          "https://www.otec.coop/agriculture-rebates",
          "https://www.otec.coop/sites/default/files/vfd-adding-to-an-existing-pump-packet-fillable-6_22.pdf"
        ],
        "reasoningNotes": "Target terms are variable frequency drive and pump replacement. Use unit_count as eligible connected pump horsepower.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
