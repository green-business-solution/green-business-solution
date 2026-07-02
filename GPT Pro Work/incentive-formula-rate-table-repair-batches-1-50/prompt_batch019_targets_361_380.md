You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 19
Targets in this prompt: 361-380 of 984
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
  "batchNumber": 19,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22275"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5215",
    "opportunityName": "Xcel Energy (Electric) - Commercial Energy Efficiency Rebate Program",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5215/xcel-energy-electric-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates",
    "applicationUrl": null,
    "administrator": "Xcel Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_air_compressor",
        "displayName": "Efficient air compressor",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air compressor"
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
          "audit"
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
          "lighting retrofit"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy New Mexico",
          "Southwestern Public Service Company"
        ],
        "notes": "Facilities must be in Xcel Energy New Mexico electric service territory with an active business electric account."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "municipal_customer",
        "nonprofit_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "nonprofit",
        "public"
      ],
      "eligibleRetrofitCategories": [
        "efficient_air_compressor",
        "vfd_motor_drive",
        "high_efficiency_motor",
        "led_lighting_retrofit",
        "lighting_controls",
        "energy_audit",
        "building_tune_up",
        "commercial_hvac_cooling_upgrade",
        "refrigeration_efficiency_upgrade",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an Xcel Energy New Mexico business electric customer.",
        "Project must be located in the New Mexico service territory on an active electric account.",
        "Equipment must meet the applicable prescriptive or custom program requirements.",
        "Preapproval is required for custom, study, and some non-prescriptive projects.",
        "Energy studies and audits are non-physical services and should be treated separately from installed measures."
      ],
      "blockers": [
        "Residential appliances, home weatherization, and residential HVAC are not part of this commercial electric program.",
        "Energy audit or study matching should not be counted as a physical retrofit.",
        "Kitchen, refrigeration, compressed-air, and motor measures are commercial or industrial only.",
        "Programs and measure lists can change; verify the current New Mexico business summary before final incentive commitment."
      ],
      "programType": "Rebate Program",
      "administrator": "Xcel Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates",
      "sourceUrlsChecked": [
        "https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Marketing/nm-business-programs-summary.pdf",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Programs%20and%20Rebates/Business/NM-Biz-Programs-Summary.pdf",
        "https://programs.dsireusa.org/system/program/detail/5215/xcel-energy-electric-commercial-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Xcel New Mexico business materials list lighting, building tune-up, motors, drives, compressed air, cooling, refrigeration, custom efficiency, and study offerings for business electric customers.",
      "reasoningNotes": "The supplied air compressor, lighting, and audit matches are correct, but the audit is a non-physical service and the opportunity is strictly commercial or industrial."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a0d6e426403c00a4_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 300000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$3,000 per eligible unit",
        "evidenceText": "• Pump-Off Controllers The pump-off controllers must be new units Rebates of up to $3,000/unit",
        "sourceUrlsChecked": [
          "https://www.xcelenergy.com/staticfiles/xe-responsive/Marketing/nm-business-programs-summary.pdf"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22456",
    "opportunityName": "PECO - Commercial Charger Rebate Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22456/peco-commercial-charger-rebate-program",
    "websiteUrl": "https://energycenter.org/program/peco-evsmart-charging-rebate",
    "applicationUrl": "https://peco.chooseev.com/promos/",
    "administrator": "PECO / Center for Sustainable Energy",
    "programType": "Rebate/Make-Ready Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "electric vehicle charging"
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
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "PECO electric service territory"
        ],
        "notes": "Applies to eligible PECO commercial and industrial electric customers in southeastern Pennsylvania; enhanced terms may depend on Environmental Justice Area or public-benefit qualification."
      },
      "eligibleApplicantTypes": [
        "PECO commercial electric customers",
        "PECO industrial electric customers",
        "commercial property owners",
        "business tenants with installation authority",
        "local governments",
        "public agencies",
        "501(c)(3) nonprofits",
        "public transit agencies",
        "site hosts installing eligible public or workplace charging"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public_sector",
        "nonprofit",
        "transportation",
        "workplace_charging",
        "public_charging"
      ],
      "eligibleRetrofitCategories": [
        "ev_charging_level_2_commercial",
        "ev_charging_dc_fast_public_benefit",
        "commercial_ev_make_ready",
        "public_benefit_ev_charging",
        "dcfc_demand_charge_discount_limited"
      ],
      "hardRequirements": [
        "Applicant must be a PECO commercial or industrial electric customer on an eligible rate.",
        "Level 2 and public-benefit EV charging incentives require pre-application or approval before construction or installation begins.",
        "Participants must provide required EV charging data reporting for the term required by the program administrator.",
        "Enhanced Level 2 rebates may require installation in Environmental Justice Areas or satisfaction of public-benefit criteria.",
        "Public-benefit DCFC or Level 2 incentives are limited by eligible project-cost caps and annual customer caps.",
        "Current program information identifies funding through May 31, 2029, subject to caps and program rules."
      ],
      "blockers": [
        "The legacy PECO L3 page in the DSIRE record is stale or not sufficiently descriptive as a current primary source; current program information is through PECO EVsmart/ChooseEV and the program administrator page.",
        "This is a commercial charging infrastructure program and should not be matched to residential EV purchase rebates.",
        "PECO Smart Driver EV purchase notification rebates are a separate program and were not merged into this commercial charger record.",
        "The DCFC demand charge discount is a separate rate discount and should not be treated as an upfront equipment rebate.",
        "No building HVAC, lighting, envelope, water or refrigeration retrofit categories are supported by this record."
      ],
      "programType": "Rebate/Make-Ready Program",
      "administrator": "PECO / Center for Sustainable Energy",
      "applicationUrl": "https://peco.chooseev.com/promos/",
      "websiteUrl": "https://energycenter.org/program/peco-evsmart-charging-rebate",
      "sourceUrlsChecked": [
        "https://www.peco.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehiclesL3.aspx",
        "https://energycenter.org/program/peco-evsmart-charging-rebate",
        "https://peco.chooseev.com/promos/",
        "https://solutions.peco-energy.com/EVinfo",
        "https://programs.dsireusa.org/system/program/detail/22456/peco-commercial-charger-rebate-program"
      ],
      "evidenceText": "PECO EVsmart Charging Rebate materials describe a commercial and industrial EV charging rebate in PECO service territory, with Level 2 commercial charging, enhanced Environmental Justice Area terms, public-benefit charging support, eligible Level 2 and DCFC cases, pre-application requirements, data reporting and funding through May 31, 2029.",
      "reasoningNotes": "The opportunity is active, but the current official replacement sources show it is strictly commercial EV charging infrastructure and public-benefit charging, not a general EV or building-efficiency rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_203e158f14a9a446_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 300000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$3,000 per Level 2 port in Environmental Justice areas",
        "evidenceText": "PECO EVsmart materials list $3,000 per port for EV chargers in Environmental Justice areas.",
        "sourceUrlsChecked": [
          "https://solutions.peco-energy.com/EVinfo",
          "https://peco.chooseev.com/promos/",
          "https://energycenter.org/program/peco-evsmart-charging-rebate"
        ],
        "reasoningNotes": "Returned separately because Environmental Justice projects receive an enhanced per-port amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_42298d25f20836d8_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 200000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$2,000 per Level 2 commercial EV charging port",
        "evidenceText": "PECO EVsmart materials list $2,000 per port for Level 2 commercial EV charging.",
        "sourceUrlsChecked": [
          "https://solutions.peco-energy.com/EVinfo",
          "https://peco.chooseev.com/promos/",
          "https://energycenter.org/program/peco-evsmart-charging-rebate"
        ],
        "reasoningNotes": "Matched commercial Level 2 charging and make-ready terms. Use one unit as one charging port.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3240",
    "opportunityName": "PECO Energy (Gas) - Residential Heating Efficiency Rebate Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3240/peco-energy-gas-residential-heating-efficiency-rebate-program",
    "websiteUrl": "https://pecohomerebateprogram.com/heating-cooling-rebates.html",
    "applicationUrl": "https://www.pecoeeportal.com/peco/s/rebatesdiscounts?language=en_US",
    "administrator": "PECO Energy",
    "programType": "Rebate Program",
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
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "PECO residential natural gas service territory"
        ],
        "notes": "Natural gas heating rebates are for PECO residential natural gas customers."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "homeowner",
        "tenant_with_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_natural_gas_furnace_retrofit",
        "high_efficiency_natural_gas_boiler_retrofit",
        "natural_gas_heating_conversion",
        "ecm_fan_motor"
      ],
      "hardRequirements": [
        "Residence must receive PECO residential natural gas service for gas heating rebates.",
        "Equipment must be new and meet the stated ENERGY STAR or AFUE requirements.",
        "Boiler and furnace rebate levels depend on the listed efficiency thresholds and configuration.",
        "Applications for newer installations must be submitted within the current deadline window.",
        "Paid receipt, model information, and required documentation must be provided."
      ],
      "blockers": [
        "Do not match broad high-efficiency HVAC replacement beyond PECO's listed residential natural gas furnace and boiler measures.",
        "Electric heat pumps, central air conditioners, and ductless mini-splits are PECO electric rebate measures, not this gas heating opportunity.",
        "Propane, oil, non-PECO gas, and commercial projects should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "PECO Energy",
      "applicationUrl": "https://www.pecoeeportal.com/peco/s/rebatesdiscounts?language=en_US",
      "websiteUrl": "https://pecohomerebateprogram.com/heating-cooling-rebates.html",
      "sourceUrlsChecked": [
        "https://pecohomerebateprogram.com/heating-cooling-rebates.html",
        "https://www.pecoeeportal.com/peco/s/rebatesdiscounts?language=en_US"
      ],
      "evidenceText": "PECO's home rebate page lists residential natural gas furnace and boiler rebates with AFUE thresholds, plus conversion and ECM-related requirements for qualifying natural gas customers.",
      "reasoningNotes": "The furnace and boiler matches are supported. The broad HVAC category should be narrowed to the specific residential natural gas heating measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_15eb5e22b3089599_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 35000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$350 per qualifying natural gas boiler",
        "evidenceText": "PECO/DSIRE materials list natural gas boiler rebate at $350.",
        "sourceUrlsChecked": [
          "https://www.pecoeeportal.com/peco/s/rebatesdiscounts?language=en_US"
        ],
        "reasoningNotes": "Matched boiler term. Returned separately from furnace tier.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b4a4296448f6e0a4_v1",
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
        "formula": "$600 per qualifying natural gas furnace at the highest PECO tier",
        "evidenceText": "PECO/DSIRE materials list natural gas furnace rebates from $350 to $600.",
        "sourceUrlsChecked": [
          "https://www.pecoeeportal.com/peco/s/rebatesdiscounts?language=en_US"
        ],
        "reasoningNotes": "Matched furnace term. Medium because exact tier depends on efficiency and final official portal selection.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2099",
    "opportunityName": "Palmetto Electric Cooperative - Buried Treasure Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2099/palmetto-electric-cooperative-buried-treasure-rebate-program",
    "websiteUrl": "https://www.palmetto.coop/buried-treasure",
    "applicationUrl": null,
    "administrator": "Palmetto Electric Cooperative",
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Palmetto Electric Cooperative service territory"
        ],
        "notes": "Restricted to Palmetto Electric Cooperative members, with possible service-area restrictions."
      },
      "eligibleApplicantTypes": [
        "cooperative_member",
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump"
      ],
      "hardRequirements": [
        "Applicant must be a Palmetto Electric Cooperative member.",
        "Project must install a qualified ground source heat pump system.",
        "Member should work with a licensed heat pump contractor.",
        "Program form must be returned before installation.",
        "Installation must meet local codes, Palmetto requirements, and final inspection requirements.",
        "Rebate is 200 dollars per ton up to 1000 dollars per household."
      ],
      "blockers": [
        "Do not match conventional air-source heat pumps or dual-fuel heat pumps under this Buried Treasure program.",
        "Do not match broad high-efficiency HVAC replacement beyond qualified ground source systems.",
        "Palmetto's dual-fuel heat pump and water-heater offers are separate programs.",
        "Post-install applications without required prior program process should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Palmetto Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.palmetto.coop/buried-treasure",
      "sourceUrlsChecked": [
        "https://www.palmetto.coop/buried-treasure",
        "https://www.palmetto.coop/programs-services"
      ],
      "evidenceText": "Palmetto Electric's Buried Treasure page states that the program helps members install ground source heat pumps and offers 200 dollars per ton up to 1000 dollars per household.",
      "reasoningNotes": "Only ground source geothermal heat pumps are supported for this opportunity. Generic heat pump and broad HVAC matches are false positives for this specific program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ff9c433eea38da43_v1",
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
        "confidence": "medium",
        "formula": "$1,000 per eligible unit",
        "evidenceText": "Rebates of $200 per ton (up to $1,000 per household) are available and are offered to cooperative members who install qualified systems",
        "sourceUrlsChecked": [
          "https://www.palmetto.coop/buried-treasure"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3918",
    "opportunityName": "Montana-Dakota Utilities (Gas) - Residential Energy Efficiency Rebate Program",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3918/montana-dakota-utilities-gas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/",
    "applicationUrl": null,
    "administrator": "Montana-Dakota Utilities Co.",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Montana-Dakota Utilities natural gas service territory in South Dakota"
        ],
        "notes": "South Dakota residential natural gas incentives are separate from Montana electric and North Dakota/Wyoming offerings."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "homebuilder"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_natural_gas_furnace_retrofit",
        "programmable_or_wifi_thermostat"
      ],
      "hardRequirements": [
        "Home must be served by or converting to Montana-Dakota Utilities natural gas in South Dakota.",
        "Natural gas furnace rebate requires at least 95 percent AFUE.",
        "Thermostat rebate is limited to qualifying programmable or Wi-Fi thermostat tiers.",
        "Rebate payment is subject to funding availability and program rules."
      ],
      "blockers": [
        "Do not match broad high-efficiency HVAC replacement beyond qualifying natural gas furnaces and thermostats.",
        "Do not match boilers, air conditioning, heat pumps, insulation, or water-heating measures under this South Dakota gas residential offer.",
        "North Dakota and Wyoming residential customers are not eligible for these residential efficiency incentives."
      ],
      "programType": "Rebate Program",
      "administrator": "Montana-Dakota Utilities Co.",
      "applicationUrl": null,
      "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/",
      "sourceUrlsChecked": [
        "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/"
      ],
      "evidenceText": "The official MDU home savings page lists South Dakota residential natural gas incentives for 95 percent AFUE or higher natural gas furnaces and Tier 1 or Tier 2 programmable or Wi-Fi thermostats.",
      "reasoningNotes": "The furnace and thermostat matches are supported, but the broader high-efficiency HVAC replacement category should be narrowed to the listed gas furnace and thermostat products."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7d2b18074ca4923a_v1",
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
        "confidence": "medium",
        "formula": "$300 per 95%+ AFUE natural gas furnace",
        "evidenceText": "Montana-Dakota South Dakota materials list 95% or greater AFUE furnace rebate at $300.",
        "sourceUrlsChecked": [
          "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/",
          "https://www.montana-dakota.com/wp-content/uploads/PDFs/Brochures/2021/july/2021-05-27_mdu_sd_gas_energy_efficiency_programs.pdf"
        ],
        "reasoningNotes": "Matched furnace term. Use one unit as one eligible furnace.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_cc7eeb0542b98985_v1",
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
        "confidence": "medium",
        "formula": "$60 per Tier 2 programmable setback thermostat",
        "evidenceText": "Montana-Dakota South Dakota materials list Tier 2 thermostat rebate at $60.",
        "sourceUrlsChecked": [
          "https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/",
          "https://www.montana-dakota.com/wp-content/uploads/PDFs/Brochures/2021/july/2021-05-27_mdu_sd_gas_energy_efficiency_programs.pdf"
        ],
        "reasoningNotes": "Matched thermostat term. Confidence is medium because detailed amount is from program brochure/PDF.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22394",
    "opportunityName": "Austin Energy - Multifamily EV Charging Station Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22394/austin-energy-multifamily-ev-charging-station-rebate-program",
    "websiteUrl": "https://austinenergy.com/green-power/plug-in-austin/workplace-charging",
    "applicationUrl": "https://rebates.austinenergy.com/",
    "administrator": "Austin Energy",
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy"
        ],
        "notes": "Available to eligible Austin Energy commercial account holders for multifamily properties in the Austin Energy service area."
      },
      "eligibleApplicantTypes": [
        "multifamily_property_owner",
        "property_manager",
        "commercial_account_holder",
        "authorized_representative"
      ],
      "eligibleSectors": [
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Austin Energy commercial account holder or authorized representative.",
        "Property must be multifamily, business or nonprofit property as applicable to the EV charger rebate.",
        "Charging station must be new, approved, networked or OCPP-compliant where required, and properly permitted and inspected.",
        "Rebate amount is subject to charger type, caps, percentage limits and station count limits.",
        "Application must meet Austin Energy timing, inspection, activation and documentation requirements."
      ],
      "blockers": [
        "Make-ready costs are not supported as a standalone matched retrofit for this Austin Energy charger rebate.",
        "Station upgrades and leased stations should not match unless current Austin Energy terms expressly allow them.",
        "Single-family residential EV charger rebates are a separate program path.",
        "DC fast charging support is subject to public-access and other Austin Energy requirements."
      ],
      "programType": "EV Charging Rebate",
      "administrator": "Austin Energy",
      "applicationUrl": "https://rebates.austinenergy.com/",
      "websiteUrl": "https://austinenergy.com/green-power/plug-in-austin/workplace-charging",
      "sourceUrlsChecked": [
        "https://austinenergy.com/green-power/plug-in-austin/workplace-charging",
        "https://rebates.austinenergy.com/"
      ],
      "evidenceText": "Austin Energy's business EV charger rebate page includes multi-family properties and lists eligible OCPP stations including EV-dedicated Level 1, Level 2 and DC fast chargers with per-station caps.",
      "reasoningNotes": "The supplied EV charger categories are supported, but Level 1 should be added and make-ready should be blocked because the rebate is for charging stations rather than electrical make-ready."
    },
    "existingSimpleRules": [
      {
        "id": "oir_929ff6e4b3c948b6_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 500000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $5,000 per OCPP-compliant DC fast charging station",
        "evidenceText": "Austin Energy business EV charger rebate table lists DC Fast at up to $5,000 per station.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/commercial/ev-charging-station-rebate"
        ],
        "reasoningNotes": "Matched DC fast charger term. Distinct charger amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e8877e2fb2a3a0d2_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 300000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $3,000 per OCPP-compliant Level 2 charging station",
        "evidenceText": "Austin Energy business EV charger rebate table lists Level 2 at up to $3,000 per station.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/commercial/ev-charging-station-rebate"
        ],
        "reasoningNotes": "Matched multifamily Level 2 charging terms. Medium because source says up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22395",
    "opportunityName": "Austin Energy - Workplace EV Charging Station Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22395/austin-energy-workplace-ev-charging-station-rebate-program",
    "websiteUrl": "https://austinenergy.com/green-power/plug-in-austin/workplace-charging",
    "applicationUrl": "https://rebates.austinenergy.com/",
    "administrator": "Austin Energy",
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy"
        ],
        "notes": "Available to eligible Austin Energy commercial account holders for workplace, business and nonprofit charging sites."
      },
      "eligibleApplicantTypes": [
        "commercial_account_holder",
        "business_owner",
        "employer",
        "nonprofit",
        "authorized_representative"
      ],
      "eligibleSectors": [
        "commercial",
        "workplace",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Austin Energy commercial account holder or authorized representative.",
        "Site must be a qualifying business, nonprofit or workplace charging location.",
        "Charging station must be new, approved, networked or OCPP-compliant where required, and properly permitted and inspected.",
        "Rebate amount is subject to charger type, caps, percentage limits and station count limits.",
        "Application must meet Austin Energy timing, inspection, activation and documentation requirements."
      ],
      "blockers": [
        "Make-ready costs are not supported as a standalone matched retrofit for this Austin Energy charger rebate.",
        "Station upgrades and leased stations should not match unless current Austin Energy terms expressly allow them.",
        "Single-family residential EV charger rebates are a separate program path.",
        "DC fast charging support is subject to public-access and other Austin Energy requirements."
      ],
      "programType": "EV Charging Rebate",
      "administrator": "Austin Energy",
      "applicationUrl": "https://rebates.austinenergy.com/",
      "websiteUrl": "https://austinenergy.com/green-power/plug-in-austin/workplace-charging",
      "sourceUrlsChecked": [
        "https://austinenergy.com/green-power/plug-in-austin/workplace-charging",
        "https://rebates.austinenergy.com/"
      ],
      "evidenceText": "Austin Energy's business EV charger rebate page covers business and nonprofit charging sites and lists EV-dedicated Level 1, Level 2 and DC fast chargers as eligible station types.",
      "reasoningNotes": "The workplace opportunity should match charger equipment installation only. Level 1 should be included, while make-ready and single-family charging should be kept separate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_46edc2ee00dd8265_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 500000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $5,000 per OCPP-compliant DC fast charging station",
        "evidenceText": "Austin Energy business EV charger rebate table lists DC Fast at up to $5,000 per station.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/commercial/ev-charging-station-rebate"
        ],
        "reasoningNotes": "Returned separately because DC fast charger stations have a distinct amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a621d68a2ffcea54_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 300000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $3,000 per OCPP-compliant Level 2 charging station",
        "evidenceText": "Austin Energy business EV charger rebate table lists Level 2 at up to $3,000 per station.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/commercial/ev-charging-station-rebate"
        ],
        "reasoningNotes": "Matched workplace Level 2 charging. Confidence is medium because source uses \"up to.\"",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22396",
    "opportunityName": "Entergy Texas - EV Charging Station Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22396/entergy-texas-ev-charging-station-rebate-program",
    "websiteUrl": "https://entergyetech.com/electric-vehicles/",
    "applicationUrl": null,
    "administrator": "Entergy Texas",
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
          "ev charging",
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
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Entergy Texas"
        ],
        "notes": "Applies to eligible Entergy Texas customers."
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
        "Applicant must be an eligible Entergy Texas customer.",
        "Level 2 charger must be ENERGY STAR certified.",
        "DC fast charger rebate amount depends on charger power rating below or above 50 kW.",
        "Customer must apply through the Entergy eTech rebate process and submit required documentation."
      ],
      "blockers": [
        "The Entergy Texas managed charging or charging rewards program is separate from the eTech charger rebate.",
        "Level 1 chargers and non-installed portable charging equipment are not supported.",
        "Sites outside Entergy Texas service territory do not qualify."
      ],
      "programType": "Rebate",
      "administrator": "Entergy Texas",
      "applicationUrl": null,
      "websiteUrl": "https://entergyetech.com/electric-vehicles/",
      "sourceUrlsChecked": [
        "https://entergyetech.com/electric-vehicles/",
        "https://entergyetech.com/",
        "https://www.chargingrewards.com/entergytx-ev/"
      ],
      "evidenceText": "Entergy eTech lists charger rebates for Level 2 and DC fast charging. A separate Entergy Texas charging rewards site covers managed charging participation rather than charger installation rebates.",
      "reasoningNotes": "Original charger matches are supported for Entergy Texas eTech. Demand-response style managed charging should be kept separate from this rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ab2a338bc73d7062_v1",
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
        "evidenceText": "Cash incentives are currently available to qualifying customers for purchasing the following equipment: Electric technology Entergy cash incentive Customer incentives Dealer incentives Level 2 electric vehicle charger* $250 per port DC fast charger* $750 &#8211",
        "sourceUrlsChecked": [
          "https://entergyetech.com/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3630",
    "opportunityName": "New Braunfels Utilities - Energy Efficiency and Water Conservation Rebate Programs",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3630/new-braunfels-utilities-energy-efficiency-and-water-conservation-rebate-programs",
    "websiteUrl": "https://www.nbutexas.com/ways-to-save/rebates/",
    "applicationUrl": "https://forms.nbutexas.com/Forms/rebate-air-conditioner-and-heat-pump-application",
    "administrator": "New Braunfels Utilities",
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [
          "New Braunfels"
        ],
        "utilityTerritories": [
          "New Braunfels Utilities"
        ],
        "notes": "Applies to eligible NBU customers; individual rebate eligibility varies by residential or commercial account and measure."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "commercial_customers",
        "businesses",
        "homeowners",
        "property_owners"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "mini_split_heat_pump",
        "energy_star_window_air_conditioner",
        "smart_thermostat",
        "programmable_thermostat",
        "air_conditioner_tune_up"
      ],
      "hardRequirements": [
        "Applicant must be an NBU customer.",
        "Equipment or service must meet the specific rebate requirements.",
        "Application and required documentation must be submitted.",
        "Air conditioner and heat pump equipment must satisfy qualifying equipment requirements.",
        "Rebates are subject to posted limits and may be issued as bill credits.",
        "Application timing requirements must be met."
      ],
      "blockers": [
        "ENERGY STAR window air conditioner is product-specific and should not be matched as window replacement.",
        "Water conservation landscaping and rain barrel rebates are separate measures within the broader NBU rebate list.",
        "Solar rebates are separate and should not be inferred from this HVAC and thermostat match.",
        "Residential laundry appliances are not commercial kitchen equipment."
      ],
      "programType": "Rebate",
      "administrator": "New Braunfels Utilities",
      "applicationUrl": "https://forms.nbutexas.com/Forms/rebate-air-conditioner-and-heat-pump-application",
      "websiteUrl": "https://www.nbutexas.com/ways-to-save/rebates/",
      "sourceUrlsChecked": [
        "https://www.nbutexas.com/ways-to-save/rebates/",
        "https://www.nbutexas.com/rebates/",
        "https://forms.nbutexas.com/Forms/rebate-air-conditioner-and-heat-pump-application"
      ],
      "evidenceText": "NBU’s current rebate page supports high-efficiency air conditioners, heat pumps, ENERGY STAR window units, mini-splits, programmable thermostats, smart thermostats and AC checkups for qualifying NBU customers.",
      "reasoningNotes": "The core HVAC and thermostat categories are correct. Add product-specific window AC and AC checkup, but avoid generalizing to window replacement or unrelated water programs."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7fd8ce5173b6dabb_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 300000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $3,000 residential solar PV rebate",
        "evidenceText": "NBU solar rebate page says customers may earn an NBU rebate of up to $3,000.",
        "sourceUrlsChecked": [
          "https://www.nbutexas.com/solar-rebate/",
          "https://www.nbutexas.com/rebates/",
          "https://www.nbutexas.com/wp-content/uploads/2025/04/23-20223_ResidentialSolarRebateApplicationGuidelines-02-1.pdf"
        ],
        "reasoningNotes": "Matched solar PV. Official materials expose the cap but not a stable per-watt rate in accessible text, so modeled as an up-to fixed amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4273",
    "opportunityName": "Charlottesville - Residential Energy Efficiency Rebate Program",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4273/charlottesville-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.charlottesville.gov/472/Rebates",
    "applicationUrl": null,
    "administrator": "City of Charlottesville",
    "programType": "Residential And Utility Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "VA"
        ],
        "counties": [
          "Albemarle"
        ],
        "cities": [
          "Charlottesville"
        ],
        "utilityTerritories": [
          "Charlottesville Gas",
          "City of Charlottesville water utility"
        ],
        "notes": "Gas efficiency rebates are tied to Charlottesville Gas service and existing single-family homes; toilet rebates are tied to City water utility customer or homeowner eligibility."
      },
      "eligibleApplicantTypes": [
        "homeowner",
        "rental_property_owner",
        "residential_gas_customer",
        "city_water_customer",
        "commercial_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "air_sealing_weatherization",
        "smart_thermostat",
        "programmable_thermostat",
        "high_efficiency_toilet"
      ],
      "hardRequirements": [
        "Attic insulation and attic air sealing rebates apply to existing single-family homes with natural gas as the primary heating fuel.",
        "Insulation and air sealing work must be completed by a licensed contractor and meet program timing requirements.",
        "Smart and programmable thermostat rebates require qualifying thermostats and gas heating service requirements.",
        "Toilet rebate requires replacement of an existing higher-flow toilet with a qualifying WaterSense low-flow toilet.",
        "New construction is excluded from the gas efficiency rebate pages."
      ],
      "blockers": [
        "Thermostat rebates are thermostat equipment rebates, not zoning retrofits.",
        "Toilet rebates should not be generalized to urinals unless the current form expressly includes urinals.",
        "Gas efficiency rebates should not match customers without qualifying Charlottesville Gas service.",
        "Water efficiency toilet rebates have separate City water utility eligibility from the gas efficiency rebates."
      ],
      "programType": "Residential And Utility Efficiency Rebate",
      "administrator": "City of Charlottesville",
      "applicationUrl": null,
      "websiteUrl": "https://www.charlottesville.gov/472/Rebates",
      "sourceUrlsChecked": [
        "https://www.charlottesville.gov/472/Rebates",
        "https://www.charlottesville.gov/1324/Attic-Insulation-Rebate",
        "https://www.charlottesville.gov/1900/Attic-Air-Sealing-Rebate",
        "https://www.charlottesville.gov/1901/Smart-Thermostat-Rebate",
        "https://www.charlottesville.gov/618/Programmable-Thermostat-Rebate",
        "https://www.charlottesville.gov/644/Toilet-Rebates"
      ],
      "evidenceText": "Charlottesville currently lists attic insulation, attic air sealing, smart thermostat, programmable thermostat and WaterSense toilet rebates, with gas-service and existing-home requirements for gas measures and separate water-utility rules for toilets.",
      "reasoningNotes": "The original categories are mostly valid, but thermostat should be narrowed to equipment, air sealing should be added, and toilet should not be broadened to urinals."
    },
    "existingSimpleRules": [
      {
        "id": "oir_50dfdb364ab57bcf_v1",
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
        "formula": "$500 per eligible unit",
        "evidenceText": "Search Attic Insulation Rebate Charlottesville Gas Assistance Program (GAP) Home Weatherization Program Programmable Thermostat Rebate Toilet Rebates Water & Wastewater Assistance Programs Attic Insulation Self-Assessment Attic Air Sealing Rebate Smart Thermostat Rebate Home Government Departments L-V Utilities Utility Incentives Utility Incentives Attic Insulation Self-Assessment Attic Insulation $500 Re",
        "sourceUrlsChecked": [
          "https://www.charlottesville.gov/472/Rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3581",
    "opportunityName": "Home Performance with Energy Star (Existing Residential)",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3581/home-performance-with-energy-star-existing-residential",
    "websiteUrl": "https://www.efficiencyvermont.com/rebates/list/home-performance-with-energy-star",
    "applicationUrl": null,
    "administrator": "Efficiency Vermont",
    "programType": "Rebate",
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
          "VT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Efficiency Vermont service territory"
        ],
        "notes": "Statewide Vermont offering for eligible existing homes; Burlington Electric or Vermont Gas customers may have utility-specific treatment, and multifamily 5+ uses other offerings."
      },
      "eligibleApplicantTypes": [
        "homeowners",
        "residential_property_owners",
        "long_term_rental_property_owners",
        "income_eligible_households"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential",
        "single_family",
        "multifamily_2_to_4_unit_long_term_rental"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade"
      ],
      "hardRequirements": [
        "Project must be at an eligible existing single-family home or long-term rental property with one to four units.",
        "Work must be performed through an Efficiency Excellence Network contractor.",
        "Preapproval is required.",
        "Blower-door testing and at least 10 percent air leakage reduction are required.",
        "Recommended health and safety work may be required.",
        "Prior Home Performance with ENERGY STAR rebates reduce the remaining eligible rebate amount."
      ],
      "blockers": [
        "Energy audit and testing are required process steps, not standalone physical retrofit categories.",
        "Multifamily buildings with five or more units are not eligible under this specific offer.",
        "Short-term rentals are not eligible under this offer.",
        "Customers served by Burlington Electric or Vermont Gas may need utility-specific offerings."
      ],
      "programType": "Rebate",
      "administrator": "Efficiency Vermont",
      "applicationUrl": null,
      "websiteUrl": "https://www.efficiencyvermont.com/rebates/list/home-performance-with-energy-star",
      "sourceUrlsChecked": [
        "https://www.efficiencyvermont.com/rebates/list/home-performance-with-energy-star"
      ],
      "evidenceText": "Efficiency Vermont lists the offer for existing Vermont homes to improve insulation and air sealing; EEN contractor oversight, preapproval, blower-door testing, measured air-leakage reduction and health/safety work are required.",
      "reasoningNotes": "Air sealing and insulation are supported. The audit term should not be used as an eligible retrofit category because the program pays for eligible weatherization work through a required process."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ab4b19e603473e49_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 950000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $9,500 off eligible Home Performance insulation and air-sealing project costs",
        "evidenceText": "Efficiency Vermont says Home Performance with ENERGY STAR provides up to $9,500 off insulation and air sealing.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates/list/home-performance-with-energy-star"
        ],
        "reasoningNotes": "Matched insulation and air sealing terms. Modeled as maximum project-level rebate; amount changes to up to $7,000 effective July 1, 2026.",
        "mapping": {
          "primarySavingsModelId": "envelope_insulation_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22341",
    "opportunityName": "Stowe Electric - Public EV Charging Station Rebate",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22341/stowe-electric-public-ev-charging-station-rebate",
    "websiteUrl": "https://www.stoweelectric.com/rebates/public-ev-charging-stations",
    "applicationUrl": null,
    "administrator": "Stowe Electric Department",
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
          "VT"
        ],
        "counties": [],
        "cities": [
          "Stowe"
        ],
        "utilityTerritories": [
          "Stowe Electric Department"
        ],
        "notes": "Limited to sites served by Stowe Electric and located at qualifying public, workplace, multifamily, or commercial charging locations."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "workplace_site_host",
        "public_facility",
        "multifamily_property_owner",
        "municipal_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "public",
        "multifamily",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be in Stowe Electric service territory.",
        "Eligible projects must install qualifying Level 2 or Level 3 DC fast charging equipment.",
        "Public and workplace chargers must be available to customers, visitors, employees, or the public as applicable.",
        "DC fast chargers must be public and networked or otherwise support required operation and fee collection functionality.",
        "Rebates are subject to per-customer and annual program caps."
      ],
      "blockers": [
        "Private single-family residential home chargers are not supported by this public-charging opportunity.",
        "Level 1 charging is not an eligible category.",
        "DC fast chargers without public access or required networking/operation functionality should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Stowe Electric Department",
      "applicationUrl": null,
      "websiteUrl": "https://www.stoweelectric.com/rebates/public-ev-charging-stations",
      "sourceUrlsChecked": [
        "https://www.stoweelectric.com/rebates/public-ev-charging-stations",
        "https://programs.dsireusa.org/system/program/detail/22341/stowe-electric-public-ev-charging-station-rebate"
      ],
      "evidenceText": "Official program information supports rebates for Level 2 and Level 3 DCFC stations at workplace, public, commercial, parking lot, and multifamily sites, with extra public and network requirements for DCFC.",
      "reasoningNotes": "Batch target source cited as . Current official source supports Level 2 and DC fast public charging; it does not support private home EV charger matching."
    },
    "existingSimpleRules": [
      {
        "id": "oir_47c609c01ed71920_v1",
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
        "formula": "$500 per eligible unit",
        "evidenceText": "Level 2 EV charging stations are eligible for a $250 rebate per charger for multifamily homes or $500 per charger for workplace or public chargers accessible to the public, employees, or visitors",
        "sourceUrlsChecked": [
          "https://www.stoweelectric.com/rebates/public-ev-charging-stations"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4599",
    "opportunityName": "Pend Oreille PUD - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4599/pend-oreille-pud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://popud.org/your-account/save-energy-2/rebates-and-incentives",
    "applicationUrl": "https://popud.org/your-account/save-energy-2/rebates-and-incentives",
    "administrator": "Pend Oreille PUD",
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clothes washer"
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
          "Pend Oreille PUD electric service territory"
        ],
        "notes": "Applies to qualifying residential buildings served by Pend Oreille PUD."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "multifamily_property_customer"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_heat_pump",
        "air_source_heat_pump",
        "variable_speed_heat_pump",
        "heat_pump_water_heater",
        "energy_star_clothes_washer",
        "energy_star_clothes_dryer",
        "smart_thermostat",
        "insulation_retrofit",
        "window_replacement",
        "insulated_exterior_door_replacement"
      ],
      "hardRequirements": [
        "Customer and installation site must be in Pend Oreille PUD service territory.",
        "Most rebates require installation or completion on or after January 1, 2026 and submission within 90 days.",
        "Heat pump measures require qualifying electric-heated existing homes and specified AHRI or efficiency documentation.",
        "Heat pump water heaters and appliances must meet qualifying product requirements.",
        "New construction is excluded for several residential measures."
      ],
      "blockers": [
        "Do not generalize clothes washer rebates into commercial laundry equipment.",
        "Do not match non-PUD customers.",
        "Do not match new construction where the specific measure excludes it.",
        "Do not match broad high-efficiency HVAC beyond the listed heat pump measures.",
        "EV charger incentives are listed with appliances but are not a heat pump or weatherization retrofit."
      ],
      "programType": "Rebate Program",
      "administrator": "Pend Oreille PUD",
      "applicationUrl": "https://popud.org/your-account/save-energy-2/rebates-and-incentives",
      "websiteUrl": "https://popud.org/your-account/save-energy-2/rebates-and-incentives",
      "sourceUrlsChecked": [
        "https://popud.org/your-account/save-energy-2/rebates-and-incentives",
        "https://www.popud.org/assets/PDFs/Conservation/Appliance-Project-Information-Form_Pend-Oreille.pdf"
      ],
      "evidenceText": "Pend Oreille PUD's 2026 rebate page lists ductless and ducted heat pumps, variable-speed heat pumps, heat pump water heaters, appliances, thermostats, and weatherization measures.",
      "reasoningNotes": "Ductless heat pump and clothes washer matches are supported, but they should be product-specific rather than broad HVAC or commercial laundry categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_38187423c9bddec6_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 92000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$920 per qualifying single- or multi-head ductless heat pump system",
        "evidenceText": "Pend Oreille PUD residential rebates page lists $920 for ductless heat pump installations in electrically heated homes.",
        "sourceUrlsChecked": [
          "https://popud.org/your-account/save-energy-2/rebates-and-incentives",
          "https://popud.org/your-account/save-energy-2"
        ],
        "reasoningNotes": "Matched ductless heat pump term. Use one unit as one qualifying installation.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22359",
    "opportunityName": "Clark Electric Cooperative - Electric Vehicle Charging Station Rebate",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22359/clark-electric-cooperative-electric-vehicle-charging-station-rebate",
    "websiteUrl": "https://www.cecoop.com/rebatesincentives",
    "applicationUrl": "https://www.cecoop.com/sites/default/files/Clark%20Electric/Rebates/2026%20Incentive%20Form%20--%20EV%20Chargers.pdf",
    "administrator": "Clark Electric Cooperative",
    "programType": "EV Charging Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "ev charger",
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
      },
      {
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "metering"
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
          "Clark Electric Cooperative"
        ],
        "notes": "Available to Clark Electric Cooperative members for eligible equipment installed on cooperative lines."
      },
      "eligibleApplicantTypes": [
        "cooperative_member",
        "residential_member",
        "farm_member",
        "commercial_member",
        "industrial_member",
        "institutional_member",
        "government_member"
      ],
      "eligibleSectors": [
        "residential",
        "agricultural",
        "commercial",
        "industrial",
        "institutional",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "ev_charger_integrated_metering_and_load_control"
      ],
      "hardRequirements": [
        "Applicant must be a Clark Electric Cooperative member.",
        "Eligible charger must be new, purchased in the current program year and installed on cooperative lines.",
        "The listed EV charger incentive requires a ZEF Smart Electric Vehicle Charging Station with integrated metering.",
        "Charger must be on load control as defined by the cooperative.",
        "Required documentation must be submitted within the stated deadline and funding must remain available."
      ],
      "blockers": [
        "Submetering or energy monitoring should not match broadly; integrated metering is only part of the qualifying ZEF EV charging station.",
        "DC fast charging is not supported by the current Clark Electric EV charger form.",
        "Chargers not on cooperative-defined load control are ineligible.",
        "Incentive cannot exceed charger cost."
      ],
      "programType": "EV Charging Rebate",
      "administrator": "Clark Electric Cooperative",
      "applicationUrl": "https://www.cecoop.com/sites/default/files/Clark%20Electric/Rebates/2026%20Incentive%20Form%20--%20EV%20Chargers.pdf",
      "websiteUrl": "https://www.cecoop.com/rebatesincentives",
      "sourceUrlsChecked": [
        "https://www.cecoop.com/rebatesincentives",
        "https://www.cecoop.com/sites/default/files/Clark%20Electric/Rebates/2026%20Incentive%20Form%20--%20EV%20Chargers.pdf"
      ],
      "evidenceText": "Clark Electric's 2026 EV charger form lists a ZEF Smart Electric Vehicle Charging Station with integrated metering, requires cooperative load control, and applies to equipment installed on cooperative lines.",
      "reasoningNotes": "The EV charging match is valid, but submetering must be narrowed to EV charger integrated metering and load control rather than broad building energy monitoring."
    },
    "existingSimpleRules": [
      {
        "id": "oir_529d52ceb7a5a869_v1",
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
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$1,000 per ZEF smart EV charging station with integrated metering on load control",
        "evidenceText": "Clark Electric 2026 EV charger form lists $1,000 incentive for ZEF smart charging station with integrated metering.",
        "sourceUrlsChecked": [
          "https://www.cecoop.com/rebatesincentives",
          "https://www.cecoop.com/sites/default/files/Clark%20Electric/Rebates/2026%20Incentive%20Form%20--%20EV%20Chargers.pdf"
        ],
        "reasoningNotes": "Matched EV charging and metering terms. Rebate cannot exceed EV charger cost.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2503",
    "opportunityName": "We Energies - Focus-On-Energy Agriculture Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2503/we-energies-focus-on-energy-agriculture-rebate-program",
    "websiteUrl": "https://focusonenergy.com/business/renewables",
    "applicationUrl": null,
    "administrator": "Focus on Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "biomass",
          "biogas"
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
          "solar pv"
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "We Energies",
          "Focus on Energy participating utility territories"
        ],
        "notes": "Focus on Energy business renewable incentives for Wisconsin customers served by participating utilities; this DSIRE target is tied to We Energies territory."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "agribusiness_customer",
        "farm_owner",
        "municipal_customer",
        "multifamily_property_owner",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "agricultural",
        "commercial",
        "industrial",
        "municipal",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system",
        "biomass_biogas_energy_system",
        "solar_thermal_system",
        "wind_energy_system",
        "hydropower_system",
        "renewable_energy_feasibility_study"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Wisconsin business or agribusiness customer of a participating utility.",
        "Custom renewable energy projects require preapproval before ordering equipment, signing purchase orders, or contracting labor.",
        "Solar PV may qualify through prescriptive business renewable incentives.",
        "Feasibility-study incentives are limited to qualifying renewable energy studies and program cost-share caps."
      ],
      "blockers": [
        "This is not a residential rebate opportunity.",
        "Renewable feasibility-study funding is not a physical retrofit installation.",
        "Solar thermal should not be generalized into all water-heating replacements.",
        "We Energies is a participating utility; Focus on Energy administers the statewide business incentive structure."
      ],
      "programType": "Rebate Program",
      "administrator": "Focus on Energy",
      "applicationUrl": null,
      "websiteUrl": "https://focusonenergy.com/business/renewables",
      "sourceUrlsChecked": [
        "https://focusonenergy.com/business/renewables",
        "https://focusonenergy.com/business/agribusiness",
        "https://assets.focusonenergy.com/production/docs/business/Focus-2026_Custom_Incentives_Guide_Fillable.pdf",
        "https://programs.dsireusa.org/system/program/detail/2503/we-energies-focus-on-energy-agriculture-rebate-program"
      ],
      "evidenceText": "Focus on Energy business renewable sources list solar PV rebates and custom incentives for biogas, biomass, solar thermal, wind, hydroelectric, and renewable feasibility studies.",
      "reasoningNotes": "The original renewable-energy matches are broadly correct, but the administrator should be Focus on Energy and the opportunity should be limited to business or agribusiness customers of participating utilities."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e3a8fb299fb57e8a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 60000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$600 per kW",
        "evidenceText": "2026 Online Application 2026 Print Application Rebates Equipment Eligibility Educational Materials Terms & Requirements Business Customer Solar PV Rebates System Size in kW (DC) Rebate All $600 per kW, up to $2,400 $50 per kW thereafter, up to $25,000 Solar electric system rebates are available on select qualifying solar electric equipment",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/business/renewables#funding"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5770",
    "opportunityName": "Xcel Energy - Agriculture, Schools and Government Incentive Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5770/xcel-energy-agriculture-schools-and-government-incentive-program",
    "websiteUrl": "https://focusonenergy.com/business/rebates",
    "applicationUrl": "https://assets.focusonenergy.com/production/docs/business/mktg-fillable-rebate-app-20260101.pdf",
    "administrator": "Focus on Energy",
    "programType": "Rebate",
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Focus on Energy participating Wisconsin utilities",
          "Xcel Energy (Northern States Power)"
        ],
        "notes": "Statewide Focus on Energy business incentives are available only to customers of participating Wisconsin utilities; Xcel Energy is one listed participating utility."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "agricultural_customers",
        "schools",
        "government_customers",
        "nonprofits",
        "multifamily_property_owners",
        "industrial_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "education",
        "government",
        "nonprofit",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "commercial_refrigeration",
        "hvac_equipment_upgrade",
        "led_lighting_retrofit",
        "lighting_controls",
        "agribusiness_efficiency",
        "building_performance_optimization",
        "laboratory_energy_efficiency",
        "process_systems_efficiency",
        "multifamily_efficiency",
        "business_renewable_energy"
      ],
      "hardRequirements": [
        "Applicant must be served by a participating Wisconsin utility or cooperative.",
        "Business rebates apply to qualifying products purchased and installed between January 1 and December 31, 2026.",
        "Registered Trade Allies should be used where applicable to ensure qualifying equipment.",
        "Applications and required supplemental data must be submitted by program deadlines.",
        "Some natural gas measures require service from a participating natural gas utility."
      ],
      "blockers": [
        "Not exclusive to Xcel Energy; Xcel is one participating Wisconsin utility under Focus on Energy.",
        "Residential rebates are separate and should not be inferred for this business-focused opportunity.",
        "Projects outside Wisconsin or outside participating utility service are not eligible."
      ],
      "programType": "Rebate",
      "administrator": "Focus on Energy",
      "applicationUrl": "https://assets.focusonenergy.com/production/docs/business/mktg-fillable-rebate-app-20260101.pdf",
      "websiteUrl": "https://focusonenergy.com/business/rebates",
      "sourceUrlsChecked": [
        "https://focusonenergy.com/business/rebates",
        "https://focusonenergy.com/about/participating-utilities",
        "https://assets.focusonenergy.com/production/docs/business/mktg-fillable-rebate-app-20260101.pdf"
      ],
      "evidenceText": "Focus on Energy's 2026 business rebates include commercial refrigeration, HVAC, lighting, agribusiness, laboratory, multifamily, and process systems; Xcel is a participating utility.",
      "reasoningNotes": "The refrigeration, HVAC, and lighting matches are supported for eligible Focus on Energy business customers, not as a standalone Xcel-only program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8dae962a0e7f98ef_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$25 per evaporator fan control for walk-in cooler or freezer",
        "evidenceText": "Focus on Energy 2026 measure change summary lists evaporator fan control for walk-in cooler/freezer at $25 retrofit.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/business/rebates",
          "https://assets.focusonenergy.com/production/docs/utilities/2026_Measure_Change_Summary.pdf"
        ],
        "reasoningNotes": "Matched walk-in cooler/freezer refrigeration controls. Returned as a separate refrigeration candidate.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_df4f461b16e32ef1_v1",
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
        "confidence": "medium",
        "formula": "$40 per anti-sweat heater control for freezer or refrigerated cases",
        "evidenceText": "Focus on Energy 2026 measure change summary lists anti-sweat heater controls at $40 for freezer and refrigerated cases.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/business/rebates",
          "https://assets.focusonenergy.com/production/docs/utilities/2026_Measure_Change_Summary.pdf"
        ],
        "reasoningNotes": "Matched refrigeration terms. Use one unit as one controlled case door or control where the application defines quantity.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22739",
    "opportunityName": "Alabama Power - EV Home Charger Rebate",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22739/alabama-power-ev-home-charger-rebate",
    "websiteUrl": "https://www.alabamapower.com/residential/save-money-and-energy/electric-vehicles/ev-home-charger-rebate.html",
    "applicationUrl": "https://apcevhomecharger.customerapplication.com/",
    "administrator": "Alabama Power Co.",
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
          "AL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Alabama Power"
        ],
        "notes": "Limited to Alabama Power residential customers at qualifying single-family homes."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "single_family_home_customers",
        "ev_owners_or_lessees"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a residential Alabama Power customer.",
        "Residence must be a single-family home.",
        "Customer must verify ownership or lease of a BEV or PHEV at the installation site.",
        "Charger must be a new Level 2 240V charger on a dedicated circuit.",
        "Required documents include installed-charger photo, serial number, proof of transaction, and applicable installation-cost documentation.",
        "Charger must have been received within 90 days of rebate application date and only one charger rebate is allowed per installation site."
      ],
      "blockers": [
        "Level 1 chargers, used chargers, DC fast chargers, and multifamily or business sites are not eligible under this home rebate.",
        "The separate business Make Ready Program and EV charging rewards should not be merged into this residential home charger rebate.",
        "Do not match general EV purchase incentives; this opportunity is only for Level 2 home charger purchase and installation."
      ],
      "programType": "Rebate",
      "administrator": "Alabama Power Co.",
      "applicationUrl": "https://apcevhomecharger.customerapplication.com/",
      "websiteUrl": "https://www.alabamapower.com/residential/save-money-and-energy/electric-vehicles/ev-home-charger-rebate.html",
      "sourceUrlsChecked": [
        "https://www.alabamapower.com/residential/save-money-and-energy/electric-vehicles/ev-home-charger-rebate.html",
        "https://www.alabamapower.com/residential/save-money-and-energy/rebates-and-incentives.html",
        "https://apcevhomecharger.customerapplication.com/"
      ],
      "evidenceText": "Alabama Power offers a one-time $500 rebate for residential customers installing a new Level 2 240V charger at a single-family home.",
      "reasoningNotes": "The Level 2 EV charger match is correct. The category was narrowed to residential Level 2 home charger installation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_bb405c9252e1deb6_v1",
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
        "formula": "$500 per eligible unit",
        "evidenceText": "Alabama Power customers can receive a one-time $500 rebate for the installation of a Level 2 (240V) charger at their home with our Home Charger Rebate",
        "sourceUrlsChecked": [
          "https://www.alabamapower.com/residential/save-money-and-energy/electric-vehicles/ev-home-charger-rebate.html"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22271",
    "opportunityName": "Tucson Electric Power - Home EV Chargers Rebate",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22271/tucson-electric-power-home-ev-chargers-rebate",
    "websiteUrl": "https://www.tep.com/electric-vehicles/",
    "applicationUrl": "https://tep.jotform.com/223215927062048",
    "administrator": "Tucson Electric Power",
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
          "AZ"
        ],
        "counties": [],
        "cities": [
          "Tucson"
        ],
        "utilityTerritories": [
          "Tucson Electric Power"
        ],
        "notes": "Charger must be installed at the applicant's TEP service address in TEP territory."
      },
      "eligibleApplicantTypes": [
        "residential_customers"
      ],
      "eligibleSectors": [
        "residential",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a TEP residential customer.",
        "Charger must be a new Level 2 or higher networked charger.",
        "Application must be submitted within 60 days of purchase.",
        "Customer must be on an active Time-of-Use rate plan and remain on it for at least two years.",
        "Charger must maintain stable internet connection and be installed at the TEP service address."
      ],
      "blockers": [
        "Do not match non-networked, mobile, portable, or dual-voltage chargers.",
        "Do not match used, resold, or refurbished chargers.",
        "Commercial, multifamily, and community charging offerings are separate programs.",
        "Funding is limited and the program may change or expire."
      ],
      "programType": "Residential EV Charger Rebate",
      "administrator": "Tucson Electric Power",
      "applicationUrl": "https://tep.jotform.com/223215927062048",
      "websiteUrl": "https://www.tep.com/electric-vehicles/",
      "sourceUrlsChecked": [
        "https://www.tep.com/electric-vehicles/",
        "https://tep.jotform.com/223215927062048",
        "https://www.tep.com/smart-ev-charging-program/"
      ],
      "evidenceText": "TEP]( offers residential customers up to 300 dollars for new networked Level 2 chargers, with application, TOU rate, internet, installation, and funding requirements.",
      "reasoningNotes": "Use the narrower level_2_ev_charger_installation category. The broader EV charger category is acceptable only if matching logic requires a parent category."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b846761736dfe8b8_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.75
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 30000
        },
        "confidence": "medium",
        "formula": "75% of Level 2 networked EV charger purchase cost, capped at $300",
        "evidenceText": "TEP residential EV page lists 75% of purchase cost up to $300 for eligible Level 2 networked chargers.",
        "sourceUrlsChecked": [
          "https://www.tep.com/electric-vehicles/",
          "https://www.tep.com/ev-rebates/"
        ],
        "reasoningNotes": "Matched Level 2 charger terms. Basis is equipment purchase cost before tax.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22274",
    "opportunityName": "Alameda Municipal Power - Electric Vehicle Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22274/alameda-municipal-power-electric-vehicle-rebate-program",
    "websiteUrl": "https://www.alamedamp.com/407/Rebates-and-Incentives",
    "applicationUrl": "https://alamedaprod.my.site.com/rebates/s/",
    "administrator": "Alameda Municipal Power",
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
          "ev charger",
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
        "counties": [
          "Alameda"
        ],
        "cities": [
          "Alameda"
        ],
        "utilityTerritories": [
          "Alameda Municipal Power"
        ],
        "notes": "Limited to current Alameda Municipal Power residential D1 customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "income_qualified_customer",
        "homeowner",
        "renter"
      ],
      "eligibleSectors": [
        "residential",
        "low_income"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a current Alameda Municipal Power residential D1 customer.",
        "Charger must be a new, unused, permanently installed 240-volt Level 2 home charger.",
        "Equipment must be safety-certified, such as UL or ETL listed.",
        "Application must be submitted with required receipts and documentation within the program deadline.",
        "Limit is one rebate per account and rebate applies only toward charging station cost."
      ],
      "blockers": [
        "DC fast charging is not eligible under this residential rebate.",
        "Level 1 chargers are not eligible.",
        "Used, resold, rebuilt, or warranty-replacement chargers should not match.",
        "Commercial, public, fleet, or multifamily charging should not be matched to this residential home charger rebate unless separately verified."
      ],
      "programType": "Rebate Program",
      "administrator": "Alameda Municipal Power",
      "applicationUrl": "https://alamedaprod.my.site.com/rebates/s/",
      "websiteUrl": "https://www.alamedamp.com/407/Rebates-and-Incentives",
      "sourceUrlsChecked": [
        "https://www.alamedamp.com/407/Rebates-and-Incentives",
        "https://www.alamedamp.com/349/Electric-Vehicles",
        "https://alamedaprod.my.site.com/rebates/s/",
        "https://programs.dsireusa.org/system/program/detail/22274/alameda-municipal-power-electric-vehicle-rebate-program"
      ],
      "evidenceText": "Alameda Municipal Power's rebate page lists a Level 2 home EV charger rebate for current residential D1 customers, with higher income-qualified amounts and new equipment requirements.",
      "reasoningNotes": "The original EV and Level 2 matches are correct but must be limited to AMP residential home chargers."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1bc37bd378ff997e_v1",
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
        "formula": "Up to $500 per residential Level 2 EV charger",
        "evidenceText": "AMP says customers can purchase a Level 2 EV charger at home and receive a rebate up to $500.",
        "sourceUrlsChecked": [
          "https://www.alamedamp.com/349/Electric-Vehicles",
          "https://www.alamedamp.com/407/Rebates-and-Incentives"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Medium because source says up to $500.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22277",
    "opportunityName": "Anaheim Public Utilities - EV Fleet Charger and Infrastructure Rebate",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22277/anaheim-public-utilities-ev-fleet-charger-and-infrastructure-rebate",
    "websiteUrl": "https://www.anaheim.net/5889/EV-Fleet-Charger-Infrastructure-Rebate",
    "applicationUrl": "https://www.anaheim.net/DocumentCenter/View/36752/EV-Fleet-Charger-Infrastructure-Rebate-Reservation-Form",
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
          "ev charger",
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
        "commercial_customer",
        "business_fleet_customer",
        "school",
        "public_fleet"
      ],
      "eligibleSectors": [
        "commercial",
        "education",
        "public"
      ],
      "eligibleRetrofitCategories": [
        "fleet_ev_charger_installation",
        "ev_charging_infrastructure",
        "submeter_installation_for_ev_charging",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an Anaheim Public Utilities commercial customer, school, or eligible fleet site.",
        "Project must support fleet electrification and qualifying EV charger infrastructure.",
        "Reservation form and approval letter are required before rebate payment.",
        "Required documentation includes final permits, receipts, and proof of qualifying fleet vehicles.",
        "Annual charger-count and dollar caps apply."
      ],
      "blockers": [
        "Personal or residential EV chargers are covered by a separate Anaheim rebate and should not match this fleet program.",
        "The official fleet page supports fleet charger and infrastructure rebates, not general public home charging.",
        "Projects outside Anaheim Public Utilities service area should not match.",
        "Rebate is subject to available funds and program approval."
      ],
      "programType": "Rebate Program",
      "administrator": "Anaheim Public Utilities",
      "applicationUrl": "https://www.anaheim.net/DocumentCenter/View/36752/EV-Fleet-Charger-Infrastructure-Rebate-Reservation-Form",
      "websiteUrl": "https://www.anaheim.net/5889/EV-Fleet-Charger-Infrastructure-Rebate",
      "sourceUrlsChecked": [
        "https://www.anaheim.net/5889/EV-Fleet-Charger-Infrastructure-Rebate",
        "https://www.anaheim.net/DocumentCenter/View/36752/EV-Fleet-Charger-Infrastructure-Rebate-Reservation-Form",
        "https://www.anaheim.net/DocumentCenter/View/36751/EV-Fleet-Charger-Infrastructure-Rebate-Program-Agreement",
        "https://programs.dsireusa.org/system/program/detail/22277/anaheim-public-utilities-ev-fleet-charger-and-infrastructure-rebate"
      ],
      "evidenceText": "Anaheim's fleet program offers commercial customers and schools rebates for EV fleet charging stations, associated infrastructure, submeters, plan check fees, and service fees.",
      "reasoningNotes": "Use fleet-specific EV charging categories. Do not assume this is the same as Anaheim's personal Level 2 charger rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_17c14939de9d9824_v1",
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
        "formula": "Up to $5,000 for an associated EV charging sub-meter installation",
        "evidenceText": "Anaheim EV Fleet Charger page says participants with an associated sub-meter installation may receive up to a $5,000 rebate.",
        "sourceUrlsChecked": [
          "https://www.anaheim.net/5889/EV-Fleet-Charger-Infrastructure-Rebate"
        ],
        "reasoningNotes": "Matched fleet EV charging infrastructure. Modeled as site/project-level fixed amount because official text is per sub-meter installation, not per port.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
